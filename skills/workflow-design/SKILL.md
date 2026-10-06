# Skill — Workflow Design

## Core frame
`As-Is → Delegation Scope → Work Order → Node Decomposition → Error Points → Validation Gates → Human Review → Execution → Re-validation`

For every node specify:
- Input
- Action
- Output
- State
- Validation
- Error handling
- Connection/next node
- Human action, if any

Parallelize independent read/research work where useful. Do not allow concurrent writers on the same mutation scope.

Prefer explicit state transitions over vague instructions such as "handle appropriately."
