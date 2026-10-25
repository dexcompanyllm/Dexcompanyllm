import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { createFileCoordinationStore } from "../services/orchestrator/src/file-coordination-store.mjs";

async function withSpool(run) {
  const spool = fs.mkdtempSync(path.join(os.tmpdir(), "dex-file-coordination-"));
  try { return await run(spool); }
  finally { fs.rmSync(spool, { recursive: true, force: true }); }
}

const id = "a".repeat(43);

test("independent local broker stores atomically elect one claimant and survive restart", async () => withSpool(async spool => {
  const stores = Array.from({ length: 10 }, () => createFileCoordinationStore(spool));
  const claims = await Promise.all(stores.map((store, index) => store.claim(
    "task-execution",
    id,
    `active:attempt_${String(index).padStart(3, "0")}`,
    60,
  )));
  assert.equal(claims.filter(claim => claim.claimed).length, 1);
  const winner = claims.find(claim => claim.claimed);
  const restarted = createFileCoordinationStore(spool);
  assert.equal(await restarted.get("task-execution", id), `active:attempt_${String(claims.indexOf(winner)).padStart(3, "0")}`);
}));

test("local broker coordination persists CAS and monotonic counters with expiry", async () => withSpool(async spool => {
  let now = 1_000;
  let nowMilliseconds = 1_000_000;
  const options = { now: () => now, nowMilliseconds: () => nowMilliseconds };
  const first = createFileCoordinationStore(spool, options);
  assert.deepEqual(await first.claim("broker-session", id, "owner-one", 10), { claimed: true, existing: null });
  assert.equal(await first.compareAndSet("broker-session", id, "wrong-owner", "owner-two", 10), false);
  assert.equal(await first.compareAndSet("broker-session", id, "owner-one", "owner-two", 10), true);
  assert.equal(await createFileCoordinationStore(spool, options).get("broker-session", id), "owner-two");
  assert.equal(await first.increment("task-status", id, 10), 1);
  assert.equal(await createFileCoordinationStore(spool, options).increment("task-status", id, 10), 2);
  now += 11;
  nowMilliseconds += 11_000;
  assert.equal(await first.get("broker-session", id), null);
  assert.deepEqual(await first.claim("broker-session", id, "owner-three", 10), { claimed: true, existing: null });
}));
