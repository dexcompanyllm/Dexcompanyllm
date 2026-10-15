# Setup QA

이 파일은 덱스 컴퍼니 세팅 상태를 확인하기 위한 체크리스트입니다.

Last verified: 2026-07-19

## Checks

- [x] Vault folder structure exists
- [x] `AGENTS.md` exists at vault root
- [ ] Codex starts from the vault path
- [ ] Obsidian opens generated Markdown notes
- [ ] Optional Obsidian CLI works end to end
- [x] `new-obsidian-codex-project.ps1`로 project folder 생성 가능
- [x] `setup-code-repo-link.ps1` dry-run으로 code repository link 생성 경로 확인
- [x] `collect-project-context.ps1`로 context packet 생성 가능
- [x] `DEX_COMPANY_OVERVIEW.md`, `DEX_QUALITY_LEARNING_RULES.md`, `ROLE_TOOL_SKILL_MATRIX.md`, `ROLE_SKILL_ROUTING.md`, `ROLE_SKILL_INSTALL_AUDIT.md`, `OBSIDIAN_USAGE_GUIDE.md` 존재
- [x] `LLM_WIKI_OPERATING_GUIDE.md` 존재
- [x] `LLM_WIKI_VERIFICATION_SCHEMA.md` 존재
- [x] `30_Knowledge/LLM_Wiki/` has source, wiki, query, lint, audit, schema, index, log, README
- [x] `00_Inbox/LLM_Wiki/` exists
- [x] `70_Outputs/LLM_Wiki/` exists
- [x] local `llm-wiki` skill exists
- [x] required role skills exist
- [x] `career-ops\modes\_shared.md` and `career-ops\modes\scan.md` exist
- [x] `codex-ppt` runtime exists
- [x] `dex-watchdog` is available and uses Codex `imagegen` routing
- [x] Obsidian Sync is disabled for local file-first operation

## Verification Evidence

- `vault-health-check.ps1`: PASS, 0 warnings
- `llm-wiki-status.ps1`: PASS, sources 183 / wiki 8 / queries 2
- `llm-wiki-lint.ps1`: PASS, 0 warnings
- `new-obsidian-codex-project.ps1`: 4개 실제 project 생성 + 추가 dry-run PASS
- `collect-project-context.ps1`: DexCompany-Ops 기준 31개 파일, 품질 규칙 포함, missing wikilink 없음
- `setup-code-repo-link.ps1`: dry-run PASS. 기존 code-repository `AGENTS.md`를 보호하기 위해 이번에는 apply하지 않음

## Not Checked

- 이 세션은 code workspace에서 실행했으므로 `start-codex-in-vault.ps1`의 대화형 실행은 확인하지 않았습니다.
- Obsidian CLI executable은 발견됐지만 Obsidian 앱이 실행 중이 아니어서 end-to-end 명령은 `unable to find Obsidian`으로 미확인입니다.
- Obsidian GUI에서 생성된 Markdown 노트를 직접 여는 동작은 확인하지 않았습니다.

## Notes

- 이 파일은 세팅 검증용입니다.
- 프로젝트별 QA는 각 프로젝트 폴더의 `QA_REPORT.md`에 기록합니다.
- machine-readable path와 key는 영어를 유지하고, 사람이 읽는 설명은 한국어를 기본으로 합니다.
