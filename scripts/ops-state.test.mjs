import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { BASE, FILES, SNAPSHOT, HISTORY_BEGIN, HISTORY_END, PUBLIC_HISTORY_ARCHIVE, render, verify, validateSnapshot, readHistory } from './ops-state.mjs';
const s = JSON.parse(fs.readFileSync(new URL('../' + SNAPSHOT, import.meta.url), 'utf8'));
const old = Buffer.from('\ufeff# Historical\r\nPAST PASS\r\n[[unchanged link]]\r\n');
test('valid evidence renders all eight documents and preserves exact bytes including BOM/CRLF', () => {
  assert.equal(FILES.length, 8);
  for (const file of FILES) {
    const output = render(s, file, old);
    verify(s, file, output, old);
    const start = output.indexOf(HISTORY_BEGIN) + Buffer.byteLength(HISTORY_BEGIN);
    const end = output.length - Buffer.byteLength(HISTORY_END);
    assert.deepEqual(output.subarray(start, end), old);
    for (const id of ['P3-PERM', 'P3-CWD', 'P3-PROCESS', 'P3-SCOPE']) assert.ok(output.includes(id));
  }
});
test('a stale SHA, false PASS, missing safety row and changed historical byte each FAIL', () => {
  for (const file of FILES) {
    const good = render(s, file, old);
    for (const modified of [
      Buffer.from(good.toString().replace(s.runtimeSha, 'a'.repeat(40))),
      Buffer.from(good.toString().replace('**Not Checked**', '**PASS**')),
      Buffer.from(good.toString().replace('| P3-CWD |', '| OMITTED |')),
      Buffer.from(good.toString().replace('PAST PASS', 'HISTORY CHANGED')),
    ]) assert.throws(() => verify(s, file, modified, old), /Document drift/);
  }
});
test('bad evidence and silent host, billing, permission or model promotion are rejected', () => {
  for (const change of [
    { runtimeSha: 'main' }, { historyBase: 'b'.repeat(40) }, { mainRun: null },
    { mainStatus: 'success' }, { physicalWindows: 'PASS' }, { issue28: 'CLOSED' },
    { issue34: 'enabled' }, { issue35: 'enabled' }, { billingChanged: true },
    { permissionsChanged: true }, { recommendedCodex: '0.153.4' },
  ]) assert.throws(() => validateSnapshot({ ...s, ...change }));
  assert.throws(() => render(s, '../unrelated', old));
});
test('a genuine failed CI snapshot is displayed as FAIL rather than silently changed to PASS', () => {
  const failed = { ...s, mainStatus: 'FAIL' };
  const output = render(failed, FILES[0], old);
  assert.ok(output.includes(`\`${s.mainRun}\` / FAIL`));
  assert.throws(() => verify(s, FILES[0], output, old), /Document drift/);
});
test('persistent document CI is read-only and does not install dependencies or publish', () => {
  const yml = fs.readFileSync(new URL('../.github/workflows/ops-state.yml', import.meta.url), 'utf8');
  assert.match(yml, /contents: read/);
  assert.match(yml, /persist-credentials: false/);
  assert.doesNotMatch(yml, /contents: write|pull_request_target|secrets\.|git push|continue-on-error|npm install|npm ci/);
  assert.ok(yml.includes('node --test scripts/ops-state.test.mjs'));
  assert.ok(yml.includes('node scripts/ops-state.mjs'));
});

test('non-PASS branch or main snapshots render STOP, never executable host instructions', () => {
  for (const field of ['branchStatus', 'mainStatus']) {
    for (const verdict of ['FAIL', 'Not Checked']) {
      for (const file of FILES) {
        const output = render({ ...s, [field]: verdict }, file, old).toString();
        assert.match(output, /중단 — Runtime 검증이 PASS가 아니에요/);
        assert.doesNotMatch(output.split(HISTORY_BEGIN)[0], /worker:host-check|위 검증된 Runtime commit을 고정/);
        assert.match(output, /#28 OPEN/);
      }
    }
  }
});
test('active guardrails remain explicit outside preserved original blocks', () => {
  for (const file of FILES) {
    const active = render(s, file, old).toString().split(HISTORY_BEGIN)[0];
    for (const text of ['정책은 계속 현행 규칙', '계속 적용되는 보안·권한 규칙', 'danger-full-access', 'approval=never', 'GitHub CLI/Git/SSH push credential', 'Hosted MCP writes', 'diagnostic upload', 'legacy 삭제']) assert.ok(active.includes(text), text);
    assert.doesNotMatch(active, /이전 원문 보관 — 현재 실행 지시가 아니에요/);
  }
});

test('inconsistent test or audit counts cannot become current evidence', () => {
  for (const change of [
    { runtimeTests: { total: 286, pass: 286, fail: 0, skipped: 1 } },
    { runtimeTests: { total: 286, pass: 284, fail: 1, skipped: 1 } },
    { productionAudit: { info: 0, low: 0, moderate: 2, high: 0, critical: 0, total: 0 } },
  ]) assert.throws(() => validateSnapshot({ ...s, ...change }), /Invalid .* evidence/);
  const failed = { ...s, mainStatus: 'FAIL', runtimeTests: { total: 286, pass: 284, fail: 1, skipped: 1 } };
  assert.doesNotThrow(() => validateSnapshot(failed));
  assert.match(render(failed, FILES[0], old).toString(), /FAIL 1/);
});

const repository = fileURLToPath(new URL('../', import.meta.url));
const command = fileURLToPath(new URL('./ops-state.mjs', import.meta.url));
function publicFixture(context) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dex-public-history-'));
  context.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const name of [SNAPSHOT, PUBLIC_HISTORY_ARCHIVE, ...FILES]) {
    const target = path.join(root, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(repository, name), target);
  }
  return root;
}
function runCLI(root) {
  // No Git executable or repository is available; the real command must work
  // from its reviewed archive, never from generated current-file expectations.
  return spawnSync(process.execPath, [command], {
    cwd: root, encoding: 'utf8', timeout: 5000,
    env: { ...process.env, PATH: '', GIT_DIR: path.join(root, 'absent-git') },
  });
}
function rejectCLI(root, pattern) {
  const result = runCLI(root);
  assert.equal(result.status, 1, result.error?.message);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, pattern);
}

test('real public CLI passes without Git and reports the historical redaction honestly', context => {
  const root = publicFixture(context);
  assert.equal(fs.existsSync(path.join(root, '.git')), false);
  const result = runCLI(root);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /seven original documents, one owner-approved redaction/);
  assert.match(result.stdout, /Windows remains Not Checked/);
  assert.equal(result.stderr, '');
});

test('real CLI rejects active SHA/status/safety drift and historical edits in every document', context => {
  const root = publicFixture(context);
  for (const file of FILES) {
    const target = path.join(root, file);
    const original = fs.readFileSync(target);
    const text = original.toString('utf8');
    for (const mutate of [
      value => value.replace(s.runtimeSha, 'a'.repeat(40)),
      value => value.replace('**Not Checked**', '**PASS**'),
      value => value.replace('| P3-CWD |', '| OMITTED |'),
      value => value.replace(HISTORY_BEGIN, HISTORY_BEGIN + 'unauthorized historical edit\n'),
    ]) {
      const changed = mutate(text);
      assert.notEqual(changed, text);
      fs.writeFileSync(target, changed);
      rejectCLI(root, /Document drift/);
      fs.writeFileSync(target, original);
    }
  }
});

test('real CLI rejects silent permission promotion in snapshot evidence', context => {
  const root = publicFixture(context);
  const target = path.join(root, SNAPSHOT);
  fs.writeFileSync(target, JSON.stringify({ ...s, permissionsChanged: true }));
  rejectCLI(root, /Policy change outside repair/);
});

test('real CLI rejects a missing archive and never falls back to generated history', context => {
  const root = publicFixture(context);
  fs.unlinkSync(path.join(root, PUBLIC_HISTORY_ARCHIVE));
  rejectCLI(root, /Missing or nonregular verification file/);
});

test('real CLI rejects archive tampering, wrong schema/identity and duplicate/missing/extra paths', context => {
  const root = publicFixture(context);
  const target = path.join(root, PUBLIC_HISTORY_ARCHIVE);
  const original = fs.readFileSync(target);
  const corrupt = Buffer.from(original);
  corrupt[0] = 0x5b; // same byte length: must fail the independently pinned hash
  fs.writeFileSync(target, corrupt);
  rejectCLI(root, /archive integrity failure/);
  for (const mutate of [
    value => { value.schemaVersion = 2; },
    value => { value.originalSource.commit = 'a'.repeat(40); },
    value => { value.documents[0].path = value.documents[1].path; },
    value => { value.documents.pop(); },
    value => { value.documents.push({ ...value.documents[0], path: 'unexpected.md' }); },
    value => { value.documents[0].base64 = Buffer.from('unapproved baseline').toString('base64'); },
  ]) {
    const archive = JSON.parse(original.toString());
    mutate(archive);
    fs.writeFileSync(target, JSON.stringify(archive));
    rejectCLI(root, /archive integrity failure|Verification file size mismatch/);
  }
});

test('real CLI rejects file/directory and parent-symlink boundary bypasses', context => {
  for (const mode of ['archive-directory', 'archive-symlink', 'archive-parent-symlink', 'document-symlink', 'document-parent-symlink']) {
    const root = publicFixture(context);
    if (mode === 'archive-directory') {
      const target = path.join(root, PUBLIC_HISTORY_ARCHIVE);
      fs.unlinkSync(target); fs.mkdirSync(target);
    } else {
      const relative = mode === 'archive-parent-symlink' ? 'scripts/fixtures'
        : mode === 'document-parent-symlink' ? '10_Projects/DexCompany-Ops'
          : mode === 'document-symlink' ? FILES[0] : PUBLIC_HISTORY_ARCHIVE;
      const target = path.join(root, relative);
      const moved = path.join(root, 'moved-verification-input');
      const directory = mode.endsWith('parent-symlink');
      fs.renameSync(target, moved);
      fs.symlinkSync(moved, target, directory ? 'dir' : 'file');
    }
    rejectCLI(root, /Missing or nonregular verification file/);
  }
});

test('changing both the current document and exported baseline cannot repin the checker', context => {
  const root = publicFixture(context);
  const doc = path.join(root, FILES[0]);
  fs.writeFileSync(doc, fs.readFileSync(doc, 'utf8').replace(HISTORY_BEGIN, HISTORY_BEGIN + 'changed\n'));
  const target = path.join(root, PUBLIC_HISTORY_ARCHIVE);
  const archive = JSON.parse(fs.readFileSync(target, 'utf8'));
  archive.documents[0].base64 = Buffer.from('changed\n').toString('base64');
  fs.writeFileSync(target, JSON.stringify(archive));
  rejectCLI(root, /archive integrity failure|Verification file size mismatch/);
});

test('unapproved history paths are rejected before any archive read', () => {
  assert.throws(() => readHistory('../outside.md', '/nonexistent-root'), /Unapproved history path/);
});
