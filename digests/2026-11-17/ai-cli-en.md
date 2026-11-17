# AI CLI Tools Community Digest 2026-11-17

> Generated: 2026-11-17 07:45 UTC | Tools covered: 7

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

## Community skills seeking a home

**notion-spec-to-implementation — turns specs into Notion tasks — open**
Transforms product or tech specs into concrete Notion tasks with implementation plans, acceptance criteria, and progress tracking. Reach for it when a written spec needs to become work an agent can pick up. Proposed together with a second skill, `quantitative-resume-auditor`, in anthropics/skills PR #1245 (open).

**md2video-audio — compiles Markdown into narrated video — open**
A zero-cost skill that converts Markdown documents into MP4 videos: Marp turns the Markdown into slides, then a voiceover is added. Use it when a written document should ship as a presentation video without paid tooling. Proposed in anthropics/skills PR #1703 (open).

**pyxel — retro game development in Python — open**
Guides creating, debugging, and verifying retro games built with the Pyxel engine, including headless input-driven runs and direct frame inspection. Reach for it when building or testing a small pixel-art game. Proposed in anthropics/skills PR #525 (open).

## Open requests

Issue #228 asks for org-wide skill sharing in Claude.ai: today a colleague must be sent the `.skill` file over Slack or Teams and then upload it manually under Settings > Capabilities. The requester wants a shared skill library or a direct sharing link.

---

**What changed**

- **v2.1.326 enables Code Mode with agent teams.** Enabling Code Mode while teams are active now starts team sessions in Code Mode → existing team workflows shift mode without an extra step → it matters if you already turned Code Mode on. ([releases](https://github.com/anthropics/claude-code/releases))
- **v2.1.326 warns on malformed tool-list entries.** A startup warning fires when an `--allowedTools`, `--disallowedTools` or `--tools` value doesn't look like a complete entry → misconfigured tool flags surface at launch instead of failing silently → it matters when scripting CLI invocations. ([releases](https://github.com/anthropics/claude-code/releases))
- **A 32-bit PowerShell MDM fix is proposed.** PR [#78049](https://github.com/anthropics/claude-code/pull/78049) (closed) addresses `Set-ClaudeCodePolicy.ps1` writing to Program Files (x86) when run in a 32-bit host → correct policy path under Intune without the 64-bit host setting → proposed, not confirmed shipped.

**Worth knowing**

- Issue [#110589](https://github.com/anthropics/claude-code/issues/110589) (1 comment) reports that since 2.1.326, `run_in_background` dev servers keep a `working` child record for the whole session. Linux, TUI, flagged regression. No fix in the data.
- Issue [#75900](https://github.com/anthropics/claude-code/issues/75900) (9 comments) reports assistant text between tool calls is not rendered, not in ctrl-o, and not saved. macOS. Open, no fix in the data.
- Issue [#83756](https://github.com/anthropics/claude-code/issues/83756) (7 comments) reports large MCP `ToolSearch` batches invalidate the whole conversation cache. Open, no fix in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

Alpha releases keep shipping for both 0.170 and 0.171 lines: `rust-v0.171.0-alpha.11`, `rust-v0.171.0-alpha.10`, `.9`, `.8`, and `rust-v0.170.0-alpha.4.1`. Alpha tags mean bleeding-edge builds, so pin a version if you need stability.

Two TUI features are proposed in closed PRs: an undo/redo history for the non-Vim composer (`composer.undo`/`composer.redo`, PR #61954) and a mouse scroll-speed setting saved as `tui.mouse_scroll_speed` (PR #61976). Both are in development, not released.

A proposed Cloud environment picker (`Ctrl+X E`, PR #61974) would let new TUI conversations target a saved personal or workspace environment. Also in development.

**Worth knowing**

Windows Computer Use keeps the capture indicator and yellow display border open after a screenshot-producing turn finishes (issue #57101, 44 comments).

On Windows, repeated image inputs with zstd compression return HTTP 400 while the same inputs succeed uncompressed (issue #60594, 11 comments). No fix is listed.

Managed app-server daemon releases accumulate: `~/.codex/packages/app-server-daemon/releases` reached 2.8 GB (issue #52067).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## What changed

Nothing shipped in the last 24h — no releases, no merged PRs.

Several fixes are proposed and still open. PR #30207 plans to clear `bundle/` before esbuild, removing stale chunks that pushed the `@google/gemini-cli` tarball to 25.2 MB and caused nightly `413 Request Entity Too Large` failures since 2026-11-05 ([PR #30207](https://github.com/google-gemini/gemini-cli/pull/30207)). PR #30268 would let active YOLO mode (`--approval-mode=yolo`) skip shell taint and build-file confirmation prompts, which currently hard-deny edits with `POLICY_VIOLATION` ([PR #30268](https://github.com/google-gemini/gemini-cli/pull/30268)). PR #30289 would make `gemini extensions link` resolve and disclose the real filesystem target via `fs.realpathSync`, and default the non-interactive consent prompt to no ([PR #30289](https://github.com/google-gemini/gemini-cli/pull/30289)).

## Worth knowing

`gemini mcp add` corrupts tool filtering: `--include-tools`/`--exclude-tools` keep a comma-separated list as one array element, inverting the filter, and `-e KEY=value` truncates values at the second `=` while dropping empty ones — both exit 0 ([#30330](https://github.com/google-gemini/gemini-cli/issues/30330), [#30329](https://github.com/google-gemini/gemini-cli/issues/30329)). No fix in the data.

The generalist agent hangs indefinitely on simple tasks such as folder creation; instructing the model not to defer to subagents avoids it (8 comments, 8 👍) ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)).

Subagent MAX_TURNS interruptions are reported as `status: "success"` with `Termination Reason: "GOAL"`, hiding the truncation (13 comments) ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

Administrators can now disable built-in Browser Use via the managed setting `features.browserUse`, including in sessions already running. This lets orgs turn the feature off without restarting sessions. Shipped in v1.0.113-1.

v1.0.113-0 is a fixes-and-changes release; the data lists no specifics.

Issue #4998 (closed, 12 comments) covered sessions becoming unusable after a macOS update/reboot, caused by a stale `.mcp-writer.binding` filesystem device ID. Its closure indicates a fix landed.

**Worth knowing**

Issue #5220 (open, 11 👍, 3 comments): Claude models appear to use Anthropic's 5-minute prompt cache TTL, so idle gaps over 5 minutes re-send the whole conversation. No fix in the data.

Issue #5207 (open, 1 👍): on Windows, with `--sandbox` enabled and the working directory on a non-system drive, shell commands cannot list, stat, or change into directories on that drive.

Issue #5478 (open): Cortex XDR kills the launching shell with `parent_process_spoofing` when Copilot CLI spawns `git` on Windows. No fix in the data.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

OpenCode 1 can now upgrade to 2.0 from the desktop app, announced in v1.19.6. OpenCode 2 downloads in the background and installs only on your choice: Restart to upgrade, Upgrade on quit, or Later. Sessions, projects and settings are kept, but OpenCode 1 plugins need an update.

`@opencode/pty@0.6.0` shipped as process-daemon v0.6.0 (protocol 9), published from `packages/process-daemon`. This is the layer behind the zombie-process reports below.

Two PTY zombie-process issues on Linux 2.3.0 are closed: #63817 and #63976, both marked reproduced. Users reported every finished shell command staying `<defunct>` under `opencode-pty daemon` since 2.2.7 → 2.3.0.

**Worth knowing**

Free-tier quota exhaustion stays invisible until failure. Issue #59387 (386 comments, 28 👍) collects reports including "free usage exceeded" messages and resets that never happen. #64334, closed, notes the first symptom is a new session failing with HTTP 429 `FreeUsageLimitError`.

Issue #64355 (open): if a session's working directory is deleted outside opencode, every subsequent `shell` call fails with `Working directory does not exist`, even for absolute-path commands.

Issue #64304 (open): four free models return HTTP 400 when training consent is disabled, despite documented zero retention.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

Seven fixes from petrroll's PR stack merged on 2026-11-16, covering session lifecycle, JSON print mode, and TUI output. In all cases the agent now emits the events and warnings it previously swallowed, so extensions and `--mode json` scripts see `session_start`, model-fallback messages, and runtime diagnostics that were dropped before. These matter if you build or debug extensions.

`pi -p` (headless) hangs on exit whenever any extension is loaded, even with zero MCP servers (#12241, closed as untriaged). On 1.5.2 the hang is broader than the older MCP-only case.

**Worth knowing**

Large transcripts re-render the whole transcript on every frame and resize, saturating one core on a 2-core Windows machine (#9549, open, 18 comments). PR #11968 fixes the fullscreen scroll path only; resize and the regular-mode spinner cost are still open.

A code-mode script fails before running if it declares a top-level variable named `tools` (#11226, open).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- Nightly release [v0.27.4-nightly.20261116.eb3a599ef3](https://github.com/QwenLM/qwen-code/releases) adds a workspace filter to the Web Shell sidebar ([PR #17244](https://github.com/QwenLM/qwen-code/pull/17244)) and a DingTalk adapter for managed agents. The sidebar filter matters when you run many workspaces and want to narrow the session list.
- Proposed in [PR #17403](https://github.com/QwenLM/qwen-code/pull/17403): a send-only generic webhook Channel that POSTs `{"version": 1, "text": "..."}` to a configured endpoint, usable for Notify, explicit prompt delivery and scheduled-task results.
- Proposed in [PR #17513](https://github.com/QwenLM/qwen-code/pull/17513): first-class `qwen4-max` support across all four channels, with a native effort ladder, cache TTL and image detail.

**Worth knowing**

- [Issue #15425](https://github.com/QwenLM/qwen-code/issues/15425) reports that disabling Workspace Shell does not stop automations on Sessions that still hold a Shell profile; the README says fresh Turns should be refused with `409 workspace_unavailable`. Open, 3 comments.
- [Issue #13078](https://github.com/QwenLM/qwen-code/issues/13078) tracks a failed daily dependency CVE audit; 54 comments. Open.
- [Issue #17099](https://github.com/QwenLM/qwen-code/issues/17099) tracks 29 Snyk findings across 43 dependency paths via `@qwen-code/web-shell@0.26.3` and `@qwen-code/sdk@0.1.25`; 15 comments. Open.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*