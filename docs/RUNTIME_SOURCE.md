# Dex Company Runtime source

공통 Console/PWA·Orchestrator·MCP·provider worker 소스의 회사 배포 후보예요. 소스는 apps/, packages/, services/, workers/에 있고 공통 스킬은 plugins/에 있어요. 개인 프로젝트 문서·운영 로그·이력·배포 설정·인증정보는 포함하지 않아요. 계정 기본값은 dexcompanyllm로 바꾸었고 이전 개인 서비스 URL은 runtime.invalid로 바꿔 실제 개인 서비스로 연결되지 않아요. runtime.invalid는 실행 주소가 아니에요.

현재 미배포·의존성 미설치·실제 동작 Not Checked예요. package.json과 lock은 원래 승인 소스의 의존성 명세이며 안전성이 재승인되거나 설치된 것은 아니에요. 운영 추적용 config와 과거 배포 docs·배포 workflow는 제외했으므로 원본 Runtime의 모든 실행/배포 검사가 그대로 통과한다고 보장하지 않아요. 실행/배포 전에 advisory 검토, dependency 검사, 테스트, 회사 비공개 project repository binding·OAuth account·redirect·권한 범위를 별도로 검증해야 해요. 이 공개 공통 저장소에 업무 Task를 쓰도록 GITHUB_REPO를 지정하지 마세요. 회사 프로젝트의 private repository만 사용해요.

코드 복사가 회사 Claude에 MCP를 연결하거나 서비스 권한을 부여하지 않아요. 자동 실행·배포·새 workflow는 없어요.
