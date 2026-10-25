import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { webcrypto } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appSource = fs.readFileSync(path.join(root, "apps/console/public/app.js"), "utf8");

class FakeClassList {
  #classes = new Set();

  add(...names) {
    for (const name of names) this.#classes.add(name);
  }

  remove(...names) {
    for (const name of names) this.#classes.delete(name);
  }

  toggle(name, force) {
    if (force === true) this.#classes.add(name);
    else if (force === false) this.#classes.delete(name);
    else if (this.#classes.has(name)) this.#classes.delete(name);
    else this.#classes.add(name);
    return this.#classes.has(name);
  }

  contains(name) {
    return this.#classes.has(name);
  }

  values() {
    return [...this.#classes];
  }
}

class FakeElement {
  constructor(ownerDocument) {
    this.ownerDocument = ownerDocument;
    this.listeners = new Map();
    this.attributes = new Map();
    this.classList = new FakeClassList();
    this.children = [];
    this.disabled = false;
    this.open = false;
    this.textContent = "";
    this.value = "";
    this.selectorChildren = new Map();
    this.removed = false;
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  async dispatch(type, extra = {}) {
    const event = { preventDefault() {}, target: this, ...extra };
    const results = (this.listeners.get(type) || []).map(listener => listener(event));
    await Promise.all(results);
  }

  append(...children) {
    this.children.push(...children);
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  replaceChildren(...children) {
    this.children = [...children];
  }

  querySelector(selector) {
    if (!this.selectorChildren.has(selector)) this.selectorChildren.set(selector, new FakeElement(this.ownerDocument));
    return this.selectorChildren.get(selector);
  }

  cloneNode(deep = false) {
    const clone = new FakeElement(this.ownerDocument);
    for (const name of this.classList.values()) clone.classList.add(name);
    if (deep) {
      for (const [selector, child] of this.selectorChildren) {
        clone.selectorChildren.set(selector, child.cloneNode(true));
      }
    }
    return clone;
  }

  remove() {
    this.removed = true;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  focus() {
    this.ownerDocument.activeElement = this;
  }

  showModal() {
    this.open = true;
  }

  close() {
    this.open = false;
  }
}

function jsonResponse(payload, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() { return payload; },
  };
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

async function settle() {
  for (let index = 0; index < 8; index += 1) await Promise.resolve();
  await new Promise(resolve => setImmediate(resolve));
}

async function waitFor(predicate, message) {
  const deadline = Date.now() + 3000;
  while (Date.now() < deadline) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 5));
  }
  assert.fail(message);
}

let harnessCounter = 0;

async function createHarness({
  persistentStorage = new Map(),
  sessionStorage = new Map(),
  login = 'dexcompanyllm',
  authenticated = true,
  sessionCsrfToken = 'csrf',
  initialTasks = [],
  canonicalStatus = null,
  canonicalResult = null,
  initialProjects = [],
  handoffOutcome = null,
  publishHandoffOutcome = null,
} = {}) {
  const harnessId = ++harnessCounter;
  const elements = new Map();
  const document = {
    activeElement: null,
    createElement() { return new FakeElement(document); },
    createTextNode(value) { return { textContent: String(value) }; },
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, new FakeElement(document));
      return elements.get(selector);
    },
    querySelectorAll() { return []; },
  };

  const values = {
    "#project-select": "Company-Ops",
    "#objective": "모바일 화면설계서를 만들고 검수해",
    "#criteria": "레이아웃 확인\n회귀 테스트 통과",
    "#role": "developer",
    "#priority": "normal",
  };
  for (const [selector, value] of Object.entries(values)) document.querySelector(selector).value = value;
  document.querySelector("#create-button").textContent = "Task 생성";
  const taskPrototype = new FakeElement(document);
  taskPrototype.querySelector("strong");
  taskPrototype.querySelector("p");
  taskPrototype.querySelector(".result-button").classList.add("hidden");
  taskPrototype.querySelector("a");
  document.querySelector("#task-template").content = { firstElementChild: taskPrototype };
  document.querySelector("#project-template").content = { firstElementChild: new FakeElement(document) };

  const navigations = [];
  const taskRequests = [];
  const taskOutcomes = [];
  const taskListOutcomes = [];
  const statusRequests = [];
  const resultRequests = [];
  const handoffRequests = [];
  const handoffHttpRequests = [];
  const fetch = async (url, options = {}) => {
    if (url === "/api/session") {
      return jsonResponse({ authenticated, login, csrfToken: sessionCsrfToken, authConfigured: true });
    }
    if (url === "/auth/logout") return jsonResponse({ ok: true });
    if (url === "/api/status") return jsonResponse({ githubConnected: true, writes: { pwaEnabled: true } });
    if (url === "/api/projects") return jsonResponse({ projects: initialProjects });
    if (url === "/api/tasks?state=all") {
      const outcome = taskListOutcomes.shift();
      return outcome ? outcome() : jsonResponse({ tasks: initialTasks });
    }
    if (/^\/api\/tasks\/[^/]+\/status$/.test(url)) {
      statusRequests.push(url);
      return jsonResponse({ status: canonicalStatus });
    }
    if (/^\/api\/tasks\/[^/]+\/result$/.test(url)) {
      resultRequests.push(url);
      return jsonResponse({ result: canonicalResult });
    }
    if (/^\/api\/tasks\/[^/]+\/handoff$/.test(url)) {
      if (options.method === 'POST') {
        handoffHttpRequests.push(options);
        if (authenticated && !options.headers?.['x-dex-access-token'] && options.headers?.['x-csrf-token'] !== sessionCsrfToken) {
          return jsonResponse({ error: 'csrf_check_failed' }, 403);
        }
        const body = JSON.parse(options.body); handoffRequests.push(body);
        return publishHandoffOutcome ? publishHandoffOutcome(body) : jsonResponse({ delivery: { status: 'stored', target: body.target, receiverStatus: 'not-confirmed', superseded: false } }, 201);
      }
      return handoffOutcome ? handoffOutcome(url) : jsonResponse({ handoff: { text: '같은 작업으로 이어가세요.', taskId: 'DC-HANDOFF', filename: 'dex-handoff-42.md' } });
    }
    if (url === "/api/tasks" && options.method === "POST") {
      taskRequests.push(JSON.parse(options.body));
      const outcome = taskOutcomes.shift();
      return outcome ? outcome() : jsonResponse({ number: taskRequests.length, url: `https://github.com/example/issues/${taskRequests.length}` }, 201);
    }
    throw new Error(`Unexpected request: ${options.method || "GET"} ${url}`);
  };

  let uuidCounter = 0;
  const context = {
    Option: class Option { constructor(text, value) { this.text = text; this.value = value; } },
    URL,
    URLSearchParams,
    console,
    crypto: {
      randomUUID: () => `00000000-0000-4000-8000-${String(harnessId * 1000 + ++uuidCounter).padStart(12, "0")}`,
      subtle: webcrypto.subtle,
    },
    document,
    fetch,
    location: { search: "", assign(url) { navigations.push(url); }, replace(url) { navigations.push(url); } },
    matchMedia: () => ({ matches: false }),
    navigator: { serviceWorker: { async register() {} } },
    TextEncoder,
    Uint8Array,
    localStorage: {
      getItem(key) { return persistentStorage.get(key) ?? null; },
      removeItem(key) { persistentStorage.delete(key); },
      setItem(key, value) { persistentStorage.set(key, String(value)); },
    },
    sessionStorage: {
      getItem(key) { return sessionStorage.get(key) ?? null; },
      removeItem(key) { sessionStorage.delete(key); },
      setItem(key, value) { sessionStorage.set(key, String(value)); },
    },
  };

  vm.runInNewContext(appSource, context, { filename: "app.js" });
  await settle();
  return {
    createButton: document.querySelector("#create-button"),
    form: document.querySelector("#task-form"),
    objective: document.querySelector("#objective"),
    persistentStorage,
    sessionStorage,
    navigations,
    logout: document.querySelector("#logout-button"),
    criteria: document.querySelector("#criteria"),
    preview: document.querySelector("#route-preview"),
    tasks: document.querySelector("#tasks"),
    resultDialog: document.querySelector("#result-dialog"),
    resultContent: document.querySelector("#result-content"),
    queueTaskListOutcome(outcome) { taskListOutcomes.push(outcome); },
    queueTaskOutcome(outcome) { taskOutcomes.push(outcome); },
    taskRequests,
    statusRequests,
    resultRequests,
    handoffRequests,
    handoffHttpRequests,
    element: selector => document.querySelector(selector),
  };
}

test('the handoff button includes the current OAuth session CSRF token across reconnect and preserves legacy write credentials', async () => {
  const persistentStorage = new Map();
  let firstKey;
  for (const sessionCsrfToken of ['test-session-before', 'test-session-after']) {
    const h = await createHarness({ persistentStorage, sessionCsrfToken });
    h.element('#task-reference').value = '42';
    await h.element('#task-lookup-form').dispatch('submit'); await settle();
    h.element('#handoff-target').value = 'claude';
    await h.element('#publish-handoff').dispatch('click');
    assert.equal(h.handoffRequests.length, 1, 'the UI request must pass the session CSRF gate');
    assert.equal(h.handoffHttpRequests[0].headers['x-csrf-token'], sessionCsrfToken);
    assert.equal(h.handoffHttpRequests[0].credentials, 'same-origin');
    assert.match(h.element('#handoff-delivery').textContent, /GitHub 인계 저장 완료/);
    if (firstKey) assert.equal(h.handoffRequests[0].idempotencyKey, firstKey);
    firstKey = h.handoffRequests[0].idempotencyKey;
  }
  const legacy = await createHarness({ authenticated: false, sessionCsrfToken: null, sessionStorage: new Map([
    ['dexAccessToken', 'test-legacy-access'], ['dexAdminToken', 'test-legacy-admin'],
  ]) });
  legacy.element('#task-reference').value = '42';
  await legacy.element('#task-lookup-form').dispatch('submit'); await settle();
  legacy.element('#handoff-target').value = 'claude';
  await legacy.element('#publish-handoff').dispatch('click');
  assert.equal(legacy.handoffHttpRequests[0].headers['x-dex-access-token'], 'test-legacy-access');
  assert.equal(legacy.handoffHttpRequests[0].headers['x-dex-admin-token'], 'test-legacy-admin');
  assert.equal(legacy.handoffHttpRequests[0].headers['x-csrf-token'], undefined);
});

test('automatic handoff locks double submit, recovers the same key after reload and never stores the handoff text in localStorage', async () => {
  const persistentStorage = new Map(), response = deferred();
  const h = await createHarness({ persistentStorage, publishHandoffOutcome: () => response.promise });
  h.element('#task-reference').value = '42';
  await h.element('#task-lookup-form').dispatch('submit');
  await settle();
  h.element('#handoff-target').value = 'claude';
  await h.element('#handoff-target').dispatch('change');
  const first = h.element('#publish-handoff').dispatch('click');
  await h.element('#publish-handoff').dispatch('click');
  await waitFor(() => h.handoffRequests.length === 1, 'one publish');
  assert.equal(h.element('#publish-handoff').disabled, true);
  response.reject(new Error('Synthetic response loss'));
  await first;
  const reloaded = await createHarness({ persistentStorage });
  reloaded.element('#task-reference').value = '42';
  await reloaded.element('#task-lookup-form').dispatch('submit'); await settle();
  reloaded.element('#handoff-target').value = 'claude';
  await reloaded.element('#publish-handoff').dispatch('click');
  assert.equal(reloaded.handoffRequests[0].idempotencyKey, h.handoffRequests[0].idempotencyKey);
  assert.match(reloaded.element('#handoff-delivery').textContent, /AI 수신 확인 전/);
  assert.equal(JSON.stringify([...persistentStorage.values()]).includes('같은 작업'), false);
  assert.equal(JSON.stringify([...persistentStorage.values()]).includes('DC-HANDOFF'), false);
});

test('an old destination receipt is visibly superseded and late delivery replies cannot repopulate a closed dialog', async () => {
  const h = await createHarness({ publishHandoffOutcome: () => jsonResponse({ delivery: { status: 'stored', target: 'claude', superseded: true, currentTarget: 'gemini' } }) });
  h.element('#task-reference').value = '42';
  await h.element('#task-lookup-form').dispatch('submit'); await settle();
  h.element('#handoff-target').value = 'claude';
  await h.element('#publish-handoff').dispatch('click');
  assert.match(h.element('#handoff-delivery').textContent, /현재 대상은 Gemini로 변경/);
  const oldKey = h.handoffRequests[0].idempotencyKey;
  assert.equal(h.element('#renew-handoff').classList.contains('hidden'), false);
  await h.element('#renew-handoff').dispatch('click');
  assert.notEqual(h.handoffRequests[1].idempotencyKey, oldKey);
  const response = deferred(), late = await createHarness({ publishHandoffOutcome: () => response.promise });
  late.element('#task-reference').value = '42';
  await late.element('#task-lookup-form').dispatch('submit'); await settle();
  late.element('#handoff-target').value = 'claude';
  const submitting = late.element('#publish-handoff').dispatch('click');
  await waitFor(() => late.handoffRequests.length === 1, 'publish in progress');
  await late.element('#close-handoff').dispatch('click');
  response.resolve(jsonResponse({ delivery: { status: 'stored', target: 'claude' } }));
  await submitting;
  assert.equal(late.element('#handoff-delivery').textContent, '');
  assert.equal(late.element('#handoff-dialog').open, false);
});

test('등록 요청과 자료는 인증 재진입 뒤 복원되고 응답 유실 후 같은 key로 재시도된다', async () => {
  const persistentStorage = new Map();
  const sessionStorage = new Map();
  const harness = await createHarness({ persistentStorage, sessionStorage });
  await harness.element('#new-project-button').dispatch('click');
  harness.element('#new-project-name').value = 'New-Project';
  harness.element('#source-links').value = 'https://docs.google.com/document/d/demo/edit';
  harness.queueTaskOutcome(() => { throw new Error('Network lost'); });
  await harness.form.dispatch('submit');
  const initial = harness.taskRequests[0];
  assert.equal(initial.constraints.personalWorkspace.kind, 'project-registration');
  assert.equal(initial.constraints.personalWorkspace.registration.name, 'New-Project');
  assert.equal(initial.project.name, 'Company-Ops');
  const reloaded = await createHarness({ persistentStorage, sessionStorage });
  assert.equal(reloaded.element('#new-project-name').value, 'New-Project');
  assert.match(reloaded.element('#source-links').value, /docs.google.com/);
  await reloaded.form.dispatch('submit');
  assert.equal(reloaded.taskRequests[0].execution.idempotencyKey, initial.execution.idempotencyKey);
  assert.equal(reloaded.preview.children[0].textContent, '프로젝트 등록 요청 저장 완료');
  assert.equal(persistentStorage.has('dexPendingTaskSubmissionV1'), false);
});

test('자료 중복과 잘못된 프로젝트명은 제출하지 않고 진행 중인 key를 보존한다', async () => {
  const harness = await createHarness();
  harness.queueTaskOutcome(() => { throw new Error('Network lost'); });
  await harness.form.dispatch('submit');
  const saved = harness.persistentStorage.get('dexPendingTaskSubmissionV1');
  harness.element('#source-links').value = 'https://example.com/a\nhttps://example.com/a';
  await harness.form.dispatch('submit');
  assert.equal(harness.taskRequests.length, 1);
  assert.equal(harness.persistentStorage.get('dexPendingTaskSubmissionV1'), saved);
  harness.element('#source-links').value = '';
  await harness.element('#new-project-button').dispatch('click');
  harness.element('#new-project-name').value = 'a..b';
  await harness.form.dispatch('submit');
  assert.equal(harness.taskRequests.length, 1);
});

test('프로젝트 선택은 새로고침 뒤 유지되고 최근 작업을 프로젝트별로 구분한다', async () => {
  const harness = await createHarness({ initialProjects: [{ name: 'Company-Ops' }, { name: 'Demo' }], initialTasks: [
    { id: 'issue:1', projectName: 'Company-Ops', title: '운영 작업', url: 'https://github.com/example/wiki/issues/1' },
    { id: 'issue:2', projectName: 'Demo', title: '프로젝트 작업', url: 'https://github.com/example/wiki/issues/2' },
  ] });
  harness.element('#project-select').value = 'Demo';
  await harness.element('#project-select').dispatch('change');
  assert.equal(harness.tasks.children.length, 1);
  await harness.element('#refresh-button').dispatch('click');
  assert.equal(harness.element('#project-select').value, 'Demo');
  assert.equal(harness.element('#task-filter').value, 'Demo');
  assert.equal(harness.tasks.children[0].querySelector('strong').textContent, '프로젝트 작업');
});

test('닫은 인계문에 늦은 응답을 표시하지 않는다', async () => {
  const pending = deferred();
  const harness = await createHarness({ handoffOutcome: () => pending.promise });
  harness.element('#task-reference').value = '42';
  await harness.element('#task-lookup-form').dispatch('submit');
  await harness.element('#close-handoff').dispatch('click');
  pending.resolve(jsonResponse({ handoff: { text: 'Old task', filename: 'dex-handoff-42.md' } }));
  await settle();
  assert.equal(harness.element('#handoff-text').value, '');
  assert.equal(harness.element('#copy-handoff').disabled, true);
});

test("진행·결과함은 GitHub closed 대신 canonical completed와 동일 receipt를 표시한다", async () => {
  const task = {
    id: "issue:42",
    title: "Canonical retrieval",
    state: "closed",
    updatedAt: "2026-09-01T00:06:00.000Z",
    url: "https://github.com/dex-test/runtime/issues/42",
  };
  const status = {
    taskId: "DC-20260901-ABC123",
    issueNumber: 42,
    state: "completed",
    statusVersion: 6,
    updatedAt: "2026-09-01T00:06:00.000Z",
    resultAvailable: true,
  };
  const result = {
    taskId: status.taskId,
    issueNumber: 42,
    state: "completed",
    statusVersion: 6,
    createdAt: "2026-09-01T00:05:00.000Z",
    resultHash: "a".repeat(64),
    result: { verdict: "PASS", evidence: ["ci:123"] },
  };
  const harness = await createHarness({
    initialTasks: [task],
    canonicalStatus: status,
    canonicalResult: result,
  });
  await waitFor(() => harness.statusRequests.length === 1, "canonical status를 조회해야 합니다.");

  const card = harness.tasks.children[0];
  assert.match(card.querySelector("p").textContent, /완료 \(completed\) · v6/);
  assert.equal(card.querySelector("p").textContent.includes("closed"), false);
  const resultButton = card.querySelector(".result-button");
  assert.equal(resultButton.classList.contains("hidden"), false);

  await resultButton.dispatch("click");
  assert.equal(harness.resultRequests.length, 1);
  assert.equal(harness.resultDialog.open, true);
  assert.deepEqual(JSON.parse(harness.resultContent.textContent), result);
});

test("Task 제출 중 버튼을 잠그고 중복 submit을 한 번의 요청으로 합친다", async () => {
  const harness = await createHarness();
  const pending = deferred();
  harness.queueTaskOutcome(() => pending.promise);

  const firstSubmit = harness.form.dispatch("submit");
  await settle();

  assert.equal(harness.createButton.disabled, true);
  assert.equal(harness.createButton.textContent, "Task 생성 중…");
  assert.equal(harness.createButton.getAttribute("aria-busy"), "true");

  await harness.form.dispatch("submit");
  await waitFor(() => harness.taskRequests.length === 1, "첫 Task 요청이 전송되어야 합니다.");
  assert.equal(harness.taskRequests.length, 1);

  pending.resolve(jsonResponse({ number: 1, url: "https://github.com/example/issues/1" }, 201));
  await firstSubmit;
  assert.equal(harness.createButton.disabled, false);
  assert.equal(harness.createButton.textContent, "Task 생성");
  assert.equal(harness.createButton.getAttribute("aria-busy"), "false");

  await harness.form.dispatch("submit");
  assert.equal(harness.taskRequests.length, 2);
  assert.notEqual(
    harness.taskRequests[0].execution.idempotencyKey,
    harness.taskRequests[1].execution.idempotencyKey,
    "확정 성공한 요청의 key는 다음 제출에서 재사용하면 안 됩니다.",
  );
});

test("네트워크 오류와 409 뒤 동일 입력 재시도는 동일 idempotency key를 유지한다", async () => {
  const harness = await createHarness();
  harness.queueTaskOutcome(() => Promise.reject(new TypeError("network unavailable")));

  await harness.form.dispatch("submit");
  assert.equal(harness.taskRequests.length, 1, "네트워크 오류 뒤 자동 재전송하면 안 됩니다.");
  const originalKey = harness.taskRequests[0].execution.idempotencyKey;

  harness.queueTaskOutcome(() => jsonResponse({ error: "idempotency_in_progress" }, 409));
  await harness.form.dispatch("submit");
  assert.equal(harness.taskRequests.length, 2, "409 뒤 자동 재전송하면 안 됩니다.");
  assert.equal(harness.taskRequests[1].execution.idempotencyKey, originalKey);

  await harness.form.dispatch("submit");
  assert.equal(harness.taskRequests.length, 3);
  assert.equal(harness.taskRequests[2].execution.idempotencyKey, originalKey);
});

test("미확정 요청 뒤 입력이 바뀌면 다음 제출에 새 idempotency key를 사용한다", async () => {
  const harness = await createHarness();
  harness.queueTaskOutcome(() => Promise.reject(new TypeError("network unavailable")));

  await harness.form.dispatch("submit");
  const originalKey = harness.taskRequests[0].execution.idempotencyKey;

  harness.objective.value = "변경된 모바일 화면설계서를 검수해";
  await harness.form.dispatch("input", { target: harness.objective });
  await harness.form.dispatch("submit");

  assert.equal(harness.taskRequests.length, 2);
  assert.notEqual(harness.taskRequests[1].execution.idempotencyKey, originalKey);
});

test("네트워크 오류 뒤 새로고침해도 동일 입력은 저장된 idempotency key를 재사용한다", async () => {
  const persistentStorage = new Map();
  const firstHarness = await createHarness({ persistentStorage });
  firstHarness.queueTaskOutcome(() => Promise.reject(new TypeError("network unavailable")));

  await firstHarness.form.dispatch("submit");
  const originalKey = firstHarness.taskRequests[0].execution.idempotencyKey;
  const stored = JSON.parse(persistentStorage.get("dexPendingTaskSubmissionV1"));
  assert.match(stored.fingerprintHash, /^[a-f0-9]{64}$/);
  assert.equal(stored.idempotencyKey, originalKey);
  assert.equal(JSON.stringify(stored).includes("모바일 화면설계서"), false, "원문은 브라우저 저장소에 남기면 안 됩니다.");

  const reloadedHarness = await createHarness({ persistentStorage });
  await reloadedHarness.form.dispatch("submit");

  assert.equal(reloadedHarness.taskRequests[0].execution.idempotencyKey, originalKey);
});

test("미확정 요청 뒤 입력을 바꿨다가 원래대로 되돌리면 기존 key를 유지한다", async () => {
  const harness = await createHarness();
  const originalObjective = harness.objective.value;
  harness.queueTaskOutcome(() => Promise.reject(new TypeError("network unavailable")));

  await harness.form.dispatch("submit");
  const originalKey = harness.taskRequests[0].execution.idempotencyKey;

  harness.objective.value = "잠깐 바꾼 목표";
  await harness.form.dispatch("input", { target: harness.objective });
  harness.objective.value = originalObjective;
  await harness.form.dispatch("input", { target: harness.objective });
  await harness.form.dispatch("submit");

  assert.equal(harness.taskRequests[1].execution.idempotencyKey, originalKey);
});

test("Task 생성 성공 뒤 목록 새로고침 실패를 생성 실패로 표시하지 않는다", async () => {
  const harness = await createHarness();
  harness.queueTaskListOutcome(() => jsonResponse({ error: "refresh unavailable" }, 503));

  await harness.form.dispatch("submit");

  assert.equal(harness.taskRequests.length, 1);
  assert.equal(harness.persistentStorage.has("dexPendingTaskSubmissionV1"), false);
  assert.equal(harness.preview.children[0].textContent, "Task 생성 완료 · 목록 새로고침 실패");
  assert.equal(
    harness.preview.children.some(child => child.textContent === "GitHub Issue는 생성되었습니다. 새로고침 버튼으로 목록을 다시 불러와 주세요."),
    true,
  );
});

test("응답 유실 뒤 잘못된 입력 제출은 원래 입력의 idempotency key를 보존한다", async () => {
  const harness = await createHarness();
  const originalObjective = harness.objective.value;
  harness.queueTaskOutcome(() => Promise.reject(new TypeError("network unavailable")));

  await harness.form.dispatch("submit");
  const originalKey = harness.taskRequests[0].execution.idempotencyKey;
  const originalStoredRecord = harness.persistentStorage.get("dexPendingTaskSubmissionV1");

  harness.objective.value = "";
  await harness.form.dispatch("submit");
  assert.equal(harness.taskRequests.length, 1, "빈 목표는 API 요청을 만들면 안 됩니다.");
  assert.equal(harness.persistentStorage.get("dexPendingTaskSubmissionV1"), originalStoredRecord);

  harness.objective.value = "가".repeat(4001);
  await harness.form.dispatch("submit");
  assert.equal(harness.taskRequests.length, 1, "4,000자를 넘는 목표는 API 요청을 만들면 안 됩니다.");
  assert.equal(harness.persistentStorage.get("dexPendingTaskSubmissionV1"), originalStoredRecord);

  harness.objective.value = originalObjective;
  await harness.form.dispatch("submit");

  assert.equal(harness.taskRequests.length, 2);
  assert.equal(harness.taskRequests[1].execution.idempotencyKey, originalKey);
});

test("OAuth re-entry restores the same user's input and retry identity without automatic submission", async () => {
  const first = await createHarness();
  first.objective.value = "마케팅 캠페인 문구와 검증 기준을 준비해";
  first.criteria.value = "예산 집행 없이 초안만 작성";
  first.queueTaskOutcome(() => jsonResponse({ error: "session expired" }, 401));
  await first.form.dispatch("submit");
  assert.equal(first.navigations.length, 1);
  assert.equal(first.sessionStorage.has("dexTaskDraftV1"), true);
  assert.equal([...first.persistentStorage.values()].some(value => value.includes(first.objective.value)), false);
  const resumed = await createHarness({ persistentStorage: first.persistentStorage, sessionStorage: first.sessionStorage });
  assert.equal(resumed.objective.value, first.objective.value);
  assert.equal(resumed.criteria.value, first.criteria.value);
  assert.equal(resumed.taskRequests.length, 0);
  await resumed.form.dispatch("submit");
  assert.equal(resumed.taskRequests[0].execution.idempotencyKey, first.taskRequests[0].execution.idempotencyKey);
  assert.equal(resumed.sessionStorage.has("dexTaskDraftV1"), false);
});

test("drafts are not restored to another account, after expiry, or after logout", async () => {
  for (const condition of ["other-account", "expired", "logout", "unauthenticated"]) {
    const first = await createHarness();
    first.objective.value = "사업 리서치 비공개 초안";
    await first.form.dispatch("input");
    assert.equal(first.sessionStorage.has("dexTaskDraftV1"), true);
    if (condition === "expired") {
      const draft = JSON.parse(first.sessionStorage.get("dexTaskDraftV1"));
      draft.savedAt = Date.now() - 31 * 60 * 1000;
      first.sessionStorage.set("dexTaskDraftV1", JSON.stringify(draft));
    }
    if (condition === "logout") await first.logout.dispatch("click");
    const resumed = await createHarness({
      sessionStorage: first.sessionStorage,
      login: condition === "other-account" ? "different-owner" : "dexcompanyllm",
      authenticated: condition !== "unauthenticated",
    });
    assert.notEqual(resumed.objective.value, first.objective.value, condition);
    assert.equal(resumed.taskRequests.length, 0, condition);
    if (condition !== "unauthenticated") assert.equal(resumed.sessionStorage.has("dexTaskDraftV1"), false, condition);
  }
});
