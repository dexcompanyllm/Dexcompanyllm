import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { parseStrictJSON, validateCatalog, renderProjectIndex, verifyProjectIndex, checkWorkspace, CATALOG, INDEX } from './data-catalog.mjs';

const text = fs.readFileSync(new URL('../' + CATALOG, import.meta.url), 'utf8');
const source = parseStrictJSON(text);
const paths = new Set([
  ...source.authorities.map(item => item.path),
  ...source.projects.flatMap(project => ['PROJECT_CONFIG.md', 'CURRENT.md', 'SESSION_HANDOFF.md', 'DECISIONS.md'].map(name => `10_Projects/${project.id}/${name}`)),
]);
const copy = () => structuredClone(source);

function workspaceFixture(context) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dex-catalog-review-'));
  context.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const name of paths) {
    fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
    fs.writeFileSync(path.join(root, name), 'fixture\n');
  }
  fs.writeFileSync(path.join(root, CATALOG), text);
  fs.writeFileSync(path.join(root, INDEX), renderProjectIndex(source));
  execFileSync('git', ['init', '-q'], { cwd: root, stdio: 'pipe' });
  execFileSync('git', ['add', '--all'], { cwd: root, stdio: 'pipe' });
  return root;
}

test('a tracked file removed from the working tree fails the actual workspace check', context => {
  const root = workspaceFixture(context);
  assert.match(checkWorkspace(root), /^PASS:/);
  fs.unlinkSync(path.join(root, '10_Projects/DexCompany-Ops/SESSION_HANDOFF.md'));
  assert.throws(() => checkWorkspace(root), /Missing or nonregular reference file/);
});

test('a tracked authority replaced by a directory fails the actual workspace check', context => {
  const root = workspaceFixture(context);
  const target = path.join(root, '99_Templates/TASK_PACKET.yaml');
  fs.unlinkSync(target);
  fs.mkdirSync(target);
  assert.throws(() => checkWorkspace(root), /Missing or nonregular reference file/);
});

test('catalog accepts references without copying mutable state or host paths', () => {
  validateCatalog(source, paths);
  assert.ok(source.projects.length > 0);
  const rendered = renderProjectIndex(source);
  assert.doesNotMatch(rendered, /D:\\|canonical-migration-complete|production-maintenance|1\.1\.[12]/);
  assert.match(rendered, /CURRENT\.md/);
  assert.match(rendered, /CareerOps/);
  assert.match(rendered, /에던의 승인이 필요/);
});

test('duplicate project IDs and a wrong project folder fail', () => {
  const duplicate = copy();
  duplicate.projects.push({ ...duplicate.projects[0] });
  assert.throws(() => validateCatalog(duplicate, paths), /Duplicate project/);
  const mismatched = copy();
  mismatched.projects[0].configPath = mismatched.projects[1].configPath;
  assert.throws(() => validateCatalog(mismatched, paths), /differ/);
});

test('missing handoff and unregistered new projects fail', () => {
  const missing = new Set(paths);
  missing.delete('10_Projects/DexCompany-Ops/SESSION_HANDOFF.md');
  assert.throws(() => validateCatalog(source, missing), /Missing project document/);
  const extra = new Set(paths);
  extra.add('10_Projects/NewProject/PROJECT_CONFIG.md');
  assert.throws(() => validateCatalog(source, extra), /Unregistered/);
});

test('catalog rejects mutable status, extra fields, unknown schema and empty projects', () => {
  for (const mutate of [
    data => { data.projects[0].status = 'completed'; },
    data => { data.authorities[0].version = '1.1.2'; },
    data => { data.schemaVersion = 1; },
    data => { data.projects = []; },
  ]) {
    const data = copy(); mutate(data);
    assert.throws(() => validateCatalog(data, paths));
  }
});

test('missing authorities, traversal, Windows paths, URLs and duplicate authorities fail', () => {
  for (const target of ['missing.md', '../AI_CONTRACT.md', '/AI_CONTRACT.md', 'D:\\data.md', 'https://example.com/data.md', 'folder//data.md']) {
    const data = copy();
    data.authorities[0].path = target;
    assert.throws(() => validateCatalog(data, new Set([...paths, target])), /authority|Core policy/);
  }
  const duplicate = copy();
  duplicate.authorities.push({ ...duplicate.authorities[0] });
  assert.throws(() => validateCatalog(duplicate, paths), /Duplicate authority/);
  const duplicatedPath = copy();
  duplicatedPath.authorities.push({ ...duplicatedPath.authorities[0], id: 'another-policy' });
  assert.throws(() => validateCatalog(duplicatedPath, paths), /Duplicate authority path/);
});

test('evidence verdict is not a data classification and policy cannot be silently reclassified', () => {
  const data = copy();
  data.authorities[0].classification = 'PASS';
  assert.throws(() => validateCatalog(data, paths), /classification/);
  data.authorities[0].classification = 'FACT';
  assert.throws(() => validateCatalog(data, paths), /Core policy/);
});

test('duplicate decoded JSON keys are rejected, including escaped and nested keys', () => {
  for (const json of ['{"a":1,"a":2}', '{"a":1,"\\u0061":2}', '{"rows":[{"x":0,"x":1}]}']) {
    assert.throws(() => parseStrictJSON(json), /Duplicate JSON key/);
  }
  assert.deepEqual(parseStrictJSON('{"rows":[{"x":1},{"x":2}],"text":"{x:y}"}'), { rows: [{ x: 1 }, { x: 2 }], text: '{x:y}' });
  assert.throws(() => parseStrictJSON('{'), /Invalid JSON/);
  assert.throws(() => parseStrictJSON('\ufeff{}'), /UTF-8/);
  assert.throws(() => parseStrictJSON('{}\r\n'), /LF/);
});

test('stale copied state and manually changed index links are detected', () => {
  const good = renderProjectIndex(source);
  verifyProjectIndex(source, good);
  assert.throws(() => verifyProjectIndex(source, good + 'Status: completed\n'), /drift/);
  assert.throws(() => verifyProjectIndex(source, good.replace('/CURRENT.md)', '/MISSING.md)')), /drift/);
});
