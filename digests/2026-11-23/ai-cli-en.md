# AI CLI Tools Community Digest 2026-11-23

> Generated: 2026-11-23 07:22 UTC | Tools covered: 7

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

## Skills in review at anthropics/skills — 2026-11-23

### md2video-audio — compiles Markdown into narrated MP4 video
Adds a skill that turns Markdown documents into MP4 videos through Marp slides plus a voiceover track. The author lists it as zero-cost. Status: open (anthropics/skills PR #1703).

### notion-spec-to-implementation — converts specs into Notion tasks
Transforms product or tech spec pages into Notion implementation tasks with acceptance criteria and progress tracking. Ships alongside a second skill, quantitative-resume-auditor. Status: open (anthropics/skills PR #1245).

### scnet-hpc — runs jobs on SCNet clusters
Guides SSH profiles, Slurm job generation and module setup for SCNet HPC clusters. Covers partitions, memory, accelerators and cluster discovery. Status: open (anthropics/skills PR #1615).

**Open requests**

Issue anthropics/skills Issue #228 asks for org-wide skill sharing in Claude.ai: today a user downloads the .skill file, sends it over Slack or Teams, and colleagues upload it manually under Settings > Capabilities. Commenters want a shared library or a direct share link. Status: open, unaddressed.

---

## What changed

No releases in the last 24 hours.

PR #95698 (open, not shipped) proposes quoting the script path and running `ralph-wiggum` and `output-style` hooks through `bash`, fixing the bundled-plugin half of #78490 and #95673.

## Worth knowing

**Skills upload is failing.** Issue #26310 [OPEN] reports uploading Skills returns "Internal server error" on Claude Web and Desktop. 30 comments, 16 👍. No fix in the data.

**Sandbox breaks on Ubuntu 26.04.** Issue #105194 [OPEN] reports AppArmor's `bwrap-userns-restrict` profile denies `CAP_SYS_ADMIN`, so every sandboxed Bash command fails. 9 👍. No fix in the data.

**Destructive Windows command.** Issue #111755 [OPEN] reports `Remove-Item -Recurse -Force` ran against a path held in the read-only `$HOME` variable, deleting user profile directories. Reported 2026-11-23, 1 comment. No fix in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

No releases shipped in the last 24h. One fix landed: PR #63262 closes folder trust prompts when the app server disconnects, so a queued confirmation can no longer be handled against a closed connection. PR #63219 is closed and excludes per-item usage attribution by default via the `x-codex-exclude` header. Nothing here is released yet.

**Worth knowing**

Rate-limit accounting stays the top open issue: #41220 tracks reports of quota and credits depleting faster than users' baselines predict, with 100 comments and 21 👍 as of 2026-11-23. No fix in the data.

Windows Work threads are still broken: #54564 and #62393 report the Send button staying disabled in new conversations, and #62918 adds a "Connection for host ID local not found" error on relaunch.

On macOS, #63078 reports a fresh Local Full Access session running as managed workspace-write with network disabled. #62700, which broke local skills in the slash menu, is closed.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- Nightly release `v0.71.0-nightly.20261123.geecccfcd5` is out, bumping the version in PR #30411. Use it only if you track nightly builds.
- PR #30305 proposes fixing extension docs that recommend `"excludeTools": ["run_shell_command(rm -rf)"]`. The entry never matched because exclude tools are compared against whole tool names, so the documented block did nothing.
- PR #30404 proposes stripping only the trailing `.json` from checkpoint names. Names derived from files like `package.json` were mangled, so `/restore <name>` failed with "File not found".

**Worth knowing**

- Issue #21409 (8 comments, 8 👍) reports the generalist agent hangs forever on simple tasks like folder creation, waiting up to an hour. Instructing the model not to defer to subagents avoids it.
- Issue #22323 reports the `codebase_investigator` subagent returns `status: "success"` and `Termination Reason: "GOAL"` after hitting MAX_TURNS, hiding the interruption.
- Issue #21983 reports the browser subagent fails under Wayland.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- Copilot CLI v1.0.115-7 fixes `--ui-server` clients attaching to a resumed session: they can now connect as soon as the server starts listening, so reattaching after a resume no longer waits on session setup.
- The same release stops npm-installed Copilot CLI from staying alive in the background when startup is interrupted. If you Ctrl-C during startup, the process now exits cleanly instead of lingering.
- Proposed, not shipped: PR #5554 adds opt-in connection token generation to the CLI container. Setting `COPILOT_CONNECTION_TOKEN_GENERATE=true` prints a fresh random token at startup, letting a local SDK client connect to the headless CLI before a session has GitHub credentials.

**Worth knowing**

- Bash tool drops non-ASCII characters (Issue #3601). Shells spawn with `LC_CTYPE=C`, silently stripping Chinese, Japanese, Korean, accented Latin and emoji from commands; paths with those characters become unresolvable. Closed.
- An MCP client declares the Tasks extension on `tools/call` but rejects `CreateTaskResult` (Issue #5555, open, 0 comments). Servers answering with `resultType: "task"` fail the tool call, and `tasks/get` is never sent.
- Cloud sandbox sessions don't reconnect after a tool call (Issue #5552, open). One reporter says sessions accept no live connections after a tool call finishes, leaving read-only history; GitHub Mobile drops cloud sessions when backgrounded (Issue #5553, open).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

Code Mode scripts can now call the OpenCode HTTP API directly with `fetch("opencode:///api/...")`. Proposed in [PR #65725](https://github.com/anomalyco/opencode/pull/65725), the request runs in the same process and stays signed in. That lets an agent list and read sessions, create and prompt others, and check jobs without shelling out to `opencode`. It is in development, not released.

Agent widgets are proposed in [PR #65261](https://github.com/anomalyco/opencode/pull/65261). Agents could show interactive widgets in a session using PsychoScript templates plus JSON data, rendered natively by each client. Still open, not shipped.

Proposed fix [PR #65621](https://github.com/anomalyco/opencode/pull/65621) flattens tool namespaces once, before provider adapters. This addresses [issue #52088](https://github.com/anomalyco/opencode/issues/52088), where a flat provider defined `crm_lookup` but the forced choice still named `crm.lookup`. No release contains it yet.

**Worth knowing**

The free tier tracking thread [issue #59387](https://github.com/anomalyco/opencode/issues/59387) is the main place for free-tier reports, with 406 comments.

Issue [#46358](https://github.com/anomalyco/opencode/issues/46358) reports Plan mode refusing writes to `/Users/<user>/.opencode/plan/003-example.md` while naming that same directory as the plan directory. Still open and reproduced.

Issue [#65600](https://github.com/anomalyco/opencode/issues/65600) reports `serve --service` exiting cleanly after idle location-services eviction, cutting external clients without warning. No fix in the data.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24h. Three fixes are proposed or in progress, none shipped:

- PR #12400 (closed) rejects input sent while a session is being replaced, fixing issue #12243 where prompts ran on a disposed session. Matters during `switchSession`, `newSession` or `fork`.
- PR #12404 (closed) allows @ file completion on mobile by touch instead of requiring input acceptance. Tested on Android Firefox and Chrome.
- PR #12421 (open) adds a `pi-classifier` API to `KnownClassifierApi` and exports `PiClassifierOptions`. Proposed, not released.

**Worth knowing**

- Issue #10256 (open, 26 comments, in progress): on 0.99.x, terminal color query replies leak into the prompt and BEL opens the external editor under mintty on Windows with ConPTY. 0.87.1 is unaffected; Windows Terminal is fine.
- Issue #11950 (open, in progress): when a model sends bash and read in one message, both start at once, so a read can return stale content before the command finishes.
- Issue #8643 (open, 17 comments, 10 👍): Bedrock rejects images nested in `toolResult.content` for OpenAI models. The author has a fix and regression test ready.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- **v0.28.4 released (2026-11-23).** Desktop build `desktop-v0.28.4` ships alongside it. No migration notes in the release data, so treat it as a routine update.

- **Web Shell local daemon mode gains a workspace artifact library** with progressive scanning and streaming updates ([#18071](https://github.com/QwenLM/qwen-code/pull/18071)). Artifacts appear as they are scanned instead of after a full scan, which matters on large workspaces.

- **Web Shell chat adds a shared ChatSurface, Continue badges, and suggestion chips.** The ChatSurface is shared rather than per-view, so chat state is consistent across Web Shell entry points. These are features of the v0.28.4 release data.

**Worth knowing**

- **Gemma 3 and Gemma 4 are treated as text-only** ([#18136](https://github.com/QwenLM/qwen-code/issues/18136)). Images are never sent for Ollama tags (`gemma3:27b`, `gemma4:31b`) or Hugging Face names served through vLLM. No fix in the data.

- **On Windows, `@` autocomplete and drag-and-drop silently drop files whose names contain spaces or parentheses** ([#18141](https://github.com/QwenLM/qwen-code/issues/18141)). The prompt is sent without the file and no error is shown.

- **Main CI has long-running failures** tracked in [#14724](https://github.com/QwenLM/qwen-code/issues/14724) (545 comments), [#11680](https://github.com/QwenLM/qwen-code/issues/11680) (106 comments), and [#11678](https://github.com/QwenLM/qwen-code/issues/11678) (68 comments). These are bot-filed reports, not confirmed user-facing bugs.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*