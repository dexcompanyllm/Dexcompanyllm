import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { packDocuments, expandPack, selectPaths, loadContext } from './context-pack.mjs';

const shared = '<!-- DEX_CURRENT_STATUS_BEGIN -->\npermission=deny\n<!-- DEX_CURRENT_STATUS_END -->';
test('exact shared blocks are included once and every unique byte is restored', () => {
  const docs = [
    { path: 'a', sha: 'a', content: '\ufeff# One\r\n' + shared + '\r\nHISTORY policy A' },
    { path: 'b', sha: 'b', content: '# Two\n' + shared + '\nHISTORY policy B' },
    { path: 'c', sha: 'c', content: shared.replace('deny', 'allow') },
    { path: 'd', sha: 'd', content: 'no marker: unique provider policy\n' },
  ];
  const pack = packDocuments(docs);
  assert.deepEqual(expandPack(pack), docs);
  assert.equal(Object.keys(pack.blocks).length, 2);
  assert.equal(pack.metrics.duplicateBytesRemoved, Buffer.byteLength(shared));
  assert.match(JSON.stringify(pack), /HISTORY policy A/);
  assert.match(JSON.stringify(pack), /HISTORY policy B/);
});
test('malformed markers, missing blocks and modified content cannot silently remove policy', () => {
  for (const content of ['<!-- DEX_CURRENT_STATUS_BEGIN -->', '<!-- DEX_CURRENT_STATUS_END --><!-- DEX_CURRENT_STATUS_BEGIN -->', shared + shared]) {
    assert.throws(() => packDocuments([{ path: 'x', content }]), /markers/);
  }
  const pack = packDocuments([{ path: 'x', content: shared }]);
  const id = Object.keys(pack.blocks)[0]; pack.blocks[id] += 'changed';
  assert.throws(() => expandPack(pack), /changed shared block/);
});
test('provider and project selection excludes other adapters and rejects traversal', () => {
  const selected = selectPaths('DexCompany-Ops', 'anthropic');
  assert.ok(selected.includes('CLAUDE.md'));
  assert.ok(selected.includes('providers/anthropic.yaml'));
  assert.equal(selected.includes('providers/openai.yaml'), false);
  assert.throws(() => selectPaths('../other', 'openai'));
  for (const provider of ['unknown', '__proto__', 'constructor', 'toString']) assert.throws(() => selectPaths('DexCompany-Ops', provider));
});
test('context is read from one pinned commit and includes the selected Task rather than newer worktree text', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dex-context-test-'));
  const git = args => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    git(['init', '-b', 'main']);
    for (const file of [...selectPaths('Demo', 'openai'), '10_Projects/Demo/Tasks/TASK-1/RESULT.md']) {
      const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, 'PINNED ' + file);
    }
    git(['add', '.']);git(['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'fixture']);
    const ref = git(['rev-parse', 'HEAD']).trim();
    fs.writeFileSync(path.join(root, 'AI_CONTRACT.md'), 'UNCOMMITTED');
    const pack = loadContext(root, { ref, project: 'Demo', provider: 'openai', task: 'TASK-1' });
    assert.equal(pack.ref, ref);
    assert.equal(pack.documents.length, 8);
    assert.ok(expandPack(pack)[0].content.startsWith('PINNED'));
    assert.throws(() => loadContext(root, { ref: 'main', project: 'Demo', provider: 'openai' }), /verified approved main/);
    assert.throws(() => loadContext(root, { ref, project: 'Demo', provider: 'openai', task: 'MISSING' }), /No Task/);
    fs.writeFileSync(path.join(root, 'AI_CONTRACT.md'), Buffer.from([0xff, 0xfe, 0xff]));
    git(['add', '.']);git(['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'invalid utf8']);
    const invalid = git(['rev-parse', 'HEAD']).trim();
    assert.throws(() => loadContext(root, { ref: invalid, project: 'Demo', provider: 'openai' }), /encoding/i);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
