import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "apps/console/public/index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "apps/console/public/app.js"), "utf8");

test("PWA result inbox reads canonical status and result instead of GitHub open/closed state", () => {
  assert.match(html, /진행·결과함/);
  assert.match(html, /id="result-dialog"/);
  assert.match(app, /\/api\/tasks\?state=all/);
  assert.match(app, /\/api\/tasks\/\$\{encodeURIComponent\(task\.id\)\}\/status/);
  assert.match(app, /\/api\/tasks\/\$\{encodeURIComponent\(task\.id\)\}\/result/);
  assert.match(app, /status\?\.resultAvailable/);

  const renderTasks = app.match(/function renderTasks\(\) \{[\s\S]*?\r?\n\}\r?\n\r?\nasync function hydrateTaskStatuses/)?.[0];
  assert.ok(renderTasks, "renderTasks implementation must remain inspectable");
  assert.equal(renderTasks.includes("task.state"), false, "PWA must not present GitHub issue state as canonical task progress");
});
