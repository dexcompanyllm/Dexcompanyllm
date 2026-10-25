import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { findSecretKinds, walk } from "../scripts/check.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("Node/CI, secret scanning, and service-worker cache boundaries stay locked", async (t) => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const workflow = fs.readFileSync(path.join(root, ".github/workflows/ci.yml"), "utf8");
  const appSource = fs.readFileSync(path.join(root, "apps/console/public/app.js"), "utf8");
  assert.equal(packageJson.engines.node, "24.x");
  assert.equal(fs.readFileSync(path.join(root, ".node-version"), "utf8").trim(), "24");
  assert.match(workflow, /branches:\s*\[[^\]]*"codex\/\*\*"[^\]]*\]/);
  assert.match(workflow, /node-version:\s*["']24["']/);
  assert.match(workflow, /run:\s*npm ci(?:\s|$)/m);
  assert.doesNotMatch(workflow, /run:\s*npm install\b/);
  assert.equal(appSource.match(/location\.assign\('\/logged-out'\)/g)?.length, 2);

  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "dex-stability-"));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  fs.mkdirSync(path.join(fixtureRoot, "src"));
  fs.writeFileSync(path.join(fixtureRoot, "src/kept.mjs"), "export {};\n");
  for (const generated of [".cache", ".git", "cache", "dist", "node_modules"]) {
    fs.mkdirSync(path.join(fixtureRoot, generated));
    fs.writeFileSync(path.join(fixtureRoot, generated, "ignored.js"), "not source\n");
  }
  assert.deepEqual(walk(fixtureRoot).map(file => path.relative(fixtureRoot, file)), [path.join("src", "kept.mjs")]);

  const pemLabel = ["PRIVATE", "KEY"].join(" ");
  const pem = [`-----BEGIN ${pemLabel}-----`, Buffer.alloc(256, 7).toString("base64"), `-----END ${pemLabel}-----`].join("\n");
  const encodedPem = Buffer.from(pem).toString("base64");
  const githubPrefix = ["ghp", "_"].join("");
  const githubToken = `${githubPrefix}0123456789abcdefghijklmnopqrstuvwxyzABCD`;
  const encodeJwtPart = value => Buffer.from(JSON.stringify(value)).toString("base64url");
  const jwt = [
    encodeJwtPart({ alg: "RS256", typ: "JWT" }),
    encodeJwtPart({ iss: "123456", iat: 1900000000, exp: 1900000600 }),
    "aB3dE5fG7hJ9kL1mN3pR5tV7xZ9aB3dE5fG7hJ9kL1mN3pR5tV7xZ9aB3dE5fG7hJ9kL1mN3pR5tV7xZ9",
  ].join(".");
  assert.deepEqual(findSecretKinds(pem), ["private-key-pem"]);
  assert.deepEqual(findSecretKinds(`GITHUB_APP_PRIVATE_KEY_B64=${encodedPem}`), ["github-app-private-key-b64"]);
  assert.deepEqual(findSecretKinds(githubToken), ["github-token"]);
  assert.deepEqual(findSecretKinds(jwt), ["jwt"]);
  const placeholderToken = [["github", "pat"].join("_"), "replace_me", "x".repeat(40)].join("_");
  assert.deepEqual(findSecretKinds(placeholderToken), []);
  assert.deepEqual(findSecretKinds("GITHUB_APP_PRIVATE_KEY_B64=replace_me"), []);

  const sensitiveEnvNames = [
    ["DEX", "ADMIN", "TOKEN"].join("_"),
    ["DEX", "APP", "ACCESS", "TOKEN"].join("_"),
    ["DEX", "AUTH", "SECRET", "B64"].join("_"),
    ["DEX", "MCP", "BEARER", "TOKEN"].join("_"),
    ["GITHUB", "APP", "CLIENT", "SECRET"].join("_"),
    ["KV", "REST", "API", "TOKEN"].join("_"),
    ["UPSTASH", "REDIS", "REST", "TOKEN"].join("_"),
  ];
  const syntheticValue = ["8Qm3", "vL7p", "Z2x9", "Aa6B", "c4D1"].join("-");
  for (const name of sensitiveEnvNames) {
    assert.deepEqual(findSecretKinds(`${name}=${syntheticValue}`), [`env-secret:${name}`]);
    assert.deepEqual(findSecretKinds(`export ${name}='${syntheticValue}'`), [`env-secret:${name}`]);
    assert.deepEqual(findSecretKinds(`process.env.${name} = "${syntheticValue}";`), [`env-secret:${name}`]);
    assert.deepEqual(findSecretKinds(`process.env.${name} = \`${syntheticValue}\`;`), [`env-secret:${name}`]);
    assert.deepEqual(findSecretKinds(`${name}: ${syntheticValue}`), [`env-secret:${name}`]);
    assert.deepEqual(findSecretKinds(`env:{${name}:"${syntheticValue}"}`), [`env-secret:${name}`]);
    assert.deepEqual(findSecretKinds(`process.env["${name}"] = "${syntheticValue}";`), [`env-secret:${name}`]);
    assert.deepEqual(findSecretKinds(`process.env["${name}"] = \`${syntheticValue}\`;`), [`env-secret:${name}`]);
    assert.deepEqual(findSecretKinds(`ENV ${name} ${syntheticValue}`), [`env-secret:${name}`]);
    assert.deepEqual(findSecretKinds(`- ${name}: ${syntheticValue}`), [`env-secret:${name}`]);
    for (const placeholder of ["", "replace_me", "<secret>", "${{ secrets.RUNTIME_SECRET }}"]) {
      assert.deepEqual(findSecretKinds(`${name}=${placeholder}`), []);
      assert.deepEqual(findSecretKinds(`${name}: ${placeholder}`), []);
    }
  }
  const deceptiveSecret = ["production", "integration", "secret", "9Fx7Q2pLm4"].join("-");
  assert.deepEqual(
    findSecretKinds(`${sensitiveEnvNames[0]}: ${deceptiveSecret}`),
    [`env-secret:${sensitiveEnvNames[0]}`],
  );
  assert.deepEqual(findSecretKinds(fs.readFileSync(path.join(root, ".env.example"), "utf8")), []);

  const genericOpenAiFixture = ["sk", "8Qm3vL7pZ2x9Aa6Bb4Cc1Dd7Ee5Ff"].join("-");
  assert.deepEqual(findSecretKinds(genericOpenAiFixture), ["openai-api-key"]);

  const handlers = {};
  const openedNames = [];
  const deletedNames = [];
  const cache = {
    added: [],
    puts: [],
    async addAll(requests) { this.added.push(...requests); },
    async put(request, response) { this.puts.push({ request, response }); },
  };
  const cachesApi = {
    async open(name) { openedNames.push(name); return cache; },
    async keys() { return ["dex-company-shell-v2", "dex-company-shell-v3", "dex-company-shell-v4", "unrelated-cache"]; },
    async delete(name) { deletedNames.push(name); return true; },
    async match() { return new Response("cached", { status: 200 }); },
  };
  let skipWaitingCalls = 0;
  let claimCalls = 0;
  const self = {
    location: { origin: "https://dex-company-runtime.example" },
    clients: { async claim() { claimCalls += 1; } },
    addEventListener(type, handler) { handlers[type] = handler; },
    async skipWaiting() { skipWaitingCalls += 1; },
  };
  const swSource = fs.readFileSync(path.join(root, "apps/console/public/sw.js"), "utf8");
  vm.runInNewContext(swSource, {
    caches: cachesApi,
    fetch: async () => new Response("network", { status: 200 }),
    Request,
    Response,
    self,
    URL,
  }, { filename: "sw.js" });

  let installWork;
  handlers.install({ waitUntil(value) { installWork = Promise.resolve(value); } });
  await installWork;
  assert.equal(skipWaitingCalls, 1);
  assert.deepEqual(cache.added.map(request => new URL(request.url).pathname), [
    "/styles.css",
    "/app.js",
    "/manifest.webmanifest",
    "/icon.svg",
  ]);
  assert.ok(cache.added.every(request => request.credentials === "omit"));

  let activateWork;
  handlers.activate({ waitUntil(value) { activateWork = Promise.resolve(value); } });
  await activateWork;
  assert.deepEqual(deletedNames, ["dex-company-shell-v2", "dex-company-shell-v3", "dex-company-shell-v4"]);
  assert.equal(claimCalls, 1);

  const dispatchFetch = request => {
    let responseWork;
    handlers.fetch({ request, respondWith(value) { responseWork = Promise.resolve(value); } });
    return responseWork;
  };
  for (const sensitivePath of ["/api", "/api/projects", "/mcp", "/auth/callback", "/.well-known/oauth-authorization-server", "/oauth/token"]) {
    assert.equal(dispatchFetch(new Request(`${self.location.origin}${sensitivePath}`)), undefined);
  }
  assert.equal(dispatchFetch(new Request(`${self.location.origin}/dashboard`)), undefined);
  assert.equal(dispatchFetch(new Request(`${self.location.origin}/app.js`, { headers: { Authorization: "Bearer hidden" } })), undefined);
  assert.equal(dispatchFetch(new Request(`${self.location.origin}/app.js`, { headers: { Cookie: "session=hidden" } })), undefined);

  const shellResponse = dispatchFetch(new Request(`${self.location.origin}/app.js`));
  assert.ok(shellResponse);
  assert.equal((await shellResponse).status, 200);
  assert.equal(cache.puts.length, 1);
  assert.equal(new URL(cache.puts[0].request.url).pathname, "/app.js");
  assert.ok(openedNames.every(name => name === "dex-company-shell-v8"));
});
