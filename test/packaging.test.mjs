import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
test("the public npm tarball exposes only four themes and legal/documentation files", async () => {
  const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url)));
  assert.equal(pkg.name, "@living-code/pi"); assert.ok(!pkg.private);
  assert.equal(pkg.publishConfig.access, "public"); assert.ok(pkg.keywords.includes("pi-package"));
  const [pack] = JSON.parse(execFileSync("npm", ["pack", "--dry-run", "--ignore-scripts", "--json"], { cwd: root, encoding: "utf8" }));
  assert.deepEqual(pack.files.map(f => f.path).sort(), ["LICENSE", "README.md", "package.json", ...["frost", "night", "paper", "signal"].map(f => `themes/living-code-${f}.json`)].sort());
  assert.deepEqual(pkg.pi, { themes: ["themes/*.json"], extensions: [], skills: [], prompts: [] });
});
test("CI uploads the npm tarball and tag releases do not publish or regenerate implicitly", async () => {
  const check = await readFile(new URL("../.github/workflows/check.yml", import.meta.url), "utf8");
  const release = await readFile(new URL("../.github/workflows/release.yml", import.meta.url), "utf8");
  assert.ok(check.includes("path: dist/*.tgz"));
  assert.ok(release.includes('tags: ["v*"]'));
  assert.ok(release.includes('test "$GITHUB_REF_NAME" = "v$version"'));
  assert.ok(release.includes("--verify-tag --generate-notes dist/*.tgz"));
  assert.doesNotMatch(release, /npm publish|pnpm screenshots|git tag|push origin/);
});
