# Dex Company Bootstrap

## Meaning
**Bootstrap means: load the canonical Dex Company context, verify the current worker's capabilities, and prepare to work.**

Bootstrap is **not** reset, delete, reinstall, factory reset, repository recreation, or data initialization. Existing repository content must not be removed or rewritten merely because Bootstrap was requested.

## Universal bootstrap procedure
1. Access the Dex Company repository and use the latest approved `main` as the Source of Truth.
2. Read `README.md`.
3. Read `AI_INSTRUCTIONS.md`.
4. Read `AGENTS.md`.
5. Discover and verify the current AI/agent/runtime's actual capabilities, tools, connectors, permissions, and execution limits.
6. Load only the `skills/`, `playbooks/`, and `templates/` needed for the current task.
7. Apply security, evidence, validation, and Human Review rules.
8. Report readiness without modifying the repository unless the user has separately requested a change.

## Universal start command
> GitHub `dexcompanyllm/Dexcompanyllm`의 `BOOTSTRAP.md`를 읽고 Dex Company를 Bootstrap해. 기존 저장소나 데이터를 Reset·삭제·재생성하지 말고, 최신 canonical 기준을 로드한 뒤 현재 네가 실제로 사용할 수 있는 capability와 제한을 확인해서 Dex Company 작업 준비 상태를 보고해.

## Ready report
Report only:
- canonical basis loaded
- verified available capabilities
- unavailable or unverified capabilities
- readiness / blocker

A named provider or model is never required for Bootstrap. Any current or future AI/agent system may participate if it can access the required context and its needed capabilities can be verified.
