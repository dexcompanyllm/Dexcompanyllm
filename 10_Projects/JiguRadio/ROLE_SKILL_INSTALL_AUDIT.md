# ROLE_SKILL_INSTALL_AUDIT

이 문서는 역할 라우팅에 필요한 skill이 설치되었는지, 검증되었는지, 아직 보류인지 기록합니다.

Last updated: 2026-07-04

## Installed Baseline

### Local Watchdog Addition

Source: local Codex skill

Installed skill:

- `dex-watchdog`

이유:

- 실질적인 `/role` 작업 뒤 최종 점검 gate 역할을 합니다.
- 별도 유료 외부 에이전트 없이 Hermes-style watchdog 역할을 대체합니다.
- role routing, skill selection, QA evidence, Obsidian handoff, final report reliability를 점검합니다.

### Engineering Lifecycle Additions

Source: `addyosmani/agent-skills`

Installed skills:

- `browser-testing-with-devtools`
- `ci-cd-and-automation`
- `code-simplification`
- `context-engineering`
- `deprecation-and-migration`
- `documentation-and-adrs`
- `doubt-driven-development`
- `git-workflow-and-versioning`
- `observability-and-instrumentation`
- `source-driven-development`

이유:

- Developer, Publisher, QA, PL, launch workflow에 필요한 lifecycle gap을 채웁니다.
- 설치 당시 Markdown-only skill directory로 감사했습니다.

### PM And Planning Additions

Source: `deanpeters/Product-Manager-Skills`

Installed skills:

- `prd-development`
- `roadmap-planning`
- `prioritization-advisor`
- `user-story`
- `user-story-mapping`
- `epic-breakdown-advisor`
- `stakeholder-mapping`
- `opportunity-solution-tree`
- `customer-journey-map`
- `problem-statement`
- `jobs-to-be-done`

이유:

- PM, PL, Planner 산출물을 generic planning skill에만 의존하지 않게 합니다.
- 전체 library가 아니라 필요한 subset만 설치했습니다.

### PPT Additions

Source: `ningzimu/codex-ppt-skill`

Installed skill:

- `codex-ppt`

이유:

- image-based PPT/PPTX deck workflow를 제공합니다.
- editable deck은 `presentations:Presentations`, full-slide visual deck은 `codex-ppt`를 사용합니다.

Runtime:

- `%USERPROFILE%\.codex-ppt-skill\.venv`
- `python-pptx`, `Pillow`, `openai`, `filelock` bootstrap 완료.
- Windows PowerShell에서 출력 인코딩 문제가 있으면 `PYTHONIOENCODING=utf-8`을 설정합니다.

### Job Seeker Additions

Source: `santifer/career-ops`

Installed skill:

- `career-ops`

Repair applied:

- 기존 router-only `career-ops`를 backup했습니다.
- `.agents/skills/career-ops`를 재설치했습니다.
- upstream `modes/`를 `D:\Program Files\Codex\skills\career-ops\modes`로 복사했습니다.

이유:

- job scanning, application help, tracker, interview prep, PDF, follow-up workflow에 mode files가 필요합니다.

### Knowledge Management Addition

Source: local Dex Company adaptation, informed by `johnfkoo951/cmds-llm-wiki`

Installed skill:

- `llm-wiki`

이유:

- Obsidian LLM Wiki ingest, query, lint 작업을 Codex-native로 수행합니다.
- Raw Sources -> Wiki -> Schema 패턴을 덱스 컴퍼니에 맞게 흡수했습니다.
- upstream vault, hooks, dual-harness files는 bulk install하지 않았습니다.

Runtime:

- Markdown skill only.
- helper scripts: `new-llm-wiki-source.ps1`, `llm-wiki-status.ps1`, `llm-wiki-lint.ps1`, `llm-wiki-verify.ps1`, `llm-wiki-audit.ps1`

## Still Pending Audit

다음 후보들은 기본 설치 대상이 아닙니다.

| Candidate | 보류 이유 |
|---|---|
| `product-on-purpose/pm-skills` | 설치된 PM subset과 겹칩니다. 특정 Triple Diamond workflow가 필요할 때만 감사합니다. |
| `mohitagw15856/pm-claude-skills` | 범위가 넓습니다. 특정 gap이 있을 때 단일 skill만 감사합니다. |
| `lackeyjb/playwright-skill` | local `playwright`와 `browser-testing-with-devtools`가 기본 QA를 커버합니다. |
| `fugazi/test-automation-skills-agents` | QA 자동화에 유용할 수 있으나 concrete gap 전에는 global install하지 않습니다. |
| `Paramchoudhary/ResumeSkills` | 현재는 `career-ops`, `documents`, `pdf`, Dex-led Korean drafting으로 충분합니다. |
| `joepUI/motion-ref-skill` | motion-heavy design request가 있을 때 감사합니다. |
| `OthmanAdi/planning-with-files` | local `planning-with-files`가 이미 있습니다. |
| `johnfkoo951/cmds-llm-wiki` | reference implementation입니다. Dex Company는 pattern만 흡수했습니다. |

## Verification Checklist

- [x] Installed skills have `SKILL.md` in `D:\Program Files\Codex\skills`.
- [x] `dex-watchdog\SKILL.md` passes skill validation.
- [x] `career-ops\modes\_shared.md` exists.
- [x] `career-ops\modes\scan.md` exists.
- [x] `codex-ppt` runtime bootstrap completed.
- [x] `llm-wiki\SKILL.md` exists.
- [x] LLM Wiki helper scripts parse successfully.
- [x] `llm-wiki-status.ps1` and `llm-wiki-lint.ps1` pass on the current vault.

## Operational Rule

새 skill을 설치한 뒤에는 Codex를 재시작해야 active session에서 인식됩니다.

재시작 전에는 디스크에 설치되어 있어도 현재 세션의 skill list에 보이지 않을 수 있습니다.
