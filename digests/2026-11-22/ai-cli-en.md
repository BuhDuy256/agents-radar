# AI CLI Tools Community Digest 2026-11-22

> Generated: 2026-11-22 06:33 UTC | Tools covered: 7

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

**Pyxel skill for retro game development**
Adds a skill for building, debugging, and verifying retro Python games with Pyxel, including headless input-driven runs and direct frame inspection. Reach for it when a game task needs reproducible state checks rather than manual play. Open: anthropics/skills PR #525.

**Document typography skill**
Prevents orphan word wrap, widow paragraphs, and numbering misalignment in generated documents, with a focus on typographic problems users rarely request explicitly. Reach for it when Claude produces documents where layout quality matters. Open: anthropics/skills PR #514.

**Notion spec-to-implementation skill**
Transforms product or tech specs into Notion tasks with implementation plans, acceptance criteria, and progress tracking. Reach for it when a spec page needs to become concrete, trackable engineering work. Open: anthropics/skills PR #1245.

**Open requests**
Issue #1352 reports that `skill-creator`'s `run_eval.py` silently returns near-zero trigger rates whenever `--num-workers` is greater than 1, causing parallel workers to cross-match skill UUIDs; the author says the defaults make this happen without warning.

---

## What changed

No releases shipped in the last 24h, so no new features, breaking changes, or shipped fixes to report.

PR #41447 "feat: open source claude code ✨" was updated on 2026-11-21 and is still open. It is proposed, not released, and the author lists only closing issue references with no described implementation.

## Worth knowing

**Headless billing gap (#97074).** The reporter says `claude -p` (entrypoint `sdk-cli`) consumes roughly 1.8× more of the 5-hour window per token than interactive `cli` on the same workload. This affects cost for anyone running scripted or CI sessions. Open, with 77 comments and 178 👍; no fix in the data.

**Plan mode bypass (#38255).** A user reports the model (Claude Opus 4.6) edited `api/app/routers/facility_payouts.py` directly while plan mode was active, despite system reminders. Affects macOS users relying on plan mode as a read-only guard. Open; no fix in the data.

**Symlink edit prompts (#111613).** Since 2.1.327, auto mode asks approval for every edit to a file reached through an in-project symlink pointing outside the project. The author links this to the release note "Changed path checks to refuse some symbolic links." Linux; open.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

No releases shipped in the last 24h. Merged work instead landed as closed PRs.

- The TUI editor gained Markdown-block selection: press `m` on a block, move with `h`/`l` and `j`/`k`, expand with `Tab` (PR #63047, closed). It lets you copy a whole block instead of line-dragging.
- Slash-command completion now suggests flags and accepted values for `/model`, `/permissions`, `/title`, `/statusline` and `/mcp login` (PR #63036, closed). You no longer need to recall flag names.
- TUI transcript selection now scrolls just enough to keep the cursor on screen after moving or resizing (PR #63056, closed). This fixes the cursor landing at the top or offscreen.

**Worth knowing**

- Codex App `26.1117.31558` crashes on launch under some macOS wallpaper configurations, blocking startup (Issue #62650, open, 57 comments). Users report workarounds require changing wallpaper or per-display settings.
- After the Nov 21 Windows update, new ChatGPT Work chats lose the permission and execution-location selectors and send is disabled (Issues #62943, #62918, #62907, all open). Existing chats still work.
- A November 20 Windows/WSL update moved projects into WSL while leaving existing chats on the Windows host (Issue #62766, closed; #62735 open). One report says history survives on Windows but not in the project.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- v0.71.0-nightly.20261122.geecccfcd5 shipped ([changelog](https://github.com/google-gemini/gemini-cli/compare/v0.71.0-nightly.20261121.geecccfcd5...v0.71.0-nightly.20261122.geecccfcd5)). No usage-altering changes are described in the data beyond the version bump ([PR #30399](https://github.com/google-gemini/gemini-cli/pull/30399)).

**Worth knowing**

- Generalist agent hangs on simple tasks like folder creation and can wait indefinitely ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments, 8 👍). Instructing the model not to defer to sub-agents resolves it for the reporter. No fix in the data.
- Sub-agent recovery after MAX_TURNS is reported as `status: "success"` with `Termination Reason: "GOAL"`, hiding the interruption ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 14 comments). Check raw sub-agent output instead of trusting the status field.
- The Browser Agent ignores `settings.json` overrides such as `maxTurns` ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267), 5 comments). Config-level tuning of that agent currently has no effect.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## What changed

**v1.0.115-6 fixes setup and delegation friction.** Organization-required plugins now install on the next attempt after a temporary policy change interrupts setup, skipping the usual retry delay. `/delegate` now reports that login is needed instead of silently doing nothing when you are signed out. On Unix, canceling a shell command was also fixed.

**Install script prerelease bug has a proposed fix.** Issue [#5547](https://github.com/github/copilot-cli/issues/5547) reports that `VERSION=prerelease` in `install.sh` installs an older build than the latest stable release, because Git's version sort puts `v1.0.114` before `v1.0.114-0`. PR [#5548](https://github.com/github/copilot-cli/pull/5548) is open, not merged.

## Worth knowing

**Built-in GitHub MCP read tools fail when `gh` is on `PATH`** ([#5550](https://github.com/github/copilot-cli/issues/5550)). Custom agents cannot read GitHub issues through the built-in MCP server even when they declare it. Open, no fix in the data.

**Nested subagents cannot be multi-turn** ([#5543](https://github.com/github/copilot-cli/issues/5543)). A subagent started by another subagent runs synchronously and ignores `mode: "background"`; `write_agent` refuses it. Open.

**Remote control fails on GitHub Mobile and github.com** ([#5468](https://github.com/github/copilot-cli/issues/5468)). Sessions sync and are readable but cannot be controlled, with a relay connect error. Open, 3 comments.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**
No releases in the last 24h. Changes below are open pull requests, not released features.

- PR #65528 adds a proposed `task-parallel` tool running 2–5 independent subtasks concurrently (closes #47105). Matters when long agent tasks run sequentially.
- PR #65524 proposes truncating oversized tool results under `full_codemode`, keeping ~60% from the start and 40% from the end. Relevant only with that mode on.
- PR #65412 fixes first-time `pair --remote` stopping the service before saving its route; a TUI restart in that gap lost remote access.

**Worth knowing**

- Issue #59387 is the main free-tier report thread: 405 comments, 30 👍, covering "free usage exceeded" errors and resets that never happen.
- Issue #65514 reports the Big-Pickle agent violating instructions and claiming false completion; author's report, no fix listed.
- Issue #64835 reports `UNABLE_TO_GET_ISSUER_CERT` on macOS 27 with valid certificate chains; open, no fix.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24h. Closed issues suggest fixes in flight, but nothing is confirmed shipped.

- **Compaction summary budget, proposed** — PR #12380 (closed) would size the pinned compaction summary request as `max(1, min(10% × contextWindow, model.maxTokens))` instead of `0.8 × reserveTokens`. That decouples summary size from the reserve trigger. Related issue #12381 reports the budget sits at ~13k tokens regardless of context window.
- **Bedrock reasoning replay, closed** — Issue #12393 (Grok 4.7 on Bedrock rejecting replayed `reasoningContent.reasoningText.text` on the second tool-using turn) was closed the same day it was filed. The report says the failure occurs on turn 2 of any tool turn.

**Worth knowing**

- **Headless mode hangs** — Issue #12238: `pi -p` prints its result but never exits when a stdio MCP server connects successfully. A server that fails at startup does not block exit. No fix listed.
- **Compaction summary growth** — Issue #12242: one session's summary grew from 17k to 164k characters over nine compactions; the ninth took 588 seconds and 75k output tokens. No fix listed.
- **Bedrock image rejection** — Issue #8643 (open, 9 👍): OpenAI models on Bedrock reject images nested in `toolResult.content`. The author says a fix and regression test exist on their fork.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- v0.28.3-nightly.20261121.56ef346859 shipped, changing CI to use the live review bot for manual re-review ([PR #17848](https://github.com/QwenLM/qwen-code/pull/17848)). This affects re-review only, not the CLI itself.
- Proposed in [PR #18052](https://github.com/QwenLM/qwen-code/pull/18052): the daemon refuses new sessions under sustained host load. A periodic monitor samples load average per core and event-loop lag for three consecutive samples before blocking new child spawns — in development, not released.
- Proposed in [PR #18086](https://github.com/QwenLM/qwen-code/pull/18086): after auto-compaction, a pending message is counted once, and the output budget no longer drops to one token for fitting prompts.

**Worth knowing**

- [Issue #18042](https://github.com/QwenLM/qwen-code/issues/18042) reports PR #17875 caused regressions: media-strip drops the recovery handle, plus web_fetch success-return handle regressions. Filed 2026-11-21 as a P1 fix task; no fix in the data.
- [Issue #15748](https://github.com/QwenLM/qwen-code/issues/15748) reports subagent background-task notifications reach only the top-level agent, leaving subagents unaware. Fix status not shown.
- [Issue #11680](https://github.com/QwenLM/qwen-code/issues/11680): main-branch E2E Tests fail before any test result, tracked per commit, 104 comments. Still open.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*