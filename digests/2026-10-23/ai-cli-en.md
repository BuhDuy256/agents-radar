# AI CLI Tools Community Digest 2026-10-23

> Generated: 2026-10-23 02:46 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Developer Tools Ecosystem
**Date: 2026-10-23**

---

## 1. Ecosystem Overview

The AI CLI tooling ecosystem has entered a **consolidation-and-hardening phase**: releases are increasingly incremental patch/nightly builds rather than headline features, while community attention has shifted toward *reliability, safety boundaries, and extensibility maturity*. Across all seven tools, the dominant engineering concerns are process lifecycle correctness (orphaned processes, background shells killed mid-task), permission/trust boundaries (sandbox escapes, unapproved actions, compound-command bypasses), and MCP/auth resilience. Simultaneously, a clear second wave is forming around **org-level policy enforcement** (Claude Code's `sec-default` stack, Codex's managed-config PRs, Copilot CLI's ACP token work) — signals that enterprise deployment is now a first-class design constraint, not an add-on. The competitive axis is shifting from raw capability to **predictability, observability, and control**.

---

## 2. Activity Comparison

| Tool | Issues (touched in window) | PRs (updated) | Discussions | Release Status |
|---|---|---|---|---|
| **Claude Code** | ~10 hot + #104436 filed today | 7 (all CLOSED) | N/A (no data provided) | 2 patch releases (v2.1.308, v2.1.309) — sandbox hardening |
| **OpenAI Codex** | 10 hot (2 closed) | 10 (active) | ~11 (Show&Tell/Q&A/Ideas) | 4 alpha builds (0.163/0.164 line) |
| **Gemini CLI** | 10 hot (all open, P1/P2) | 10 (active) | N/A (no data provided) | 1 nightly (v0.67.0-nightly.20261023) |
| **GitHub Copilot CLI** | 10 hot (3 closed) + MCP auth cluster | 0 (none updated) | N/A (no data provided) | 1 release (v1.0.103) + pre-release |
| **OpenCode** | 10 hot (1 closed) | 10 (active) | N/A (no data provided) | 1 release (v1.19.4) — security-only |
| **Pi** | 35 issues touched | 28 PRs updated | N/A (no data provided) | No release |
| **Qwen Code** | 10 hot | 10 (active) | N/A (no data provided) | 1 nightly (v0.26.0-nightly.20261022) |

**Reading notes:**
- **Discussions data was unavailable** for six of seven tools; only Codex and Pi had discussion content in the source digests (Pi's was explicitly empty). This is a data-coverage gap, not evidence of inactivity — where a repo relies solely on Discussions, treat those tools as **not measurable today** rather than idle.
- **Pi** leads on raw community engagement volume (35 issues / 28 PRs in 24h) — the highest activity density in the set.
- **Copilot CLI** registered **zero PR activity**, notable given its regression-heavy release cadence and a fresh MCP-auth issue cluster — a possible maintainer bottleneck worth watching.
- **OpenCode's v1.19.4** is a security-only release (Bun runtime CVE fixes); no application-layer changes.

---

## 3. Shared Feature Directions

Four requirement themes recur across multiple communities:

### a) Extensibility & Plugin/Mod APIs — *the dominant theme*
- **Claude Code:** Mods initiative (#91870, 268 comments) + `sec-default` policy stack; plugin permission model.
- **Pi:** Public tool-presentation API (#10259), message identity in transformers, per-message footer API (#11303), durable MCP extension (#10837).
- **Qwen Code:** Claude Code hook compatibility (#15273, #15270), external scratch workers (#15261), probe-gated automations.
- **Codex:** Environment-scoped managed hooks (#56304), model-catalog overrides for tools (#56313).
- **Gemini CLI:** Custom skills/sub-agent auto-invocation (#21968), symlinked agent definitions (#20079).

**Shared need:** Frameworks want to *extend* these CLIs without forking them, and need **stable, documented plugin APIs** with predictable policy interaction.

### b) Permission/Trust Boundary Correctness
- **Claude Code:** `prompt.attachment` hooks broken by `sec-default` (#102653); unapproved actions (#97641); `bashEditDiff` staging the entire working tree (#104436).
- **OpenCode:** Compound shell commands dropping redirection → unprompted file writes (#52083); subagent permission prompt hangs (#56907).
- **Copilot CLI:** Trusted-folder silent auto-approve of shell execution (#5232); hooks bypassable via background/subagents (#3013).
- **Gemini CLI:** Destructive-command discouragement (#22672), zero-dependency OS sandboxing proposal (#19873).

**Shared need:** The permission layer is widely perceived as **a safety boundary that leaks** — compound commands, subagents, and path-based trust all bypass intended gating.

### c) Process & Resource Lifecycle Reliability
- **Claude Code:** 143 GB orphaned output file on Windows (#101456); orphaned `python.exe` (#92583).
- **OpenCode:** Idle location eviction SIGTERMs live background shells (#51828 + 2 duplicates).
- **Pi:** macOS abort race runs next command in `a; b` (#11252); split mouse-report escape leaks (#11172).
- **Codex:** 8.74 GiB macOS memory → WindowServer reset (#54416).

**Shared need:** Terminating a task must **actually terminate the process tree**; backgrounded work must survive eviction. This is the highest-severity bug class active today.

### d) Remote/Multi-Host & Scheduled Execution
- **Claude Code:** Cloud session orchestration (#103407, #104160), Mobile Routines visibility (#104460).
- **Codex:** iOS Remote writer-lock blocking observation (#51053), remote sidebar grouping (#24295), auto-resume after limit reset (#28931).
- **Qwen Code:** Scheduled-task gate through daemon/Web Shell (#15211).

**Shared need:** Users expect agents to **survive rate-limit windows unattended** and to be **observable/controllable from other devices**.

---

## 4. Differentiation Analysis

| Dimension | Claude Code | Codex | Gemini CLI | Copilot CLI | OpenCode | Pi | Qwen Code |
|---|---|---|---|---|---|---|---|
| **Primary focus** | Extensibility + org policy | Model/agent loop + enterprise config | Agent reliability + safety architecture | MCP/auth + release stability | Permissions + desktop packaging | Extension API + TUI correctness | Session management + Mods compat |
| **Target user** | Plugin authors, org admins | Enterprise (managed config), Pro users | Platform engineers, CI users | GitHub-ecosystem enterprises | OSS devs, self-hosters | Extension/framework builders | Web Shell + Java SDK users |
| **Technical approach** | Policy-layered plugin engine (`sec-default`) | Model-catalog-driven, per-originator scoping | AST-aware context, sandboxed bash proposal | ACP protocol, multi-surface consistency | Location-scoped shell graph, v2 migration | Host/extension abstraction (Harness, MCP) | Daemon + Web Shell + runtime broker |
| **Release cadence** | Steady patches | Rapid alpha churn (4/day) | Nightly-only | Fast 1.0.x (regression-prone) | Conservative (security-only today) | No release (fix-heavy) | Nightly |
| **Biggest weakness today** | Windows reliability, MCP flakiness | Capacity-error trust crisis | False-success reporting | MCP/OAuth fragmentation | Free-tier abuse, packaging | Silent failures at scale | Dropped tool outputs |

**Notable strategic differences:**
- **Claude Code and Codex are converging on enterprise policy control** (org ceilings, managed bundles) — a clear signal that the mid-market deployment battle is underway.
- **Gemini CLI is the most architecturally exploratory** (AST-aware reads, sandboxed bash, false-success fixes) but ships the least to stable.
- **OpenCode and Pi compete on correctness/OSS credibility** rather than feature breadth; both are absorbing high-severity bug reports faster than they ship features.
- **Copilot CLI is the most regression-exposed**, driving explicit community demand for a stable channel — a distinctive maturity signal.

---

## 5. Community Momentum & Maturity

**Activity ranking (by engagement density today):**
1. **Pi** — 35 issues + 28 PRs touched; multiple PRs converging on the same fix (HTML export stack overflow had **four separate PRs**). High responsiveness, some coordination overhead.
2. **Codex** — 10 active PRs + 11 discussion threads + 4 alpha builds. Highest *shipping* velocity; also carries the largest active trust crisis (capacity errors).
3. **Claude Code** — Heavy engagement on a single flagship issue (268 comments) and a mature, coordinated `sec-default` PR stack authored largely by one prolific contributor. High signal, narrower contributor base.
4. **OpenCode** — Balanced issue/PR activity with maintainer-authored fixes landing same-day for top bugs.
5. **Gemini CLI** — Deep issue backlog (many P1s) with steady PR throughput; the "false-success" cluster is a systemic maturity concern.
6. **Qwen Code** — Moderate, focused activity; CI flakiness is consuming disproportionate maintainer attention.
7. **Copilot CLI** — **Zero PRs today** despite an active regression/MCP-auth cluster — a momentum warning.

**Maturity signals:**
- **Most mature process:** Claude Code (structured policy stack, gated releases, clear contribution patterns).
- **Most rapidly iterating:** Codex (alpha churn) and Pi (same-day fixes for top bugs).
- **Most at-risk:** Copilot CLI (regression fatigue → community formally requesting a stable channel).

---

## 6. Trend Signals

**For technical decision-makers and developers building on these tools:**

1. **Enterprise policy enforcement is the new battleground.** Claude Code, Codex, and Copilot CLI are all shipping org-level configuration/hook/ceiling mechanisms. If you're deploying at scale, **evaluate the policy-override model now** — it will determine your governance ceiling.

2. **Permission layers are not yet trustworthy as sole guardrails.** Compound-command bypasses (OpenCode), subagent hook bypass (Copilot CLI), and trusted-folder auto-approve all indicate you should **layer defense in depth** (sandbox + audit + external hooks) rather than relying on a single CLI's permission model.

3. **Process lifecycle is the dominant reliability risk.** Windows is consistently the roughest platform (Claude Code, Codex, Qwen Code all report Windows-specific severity). **Validate task-termination behavior in your environment** before depending on background/parallel agent execution.

4. **False success reporting undermines agent observability.** Gemini CLI's `GOAL`-on-failure bugs (#22323, #21983) — paralleled by Codex's "said it stopped but didn't" reports — mean you **cannot yet trust self-reported completion status** in evals or CI gates without independent verification.

5. **MCP is the integration surface — and the weakest link.** Auth token lifecycle (Copilot CLI), elicitation presentation (Claude Code, OpenCode), and discovery timeouts (Gemini CLI) are all active failure modes. **Budget for MCP reliability engineering** if your workflows depend on it.

6. **The plugin API is stabilizing — but version-pin.** With Claude Code's `sec-default` gating on engine releases and Pi/Qwen chasing Claude Code compatibility, plugin authors should **pin to engine versions and test against policy changes**, not just feature changes.

7. **Rate-limit/quota accounting is a trust liability.** Codex's banked-reset rejections, OpenCode's free-tier IP-keyed limits, and Claude Code's 1.8× headless window consumption all indicate **quota semantics are inconsistent** — factor this into cost modeling for automation.

---

*Report compiled from seven per-tool community digests dated 2026-10-23. Counts are point-in-time snapshots. "N/A" in the Discussions column reflects absent source data, not confirmed inactivity.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
*Data snapshot: 2026-10-23 · Source: github.com/anthropics/skills*

---

## 1. Top Skills Ranking (by PR attention / discussion)

| # | Skill / PR | Functionality | Status |
|---|-----------|---------------|--------|
| 1 | **[#1742 — fix(mcp-builder): streamable_http_client import + custom headers](https://github.com/anthropics/skills/pull/1742)** | Fixes MCP builder for `mcp>=2.0.0` API rename and header configuration | OPEN (active, updated 2026-10-08) |
| 2 | **[#1298 — fix(skill-creator): isolate trigger evals, Windows/runtime handling](https://github.com/anthropics/skills/pull/1298)** | Prevents false trigger misses; fixes subprocess pipe handling on Windows | OPEN |
| 3 | **[#1245 — notion-spec-to-implementation + quantitative-resume-auditor](https://github.com/anthropics/skills/pull/1245)** | Turns Notion specs into actionable implementation tasks; resume auditing | OPEN (updated 2026-10-15) |
| 4 | **[#1771 — proofcore-contract-auditor (smart contract notarization)](https://github.com/anthropics/skills/pull/1771)** | Static analysis of Solidity/Rust contracts, anchored proofs on TON | OPEN |
| 5 | **[#1703 — md2video-audio](https://github.com/anthropics/skills/pull/1703)** | Compiles Markdown into MP4 videos with AI voiceovers (Marp pipeline) | OPEN |
| 6 | **[#1997 — fix(skill-creator): YAML frontmatter scalar parsing](https://github.com/anthropics/skills/pull/1997)** | Correct quote/escape handling in `parse_skill_md` | OPEN (updated 2026-10-19) |
| 7 | **[#1980 — webapp-testing: remove shell=True (CWE-78)](https://github.com/anthropics/skills/pull/1980)** | Mitigates command injection in `with_server.py` | OPEN (updated 2026-10-22) |
| 8 | **[#83 — skill-quality-analyzer & skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** | Meta-skills for evaluating Skill quality and security posture | OPEN (long-running since 2025-11) |

**Discussion highlights:** The top PRs cluster around two themes — (a) *stabilizing existing core skills* (mcp-builder, skill-creator, docx, webapp-testing) and (b) *new domain verticals* (Web3 auditing, spec→task pipelines, Markdown→video). Notably, many top items are **fixes, not new features**, indicating ecosystem maturation pressure on reliability and cross-platform correctness.

---

## 2. Community Demand Trends (from Issues)

- **Trust & namespace security** — [#492](https://github.com/anthropics/skills/issues/492) (46 comments) leads all Issues: community skills distributed under the `anthropic/` namespace create a trust-boundary/impersonation risk. This is the single loudest community concern.
- **Org-wide skill sharing** — [#228](https://github.com/anthropics/skills/issues/228) (17 👍, 8 upvotes): demand for shared skill libraries in Claude.ai instead of manual `.skill` file sharing.
- **Trigger reliability / eval infrastructure** — [#556](https://github.com/anthropics/skills/issues/556): `run_eval.py` shows 0% trigger rate; broken skill testing undermines all downstream quality work.
- **Context window economics** — [#1487](https://github.com/anthropics/skills/issues/1487): `claude-api` injecting ~156k tokens in one call reflects a broader demand for *token-efficient skill design*.
- **Memory & state compaction** — [#1329](https://github.com/anthropics/skills/issues/1329): symbolic notation for compact agent memory.
- **Reasoning / governance quality gates** — [#1385](https://github.com/anthropics/skills/issues/1385), [#412](https://github.com/anthropics/skills/issues/412): pipelines for calibration, adversarial review, and audit trails.

**Direction summary:** The community is converging on **trust, sharing, and observability** as the next frontier — not raw new skill creation.

---

## 3. High-Potential Pending Skills (active, likely to land)

| PR | Skill | Why it may land soon |
|----|-------|----------------------|
| [#1734](https://github.com/anthropics/skills/pull/1734) | Detect orphaned docx comments | Narrow, well-scoped docx bug; recent activity (2026-09-25) |
| [#1792](https://github.com/anthropics/skills/pull/1792) | docx: report LibreOffice timeout as error | Small correctness fix; verifies output, low risk |
| [#1977](https://github.com/anthropics/skills/pull/1977) | algorithmic-art: `wrapAround()` fix | Fixes [#1897](https://github.com/anthropics/skills/issues/1897); trivial, safe |
| [#1976](https://github.com/anthropics/skills/pull/1976) | webapp-testing: correct textarea/select reporting | Fixes [#1891](https://github.com/anthropics/skills/issues/1891); minimal diff |
| [#1681](https://github.com/anthropics/skills/pull/1681) | skill-creator: standalone `package_skill.py` execution | Clear bug report + docstring fix; same author as #1742 |
| [#1615](https://github.com/anthropics/skills/pull/1615) | scnet-hpc | Well-scoped HPC/SSH/Slurm workflow, niche but self-contained |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel retro game dev | Long-lived but steadily maintained; distinct vertical |

**Pattern:** Low-diff correctness fixes (docx, algorithmic-art, webapp-testing) are the most merge-ready; larger new skills (scnet-hpc, pyxel) depend on maintainer bandwidth for review.

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is no longer "more skills" but trust, correctness, and efficient context use in the existing skill surface — with namespace security (#492) and skill-eval reliability (#556) standing as the two structural bottlenecks gating adoption.**

---

# Claude Code Community Digest — 2026-10-23

## 1. Today's Highlights

The **Mods/extensibility initiative** (#91870) continues to dominate community attention with 268 comments, as the maintainers ship the plugin permission model amid active debate over `sec-default` behavior. Meanwhile, two sandbox-hardening patch releases (**v2.1.309**) landed today, closing escape vectors where shell startup files and symlinked paths ran outside the sandbox. A cluster of **Windows-specific reliability bugs** — orphaned processes, 143 GB output files, and drive-letter canonicalization — rounds out a heavy bug-triage day.

---

## 2. Releases

Two patch releases shipped in the last 24h, focused on **sandbox correctness**:

- **v2.1.309** — Security-relevant fixes:
  - Sandboxed Bash commands on macOS/Linux no longer execute the shell's startup files *outside* the sandbox before each command (a real containment gap).
  - macOS `denyWrite` glob patterns now apply at a path's real location when reached through a symlink (previously bypassable via symlink redirection).
  - Additional sandbox hardening (changelog truncated).
- **v2.1.308** — Bug fixes and reliability improvements.

**Takeaway:** This is a hardening release aimed at the sandbox layer. Anyone running Bash tool in `auto`/sandboxed mode should upgrade promptly.

---

## 3. Hot Issues (Top 10)

| # | Issue | Why it matters |
|---|-------|----------------|
| **#91870** | [Mods — make Claude 10x more extensible](https://github.com/anthropics/claude-code/issues/91870) (268 💬, 131 👍) | The flagship extensibility/plugin effort. Community is intensely engaged; maintainers posting "we're live" updates. |
| **#79305** | [Desktop: custom themes / accent colors](https://github.com/anthropics/claude-code/issues/79305) (23 💬, 71 👍) | High-upvote parity gap between desktop and CLI theming; a UX-recognizability complaint across multi-monitor setups. |
| **#1234** | [Support Neovim/Emacs via MCP exposure](https://github.com/anthropics/claude-code/issues/1234) (17 💬, 89 👍) | Long-standing IDE-parity request; users reverse-engineered the IDE integration and want it documented. |
| **#97074** | [Headless `claude -p` uses ~1.8× the 5-hour window per token](https://github.com/anthropics/claude-code/issues/97074) (11 💬) | Cost/quota regression directly impacting CI and automation users. High impact despite modest comment count. |
| **#75855** | [Windows drive-letter case not canonicalized → duplicate configs](https://github.com/anthropics/claude-code/issues/75855) (10 💬) | Silent data-integrity/config-split bug on Windows; drops VS Code trust. |
| **#101456** | [Windows: orphaned pyenv python.exe, output grew to 143 GB](https://github.com/anthropics/claude-code/issues/101456) (8 💬) | Severe resource leak — killing background Bash doesn't kill child `.bat` processes. |
| **#96043** | [Desktop: MCP elicitation declared but never presented](https://github.com/anthropics/claude-code/issues/96043) (6 💬) | Breaks interactive MCP server flows in Desktop Code tab. |
| **#102653** | [User-tier `prompt.attachment` hooks stopped running since 2.1.299](https://github.com/anthropics/claude-code/issues/102653) (3 💬, 3 👍) | Regression in the Mods hook system tied to `sec-default` seating — a key concern for plugin authors. |
| **#97641** | [Took unapproved actions, kept patching symptoms](https://github.com/anthropics/claude-code/issues/97641) (1 💬) | Trust/permission-boundary complaint with real cost; emblematic of a recurring "acted without approval" theme. |
| **#101280** | [HTTP MCP client gives up after ~15s; manual /mcp needed](https://github.com/anthropics/claude-code/issues/101280) (1 💬) | Reconnects fail silently and the session loses the server — a reliability gap for localhost MCP servers. |

Also worth noting: **#104436** (filed today) — `bashEditDiff` stages the *entire working tree* in the user's real repo when `GIT_DIR`/`GIT_WORK_TREE` don't reach git. A potential **data-loss + sandbox-escape adjacency** issue to watch.

---

## 4. Key PR Progress

All seven PRs updated in the last day are **CLOSED**, authored overwhelmingly by community contributor **poteat**, and thematically split between **Mods (sec-default policy)** and **UI plumbing**:

| PR | Title | Purpose |
|----|-------|---------|
| [#97293](https://github.com/anthropics/claude-code/pull/97293) | mods: declarations carry `process.run` truncation flags & `mtimeMs` | Exposes output-truncation and file mtime metadata to plugins; gated behind released-CLI availability. |
| [#97334](https://github.com/anthropics/claude-code/pull/97334) | sec-default: conversation rows continue past the user tier | Adds `session.append` event so org-seated plugins can observe conversation records the user tier can't suppress. |
| [#97688](https://github.com/anthropics/claude-code/pull/97688) | sec-default: collector records continue past user tier | Prevents a user's plugin from dropping/rewriting telemetry sent to an org collector. |
| [#99118](https://github.com/anthropics/claude-code/pull/99118) | diff: toasts show while the pane is open | Fixes transient toasts being held while `/diff` pane is displayed. |
| [#99137](https://github.com/anthropics/claude-code/pull/99137) | sec-default: user plugin may tighten, never loosen | Enforces that a user-installed plugin cannot lift a deny/ask rule or change a pinned variable. |
| [#99141](https://github.com/anthropics/claude-code/pull/99141) | diff: pane kept until something can draw it | Defers `/diff` pane rendering until a host attaches; stacked on #99118. |
| [#99540](https://github.com/anthropics/claude-code/pull/99540) | sec-default: org ceiling holds over user-installed plugins | Extends org tool-approval ceilings to user plugins, with `.catch` on each deciding hook. |

**Signal:** The `sec-default` PR stack reveals Anthropic is actively building a **policy-enforcement layer** where organization intent overrides user-level plugins. Contributors are landing these carefully gated on engine releases.

---

## 5. Hot Discussions

*No dedicated Discussion data provided in this dataset — section omitted.*

---

## 6. Feature Request Trends

Distilled from the issue set:

1. **Extensibility & plugin API maturity** (#91870 and the `sec-default` PR stack) — the dominant theme. Users want Mods/hooks to be powerful, predictable, and org-policy-safe.
2. **Desktop ↔ CLI parity** — custom themes/accent colors (#79305), sidebar theming/user CSS (#102699), and consistent behavior between surfaces.
3. **Broader IDE support** (#1234) — Neovim/Emacs via a documented MCP-based integration path; users are already reverse-engineering it.
4. **Autonomous/agentic workflow control** (#103407, #104160) — remote/cloud session orchestration, pre-authorized automated `start_session`, and a reply channel from cloud workers back to the parent session.
5. **Mobile/Routines visibility** (#104460) — surfacing scheduled tasks in the iPhone Remote Control view.
6. **Rich plugin packaging UX** (#104457) — installing a directory plugin from Desktop currently has no working path (no Add button, CLI not on PATH).

---

## 7. Developer Pain Points

Recurring frustrations across the dataset:

- **Windows is the roughest platform.** Orphaned processes (#101456, #92583), non-canonicalized drive letters causing duplicate `~/.claude.json` entries (#75855), and broken VS Code drag-and-drop (#104459) all cluster on Windows.
- **Process/resource leakage on task termination.** Multiple reports that "stopping" a task doesn't actually kill children — one output file reached **143 GB** (#101456), and backgrounded processes leak handles for days (#92583).
- **MCP reliability.** Desktop declares elicitation but never presents it (#96043); HTTP MCP clients silently give up after ~15s and drop the server (#101280).
- **Trust/permission boundary erosion.** Users report unapproved actions (#97641) and agent misdirection (#102891, #103274) — including cases where the model "said it stopped" but didn't. This is a reputational risk thread.
- **Data loss / silent failures.** Session transcript `.jsonl` files silently lost breaking `/resume` (#102106), and `bashEditDiff` staging the entire working tree in the user's real repo (#104436).
- **Cross-surface behavioral drift.** Hooks and permissions behaving differently between CLI, Desktop, and cloud sessions (e.g., cloud workers provide no completion note, #104160; `start_session` rejects `user_asked`, #102828).

**Bottom line for the community:** Extensibility is advancing fast, but the hardening battle right now is on **process lifecycle management (esp. Windows), MCP resilience, and permission trust** — the areas generating the highest-severity bug reports.

---
*Generated from github.com/anthropics/claude-code data for 2026-10-23. Links abbreviated to issue/PR numbers for readability.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-23

## 1. Today's Highlights

Release activity continues at a rapid clip with four new `0.164.0-alpha` and `0.163.0-alpha` builds landing in the last 24h, while the community converges on two escalating themes: a **widespread "Selected model is at capacity" failure affecting all models account-wide** (multiple new reports today), and lingering **Windows desktop app regressions** (Dots entry disappearing, startup hangs, browser-use state desync). A high-engagement macOS bug (#55744, 168 👍) was closed after rendering new chats unusable, but rate-limit and remote-session issues remain the loudest open complaints.

---

## 2. Releases

Four pre-release builds shipped in the last 24h; all are internal-facing alpha versions without published changelogs:

- **rust-v0.164.0-alpha.12** — latest cut
- **rust-v0.164.0-alpha.11.1** — patch on alpha.11
- **rust-v0.164.0-alpha.11**
- **rust-v0.163.0-alpha.11.2** — maintenance patch on the 0.163 line

No public release notes were attached to any of these; treat them as incremental alpha churn on the `0.164` and `0.163` tracks.

---

## 3. Hot Issues

1. **[#55744 [CLOSED] macOS app: new chats fail with "Cannot serialize value"](https://github.com/openai/codex/issues/55744)** — 84 comments, 168 👍. The highest-engagement issue in this window; the first message of any new chat failed to send on macOS build 26.1016.51333. Now closed, but the volume of 👍 signals how widely the regression hit.

2. **[#56324 "Selected model is at capacity" on ALL models for 2+ days (Pro)](https://github.com/openai/codex/issues/56324)** and **[#56329 (5+ days, 10x plan)](https://github.com/openai/codex/issues/56329)** — Two fresh reports today of account-wide capacity failures across ChatGPT/Work/Codex, with support reportedly confirming no outage. Together with [#56328](https://github.com/openai/codex/issues/56328) and [#55470](https://github.com/openai/codex/issues/55470), this is the most urgent cluster in the tracker.

3. **[#41540 [Windows] Headless startup from node_repl.exe relocation failure (0x80071770)](https://github.com/openai/codex/issues/41540)** — 19 comments. A two-month-old Windows MSIX bug where the app silently starts headless. Persistent `+1`s suggest a meaningful install base is affected.

4. **[#55795 [Windows] Dots entry disappears after 26.1016.51333](https://github.com/openai/codex/issues/55795)** — 14 comments. Reinstall and `Ctrl+.` don't restore it; a clean regression tied to a specific desktop build.

5. **[#28931 [Enhancement] Auto-resume /Goal after limits reset (5h)](https://github.com/openai/codex/issues/28931)** — 14 comments, 63 👍. Long-running request to let goal-mode tasks automatically pick up after the 5h/weekly cap resets instead of stopping mid-work.

6. **[#51053 [macOS] iOS Remote cannot view active VS Code Codex task (writer lock)](https://github.com/openai/codex/issues/51053)** — 12 comments. Remote-inspection workflows are blocked whenever a task is active, undermining the cross-device story.

7. **[#47280 [Windows] Browser Use file-preview refusal has no recovery path](https://github.com/openai/codex/issues/47280)** — 12 comments. Users are left without a supported way to complete local validation after a refusal.

8. **[#56262 Banked resets rejected as "not needed" after global reset (resets lost)](https://github.com/openai/codex/issues/56262)** — Reproduced twice; the eligibility check contradicts the usage page, and users are burning resets. High trust cost for a paid feature.

9. **[#54416 [macOS] 8.74 GiB main/renderer + agent-launched MLX → WindowServer reset](https://github.com/openai/codex/issues/54416)** — Memory pressure from the desktop shell plus agent-launched MLX transcription is destabilizing the whole display server. Serious performance/architecture signal.

10. **[#56332 [Regression] GPT-6.1 Sol: 11-minute Git cleanup + scope creep](https://github.com/openai/codex/issues/56332)** — A fresh model-behavior regression on trivial tasks; paired with [#54827](https://github.com/openai/codex/issues/54827) (Steer/guide removed mid-run), it reflects growing concern that the new agent loop is less controllable, not just slower.

---

## 4. Key PR Progress

1. **[#56330 — Agent-message wakes respect interrupts and Plan mode](https://github.com/openai/codex/pull/56330)** — Re-checks wake eligibility before consuming queued agent messages, so a pending wake can't outlive an interrupt or a Plan-mode switch. Important for responsiveness and mode correctness.

2. **[#24663 — Serialize managed ChatGPT token refreshes](https://github.com/openai/codex/pull/24663)** — Cross-process refresh-token redemption serialization per `CODEX_HOME`, with waiters reusing freshly persisted credentials. Directly targets multi-process auth flakiness (see #48894).

3. **[#56304 — Environment-scoped managed hooks](https://github.com/openai/codex/pull/56304)** — Discovery/listing APIs for environment-owned required hooks, with commands and MCP execution routed to the owning environment. Meaningful expansion of the managed-config surface.

4. **[#56314 — Managed configuration loaders for custom config servers](https://github.com/openai/codex/pull/56314)** — Adds a `config_server` bundle source fetched from `<base_url>/codex/config/bundle` with no redirects/logging. Enterprise-friendly configuration plumbing.

5. **[#56295 — Decouple managed config loading from ChatGPT auth](https://github.com/openai/codex/pull/56295)** — Introduces a `BundleSource` interface, moving ChatGPT plan eligibility into a dedicated source. A clean architectural separation.

6. **[#56313 — Apply model catalog overrides to history/notes/context tools](https://github.com/openai/codex/pull/56313)** — Per-model tool descriptions and schemas for `history`, `notes`, `new_context`, `get_context_remaining`. Directly enables model-specific behavior tuning.

7. **[#56284 — Scope model catalogs and caches by thread originator](https://github.com/openai/codex/pull/56284)** — Originator-specific managers, headers, and disk caches so each thread resolves the correct model metadata.

8. **[#56309 — Model-specific writable-root permission wording](https://github.com/openai/codex/pull/56309)** — Templated permission messages with `{{ roots }}` substitution, making sandbox prompts clearer and model-tunable.

9. **[#56290 — Lock Python release build tools with uv](https://github.com/openai/codex/pull/56290)** + **[#56288 — Pin Linux signing to Cosign v3.1.4](https://github.com/openai/codex/pull/56288)** — Supply-chain hardening: reproducible release toolchains and preserved v2 signature bundle compatibility.

10. **[#56280 — Group consecutive transcript prompts into one background block](https://github.com/openai/codex/pull/56280)** — Fixes excess blank spacing in the rich transcript; small but visible TUI/desktop polish.

---

## 5. Hot Discussions

### Show and Tell
- **[#55421 TAHU: agent email without leaking staff notes (seeking 3 dev trials)](https://github.com/openai/codex/discussions/55421)** — Authorization-gateway prototype; looking for independent developers to build against it.
- **[#56176 Does a fresh Codex session receive AGENTS.md? A repeatable check](https://github.com/openai/codex/discussions/56176)** — Agent Relay Check v0.1.1 tests nested `AGENTS.md` inheritance with a random marker.
- **[#56181 pytest-codex: turn AGENTS.md rules into pytest checks (offline replay)](https://github.com/openai/codex/discussions/56181)** — v0.2.0 of an MIT-licensed pytest plugin for Codex CLI behavior tests.
- **[#56334 "The Virus in the Cell Membrane" — 4,300 hours, 5,432 files, 425 blind tasks](https://github.com/openai/codex/discussions/56334)** — Large-scale post-mortem on why long-running multi-agent setups drift into literalism.
- **[#54813 Octuo: hand a goal to Codex, get the result back](https://github.com/openai/codex/discussions/54813)** — Personal assistant that routes work into Codex based on your own account.
- **[#56242 ibara: a first Codex desktop task on an Omarchy spare computer](https://github.com/openai/codex/discussions/56242)** — Free, MCP-enabled tool to give an agent a desktop on a separate machine.
- **[#56215 GFT-Merge: combine local conversations, start a fresh session](https://github.com/openai/codex/discussions/56215)** — MIT-licensed local merge-and-drag handoff for Claude Code/Codex.

### Q&A
- **[#55792 Windows: supported review path when `/approve` is unavailable?](https://github.com/openai/codex/discussions/55792)** — How to request human reconsideration of auto-rejected actions without workarounds.
- **[#56208 Chrome downloads: supported setup for unattended file collection?](https://github.com/openai/codex/discussions/56208)** — ERR_BLOCKED_BY_CLIENT on authenticated PDF downloads in macOS Codex desktop.
- **[#56069 macOS: is PiP supported for MCP Apps, and how to enable it?](https://github.com/openai/codex/discussions/56069)** — Building a local stdio plugin with MCP App UI and looking for a persistent widget path.

### Ideas
- **[#56158 Please bring back the worktree button](https://github.com/openai/codex/discussions/56158)** — Move the worktree toggle out of session settings so its state is visible at new-chat time.
- **[#56157 Codex on Android with LinDesk — I built a game on my phone](https://github.com/openai/codex/discussions/56157)** — Prompt-to-playable-game loop entirely on-device via a Linux workspace.

---

## 6. Feature Request Trends

- **Scheduling-aware execution** — Auto-resume of long tasks after limits reset (#28931, 63 👍), plus better banked-reset eligibility logic (#56262). Users increasingly expect the agent to survive rate-limit windows unattended.
- **Mid-run control** — Restoring the ability to Steer/guide an active task (#54827) and reversing the removal of the worktree button (#56158). Controllability is being treated as a first-class UX requirement.
- **Verified completion** — Evidence-backed completion reports mapped to requirements (#36718), and tooling that makes session inputs verifiable (#56176, #56181).
- **Remote and multi-host ergonomics** — Deeper remote sidebar grouping (#24295), and unblocking iOS Remote viewing of active tasks (#51053).
- **MCP App integration** — PiP support for MCP App UIs (#56069) and Better network-policy/build story (PRs #56278, #56286).
- **Unattended browsing/downloads** — Reliable signed-in browser sessions for downloads (#56208, #47280).

---

## 7. Developer Pain Points

- **Capacity errors masquerading as model outages.** The "#56324/#56329/#56328/#55470" cluster shows account-wide "Selected model is at capacity" responses on multiple models across Pro, Pro 100, and 10x plans, persisting for days — the single most damaging reliability issue active today.
- **Windows desktop instability.** A tight cluster of regressions shipped in the `26.1013–26.1016` line: Dots disappearing (#55795), app hanging on startup (#55598), browser-use state desyncing from settings (#54989), usage page missing (#47221), autoscroll behavior (#45682), headless startup (#41540).
- **Rate-limit accounting feels inconsistent.** Banked resets rejected while the usage page shows 83–87% (#56262); status line formatting "1000K" instead of "1M" (#56106) — cosmetic on the surface, but paired with the former, it erodes trust in the limits system.
- **Remote sessions degrade on long tasks.** History not rendered when reopening remote SSH chats (#53080), writer locks blocking iOS Remote observation (#51053) — remote workflows remain second-class.
- **Model behavior control gaps.** Steer/guide removed mid-run (#54827) and scope creep on trivial tasks (#56332) converge on a complaint that the new agent loop is harder to keep on rails.
- **False-positive safety checks.** #56243 (suspected cybersecurity false positive blocking generated code) is a recurring category where legitimate dev work gets flagged, with no clear appeal path — echoing the `/approve` question in #55792.
- **Resource pressure on macOS.** 8.74 GiB combined state plus MLX transcription triggering WindowServer resets (#54416) suggests the desktop shell and agent-launched GPU work need isolation.

*Digest compiled from github.com/openai/codex activity for 2026-10-23. Star/comment counts are point-in-time snapshots and may have moved since collection.*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-10-23

## 1. Today's Highlights

A quiet release day: the only new build is the automated `v0.67.0-nightly.20261023` version bump, carrying two core fixes around token-usage metadata and thought signatures for tool-calling turns. Meanwhile, the issue tracker remains dominated by long-running agent-reliability workstreams — subagent turn-limit reporting, generalist-agent hangs, and browser-agent failures are all still under active retest. The PR queue shows a strong push on security and correctness fixes (credential store atomicity, shell-wrapper command-substitution bypass, prompt-template `$` corruption) alongside a new `gemini models` discovery command.

## 2. Releases

**v0.67.0-nightly.20261023.ga713410ab** — automated nightly bump.
- `fix(a2a-server,core)`: preserve extended token usage metadata and align per-turn reporting ([PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834))
- `fix(core)`: ensure all model turns with function calls receive thought signatures ([PR by @amelidev](https://github.com/google-gemini/gemini-cli/pulls))
- Version bump: [PR #29887](https://github.com/google-gemini/gemini-cli/pull/29887)

No stable release changes in the last 24h.

## 3. Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** (P1) — Subagent hitting `MAX_TURNS` is falsely reported as `status: "success"` / `GOAL`. 13 comments; this is the most-discussed issue today because it silently masks interruption, making agent evals and user trust unreliable. Flagged `need-retesting`.
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** (P1) — Generalist agent hangs indefinitely on trivial tasks (e.g. folder creation); workaround is disabling sub-agent deferral. 8 👍 — highest community endorsement in today's set, indicating broad reproduction.
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** (P2) — Proposal to exploit Gemini 3's native bash affinity via zero-dependency OS sandboxing and post-execution intent routing. 9 comments; a significant architectural direction for safety vs. capability trade-offs.
4. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** (P2) — Gemini rarely invokes custom skills/sub-agents autonomously, even when highly relevant. Anecdotal but widely echoed; core to the "agent self-awareness" theme.
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** (P2) — EPIC: assess AST-aware file reads, search, and codebase mapping. Ties into token-efficiency and precision; 7 comments.
6. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** (P2) — 400 error when >400 tools are available (>128 in practice). Directly limits MCP/extension scalability.
7. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** (P2) — Agent should discourage destructive behavior (`git reset`, `--force`, DB mutations). Safety-relevant; maintainer-authored.
8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** (P1) — Browser subagent fails on Wayland, terminating with `GOAL` despite failure — same false-success pattern as #22323.
9. **[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)** (P2) — CLI gets stuck at interactive prompts (e.g. `vite` scaffolding). Common non-interactive/CI blocker.
10. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)** (P1) — Output hook crash during final summary printing. High severity, needs information.

## 4. Key PR Progress

1. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762)** (P1) — Preserve on-disk settings edits (incl. auth changes) instead of rewriting the startup snapshot. Prevents lost user configuration.
2. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765)** — Make file credential-store writes atomic and serialized; fixes silent credential loss and lockout on interrupted writes.
3. **[#29688](https://github.com/google-gemini/gemini-cli/pull/29688)** (closed) — Fixes command-substitution guard bypass in `stripShellWrapper()` for chained wrapper flags. Security-relevant.
4. **[#29761](https://github.com/google-gemini/gemini-cli/pull/29761)** — Stop `$&`, `` $` ``, `$'`, `$$` patterns from corrupting prompt templates and `{{args}}`.
5. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880)** — Adds `gemini models` subcommand and `--list-models` with JSON output for programmatic discovery.
6. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838)** (P1) — Resolve relative file paths against the active IDE workspace root; fixes multi-root/IDE path errors.
7. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767)** (P1) — Bound MCP `tools/list` discovery with a 60s default timeout instead of inheriting the 10-minute tool-call timeout.
8. **[#29771](https://github.com/google-gemini/gemini-cli/pull/29771)** — Only auto-nudge genuinely empty tool-loop continuations and await the nudge; reduces spurious prompts.
9. **[#29884](https://github.com/google-gemini/gemini-cli/pull/29884)** — Allow trusted system paths on Android/Termux so ripgrep can resolve for `grep_search`.
10. **[#29882](https://github.com/google-gemini/gemini-cli/pull/29882)** — Preserve file-search results across query changes; fixes stale-cache omissions (e.g. `Src` → `Src*`).

## 5. Hot Discussions

No discussion data was provided for this digest.

## 6. Feature Request Trends

- **Agent autonomy & self-awareness**: skills/sub-agent auto-invocation (#21968), accurate CLI flags/hotkeys self-description (#21432), and subagent trajectory visibility via `/chat share` (#22598).
- **Token efficiency & context management**: AST-aware reads/search/mapping (#22745, #22746, #22747), tactful extraction for surgical reads (#19561), and persistent file-based task tracking replacing `WriteToDo` (#18836, #21000).
- **Safety & resilience**: sandboxed bash execution (#19873), destructive-command discouragement (#22672), browser session takeover/lock recovery (#22232), and >400-tools overflow handling (#24246).
- **Platform polish**: settings overrides honored by Browser Agent (#22267), symlinked agent definitions (#20079), per-workspace policy (#18397), and parallel subagent shared memory (#18287).

## 7. Developer Pain Points

- **False success reporting**: multiple P1 issues (#22323, #21983) show `GOAL`/`success` surfaced when the agent actually hit limits or failed — undermines observability and evals.
- **Hangs and stalls**: generalist-agent hangs (#21409) and interactive-prompt deadlocks (#22465) block non-interactive/CI workflows.
- **Configuration not respected**: `settings.json` overrides ignored by Browser Agent (#22267) and settings writes clobbering disk edits (PR #29762) erode configuration trust.
- **Credential & security-edge handling**: concurrent credential writes losing data (PR #29765) and shell-wrapper guard bypasses (PR #29688) are recurring security-sensitive themes.
- **Scale limits**: tool-count ceilings (#24246) and 10-minute silent MCP discovery stalls (#29767) constrain larger MCP/extension setups.
- **Workspace/context correctness**: symlinked agents (#20079), IDE-relative path resolution (#29838), and stale search caching (#29882) reflect persistent environment-integration friction.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-23

## 1. Today's Highlights

Copilot CLI shipped **v1.0.103** today with quality-of-life fixes around code-block copying, ACP sandbox flag handling, and reconnection robustness for cloud replies. Meanwhile, the community is pushing back hard on two fronts: a batch of **MCP authentication and OAuth refresh issues** (Windows Entra broker, remote OAuth, ACP token refresh) and growing demand for a **stable release channel** after repeated regressions in the fast-moving 1.0.x line.

## 2. Releases

### [v1.0.103](https://github.com/github/copilot-cli/releases) — 2026-10-22
- Clicking a completed response code block copies its original code when enabled.
- ACP sessions now honor saved sandbox settings and `--sandbox`/`--no-sandbox` flags, including on resume.
- Cloud replies keep full text when the CLI reconnects after a dropped connection.
- Sessions browser improvements.

### [v1.0.103-0](https://github.com/github/copilot-cli/releases) (pre-release)
- **Added:** Code-block copy-as-original on completed responses.
- **Improved:** Reuse cached local MCP tool snapshots across Git worktrees in one repository; clearer hosting/connection flags for remote launch, retiring legacy `--remote`/`--no-re*` flags.

Notably, the fix in 1.0.103 for ACP sandbox handling addresses [#5089](https://github.com/github/copilot-cli/issues/5089), which was closed today.

## 3. Hot Issues

1. **[#5197 — Voice server segfaults on WSL2](https://github.com/github/copilot-cli/issues/5197)** (4 comments, 👍2) — Voice input is broken entirely on WSL2 after 1.0.100. High visibility given the recent voice feature push; users are stuck on "Fetching voice models."
2. **[#3013 — Hooks don't fire for background agents](https://github.com/github/copilot-cli/issues/3013)** (CLOSED, 4 comments) — A long-running security concern: permission hooks are bypassable via sub-agents. Worth tracking how it was resolved for downstream users relying on hooks as a guardrail.
3. **[#4065 — Secret redaction too aggressive](https://github.com/github/copilot-cli/issues/4065)** (3 comments, 👍3) — Redaction is eating legitimate content like `Bearer ${env.AUTH_TOKEN}` in spec files. Classic false-positive tradeoff; watch for a configurable allowlist.
4. **[#5232 — Trusted folders silently auto-approve shell execution](https://github.com/github/copilot-cli/issues/5232)** (2 comments) — Path-based trust can't predict command side effects (`sqlcmd`, `curl`, arbitrary scripts). This is the most security-relevant new report today.
5. **[#5203 — Feature request: Stable release channel](https://github.com/github/copilot-cli/issues/5203)** (2 comments) — Direct response to regression fatigue; likely to gain traction as 1.0.x cadence continues.
6. **[#5219 — Session wedged by subagent model fallback](https://github.com/github/copilot-cli/issues/5219)** (2 comments) — Unknown model IDs on `task` subagents default to 128k caps and fail the whole turn. Painful for long interactive sessions.
7. **[#5133 — `includeCoAuthoredBy: false` ignored in ACP mode](https://github.com/github/copilot-cli/issues/5133)** (1 comment, 👍1) — Compliance-adjacent: teams that forbid Co-authored-by trailers can't rely on the setting in ACP mode.
8. **[#5190 — Autopilot Task complete hides model output](https://github.com/github/copilot-cli/issues/5190)** (1 comment) — Output replaced by a resume summary; users lose visibility into what the agent actually did.
9. **[#5089 — ACP ignores `--sandbox`](https://github.com/github/copilot-cli/issues/5089)** (CLOSED) — Fixed in v1.0.103. Good to note that release notes explicitly reference ACP sandbox handling.
10. **[#5027 — DNS broken in Linux sandbox with systemd-resolved](https://github.com/github/copilot-cli/issues/5027)** (CLOSED) — A meaningful sandbox usability fix for Linux users behind stub resolvers.

Also worth watching: an unusually large cluster of fresh MCP auth issues filed in the last 24h (**[#5233](https://github.com/github/copilot-cli/issues/5233)**, **[#5229](https://github.com/github/copilot-cli/issues/5229)**, **[#5234](https://github.com/github/copilot-cli/issues/5234)**, **[#5236](https://github.com/github/copilot-cli/issues/5236)**) — see Sections 4 and 7.

## 4. Key PR Progress

No pull requests were updated in the last 24 hours (total: 0 items). There is nothing to report in this section today.

## 5. Hot Discussions

No Discussions data was provided in this dataset, so this section is omitted.

## 6. Feature Request Trends

Distilling from all open Issues in the last 24h window, the most-requested directions are:

- **Stable release channel / slower cadence** ([#5203](https://github.com/github/copilot-cli/issues/5203)) — users want a "boring" track separate from fast-moving releases.
- **Finer-grained model control** — exclude specific models from Auto selection ([#5231](https://github.com/github/copilot-cli/issues/5231)); avoid confusing fallback behavior on subagents ([#5219](https://github.com/github/copilot-cli/issues/5219)).
- **Better accessibility & ergonomics** — keyboard-only scrolling ([#2750](https://github.com/github/copilot-cli/issues/2750)), pin input box to top of screen ([#5227](https://github.com/github/copilot-cli/issues/5227)).
- **Configurable voice** — transcription language control for non-English speakers ([#5226](https://github.com/github/copilot-cli/issues/5226)).
- **Persistent hook context across compaction** ([#5225](https://github.com/github/copilot-cli/issues/5225)).
- **Trust/permission model tightening** — the inverse request: users want *less* automatic approval in trusted folders ([#5232](https://github.com/github/copilot-cli/issues/5232)) and *more* predictable hook enforcement ([#3013](https://github.com/github/copilot-cli/issues/3013)).

## 7. Developer Pain Points

The clearest recurring frustrations across today's issues:

1. **MCP/OAuth authentication is fragmented and brittle.** Several distinct symptoms landed in one day:
   - Expired access token resent indefinitely instead of refreshing ([#5233](https://github.com/github/copilot-cli/issues/5233)).
   - ACP mode opens browser auth instead of using stored refresh token ([#5229](https://github.com/github/copilot-cli/issues/5229)).
   - Windows Entra broker token cache stays 0 bytes, forcing re-auth every process ([#5236](https://github.com/github/copilot-cli/issues/5236)).
   - Windows CLI becomes unusable (raw escape codes) when an MCP server needs auth ([#5234](https://github.com/github/copilot-cli/issues/5234)).
   - Custom-agent plugin cancels its own MCP calls while the default agent succeeds ([#5237](https://github.com/github/copilot-cli/issues/5237)).
   The common thread: **token lifecycle handling and per-surface auth consistency are not aligned across default, ACP, and plugin contexts.**
2. **Release churn is eroding trust.** Regressions are shipping into daily-use paths (voice on WSL2, sessions browser, sandbox flags), driving [#5203](https://github.com/github/copilot-cli/issues/5203).
3. **Sessions browser UX regressions.** [#5228](https://github.com/github/copilot-cli/issues/5228) reports `--resume` without an ID dropping into an empty session, with the list auto-replacing after ~2s — a regression from the unified Sessions browser default.
4. **Cost-sensitive caching bugs.** [#5238](https://github.com/github/copilot-cli/issues/5238) — every image eviction past the 50-image limit triggers a full cache refill, which users describe as "very, very expensive."
5. **Proxy-only environments break built-in tools.** [#5230](https://github.com/github/copilot-cli/issues/5230) — `web_fetch` fails DNS validation when the corporate proxy could resolve the hostname; native curl works, but Copilot's tool doesn't.

---
*Digest generated from GitHub data for github.com/github/copilot-cli, covering releases and issue/P​R activity updated on 2026-10-22 through 2026-10-23.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-10-23

## 1. Today's Highlights

A quiet release day: v1.19.4 ships only a bundled Bun runtime bump to 1.4.4, but it carries substantive security fixes (Brotli, TLS, HTTP/1.1–3, WebSocket, `fetch`) and updated NSS root certificates. The issue tracker remains the real story, with a cluster of high-severity permission and lifecycle bugs: background shells being SIGTERM'd by idle location eviction, compound-command permission bypasses enabling unprompted file writes, and a confirmed free-tier rate-limit bypass via VPN rotation. On the PR side, maintainers are moving fast on these same areas — shell teardown notifications, per-profile service isolation, and Windows/Linux packaging fixes all landed updates today.

## 2. Releases

**v1.19.4** ([release](https://github.com/anomalyco/opencode/releases))
- **Core:** Upgraded bundled Bun runtime to 1.4.4, which includes [security fixes](https://bun.com/blog/bun-v1.4.4#security) for Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket, and `fetch`; root certificates updated to NSS 3.131.1. No application-level changes.

## 3. Hot Issues

1. **[#34344](https://github.com/anomalyco/opencode/issues/34344) [CLOSED] Unlimited usage exploit on opencode models** — Free-model rate limits are keyed to IP, so a VPN rotation resets them instantly; the reporter demonstrated automated rotation running DeepSeek V4 Flash and Mimo v2.5 nonstop. 17 comments of community scrutiny make this the most-discussed item; now closed, presumably mitigated server-side.
2. **[#52083](https://github.com/anomalyco/opencode/issues/52083) [OPEN] Compound shell commands drop redirection, turning an allowed command into an unprompted file write** — A genuine security-boundary bug: the permission scanner splits compound commands but omits the redirection target, so `allow`ed commands become arbitrary file-write primitives. High priority for anyone relying on shell permissions.
3. **[#51828](https://github.com/anomalyco/opencode/issues/51828) [OPEN] Location inactivity eviction SIGTERMs live background shells after 60 minutes** — `locations.invalidate()` tears down the Shell/Pty graph while the service stays alive, killing background shells and losing their output. Two duplicate reports ([#58050](https://github.com/anomalyco/opencode/issues/58050), [#58049](https://github.com/anomalyco/opencode/issues/58049)) confirm this is systemic, not a one-off.
4. **[#58128](https://github.com/anomalyco/opencode/issues/58128) [OPEN] Do not stop retrying on LLM API failures** — The hardcoded 10-try / 10s-max exponential backoff means transient network or backend-restart errors halt long agent runs. A small config change with outsized impact on reliability.
5. **[#57656](https://github.com/anomalyco/opencode/issues/57656) [OPEN] Shell tool description names the backend shell, so models call a non-existent `bash` tool** — Models burn a wasted tool call every time because the description misleads them about the registered tool name (`shell`). Cheap fix, measurable token/latency cost today.
6. **[#56907](https://github.com/anomalyco/opencode/issues/56907) [OPEN] [reproduced] Permission prompt hangs when viewing a subagent** — Opening a subagent session hides its permission prompt, and auto-accept reads the same empty list, leaving subagents permanently blocked. Reproduced by the team; a core multi-agent workflow blocker.
7. **[#58176](https://github.com/anomalyco/opencode/issues/58176) [OPEN] [reproduced] Session titles never generated in v2** — V2 leaves `title = NULL` while v1.18.x auto-titled identical setups, with a secondary free-tier rejection component. A visible v1→v2 regression affecting every new session.
8. **[#58157](https://github.com/anomalyco/opencode/issues/58157) [OPEN] deb ships chrome-sandbox without setuid bit, so in-app updates always fail with pkexec 127** — Packaging bug that bricks auto-update on Ubuntu 24+ AppArmor systems. Paired with [#58309](https://github.com/anomalyco/opencode/issues/58309) (Windows cross-volume EBUSY), desktop update reliability is the day's dominant platform theme.
9. **[#51868](https://github.com/anomalyco/opencode/issues/51868) [OPEN] zh locale has unreviewed machine-translation errors** — "壳牌" (Shell, the oil company) used for the shell tool, plus 93 missing keys falling back to English. Symptomatic of unreviewed i18n catalogs shipping to desktop users.
10. **[#58303](https://github.com/anomalyco/opencode/issues/58303) [OPEN] [triaging] Web session delete never reaches the session store** — Deleted sessions remain listed and re-deleting returns 404 while the row persists. A data-integrity issue in the web app beta that undermines trust in session management.

## 4. Key PR Progress

1. **[#58313](https://github.com/anomalyco/opencode/pull/58313) fix(core): ignore a compaction buffer that leaves the model no room** — Guards against `compaction.buffer` exceeding a smaller model's window, which previously forced auto-compaction on every step.
2. **[#58301](https://github.com/anomalyco/opencode/pull/58301) fix(core): notify sessions after shell location teardown** — Directly addresses the background-shell eviction cluster (#56804, #58050), restoring completion notifications after location teardown.
3. **[#58300](https://github.com/anomalyco/opencode/pull/58300) fix(cli): isolate background service per config profile** — Replaces the single per-user `service.json` with profile-scoped state so switching profiles no longer collides on one managed service.
4. **[#58310](https://github.com/anomalyco/opencode/pull/58310) fix(cli): retain Windows binaries across volumes** — Fixes EXDEV/EBUSY update failures when npm package and cache live on different drives (closes #58309).
5. **[#58293](https://github.com/anomalyco/opencode/pull/58293) fix(desktop): keep chrome-sandbox setuid in Linux packages** — Corrects the 0755 permissions that broke Chromium sandboxing and auto-update on AppArmor-confined distros.
6. **[#58305](https://github.com/anomalyco/opencode/pull/58305) fix(app): show MCP elicitation forms in desktop and web** — Extends TUI elicitation support to desktop/web, unblocking MCP tool calls that require mid-call user input.
7. **[#58311](https://github.com/anomalyco/opencode/pull/58311) feat(desktop): add native memory breakdown to heap captures** — Captures Chromium per-process/allocator dumps, closing the gap where 1,186 MB of window memory showed as ~300 MB of heap.
8. **[#58308](https://github.com/anomalyco/opencode/pull/58308) feat(app): add a timeline width setting** — Brings line length from ~105 chars down to a research-backed ~66 for readability.
9. **[#58307](https://github.com/anomalyco/opencode/pull/58307) feat(app): show the web sources a reply used (experiment)** — Adds an "N sources" chip and a Sources side panel listing queries and opened pages in execution order.
10. **[#58306](https://github.com/anomalyco/opencode/pull/58306) fix(desktop): keep New Session enabled outside sessions** — Partially resolves the greyed-out File menu on Linux (#58188); the Open Project half remains open.

## 5. Hot Discussions

No Discussion data was provided for this period.

## 6. Feature Request Trends

- **UI readability & polish:** configurable timeline width ([#58308](https://github.com/anomalyco/opencode/pull/58308)), live todo progress bars during `in_progress` rather than only on completion ([#58304](https://github.com/anomalyco/opencode/issues/58304)), and accumulating `/highlights` across skipped releases instead of only the newest ([#56432](https://github.com/anomalyco/opencode/issues/56432)).
- **Editor/workflow ergonomics:** `/editor` opening the current working directory ([#44474](https://github.com/anomalyco/opencode/issues/44474)), project icon styles ([#58298](https://github.com/anomalyco/opencode/pull/58298)), and a V2 docs-alignment sweep ([#58290](https://github.com/anomalyco/opencode/pull/58290), [#58280](https://github.com/anomalyco/opencode/pull/58280), [#58296](https://github.com/anomalyco/opencode/pull/58296)).
- **Observability:** web-source provenance for replies ([#58307](https://github.com/anomalyco/opencode/pull/58307)) and richer heap/memory diagnostics ([#58311](https://github.com/anomalyco/opencode/pull/58311)).
- **Experimental voice:** desktop voice calls via Console broker ([#58249](https://github.com/anomalyco/opencode/pull/58249)), behind an experiments flag.

## 7. Developer Pain Points

- **Shell lifecycle vs. idle eviction** (#51828, #58050, #58049): background shells are killed, output deleted, and completion notifications dropped when a location is evicted — a top complaint with a matching fix in flight ([#58301](https://github.com/anomalyco/opencode/pull/58301)).
- **Permission model inconsistencies** (#52083, #56907): compound-command scanning drops redirection targets, and subagent permission prompts hang. Both erode confidence in the permission layer as a safety boundary.
- **Retry/backoff fragility** (#58128): hardcoded 10-try/10s caps abort long agent runs on transient upstream errors; community wants persistent, configurable retry.
- **Desktop packaging and updates** (#58157, #58309, #58188): setuid bits missing in debs, cross-volume Windows update failures, and greyed-out menu items make desktop a recurring platform-engineering tax.
- **Free-tier abuse and quota confusion** (#34344, #58302, #58314): IP-keyed limits are trivially bypassed, yet legitimate users report premature quota exhaustion and paid-workspace lockouts with slow support response.
- **v2 regressions and stale docs** (#58176, #51868, #56574): auto-titling lost, unreviewed zh translations, and doc/API mismatches (`continue` vs `resume`) signal v2 migration rough edges.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-10-23

## 1. Today's Highlights

No new releases shipped in the last 24 hours, but the issue tracker is highly active (35 issues touched, 28 PRs updated) with a clear cluster of fixes landing around HTML export robustness, macOS process termination, and fuzzy search quality. A recurring theme across both issues and PRs: extension/plugin developers need more stable APIs (message identity, tool presentation, provider lifecycle), and several long-standing UX complaints (Ctrl+C wiping prompts, `/reload` not refreshing `AGENTS.md`) are finally getting closed or fixed.

## 2. Releases

No new releases in the last 24 hours.

## 3. Hot Issues

1. **[#7739](https://github.com/earendil-works/pi/issues/7739) — Set a startup-time budget targeting jcode-comparable latency and memory** (OPEN, 11 comments, updated today). The most-discussed issue of the day: a direct benchmark comparison against `jcode 0.9.1888-dev` on startup latency and memory for interactive PTY launches. High engagement suggests startup performance is a competitive concern. No upvotes yet, but the comment volume signals active maintainer/user debate.

2. **[#6167](https://github.com/earendil-works/pi/issues/6167) — `transformMessages` + model-switch thinking-block normalization vs. `requiresReasoningContentOnAssistantMessages`** (CLOSED, 10 comments). A subtle interoperability bug: when users switch models, thinking content gets inlined in a way that conflicts with provider compatibility flags. Now closed, likely fixed via PR — worth watching for anyone building on the message transform pipeline.

3. **[#10259](https://github.com/earendil-works/pi/issues/10259) — Public tool-presentation API or built-in one-line tool mode** (OPEN, 5 comments, 2 👍). Requests a display-only API so extensions can control presentation of *all* tool rows (built-ins, MCP, codemode, custom). The community clearly wants richer TUI control without forking core rendering. One of the few issues with upvotes.

4. **[#11223](https://github.com/earendil-works/pi/issues/11223) — `modelOverrides` silently ignored for classifier models** (OPEN, 5 comments). Documentation contradicts behavior: overrides work for "built-in or extension-provided" models, but classifier models are silently skipped — no error, no warning. Classic silent-failure config bug; high annoyance potential.

5. **[#11250](https://github.com/earendil-works/pi/issues/11250) / [#11251](https://github.com/earendil-works/pi/issues/11251) — Strip whole-line HTML comments from context files to match Claude Code** (CLOSED as `no-action`, 4 + 2 comments). A user's `CLAUDE.md` AVOID-list maintainer notes were being sent verbatim to the model. Duplicate filings (issue + feature request) and closure as no-action indicate the maintainers decided against diverging behavior. Notable for context-file compatibility debates.

6. **[#11282](https://github.com/earendil-works/pi/issues/11282) — Webpage lacks macOS/brew install instructions; repo not public** (CLOSED `no-action`, 4 comments). Docs/install friction: Homebrew install exists but isn't documented, and the corresponding repository isn't publicly visible. Small but emblematic of onboarding gaps.

7. **[#11090](https://github.com/earendil-works/pi/issues/11090) — Preserve model attribution for auxiliary token usage** (OPEN, 3 comments, updated today). Requests per-call usage records for model-tool calls, compaction, and branch summaries so extensions (e.g., token-accounting exporters) can report accurate per-model totals. Matters for cost observability and multi-model workflows.

8. **[#11220](https://github.com/earendil-works/pi/issues/11220) — Improve fuzzy search** (CLOSED, 3 comments). Typing `opus` in `/model` ranks Sonnet models above Opus; `/resume` results are similarly weak. Multiple PRs ([#11296](https://github.com/earendil-works/pi/pull/11296), [#11145](https://github.com/earendil-works/pi/pull/11145)) addressed it the same day.

9. **[#11172](https://github.com/earendil-works/pi/issues/11172) — Split mouse report leaves its tail in the prompt** (OPEN, 2 comments, updated today). Escape-timeout flushes half an escape sequence, and the editor types the remainder as literal text. A precise, well-reproduced TUI input-handling bug with a local repro using the shipped `StdinBuffer`/`Editor`.

10. **[#11253](https://github.com/earendil-works/pi/issues/11253) — `forkFrom` copies sessions one `appendFileSync` per entry** (OPEN, `fix-available`, 2 comments). Forking a 73 MB / 3,322-entry session took >30 s due to per-entry open/close; hosts timed out the RPC handshake. Fix already in flight ([#11288](https://github.com/earendil-works/pi/pull/11288)). A real production-scaling pain point.

*Also notable but just outside the top 10:* [#11291](https://github.com/earendil-works/pi/issues/11291)/[#11292](https://github.com/earendil-works/pi/issues/11292) (`/reload` doesn't re-read `AGENTS.md`, 2 comments each, one upvote), [#11287](https://github.com/earendil-works/pi/issues/11287) (extension API providers wiped by mid-session settings reload → uncaughtException crash), [#9190](https://github.com/earendil-works/pi/issues/9190) (Ctrl+C clears a 60-row prompt with no confirmation), and [#11225](https://github.com/earendil-works/pi/issues/11225) (stack overflow in `sortChildren` blanks HTML exports on long sessions).

## 4. Key PR Progress

1. **[#11304](https://github.com/earendil-works/pi/pull/11304) — Start when a configured package fails to install** (OPEN, today). Failed package installs no longer abort startup; each source records failure, skips it like offline mode, and surfaces a warning. Directly improves resilience for extension-heavy setups.

2. **[#11288](https://github.com/earendil-works/pi/pull/11288) — Write forked session through one fd** (OPEN). Fixes [#11253](https://github.com/earendil-works/pi/issues/11253): replaces the 3,000× open/close pattern in `forkFrom` with a single file descriptor. Big latency win on large sessions/remote filesystems.

3. **[#11296](https://github.com/earendil-works/pi/pull/11296) — Rank contiguous fuzzy matches and search session fields separately** (CLOSED). Closes [#11220](https://github.com/earendil-works/pi/issues/11220) and addresses [#10552](https://github.com/earendil-works/pi/issues/10552), [#10065](https://github.com/earendil-works/pi/issues/10065), [#11024](https://github.com/earendil-works/pi/issues/11024). Replaces greedy leftmost matching with contiguous-match ranking — the fix behind today's fuzzy-search complaints.

4. **[#11293](https://github.com/earendil-works/pi/pull/11293) (and [#11275](https://github.com/earendil-works/pi/pull/11275), [#11274](https://github.com/earendil-works/pi/pull/11274), [#6843](https://github.com/earendil-works/pi/pull/6843)) — Render HTML exports iteratively** (CLOSED). Replaces recursive `sortChildren`/`mapNodes`/`markActive` walks with explicit stacks, fixing blank exports on ~6k+ entry sessions ([#11225](https://github.com/earendil-works/pi/issues/11225)). Notably, four separate PRs converged on the same fix — a sign of community responsiveness and some coordination overhead.

5. **[#11290](https://github.com/earendil-works/pi/pull/11290) — Render system messages in HTML export** (CLOSED). Closes [#11261](https://github.com/earendil-works/pi/issues/11261): the initial prompt and mid-session section updates now appear in exports; also fixes `CLI --export` prompt/tool display ([#3464](https://github.com/earendil-works/pi/issues/3464)).

6. **[#11289](https://github.com/earendil-works/pi/pull/11289) — Stop macOS shell groups before killing them** (CLOSED). Closes [#11252](https://github.com/earendil-works/pi/issues/11252): reduces the race where an aborted command's shell outlives its foreground child and runs the next command in `a; b`. Linux/Windows termination untouched.

7. **[#11299](https://github.com/earendil-works/pi/pull/11299) / [#11300](https://github.com/earendil-works/pi/issues/11300) — Fix `thinkingLevelMap?.off` type guard and spurious `max_completion_tokens`** (CLOSED). Fixes HTTP 400s on OpenRouter reasoning models (e.g., `dots-studio/dots-3-note-preview:free`) that lack a `thinkingLevelMap`, when invoked via `--model`.

8. **[#11257](https://github.com/earendil-works/pi/pull/11257) — Preserve `pi.exec` spawn errors** (CLOSED). Fixes [#11085](https://github.com/earendil-works/pi/issues/11085): spawn failures (e.g., missing executable) now return the error as `stderr` instead of being swallowed, with a regression test.

9. **[#11278](https://github.com/earendil-works/pi/pull/11278) — Preserve `ctx.ui` getters through `wrapUIPromptContext`** (CLOSED). Object spread resolved `get theme()` at bind time, breaking hosts that bind the extension UI context before initializing the global theme. A subtle but impactful bug for extension authors.

10. **[#7952](https://github.com/earendil-works/pi/pull/7952) — Add `messageId` and `timestamp` to markdown transformer context** (CLOSED). Closes [#7828](https://github.com/earendil-works/pi/issues/7828): extensions can now decorate per-message content. Directly relevant to the tool-presentation and per-message-footer requests ([#10259](https://github.com/earendil-works/pi/issues/10259), [#11303](https://github.com/earendil-works/pi/issues/11303)).

*Other closed/updated PRs of note:* [#9301](https://github.com/earendil-works/pi/pull/9301) (device-code browser/clipboard confirmation, fixes [#9282](https://github.com/earendil-works/pi/issues/9282)), [#11270](https://github.com/earendil-works/pi/pull/11270) (drop `--min-release-age=0` that broke security-scanner-blocked installer updates), [#11231](https://github.com/earendil-works/pi/pull/11231) (add Windows installer tab to Quickstart), [#11145](https://github.com/earendil-works/pi/pull/11145) (preserve scoped model order in fuzzy scoring), and long-running [#10528](https://github.com/earendil-works/pi/pull/10528) (Nix packaging refactor).

## 5. Hot Discussions

No GitHub Discussions data was provided in the source dataset. This section is omitted.

## 6. Feature Request Trends

- **Extension/API surface expansion (dominant theme):** A public tool-presentation API for all tool rows ([#10259](https://github.com/earendil-works/pi/issues/10259)); per-message assistant footer API ([#11303](https://github.com/earendil-works/pi/issues/11303)); message identity in markdown transformer context ([#7828](https://github.com/earendil-works/pi/issues/7828), shipped via [#7952](https://github.com/earendil-works/pi/pull/7952)); durable MCP extension for Harness hosts ([#10837](https://github.com/earendil-works/pi/issues/10837)) — frameworks want to *extend* Pi, not fork it.
- **Per-model / per-provider observability and control:** Auxiliary token usage attribution ([#11090](https://github.com/earendil-works/pi/issues/11090)); provider-scoped auto-compaction with absolute token thresholds ([#11295](https://github.com/earendil-works/pi/issues/11295)); configuring the idle cache-warming horizon ([#11127](https://github.com/earendil-works/pi/issues/11127)). Users want cost/latency knobs that scale beyond exact model ID enumeration.
- **Skill invocation ergonomics:** Inline slash/skill autocomplete anywhere in a prompt ([#11294](https://github.com/earendil-works/pi/issues/11294), [#11302](https://github.com/earendil-works/pi/issues/11302)) — two independent filings for the same feature in one day.
- **Session/context lifecycle control:** `/reload` should re-read `AGENTS.md` ([#11291](https://github.com/earendil-works/pi/issues/11291), [#11292](https://github.com/earendil-works/pi/issues/11292)); preserving Claude Code-compatible context-file semantics ([#11250](https://github.com/earendil-works/pi/issues/11250)); per-package overrides of native tool exposure in `settings.json` ([#11286](https://github.com/earendil-works/pi/issues/11286), with a preference for "deferred by default").
- **Onboarding:** Custom OpenAI-compatible endpoints from `/login` ([#11298](https://github.com/earendil-works/pi/issues/11298)) and better Windows/brew install docs ([#11282](https://github.com/earendil-works/pi/issues/11282), [#11231](https://github.com/earendil-works/pi/pull/11231)).

## 7. Developer Pain Points

- **Silent failures and swallowed errors are the single biggest frustration.** `modelOverrides` ignored for classifiers with no warning ([#11223](https://github.com/earendil-works/pi/issues/11223)); `pi.exec` spawn errors lost before the fix ([#11257](https://github.com/earendil-works/pi/pull/11257), [#11085](https://github.com/earendil-works/pi/issues/11085)); extension-provided API providers wiped by a mid-session settings reload, causing an uncaughtException *and process exit* ([#11287](https://github.com/earendil-works/pi/issues/11287)).
- **Everything breaks at scale.** HTML export stack-overflows on long sessions ([#11225](https://github.com/earendil-works/pi/issues/11225)); `forkFrom` takes >30 s on a 73 MB session ([#11253](https://github.com/earendil-works/pi/issues/11253)) — both fixed today, but both indicate memory/streaming assumptions that don't hold for real-world sessions.
- **Terminal/TUI lifecycle edge cases:** Ctrl+C wiping a 60-row prompt with no confirmation ([#9190](https://github.com/earendil-works/pi/issues/9190)); split mouse reports leaking escape-sequence tails into the prompt ([#11172](https://github.com/earendil-works/pi/issues/11172)); macOS abort race running the next command in `a; b` ([#11252](https://github.com/earendil-works/pi/issues/11252)).
- **Stale session state vs. live file edits:** `/reload` doesn't pick up `AGENTS.md` changes, forcing new sessions ([#11291](https://github.com/earendil-works/pi/issues/11291), [#11292](https://github.com/earendil-works/pi/issues/11292)).
- **Startup performance as a competitive axis:** the jcode latency/memory benchmark discussion ([#7739](https://github.com/earendil-works/pi/issues/7739)) has the highest comment count today, and community patches are prioritizing fast startup ([#11304](https://github.com/earendil-works/pi/pull/11304), [#11242](https://github.com/earendil-works/pi/issues/11242)).

---

*Digest generated from github.com/earendil-works/pi — 2026-10-23. All links point to the earendil-works/pi repository on GitHub.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-10-23

## 1. Today's Highlights

Activity this cycle centers on **session management and Web Shell UX**, with several P1/P2 fixes landing around session listing, drafts, and sidebar behavior. A **new P1 bug** reports that Qwen Code 0.26.0 silently drops tool results in roughly 1 in 30–40 calls (#15297), which could affect reliability for agentic workflows. Meanwhile, CI stability remains a recurring theme, as multiple PRs attempt to scope the `sdk-java` host lock to reduce flakiness on shared runners.

## 2. Releases

**v0.26.0-nightly.20261022.bf66a26c97** was published.

- `feat(serve)`: add daemon token persistence ([#15023](https://github.com/QwenLM/qwen-code/pull/15023)) — tokens survive daemon restarts.
- `fix(release)`: cover every spawned vendored binary — ensures all vendored binaries are included in release artifacts.

## 3. Hot Issues

1. **[#15297](https://github.com/QwenLM/qwen-code/issues/15297) — P1: 0.26.0 silently drops ~1/40 tool outputs (28 confirmed).** The tool executes successfully but no `functionResponse` reaches the model, forcing re-reads. Highest-severity reliability bug this cycle; still `need-information`.
2. **[#15248](https://github.com/QwenLM/qwen-code/issues/15248) — sdk-java runtime broker tests flake 3/3 on GitHub-hosted runners.** Blocks fork-PR fast lane; discrepancy between hosted (Azure) and self-hosted ECS runners is the root suspect.
3. **[#13787](https://github.com/QwenLM/qwen-code/issues/13787) — XML recovery repeats prefix scans on large multi-call responses.** Performance regression in tool-call recovery; a direct-parser repro is attached.
4. **[#15077](https://github.com/QwenLM/qwen-code/issues/15077) — CLOSED: Managed Agent archived-session listing + title search.** Session listing now supports an archive filter and title search — user-visible improvement.
5. **[#15299](https://github.com/QwenLM/qwen-code/issues/15299) / [#15302](https://github.com/QwenLM/qwen-code/issues/15302) — Allow configuring trusted hosts for `web_search` on DashScope-compatible gateways.** Two related requests for explicit opt-in hosts for custom HTTPS endpoints.
6. **[#14988](https://github.com/QwenLM/qwen-code/issues/14988) — Standardize Web Shell terminology on Workspace / Session.** Follows a recorded meeting conclusion to align with DSH naming.
7. **[#15304](https://github.com/QwenLM/qwen-code/issues/15304) — New standalone session appears in sidebar only after first turn completes.** Visible UX gap in the No-workspace sessions list.
8. **[#13010](https://github.com/QwenLM/qwen-code/issues/13010) — CLOSED: Unpaired surrogate Shell argument handling.** Follow-up to a PR review round; a lone UTF-16 surrogate blocked the Managed Session.
9. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724) — Main CI failing: Managed Agent gate (`HostedAutomationSpringCrashIT`).** Auto-filed by the dev bot; `autofix/skip` indicates known flakiness rather than a production defect.
10. **[#15301](https://github.com/QwenLM/qwen-code/issues/15301) — Deferred follow-ups from PR #15246 (retain legacy catalog snapshots).** Reviewer suggestions that did not demonstrate a production defect.

## 4. Key PR Progress

1. **[#15273](https://github.com/QwenLM/qwen-code/pull/15273) — `feat(mods)`: skip unsupported Claude Code hooks instead of failing init.** Improves Mod compatibility and runtime resilience.
2. **[#15270](https://github.com/QwenLM/qwen-code/pull/15270) — Docs: Claude Code compatibility baseline (EN + ZH).** Formalizes the compatibility contract for the experimental Mod runtime.
3. **[#15254](https://github.com/QwenLM/qwen-code/pull/15254) / [#15284](https://github.com/QwenLM/qwen-code/pull/15284) / [#15289](https://github.com/QwenLM/qwen-code/pull/15289) — sdk-java CI: run suite outside the host lock, scope lock to cache write-back.** Three converging attempts to remove hosted-runner flake.
4. **[#15256](https://github.com/QwenLM/qwen-code/pull/15256) — Reuse open workflow-failure issues in CI reporting.** Reduces issue spam and preserves history via hidden markers.
5. **[#13579](https://github.com/QwenLM/qwen-code/pull/13579) — `fix(core)`: recover outer XML calls with quoted call content.** Complements #13787; keeps quoted markup inert so malformed envelopes don't drop valid calls.
6. **[#15303](https://github.com/QwenLM/qwen-code/pull/15303) / [#15300](https://github.com/QwenLM/qwen-code/pull/15300) — Web Shell: preserve draft attachments; prevent artifact card overlap.** Follow-ups to merged #15025 plus a narrow-screen layout fix.
7. **[#15261](https://github.com/QwenLM/qwen-code/pull/15261) — `feat(runtime-broker)`: HTTP-backed external scratch workers.** Opt-in `external-scratch` provider with deterministic request handles and retry.
8. **[#15211](https://github.com/QwenLM/qwen-code/pull/15211) — `feat(serve)`: scheduled-task gate through daemon and Web Shell.** PR 1b in the scheduled-task gate design; builds on #15069.
9. **[#15228](https://github.com/QwenLM/qwen-code/pull/15228) — Harden `qwen serve` token resolution against project `.env` injection.** Token accepted only from operator-controlled sources.
10. **[#14959](https://github.com/QwenLM/qwen-code/pull/14959) — CLOSED: ship private Bun while preserving interpreter boundaries.** OpenTUI sessions work from npm/npx installs without a global Bun.

## 5. Hot Discussions

No Discussion data was provided for this cycle.

## 6. Feature Request Trends

- **Session management maturity**: archive filtering, title search (#15077), terminology standardization (#14988), and sidebar visibility (#15304) point to a push toward production-grade Managed Agent UX.
- **`web_search` configurability**: explicit trusted-host opt-in for DashScope-compatible custom gateways (#15299, #15302) is the most duplicated request theme.
- **Runtime extensibility**: external scratch workers (#15261), probe-gated automations (#15218), and Claude Code hook compatibility (#15273, #15270) show continued investment in pluggable runtimes and Mods.
- **CI ergonomics for contributors**: fork-PR fast lane and hosted-runner behavior (#15248, #15256, #15254) are treated as first-class feature work.

## 7. Developer Pain Points

- **Reliability of tool-call plumbing**: the P1 dropped-tool-output bug (#15297) and the XML recovery performance issue (#13787) both stem from tool-call serialization/recovery paths.
- **CI flakiness on hosted runners**: repeated attempts to fix `sdk-java` timing tests (#15248, #15254, #15284, #15289) suggest the host-lock design is a structural bottleneck.
- **Environment inconsistency**: the explicit warning in #15297 that edits apply but results are lost on Windows implies platform-specific gaps remain.
- **Token/security hardening fatigue**: #15228 indicates project-level `.env` was an implicit trust boundary that developers must now work around.
- **Terminology drift**: #14988 and #15304 reflect friction from inconsistent naming and delayed UI state, both low-severity but high-visibility for daily users.

</details>