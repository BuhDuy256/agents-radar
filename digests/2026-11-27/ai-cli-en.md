# AI CLI Tools Community Digest 2026-11-27

> Generated: 2026-11-27 08:10 UTC | Tools covered: 7

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

# Claude Code Skills — 2026-11-27

### pyxel skill for retro game development
Adds a Pyxel skill that guides creating, debugging, and verifying retro games in Python, including headless input-driven runs and direct frame inspection. Reach for it when building or testing Pyxel games; separate references cover Pyxel behavior and presentation. Open — anthropics/skills PR #525.

### webapp-testing: drop shell=True in with_server.py
Replaces `subprocess.Popen(..., shell=True)` in `with_server.py`, which had allowed `cd <dir> && <command>` chains. Removing the shell closes a command injection risk (CWE-78). Open — anthropics/skills PR #1980.

### docx: report LibreOffice timeout as an error
`accept_changes.py` now returns an Error when `soffice` times out instead of reporting success, and only claims success after confirming the output DOCX no longer carries revision marks. Open — anthropics/skills PR #1792.

**Open requests**

Community skills distributed under the `anthropic/` namespace impersonate official Anthropic skills, which lets users grant elevated permissions to skills they believe are official. The issue has 46 comments; it is a user report, not an accepted change. Open — anthropics/skills Issue #492.

---

## What changed

No releases in the last 24h.

## Worth knowing

**WSL hangs still open.** Issue #26224 (135 comments, 152 👍) reports Claude Code freezing on prompts for 5–20 minutes on WSL, updated 2026-11-27. No fix appears in the data.

**Reasoning safeguard false positives.** Issue #111336 reports 78 `[reasoning_extraction]` block events between 2026-11-13 and 2026-11-20 across Fable 5.2 (45 blocks), Opus 5.5, and Sonnet 5.5, on ordinary development work. The author counted the request IDs; no fix is listed.

**Usage limit jumps to 100%.** Issue #112477 reports v2.1.332 jumping the 5-hour usage limit from 0% to 100% on reset or a single prompt (Linux, regression). Related: #112557 reports excessive 5-hour consumption on Pro. Neither has a fix in the data.

**Stale-sweep change proposed.** PR #112436 proposes that the stale sweep no longer close issues labeled `has repro`, `reproduced`, `data-loss`, or `high-priority`. Open, not merged.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## What changed

**TUI diff sidebar (PR #64258).** `/diff` opens in a read-only sidebar tab instead of a full-screen pager, keeping the conversation visible while reviewing working-tree changes. The PR is closed, and the data does not say which release ships it.

**Inline Markdown images (PR #64254).** The TUI shows previews for local Markdown image references where it previously printed alt text, on supported terminals. Closed, unreleased.

**Alpha release.** `rust-v0.174.0-alpha.8` was published in the last 24 hours with no listed changes beyond the version. ([release](https://github.com/openai/codex/releases))

## Worth knowing

**Windows sandbox and PATH regressions.** Issue [#13542](https://github.com/openai/codex/issues/13542) (37 comments, 28 👍) reports the bundled `rg` fails with Access Denied in Codex Desktop's integrated PowerShell. Issue [#31073](https://github.com/openai/codex/issues/31073) reports Git HTTPS remote operations fail or crash inside the Windows sandbox. Both open, no fix in the data.

**Windows reply failures and crashes.** Issue [#54564](https://github.com/openai/codex/issues/54564) (34 comments) reports the Send button stays disabled in new Work threads. Issue [#64038](https://github.com/openai/codex/issues/64038) reports repeated React ErrorBoundary crashes on Home and New Thread. Both open, no fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## What changed

**Hook input gains `tool_call_id`.** PR #30491 adds `tool_call_id` to BeforeTool and AfterTool hook inputs, so hooks can pair a call's before/after events by id instead of guessing from tool name plus arguments. Currently open, not released. Matters if you write hooks that correlate tool calls.

**Windows shell description corrected.** PR #30312 makes the model-facing `run_shell_command` description state the shell actually selected on Windows, including PowerShell 5.1's double-quote behavior. Open, so not yet shipped. Relevant if you rely on shell commands on Windows.

**Extension docs fix.** PR #30305 corrects docs recommending `"excludeTools": ["run_shell_command(rm -rf)"]`, which the docs claimed blocks the command but matches nothing, because entries are compared against the whole tool name. Open.

## Worth knowing

**Generalist agent hangs.** Issue #21409 (8 comments, 8 👍): deferring to the generalist agent hangs indefinitely, even for folder creation. A user reports that instructing the model not to use subagents resolves it. Status: need-retesting; no fix in the data.

**400 error past tool limit.** Issue #24246: Gemini CLI returns a 400 error with more than 128 tools. Open, status/need-information. No fix in the data.

**Symlinked agent files ignored.** Issue #20079: a symlink in `~/.gemini/agents/filename.md` is not recognized as an agent. Open, need-information.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

v1.0.117-5 adds `sandbox.userPolicy.network.extraCaCertificates` in user or managed settings, letting sandboxed commands trust custom CA certificates through TLS-intercepting proxies. Use it when your network inspects TLS and sandboxed commands fail certificate checks.

v1.0.117-3 improves Assisted Permissions so Copilot skips a confirmation prompt when it stops a process it started in the same session, matched by process ID. The same release fixes MCP tool approval: approving an MCP server's tools for a session or location no longer approves Copilot's built-in requests, such as shell.

v1.0.117-4 fixes Page Down stalling at a pinned prompt in a 10-row terminal with tabs enabled.

**Worth knowing**

Issue #5593 (open): with local sandboxing on, `git submodule update` is blocked even when every submodule already sits at its recorded commit, breaking install or build scripts. The author reports it worked in 1.0.99-2.

Issue #5591 (open): Copilot CLI reportedly accumulated hundreds of `copilot-mcp-oauth` / `copilot-keychain-chunk` entries in Windows Credential Manager without removing them, until other apps hit `CredWrite` error 8.

Issue #5586 (open): on Windows 1.0.114, existing UNC paths are rejected during preflight as excluded by organization content policy, a regression from 1.0.108.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases landed in the last 24 hours, so the changes below are proposed PRs, not shipped behaviour.

- **Empty assistant turns with tool calls**: PR #66754 sends `content: null` instead of an empty string, fixing 400 errors from strict OpenAI-compatible providers ([#66749](https://github.com/anomalyco/opencode/issues/66749)). Matters if you route through providers like Agnes API.
- **Skill loading failures**: PR #66742 raises a skipped `SKILL.md` from debug log to warning ([#66716](https://github.com/anomalyco/opencode/issues/66716)). Today a malformed frontmatter makes the skill vanish with no signal.
- **TUI config reload**: PR #66752 reloads `cli.json` when its symlink target changes ([#66743](https://github.com/anomalyco/opencode/issues/66743)). Matters if you keep dotfiles symlinked.

**Worth knowing**

- Free-tier failures stay the top thread: [#59387](https://github.com/anomalyco/opencode/issues/59387) has 414 comments covering "free usage exceeded" messages and resets that never happen.
- Headless runs intermittently register no MCP servers (~10% of sessions), so every MCP tool call fails — [#65932](https://github.com/anomalyco/opencode/issues/65932).
- Snapshot capture packs git-ignored and >2 MiB files into the store, reported at 90 GB in [#65127](https://github.com/anomalyco/opencode/issues/65127).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

- **No releases in the last 24h.** All items below are issues and PRs, not shipped changes.

- **Copilot `reasoning_opaque` replay is fixed.** PR [#12505](https://github.com/earendil-works/pi/pull/12505) (closed) captures and replays the opaque reasoning value that Pi previously dropped on `openai-completions`. Matters for GitHub Copilot users on multi-turn requests, where later turns replayed `reasoning_text` without it (issue [#12418](https://github.com/earendil-works/pi/issues/12418)).

- **`!!` output no longer inflates context estimates.** PR [#12592](https://github.com/earendil-works/pi/pull/12592) (closed) excludes `bashExecution` messages with `excludeFromContext: true` from `estimateTokens()`. Matters when large `!!` output made compaction trigger early.

- **Kitty image IDs constrained to signed 32-bit.** PR [#12596](https://github.com/earendil-works/pi/pull/12596) (closed) keeps IDs in range Konsole can parse. Fixes image loss in issue [#12548](https://github.com/earendil-works/pi/issues/12548); the scrollback-wipe half is in PR [#12597](https://github.com/earendil-works/pi/pull/12597) (closed).

**Worth knowing**

- **Extension-registered providers intermittently ignored.** Issue [#8810](https://github.com/earendil-works/pi/issues/8810) (open, 12 comments): fresh sessions sometimes skip `defaultProvider`/`defaultModel` when the provider comes from `pi.registerProvider()`. No fix in the data.

- **Context usage can spike after network errors.** Issue [#10287](https://github.com/earendil-works/pi/issues/10287) (open, 9 comments): on 0.99.2, `getContextUsage()` jumped from ~42k to 330,081 tokens after a retryable failure. No fix in the data.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

Qwen Code CLI now runs on the Harness kernel, released in v0.28.7 ([#18351](https://github.com/QwenLM/qwen-code/pull/18351)). Usage statistics stay off unless `privacy.usageStatisticsEnabled` is `true`, and repeated-tool-call rejections now explain their cause. Check your privacy setting before upgrading if you rely on telemetry being silent by default.

SDK TypeScript v0.1.39 bundles CLI 0.28.7 ([PR #18513](https://github.com/QwenLM/qwen-code/pull/18513)). The release notes also list a bundled CLI 0.28.6 section, so confirm the CLI version you actually get if you pin the SDK.

A proposed fix targets v0.28.7 `qwen serve` freezes: worktree retention can stall the event loop for 6–8 minutes via O(N²) lookups on large `.qwen` snapshots ([#18489](https://github.com/QwenLM/qwen-code/issues/18489), [PR #18494](https://github.com/QwenLM/qwen-code/pull/18494)).

**Worth knowing**

`qwen serve` transcript pagination reparses the full JSONL per request, so `limit=1` costs the same as `limit=500` and stalls the event loop ([#17889](https://github.com/QwenLM/qwen-code/issues/17889)). Open, 3 comments.

HTTP MCP servers using OAuth lose their tools when the stored access token expires, because it is pinned at connect time ([#15649](https://github.com/QwenLM/qwen-code/issues/15649)). Open, 3 comments.

The Linux Desktop AppImage renders a gray window on current Mesa; the author reports it bundles an old `libwayland-client` ([#18486](https://github.com/QwenLM/qwen-code/issues/18486)). Open, 3 comments.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*