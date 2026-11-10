# AI CLI Tools Community Digest 2026-11-10

> Generated: 2026-11-10 07:06 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

## mcp-builder — adds support for mcp>=2 streamable HTTP client
Fixes the renamed `streamablehttp_client` import (now `streamable_http_client` in mcp>=2.0.0) and moves custom HTTP header configuration to `create_mcp_http_client`, per PR #1742. Open.

## skill-creator — isolates trigger evals and handles runtime failures
Stops per-worker command probes from competing and from failing on Windows `select()` over subprocess pipes, so runtime failures no longer count as non-triggers. Open, PR #1298.

## webapp-testing — removes shell=True from with_server.py
Replaces `subprocess.Popen(..., shell=True)` with a non-shell spawn, closing the command injection risk (CWE-78) from unsanitized server command strings. Open, PR #1980.

**Open requests**
Issue #556 reports that `run_eval.py` never triggers skills: running `claude -p` against a generated command file produced a 0% trigger rate across all test queries.

---

**What changed**

Claude Fable 5.2 (`claude-fable-5-2`) is now the default Fable model. It ships with a 1M token context window at $8/$40 per Mtok and $0.20/Mtok cache reads. Pick it when long-context work previously needed manual model selection (v2.1.321).

Fast mode now works on Vertex in the global, us and eu regions. Claude Code falls back to standard speed when Vertex refuses it, so you can enable it without breaking sessions on those endpoints (v2.1.322).

`claude remote-control` accepts `--settings <file>`, applying that settings file to every session it starts. A changed file no longer applies to new sessions (v2.1.321).

**Worth knowing**

The Desktop Code tab runs Fable 5.2 with a 200K context window because bundled Claude Code 2.1.317 has no catalog entry for `claude-fable-5-2`. Check your bundled version if you expect the full 1M context (Issue #108640).

Desktop overnight auto-update restarts turn Remote Control off for every session and never reconnect them, even with "Connect new sessions to Remote Control" enabled (Issue #107825).

Users on Ultra and Team report weekly usage hitting 29–100% after roughly two days, at lower token volume than October (Issues #108734, #107390).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## What changed

**Untrusted context now reaches the model as tool output.** PR #60487 marks `untrusted_as_tool_output` stable and enables it by default, so untrusted extra context (for example browser information) arrives as `function_call_output` items in the `agent` namespace. It matters when your setup relies on that context reaching the model on every turn.

**Forking and recovering sessions no longer errors on incomplete tool calls.** PR #60519 treats a restored tool call whose output was not yet recorded as interrupted work. It matters when you fork, or reopen a session that stopped mid-call.

**Daybreak switches off when the selected model cannot use it.** PR #60526 turns Daybreak off automatically after a model switch or catalog refresh. Without it, a stale Daybreak state could block subsequent turns.

All three PRs are closed and merged into the codebase; no release notes describe them as shipped features.

## Worth knowing

**Windows VS Code extension UI fails to start.** Multiple reports (Issue #56655, 55 comments; #56691, closed) describe `26.1021.22027` failing with `renderer_ready_timeout`; users report the prior version works. The main thread remains open.

**Turn-diff capture can fill disk with `tmp_pack` files.** Issue #54955 reports 263.7 GB and Issue #50920 over 774 GiB of `tmp_pack_*` files after canceled captures. Both are open, with no fix stated in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases shipped in the last 24 hours.

Two fixes are in review but not released. PR #30095 proposes to reject dangerous Git arguments on Windows, closing the `git diff` permission bypass described in issue #29189, where `git diff --output=<path>` was whitelisted as read-only and silently overwrote arbitrary files. PR #30102 proposes logging every IDE connection as `ide_connection` instead of `start_session`, which currently inflates session counts for IDE companion users.

PR #30212 proposes a `tools.callTimeout` setting (seconds, default 0 = disabled). When a call exceeds it, the tool's AbortSignal fires and the call ends as a recoverable `TOOL_CALL_TIMEOUT` error.

**Worth knowing**

The `codebase_investigator` subagent can report `status: "success"` and `Termination Reason: "GOAL"` after hitting its maximum turn limit (issue #22323, 13 comments). No fix in the data.

The generalist agent hangs indefinitely on simple tasks like folder creation (issue #21409, 8 comments, 8 👍). The reporter says instructing the model not to use subagents avoids it. No fix in the data.

`browser_agent` ignores `settings.json` overrides such as `maxTurns` (issue #22267). The `AgentRegistry` reads the settings, but the agent does not apply them.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.109-1 adds IPv4/IPv6 CIDR support for sandbox host allow and deny rules in settings, so you can describe network ranges instead of single addresses.
- v1.0.109-1 adds Claude Fable 5.2 to the model picker under "New models".
- v1.0.109-0 asks for confirmation before `/share` or `/export` follows symlinks when saving local files.

**Worth knowing**

- `disable-model-invocation: true` in a project skill's `SKILL.md` makes the skill unreachable: `copilot skill list` shows it, but the `skill()` tool returns "Skill not found", so explicit requests fail. Open issue #4438, 17 comments.
- On Windows, starting `copilot` from an interactive PowerShell 7 session inside a git repo terminates the parent `pwsh.exe` via an unhandled exception tied to tgrep indexing in 1.0.108. Open issue #5404; no fix listed.
- 1.0.108 broke SDK-hosted sessions after a deferred MCP tool call, failing the next request with "Missing namespace for function_call". Issue #5400 is closed.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases in the last 24h, so nothing below is shipped yet.

- **Proposed: duplicate tool-input starts no longer kill a step.** PR #63048 closes #63035, where a provider re-sending `tool-input-start` for an open tool-call id died with `Duplicate tool input start`. Matters if your provider streams tool calls twice.
- **Proposed: shell commands outlive their timeout.** PR #63024 would keep a command running after its foreground timeout and deliver the result through the existing background notification path, instead of killing long builds and tests.
- **Proposed: gatewayApiKey fix for Cloudflare AI Gateway.** PR #62574 closes #48293, where a gateway configured with only `gatewayApiKey` sent unauthenticated requests.

**Worth knowing**

- The free-tier thread #59387 is the main report hub (340 comments). Issue #60311 reports Go's 5-hour, weekly and monthly limits are one shared pool, not per-model as documented.
- On Windows, `opencode serve --service` spawns a visible console about twice a second and steals keyboard focus (#62988); startup also opens PowerShell for package-manager version checks (#62837).
- Issue #62872 reports a transient partial write to `opencode.jsonc` rejects the whole config with no last-good fallback, killing running sessions.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

Pi v1.5.1 adds shell-side credential commands: `pi auth login <provider>` and `pi auth logout <provider>` now work without starting a session, with API-key and no-browser sign-in options ([release notes](https://github.com/earendil-works/pi/blob/v1.5.1/packages/coding-agent/docs/cli.md#credent)). This matters for scripted or headless setups where you previously had to launch Pi to authenticate.

Find-tool path patterns on Windows now work across fd versions; fd before 10.5.1 never matched `--full-path` globs containing `/` (#11972, closed). Separately, the Windows installer no longer aborts when npm writes a warning to stderr under PowerShell 5.1 (#11944, #11962).

**Worth knowing**

The footer crashes on resumed sessions whose assistant entries have a `usage` object without `cost`: `usage.cost.total` is read unconditionally, throwing `TypeError` (#11982, open on 1.5.1). Anthropic OAuth requests pinned `claude-cli/2.1.280` and were rejected with `claude_code_version_too_old`; a fix bumps the user-agent to 2.1.321 (#11969, PR #11970 closed).

`/login` with an API key draws the key on screen as typed or pasted, and leaves the submitted line visible behind the next prompt (#11977).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- **v0.27.1 released.** No known breaking changes. The only listed CLI feature is `feat(core): name the active shell in the startup context` ([#16491](https://github.com/QwenLM/qwen-code/pull/16491)), so the agent's startup context now identifies which shell it is running under. Matters when you rely on startup context to reason about shell-specific behaviour.
- **TypeScript SDK v0.1.31 bundles CLI 0.27.1.** SDK consumers pick up the 0.27.1 CLI by upgrading the SDK rather than the CLI directly.
- **Desktop v0.27.1 shipped.** Its notes list a docs change for Wally under OpenAI-compatible providers ([#16529](https://github.com/QwenLM/qwen-code/pull/16529)) and a `fix(core)` entry that is truncated in the data, so the specific fix is unconfirmed.

**Worth knowing**

- Desktop 0.27 reportedly fails on Intel x64 Macs with a bundled-runtime crash before the listening URL is reported ([#16683](https://github.com/QwenLM/qwen-code/issues/16683), 3 comments, open). No fix appears in this data.
- `/cd` failing with "response or tool call in progress" after v0.24.0 ([#12224](https://github.com/QwenLM/qwen-code/issues/12224), 6 comments) is now closed; `/branch` hits the same message in 0.27.0 ([#16700](https://github.com/QwenLM/qwen-code/issues/16700), 3 comments, closed as needing information).
- A refused group signal in teardown was latched permanently as a shutdown failure; a proposed fix is open in [#16703](https://github.com/QwenLM/qwen-code/pull/16703), not yet released.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*