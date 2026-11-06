# AI CLI Tools Community Digest 2026-11-06

> Generated: 2026-11-06 06:26 UTC | Tools covered: 7

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

### webapp-testing: avoid shell=True in with_server.py
Replaces `shell=True` with a safer call in `skills/webapp-testing/scripts/with_server.py`, closing a command-injection risk (CWE-78) from unsanitized agent command strings. Open as PR #1980; note the change removes support for `cd <dir> && <command>` chains.

### fix(docx): report LibreOffice timeout as an error and verify the output
Makes `skills/docx/scripts/accept_changes.py` return an error when `soffice` times out, and only report success after checking the output DOCX no longer contains revision marks. Open as PR #1792.

### fix(xlsx): resolve worksheet-scoped defined names and aliases in external_links_at_risk
Fixes false negatives in `skills/xlsx/scripts/recalc.py`, where `external_links_at_risk` only matched workbook-level defined names and missed formulas referencing external links indirectly. Open as PR #2019.

**Open requests**

Issue #1487 reports the `claude-api` skill eagerly injects roughly 156k tokens in a single tool call, exhausting the context window; users want the skill to load its content lazily.

---

## What changed

No new releases in the last 24 hours. Feature #18435 proposes account switching inside Claude Desktop; it stayed open with 1,007 👍 and 236 comments and is not shipped.

PR #107768 (mods: add the privacy mod) was closed after publishing the source of the built-in `privacy` mod, which blocks shell calls containing the signed-in account's email address. Mods let you read what runs before enabling custom hooks.

## Worth knowing

Issue #107757 (open, 41 comments, 240 👍) reports Claude Code sent the user's email in the `User-Agent` header during web searches, exposing addresses to third parties. No fix in the data.

Issue #106074 (closed) — in Claude Desktop, Tab on the slash-command menu ran the command instead of completing it; typing `/cl` then Tab triggered `/clear` and erased the conversation. Closed, so treat as fixed.

Issue #103591 (open, Windows, Claude Code 2.1.302): auto-continue at usage limit never triggers despite the setting showing `true` in `/config`. No fix listed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

`rust-v0.167.0` adds an agent command center: run `codex agents --no-daemon` to open it, and the command center and session picker mark unread results (#58238, #58239, #58263, #58264). This matters when you track several running agents and need to see which finished.

The same release lets you switch between connected backends from the terminal session picker, keeping your drafts when you switch (#58280, #58457). This matters if you work across more than one backend in a single session.

Four releases shipped in the last 24h: `rust-v0.167.0`, plus alpha builds `rust-v0.168.0-alpha.7`, `-alpha.6`, and `rust-v0.167.0-alpha.3.2`. The alphas list no changes.

**Worth knowing**

Issue #59060 (431 comments) reports Codex CLI v0.166.0 destroying systemd and containers and running scripts when asked to reboot a server, with over $10,000 in claimed cost. No fix appears in the release notes.

Issue #56691 (50 comments) reports the Codex VS Code extension 26.1021.22027 failing to start its UI on Windows VS Code 1.143.1; issue #57759 reports the same version freezing VS Code on Linux/Wayland, fixed there by downgrading to 26.908.40401.

Issue #11626 (56 comments, 230 👍) requests a `/rewind` that restores both chat context and Codex-applied code edits; today Esc rewind only reverts conversation state.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases landed in the last 24h, so nothing is shipped. Three open PRs address problems users actually hit.

- PR #30170 (area/agent, priority/p1, "fix(core): stop local subagents from waiting out their deadline on a stalled model call") proposes capping a single stalled model call, so a local subagent fails fast instead of burning its full 3-minute `maxTimeMinutes` plus up to 60 s of recovery.
- PR #30171 (priority/p1) proposes flagging recursive or forced `rm` regardless of flag position. Today `isDangerousCommand` only checks `args[1]`, so `rm -r -f x`, `rm -Rf x` and `rm x -rf` skip `PolicyEngine` shell heuristics.
- PR #29901 proposes `_session/steering` for ACP clients, letting Zed, JetBrains or VS Code extensions add a message to a running turn without cancelling it, as `experimental.modelSteering` does in the terminal.

**Worth knowing**

- Issue #21409 ([OPEN], p1, 8 comments, 8 👍): deferring to the generalist agent hangs indefinitely on simple changes like folder creation; instructing the model not to defer avoids it. No fix in the data.
- Issue #21968 ([OPEN], p2, 7 comments): the author reports Gemini rarely invokes custom skills and sub-agents on its own unless explicitly told.
- Issue #24246 ([OPEN], p2): more than 128 available tools triggers a 400 error.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- **v1.0.106 (2026-11-05)** adds a `/code` command that opens the current session in VS Code, and `/settings` now opens a unified dashboard with global search across settings and local resources. Use these when you want to jump to the editor or find a setting without hunting through menus.
- **v1.0.106** adds a Fusion tier setting to `copilot config`, giving Fusion mode a configurable tier.
- **v1.0.106-11** fixes a prompt-handling bug: an image removed with Ctrl+U, Ctrl+K or Ctrl+W, or replaced by a recalled history entry, is no longer sent with the message. Ctrl+S can now stash the prompt afterwards, and pasted text containing NEL or Unicode line/paragraph separators fills separate prompt lines.

**Worth knowing**

- Issue #5367 (open): the agent regularly loses MCP tool schemas after returning to a session. The reporter says `/compact` restores visibility. A workaround exists; no fix is in the data.
- Issue #5366 (open): with remote MCP OAuth (Microsoft Entra), calls fail after the access token expires while `mcp.list` still reports connected. The reporter says only restarting the server recovers.
- Issue #5361 (open): after the 5-hour session limit reset, a session failed with a 400 "model is not available" error on 1.0.105. No fix is in the data.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

`@opencode/pty` 0.5.0 shipped as `process-daemon-v0.5.0` (protocol 8). If you build against the PTY protocol directly, check protocol compatibility before upgrading.

PR #61961 (open) rereads a file when the file browser reopens it, targeting the stale-content half of issue #52941. Not released yet.

PR #62287 (open) proposes inline visual plots: a fenced `visual` block with a JSON spec, currently one `plot` renderer. In development, references #62258.

**Worth knowing**

Issue #59387 remains open with 304 comments: free-tier limits (`Free usage exceeded`, resets that never happen). The maintainers run it as the main free-tier thread, so report there.

Issue #44007 (open, reproduced): TUI `--auto` only approves permissions for the selected session route, so background tabs stall at permission prompts until you select them.

Issue #61775 (open, reproduced): session warming rebuilds a different request than the step sends. On Anthropic it roughly breaks even, and on OpenAI and Gemini it loses money.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases landed in the last 24 hours, so nothing new is shipped. The day's movement is in fixes and proposals.

- **Windows bash process cleanup (PR #11854, open).** The proposed fix kills whole process trees instead of relying on `taskkill /T`, which misses processes whose parent already exited. It matters on Windows for commands that background children, for example `(while true; do echo tick; sleep 0.05; done) &`.
- **MCP OAuth hang (issue #11311, closed; PR #11855).** `OAuthCallbackServer.close()` awaited `http.Server.close()`, which waits on idle browser sockets, leaving `/mcp login` on "Connecting…" for minutes. The fix closes remaining connections.
- **Prompt-cache warming for p2 (PR #11857, open).** p2 never refreshed Anthropic's 5-minute cache, so the author reports 789 full rewrites and about $1,430 extra across Oct 12–Nov 5.

**Worth knowing**

- **High CPU on long macOS sessions (issue #7730, open, 30 comments).** Users see 50–110% CPU with 600–800MB memory, anecdotally tied to context or session length. No fix is listed.
- **Groq Qwen3.8 27B returns HTTP 400 (issue #10741, open).** Pi sends the `developer` role, which Groq's template rejects. Workaround: use another provider or model.
- **`getContextUsage()` overestimates after network errors (issue #10287, open).** On Pi 0.99.2 the author measured a jump from ~42k to 330,081 tokens after one retryable failure.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- **v0.26.8 released.** The only listed feature is running `prompt.submit` hooks in the OpenTUI terminal ([#16195](https://github.com/QwenLM/qwen-code/pull/16195)). No known breaking changes. This matters if you rely on `prompt.submit` hooks and use the OpenTUI terminal.
- **TypeScript SDK v0.1.28 released.** It bundles CLI version 0.26.8 (the notes also list 0.26.6 in a second block). Matters when pinning SDK and CLI together.
- **Desktop v0.26.8 released**, including a refactor sharing the Managed Agent session event delivery loop ([#15952](https://github.com/QwenLM/qwen-code/pull/15952)).

**Worth knowing**

- Workflow agent permission approval never renders; the run hangs while the status bar shows approval is needed. Reported on 0.26.6 and reproduced on 0.26.8 ([#16425](https://github.com/QwenLM/qwen-code/issues/16425), 3 comments). A fix is proposed in open PR [#16432](https://github.com/QwenLM/qwen-code/pull/16432), not released.
- GitHub channel inbound task recovery stops running after the task store recovers from a read failure at start-up ([#16393](https://github.com/QwenLM/qwen-code/issues/16393), closed). The nightly 0.26.8 notes list a fix PR ([#16402](https://github.com/QwenLM/qwen-code/pull/16402)) for keeping recovery armed after a failed read.
- Oversized `write_file` calls are rejected only after the whole response is generated, losing the attempt ([#16417](https://github.com/QwenLM/qwen-code/issues/16417), 0.26.8). No pre-flight check exists in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*