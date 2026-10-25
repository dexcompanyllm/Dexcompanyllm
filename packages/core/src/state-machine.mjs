export const TASK_STATES = Object.freeze([
  "queued",
  "resolving-context",
  "planning",
  "awaiting-approval",
  "waiting-for-host",
  "blocked-quota",
  "executing",
  "verifying",
  "completed",
  "blocked",
  "failed",
  "cancelled",
]);

const TRANSITIONS = Object.freeze({
  queued: ["resolving-context", "cancelled"],
  "resolving-context": ["planning", "blocked", "failed", "cancelled"],
  planning: ["awaiting-approval", "waiting-for-host", "blocked-quota", "executing", "blocked", "cancelled"],
  "awaiting-approval": ["planning", "waiting-for-host", "blocked-quota", "executing", "cancelled", "blocked"],
  "waiting-for-host": ["planning", "blocked-quota", "executing", "cancelled", "blocked"],
  "blocked-quota": ["planning", "waiting-for-host", "executing", "cancelled"],
  executing: ["awaiting-approval", "blocked-quota", "verifying", "blocked", "failed", "cancelled"],
  verifying: ["completed", "executing", "blocked", "failed"],
  completed: [],
  blocked: ["planning", "executing", "cancelled"],
  failed: ["planning", "cancelled"],
  cancelled: [],
});

export function canTransition(from, to) {
  return Boolean(TRANSITIONS[from]?.includes(to));
}

export function assertTransition(from, to) {
  if (!TASK_STATES.includes(from) || !TASK_STATES.includes(to)) {
    throw new Error(`Unknown task state: ${from} -> ${to}`);
  }
  if (!canTransition(from, to)) {
    throw new Error(`Invalid task transition: ${from} -> ${to}`);
  }
}
