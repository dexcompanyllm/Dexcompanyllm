# Codex Sites / Record & Replay watch — 2026-08-31

## Scope

OpenAI 공식 Codex/ChatGPT 문서에서 새로 확인된 Sites와 Record & Replay를 Dex Company 관점에서 검토하고, 기존 canonical architecture·subscription-first·security policy를 훼손하지 않는 범위에서 tracking gate만 추가한 기록입니다.

## Classification

### Confirmed

- OpenAI 공식 `Using Codex with your ChatGPT plan` 문서가 2026-08-31 기준 갱신됐고 Codex 관련 Sites와 Record & Replay surface를 안내합니다.
- Sites는 public beta이며 plan·region·workspace setting에 따라 availability와 usage limit이 달라질 수 있습니다.
- Sites는 prompt 또는 compatible local project에서 hosted website/web app/game을 만들고 관리하는 workflow입니다.
- Sites에는 standalone Codex CLI/IDE management view가 없고 ChatGPT web/desktop app이 create/save/deploy/manage surface입니다.
- 모든 Sites deployment URL은 production deployment입니다. 배포 전에는 saved version을 만들어 reviewable candidate로 둘 수 있습니다.
- Sites는 storage, workspace identity, external auth, hosted environment values/secrets, sharing과 custom domain을 지원할 수 있습니다.
- Sites는 launch 시 data residency/inference residency를 지원하지 않습니다.
- Record & Replay는 macOS에서 제공되며 초기 availability는 EEA·UK·Switzerland를 제외합니다. Computer Use가 available/enabled여야 합니다.
- Record & Replay는 사용자의 action과 window content를 관찰해 reusable skill 초안을 만들고, 이후 Computer Use·browser actions·installed plugins와 함께 재사용할 수 있습니다.
- OpenAI는 recording에 secrets와 sensitive data를 넣지 말 것을 명시합니다.
- OpenAI 공식 open-source Codex upstream에서 이번 run에 새 stable release 증거는 확인하지 못했고 Dex stable reference는 계속 `0.151.0`입니다. 기존 `update_plan` opt-in PR #41744는 이미 Dex에서 tracking 중입니다.

### Inference

- Sites는 간단한 prototype·landing·internal tool의 hosting setup과 preview handoff 시간을 줄일 수 있지만, deploy 자체가 production side effect라 Dex의 기본 자동화 surface로 삼으면 오배포·비밀정보·DNS·data-residency 위험이 커집니다.
- Record & Replay는 설명하기 어려운 반복 workflow의 prompt 작성·재작업을 줄일 수 있지만, 생성 skill이 provider-local/noncanonical 상태로 남으면 Dex Skill과 분기될 수 있습니다.

### Proposal applied

- Sites를 Runtime capability tracking의 `evaluation-backlog`, `enabled: false`로 추가하고 Runtime Issue #44에서 별도 평가합니다.
- Record & Replay를 `security-watch-disabled`, `enabled: false`로 추가하고 Runtime Issue #45에서 별도 평가합니다.
- Record & Replay 생성 skill은 자동 canonical 승격하지 않고 Dex Skill Ingestion의 source review → secret/machine-path cleanup → duplicate/quality comparison → provenance → test → Git review를 통과해야 합니다.
- Sites는 Dex Console PWA·project repository·현재 deployment provider를 대체하지 않습니다. Public publish, DNS, production migration, hosted secret 이동은 explicit owner approval 없이 자동 실행하지 않습니다.

### Unknown / Not Checked

- 현재 에던 계정/region/workspace에서 Sites가 실제 노출되는지: Not Checked
- 승인 macOS에서 Record & Replay availability와 Computer Use permission scope: Not Checked
- Sites saved-version-only E2E와 rollback/takedown: Not Checked
- Record & Replay generated skill export/inspection/fresh-session replay: Not Checked
- Sites/Record & Replay가 Codex CLI/App Server stable schema에 포함되는지: 해당 surface는 제품 UI 기능이므로 이번 Runtime stable-schema Gate에서는 Not Checked

## Runtime changes

### Tracking issues

- Runtime #44 — `Evaluate Codex Sites surface`
- Runtime #45 — `Evaluate Record & Replay skill capture`

### Runtime PR #46

- Branch: `codex/sites-record-replay-watch-20260831`
- Merge: `cb54911faf1c19a0e01790475e02d12b5f0b89ba`
- `config/codex-capability-tracking.json` schema `1.8`
- `codexSites`와 `recordReplay` capability 추가
- 공식 guide URL을 tracking config에 추가
- 두 capability가 enabled 되지 않고 noncanonical authority를 유지하는 regression test 추가

## QA

### PASS

- PR branch static/config/secret scan PASS
- Node tests: 195 total / 194 PASS / 0 FAIL / 1 Windows-only SKIP
- Sites/Record & Replay 신규 policy regression test PASS
- Runtime smoke PASS
- Vercel adapter smoke PASS
- rollback guard PASS
- production dependency audit: 0 vulnerabilities
- Runtime PR #46 merge 완료
- Runtime post-merge `main` CI run `33373268611`: PASS
- merge commit Vercel status: success

### FAIL

- 없음

### Not Checked

- 실제 Sites create/save/deploy
- 실제 Record & Replay recording/replay
- Computer Use 활성화
- public publishing / custom domain / DNS
- approved-host 또는 approved-Mac UI E2E

## Decision

1. **Sites는 optional hosting/preview surface이지 Dex canonical deployment authority가 아닙니다.**
2. **Sites의 deploy는 production side effect이므로 자동 최적화 standing approval 범위에서 실행하지 않습니다.**
3. **Record & Replay는 Dex Skill 생성기를 대체하지 않고 candidate skill-capture source로만 취급합니다.**
4. **Computer Use는 Record & Replay를 얻기 위한 이유만으로 자동 활성화하지 않습니다.**
5. **subscription-first, no paid API, no automatic paid fallback, no broader permission 원칙은 변경하지 않습니다.**

## Official sources

- OpenAI Help — Using Codex with your ChatGPT plan: `https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan`
- OpenAI / ChatGPT Learn — Sites: `https://learn.chatgpt.com/codex/sites`
- OpenAI / ChatGPT Learn — Record & Replay: `https://developers.openai.com/codex/record-and-replay`
- OpenAI Codex open-source repository: `https://github.com/openai/codex`

## Next gates

- #44: availability → saved-version review → security/privacy/data-residency → narrow-sharing E2E → rollback/takedown. Deployment/public/DNS/migration은 별도 explicit approval.
- #45: approved Mac availability → Computer Use threat model/approval → low-sensitivity recording → generated skill inspection → Dex Skill Ingestion → fresh-session replay.
- 기존 Runtime #17/#28/#34/#35 우선순위는 이 watch 때문에 변경하지 않습니다.
