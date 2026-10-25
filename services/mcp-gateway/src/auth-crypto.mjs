import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  hkdfSync,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

const OPAQUE_VERSION = "v1";
const KEY_BYTES = 32;
const IV_BYTES = 12;
const TAG_BYTES = 16;
const MAX_TOKEN_LENGTH = 32_768;
const SECRET_CONTEXT = Buffer.from("dex-company-auth/v1", "utf8");

export class AuthCryptoError extends Error {
  constructor(message, reason = "invalid") {
    super(message);
    this.name = "AuthCryptoError";
    this.reason = reason;
  }
}

function decodeSecret(secretB64) {
  const encoded = String(secretB64 ?? "").trim();
  if (!encoded || !/^[A-Za-z0-9+/_-]+={0,2}$/.test(encoded)) {
    throw new AuthCryptoError("DEX_AUTH_SECRET_B64 must be valid base64.", "configuration");
  }

  let secret;
  try {
    secret = Buffer.from(encoded.replace(/-/g, "+").replace(/_/g, "/"), "base64");
    const canonicalInput = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/=+$/, "");
    if (secret.toString("base64").replace(/=+$/, "") !== canonicalInput) throw new Error("non-canonical");
  } catch {
    throw new AuthCryptoError("DEX_AUTH_SECRET_B64 must be valid base64.", "configuration");
  }
  if (secret.length < KEY_BYTES) {
    throw new AuthCryptoError("DEX_AUTH_SECRET_B64 must decode to at least 32 bytes.", "configuration");
  }
  return secret;
}

function assertPurpose(purpose) {
  if (!/^[a-z][a-z0-9-]{0,31}$/.test(String(purpose ?? ""))) {
    throw new AuthCryptoError("Invalid cryptographic purpose.", "configuration");
  }
}

function epochSeconds(value) {
  const seconds = Number(value);
  if (!Number.isSafeInteger(seconds) || seconds < 0) {
    throw new AuthCryptoError("The clock must return non-negative epoch seconds.", "configuration");
  }
  return seconds;
}

function positiveSeconds(value, name) {
  const seconds = Number(value);
  if (!Number.isSafeInteger(seconds) || seconds <= 0) {
    throw new AuthCryptoError(`${name} must be a positive integer.`, "configuration");
  }
  return seconds;
}

function encodeJson(value) {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
}

function decodeBase64Url(value) {
  if (typeof value !== "string" || !/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new AuthCryptoError("Invalid authentication token.");
  }
  const decoded = Buffer.from(value, "base64url");
  if (decoded.toString("base64url") !== value) {
    throw new AuthCryptoError("Invalid authentication token.");
  }
  return decoded;
}

function decodeJson(value) {
  try {
    return JSON.parse(decodeBase64Url(value).toString("utf8"));
  } catch {
    throw new AuthCryptoError("Invalid authentication token.");
  }
}

export function secureEqual(left, right) {
  const a = Buffer.from(String(left ?? ""), "utf8");
  const b = Buffer.from(String(right ?? ""), "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function sha256Base64Url(value) {
  return createHash("sha256").update(String(value), "utf8").digest("base64url");
}

export function createAuthCrypto({
  secretB64 = process.env.DEX_AUTH_SECRET_B64,
  issuer,
  now = () => Math.floor(Date.now() / 1000),
  clockSkewSeconds = 5,
} = {}) {
  const secret = decodeSecret(secretB64);
  const expectedIssuer = String(issuer ?? "");
  if (!expectedIssuer) {
    throw new AuthCryptoError("An OAuth issuer is required.", "configuration");
  }
  const allowedClockSkew = Number(clockSkewSeconds);
  if (!Number.isSafeInteger(allowedClockSkew) || allowedClockSkew < 0 || allowedClockSkew > 30) {
    throw new AuthCryptoError("clockSkewSeconds must be between 0 and 30.", "configuration");
  }

  const keys = new Map();
  function keyFor(category, purpose) {
    assertPurpose(purpose);
    const cacheKey = `${category}:${purpose}`;
    if (!keys.has(cacheKey)) {
      const info = Buffer.from(`dex-company/${category}/${purpose}`, "utf8");
      keys.set(cacheKey, Buffer.from(hkdfSync("sha256", secret, SECRET_CONTEXT, info, KEY_BYTES)));
    }
    return keys.get(cacheKey);
  }

  function currentTime() {
    return epochSeconds(now());
  }

  function sealOpaque(purpose, data, { ttlSeconds } = {}) {
    const ttl = positiveSeconds(ttlSeconds, "ttlSeconds");
    const issuedAt = currentTime();
    const payload = Buffer.from(JSON.stringify({
      v: 1,
      p: purpose,
      iat: issuedAt,
      exp: issuedAt + ttl,
      data,
    }), "utf8");
    const iv = randomBytes(IV_BYTES);
    const aad = Buffer.from(`dex-company/opaque/${OPAQUE_VERSION}/${purpose}`, "utf8");
    const cipher = createCipheriv("aes-256-gcm", keyFor("opaque", purpose), iv);
    cipher.setAAD(aad);
    const ciphertext = Buffer.concat([cipher.update(payload), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${OPAQUE_VERSION}.${Buffer.concat([iv, tag, ciphertext]).toString("base64url")}`;
  }

  function openOpaque(purpose, token) {
    const serialized = String(token ?? "");
    if (serialized.length > MAX_TOKEN_LENGTH) {
      throw new AuthCryptoError("Invalid authentication token.");
    }
    const [version, encoded, extra] = serialized.split(".");
    if (version !== OPAQUE_VERSION || !encoded || extra !== undefined || !/^[A-Za-z0-9_-]+$/.test(encoded)) {
      throw new AuthCryptoError("Invalid authentication token.");
    }

    try {
      const packed = decodeBase64Url(encoded);
      if (packed.length <= IV_BYTES + TAG_BYTES) throw new Error("truncated");
      const iv = packed.subarray(0, IV_BYTES);
      const tag = packed.subarray(IV_BYTES, IV_BYTES + TAG_BYTES);
      const ciphertext = packed.subarray(IV_BYTES + TAG_BYTES);
      const aad = Buffer.from(`dex-company/opaque/${OPAQUE_VERSION}/${purpose}`, "utf8");
      const decipher = createDecipheriv("aes-256-gcm", keyFor("opaque", purpose), iv);
      decipher.setAAD(aad);
      decipher.setAuthTag(tag);
      const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
      const payload = JSON.parse(plaintext.toString("utf8"));
      if (
        !payload
        || payload.v !== 1
        || payload.p !== purpose
        || !Number.isSafeInteger(payload.iat)
        || !Number.isSafeInteger(payload.exp)
        || payload.exp <= payload.iat
      ) {
        throw new Error("invalid payload");
      }
      const current = currentTime();
      if (payload.iat > current + allowedClockSkew) {
        throw new AuthCryptoError("Authentication token is not active yet.", "not_active");
      }
      if (current > payload.exp + allowedClockSkew) {
        throw new AuthCryptoError("Authentication token has expired.", "expired");
      }
      return payload.data;
    } catch (error) {
      if (error instanceof AuthCryptoError) throw error;
      throw new AuthCryptoError("Invalid authentication token.");
    }
  }

  function signJwt(purpose, claims, { ttlSeconds } = {}) {
    const ttl = positiveSeconds(ttlSeconds, "ttlSeconds");
    if (!claims || typeof claims !== "object" || Array.isArray(claims)) {
      throw new AuthCryptoError("JWT claims must be an object.", "configuration");
    }
    const issuedAt = currentTime();
    const header = encodeJson({ alg: "HS256", typ: "JWT" });
    const payload = encodeJson({
      ...claims,
      iss: expectedIssuer,
      iat: issuedAt,
      exp: issuedAt + ttl,
      jti: randomBytes(16).toString("base64url"),
    });
    const signingInput = `${header}.${payload}`;
    const signature = createHmac("sha256", keyFor("jwt", purpose))
      .update(signingInput, "ascii")
      .digest("base64url");
    return `${signingInput}.${signature}`;
  }

  function verifyJwt(purpose, token, { audience, requiredScope, maxTtlSeconds } = {}) {
    const serialized = String(token ?? "");
    if (serialized.length > MAX_TOKEN_LENGTH) {
      throw new AuthCryptoError("Invalid JWT.");
    }
    const [encodedHeader, encodedPayload, signature, extra] = serialized.split(".");
    if (
      !encodedHeader
      || !encodedPayload
      || !signature
      || extra !== undefined
      || !/^[A-Za-z0-9_-]+$/.test(encodedHeader)
      || !/^[A-Za-z0-9_-]+$/.test(encodedPayload)
      || !/^[A-Za-z0-9_-]{43}$/.test(signature)
    ) {
      throw new AuthCryptoError("Invalid JWT.");
    }
    const header = decodeJson(encodedHeader);
    if (header?.alg !== "HS256" || header?.typ !== "JWT") {
      throw new AuthCryptoError("Invalid JWT.");
    }
    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = createHmac("sha256", keyFor("jwt", purpose))
      .update(signingInput, "ascii")
      .digest();
    let suppliedSignature;
    try {
      suppliedSignature = decodeBase64Url(signature);
    } catch {
      throw new AuthCryptoError("Invalid JWT.");
    }
    if (suppliedSignature.length !== expectedSignature.length || !timingSafeEqual(suppliedSignature, expectedSignature)) {
      throw new AuthCryptoError("Invalid JWT.");
    }

    const claims = decodeJson(encodedPayload);
    if (
      !claims
      || typeof claims !== "object"
      || Array.isArray(claims)
      || !Number.isSafeInteger(claims.iat)
      || !Number.isSafeInteger(claims.exp)
      || (claims.nbf !== undefined && !Number.isSafeInteger(claims.nbf))
      || claims.exp <= claims.iat
      || typeof claims.jti !== "string"
      || !/^[A-Za-z0-9_-]{22}$/.test(claims.jti)
      || !secureEqual(claims.iss, expectedIssuer)
    ) {
      throw new AuthCryptoError("Invalid JWT.");
    }
    const current = currentTime();
    if (claims.iat > current + allowedClockSkew || (claims.nbf !== undefined && claims.nbf > current + allowedClockSkew)) {
      throw new AuthCryptoError("JWT is not active yet.", "not_active");
    }
    if (current > claims.exp + allowedClockSkew) {
      throw new AuthCryptoError("JWT has expired.", "expired");
    }
    if (audience !== undefined && (typeof claims.aud !== "string" || !secureEqual(claims.aud, audience))) {
      throw new AuthCryptoError("JWT audience is invalid.", "wrong_audience");
    }
    if (requiredScope !== undefined) {
      const scopes = typeof claims.scope === "string" ? claims.scope.split(/\s+/).filter(Boolean) : [];
      if (!scopes.includes(requiredScope)) throw new AuthCryptoError("JWT scope is invalid.", "wrong_scope");
    }
    if (maxTtlSeconds !== undefined) {
      const maxTtl = positiveSeconds(maxTtlSeconds, "maxTtlSeconds");
      if (claims.exp - claims.iat > maxTtl) throw new AuthCryptoError("JWT lifetime is invalid.");
    }
    return claims;
  }

  return Object.freeze({
    clockSkewSeconds: allowedClockSkew,
    sealOpaque,
    openOpaque,
    signJwt,
    verifyJwt,
  });
}
