# Claude·Claude Code의 Dex 사용량 정책

- Task: `DEX-EVOLUTION-ASSESSMENT-20261010`의 2026-10-16 후속 요청
- 요청: Claude에서 Dex를 사용할 때 토큰 사용량 제한을 풀어 달라는 에던의 직접 지시
- 상태: branch에서는 변경안, 검수 후 승인 main에 병합되면 Claude 진입 지침으로 유효해요.
- 기준 변경: `CLAUDE.md`, `providers/anthropic.yaml`
- 비용 승인: 기존 구독 포함량만 사용해요. paid API·automatic paid fallback·extra usage는 여전히 false예요.

## 결정

실제 Anthropic 실행에는 `quality-first`를 적용해요. Dex 자체의 입력·출력·추론 토큰 cap은 두지 않고, 토큰 절약만을 이유로 분석 깊이·답변 분량·원문 확인·필수 QA·독립 검수를 줄이거나 저사양 모델로 강제하지 않아요. 출력 분량은 작업과 에던의 요구에 맞춰요.

이전 Plus 작업의 Task·승인·완료 증거는 승계하지만, OpenAI `plus-efficient` 모델 라우팅과 절약 지침을 Claude 실행에 그대로 적용하지 않아요. 실제 실행 provider가 OpenAI이면 해당 OpenAI 정책이 계속 적용돼요. 같은 Task라도 실행 provider별 사용량 정책을 구분해요.

관련 없는 전체 저장소 로딩·반복 실행·무한 재시도는 허용하지 않아요. 최소 컨텍스트·동일 실패 처리·one writer·검수·보안·승인 경계는 유지해요. 원문이 더 필요하면 확보하고, 완료 기준을 충족하거나 검증된 blocker가 발생하면 종료·인계해요.

## 해제 대상과 유지 대상

| 구분 | 처리 |
|---|---|
| Dex가 추가하는 토큰 예산·출력 cap | Claude 실행에서 두지 않아요. YAML null은 Dex cap 미설정이라는 뜻이에요. |
| Plus 절약을 위한 모델·추론·문서 축소 | Claude에 상속하지 않아요. |
| 실제 공급자 rate limit·context/output 한도 | 준수해요. 무제한 계정이라고 가정하지 않아요. |
| 유료 API·추가 사용량·자동 credit 사용 | 비활성을 유지해요. |
| ChatGPT/OpenAI 설정과 현재 세션 | 변경하지 않아요. |
| Claude 계정 연결·model/effort UI·정책 로딩 | 직접 확인 전까지 Not Checked예요. |

`providers/anthropic.yaml`의 새 usagePolicy는 지침용 메타데이터이며 현재 Runtime이 이를 기계적으로 파싱·강제한다고 주장하지 않아요. 실제 적용은 Claude가 최신 main의 CLAUDE.md와 adapter를 읽는 경로에서 확인해야 해요. 기존 Runtime 코드는 변경하지 않아요.

## 공식 근거와 미확인 범위

2026-10-16 KST에 다음 Anthropic 공식 문서를 확인했어요.

- [Usage and length limits](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work): 공급자 사용량 한도와 문맥 길이 한도는 별개이며 제품 간 사용량이 공유될 수 있어요. 계정 한도 해제로 표현하지 않아요.
- [Claude Code with Pro or Max](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan): 구독과 API 청구 경계를 구분해요. API key가 있으면 구독 대신 API 인증이 선택될 수 있어 기존 key 감지 중지 정책을 보존해요.

에던의 현재 Claude 요금제·잔여량·workspace 정책·연결 상태는 조회하지 않았으므로 unknown / Not Checked예요. 계정 사용량이 많다는 요청 맥락을 Dex 내부 절약 제한 해제의 근거로 사용하고 무제한 사용권이나 비용 승인으로 확대하지 않아요.

## 검증·인계·rollback

변경은 Claude 진입 지침과 Anthropic adapter, 이 기록 세 파일로 제한해요. YAML 구조·기존 cost/authentication 정책의 무변경·관련 지침의 일치·원격 diff·Wiki 정합성 CI·별도 read-only 검수로 확인해요. 실제 Claude 수신·실행은 Not Checked예요.

Claude에서 Dex 사용을 시작할 때 최신 승인 main의 AI_CONTRACT.md → CLAUDE.md → providers/anthropic.yaml과 해당 프로젝트·기존 Task를 읽어요. 이미 진행 중인 Task·승인을 다시 만들지 않아요. 기존 세션이 오래된 지침을 사용하면 최신 main의 변경분을 다시 읽어요.

문제가 있으면 후속 변경을 확인한 뒤 이 PR만 revert해요. 공통 계약·OpenAI 정책·역사 기록·기존 Task 결과를 되돌리지 않아요.
