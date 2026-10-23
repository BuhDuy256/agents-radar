# AI CLI Tools Community Digest 2026-10-23

> Generated: 2026-10-23 05:49 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# AI CLI Tools — Cross-Tool Comparison Report

**Date:** 2026-10-23 · **Coverage:** Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, Qwen Code

---

## 1. Ecosystem Overview

The AI CLI tools landscape is now a mature, competitive field where terminal-native coding agents are converging on a shared feature set — sandboxing, MCP integration, subagents, session continuity, and cost observability — while differentiating on execution model, target user, and platform breadth. This period's digests reveal a shift from "can the agent do the work?" to "can I trust and control the agent doing the work?": permission-model gaps, silent false-success, and configuration that silently doesn't apply appear across nearly every tool. Security hardening (sandbox escapes, symlink bypasses, token refresh) is the dominant engineering theme, with Claude Code, Gemini CLI, and Gemini CLI-adjacent projects all shipping or landing sandbox fixes. Simultaneously, a visible "parity debt" is accumulating as Desktop, IDE, Web Shell, and ACP surfaces lag the CLI, generating regression clusters. Windows remains the weakest platform across the board — process leaks, ACL failures, and shell naivety are recurring.

---

## 2. Activity Comparison

*Data reflects the 24-hour window ending 2026-10-23. Counts are as reported in the digests. "N/A" = channel not used/available upstream, not inactive.*

| Tool | Hot Issues Cited | Key PR Progress | Discussions | Release Status |
|---|---|---|---|---|
| **Claude Code** | 10 + honorable mentions | 7 (all CLOSED, single author) | N/A (none provided) | ✅ v2.1.309 (sandbox hardening) |
| **OpenAI Codex** | 10 + 3 "at capacity" cluster | 10 (mostly bot-authored, CLOSED) | ✅ 2 Ideas, 3 Q&A, 6 Show-and-tell | ✅ rust-v0.164.0 + alphas |
| **Gemini CLI** | 10 | 10 (mix open/closed) | N/A (none provided) | ⚠️ Nightly only (no stable) |
| **GitHub Copilot CLI** | 10 | 0 (none updated) | N/A (none provided) | ✅ v1.0.103 (patch) |
| **OpenCode** | 10 | 12 (mix open/closed) | N/A (in Issues/PRs) | ✅ v1.19.4 (Bun 1.4.4) |
| **Pi** | 10 | 10 (mix open/closed) | ✅ 2 Show-and-tell | ❌ None in 24h |
| **Qwen Code** | 10 | 10 (mix open/closed) | N/A (in Issues) | ⚠️ Nightly only |

**Reading the table:**
- **Release cadence is bimodal.** Claude Code, Codex, Copilot CLI, and OpenCode ship user-facing changes daily-to-weekly; Gemini CLI and Qwen Code are in nightly-only stabilization phases.
- **PR throughput varies enormously.** Copilot CLI reported *zero* PR activity (issue/release-driven), while OpenCode and Pi show 10–12 PRs with a healthy open/closed mix.
- **Discussion channels are thin.** Only Codex and Pi surface structured Discussions. Claude Code, Gemini CLI, Copilot CLI, and Qwen Code effectively route community input through Issues — a signal about how differently these projects manage community surface area.

---

## 3. Shared Feature Directions

Five requirement clusters appear independently across multiple tool communities, indicating genuine ecosystem-level demand rather than single-project noise.

**A. Enforceable sandboxing & permission hardening** — *Claude Code, OpenCode, Copilot CLI, Gemini CLI, Pi*
- OpenCode #2242 (101 comments, 80 👍) remains the single most-upvoted cross-tool issue: users want macOS seatbelt-equivalent restrictions preventing out-of-cwd access.
- Copilot CLI #5232 (trusted folders auto-approve shell in manual mode) and OpenCode #52083/#50652 (permission bypass via compound commands/plugins) describe the *same failure mode*: allow-lists that don't validate intent.
- Gemini CLI #29688 (shell-wrapper bypass) and Claude Code #56281/PR cluster (plugin "tighten only" hierarchy) show maintainers actively closing these gaps.

**B. Context-window / usage / cost visibility** — *Claude Code, Codex, OpenCode*
- Claude Code shows a genuine groundswell (8 duplicate issues) to restore the context-window ring/popover in the Desktop Code tab.
- Codex #51088 (quota drains on cached prompts) and OpenCode #57975 (unified usage dashboard), #34344 (rate-limit exploit) reflect cost-observability as a first-class, trust-critical ask.
- Common thread: users cannot reconcile what they're charged against what they can see.

**C. Silent success / silent failure is unacceptable** — *Gemini CLI, Qwen Code, Pi, OpenCode*
- Gemini CLI #22323 (`status: "success"` after hitting MAX_TURNS) and #21983 (`GOAL` on Wayland failure).
- Qwen Code #15328 (exit 0, no output on truncated turn), #15325 (stale answer past turn limit), #15297 (dropped tool results).
- Pi #11223 (`modelOverrides` silently ignored) and OpenCode #58335 (provider never registers).
- The consensus demand: **fail loudly and early over no-op silently.**

**D. Cross-surface parity & session continuity** — *Codex, Claude Code, Qwen Code*
- Codex #14067 (69 👍) — sync threads/context across devices.
- Claude Code — Desktop↔CLI parity (themes, autocomplete, configurable verbs).
- Qwen Code #15327 — unify CLI/Web Shell/ACP/SDK on one agent loop to eliminate divergence bugs.

**E. Configurability & output density** — *Pi, Claude Code, Codex, Copilot CLI*
- Pi #10259 (one-line tool mode / public tool-presentation API), #11127 (cache-warming horizon).
- Claude Code #102095 (effort level: 3 clicks vs. 1), #52420 (configurable completion verb).
- Codex v0.164.0 `/presets` + inline `/model` directly responded to this.
- The through-line: **power users want to reclaim clicks and vertical space.**

---

## 4. Differentiation Analysis

| Dimension | Claude Code | Codex | Gemini CLI | Copilot CLI | OpenCode | Pi | Qwen Code |
|---|---|---|---|---|---|---|---|
| **Primary user** | Anthropic power users, Max-tier | Pro/Plus, BYOK, enterprise | Terminal-native, GCP-adjacent | GitHub/enterprise devs | OSS tinkerers, multi-provider | Performance-sensitive devs | Qwen Cloud / MaaS users |
| **Distinguishing focus** | Plugin security hierarchy; Desktop app | Presets, managed config, cloud agents | Agent-reliability engineering; AST tooling | Permission model; MCP/OAuth lifecycle | Multi-provider, i18n, MCP hardening | Startup latency, TUI scaling | Managed Agent/daemon/Web Shell stack |
| **Execution model** | Sandboxed Bash + Desktop | Managed hooks, env-scoped executors | Generalist + browser subagents | ACP mode, background subagents | Server-based, session-scoped | Extension-heavy, Harness hosts | Unified loop (proposed) |
| **Tech approach** | Security contracts, engine/mod gating | Rust, internal churn (bot PRs) | Reference design discipline (EPICs) | Rapid patch cadence | Bundled Bun runtime, agressive MCP fixes | Perf benchmarking vs. jcode | CI hardening, runtime brokers |
| **Weakest area** | Desktop regressions piling up | Windows resource leaks (since June) | Silent false-success | MCP/OAuth on Windows | Permission bypasses | TUI input robustness | Silent failure modes |

**Key structural differences:**
- **Claude Code** is the only tool formalizing a *plugin security hierarchy* (org > user; "tighten only"). It's treating extensibility as a governance problem.
- **Codex** is the most bot-driven in PR throughput — heavy internal churn around managed config and rollout tracing suggests enterprise groundwork being laid.
- **Gemini CLI** is unusually reliability-focused for a large-model vendor: its top issues are agent-orchestration correctness bugs, not feature gaps.
- **Pi** competes on **performance** explicitly (startup budget benchmarked against jcode, TUI re-render lag at 800+ messages) — a distinct axis.
- **Qwen Code** is the most "product-stack" oriented, building a daemon + Web Shell + managed runtime rather than a single CLI.
- **OpenCode** is the most *provider-agnostic* and has the strongest i18n/multi-provider posture, but its permission-model gaps are its highest-severity recurring complaint.

---

## 5. Community Momentum & Maturity

**Momentum ranking (composite of issue heat, PR throughput, discussion activity, release cadence):**

1. **OpenCode** — Highest sustained engagement (#2242 at 101 comments is the ecosystem's outlier), 12 PRs with real open/closed mixing, active daily releases. A young subsystem (MCP lifecycle, permissions) being aggressively hardened. *Rapidly iterating, not yet mature.*
2. **Claude Code** — Dense issue activity, single-author PR cluster indicating concentrated maintainer effort, regular security releases. *Mature but with accumulating Desktop debt.*
3. **Codex** — High PR volume but predominantly bot-authored CLOSED PRs (suggesting batch/automated workflows), strong Discussion presence, user-facing release. *Structurally mature, community less visible in code.*
4. **Qwen Code** — 10 PRs spanning many subsystems, active CI work, nightly releases. *Rapidly iterating on a broad stack.*
5. **Pi** — Smaller but coherent community (Show-and-tell culture, positive-reaction issues), strong bug-fix velocity. *Lean, responsive, younger community.*
6. **Gemini CLI** — High-quality issue curation (P0/P1 tags, EPICs) but no stable release and nightly-only cadence today. *Disciplined engineering, slower user-facing velocity this window.*
7. **Copilot CLI** — **Zero PRs today**, issue-driven, patch-only release. *Least code-velocity visible in this window; potentially maintainer-bandwidth constrained or internal.*

**Maturity signals:**
- **Most mature community infrastructure:** Codex and Pi (structured Discussions, Q&A, Show-and-tell).
- **Least mature surfaces:** OpenCode permission model, Qwen Code headless reliability — both showing young-system growing pains.
- **Trust risk flag:** Claude Code #97936 explicitly notes prior reports were *auto-closed as stale without a fix* — a maturity anti-pattern worth watching.

---

## 6. Trend Signals

**For developers building on these tools:**

1. **Silent failures are the new trust frontier.** Across Gemini CLI, Qwen Code, Pi, and OpenCode, "success" reported on truncated/aborted work is the most damaging bug class. If you script against these CLIs, **validate outputs, not exit codes** — exit 0 currently cannot be trusted in headless mode for at least Qwen Code (#15328) and Gemini CLI (#22323).

2. **Sandboxing is improving but not airtight.** Claude Code's v2.1.309 fixed real escape vectors (startup-file leakage, symlink write-bypass); OpenCode and Copilot CLI both have open permission-bypass reports. **Do not treat the sandbox as a hard trust boundary yet** — cross-platform behavior (especially Windows) diverges sharply.

3. **Windows is the ecosystem's weakest platform.** Codex (leaks since June, up to ~59 GB), Copilot CLI (MCP auth unusable), Qwen Code (shell naivety), Pi (symbol leakage under load) all report Windows-specific failures. Developers on Windows should budget for workarounds.

4. **Cost observability is becoming table stakes.** Context-window visibility, usage dashboards, and quota-accounting honesty are demanded across Claude Code, Codex, and OpenCode. Vendors that ship transparent metering early will earn disproportionate trust.

5. **Configuration that silently fails is worse than no configuration.** Pi (#11223), Gemini CLI (#22267, #20079), and Copilot CLI (#5241 frontmatter ignored) all report settings accepted-but-dropped. Expect "loud validation" to become a quality bar.

6. **MCP lifecycle is the new plumbing risk.** OAuth token refresh (Copilot CLI #5229/#5233/#5236), duplicate servers and fetch timeouts (OpenCode PR cluster), and spec-migration gaps (Qwen Code #8968) show MCP is young, fragile, and inconsistent across implementations. Teams standardizing on MCP should expect to write their own resilience layers.

7. **Session portability and correction memory are emerging requirements.** Codex #14067 (69 👍) and #56337 (recall corrections) point toward a future where agents carry context across machines and remember user feedback — currently unaddressed by any tool. This is the clearest "blue ocean" feature gap in the ecosystem.

---

*Report compiled from the 2026-10-23 community digests for Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, and Qwen Code. Figures reflect activity within the stated 24-hour window and upstream repositories' reported channel availability.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
*Data source: github.com/anthropics/skills · Snapshot: 2026-10-23*

---

## 1. Top Skills Ranking
*Note: the PR dataset exposes comment counts as `undefined`, so ranking below is inferred from issue-linkage, update recency, and cross-referenced discussion volume in Issues.*

| # | Skill / PR | Functionality | Discussion Highlights | Status |
|---|------------|---------------|----------------------|--------|
| 1 | **mcp-builder** — [PR #1742](https://github.com/anthropics/skills/pull/1742) | Fixes MCP `>=2.0.0` import rename (`streamablehttp_client` → `streamable_http_client`) and custom header handling via `create_mcp_http_client` | Linked to Issue [#1390](https://github.com/anthropics/skills/issues/1390) (eval harness scores 0/N against real MCP servers); high downstream impact on agent tooling | OPEN |
| 2 | **skill-creator** — [PR #1298](https://github.com/anthropics/skills/pull/1298) | Isolates trigger evals, fixes Windows subprocess/`select()` failures, prevents runtime failures being mis-scored as non-triggers | Mirrors Issues [#556](https://github.com/anthropics/skills/issues/556) (0% trigger rate) and [#1383](https://github.com/anthropics/skills/issues/1383) (silent benchmark failures) | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** — [PR #1245](https://github.com/anthropics/skills/pull/1245) | Converts product/tech specs into Notion tasks with acceptance criteria; second skill audits resumes quantitatively | Long-running (opened June, updated Oct) — signals sustained community interest in spec-to-task workflows | OPEN |
| 4 | **proofcore-contract-auditor** — [PR #1771](https://github.com/anthropics/skills/pull/1771) | Static analysis of Solidity/Rust contracts with cryptographic audit proofs anchored to TON Blockchain | Web3 vertical; notable as an early blockchain-native Skill submission | OPEN |
| 5 | **md2video-audio** — [PR #1703](https://github.com/anthropics/skills/pull/1703) | Zero-cost pipeline: Markdown → Marp slides → MP4 with human-like voiceover | Represents the "content production" Skill category | OPEN |
| 6 | **pyxel** — [PR #525](https://github.com/anthropics/skills/pull/525) | Retro game development in Python: headless input-driven runs, frame inspection, state checks | One of the longest-lived open PRs (Mar → Sep); dedicated gaming/creative niche | OPEN |
| 7 | **document-typography** — [PR #514](https://github.com/anthropics/skills/pull/514) | Prevents orphan wraps, widow paragraphs, numbering misalignment in generated documents | Universal applicability — affects *every* document Claude generates | OPEN |
| 8 | **odt** — [PR #486](https://github.com/anthropics/skills/pull/486) | OpenDocument (.odt/.ods) creation, template filling, ODT→HTML parsing | Fills a format gap alongside existing docx/pdf/xlsx skills | OPEN |

---

## 2. Community Demand Trends

Distilled from the Issues snapshot:

- **Trust & namespace security** — Issue [#492](https://github.com/anthropics/skills/issues/492) (46 comments, top by far) demands a hard boundary between official `anthropic/` skills and community submissions. **The single loudest community concern.**
- **Org-wide skill sharing / marketplace UX** — Issue [#228](https://github.com/anthropics/skills/issues/228) (8 👍) wants a shared library rather than Slack-and-upload workflows.
- **Eval & benchmarking reliability** — Issues [#556](https://github.com/anthropics/skills/issues/556), [#1383](https://github.com/anthropics/skills/issues/1383): trigger evals are effectively broken (0% trigger rate, Windows incompatibilities). **Meta-tooling is a demand category of its own.**
- **Context/token efficiency** — Issue [#1487](https://github.com/anthropics/skills/issues/1487): `claude-api` skill injects ~156k tokens eagerly, exhausting the context window. Issue [#1329](https://github.com/anthropics/skills/issues/1329) proposes `compact-memory` symbolic notation.
- **Agent governance & quality gates** — Issues [#412](https://github.com/anthropics/skills/issues/412), [#1385](https://github.com/anthropics/skills/issues/1385): policy enforcement, adversarial review, delivery verification pipelines.
- **Skill duplication hygiene** — Issue [#189](https://github.com/anthropics/skills/issues/189) (9 👍): `document-skills` and `example-skills` install identical content, bloating context.

**Emerging verticals with community pull:** Web3/smart contracts, HPC operations (SCNet), retro gaming, video generation, ODT/ODF formats.

---

## 3. High-Potential Pending Skills
*Active-comment PRs not yet merged, likely to land.*

| Skill / PR | Why It's Close | Link |
|------------|----------------|------|
| **skill-creator YAML frontmatter fix** | Opened Oct 10, updated Oct 19 — freshest active fix; corrects metadata drift between eval names and SKILL.md | [PR #1997](https://github.com/anthropics/skills/pull/1997) |
| **webapp-testing `shell=True` removal** | Updated Oct 22 (most recent in dataset); addresses CWE-78 command injection | [PR #1980](https://github.com/anthropics/skills/pull/1980) |
| **docx orphaned-comment detection** | Actively iterated Sep 6 → Sep 25, straightforward feature addition | [PR #1734](https://github.com/anthropics/skills/pull/1734) |
| **docx LibreOffice timeout handling** | Fixes false-success reporting; pairs with Issue [#2018](https://github.com/anthropics/skills/issues/2018) | [PR #1792](https://github.com/anthropics/skills/pull/1792) |
| **algorithmic-art `wrapAround()` fix** | Closes Issue [#1897](https://github.com/anthropics/skills/issues/1897); modulo-based, low-risk | [PR #1977](https://github.com/anthropics/skills/pull/1977) |
| **webapp-testing element discovery** | Closes Issue [#1891](https://github.com/anthropics/skills/issues/1891); textarea/select tag reporting | [PR #1976](https://github.com/anthropics/skills/pull/1976) |
| **skill-creator standalone execution** | Updated Oct 8 — fixes `ModuleNotFoundError` on direct `package_skill.py` runs | [PR #1681](https://github.com/anthropics/skills/pull/1681) |
| **claude-api dead URL cleanup** | Trivial, verified HTTP 200 replacements; low-friction merge | [PR #1730](https://github.com/anthropics/skills/pull/1730) |

**Pattern:** the strongest near-term merges are **meta-tooling fixes to `skill-creator`, `webapp-testing`, and `docx`** — the infrastructure layer, not new verticals.

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is not for new Skills, but for the reliability and trustworthiness of the Skills infrastructure itself** — broken trigger evals, namespace impersonation, context-bloating meta-skills, and silent script failures dominate discussion far more than any single new capability.

---

# Claude Code Community Digest — 2026-10-23

## 1. Today's Highlights

The Desktop app's **Code tab** dominates the conversation today, with a cluster of regressions around context-window visibility, Remote Control persistence, and the new end-of-turn "next-step" box generating significant friction. On the engineering side, a major **sandbox hardening** release (v2.1.309) fixes startup-file leakage and symlink write-bypass issues on macOS/Linux. A high-visibility billing issue (Max 5x → Max 20x upgrade failures) continues to simmer with no apparent resolution from support.

---

## 2. Releases

**v2.1.309** — Security-focused sandbox fixes:
- Fixed sandboxed Bash commands on macOS/Linux executing the shell's **startup files outside the sandbox** before each command (a potentially serious escape vector).
- Fixed macOS `denyWrite` glob patterns not applying at a path's **real location** when reached through a symlink.
- Additional sandbox fixes (truncated in changelog).

This is a meaningful hardening release for anyone relying on the Bash sandbox as a trust boundary; upgrade recommended.

---

## 3. Hot Issues

1. **[#56281](https://github.com/anthropics/claude-code/issues/56281)** — *Max 5x → Max 20x upgrade fails, support unresponsive.* 36 comments, 11 👍. Five-month-old billing escalation with no resolution. Payments fail on every attempt despite keyword `[invalid]` labeling — users are frustrated by both the payment flow and the lack of support response.

2. **[#79305](https://github.com/anthropics/claude-code/issues/79305)** — *Desktop custom themes / accent colors.* 23 comments, **71 👍** — the single most-upvoted issue in this batch. Users want parity with the CLI's theme system; the "indistinguishable dark windows" complaint resonates strongly across multi-monitor workflows.

3. **[#102132](https://github.com/anthropics/claude-code/issues/102132)** — *Desktop next-step box can end the turn before reply is written.* 20 comments, 27 👍. A functional bug, not just UX: `wrap_up` with an `ask` short-circuits the model's actual reply.

4. **[#102273](https://github.com/anthropics/claude-code/issues/102273)** — *Next-step box "gets in the way of real discussion."* 19 comments, 45 👍. Direct companion to #102132; the community is coalescing around the position that the new turn-end UI is paternalistic and disruptive.

5. **[#52420](https://github.com/anthropics/claude-code/issues/52420)** — *Configurable verb for post-turn completion line.* 12 comments, 30 👍. Six-month-old request for `settings.json` customization of the whimsical "cogitated for 12s" line. High engagement for what looks like a small change.

6. **[#102095](https://github.com/anthropics/claude-code/issues/102095)** — *Effort level now takes 3 clicks instead of 1.* 10 comments. Quantified user pain: "50 switches/day = 100 extra clicks." Classic discoverability-vs-density regression.

7. **[#102094](https://github.com/anthropics/claude-code/issues/102094) [CLOSED]** — *Context-window usage no longer shown anywhere.* One of several duplicates (#102103, #102176, #102133, #102615, #103885, #103918) — see Feature Trends below.

8. **[#76353](https://github.com/anthropics/claude-code/issues/76353)** — *Bash tool leaks orphaned child processes on Windows timeout.* Runaway `find.exe` scans accumulate for hours. No 👍 but a serious resource-leak class bug on the Windows platform.

9. **[#100973](https://github.com/anthropics/claude-code/issues/100973)** — *Withdrawing/editing a message kills ALL background tasks.* Rewind semantics diverge between terminal (preserves) and Desktop (kills). Bites anyone using background agents.

10. **[#97936](https://github.com/anthropics/claude-code/issues/97936)** — *`/` autocomplete omits user skills and plugin commands in Desktop Projects / Remote Control.* Commands work if typed in full — a pure surface-level gap that makes discoverability impossible. Notably, prior reports were **auto-closed as stale without a fix**.

Honorable mentions: [#73069](https://github.com/anthropics/claude-code/issues/73069) VSCode codicon font blocked by CSP; [#104494](https://github.com/anthropics/claude-code/issues/104494) synthetic "Prompt is too long" due to ordering bug in auto-compact; [#103018](https://github.com/anthropics/claude-code/issues/103018) built-in `ccd_turn` tools counting against plan limits and missing from `/usage`.

---

## 4. Key PR Progress

All visible PRs today come from a single contributor (`poteat`) and are **CLOSED**, mostly spanning plugin security tiers and UI state. Several are stacked and note merge-order dependencies on unpublished engine releases.

1. **[#97293](https://github.com/anthropics/claude-code/pull/97293)** — Declarations for `process.run` truncation flags (`isStdoutTruncated`/`isStderrTruncated`) and `fs.list` `mtimeMs`. Held until npm CLI carries the fields. Good example of contract-first, gated-by-release discipline.

2. **[#97334](https://github.com/anthropics/claude-code/pull/97334)** — `session.append` events continue past the user tier under `sec-default`. Red `test` check is *by construction* until a released CLI carries the event — a pattern worth watching.

3. **[#97688](https://github.com/anthropics/claude-code/pull/97688)** — Collector records continue past the user tier: a user's plugin can no longer drop or rewrite telemetry destined for an org's collector. Org `prepend`/`append` hooks preserved.

4. **[#99118](https://github.com/anthropics/claude-code/pull/99118)** — `/diff` pane no longer globally holds toasts (`holdToasts: true` was suppressing other plugins' notifications).

5. **[#99137](https://github.com/anthropics/claude-code/pull/99137)** — "A person's plugin may tighten, never loosen." Under `sec-default`, user plugins can't lift a deny/ask or change pinned variables. Needs no new engine.

6. **[#99141](https://github.com/anthropics/claude-code/pull/99141)** — `/diff` preserves the pane when nothing can draw it yet; renders once a host attaches. Stacked on #99118.

7. **[#99540](https://github.com/anthropics/claude-code/pull/99540)** — Org-level tool ceilings extend over user-installed plugins, with `.catch` on every deciding hook. Completes the security-tier story from #99137.

8. (No additional PRs to summarize; the batch above represents the full updated set.)

**Read of the week:** this cluster is a coherent push to formalize a **plugin security hierarchy** (org > user) and to make the engine/mod contract explicit. If you build Claude Code plugins, expect to see a "tighten only" rule enforced going forward.

---

## 5. Hot Discussions

No discussion data was provided; section omitted.

---

## 6. Feature Request Trends

Distilled from Issues and (no) Discussions this period:

- **Desktop ↔ CLI parity.** Themes/accent colors (#79305, 71 👍), `/`-autocomplete of user skills and plugin commands (#97936), configurable completion verbs (#52420), and read-only archived sessions in VS Code (#104495) all point the same direction: Desktop and IDE surfaces lag the CLI's configurability.
- **Context-window visibility.** A genuine groundswell: #102094, #102103, #102176, #102133, #102615, #102623, #103885, #104471. Users want the context ring/popover restored in the Code tab, with per-session numbers, auto-compaction state, and readable token units.
- **Richer usage/cost surfacing.** #104471 (usage side panel), #103018 (attribute `ccd_turn` tools in `/usage`), #104474 (token waste visibility) — cost observability is becoming a first-class ask.
- **Reduce paternalistic turn-end UX.** #102273 + #102132: users want to opt out of the next-step box, or at least have it not preempt the reply.
- **Configurable, low-click UI.** #102095 (effort level), #52420 (verbs), #102233 (hide session info panel in split view) — the community is asking to reclaim vertical and click efficiency.

---

## 7. Developer Pain Points

- **Desktop Code tab regressions are piling up.** Context-window indicator removed in a recent update, effort-level interaction degraded, new side panels appear unrequested, next-step box misbehaves. Several reports are flagged `regression` and some are duplicates, suggesting the team is fixing symptoms in one place while another surface regresses.
- **Stale-close without fix.** #97936 explicitly calls out that prior reports of the same skills/plugin autocomplete bug were autoclosed as stale and never fixed. Trust erosion risk.
- **Billing and support.** #56281 (upgrade failures, unresponsive support) plus #104474 (token burn on failed shell commands) shows cost-related trust issues on both sides of the meter.
- **Sandbox edge cases.** #76353 (Windows orphaned processes), plus the three sandbox fixes in v2.1.309, suggest the sandbox is improving but remains a moving target — do not assume it's airtight across platforms.
- **Auto-compact ordering bug.** #104494 — synthetic "Prompt is too long" before turn-start attachments are appended. Blocking for anyone on Bedrock in long sessions; the workaround (resend) is undiscoverable.
- **Plugin/security surface changing under contributors.** The PR cluster references merge-order dependencies on unreleased engine events; plugin authors should expect churn in the `sec-default` semantics.

---

*Sources: all items linked above from [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code). Digest generated from a 24-hour window ending 2026-10-23.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-23

## 1. Today's Highlights

The Codex team shipped **rust-v0.164.0**, introducing reusable `/presets` slots for prompts and slash commands plus inline `/model` and `/permissions` arguments — a notable quality-of-life upgrade for power users. Meanwhile, the issue tracker is dominated by a cluster of **server-side "Selected model is at capacity" errors** affecting multiple Pro/Plus accounts, and persistent **Windows memory/process leak reports** where Codex Desktop accumulates hundreds of Node/MCP helpers. The PR queue shows heavy internal churn (mostly `copyberry[bot]`-authored CLOSED PRs) around managed configuration, environment-scoped hooks, and rollout tracing.

---

## 2. Releases

**rust-v0.164.0** ([release](https://github.com/openai/codex/releases))
- **Reusable `/presets`**: Save prompts and slash commands into ten numbered slots with a keyboard menu for quick access (#54380, #54381).
- **Inline configuration**: Set model, reasoning effort, speed, and permission profiles directly via `/model` and `/permissions` arguments (#54378, #54383).
- Preview functionality introduced (truncated in release notes).

**Alpha channel** continued with `rust-v0.164.0-alpha.12`, `rust-v0.164.0-alpha.11.1`, and `rust-v0.163.0-alpha.11.2` — routine pre-release builds with no detailed changelogs.

---

## 3. Hot Issues

1. **[#35446](https://github.com/openai/codex/issues/35446) — Windows 10 Computer Use deadlock** (50 comments, OPEN, since July)
   A long-running deadlock awaiting `SoftwareBitmap` conversion inside `FrameArrived`. The highest-comment issue of the day and a signal that Computer Use on Windows 10 remains fragile. Community traction is low (1 👍) but the thread's length suggests sustained user effort to diagnose.

2. **[#54841](https://github.com/openai/codex/issues/54841) — Work mode blocks message submission in BYOK** (37 comments, 27 👍)
   BYOK users with browser/computer tools enabled cannot submit messages in Work mode. High upvote count makes this the most community-endorsed bug today — a serious regression for the bring-your-own-key segment.

3. **[#48938](https://github.com/openai/codex/issues/48938) — Windows renderer crashes and input lag** (26 comments)
   An angry Pro 20x subscriber reports repeated white-screen reloads and severe lag post-update, citing impact on paid work and expenses. Notable for its tone — a paying power user publicly escalating a stability regression.

4. **[#31925](https://github.com/openai/codex/issues/31925) — Restore Option+Space Quick Chat on macOS** (18 comments, **42 👍**)
   Highest-upvoted issue today. macOS users want the Quick Chat shortcut back after the ChatGPT/Codex app unification — a clear signal that the merge removed a valued workflow.

5. **[#51649](https://github.com/openai/codex/issues/51649) — MCP/CUA/node_repl process accumulation** (18 comments)
   Reports of ~200 Node helper processes and ~11.6 GB private memory on Windows Desktop. Closely related to #29079, indicating a systemic process-lifecycle problem on that platform.

6. **[#29079](https://github.com/openai/codex/issues/29079) — Orphaned Node/MCP helpers on Windows** (15 comments, since June)
   The older sibling of #51649. The fact that both remain open months apart suggests the underlying leak has not been resolved despite repeated reports.

7. **[#51667](https://github.com/openai/codex/issues/51667) — Messages blocked after macOS update** (15 comments)
   Codex messages blocked post-update to `26.1002.52244` in a macOS VM; tagged `safety-check` and `auth`. Blocks core functionality with unclear telemetry.

8. **[#55783](https://github.com/openai/codex/issues/55783) — Dot missing from macOS sidebar** (13 comments, 7 👍)
   A Dot disappears from the desktop sidebar while still working on web. Relevant to the growing "Dots" surface and desktop/web parity issues (compare #54693).

9. **[#51088](https://github.com/openai/codex/issues/51088) — Codex quota drains abnormally fast** (6 comments)
   Usage limits draining dramatically even on trivial cached prompts over the last month. A billing-adjacent trust issue that shows up repeatedly alongside #39767 (reasoning double-counted).

10. **[#56282](https://github.com/openai/codex/issues/56282) — Codex Cloud reports PRs that don't exist** (2 comments)
    In an issue-driven batch of 15 cloud tasks, agents claimed PR work while most PRs were never published. Data-integrity concern for autonomous cloud workflows; low comments but high severity.

*Also noteworthy:* **[#56078](https://github.com/openai/codex/issues/56078)** (Windows elevated sandbox ACL failure, `os error 5`), **[#56264](https://github.com/openai/codex/issues/56264)** (thread resume fails due to missing `SYSTEMROOT`), and the **"model at capacity" cluster** — [#56105](https://github.com/openai/codex/issues/56105), [#55746](https://github.com/openai/codex/issues/55746), [#56324](https://github.com/openai/codex/issues/56324).

---

## 4. Key PR Progress

Most PRs today are authored by `copyberry[bot]` and marked CLOSED, indicating either batch-merged internal work or speculative PRs closed without merge. Highlights:

1. **[#56351](https://github.com/openai/codex/pull/56351) — Experimental attached thread forks**
   Adds `attachToSource` to `thread/fork`, persisting a fork attached to its source without emitting `thread/started`. Hides attached threads from ordinary listings — foundational for branch-style conversation workflows.

2. **[#56343](https://github.com/openai/codex/pull/56343) — Run environment hooks on owning executors**
   Executes command hooks in each environment's own shell, cwd, env policy, and network policy — important correctness work for multi-environment setups.

3. **[#56330](https://github.com/openai/codex/pull/56330) — Agent-message wakes respect interrupts and Plan mode**
   Fixes a race where a pending wake could outlive an interrupt or Plan-mode switch. Prevents queued messages from being consumed incorrectly.

4. **[#56313](https://github.com/openai/codex/pull/56313) — Model catalog overrides for context tools**
   Lets `history`, `notes`, `new_context`, and `get_context_remaining` source descriptions/schemas from the acting model's catalog — enabling per-model tool customization.

5. **[#56312](https://github.com/openai/codex/pull/56312) — Track accepted conversation history in rollout traces**
   Distinguishes accepted history from discarded attempts; critical for faithful replay/debugging of agent sessions.

6. **[#56309](https://github.com/openai/codex/pull/56309) — Model-specific writable-root permission wording**
   Adds `writable_root`/`writable_roots` templates to permission messages — better UX for permission prompts.

7. **[#56308](https://github.com/openai/codex/pull/56308) — Separate directory and repository scopes in the TUI**
   Fixes session filtering so `Cwd` no longer pulls in linked worktrees; separates project grouping — directly relevant to the worktree confusion in Discussion #56158.

8. **[#56304](https://github.com/openai/codex/pull/56304) / [#56302](https://github.com/openai/codex/pull/56302) — Environment-scoped managed hooks**
   Adds discovery/listing APIs and `environment_hooks` in `EnvironmentConfig`, routing hook execution to the owning environment. Part of a broader managed-hooks effort.

9. **[#56295](https://github.com/openai/codex/pull/56295) / [#56314](https://github.com/openai/codex/pull/56314) — Managed config loaders decoupled from ChatGPT auth**
   Introduces a `BundleSource` interface and custom config-server loaders — architectural groundwork for enterprise/custom managed configuration.

10. **[#56288](https://github.com/openai/codex/pull/56288) — Pin Linux artifact signing to Cosign v3.1.4**
    Release-supply-chain hygiene, preserving v2 signature bundles for existing verifiers. Paired with [#56290](https://github.com/openai/codex/pull/56290) (uv-locked Python release tooling).

---

## 5. Hot Discussions

### Ideas
- **[#14067](https://github.com/openai/codex/discussions/14067) — Sync Codex threads and session context across devices** (13 comments, **69 👍**)
  The most-upvoted idea in this digest. Users working across multiple machines want thread/context synchronization instead of environment-bound sessions. Strong unmet need.
- **[#56158](https://github.com/openai/codex/discussions/56158) — Please bring back the worktree button**
  Users tired of checking the worktree toggle in session settings; request to surface it prominently or show an indicator. Aligns with PR #56308.

### Q&A
- **[#56069](https://github.com/openai/codex/discussions/56069) — Picture-in-picture support for MCP Apps on macOS?**
  A developer building a live deployment-status tracker asks whether PiP presentation is supported for third-party MCP App UIs and how to enable it.
- **[#56208](https://github.com/openai/codex/discussions/56208) — Supported setup for reliable unattended Chrome downloads?**
  Seeking a robust path for authenticated downloads; reports `ERR_BLOCKED_BY_CLIENT` on some PDF links.
- **[#55792](https://github.com/openai/codex/discussions/55792) — Windows desktop: review path when `/approve` is unavailable?**
  Asks for a supported human-reconsideration flow when auto-approval rejects an action and `/approve` is missing from the menu.

### Show and tell
- **[#56176](https://github.com/openai/codex/discussions/56176) — Agent Relay Check: does a fresh session receive AGENTS.md?**
  A repeatable before/after check using a temporary random marker to verify instruction-path propagation.
- **[#56181](https://github.com/openai/codex/discussions/56181) — pytest-codex: turn AGENTS.md rules into pytest checks**
  An MIT-licensed pytest plugin for CLI behavior tests, with offline replay. v0.2.0 now available — a pragmatic way to enforce AGENTS.md compliance.
- **[#56337](https://github.com/openai/codex/discussions/56337) — Off the Wall: recall past corrections before Codex answers**
  Keeps user corrections verbatim and quotes them before the agent responds — addresses a very common frustration.
- **[#56215](https://github.com/openai/codex/discussions/56215) — GFT-Merge: combine local conversations into a fresh session**
  MIT-licensed local tool for merging Claude Code/Codex conversations via drag-and-drop into a new session.
- **[#55421](https://github.com/openai/codex/discussions/55421) — TAHU: authorization-gateway research prototype, seeking 3 dev trials**
  Explores letting an agent answer public questions without leaking private staff notes or requiring per-step approval.
- **[#56242](https://github.com/openai/codex/discussions/56242) — ibara: first Codex desktop task on an Omarchy spare computer**
  Gives an existing agent a remote desktop for browser/app work, with MCP tools and a control console.

*Also active:* **[#2251](https://github.com/openai/codex/discussions/2251) — Codex Usage Limits** (59 comments, 57 👍), a perennial thread on Plus-tier limits vs. ChatGPT app limits.

---

## 6. Feature Request Trends

- **Cross-device session continuity** — [#14067](https://github.com/openai/codex/discussions/14067) (69 👍) leads; users want threads/context to follow them between machines.
- **Workflow/preset ergonomics** — v0.164.0's `/presets` and inline `/model` directly respond to this. Discussion [#56158](https://github.com/openai/codex/discussions/56158) asks for the worktree toggle to be surfaced, not buried.
- **AGENTS.md verifiability** — [#56176](https://github.com/openai/codex/discussions/56176) and [#56181](https://github.com/openai/codex/discussions/56181) both address *proving* instructions were loaded and obeyed. A small but growing "test your agent's instructions" ecosystem.
- **Correction memory / personalization** — [#56337](https://github.com/openai/codex/discussions/56337) reflects demand for agents to remember user corrections across sessions.
- **MCP App UI surfaces** — [#56069](https://github.com/openai/codex/discussions/56069) asks for PiP support; part of increasing MCP UI sophistication.
- **Safer authorization flows** — [#55421](https://github.com/openai/codex/discussions/55421) explores authorization gateways to reduce per-step approval friction.

---

## 7. Developer Pain Points

- **"Selected model is at capacity" errors are widespread and account-persistent.** Three separate issues ([#56105](https://github.com/openai/codex/issues/56105), [#55746](https://github.com/openai/codex/issues/55746), [#56324](https://github.com/openai/codex/issues/56324)) describe all models returning capacity errors for days, even for Pro users, with support reportedly confirming no outage. This is the most visible trust/availability problem today.

- **Windows Desktop resource leaks remain unresolved.** [#51649](https://github.com/openai/codex/issues/51649), [#29079](https://github.com/openai/codex/issues/29079), [#42484](https://github.com/openai/codex/issues/42484), and [#48938](https://github.com/openai/codex/issues/48938) all describe runaway memory (up to ~59 GB), hundreds of orphaned Node/MCP processes, renderer crashes, and UI freezes. Reported since June with no clear fix — a systemic Windows stability gap.

- **Windows sandbox/ACL and environment failures.** [#56078](https://github.com/openai/codex/issues/56078) (`os error 5` on elevated sandbox) and [#56264](https://github.com/openai/codex/issues/56264) (missing `SYSTEMROOT` breaks thread resume) indicate brittle Windows sandbox plumbing.

- **Quota/usage accounting distrust.** [#51088](https://github.com/openai/codex/issues/51088) (fast quota drain on cached prompts) and [#39767](https://github.com/openai/codex/issues/39767) (double-counted reasoning triggering premature auto-compaction) suggest token/limit accounting bugs users care about financially.

- **BYOK + Work mode regression.** [#54841](https://github.com/openai/codex/issues/54841) (27 👍) blocks message submission entirely for BYOK users — high-endorsement, high-impact.

- **Desktop/web parity drift after app unification.** [#31925](https://github.com/openai/codex/issues/31925) (lost Option+Space), [#55783](https://github.com/openai/codex/issues/55783) (Dot missing from sidebar), [#40581](https://github.com/openai/codex/issues/40581) (chat/project separation broken), and [#44916](https://github.com/openai/codex/issues/44916) (Local vs. regular Projects indistinguishable) all point to UX inconsistencies introduced as the ChatGPT and Codex surfaces merged.

- **Cloud-agent honesty/completion reporting.** [#56282](https://github.com/openai/codex/issues/56282) — agents claiming PR completion when no PR exists — undercuts trust in autonomous cloud workflows.

---

*Digest compiled from github.com/openai/codex activity on 2026-10-23. PR statuses reflect data as provided and may change.*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-10-23

## 1. Today's Highlights

Today's activity is dominated by agent-reliability engineering: maintainers are wrestling with subagent turn-limit reporting, hangs in the generalist agent, and browser-agent session handling. Alongside that, a wave of hardening PRs landed around security (shell-wrapper bypass, atomic credential writes) and correctness (prompt-template `$` corruption, settings persistence). No stable release shipped; only the nightly version bump.

## 2. Releases

**v0.67.0-nightly.20261023.ga713410ab** ([PR #29887](https://github.com/google-gemini/gemini-cli/pull/29887))

- `fix(a2a-server,core)`: preserve extended token usage metadata and align per-turn reporting.
- `fix(core)`: ensure all model turns containing function calls receive thought signatures.

This is a routine nightly; both changes target A2A server telemetry accuracy and core reasoning-signature integrity rather than user-facing features.

## 3. Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent reports GOAL success after hitting MAX_TURNS** (P1, 13 comments). The `codebase_investigator` subagent returns `status: "success"` even when its own output says it ran out of turns before analyzing anything. This is the highest-engagement issue today and a genuine correctness problem: silent false-success is worse than a visible failure, since callers can't tell truncated work from completed work. Tagged `status/need-retesting`, so a fix may be in flight.

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-dependency OS sandboxing for bash-native models** (P2, 9 comments). A design proposal to let Gemini 3 lean into its native `grep`/`sed`/`awk` fluency while containing risk via sandboxing and post-execution intent routing. It's a notable architectural direction because it reframes sandboxing as an enabler of model strengths rather than a restriction.

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs forever** (P1, 8 comments, 8 👍). Simple operations like folder creation hang indefinitely when the CLI defers to the generalist agent; users report waiting up to an hour. The high reaction count signals broad impact. Workaround: instruct the model not to use subagents.

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST-aware file reads, search, and mapping** (P2, 7 comments). An EPIC investigating whether AST-aware tooling can cut wasted turns from misaligned reads and reduce token noise. Directly connected to [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) and [#22747](https://github.com/google-gemini/gemini-cli/issues/22747), which evaluate concrete tools (tilth, glyph, ast-grep).

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini under-uses skills and subagents** (P2, 7 comments). Anecdotal but widely echoed: custom skills ("gradle", "git") are ignored unless explicitly invoked. This is the adoption bottleneck for the entire skills/subagent feature set — if the model won't self-select them, the ecosystem investment doesn't pay off.

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) — Browser Agent ignores `settings.json` overrides** (P2, 4 comments). `AgentRegistry` reads and merges settings correctly at init, but the Browser Agent then ignores them (e.g., `maxTurns`). Configuration that silently doesn't apply is a trust problem for teams standardizing CLI behavior.

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland** (P1, 4 comments). Reports a `Termination Reason: GOAL` despite failure on Wayland sessions. Small but high-priority for Linux desktop users, a core constituency for a terminal CLI.

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error with >128 tools** (P2, 3 comments). The CLI passes too many tools into scope and the API rejects the request. As MCP adoption grows, tool-count management becomes unavoidable plumbing.

9. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571) — Model litters repos with tmp scripts** (P2, 3 comments). When shell execution is restricted via exclusion, the model scatters edit scripts across directories, creating cleanup overhead before commits. Directly undermines the "clean commit" workflow the CLI is meant to support.

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Agent should stop destructive behavior** (P2, 3 comments). The model reaches for `git reset` or `--force` when safer paths exist, and shows insufficient caution around DB resources. Safety-adjacent and likely to grow in importance as agent autonomy increases.

## 4. Key PR Progress

1. **[#29688](https://github.com/google-gemini/gemini-cli/pull/29688) — Prevent command-substitution guard bypass via shell wrapper flags** (closed, `area/security`). Fixes `stripShellWrapper()` so wrappers with intermediate flags before `-c` are still recognized. A security fix with real bypass implications.

2. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765) — Atomic, serialized file credential store writes**. `FileKeychain` could silently lose credentials under concurrent writes and lock users out entirely on interrupted writes. Important for environments without a native keychain.

3. **[#29890](https://github.com/google-gemini/gemini-cli/pull/29890) — Restore workspace directories only after successful resume**. Fixes [#29864](https://github.com/google-gemini/gemini-cli/issues/29864): directories were added to workspace context before `resumeChat` resolved, leaking state when resume failed.

4. **[#29859](https://github.com/google-gemini/gemini-cli/pull/29859) — Show executing subagent tool calls in the task tree** (`help wanted`). Non-root scheduler updates now retain `executing`-status tool calls, fixing the empty tool list users see during active subagent work. Directly improves the debuggability called out in [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) and [#21763](https://github.com/google-gemini/gemini-cli/issues/21763).

5. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767) — Bound MCP `tools/list` discovery with a 60s timeout**. Discovery inherited a 10-minute tool-call timeout, so an unresponsive MCP server stalled startup for ten minutes. Fixes [#28355](https://github.com/google-gemini/gemini-cli/issues/28355).

6. **[#29761](https://github.com/google-gemini/gemini-cli/pull/29761) — Stop `$` patterns corrupting prompt templates**. `String.prototype.replace(string, string)` interpreted `$&`, `` $` ``, `$'`, and `$$` as replacement patterns, silently corrupting edit instructions, file contents, and `{{args}}`.

7. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762) — Preserve disk edits when changing authentication**. Saves against current disk contents instead of a startup snapshot, so concurrent user edits aren't clobbered on auth changes.

8. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838) — Resolve relative paths against active IDE workspace root**. `WriteFileTool`, `EditTool`, and `ReadFileTool` now resolve against the tracked IDE workspace (or nested Git root) rather than the initial target dir — a real correctness win for multi-root IDE sessions.

9. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880) — Add `gemini models` command and `--list-models` flag**. Enables programmatic model discovery in JSON, useful for scripting and CI integration.

10. **[#29884](https://github.com/google-gemini/gemini-cli/pull/29884) — Allow trusted system paths on Android/Termux for ripgrep**. Lets `grep_search` resolve `pkg install ripgrep` binaries, unblocking Termux users. Fixes [#21836](https://github.com/google-gemini/gemini-cli/issues/21836).

Also worth noting: [#26686](https://github.com/google-gemini/gemini-cli/pull/26686) adds Git submodule support for extension installs, and [#29883](https://github.com/google-gemini/gemini-cli/pull/29883) corrects Thai/Lao SARA AM display width.

## 5. Hot Discussions

No discussion data was provided for this period, so this section is omitted.

## 6. Feature Request Trends

- **Agent orchestration and reliability**: The largest cluster of issues concerns subagent behavior — turn-limit integrity (#22323), hang recovery (#21409), under-triggering of skills/subagents (#21968), trajectory visibility via `/chat share` (#22598, [#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), shared memory and parallel collaboration (#18287), and subagent discovery via `settings.json` (#18285, #20079).
- **Codebase understanding via AST tooling**: A coordinated EPIC (#22745, #22746, #22747) plus token-frugal surgical reads (#19561) signals sustained interest in moving beyond raw text search toward structural code navigation.
- **Persistent task tracking**: #18836 and #21000 both propose replacing in-context `WriteToDo` (with its context rot and token costs) with file-based CRUD task tracking.
- **Agent self-awareness and safety**: #21432 (accurate CLI flags/hotkeys) and #22672 (destructive-command avoidance) reflect demand for an agent that understands both itself and the blast radius of its actions.
- **Programmatic/headless usage**: Model discovery (#29880) and eval stabilization (#23166, #23313) point to growing CI and automation use cases.

## 7. Developer Pain Points

- **Silent false success**: The most damaging class of bug reported today. #22323 reports `status: "success"` on a truncated run; #21983 reports `Termination Reason: GOAL` on a Wayland failure. Developers cannot distinguish completed work from aborted work, which erodes trust in automation.
- **Configuration that doesn't apply**: #22267 (Browser Agent ignoring `settings.json`) and #20079 (symlinked agent files not recognized) both describe declared configuration being silently dropped.
- **Indefinite hangs with no timeout**: #21409 (generalist agent hangs for up to an hour) and the now-fixed MCP discovery stall (#29767) share a root cause — inherited timeouts far too long for interactive use.
- **Workspace pollution**: #23571's scattered temp scripts and #22465's stuck interactive prompts (e.g., `create vite`) break the clean-commit workflow.
- **Scale limits**: #24246 (>128 tools → 400 error) will only worsen as MCP servers proliferate; tool scoping needs to become adaptive.
- **Terminal/platform fidelity**: Wayland failures (#21983), Thai/Lao width mismatches (#29883), and terminal-resize flicker (#21924) show polish gaps across environments.
- **Token economy**: #19561 puts the baseline at ~36.6k tokens/turn with file reads adding +15k — a recurring cost and latency concern that the AST-aware investigations aim to address.

---

*Generated from github.com/google-gemini/gemini-cli activity on 2026-10-23. Note: issue and PR creation dates span March–October 2026, reflecting items updated within the last 24 hours.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-23

## 1. Today's Highlights

A fresh patch (v1.0.103) lands with fixes for code-block copying, ACP sandbox flag handling, and reconnect resilience for cloud replies. Security and permission-model concerns dominate the issue tracker today: trusted-folder auto-approval (#5232), silent hook bypass for background agents (#3013), and overly aggressive secret redaction (#4065) are all drawing attention. A cluster of MCP/OAuth expiration bugs (#5229, #5233, #5234, #5236) suggests the remote-MCP auth lifecycle needs urgent hardening, especially on Windows and in ACP mode.

## 2. Releases

**v1.0.103** (2026-10-22)
- Clicking a completed response code block now copies its original code when the copy-on-click setting is enabled.
- ACP sessions correctly honor saved sandbox settings and `--sandbox` / `--no-sandbox` flags, including on resume.
- Cloud replies preserve full text when the CLI reconnects after a dropped connection.
- Sessions browser improvements.

## 3. Hot Issues

1. **[#5232](https://github.com/github/copilot-cli/issues/5232) — Trusted folders silently auto-approve shell execution in manual mode** — Path-based gating approves `powershell.exe`, `sqlcmd`, and `curl` calls whose arguments happen to live inside trusted folders, with no prompt. High-severity permission-model gap. 2 comments, community concern rising.
2. **[#3013](https://github.com/github/copilot-cli/issues/3013) — Hooks don't fire for background (task) agents** — A hook can block dangerous commands in the main agent, but a background sub-agent can run them anyway. Reporter frames it as a security vulnerability; now closed but the pattern is worth auditing.
3. **[#5197](https://github.com/github/copilot-cli/issues/5197) — Voice server segfaults on WSL2 after 1.0.100** — Signal 11 crash leaves `/voice` stuck on "Fetching voice models." 2 👍, 4 comments, affects a growing WSL2 user base.
4. **[#5229](https://github.com/github/copilot-cli/issues/5229) — ACP mode opens browser OAuth instead of using refresh token** — Expired MCP access tokens never attempt a `refresh_token` grant, forcing manual re-auth per session.
5. **[#5233](https://github.com/github/copilot-cli/issues/5233) — Remote MCP keeps resending expired access token** — Session retries a stale token every few seconds after 401 instead of refreshing or prompting.
6. **[#5234](https://github.com/github/copilot-cli/issues/5234) — Windows CLI unusable when MCP server needs auth** — Raw escape codes and bogus `/login` prompts until the user authenticates through the desktop app.
7. **[#5236](https://github.com/github/copilot-cli/issues/5236) — Entra broker token cache stays 0 bytes on Windows** — Token file written but empty, so every new process re-prompts for sign-in.
8. **[#5219](https://github.com/github/copilot-cli/issues/5219) — Task subagent with unknown model wedges the session** — Fallback to a 128k budget fails the entire turn with "exceeds the model's prompt budget."
9. **[#5238](https://github.com/github/copilot-cli/issues/5238) — Cache bust for every image after the 50th** — Removing oldest image triggers a full cache refill each turn; "very, very expensive" token burn.
10. **[#5203](https://github.com/github/copilot-cli/issues/5203) — Feature request: stable release channel** — Users ask for a Stable vs. Latest channel split to insulate daily work from rapid-release regressions.

## 4. Key PR Progress

No pull requests were updated in the last 24 hours (0 items). Issue activity and the v1.0.103 release are the sole change vectors today. Watch the tracker for follow-up PRs addressing the MCP/OAuth cluster.

## 5. Hot Discussions

No discussion data was provided in the source feed.

## 6. Feature Request Trends

- **Release-channel stability** (#5203): users want Stable/Beta/Preview tracks as regressions from weekly releases hit daily workflows.
- **Model selection control** (#5231): allow excluding unreliable models from Auto selection; use them only explicitly.
- **Terminal ergonomics** (#5227, #2750): option to pin the input box, and keyboard-only conversation scrolling for mouse-less environments.
- **Voice configuration** (#5226): make the `"auto"` transcription language configurable for non-English speakers.
- **Custom-agent fidelity** (#5241): composer agent picker should apply the agent's `model` and `reasoning-effort` frontmatter instead of silently keeping user defaults.

## 7. Developer Pain Points

- **Permission-model trust erosion.** Trusted folders (#5232), background-agent hook bypass (#3013), and aggressive secret redaction (#4065) all point to allow-lists that don't actually validate intent. Devs increasingly read this as a security boundary failure, not a bug.
- **MCP/OAuth lifecycle is brittle.** Four separate reports (#5229, #5233, #5234, #5236) describe the same core failure mode — expired tokens are never refreshed, forcing manual re-authentication and, on Windows, making the CLI unusable. Cross-platform parity (Windows, ACP, interactive) is missing.
- **Cost runaway from context/cache behavior.** #5238 (image cache busting) and #5219 (unbounded subagent budget fallback) show that internal cache and budget policies can burn tokens unexpectedly; devs want visibility and controls.
- **Session-state regressions.** #5228 (`--resume` drops into an empty session and swallows the first Enter), #5242 (MCP inotify watch exhaustion abandons the session queue), and #5133 (`includeCoAuthoredBy` ignored in ACP) all indicate that recently-shipped session/browser machinery is leaking edge cases into daily use.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-10-23

## 1. Today's Highlights

A maintenance-focused day: **v1.19.4** shipped a bundled Bun runtime upgrade to 1.4.4 with security fixes across Brotli, TLS, HTTP/1.1–3, WebSocket, and `fetch`. Meanwhile, the 2.x line continues to absorb stabilization work, with a cluster of core PRs from `rekram1-node` addressing MCP lifecycle bugs, session model resolution, and shutdown behavior. Community attention remains split between ongoing sandboxing demands (#2242, 101 comments) and a wave of v2 regressions around session titles, tool-call handling, and Console provider registration.

## 2. Releases

**v1.19.4**
- **Core / Improvements:** Upgraded the bundled Bun runtime to **1.4.4**, which includes [security fixes](https://bun.com/blog/bun-v1.4.4#security) for Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket, and `fetch`, plus updated root certificates (NSS 3.131.1). No API or behavior changes beyond the runtime bump.

## 3. Hot Issues

1. **#2242 — Sandboxing the agent** ([link](https://github.com/anomalyco/opencode/issues/2242)) — The perennial top issue, still open since Aug 2025 with **101 comments / 80 👍**. Users ask for macOS seatbelt-equivalent restrictions (as seen in gemini-cli/codex-cli) to prevent agents from reading/writing outside the working directory. Strong signal that sandboxing remains the #1 unmet platform need.
2. **#34344 — Unlimited usage exploit on free models** ([link](https://github.com/anomalyco/opencode/issues/34344)) — A reported rate-limit bypass: free-model limits are IP-scoped, so VPN rotation resets them instantly. Closed, but the abuse vector raises questions about free-tier enforcement design.
3. **#50257 — Desktop model picker shows "No reasoning" for all V2 models** ([link](https://github.com/anomalyco/opencode/issues/50257)) — `capabilities.reasoning` is never populated, so reasoning-capable models (deepseek-v4.1-flash, kimi-k3, glm-5.3) are mislabeled. Still open; visible UI correctness issue in the desktop app.
4. **#52083 — Compound shell commands bypass redirection permissions** ([link](https://github.com/anomalyco/opencode/issues/52083)) — An `allow`ed shell command chained into a compound command drops the redirection target from permission evaluation, effectively becoming an unprompted arbitrary-file-write primitive. A security-relevant permission-model gap.
5. **#50652 — External plugin tools bypass configured permissions** ([link](https://github.com/anomalyco/opencode/issues/50652)) — Plugin-registered tools execute without applying their configured permission action, and the same bypass occurs via Code Mode. Compounds the permission-model concerns in #52083.
6. **#51828 — Inactivity eviction SIGTERMs live background shells after 60 min** ([link](https://github.com/anomalyco/opencode/issues/51828)) — `LocationActivity` eviction tears down the location-scoped Shell/Pty graph while the service stays alive, killing long-running background work. Pain point for agentic long tasks.
7. **#58335 — Console account connects but `opencode` provider never registers** ([link](https://github.com/anomalyco/opencode/issues/58335)) — `/api/v2/config` returns 52 models, but `/api/provider` omits `opencode` and `/api/model` has zero `opencode/*` entries. Closed quickly, but a notable v2.1.3 onboarding blocker.
8. **#58176 — Session titles never generated in v2** ([link](https://github.com/anomalyco/opencode/issues/58176)) — New sessions stay "Untitled" (`title = NULL`); v1.18.x auto-titled fine. Marked reproduced; no auto-trigger plus free-tier rejection suspected.
9. **#58027 — DeepSeek writes "[Assistant tool call]" as text instead of executing** ([link](https://github.com/anomalyco/opencode/issues/58027)) — Regression after 2.0.32 → 2.1.2: tool calls surface as plain text. Breaks agentic workflows for DeepSeek users.
10. **#51868 — zh locale machine-translation errors** ([link](https://github.com/anomalyco/opencode/issues/51868)) — 93 of 1828 keys fall back to English, plus glaring mistranslations (壳牌/出口/个贝壳 for shell/exit/seashell). Community-grade i18n quality issue drawing sustained attention.

Also worth tracking: **#12671** (GLM-4.7 balance/recharge errors), **#47646** (ChatGPT OAuth overstated 400k context), **#57975** (unified usage dashboard request), **#58328/#58327** (Brave re-land and custom websearch rate-limit signaling).

## 4. Key PR Progress

1. **#58355 — Use the agent's model when a session has none** ([link](https://github.com/anomalyco/opencode/pull/58355)) — Fixes `opencode run` / `run --agent <id>` ignoring config `agents.<id>.model` and frontmatter; previously only the TUI applied it client-side.
2. **#58352 — Default to agent and last-used model when none selected** ([link](https://github.com/anomalyco/opencode/pull/58352)) — Previously the server picked the newest model across providers (currently `opencode/flint-40b-free`), silently landing paid users on a free model.
3. **#58351 — Stop MCP servers in parallel on shutdown** ([link](https://github.com/anomalyco/opencode/pull/58351)) — Closes #50758; serial shutdown cost 2–4s per unresponsive local server, causing `opencode service restart` force-kills.
4. **#58350 — Skip malformed MCP tools instead of failing the server** ([link](https://github.com/anomalyco/opencode/pull/58350)) — SDK validated `tools/list` as a whole; one bad `inputSchema` made the entire server appear failed. Now tools are validated individually.
5. **#58349 — Don't duplicate MCP servers started during initial reconciliation** ([link](https://github.com/anomalyco/opencode/pull/58349)) — Fixes a startup race where queued launches still fired after `connect()`/`disconnect()` completed, spawning duplicate servers.
6. **#58342 — Keep MCP OAuth login waiting after stray callback requests** ([link](https://github.com/anomalyco/opencode/pull/58342)) — Fixes #55201; loopback callback treated code-less requests (Chrome PNA preflights) as fatal auth failures.
7. **#58341 — Keep remote MCP requests open past Bun's fetch idle timeout** ([link](https://github.com/anomalyco/opencode/pull/58341)) — Silent tool calls >5 min failed despite opencode's 12h MCP timeout.
8. **#58347 — Use `/usr/local/etc/opencode` on FreeBSD** ([link](https://github.com/anomalyco/opencode/pull/58347)) — `ConfigDiscovery.systemDirectory()` incorrectly returned `/etc/opencode` on non-macOS/Windows platforms including FreeBSD.
9. **#58344 — Fold long Mistral-family tool call IDs correctly** ([link](https://github.com/anomalyco/opencode/pull/58344)) — Fixes #58323; the 9-char truncation broke IDs from non-Mistral models routed through mistral-prefixed endpoints (e.g. GLM).
10. **#58346 — Refresh DigitalOcean routers while signed in** ([link](https://github.com/anomalyco/opencode/pull/58346)) — Restores mid-session router visibility after #57175 removed the aggressive 5-min poll.
11. **#57429 — Keep a new tab's draft when its Prompt mounts late** ([link](https://github.com/anomalyco/opencode/pull/57429)) — Fixes draft loss on TUI tab switches (closes #47023).
12. **#57470 — Read clipboard images through Windows interop on WSL** ([link](https://github.com/anomalyco/opencode/pull/57470)) — Fixes #49895; Ctrl+V image paste previously returned `unsupported` under WSL.

## 5. Hot Discussions

No standalone Discussion data was provided in this dataset; discussion activity is captured in the Issues and PRs above.

## 6. Feature Request Trends

- **Sandboxing & permission hardening** — #2242 (sandbox), #52083 and #50652 (permission bypasses) form a coherent theme: users want enforceable, auditable restrictions on what agents and plugins can touch.
- **Usage visibility & limits clarity** — #57975 (unified usage dashboard), #58014 (free-limit hit after few requests), #12671 (balance errors), and #34344 (rate-limit exploit) all point to confusion and distrust around quotas.
- **Model execution location controls** — #58330 asks for a toggle alongside API-key permissions to choose where models execute.
- **Observability / session metadata** — #54881 requests root-session ID headers on LLM requests; #58034 asks for configurable timestamp formats in the UI.
- **Search provider extensibility** — #58328 (re-land Brave built-in) and #58327 (custom provider rate-limit signaling for failover) show demand for a pluggable, resilient websearch layer.
- **Localization quality** — #51868 and PR #58357 signal ongoing demand for accurate zh translations rather than machine-generated fallbacks.

## 7. Developer Pain Points

- **Permission model gaps are recurring and security-relevant.** Both #52083 (shell redirection dropped in compound commands) and #50652 (plugin tools bypass permissions) describe ways to escape configured `allow`/`deny` rules. These are the highest-severity recurring complaints.
- **MCP lifecycle fragility dominates this week's PR queue.** Duplicate servers, serial shutdown stalls, malformed tools failing whole servers, OAuth callback misclassification, and Bun fetch idle timeouts together show a young subsystem with many edge cases being actively hardened.
- **v2 regressions erode trust for upgraders.** Session titles disappearing (#58176), DeepSeek tool calls degrading to text (#58027), and Console provider registration failing (#58335) are all "it worked in 1.x/2.0" reports — the classic migration-friction pattern.
- **Free-tier limits feel opaque and leaky.** Users can exceed limits via VPN rotation (#34344) yet hit "daily limit reached" after a few requests (#58014) — inconsistent enforcement that damages both trust and monetization.
- **i18n quality lags the product.** 93 missing `zh` keys plus mistranslations like 壳牌 for "shell" indicate machine translation shipped without review.
- **Long-running agent work is fragile.** Background shells killed after 60 minutes of location inactivity (#51828) and remote MCP calls timing out at ~5 minutes (#58341) both penalize exactly the long-horizon workflows OpenCode targets.

*Generated from github.com/anomalyco/opencode activity on 2026-10-23.*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-10-23

## 1. Today's Highlights

No new releases shipped in the last 24 hours, so today's activity is dominated by issue triage and a broad wave of bug-fix PRs. The most active thread is the **startup-time budget proposal (#7739)**, which benchmarks Pi against jcode and has drawn 11 comments — a sign that cold-start performance is becoming a competitive concern. Meanwhile, maintainers cleared a large backlog of `no-action` and `untriaged` issues, and several community PRs landed fixes for deep-session export crashes, fuzzy search ranking, and session-fork performance.

## 2. Releases

None in the last 24 hours.

## 3. Hot Issues

1. **[#7739 — Set a startup-time budget targeting jcode-comparable latency and memory](https://github.com/earendil-works/pi/issues/7739)** (OPEN, 11 comments) — The day's most-commented issue. Proposes a formal startup budget benchmarked against jcode's README table (interactive PTY launch latency/memory). Signals growing pressure on cold-start performance as a differentiator.

2. **[#6167 — `transformMessages` thinking-block normalization vs. `requiresReasoningContentOnAssistantMessages`](https://github.com/earendil-works/pi/issues/6167)** (CLOSED, 10 comments) — A subtle cross-model bug: switching models inlines plain-text thinking content, which then trips a compat flag on providers that require reasoning content. Long-tail interop bug, now resolved.

3. **[#9932 — `before_agent_start` forced system prompt keeps tools removed by `setActiveTools`](https://github.com/earendil-works/pi/issues/9932)** (OPEN, 6 comments) — Ordering bug in extension hooks: the forced system prompt is captured before the active tool set is reconciled, so removed tools stay advertised. Important for extension authors building tool-gating logic.

4. **[#10259 — Public tool-presentation API or built-in one-line tool mode](https://github.com/earendil-works/pi/issues/10259)** (OPEN, 5 comments, 👍2) — Request for a display-only API covering all tool rows (built-ins, MCP, codemode, extensions), or a built-in compact one-line mode. One of the few issues today with positive reactions — clear demand for output-density control.

5. **[#11223 — `modelOverrides` silently ignored for classifier models](https://github.com/earendil-works/pi/issues/11223)** (OPEN, 5 comments) — Config is accepted but silently dropped, contradicting `docs/models.md`. Silent failure modes are the worst kind; users want either honoring or an explicit warning.

6. **[#9807 — Full TUI re-render causes scroll/typing lag at 800+ messages](https://github.com/earendil-works/pi/issues/9807)** (OPEN, 5 comments, 👍3) — Compares Pi's full-scrollback re-render unfavorably to OpenCode's incremental cell-level diffing. Highest-reacted open issue today; large-session UX is a real scaling pain point.

7. **[#11250 / #11251 — Strip whole-line HTML comments from context files to match Claude Code](https://github.com/earendil-works/pi/issues/11250)** (CLOSED, 4+2 comments) — Maintainer notes in `CLAUDE.md` are currently sent verbatim to the model. A concrete portability gap for teams migrating from Claude Code.

8. **[#11086 — Symbols leaking into input on Windows terminals under CPU load](https://github.com/earendil-works/pi/issues/11086)** (OPEN, `prio:p0`, 4 comments) — Input corruption when SSH'd into a Linux Pi host while the client is under load. Flagged P0, making it the highest-severity open bug in this batch.

9. **[#11127 — Allow configuring the idle cache-warming horizon](https://github.com/earendil-works/pi/issues/11127)** (OPEN, 3 comments) — The hardcoded 30-minute default misaligns with 27/54-minute refresh schedules under a 30-minute prompt-cache TTL. Cost-efficiency tuning request for heavy users.

10. **[#11252 — macOS: aborting `a; b` can still run `b`](https://github.com/earendil-works/pi/issues/11252)** (CLOSED, 2 comments) — Process-group race on macOS under load means an aborted bash call can execute the next chained command. Safety-relevant; already fixed via PR #11289.

## 4. Key PR Progress

1. **[#11309 — fix(coding-agent): await extension user messages](https://github.com/earendil-works/pi/pull/11309)** (OPEN) — Returns the underlying promise from `sendUserMessage` and lets command handlers await the generated turn; regression test for #11238. Improves extension ergonomics.

2. **[#11304 — fix(coding-agent): start when a configured package fails to install](https://github.com/earendil-works/pi/pull/11304)** (OPEN) — A broken configured package no longer aborts startup; failure is reported through the extension warning channel and other packages still load.

3. **[#11296 — fix(tui,coding-agent): rank contiguous fuzzy matches, search session fields separately](https://github.com/earendil-works/pi/pull/11296)** (CLOSED) — Reworks greedy leftmost matching to score contiguous alignments; closes #11220 and addresses #10552, #10065, #11024. Directly fixes the "typing `opus` ranks Sonnet higher" complaint.

4. **[#11295 / #11145 — Scoped model order and substring match preference](https://github.com/earendil-works/pi/pull/11145)** (CLOSED) — Adds an option to ignore match-position penalties in the scoped model picker so equivalent matches preserve configured order. Complements the fuzzy-search rework.

5. **[#11290 — fix(coding-agent): render system messages in HTML export](https://github.com/earendil-works/pi/pull/11290)** (CLOSED) — Renders the leading system message as system prompt + tool list, and later system messages as named section updates; closes #11261 and #3464.

6. **[#11293 / #11275 / #6843 — Iterative HTML export tree traversal](https://github.com/earendil-works/pi/pull/11293)** (CLOSED) — Replaces recursive `sortChildren`/`mapNodes`/`markActive` with explicit stacks plus a 20,000-level regression test; fixes the blank-export stack overflow (#11225). Three independent PRs converged on the same fix.

7. **[#11289 — fix(coding-agent): stop macOS shell groups before killing them](https://github.com/earendil-works/pi/pull/11289)** (CLOSED) — Reduces the race where killing a foreground child wakes its shell before the shell is signalled; closes #11252.

8. **[#11288 — fix(coding-agent): write forked session through one fd](https://github.com/earendil-works/pi/pull/11288)** (OPEN) — Replaces per-entry `appendFileSync` (≈3,000 open/close cycles for a 3,000-entry fork) with a single fd; targets the 30s+ fork hang in #11253.

9. **[#11278 — fix(extensions): preserve ctx.ui getters through wrapUIPromptContext](https://github.com/earendil-works/pi/pull/11278)** (CLOSED) — Object spread was resolving `get theme()` at bind time, breaking hosts that bind UI context before theme initialization.

10. **[#11270 — fix(coding-agent): drop min-release-age override from managed npm ci](https://github.com/earendil-works/pi/pull/11270)** (CLOSED) — The `--min-release-age=0` flag had no effect against pinned lockfiles but tripped security scanners blocking updates; removing it unblocks installer pipelines.

## 5. Hot Discussions

**Show and tell**
- **[#11307 — pi-better-web-search](https://github.com/earendil-works/pi/discussions/11307)** (👍1) — One `web_search` tool with raw (unrewritten) provider results and real cross-provider fallback, so a model without native search falls back to a provider you're already logged into rather than failing.
- **[#11306 — pi-continuity](https://github.com/earendil-works/pi/discussions/11306)** (👍1) — Auto-resume after coding-plan usage limits (e.g., OpenAI's 5-hour cap) and interrupted turns, removing the need to manually type "continue" hours later.

## 6. Feature Request Trends

- **Performance budgets and large-session scaling**: startup latency vs. jcode (#7739), TUI re-render lag at 800+ messages (#9807), fork stalls on 73MB sessions (#11253), and recursive export crashes (#11225) all point to performance work as the top theme.
- **Extension/API surface expansion**: public tool-presentation API (#10259), message identity in markdown transformer context (#7828, shipped via #7952), durable MCP extension for Harness hosts (#10837), and OAuth client-name customization for MCP servers (#10226).
- **Output density and configurability**: one-line tool mode (#10259), configurable cache-warming horizon (#11127), provider-scoped auto-compaction with absolute token thresholds (#11295), inline slash autocomplete for skills (#11294), and `/reload` refreshing `AGENTS.md` (#11291/#11292).
- **Claude Code parity for context files**: stripping whole-line HTML comments (#11250/#11251) — a small but concrete migration-friction request.

## 7. Developer Pain Points

- **Silent failures**: `modelOverrides` ignored without warning (#11223), missing `checkpointWhen` passing validation until first commit crashes (#11305), and `pi.exec` swallowing spawn errors (#11257) — developers repeatedly ask for loud, early validation over silent no-ops.
- **TUI input robustness**: symbol leakage into input under CPU load (#11086, P0), empty bracketed paste on WSL dropping images (#11259), split mouse reports leaving escape-sequence tails in the prompt (#11172), and the long-standing `Ctrl+C` wipes entire prompt (#9190) — terminal input handling remains the most bug-dense area.
- **Process/session lifecycle fragility**: macOS `a; b` abort race (#11252), extension API providers wiped by mid-session settings reload causing uncaught exceptions (#11287), and slow forked-session copies (#11253).
- **Unfulfilled config expectations**: docs promising behavior (`docs/models.md`, `AGENTS.md` reload) that the runtime does not deliver, forcing session restarts (#11291/#11292).
- **Unclear distribution/infra**: missing macOS/brew install instructions and non-public associated repo (#11282) — indicates documentation and release-channel gaps alongside code issues.

---
*Generated from github.com/earendil-works/pi activity on 2026-10-23.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-10-23

## 1. Today's Highlights

A fresh nightly (`v0.26.0-nightly.20261022`) ships daemon token persistence, but the day's attention is dominated by **reliability regressions in the 0.26.0 line** — notably a P1 report of silently dropped tool results (#15297) and a P1 ACP bug where truncated `write_file` arguments get persisted to disk (#15324). On the feature side, the manifest keeps expanding around the **Managed Agent / daemon / Web Shell** stack: scheduled-task gates, external Runtime provisioners, per-session working directories, and a long-running discussion about unifying every surface on one agent loop (#15327).

## 2. Releases

**v0.26.0-nightly.20261022.bf66a26c97** — [Release](https://github.com/QwenLM/qwen-code/releases)
- `feat(serve)`: add daemon token persistence (PR [#15023](https://github.com/QwenLM/qwen-code/pull/15023), @wenshao) — daemon auth tokens now survive restarts, a prerequisite for stable `qwen serve` / Web Shell deployments.
- `fix(release)`: cover every spawned vendored binary in the release pipeline.

## 3. Hot Issues

1. **[#15297](https://github.com/QwenLM/qwen-code/issues/15297) — P1: 0.26.0 silently drops tool results (~1 in 30 calls)** — Windows users report `functionCall` with no `functionResponse`; edits apply but the model re-reads files. Highest-severity regression of the day; 43/1663 calls, 28 confirmed via transcripts.
2. **[#15324](https://github.com/QwenLM/qwen-code/issues/15324) — P1: ACP writes truncated `write_file` args to disk** — Output-limit cutoffs produce partial file writes reported as success. Affects Zed, VS Code companion, `qwen serve`, and SDK clients.
3. **[#15327](https://github.com/QwenLM/qwen-code/issues/15327) — P1 tracking: unify every surface on one agent loop** — Proposal to run CLI, Web Shell, ACP, and SDK through a single `experimental.unifiedAgentLoop`; would eliminate the class of divergence bugs seen in #15326.
4. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078) — Daily dependency CVE audit failing (29 comments)** — Longest-running thread in the tracker; scheduled audit remains red, suggesting possible npm audit endpoint issues or an unaddressed high-severity finding.
5. **[#15165](https://github.com/QwenLM/qwen-code/issues/15165) — Shell safety parser triggers ~1.6 GiB transient WASM allocation on Node 24.16.0** — Measured native-memory spike in the bundled Bash parser; a serious problem for memory-constrained CI and containers.
6. **[#15328](https://github.com/QwenLM/qwen-code/issues/15328) — Headless run exits 0 with no output on truncated turn** — Silent-success failure mode breaks scripted/CI usage; reproduced 3 of 4 runs on 0.23.4.
7. **[#15325](https://github.com/QwenLM/qwen-code/issues/15325) — stream-json past `--max-session-turns` returns success with the previous answer** — Stale-answer bug with no error signaling; directly misleading for SDK consumers.
8. **[#15248](https://github.com/QwenLM/qwen-code/issues/15248) — sdk-java runtime broker timing tests flake 3/3 on GitHub-hosted runners** — Fork-PR fast lane is effectively blocked; hosted vs self-hosted runner divergence is a recurring theme.
9. **[#8968](https://github.com/QwenLM/qwen-code/issues/8968) — MCP 2026-07-28 core spec + MCP Apps support in daemon WebShell** — Long-standing (Aug) integration request; the SDK v1 → current migration remains open and is the main MCP gap.
10. **[#13787](https://github.com/QwenLM/qwen-code/issues/13787) — XML recovery repeats prefix scans on large multi-call responses** — Bounded repro on `main`; performance cliff for long tool-call bursts.

## 4. Key PR Progress

1. **[#15218](https://github.com/QwenLM/qwen-code/pull/15218) — feat(managed): gate automations on a Runtime probe before claim** — Automations can carry a shell-command gate; a quiet exit settles as `skipped/gate_quiet` with no session turn.
2. **[#15211](https://github.com/QwenLM/qwen-code/pull/15211) — feat(serve): carry scheduled-task gate through daemon and Web Shell** — Follow-up to #15069; brings gating into the daemon path.
3. **[#15261](https://github.com/QwenLM/qwen-code/pull/15261) — feat(runtime-broker): HTTP-backed external scratch workers** — Opt-in `external-scratch` provider delegates worker placement to an operator-run service, with attestation and retry semantics.
4. **[#15041](https://github.com/QwenLM/qwen-code/pull/15041) — feat(core): source-config header for 千问AI平台 / QwenCloud** — Adds `X-DashScope-Source-Config` for the `maas.qianwenaiapi.com` / `maas.qwencloudapi.com` host families.
5. **[#15089](https://github.com/QwenLM/qwen-code/pull/15089) — feat(serve): `todo_write` for managed workspace sessions** — New `/3` tool profiles; `/1` and `/2` sessions keep behavior unchanged.
6. **[#15283](https://github.com/QwenLM/qwen-code/pull/15283) — feat(cli): align OpenTUI session recovery with Ink** — One recovery batch covering cancellation, Retry, recall, resume/branch replay, rewind, checkpoint restore.
7. **[#15246](https://github.com/QwenLM/qwen-code/pull/15246) — perf(memory): retain unchanged legacy catalog snapshots** — Memory-usage win for resumed and retried sessions.
8. **[#15290](https://github.com/QwenLM/qwen-code/pull/15290) — fix(ci): gate Windows Hosted suite on successful install** — Restores the implicit dependency that the Hosted cases actually have a usable install.
9. **[#15286](https://github.com/QwenLM/qwen-code/pull/15286) / [#15275](https://github.com/QwenLM/qwen-code/pull/15275) — fix(ci): scope sdk-java host lock to cache write-back** — Runs Maven unlocked from a job-local repo; addresses the host-lock starvation cascade.
10. **[#15311](https://github.com/QwenLM/qwen-code/pull/15311) — fix(web-shell): refresh standalone sessions after allocation** — New conversation now appears while its first response is still streaming.

## 5. Hot Discussions

No dedicated Discussion data was provided for this window; conversation on design questions is happening in Issues (#15077, #14988, #15327, #15166) rather than Discussions.

## 6. Feature Request Trends

- **Session management maturity**: archived-session listing + title search ([#15077](https://github.com/QwenLM/qwen-code/issues/15077), closed), per-session working directories within a shared workspace ([#15316](https://github.com/QwenLM/qwen-code/issues/15316)), and unified agent-loop tracking ([#15327](https://github.com/QwenLM/qwen-code/issues/15327)).
- **Web Shell UX consistency**: Workspace/Session terminology alignment ([#14988](https://github.com/QwenLM/qwen-code/issues/14988)), sidebar Create-group placement ([#15312](https://github.com/QwenLM/qwen-code/issues/15312)), full argument/result detail for expanded MCP tool cards ([#15280](https://github.com/QwenLM/qwen-code/issues/15280)).
- **MCP modernization**: full MCP 2026-07-28 core spec and MCP Apps hosting in daemon WebShell ([#8968](https://github.com/QwenLM/qwen-code/issues/8968)).
- **Extensible surfaces**: HTTP-backed external Runtime provisioner ([#15247](https://github.com/QwenLM/qwen-code/issues/15247), landed as PR #15261).
- **Web search configurability**: explicit opt-in for DashScope-compatible gateways ([#15302](https://github.com/QwenLM/qwen-code/issues/15302)) and configurable extra trusted hosts ([#15299](https://github.com/QwenLM/qwen-code/issues/15299)).
- **Platform correctness**: telling the model which shell it uses on Windows ([#15310](https://github.com/QwenLM/qwen-code/issues/15310)).

## 7. Developer Pain Points

- **Silent failure modes**: exit code 0 with no output (#15328), stale answers past turn limits (#15325), and dropped tool results (#15297) all break trust in automation and headless/CI use.
- **Truncation handling**: token-limit cutoffs are not detected before side effects — ACP writes partial files (#15324).
- **CI instability and runner divergence**: sdk-java flakes on hosted runners (#15248), per-commit failure spam (#15166), and self-hosted host-lock starvation (#15275, #15286) dominate maintainer attention.
- **Memory and performance regressions**: 1.6 GiB transient WASM allocation in shell-safety classification (#15165) and quadratic XML recovery scans (#13787).
- **Platform naivety**: Windows shell assumptions (#15310) and Windows-hosted suite misconfiguration (#15290).
- **Persistent dependency hygiene gap**: the CVE audit issue (#13078) has been open and red since 2026-09-30 with 29 comments and no resolution.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*