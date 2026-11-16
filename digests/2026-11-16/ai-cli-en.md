# AI CLI Tools Community Digest 2026-11-16

> Generated: 2026-11-16 06:12 UTC | Tools covered: 7

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

**md2video-audio — Markdown to narrated MP4**
Compiles Markdown documents into MP4 videos with human-like voiceovers, using Marp for slides; pitched as zero-cost by its author. PR #1703, open.

**proofcore-contract-auditor — smart contract static analysis**
Runs automated static analysis on Solidity and Rust contracts and anchors audit proofs to the TON Blockchain via ProofCore's Merkle protocol. PR #1771, open.

**scnet-hpc — SCNet cluster operations**
Covers SSH and Slurm workflows on SCNet HPC clusters, including partitions, modules, job generation and cluster discovery per profile. PR #1615, open.

**Open requests**
Users want skills shared inside an organisation without downloading and re-uploading files manually — currently a `.skill` file must be sent by Slack or Teams and each colleague uploads it through Settings > Capabilities (Issue #228).

---

**What changed**

No releases or pull requests landed in the last 24 hours.

**Worth knowing**

- **Windows Remote Control sessions stay broken after relaunch.** Issue #100114 reports that after the desktop app restarts (including a silent update), Remote Control is not restored and every connected session moves to "Archive" on mobile. Unarchiving on the phone wakes the desktop session, which then disappears again. No fix in the data.
- **Session transcripts under 30 days were deleted.** Issue #109897 reports that `~/.claude/projects/*/<session-id>.jsonl` files from the last 1–3 weeks were removed on macOS without `cleanupPeriodDays` being set, breaking `claude --resume`. No fix in the data.
- **Mod stderr hook errors cannot tell the model why.** Issue #110314 reports a hookify `action: block` rule returns `permissionDecision: "deny"` with no `permissionDecisionReason`; the rule message lands only in `systemMessage`, which the model never sees. No fix in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

Two alpha releases landed: rust-v0.171.0-alpha.7 and rust-v0.171.0-alpha.6. The data shows version bumps only, so treat them as pre-release builds without confirmed feature lists.

A cluster of TUI fixes was proposed in closed PRs: #61713 restores raw mode after external editors, #61724 uses `clip.exe` for single-line ASCII copies in WSL, and #61697 restores the terminal's original alternate-scroll mode. These target keyboard and clipboard behavior inside the CLI.

PR #61707 proposes `codex exec --remote <ADDR>` to run a noninteractive turn against an existing app server, supporting new threads or resume by UUID with bearer-token auth. It is in development, not released.

**Worth knowing**

Windows users report the desktop app dropping project folders and browsers: #61294 (local projects vanish after update, 5 comments), #56873 (Chrome and IAB unavailable, 19 comments), and #60812 (secondary project folders omitted from writable roots). No fix appears in the data.

#61749 reports terminal windows repeatedly popping up during normal CLI use on v0.169.0 under Windows. Still open.

MacOS 26.1111.21308 users report the primary window returning to a logo screen while tasks continue (#61637); New Window was verified to restore a usable task view.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

No releases shipped in the last 24 hours, so these are in-development changes.

- **Subagent failures will stop reporting as success.** PR #29367 fixes #22323, where a subagent that hit MAX_TURNS reported `status: success` and `Termination Reason: GOAL`. The open PR preserves the original terminate reason, so you can tell an interrupted agent from a finished one. Matters when you trust subagent status output. [PR #29367](https://github.com/google-gemini/gemini-cli/pull/29367)
- **Windows shell description fix.** PR #30312 makes `run_shell_command` describe the shell actually selected on Windows instead of always claiming `powershell.exe`. Matters if you run shell commands on Windows and rely on the model's description of the shell.
- **Windows tilde-backslash paths.** PR #30308 expands `~\...` paths in `resolvePath` so settings like `policyPaths` and `includeDirectories` resolve against `homedir()` instead of staying literal. Matters for Windows users editing those settings.

**Worth knowing**

- Issue #21409: the generalist agent hangs indefinitely on simple tasks like folder creation; the reporter says instructing the model not to defer to subagents avoids it. 8 comments, 8 👍. No fix in the data. [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)
- Issue #27393: command substitution is blocked by a hardcoded wall with no settings toggle; 32 comments. [Issue #27393](https://github.com/google-gemini/gemini-cli/issues/27393)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

No releases or pull requests landed in the last 24 hours. The only changes in this window are issue updates, listed below.

**Worth knowing**

- Windows `copilot.exe` can hard-crash with an access violation (0xc0000005), losing the in-flight turn and corrupting terminal state. Reported on 1.0.85-era builds (#4891, 1 comment). No fix in the data.
- `~/.copilot/config.json` is rewritten whole on exit, so concurrent sessions can drop `trustedFolders` and other managed state (#4900, 1 comment). No fix in the data.
- MCP connection handling is failing in several reports: a legacy `initialize` sent after a successful `server/discover` is rejected (#4888), and a slow stdio server triggers a fallback on the same connection that a Python SDK server rejects with -32022 (#5464). Both open, no fix.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No releases in the last 24h. Two changes are in development, not shipped:

- **Automations (proposed, PR #64160):** experimental schedules become a trigger plus an action that either prompts a session or runs Code Mode with no model. Still behind a flag, off in release builds. It matters only if you run local or dev builds.
- **Mid-conversation tool changes (proposed, PR #64166):** `@opencode/ai` gains the ability to add or remove tools partway through a conversation; on models that support it natively, the starting tool list stays intact. Closes #64114 link: no, it doesn't. Let me not invent. Actually #64166 says "None" for issue. Good.
- **Windows pipe spawn retry (proposed, PR #64137):** retries shell spawn on packaged access denied, closing #63892. Store PowerShell 7 fails with 0xC0070005 before running commands on Windows; matters if you shell out on Windows 2.3.0.

Let me rewrite as final prose, keeping under 200 words.

**What changed**

No releases in the last 24h, so nothing is shipped. Two proposals matter:

- Automations (PR #64160, proposed): experimental schedules become a trigger plus an action that prompts a session or runs Code Mode with no model. Behind a flag, off in releases.
- Mid-conversation tool changes (PR #64166, proposed): `@opencode/ai` can add or remove tools mid-conversation. On models supporting it, the starting tool list stays.

Ship nothing new unless you run dev builds.

**Worth knowing**

- Free tier: issue #59387 (371 comments) is the collection point for free-tier errors, including resets that never happen. It's an open user report, not a confirmed fix.
- External directory permissions: #56288 (reproduced, high severity) reports `external_directory: ask` is enforced for file tools but skipped for `shell`, so shell writes outside the session run unprompted. Open, fix proposed? No fix in data.
- Budget growth, unreaped zombies #63976 (open) is post 2.3.0 confirms shell children not reaped. Maybe include vs permissions. I'll keep two.

Word counts okay, under 200.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

A fix for Windows process cleanup is in development. PR #11854 replaces `taskkill /F /T /PID` with a method that kills bash and PowerShell command trees whose parent process already exited, because `taskkill /T` follows parent PIDs. It matters for anyone running backgrounded loops on Windows ([PR #11854](https://github.com/earendil-works/pi/pull/11854)).

Ant Ling model support moves to the DeepSeek-compatible reasoning format with Ling 3.0, Ling 3.0 Flash VL, and Ling 3.1 Flash, dropping Ling 2.6, Ring 2.6, and `thinkingFormat: "ant-ling"`. PR #11800 is closed; issue #12201 requested the change ([issue #12201](https://github.com/earendil-works/pi/issues/12201)).

**Worth knowing**

ChatGPT sign-in reports a 272K context window for `gpt-6.1-sol` while the same account's live model catalog advertises 500K, giving Pi a smaller compaction budget. Issue #11021 is open with 14 comments and 8 👍 ([issue #11021](https://github.com/earendil-works/pi/issues/11021)).

Extension-registered providers intermittently ignore `defaultProvider`/`defaultModel` in fresh sessions and fall back to another provider's default. Issue #8810 is open ([issue #8810](https://github.com/earendil-works/pi/issues/8810)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

**Managed Agent sessions gain local directory access and a web terminal.** v0.27.4 registers client filesystems into managed sessions and opens an interactive Managed Web Terminal without persisting credentials or paths ([#16844](https://github.com/QwenLM/qwen-code/pull/16844), [#16866](https://github.com/QwenLM/qwen-code/pull/16866)). Matters when you want managed sessions to reach granted local directories.

**TypeScript SDK v0.1.34 bundles CLI 0.27.4**, so SDK and CLI stay on the same version. Matters when pinning matching versions.

**DingTalk adapter added to managed agents** ([#17136](https://github.com/QwenLM/qwen-code/pull/17136) review follow-ups in [#17173](https://github.com/QwenLM/qwen-code/issues/17173)). Enables managed sessions over DingTalk.

**Worth knowing**

**`/effort` lists all five tiers for models with known supported tiers**, including `gpt-5-pro`, which accepts only `high` on 0.27.4/macOS ([#17411](https://github.com/QwenLM/qwen-code/issues/17411)). A fix is proposed in [#17425](https://github.com/QwenLM/qwen-code/pull/17425).

**`/rewind` after `/cd` can restore a checkpoint into the wrong working directory**, overwriting unrelated files ([#16982](https://github.com/QwenLM/qwen-code/issues/16982)). No fix in the data; flagged ready-for-human.

**Managed hooks reject supported `description` and `statusMessage` metadata during extension installation** ([#17381](https://github.com/QwenLM/qwen-code/issues/17381)). Blocks installs using standard hook metadata; no fix listed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*