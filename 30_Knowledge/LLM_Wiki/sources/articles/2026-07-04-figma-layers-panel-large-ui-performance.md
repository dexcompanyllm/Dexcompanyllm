---
type: llm-wiki-source
status: captured
title: "Figma layers panel large UI performance"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: interpretive
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-engineering-blog
source:
  - "https://www.figma.com/blog/improving-performance-in-the-layers-panel/"
  - "https://web.dev/articles/virtualize-long-lists-react-window"
  - "https://reactnative.dev/docs/next/virtualizedlist"
  - "https://developer.mozilla.org/en-US/docs/Web/Performance"
collectionPurpose: "대형 트리, 레이어 패널, 긴 리스트, 대시보드 테이블처럼 복잡한 frontend/product UI를 만들 때 전체 데이터를 무조건 렌더링하거나 재계산하지 않도록 QA 기준을 보강한다."
publisher: "Figma"
tags:
  - llm-wiki/source
  - figma
  - frontend
  - performance
  - product-ui
  - large-list
---

# Figma Layers Panel Large UI Performance

## Original Content

- 수집 시각: 2026-07-04 17:33 KST
- 자료 유형: Figma 공식 engineering/performance 블로그, web.dev/React Native/MDN 교차 검증
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 핵심 구조, Dex Company 적용 기준, 미확인 범위만 보존한다.
- 쉬운 설명: Figma는 대형 파일에서 레이어 패널이 느려지는 문제를 해결하기 위해 모든 노드의 정보를 매번 계산하지 않고, 화면에 필요한 행 중심으로 계산을 나누고, 변경된 하위 트리만 다시 계산하도록 구조를 바꿨다. Dex Company에서는 이를 대형 리스트/트리 UI 성능 QA 기준으로 흡수한다.

## Source-Backed Notes

- Figma는 대형 파일에서 수만 개의 레이어가 생기며, 레이어 패널 성능이 드래그, 타이핑, 색상 선택 같은 편집 동작까지 느리게 만들 수 있다고 설명한다.
- Figma의 개선 방향은 한 번에 모든 확장 노드 데이터를 모으는 방식에서 벗어나, 먼저 표시할 row id 목록을 계산하고 그다음 화면에 필요한 노드 데이터만 계산하는 two-pass 구조다.
- Figma는 확장 상태와 하위 트리 변경에 맞춰 필요한 부분만 무효화하고 재계산하는 derived property/caching 구조를 설명한다.
- web.dev는 대형 테이블과 리스트에서 보이는 항목만 렌더링하는 windowing/virtualization이 렌더링과 스크롤 성능을 개선한다고 설명한다.
- React Native 문서는 large list에서 finite render window를 유지하면 메모리와 성능이 크게 개선되지만, 내부 상태 보존과 빈 콘텐츠 순간 노출 같은 tradeoff가 있다고 설명한다.
- MDN은 웹 성능을 로드 시간뿐 아니라 런타임, 반응성, 스크롤/애니메이션 부드러움의 객관 지표와 지각된 경험으로 본다.

## Dex Company Use Example

- 대시보드 테이블, 로그 뷰어, 파일 트리, 레이어 패널, 검색 결과, 알림 피드, CRM 리스트를 만들 때 `large_state.count`, `visible_window`, `overscan_or_buffer`, `update_scope`, `scroll_fps_or_jank`, `memory_tradeoff`, `state_preservation`을 QA evidence로 남긴다.
- "화면이 예쁘다"만으로 통과시키지 말고, 1천 행 이상 또는 깊은 트리 확장 상태에서 스크롤, 선택, 입력, 접기/펼치기, 필터링이 느려지지 않는지 확인한다.
- Figma나 Storybook이 있는 경우에는 작은 예시 story만 보지 말고, 최대 데이터/깊은 중첩/확장된 트리/실시간 업데이트 상태를 별도 story 또는 QA 케이스로 둔다.

## Frontend QA Link

- 직접 연결: frontend performance, interaction design, dashboard UI, component system QA.
- 접근성 연결: 성능은 WCAG 자체 성공 기준 하나로만 끝나지 않지만, 키보드 조작, 포커스 이동, 스크린 리더 탐색, 입력 반응성이 느려지면 실제 접근 가능한 사용 경험이 깨질 수 있다. 따라서 접근성 QA와 별도로 런타임 반응성/대형 상태 성능을 함께 기록해야 한다.

## Evidence Quality

- quality: medium
- 이유: Figma 글은 공식 엔지니어링 사례로 구체적이지만, Figma 내부 구현을 Dex Company 프로젝트에 그대로 적용했다는 증거는 아니다. web.dev, React Native, MDN은 virtualization과 성능 측정 관점을 교차 검증하는 보조 근거다.

## Risk / License / Security

- 설치 여부: 설치하지 않음. Figma app, connector, plugin, MCP server, package, account, billing, workspace permission을 연결하거나 실행하지 않았다.
- OWASP LLM 위험 분류: overreliance, insecure output handling, sensitive information disclosure.
- 운영 제한: 대형 UI 성능 패턴은 프로젝트 코드와 데이터 모양에 따라 달라진다. 특정 라이브러리 설치는 별도 approval-ready packet과 target repo QA가 있을 때만 검토한다.

## Claim Split

- source-backed: Figma의 two-pass/windowed computation, derived property/caching, 대형 파일 성능 개선 설명. web.dev/React Native의 virtualization tradeoff. MDN의 런타임/반응성/스크롤 성능 관점.
- Dex inference: Dex Company frontend QA에 `large_state.performance`와 `state_preservation` 항목을 추가해야 한다는 판단.
- not checked: 실제 에던님 프로젝트의 대형 리스트 성능, 브라우저 프로파일링, FPS/INP/메모리 수치, 특정 virtualization 라이브러리 설치 적합성.
