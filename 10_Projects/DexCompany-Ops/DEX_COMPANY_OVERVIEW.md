# Dex Company 운영 개요

Dex Company는 에던이 개발·마케팅·사업·리서치 등 전 분야의 작업을 여러 기기와 AI에서 이어가고, 검증한 지식과 방법을 축적하는 개인 AI 운영체계예요.

전역 정의는 [공통 개요](../../20_Codex_Handoff/DEX_COMPANY_OVERVIEW.md), 최상위 규칙은 [AI 계약](../../AI_CONTRACT.md)을 따라요. 이 파일은 Ops 진입점이고 별도 정책 원본이 아니에요.

| 구성 | 역할 |
|---|---|
| Wiki / Control Plane | 정책, 프로젝트 상태, 결정, 지식, Skill Registry |
| Dex Runtime | 실행 경로 조정, Task Bus 연계, worker 관리 |
| Marketplace / Plugin | 공통 운영 Skill과 선택 업무 Skill의 검토된 소스 배포 |
| Capabilities | GitHub·MCP·AI·파일·빌드·테스트·배포 등 실제 사용 가능한 능력 |
| QA / Watchdog | 원래 목표에 대한 독립 검수, 증거, 복구 |
| 학습 절차 | 업무 피드백 → 후보 방법 → 비교 검증 → 승인된 적용 → 재사용 결과 확인 |

[기기 독립 기준](../../20_Codex_Handoff/DEVICE_INDEPENDENT_EXECUTION.md)과 [학습 절차](../../20_Codex_Handoff/DEX_GROWTH_PROTOCOL.md)를 사용해요. Galaxy·iPhone·Windows·Mac은 접근 환경이고 실제 실행 host와 별개예요. 필요한 기능과 조합별 증거로 사용 가능 여부를 판단해요.

현재 소스 수정, 승인 main, 설치본, 실제 기기 호출 결과는 각각 다른 상태예요. 준비되지 않은 연결을 썼다고 하거나 Windows 미검증을 Dex 전체 사용 금지로 해석하지 않아요. 전체 개선 진행은 [Task](Tasks/DEX-PORTABLE-OS-20260912/TASK.yaml)와 [결과·인계](Tasks/DEX-PORTABLE-OS-20260912/RESULT.md)에서 이어가요.
