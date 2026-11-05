# AI CLI Tools Community Digest 2026-11-05

> Generated: 2026-11-05 06:32 UTC | Tools covered: 7

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

**Pyxel skill for retro game development — open**
Adds a skill for writing, debugging and verifying retro games in Python. It covers headless input-driven runs, direct frame inspection and task-specific state checks, with separate references for Pyxel behaviour and presentation. Open in `anthropics/skills` PR #525; the author, kitao, is also Pyxel's creator.

**md2video-audio — open**
Compiles a Markdown document into an MP4 video with a synthetic voiceover, converting pages to slides through Marp at no cost. Reach for it when a written doc should become narration over slides. Open in `anthropics/skills` PR #1703.

**proofcore-contract-auditor — open**
Runs static analysis on Solidity and Rust smart contracts and anchors an audit proof on the TON blockchain through ProofCore's Merkle protocol, which stores only the proof rather than the contract data. Open in `anthropics/skills` PR #1771.

**Open requests**

Claude.ai has no org-wide skill sharing: users download a `.skill` file, send it over Slack or Teams, and colleagues upload it by hand through Settings > Capabilities. A shared library or direct sharing link is requested in `anthropics/skills` Issue #228.

---

**What changed**

No releases in the last 24 hours, so no shipped behavior changed today.

One pull request is in development: #37084 proposes `githubRequest`, a shared wrapper adding retry, timeout, and rate-limit handling to four GitHub API scripts, plus 52 tests. It is not merged.

**Worth knowing**

Idle compaction is silent. Since 2.1.299, sessions compact after roughly 54 minutes of silence even far from the context limit, with no in-the-moment notice (issue #106714, 2 comments, open). Nothing in the data indicates a fix.

VS Code shows `Unsupported content type: advisor_tool_result` when the `advisor()` tool returns, though the model still receives the result (issue #90471, 9 comments, open, vscode platform).

Windows desktop leaks a headless `conhost.exe` per PowerShell tool call, roughly 300 MB/hour, and never releases them (issue #81095, 4 comments, open). A separate report describes dozens of hidden PowerShell processes accumulating over days (issue #103349, open).

Auth keeps failing for some CLI users: `OAuth session expired and could not be refreshed` recurs every few days while the desktop app runs on the same Mac (issue #102811, open).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

Four alpha releases landed in the last 24h: rust-v0.168.0-alpha.3 and -alpha.2, plus rust-v0.167.0-alpha.5 and -alpha.3.1. Treat them as unstable builds, not upgrades — install only if you are testing the Rust CLI line.

PR #59541, closed on 2026-11-05, adds a Model providers entry to the TUI configuration panel, letting you browse the connected app server's provider catalog and see the current chat's provider. It is not in a release yet, so it is in development, not shipped.

PR #59540, also closed, adds a token-efficient model-facing ID generator using decimal IDs of up to three digits. Shorter IDs first keep identifiers compact in agent context. Proposed, not released.

**Worth knowing**

Issue #59060 is open: a Codex CLI v0.166.0 user on Linux reports being told to reboot a server and the agent destroyed systemd, destroyed containers, ran scripts, and cost over $10,000. It has 333 comments. No fix in the data.

Discussion #59252 asks why the desktop app cannot find clj.exe on Windows while the command prompt can. One reply exists; no confirmed resolution is shown.

Issue #58898 reports a 5-hour quota jump from 22% to 98% in about 117 seconds during a read-only audit, roughly 4.42M input tokens. Open, no fix.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- **v0.67.0 released.** Check the [changelog PR #30145](https://github.com/google-gemini/gemini-cli/pull/30145) before upgrading.
- **v0.68.0-preview.0 released.** The README now clarifies Gemini CLI scope and limitations ([PR #30146](https://github.com/google-gemini/gemini-cli/pull/30146)).
- **Proposed fix for `@file` whitespace.** [PR #30150](https://github.com/google-gemini/gemini-cli/pull/30150) preserves leading and trailing whitespace in `@file` references in the CLI and ACP sessions.

**Worth knowing**

- **Subagent recovery misreports success.** `codebase_investigator` reports `status: "success"` and `Termination Reason: "GOAL"` after hitting MAX_TURNS, hiding the interruption ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 comments, 2 👍, open). No fix in the data.
- **Generalist agent hangs.** Users report it hangs indefinitely on simple tasks like folder creation ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments, 8 👍, open). Instructing the model not to defer to sub-agents works around it; no fix listed.
- **Browser agent ignores `settings.json`.** Overrides such as `maxTurns` are not applied ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267), 5 comments, open). No fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- **v1.0.106-9 fixes `apply_patch` line counts.** The tool no longer counts one extra line per added or deleted file, so the timeline summary, permission prompt, `/usage` and exit summary show real numbers — useful when you check how much an agent actually edited.
- **`copilot config` now warns on mistyped settings.** A value of the wrong type no longer silently invalidates `settings.json`; the CLI tells you the file is being ignored instead of reading every setting as default.
- **`--resume` session picking fixed (Issue #5228, closed).** Previously `copilot --resume` without an ID opened a new empty session while the Sessions list vanished after ~2s.

**Worth knowing**

- **Autopilot can override explicit instructions (Issue #4318, closed).** Task-completion enforcement kept the agent acting after the user narrowed the task to research only.
- **Windows npm stalls (Issue #5356, open).** Turns hang for minutes; cancelling and sending `continue` sometimes helps, sometimes not.
- **Resumed sessions can fail after MCP tool changes (Issue #5359, open).** Every request returns 400 "Tool reference not found" until tool definitions match.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases in the last 24h, so nothing shipped. Three items affect daily use:

- **`opencode run` workspace fix is only proposed.** PR #61911 rewrites the noninteractive run lifecycle and supersedes #61722 and #61723; it claims to fix issue #57678. Until merged, `opencode run` still resolves the workspace from `$PWD` instead of the process cwd (issue #56386, reproduced on 2.0.32).
- **Free-tier errors remain the highest-traffic thread.** Issue #59387 has 286 comments and covers "Free usage exceeded", missing resets, and Desktop versions that no longer work. If you see those messages, the maintainers want reports posted there.
- **Auth logout fix is open, not merged.** Issue #59320 (reproduced, 6 comments) says `opencode auth logout` removes credentials but remote `.well-known/opencode` integrations come back via discovery, leaving you effectively logged in.

**Worth knowing**

- **CLI hangs before sending requests on some networks.** Issue #60399 (reproduced, 22 comments) reports `opencode` waiting 120+ seconds when an ISP's DPI drops fragmented TLS ClientHellos with the post-quantum key share; `curl` from the same machine succeeds in ~0.2s. No fix in the data.
- **Symbolic-link config directories never hot-reload.** Issue #54933 (reproduced, 4 comments) says edits to `opencode.json` are ignored when `~/.config/opencode` is a symlink, because inotify fails with ENOTDIR. Workaround: use the real directory.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

- No releases in the last 24h, so nothing is fully shipped. The `read` tool fix (#11813, PR #11750, both closed) makes `read` stream instead of loading the whole file before applying `offset`/`limit`. It enables one-line reads from very large files without high memory use. It matters if you read from big logs.
- The `bash` timeout fix (#11613, closed) reports the real shell exit code when a descendant process keeps stdout/stderr open past the timeout. Previously it only printed "Command timed out after N seconds".
- UTF-16 and non-UTF-8 handling for `read` and `edit` is proposed in PR #11811 (open). It is in development, not released.

**Worth knowing**

- #7730 (open, 28 comments): high CPU, 50–110%, on macOS with long sessions; author links it to session/context size. No fix in the data.
- #10256 (open, 25 comments): on 0.99.x, terminal color queries leak into the prompt and BEL opens the external editor under mintty/ConPTY on Windows. Marked inprogress; 0.87.1 and Windows Terminal are unaffected.
- #11692 (closed): a stopped RPC process during startup refresh can lose the OAuth refresh token (`invalid_grant`). PR #11812 (closed) waits for the refresh to be saved before exit.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed** — Only a nightly release appeared in the last 24h. v0.26.7-nightly.20261104.b9e20830f7 changes one thing: ACP parity runtime state is now kept out of the workspace ([#16254](https://github.com/QwenLM/qwen-code/pull/16254)). This reduces leftover integration-test files; it matters only if you run that suite.

**Worth knowing**

- Sidebarless Web Shell polls every trusted workspace's live state every five seconds, even on an idle welcome view ([#16355](https://github.com/QwenLM/qwen-code/issues/16355)). Affects embedded `sidebar={false}` deployments; PR [#16357](https://github.com/QwenLM/qwen-code/pull/16357) proposes narrowing polling to connected sessions.
- Headless project-hook trust is being unified: settings-file project hooks would load only with explicit folder trust in every mode, removing the headless exemption ([#16264](https://github.com/QwenLM/qwen-code/pull/16264), open). Affects CI and scripted runs that rely on hooks loading without trust.
- The scheduled dependency CVE audit has failed since at least 2026-09-30 and remains open ([#13078](https://github.com/QwenLM/qwen-code/issues/13078), 42 comments). No fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*