# Codex Model Routing Guide

Updated: 2026-08-26

## 목적

에던님의 Codex 작업은 최소 토큰 사용보다 한 번에 제대로 끝내는 것을 우선합니다.

낮은 모델과 낮은 추론 레벨로 여러 번 수정하고 재검수하는 방식은 기본 전략이 아닙니다. 단순 작업은 가볍게 처리하되, 결과 품질·판단 정확도·검증 신뢰도가 중요한 작업은 처음부터 충분한 모델과 추론 레벨을 사용합니다.

## 모델 발견 원칙

- Canonical routing에는 역할과 `modelClass`를 기록합니다.
- 실제 모델 ID와 사용 가능 여부는 ChatGPT-managed Codex App Server의 current `model/list`에서 확인합니다.
- 대화 기억, 오래된 설정, 이전 상태 문서의 모델 목록을 현재 사용 가능 catalog로 간주하지 않습니다.
- Runtime은 hidden model을 포함한 catalog를 bounded pagination으로 읽고 unknown model, invalid catalog, cursor cycle을 fail-closed합니다.
- 건강한 5.6 catalog의 기본 모델은 server default를 유지합니다. 전역 hard-coded default를 불필요하게 추가하지 않습니다.
- 명시 모델은 current catalog에 있어야 하며, 종료 모델의 replacement가 없으면 임의 fallback하지 않습니다.

## 2026-08-31 Codex 모델 종료 대응

ChatGPT 계정으로 Codex에 로그인하는 환경에서 다음 전환을 적용합니다.

| 종료 모델 | 공식 replacement | Dex Runtime 정책 |
|---|---|---|
| `gpt-5.4` | `gpt-5.6-terra` | Terra가 authenticated `model/list`에 있을 때만 explicit/default 요청을 기록하며 이관 |
| `gpt-5.4-mini` | `gpt-5.6-luna` | Luna가 authenticated `model/list`에 있을 때만 explicit/default 요청을 기록하며 이관 |

- Retirement date: `2026-08-31`
- Workspace default, saved setting, managed configuration, automation에 5.4 계열이 남아 있으면 전환 대상입니다.
- API 또는 자체 API key 사용에 대한 종료 범위와 Dex subscription worker 범위를 혼동하지 않습니다.
- Dex는 provider API key와 automatic paid fallback을 기본 금지하므로 OpenAI Skills API나 API model fallback으로 우회하지 않습니다.

## 5.6 계열 역할 기준

아래 역할은 routing intent이며, 실제 사용 가능 모델 ID는 `model/list`가 최종 기준입니다.

| 모델 | 역할 |
|---|---|
| `gpt-5.6-luna` | 빠른 확인, 단순 정리, 낮은 위험 작업 |
| `gpt-5.6-terra` | 일반 작업 기본, 균형형 작업 |
| `gpt-5.6-sol` | 복잡한 작업, 고품질 산출물, 검증과 판단이 중요한 작업 |

5.4 계열은 2026-08-31 종료 대상으로 취급합니다. 5.5 또는 기타 모델은 current catalog와 공식 정책을 확인하지 않고 기본 라우팅 후보로 승격하지 않습니다.

## 기본 원칙

- 단순 확인은 빠르게 처리합니다.
- 문서, 디자인, 이미지, 구현, 디버깅, 자동화, 전략처럼 결과 품질이 중요한 작업은 처음부터 충분한 추론 레벨을 사용합니다.
- 토큰 절약 때문에 낮은 모델로 여러 번 재작업하는 흐름을 피합니다.
- 실패 가능성, 회귀 위험, 사용자 데이터 손실, 보안·권한·배포 관련 작업은 가장 강한 available Codex-capable model을 우선합니다.
- "제대로", "꼼꼼히", "검수", "한 번에", "실패 없이", "품질 좋게", "중요한" 같은 표현이 있으면 높은 추론 레벨로 해석합니다.
- 현재 진행 중인 단일 세션에서 모델 자체를 즉시 바꿀 수 없는 경우가 있습니다. 이때는 다음 새 작업, 자동화, CLI 실행, 또는 가능한 설정 경계에서 라우팅 기준을 적용합니다.

## 상황별 라우팅

| 작업 상황 | 기본 model class | 현재 선호 예시 | 추론 레벨 |
|---|---|---|---|
| 짧은 질의응답, 설정 확인, 파일 위치 확인, 상태 조회 | `fast-codex-capable` | `gpt-5.6-luna` | `low` 또는 `medium` |
| 단순 Markdown 정리, 회의록 요약, 짧은 문장 다듬기 | `fast-codex-capable` | `gpt-5.6-luna` | `medium` |
| 일반 문서 초안, 공지·안내문, 간단한 운영 문서 | `balanced-codex-capable` | `gpt-5.6-terra` | `high` |
| 기획서, PRD, 제안서, 정책 문서, 운영 지침, 이력서, 자기소개서 | `strongest-reasoning-available` | `gpt-5.6-sol` | `high` |
| 여러 출처 기반 리포트, 전략 문서, 의사결정 문서, 긴 문서 재구성 | `strongest-reasoning-available` | `gpt-5.6-sol` | `xhigh` |
| 간단한 코드 수정, 단일 파일 버그 수정, 작은 스크립트 수정 | `balanced-codex-capable` | `gpt-5.6-terra` | `medium` 또는 `high` |
| 일반 기능 구현, 다중 파일 수정, 테스트 포함 구현 | `strongest-codex-capable` | `gpt-5.6-sol` | `high` |
| 앱/사이트/도구 구현, UX 흐름, 반응형 UI, 브라우저 QA 포함 | `strongest-codex-capable` | `gpt-5.6-sol` | `high` 또는 `xhigh` |
| 복잡한 디버깅, 원인 추적, 회귀 위험, 반복 실패 | `strongest-reasoning-available` | `gpt-5.6-sol` | `xhigh` 또는 `max` |
| 보안, 인증, 권한, API 키, 배포, 데이터 삭제·이동, 자동화 운영 설정 | `strongest-reasoning-available` | `gpt-5.6-sol` | `xhigh` 또는 `max` |
| 단순 이미지 생성 요청, 간단한 이미지 프롬프트 | `balanced-codex-capable` | `gpt-5.6-terra` | `high` |
| 브랜드 이미지, 광고 소재, 상세페이지 키비주얼, 썸네일, PPT 비주얼 | `strongest-reasoning-available` | `gpt-5.6-sol` | `high` 또는 `xhigh` |
| 이미지 콘셉트 여러 안 비교, 아트디렉션, 결과물 비평·수정 지시 | `strongest-reasoning-available` | `gpt-5.6-sol` | `xhigh` |
| UX/UI 디자인 검수, 디자인 시스템 판단, anti-AI-slop 점검 | `strongest-reasoning-available` | `gpt-5.6-sol` | `xhigh` |
| 시장 조사, 채용공고 분석, 경쟁사 분석, 출처 검증 | `strongest-reasoning-available` | `gpt-5.6-sol` | `high` 또는 `xhigh` |
| 단순 데이터 정리, 표 변환, 형식 변경 | `balanced-codex-capable` | `gpt-5.6-terra` | `medium` |
| 데이터 해석, KPI, 진단, 리포트, 의사결정 분석 | `strongest-reasoning-available` | `gpt-5.6-sol` | `high` 또는 `xhigh` |
| 최종 QA, 코드 리뷰, watchdog 성격의 검수 | `independent-review-capable` | strongest available | `xhigh` |
| 장기 작업, 여러 가설 검증, 하위 작업 분해와 병렬 검토 필요 | `strongest-reasoning-available` | `gpt-5.6-sol` | `max`, 필요 시 `ultra` |

## 이미지 작업 주의

이미지 생성 자체는 이미지 생성 도구가 수행합니다. Codex 모델은 다음 역할을 맡습니다.

- 이미지 콘셉트와 아트디렉션 설계
- 이미지 생성 프롬프트 작성
- 생성 결과 검수
- 수정 지시 작성
- 브랜드, 상세페이지, PPT, 광고 맥락과의 적합성 판단

간단한 이미지 한 장은 balanced model + high로 충분할 수 있지만, 상업적 품질이나 브랜드 일관성이 중요한 이미지는 strongest reasoning model + high/xhigh를 사용합니다.

## 문서 작업 주의

문서 작업은 글자 수보다 판단 위험도로 라우팅합니다.

- 단순 요약·정리는 fast 또는 balanced model
- 외부에 제출하거나 장기 운영 기준이 되는 문서는 strongest reasoning model
- 출처, 논리 구조, 법적·채용·비즈니스 리스크가 있는 문서는 strongest reasoning model + xhigh

## 상승 조건

다음 조건이 하나라도 있으면 모델 class 또는 추론 레벨을 올립니다.

- 요구사항이 모호하지만 결과 품질이 중요함
- 파일 범위가 넓거나 다중 모듈 변경이 필요함
- 이전 시도에서 실패했거나 원인이 불명확함
- 사용자 변경사항을 보존해야 해서 충돌 위험이 있음
- 테스트, 브라우저 QA, 출처 검증, 최종 검수까지 필요함
- 보안, 권한, 결제, 인증, 배포, 데이터 삭제·이동과 관련됨
- 사용자가 명시적으로 꼼꼼한 검수나 한 번에 완료를 요구함

## 하향 조건

다음 조건에서는 낮은 model class·추론 레벨을 허용합니다.

- 단순 상태 조회
- 파일 경로 확인
- 짧은 명령 실행
- 이미 결정된 텍스트의 형식만 바꾸는 작업
- 결과가 틀려도 복구 비용이 낮은 작업

## 운영 검증

승인된 host에서 다음 순서로 확인합니다.

```powershell
npm run codex:compatibility
npm run codex:status
```

`codex:status`에서 다음을 확인합니다.

- `compatibility.baseline.compatible: true`
- `modelCatalog.retirementReady: true`
- `ready: true`
- `gpt-5.6-terra`와 `gpt-5.6-luna` replacement availability
- ChatGPT-managed subscription account와 rate-limit read

## 기본 판단 문장

덱스는 에던님의 Codex 작업에서 "싼 반복"보다 "충분한 판단으로 한 번에 완료"를 우선한다. 단순한 것은 빠르게 처리하되, 중요한 문서·디자인·이미지·구현·디버깅·자동화·검수 작업은 current `model/list`에서 확인된 strongest available model과 높은 추론 레벨을 기본 선택지로 둔다.
