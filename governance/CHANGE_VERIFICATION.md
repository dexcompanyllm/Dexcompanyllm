# Persistent Change Verification

A successful write response is evidence of an attempted change, not by itself proof of the current canonical state.

## Completion gate
For persistent repository changes:
1. Write the requested change.
2. Re-fetch the target from the intended branch/source.
3. Verify the resulting content or state.
4. Verify revision/commit evidence when available.
5. For material changes, inspect diff or equivalent evidence when available.
6. Report branch/ref, revision/SHA, validation result, and any remaining uncertainty.

Status:
- CONFIRMED: target state was re-read and matched; revision evidence is recorded when available.
- PARTIAL: write succeeded but one verification layer is unavailable.
- UNKNOWN: current target state could not be independently re-read.
- FAILED: target state does not match the intended result.

Never report a persistent change as complete when its state is UNKNOWN.
