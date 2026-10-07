# Approval Registry

Purpose: distinguish task requests from approvals for high-impact actions.

## Approval classes
- TASK: permission to perform the requested low-risk work within stated scope.
- ONE-TIME: explicit approval for one defined high-impact action.
- STANDING: reusable approval with a precise scope, conditions, and expiry/revocation rule.

## Required record for standing approval
- Approval ID
- Owner/authority
- Allowed action
- Scope
- Constraints
- Valid from
- Expiry or review condition
- Revocation condition
- Evidence/reference
- Status: ACTIVE / EXPIRED / REVOKED / UNVERIFIED

Absence of a valid registry entry means no standing approval is assumed. A request to Bootstrap is never an approval for side effects.

Approval does not bypass security, validation, evidence, or platform policy.
