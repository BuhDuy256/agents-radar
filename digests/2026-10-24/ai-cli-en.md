# AI CLI Tools Community Digest 2026-10-24

> Generated: 2026-10-24 01:01 UTC | Tools covered: 7

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

### md2video-audio — Markdown to narrated video
Compiles Markdown documents into MP4 videos with human-like voiceovers, using Marp for slides. Open as anthropics/skills PR #1703; the author describes it as zero-cost.

### notion-spec-to-implementation — specs into Notion tasks
Turns product or tech specs into Notion tasks with implementation plans, acceptance criteria, and progress tracking. Open as anthropics/skills PR #1245, which also bundles a quantitative-resume-auditor skill.

### proofcore-contract-auditor — smart contract static analysis
Performs automated static analysis of Solidity and Rust contracts and anchors audit proofs onto the TON Blockchain via ProofCore's Merkle protocol. Open as anthropics/skills PR #1771.

**Open requests**
Skills cannot be shared org-wide in Claude.ai: users download a .skill file and colleagues upload it manually through Settings > Capabilities. Open as anthropics/skills Issue #228, with 8 👍.

---

**What changed**

- v2.1.310 adds the Monitor tool and plugin monitors on Bedrock, Vertex, and Foundry, including when telemetry or nonessential traffic is disabled. Long foreground sleeps are now blocked in those environments, so polling-style scripts need rewriting.
- The same release fixes requests failing behind gateways and compatible servers that reject the `effort-2025-` parameter. Self-hosted and proxied setups that returned errors after upgrading should retest on v2.1.310.

**Worth knowing**

- Issue #93482 (Windows, Cowork): `device_commit_files` reports success on overwrites while the on-disk content lags one commit behind, with a fresh mtime. Silent stale writes, so verify file contents rather than trusting the success message. Open, 22 comments, no fix in the data.
- Issue #76187 (Windows, Cowork): project context folders never mount in new sessions and the Add-folder dialog cannot confirm, reproduced on two machines since the July 8 update. Open, 18 comments, no fix.
- Issue #78604 (macOS): LSP plugins installed before the `lspServers` manifest-format change load as silent empty shells, and `plugin update` reports them up-to-date. Reinstall rather than update. Open, 5 comments.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- **Reusable command presets.** rust-v0.164.0 adds ten numbered `/presets` slots for saving reusable prompts and slash commands, with a keyboard menu for quick access (#54380, #54381). This saves retyping commands you run often; it matters for repetitive workflows.
- **Inline command arguments.** The same release lets you set model, reasoning effort, speed, and permission profiles directly with inline `/model` and `/permissions` arguments (#54378, #54383). You configure a session without leaving the composer.
- **Install script 404.** `curl -fsSL https://chatgpt.com/codex/install.sh` returns 404, reported for both CLI and app users (#56616, #56607). No fix appears in the data; users relying on the install/update link are affected.

**Worth knowing**

- **Windows Desktop organization-settings failure.** Codex in the ChatGPT Windows app stops with "Unable to load organization settings" before the composer loads, so no session starts (#48324, 48 comments; also #56620). Open, no fix in the data.
- **Safari Codex Web submission failure.** Safari 27 on iPadOS and macOS throws "Can't find variable: DisposableStack" on prompt submission (#55271, #55361, both CLOSED). A fix appears in the data.
- **Windows sandbox command failures.** Codex App sandbox fails to execute commands with HRESULT 0x80070020 (#55230) and code review fails to load (#51218). Both open, Windows only.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

Gemini CLI shipped nightly v0.67.0-nightly.20261023.ga713410ab. It fixes extended token usage metadata reporting in the A2A server and core ([PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834)), and ensures model turns with function calls receive thought signatures.

Two proposed fixes target daily friction. [PR #29904](https://github.com/google-gemini/gemini-cli/pull/29904) bounds inline history re-rendering after terminal width changes, reducing repeated output left by resize refreshes. [PR #29859](https://github.com/google-gemini/gemini-cli/pull/29859) keeps executing subagent tool calls visible in the task tree instead of showing an empty list. Both remain open, not released.

[PR #29899](https://github.com/google-gemini/gemini-cli/pull/29899) converts Claude Code hook timeouts from seconds to milliseconds during `gemini hooks migrate --from-claude`, fixing hooks that terminated 1,000× early (e.g. 30ms instead of 30s). It is closed.

**Worth knowing**

The generalist agent can hang indefinitely on simple tasks like folder creation ([issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments). Instructing the model not to defer to subagents avoids it; no fix appears in the data.

Agent memory and skills go unused: Gemini rarely invokes custom skills or subagents without explicit instruction ([issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)).

Gemini CLI returns a 400 error with more than 128 tools enabled ([issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)); the reporter expected automatic tool limiting.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

Assisted Permissions now work without enabling experimental mode (v1.0.104-0). You can rely on assisted permission handling in normal sessions instead of opting into experimental flags first.

Auto model selection no longer fails every turn when your saved Auto preference disappears; it falls back to the default preference (v1.0.104-0). This matters if you switch accounts, models, or configurations where the previously saved Auto choice is no longer offered.

Version v1.0.104-1 lists fixes and changes without further detail in the data.

**Worth knowing**

Trusted folders silently auto-approve shell execution in manual mode, even for scripts, sqlcmd, and curl, because path-based gating cannot see what a command does (Issue #5232, open, 2 comments). No fix appears in the data.

Interactive autopilot stops after 600 seconds while a background subagent is still running, a regression since 1.0.102 (Issue #5223, open). The error message points to `COPILOT_TASK_WAIT_TIMEOUT_SECONDS` as a workaround; no fix in the data.

Subagents started in the same turn as an approved `exit_plan_mode` get none of the built-in tools, a regression after 1.0.95 (Issue #5243, open). No fix in the data.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases shipped in the last 24 hours. Changes below are proposed PRs, not shipped features.

PR #58562 (with #58565 TUI and #58566 app) records reported cost and Go allowance, so a Go session costing $0 shows remaining allowance instead of a bare zero. It covers every protocol OpenCode's gateway speaks, not just Chat Completions as in #52629.

PR #58567 offers GPT-Live through an OpenCode Console connection without an OpenAI key. It is a follow-up to #58461, letting the iOS app's Server Voice picker list Console-only servers.

PR #58568 patches an `effect` bug where `Effect.fn` stack frames kept call arguments alive. A server heap snapshot at 11.7 h uptime held 117 MB of message history this way.

**Worth knowing**

Windows spawns a visible console window per process — about one per second, mostly `git.exe` — because spawn omits `CREATE_NO_WINDOW` (Issue #52266, open, re-report of #22414 and #31629).

A symlinked `~/.config/opencode` breaks the config file watcher with `inotify_add_watch ... Not a directory`, so `opencode.json` edits never hot-reload (Issue #54933, open).

Several users report "Free usage limit reached" on their first free-model request, including on v2.1.3 (Issues #58284, #58285, #58550). #58284 is closed; the others remain open.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24 hours. Merged fixes landed via PRs:

- **Kimi Coding K3.1 Pro models** — PR #11355 (open) derives the K3 wire preset from parsed effort metadata, so K3.1 Pro and Highspeed expose low/high/max and send `reasoning_effort`. Proposed, not merged.
- **`pi.exec()` UTF-8 corruption** — PRs #11330 and #11326 (both closed) give stdout and stderr separate `StringDecoder` instances, fixing `"你好"` returning as `"���好"` when a character splits across chunks (issue #11312).
- **Fork speed on large sessions** — PR #11288 (closed) writes a forked session through one file descriptor instead of one `appendFileSync` per entry. Forking a 3,322-entry session previously took over 30 seconds (issue #11253).

**Worth knowing**

- **openai-codex stalls** — issue #4945 is still open with 87 comments and 35 👍. The TUI hangs on `Working...` with no output or error; Escape is the only recovery.
- **Anthropic tool-call corruption** — issue #10074 (open, 11 comments) reports `edit` calls on Korean text silently accepting dropped `\uXXXX` escapes, corrupting files.
- **Socks proxy crashes startup** — issue #11195 reports `ALL_PROXY=socks5h://...` fails with `Invalid URL protocol`; PR #11341 (closed) adds a clear error instead.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

v0.26.0-nightly.20261023.5a0be33432 adds daemon token persistence ([PR #15023](https://github.com/QwenLM/qwen-code/pull/15023)). Saved daemon tokens can now survive a restart, so you reconnect to a remote `qwen serve` without re-authenticating. This is a nightly build, not a stable release.

The `qwen update` command may gain `--target-version <version>` to install an exact release without npm discovery ([PR #11486](https://github.com/QwenLM/qwen-code/pull/11486), still open). Useful for pinning standalone installs; not yet merged.

**Worth knowing**

A long-running TUI session on macOS 26.5.1 with Qwen Code 0.26.0 crashed with a V8 out-of-memory abort ([issue #15344](https://github.com/QwenLM/qwen-code/issues/15344)). No fix in the data; 5 comments so far.

In VS Code, the `qwen serve` daemon heap grows unbounded until it dies at the ~4 GB runtime cap ([issue #15071](https://github.com/QwenLM/qwen-code/issues/15071)). Affects long daemon sessions; no fix listed.

Headless runs can exit 0 with no output when the response is truncated by the output limit ([issue #15328](https://github.com/QwenLM/qwen-code/issues/15328)). Reported on 0.23.4, so scripts may silently drop work.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*