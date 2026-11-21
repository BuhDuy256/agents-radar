# AI CLI Tools Community Digest 2026-11-21

> Generated: 2026-11-21 06:55 UTC | Tools covered: 7

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

## Claude Code Skills — 2026-11-21

**mcp-builder: streamable HTTP client import fix** — Updates `skills/mcp-builder/scripts/connections.py` so the skill works with `mcp>=2.0.0`, where `streamablehttp_client` was renamed to `streamable_http_client`. Custom HTTP headers now pass through `create_mcp_http_client` / `http_client` instead of a direct kwarg. Open. (anthropics/skills PR #1742)

**skill-creator: isolated trigger evals and Windows support** — Fixes false misses and invalid scores in trigger evaluation, where per-worker command probes compete, `select()` on subprocess pipes fails on Windows, and unrelated tools stop the scan. The author reports runtime failures were previously counted as non-triggers, wrongly passing negative examples. Open. (anthropics/skills PR #1298)

**webapp-testing: remove shell=True from with_server.py** — Replaces `subprocess.Popen(..., shell=True)` in `skills/webapp-testing/scripts/with_server.py`, which was used to support `cd <dir> && <command>` chains. The change removes a command injection risk (CWE-78) from unsanitized command strings. Open. (anthropics/skills PR #1980)

**Open requests**

Skills cannot be shared inside an organization: users must download the `.skill` file, send it over Slack or Teams, and have colleagues upload it manually under Settings > Capabilities. A shared library or direct sharing link would replace that manual step (anthropics/skills Issue #228).

---

**What changed**

- v2.1.330 adds sign-in to organizations managed in Anthropic's Enterprise Admin Console. After `claude auth login`, Claude Code applies the organization's settings and uses its cloud provider or gateway. Matters if your org manages access centrally.
- The same release adds "easel", a built-in mod that draws charts when asked and under MCP metrics results. It ships in v2.1.330, so update to use it.
- PR #41447, "feat: open source claude code", is proposed, not released. It is open and would close issues #59, #456, #2846, #22002 and #41434 if merged.

**Worth knowing**

- Desktop auto-update can quit and relaunch the app while you are away, dropping Remote Control sessions: issue #95364, 24 👍, open. A second report (#111476) says Remote Control only reconnects after you send a message from the Mac.
- On Windows, the Bash tool's hook env file (`CLAUDE_ENV_FILE`) grows on every compact, and a torn export line fails every command with exit 127: issue #78146, open, has repro.
- Desktop (Windows) shows the workspace trust prompt for every `claude://code/new?folder=` link, even for already-trusted folders: issue #111488, open.

No fixes for these appear in the release data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- Release `rust-v0.173.0-alpha.4` (with `.3` and `.2`) landed on 2026-11-21. It is still an alpha pre-release, so treat it as a test channel rather than a default upgrade.
- Reasoning summaries are moving to automatic defaults. PRs #62904 and #62903 are closed proposals to set `concurrent_reasoning_summaries` stable and use automatic summaries in the TUI, so summary delivery behavior depends on the shipped build.
- `/config` may gain a reasoning summary picker (PR #62905) offering Auto, Concise, Detailed, or None, saved as `model_reasoning_summary` for new chats.

**Worth knowing**

- VS Code chat history is not scoped to the workspace. Issue #25319 is open with 64 comments, so extension users with several projects still share thread history.
- Windows desktop file and image previews can hang on an `fs/readFile AbsolutePathBuf` error (#49891, open, 5 comments). A workaround is not described.
- Windows and WSL users report that automatic migration leaves projects with no chats despite intact history (#62735, open, 3 comments). No fix appears in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## What changed

**Windows home paths fixed.** v0.71.0-nightly.20261121.geecccfcd5 ([release](https://github.com/google-gemini/gemini-cli)) expands home-relative paths written with `~` and backslashes. This matters when you pass Windows paths to the CLI and previously got unresolved directory errors.

**Session resume picks the active session.** The same release resumes the most recently *active* session instead of the most recently *started* one. If you keep several sessions open, `--resume` now returns you to the one you were last working in.

**YOLO mode fix proposed.** [PR #30268](https://github.com/google-gemini/gemini-cli/pull/30268) would stop taint and build-file checks from prompting or hard-denying edits during trusted `--approval-mode=yolo` runs. It is open, not released.

## Worth knowing

**Generalist agent hangs.** [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409) (8 comments, 👍 8) reports the generalist agent hangs indefinitely on simple tasks; one user waited an hour. Instructing the model not to defer to subagents works around it. No fix in the data.

**Dangerous `rm` detection gap.** [PR #30171](https://github.com/google-gemini/gemini-cli/pull/30171) (closed) addressed `rm` flag ordering, but the data does not confirm it shipped.

**Many tools trigger 400 errors.** [Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246) reports a 400 error when more than 128 tools are available.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.115-5 shrinks long-running local sessions on disk and resumes them faster, so large histories cost less storage and open sooner. Matters if you keep sessions alive across days.
- v1.0.115-4 prevents a plugin initialization race that blocked new sessions or broke session resume. Windows also cleans up child processes from Git commands, hooks, and language server checks.
- v1.0.115-2 enables Windows sandbox package queries by default. Opt out with `sandbox.userPolicy.capabilities: []`. On macOS, `sandbox.userPolicy.seatbelt.extraMachLookups` allows specific Mach service lookups without enabling Keychain access.

**Worth knowing**

- Issue #5478 (8 comments, open): on Windows, Cortex XDR reports "parent_process_spoofing" and kills the launching shell when Copilot CLI spawns `git`. No fix listed.
- Issue #5541 (open, needs-human): an agent's mangled quoting in a WSL `rsync -a --delete` command wiped a user's drive. No fix listed.
- Issue #5220 (17 👍, open): Claude prompt caching uses a 5-minute TTL, so normal interactive gaps cause full re-reads. No fix listed.
- Issue #5536 (open): a permission prompt resets an open question dialog, forcing users to re-enter answers. No fix listed.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases in the last 24h, so the items below are proposed, not shipped.

`opencode upgrade` from 2.2.7 to 2.3.2 can fail mid-download on Linux; users report it in issue [#65253](https://github.com/anomalyco/opencode/issues/65253). Until fixed, upgrade manually.

Windows users on `"shell": "cmd"` hit escaped double quotes in every command (issue [#64573](https://github.com/anomalyco/opencode/issues/64573)). Quoted arguments arrive as literal `\"...\"`. An open PR fixes string-valued streaming errors for OpenAI-compatible providers ([#65335](https://github.com/anomalyco/opencode/pull/65335)).

Proposed: `opencode machine add|list|remove` would accept `--server` ([#65340](https://github.com/anomalyco/opencode/pull/65340)), and machine links would carry over Iroh for machines without a public address ([#65341](https://github.com/anomalyco/opencode/pull/65341)). Both are behind the `machines` flag.

**Worth knowing**

The free-tier thread [#59387](https://github.com/anomalyco/opencode/issues/59387) is the main report hub; the reset-after-limit claim is unverified. Desktop 2.3.2 on Windows reopens `%USERPROFILE%` instead of the selected project ([#65309](https://github.com/anomalyco/opencode/issues/65309), closed). An `external_directory` ask rule is loaded but never prompts on Windows ([#65290](https://github.com/anomalyco/opencode/issues/65290), open).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## What changed

**Pi v1.6.0 ships GPT-6.2 Astra and GPT-6.2 Sol** across the `openai`, `azure`, and `openai-codex` providers. Sol is now the default model on all three, so existing setups pick it up on upgrade.

**A p0 bug in v1.6.0: `--thinking high`/`xhigh` on GPT-6 models sends `reasoning.effort: "medium"`.** The `compat.supportsMidConvoEffort: true` flag added to `openai-codex` entries for gpt-6-astra, gpt-6-sol, gpt-6.2-sol and others overrides your selected effort (#12361). Reported on 2026-11-20; no fix is in the data.

**Bedrock requests hang when `HTTPS_PROXY` is set with an SSO profile** (#12353). The Bedrock runtime client gets a proxy-aware handler, but the AWS credential chain builds its own SSO clients without the proxy, so requests time out after 120s+ on 1.6.0. A fix PR (#12365) is closed and merged into the data.

## Worth knowing

**Anthropic `/login` fails on Claude Team seats with `Unknown scope: user:i…`** (#12318, p0, in progress). Accounts on Team/Enterprise cannot authenticate; the request is rejected before the consent screen. 4 comments; fix in development.

**Headless `pi -p` does not exit when a stdio MCP server stays connected** (#12238). The result is printed but the process hangs until killed; servers that fail at startup do not block exit. No fix in the data.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## What changed

- v0.28.3 shipped. No known breaking changes. ([release](https://github.com/QwenLM/qwen-code/releases))
- The Web Shell now explains background tasks from the composer chips (#17398), so automatic `/loop` and cron continuations are described where you type. ([PR #17398](https://github.com/QwenLM/qwen-code/pull/17398))
- PR #18008 proposes `qwen daemon status --offline`, reading listener-slot occupancy from a local snapshot refreshed every five seconds. Not released. ([PR #18008](https://github.com/QwenLM/qwen-code/pull/18008))

## Worth knowing

- `qwen serve` on long-running deployments can lock out `/health`: long-lived SSE streams exhaust the listener pool, and an explicit `--port` can silently start duplicate daemons (#17479, measured on qwen 0.27.3). Issue #18004 tracks offline occupancy reading. ([#17479](https://github.com/QwenLM/qwen-code/issues/17479), [#18004](https://github.com/QwenLM/qwen-code/issues/18004))
- The Managed Agent gate can merge red, so main's Java suite then fails for every PR touching that scope (#17039, now closed). ([#17039](https://github.com/QwenLM/qwen-code/issues/17039))
- The manual PR re-review channel is dead: the workflow gates on a reviewer account that returns 404 (#16832, closed). ([#16832](https://github.com/QwenLM/qwen-code/issues/16832))

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*