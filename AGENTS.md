# 공통 AI 진입점

CLAUDE.md의 bootstrap과 AI_CONTRACT.md를 모든 AI에 적용해요. 공통 스킬은 plugins/dex-company-core, Runtime source는 apps/, packages/, services/, workers/예요. 프로젝트 상태는 승인된 비공개 프로젝트 저장소에서만 읽어요. 공통 배포에 개인/회사 프로젝트 내용을 넣지 않아요. paid fallback·자동화·자동 설치를 활성화하지 않아요.

## 효율적인 컨텍스트와 기존 승인

같은 세션에서 source SHA가 같은 원문은 반복 출력하지 않아요. 완전히 같은 상태
블록은 한 번 공유하되 고유 정책·근거는 보존해요. 선택한 provider와 비공개
프로젝트만 읽고, 이미 확인된 동일 범위의 승인을 반복 요청하지 않아요.
새 권한·비용·데이터·배포 범위와 독립 검수 조건은 별도로 유지해요.

scripts/context-pack.mjs는 원문 손실 없는 공통 도구예요. 이 공개 공통 저장소에는
프로젝트 상태가 없으므로 여기에서 실행해 회사 프로젝트를 가져올 수 없어요.
승인된 비공개 checkout이 필요한 기본 문서 구조를 갖춘 경우에만 CLI를 사용해요.
또는 승인된 읽기 경로로 확보한 문서를 packDocuments/expandPack에 전달할 수 있어요.
도구를 복사한 것만으로 비공개 자료 접근·설치·계정 연결이 완료되지 않아요.
