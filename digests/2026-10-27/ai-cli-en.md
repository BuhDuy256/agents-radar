# AI CLI Tools Community Digest 2026-10-27

> Generated: 2026-10-27 03:11 UTC | Tools covered: 7

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

## Skill proposals

### Notion spec to implementation — turns product specs into Notion tasks
Fetches spec pages and breaks them into implementation plans with tasks, acceptance criteria and progress tracking. Reach for it when a product or tech spec needs to become concrete agent-executable work. Open, PR #1245.

### proofcore-contract-auditor — static analysis for Solidity and Rust contracts
Runs automated static analysis on smart contracts and anchors audit proofs onto the TON public blockchain using a zero-storage Merkle protocol. Reach for it when a Web3 developer needs an auditable contract review. Open, PR #1771.

### md2video-audio — compiles Markdown into narrated MP4 videos
Converts Markdown documents through Marp into presentation slides, then adds realistic voiceover to produce MP4 output at zero cost. Reach for it when a document needs to become a narrated video. Open, PR #1703.

**Open requests**

Issue #492 reports that community-made skills are distributed under the `anthropic/` namespace, which the author says lets users mistake them for official Anthropic skills and grant them elevated permissions.

---

## What changed

- **v2.1.311** adds `--hold-idle-file` and `--max-hold-min` to `self-hosted-runner`, so an idle session stays alive while your host reports processes it left running. The same release fixes long startup freezes and fixes a startup-after-resume freeze ([release](https://github.com/anthropics/claude-code/releases)).
- The Explanatory output style now shows a tip when you ask Claude for explanations, pointing you to that style ([v2.1.311](https://github.com/anthropics/claude-code/releases)).

## Worth knowing

- **#105020** — `claude plugin validate` truncates footprint lines at roughly 1,000 characters, in both text and `--json` output. Reported 2026-10-25, no fix in the data.
- **#96628** — after a tool call fails to parse, the retry notice can point `parentUuid` at a row that is never written, so `--resume` loses everything before it. Tagged `data-loss`, has repro, macOS. No fix in the data.
- **#104497** — the Bash tool's bundled `bfs 4.1.1` find follows an ntfs3 junction, loops forever and grows memory without bound; the author reports a global OOM. GNU find terminates. Linux, no fix in the data.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## What changed

Three alpha releases landed: `rust-v0.166.0-alpha.1`, `rust-v0.165.0-alpha.3`, and `rust-v0.165.0-alpha.1.1`. Release notes contain only version strings, so no user-facing changes are described.

A closed PR proposes adding GPT-6.1 Terra to the bundled catalog, GCP Vertex, and Amazon Bedrock (openai/codex PR #57293). It is merged into `main`, not yet in a tagged release.

A closed PR proposes classifying failed subagents as not needing user attention, so a failure no longer promotes the parent task into "Needs you" (openai/codex PR #57315).

## Worth knowing

Issue #56691: Codex 26.1021.22027 fails to start the UI in VS Code 1.143.1 on Windows, reported by a ChatGPT Plus user; 34 comments. No fix appears in the data.

Issue #56655 describes the same UI startup failure for VS Code extension 26.51021.22027 on Windows, with 24 comments. No fix appears in the data.

Issue #28058 reports that encrypted MultiAgentV2 messages removed the readable task audit trail, first reported after #26210; 42 comments. It remains open.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**
- v0.67.0-nightly.20261027.g363a13119 fixes project spending cap errors (PR #29961, @jesussamuel-byte): HTTP 429/400 responses with an empty `details` array are now classified as terminal quota errors. When your AI Studio project hits its monthly cap, the CLI treats it as a quota stop rather than an unknown error.
- The same nightly adds MCP server and tool metadata to ACP permission requests (PR #29910, @duvanka-prasad): permission prompts now surface the specific MCP server and tool names in their option labels.
- Proposed in PR #29973 (frabcd): recheck cancellation immediately before `replace` or `write_file` writes. Currently, cancelling during a file read can still overwrite the target or create a new file; not released.

**Worth knowing**
- Issue #22323 (13 comments): the `codebase_investigator` subagent reports `status: "success"` and `Termination Reason: "GOAL"` after hitting MAX_TURNS before analysing anything. It hides the interruption. No fix in the data.
- Issue #21409 (8 comments, 👍 8): the generalist agent hangs indefinitely whenever the CLI defers to it — folder creation included. Instructing the model not to defer avoids it; no fix in the data.
- Issue #21968 (7 comments): the author reports Gemini rarely uses custom skills or subagents unless told explicitly. A user report, not a confirmed bug.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- In v1.0.104, the managed model "fusion" starts sessions on Auto and applies `fusionTier` settings. If you rely on a pinned model at session start, check your first turn.
- Interactive and SDK Autopilot sessions now keep waiting for attached background tasks instead of stopping after `COPILOT_TASK_WAIT_TIMEOUT_SECONDS`. `-p --autopilot` still honors that timeout, so headless runs behave as before.
- v1.0.104-4 ships as "Fixes and changes," with no further detail in the release notes.

**Worth knowing**

- Issue [#5253](https://github.com/github/copilot-cli/issues/5253) reports long-lived sessions becoming unresponsive on 1.0.103, with repeated `session lock unavailable during is_session_generation_current` errors. No fix appears in the data.
- Issue [#4560](https://github.com/github/copilot-cli/issues/4560) claims the `auto` model always runs with `reasoningEffort: null` and rejects configuration attempts.
- Issue [#4024](https://github.com/github/copilot-cli/issues/4024) reports `/voice` transcription returning empty for all three bundled ASR models; 14 comments, still open.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

- GUI plugins can now use toasts, dialogs, OS notifications, shell tabs, and composer read/write. Proposed in PR #59469 and #59462, both closed; drafts only, not released. Matters if you port TUI plugin features to Desktop.
- `@opencode/ai` got async tool support and `generateObject`, so you no longer need Effect and `Effect.tryPromise` to define a tool (PR #59445, closed).
- Response-encoding failures now return server errors instead of a misleading 400 `InvalidRequestError` (PR #59459). Affects APIs like `/api/experimental/generate/image`.

**Worth knowing**

- Free-tier problems are consolidated in open issue #59387 (15 comments): "free usage exceeded" errors, and resets that never happen. No fix in the data.
- Plan mode could modify files before enforcement; issue #57066 is closed as reproduced.
- v2 (`opencode2`) sent `max_tokens` without respecting `limit.output`, truncating thinking turns (#47398, closed).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

Fixed tool search ranking exact tool names first (PR #11440, #11437; issue #11331, closed as fix-available). `tool_search` and codemode `searchTools()` now prefer a tool whose name matches the query, instead of letting BM25 length normalization rank a shorter unrelated description higher. Matters when your agent asks for a named tool like `thread_read` and previously got the wrong one.

Corrected Kitty function-key decoding in the TUI (PR #11422, in development; fixes #11345). The proposed fix decodes F1–F12 sequences with modifiers, repeat and release events, and stops private-use codepoints from being inserted as printable text. Affects you if you use Kitty or a Kitty-protocol terminal.

`ctx.ui.custom()` dialogs can opt in to blocked status via a `blocked` option (issue #11428, closed). Only `select()` and `confirm()` reported blocked status through OSC 7501 before; custom dialogs could not.

**Worth knowing**

Pi does not pick up refreshed AWS credentials in long-running sessions (issue #11221, open, 4 comments). Bedrock sessions fail with `ExpiredTokenException` after the token rotates; no fix in the data.

MCP HTTP JSON responses bypass `maxMessageBytes` (issue #11335, open). With a 512-byte limit, a 2,048-byte tool description in JSON is accepted while the same content over SSE is rejected.

`pi update --models` is rejected as `Unknown option` despite being documented (issue #11453, closed the same day).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- **Session permission rules and Auto approval (v0.26.2-preview.0, v0.26.1-nightly.20261026.34769f9d41).** Managed sessions can now carry permission rules plus an Auto approval mode ([PR #15448](https://github.com/QwenLM/qwen-code/pull/15448)). It matters when you run managed agents and want approvals handled automatically.
- **TypeScript SDK v0.1.23 released**, bundling CLI 0.26.1. Update the SDK to stay matched with that CLI version.
- **Proposed, not released:** [#15422](https://github.com/QwenLM/qwen-code/pull/15422) adds a persistent per-session Workflow mode, settable via `--workflow-mode on`, `/workflows mode on`, SDK, or ACP/daemon. Still open.

**Worth knowing**

- Headless `-p` denies managed auto-memory writes, so memory never saves under default or Auto approval ([#15597](https://github.com/QwenLM/qwen-code/issues/15597), P1). No fix in the data.
- Headless `-p` also refuses read-only shell commands containing `2>&1`, treating it as a write to a file named `&1` ([#15600](https://github.com/QwenLM/qwen-code/issues/15600)). No fix listed.
- Homebrew 0.26.1 on Apple Silicon fails to rewrite `libopentui.dylib`'s install name; `qwen --version` still works ([#15690](https://github.com/QwenLM/qwen-code/issues/15690)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*