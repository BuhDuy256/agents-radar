# AI CLI Tools Community Digest 2026-11-15

> Generated: 2026-11-15 06:14 UTC | Tools covered: 7

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

## Claude Code Skills — 2026-11-15

**proofcore-contract-auditor — static analysis for Solidity and Rust contracts**
Scans smart contracts for issues and anchors a cryptographic audit proof onto the TON Blockchain using ProofCore's Merkle protocol. Reach for it when auditing Web3 contract code; open (anthropics/skills PR #1771).

**notion-spec-to-implementation — turns product specs into Notion tasks**
Breaks spec pages into implementation plans with tasks, acceptance criteria and progress tracking that Claude Code can execute. Useful when a written spec must become tracked work items; open (anthropics/skills PR #1245).

**md2video-audio — compiles Markdown into narrated MP4**
Converts Markdown through Marp into slides, then adds human-like voiceover to produce MP4 video at zero cost. Reach for it when a document should become a presentation video; open (anthropics/skills PR #1703).

### Open requests

Skill triggering is unreliable in the evaluation tooling: Issue #556 reports that `run_eval.py` produced a 0% trigger rate across all test queries, and Issue #1352 reports that with more than one worker the script cross-matches skill UUIDs and returns near-zero trigger rates. Both remain open.

---

**What changed**

No releases in the last 24h. Only open PRs, none merged or shipped:

- **Plugin hook path quoting** — PR #95698 ([link](https://github.com/anthropics/claude-code/pull/95698)) would run `ralph-wiggum` and `output-style` `.sh` hooks through `bash` with a quoted path, instead of a bare unquoted path. Proposed, not released.
- **hookify install-dir fix** — PR #81672 ([link](https://github.com/anthropics/claude-code/pull/81672)) would make the `hookify` package importable regardless of the plugin directory name. Proposed, refs #69665 and #81448.
- **Foreground dedupe agents** — PR #106972 ([link](https://github.com/anthropics/claude-code/pull/106972)) sets `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` so dedupe agents aren't cut off. Proposed, not run on GitHub.

**Worth knowing**

- **Auto-memory transparency** — Issue #82056 ([link](https://github.com/anthropics/claude-code/issues/82056), 80 comments) asks for an in-session way to tell whether the auto-memory index loaded fully, truncated, or not at all. No fix in the data.
- **Opus 5.5 answer corrections** — Issue #105112 ([link](https://github.com/anthropics/claude-code/issues/105112)) reports the author's corrected answers rose from 5.2% to 25.4% after Oct 19. User report, macOS.
- **Scheduled tasks stall on permissions** — Issue #101851 ([link](https://github.com/anthropics/claude-code/issues/101851), marked duplicate) reports desktop scheduled tasks stopping at approval prompts, defeating unattended runs. No fix in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- **Archived threads are now read-only in the TUI, with unarchiving support.** Per PR #61586 (closed), archived threads freeze input while keeping the cached transcript, drafts, and pending steers, and `U` unarchives and resumes the thread. It matters if you reopen old sessions expecting to type into them.
- **Cloud session switches now honor Ctrl+C.** Per PR #61481 (closed), Ctrl+C during a pending Cloud session switch clears buffered draft input, or shuts down and abandons the switch when no draft exists. It matters when a Cloud session hangs on navigation.
- **Git remote metadata is now length-capped.** Per PR #61488 (closed), fetch URLs are read from NUL-delimited output and remote URL metadata is limited so turn metadata stays under the Responses API's 8,096-character limit. It matters on repos with very long or filter-text-contaminated remote entries.

**Worth knowing**

- Windows Codex Desktop can fail to resume cloud-managed chats with an `AbsolutePathBuf` error before you send a message (issue #59855, open, 37 comments). A related Windows cloud-resume failure appears in #60324 (open). Neither has a fix in the data.
- macOS desktop reports recurring HTTP 400 errors after successful tool operations, blocking long tasks (issue #58569, open). Retrying is described but no fix is confirmed.
- No releases shipped in the last 24 hours.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24h. Changes below are in development, not shipped.

- A proposed fix forwards `contextManagement` settings from the CLI to the core ([PR #30068](https://github.com/google-gemini/gemini-cli/pull/30068)). Today a configured masking threshold (for example 400,000 tokens) is discarded and the core keeps its 50,000-token default. Matters if you set large output-masking thresholds.
- A proposed fix stops `gemini models` from omitting `gemini-3.8-flash`, which `/model manage` lists on v0.67.0 ([PR #30194](https://github.com/google-gemini/gemini-cli/pull/30194), fixes [#30193](https://github.com/google-gemini/gemini-cli/issues/30193)). Matters when selecting that model from the CLI.
- A proposed fix prevents "Always allow" on a tainted shell command from saving a persistent rule for the command's root, such as every future `npm ...` command ([PR #30196](https://github.com/google-gemini/gemini-cli/pull/30196)). That limit would apply to untrusted flags or build commands after build files change.

**Worth knowing**

- The generalist agent can hang indefinitely on simple tasks like folder creation; the reporter says instructing the model not to defer to subagents avoids it (8 comments, 8 👍) ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)). No fix in the data.
- A `codebase_investigator` subagent reports `status: "success"` and `Termination Reason: "GOAL"` after hitting MAX_TURNS before analysis, hiding the interruption (13 comments) ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)).
- Users report Gemini rarely invokes custom skills or subagents on its own unless explicitly told (7 comments) ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

No releases or pull requests landed in the last 24 hours. All 50 updated items are open issues, so nothing in this data describes a shipped change.

**Worth knowing**

- Auth token stops refreshing in long-running processes (#4929, 13 comments). Every prompt fails with an authorization error and `/login` does not recover the process. Workaround: restart and resume the same session.
- Default subagent models include `gpt-6-luna` and `claude-sonnet-5.5`, which the reporter says are unavailable on the free plan (#5456). Subagent runs error out; set `explore`, `task` and `research` to models your plan offers.
- Agent checkpoints create commits under `refs/agents/<session-id>/checkpoints/turn/N` using your git identity (#5323). You cannot disable this; a feature request for a setting exists.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**
- No releases in the last 24 hours. All changes below are open or merged pull requests, not shipped versions.

**Worth knowing**
- On Linux, OpenCode 2.3.0 leaks zombie shell processes under `opencode-pty daemon`; completed commands return normally but are never reaped. Reported twice (#63817, #63976, both updated 2026-11-15). No fix in the data.
- On Windows 11, shell calls using Store PowerShell 7 fail to spawn with `0xC0070005` after upgrading 2.2.7 → 2.3.0 (#63892). No PR listed.
- Subagent completion reports wake the parent on every hidden internal turn in 2.3.0 (#63894), affecting plugins that create child sessions via SDK. PR #64026 (open, by rekram1-node) proposes reporting subagent state from outstanding work; not released.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**
PR #12163 proposes `toolOutput.maxBytes` and `toolOutput.maxLines` settings to cap the model-facing excerpt for bash and read; defaults remain 51200 bytes and 2000 lines. This lets you shrink long tool output in context.

PR #12110 (inprogress) sends `reasoning_effort` and reads reasoning tokens for GitHub Copilot Gemini and Kimi models, which previously hardcoded `supportsReasoningEffort: false`. Not yet released.

PR #12178 adds a `description` option to `ctx.ui.select`, threading through the existing `ExtensionSelectorComponent`. Proposed, closes as extension API support.

**Worth knowing**
Issue #11950: when the agent sends bash and read in one message, both run concurrently, so the read returns stale or missing output. Open, 7 comments.

Issue #9448: `pi auth check` cannot see extension-registered providers, reporting a missing model as `invalid_state`. Open, 5 comments, 1 👍.

Issue #12165: `searchTools()` returns full descriptions — the author measured ~950KB across 73 calls, ~25% of a three-day session's context. Closed.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- Nightly v0.27.2-nightly.20261113.6f754be654 registers client filesystems into managed agent sessions ([PR #16844](https://github.com/QwenLM/qwen-code/pull/16844)). This lets managed sessions see client-side files without a separate bridge. It matters if you run managed agents on hosted workspaces.
- A release of v0.27.4 failed on 2026-11-15, with `integration_none` and `integration_docker` jobs failing ([issue #17308](https://github.com/QwenLM/qwen-code/issues/17308), [issue #17305](https://github.com/QwenLM/qwen-code/issues/17305)). Both are closed as `ready-for-agent`. If you depend on a clean v0.27.4 tag, check whether those integration legs have been rerun.
- Proposed only: [PR #17320](https://github.com/QwenLM/qwen-code/pull/17320) adds a `get_context_remaining` tool and a self-triggered compaction path, so the model can query its own context budget instead of relying on auto-compaction alone. Not shipped.

**Worth knowing**

- In auto approval mode, a subagent batch with two or more parallel approval requests renders only one dialog; the rest orphan and freeze the batch ([issue #17332](https://github.com/QwenLM/qwen-code/issues/17332), P1, 3 comments). No fix in the data.
- MCP tools can stay `DISCONNECTED` for the rest of a session after a turn is aborted mid HTTP tool call ([issue #12160](https://github.com/QwenLM/qwen-code/issues/12160), 3 comments). Root cause is in `packages/core/src/tools/mcp-tool.ts`; no fix listed.
- On Windows, toggling environment information in Web Shell spawns many `cmd.exe` windows and overlapping git polls ([issue #17266](https://github.com/QwenLM/qwen-code/issues/17266), 3 comments). No fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*