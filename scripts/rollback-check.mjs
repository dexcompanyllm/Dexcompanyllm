import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function git(...args) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`git ${args.join(" ")} failed: ${String(result.stderr || result.stdout).trim()}`);
  }
  return result.stdout.trim();
}

const requestedTag = process.env.DEX_ROLLBACK_TAG?.trim();
const tag = requestedTag || git("tag", "--list", "pre-oauth-integration-*", "--sort=-creatordate")
  .split(/\r?\n/)
  .find(Boolean);

if (!tag || !/^pre-oauth-integration-\d{8}-\d{4}$/.test(tag)) {
  throw new Error("A valid pre-oauth-integration-YYYYMMDD-HHMM recovery tag is required.");
}
if (git("cat-file", "-t", `refs/tags/${tag}`) !== "tag") {
  throw new Error(`${tag} must be an annotated recovery tag.`);
}

const commit = git("rev-parse", `${tag}^{commit}`);
git("merge-base", "--is-ancestor", commit, "HEAD");
const packageJson = JSON.parse(git("show", `${tag}:package.json`));
const vercelJson = JSON.parse(git("show", `${tag}:vercel.json`));

if (packageJson.name !== "dex-company-runtime" || !vercelJson.functions?.["api/index.mjs"]) {
  throw new Error("The recovery tag does not contain a bootable Dex Company Vercel adapter baseline.");
}

console.log(`PASS: annotated recovery tag ${tag} resolves to an ancestor with the Runtime package and explicit Vercel adapter.`);
