# AI CLI Tools Community Digest 2026-11-13

> Generated: 2026-11-13 06:26 UTC | Tools covered: 7

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

# Claude Code Skills — 2026-11-13

**claude-api skill: update Python pause_turn guidance** (open)
The Python guidance said the tool runner cannot resume `pause_turn` and recommended restarting it in an outer loop. Python SDK 1.1.0 added automatic resumption, so that counter no longer bounds paused requests. [PR #1950](https://github.com/anthropics/skills/pull/1950)

**mcp-builder: support `mcp>=2` imports and custom headers** (open)
In `mcp>=2.0.0`, `streamablehttp_client` was renamed to `streamable_http_client`, and custom HTTP headers move to `create_mcp_http_client` instead of a direct kwarg. `connections.py` still uses the old form. [PR #1742](https://github.com/anthropics/skills/pull/1742)

**scnet-hpc: operate SCNet HPC clusters** (open)
The skill covers profile-based SSH and Slurm workflows for SCNet clusters, including SSH setup, job generation, cluster discovery and profile refresh. [PR #1615](https://github.com/anthropics/skills/pull/1615)

### Open requests

**Org-wide skill sharing in Claude.ai** — a user requests a shared skill library or direct sharing link, instead of downloading a `.skill` file and sending it by Slack for colleagues to upload manually. [Issue #228](https://github.com/anthropics/skills/issues/228)

---

**What changed**

v2.1.323 adds Code Mode, an experimental opt-in where the agent writes JavaScript to call its own tools. Enable it per user or disable it per organization at code.claude.com/docs/en/code-mode. The changelog link currently returns 404 (#109442).

The same release removed the `subagentStatusLine` setting. Settings files keeping the key now load with it ignored, and per-agent context, cost, model and effort are no longer visible (#109446).

`plugin.json` gained `engines["claude-code"]`, so plugins can declare which Claude Code versions they support.

**Worth knowing**

Issue #69044, open since 2026-06-17 and now at 136 comments, is one user's multi-month log of recurring errors from daily use. No fix is listed in the data.

Issue #34255 (74 comments, 112 👍) reports Remote Control connections on macOS and iOS dropping silently with no automatic reconnection. No fix appears in the release notes.

Issue #109455 reports a limit-stopped session auto-resuming at usage reset and spending the new window unattended.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- Codex CLI 0.168.0 lets you browse model providers under Sessions → Model providers and pick the default for new chats (#59541, #59722). Set it once when you switch providers instead of changing it per chat.
- The same release adds `features.tui_workspace`, which opens a side conversation next to the main chat. Drag the divider to resize, or press `leader z` to zoom the focused pane. Useful when you want a second thread visible while working.
- Proposed PRs would deny `request_key` in Linux `Restricted` and `ProxyRouted` seccomp sandbox modes (#61256) and enable gzip and zstd in the shared HTTP client (#61264). Both are closed PRs, not released features.

**Worth knowing**

- On macOS, a Dot follow-up to an existing local Codex task hangs before a turn starts on app 26.1106.51428 (#61258, 3 comments). No fix in the data.
- Windows sandbox initialization fails with SYSTEM denied WRITE_DAC on `.sandbox-bin` (#59038, 6 comments), and selecting "Full access" sends `permission_profile: "managed"` that falls back to workspace-write (#56663, 5 comments). Both open.
- On Windows with the WSL agent, a user asks Codex to preflight Linux tooling and explain recovery steps after switching agents (#61274, 1 comment). Open enhancement, no fix yet.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases in the last 24 hours, but two open pull requests address problems users hit. PR #30266 proposes scoping the foreground retry indicator to the active main prompt, so retry attempts from background subagent requests no longer appear in it. PR #30174 proposes letting long model turns survive undici's 5-minute body timeout instead of aborting and replaying the request up to three times.

**Worth knowing**

Issue #21409 reports the generalist agent hangs indefinitely on simple tasks like folder creation, including a one-hour wait; instructing the model not to defer to subagents avoids it. No fix appears in the data.

Issue #21968 reports Gemini rarely invokes custom skills or subagents unless explicitly told to, even when they match the task. No fix appears in the data.

Issue #22323 reports that a subagent hitting MAX_TURNS returns `status: "success"` and `Termination Reason: "GOAL"` despite doing no analysis, so interruptions look like successes. Open, 13 comments.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

Copilot CLI v1.0.111-0 adds regex support to enterprise-managed Shell, Bash, and PowerShell permission rules ([release](https://github.com/github/copilot-cli/releases)). It also adds `--host-allow-session-creation`, letting remote clients create sessions on CLI hosts for one launch without changing saved settings — matters for shared or CI hosts where you don't want persistent config edits.

v1.0.110 (2026-11-12) experimentally answers git, ssh, and sudo password prompts in a masked dialog, enabled with `/experimental on`. It also avoids unnecessary error popups during Microsoft Entra sign-in when an organization account is available.

**Worth knowing**

Issue [#5236](https://github.com/github/copilot-cli/issues/5236) (open, 7 comments): on Windows, the Entra broker token cache stays 0 bytes after MCP sign-in, so every new process re-prompts for the account picker. No fix in the data.

Issue [#5447](https://github.com/github/copilot-cli/issues/5447) (open): `copilot --acp` skips `~/.copilot/ide` discovery, so ACP sessions get no IDE MCP server and never show "Visual Studio Connected", while the interactive CLI attaches in about 1 second. No fix in the data.

Issue [#5446](https://github.com/github/copilot-cli/issues/5446) (open): the persisted MCP tool snapshot cache grows with temporary workspaces and can exhaust memory at startup. No fix in the data.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases in the last 24h, so these are in-development changes, not shipped ones.

- **Video generation providers are being added.** Proposed PRs add Seedance (#63680), OpenRouter (#63681), MiniMax (#63682), and Kling (#63684) video generation to `@opencode/ai`. Matters if you generate media through provider APIs.

- **Plan mode may stop re-waking sessions after compaction.** PR #63669 says it removes the code path that re-added Plan's reminder as a synthetic message after each compaction, which caused a loop (closes #62628). Not released.

- **Safari < 17.4 support is proposed.** PR #63332 polyfills `AbortSignal.any` for Safari and older browsers (closes #62873), where the app currently breaks.

**Worth knowing**

- **Turns abort with no cause.** Issue #63632 reports v2.0.22/2.0.27 turns dying unprompted, with the store and stream disagreeing and the deciding fields lost. Open, 8 comments.

- **Free-tier limits hit fast.** Issue #63658 reports the free limit being reached within 5 minutes. Open; no fix in the data.

- **Case-only renames delete files.** Issue #63126, reproduced and marked high severity, reports that a patch changing only a filename's case deletes the file on case-insensitive filesystems (macOS, Windows). Closed, fix unclear from the data.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

`find` no longer matches path patterns through directories above the search path. In PR #12116 (closing #12066), `find src/**/*.ts` in `~/src/app` returned every `.ts` file in the project; fd now anchors globs at the search path. Matters when a project sits inside a same-named parent folder.

`/copy` skips turns that ended without an answer. PR #12121 (closing #12119) makes `getLastAssistantText()` ignore tool-call-only and empty messages after Esc, so `/copy` returns the last real reply.

GitHub Copilot Gemini models can now receive `reasoning_effort`, and `usage.reasoning_tokens` is read. PR #12110 (closing #12019) sources the flag from models.dev; it is open, not released, so `--thinking` has no effect until it lands.

**Worth knowing**

With `cacheWarming: "idle"`, idle warming silently stops once an extension handles `turn_end` and the context holds a custom or compaction message (#10956, 14 comments, open). `/session` shows `Inactive (conversation context changed)`. No fix in the data.

On Anthropic message threads, every full resend after a `thread_not_found` fallback drops thinking blocks with `prefix_binding_mismatch`, triggered by a string-typed numeric tool argument (#12098, open). No fix in the data.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- v0.27.3 adds chips above the Web Shell composer for unfinished background workflows, shells, monitors, and local agents. This lets you see and jump back to background work that is still running. It matters if you drive long tasks from the Web Shell.
- v1.0.0-preview.1 fixes Qwen subscription accounts being unable to use subscription models after sign-in. The model catalog now follows your sign-in state automatically, so no manual provider configuration is needed. Only relevant if you use a subscription account.
- SDK TypeScript v0.1.33 bundles CLI version 0.27.3. The release notes also list a bundled CLI 0.27.2, so verify which version you actually pin.

**Worth knowing**

- Issue #17093 (open): in a headless one-shot run, `run_shell_command` can return empty output with exit code 0 when several tool calls finish at nearly the same time. No fix is listed in the data.
- Issue #17040 (open, P1): in the Web Shell daemon, a session dies with "agent channel closed mid-request" after `curl`/network tool calls. No fix is listed in the data.
- Issue #16030 (open): the Linux AppImage's bundled WebKitGTK needs 9 libraries that are not in the image, breaking image paste. A workaround is described; no release fix is listed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*