# DexCompany-Ops 작업 지침

이 프로젝트는 개발·마케팅·사업·리서치 등 전 분야에서 사용하는 에던의 개인 AI 운영체계와 공통 실행·학습 기반을 관리해요. 다른 프로젝트의 업무 자료는 해당 프로젝트에 보존해요.

## 기준과 최소 읽기

승인 Wiki main의 `AI_CONTRACT.md` → `CURRENT_STATE.md` → 이 프로젝트의 `PROJECT_CONFIG.md`, `CURRENT.md`, `SESSION_HANDOFF.md` → 기존 Task/checkpoint를 읽어요. 역할·설계·출처 문서는 지금 작업에 필요한 부분만 추가해요. 로컬 경로, 특정 OS, 특정 AI의 대화는 기준정보가 아니에요.

- Wiki: `ethanhee890-commits/dex-company-wiki`
- Runtime·배포용 Skill source: `ethanhee890-commits/ethanhee890-commits-dex-company-runtime`
- 실제 프로젝트 코드: 해당 `PROJECT_CONFIG.md`의 저장소
- 이번 전체 개선: `Tasks/DEX-PORTABLE-OS-20260912/TASK.yaml`과 `RESULT.md`
- 기기별 의존관계: `20_Codex_Handoff/DEVICE_INDEPENDENT_EXECUTION.md`
- 지속 학습: `20_Codex_Handoff/DEX_GROWTH_PROTOCOL.md`

## 실행

1. 원래 목표, 보존 대상, 범위·기존 승인, 완료 기준을 확인하고 같은 Task에서 이어가요.
2. 역할 명령 없이도 필요한 capability를 판단해요. 화면설계 문서를 모든 업무의 선행 조건으로 만들지 않아요.
3. 접속 기기와 실제 실행 환경을 분리해요. Windows 고유 검증이 다른 검증된 경로를 포괄 차단하지 않게 해요. 미검증 기능은 PASS로 바꾸지 않아요.
4. 코드·파일 쓰기는 한 담당자만 수행하고 중요한 변경은 branch → 검증 → 독립 review → PR과 필요한 병합 기준을 따라요. 기존 사용자 변경과 비관련 파일을 보존해요.
5. 요금·권한·데이터 경계를 유지해요. 한도가 끝나면 안전한 checkpoint를 남기며 유료 fallback이나 권한 확대를 하지 않아요.
6. 의미 있는 결과·사용자 수정에서 재사용 가능한 개선을 기록하고 검증해요. 자동 설치나 모델 자체 재학습으로 표현하지 않아요.
7. 실제 `dex-watchdog`이 사용 가능하면 그 지침을 실행해요. 없으면 가능한 결정적 검사와 독립 검수를 수행하고 미실행 도구는 Not Checked로 남겨요. 실행하지 않은 도구의 PASS를 만들지 않아요.

## 기록과 인계

변경 파일·검증 근거·PASS/FAIL/Not Checked·미확인 경로·rollback·다음 최소 행동을 같은 Task에 남겨요. 과거 상태 생성 문서 8개는 `scripts/ops-state.mjs`와 동기화하고 보존 원문 바이트를 유지해요. 실제 기기가 없는 검사는 `DEVICE_CHECKS.md`에 준비해 두고 나머지 승인 작업을 계속해요.
