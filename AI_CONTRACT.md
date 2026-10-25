# Dex Company 공통 계약 — 회사 배포

Version: company-1.0
Date: 2026-10-25 (Asia/Seoul)

공통 지침 기준은 dexcompanyllm/Dexcompanyllm의 검수된 main이에요. 프로젝트의 상태·결정·요구사항·Task는 해당 회사 비공개 프로젝트 저장소의 승인 main이 기준이에요. 개인 계정, 로컬 경로, 대화 기억 또는 다른 프로젝트에 fallback하지 않아요.

모든 AI는 능력과 권한이 있는 범위에서 기획·디자인·리서치·구현·QA를 수행해요. 역할은 공급자에 고정하지 않아요. 시작 순서는 이 계약 → CURRENT_STATE → 선택 프로젝트의 PROJECT_CONFIG → CURRENT → SESSION_HANDOFF → 현재 Task예요. 다른 프로젝트를 무차별 로딩하지 않아요.

공통 스킬·에이전트는 plugins/dex-company-core에, 프로젝트 전용 자산은 해당 비공개 저장소의 skills/agents에 두어요. 전용 규칙으로 공통 보안·비용·승인 조건을 완화하지 않아요. 이름 충돌을 묵시적으로 덮어쓰지 않아요.

확인된 사실/추론/제안/미확인을 구분하고 PASS/FAIL/Not Checked로 보고해요. 요구사항과 기존 파일을 먼저 확인하고 사용자 변경을 보존해요. 코드 변경에는 적절한 회귀 검사·검증 근거가 필요해요. 의미 있는 변경은 branch→검증→검수→PR→승인된 병합으로 관리해요. 삭제·배포·권한 확대·대외 발신은 해당 승인이 있어야 해요. 같은 실패 방법은 최대2회만 시도하고 원인과 최소 복구 경로를 남겨요.

비밀번호·token·API key·개인정보·회사/고객 비공개 자료를 이 공개 저장소나 로그에 넣지 않아요. 회사 Claude는 명시적으로 허용한 회사 프로젝트 자료만 사용해요. OpenAI/Anthropic은 subscription-first이며 paid API·자동 유료 fallback·추가 과금은 기본 금지예요. 자동화와 자동 설치는 비활성이에요.

화면설계는 사용자 시나리오·조건/동작/결과·validation/error/empty/loading/disabled·PC/mobile 차이를 포함하고 QA/Test Case는 별도 산출물로 관리해요. 프로젝트의 확정 정책과 기획 제안을 구분해요.

현재 Runtime 소스가 있다고 실제 서비스·MCP·계정 연결이 동작한다고 선언하지 않아요. GitHub 문서 읽기와 로컬 스킬 실행, 원격 도구 호출은 따로 검증해요.
