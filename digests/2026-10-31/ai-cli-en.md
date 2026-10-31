# AI CLI Tools Community Digest 2026-10-31

> Generated: 2026-10-31 05:25 UTC | Tools covered: 7

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

**proofcore-contract-auditor — static smart contract auditing with on-chain proof**
Scans Solidity and Rust contracts for vulnerabilities and anchors the audit result as a cryptographic proof on the TON blockchain. Reach for it when an agent must produce a verifiable audit record for Web3 code; it is an open pull request (anthropics/skills PR #1771).

**notion-spec-to-implementation — turn product specs into Notion tasks**
Breaks a spec page into an implementation plan with concrete tasks, acceptance criteria and progress tracking that an agent can then execute. It is an open pull request (anthropics/skills PR #1245).

### Open requests

**Community skills published under the `anthropic/` namespace**
Community-made skills are being distributed under the `anthropic/` namespace, which the reporter says lets them impersonate official Anthropic skills and misleads users into granting elevated permissions (anthropics/skills Issue #492).

---

**What changed**

- v2.1.316 adds `CLAUDE_CODE_DISABLE_ULTRATHINK`, which turns the `ultrathink` keyword off. Set it when you want the keyword ignored rather than triggering extended reasoning.
- The same release adds pooled group budgets to the Claude apps gateway. Admins set `pooled_budget` on the spend limits admin API, giving a group one monthly budget shared across members on top of each member's own limit.

**Worth knowing**

- The native installer produces an unsealed macOS app bundle that code signature validation rejects, so macOS reports `ClaudeCode.app` as "damaged and can't be opened" (issue #70647, open, 17 comments, 8 👍). No fix appears in the data.
- A stdio MCP tool result above roughly 8 MiB closes the connection and kills the server (issue #105703, open, 2 comments). The author reproduced it with a minimal server; no fix appears in the data.
- `--dangerously-skip-permissions` does not help unattended agents read link-shared Claude artifacts, because the Artifact tool requires a human confirmation each session (issues #106332 and #106321, both open).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

No releases in the last 24h. Two changes are in development, not shipped.

- **Proposed: deferred tool world state on by default.** PR #58410 marks `deferred_tool_world_state` stable and enables it, moving deferred tool namespaces into the developer `<tools>` context instead of the `tool_search` description. Explicitly disabling the feature keeps the old discovery behavior. This matters when you rely on `tool_search` to find tools.
- **Proposed: TUI session switching across backends.** PR #58457 resumes a selected conversation through its owning backend, so the session picker no longer rejects conversations from another backend.

**Worth knowing**

- Windows taskkill/conhost process storms persist: Issue #33776 (44 comments) reports hundreds of leftover `taskkill.exe`/`conhost.exe` processes causing WMI storms and DWM degradation. No fix in the data.
- Desktop hooks regression: Issue #21639 (29 comments) reports hooks no longer running after a Codex Desktop update. No fix in the data.
- Pro users lose the weekly usage ring on macOS: Issue #57333 reports the Codex macOS weekly usage ring missing on Pro but visible on Plus. No fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- Nightly `v0.67.0-nightly.20261031.g6814e00d6` fixes two core bugs: the shadow repo now honors `.git/info/exclude` and `core.excludesFile` ([PR #30034](https://github.com/google-gemini/gemini-cli/pull/30034)), and `CodeAssistServer` flushes its pending SSE buffer at stream EOF ([PR #30059](https://github.com/google-gemini/gemini-cli/pull/30059)). The first matters if files you excluded still showed up in agent context; the second if the last streamed event was silently dropped.

**Worth knowing**

- A generalist agent hang is reported in [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (8 comments, 8 👍): deferring to the generalist agent hangs indefinitely, including for simple folder creation. Instructing the model not to use sub-agents worked around it for the author. No fix in the data.
- Sub-agent turn-limit exhaustion is reported as `status: "success"` with `Termination Reason: "GOAL"` in [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (13 comments, p1). If you script against sub-agent status, an interrupted run can look like a completed one.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**
- No releases shipped in the last 24 hours, so nothing user-visible changed today.
- PR #5310 (open, devm33) proposes fixing amd64 and arm64 container smoke-test failures: the workspace is created with mode `0700`, blocking the image runtime user (UID 10001), and Git initialization runs as root. This is in development, not released.
- PRs #5307 and #5308 (closed, brunoborges) would have published a headless Copilot CLI server image to `ghcr.io/github/copilot-cli` on each release, addressing issue #55. Review feedback flagged that an existing `latest` or `prerelease` manifest without a version annotation could be overwritten by an older release. Not released.

**Worth knowing**
- Issue #5306: `--available-tools=` with an empty value exposes all 21 built-in tools instead of none. There is no documented way to run `copilot -p` with zero tools. Open.
- Issue #5301: the built-in `web_search` tool fails intermittently with an HTTP 504 Gateway Timeout at roughly 120s from the remote GitHub MCP server; the author reports failures on more than half of calls over ~9 days. Open.
- Issue #5298: `copilot --model fusion` fails in 1.0.105 with "requires dynamic Auto tiers" unless the undocumented `DYNAMIC_AUTO_TIERS` flag is set. Open.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

- v2.2.5 adds worktree and shell mode shortcuts: `⌘⌥O`/`Ctrl+Alt+O` picks a worktree, `⌘⌥B`/`Ctrl+Alt+B` picks its base branch, and `⌘⇧X`/`Ctrl+Shift+X` toggles shell mode in the composer. Use them when juggling branches without leaving the composer.
- v2.2.3 lets you use Claude Code inside OpenCode: install Claude Code, run `claude auth login`, then pick **Claude Agent** in `/connect`. That routes your existing Claude Code login and models through OpenCode.
- v2.2.4 makes desktop terminals persistent per session; they survive server restarts with scrollback and stay synced with the TUI and other windows. Renamed terminals keep their names across restarts.

**Worth knowing**

- Issue #59387 (149 comments) is the tracking thread for free tier failures — "Free usage exceeded", quota errors, and resets that never happen. It is a user report, not a confirmed fix.
- Issue #60399 reports the CLI hanging 120+ seconds before sending any request on networks whose DPI drops fragmented TLS ClientHello packets; plain `curl` succeeds on the same machine. Status: reproduced, open.
- Multiple reports (#60534, #60455, #59291) describe `ECONNRESET` socket errors; no fix appears in this data.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## What changed

**Extension reloads are now deferred.** `ctx.requestReload()` replaces awaited `ctx.reload()`, so extensions can request a canonical runtime reload once operations, compaction, or branch summarization settle (PR #7948). Direct unsafe reloads are rejected. This landed alongside the request from issue #6552.

**Tool search ranking was fixed.** `tool_search` now returns a tool when the query is that tool's exact name, and tool names outweigh description matches (PRs #11625, #11632). A follow-up re-ranks tools matching more query terms first. A separate PR #11631 ports the same ranking to durable.

**WSL interop helpers now start from `/`.** Pi previously inherited its cwd when spawning `powershell.exe`, so deep paths failed with `Invalid argument` past MAX_PATH (PR #11627, fixes #11592). The same PR reports external editor failures.

## Worth knowing

**Windows terminals leak color-query replies into the prompt.** On mintty/ConPTY in 0.99.x, the startup color query inserts escape-sequence text such as `;0;rgb:0000/…` into the prompt and BEL opens the external editor (#10256, 15 comments). 0.87.1 and Windows Terminal are unaffected. PR #11609 proposes consuming mintty's prefixless palette replies.

**Anthropic sessions break after an extension drops a tool mid-session.** Every later request fails with `tool_reference_unresolved` (#11376, 4 comments, `prio:p0`). An extension reload that stops registering tools triggers it; issue #10954 reports the same failure on `anthropic-messages` through OpenCode Go.

**RPC mode does not exit on async shutdown.** An idle `--mode rpc` process with stdin open stays alive after an extension calls `ctx.shutdown()` from a timer; the request is not processed until another command arrives (#11599).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- `cua-driver-rs v0.27.0` ships prebuilt Qwen CUA Driver binaries under `packages/cua-driver`. macOS gets a codesigned, notarized universal binary plus `QwenCuaDriver.app`; Linux and Windows builds are unsigned (glibc 2.31 floor on Linux). Matters if you drive the desktop CUA on any of these platforms.
- Proposed in PR [#15953](https://github.com/QwenLM/qwen-code/pull/15953): the shell tool's "did this `cd` leave the repo?" check compares an absolute `cd`/`pushd` target against the actual working directory. Today an absolute path is assumed to leave the repo, which can block an amend.
- Proposed in PR [#15789](https://github.com/QwenLM/qwen-code/pull/15789): buffered shell output is decoded once on non-UTF-8 code pages (CP936, CP932, CP866). Today the first output chunk picks the encoding.

**Worth knowing**

- Issue [#15276](https://github.com/QwenLM/qwen-code/issues/15276): Windows desktop updates fail with "Error opening file for writing" on `runtime\qwen-code\node\node.exe`, because the installer holds the bundled Node runtime locked. Open, 4 comments.
- Issue [#15919](https://github.com/QwenLM/qwen-code/issues/15919): `@qwen-code/qwen-code@0.26.4` bundles fast-uri 3.1.0 via `@modelcontextprotocol/client` 2.0.0, so the 3.1.7 bump from #10862 does not reach it. Open.
- Issue [#15861](https://github.com/QwenLM/qwen-code/issues/15861): the `web-shell E2E Smoke` lane times out on the Add Workspace dialog on unrelated PRs, forcing re-attribution rounds.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*