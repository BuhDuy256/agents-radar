# AI CLI Tools Community Digest 2026-10-28

> Generated: 2026-10-28 05:27 UTC | Tools covered: 7

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

## Skill fixes in review

### mcp-builder — support mcp>=2 streamable HTTP client — open
Updates `skills/mcp-builder/scripts/connections.py` for `mcp>=2.0.0`, where `streamablehttp_client` was renamed to `streamable_http_client` and custom HTTP headers now pass through `create_mcp_http_client` / `http_client` instead of a direct kwarg — per anthropics/skills PR #1742.

### skill-creator — isolate trigger evals and handle Windows failures — open
Stops trigger evaluation from reporting false misses or invalid scores: per-worker command probes compete, `select()` on subprocess pipes fails on Windows, and unrelated tools abort the scan — per anthropics/skills PR #1298.

### webapp-testing — drop shell=True in with_server.py — open
Replaces `subprocess.Popen(..., shell=True)` in `skills/webapp-testing/scripts/with_server.py`, closing a command injection risk (CWE-78) from passing unsanitized agent-supplied command strings into a system shell — per anthropics/skills PR #1980.

## Open requests

Issue #228 asks for org-wide skill sharing in Claude.ai, since sharing today means downloading the `.skill` file and having colleagues upload it manually under Settings > Capabilities.

---

## What changed

**v2.1.312 adds `oidc.user_id_claim` to the Claude apps gateway.** This lets admins identify users by an `id_token` claim other than `sub`, such as Microsoft Entra ID's `oid`. It matters for teams authenticating through Entra ID and needing stable user IDs.

**v2.1.312 adds click-to-send for queued messages.** In fullscreen, clicking the "to send now" hint under a queued message sends it immediately, matching the key binding. No more waiting for the turn to end.

**PR #15620 proposes fixing YAML parsing in plugin-dev examples.** JSON arrays in `tools:` and `allowed-tools:` are parsed as literal strings; the PR converts them to comma-separated YAML across 11 files. Not yet merged.

## Worth knowing

**Issue #97074 reports headless `claude -p` uses ~1.8× more of the 5-hour window per token than interactive `cli`.** Same workload, entrypoint `sdk-cli`. 54 comments, no fix in the data.

**Issue #105579 reports that on Windows Desktop, a queued message is never delivered after Claude's turn ends.** It stays at "1 message queued" indefinitely. Related: #105577 (mid-turn messages queued until turn end). No fix listed.

**Issue #105551 reports Bash tool calls stall 10–17+ minutes before the shell starts on Windows,** following the Desktop update to 4.29.0 (Claude Code 2.1.309). Regression, no fix in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- `rust-v0.165.0` adds a built-in Google Cloud Vertex AI provider, set with `model_provider = "gcp"`, plus GPT-6.1 Terra in the model catalogs (#56265, #57337). This lets you point Codex at Vertex AI without a custom provider shim. It matters when your project already runs on GCP.
- The session picker gained a repository filter and the agent command center gained directory grouping, so you can find a session without scrolling the full list (#56265, #57337).
- PRs #57606 and #57638 propose `codex doctor --network-only` and OpenTelemetry requirement types in the app-server protocol; both are in development, not released.

**Worth knowing**

- Issue #13733 (45 comments) reports that polling `write_stdin` burns tokens: every background-process status check sends a full API turn with the complete history. Affects anyone running `cargo build`-style jobs. No fix in the data.
- Issue #15723 (29 comments) reports background subagents do not wake the calling agent on completion, so work stalls until you check. Several open issues (#32188, #29922, #33542) request event-driven wakeup.
- Issue #49980 (27 comments) reports agent tools fail with process creation and workspace URI errors for WSL workspaces on Windows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## What changed

- **v0.67.0-nightly.20261028.gfa5c17365** fixes ripgrep resolution on Android/Termux by allowing trusted system paths ([PR #29884](https://github.com/google-gemini/gemini-cli/pull/29884)). It also normalizes CRLF line endings before diffing in `getDiffContextSnippet`. Matters if you run Gemini CLI under Termux or work in CRLF files.
- **v0.67.0-preview.0** and **v0.66.0** shipped. v0.66.0 updates ROADMAP.md to remove the outdated 2025 roadmap. No user-facing behavior change is documented in the data.
- **PR #29980** (open) proposes `gemini extensions validate <path>` to check `gemini-extension.json` before install or publish. Proposed, not released.

## Worth knowing

- Subagent recovery after MAX_TURNS is reported as GOAL success, hiding the interruption ([Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 comments, 👍2). The subagent `codebase_investigator` reports success despite hitting the turn limit. No fix in the data.
- The generalist agent hangs indefinitely on simple tasks like folder creation ([Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments, 👍8). Instructing the model not to defer to subagents reportedly resolves it. No fix in the data.
- Browser Agent ignores `settings.json` overrides such as `maxTurns` ([Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)). `AgentRegistry` reads the settings, but the agent does not apply them. No fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.105 (2026-10-27): Selecting Copilot Fusion High or Max in `/model` now works from long-context sessions. Previously this selection failed once a session exceeded the context window; it now applies without restarting the session.
- v1.0.105-0 (2026-10-27): Same fix shipped separately as a pre-release build. Use it if you track pre-release versions.

**Worth knowing**

- Windows/WSL2 sessions can crash and freeze the TUI at ~215% CPU while idle (#3700, open since 1.0.60, 5 comments). No fix released; restart is the only workaround.
- Voice input on WSL2 segfaults after 1.0.100, leaving `/voice` stuck on "Fetching voice models" (#5197, 5 comments). A new voice runtime shipped with 1.0.100; no fix in the data.
- Model selection still doesn't persist: `/model gpt-5-mini` reverts to `claude-sonnet-4.6` after restart (#1869, 7 comments). Re-select the model each session.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

- v2.2.0 shipped Desktop plugins (experimental): create, install, and share GUI extensions ([#55246](https://github.com/anomalyco/opencode/pull/55246), [#59469](https://github.com/anomalyco/opencode/pull/59469), [#59489](https://github.com/anomalyco/opencode/pull/59489)). Matters if you extend the desktop app rather than the TUI.
- Proposed: `experimental.subagent_concurrency` caps simultaneous subagents, unset keeps today's no limit ([#55983](https://github.com/anomalyco/opencode/pull/55983)). In development, not released.
- Proposed: scheduled prompts let a session wake itself on a time or cron ([#59401](https://github.com/anomalyco/opencode/pull/59401), [#59457](https://github.com/anomalyco/opencode/pull/59457)). Off unless `experimental.schedules` is on.

**Worth knowing**

- MCP permission asks raised inside Code Mode (`execute`) never render in the TUI, so execution hangs until you interrupt; reported against 2.0.16, 8 comments, no fix in the data ([#51223](https://github.com/anomalyco/opencode/issues/51223)).
- Completed subagents can return an empty body to the parent even when the child reports `idle_outcome: succeeded` with real token usage ([#59051](https://github.com/anomalyco/opencode/issues/59051)).
- `opencode serve` RSS grew from 161 MB to ~1.0 GB over ~7 hours and stayed elevated while idle; one report, 7 comments ([#51340](https://github.com/anomalyco/opencode/issues/51340)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## What changed

**Session resume no longer drops your built-in tools.** When a session branch was truncated by an orphan `parentId` after an ENOSPC write failure, resume lost every default tool (#11460). Fixed, marked p0. Matters if you hit disk-full conditions on Windows.

**Hidden thinking with an empty label no longer draws blank rows.** Setting `ctx.ui.setHiddenThinkingLabel("")` used to leave 2–3 blank rows per thinking block (#11470). Fixed. Matters for extensions that suppress thinking display.

**`/tree` summarization now passes your thinking level.** The Summarize option ignored it, so `generateBranchSummary` built requests without `reasoning` (#11482). Fixed. Matters on reasoning models via OpenAI Responses and Azure.

## Worth knowing

**OpenAI ChatGPT Business login still fails.** `3p_delegated_access_policy_denied` on the regular OpenAI subscription login; the "OpenAI Codex (legacy)" option works with the same account (#10953, 11 comments). Closed as no-action, so the workaround is still the fix.

**Sessions can wedge at the context ceiling on reasoning models.** Every request returns `stopReason: "length"` with `usage.output: 16`, and auto-compaction gives up (#9409, 10 comments). Still open.

**An Anthropic SSE parser bug aborts turns.** If a CRLF splits across two network chunks, the pending event flushes with no `data:` field and JSON parsing throws (#10390). Still open.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

`v0.26.2` ships a breaking change: `fix(managed-agent)!: simplify Web Shell controls and retire cwd submissions` ([#15616](https://github.com/QwenLM/qwen-code/pull/15616)). Web Shell controls are simplified and cwd submissions are removed, so managed-agent flows that submitted a working directory must be adapted. Check this before upgrading.

`v0.26.3-preview.0` adds opt-in memory extraction cadence after a no-op run ([#13571](https://github.com/QwenLM/qwen-code/pull/13571)), plus outer XML call recovery with quoted content. Both are preview-only and not in a stable release yet.

`v0.26.2-preview.1` proposes managed session permission rules and Auto approval ([#15448](https://github.com/QwenLM/qwen-code/pull/15448)). In development, not released.

**Worth knowing**

Subagent background task completion notifications only reach the top-level agent ([#15748](https://github.com/QwenLM/qwen-code/issues/15748), 2 comments, open). The reporter says the subagent never gets notified, and the top-level wake-up can cause confusion or an OOM crash. No fix in the data.

Managed-agent ownership predicates can reach an unbounded runtime placement lock on per-turn control paths ([#15766](https://github.com/QwenLM/qwen-code/issues/15766), P1, open). No fix confirmed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*