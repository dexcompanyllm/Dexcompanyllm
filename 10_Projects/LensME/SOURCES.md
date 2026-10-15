# SOURCES

Checked: 2026-09-18 / Asia/Seoul

| ID | 분류 | 근거 | 확인 범위/한계 |
|---|---|---|---|
| SRC-U1 | user-original / confirmed | 현재 대화: 실제 키오스크, 자연스러운 상반신 LIVE, 생활형 모습, 다중 브랜드/상품 선택·명칭/코드 검색·재고·위치 | 직접 요구. 가격·성능·하드웨어·상표권 승인 없음 |
| SRC-U2 | user-original / confirmed | 현재 대화: “좋아. 마음에 들어. 이 시안으로 솔루션 개발을 진행할거야.” 및 지침/Work/디자인 가이드/Wiki 요청 | 시각 방향 승인 및 문서 등록 요청; 이번 응답의 배포 승인 아님 |
| SRC-U3 | user-original / context | 이전 프로젝트 대화의 실제 상품 자료 추후 제공·DEMO 우선·Galaxy Z Flip5/Tab S10 FE+ 검증 요구 | 현재 대화에 제공된 프로젝트 맥락; 구현/빌드 실재는 별도 확인 |
| SRC-A1 | generated visual / direction reference | 승인 이미지: 렌즈미_ai_렌즈_추천_키오스크.png / 1024×1536 | 가상 시안; 실제 상품/가격/재고/상표권 근거 아님; Design manifest 확인 |
| SRC-L1 | prior artifact / partially checked | Library Lens_Screen_UIUX_Design_Guide_v1.0.md | 검색에서 LIVE·동일 양쪽 눈·세션/반응형/DEMO/기존 우선순위 확인. full read 429/visibility 오류; 전체 검토 아님 |
| SRC-G1 | canonical policy / confirmed | Wiki AI_CONTRACT.md v2.5, CURRENT_STATE, AGENTS, DEX_QUALITY_LEARNING_RULES | main `886c2092847a9b7e50ab6d4f37a6317e6900c82a` 조회 기준; 앱 기동/실기기 상태 아님 |
| SRC-G2 | canonical schema / confirmed | 99_Templates/TASK_PACKET.yaml schemaVersion 2.0 | Task 형태 참고; 자동 worker 배정/실행을 뜻하지 않음 |
| SRC-W1 | official / source-backed | W3C WCAG 2.2 SC 1.4.3 contrast | 일반 4.5:1, 큰 텍스트 3:1; 전체 접근성 인증 아님 |
| SRC-W2 | official / source-backed | Android Developers Make apps more accessible | touch target 48×48dp 권고; 키오스크 64 목표는 프로젝트 제안 |
| SRC-W3 | official technical documentation / source-backed | MDN getUserMedia | secure context/permission 조건; 실제 스택 선택/실행 Not Checked |
| SRC-W4 | official / source-backed | W3C WCAG 2.2 SC 2.5.8 target size | 웹 최소 기준/예외; Android dp/물리 mm와 구분 |
| SRC-W5 | brand primary / source-backed | 렌즈미 공식 홈페이지 | 기존 브랜드의 사용 표기 확인; 등록상표 유효성/사용허락/상용권리 조사 아님 |

## 외부 출처

- SRC-W1: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- SRC-W2: https://developer.android.com/guide/topics/ui/accessibility/apps
- SRC-W3: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- SRC-W4: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- SRC-W5: https://www.lens-me.com/shop/

## 증거와 제안 구분

디자인 토큰·정보 위계 보정·데이터 schema·시간 값·성능 목표·로드맵·테스트 목록은 Dex proposal이에요. 출처 문서의 규격이나 제품 성능 측정값처럼 인용하지 않아요. 기존 Library 파일은 삭제/덮어쓰기하지 않아요. 전역 LLM Wiki synthesis나 Skill ingestion 작업으로 확대하지 않아요.
