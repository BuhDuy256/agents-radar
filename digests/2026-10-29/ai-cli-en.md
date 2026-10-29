# AI CLI Tools Community Digest 2026-10-29

> Generated: 2026-10-29 05:36 UTC | Tools covered: 7

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

## Skills

**mcp-builder fix — support mcp>=2 HTTP transport — open**
Handles MCP servers on mcp>=2, where `streamablehttp_client` was renamed to `streamable_http_client` and custom headers moved to `create_mcp_http_client`. Reach for it when building MCP connections that must accept headers or run on mcp 2.0 and later; open, per anthropics/skills PR #1742.

**webapp-testing fix — remove shell=True from server startup — open**
Closes a command-injection risk (CWE-78) in `skills/webapp-testing/scripts/with_server.py`, where server commands were spawned through a system shell to allow `cd <dir> && <command>` chains. Reach for it when the webapp-testing skill starts local servers from agent-supplied command strings; open, per anthropics/skills PR #1980.

**pyxel skill — retro game development in Python — open**
Guides creating, debugging, and verifying Pyxel retro games, including headless input-driven runs, direct frame inspection, and task-specific state checks. Reach for it when a task involves building or testing a Pyxel game; open, per anthropics/skills PR #525.

**Open requests**
Skills cannot currently be shared inside an organization in Claude.ai: users download the `.skill` file, send it through Slack or Teams, and colleagues upload it manually under Settings > Capabilities. Those asking for this want a shared skill library or a direct sharing link, per anthropics/skills Issue #228.

---

**What changed**

No releases published in the last 24h, so nothing shipped. Two PRs are open, both proposed and unmerged: PR #32755 adds an `edit-verifier` plugin using a PostToolUse hook, which would catch silently failed Edit calls — the author states Claude currently assumes every edit succeeded. PR #32753 replaces stale `docs.anthropic.com` and `docs.claude.com` links with `code.claude.com` across 12 files. Both date from March 2026 and remain unreviewed.

**Worth knowing**

Usage accounting complaints cluster today. Issue #97074 (59 comments, 102 👍) reports headless `claude -p` via entrypoint `sdk-cli` consumes about 1.8× more of the 5-hour window per token than interactive `cli` on the same workload. Issues #102667 and #105240/#105295 report weekly limits depleting faster since mid-October; #105125 reports Opus weekly usage at 72% after two days. These are user reports, not confirmed fixes.

On macOS, issue #105847 reports TCC folder permissions are keyed to the per-version binary path, so every native auto-update re-prompts for Downloads, Desktop and Documents access. Issue #105861 describes the related failure: version cleanup deletes a build that running sessions still execute, because the lock only protects the first process.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

Two alpha releases shipped: `rust-v0.166.0-alpha.6` and `rust-v0.166.0-alpha.5.1`. These are pre-release builds, not a stable version.

Several sandbox and MCP fixes are proposed, not released. PR #57985 skips read-only volume-root expansion in the MXC sandbox. PR #57978 adds per-chat leases for shared MCP connections. Both are marked CLOSED.

PR #57859 proposes extending the provider OAuth sign-in timeout from three to ten minutes, giving users more time to finish browser sign-in including MFA.

**Worth knowing**

Windows users report side chat is missing after the 26.1023.51421 update: Ctrl+Alt+S and `/side` stop working. Issue #57668 is CLOSED; issue #57988 remains OPEN.

Issue #52873 (OPEN, 31 comments) reports dot cannot read user-created Codex threads, failing with "unsupported placement format version". No fix in the data.

Issue #38162 (OPEN, 21 comments) reports local MCP tools are discovered but not exposed to Chat sessions on Windows. No fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24 hours. Changes below are proposed open PRs, not shipped features.

- **MCP tool pagination** — PR #29843 (open) wraps `discoverTools` in `packages/core/src/tools/mcp-client.ts` to follow the `nextCursor` token from `tools/list`. It stops MCP servers with many tools from silently dropping everything past page one (fixes #29825). Matters if you connect servers exposing more tools than one page.
- **Retry deduplication** — PR #30020 (open) makes `GeminiChat` drop tool calls streamed by a failed attempt during a mid-stream retry. Previously both the failed and successful attempts' calls executed, so a side-effecting command could run twice.
- **Session history preservation** — PR #30019 (open) stops tool-output masking from merging the user's first prompt into adjacent turns, so resuming a masked session keeps that prompt.

**Worth knowing**

- Issue #21409 (open, p1, 8 comments, 8 👍): the generalist agent hangs indefinitely when invoked; the author reports waiting up to an hour. Instructing the model not to defer to subagents avoids it. No fix in the data.
- Issue #21968 (open, p2, 7 comments): the author reports Gemini rarely uses custom skills and subagents unless explicitly told to.
- PR #29989 (open, p2) proposes fixing naive `\n` escaping that corrupts escape sequences in file edits and tool text output.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

No releases in the last 24h; the install-script fixes below are still proposed PRs, not shipped behavior.

- PR #5093 proposes verifying the checksum entry that matches the downloaded tarball, instead of validating `SHA256SUMS.txt` with `--ignore-missing`, which can pass vacuously. It matters if you install via the curl/wget script.
- PR #2565 proposes guarding against duplicate PATH entries on reinstall, since the current `command -v copilot` check needs a shell restart to reflect the new install.
- PR #1598 proposes a trap to clean up the `mktemp -d` temp directory when `install.sh` exits early under `set -e`.

**Worth knowing**

- Issue #5236 (Windows): the Entra broker token cache stays 0 bytes after MCP sign-in, so every new process re-prompts for account selection. Three comments; no fix in the data.
- Issue #5254: a resumed 1.0.103 session grew to 37.3 GiB physical footprint after roughly 6h19m of parallel-agent work. Two comments; no fix in the data.
- Issue #5281 (Windows): the shell command runner does not inherit PowerShell environment variables, breaking commands that rely on variables such as `GITHUB_PERSONAL_ACCESS_TOKEN`.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

- v2.2.1 adds goal mode: run `/goal <objective>` in the TUI or Desktop, and the session continues until a reviewer confirms the objective is met. Control it with `/goal pause`, `/goal resume`, or `/goal clear` ([#59437](https://github.com/anomalyco/opencode/pull/59437)). It matters when a task should run past a single turn without you re-prompting.
- v1.19.5 fixes failed TUI worker requests, which now return an error instead of leaving the caller hanging ([#54936](https://github.com/anomalyco/opencode/pull/54936), by @Nowaker).
- process-daemon v0.3.2 ships opencode-pty 0.3.2 (protocol 7), published to npm as @opencode/pty@0.3.2.

**Worth knowing**

- OpenCode 2.2.0 reportedly crashes immediately after updating from 2.1.4, failing with `UnknownError: An error occurred in Effect.tryPromise`. No fix appears in this data ([#59684](https://github.com/anomalyco/opencode/issues/59684)).
- A free-tier problem thread covers errors like "Free usage exceeded" and reset timers that never reset. It has 80 comments ([#59387](https://github.com/anomalyco/opencode/issues/59387)).
- A request to sandbox the agent and restrict file access outside the working directory is still open with 105 comments ([#2242](https://github.com/anomalyco/opencode/issues/2242)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24h; the items below are issue and PR activity, not shipped behavior.

- `pi.exec()` gained a proposed output cap. PR [#11546](https://github.com/earendil-works/pi/pull/11546) closes [#11360](https://github.com/earendil-works/pi/issues/11360), where unbounded stdout/stderr accumulation crashes the process with `RangeError: Invalid string length` past V8's ~536M-character limit. The cap defaults to the smaller of 256 MiB and the runtime string limit, and returns `truncated: true` with a nonzero exit code.
- `stripAnsi` had a proposed fix for private-parameter CSI sequences. PR [#11543](https://github.com/earendil-works/pi/pull/11543) addresses [#11377](https://github.com/earendil-works/pi/issues/11377): `ESC[<35;59;1M` mouse reports left `35;59;1M` as text in tool output.
- Image resize returns oversized PNGs. Issue [#11550](https://github.com/earendil-works/pi/issues/11550) reports that `resizeImageInProcess` picks the first candidate under `maxBytes`, and PNG is always first, so a JPEG-sized photo may ship as a ~10x larger PNG.

**Worth knowing**

- A saved default model missing from the catalog is silently replaced by a fallback. Issues [#10812](https://github.com/earendil-works/pi/issues/10812) and [#9884](https://github.com/earendil-works/pi/issues/9884) describe sessions starting on `deepseek/deepseek-v4-pro` instead of the configured model, with no warning. No fix in the data.
- `pi.exec("npm", …)` fails on Windows. Issue [#10616](https://github.com/earendil-works/pi/issues/10616) reports exit 1 with empty stdout for `.cmd` commands; the same command works through the bash tool.
- `resizeImage` resolves null in compiled Bun binaries. Issue [#10645](https://github.com/earendil-works/pi/issues/10645) (closed) covers omitted image attachments in `v0.87.1` and `v1.0.4`.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- Desktop v0.26.3 adds session permission rules and Auto approval to managed sessions ([#15448](https://github.com/QwenLM/qwen-code/pull/15448)), letting managed desktop users pre-approve session actions instead of confirming each one. Use it when a session runs long unattended.
- v0.26.3-nightly.20261028.ca204559a7 fixes config reporting for controls that were silently dropped ([#15794](https://github.com/QwenLM/qwen-code/pull/15794)). Settings that previously vanished without a warning now surface in the report.
- Generated UI cards now keep inputs and state across navigation and split views, show live views after the first calculation, and render only for clients that support MCP Apps ([#15611](https://github.com/QwenLM/qwen-code/pull/15611), [#15787](https://github.com/QwenLM/qwen-code/pull/15787)).

**Worth knowing**

- MCP servers with duplicate tool names are discarded whole, and a second, misleading "no tools" error follows. Reported against 0.26.2 on macOS; no fix in the data ([#15741](https://github.com/QwenLM/qwen-code/issues/15741)).
- The VS Code companion's `writeCodingPlanConfig` and `writeModelProvidersConfig` overwrite the entire `settings.model` object, wiping sibling keys such as `baseUrl` and `reasoningEffort` ([#15822](https://github.com/QwenLM/qwen-code/issues/15822)).
- SDK abort or close can leave the relaunched CLI worker process running ([#13016](https://github.com/QwenLM/qwen-code/issues/13016)). Open, P1, no fix listed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*