const state = {
  projects: [],
  tasks: [],
  status: null,
  session: null,
  selectedProject: null,
  pendingTaskSubmission: null,
  taskSubmitting: false,
  loadGeneration: 0,
  draftRestored: false,
  requestKind: 'task',
  taskFilter: '',
  handoffGeneration: 0,
  handoff: null,
  handoffReference: null,
  handoffPublishing: false,
  resultGeneration: 0,
};

const TASK_SUBMISSION_STORAGE_KEY = 'dexPendingTaskSubmissionV1';
const TASK_DRAFT_STORAGE_KEY = 'dexTaskDraftV1';
const TASK_DRAFT_TTL_MS = 30 * 60 * 1000;

const nodes = {
  badge: document.querySelector('#connection-badge'),
  identity: document.querySelector('#identity-badge'),
  login: document.querySelector('#login-button'),
  logout: document.querySelector('#logout-button'),
  settingsButton: document.querySelector('#settings-button'),
  projects: document.querySelector('#projects'),
  tasks: document.querySelector('#tasks'),
  taskCount: document.querySelector('#task-count'),
  projectSelect: document.querySelector('#project-select'),
  objective: document.querySelector('#objective'),
  criteria: document.querySelector('#criteria'),
  role: document.querySelector('#role'),
  priority: document.querySelector('#priority'),
  form: document.querySelector('#task-form'),
  create: document.querySelector('#create-button'),
  preview: document.querySelector('#route-preview'),
  settings: document.querySelector('#settings-dialog'),
  accessToken: document.querySelector('#access-token'),
  adminToken: document.querySelector('#admin-token'),
  settingsError: document.querySelector('#connection-error'),
  saveSettings: document.querySelector('#save-settings'),
  cancelSettings: document.querySelector('#cancel-settings'),
  resultDialog: document.querySelector('#result-dialog'),
  resultTitle: document.querySelector('#result-title'),
  resultMeta: document.querySelector('#result-meta'),
  resultContent: document.querySelector('#result-content'),
  closeResult: document.querySelector('#close-result'),
  sources: document.querySelector('#source-links'),
  newProjectName: document.querySelector('#new-project-name'),
  newProjectButton: document.querySelector('#new-project-button'),
  registrationFields: document.querySelector('#registration-fields'),
  cancelRegistration: document.querySelector('#cancel-registration'),
  requestTitle: document.querySelector('#request-title'),
  taskFilter: document.querySelector('#task-filter'),
  writeNotice: document.querySelector('#write-notice'),
  resultSummary: document.querySelector('#result-summary'),
  handoffDialog: document.querySelector('#handoff-dialog'),
  handoffText: document.querySelector('#handoff-text'),
  handoffMessage: document.querySelector('#handoff-message'),
  copyHandoff: document.querySelector('#copy-handoff'),
  downloadHandoff: document.querySelector('#download-handoff'),
  handoffTarget: document.querySelector('#handoff-target'),
  publishHandoff: document.querySelector('#publish-handoff'),
  handoffDelivery: document.querySelector('#handoff-delivery'),
  renewHandoff: document.querySelector('#renew-handoff'),
};

function storedAccessToken() {
  return sessionStorage.getItem('dexAccessToken') || '';
}

function legacyMode() {
  return Boolean(storedAccessToken());
}

function legacyRequested() {
  return new URLSearchParams(location.search).get('legacy') === '1';
}

function setSettingsMessage(message = '') {
  nodes.settingsError.textContent = message;
  nodes.settingsError.classList.toggle('hidden', !message);
}

function loginUrl() {
  return state.session?.loginUrl || '/auth/github/start?returnTo=%2F';
}

async function api(path, options = {}, accessTokenOverride = undefined) {
  const accessToken = accessTokenOverride ?? storedAccessToken();
  const headers = {
    accept: 'application/json',
    ...(options.body ? { 'content-type': 'application/json' } : {}),
    ...(accessToken ? { 'x-dex-access-token': accessToken } : {}),
    ...(options.headers || {}),
  };
  const response = await fetch(path, { credentials: 'same-origin', ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error_description || payload.error || `Request failed: ${response.status}`);
    error.status = response.status;
    error.code = payload.code;
    error.source = payload.source;
    error.loginUrl = payload.loginUrl;
    throw error;
  }
  return payload;
}


function clearTaskDraft() {
  try { sessionStorage.removeItem(TASK_DRAFT_STORAGE_KEY); } catch {}
}

function persistTaskDraft() {
  const owner = state.session?.authenticated && !legacyMode() ? state.session.login : null;
  if (!owner) return;
  const draft = {
    version: 1, owner, savedAt: Date.now(),
    project: nodes.projectSelect.value || state.selectedProject || 'Company-Ops',
    objective: nodes.objective.value, criteria: nodes.criteria.value,
    role: nodes.role.value, priority: nodes.priority.value,
    sources: nodes.sources.value, requestKind: state.requestKind, newProjectName: nodes.newProjectName.value,
  };
  if (!draft.objective || draft.objective.length > 4000 || draft.criteria.length > 12000 || draft.sources.length > 22000) {
    clearTaskDraft();
    return;
  }
  // Same-tab recovery only. No tokens, persistent browser storage or automatic
  // submission; submitted Tasks and their receipts remain canonical in GitHub.
  try { sessionStorage.setItem(TASK_DRAFT_STORAGE_KEY, JSON.stringify(draft)); } catch {}
}

function restoreTaskDraft() {
  if (state.draftRestored || !state.session?.authenticated || legacyMode()) return;
  state.draftRestored = true;
  try {
    const draft = JSON.parse(sessionStorage.getItem(TASK_DRAFT_STORAGE_KEY) || 'null');
    if (!draft) return;
    const age = Date.now() - draft.savedAt;
    if (draft.version !== 1 || draft.owner !== state.session.login
      || !Number.isFinite(age) || age < 0 || age > TASK_DRAFT_TTL_MS
      || !['project', 'objective', 'criteria', 'role', 'priority'].every(key => typeof draft[key] === 'string')
      || !draft.objective || draft.objective.length > 4000 || draft.criteria.length > 12000
      || (draft.sources !== undefined && (typeof draft.sources !== 'string' || draft.sources.length > 22000))
      || (draft.newProjectName !== undefined && (typeof draft.newProjectName !== 'string' || draft.newProjectName.length > 80))
      || (draft.requestKind !== undefined && !['task', 'project-registration'].includes(draft.requestKind))) {
      clearTaskDraft();
      return;
    }
    const availableProjects = state.projects.length ? state.projects.map(project => project.name) : ['Company-Ops'];
    if (!availableProjects.includes(draft.project)) {
      showPreview('임시 작업 확인 필요', ['기존 프로젝트에 접근할 수 없어 입력을 복원하지 않았어요.']);
      return;
    }
    nodes.projectSelect.value = draft.project;
    state.selectedProject = draft.project;
    nodes.objective.value = draft.objective;
    nodes.criteria.value = draft.criteria;
    nodes.role.value = draft.role;
    nodes.priority.value = draft.priority;
    nodes.sources.value = draft.sources || '';
    nodes.newProjectName.value = draft.newProjectName || '';
    setRequestKind(draft.requestKind || 'task');
    showPreview('작성하던 작업을 복원했어요', ['내용을 확인한 뒤 제출해 주세요.']);
  } catch { clearTaskDraft(); }
}

function reconnect(url = loginUrl(), replace = false) {
  persistTaskDraft();
  if (replace) location.replace(url);
  else location.assign(url);
}

function readPendingTaskSubmission() {
  try {
    const pending = JSON.parse(localStorage.getItem(TASK_SUBMISSION_STORAGE_KEY) || 'null');
    if (
      typeof pending?.fingerprintHash === 'string'
      && /^[a-f0-9]{64}$/.test(pending.fingerprintHash)
      && typeof pending?.idempotencyKey === 'string'
      && /^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/.test(pending.idempotencyKey)
    ) return pending;
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }
  return null;
}

function persistPendingTaskSubmission(pending) {
  try {
    localStorage.setItem(TASK_SUBMISSION_STORAGE_KEY, JSON.stringify(pending));
  } catch {
    // In-memory retry protection still works when durable storage is unavailable.
  }
}

async function taskPayload({ persistSubmission = true } = {}) {
  const registering = state.requestKind === 'project-registration';
  const project = registering ? 'Company-Ops' : nodes.projectSelect.value || state.selectedProject || 'Company-Ops';
  const objective = nodes.objective.value.trim();
  const criteria = nodes.criteria.value.split('\n').map(value => value.trim()).filter(Boolean);
  const role = nodes.role.value;
  const capabilities = role === 'developer'
    ? ['edit-repository', 'run-tests']
    : role === 'planner'
      ? ['requirement-analysis', 'screen-spec-authoring']
      : role === 'qa'
        ? ['test-design', 'evidence-capture']
        : [];
  const payload = {
    task: { title: registering ? `프로젝트 등록 요청: ${nodes.newProjectName.value.trim()}` : objective.slice(0, 80) || 'Untitled task', priority: nodes.priority.value },
    project: { name: project, baseRef: 'main' },
    request: {
      source: 'runtime.invalid',
      clientPlatform: matchMedia('(max-width: 720px)').matches ? 'mobile-web' : 'desktop-web',
      objective,
      originalText: objective,
    },
    routing: { role, requiredCapabilities: capabilities, preferredProvider: 'auto' },
    costPolicy: { mode: 'subscription-only', paidApiAllowed: false, automaticPaidFallback: false, extraUsageAllowed: false, budgetLimit: 0 },
    acceptanceCriteria: criteria,
    execution: { riskLevel: 'low' },
  };
  payload.constraints = { personalWorkspace: {
    version: 1, kind: state.requestKind,
    sources: sourceLinks().map(url => ({ url, label: '' })),
    ...(registering ? { registration: { name: nodes.newProjectName.value.trim() } } : {}),
  } };
  if (!persistSubmission) {
    payload.execution.idempotencyKey = crypto.randomUUID();
    return payload;
  }
  const fingerprintBytes = new TextEncoder().encode(JSON.stringify(payload));
  const fingerprintHash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', fingerprintBytes)))
    .map(value => value.toString(16).padStart(2, '0'))
    .join('');
  if (state.pendingTaskSubmission?.fingerprintHash !== fingerprintHash) {
    const persisted = readPendingTaskSubmission();
    state.pendingTaskSubmission = persisted?.fingerprintHash === fingerprintHash
      ? persisted
      : { fingerprintHash, idempotencyKey: crypto.randomUUID() };
    persistPendingTaskSubmission(state.pendingTaskSubmission);
  }
  payload.execution.idempotencyKey = state.pendingTaskSubmission.idempotencyKey;
  return payload;
}

function invalidatePendingTaskSubmission() {
  state.pendingTaskSubmission = null;
  try {
    localStorage.removeItem(TASK_SUBMISSION_STORAGE_KEY);
  } catch {
    // Nothing else is required when browser storage is unavailable.
  }
}

function updateCreateButton() {
  nodes.create.disabled = state.taskSubmitting || !state.status?.writes?.pwaEnabled;
  nodes.create.textContent = state.taskSubmitting ? 'Task 생성 중…' : 'Task 생성';
  nodes.create.setAttribute('aria-busy', state.taskSubmitting ? 'true' : 'false');
  if (state.requestKind === 'project-registration') nodes.create.textContent = state.taskSubmitting ? '등록 요청 중…' : '등록 요청 저장';
  nodes.newProjectButton.disabled = state.taskSubmitting || !state.status?.writes?.pwaEnabled;
  nodes.cancelRegistration.disabled = state.taskSubmitting;
  nodes.writeNotice.classList.toggle('hidden', Boolean(state.status?.writes?.pwaEnabled));
  nodes.writeNotice.textContent = state.status ? '현재 작업 저장을 사용할 수 없어요. 처리 방법 확인은 가능해요.' : '로그인과 연결 상태를 확인하면 작업을 저장할 수 있어요.';
}

function sourceLinks() {
  return nodes.sources.value.split('\n').map(value => value.trim()).filter(Boolean);
}

function validatePersonalInput() {
  const links = sourceLinks();
  if (links.length > 10 || new Set(links).size !== links.length || links.some(value => {
    try { const url = new URL(value); return value.length > 2048 || url.protocol !== 'https:' || Boolean(url.username || url.password); }
    catch { return true; }
  })) {
    showPreview('자료 링크 확인 필요', ['HTTPS 링크를 중복 없이 최대 10개 입력해 주세요.']);
    nodes.sources.focus();
    return false;
  }
  if (state.requestKind === 'project-registration' && (!/^[A-Za-z0-9가-힣][A-Za-z0-9._가-힣-]{0,79}$/.test(nodes.newProjectName.value.trim()) || nodes.newProjectName.value.includes('..'))) {
    showPreview('프로젝트 이름 확인 필요', ['한글·영문·숫자로 시작하는 80자 이하 이름을 입력해 주세요.']);
    nodes.newProjectName.focus();
    return false;
  }
  return true;
}

function setRequestKind(kind) {
  if (state.taskSubmitting) return;
  state.requestKind = kind;
  const registering = kind === 'project-registration';
  nodes.registrationFields.classList.toggle('hidden', !registering);
  nodes.projectSelect.disabled = registering;
  nodes.requestTitle.textContent = registering ? '프로젝트 등록 요청' : '새 작업';
  updateCreateButton();
}

function setTaskSubmitting(submitting) {
  state.taskSubmitting = submitting;
  updateCreateButton();
}

function renderProjects() {
  const selected = state.selectedProject || nodes.projectSelect.value;
  nodes.projects.replaceChildren();
  nodes.projectSelect.replaceChildren();
  nodes.taskFilter.replaceChildren(new Option('모든 프로젝트', ''));
  if (!state.projects.length) {
    nodes.projects.textContent = '프로젝트를 불러오지 못했어요.';
    nodes.projectSelect.append(new Option('Company-Ops', 'Company-Ops'));
    return;
  }
  for (const project of state.projects) {
    nodes.projectSelect.append(new Option(project.name, project.name));
    nodes.taskFilter.append(new Option(project.name, project.name));
    const card = document.querySelector('#project-template').content.firstElementChild.cloneNode(true);
    card.querySelector('strong').textContent = project.name;
    card.querySelector('span').textContent = String(project.summary || '').replace(/[#*`]/g, '').slice(0, 100);
    card.addEventListener('click', () => {
      if (state.taskSubmitting) return;
      state.selectedProject = project.name;
      nodes.projectSelect.value = project.name;
      setRequestKind('task');
      state.taskFilter = project.name;
      nodes.taskFilter.value = project.name;
      renderTasks();
      persistTaskDraft();
      document.querySelectorAll('.project-card').forEach(item => item.classList.toggle('active', item === card));
    });
    nodes.projects.append(card);
    card.classList.toggle('active', project.name === selected);
  }
  if (state.projects.some(project => project.name === selected)) nodes.projectSelect.value = selected;
  state.selectedProject = nodes.projectSelect.value;
  if (!state.projects.some(project => project.name === state.taskFilter)) state.taskFilter = '';
  nodes.taskFilter.value = state.taskFilter;
}

function safeGitHubUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'github.com' ? url.href : null;
  } catch {
    return null;
  }
}

function canonicalStateLabel(value) {
  return ({
    queued: '접수됨',
    'resolving-context': '컨텍스트 확인',
    planning: '계획·할당',
    'waiting-for-host': '실행 PC 대기',
    'awaiting-approval': '승인 대기',
    executing: '실행 중',
    verifying: '검증 중',
    completed: '완료',
    'blocked-quota': '사용량 대기',
    blocked: '차단됨',
    failed: '실패',
    cancelled: '취소됨',
  })[value] || '상태 확인 필요';
}

function localTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString();
}

async function openTaskResult(task) {
  const generation = ++state.resultGeneration;
  nodes.resultSummary.classList.add('hidden');
  const status = task.canonicalStatus;
  nodes.resultTitle.textContent = task.title || status?.taskId || 'Task 결과';
  nodes.resultMeta.textContent = status
    ? `${canonicalStateLabel(status.state)} (${status.state}) · 상태 버전 ${status.statusVersion}`
    : 'Canonical 결과를 확인하고 있어요.';
  nodes.resultContent.textContent = '결과를 불러오는 중';
  if (!nodes.resultDialog.open) nodes.resultDialog.showModal();
  try {
    const payload = await api(`/api/tasks/${encodeURIComponent(task.id)}/result`);
    if (generation !== state.resultGeneration) return;
    const result = payload.result.result || {};
    const checks = [...(result.watchdog?.checks || []), ...(result.verifier?.checks || []), ...(result.acceptance || [])];
    const checked = checks.length ? `검증 항목 ${checks.length}개가 기록돼 있어요.` : '검증 항목 수는 확인되지 않았어요.';
    nodes.resultSummary.textContent = `검증 결과: ${result.outcome || result.verdict || '확인 필요'} · ${checked} 아래에서 근거와 남은 문제를 확인해 주세요.`;
    nodes.resultSummary.classList.remove('hidden');
    nodes.resultMeta.textContent = `${canonicalStateLabel(payload.result.state)} (${payload.result.state}) · ${localTime(payload.result.createdAt)} · ${payload.result.resultHash}`;
    nodes.resultContent.textContent = JSON.stringify(payload.result, null, 2);
  } catch (error) {
    if (generation !== state.resultGeneration) return;
    nodes.resultMeta.textContent = '결과를 불러오지 못했어요.';
    nodes.resultContent.textContent = `${error.code || 'TASK_RESULT_READ_FAILED'}: ${error.message}`;
  }
}

function renderTasks() {
  nodes.tasks.replaceChildren();
  const visibleTasks = state.taskFilter ? state.tasks.filter(task => task.projectName === state.taskFilter || task.requestedProject === state.taskFilter) : state.tasks;
  nodes.taskCount.textContent = String(visibleTasks.length);
  if (!visibleTasks.length) {
    const notice = document.createElement('div');
    notice.className = 'notice';
    notice.textContent = state.taskFilter ? '최근 조회된 작업 중 이 프로젝트의 작업이 없어요. 전체 목록을 보거나 기존 작업 번호로 이어갈 수 있어요.' : '아직 Dex Task가 없어요. 새 작업을 만들면 진행 상태와 결과가 여기에 표시돼요.';
    nodes.tasks.append(notice);
    return;
  }
  for (const task of visibleTasks) {
    const card = document.querySelector('#task-template').content.firstElementChild.cloneNode(true);
    card.querySelector('strong').textContent = task.title;
    const status = task.canonicalStatus;
    card.querySelector('p').textContent = task.statusError
      ? `Canonical 상태 확인 실패 · ${task.statusError}`
      : status
        ? `${canonicalStateLabel(status.state)} (${status.state}) · v${status.statusVersion} · ${localTime(status.updatedAt)}`
        : 'Canonical 상태 확인 중…';
    const resultButton = card.querySelector('.result-button');
    if (status?.resultAvailable) {
      resultButton.classList.remove('hidden');
      resultButton.addEventListener('click', () => openTaskResult(task));
    }
    const link = card.querySelector('a');
    card.querySelector('.handoff-button').addEventListener('click', () => openHandoff(task.id));
    if (task.requestKind === 'project-registration') {
      const registration = document.createElement('p');
      registration.textContent = state.projects.some(project => project.name === task.requestedProject)
        ? '승인된 프로젝트 목록에 반영됐어요.'
        : '프로젝트 등록 요청 · 승인 목록 반영 전이에요.';
      card.querySelector('.task-copy').append(registration);
    }
    const href = safeGitHubUrl(task.url);
    if (href) link.href = href;
    else link.remove();
    nodes.tasks.append(card);
  }
}

async function hydrateTaskStatuses(tasks, generation) {
  let nextIndex = 0;
  const worker = async () => {
    while (nextIndex < tasks.length && state.loadGeneration === generation) {
      const index = nextIndex;
      nextIndex += 1;
      const task = tasks[index];
      try {
        const payload = await api(`/api/tasks/${encodeURIComponent(task.id)}/status`);
        task.canonicalStatus = payload.status;
        task.statusError = null;
      } catch (error) {
        task.canonicalStatus = null;
        task.statusError = error.code || 'TASK_STATUS_READ_FAILED';
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(4, tasks.length) }, () => worker()));
  if (state.loadGeneration === generation) renderTasks();
}

async function openHandoff(reference) {
  if (!/^(?:(?:issue:)?[1-9][0-9]*|[A-Za-z][A-Za-z0-9._:-]{0,127})$/.test(String(reference))) {
    showPreview('작업 번호 확인 필요', ['GitHub 작업 번호 또는 DC로 시작하는 Task ID를 입력해 주세요.']);
    return;
  }
  const generation = ++state.handoffGeneration;
  state.handoff = null;
  state.handoffReference = String(reference);
  nodes.handoffDelivery.classList.add('hidden');
  nodes.renewHandoff.classList.add('hidden');
  nodes.handoffDelivery.textContent = '';
  updateHandoffPublishButton();
  nodes.handoffText.value = '';
  nodes.copyHandoff.disabled = true;
  nodes.downloadHandoff.disabled = true;
  nodes.handoffMessage.textContent = '저장된 작업과 최신 기준을 확인하고 있어요…';
  if (!nodes.handoffDialog.open) nodes.handoffDialog.showModal();
  try {
    const payload = await api(`/api/tasks/${encodeURIComponent(reference)}/handoff`);
    if (generation !== state.handoffGeneration) return;
    if (typeof payload.handoff?.text !== 'string' || !/^dex-handoff-[1-9][0-9]*\.md$/.test(payload.handoff.filename)) throw new Error('인계문 응답을 확인하지 못했어요.');
    state.handoff = payload.handoff;
    updateHandoffPublishButton();
    nodes.handoffText.value = payload.handoff.text;
    nodes.handoffMessage.textContent = '목표·자료·진행 상태를 담았어요. 공유할 내용을 확인해 주세요.';
    nodes.copyHandoff.disabled = false;
    nodes.downloadHandoff.disabled = false;
  } catch (error) {
    if (generation !== state.handoffGeneration) return;
    nodes.handoffMessage.textContent = `인계문을 만들지 못했어요. ${error.message}`;
    if (error.status === 401 && state.session?.authConfigured && !legacyMode()) reconnect();
  }
}

function openSettings(message = '') {
  if (!nodes.settings.open) {
    nodes.accessToken.value = storedAccessToken();
    nodes.adminToken.value = sessionStorage.getItem('dexAdminToken') || '';
    nodes.settings.showModal();
  }
  setSettingsMessage(message);
}

function githubFailureMessage(error) {
  if (error.status === 401) return 'GitHub App 인증이 거부됐어요.';
  if (error.status === 403) return 'GitHub App의 dex-company-wiki 권한이 부족해요.';
  if (error.status === 404) return 'GitHub에서 dex-company-wiki 또는 지정한 ref/path를 찾지 못했어요.';
  if (error.status === 422) return 'GitHub ref 또는 요청 설정이 유효하지 않아요.';
  return `GitHub 연결 실패 (${error.status || 'unknown'}): ${error.message}`;
}

function diagnosticSummary(diagnostics) {
  const failed = (diagnostics?.checks || []).filter(check => !check.ok);
  if (!failed.length) return '';
  return failed.map(check => `${check.name}: ${check.code} (${check.status})`).join(' / ');
}

function updateAuthControls() {
  const authenticated = Boolean(state.session?.authenticated);
  const legacy = legacyMode();
  nodes.identity.classList.toggle('hidden', !authenticated && !legacy);
  nodes.identity.textContent = authenticated ? `@${state.session.login}` : legacy ? '비상 토큰' : '';
  nodes.login.classList.toggle('hidden', authenticated || legacy || !state.session?.authConfigured);
  nodes.logout.classList.toggle('hidden', !authenticated && !legacy);
  nodes.settingsButton.classList.toggle('hidden', !state.session?.legacyAvailable && !legacyRequested());
}

function showPreview(title, lines = [], link = null) {
  nodes.preview.replaceChildren();
  nodes.preview.classList.remove('hidden');
  const heading = document.createElement('strong');
  heading.textContent = title;
  nodes.preview.append(heading);
  for (const line of lines) nodes.preview.append(document.createElement('br'), document.createTextNode(line));
  if (link?.href && link?.label) {
    const href = safeGitHubUrl(link.href);
    if (href) {
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
      anchor.textContent = link.label;
      nodes.preview.append(document.createElement('br'), anchor);
    }
  }
}

async function loadSession() {
  state.session = await api('/api/session');
  updateAuthControls();
  if (!state.session.authenticated && !legacyMode() && state.session.authConfigured && !legacyRequested()) {
    reconnect(loginUrl(), true);
    return false;
  }
  return state.session.authenticated || legacyMode();
}

async function load({ openAuthOn401 = true } = {}) {
  const generation = ++state.loadGeneration;
  nodes.badge.textContent = '연결 확인 중';
  let accessValidated = false;
  try {
    if (!(await loadSession())) {
      nodes.badge.textContent = '로그인 필요';
      nodes.projects.textContent = 'GitHub 로그인 후 프로젝트가 표시됩니다.';
      nodes.tasks.textContent = '로그인 후 최근 작업이 표시됩니다.';
      state.status = null;
      updateCreateButton();
      if (state.session?.legacyAvailable && openAuthOn401) openSettings('GitHub OAuth를 사용할 수 없을 때만 비상 토큰을 입력해 주세요.');
      return false;
    }
    const status = await api('/api/status');
    accessValidated = true;
    const [projects, tasks] = await Promise.all([api('/api/projects'), api('/api/tasks?state=all')]);
    if (state.loadGeneration !== generation) return false;
    state.status = status;
    state.projects = projects.projects || [];
    state.tasks = (tasks.tasks || []).slice(0, 50);
    nodes.badge.textContent = status.githubConnected ? 'GitHub 연결됨' : 'GitHub 연결 확인 필요';
    renderProjects();
    restoreTaskDraft();
    renderTasks();
    updateCreateButton();
    await hydrateTaskStatuses(state.tasks, generation);
    return true;
  } catch (error) {
    if (state.loadGeneration !== generation) return false;
    if (accessValidated) {
      nodes.badge.textContent = 'GitHub 연결 오류';
      let diagnosticsText = '';
      try { diagnosticsText = diagnosticSummary(await api('/api/github-diagnostics')); } catch {}
      nodes.projects.textContent = diagnosticsText ? `${githubFailureMessage(error)} | 진단: ${diagnosticsText}` : githubFailureMessage(error);
      nodes.tasks.textContent = 'PWA 로그인은 정상입니다. GitHub App 서버 연결 설정을 확인해 주세요.';
    } else {
      nodes.badge.textContent = error.status === 401 ? '로그인 필요' : '설정 필요';
      nodes.projects.textContent = error.message;
      nodes.tasks.textContent = error.status === 401 ? 'GitHub 로그인 후 다시 시도해 주세요.' : '서버 설정 뒤 task가 표시됩니다.';
    }
    nodes.projectSelect.replaceChildren(new Option('Company-Ops', 'Company-Ops'));
    state.status = null;
    updateCreateButton();
    if (!accessValidated && error.status === 401 && state.session?.authConfigured && !legacyMode()) reconnect(error.loginUrl || loginUrl());
    else if (!accessValidated && error.status === 401 && openAuthOn401 && state.session?.legacyAvailable) openSettings('비상 access token이 만료되었거나 서버 값과 일치하지 않아요.');
    return false;
  }
}

async function preview() {
  if (!validatePersonalInput()) return;
  const payload = await taskPayload({ persistSubmission: false });
  if (!payload.request.objective) return nodes.objective.focus();
  try {
    const result = await api('/api/tasks/preview', { method: 'POST', body: JSON.stringify(payload) });
    const route = result.route;
    showPreview('라우팅 결과', [
      `Provider: ${route.selectedProvider || 'queue'}`,
      `Surface: ${route.selectedSurface || '-'}`,
      `실행 환경: ${route.availabilityClass}`,
      '비용: Subscription only',
      ...(route.reasons || []),
    ]);
  } catch (error) {
    showPreview('라우팅 실패', [error.message]);
    if (error.status === 401 && state.session?.authConfigured && !legacyMode()) reconnect();
  }
}

document.querySelector('#preview-button').addEventListener('click', preview);
document.querySelector('#refresh-button').addEventListener('click', () => load());
nodes.settingsButton.addEventListener('click', () => openSettings());
nodes.login.addEventListener('click', () => reconnect());
nodes.logout.addEventListener('click', async () => {
  state.handoffGeneration += 1;
  state.resultGeneration += 1;
  state.handoff = null;
  nodes.handoffText.value = '';
  clearTaskDraft();
  if (legacyMode() && state.session?.login === 'legacy-preview') {
    invalidatePendingTaskSubmission();
    sessionStorage.removeItem('dexAccessToken');
    sessionStorage.removeItem('dexAdminToken');
    location.assign('/logged-out');
    return;
  }
  try {
    await api('/auth/logout', {
      method: 'POST',
      headers: state.session?.csrfToken ? { 'x-csrf-token': state.session.csrfToken } : {},
    });
  } finally {
    invalidatePendingTaskSubmission();
    sessionStorage.removeItem('dexAccessToken');
    sessionStorage.removeItem('dexAdminToken');
    location.assign('/logged-out');
  }
});

nodes.cancelSettings.addEventListener('click', () => nodes.settings.close());
nodes.closeResult.addEventListener('click', () => { state.resultGeneration += 1; nodes.resultDialog.close(); });
nodes.resultDialog.addEventListener('cancel', () => { state.resultGeneration += 1; });
nodes.saveSettings.addEventListener('click', async () => {
  const accessToken = nodes.accessToken.value.trim();
  const adminToken = nodes.adminToken.value.trim();
  if (!accessToken) {
    setSettingsMessage('Legacy access token을 입력해 주세요.');
    nodes.accessToken.focus();
    return;
  }
  setSettingsMessage('');
  nodes.saveSettings.disabled = true;
  nodes.saveSettings.textContent = '연결 확인 중…';
  try {
    await api('/api/status', {}, accessToken);
    sessionStorage.setItem('dexAccessToken', accessToken);
    if (adminToken) sessionStorage.setItem('dexAdminToken', adminToken);
    else sessionStorage.removeItem('dexAdminToken');
    nodes.settings.close();
    await load({ openAuthOn401: false });
  } catch (error) {
    setSettingsMessage(error.status === 401 ? 'Legacy token이 서버 값과 일치하지 않거나 fallback이 비활성화됐어요.' : `연결 확인에 실패했어요: ${error.message}`);
  } finally {
    nodes.saveSettings.disabled = false;
    nodes.saveSettings.textContent = '저장 후 연결';
  }
});

nodes.form.addEventListener('input', persistTaskDraft);
nodes.form.addEventListener('change', persistTaskDraft);

nodes.newProjectButton.addEventListener('click', () => { setRequestKind('project-registration'); nodes.newProjectName.focus(); persistTaskDraft(); });
nodes.cancelRegistration.addEventListener('click', () => { setRequestKind('task'); persistTaskDraft(); });
nodes.projectSelect.addEventListener('change', () => {
  state.selectedProject = nodes.projectSelect.value;
  state.taskFilter = nodes.projectSelect.value;
  nodes.taskFilter.value = state.taskFilter;
  renderTasks();
});
nodes.taskFilter.addEventListener('change', () => { state.taskFilter = nodes.taskFilter.value; renderTasks(); });
document.querySelector('#task-lookup-form').addEventListener('submit', event => {
  event.preventDefault();
  openHandoff(document.querySelector('#task-reference').value.trim());
});
function clearHandoff() {
  state.handoffGeneration += 1;
  state.handoff = null;
  state.handoffReference = null;
  updateHandoffPublishButton();
  nodes.handoffText.value = '';
}
document.querySelector('#close-handoff').addEventListener('click', () => { clearHandoff(); nodes.handoffDialog.close(); });
nodes.handoffDialog.addEventListener('cancel', clearHandoff);
function updateHandoffPublishButton() {
  nodes.publishHandoff.disabled = state.handoffPublishing || !state.handoff || !state.status?.writes?.pwaEnabled || !['chatgpt', 'claude', 'gemini'].includes(nodes.handoffTarget.value);
  nodes.publishHandoff.textContent = state.handoffPublishing ? 'GitHub에 인계 저장 중…' : 'GitHub로 자동 인계';
  nodes.handoffTarget.disabled = state.handoffPublishing;
  nodes.renewHandoff.disabled = nodes.publishHandoff.disabled;
}
nodes.handoffTarget.addEventListener('change', () => { nodes.handoffDelivery.classList.add('hidden'); nodes.renewHandoff.classList.add('hidden'); updateHandoffPublishButton(); });
nodes.publishHandoff.addEventListener('click', () => publishSharedHandoff());
nodes.renewHandoff.addEventListener('click', () => publishSharedHandoff(true));
async function publishSharedHandoff(forceNew = false) {
  if (state.handoffPublishing || !state.handoff || !state.status?.writes?.pwaEnabled || !['chatgpt', 'claude', 'gemini'].includes(nodes.handoffTarget.value)) return;
  const generation = state.handoffGeneration, reference = state.handoffReference, target = nodes.handoffTarget.value;
  state.handoffPublishing = true;
  updateHandoffPublishButton();
  try {
    const storageKey = 'dexHandoffSubmissionV1';
    const fingerprintBytes = new TextEncoder().encode(JSON.stringify({ owner: state.session?.login, reference: state.handoff.taskId || reference, target }));
    const fingerprintHash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', fingerprintBytes))).map(value => value.toString(16).padStart(2, '0')).join('');
    let previous;
    try { previous = JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch {}
    const idempotencyKey = !forceNew && previous?.fingerprintHash === fingerprintHash && /^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/.test(previous?.idempotencyKey || '')
      ? previous.idempotencyKey : crypto.randomUUID();
    // Retain the exact key after success too: reopening/retrying the same
    // destination loads its receipt. The receiver always obtains live context.
    localStorage.setItem(storageKey, JSON.stringify({ fingerprintHash, idempotencyKey }));
    if (generation !== state.handoffGeneration) return;
    const legacyAdminToken = sessionStorage.getItem('dexAdminToken') || '';
    const payload = await api(`/api/tasks/${encodeURIComponent(reference)}/handoff`, {
      method: 'POST',
      headers: {
        ...(legacyAdminToken ? { 'x-dex-admin-token': legacyAdminToken } : {}),
        ...(state.session?.csrfToken ? { 'x-csrf-token': state.session.csrfToken } : {}),
      },
      body: JSON.stringify({ target, idempotencyKey }),
    });
    if (generation !== state.handoffGeneration) return;
    if (payload.delivery?.status !== 'stored' || payload.delivery?.target !== target) throw new Error('GitHub 인계 저장 응답을 확인하지 못했어요.');
    const targetNames = { claude: 'Claude', chatgpt: 'ChatGPT', gemini: 'Gemini' };
    nodes.renewHandoff.classList.toggle('hidden', !payload.delivery.superseded);
    nodes.handoffDelivery.textContent = payload.delivery.superseded
      ? `기존 인계 기록을 확인했어요. 현재 대상은 ${targetNames[payload.delivery.currentTarget] || '다른 AI'}로 변경됐어요. 이 요청으로 현재 대상을 바꾸지는 않았어요.`
      : 'GitHub 인계 저장 완료 · AI 수신 확인 전이에요. 연결된 AI에서 Dex 작업을 이어가면 인계함을 확인하도록 준비했어요. 자동 실행은 시작하지 않아요.';
    nodes.handoffDelivery.classList.remove('hidden');
  } catch (error) {
    if (generation !== state.handoffGeneration) return;
    nodes.handoffDelivery.textContent = `인계 저장을 확인하지 못했어요. ${error.message} 같은 요청으로 다시 확인할 수 있어요.`;
    nodes.handoffDelivery.classList.remove('hidden');
    if (error.status === 401 && state.session?.authConfigured && !legacyMode()) reconnect();
  } finally { state.handoffPublishing = false; updateHandoffPublishButton(); }
}
nodes.copyHandoff.addEventListener('click', async () => {
  if (!state.handoff) return;
  const generation = state.handoffGeneration;
  try {
    await navigator.clipboard.writeText(state.handoff.text);
    if (generation === state.handoffGeneration) nodes.handoffMessage.textContent = '복사했어요. 이어갈 AI 대화에 붙여넣어 주세요.';
  } catch {
    if (generation !== state.handoffGeneration) return;
    nodes.handoffText.focus();
    nodes.handoffText.select();
    nodes.handoffMessage.textContent = '자동 복사를 사용할 수 없어요. 선택된 내용을 직접 복사하거나 파일로 받아 주세요.';
  }
});
nodes.downloadHandoff.addEventListener('click', () => {
  if (!state.handoff) return;
  const url = URL.createObjectURL(new Blob([state.handoff.text], { type: 'text/markdown;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = state.handoff.filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

nodes.form.addEventListener('submit', async event => {
  event.preventDefault();
  if (state.taskSubmitting) return;
  const objective = nodes.objective.value.trim();
  if (!objective) return nodes.objective.focus();
  if (objective.length > 4000) {
    showPreview('입력 확인 필요', ['목표는 4,000자 이하로 입력해 주세요.']);
    return;
  }
  if (!validatePersonalInput()) return;
  const submittedKind = state.requestKind;
  persistTaskDraft();
  setTaskSubmitting(true);
  let created;
  try {
    const payload = await taskPayload();
    const legacyAdminToken = sessionStorage.getItem('dexAdminToken') || '';
    created = await api('/api/tasks', {
      method: 'POST',
      headers: {
        ...(legacyAdminToken ? { 'x-dex-admin-token': legacyAdminToken } : {}),
        ...(state.session?.csrfToken ? { 'x-csrf-token': state.session.csrfToken } : {}),
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    showPreview('Task 생성 실패', [error.message]);
    if (error.status === 401 && state.session?.authConfigured && !legacyMode()) reconnect();
    return;
  } finally {
    if (!created) setTaskSubmitting(false);
  }

  invalidatePendingTaskSubmission();
  clearTaskDraft();
  const successTitle = submittedKind === 'project-registration' ? (created.duplicate ? '기존 등록 요청 확인' : '프로젝트 등록 요청 저장 완료') : created.duplicate ? '기존 Task 확인' : 'Task 생성 완료';
  const issueLink = { href: created.url, label: 'GitHub Issue 열기' };
  showPreview(successTitle, submittedKind === 'project-registration' ? ['검토와 승인 후 프로젝트 목록에 반영돼요.'] : ['작업을 접수했어요. 실제 실행 여부는 진행 상태에서 확인해 주세요.'], issueLink);
  try {
    if (!(await load())) {
      showPreview(`${successTitle} · 목록 새로고침 실패`, ['GitHub Issue는 생성되었습니다. 새로고침 버튼으로 목록을 다시 불러와 주세요.'], issueLink);
    }
  } catch {
    showPreview(`${successTitle} · 목록 새로고침 실패`, ['GitHub Issue는 생성되었습니다. 새로고침 버튼으로 목록을 다시 불러와 주세요.'], issueLink);
  } finally {
    setTaskSubmitting(false);
  }
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
load();
