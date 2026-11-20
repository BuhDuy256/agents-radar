# AI CLI Tools Community Digest 2026-11-20

> Generated: 2026-11-20 07:00 UTC | Tools covered: 7

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

**Skills in review**

**mcp-builder fix — MCP 2 HTTP client support**
This patch renames the removed `streamable_http_client` import and routes custom headers through `create_mcp_http_client`/`http_client` in `skills/mcp-builder/scripts/connections.py`. Use it when a builder skill fails to connect against `mcp>=2.0.0`; PR #1742 is open.

**skill-creator fix — isolated trigger evals, Windows and runtime handling**
The change isolates per-worker command probes, avoids `select()` on subprocess pipes on Windows, and treats runtime failures as errors instead of non-triggers. It targets false-miss trigger rates in `run_eval.py`; PR #1298 is open.

**docx fix — LibreOffice timeout reported as error**
`accept_changes.py` now returns an error when `soffice` times out and checks the output DOCX for leftover `w:ins`/`w:del`/`w:moveFrom`/`w:moveTo` revision marks before claiming success. PR #1792 is open.

**Open requests**

Community skills are being published under the `anthropic/` namespace, which lets them look official to users granting elevated permissions; the reporter describes finding this during a comparison of skill sources (Issue #492, open, 46 comments).

---

## What changed

**v2.1.329 adds hook visibility to managed settings.** A trust dialog now names the folder where a session's hooks are declared, and non-interactive hosts such as Claude Desktop warn in the conversation when hooks in managed settings fail to load. You now know which folder is responsible before a hook runs.

**Fable 5.2 was missing from the /model picker.** Issue #108955 (closed) reported that v2.1.322 on Windows showed only Fable 5.1, while typing `/model claude-fable-5-2` worked. The picker gap compounded 4 comments and 6 👍, so check the picker rather than assuming the model is unavailable.

**Print mode killed background Bash tasks at turn end.** Issue #111159 (closed) reported that `claude -p` stops a task started with `run_in_background: true` when the turn ends, even though the tool result says the model will be notified.

## Worth knowing

**Windows desktop ignores `ENABLE_TOOL_SEARCH=true`.** Issue #111283 reports the app loads all MCP tool schemas at session start, while the CLI defers them. No fix in the data.

**Keychains on macOS 26 re-prompt per session.** Issue #83841 reports the "access data from other apps" dialog reappears on every Claude Code launch and cannot be cleared.

**An open PR would block fork `@claude` mentions.** PR #111198 proposes not running them, currently just proposed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- **GPT-6.2 Sol and Astra added to model catalogs, Sol set as the default catalog selection** (`rust-v0.171.0`, #62106). Your catalog-driven model pickers now list both, and new threads default to Sol unless you override it. Matters if you script model selection or rely on a stable default.
- **TUI workspace on by default for `rust-v0.171.0`** (#61352, #61888, #61889, #61919). Searchable document previews, image previews, and subagent transcripts now appear alongside the main conversation. This changes the layout you see on every launch, not just on opt-in.
- **@-mention searches in the CLI TUI reworked** — #62241 (CLOSED) reported that typing in the `@` picker on CLI 0.170.0 launched overlapping ripgrep scans over saved conversation history before submit. Closed; treat as fixed only on a version that carries the change.

**Worth knowing**

- #41220 [OPEN] tracks abnormally fast quota and credit depletion across many reports (94 comments). No fix in the data. Check your usage accounting if your consumption shifted.
- #62650 [OPEN] — Codex App 26.1117.31558 crashes on launch on macOS with a dynamic wallpaper; 26.1111.71704 was verified to launch. No fix listed.
- #58507 [OPEN] — on macOS Desktop 26.1027.30824, new threads always use `:workspace` and `default_permissions`/`sandbox_mode` in `config.toml` are ignored. No fix listed.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- `v0.71.0-nightly.20261120` adds a `/stats heatmap` subcommand that shows daily token usage ([release notes](https://github.com/google-gemini/gemini-cli/releases)). Use it to track context consumption per day instead of guessing.
- The same nightly fixes literal `$` characters being mangled during template placeholder replacement ([PR #30136](https://github.com/google-gemini/gemini-cli/pull/30136)). Prompts or files containing `$` now survive rendering intact. Update before relying on dollar signs in templates.
- `v0.70.0` is the current stable release, with `v0.71.0-preview.0` available for early testing ([PR #30380](https://github.com/google-gemini/gemini-cli/pull/30380), [PR #30378](https://github.com/google-gemini/gemini-cli/pull/30378)).

**Worth knowing**

- A subagent reports `status: "success"` with `Termination Reason: "GOAL"` after hitting MAX_TURNS, hiding the interruption ([Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 comments). Check subagent output directly; no fix is linked.
- MCP server-level trust auto-approves every tool that server serves, including tools added after approval, with no first-seen confirmation ([Issue #30369](https://github.com/google-gemini/gemini-cli/issues/30369)). Only applies if you trust an MCP server.
- The generalist agent can hang indefinitely after being invoked ([Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 👍). Instructing the model not to defer to subagents avoids it; no fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.115-1 fixes MCP sign-in when a server grants the required scopes but omits the automatically requested refresh-token scope. Previously that combination could stop the flow. It matters if you authenticate remote MCP servers.
- v1.0.115-1 makes direct workflow execution wait for project extension workflows to register. This prevents workflows from starting before extensions are available.
- PR #2957 (closed) proposes fixing an extension bootstrap path mismatch in `launchExtension()`, where macOS and Windows extensions fail to load because the child process checks a different path than `app.js` passes. Treat as proposed, not released.

**Worth knowing**

- Issue #4203 (open, 5 comments) reports that an expired MCP access token forces an interactive re-login instead of using the cached refresh token, dropping the server's tools.
- Issue #5516 (open) reports `store_memory` offers `scope: "user"` when user-level memory is unavailable, so every user-scoped store fails with 404; repository-scoped stores still work.
- Issue #5517 (open) reports pasting a PDF inflates the context estimate (620k estimated against 31k real tokens), triggering unnecessary compaction.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

`session.collapse_all`, a proposed TUI command (PR #65079), collapses every transcript group in a session at once. Today you must close expanded tool and thought groups by hand, and opened groups stay open after cycling verbosity. It matters in long sessions where you want the whole transcript compact again.

Code Mode session tools are renamed in a breaking change (PR #65080): `opencode.session.rename` and `opencode.session.move`. Anything calling the old Code Mode paths needs updating.

A website diff fix (PR #65075) handles hunks whose `@@` headers carry ANSI colour prefixes, so the review pane shows diff bodies instead of only insertion and deletion counts.

**Worth knowing**

The main free tier issue (#59387) carries 393 comments. Reports include the "reset never happens" message for daily free messages.

Git plugin installs hang on a credential prompt on Windows (#65015), leaving `/api/model` and `/api/provider` returning 503 with no models shown.

A `claude-agent` bug (#62916, closed) dropped system messages from history, so keyed instruction updates never reached Claude.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## What changed

**Strict tools now sent to Copilot Responses models.** PR #12329 (closed) adds `strict` to GitHub Copilot's 18 Responses models (GPT, Grok, MAI-Code), fixing #12286 where omitted `strict` made Copilot populate every optional tool argument with `""` or `0`. Follow-up #12332 extends this to Claude on Copilot. Matters if you run Pi tools through Copilot.

**External `SIGTSTP` now restores the terminal.** PR #12283 (closed) routes `kill -TSTP <pid>` through the same path as Ctrl+Z, fixing #12272 where mouse tracking and Kitty keyboard reporting stayed armed at the shell. PR #12339 tightens listener ownership. Matters when suspending Pi from outside.

**Proposed: cacheable Codex system prompts.** PR #12319 (open) moves Pi's `openai-codex` system prompt out of top-level `instructions`, which GPT-6.2 places outside the cacheable prefix. Not released.

## Worth knowing

**Windows usage is unresolved.** Issue #7547 (open, 100 comments) asks how Pi should be run on Windows. Related: #12340 reports Git Bash silently truncates long RPC bash commands; #12133 reports terminal escape sequences leaking after exit.

**Copilot enterprise models stay hidden.** Issue #11006 (open) reports models newly enabled by an admin remain absent from the picker because `availableModelIds` only refreshes on token refresh. PR #12325 proposes a fix.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- Web Shell commit view can commit selected files only. PR #16681 makes the dirty-file list checkable, preselects all files, and leaves unchecked files in the working tree. Matters when you want one commit instead of staging by hand. Still open.
- OpenTUI runs on the shared agent loop by default. PR #17745 moves each model round and tool batch onto the same loop other surfaces use; opt out with `"experimental": { "unifiedAgentLoop": false }`. Now closed.
- JSONL tail diagnostics design is marked merged (PR #17913), after the writer-side fix landed.

**Worth knowing**

- Issue #15486 (P1, 7 comments): after automatic compaction, the next request's size estimate counts a pending tool result twice and adds a 20K pad, so the turn is stopped or sent with `max_tokens: 1`. Needs discussion.
- Issue #11680 (87 comments, updated 2026-11-19): E2E Tests fail on `main` in `sandbox:docker` before any test result is reported. No fix in the data.
- Issue #17854 (P1): in AUTO mode, server-level MCP trust bypasses the LLM classifier, so tools added after approval run unreviewed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*