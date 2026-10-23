# AI CLI Tools Community Digest 2026-10-23

> Generated: 2026-10-23 06:31 UTC | Tools covered: 7

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

> **Note on data quality:** The PR dataset reports `Comments: undefined` for all 50 rows, so PRs cannot be ranked strictly by comment count. Rankings below are based on composite attention signals (recency, update frequency, 👍 count, number of linked issues, and prominence in the sorted feed). Issues, which do carry comment counts, are ranked directly.

---

## 1. Top Skills Ranking (by PR / discussion attention)

| # | Skill / PR | Functionality | Discussion Highlights | Status |
|---|-----------|---------------|----------------------|--------|
| 1 | **mcp-builder fix** — `streamable_http_client` + custom headers ([#1742](https://github.com/anthropics/skills/pull/1742)) | Repairs the MCP server builder skill for `mcp>=2.0.0`, which renamed `streamablehttp_client` and moved headers to `create_mcp_http_client`. | Directly fixes Issue #1668; updated across a full month (2026-09-08 → 2026-10-08), signaling active iteration. Related Issue #1390 shows the same skill's `evaluation.py` scoring 0/N on real servers — the MCP-builder skill is under sustained maintenance pressure. | OPEN |
| 2 | **skill-creator: trigger eval isolation + Windows/runtime fixes** ([#1298](https://github.com/anthropics/skills/pull/1298)) | Makes trigger evaluation deterministic — isolates per-worker command probes, fixes `select()` on subprocess pipes on Windows, prevents unrelated tools from aborting scans. | One of several skill-creator fixes (see also #1681, #1997); touches Issues #556 (0% trigger rate), #1383 (broken trigger evals on Windows), #1394 (XSS in eval-viewer). The skill-creator toolchain is the single largest cluster of community bug reports. | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | Transforms Notion product/tech specs into concrete, actionable Claude Code tasks (acceptance criteria, progress tracking); second skill audits resumes quantitatively. | Longest-lived actively updated submission in the top group (2026-06-02 → 2026-10-15). Represents the "spec → executable plan" workflow-automation trend. | OPEN |
| 4 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Automated static analysis of Solidity/Rust smart contracts with cryptographic audit proofs anchored to the TON blockchain (zero-storage Merkle protocol). | Notable as the Web3/blockchain entrant in an ecosystem otherwise dominated by document and dev-tooling skills; branding-driven (protocol-author submission). | OPEN |
| 5 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Zero-cost pipeline compiling Markdown → Marp slides → narrated MP4 with human-like voiceover. | Extends the document-generation family (docx/pdf/odt) into media output; the "zero-cost" framing suggests it avoids paid TTS APIs — a recurring community concern. | OPEN |
| 6 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | Typographic QC for generated documents: orphan word wrap, widow paragraphs, numbering misalignment. | Strong conceptual fit with the official document-skills suite; nearly every Claude-generated document exhibits these defects, giving it broad applicability despite low 👍. | OPEN |
| 7 | **pyxel** ([#525](https://github.com/anthropics/skills/pull/525)) | Retro game development in Python via Pyxel — headless input-driven runs, direct frame inspection, state checks. | Oldest top-20 skill submission with sustained updates (2026-03-05 → 2026-09-22), indicating the author is maintaining it through review rounds. | OPEN |
| 8 | **skill-quality-analyzer + skill-security-analyzer** ([#83](https://github.com/anthropics/skills/pull/83)) | Meta-skills evaluating skills across five quality dimensions (structure, docs, etc.) and security review. | Earliest top-20 PR (2025-11-06) and thematically tied to Issue #492 (trust-boundary abuse) — meta-tooling remains an unaddressed gap. | OPEN |

*Other notable fixes:* [webapp-testing shell=True removal (CWE-78)](https://github.com/anthropics/skills/pull/1980), [docx LibreOffice timeout handling](https://github.com/anthropics/skills/pull/1792), [skill-creator YAML frontmatter parsing](https://github.com/anthropics/skills/pull/1997), [algorithmic-art `wrapAround()` fix](https://github.com/anthropics/skills/pull/1977).

---

## 2. Community Demand Trends (from Issues)

Ranked by comment count and recency:

1. **Supply-chain security & namespace trust** — [Issue #492](https://github.com/anthropics/skills/issues/492) (46 comments, 👍3, active 7+ months). Community skills published under `anthropic/` impersonate official skills, enabling privilege escalation via the trust boundary. **Highest-engagement issue in the entire dataset by a wide margin.**

2. **Org-wide skill distribution** — [Issue #228](https://github.com/anthropics/skills/issues/228) (17 comments, 👍8). Users must manually download `.skill` files, share via Slack/Teams, and have colleagues re-upload via Settings. Demand: shared skill libraries and share links.

3. **Skill triggering / evaluation reliability** — [Issue #556](https://github.com/anthropics/skills/issues/556) (13 comments, 👍7). `run_eval.py` never triggers skills (0% trigger rate) because `claude -p` + `.claude/commands/` frontmatter doesn't invoke the `Skill`/`Read` tool. Corroborated by #1383 and #1298.

4. **Context efficiency & skill hygiene** — [Issue #1487](https://github.com/anthropics/skills/issues/1487): `claude-api` eagerly injects ~156k tokens in one tool call, exhausting the context window. [Issue #189](https://github.com/anthropics/skills/issues/189) (👍9): duplicate skills from `document-skills` and `example-skills` plugins bloat the context. Demand: lazy loading and de-duplication.

5. **Skill-authoring best practices** — [Issue #202](https://github.com/anthropics/skills/issues/202) (CLOSED): skill-creator reads as developer documentation, not operational instructions; verbose tone undermines token efficiency, and the name violates its own guidelines.

6. **Governance / safety patterns** — [Issue #412](https://github.com/anthropics/skills/issues/412, CLOSED): policy enforcement, threat detection, trust scoring, audit trails for agent systems. [Issue #1385](https://github.com/anthropics/skills/issues/1385): three-gate reasoning quality pipeline (calibration → adversarial review → delivery verification).

7. **Memory & state compaction** — [Issue #1329](https://github.com/anthropics/skills/issues/1329): symbolic notation to compress long-running agent memory and reduce context spend. Related to trend #4.

**Distilled demand directions:** security/trust boundaries, organizational distribution, meta-tooling (trigger reliability, quality/security analyzers), context-budget discipline, and formal quality-gate pipelines. Notably absent as demand: test generation and code review — the community's pull is toward *infrastructure around skills*, not new domain skills per se.

---

## 3. High-Potential Pending Skills (active, unmerged)

PRs with recent update activity (September–October 2026) and no merge yet:

| PR | Skill | Why it may land soon |
|----|-------|---------------------|
| [#1997](https://github.com/anthropics/skills/pull/1997) | skill-creator YAML scalar parsing fix | Updated 2026-10-19; addresses a concrete correctness bug (`parse_skill_md` corrupts quoted descriptions), directly upstream of trigger/eval quality. |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder `mcp>=2` compatibility | Updated 2026-10-08; fixes a hard breakage (#1668) for anyone on current MCP SDK. Compatibility fixes historically merge fastest. |
| [#1245](https://github.com/anthropics/skills/pull/1245) | notion-spec-to-implementation + resume auditor | Updated 2026-10-15; long-running but still actively revised — likely waiting on skill-splitting or naming feedback. |
| [#1980](https://github.com/anthropics/skills/pull/1980) | webapp-testing `shell=True` removal | Updated 2026-10-22 (most recent in dataset); a clean CWE-78 security fix with a small diff — low review friction. |
| [#1730](https://github.com/anthropics/skills/pull/1730) | claude-api dead-URL replacement | Updated 2026-10-04; 3 URLs replaced with curl-verified HTTP 200 targets — trivially mergeable docs fix. |
| [#1681](https://github.com/anthropics/skills/pull/1681) | skill-creator direct execution of `package_skill.py` | Updated 2026-10-08; fixes `ModuleNotFoundError` for standalone invocation, a common developer workflow. |
| [#1792](https://github.com/anthropics/skills/pull/1792) | docx LibreOffice timeout → real error | Updated 2026-09-25; changes silent false-success into verified output — correctness fix with testable behavior. |
| [#1976](https://github.com/anthropics/skills/pull/1976) / [#1977](https://github.com/anthropics/skills/pull/1977) | webapp-testing `textarea`/`select` reporting; algorithmic-art `wrapAround()` | Updated 2026-10-18; both reference closed-loop Issues (#1891, #1897) and are small, well-scoped bug fixes. |

**Pattern:** the highest-probability near-term merges are *bug fixes to existing official skills* (skill-creator, mcp-builder, webapp-testing, docx, claude-api), not net-new skills. New-skill PRs (#1245, #1771, #1703, #1615, #525, #514, #486) remain open far longer — some since early 2026.

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is not for new domain skills but for hardening the skill *infrastructure* — trust boundaries (46-comment Issue #492), reliable triggering/evaluation (0% trigger rate in #556), and context-budget discipline (#1487, #189) — while PR throughput is dominated by correctness fixes to the official skill-creator and mcp-builder toolchains rather than novel capability submissions.**

---

**What changed**

- v2.1.309 fixed sandboxed Bash on macOS and Linux running shell startup files outside the sandbox before each command; useful if you run untrusted commands in a sandbox.
- v2.1.309 fixed macOS sandbox `denyWrite` glob patterns not applying at a path's real location when reached through a symlink; useful if you deny writes under symlinked folders.
- Seven PRs by @poteat (e.g. #99540, #99137, #97688, #97334) were closed: where `sec-default` is seated, a person's plugin can no longer loosen deny/ask rules, lift an organization's tool ceiling, or drop/rewrite collector records.
- #99118 and #99141 addressed `/diff` pane behavior: toasts from other plugins now show while the pane is open, and a pane opened before anything can draw it shows once something can.

**Worth knowing**

- Desktop Code tab context-window usage keeps disappearing: #102094 (closed, Windows), #103918 (closed, macOS), #102615, #102103, #102623, #103885, #102133 — plan limits still show.
- #76353: on Windows, Bash-tool timeouts kill `bash.exe` but not descendants, so orphaned `find`/scans keep running; open, no fix in the data.
- #104497: the bundled `find` (bfs 4.1.1) loops forever and grows memory unbounded on an ntfs3 junction reported as DT_DIR; GNU find terminates; open, no fix.

Links: github.com/anthropics/claude-code

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## What changed
- Added numbered `/presets` slots for reusable prompts and slash commands, with a keyboard menu; useful when you repeat the same prompts often. (rust-v0.164.0, #54380, #54381)
- Added inline `/model` and `/permissions` arguments to set model, reasoning effort, speed, and permission profiles directly. (rust-v0.164.0, #54378, #54383)
- Added `threadSource` to `thread/sample` requests, defaulting to `thread_sample` when omitted. (PR #56364)
- Added `attachToSource` to `thread/fork` to persist a fork attached to its source; requires local storage and cannot use `ephemeral` or `deferGoalContinuation`. (PR #56351)

## Worth knowing
- Windows CLI 0.163.0 users with `[windows] sandbox = "elevated"` hit sandbox ACL refresh failures (`os error 5`) before PowerShell starts, even for read-only commands, across existing and fresh Git workspaces. No fix in the data. (#56078)
- Windows desktop users may see recurring "workspace routing discovery timed out" errors during goals and subagent workflows. No fix in the data. (#54540)
- Multiple users report "Selected model is at capacity" errors on all models, including one reporting 69 confirmed failures; one report notes web works normally. No fix in the data. (#56105, #56368)

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**
- Nightly `v0.67.0-nightly.20261023.ga713410ab` preserves extended token usage metadata and aligns per-turn reporting ([PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834)); also ensures all model turns with function calls receive thought signatures.
- Subagent tool calls now stay visible in the task tree while executing ([PR #29859](https://github.com/google-gemini/gemini-cli/pull/29859)); useful when monitoring active subagent work.
- Claude Code `SubagentStop` hooks now migrate correctly, with `Stop` and `SubagentStop` appended instead of overwriting ([PR #29764](https://github.com/google-gemini/gemini-cli/pull/29764)).
- MCP `tools/list` discovery is bounded by a 60s default timeout instead of inheriting the 10-minute tool-call timeout ([PR #29767](https://github.com/google-gemini/gemini-cli/pull/29767)).

**Worth knowing**
- Generalist agent hangs indefinitely on simple tasks like folder creation ([Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments); no fix in the data.
- Browser Agent ignores `settings.json` overrides such as `maxTurns` ([Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)); no fix in the data.
- Subagent recovery after `MAX_TURNS` is reported as `GOAL` success, hiding the interruption ([Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)); no fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**
- v1.0.103 (2026-10-22): Clicking a completed response code block now copies its original code when enabled; useful when you want the exact source, not the rendered output.
- ACP sessions now honor saved sandbox settings and `--sandbox`/`--no-sandbox` flags, including on resume; useful when resuming work without re-specifying sandboxing.
- Cloud replies keep full text when the CLI reconnects after a dropped connection; useful on flaky networks.
- Sessions browser changes shipped in the same release (details truncated in the data).

**Worth knowing**
- #5240 (closed): Interactive mode broke terminal TTY on macOS 1.0.98 in iTerm2 and Terminal.app. A closed status is reported; no fix details are in the data.
- #5197 (open): Voice server segfaults (signal 11) on WSL2 after updating to 1.0.100; `/voice` stays on "Fetching voice models". 4 comments, 2 👍. No fix in the data.
- #5232 (open): In manual permission mode, shell commands whose paths are inside trusted folders run without prompting, even with unpredictable side effects. 2 comments. No fix in the data.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**
- v1.19.4 upgrades the bundled Bun runtime to 1.4.4, bringing security fixes for Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket, and `fetch`, plus NSS 3.131.1 root certificates.
- PR #58355 fixes the agent's `model` setting being ignored when a session starts without one, so `opencode run --agent <id>` no longer falls back to the server default.
- PR #58350 skips malformed MCP tools individually instead of failing the whole server, so one bad `inputSchema` no longer takes down a server's tools.
- PR #58351 stops MCP servers in parallel on shutdown, addressing the per-server 2–4s stdin-close delays reported in #50758.

**Worth knowing**
- Issue #50257 (open): the desktop model picker shows "No reasoning" for all V2 models, including ones that support reasoning, because `capabilities.reasoning` is never set. No fix in the data.
- Issue #58176 (open, reproduced): V2 never generates session titles — new sessions stay "Untitled session" — with no auto trigger and free-tier rejection cited.
- Issue #58364 (open): archived sessions still appear in the TUI session picker (`Ctrl+O`), though the API filter `GET /api/session?archived=false` works.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**
- PR [#11304](https://github.com/earendil-works/pi/pull/11304) (open) stops startup from aborting when a configured package fails to install — it skips the source and loads the rest, useful if a bad settings entry currently bricks launch.
- PR [#11288](https://github.com/earendil-works/pi/pull/11288) (open) rewrites forked sessions through a single file descriptor instead of one `appendFileSync` per entry, fixing 30s+ `--fork` stalls on large sessions (see issue [#11253](https://github.com/earendil-works/pi/issues/11253)).
- Multiple merged PRs ([#11293](https://github.com/earendil-works/pi/pull/11293), [#11275](https://github.com/earendil-works/pi/pull/11275), [#6843](https://github.com/earendil-works/pi/pull/6843)) replace recursive HTML-export traversals with iterative stacks, fixing blank `/export` pages on long sessions ([#11225](https://github.com/earendil-works/pi/issues/11225)).
- PR [#11289](https://github.com/earendil-works/pi/pull/11289) (merged) signals macOS shell process groups before killing them, reducing the race where aborting `a; b` still ran `b` ([#11252](https://github.com/earendil-works/pi/issues/11252)).

**Worth knowing**
- Issue [#11086](https://github.com/earendil-works/pi/issues/11086) (open, p0): symbols leak into input on Windows terminals under CPU load; no fix in the data.
- Issue [#9807](https://github.com/earendil-works/pi/issues/9807) (open): full TUI re-render causes scroll/typing lag at 800+ messages; no fix in the data.
- Issue [#9932](https://github.com/earendil-works/pi/issues/9932) (open): `before_agent_start` forced system prompts keep tools already removed via `setActiveTools()`; no fix in the data.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**
- v0.26.0-nightly.20261022.bf66a26c97 shipped: daemon token persistence via PR #15023, plus a release fix covering every spawned vendored binary.
- PR #15212 makes session PR badges, the Pull requests panel, and daemon PR snapshots work when `gh` isn't on Qwen's PATH; useful on macOS where launchd or a desktop launcher starts the daemon.
- PR #15211 carries the scheduled-task gate through the daemon and Web Shell, following #15069's design; useful when scheduled tasks need a gating shell command per fire.
- PR #15331 aligns the Managed sidebar with daemon navigation — shared session search, plain "New task" label, consistent workspace headings. PR #15303 preserves draft attachments through summary refresh and session allocation.

**Worth knowing**
- Issue #15297 (P1): Qwen Code 0.26.0 silently drops tool results ~1 in 30 calls — the tool runs with `status: success`, but no `functionResponse` reaches the model, forcing re-reads. Reported on Windows; no fix in the data.
- Issue #15248: sdk-java runtime broker timing tests flake 3/3 on GitHub-hosted runners, blocking the fork PR fast lane. PRs #15275/#15254 retry locking changes.
- Issue #15165: shell safety classification can trigger a ~1.6 GiB transient WASM allocation on Node 24.16.0 (Linux x64).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*