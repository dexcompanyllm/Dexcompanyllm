# Codex executor-aware permission preapproval and Guardian transcript-budget watch — 2026-09-01

## Scope

직전 provider watch 이후 OpenAI 공식 `openai/codex` upstream `main`에 병합된 PR #41928과 #41931을 Dex Company 관점에서 검토한 canonical watch evidence예요. 두 변경 모두 current stable capability로 승격하지 않고 future stable/approved-host gate로만 반영해요.

## Confirmed

### OpenAI PR #41928 — executor path context for permission preapproval

Official source: https://github.com/openai/codex/pull/41928
Merge: `c4350b4ca2a5af7dced6784e8c36f2f2cdab2dd6`

- permission preapproval의 normalize/materialize/compare가 controller host의 native cwd가 아니라 선택된 executor의 URI 기반 sandbox context를 사용해요.
- 같은 context-aware preapproval이 `exec_command`, `apply_patch`, extension tools에 적용돼요.
- symbolic tmpdir/project-root permission은 executor metadata로 해석할 수 없으면 fail-closed해요.
- upstream test는 non-Windows host에서 Windows permission grant 재사용, symbolic tmpdir resolution, opaque Windows cwd normalization을 포함해요.
- 이는 이전 PR #41909의 executor-aware permission transform을 실제 preapproval decision path까지 연결하는 후속 보강이에요.

### OpenAI PR #41931 — Guardian message transcript budget increase

Official source: https://github.com/openai/codex/pull/41931
Merge: `4ac20a7f748a8a12cae0eb5019a26d13fdc2d456`

- Guardian message transcript 전체 budget이 `10,000 → 20,000` tokens로 증가했어요.
- per-message entry limit이 `2,000 → 5,000` tokens로 증가했어요.
- 같은 diff에서 tool transcript limit은 그대로예요: 전체 10,000, ordinary tool entry 1,000, Node REPL tool result 6,000 tokens.

### Stable / policy status

Official source: https://developers.openai.com/codex/changelog

- latest non-prerelease Codex CLI는 계속 `0.151.0` (2026-08-29)이에요.
- 이번 확인에서 Dex stable target을 변경할 새 stable release는 없었어요.
- PR #41928/#41931은 upstream-main evidence이며 stable/approved-host capability evidence가 아니에요.
- paid API, automatic paid fallback, prerelease activation, broader permission policy를 바꿀 근거는 없어요.

## Inference

- #41928은 Windows/remote executor의 path convention과 controller host path convention이 다를 때 false rejection·재승인·재작업을 줄일 가능성이 있어요. 동시에 symbolic root를 증명할 metadata가 없으면 fail-closed하므로 Dex least-privilege 원칙과 잘 맞아요.
- #41931은 긴 사용자 지시·승인 근거가 Guardian message transcript에서 잘리는 위험을 줄일 가능성이 있어요. 반면 reviewer context가 커질 수 있어 latency/token consumption이 늘 가능성도 있으므로 안정성과 subscription allowance 비용을 함께 측정해야 해요.

## Proposal applied

저위험 최적화만 반영했어요.

1. Runtime #30에 #41928의 next-stable/approved-Windows-host gate를 추가했어요: `exec_command`/`apply_patch`/extension tool preapproval, non-Windows controller→Windows executor grant reuse, opaque Windows cwd, symbolic tmp/project root fail-closed, no broader grant.
2. Runtime #25에 #41931 gate를 추가했어요: former 2k/10k message limit을 넘는 중요 사용자 제한·승인 근거 retention, rollback/reset/new-user invalidation, unchanged tool limits, latency/token impact, #28 long-running task shape regression.
3. Runtime PR #54에 watch evidence만 추가했고 production runtime behavior는 변경하지 않았어요.
4. GitHub Task Bus authority, approval semantics, subscription-first cost policy, stable target `0.151.0`을 유지했어요.

## Runtime validation

Runtime PR #54 branch head: `04c89f474f914a0af184b8b045860f1e9f65d8b4`
Runtime PR #54 merge: `e5ade06f96ce53f193bb00a66f4579d0761d01b0`

- Branch validation run `33450981531`: PASS
  - tests: 195 total / 194 PASS / 0 FAIL / 1 Windows-only SKIP
  - static/config/secret checks: PASS
  - smoke + Vercel adapter smoke + rollback check: PASS
  - production dependency audit: 0 vulnerabilities
- Branch Vercel: PASS
- Post-merge `main` validation run `33451030847`: PASS
- Post-merge Vercel: PASS

## Unknown / Not Checked

- PR #41928/#41931이 어느 future stable에 포함될지: unknown
- approved Windows host의 cross-host permission-preapproval E2E: Not Checked
- Guardian larger message budget의 실제 retention/latency/token allowance effect: Not Checked
- Runtime #28 long-running Task와의 실제 상호작용: Not Checked

## Safety boundary

- prerelease/alpha install 또는 promotion 금지
- broader filesystem permission 자동 부여 금지
- deny constraint·approval semantics 완화 금지
- paid API / automatic paid fallback / extra paid usage / banked reset 자동 사용 금지
- Browser/CDP, Computer Use, Remote Control, Voice/Realtime 등 unrelated capability 자동 활성화 금지

## Run status

- Official upstream evidence: PASS
- Latest stable verification: PASS (`0.151.0`)
- Dex current-main comparison: PASS
- Runtime branch CI/security: PASS
- Runtime merge/post-merge validation: PASS
- Vercel: PASS
- FAIL: 없음
- Approved-host E2E: Not Checked
