# AI CLI Tools Community Digest 2026-11-04

> Generated: 2026-11-04 06:03 UTC | Tools covered: 7

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

**fix(mcp-builder) — support mcp>=2 HTTP client imports**
Updates the MCP builder's connection script so it works with `mcp>=2.0.0`, where `streamablehttp_client` was renamed to `streamable_http_client` and custom headers now pass through `create_mcp_http_client`. Reach for it when building or testing MCP servers on the newer SDK. Open (anthropics/skills PR #1742).

**Add md2video-audio skill — Markdown to MP4 with voiceover**
Compiles Markdown documents into MP4 videos via Marp slides plus human-like voiceovers, per the author's description. Reach for it when a document needs to become a narrated video. Open (anthropics/skills PR #1703).

**Add pyxel skill — retro game development**
Guides creating, debugging and verifying retro Python games, covering headless input-driven runs, direct frame inspection and task-specific state checks. Reach for it when building or testing a Pyxel game. Open (anthropics/skills PR #525).

**Open requests**

`claude-api` injects roughly 156k tokens in a single tool call, exhausting the context window; the reporter ran Claude Code 2.1.220 (anthropics/skills Issue #1487).

---

## What changed

- **v2.1.318** records your answer when Claude Code asks to enable the mods it writes during a session. `assume_role` is now accepted on `mantle` upstreams of the Claude apps gateway, for cross-account AWS roles and per-developer cost attribution.
- PR #95698 proposes routing three bundled plugins' `.sh` hooks through `bash` with a quoted path, fixing the ralph-wiggum and output-style half of #78490. Not released.
- PR #106972 proposes setting `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` on dedupe runs so agents finish their turn instead of being cut off. In development.

## Worth knowing

- Issue #97074: headless `claude -p` (entrypoint `sdk-cli`) consumed ~1.8× more of the 5-hour window per token than interactive `cli` on the same workload, per the author's measurements. 68 comments; no fix in the data.
- Issue #45596: `/buddy` disappeared in v2.1.97 with no changelog note; 1195 👍 and 284 comments ask for its return. Still open.
- Issue #107144: the account-email check in 2.1.317+ denies local-only Bash calls (heredoc writes, curl to 127.0.0.1) in headless bypass runs. Reported 2026-11-04.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## What changed

**Unified image budgeting is on by default** — PR #59282 marks `unified_image_budget` stable, so supported models now prepare images at `original` detail. This raises image fidelity, and `view_image` drops its `detail` parameter from the schema. It matters if your prompts or tooling set `detail` explicitly.

**Directional focus shortcuts in workspace mode** — PR #59287 adds configurable `focus_pane_left` and `focus_pane_right` (defaults `leader left`/`leader h` and `leader right`/`leader l`). This lets you move between parent and side conversations without reopening a hidden pane.

**rust-v0.168.0-alpha.1 is out** — a new alpha release, no changelog detail in the data. Alpha builds change behavior without warning; use them only when you can absorb that.

## Worth knowing

**Issue #59060** (open, 115 comments): a user reports Codex CLI v0.166.0, told to reboot a server, destroyed systemd, destroyed containers, and ran random scripts. No fix in the data.

**Issue #54227** (open, 11 comments): a Windows ChatGPT Pro user reports repeated `server_overloaded` and remote compact failures across Codex models since September 10. No fix in the data.

**Issue #59323** (open): a Windows Enterprise user on 26.1029.61003 cannot resume chats that use a different configured model provider after an update. No fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

Gemini CLI shipped nightly v0.67.0-nightly.20261104.g89e9d25d6 with two fixes. The CLI now handles stream failures during extension release downloads (PR #30100), and core preserves an explicitly set `gemini-2.5-flash` model during dynamic model resolution. The second matters if you pin that model and rely on it not being swapped.

Proposed fixes are in flight for two long-standing user reports. PR #30122 would load agent definitions from symlinked markdown files in `~/.gemini/agents/`, fixing issue #20079, where symlinked agent files are skipped. PR #30124 would require a path-separator boundary in `tildeifyPath()`, preventing sibling directories with a shared prefix from being rewritten as home paths.

**Worth knowing**

Issue #21409 (8 comments, 8 👍) reports the generalist agent hanging forever on simple tasks like folder creation; instructing the model not to defer to subagents works around it. No fix appears in this data.

Issue #22323 (13 comments) reports the `codebase_investigator` subagent returning `status: "success"` and `Termination Reason: "GOAL"` after hitting its maximum turn limit before analysis. No fix appears in this data.

Issue #24246 reports a 400 error when more than 128 tools are available. No fix appears in this data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.106-8: Windows local model downloads now install llama.cpp automatically and show engine installation progress. It matters if you run local models on Windows and previously had to install the engine yourself.
- v1.0.106-7 adds `/code`, which opens the current session in VS Code, and a Fusion tier setting in `copilot config`. It matters when you want to continue a CLI session in your editor.
- v1.0.106-6 makes `/settings` open the unified dashboard for all users and adds global search across settings and local resources.

**Worth knowing**

- Issue #5347: every interactive session prints "Connected Connectors could not be loaded", while the same version, account and directory load Connectors successfully in `-p` mode. The underlying error is only logged at debug level. Open, no fix in the data.
- Issue #5343: `providers.json` is ignored without `COPILOT_PROVIDER_BASE_URL`, and `--model` silently substitutes a subscription model. It affects BYOK users, including plugins making their own `copilot -p` calls. Open.
- Issue #5270: with GPT-6.1 Sol selected, the transition from Plan to Implementation mode never occurs. It affects users who pick that model explicitly or through Auto. Open.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## What changed

**No releases in the last 24h.** Nothing shipped; the items below are merged or in review.

**Stray background service on `opencode run`** — PR #61564 stops `run` from leaving a detached `serve --service` process behind when it exits. This matters in CI and Docker, where the orphan survived (issue #55908). The PR is open, not merged.

**Session forks now reach the client** — PR #61559 publishes `session.forked` in addition to `session.created`, so forked sessions appear without a manual refresh. Closes #61554; still in review.

**Image cap per request** — PR #61563 adds a count-based limit via `media.image.max_images`, addressing sessions that resend all history images every request (#59794) and become unusable on backends with a per-prompt image limit, such as vLLM. Open.

## Worth knowing

**Free-tier errors remain the top thread.** Issue #59387 (254 comments) collects reports of `Free usage exceeded`, free-message resets that never fire, and Desktop free-tier failures. No fix listed.

**V1→V2 migration data loss.** Issue #49827 hides non-git (global-project) sessions from the TUI picker after upgrading; #54736 aborts migration entirely on legacy message IDs failing the `Session.Message.ID` schema.

**Parallel subagents break prompt cache.** Issue #61318 and #61556 report main and child agents evicting each other's cache when run concurrently; single-agent sessions are unaffected.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases landed in the last 24 hours, so nothing new is installable today. The changes below are merged fixes and open proposals visible in the issue and PR data.

An RPC-mode process now exits on an idle `ctx.shutdown()` call from an extension, such as a timer callback, instead of waiting for the next command ([#11599](https://github.com/earendil-works/pi/issues/11599)). A follow-up PR keeps a started shutdown running when stdin closes and SIGTERM arrives in the same tick ([#11752](https://github.com/earendil-works/pi/pull/11752)). Relevant if you run `--mode rpc` under systemd or a supervisor.

The grep tool now takes context lines from ripgrep rather than reading each matched file whole, fixing the out-of-memory crash in headless SDK use ([#9276](https://github.com/earendil-works/pi/issues/9276), [#11705](https://github.com/earendil-works/pi/pull/11705)).

MCP Streamable HTTP now applies `maxMessageBytes` to `application/json` replies, not only SSE ([#11335](https://github.com/earendil-works/pi/issues/11335), [#11749](https://github.com/earendil-works/pi/pull/11749)).

**Worth knowing**

On Windows with mintty and ConPTY, terminal color query replies leak into the prompt and BEL opens the external editor; 0.99.x is affected, 0.87.1 is not ([#10256](https://github.com/earendil-works/pi/issues/10256), 23 comments, open, in progress).

On Windows, Ctrl+V is unbound in the editor; only Alt+V pastes ([#11765](https://github.com/earendil-works/pi/issues/11765), closed).

`find` returns no results for glob patterns using backslash separators like `src\**\*.ts`, with no error ([#9262](https://github.com/earendil-works/pi/issues/9262), open).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- **v0.26.7 released.** It adds an operator-scoped `model.catalogRefresh` setting and lets `privacy.usageStatisticsEnabled: false` stop the background model catalog refresh. The release notes list no breaking changes. ([release](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.7))

- **Project-hook trust is being unified (PR #16264, open).** The fix makes `.qwen/settings.json` hooks load only with explicit folder trust in every mode — TUI, headless, and ACP/SDK — removing the non-interactive exemption. Related security report #14746 was closed. Not yet released.

- **Windows CUA Driver 0.27.0 flagged.** Bitdefender blocks the official x64 ZIP as `Gen:Variant.Barys.381847` and denies access (issue #16249, open, P1). No fix in the data.

**Worth knowing**

- **Durable scheduled tasks can silently vanish.** After a daemon restart, tasks whose session no longer exists fail to rehydrate with no warning and no catch-up (issue #16207, open, P1). Affects daemon users; no fix in the data.

- **Bot workflows exhaust the `GITHUB_TOKEN` rate limit.** Bursts from autofix, triage and review workflows cause unrelated CI jobs to fail with HTTP 403 (issue #16188, open, P1). Reported 2026-11-03.

- **Responses can time out at ~300s.** Anthropic-compatible requests in 0.26.4 disconnect near 301s even with `QWEN_CODE_API_TIMEOUT_MS` set; issue #16187 is closed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*