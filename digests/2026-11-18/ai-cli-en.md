# AI CLI Tools Community Digest 2026-11-18

> Generated: 2026-11-18 07:12 UTC | Tools covered: 7

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

**mcp-builder: fix streamable HTTP client import and headers** — Fixes `mcp>=2.0.0`, where `streamablehttp_client` was renamed to `streamable_http_client` and custom headers now go through `create_mcp_http_client`. Open; this may be the change to use if `connections.py` fails to import on current MCP versions. Reference: anthropics/skills PR #1742.

**skill-creator: isolate trigger evals and handle Windows and runtime failures** — Addresses false trigger misses caused by competing per-worker probes, `select()` failing on Windows subprocess pipes, and runtime failures counted as non-triggers. Open; relevant if you run `run_eval.py` and get misleading negative examples. Reference: anthropics/skills PR #1298.

**webapp-testing: avoid `shell=True` in with_server.py** — Replaces `subprocess.Popen(..., shell=True)`, which was used for `cd <dir> && <command>` chains, to close a command-injection risk (CWE-78). Open; reach for it when spawning servers from agent-generated command strings. Reference: anthropics/skills PR #1980.

**Open requests**

Orgs cannot share skills directly — colleagues must download a `.skill` file and upload it manually via Settings > Capabilities, so a shared library or sharing link is requested. Reference: anthropics/skills Issue #228.

---

**What changed**

v2.1.327 adds a confirmation prompt before `/install-github-app` modifies a repository, so you approve the change first. The same release adds `claude mcp add-json <name> -`, which reads the server's JSON from stdin to keep tokens off the command line; it is not available inside a Claude Code session.

**Worth knowing**

Issue #110867 (closed, 2 comments) reports that on v2.1.326, resuming a session sent the `# Environment` system message empty, so the prompt cache was missed on every resumed request. The report is closed; the release notes mention only "a line when a resumed session's earlier" context.

Issue #109170 (open, 1 comment) reports requests above ~200K tokens failing with ECONNRESET since 2026-11-11 ~22:50 UTC on Windows, with `/compact` hanging and no session recovery. No fix appears in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- Since rust-v0.170.0, TUI realtime voice calls use WebRTC negotiation (#61172), so calls can connect peer-to-peer rather than through the previous path. This matters when voice quality or latency on long sessions depends on the transport.
- rust-v0.170.0 adds automatic authentication-header refresh for OpenTelemetry HTTP exporters (#61028). Long-running sessions exporting telemetry no longer need manual credential rotation.
- rust-v0.170.0 adds experimental support for identically named MCP servers across environments (#60905); per-release details for rust-v0.171.0-alpha.13, rust-v0.170.0-alpha.4.2 and rust-v0.171.0-alpha.12 are absent, and rust-v0.169.1 lists only "Chores".

**Worth knowing**

- Windows Computer Use leaves an access indicator and gold/yellow display border visible after a screenshot-producing turn completes (#57101, open, 57 comments).
- On Windows and macOS Work threads, the Send button stays disabled or Enter fails silently despite text being accepted (#54564, #51636, both open).
- An MCP plugin `mcp.json` using `extensions.com.openai.auth` is rejected as an unknown field, dropping the server (#53658, open).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24h, so nothing shipped. Changes below are open or closed pull requests, not released features.

- **Windows UI freeze proposed fix.** PR #30334 parses PowerShell commands asynchronously, aiming to stop the multi-second spinner freeze on Windows before the Shell tool panel appears. Status: open.
- **Git SSH fix proposed.** PR #30335 stops `getSafeGitEnv()` from setting `core.sshCommand` to an empty string, which caused `error: cannot run : No such file or directory` on SSH-based git operations. Status: open.
- **MCP env parsing fix proposed.** PR #30331 preserves `=` characters and empty values in `gemini mcp add -e KEY=value`; previously `TOKEN=abc=def==` was stored as `"abc"`. Status: open.

**Worth knowing**

- **Generalist agent hangs.** Issue #21409 (8 comments, 8 👍) reports the generalist agent hanging indefinitely on simple tasks like folder creation; instructing the model not to defer to subagents avoids it. No fix in the data.
- **Browser subagent fails on Wayland.** Issue #21983 (priority/p1) reports the browser subagent failing while reporting `Termination Reason: GOAL`. No fix in the data.
- **400 error above 128 tools.** Issue #24246 reports a 400 error when too many tools are in scope. No fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.114 and v1.0.114-0 shipped on 2026-11-18; both list only "Fixes and changes." No feature detail is given.
- v1.0.113 (2026-11-17) adds the managed setting `features.browserUse`. Administrators can now disable built-in Browser Use, including inside sessions that are already running.

**Worth knowing**

- Issue #5492: in 1.0.113 the extension SDK was renamed from `@github/copilot-sdk` to `@microsoft/copilot-sdk` with no alias and no release note. Extensions importing the old name fail with `ERR_MODULE_NOT_FOUND`. No fix is in the data.
- Issue #5498: in 1.0.113, plugin extensions stop and restart a few seconds after an interactive session starts, so each extension's startup code runs twice. No fix is in the data.
- Issue #5478 (6 comments): on Windows, Cortex XDR kills the launching shell via `parent_process_spoofing` when Copilot CLI spawns `git`. No fix is in the data.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

Shell commands that hit their timeout now move to the background instead of being killed (v2.3.1). Long builds and test runs finish and report back; a foreground `timeout: 0` now means the default 120 seconds.

GPT-6.2 prompt caching is fixed in v2.3.2. GPT-6.2 does not cache a system prompt sent in the Responses `instructions` field, so every step re-billed it as uncached input; OpenCode now sends it as a leading developer message on every Responses route, including OpenAI.

OpenCode 1 now offers the upgrade to OpenCode 2.0 (v1.19.6). It downloads in the background and installs only on Restart to upgrade, Upgrade on quit, or Later; sessions, projects, and settings are kept, but OpenCode 1 plugins need an update.

**Worth knowing**

The model catalog cache does not refresh on its own (#64489, open). One reporter measured it 154.9 hours (6.5 days) old, so `opencode models` and the desktop list omit newly released models until the background service restarts.

`opencode.db` reached 12.7 GB after three weeks, with 474 SQLite disk I/O errors in 12 minutes (#64588, open). No fix in the data.

The free-tier issue thread (#59387, open, 390 comments) collects reports of exceeded usage limits whose reset never happens.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## What changed

**Tree navigation no longer pollutes prompt history (PR #12280, open).** Both the `/tree` selector and the extension `navigateTree` action re-render the chat with `populateHistory: true`, which adds branch prompts back to your Up-arrow history on every jump. The proposed fix stops that; it matters most if you navigate branches often.

**`/reload` now refreshes scoped models (PR #12278, open).** Changes to `enabledModels` take effect without restarting pi, while a startup `--models` flag still wins. Relevant for anyone testing model-scoping config in a live session.

**Resume no longer drops built-in tools (issue #11460, closed, fix available).** On 1.4.0, a session whose branch was truncated (orphan `parentId` after ENOSPC) lost all built-in tools on resume.

## Worth knowing

- **Cod mode cancellation crash affects 1.5.2 (issues #12271, #12253, #11956).** A `Promise.all` of `tools.read()` calls where one path fails while a sibling is mid-open crashes the whole pi process with an unhandled `AbortError`. Reported by multiple users; #11956 is closed.
- **Windows users, 97 comments on issue #7547.** An open discussion asking how people run pi on Windows and which issues they hit, framed around where core should focus fixes versus externalize.
- **Skill collision warnings ignore precedence (issue #12257, PR #12256 closed).** Pi warns even when its resource precedence already picked a winner, causing repeated warnings for intentional overrides.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

v0.28.0 shipped with no known breaking changes. It adds a sidebar workspace filter to the Web Shell (PR #17244) and a DingTalk adapter for managed agents. The TypeScript SDK v0.1.35 bundles CLI 0.28.0.

A v0.28.1-preview.0 preview also appeared, hardening the verify-pr watcher (PR #17506 references a scheduled `/loop` E2E test); it is preview, not stable.

**Worth knowing**

- Issue #14724 (436 comments) tracks a persistent main CI failure in the Managed Agent gate; it has been open since 2026-10-19 and remains open — the data shows the gate finds no test, so no fix is visible.
- Issue #13851 reports that headless/SDK mode delays the terminal `result` until managed auto-memory tasks finish, a 40s–5min gap each; TUI and ACP return immediately. Open.
- Issue #17682 records a Grep fallback bug: non-UTF8 tracked filenames fail the lstat guard and are skipped. A PR (#17530) exists, but the fix is deferred follow-up work, not merged.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*