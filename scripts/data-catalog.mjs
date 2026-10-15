import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const CATALOG = '20_Codex_Handoff/DATA_CATALOG.json';
export const INDEX = '20_Codex_Handoff/PROJECT_INDEX.md';
const CLASSIFICATIONS = new Set(['FACT', 'POLICY', 'SKILL', 'CAPABILITY']);
const PROJECT_DOCS = ['PROJECT_CONFIG.md', 'CURRENT.md', 'SESSION_HANDOFF.md', 'DECISIONS.md'];

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function exactKeys(value, keys, label) {
  requireCondition(value && typeof value === 'object' && !Array.isArray(value), `Invalid ${label}`);
  requireCondition(Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key)), `Unexpected or missing ${label} field`);
}

// JSON.parse establishes grammar; this second pass rejects duplicate decoded keys.
// No value, credential, or source text is printed on failure.
export function parseStrictJSON(text) {
  requireCondition(typeof text === 'string' && !text.includes('\r') && !text.startsWith('\ufeff'), 'Catalog must use UTF-8 without BOM and LF');
  let parsed;
  try { parsed = JSON.parse(text); } catch { throw new Error('Invalid JSON'); }
  const tokens = text.match(/"(?:\\.|[^"\\])*"|[{}\[\]:,]|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null/g) ?? [];
  const scopes = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token === '{') scopes.push(new Set());
    else if (token === '[') scopes.push(null);
    else if (token === '}' || token === ']') scopes.pop();
    else if (token.startsWith('"') && tokens[i + 1] === ':') {
      const key = JSON.parse(token);
      const scope = scopes.at(-1);
      requireCondition(scope instanceof Set && !scope.has(key), 'Duplicate JSON key');
      scope.add(key);
    }
  }
  return parsed;
}

function portablePath(value) {
  return typeof value === 'string' && value.length > 0 && value === value.normalize('NFC')
    && !/[\\:\x00-\x1f\x7f]/.test(value)
    && value.split('/').every(part => part !== '' && part !== '.' && part !== '..');
}

export function validateCatalog(catalog, trackedPaths) {
  exactKeys(catalog, ['schemaVersion', 'projects', 'authorities'], 'catalog');
  requireCondition(catalog.schemaVersion === '1.0', 'Unsupported catalog schema');
  requireCondition(trackedPaths instanceof Set, 'Tracked path inventory required');
  requireCondition(Array.isArray(catalog.projects) && catalog.projects.length > 0, 'Missing projects');
  requireCondition(Array.isArray(catalog.authorities) && catalog.authorities.length > 0, 'Missing authorities');
  const ids = new Set();
  const configs = new Set();
  for (const project of catalog.projects) {
    exactKeys(project, ['id', 'configPath'], 'project');
    requireCondition(typeof project.id === 'string' && /^[A-Z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*$/.test(project.id), 'Invalid project ID');
    const normalizedId = project.id.toLowerCase();
    requireCondition(!ids.has(normalizedId), 'Duplicate project ID');
    ids.add(normalizedId);
    requireCondition(project.configPath === `10_Projects/${project.id}/PROJECT_CONFIG.md`, 'Project ID and config path differ');
    configs.add(project.configPath);
    for (const name of PROJECT_DOCS) {
      requireCondition(trackedPaths.has(`10_Projects/${project.id}/${name}`), `Missing project document: ${project.id}/${name}`);
    }
  }
  const discoveredConfigs = [...trackedPaths].filter(file => /^10_Projects\/[^/]+\/PROJECT_CONFIG\.md$/.test(file));
  requireCondition(discoveredConfigs.length === configs.size && discoveredConfigs.every(file => configs.has(file)), 'Unregistered project config');
  const authorityIds = new Set();
  const authorityPaths = new Set();
  for (const authority of catalog.authorities) {
    exactKeys(authority, ['id', 'classification', 'path', 'purpose'], 'authority');
    requireCondition(typeof authority.id === 'string' && /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(authority.id), 'Invalid authority ID');
    requireCondition(!authorityIds.has(authority.id), 'Duplicate authority ID');
    authorityIds.add(authority.id);
    requireCondition(CLASSIFICATIONS.has(authority.classification), 'Invalid classification');
    requireCondition(portablePath(authority.path) && trackedPaths.has(authority.path), 'Missing or nonportable authority path');
    const normalizedPath = authority.path.toLowerCase();
    requireCondition(!authorityPaths.has(normalizedPath), 'Duplicate authority path');
    authorityPaths.add(normalizedPath);
    requireCondition(typeof authority.purpose === 'string' && authority.purpose.trim().length > 0 && !/[\x00-\x1f\x7f]/.test(authority.purpose), 'Invalid authority purpose');
  }
  requireCondition(catalog.authorities.some(item => item.id === 'core-policy' && item.path === 'AI_CONTRACT.md' && item.classification === 'POLICY'), 'Core policy authority required');
  requireCondition(catalog.authorities.some(item => item.id === 'project-directory' && item.path === CATALOG && item.classification === 'FACT'), 'Project directory authority required');
  return catalog;
}

export function renderProjectIndex(catalog) {
  const rows = catalog.projects.map(project => {
    const folder = `../10_Projects/${project.id}`;
    return `| ${project.id} | [설정](${folder}/PROJECT_CONFIG.md) | [현재 상태](${folder}/CURRENT.md) | [이어가기](${folder}/SESSION_HANDOFF.md) |`;
  });
  return [
    '# Project Index', '',
    '<!-- Generated from DATA_CATALOG.json by scripts/data-catalog.mjs. -->', '',
    '승인 main에 등록된 프로젝트의 기준 문서로 이동해요. 프로젝트 식별자와 문서 위치는 [데이터 목록](DATA_CATALOG.json)에서 관리해요. 현재 상태·버전·검증 결과는 각 원본 문서에서 확인하고 이 목록에 다시 적지 않아요.', '',
    '| 프로젝트 | 설정 | 현재 상태 | 작업 인계 |',
    '|---|---|---|---|', ...rows, '',
    '## 등록 기준', '',
    '- 프로젝트 소유자와 지식 문서 위치를 확인한 뒤 등록해요. 코드가 필요한 프로젝트는 실제 코드 저장소 또는 승인된 실행 위치도 확인해요.',
    '- 특정 PC의 경로는 실행 환경 참고정보예요. 경로의 현재 존재 여부와 실행 권한은 사용할 때 다시 확인해요.',
    '- 개인정보 가능성이 있는 CareerOps 작업대는 자동 등록하지 않아요.',
    '- 별도 제품은 별도 저장소가 확정된 뒤 새 프로젝트로 등록해요.',
    '- 열린 PR에만 존재하는 프로젝트는 승인 main 등록 프로젝트에 포함하지 않아요.', '',
    '## 보관 기준', '',
    '- 비활성 프로젝트를 90_Archive로 이동하려면 에던의 승인이 필요해요.',
    '- 상태·인계·검증은 프로젝트별 CURRENT.md, SESSION_HANDOFF.md, QA_REPORT.md에서 확인해요.',
    '- 데이터 형식·중복·이력 관리 기준은 [DATA_STANDARD.md](DATA_STANDARD.md)를 따라요.', '',
    '이 문서는 생성 결과예요. 데이터 목록 수정 후 `node scripts/data-catalog.mjs --print-project-index`로 내용을 생성하고, 파일에 반영한 뒤 기본 검사 명령을 실행해요.', '',
  ].join('\n');
}

export function verifyProjectIndex(catalog, text) {
  requireCondition(text === renderProjectIndex(catalog), 'Generated project index drift');
}

function requireReferenceFile(root, name) {
  const target = path.join(root, name);
  try {
    if (!fs.lstatSync(target).isFile() || fs.realpathSync(target) !== target) throw new Error();
  } catch {
    throw new Error(`Missing or nonregular reference file: ${name}`);
  }
  return target;
}

export function checkWorkspace(root, printIndex = false) {
  root = fs.realpathSync(root);
  const files = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] }).split('\0').filter(Boolean);
  const bytes = fs.readFileSync(requireReferenceFile(root, CATALOG));
  const text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes);
  const catalog = validateCatalog(parseStrictJSON(text), new Set(files));
  const references = new Set([
    ...catalog.authorities.map(item => item.path),
    ...catalog.projects.flatMap(project => PROJECT_DOCS.map(name => `10_Projects/${project.id}/${name}`)),
  ]);
  for (const name of references) requireReferenceFile(root, name);
  if (printIndex) return renderProjectIndex(catalog);
  verifyProjectIndex(catalog, fs.readFileSync(requireReferenceFile(root, INDEX), 'utf8'));
  return `PASS: ${catalog.projects.length} project references, ${catalog.authorities.length} authorities, generated project index. Content freshness and external systems are not verified.\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    requireCondition(process.argv.length === 2 || (process.argv.length === 3 && process.argv[2] === '--print-project-index'), 'Unsupported argument');
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    process.stdout.write(checkWorkspace(root, process.argv[2] === '--print-project-index'));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
