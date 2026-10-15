# Project Index

<!-- Generated from DATA_CATALOG.json by scripts/data-catalog.mjs. -->

승인 main에 등록된 프로젝트의 기준 문서로 이동해요. 프로젝트 식별자와 문서 위치는 [데이터 목록](DATA_CATALOG.json)에서 관리해요. 현재 상태·버전·검증 결과는 각 원본 문서에서 확인하고 이 목록에 다시 적지 않아요.

| 프로젝트 | 설정 | 현재 상태 | 작업 인계 |
|---|---|---|---|
| DexCompany-Ops | [설정](../10_Projects/DexCompany-Ops/PROJECT_CONFIG.md) | [현재 상태](../10_Projects/DexCompany-Ops/CURRENT.md) | [이어가기](../10_Projects/DexCompany-Ops/SESSION_HANDOFF.md) |

## 등록 기준

- 프로젝트 소유자와 지식 문서 위치를 확인한 뒤 등록해요. 코드가 필요한 프로젝트는 실제 코드 저장소 또는 승인된 실행 위치도 확인해요.
- 특정 PC의 경로는 실행 환경 참고정보예요. 경로의 현재 존재 여부와 실행 권한은 사용할 때 다시 확인해요.
- 개인정보 가능성이 있는 CareerOps 작업대는 자동 등록하지 않아요.
- 별도 제품은 별도 저장소가 확정된 뒤 새 프로젝트로 등록해요.
- 열린 PR에만 존재하는 프로젝트는 승인 main 등록 프로젝트에 포함하지 않아요.

## 보관 기준

- 비활성 프로젝트를 90_Archive로 이동하려면 에던의 승인이 필요해요.
- 상태·인계·검증은 프로젝트별 CURRENT.md, SESSION_HANDOFF.md, QA_REPORT.md에서 확인해요.
- 데이터 형식·중복·이력 관리 기준은 [DATA_STANDARD.md](DATA_STANDARD.md)를 따라요.

이 문서는 생성 결과예요. 데이터 목록 수정 후 `node scripts/data-catalog.mjs --print-project-index`로 내용을 생성하고, 파일에 반영한 뒤 기본 검사 명령을 실행해요.
