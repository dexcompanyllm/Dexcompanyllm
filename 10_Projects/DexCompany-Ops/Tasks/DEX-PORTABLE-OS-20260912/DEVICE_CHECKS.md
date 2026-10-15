# 실제 기기에서 이어갈 검증

기기는 접속과 실행을 따로 판정해요. 가능한 기기부터 검사하고 다른 기기가 없다는 이유로 중단하지 않아요. 이 문서는 준비된 시험표이며 실제 통과 기록이 아니에요.

## 공통 증거 양식

Task ID / 검사 ID / 기기·OS·앱·버전 / 개인·회사 계정 경계 / 고정 Runtime·정책·Plugin revision / 실제 동작 / PASS·FAIL·Not Checked / 개인정보 없는 증거 참조 / 독립 검수자 / 유효 기간·무효화 조건을 남겨요. 기기 별명은 사용할 수 있지만 토큰·개인 경로·계정 원문·화면 속 고객정보는 남기지 않아요.

## 접근 시험 — 각 기기 독립

| 검사 | Galaxy | iPhone | Windows | Mac | 통과 조건 |
|---|---|---|---|---|---|
| 로그인·계정 변경 | Not Checked | Not Checked | Not Checked | Not Checked | 올바른 계정, 다른 계정 자료·초안 노출 없음 |
| 같은 Task 조회·결과 회수 | Not Checked | Not Checked | Not Checked | Not Checked | 동일 ID·상태 버전·결과 hash, worker 재실행 0 |
| 요청 제출·응답 유실·재시도 | Not Checked | Not Checked | Not Checked | Not Checked | 같은 입력의 중복 Task·side effect 0 |
| 로그인 복귀·앱 복귀 | Not Checked | Not Checked | Not Checked | Not Checked | 같은 계정 임시 입력 복원, 자동 제출 0 |
| 파일·산출물 참조 | Not Checked | Not Checked | Not Checked | Not Checked | 승인된 파일 접근·읽기 가능, 다른 로컬 경로 추정 없음 |
| 승인·거절·취소 | Not Checked | Not Checked | Not Checked | Not Checked | 실제 지원되는 승인 경로에서 범위 보존, 미지원 UI는 우회 |
| 작은 화면·키보드·네트워크 복구 | Not Checked | Not Checked | Not Checked | Not Checked | 버튼·결과 접근, 입력 손실·중복 없음 |
| native plugin 미지원/차단 | Not Checked | Not Checked | Not Checked | Not Checked | PWA/GitHub로 같은 Task를 연결, 새 권한 요구 없음 |

작성 중 초안은 현재 같은 탭·동일 계정·30분 안에서만 복원해요. 미제출 초안의 기기 간 동기화는 아직 구현되지 않았어요. 접수된 Task는 canonical 기록에서 이어가요. 첨부 업로드, 승인 UI, 알림은 실제 구현된 경로만 시험하고 미구현은 Not Checked로 남겨요.

## 실행 host 사전 점검

이미 승인된 전용 계정과 실제 checkout을 먼저 확인해요. 개인 계정을 전용 worker로 간주하거나 새 계정·권한을 자동 생성하지 않아요. 변경 중인 폴더에서 branch 전환·초기화하지 않고 사용자 작업을 보존해요. 고정할 Runtime revision은 PR의 최신 통과 commit과 독립 검수 상태로 다시 확인해요.

기존 checkout에서 읽기 확인:

```text
git status --porcelain=v1
git rev-parse HEAD
node --version
npm --version
```

확인된 전용 worker의 기존 격리 설정에서만 다음을 순서대로 실행해요. Windows에서는 필요한 경우 npm 대신 npm.cmd를 사용해요.

```text
npm run worker:host-check
npm run codex:doctor
npm run codex:compatibility
npm run codex:status
```

한 단계라도 실패하면 해당 실행 경로만 멈춰요. 결과를 만들기 위해 인증·사용량·권한을 변경하지 않아요. OS가 보고한 실제 사용자 신원, profile-local 인증, GitHub/SSH/Git 자격증명 미상속, registry pin을 확인해요. 선택 UID/SID pin은 승인된 구성값과 비교하고 값 원문을 공개하지 않아요.

## Windows와 Mac 실행 시험

모든 host는 기존 6개 시나리오(offline/resume, read-only no-op, approval pending/deny, 승인된 한 파일 변경, timeout/stale, canonical retrieval)와 P3-PERM/CWD/PROCESS/SCOPE를 통과해야 해요. 원래 목표·제약을 detached verifier가 다시 확인하는 증거도 포함해요.

- Windows: 기존 Runtime `docs/PHASE3_LOCAL_BRIDGE.md`, `docs/PHASE3_SAFETY_MATRIX.md`의 NTFS/ACL, 실제 계정·process·cwd 검사를 유지해요.
- Mac: 위 안전 속성을 그대로 요구하되 NTFS 명령을 복사하지 않아요. 승인된 별도 계정, POSIX 권한·ACL, keychain/SSH/Git credential 격리, symlink·실제 child cwd, PID+생성 시점+descendants, Task-owned spool/coordination 경계를 macOS에서 증명해요. 지원되지 않는 관측·강제 기능은 구현 누락으로 기록해요.
- 각 OS에서 준비된 disposable fixture만 사용해요. 실제 home·다른 프로젝트 삭제나 강제 프로세스 종료를 검증 수단으로 쓰지 않아요.
- Claude는 subscription 인증 성공과 bounded writer/verifier 안전 동등성을 별도로 검사해요. 현 OpenAI local bridge의 성공을 Claude의 성공으로 복제하지 않아요. Gemini Runtime adapter는 구현·검증되지 않았으므로 자동 실행 경로로 선택하지 않아요.

## 다른 기기·AI로 전환

읽기/초안 작업, repo 수정, 연구 검수 중 하나의 동일 Task를 선택해요. 첫 환경에서 checkpoint와 receipt를 남기고 두 번째 환경에서 같은 자료를 읽어요. 원래 요청 재입력, 완료된 side effect 재실행, 승인 확대가 없어야 해요. 회사 계정은 회사 정책과 해당 데이터 범위가 허용된 경우에만 사용해요.

해당 기기에서 사용할 입력 문장:

> Dex 전체 개선 Task를 이어줘. 지금 접속 기기와 실제 실행 환경을 따로 확인하고, 승인된 설정 안에서 가능한 검증부터 진행해. Windows 전체 검증을 공통 사용의 선행 조건으로 삼지 말고, 기존 Task·승인·자료·결과를 보존해. 기기나 권한이 필요한 항목만 남기고 다른 작업은 계속해.

실제 설치나 배포가 필요한 시점에만 대상·버전·변경·되돌리기를 제시해요. 지금 4개 기기를 모두 준비하라는 요구는 아니에요.
