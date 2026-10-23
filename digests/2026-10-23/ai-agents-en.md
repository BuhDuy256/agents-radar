# OpenClaw Ecosystem Digest 2026-10-23

> Issues: 98 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-23 02:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-10-23

## 1. Today's Overview

OpenClaw shows **very high engineering velocity** with 500 PRs and 98 issues updated in the last 24 hours, though the open-PR count (245) and open-issue count (67) indicate a growing review backlog. A new release (v2026.10.6) shipped a **mandatory Node runtime bump** driven by upstream TLS certificate compromise — an important security-forced migration. The day's activity is dominated by **stability regressions** (gateway blocking, event-loop stalls, session-state failures) and **security/authority handling issues** around secrets, exec approval, and realtime Talk. Overall the project is healthy and actively maintained, but release blockers (multiple P0/P1 with `impact:ux-release-blocker`) suggest the current stable line still carries unresolved reliability debt.

---

## 2. Releases

### v2026.10.6 — `openclaw 2026.10.6`

**Highlights (from release notes):**
- **Patched Node runtime is now required:**
  - Node **24.22.1+** on the 24 line, **or Node 26.12.1+** on the 26 line.
  - Reason: these builds reject TLS chains signed with the **compromised certificate keys addressed in the October 2026 Node.js security releases**.
  - Docker images ship with a patched Node.

**Migration / Breaking notes:**
- This is effectively a **forced upgrade** for anyone running older Node 24/26 builds — unpatched Node versions may fail TLS handshakes against updated chains.
- Users on the 24 line must be on `>=24.22.1`; users on 26 must be on `>=26.12.1`.
- Related follow-on pain is already visible in the tracker: [#180903](https://github.com/openclaw/openclaw/issues/180903) reports a Node-gated update that left plugin peer-links at the old install root, and the degraded gateway's state ownership then blocked `openclaw update` repair.
- No schema-breaking config migration is announced in the snippet, but Doctor/state-schema work continues (see [#180690](https://github.com/openclaw/openclaw/issues/180690) on v28→v31 schema migration).

**Assessment:** This is a **security-forced release**, not a feature release. Operators should treat the Node bump as mandatory.

---

## 3. Project Progress

With **255 PRs merged/closed** in 24h, throughput is strong. Notable advanced/fixed work reflected in the data:

- **Closed issues (fix landed or resolved):**
  - [#181101](https://github.com/openclaw/openclaw/issues/181101) — Linux non-ASCII mount points decoded as wrong path (P3, `not-repro-on-main`, linked PR).
  - [#181125](https://github.com/openclaw/openclaw/issues/181125) — Doctor media migration lossily rewriting corrupt transcript archives (P2, data-loss, linked PR open).
  - [#181050](https://github.com/openclaw/openclaw/issues/181050) — npm updates failing `package-verify` on UGREEN UGOS due to execute bits (P0, release-blocker, closed).
  - [#180903](https://github.com/openclaw/openclaw/issues/180903) — Node-gated update leaving plugin peer-links stale (P1, closed).
  - [#177876](https://github.com/openclaw/openclaw/issues/177876) — `2026.10.5` Doctor runtime cleanup blocked by `sd-pam` (P1, `queueable-fix`, closed).
  - [#175794](https://github.com/openclaw/openclaw/issues/175794) — Realtime Talk WebSocket bypassing managed proxy (P1, security, closed).
  - [#179158](https://github.com/openclaw/openclaw/issues/179158) — Large streamed tool calls re-parsing whole argument buffer per delta (P2, closed).
  - [#159104](https://github.com/openclaw/openclaw/issues/159104) — Ambient webchat resolving into `kind: cron` session (P0, release-blocker, closed).
  - [#176994](https://github.com/openclaw/openclaw/issues/176994) — QA subagent handoff timeout without identifying missing transition (fixed).
  - [#144223](https://github.com/openclaw/openclaw/issues/144223) — 2026.9.3 cloud workers rejected with embedded-tool-authority mismatch (closed).
  - [#172817](https://github.com/openclaw/openclaw/issues/172817) — Control UI unlabeled empty "Locale" text box (P2, `queueable-fix`, closed).

- **Active PR themes:** session authority fixes ([#181203](https://github.com/openclaw/openclaw/pull/181203)), model-catalog performance ([#181190](https://github.com/openclaw/openclaw/pull/181190)), plugin native views in chat ([#173135](https://github.com/openclaw/openclaw/pull/173135)), config error handling on PostgreSQL ([#180687](https://github.com/openclaw/openclaw/pull/180687), [#181224](https://github.com/openclaw/openclaw/pull/181224)), and memory/Dreaming performance ([#180692](https://github.com/openclaw/openclaw/pull/180692)).

---

## 4. Community Hot Topics

| Rank | Item | Comments | Why it matters |
|------|------|----------|----------------|
| 1 | [#160959](https://github.com/openclaw/openclaw/issues/160959) — Gateway blocks for minutes capturing large external plugins (2026.9.6 regression) | 42 | **P0, diamond lobster.** The single most-discussed issue. Underlying need: plugin/package capture must not block the gateway event loop. Regression since #144252. |
| 2 | [#53763](https://github.com/openclaw/openclaw/issues/53763) — Built-in headless browser for reliable web access (CLOSED) | 18 | Users want first-class reliable web access without Chrome/third-party API fragility. |
| 3 | [#140010](https://github.com/openclaw/openclaw/issues/140010) — Windows sleep/resume WebSocket reconnect failures (30–60s+) | 14 | P1. Windows laptop sleep/wake UX is a recurring, high-friction theme. |
| 4 | [#167557](https://github.com/openclaw/openclaw/issues/167557) — Deferred plugin data/settings migration never converges (Linux/npm) | 10 | P1, `fix-shape-clear`. Migration convergence failure leaves plugins stuck. |
| 5 | [#166634](https://github.com/openclaw/openclaw/issues/166634) — Late reclamation commit checkpoint failure leaves agent unavailable | 9 | P0, message-loss + session-state; crash-recovery correctness. |

**Analysis of underlying needs:**
- A **cluster of sleep/wake and event-loop-stall issues** ([#160959](https://github.com/openclaw/openclaw/issues/160959), [#140010](https://github.com/openclaw/openclaw/issues/140010), [#158592](https://github.com/openclaw/openclaw/issues/158592), [#155359](https://github.com/openclaw/openclaw/issues/155359), [#111376](https://github.com/openclaw/openclaw/issues/111376)) points to a systemic architectural concern: **long-lived gateways on consumer hardware (Windows laptops, macOS) are fragile across sleep cycles and under heavy plugin/memory workloads.** This is the dominant community theme right now.
- A **second cluster** concerns **authority/permission correctness** ([#167876](https://github.com/openclaw/openclaw/issues/167876), [#133296](https://github.com/openclaw/openclaw/issues/133296), [#181215](https://github.com/openclaw/openclaw/issues/181215), [#181220](https://github.com/openclaw/openclaw/issues/181220)) — multiplayer sessions, shared auth profiles, and Side chat privacy.

---

## 5. Bugs & Stability

Ranked by severity (P0 → P2). "Fix PR" noted where attributable from data.

**P0 — Critical**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) — Gateway blocks minutes on large plugin capture (regression). **Needs maintainer review; no fix PR.** ⚠️ Top blocker.
- [#166634](https://github.com/openclaw/openclaw/issues/166634) — Checkpoint failure leaves agent permanently unavailable after crash; message loss + session-state. No fix PR; `intake:needs-repro`.
- [#158592](https://github.com/openclaw/openclaw/issues/158592) — After macOS sleep/wake, prepared model runtime publication times out; every inbound message fails until restart. `ux-release-blocker`.
- [#181050](https://github.com/openclaw/openclaw/issues/181050) — npm updates fail `package-verify` on UGREEN UGOS (execute-bit mismatch). **CLOSED** — resolved.
- [#159104](https://github.com/openclaw/openclaw/issues/159104) — Ambient webchat resolves to `kind: cron` session; turn fails. **CLOSED** — resolved.
- [#181032](https://github.com/openclaw/openclaw/issues/181032) — Install fails: `bun` requires AVX, absent on server-class CPUs. **P0 crash**, no fix PR. Notably this affects server hardware broadly.

**P1 — High**
- [#167557](https://github.com/openclaw/openclaw/issues/167557) — Deferred plugin migration never converges. `fix-shape-clear` (a fix is definable) but no PR yet.
- [#140010](https://github.com/openclaw/openclaw/issues/140010) — Windows sleep/resume reconnect failures (stale, needs maintainer review).
- [#158592](https://github.com/openclaw/openclaw/issues/158592) — (listed above).
- [#180690](https://github.com/openclaw/openclaw/issues/180690) — `doctor --fix` heap OOM at 6 GB on ~800-agent state; 110 min / 3 passes for v28→v31. No fix PR. Scaling concern.
- [#181078](https://github.com/openclaw/openclaw/issues/181078) — 2026.10.5 regression: 4/20 turns fail with "Canonical session reader continuation is no longer current" after HTTP 200. Session-state + message-loss.
- [#180898](https://github.com/openclaw/openclaw/issues/180898) — Gateway heap: full session-store deep copies retained per turn via AsyncLocalStorage; **60% of heap after 1 day, still present in 10.6**. Memory-leak-class.
- [#178907](https://github.com/openclaw/openclaw/issues/178907) — MiniMax M3.1 Flash (Ollama Pro) tool calls fail 100% ("malformed tool call"). auth-provider.
- [#178805](https://github.com/openclaw/openclaw/issues/178805) — Compaction fails on `ollama/minimax-m3.1-flash:cloud`; thinking consumes the entire 6553-token summary budget.
- [#177656](https://github.com/openclaw/openclaw/issues/177656) — Native host exec "shared-state integrity-admission" error on 2026.10.5; ≥28 failures. No child result.
- [#162654](https://github.com/openclaw/openclaw/issues/162654) — `SessionTranscriptWriterClaimReboundError` on slow storage (Raspberry Pi microSD).
- [#181226](https://github.com/openclaw/openclaw/issues/181226) — Codex source-reply finalization loses context after `message_tool_only`; **has `fix-shape-clear`**, message-loss.
- [#133296](https://github.com/openclaw/openclaw/issues/133296) — Secrets apply routes shared auth-profile refs to agent store (security). Needs security review.
- [#167876](https://github.com/openclaw/openclaw/issues/167876) — Talk consultations lose caller authority after session setup (security). Needs security review.

**P2 — Medium**
- [#111376](https://github.com/openclaw/openclaw/issues/111376) — memory-core Dreaming rewrites unchanged workspace state, stalls event loop.
- [#163900](https://github.com/openclaw/openclaw/issues/163900) — Dreaming budget compaction never removes "## Consolidated Memory" sections; promotion stalls when MEMORY.md full (`fix-shape-clear`, `queueable-fix`).
- [#172227](https://github.com/openclaw/openclaw/issues/172227) — Session migration reconciliation for historical archive receipts.
- [#180941](https://github.com/openclaw/openclaw/issues/180941) — Agents loop on `sessions_yield` after `nothing_pending` (multiple models).
- [#181165](https://github.com/openclaw/openclaw/issues/181165) — `tools.github.configure` swallows real failure cause (`queueable-fix`).
- [#181070](https://github.com/openclaw/openclaw/issues/181070) — Telegram captioned final TTS sends full reply text twice (`queueable-fix`, message-loss).
- [#181084](https://github.com/openclaw/openclaw/issues/181084) — 35k-event / 228 MB main session causes multi-second SQLite snapshot reads; `sessions compact` fails with "admission is closed".
- [#180892](https://github.com/openclaw/openclaw/issues/180892) — Windows Doctor rejects native capture for DELETE-self on volume-root ancestor (security-review).
- [#120411](https://github.com/openclaw/openclaw/issues/120411) — `config-audit.jsonl` logs plaintext secrets from argv (security).

**Fix PRs observed today (stability-relevant):**
- [#180850](https://github.com/openclaw/openclaw/pull/180850) — refuse malformed UTF-8 before claiming node state.
- [#181098](https://github.com/openclaw/openclaw/pull/181098) — bound stalled session archive & reconciliation work (P1).
- [#173994](https://github.com/openclaw/openclaw/pull/173994) — retry temporary DB capacity failures during agent startup.
- [#181198](https://github.com/openclaw/openclaw/pull/181198) — keep starting while inherited auth owner prepares (P1).
- [#181159](https://github.com/openclaw/openclaw/pull/181159) — honor verified Windows volume-root ACLs (CLOSED, security-boundary).

**Health read:** A large share of P0/P1 issues carry `clawsweeper:no-new-fix-pr` and `impact:ux-release-blocker`, meaning **known release-blockers lack a submitted fix** — a maintainer-attention signal (see §8).

---

## 6. Feature Requests & Roadmap Signals

User-requested features active in the last 24h:

- [#53763](https://github.com/openclaw/openclaw/issues/53763) — **Built-in headless browser** for reliable web access (CLOSED; 18 comments). High-demand, likely to influence roadmap.
- [#142966](https://github.com/openclaw/openclaw/issues/142966) — **Two-column model picker** (providers left, models right) for large multi-provider setups.
- [#137513](https://github.com/openclaw/openclaw/issues/137513) — Add **Fal H3 Max** video model support.
- [#177432](https://github.com/openclaw/openclaw/issues/177432) — Config option to **omit "Current model identity"** from the system prompt.
- [#181158](https://github.com/openclaw/openclaw/issues/181158) — `openclaw skills list --bundled` / `--no-bundled` filter.
- [#113895](https://github.com/openclaw/openclaw/issues/113895) — Opt-in **Nephesh dream provenance** metadata for Dream Diary.
- [#181215](https://github.com/openclaw/openclaw/issues/181215) & [#181220](https://github.com/openclaw/openclaw/issues/181220) — Make **Side chat private per user** / ephemeral fork with asker's permissions (security-driven product asks).

**Roadmap prediction (next 1–2 releases):**
- **Performance work already has open PRs** and is highly likely to land: model-catalog virtualization ([#181190](https://github.com/openclaw/openclaw/pull/181190)), gzip boot-transfer reduction ([#181233](https://github.com/openclaw/openclaw/pull/181233)), and chat-row idle optimization ([#181205](https://github.com/openclaw/openclaw/pull/181205)).
- **Plugin native views in chat** ([#173135](https://github.com/openclaw/openclaw/pull/173135), XL, ready for maintainer look) is a substantial planned capability that could headline a future release.
- Built-in headless browser is a strong candidate if the closed issue converts to a design that maintainers accept.
- The **Side chat privacy/permissions** requests are security-flavored and may be folded into an upcoming security-hardening release.

---

## 7. User Feedback Summary

**Pain points (real, repeated):**
- **Sleep/resume fragility on Windows and macOS laptops** — a recurring, high-emotion theme across [#140010](https://github.com/openclaw/openclaw/issues/140010), [#158592](https://github.com/openclaw/openclaw/issues/158592), [#155359](https://github.com/openclaw/openclaw/issues/155359). Users report gateways unreachable for 30–60s+ and agents permanently degraded until a restart.
- **Event-loop stalls & memory growth on long-lived gateways** — [#160959](https://github.com/openclaw/openclaw/issues/160959), [#180898](https://github.com/openclaw/openclaw/issues/180898), [#111376](https://github.com/openclaw/openclaw/issues/111376). Users explicitly report heap snapshots and 

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report
## Personal AI Assistant / Agent Open-Source Ecosystem — 2026-10-23

---

## 1. Ecosystem Overview

The personal AI assistant and agent open-source landscape on 2026-10-23 is characterized by **mature reference implementations operating under significant reliability debt**, alongside smaller projects iterating on modularity and security hardening. OpenClaw dominates by absolute scale (500 PRs/day) but is visibly strained by P0/P1 regressions around sleep/wake, session state, and event-loop stalls that lack submitted fixes. Hermes Agent and ZeroClaw sit in a productive mid-tier — high contributor velocity with active stabilization cycles — while QwenPaw is shipping security-critical patches amid accumulating channel- and upgrade-path bugs, and IronClaw is in maintenance-only mode. Across all projects, a **shared axis of concern** has emerged: multi-tenant/multi-profile identity isolation, security-boundary correctness (secrets, exec approval, HTML/shell sanitization), and durable session survival across transport churn. Notably, **two of five projects (OpenClaw, QwenPaw) shipped security-forced releases today** tied to upstream certificate compromise — a rare synchronized supply-chain event that signals ecosystem-wide dependency fragility.

---

## 2. Activity Comparison

| Project | Issues (updated / open) | PRs (updated / open / merged) | Release Status | Health Score* |
|---|---|---|---|---|
| **OpenClaw** | 98 updated / 67 open | 500 updated / 245 open / 255 merged-closed | ✅ v2026.10.6 (security-forced Node bump) | **6.5 / 10** — high velocity, high open-PR backlog, P0 blockers unresolved |
| **Hermes Agent** | 13 updated / 12 open | 50 updated / 33 open / 17 merged-closed | ❌ No release | **7.5 / 10** — fast triage, small aging P2 backlog |
| **IronClaw** | 1 (automated) / 1 open | 6 updated / 5 open / 1 closed | ❌ No release | **6.0 / 10** — stable but nearly dormant; Dependabot accumulation |
| **QwenPaw** | 19 updated / 19 open / 0 closed | 28 updated / 22 open / 6 merged | ✅ v2.2.2.post1 (security patch) | **6.0 / 10** — shipping fixes but zero issue closures, upgrade regressions |
| **ZeroClaw** | 13 updated / 7 open / 6 closed | 50 updated / 42 open / 8 merged-closed | ❌ No release (v0.8.7 in stabilization) | **7.5 / 10** — strong same-day closures, growing review queue |

*\*Health score is a composite heuristic weighing velocity, review backlog ratio, unresolved critical bugs, and release hygiene. Not an official project metric.*

**Key observations:**
- **OpenClaw operates at ~10× the activity of any peer**, but its open-PR-to-merged ratio (~1:1 today) masks a deepening review queue.
- **Hermes and ZeroClaw show the healthiest close ratios** (33–46% of touched PRs merged/closed in 24h).
- **QwenPaw's 19 open / 0 closed issue ratio** is the most concerning triage signal across the set.
- **IronClaw is the outlier**: near-zero human activity, dependency-only PRs — effectively in caretaker mode.

---

## 3. OpenClaw's Position

**Advantages over peers:**
- **Scale of contributor base**: 500 PRs/day vs. 28–50 for peers — roughly an order of magnitude larger ecosystem. This gives OpenClaw faster bug discovery and wider plugin surface.
- **Reference-implementation status**: OpenClaw's architecture (gateway + Doctor + Dreaming + Talk) is the de facto pattern other projects partially emulate or compete against (e.g., Hermes' `hermes-talk` realtime voice plugin mirrors OpenClaw's Talk subsystem).
- **Distribution maturity**: Only project shipping formal versioned releases on a cadence (`v2026.10.x`), plus Docker images, npm/PyPI distribution, and schema migration tooling (v28→v31).
- **Security responsiveness**: Forced Node runtime bump tied to October 2026 TLS certificate compromise — coordinated with upstream Node.js security releases.

**Technical approach differences:**
- Heavier, monolithic gateway with persistent session state, Dreaming memory subsystem, and built-in browser ambitions (issue #53763).
- Comparatively **more fragile on consumer hardware** — the dominant cluster of P0s (sleep/wake on Windows/macOS, event-loop stalls) is largely absent from smaller peers, suggesting architectural complexity is the root cause.
- State ownership model (session authority, checkpoint commits) is more elaborate but also a source of correctness bugs (#166634, #181078).

**Community size comparison:**
- OpenClaw's hot issue #160959 has **42 comments** — more than the total comment volume across Hermes, IronClaw, QwenPaw, and ZeroClaw combined today. Its user base is **demographically broader** (Windows laptops, Raspberry Pi, UGREEN NAS, server-class CPUs) versus peers' more narrow technical/enterprise skew.

**Positioning verdict:** OpenClaw is the **undisputed center of gravity** but is paying for its scale in reliability debt. Peers are effectively "OpenClaw-subset" implementations with fewer moving parts and correspondingly fewer fragility modes.

---

## 4. Shared Technical Focus Areas

The following requirements emerge **across two or more projects**, indicating ecosystem-level needs rather than project-specific quirks:

| Need | Projects | Specific Manifestations |
|---|---|---|
| **Multi-tenant / multi-profile identity isolation** | OpenClaw, Hermes, ZeroClaw | OpenClaw: session authority leaks (#167876, #181215, #181220); Hermes: cross-profile message routing (#143364), stale `sessionOwnerHints` (#143348); ZeroClaw: preserve owner in delegation (#11225, #11995) |
| **Durable session survival across transport churn** | OpenClaw, Hermes | OpenClaw: checkpoint failure leaves agent unavailable (#166634); Hermes: dashboard re-attach kills in-flight turn (#136713, "work is destroyed") |
| **Security boundary correctness** | All five | OpenClaw: secrets apply routes to wrong store (#133296), plaintext secrets in `config-audit.jsonl` (#120411); Hermes: profile-routing leaks; ZeroClaw: shell scanner bypasses (#11822, #11994), `excluded_tools` ignored (#11989); QwenPaw: emSign CA remediation (#8370); IronClaw: dompurify/certifi bumps |
| **Event-loop / resource hygiene on long-lived gateways** | OpenClaw, QwenPaw | OpenClaw: gateway blocks minutes on plugin capture (#160959), heap 60% after 1 day (#180898), Dreaming stalls (#111376); QwenPaw: Feishu blocks main loop, SIGTERM fails (#8350) |
| **Bounded retry / observability on silent failures** | OpenClaw, Hermes, QwenPaw, ZeroClaw | Hermes: infinite 5s retry (#140189); QwenPaw: DingTalk silent drops (#8343); ZeroClaw: denial records lacked sender (#11821); OpenClaw: `tools.github.configure` swallows causes (#181165) |
| **Containerized deployment viability** | QwenPaw, IronClaw, OpenClaw | QwenPaw: Hub-in-Docker broken out-of-box (#8359); IronClaw: ARM64 Docker closed after 5.5 months (#3168); OpenClaw: Docker ships patched Node |
| **Supply-chain / certificate trust remediation** | OpenClaw, QwenPaw | OpenClaw: patched Node for October 2026 TLS compromise; QwenPaw: emSign CA trust removal (#8370, #8371) |

**Synthesis:** The ecosystem is converging on a **shared minimum viable correctness bar** — identity isolation, transport-durable sessions, bounded retries, and supply-chain hygiene — that most projects are *partially* meeting but none have fully solved.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Feature focus** | Full-platform assistant (browser, Dreaming, Talk, plugins) | Multimodal + voice/telephony + browser automation consolidation | Benchmark-driven agent scaffold (officeqa) | Channel-heavy (Feishu, DingTalk, QQ, Telegram, WeChat) + Console UI | Security-hardened multi-tenant agent runtime |
| **Target users** | Broad consumer + prosumer (Windows/macOS laptops, NAS, Pi) | Technical users, voice power users, multi-profile deployers | Benchmark/ML researchers, self-hosted | Chinese-market enterprise, team/global sharing | Enterprise multi-tenant, security-conscious operators |
| **Architecture** | Monolithic gateway + persistent state; schema-versioned | Modular agent + gateway + plugins; PTY/WS transport | Scaffold around model (failures attributed to model, not framework) | Desktop daemon + Hub + channels-as-plugins | Rust/Cranelift, plugin-based, OIDC, principal-scoped |
| **Release cadence** | Versioned (`v2026.10.x`), security-forced | Tag-based, currently stale (#143361) | No recent releases | Security-patch post-releases (`v2.2.2.post1`) | Two-track (`v0.8.7` fixes, `v0.9.0` features) |
| **Differentiating bet** | Headless browser, plugin native views, Dreaming memory | Realtime duplex voice, browser consolidation to `browser_exec` | Model-quality attribution as feature, not bug | Global Skill/MCP sharing, Python Code Mode | Append-only event log / deterministic replay (RFC #10526) |
| **Language/runtime** | Node.js (forced ≥24.22.1 / ≥26.12.1) | Python (PTY/WS) | Python + WebUI (Vite/Storybook) | Python + Node (22.23.4, patched) | Rust |
| **Multi-tenancy maturity** | Emerging (authority gaps) | Emerging (profile confusion) | N/A (single-user benchmarks) | Emerging (global sharing request) | **Most advanced** (principal scoping, OIDC RBAC) |

**Key insight:** Projects are diverging along **two axes**: (a) *breadth of assistant capability* (OpenClaw, Hermes compete here), vs. (b) *hardening for multi-tenant/security deployment* (ZeroClaw leads, QwenPaw following). IronClaw uniquely positions itself as **model-attribution-first** — treating benchmark failures as model capability signals rather than framework defects.

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration at scale:**
- **OpenClaw**: Massive contributor base, but velocity is outpacing maintainer review (245 open PRs). Maturity high, but **reliability debt is compounding**; several release-blockers lack fix PRs. Verdict: *scaling strain*.
- **ZeroClaw**: 42 open PRs, strong same-day closures, but growing review queue with `size:XL`/`risk:high` PRs (#11822, #11847). Verdict: *disciplined but bandwidth-limited*.

**Tier 2 — Stabilizing mid-tier:**
- **Hermes Agent**: Small but heavy backlog (P2 bugs aged 12–13 days without fixes). Fast triage of new items; voice architecture matured today (contract + streaming + docs in one day). Verdict: *stabilizing, maintainer-bandwidth-bound*.
- **QwenPaw**: High PR throughput, security-responsive, but **zero issue closures today** and 3 post-upgrade regressions in 24h. Verdict: *shipping faster than it can verify*.

**Tier 3 — Maintenance/dormant:**
- **IronClaw**: 5 of 6 PRs are Dependabot; only substantive signal is automated failure taxonomy and a 5.5-month-old ARM64 issue closing. Verdict: *caretaker mode; no feature momentum*.

**Momentum ranking (iteration velocity):** OpenClaw ≈ ZeroClaw > Hermes > QwenPaw > IronClaw
**Maturity ranking (production-readiness signals):** ZeroClaw > OpenClaw > Hermes > QwenPaw > IronClaw

---

## 7. Trend Signals

Extracted from community feedback, issue patterns, and PR themes across all five projects — **actionable for AI agent developers and platform architects**:

1. **Security-forced runtime upgrades are becoming routine.** A synchronized October 2026 certificate compromise forced both OpenClaw and QwenPaw to ship patch releases within the same window (Node 24.22.1+/26.12.1+; emSign CA removal; Node CVE-2026-111497/105481). *Implication:* Agent projects must treat **runtime pinning strategy** as a first-class concern — reproducible builds, `.nvmrc` sourcing (QwenPaw #8371), and Docker image rebuild pipelines are now table stakes.

2. **Multi-tenant delegation is the next correctness frontier.** ZeroClaw's `priority:p0`/`release-gate` fix to preserve owner in delegation (#11225) and OpenClaw's recurrent authority leaks indicate the industry is transitioning from *single-user assistants* to *shared multi-persona/team deployments* — and the identity model is not yet mature in any project.

3. **Append-only event history is emerging as the architectural answer to state correctness.** ZeroClaw's accepted RFC #10526 (deterministic replay, derived agent streams) directly addresses the class of bugs OpenClaw is suffering (checkpoint failures, canonical session reader continuation errors, message loss). *Prediction:* other projects will adopt event-sourced session persistence within 2–3 release cycles.

4. **"Silent success" is the most corrosive failure mode.** Across Hermes (#136315 delivered-but-never-arrives, #140189 invisible retries), QwenPaw (#8343 silent DingTalk drops), and ZeroClaw (#11821 unidentifiable denials), users report systems believing they succeeded when they didn't. *Implication:* observability of delivery/execution should be a **default-on feature**, not an operator add-on.

5. **Consumer-hardware durability is an underserved architectural requirement.** OpenClaw's dominant pain cluster (sleep/wake on Windows/macOS, event-loop stalls under plugin load, OOM on ~800-agent state) reflects a broader gap: **no project has a credible long-lived-gateway story for laptops and edge devices.** Smaller peers avoid the problem by having fewer moving parts, not by solving it.

6. **Tool-execution defense-in-depth is now a differentiator.** ZeroClaw's shell scanner boundary-splitting (#11822, #11994) and `excluded_tools` enforcement gap (#11989) signal that as agents run more model-generated shell, **grammar-aware policy enforcement** (not regex-based) is becoming the expected standard. OpenClaw's exec-approval issues converge on the same need.

7. **Channel-matrix quality is becoming a competitive axis.** QwenPaw's dominant bug class (Feishu, DingTalk, Telegram, QQ, WeChat channel-specific failures) reflects a market where **breadth of integrations** is a selling point — but every added channel multiplies QA surface. *Implication:* channel-as-isolated-plugin architecture (QwenPaw #8187) is the emerging mitigation pattern.

8. **Breaking architectural simplifications are being deployed via PR.** Hermes' browser consolidation (#143146: removing agent-browser + 10 built-in tools in favor of `browser_exec`, migrating Camofox to catalog plugin) is a notable pattern: **reducing surface area before adding features**. Expect similar consolidations as the ecosystem matures past its "kitchen-sink assistant" phase.

9. **Voice is transitioning from feature to contract.** Hermes' realtime voice provider contract (#101808) and OpenClaw's Talk subsystem indicate voice/speech-to-speech is standardizing around **pluggable provider abstractions** rather than one-off integrations.

10. **i18n and localization are gated on maintainer decisions, not contributor effort.** Hermes' Korean PR (#120011, 30 days open, `needs-decision`) is a small but telling signal: the ecosystem's policy on **localization scope and maintenance burden** remains undefined — a likely near-term governance question as user bases globalize.

---

*Report compiled from 2026-10-23 GitHub activity digests across OpenClaw, Hermes Agent, IronClaw, QwenPaw, and ZeroClaw. Health scores are analytical composites, not vendor metrics. All figures reflect the 24-hour window ending 2026-10-23.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest
**Date: 2026-10-23** | Source: `github.com/NousResearch/hermes-agent`

---

## 1. Today's Overview

Hermes Agent shows **high-velocity, high-contention activity**: 50 PRs touched in 24h (33 open, 17 merged/closed) against 13 issues updated (12 open, 1 closed) — a roughly **4:1 PR-to-issue ratio**, indicating an active contributor base pushing fixes faster than new reports accumulate. However, **issue quality skews toward P2 severity**, with recurring clusters around session state, gateway message delivery, and Desktop/Gateway configuration mismatches — several of which are **long-lived (10+ days) and still unresolved** (#136713, #136094, #136315). No new releases shipped. Notably, today's PR queue includes **three separate fixes targeting core subsystems** (update/versioning, vision tooling, browser automation consolidation), suggesting the maintainers are in a stabilization-and-refactor cycle rather than a feature-launch cycle.

**Health signal:** Contributor engagement is strong, but the persistence of P2 bugs with multiple comments and no linked fix PRs (see §5) points to **maintainer review bandwidth as the current bottleneck**, not contributor supply.

---

## 2. Releases

**None.** No new releases in the last 24h. Note that issue #143361 (`hermes update` leaves release tags stale) directly affects version reporting for users already on release commits — see §5.

---

## 3. Project Progress

Merged/closed PRs today (17 total; notable items from the visible sample):

| PR | Type | Summary | Link |
|---|---|---|---|
| #143353 (CLOSED) | feat(agent/gateway) | Adds a messaging-session-only `skip_response()` tool — lets the agent explicitly terminate a turn with **no reply** instead of a filler acknowledgement | [PR #143353](https://github.com/NousResearch/hermes-agent/pull/143353) |
| #101808 (CLOSED) | feat(agent/cli/plugins/tts) | **Realtime voice provider contract** + orchestrator + first built-in provider — speech-to-speech abstraction, a long-running effort (opened 2026-09-03) | [PR #101808](https://github.com/NousResearch/hermes-agent/pull/101808) |
| #97436 (CLOSED) | fix(discord/tts) | Discord voice-channel TTS now streams **sentence-by-sentence** instead of waiting for the full LLM response — meaningful latency win for voice users | [PR #97436](https://github.com/NousResearch/hermes-agent/pull/97436) |
| #97325 (CLOSED) | docs(voice) | Documents realtime duplex voice via the `hermes-talk` plugin | [PR #97325](https://github.com/NousResearch/hermes-agent/pull/97325) |
| #79716 (CLOSED) | feat(plugins) | Exposes read-only `PluginContext.active_parent_session_id` for plugin authors | [PR #79716](https://github.com/NousResearch/hermes-agent/pull/79716) |

**Thematic read:** Voice architecture matured substantially today (contract + streaming + docs landing together). The `skip_response` tool is a small but sharp UX improvement for messaging integrations. Plugin API surface continues to expand incrementally.

**Still open but high-impact:**
- #143146 — *Browser automation consolidation*: agent-browser + 10 built-in browser tools removed in favor of `browser_exec`; Camofox moves to a catalog plugin. **This is a breaking change landing via PR** — see §5/§6.
- #143356 — `/compress` mid-reply now queues at turn boundary instead of being refused (port of `kimi-code#4276`).
- #143363 — Fixes the stale-release-tag version reporting bug (pairs with issue #143361).

---

## 4. Community Hot Topics

Ranked by comment activity on issues (PR comment counts were unavailable in the dataset; one item carries a 👍).

**🥇 #136713 — Dashboard chat re-attach kills in-flight turn** (5 comments, updated 2026-10-23, opened 2026-10-11)
[Issue #136713](https://github.com/NousResearch/hermes-agent/issues/136713)
A PTY/WS client disconnect (page reload, second tab, visibility reconnect) **hard-interrupts the running turn within 40–80 ms** — the work is destroyed and the session closes with `end_reason=tui_shutdown`. Broad tag surface (cli, gateway, dashboard, sessions, streaming, tui-gateway). *Underlying need:* users treat the dashboard as a durable control surface and expect session survival across transport churn. This is arguably the most damaging UX bug on the board — it silently destroys work, not just display state.

**🥈 #140189 — Gateway retries undeliverable notification forever** (5 comments)
[Issue #140189](https://github.com/NousResearch/hermes-agent/issues/140189)
A refused process-completion notification is retried **every 5s indefinitely**, with no backoff, no cap, and no explanatory log. *Underlying need:* operators need bounded retry semantics and diagnosable failure logs — this is both a resource leak and an observability black hole.

**🥉 #143326 — Windows permissions / model-selection delay after update** (4 comments, opened today)
[Issue #143326](https://github.com/NousResearch/hermes-agent/issues/143326)
Gateway running elevated while the Desktop app is not → communication errors; plus slow model selection. *Underlying need:* Windows install/update ergonomics and privilege-model consistency remain rough edges.

**Also notable:** #136094 (3 comments, **1 👍** — the only reaction in today's issue set) concerns per-task `HERMES_HOME` symlink layouts republishing a shared checkout launcher. It's low-traffic but structurally important because it affects the **orchestrator/multi-profile deployment pattern**.

---

## 5. Bugs & Stability

Ranked by severity/impact. **No linked fix PRs identified for any P2 issue below** unless noted.

### 🔴 Critical
- **#136713** — Work-destroying turn interruption on dashboard re-attach. *Persistent 12 days, 5 comments, no fix PR visible.*
  [Issue #136713](https://github.com/NousResearch/hermes-agent/issues/136713)
- **#136315** — Acknowledged async delegation completion is **lost at the recursion-cap FIFO overwrite**; delegation is marked `delivery_state=delivered` yet never reaches the parent agent, silently stranding work. *Persistent 13 days.*
  [Issue #136315](https://github.com/NousResearch/hermes-agent/issues/136315)

### 🟠 High
- **#140189** — Infinite 5s retry loop on undeliverable gateway notification (no backoff/cap/log). [Issue #140189](https://github.com/NousResearch/hermes-agent/issues/140189)
- **#143348** (opened today) — Desktop: stale `sessionOwnerHints` pins a session to `profile=default` → REST 404 + `session.resume` `not_found`. **Cross-profile session breakage.** [Issue #143348](https://github.com/NousResearch/hermes-agent/issues/143348)
- **#143347** (opened today) — Vision probes can't resolve `catalog_provider` for named custom providers (routed as `custom`), breaking vision routing despite correct catalog resolution. [Issue #143347](https://github.com/NousResearch/hermes-agent/issues/143347)
- **#143326** — Windows gateway/Desktop privilege mismatch + model-selection delay post-update. [Issue #143326](https://github.com/NousResearch/hermes-agent/issues/143326)
- **#143364** (opened today) — **Multiplexed secondary profile's mid-turn progress and background-review notices delivered via the primary launch-profile bot** — a cross-profile message-routing leak with potential privacy implications for multi-tenant/multi-persona deployments. [Issue #143364](https://github.com/NousResearch/hermes-agent/issues/143364)

### 🟡 Medium
- **#143361** — `hermes update` doesn't refresh release tags; `--version` reports stale version. **Fix PR exists: #143363.** [Issue #143361](https://github.com/NousResearch/hermes-agent/issues/143361) · [PR #143363](https://github.com/NousResearch/hermes-agent/pull/143363)
- **#136094** — Per-task `HERMES_HOME` symlinks republish the shared checkout launcher. [Issue #136094](https://github.com/NousResearch/hermes-agent/issues/136094)
- **#143349** (opened today) — Desktop Group Chat composer **permanently locks on Retry** when a journaled send fails validation (e.g., >64 KB payload) — a dead-end UI state requiring restart. [Issue #143349](https://github.com/NousResearch/hermes-agent/issues/143349)

### 🟢 Low
- **#130443** — `hermes skills install` reports rate-limiting as "no skill"; fix PR exists: **#143351** (proxies `is_rate_limited`). [Issue #130443](https://github.com/NousResearch/hermes-agent/issues/130443) · [PR #143351](https://github.com/NousResearch/hermes-agent/pull/143351)

**Pattern:** Three of today's new bugs (#143348, #143349, #143364) plus an older one (#136094) all involve **profile/session identity confusion** in multi-profile or multi-bot deployments. This is emerging as a systemic weak spot.

---

## 6. Feature Requests & Roadmap Signals

| Item | Signal | Likely roadmap slot |
|---|---|---|
| **#143346** — Kanban dispatcher should report *why* it's cap-held in the "stuck" warning (currently misleading; implies profile health issues when it's just `max_in_progress` full) | Observability polish | Next patch |
| **#143354** (CLOSED same-day) — Desktop Bot relay maintainer routing / legacy ambiguous-execution handling | Process/maintainer triage, closed quickly | N/A |
| **PR #143146** — Browser automation consolidate to `browser_exec`; remove agent-browser + 10 built-in tools; Camofox → auto-installed catalog plugin | **Breaking architectural simplification** | Next minor (watch migration notes) |
| **PR #143356** — `/compress` queued instead of refused | UX parity with kimi-code | Next patch |
| **PR #120011** — Complete Korean desktop localization | i18n expansion (open since 2026-09-23, tagged needs-decision) | TBD — decision pending |
| **PR #143358/#143359** — Curate `gpt-image-2.5-sunburst/-flare`; fix `aspect_ratio: auto` for OpenRouter edits | Model-catalog maintenance | Continuous |

**Prediction:** The next version will likely bundle the **browser-tool consolidation (#143146)** as its headline change (with a migration note), plus the `/compress` queueing behavior and the release-tag fix. Korean localization remains gated on a maintainer decision.

---

## 7. User Feedback Summary

**Pain points (ranked by emotional weight in report text):**
1. **Work destruction is the top grievance.** #136713's reporter emphasizes "work is destroyed" — not merely interrupted. Users are losing real task progress to transient UI events. This erodes trust in the dashboard as a serious control surface.
2. **Silent failures everywhere.** #136315 (delivered-but-never-arrives), #140189 (infinite invisible retries), and #143364 (notices delivered to the wrong bot) share a theme: *the system believes it succeeded when it didn't*, and users only discover this by manual investigation.
3. **Update friction.** Windows users hit privilege mismatches (#143326); source-checkout users get misleading version strings (#143361). Updates themselves are a reliability surface.
4. **Multi-profile deployments are second-class.** Orchestrators, multi-persona Telegram setups, and per-task `HERMES_HOME` layouts repeatedly break (#136094, #143348, #143364).

**Satisfaction signals:** Fast same-day closure of #143354 and rapid fix PRs (#143351, #143363) filed the same day mutiple bugs were reported show responsive triage. Voice feature work (streaming TTS, realtime contract) is landing steadily — power users of voice/telephony are being served well.

**Dissent signal:** Only **one 👍** across all 13 issues today — an unusually low reaction count. Either the affected base is small, or affected users are too focused on writing detailed repros to react. The comment quality, however, is high (detailed environment + commit hashes), indicating a technical user base.

---

## 8. Backlog Watch

Issues/PRs needing maintainer attention, ranked by staleness × severity:

| Item | Age | Why it needs attention |
|---|---|---|
| **#136713** [Issue](https://github.com/NousResearch/hermes-agent/issues/136713) | 12 days | Highest-impact open bug (destroys in-flight work), 5 comments, **no linked fix PR**. Likely needs a maintainer to own the PTY/WS lifecycle fix. |
| **#136315** [Issue](https://github.com/NousResearch/hermes-agent/issues/136315) | 13 days | Async delegation delivery loss + FIFO overwrite at recursion cap. Complex, cross-component (agent/gateway/delegate). No fix PR. |
| **#136094** [Issue](https://github.com/NousResearch/hermes-agent/issues/136094) | 13 days | Only item with a 👍; affects orchestrator deployments. Tagged `sweeper:risk-compatibility`. No fix PR. |
| **#130443** [Issue](https://github.com/NousResearch/hermes-agent/issues/130443) | 22 days | Oldest open item; **fix PR #143351 now exists** — needs review/merge to close the loop. |
| **#120011** [PR](https://github.com/NousResearch/hermes-agent/pull/120011) | 30 days | Korean localization, tagged `needs-decision` since Sept 23 — **awaiting maintainer i18n policy decision**, blocking a complete community contribution. |
| **#122497 / #122493** [PRs](https://github.com/NousResearch/hermes-agent/pull/122497) | 28 days | MrScraper skill + docs, open since Sept 25. Catalog PR #143345 (opened today) suggests the vendor is actively iterating, but the older two may now be stale/superseded and should be explicitly closed or linked. |

**Backlog health verdict:** The backlog is **small but heavy** — a handful of P2 correctness bugs are aging past the one-week mark without fixes, which is the clearest actionable risk. Conversely, triage of *new* items is fast, and vendor/plugin PRs are being refreshed. The single maintainer decision bottleneck to watch is **Kimi i18n PR #120011** and the broader question of browser-tool consolidation (#143146) as a breaking change.

---

*Digest generated from GitHub activity data for 2026-10-23. Comment counts for PRs were not available in the source dataset and are noted as such.*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-10-23

## 1. Today's Overview

IronClaw shows **moderate maintenance activity** with no new releases and no feature-level PRs, dominated entirely by Dependabot dependency bumps (5 of 6 PRs updated). The only substantive signals come from the automated daily failure taxonomy issue (#8153) and the closure of a long-standing ARM64 Docker support issue (#3168, open since May 2026 — over 5 months). The 5 open PRs are all routine dependency updates awaiting review, suggesting maintainer bandwidth is currently the bottleneck rather than contributor supply. Overall project health is **stable but quiet** — no regressions or critical bugs surfaced today, but also no forward feature momentum.

---

## 2. Releases

**No new releases in the last 24h.** None to report.

---

## 3. Project Progress

**Merged/Closed today:**
- **[#8149](https://github.com/nearai/ironclaw/pull/8149)** — `dompurify` bump from 3.4.12 → 3.4.16 (closed, superseded by #8155 which bumps to 3.4.17). This is a routine churn pattern: the older Dependabot PR was closed in favor of a newer bump.
- **[#3168](https://github.com/nearai/ironclaw/issues/3168)** — ARM64/aarch64 Docker build support issue was **closed** after ~5.5 months. Notably, the issue text confirms Cranelift already supports aarch64 and that the only real ARM limitation is armv7 (32-bit, tracked in #1339). Closing this implies either the support shipped, or the issue was resolved/won't-fixed — the digest data does not confirm which, but the closure is a meaningful backlog cleanup.

No feature PRs were merged today. All forward progress today is dependency hygiene.

---

## 4. Community Hot Topics

Activity levels are **very low** across the board — zero comments and zero reactions on every item today.

| Item | Type | Comments | 👍 | Link |
|---|---|---|---|---|
| #8153 Daily failure taxonomy 2026-10-22 | Issue (OPEN) | 0 | 0 | [Link](https://github.com/nearai/ironclaw/issues/8153) |
| #3168 ARM64 Docker support | Issue (CLOSED) | 0 | 0 | [Link](https://github.com/nearai/ironclaw/issues/3168) |
| #8158–#8154 Dependabot PRs | PRs (OPEN) | — | 0 | [Link](https://github.com/nearai/ironclaw/pulls) |

**Underlying needs analysis:** The absence of discussion is itself a signal. The most *informative* item is the **daily failure taxonomy (#8153)**, which reports that of 64 non-pass `officeqa` tasks, the failures are *"overwhelmingly genuine model-quality errors"* attributed to **DeepSeek-V4-Flash** navigation behavior — i.e., the failures are attributed to the underlying model, not IronClaw's agent scaffold. This recurring automated issue is the project's primary quality-tracking mechanism. The ARM64 closure (#3168) reflects a real user deployment need (running official images on ARM machines), now resolved.

---

## 5. Bugs & Stability

**No new bugs, crashes, or regressions were reported today.**

- The only quality signal is the **automated failure taxonomy (#8153)**, which classifies benchmark failures as **model-quality issues rather than framework defects** — a positive indicator for IronClaw's own stability. Severity: **informational**, no fix PR warranted (it's a model capability issue, not a code bug).
- Dependency bump PR **#8155 (dompurify 3.4.12 → 3.4.17)** includes security-relevant upstream fixes ("Restore unaffected emSign roots," root certificate handling) — worth prioritizing merge for supply-chain hygiene. No confirmed CVE in the digest data.

---

## 6. Feature Requests & Roadmap Signals

**No new feature requests today.**

- **#3168 (ARM64 Docker support)** being closed is the strongest roadmap signal: multi-architecture container publishing (linux/amd64 + linux/aarch64) is now likely part of or removed from the near-term pipeline. Since Cranelift already supports aarch64, expect **native ARM Docker images** to appear as an incremental release improvement rather than a headline feature.
- A secondary signal: **#1339 (armv7/32-bit limitation)** remains referenced as a known constraint — unlikely to be prioritized given 32-bit ARM's declining relevance.
- Prediction for next version: continued **WebUI toolchain modernization** (Storybook 10.6.x, Vite 8.1.x) rather than user-facing features.

---

## 7. User Feedback Summary

With zero comments and reactions today, **direct user feedback is effectively absent** — a low-engagement period. The inferred pain points from repo artifacts:

- **Deployment friction (resolved):** Users on ARM64 hardware couldn't run official Docker images (#3168) — now closed, addressing a real portability complaint.
- **Model-quality dissatisfaction (indirect):** The #8153 taxonomy reveals that when using **DeepSeek-V4-Flash**, IronClaw's benchmark success is gated by the model's navigation reliability, not the agent framework. Users running weaker/local models may perceive "IronClaw failures" that are actually model limitations — a possible **documentation/expectation-setting gap**.
- No satisfaction/dissatisfaction sentiment indicators (no reactions) were recorded.

---

## 8. Backlog Watch

| Item | Age | Status | Why it needs attention |
|---|---|---|---|
| [#8158](https://github.com/nearai/ironclaw/pull/8158) Storybook 10.5.7→10.6.2 | 0d | OPEN | Awaiting review; batch with #8156 |
| [#8157](https://github.com/nearai/ironclaw/pull/8157) certifi 2026.7.22→2026.10.19 | 0d | OPEN | Cert/CA bundle update — security-relevant, should merge promptly |
| [#8156](https://github.com/nearai/ironclaw/pull/8156) @storybook/addon-vitest bump | 0d | OPEN | Pairs with #8158 |
| [#8155](https://github.com/nearai/ironclaw/pull/8155) dompurify 3.4.12→3.4.17 | 0d | OPEN | Supersedes closed #8149; security-relevant |
| [#8154](https://github.com/nearai/ironclaw/pull/8154) vite 8.1.3→8.1.6 | 1d | OPEN | Toolchain update |
| [#8153](https://github.com/nearai/ironclaw/issues/8153) Failure taxonomy | 1d | OPEN | Recurring automated tracker; monitor trend over time |

**Concern:** The dominant backlog pattern is **Dependabot PR accumulation** — five open dependency PRs with no reviewer engagement. While individually low-risk, the **certifi (#8157)** and **dompurify (#8155)** bumps touch security-relevant libraries (TLS trust roots, HTML sanitization) and should not linger. Maintainer review capacity appears to be the primary constraint on project velocity. The recurring failure-taxonomy issue (#8153) is a healthy automated practice but generates no human discussion, worth watching for a trend shift from model-quality to framework-quality failures.

---

*Digest generated from GitHub activity data for 2026-10-23. Activity assessment: low-to-moderate, maintenance-only day.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-10-23

## 1. Today's Overview

QwenPaw is operating in a **high-activity but issue-heavy** state. In the last 24 hours, 19 issues were updated (all still open, zero closed) and 28 PRs saw activity (22 open, 6 merged/closed). A security-focused patch release, **v2.2.2.post1**, was published, prompting a project-wide upgrade advisory. Activity is driven largely by bug reports across channels (Feishu, Telegram, DingTalk, QQ), Console UI issues, and hardware/runtime configuration problems. The absence of closed issues today, combined with a growing open-issue queue, suggests the maintainer team is prioritizing merge throughput and release cadence over issue triage. Overall health is **stable but strained** — the project is actively shipping security fixes while accumulating unresolved channel-specific bugs.

## 2. Releases

### v2.2.2.post1 (Patch Release)
A security-oriented post-release. Key changes:

- **Security fix (breaking relevance):** Remediation of **emSign CA trust** across dependencies, installers, and builds ([PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370)) — this appears to be a supply-chain / certificate trust remediation, likely triggered by a CA compromise or trust revocation event.
- Version bump chore ([PR #8369](https://github.com/agentscope-ai/QwenPaw/pull/8369)).
- Additional security fix truncated in release notes.

**Migration guidance:** A dedicated security notice ([Issue #8385](https://github.com/agentscope-ai/QwenPaw/issues/8385)) **strongly recommends all users upgrade to v2.2.2.post1 or later** across Desktop installers, PyPI, and other distribution methods. Users on pinned versions or air-gapped installs should prioritize this. No documented breaking API changes beyond the CA trust scope.

## 3. Project Progress

**Merged/closed PRs (6 total), notable:**
- [PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370) — `fix(security)`: emSign CA trust remediation (closed, shipped in.post1).
- [PR #8371](https://github.com/agentscope-ai/QwenPaw/pull/8371) — `fix(security)`: Node.js bumped to 22.23.4, patching CVE-2026-111497 and CVE-2026-105481; Docker/CI now sourced from `.nvmrc`.

**Features advancing (open PRs with active updates):**
- [PR #8373](https://github.com/agentscope-ai/QwenPaw/pull/8373) — Shared desktop daemon enabling independent windows and coordinated updates (XXXL).
- [PR #8384](https://github.com/agentscope-ai/QwenPaw/pull/8384) — Hub Docker runtime fix (directly addresses container readiness bug #8359).
- [PR #8387](https://github.com/agentscope-ai/QwenPaw/pull/8387) — Configurable Hub gateway timeout (600s default), fixing #8372.
- [PR #8389](https://github.com/agentscope-ai/QwenPaw/pull/8389) — Runtime CORS origin reading, fixing #8374.
- [PR #8366](https://github.com/agentscope-ai/QwenPaw/pull/8366) — License cleanup: replaces GPL-3.0 `html2text` with stdlib converter (Apache-2.0 compliance).

Fix PRs are visibly paired with bug reports, indicating a responsive fix pipeline even as issues remain open pending verification.

## 4. Community Hot Topics

| Item | Type | Comments | Signal |
|---|---|---|---|
| [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) Plugin-facing theme extension point | Feature | 7 | Plugin ecosystem maturing; authors need deeper theming than a single color knob |
| [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) Composer draft per-agent vs per-conversation | Bug | 3 | Affects every multi-conversation user; fix PR #8362 already open |
| [#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359) Hub in-container Docker readiness fails | Bug | 2 | Blocks the maintainer-recommended containerized Hub deployment |
| [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) Global Skill & MCP management | Enhancement | 2, 👍1 | Strongest-reacted request; team/enterprise sharing need |

**Underlying needs analysis:** The top themes are (a) **plugin/extension depth** — the plugin API is outgrowing its current surface; (b) **multi-conversation state correctness** — a recurring class of localStorage/session-scoping bugs; (c) **containerized deployment viability** — Hub-in-Docker is documented but broken in edge cases; and (d) **team-level resource sharing**, signaling QwenPaw's shift from single-user tool toward shared/enterprise deployment.

## 5. Bugs & Stability

Ranked by severity:

1. **🔴 Runtime corruption after upgrade** — [#8388](https://github.com/agentscope-ai/QwenPaw/issues/8388): `No module named '_qwenpaw_remote_backend'` breaks *all* tool calls (QQ channel, file reads, Python execution). Highest severity: renders the install partially non-functional. **No fix PR yet.**
2. **🔴 Event-loop blocking / service freeze** — [#8350](https://github.com/agentscope-ai/QwenPaw/issues/8350): Feishu channel makes synchronous network calls on the main loop; when the network is unreachable, `/api/healthz` times out and SIGTERM cannot terminate the process. **No fix PR yet.**
3. **🟠 Silent message loss** — [#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343): DingTalk drops final replies when `sessionWebhook` expires (errcode=300001), no Open API fallback. **Related:** [PR #8341](https://github.com/agentscope-ai/QwenPaw/pull/8341) addresses long-reply chunking but not webhook expiry. **No targeted fix PR.**
4. **🟠 Session wedge from large media** — [#8335](https://github.com/agentscope-ai/QwenPaw/issues/8335): 48 MB request bodies permanently wedge WeChat sessions (`length limit exceeded`). **No fix PR.**
5. **🟠 Config regression** — [#8374](https://github.com/agentscope-ai/QwenPaw/issues/8374): `QWENPAW_CORS_ORIGINS` set via UI/CLI never takes effect (constant read before env load). **Fix PR [#8389](https://github.com/agentscope-ai/QwenPaw/pull/8389) open.**
6. **🟡 Model call failure after upgrade** — [#8378](https://github.com/agentscope-ai/QwenPaw/issues/8378): `agent.json` `active_model` config incompatible post-upgrade. **No fix PR.**
7. **🟡 Draft leakage between conversations** — [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351). **Fix PR [#8362](https://github.com/agentscope-ai/QwenPaw/pull/8362) open.**
8. **🟡 Quoted-reply control-command misrouting in 7 channels** — [#8342](https://github.com/agentscope-ai/QwenPaw/issues/8342): `/stop` in a quote is treated as normal traffic. **No fix PR.**
9. **🟡 Telegram drops quoted context** — [#8329](https://github.com/agentscope-ai/QwenPaw/issues/8329). **No fix PR.**
10. **🟢 Sidebar header overlap** — [#8333](https://github.com/agentscope-ai/QwenPaw/issues/8333). **Fix PR [#8334](https://github.com/agentscope-ai/QwenPaw/pull/8334) open.**
11. **🟢 Delete-selected-conversation 404** — [#8368](https://github.com/agentscope-ai/QwenPaw/issues/8368). **Fix PR [#8375](https://github.com/agentscope-ai/QwenPaw/pull/8375) open.**
12. **🟢 Test collection failure on clean checkout** — [#8377](https://github.com/agentscope-ai/QwenPaw/issues/8377). **Fix PR [#8379](https://github.com/agentscope-ai/QwenPaw/pull/8379) open.**

**Pattern:** Three of today's top bugs are **post-upgrade regressions** (#8388, #8378, #8374). This points to insufficient upgrade-path testing — a stability risk worth flagging to maintainers.

## 6. Feature Requests & Roadmap Signals

| Request | Issue | Likelihood in Next Version |
|---|---|---|
| Plugin theme extension points (semantic token override) | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) | Medium — active discussion, aligns with plugin push |
| Global Skill & MCP shared management for Hub | [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) | Medium-High — community-reacted, enterprise demand |
| Disable auto-scroll during streaming | [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) | Medium — small UX scope, open since August |

**In-flight roadmap items visible via PRs:** Python Code Mode ([PR #8224](https://github.com/agentscope-ai/QwenPaw/pull/8224)), channels-as-isolated-plugins ([PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)), PawApp SDK redesign ([PR #7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)), and PowerContext memory backend v1.4.0 support ([PR #8376](https://github.com/agentscope-ai/QwenPaw/pull/8376)). The project is clearly investing in **modularity (plugins), extensibility (Code Mode, PawApp), and enterprise features (global sharing)**.

## 7. User Feedback Summary

- **Satisfaction:** Security responsiveness is strong — the emSign remediation and rapid patch release demonstrate maintainer diligence. Fix PRs are frequently paired with bug reports within hours.
- **Pain points:**
  - **Upgrade fragility** — multiple users report broken environments after updating (#8388, #8378), eroding trust in release quality.
  - **Channel reliability** — silent message drops (DingTalk #8343), lost quoted context (Telegram #8329, multi-channel #8342), and service freezes (Feishu #8350) degrade the core channel experience.
  - **Container deployment gap** — the recommended Hub-in-Docker path is broken out of the box (#8359).
  - **Timeout tuning** — Hub gateway's 120s default is too short for file-processing workloads (#8372), indicating real production usage patterns.
- **Overall sentiment:** Users are engaged and reporting detailed, reproducible bugs (good sign), but the volume of channel-specific and upgrade-path issues suggests **quality assurance across the channel matrix and upgrade scenarios is the project's biggest weakness**.

## 8. Backlog Watch

Long-unanswered or important items needing maintainer attention:

- **🔴 [#8388](https://github.com/agentscope-ai/QwenPaw/issues/8388)** — Post-upgrade runtime corruption (`_qwenpaw_remote_backend` missing). No fix PR, high user impact. **Needs immediate triage.**
- **🔴 [#8350](https://github.com/agentscope-ai/QwenPaw/issues/8350)** — Event-loop blocking freeze in Feishu channel. No fix PR. Architectural, not cosmetic.
- **🟠 [#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343)** — DingTalk silent reply loss. No targeted fix PR despite clear root cause.
- **🟠 [#8335](https://github.com/agentscope-ai/QwenPaw/issues/8335)** — Permanent session wedge from large media; design-level issue.
- **⏳ [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339)** — Auto-scroll disable toggle, open since **2026-08-27** (~2 months). Low effort, recurring ask; candidate for a quick win.
- **⏳ [PR #7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)** & **[PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)** — Both XXXL, open since September/October and still updating. Large architectural PRs that will need sustained review bandwidth.

---

*Data source: github.com/agentscope-ai/QwenPaw. Digest generated for 2026-10-23 from 24-hour activity window.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-10-23

## 1. Today's Overview

ZeroClaw shows **very high development velocity** on 2026-10-23, with 50 PRs updated in the last 24 hours (42 still open, 8 merged/closed) and 13 issues touched (7 open/active, 6 closed). Activity is broad-based: security hardening in the shell scanner, gateway lifecycle fixes, channel/plugin correctness, and CI reliability work are all in flight simultaneously. Notably, **no new release was cut**, yet a cluster of `release:v0.8.7`-tagged fixes were merged or closed today, suggesting v0.8.7 is in final stabilization. The maintainer group (notably JordanTheJet) is highly responsive, with same-day closures on CI/test issues. Risk profile is elevated in several large PRs (`risk:high`, `size:XL`), which warrants careful review bandwidth.

---

## 2. Releases

**No new releases in the last 24 hours.** No release notes or migration guidance required today.

For context, closed issues tagged `release:v0.8.7` (see §3) indicate the next version is accumulating fixes rather than new features, and issue #11984 targets `release:v0.9.0` for the dashboard chat feature — implying a two-track release cadence.

---

## 3. Project Progress (Merged/Closed Today)

Eight PRs were merged/closed in the last 24h. Highlights:

| PR | Title | Impact |
|---|---|---|
| [#11863](https://github.com/zeroclaw-labs/zeroclaw/pull/11863) | test(runtime): make receipt-bound `late_tool_search` tests opt-in | Fixes flaky/timeout-prone CI by gating 23 tests on a fixture receipt |
| [#11848](https://github.com/zeroclaw-labs/zeroclaw/pull/11848) | fix(plugins): name the sender in `plugin_channel_sender_denied` records | Operator UX — now actionable denial logs |
| [#11941](https://github.com/zeroclaw-labs/zeroclaw/pull/11941) | ci(plugins): raise cranelift runtime leg timeout to 30 min | Resolves persistent 20-min timeout |
| [#11833](https://github.com/zeroclaw-labs/zeroclaw/pull/11833) | ci(docker): bound arm64 build memory + dry-run dispatch | Fixes OOM during arm64 fat-LTO link |
| [#11967](https://github.com/zeroclaw-labs/zeroclaw/pull/11967) | fix(ci): crates.io preflight only for PR's own version bump | Prevents false failures after tag exists |
| [#11841](https://github.com/zeroclaw-labs/zeroclaw/pull/11841) | docs(changelog): match v0.8.6 OIDC wording | Consistency |

**Themes:** CI stability (4 of 8), observability/operator UX (2), docs (1), test hygiene (1). No major feature landed — this was a **stabilization day**.

---

## 4. Community Hot Topics

Ranked by comment volume and strategic weight:

1. **[Issue #10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)** (CLOSED, 13 comments) — *RFC: Append-only session event history, deterministic state replay, and derived agent streams.*
   - **Why it matters:** This is an architectural RFC tagged `status:accepted`, `risk:high`, `domain:architecture`. It proposes replacing mutable conversation persistence with an append-only event log enabling deterministic replay. Underlying need: **reproducibility, auditability, and debugging of agent behavior** — a recurring enterprise-grade demand.

2. **[PR #11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225)** (OPEN, `priority:p0`, `release-gate`, `domain:security`) — *fix(memory): preserve owner in delegation.*
   - **Why it matters:** Ties directly to multi-tenant identity isolation. The companion issue **[#11995](https://github.com/zeroclaw-labs/zeroclaw/issues/11995)** (opened today) asks to *restore* background delegation only after principal scoping is airtight. Underlying need: **safe multi-tenant delegation** — a hard blocker for production multi-user deployments.

3. **[PR #11822](https://github.com/zeroclaw-labs/zeroclaw/pull/11822)** / **[PR #11994](https://github.com/zeroclaw-labs/zeroclaw/pull/11994)** (OPEN, `security:policy`) — *Shell command scanner: split POSIX commands at substitution/subshell boundaries; read POSIX in bash's grammar.*
   - **Why it matters:** These address command-injection-style bypasses in `tool:shell` policy enforcement. Underlying need: **defense-in-depth for agent tool execution**, especially as agents run untrusted model-generated shell.

4. **[Issue #11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984)** (OPEN, `release:v0.9.0`) — *Dashboard chat for signed-in accounts without admin rights.*
   - **Why it matters:** Directly expands the audience — non-admin OIDC users can now chat with granted agents. Underlying need: **enterprise RBAC + self-service access**.

---

## 5. Bugs & Stability

Ranked by severity (all reported/updated 2026-10-22/23):

**S2 — Degraded behavior**
- **[#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991)** — Email channel HTML passthrough: raw markup & arbitrary image URLs from agent text leak onto the wire. *Fix PR exists:* [#11993](https://github.com/zeroclaw-labs/zeroclaw/pull/11993) strips raw HTML in `markdown_to_html`.
- **[#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989)** — Per-channel `excluded_tools` is never applied. *No fix PR yet.* Policy enforcement gap — model can reach tools the operator intended to hide.
- **[#11966](https://github.com/zeroclaw-labs/zeroclaw/issues/11966)** (CLOSED) — crates.io preflight triggers on inherited version bumps and fails once tag exists. *Fixed by* [#11967](https://github.com/zeroclaw-labs/zeroclaw/pull/11967).
- **[#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558)** (CLOSED) — Cranelift CI 20-min timeout. *Fixed by* [#11941](https://github.com/zeroclaw-labs/zeroclaw/pull/11941).

**S3 — Minor**
- **[#11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987)** — Inline `nosemgrep` comments do not suppress Semgrep code-scanning alerts. *No fix PR yet.*
- **[#11821](https://github.com/zeroclaw-labs/zeroclaw/issues/11821)** (CLOSED) — Denial records lacked sender identity. *Fixed by* [#11848](https://github.com/zeroclaw-labs/zeroclaw/pull/11848).

**Notable non-issue stability work:** PR [#11901](https://github.com/zeroclaw-labs/zeroclaw/pull/11901) addresses gateway shutdown semantics (connections continue serving on stopped router) — a latent crash/correctness risk on every daemon reload.

---

## 6. Feature Requests & Roadmap Signals

| Item | Signal | Predicted landing |
|---|---|---|
| [#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) Dashboard chat for non-admin signed-in accounts | Tagged `release:v0.9.0` | **v0.9.0** |
| [#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992) Email operator templates + sanitized HTML body for `send_via` | Paired with bug #11991 fix | **v0.8.7–v0.9.0** |
| [#11995](https://github.com/zeroclaw-labs/zeroclaw/issues/11995) Restore owned background delegation with principal-scoped results | Follow-up to #11225 (`p0`, `release-gate`) | **Gated on #11225** |
| [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) XMPP/Prosody channel with optional OMEMO | `size:XL`, `risk:high`, still open | **Post-v0.9.0 candidate** |
| [#11879](https://github.com/zeroclaw-labs/zeroclaw/pull/11879) Goal V1 proposal 2/12 — config & command grammar | Dormant, staged rollout | **Multi-release series** |

**Trend:** The roadmap is bifurcating into (a) **security & multi-tenancy hardening** and (b) **channel/identity expansion** (email templates, XMPP, OIDC dashboard chat).

---

## 7. User Feedback Summary

**Pain points surfaced today:**
- **Operator visibility:** #11821 ("cannot tell whom to admit") — operators need *identifiable* denial events. Fixed same-day.
- **Policy trust:** #11989 (`excluded_tools` silently ignored) undermines confidence that channel-level restrictions are enforced. This is arguably the **most concerning unfixed issue** of the day.
- **Email rendering safety:** #11991 shows users want designed outbound emails *without* letting the agent inject arbitrary HTML/images — a security-usability tension.
- **Release reliability:** #11828 and #11966 reflect frustration that CI/release mechanics can block shipping (arm64 OOM, preflight false failures).

**Satisfaction signals:** Rapid same-day turnaround on CI bugs and the acceptance of a major architectural RFC (#10526) suggest a healthy contributor-maintainer loop.

**Dissatisfaction signals:** Two S2 issues (#11989, #11991) on *channel correctness* within 24h, both from the same author (mov-xound-glitch), hint that the channels subsystem has accumulated latent gaps.

---

## 8. Backlog Watch

Long-unanswered items warranting maintainer attention:

- **[PR #10034](https://github.com/zeroclaw-labs/zeroclaw/pull/10034)** (OPEN since 2026-08-16, ~68 days) — *fix(tools): probe saved provider alias after model-routing update.* Tagged `domain:security`, `risk:medium`, `size:XL`. No recent disposition.
- **[PR #11304](https://github.com/zeroclaw-labs/zeroclaw/pull/11304)** (OPEN since 2026-10-01, `status:blocked`, `topic:plugins`) — *Record socket and WebSocket egress denials.* Explicitly blocked; needs maintainer input to unblock.
- **[PR #11822](https://github.com/zeroclaw-labs/zeroclaw/pull/11822)** (OPEN since 2026-10-17, `needs-maintainer-review`, `security:policy`, `risk:high`) — Shell scanner boundary splitting. High security value; awaiting review.
- **[PR #11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)** (XMPP channel, `size:XL`, `risk:high`, active since 2026-10-19) — Large-surface contribution that will require sustained reviewer bandwidth.

**Health note:** Open PR count (42) vs. merged (8) in 24h yields a ~5:1 open-to-merge ratio. While activity is high, the review queue is growing — a potential bottleneck if `size:XL` PRs continue to accumulate without proportionate reviewer throughput.

---

*Generated from GitHub activity on 2026-10-23. All links point to `github.com/zeroclaw-labs/zeroclaw`.*

</details>