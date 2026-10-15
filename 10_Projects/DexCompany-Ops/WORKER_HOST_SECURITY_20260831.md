# Dex subscription worker host-security evidence — 2026-08-31 / 2026-09-01

## Scope

Runtime Issue #17의 승인 Windows host 기능 Gate 이후 host-security 경계를 검증·강화하고, 2026-09-01 dedicated worker 실기기 E2E까지 완료한 기록입니다. GitHub `main`과 실제 승인 host evidence를 구분하며 로컬 경로·개인 interactive 계정명은 canonical identity로 취급하지 않습니다.

## Initial approved-host audit

에던이 승인 Windows PC에서 read-only audit를 실행했습니다.

### Confirmed

- interactive Windows account: non-admin
- global Git credential helper: 0
- system Git credential helper: 1
- GitHub CLI installed: true
- interactive account GitHub CLI authenticated: true
- SSH private key files: 0
- forbidden worker credential/proxy/Git environment variables: 0
- multiple Dex worktrees exist; dirty user worktrees were not modified

### Verdict

개인 interactive Windows account는 usable GitHub 인증을 보유하므로 broker-only subscription worker identity로 사용하지 않습니다. System-level Git Credential Manager가 설치되어 있다는 사실 자체는 실패가 아니며, dedicated worker profile에 실제 usable GitHub credential이 없어야 합니다.

## Runtime hardening

### PR #42 — host safety gates

Merge: `a35564fbaf01e68bad2f6d21fad639225cc8e4f9`

Implemented:

- `DEX_WORKER_ACCOUNT` dedicated OS-account preflight
- GitHub CLI auth, global Git helper, SSH private key, Windows Credential Manager GitHub target, credential env preflight
- Task-supplied `project.localPath` rejection
- host-local project name → canonical realpath registry
- worker result secret scan before stdout
- `npm run worker:host-check`

Validation:

- PR run `33360920956`: PASS
- tests: 193 total / 192 PASS / 0 FAIL / 1 Windows-only SKIP
- static/config/secret checks: PASS
- smoke / Vercel adapter smoke / rollback: PASS
- production dependency audit: 0 vulnerabilities
- post-merge main run `33361000729`: PASS
- Vercel status: success

The first PR run failed because the new test fixture contained a literal fake credential pattern and the repository secret scanner correctly rejected it. The scanner was not weakened; the fixture was changed to assemble the fake credential only at runtime.

### PR #43 — broker pin and isolated Codex auth home

Merge: `90dc453061b9b44cdb29acd355aa31a4e7acb0ba`

Implemented:

- `DEX_PROJECT_REGISTRY_SHA256` required
- registry bytes must match broker-approved SHA-256 before project realpath resolution
- `CODEX_HOME` must resolve inside the dedicated worker OS profile
- personal interactive Codex auth storage cannot be reused by the worker
- host-check reports account, isolated Codex home, credential boundary, registry realpaths and pinned digest

Validation:

- PR run `33361219062`: PASS
- tests: 194 total / 193 PASS / 0 FAIL / 1 Windows-only SKIP
- static/config/secret checks: PASS
- smoke / Vercel adapter smoke / rollback: PASS
- production dependency audit: 0 vulnerabilities
- post-merge main run `33361420964`: PASS
- Vercel status: success

### PR #59 — stable App Server sandbox enum correction

Merge: `d15ee0a0742ceb537bb4b3ea37d3bc1e401e3b63`

Physical-host E2E found that the stable App Server rejects `workspaceWrite` and requires `workspace-write`.

Validation:

- PR run `33472254938`: PASS
- tests: 195 total / 194 PASS / 0 FAIL / 1 Windows-only SKIP
- static/secret checks, smoke, Vercel adapter smoke, rollback: PASS
- production dependency audit: 0 vulnerabilities
- post-merge validation: PASS
- Vercel status: success

### PR #60 — read-only Task → read-only App Server sandbox

Merge: `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`

Implemented:

- `constraints.readOnly: true` maps to actual App Server `sandbox: read-only`
- normal repository-edit work stays on bounded `workspace-write`
- `danger-full-access` and invalid sandbox modes fail closed
- regression coverage verifies runner forwarding and adapter allowlist

Validation:

- PR run `33472784827`: PASS
- tests: 198 total / 197 PASS / 0 FAIL / 1 Windows-only SKIP
- static/secret checks, smoke, Vercel adapter smoke, rollback: PASS
- production dependency audit: 0 vulnerabilities
- post-merge run `33472864786`: PASS
- Vercel status: success

## Dedicated worker final host E2E — 2026-09-01

### Confirmed PASS

- dedicated worker account exists and is non-admin
- dedicated profile-local `CODEX_HOME`: PASS
- worker-local Codex `0.151.0`: PASS
- worker-local ChatGPT-managed subscription sign-in: PASS
- `OPENAI_API_KEY` absent: PASS
- GitHub CLI authenticated on worker: false
- user Git credential helper count: 0
- SSH private key file count: 0
- Windows Credential Manager GitHub target count: 0
- forbidden credential environment variable count: 0
- broker-provisioned Runtime/Wiki clean workspaces: PASS
- broker project registry + machine-level SHA-256 pin match: PASS
- `worker:host-check` under dedicated identity: `ready: true`
- minimal provider revalidation under changed identity/auth home: Doctor PASS, compatibility PASS, ChatGPT subscription/model status PASS
- actual read-only worker result: `DEX_WORKER_E2E_PASS`
- actual App Server sandbox: `read-only`
- approval mode: `deny`
- worker event count: 52
- worker output secret-scan path: PASS
- Runtime repository mutation after E2E: 0
- Wiki repository mutation after E2E: 0
- Runtime/Wiki workspaces remained clean: PASS

### Final technical verdict

`PASS` — dedicated worker identity, credential isolation, broker realpath/digest boundary, profile-local Codex auth, host-check, provider readiness, read-only sandbox, secret-scanned result and zero repository mutation were all proven on the approved Windows host.

## Safety boundaries preserved

- paid API: disabled
- automatic paid fallback: disabled
- automatic extra usage: disabled
- hosted MCP writes: disabled
- optional Codex capabilities: unchanged / disabled
- legacy Skill/Plugin deletion: not performed
- user dirty worktrees: preserved
- Git publication remains broker-owned
- no `danger-full-access`

## Issue #17 status

- Codex 0.151 functional readiness: `PASS_WITH_WARNINGS` — Doctor warnings preserved, failed check 0
- dedicated worker OS account: `PASS`
- broker-only dedicated-account credential boundary: `PASS`
- approved project→realpath registry + SHA-256 pin: `PASS`
- profile-local `CODEX_HOME` and separate ChatGPT subscription auth: `PASS`
- real worker output secret scan E2E: `PASS`
- actual read-only worker sandbox: `PASS`
- final E2E repository mutation: `0` / `PASS`
- literal zero-change acceptance: `FAIL (controlled historical changes)` pending explicit owner rebaseline/waiver

The original 0.151 dedicated-host technical/safety Gate is complete. Issue #17 remains open only because the historical literal zero-change criterion must not be silently reinterpreted. Recommended owner-approved rebaseline wording:

> Validation execution itself must produce zero unreviewed/unapproved mutation outside its disposable or broker-approved workspace. Separately approved prerequisite installation, reviewed PR/merge, broker publication and automatic deployment are allowed when recorded and verified.

Codex 0.152.0 is a separate next stable-validation candidate. Its publication does not retroactively invalidate this completed 0.151 host Gate and must not auto-upgrade or auto-promote the approved host.

## Operational decision

The dedicated worker must not inherit or copy the personal interactive account's GitHub CLI authentication, Git Credential Manager credentials, SSH private keys, Codex auth file, or provider API credentials. Git publication remains a broker responsibility; the model-controlled subscription worker operates only in broker-approved local workspaces and returns secret-scanned results.