import assert from "node:assert/strict";
import test from "node:test";
import { GitHubStore } from "../services/mcp-gateway/src/github-store.mjs";

const files = ["PROJECT_CONFIG.md", "CURRENT.md", "SESSION_HANDOFF.md", "DECISIONS.md", "QA_REPORT.md"];
function storeWith(concurrency = 4) {
  return new GitHubStore({ repo: "octo/example", env: {}, auth: { configured: true }, projectFetchConcurrency: concurrency });
}
test("project state overlaps bounded reads and preserves source order despite completion order", async () => {
  const store = storeWith(2);
  let active = 0, maximum = 0;
  const started = [], release = new Map();
  store.fetchDocument = async path => {
    const name = path.split("/").at(-1);
    started.push(name); active++; maximum = Math.max(maximum, active);
    await new Promise(resolve => release.set(name, resolve));
    active--;
    return { path, content: name, sha: name };
  };
  const job = store.getProjectState("DexCompany-Ops");
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(started, files.slice(0, 2));
  release.get(files[1])();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(started[2], files[2]);
  release.get(files[0])(); release.get(files[2])();
  await new Promise(resolve => setImmediate(resolve));
  release.get(files[4])(); release.get(files[3])();
  const result = await job;
  assert.equal(maximum, 2);
  assert.deepEqual(result.documents.map(x => x.content), files);
});
test("missing documents remain optional, permission failures propagate, and invalid projects do no reads", async () => {
  const store = storeWith(); let reads = 0;
  store.fetchDocument = async path => {
    reads++;
    if (path.endsWith("/DECISIONS.md")) throw Object.assign(new Error("missing"), { status: 404 });
    return { path };
  };
  const result = await store.getProjectState("DexCompany-Ops");
  assert.equal(reads, 5); assert.equal(result.documents.length, 4);
  reads = 0;
  await assert.rejects(store.getProjectState("../foreign"), /Invalid project/);
  assert.equal(reads, 0);
  store.fetchDocument = async () => { throw Object.assign(new Error("denied"), { status: 403 }); };
  await assert.rejects(store.getProjectState("DexCompany-Ops"), error => error.status === 403);
});
