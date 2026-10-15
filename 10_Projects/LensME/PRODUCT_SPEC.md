# LENS ME 제품·동작 정의 v1.0

Status: proposed implementation baseline
Classification: FACT(requirements) + POLICY(proposed defaults)

## 제품 경계

렌즈 판매처 고객의 LIVE 컬러 체험과 상품 탐색·매장 재고·진열 위치 안내를 제공해요. 첫 개발은 DEMO 체험이에요. 판매 결제, 원격 처방/피팅, 눈 건강 판정, 얼굴 식별, 자동 직원 호출·알림 발송은 범위에서 제외해요. 직원에게 상품 정보를 보여주는 화면은 외부 메시지 전송과 달라요.

## 고객 기능: UI 요소 + 조건 + 동작 + 결과

| UI 요소 | 조건 | 동작 | 결과/예외 |
|---|---|---|---|
| 체험 시작 | 대기 상태 | 처리 안내 후 시작, 카메라 권한 요청 | 허용 시 LIVE. 거절 시 상품만 둘러보기 가능 |
| LIVE Stage | 유효한 영상/얼굴 | 상반신 미리보기, 눈 추적 | 영상 상태와 추적/합성 상태를 별도로 표시 |
| 브랜드 탭 | 취급 브랜드 존재 | 브랜드 ID로 필터 | 검색어 유지, 목록만 상단으로 초기화. 전체 화면 점프 금지 |
| 상품 검색 | 이름/코드 입력 | 현재 브랜드 범위에서 조회 | 한글 IME 조합 완료 후 실행. Enter 즉시, 250ms debounce 제안 |
| 검색 범위 | 현재 범위 결과 없음 | 사용자가 전체 브랜드 검색 선택 | 범위 전환을 명시; 자동으로 다른 브랜드 혼합 금지 |
| 상품 카드 | 판매 표시 가능한 상품 | 선택 ID 갱신 후 렌즈 asset 로드 | 성공할 때만 착용 중. 실패하면 이전 적용 유지 + 적용 실패 안내 |
| 맨눈/렌즈 | 합성 사용 가능 | 양쪽 눈 전체 적용 on/off | 영상은 유지; 반쪽 눈 서로 다른 렌즈 금지 |
| 후보 비교 | 후보 A/B 있음 | 전체 얼굴 A/B 전환 | 최대 2개 제안; 각 상품명·선택상태 유지 |
| 판매 옵션 | 상품에 옵션 존재 | 사용자가 알고 있는 옵션 선택 | AI가 도수 추천 안 함. 미선택이면 옵션 확인 안내 |
| 재고 확인 | store + SKU 결정 | adapter 조회 | 있음/없음/미확인/오래됨/조회중 구분 |
| 상품 위치 | 유효한 매장 지도/진열정보 | 현재 매장 위치 패널 표시 | 구역/진열대/단/위치 코드, 없으면 직원 문의 |
| QR 인계 | 선택 상품 있음 | 상품 참조만 공유 | 미구현이면 샘플 QR 금지. 카메라 얼굴/재고 확약 미포함 |
| 체험 종료 | 언제든 | 경고 없이 명시 종료, 세션 정리 | 카메라/프레임/추적/선택/찜/QR 정리 후 대기 |

## 데이터 계약

| 엔터티 | 필수 키와 의미 |
|---|---|
| Tenant | tenantId; 운영사/고객사 경계. 파일럿 전 권한 분리 검증 |
| Store | tenantId, storeId, storeName, mapVersion, inventorySource |
| Brand | brandId, displayName, approvedLogoRef, enabledStores |
| Product | productId, brandId, productCode, displayName, color, usagePeriod, graphicDiameter, assetRef, assetVersion, demo |
| SKU | skuId, productId, supplierSku, 옵션(도수/규격 등), packCount, 판매상태 |
| Inventory | tenantId, storeId, skuId, availability, sellableQty(nullable), source, checkedAt, expiresAt |
| ShelfLocation | storeId, productId 또는 skuId, locationCode, zone, shelf, level, mapVersion, accessibleInstructions |
| Session | sessionId, currentProductId, appliedProductId, comparisonIds, state, lastInteractionAt; 영구 저장 기본 금지 |

숫자/치수/가격이 미확인인 필드는 null로 두고 숨기거나 미확인으로 표시해요. productId와 표시 이름을 키로 혼용하지 않아요. 재고는 브랜드 총량이나 상품 전체 합계를 현재 옵션 수량처럼 표시하지 않아요. supplier가 가용 수량을 제공하면 그 의미를 계약으로 확인하고 예약량을 이중 차감하지 않아요.

## 검색 계약

표시 문자열은 원문을 보존하고 검색 전용 필드만 Unicode 정규화·앞뒤 공백 제거·영문 대소문자 정규화를 적용해요. 코드의 하이픈·선행 0·유효 내부 공백은 공급사 규칙 없이 삭제하지 않아요. 정확 코드 일치 → 이름 일치 → 이름 부분 일치 순으로 정렬해요. 폐기 상품/다른 매장 비취급 상품은 운영 정책에 따라 숨기고 검색 중인 범위를 명시해요. 스캔 아이콘은 실제 스캐너 경로를 검증한 경우만 보여요.

## 재고·위치 계약

조회중에는 과거 녹색 재고 배지를 최신값처럼 유지하지 않아요. 기본 신선도 제안은 60초이며 실제 운영 SLA를 확인해 조정해요. 오래된 값은 마지막 확인 시각과 `재고 다시 확인`을 보여줘요. 오류는 `재고 미확인`, 수량 0이 확정된 경우만 `품절`이에요. 위치 정보는 최신 mapVersion과 묶고, 미등록·이동중이면 임의로 B-03 같은 값을 만들지 않아요. 이동 경로를 검증하지 않았다면 방향 화살표 대신 구역/진열대 텍스트와 직원 문의를 제공해요.

## LIVE·세션 계약

한 고객의 체험에 한 얼굴을 대상으로 해요. 다중 얼굴 감지 시 합성을 중지하고 한 명만 서도록 안내해요. 눈 감김·손 가림·추적 유실 시 잘못된 위치에 렌즈를 그리지 않아요. 렌즈 적용 완료는 currentProductId == appliedProductId 및 유효한 tracking/render 상태일 때만 표시해요. 화면 가림/백그라운드/재시작 때 카메라와 세션 경계를 확인해요.

무조작 120초 후 20초 종료 경고를 기본 제안으로 두고 `계속 체험`을 제공해요. 시선/표정으로 고객을 식별해 세션을 연장하지 않아요. 재개 시 이전 프레임을 얼굴 영상으로 재사용하지 않아요. 카메라 권한 안내를 제품의 개인정보 처리 안내/동의 정책 검토 대신으로 취급하지 않아요.

## QR와 오프라인

첫 DEMO에서 QR은 구현한 상품 참조 payload를 디코딩 검증한 경우만 제공해요. 실제 공유 주소/서버가 없으면 `직원에게 보여주기`로 대체해요. 운영 QR은 추측하기 어려운 token, 만료·접근 범위·회수 정책을 검증하고 얼굴/영상/도수를 기본 포함하지 않아요. 재고는 수신 시 다시 확인해요.

오프라인에서는 검증된 앱/모델/상품 asset 캐시만 사용할 수 있어요. 로컬 cache가 없으면 이용 불가 상태를 보여요. 실재고는 미확인, 실제 지도 최신성도 보장하지 않아요. 온라인 복구가 사용자 선택과 LIVE를 불필요하게 초기화하지 않도록 해요.

## 구현 아키텍처 방향

기존 스택을 먼저 확인해요. Camera/Tracking/Render, Catalog, Inventory, Location, Session, Presentation을 경계로 분리하되 무조건 마이크로서비스로 만들지 않아요. DEMO와 실제 adapter가 동일 계약을 따르게 해요. 웹을 선택하면 getUserMedia의 보안 컨텍스트·권한 조건을 검증해요(SRC-W3). Android native를 유지하면 해당 lifecycle과 실제 permission API를 확인해요. SDK/모델 도입 전 라이선스·모델 weight·전송 동작·지원 기기/성능을 검증해요. 범용 언어모델 API는 첫 LIVE 루프에 필요조건으로 넣지 않아요.

출처는 [SOURCES.md](SOURCES.md), 시각 규칙은 [Design/DESIGN_GUIDE.md](Design/DESIGN_GUIDE.md), 검증은 [QA_ACCEPTANCE.md](QA_ACCEPTANCE.md)로 분리해요.
