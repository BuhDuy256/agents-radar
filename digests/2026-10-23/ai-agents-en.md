# OpenClaw Ecosystem Digest 2026-10-23

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-23 04:29 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-10-23

## 1. Today's Overview

OpenClaw remains in a high-velocity but heavily bug-burdened maintenance phase. In the last 24 hours, **500 issues** and **500 PRs** were updated, with a near-even split between open and closed items (issues: 290 open / 210 closed; PRs: 279 open / 221 merged or closed). The activity pattern is overwhelmingly dominated by **regression triage and startup/recovery stability work** tied to the 2026.9.x line, alongside a single patch release (v2026.10.6) driven by an upstream Node.js security dependency. The project shows strong contributor throughput (many fresh PRs from maintainer `steipete` and the `roboclaw-bot` automation), but the density of **P0/P1 crash-loop, message-loss, and session-state bugs** — several open for weeks — signals that stability debt is outpacing feature delivery. Overall health: **active and responsive, but strained on reliability**.

## 2. Releases

**v2026.10.6** (1 new release)

- **Patched Node runtime required (breaking/environmental):** OpenClaw now requires **Node 24.22.1+** on the 24 line, or **26.12.1+** on the 26 line. These versions reject TLS chains signed with the **compromised certificate keys** addressed in the October 2026 Node.js security releases.
- **Migration notes:** Operators on older Node 24.x/26.x builds must upgrade their runtime before/alongside this release, or TLS connections may fail. Docker images already ship Node 24.2x (truncated in release notes).
- **Action item:** Self-hosted and CI environments pinned to older Node minors should verify their runtime version to avoid silent TLS rejection.

## 3. Project Progress

221 PRs were merged/closed in the last 24h. Notable themes among closed/carried-forward work:

- **UI/perf modernization (Solid migration):** A large cluster of maintainer PRs from `steipete` and `roboclaw-bot` advances the Control UI refactor — lazy-loading gateway switch confirmation ([#181302](https://github.com/openclaw/openclaw/pull/181302)), deferring background content ([#181306](https://github.com/openclaw/openclaw/pull/181306)), and **gzip boot transfer reductions** ([#181233](https://github.com/openclaw/openclaw/pull/181233): startup -12,527 B, Chat -52,342 B, New Session -32,092 B).
- **Gateway startup fix:** [#181289](https://github.com/openclaw/openclaw/pull/181289) (`steipete`) allows plugin loading to proceed before orphan marking finishes on large session stores — directly targeting the slow-startup complaint class.
- **Recovery/readiness fix:** [#181274](https://github.com/openclaw/openclaw/pull/181274) (closed) fixed a recovery fixture hanging Gateway readiness after saved chat input replay.
- **Secret handling hardening:** [#167250](https://github.com/openclaw/openclaw/pull/167250) prevents malformed UTF-8 from overwriting stored secrets (security-sensitive, awaiting maintainer).

Closed bugs include several long-standing items: Discord mention-gating ([#44502](https://github.com/openclaw/openclaw/issues/44502)), macOS memory detection skip ([#47273](https://github.com/openclaw/openclaw/issues/47273)), and Tailscale Serve claim loss ([#148308](https://github.com/openclaw/openclaw/issues/148308)).

## 4. Community Hot Topics

Ranked by comment volume:

1. **[#160959](https://github.com/openclaw/openclaw/issues/160959) — P0, 42 comments:** Gateway blocks for *minutes* while capturing large external plugins (2026.9.6 regression). The single hottest thread; `🦞 diamond lobster` rating. **Need:** event-loop yielding during plugin generation capture.
2. **[#42475](https://github.com/openclaw/openclaw/issues/42475) — P2, 27 comments:** Per-agent cost budget enforcement at the gateway. Long-running (since March), still needs product decision. **Need:** operator cost guardrails without external monitoring.
3. **[#11829](https://github.com/openclaw/openclaw/issues/11829) — CLOSED, 21 comments:** Security roadmap to protect API keys from agent access. **Need:** layered secret isolation from LLM context.
4. **[#157531](https://github.com/openclaw/openclaw/issues/157531) — 17 comments:** The 2026.9.7 Fixes Tracker, coordinating 18/21 established P1 candidates. **Signal:** maintainers are batching release hardening.
5. **[#140010](https://github.com/openclaw/openclaw/issues/140010) — P1, 14 comments:** Windows sleep/resume WebSocket reconnect failures (30–60s+). **Need:** thaw-recovery prioritization ahead of busy gateway.

Underlying pattern: the community's energy is concentrated on **startup/event-loop stalls, cost governance, and secret protection**, not on new capabilities.

## 5. Bugs & Stability

Severity-ranked open items updated today (no dedicated fix PR explicitly linked unless noted):

**P0 — Crash/loss class:**
- [#160959](https://github.com/openclaw/openclaw/issues/160959): Gateway blocks minutes on large plugin capture — *startup regression*.
- [#156712](https://github.com/openclaw/openclaw/issues/156712): `openclaw triage` repair subprocess won't exit, holds gateway-lifecycle lock, blocks restart.
- [#156674](https://github.com/openclaw/openclaw/issues/156674): macOS gateway resource pressure with long-lived Codex workers.
- [#158592](https://github.com/openclaw/openclaw/issues/158592): Post sleep/wake, model runtime publication times out permanently — every inbound message fails until restart.
- [#166634](https://github.com/openclaw/openclaw/issues/166634): Late reclamation checkpoint failure leaves agent unavailable after crash recovery.
- [#141615](https://github.com/openclaw/openclaw/issues/141615): WebChat "Authenticated profile verification unavailable" wedges all RPCs.
- [#166004](https://github.com/openclaw/openclaw/issues/166004): Windows scheduled-task Gateway won't start; 2026.9.8 update rolls back.
- [#141413](https://github.com/openclaw/openclaw/issues/141413): macOS app omits token for local Gateway using SecretRef.

**P1:**
- [#172837](https://github.com/openclaw/openclaw/issues/172837): Codex `nativeSubagentAssignments` never removed — re-pinned/re-sent per parent thread (message-loss).
- [#167557](https://github.com/openclaw/openclaw/issues/167557): Plugin data/settings migration never converges (Linux/npm).
- [#180690](https://github.com/openclaw/openclaw/issues/180690): `doctor --fix` heap OOM at 6 GB on ~810-agent state; ~110 min across 3 passes.
- [#138042](https://github.com/openclaw/openclaw/issues/138042): Gateway control requests stall 157–276s.
- [#160485](https://github.com/openclaw/openclaw/issues/160485): Windows plugin load CPU-bound; 3 channel plugins = 57.4s of 60s phase.
- [#145690](https://github.com/openclaw/openclaw/issues/145690), [#154716](https://github.com/openclaw/openclaw/issues/154716), [#159787](https://github.com/openclaw/openclaw/issues/159787), [#155359](https://github.com/openclaw/openclaw/issues/155359).

**Theme:** A recurring **sleep/wake + event-loop stall + session-state** cluster (Windows and macOS) is the dominant stability risk. Only #181289/#181274 have adjacent fix PRs today; most P0s lack a linked fix PR.

## 6. Feature Requests & Roadmap Signals

- **[#42475](https://github.com/openclaw/openclaw/issues/42475) Per-agent cost budgets** — high engagement, needs product decision; plausible candidate for an upcoming release given cost-control demand.
- **[#53763](https://github.com/openclaw/openclaw/issues/53763) Built-in headless browser** (now CLOSED, 18 comments) — reduced fragility for web access.
- **[#15032](https://github.com/openclaw/openclaw/issues/15032) Per-spawn tool restrictions for sub-agents** (CLOSED) — prompt-injection defense; strong security alignment.
- **[#138279](https://github.com/openclaw/openclaw/issues/138279) Linux aarch64 companion builds** (deb + AppImage).
- **[#144306](https://github.com/openclaw/openclaw/issues/144306) Automation delivery to paired nodes** (notifications).
- **[#71330](https://github.com/openclaw/openclaw/issues/71330) Configurable memory promotion target** (CLOSED) and **[#87660](https://github.com/openclaw/openclaw/issues/87660) lifecycle-aware MEMORY.md curation** — memory subsystem is a growing roadmap area.

**Prediction:** cost budgets (#42475) and sub-agent tool sandboxing (#15032) are the most likely to land in the next minor, given security/cost framing and maintainer attention.

## 7. User Feedback Summary

- **Pain points:** Startups and post-wake recovery are the top frustration — [#160959](https://github.com/openclaw/openclaw/issues/160959), [#140010](https://github.com/openclaw/openclaw/issues/140010), [#158592](https://github.com/openclaw/openclaw/issues/158592), [#157812](https://github.com/openclaw/openclaw/issues/157812) all describe multi-second-to-minute unreachability after sleep or update. Windows operators are disproportionately affected (updates, scheduled tasks, plugin load).
- **UX friction:** Mobile keyboard occlusion ([#137508](https://github.com/openclaw/openclaw/issues/137508)), WebChat duplicated assistant text ([#140723](https://github.com/openclaw/openclaw/issues/140723)), stale context-window widget ([#165421](https://github.com/openclaw/openclaw/issues/165421)).
- **Security sensitivity:** Internal runtime-context carrier leaking as visible turns across Teams ([#136360](https://github.com/openclaw/openclaw/issues/136360)), Slack/Telegram/Feishu/Discord — a cross-channel systemic concern.
- **Dissatisfaction signal:** [#151112](https://github.com/openclaw/openclaw/issues/151112) — self-hosted operators feel entangled in secret/approval loops, reducing autonomy.
- **Satisfaction signal:** High-thumbs items (e.g., sandbox bug #43996 with 👍:2, memory curation #87660 with 👍:2) indicate users actively validating fixes.

## 8. Backlog Watch

Long-unanswered or maintainer-blocked items warranting attention:

- **[#42475](https://github.com/openclaw/openclaw/issues/42475)** (since 2026-03-10): Per-agent cost budgets — 7+ months, needs product decision.
- **[#138042](https://github.com/openclaw/openclaw/issues/138042)** (since 2026-09-04): Gateway control stalls 157–276s — no fix PR, P1.
- **[#138279](https://github.com/openclaw/openclaw/issues/138279)** (since 2026-09-04): Linux aarch64 builds — stalled on product decision.
- **[#126836](https://github.com/openclaw/openclaw/issues/126836)** (since 2026-08-20): `sessions.reset` returns ok but creates no window — silently swallowed sessions.
- **[#167250](https://github.com/openclaw/openclaw/pull/167250)** (since 2026-10-08): Secret-overwrite hardening PR — security review pending.
- **[#180690](https://github.com/openclaw/openclaw/issues/180690)** (new, P1): `doctor --fix` OOM on large state — high operational impact for power users, no linked PR yet.

**Maintainer recommendation:** Prioritize a coordinated "wake/stall recovery" epic (spanning #140010, #158592, #138042, #160959) and unblock the two security reviews (#167250, plus the SecretRef macOS bug #141413) to reduce the P0 backlog before the next feature release.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report
## Personal AI Assistant / Agent Open-Source Ecosystem
**Analysis Date: 2026-10-23** | Sources: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source landscape in late 2026 is **high-velocity, security-hardening, and transitioning from single-agent assistants to distributed, multi-owner agent platforms**. Across all five projects, intake of issues and PRs substantially outpaces merge throughput, indicating a market where user ambition (federation, remote execution, memory governance) is running ahead of maintainer bandwidth. A common maturation arc is visible: every project except the dormant IronClaw is in an active **stability/security hardening phase** — patching sleep/wake recovery, credential isolation, approval-model gaps, and supply-chain integrity rather than shipping headline features. Community discourse is converging on **trust, control, and interoperability** — least-privilege enforcement, memory/cost governance, and cross-gateway collaboration — rather than raw capability. Meanwhile, platform-specific reliability debt (especially Windows) and documented-but-unenforced security controls are the ecosystem's most recurring dissatisfaction signals.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Merge/Close Throughput | Release Status | Health Score |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (290 open / 210 closed) | 500 (279 open / 221 merged/closed) | **High** (~221/day) | v2026.10.6 (Node TLS security patch) | 🟡 Active but **reliability-strained** |
| **Hermes Agent** | 50 (49 open / 1 closed) | 50 (41 open / 9 closed) | **Low** (9/50, mostly old backlog) | None | 🟠 Very high activity, **backlog growing** |
| **IronClaw** | 2 (1 open / 1 closed) | 6 (5 open / 1 closed) | **Minimal** (Dependabot only) | None | 🟢 Quiet / **maintenance mode** |
| **QwenPaw** | 22 (20 open / 2 closed) | 50 (48 open / 2 merged) | **Low** (2/50, release-cut freeze) | **v2.2.2.post1 (security patch)** | 🟢 Strong responsiveness, **review bottleneck** |
| **ZeroClaw** | 35 | 50 (42 open / 8 closed) | **Zero merged** | None (pre-v0.9.0 freeze) | 🟡 Disciplined stabilization, **merge-queue gated** |

**Legend:** Health Score weights activity, throughput, stability, security posture, and backlog risk.
**Key observation:** Only OpenClaw demonstrates high merge throughput; Zeroclaw and QwenPaw are functionally frozen (release gate / review backlog); Hermes has intake ≫ resolution; IronClaw is inert.

---

## 3. OpenClaw's Position

### Advantages vs Peers
- **Scale & responsiveness:** With ~500 issues + ~500 PRs touched in 24h and ~221 PRs merged, OpenClaw operates at an order of magnitude greater throughput than any peer. It is the de facto **reference implementation** of the ecosystem.
- **Infrastructure maturity:** Only project with active release cadence (v2026.10.6), Docker images, cross-platform companions, and formal triage automation (`roboclaw-bot`).
- **Broadest channel and platform surface:** Covers Discord, Slack, Telegram, Feishu, Teams, WebChat, plus Windows/macOS/Linux companions.

### Technical Approach Differences
- **Gateway-centric architecture:** A single long-lived gateway process brokers sessions, plugins, and channels — powerful but the **root cause of its dominant failure class** (event-loop stalls, plugin capture blocking for minutes, sleep/wake reconnect failures). Peers like ZeroClaw are explicitly moving *away* from mandatory gateways (CLI-only builds, PR #11975).
- **Plugin model is heavyweight:** Large external plugin capture is the P0 hot topic (#160959), whereas QwenPaw is refactoring channels into subprocess-isolated plugins (PR #8187) and ZeroClaw treats plugins as installable release artifacts.

### Community Size Comparison
| Dimension | OpenClaw | Peers |
|---|---|---|
| Daily issue/PR churn | ~1000 events | 8–100 events |
| Top thread engagement | 42 comments (P0) | 40 (Hermes), 15 (ZeroClaw), 7 (QwenPaw), 0 (IronClaw) |
| Reaction signal | Moderate | Hermes leads (42 👍 on #18715) |
| Contributor breadth | Maintainer + automation dominant | Hermes/QwenPaw show more first-time contributors |

**Verdict:** OpenClaw is the ecosystem's **center of gravity and de facto standard**, but its stability debt (many P0 crash-loop/session-state bugs open for weeks without fix PRs) is the ecosystem's largest single risk. Its breadth is a moat; its reliability is its exposure.

---

## 4. Shared Technical Focus Areas

The following requirements emerge **independently across multiple projects**, signaling genuine ecosystem-wide demand:

| Cross-Cutting Need | Projects | Specific Evidence |
|---|---|---|
| **Multi-agent / cross-gateway collaboration** | OpenClaw, Hermes, ZeroClaw | Hermes #97681 (federated bots) + #18715 (remote agent/local tools, 42 👍); OpenClaw sub-agent tool sandboxing #15032; ZeroClaw delegate allowlist #8279 |
| **Least-privilege & enforced tool restrictions** | OpenClaw, Hermes, ZeroClaw | OpenClaw #15032; Hermes approval-gate expansion #142834; ZeroClaw #8279 (allowlist bypass), #11989 (`excluded_tools` ignored) |
| **Approval-model maturity beyond shell/code** | Hermes, OpenClaw, ZeroClaw | Hermes #141346 (`osascript` data loss), #142834; OpenClaw secret/approval friction #151112; ZeroClaw SOP authority escalation |
| **Memory governance (budget + write-time acceptance)** | OpenClaw, Hermes, QwenPaw | OpenClaw #87660 lifecycle-aware MEMORY.md; Hermes #135039 budget/acceptance; QwenPaw memory context PR #8376 |
| **Cost guardrails / per-agent budgets** | OpenClaw, Hermes, QwenPaw | OpenClaw #42475 (7+ months open); Hermes #135039 (turn-injection cost); QwenPaw media replay runaway #8335 |
| **Credential / secret isolation** | OpenClaw, ZeroClaw, Hermes | OpenClaw #11829 (API keys from agent context); ZeroClaw OIDC credential encoding #11957; Hermes supply-chain SHA256 pins |
| **Session lifecycle correctness (resume / cold-load / cancel)** | OpenClaw, Hermes, ZeroClaw | OpenClaw #126836 (silent session loss); Hermes #139796 (cold resume not_found), #136713; ZeroClaw session store #11898 |
| **Platform portability (Windows, ARM64)** | OpenClaw, Hermes, IronClaw, QwenPaw | Windows dominates OpenClaw/Hermes bugs; IronClaw ARM64 #3168; QwenPaw Windows CRLF/GBK PRs #8234/#8235 |
| **Supply-chain / release-artifact integrity** | OpenClaw, Hermes, ZeroClaw, QwenPaw | OpenClaw Node TLS patch; Hermes Electron/TTS checksums; ZeroClaw Discord release-binary proof #10999; QwenPaw emSign CA fix |

**Signal:** The ecosystem is collectively discovering that **autonomy must be paired with enforceable policy, and policy must be verifiable in shipped artifacts**. This is the defining requirement wave of 2026-10.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Primary focus** | Broad multi-channel gateway platform | Distributed, collaborative personal agents | Rust/WASM benchmarked agent | Extensible, team/Hub-oriented assistant | Security-hardened, least-privilege agent |
| **Target users** | Self-hosted power operators, enterprises | Multi-owner, multi-machine enthusiasts | Benchmark/ML evaluators | Teams, plugin builders | Security-conscious operators, fleets |
| **Architecture** | Gateway-centric, heavy plugins | Gateway + profiles, remote/local split | Lightweight, benchmark-driven | Hub + channels-as-plugins (subprocess isolation) | Gateway-optional (CLI-only), policy-language |
| **Distinctive feature** | Channel breadth, Control UI (Solid) | Cross-gateway federation, remote tools | Daily failure taxonomy telemetry | v2.3.0 plugin/theme extensibility | Sender-role policy, SOP authority model |
| **Unique strength** | Throughput, scale, reference status | Community vision alignment | Disciplined dependency hygiene | Fast security response, roadmap clarity | Security-issue rigor, structured triage |
| **Unique exposure** | Reliability debt, P0 backlog | Backlog growth, Windows gaps | Dormancy, silent ARM64 closure | Review bottleneck (48 open PRs) | Merge-queue gating (0 merges/day) |
| **Release posture** | Frequent patches | None recently | None | Security patch cadence | Pre-v0.9.0 freeze |

**Interpretation:**
- **OpenClaw** and **Hermes** compete on **breadth and ambition** — the generalist platforms.
- **ZeroClaw** is the **security-specialist** — it treats least-privilege and provable releases as first-class, and its issue quality (allowlist bypasses, SOP escalation) reflects a security-literate community.
- **QwenPaw** is the **extensibility play** — Hub-based team operations plus a plugin ecosystem refactor aimed at v2.3.0.
- **IronClaw** is the **evaluation/research outlier** — Rust/WASM performance focus, currently idle.
- **Hermes** is the **federation visionary** — cross-gateway collaboration and split compute/execution are its signature bets.

---

## 6. Community Momentum & Maturity

### Activity Tiers

**Tier 1 — High-Velocity Iterators (rapid, but strained)**
- **OpenClaw** — Highest absolute velocity; stability-limited.
- **Hermes Agent** — Very high intake, low merge throughput; architecturally ambitious; backlog risk.

**Tier 2 — Stabilizing / Release-Gated (controlled pace)**
- **ZeroClaw** — Deliberate freeze ahead of v0.9.0; disciplined bug/security work; merge queue is the bottleneck.
- **QwenPaw** — Security-driven release cycle; responsive but review-throttled; v2.3.0 extensibility roadmap forming.

**Tier 3 — Maintenance / Dormant**
- **IronClaw** — Automated dependency churn only; no human-authored progress.

### Maturity Assessment

| Project | Iteration Speed | Process Maturity | Trust/Security Maturity |
|---|---|---|---|
| OpenClaw | 🔴 Very fast | 🟢 High (triage automation, releases) | 🟠 Reactive (security reviews stalling) |
| Hermes | 🔴 Very fast | 🟡 Medium (long PR latency, needs-decision tags) | 🔴 Incident-driven (#141346 data loss) |
| QwenPaw | 🟢 Fast, gated | 🟢 High (release-duty verification, security notices) | 🟢 Strong (fast CA/kill-switch response) |
| ZeroClaw | 🟡 Staged | 🟢 High (stacked PRs, S0/S1 labeling, release spec tracker) | 🟢 Strong (proactive bypass discovery) |
| IronClaw | ⚪ Minimal | 🟡 Automated hygiene only | ⚪ N/A |

**Key insight:** **Governance maturity does not track activity volume.** ZeroClaw and QwenPaw — the smaller, less-churned projects — show the most disciplined release/security processes, while OpenClaw and Hermes trade process for raw speed. For a decision-maker, this means the reliability of a project is better predicted by **process discipline than by commit velocity**.

---

## 7. Trend Signals

### Industry Trends Extracted from Community Feedback

**1. From "assistant" to "fleet/federation."**
The single strongest future signal is Hermes' #97681 (cross-gateway collaboration, 40 comments) and #18715 (remote agent + local tools, 42 👍), echoed by OpenClaw sub-agent sandboxing and ZeroClaw delegation. **Developers should architect for inter-agent identity, trust boundaries, and message routing now**, because single-agent designs will hit federation walls within the next release cycle.

**2. Policy is the new security perimeter — and it's currently under-specified.**
Every security-mature project is fighting "documented controls that don't enforce": ZeroClaw's `excluded_tools` ignored, delegate allowlist bypass, SOP authority gaps; OpenClaw's secret exposure; Hermes' `osascript` auto-approval data loss. **Developers building on this ecosystem must assume tool/skill sandboxing is a liability, not a guarantee**, and should prefer architectures with **explicit, testable policy enforcement** (ZeroClaw's approach is the model to watch).

**3. Approval models must understand *consequence*, not just *command type*.**
The Hermes #141346 incident (smart approval closing unsaved PowerPoint, deleting exports) is the clearest signal that current shell/code-execution approval heuristics are insufficient. **The next wave of agent safety will be semantic/destructive-action-aware** — a substantial greenfield opportunity for tooling vendors.

**4. Memory is becoming a governed resource, not just a store.**
OpenClaw, Hermes, and QwenPaw are all independently building memory **budgets, acceptance gates, and lifecycle curation**. Per-turn memory injection cost/latency (#135039) and privacy overreach (#116788) are forcing write-time policy. **Memory subsystems are transitioning from "feature" to "cost/privacy surface" requiring governance.**

**5. Reliability ≠ stability across platforms — Windows is the ecosystem's weak flank.**
Windows update failures, permission mismatches, plugin CPU stalls, and kanban deadlocks dominate Hermes and OpenClaw bug reports. **Cross-platform testing (especially Windows and ARM64) is a durable competitive differentiator** and an underserved gap across all projects.

**6. Release-artifact trust is a first-class user concern.**
ZeroClaw's demand to "prove Discord plugin installs from a *published* binary," QwenPaw's emSign/CA remediation, and Hermes' checksum pins show users now verify **what actually shipped**, not just what passed CI. **Reproducible, verifiable releases are moving from best practice to baseline expectation.**

**7. The merge/review pipeline — not contributor supply — is the ecosystem's binding constraint.**
Four of five active projects show open-PR counts 5–24× their daily merge rate. **For maintainers, review bandwidth (not development) is the growth limiter; for contributors, this means PR success increasingly depends on aligning with release gates and maintainer priorities.**

---

### Bottom Line for Technical Decision-Makers

- **For production deployments today:** OpenClaw offers the most capability and channels but carries the highest reliability/security-review risk; ZeroClaw offers the strongest safety posture but is pre-v0.9.0; QwenPaw offers the best release discipline and extensibility roadmap.
- **For platform builders:** Bet on **federation primitives, enforceable policy engines, and governed memory** — these are the three unmet needs every project is independently confirming.
- **For contributors/investors:** The ecosystem's bottleneck is **maintainer review throughput and cross-platform reliability**, not ideas. Projects that solve review scaling and Windows/ARM parity will convert community energy into shipped value fastest.
- **Watch items:** Hermes' federation decisions (#97681, #18715), ZeroClaw's v0.9.0 authority stack and the unmitigated #8279/S0 bypass, and OpenClaw's wake/stall recovery epic — these will shape the ecosystem's next quarter more than any new feature.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest
**Date: 2026-10-23** | Source: github.com/nousresearch/hermes-agent

---

## 1. Today's Overview

Hermes Agent shows **very high sustained activity** on 2026-10-23: 50 issues and 50 PRs updated in the last 24h, with only 1 issue closed and no new releases. The open/active ratio is heavily skewed (49/50 issues, 41/50 PRs open), indicating a **growing backlog** where intake outpaces resolution — typical of a rapidly evolving agent platform but a potential maintainer-bandwidth risk. The day's signal is dominated by **two clusters**: (a) gateway/multi-profile/session-state correctness bugs (message misdelivery, session resume failures, profile leakage), and (b) **security and approval-gate concerns**, including a severe data-loss incident via `osascript` auto-approval and supply-chain hardening PRs. Community engagement is highest on foundational collaboration & remote-execution features (#97681, #18715), suggesting the community is pushing Hermes toward **multi-agent, multi-owner, distributed** operation.

**Activity assessment: HIGH** (issue/PR churn well above typical OSS norms), but **merge throughput is low** (9 of 50 PRs closed/merged), and the majority of closed PRs today are older, long-lived branches — a sign of backlog clearing rather than fresh velocity.

---

## 2. Releases

**None.** No new releases in the last 24h.

⚠️ Related hygiene issue: [`hermes update` leaves release tags stale](#143361) — users on a checkout already at the release commit see outdated `hermes --version` output (e.g. `0.22.2+3030.g4d04303`). Not a release, but it distorts version reporting.

---

## 3. Project Progress

### PRs merged/closed today (9 total)

| PR | Status | Area | Impact |
|---|---|---|---|
| [#47532](https://github.com/NousResearch/hermes-agent/pull/47532) | CLOSED | `type/security`, dashboard auth | **Removes legacy dashboard session token** — pluggable OAuth gate becomes sole identity gate; loopback bind now runs no identity gate |
| [#51590](https://github.com/NousResearch/hermes-agent/pull/51590) | CLOSED | gateway telemetry | Structured start-blocked telemetry + crash-loop visibility on `/api/status` |
| [#52423](https://github.com/NousResearch/hermes-agent/pull/52423) | CLOSED | Discord gateway | Deletes orphaned auto-thread seed message on fallback failure (fixes #52422) |
| [#70608](https://github.com/NousResearch/hermes-agent/pull/70608) | CLOSED | webhooks/Discord | Creates a Discord thread per webhook event; first response becomes thread starter |
| [#96100](https://github.com/NousResearch/hermes-agent/pull/96100) | CLOSED | STT backend | Managed tool gateway becomes **default STT backend** (avoids on-host Whisper downloads/CPU burn on Cloud) |
| [#105589](https://github.com/NousResearch/hermes-agent/pull/105589) | CLOSED | TUI | Terminal tab/window titles now configurable |
| [#118554](https://github.com/NousResearch/hermes-agent/pull/118554) | CLOSED | telemetry | Shared-metrics opt-in across Desktop onboarding, Settings, CLI, automated instances |
| [#122097](https://github.com/NousResearch/hermes-agent/pull/122097) | CLOSED | TTS install UX | Reports pm's first-use install reason instead of generic hint |

**Notable batch effect:** seven of nine closed PRs are authored by the same contributor (`benbarclay`) and are **long-lived branches (June–September)** now landing — this reads as a deliberate backlog-clearing push, not new-development velocity.

### Features advanced (still open)
- **Gateway ownership correctness**: [#106221](https://github.com/NousResearch/hermes-agent/pull/106221) keeps Settings/session mutations on owner gateway in two-gateway Desktop setups.
- **Local-model resilience**: [#140109](https://github.com/NousResearch/hermes-agent/pull/140109) resume interrupted downloads / discard partials.
- **Supply chain**: [#82891](https://github.com/NousResearch/hermes-agent/pull/82891) (kittentts SHA256 pin) and [#82889](https://github.com/NousResearch/hermes-agent/pull/82889) (Electron mirror checksum verification).

---

## 4. Community Hot Topics

Ranked by comment count / reactions:

1. **[#97681 — Let Bots collaborate across gateways](https://github.com/NousResearch/hermes-agent/issues/97681)** — *40 comments, 4 👍* | `type/feature`, gateway, sessions
   The most-discussed item. Personal Bots (own models, tools, memory, credentials) working together **across machines and owners without surrendering control**. This is a foundational architecture thread — the community is debating trust boundaries, identity, and inter-gateway messaging. Underlying need: **federated personal-agent collaboration.**

2. **[#141346 — Smart approval auto-approved osascript, causing unrecoverable data loss](https://github.com/NousResearch/hermes-agent/issues/141346)** — *35 comments* | `type/security`, tools, macOS
   Agent drove user's live PowerPoint via `osascript` to render its deck to PNG; commands passed `smart` approval, closed an unsaved deck and deleted its export. Underlying need: **a principled approval model that understands destructive system-level automation**, not just shell/code execution.

3. **[#18715 — Support remote Hermes agent with local tool execution](https://github.com/NousResearch/hermes-agent/issues/18715)** — *29 comments, **42 👍 (highest reaction in dataset)*** | `type/feature`, agent/gateway/tools
   Strong community demand: remote agent (skills/memory/sessions/models on Machine B) with **tool execution kept local on Machine A**. Underlying need: split compute/execution for security, latency, and resource locality.

4. **[#135039 — Budget enforcement + acceptance pipeline for MEMORY.md / USER.md](https://github.com/NousResearch/hermes-agent/issues/135039)** — *15 comments* | `type/feature`, memory, compression
   Memory injected every turn has cost/latency implications; no write-time budget or acceptance test. Needs: **cost governance and memory quality control.**

5. **[#83047 — kanban `blocker_auth` respawn guard parks a ready task forever](https://github.com/NousResearch/hermes-agent/issues/83047)** — *9 comments* | `type/bug`, cron, plugins
   Auth-shaped dispatch failure blocks permanently (no drain), unlike the finite rate-limit sentinel. Needs: **uniform failure/recovery semantics.**

**Pattern:** the top threads center on **trust, control, and interoperability** — users want Hermes to be composable and distributed without ceding ownership, and they want the safety model to mature alongside autonomy.

---

## 5. Bugs & Stability

Ranked by severity (P2/P3 + impact):

### 🔴 Critical / Data-loss
- **[#141346](https://github.com/NousResearch/hermes-agent/issues/141346)** — `type/security` + data loss. Smart approval allowed `osascript` to close unsaved PowerPoint and delete export. **Unrecoverable user data.** No fix PR visible. *Highest-priority stability item.*
- **[#136713](https://github.com/NousResearch/hermes-agent/issues/136713)** — Dashboard chat re-attach (PTY/WS churn) **hard-interrupts in-flight turn**; sessions close with `end_reason=tui_shutdown`. Work destroyed. No fix PR visible.

### 🟠 High (P2, functional breakage)
- **[#143331](https://github.com/NousResearch/hermes-agent/issues/143331)** — `hermes update` fails every run on Windows; stale `gateway.pid` + held lock aborts gateway pause; stable-channel downgrade refusal exits 1.
- **[#139091](https://github.com/NousResearch/hermes-agent/issues/139091)** — `hermes update` 10s merge-base probe times out even when commits are local (partial clone, commit-graph writes disabled). Blocks updates entirely.
- **[#139796](https://github.com/NousResearch/hermes-agent/issues/139796)** — Desktop `session.resume` returns `not_found` for cold/evicted sessions (no cold-load path). Windows + Feishu affected.
- **[#140189](https://github.com/NousResearch/hermes-agent/issues/140189)** — Gateway retries undeliverable process-completion notification **every 5s forever** (no backoff/cap/log). Silent resource leak.
- **[#142271](https://github.com/NousResearch/hermes-agent/issues/142271)** — Windows kanban managed_worker **deadlocks importing numpy** in memory-provider plugin (loader-lock race).
- **[#136315](https://github.com/NousResearch/hermes-agent/issues/136315)** — Acknowledged async delegation completion **lost** at follow-up recursion cap (delivery marked `delivered` but never reaches parent).
- **[#116788](https://github.com/NousResearch/hermes-agent/issues/116788)** — Background memory reviewer persists facts user explicitly asked not to save. **Privacy regression.**
- **[#143326](https://github.com/NousResearch/hermes-agent/issues/143326)** — Windows Desktop/gateway admin-vs-user permission mismatch after update; model selection delay.
- **[#143158](https://github.com/NousResearch/hermes-agent/issues/143158)** — Catalog plugin hooks stay inactive after gateway restart; only explicit reload registers them.

### 🟡 Medium (P3)
- **[#143364](https://github.com/NousResearch/hermes-agent/issues/143364)** — Secondary profile's mid-turn progress delivered via **primary (launch-profile) bot** — profile leakage.
- **[#142925](https://github.com/NousResearch/hermes-agent/issues/142925)** — Desktop Context-usage popover permanently empty for non-resident sessions.
- **[#142820](https://github.com/NousResearch/hermes-agent/issues/142820)** — `hermes cron run` ignores global emergency stop (`hermes pause`). **Safety hole.**
- **[#143383](https://github.com/NousResearch/hermes-agent/issues/143383)** / **[#143382](https://github.com/NousResearch/hermes-agent/issues/143382)** — Disbanded Group Chats resurrect as live rooms / continue accepting events (two related reports).
- **[#123629](https://github.com/NousResearch/hermes-agent/issues/123629)** — Discord slash-command sync times out; plugin commands never register.
- **[#142248](https://github.com/NousResearch/hermes-agent/issues/142248)** — Desktop Group Chats lost cross-machine rooms, reply-in-thread, @ picker since #106742.

**Fix PRs in flight:** [#137187](https://github.com/NousResearch/hermes-agent/pull/137187) (stop agent when turn task cancelled — touches #136713 path), [#128570](https://github.com/NousResearch/hermes-agent/pull/128570) (Photon zombie-stream liveness), [#113240](https://github.com/NousResearch/hermes-agent/pull/113240) (sidecar-rotation lockout self-heal), [#140935](https://github.com/NousResearch/hermes-agent/issues/140935) (oneshot iteration-budget class). Most top-severity issues still **lack a linked fix PR**.

**Theme:** Windows stability, session lifecycle (cold resume / eviction / cancel), and **profile isolation** are the dominant stability risks.

---

## 6. Feature Requests & Roadmap Signals

| Issue | Area | Signal Strength |
|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) Cross-gateway Bot collaboration | gateway, sessions | **Very high** (40 comments) |
| [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) Remote agent + local tools | agent/gateway | **Very high** (42 👍) |
| [#135039](https://github.com/NousResearch/hermes-agent/issues/135039) MEMORY.md budget + write-time acceptance | memory | High |
| [#116564](https://github.com/NousResearch/hermes-agent/issues/116564) MEMORY.md as anchor for a doc chain | memory, compression | Medium |
| [#142834](https://github.com/NousResearch/hermes-agent/issues/142834) Approval gate for `write_file` | security | Medium |
| [#138458](https://github.com/NousResearch/hermes-agent/issues/138458) Kanban dispatcher: assignee profile authoritative (opt-in `worker_policy`) | agent/tools | Medium |
| [#115639](https://github.com/NousResearch/hermes-agent/issues/115639) Autonomous self-healing updates for 24/7 fleets | install-update | Medium (RFC) |

**Prediction for next version:** likely to see shipping of **(1) memory-write governance** (budget + acceptance, given two convergent issues), **(2) approval-gate expansion beyond shell/code** (driven by #141346 severity), and **(3) update-path robustness** (Windows + merge-base fixes). Cross-gateway collaboration (#97681) reads as a larger architectural epic — foundational PRs may land incrementally rather than as one release.

---

## 7. User Feedback Summary

**Pain points (verbatim themes):**
- *"closed the user's unsaved PowerPoint deck and deleted its export (unrecoverable data loss)"* — approval model cannot reason about destructive system automation.
- *"work is destroyed, sessions close with end_reason=tui_shutdown"* — reconnecting a chat UI kills running work.
- *"hermes update fails every run on Windows"* — update path is the top recurring operational complaint across multiple reporters.
- *"retried forever, every 5 seconds, with no backoff, no cap"* — silent resource leaks under gateway.
- *"can persist facts the user explicitly asked not to save"* — memory reviewer overrides user intent (privacy trust erosion).
- *"Desktop Group Chats lost cross-machine rooms, reply-in-thread and the @ picker"* — regression from #106742 against documented behavior.

**Satisfaction signals:**
- High engagement on architectural features (42 👍 for #18715; 40 comments on #97681) shows **strong community investment** in Hermes' direction.
- Multiple thoughtful, well-diagnosed bug reports (e.g. #139091's partial-clone detail, #142271's loader-lock race) indicate a **technically sophisticated user base** willing to root-cause issues.

**Dissatisfaction signals:**
- Repeated **Windows** breakage (update, permissions, kanban deadlock) suggests platform-testing gaps.
- **Regressions** against documented behavior (#142248) damage trust in release stability.
- Profiles leaking across bots (#143364) and memory overreach (#116788) touch on **control and privacy**, the same trust axis as the top feature requests.

---

## 8. Backlog Watch

Long-lived, high-value items needing maintainer attention:

1. **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)** — *Open since 2026-05-02 (~174 days)*, 29 comments, **42 👍**. Remote-agent/local-tools remains the community's #1 reaction-scored request with no visible implementation PR.
2. **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)** — *Open since 2026-08-29 (~55 days)*, 40 comments, tagged `needs-decision`. Foundational cross-gateway collaboration blocked on a decision.
3. **[#83047](https://github.com/NousResearch/hermes-agent/issues/83047)** — *Open since 2026-08-10 (~74 days)*, `P2`, `needs-decision`. Kanban permanent-park bug; no fix PR.
4. **[#136315](https://github.com/NousResearch/hermes-agent/issues/136315)** — Async delegation completion loss; `sweeper:risk-message-delivery`, no fix linked.
5. **[#115639](https://github.com/NousResearch/hermes-agent/issues/115639)** — Self-healing updates RFC; *open since 2026-09-19*, relevant to the wave of update bugs.
6. **[#106221](https://github.com/NousResearch/hermes-agent/pull/106221)** — *PR open since 2026-09-09 (~44 days)*, gateway ownership correctness — an old PR still awaiting merge.
7. **[#24304](https://github.com/NousResearch/hermes-agent/pull/24304)** — *PR open since 2026-05-12 (~164 days)*, diff-aware tool preview truncation — **oldest open PR highlighted**, carrying `sweeper:blast-moderate`.
8. **[#47532](https://github.com/NousResearch/hermes-agent/pull/47532)** — **CLOSED today** after ~128 days; a reminder that several multi-month PRs were only just resolved.

---

### Health Snapshot

| Dimension | Assessment |
|---|---|
| Activity | 🟢 Very high (100 issue+PR updates/24h) |
| Merge throughput | 🟡 Low (9/50 PRs closed; mostly old backlog) |
| Stability | 🔴 Windows, session lifecycle, profile isolation |
| Security posture | 🟠 Active hardening (supply-chain PRs, approval Gaps) but one data-loss incident |
| Community engagement | 🟢 Strong, sophisticated, direction-aligned |
| Backlog risk | 🟠 Intake >> resolution; several multi-month high-👍 items awaiting decisions |

**Bottom line:** Hermes Agent is a fast-moving, community-energized project with clear architectural ambition (distributed, collaborative personal agents) — but its **open-issue growth, multi-month PR latency, and Windows/session-state regressions** are the trends to watch. The single most urgent item is approval-model hardening following the **#141346 data-loss incident**; the highest-leverage decisions are **#18715** and **#97681**.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-10-23

## 1. Today's Overview

IronClaw showed **moderate maintenance activity** over the past 24 hours, dominated by automated dependency management rather than substantive feature work. Of 6 updated PRs, 5 remain open and 1 was closed—the closed item (#8149) was simply superseded by a newer Dependabot bump (#8155), not a meaningful merge. Only 2 issues were touched: one closed long-running ARM64 support request (#3168) and one new open daily benchmark taxonomy report (#8153). With **zero new releases** and no human-authored PRs in the pipeline, today's activity is best characterized as routine hygiene rather than project momentum.

## 2. Releases

No new releases were published in the last 24 hours. The most recent release information is unavailable in this dataset.

## 3. Project Progress

- **[PR #8149](https://github.com/nearai/ironclaw/pull/8149) [CLOSED]** — Dependabot bump of `dompurify` from 3.4.12 → 3.4.16. Closed and immediately replaced by #8155, which targets the newer 3.4.17. This represents a routine supersession, not a merged feature.
- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168) [CLOSED]** — "Add arm64/aarch64 platform support for Docker builds." Closed after ~6 months open. The closure suggests either ARM64 Docker support was resolved elsewhere or the issue was deemed out of scope; however, no linked fix PR is visible in this dataset, so **the resolution mechanism is unclear and worth confirming**.

**Net progress today: minimal.** No human-authored code was merged.

## 4. Community Hot Topics

Activity levels across all items are **uniformly low**—every issued/PR today has 0 comments and 0 reactions, indicating limited community engagement in this window.

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** — Daily failure taxonomy for 2026-10-22 (officeqa, 64 non-pass tasks). This is part of an apparently automated daily benchmarking ritual; notable for revealing that **DeepSeek-V4-Flash errors are "overwhelmingly genuine model-quality errors"**, which is a signal about model selection rather than IronClaw's own code.
- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — ARM64 Docker support, the most substantive non-automated item of the day despite being closed without visible discussion.

**Underlying need:** The community's most visible demand remains **platform portability (ARM64)**, while maintainers are investing in **continuous model-quality telemetry** via the failure taxonomy.

## 5. Bugs & Stability

No new bugs, crashes, or regressions were reported today. Two dependency-bump clusters touch security-adjacent and build-tooling packages:

- **[PR #8155](https://github.com/nearai/ironclaw/pull/8155)** — `dompurify` 3.4.12 → 3.4.17 (frontend). DOMPurify is an XSS-sanitization library; the 3.4.16 release notes reference "a problem with" sanitization behavior. **Recommend prioritizing this bump** as it may carry a security-relevant fix. Severity: **moderate** (security hygiene).
- **[PR #8156](https://github.com/nearai/ironclaw/pull/8156)** / **[#8158](https://github.com/nearai/ironclaw/pull/8158)** — Storybook 10.5.7 → 10.6.2 (dev-only). Severity: **low**.
- **[PR #8154](https://github.com/nearai/ironclaw/pull/8154)** — Vite 8.1.3 → 8.1.6 (dev/build). Severity: **low**.
- **[PR #8157](https://github.com/nearai/ironclaw/pull/8157)** — `certifi` 2026.7.22 → 2026.10.19 in e2e tests, includes CA root changes ("Restore unaffected emSign roots"). Severity: **low** but could affect TLS behavior in e2e runs.

No fix PRs for runtime bugs exist today because no runtime bugs were reported.

## 6. Feature Requests & Roadmap Signals

- **ARM64/aarch64 Docker builds** ([#3168](https://github.com/nearai/ironclaw/issues/3168)) — now closed, but the discussion notes Cranelift already supports aarch64 and only armv7 remains blocked (#1339). If the closure was a true resolution, expect **official multi-arch images** to appear in a near-term release. If closed as stale, this may resurface.
- No new feature requests were filed in this window.

**Prediction:** The next release (whenever it lands) will most likely bundle a **multi-arch Docker image** (if #3168 was genuinely resolved) plus accumulated Dependabot bumps (DOMPurify, Vite, Storybook).

## 7. User Feedback Summary

Real-user signals are sparse today, but two themes emerge:

1. **Platform compatibility pain** — The ARM64 issue ([#3168](https://github.com/nearai/ironclaw/issues/3168)) reflects users on Apple Silicon and ARM servers being unable to run official images. This is a common friction point for Rust/WASM projects and directly affects local developer experience.
2. **Model reliability concerns** — The failure taxonomy ([#8153](https://github.com/nearai/ironclaw/issues/8153)) indicates that benchmark non-passes are attributable to **model choice (DeepSeek-V4-Flash) rather than IronClaw itself**, implying users should consider stronger models for officeqa-style tasks.

No explicit satisfaction/dissatisfaction statements were logged (0 comments, 0 reactions across all items).

## 8. Backlog Watch

- **[Issue #1339](https://github.com/nearai/ironclaw/issues/1339)** (referenced but not in today's list) — ARMv7 (32-bit) limitation, cited as the remaining blocker after #3168 closed. **Maintainer attention recommended** to clarify whether 32-bit ARM is permanently out of scope.
- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — Closed without a visible linked resolution PR. **Worth a follow-up comment from maintainers** confirming whether ARM64 Docker support actually shipped, as silent closures erode community trust.
- The **daily failure taxonomy issue series** ([#8153](https://github.com/nearai/ironclaw/issues/8153) and predecessors) is accumulating automatically with little human triage — consider assigning an owner to extract actionable model-selection guidance from these reports.

---

**Bottom line:** IronClaw is in a **quiet, maintenance-mode phase** as of 2026-10-23. No releases, no human PRs, and only automated dependency churn. The most newsworthy item is the **silent closure of the ARM64 Docker request**—if that reflects a real resolution, it's genuine progress; if not, it deserves maintainer clarification.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-10-23

## 1. Today's Overview

QwenPaw is in a **high-activity, security-driven release cycle**. A fresh patch release **v2.2.2.post1** shipped today, primarily to remediate an **emSign CA trust issue across dependencies, installers, and builds** — accompanied by a formal security notice urging all users to upgrade. Issue flow remains heavy (22 updated, 20 open), with a notable cluster of **channel-integration bugs** (Telegram, DingTalk, Feishu, QQ, WeChat) and a **plugin/modularization refactor effort** (Issue #8289, PR #8187) signaling the v2.3.0 direction. Meanwhile, 50 PRs were touched today with only 2 merged/closed, indicating a **large and growing review backlog** that may be throttling throughput. Overall project health is strong on responsiveness, but the merge/review pipeline is a bottleneck worth watching.

## 2. Releases

### v2.2.2.post1 (Security Patch)
- **Chore:** Version bump to v2.2.2post1 — [PR #8369](https://github.com/agentscope-ai/QwenPaw/pull/8369)
- **Security Fix:** Remediate emSign CA trust across dependencies, installers, and builds — [PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370)

**Breaking changes / migration notes:** None formally declared. This is a **post-release hardening patch**; all users on 2.2.2 or earlier are advised to upgrade. A dedicated security notice was filed: [[Security Notice] Please upgrade to QwenPaw 2.2.2.post1 or later — Issue #8385](https://github.com/agentscope-ai/QwenPaw/issues/8385), covering Desktop installers, PyPI packages, and other distribution channels.

**Related:** A release-duty verification issue ([[Release Duty] v2.2.2.post1 — Issue #8386](https://github.com/agentscope-ai/QwenPaw/issues/8386)) was opened and **closed** today, confirming the release gate (four green platform checkpoints) passed.

## 3. Project Progress

Merged/closed PR volume today is low (2 of 50), consistent with a release-cut freeze — the primary merged item was the **release branch merge**:
- [PR #8391](https://github.com/agentscope-ai/QwenPaw/pull/8391) — `chore: merge Release/v2.2.2post1 into main` (size/L), syncing the security patch back to mainline.

**Notable features advanced (still open, under active review):**
- [PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) — `feat(channels): extract channels into plugins with subprocess isolation` (size/XXXL). A major architectural refactor aligning with Issue #8289's "lighter, more extensible" v2.3.0 goal.
- [PR #8376](https://github.com/agentscope-ai/QwenPaw/pull/8376) — `feat(memory): support PowerContext prepared context and Artifact APIs` (first-time contributor, size/XXXL).
- [PR #8337](https://github.com/agentscope-ai/QwenPaw/pull/8337) — `feat(agents): stop replaying media the model no longer needs` — directly addresses the 48 MB request-body runaway reported in Issue #8335.
- [PR #8328](https://github.com/agentscope-ai/QwenPaw/pull/8328) — `feat(deploy): offline image variant with Office/PDF toolchain`.

**Fixes in flight with fix PRs already open:**
- [PR #8375](https://github.com/agentscope-ai/QwenPaw/pull/8375) → fixes #8368 (404 on deleting selected chat)
- [PR #8303](https://github.com/agentscope-ai/QwenPaw/pull/8303) → approval prompts not reaching origin chat channel
- [PR #8299](https://github.com/agentscope-ai/QwenPaw/pull/8299) → retry without video on provider rejection
- [PR #8235](https://github.com/agentscope-ai/QwenPaw/pull/8235), [PR #8234](https://github.com/agentscope-ai/QwenPaw/pull/8234) → Windows CRLF and GBK/CP936 encoding handling in file tools

## 4. Community Hot Topics

| Rank | Item | Engagement | Link |
|---|---|---|---|
| 1 | **[Feature] Plugin-facing theme extension point** | 7 comments | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) |
| 2 | **[Feature] Coming in v2.3.0: Making QwenPaw Lighter and More Extensible** | 3 comments, 1 👍 | [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) |
| 3 | **[Bug][Console] Composer draft keyed per-agent, not per-conversation** | 3 comments | [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) |
| 4 | **[Question] HUB local model display anomaly** | 2 comments (closed) | [#8392](https://github.com/agentscope-ai/QwenPaw/issues/8392) |
| 5 | **[Feature] Hub global Skill & MCP unified management** | 2 comments, 1 👍 | [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) |

**Underlying needs analysis:**
- **Plugin ecosystem maturity** (#8071, #8289): Plugin authors want deeper control than a single `colorPrimary` knob. Combined with the v2.3.0 modularization roadmap, this signals the community is moving from "users of QwenPaw" to "builders on QwenPaw," and the API surface needs to catch up.
- **Multi-tenant / team operations** (#8275): The Hub is being used in teams, and per-user duplication of skills/MCP configs is a real friction point. A global admin-managed layer is the natural next step.
- **Console UX polish** (#8351): Draft persistence scoped to the wrong key is a small but high-visibility papercut that erodes trust in the chat experience.

## 5. Bugs & Stability

Ranked by severity (potential for data loss, service outage, or silent failure):

**Critical — Service-wide impact:**
- **[#8350](https://github.com/agentscope-ai/QwenPaw/issues/8350)** — Feishu channel executes synchronous network calls on the main event loop; when the network is unreachable, `/api/healthz` times out and **SIGTERM cannot exit**. This is a full-service wedge. *No fix PR identified yet.*
- **[#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343)** — DingTalk final replies are **silently dropped** when `sessionWebhook` expires (errcode=300001); no Open API fallback. Reproduced on main. *No fix PR identified yet.*
- **[#8335](https://github.com/agentscope-ai/QwenPaw/issues/8335)** — 48 MB request bodies and **permanently wedged sessions** due to media re-upload in history. Fix in flight: [PR #8337](https://github.com/agentscope-ai/QwenPaw/pull/8337).

**High — Channel regressions:**
- **[#8388](https://github.com/agentscope-ai/QwenPaw/issues/8388)** — QQ channel broken after upgrade: `No module named '_qwenpaw_remote_backend'`, corrupting the runtime environment for *all* tool calls. *No fix PR identified yet.*
- **[#8378](https://github.com/agentscope-ai/QwenPaw/issues/8378)** — Model invocation failure after upgrade; `active_model` config in `agent.json` no longer maps correctly.
- **[#8329](https://github.com/agentscope-ai/QwenPaw/issues/8329)** — Telegram ignores `reply_to_message`; quoted context silently dropped. Other channels implement it → consistency gap.

**Medium — UX and correctness:**
- **[#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351)** — Composer draft keyed per-agent, leaking unsent text across conversations.
- **[#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359)** — Hub-in-container Docker readiness probe hardcoded to `127.0.0.1` (Errno 111).
- **[#8374](https://github.com/agentscope-ai/QwenPaw/issues/8374)** — `QWENPAW_CORS_ORIGINS` set via Web UI/CLI doesn't take effect (constant read at import time).
- **[#8342](https://github.com/agentscope-ai/QwenPaw/issues/8342)** — Quoted replies lose control-command routing (`/stop`) across seven channels.
- **[#8368](https://github.com/agentscope-ai/QwenPaw/issues/8368)** — 404 when deleting the currently selected chat. Fix PR: [PR #8375](https://github.com/agentscope-ai/QwenPaw/pull/8375).
- **[#8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)** — Sidebar group-header overlap in source-group mode.

**Low — Developer experience:**
- **[#8377](https://github.com/agentscope-ai/QwenPaw/issues/8377)** — Bare `pytest` aborts during collection on a clean checkout (`test_backup` import mismatch). Blocks contributors following CONTRIBUTING.md.

**Observation:** The channel layer is the **single largest source of instability** — 5 of the top issues are channel-specific. This strengthens the case for [PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)'s subprocess isolation approach.

## 6. Feature Requests & Roadmap Signals

**Confirmed roadmap (from Issue #8289, "Coming in v2.3.0"):**
- Plugin refactor for a **lighter, more modular** core.
- Preliminary test results shared; maintainers actively soliciting community needs.

**Likely candidates for v2.3.0 or soon after:**
- **Global Skill & MCP management in Hub** ([#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275)) — strong team-use case, low architectural risk, 1 👍. Fits the Hub multi-user trajectory.
- **Plugin theme extension points** ([#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)) — highest-commented feature issue; natural companion to the plugin refactor.
- **Channel plugin extraction** ([#8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)) — already in PR form, size/XXXL.
- **Desktop scroll-lock toggle** ([#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339)) — open since August, simple ask, steady interest.

**Prediction:** v2.3.0 is shaping up as the **"extensibility release"** — plugin isolation, theme hooks, and Hub-shared configuration are the coherent theme. Security patches (2.2.2.post1) are a stabilizing precursor.

## 7. User Feedback Summary

**Pain points voiced:**
1. **Upgrade fragility** — Multiple users (#8388, #8378) report channels/models breaking *after* upgrading. The `_qwenpaw_remote_backend` missing-module error is particularly damaging because it makes the agent believe its own environment is corrupt, producing confusing self-diagnosis output. Upgrade paths need verification testing.
2. **Silent failures** — DingTalk (#8343), Telegram (#8329), and the quote-routing issue (#8342) all share a pattern: the agent *appears* to work but the user never receives a reply or loses context. Silent data/context loss is worse than loud errors.
3. **Team/Hub friction** — #8275 and #8392 (closed) both stem from Hub being used in real multi-user teams, where per-user config duplication and local-model display quirks surface.
4. **Contributor friction** — #8377 shows a clean checkout fails `pytest` collection, contradicting CONTRIBUTING.md and potentially deterring first-time contributors (ironic given the healthy number of `first-time-contributor` PRs today).

**Satisfaction signals:** The v2.3.0 roadmap issue (#8289) drew positive engagement (1 👍, substantive comments) and the security response was fast and transparent. Users are invested enough to file detailed, evidence-rich bug reports — a sign of an engaged community rather than churn.

## 8. Backlog Watch

Items needing maintainer attention — long-open, high-impact, or lacking a fix owner:

| Item | Age | Why it matters | Link |
|---|---|---|---|
| **[#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339)** Desktop scroll-lock toggle | ~2 months (since 2026-08-27) | Simple, well-scoped UX ask; still no PR. Low-hanging fruit for goodwill. | Link |
| **[#8078](https://github.com/agentscope-ai/QwenPaw/issues/8078)** Cross-session messages split into separate chats | ~3 weeks (since 2026-10-02) | Core/backend + Console data-model issue; conversation fragmentation affects trust in history. | Link |
| **[#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)** Plugin theme extension point | ~3 weeks, 7 comments | Most-discussed feature issue; ties into the v2.3.0 plugin work but has no linked PR. | Link |
| **[#8350](https://github.com/agentscope-ai/QwenPaw/issues/8350)** Feishu blocks main loop | 2 days | Severe, but **no fix PR yet** — deserves an owner given the SIGTERM-exit hazard. | Link |
| **[#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343)** DingTalk silent reply drop | 3 days | Reproduced on main; **no fix PR yet**. | Link |
| **[#8268](https://github.com/agentscope-ai/QwenPaw/pull/8268)** Bounded run-completion callback | 1 week (PR) | Fixes half of #8173 (runs stuck `running` forever); needs review to land. | Link |
| **[#8244](https://github.com/agentscope-ai/QwenPaw/pull/8244)** Skip disabled channel SDKs at startup | ~9 days | 15.1s startup stall on default Windows profile — real perf win, marked "Under Review." | Link |
| **[#8236](https://github.com/agentscope-ai/QwenPaw/pull/8236)** Ollama `num_ctx` sizing | ~9 days | Affects all local Ollama users' context behavior; no review activity noted. | Link |

**Backlog health assessment:** The open-PR count (48) versus merged/closed (2) today is a **significant review bottleneck**. Several fix PRs (#8268, #8244, #8236, #8303, #8299) have been open 1–9 days with no merge. If this persists, contributor momentum — currently healthy with multiple first-time contributors — could erode. Recommend maintainers triage the "Under Review" and `size/S`/`size/M` fix PRs to sustain velocity alongside the v2.3.0 refactor.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-10-23

## 1. Today's Overview

ZeroClaw is in an intense pre-v0.9.0 stabilization cycle. Activity remains very high (35 issues touched, 50 PRs updated in 24h) but is dominated by bug-fixing, security hardening, and release-gate work rather than new features. Notably, **no PRs were merged and no releases were cut today** — only 8 PRs were closed/merged in the window, against 42 still open, suggesting a review bottleneck or a deliberate freeze ahead of v0.9.0. A cluster of P1/P0 security issues (delegate allowlist bypass, SOP authority escalation, principal-scope leaks) are under active repair via stacked PRs from distinguished contributor IftekharUddin. Overall project health looks **cautious but disciplined**: the team is closing regressions (OIDC JWKS race, daemon session store) while opening release-blocking tickets (TLS WebSocket upgrade, OIDC enrollment encoding) — classic late-stage stabilization.

## 2. Releases

**No new releases today.** The most recent shipped artifact referenced in the backlog is **v0.8.6**, with **v0.8.7** tickets (plugins, email, CI) closing out and **v0.9.0** tickets accruing. Maintainers should note two v0.8.6 shipping concerns still in play:
- [#11828](https://github.com/zeroclaw-labs/zeroclaw/issues/11828) (closed) — arm64 `dist` image OOM in `docker-publish.yml`; v0.8.6 may have shipped without its `dist` image.
- [#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) (open, blocked) — Discord plugin install from release binary verified on v0.8.6, but full proof still pending.

No changelog or migration notes are available for an unreleased 0.9.0.

## 3. Project Progress

With **zero PRs merged today**, progress is best read as "repairs staged, not landed." The active merge queue is heavily stacked:

- **Identity/authority hardening (P0–P1), IftekharUddin's stack:** [#11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225) (preserve owner in delegation, P0) → [#11230](https://github.com/zeroclaw-labs/zeroclaw/pull/11230) (withhold session-data tools from non-admins) → [#11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220) (require admin authority for SOP execution) → [#11234](https://github.com/zeroclaw-labs/zeroclaw/pull/11234) (judge queued session ownership by current authority).
- **Durable rename recovery:** [#11301](https://github.com/zeroclaw-labs/zeroclaw/pull/11301) — shared committed-rename recovery across CLI, gateway, and RPC (XL, `needs-author-action`).
- **ZeroClaw without a gateway:** [#11269](https://github.com/zeroclaw-labs/zeroclaw/pull/11269) (stop metrics/embedded-web enabling the gateway), [#11975](https://github.com/zeroclaw-labs/zeroclaw/pull/11975) (CLI-only build UX), directly addressing [#11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969) and [#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971).
- **Channel correctness:** [#11990](https://github.com/zeroclaw-labs/zeroclaw/pull/11990) fixes the "excluded_tools is never applied" bug ([#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989)); [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) adds Telegram 429 flood-gating.

Closed issues today included several v0.8.7 regressions: #10558 (Cranelift CI timeout), #11357 (`plugin remove` path deletion), #11327 (plugin tool-name pre-emption), #11898 (daemon session store on fresh data dir), and #11902 (OIDC JWKS race). **Nothing merged means every fix above is still in flight.**

## 4. Community Hot Topics

| Rank | Item | Comments | Signal |
|---|---|---|---|
| 1 | [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — Tracker: runtime, dashboard sign-in, gateway delivery (P2, release:v0.9.0) | 15 | The umbrella roadmap issue for v0.9.0; everything below hangs off it. |
| 2 | [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) CLOSED — RFC: append-only session events & deterministic replay | 13 | Architecture RFC; closed suggests direction accepted, but no implementing PR is visible. |
| 3 | [#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) — Prove Discord plugin install from release binary | 9 | Release-verification rigor; real network proof on macOS arm64. |
| 4 | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — Delegate bypasses parent tool allowlist (P1, S0) | 5 | Longest-running security hole (opened June, still open, updated today). |

**Underlying needs:** the community is converging on three demands — (a) *provable* release artifacts (plugins must be installable from a published binary, not just in-tree), (b) *principled* session/state semantics (event sourcing, deterministic replay, survivor sessions), and (c) *enforceable* least-privilege (delegate, SOP, channel-scoped tools). The tracker #7432 is functioning as an informal release spec.

## 5. Bugs & Stability

Ranked by declared severity and exploitability:

**S0 / P1 — Security-critical**
- [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — `delegate` filters the *unfiltered* parent tool set, so a sub-agent can invoke tools the parent policy excludes. **No linked fix PR found.** This is the highest-risk open item and has been open ~4 months.
- [#11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225) (P0) — memory delegation loses principal scope; fix staged.

**S1 — Workflow blocked**
- [#11957](https://github.com/zeroclaw-labs/zeroclaw/issues/11957) — OIDC enrollment sends raw client credentials in Basic header, breaking `client_credentials`/device-grant when secrets contain reserved chars (RFC 6749 §2.3.1 violation). **Fix exists:** [#11968](https://github.com/zeroclaw-labs/zeroclaw/pull/11968).

**S2 — Degraded**
- [#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) — **Gateway WebSocket upgrades fail over built-in TLS** (`101` then close), breaking dashboard chat. Release-blocking for v0.9.0; no fix PR yet.
- [#11962](https://github.com/zeroclaw-labs/zeroclaw/issues/11962) — 64 live RPC sessions never released when idle → remote clients can exhaust them. **Fix staged:** [#11964](https://github.com/zeroclaw-labs/zeroclaw/pull/11964).
- [#11823](https://github.com/zeroclaw-labs/zeroclaw/issues/11823) — shell scanner skips command substitution inside unquoted-delimiter heredocs (sandbox escape vector). No fix PR.
- [#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) — outbound email HTML passes raw markup and arbitrary image URLs from agent text (phishing/tracking risk).
- [#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989) — per-channel `excluded_tools` silently ignored. **Fix staged:** [#11990](https://github.com/zeroclaw-labs/zeroclaw/pull/11990).
- [#11970](https://github.com/zeroclaw-labs/zeroclaw/issues/11970) — `agents delete/rename` skip owned-state cascade in gateway-less builds.

**S3 — Minor**
- [#11972](https://github.com/zeroclaw-labs/zeroclaw/issues/11972) — `gateway get-paircode` exits 0 on failure (scripts can't detect it). [#11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987) — inline `nosemgrep` comments don't suppress code-scanning alerts. [#11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969) — metrics/embedded-web features pull in the whole gateway.

**Stability verdict:** regression inflow is balanced by staged fixes, but #8279 and #11951 are unmitigated and both are security/release blockers.

## 6. Feature Requests & Roadmap Signals

Clear v0.9.0 candidates, in rough priority order:

1. **Dashboard OIDC sign-in** — [#11961](https://github.com/zeroclaw-labs/zeroclaw/issues/11961) / PR [#11965](https://github.com/zeroclaw-labs/zeroclaw/pull/11965), plus follow-ons [#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) (non-admin scoped chat) and [#11985](https://github.com/zeroclaw-labs/zeroclaw/issues/11985) (JWKS/failed-write/retirement tests). All tagged `release:v0.9.0`.
2. **CLI-only source build** — [#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971) + [#11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969), fixes in [#11975](https://github.com/zeroclaw-labs/zeroclaw/pull/11975)/[#11269](https://github.com/zeroclaw-labs/zeroclaw/pull/11269). Strong "minimal server install" demand.
3. **Channel sender-role narrowing** — [#11068](https://github.com/zeroclaw-labs/zeroclaw/pull/11068) (`[peer_groups.<name>] risk_profile`) — a policy-language feature, XL, security-tagged.
4. **Email channel polish** — operator templates + sanitized HTML ([#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992)), quoted replies ([#11939](https://github.com/zeroclaw-labs/zeroclaw/pull/11939)).
5. **Shell policy explainability** — [#11799](https://github.com/zeroclaw-labs/zeroclaw/issues/11799) → PR [#11983](https://github.com/zeroclaw-labs/zeroclaw/pull/11983): refusals carry a reason + operator hint.
6. **XMPP/Prosody channel with optional OMEMO** — [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847), XL, community-contributed.

**Prediction:** v0.9.0 ships OIDC dashboard sign-in, CLI-only build, and the identity/authority hardening stack. Sender-role narrowing and XMPP are more likely v0.9.x.

## 7. User Feedback Summary

- **Release trust is the loudest theme.** #10999 shows users want to install *published* plugins and have it verified end-to-end, not just pass in CI. #11828 (dist image OOM) reinforces that the release pipeline is the weak link.
- **Security posture is being pressure-tested.** Multiple independent reporters (IftekharUddin, wangmiao0668000666, mov-xound-glitch) found allowlist bypasses, SOP privilege escalation, and unescaped email HTML. This reads as engaged, security-literate users finding real gaps — healthy scrutiny, but a warning that the trust model is under-specified.
- **Least-privilege is expected by default.** #11989 (`excluded_tools` documented but silently ignored) is a classic "docs promise, code doesn't deliver" frustration; #8279 is the same class at higher stakes.
- **Operator UX matters.** #11799 (refusals should say *why*) and #11972 (exit 0 on failure) are small but high-annoyance defects for anyone scripting ZeroClaw.
- **Pain point pattern:** *documented security controls that don't actually enforce.* This is the single most recurring dissatisfaction signal today.

## 8. Backlog Watch

Items needing maintainer attention, ranked by risk × staleness:

| Item | Age | Why it needs attention |
|---|---|---|
| [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — delegate allowlist bypass (S0/P1) | ~4 months | Highest-severity open issue, no fix PR. Every day it's open is a policy-bypass window. |
| [#11301](https://github.com/zeroclaw-labs/zeroclaw/pull/11301) — durable rename recovery (XL, needs-author-action) | 3 weeks | Blocked on author; rename failures strand agent state. |
| [#11068](https://github.com/zeroclaw-labs/zeroclaw/pull/11068) — channel turns by sender role (XL, needs-author-action) | 1 month | A whole policy dimension waiting on review. |
| [#11234](https://github.com/zeroclaw-labs/zeroclaw/pull/11234) — queued session ownership (needs-maintainer-review) | ~3.5 weeks | Sitting in maintainer queue; part of the P1 authority stack. |
| [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) — Telegram 429 handling (needs-author-action, XL) | 13 days | Rate-limit storm affects every Telegram deployment. |
| [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) — XMPP channel (XL) | 4 days | Large community contribution; risks bit-rot if unreviewed. |

**Bottom line for maintainers:** the merge queue is the bottleneck. Forty-two open PRs, several stacked and several tagged `needs-author-action` or `needs-maintainer-review`, are gating v0.9.0 — while two unmitigated security/release blockers (#8279, #11951) sit outside that queue entirely. Prioritizing review throughput and assigning owners to those two issues would do more for project health than any new feature this week.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*