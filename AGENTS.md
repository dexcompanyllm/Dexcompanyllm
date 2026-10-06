# Agent Entry Point

Read `AI_INSTRUCTIONS.md` first. It is the canonical contract.

Then load only the skill, playbook, template, and task context needed for the current request.

## Routing
1. Identify the requested outcome and acceptance criteria.
2. Identify available capabilities before choosing a worker/provider.
3. Keep one accountable lead and one active writer per mutation scope.
4. Use independent verification when risk warrants it.
5. Persist one canonical result.

Provider-specific convenience must not override security, evidence, validation, or approval rules.
