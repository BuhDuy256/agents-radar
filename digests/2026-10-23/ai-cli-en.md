# AI CLI Tools Community Digest 2026-10-23

> Generated: 2026-10-23 04:29 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Ecosystem
**2026-10-23 Community Digests**

---

## 1. Ecosystem Overview

The AI CLI tooling landscape is now a six-way race (Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, plus Qwen Code) with visible **convergence on safety and governance** but persistent **divergence in architecture and audience**. Every tracked project is iterating on a nightly/alpha cadence, with patch releases dominated by sandbox-boundary fixes, permission-model hardening, and credential/token lifecycle correctness rather than headline features. The dominant community frustration across the board is no longer raw capability — it is **trust**: whether "approved" means "contained," whether reported success reflects reality, and whether quotas/limits are transparent and attributable. Meanwhile, desktop surfaces are emerging as the fastest-growing and most regression-prone channel, and extensibility (plugins, hooks, MCP) has become the primary axis of product differentiation.

---

## 2. Activity Comparison (2026-10-23 snapshot)

| Tool | Issues (updated today) | PRs (updated today) | Discussions | Release status |
|---|---|---|---|---|
| **Claude Code** | 10 hot + hon. mentions (large tracker; duplicate clusters) | 7 (all from 1 contributor, all CLOSED/engine-gated) | N/A (not provided) | v2.1.308, v2.1.309 (patch) |
| **OpenAI Codex** | 10 hot (incl. 3-issue capacity cluster) | 10 (infra/config/hooks focus) | Yes: 2 Ideas, 2 Q&A, 7 Show&tell | 3× `rust-v0.164.0-alpha` builds |
| **Gemini CLI** | 10 hot (agent reliability dominant) | 10 (settings/sandbox/security) | N/A (not provided) | v0.67.0-nightly |
| **GitHub Copilot CLI** | 10 hot + notes (**36 updated in 24h**) | **0** (none updated) | N/A (not provided) | v1.0.103 |
| **OpenCode** | 10 hot (sandbox/permissions dominant) | 10 (auth, MCP, correctness) | N/A (not provided) | v1.19.4 (security-only Bun bump) |
| **Pi** | 10 hot (perf/UX dominant) | 10 (+ hon. mentions) | Yes: 2 Show&tell | **None** |
| **Qwen Code** | 10 hot (serve/Web Shell + P1 bugs) | 10 (serve/web-shell hardening) | N/A (not provided) | v0.26.0-nightly |

**Notes:**
- Copilot CLI had the highest issue throughput today (36 updated) but **zero PR activity** — a concern for a v1.x product.
- Pi and Qwen Code did not ship a stable release in the window; both are on nightly/feature-branch tracks.
- Discussions are only reliably populated for Codex and Pi; the absence elsewhere reflects **reporting-channel configuration**, not community inactivity (marked N/A above).

---

## 3. Shared Feature Directions

| Direction | Tools | Specific Needs |
|---|---|---|
| **Sandbox / permission hardening** | Claude Code, OpenCode, Copilot CLI, Gemini CLI, Qwen Code | Claude Code closed pre-command shell-startup escapes and symlink `denyWrite` bypasses; OpenCode has live bypass bugs (#50652, #52083); Copilot CLI's trusted-folders auto-approval (#5232); Gemini's shell-wrapper bypass (#29688). Universal theme: **"allowed" must equal "contained."** |
| **Credential & token lifecycle** | Copilot CLI, Codex, Gemini CLI, OpenCode | MCP OAuth refresh failures (Copilot #5229/#5233), token-refresh races across processes (Codex #24663), atomic keychain writes (Gemini #29765), timing-safe password comparison (OpenCode #58337). |
| **Extensibility & plugin governance** | Claude Code, Pi, Codex, OpenCode, Qwen Code | Claude's "Mods" (#91870) + sec-default stack; Pi's public tool-presentation API (#10259); Codex's per-environment hooks (#56304); OpenCode's hook source exposure (#58332). |
| **Usage / quota observability** | Claude Code, Codex, OpenCode, Pi | Context-window regression (Claude #102094 + 5 duplicates), headless 1.8× quota burn (Claude #97074), reset automation (Codex #32586), unified usage dashboard (OpenCode #57975). |
| **False-success / honest status reporting** | Gemini CLI, Qwen Code, Claude Code | Gemini subagents reporting `GOAL` after `MAX_TURNS` (#22323, #21983); Qwen silent tool-result drops (#15297); Claude agent over-scoping (#97641, #104341). |
| **Cross-device / multi-identity** | Codex, Claude Code, Copilot CLI | Codex thread sync across devices (#14067, 69👍) + iOS writer locks; Claude multi-Connector-account auth (#27302, top-engagement issue). |
| **Windows correctness debt** | Claude Code, Codex, Copilot CLI, Qwen Code, Pi | Drive-letter canonicalization (Claude #75855), runaway Node/MXC helpers (Codex #51649/#42484), locked `node.exe` updater (Qwen #15276), symbol leaks under CPU load (Pi #11086, p0). |

---

## 4. Differentiation Analysis

**Focus axis:**
- **Claude Code** — Enterprise-grade governance. The `sec-default` PR stack makes "org policy always overrides personal plugin intent" an explicit architectural principle. Target: teams/enterprise buyers. Highest-engagement issue is multi-account Connector auth, i.e. organizational identity.
- **OpenAI Codex** — Infrastructure & managed configuration. Today's PR batch (config servers, environment-scoped hooks, rollout tracing, decoupled ChatGPT auth) points to a **pluggable-enterprise-control-plane** strategy. BYOK + managed config loader is a direct enterprise tell.
- **Gemini CLI** — Agent-loop correctness and AST-aware tooling. EPICs for AST-grep reads (#22745-#22747) and persistent file-based task state signal an investment in **token efficiency and long-horizon reliability** rather than surface features.
- **GitHub Copilot CLI** — Faithful IDE/AGENTS integration with an IDE-driven release cadence. v1.0.103's code-block copy and ACP sandbox flags show a **polish-over-features** posture, but the MCP/OAuth cluster is eroding the value.
- **OpenCode** — Community-governed, model-agnostic. Bundled-Bun security bump, Brave web search, Mistral ID fixes indicate a **low-friction, multi-provider** positioning. Permissions are its loudest unresolved gap.
- **Pi (earendil-works)** — Performance-native TUI. Startup-budget comparisons to jcode, incremental render work, HTML export scalability. Target: **heavy interactive users** running 800+ message sessions.
- **Qwen Code** — `serve`/daemon-first architecture for **Managed Agent** hosted deployments, with a fast-maturing Web Shell UI. Distinguishing accent: strong CI/hosted-runner focus and Chinese-market Windows ergonomics (#15310).

**Technical approach:** Where Claude/Codex/Copilot are **closed-vendor, policy-heavy** implementations with published release pipelines, OpenCode/Pi/Qwen lean on **extension-first architecture** and community PR throughput. The security posture differs sharply: Claude and Codex push *organizational* controls; OpenCode and Pi are still building *user-level* sandboxing.

---

## 5. Community Momentum & Maturity

**Rapid iteration (shipping daily):**
- **OpenAI Codex** — Three alpha builds + ~10 infra PRs/day is the fastest release train in the set.
- **Qwen Code** — Nightly with a coherent `serve`/Managed Agent roadmap and dense Web Shell UX feedback.
- **Gemini CLI** — Nightly with steady P1-fix throughput; strong maintainer responsiveness (e.g., #29762 merged same cycle as reported).

**Highest community engagement intensity:**
- **Copilot CLI** — 36 issues updated in 24h, but **zero PR activity** and recurring regression fatigue (stable-channel demand, #5203). Signal: high user base, strained maintainer throughput.
- **Claude Code** — Highest per-thread engagement (278 comments on #27302; 424👍), but tracker health degrades from **duplicate clusters** (5+ near-identical context-window issues) and is artificially inflated by the broken `/feedback` 403 (#55348).

**Most community-driven (extensibility gravity):**
- **OpenCode** and **Pi** — Both show dense **plugin-author** participation; Pi's "fix-available"-labeled issues and rapid HTML-export fix merges demonstrate healthy contributor↔maintainer loops.

**Maturity assessment:**
| Tool | Maturity signal |
|---|---|
| Claude Code | Most mature policy model; least mature community hygiene (duplicates, broken feedback). |
| Codex | Most mature **release engineering**; least mature Windows/platform parity. |
| Gemini CLI | Most mature **agent-correctness research pipeline** (AST, persistent state). |
| Copilot CLI | Most mature **IDE integration**; least mature **auth lifecycle**. |
| OpenCode | Most mature **plugin surface**; least mature **sandbox confinement**. |
| Pi | Most mature **TUI performance** culture; least mature **release cadence**. |
| Qwen Code | Most mature **daemon/serve** vision; least mature **stable-channel** discipline. |

---

## 6. Trend Signals

**For product & platform teams:**
1. **Governance is the new feature war.** Across three tools (Claude, Codex, Copilot), the security conversation has shifted from *whether* the agent can do X to *whose policy wins when org and user disagree*. Any enterprise AI CLI RFP in 2027 should ask: *"Can a personal plugin loosen an org deny rule?"* — today, only Claude has an explicit answer (no).
2. **MCP auth is the ecosystem's weakest link.** Four of seven tools show credential-lifecycle bugs (Copilot most acute). MCP's promise is undermined by OAuth refresh handling, token caching, and headless-mode flows. **Whoever ships a reference MCP auth SDK first earns the integration ecosystem.**
3. **Honest agent telemetry is becoming a baseline expectation.** False `GOAL`, silent tool-drop, capacity misreports — users are no longer forgiving of status semantics that are approximate. Tools that surface *why* an action stopped will differentiate.
4. **Windows remains the industry's correctness tax.** Five of seven tools report Windows-specific regressions today. Cross-platform parity should be treated as a **first-class engineering workstream**, not a bug queue.

**For developers integrating these tools:**
5. **Budget for headless-mode cost surprises.** Claude Code's 1.8× per-token quota burn in `claude -p` (#97074) is a concrete cautionary datapoint for CI pipelines; validate attribution before scaling automation.
6. **Prefer tools whose permission model you can *reason about*.** Copilot CLI's trusted-folders path gating (#5232) and OpenCode's plugin permission bypass (#50652) both illustrate that path-based or advisory-only permissions are insufficient for unsupervised runs. Claude and Codex are ahead on structural enforcement.
7. **Watch the extensibility API race.** Pi (#10259), Claude (#91870/#104458), Codex (#56304), and OpenCode (#58332) are all shipping incompatible hook/plugin APIs. Lock-in risk in `AGENTS.md`-adjacent extension code is rising; **keep extension logic thin and the underlying interface versioned.**
8. **Discussions-as-primary-channel is a viable model.** Pi and Codex demonstrate that a curated Discussions surface yields cleaner signal (e.g., #14067's 69👍 cross-device sync) than an issue tracker burdened by duplicates. Teams choosing a community channel should consider Discussions-first for feature discovery, Issues for defects only.

**Bottom line:** The 2026-10-23 snapshot shows a market that has moved past *can it work* into *can I trust it at scale*. The winners in the next 2–3 quarters will likely be determined less by benchmark performance and more by **governance clarity, credential reliability, and honest observability** — with Windows parity as the unglamorous tiebreaker.

---
*Compiled from 2026-10-23 community digests for github.com/{anthropics/claude-code, openai/codex, google-gemini/gemini-cli, github/copilot-cli, anomalyco/opencode, earendil-works/pi, QwenLM/qwen-code}. "N/A" denotes report channel not present in the source payload, not community inactivity.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report

*Data as of 2026-10-23 · Source: github.com/anthropics/skills*

---

## 1. Top Skills Ranking

The repository exposes comment counts as `undefined` for all PRs, so ranking below is based on cross-signal attention (updates, issue cross-references, recurring author activity, and cross-linking Issues). All listed PRs remain **OPEN** — none are merged.

| # | PR | Skill / Scope | What It Does | Discussion Highlights | Status |
|---|----|---------------|--------------|----------------------|--------|
| 1 | [#1742](https://github.com/anthropics/skills/pull/1742) | `mcp-builder` fix | Adapts `connections.py` to `mcp>=2.0.0` (`streamable_http_client` rename, custom headers via `create_mcp_http_client`). | Directly fixes Issue #1668; ties into the broader MCP-builder breakage cluster (#1390). | OPEN (updated 2026-10-08) |
| 2 | [#1298](https://github.com/anthropics/skills/pull/1298) | `skill-creator` fix | Isolates trigger evals, fixes Windows subprocess `select()` failures and runtime-error misclassification. | Mirrors Issue #1383 (silent benchmark failures, Windows trigger evals). | OPEN (updated 2026-09-16) |
| 3 | [#1245](https://github.com/anthropics/skills/pull/1245) | `notion-spec-to-implementation` + `quantitative-resume-auditor` | Converts product/tech specs into Notion implementation tasks; audits resumes quantitatively. | Two-for-one skill submission; long-open since June. | OPEN (updated 2026-10-15) |
| 4 | [#1792](https://github.com/anthropics/skills/pull/1792) | `docx` fix | Reports LibreOffice timeout as a real error and verifies revision marks removed before claiming success. | Pairs with Issue #2018 (`merge_runs.py` invalid XML) as the docx reliability thread. | OPEN (updated 2026-09-25) |
| 5 | [#1980](https://github.com/anthropics/skills/pull/1980) | `webapp-testing` security fix | Removes `shell=True` in `with_server.py`, closing CWE-78 command-injection risk. | Security hardening — rare in this repo; community-backed. | OPEN (updated 2026-10-22) |
| 6 | [#1771](https://github.com/anthropics/skills/pull/1771) | `proofcore-contract-auditor` | Static analysis of Solidity/Rust contracts with Merkle-proof notarization on TON. | First Web3/blockchain skill proposal; novel vertical. | OPEN (updated 2026-09-16) |
| 7 | [#1703](https://github.com/anthropics/skills/pull/1703) | `md2video-audio` | Compiles Markdown → MP4 with Marp slides and human-like voiceovers. | Zero-cost media pipeline; active September updates. | OPEN (updated 2026-09-15) |
| 8 | [#525](https://github.com/anthropics/skills/pull/525) | `pyxel` | Retro game dev with headless input runs and frame inspection. | Long-lived (opened March), still receiving updates in September. | OPEN (updated 2026-09-22) |

*Also notable (older but persistent):* [#514](https://github.com/anthropics/skills/pull/514) `document-typography`, [#486](https://github.com/anthropics/skills/pull/486) `odt`, [#83](https://github.com/anthropics/skills/pull/83) `skill-quality-analyzer` + `skill-security-analyzer`.

---

## 2. Community Demand Trends

Distilled from the top 15 Issues by comment count:

**a. Trust & Namespace Security** — Issue [#492](https://github.com/anthropics/skills/issues/492) (46 comments, the single most-discussed item) flags community skills published under the `anthropic/` namespace as a trust-boundary abuse vector. This is the strongest demand signal in the repo and is echoed by PR #1980's command-injection fix.

**b. Organization-Level Skill Sharing** — Issue [#228](https://github.com/anthropics/skills/issues/228) (17 comments, 8 👍) asks for a shared skill library / direct share links, replacing the current "download .skill and Slack it" workflow.

**c. Evaluation & Benchmarking Reliability** — Issue [#556](https://github.com/anthropics/skills/issues/556) (13 comments, 7 👍, 0% trigger rate) plus #1383, #1390, #1394 form a clear cluster: the community wants the skill-creator / mcp-builder evaluation harness to actually work.

**d. Context & Memory Efficiency** — Issues [#1487](https://github.com/anthropics/skills/issues/1487) (`claude-api` injecting ~156k tokens) and [#1329](https://github.com/anthropics/skills/issues/1329) (`compact-memory` symbolic notation) show demand for token-lean skills and compact agent state.

**e. Governance & Reasoning Quality** — Issues [#412](https://github.com/anthropics/skills/issues/412) (agent-governance) and [#1385](https://github.com/anthropics/skills/issues/1385) (Reasoning Quality Gate Pipeline) reflect a growing appetite for safety/quality meta-skills.

**f. Packaging Hygiene** — Issue [#189](https://github.com/anthropics/skills/issues/189) (9 👍) reports `document-skills` and `example-skills` shipping identical content — a demand for clean plugin boundaries.

---

## 3. High-Potential Pending Skills

Active-comment PRs with recent updates likely to land soon:

- **[#1742](https://github.com/anthropics/skills/pull/1742) — mcp-builder `mcp>=2` compatibility.** Fixes a shipped regression; highest merge probability.
- **[#1980](https://github.com/anthropics/skills/pull/1980) — webapp-testing `shell=True` removal.** Security fix, updated within 24h of snapshot.
- **[#1977](https://github.com/anthropics/skills/pull/1977) & [#1976](https://github.com/anthropics/skills/pull/1976) — algorithmic-art `wrapAround()` + webapp-testing `element_discovery.py`.** Pair of small, well-scoped fixes by the same author (both close existing Issues #1897 / #1891); low-risk merges.
- **[#1997](https://github.com/anthropics/skills/pull/1997) — skill-creator YAML frontmatter parsing.** Correctness fix for eval/description optimization.
- **[#1792](https://github.com/anthropics/skills/pull/1792) — docx LibreOffice timeout handling.** Addresses a real failure mode; complements Issue #2018.
- **[#1681](https://github.com/anthropics/skills/pull/1681) — skill-creator direct execution of `package_skill.py`.** Fixes `ModuleNotFoundError` for standalone runs.
- **[#1734](https://github.com/anthropics/skills/pull/1734) — Detect orphaned docx comments.** Small, focused feature PR.
- **[#1730](https://github.com/anthropics/skills/pull/1730) — claude-api dead URL cleanup.** Trivial maintenance; all URLs verified HTTP 200.

*New skill submissions worth watching:* [#1703](https://github.com/anthropics/skills/pull/1703) `md2video-audio`, [#1615](https://github.com/anthropics/skills/pull/1615) `scnet-hpc`, [#1771](https://github.com/anthropics/skills/pull/1771) `proofcore-contract-auditor`.

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is not for new Skills but for trust, correctness, and reliability in the existing ones** — namespace/security hardening (#492), working evaluation harnesses (#556, #1383), and packaging/parsing fixes dominate over net-new capability proposals.

---

# Claude Code Community Digest — 2026-10-23

## 1. Today's Highlights

Two patch releases landed (v2.1.308, v2.1.309), with v2.1.309 addressing meaningful security-adjacent sandbox behavior on macOS/Linux, including shell startup files leaking outside the sandbox and symlink-aware `denyWrite` glob resolution. The issue tracker remains dominated by a **desktop "Code tab" regression cluster** around missing context-window usage indicators, which has spawned multiple duplicate threads across Windows and macOS. Meanwhile, the "Mods" extensibility initiative (#91870) continues to be the highest-engagement enhancement after multi-account Connector support.

## 2. Releases

**v2.1.309**
- Fixed sandboxed Bash commands on macOS/Linux executing the shell's startup files **outside the sandbox** before each command (security-relevant — potential pre-command escape vector).
- Fixed macOS sandbox `denyWrite` glob patterns failing to apply at a path's **real location** when the pattern's folder is reached via symlink (symlink bypass of write denials).
- Additional sandbox fixes (changelog truncated).

**v2.1.308**
- Generic bug fixes and reliability improvements.

*Assessment:* v2.1.309 is the notable release — both headline fixes close sandbox-boundary gaps that matter for anyone running automated/headless workflows with restricted writes.

## 3. Hot Issues

1. **[#27302 — Support multiple Connector accounts (same connector, different accounts)](https://github.com/anthropics/claude-code/issues/27302)** — OPEN, 278 comments, 424 👍. The single highest-engagement issue in the tracker. Users need to bind distinct credentials to the same connector type (e.g., two GitHub orgs, two Slack workspaces) across Claude and Claude Code web. Auth architecture is the blocker.

2. **[#91870 — Mods: make Claude 10x more extensible](https://github.com/anthropics/claude-code/issues/91870)** — OPEN, 268 comments, 131 👍. The flagship plugin/hooks extensibility effort, complete with maintainer community updates (Sep 9 / Oct 1). The PR cluster from `poteat` (below) is the implementation tail of this.

3. **[#79305 — Desktop app: support custom themes / accent colors](https://github.com/anthropics/claude-code/issues/79305)** — OPEN, 23 comments, 71 👍. Parity request with the CLI's custom theme system. Rationale is practical: window identification across multi-monitor setups.

4. **[#55348 — `/feedback` returns 403 for 3 days](https://github.com/anthropics/claude-code/issues/55348)** — OPEN, 14 comments. Chronic meta-bug — the in-product feedback channel is broken, funneling reports into GitHub. Related: [#101651](https://github.com/anthropics/claude-code/issues/101651) reports the same 403 plus a failed transcript share.

5. **[#95364 — Desktop "stealth update" quits/relaunches while user is away, dropping Remote Control sessions](https://github.com/anthropics/claude-code/issues/95364)** — OPEN, has repro, 12 comments, 14 👍. Auto-update idle-window logic kills every `claude.ai/code` Remote Control session. High-impact for remote-workflows.

6. **[#97074 — Headless `claude -p` uses ~1.8× more of the 5-hour window per token than interactive CLI](https://github.com/anthropics/claude-code/issues/97074)** — OPEN, has repro, 11 comments. Cost-attribution discrepancy between `sdk-cli` entrypoint and interactive `cli` on identical workloads. Directly affects CI/automation budgeting.

7. **[#102094 — Desktop: context-window usage no longer shown anywhere](https://github.com/anthropics/claude-code/issues/102094)** — CLOSED, 10 comments, 18 👍. The anchor of the context-usage regression cluster; closure suggests a fix path, but duplicates keep filing (see #102103, #102133, #102615, #103885, #103918).

8. **[#102095 — Desktop: effort level now takes 3 clicks instead of 1](https://github.com/anthropics/claude-code/issues/102095)** — OPEN, 10 comments, 11 👍. UX regression with a quantified cost argument (≈100 extra clicks/day for frequent switchers). Exemplary bug report.

9. **[#75855 — Windows drive-letter case not canonicalized in project keys](https://github.com/anthropics/claude-code/issues/75855)** — OPEN, 10 comments. Causes duplicate `.claude.json` / `installed_plugins.json` entries and silently drops VS Code trust. Long-lived correctness bug on Windows.

10. **[#81377 — Caps Lock input-source switch double-flips (Hebrew ⇄ English)](https://github.com/anthropics/claude-code/issues/81377)** — OPEN, 3 comments. Non-English input-method bug in the desktop chat input; niche but a hard blocker for affected users.

*Honorable mentions:* [#96043](https://github.com/anthropics/claude-code/issues/96043) (MCP elicitation declared but never wired in Desktop), [#104341](https://github.com/anthropics/claude-code/issues/104341) and [#97641](https://github.com/anthropics/claude-code/issues/97641) (agent over-scoping / acting on unapproved actions — recurring trust theme), [#103788](https://github.com/anthropics/claude-code/issues/103788) (desktop sign-in "couldn't verify your browser").

## 4. Key PR Progress

All seven updated PRs come from a single contributor (`poteat`) and form a coordinated **Mods / sec-default hardening** stack. Note: all are marked CLOSED with merge-order dependencies on engine releases — treat as staged, not landed.

1. **[#97293 — mods: process.run truncation flags + list mtimeMs declarations](https://github.com/anthropics/claude-code/pull/97293)** — Gates declarations behind released CLI support (`isStdoutTruncated`/`isStderrTruncated`, `mtimeMs`) to avoid promising APIs the installed CLI can't answer.

2. **[#97334 — sec-default: conversation rows continue past the user tier](https://github.com/anthropics/claude-code/pull/97334)** — Requires `session.append` on main with no live release branch lacking it. Red-by-construction test until the CLI ships the event.

3. **[#97688 — sec-default: collector records continue past the user tier](https://github.com/anthropics/claude-code/pull/97688)** — Prevents a user's plugin from dropping or rewriting telemetry records destined for an org-seated collector. Important for enterprise audit integrity.

4. **[#99118 — diff: toasts show while the pane is open](https://github.com/anthropics/claude-code/pull/99118)** — Fixes `holdToasts` over-holding: other plugins' transient toasts were suppressed while `/diff` was open.

5. **[#99137 — sec-default: plugins may tighten, never loosen, org policy](https://github.com/anthropics/claude-code/pull/99137)** — A user plugin can no longer lift a deny/ask rule or change a pinned variable where sec-default is seated. No new engine required.

6. **[#99141 — diff: preserve pane when nothing can draw it yet](https://github.com/anthropics/claude-code/pull/99141)** — Stacked on #99118; defer pane dismissal until a renderer attaches.

7. **[#99540 — sec-default: org tool ceiling holds over user-installed plugins](https://github.com/anthropics/claude-code/pull/99540)** — Applies org approval requirements for connector tools to personally installed plugins; every deciding hook carries a `.catch`.

*Assessment:* A coherent security-posture design is emerging — **organizational policy always wins over personal plugin intent**, and telemetry/audit streams are tamper-resistant past the user tier. Watch for engine releases to unblock the stacked merges.

## 5. Hot Discussions

No Discussion data was provided in the source payload; this section is omitted.

## 6. Feature Request Trends

- **Extensibility & plugin governance** — Mods (#91870) plus the sec-default PR stack: hooks, plugin permissions, org-policy precedence, `PreToolUse` hook enrichment ([#104458](https://github.com/anthropics/claude-code/issues/104458), closed same-day).
- **Multi-identity / multi-account auth** — #27302 leads by a wide margin; connector/account multiplexing is the top unmet need.
- **Usage & context observability** — Repeated asks for a usage side panel ([#104471](https://github.com/anthropics/claude-code/issues/104471)), context-window display restoration (#102623, #103885), and readable token units.
- **Desktop ↔ CLI parity** — Custom themes (#79305), settings/behavior alignment between Code tab and CLI.
- **Desktop worktree control** — [#104479](https://github.com/anthropics/claude-code/issues/104479): cap or filter gitignored `.claude/**` files copied into worktree overlays (no size cap today).

## 7. Developer Pain Points

1. **Context-window usage visibility regression (desktop)** — The loudest cross-cutting frustration. Five+ near-duplicate issues (#102094, #102103, #102133, #102615, #103885) report the usage ring/popover no longer showing context, only plan limits. Regression provenance even cited (#91712). Users are mass-filing duplicates — a sign the change wasn't communicated and the fix is unclear.

2. **Feedback/reporting channels are broken** — `/feedback` 403s (#55348, #101651) and failed transcript shares funnel everything into GitHub, inflating the tracker and eroding trust in in-product reporting.

3. **Cost & quota opacity** — 1.8× quota burn in headless mode (#97074), token waste from failed shell commands (#104474), and over-scoped agent behavior burning budgets (#104341, #97641). Developers want predictable, attributable spend.

4. **Agent acting without clear approval** — Recurring theme in #97641 and #104341: the model treating ambiguous replies as consent and over-scoping delegated work. A permissions/trust issue, not just a quality one.

5. **Desktop auto-update disrupting sessions** — Stealth quit/relaunch dropping Remote Control sessions (#95364) breaks long-running remote workflows.

6. **Windows correctness debt** — Drive-letter canonicalization (#75855) causing duplicate config entries and silent trust loss; multiple Windows-specific desktop UI regressions.

7. **Platform/accessibility gaps** — Input-method double-flip (#81377), desktop sign-in verification failures (#103788), and un-dismissable session surveys (#94710, filed as duplicate) — smaller in count but high-friction for affected users.

---

*Digest generated from github.com/anthropics/claude-code activity on 2026-10-23. Note: PR #s are CLOSED and largely engine-release-gated; "closed" here does not imply merged.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-23

## 1. Today's Highlights

The Codex team shipped three more `rust-v0.164.0-alpha` builds while landing a large batch of infrastructure PRs around managed configuration, environment-scoped hooks, and rollout tracing. On the community side, a closed macOS desktop serialization bug (#55744) drew massive engagement (168 👍, 84 comments), while Windows desktop users continue to report a cluster of memory/process leaks and "model at capacity" errors. Auth, sandbox, and BYOK-related issues remain the most active bug categories.

## 2. Releases

Three pre-release builds were published in the last 24h (all `rust-` channel):
- **rust-v0.164.0-alpha.12** — openai/codex Releases
- **rust-v0.164.0-alpha.11.1** — openai/codex Releases
- **rust-v0.163.0-alpha.11.2** — openai/codex Releases

No detailed changelogs were provided; these appear to be incremental alpha iterations of the 0.164/0.163 lines.

## 3. Hot Issues

1. **#55744 [CLOSED]** macOS app 26.1016.51333 chats fail with "Cannot serialize value" — https://github.com/openai/codex/issues/55744 — Highest-engagement issue (84 comments, 168 👍). A first-message serialization crash blocked all new chats for macOS users; its closure is a strong signal the team is prioritizing desktop stability.

2. **#54841 [OPEN]** Work mode blocks message submission in BYOK mode when local browser/computer tools are enabled — https://github.com/openai/codex/issues/54841 — BYOK + Work mode regression affecting Windows users; 37 comments show broad impact on paid workflows.

3. **#50329 [OPEN]** Windows App `read_thread` returns only `chatgpt-content-reference` for completed replies — https://github.com/openai/codex/issues/50329 — App-server protocol issue on Windows MSIX builds; relevant to anyone integrating with Codex programmatically.

4. **#51731 / #52873 [OPEN]** Dot integration fails: "unsupported placement format version 3" when reading Codex threads — https://github.com/openai/codex/issues/51731 | https://github.com/openai/codex/issues/52873 — Two related reports on Dot<->Codex thread compatibility; indicates a schema-version mismatch in the placement format.

5. **#51649 [OPEN]** Windows Codex Desktop accumulates 200 Node helpers and ~11.6 GB memory — https://github.com/openai/codex/issues/51649 — Serious resource-leak regression on Windows; echoes the cua_node EPERM loop in #42484.

6. **#42484 [OPEN]** `cua_node rename_staging` EPERM loops indefinitely, consuming ~59 GB — https://github.com/openai/codex/issues/42484 — Extreme instance of the Windows process-leak family; long-standing and still reproducible.

7. **#51667 [OPEN]** macOS VM: Codex messages blocked after updating to 26.1002.52244 — https://github.com/openai/codex/issues/51667 — Auth/safety-check interaction breaking message submission in VM environments (UTM).

8. **#51053 [OPEN]** iOS Remote can't view active VS Code Codex task due to writer lock — https://github.com/openai/codex/issues/51053 — Cross-device session ownership bug; relevant to the multi-device workflow thread in Discussion #14067.

9. **#56264 [OPEN]** Windows desktop: thread resume fails because MXC `process.env` lacks `SYSTEMROOT` — https://github.com/openai/codex/issues/56264 — Fresh (Oct 22) sandbox regression; prevents resuming existing chats.

10. **#56328 / #55746 / #52894 [OPEN]** "Selected model is at capacity" across all models — https://github.com/openai/codex/issues/56328 | https://github.com/openai/codex/issues/55746 | https://github.com/openai/codex/issues/52894 — A cluster of capacity-related reports spanning CLI, Desktop, and Pro accounts, suggesting either a rate-limit misconfiguration or a backend capacity event.

## 4. Key PR Progress

1. **#56343** Run environment hooks on their owning executors — https://github.com/openai/codex/pull/56343 — Ensures command hooks execute with the correct shell, cwd, and network policy per environment.

2. **#56314** Add managed configuration loaders for custom config servers — https://github.com/openai/codex/pull/56314 — Introduces `config_server` selection and bundle fetching at `<base_url>/codex/config/bundle`.

3. **#56295** Decouple managed configuration loading from ChatGPT authentication — https://github.com/openai/codex/pull/56295 — Refactors into a `BundleSource` interface; enables BYOK/enterprise setups independent of ChatGPT auth.

4. **#56304 / #56302** Environment-scoped managed hooks and hook configuration on environment attachments — https://github.com/openai/codex/pull/56304 | https://github.com/openai/codex/pull/56302 — Lays groundwork for per-environment hook execution and discovery.

5. **#56330** Make agent-message wakes respect interrupts and Plan mode — https://github.com/openai/codex/pull/56330 — Fixes a race where queued agent messages could be consumed after an interrupt.

6. **#56312** Track accepted conversation history in rollout traces — https://github.com/openai/codex/pull/56312 — Improves trace fidelity by distinguishing discarded model attempts from accepted outputs.

7. **#56308** Separate directory and repository scopes in the TUI — https://github.com/openai/codex/pull/56308 — Restores `Cwd`-only filtering separate from linked-worktree repo grouping.

8. **#56292 / #56293** Test infrastructure fixes: MCP cancellation metadata callback; fixed-token Vertex auth fixtures — https://github.com/openai/codex/pull/56292 | https://github.com/openai/codex/pull/56293 — Unblocks concurrent credential resolution in tests.

9. **#56288 / #56290** Pin Cosign to v3.1.4 for Linux artifact signing; lock Python release build tools with `uv` — https://github.com/openai/codex/pull/56288 | https://github.com/openai/codex/pull/56290 — Supply-chain hardening for release pipelines.

10. **#24663** Serialize managed ChatGPT token refreshes — https://github.com/openai/codex/pull/24663 — Long-running PR finally closed; prevents token-refresh races across processes sharing `CODEX_HOME`.

## 5. Hot Discussions

### Ideas
- **#14067** Synchronize Codex threads and session context across devices (13 comments, 69 👍) — https://github.com/openai/codex/discussions/14067 — Top-voted feature ask; directly relevant to the iOS Remote writer-lock issue (#51053) and desktop remote SSH bug (#53080).
- **#56158** Bring back the worktree button (0 comments, 1 👍) — https://github.com/openai/codex/discussions/56158 — Small but sharp UX regression complaint about hidden worktree toggle.
- **#56157** Running Codex CLI on Android via LinDesk — https://github.com/openai/codex/discussions/56157 — Practical mobile-workflow demo; signals demand for non-desktop Codex targets.

### Q&A
- **#55792** Windows desktop: supported review path when `/approve` is unavailable? — https://github.com/openai/codex/discussions/55792 — Users want an explicit approval-override mechanism after auto-review rejects an action.
- **#56208** Chrome downloads: supported setup for reliable unattended file collection? — https://github.com/openai/codex/discussions/56208 — Browser-use reliability question after `ERR_BLOCKED_BY_CLIENT` on authenticated PDF downloads.

### Show and tell
- **#56176** Does a fresh Codex session receive `AGENTS.md`? A repeatable before/after check (Agent Relay Check v0.1.1) — https://github.com/openai/codex/discussions/56176
- **#56181** `pytest-codex`: turn `AGENTS.md` rules into pytest checks with offline replay (v0.2.0) — https://github.com/openai/codex/discussions/56181
- **#56337** Off the Wall: recall your past corrections before Codex answers — https://github.com/openai/codex/discussions/56337
- **#54813** Octuo: hand a goal to Codex under your own account, get the result back — https://github.com/openai/codex/discussions/54813
- **#56215** GFT-Merge: combine local conversations and start a fresh Codex session — https://github.com/openai/codex/discussions/56215
- **#56242** ibara: first Codex desktop task on an Omarchy spare computer — https://github.com/openai/codex/discussions/56242
- **#55421** TAHU authorization-gateway prototype seeking 3 developer trials — https://github.com/openai/codex/discussions/55421

## 6. Feature Request Trends

- **Cross-device session sync** — #14067 (69 👍) is the clearest signal; paired with remote/SSH and iOS writer-lock issues (#51053, #53080), indicating a demand for a unified multi-machine Codex session layer.
- **Rate-limit UX and reset automation** — #32586 asks for auto-redeeming banked resets before expiration; capacity errors (#56328, #55746, #52894) reinforce the need for better visibility into quota state.
- **Worktree & scope controls** — #56158 (worktree button) and PR #56308 (directory vs. repo scope in TUI) show users want explicit, always-visible scope indicators.
- **Agent-instruction verification tooling** — Community projects #56176 (Agent Relay Check) and #56181 (pytest-codex) both target verifying that `AGENTS.md` is actually applied, hinting at demand for first-party instruction-provenance tooling.
- **Correction memory / persistent preferences** — #56337 (Off the Wall) and #56215 (GFT-Merge) both address reusing past interactions/corrections across sessions.

## 7. Developer Pain Points

- **Windows desktop instability dominates bug reports.** Memory leaks and runaway Node/MXC helper processes (#51649, #42484, #52343), thread-resume failures after update (#56264), background hydration access-denied loops (#51572), and headless startup failures (#41540) form the largest complaint cluster.
- **"Selected model is at capacity" is recurring across platforms.** Reported for CLI, Desktop, and Web/Work (#56328, #55746, #52894) — including one account-specific case where a different account works on the same machine, suggesting per-account capacity/quota misconfiguration rather than true load.
- **Auth and BYOK regressions block paid workflows.** #54841 (BYOK Work mode), #51667 (macOS VM message blocking), and #52894 (capacity gating on Pro) all prevent users from sending messages despite valid subscriptions.
- **Sandbox/environment variables break thread resumption.** #56264's missing `SYSTEMROOT` under MXC, plus the long-standing `/diff` Windows sandbox issue (#28649), point to fragile environment plumbing on Windows.
- **Desktop ↔ remote/external surface parity gaps.** Dot rejects user-created threads (#51731, #52873), iOS Remote hits writer locks (#51053), and remote SSH workspace chats fail to render history (#53080) — the "connect everything to Codex" surface is still brittle.
- **CLI/TUI paper cuts persist.** Minor but persistent issues like 1M tokens rendered as "1000K" (#56106) and the app-server control-socket readiness failure (#50978) erode confidence in the CLI experience.

---
*Digest compiled from github.com/openai/codex activity for 2026-10-23.*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-10-23

## 1. Today's Highlights

Agent reliability remains the dominant theme this cycle: a P1 subagent bug (#22323) reports false `GOAL` success after hitting `MAX_TURNS`, while the generalist agent hang (#21409, 8 👍) continues to draw community votes. On the PR side, a critical settings fix (#29762) preserves on-disk edits during auth changes, and credential-store writes are being made atomic (#29765) to prevent silent keychain data loss.

## 2. Releases

**v0.67.0-nightly.20261023.ga713410ab**
- fix(a2a-server,core): preserve extended token usage metadata and align per-turn reporting ([#29834](https://github.com/google-gemini/gemini-cli/pull/29834))
- fix(core): ensure all model turns with function calls receive thought signatures ([@amelidev](https://github.com/google-gemini/gemini-cli))

## 3. Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent reports `GOAL` success after `MAX_TURNS`, masking interruption. 13 comments; a correctness bug undermining trust in agent status reporting. *P1, need-retesting.*
2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — Proposal to leverage Gemini's bash affinity via zero-dependency OS sandboxing and post-execution intent routing. 9 comments; a strategically significant agent-capability direction.
3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist agent hangs indefinitely on simple tasks like folder creation. 8 👍; highest community-voted issue in the list, showing broad impact.
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — EPIC assessing AST-aware file reads, search, and codebase mapping. 7 comments; a foundational efficiency investigation.
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — Gemini rarely invokes custom skills/sub-agents autonomously without explicit instruction. 7 comments; adoption barrier for extensibility features.
6. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 400 error when >128 tools are registered. 3 comments; a practical scaling ceiling for MCP-heavy users.
7. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** — Agent should stop/discourage destructive commands (`git reset`, `--force`). 1 👍; safety concern for git and DB operations.
8. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent ignores `settings.json` overrides such as `maxTurns`. 4 comments; config-priority inconsistency in the agent stack.
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — Browser subagent fails on Wayland despite reporting `GOAL`. *P1 bug*; Linux desktop compatibility gap.
10. **[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)** — Replace `WriteToDo` with persistent file-based task tracking to combat context rot and session memory loss. 2 comments; structural UX improvement.

## 4. Key PR Progress

1. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762)** — fix(settings): preserve disk edits when changing authentication *(P1, size/l)* — stops startup-snapshot overwrites of concurrent settings changes.
2. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765)** — fix(core): atomic, serialized `FileKeychain` writes — prevents silent credential loss and lockouts from concurrent/interrupted writes.
3. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767)** — fix(core): bound MCP `tools/list` discovery with a 60s default timeout — eliminates silent 10-minute discovery stalls.
4. **[#29688](https://github.com/google-gemini/gemini-cli/pull/29688)** — fix(core): close command-substitution guard bypass via shell wrapper flags — security-relevant hardening of `stripShellWrapper()`.
5. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838)** — fix(core): resolve relative file paths against active IDE workspace root *(P1, maintainer-only)* — fixes file tool targeting in multi-root contexts.
6. **[#29859](https://github.com/google-gemini/gemini-cli/pull/29859)** — fix(cli): display executing subagent tool calls in the task tree — restores subagent visibility in the UI.
7. **[#29761](https://github.com/google-gemini/gemini-cli/pull/29761)** — fix(core): stop `$&`/`` $` ``/`$'`/`$$` patterns corrupting prompt templates and `{{args}}`.
8. **[#29771](https://github.com/google-gemini/gemini-cli/pull/29771)** — fix(cli): only auto-nudge genuinely empty continuations and properly await the nudge.
9. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880)** — feat(cli): add `gemini models` command and `--list-models` flag with JSON output — improves scripting/discovery.
10. **[#29884](https://github.com/google-gemini/gemini-cli/pull/29884)** — fix(core): allow trusted system paths on Android/Termux for ripgrep resolution.

## 5. Hot Discussions

No discussion data was provided for this period; this section is omitted.

## 6. Feature Request Trends

- **AST-aware tooling**: Two linked EPICs (#22745, #22746, #22747) pursue AST-grep-style reads/search to cut turns and token noise.
- **Persistent task state**: Multiple issues (#18836, #21000) call for file-based task tracking over in-context `WriteToDo` to mitigate context rot.
- **Agent self-awareness**: #21432 requests accurate CLI flags/hotkeys self-reporting; #22598 asks for subagent trajectory visibility via `/chat share`.
- **Token frugality**: #19561 proposes surgical "Tactful Extraction" reads against a ~36.6k token/turn baseline.
- **Parallel subagents & shared memory**: #18287 explores collaboration, currently blocked on parallelism support.

## 7. Developer Pain Points

- **False success reporting** (#22323, #21983): subagents report `GOAL` despite hitting limits or failing — status semantics are unreliable.
- **Agent hangs** (#21409, #22465): generalist agent and interactive prompts (e.g., Vite scaffolding) stall indefinitely.
- **Config overrides ignored** (#22267): `settings.json` values like `maxTurns` are silently dropped by the Browser Agent.
- **Tool-count limits** (#24246): 400 errors with >128 tools force manual scoping.
- **Workspace hygiene** (#23571): temp scripts scattered across directories complicate clean commits.
- **Destructive command risk** (#22672): unsafe `git reset`/`--force` usage without guardrails.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-23

## 1. Today's Highlights

The Copilot CLI team shipped **v1.0.103**, delivering quality-of-life fixes around code block copying, ACP sandbox flag handling, and cloud reconnect reliability. Meanwhile, the issue tracker is unusually active: **36 issues updated in the last 24 hours**, with a notable cluster around **MCP authentication/OAuth token handling** (Issues #5229, #5233, #5234, #5236) and continued fallout from the **WSL2 voice server segfault** introduced in 1.0.100. No pull requests were updated in this window.

---

## 2. Releases

### v1.0.103 — released 2026-10-22
- **Code block copy behavior**: Clicking a completed response code block now copies its original (pre-render) code when enabled — a fix for prior truncation/formatting loss.
- **ACP sandbox settings honored**: ACP sessions now respect saved sandbox settings and `--sandbox`/`--no-sandbox` flags, *including on resume*.
- **Cloud reconnect resilience**: Cloud replies retain full text when the CLI reconnects after a dropped connection.
- **Sessions browser improvements** (changelog truncated).

Link: [github/copilot-cli releases](https://github.com/github/copilot-cli/releases)

---

## 3. Hot Issues

1. **#5197 — Voice server segfaults (signal 11) on WSL2 after 1.0.100** [OPEN]
   High-impact regression: `/voice` hangs on "Fetching voice models" because the voice runtime crashes seconds after launch. 4 comments, 2👍 — users are effectively blocked from the feature.
   https://github.com/github/copilot-cli/issues/5197

2. **#3013 — Hooks don't fire for background (task) agents** [CLOSED]
   A safety-relevant bug: permission hooks that block dangerous commands are bypassed when the command runs through a subagent. Closed after long discussion. 4 comments, 0👍 but high severity.
   https://github.com/github/copilot-cli/issues/3013

3. **#4065 — Secret redaction is too aggressive** [OPEN]
   Redaction mangles legitimate content (e.g., `${env.AUTH_TOKEN}` in spec files). 3 comments, 3👍 — community agrees this degrades real config files.
   https://github.com/github/copilot-cli/issues/4065

4. **#5232 — Trusted folders silently auto-approve shell execution in manual mode** [OPEN]
   Path-based gating can't predict side effects — e.g., `powershell.exe -NoProfile -Ex...` running scripts, `sqlcmd`, or `curl`. A serious permission-model concern. 2 comments.
   https://github.com/github/copilot-cli/issues/5232

5. **#5203 — Feature Request: Stable Release Channel** [OPEN]
   Rapid releases are breaking daily workflows; users want Stable/Beta channels like other dev tools. 2 comments.
   https://github.com/github/copilot-cli/issues/5203

6. **#5219 — `task` subagent with unknown model id falls back to 128k caps and wedges session** [OPEN]
   Whole turns fail with "Request exceeds the model's prompt budget" even when main context is fine. 2 comments.
   https://github.com/github/copilot-cli/issues/5219

7. **#5229 — ACP mode uses OAuth authorization page instead of refresh token** [OPEN]
   Remote MCP server 401s trigger a browser flow even when a refresh token is stored — breaks headless/agentic use. 0 comments but representative of a growing MCP auth cluster.
   https://github.com/github/copilot-cli/issues/5229

8. **#5233 — Expired MCP access token resent repeatedly instead of refreshing** [OPEN]
   Session loops on 401s every ~... seconds, no token refresh or re-prompt. Breaks long-lived MCP sessions.
   https://github.com/github/copilot-cli/issues/5233

9. **#5228 — `copilot --resume` without ID drops into empty session; list auto-replaced after ~2s** [OPEN]
   Unified Sessions browser regression makes session resumption unreliable; trust prompt consumes first Enter.
   https://github.com/github/copilot-cli/issues/5228

10. **#5224 — Non-PTY interactive build spins indefinitely; WSL process tree survives editor restart** [OPEN]
    A build's interactive config menu ran ~10.5 hours on one CPU after the editor closed — demonstrates process-lifecycle gaps on Windows/WSL.
    https://github.com/github/copilot-cli/issues/5224

*Also worth noting:* **#5238** (repeated full cache bust after 50th image — costly), **#5027** (closed: Linux sandbox DNS broken with systemd-resolved), **#4914** (closed: Gemini "Tool name is required" on mixed-model history).

---

## 4. Key PR Progress

No pull requests were updated in the last 24 hours (Total: 0 items). No items to report in this section.

---

## 5. Hot Discussions

No discussion data was provided in the source data; this section is omitted.

---

## 6. Feature Request Trends

Distilled from the 36 updated issues:

- **Release stability & channels** — Requests for a Stable/Beta channel (#5203) reflect fatigue with regression-prone rapid releases.
- **Permission/sandbox model refinement** — Trusted folders bypassing manual-mode prompts (#5232), hooks not covering subagents (#3013), and sandbox DNS (#5027) point to demand for a more predictable, auditable security model.
- **MCP authentication lifecycle** — Multiple requests/fixes around OAuth refresh tokens, token caching, and sign-in persistence (#5229, #5233, #5234, #5236). This is the clearest emerging theme.
- **Model selection control** — Excluding flaky models from Auto selection (#5231), and better handling of unknown subagent model IDs (#5219).
- **Input/rendering flexibility** — Pinning the input box to the top (#5227), keyboard-only scrolling (#2750), and configurable voice transcription language (#5226).
- **Context persistence across compaction** — Preserving `sessionStart` hook `additionalContext` after compaction (#5225).

---

## 7. Developer Pain Points

- **MCP/OAuth auth is fraying**: expired tokens resent, refresh tokens ignored, empty Entra broker caches, and MCP-auth failures making the Windows CLI unusable (#5229, #5233, #5234, #5236). This is the single most concentrated pain cluster today.
- **Session resume & browser regressions**: `--resume` dropping into empty sessions and the sessions list auto-replacing (#5228) undermines core workflow trust.
- **Voice on WSL2 broken since 1.0.100** (#5197): a hard feature outage with no workaround reported yet.
- **Permission model surprises**: silent auto-approval in trusted folders (#5232) and hook bypass via subagents (#3013) erode confidence in safety guarantees.
- **Over-aggressive secret redaction corrupting legitimate files** (#4065).
- **Costly image cache behavior**: full cache refill on the 51st image (#5238) — expensive at scale.
- **Release cadence fatigue**: recurring regressions fuel the stable-channel request (#5203).

---

*Digest generated 2026-10-23. Source: github.com/github/copilot-cli. Issue data reflects items updated in the last 24 hours; no PRs or Discussions were available in this snapshot.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-10-23

## 1. Today's Highlights

The biggest story today is security-adjacent: a still-open issue about sandboxing the agent (#2242, 101 comments, 80 👍) remains the community's top concern, while new PRs land timing-safe auth and pathspec hardening. Meanwhile, a cluster of permission-bypass bugs (#52083, #50652) and a retired-model docs cleanup (#55904) show the project juggling safety, correctness, and catalog hygiene. On the release side, v1.19.4 is a narrow security-only bump of the bundled Bun runtime.

## 2. Releases

**v1.19.4**
- **Core:** Upgraded the bundled Bun runtime to **1.4.4**, pulling in security fixes for Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket, and `fetch`, plus updated root certificates (NSS 3.131.1).
- No feature or behavioral changes; this is a hardening release. Worth upgrading if you rely on remote MCP or networked tool calls over the affected protocols.

## 3. Hot Issues

1. **[#2242 — Is there a way to sandbox the agent?](https://github.com/anomalyco/opencode/issues/2242)** (OPEN, 101 comments, 👍80)
   The single most-discussed open issue. Users want filesystem/terminal confinement comparable to Codex's seatbelt on macOS. High 👍 count signals this is a top product gap, not a niche ask.

2. **[#34344 — Unlimited usage exploit on opencode models](https://github.com/anomalyco/opencode/issues/34344)** (CLOSED, 17 comments)
   Reporter demonstrated that free-model rate limits keyed to IP can be reset via VPN rotation, enabling non-stop free usage. Closed, but important for anyone reasoning about abuse controls and free-tier economics.

3. **[#50257 — Desktop model picker shows "No reasoning" for all V2 models](https://github.com/anomalyco/opencode/issues/50257)** (OPEN, 15 comments, 👍4)
   `capabilities.reasoning` is never set, so reasoning-capable models (deepseek-v4.1-flash, kimi-k3, glm-5.3) are mislabeled in the UI. A clear correctness bug with an identified root cause.

4. **[#47646 — ChatGPT OAuth reports 400k context for long-context models](https://github.com/anomalyco/opencode/issues/47646)** (CLOSED, 15 comments, 👍3)
   OpenCode overwrites ~1.05M-token catalog limits with 400k under OAuth, causing the TUI to overstate available context. Closed, but a good example of provider-metadata drift.

5. **[#51828 — Location inactivity eviction SIGTERMs live background shells after 60 minutes](https://github.com/anomalyco/opencode/issues/51828)** (OPEN, 6 comments)
   `locations.invalidate()` tears down the Shell/Pty graph while the service stays alive. A subtle lifecycle bug with real data-loss potential for long-running background work.

6. **[#52083 — Compound shell commands drop redirection, turning an allowed command into an unprompted file write](https://github.com/anomalyco/opencode/issues/52083)** (OPEN, 4 comments)
   Security-relevant: the permission scanner splits compound commands but omits the redirection target, so an `allow`ed command becomes an arbitrary-file-write primitive. Should be prioritized alongside #2242.

7. **[#50652 — External plugin tools bypass configured permissions](https://github.com/anomalyco/opencode/issues/50652)** (OPEN, 3 comments, 👍2)
   Plugin-registered tools (and Code Mode calls) execute without applying their configured permission action. Directly undermines the permission model.

8. **[#58128 — Do not stop retrying on LLM API failures](https://github.com/anomalyco/opencode/issues/58128)** (OPEN, 4 comments)
   The hardcoded 10×10s exponential backoff gives up too quickly on transient network/backend blips, halting sessions. A small config surface would likely satisfy most users.

9. **[#58188 — New Session and Open Project greyed out on Linux (2.1.3)](https://github.com/anomalyco/opencode/issues/58188)** (OPEN, 3 comments)
   Desktop menu items permanently disabled on Linux `.deb`, matching a known menu-lifecycle pattern. Platform-specific desktop regressions are piling up.

10. **[#58314 — Paid OpenCode Go workspace access denied, support unanswered](https://github.com/anomalyco/opencode/issues/58314)** (OPEN, 2 comments)
    Paying subscriber locked out for days (HTTP 403) with multiple unresolved support requests. Paid-tier access failures are a reputational risk and worth watching alongside #58014 and #58003.

## 4. Key PR Progress

1. **[#58341 — fix(core): keep remote MCP requests open past Bun's fetch idle timeout](https://github.com/anomalyco/opencode/pull/58341)**
   Remote MCP calls that stay silent >~5 min fail under Bun's idle timeout, well before OpenCode's own 12h MCP timeout. Important for long-running MCP tools.

2. **[#58340 — fix(ui): keep the dot-matrix spinner for AI activity only](https://github.com/anomalyco/opencode/pull/58340)**
   Restores the ring `Loader` for non-AI states (browser reload, updates) so the dot-matrix spinner means "AI working" again. Nice UX-consistency fix.

3. **[#58337 — fix(server): compare the server password in constant time](https://github.com/anomalyco/opencode/pull/58337)**
   Replaces `===` with `timingSafeEqual` in `authorized()`, matching `verifySession`. Closes a response-timing leak on the server password.

4. **[#58338 — fix(core): pass literal pathspecs when fetching a per-file patch](https://github.com/anomalyco/opencode/pull/58338)**
   Prevents glob/colon-magic filenames (`a*.txt`, `:(exclude)x`) from matching or hiding unintended files in the diff fallback.

5. **[#58336 — fix(ai): unique tool call ids for Mistral-family models](https://github.com/anomalyco/opencode/pull/58336)**
   GLM IDs all collapse to `chatcmplt` after normalization, triggering Mistral `400 Duplicate tool call id`. Routes Mistral-family IDs through a safer path.

6. **[#58334 — feat(core): add Brave web search](https://github.com/anomalyco/opencode/pull/58334)**
   Re-lands #48222 as a built-in websearch provider after stale-bot closure. Pairs with #58328 and the rate-limit/failover concern in #58327.

7. **[#58332 — feat(core): expose tool call source to shell create hooks](https://github.com/anomalyco/opencode/pull/58332)**
   Adds arguments to the `shell` tool so `shell.create` hooks can customize behavior by call origin. Useful for plugin authors building policy/guardrails.

8. **[#58305 — fix(app): show MCP elicitation forms in desktop and web](https://github.com/anomalyco/opencode/pull/58305)**
   Since #58184 the TUI renders `elicitation/create` forms, but desktop/web only handled `question` and `websearch.provider`—so tool calls hung. Brings parity across surfaces.

9. **[#58130 — fix(client): keep a live service that stalls across a suspend](https://github.com/anomalyco/opencode/pull/58130)**
   Stops the client from killing a healthy background service whose probes didn't answer during suspend/wake. Addresses a common laptop-workflow failure.

10. **[#57470 — fix(tui): read clipboard images through Windows interop on WSL](https://github.com/anomalyco/opencode/pull/57470)**
    Ctrl+V image paste returned `unsupported` on WSL because Windows Terminal owns the selection. Fixes #49895—a frequent WSL developer complaint.

## 5. Hot Discussions

No Discussions data was provided for this window, so this section is omitted.

## 6. Feature Request Trends

- **Sandboxing & permission hardening:** #2242 (sandboxing) and #50652 / #52083 (permission bypasses) point to a broader demand for a real confinement/permission model rather than advisory prompts.
- **Usage visibility & limits:** #57975 (unified real-time usage dashboard), #58014 (free limit hit after few requests), #34344 (limit-reset exploit) — users want transparent, trustworthy accounting.
- **Execution locality controls:** #58330 requests a model execution location toggle per API key, extending existing Go permission settings.
- **Websearch extensibility:** #58328 (re-land Brave as built-in) and #58327 (custom providers can't signal rate limits / are excluded from failover) — a push toward a first-class, pluggable search provider layer.
- **Retry/robustness configurability:** #58128 asks for configurable retry behavior instead of a hardcoded 10×10s ceiling.

## 7. Developer Pain Points

- **The permission/sandbox model is the dominant frustration.** The top issue by far (#2242) and two live bypass bugs (#50652, #52083) suggest users don't trust that "allowed" means "contained."
- **Free/paid tier friction and unclear limits.** #58014, #58003 (severe latency on paid DeepSeek V4.1 Flash), #58314 (paid workspace 403), and #34344 (limit-reset exploit) combine into a trust problem around OpenCode Go/Console.
- **Transient failures abort sessions.** #58128 (give up after 10 tries) and #51828 (background shells killed after 60 min) both interrupt long-running work with little user control.
- **Cross-platform desktop/TUI regressions.** #58188 (Linux menu greyed out), #56109 (Windows `/cd` tab-completion appends backslash), #57470-adjacent WSL clipboard issues, and #58000 (session/directory prompt after sleep) show platform-specific rough edges recurring.
- **Provider-metadata drift.** #50257 (reasoning never set), #47646 (context overwritten under OAuth), and #55904 (docs still list retired Exo/MiMo V2.5) indicate catalog accuracy is a persistent maintenance burden.
- **Localization quality.** #51868 flags machine-translation errors and 93 untranslated `zh` keys, a signal for i18n review processes.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-10-23

## 1. Today's Highlights

No new releases landed in the last 24 hours, but the issue tracker stayed hot: the long-running **startup latency/memory budget** debate (#7739) hit 11 comments, and a wave of **HTML export correctness fixes** (#11225, #11261, #11290, #11293, #11275, #11274) closed in quick succession after a stack-overflow regression blanked long sessions. A cluster of **TUI/perf/robustness issues** also gained traction (fuzzy search ranking, Windows symbol leaks, large-session fork slowness), signaling that day-to-day UX and reliability are the current community priorities.

---

## 2. Releases

*None. No new releases published in the last 24 hours.*

---

## 3. Hot Issues (10 noteworthy)

| # | Issue | Why it matters | Community signal |
|---|-------|----------------|------------------|
| [#7739](https://github.com/earendil-works/pi/issues/7739) | **Startup-time budget targeting jcode-comparable latency/memory** | Quantitative benchmark comparison (10 interactive PTY launches, Linux) puts pi 0.62.0 against jcode v0.9.1888-dev; a formal startup budget would make perf regressions actionable. | 11 comments, still open, updated today |
| [#7553](https://github.com/earendil-works/pi/issues/7553) | **Configurable thinking level/model for compaction** | Compaction currently reuses the session's thinking level unconditionally — a real cost problem for users running auto-compaction on reasoning models. | 12 comments, 3 👍, tagged `to-discuss` |
| [#9807](https://github.com/earendil-works/pi/issues/9807) | **TUI full re-render causes scroll/typing lag at 800+ messages** | Direct comparison to OpenCode's incremental cell-level diffing; sessions of this size are common for heavy agent users. | 5 comments, 3 👍 |
| [#11253](https://github.com/earendil-works/pi/issues/11253) | **`forkFrom` copies one `appendFileSync` per entry — 30s+ on 73MB sessions** | One open/close per entry breaks RPC handshakes on large sessions; `fix-available` labeled, so a PR is likely imminent. | 2 comments, marked **fix-available** |
| [#11086](https://github.com/earendil-works/pi/issues/11086) | **[p0] Symbols leaking into Windows terminal input under CPU load** | Highest-priority open bug; only reproes over SSH under client CPU load, making it nasty to root-cause. | 4 comments, `prio:p0` |
| [#9932](https://github.com/earendil-works/pi/issues/9932) | **`before_agent_start`: forced system prompt keeps tools removed via `setActiveTools()`** | Subtle extension-ordering bug: forced prompt is captured before tool set reconciliation, so removed tools stay advertised. | 6 comments |
| [#11223](https://github.com/earendil-works/pi/issues/11223) | **`modelOverrides` silently ignored for classifier models** | Docs promise overrides work for built-in/extension models; silent no-op violates least-surprise and costs debugging time. | 5 comments |
| [#10259](https://github.com/earendil-works/pi/issues/10259) | **Public tool-presentation API or built-in one-line tool mode** | Extensions can't control presentation of built-in/MCP/codemode tool rows; a one-line summary mode is a frequent ask. | 5 comments, 2 👍 |
| [#11172](https://github.com/earendil-works/pi/issues/11172) | **Split mouse report leaves escape-sequence tail in prompt** | StdinBuffer escape-timeout flushes half a sequence and the editor types the rest — a class of input-corruption bugs. | 2 comments, detailed repro |
| [#11127](https://github.com/earendil-works/pi/issues/11127) | **Configurable idle cache-warming horizon** | 30-min default vs. ~27/54-min refresh schedule creates a hard cutoff; users want 60/120 min options. | 3 comments |

---

## 4. Key PR Progress (10)

| PR | Change | Status |
|----|--------|--------|
| [#11293](https://github.com/earendil-works/pi/pull/11293) | **Iterative HTML export tree walks** (`sortChildren`, `mapNodes`, `markActive`) — fixes blank `/export` pages on ~6k+ entry sessions. Closes #11225. | Closed (merged path) |
| [#11290](https://github.com/earendil-works/pi/pull/11290) | **Render system messages in HTML export** — leading prompt/tools + later section updates now visible; closes #11261. | Closed |
| [#11288](https://github.com/earendil-works/pi/pull/11288) | **Single-fd fork write** — replaces ~3,000 open/close cycles per fork of a 3k-entry session (bot-authored, fixes #11253). | Open |
| [#11296](https://github.com/earendil-works/pi/pull/11296) | **Contiguous fuzzy-match ranking + per-field session search** — fixes "opus ranks below Sonnet" behavior; closes #11220, touches #10552/#10065/#11024. | Closed |
| [#11304](https://github.com/earendil-works/pi/pull/11304) | **Start when a configured package fails to install** — records failure per source, skips like offline mode, surfaces extension warning. | Open |
| [#11289](https://github.com/earendil-works/pi/pull/11289) | **Stop macOS shell groups before killing** — reduces the race where `a; b` continues after aborting `a` (fixes #11252). | Closed |
| [#11257](https://github.com/earendil-works/pi/pull/11257) | **Preserve `pi.exec` spawn errors** as `stderr` when no stderr was produced; regression test for missing executables (fixes #11085). | Closed |
| [#11299](https://github.com/earendil-works/pi/pull/11299) | **Fix `thinkingLevelMap?.off` guard + spurious `max_completion_tokens`** — resolves HTTP 400s for `reasoning: true`/`openrouter` models without a level map. | Closed |
| [#7952](https://github.com/earendil-works/pi/pull/7952) | **`messageId` + `timestamp` in markdown transformer context** — enables per-message decoration by extensions; closes #7828. | Closed |
| [#9301](https://github.com/earendil-works/pi/pull/9301) | **Confirm device-code browser/clipboard actions** — restores auto-open UX but with explicit user consent (fixes #9282). | Closed |

Honorable mentions: [#6843](https://github.com/earendil-works/pi/pull/6843) (original iterative-export PR, closed today), [#10528](https://github.com/earendil-works/pi/pull/10528) (Nix packaging cleanup, still open), [#9329](https://github.com/earendil-works/pi/pull/9329) (Orca terminal Kitty-image detection), [#11278](https://github.com/earendil-works/pi/pull/11278) (preserve `ctx.ui` getters through `wrapUIPromptContext`), [#11231](https://github.com/earendil-works/pi/pull/11231) (Windows installer tab in Quickstart).

---

## 5. Hot Discussions

### Show and tell

- **[#11306 — pi-continuity: auto-resume after coding plan usage limits and interrupted turns](https://github.com/earendil-works/pi/discussions/11306)** — Addresses OpenAI's 5-hour cap (and similar) by auto-resuming runs that Pi's transient-error retry and compaction don't cover. 1 👍.
- **[#11307 — pi-better-web-search: one `web_search` tool, raw provider results, real cross-provider fallback](https://github.com/earendil-works/pi/discussions/11307)** — Extracted from `pi-web-search` to fix two gripes: rewritten results and hard failure when the current model can't search but another logged-in provider can. 1 👍.

*(No Ideas or Q&A discussions updated in the last 24h.)*

---

## 6. Feature Request Trends

1. **Configurable budgets & thresholds** — thinking level/model for compaction (#7553), startup latency/memory budget (#7739), idle cache-warming horizon (#11127), provider-scoped auto-compaction with absolute token thresholds (#11295). Users increasingly want tunable knobs rather than global defaults.
2. **Extension/API surface expansion** — public tool-presentation API or one-line tool mode (#10259), `messageId`/`timestamp` in markdown transformer context (#7828 → PR #7952), per-model auxiliary usage records (#11090), durable MCP extension (#10837), custom OAuth client name for MCP servers (#10226).
3. **Session lifecycle ergonomics** — `/reload` picking up `AGENTS.md` edits (#11291, #11292 closed as no-action), inline slash autocomplete for skills (#11294), fuzzy-search quality in `/model` and `/resume` (#11220).
4. **Context-file fidelity to Claude Code** — stripping whole-line HTML comments from context files (#11250, #11251, both closed no-action), suggesting alignment with the broader ecosystem is on users' minds.

---

## 7. Developer Pain Points

- **Large-session performance is the dominant theme.** Full TUI re-render at 800+ messages (#9807), 30s+ forks of 73MB sessions (#11253), and HTML export stack overflows (#11225) all point to algorithms that don't scale with session size. The rapid merge of iterative export fixes shows maintainers are responding.
- **Silent failures erode trust.** `modelOverrides` ignored without warning (#11223), package install failures aborting startup (#11304), and missing spawn errors in `pi.exec` (#11257) all share a pattern: the system knows something went wrong and doesn't say so.
- **Terminal input handling remains fragile.** Windows symbol leakage under CPU load (#11086, p0), split mouse-report escape tails (#11172), empty bracketed paste on WSL (#11259), and Ctrl+C wiping prompts (#9190) suggest the input/escape-sequence layer needs hardening.
- **Extension ordering semantics are under-documented.** The `before_agent_start` tool-reconciliation bug (#9932) and `wrapUIPromptContext` getter-resolution issue (PR #11278) show extension authors fighting implicit lifecycle timing.
- **Platform asymmetry.** macOS process-group kill races (#11252), Windows/WSL input paths, Orca terminal capability detection (#9329), and Homebrew/macOS install docs (#11282) each reveal platform-specific gaps.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-10-23

## 1. Today's Highlights

The v0.26.0 nightly continues to harden the `serve`/daemon path, headlined by daemon token persistence. A cluster of high-priority bugs dominated the day: a **P1 silent tool-result drop** in 0.26.0 (~1 in 30–40 calls), a **Windows Desktop updater failure** from a locked `node.exe`, and a **~1.6 GiB transient WASM allocation** in the shell safety parser on Node 24. Meanwhile, Web Shell UX (terminology, session placement, sidebar) saw a dense burst of feature requests, signaling rapid maturation of the Managed Agent UI.

## 2. Releases

**v0.26.0-nightly.20261022.bf66a26c97** — [Release](https://github.com/QwenLM/qwen-code/releases)
- **feat(serve): add daemon token persistence** ([#15023](https://github.com/QwenLM/qwen-code/pull/15023), @wenshao) — daemon bearer tokens now survive restarts, improving `qwen serve`/`qwen daemon` ergonomics.
- **fix(release): cover every spawned vendored binary** — broader coverage of vendored binaries in release packaging.

## 3. Hot Issues

1. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078) — Daily dependency CVE audit failed** (29 comments). Long-running automation failure; likely npm audit endpoint unavailability or a new high-severity advisory. Highest-engagement issue of the day.
2. **[#15297](https://github.com/QwenLM/qwen-code/issues/15297) — [P1] 0.26.0 silently drops tool results (~1 in 30 calls)** — 43 of 1,663 verified, 28 transcript-confirmed. Edits still apply, but the model re-reads, wasting tokens. A serious correctness/observability regression on Windows.
3. **[#13787](https://github.com/QwenLM/qwen-code/issues/13787) — XML recovery repeats prefix scans on large multi-call responses** — bounded-parser reproduction on main and PR #13579; a real latency cliff for agentic multi-call workloads.
4. **[#15276](https://github.com/QwenLM/qwen-code/issues/15276) — [P1] Windows Desktop update fails, `node.exe` locked** — installer can't overwrite the bundled Node runtime; blocks in-app upgrades.
5. **[#15165](https://github.com/QwenLM/qwen-code/issues/15165) — [P2] Shell safety parser triggers ~1.6 GiB WASM allocation on Node 24.16.0** — transient native-memory spike during V8 optimization of the Bash WASM parser; already spawned a mitigation PR.
6. **[#15248](https://github.com/QwenLM/qwen-code/issues/15248) — [P2] sdk-java broker timing tests flake 3/3 on GitHub-hosted runners** — blocking fork PR fast lane; contrasts self-hosted vs. hosted behavior.
7. **[#14988](https://github.com/QwenLM/qwen-code/issues/14988) — Web Shell: standardize on Workspace/Session terminology** — aligns with DSH naming; driving a wave of related UI issues.
8. **[#8968](https://github.com/QwenLM/qwen-code/issues/8968) — MCP 2026-07-28 + MCP Apps support in daemon WebShell** — first-class spec migration; long-running integration request.
9. **[#15316](https://github.com/QwenLM/qwen-code/issues/15316) — Per-session working directories within a shared workspace** — needed for multi-project daemon use; pairs with PR #15323.
10. **[#15310](https://github.com/QwenLM/qwen-code/issues/15310) — Tell the model which shell it uses (Windows `cmd.exe`)** — model assumes POSIX; each wrong command burns a turn. Quick win for Windows reliability.

## 4. Key PR Progress

1. **[#15323](https://github.com/QwenLM/qwen-code/pull/15323) — feat(serve): secondary sessions can `cd` within their workspace** — realpath-contained directory changes; enables per-session cwd workflows.
2. **[#15321](https://github.com/QwenLM/qwen-code/pull/15321) — fix(cli): warn on Node 24/25 Wasm spikes without disabling AST checks** — non-blocking stderr warning recommending Node 26.12.1; addresses #15165.
3. **[#15228](https://github.com/QwenLM/qwen-code/pull/15228) — fix(cli): harden serve token resolution against project env injection** — token only from `--token`, exported env, or home `.env`; strong security posture for `qwen serve`.
4. **[#15211](https://github.com/QwenLM/qwen-code/pull/15211) — feat(serve): carry scheduled-task gate through daemon and Web Shell** — follow-up to #15069; scheduled tasks can run gate commands at fire time.
5. **[#15089](https://github.com/QwenLM/qwen-code/pull/15089) — feat(serve): give managed workspace sessions `todo_write`** — new tool profiles `/3`; existing sessions keep prior profiles.
6. **[#14904](https://github.com/QwenLM/qwen-code/pull/14904) — feat(web-shell): unified recent sessions sidebar** — collapsible Recent section merging project + no-workspace conversations.
7. **[#15303](https://github.com/QwenLM/qwen-code/pull/15303) — fix(web-shell): preserve draft attachments through refresh and allocation** — fixes two defects from #15025.
8. **[#15284](https://github.com/QwenLM/qwen-code/pull/15284) — fix(ci): scope sdk-java job lock to cache write-back** — reduces lock contention and flake surface on self-hosted runners.
9. **[#15314](https://github.com/QwenLM/qwen-code/pull/15314) — fix(managed-agent): drop removed publication constructor arg** — restores compilation of hosted tool-turn fixture post-merge.
10. **[#15174](https://github.com/QwenLM/qwen-code/pull/15174) — fix(ci): refuse a partial jobs page list before reporting** — main-branch failure reporter now validates pagination totals before publishing.

## 5. Hot Discussions

_No Discussions data was provided in the source; section omitted._

## 6. Feature Request Trends

- **Managed Agent / `serve` session management**: per-session cwd ([#15316](https://github.com/QwenLM/qwen-code/issues/15316), [PR #15323](https://github.com/QwenLM/qwen-code/pull/15323)), archived-session listing + title search ([#15077](https://github.com/QwenLM/qwen-code/issues/15077)), configurable conversations dir ([#15298](https://github.com/QwenLM/qwen-code/issues/15298)), external HTTP runtime provisioner ([#15247](https://github.com/QwenLM/qwen-code/issues/15247)).
- **Web Shell UX maturity**: terminology standardization ([#14988](https://github.com/QwenLM/qwen-code/issues/14988)), no-workspace naming ([#15309](https://github.com/QwenLM/qwen-code/issues/15309)), "Create group" menu relocation ([#15312](https://github.com/QwenLM/qwen-code/issues/15312)), full MCP tool card details ([#15280](https://github.com/QwenLM/qwen-code/issues/15280)).
- **Web search configurability**: opt-in trusted hosts / explicit `web_search` for DashScope-compatible gateways ([#15302](https://github.com/QwenLM/qwen-code/issues/15302), [#15299](https://github.com/QwenLM/qwen-code/issues/15299)).
- **MCP forward compatibility**: MCP 2026-07-28 + MCP Apps ([#8968](https://github.com/QwenLM/qwen-code/issues/8968)).
- **Platform/configuration**: shell disclosure on Windows ([#15310](https://github.com/QwenLM/qwen-code/issues/15310)), configurable worktree base dir ([#15292](https://github.com/QwenLM/qwen-code/issues/15292)).

## 7. Developer Pain Points

- **Reliability of the agent loop**: silent tool-result drops ([#15297](https://github.com/QwenLM/qwen-code/issues/15297)) and slow XML recovery ([#13787](https://github.com/QwenLM/qwen-code/issues/13787)) hurt unattended runs and token budgets.
- **Windows install/upgrade friction**: locked `node.exe` during Desktop update ([#15276](https://github.com/QwenLM/qwen-code/issues/15276)) and shell-assumption failures ([#15310](https://github.com/QwenLM/qwen-code/issues/15310)).
- **CI flakiness and infrastructure trust**: hosted-runner flakes ([#15248](https://github.com/QwenLM/qwen-code/issues/15248)), JUnit publishing failures ([PR #15322](https://github.com/QwenLM/qwen-code/pull/15322)), repeated main-CI failures ([#15307](https://github.com/QwenLM/qwen-code/issues/15307), [#15287](https://github.com/QwenLM/qwen-code/issues/15287)).
- **Test isolation hazards**: `--no-isolate` overwriting real `~/.qwen/settings.json` ([#15267](https://github.com/QwenLM/qwen-code/issues/15267)).
- **Stale bot/manual follow-ups piling up**: deferred-review issues ([#12842](https://github.com/QwenLM/qwen-code/issues/12842), [#15301](https://github.com/QwenLM/qwen-code/issues/15301)) and merge-decision requests ([#15214](https://github.com/QwenLM/qwen-code/issues/15214)) indicate a maintainer-review bottleneck.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*