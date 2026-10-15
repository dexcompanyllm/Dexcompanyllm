# Codex Guardian review-evidence watch — 2026-08-31

## Scope

이전 Codex provider-update run 이후 OpenAI 공식 `openai/codex` upstream `main`에 새로 병합된 Guardian review-evidence 보존 변경을 Dex Company 관점에서 검토한 기록입니다.

## Classification

### Confirmed

- OpenAI PR #41846 / commit `1c1e17782aeb51a5a253997067fa887a9d593cc9`는 model-compacted history와 별도로 bounded chronological Guardian review history를 유지합니다.
- 같은 변경은 user messages와 기타 transcript items에 별도 retention limit을 두어 tool traffic이 user instruction을 밀어내지 못하도록 하고, synchronous/asynchronous Guardian transcript가 retained evidence를 사용하도록 합니다.
- rollback 또는 history reconstruction 뒤 retained review history는 reset됩니다.
- OpenAI PR #41852 / commit `305eed102d6ab5fc1228fec0737ba240eb29826b`는 `request_user_input`의 trusted user answer를 retained review history와 연결해 compaction과 review-history eviction 뒤에도 보존합니다.
- explicit rollback은 연결된 trusted answer를 제거합니다.
- OpenAI PR #41857 / commit `98a8425e223106d6e20fb31881fd693e9c56cf63`는 recorded user-input tool call을 current conversation과 retained review history 양쪽에서 찾아 trusted answer를 수집합니다.
- OpenAI PR #41858 / commit `09f4c4506874e75e25b967d51844cb699086e124`는 Guardian retained-history budget을 넘는 user image가 있어도 같은 user message의 text와 metadata를 버리지 않고, oversized image bytes만 제외한 bounded text/metadata를 순서대로 보존합니다.
- OpenAI PR #41861 / commit `2c8cfbf44f9cbe16f91d7630d21b501d3e2cf817`는 Guardian reviewer subthread를 empty extension data로 초기화하고 parent의 read-only `history` extension tools를 더 이상 reviewer tool plan에 특별 노출하지 않습니다.
- OpenAI PR #41870 / commit `032d15cba77e28d4eb697b1f11bc395c2522d12b`는 Guardian review transcript를 shared `codex-guardian-context` collector로 구성하면서 Guardian-specific filtering과 transcript budget을 유지합니다.
- 같은 변경은 per-entry truncation을 collection 단계에 적용하고 Node REPL output에는 larger cap을 유지하며, matching call이 없어도 standalone function/custom-tool output을 evidence에 남깁니다. 테스트는 shared entry type, Node REPL truncation, standalone tool output, recent-tool retention을 포함합니다.
- OpenAI PR #41879 / commit `9f97cb79eb15b38d24c552c56fe24e211ff9cf3a`는 synchronous와 asynchronous Guardian review transcript를 parent의 model-visible compacted history가 아니라 retained review-history snapshot에서 구성합니다.
- 같은 변경은 shared Guardian collector를 계속 사용해 formatting, tool attribution, per-entry truncation과 기존 retention budget을 유지합니다.
- App Server regression은 compaction 뒤 parent model input에 compacted summary만 남아 있어도 원래 user restriction과 실행된 MCP tool evidence가 Guardian transcript에 보존되는 것을 확인하고, rollback 뒤에는 reverted turn의 restriction/tool evidence가 제거되는 것을 확인합니다.
- OpenAI PR #41840 / commit `e45226e771add9f87a47b6d24c1ff61d62588846`는 approval-review thread에 shared 16 MiB async stack budget을 사용합니다. 이는 내부 reliability hardening signal이며 Dex capability contract로 보지 않습니다.
- 이번 follow-up에서도 새 official stable Codex release는 확인되지 않았습니다. GitHub `releases/latest`는 계속 `0.151.0`이며 `0.152.0-alpha.*`는 prerelease입니다.

### Inference

- approval-sensitive 장시간 작업에서 compaction 뒤 이전 승인 근거와 신뢰된 사용자 답변이 유실될 위험을 줄이는 방향이므로 Dex의 reliability와 security에 유리합니다.
- user message retention limit을 별도로 두는 구조는 tool-heavy session이 사용자 승인 근거를 밀어내는 위험을 줄일 가능성이 큽니다.
- 특히 큰 이미지가 retention budget을 넘더라도 “배포하지 마” 같은 동반 텍스트가 남는 구조는 multimodal approval safety에 유리합니다.
- Guardian reviewer가 inherited `history` extension tool을 받지 않는 방향은 reviewer 권한면을 줄이고, 승인 근거를 retained review evidence라는 더 명시적인 경로에 집중시키는 변화로 볼 수 있습니다.
- shared transcript collector 사용은 Guardian context 생성 경로 간 구현 drift를 줄이고, partial transcript correlation 때문에 tool evidence가 빠지는 위험을 낮출 가능성이 있습니다.
- #41879는 compaction 뒤 Guardian review가 compacted summary에만 의존하지 않고 retained snapshot을 직접 사용하도록 경로를 닫기 때문에, 장시간 Task에서 approval evidence loss와 불필요한 재승인 가능성을 더 낮출 수 있습니다. 다만 stable release와 approved-host E2E 전까지는 inference입니다.

### Proposal applied

- 기존 Runtime Issue #25를 단일 tracking authority로 유지하고 duplicate capability/issue는 만들지 않습니다.
- 다음 stable gate에 아래 회귀검증을 추가합니다.
  1. `request_user_input` trusted answer가 current history와 retained history 어느 쪽에 원래 tool call이 있어도 보존되는지 확인
  2. oversized user image가 Guardian retained history에서 제외돼도 동반 text/metadata가 순서와 함께 유지되는지 확인
  3. Guardian reviewer tool inventory에 inherited `history` extension tools가 노출되지 않는지 확인
  4. shared transcript collector가 Guardian-specific filtering/budget, standalone tool output, recent-tool retention, Node REPL larger output cap을 유지하는지 확인
  5. compaction 뒤 synchronous와 asynchronous Guardian review가 모두 retained review-history snapshot의 원래 user/tool evidence를 받는지 확인
  6. rollback 뒤 reverted turn의 retained evidence가 제거되는지 확인
  7. compaction/eviction 뒤 approval evidence 보존과 reset/genuine new-user-input invalidation semantics를 함께 확인
- Dex approval semantics, GitHub Task Bus authority, permissions, stable target은 변경하지 않습니다.

### Unknown / Not Checked

- PR #41857, #41858, #41861, #41870, #41879가 포함되는 future stable release: Not Checked
- eventual stable Windows App/CLI bundle이 동일 retained-snapshot/shared-transcript semantics를 제공하는지: Not Checked
- Runtime #28의 long-running Task consumer/checkpoint flow와 실제 상호작용: Not Checked
- 다음 stable cut 전 Guardian history/transcript semantics가 다시 변경되는지: Not Checked

## Runtime optimization

### Runtime PR #47

- Branch: `codex/guardian-review-evidence-watch-20260831`
- Merge: `d941fed4549b7b666c495cde3a685d79ad64d211`
- Canonical Runtime evidence: `docs/CODEX_GUARDIAN_REVIEW_EVIDENCE_WATCH_20260831.md`
- Runtime Issue #25에 initial Guardian upstream evidence와 next-stable acceptance gate를 추가했습니다.

### Runtime PR #48

- Branch: `codex/guardian-review-evidence-followup-20260901`
- Merge: `62fe5a3020b322e2b663f58f873021b1f5551a97`
- Same canonical Runtime evidence document was extended rather than creating duplicate watch state.
- Runtime Issue #25 received the new upstream commits and expanded next-stable regression gate.

### Runtime PR #49

- Branch: `codex/guardian-shared-transcript-watch-20260901`
- Merge: `67a0550e60144898e0022a7507e71aafd82c29f2`
- Same canonical Runtime evidence document was extended with PR #41870 instead of creating another watch artifact.
- Runtime Issue #25 remains the single tracking authority and now includes shared transcript collector regression criteria.

### Runtime PR #50

- Branch: `codex/guardian-retained-snapshot-watch-20260901`
- Merge: `bdbc7ce77a51076905bc0d8df26f1185a802b6a2`
- Same canonical Runtime evidence document was extended with PR #41879 instead of creating another watch artifact.
- Runtime Issue #25 now includes retained review-history snapshot compaction and rollback regression criteria.

## QA

### PASS

- Runtime PR #47 branch CI: PASS
- Runtime PR #47 Node tests: 195 total / 194 PASS / 0 FAIL / 1 Windows-only SKIP
- Runtime PR #47 static/config/secret scan, smoke, Vercel adapter smoke, rollback guard: PASS
- Runtime PR #47 production dependency audit: 0 vulnerabilities
- Runtime PR #47 post-merge `main` CI run `33403975722`: PASS
- Runtime PR #47 merge commit Vercel status: success
- Runtime PR #48 branch CI run `33409396118`: PASS
- Runtime PR #48 Node tests: 195 total / 194 PASS / 0 FAIL / 1 Windows-only SKIP
- Runtime PR #48 static/config/secret scan, smoke, Vercel adapter smoke, rollback guard: PASS
- Runtime PR #48 production dependency audit: 0 vulnerabilities
- Runtime PR #48 branch Vercel status: success
- Runtime PR #48 post-merge `main` CI run `33409477392`: PASS
- Runtime PR #48 merge commit Vercel status: success
- Runtime PR #49 branch CI run `33414929717`: PASS
- Runtime PR #49 Node tests: 195 total / 194 PASS / 0 FAIL / 1 Windows-only SKIP
- Runtime PR #49 static/config/secret scan, smoke, Vercel adapter smoke, rollback guard: PASS
- Runtime PR #49 production dependency audit: 0 vulnerabilities
- Runtime PR #49 branch Vercel status: success
- Runtime PR #49 post-merge `main` CI run `33415007111`: PASS
- Runtime PR #49 merge commit Vercel status: success
- Runtime PR #50 branch CI run `33420268508`: PASS
- Runtime PR #50 Node tests: 195 total / 194 PASS / 0 FAIL / 1 Windows-only SKIP
- Runtime PR #50 static/config/secret scan, smoke, Vercel adapter smoke, rollback guard: PASS
- Runtime PR #50 production dependency audit: 0 vulnerabilities
- Runtime PR #50 branch Vercel status: success
- Runtime PR #50 post-merge `main` CI run `33420444338`: PASS
- Runtime PR #50 merge commit Vercel status: success

### FAIL

- 없음

### Not Checked

- future stable release inclusion
- approved Windows host Guardian compaction/multimodal/tool-inventory/shared-transcript/retained-snapshot regression
- Runtime #28 long-running Task integration

## Decision

1. **Guardian review-evidence retention과 retained-snapshot/shared transcript collection은 Dex에 유리한 upstream security/reliability 변화지만 stable capability로 승격하지 않습니다.**
2. **현재 approved stable target `0.151.0`을 유지합니다.**
3. **0.152 alpha/prerelease를 이 기능 때문에 설치하거나 활성화하지 않습니다.**
4. **Dex의 기존 approval semantics와 권한 모델은 변경하지 않습니다.**
5. **stable 포함이 확인되면 approved-host long-thread + multimodal + reviewer-tool-inventory + retained-snapshot/shared-transcript regression으로 실제 보존/무효화 semantics를 검증합니다.**

## Official sources

- OpenAI Codex upstream — Preserve Guardian review evidence across compaction: `https://github.com/openai/codex/commit/1c1e17782aeb51a5a253997067fa887a9d593cc9`
- OpenAI Codex upstream — Preserve Guardian user answers across compaction: `https://github.com/openai/codex/commit/305eed102d6ab5fc1228fec0737ba240eb29826b`
- OpenAI Codex upstream — Preserve Guardian user answers from current history: `https://github.com/openai/codex/commit/98a8425e223106d6e20fb31881fd693e9c56cf63`
- OpenAI Codex upstream — Preserve user text when oversized images are dropped from Guardian retained history: `https://github.com/openai/codex/commit/09f4c4506874e75e25b967d51844cb699086e124`
- OpenAI Codex upstream — Keep history extension tools out of Guardian reviews: `https://github.com/openai/codex/commit/2c8cfbf44f9cbe16f91d7630d21b501d3e2cf817`
- OpenAI Codex upstream — Use shared transcript collection for Guardian reviews: `https://github.com/openai/codex/commit/032d15cba77e28d4eb697b1f11bc395c2522d12b`
- OpenAI Codex upstream — Build Guardian transcripts from retained review-history snapshot across compaction: `https://github.com/openai/codex/commit/9f97cb79eb15b38d24c552c56fe24e211ff9cf3a`
- OpenAI Codex upstream — Use the async stack budget for approval reviews: `https://github.com/openai/codex/commit/e45226e771add9f87a47b6d24c1ff61d62588846`
- OpenAI Codex releases: `https://github.com/openai/codex/releases`