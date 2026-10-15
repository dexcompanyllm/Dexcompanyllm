---
type: llm-wiki-source
status: captured
title: "OpenAI Codex Chronicle memory privacy boundary"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source:
  - "https://developers.openai.com/codex/memories/chronicle"
  - "https://developers.openai.com/codex/memories"
publisher: "OpenAI"
collectionPurpose: "Dex Company의 Codex memory, Chronicle, Obsidian 장기 기억 경계를 분리하고 화면 캡처 기반 기억 기능의 개인정보/운영 리스크를 기록한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - memory
  - privacy
  - automation
---

# OpenAI Codex Chronicle Memory Privacy Boundary

## Original Content

- 수집 시각: 2026-07-04 03:34 KST
- 자료 유형: OpenAI 공식 Codex documentation
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 짧은 요약, Dex Company 적용 판단만 보존한다.
- 확인 범위: Chronicle의 opt-in research preview 상태, macOS/ChatGPT Pro 제한, 화면 캡처 기반 memory 생성, 민감정보 주의, 임시 캡처 파일과 markdown memory 저장 경계, 일반 Codex memories의 AGENTS.md 우선 원칙.

## Source-Backed Notes

- Chronicle은 최근 화면 컨텍스트에서 Codex memory를 만드는 opt-in research preview이며, 공식 문서는 현재 macOS의 ChatGPT Pro 구독자로 제한된다고 설명한다.
- Chronicle은 화면 캡처를 사용하므로 화면에 보이는 민감정보가 포함될 수 있다. 공식 문서는 회의나 타인과의 커뮤니케이션 기록에 동의 없이 사용하지 말고, 기억되면 안 되는 콘텐츠를 볼 때 일시 중지하라고 안내한다.
- 화면 캡처 파일은 임시 로컬 파일로 다뤄지며, 생성된 memory는 다른 Codex memories와 같이 암호화되지 않은 Markdown 파일로 남을 수 있다고 설명한다.
- 일반 Codex memories 문서는 팀 규칙과 반드시 적용되어야 하는 지침은 memory가 아니라 `AGENTS.md` 또는 체크인된 문서에 둬야 한다고 설명한다.

## Dex Company Use Example

- Dex Company에서는 Obsidian Vault와 `AGENTS.md`를 운영 규칙의 source of truth로 유지하고, Codex memories/Chronicle은 보조 recall layer로만 취급한다.
- Chronicle이나 화면 기반 memory를 켜기 전에는 `screen_capture.scope`, `consent.required`, `sensitive_view.pause_rule`, `memory.file_path`, `delete.path`, `availability.surface`를 확인해야 한다.
- 에던님의 Windows 환경에서는 macOS 제한 때문에 Chronicle 사용 가능 여부를 current로 말하지 않는다. 실제 사용 요청이 있을 때 OS, 계정 플랜, Codex app 버전, 기능 노출 여부를 다시 확인한다.

## Evidence Quality

- quality: medium
- 이유: OpenAI 공식 문서와 일반 memory 문서가 근거이지만, 에던님의 현재 PC/계정에서 기능이 보이는지 확인하지 않았다.
- 교차 검증: 기존 Dex Company `AGENTS.md`의 Obsidian source-of-truth 원칙, Codex managed configuration/source docs notes, Codex Windows setup note와 같은 방향이다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: sensitive information disclosure, overreliance, excessive agency, insecure output handling.
- 운영 제한: 화면 캡처 기반 기억은 비밀값, 고객정보, 사적 커뮤니케이션, 미공개 업무 화면을 포착할 수 있으므로 기본 활성화 후보가 아니다. 프로젝트별 승인, 일시 중지 규칙, 삭제 절차가 먼저 필요하다.

## Claim Split

- source-backed: Chronicle의 opt-in preview 성격, macOS/ChatGPT Pro 제한, 화면 캡처와 민감정보 주의, memory 파일의 Markdown 저장 특성, AGENTS.md 우선 원칙.
- Dex inference: Dex Company에서 Chronicle을 Obsidian/AGENTS.md 대체가 아니라 보조 기억으로만 둬야 한다는 운영 판단.
- not checked: 에던님 계정의 Chronicle 노출 여부, Windows 지원 여부 변화, 실제 파일 경로, 실제 삭제/수정 UI, rate-limit 영향.

