# AI CLI Tools Community Digest 2026-11-02

> Generated: 2026-11-02 05:51 UTC | Tools covered: 7

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

**mcp-builder — update to `mcp>=2` HTTP clients (PR #1742, open)**
The skill's `connections.py` script breaks on `mcp>=2.0.0` because `streamablehttp_client` was renamed to `streamable_http_client`, and custom headers now go through `create_mcp_http_client` instead of a direct keyword argument. The pull request, open and unmerged, updates the script to match the new names.

**skill-creator — trigger eval isolation and Windows fixes (PR #1298, open)**
Trigger evaluation can report false misses: per-worker command probes compete, `select()` on subprocess pipes fails on Windows, and unrelated tools stop the scan. It also counts runtime failures as non-triggers, which makes negative examples pass and misleads optimization. The pull request is open.

**webapp-testing — remove `shell=True` from `with_server.py` (PR #1980, open)**
Server commands were spawned with `subprocess.Popen(..., shell=True)` to support `cd <dir> && <command>` chains, which lets unsanitized user or agent command strings reach a system shell. This is command injection, CWE-78. The pull request is open and unmerged.

**Open requests**

Org-wide skill sharing on Claude.ai (Issue #228, open, 17 comments): users currently download a `.skill` file, send it through Slack or Teams, and have colleagues upload it manually under Settings > Capabilities. The request asks for a shared skill library or a direct sharing link.

---

**What changed**

No releases in the last 24h, so no shipped changes to report.

**Worth knowing**

- Issue [#104123](https://github.com/anthropics/claude-code/issues/104123) (open, 1 comment): `claude remote-control` resume on Windows overwrites the local transcript `.jsonl` with the server copy, dropping everything before the last compaction — the author reports roughly 150 messages lost across six session files. Back up `~/.claude/projects/<project>/` before resuming a Remote Control session.
- Issue [#94478](https://github.com/anthropics/claude-code/issues/94478) (open, 13 comments): the Windows desktop app spawns `git.exe` 15–20 times per second with a `conhost.exe` each, which the author links to a kernel pool leak of about 6 GB per day. Affects Windows desktop users running long-session work.
- Issue [#103832](https://github.com/anthropics/claude-code/issues/103832) (open, 7 comments): on macOS desktop, `start_session` still shows "Allow Claude to start the session?" in Bypass permissions mode, adding a second approval. Affects agents that open sessions via `mcp__ccd_session__start_session`.

PR [#106583](https://github.com/anthropics/claude-code/pull/106583) proposes moving triage and dedupe workflows to Sonnet 5.5; it is not merged.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## What changed

**Two Rust alpha releases** — `rust-v0.167.0-alpha.3` and `rust-v0.167.0-alpha.2` shipped, with no notes beyond the version string. Alpha builds, so expect churn before you switch toolchains to them.

**Bazel release artifacts paused** — PR #58717 makes Bazel checks advisory and releases only Cargo artifacts, because a BuildBuddy key was revoked. PR #58757 removed Bazel outputs from DotSlash configs for `0.167.0-alpha.2`. If your pipeline consumes Bazel-built release assets, those are unavailable.

**TUI fixes proposed, not shipped** — PR #58767 defers draft consumption until `/fork` validates, preserving the draft and its image attachments. PR #58720 prioritizes threads needing approval in `/subagents`. Both are closed; verify your version before relying on either.

## Worth knowing

**Windows Computer Use is broadly broken.** Issues #25271 (66 comments), #35446 (56 comments), and #54532 report Chrome URL detection failures and a deadlock in `FrameArrived`. No fix appears in the data.

**Quota burn on GPT-6 Astra.** Issues #42987 and #58816 report a Plus 5-hour quota depleting in minutes on short turns. User reports only.

**Browser access drops mid-session.** Issues #54989 and #58809 report access silently disabling despite an enabled toggle, restored by restarting the app.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- Nightly `v0.67.0-nightly.20261102.g6814e00d6` was released ([compare](https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261101.g6814e00d6...v0.67.0-nightly.20261102.g6814e00d6)). The version bump is proposed in PR #30091. Only the automatically generated changelog link is available, so no feature detail is included here.
- Proposed fix: PR #29935 stops `@file` references from stripping leading and trailing whitespace, which currently sends `    print("hello")` to the model as `print("hello")`. It matters when you attach indentation- or newline-sensitive files.
- Proposed fix: PR #29929 corrects the model list output limits to 65,536 tokens for Gemini 2.5 Pro and Flash, and hides the misleading 8,192 value for models with no known limit.

**Worth knowing**

- Issue #21409 reports the generalist agent hangs indefinitely, even on folder creation; the author says instructing the model not to defer to subagents avoids it. No fix in the data.
- Issue #22323 reports the `codebase_investigator` subagent reports `status: "success"` and `Termination Reason: "GOAL"` after hitting MAX_TURNS before analysing anything. 13 comments; open.
- Issue #21968 reports Gemini rarely invokes custom skills or subagents unless explicitly told to, even when their descriptions match the task. 7 comments; open.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

No releases in the last 24h, so nothing shipped. In-flight items that would alter use if merged:

- #1857 proposes cancelling enqueued messages. Today a message queued with `Ctrl+Q`/`Ctrl+Enter` during a busy agent or `/compact` cannot be removed.
- #3709 proposes one-session model switching. BYOK currently pins a session to a single model via `COPILOT_MODEL`.
- #4560 (closed) reported that `auto` sends `reasoningEffort: null` and rejects configuration.

**Worth knowing**

- #5318: the built-in `rg` tool returns wrong filenames and line numbers when compaction treats numeric filename suffixes or directory parts as grep delimiters. Standalone ripgrep in bash is correct.
- #5319: opening an existing Cloud session on CLI 1.0.105 fails with "Cloud relay sessions are unavailable in this CLI configuration."
- #4430: a repository skill and an identical plugin skill load twice, doubling the skill description surface. Reported on 1.0.79-9.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases in the last 24h. Three PRs are in development:

- **MCP connection pooling** — PR #61185 proposes a `pool: true` option so one server shares MCP connections across directories. Currently 20 open directories means 20 connections to the same MCP server, including 20 copies of Cloudflare's 3,762-tool list. Matters if you run many directories against heavy MCP servers.
- **Retry behavior** — PR #60674 proposes retrying failed streams: retry the same request if nothing was output, otherwise retry from the prompt with the partial reply excluded, keeping completed tool results. Matters when a stream fails mid-reply.
- **Loopback proxies** — PR #60441 proposes keeping loopback requests off environment proxies, fixing #52054 and #51247.

**Worth knowing**

- **Free tier limit reports** — Issue #59387 (196 comments) collects free-tier problems, including the message "You've used today's free messages. They reset at…" where the reset never happens. No fix in the data.
- **Third-party providers unselectable** — Issue #60997 reports integrations connected via `opencode auth login` stored but unusable after upgrading to 2.2.5. Closed; no fix shown.
- **Browser tools vanish after auto-update** — Issue #60474 reports a running session losing the `browser` tool namespace when the desktop app updated 2.2.0 → 2.2.2; the attach RPCs returned HTTP 499 and were not retried. Closed.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

- No releases in the last 24h. Recent changes are in closed issues and merged PRs, so treat them as shipped only if they land in a release you run.
- PR #11659 adds `glm-5.3` to the Individual Token Plan allowlist, matching the models.dev low/high/max effort ladder for team, CN, and individual. It matters if you use `qwen-token-plan-individual`. (earendil-works/pi PR #11659)
- PR #11656 reconciles changed pinned git SHAs on startup, so editing a pinned commit in settings takes effect without `pi update --extensions`. Fixes #10758. (earendil-works/pi PR #11656)

**Worth knowing**

- Issue #11674: the bash tool has no default timeout, so one unbounded command blocks the turn indefinitely. The author hit it running `find /` across WSL 9p mounts. No fix in the data. (earendil-works/pi Issue #11674)
- Issue #10885: llama.cpp server context overflow ("Context size has been exceeded.") is not detected, so auto-compaction never triggers. Affects `openai-completions` against `llama-server`. No fix in the data. (earendil-works/pi Issue #10885)
- Issue #10287: a retryable network error made `getContextUsage()` jump from about 42k to 330,081 tokens on Pi 0.99.2. No fix in the data. (earendil-works/pi Issue #10287)

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- `fix(permissions): match amend invocations instead of raw text` ([PR #16075](https://github.com/QwenLM/qwen-code/pull/16075), open) would stop AUTO mode from blocking inert text that merely mentions the amend phrase, addressing [#13570](https://github.com/QwenLM/qwen-code/issues/13570). Proposed, not released.
- `fix(core): avoid unsupported forced Anthropic tool selection` ([PR #15558](https://github.com/QwenLM/qwen-code/pull/15558), open) switches requests to `auto` tool selection on Claude Opus 5.5, Sonnet 5.5, Fable 5.1 and Mythos 5.1, naming expected tools explicitly. Proposed.
- Nightly `v0.26.5-nightly.20261101.7b4b353750` shares the managed-agent session event delivery loop ([PR #15952](https://github.com/QwenLM/qwen-code/pull/15952)). Internal refactor.

**Worth knowing**

- Sandbox image for `0.26.5` was never published because the release build job failed before `ghcr.io/qwenlm/qwen-code:0.26.5` existed ([#16039](https://github.com/QwenLM/qwen-code/issues/16039)). Sandbox-based CI lanes installing the matching npm version crash with `manifest unknown`. No fix in the data.
- One CI pool host, `ecs-qwen-hz6-18`, has no Node.js on PATH, so the required `Lint & Static` check fails for any commit landing there ([#16005](https://github.com/QwenLM/qwen-code/issues/16005)). No fix in the data.
- A stop sent as a user message does not cancel a pending `loop_wakeup`, so a self-paced `/loop` resumes after an explicit stop in 0.26.1 ([#15894](https://github.com/QwenLM/qwen-code/issues/15894), 4 comments). No fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*