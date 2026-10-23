# OpenClaw Ecosystem Digest 2026-10-23

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-23 05:33 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-10-23

## 1. Today's Overview

OpenClaw is operating at very high throughput today, with 500 issues and 500 PRs updated in the last 24 hours, reflecting a mature, heavily-trafficked project with an active maintainer and triage pipeline (clawsweeper bot) and a large self-hosted user base. Activity skews toward stability hardening rather than new capability: the issue queue is dominated by P0/P1 crash-loop, message-loss, and session-state regressions, while the PR queue is dominated by `steipete` and other maintainers folding single-consumer internal surfaces, fixing restart-recovery authority bugs, and improving UI/perf. The project shipped **v2026.10.6**, whose headline item is a mandatory Node runtime bump to patch a TLS certificate compromise — a security-driven forced upgrade. Net health signal: strong maintainer responsiveness, but a persistent backlog of long-lived platform-specific regressions (Windows, macOS sleep/wake) that keep resurfacing across releases.

---

## 2. Releases

### v2026.10.6 — openclaw 2026.10.6

**Highlight: Patched Node runtime is now required.**

- **Breaking/enforced change:** OpenClaw now requires **Node 24.22.1+ (24 line)** or **26.12.1+ (26 line)**. These runtimes reject TLS chains signed with the compromised certificate keys addressed in the October 2026 Node.js security releases.
- **Docker:** official images now ship Node 24.2x (aligned to the patched line).
- **Migration note:** Operators running older Node 24.x or 26.x builds must upgrade Node before installing this release, or TLS chains signed with compromised keys may still be accepted. This is a security-driven forced upgrade with no feature content described.

No other releases in the last 24h.

---

## 3. Project Progress

**PR throughput:** 259 PRs merged/closed in the last 24h vs. 241 still open — a healthy merge rate.

Notable merged/closed work visible today:

- **PR #181200 (closed)** — `fix(compaction): explain empty summary budget failures` — improves operator error messaging when compaction summaries are length-stopped/empty. [link](https://github.com/openclaw/openclaw/pull/181200)
- **PR #177929 (closed)** — `fix(ui): Show earlier loses keyboard focus while older history loads` — accessibility fix in Chat. [link](https://github.com/openclaw/openclaw/pull/177929)
- **PR #181191 (closed)** — `fix(control-ui): preserve in-flight MCP app setup` — an experiment documenting **15–33 duplicate `mcp.app.view` requests** per signed-in dashboard reload. [link](https://github.com/openclaw/openclaw/pull/181191)
- **PR #181351 (closed)** — `refactor: fold single-consumer entry and provider surfaces` — internal cleanup across provider plugins, no user-visible change. [link](https://github.com/openclaw/openclaw/pull/181351)
- **PR #181176 (closed)** — `docs: explain plugin-owned database client error recovery` — documents a hardening pattern after #146290 (plugin PG client error could terminate Gateway). [link](https://github.com/openclaw/openclaw/pull/181176)
- **Issue #148308 (closed)** — Tailscale Serve claim loss after `tailscaled` restart. [link](https://github.com/openclaw/openclaw/issues/148308)
- **Issue #126836 (closed)** — `sessions.reset` reporting success without creating a window. [link](https://github.com/openclaw/openclaw/issues/126836)
- **Issue #144678 (closed)** — iOS manual Gateway host scheme bug. [link](https://github.com/openclaw/openclaw/issues/144678)

Themes advancing: restart-recovery correctness (PRs #181363, #181373, #181364), memory plugin authority for subagent/`sessions_send` sessions (PR #181359), and lazy-loading/perf cleanup in Control UI (PRs #181142, #181334, #181355).

---

## 4. Community Hot Topics

Ranked by comment volume:

1. **#160959 [OPEN, P0]** — *Gateway blocks for minutes while capturing large external plugins (2026.9.6 regression)* — 43 comments. Event-loop stall of minutes at startup and on prepared-runtime republish. [link](https://github.com/openclaw/openclaw/issues/160959)
   - **Need:** Regressions in the plugin-generation capture path are the single loudest complaint. Users on large plugin trees are effectively blocked.

2. **#42475 [OPEN, P2]** — *Per-agent cost budget enforcement at the gateway level* — 27 comments, 1 👍. [link](https://github.com/openclaw/openclaw/issues/42475)
   - **Need:** Operators want daily/monthly spend caps enforced before model dispatch, without external monitoring. Long-lived (filed 2026-03) and still a product-decision item.

3. **#53763 [CLOSED, P3]** — *Built-in headless browser for reliable web access* — 18 comments. [link](https://github.com/openclaw/openclaw/issues/53763)
   - **Need:** Eliminate the fragile three-layer (user Chrome / third-party API) web-access dependency.

4. **#168955 [OPEN, P1]** — *Startup regression 2026.10.1: ready ~1030s vs ~410s (Windows); sidecars.control-ui-assets blocks 477s* — 17 comments. [link](https://github.com/openclaw/openclaw/issues/168955)
   - **Need:** Windows startup is degraded ~2.5x, traced to an asset sidecar phase.

5. **#157531 [OPEN, P3]** — *2026.9.7 Fixes Tracker* — 17 comments. [link](https://github.com/openclaw/openclaw/issues/157531)

**Analysis:** Community energy is concentrated on *performance of startup/runtime paths* and *operational guardrails (cost budgets, egress/secret substitution)*. The volume of P0 crash-loop issues suggests a user base running long-lived, high-agent-count deployments (e.g., #180690 with ~810 agents).

---

## 5. Bugs & Stability

Ranked by severity/impact among today's updates:

| Issue | Severity | Impact | Fix PR? |
|---|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) — Gateway blocks minutes on large plugin capture | P0 | Event-loop stall; crash-loop | No new fix PR |
| [#156712](https://github.com/openclaw/openclaw/issues/156712) — `openclaw triage` subprocess holds gateway-lifecycle lock, blocks restart | P0 | Release blocker | No new fix PR |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) — Live Docs ahead of release (Heartbeat IsolatedSessions) | P0 | Docs/behavior mismatch | No |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) — Billing cooldown outlives outage; ~5h fixed lockout | P0 | Auth/provider | No |
| [#158592](https://github.com/openclaw/openclaw/issues/158592) — Post sleep/wake: prepared runtime publication times out, all messages fail until restart | P0 | Message-loss | No |
| [#166634](https://github.com/openclaw/openclaw/issues/166634) — Late reclamation checkpoint failure leaves agent unavailable | P0 | Session-state/message-loss | No |
| [#168955](https://github.com/openclaw/openclaw/issues/168955) — Windows startup ~1030s regression | P1 | Crash-loop/slow | No |
| [#180690](https://github.com/openclaw/openclaw/issues/180690) — `doctor --fix` heap OOM at 6 GB on ~810-agent state; 3 passes, ~110 min | P1 | Crash-loop | No |
| [#140010](https://github.com/openclaw/openclaw/issues/140010) — Windows sleep/resume WebSocket reconnect fails 30–60s+ | P1 | Crash-loop | No |
| [#172837](https://github.com/openclaw/openclaw/issues/172837) — Codex nativeSubagentAssignments never removed after delivery gives up | P1 | Session-state/message-loss | No (source-repro) |
| [#145690](https://github.com/openclaw/openclaw/issues/145690) — Subagent completion releases runtime generation; next lane task fails in ~15ms, message dropped | P1 | Message-loss | No |
| [#160485](https://github.com/openclaw/openclaw/issues/160485) — Plugin load CPU-bound on module compilation; 3 channel plugins = 57.4s of 60s | P1 | Startup perf | No |
| [#167557](https://github.com/openclaw/openclaw/issues/167557) — Deferred plugin migration never converges (Linux/npm) | P1 | UX friction | Shape clear |
| [#166004](https://github.com/openclaw/openclaw/issues/166004) — Windows scheduled-task Gateway won't start; 2026.9.8 update rolls back | P0 | Release blocker | No |
| [#141413](https://github.com/openclaw/openclaw/issues/141413) — macOS app omits token for local Gateway using SecretRef | P0 | Auth | No |
| [#141615](https://github.com/openclaw/openclaw/issues/141615) — WebChat stuck "Authenticated profile verification is unavailable" wedges all RPCs | P0 | Release blocker | Linked PR open |

**Notable patterns:**
- **Windows is a recurring pain point**: #168955, #140010, #157812, #166004, #155359 (SQLite write-transaction holds 5.9–33.2s past `busy_timeout=5000ms`).
- **Sleep/wake recovery is fragile** on both macOS (#158592) and Windows (#140010).
- **Runtime-generation lifecycle bugs** (#145690, #172837) are causing silent message drops in subagent/delegation flows.
- **Memory/DB schema migrations** at scale (#180690) are OOM-prone.
- Very few of these P0s have new fix PRs today — a maintainer-attention gap for crash-loop-class bugs.

---

## 6. Feature Requests & Roadmap Signals

Active feature requests and likely direction:

1. **#42475 — Per-agent cost budget enforcement at the gateway** (P2, product-decision). Strong operator demand; a natural fit for a future release given existing `session-cost-usage.ts` tracking.
2. **#180139 (PR, open) — Bundle the Knowledge memory plugin** — evidence-backed memory plugin would ship with core, off by default. Strong roadmap signal toward *first-class memory*. [link](https://github.com/openclaw/openclaw/pull/180139)
3. **#71142 — Configurable Control UI upload size limit** (currently hardcoded 5MB). [link](https://github.com/openclaw/openclaw/issues/71142)
4. **#71330 — Configurable memory promotion target file** (currently hardcodes `MEMORY.md`, subject to 12KB bootstrap truncation). [link](https://github.com/openclaw/openclaw/issues/71330)
5. **#144306 — Deliver automations to a paired node** (scheduled results as app notifications). [link](https://github.com/openclaw/openclaw/issues/144306)
6. **#138279 — Linux aarch64 companion builds (deb + AppImage)**. [link](https://github.com/openclaw/openclaw/issues/138279)
7. **#181375 (PR, open) — `gateway lanes` CLI for `diagnostics.lanes` RPC** — operator-facing diagnostics polish; likely to land soon. [link](https://github.com/openclaw/openclaw/pull/181375)
8. **#80638 — Make `MAX_OVERFLOW_COMPACTION_ATTEMPTS` config-driven** (currently hardcoded 3; each attempt is billable). [link](https://github.com/openclaw/openclaw/issues/80638)

**Prediction for next release (2026.10.7+):** bundled/logbook-adjacent plugin bundling (#180139), gateway diagnostics CLI (#181375), and continued restart-recovery correctness fixes (#181363/#181373/#181364). Cost-budget enforcement (#42475) is more likely a 2026.11 roadmap item given its long open status and product-decision tag.

---

## 7. User Feedback Summary

**Pain points (dissatisfaction):**
- **Startup/performance at scale:** Windows users report ~2.5x startup regression (#168955); plugin-heavy installs see minute-long event-loop stalls (#160959) and 57s plugin phases (#160485). Users with hundreds of agents hit OOM in `doctor --fix` (#180690).
- **Reliability of delegation/subagents:** Multiple users report silent message drops when subagent runs complete and runtime generations are released (#145690, #172837) — a class of bug that erodes trust in autonomous operation.
- **Sleep/wake fragility:** Laptop users (macOS + Windows) repeatedly lose Gateway connectivity for 30–60s+ after resume (#140010, #158592).
- **Secret/auth config friction:** macOS app omits tokens with `SecretRef` (#141413); WebChat can wedge all RPCs on a stuck profile verification (#141615); ported internal context carrier leaks as a visible user-role turn on Teams (#136360).
- **Self-hosted autonomy blocked by approval loops:** #151112 describes security/approval mechanisms turning owners into manual executors even after delegation.

**Satisfaction/positive use cases:**
- Strong engagement around memory-core dreaming/QMD and lifecycle-aware curation (#112349, #87660) shows users investing deeply in long-term memory.
- Rich ecosystem usage (browser plugin, google-meet, Node companion) shows adoption beyond the core chat loop.
- High 👍 on some long-standing requests (#48920 has 4 👍) signals sustained interest rather than churn.

**Net sentiment:** Power users are committed but visibly taxed by platform-specific instability and by the operational cost of running OpenClaw at scale. The fastest satisfaction win would be hardening Windows startup and sleep/wake recovery.

---

## 8. Backlog Watch

Long-unanswered or high-importance items needing maintainer attention:

- **#42475** — Per-agent cost budgets. Open since 2026-03-10; 27 comments; tagged `needs-product-decision`. A clear product signal stuck without a decision. [link](https://github.com/openclaw/openclaw/issues/42475)
- **#48920** — Live Docs ahead of release (Heartbeat IsolatedSessions). P0, open since 2026-03-17; docs/release mismatch confuses users. [link](https://github.com/openclaw/openclaw/issues/48920)
- **#115642** — Billing cooldown outlives outage. P0, open since 2026-07-29; affects subscription auth users with a hard ~5h lockout. [link](https://github.com/openclaw/openclaw/issues/115642)
- **#155359** — Windows SQLite write-transaction holds past `busy_timeout`. P1, supersedes #154971; needs maintainer review. [link](https://github.com/openclaw/openclaw/issues/155359)
- **#157812** — Windows auto-update fails repeatedly (managed-service-preflight, unexpanded `$OPENCLAW_STATE_DIR`, `reconcile:abandoned`). P2, needs-info. [link](https://github.com/openclaw/openclaw/issues/157812)
- **#157531** — 2026.9.7 Fixes Tracker. Stale; a rolling tracker that may need closure or re-scoping. [link](https://github.com/openclaw/openclaw/issues/157531)
- **PR #119762** — `feat(release): validate Windows-node releases and main`. Open since 2026-08-05; waiting on author; would add needed Windows compatibility lanes. [link](https://github.com/openclaw/openclaw/pull/119762)
- **PR #75225** — `feat(agents): expose configured descriptions in agents_list`. Stale since 2026-04-30; proof supplied but awaiting maintainer decision. [link](https://github.com/openclaw/openclaw/pull/75225)
- **PR #173437** — `fix(release): move validation waivers into trusted tooling`. XL, `needs proof`, touches release/security boundaries. [link](https://github.com/openclaw/openclaw/pull/173437)

### Health Assessment
- **Strengths:** High maintainer cadence (259 PRs merged/closed in 24h), disciplined triage labeling (clawsweeper/impact/severity tags), and rapid security response (TLS-compromise Node bump in v2026.10.6).
- **Risks:** A durable cluster of **P0 crash-loop / message-loss regressions** without attached fix PRs, concentrated on Windows, sleep/wake recovery, and runtime-generation lifecycle. If unaddressed, these will keep qualifying as release blockers and erode trust in autonomous operation at scale.
- **Opportunity:** The backlog contains several near-ready wins (diagnostics CLI, memory CRUD fixes, UI perf/accessibility) and one high-consensus feature (cost budgets) that could materially improve operator confidence.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Data window:** 2026-10-23 | **Projects:** OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The five projects analyzed span a wide maturity spectrum — from OpenClaw's high-throughput, self-hosted flagship (~500 issues/PRs updated daily, mandatory security-driven runtime bump) to IronClaw's near-dormant maintenance window (8 total items, Dependabot-only PRs). Across the ecosystem, the dominant engineering theme in October 2026 is **hardening over expansion**: crash-loop/message-loss remediation on Windows and sleep/wake paths (OpenClaw, Hermes, QwenPaw), identity/principal-scope enforcement in multi-tenant deployments (ZeroClaw), and channel-adapter reliability (QwenPaw, ZeroClaw). A secondary but persistent theme is **memory governance** — write-time budgets, promotion targets, and privacy boundaries — appearing independently in OpenClaw, Hermes, and QwenPaw. Security events (Node TLS compromise in OpenClaw; emSign CA in QwenPaw) drove two forced-upgrade releases in 24 hours, underscoring that supply-chain hygiene is now a first-class release concern.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Merge Rate (PRs merged/updated) | Release Status (24h) | Health Signal |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 259 merged / 500 (≈52%) | **v2026.10.6** — mandated Node runtime bump (TLS compromise) | Strong throughput; durable P0 backlog (Windows, sleep/wake, runtime-gen) without fix PRs |
| **Hermes Agent** | 50 | 50 | 15 merged / 50 (30%); 0 issues closed | **v0.22.5** — rollup of ~81 PRs pre-v0.23.0 | Feature momentum strong; release/update-path quality is the dominant risk |
| **IronClaw** | 2 | 6 | 1 merged (superseded Dependabot) | **None** | Stable but low-velocity; maintenance-only; human contribution effectively paused |
| **QwenPaw** | 22 | 50 | 2 merged / 50 (4%) | **v2.2.2.post1** — emSign CA security hotfix | Responsive on security; severe PR review-bandwidth bottleneck; upgrade-regression cluster |
| **ZeroClaw** | 34 | 50 | 8 merged/closed PRs; 11 issues closed | **None** (pre-v0.9.0 stabilization) | High volume; merge-throughput risk from stacked XL security PRs |

**Composite read:** Only OpenClaw demonstrates a balanced high-volume pipeline. QwenPaw and ZeroClaw show high *input* volume with constrained *output* — a classic pre-major-release review bottleneck. Hermes is mid-cycle between stability patches. IronClaw is effectively idle on human-driven work.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Throughput at scale:** 500 issues + 500 PRs updated in 24h — roughly 10× Hermes and QwenPaw, and ~15× ZeroClaw. 259 merged PRs/24h is unmatched.
- **Disciplined triage infrastructure:** Automated `clawsweeper` bot with `impact`/`severity` labeling yields a machine-parseable backlog — a maturity marker none of the peers match.
- **Release engineering cadence:** Ships feature-named releases (v2026.10.6) with explicit migration notes, whereas Hermes defers curated notes to the next minor (v0.23.0) and QwenPaw/ZeroClaw are mid-cycle.
- **Ecosystem breadth:** Browser plugin, google-meet, Node companion, Teams — wider integration surface than any peer.

**Technical approach differences:**
- OpenClaw is the **heaviest / most pluggable architecture** in the set: plugin-generation capture, MCP app setup, prepared-runtime publication, gateway lanes, sidecar asset phases. This power is also its liability — the same plugin/capture complexity produces the P0 event-loop stalls (#160959) and Windows startup regressions (#168955) absent from leaner peers.
- Hermes and QwenPaw share OpenClaw's gateway/plugin model but with fewer architectural layers; ZeroClaw trades breadth for a security-first principal-scoped design; IronClaw is a smaller Rust/Cranelift-based artifact.

**Community size comparison:**
- OpenClaw is the clear **category reference** — its issue comment counts (43 on #160959, 27 on #42475) and long-lived operator threads indicate a large, self-hosted power-user base running hundreds of agents (e.g., ~810-agent deployments). Peers operate at ~1/10 the engaged population.
- However, **measured by reaction intensity**, Hermes punches above its weight: #18715 carries 👍42, higher than any OpenClaw item in today's set — suggesting a smaller but more ideologically invested community.

---

## 4. Shared Technical Focus Areas

| Requirement | Projects | Specific Need |
|---|---|---|
| **Memory governance / write-time budgets** | OpenClaw (#71330, #42475), Hermes (#135039, #116788), QwenPaw (#8376 PowerContext) | Per-file promotion targets, write-time budget/acceptance pipelines, privacy boundaries preventing forbidden saves |
| **Principal-scoped access & permission enforcement** | ZeroClaw (#8279, #11220, #11230, #11327), OpenClaw (#141413 SecretRef, #151112 approval loops) | End-to-end identity scope — current implementations enforce only partially (delegate bypass, approval-loop-toil) |
| **Channel-adapter reliability / reply semantics** | QwenPaw (#8342, #8329, #8343 — 4 of 13 bugs channel-specific), ZeroClaw (#11821, #11989) | Quoted-reply routing, silent-drop elimination, per-channel tool filtering, sender identification in logs |
| **Safe approval / destructive-command classes** | Hermes (#141346 osascript data loss), OpenClaw (#151112) | Distinguish OS-automation/destructive commands from ordinary tool use; prevent "smart" mode auto-approving data-destroying actions |
| **Update-path durability** | Hermes (#143331, #143401, #143361), QwenPaw (#8388, #8378), OpenClaw (forced Node upgrade) | Self-healing updates, cross-platform (esp. Windows) installer reliability, accurate version reporting |
| **Startup / performance at scale** | OpenClaw (#168955, #160485), QwenPaw (PR #8244, 15.1s startup win) | Event-loop stall elimination, plugin-load CPU profiling, Windows-specific startup regressions |
| **Cross-gateway / federated collaboration** | Hermes (#97681, 👍4), ZeroClaw (multi-principal OIDC), OpenClaw (autonomy across owners) | Federated personal agents without surrendering per-owner control of models/tools/memory/credentials |
| **Minimal / headless deployment** | ZeroClaw (#11971, #11969), OpenClaw (CLI-only), IronClaw (ARM64 deployment) | CLI-only builds, feature-flag isolation to prevent gateway bleed into headless artifacts |

**Signal:** Four of five projects independently surfaced memory governance and permission-scope enforcement. These are converging into **table-stakes requirements**, not differentiators.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Feature focus** | Broadest: gateway, MCP, delegation, memory-core, browser | Media-gen catalog (FAL/HeyGen), kanban, delegation, cross-gateway collab | Lightweight Rust artifact; benchmark/model evaluation (`officeqa`) | Plugin/channel extraction (v2.3.0), Hub team deployment, PowerContext memory | Security-first: OIDC, principal-scoped delegation, Goal Mode durable lifecycle |
| **Target users** | Self-hosted power operators running large agent fleets | Developers/architects wanting federated personal agents | Evaluation/benchmark consumers; narrow deploy footprint | Desktop single-user → emerging team/Hub persona | Security-conscious multi-tenant / enterprise operators |
| **Architecture** | Heavy multi-layer plugin + gateway + runtime-generation + sidecar | Gateway + kanban dispatcher + plugin hooks; LLM-cadence-sensitive | Rust + Cranelift (aarch64 native); minimal surface | Python core + subprocess-isolated channel plugins (v2.3.0 direction) | Rust; append-only event-sourced session state (#10526); principal-scoped access model |
| **Security posture** | Reacts fast (TLS bump) but approval loops taxed autonomy | Trust model actively shaken (#141346) | Dependency hygiene (dompurify) only | Forced security upgrade (emSign) but regression-prone | **Most proactive** — stacked security PRs, allowlist containment, OIDC-native |
| **Distinctive bet** | Breadth & integration ecosystem | Federated/cross-owner collaboration + media-gen | Benchmark-driven model-quality loop | Team/Hub deployment persona | Identity/access as the foundation layer |

**Key contrast:** ZeroClaw is the only project treating **identity and access control as the architectural centerpiece**; OpenClaw treats **integration breadth** as its moat; Hermes is the only one seriously designing **cross-gateway federation**; QwenPaw is the only one visibly pivoting from single-user desktop toward a **team/Hub persona**; IronClaw's differentiation (benchmark harness + Rust/Cranelift) is narrow and currently under-utilized.

---

## 6. Community Momentum & Maturity

**Tier 1 — High-volume, mature, self-sustaining (OpenClaw):**
- Balanced merge pipeline (52% merge rate), automated triage, security-responsive releases.
- Risk: durable P0 crash-loop class without attached fix PRs; Windows and sleep/wake consistently weakest links.

**Tier 2 — High-velocity, pre-major-release, contributor-rich (Hermes, ZeroClaw, QwenPaw):**
- **Hermes:** Rapid iteration; 0 issues closed vs. 50 active means a growing backlog. Many bugs already have fix PRs — healthy feedback loop. v0.23.0 stabilization window.
- **ZeroClaw:** Highest *architectural ambition* (event-sourced sessions, Goal Mode). Bottleneck is **stacked XL security PRs refreshing daily without merge** — an integration-sequencing problem, not a contribution problem.
- **QwenPaw:** Strongest *contributor health signal* (first-time contributors landing XXXL PRs: #8376, #8345, #8328) but **4% PR merge rate** is the ecosystem's sharpest review-bandwidth constraint. Oldest untouched request 57 days (#7339).

**Tier 3 — Low-velocity / maintenance mode (IronClaw):**
- Dependabot-only activity; human contribution paused. The unanswered daily failure taxonomy (#8153) will accrue silent model-quality debt absent a triage owner. ARM64 closure without a visible merge (#3168) needs verification.

**Rapidly iterating:** Hermes (feature + fix), ZeroClaw (security architecture), QwenPaw (plugin architecture).
**Stabilizing:** OpenClaw (stability hardening over capability), Hermes (pre-v0.23.0), ZeroClaw (pre-v0.9.0).
**Stalled:** IronClaw.

---

## 7. Trend Signals — Value for AI Agent Developers

1. **Memory is becoming a governed subsystem, not a scratchpad.**
   Three projects independently requested write-time budgets, promotion targets, and acceptance pipelines. **Actionable:** design memory with per-file budgets, injection-cost awareness (MEMORY.md enters *every* turn), and explicit user-consent boundaries before they become retrofits.

2. **Approval heuristics are a trust liability.**
   Hermes #141346 (smart mode → deleted unsaved PowerPoint) and OpenClaw #151112 (owners turned into manual executors) bracket the problem from both sides. **Actionable:** implement a distinct **destructive/OS-automation class** requiring stricter confirmation than generic tool approval — "smart" must not mean "silent on irreversible actions."

3. **Identity enforcement must be end-to-end or it is theatre.**
   ZeroClaw's recurring escapes (#8279, #11220, #11230, #11327) show scope is easy to declare and hard to enforce. **Actionable:** treat allowlist containment, sub-agent delegation, and channel routing as a single audit surface; verify scope at *every* dispatch, not just session creation.

4. **Update paths are a first-class reliability surface.**
   Windows update failures in Hermes (every run) and QwenPaw (post-upgrade QQ breakage; schema mismatch), plus OpenClaw's forced Node bump, show the *delivery mechanism* is as fragile as the software. **Actionable:** versioned, self-healing, channel-aware updates with accurate version reporting are a competitive feature, not plumbing.

5. **Cross-platform parity (esp. Windows, sleep/wake) remains unsolved.**
   Windows is over-represented in bug clusters across OpenClaw, Hermes, and QwenPaw. **Actionable:** add Windows + resume-from-sleep to CI lanes before they qualify as release blockers (see OpenClaw PR #119762).

6. **Federation is the next architectural frontier.**
   Hermes #97681 (cross-gateway collaboration, top-commented) and ZeroClaw's multi-principal OIDC both point at **federated personal agents with preserved owner autonomy**. **Actionable:** treat identity/trust as the hard problem, not transport.

7. **Supply-chain hygiene is now release-critical.**
   Two forced security upgrades in one 24h window (Node TLS, emSign CA). **Actionable:** pin patched runtimes, sign/verify installers, and prepare drop-in patch channels.

8. **Plugin architecture is under-specified as the primary extension surface.**
   QwenPaw's one-theme-knob limitation (#8071) and ZeroClaw's plugin tool-name gate (#11327) show plugins lack a semantic contract. **Actionable:** define a descriptor/token layer and capability model before plugin counts grow.

9. **Emerging norm: AI-authored, evidence-backed issues.**
   QwenPaw #8078 carries an explicit AI-disclosure notice with reproducible local evidence — a governance pattern worth adopting as agent-generated issue volume rises.

**Bottom line for decision-makers:** The ecosystem's competitive axis is shifting from *capability breadth* (OpenClaw's historical strength) toward *trustworthiness* — enforced scope, governed memory, safe approvals, and durable updates. Projects that treat these as first-class subsystems (ZeroClaw's security-first posture; Hermes's responsive fix-PR loop) are best positioned for the enterprise/team deployments that QwenPaw and ZeroClaw are already courting.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest
**Date:** 2026-10-23 | **Repo:** [github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. Today's Overview

Hermes Agent shows sustained high-velocity activity: **50 issues and 50 PRs updated in the last 24 hours**, with 15 PRs merged/closed and 35 still open. A patch release (**v0.22.5**) rolled up ~81 merged PRs into a stable tag ahead of v0.23.0. Notably, **zero issues were closed** today against 50 active — the open backlog continues to grow faster than it drains, and a large share of today's activity is concentrated in **bug reports tied to the v0.22.x update path and gateway reliability** (Windows update failures, session resume, compaction crashes). The project's own velocity ("thousands of commits per week") is itself now a recurring theme in the community, appearing both as a feature request (self-healing updates) and as a root cause of the update-related bug cluster.

**Health assessment:** Feature momentum is strong (new FAL media models, delegation, kanban), but **release-quality and update-mechanism stability are the dominant risk signals this week.**

---

## 2. Releases

### v0.22.5 — Patch Release (Oct 22, 2026)
> "Patch release. This tag rolls up the ~81 PRs merged since v0.22.4 into a stable release for the GitHub release (CLI and installers), the Microsoft Store app, Docker and Hermes Cloud. Full curated notes for this window ship with v0.23.0."

- **Changes:** Aggregated rollup of ~81 merged PRs; no individually itemized changelog in this release.
- **Breaking changes:** None declared for this patch.
- **Migration notes:** None required. Full curated notes deferred to v0.23.0.
- **Caveat worth flagging:** This release is *simultaneous with* a cluster of fresh update-path bugs (see §5), several of which report the update mechanism itself failing on Windows and on local checkouts. Users on pinned/stable channels should watch the fix PRs (#143407, and the update-tag/merge-base issues) before relying on `hermes update`.

---

## 3. Project Progress (Merged / Closed PRs Today)

15 PRs were merged or closed. Highlights visible in the data:

| PR | Type | Summary | Link |
|---|---|---|---|
| #143322 | Bug (CLOSED) | **Quick Setup** now acknowledges an import from another agent and offers to keep the imported model (Keep = default) instead of silently replacing it with Nous Portal. Fixes an auth/config papercut for first-time users. | [#143322](https://github.com/NousResearch/hermes-agent/pull/143322) |
| #40016 | Bug (CLOSED) | **Email gateway** Purelymail compatibility: gates the IMAP `ID` command on server capability support and accepts proprietary `Authentication-Results` headers (fail-closed). | [#40016](https://github.com/NousResearch/hermes-agent/pull/40016) |
| #96932 | Bug (CLOSED) | **Vision runtime coherence** after restore — republishes primary runtime to auxiliary consumers, atomic provider/model identity, prompt-cache preservation. | [#96932](https://github.com/NousResearch/hermes-agent/pull/96932) |
| #99372 | Bug (CLOSED) | **Kanban default-board dispatch** made safe/durable — `--dry-run` now a true no-write preview via in-memory SQLite snapshot; dispatcher workers routed through the `chat -Q` exit-status path. | [#99372](https://github.com/NousResearch/hermes-agent/pull/99372) |
| #96733 | Bug (CLOSED, dup) | **Kanban goal loop** now honors the judge's `transport_failed` flag instead of discarding it. | [#96733](https://github.com/NousResearch/hermes-agent/pull/96733) |

**Direction:** This batch is heavily weighted toward **stabilizing kanban, vision, and gateway subsystems** rather than shipping new surface area — consistent with a pre-v0.23.0 stabilization push.

---

## 4. Community Hot Topics

Ranked by comment count / reactions:

**1. [#97681 — Let Bots collaborate across gateways](https://github.com/NousResearch/hermes-agent/issues/97681)** · 40 comments · 👍4 · P3 · `needs-decision`
The single most-discussed issue. Proposes a foundation for **cross-gateway, cross-owner Bot collaboration** while preserving each owner's control over models, tools, memory, and credentials. Tagged `sweeper:risk-session-state` and `sweeper:risk-message-delivery` — signaling the maintainers see session/message-delivery implications. Underlying need: users want *federated personal agents* without surrendering autonomy — an identity/trust problem more than a transport problem.

**2. [#141346 — Smart approval auto-approved `osascript` that deleted an unsaved PowerPoint (data loss)](https://github.com/NousResearch/hermes-agent/issues/141346)** · 35 comments · P3 · `type/security`
A severe, concrete safety failure: the "smart" approval mode greenlit an AppleScript that drove the user's live PowerPoint to close an unsaved deck and delete its export — unrecoverable data loss. High emotional salience and a direct challenge to the trust model of `approvals.mode = smart`. Underlying need: **the approval heuristic needs a stricter class for OS-automation / destructive commands.**

**3. [#18715 — Support remote Hermes agent with local tool execution](https://github.com/NousResearch/hermes-agent/issues/18715)** · 29 comments · 👍42 (highest reaction count)
The most-upvoted item in the set. Users want a **remote agent with local tool execution** (skills/memory/model live remote; file/terminal ops run locally). This is a split-architecture request driven by privacy and compute topology.

**4. [#135039 — Memory budget enforcement + acceptance pipeline for MEMORY.md / USER.md](https://github.com/NousResearch/hermes-agent/issues/135039)** · 15 comments
Requests write-time budget/acceptance controls for memory files, since they are injected into **every** turn (latency + cost). Underlying need: memory hygiene is currently ungoverned.

**5. [#83047 — `blocker_auth` respawn guard parks a ready task forever](https://github.com/NousResearch/hermes-agent/issues/83047)** · 9 comments · P2
Kanban dispatch can permanently strand a task — the auth-shaped respawn branch is not a finite cooldown, so ready work never drains. A correctness/liveness bug.

---

## 5. Bugs & Stability

Ranked by severity. **Several have fix PRs already open.**

**🔴 Critical — data loss / update-path breakage**

- **[#141346](https://github.com/NousResearch/hermes-agent/issues/141346)** · P3 · *Security/data loss* — Smart approval auto-ran `osascript` → unsaved user document destroyed. **No fix PR.** Root-cause trust issue in the smart-approval classifier.
- **[#143331](https://github.com/NousResearch/hermes-agent/issues/143331)** · P2 · *Windows* — `hermes update` fails **every run**: a stale `gateway.pid` beside a held lock aborts the gateway pause stage (+ stable-channel downgrade refusal exits 1). Update is effectively unusable for affected users.
- **[#143401](https://github.com/NousResearch/hermes-agent/issues/143401)** · P2 · *Windows* — Gateway **dies right after an in-chat update**; unguarded `unlink` of `.update_output.txt` (WinError 32) aborts startup.
- **[#143402](https://github.com/NousResearch/hermes-agent/issues/143402)** · P2 — Compaction write-back fails with `int(None)` on NULL message ids; **compression results are silently discarded** (session stays full, retriggers every turn). **✅ Fix PR open: [#143407](https://github.com/NousResearch/hermes-agent/pull/143407).**

**🟠 High — session/turn destruction & correctness**

- **[#136713](https://github.com/NousResearch/hermes-agent/issues/136713)** · P2 — Dashboard chat re-attach (PTY/WS churn) **hard-interrupts the in-flight turn**; sessions close with `end_reason=tui_shutdown`. Work is destroyed.
- **[#139796](https://github.com/NousResearch/hermes-agent/issues/139796)** · P2 — `session.resume` returns `not_found` for any session not in the backend's in-memory registry (cold sessions or orphan-reaper-evicted live ones).
- **[#142271](https://github.com/NousResearch/hermes-agent/issues/142271)** · P2 · *Windows* — Kanban managed workers **deterministically deadlock** importing numpy in a memory-provider plugin (loader-lock race).
- **[#116788](https://github.com/NousResearch/hermes-agent/issues/116788)** · P2 — Background memory reviewer can persist facts the user **explicitly asked not to save** (privacy boundary violation).

**🟡 Medium — regressions & compatibility**

- **[#143361](https://github.com/NousResearch/hermes-agent/issues/143361)** · P2 — `hermes update` leaves release tags stale → `hermes --version` reports outdated version.
- **[#139091](https://github.com/NousResearch/hermes-agent/issues/139091)** · P2 — Stable update's 10s merge-base probe times out even with local commits.
- **[#143158](https://github.com/NousResearch/hermes-agent/issues/143158)** · P2 — Catalog plugin hooks stay inactive after gateway restart (only explicit reload registers them). **Fix candidate: [#143404](https://github.com/NousResearch/hermes-agent/pull/143404)** (messaging/deps angle).
- **[#143409](https://github.com/NousResearch/hermes-agent/issues/143409)** · P2 — Discord button clicks in DMs reject pairing-approved users when a role allowlist is set.
- **[#143364](https://github.com/NousResearch/hermes-agent/issues/143364)** · P3 · *Security* — Multiplexed secondary profile's progress/notices **leak into the primary bot**.

**Windows is over-represented** in today's bug cluster (#143331, #143401, #142271, #143326) — the desktop/update path on Windows is the weakest link this cycle.

---

## 6. Feature Requests & Roadmap Signals

| Issue | Feature | Likelihood for v0.23.0 |
|---|---|---|
| [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) (👍42) | Remote agent + local tool execution | **High signal**, likely multi-release |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Cross-gateway Bot collaboration | Strategic; `needs-decision` |
| [#135039](https://github.com/NousResearch/hermes-agent/issues/135039) | Memory write-time budget/acceptance pipeline | Plausible |
| [#116564](https://github.com/NousResearch/hermes-agent/issues/116564) | MEMORY.md as anchor for a memory doc chain | Plausible |
| [#115639](https://github.com/NousResearch/hermes-agent/issues/115639) | Autonomous self-healing updates for 24/7 fleets | Roadmap-level RFC |
| [#138458](https://github.com/NousResearch/hermes-agent/issues/138458) | Make assignee profile authoritative at kanban spawn | Likely near-term (kanban is active) |

**In-flight feature PRs:** [#143412](https://github.com/NousResearch/hermes-agent/pull/143412) Bria FIBO 2.0 in `image_generate`; [#143411](https://github.com/NousResearch/hermes-agent/pull/143411) HeyGen Video in `video_generate`; [#139055](https://github.com/NousResearch/hermes-agent/pull/139055) desktop Office/OpenDocument preview; [#127268](https://github.com/NousResearch/hermes-agent/pull/127268) opt-in sequential delegation.

**Prediction:** v0.23.0 likely lands **kanban hardening**, **delegation controls**, and **media-gen catalog expansion**, with memory-governance features slipping to a later minor. The cross-gateway collaboration and remote/local split are being *designed* (high comment counts) rather than *built* — v0.24 territory.

---

## 7. User Feedback Summary

**Pain points**
- **Update mechanism is a top frustration** — multiple Windows users report `hermes update` failing *every run*; a local-checkout user gets misleading version output. The very cadence the team celebrates is generating update friction (see RFC #115639).
- **Trust in approval heuristics is shaken** by #141346 — the smart mode approved something destructive. Expect demand for a safer default class.
- **Session fragility** — turns being killed on client re-attach (#136713), cold sessions unresumable (#139796), and silent compaction loss (#143402) erode confidence in state persistence.
- **Memory governance** — both #135039 (budget) and #116788 (reviewer saved what the user forbade) reflect unhappiness with *uncontrolled* memory writes.

**Satisfaction / positive signals**
- High reaction counts on architecture-level requests (#18715 with 👍42) show an engaged, forward-looking user base that wants Hermes to scale beyond single-machine use.
- Responsive triage: **many of today's bugs already have fix PRs** (#143402→#143407, #143158→#143404), indicating a healthy maintainer-to-issue feedback loop on the stability side.

**Net:** Users are **invested and ambitious** but increasingly **frustrated by release/update quality and state integrity** — a classic scale-up tension.

---

## 8. Backlog Watch

Long-lived items needing maintainer attention:

- **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)** (open since **2026-05-02**, 29 comments, 👍42) — Remote agent + local tool execution. Nearly 6 months old, top-reacted, still `needs-decision`.
- **[#83047](https://github.com/NousResearch/hermes-agent/issues/83047)** (open since **2026-08-10**, P2) — Kanban `blocker_auth` respawn guard parks a ready task forever. A liveness bug with no fix PR.
- **[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)** aside, also watch **[#143346](https://github.com/NousResearch/hermes-agent/issues/141346)** (the osascript data-loss security issue) — high engagement, no associated fix PR, and a direct risk to the approval model.
- **[#25952](https://github.com/NousResearch/hermes-agent/pull/25952)** (PR open since **2026-05-14**) — cron cadence failure logging fix; a small, low-risk PR sitting ~5 months.
- **[#56023](https://github.com/NousResearch/hermes-agent/pull/56023)** (PR open since **2026-07-01**, `sweeper:risk-*` x4) — local iMessage mode; carries multiple risk flags, possibly blocked on review bandwidth.

---

*Digest compiled from 2026-10-23 GitHub data (50 issues updated, 50 PRs updated, 1 release). Metrics are point-in-time and reflect a high-activity, pre-v0.23.0 stabilization window.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-10-23

## 1. Today's Overview

IronClaw shows **moderate, maintenance-oriented activity** today: 8 total items updated in the last 24 hours (2 issues, 6 PRs), with **no new releases**. The day's activity is dominated by Dependabot dependency bumps (5 of 6 PRs), indicating a quiet feature-development window focused on housekeeping rather than new capability work. The closure of the long-standing ARM64 Docker support issue (#3168, open since May 2026) is the most substantive signal of the day, though notably it closed without a linked merge. Overall project health appears **stable but low-velocity on core features** — automated maintenance is healthy, while human-driven contribution appears paused.

## 2. Releases

**No new releases in this window.** Last release information is unavailable from the provided data. No breaking changes or migration notes to report.

## 3. Project Progress

**Merged/Closed today:**
- **PR #8149** [CLOSED] — `dompurify` bump 3.4.12 → 3.4.16 in `crates/product/ironclaw_webui/frontend`. This was superseded same-day by PR #8155 (bumping further to 3.4.17), suggesting the bot auto-closed the older PR in favor of a fresh one. ([link](https://github.com/nearai/ironclaw/pull/8149))
- **Issue #3168** [CLOSED] — ARM64/aarch64 Docker build support. Notably, no ARM64 Docker PR appears in today's data, so closure without a visible associated merge is worth maintainer verification. ([link](https://github.com/nearai/ironclaw/issues/3168))

**Net assessment:** No net feature advancement today; progress was limited to dependency hygiene and one issue closure.

## 4. Community Hot Topics

Engagement across all tracked items is **low** — every issue and PR shows 0 👍 and effectively 0 comments (Dependabot PRs report `undefined` comments).

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** — *Daily ironclaw failure taxonomy — 2026-10-22* (OPEN, 0 comments). The most analytically significant item: an automated/curated failure audit reporting **64 non-pass tasks in the `officeqa` suite**, attributed "overwhelmingly" to genuine model-quality errors by **DeepSeek-V4-Flash**. This points to an underlying need for **benchmark-driven model evaluation** and possibly a model-quality remediation loop.
- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — ARM64 support (CLOSED). Long-lived request reflecting a real user need for **cross-platform deployment parity**.

**Underlying need:** The community is surfacing platform portability and model-reliability concerns, but there is little interactive discussion — suggesting either a small active contributor base or issues being filed by automation.

## 5. Bugs & Stability

No crashes, regressions, or new bug reports were filed today. However, one **model-quality stability signal** deserves attention:

- **Severity: Medium** — [Issue #8153](https://github.com/nearai/ironclaw/issues/8153): 64 recurring non-pass tasks on `officeqa` with DeepSeek-V4-Flash. While framed as "genuine model-quality errors" rather than IronClaw infrastructure bugs, recurring daily failure taxonomies indicate a **persistent evaluation weakness**. No fix PR currently exists.

**Dependency security note (positive):** The `dompurify` bump chain (3.4.12 → 3.4.17, PRs [#8149](https://github.com/nearai/ironclaw/pull/8149) closed / [#8155](https://github.com/nearai/ironclaw/pull/8155) open) is a fast-moving secure-sanitization library; staying current is a minor XSS-risk mitigation.

## 6. Feature Requests & Roadmap Signals

- **ARM64/aarch64 Docker images** ([#3168](https://github.com/nearai/ironclaw/issues/3168)): The issue notes Cranelift already supports aarch64 and only armv7 (32-bit, tracked in #1339) is a confirmed limitation. Its closure strongly hints **ARM64 multi-arch Docker publication is landing or imminent**. Predicted for next release.
- **armv7 (32-bit ARM)** remains explicitly out of scope (referenced #1339) — unlikely to appear on the near-term roadmap.
- No other feature requests surfaced today; the roadmap signal is thin.

## 7. User Feedback Summary

Real user-visible feedback today is sparse:

- **Pain point (platform):** Users cannot run official images on ARM64 machines ([#3168](https://github.com/nearai/ironclaw/issues/3168)) — a deployment friction point now apparently resolved.
- **Pain point (model quality):** `officeqa` benchmark failures ([#8153](https://github.com/nearai/ironclaw/issues/8153)) suggest dissatisfaction with DeepSeek-V4-Flash reliability on office/document tasks.
- **Satisfaction indicators:** None stated explicitly. The absence of complaints, combined with steady Dependabot activity, implies **no acute user-facing regressions** this window.

## 8. Backlog Watch

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** — OPEN, 0 comments, 0 👍, created 2026-10-22. This daily failure taxonomy is **unanswered**; if these accumulate daily without triage, model-quality debt will grow silently. **Needs maintainer attention:** assign an owner or establish a triage policy.
- **[PR #8155](https://github.com/nearai/ironclaw/pull/8155)** and **[PR #8158](https://github.com/nearai/ironclaw/pull/8158)** — Dependabot PRs open and unreviewed as of today; routine but should not stall (especially the `dompurify` security-adjacent bump).
- **Issue #1339** (referenced, not detailed) — armv7 32-bit support limitation; flag for tracking if 32-bit ARM demand materializes.

---

**Health summary:** IronClaw is in a **low-velocity, maintenance-mode phase** on 2026-10-23 — healthy automation, no releases, and no critical bugs, but also little human-driven momentum. The two items warranting follow-up are the **unanswered model-quality taxonomy (#8153)** and confirmation that the **ARM64 closure (#3168) shipped an actual fix**.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-10-23

## 1. Today's Overview

QwenPaw is in an active security-and-stability response cycle: a hotfix release (**v2.2.2.post1**) was published to remediate an emSign CA trust issue, paired with a public security advisory urging all users to upgrade. Activity is very high — **22 issues updated (20 open)** and **50 PRs updated (48 open, only 2 merged/closed)** in the last 24h — but the merge ratio is extremely low, suggesting maintainer bandwidth is concentrated on review and release engineering rather than throughput. The issue tracker is dominated by channel-layer bugs (Feishu, DingTalk, Telegram, QQ), each reportedly reproducing on `main`, indicating regressions accumulated between 2.2.2 and the 2.3.0 development line. Notably, an unusually rich set of community-contributed fix PRs (media replay, approval routing, plugin loader, Ollama context) is queued and awaiting review, which is a positive signal for contributor health.

## 2. Releases

### v2.2.2.post1 (post-release hotfix)
- **#8369** — `chore: bump the version to v2.2.2post1` ([PR #8369](https://github.com/agentscope-ai/QwenPaw/pull/8369))
- **#8370** — `fix(security): remediate emSign CA trust across dependencies, installers, and builds` ([PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370))
- Release notes were truncated in the dataset; the visible changelog is security-focused only.

**Security advisory:** [Issue #8385](https://github.com/agentscope-ai/QwenPaw/issues/8385) explicitly recommends upgrading to **2.2.2.post1 or later** across Desktop installers, PyPI packages, and container images. No breaking changes or migration steps are documented in the available data — this is a drop-in patch.

**Release verification:** [Issue #8386](https://github.com/agentscope-ai/QwenPaw/issues/8386) (Release Duty installation verification, CLOSED) tracked the four-checkpoint pass criteria; it closed the same day, implying verification completed.

**Merge-back in flight:** [PR #8391](https://github.com/agentscope-ai/QwenPaw/pull/8391) (`chore: merge Release/v2.2.2post1 into main`) is open, so the hotfix is not yet on `main`.

## 3. Project Progress

Only **2 PRs were merged/closed** in the last 24h, both tied to the release train:
- [PR #8369](https://github.com/agentscope-ai/QwenPaw/pull/8369) — version bump
- [PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370) — emSign CA trust remediation (security)

**No feature PRs landed today.** However, substantial work is staged and actively updated:
- [PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) (`size/XXXL`) — extracting official channels into plugins with subprocess isolation. This is the architectural spine of the announced 2.3.0 modularity push.
- [PR #8376](https://github.com/agentscope-ai/QwenPaw/pull/8376) (`size/XXXL`, first-time contributor) — PowerContext v1.4.0 memory backend with structured context and Artifact APIs.
- [PR #8375](https://github.com/agentscope-ai/QwenPaw/pull/8375) — stale-request guard after chat deletion (direct fix for #8368).
- [PR #8366](https://github.com/agentscope-ai/QwenPaw/pull/8366) — replaces GPL-3.0 `html2text` with a stdlib converter, resolving an Apache-2.0 license-compatibility problem. This is a meaningful compliance win.

## 4. Community Hot Topics

| Item | Comments | Signal |
|---|---|---|
| [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) — Plugin-facing theme extension point | 7 | Plugin authors want deeper theming than the single `colorPrimary` knob |
| [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) — "Making QwenPaw Lighter and More Extensible" (v2.3.0 preview) | 3, 👍1 | Maintainer-led roadmap thread; community solicited for input |
| [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) — Composer draft keyed per-agent, not per-conversation | 3 | Cross-conversation text leakage; privacy-adjacent UX bug |
| [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) — Global Skill/MCP management in Hub | 2, 👍1 | Team/enterprise multi-user provisioning need |

**Underlying needs analysis:** The two plugin-related threads (#8071, #8289) both point at the same pressure — the plugin surface is the primary extension mechanism but is under-specified (one theme knob, no semantic token layer). The Hub threads (#8275, #8372) reveal a distinct **team-deployment persona** emerging: admins want centralized Skill/MCP distribution and gateway timeout control, which the current per-user model does not serve. Together these suggest the community is outgrowing the single-user desktop assumption the architecture was built on.

## 5. Bugs & Stability

Ranked by severity (impact × reproducibility):

**Critical — service-wide or data-loss class:**
1. **#8350** — Feishu channel performs synchronous network calls on the main event loop; when the network is unreachable the entire service wedges (`/api/healthz` times out, SIGTERM cannot exit). [Issue #8350](https://github.com/agentscope-ai/QwenPaw/issues/8350) — **No fix PR identified. This is the most severe item today.**
2. **#8335** — Media in chat history re-uploaded on every request; a WeChat session hit a **48.9 MB** request body, endpoint rejected it, and the session became **permanently wedged** (every subsequent turn fails on the same block). [Issue #8335](https://github.com/agentscope-ai/QwenPaw/issues/8335) — **Fix PR exists: [#8337](https://github.com/agentscope-ai/QwenPaw/pull/8337)** ("stop replaying media the model no longer needs"). Related: [#8299](https://github.com/agentscope-ai/QwenPaw/pull/8299) adds video-rejection retry.
3. **#8388** — After upgrade, QQ channel is completely broken; all tool calls fail with `No module named '_qwenpaw_remote_backend'`. [Issue #8388](https://github.com/agentscope-ai/QwenPaw/issues/8388) — **No fix PR; possible packaging regression in 2.2.2.**

**High — silent message loss:**
4. **#8343** — DingTalk final replies are **silently dropped** when `sessionWebhook` expires; no Open API fallback (errcode=300001). [Issue #8343](https://github.com/agentscope-ai/QwenPaw/issues/8343) — No fix PR.
5. **#8342** — Quoted replies lose channel control-command routing across **seven channels** (`/stop` quoted becomes normal traffic). [Issue #8342](https://github.com/agentscope-ai/QwenPaw/issues/8342) — No fix PR.
6. **#8329** — Telegram channel ignores `reply_to_message`; quoted context never reaches the agent, unlike other channels. [Issue #8329](https://github.com/agentscope-ai/QwenPaw/issues/8329) — No fix PR.

**Medium — configuration and regression:**
7. **#8378** — Post-upgrade model invocation failure; legacy `agent.json` `active_model` schema mismatch. [Issue #8378](https://github.com/agentscope-ai/QwenPaw/issues/8378)
8. **#8374** — `QWENPAW_CORS_ORIGINS` set via Web UI/CLI has no effect — constant is bound at module import, before env injection. [Issue #8374](https://github.com/agentscope-ai/QwenPaw/issues/8374)
9. **#8351** — Composer draft keyed per-agent; unsent text leaks across conversations. [Issue #8351](https://github.com/agentscope-ai/QwenPaw/issues/8351)
10. **#8359** — Hub-in-container Docker runtime startup fails: readiness probe hardcoded to `127.0.0.1` (Errno 111). [Issue #8359](https://github.com/agentscope-ai/QwenPaw/issues/8359)
11. **#8368** — Deleting the currently selected conversation returns 404. [Issue #8368](https://github.com/agentscope-ai/QwenPaw/issues/8368) — **Fix PR: [#8375](https://github.com/agentscope-ai/QwenPaw/pull/8375)**

**Low / developer experience:**
12. **#8377** — Bare `pytest` aborts during collection on a clean checkout (`import file mismatch: test_backup`). Blocks the CONTRIBUTING.md local gate. [Issue #8377](https://github.com/agentscope-ai/QwenPaw/issues/8377) — described as a one-file fix; no PR yet.
13. **#8333** — Sidebar source-group header overlaps first conversation. [Issue #8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)

**Pattern:** 4 of 13 bugs are channel-adapter-specific, and 3 of those involve **reply/quote semantics** — a systemic gap in how channels normalize inbound messages rather than isolated defects.

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in next release |
|---|---|---|
| Lighter, modular plugin architecture | [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) | **Confirmed for v2.3.0** by maintainer; [PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) is the implementation |
| Plugin-facing semantic theme token override layer | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) | **High** — directly complements the 2.3.0 plugin refactor |
| Global Skill + MCP shared management in Hub | [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) | **Medium** — needs product decision on team model; no PR yet |
| Hub AI gateway timeout configurability | [#8372](https://github.com/agentscope-ai/QwenPaw/issues/8372) | **Medium-High** — small surface, clear user need (120s default too short for file processing) |
| Desktop setting to disable auto-scroll during streaming | [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) | **Low-Medium** — open since 2026-08-27 without movement |

**Prediction:** v2.3.0 will ship the plugin/channel extraction (#8187, #8289) as its headline. The theme extension point (#8071) is the most likely rider, since it is cheap once the plugin descriptor format is settled. Hub globalization (#8275) is the strongest candidate for 2.4.0.

## 7. User Feedback Summary

**Pain points, by theme:**

- **Upgrade anxiety is real and recurring.** Multiple reports tie breakage directly to upgrading: QQ channel dead after 2.2.2 (#8388, missing `_qwenpaw_remote_backend`), model invocation failing from legacy `agent.json` (#8378). Combined with the forced security upgrade advisory (#8385), users are being asked to upgrade into a version with its own regressions. This is the sharpest satisfaction risk in the dataset.
- **Silent failures erode trust.** DingTalk drops final replies with no error (#8343); Telegram silently discards quoted context (#8329); approvals raised from a chat never reach that chat and resolve to `TIMEOUT` after five minutes ([PR #8303](https://github.com/agentscope-ai/QwenPaw/pull/8303) describes the WeChat case). Users cannot distinguish "agent chose not to respond" from "system failed."
- **Resource exhaustion blocks work.** The 48.9 MB WeChat body (#8335) and the Feishu network-stall-holds-the-whole-service (#8350) both render the product completely unusable, not merely degraded.
- **Team/Hub users feel like second-class citizens.** Hub timeout too short (#8372), Hub-in-Docker deployment broken (#8359), no shared Skill/MCP (#8275).
- **Positive signals:** Contributors are investing real effort — first-time contributors submitted substantial PRs (#8376 XXXL PowerContext, #8345 plugin loader robustness, #8328 offline Docker image), and maintainers publish transparent roadmap threads (#8289) with preliminary test results.

**Notable AI-authored issue:** [#8078](https://github.com/agentscope-ai/QwenPaw/issues/8078) carries an explicit AI-disclosure notice stating the built-in assistant helped investigate and write the report, with reproducible local evidence. This is an emerging community norm worth watching.

## 8. Backlog Watch

Items needing maintainer attention due to age, severity, or lack of response:

1. **[#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339)** — Desktop auto-scroll toggle. **Open since 2026-08-27 (~57 days)**, only 2 comments, no movement. This is a simple UX toggle that long-lived streaming users clearly want; it is the oldest untouched request in the dataset.
2. **[#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)** — Plugin theme extension point. Open since 2026-10-01, 7 comments (the highest-engagement issue today) and actively discussed, but **no maintainer commitment or PR**. It risks stalling the 2.3.0 plugin story if not scoped soon.
3. **[#8078](https://github.com/agentscope-ai/QwenPaw/issues/8078)** — Cross-session `chat_with_agent` messages registered as independent chats, splitting one session across multiple UI pages. Open since 2026-10-02, well-evidenced, no fix PR. This is a correctness issue in session modeling, not cosmetics.
4. **[#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275)** — Global Skill/MCP management. Open since 2026-10-16 with a 👍 but no maintainer reply; it is the anchor request for the entire team-deployment persona.
5. **[PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)** (`size/XXXL`) — The channel extraction PR has been open since **2026-10-12 (11 days)** and is the critical path for 2.3.0. An XXXL PR aging without merge increases rebase risk and contributor discouragement.
6. **[PR #8243](https://github.com/agentscope-ai/QwenPaw/pull/8243)** / **[PR #8244](https://github.com/agentscope-ai/QwenPaw/pull/8244)** — Both marked `Under Review` since 2026-10-14 (Windows log rotation; channel SDK lazy-loading with a measured 15.1s startup win). The startup performance fix in particular has quantified benefit and is still waiting.

**Health assessment:** The project is responsive on security (same-week hotfix) but slow on feature PR throughput — 48 open PRs against 2 merged is a review-bandwidth bottleneck. The channel-layer bug cluster and the upgrade-regression reports are the two areas most likely to damage user trust if the 2.3.0 release ships without addressing them.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-10-23

## 1. Today's Overview

ZeroClaw shows **high-velocity development activity** with 34 issues and 50 PRs updated in the last 24 hours. The project is in an intense pre-release push toward **v0.9.0**, with the vast majority of new work carrying that milestone tag. The activity is heavily skewed toward **security hardening and identity/access control** — principal-scoped delegation, OIDC dashboard sign-in, session ownership, and tool allowlist containment dominate both the issue tracker and PR queue. Notably, several long-running XL security PRs (stacked on each other) continue to be refreshed daily without merging, suggesting a complex integration bottleneck. No releases shipped today; the team appears to be stabilizing v0.8.7 fixes (plugins, OIDC, CI) while staging v0.9.0 features.

**Health assessment:** Active and healthy on contribution volume, but the concentration of high-risk, interdependent security PRs (many `risk:high`, `size:XL`, blocked on prerequisites) represents a merge-throughput risk.

---

## 2. Releases

**None.** No new releases in the last 24 hours.

---

## 3. Project Progress

### Merged / Closed PRs Today (8 total)
No merged PRs appear in the top-20-by-comment sample (all visible PRs are `OPEN`). The 8 merged/closed PRs are lower-engagement items not surfaced in the data.

### Closed Issues Today (11 total) — Notable closures
- **[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)** — RFC: Append-only session event history, deterministic state replay, and derived agent streams *(13 comments, closed after ~7 weeks)*. This is a significant architectural milestone: an accepted RFC governing event-sourced session state that underpins much of the runtime roadmap.
- **[#11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357)** — `plugin remove` deleted the wrong directory (`plugins_dir/<name>` instead of the load path). Security-relevant plugin lifecycle fix landed.
- **[#11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)** — Plugin tool-name gate could let a plugin pre-empt `tool_search`, MCP, peripheral and skill tools. Closed — relevant to the #8279 allowlist concern.
- **[#11902](https://github.com/zeroclaw-labs/zeroclaw/issues/11902)** — Valid OIDC token refused as `Misconfigured` during concurrent JWKS fetch (race condition).
- **[#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558)** — Cranelift CI 20-minute job timeout.
- **[#11806](https://github.com/zeroclaw-labs/zeroclaw/issues/11806)**, **[#11821](https://github.com/zeroclaw-labs/zeroclaw/issues/11821)**, **[#11828](https://github.com/zeroclaw-labs/zeroclaw/issues/11828)**, **[#11926](https://github.com/zeroclaw-labs/zeroclaw/issues/11926)**, **[#11928](https://github.com/zeroclaw-labs/zeroclaw/issues/11928)** — CI/test/observability cleanups tagged `release:v0.8.7`.

**Takeaway:** Today's closures are predominantly **v0.8.7 stabilization** and **security/CI hygiene**, while v0.9.0 features remain in-flight.

---

## 4. Community Hot Topics

| Item | Type | Comments | Theme |
|---|---|---|---|
| [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | Tracker (p2, high risk) | 15 | Runtime / dashboard sign-in / gateway delivery roadmap |
| [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | RFC (p2, high risk) | 13 | Event-sourced session history & deterministic replay |
| [#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) | Task *blocked* (medium) | 9 | Discord plugin install/verify from release binary |
| [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | Bug (p1, high risk) | 5 | `delegate` bypasses parent tool allowlist |

**Underlying needs analysis:**
- **#7432** is the master coordination issue for the v0.9.0 runtime/gateway release — its 15-comment thread signals ongoing sequencing debate and a large dependency graph. Stakeholders want clarity on what ships in v0.9.0.
- **#10526's closure** after sustained RFC discussion reflects a maturing project that is willing to re-architect persistence around append-only events — a sign of long-term design investment, though the "derived agent streams" work will spawn follow-up trackers.
- **#10999** being `status:blocked` despite verified Discord delivery on v0.8.6 signals **packaging/release-engineering friction** (proving a plugin works from a *release archive*, not source).
- **#8279** is the security flagship: the delegate allowlist bypass is S0-class and p1, and it directly connects to the stacked PRs (#11225, #11409, #11230) that have been refreshing for weeks.

**Most-commented PRs** are the security stack by IftekharUddin and Aarlington (#11225 p0, #11409, #11220, #11230, #11234) and the Goal Mode foundation #11878 — these drive the visible roadmap.

---

## 5. Bugs & Stability

Ranked by severity (all reported/updated 2026-10-22–23):

| Sev | Issue | Description | Fix PR? |
|---|---|---|---|
| **S1** | [#11957](https://github.com/zeroclaw-labs/zeroclaw/issues/11957) | OIDC enrollment sends raw client credentials in Basic header; reserved chars break `client_credentials` & device-grant enrollment | ✅ **#11968** open (form-encode credentials) |
| **S0/S1** | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | `delegate` lets sub-agent invoke tools the parent's policy excludes | ✅ Covered by stacked PRs #11225 / #11409 |
| **S2** | [#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) | Gateway WebSocket upgrades fail over built-in TLS listener (101 then close) | ❌ None yet |
| **S2** | [#11962](https://github.com/zeroclaw-labs/zeroclaw/issues/11962) | Daemon's 64 live RPC sessions never released when idle → remote clients can exhaust them | ✅ **#11964** open ("retire orphaned remote sessions") |
| **S2** | [#11970](https://github.com/zeroclaw-labs/zeroclaw/issues/11970) | `agents delete/rename` skip owned-state cascade + live-ACP check in gateway-less builds | ❌ |
| **S2** | [#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989) | Per-channel `excluded_tools` never applied | ✅ **#11990** open |
| **S2** | [#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) | Outbound email HTML carries raw markup / arbitrary image URLs (XSS-class) | ❌ (feature #11992 adjacent) |
| **S2** | [#11823](https://github.com/zeroclaw-labs/zeroclaw/issues/11823) | Shell scanner skips command substitution in unquoted-delimiter heredocs (sandbox escape) | ❌ |
| **S3** | [#11972](https://github.com/zeroclaw-labs/zeroclaw/issues/11972) | `gateway get-paircode` exits 0 on failure | ❌ |
| **S3** | [#11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969) | `metrics` / `embedded-web` features compile whole gateway into headless builds | ✅ **#11269** open |
| **S3** | [#11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987) | Inline `// nosemgrep` comments don't suppress code-scanning alerts | ❌ |

**Stability read:** Two **sandbox/security-escape-class** bugs remain open (#11823, #11991) with no fix PR — these warrant priority. The #11957 enrollment bug is S1 (workflow blocked) but a fix is already in review. TLS WebSocket breakage (#11951) is a regression-shaped issue affecting dashboard usability.

---

## 6. Feature Requests & Roadmap Signals

**New feature requests today (all likely v0.9.0 candidates unless noted):**
- **[#11961](https://github.com/zeroclaw-labs/zeroclaw/issues/11961)** — Dashboard sign-in with OIDC (opt-in). **PR #11965 already open** → strongly signaled for v0.9.0.
- **[#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984)** — Dashboard chat for non-admin signed-in accounts. Piece of the #7432 tracker.
- **[#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971)** — CLI-only source build (no gateway/dashboard). Paired with **[PR #11975](https://github.com/zeroclaw-labs/zeroclaw/pull/11975)**.
- **[#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992)** / **[#11799](https://github.com/zeroclaw-labs/zeroclaw/issues/11799)** — Email operator templates + sanitized HTML body; shell policy refusal messages with reason + operator hint (**PR #11983** open).
- **[#11995](https://github.com/zeroclaw-labs/zeroclaw/issues/11995)** — Restore owned background delegation with principal-scoped results (follow-up to #11409).
- **[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)** — XMPP/Prosody channel with optional OMEMO (feature PR, XL).

**Roadmap prediction:** v0.9.0 will center on (1) **OIDC/identity & principal-scoped access**, (2) **dashboard sign-in + scoped chat**, (3) **CLI-only/minimal builds**, and (4) **email channel polish**. The **Goal Mode durable task lifecycle** (#11878, "proposal 1/12") signals a much larger multi-release initiative beginning its foundation phase.

---

## 7. User Feedback Summary

**Pain points expressed in issues:**
- **Security containment anxiety** — Users (and the maintainer team itself) are finding multiple ways scoped principals escape their bounds: delegate allowlist bypass (#8279), SOP execution without admin authority (#11220), session-data tools exposed to non-admins (#11230), plugin tool pre-emption (#11327). The recurring theme is that **identity scope exists but is not enforced end-to-end**.
- **Plugin lifecycle friction** — #10999 stuck in `blocked` shows operators struggle to *prove* a plugin installs from a release artifact; #11357 (wrong-directory delete) compounds trust issues.
- **Operator UX gaps** — #11799 ("shell policy refusals should say why"), #11821 (log records don't name the denied sender), and #11972 (exit 0 on failure) show a pattern: **errors exist but aren't actionable** for operators.
- **Minimal-deployment demand** — #11971/#11969 reflect users wanting headless, gateway-free builds without feature bleed.
- **Email channel quality** — A cluster of email issues (#11989, #11991, #11992, #11939) from one contributor indicates active real-world email use and dissatisfaction with sanitization, quoting, and tool-filtering.

**Satisfaction signals:** Discord plugin (#10999) confirmed working on the published v0.8.6 archive — positive validation of the plugin pipeline despite the "prove it from release" gate.

---

## 8. Backlog Watch

Items needing maintainer attention:

- **[#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)** — S0/p1 delegate allowlist bypass, open since **2026-06-24** (~4 months). Fix depends on a deep stacked PR chain still unmerged. Highest-risk outstanding security item.
- **[#11823](https://github.com/zeroclaw-labs/zeroclaw/issues/11823)** — Shell sandbox escape via heredoc command substitution, **no fix PR**, p-category unlabeled. Security gap.
- **[#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951)** — TLS WebSocket regression blocking dashboard chat, **no fix PR**.
- **[#11301](https://github.com/zeroclaw-labs/zeroclaw/pull/11301)** — XL fix for durable committed-rename recovery, open since **2026-10-01**, carries `needs-author-action`.
- **[#11068](https://github.com/zeroclaw-labs/zeroclaw/pull/11068)** — Channel turns narrowed by sender role, open since **2026-09-23**, `needs-author-action`, `risk:high`.
- **Stacked security PRs #11225 (p0), #11220, #11230, #11234** — All open ~3.5 weeks, refreshing daily, blocked on one another. This **stack is the single biggest merge-throughput bottleneck** for the v0.9.0 security story and needs maintainer sequencing decisions.
- **[#11737](https://github.com/zeroclaw-labs/zeroclaw/pull/11737)** — Restore principal-owned Chat sessions after restart, marked **draft, blocked on integration**, with merge conflicts against master.

---

*Sources: all items linked to github.com/zeroclaw-labs/zeroclaw. Data window: last 24h ending 2026-10-23.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*