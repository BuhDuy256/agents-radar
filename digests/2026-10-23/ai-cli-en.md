# AI CLI Tools Community Digest 2026-10-23

> Generated: 2026-10-23 07:53 UTC | Tools covered: 7

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

### mcp-builder — supports mcp>=2 HTTP client imports
Fixes #1668 by importing `streamable_http_client` (renamed from `streamablehttp_client` in mcp 2.0.0) and passing custom HTTP headers through `create_mcp_http_client` / `http_client` instead of as a direct kwarg. Open as anthropics/skills PR #1742.

### skill-creator — isolates trigger evals, handles Windows and runtime failures
Prevents false misses and invalid scores by giving each worker its own command probe, avoiding `select()` on subprocess pipes on Windows, and reclassifying runtime failures so they no longer count as non-triggers that pass negative examples. Open as anthropics/skills PR #1298.

### proofcore-contract-auditor — smart contract notarization
Performs automated static analysis of Solidity and Rust contracts and anchors audit proofs to the public TON Blockchain using ProofCore's zero-storage Merkle protocol. Open as anthropics/skills PR #1771.

**Open requests**

Issue #492 (anthropics/skills Issue #492) reports community-made skills distributed under the `anthropic/` namespace impersonating official ones, which the author says lets users grant elevated permissions to skills they believe are official.

---

**What changed**

v2.1.309 fixes sandboxed Bash commands on macOS and Linux that ran the shell's startup files outside the sandbox before each command. The release also fixes macOS `denyWrite` glob patterns that failed to apply at a path's real location when reached through a symlink. Both matter if you rely on sandbox isolation for untrusted or automated Bash runs; the symlink fix closes a path where a deny rule could be bypassed.

**Worth knowing**

Windows/Git Bash halves backslashes in Bash tool commands — `n` backslashes arrive as `ceil(n/2)`, and quoting cannot prevent it (open, #85856). Affects Windows developers passing paths or regex through the Bash tool.

Background Bash tasks cross-contaminate between concurrent sessions on Windows PowerShell: two sessions mixed up tasks and ran them in each other's terminal (open, #104519, v2.1.309). Avoid concurrent Bash sessions until fixed; no fix in the data.

Desktop auto-update restart archives active Remote Control sessions and does not restore them (open, #103005). Affects anyone running Remote Control through the desktop app.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## What changed

`rust-v0.164.0` adds ten numbered `/presets` slots for saving reusable prompts and slash commands, with a keyboard menu for quick access (#54380, #54381). You can now set model, reasoning effort, speed, and permission profiles inline through `/model` and `/permissions` arguments instead of opening menus (#54378, #54383).

## Worth knowing

Quota depletion remains tracked in issue #41220 (71 comments, open since 2026-08-27): users report subscription quota or purchased credits draining faster than their baseline or local token evidence predicts.

"Selected model is at capacity" persists across Desktop, CLI, and Cloud Web (#43375, #55260). A proposed fix, issue #50238, requests a persistent cancellable capacity queue instead of interrupting long-running work.

The VS Code model picker omission is closed (#49464); the macOS Desktop equivalent (#51096) is also closed. Issue #29343 (55 comments) reports the Chrome plugin refusing to load certain sites.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- Nightly **v0.67.0-nightly.20261023.ga713410ab** fixes extended token usage metadata reporting and ensures all model turns with function calls receive thought signatures ([release](https://github.com/google-gemini/gemini-cli/releases)). Matters if you parse per-turn token usage or rely on thought signatures across tool calls.
- Proposed fix #29890 restores workspace directories only after a resumed chat succeeds ([PR #29890](https://github.com/google-gemini/gemini-cli/pull/29890)). Currently, a failed resume leaves saved directories in your workspace context; the fix confines that to successful resumes. Not yet released.
- Proposed fix #29767 bounds MCP `tools/list` discovery to a 60s default instead of the inherited 10-minute tool-call timeout ([PR #29767](https://github.com/google-gemini/gemini-cli/pull/29767)). Matters when an MCP server stops answering discovery.

**Worth knowing**

- Issue #21409 (8 comments): the generalist agent hangs indefinitely on simple tasks like folder creation; one user reports waiting up to an hour. No fix in the data.
- Issue #21968 (7 comments): the author reports Gemini rarely invokes custom skills and sub-agents unless explicitly instructed. No fix in the data.
- Issue #24246: a 400 error appears when more than 128 tools are available. No fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

v1.0.103 (2026-10-22) fixes copying: clicking a completed response code block now copies its original code when enabled. ACP sessions honor saved sandbox settings and `--sandbox`/`--no-sandbox` flags, including on resume. Cloud replies keep full text when the CLI reconnects after a dropped connection.

**Worth knowing**

Trusted folders silently auto-approve shell execution in manual permission mode, even for scripts, `sqlcmd` and `curl` with unpredictable side effects ([#5232](https://github.com/github/copilot-cli/issues/5232), updated 2026-10-23, 2 comments, open). Path-based gating cannot determine what a command will do.

Secret redaction over-redacts legitimate content, such as spec files documenting `${env.AUTH_TOKEN}` interpolation ([#4065](https://github.com/github/copilot-cli/issues/4065), 3 comments, open).

A 50-image session limit causes a full cache refill when the 51st image evicts the first, making long sessions expensive on 1.0.103 ([#5238](https://github.com/github/copilot-cli/issues/5238), open).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

v1.19.4 upgraded the bundled Bun runtime to 1.4.4, bringing security fixes for Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket and `fetch`, plus root certificates updated to NSS 3.131.1. This matters if you rely on any of those transports.

PR #58374 (open) would make OpenCode wait for starting MCP servers before the first request, fixing a race where `McpTool.flush` skipped servers still connecting. Not yet released.

PR #58370 (open) proposes accepting a pasted redirect URL for MCP OAuth, which would unblock sign-in over SSH, containers, or a remote server. In development.

**Worth knowing**

Issue #49827 (open, 17 comments): after upgrading from V1.18.31 to V2.0.8, sessions created in non-git directories under the V1 `global` project become invisible in the TUI session picker, because V2 creates a per-directory project. History is still on disk. No fix in the data.

Issue #58175 (open, 5 comments): since 2026-10-17, `opencode/deepseek-v4.1-flash` prompts above roughly 256k tokens stop reusing the prompt cache, so the conversation is re-billed at the uncached input rate each turn. No fix listed.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

- HTML `/export` no longer blanks on long sessions. Three recursive tree walks (`sortChildren`, `mapNodes`, `markActive`) overflowed the call stack at ~6k+ entries; PR #11293 and PR #11275 replace them with explicit stacks. Users who export long sessions get a rendered page instead of just the filter bar.
- System messages now render in HTML export. PR #11290 shows the leading system message as the system prompt and tool list, and later ones as section updates, fixing #11261. Matters if you export sessions to check what prompt the agent actually ran.
- macOS bash abort race fixed: killing the foreground child could let the shell run the next command in `a; b`. PR #11289 signals the shell group first (#11252). Affects interrupted multi-command calls under CPU load.

**Worth knowing**

- `pi.exec()` corrupts UTF-8 split across stdout chunks — "你好" returned as "���好" — because each chunk is decoded independently (#11312). Closed, no fix linked in the data.
- TUI full re-renders cause scroll and typing lag past roughly 800 messages (#9807, 5 comments, open).
- Symbols leak into input on Windows terminals over SSH under client CPU load (#11086, prio:p0, open).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

**v0.26.0-nightly.20261022.bf66a26c97** adds daemon token persistence to `serve` ([PR #15023](https://github.com/QwenLM/qwen-code/pull/15023)). A daemon restart now keeps its tokens instead of dropping them, so long-running `qwen serve` setups need one less re-auth step.

`todo_write` is proposed for Managed Agent Workspace Sessions through new tool profiles `hosted-workspace-files/3` and `hosted-workspace-shell/3` ([PR #15089](https://github.com/QwenLM/qwen-code/pull/15089), issue [#15076](https://github.com/QwenLM/qwen-code/issues/15076)). Existing `/1` and `/2` sessions keep their current tools; only sessions pinned to the new profiles gain the tool.

A proposed fix replaces synthesized tool-result placeholders with late real results ([PR #15308](https://github.com/QwenLM/qwen-code/pull/15308)). It targets sessions where a model stream dies after tool-call chunks, causing an orphan-repair pass to write a fake "execution result unavailable" response.

**Worth knowing**

Issue [#15297](https://github.com/QwenLM/qwen-code/issues/15297) reports Qwen Code 0.26.0 dropping tool output about once per 30–40 calls on Windows: the tool runs with `status: success`, but no `functionResponse` reaches the model, forcing a re-read. No fix in the data.

Issue [#15165](https://github.com/QwenLM/qwen-code/issues/15165) reports shell safety classification on Node v24.16.0 triggering a ~1.6 GiB transient WASM allocation. Reported for 0.25.2 on Linux x64 with 6 comments; no fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*