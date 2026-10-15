# 최신 동향 선별 학습 — 2026-09-20

- Task ID: `DEX-SKILL-MAINTENANCE-20260911`; 기존 Task의 수동 후속이에요.
- 요청: 현재 트렌드의 필요한 스킬·플러그인·정책을 검색·학습하되 기존 기준을 지켜요.
- Classification: POLICY 보강 + FACT 관찰. 새 실행 SKILL/CAPABILITY 등록이나 모델 가중치 학습이 아니에요.
- 확인 기준: Wiki `b14ceb0249bb83831005d96788fd5d2861c09dee`, Runtime `5a57b84eeb6428f301b848439887ac02ca9b5c99`.
- 승인 경계: AI_CONTRACT §12.1의 기존 Skill/Plugin 계약·검수 보강과 저위험 문서 PR 범위예요. 설치·권한·유료 경로·운영 기능 활성화는 포함하지 않아요.
- 적용 상태: 이 기록을 포함한 PR의 실제 merge 여부가 정책 소스 반영 근거예요. 별도 host의 설치·실행 완료를 뜻하지 않아요.

## 후보 전체와 필터 결과

공식 문서와 플러그인 디렉터리의 후보를 아래 다섯 업무 묶음으로 기록한 뒤, (1) 기존 Dex 대비 필요한 차이, (2) 보안·비용·라이선스·사용자 부담을 대조했어요. 인터넷 전체 후보의 전수조사는 아니에요. 상세 정책 검토는 1·2번에 한정해요.

| 후보 묶음 | 기존 Dex와 대조 | 판단 |
|---|---|---|
| 1. 정확한 스킬 호출·단계적 자료 로딩·기존 대비 평가 | 최소 context·성장 평가가 이미 있어요. 과도한 trigger와 호출하지 않아야 할 유사 요청, description 축약 시 누락을 별도로 확인할 기준이 더 필요해요. | POLICY 선별 반영. 새 스킬은 만들지 않고 Governance §14를 보강해요. |
| 2. 외부 스킬의 의존성 검수·MCP 신뢰 경계 | §6에 보안 검토가 있으나 원격 다운로드·hook까지의 검토 범위, metadata와 실제 권한의 구분을 구체화해요. | POLICY 선별 반영. §13; Runtime/MCP 버전·OAuth를 변경하지 않아요. |
| 3. 디자인 품질·frontend-design 계열 | Registry와 Runtime manifest에 use-dex-company, create-screen-spec, design-quality 3개와 source 1.3.0이 있어요. | 기존 소스 재사용. 실제 렌더·설치 효과는 기존 디자인 Task에서 검증해요. 중복 설치·새 디자인 Skill 없음. |
| 4. GitHub / Codex Security / Linear / Datadog / OpenAI Developers | 디렉터리에서 GitHub·OpenAI Developers는 installed=true, 나머지 셋은 false예요. 실제 GitHub 읽기는 성공했어요. Codex Security는 보안 검토 후보지만 현재 계정의 포함량·데이터·권한·host 실행 조건은 미확인이에요. Linear는 이번 Task Bus 대체 필요가 없고 Datadog는 이번 작업의 관측 기능 gap이 확인되지 않았어요. | GitHub 연결 재사용. Codex Security 조건부 보류, Linear·Datadog는 이번 범위 제외. OpenAI Developers의 API key 생성/유료 실행을 사용하지 않아요. |
| 5. 도구 출력 축소·컨텍스트 압축·장기 작업 harness | AGENTS/PLUS_MAINTENANCE_START/성장 절차와 열린 Wiki PR #211이 다뤄요. | 기존 절차·PR 재사용. 별도 압축 스킬·중복 자동화·새 Task DB 없음. |

예외 후보도 확인했어요. Registry에 기록된 explain_me는 라이선스 미확인, career-ops는 권한 생략 실행 경로, addyosmani/agent-skills는 hook side effect로 기존 보류 중이에요. 이는 이번에 읽은 approved-main Registry 관찰이며 외부 최신 원문 전체를 새로 감사했다는 뜻이 아니에요. 소규모 후보라는 이유로 기준을 낮추지 않아요.

## 출처와 provenance

아래는 2026-09-20 본문을 확인한 공식 문서예요. S5–S7은 별도 조사 run에서 본문을 확인했어요. 게시일이 없는 문서는 확인일과 게시일을 혼동하지 않아요. 변경 가능한 웹 문서는 commit-pinned 외부 Skill로 취급하지 않아요.

| ID | 출처 | 날짜·검토 범위 |
|---|---|---|
| S1 | [OpenAI: Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) | 2026-09-11 게시. 간결한 trigger, 필요한 참고자료만 로딩, 모델별 차이. 승인·검수 완화는 Dex에 적용하지 않아요. |
| S2 | [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills) | 게시일 미표시. 단계적 로딩과 description 축약/목록 누락 가능성을 확인했어요. 현재 Dex host에서 실제 발생했다는 뜻은 아니에요. |
| S3 | [Agent Skills specification](https://agentskills.io/specification) / [Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills) | 게시일 미표시. allowed-tools는 experimental; 이전 방식과 작은 대표 사례부터 비교하는 원칙. |
| S4 | [MCP Security Best Practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices) | 문서 버전 2026-07-28. audience·state/issuer·URL/실행 경계·scope 관련 검토 기준. Dex Runtime의 규격 지원·E2E는 이번에 확인하지 않았어요. |
| S5 | [Anthropic: Writing tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) | 2025-09-11 게시. 필요한 정보·검색·응답 범위를 줄이는 방법. 이미 있는 정책과 중복이에요. |
| S6 | [Anthropic: Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | 2025-09-29 게시. 필요한 때 조회하고 중요 상태를 보존하는 방법. |
| S7 | [Anthropic: Effective harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | 2025-11-26 게시. 작은 작업 단위와 진행 기록·실제 검증. 기존 Task/handoff와 중복이에요. |

플러그인 연결 상태는 이번 세션의 디렉터리 조회 결과이고 다른 기기·provider 설치 상태가 아니에요. 공식 문서 방법을 Dex 자체 문장으로 정리했으며 원문 Skill·코드·script·asset은 복사하지 않았어요. 외부 파일의 복사·재배포 라이선스는 Not Checked이고 해당 파일 반입·설치는 보류예요. 저작권/라이선스 적법성을 포괄 보증하지 않아요.

## 변경·검증 범위

- Governance §13–14: 기존 ingestion 범위 구체화와 정확한 trigger/효과 검증.
- Maintenance와 기존 Task RESULT: 이 후속 기록을 연결해요.
- 이 기록: 후보, 출처, 제외 이유, 미확인과 다음 작업을 보존해요.
- 확인 방법: 추가 전 원문 보존, UTF-8/링크/비밀값 패턴, PR diff allowlist와 열린 PR #211 경로 비중복, 독립 정책 모의 검수, GitHub CI.
- 원문 보존·정책 검수 PASS는 Runtime 보안 E2E나 실제 토큰 절감을 뜻하지 않아요. 검수 및 CI 결과는 PR의 해당 head 증거로 남겨요.
- Not Checked: 실제 host 설치·새 세션 호출, Codex Security 비용/권한/데이터 조건, 신규 connector E2E, 실제 품질·시간·토큰 효과.
- 실행하지 않은 항목: 유료 API·추가 결제, plugin install/update, 권한 변경, worker 실행, Runtime 수정·배포, legacy 삭제, 예약작업 변경.

## 다음 실행과 rollback

기존 유지보수 Task에서 다음 실제 스킬 변경을 만났을 때 §13–14의 해당 항목만 사용해요. 기존 평가 자료가 유효하면 재사용하고 에던에게 측정 양식이나 같은 설명을 요청하지 않아요. sourceObserved/reviewed/applied와 installed/behaviorVerified는 기존 Registry 방식으로 구분해요. 이번 정책 보강 때문에 Registry의 설치값이나 정기 lastRun을 갱신하지 않아요.

PR #211은 별도 변경·승인 대상으로 유지해요. 원래 디자인 Task `DEX-DESIGN-QUALITY-20260917`의 설치·3건 실측, PR #97의 Windows Gate도 그대로예요. 필수 검증을 이 모의 검수로 대체하지 않아요.

되돌릴 때는 이 PR의 정확한 merge commit을 대상으로 새 revert PR을 만들고 이후 관련 변경을 보존해요. 기존 보안 기준을 낮추거나 main을 과거 SHA로 강제 이동하지 않아요. 설치가 없으므로 설치본 rollback은 해당하지 않아요.
