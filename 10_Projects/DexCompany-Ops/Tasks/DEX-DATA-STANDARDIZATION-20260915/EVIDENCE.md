# 데이터 정리 진단과 실행 증거

> Public-copy redaction (2026-10-16): individual project records were removed at the owner’s request. Remaining historical results apply only to their original revision and scope.

- Task: DEX-DATA-STANDARDIZATION-20260915
- 기준 main: `b3a24f4922bde287895c993189df28ae0a4877a7`
- 기준 Git tree: `eece778fdf44bdb4c25de81804f2372193a03543`
- 조사일: 2026-09-15 / Asia/Seoul
- 범위: 전체 tree metadata + 선별한 계약·상태·schema·Task 원문
- 상태: [PR #185](https://github.com/ethanhee890-commits/dex-company-wiki/pull/185) 독립 검수·에던 승인 후 main 병합 및 병합 후 검사 PASS. 1차 참조·검사 기반 정리 완료, 전체 의미 정규화는 후속 범위예요.
- Raw 집계와 동일 blob 묶음: [AUDIT.json](AUDIT.json)

## 전체 후보군과 필터

| 경로별 후보군 | 파일 수 | 이번 처리 기준 |
|---|---:|---|
| 10_Projects | 227 | 4개 등록 프로젝트, 공통 운영 문서와 3개 Task 구조 검토 |
| 30_Knowledge | 204 | entry/schema/운영 가이드 선별; 개별 note 전수 내용 검토는 미실행 |
| 70_Outputs | 228 | 역사적 출력으로 보존; 원본 지식으로 자동 승격하지 않음 |
| 20_Codex_Handoff | 30 | 공통 표준·목록·지식 검증 절차의 중복/구식 참조 점검 |
| root | 18 | 공통 계약과 상태 효력 확인 |
| 00_Inbox | 4 | 미검증 입력으로 보존 |
| 99_Templates | 4 | Task/Result v2와 현행 기록 형태 비교 |
| providers | 4 | 파일 위치 확인, OpenAI adapter 최소 확인; 실제 가용성 미판정 |
| CI·검사 도구 | 4 | 기존 읽기 전용 검사와 보존 Gate 유지 |
| 편집기 호환 설정 | 4 | 공식 core와 분리해 보존 |
| 40_References / 90_Archive | 2 | 보존 |
| 합계 | 729 | 본문 전체를 무차별 로딩하지 않음 |

필터: ① ID·원본·상태·시간의 의미가 명확한가 ② reader/CI와 기존 링크를 보존할 수 있는가 ③ 삭제·실행 정책 변경 없이 되돌릴 수 있는가.
두 기준을 교차 확인했어요: Git tree의 경로·blob SHA·전체 범위, 실제 계약/schema/생성기/선별 원문의 의미.

## 진단과 처리

| ID | 판단 | 확인 내용 | 조치·잔여 |
|---|---|---|---|
| DATA-01 | confirmed | PROJECT_INDEX는 예전 운영 상태와 PC 경로를 별도 표로 유지 | ID/원문 참조 catalog에서 생성하는 목록으로 교체 |
| DATA-02 | confirmed | 4개 DATA_MODEL은 같은 66-byte 빈 template blob | DexCompany-Ops 모델을 채움; 다른 프로젝트의 실제 모델은 미확인으로 보존 |
| DATA-03 | confirmed | 운영 8문서는 OPS_SNAPSHOT+generator로 관리되는 의도된 중복 | 문서·원문·기존 검사를 모두 유지; 임의 요약/삭제하지 않음 |
| DATA-04 | confirmed | 3개 Task 중 2개 flat taskId, 1개 task.id v2 | 신규 Task는 v2; 기존 2개는 승인·checkpoint reader 영향 확인 후 변환 후보 |
| DATA-05 | confirmed | 지식 schema의 Operations가 과거 .ps1 helper를 직접 지시 | 현행 운영 가이드 참조로 연결; 검증 metadata 필드는 그대로 유지 |
| DATA-06 | confirmed | 지식 schema가 created/dateCreated, updated/dateModified를 함께 요구 | alias 중복은 현행 호환 계약; 필드 삭제 없이 후속 mapping 계획 |
| DATA-07 | confirmed | 같은 blob 14묶음·61파일·첫 파일 제외 47개 | 빈 파일/템플릿/복사된 role 문서 포함; 자동 삭제 0 |
| DATA-08 | confirmed | OPS_SNAPSHOT은 09-12 plugin 1.1.1, registry는 09-15 source 1.1.2 | 다른 날짜·검증 범위의 관측으로 유지; 설치 PASS 또는 snapshot 최신화로 자동 전환하지 않음 |
| DATA-10 | inference | 다른 프로젝트 config의 host 경로와 adapter 고정 설정에는 후속 검증이 필요 | 실제 저장소/host/capability 확인 전 추정값으로 덮어쓰지 않음 |

`TASK.yaml`에 JSON 표기를 쓴 v2 기록은 YAML과 호환되는 표현이에요. 확장자와 표시 문법이 다르다는 이유만으로 손상으로 판정하지 않아요.
체크포인트·상태·소스·설치의 날짜가 다른 경우, 단순 불일치가 아니라 관측 범위 차이일 수 있어요.

## 적용 파일과 유지 범위

- DATA_STANDARD: 분류·형식·판정·ID·출처·날짜·alias와 migration 기준
- DATA_CATALOG: 4개 프로젝트와 10개 기준 원문의 참조; mutable 상태값 복제 없음
- PROJECT_INDEX: catalog 기반 생성 문서
- DexCompany-Ops DATA_MODEL: 엔티티·식별자·관계·검증 범위
- LLM_WIKI_VERIFICATION_SCHEMA: Operations 4개를 공통 운영 가이드로 참조
- scripts/data-catalog.mjs 및 테스트: 기본 읽기 전용 검사
- 기존 CI: 새 검사 2개를 추가하며 기존 명령·권한은 그대로 유지
- 이 Task Packet, Result, 진단과 집계 evidence

8개 기존 운영 문서, snapshot, 기존 검사 소스, 기존 Task/Skill/지식 원문, Runtime과 열린 PR에는 변경하지 않아요.
열린 Wiki PR 7개(#5/#7/#12/#16/#84/#164/#178)의 변경 경로를 대조했으며 이번 변경 경로와 직접 겹치지 않아요. PR #12를 나중에 병합할 때 새 프로젝트의 catalog 등록을 같은 PR에 포함해야 새 등록 누락 검사를 통과해요.

## 검증

| 검사 | 결과 | 범위 |
|---|---|---|
| tree 전체 수집 | PASS | truncated=false, 고정 tree의 blob 729개 |
| catalog 참조 | PASS | GitHub 실제 tree와 새 catalog 경로 대조 |
| unit/실패 시나리오 | PASS | 보완 후 catalog 10 + 기존 ops-state 8 = 18; PR run 34958424830 / main run 34958630653 |
| 기존 8개 문서의 실제 원문 byte 대조 | PASS | 전체 Git history의 node scripts/ops-state.mjs 실행: run 34957525349 |
| 링크·UTF-8·JSON/YAML·secret/diff | PASS | 변경 12개·내부 링크 25개·집계 재계산·secret-pattern 검출 0·whitespace 경고 0 |
| 원격 PR CI / readback | PASS | 구현 head 08760c9899e4446f9971334d4bb230a5cc6573c4; run 34957525349; 변경 12/12 내용 일치, 예상 외 변경·삭제 0 |
| 독립 모델 검수 | PASS | writer와 분리된 읽기 전용 검수; 보완 head e4b97b15f559a313dbcec1d86cede298f106c21a, 아래 최신 receipt 참조 |
| 전체 729파일 의미·누락·최신성 전수 검토 | Not Checked | 이번은 metadata 전체 + 본문 선별 |
| Runtime DB/설치본/실기기 | Not Checked | 이번 변경 대상 밖 |

## 후속 작업과 완료 기준

1. **1차 참조 정리 병합 — 완료**: PR #185의 보완 head CI·독립 검수 PASS와 에던 승인 후 main에 병합했어요. 병합된 main의 검사도 PASS예요.
2. **Task 호환 정리**: 기존 flat 2개 원문과 reader/Runtime schema를 확인해 필드 대응표를 작성해요. Task ID·승인·checkpoint·미완료·실패 이유가 보존되는 read/round-trip 증거 전에는 원문을 변환하지 않아요.
3. **지식 메타데이터 정리**: source와 wiki의 실제 frontmatter를 작은 묶음으로 확인해요. date alias·source 참조·검증일·disputed·explored를 비교하고, 의미를 모르면 unknown으로 남겨요. 구체적 변경 범위와 회귀 기준을 같은 Task 후속 checkpoint에 기록해요.
4. **복사된 공통 지침 정리**: 14개 동일 blob 묶음 중 방법 문서의 reader와 고유 내용을 확인해요. 한 원본+참조로 전환할 후보를 diff로 제시하고, 기존 파일명/링크의 호환 여부를 확인해요. template·빈 파일은 필요성을 따로 판단해요.
5. **프로젝트 실행 정보 정리**: 승인 프로젝트 config의 실제 code repository/host 경로를 확인해요. 운영상 의미가 없는 경로를 추측한 새 값으로 대체하지 않아요. 후보 PR #12는 고유 내용·현재 main 충돌·승인 범위를 따로 검수해요.

완료는 문서 표준 작성만으로 판정하지 않아요. 실제 적용 영역별 중복 소유·끊어진 참조·구형 소비자 영향과 원문 보존을 증명하고, 남은 영역을 같은 Task에서 계속 추적해요.

## 위험과 rollback

- 새 검사 때문에 후속 프로젝트 추가 PR은 catalog/index도 함께 수정해야 해요. 기존 열린 PR #12가 해당해요.
- 일반 파일명/본문을 일괄 정규화하지 않았으므로 기존 reader migration 위험은 이번 단계에서 발생시키지 않아요.
- 병합 전에는 PR을 유지하면 승인 main에 영향이 없어요. 병합 후 문제 발생 시 이 PR commit만 정상 revert하고, 과거 원문·Task·다른 PR을 되돌리지 않아요.
- 검사 실패를 피하려고 기존 ops-state Gate를 삭제하거나 skip하지 않아요.
- AI_CONTRACT §9와 AGENTS의 main 승인 규칙은 에던의 명시 승인 “PR #185 검수 후 병합 승인”(2026-09-15 이 대화)으로 충족했어요. 이 승인은 검수·보완·병합과 같은 Task의 결과 기록에 적용했어요. 후속 데이터 migration은 이번 병합 범위에 포함하지 않아요.

## 출처

- [기준 tree](https://api.github.com/repos/ethanhee890-commits/dex-company-wiki/git/trees/eece778fdf44bdb4c25de81804f2372193a03543?recursive=1)
- [공통 계약](https://github.com/ethanhee890-commits/dex-company-wiki/blob/b3a24f4922bde287895c993189df28ae0a4877a7/AI_CONTRACT.md)
- [기존 프로젝트 목록](https://github.com/ethanhee890-commits/dex-company-wiki/blob/b3a24f4922bde287895c993189df28ae0a4877a7/20_Codex_Handoff/PROJECT_INDEX.md)
- [운영 snapshot](https://github.com/ethanhee890-commits/dex-company-wiki/blob/b3a24f4922bde287895c993189df28ae0a4877a7/10_Projects/DexCompany-Ops/OPS_SNAPSHOT.json)
- [운영 생성·검사기](https://github.com/ethanhee890-commits/dex-company-wiki/blob/b3a24f4922bde287895c993189df28ae0a4877a7/scripts/ops-state.mjs)
- [지식 verification schema](https://github.com/ethanhee890-commits/dex-company-wiki/blob/b3a24f4922bde287895c993189df28ae0a4877a7/20_Codex_Handoff/LLM_WIKI_VERIFICATION_SCHEMA.md)
- [Task v2](https://github.com/ethanhee890-commits/dex-company-wiki/blob/b3a24f4922bde287895c993189df28ae0a4877a7/99_Templates/TASK_PACKET.yaml)
- [Skill 목록](https://github.com/ethanhee890-commits/dex-company-wiki/blob/b3a24f4922bde287895c993189df28ae0a4877a7/20_Codex_Handoff/DEX_SKILL_REGISTRY.json)

## 최초 구현의 원격 검증 receipt (이력)

- 구현 head: `08760c9899e4446f9971334d4bb230a5cc6573c4`
- CI: [34957525349](https://github.com/ethanhee890-commits/dex-company-wiki/actions/runs/34957525349) / pull_request / success
- 실제 단계: 기존 unit tests, 원문 보존 검사, 새 unit tests, catalog 실제 Git 참조 검사 모두 success예요.
- 이 receipt는 위 구현 commit의 검증이에요. receipt 기록 후 생기는 문서-only commit의 최종 CI는 PR 본문에서 별도로 확인해요.
- 원격 tree에서 요청한 12개 경로만 바뀌었고 삭제 0, 그 밖의 blob SHA는 기준 main과 일치해요.

## 검수·보완·승인·병합 receipt (최신)

- 사용자 승인: 에던의 “PR #185 검수 후 병합 승인” — 2026-09-15, 같은 대화에서 확인했어요.
- 보완 head: `e4b97b15f559a313dbcec1d86cede298f106c21a`
- 검수 발견 사항: `git ls-files`만 확인하면 추적 파일을 로컬에서 지우거나 디렉터리로 바꿔도 참조 검사가 PASS를 반환했어요. 두 실제 Git fixture로 보완 전 실패를 재현했어요.
- 보완: catalog, 필수 참조와 생성 index의 실제 regular file 및 정규 경로를 확인해요. 보완 후 기존 16개와 새 회귀 2개, 총 18개 테스트가 PASS예요.
- 독립 검수: writer와 분리된 `/root/review_data_normalization` 읽기 전용 검수에서 보완 head를 재확인했어요. 전체 tree 729파일, 동일 blob 14묶음/61파일/첫 파일 제외 47개를 독립 재계산했고, 원격 원문·12개 변경 경로·삭제 0·CI와 두 회귀 fixture를 대조했어요. 검수 범위에서 병합 차단 사항은 없어요.
- 독립 검수 대상 script SHA-256: `a6c8de09b3919a2196689a4a254980be332cd796cddbdeedf2537feee81bf0ed`
- 독립 검수 대상 tests SHA-256: `b61be8ffa5753d6446d5439d81688cfa72d8d9c437115277fdbc0fbc2844cef8`
- 보완 head CI: [34958424830](https://github.com/ethanhee890-commits/dex-company-wiki/actions/runs/34958424830) / pull_request / success
- 병합: [PR #185](https://github.com/ethanhee890-commits/dex-company-wiki/pull/185), merge commit `060bbfb51e3f07a9a4b7cb79a2233456f108d9d8`
- 병합 main tree: `9ed61f5ab7c5ef87b54202982d58ae48d9eef838`
- 병합 main CI: [34958630653](https://github.com/ethanhee890-commits/dex-company-wiki/actions/runs/34958630653) / push / success / 완료 `2026-09-15T10:34:16Z`
- 실제 main 실행 단계: 기존 unit tests, 8개 운영 문서 일치·원문 byte 보존 검사, catalog unit tests, catalog 실제 Git 참조 검사 모두 success예요.
- 이 receipt는 실제 검증된 위 commit들을 가리켜요. receipt 자체의 후속 문서 commit을 검증했다고 소급 주장하지 않아요. 기록 반영 PR의 CI·병합 결과는 해당 PR 본문에 남겨요.
- 결과 범위: 1차 참조·검사 기반 정리는 완료했어요. 전체 문서의 의미·최신성, 기존 Task/지식 metadata migration, Runtime DB·설치본·실기기·외부 capability는 이번 완료 판정에 포함하지 않아요. 위 후속 목록과 Not Checked를 유지해요.
