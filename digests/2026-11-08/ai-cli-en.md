# AI CLI Tools Community Digest 2026-11-08

> Generated: 2026-11-08 05:51 UTC | Tools covered: 7

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

**mcp-builder fix for mcp>=2 client imports — open (PR #1742)**
Reach for this when a Claude Code agent drives a Model Context Protocol server through `skills/mcp-builder/scripts/connections.py`. The patch handles the rename of `streamablehttp_client` to `streamable_http_client` in mcp 2.0.0 and passes custom HTTP headers through `create_mcp_http_client` instead of a direct kwarg. Safer command execution for webapp-testing — open (PR #1980)
Use this when an agent spawns local servers for browser tests. It removes `shell=True` from `with_server.py`, closing a command-injection risk (CWE-78) that arose from passing chained `cd <dir> && <command>` strings into a system shell.

**docx LibreOffice timeout handling — open (PR #1792)**
Use this when an agent converts or accepts tracked changes in Word files and needs a trustworthy exit status. `accept_changes.py` now returns an error on a `soffice` timeout and only reports success after confirming no revision marks remain in `word/*.xml`.

**Open requests**
Agent authors report that `claude-api` injects roughly 156k tokens in a single tool call, exhausting the context window (Issue #1487), and that `run_eval.py` never triggers skills or commands, producing a 0% trigger rate across all test queries (Issue #556).

---

**What changed**

No releases, pull requests, or fixes landed in the last 24h. The only new activity is open issue traffic; nothing alters how the tool works today.

**Worth knowing**

- **Headless `claude -p` may burn your quota faster.** Issue [#97074](https://github.com/anthropics/claude-code/issues/97074) (73 comments, 154 👍) reports headless `claude -p` runs, entrypoint `sdk-cli`, consume about 1.8× more of the 5-hour window per token than interactive `cli` on the same workload. Open, no fix in the data. Matters if you run scripted or CI jobs.

- **ToolSearch denied after MCP reconnect.** Issue [#107860](https://github.com/anthropics/claude-code/issues/107860) reports that reconnecting a failed MCP server via `/mcp` makes every `select:` ToolSearch return "Permission to use ToolSearch with max_results:N has been denied" with no stated rule or source. Open.

- **Paste collapse hides prompt content.** Issue [#23134](https://github.com/anthropics/claude-code/issues/23134) (56 comments, 163 👍) requests an option to disable `[Pasted text #N +X lines]` collapsing so pasted text can be reviewed before submitting. Open enhancement.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- `rust-v0.169.0-alpha.3` shipped; the release notes contain only the version number, so no user-facing change is described ([release](https://github.com/openai/codex/releases)).
- Incremental Code Mode tool updates moved through a closed PR chain: nested tool definitions and namespaces can now be updated or removed without resending the full `functions.exec` declaration ([PR #60157](https://github.com/openai/codex/pull/60157), [PR #60163](https://github.com/openai/codex/pull/60163), [PR #60188](https://github.com/openai/codex/pull/60188)). This matters for long sessions where the tool catalog changes mid-run.
- Sign-in can now create a custom provider or gateway when no saved gateway config exists ([PR #60186](https://github.com/openai/codex/pull/60186)). Previously this path stopped at an error.

**Worth knowing**

- Browser and computer-use tools still refuse to load certain sites, including after a chat-level denial is cleared ([#29343](https://github.com/openai/codex/issues/29343), 57 comments; [#49453](https://github.com/openai/codex/issues/49453), 48 comments). No fix is listed.
- On Windows, authenticated local commands were rejected as "blocked by policy" with no explanation ([#53982](https://github.com/openai/codex/issues/53982)); an idle RAM report also names ChatGPT/Codex processes ([#53146](https://github.com/openai/codex/issues/53146)).
- `agent-recap` searches Codex and Claude Code JSONL transcripts locally in a browser tab ([Discussion #60185](https://github.com/openai/codex/discussions/60185)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24h. The changes below are proposed PRs, not shipped features.

- PR #30196 proposes making "Always allow" apply only to the current command for tainted shell commands (untrusted flags, or a build command after build files changed). Today a tainted command can save a persistent rule for its root, e.g. every future `npm ...` call. Matters when you approve risky builds.

- PR #30171 proposes flagging recursive and forced `rm` regardless of flag position on POSIX. Today only `args[1]` is compared against `-f`, `-rf` and `-fr`, so `rm -r -f x`, `rm -Rf x` and `rm x -rf` are classified as not dangerous and skip shell heuristics. Matters whenever you rely on policy prompts.

- PR #30175 proposes applying local subagents' `generateContentConfig` (temperature, topP, topK, thinkingConfig) for every model value, including `flash`, `pro` and concrete names. Today only `auto` agents get them.

**Worth knowing**

- Issue #21409 (8 comments, 8 👍): the generalist agent hangs forever on simple tasks like folder creation; the reporter waited up to an hour. Instructing the model not to defer to subagents avoids it. No fix in the data.

- Issue #22323 (13 comments): `codebase_investigator` reports `status: "success"` and `Termination Reason: "GOAL"` even after hitting MAX_TURNS before analyzing anything. Open.

- Issue #24246 (3 comments): a 400 error appears when more than 128 tools are available. Open.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- **OSC 7501 program status support** (Issue #5112, closed): the interactive CLI now reports agent state (working, blocked) to terminals that support the OSC 7501 protocol. Useful if your terminal shows per-pane status indicators.
- **`/rubber-duck` disappearing** (Issue #5372, closed): the command vanished from copilot-cli and the issue is now closed. If you relied on it, verify it is back in your version.
- **ARM64 ripgrep crashes fixed** (Issues #4977, #4918, closed): the bundled `rg`/`glob` tools aborted with jemalloc `Unsupported system page size` on 16KB and 64KB page kernels (notably Asahi Linux). Users on those systems can now search again.

**Worth knowing**

- **Windows PowerShell approval prompts** (Issue #5379, open): in 1.0.107, users who already granted permission for git commands still get full-script review prompts. No fix in the data.
- **MCP OAuth token reuse** (Issue #4695, open, 2 👍): HTTP MCP servers using OAuth mint duplicate cache-key entries, forcing repeated re-auth across sessions. No fix in the data.
- **Prompt-mode extension tools hang** (Issue #5381, open): in `copilot -p`, an extension tool's permission request is never answered, so the run waits until killed. No fix in the data.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases shipped in the last 24h, so the changes below are proposed PRs, not shipped behavior.

- Code Mode catalog updates shrink to per-server budgets instead of one shared 2k budget, so one server connecting or leaving no longer restates every other server's tools. Proposed in PR #62176; use it if you run many MCP servers.
- Shell status output becomes clearer: `Exit code: N`, timeouts state how long they waited and how the process exited, and unmatched zsh globs pass through instead of failing. Merged as PR #62141.
- Image re-sends from history get capped on the 1.x line (backport of #39929, follow-up #56983) in PR #62270. Relevant if long sessions with pasted images hit provider rejections.

**Worth knowing**

- Free-tier limits dominate the tracker. Issue #59387 is the main report thread with 327 comments; users report resets that never happen. It is the official place to post reports, not a fix.
- `edit` and `apply_patch` silently replace invalid UTF-8 bytes with U+FFFD, corrupting non-UTF-8 files, per issue #45924 (`severity:high`, reproduced). No fix is listed.
- `opencode serve --service` can deadlock on shared-uid Kubernetes containers over overlayfs; `OPENCODE_DISABLE_FILEWATCHER=1` recovers it, per issue #62687.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## What changed

**Cursor fix for mouse selection.** Issue [#10862](https://github.com/earendil-works/pi/issues/10862) reports that with `showHardwareCursor: true`, the hardware cursor jumps to the wrong column while a mouse selection is active. The column is computed by `extractCursorPosition()` from text width before a zero-width marker. Updated 2026-11-07.

**Codemode script tool declarations.** PR [#11920](https://github.com/earendil-works/pi/pulls/11920) fixes scripts that declare a top-level `tools` or `console` failing with a redefinition error (Issue #11226). The fix lets scripts declare those bindings; it is closed but not a release.

**Prompt cache warming (proposed).** PR [#11857](https://github.com/earendil-works/pi/pulls/11857) is open and would refresh p2's 5-minute Anthropic prompt cache. The author measured 789 full rewrites from Oct 12–Nov 5, costing about $1,430 extra (26% of p2 spend). Not yet merged.

## Worth knowing

**MCP reconnection blocks for minutes.** Issue [#11919](https://github.com/earendil-works/pi/issues/11919) reports pi 1.5.0 re-handshakes all MCP servers sequentially after signing in to one, each waiting 30–60s. Happens on Linux and macOS with 3+ servers. No fix in the data.

**MCP OAuth tools return empty.** Issue [#11918](https://github.com/earendil-works/pi/issues/11918) reports Google Workspace MCP tool calls returning empty despite a valid token. The session/auth header appears not carried after sign-in. No fix in the data.

**Mistral streams content as arrays.** Issue [#11916](https://github.com/earendil-works/pi/issues/11916) reports pi 1.5.0 rendering Mistral's array-style `delta.content` as `[object Object]` spam. Affects users on `openai-completions` providers.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

v0.27.0 ships managed-agent sessions that hold multiple child questions at once, answered in any order, with drafts and errors kept separate per child ([#16484](https://github.com/QwenLM/qwen-code/pull/16484)). Matters when one agent turn fans out to several parallel questions.

TypeScript SDK v0.1.30 bundles CLI version 0.27.0, so SDK users get the release above without separately installing the CLI.

v0.26.9-nightly.20261107 documents Wally under OpenAI-compatible providers ([#16529](https://github.com/QwenLM/qwen-code/pull/16529)).

**Worth knowing**

Microcompaction discards existing `<persisted-output>` references when clearing aged tool results, replacing the saved path, sha256 digest and preview with a bare cleared placeholder ([#16596](https://github.com/QwenLM/qwen-code/issues/16596), open, 3 comments). The full bytes remain on disk. No fix in the data.

`--disable-mcp-server` glob exclusions cannot be lifted in-session, and enable paths report success while the server stays disconnected ([#14465](https://github.com/QwenLM/qwen-code/issues/14465), open, 4 comments). Affects users who exclude MCP servers at launch.

A proposed change would mask aged-out tool results to disk instead of clearing them ([#16585](https://github.com/QwenLM/qwen-code/issues/16585), open, 3 comments).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*