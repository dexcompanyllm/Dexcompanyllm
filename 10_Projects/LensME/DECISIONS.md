# DECISIONS

| ID | 구분 | 결정/제안 | 근거 / 상태 |
|---|---|---|---|
| LM-D001 | confirmed / FACT | LENS ME 표기 세로 시안을 시각 방향으로 채택 | 에던의 현재 승인 원문 |
| LM-D002 | confirmed / FACT | 사진이 아닌 LIVE, 자연스러운 상반신·생활형 모습 | 에던의 이번/이전 요구 |
| LM-D003 | confirmed / FACT | 다중 브랜드·브랜드별 상품·상품명/코드 검색·재고·상품 위치 | 에던의 명시 요구 |
| LM-D004 | confirmed / POLICY | 지속 개발·관리·상품화 기준 문서는 Dex Wiki에 보존 | 에던의 이번 요청 |
| LM-D005 | proposal / POLICY | 재촬영 제거, 다시 맞추기/카메라 재연결 상태 분리 | LIVE 원칙과 시안 문구 모순 해소 |
| LM-D006 | proposal / FACT | 6개 기능을 모두 유지하되 6번의 필수 다음 버튼으로 강제하지 않음 | LIVE 중 탐색·재고·위치 직접 사용 |
| LM-D007 | proposal / POLICY | 실상품 미제공 시 DEMO 브랜드/상품/SKU/재고/위치 어댑터 | 가상 데이터와 실제 사실 혼동 방지 |
| LM-D008 | proposal / POLICY | AI 추천·얼굴형/톤 판정은 첫 MVP 비필수; 추천 설명 없으면 표기 금지 | 경험/상품 탐색 우선, 미검증 판단 배제 |
| LM-D009 | proposal / POLICY | 세션 120초 무조작 시 경고, 20초 후 정리; 경고 중 연장 가능 | 매장 테스트 전 기본값, 접근성 검토 필요 |
| LM-D010 | proposal / POLICY | 재고 TTL 60초 초안; 운영 adapter/SLA에 따라 조정 | 지연/실패를 품절로 오인하지 않음 |
| LM-D011 | proposal / FACT | 제품 표시명 LENS ME, 문서 ID LensME, 코드 경로 unknown | 기존 브랜드와의 명칭/권리 구분 필요 |
| LM-D012 | proposal / POLICY | 토큰 수치는 사진 측정값이 아닌 구현 시작값 | 원근·카메라·디스플레이 영향 배제 |
| LM-D013 | proposal / CAPABILITY | Wiki 문서 승인과 Android/키오스크 운영 검증 분리 | 코드/빌드/실기기 미확인 |

제안은 등록 PR의 main 병합 후 기본값으로 채택하되, 실기기·매장·권리 검토에서 변경 근거를 남기고 버전을 올려요. 기존 Library 가이드는 보존하며 이번 가이드와 다른 우선순위는 이번 승인 요청과 DECISIONS로 해결해요.
