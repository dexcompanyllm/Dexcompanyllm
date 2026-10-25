import { randomUUID } from "node:crypto";

const MAX_SUMMARY_CHARS = 20_000;
const MAX_CHECKS = 50;

function boundedString(value, name, max = MAX_SUMMARY_CHARS) {
  const normalized = String(value ?? "");
  if (normalized.length > max) throw new Error(`${name} exceeds the bounded size.`);
  return normalized;
}

function latestEvent(status, kind) {
  for (let index = status.events.length - 1; index >= 0; index -= 1) {
    if (status.events[index].kind === kind) return status.events[index];
  }
  return null;
}

function normalizeWriterResult(result) {
  if (!result || typeof result !== "object" || Array.isArray(result)) throw new Error("Writer returned an invalid result.");
  const normalized = {
    finalText: boundedString(result.finalText, "Writer finalText"),
    eventCount: Number.isSafeInteger(result.eventCount) && result.eventCount >= 0 ? result.eventCount : 0,
  };
  for (const name of ["threadId", "commit", "diffHash", "workspaceHead", "bridgeRunId", "bridgeResultHash"]) {
    if (result[name] !== undefined && result[name] !== null) normalized[name] = boundedString(result[name], `Writer ${name}`, 512);
  }
  if (Array.isArray(result.changedFiles)) {
    if (result.changedFiles.length > 200) throw new Error("Writer changedFiles exceeds the bounded count.");
    normalized.changedFiles = result.changedFiles.map((item) => boundedString(item, "Changed file", 500));
  }
  if (result.modelSelection && typeof result.modelSelection === "object" && !Array.isArray(result.modelSelection)) {
    normalized.modelSelection = result.modelSelection;
  }
  if (result.workspaceEvidence && typeof result.workspaceEvidence === "object" && !Array.isArray(result.workspaceEvidence)) {
    const verification = result.workspaceEvidence.verification;
    normalized.workspaceEvidence = {
      baseSha: boundedString(result.workspaceEvidence.baseSha, "Writer base SHA", 64),
      branch: boundedString(result.workspaceEvidence.branch, "Writer branch", 240),
      cleanBefore: result.workspaceEvidence.cleanBefore === true,
      cleanAfter: result.workspaceEvidence.cleanAfter === true,
      commitCount: Number.isSafeInteger(result.workspaceEvidence.commitCount) && result.workspaceEvidence.commitCount >= 0
        ? result.workspaceEvidence.commitCount
        : 0,
      ...(verification && typeof verification === "object" && !Array.isArray(verification) ? {
        verification: {
          kind: verification.kind === "file-sha256" ? "file-sha256" : "invalid",
          status: verification.status === "PASS" ? "PASS" : "FAIL",
          exitCode: Number.isSafeInteger(verification.exitCode) ? verification.exitCode : -1,
          durationMs: Number.isSafeInteger(verification.durationMs) && verification.durationMs >= 0
            ? verification.durationMs
            : 0,
          outputHash: boundedString(verification.outputHash, "Writer verification output hash", 64),
        },
      } : {}),
    };
  }
  if (result.approval && typeof result.approval === "object" && !Array.isArray(result.approval)) {
    normalized.approval = {
      requested: Number.isSafeInteger(result.approval.requested) ? result.approval.requested : 0,
      accepted: Number.isSafeInteger(result.approval.accepted) ? result.approval.accepted : 0,
      declined: Number.isSafeInteger(result.approval.declined) ? result.approval.declined : 0,
    };
  }
  return normalized;
}

function normalizeCheckResult(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${name} returned an invalid result.`);
  const verdict = String(value.verdict ?? "").toUpperCase();
  if (!new Set(["PASS", "FAIL"]).has(verdict)) throw new Error(`${name} verdict must be PASS or FAIL.`);
  const checks = Array.isArray(value.checks) ? value.checks : [];
  if (checks.length > MAX_CHECKS) throw new Error(`${name} returned too many checks.`);
  const normalized = {
    verdict,
    summary: boundedString(value.summary ?? "", `${name} summary`, 8_000),
    checks: checks.map((check) => ({
      name: boundedString(check?.name ?? "check", `${name} check name`, 160),
      status: ["PASS", "FAIL", "Not Checked"].includes(check?.status) ? check.status : "Not Checked",
      evidence: boundedString(check?.evidence ?? "", `${name} check evidence`, 2_000),
    })),
    ...(value.readOnly === true ? { readOnly: true } : {}),
  };
  for (const field of ["independenceClass", "runId", "provider", "bridgeResultHash"]) {
    if (value[field] !== undefined && value[field] !== null) {
      normalized[field] = boundedString(value[field], `${name} ${field}`, 512);
    }
  }
  normalized.coverage = {
    unit: "check",
    total: normalized.checks.length,
    passed: normalized.checks.filter(check => check.status === "PASS").length,
    failed: normalized.checks.filter(check => check.status === "FAIL").length,
    notChecked: normalized.checks.filter(check => check.status === "Not Checked").length,
  };
  // A summary cannot overrule an explicit failed check. Unknown/legacy checks
  // stay visible; they are not newly made mandatory for unrelated Tasks.
  if (normalized.coverage.failed > 0 && normalized.verdict === "PASS") {
    normalized.reportedVerdict = "PASS";
    normalized.verdict = "FAIL";
    normalized.summary = `Reported PASS conflicts with failed checks. ${normalized.summary}`.slice(0, 8_000);
  }
  return normalized;
}

function taskRequiresApproval(task) {
  return task?.execution?.riskLevel === "high" || task?.constraints?.approvalRequired === true;
}

function approvalAllowsTask(task, approval, attemptId, now) {
  if (!taskRequiresApproval(task)) return true;
  if (
    approval?.granted !== true
    || approval?.mode !== "one-time"
    || approval?.taskId !== task?.task?.id
    || approval?.attemptId !== attemptId
  ) return false;
  const expiresAt = new Date(approval.expiresAt);
  return !Number.isNaN(expiresAt.getTime()) && expiresAt.getTime() > Number(now());
}

async function transition(store, issueNumber, attemptId, to, details, kind = "transition") {
  return store.publishEvent(issueNumber, attemptId, { to, kind, details });
}

function resumeWriterResult(status) {
  return latestEvent(status, "writer-finish")?.details?.writerResult ?? null;
}

function blockedReason(status) {
  return latestEvent(status, "transition")?.details?.reason ?? null;
}

export async function executeBoundedTaskAttempt({
  store,
  issueNumber,
  attemptId = randomUUID(),
  hostReady = true,
  quotaReady = true,
  approval = { granted: false },
  writer,
  watchdog,
  verifier,
  onResult,
  now = () => Date.now(),
} = {}) {
  if (!store?.claimAttempt || !store?.publishEvent || !store?.publishResult) {
    throw new TypeError("A bounded task run store is required.");
  }
  if (typeof writer !== "function" || typeof watchdog !== "function" || typeof verifier !== "function") {
    throw new TypeError("Writer, Watchdog, and verifier adapters are required.");
  }

  const claim = await store.claimAttempt(issueNumber, attemptId);
  if (!claim.claimed) {
    return {
      outcome: claim.terminal ? "terminal" : "not-claimed",
      status: claim.status,
      attemptId,
    };
  }

  let released = false;
  const release = async () => {
    if (released) return;
    await store.releaseAttempt(issueNumber, attemptId);
    released = true;
  };

  try {
    let status = await store.getTaskStatus(issueNumber);
    const task = structuredClone(status.packet);

    if (status.state === "completed") {
      if (!status.resultRecord) throw new Error("Completed task is missing its canonical result.");
      if (status.githubState !== "closed") {
        await store.closeCompletedIssue(issueNumber, attemptId);
        status = await store.getTaskStatus(issueNumber);
      }
      const result = status.resultRecord?.result ?? null;
      await release();
      return { outcome: "completed", recovered: true, status, result, callbackDelivered: false, attemptId };
    }

    if (claim.reconciliationRequired) {
      await transition(store, issueNumber, attemptId, "blocked", {
        reason: "ambiguous-writer-state",
        priorAttemptId: status.latestAttemptId,
        automaticReplay: false,
      });
      status = await store.getTaskStatus(issueNumber);
      await release();
      return { outcome: "reconciliation-required", status, attemptId };
    }

    if (status.state === "verifying" && status.resultRecord) {
      await transition(store, issueNumber, attemptId, "completed", { reason: "durable-result-recovery" });
      await store.closeCompletedIssue(issueNumber, attemptId);
      status = await store.getTaskStatus(issueNumber);
      const result = status.resultRecord?.result ?? null;
      await release();
      let callbackDelivered = true;
      if (typeof onResult === "function") {
        try { await onResult({ status, result, recovered: true }); }
        catch { callbackDelivered = false; }
      }
      return { outcome: "completed", status, result, callbackDelivered, attemptId };
    }

    if (status.state === "queued") {
      await transition(store, issueNumber, attemptId, "resolving-context", { reason: "consumer-claim" });
      status = await store.getTaskStatus(issueNumber);
    }
    if (status.state === "resolving-context") {
      await transition(store, issueNumber, attemptId, "planning", { reason: "context-resolved" });
      status = await store.getTaskStatus(issueNumber);
    }

    const persistedWriterResult = resumeWriterResult(status);
    const resumeVerification = Boolean(persistedWriterResult)
      && ["executing", "verifying", "failed", "blocked"].includes(status.state)
      && blockedReason(status) !== "ambiguous-writer-state";

    if (status.state === "blocked" && !resumeVerification) {
      await release();
      return { outcome: "blocked", status, attemptId };
    }

    if (resumeVerification && ["failed", "blocked"].includes(status.state)) {
      await transition(store, issueNumber, attemptId, "planning", { reason: "resume-verification" });
      status = await store.getTaskStatus(issueNumber);
      await transition(store, issueNumber, attemptId, "executing", { reason: "resume-verification", writerReplay: false }, "resume-verification");
      status = await store.getTaskStatus(issueNumber);
    }

    if (!resumeVerification) {
      if (!approvalAllowsTask(task, approval, attemptId, now)) {
        if (status.state !== "awaiting-approval") {
          await transition(store, issueNumber, attemptId, "awaiting-approval", {
            reason: "explicit-approval-required",
            mutationStarted: false,
          });
          status = await store.getTaskStatus(issueNumber);
        }
        await release();
        return { outcome: "awaiting-approval", status, attemptId };
      }

      if (!hostReady) {
        if (status.state !== "waiting-for-host") {
          await transition(store, issueNumber, attemptId, "waiting-for-host", {
            reason: "approved-host-unavailable",
            mutationStarted: false,
          });
          status = await store.getTaskStatus(issueNumber);
        }
        await release();
        return { outcome: "waiting-for-host", status, attemptId };
      }

      if (!quotaReady) {
        if (status.state !== "blocked-quota") {
          await transition(store, issueNumber, attemptId, "blocked-quota", {
            reason: "subscription-quota-unavailable",
            mutationStarted: false,
          });
          status = await store.getTaskStatus(issueNumber);
        }
        await release();
        return { outcome: "blocked-quota", status, attemptId };
      }
    }

    let writerResult = persistedWriterResult;
    if (!writerResult) {
      if (status.state !== "executing") {
        await transition(store, issueNumber, attemptId, "executing", {
          reason: "writer-start",
          singleWriter: true,
        }, "writer-start");
        status = await store.getTaskStatus(issueNumber);
      } else {
        await store.publishEvent(issueNumber, attemptId, {
          to: "executing",
          kind: "writer-start",
          details: { reason: "writer-start", singleWriter: true },
        });
      }

      try {
        await store.renewAttempt(issueNumber, attemptId);
        writerResult = structuredClone(normalizeWriterResult(await writer({
          task: structuredClone(task),
          issueNumber,
          attemptId,
          readOnly: false,
        })));
        await store.publishEvent(issueNumber, attemptId, {
          to: "executing",
          kind: "writer-finish",
          details: { writerResult },
        });
      } catch (error) {
        const current = await store.getTaskStatus(issueNumber);
        if (current.state === "executing") {
          await transition(store, issueNumber, attemptId, "blocked", {
            reason: "writer-error-reconciliation-required",
            automaticReplay: false,
            errorClass: boundedString(error?.name ?? "Error", "Writer error class", 80),
          });
        }
        status = await store.getTaskStatus(issueNumber);
        await release();
        return { outcome: "reconciliation-required", status, attemptId };
      }
    }

    status = await store.getTaskStatus(issueNumber);
    if (status.state === "executing") {
      await transition(store, issueNumber, attemptId, "verifying", {
        reason: resumeVerification ? "resume-verification" : "writer-finished",
        writerReplay: false,
      });
      status = await store.getTaskStatus(issueNumber);
    }
    if (status.state !== "verifying") throw new Error(`Task cannot verify from state ${status.state}.`);

    await store.renewAttempt(issueNumber, attemptId);
    let watchdogResult;
    try {
      watchdogResult = normalizeCheckResult(await watchdog({
        task: structuredClone(task),
        issueNumber,
        attemptId,
        writerResult: structuredClone(writerResult),
        deterministic: true,
      }), "Watchdog");
    } catch (error) {
      await transition(store, issueNumber, attemptId, "failed", {
        reason: "watchdog-error",
        writerReplay: false,
        errorClass: boundedString(error?.name ?? "Error", "Watchdog error class", 80),
      });
      status = await store.getTaskStatus(issueNumber);
      await release();
      return { outcome: "verification-failed", status, attemptId };
    }
    await store.publishEvent(issueNumber, attemptId, {
      to: "verifying",
      kind: "watchdog",
      details: { watchdog: watchdogResult },
    });
    if (watchdogResult.verdict !== "PASS") {
      await transition(store, issueNumber, attemptId, "failed", { reason: "watchdog-failed", writerReplay: false });
      status = await store.getTaskStatus(issueNumber);
      await release();
      return { outcome: "verification-failed", status, watchdog: watchdogResult, attemptId };
    }

    let verifierResult;
    try {
      verifierResult = normalizeCheckResult(await verifier({
        task: structuredClone(task),
        issueNumber,
        attemptId,
        writerResult: structuredClone(writerResult),
        readOnly: true,
        detached: true,
      }), "Verifier");
    } catch (error) {
      await transition(store, issueNumber, attemptId, "failed", {
        reason: "verifier-error",
        writerReplay: false,
        errorClass: boundedString(error?.name ?? "Error", "Verifier error class", 80),
      });
      status = await store.getTaskStatus(issueNumber);
      await release();
      return { outcome: "verification-failed", status, watchdog: watchdogResult, attemptId };
    }
    if (verifierResult.readOnly !== true) throw new Error("Detached verifier must report readOnly=true.");
    await store.publishEvent(issueNumber, attemptId, {
      to: "verifying",
      kind: "verifier",
      details: { verifier: verifierResult },
    });
    if (verifierResult.verdict !== "PASS") {
      await transition(store, issueNumber, attemptId, "failed", { reason: "verifier-failed", writerReplay: false });
      status = await store.getTaskStatus(issueNumber);
      await release();
      return {
        outcome: "verification-failed",
        status,
        watchdog: watchdogResult,
        verifier: verifierResult,
        attemptId,
      };
    }

    const canonicalResult = {
      outcome: "PASS",
      writer: writerResult,
      watchdog: watchdogResult,
      verifier: verifierResult,
    };
    await store.publishResult(issueNumber, attemptId, canonicalResult);
    await transition(store, issueNumber, attemptId, "completed", { reason: "canonical-result-persisted" });
    await store.closeCompletedIssue(issueNumber, attemptId);
    status = await store.getTaskStatus(issueNumber);
    const result = status.resultRecord?.result ?? canonicalResult;
    await release();

    let callbackDelivered = true;
    if (typeof onResult === "function") {
      try { await onResult({ status, result, recovered: false }); }
      catch { callbackDelivered = false; }
    }

    return {
      outcome: "completed",
      status,
      result,
      callbackDelivered,
      attemptId,
    };
  } catch (error) {
    if (!released) {
      try { await release(); } catch {}
    }
    throw error;
  }
}
