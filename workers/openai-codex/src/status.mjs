import { redact } from "../../../packages/core/src/policy.mjs";
import { CodexSubscriptionAdapter } from "./adapter.mjs";
import { inspectCodexCompatibility } from "./compatibility.mjs";

export async function readCodexWorkerStatus({
  inspectCompatibilityImpl = inspectCodexCompatibility,
  adapter = new CodexSubscriptionAdapter(),
} = {}) {
  try {
    const compatibility = await inspectCompatibilityImpl();
    const account = await adapter.connect();
    const limits = await adapter.rateLimits().catch(() => null);
    const ready = compatibility?.baseline?.compatible === true
      && account?.modelCatalog?.retirementReady !== false;
    return { ...account, limits, compatibility, ready };
  } finally {
    adapter.close();
  }
}

if (process.argv[1]?.endsWith("status.mjs")) {
  readCodexWorkerStatus()
    .then(status => {
      console.log(JSON.stringify(status, null, 2));
      if (!status.ready) process.exitCode = 2;
    })
    .catch(error => {
      console.error(redact(error.message));
      process.exitCode = 1;
    });
}
