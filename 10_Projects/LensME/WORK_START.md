# Work 실행 명령어

아래 명령은 Work에 붙여 넣는 실행 요청이에요. 문서 PR을 main에 반영하기 위한 명시적 승인도 이 명령 안에 포함돼요. 아직 이 문서를 작성한 것만으로 승인·실행된 것은 아니에요.

```text
Dex Company에서 LENS ME 솔루션 개발을 진행해.

기준 저장소는 ethanhee890-commits/dex-company-wiki, 프로젝트는 10_Projects/LensME, Task ID는 LM-20260918-001이야. 기존 Lens Screen/렌즈 스크린 프로젝트의 연속 작업이며 이미 완료한 작업을 재구현하지 마.

먼저 최신 main의 AI_CONTRACT.md와 CURRENT_STATE.md를 읽어. 프로젝트 기준 등록 브랜치 docs/lensme-foundation-20260918의 PR이 아직 열려 있다면 변경 범위·출처·검증 결과·충돌을 검수해. 문제가 없는 이번 LENS ME 문서 등록 PR의 main 병합을 승인해. 다른 PR·코드 병합·배포 승인으로 확대하지 마. 이미 병합됐다면 다시 처리하지 말고 최신 main을 사용해.

그다음 PROJECT_CONFIG.md → CURRENT.md → SESSION_HANDOFF.md → DECISIONS.md → Tasks/LM-20260918-001/TASK.yaml을 읽고, Design/DESIGN_GUIDE.md, Design/DESIGN_TOKENS.json, PRODUCT_SPEC.md, QA_ACCEPTANCE.md, ROADMAP.md를 필요한 범위만 읽어.

연결된 프로젝트 자료와 실제 저장소에서 기존 코드·인계 패키지·PROJECT_INSTRUCTIONS.md·START_SOL.md를 찾아 실제 위치·현재 브랜치·미반영 변경을 확인해 이어받아. 코드 저장소를 추측하거나 Wiki 안에 앱 코드를 만들지 마. 기존 저장소가 확인되지 않으면 구현 준비·DEMO 스키마·테스트 설계는 계속하되 코드 저장소 지정/생성에 필요한 최소 결정만 요청해.

승인된 시안의 분위기를 유지하면서 사진 촬영이 아닌 자연스러운 상반신 LIVE, 양쪽 눈 동일 렌즈 적용, 맨눈 비교, 다중 브랜드 선택, 브랜드별 상품, 상품명/상품코드 검색, 매장 재고와 상품 위치 안내를 구현해. 실제 상품 자료는 추후 제공하므로 DEMO 브랜드·상품·SKU·재고·위치를 명확히 표시하고 데이터 어댑터로 실제 연동과 분리해. 얼굴형·퍼스널컬러 판정이나 AI 추천은 첫 개발의 필수 조건으로 삼지 마.

순서는 ① 기존 작업 인계/기술 확인 ② 토큰과 대표 LIVE 화면 구현·검수 ③ 브랜드/상품/검색 ④ 옵션별 재고·위치 ⑤ 비교·세션 초기화·오류 복구 ⑥ 테스트·빌드·설치/실행 안내야. 각 체크포인트는 가능한 범위까지 실제 작성·테스트·수정하고 증거를 남겨. 기존 스택은 근거 없이 변경하지 마.

권한 거절, 다중 얼굴, 깜빡임·고개 회전, 추적 유실, 카메라 중단, 검색 없음, 재고 미확인·품절·동기화 지연, 오프라인, 글자 넘침, 세션 종료 후 개인정보 잔존을 검사해. Galaxy Z Flip5와 Galaxy Tab S10 FE+의 실제 테스트 절차와 가능한 설치 산출물을 준비해. APK, PWA 또는 다른 형식은 확인된 스택/빌드 환경에 맞추고 실기기가 없으면 검증 완료라고 쓰지 마. 키오스크 하드웨어 미정 때문에 다른 개발을 중단하지 마.

얼굴/영상 저장·외부 전송·학습, 유료 API, 자동 유료 fallback, 권한 확대, 운영 배포는 실행하지 마. 코드는 프로젝트 저장소의 작업 브랜치와 PR로, 결정·설계·QA·출처·상태·인계는 Wiki로 관리해. 같은 Task의 체크포인트를 이어 쓰고 Work 실행 경로가 없으면 가능한 GitHub Task Bus/검증된 worker 경로를 사용하되 기동·완료를 가장하지 마.

최종 결과는 실제 변경 파일과 PR, 테스트 증거, 빌드/설치 파일, PASS/FAIL/Not Checked, 남은 blocker, 에던의 최소 행동 순서로 보고해. CURRENT.md, SESSION_HANDOFF.md, QA_REPORT.md와 Task 결과도 갱신해.
```
