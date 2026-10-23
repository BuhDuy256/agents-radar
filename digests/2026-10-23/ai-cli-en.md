# AI CLI Tools Community Digest 2026-10-23

> Generated: 2026-10-23 06:10 UTC | Tools covered: 7

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

# Claude Code Skills — Community Highlights Report
*Data snapshot: 2026-10-23 | Source: github.com/anthropics/skills*

---

## 1. Top Skills Ranking

Ranked by community attention (comments, review activity, cross-references). Note: PR comment counts were unavailable in the dataset, so ranking reflects update recency, linked issues, and discussion depth.

| # | Skill / PR | Functionality | Discussion Highlights | Status |
|---|---|---|---|---|
| 1 | **mcp-builder fix** ([#1742](https://github.com/anthropics/skills/pull/1742)) | Updates MCP builder for `mcp>=2.0.0` — renames `streamablehttp_client` → `streamable_http_client`, adds custom header support via `create_mcp_http_client`. Linked to issue #1668. | Part of a cluster of mcp-builder defects (see also #1390, #1668); active as recently as 2026-10-08. | OPEN |
| 2 | **skill-creator: isolate trigger evals** ([#1298](https://github.com/anthropics/skills/pull/1298)) | Fixes false-miss/invalid-score issues in trigger evaluation — per-worker probe contention, Windows `select()` failures, unrelated tools aborting scans. | Responds directly to community-reported eval instability (#1383, #556). Updated 2026-09-16. | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | Two-skill bundle: transforms Notion specs into actionable Notion tasks with acceptance criteria; audits resumes quantitatively. | Long-lived PR (opened June, updated Oct 15) — sustained contributor engagement. | OPEN |
| 4 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Static analysis for Solidity/Rust smart contracts with cryptographic audit proofs anchored to TON Blockchain (Merkle protocol). | Novel Web3 vertical; niche but distinctive. | OPEN |
| 5 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Zero-cost pipeline compiling Markdown → Marp slides → MP4 with AI voiceover. | Media-generation skill; highlights demand for multi-modal output. | OPEN |
| 6 | **pyxel retro game dev** ([#525](https://github.com/anthropics/skills/pull/525)) | Guides creation, debugging, and headless verification of Pyxel retro games. | Long-running (since March); stable community interest. | OPEN |
| 7 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | Prevents orphan word wrap, widow paragraphs, and numbering misalignment in generated docs. | Broad appeal — touches *every* document Claude generates. | OPEN |
| 8 | **ODT skill** ([#486](https://github.com/anthropics/skills/pull/486)) | Full OpenDocument (.odt/.ods) create/fill/parse/convert-to-HTML support. | Fills a clear gap in the document-skills family. | OPEN |

**Honorable mentions:** `scnet-hpc` (#1615), `skill-quality-analyzer` + `skill-security-analyzer` (#83), frontend-design clarity overhaul (#210).

---

## 2. Community Demand Trends

Distilled from the top 15 Issues. Four clear demand clusters emerge:

**A. Trust, Security & Governance** *(highest engagement)*
- [#492](https://github.com/anthropics/skills/issues/492) — **46 comments, the #1 issue**: community skills distributed under the `anthropic/` namespace enable trust-boundary abuse.
- [#1394](https://github.com/anthropics/skills/issues/1394) — eval-viewer XSS via non-attribute-safe `escapeHtml()`.
- [#412](https://github.com/anthropics/skills/issues/412) — proposal for `agent-governance` skill (policy enforcement, audit trails). CLOSED.
- **Signal:** users want provenance, sandboxing, and governance primitives before they trust third-party skills.

**B. Skill-Creator Reliability & Evaluation Tooling** *(most frequent)*
- [#556](https://github.com/anthropics/skills/issues/556), [#1383](https://github.com/anthropics/skills/issues/1383), [#202](https://github.com/anthropics/skills/issues/202) — trigger evals at 0%, Windows breakage, benchmark mismatches, tone/style violations.
- **Signal:** the meta-tooling for authoring skills is itself the biggest source of friction.

**C. Workflow & Collaboration Automation**
- [#228](https://github.com/anthropics/skills/issues/228) — org-wide skill sharing (17 comments, 8 👍).
- [#189](https://github.com/anthropics/skills/issues/189) — duplicate content across `document-skills`/`example-skills` plugins (9 👍).
- **Signal:** enterprise adoption requires sharing, deduplication, and library management.

**D. Quality Gates & Memory**
- [#1385](https://github.com/anthropics/skills/issues/1385) — Reasoning Quality Gate Pipeline (calibration → adversarial review → delivery verification).
- [#1329](https://github.com/anthropics/skills/issues/1329) — `compact-memory` symbolic notation for agent state.
- [#1487](https://github.com/anthropics/skills/issues/1487) — `claude-api` skill injects ~156k tokens in a single call.
- **Signal:** demand for context-efficiency and self-verification patterns.

---

## 3. High-Potential Pending Skills

Active-comment / active-update PRs most likely to land soon (all OPEN):

| PR | Skill | Why It's Promising |
|---|---|---|
| [#1977](https://github.com/anthropics/skills/pull/1977) | algorithmic-art wrapAround fix | Small, self-contained bug fix; closes #1897; updated 2026-10-18. |
| [#1976](https://github.com/anthropics/skills/pull/1976) | webapp-testing element_discovery fix | Closes #1891; trivial scope; same author as #1977. |
| [#1980](https://github.com/anthropics/skills/pull/1980) | webapp-testing `shell=True` removal | Security fix (CWE-78); updated 2026-10-22 — freshest PR in set. |
| [#1997](https://github.com/anthropics/skills/pull/1997) | skill-creator YAML frontmatter parser | Fixes metadata divergence bug; updated 2026-10-19. |
| [#1792](https://github.com/anthropics/skills/pull/1792) | docx LibreOffice timeout handling | Correctness fix — prevents false success. |
| [#1730](https://github.com/anthropics/skills/pull/1730) | claude-api dead URL replacement | Trivial, verified HTTP 200; low-risk merge. |
| [#1681](https://github.com/anthropics/skills/pull/1681) | skill-creator standalone execution | Fixes `ModuleNotFoundError` for direct script runs. |
| [#1245](https://github.com/anthropics/skills/pull/1245) | Notion spec + resume auditor | New-skill submission; sustained contributor activity through Oct 15. |

**Pattern:** a wave of small, high-quality bug-fix PRs landed between Oct 6–22, suggesting review bandwidth is now favoring low-risk corrections over large new-skill submissions.

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is not for more skills — it is for *trustworthy* skills: secure provenance/namespace handling, reliable evaluation tooling, and verifiable correctness, all of which currently gate adoption more than raw capability does.**

---

*Prepared from anthropics/skills PR and Issue metadata, 2026-10-23. Comment counts on PRs were not populated in the source dataset; PR ranking is inferred from update recency, linked-issue density, and cross-references.*

---

**What changed**

- v2.1.309 fixes sandboxed Bash commands on macOS and Linux running the shell's startup files outside the sandbox before each command — relevant if you rely on the sandbox for untrusted commands.
- Same release fixes macOS sandbox `denyWrite` glob patterns not applying at a path's real location when reached through a symlink; useful if your deny rules target symlinked directories.
- PR #99118 (closed) changes `/diff` so other plugins' toasts show while the pane or dialog is open, instead of being held until it closes.
- PR #99540 (closed) seats an organization's tool approval ceiling over plugins a user installs.

**Worth knowing**

- Desktop Code tab: context-window usage missing from the usage ring/popover across many reports (#102094 closed, #102615, #102103, #102176, #103885). Affects desktop users; one closed, others open.
- Windows: Bash tool leaks orphaned child processes on timeout (#76353) — runaway `find`/scans accumulate for hours.
- Windows: Remote Control not restored after app relaunch, sessions archived on mobile (#100114).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- Added ten numbered `/presets` slots for reusable prompts and slash commands, with a keyboard menu; useful when you repeat the same prompts and want them one keystroke away ([rust-v0.164.0](https://github.com/openai/codex/releases)).
- `/model` and `/permissions` now accept inline arguments for model, reasoning effort, speed, and permission profiles; useful when you switch configurations without leaving the prompt ([rust-v0.164.0](https://github.com/openai/codex/releases)).
- Added experimental attached thread forks (`attachToSource` on `thread/fork`), which persist a fork attached to its source without emitting `thread/started`; requires local storage and rejects `ephemeral`/`deferGoalContinuation` ([#56351](https://github.com/openai/codex/pull/56351)).
- `thread/sample` accepts an optional `threadSource`, defaulting to `thread_sample` when omitted ([#56364](https://github.com/openai/codex/pull/56364)).

**Worth knowing**

- Windows 10 Computer Use deadlocks awaiting SoftwareBitmap conversion inside FrameArrived — 50 comments, still open ([#35446](https://github.com/openai/codex/issues/35446)).
- BYOK Work mode blocks message submission when local browser/computer tools are enabled — 37 comments, 27 👍, open ([#54841](https://github.com/openai/codex/issues/54841)).
- CLI quota drains abnormally fast even on trivial cached prompts; open ([#51088](https://github.com/openai/codex/issues/51088)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- v0.67.0-nightly.20261023.ga713410ab is out; it fixes extended token usage metadata preservation with per-turn reporting alignment ([PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834)) and ensures model turns with function calls receive thought signatures.
- [PR #29890](https://github.com/google-gemini/gemini-cli/pull/29890) restores workspace directories only after a resumed chat succeeds; useful when a resume fails and you don't want stale directories left in context.
- [PR #29859](https://github.com/google-gemini/gemini-cli/pull/29859) shows executing subagent tool calls in the task tree again; useful when you need to see what a subagent is currently running.
- [PR #29880](https://github.com/google-gemini/gemini-cli/pull/29880) adds a `gemini models` subcommand and `--list-models` flag with JSON output; useful when you need programmatic model discovery.

**Worth knowing**

- The generalist agent can hang indefinitely, even on simple changes like folder creation ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments); instructing the model not to defer to subagents reportedly avoids it. No fix in the data.
- The Browser Agent ignores `settings.json` overrides such as `maxTurns` ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)); no fix in the data.
- More than roughly 128 tools triggers a 400 error ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)); no fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.103 (2026-10-22): Clicking a completed response code block copies its original code when enabled; useful when you want the raw snippet rather than re-rendered output.
- v1.0.103: ACP sessions now honor saved sandbox settings and `--sandbox`/`--no-sandbox` flags, including on resume.
- v1.0.103: Cloud replies keep full text when the CLI reconnects after a dropped connection.
- v1.0.103: Sessions browser sh (item text truncated in the data).

**Worth knowing**

- Issue #5232 (OPEN, updated 2026-10-23): In `manual` permission mode, shell commands whose referenced paths all sit inside a trusted folder auto-approve without prompting, even for scripts, sqlcmd, or curl. No fix noted.
- Issue #5242 (OPEN, 2026-10-23): When the host's inotify watch budget is exhausted, MCP config watch registration fails with ENOSPC and sessions stop processing prompts. No fix noted.
- Issue #5238 (OPEN, 2026-10-23, v1.0.103): Past the 50-image session limit, removing the oldest image triggers a full cache refill for every subsequent image, which gets expensive. No fix noted.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

- Released v1.19.4, upgrading the bundled Bun runtime to 1.4.4 (security fixes for Brotli, TLS, HTTP/1.1–3, WebSocket, `fetch`; root certs updated to NSS 3.131.1).
- PR #58355 (closed): the agent's configured `model` is now used when a session has no model, fixing `opencode run --agent <id>` silently falling back to the server default.
- PR #58352 (open): when no model is selected, sessions default to the agent and last-used model instead of the newest released model (previously landing on a free model).
- PR #58349/#58351 (closed): MCP servers are no longer duplicated during initial reconciliation and stop in parallel on shutdown, fixing slow `service restart`.

**Worth knowing**

- Issue #58176 (open, reproduced): v2 never generates session titles; new sessions stay "Untitled session" while v1.18.x auto-titled. No fix in the data.
- Issue #51828 (open): background shells are SIGTERM'd after 60 minutes of location inactivity, tearing down the location-scoped shell graph while the service stays alive.
- Issue #50257 (open): desktop model picker shows "No reasoning" for all V2 models because `capabilities.reasoning` is never set.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**
- No new releases in the last 24h.
- PR #11299 fixes `thinkingLevelMap?.off` type guard and spurious `max_completion_tokens`; useful when running `reasoning: true` + `thinkingFormat: "openrouter"` models without a `thinkingLevelMap` via `--model`. (earendil-works/pi PR #11299)
- PR #11293/#11275 replace recursive HTML export tree traversals with explicit stacks; useful for `/export` on long sessions that previously rendered blank. (earendil-works/pi PR #11293)
- PR #11290 renders system messages in HTML export; useful for seeing the initial prompt and mid-session section/tool updates. (earendil-works/pi PR #11290)

**Worth knowing**
- #11086 (OPEN, prio:p0): symbols leak into input on Windows terminals under CPU load while SSHing to a Linux box running Pi 1.3; no fix in the data. (earendil-works/pi Issue #11086)
- #11287 (CLOSED): mid-session settings reload wipes extension-provided API providers, causing `No API provider registered` uncaughtException and process exit; closed, but no linked PR in the data. (earendil-works/pi Issue #11287)
- Discussion #11307: `pi-better-web-search` registers one `web_search` tool with raw provider results and cross-provider fallback; useful when the current model can't search. (earendil-works/pi Discussion #11307)

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**
- Added daemon token persistence in `qwen serve` via PR [#15023](https://github.com/QwenLM/qwen-code/pull/15023), shipped in v0.26.0-nightly.20261022.bf66a26c97; useful when you run the daemon and need tokens to survive restarts.
- PR [#15313](https://github.com/QwenLM/qwen-code/pull/15313) adds `web_fetch` to Managed Agent Workspace Sessions; useful when a Workspace Session needs to fetch URLs, matching the feature request in issue [#15076](https://github.com/QwenLM/qwen-code/issues/15076).
- [v0.26.0-nightly.20261022.bf66a26c97](https://github.com/QwenLM/qwen-code/releases) fixes release coverage for every spawned vendored binary.
- PR [#15332](https://github.com/QwenLM/qwen-code/pull/15332) fixes the review build-test step so it reaches the test phase on this monorepo after the pnpm migration; useful when a PR touches root-depended packages like core, cli, or acp-bridge.

**Worth knowing**
- Issue [#15297](https://github.com/QwenLM/qwen-code/issues/15297) reports Qwen Code 0.26.0 silently dropping tool results (~43 of 1,663 calls per round, 28 confirmed by transcripts); labeled P1, status/need-information — no fix in the data.
- Issue [#15328](https://github.com/QwenLM/qwen-code/issues/15328): headless runs exit 0 with no output when a turn is truncated by the output limit; affects non-interactive/scripted use, no fix listed.
- Issue [#15165](https://github.com/QwenLM/qwen-code/issues/15165): shell safety classification can spike to ~1.6 GiB transient WASM memory on Node 24.16.0/Linux x64; affects memory-tight environments, no fix in the data.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*