# AI CLI Tools Community Digest 2026-11-25

> Generated: 2026-11-25 08:16 UTC | Tools covered: 7

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

**pyxel retro game development — open pull request #525**
Adds a skill for writing, debugging and verifying Python retro games with Pyxel. It covers headless input-driven runs and direct frame inspection. The pull request is open.

**document-typography — open pull request #514**
Catches typographic faults in generated documents: orphan word wrap where one to six words spill onto the next line, and section headers stranded at the bottom of a page. The pull request is open.

**notion-spec-to-implementation — open pull request #1245**
Turns product or tech specs into Notion tasks with implementation plans, acceptance criteria and progress tracking. The same pull request also adds quantitative-resume-auditor. It is open.

**Open requests**

**Org-wide skill sharing in Claude.ai — issue #228**
A user asks for skills to be shared inside an organization directly instead of downloading a .skill file and sending it over Slack for colleagues to upload by hand. The issue is open.

---

**What changed**

Claude Code v2.1.332 adds beta support for skills served by MCP servers; they appear as `server:skill` in the `/` menu, while other skills keep their plain names. It also adds a `PreSkillShellCommand` hook event that can refuse a skill's or command's inline shell commands as it loads. On 2.1.331 and older, a settings file naming that hook errors out.

**Worth knowing**

VS Code prompt suggestions (ghost text, Tab to accept) stopped generating on 2026-11-22, reported on 2.1.327 and 2.1.330 with no error logged (Issue #111668). A separate VS Code report (Issue #112137) says the critical-path `rm` check denies commands with no prompt, even in Bypass mode. Both are open; no fix appears in the data.

On macOS, background sessions lose TCC permissions on every auto-update because versioned binary paths miss the responsibility disclaim (Issue #94878, open).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- Codex now stores voice selection in ChatGPT account preferences instead of `realtime.voice`, per PR #63845 (closed). This lets voice choices match across ChatGPT and Codex, but the PR is closed, so confirm it shipped in your build.
- The per-value additional context limit rises from 1,000 to 10,000 tokens (PR #63843, closed). More of each context value reaches the model; a 40 KiB histogram bucket was added.
- Packaged ripgrep moves to 16.0.0 (PR #63811, closed). Search behavior may shift on patterns where ripgrep 16 changed semantics.

**Worth knowing**

- Windows Computer Use leaves the capture access prompt and yellow display border open after a screenshot turn ends (issue #57101, 88 comments, open). Affects Windows Codex App users; no fix in the data.
- Terminal CLI `@Browser` fails with "The browser access host is unavailable" after the Windows desktop update 26.1023.6123.0 (issue #57641, 60 comments, 48 👍, open). macOS shows the same error (issue #56928).
- On macOS, updating to 26.1117.31558 signs users out of the built-in browser, empties Password Manager, and disables an unpacked extension (issue #62832, open).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24 hours, so the changes below are proposed PRs, not shipped features.

- **Safer git-based extension installs (proposed).** PR [#30459](https://github.com/google-gemini/gemini-cli/pull/30459) enables the `unsafe` config categories `getSafeGitEnv()` needs. Since 0.70.0, `gemini extensions install <git-url>` and `extensions update` fail with `Use of "GIT_CONFIG_SYSTEM" is not permitted...`. Matters if you install extensions from a git URL on 0.70.0 or later.
- **MCP env values with `=` are preserved (proposed).** PR [#30331](https://github.com/google-gemini/gemini-cli/pull/30331) fixes `gemini mcp add -e KEY=value`, which dropped everything after the second `=` and silently discarded empty values. Matters when passing tokens containing `=`.
- **Conversation branching (proposed).** PR [#30464](https://github.com/google-gemini/gemini-cli/pull/30464) adds `/fork [name] [--stay]` and a "Fork conversation from here" option in `/rewind`.

**Worth knowing**

- A generalist agent hang is reported when the CLI defers to it; simple tasks stalled up to an hour for the reporter. 8 comments, 8 👍. Issue [#21409](https://github.com/google-gemini/gemini-cli/issues/21409).
- Subagents can report `status: "success"` / `Termination Reason: "GOAL"` after hitting MAX_TURNS without doing the work, hiding the interruption. Issue [#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 14 comments.
- Browser Agent ignores `settings.json` overrides such as `maxTurns`. Issue [#22267](https://github.com/google-gemini/gemini-cli/issues/22267).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- **v1.0.116-4**: PowerShell allow rules now honor parameters with digits, such as `-n1` or `-ExpectedSha256`, instead of demanding full-script approval. Matters if you run PowerShell with allowlisted flags.
- **v1.0.116-1 / v1.0.116-2**: Copilot warns when a plugin and a standalone MCP server point at the same endpoint and shows how to disable one in `/mcp`. Pending prompts now cancel without waiting for an activity refresh.
- **v1.0.116-5**: Shell approval prompts in ACP clients display the command you are authorizing rather than its description. This addresses [#4335](https://github.com/github/copilot-cli/issues/4335), where `toolCall.title` hid the executable command.

**Worth knowing**

- [#5564](https://github.com/github/copilot-cli/issues/5564): with local sandboxing, the `edit` tool reportedly reads and copies a file listed in `deniedPaths` before rejecting the edit, leaving content under `~/.copilot/session-state/`. Open, no fix in the data.
- [#4755](https://github.com/github/copilot-cli/issues/4755): a session can wedge permanently when a queued message lands at turn end; input is refused and only killing the process recovers it. Open.
- [#5084](https://github.com/github/copilot-cli/issues/5084): `ask_user` prompts render markdown literally, so `**bold**` shows asterisks. Open.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases shipped in the last 24h, so the following are proposed fixes, not shipped features.

- **Patch tool drops a final empty `+` line** (#66314). PR #66315 fixes the parser so `*** Add File` blocks keep trailing blank lines. Matters when generated files need a trailing newline.
- **Snapshot undo rewrites CRLF as LF on Windows** (#66311). PR #66312 keeps raw bytes when `core.autocrlf=true`. Affects `.bat` and `.cmd` files after undoing an agent edit.
- **TUI forgets the current message after a tab switch** (#66304). PR #66307 restores message position, so `<leader>home`/`<leader>end` resolve from that message instead of the viewport top.

**Worth knowing**

- **Windows Terminal resize crashes the TUI** (#66301, #66302). `setRawMode` fails with errno 32 on every resize; both issues are closed.
- **Daemon restart strands sessions in "running"** (#66289, v2.4.1, macOS). `opencode service restart` does not clear it; `--standalone` works.
- **Windows Ctrl+V paste does nothing in the TUI** (#65913, v2.4.1, WSL2). Copy reports success but the clipboard keeps old content; PR #66310 proposes Windows interop.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24 hours, so nothing shipped. Two fixes are in development for problems users hit. PR #12502 (closed) reports HTTP error responses to `onResponse` and the `after_provider_response` extension event on SDK adapters, which previously never fired for 4xx/5xx, so error-reporting extensions stayed silent. PR #12494 (closed) finds Git Bash via `git` on PATH on Windows instead of only probing `%ProgramFiles%`, which matters when Git is installed elsewhere and the bash tool fell through to the System32 WSL launcher. PR #12505 (open) proposes replaying GitHub Copilot `reasoning_opaque` in `openai-completions`; it is not released.

**Worth knowing**

MCP OAuth token refresh failures are retried on every tool call (#12428, open, 2 comments); the expired token is kept and retried. For whom: users of OAuth-authenticated MCP servers. No fix in the data. In RPC mode, extension dialogs during `session_start` cannot be answered and Pi exits about 20 ms later (#12147, open, 2 comments). `cacheWarming: "idle"` never fires when an extension handles `turn_end` and the context holds a custom or compaction message (#10956, open, 5 👍).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- **v1.0.0-preview.2** adds Qwen4-Max to the Qwen subscription catalog, with a 1M-token context window and image/video input. It also shows a reset countdown when subscription credits run out and adds an `/upgrade` command that opens the subscription plans page. (Release v1.0.0-preview.2)
- **PR #18301** (open) makes the Web Shell settings panel show an unset boolean as "Not set (each surface uses its default)" instead of OFF. This matters for `experimental.unifiedAgentLoop` and `experimental.eventBusAgentLoop`, whose schema default is `undefined`. (Issue #18298)
- **PR #18317** (open) appends recovery guidance to the error shown when a provider rejects a request with "Repetitive tool calls detected in the conversation history", telling the user how to proceed.

**Worth knowing**

- `read_file` can report a nonexistent line range at EOF: a 5-line file with no trailing newline returns "Showing lines 6-6 of 5 total lines." (Issue #17668, P3, open).
- Voice dictation rejects Bailian `qwen-audio-*-asr-flash` models because `resolveVoiceTransport` only recognizes `qwen3-asr-*`. (Issue #18305, open).
- Live Voice hardcodes `turn_detection.type = "semantic_vad"`, which `qwen-audio-3.0-realtime-plus` rejects, with no override setting. (Issue #17000, open).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*