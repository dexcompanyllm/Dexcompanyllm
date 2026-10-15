# Dex 스킬 점검·발굴 운영

- 승인 근거: 에던의 스킬 관리·정기 점검 실행 요청 (2026-09-11)
- 기준: GitHub Wiki 승인 main, `AI_CONTRACT.md`, `DEX_SKILL_PLUGIN_GOVERNANCE.md`
- 실행 목록: [DEX_SKILL_REGISTRY.json](DEX_SKILL_REGISTRY.json)
- Task: `DEX-SKILL-MAINTENANCE-20260911`

## 관리 범위

공식 Runtime 스킬, 과거 외부/로컬 설치 기록, 신규 후보, 설치본을 구분해요. Registry는 점검 목록이고 Runtime의 소스·버전 원본을 대체하지 않아요. 원격 head를 설치 버전으로 기록하지 않아요. 과거 문서의 installed 체크는 당시의 기록이며 현재 설치 성공 증거가 아니에요. 새 목록은 기존 설치 감사의 현재성 해석을 보완하고 과거 원문은 보존해요.

## 하나의 정기 작업

매일 오전 기존 소스와 대기 PR을 확인하고, 월요일에는 신규 후보 발굴을 함께 수행해요. 한국시간 23:00~05:59에는 정기 검색을 실행하지 않아요. 첫 허용 실행에서 마지막 성공 점검 이후 변경과 조용한 시간대의 누락을 포함해요. 월요일 실행을 놓쳤으면 다음 허용 실행에서 그 주의 신규 발굴을 한 번 수행해요.

기존 OpenAI·Codex 최적화 자동화는 공급자 변경 감시를 계속 맡아요. 이 작업은 그 결과와 기존 열린 PR을 먼저 확인하고 같은 변경을 새 PR로 중복 작성하지 않아요. 동일 파일의 active writer가 있으면 수정하지 않고 해당 Task로 연결해요.

## 일일 기존 스킬 점검

1. AI 계약과 최소 프로젝트 상태, 이 목록, 이전 Task checkpoint를 읽어요. 긴 과거 채팅을 재생하지 않아요.
2. Runtime marketplace·manifest·skill directory와 registry를 대조해 누락·미등록·버전 차이를 확인해요.
3. 출처별 repository ID, 기본 브랜치와 commit을 확인해요. 변경이 있을 때만 해당 스킬 경로, 라이선스, dependency·script·hook·권한 관련 diff를 읽어요. 경로가 미확인이면 전체 repository 변경을 후보 신호로만 기록하고 먼저 경로를 확인해요.
4. 새 observed commit은 검토 완료·업그레이드 승인과 별개예요. 새 변경은 pending review record와 연결해요. 조회 실패는 unchanged로 기록하지 않고 마지막 성공 기준을 유지해요. 기존 source baseline만으로 설치본이 오래됐다고 단정하지 않아요.
5. 원본 URL 변경은 redirect와 repository ID 등 두 근거로 확인해요. 삭제·비공개·접근실패·라이선스 변경은 자동 대체 설치하지 않아요.
6. 열린 개선 PR은 최신 main과 비교하고, 기존 기능·버전 충돌을 조정해요. CI가 실패하면 원인과 필요한 작업을 같은 Task에 기록해요. 한 방식의 실패는 최대 두 번이에요.
7. 레거시 설치본은 승인 host에서 실제 디렉터리·내용 해시·출처·설치 버전·호출 결과를 확인해야 해요. 현재 환경에 host가 없으면 그대로 Not Checked예요.

## 주간 신규 발굴

- 기본 출처: OpenAI/Anthropic 공식 skill catalog, registry의 기존 출처, 실제 업무에서 드러난 품질·시간·오류 개선 요구예요.
- 한 번에 후보 최대 5개를 먼저 기록하고, 관련성·중복 여부와 보안·라이선스 두 축으로 걸러요. 상세 검토는 가장 유용한 최대 2개만 해요.
- 기존 후보 외의 새 프로젝트나 예외적인 소규모 후보도 최대 1개 비교해요. 별 수나 유행만으로 선정하지 않아요.
- FACT/POLICY/SKILL/CAPABILITY를 먼저 분류해요. 업무 방법이 아닌 정보는 스킬로 만들지 않아요.
- 후보는 원본 URL, 고정 revision, 적합한 업무, 기존 스킬 대비 이점, 검토 범위·미확인 항목, 채택/보류/제외 이유를 남겨요. 부족한 경우 억지로 개수를 채우지 않아요.

## 개선·적용·승인

기존 스킬의 저위험·명확한 개선은 이미 승인된 범위에서 branch → 최소 변경 → package/security 검사 → 대표 행동 검증 → 독립 검수 → PR → 필요한 검사 PASS 후 main에 반영해요. 원본 revision·라이선스·실행 위험·차이를 기록하고 외부 원문을 통째로 설치하지 않아요.

새 스킬·실행 스크립트·권한/비용·외부 전송·실험 기능 등 별도 Gate가 있는 변경은 그 Gate를 유지해요. 특히 PR #97의 실제 Windows 검증을 일반 CI로 대체하지 않아요. 통합 버전은 PR #23의 1.1.0 → PR #203의 1.1.1 → 검증 후 PR #97의 1.2.0 순서예요. architecture 후보를 통합할 때 기존 screen-spec과 공통 운영 변경을 모두 보존해요.

소스 병합과 설치·활성화는 별도 상태예요. 승인 host, 설치 전 snapshot·rollback, fresh-session discovery·대표 호출 검증 없이는 설치 완료로 보고하지 않아요. 자동 marketplace install/update/reconcile, legacy 삭제, 유료 API·추가 과금·자동 paid fallback, permission 확대는 계속 비활성이에요.

## 점검 결과와 알림

- 매 실행은 기존 Task의 checkpoint/result에 짧게 기록해요. 읽기 확인일만 바뀐 경우 전체 상태 문서나 새 Issue를 만들지 않아요.
- source ID + revision + 영향 항목 + 상태로 중복을 식별해요. 첫 발견, 실제 소스 개선, 새 검증 실패, blocker 해소·변경만 알리고 동일한 미해결 문제를 매일 반복하지 않아요.
- 불변 baseline은 남기고 latest observed와 reviewed/applied/installed revision을 분리해요. 명시적 실제 증거 없이 null/Not Checked를 PASS로 바꾸지 않아요.
- 결과는 적용 내용, 소스 버전, 설치 여부, PASS/FAIL/Not Checked, 최소 행동 순서의 쉬운 한국어로 안내해요.
- 되돌리기: 이 자동화를 pause하고 해당 source PR을 revert해요. 설치가 수행된 경우에만 기록된 설치 snapshot/정확한 revision으로 rollback해요. 기존 자산은 삭제하지 않아요.

## 시작 점검 — 2026-09-11

| 구분 | 관리 범위 | 상태 |
|---|---|---|
| 공식 스킬 | use-dex-company, create-screen-spec | source 1.1.0, 설치 Not Checked |
| 과거 설치 | engineering 10, planning 11, PPT·career·knowledge·watchdog 각 1 | 25개, 현재 설치/버전 Not Checked |
| 신규 후보 | explain-system-architecture | PR97 1.2.0 draft |
| 레거시 | standalone create-screen-spec, dex-company-work plugin | 2개, 삭제하지 않음 |
| 과거 후보 저장소 | 기존 audit의 8개 | 미채택, 구체적 업무 gap 발생 시 검토 |

총 30개 관리 항목은 29개 Skill 기록과 1개 legacy Plugin 기록이에요. 현재 기기 설치 수가 아니에요. 외부 원본 8곳과 Dex Runtime 1곳의 관찰 revision을 기록했어요. root license metadata는 개별 스킬 라이선스 승인으로 보지 않아요.

구직 원본은 santifer/career-ops에서 [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops)로 이동했어요. GitHub redirect와 repository ID 1201476594로 확인하고 예전 주소를 alias로 남겼어요.

## 전 분야 개선과 기기별 적용 — 2026-09-12

[학습 절차](DEX_GROWTH_PROTOCOL.md)의 실제 업무 결과·피드백 후보를 기존 일일/주간 Task 입력으로 받아요. 개발·마케팅·사업·리서치의 품질, 재작업, 반복 입력 감소를 평가하고 새 자동화는 만들지 않아요. 공통 운영 Skill source 1.1.1은 Runtime PR #203의 승인 main 58860eec7f9eed5dc53687b4c3a08323ddf47ece에 반영됐어요. [병합·검증 기록](../10_Projects/DexCompany-Ops/Tasks/DEX-PORTABLE-OS-20260912/MERGE_REVIEW.md)과 Registry의 manualIntegration을 확인해요. 실제 설치는 Not Checked이고 과거 정기 lastRun은 그대로 보존해요. PR #97의 1.2.0을 통합할 때 1.1.1의 변경도 보존해요.

[기기 독립 기준](DEVICE_INDEPENDENT_EXECUTION.md)에 따라 source 검토, 공통 행동 검증, 기기별 설치·실행 검증을 분리해요. PR #97의 명시된 Windows 고유 Gate와 legacy 비삭제 기준은 유지해요. 이 Gate를 무관한 공통 Skill 수정의 선행 조건으로 확대하지 않아요. Registry의 observed/reviewed/applied/installed 상태는 실제 증거가 바뀔 때만 갱신해요.

## 2026-09-20 수동 학습 요청 후속

에던의 최신 트렌드 선별 학습 요청은 기존 Task에서 이어가요. [후보·출처·검수·인계](../10_Projects/DexCompany-Ops/Tasks/DEX-SKILL-MAINTENANCE-20260911/TREND_REVIEW-20260920.md)와 [Governance §13–14](DEX_SKILL_PLUGIN_GOVERNANCE.md)를 적용해요. 정기 점검 주기, Registry의 설치 상태, Runtime 버전과 기존 대기 PR을 바꾸지 않아요.
