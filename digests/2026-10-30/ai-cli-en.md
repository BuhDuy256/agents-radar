# AI CLI Tools Community Digest 2026-10-30

> Generated: 2026-10-29 16:21 UTC | Tools covered: 7

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

### <skill name — what it does>
1. **algorithmic-art — wrapAround() now wraps**
   `wrapAround()` in `algorithmic-art` returned `max` for every negative value and `0` for anything above `max`; it now uses a modulo that handles negatives, keeping results in `[0, max)`. **Open**, fixes #1897 (PR #1977).

2. **mcp-builder — support for mcp>=2 imports and custom headers**
   In `mcp>=2.0.0`, `streamablehttp_client` was renamed to `streamable_http_client`, and custom HTTP headers are configured via `create_mcp_http_client` / `http_client` rather than as a direct kwarg. This PR fixes connections that broke after the rename. **Open**, fixes #1668 (PR #1742).

3. **skill-creator — parse YAML frontmatter scalars correctly**
   `parse_skill_md` manually strips quotes and joins continuation lines, so evaluation and description optimization commands can receive metadata that differs from the YAML in `SKILL.md`. For example, the plain description `Use for requests like "review my draft."` loses its closing quote. **Open** (PR #1997).

**Open requests**
- **Community skills impersonate the `anthropic/` namespace** (Issue #492, 46 comments): community-made skills are being distributed under the `anthropic/` namespace, so users may grant elevated permissions to skills they believe are official. The issue is a user security report, not an accepted change.
- **`run_eval.py` never triggers skills** (Issue #556, 13 comments): the author reports that `claude -p` fails to invoke the `Skill` or `Read` tool for test queries, producing a 0% trigger rate across all queries.

---

**What changed**

No releases in the last 24h, so nothing shipped. Two PRs were updated:

- **Hookify stop/prompt events** — PR [#32751](https://github.com/anthropics/claude-code/pull/32751) fixes simple `pattern` syntax rules with `event: stop` or `event: prompt`, which never fire because `config_loader.py` maps them to a field the rule engine can't resolve for those events. Proposed, not merged: your hookify stop/prompt rules stay silent until it lands.
- **edit-verifier plugin** — PR [#32755](https://github.com/anthropics/claude-code/pull/32755) adds a PostToolUse hook that verifies an Edit actually applied instead of assuming success. Proposed: silent edit failures (whitespace mismatch, already-modified target) are the case it targets.

**Worth knowing**

- **Worktree isolation refuses git-free Bash** — Issue [#95122](https://github.com/anthropics/claude-code/issues/95122) reports 75 refusals in 3 days on 2.1.272/2.1.273 for calls with no `git`, only worktree-internal paths, including `$VAR` reads, `"$(…)"`, loops and heredocs after `&&`. No fix in the data; one repro and 6 comments.
- **`--max-turns` in headless mode** — Issue [#105974](https://github.com/anthropics/claude-code/issues/105974) reports the flag not enforced consistently under `-p`. Closed 2026-10-29, same day it was filed.
- **Remote Control sessions after auto-update** — Issue [#103005](https://github.com/anthropics/claude-code/issues/103005) reports desktop auto-update restarts archive active Remote Control sessions without restoring them; from the phone they vanish and show "Remote c…". Open, 5 comments, no fix listed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- Rust CLI 0.166.0-alpha.6 and 0.166.0-alpha.5.1 were released (rust-v0.166.0-alpha.6, rust-v0.166.0-alpha.5.1). Both are alpha builds, so use them only if you track pre-release CLI versions.
- Proposed, not yet shipped: PR #58045 adds managed command checkpoints that require fresh human approval, independently of saved approvals or hooks. If merged, it changes which commands a policy can force to a prompt.
- Proposed, not yet shipped: PR #57870 enables server-side output truncation for Code Mode sessions, which previously handled output entirely client-side, leaving server observation budgets unused.

**Worth knowing**

- VS Code extension 26.51021.22027 fails to start its UI on Windows (Issue #56655, 36 comments); a related macOS Intel failure at 26.1021.22027 was worked around by rolling back to 26.1007.21434 (Issue #56660). No fix listed in the data.
- Windows sandbox provisioning fails on non-elevated accounts: 26.1023.6621.0 reports `helper_sandbox_lock_failed` (Issue #57617) and error 5 leaves the user profile at Low integrity, breaking icons and Edge credentials (Issue #58107).
- Windows remote work stops updating with repeated disconnections on 26.1021.31345 (Issue #58097).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24h. Open PRs propose behavior changes you may see soon:

- **Command substitution control (PR #30029, proposed):** adds a `security.allowCommandSubstitution` setting, default `false`, replacing the hardcoded unconditional block on `$()`, backticks, and `<()`/`>()`. YOLO mode would bypass the check. Matters if you need substitution in shell tools today.
- **Abort support for background reads (PR #29977, proposed):** `read_background_output` currently ignores its abort signal, so a cancelled call with `delay_ms` keeps sleeping and then reads the log anyway. The PR rejects already-aborted calls up front.
- **Retry duplication fix (PR #30020, proposed):** on a mid-stream retry, tool calls from both the failed and successful attempts were collected and executed, so side-effecting commands could run twice.

**Worth knowing**

- Generalist agent hangs: Issue #21409 (8 comments, 8 👍) reports `gemini-cli` hanging indefinitely when it defers to the generalist agent, including for simple changes like folder creation. No fix in the data.
- Browser agent config: Issue #22267 reports the Browser Agent ignores `settings.json` overrides such as `maxTurns`. No fix in the data.
- Subagent success misreporting: Issue #22323 reports the `codebase_investigator` subagent returns `status: "success"` and termination reason `GOAL` after hitting MAX_TURNS.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## What changed

No releases landed in the last 24 hours, so no new features or fixes shipped.

Two closed items may matter if you hit them: #4613 reported MCP tool schemas were eagerly injected from 1.0.80, adding 354K startup tokens to trivial prompts; #4710 reported an idle `copilot --yolo` session kept a `copilot-file-search` thread running, pinning a CPU core and writing an unbounded log. Both are marked CLOSED, so check your version.

Proposed but not shipped: #5275 asks for a strict tool allowlist in non-interactive mode, since `--deny-tool` currently overrides `--allow-tool`. Open, one comment.

## Worth knowing

#5254: a resumed session on 1.0.103 reached 37.3 GiB physical memory after 6h19m of parallel agents. Open, two comments; no fix in the data.

#552: `/login` returns `Failed to list models: 403 unauthorized` for an organization that enabled Copilot CLI, on 0.0.355. Open since 2025-11-13, 31 comments; unresolved.

#5205: context-window rollover fails with "checkpoint.md is absent for this agent", crashing long-running sessions. Open.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

- v2.2.1 adds `/goal <objective>`, which keeps a session running until a reviewer confirms the objective is met. Control it with `/goal pause`, `/goal resume`, or `/goal clear` from the TUI or Desktop (#59437).
- `process-daemon` v0.3.3 ships `opencode-pty` 0.3.3 (protocol 7), published to npm as `@opencode/pty@0.3.3`. PR #60276 proposes switching the core PTY dependency from `@opencode-ai/pty@0.3.1` to this release.
- PR #60120 proposes capping `execute` progress updates to at most one per 100 ms. Today every nested call start and finish sends an update carrying all rows so far, so N calls produce 2N growing updates.

**Worth knowing**

- Many users report the free-message quota not resetting or resetting too late across v2.2.0 and v2.2.1 (#60131, #60132, #60080). Issue #60124 is closed as pending close; no fix appears in the data.
- Closing the app does not stop running agents; one user reported an agent continuing for hours (#55214, 7 comments). Still open.
- Auto mode fires repeated false permission notifications because approval happens client-side after the server emits the request (#47545, 17 comments). Closed.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24h. Two fixes merged: PR #11577 makes `resizeImageInProcess` return the smaller of PNG and JPEG candidates, so photo-like images are no longer sent as oversized PNGs; PR #11565 stops writing OSC 133 prompt markers in regular TUI mode, which had been hiding the working indicator in Rex and iTerm2 3.7.5+. PR #11572 stops retrying Zhipu/Z.ai usage-limit errors (HTTP 429, code 1308), so a plan cap no longer burns retries. None of these are tagged releases — confirm your version before relying on them.

**Worth knowing**

Issue #7547 (91 comments, open) asks how people run Pi on Windows and where effort should go; treat it as the current thread for Windows setup problems. Issue #9549 reports large transcripts re-rendering every frame and every resize re-emitting the transcript, saturating one core on Windows Terminal with 2 logical cores; the reporter verified it with `pi -ne`. No fix appears in this data. Discussion #11503 describes `pi-rs`, an external MIT-licensed Rust port of pi 0.74.2's headless core, with a DeepSeek API compatibility finding; it is independent of the main repo.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- **v0.26.4 is out.** Generated UI views now follow the host theme ([#15798](https://github.com/QwenLM/qwen-code/pull/15798)). No known breaking changes. Matters if you build or embed generated views and previously matched theme by hand.
- **Desktop v0.26.4 ships a config fix.** Previously dropped controls are now reported ([#15794](https://github.com/QwenLM/qwen-code/pull/15794)). Matters when a setting appears ignored: you get a report instead of silence. Desktop v0.26.3 added session permission rules and Auto approval ([#15448](https://github.com/QwenLM/qwen-code/pull/15448)).
- **SDK TypeScript v0.1.26 released** ([PR #15876](https://github.com/QwenLM/qwen-code/pull/15876)), bundling CLI 0.26.4.

**Worth knowing**

- **`contextWindowSize` is being removed automatically** ([#15855](https://github.com/QwenLM/qwen-code/issues/15855), P1, open, needs information). Reported by one user on Ollama with `qwen3.8:27b`; no fix in the data.
- **Web Shell smoke test fails on every PR** ([#15861](https://github.com/QwenLM/qwen-code/issues/15861), P1, open, ready for agent). Fails at `web-shell.host-directory-picker.spec.ts:90`, independent of PR content.
- **SDK stream-json changes message id after thinking** ([#15875](https://github.com/QwenLM/qwen-code/issues/15875), open, 2 comments). The text snapshot's `message.id` differs from the earlier `message_start` id; no fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*