# AI CLI Tools Community Digest 2026-11-09

> Generated: 2026-11-09 06:06 UTC | Tools covered: 7

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

## Claude Code Skills — 2026-11-09

**notion-spec-to-implementation and quantitative-resume-auditor — turn product specs into Notion tasks; audit resumes on measurable criteria**
The first skill breaks spec pages into implementation plans with tasks, acceptance criteria and progress tracking; the second audits resumes against quantitative measures. Both are proposed in [anthropics/skills PR #1245](https://github.com/anthropics/skills/pull/1245), opened 2026-06-02.
*Open.*

**md2video-audio — compile Markdown documents into MP4 videos with voiceover**
The skill converts Markdown through Marp into slides, then adds human-like narration, and the author describes it as zero-cost. It is proposed in [anthropics/skills PR #1703](https://github.com/anthropics/skills/pull/1703), last updated 2026-09-15.
*Open.*

**document-typography — catch orphan words, widows and numbering misalignment in generated documents**
It targets typographic faults that affect Claude-generated documents: 1–6 words spilling to the next line, section headers stranded at a page bottom, and misaligned numbering. Proposed in [anthropics/skills PR #514](https://github.com/anthropics/skills/pull/514).
*Open.*

**Open requests**

Users want to share skills inside an organization without downloading a `.skill` file and uploading it manually through Settings > Capabilities; a shared library or direct link is requested in [anthropics/skills Issue #228](https://github.com/anthropics/skills/issues/228). A separate report claims community skills are distributed under the `anthropic/` namespace, letting them pass as official ([anthropics/skills Issue #492](https://github.com/anthropics/skills/issues/492)).

---

# Claude Code daily note — 2026-11-09

## What changed

No releases, pull requests, or merged fixes landed in the last 24 hours. The GitHub data shows only issue activity.

## Worth knowing

**User-Agent leaks user email during web searches.** Issue #107757 reports Claude Code sent the reporter's email address to third parties in the `User-Agent` header during web searches without permission ([#107757](https://github.com/anthropics/claude-code/issues/107757)). The reporter argues this must be removed rather than made opt-in/opt-out. Open, 110 comments, 748 👍.

**MCP tool description changes never reach loaded sessions.** After a deferred MCP tool is loaded via ToolSearch, a changed description or input schema never reaches the model again for that conversation — even through `/mcp reconnect`, disable/enable, or `/exit` and `--resume` ([#97369](https://github.com/anthropics/claude-code/issues/97369)). Open, no fix in the data.

**Windows Desktop MCP Apps stopped rendering.** Since Desktop auto-updated to 4.23118.0 on 2026-11-05, MCP Apps widgets from local stdio servers no longer render in Chat; the tool runs and text returns, but the `ui://` resource is never read ([#108122](https://github.com/anthropics/claude-code/issues/108122)). Open regression, no fix listed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

No releases shipped in the last 24h. Three closed PRs changed TUI and Cloud behavior; they are merged/closed, so treat them as recent fixes rather than announced features.

- PR #60335 avoids duplicate agent messages when resuming Cloud threads: replayed history no longer re-renders completed assistant text. Matters when reopening a Cloud conversation in the TUI.
- PR #60327 suppresses stale Cloud stream disconnects after a thread is reopened, so an obsolete reconnect error stops reaching the TUI.
- PR #60270 warns at startup when the active CLI model override is missing from the ChatGPT model list, and suggests checking spelling or picking another model.

**Worth knowing**

- Issue #59347 reports intermittent "Selected model is at capacity" errors on Windows desktop 26.1029.7803.0 and CLI 0.166.0, including simple local commands. No fix in the data.
- Issue #60332 (closed) describes a stale app-server daemon missing an API key for a custom model provider; restarting fixed it.
- Issue #28969 (OPEN, 99 comments, 221 👍) asks for a setting to disable the 60-second auto-resolve for questions.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**
No releases in the last 24h, so nothing shipped. Two changes are open proposals:
- PR #30204 proposes killing detached child shells on SIGTERM/SIGINT/SIGHUP in headless (`-p`) runs. It would stop background `run_shell_command` processes surviving a cancelled run.
- PR #29880 proposes a `gemini models` command and `--list-models` flag with JSON output for scripted model discovery.

**Worth knowing**
- Subagent recovery after MAX_TURNS reports `status: "success"` and termination reason `GOAL` even when no analysis ran — 13 comments (issue #22323, open, P1).
- The generalist agent hangs indefinitely after deferral; 8 users reacted. Workaround: instruct the model not to defer to subagents (issue #21409, open, P1, need-retesting).
- Gemini CLI returns HTTP 400 above 128 tools, with the reporter expecting the agent to limit tools in scope (issue #24246, open, need-information). No fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

No releases or pull requests were published in the last 24 hours, so there are no user-facing changes to report.

**Worth knowing**

- **Task subagents can wedge a session** ([#5219](https://github.com/github/copilot-cli/issues/5219), open, 4 comments): a `task` subagent called with an unknown model id falls back to 128k default caps and fails the turn with "Request exceeds the model's prompt budget". Long-running interactive sessions stay stuck on every delegation.

- **Session event delivery can fail permanently** ([#5100](https://github.com/github/copilot-cli/issues/5100), open, 3 comments): after one 120s host-ack timeout, `session.send` keeps failing and the session is unusable until you resume it.

- **Extensions don't start for `create_session` sessions** ([#5380](https://github.com/github/copilot-cli/issues/5380), open): the session's model has no extension tools, skills or hooks until you first switch to it.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

MCP tools now survive a dropped connection instead of disappearing. PR #62756 ([link](https://github.com/anomalyco/opencode/pull/62756)) keeps a crashed stdio server's tools listed and reconnects on demand, so you won't have to clear and re-add them from `/mcps`. Proposed, still open.

Warming now defaults to the model's `cache.ttl`. PR #62831 ([link](https://github.com/anomalyco/opencode/pull/62831)) stops the 4-minute ping that ignored the model's actual TTL. Proposed, still open.

TLS trust for remote MCP servers: PR #60039 ([link](https://github.com/anomalyco/opencode/pull/60039)) adds an optional per-server `tls` block so a self-signed certificate can be trusted for one server. Proposed, still open.

**Worth knowing**

Free tier limits are the largest thread today: issue #59387 ([link](https://github.com/anomalyco/opencode/issues/59387)) has 333 comments and collects reports of the daily reset never happening. Signing in does not reset the per-IP limit and returns the same error (PR #62828).

Windows self-update to 2.2.6 left a 229-byte `opencode.exe` that won't start (#62696). Marked pending close.

Plan mode reminder persists after switching agents on v2.2.x, blocking implementation work (#62797, 13 comments).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases or merged items landed in the last 24h. Two proposed changes sit in pull requests:

- PR #11938 (closed) proposes sending audio and video to Gemini by reference: Pi uploads a local file to the Files API, waits up to five minutes for Google to process it, then sends `fileData` instead of inline bytes. This would let an agent work with media files it currently cannot attach.
- PR #11857 (closed) proposes prompt-cache warming in p2. The author measured 789 full prompt rewrites between Oct 12 and Nov 5, costing about $1,430, 26% of p2's spend, because the 5-minute cache is never refreshed.

**Worth knowing**

- Issue #10287 (open, 8 comments): on Pi 0.99.2, a retryable network error made `getContextUsage()` jump from 42,707 tokens to 330,081. No fix in the data.
- Issue #10162 (open, 8 comments): the author reports that too many input images stop the agent task, which breaks long unattended runs. No fix in the data.
- Issue #11238 (open, 3 comments): calling `pi.sendUserMessage(...)` from an extension command in `-p` print mode ends the turn with "turn_end could not resolve the persisted assistant entry ID". No fix in the data.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

The TypeScript SDK v0.1.29 shipped after the original release workflow failed at the release-branch push step; npm publish had already succeeded, so the version was backfilled ([#16490](https://github.com/QwenLM/qwen-code/issues/16490)). It bundles CLI 0.26.9, built from the same branch and ref. If you pin the SDK, 0.1.29 is now the installable version.

Proposed: PR [#16716](https://github.com/QwenLM/qwen-code/pull/16716) would include time to first token in the output speed (TPS) shown by `/stats` and Web Shell. Today TPS divides output tokens by the window from first to last visible chunk, leaving out the wait before the first token ([#16714](https://github.com/QwenLM/qwen-code/issues/16714)).

**Worth knowing**

`main`'s Java lane fails to compile from duplicate case labels in `SurfaceAdmissionAcceptanceTest`, so no Java test runs and the Managed Agent gate checks fail ([#16712](https://github.com/QwenLM/qwen-code/issues/16712)). PR [#16719](https://github.com/QwenLM/qwen-code/pull/16719) proposes removing the duplicates.

`FileChangedWatcher` can permanently miss a file written into a newly created subdirectory of a watched root, with no `FileChanged` notification ([#16708](https://github.com/QwenLM/qwen-code/issues/16708)). No fix in the data.

`/branch` reports branching is unavailable while a response or tool call is in progress even after all tasks finish, on 0.27.0 ([#16700](https://github.com/QwenLM/qwen-code/issues/16700)). No fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*