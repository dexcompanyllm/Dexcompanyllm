import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const MAX_TTL_SECONDS = 31 * 24 * 60 * 60;
const MAX_ENTRY_BYTES = 2 * 1024;
const LOCK_WAIT_MS = 5_000;
const STALE_LOCK_MS = 60_000;
const NAMESPACE_PATTERN = /^[a-z][a-z0-9-]{0,31}$/;
const ID_PATTERN = /^[A-Za-z0-9_-]{22,128}$/;
const VALUE_PATTERN = /^[A-Za-z0-9:._-]{1,256}$/;

function validate(value, pattern, name) {
  const normalized = String(value ?? "");
  if (!pattern.test(normalized)) throw new Error(`${name} is invalid.`);
  return normalized;
}

function positiveInteger(value, name, maximum = Number.MAX_SAFE_INTEGER) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > maximum) {
    throw new Error(`${name} is invalid.`);
  }
  return parsed;
}

function realDirectory(directory, fsImpl = fs) {
  const configured = String(directory ?? "").trim();
  if (!configured || !path.isAbsolute(configured)) throw new Error("Coordination directory must be absolute.");
  const stat = fsImpl.lstatSync(configured);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error("Coordination directory must be a real directory.");
  const resolved = path.resolve(configured);
  const real = fsImpl.realpathSync.native(configured);
  const left = process.platform === "win32" ? resolved.toLowerCase() : resolved;
  const right = process.platform === "win32" ? real.toLowerCase() : real;
  if (left !== right) throw new Error("Coordination directory may not traverse a symlink or junction.");
  return real;
}

function coordinationDirectory(spoolDir, fsImpl = fs) {
  const root = realDirectory(spoolDir, fsImpl);
  const directory = path.join(root, "broker-coordination");
  fsImpl.mkdirSync(directory, { recursive: true, mode: 0o700 });
  return realDirectory(directory, fsImpl);
}

function entryPath(directory, namespace, id) {
  const normalizedNamespace = validate(namespace, NAMESPACE_PATTERN, "Coordination namespace");
  const normalizedId = validate(id, ID_PATTERN, "Coordination id");
  return path.join(directory, `${normalizedNamespace}-${normalizedId}.json`);
}

function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function withFileLock(targetPath, operation, {
  fsImpl = fs,
  nowMilliseconds = () => Date.now(),
} = {}) {
  const lockPath = `${targetPath}.lock`;
  const waitDeadline = Number(nowMilliseconds()) + LOCK_WAIT_MS;
  let locked = false;
  while (!locked) {
    try {
      const handle = fsImpl.openSync(lockPath, "wx", 0o600);
      try { fsImpl.writeFileSync(handle, `${process.pid}\n`, "utf8"); }
      finally { fsImpl.closeSync(handle); }
      locked = true;
    } catch (error) {
      if (error?.code !== "EEXIST") throw error;
      try {
        const age = Number(nowMilliseconds()) - fsImpl.statSync(lockPath).mtimeMs;
        if (age > STALE_LOCK_MS) {
          fsImpl.unlinkSync(lockPath);
          continue;
        }
      } catch (statError) {
        if (statError?.code !== "ENOENT") throw statError;
        continue;
      }
      if (Number(nowMilliseconds()) >= waitDeadline) {
        throw new Error("Local broker coordination lock timed out.");
      }
      await delay(10);
    }
  }

  try { return await operation(); }
  finally {
    try { fsImpl.unlinkSync(lockPath); }
    catch (error) { if (error?.code !== "ENOENT") throw error; }
  }
}

function readEntry(targetPath, currentTime, fsImpl = fs) {
  try {
    const stat = fsImpl.lstatSync(targetPath);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size < 1 || stat.size > MAX_ENTRY_BYTES) {
      throw new Error("Local broker coordination entry is invalid.");
    }
    const parsed = JSON.parse(fsImpl.readFileSync(targetPath, "utf8"));
    const value = validate(parsed?.value, VALUE_PATTERN, "Coordination value");
    const expiresAt = positiveInteger(parsed?.expiresAt, "Coordination expiry");
    return expiresAt > currentTime ? { value, expiresAt } : null;
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

function writeEntry(targetPath, entry, fsImpl = fs) {
  const encoded = `${JSON.stringify(entry)}\n`;
  if (Buffer.byteLength(encoded, "utf8") > MAX_ENTRY_BYTES) {
    throw new Error("Local broker coordination entry exceeds its size bound.");
  }
  const temporary = `${targetPath}.${crypto.randomUUID()}.tmp`;
  fsImpl.writeFileSync(temporary, encoded, { encoding: "utf8", flag: "wx", mode: 0o600 });
  try { fsImpl.renameSync(temporary, targetPath); }
  finally {
    try { fsImpl.unlinkSync(temporary); } catch {}
  }
}

export function createFileCoordinationStore(spoolDir, {
  fsImpl = fs,
  now = () => Math.floor(Date.now() / 1_000),
  nowMilliseconds = () => Date.now(),
} = {}) {
  const directory = coordinationDirectory(spoolDir, fsImpl);

  function currentTime() {
    const value = Number(now());
    if (!Number.isSafeInteger(value) || value < 0) throw new Error("Coordination clock is invalid.");
    return value;
  }

  function target(namespace, id) {
    return entryPath(directory, namespace, id);
  }

  async function locked(namespace, id, operation) {
    const targetPath = target(namespace, id);
    return withFileLock(targetPath, () => operation(targetPath), { fsImpl, nowMilliseconds });
  }

  function expiry(ttlSeconds) {
    return currentTime() + positiveInteger(ttlSeconds, "Coordination TTL", MAX_TTL_SECONDS);
  }

  return Object.freeze({
    configured: true,
    durable: true,
    required: true,
    mode: "local-file-coordination",
    async claim(namespace, id, value, ttlSeconds) {
      const normalized = validate(value, VALUE_PATTERN, "Coordination value");
      return locked(namespace, id, targetPath => {
        const prior = readEntry(targetPath, currentTime(), fsImpl);
        if (prior) return { claimed: false, existing: prior.value };
        writeEntry(targetPath, { value: normalized, expiresAt: expiry(ttlSeconds) }, fsImpl);
        return { claimed: true, existing: null };
      });
    },
    async get(namespace, id) {
      return locked(namespace, id, targetPath => readEntry(targetPath, currentTime(), fsImpl)?.value ?? null);
    },
    async compareAndSet(namespace, id, expectedValue, nextValue, ttlSeconds) {
      const expected = validate(expectedValue, VALUE_PATTERN, "Coordination expected value");
      const next = validate(nextValue, VALUE_PATTERN, "Coordination next value");
      return locked(namespace, id, targetPath => {
        const prior = readEntry(targetPath, currentTime(), fsImpl);
        if (!prior || prior.value !== expected) return false;
        writeEntry(targetPath, { value: next, expiresAt: expiry(ttlSeconds) }, fsImpl);
        return true;
      });
    },
    async increment(namespace, id, ttlSeconds) {
      return locked(namespace, id, targetPath => {
        const prior = readEntry(targetPath, currentTime(), fsImpl);
        const count = prior ? Number(prior.value) + 1 : 1;
        if (!Number.isSafeInteger(count) || count < 1) throw new Error("Coordination counter is invalid.");
        writeEntry(targetPath, {
          value: String(count),
          expiresAt: prior?.expiresAt ?? expiry(ttlSeconds),
        }, fsImpl);
        return count;
      });
    },
    async put(namespace, id, value, ttlSeconds) {
      const normalized = validate(value, VALUE_PATTERN, "Coordination value");
      return locked(namespace, id, targetPath => {
        writeEntry(targetPath, { value: normalized, expiresAt: expiry(ttlSeconds) }, fsImpl);
      });
    },
    async remove(namespace, id) {
      return locked(namespace, id, targetPath => {
        try { fsImpl.unlinkSync(targetPath); }
        catch (error) { if (error?.code !== "ENOENT") throw error; }
      });
    },
  });
}
