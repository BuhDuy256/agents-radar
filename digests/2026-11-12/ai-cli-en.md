# AI CLI Tools Community Digest 2026-11-12

> Generated: 2026-11-12 07:00 UTC | Tools covered: 7

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

**scnet-hpc — runs jobs on SCNet HPC clusters over profile-based SSH and Slurm**
The skill carries connection, partition, memory, module and accelerator guidance per profile, and generates Slurm jobs. It is open as anthropics/skills PR #1615.

**md2video-audio — turns Markdown documents into narrated MP4 videos**
The workflow converts Markdown with Marp into slides and adds realistic voiceovers at no cost. It is open as anthropics/skills PR #1703.

**proofcore-contract-auditor — statically audits Solidity and Rust smart contracts**
It anchors cryptographic audit proofs on the TON Blockchain through ProofCore's zero-storage Merkle protocol. It is open as anthropics/skills PR #1771.

**Open requests**

Issue #228 asks for organization-wide skill sharing in Claude.ai: today a user must download the .skill file, send it over Slack or Teams, and have each colleague upload it manually under Settings > Capabilities.

---

**What changed**

No releases or pull requests landed in the last 24h, so nothing shipped that alters how the tool is used. Version numbers below come from open reports, not new builds.

**Worth knowing**

- Issue #109176 reports a long VS Code session on Windows 11 with Opus 5.5 filled the system drive to about 67 MB free via parallel subagents, then saturated the CPU. The author says Claude took further unauthorized actions. Open, no fix in the data.
- Issue #93782 reports a regression in 2.1.269: dictation-tool paste (clipboard plus simulated Ctrl+V) no longer inserts text in the VS Code integrated terminal under WSL2. Version 2.1.268 worked. Open, 26 comments.
- Issue #87971 reports Claude using bash tools for reads, writes and edits in Auto Mode on Windows and VS Code. Open, 101 reactions.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

Codex 0.167.2 sends tool updates incrementally by default on Google Cloud Vertex AI. This reduces payload size on long tool runs; set `incremental_tools_legacy_gcp = false` under `[features]` in `config.toml` to opt out ([#60617](https://github.com/openai/codex/pull/60617), [#60848](https://github.com/openai/codex/pull/60848)).

Alpha builds 0.169.0-alpha.11.x and 0.170.0-alpha.1/2 shipped with no release notes, so no user-facing changes are stated in the data.

A proposed PR would reconnect idle Cloud conversations automatically after a transient stream loss and hold queued input until the reply stream is usable. It is closed, not a released feature ([#60969](https://github.com/openai/codex/pull/60969)).

**Worth knowing**

MCP form elicitations are auto-declined in CLI 0.167.0 and desktop, even with `approval_policy = "on-request"`, blocking MCP prompts that need input ([#60158](https://github.com/openai/codex/issues/60158)). 3 comments, no fix stated.

Codex CLI 0.167.2 keeps stale prompt and user-message backgrounds after light/dark switches on macOS, making sessions hard to read ([#61054](https://github.com/openai/codex/issues/61054)). No fix stated.

`thread/fork` ignores supplied `developerInstructions` in the next model request, including via the Python SDK ([#61046](https://github.com/openai/codex/issues/61046)). No fix stated.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## What changed

No releases landed in the last 24 hours. Two fixes are proposed in open PRs.

**Fix: output token limits reported in model lists** — PR [#30253](https://github.com/google-gemini/gemini-cli/pull/30253) (open) makes `gemini models`, `gemini models list`, and `--list-models` stop printing a hardcoded 8,192 output token limit. Known Gemini 2.5 and Gemini 3 models would report 65,536; unknown models would omit the field. Matters when you size output budgets from the CLI rather than docs.

**Fix: PowerShell parsing blocks the event loop** — PR [#30247](https://github.com/google-gemini/gemini-cli/pull/30247) (open) moves PowerShell command parsing off the main thread during shell policy checks on Windows. Currently the synchronous parse freezes the Thinking spinner before the Shell panel appears.

## Worth knowing

**Subagent turn-limit failures look like success** — Issue [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (open, p1, 13 comments) reports `codebase_investigator` returning `status: "success"` and `Termination Reason: "GOAL"` after hitting MAX_TURNS with no analysis done. Flagged `status/need-retesting`; no fix in the data.

**Generalist agent hangs indefinitely** — Issue [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (open, p1, 8 👍) reports `gemini-cli` hanging forever when it defers to the generalist agent, even for folder creation. The reporter says instructing the model not to defer to subagents avoids it. No fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.110-3 fixes Microsoft Entra sign-in popups: error dialogs no longer appear when an organization account is available. Matters for org users signing in to the CLI.
- v1.0.110-2 labels partial responses and reasoning from interrupted or failed attempts as incomplete, keeping their text visible instead of discarding it.
- v1.0.110-2 stops the Node stack trace crash when you launch `copilot` from a deleted directory; the CLI now says the directory no longer exists and how to recover.

**Worth knowing**

- Issue #5053 (open, 4 comments): since 1.0.89, completed ACP sessions stop indexing conversation history and usage in `session-store.db`. Affects ACP users; no fix in the data.
- Issue #2955 (open, 4 comments): `/allow-all` still shows a permission dialog for every bash/shell tool call. Reported since 1.0.55-era; no fix in the data.
- Issue #5429 (open, filed 2026-11-12): a natural-language prompt starting with an API path such as `/chat-sessions` is parsed as a slash command and errors out. No fix in the data.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

- `@opencode/pty@0.5.2` (process-daemon v0.5.2, protocol 8) published to npm from `packages/process-daemon`. Terminal sessions now speak protocol 8, so mixed client/daemon versions can mismatch.
- PR #63458 proposes isolating v1 deploy and release jobs for the CLI signing pipeline; the web app build moves out of the deploy job. Desktop signing is unfinished, so nothing ships yet.
- PR #63469 proposes prompting before accepting an MCP elicitation form with no fields, instead of silently answering `accept`.

**Worth knowing**

- Issue #63357: the TUI kills the shared background service after 45 seconds of SSE silence, aborting sessions and injecting "The server restarted while you were working". Four comments; no fix in the data.
- Issue #55076: `opencode run --standalone` sessions get resumed by the background service after the run is killed, without its permissions or step limit — one report reached 1,660 steps and about $24.
- Issue #2242 (open since August 2025, 113 comments): no built-in way to sandbox agent terminal commands to the current directory.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24h. Three fixes landed for problems users hit: PR [#12058](https://github.com/earendil-works/pi/pull/12058) keeps bash output when the retained tail is one clipped line, so short-first-line commands no longer come back empty (issue [#12062](https://github.com/earendil-works/pi/issues/12062)); PR [#12054](https://github.com/earendil-works/pi/pull/12054) stops resumed sessions from dropping MCP tools that `tool_search` had loaded (issue [#11996](https://github.com/earendil-works/pi/issues/11996)); PR [#12052](https://github.com/earendil-works/pi/pull/12052) converts OSC 8 hyperlinks in `/export` HTML so links render as links instead of escape text (issue [#12003](https://github.com/earendil-works/pi/issues/12003)).

**Worth knowing**

Issue [#10024](https://github.com/earendil-works/pi/issues/10024) (open, 6 comments): changing the selected tool set mid-run moves the head of the system prompt and re-bills the conversation from that point.

Issue [#10162](https://github.com/earendil-works/pi/issues/10162) (open, 9 comments): too many input images stop the agent task, which matters for long unattended runs.

Issue [#12076](https://github.com/earendil-works/pi/issues/12076) (closed, 2 comments): on Pi 1.5.2 with vLLM, Pi ended a tool loop silently instead of compacting near the context limit.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

No releases in the last 24 hours.

Channel delivery now supports outbound platform webhooks. PR #16802 added the backend and a DingTalk adapter, and PR #16804 added the shared Web Shell flow, closing issue #16751 on 2026-11-12. A Feishu custom-bot webhook is proposed in issue #16997 for the same Channel system.

Session PR binding is in development. PR #16877 adds a `/pr <number | url>` command for TUI, headless CLI and daemon sessions, plus a bind-PR dialog in the Web Shell, for when automatic binding misses the PR.

**Worth knowing**

Issue #15486 (P1) reports that after automatic compaction, the next request's size estimate counts a pending tool result twice and adds a 20K pad, so the turn is stopped or sent with `max_tokens: 1`. It remains open.

Issue #16915 reports a task that reports two errors and cannot continue, including "the connection to the model service was interrupted". It is marked `status/need-information`, so no cause is confirmed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*