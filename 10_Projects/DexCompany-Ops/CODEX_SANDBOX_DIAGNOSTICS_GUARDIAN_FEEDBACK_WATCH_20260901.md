# Codex sandbox diagnostics / Guardian feedback-upload watch — 2026-09-01

## Scope

직전 provider watch 이후 OpenAI `openai/codex` upstream `main`에 병합된 변경 중 Dex Company의 보안·복구·진단 품질에 의미 있는 항목을 기록해요. 이 문서는 canonical control-plane evidence이며 기능 활성화 문서가 아니에요.

## Confirmed

### OpenAI PR #41933 — configured sandbox policy diagnostics

Official source: https://github.com/openai/codex/pull/41933

- 존재하지 않는 configured writable root 때문에 sandbox diagnostics가 `read-only`로 잘못 보일 수 있던 문제를 수정했어요.
- diagnostic policy label은 configured writable roots를 기준으로 만들고 실제 filesystem 존재 여부를 검사하지 않아요.
- 실제 runtime sandbox authorization은 계속 filesystem-aware resolution을 사용해요.
- upstream 구현은 diagnostic label을 authorization에 사용하지 말아야 한다고 명시해요.
- label을 turn당 한 번 capture해 response metadata와 tool-result metrics에 일관되게 재사용해요.
- missing project root, denied root, project subpath deny rule 회귀 테스트가 추가됐어요.

### OpenAI PR #41936 — failed Guardian review evidence in feedback reports

Official source: https://github.com/openai/codex/pull/41936

- feedback capture가 활성화되고 reviewer가 ephemeral이 아닐 때 failed Guardian review를 bounded process-local record로 유지할 수 있어요.
- record에는 reviewed action, decision/status, reviewer model, instructions, reviewer history가 포함될 수 있어요.
- logs를 포함한 `feedback/upload`는 reported thread와 descendant thread의 최근 failed-review record를 `auto-review-failures.jsonl`로 첨부할 수 있어요.
- successful review, ephemeral reviewer, capture-disabled review는 제외돼요.
- 개별 record serialization은 4 MiB로 제한돼요. reviewer instructions/history가 너무 크면 action/decision은 보존하고 oversized reviewer context는 생략하는 fallback이 있어요.

### Secondary upstream items reviewed

- PR #41934: Code Mode의 PCM/IEEE-float WAV output이 25 ms 미만이면 audio 대신 설명 text로 대체해 audio-model encoding failure를 피하도록 보강했어요. Dex Voice/Realtime 활성화 근거로는 사용하지 않아요.
- PR #41937: background terminal inline input preview를 12 rendered rows / 64 KiB processing으로 제한하되 complete input은 transcript/raw view에 유지해요.
- PR #41938: exit summary의 `codex resume <thread-id>` 안내를 명확히 했어요.
- PR #41940: backtrack selection에서 unrelated transcript layout cache를 보존해 rerender 비용을 줄여요.
- PR #41941: TUI composer에 bounded draft-level Vim undo를 추가했어요.

이 secondary 항목들은 현재 Dex Runtime capability/policy 변경이 필요할 정도의 계약 변화로 보지 않았어요.

### Stable status

Official sources:
- https://developers.openai.com/codex/changelog
- https://github.com/openai/codex/releases/latest

Latest non-prerelease Codex CLI는 계속 `0.151.0`이에요. 이번 확인에서 더 새로운 stable release, Dex routing을 바꿔야 할 새 model/pricing/usage-limit 정책은 확인되지 않았어요.

## Inference

- PR #41933은 configured policy와 diagnostic label을 맞춰 dedicated/Windows worker에서 잘못된 `read-only` 진단 때문에 불필요한 remediation을 하는 일을 줄일 가능성이 커요. authorization을 분리해 유지하므로 least-privilege 목표와도 맞아요.
- PR #41936은 Guardian deny/invalid/failed outcome의 원인 조사와 재현 비용을 낮출 수 있어요. 반면 log-enabled feedback upload에 action/history가 포함될 수 있어 명확한 data-egress 경계로 취급해야 해요.
- PR #41934는 향후 audio tool reliability에는 유리하지만 stable packaging, microphone/privacy/retention, approved-host E2E 전에는 Dex Voice를 활성화할 이유가 없어요.

## Proposal applied

1. Runtime #30에 future stable/approved-host sandbox-diagnostics Gate를 추가해 configured policy label의 일관성과 actual authorization의 독립성을 함께 검증하도록 했어요.
2. Runtime #25에 Guardian feedback-upload Gate를 추가해 `feedback/upload`를 explicit user-initiated data egress로 취급하고 자동 upload를 금지하며 secret/sensitive-context pre-upload review/redaction을 요구하도록 했어요.
3. Runtime PR #55를 documentation/tracking-only로 병합했어요. Current Runtime merge: `a0b1e3fe0724366636e028ccfb9ca5be59f93e41`.
4. Stable target `0.151.0`, GitHub Task Bus authority, least-privilege permission, subscription-first 비용 정책은 변경하지 않았어요.

## Unknown / Not Checked

- PR #41933/#41934/#41936이 어느 future stable에 포함될지: `unknown`
- approved Windows host에서 missing/materialized writable root diagnostic metadata E2E: `Not Checked`
- future stable `feedback/upload` UI consent/retention과 Guardian attachment 표시 방식: `Not Checked`
- feedback packaging이 action/instructions/history에 추가 redaction을 수행하는지: `unknown`
- approved Dex subscription host에서 log-enabled upload 전 secret/sensitive-context 검사 E2E: `Not Checked`
- PR #41934의 stable Code Mode/audio surface 및 Dex Voice security gate와의 실제 상호작용: `Not Checked`

## Safety boundary

- prerelease/alpha를 설치·승격하지 않아요.
- sandbox diagnostic label을 permission/authorization evidence로 사용하지 않아요.
- `feedback/upload`나 log capture/upload를 자동 실행하지 않아요.
- secret, credential, 고객 데이터, approval-sensitive history를 explicit user intent와 pre-upload review 없이 외부로 보내지 않아요.
- broader filesystem permission, paid API, automatic paid fallback, extra paid usage, Browser/CDP, Computer Use, Remote Control, Voice/Realtime를 이번 watch로 활성화하지 않아요.

## Run status

- Official upstream evidence: **PASS**
- Latest stable verification: **PASS — 0.151.0**
- Current Dex main comparison: **PASS**
- Runtime PR #55 branch validation: **PASS**
- Runtime behavior activation: **Not Checked / intentionally unchanged**
- Approved-host diagnostic/upload E2E: **Not Checked**
- Security-boundary expansion: **PASS — none enabled**
