# 공통 스킬의 수동 설치와 검증

공통 플러그인 버전: `1.5.0`. 포함 스킬: `use-dex-company`, `create-screen-spec`, `design-quality`.

`.agents/plugins/marketplace.json`은 수동 설치를 위한 목록이다. `AVAILABLE`·`ON_INSTALL`을 유지하며 자동 설치, 원격 실행, MCP/App 연결 또는 Runtime 배포를 활성화하지 않는다. GitHub로 파일을 읽는 방식과 로컬 플러그인 설치는 별개다.

## Codex에서 설치

현재 검증한 Codex CLI의 명령은 다음과 같다. 먼저 `codex --version`과 각 명령의 `--help`로 사용하는 호스트의 지원 여부를 확인한다.

```sh
codex plugin marketplace add dexcompanyllm/Dexcompanyllm --ref main --json
codex plugin list --marketplace dex-company --available --json
codex plugin add dex-company-core@dex-company --json
codex plugin list --marketplace dex-company --json
```

이미 등록한 Git marketplace를 갱신할 때는 다음 명령을 사용한다.

```sh
codex plugin marketplace upgrade dex-company --json
codex plugin add dex-company-core@dex-company --json
```

검증용 로컬 checkout은 Git 주소 대신 해당 checkout 경로를 `marketplace add`에 전달할 수 있다. 로컬 등록은 그 디렉터리에 의존한다. 이 작업 환경의 로컬 설치 결과를 사용자의 PC·Claude·ChatGPT 설치 결과로 일반화하지 않는다.

새 프로세스에서 다음 이름의 발견 여부와 실제 경로·버전을 확인한다.

- `dex-company-core:use-dex-company`
- `dex-company-core:create-screen-spec`
- `dex-company-core:design-quality`

`plugin list`의 installed/enabled와 실제 스킬 호출은 서로 다른 검사다. 새 세션에서 운영 문맥 읽기, 화면설계서 생성, 화면/보고서 검토를 각각 수행하고 결과물을 확인한다. 로그인 상태 표시만으로 모델 호출 인증을 통과했다고 판단하지 않는다. 인증 오류는 그대로 기록하고 유료 API로 우회하지 않는다.

## GitHub 연결로 사용하는 경우

[회사 Claude 연결](CLAUDE_SETUP.md)을 따른다. 승인된 현재 main의 계약과 필요한 스킬·참고파일을 선택한다. 작업 시작 시 읽은 revision을 확인하고, 이전 동기화본을 최신 설치본으로 취급하지 않는다. 회사별 실제 읽기·호출은 해당 계정에서 따로 확인한다.

## 설치본을 보존하는 업데이트

기존 호스트의 버전·경로·파일 해시와 사용 설정을 먼저 보존한다. 기존 스킬의 고유 내용은 비교 후 유지하고 legacy 폴더나 사용자 편집을 삭제하지 않는다. 되돌리기는 승인된 이전 소스 커밋과 설치 기록을 사용한다. 설치된 캐시를 직접 수정하지 않는다.

최신 검증의 범위와 미확인 항목은 플러그인의 [검증 기록](../plugins/dex-company-core/skills/design-quality/references/RELEASE_VERIFICATION_20261112.md)을 확인한다. 이 문서의 명령은 서버 배포나 모든 스킬 일괄 설치 명령이 아니다.
