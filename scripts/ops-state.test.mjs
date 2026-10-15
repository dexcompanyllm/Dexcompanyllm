import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { BASE, FILES, SNAPSHOT, HISTORY_BEGIN, HISTORY_END, render, verify, validateSnapshot } from './ops-state.mjs';
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
