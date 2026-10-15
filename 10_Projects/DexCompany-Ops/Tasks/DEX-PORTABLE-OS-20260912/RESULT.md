# Dex 전체 개선 결과와 인계

핵심 개선 PR 4개를 검수하고 의존관계에 맞춰 main에 병합했어요. 이번 소스 반영과 자동 검증은 완료했으며 실제 기기·설치·선택 host 검증은 남아 있어요.

- Task: `DEX-PORTABLE-OS-20260912`
- 정확한 병합 SHA·검수·CI·복원 기준: [MERGE_REVIEW.md](MERGE_REVIEW.md)
- Runtime main: `58860eec7f9eed5dc53687b4c3a08323ddf47ece`
- [병합 후 Runtime CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/34676977854): total 286 / PASS 285 / FAIL 0 / Windows-only skip 1
- production dependency audit: total 0
- 공통 Plugin source: 1.1.1 / 실제 설치: Not Checked
- 기존 Vercel commit status: success / 실제 운영 HTTP·기기 E2E: Not Checked

## 8개 작업의 실제 상태

| 작업 | main에 반영한 것 | 남은 것 |
|---|---|---|
| 1. 목표·구조 | 전 분야 공통 계약, Ops 진입점의 특정 PC·Codex 전용 전제 제거, 역할 표 보정 | 실제 다양한 분야에서 반복 적용 |
| 2. 코드·보안 | 쓰기 전 dirty/default branch·경로 검사, 원래 Task 검수, 저장소별 coordination, OS 신원, hono/qs 보안 수정 | 실제 OS 신원·격리·프로세스 E2E |
| 3. 접속·실행 분리 | 기기와 무관한 provider 선택, unavailable 대기, 경로별 증거 평가 | 신뢰된 증거 저장·scheduler 연결, 자연어 목표 분해·위험 분류 |
| 4. 공통 편의성 | 동일 계정·탭의 30분 초안·재시도 ID 복원, 로그아웃·계정·만료 보호 | 실제 4종 기기, 미제출 초안 동기화·첨부·완전한 승인 UI |
| 5. 검증 의존관계 | 공통 안전 + 선택 접근·실행 경로, 전환 prompt의 Windows 포괄 차단 제거 | 실제 경로별 증거; #28 OPEN, #34/#35 blocked |
| 6. 스킬·학습 | 공통 Skill 1.1.1, 출처·비교·독립 검수·rollback을 포함한 결과 학습 | 실제 설치와 다음 업무에서 개선 효과 측정 |
| 7. 공급자 전환 | 기존 회사 계정 경계·9/20 보존·10/2 재개 계획, 고정 revision 설치 기준 | 계정·license·현재 지원 확인, Claude 실행 동등성·Gemini adapter |
| 8. 검증·운영 | 결합·병합 후 CI, 저장소별 결과 격리 검사, 역사 원문 보존, main 상태·Registry·인계 동기화 | 실제 전 분야 사용자 결과와 기기·AI 왕복 검증 |

## 달라진 이용 기준

Windows 검증은 Windows 실행 경로에 적용해요. iPhone으로 접속해 검증된 Mac worker를 사용하는 조합이나 Windows에서 결과만 조회하는 작업을 Windows worker 미검증 때문에 포괄 차단하지 않아요. 이 예시가 실제 검증을 통과했다는 뜻은 아니에요.

기존 승인된 읽기·PWA·GitHub 사용과 비용·권한 기준은 유지해요. 다른 기기나 AI에서 같은 Task·목표·승인·결과 receipt를 읽고 이어가요. source 변경은 자동 설치나 모델 가중치 학습이 아니에요.

## 독립 Skill 행동 검증

두 개의 독립 실행에 수정 Skill과 최소 업무 자료만 제공했어요. 실제 프로젝트 자료·고객정보를 사용하지 않았고 외부 변경·설치는 허용하지 않았어요.

| 모의 업무 | 관찰한 결과 | 상태 |
|---|---|---|
| iPhone에서 시작한 마케팅 초안을 Mac의 다른 AI에서 이어가기 | 같은 Task·기존 승인·통계 receipt 유지, 문구 2종·비교표 작성, Windows 미검증을 텍스트 초안 차단으로 확대하지 않음 | PASS — 제공된 모의 업무 범위 |
| 부정확한 연구 결과에서 학습하고 외부 스킬·회사 Claude 사용 판단 | 가격 확인일·사실/추론 문제 분리, 전체 폴더 권한과 자동 신뢰 요구 거부, 일괄 설치·미승인 데이터 이동 금지 | PASS — 제공된 모의 업무 범위 |

이전 모의 검사 당시 두 실행 모두 아직 main에 없던 새 정책 문서의 404를 확인하고 적용/설치 완료를 주장하지 않았어요. 이 결과는 실제 설치 검증이나 독립 코드 보안 review를 대신하지 않아요. 기존 방식 대비 개선율·시간 절감은 측정하지 않았어요.


## 후속 작업과 주의할 의존관계

- #194와 #203은 결합 후 검증·병합됐어요. 과거 moderate 2건 상태를 현재 결과로 반복하지 않아요.
- Wiki #176의 초기 SHA·CI는 역사 증거이고 최신 기준은 MERGE_REVIEW.md예요.
- Runtime #97의 1.2.0은 설치·Windows/SVG·정확한 rollback Gate가 남은 별도 후보예요. 다음 통합에서 이번 1.1.1 변경을 보존해요.
- Runtime #200 + Wiki #178의 legacy 후보와 16개 미실행 행동 검사는 별도예요. 일괄 설치하지 않아요.
- Wiki #16의 옛 운영 상태를 최신 문서 위에 병합하지 않고 PR·증거를 보존해요. #12의 SaveTheChildren 작업은 이번 범위 밖으로 유지해요.
- 새 coordination key를 실제 실행자에 적용하기 전 모든 broker/consumer를 중지·drain하고 기존 lease/receipt와 owner를 확인해요. 혼합 버전 실행과 불명확한 lease 삭제는 금지예요.
- 회사 AI에 private Wiki/Runtime이나 개인·고객 자료 전체를 기본 제공하지 않아요. 허용된 최소 자료만 사용해요.
- 기존 자동화의 schedule/enabled·요금·권한을 이번 병합 작업에서 바꾸지 않았어요.

실제 기기가 필요해지는 시점에는 [기기 검사와 입력 문장](DEVICE_CHECKS.md)을 사용해요. 지금은 같은 목표나 이미 승인된 병합을 다시 요청할 필요가 없어요.

## 2026-09-19 후속 — ChatGPT Plus 운영 최적화

ChatGPT Plus 계정에서도 일상 Dex 업무를 지속하기 쉽도록 Runtime PR [#240](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/240)을 검증하고 main `438c578307c3af77fa9be05fab8fb84879453ed3`에 병합했어요.

- Plus account 자동 감지 뒤 routine은 Luna, standard는 Terra, complex·critical은 Sol로 선택해요.
- Astra는 명시적 선택 또는 기록된 reasoning validation 실패 checkpoint로 제한해요.
- 기존 Pro·미확인 plan의 balanced Sol/Astra 정책은 유지해요.
- 최소 파일·증거 재사용·결정적 검사 우선 prompt와 verifier의 원본 Task 중복 제거를 반영했어요.
- subscription-only, paid API/fallback·credit·extra usage·Fast mode 비활성 경계는 유지해요.
- Runtime branch CI Run 973, production dependency audit, Vercel, tested-head/main-merge tree 일치는 PASS예요.
- 실제 Plus worker `account/read`·Luna/Terra E2E와 account Usage 절감률은 host 부재로 Not Checked예요. 다른 source 작업을 차단하지 않아요.
- 복원은 force reset이 아니라 #240 merge revert PR을 사용해요.

정확한 정책·검증·미확인 항목·다음 최소 확인은 [CHATGPT_PLUS_EFFICIENT_PROFILE_20260919.md](../../CHATGPT_PLUS_EFFICIENT_PROFILE_20260919.md)에 기록했어요. 이 후속 기록은 위 2026-09-12 receipt를 소급 변경하지 않아요.
