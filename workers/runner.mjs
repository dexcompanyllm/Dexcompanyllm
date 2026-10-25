import "dotenv/config";
import fs from "node:fs";
import YAML from "yaml";
import { envFlag } from "../packages/core/src/policy.mjs";
import { routeTask } from "../services/orchestrator/src/router.mjs";
import { assertSafeWorkerResult } from "./host-security.mjs";
import { executeSubscriptionTask } from "./subscription-task.mjs";

function loadTask(path) {
  return YAML.parse(fs.readFileSync(path, "utf8"));
}

function providerStatus() {
  return {
    openai: {
      available: true,
      subscriptionReady: envFlag("DEX_OPENAI_SUBSCRIPTION_READY", false),
    },
    anthropic: {
      available: true,
      subscriptionReady: envFlag("DEX_ANTHROPIC_SUBSCRIPTION_READY", false),
    },
  };
}

function printSafeResult(result) {
  console.log(JSON.stringify(assertSafeWorkerResult(result), null, 2));
}

async function main() {
  const command = process.argv[2] ?? "preview";
  const taskPath = process.argv[3];
  const task = taskPath ? loadTask(taskPath) : { routing: { requiredCapabilities: ["edit-repository"], preferredProvider: "auto" }, request: { clientPlatform: "desktop" } };
  const route = routeTask(task, providerStatus());
  if (command === "preview") {
    console.log(JSON.stringify(route, null, 2));
    return;
  }
  if (command !== "execute") throw new Error("Use preview or execute.");
  if (!taskPath) throw new Error("Task Packet path is required for execute.");
  if (!route.selectedProvider) {
    throw new Error("No subscription worker is marked ready. Run the provider status command, then set the matching DEX_*_SUBSCRIPTION_READY flag only after it passes.");
  }

  printSafeResult(await executeSubscriptionTask({ task }));
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
