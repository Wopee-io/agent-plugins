# Wopee.io agent plugins

Use [Wopee.io](https://wopee.io) from your coding agent. Its AI testing agents explore your web app, generate tests, run them in the cloud and report verdicts with evidence. The `wopee` plugin adds:

- the **Wopee.io MCP server** ([`wopee-mcp`](https://www.npmjs.com/package/wopee-mcp)), with no key in any config;
- the **`wopee-setup` skill**, which connects your repository to your Wopee.io project with one browser approval. Your API key never passes through the chat.

## Install

Requires Node.js 20.18.1 or newer.

### Claude Code

```text
/plugin marketplace add Wopee-io/agent-plugins
/plugin install wopee@wopee
```

In Claude Code 2.1.275 or later, `/plugin install wopee --marketplace Wopee-io/agent-plugins` does both in one step. Or from a shell: `claude plugin marketplace add Wopee-io/agent-plugins`, then `claude plugin install wopee@wopee`. Add `--scope project` to share it with your team through `.claude/settings.json`.

### Codex

```bash
codex plugin marketplace add Wopee-io/agent-plugins
codex plugin add wopee@wopee
```

Or install **Wopee.io** from `/plugins` inside `codex`. Start a new session afterwards.

### Other agents (skill only)

```bash
npx skills add Wopee-io/agent-plugins --skill wopee-setup
```

This installs the setup skill, not the MCP server. The skill's link to [wopee.io/agent-setup/prompt.md](https://wopee.io/agent-setup/prompt.md) covers adding the server for your client.

## Set it up

Ask your agent:

```text
Set up Wopee.io testing for this repo.
```

The skill:

1. checks whether the server is already connected;
2. runs `npx -y @wopee-io/init@latest --env-only` after your yes;
3. shows you a link and three words. You approve in Wopee.io Commander, and a new project API key goes straight to the command, encrypted to it;
4. the command writes the key to a git-ignored `.env`;
5. the skill checks the connection with a read-only call.

No restart is needed. Then try:

- "Run a Wopee analysis of my app."
- "Which Wopee.io tests failed in the last run, and why?"

## Privacy and security

- The key is written only to your repository's `.env`, which the command adds to `.gitignore`. It is never in a plugin file, an MCP config or the chat.
- The MCP server sends Wopee.io only the arguments of the tool calls your agent makes. It does not read your repository.
- Content returned by Wopee.io tools comes from the app under test, and the skill treats it as data, not instructions.

## Uninstall

Uninstall the plugin (`/plugin uninstall wopee@wopee` in Claude Code, `/plugins` in Codex), remove the `WOPEE_*` lines from `.env`, and delete the key under **More › Settings › API Keys › Existing keys** in [Commander](https://cmd.wopee.io).

## Links

- [Set up Wopee.io with your coding agent](https://docs.wopee.io/agent-setup/)
- [Wopee.io MCP server docs](https://docs.wopee.io/guides/wopee-mcp/)
- [`@wopee-io/init`](https://github.com/Wopee-io/wopee-init)
- Help: [help@wopee.io](mailto:help@wopee.io) · [Report a plugin issue](https://github.com/Wopee-io/agent-plugins/issues)

## License

MIT
