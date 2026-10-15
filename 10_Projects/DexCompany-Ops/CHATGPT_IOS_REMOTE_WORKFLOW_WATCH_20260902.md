# ChatGPT iOS remote workflow watch — 2026-09-02

## Source and scope

Official source: OpenAI ChatGPT & Codex changelog, ChatGPT for iOS `1.2026.237`, dated 2026-09-01.

- https://learn.chatgpt.com/docs/changelog

This evidence is scoped to released mobile/connected-host workflow behavior relevant to Dex Company. It does not activate hosted writes, file ingestion, Remote Control, broader permissions, plugins, paid APIs, or any prerelease/experimental capability.

## Confirmed

OpenAI lists these relevant changes in ChatGPT for iOS `1.2026.237`:

- attachments work across connected hosts, including Windows and Linux;
- Priority view surfaces running tasks, unread updates, and tasks waiting for a response;
- queued prompts synchronize with the connected host, remain editable, and can send while the app is in the background;
- long-running tasks show live working time;
- task menus can copy the thread ID;
- reconnect reliability was improved for stuck Send states, missing approvals, and stale task updates.

The same official changelog currently lists Codex CLI `0.152.1` as the latest non-prerelease CLI entry. Provider-watch changes through upstream PR #42151 are already represented by the current approved Dex main and their existing tracking issues.

## Dex canonical comparison

Minimum canonical context checked:

- `AI_CONTRACT.md`: GitHub approved `main` remains Source of Truth; provider-watch standing optimization permits low-risk evidence/gate changes while prohibiting prerelease activation, paid fallback, broader permissions, destructive migrations, and alternate canonical Task authority.
- `CURRENT_STATE.md`: Runtime Issue #28 Phase 3 remains the active gate; approved Windows-host E2E remains Not Checked; #34/#35 remain blocked until #28 passes.
- Runtime Issue #34: Work/mobile submit-status-result flow exists as a future gate; Work file ingest and hosted write remain disabled.

No operational gate is advanced by this iOS release.

## Classification

### confirmed

- `1.2026.237` is documented as released iOS product behavior.
- It improves mobile-to-connected-host queueing, attachments, task visibility, thread correlation, and reconnect behavior.

### inference

- Host-synced editable queueing and reconnect fixes can reduce lost prompts, stale task displays, and manual requirement re-entry during long-running Dex work.
- Copyable thread IDs can improve troubleshooting correlation, but provider thread IDs must remain provenance only and cannot replace Dex Task ID/`attemptId` or authorization evidence.
- Cross-host attachment support improves portability, while also increasing the need to keep Dex Work file ingest behind MIME/size/malware/retention/account-workspace/redaction gates.

### proposal

When #34 becomes eligible after #28:

1. bind mobile queue/reconnect behavior to the same canonical Dex Task ID and `attemptId`;
2. prove queued/retried prompts create at most one submit mutation;
3. prove mobile approval and reconnect do not broaden scopes or revive stale approvals;
4. never accept a provider thread ID as authentication, authorization, idempotency, or Task authority;
5. leave connected-host attachment ingestion disabled until the existing security/retention gates pass;
6. use PWA fallback with zero mutation for unavailable/disconnected/unsupported hosts;
7. compare mobile/desktop/web status/result against the same canonical Task receipt.

### unknown

- actual `1.2026.237` behavior with the approved Dex Windows host;
- account/workspace policy parity across Chat and Work;
- reconnect/background queue semantics with the future Dex remote MCP/plugin flow;
- Dex-specific attachment-ingest security behavior.

## Applied Dex optimization

Runtime PR #96 added `docs/CHATGPT_IOS_REMOTE_WORKFLOW_WATCH_20260902.md` as documentation-only evidence and merged after validation.

- Runtime PR: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/96
- branch validation run: `33572349180`
- validation: install dependencies PASS; static checks/unit tests/smoke PASS; production dependency audit PASS
- branch Vercel: PASS
- merge SHA: `79d528502d27e7c3e15abd8ca761a66604ec0e84`
- merge Vercel: PASS

Runtime Issue #34 was updated with the iOS background-queue/reconnect/idempotency/thread-ID/file-ingest E2E gates. The issue remains open and blocked by #28.

## Verification

- Official OpenAI iOS release evidence: **PASS**
- Current canonical Dex comparison: **PASS**
- Runtime PR #96 single-file scope: **PASS**
- Runtime branch validation `33572349180`: **PASS**
- Runtime branch/merge Vercel: **PASS**
- Runtime Issue #34 future E2E tracking: **PASS**
- Runtime code/config/capability change: **PASS — none**
- Permission expansion or paid path: **PASS — none**
- Approved Windows-host + iOS E2E: **Not Checked**
- Work/mobile file-ingest E2E: **Not Checked**
- FAIL: **none**

## Safety decision

Keep #28 → #34/#35 gate order unchanged. Do not automatically enable hosted Task writes, Work file ingest, Remote Control, plugin installation/mutation, broader OAuth/filesystem/MCP permissions, paid API, automatic paid fallback, or automatic extra paid usage because of this release.
