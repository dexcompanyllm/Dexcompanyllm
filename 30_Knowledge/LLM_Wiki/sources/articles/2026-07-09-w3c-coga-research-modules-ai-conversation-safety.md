---
type: llm-wiki-source
status: active
title: "W3C Cognitive Accessibility Research Modules for AI, Conversation, Safety, and Decision Support"
sourceKind: official-docs
source:
  - "https://www.w3.org/TR/coga-research-modules/"
  - "https://www.w3.org/TR/2026/DNOTE-coga-voice-20260205/"
  - "https://www.w3.org/TR/coga-safety/"
  - "https://www.w3.org/TR/coga-sdm/"
  - "https://www.w3.org/WAI/news/2026-02-05/coga/"
publisher: W3C Web Accessibility Initiative
capturedAt: 2026-07-09T01:39:00+09:00
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
collectionPurpose: "Dex Company frontend, AI agent, career ops, and PPT/product QA에서 대화형 AI, 알고리즘 안전, 온라인 의사결정 지원을 cognitive accessibility evidence field로 분리하기 위해 수집한다."
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - accessibility
  - cognitive-accessibility
  - ai-agents
  - frontend
  - safety
  - decision-support
---

# W3C Cognitive Accessibility Research Modules for AI, Conversation, Safety, and Decision Support

## Original Content

- Title: Cognitive Accessibility Research Modules
- Publisher: W3C Web Accessibility Initiative / Accessible Platform Architectures Working Group
- Publication status: W3C Group Note Draft, 2026-02-05
- Capture time: 2026-07-09 01:39 KST
- Preservation method: 원문 전체를 복사하지 않고 URL, publication status, 확인 범위, 짧은 요약, Dex Company 적용 판단만 보존한다.
- Checked scope: overview module, Voice Systems and Conversational Interfaces module, Online Safety and Wellbeing module, Supported Decision-Making Online module, W3C WAI announcement page.

## Source-Backed Notes

- W3C overview says the current research modules cover voice systems and conversational interfaces, technology-assisted wayfinding, online safety and wellbeing, and supported decision-making online.
- The voice/conversational module explicitly includes voice AI assistants, NLP systems, voice menus, and IVR systems. It identifies risks around memory, executive function, reasoning, processing speed, attention, language, speech recognition, and mental health.
- The same module marks itself as an early draft and says Group Note Drafts are not endorsed by W3C or its members. It should be used as research-backed guidance, not as a final conformance standard.
- The online safety module covers cognitive-accessibility risks around cybercrime, deception, algorithmic/data privacy harms, social media, mental health, and wellbeing. It also notes that some reviewed evidence is weak or correlational, so confidence must stay bounded.
- The supported decision-making module says the user remains the decision-maker, support should clarify options and risks, and online processes should preserve dignity, autonomy, custom support levels, and final user control.

## Dex Company Use Example

- AI assistant or chatbot UI: record `human_backup_path`, `memory_load_reduction`, `timeout_flexibility`, `plain_language_response`, `speech_or_text_alternative`, and `error_recovery_loop`.
- Career Ops / application automation: record whether the user keeps final control, whether risk/benefit options are plain-language, whether helper access is view-only or delegated, and whether high-risk actions require explicit confirmation.
- Frontend QA: for AI, conversational, or recommendation flows, do not stop at keyboard/screenshot checks. Add cognitive-accessibility evidence for processing time, user control, algorithmic explanation, privacy/data-use clarity, and recovery from mistakes.
- PPT/product review: when presenting an AI workflow or user decision path, include a plain-language summary, decision tradeoff table, risk statement, and "what remains user-controlled" note.

## Source-Backed / Dex Inference / Not Checked

- source-backed: W3C published the research modules as Group Note Drafts on 2026-02-05; the modules cover conversational AI/voice systems, online safety and wellbeing, and supported decision-making online.
- Dex inference: Dex Company should extend PPT/frontend QA with AI-conversation and decision-support evidence fields instead of treating COGA only as generic complex-information guidance.
- not checked: no live chatbot, voice UI, screen reader, speech recognition, career platform, or target frontend repository was tested in this run.

## Evidence Quality

- Evidence quality: medium-high for publication status and module scope because the sources are W3C/WAI official pages.
- Confidence limit: medium for operational rules because the documents are early draft notes, not final W3C Recommendations or WCAG conformance criteria.
- Cross-check: overview page, WAI announcement, and individual module pages agree on the module set and draft status.

## License / Security / Install Risk

- No code, package, MCP server, connector, browser extension, GitHub workflow, account connection, token, or credential was installed or changed.
- Primary risk is overreliance: these modules should guide QA questions, not certify accessibility by themselves.
- For AI/agent products, relevant OWASP-style risks include sensitive information disclosure, excessive agency, overreliance, prompt injection, and insecure output handling.
