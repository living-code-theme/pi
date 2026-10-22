// Package only verified themes. Never capture, regenerate, publish or run npm lifecycle scripts.
import { execFileSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { check } from "./check.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
await check();
execFileSync("python3", ["scripts/capture.py", "--check"], { cwd: root, stdio: "inherit" });
execFileSync(process.execPath, ["--test", "test/format.test.mjs"], { cwd: root, stdio: "inherit" });
await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["pack", "--ignore-scripts", "--pack-destination", "dist"], { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
