# AI CLI Tools Community Digest 2026-10-23

> Generated: 2026-10-23 07:42 UTC | Tools covered: 7

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

### md2video-audio — renders Markdown into narrated MP4
This skill compiles a Markdown document into a slide deck through Marp, then adds a voiceover to produce an MP4. Reach for it when a written document needs to become a video; the pull request is open (anthropics/skills PR #1703).

### scnet-hpc — runs jobs on SCNet clusters
This skill covers profile-based SSH and Slurm workflows for SCNet HPC clusters, including job generation, partition and memory guidance, and cluster discovery. Use it to submit or inspect compute jobs on SCNet; the pull request is open (anthropics/skills PR #1615).

### document-typography — fixes typographic faults in generated documents
This skill targets orphan word wrap, widow paragraphs and numbering misalignment in Claude-generated documents. Use it when a document must meet typographic standards; the pull request is open (anthropics/skills PR #514).

**Open requests**

- Issue #228 asks for org-wide skill sharing in Claude.ai: today a user must download the `.skill` file, send it over Slack or Teams, and have each colleague upload it manually under Settings > Capabilities.

---

**What changed**

v2.1.309 fixes two sandbox escape-adjacent bugs. Sandboxed Bash commands on macOS and Linux no longer run the shell's startup files outside the sandbox before each command. Separately, macOS `denyWrite` glob patterns now apply at a path's real location when the pattern's folder is reached through a symlink. Both matter if you rely on the sandbox to contain untrusted or destructive commands rather than on prompt-level review.

**Worth knowing**

- [#85856](https://github.com/anthropics/claude-code/issues/85856) (OPEN, 15 comments): on Windows with Git Bash, the Bash tool halves every run of backslashes — `n` becomes `ceil(n/2)` — before bash parses the command, and quoting does not prevent it. Affects Windows/MSYS2 users issuing paths or escapes. No fix in the data.
- [#104519](https://github.com/anthropics/claude-code/issues/104519) (OPEN, 0 comments, v2.1.309): two concurrent sessions in separate PowerShell terminals mixed up background bash tasks. Affects anyone running parallel Claude Code sessions on Windows.
- [#104509](https://github.com/anthropics/claude-code/issues/104509) (OPEN, 0 comments, bundled 2.1.308): in the desktop app, the auto mode classifier never approves, so every tool call prompts. Turns auto mode into manual approval. No fix in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

Codex 0.164.0 adds ten numbered `/presets` slots for saving reusable prompts and slash commands, reachable through a keyboard menu (#54380, #54381). You can now set model, reasoning effort, speed, and permission profiles inline with `/model` and `/permissions` arguments (#54378, #54383). Both features ship in `rust-v0.164.0`, so they matter when switching between models or permission levels mid-session rather than restarting.

A first-run preview of v… is included in the release notes but truncated, so its scope is unclear.

**Worth knowing**

Issue #54841 (38 comments) reports that Work mode blocks message submission in BYOK mode when local browser or computer tools are enabled; no fix appears in the data. Issue #56378 (3 comments) shares a reproducible writer-handoff patch for app-server, but it is an experimental reference, not a merged change. Issue #49464 was closed: GPT-6.1 Sol was missing from the VS Code model picker (#49464).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## What changed

**Nightly v0.67.0-nightly.20261023.ga713410ab** shipped two core fixes ([release](https://github.com/google-gemini/gemini-cli/pull/29887)). Token usage metadata is now preserved and per-turn reporting aligned ([#29834](https://github.com/google-gemini/gemini-cli/pull/29834)), and all model turns with function calls receive thought signatures ([commit](https://github.com/google-gemini/gemini-cli)). Use this nightly if you rely on accurate per-turn token counts or function-call flows.

**Proposed:** `gemini resume` may stop leaking workspace directories. PR [#29890](https://github.com/google-gemini/gemini-cli/pull/29890) restores saved directories only after `resumeChat` succeeds, fixing [#29864](https://github.com/google-gemini/gemini-cli/issues/29864). Today a failed resume leaves stale directories in your workspace context.

**Proposed:** subagent tool calls may reappear in the task tree. PR [#29859](https://github.com/google-gemini/gemini-cli/pull/29859) keeps calls with `executing` status visible instead of an empty tool list.

## Worth knowing

**Agent hangs.** When Gemini CLI defers to the generalist agent, it can hang indefinitely; the reporter waited up to an hour ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments, 8 👍). Instructing the model not to use subagents avoids it. No fix in the data.

**False GOAL success.** A `codebase_investigator` subagent reports `status: "success"` after hitting MAX_TURNS, hiding the interruption ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 comments). Open, P1.

**Tool limit.** More than 128 tools triggers a 400 error ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)). Open.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

Copilot CLI v1.0.103 (2026-10-22) copies a completed response's original code when you click its code block, if the setting is enabled. ACP sessions now respect saved sandbox settings and `--sandbox`/`--no-sandbox` flags, including on resume. Cloud replies also keep their full text when the CLI reconnects after a dropped connection.

**Worth knowing**

Issue #5232 (open, updated 2026-10-23): in `manual` permission mode, a shell command whose referenced file paths all sit inside a trusted folder runs with no prompt. The reporter says path-based gating can't tell what a command like `powershell.exe` or `curl` will do. No fix in the data.

Issue #5238 (open): after the 50th image in a session, removing the oldest image triggers a full cache refill, which the reporter calls expensive. Reported against 1.0.103.

Issue #5197 (open, updated 2026-10-22): voice input segfaults on WSL2 after updating to 1.0.100, leaving `/voice` stuck on "Fetching voice models". Four comments, no fix listed.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

OpenCode v1.19.4 upgraded its bundled Bun runtime to 1.4.4, which adds security fixes for Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket and `fetch`, and updates root certificates to NSS 3.131.1. Any install on this release inherits those fixes; update if you serve over TLS or use WebSocket connections.

A fix merged today makes `opencode run` and `opencode run --agent <id>` use the agent's configured `model` when a session starts without one. Previously the server fell back to the global default (issue #55727, PR #58355). It matters for headless and CI runs that depend on per-agent models.

Two MCP PRs merged today: one stops duplicated MCP servers during initial reconciliation (#58349), another stops MCP servers in parallel on shutdown (#58351), cutting restart hangs.

**Worth knowing**

Compaction can trigger the wrong model: `session.summarize` stores its model on the synthetic post-compaction continue, so following turns run on it (issue #49386).

V2 never auto-generates session titles, leaving them "Untitled session", while v1.18.x did (issue #58176, reproduced).

In v2, background subagents cannot be cancelled (issue #36423, open, 8 👍).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24h, so everything below is in review, not shipped.

- PR #11304 (open) would let Pi start when a configured package fails to install, recording the failure per source and loading the rest. Today one broken package can abort startup.
- PR #11309 (open) would await extension `sendUserMessage` turns before command handlers return, fixing #11238. Extensions that send messages currently lose the completion signal.
- PR #11289 (closed) stops macOS shell process groups before killing them, reducing the #11252 case where aborting `a; b` still ran `b`.

**Worth knowing**

- #11312 (closed): `pi.exec()` corrupts UTF-8 split across stdout chunks, returning `"���好"` for `"你好"`. Affects extensions reading multibyte output.
- #11086 (open, p0): symbols leak into prompt input on Windows terminals under CPU load, reproduced over SSH into Linux. No fix linked.
- Discussion #11306: `pi-continuity` auto-resumes runs stopped by coding plan usage limits, e.g. OpenAI's 5-hour cap.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**
- v0.26.0-nightly.20261022 (`bf66a26c97`) ships daemon token persistence via PR [#15023](https://github.com/QwenLM/qwen-code/pull/15023). Tokens now survive daemon restarts, so you avoid re-authenticating a live `qwen serve` session. It matters for long-running agents restarted between runs.
- Issue [#15077](https://github.com/QwenLM/qwen-code/issue/15077) closed: Managed Agent session listing gains an archived filter and title search. You can now find past Sessions by name instead of paging an opaque cursor. Relevant if you keep many archived Sessions.
- PR [#15212](https://github.com/QwenLM/qwen-code/pull/15212) closed: session PR badges and the Pull requests panel bind when `gh` is outside `PATH`, fixing macOS daemons started by launchd. Only shipped once merged into a release; data shows the PR closed, not a release note.

**Worth knowing**
- Issue [#15297](https://github.com/QwenLM/qwen-code/issue/15297) reports 0.26.0 dropping tool results (~43 of 1,663 calls, one user, Windows). Edits still apply, but you may re-read files. No fix in the data.
- Issue [#15248](https://github.com/QwenLM/qwen-code/issue/15248): sdk-java runtime broker timing tests flake 3/3 on GitHub-hosted runners, blocking fork PR fast lanes. No fix confirmed here.
- Issue [#15324](https://github.com/QwenLM/qwen-code/issue/15324): an ACP `write_file` cut off by max_tokens is written to disk and reported as successful. Affects Zed, VS Code companion, and `qwen serve`.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*