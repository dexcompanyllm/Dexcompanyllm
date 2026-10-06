# Dex Company Bootstrap

## Meaning
**Bootstrap = canonical context load + current worker capability classification + readiness report.**

Bootstrap is not reset, delete, reinstall, repository recreation, or data initialization. Bootstrap itself authorizes no side effect. Later actions follow the canonical contract and applicable human-control rules.

## Definitions
- **Canonical basis**: the latest commit on the repository's default `main` branch. Record the commit SHA when the environment can retrieve it.
- **Approval status**: report `approved` only when approval can be evidenced by repository policy/review state. Otherwise report `unverified`; this alone is not a blocker for read-only Bootstrap.
- **Capability status**
  - `verified`: actually exercised in the current session using a non-mutating/read-only check.
  - `declared`: exposed or documented in the current environment but not exercised.
  - `unavailable`: absent, inaccessible, or failed when checked.
- **Requester**: the current session user.
- **Owner**: the authority defined by the canonical governance rules. Requester identity alone does not automatically prove Owner authority for high-impact actions.

## Procedure
1. Access the repository and identify the current `main` commit when possible.
2. Read `AI_INSTRUCTIONS.md` → `AGENTS.md` → `README.md`.
3. Classify relevant capabilities as verified / declared / unavailable. Do not perform mutating, sending, purchasing, deleting, deploying, or permission-changing actions merely to verify a capability.
4. Do not load `skills/`, `playbooks/`, or `templates/` during Bootstrap unless a concrete task already requires them.
5. Confirm that required canonical references named by the loaded documents are resolvable. Missing required references are reported explicitly; do not replace them with chat memory or assumptions.
6. Do not modify the repository. Produce the Ready report only.

## Start command
> GitHub `dexcompanyllm/Dexcompanyllm`의 `BOOTSTRAP.md`를 읽고 Dex Company를 Bootstrap해. 기존 저장소나 데이터를 Reset·삭제·재생성하지 말고, canonical 기준을 로드한 뒤 현재 네 capability와 제한을 확인해서 작업 준비 상태를 보고해.

Other canonical files should link to this section rather than duplicate the command.

## Ready report
Keep it concise and use the user's language.

```
Canonical basis: main @ <SHA or unavailable>, approval: approved/unverified
Verified: <capabilities>
Declared only: <capabilities>
Unavailable: <capabilities>
References: OK / MISSING <paths>
Readiness: READY / READY with limits / BLOCKED — <reason>
```

## Provider neutrality
No provider or model is required for Bootstrap. Any current or future AI/agent/runtime may participate if it can consume the required context and the capabilities needed for the requested work can be established.
