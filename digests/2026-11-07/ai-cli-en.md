# AI CLI Tools Community Digest 2026-11-07

> Generated: 2026-11-07 05:48 UTC | Tools covered: 7

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

**Claude Code Skills — 2026-11-07**

**Open requests**

Security: community skills distributed under the `anthropic/` namespace can impersonate official Anthropic skills, letting users grant elevated permissions to skills they believe are official (anthropics/skills Issue #492). A separate report says the `claude-api` skill injects roughly 156k tokens in a single tool call, exhausting the context window immediately (anthropics/skills Issue #1487).

---

**What changed**

- v2.1.319 changes auto mode when telemetry or feature flags are off, including behind LLM gateways. Calls the server can't check are now asked about or denied, with no fallback to the built-in classifier. Set `CLAUDE_CODE_AUTO_MODE_SERVER=0` to keep the old classifier. Bedrock, Vertex and Foundry are unchanged. Matters if you run auto mode behind a gateway.

**Worth knowing**

- Issue #107757 (99 comments, 699 👍) reports the `User-Agent` header leaks the user's email to third parties during web searches. The reporter wants the field removed, not made opt-in/opt-out. Open, no fix in the data.
- Issue #105334 reports the macOS desktop app declines MCP `elicitation/create` requests without showing them, despite advertising elicitation support; the CLI on 2.1.311 behaves differently. Open.
- Issue #106714 reports idle compaction (since 2.1.299) runs silently after ~54 minutes of silence, even far from the context limit. The author asks for a first-time prompt and a notice. Open at 2.1.316.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- Released `rust-v0.169.0-alpha.2` ([release](https://github.com/openai/codex/releases)). Alpha canary only; no notes beyond the version string.
- PR [#60041](https://github.com/openai/codex/pull/60041) requires explicit project trust in non-interactive runs, so `codex exec --sandbox workspace-write` keeps untrusted config and MCP servers disabled unless you pass `--trust`. CLOSED, merged status unconfirmed.
- PRs [#60031](https://github.com/openai/codex/pull/60031)–[#60032](https://github.com/openai/codex/pull/60032) unify TUI status-line layout and let extension status content use up to four footer rows. CLOSED.

**Worth knowing**

- Issue [#60047](https://github.com/openai/codex/issues/60047): macOS desktop `26.1103.32239` opens empty and the composer is unresponsive for SSH remote projects. Reported as a P0 regression; 2 comments, no fix in the data.
- Issue [#59013](https://github.com/openai/codex/issues/59013): Windows 11 Codex CLI 0.166.0 TUI accepts no keyboard input at startup. Users affected are Windows CLI users; no fix in the data.
- Issue [#59344](https://github.com/openai/codex/issues/59344): Windows desktop `26.1029.7803.0` fails workspace routing with HTTP 432 and `account/read -32603`, persisting after OAuth login. No fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24h. Active work continues on agent and core fixes.

- PR #30020 (open) drops tool calls streamed by failed attempts on mid-stream retry. Today both attempts' `ToolCallRequest` events execute, so a side-effecting command can run twice. Matters when network retries hit shell commands. → google-gemini/gemini-cli/pull/30020
- PR #30185 (open) blocks recursive interactive `gemini` sessions spawned inside Shell Mode (`!`) and the `[Shell]` tool. Matters if you launch gemini from gemini by accident.
- PR #30053 (open) fixes `Background PIDs: NaN` when the background PID file has a non-numeric line. Matters for background shell tracking.

**Worth knowing**

- Issue #21409 (open, 8 comments, 👍 8): the generalist agent hangs indefinitely on simple tasks like folder creation. Workaround per the reporter: instruct the model not to defer to subagents. No fix shipped.
- Issue #21968 (open, 7 comments): Gemini rarely invokes custom skills or subagents unprompted; explicit instruction is needed. Anecdotal per the author.
- Issue #24246 (open): 400 error when more than 128 tools are enabled. No fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.108-1 restarts a running local MCP server after `/cd` when the sandbox is on. The server now follows the new directory's denied paths instead of keeping the previous directory's. Matters when you switch projects mid-session with sandboxing enabled.
- v1.0.108-1 fixes PDF attachments on Grok 4.7 and 4.6: they fall back to file references instead of failing the turn.
- v1.0.108-0 adds `/index` commands and enables managed shared tgrep indexing by default for eligible repositories. Also adds `sandbox.userPolicy.filesystem.enumeratePaths` in `settings.json` for Windows enumerate-only directory grants.

**Worth knowing**

- Issue #5375 asks for a way to disable built-in slash commands, because a custom review skill conflicts with the built-in `/review`. No fix in the data.
- Issue #5378 requests keyboard navigation across the chat timeline, not just the prompt editor. Opened 2026-11-07, no comments.
- Issue #5370 reports agent output withheld until the next user turn when long shell commands run in the background under Fusion/Auto mode. Open, one comment.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## What changed

**v2.2.6 adds shared MCP connections.** Enabling pooling for an MCP server shares one connection across projects with the same setup, so you run fewer processes and start faster ([#61185](https://github.com/anomalyco/opencode/pull/61185)). The same release adds GUI plugin themes and new slots, per the release highlights.

**Windows shell output broke in v2.2.6.** When `"shell": "pwsh"` resolves to the Microsoft Store app-execution alias, every command returns `exit=0` with empty output ([#62512](https://github.com/anomalyco/opencode/issues/62512)). PR [#62522](https://github.com/anomalyco/opencode/pull/62522) is closed but the note lists it as a fix, not a release.

**Compaction can drop tool results.** When auto compaction starts right after a model step ending in tool calls, the first post-compaction request omits that call's result, so OpenAI rejects it with "No tool output found for function call" ([#62481](https://github.com/anomalyco/opencode/issues/62481)).

## Worth knowing

**Store PowerShell 7 users may see empty shell output** until a fixed build ships. Watch [#62512](https://github.com/anomalyco/opencode/issues/62512).

**Free-tier reset problems are the busiest thread.** Issue [#59387](https://github.com/anomalyco/opencode/issues/59387) has 318 comments covering free-limit errors and resets that never happen.

**Permission rules depend on spelling.** A shell `deny` rule matches the raw command span, so wrappers such as `bash -c` bypass it ([#62513](https://github.com/anomalyco/opencode/issues/62513), [#58775](https://github.com/anomalyco/opencode/issues/58775)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## What changed

**Ctrl+o now expands `!`/`!!` output run while the agent streams.** The output box in the pending-messages area stayed collapsed before (PR #11886, issue #11875). It matters when you shell out mid-response and need to read the result.

**Prompt template arguments keep apostrophes.** `/ask why doesn't the user's cache work` was sent as `why doesnt the users cache work` (PR #11873, issue #11861). Affects any `/command` argument containing `'` or `"`.

**Edit no longer rewrites line endings of untouched lines.** In mixed CRLF/LF files, editing one line changed bytes elsewhere (PR #11751, issue #8544). Encoding handling for non-UTF-8 and UTF-16 files is a separate open PR (#11894).

## Worth knowing

**`StringEnum` in pi-ai 1.5.0 derives `unknown` for tool parameters.** `registerTool` types break at compile time (issue #11869, open, p0). Affects SDK users registering tools with enum fields. No fix in the data.

**`Harness.close()` does not release pi-ai provider session resources.** A standalone Node process kept a WebSocket and its five-minute idle timer alive (issue #11676, open). Affects embedded agents using `pi-durable`.

**`openai-completions` reports 272K context for `gpt-6.1-sol` despite a 500K account catalog.** Smaller compaction budget than the server advertises (issue #11021, open, 8 comments). Affects ChatGPT-authenticated `openai` users.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## What changed

**v0.26.9 shipped.** The release adds Skill ZIP uploads, daemon APIs, TypeScript SDK support, bulk activation, and recovery protections. It lists no known breaking changes. Source: [v0.26.9](https://github.com/QwenLM/qwen-code/releases).

**Proposed: idle-time auto-compaction.** Issue [#16508](https://github.com/QwenLM/qwen-code/issues/16508) proposes running chat compression while the user is away instead of mid-turn, so compaction latency never lands inside a visible turn.

**Proposed: pre-flight write_file size check.** Issue [#16417](https://github.com/QwenLM/qwen-code/issues/16417) asks Qwen Code to reject an oversized `write_file` before generating it, rather than after truncation. Today the attempt is lost and nothing is written.

## Worth knowing

- Sessions become unopenable once the `.jsonl` transcript exceeds a hardcoded 256 MiB index limit ([#13113](https://github.com/QwenLM/qwen-code/issues/13113), 11 comments). Affects long sessions touching many files.
- Headless `-p` auto-memory never saves: an implicit edit/write_file deny overrides the memory agents' allow ([#15597](https://github.com/QwenLM/qwen-code/issues/15597), 9 comments).
- On Windows, the model assumes a POSIX shell because the prompt never names `cmd.exe` ([#15310](https://github.com/QwenLM/qwen-code/issues/15310), 6 comments).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*