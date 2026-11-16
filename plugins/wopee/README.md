# Wopee.io plugin

The Wopee.io MCP server (`wopee-mcp`) and the `wopee-setup` skill for Claude Code and Codex.

- `mcp/claude.json` starts the server through `bin/wopee-mcp.mjs`, which runs `npx -y wopee-mcp@latest` the right way on every OS. `mcp/codex.json` runs `npx` directly.
- `skills/wopee-setup` connects the repository with `npx -y @wopee-io/init@latest --env-only`. The key goes to a git-ignored `.env`, never into the chat or a config.

In Claude Code 2.1.275 or later, install it in one step:

```text
/plugin install wopee --marketplace Wopee-io/agent-plugins
```

Other clients and usage: [README](../../README.md).
