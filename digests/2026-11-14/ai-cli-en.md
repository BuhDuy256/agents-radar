# AI CLI Tools Community Digest 2026-11-14

> Generated: 2026-11-14 06:07 UTC | Tools covered: 7

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

**md2video-audio — turns Markdown into narrated MP4 video**
Compiles a Markdown document into an MP4 with a realistic voiceover, converting it to slides through Marp and then adding audio. Reach for it when a written document needs a spoken-video version at no cost. Open — anthropics/skills PR #1703.

**proofcore-contract-auditor — static audit for smart contracts**
Runs automated static analysis on Solidity and Rust contracts and anchors an audit proof on the TON Blockchain using a zero-storage Merkle protocol. Reach for it when a Web3 developer needs a verifiable record of a contract review. Open — anthropics/skills PR #1771.

**scnet-hpc — drives SCNet HPC clusters**
Operates SCNet clusters through profile-based SSH and Slurm workflows, covering job generation, cluster discovery and connection or partition settings per profile. Reach for it when submitting and managing compute jobs on SCNet. Open — anthropics/skills PR #1615.

**Open requests**
Users cannot share skills across an organization directly; today they must download the `.skill` file, send it through Slack or Teams, and have each colleague upload it manually under Settings > Capabilities (anthropics/skills Issue #228).

---

**What changed**

- v2.1.325 fixes a security issue in how zstd-compressed responses are decoded ([release v2.1.325](https://github.com/anthropics/claude-code)). Anyone relying on compressed responses should update.
- v2.1.325 adds a one-time spinner tip in VS Code and similar integrated terminals: re-run a Jupyter notebook cell after Claude has read or edited it. Applies only after notebook access.
- v2.1.323 removed the `subagentStatusLine` setting with no replacement, per issue [#109446](https://github.com/anthropics/claude-code/issues/109446). Per-agent context, cost, model and effort are no longer visible; settings files holding the key still load.

**Worth knowing**

- Running `claude --agent <name>` ignores the agent frontmatter `effort:` field for main-thread sessions since 2.1.322 ([#109779](https://github.com/anthropics/claude-code/issues/109779)). No fix in the data.
- Windows and macOS desktop users report scheduled tasks cannot call `start_session`, so handoffs fail by design ([#109767](https://github.com/anthropics/claude-code/issues/109767)). No fix in the data.
- A macOS report describes fseventsd runaway on agent-heavy Macs, blocking Claude Code at startup ([#98769](https://github.com/anthropics/claude-code/issues/98769), 18 comments). No fix in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- **Side-chat tabs in the terminal workspace (rust-v0.169.0).** The opt-in terminal workspace now supports multiple side-chat tabs, switchable by keyboard or mouse, and saved local side chats reopen after a Codex restart (#59784, #60152, #60181). This matters if you keep several parallel side conversations while working in the terminal.
- **Searching older tasks in the agent command center (rust-v0.169.0).** You can now search older tasks by name, prompt preview, or working item. Useful when you need to find a previous task without scrolling through history.
- **Model catalogs are now thread-scoped (PR #61421, closed).** The proposed change resolves model metadata through the thread's own catalog rather than the startup catalog, avoiding wrong provider capabilities after a default provider switch. Not yet released.

**Worth knowing**

- **Windows Computer Use leaves the capture border and access open** (#57101, 28 comments, open). The gold/yellow display border remains after a screenshot-producing turn completes. No fix in the data.
- **macOS desktop returns recurring HTTP 400 errors** (#58569, 6 comments, open). Successful tool operations can be followed by a failed model continuation, blocking the task. No fix in the data.
- **Windows Store updates fail on a locked old MSIX package** (#25770, 24 comments, open). Similar reports appear in #51588 and #42520. No fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases landed in the last 24 hours, so nothing shipped. Two open pull requests alter daily behavior if merged:

- **[PR #30169](https://github.com/google-gemini/gemini-cli/pull/30169)** (open, proposed): pasted text would become inert by default via `ui.escapePastedAtSymbols`, and fuzzy `@` matches would stop attaching SSH private keys. Matters when you paste shell transcripts containing `@`.
- **[PR #30175](https://github.com/google-gemini/gemini-cli/pull/30175)** (open, proposed): local subagents would apply their `generateContentConfig` (temperature, topP, topK, thinkingConfig) for every model value, not only `auto`. Today non-`auto` subagents silently drop those settings.
- **[PR #30170](https://github.com/google-gemini/gemini-cli/pull/30170)** (open, proposed): a stalled single model call would no longer make local subagents wait out the full 3-minute `maxTimeMinutes` plus recovery turn before timing out.

**Worth knowing**

- **[Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)** (open, 8 comments, 8 👍): the generalist agent hangs indefinitely on simple tasks like folder creation. The author reports instructing the model not to defer to subagents avoids it. No fix in the data.
- **[Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)** (open, 13 comments): the `codebase_investigator` subagent reports `Termination Reason: "GOAL"` and `status: "success"` after hitting MAX_TURNS with no analysis done. Approved-by-status output can mask interruption.
- **[Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)** (open): Gemini CLI returns a 400 error when more than 128 tools are available.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- **v1.0.111 adds regex support to enterprise-managed Shell, Bash, and PowerShell permission rules.** This lets admins write pattern-based allow/deny rules instead of matching exact commands. It matters for teams whose managed policies previously had to enumerate commands one by one.
- **v1.0.111 adds `--host-allow-session-creation`.** Remote clients can create sessions on a CLI host for a single launch without changing saved settings. Relevant if you expose a CLI host to another machine and don't want that permission to persist.
- **v1.0.112 fixes failed `/compact` output.** A failed compact now shows the model provider's error message without an internal host-rethrow prefix. You get the real cause instead of a wrapped one.

**Worth knowing**

- **Context overhead grew by ~20K tokens per session after CLI 1.0.106**, per Issue #5450 (desktop app 1.4.0). The author reports usable room dropped from ~112K to ~93K on a 200K window, so auto-compaction triggers sooner. No fix in the data.
- **Long interactive sessions still crash with out-of-memory**, per Issue #5435 on 1.0.109. The author reports it recurs, and that resuming the session loses the previous background agent. No fix in the data.
- **Assisted permissions is re-prompting for too many commands**, per open Issue #5066. The author calls it a regression and notes it's partly a feeling; a related quota issue (#4802) is closed.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

- **v2.3.0: background subagents by default.** Subagents now return immediately, run in the background and report back when idle, so you can keep working in the parent session while several run at once ([#63382](https://github.com/anomalyco/opencode/pull/6)).
- **Zombie processes on Linux in 2.3.0.** Finished shell commands are never reaped under `opencode-pty daemon` after upgrading from 2.2.7, though results and exit codes still return ([#63817](https://github.com/anomalyco/opencode/issues/63817), closed).
- **Proposed:** time-based model availability with fallback, gating a model by time windows ([PR #63728](https://github.com/anomalyco/opencode/pull/63728)).

**Worth knowing**

- `--auto` in the V2 TUI approves permission requests only for the selected session route; a background tab can stay blocked until you select it ([#44007](https://github.com/anomalyco/opencode/issues/44007), reproduced, open).
- Subagent `sessionID` continuation fails: the tool receives `"ses"` and returns "Subagent session not found". Spawning new subagents still works ([#59293](https://github.com/anomalyco/opencode/issues/59293), open).
- `opencode api model.list --standalone` returns HTTP 503 "Location plugins did not finish activating"; background-service calls work ([#63273](https://github.com/anomalyco/opencode/issues/63273), reproduced, open).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24h.

Three fixes are proposed or in review:

- Retry bare Node socket error codes. PR [#12136](https://github.com/earendil-works/pi/pull/12136) adds `ECONNRESET`, `EPIPE` and `ETIMEDOUT` to the retryable provider error pattern. A dropped stream would retry the turn instead of aborting it.
- Keep `read`'s non-vision warning out of model context. PR [#12139](https://github.com/earendil-works/pi/pull/12139) stops the `[Current model does not support images…]` note from being saved and replayed after switching to a vision model.
- Render large self-rendered tool results without crashing. PR [#12145](https://github.com/earendil-works/pi/pull/12145) fixes the TUI crash on large `edit` diffs reported in [#8036](https://github.com/earendil-works/pi/issues/8036).

**Worth knowing**

- Tool calls in one message run concurrently with `bash`, so a `read` can run before the command finishes ([#11950](https://github.com/earendil-works/pi/issues/11950), open, prio:p0).
- MCP HTTP keeps resuming a tool's response stream after cancel or timeout ([#11763](https://github.com/earendil-works/pi/issues/11763), open, fix-available).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## What changed

No releases landed in the last 24 hours, so nothing here is shipped — these are in-development changes.

**Legacy folder-trust settings migrate automatically** ([PR #17123](https://github.com/QwenLM/qwen-code/pull/17123), open). Old boolean `folderTrustFeature` values now convert to the active folder-trust setting, and an explicit legacy `folderTrust` value wins over its alias. It matters if you carry an older settings file: your enabled/disabled choice survives instead of being silently dropped.

**Web Shell can commit a subset of files** ([PR #16681](https://github.com/QwenLM/qwen-code/pull/16681), open). The commit view lists every uncommitted file with a checkbox, preselects all, and sends only the checked set. Unchecked files stay in the working tree. It matters when you want to split one dirty tree into several commits without leaving the Web Shell.

**Hybrid code mode adds an `exec` tool** ([PR #11854](https://github.com/QwenLM/qwen-code/pull/11854), open, older). A new `tools.mode` enum accepts `direct`, `code_mode`, and `code_mode_only`; `code_mode` keeps ordinary tools callable while exposing an isolated JavaScript `exec`.

## Worth knowing

**A `/loop` stop sent as a user message does not cancel a pending `loop_wakeup`** ([Issue #15894](https://github.com/QwenLM/qwen-code/issues/15894), open, 0.26.1). A self-paced loop re-arms itself, so it resumes after an explicit stop. Reported on 2026-10-29, still open, no fix in the data.

**Malformed permission rules parse as inert without a report** ([Issue #16078](https://github.com/QwenLM/qwen-code/issues/16078), open). Shapes like `Bash(rm -rf /))` parse with a trailing `)` inside the specifier and match differently than intended. Affects anyone hand-writing permission rules.

**The CLI can hang at login verification on headless Linux** ([Issue #17038](https://github.com/QwenLM/qwen-code/issues/17038), open). After browser login from another machine, the CLI stays stuck and never continues. No fix in the data; `need-information`.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*