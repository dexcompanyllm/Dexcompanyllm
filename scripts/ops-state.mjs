import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

export const BASE = '507331d82cc3016373d1e6d351b8f38f41fa4f98';
export const PUBLIC_HISTORY_ARCHIVE = 'scripts/fixtures/ops-history-public.json';
export const PUBLIC_HISTORY_SHA256 = '68879cd197a1b4a29d49363802a3650f5460bd75be12503087b98d6a955b00d1';
const PUBLIC_HISTORY_BYTES = 244658;
export const SNAPSHOT = '10_Projects/DexCompany-Ops/OPS_SNAPSHOT.json';
export const FILES = Object.freeze([
  'CURRENT_STATE.md',
  '10_Projects/DexCompany-Ops/PROJECT_CONFIG.md',
  '10_Projects/DexCompany-Ops/CURRENT.md',
  '10_Projects/DexCompany-Ops/SESSION_HANDOFF.md',
  '10_Projects/DexCompany-Ops/QA_REPORT.md',
  '10_Projects/DexCompany-Ops/SOURCES.md',
  'CHANGELOG.md', 'HANDOFF.md',
]);
const RUNTIME = 'https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime';
const WIKI = 'https://github.com/ethanhee890-commits/dex-company-wiki';
export const HISTORY_BEGIN = '\n<!-- DEX_PRESERVED_20260906_BEGIN -->\n';
export const HISTORY_END = '\n<!-- DEX_PRESERVED_20260906_END -->\n</details>\n';

export function validateSnapshot(s) {
  const sha = /^[a-f0-9]{40}$/;
  if (!s || s.schemaVersion !== 1 || s.historyBase !== BASE || !/^\d{4}-\d{2}-\d{2}$/.test(s.asOfDate)) throw new Error('Invalid snapshot identity');
  if (!sha.test(s.runtimeSha) || !sha.test(s.branchSha)) throw new Error('Invalid Runtime commit');
  for (const field of ['runtimePr', 'branchRun', 'mainRun']) if (!Number.isSafeInteger(s[field]) || s[field] < 1) throw new Error('Invalid evidence ID');
  for (const field of ['branchStatus', 'mainStatus']) if (!['PASS', 'FAIL', 'Not Checked'].includes(s[field])) throw new Error('Invalid validation status');
  if (s.physicalWindows !== 'Not Checked' || s.issue28 !== 'OPEN' || s.issue34 !== 'blocked' || s.issue35 !== 'blocked') throw new Error('Unverified host promotion prohibited');
  if (s.billingChanged !== false || s.permissionsChanged !== false || s.recommendedCodex !== '0.151.0' || s.compatibilityFloor !== '0.150.0') throw new Error('Policy change outside repair');
  if (!/^\d+\.\d+\.\d+$/.test(s.providerCandidate)) throw new Error('Invalid provider candidate');
  if (s.runtimeTests !== undefined) {
    const { total, pass, fail, skipped } = s.runtimeTests;
    if (![total, pass, fail, skipped].every(value => Number.isSafeInteger(value) && value >= 0)
      || total !== pass + fail + skipped || (s.mainStatus === 'PASS' && fail > 0)) throw new Error('Invalid runtime test evidence');
  }
  if (s.productionAudit !== undefined) {
    const values = ['info', 'low', 'moderate', 'high', 'critical'].map(key => s.productionAudit[key]);
    if (!values.every(value => Number.isSafeInteger(value) && value >= 0)
      || s.productionAudit.total !== values.reduce((sum, value) => sum + value, 0)) throw new Error('Invalid audit evidence');
  }
  return s;
}

export function render(s, file, history) {
  validateSnapshot(s);
  if (!FILES.includes(file) || !Buffer.isBuffer(history)) throw new Error('Unapproved document');
  const title = path.posix.basename(file, '.md');
  const nextInstruction = s.mainStatus === 'PASS' && s.branchStatus === 'PASS'
    ? `먼저 [최신 병합 기록](${WIKI}/blob/main/10_Projects/DexCompany-Ops/Tasks/DEX-PORTABLE-OS-20260912/MERGE_REVIEW.md)을 확인해요. 실제 실행을 검증할 때는 선택한 host의 경로·승인 계정과 위 Runtime commit을 고정하고 worker:host-check → codex:doctor → codex:compatibility → codex:status 및 effective model/계정/service tier를 확인해요. [Phase 3 runbook](${RUNTIME}/blob/${s.runtimeSha}/docs/PHASE3_LOCAL_BRIDGE.md)의 여섯 시나리오와 [필수 안전검사표](${RUNTIME}/blob/${s.runtimeSha}/docs/PHASE3_SAFETY_MATRIX.md)를 선택 실행 환경에 맞게 검증해요. Windows NTFS/ACL 명령은 Windows 경로에만 적용하며 Mac에는 동등한 POSIX/ACL·프로세스·파일 경계를 검증해요. 새 worker 버전 기동 전 기존 consumer를 중지·drain하고 lease/receipt를 대조해요. 기기가 없으면 해당 검사는 Not Checked로 남기고 허용된 다른 작업을 계속해요.`
    : `**중단 — Runtime 검증이 PASS가 아니에요.** 이 commit을 승인된 실행 기준으로 사용하거나 Windows 검사·worker 실행을 시작하지 않아요. 먼저 실패/미확인 원인을 바로잡고 exact commit의 필수 CI와 독립 검수 PASS를 확인한 뒤 스냅샷을 갱신해요. 아래 안전검사표는 향후 통과 조건일 뿐 지금 실행하라는 지시가 아니에요.`;
  const prefix = `# ${title}\n\n<!-- DEX_CURRENT_STATUS_BEGIN -->\n\n### 기기 독립 개선 — 2026-09-12\n\n개발·마케팅·사업·리서치 전 분야와 지속 학습을 대상으로 개선해요. 접속 기기와 실제 실행 환경을 분리하고, Windows 검증을 모든 Dex 사용의 필수 조건으로 확대하지 않아요. 아래 상태·CI는 확인 당시 스냅샷이며 실제 기기 검증을 새로 통과했다는 뜻이 아니에요. [작업과 최신 증거](https://github.com/ethanhee890-commits/dex-company-wiki/blob/main/10_Projects/DexCompany-Ops/Tasks/DEX-PORTABLE-OS-20260912/RESULT.md)와 [새 의존관계](https://github.com/ethanhee890-commits/dex-company-wiki/blob/main/20_Codex_Handoff/DEVICE_INDEPENDENT_EXECUTION.md)를 읽고 승인된 작업을 이어가요. 소스 병합과 실제 설치·실행 검증은 다른 상태예요. 최신 병합 증거는 연결된 Task에서 확인해요.\n\n## 현재 운영 스냅샷 — ${s.asOfDate}\n\n이 블록은 승인 main에 병합된 뒤 현재 기준으로 사용해요. 브랜치에서는 수정안이에요. 아래 보존 원문의 비용·보안·권한·프로젝트 설정과 비활성 역량 정책은 계속 현행 규칙이에요. 대체되는 것은 이전 날짜의 상태값·CI 판정·Next Prompt뿐이고, 이 새 블록의 확인일/대상 SHA와 실행 조건을 사용해요. 원문 전체를 폐기하거나 정책을 과거로 돌리는 변경이 아니며, 충돌 시 AI_CONTRACT.md를 우선해요.\n\nProject name: DexCompany-Ops\nStatus: active\nOperational status: v2-codex-0151-recommended-tracked-disabled\nLast updated: ${s.asOfDate}\n\n| 항목 | 확인값 |\n|---|---|\n| Runtime 검증 스냅샷 | PR #${s.runtimePr} / \`${s.runtimeSha}\` |\n| 브랜치 검증 | \`${s.branchRun}\` / ${s.branchStatus}; tested head \`${s.branchSha}\` |\n| 병합 후 main 검증 | \`${s.mainRun}\` / ${s.mainStatus}; tested head \`${s.runtimeSha}\` |\n| 실제 Windows 전체 검사 | **${s.physicalWindows}** — 문서·CI 통과와 별개 |\n| Galaxy / iPhone / Mac 접근·실행 | **Not Checked** — 이번 소스 병합으로 승인하지 않음 |\n| 공통 Plugin 소스 | ${s.sourcePluginVersion ?? 'Not Checked'}; 실제 설치 Not Checked |\n| Runtime 테스트 | total ${s.runtimeTests?.total ?? 'Not Checked'} / PASS ${s.runtimeTests?.pass ?? 'Not Checked'} / FAIL ${s.runtimeTests?.fail ?? 'Not Checked'} / skip ${s.runtimeTests?.skipped ?? 'Not Checked'} |\n| production 의존성 audit | total ${s.productionAudit?.total ?? 'Not Checked'}, moderate ${s.productionAudit?.moderate ?? 'Not Checked'}, high ${s.productionAudit?.high ?? 'Not Checked'}, critical ${s.productionAudit?.critical ?? 'Not Checked'} |\n| Vercel / 직접 HTTP | commit status ${s.vercelCommitStatus ?? 'Not Checked'} / live HTTP ${s.liveHttp ?? 'Not Checked'} |\n| 다음 순서 | #28 ${s.issue28}; #34/#35는 공통 안전 + 선택 경로 검증 뒤 기능별 판단; 현재 #34 ${s.issue34}, #35 ${s.issue35} |\n| 승인 Codex 권장 / 최소 호환 버전 | ${s.recommendedCodex} / ${s.compatibilityFloor} — 변경 없음 |\n| 마지막 확인한 provider 검증 후보 | ${s.providerCandidate} — 자동 설치·승격 안 함; 실제 사용 전 다시 확인 |\n| 요금·권한 | 변경 없음; 유료 API/fallback·credit/reset 자동 사용 없음 |\n\nWiki 원문 보존 기준은 PR #166 / \`${BASE}\`예요. 미래 merge SHA나 실시간 Wiki head가 아니에요. [Wiki 수정 PR #167](${WIKI}/pull/167)과 [checkpoint #55](${WIKI}/issues/55)에서 이후 변경을 확인해요. 이 스냅샷의 검증 결과는 위 Runtime SHA에만 적용해요.\n\n### QA와 남은 문제\n\nRuntime #194의 최소 의존성 보안 수정과 #203의 전 분야·기기 독립 개선을 결합해 위 commit에서 검증했어요. 사전 worktree 검사, 원래 Task를 받는 verifier, 저장소별 lease/counter/result, OS 신원, provider 가용성, 동일 탭 초안 복구와 공통 Skill을 포함해요. 자동 검사·smoke·rollback·audit 결과는 위 snapshot에만 적용해요. 운영 credential 기본 검사와 fail-closed 정책은 유지돼요.\n\n2026-09-09의 과거 Windows 검사에서는 승인된 \`DexWorker\`가 아닌 개인 계정으로 첫 host identity gate가 **FAIL**이었어요. 개인 계정의 read-only 진단에서 stable Codex 0.153.4, ChatGPT Pro 로그인, provider API key 미사용, Sol/Astra catalog와 medium no-op은 확인했지만 승인 worker의 #190/#28 evidence로 승격하지 않아요. 따라서 #190과 #28 physical host는 **Not Checked**, #34/#35는 blocked를 유지해요.\n\n역사적 PR #185의 \`33853299911\` attempt 2 network timeout과 PR #157/#186 실패, 과거 PR #193의 moderate 2건도 보존해요. 현재 의존성 audit과 과거 결과를 섞지 않으며, audit 0건은 모든 보안 위험이나 실기기 검증의 완료를 뜻하지 않아요.\n\n### 다음 작업 / Next Prompt\n\n${nextInstruction}\n\n| ID | 추가 필수 검사 |\n|---|---|\n| P3-PERM | 새 작업·이어가기·복원·재시작에서 실제 sandbox/approval 권한 유지 |\n| P3-CWD | 실제 child cwd와 repository realpath가 등록된 Task 대상과 일치 |\n| P3-PROCESS | PID·creation time·Task 소유권 및 모든 descendants 종료 확인 전 lease 해제·재시도 금지 |\n| P3-SCOPE | Task-owned cleanup만 허용; 먼저 no-op 경계 검사, synthetic outside/sibling sentinel 보존 |\n\n실제 home/다른 저장소 삭제 명령을 테스트로 실행하지 않아요. 필요한 속성을 runtime이 검사·강제하지 못하면 **Not Checked로 멈추고 구현 누락을 추적**해요. 경로 추측·권한 확대·중복 worker로 우회하지 않아요. 독립 검수자가 공통 안전과 선택 경로의 전체 증거를 확인하기 전에는 해당 기능을 활성화하지 않아요. #28의 Windows 항목은 별도로 OPEN을 유지하고 #34/#35도 현재 blocked를 유지해요.\n\n### 계속 적용되는 보안·권한 규칙\n\n예상하지 않은 \`danger-full-access\`, sandbox 해제, \`approval=never\`, unknown profile 또는 권한 확대는 mutation 전에 FAIL/CANCEL해요. 전용 non-admin worker는 profile-local ChatGPT 로그인만 사용하고 GitHub CLI/Git/SSH push credential, GitHub App secret, provider API key를 받지 않아요. GitHub 인증과 Task 승인·publication은 broker 경계에 유지해요.\n\nHosted MCP writes, unattended Production consumer, multi-writer, automatic approval, paid API/fallback, credit/reset 자동 사용은 비활성이에요. Browser/Computer Use/full CDP/Remote/Voice/Sites, WSL 전환, experimental 기능, diagnostic upload, plugin 자동 install/update/reconcile와 legacy 삭제도 기존의 별도 승인·검증 없이 활성화하지 않아요. provider cache/UI/history는 Task/승인 authority가 아니에요. 아래 원문에 있는 더 상세한 동일 정책도 계속 유효해요.\n\n### 보존한 기준과 출처\n\n#17 완료, Phase 3 구현 PR #88 \`ae9552aa5cbacf78bb4789ce913142397e2a3968\`, Phase 2 PR #67 \`42e8ab4c8b10f69738a38c4e3dfb04139b786b3c\`, Phase 1 PR #63 \`181ae294fb5f63eb35f524677bd4d89aa6621c3d\`, 전용 host PR #60 \`f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b\`를 유지해요. 승인 authenticated PWA write는 그대로, hosted MCP write는 비활성이에요. 모델·요금·API/credit/reset·worker/OS 권한·배포 설정은 바꾸지 않았어요.\n\n[Runtime 수정 PR](${RUNTIME}/pull/${s.runtimePr}) · [브랜치 CI](${RUNTIME}/actions/runs/${s.branchRun}) · [병합 후 CI](${RUNTIME}/actions/runs/${s.mainRun}) · [역사적 실패 로그](${RUNTIME}/actions/runs/33853299911/job/100962362749) · [현재 #28](${RUNTIME}/issues/28)\n\n문서 일치·원문 무변경 검사는 \`node scripts/ops-state.mjs\`로 수행해요. 실제 원격 CI 재실행이나 Windows E2E를 대신하지 않아요.\n\n<!-- DEX_CURRENT_STATUS_END -->\n\n<details>\n<summary>원문 보존 — 정책은 계속 유효하며, 이전 상태값과 Next Prompt만 위 블록으로 대체해요</summary>\n`;
  return Buffer.concat([Buffer.from(prefix + HISTORY_BEGIN), history, Buffer.from(HISTORY_END)]);
}

export function verify(s, file, actual, original) {
  if (!Buffer.isBuffer(actual) || !actual.equals(render(s, file, original))) throw new Error(`Document drift: ${file}`);
}

function readRegular(root, file, expectedSize) {
  const target = path.join(root, file);
  let stat;
  try {
    stat = fs.lstatSync(target);
    if (!stat.isFile() || fs.realpathSync(target) !== target) throw new Error();
  } catch {
    throw new Error(`Missing or nonregular verification file: ${file}`);
  }
  if (stat.size > 4 * 1024 * 1024 || (expectedSize !== undefined && stat.size !== expectedSize)) throw new Error(`Verification file size mismatch: ${file}`);
  const raw = fs.readFileSync(target);
  if (raw.length !== stat.size) throw new Error(`Verification file changed while reading: ${file}`);
  return raw;
}

function exactKeys(value, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || Object.keys(value).length !== keys.length || !keys.every(key => Object.hasOwn(value, key))) throw new Error('Invalid public history archive schema');
}

export function loadPublicHistory(root = process.cwd()) {
  root = fs.realpathSync(root);
  // This reviewed pin is independent of the checked documents. Never regenerate
  // the archive from current files, fall back to Git, or silently update the pin.
  const raw = readRegular(root, PUBLIC_HISTORY_ARCHIVE, PUBLIC_HISTORY_BYTES);
  if (createHash('sha256').update(raw).digest('hex') !== PUBLIC_HISTORY_SHA256) throw new Error('Public history archive integrity failure');
  const archive = JSON.parse(raw.toString('utf8'));
  exactKeys(archive, ['schemaVersion', 'kind', 'repository', 'originalSource', 'publicSource', 'documents']);
  exactKeys(archive.originalSource, ['repository', 'commit']);
  exactKeys(archive.publicSource, ['commit', 'tree', 'redactionCommit', 'redactionPr']);
  if (archive.schemaVersion !== 1 || archive.kind !== 'approved-public-copy-history'
    || archive.repository !== 'dexcompanyllm/Dexcompanyllm'
    || archive.originalSource.repository !== 'ethanhee890-commits/dex-company-wiki'
    || archive.originalSource.commit !== BASE
    || archive.publicSource.commit !== '359e480d8a16cce53d8235ba7c6f6a706ba53199'
    || archive.publicSource.tree !== 'a7534bb4b34e5a80e6e2881dfb8d0267d928b533'
    || archive.publicSource.redactionCommit !== '74677096ce490cee3c4efbd71d53d3a9ecaf8657'
    || archive.publicSource.redactionPr !== 4
    || !Array.isArray(archive.documents) || archive.documents.length !== FILES.length) throw new Error('Invalid public history archive identity');
  const history = new Map();
  for (const [i, entry] of archive.documents.entries()) {
    exactKeys(entry, ['path', 'sourceBlobSha', 'publicBlobSha', 'byteLength', 'sha256', 'redacted', 'base64']);
    const redacted = entry.path === 'CURRENT_STATE.md';
    if (entry.path !== FILES[i] || entry.redacted !== redacted
      || !/^[a-f0-9]{40}$/.test(entry.sourceBlobSha) || !/^[a-f0-9]{40}$/.test(entry.publicBlobSha)
      || !/^[a-f0-9]{64}$/.test(entry.sha256)
      || !Number.isSafeInteger(entry.byteLength) || entry.byteLength < 1 || entry.byteLength > 4 * 1024 * 1024
      || typeof entry.base64 !== 'string') throw new Error('Invalid public history document');
    const bytes = Buffer.from(entry.base64, 'base64');
    const blob = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    if (bytes.toString('base64') !== entry.base64 || bytes.length !== entry.byteLength
      || createHash('sha256').update(bytes).digest('hex') !== entry.sha256 || blob !== entry.publicBlobSha
      || (!redacted && blob !== entry.sourceBlobSha) || (redacted && blob === entry.sourceBlobSha)) throw new Error('Public history document integrity failure');
    history.set(entry.path, bytes);
  }
  return history;
}

export function readHistory(file, root = process.cwd()) {
  if (!FILES.includes(file)) throw new Error('Unapproved history path');
  return loadPublicHistory(root).get(file);
}

export function check(root = process.cwd()) {
  root = fs.realpathSync(root);
  const s = validateSnapshot(JSON.parse(readRegular(root, SNAPSHOT).toString('utf8')));
  const history = loadPublicHistory(root);
  for (const file of FILES) verify(s, file, readRegular(root, file), history.get(file));
  return 'PASS: eight current snapshots agree; approved public history preserved (seven original documents, one owner-approved redaction); Windows remains Not Checked.';
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { console.log(check()); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
