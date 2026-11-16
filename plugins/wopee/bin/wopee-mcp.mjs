#!/usr/bin/env node
// Starts the Wopee.io MCP server (npm package wopee-mcp) over stdio.
//
// A plugin's MCP config cannot differ per platform, and on native Windows `npx` is a .cmd file
// that a client cannot start directly. Node is required anyway, so the plugin starts this file
// and it runs `npx` the right way for the platform. `@latest`, because a bare `wopee-mcp` keeps
// reusing whatever version npx cached first. The server reads WOPEE_API_KEY and
// WOPEE_PROJECT_UUID from the repository's .env (written by `npx -y @wopee-io/init --env-only`).
import { spawn } from "node:child_process";

const COMMAND = "npx -y wopee-mcp@latest";

// Windows: .cmd files need a shell (Node's fix for CVE-2024-27980). A single fixed command string
// keeps the shell from seeing any outside input.
const child =
  process.platform === "win32"
    ? spawn(COMMAND, { stdio: "inherit", shell: true })
    : spawn("npx", COMMAND.split(" ").slice(1), { stdio: "inherit" });

for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("error", (error) => {
  process.stderr.write(`wopee: could not start npx (${error.message}). Install Node.js 20.18.1 or newer.\n`);
  process.exit(1);
});
child.on("exit", (code, signal) => process.exit(signal ? 1 : (code ?? 0)));
