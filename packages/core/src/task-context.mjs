import { z } from "zod";
import { findSecretKinds } from "../../../scripts/check.mjs";

const references = z.array(z.string().min(1).max(2_000)).max(50).optional();
const boundedBytes = maximum => value => Buffer.byteLength(JSON.stringify(value), "utf8") <= maximum;

// Existing Task Packet fields are optional reference data, never new execution
// authority. No URL fetching, file reading, or interpretation happens here.
export const TaskContextFields = {
  inputs: z.object({
    files: references,
    urls: references,
    issues: references,
    pullRequests: references,
    sourceNotes: references,
  }).strict().refine(boundedBytes(12 * 1024), "Task inputs exceed the bounded size.").optional(),
  validation: z.object({
    required: z.array(z.string().min(1).max(500)).max(30).optional(),
    // Historical status spellings remain metadata, not a current PASS verdict.
    status: z.string().max(80).optional(),
  }).strict().refine(boundedBytes(4 * 1024), "Task validation exceeds the bounded size.").optional(),
};

const contextSchema = z.object(TaskContextFields);

export function normalizeTaskContext(task) {
  const parsed = contextSchema.safeParse(task ?? {});
  const secretDetected = parsed.success && findSecretKinds(JSON.stringify(parsed.data)).length > 0;
  if (!parsed.success || secretDetected) {
    const error = new Error(secretDetected
      ? "Task context was blocked by the secret-scan boundary."
      : "Task context validation failed.");
    error.code = secretDetected ? "TASK_CONTEXT_SECRET_DETECTED" : "TASK_CONTEXT_INVALID";
    error.status = 400;
    throw error;
  }
  // Omitting absent fields preserves legacy request fingerprints and retries.
  return Object.fromEntries(Object.entries(parsed.data).filter(([, value]) => value !== undefined));
}
