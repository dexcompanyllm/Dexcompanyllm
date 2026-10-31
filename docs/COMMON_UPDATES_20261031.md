# 공통 개선 반영 — 2026-10-31

## 반영 내용

- Codex/Claude worker의 UTF-8 출력 버퍼 경계와 초과 실패 처리.
- 전체 이벤트 payload 대신 개수만 보관하고, Claude 성공 시 pipe close까지 대기.
- 프로젝트 상태의 같은 문서5개를 제한된 동시성으로 읽고 반환 순서·404·권한 오류 동작 유지.
- 정확히 동일한 상태 블록만 공유하는 lossless context-pack 및 원문 복원 검사.
- Zod4.6.7 및 호환 transitive dependency 보안 수정.
- 동일한 승인 범위 재확인·동일 SHA 원문 재출력 방지 지침.

이 공통 배포는 프로젝트 상태·Task·비공개 점검 보고서·고객/개인 자료를 포함하지
않아요. 원본의 private Git history를 가져오지 않고 이 저장소의 기존 main을
parent로 유지해요. Runtime 회사 배포본의 runtime.invalid와 계정 경계는 유지해요.

## 검증 범위

공개본의 관련 worker/auth/model/store 회귀 검사와 context-pack 검사를 수행해요.
기존 공개본 dca864f에서도 재현된 fixture 두 문제는 공개본의 실제 mock repository
이름과 runtime.invalid에 맞게 수정했어요. 인증 허용 범위를 넓히거나 실제
idempotency 해시 알고리즘을 바꾼 것이 아니에요.

의존성 검사 대상은 업데이트한 package-lock의 production 의존성이에요.
기존 공개본은 전체 운영 config·배포 docs·workflow를 제외한 source-only 배포여서
원본 전체 CI나 실제 서비스/worker 설치·MCP 연결 완료로 표시하지 않아요.
자동 실행·배포·새 GitHub workflow·프로젝트 등록은 하지 않았어요.

## context-pack 사용 경계

API의 packDocuments/expandPack은 승인된 읽기 경로로 이미 확보한 문서에만 사용해요.
CLI는 확인한 승인 commit SHA와 선택한 provider/project를 요구해요. 이 공개 공통
저장소에는 프로젝트 상태가 없으므로, CLI 실행만으로 다른 비공개 저장소의
문서를 가져오거나 접근 권한을 얻지 못해요. 필요한 표준 문서 구조를 갖춘
승인된 비공개 checkout에서만 CLI를 사용해요. shared blocks와 documents를 함께
읽으며 고유 정책·과거 evidence를 생략하지 않아요.

## 배포 상태와 rollback

소스 반영은 설치·활성화·실사용 검증과 달라요. distribution.json의 프로젝트 목록은
비어 있고 자동화는 비활성, Runtime은 source-only-not-configured를 유지해요.
rollback은 이번 동기화 PR의 merge commit을 되돌리는 방식으로 기존 공개 이력을
보존해요. dependency rollback은 알려진 취약점을 다시 포함할 수 있어 별도 검토해요.
