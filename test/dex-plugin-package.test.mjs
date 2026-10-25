import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const marketplacePath = path.join(root, ".agents", "plugins", "marketplace.json");
const pluginRoot = path.join(root, "plugins", "dex-company-core");
const manifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");

function parseFrontmatter(content, label) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  assert.ok(match, `${label} must start with YAML frontmatter`);
  return parseYaml(match[1]);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) return [];
    if (entry.isDirectory()) return walk(target);
    return entry.isFile() ? [target] : [];
  });
}

test("repo marketplace points to the canonical Dex plugin with explicit policy", () => {
  const marketplace = JSON.parse(fs.readFileSync(marketplacePath, "utf8"));
  assert.equal(marketplace.name, "dex-company");
  assert.equal(marketplace.interface.displayName, "Dex Company");
  assert.equal(marketplace.plugins.length, 1);
  assert.deepEqual(marketplace.plugins[0], {
    name: "dex-company-core",
    source: { source: "local", path: "./plugins/dex-company-core" },
    policy: { installation: "AVAILABLE", authentication: "ON_INSTALL" },
    category: "Productivity",
  });
  const resolved = path.resolve(root, marketplace.plugins[0].source.path.slice(2));
  assert.equal(resolved, pluginRoot);
  assert.ok(fs.statSync(resolved).isDirectory());
});

test("plugin manifest follows the strict Codex manifest contract", () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const allowed = new Set([
    "id", "name", "version", "description", "skills", "apps", "mcpServers",
    "interface", "author", "homepage", "repository", "license", "keywords",
  ]);
  assert.deepEqual(Object.keys(manifest).filter(key => !allowed.has(key)), []);
  assert.equal(manifest.name, "dex-company-core");
  assert.equal(manifest.version, "1.4.0");
  assert.match(manifest.description, /design quality/i);
  assert.ok(manifest.description.trim());
  assert.ok(manifest.author.name.trim());
  assert.equal(manifest.skills, "./skills/");
  assert.equal(manifest.apps, undefined);
  assert.equal(manifest.mcpServers, undefined);
  for (const field of ["displayName", "shortDescription", "longDescription", "developerName", "category"]) {
    assert.ok(manifest.interface[field]?.trim(), `interface.${field} is required`);
  }
  assert.ok(Array.isArray(manifest.interface.capabilities));
  assert.ok(manifest.interface.capabilities.every(item => typeof item === "string" && item.trim()));
  assert.ok(Array.isArray(manifest.interface.defaultPrompt));
  assert.ok(manifest.interface.defaultPrompt.length > 0 && manifest.interface.defaultPrompt.length <= 3);
  assert.ok(manifest.interface.defaultPrompt.every(item => item.length <= 128));
});

test("plugin exposes exactly the three reviewed Dex skills with minimal frontmatter", () => {
  const skillDirectories = fs.readdirSync(path.join(pluginRoot, "skills"), { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
  assert.deepEqual(skillDirectories, ["create-screen-spec", "design-quality", "use-dex-company"]);

  const names = [];
  for (const directory of skillDirectories) {
    const skillPath = path.join(pluginRoot, "skills", directory, "SKILL.md");
    const content = fs.readFileSync(skillPath, "utf8");
    const frontmatter = parseFrontmatter(content, directory);
    assert.deepEqual(Object.keys(frontmatter).sort(), ["description", "name"]);
    assert.equal(frontmatter.name, directory);
    assert.ok(frontmatter.description.length >= 40);
    names.push(frontmatter.name);

    const metadataPath = path.join(pluginRoot, "skills", directory, "agents", "openai.yaml");
    const metadata = parseYaml(fs.readFileSync(metadataPath, "utf8"));
    assert.ok(metadata.interface.display_name.trim());
    assert.ok(metadata.interface.short_description.trim());
  }
  assert.equal(new Set(names).size, names.length);
});

test("screen specification skill includes required generic quality gates", () => {
  const skill = fs.readFileSync(
    path.join(pluginRoot, "skills", "create-screen-spec", "SKILL.md"),
    "utf8",
  );
  const guide = fs.readFileSync(
    path.join(pluginRoot, "skills", "create-screen-spec", "references", "SCREEN_SPEC_GUIDE.md"),
    "utf8",
  );
  const template = fs.readFileSync(
    path.join(pluginRoot, "skills", "create-screen-spec", "assets", "SCREEN_SPEC_TEMPLATE.md"),
    "utf8",
  );
  const combined = `${skill}\n${guide}`.toLowerCase();
  for (const phrase of [
    "element → condition → action → result",
    "duplicate submission",
    "responsive and accessibility",
    "traceability",
    "acceptance evidence",
    "project screen-spec profile",
    "established artifact",
    "behavior-rule evidence",
    "exact-literal evidence",
    "ready_for_audit",
  ]) {
    assert.ok(combined.includes(phrase.toLowerCase()), `missing screen-spec gate: ${phrase}`);
  }
  assert.match(template, /^> Markdown fallback only:/);
  for (const heading of [
    "## 1. Objective and scope",
    "## 3. User journey",
    "## 4. Screen inventory",
    "## 5. Screen details",
    "#### State and exception matrix",
    "#### Responsive and accessibility",
    "## 6. Traceability",
    "## 8. Verification",
  ]) {
    assert.ok(template.includes(heading), `template missing: ${heading}`);
  }
});

test("project profile precedence records artifact-preservation instructions", () => {
  const skill = fs.readFileSync(
    path.join(pluginRoot, "skills", "create-screen-spec", "SKILL.md"),
    "utf8",
  );
  const guide = fs.readFileSync(
    path.join(pluginRoot, "skills", "create-screen-spec", "references", "SCREEN_SPEC_GUIDE.md"),
    "utf8",
  );
  const template = fs.readFileSync(
    path.join(pluginRoot, "skills", "create-screen-spec", "assets", "SCREEN_SPEC_TEMPLATE.md"),
    "utf8",
  );
  assert.match(skill, /generic Markdown template is a fallback/i);
  assert.match(skill, /When the requested format is Markdown/i);
  assert.match(skill, /generic template IDs are provisional/i);
  assert.match(skill, /do not mechanically add headings, tables, boxes, badges/i);
  assert.match(guide, /Coverage and placement are separate decisions/i);
  assert.match(guide, /conditionally visible or enabled fields/i);
  assert.match(guide, /Define both confirm and cancel results/i);
  assert.match(guide, /Keep presentation type and button-role notation outside the quoted literal/i);
  assert.match(guide, /Trace screen\/element ↔ validation or message ID ↔ behavior-rule evidence ↔ exact-literal evidence in both directions/i);
  assert.match(template, /#### Validation and message evidence/i);
  assert.match(template, /Rule source\/status \| Exact literal \| Literal source\/status/i);
  assert.match(guide, /reopen the final file/i);
  assert.match(guide, /Independent `PASS` requires an actual authorized audit/i);
});

test("Dex context skill requires actionable recovery without widening authority", () => {
  const skill = fs.readFileSync(
    path.join(pluginRoot, "skills", "use-dex-company", "SKILL.md"),
    "utf8",
  );
  for (const phrase of [
    "actual check and failure point",
    "complete copy-ready command",
    "Do not invent a menu, button, path, or command",
    "at most twice",
    "in the same Task",
    "does not expand authority",
  ]) {
    assert.ok(skill.includes(phrase), `missing actionable recovery gate: ${phrase}`);
  }
  assert.match(skill, /name the exact permission, why it is needed/i);
  assert.match(skill, /objective, scope, completion criteria, evidence, rollback, and next command/i);
});

test("Dex context skill routes data work through canonical normalization rules", () => {
  const skill = fs.readFileSync(
    path.join(pluginRoot, "skills", "use-dex-company", "SKILL.md"),
    "utf8",
  );
  assert.match(skill, /Only for work that changes data standards, schemas, catalogs, data identifiers\nsuch as project, Task, source, or record IDs, or normalization/i);
  assert.match(skill, /20_Codex_Handoff\/DATA_STANDARD\.md/);
  assert.match(skill, /20_Codex_Handoff\/DATA_CATALOG\.json/);
  assert.match(skill, /Treat a catalog as a reference map, not proof/i);
  assert.match(skill, /Unknown values stay unknown/i);
  assert.match(skill, /Different dates, commits, hosts, or verification scopes remain separate observations/i);
  assert.match(skill, /verify the reader, field mapping, round trip, rollback, and regression evidence/i);
  assert.match(skill, /Do not bulk-delete, rename, move, or normalize source records from similarity alone/i);
});

test("Dex context skill preserves automatic handoff and current snapshot intake", () => {
  const skill = fs.readFileSync(
    path.join(pluginRoot, "skills", "use-dex-company", "SKILL.md"),
    "utf8",
  );
  for (const phrase of [
    "list_handoffs",
    "get_task_handoff",
    "nextPage",
    "snapshotChanged",
    "Dex Company shared handoff v1",
    "warnings or truncation",
    "Do not ask for copied handoff text",
    "Read-only retrieval never writes",
  ]) assert.ok(skill.includes(phrase), `missing automatic handoff rule: ${phrase}`);
});

test("design quality routing cannot override canonical Task validation", () => {
  const contextSkill = fs.readFileSync(
    path.join(pluginRoot, "skills", "use-dex-company", "SKILL.md"),
    "utf8",
  );
  const designSkill = fs.readFileSync(
    path.join(pluginRoot, "skills", "design-quality", "SKILL.md"),
    "utf8",
  );
  const evidenceGate = fs.readFileSync(
    path.join(pluginRoot, "skills", "design-quality", "references", "EVIDENCE_GATE.md"),
    "utf8",
  );
  const validator = fs.readFileSync(
    path.join(pluginRoot, "skills", "design-quality", "scripts", "validate-design-evidence.mjs"),
    "utf8",
  );
  const combined = `${contextSkill}\n${designSkill}\n${evidenceGate}\n${validator}`;
  assert.match(contextSkill, /load `design-quality` after the minimum Dex context/i);
  assert.match(contextSkill, /Keep `create-screen-spec` in control/i);
  assert.match(contextSkill, /does not replace the canonical Task outcome/i);
  assert.match(contextSkill, /detailed `FAIL`/i);
  assert.match(contextSkill, /convert `Not Checked` to PASS/i);
  assert.match(combined, /EVIDENCE_PACKAGE_COMPLETE/);
  assert.match(combined, /does not replace the canonical Task outcome|never an override for canonical Task validation/i);
  assert.match(combined, /detailed `FAIL`|detailed FAIL/i);
  assert.match(combined, /Not Checked/);
});

test("canonical plugin contains no client policy, machine path, paid API credential, or private MCP duplicate", () => {
  const files = walk(pluginRoot);
  const combined = files.map(file => fs.readFileSync(file, "utf8")).join("\n");
  assert.doesNotMatch(combined, /\b[A-Za-z]:\\/);
  assert.doesNotMatch(combined, /obsidian/i);
  assert.doesNotMatch(combined, /OPENAI_API_KEY|ANTHROPIC_API_KEY/);
  assert.doesNotMatch(combined, /sk-(?:proj-|ant-)?[A-Za-z0-9_-]{16,}/);
  assert.doesNotMatch(combined, /SaveTheChildren|세이브더칠드런|#A020F0|PHI-[PMA]-\d{3}|1VDMkMA|1anXVbh|1db8FMs/);
  assert.equal(fs.existsSync(path.join(pluginRoot, ".mcp.json")), false);
  assert.equal(fs.existsSync(path.join(pluginRoot, ".app.json")), false);
});

