# Dex 디자인 시스템 개선안 v1

검토일: 2026-09-17 KST · source release: 2026-09-19 KST · 상태: Runtime source 병합·main CI PASS / 승인 host 파일럿 대기 · Task: DEX-DESIGN-QUALITY-20260917

## 현재 checkpoint — 아래 과거 후보 상태를 대체해요

Runtime PR #235는 최신 main #239를 통합한 `b786291395e8a064cb7b49c262eeb6f570521f76`에서 전체 CI·3-OS 검증을 통과하고 `dd461ac508f950bd3757db48795655e623e31b21`로 병합됐어요. 실제 merge SHA의 main CI #958 `35412400579`도 PASS예요. 상세 근거는 QA_REPORT/RESULT를 봐요. 아래 최초 조사·후보 비교와 역사적 baseline은 보존해요.

에던이 Runtime/Wiki 병합과 승인 host 설치·실사용 검증을 승인했어요. Wiki registry는 이 Runtime merge SHA를 소스로 승격하며 Wiki PR #192가 승인 main에 병합된 뒤 효력이 있어요. 설치·fresh-session·실제 렌더/WCAG는 Not Checked, 개선 효과·총시간·사용자부담은 Not Measured예요. 현재 Work에는 승인 host 연결과 codex 실행기가 없어 설치하지 않았어요. 다음 실행은 PILOT_PLAN.md의 대표 3건이며 불명확하면 최대 5건까지 비교해요. 과거 문서의 승인 대기 문구를 재승인 요구로 사용하지 않아요.

## 1. 결론

Dex의 디자인 개선 목표는 더 많은 스타일을 모으는 것이 아니라, 에던이 선택한 방향을 매번 정확하게 재현하고 실제 산출물로 검증하는 것이에요. 공통 품질 기준과 프로젝트별 표현을 분리하고, 대표 화면을 먼저 완성한 뒤 확장하는 체계를 제안해요. “최고”나 “AI 느낌 0%”를 인증할 수는 없어요. 대신 컨셉 이탈, 글자 잘림, 불규칙한 간격, 상태 누락을 재현·수정·검수하는 증거를 남겨요.

이번 산출물은 진단·운영 설계와 실행 가능한 증거 검사 도구예요. 전체 제품의 시각 리뉴얼, 운영 배포, 설치 완료를 뜻하지 않아요.

## 2. 현재 확인한 근거

| 구분 | 확인 결과 | 의미 |
|---|---|---|
| 최초 조사 Wiki main | 41c7376519b4b2caed05ce649a7dfd8834dd0b00 | 최초 intake의 계약·상태·정책 근거예요. 역사적 근거로 보존해요 |
| 최초 조사 Runtime main | e22d350fa6da9786bc45152959f42f826716e119 | 최초 후보 제작 당시 공식 package 1.1.3 기준이에요 |
| 최신 통합 Wiki main | 75e05586e1f27ca24242e84de0300b50e7658ebc | 현재 정책·Task·registry 주변 상태를 다시 확인했어요 |
| 최신 통합 Runtime main | ef3ee1d5f5ba5f07643c9a2e76ee1b09166a0fda | 공식 package 1.1.4와 #234 자동 인계, #237 Task context, #238 capability/cost guard를 포함해요 |
| 기존 품질 규칙 | DEX_QUALITY_LEARNING_RULES에 방향·간격·타이포·반응형 검수가 있어요 | 규칙이 전혀 없었던 상태는 아니에요 |
| 디자인 후보 | registry의 brief-grounded-visual-design-review는 검토됐지만 미적용이에요 | 외부 Skill 학습·후보 등록과 실행은 다른 상태예요 |
| Console 소스 | styles.css / index.html / app.js 읽기 완료 | 실제 UI 구현의 위험 지점을 확인했어요 |
| 운영 화면 | 최초 조사 세션의 cloud browser에서 dexcompany.app이 502 Connection refused를 반환했어요 | 이 과거 접속 경로의 화면 검수는 Not Checked예요. 현재 상태나 전체 서비스 장애로 단정하지 않아요 |
| 연결 작업 | #234 병합 d173ae3, #237 병합 269d7e7, #238 병합 ef3ee1d; PR #97은 별도 draft | #235는 이 상태를 보존해 최신 main에 통합·hardening·재검증했어요 |

소스에서 확인된 것은 구조적 위험이에요. 에던이 경험한 모든 디자인 오류의 원인을 직접 재현한 것은 아니며, 기존 산출물 전체에 대한 시각 감사도 아니에요.

## 3. 왜 오류가 반복될 수 있나요?

| 현상 | confirmed: 소스 근거 | inference: 반복 원인 | 대응 |
|---|---|---|---|
| 패딩이 제각각이에요 | Console의 색상 일부만 변수이며 다수 간격·모서리·타입값은 직접 지정돼 있어요 | 같은 역할을 매번 다른 값으로 생성할 수 있어요 | 현재 모습을 보존하며 의미별 토큰을 추출해요. 홀수 간격 자체를 오류로 보지 않아요 |
| 긴 글자가 밀려요 | .result-content 외 여러 제목·메타 영역에 긴 문자열 줄바꿈 방어가 없어요 | 짧은 영문 예시만 보고 완료하면 실제 한글·URL·hash에서 깨질 수 있어요 | 실제 길이 fixture로 좁은 화면부터 재현해요 |
| 버튼·제목이 경쟁해요 | .form-actions / .panel-title에 wrap 규칙이 없어요 | 좁은 폭·글자 확대·상태 문구 변경을 놓칠 수 있어요 | 내용 기반 높이, 줄바꿈, 재배치 규칙을 컴포넌트에 정의해요 |
| 로딩과 완료가 비슷해요 | #projects / #tasks의 skeleton 클래스가 자식 교체 후에도 유지돼요 | 로딩 색·글자 크기가 성공 콘텐츠에 상속될 수 있어요 | loading/success/empty/error 상태와 타이포 역할을 분리해요 |
| 기기마다 인상이 달라요 | Inter/Pretendard 선언은 있지만 검토한 3파일에는 로딩 정의가 없어요 | 기기별 대체 폰트로 글자 폭·행 높이가 달라질 수 있어요 | 폰트 공급·fallback과 실제 계산된 글꼴을 기록해요 |
| 제품보다 도구처럼 보여요 | 기본 화면에 Task/enum/hash/원본 JSON이 혼재해요 | 사용자의 다음 행동보다 내부 구조가 시선을 차지할 수 있어요 | 사용자용 요약을 우선하고 원본 증거는 접근 가능한 상세로 보존해요 |
| 컨셉이 흐려져요 | 기존 정책은 방향 검수를 요구하지만 현재 package에 독립 디자인 품질 흐름은 없어요 | 좋은 레퍼런스 수집과 실제 방향 유지가 연결되지 않을 수 있어요 | 방향 계약 → 대표 화면 → 독립 비교 검수 → 확장 순서로 연결해요 |

원본 위치: Runtime apps/console/public/styles.css(.result-content, .form-actions, .panel-title, .skeleton), index.html(#projects, #tasks), app.js(renderProjects, renderTasks, result rendering). 코드상의 위험 진단이며 실제 overflow 발생은 렌더링으로 따로 확인해요.

## 4. 후보를 비교한 뒤 선택한 구성

필터는 두 축이에요. 첫째, 에던이 지적한 문제를 실제로 줄이는가. 둘째, 다른 AI·기기에서도 재사용되며 기존 비용·권한·브랜드를 보존하는가예요.

| 후보 전체 | 채택 범위 | 적용하지 않는 부분 |
|---|---|---|
| DTCG 2025.10 | 토큰 교환 형식과 의미별 참조 | 미적 품질 인증, W3C 정식 표준이라는 표현 |
| WCAG 2.2 | reflow, resize, text spacing, contrast/focus/target 검수 | 숫자 하나로 접근성 전체 인증 |
| KRDS | 한글 중심 폼·오류·목록 패턴, 고정/가변 규칙 구분 | 모든 프로젝트에 정부 서비스 외형 강제 |
| Carbon | 업무용/표현용 타이포·밀도 분리 | 영문 폰트 수치를 한글에 무검증 이식 |
| W3C Korean Layout | 한글·라틴 혼합, 숫자·단위, 줄바꿈 예외 | 초안을 확정 표준으로 간주 |
| Storybook | 재사용 컴포넌트가 쌓이면 상태별 갤러리 | 첫날부터 도구 운영 부담과 유료 서비스 추가 |
| Playwright | 같은 환경의 화면 비교·동작 검수 | diff 통과를 좋은 디자인으로 판정 |
| Figma | 선택 방향이 정해진 프로젝트의 editable 컴포넌트·변수 | 지금 연결 대상이 없는 상태에서 기존 디자인 반영 주장 |
| Product Design | 새 화면 방향 탐색과 구현 후 시각 감사에 사용 | 도구의 결과 자체를 에던의 방향 승인으로 대체 |
| 외부 frontend-design Skill | 기존 검토 후보의 장단점을 참고 | 검토 없이 통째 복사·중복 설치 |
| Apple HIG | Apple 전용 작업의 향후 참고 | 이번 원문 세부 읽기 미확인 규칙 인용 |

이번에는 연결된 GitHub, Skill Creator, PDF 제작·검수와 자체 작성 design-quality를 사용해요. 별도의 외부 MCP·유료 API·새 서비스 계정은 필요하지 않아요. Figma·Storybook은 목적이 맞는 후속 단계에 사용해요.

다크호스는 화려한 생성 도구가 아니라 **한국어 조판과 실제 콘텐츠 스트레스 검사**예요. 긴 기관명, 숫자+단위, 두 줄 버튼, 폰트 실패가 영어 샘플에서는 보이지 않던 오류를 드러내요.

## 5. 목표 구조: 공통 품질, 프로젝트별 표현

| 계층 | 공통으로 유지할 것 | 프로젝트가 결정할 것 |
|---|---|---|
| 방향 | 목적·주요 행동·참고 근거·금지 조건 기록 | 브랜드 성격, 정보 우선순위, 승인 시안 |
| 기초값 | 단위·타입·이름·alias 관리 방식 | 색·글꼴·공간 밀도·모서리·움직임 |
| 컴포넌트 | 상태·내용 길이·접근성·반응형 계약 | 업무에 필요한 구조·표현 강도 |
| 화면 | 대표 화면 선완성, 컨셉 비교 | 목록/탐색/브랜드/카메라 중심 구성 |
| 검수 | 실측 + 시각 검수 + 증거 + 독립 검토 | 적합한 화면 폭·기기·수용 기준 |
| 학습 | 오류와 원인·수정·재검사 기록 | 실제 효과가 입증된 규칙만 반영 |

Dex Console은 다음 행동이 읽히는 업무 화면, 라디오 서비스는 탐색과 재생이 중심인 미디어 화면, 렌즈 스크린은 실시간 얼굴과 렌즈 비교가 중심인 경험이에요. 이는 설명용 방향 제안이며 각 프로젝트의 승인 디자인을 대체하지 않아요. 전 프로젝트를 하나의 카드·색상·폰트로 통일하지 않아요.

## 6. 간격과 텍스트 적용 예시

새로운 일반 터치 화면의 출발값으로 간격 4/8/12/16/24/32/48, 본문 16px/행간 24px, 컨트롤 최소 높이 48px를 제안해요. 기존 승인값이 있으면 그 값부터 유지해요. 44/48px는 Dex 제안이지 WCAG AA의 일괄 의무 수치가 아니에요.

| 역할 | 예시값 | 사용 이유 |
|---|---|---|
| 아이콘과 글자 | 8px | 한 동작으로 읽히게 해요 |
| 제목과 보조 설명 | 8px | 한 정보 묶음으로 연결해요 |
| 버튼 안쪽 | 세로 12px / 가로 16px | 글자와 클릭 면적의 여유를 확보해요 |
| 같은 그룹의 필드 | 16px | 각 입력을 구분해요 |
| 다른 그룹 | 24px | 의미가 바뀌는 지점을 보여줘요 |
| 섹션 간 | 32px 이상부터 검토 | 정보 위계를 표현해요 |

한 줄 버튼: 24px 행 높이 + 위아래 12px = 48px예요. 두 줄 버튼: 48px 텍스트 + 위아래 12px = 72px가 필요해요. 같은 48px 높이에 글씨를 줄이거나 숨기지 말고 최소 높이와 내용에 따라 늘어나는 구조를 사용해요. 실제 렌더링에서 문구·폰트·폭을 함께 확인해요.

컨셉 검수는 “예쁜가?” 한 문장으로 끝내지 않아요. 주요 행동이 먼저 보이는지, 자료의 밀도가 맞는지, 이미지가 제품을 설명하는지, 같은 역할의 글자·여백이 같은 리듬인지, 참고 시안의 특징이 유지되는지 비교해요. 보라색·그라데이션·카드를 전역 금지하는 방식도 사용하지 않아요.

## 7. 제작·수정·검수 절차

1. 최신 프로젝트 근거와 기존 산출물을 확인하고 변경 범위를 고정해요.
2. 제니가 방향 계약과 기본값을 정리해요. 에던은 중요한 방향만 판단해요.
3. 대표 화면 1개와 가장 까다로운 상태를 실제 길이 콘텐츠로 완성해요.
4. 간격·폰트·컴포넌트의 의미별 규칙을 연결해요.
5. 좁은 화면, 큰 글자, 긴 문구, 빈/오류/로딩 상태를 검수해요.
6. 새 방향·release candidate·중대한 변경·evidence package completion 주장에는 별도 검토자가 원래 요청·참고와 결과를 비교해요. 작은 저위험 수정은 기존 계약과 영향 검사로 진행하되 최종 release acceptance는 분리해요.
7. 확인된 결과만 기준 화면으로 고정하고 나머지 화면으로 확장해요.
8. 결함의 원인·수정·재검사 결과를 학습 기록으로 남겨요.

자동 검사는 구조·파일·측정·회귀를 담당하고 시각 검수는 방향·위계·밀도·브랜드 적합성을 담당해요. 두 판정을 평균 내지 않아요. 글자 잘림 한 건을 높은 미적 점수로 상쇄할 수 없어요.

## 8. 이번에 만든 실행 장치

`design-quality`는 기존 화면설계 스킬을 유지하면서 방향 계약, 대표 화면, 폰트·한글·콘텐츠·상태 검수, 독립 검토와 학습을 연결하는 새 Skill 후보예요. 현재 업무에도 그 기준을 적용해 소스 진단과 검수 범위를 구분했어요.

`validate-design-evidence.mjs`는 schema v2 계획과 실제 evidence를 대조해요. immutable revision과 canonical plan hash로 stale/축소 계획을 차단하고, reviewer를 author·모든 check run과 분리하며 review artifact 재사용을 막아요. 누락, FAIL, Not Checked, 변조된 hash, 경로 이탈·UNC/device/ADS·symlink와 개별 25 MiB/전체 64 MiB 초과를 차단해요. 안정적인 상위 symlink/junction은 canonicalize해 정상 플랫폼 경로를 허용해요.

성공 상태는 `EVIDENCE_PACKAGE_COMPLETE`예요. 구조와 신뢰된 로컬 파일 무결성만 뜻하며 canonical Task PASS/verdict/outcome, 시각 품질, WCAG, 리뷰어 신원, 실행 진실성, merge/install 승인을 뜻하지 않아요. Task에 연결할 때는 한 개의 상세 evidence/check로만 기록하고 기존 상세 `FAIL`이나 `Not Checked`를 삭제·변환하지 않아요.

검사기가 읽는 PLAN/EVIDENCE는 개발·QA 내부 자료예요. 에던에게 값을 입력하거나 매번 명령을 실행하게 하지 않아요. 작성자가 요구 검사를 임의로 줄이면 안 되므로 계획 자체도 별도로 검수해요.

## 9. 실행 순서와 완료 기준

| 단계 | 담당 | 산출물·완료 기준 | 현재 |
|---|---|---|---|
| 1. 진단·기준 | 제니 + 독립 분석 | 승인 main 근거, 위험/추론 분리, 후보 비교 | 작성 완료 |
| 2. 품질 장치 | 덱스 + 독립 검토 | 새 Skill, 토큰 예시, 증거 검사와 회귀 테스트 | PR 후보 제작·검수 |
| 3. Console 시범 적용 | 덱스 + 디자인 검토자 | #234/#237/#238을 보존한 최신 main에서 긴 글자·로딩부터 재현·최소 수정 | 다음 단계 |
| 4. 대표 화면 확정 | 제니 + 에던 | 승인 방향과 실제 PC/모바일 화면 비교 | Not Checked |
| 5. 프로젝트 확장 | 프로젝트 담당 | 각 프로젝트 브랜드 유지, 상태·기기 검수 | Not Checked |
| 6. 효과 측정 | QA | 3~5개 대표 작업 전후의 결함·재작업 비교 | Not Measured |

단계 3은 승인된 최신 코드에서 실제 화면을 열 수 있을 때 진행해요. 서버 접속 문제를 이 디자인 작업에서 권한 확대나 운영 설정 변경으로 우회하지 않아요. 긴 글자·로딩 수정이 먼저이고 전역 토큰 변경과 시각 리뉴얼은 각각 비교 증거를 확보해요.

측정 지표는 ① 인계 후 발견된 텍스트/간격 결함 수, ② 컨셉 재작업 횟수, ③ 첫 검수 통과 비율, ④ 같은 실패의 재발률, ⑤ 한 화면의 총 수정 시간이에요. 현재 baseline 수치는 없으므로 효과가 이미 개선됐다고 말하지 않아요. 첫 3~5개 작업에서 기준을 만들고 같은 난이도·범위로 비교해요.

## 10. 상태와 인계

이번 검증의 실제 실행 결과는 같은 Task의 QA_REPORT.md와 RESULT.yaml을 봐요. main 병합·전 기기 설치·제품 화면 검수·디자인 개선 효과는 별도 상태로 유지해요. 새 후보가 향후 공식 기준이 되려면 AI_CONTRACT §9의 main 병합 승인이 필요해요. 공급자 업데이트 대응의 standing approval을 이번 새 디자인 시스템 전체 승인으로 확대하지 않아요.

Runtime 후보 version 1.3.0은 별도 PR #97의 1.2.0 후보와 구분한 제안 번호예요. 실제 설치 버전이 아니에요. #235 exact head `0181e59a13c3a56a77c0730fe083581d89d65502`는 최신 Runtime main에 통합돼 #234 자동 인계와 #237 Task context·상세 FAIL 우선, #238 비활성 capability·비용 guard를 보존한 상태로 재검증됐어요. source main 병합과 설치는 아직 별도 승인·검증 단계이며 다른 PR을 취소하거나 덮어쓰지 않아요.

## 공식 근거

- DTCG: https://www.designtokens.org/tr/2025.10/format/
- WCAG reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- WCAG text spacing: https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html
- WCAG target: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- W3C evaluation: https://www.w3.org/WAI/test-evaluate/
- Carbon typography: https://carbondesignsystem.com/elements/typography/overview/
- KRDS: https://www.krds.go.kr/html/site/style/style_01.html
- Korean layout: https://www.w3.org/TR/klreq/
- Storybook: https://storybook.js.org/docs/writing-tests/visual-testing
- Playwright: https://playwright.dev/docs/test-snapshots

외부 디자인 시스템은 방법과 검증 기준만 참고했어요. 외부 Skill 본문·스크립트·브랜드 자산을 복사하지 않았어요. 새 Skill과 검사 도구는 Dex용으로 작성했어요.
