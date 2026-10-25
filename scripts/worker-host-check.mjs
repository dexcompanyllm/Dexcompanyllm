import {
  assertBrokerOnlyCredentialBoundary,
  assertCodexHomeBoundary,
  assertDedicatedWorkerAccount,
  loadApprovedProjectRegistry,
} from "../workers/host-security.mjs";

function main() {
  const account = assertDedicatedWorkerAccount();
  const codexHome = assertCodexHomeBoundary();
  const credentialBoundary = assertBrokerOnlyCredentialBoundary();
  const registry = loadApprovedProjectRegistry();
  const projects = Object.entries(registry.projects).map(([name, entry]) => ({
    name,
    realPath: entry.realPath,
  }));
  console.log(JSON.stringify({
    ready: true,
    account,
    codexHome,
    credentialBoundary: credentialBoundary.details,
    registry: {
      schemaVersion: registry.schemaVersion,
      registryPath: registry.registryPath,
      registrySha256: registry.registrySha256,
      projects,
    },
  }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(String(error?.message ?? error));
  process.exitCode = 1;
}
