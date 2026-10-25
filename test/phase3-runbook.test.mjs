import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("Phase 3 documentation cannot omit the mandatory safety matrix or claim physical PASS", () => {
  const runbook = fs.readFileSync(new URL("../docs/PHASE3_LOCAL_BRIDGE.md", import.meta.url), "utf8");
  const matrix = fs.readFileSync(new URL("../docs/PHASE3_SAFETY_MATRIX.md", import.meta.url), "utf8");
  assert.match(runbook, /\[mandatory safety matrix\]\(PHASE3_SAFETY_MATRIX\.md\)/);
  assert.match(runbook, /original scenario matrix alone is not sufficient/i);
  for (const id of ["P3-PERM", "P3-CWD", "P3-PROCESS", "P3-SCOPE"]) assert.ok(matrix.includes(`| ${id} |`));
  for (const required of ["git rev-parse --show-toplevel", "creation time", "all descendants", "sentinel", "zero executor calls", "Not Checked", "#28 OPEN", "#34/#35 blocked"]) assert.ok(matrix.includes(required), required);
  assert.match(matrix, /do \*\*not\*\* prove enforcement on a physical Windows host/);
});
