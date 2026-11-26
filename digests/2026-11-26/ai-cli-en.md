# AI CLI Tools Community Digest 2026-11-26

> Generated: 2026-11-26 08:03 UTC | Tools covered: 7

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

### md2video-audio — compile Markdown into narrated MP4 video
Turns Markdown documents into MP4 videos with synthetic voiceover, using Marp to render slides. Reach for it when a written document needs a video version; the pull request is open. `anthropics/skills PR #1703`

### scnet-hpc — operate SCNet HPC clusters
Guides SSH connection profiles, Slurm job generation, cluster discovery and partition, memory and module selection for SCNet clusters. Use it for HPC job work rather than local compute; the pull request is open. `anthropics/skills PR #1615`

### proofcore-contract-auditor — static audit of Solidity and Rust contracts
Runs automated static analysis on smart contracts and anchors audit proofs to the TON Blockchain via a zero-storage Merkle protocol. Intended for Web3 developers verifying contract code; the pull request is open. `anthropics/skills PR #1771`

**Open requests**
- Users cannot share skills inside a Claude.ai organization: they must download the `.skill` file, send it through Slack or Teams, and have colleagues upload it manually under Settings > Capabilities. The issue asks for a shared skill library or direct sharing link. `anthropics/skills Issue #228`

---

**What changed**

No releases in the last 24 hours.

**Worth knowing**

- Two open PRs propose publishing the CLI source. PR #41518 says it extracted 1,906 TypeScript files from `cli.js.map` in the npm package and builds with Bun; PR #41447 is titled "feat: open source claude code". Neither is merged, so this is not a released feature. (anthropics/claude-code PR #41518, PR #41447)
- Issue #16157 reports Max subscriptions hitting usage limits instantly; it has 1,500 comments and 697 👍, and stays open. Issue #38335 reports the same for CLI sessions since March 23, 2026, with 879 comments. Both carry the `area:cost` label; no fix appears in the data.
- Issue #112142 reports that in Desktop's Code tab, sessions claimed from a pre-warmed spare lose the end-of-turn box tool (`mcp__ccd_turn__wrap_up`) since version 2.1.331. It affects macOS Desktop users; one comment, no fix listed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## What changed

**TUI image attachments resolve from the file search root.** PR #64071 (closed) opens `@`-completed images using the full path instead of the relative one. Selecting an image no longer fails when the search root differs from your working directory.

**Numeric MCP elicitation fields render as forms.** PR #64023 (closed) replaces the generic approval prompt for MCP forms with numeric fields. You can enter requested values instead of only accepting, which matters when a server needs numbers before proceeding.

**Background command results surface in the TUI.** PR #64015 (closed) shows background command launches and late results, including results arriving after the launching turn ends. Results are no longer dropped when no turn is active.

New alpha release: rust-v0.174.0-alpha.7.

## Worth knowing

**Issue #15723 (open, 34 comments):** background subagents do not wake the calling agent on completion. Reported on codex-cli 0.116.0, Linux. No fix in the data.

**Issue #62732 (open, 11 comments):** CLI local file links open in the sidebar viewer, and `file_opener` has no effect. Reported on codex-cli 0.171.0, macOS. No fix in the data.

**Issue #62901 (open, 20 comments):** the Windows ChatGPT desktop app closes and reopens on Send with a `Peer closed MessagePort connection` error. Version 26.1117.3838.0. No fix in the data.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- No releases in the last 24 hours, so all changes below are proposed in open PRs, not shipped.
- PR #30470 (proposed) adds a `gemini-2.5-flash-image` alias with `responseModalities: ['TEXT', 'IMAGE']`, selectable via `--model` and `/model`, for image generation requests.
- PR #30362 (proposed) makes ACP mode report stopped agent reasons as an assistant message instead of ending with an empty turn (fixes #30199).

**Worth knowing**

- Issue #21409: the generalist agent hangs indefinitely when Gemini CLI defers to it; one author reports waiting up to an hour, and instructing the model not to defer avoids it. Status: need-retesting, no shipped fix.
- Issue #22323: `codebase_investigator` reports `status: "success"` and `Termination Reason: "GOAL"` even when it hits MAX_TURNS before analyzing. 14 comments; open.
- Issue #24246: Gemini CLI returns a 400 error with >128 tools; the body mentions over 400. Open, bot-triaged.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.117-2 fixes `copilot help extensions`, which wrongly claimed your own and plugin extensions load with `-p`. An extension starts there only if its launch was already approved via `--allow-all-tools`, `--yolo`, or a saved approval. Relevant if you relied on that help text to predict what runs in non-interactive mode.
- v1.0.117-1 adds service notices to the `/model` picker and marks retiring models, so you see warnings before choosing. The same release shows an error instead of silently switching providers when a repository pins a model to an unavailable provider — silent provider swaps during pinned-model runs now fail loudly.
- v1.0.117-0 lets custom agents opt in to tools through explicit tool exposure, and lets background agents continue their conversations after restarting the CLI and resuming a session.

**Worth knowing**

- Issue #5574 (1 comment): since 1.0.115, `copilot -p` exits with an error even when the agent completes its task but prints no conclusion, breaking automation that worked up to 1.0.114. No fix in the data.
- Issue #5578 (0 comments): a plugin skill invoked with any argument fails with "Unknown command"; the `/<plugin>:<skill> <args>` form works. No fix in the data.
- Issue #5323 (8 comments): every agent turn creates commits under `refs/agents/*` using your git identity, and a setting to disable them is requested but not shipped.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## What changed

**v2.4.2 ships a GPT-6.2 system prompt.** GPT-6.2 Sol and Astra, plus the `gpt-latest` aliases, now use a prompt written specifically for GPT-6.2 ([#66297](https://github.com/anomalyco/opencode/pull/66297)). After connecting OpenCode, the model picker also lists OpenCode Go.

**Proposed: Kimi gets the default system prompt.** A PR drops the `kimi.txt` override, which told the model to confirm git every time and to use outdated tool names ([#66538](https://github.com/anomalyco/opencode/pull/66538)). Not merged, so nothing changes until it lands.

**Proposed: reused tool call IDs disambiguated.** When a model repeats a tool call ID across steps, strict backends reject the replayed history and the session stops. A PR fixes this for Chat and Responses ([#66544](https://github.com/anomalyco/opencode/pull/66544)).

## Worth knowing

**Windows console windows flash roughly once per second.** Every spawned console process allocates a visible window because the spawn omits `CREATE_NO_WINDOW`; `git.exe` is the most visible case ([#52266](https://github.com/anomalyco/opencode/issues/52266), open, 13 comments).

**Background subagents still cannot be cancelled in v2.** The `subagent` tool returns a session ID and sessions can be resumed, but there is no cancel path ([#36423](https://github.com/anomalyco/opencode/issues/36423), 19 comments).

**TUI `/sessions` lost two pin behaviours after 1.19.0 → 2.4.2.** Pinned sessions outside the current page no longer appear with their quick-switch numbers, and Ctrl+F stops following the pinned row ([#66534](https://github.com/anomalyco/opencode/issues/66534), open).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

Pi v1.6.1 adds decision models to codemode. `models.classify()` can now call GitHub Copilot's `gpt-6-luna-decisions` and Radius decision models, and results include the provider's `responseId`. Matters if you route classification through codemode and need to trace a result back to the provider.

**Worth knowing**

Issue #10956 (19 comments, open): with `cacheWarming: "idle"`, idle warming never fires when an extension handles `turn_end` and the context holds a custom or compaction message. The author reports 507 `cache_warming_decision` events since September, all at `continuationProbability: 1`, none at 0.15. No fix in the data.

Issue #12367 (closed): after updating to 1.6.0, OpenAI drops reasoning items with `prefix_mismatch`. Reported as intermittent, not reproducible on demand.

PR #12556 (draft, open): a proposed `DO_NOT_TRACK` opt-out for install telemetry and attribution. Not released.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## What changed

- **v0.28.6 ships with managed-session parking.** Sessions can now park while waiting on tool approvals, questions, or Hooks/MCP decisions, survive Harness restarts, and resume via cold recovery ([#17953](https://github.com/QwenLM/qwen-code/pull/17953), [#18115](https://github.com/QwenLM/qwen-code/pull/18115)). Parking currently covers only waits that cold recovery already accepts, so most sessions with pending approvals stay resident ([#18149](https://github.com/QwenLM/qwen-code/issues/18149)).
- **sdk-typescript-v0.1.36 bundles CLI 0.28.6** ([PR #18413](https://github.com/QwenLM/qwen-code/pull/18413)). Update the SDK and CLI together to stay aligned.
- **Proposed, not shipped:** [PR #18418](https://github.com/QwenLM/qwen-code/pull/18418) would remove loop detection entirely, letting the model decide instead. Loop detection currently false-positives on verification cycles and kills unattended turns unrecoverably ([#9733](https://github.com/QwenLM/qwen-code/issues/9733), 5 comments).

## Worth knowing

- **`qwen -p` security gap:** in a trusted folder, headless mode with no `--approval-mode` flag reads files outside the workspace that `--approval-mode=default` declines ([#18379](https://github.com/QwenLM/qwen-code/issues/18379)). No fix in the data.
- **Compaction double-counts pending tool results,** inflating the next request's size estimate by 20K and stopping the turn or sending `max_tokens: 1` ([#15486](https://github.com/QwenLM/qwen-code/issues/15486)). No fix in the data.
- **`/btw` queues instead of answering** while a tool call runs, despite the tip suggesting it mid-turn ([#18401](https://github.com/QwenLM/qwen-code/issues/18401)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*