---
type: llm-wiki-growth-scan-report
status: no-op
created: 2026-07-09
updated: 2026-07-09
timezone: Asia/Seoul
topic: cross-ai-tool-learning-policy
preflightStatus: fail
verificationStatus: not-applied
---

# Dex Company Growth Scan No-Op - Cross AI Tool Learning Policy

## 요청

에던님은 Growth Scan이 Codex 자료에만 갇히지 않고 Claude Code 등 다른 AI 개발 도구의 자료도 조사하되, Codex와 Dex Company 운영 체계에 맞춰 흡수할 수 있는 경우 학습 대상으로 삼기를 요청했습니다.

## 현재 상태

이번 요청은 타당한 운영 방향이지만, 2026-07-09 08:10 KST preflight에서 `free ram`이 FAIL이었습니다.

- 기준: free RAM 1GB 이상
- 측정: free RAM 0.67GB
- 판정: FAIL
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-081020.md`

Growth Scan 규칙상 preflight FAIL 상태에서는 새 검색, 새 source note 승격, 자동화 규칙 변경, connector/MCP/skill/package 실행을 진행하지 않습니다.

## 적용 예정 규칙

preflight가 PASS로 회복되면 다음 기준을 Growth Scan 후보 판단 규칙에 반영합니다.

1. 조사 대상은 Codex/OpenAI 자료로 제한하지 않습니다.
2. Claude Code, Cursor, Windsurf, GitHub Copilot, Devin, Aider, Goose, Cline, Roo Code 등 다른 AI coding/agent 도구도 학습 후보에 포함합니다.
3. 단, 도구 자체를 그대로 도입하는 것이 아니라 Codex와 Dex Company에 재사용 가능한 원칙, 체크리스트, 프롬프트 구조, QA 방법, 보안 기준, 워크플로우 패턴만 추출합니다.
4. 흡수 가능 여부는 `Codex portability`를 기준으로 판단합니다.
5. 다른 도구 전용 기능, 유료 계정 전제, 폐쇄형 런타임 의존, 검증되지 않은 SNS 단독 주장은 source note로 바로 승격하지 않습니다.

## Codex portability 판단 기준

- Codex의 파일 기반 작업, PowerShell, Obsidian LLM Wiki, 브라우저 QA, Git/PR 흐름에 옮길 수 있는가
- 공식 문서, GitHub, 릴리즈 노트, 논문, 고품질 블로그 등으로 출처가 확인되는가
- 설치 없이 체크리스트나 운영 원칙으로 먼저 반영할 수 있는가
- 보안, 비용, 계정 권한, 비밀값 노출 위험을 낮추는 방향인가
- 에던님의 PPT, frontend, UX/UI, GUI, automation, career ops 작업 품질을 실제로 높이는가

## 반영하지 않은 것

이번 턴에서는 자동화 파일, source note, wiki note를 수정하지 않았습니다.

이유는 preflight FAIL 상태에서 규칙을 바꾸면 과거에 발생했던 호환성/리소스 문제를 반복할 수 있기 때문입니다. 현재는 no-op 보고서만 남기고, 다음 PASS 상태에서 반영합니다.

