# Writer Lock and Handoff

Purpose: prevent concurrent workers from mutating the same scope without coordination.

## Rule
One mutation scope has one active writer at a time. A mutation scope may be a repository, branch, document, artifact, deployment target, or other persistent output.

## Lock record
Before a persistent mutation, record or establish:
- Task ID
- Mutation scope
- Accountable lead
- Active writer
- Base revision or SHA when available
- Lock status: OPEN / HELD / HANDOFF / RELEASED
- Evidence or location of the active work

If the environment has no shared lock mechanism, treat the current verified task state as a cooperative lock and re-check the target immediately before writing.

## Handoff
A handoff must identify:
- completed changes
- current revision/SHA
- remaining work
- unresolved risks
- next writer
- validation status

The next writer re-fetches the target before mutation. A stale handoff never authorizes overwriting newer work.

## Conflict
If another writer or unexpected revision is detected, stop the conflicting mutation, preserve both states, and reconcile before continuing.
