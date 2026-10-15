---
type: llm-wiki-guide
status: active
layer: wiki
explored: false
title: "Dex Company Task Checklists from Growth Scans"
created: 2026-07-04
updated: 2026-07-19
dateCreated: 2026-07-04
dateModified: 2026-07-19
confidence: high
claimType: prescriptive
evidenceScope: growth-scan-synthesis
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/wiki
  - dex-company
  - checklist
  - growth-scan
---

# Dex Company Task Checklists from Growth Scans

## 목적

이 문서는 47개 Dex Company Growth Scan 보고서를 에던님 작업별 체크리스트로 압축한 실행용 guide다. 새 작업을 시작할 때 관련 섹션을 먼저 확인하면, 이미 축적된 source-backed 운영 지식을 빠르게 사용할 수 있다.

## 공통 시작 체크리스트

- [ ] 현재 폴더와 실제 target project를 확인한다.
- [ ] `AGENTS.md`, `README`, `PROJECT_CONFIG.md`, 관련 운영 문서를 먼저 읽는다.
- [ ] 기존 사용자 변경사항을 되돌리지 않는다.
- [ ] 답변과 보고서에서 `source-backed`, `Dex inference`, `not checked`를 분리한다.
- [ ] secret, API key, token, password를 파일이나 노트에 저장하지 않는다.
- [ ] 변경 후 가능한 범위에서 status, lint, test, UTF-8 검사를 실행한다.

## Codex / OpenAI API 작업

- [ ] 공식 OpenAI/Codex 문서와 changelog를 먼저 확인한다.
- [ ] 문서에 있는 기능을 local runtime/account availability로 바로 단정하지 않는다.
- [ ] model, tool, container, billing, token, remote workspace는 최신성과 비용/권한을 분리한다.
- [ ] Codex remote plugins, plugin catalog source, npm marketplace source, remote/local version, system proxy, PAC/WPAD, remote-control pairing, MCP tool search, session-auth scope를 분리해서 확인한다.
- [ ] Codex CLI approval/auth/sandbox 동작을 확인할 때 CLI version, approval mode(`read-only`/`writes`/write/bypass/not checked), MCP interactive auth prompt, usage-limit reset credit type/expiration/redemption, Windows sandbox writable-root/delete behavior, device-code login provenance를 분리한다.
- [ ] Codex 모바일/ChatGPT 모바일에서 작업을 승인하거나 이어갈 때 mobile app/version, account/workspace, host online/awake state, task source, branch/diff filter, `Needs input` 상태, SSH host credential type, usage-limit/credit visibility, desktop-side final verification을 분리한다.
- [ ] SDK나 app-server는 target project, runtime, credential boundary, rollback이 확인될 때만 검토한다.
- [ ] prompt나 automation 변경은 Metrics, Adoption Check, Next Eval로 효과를 추적한다.

완료 기준:
- 공식 출처 확인 여부, local 확인 여부, 비용/권한 영향, rollback, 검증 방법이 모두 분리되어 있다.

## AI Agents / MCP / Connectors 작업

- [ ] `approval-ready-pass`, `approval-ready-conditional`, `approval-not-ready`, `install-audit-blocked`, `knowledge-only` 중 하나로 분류한다.
- [ ] target project/account/workspace가 없으면 승인 요청으로 올리지 않는다.
- [ ] Claude Code, Cursor, Windsurf, Devin, Aider, Cline, Roo Code 등 비-Codex AI coding tool 자료는 도구 도입이 아니라 `Codex portability`로 먼저 평가한다: Codex 파일 작업, PowerShell, Git, Obsidian 기록, 브라우저 QA, approval packet으로 옮길 수 있는 운영 원칙만 흡수한다.
- [ ] cross-AI tool 신호는 source quality, workflow portability, permission boundary(command/file/network/MCP/memory/browser/secret), no-install-first 적용 가능성, rollback/removal path, Dex Company 작업 품질 영향이 확인될 때만 source note 또는 체크리스트 필드로 승격한다.
- [ ] OWASP LLM risk: supply chain, insecure plugin design, excessive agency, sensitive information disclosure, prompt injection, insecure output handling, overreliance를 확인한다.
- [ ] MCP/App UI는 CSP, CORS, auth, dedicated origin, permission, data access, network origin을 확인한다.
- [ ] remote plugin or marketplace catalog가 있으면 publisher identity, version pin/hash, source admission, remote/local version, proxy route, pairing flow, session-auth scope를 확인한다.
- [ ] Agent/resource discovery 또는 MCP registry를 쓰는 경우 registry URL/source, public/private catalog, publisher identity, manifest/schema validation, allowlist policy, managed setting owner, supported surface/version, discovered resource type, ranking rationale, install/connect step, rollback, audit evidence를 분리한다.
- [ ] IDE agent provider를 쓰는 경우 IDE/plugin version, agent provider, Codex CLI path, admin/editor-preview policy, approval mode(Default/Bypass/Autopilot), hooks, MCP server source, workspace `.github/mcp.json`, OAuth secret storage, debug logs, Workspace Trust, remote browsing proxy, extension auto-update delay, session/subagent cost visibility를 분리해 확인한다.
- [ ] IDE/CLI agent observability를 켜는 경우 OTel enabled state, collector endpoint/protocol, managed policy owner, policy/environment/user setting precedence, content capture, prompt/response/tool-argument capture, auth header storage, local DB/file export path, agent type filtering, retention/redaction, rollback을 분리한다.
- [ ] CLI agent plugin/MCP surface를 여는 경우 CLI version, plugin dashboard/reload behavior, repo-scoped plugin MCP disconnect, MCP list/status, mid-turn enable/disable behavior, add/edit/delete/re-auth pause rule, sandbox network policy, fetch one-time bypass, auto allow-all/yolo, reset permission path, saved approval file scope, billing owner, audit evidence를 분리한다.
- [ ] IDE/CLI agent managed settings가 있으면 delivery channel(native MDM/server-managed/file-based), precedence, Windows registry 또는 OS policy path, `managed-settings.json` ownership/symlink rule, permission bypass disable, enabled plugins, marketplace allowlist, telemetry block owner, rollback owner를 분리한다.
- [ ] 원격 agent session 또는 mobile notification을 쓰는 경우 local machine online/awake 상태, interactive session 여부, Store local sessions policy, mobile app version, OS notification permission, live update opt-out, remote permission approval, session event sync, session log visibility, session data query scope, steering credit cost, stop/cancel, rollback path를 분리한다.
- [ ] desktop agent app을 검토하는 경우 plan/account, app installer source/version, OS/platform, organization policy, repository/local-folder scope, session isolation, agency mode(interactive/plan/autonomous), model provider, BYOK credential storage/removal, billing owner, validation evidence, rollback path를 분리한다.
- [ ] AI-generated repository overview or README summary is orientation only: verify `README`, `AGENTS.md`, contribution docs, package manifests, lockfiles, scripts, permissions, recent changes, tests, and rollback path before using the summary for implementation, install, security, or architecture decisions.
- [ ] PR/code-review agent output is not trusted until head-branch instruction and runtime setup changes are reviewed: check changed `AGENTS.md`, `REVIEW.md`, `*.instructions.md`, agent skills, review setup YAML, dependency install scope, runner type, firewall/network policy, self-hosted runner exceptions, secret access, billing owner, and rollback.
- [ ] GitHub/Figma/Google/Slack 같은 계정 인접 connector는 account/workspace 권한과 billing context를 먼저 확인한다.
- [ ] full example repo 전역 설치보다 project-local SDK/package가 가능한지 먼저 본다.

완료 기준:
- 에던님에게 승인 요청을 올리기 전 approval-ready packet이 완성되어 있다.

## Frontend / Design Systems / UI QA 작업

- [ ] 실제 target UI, repo, framework, version, design system을 확인한다.
- [ ] 디자인 시스템 자료는 토큰, 컴포넌트, 접근성, 운영 패턴으로 나누어 본다.
- [ ] WCAG/W3C 기준을 QA anchor로 연결한다. 특히 이미지/차트/복잡한 시각 자료는 long description 또는 equivalent text 경로를 확인한다.
- [ ] Storybook/Vitest/Next.js 관련 도구는 실제 repo의 version, dependency delta, lockfile delta, CI runtime, browser QA, rollback이 있을 때만 조건부 승인한다.
- [ ] Storybook을 빌드해 웹에 게시하는 프로젝트는 `.env` 또는 `.env.local` 같은 파일이 build directory에 있었는지, Storybook version이 patched threshold(`7.6.21+`, `8.6.15+`, `9.1.17+`, `10.1.10+`)를 만족하는지, 공개 artifact에 secret이 섞였을 가능성이 있는지, key rotation/rebuild/unpublish가 필요한지 확인한다.
- [ ] UI 결과물은 반응형, 상태 변화, 오류, 빈 상태, 로딩, 접근성, 텍스트 겹침을 확인한다.

완료 기준:
- target repo 기반 검증, 접근성 기준, browser QA, rollback 또는 수정 계획이 있다.

## UX Research / Product 판단

- [ ] insight와 outcome을 구분한다. 좋은 인사이트가 곧 제품 성과는 아니다.
- [ ] AI 설명/가이드/리서치 결과는 역할별 사용 맥락을 나눈다.
- [ ] 연구 결과에는 표본, 한계, bias, 적용 범위를 적는다.
- [ ] 디자인 critique는 취향이 아니라 사용성, 업무 성과, 오류 감소, 의사결정 품질로 연결한다.
- [ ] 사용자에게 보여줄 결론은 쉬운 예시와 바로 쓸 행동으로 바꾼다.

완료 기준:
- 결론마다 evidence, inference, not checked가 분리되어 있고 실제 다음 행동이 있다.

## Obsidian / LLM Wiki 작업

- [ ] active project 상태는 `10_Projects/<ProjectName>/`에 둔다.
- [ ] 여러 프로젝트에서 재사용 가능한 출처 기반 지식만 LLM Wiki로 승격한다.
- [ ] 후보는 `00_Inbox/LLM_Wiki/`, 원본 보존은 `sources/`, 합성 지식은 `wiki/`, 질의는 `queries/`, 출력물은 `70_Outputs/LLM_Wiki/`에 둔다.
- [ ] source note에는 v5 metadata와 `Original Content`를 둔다.
- [ ] 새 wiki note는 자동으로 `explored: true`로 바꾸지 않는다.
- [ ] 저장 전 기존 source/wiki/report/inbox와 중복을 확인한다.
- [ ] 변경 후 `llm-wiki-status.ps1`, `llm-wiki-lint.ps1`, UTF-8 검사를 실행한다.
- [ ] Bases, frontmatter, properties를 대량 수정하는 Obsidian community plugin은 생산성 도구가 아니라 vault mutation tool로 분류한다.
- [ ] community plugin을 쓰기 전 `Restricted mode` 변경 필요 여부, plugin id/version, source repo, community directory, license, package scripts, lockfile/dependencies, network/telemetry claim, Obsidian min/current version, backup, test-vault trial, preview evidence, undo/history path, rollback path를 분리한다.

완료 기준:
- 구조, metadata, 중복 확인, lint/status 결과가 남아 있다.

## Automation / Ops 작업

- [ ] 30분 실행에서는 새 자료 저장보다 중복 방지와 no-op discipline을 우선한다.
- [ ] 매회 Metrics, Improvement Delta, Adoption Check, Next Eval, Prompt or Template Patch Candidate, QA Scorecard를 남긴다.
- [ ] queue count는 report 문장이 아니라 queue 파일에서 직접 센다.
- [ ] deferred/carried item은 다음 실행에서 done, carried, dropped, blocked 중 하나로 재판정한다.
- [ ] 같은 공식 changelog라도 `operational_scope.diff`가 없으면 no-new-signal로 둔다.

완료 기준:
- 다음 실행이 무엇을 확인해야 하는지 작고 검증 가능한 eval로 남아 있다.

## Career Ops 작업

- [ ] 확인된 경력, 프로젝트 환경, 추론, 미확인을 분리한다.
- [ ] 플랫폼별 양식은 실제 form 근거를 확인하고 `[platform form analysis basis]`를 둔다.
- [ ] 지원 자동화 후보는 먼저 `native-human-review-assistant`, `third-party-auto-submit`, `autofill-only`, `resume-tailoring`, `tracking-only`로 분류한다.
- [ ] LinkedIn/Indeed 같은 플랫폼에서는 공식 기능, 사람 검토, 사람이 승인하는 제출, 지원 job scope, 계정/구독 조건을 확인하기 전까지 자동 제출을 허용하지 않는다.
- [ ] Indeed Career Scout 같은 platform-native AI career coach는 `resume-tailoring`, `tracking-only`, `mock-interview-assistant`로 먼저 분리하고, 자동 제출 근거가 없으면 `auto-submit`으로 부르지 않는다.
- [ ] 플랫폼 AI 코치가 프로필, 활동 기록, 채팅 맥락, 저장/지원한 공고를 쓰는지 확인하고, 생성 이력서를 저장할 때 기존 플랫폼 이력서가 대체되는지 표시한다.
- [ ] 과장된 수치, AI스러운 칭찬, 확인되지 않은 기술 숙련도를 쓰지 않는다.
- [ ] Java/JSP/Spring/Oracle/Xcode/Android/Eclipse 같은 항목은 확인 전까지 project environment로 다룬다.
- [ ] 제출 문서는 한국어 존댓말과 면접에서 방어 가능한 표현을 사용한다.

완료 기준:
- 제출 가능한 문서와 확인 필요 항목이 분리되어 있다.

## 설치 / 승인 체크리스트

- [ ] exact target project path 또는 account/workspace가 있다.
- [ ] package/tool/connector 이름과 version이 있다.
- [ ] 공식 source URL과 cross-check가 있다.
- [ ] license, dependency, install script, postinstall/prepare/prepack을 확인했다.
- [ ] npm package 후보는 npm major version, pending install scripts, `allowScripts`, git dependency allowance, remote URL dependency allowance, native build approval, CI strict policy를 확인했다.
- [ ] Obsidian community plugin 후보는 Restricted mode 영향, vault-wide file mutation scope, preview-before-apply, history/undo limitations, backup/restore rehearsal, mobile/desktop compatibility를 확인했다.
- [ ] permission, secret, token, billing, network, data-access 범위를 확인했다.
- [ ] publish workflow가 있으면 long-lived publish token, 2FA-bypass token, trusted publishing, staged publish, human 2FA approval gate를 분리했다.
- [ ] OWASP LLM risk를 분류했다.
- [ ] rollback 또는 제거 방법이 있다.
- [ ] validation command 또는 manual QA가 있다.
- [ ] 설치하지 않는 더 안전한 대안이 있다.
- [ ] 최종 추천이 한 문장으로 정리되어 있다.

완료 기준:
- `approval-ready-pass`여도 자동 설치하지 않고, 에던님 명시 승인 후 실행한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: 이 체크리스트는 47개 growth report, 10x candidate queue, approval-ready install audit model, LLM Wiki 운영 guide에서 반복 확인된 운영 패턴을 압축했다.
- Dex inference: 작업별 체크리스트로 나누면 source note 전체를 매번 읽는 비용을 줄이고 다음 작업의 판단 품질을 높일 수 있다.
- not checked: 각 실제 프로젝트의 package version, local app version, account permission, billing, runtime, connector availability는 작업 시점에 다시 확인해야 한다.
- source-backed addition: Indeed Career Scout official pages provide a platform-native AI career coach example for resume tailoring, job tracking, mock interview feedback, and profile/activity/chat data use. This is a human-review assistant signal, not proof of safe auto-submit.
- source-backed addition: OpenAI Help Center pages provide Codex-specific access fields for Business Codex seat availability, seat-type access behavior, Plus/Pro rate-limit reset banking, Developer mode, Enterprise/Edu plugin sharing, and Codex analytics. These are plan/workspace signals, not proof of current local availability.
- source-backed addition: Obsidian official plugin security docs and the Bases Toolbox public repo/forum pages provide an approval-gated pattern for community plugins that mutate Bases/frontmatter properties. Treat these as vault mutation tools until backup, test-vault, source/dependency, network, and rollback evidence are checked.
- source-backed addition: GitHub Copilot IDE agent changelog pages provide approval-gated fields for Codex as a JetBrains agent provider, Codex CLI path, editor preview policy, approval/autopilot modes, hooks, workspace MCP config, MCP OAuth secret storage, remote browser proxy, Workspace Trust, extension auto-update delay, and session/subagent cost visibility. These are IDE governance signals, not proof of local availability.
- source-backed addition: VS Code Copilot OpenTelemetry docs provide approval-gated fields for agent traces/metrics/events, collector endpoint, managed telemetry policy, content capture, prompt/response/tool argument privacy, auth headers, local DB/file export, agent type filtering, and retention/redaction. These are observability governance signals, not proof that telemetry should be enabled by default.
- source-backed addition: GitHub Copilot CLI 1.0.69 changelog and docs provide approval-gated fields for plugin dashboard/reload behavior, repo-scoped plugin MCP disconnect, MCP list/status, mid-turn enable/disable behavior, sandbox fetch policy, one-time fetch bypass approval, auto allow-all/yolo risk, permission reset, and saved approval scope. These are CLI governance signals, not proof of local availability or install safety.
- source-backed addition: GitHub Copilot MDM managed settings changelog provides approval-gated fields for native MDM, server-managed, and file-based delivery channels, precedence, Windows/macOS policy paths, file ownership/symlink rules, permission bypass disable, model, plugins, marketplace, and telemetry settings. These are governance signals, not proof that Ethan's device or organization is managed this way.
- source-backed addition: GitHub Mobile and Copilot CLI remote-control docs provide approval-gated fields for remote session live notifications, mobile status states, session logs, Store local sessions policy, session event sync to GitHub, remote permission approval, session query scope, stop/cancel, and opt-out controls. These are mobile/remote governance signals, not proof of Ethan's local availability or account policy.
- source-backed addition: Claude Code, Cursor, Windsurf, and Codex official docs provide cross-AI portability fields for hooks/settings, rules, MCP, memories, agent security, context exposure, permission boundary, no-install-first absorption, and rollback/removal checks. These are knowledge-only governance signals, not proof that non-Codex tools should be installed or added to the default workflow.
- source-backed addition: OpenAI Codex changelog/mobile/help/pricing pages provide mobile Codex task-management and cost-visibility fields for task creation/search/open/fork/manage, branch/diff filters, transcript-to-composer context, SSH host credential type, `Needs input` state, usage limits, and credit details. These are remote-control and cost-governance signals, not proof of Ethan's current app version, plan, balance, or host connection state.
- source-backed addition: GitHub Agent Finder, GitHub MCP management docs, GitHub catalog repo, and ARD announcements provide discovery-governance fields for registry URL/source, public/private catalog, manifest/schema validation, publisher identity, allowlist policy, managed setting owner, supported surface/version, ranked discovery result, and no-auto-install separation. These are discovery governance signals, not approval to install or connect discovered resources.
- source-backed addition: GitHub Copilot app changelog and docs provide desktop agent app governance fields for plan/account, app install source/version, OS/platform, organization policy, repo/local-folder scope, isolated sessions, agency mode, model provider, BYOK credential storage, billing owner, validation evidence, and rollback. These are approval-not-ready signals, not proof that Ethan's account or local runtime should use the app.
- source-backed addition: GitHub Copilot repository overview changelog provides a repository-onboarding verification gate. AI-generated repository summaries should remain orientation only until checked against real repository files, package/script surfaces, permissions, tests, recent changes, and rollback evidence.
- source-backed addition: OpenAI Codex changelog provides a desktop-app migration gate for Codex joining the ChatGPT desktop app. Treat this as a local runtime/update verification checklist, not proof that Ethan's installed Windows app, shortcuts, projects, settings, workflows, or plugin settings have already migrated.
- source-backed addition: OpenAI Codex CLI 0.144.0 changelog provides approval/auth/sandbox governance fields for `writes` approval mode, MCP interactive auth, usage-limit reset credit type/expiration/redemption, Windows sandbox writable-root behavior, and device-code login warning checks. These are local runtime verification fields, not proof that Ethan's current CLI has the release.
- source-backed addition: Storybook and GitHub Security Advisory pages provide a published Storybook artifact security gate for `.env` exposure, patched version thresholds, secret rotation, artifact rebuild, and rollback/unpublish review. These are frontend security QA fields, not proof that any current Ethan project is affected.
- source-backed addition: GitHub Copilot code review changelog provides a code-review agent trust gate for head-branch instructions, `REVIEW.md`/model-specific instruction files, review setup YAML, default firewall, self-hosted runner firewall exceptions, and separated runner configuration. These are portable QA fields, not approval to enable Copilot code review.

## Bias Check

- 체크리스트는 보수적으로 설계되어 있어 도구 도입 속도를 늦출 수 있다.
- 반복 growth scan의 관심 분야에 맞춰져 있으므로, 새 분야 작업에서는 추가 source가 필요할 수 있다.
- 이 문서는 실행 전 출발점이지 최종 검증을 대체하지 않는다.

## Original Content

이 guide는 2026-07-03부터 2026-07-04까지의 Dex Company Growth Scan 보고서, LLM Wiki source/wiki 구조, 10x candidate queue, approval-ready install audit model, weekly synthesis 결과를 바탕으로 작성한 작업별 체크리스트다.

2026-07-09 update: Indeed Career Scout was added as a platform-native AI career coach example. Career Ops should verify profile/activity/chat data use and resume overwrite behavior before saving generated resumes or treating the tool as usable for a specific account.

## Codex Access / Seat / Runtime Precheck

- [ ] Codex access를 확인할 때 plan/workspace, Business workspace의 2026-06-24 이전 Codex seat 보유 여부, current seat type, workspace history visibility risk, rate-limit reset bank, usage-limit reset timing을 분리한다.
- [ ] Developer mode는 기본 off/permission-sensitive browser inspection mode로 보고, console/network/DOM/styles/performance 접근이 필요한 target task가 있을 때만 켠다.
- [ ] Enterprise/Edu plugin sharing과 Codex analytics는 local app 기능이 아니라 workspace/admin policy로 보고, enabled/disabled/not checked를 명시한다.

2026-07-09 update: OpenAI Codex Business access and limit guidance was added. Codex work should verify plan/workspace, Business Codex seat grandfathering, current seat type, rate-limit reset visibility, Developer mode state, plugin sharing, and Codex analytics before making access, cost, or permission claims.

2026-07-09 update: Obsidian Bases Toolbox was added as an approval-not-ready community plugin case. Obsidian property bulk-edit tools should verify Restricted mode impact, target vault, backup, test-vault trial, preview evidence, undo/history limitations, package scripts, dependency/lockfile risk, network/telemetry claims, and rollback before any install request.

2026-07-09 update: VS Code Copilot OpenTelemetry managed export was added as an approval-not-ready agent observability case. IDE/CLI agent telemetry should verify collector endpoint, managed policy owner, content capture, auth header handling, local export paths, runtime filtering, retention/redaction, and rollback before enabling trace export.

2026-07-09 update: GitHub Copilot MDM managed settings were added as an approval-not-ready agent governance case. IDE/CLI agent policy should verify delivery channel, precedence, device policy path, file ownership/symlink rules, permission bypass disable, plugin/marketplace policy, telemetry block owner, rollback, and validation before adoption.

2026-07-09 update: GitHub Mobile Copilot CLI remote session control was added as an approval-not-ready agent governance case. Remote/mobile agent monitoring should verify local machine online state, interactive-session requirement, Store local sessions policy, mobile app version, notification permission, session event sync, session log visibility, credit cost, stop/cancel, and rollback before adoption.

2026-07-09 update: Cross-AI coding tool portability was added as a knowledge-only governance case. Growth Scan may inspect Claude Code, Cursor, Windsurf, Devin, Aider, Cline, Roo Code, and similar tools, but should absorb only source-backed principles that can be carried into Codex, Obsidian, PowerShell, Git, browser QA, approval packets, or task checklists without installing those tools.

2026-07-09 update: OpenAI Codex iOS task management and credit visibility were added as a mobile remote-control governance case. Mobile Codex work should verify app version, account/workspace, host connection, task status, diff filter, usage-limit/credit state, and desktop-side final evidence before approval or completion claims.

2026-07-09 update: GitHub Agent Finder / ARD was refreshed from official docs and catalog sources. Agent/resource discovery should remain discovery-only until registry source, manifest validation, allowlist policy, publisher identity, connection step, rollback, and validation evidence are known.

2026-07-09 update: GitHub Copilot app desktop agent governance was added as an approval-not-ready case. Desktop agent app work should verify plan/account, app source/version, OS/platform, organization policy, repo/local-folder scope, isolated session evidence, agency mode, model provider/BYOK credentials, billing owner, validation evidence, and rollback before adoption.

2026-07-10 update: GitHub Copilot repository overview was added as a knowledge-only repository-onboarding verification gate. AI-generated repo summaries should be checked against actual files and runtime evidence before Dex uses them for implementation, install, security, or architecture decisions.

2026-07-10 update: OpenAI Codex ChatGPT desktop app migration was added as a knowledge-only desktop-runtime verification gate. Codex Desktop checks should verify installed app identity, Windows package/executable/shortcut path, version, default view, project/settings/workflow persistence, plugin Settings location, multi-repo project scope, rollback path, and live local evidence before making update or migration claims.

2026-07-10 update: OpenAI Codex CLI 0.144.0 approval/auth/sandbox gate was added as a knowledge-only local-runtime verification case. Codex CLI/MCP/automation work should verify CLI version, approval mode, MCP interactive auth scope, usage-limit reset credit details, Windows sandbox writable-root behavior, and device-code login provenance before changing configuration or relying on the new behavior.

2026-07-10 update: Storybook `.env` build secret exposure advisory was added as a frontend security QA gate. Published Storybook artifact work should verify version thresholds, `.env` build-time presence, artifact secret exposure, key rotation, rebuild, and rollback/unpublish path before publishing or claiming safe delivery.

2026-07-19 update: GitHub Copilot code review customization/firewall changes were added as a code-review agent trust gate. PR review work should verify head-branch instruction diffs, `REVIEW.md`/model-specific instruction files, review setup YAML, runner separation, firewall/network policy, self-hosted runner exceptions, and rollback before relying on automated review output.

## Codex Desktop Migration Gate

- [ ] Codex desktop/ChatGPT desktop app update claims are local-evidence-gated: verify installed app identity, Windows package/executable/shortcut path, app version, Codex default view, project/settings/workflow persistence, plugin Settings location, multi-repo project scope, rollback path, and live app evidence.

## Codex CLI 0.144 Approval/Auth/Sandbox Gate

- [ ] Codex CLI 0.144.0 behavior claims are local-evidence-gated: verify installed CLI version, exact approval mode, MCP interactive-auth prompt provenance/scope, usage-limit reset credit type/expiration/redemption, Windows sandbox writable-root/delete behavior with a disposable path, device-code login URL/account provenance, rollback path, and validation evidence.

## Code Review Agent Trust Gate

- [ ] Automated code-review output is head-branch-evidence-gated: inspect changed `AGENTS.md`, `REVIEW.md`, `GEMINI.md`, `CLAUDE.md`, `*.instructions.md`, agent skills, and review setup YAML before trusting the review result.
- [ ] Review runtime claims are environment-evidence-gated: record runner type, self-hosted runner use, firewall/network policy, dependency install steps, secret exposure risk, billing owner, and rollback/disable path.
