#!/usr/bin/env node
// Original implementation; Node.js built-ins only.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const LIMITS = Object.freeze({
  jsonBytes: 1024 * 1024,
  artifactBytes: 25 * 1024 * 1024,
  totalArtifactBytes: 64 * 1024 * 1024,
  checks: 512,
  issues: 128,
});
const COMPLETE_STATUS = 'EVIDENCE_PACKAGE_COMPLETE';
const LIMITATION = 'Declared plan binding and local artifact integrity only; not a visual quality or WCAG certification, not proof of reviewer identity or truthful execution, and never an override for canonical Task validation, detailed FAIL, or Not Checked results.';
const STATUSES = new Set(['PASS', 'FAIL', 'Not Checked']);
const KINDS = new Set(['mechanical', 'visual', 'accessibility']);
const IMMUTABLE_REVISION = /^(?:git:(?:[a-f0-9]{40}|[a-f0-9]{64})|sha256:[a-f0-9]{64})$/u;
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value, max = 128) => typeof value === 'string' && value.length > 0 && value.length <= max && value.trim() === value && !/[\u0000-\u001f\u007f]/u.test(value);
const result = (issues, planSha256 = null) => ({
  status: issues.length ? 'BLOCKED' : COMPLETE_STATUS,
  issues,
  planSha256,
  limitation: LIMITATION,
});

function boundedJson(value) {
  try {
    const encoded = JSON.stringify(value);
    return typeof encoded === 'string' && Buffer.byteLength(encoded, 'utf8') <= LIMITS.jsonBytes;
  } catch { return false; }
}

function exactKeys(value, names) {
  if (!record(value)) return false;
  const keys = Object.keys(value);
  return keys.length === names.length && names.every((key) => Object.hasOwn(value, key));
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (record(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  }
  const encoded = JSON.stringify(value);
  if (encoded === undefined) throw new TypeError('Unsupported JSON value.');
  return encoded;
}

export function hashPlan(plan) {
  return createHash('sha256').update(canonicalJson(plan), 'utf8').digest('hex');
}

export function reserveArtifactBytes(budget, size, limit = LIMITS.totalArtifactBytes) {
  if (!record(budget) || !Number.isSafeInteger(budget.bytes) || budget.bytes < 0
    || !Number.isSafeInteger(size) || size < 0 || !Number.isSafeInteger(limit) || limit < 0
    || budget.bytes + size > limit) return false;
  budget.bytes += size;
  return true;
}

function unsafeWindowsComponent(value) {
  return value.replaceAll('/', '\\').split('\\').some((component) => {
    if (!component) return false;
    if (/[ .]$/u.test(component)) return true;
    const stem = component.split('.')[0].replace(/[ ]+$/u, '').toUpperCase();
    return /^(?:CON|PRN|AUX|NUL|CONIN\$|CONOUT\$|COM[1-9¹²³]|LPT[1-9¹²³])$/u.test(stem);
  });
}

export function unsafeInputPath(value) {
  if (typeof value !== 'string' || value.length === 0) return true;
  const windowsPath = value.replaceAll('/', '\\');
  if (/^(?:\\\\|\\\?\?\\|\\Device\\)/iu.test(windowsPath)) return true;
  const drivePath = /^[A-Za-z]:\\/u.test(windowsPath);
  const remainder = drivePath ? windowsPath.slice(2) : windowsPath;
  if (remainder.includes(':')) return true;
  if (!drivePath && /^[a-z][a-z0-9+.-]*:/iu.test(value)) return true;
  return unsafeWindowsComponent(remainder);
}

function safeRelativePath(value) {
  return text(value, 1024) && !/[\\:]/u.test(value) && !path.isAbsolute(value)
    && !path.win32.isAbsolute(value)
    && !unsafeWindowsComponent(value)
    && value.split('/').every((part) => part !== '' && part !== '.' && part !== '..');
}

function artifactDigest(root, relative, budget) {
  let descriptor;
  try {
    let current = root;
    const parts = relative.split('/');
    for (let i = 0; i < parts.length; i += 1) {
      current = path.join(current, parts[i]);
      const info = fs.lstatSync(current);
      if (info.isSymbolicLink()) return { error: 'symlink artifacts or parent directories are forbidden.' };
      if (i < parts.length - 1 && !info.isDirectory()) return { error: 'artifact parent must be a directory.' };
      if (i === parts.length - 1 && !info.isFile()) return { error: 'artifact must be a regular file.' };
    }
    const resolved = fs.realpathSync(current);
    const relativeResolved = path.relative(root, resolved);
    if (!relativeResolved || relativeResolved === '..'
      || relativeResolved.startsWith(`..${path.sep}`) || path.isAbsolute(relativeResolved)) {
      return { error: 'artifact must remain inside the evidence directory.' };
    }
    descriptor = fs.openSync(resolved, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0));
    const before = fs.fstatSync(descriptor);
    if (!before.isFile()) return { error: 'artifact must be a regular file.' };
    if (before.size > LIMITS.artifactBytes) return { error: 'artifact exceeds the 25 MiB size limit.' };
    if (!reserveArtifactBytes(budget, before.size)) return { error: 'declared artifacts exceed the 64 MiB aggregate size limit.' };
    let chargedBytes = before.size;
    const digest = createHash('sha256');
    const buffer = Buffer.allocUnsafe(64 * 1024);
    let total = 0;
    for (;;) {
      const bytes = fs.readSync(descriptor, buffer, 0, buffer.length, null);
      if (!bytes) break;
      total += bytes;
      if (total > LIMITS.artifactBytes) return { error: 'artifact exceeds the 25 MiB size limit.' };
      if (total > chargedBytes) {
        if (!reserveArtifactBytes(budget, total - chargedBytes)) {
          return { error: 'declared artifacts exceed the 64 MiB aggregate size limit.' };
        }
        chargedBytes = total;
      }
      digest.update(buffer.subarray(0, bytes));
    }
    const after = fs.fstatSync(descriptor);
    const linked = fs.lstatSync(current);
    if (before.size !== total || before.size !== after.size || before.mtimeMs !== after.mtimeMs
      || before.ctimeMs !== after.ctimeMs || linked.isSymbolicLink()
      || before.dev !== linked.dev || before.ino !== linked.ino || fs.realpathSync(current) !== resolved) {
      return { error: 'artifact changed while it was being checked.' };
    }
    return { digest: digest.digest('hex') };
  } catch { return { error: 'artifact cannot be read safely.' }; }
  finally { if (descriptor !== undefined) fs.closeSync(descriptor); }
}

/** Check local report completeness and artifact hashes, never design quality. */
export function validateEvidence(plan, evidence, root) {
  const issues = [];
  let expectedPlanSha256 = null;
  const issue = (message) => {
    if (issues.length < LIMITS.issues) issues.push(message);
    else if (issues.length === LIMITS.issues) issues.push('Additional validation issues were omitted.');
  };
  try {
    if (!boundedJson(plan)) issue('plan: must be JSON data no larger than 1 MiB.');
    if (!boundedJson(evidence)) issue('evidence: must be JSON data no larger than 1 MiB.');
    if (issues.length) return result(issues, expectedPlanSha256);
    expectedPlanSha256 = hashPlan(plan);
    if (!exactKeys(plan, ['schemaVersion', 'taskId', 'revision', 'authorRunId', 'requiredChecks'])) issue('plan: expected the exact supported object fields.');
    if (!exactKeys(evidence, ['schemaVersion', 'taskId', 'revision', 'planSha256', 'checks', 'review'])) issue('evidence: expected the exact supported object fields.');
    if (!record(plan) || !record(evidence)) return result(issues, expectedPlanSha256);
    for (const [label, item] of [['plan', plan], ['evidence', evidence]]) {
      if (item.schemaVersion !== 2) issue(`${label}.schemaVersion: must equal 2.`);
      if (!text(item.taskId)) issue(`${label}.taskId: expected a nonempty string of at most 128 characters.`);
      if (typeof item.revision !== 'string' || !IMMUTABLE_REVISION.test(item.revision)) {
        issue(`${label}.revision: expected git:<40-or-64-lowercase-hex> or sha256:<64-lowercase-hex>.`);
      }
    }
    if (!text(plan.authorRunId)) issue('plan.authorRunId: expected a nonempty string of at most 128 characters.');
    if (plan.taskId !== evidence.taskId) issue('evidence.taskId: does not match the plan.');
    if (plan.revision !== evidence.revision) issue('evidence.revision: does not match the plan.');
    if (typeof evidence.planSha256 !== 'string' || !/^[a-f0-9]{64}$/u.test(evidence.planSha256)) {
      issue('evidence.planSha256: expected 64 lowercase hexadecimal characters.');
    } else if (evidence.planSha256 !== expectedPlanSha256) {
      issue('evidence.planSha256: does not match the canonical plan contents.');
    }

    const requiredValid = Array.isArray(plan.requiredChecks) && plan.requiredChecks.length > 0 && plan.requiredChecks.length <= LIMITS.checks;
    const observedValid = Array.isArray(evidence.checks) && evidence.checks.length > 0 && evidence.checks.length <= LIMITS.checks;
    if (!requiredValid) issue(`plan.requiredChecks: expected 1 to ${LIMITS.checks} entries.`);
    if (!observedValid) issue(`evidence.checks: expected 1 to ${LIMITS.checks} entries.`);
    const required = new Map();
    if (requiredValid) Array.from(plan.requiredChecks).forEach((check, index) => {
      const label = `plan.requiredChecks[${index}]`;
      if (!exactKeys(check, ['id', 'kind', 'viewport', 'state'])) issue(`${label}: expected the exact supported object fields.`);
      if (!record(check)) return;
      if (!text(check.id)) issue(`${label}.id: expected a nonempty string of at most 128 characters.`);
      else if (required.has(check.id)) issue(`${label}.id: duplicate required check ID.`);
      else required.set(check.id, index);
      if (!KINDS.has(check.kind)) issue(`${label}.kind: expected mechanical, visual, or accessibility.`);
      if (!exactKeys(check.viewport, ['width', 'height'])
        || !['width', 'height'].every((axis) => Number.isInteger(check.viewport[axis]) && check.viewport[axis] > 0 && check.viewport[axis] <= 16384)) {
        issue(`${label}.viewport: width and height must be integers from 1 to 16384.`);
      }
      if (!text(check.state)) issue(`${label}.state: expected a nonempty string of at most 128 characters.`);
    });

    let rootPath;
    try {
      if (!text(root, 8192) || unsafeInputPath(root)) throw new Error();
      const requestedRoot = path.resolve(root);
      if (unsafeInputPath(requestedRoot)) throw new Error();
      const rootInfo = fs.lstatSync(requestedRoot);
      if (!rootInfo.isDirectory() || rootInfo.isSymbolicLink()) throw new Error();
      rootPath = fs.realpathSync(requestedRoot);
    } catch { issue('root: expected an existing evidence directory without symlinks.'); rootPath = undefined; }
    const cache = new Map();
    const artifactBudget = { bytes: 0 };
    const verifyArtifact = (artifact, label) => {
      if (!exactKeys(artifact, ['path', 'sha256'])) { issue(`${label}: expected path and sha256 only.`); return; }
      const validPath = safeRelativePath(artifact.path);
      const validHash = typeof artifact.sha256 === 'string' && /^[a-f0-9]{64}$/u.test(artifact.sha256);
      if (!validPath) issue(`${label}.path: expected a relative forward-slash path without traversal, URLs, or drive names.`);
      if (!validHash) issue(`${label}.sha256: expected 64 lowercase hexadecimal characters.`);
      if (!rootPath || !validPath || !validHash) return;
      if (!cache.has(artifact.path)) cache.set(artifact.path, artifactDigest(rootPath, artifact.path, artifactBudget));
      const checked = cache.get(artifact.path);
      if (checked.error) issue(`${label}: ${checked.error}`);
      else if (checked.digest !== artifact.sha256) issue(`${label}.sha256: does not match the file contents.`);
    };
    const verifyReport = (report, label, runField) => {
      if (!STATUSES.has(report.status)) issue(`${label}.status: expected PASS, FAIL, or Not Checked.`);
      else if (report.status !== 'PASS') issue(`${label}.status: required evidence has not passed.`);
      if (!text(report[runField])) issue(`${label}.${runField}: expected a nonempty string of at most 128 characters.`);
      if (!text(report.summary, 4096)) issue(`${label}.summary: expected a nonempty single-line string of at most 4096 characters.`);
      verifyArtifact(report.artifact, `${label}.artifact`);
    };
    const observed = new Set();
    const checkRunIds = new Set();
    const checkArtifacts = [];
    if (observedValid) Array.from(evidence.checks).forEach((check, index) => {
      const label = `evidence.checks[${index}]`;
      if (!exactKeys(check, ['id', 'status', 'runId', 'artifact', 'summary'])) issue(`${label}: expected the exact supported object fields.`);
      if (!record(check)) return;
      if (!text(check.id)) issue(`${label}.id: expected a nonempty string of at most 128 characters.`);
      else {
        if (observed.has(check.id)) issue(`${label}.id: duplicate evidence check ID.`);
        observed.add(check.id);
        if (!required.has(check.id)) issue(`${label}.id: not present in the plan.`);
      }
      verifyReport(check, label, 'runId');
      if (text(check.runId)) checkRunIds.add(check.runId);
      if (record(check.artifact) && typeof check.artifact.path === 'string' && typeof check.artifact.sha256 === 'string') {
        checkArtifacts.push({ path: check.artifact.path, sha256: check.artifact.sha256 });
      }
    });
    for (const [id, index] of required) {
      if (!observed.has(id)) issue(`plan.requiredChecks[${index}]: required evidence is missing.`);
    }
    if (!exactKeys(evidence.review, ['status', 'reviewerRunId', 'artifact', 'summary'])) issue('evidence.review: expected the exact supported object fields.');
    if (record(evidence.review)) {
      verifyReport(evidence.review, 'evidence.review', 'reviewerRunId');
      if (evidence.review.reviewerRunId === plan.authorRunId) issue('evidence.review.reviewerRunId: must differ from the author run ID.');
      if (checkRunIds.has(evidence.review.reviewerRunId)) issue('evidence.review.reviewerRunId: must differ from every evidence check run ID.');
      if (record(evidence.review.artifact) && checkArtifacts.some((artifact) => artifact.path === evidence.review.artifact.path
        || artifact.sha256 === evidence.review.artifact.sha256)) {
        issue('evidence.review.artifact: must be a distinct review report, not a reused check artifact.');
      }
    }
  } catch { issue('Input validation could not be completed safely.'); }
  return result(issues, expectedPlanSha256);
}

function readJsonFile(filename) {
  let descriptor;
  try {
    if (!text(filename, 8192) || unsafeInputPath(filename)) throw new Error();
    const requested = path.resolve(filename);
    if (unsafeInputPath(requested)) throw new Error();
    const requestedInfo = fs.lstatSync(requested);
    if (!requestedInfo.isFile() || requestedInfo.isSymbolicLink()) throw new Error();
    const resolved = fs.realpathSync(requested);
    descriptor = fs.openSync(resolved, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0));
    const before = fs.fstatSync(descriptor);
    if (!before.isFile() || before.size > LIMITS.jsonBytes) throw new Error();
    const buffer = Buffer.alloc(LIMITS.jsonBytes + 1);
    let total = 0;
    while (total < buffer.length) {
      const count = fs.readSync(descriptor, buffer, total, buffer.length - total, null);
      if (!count) break;
      total += count;
    }
    if (total > LIMITS.jsonBytes) throw new Error();
    const after = fs.fstatSync(descriptor);
    const linked = fs.lstatSync(requested);
    if (before.size !== total || before.size !== after.size || before.mtimeMs !== after.mtimeMs
      || before.ctimeMs !== after.ctimeMs || linked.isSymbolicLink()
      || before.dev !== linked.dev || before.ino !== linked.ino || fs.realpathSync(requested) !== resolved) throw new Error();
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(buffer.subarray(0, total)));
  } finally { if (descriptor !== undefined) fs.closeSync(descriptor); }
}

function main(args) {
  let output;
  if (args.length === 2 && args[0] === '--plan-sha256') {
    try {
      const plan = readJsonFile(args[1]);
      if (!boundedJson(plan)) throw new Error();
      output = { status: 'PLAN_SHA256', planSha256: hashPlan(plan), limitation: LIMITATION };
    } catch {
      output = result(['plan: cannot read valid local JSON within the 1 MiB limit; regular local files without symlinks are required.']);
    }
  } else if (args.length !== 2) {
    output = result(['Usage: node validate-design-evidence.mjs PLAN.json EVIDENCE.json | --plan-sha256 PLAN.json']);
  }
  else {
    const inputs = [];
    const issues = [];
    for (let index = 0; index < args.length; index += 1) {
      try { inputs[index] = readJsonFile(args[index]); }
      catch { issues.push(`${index === 0 ? 'plan' : 'evidence'}: cannot read valid local JSON within the 1 MiB limit; regular files without symlinks are required.`); }
    }
    output = issues.length ? result(issues) : validateEvidence(inputs[0], inputs[1], path.dirname(path.resolve(args[1])));
  }
  process.stdout.write(`${JSON.stringify(output)}\n`);
  process.exitCode = output.status === COMPLETE_STATUS || output.status === 'PLAN_SHA256' ? 0 : 1;
}

function isDirectEntry() {
  if (!process.argv[1]) return false;
  try {
    return fs.realpathSync(path.resolve(process.argv[1])) === fs.realpathSync(fileURLToPath(import.meta.url));
  } catch { return false; }
}

if (isDirectEntry()) main(process.argv.slice(2));
