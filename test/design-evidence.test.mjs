import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  validateEvidence,
  hashPlan,
  reserveArtifactBytes,
  unsafeInputPath,
  LIMITS,
} from '../plugins/dex-company-core/skills/design-quality/scripts/validate-design-evidence.mjs';

const cli = fileURLToPath(new URL('../plugins/dex-company-core/skills/design-quality/scripts/validate-design-evidence.mjs', import.meta.url));
const sha256 = (contents) => createHash('sha256').update(contents).digest('hex');

function linkOrSkip(t, target, link, type) {
  try { fs.symlinkSync(target, link, type); return true; }
  catch (error) {
    if (['EPERM', 'EACCES', 'ENOSYS', 'ENOTSUP'].includes(error.code)) {
      t.skip('Host cannot create the required link; no permission elevation requested.');
      return false;
    }
    throw error;
  }
}

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'dex-design-evidence-'));
  const root = path.join(directory, 'evidence');
  fs.mkdirSync(root);
  fs.mkdirSync(path.join(root, 'artifacts'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const checkContents = 'Local measurement report: 360 by 800, default state.\n';
  const reviewContents = 'Independent reviewer inspected the declared revision.\n';
  fs.writeFileSync(path.join(root, 'artifacts/check.txt'), checkContents);
  fs.writeFileSync(path.join(root, 'artifacts/review.txt'), reviewContents);
  const plan = {
    schemaVersion: 2, taskId: 'design-42', revision: `git:${'a'.repeat(40)}`, authorRunId: 'author-1',
    requiredChecks: [{ id: 'mobile-default', kind: 'mechanical', viewport: { width: 360, height: 800 }, state: 'default' }],
  };
  const evidence = {
    schemaVersion: 2, taskId: 'design-42', revision: `git:${'a'.repeat(40)}`, planSha256: hashPlan(plan),
    checks: [{ id: 'mobile-default', status: 'PASS', runId: 'measurement-1', artifact: { path: 'artifacts/check.txt', sha256: sha256(checkContents) }, summary: 'Measurement evidence attached.' }],
    review: { status: 'PASS', reviewerRunId: 'reviewer-2', artifact: { path: 'artifacts/review.txt', sha256: sha256(reviewContents) }, summary: 'Review evidence attached.' },
  };
  const syncPlanHash = () => { evidence.planSha256 = hashPlan(plan); };
  const write = () => {
    fs.writeFileSync(path.join(directory, 'plan.json'), JSON.stringify(plan));
    fs.writeFileSync(path.join(root, 'evidence.json'), JSON.stringify(evidence));
  };
  const run = (args = [path.join(directory, 'plan.json'), path.join(root, 'evidence.json')]) => {
    const output = spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
    assert.equal(output.error, undefined);
    assert.equal(output.stderr, '');
    return { ...output, parsed: JSON.parse(output.stdout) };
  };
  return { directory, root, plan, evidence, syncPlanHash, write, run };
}

function blocked(f, pattern) {
  const output = validateEvidence(f.plan, f.evidence, f.root);
  assert.equal(output.status, 'BLOCKED');
  assert.ok(output.issues.length > 0);
  if (pattern) assert.match(output.issues.join('\n'), pattern);
  assert.match(output.limitation, /not a visual quality or WCAG certification/u);
  assert.match(output.limitation, /never an override for canonical Task validation, detailed FAIL, or Not Checked/u);
  return output;
}

test('complete local evidence returns the deliberately limited successful status', (t) => {
  const f = fixture(t);
  const output = validateEvidence(f.plan, f.evidence, f.root);
  assert.equal(output.status, 'EVIDENCE_PACKAGE_COMPLETE');
  assert.deepEqual(output.issues, []);
  assert.equal(output.planSha256, hashPlan(f.plan));
  assert.equal(output.planSha256, '0ed6b5a10b6481b7bede4eae91a1d93914dc00037eb039283a693e65f75fb845');
  assert.equal(Object.hasOwn(output, 'verdict'), false);
  assert.equal(Object.hasOwn(output, 'outcome'), false);
  assert.match(output.limitation, /not a visual quality or WCAG certification/u);
  assert.match(output.limitation, /never an override for canonical Task validation, detailed FAIL, or Not Checked/u);
});

test('all three check kinds and multiple viewports are supported', (t) => {
  const f = fixture(t);
  for (const kind of ['visual', 'accessibility']) {
    f.plan.requiredChecks.push({ id: kind, kind, viewport: { width: 1280, height: 900 }, state: 'empty' });
    f.evidence.checks.push({ ...f.evidence.checks[0], id: kind });
  }
  f.syncPlanHash();
  assert.equal(validateEvidence(f.plan, f.evidence, f.root).status, 'EVIDENCE_PACKAGE_COMPLETE');
});

test('canonical plan hashes are stable across object key order', () => {
  assert.equal(
    hashPlan({ z: [3, { b: true, a: null }], a: 'value' }),
    hashPlan({ a: 'value', z: [3, { a: null, b: true }] }),
  );
});

test('plan hash binds evidence to the exact declared plan', (t) => {
  const f = fixture(t);
  f.plan.requiredChecks[0].state = 'error';
  blocked(f, /does not match the canonical plan contents/u);
  f.syncPlanHash();
  assert.equal(validateEvidence(f.plan, f.evidence, f.root).status, 'EVIDENCE_PACKAGE_COMPLETE');
  f.evidence.planSha256 = 'invalid';
  blocked(f, /64 lowercase hexadecimal/u);
});

test('mutable revision aliases are rejected', (t) => {
  const f = fixture(t);
  f.plan.revision = 'main';
  f.evidence.revision = 'main';
  f.syncPlanHash();
  blocked(f, /git:<40-or-64-lowercase-hex>/u);
});

test('missing required evidence blocks completion', (t) => {
  const f = fixture(t);
  f.plan.requiredChecks.push({ ...f.plan.requiredChecks[0], id: 'desktop-error' });
  blocked(f, /required evidence is missing/u);
});

for (const status of ['FAIL', 'Not Checked', 'PASSED']) {
  test(`check status ${status} blocks completion`, (t) => {
    const f = fixture(t);
    f.evidence.checks[0].status = status;
    blocked(f, /\.status:/u);
  });
  test(`review status ${status} blocks completion`, (t) => {
    const f = fixture(t);
    f.evidence.review.status = status;
    blocked(f, /review.status:/u);
  });
}

test('duplicate required IDs block completion', (t) => {
  const f = fixture(t);
  f.plan.requiredChecks.push({ ...f.plan.requiredChecks[0] });
  blocked(f, /duplicate required check ID/u);
});

test('duplicate evidence IDs block completion', (t) => {
  const f = fixture(t);
  f.evidence.checks.push({ ...f.evidence.checks[0] });
  blocked(f, /duplicate evidence check ID/u);
});

test('unknown evidence cannot replace a missing required ID', (t) => {
  const f = fixture(t);
  f.evidence.checks[0].id = 'unplanned';
  const output = blocked(f, /not present in the plan/u);
  assert.match(output.issues.join('\n'), /required evidence is missing/u);
});

for (const field of ['requiredChecks', 'checks']) {
  test(`empty ${field} blocks completion`, (t) => {
    const f = fixture(t);
    (field === 'requiredChecks' ? f.plan : f.evidence)[field] = [];
    blocked(f, /expected 1 to 512 entries/u);
  });
}

for (const field of ['revision', 'taskId']) {
  test(`mismatched ${field} blocks completion`, (t) => {
    const f = fixture(t);
    f.evidence[field] = 'stale-or-different';
    blocked(f, /does not match the plan/u);
  });
}

test('missing review and same author/reviewer run both block completion', (t) => {
  const f = fixture(t);
  f.evidence.review.reviewerRunId = f.plan.authorRunId;
  blocked(f, /must differ from the author run ID/u);
  delete f.evidence.review;
  blocked(f, /evidence.review/u);
});

test('review run must differ from every check run', (t) => {
  const f = fixture(t);
  f.evidence.review.reviewerRunId = f.evidence.checks[0].runId;
  blocked(f, /must differ from every evidence check run ID/u);
});

test('review evidence cannot reuse a check artifact by path or digest', (t) => {
  const f = fixture(t);
  f.evidence.review.artifact = { ...f.evidence.checks[0].artifact };
  blocked(f, /distinct review report/u);

  const copiedPath = path.join(f.root, 'artifacts/check-copy.txt');
  fs.copyFileSync(path.join(f.root, 'artifacts/check.txt'), copiedPath);
  f.evidence.review.artifact = { path: 'artifacts/check-copy.txt', sha256: f.evidence.checks[0].artifact.sha256 };
  blocked(f, /distinct review report/u);
});

test('digest mismatches and malformed hashes block completion', (t) => {
  const f = fixture(t);
  f.evidence.checks[0].artifact.sha256 = '0'.repeat(64);
  blocked(f, /does not match the file contents/u);
  f.evidence.checks[0].artifact.sha256 = 'untrusted hash';
  blocked(f, /64 lowercase hexadecimal/u);
});

for (const unsafePath of ['../outside.txt', 'artifacts/../../outside.txt', '/etc/passwd', 'C:\\secret.txt', 'C:/secret.txt', '\\\\server\\file', 'https://example.com/report', 'file:///tmp/report', 'artifacts//check.txt', './artifacts/check.txt', 'artifacts/NUL.txt', 'artifacts/CON .txt', 'artifacts/COM¹.txt', 'artifacts/CONIN$.txt', 'artifacts/report. ', 'artifacts/check.txt\u0000']) {
  test(`unsafe artifact path case ${JSON.stringify(unsafePath)} is rejected without echoing it`, (t) => {
    const f = fixture(t);
    f.evidence.checks[0].artifact.path = unsafePath;
    const output = blocked(f, /relative forward-slash path/u);
    assert.equal(JSON.stringify(output).includes(unsafePath), false);
  });
}

test('file symlink to a file outside the evidence root is rejected', (t) => {
  const f = fixture(t);
  const outside = path.join(f.directory, 'outside.txt');
  fs.writeFileSync(outside, 'outside');
  if (!linkOrSkip(t, outside, path.join(f.root, 'artifacts/link.txt'))) return;
  f.evidence.checks[0].artifact = { path: 'artifacts/link.txt', sha256: sha256('outside') };
  blocked(f, /symlink/u);
});

test('file symlink to another file within the evidence root is also rejected', (t) => {
  const f = fixture(t);
  if (!linkOrSkip(t, path.join(f.root, 'artifacts/check.txt'), path.join(f.root, 'artifacts/link.txt'))) return;
  f.evidence.checks[0].artifact.path = 'artifacts/link.txt';
  blocked(f, /symlink/u);
});

test('directory symlinks and symlink evidence roots are rejected', (t) => {
  const f = fixture(t);
  if (!linkOrSkip(t, path.join(f.root, 'artifacts'), path.join(f.root, 'linked-directory'), process.platform === 'win32' ? 'junction' : 'dir')) return;
  f.evidence.checks[0].artifact.path = 'linked-directory/check.txt';
  blocked(f, /symlink/u);
  const alias = path.join(f.directory, 'root-alias');
  if (!linkOrSkip(t, f.root, alias, process.platform === 'win32' ? 'junction' : 'dir')) return;
  f.root = alias;
  blocked(f, /root: expected/u);
});

test('missing artifacts and non-regular artifacts are rejected', (t) => {
  const f = fixture(t);
  f.evidence.checks[0].artifact.path = 'artifacts/missing.txt';
  blocked(f, /cannot be read safely/u);
  f.evidence.checks[0].artifact.path = 'artifacts';
  blocked(f, /regular file/u);
});

test('an artifact larger than 25 MiB is rejected before hashing', (t) => {
  const f = fixture(t);
  fs.truncateSync(path.join(f.root, 'artifacts/check.txt'), LIMITS.artifactBytes + 1);
  blocked(f, /25 MiB/u);
});

test('aggregate artifact size is capped independently of per-file size', (t) => {
  const f = fixture(t);
  const size = 22 * 1024 * 1024;
  f.plan.requiredChecks = [];
  f.evidence.checks = [];
  for (let index = 0; index < 3; index += 1) {
    const id = `large-${index}`;
    const relative = `artifacts/${id}.bin`;
    const filename = path.join(f.root, relative);
    fs.writeFileSync(filename, Buffer.alloc(0));
    fs.truncateSync(filename, size);
    f.plan.requiredChecks.push({ id, kind: 'mechanical', viewport: { width: 360, height: 800 }, state: 'default' });
    f.evidence.checks.push({
      id,
      status: 'PASS',
      runId: `measurement-${index}`,
      artifact: { path: relative, sha256: sha256(fs.readFileSync(filename)) },
      summary: 'Large bounded fixture.',
    });
  }
  f.syncPlanHash();
  blocked(f, /64 MiB aggregate size limit/u);
});

test('aggregate byte reservation rejects overflow without mutating the budget', () => {
  const budget = { bytes: LIMITS.totalArtifactBytes - 1 };
  assert.equal(reserveArtifactBytes(budget, 1), true);
  assert.equal(budget.bytes, LIMITS.totalArtifactBytes);
  assert.equal(reserveArtifactBytes(budget, 1), false);
  assert.equal(budget.bytes, LIMITS.totalArtifactBytes);
});

test('input path policy blocks remote, device, ADS, and reserved Windows paths', () => {
  for (const candidate of [
    '\\\\server\\share\\plan.json',
    '//server/share/plan.json',
    '/\\server\\share\\plan.json',
    '\\/server/share/plan.json',
    '\\\\?\\C:\\temp\\plan.json',
    '\\\\.\\pipe\\dex',
    '\\??\\C:\\temp\\plan.json',
    '\\Device\\HarddiskVolume1\\plan.json',
    'C:\\temp\\plan.json:stream',
    'C:\\temp\\CON.json',
    'C:\\temp\\CON .json',
    'C:\\temp\\COM¹.json',
    'C:\\temp\\CONOUT$.json',
    'C:\\temp\\trailing.\\plan.json',
    'https://example.com/plan.json',
    'relative:stream',
  ]) assert.equal(unsafeInputPath(candidate), true, candidate);
  for (const candidate of ['C:\\local\\plan.json', 'C:/local/plan.json', '/tmp/plan.json', 'relative/plan.json']) {
    assert.equal(unsafeInputPath(candidate), false, candidate);
  }
});

test('oversized and excessive check inputs block completion', (t) => {
  const f = fixture(t);
  f.plan.requiredChecks = Array.from({ length: LIMITS.checks + 1 }, (_, index) => ({ ...f.plan.requiredChecks[0], id: `check-${index}` }));
  blocked(f, /expected 1 to 512 entries/u);
  f.evidence.checks = Array.from({ length: LIMITS.checks + 1 }, (_, index) => ({ ...f.evidence.checks[0], id: `check-${index}` }));
  blocked(f, /evidence.checks: expected 1 to 512 entries/u);
  f.evidence.checks = [{ ...f.evidence.checks[0], summary: 'x'.repeat(LIMITS.jsonBytes) }];
  blocked(f, /no larger than 1 MiB/u);
});

test('invalid object types, cyclic values, and missing root never throw', (t) => {
  const f = fixture(t);
  for (const invalid of [null, undefined, [], 42, 'text', true, { self: null }, 1n]) {
    assert.equal(validateEvidence(invalid, f.evidence, f.root).status, 'BLOCKED');
    assert.equal(validateEvidence(f.plan, invalid, f.root).status, 'BLOCKED');
  }
  const cyclic = {};
  cyclic.self = cyclic;
  assert.equal(validateEvidence(cyclic, f.evidence, f.root).status, 'BLOCKED');
  assert.equal(validateEvidence(f.plan, f.evidence, undefined).status, 'BLOCKED');
});

test('malformed nested fields, invalid viewports, kinds, and excessive strings block', (t) => {
  const f = fixture(t);
  f.plan.requiredChecks[0] = { id: [], kind: 'automated', viewport: { width: 0, height: 1.5 }, state: '' };
  f.evidence.checks[0] = { id: null, status: [], runId: '', artifact: null, summary: 'x'.repeat(4097) };
  blocked(f, /viewport/u);
  f.plan.requiredChecks = [null];
  f.evidence.checks = [null];
  f.evidence.review = [];
  blocked(f, /exact supported object fields/u);
});

test('unknown keys and unsupported schema versions block completion', (t) => {
  const f = fixture(t);
  f.plan.schemaVersion = 3;
  f.evidence.checks[0].surprise = 'not part of the schema';
  const output = blocked(f, /schemaVersion/u);
  assert.match(output.issues.join('\n'), /exact supported object fields/u);
});

test('CLI uses the evidence file directory and returns exit 0 on complete evidence', (t) => {
  const f = fixture(t);
  f.write();
  const output = f.run();
  assert.equal(output.status, 0);
  assert.equal(output.parsed.status, 'EVIDENCE_PACKAGE_COMPLETE');
});

test('CLI computes the canonical plan hash without claiming task success', (t) => {
  const f = fixture(t);
  f.write();
  const output = f.run(['--plan-sha256', path.join(f.directory, 'plan.json')]);
  assert.equal(output.status, 0);
  assert.equal(output.parsed.status, 'PLAN_SHA256');
  assert.equal(output.parsed.planSha256, hashPlan(f.plan));
  assert.equal(Object.hasOwn(output.parsed, 'verdict'), false);
  assert.equal(Object.hasOwn(output.parsed, 'outcome'), false);
});

test('CLI rejects remote and Windows device input paths before filesystem access', (t) => {
  const f = fixture(t);
  f.write();
  for (const candidate of ['\\\\server\\share\\plan.json', '\\\\?\\C:\\plan.json', 'https://example.com/plan.json']) {
    const output = f.run([candidate, path.join(f.root, 'evidence.json')]);
    assert.equal(output.status, 1);
    assert.equal(output.parsed.status, 'BLOCKED');
    assert.equal(output.stdout.includes(candidate), false);
  }
});

test('CLI returns JSON and exit 1 for failed reports, invalid JSON, and usage errors', (t) => {
  const f = fixture(t);
  f.evidence.review.status = 'FAIL';
  f.write();
  assert.equal(f.run().status, 1);
  fs.writeFileSync(path.join(f.directory, 'plan.json'), 'SECRET_SHOULD_NOT_BE_PRINTED');
  const invalid = f.run();
  assert.equal(invalid.status, 1);
  assert.equal(invalid.stdout.includes('SECRET_SHOULD_NOT_BE_PRINTED'), false);
  assert.equal(invalid.parsed.status, 'BLOCKED');
  assert.equal(f.run([]).status, 1);
});

test('CLI rejects input JSON over 1 MiB and input symlinks', (t) => {
  const f = fixture(t);
  f.write();
  fs.writeFileSync(path.join(f.directory, 'plan.json'), ' '.repeat(LIMITS.jsonBytes + 1));
  assert.equal(f.run().status, 1);
  f.write();
  const alias = path.join(f.directory, 'plan-alias.json');
  if (!linkOrSkip(t, path.join(f.directory, 'plan.json'), alias)) return;
  const output = f.run([alias, path.join(f.root, 'evidence.json')]);
  assert.equal(output.status, 1);
  assert.match(output.parsed.issues.join('\n'), /without symlinks/u);
});

test('CLI rejects invalid UTF-8 instead of silently replacing it', (t) => {
  const f = fixture(t);
  f.write();
  fs.writeFileSync(path.join(f.directory, 'plan.json'), Buffer.from([0x7b, 0x22, 0x80, 0x22, 0x3a, 0x31, 0x7d]));
  assert.equal(f.run().status, 1);
});

test('stable ancestor directory links are accepted while final input links remain blocked', (t) => {
  const f = fixture(t);
  f.write();
  const alias = path.join(path.dirname(f.directory), `${path.basename(f.directory)}-ancestor-alias`);
  t.after(() => fs.rmSync(alias, { recursive: true, force: true }));
  if (!linkOrSkip(t, f.directory, alias, process.platform === 'win32' ? 'junction' : 'dir')) return;
  const output = f.run([path.join(alias, 'plan.json'), path.join(alias, 'evidence/evidence.json')]);
  assert.equal(output.status, 0);
  assert.equal(output.parsed.status, 'EVIDENCE_PACKAGE_COMPLETE');
});


test('CLI launched through a symlink still reports missing arguments as BLOCKED', (t) => {
  const f = fixture(t);
  const alias = path.join(f.directory, 'validator-link.mjs');
  if (!linkOrSkip(t, cli, alias)) return;
  const output = spawnSync(process.execPath, [alias], { encoding: 'utf8' });
  assert.equal(output.status, 1);
  assert.equal(JSON.parse(output.stdout).status, 'BLOCKED');
});

test('export API rejects sparse required and observed arrays', (t) => {
  const f = fixture(t);
  f.plan.requiredChecks = Array(1);
  f.evidence.checks = Array(1);
  blocked(f, /exact supported object fields/u);
});
