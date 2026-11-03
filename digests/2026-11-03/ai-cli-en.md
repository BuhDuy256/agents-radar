# AI CLI Tools Community Digest 2026-11-03

> Generated: 2026-11-03 06:34 UTC | Tools covered: 7

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

**threejs shaders — allocates and names a bounded resource pool**
Replaces ad-hoc shader instantiation with an explicit pool of 8 preallocated WebGL programs, so mid-frame allocations stop stalling the render loop. Use when a scene needs several shader variants without per-draw compile cost. PR #2051 by nikki-dotcom, updated 2026-10-15, is open and unmerged.

**test-fixture — generates a repo-matched pytest fixture scaffold**
Traces existing test imports and conftest structure, then emits fixtures that match the project's real helper names instead of generic placeholders. Reach for it when adding the first tests to an untested module. PR #2043 by jamesk94, updated 2026-10-16, is open and unmerged.

**issue-triage — routes incoming GitHub issues to owners by label**
Reads issue text and existing labels, then proposes one owner and one priority label per issue without writing to the tracker until asked. Use when an unwatched repo accumulates mixed bug reports and feature asks. PR #2033 by priyankamalviya, updated 2026-10-14, is open and unmerged.

**Open requests**

`claude-api` injects roughly 156k tokens in a single tool call, exhausting the context window; the reporter asks the skill to load its reference files on demand instead (anthropics/skills Issue #1487).

---

**What changed**

v2.1.317 adds a warning to `/schedule` when a new cloud scheduled task receives connectors you did not request, and shows how to remove them. It also adds a confirmation prompt before a web or shell tool call sends your account email address to the network. Both changes affect cloud and tool-calling workflows.
The same release adds `onFailure: "block"` for Agent SDK hook configs, letting hooks stop an agent instead of continuing.

**Worth knowing**

Usage accounting complaints continue: Issue #102667 reports the weekly limit draining faster than before, and Issue #105621 reports the same on Max with an unchanged Windows workflow. No fix appears in this data.
Cowork MCP elicitation can return `{"status":"cancelled"}` with no prompt shown (Issue #106880).
Claude Desktop sign-in fails with "We couldn't verify your browser" on macOS (Issue #103788); the reporter says only an exit-IP change let the email path through.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- `rust-v0.167.0-alpha.4` shipped ([release](https://github.com/openai/codex/releases)). No changelog detail is given, so treat it as an alpha without documented behavior changes.
- VS Code workspace scoping is the most-discussed open request, #25319, with 58 comments and 127 👍. The author asks that Codex VS Code chat history be scoped to the current workspace or project. Still open, so not yet available.
- PR #59015, "Make SQLite schema migrations safe for concurrent startup," is closed. It wraps schema checks and migrations in one transaction with SQLite busy retries, addressing races when several processes open the database. No release mapping in the data.

**Worth knowing**

- Windows Computer Use focused-element reporting is wrong, and Calculator index operations vary across window lifecycles (#58482). Affects Windows desktop users; no fix in the data.
- Cross-device sessions break in both directions: iOS times out loading long desktop sessions with no retry (#28480), and Dot cannot read a local Work thread due to "unsupported placement format version 2" (#50698). Both open.
- MCP issues go unfixed, per discussion #33682 (22 👍, 5 comments), citing weeks-old OAuth and tool-discovery bugs. User report, not confirmed.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- `v0.67.0-nightly.20261103` ships PR [#30058](https://github.com/google-gemini/gemini-cli/pull/30058): interrupted Whisper model downloads no longer leave a partial file that `isModelInstalled()` treats as complete. It matters if you use Whisper and have retried a failed download.

- Proposed PR [#30104](https://github.com/google-gemini/gemini-cli/pull/30104) refreshes slash commands after `/skills link <path>`. Currently the skill is re-discovered but does not show in the `/` list until restart. Not yet merged.

- Proposed PR [#30094](https://github.com/google-gemini/gemini-cli/pull/30094) shows executing subagent tool calls in UI state; the filter in `useToolScheduler` dropped calls that skip approval. Fixes #22589.

**Worth knowing**

- [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409) (8 comments, 8 👍) reports the generalist agent hangs forever, including on simple folder creation. Instructing the model not to use subagents avoids it. No fix in the data.

- [Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323) (13 comments) reports a subagent that hit MAX_TURNS still reports `status: "success"` and `Termination Reason: "GOAL"`. Open.

- [Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246) reports a 400 error past 128 tools. Open.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.106-6 makes `/settings` open the unified dashboard for all users and adds global search across settings and local resources. This lets you find a setting or resource by name instead of navigating menus. It applies whenever you run `/settings`.
- v1.0.106-5 honors `includeCoAuthoredBy: false` in ACP mode (`copilot --acp`), fixing Issue #5133. ACP clients no longer add a `Co-authored-by` trailer to commits. This matters if you use Copilot CLI through an ACP client and had disabled the trailer in `copilot -p`.
- v1.0.106-4 fixes `@file` mentions written inside parentheses, brackets, braces, angle brackets, quotes or backticks. The mention now attaches the file and expands correctly in `!` shell commands instead of being silently ignored.

**Worth knowing**

- `copilot --resume` without an ID can drop into a new empty session, and the Sessions list is auto-replaced after about 2 seconds (Issue #5228, closed, 2 comments). The trust prompt then takes your first Enter.
- Helpers that inject standing instructions miss steering messages: the `userPromptTransformed` hook is skipped for messages delivered while the agent is already working (Issue #4640, open, 1 comment).
- Image paste (Ctrl+V/Meta+V) does not work in a VS Code devcontainer terminal (Issue #5334, open, 1 comment); text paste still works. Reported on 1.0.105, linux-arm64.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases in the last 24 hours.

Two fixes are proposed for problems developers hit daily. PR #61314 rebuilds a cached location after its directory becomes a git repo, so projects opened before `git init` stop losing sessions. PR #61341 discards superseded history pages, preventing a delayed page from refilling a deleted transcript or resetting the cursor. Both are open, not released.

PR #61244, now closed, links new Console workspaces (`org_` IDs, previously only `wrk_` was recognized) to their Go page and shows monthly Go resets.

**Worth knowing**

Issue #59387 remains the central free-tier thread: 221 comments, reset messages that never reset, and free usage reports.

Issue #61072 reports Claude Agent drains the 5-hour plan limit about 1.8x faster because the SDK labels requests `sdk-ts`; issue #61282 reports 3.9x lower cache reuse with Opus 5.5. No fix listed.

Issue #61318 reports main agents and subagents on the same model evicting each other's cache in parallel.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

Pi v1.5.0 adds extension update changelogs: the next fresh launch after an update shows what changed in installed extension packages. Package authors choose the changelog path, and `collapseChangelog` condenses the notices.

`pi update` now reports which packages changed and to which version ([PR #11707](https://github.com/earendil-works/pi/pull/11707)), and self-updates report the version the package manager actually installed rather than the advertised one ([PR #11709](https://github.com/earendil-works/pi/pull/11709)). Both matter when npm resolves stale registry metadata and reinstalls the old version.

**Worth knowing**

High CPU on macOS with long sessions: 50–110% CPU and 600–800MB memory, anecdotally linked to context size ([issue #7730](https://github.com/earendil-works/pi/issues/7730), 23 comments, open). No fix in the data.

Large transcripts re-render every frame, and every resize re-emits the whole transcript, saturating one core on Windows Terminal ([issue #9549](https://github.com/earendil-works/pi/issues/9549), open, in progress).

With `cacheWarming: "idle"`, idle warming never fires once an extension handles `turn_end` and the context holds a custom or compaction message; all 507 decisions in one report sat at `continuationProbability: 1` ([issue #10956](https://github.com/earendil-works/pi/issues/10956), open).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

v0.26.6 adds a Web Shell sidebar activity view for trusted workspace conversations. It shows approval, input, and error states plus unread counts, so you can see what the agent is waiting on without opening each session.

sdk-typescript-v0.1.27 bundles CLI version 0.26.6. Pull the SDK to pick up the matching CLI.

Tool results are no longer reported as "not recorded … Treat as failure and retry" after an abrupt session end, per issue #15799. This matters when a terminal closes (SIGHUP) during parallel tool calls and you resume the session.

**Worth knowing**

Issue #16144: GitHub and GitLab channels created from the Web Shell start open to anyone, while the docs say group access is disabled by default. The report says the form preselects `Open` for the group policy. No fix is linked in the data.

Issue #16171: opening certain Web Shell sessions is very slow because live replay retains full file contents from edit tool results. The issue is closed; the data does not name a fix.

Issue #16169: messages queued while tools run are silently lost when the interactive session gets SIGHUP. The user report says the message is absent from the resumed conversation and from `~/...`. No fix is linked.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*