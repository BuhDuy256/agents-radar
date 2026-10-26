# AI CLI Tools Community Digest 2026-10-26

> Generated: 2026-10-26 04:34 UTC | Tools covered: 7

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
Compiles Markdown documents into MP4 videos using Marp for slides and a human-like voiceover, at zero cost. Reach for it when a written document needs to become a video. Open, per anthropics/skills PR #1703.

**document-typography — typographic quality control for generated documents**
Catches orphan word wrap (1–6 words spilling to the next line), widow paragraphs and numbering misalignment in documents Claude generates. Reach for it when output will be read by people. Open, per anthropics/skills PR #514.

**proofcore-contract-auditor — static analysis of smart contracts**
Performs automated static analysis of Solidity and Rust smart contracts and anchors audit proofs to the TON Blockchain via a Merkle protocol. Open, per anthropics/skills PR #1771.

**Open requests**

Users cannot share skills inside a Claude.ai organization without downloading the .skill file and sending it manually; they ask for a shared library or direct sharing link. Reported in anthropics/skills Issue #228.

---

**What changed**

No releases and no merged pull requests in the last 24 hours. The only PR updated is closed: #29757, a docs change to the skill-development guide clarifying that skill names should match the kebab-case directory. Nothing in this data alters how the tool is used today.

**Worth knowing**

- Bash tool shell config is the most-discussed open item: Issue #7490 (40 comments, 131 👍) asks to let users set which shell the Bash tool uses or inherit the initial shell. Open, no fix in data.
- TaskStop does not kill the process tree, per Issue #85200. The author reports an orphaned `rm -rf /c` kept deleting data for 20 minutes after the stop. Open.
- MCP tool calls with an empty-string argument produce invalid JSON (`"key": ,`), per Issue #104954, which notes #89313 still reproduces. Open; validator rejects the call.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

No releases in the last 24 hours, and no pull requests were updated, so nothing new shipped.

Issue #28969 asks for a setting to disable the 60-second auto-resolve for questions in `codex-cli 0.141.0`; it stays open with 98 comments and 217 👍. Until such a setting exists, the timer is fixed.

Issue #56264 reports that resuming an existing Windows desktop chat fails after update because the sandbox helper's `process.env` lacks `SYSTEMROOT`. The author says failure happens before `AGENTS.md` loads. No fix is in the data.

**Worth knowing**

VS Code extension versions `26.1021.22027` and pre-release `26.51021.22027` time out over Remote-SSH; issue #56736 reports that rolling back to `26.1007.21434` restores the UI. Extension UI also fails to start on Linux in #56992.

On Windows, #57013 reports `codex-cli 0.164.0` remote control returning HTTP 409 "Remote app server already online."

Desktop long responses run slow: #56861 measured 496 requests averaging 41.8s, P95 143.6s, worst 636.8s on app `26.1021.31345`. This is a user report, not a confirmed cause.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24h, so nothing is shipped yet. Several fixes are in development:

- **Path error messages** (PR #29878): `list_directory` and `read_file` currently report "Path not in workspace" even when a blocked segment is inside a workspace directory. The proposed fix names the blocked segment instead. Matters when debugging why a valid-looking path was rejected.
- **Relative paths in IDE mode** (PR #29838): `WriteFileTool`, `EditTool` and `ReadFileTool` resolve relative paths against the initial target directory. The proposed change uses the active IDE workspace root instead.
- **Remote agent session isolation** (PR #29946): conversations could leak across parent sessions and across same-named agents at different endpoints. The proposed fix scopes identifiers by parent session plus endpoint.

**Worth knowing**

- Subagents report `status: "success"` with `Termination Reason: "GOAL"` even after hitting MAX_TURNS and doing no analysis (Issue #22323, 13 comments, 2 👍). A long-running `codebase_investigator` run can look finished when it was cut off. No fix in the data.
- The generalist agent hangs indefinitely on simple tasks like folder creation (Issue #21409, 8 comments, 8 👍). Instructing the model not to defer to subagents works around it. No fix in the data.
- The browser subagent fails on Wayland (Issue #21983, 4 comments, 1 👍) and ignores `settings.json` overrides such as `maxTurns` (Issue #22267). Both are open without a fix.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

No releases shipped in the last 24 hours.

Open feature requests propose new behavior, not shipped features:
- Issue #3265 asks for a `/pause` or `/stop` slash command that interrupts an agent after it finishes reasoning, instead of cancelling mid-reasoning (6 👍).
- Issue #4233 asks `--acp` mode to emit the ACP `usage_update` event so ACP clients like Zed can show context-window and AI-credit usage, matching the interactive statusline.

Two closed issues: #1935 (`az rest --url` wrongly flagged as directory access) and #4493 (`/restart` failing in sessions started with `-w`).

**Worth knowing**

- Issue #5254: on Copilot CLI 1.0.103, a resumed long session on a 32 GiB Apple Silicon Mac reached 37.3 GiB physical footprint after ~6h19m, causing unresponsiveness. No fix in the data.
- Issue #5255: on Windows, an elevated session creating `%USERPROFILE%\.copilot\.mcp-writer.lock` blocks later non-elevated sessions from starting MCP servers (`os_error=5`). No fix in the data.
- Issue #4802: the author reports a Copilot Pro (annual, request-based PRU) quota wipeout, which they link to enabling Assisted Permissions. Unconfirmed.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases shipped in the last 24h. A prompt-cache TTL setting is proposed in PR #59157: requests currently use the provider's default lifetime (5 minutes on Anthropic), so a slow subagent or tool forces a full context rewrite on the next step. The PR makes that TTL configurable.

**Worth knowing**

- Free-model usage limits dominate today's issue list. #15585 (57 comments, 17 👍) and newer reports (#58859, #58902, #59140) describe the same shape: "Free usage exceeded, subscribe to Go" with a retry countdown of hours (one user cites ~15 hours), and access not restored when the timer expires. These are user reports; no fix appears in the data.
- Two server processes sharing one `opencode.db` allocate `session_message.seq` from independent counters, so `UNIQUE(seq)` collisions fail sessions (#53146, open). Affects a long-lived `opencode serve --service` plus a TUI-embedded server from `opencode -c`.
- `opencode run "<prompt>"` hangs with no output unless stdin is already at EOF (#52938, closed), breaking non-interactive and scripted use.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

`pi --export <session.jsonl>` will include the system prompt, matching interactive `/export`. PR #10718 proposes reading the prompt recorded on the session's current branch; it is open, not released. Matters when exporting sessions for review or sharing. ([PR #10718](https://github.com/earendil-works/pi/pull/10718))

Model references like `--model "llama-server=http://host:10800/<model-id>"` now resolve when the provider id contains a `/`. PR #11393 fixes `splitProviderPrefix()` splitting at the first slash; the PR is closed. Matters for URL-derived provider ids such as `pi-llama-cpp`. ([PR #11393](https://github.com/earendil-works/pi/pull/11393), [#11394](https://github.com/earendil-works/pi/issues/11394))

`pi.exec()` will decode stdout and stderr with separate StringDecoder instances, so UTF-8 characters split across chunks survive. PR #11330 fixes "你好" becoming "���好"; closed, not in a release here. ([PR #11330](https://github.com/earendil-works/pi/pull/11330))

**Worth knowing**

Anthropic requests fail with `tool_reference_unresolved` after an extension reload drops an initially registered tool; reported as prio:p0 with 3 comments, no fix in the data. ([#11376](https://github.com/earendil-works/pi/issues/11376))

Session JSONL files are written at the umask default, 0644 under 022, so they are world-readable on shared machines; the report is closed, no fix shown. ([#11417](https://github.com/earendil-works/pi/issues/11417))

`pi -e npm:<pkg>` reuses the first download and never refetches; open with 2 comments. ([#11375](https://github.com/earendil-works/pi/issues/11375))

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

v0.26.1-nightly.20261025.8e28d5380c adds session permission rules and Auto approval to the managed agent ([PR #15448](https://github.com/QwenLM/qwen-code/pull/15448)). This lets managed sessions pre-approve actions instead of prompting per call; it matters if you run managed or headless sessions. The same release hardens the serve token in the CLI.

**Worth knowing**

- Resumed sessions send the model tool output a blocked `UserPromptSubmit` hook was meant to stop ([#15595](https://github.com/QwenLM/qwen-code/issues/15595)). Live and resumed sessions disagree on what the model saw, affecting hook users who resume sessions. No fix in the data.
- Resumed sessions also follow seconds after a hook blocks a prompt, per [#15595](https://github.com/QwenLM/qwen-code/issues/15595).
- Headless `-p` refuses read-only commands containing `2>&1`, parsing fd duplication as a write to a file named "&1" ([#15600](https://github.com/QwenLM/qwen-code/issues/15600)). Affects non-interactive and Auto approval users; no fix in the data.
- Anthropic side queries requesting JSON send unsupported `tool_choice` and fail with 400 on Claude Sonnet 5.5 / Opus 5.5 ([#15542](https://github.com/QwenLM/qwen-code/issues/15542)). No fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*