# AI CLI Tools Community Digest 2026-11-28

> Generated: 2026-11-28 07:35 UTC | Tools covered: 7

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

# Claude Code Skills — Status Note, 2026-11-28

## Pyxel retro game skill (open)
Adds a Pyxel skill for creating, debugging and verifying retro Python games, covering headless input-driven runs and frame inspection. Still an open pull request: anthropics/skills PR #525.

## Notion spec-to-implementation and quantitative resume auditor skills (open)
Bundles two skills: one turns product or tech specs into Notion tasks with acceptance criteria, the other audits resumes. Both unmerged: anthropics/skills PR #1245.

## Document-typography skill (open)
Prevents typographic faults in generated documents, including orphan word wrap, widow paragraphs and numbering misalignment. Not yet merged: anthropics/skills PR #514.

**Open requests**
Community skills distributed under the `anthropic/` namespace let authors impersonate official Anthropic skills, and users may grant elevated permissions on that mistaken trust — reported in anthropics/skills Issue #492.

---

**What changed**

No new releases in the last 24 hours. Four PRs were updated:
- PR #53529 (closed) adds CI validation for local marketplace entries, catching invalid plugin references before merge.
- PR #112684 (open) makes the stale sweep post a notice when it labels an issue, capped at 100 issues per run.
- PR #112436 (closed) stops the stale sweep from marking issues with `has repro`, `reproduced`, `data-loss`, or `high-priority` labels.

**Worth knowing**

- Issue #64804 (open): On Windows, Enter inserts a newline instead of submitting, and a `keybindings.json` override is ignored. No fix in the data.
- Issue #111336 (open): Between 2026-11-13 and 2026-11-20, 78 requests were blocked by a false-positive `reasoning_extraction` safeguard across Fable 5.2, Opus 5.5, and Sonnet 5.5. The author reports ordinary development work triggering it.
- Issue #38928 (closed): The Explore subagent failed immediately with "Prompt is too long" when many MCP tools were connected.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

No user-facing feature shipped in the last 24 hours. The only release is `rust-v0.174.0-alpha.9`, an alpha tag with no changelog in the data.

Several sandbox and TUI fixes exist as closed PRs, not releases. PR #64415 preserves Linux sandbox read-only restrictions and deny masks when a writable path is a symlink alias. PR #64416 makes Windows sandboxes honor declared filesystem permissions instead of rejecting valid workspace policies. Both are groundwork; none is confirmed shipped.

A TUI rendering fix landed in PR #64400: Markdown inline code beginning a paragraph inside a list item no longer appends to the preceding heading line.

**Worth knowing**

Issue #45163 (open, 39 comments, 👍46): TUI palette is cached only at startup, so input text stays unreadable after the system switches light/dark mode. Present through `codex-cli 0.154.0` and on `main` at `a592c38c`. No fix in the data.

Issue #64419 (open, 2 comments): a failed `/models` fetch is not cached, so every turn waits for the fetch timeout while `/models` is unreachable. Reported from `main` at `8cae463a69`; affects ChatGPT sign-in, API keys and custom providers.

Issues #62975 and #63042 report the Windows Desktop Local/Cloud permissions selector disappearing after the first message, on versions `26.1117.41037` and `26.1117.4957.0`. No fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24 hours. Changes below are open pull requests, not shipped features.

- **Proposed ACP session closing** ([PR #30368](https://github.com/google-gemini/gemini-cli/pull/30368)) — adds `session/close` support and advertises the capability at initialization, letting ACP clients dispose a session before the Gemini CLI process exits.
- **Proposed abort handling for background output** ([PR #30498](https://github.com/google-gemini/gemini-cli/pull/30498), fixes #29945) — `ReadBackgroundOutputInvocation` would reject with `AbortError` on an already-aborted signal and cancel pending delays via the existing `delay(ms, signal)` helper.
- **Proposed CRLF diff normalization** ([PR #30489](https://github.com/google-gemini/gemini-cli/pull/30489), fixes #30480) — normalizes `\r\n` to `\n` before computing the `write_file` confirmation diff, execution diff and `diffStat`, matching `edit.ts`, while leaving raw content intact for `detectLineEnding`.

**Worth knowing**

- **Subagent success misreported** ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 14 comments) — the `codebase_investigator` subagent reports `status: "success"` and `Termination Reason: "GOAL"` after hitting MAX_TURNS before any analysis. Open; no fix in the data.
- **Generalist agent hangs** ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments, 8 👍) — deferring to the generalist agent hangs indefinitely, including for simple folder creation. Instructing the model not to defer avoids it.
- **Browser agent ignores settings** ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) — `settings.json` overrides such as `maxTurns` are ignored. Open, needs retesting.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- **v1.0.118-2** fixes Ctrl+R prompt history: after a search match, Up and Down now navigate history instead of applying hidden suggestions. Matters when you jump back to an earlier prompt and edit it.
- **v1.0.118-1** fixes concurrent `copilot mcp enable`/`disable` runs so changes to different MCP servers are preserved. Matters when scripting MCP config edits in parallel.
- **v1.0.117** adds `sandbox.userPolicy.network.extraCaCertificates` (user or managed settings) to trust custom CAs for sandboxed commands behind TLS-intercepting proxies, and explicit tool exposure so custom agents opt in to tools.

**Worth knowing**

- Issue [#5607](https://github.com/github/copilot-cli/issues/5607): reasoning models compact at 30–40% of the window because the context estimate keeps counting old reasoning tokens. The author reports 19 compactions in 107 minutes using a bring-your-own-key reasoning model. Open, no fix in the data.
- Issue [#5601](https://github.com/github/copilot-cli/issues/5601): editing a skill requests sandbox-bypass approval despite an explicit read-write grant for the skills directory, on 1.0.117. Open.
- Issue [#5599](https://github.com/github/copilot-cli/issues/5599): Copilot CLI 1.0.116 refuses `session.metadata.setWorkingDirectory` calls from extensions with an RPC error. Open.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## What changed

No releases in the last 24 hours, so nothing is shipped.

**Code Mode `execute` timeout** — Issue #54220 (open, reproduced) reports `execute` and plugin tool calls have no time limit in V2; one slow call blocks the session until you interrupt. No fix in the data.

**Background-only subagents** — Issue #66555 calls the removal of foreground subagent execution in PRs #63382 and #63223 a regression, causing extra parent wakeups and context pollution. Open, no fix.

**Proposed: coalesced subagent wakes** — PR #66936 would batch completed sibling wakes for nested subagents instead of one parent turn per child. In development, not released.

## Worth knowing

**Windows parallel shells fail** — Issue #66940: on 2.4.2, exactly one of two shell calls in the same turn fails with os error 5 under Store PowerShell 7. No fix in the data.

**`ask` permissions silently allowed** — Issue #66861 (closed): in 2.4.1/2.4.2, tools resolving to `ask` ran with no prompt for `shell` and `webfetch`; 2.3.2 prompted correctly.

**Esc deletes messages** — Issue #66824 (closed): in 2.4.2 TUI, interrupting with double-Esc could delete much of the session after `revert.stage`/`revert.commit` were added.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

v1.7.0 adds [terminal session resume](https://github.com/earendil-works/pi/blob/v1.7.0/packages/coding-agent/docs/terminal-setup.md#program-resume): compatible terminals can reopen the current pi session after a restart with its original profile, tool restrictions, and instructions. This matters when a terminal restart otherwise forces you to rebuild session state.

PR [#12609](https://github.com/earendil-works/pi/pull/12609) fixes exported HTML dropping the `$` from session cost ([#12608](https://github.com/earendil-works/pi/issues/12608)); `/export`, `/share`, and `pi --export` were affected.

PR [#12634](https://github.com/earendil-works/pi/pull/12634) addresses WSL detection not relying on WSL environment variables.

**Worth knowing**

Failed auto-compaction can resume work and retry indefinitely ([#12483](https://github.com/earendil-works/pi/issues/12483), 3 comments, p0). Users on 1.6.1 hit it; stop manually if you see it.

Pasting ANSI output leaves escape-sequence text in the prompt, and an unterminated bracketed paste can wedge the editor, including Ctrl+C ([#11383](https://github.com/earendil-works/pi/issues/11383), 6 comments).

Backward character jump stops at column 1 when the current line's first character matches, even if a match exists on the previous line ([#12636](https://github.com/earendil-works/pi/issues/12636)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- SDK TypeScript `sdk-typescript-v0.1.39` was released, bundling CLI version 0.28.7 built from the same branch as the SDK ([release](https://github.com/QwenLM/qwen-code/releases)). Use it when you need SDK and CLI versions guaranteed to match.
- PR #18528 (closed) makes tool-enabled streaming requests to the Model Studio OpenAI-compatible API default to `tool_stream: true` for qwen4-max, qwen3.8-max, qwen3.8-flash and qwen3.7-plus. Without it, Qwen models on DashScope withheld tool arguments whose schema declares an object, so tool calls stalled. Check `QwenLM/qwen-code` PR #18528 for whether it landed in your version.
- PR #18535 (closed) fixes session deletion on unreadable worktree sidecars: dangling symlinks, symlink loops and unreadable parent directories were mistaken for missing sidecars, silently removing the transcript while leaving the checkout behind.

**Worth knowing**

- Issue #18489 [P1, open] reports `qwen serve` v0.28.7 freezing the event loop 6–8 minutes on a daemon with 23 workspaces, caused by O(N²) `regularFiles.includes` over 300k-file `.qwen` snapshots. No fix in the data.
- Issue #17489 [open] reports Windows project settings created after startup (for example via `qwen mcp add --scope project`) are never hot-reloaded, so the session never connects the server. No fix in the data.
- Issue #18492 [open] reports the Ink TUI loses checked options and typed text when you scroll away from a pending question; the CLI still waits for your answer. No fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*