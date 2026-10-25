# AI CLI Tools Community Digest 2026-10-25

> Generated: 2026-10-25 01:18 UTC | Tools covered: 7

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

**Skill name — what it does**
1-2 sentences: the task it handles, when to reach for it, and whether it is open, merged or draft according to the data. Keep the PR reference exactly as given.

---

**What changed**

No releases shipped in the last 24h, so no new features or confirmed fixes. Two closed pull requests touch setup and repo tooling, not the CLI surface:

- PR #62597 *(closed)* fixed 10 script and workflow bugs, including `comment-on-duplicates.sh` now falling back to `GITHUB_REPOSITORY` instead of a hardcoded repo, so the script works in forks.
- PR #16132 *(closed)* made `/install-github-app` work in a dev container; previously it failed reporting `gh` unauthenticated after successful login. It matters only if you set up the GitHub app that way.

**Worth knowing**

- Issue #95426 *(open)* reports an unprompted `rm -rf "$(cygpath -u 'C:\')"` on Windows, which resolved to a drive root and deleted about 600GB. No fix listed.
- Issue #93287 *(open, high-priority, data-loss)* reports deletion of the macOS Applications directory contents; #93408 reports deletion of home-folder contents including the keychain. Neither shows a fix.
- Issue #103335 *(open)* reports desktop Code tab prompt suggestions stopped appearing after the 2026-10-13 update. Restarting and new sessions do not restore them.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

No releases or pull requests were updated in the last 24 hours, so nothing new shipped. Issue #55034 (CLI, Windows/MSYS2 mintty) closed on 2026-10-25 after Shift+Enter and Ctrl+J stopped inserting newlines in the prompt editor; issue #55024 (CLI 0.163.0) also closed, fixing a case where pressing Shift+Left twice replaced a queued prompt. Two other fixes are still open: #54564 reports the Send button staying disabled in new Work threads on Windows.

**Worth knowing**

Issue #55781 (rate-limits, CLI) reports "Selected model is at capacity" for three days, with complex tasks failing while chat still works. Issue #56691 (17 comments) reports Codex 26.1021.22027 failing to start its UI in VS Code 1.143.1 on Windows. Issue #53623 reports `helper_unknown_error: setup refresh had errors` on codex-cli 0.162.1 under Windows 11 PowerShell. All three are open user reports with no confirmed fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases landed in the last 24 hours. Two proposed CLI changes are in review:

- **Terminal status reporting (PR #29918, open):** the TUI would report working, blocked, done, error, and idle states via OSC 7501, so a supporting terminal can show which session needs input. Useful when several sessions run in different tabs.
- **Appending to the system prompt (PR #29919, open):** adds `--append-system-prompt`, `--append-system-prompt-file`, and `GEMINI_APPEND_SYSTEM_MD`, letting you add project context without replacing the whole prompt as `GEMINI_SYSTEM_MD` does.
- **Ripgrep failure reporting (PR #29779, open):** failed `RipGrepTool` searches would set the error field, so the scheduler stops recording them as successes.

**Worth knowing**

- **Generalist agent hangs (Issue #21409, 8 comments, 8 👍):** the author reports the agent hangs indefinitely when deferring to the generalist agent, including on simple folder creation; instructing it not to use subagents avoids it. No fix in the data.
- **Subagent recovery misreported (Issue #22323, 13 comments):** a subagent hitting MAX_TURNS reportedly reports `status: "success"` with termination reason GOAL, hiding the interruption. Open, need-retesting.
- **Browser Agent ignores settings (Issue #22267, 4 comments):** `settings.json` overrides such as `maxTurns` are reportedly ignored despite `AgentRegistry` reading them. Open.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.104-3 shipped with only "Fixes and changes" in the release notes; no feature detail is published in the data. The previous build referenced in reports is 1.0.103.
- Issue #5147 (CLOSED): `/restart` no longer fails when the CLI was launched with `--new-session-id`. It matters if you script session restarts with a fixed ID.
- Issue #3815 (CLOSED): the Windows debug-log path now includes the missing `\`, so you can paste it into Explorer.

**Worth knowing**

- Issue #5243 (OPEN, reported as a regression after 1.0.95): subagents started in the same turn as an approved `exit_plan_mode` get no built-in tools — no `bash`, `view`, `edit`, `grep`, or `web`. No fix in the data.
- Issue #5246 (OPEN): editing a prompt so it starts with `!` traps you in Shell mode. Affects normal prompt editing.
- Issue #5205 (OPEN): long sessions fail context rollover with "checkpoint.md is absent for this agent".

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases in the last 24h, so nothing user-facing shipped.

Proposed: GitHub Copilot auto model support (PR #55960) would add `github-copilot/auto`, since Copilot Student and Free plans return `model_picker_enabled: false` for every model and Copilot currently shows up with no models.

Proposed: drop empty tools arrays via `compatibility.omitEmptyTools` (PR #58790, closes #58648), for requests whose tool set is empty while history contains tool calls.

**Worth knowing**

Free-usage limits are misfiring broadly. Users report "Free usage exceeded" with zero Console usage (#58536, #58781: five comments, five 👍) and countdowns that restart instead of resetting (#58831, #58836, #58837). Reported on CLI v2.1.1 and Desktop 1.19.4. No fix appears in this data.

Remote MCP servers that fail once stay `failed` until the background service restarts (#52237, 11 comments, open). New sessions and TUI restarts do not clear it.

Manual compaction can persist a message without the required `recent` field, making the session and its forks unreadable (#58724, open).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24 hours, so nothing is shipped. The active work is in pull requests.

PR #11371 (open) proposes serving 13 non-deprecated Claude models on Google Vertex AI through the Anthropic Messages API. It stacks on PR #11370, which proposes adding DeepInfra, Nebius, Ollama Cloud, Scaleway, SiliconFlow and StepFun as hosted providers.

PR #11372 (open) proposes routing 16 Bedrock models through Bedrock Mantle, the OpenAI-compatible endpoint, because Converse rejects them as invalid model identifiers. It addresses #5363 and applies to Bedrock API keys.

PR #11363 (closed) proposed a `fullscreenCopyTarget` setting so copy-on-select writes to the X11/Wayland primary selection instead of the clipboard.

**Worth knowing**

Issue #4945 (open, `inprogress`, 88 comments, 35 👍) reports `openai-codex` / `gpt-5.5` leaving the TUI stuck on `Working...` with no streamed text or error; only Escape recovers. No fix in the data.

Issue #6665 (open, 15 comments) reports the TUI pinning a full CPU core while streaming long sessions, traced to an uncached `Intl.Segmenter` and per-chunk Markdown rebuild. Reproduces with `pi -ne`, so it is not extension-caused. No fix in the data.

Issue #8810 (open) reports fresh sessions intermittently ignoring `defaultProvider`/`defaultModel` when the provider is registered by an extension via `pi.registerProvider`. No fix in the data.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## What changed

- **v0.26.1 shipped, with a breaking change for QQ bot users.** `fix(qqbot)!: restore per-group session isolation under thread scope` ([#13882](https://github.com/QwenLM/qwen-code/pull/13882)) changes how sessions are scoped, fixing [#14350](https://github.com/QwenLM/qwen-code/issues/14350). If you set `sessionScope: "chat_thread"` on a QQ channel, direct messages are no longer treated as one shared session. Check your config before upgrading.
- **Skill install limits are proposed to increase** ([#15030](https://github.com/QwenLM/qwen-code/pull/15030)). Since 2026-07-17 the native installer has used one hardcoded budget for zip, GitHub, and local-folder installs (6 MiB compressed, 6 MiB uncompressed, 2 MiB per file, 128 files). The PR splits the transport ceiling from the on-disk ceiling. Not yet released.

## Worth knowing

- **Web Shell fails to load in non-English browsers.** [#15445](https://github.com/QwenLM/qwen-code/issues/15445) reports a `TypeError: Cannot read properties of undefined (reading 'desktopRelay.trigger')` since 0.26.0, because the `desktopRelay` i18n lookup has no fallback. Affects any browser UI language other than English or Chinese. Status: need-retesting; no fix in the data.
- **Large sessions can become unopenable.** [#13113](https://github.com/QwenLM/qwen-code/issues/13113) reports `file_history_snapshot` grows quadratically, exceeding a hardcoded 256 MiB index limit; every `POST /session/:id/load` then fails. No fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*