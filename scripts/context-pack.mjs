import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const BEGIN = '<!-- DEX_CURRENT_STATUS_BEGIN -->';
const END = '<!-- DEX_CURRENT_STATUS_END -->';
const bytes = text => Buffer.byteLength(text, 'utf8');
const hash = text => createHash('sha256').update(text, 'utf8').digest('hex');

// Deduplicate exact shared blocks only. Every unique byte, including preserved
// history and provider-specific policies, remains reconstructable.
export function packDocuments(documents, { ref, project, provider } = {}) {
  if (!Array.isArray(documents) || documents.length > 20) throw new Error('Invalid context document count.');
  const blocks = {}, packed = []; let sourceBytes = 0, duplicateBytes = 0;
  for (const document of documents) {
    const { path: source, content, sha } = document;
    if (typeof source !== 'string' || typeof content !== 'string' || bytes(content) > 1024 * 1024) throw new Error('Invalid context document.');
    sourceBytes += bytes(content);
    if (sourceBytes > 8 * 1024 * 1024) throw new Error('Context input exceeds its memory bound.');
    const starts = content.split(BEGIN).length - 1, ends = content.split(END).length - 1;
    if (starts !== ends || starts > 1) throw new Error(`Ambiguous shared status markers: ${source}`);
    const segments = [];
    if (starts === 1) {
      const start = content.indexOf(BEGIN), end = content.indexOf(END) + END.length;
      if (end <= start) throw new Error(`Reversed shared status markers: ${source}`);
      const shared = content.slice(start, end), id = hash(shared);
      if (Object.hasOwn(blocks, id)) {
        if (blocks[id] !== shared) throw new Error('Shared context hash collision.');
        duplicateBytes += bytes(shared);
      } else blocks[id] = shared;
      segments.push({ text: content.slice(0, start) }, { block: id }, { text: content.slice(end) });
    } else segments.push({ text: content });
    packed.push({ path: source, sha, contentSha256: hash(content), segments });
  }
  return { schemaVersion: 1, ref, project, provider, metrics: { sourceBytes, duplicateBytesRemoved: duplicateBytes }, blocks, documents: packed };
}

export function expandPack(pack) {
  return pack.documents.map(document => {
    const content = document.segments.map(segment => {
      if (Object.hasOwn(segment, 'text')) return segment.text;
      const value = pack.blocks[segment.block];
      if (typeof value !== 'string' || hash(value) !== segment.block) throw new Error('Missing or changed shared block.');
      return value;
    }).join('');
    if (hash(content) !== document.contentSha256) throw new Error('Context reconstruction mismatch.');
    return { path: document.path, sha: document.sha, content };
  });
}

export function selectPaths(project, provider) {
  if (!/^[A-Za-z0-9._가-힣-]{1,80}$/u.test(project) || project.includes('..')) throw new Error('Invalid project.');
  const entries = { openai: 'AGENTS.md', anthropic: 'CLAUDE.md', generic: 'LLM_CONTEXT.md' };
  if (!Object.hasOwn(entries, provider)) throw new Error('Invalid provider.');
  const entry = entries[provider];
  return [
    'AI_CONTRACT.md', entry, `providers/${provider}.yaml`, 'CURRENT_STATE.md',
    ...['PROJECT_CONFIG.md', 'CURRENT.md', 'SESSION_HANDOFF.md'].map(file => `10_Projects/${project}/${file}`),
  ];
}

export function loadContext(root, { ref, project, provider, task } = {}) {
  if (!/^[a-f0-9]{40}$/.test(ref ?? '')) throw new Error('Use the verified approved main commit SHA, not a moving branch.');
  const selected = selectPaths(project, provider);
  const git = args => new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(
    execFileSync('git', ['-C', root, ...args], { timeout: 10_000, maxBuffer: 2 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }),
  );
  if (git(['cat-file', '-t', ref]).trim() !== 'commit') throw new Error('Context ref must identify a commit.');
  if (task !== undefined) {
    if (!/^[A-Za-z0-9_-]{1,128}$/.test(task)) throw new Error('Invalid task ID.');
    const prefix = `10_Projects/${project}/Tasks/${task}/`;
    const available = new Set(git(['ls-tree', '-r', '--name-only', ref, '--', prefix]).trim().split('\n'));
    const taskPaths = ['TASK.yaml', 'RESULT.yaml', 'RESULT.md', 'SESSION_HANDOFF.md'].map(file => prefix + file).filter(file => available.has(file));
    if (!taskPaths.length) throw new Error('No Task Packet/result/handoff found for the selected Task.');
    selected.push(...taskPaths);
  }
  const documents = selected.map(source => ({
    path: source,
    sha: git(['rev-parse', `${ref}:${source}`]).trim(),
    content: git(['show', `${ref}:${source}`]),
  }));
  const pack = packDocuments(documents, { ref, project, provider });
  const restored = expandPack(pack);
  if (restored.some((document, i) => document.content !== documents[i].content)) throw new Error('Context byte preservation failed.');
  return pack;
}

function main() {
  const options = {}, args = process.argv.slice(2), allowed = new Set(['--ref', '--project', '--provider', '--task']);
  for (let i = 0; i < args.length; i += 2) {
    if (!allowed.has(args[i]) || !args[i + 1] || args[i + 1].startsWith('--') || Object.hasOwn(options, args[i].slice(2))) throw new Error('Use --ref SHA --project ID --provider openai|anthropic|generic [--task ID].');
    options[args[i].slice(2)] = args[i + 1];
  }
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  process.stdout.write(JSON.stringify(loadContext(root, options)) + '\n');
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
