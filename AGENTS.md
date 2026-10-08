# Universal Agent Entry Point

Read `AI_INSTRUCTIONS.md` first. It is the canonical contract for any AI or agent worker.

Then load only the skill, playbook, template, and task context needed.

## Routing
1. Identify the requested outcome and acceptance criteria.
2. Discover and verify available capabilities.
3. Select workers by capability, risk, availability, and policy—not vendor name.
4. Keep one accountable lead and one active writer per mutation scope.
5. Use independent verification when risk warrants it.
6. Persist one canonical result.

Provider/model-specific convenience must not override security, evidence, validation, or approval rules. Future AI systems can participate when they can consume the contract and their required capabilities are verified.

# Project

- Discover setup, build, test, lint, and typecheck commands from repository instructions, manifests, scripts, CI configuration, and project documentation.
- Follow documented project conventions. Do not invent commands or execute placeholder text.
- If sources conflict, report the conflict before running the affected command.
- If a required command cannot be found, mark that check Not Checked and continue independent work. Ask only if the missing information blocks completion.
- Use an available, authorized GitHub tool or CLI. Follow its documented usage.

# Workflow

- If a change touches several files or the approach is unclear, propose a plan and wait for my approval before editing, unless I've already approved a plan or told you to proceed. Skip the plan when the change fits in one sentence.
- After changing code, run the relevant tests plus lint and typecheck until they pass or the failure rule below applies.
- For UI changes, screenshot the result, compare it with the design or mock, and fix the differences.
- If a check or screenshot cannot run, report the blocker and continue independent work. Stop a method after two failed attempts. Stop fixing the same check after three failed fix attempts across all methods. Report the attempts, known cause, and next step; mark unresolved checks FAIL or Not Checked as appropriate.
- When you report a task as done, show evidence: the commands you ran and their results.
- Fix root causes. Never skip, delete, or weaken a test or check to make it pass.

# Learned patterns (instinct MCP)

- If instinct MCP tools are available, call `suggest` before starting a non-trivial task and apply the relevant patterns. If the call fails, report it briefly and continue.
- When a correction, fix, or preference recurs, use instinct's `observe` only if available, following its tool schema and documented prefix format. If the call fails, report it briefly and continue.
- Never record secrets, credentials, personal data, or confidential company or customer details with `observe`.
- If an instinct suggestion conflicts with these instruction files, follow the instruction files and tell me about the conflict.

# Instruction files

- This file (AGENTS.md) holds shared entry-point rules and supplements the canonical contract in `AI_INSTRUCTIONS.md`.
- When I correct a mistake that would apply to any agent, propose a one-line rule for this file. Don't edit any instruction file without my OK.
