---
type: llm-wiki-growth-scan-report
status: incident-no-op
created: 2026-07-09
updated: 2026-07-09
timezone: Asia/Seoul
topic: growth-scan-automation-improvement
preflightStatus: fail
verificationStatus: partial
---

# Dex Company Growth Scan Improvement - Blocked By Low RAM

## 요청

에던님은 지금까지의 학습 자동화에서 부족했던 점을 개선하자고 요청했습니다.

## Preflight 결과

자동화 프롬프트, weekly synthesis, daily adoption, cross-AI tool 흡수 기준을 수정하기 전에 preflight를 다시 실행했습니다.

- 2026-07-09 08:24 KST: FAIL
  - free RAM 0.98GB
  - 기준 1GB 미만
  - report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-082445.md`
- 2026-07-09 08:25 KST: FAIL
  - free RAM 0.97GB
  - 기준 1GB 미만
  - report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-082518.md`

규칙상 preflight FAIL 상태에서는 새 검색, 새 source/wiki 작성, 자동화 프롬프트 변경, connector/MCP/skill/package 실행을 진행하지 않습니다.

## 이번 턴에서 반영하지 않은 변경

아래 변경은 타당하지만, 현재는 적용하지 않았습니다.

1. 30분 Growth Scan에 low-RAM backoff 규칙 추가
2. Claude Code, Cursor, Windsurf 등 비-Codex AI 도구의 Codex portability 평가 기준 추가
3. 22:30 daily adoption selection을 별도 자동화 또는 명확한 실행 모드로 분리
4. Weekly Growth Synthesis 재활성화 검토
5. PPT/frontend/career ops별 작은 before-after eval 추가
6. 일일 압축 보고서 형식 추가: 반영 / 보류 / 다음 확인

## 다음 PASS 때 적용할 개선안

preflight가 PASS로 회복되면 다음 순서로 반영합니다.

1. `dex-company-growth-scan/automation.toml`
   - 30분 실행은 fast discovery로 유지하되, free RAM이 1GB 근처이면 검색/저장을 하지 않고 no-op/backoff로 종료하도록 명시합니다.
   - Claude Code, Cursor, Windsurf, GitHub Copilot, Devin, Aider, Cline, Roo Code 등 비-Codex 도구도 조사 대상에 포함하되, Codex로 옮길 수 있는 원칙만 흡수하도록 명시합니다.
   - `Codex portability` 필드를 후보 평가 기준에 추가합니다.
   - 매회 source 저장보다 concrete checklist field, approval field, QA field, acceptance test 생성을 우선합니다.

2. `dex-company-weekly-growth-synthesis/automation.toml`
   - 현재 `PAUSED` 상태이므로 재활성화 여부를 검토합니다.
   - 주간 synthesis는 자료 나열이 아니라 작업별 체크리스트 압축에 집중하도록 보강합니다.

3. Daily adoption
   - 22:30에는 그날 후보 중 최대 1-3개만 실제 반영 후보로 선정합니다.
   - 선택 기준은 `사용 빈도`, `에던님 작업 영향`, `설치 없이 적용 가능`, `source-backed`, `검증 가능성`입니다.

4. Eval
   - PPT: 한 슬라이드에서 메시지, 시각 계층, 출처, 모바일/이메일 가독성 확인
   - Frontend: 핵심 flow 1개에서 Playwright/ARIA/trace evidence 확인
   - Career ops: 자동화가 제출 전 사람 승인과 resume overwrite 방지를 지키는지 확인

## Watchdog 판정

Verdict: NEEDS_DEX_REWORK

사유: 개선 방향은 명확하지만, free RAM preflight FAIL 때문에 실제 자동화 변경을 적용하면 stop-the-line 규칙을 위반합니다.

