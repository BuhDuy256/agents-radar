# AI CLI Tools Community Digest 2026-11-11

> Generated: 2026-11-11 05:58 UTC | Tools covered: 7

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

## Skill proposals and fixes

**skill-creator trigger evaluation fix — PR #1298**
Isolates trigger evals per worker and handles Windows pipe failures, so reported misses are real rather than the result of competing probes. Reach for it when `run_eval.py` reports false negatives. Open.

**mcp-builder HTTP client fix — PR #1742**
Updates `connections.py` for `mcp>=2.0.0`, where `streamablehttp_client` was renamed to `streamable_http_client` and headers move to `create_mcp_http_client`. Reach for it when the MCP builder skill breaks on current `mcp` versions. Open.

**docx comment detection — PR #1734**
Adds detection of orphaned comments in DOCX files, flagging comment references that no longer anchor to any run. Reach for it when reviewing documents with stale review threads. Open.

**Open requests**

Claude Code users cannot share skills inside an organization: they must download a `.skill` file and send it by Slack or Teams, then have colleagues upload it manually under Settings > Capabilities. Issue #228 asks for a shared skill library or direct sharing link. This is a request, not an accepted change.

---

**What changed**

No releases in the last 24h.

**Worth knowing**

- Issue #88583 (OPEN) reports `claudeAiOauth` blanked in the macOS Keychain when concurrent Desktop sessions race the single-use refresh token. The reporter says the refresh failure clobbers the winner's rotated credential. No fix is in the data.
- Remote Control drops after silent auto-updates on Windows. Issues #100114, #95491, #104206 and #108519 describe sessions staying off or archived after relaunch. #108960 (CLOSED) reports a Windows auto-update ending a running agent process without warning.
- Issue #108726 (OPEN) reports `DISABLE_TELEMETRY=1` hides Fable 5.2 from the `/model` picker: the flag makes Claude Code ignore cached feature flags. 5 comments, 12 👍.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

`rust-v0.167.1` shipped in the last 24 hours as a patch release over `rust-v0.167.0` ([compare](https://github.com/openai/codex/compare/rust-v0.167.0...rust-v0.167.1)). The data shows no changelog entries beyond the version bump, so treat it as a routine update.

Pre-release builds `rust-v0.169.0-alpha.9`, `rust-v0.169.0-alpha.10`, and `rust-v0.167.0-alpha.4.2` were also published. These are alpha versions, not stable.

Several fixes to Windows sandboxing, aborts, and permissions remain **proposed** in closed pull requests, not shipped: #60708 (canonicalize sandbox homes and restore saved junction paths), #60700 (finalize aborted turns so an active turn cannot stay stuck), and #60702 (centralize permission config selection).

**Worth knowing**

Issue #56655 (78 comments, open): the VS Code extension UI fails to start on Windows after upgrading to 26.51021.22027. No fix appears in the data.

Issue #59895 (55 comments, open): Windows local projects disappear after an app update and switching back to a personal ChatGPT account.

Issue #48774 (62 comments, open): Codex Remote pairing fails on Android, so QR-code sign-in does not complete.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

`/stats heatmap` is a new subcommand that shows daily token usage, added in v0.69.0-preview.0 ([PR #30136](https://github.com/google-gemini/gemini-cli/pull/30136) context, [release v0.69.0-preview.0](https://github.com/google-gemini/gemini-cli/releases)). It lets you see per-day consumption without leaving the CLI. Use it when tracking spend across a long project.

Literal `$` characters now survive template placeholder replacement. The fix lands in v0.69.0-preview.0 for `{{args}}` and prompt substitutions like `${AgentSkills}`. It matters when your arguments contain `$$`, `$&` or `$1`, which previously got corrupted. A matching fix, [PR #30115](https://github.com/google-gemini/gemini-cli/pull/30115), is still open.

v0.68.0 shipped as a stable release, with its changelog in [PR #30224](https://github.com/google-gemini/gemini-cli/pull/30224). No breaking changes appear in the data.

**Worth knowing**

A subagent that hits MAX_TURNS reports `status: "success"` and `Termination Reason: "GOAL"`, hiding the interruption ([issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 comments). The author saw this with `codebase_investigator`. No fix appears in the data.

The generalist agent can hang indefinitely, including on tasks such as folder creation ([issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments, 8 👍). One user reports that instructing the model not to defer to subagents avoids it.

The browser agent ignores `settings.json` overrides such as `maxTurns` ([issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)). No fix appears in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.110-0 adds an experimental option to answer git, ssh, and sudo password prompts from agent commands in a masked dialog, enabled with `/experimental on` ([release](https://github.com/github/copilot-cli)).
- v1.0.110-1 fixes `copilot --resume`: a reopened session is marked in use immediately, so `copilot -p --resume` and a second window no longer write into an idle session ([release](https://github.com/github/copilot-cli)).
- v1.0.110-1 aligns custom status lines by preserving the first row's indentation ([release](https://github.com/github/copilot-cli)).

**Worth knowing**

- Resumed sessions can fail every request with `400 Tool reference '...' not found in available tools` when an MCP server's tools change between launches; open, no fix listed ([#5359](https://github.com/github/copilot-cli/issues/5359), updated 2026-11-11).
- On Windows 11, NumLock-off numpad navigation and Delete are ignored in version 1.0.98; open, no fix listed ([#5171](https://github.com/github/copilot-cli/issues/5171), 5 comments).
- In 1.0.109, every extension slash command prints "No client found for command" although the handler runs; open, no fix listed ([#5412](https://github.com/github/copilot-cli/issues/5412)).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

OpenCode v2.2.7 adds **GitHub Copilot Auto** to the model picker ([#62997](https://github.com/anomalyco/opencode/issues/62997)). Pick Auto when your Copilot account has an Auto pool, and Copilot's router picks the model per session at the Auto discount. If routing fails, OpenCode falls back to the account's default chat model.

**Worth knowing**

The free tier has an open tracker at [#59387](https://github.com/anomalyco/opencode/issues/59387), with 347 comments and 27 👍. It covers `Free usage exceeded`, limit resets that never happen, and a Desktop build that no longer launches. No fix appears in the data.

Agent sandboxing is still unresolved in [#2242](https://github.com/anomalyco/opencode/issues/2242) (108 comments, 84 👍). Terminal commands from the agent can reach files outside the working directory; the author asks for seatbelt-style limits but reports no equivalent.

[#58638](https://github.com/anomalyco/opencode/issues/58638) reports that a symlink bypasses read rules and the `external_directory` check: permission checks use the written path, not the resolved file. Marked reproduced; no fix listed.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

- v1.5.2 adds forking sessions whose original folder is gone. Fork such a session into the current folder instead of only continuing, so later resumes stop asking.
- PR #12025 (closed) fixes the p0 crash in #11956, where cancelling a read during file open exited Pi with an uncaught AbortError.
- PR #12016 (closed) proposes Microsoft Entra ID authentication for Azure OpenAI via DefaultAzureCredential, removing the API-key requirement for Microsoft Foundry.

**Worth knowing**

- `cacheWarming: "idle"` stops silently for two groups: sessions where an extension handles `turn_end` and the context holds a custom or compaction message (#10956), and sessions on a virtual model registered with `registerVirtualModel` (#10536). Both open, no fix in the data.
- `pi.sendMessage(msg, { triggerTurn: true })` starts a run during a manual compaction (#10982, 4 comments). A fix is proposed in PR #12028, not released.
- `StringEnum` in Pi 1.5.0 breaks compile-time typing: tool parameter fields derive as `unknown`, risking type errors (#11869, open, 3 👍).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

Qwen Code v1.0.0-preview is out, merging Qoder's agent capabilities with Qwen Code for code understanding, debugging, and testing. The release note warns interfaces, config options, and behaviors may change during Preview. Use it only if you can absorb churn.

v0.27.2 adds Web Shell channel configuration for WeChat, QQ, and Email, including QR login, scan progress, identity display, and logout where supported (#16736, #16724). This lets you drive sessions from those platforms.

PR #16858 (open) proposes changing the AUTO-mode classifier to judge whether the user authorized an action, not whether it fits the last message. Not released.

**Worth knowing**

Workflow-agent permission approval never renders, hanging the run while the status bar still shows a pending-approval badge; observed on 0.26.6 and reproduced on 0.26.8 (#16425). No fix in the data.

AUTO mode echoes the pending tool call as a "Prior action," telling the classifier it already ran (#16496, 6 comments). No fix shown.

Release v0.27.1-nightly.20261110.c238beb56f failed on 2026-11-10 in the integration_docker job (#16861).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*