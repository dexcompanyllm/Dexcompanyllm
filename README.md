# Dex Company — 공통 업무 배포본

공통 지침·스킬·Runtime 소스만 관리해요. 개인 프로젝트·상태·작업 로그·개인 Git 이력은 이 배포에 포함하지 않아요. 공통 기준은 이 저장소의 검수된 main, 회사 프로젝트 자료는 각 비공개 저장소를 사용해요.

시작: [CLAUDE.md](CLAUDE.md), [AI_CONTRACT.md](AI_CONTRACT.md), [회사 Claude 연결](docs/CLAUDE_SETUP.md).

- 공통 스킬 3개와 에이전트 메타데이터: plugins/dex-company-core
- Runtime·Console·MCP·worker 소스: apps/, packages/, services/, workers/ (배포/설치/실제 연결 미검증)
- 프로젝트 등록: 비공개 원본에서만 관리. 이 공개 배포본의 project catalog는 비어 있어요.
- 자동화: 실행/재개/신규 등록 없음. paid API와 자동 유료 fallback 금지.

이 저장소는 기존 공개 저장소의 현재 파일을 공통 배포본으로 갱신해요. 기존에 공개돼 있던 과거 commit은 이 작업으로 삭제하거나 비공개로 바꾸지 않아요. Claude 연결은 현재 main의 허용 파일만 선택하며 과거 개인 운영 자료를 가져오지 않아요.
