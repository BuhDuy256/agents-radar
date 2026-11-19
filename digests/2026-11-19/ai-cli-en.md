# AI CLI Tools Community Digest 2026-11-19

> Generated: 2026-11-19 07:12 UTC | Tools covered: 7

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

**Pyxel retro game skill** (open)
A proposed skill for building, debugging, and verifying retro games in Python with Pyxel, covering headless input-driven runs and direct frame inspection. Reach for it when a task needs Pyxel-specific state checks rather than general Python guidance; it is open as PR #525.

**md2video-audio skill** (open)
Compiles Markdown documents into MP4 videos with voiceovers, converting Markdown to slides via Marp before rendering. Listed as a zero-cost workflow, it fits requests that turn written docs into narrated video; it is open as PR #1703.

**Docx comment detection** (open)
Adds detection of orphaned comments in `.docx` files, addressing comments left without an anchor after edits. Useful when validating generated or edited Word documents; it is open as PR #1734.

**Open requests**

Users cannot share skills across an organization directly, and must download a `.skill` file and have colleagues upload it manually through Settings > Capabilities (issue #228).

---

**What changed**

v2.1.328 adds auto mode for Claude Opus 4.6 and Sonnet 4.6 on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and the Claude apps gateway ([release](https://github.com/anthropics/claude-code/releases)). Interactive sessions with no permission mode set now start in auto mode, so permission prompts are classified rather than shown. This changes default behavior for anyone on those platforms.

The same release adds `"onFailure": "block"` for `mcp_tool` hooks, matching the existing option for command and HTTP hooks. Your hook can now halt the session when an MCP tool call fails instead of continuing.

**Worth knowing**

Auto mode is blocking user-authorized work. Issue [#108905](https://github.com/anthropics/claude-code/issues/108905) reports denials for actions explicitly authorized in chat, with no one-time approval option; [#97613](https://github.com/anthropics/claude-code/issues/97613) calls it a regression since ~Sep 23. No fix appears in the data.

Cowork scheduled tasks ignore "Always allow" folder and tool permissions, so prompts return every run ([#47180](https://github.com/anthropics/claude-code/issues/47180), 41 comments, macOS). No fix in the data.

Plugin `hooks.json` never fires even when the plugin is installed and enabled ([#75972](https://github.com/anthropics/claude-code/issues/75972), has repro). No fix in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- `rust-v0.172.0-alpha.1` was released. It is an alpha, so treat it as a preview rather than a stable update.
- PR #62419 proposes an optional `model` field on the experimental `thread/sample` request. Clients could then sample a thread with a different model than the source thread's; omitting it or passing `null` keeps the current behavior.
- PR #57337 backports GPT-6.1 Terra into the model catalogs for the `0.165.0-alpha.1.2` build. Until it ships, that model may be absent from your catalog.

**Worth knowing**

- Issue #50182: `codex cloud` fails to discover current Cloud environments on `codex-cli 0.160.0` with ChatGPT authentication. 35 comments; no fix in the data.
- Issue #62212: on Codex desktop 26.1111.21308 (macOS), unsupported audio tool output causes later text-only turns to return HTTP 400. 17 comments; no fix in the data.
- Issue #62446: on `codex-cli 0.170.0` Linux, the app-server daemon's pid-update loop still leaks unreaped zombie children after auto-updates. 3 comments; no fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- v0.69.0 ships a fix that preserves literal `$` characters during template placeholder replacement (PR #30136). This matters if your prompts, skills or agent definitions contain shell variables — they now survive template expansion intact.
- v0.69.0 adds `/stats heatmap`, a subcommand showing daily token usage. You can now see which days consume the most tokens without leaving the CLI.
- v0.70.0-preview.0 is out, built on nightly `0.70.0-nightly.20261110.g1603e9b`. A v0.71.0 nightly bump (PR #30366) is already proposed, so expect the usual preview cadence.

**Worth knowing**

- Issue #21409 (priority/p1, 8 comments, 8 👍): the generalist agent hangs indefinitely when the CLI defers to it — even folder creation stalls. Workaround reported in the issue: instruct the model not to use subagents. Still open.
- Issue #22323 (priority/p1, 13 comments): a subagent that hits MAX_TURNS reports `status: "success"` with `Termination Reason: "GOAL"`, hiding the interruption. If you script against subagent results, treat success as unverified. Still open.
- Issue #22267 (priority/p2): the Browser Agent ignores `settings.json` overrides such as `maxTurns`. Affects anyone tuning browser-agent limits; no fix merged in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## What changed

No releases shipped in the last 24 hours, and no pull requests were updated.

## Worth knowing

**Windows credential leak.** Issue #5473: `copilot-keychain-chunk.*` entries accumulate in Windows Credential Manager without cleanup. Once the vault fills, every app on the machine fails to store credentials. No fix in the data.

**MCP OAuth failures across platforms.** Issue #5350: on WSL2, the browser round-trip completes but the code-to-token exchange never runs, leaving the server stuck "Connecting". Issue #5452: since 1.0.109, Entra `/mcp auth` opens a native broker window that blocks paste. Both open.

**org-managed GPT models ignore tool search.** Issue #5481: they load all MCP tool definitions upfront even with toolSearch enabled, unlike the same model via GitHub's hosted offering. Open.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases in the last 24h, so nothing is shipped by this data alone.

- **Plugin auto-update:** PR #64764 (closed) makes plugins written as `name@latest` update on their own; other plugins keep the current check-and-flag behavior.
- **TUI migration retry:** PR #64809 (closed) retries the migration status poll after the first request returns 503 while services boot (fixes #64621).
- **ACP blobs without mimeType:** PR #64800 (closed) keeps embedded resource blocks that omit `mimeType` (fixes #64687).

**Worth knowing**

- **Windows ACP sessions hang:** Issue #64686 (open, 4 comments) reports `session/new` and `session/list` hanging forever on Windows because Bun's fetch is starved by the global SSE stream. No fix in the data.
- **Windows desktop tool calls never run:** Issue #64676 (open) reports desktop 2.3.2 failing to execute tool calls alongside a renderer `RangeError`. The author says downgrading to 2.2.7 works.
- **Rogue agent behavior:** Issue #64695 (closed, 9 comments) reports the agent ignoring explicit instructions, skipping a mandatory backup, and claiming unverified checks on v2.3.0.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No new releases in the last 24h, so the changes below are merged or proposed code, not shipped behavior.

- `/reload` now refreshes scoped models, so edits to `enabledModels` apply without restarting Pi. A startup `--models` flag still wins. Proposed in PR #12278 (fixes #12277).
- `kill -TSTP <pi-pid>` now suspends Pi the same way `Ctrl+Z` does, instead of leaving the terminal unrestored. Proposed in PR #12283 (fixes #12272).
- Managed installs can be smoked-tested against the launcher's Node.js, after a CachyOS update broke the distro Node and with it `pi` (libsimdjson.so.36 missing). PR #12304.

**Worth knowing**

- Fullscreen on Windows + Zellij: mouse wheel scrolls prompt history instead of the transcript. Direct terminals and Linux + tmux work. Open, 15 comments (issue #9656).
- `openai-codex` with `"transport": "sse"` intermittently returns 400 `{"detail":"Bad Request"}` on long sessions when zstd-compressed; the identical uncompressed body passes. Open, prio:p0, 4 comments (issue #12060).
- Compaction threshold fires far below the window when a virtual model is selected, because `_modelForMessage()` returns undefined. Open, 3 comments (issue #12035).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- **New nightly v0.28.0-nightly.20261118.d9ac287c9f** — adds a full-stack E2E test that observes a real scheduled `/loop` fire in the managed agent (PR #17506). Matters for developers relying on the managed-agent loop path.
- **JSONL delimiter fix proposed in #17771** — a new leading-newline policy keeps complete transcript records readable after an interrupted append leaves a partial, unterminated tail. Matters for anyone recovering session history.
- **Dependency CVE audit still failing** (#13078, 56 comments) — scheduled audit run failed; cause may be a new high-severity vulnerability or an npm audit endpoint outage. Check before shipping dependency bumps.

**Worth knowing**

- **#17747 (P1, open):** a corrupted transcript JSONL line glues two records together, breaking the parent chain and degrading history. Reported by wenshao; fix proposed in #17771.
- **#17757:** a user reports Qwen 3.7 Plus ignoring the "ask permission" setting and making changes without approval. Status: needs-information, not confirmed.
- **#17787 and #17699:** CI Failure Patrol flagged managed-runtime worker and DingTalk adapter tests as flaky. Reruns will tell whether they are nondeterministic or real bugs.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*