# OpenClaw Ecosystem Digest 2026-10-23

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-23 05:49 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-10-23

## 1. Today's Overview

OpenClaw shows **very high activity** on 2026-10-23: 500 issues and 500 PRs updated in the last 24h, with a healthy merge ratio (269 merged/closed PRs vs. 231 open; 167 issues closed vs. 333 still active). One release shipped (v2026.10.6), primarily a security-driven Node runtime bump. However, the project is carrying significant **regression debt**, especially around gateway startup performance, sleep/wake recovery on Windows/macOS, plugin-load blocking, and session-state loss — several P0/P1 crash-loop issues remain open without fix PRs. Community attention is concentrated on large-plugin startup blocking (#160959, 43 comments) and Windows startup regressions (#168955, 18 comments), signaling that the 2026.9.6–2026.10.x release line introduced operator-visible reliability problems. Maintainer throughput is strong (many `ready for maintainer look` PRs from `steipete` and others), but a meaningful share of high-severity bugs are still `clawsweeper:no-new-fix-pr`, indicating gaps between triage and remediation.

---

## 2. Releases

### v2026.10.6

**Highlights:**
- **Patched Node runtime required:** OpenClaw now requires **Node 24.22.1+** (24 line) or **26.12.1+** (26 line), which reject TLS chains signed with the compromised certificate keys addressed in the **October 2026 Node.js security releases**. Docker images ship Node 24.2x.

**Nature of change:** This is a security-hardening release with a **breaking compatibility requirement** — older unpatched Node runtimes are effectively unsupported.

**Migration notes:**
- Operators on npm/global installs must upgrade Node **before** upgrading OpenClaw, or startup/TLS verification may fail against affected chains.
- Windows managed-service users should verify Node version independently of the OpenClaw updater, given several reported updater regressions (#157812, #172496, #166004).

⚠️ Note: The release notes appear truncated ("Docker images ship Node 24.2"), so a fuller changelog may follow.

---

## 3. Project Progress

- **269 PRs merged/closed in 24h** — strong maintainer velocity.
- Notable closed items:
  - **#175639** — `fix(gateway)`: keep plugin reload admitted-work drain deadline on the monotonic clock (clock-adjustment robustness). [PR link](https://github.com/openclaw/openclaw/pull/175639)
  - **#171608** — `fix(trajectory)`: preserve literal export directory names (CLI correctness). [PR link](https://github.com/openclaw/openclaw/pull/171608)
  - **#181267** — `refactor(ui)`: pair chat viewport listeners with page settlement. [PR link](https://github.com/openclaw/openclaw/pull/181267)
  - **#181142** — `perf(ui)`: lazy-load About/Dashboard copy. [PR link](https://github.com/openclaw/openclaw/pull/181142)
  - **#148308** (Issue, CLOSED) — Gateway Tailscale Serve claim loss after `tailscaled` restart. [Issue link](https://github.com/openclaw/openclaw/issues/148308)
  - **#126836** (Issue, CLOSED) — `sessions.reset` silent-swallow session. [Issue link](https://github.com/openclaw/openclaw/issues/126836)
- **Active work in flight:** A broad UI performance/lifecycle refactor series by `steipete` (#181255, #181259, #181189, #181251, #181377, #181378), plus reliability fixes for session dispatch (#181300, #181228) and sandbox mount pinning (#180840). Monotonic-clock fixes for process cleanup land in #181335 and #181360.
- **Security:** #181341 patches extended-stable dependency advisories; #181303 adds a `security audit --fix --dry-run` preview mode.

---

## 4. Community Hot Topics

| Item | Comments | Type | Link |
|---|---|---|---|
| **#160959** — Gateway blocks for minutes capturing large external plugins (2026.9.6 regression), P0 | 43 | Bug | [Issue](https://github.com/openclaw/openclaw/issues/160959) |
| **#42475** — Per-agent cost budget enforcement at gateway, P2 | 27 | Feature | [Issue](https://github.com/openclaw/openclaw/issues/42475) |
| **#168955** — Windows startup regression 2026.10.1: ready ~1030s vs ~410s | 18 | Bug | [Issue](https://github.com/openclaw/openclaw/issues/168955) |
| **#53763** — Built-in headless browser (CLOSED), P3 | 18 | Feature | [Issue](https://github.com/openclaw/openclaw/issues/53763) |
| **#157531** — 2026.9.7 Fixes Tracker | 17 | Tracker | [Issue](https://github.com/openclaw/openclaw/issues/157531) |
| **#140010** — Windows sleep/resume: WS reconnects fail 30–60s+, P1 | 14 | Bug | [Issue](https://github.com/openclaw/openclaw/issues/140010) |
| **#172837** — Codex nativeSubagentAssignments never removed, P1 | 12 | Bug | [Issue](https://github.com/openclaw/openclaw/issues/172837) |

**Underlying needs:**
- **Startup latency dominates** — users with large plugin sets and Windows hosts are experiencing multi-minute startup degradation; this is the #1 operator pain.
- **Cost governance** (#42475) is a recurring enterprise/self-hosted request: runaway spend prevention without external monitoring.
- **Web reliability** (#53763): agents need dependable JS-rendered/login-flow page access without depending on local Chrome — a recurring integration friction point.
- **Subagent lifecycle correctness** (#172837) reflects growing use of nested agents/Codex tasks and insufficient cleanup semantics.

---

## 5. Bugs & Stability

### P0 / Crash-loop
| Issue | Title | Fix PR? |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | Gateway blocks for minutes capturing large external plugins (2026.9.6 regression) | No |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | Live Docs ahead of release (heartbeat `IsolatedSessions` missing) | No |
| [#156712](https://github.com/openclaw/openclaw/issues/156712) | `openclaw triage` subprocess holds gateway-lifecycle lock, blocks restart | No |
| [#156674](https://github.com/openclaw/openclaw/issues/156674) | macOS gateway resource pressure with long-lived Codex workers | No |
| [#166634](https://github.com/openclaw/openclaw/issues/166634) | Late reclamation checkpoint failure → agent permanently unavailable after crash | No |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) | Billing cooldown outlives outage on subscription auth | No |
| [#158592](https://github.com/openclaw/openclaw/issues/158592) | Post sleep/wake: prepared model runtime publication times out → all messages fail until restart | No |
| [#141615](https://github.com/openclaw/openclaw/issues/141615) | WebChat "Authenticated profile verification unavailable" wedges all RPCs | PR open (linked) |
| [#172496](https://github.com/openclaw/openclaw/issues/172496) | Windows managed update abandoned mid-activation (2026.9.8→2026.10.3) | No |
| [#166004](https://github.com/openclaw/openclaw/issues/166004) | Windows scheduled-task Gateway won't start; update rolls back | No |

### P1 (selected)
- [#168955](https://github.com/openclaw/openclaw/issues/168955) — Windows startup regression (sidecars.control-ui-assets blocks 477s).
- [#140010](https://github.com/openclaw/openclaw/issues/140010) — Windows sleep/resume WS reconnects fail 30–60s+.
- [#172837](https://github.com/openclaw/openclaw/issues/172837) — Codex nativeSubagentAssignments never removed; re-pinned per parent thread.
- [#167557](https://github.com/openclaw/openclaw/issues/167557) — Deferred plugin migration never converges (npm/Linux).
- [#180690](https://github.com/openclaw/openclaw/issues/180690) — `doctor --fix` heap OOM at 6 GB on ~810-agent state.
- [#155359](https://github.com/openclaw/openclaw/issues/155359) — SQLite write-transaction holds 5.9–33.2s on Windows (past `busy_timeout=5000ms`).
- [#145690](https://github.com/openclaw/openclaw/issues/145690) — Subagent run completion releases model-runtime generation → next lane task fails in ~15ms.
- [#140085](https://github.com/openclaw/openclaw/issues/140085) — `ask_user` never delivered to Telegram; session hangs.
- [#160485](https://github.com/openclaw/openclaw/issues/160485) — Plugin load CPU-bound; 3 channel plugins = 57.4s of 60s phase (Windows).
- [#158592](https://github.com/openclaw/openclaw/issues/158592) — Post-sleep runtime publication never recovers (duplicate cluster with #140010).

### Regression theme
A large cluster of P0/P1 bugs share root causes around **event-loop stalls, wall-clock dependency, plugin/module compile cost, and post-resume runtime republishing**. Fixes are inbound for the clock issues (#181335, #181360, #175639) and dispatch owners (#181300), but the **large-tenant startup** and **Windows service** problems remain largely unaddressed.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in next release |
|---|---|---|
| Per-agent cost budget enforcement at gateway | [#42475](https://github.com/openclaw/openclaw/issues/42475) | Medium — high demand, needs product decision |
| Configurable Control UI upload size limit (currently 5MB hardcoded) | [#71142](https://github.com/openclaw/openclaw/issues/71142) | Medium — `needs-product-decision` |
| Automations deliver to paired node (app notifications) | [#144306](https://github.com/openclaw/openclaw/issues/144306) | Medium — scoped, clear UX value |
| Linux aarch64 companion builds (deb + AppImage) | [#138279](https://github.com/openclaw/openclaw/issues/138279) | Medium — parity gap vs Windows ARM |
| Heartbeat status for cadence/activeHours | [#178033 (PR)](https://github.com/openclaw/openclaw/pull/178033) | **High** — PR open |
| `config explain` single-path provenance | [#181342 (PR)](https://github.com/openclaw/openclaw/pull/181342) | **High** — PR open |
| Plugin tools showing native views in chat | [#173135 (PR)](https://github.com/openclaw/openclaw/pull/173135) | High — XL PR in review |
| Choose which tools are deferred behind Tool Search | [#170071 (PR)](https://github.com/openclaw/openclaw/pull/170071) | High — XL PR in review |
| Built-in headless browser | [#53763](https://github.com/openclaw/openclaw/issues/53763) (CLOSED) | Deferred/declined |

**Prediction for the next version (v2026.10.7+):** Likely to include the UI lifecycle/perf refactor series, monotonic-clock hardening, security audit dry-run, and dispatch-recovery improvements. The large cost-budget and headless-browser items probably will not land this cycle given `needs-product-decision` status.

---

## 7. User Feedback Summary

**Pain points:**
- **Startup time has regressed materially** on Windows and with large plugin sets — from ~410s to ~1030s in one report, with one Windows host spending 57.4/60s in plugin load alone.
- **Sleep/wake recovery is unreliable** on both Windows and macOS, causing repeated reconnect failures and dropped messages (#140010, #158592, #166634).
- **Managed updates frequently fail or abandon** on Windows, leaving users on stale versions (#157812, #172496, #166004).
- **Billing cooldown UX** frustrates subscription users — a transient outage can disable a provider for ~5h with no manual reset (#115642).
- **Approval/secret friction** makes self-hosted operators feel less autonomous (#151112, #141413).

**Positive signals:**
- Fast merge cadence and active maintainer-driven PRs (many `ready for maintainer look`).
- Structured triage (`clawsweeper:*` labels) is helping prioritize severity and ownership.
- UI/perf work is clearly responsive to memory and load complaints.

**Net sentiment:** Functionally capable but **operationally strained** — the release line has outgrown some startup/resume assumptions, and Windows reliability is the leading dissatisfaction driver.

---

## 8. Backlog Watch

| Item | Age | Why it needs attention |
|---|---|---|
| [#42475](https://github.com/openclaw/openclaw/issues/42475) — Per-agent cost budget | Since 2026-03 | 27 comments, `needs-product-decision`, blocks enterprise adoption |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) — Billing cooldown recovery | Since 2026-07 | P0 auth-provider, high blast radius, no fix PR |
| [#125308](https://github.com/openclaw/openclaw/issues/125308) — Unbounded long-running sessions | Since 2026-08 | Multi-facet, partially fixed, scope creep risk |
| [#71142](https://github.com/openclaw/openclaw/issues/71142) — Control UI upload limit | Since 2026-04 | Simple fix, awaiting product decision |
| [#138279](https://github.com/openclaw/openclaw/issues/138279) — Linux aarch64 builds | Since 2026-09 | Platform parity gap, easy win for ARM desktop user base |
| [#141615](https://github.com/openclaw/openclaw/issues/141615) — WebChat auth wedge | Since 2026-09 | P0 release blocker, PR open but unresolved |
| [#156712](https://github.com/openclaw/openclaw/issues/156712) — `openclaw triage` lock leak | Since 2026-09 | P0, blocks restart, no fix PR |

**Maintainer ask:** Prioritize a root-cause fix for **plugin-load blocking** (#160959, #160485) and **Windows managed-service/update** flows (#166004, #172496), as these dominate the P0 backlog and generate the most operator escalations.

---

*Data source: github.com/openclaw/openclaw — snapshot 2026-10-23.*

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Snapshot Date: 2026-10-23** | Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source landscape is bifurcating into two maturity tiers: **high-throughput reference implementations** (OpenClaw, Hermes Agent, QwenPaw, ZeroClaw) running daily release cadences with hundreds of weekly PRs, and **steady-state, deployment-focused projects** (IronClaw) operating on maintenance rhythms. Across all five projects, 2026-10-23 activity reveals a consistent pattern — **communities are deploying agents as durable, always-on infrastructure** (multi-gateway fleets, hybrid remote/local execution, team-shared Hub deployments), and the resulting requirements (identity, sandboxing, cost governance, memory hygiene, updater robustness) are outpacing the single-user, single-machine assumptions most codebases were designed around. Release lines across the ecosystem show **regression debt from rapid iteration**: OpenClaw's 2026.9.6–2026.10.x introduced multi-minute startup degradations, Hermes Agent's v0.22.x carries an updater-failure cluster, and QwenPaw's 2.2.2 upgrade path broke multiple channels. Security response has been strong — QwenPaw shipped a CA-remediation post-release and ZeroClaw is stacking identity/access-control PRs — but the dominant engineering constraint ecosystem-wide is **maintainer review throughput**, not feature ambition.

---

## 2. Activity Comparison

| Project | Issues (updated 24h) | PRs (updated 24h) | Release Status | Merge Ratio | Health Score* |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (167 closed / 333 open) | 500 (269 merged / 231 open) | **v2026.10.6 shipped** (security Node bump) | 54% merged | 🟡 **Strained** — strong velocity, heavy P0 regression debt (particularly Windows/startup) |
| **Hermes Agent** | 50 (1 closed / 49 open) | 50 (14 merged / 36 open) | **v0.22.5 patch** (roll-up of ~81 PRs) | 28% merged | 🟠 **Stabilizing** — high engagement but release-cadence strain; Windows updater cluster |
| **IronClaw** | 2 (1 closed / 1 open) | 6 (1 merged / 5 open) | **No release** | 17% merged | 🟢 **Stable/quiet** — maintenance mode; no bugs filed; ARM64 closed |
| **QwenPaw** | 22 (2 closed / 20 open) | 50 (2 merged / 48 open) | **v2.2.2.post1** (security remediation) | 4% merged | 🟠 **Strained but responsive** — critical refactor in flight (#8187), channel-layer bugs concentrated |
| **ZeroClaw** | 35 (12 closed / 23 open) | 50 (8 merged / 42 open) | **No release** (v0.9.0 scoping) | 16% merged | 🟡 **Bottlenecked** — security/identity PR stack gated on review capacity |

*\*Health score synthesized from merge ratio, open P0/P1 count, and release cadence stability. Not an official metric.*

**Key observations:**
- **OpenClaw operates at 10× the raw activity** of any peer (500 issues + 500 PRs/24h) — a genuine reference-implementation scale.
- **Merge ratio is inversely correlated with PR stack depth**: ZeroClaw (16%) and QwenPaw (4%) have deliberately gated large architectural PRs awaiting review.
- **Only OpenClaw and QwenPaw shipped releases today**; the latter was security-driven, not feature-driven.
- **IronClaw is the outlier** — minimal activity and no open bugs, suggesting either proven robustness or low external issue volume.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Scale & velocity.** 500 PRs/day vs. Hermes Agent/QwenPaw/ZeroClaw's ~50 and IronClaw's 6. OpenClaw merges more PRs in 24 hours (269) than IronClaw updates in a month.
- **Triage infrastructure.** The `clawsweeper:*` label system provides structured severity/ownership tracking that peers lack — a maturity signal for a project at this scale.
- **Reference status.** Positioned (per digest framing) as the de facto reference implementation; peers address adjacent problems (Hermes: cross-gateway federation; ZeroClaw: identity layers) rather than competing directly.
- **Maintainer throughput.** Multiple `ready for maintainer look` PRs from named maintainers (e.g., `steipete`) indicate a functioning core team, not just contributor volume.

**Technical approach differences:**
- **Monolithic gateway architecture** with plugin-load and session-dispatch subsystems — this is the source of its startup-blocking regressions (#160959, #160485), where 3 channel plugins consume 57.4/60s of the load phase.
- **Heavier release coupling** — the v2026.10.6 Node-runtime requirement is a hard compatibility boundary that peers don't impose.
- **Broadest surface area** — 500+ active issues span UI lifecycle, gateway, sandbox, billing, and platform concerns, versus peers' narrower domains.

**Community size comparison:**
- Comment counts on top issues (43 on #160959, 27 on #42475, 18 on #168955) suggest **an order of magnitude more active reporters** than Hermes Agent (top: 40 comments but narrower base) or ZeroClaw (top: 15).
- However, **high comment volume correlates with unresolved P0s** — OpenClaw's community is larger *and* more frustrated than peers', particularly on Windows and large-tenant deployments.

**Verdict:** OpenClaw is the ecosystem's **scale leader and reference implementation**, but it is paying for that scale with the ecosystem's most severe operational debt. Its position is secure on adoption; its competitive risk is **reliability erosion** if the startup/sleep-wake/Windows clusters persist across another release cycle.

---

## 4. Shared Technical Focus Areas

Five cross-cutting requirements emerge from the 2026-10-23 dataset:

| Focus Area | Projects Signaling | Specific Needs |
|---|---|---|
| **Identity & access control** | ZeroClaw (#8279 S0 allowlist bypass, OIDC dashboard #11965), Hermes (#143399 approval-mode bleed), OpenClaw (#141615 WebChat auth wedge) | Sub-agent tool allowlist enforcement; per-profile approval boundaries; OIDC-based dashboard/CLI identity; cross-profile isolation |
| **Sub-agent / delegation correctness** | OpenClaw (#172837 Codex nativeSubagentAssignments leak), ZeroClaw (#8279, #11225 owner preservation), Hermes (#143399) | Cleanup semantics on nested agents; authorial continuity across delegation; ownership-aware tool routing |
| **Updater / installer robustness** | Hermes (Windows cluster: #143331, #143401, #143326; macOS #143390), OpenClaw (Windows managed update #172496, #166004), QwenPaw (#8378, #8388 upgrade regressions) | Atomic update paths; stale-PID handling; config migration for old installs; per-platform verification |
| **Memory / context governance** | Hermes (#135039 memory budget, #116788 privacy violation), OpenClaw (#42475 cost budget) | Write-time admission control; size budgets; privacy-boundary enforcement (hard guarantees, not config) |
| **Sandbox / process isolation** | ZeroClaw (#11823 heredoc shell bypass, plugin sandbox stack #11225), QwenPaw (Feishu event-loop DoS #8350, channels-as-plugins #8187), OpenClaw (#160959 large-plugin blocking) | Subprocess isolation for plugins/channels; sync-IO-in-async hardening; event-loop non-blocking guarantees |

**Notable convergence:** **Four of five projects** (all but IronClaw) have open bugs or PRs touching **sub-agent delegation correctness** and **identity/tool-allowlist boundaries**. This is the ecosystem's most consistent architectural pain point, suggesting the industry has standardized on nested-agent architectures without standardized isolation semantics.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Feature focus** | Full personal-assistant platform (gateway, plugins, UI, billing) | Durable infrastructure: cross-gateway federation, memory governance | Model evaluation / benchmarking harness | Multi-channel messaging + Hub team deployments | Security-first: identity, SOPs, sandboxing |
| **Target users** | Individual power users → large self-hosted tenants | Multi-Mac fleets, hybrid remote/local, multi-bot operators | Benchmark engineers, ARM64 self-hosters | Teams/small orgs via Hub; heavy multimodal users | Security-conscious operators, minimal-server deployments |
| **Architecture signal** | Monolithic gateway, plugin-load blocking | Split-brain (remote agent + local tools), browser-tool consolidation | Benchmark-driven, dependency-hygienic | Channels-as-plugins with subprocess isolation (PR #8187) | Stacked security PRs, CLI-only build option (#11971) |
| **Distinctive risk** | Startup latency regression | Updater trust erosion | Low community signal | Channel-layer defect concentration | Review-capacity bottleneck on security PRs |
| **Distinctive strength** | Scale + triage maturity | Deepest architectural RFCs (40-comment federation thread) | Zero reported bugs, ARM64 closure | Security response speed (post-release in <24h) | Precise, severity-labeled bug reports |

**Architecture divergence is the sharpest differentiator:**
- **OpenClaw** bets on a **monolithic gateway** — maximal capability, maximal blast radius per bug.
- **Hermes Agent** is moving toward **split execution** (remote brain/local tools, #18715 with 42 👍) and **cross-instance federation** (#97681) — the most architecturally ambitious peer.
- **QwenPaw** is explicitly refactoring *away* from monolithic channels toward **subprocess-isolated plugins** (#8187) — a direct response to the same event-loop blocking that openclaw suffers (#160959).
- **ZeroClaw** is the **security-native** outlier — identity, SOP authority, and sandboxing are first-class, not bolted on.
- **IronClaw** is **evaluation-centric** — its daily failure taxonomy (#8153) frames the agent as a model-quality target, not a deployment surface.

---

## 6. Community Momentum & Maturity

**Activity tiers:**

| Tier | Projects | Characteristics |
|---|---|---|
| **Tier 1 — High-velocity, regression-prone** | OpenClaw, Hermes Agent, QwenPaw | 50–500 PRs/24h; shipping releases; high-severity bug clusters; rapid iteration outrunning regression testing |
| **Tier 2 — High-velocity, gated** | ZeroClaw | 50 PRs/24h but only 8 merged; security stack awaiting review; v0.9.0 scoping |
| **Tier 3 — Stable/maintenance** | IronClaw | 6 PRs/24h, 5 dependabot; no bugs; quiet release cadence |

**Rapidly iterating:**
- **OpenClaw** — merge-and-fix velocity; UI lifecycle refactor series in flight.
- **QwenPaw** — largest in-flight architectural change (channels-as-plugins, `size/XXXL`); security post-release shipped inside 24h.
- **Hermes Agent** — browser-tool consolidation (#143146) plus media catalog expansion; approaching v0.23.0.

**Stabilizing:**
- **ZeroClaw** — gated on review; security posture hardening before v0.9.0.
- **IronClaw** — maintenance mode; dependency hygiene and evaluation tooling only.

**Maturity ranking (by process hygiene, not feature count):**
1. **OpenClaw** — largest triage infrastructure, but largest regression debt.
2. **ZeroClaw** — best severity-labeling discipline (`S0`/`S1`/`S2`, `priority:p0`); bottlenecked on review.
3. **QwenPaw** — strong release-duty verification (#8386) and security response, but concentrated channel bugs.
4. **Hermes Agent** — sophisticated community (29–40 comment RFC threads) but exposed updater fragility.
5. **IronClaw** — least signal; maturity cannot be assessed from low activity alone.

---

## 7. Trend Signals

**Seven industry trends extracted from cross-project community feedback — with implications for AI agent developers:**

1. **Agents are becoming always-on infrastructure, not tools.** Multi-gateway federation (#97681), Tailscale fleets (#142248), Hub team deployments (#8275), and CLI-only minimal builds (#11971) all point to *durable deployment* as the primary use case. **Implication:** design for 24/7 operation, deterministic replay (#10526), and post-sleep/wake recovery from day one — retrofitting these is expensive (see OpenClaw #158592, #140010).

2. **"Smart" automation is trusted less than explicit automation.** QwenPaw's `osascript` data-loss incident (#141346) and approval-mode bleed (#143399) show that *safety* features causing *destructive* outcomes are the sharpest trust-breakers. **Implication:** dry-run, undo, and dry-run-only previews (OpenClaw #181303) should be default for high-blast-radius actions.

3. **Plugin/channel isolation is non-negotiable at scale.** Three independent projects (OpenClaw #160959, QwenPaw #8350, ZeroClaw shell bypass #11823) report the same class of bug — a bad plugin/channel degrades the host. **Implication:** subprocess or WASM isolation with hard timeouts should be the default plugin model, not an opt-in refactor.

4. **Updater trust is a fleet-stopping concern.** Every project with a managed-update path (OpenClaw, Hermes, QwenPaw) has open updater failures. **Implication:** updaters need their own integration test matrix per platform, plus stale-state recovery (PIDs, locks, tags).

5. **Memory/context governance is the new cost control.** Hermes' memory budget (#135039) and OpenClaw's per-agent cost budget (#42475, 27 comments, since March) reveal a demand for **write-time admission control** and **spend caps** — not just post-hoc monitoring. **Implication:** treat memory and cost as first-class policy objects with enforcement semantics.

6. **Sub-agent isolation semantics are undefined industry-wide.** Four of five projects have open sub-agent correctness bugs (OpenClaw #172837, Hermes #143399, ZeroClaw #8279). **Implication:** the ecosystem needs a standard for nested-agent ownership, tool inheritance, and cleanup — a likely RFC/standards opportunity.

7. **Maintainer review throughput, not feature supply, is the binding constraint.** ZeroClaw (42 open PRs / 8 merged), QwenPaw (48/2), and the persistence of OpenClaw's `clawsweeper:no-new-fix-pr` P0s all point to review bandwidth as the limiting factor. **Implication:** automation for dependency batching, diff summarization, and security-PR review assistance is the highest-leverage infrastructure investment for agent projects in 2026–2027.

---

**Bottom line for technical decision-makers:** The ecosystem is converging on a shared architecture (nested agents, plugin/channel extensions, always-on deployment) and a shared vulnerability surface (isolation, updater robustness, memory governance). OpenClaw is the safe reference implementation for breadth but carries the highest reliability debt; Hermes Agent is the most architecturally ambitious; ZeroClaw is the most security-disciplined; QwenPaw is the most responsive to community feedback; IronClaw offers the least volatile (and least feature-active) platform. **Selection should weight isolation model, updater reliability, and identity layer over feature count** — those are the axes where peer projects are visibly differentiating in late 2026.

*Generated from 2026-10-23 project digests for OpenClaw, Hermes Agent, IronClaw, QwenPaw, and ZeroClaw. Comment/reaction counts reflect source snapshots.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest
**Date: 2026-10-23** | Repository: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. Today's Overview

Hermes Agent shows **very high activity** with 50 issues and 50 PRs updated in the last 24 hours, plus a fresh patch release (v0.22.5) rolling up ~81 PRs merged since v0.22.4. The issue tracker is dominated by **stability and platform-compatibility bugs** — particularly Windows install/update failures, gateway session-state problems, and memory/compaction correctness issues — rather than net-new feature work. With only 1 issue closed versus 49 still active, and 36 PRs still open against 14 merged/closed, the maintainers are clearly in a **stabilization cycle** ahead of the reportedly imminent v0.23.0. The project is healthy in engagement but showing signs of **release-cadence strain**: multiple independent reporters describe `hermes update` regressions on Windows, macOS migration, and stable-channel tagging, suggesting the rapid merge throughput (~81 PRs/window) is outrunning regression testing.

---

## 2. Releases

### v0.22.5 — Patch Release (2026-10-22)
- **Type:** Patch / roll-up release.
- **Contents:** Aggregates the ~81 PRs merged since v0.22.4 into a stable release across the GitHub release (CLI + installers), Microsoft Store app, Docker, and Hermes Cloud.
- **Breaking changes:** None documented. Explicitly a stability tag.
- **Migration notes:** None required — this is a drop-in patch.
- **Caveat:** Full curated notes are deferred and "ship with v0.23.0," meaning users on v0.22.5 have **no detailed changelog** for the merge window. This is a documentation gap worth flagging, particularly given the volume of stability bugs reported against v0.22.x today (compaction crash, update failures).

---

## 3. Project Progress

**Merged/Closed PRs today (14 total):**
- [#143322](https://github.com/NousResearch/hermes-agent/pull/143322) — `fix(setup)`: Quick Setup now offers to *keep* a model imported from another agent (default "Keep") instead of silently replacing it with Nous Portal. Fixes a first-run trust/UX issue.
- [#40016](https://github.com/NousResearch/hermes-agent/pull/40016) — `fix(email)`: Purelymail IMAP `ID`-capability gating and proprietary `Authentication-Results` acceptance; fail-closed security posture preserved.
- [#143298](https://github.com/NousResearch/hermes-agent/pull/143298) — Test-only: adds diagnostics (frame + DOM timeline artifacts) to the intermittent Desktop reconnect "Stop-flash" E2E flake. Explicitly *does not* fix the flake yet.

**Advanced in-flight work (open, notable):**
- [#143146](https://github.com/NousResearch/hermes-agent/pull/143146) — Major browser-automation refactor: consolidates onto `browser_exec` only, removes `agent-browser` and ten built-in `browser_*` tools, moves Camofox to a catalog plugin. This is a **significant architectural simplification** likely landing in v0.23.0.
- [#143412](https://github.com/NousResearch/hermes-agent/pull/143412) — Adds Bria FIBO 2.0 (licensed-data, commercial-safe) to `image_generate`'s FAL catalog.
- [#143411](https://github.com/NousResearch/hermes-agent/pull/143411) — Adds HeyGen Video (MiniMax H3, $0.02/s) to `video_generate`'s FAL picker.
- [#143407](https://github.com/NousResearch/hermes-agent/pull/143407) — Fix for the compaction `int(None)` crash (see Bugs section).
- [#56023](https://github.com/NousResearch/hermes-agent/pull/56023) — Phased: credential-free local iMessage mode for Photon.

**Assessment:** Thematically, today's progress is split between **media-generation catalog expansion** (vision/video) and **correctness/plumbing fixes**. The browser-tool consolidation is the single largest behavioral change in flight.

---

## 4. Community Hot Topics

| Rank | Item | Signals | Underlying Need |
|---|---|---|---|
| 1 | [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — *Let Bots collaborate across gateways* | 40 comments, 4 👍 | **Cross-instance agent federation.** Users want personal agents to cooperate across machines and owners *without surrendering control* of their own Bot. This is the deepest architectural conversation in the tracker (open since August). |
| 2 | [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) — *Smart approval auto-approved `osascript` → unrecoverable PowerPoint data loss* | 35 comments | **Trust/safety in "smart" approval mode.** A default-mode security feature approved a destructive AppleScript that deleted unsaved user data. High-emotion, high-severity. |
| 3 | [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) — *Remote agent + local tool execution* | 29 comments, **42 👍** | **Split architecture** (remote brain, local tools). The highest-reaction item — strong demand for hybrid local/remote deployment. |
| 4 | [#135039](https://github.com/NousResearch/hermes-agent/issues/135039) — *Memory budget enforcement + write-time acceptance pipeline* | 15 comments | **Memory hygiene.** `MEMORY.md`/`USER.md` inject on *every* turn; users want size budgets and admission control to control cost/latency. |
| 5 | [#143298](https://github.com/NousResearch/hermes-agent/pull/143298) / [#143342](https://github.com/NousResearch/hermes-agent/pull/143342) | Active bot PRs | CI hygiene and automated formatting. |

**Analysis:** The top issues reveal a coherent user thesis: **Hermes is being deployed as durable, always-on infrastructure** (fleets, remote+local splits, multi-gateway collaboration), which is surfacing demands for governance (memory budgets, approval safety) and flexibility (remote/local split) that the current single-machine, single-owner model doesn't fully address.

---

## 5. Bugs & Stability

Ranked by severity (data-loss / security > platform breakage > correctness > cosmetic):

**🔴 Critical — data loss / security**
- [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) — *Smart approval auto-approved `osascript` that closed an unsaved PowerPoint and deleted its export (unrecoverable).* macOS, default `approvals.mode=smart`. **Security + data-loss.** No fix PR seen yet.
- [#116788](https://github.com/NousResearch/hermes-agent/issues/116788) — *Background memory reviewer persisted a fact the user explicitly asked NOT to save.* Privacy boundary violation. No fix PR seen.
- [#143399](https://github.com/NousResearch/hermes-agent/issues/143399) — *Subagent routed to another profile uses the room member's approval mode, not its own.* Approval-mode boundary bleed in Group Chat. No fix PR seen.
- [#143364](https://github.com/NousResearch/hermes-agent/issues/143364) — *Multiplexed secondary profile's progress/notices delivered via the primary profile's Telegram bot.* Cross-profile information leak. No fix PR seen.

**🟠 High — silent correctness failures**
- [#143402](https://github.com/NousResearch/hermes-agent/issues/143402) — *Compaction write-back fails with `int(None)` on NULL message ids → compression silently discarded* (v0.22.x). **Fix PR exists: [#143407](https://github.com/NousResearch/hermes-agent/pull/143407).**
- [#142820](https://github.com/NousResearch/hermes-agent/issues/142820) — *`hermes cron run` does not honor the global emergency stop (`hermes pause`).* Safety-bypass regression.
- [#139091](https://github.com/NousResearch/hermes-agent/issues/139091) — *Stable update aborts on a 10s `merge-base` probe timeout despite both commits being local.* Blocks updates entirely on affected setups.
- [#143361](https://github.com/NousResearch/hermes-agent/issues/143361) — *`hermes update` leaves release tags stale → `--version` reports a stale version on a checkout already on the release commit.* No fix PR seen.

**🟠 High — Windows platform breakage (a cluster)**
- [#143326](https://github.com/NousResearch/hermes-agent/issues/143326) — Post-update permissions mismatch (gateway admin vs. app non-admin) causing gateway comms errors.
- [#143331](https://github.com/NousResearch/hermes-agent/issues/143331) — *`hermes update` fails every run:* stale `gateway.pid` beside a held lock aborts the pause stage; stable-channel downgrade refusal exits 1.
- [#143401](https://github.com/NousResearch/hermes-agent/issues/143401) — *Gateway dies after in-chat `/update`* — unguarded unlink of `.update_output.txt` (WinError 32) aborts startup.
- [#142271](https://github.com/NousResearch/hermes-agent/issues/142271) — *Kanban managed_worker deadlocks importing numpy in a memory-provider plugin* (loader-lock race).

**🟡 Medium — state/session correctness**
- [#139796](https://github.com/NousResearch/hermes-agent/issues/139796) — `session.resume` returns `not_found` for cold/evicted sessions (no cold-load path).
- [#83047](https://github.com/NousResearch/hermes-agent/issues/83047) — `blocker_auth` respawn guard parks a ready kanban task forever (no drain).
- [#143414](https://github.com/NousResearch/hermes-agent/issues/143414) — `/new` session rotation drops live reasoning (flag not re-synced).
- [#143383](https://github.com/NousResearch/hermes-agent/issues/143383) / [#143382](https://github.com/NousResearch/hermes-agent/issues/143382) — Disbanded Group Chats resurrect / keep accepting events on gateway copies.

**Assessment:** The **Windows update path is the single most fragile subsystem today** — four separate reports of `hermes update` failing. Combined with the macOS LaunchAgent migration bug ([#143390](https://github.com/NousResearch/hermes-agent/issues/143390)), installer/updater robustness is the clearest stability priority. Approvals and profile-isolation bugs carry the highest *severity* (data loss, privacy), though they attract fewer duplicate reports than the Windows cluster.

---

## 6. Feature Requests & Roadmap Signals

**Strong signals likely for v0.23.0 / near-term:**
- **Cross-gateway Bot collaboration** ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681)) — highest-comment issue; foundational, already "current review queue." Likely a headline v0.23.0 item.
- **Remote agent + local tool execution** ([#18715](https://github.com/NousResearch/hermes-agent/issues/18715), 42 👍) — highest-reaction request; a hybrid routing capability. Watch for RFC → prototype.
- **Memory budget + write-time acceptance** ([#135039](https://github.com/NousResearch/hermes-agent/issues/135039)) and **memory doc chains** ([#116564](https://github.com/NousResearch/hermes-agent/issues/116564)) — both point to a Memory 2.0 track.
- **Self-healing autonomous updates** ([#115639](https://github.com/NousResearch/hermes-agent/issues/115639)) — an RFC that dovetails directly with the updater bugs above; could be elevated by the update-failure cluster.
- **Browser automation consolidation** ([#143146](https://github.com/NousResearch/hermes-agent/pull/143146)) — active PR; almost certainly in the next minor.

**Media catalog expansion (likely shipping soon):** Bria FIBO 2.0 ([#143412](https://github.com/NousResearch/hermes-agent/pull/143412)), HeyGen Video ([#143411](https://github.com/NousResearch/hermes-agent/pull/143411)), local iMessage ([#56023](https://github.com/NousResearch/hermes-agent/pull/56023)).

**Prediction:** v0.23.0 will headline **cross-gateway collaboration + browser-tool consolidation**, with memory governance and updater robustness as strong candidates for the same window given current bug pressure.

---

## 7. User Feedback Summary

**Pain points (dissatisfaction):**
- **Updater trust is eroding.** Users explicitly frame `hermes update` as "fails every run" ([#143331](https://github.com/NousResearch/hermes-agent/issues/143331)) and "aborts before any fetch" ([#139091](https://github.com/NousResearch/hermes-agent/issues/139091)). For 24/7 operators, a broken updater is a fleet-stopping problem.
- **"Smart" approval is not trusted.** The PowerPoint data-loss incident ([#141346](https://github.com/NousResearch/hermes-agent/issues/141346)) is the sharpest example: a *safety* feature caused *unrecoverable* loss. Expect follow-up demand for dry-run/undo.
- **Privacy boundaries need enforcing, not just configuring.** [#116788](https://github.com/NousResearch/hermes-agent/issues/116788) (memory saved against explicit instruction) and [#143364](https://github.com/NousResearch/hermes-agent/issues/143364) (cross-profile notice leak) show users want hard guarantees, not best-effort.

**Use cases (from issues):**
- Multi-Mac Tailscale fleets with multiplexed profiles ([#142248](https://github.com/NousResearch/hermes-agent/issues/142248)).
- Windows desktop + elevated gateway deployments ([#143326](https://github.com/NousResearch/hermes-agent/issues/143326)).
- Remote-brain / local-tool hybrid setups ([#18715](https://github.com/NousResearch/hermes-agent/issues/18715)).
- Multi-bot Telegram/Discord multiplexing ([#143364](https://github.com/NousResearch/hermes-agent/issues/143364)).

**Satisfaction signals:** High engagement (29–40 comments on top items), constructive RFCs ([#115639](https://github.com/NousResearch/hermes-agent/issues/115639)), and existing fix PRs for key correctness bugs ([#143407](https://github.com/NousResearch/hermes-agent/pull/143407)) indicate an invested, technically sophisticated community rather than churn.

---

## 8. Backlog Watch

Items needing maintainer attention (aged + high-impact, or blocked on decisions):

| Item | Age | Why it needs attention |
|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — Cross-gateway Bot collaboration | Since 2026-08-29 | 40 comments, flagged `needs-decision`, at risk of design drift. Architectural cornerstone. |
| [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) — Remote agent + local tools | Since 2026-05-02 | ~6 months old, **42 👍** — highest-reaction open issue; `needs-decision`. |
| [#61412](https://github.com/NousResearch/hermes-agent/pull/61412) — Overlap systemd gateway drain waits | Since 2026-07-09 | Long-lived PR, repeatedly narrowed ("omit work already superseded upstream") — risk of rot. |
| [#25952](https://github.com/NousResearch/hermes-agent/pull/25952) — Cron cadence logging | Since 2026-05-14 | ~5 months; small but silently-swallowing-error class (relevant to updater bugs). |
| [#42372](https://github.com/NousResearch/hermes-agent/pull/42372) — Feishu WS startup logging | Since 2026-06-08 | Observability gap; fail-silent pattern matches other stability bugs. |
| [#19917](https://github.com/NousResearch/hermes-agent/pull/19917) / [#19920](https://github.com/NousResearch/hermes-agent/pull/19920) — Silent exception logging | Since 2026-05-04 | A pattern of "silently swallowed" errors — directly relevant to why several bugs above are hard to diagnose. |
| [#135418](https://github.com/NousResearch/hermes-agent/pull/135418) — Post-approval terminal middleware | Since 2026-10-09 | Security-boundary change; directly addresses the approval-safety theme from #141346. |
| [#127268](https://github.com/NousResearch/hermes-agent/pull/127268) — Sequential delegation | Since 2026-09-29 | `needs`-style opt-in feature; community-requested for constrained inference backends. |

**Recommendation:** Prioritize (1) the **Windows updater cluster** as a hotfix-class release, (2) an explicit decision on **#18715 / #97681** to unblock architecture work, and (3) merging the **silent-error-logging PRs** (#19917, #19920, #25952, #42372) as low-risk observability wins that will speed up triage of the very bugs dominating this digest.

---

*Digest generated from GitHub activity data for 2026-10-23. Comment/reaction counts reflect totals at time of capture (undefined comment counts on PRs reflect the source snapshot).*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-10-23

## 1. Today's Overview

IronClaw shows a **moderate, maintenance-focused activity level** today, with 2 issues and 6 PRs updated in the last 24 hours. The project remains in a steady-state engineering rhythm: **5 of 6 PRs are dependency bumps** from Dependabot, and the sole merged/closed PR was a superseded duplicate of another dependency bump. Notably, **zero new releases** were published, and no feature-level or architectural PRs landed. The one substantive open issue (#8153) is an automated daily model-quality failure taxonomy, while the sole closed issue (#3168) resolves a long-standing ARM64 support request after nearly six months. Overall, project health appears **stable but quiet**, with no critical bugs or regressions surfacing today.

## 2. Releases

**No new releases in the last 24 hours.** No release notes, breaking changes, or migration guidance to report.

## 3. Project Progress

**Merged/Closed PRs (1):**
- [#8149](https://github.com/nearai/ironclaw/pull/8149) — `chore(deps): bump dompurify from 3.4.12 to 3.4.16` (created 2026-10-20, closed 2026-10-23). This was superseded by [#8155](https://github.com/nearai/ironclaw/pull/8155), which bumps to the newer `3.4.17`. Net effect: no functional change beyond routine dependency hygiene.

**Closed Issues (1):**
- [#3168](https://github.com/nearai/ironclaw/issues/3168) — *Add arm64/aarch64 platform support for Docker builds* was closed on 2026-10-22/23 after being open since 2026-05-01. This is the most significant progress signal today: it unblocks official IronClaw Docker image usage on ARM64 machines (e.g., Apple Silicon, Graviton, Raspberry Pi 4/5), given Cranelift's existing aarch64 support. Note: the issue summary only explicitly excludes armv7 (32-bit, tracked in #1339); no linked fix PR appears in today's data, so maintainers should confirm the closing artifact.

**No feature-development PRs advanced today.**

## 4. Community Hot Topics

Activity today is **low-engagement** — all issues and PRs show **0 comments and 0 reactions**, so there is no genuine "hot" discussion. Ranking by recency and relevance:

- [#8153](https://github.com/nearai/ironclaw/issues/8153) — *Daily ironclaw failure taxonomy — 2026-10-22* (OPEN, 0 comments). An automated/curated benchmark analysis of `officeqa` where DeepSeek-V4-Flash produced 64 non-pass tasks, overwhelmingly attributed to "genuine model-quality errors." **Underlying need:** continuous model-quality observability and a triage mechanism to separate model failures from harness/tooling failures.
- [#3168](https://github.com/nearai/ironclaw/issues/3168) — *arm64/aarch64 Docker support* (CLOSED, 0 comments). **Underlying need:** platform portability for self-hosters and CI on ARM hardware — a recurring theme in deployment-oriented projects.
- Dependabot PRs [#8155](https://github.com/nearai/ironclaw/pull/8155), [#8156](https://github.com/nearai/ironclaw/pull/8156), [#8157](https://github.com/nearai/ironclaw/pull/8157), [#8158](https://github.com/nearai/ironclaw/pull/8158) — routine; no community discussion.

**Takeaway:** The project is not experiencing active community debate today; the dominant "topic" is automated dependency and failure-taxonomy machinery.

## 5. Bugs & Stability

**No user-reported bugs, crashes, or regressions were filed today.** Severity ranking:

| Severity | Item | Status |
|---|---|---|
| — | No open bug issues | — |
| Info | [#8153](https://github.com/nearai/ironclaw/issues/8153) notes model-quality failures (not product bugs) in `officeqa` with DeepSeek-V4-Flash | Informational; no fix PR |
| Info | [#3168](https://github.com/nearai/ironclaw/issues/3168) ARM64 limitation — **resolved/closed today** | Closed; no fix PR linked in this dataset |

**Note:** The absence of bug reports is a positive stability signal, though it may also reflect low external issue volume rather than proven robustness.

## 6. Feature Requests & Roadmap Signals

- **ARM64/aarch64 Docker images** ([#3168](https://github.com/nearai/ironclaw/issues/3168)) — now closed. If not already shipped, this is a strong candidate for the **next release's changelog**, since it directly affects deployment compatibility and was explicitly scoped to be tractable.
- **Model-quality benchmarking infrastructure** ([#8153](https://github.com/nearai/ironclaw/issues/8153)) — the daily failure-taxonomy cadence suggests a roadmap emphasis on **model evaluation/observability tooling** rather than agent features.
- **Dependency modernization** (Storybook 10.6.2, Vite 8.1.6, DOMPurify 3.4.17, certifi 2026.10.19) — these foreshadow a routine maintenance release; no feature signals.

**Prediction:** The next version is most likely a **maintenance + platform-support release**, headlined by ARM64 Docker availability, with no major new agent features indicated by today's data.

## 7. User Feedback Summary

Direct user feedback today is **minimal** (no comments on any issue/PR). Inferred pain points from the dataset:

- **Pain point (resolved):** Users on ARM64 hardware could not run official Docker images — a practical blocker for Apple Silicon and cloud Graviton users ([#3168](https://github.com/nearai/ironclaw/issues/3168)).
- **Dissatisfaction (indirect):** Model-quality failures on `officeqa` (64 non-pass tasks) via DeepSeek-V4-Flash point to **model-side reliability gaps** rather than product defects ([#8153](https://github.com/nearai/ironclaw/issues/8153)).
- **Satisfaction signal:** The closure of a 6-month-old platform request suggests maintainers are responsive to long-tail infrastructure requests, which is generally viewed favorably by self-hosting users.

No explicit sentiment (positive or negative) was expressed in comments today.

## 8. Backlog Watch

Given the low comment counts, backlog risk is assessed by **age and lack of resolution**:

- [#3168](https://github.com/nearai/ironclaw/issues/3168) — **resolved today** after ~175 days open. Good closure, but the long lead time suggests maintainer bandwidth constraints on infrastructure requests.
- [#8153](https://github.com/nearai/ironclaw/issues/8153) — open, 0 comments; a **recurring automated taxonomy issue** that may benefit from maintainer triage or a linked fix workflow so model-quality failures feed back into model/route selection.
- PRs [#8155](https://github.com/nearai/ironclaw/pull/8155), [#8156](https://github.com/nearai/ironclaw/pull/8156), [#8157](https://github.com/nearai/ironclaw/pull/8157), [#8158](https://github.com/nearai/ironclaw/pull/8154) — four open Dependabot PRs created within the last 48h; **none require urgent attention**, but they will accumulate if not batch-merged. Note [#8155](https://github.com/nearai/ironclaw/pull/8155) supersedes the already-closed [#8149](https://github.com/nearai/ironclaw/pull/8149), so reviewers should avoid redundant work.

**Recommendation:** Maintainers should (1) confirm the ARM64 fix is actually shipped, (2) batch-merge the pending dependency PRs to avoid queue growth, and (3) consider linking the daily failure-taxonomy issue to an actionable triage process.

---
*Data source: github.com/nearai/ironclaw — digest generated 2026-10-23. All metrics reflect the 24-hour window provided.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-10-23

## 1. Today's Overview

QwenPaw is in a **high-activity, security-driven release cycle**. A post-release (`v2.2.2.post1`) shipped to remediate an emSign CA trust issue across dependencies, installers, and builds, accompanied by a maintainer-issued security notice recommending all users upgrade. Activity is intense across the board: **50 PRs updated in 24h (48 still open)** and **22 issues updated (20 open)**, indicating a large in-flight refactor (channels → plugins, per PR #8187 and Issue #8289) plus a mounting backlog of channel-specific and Console bugs. Overall health is **good but strained** — the team is clearly prioritizing security and the v2.3.0 extensibility refactor, while a growing set of user-reported functional regressions (QQ channel, model config migration, session deletion) awaits fixes.

---

## 2. Releases

### v2.2.2.post1 (Post-release)
- **PR #8369** — `chore: bump the version to v2.2.2post1` (by @cuiyuebing)
- **PR #8370** — `fix(security): remediate emSign CA trust across dependencies, installers, and builds` (by @qbc2016)

**Key points:**
- This is a **security post-release**, not a feature release. It addresses a CA trust issue (emSign) affecting dependencies, installers, and build artifacts.
- **Breaking changes:** None documented.
- **Migration notes:** None required — but a **mandatory upgrade recommendation** was issued in [Issue #8385](https://github.com/agentscope-ai/QwenPaw/issues/8385): *"Please upgrade to QwenPaw 2.2.2.post1 or later."*
- **Release verification:** [Issue #8386](https://github.com/agentscope-ai/QwenPaw/issues/8386) (Release Duty, now closed) tracked installation verification across four platform checkpoints.

> ⚠️ **Action for users:** All users on 2.2.2 or earlier should upgrade to 2.2.2.post1 as soon as it's available for their install method (Desktop installer, PyPI, Docker).

---

## 3. Project Progress

Merged/closed volume today is low relative to open activity — only **2 PRs merged/closed** and **2 issues closed** in 24h.

**Closed today:**
- [Issue #8392](https://github.com/agentscope-ai/QwenPaw/issues/8392) — `[question] HUB模式下配置本地模型给成员使用显示异常` (2 comments) — resolved quickly, likely user misconfiguration.
- [Issue #8386](https://github.com/agentscope-ai/QwenPaw/issues/8386) — Release Duty installation verification for v2.2.2.post1.

**In-flight / advancing:**
- **PR #8391** ([link](https://github.com/agentscope-ai/QwenPaw/pull/8391)) — `chore: merge Release/v2.2.2post1 into main`, the standard post-release merge-back.
- **PR #8187** ([link](https://github.com/agentscope-ai/QwenPaw/pull/8187), `size/XXXL`) — the flagship **channels-as-plugins with subprocess isolation** refactor. This is the backbone of the "lighter and more extensible" v2.3.0 effort announced in [Issue #8289](https://github.com/agentscope-ai/QwenPaw/issues/8289).
- **PR #8375** ([link](https://github.com/agentscope-ai/QwenPaw/pull/8375)) — fixes stale-request race after deleting a chat (addresses #8368).
- **PR #8366** ([link](https://github.com/agentscope-ai/QwenPaw/pull/8366)) — license hygiene: replaces **GPL-3.0 `html2text`** with a stdlib converter to restore Apache-2.0 compatibility.

**Interpretation:** The project is in the middle of a large architectural transition; merges are intentionally gated while the refactor lands, so throughput on the main branch is temporarily suppressed.

---

## 4. Community Hot Topics

| Rank | Item | Comments | Signal |
|---|---|---|---|
| 1 | [Issue #8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) — Plugin-facing theme extension point | 7 | Plugin ecosystem maturity |
| 2 | [Issue #8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) — Coming in v2.3.0: lighter & more extensible | 3 (+1 👍) | Roadmap transparency |
| 3 | [Issue #8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) — Composer draft keyed per-agent, not per-conversation | 3 | Core UX data model bug |
| 4 | Multiple issues at 2 comments | — | Consolidation around channel bugs |

**Underlying needs analysis:**
- **Plugin extensibility is the dominant theme.** Issue #8071 (theme tokens) and Issue #8289 (plugin refactor roadmap) together show a community that has adopted plugins but now wants *deeper* integration points — semantic theming, not just a single `colorPrimary` knob.
- **Hub/multi-user is a second theme.** [Issue #8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) requests **global Skill/MCP sharing** for teams — a clear sign QwenPaw is being deployed in shared organizational contexts, not just single-user desktops.
- **Roadmap engagement is healthy:** Issue #8289 invites user feedback on the v2.3.0 refactor, and users are responding — a good sign of two-way communication.

---

## 5. Bugs & Stability

Ranked by severity (impact × reproducibility):

### 🔴 Critical
1. **[Issue #8350](https://github.com/agentscope-ai/QwenPaw/issues/8350) — Feishu channel blocks the main event loop; service hangs when network is unreachable.** Symptom: `/api/healthz` times out, SIGTERM cannot exit. This is a **denial-of-service class bug** — a synchronous network call on the main loop. Sync-IO-in-async is a serious architectural defect.
   - *Fix PR:* Not yet identified. **Needs maintainer attention.**

2. **[Issue #8388](https://github.com/agentscope-ai/QwenPaw/issues/8388) — QQ channel broken after upgrade (`No module named '_qwenpaw_remote_backend'`).** The agent's own tool calls fail environment-wide, indicating a **broken upgrade path / missing module** in v2.2.2. High user impact — channel entirely unusable.

3. **[Issue #8335](https://github.com/agentscope-ai/QwenPaw/issues/8335) — 48 MB request bodies permanently wedge WeChat sessions.** Media in history is re-uploaded on every request, hitting provider body limits; session becomes permanently unusable.
   - *Fix PRs:* **[PR #8337](https://github.com/agentscope-ai/QwenPaw/pull/8337)** (stop replaying unneeded media) and **[PR #8299](https://github.com/agentscope-ai/QwenPaw/pull/8299)** (retry without video on rejection). ✅ Fix in flight.

### 🟠 High
4. **[Issue #8378](https://github.com/agentscope-ai/QwenPaw/issues/8378) — Model calls fail after upgrade** (`active_model` config format in old `agent.json` no longer matches). A **config migration regression** affecting upgraded installs.

5. **[Issue #8359](https://github.com/agentscope-ai/QwenPaw/issues/8359) — Hub-in-container Docker runtime fails: readiness probe hardcoded to 127.0.0.1 (Errno 111).** Breaks the very containerized Hub deployment the maintainers recommended in #8256.

6. **[Issue #8343](https://github.com/agentscope-ai/QwenPaw/issues/8343) — DingTalk final reply silently dropped when `sessionWebhook` expires** (errcode=300001, no Open API fallback). Silent data loss — user gets nothing.

### 🟡 Medium
7. **[Issue #8078](https://github.com/agentscope-ai/QwenPaw/issues/8078) — Cross-session `chat_with_agent` messages registered as separate chats**, splitting one session across multiple UI pages.
8. **[Issue #8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) — Composer draft keyed per-agent instead of per-conversation**; unsent text leaks across conversations.
9. **[Issue #8374](https://github.com/agentscope-ai/QwenPaw/issues/8374) — `QWENPAW_CORS_ORIGINS` set via Web UI/CLI has no effect** (constant read at import time, before env injection).
10. **[Issue #8329](https://github.com/agentscope-ai/QwenPaw/issues/8329) — Telegram ignores `reply_to_message`**; quoted context silently dropped (other channels implement this).
11. **[Issue #8342](https://github.com/agentscope-ai/QwenPaw/issues/8342) — Quoted replies lose control-command routing in seven channels** (`/stop` treated as normal traffic).

### 🟢 Low
12. **[Issue #8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)** — Sidebar group-header hover overlap (visual).
13. **[Issue #8368](https://github.com/agentscope-ai/QwenPaw/issues/8368)** — Deleting the active conversation returns 404. *Fix PR: [#8375](https://github.com/agentscope-ai/QwenPaw/pull/8375).* ✅
14. **[Issue #8377](https://github.com/agentscope-ai/QwenPaw/issues/8377)** — Bare `pytest` aborts during collection (`import file mismatch: test_backup`) on a clean checkout; blocks contributor local gate.
15. **[Issue #8372](https://github.com/agentscope-ai/QwenPaw/issues/8372)** — Hub AI gateway 120s timeout too short for file processing.

**Stability assessment:** The *channel layer* is the epicenter of defects — Feishu, QQ, Telegram, DingTalk, and WeChat all have open bugs. This strongly reinforces the case for the channels-as-plugins isolation refactor in PR #8187.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in v2.3.0 |
|---|---|---|
| Plugin semantic-theme override layer | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) | Medium — aligns with plugin refactor |
| Hub global Skill & MCP sharing | [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) | Medium — high team-use demand |
| Disable auto-scroll during streaming | [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) | Medium — small, self-contained |
| Lighter, modular plugin architecture | [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) | **High — explicitly slated for v2.3.0** |

**Prediction:** The **v2.3.0 plugin refactor** (Issue #8289, PR #8187) is the anchor of the next release. Expect it to ship alongside channel isolation and reduced host-process SDK imports. The Hub global Skill/MCP sharing request is the strongest *new* feature signal for enterprise/team adoption and may land in a subsequent minor release.

---

## 7. User Feedback Summary

**Pain points (dissatisfaction drivers):**
- **Upgrade regressions are the #1 frustration.** Multiple issues (#8378 model config, #8388 QQ channel) report breakage *after* upgrading to 2.2.2 — the most damaging category of feedback, since it erodes trust in the release process.
- **Channel reliability is uneven.** Feishu (event-loop blockage), DingTalk (silent drop), Telegram (missing quote context), and QQ (broken module) all show channel-specific fragility.
- **Large-media conversations become unusable** (WeChat 48 MB bodies) — a scalability concern for real heavy users.
- **Maintainer responsiveness looks good:** Most issues receive 1–3 comments within 1–2 days, and several have fix PRs already open (#8337, #8299, #8375).

**Use cases observed:**
- Team/multi-user deployments via **Hub** (Issues #8275, #8359, #8392).
- Heavy multimodal chat (screenshots, video) in WeChat sessions (#8335).
- Desktop streaming workflows (#7339).

**Satisfaction signals:**
- Positive engagement on the v2.3.0 roadmap post (#8289 has a 👍 and active discussion).
- Rapid closure of the Hub local-model question (#8392) suggests responsive triage.

**Overall sentiment:** Users are *engaged and invested* but *sensitive to upgrade breakage*. The community is pushing QwenPaw toward team/enterprise use — a sign of maturing adoption.

---

## 8. Backlog Watch

Items needing maintainer attention (long-open or high-impact with no fix PR):

1. **[Issue #8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) — Plugin theme extension point** (open since 2026-10-01, 7 comments, no 👍). Most-discussed open issue; no linked PR. Ties directly to the plugin roadmap — deserves a maintainer decision.

2. **[Issue #8078](https://github.com/agentscope-ai/QwenPaw/issues/8078) — Cross-session chat splitting** (open since 2026-10-02). Core data-model bug affecting multi-session UX; no fix PR.

3. **[Issue #8350](https://github.com/agentscope-ai/QwenPaw/issues/8350) — Feishu blocks main event loop** (open since 2026-10-21). Critical stability defect; no fix PR identified. **Highest-priority unaddressed bug.**

4. **[Issue #7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) — Disable auto-scroll on Desktop** (open since 2026-08-27). **~2 months old**, trivial to implement, still no PR. Low-hanging fruit going stale.

5. **[PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) — Channels-as-plugins (`size/XXXL`)** (open since 2026-10-12). Large, high-risk, no comment count shown — needs review bandwidth to avoid becoming a merge bottleneck for v2.3.0.

6. **[Issue #8377](https://github.com/agentscope-ai/QwenPaw/issues/8377) — `pytest` collection failure on clean checkout** (open since 2026-10-22). A one-file fix that blocks the CONTRIBUTING.md local gate — cheap to fix, improves contributor experience.

---

**Bottom line:** QwenPaw shows strong maintainer momentum (security post-release, major refactor in flight, responsive triage) but carries **concentrated risk in the channel layer and upgrade paths**. Prioritizing the Feishu event-loop bug (#8350), upgrade-regression triage (#8378, #8388), and landing the channels-as-plugins refactor (#8187) would convert today's high activity into durable stability ahead of v2.3.0.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-10-23

## 1. Today's Overview

ZeroClaw shows **high-velocity, security-heavy activity** in the last 24 hours: 35 issues updated (23 open/active, 12 closed) and 50 PRs touched (42 open, only 8 merged/closed), with no new releases. The open/closed ratio skewed toward open work suggests the project is in an active review-and-accumulate phase rather than a shipping phase — many large (`size:XL`) PRs are stacked and awaiting merge. The dominant themes are **identity/access control, plugin sandboxing, gateway/dashboard hardening, and CLI-only build support**, with a notable cluster of `release:v0.9.0` tagged items signaling the next milestone is being scoped now. One P0 (`#11225` memory owner preservation) and multiple P1 security items remain open, indicating the security review backlog is the main gate on progress. Overall project health is **strong but bottlenecked on maintainer review throughput**.

## 2. Releases

**No new releases in the last 24 hours.** No release notes, breaking changes, or migration guidance to report. However, activity is heavily oriented toward the upcoming **v0.9.0** milestone (many new `release:v0.9.0` labels appeared today), and there is residual v0.8.7/v0.8.6 work still closing out (e.g., `#11828` dist image, `#10999` Discord plugin proof).

## 3. Project Progress

Only 8 PRs were merged/closed in the last 24h (individual merged PR titles were not included in the dataset), but the **closed issue set reveals what landed or was resolved**:

- **RFC accepted & closed — append-only session event history** ([#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)): Deterministic state replay and derived agent streams RFC closed with 13 comments. This is a significant architectural direction (durable execution facts) that will underpin future state/replay features.
- **Plugin security fixes closed** ([#11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357), [#11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)): `plugin remove` directory-deletion bug and plugin tool-name pre-emption gate both closed — meaningful sandboxing hardening for v0.8.7.
- **OIDC token misclassification fixed** ([#11902](https://github.com/zeroclaw-labs/zeroclaw/issues/11902)): Valid tokens no longer refused as `Misconfigured` during concurrent JWKS fetch.
- **CI/build stability** ([#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558) Cranelift timeout, [#11828](https://github.com/zeroclaw-labs/zeroclaw/issues/11828) arm64 dist OOM, [#11928](https://github.com/zeroclaw-labs/zeroclaw/issues/11928) gateway bind test race) all closed.
- **Test hygiene**: [#11806](https://github.com/zeroclaw-labs/zeroclaw/issues/11806) made `late_tool_search` tests opt-in.
- **Advisory scanning** ([#11926](https://github.com/zeroclaw-labs/zeroclaw/issues/11926)): Full-lockfile RustSec audit added to daily scan.

**Net:** Security and CI reliability advanced; the large security PR stack (see §8) remains unmerged.

## 4. Community Hot Topics

| Item | Comments | Significance |
|---|---|---|
| [Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — Tracker: Runtime, dashboard sign-in and gateway delivery | 15 | The master roadmap tracker for v0.9.0; highest engagement. Drives the OIDC dashboard sign-in and gateway work. |
| [Issue #10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) — RFC: append-only session history & deterministic replay | 13 | Closed today. Strong architectural consensus; will shape persistence/observability. |
| [Issue #10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) — Prove Discord plugin installation from release binary | 9 | Live-verified on v0.8.6 macOS arm64; blocker is `status:blocked` on cross-platform proof. |
| [Issue #8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — delegate bypasses parent's tool allowlist | 5 | S0 security: sub-agents can invoke excluded tools. Updated today, still open. |

**Underlying need:** The community is converging on **trust boundaries** — who an agent is (OIDC identity), what it may do (tool allowlists, SOP authority), and what can replay/prove it happened (event history). Tracker #7432 is functioning as the coordination hub for these concerns.

## 5. Bugs & Stability

Ranked by severity (as reported in issues):

**S0 / Critical:**
- [Issue #8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — `delegate` bypasses parent tool allowlist; sub-agent invokes excluded tools. *Updated today, no explicit fix PR listed.*

**S1 / Workflow blocked:**
- [Issue #11957](https://github.com/zeroclaw-labs/zeroclaw/issues/11957) — OIDC enrollment sends raw client credentials in Basic header; reserved chars break `client_credentials`/device-grant. **Fix PR exists: [#11968](https://github.com/zeroclaw-labs/zeroclaw/pull/11968)** (form-encode before Basic header).

**S2 / Degraded behavior:**
- [Issue #11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) — Gateway WebSocket upgrades fail over built-in TLS listener (dashboard chat broken).
- [Issue #11962](https://github.com/zeroclaw-labs/zeroclaw/issues/11962) — Daemon's 64 live RPC sessions never released when idle → remote clients can exhaust them. **Fix PR: [#11964](https://github.com/zeroclaw-labs/zeroclaw/pull/11964)** (retire orphaned remote sessions).
- [Issue #11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) — Outbound email HTML carries raw markup + arbitrary image URLs (XSS-adjacent).
- [Issue #11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989) — Per-channel `excluded_tools` is never applied. **Fix PR: [#11990](https://github.com/zeroclaw-labs/zeroclaw/pull/11990)**.
- [Issue #11970](https://github.com/zeroclaw-labs/zeroclaw/issues/11970) — `agents delete/rename` skip owned-state cascade and live-ACP check in gateway-less builds.
- [Issue #11823](https://github.com/zeroclaw-labs/zeroclaw/issues/11823) — Shell scanner skips command substitution in unquoted-delimiter heredoc bodies (sandbox bypass).

**S3 / Minor:**
- [Issue #11972](https://github.com/zeroclaw-labs/zeroclaw/issues/11972) — `gateway get-paircode` exits 0 on failure (misleading automation).
- [Issue #11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987) — Inline `nosemgrep` comments don't suppress Semgrep alerts.
- [Issue #11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969) — `metrics`/`embedded-web` features pull whole gateway into headless builds.

**Stability note:** A striking pattern is that **most S2 bugs were reported yesterday and already have fix PRs today** (#11968, #11964, #11990) — responsiveness is good, but the gateway/runtime session and TLS paths clearly need more test coverage before v0.9.0.

## 6. Feature Requests & Roadmap Signals

New/active feature requests, strongly clustered around v0.9.0:

- **[#11961](https://github.com/zeroclaw-labs/zeroclaw/issues/11961) Dashboard sign-in with OIDC** + **[#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) Dashboard chat for non-admin accounts** — PR [#11965](https://github.com/zeroclaw-labs/zeroclaw/pull/11965) already implements OIDC dashboard sign-in. **Very likely v0.9.0.**
- **[#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971) CLI-only source build** (no gateway/dashboard/ACP) — PRs [#11974](https://github.com/zeroclaw-labs/zeroclaw/pull/11974)/[#11975](https://github.com/zeroclaw-labs/zeroclaw/pull/11975) advancing it. **Likely v0.9.0.**
- **[#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992) Email operator templates + sanitised HTML body for `send_via`** — pairs with [#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) (the security bug) and PR [#11939](https://github.com/zeroclaw-labs/zeroclaw/pull/11939) (quote original in replies).
- **[#11799](https://github.com/zeroclaw-labs/zeroclaw/issues/11799) Shell policy refusals should say why + accept operator hint** — PR [#11983](https://github.com/zeroclaw-labs/zeroclaw/pull/11983) implements it.

**Prediction:** v0.9.0 will be an **identity + deployment-optionality release**: OIDC everywhere (CLI→dashboard), CLI-only builds, and security-policy explainability. Channel-level tool exclusion fixes (per-channel `excluded_tools`, sender role narrowing in [#11068](https://github.com/zeroclaw-labs/zeroclaw/pull/11068)) also look v0.9.0-bound.

## 7. User Feedback Summary

**Pain points expressed via issues:**
- **Security defaults are too coarse / bypassable**: allowlists ignored by delegation (#8279), per-channel `excluded_tools` silently non-functional (#11989), shell scanner heredoc bypass (#11823). Users are actively probing and finding gaps — a sign of a maturing threat model but also of security surface complexity.
- **Error messages are unhelpful for agents and operators**: shell refusals return a bare bool-derived string (#11799), plugin info hides the runtime's config refusal ([PR #11811](https://github.com/zeroclaw-labs/zeroclaw/pull/11811)), `plugin_channel_sender_denied` didn't name the sender (#11821, closed). Operators want *actionable* diagnostics.
- **Resource exhaustion / correctness under load**: daemon session leak (#11962), OIDC race during JWKS fetch (#11902, fixed), Telegram 429 retry handling ([PR #11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651)). Users run ZeroClaw against real remote clients and rate-limited APIs.
- **Deployment flexibility demand**: the CLI-only build request (#11971) reflects users deploying on minimal servers who don't want gateway/dashboard weight.

**Satisfaction signal:** Users are filing precise, well-reproduced bugs with component/severity labels — indicative of an engaged, technically serious user base rather than casual users. Discord plugin live verification on macOS arm64 (#10999) shows a contributor (JordanTheJet) doing real end-to-end validation, a healthy sign.

## 8. Backlog Watch

**Long-open / high-priority items needing maintainer attention:**

- **[#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)** (open since 2026-06-24, S0 security, updated today) — delegate allowlist bypass. Open ~4 months with no linked fix PR. **Highest-risk open item.**
- **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)** (open since 2026-06-09, v0.9.0 tracker, 15 comments) — the roadmap tracker itself is aging; needs milestone clarity as v0.9.0 approaches.
- **[#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951)** — Gateway TLS WebSocket failure; blocks dashboard chat over TLS. No fix PR yet.
- **Large security PR stack (all open, all touched today, all `size:XL`)** awaiting review — these gate the security posture and likely v0.9.0:
  - [#11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225) (`priority:p0`, preserve owner in delegation) — root of the stack.
  - [#11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220) (admin authority for SOP execution), [#11230](https://github.com/zeroclaw-labs/zeroclaw/pull/11230) (withhold session-data tools from non-admins), [#11234](https://github.com/zeroclaw-labs/zeroclaw/pull/11234) (judge queued session ownership).
  - [#11301](https://github.com/zeroclaw-labs/zeroclaw/pull/11301) (shared committed-rename recovery, `release-gate`, `needs-author-action`).
- **[PR #11737](https://github.com/zeroclaw-labs/zeroclaw/pull/11737)** — RPC session restart recovery, currently draft with `master` conflicts; blocked on integration acceptance.
- **[#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999)** — Discord plugin cross-platform proof is `status:blocked`; only macOS arm64 verified.

**Maintainer action recommendation:** The critical path is **review capacity on the stacked identity/security PRs (#11225 stack)** and **assigning an owner to #8279**. With 42 open PRs and only 8 merged/closed in 24h, merge throughput — not feature input — is the project's current constraint.

---
*Digest generated for 2026-10-23. All links point to `github.com/zeroclaw-labs/zeroclaw`. Comment/reaction counts as reported; some PR data fields were unavailable ("undefined") in the source.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*