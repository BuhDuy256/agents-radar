# OpenClaw Ecosystem Digest 2026-10-23

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-23 03:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-10-23

## 1. Today's Overview

OpenClaw shows very high sustained activity: 500 issues and 500 PRs updated in the last 24 hours, with 211 issues closed and 232 PRs merged/closed. A single patch release (v2026.10.6) landed, primarily a **security-driven Node runtime bump** in response to the October 2026 Node.js TLS certificate compromise. However, the issue tracker is dominated by **P0/P1 crash-loop, message-loss, and gateway-stall regressions** still open from the 2026.9.x line — notably large-plugin gateway blocking (#160959, 42 comments), post-sleep recovery failures (#140010, #158592), and plugin startup CPU-bound compilation (#160485). The long-tail of stale P2/P3 issues from March–May 2026 is being closed, suggesting maintainers are actively doing backlog hygiene while a fresh wave of 2026.9.6–2026.10.x regressions occupies the top of the queue. Overall: **high-throughput but regression-heavy; stability work is the dominant theme.**

## 2. Releases

### v2026.10.6 — Latest

**Highlights:**
- **Patched Node runtime required.** OpenClaw now requires **Node 24.22.1+** on the 24 line or **26.12.1+** on the 26 line. These versions reject TLS chains signed with the compromised certificate keys addressed in the October 2026 Node.js security releases. Docker images ship the patched Node.

**Impact / Migration Notes:**
- This is effectively a **security-hardening release**. Operators running older 24.x or 26.x Node must upgrade Node before/alongside updating OpenClaw, or TLS validation against affected chains may behave inconsistently.
- No schema or config breaking changes mentioned in the release body, but the runtime floor is a hard prerequisite — CI/self-hosted deployments pinned to older Node will fail or degrade.
- Given the number of open gateway/plugin regressions on 2026.9.6+, users on 2026.9.x should weigh upgrading directly to 2026.10.6, but should note several 2026.10.x P1 issues remain open (see §5).

*(Only one release in this window; no prior-version diffs provided.)*

## 3. Project Progress

While the PR sample provided shows mostly **open** PRs, several closed ones signal active fix flow. Key merged/closed items and advancing work:

- **PR #181174 [CLOSED]** — `refactor(ui): remove redundant Solid lifetime snapshots` — Control UI cleanup, reducing reactive overhead in tabs, command palette, transcript rows, sidebar panels. [Link](https://github.com/openclaw/openclaw/pull/181174)
- **PR #181245 [CLOSED]** — `fix(cron): stop CLI reply hooks after run cancellation` — prevents CLI-backed cron hooks from admitting work after a run is cancelled. Security-boundary tagged. [Link](https://github.com/openclaw/openclaw/pull/181245)
- **PR #181288 [CLOSED]** — `fix: wait for keyboard progress hide before resize` — mobile UI E2E flake/hide behavior corrected. [Link](https://github.com/openclaw/openclaw/pull/181288)

**Notable feature/fix PRs opened today (advancing, not yet merged):**
- **PR #181289** — `fix: large session stores delay Gateway plugin startup` (Fixes #181090) — directly addresses the startup-blocking class of bugs.
- **PR #181203** — `fix: resume peer updates with session-scoped authority` (security-boundary).
- **PR #181260** — `fix(agents): settle consumed yield cohorts without retry` (fixes double-delivery after restart under `merge-risk: 🚨 message-delivery`).
- **PR #180824** — `feat(ui): save per-agent model favorites in the chat picker` (Closes #180755).
- **PR #181190** — `perf(ui): virtualize large model picker catalogs` (1,000-model catalog performance).
- **PR #181292** — `feat(plugins): enforce narrow-only native subagent profiles` — read-only reviewer roles for plugin subagents.

**Backlog closure trend:** numerous March–May 2026 issues closed today (#44502, #15032, #33975, #53540, #56692, #47273, #50481, #48918, #45184, #126836, #71330), indicating maintainers are clearing stale product-decision items.

## 4. Community Hot Topics

Top threads by comment count:

1. **[#160959](https://github.com/openclaw/openclaw/issues/160959) — Gateway blocks for minutes on large external plugins (2026.9.6 regression)** — 42 comments, P0, 🦞 diamond lobster. The single hottest issue. Underlying need: **plugin capture must not block the gateway event loop**. Large package/dependency trees stall startup and republish cycles. This is the canonical "regression from plugin generation capture" problem.

2. **[#42475](https://github.com/openclaw/openclaw/issues/42475) — Per-agent cost budget enforcement at gateway level** — 27 comments. Users want **hard daily/monthly spend caps** before model dispatch, without external monitoring. Signals cost-governance is a top operator concern.

3. **[#11829](https://github.com/openclaw/openclaw/issues/11829) [CLOSED] — Security Roadmap: Protecting API Keys from Agent Access** — 21 comments. Layered secrets protection; keys leaking into prompts/chat. Closed today — a significant security-milestone signal.

4. **[#53763](https://github.com/openclaw/openclaw/issues/53763) [CLOSED] — Built-in headless browser** — 18 comments. Users frustrated by the fragile three-layer web-access dependency.

5. **[#157531](https://github.com/openclaw/openclaw/issues/157531) — 2026.9.7 Fixes Tracker** — 17 comments, tracking 18/21 established P1 candidates including privacy/security items.

**Analysis:** The community's dominant unmet needs are (a) **gateway event-loop isolation from plugins**, (b) **cost controls**, and (c) **secrets/key hygiene**. The closure of the API-key roadmap (#11829) and headless-browser (#53763) issues suggests maintainers are converting long-standing asks into roadmap commitments.

## 5. Bugs & Stability

Ranked by severity (P0 first). ⚠️ = active regression on the 2026.9.6+ line.

**P0 / Crash-loop / Message-loss:**
- ⚠️ **[#160959](https://github.com/openclaw/openclaw/issues/160959)** — Gateway blocks for minutes on large plugins. **Fix in flight:** PR #181289 addresses the related startup/session-store delay class; the plugin-capture event-loop stall itself remains under maintainer review.
- ⚠️ **[#156712](https://github.com/openclaw/openclaw/issues/156712)** — `openclaw triage` repair subprocess doesn't exit cleanly, holds `gateway-lifecycle` lock, blocks restart. Manual-only; no fix PR yet.
- ⚠️ **[#156674](https://github.com/openclaw/openclaw/issues/156674)** — macOS gateway resource pressure with long-lived Codex workers (8 GiB VM). Stopping gateway restores responsiveness.
- ⚠️ **[#158592](https://github.com/openclaw/openclaw/issues/158592)** — After host sleep/wake, prepared model runtime publication times out and never recovers → every inbound message fails until restart.
- ⚠️ **[#166634](https://github.com/openclaw/openclaw/issues/166634)** — Late reclamation commit checkpoint failure leaves agent permanently unavailable after crash recovery (`not-repro-on-main`).
- **[#141615](https://github.com/openclaw/openclaw/issues/141615)** — webchat stuck "Authenticated profile verification is unavailable" wedges all session/task RPCs. **Linked PR open.**

**P1:**
- ⚠️ **[#140010](https://github.com/openclaw/openclaw/issues/140010)** — Windows sleep/resume: WebSocket reconnects fail 30–60s+.
- ⚠️ **[#172837](https://github.com/openclaw/openclaw/issues/172837)** — Codex `nativeSubagentAssignments` never removed after completion delivery gives up (session-state/message-loss). Also relates to PR #181260.
- ⚠️ **[#167557](https://github.com/openclaw/openclaw/issues/167557)** — Deferred plugin migration never converges; "managed handoff lease database identity changed." **fix-shape-clear.**
- ⚠️ **[#155359](https://github.com/openclaw/openclaw/issues/155359)** — SQLite write-transaction holds up to 33.2s past `busy_timeout` on Windows.
- ⚠️ **[#138042](https://github.com/openclaw/openclaw/issues/138042)** — Gateway control requests stall 157–276s.
- ⚠️ **[#160485](https://github.com/openclaw/openclaw/issues/160485)** — Plugin load CPU-bound on module compilation (57.4s of 60s plugin phase).
- ⚠️ **[#145690](https://github.com/openclaw/openclaw/issues/145690)** — Subagent completion releases model-runtime generation → next lane task fails, message dropped as bogus timeout.
- **[#154716](https://github.com/openclaw/openclaw/issues/154716)** — Native Claude CLI auth yields auth-unknown, blocks history reseed.

**P2 / Notable:**
- **[#165421](https://github.com/openclaw/openclaw/issues/165421)** — Stale `maxTokens` (128k) in Control UI context widget.
- **[#166137](https://github.com/openclaw/openclaw/issues/166137)** — Egress proxy sentinel substitution intermittently ineffective → 401s with stale credentials (security).
- **[#140723](https://github.com/openclaw/openclaw/issues/140723)** — WebChat duplicates assistant text ×2–×3.
- **[#136360](https://github.com/openclaw/openclaw/issues/136360)** — Internal `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` carrier leaks as visible turn on Teams (same class as Slack/Telegram/Feishu/Discord).
- **[#157812](https://github.com/openclaw/openclaw/issues/157812)** — Windows auto-update fails repeatedly.

**Health read:** The density of P0/P1 gateway-lifecycle, sleep/wake, SQLite, and plugin-startup bugs around 2026.9.5–2026.9.8 indicates a **stability debt concentrated in the plugin/runtime lifecycle layer**. Multiple fix PRs (e.g., #181289, #181260, #181203) are targeting exactly this, which is a positive signal that the team is converging on root causes.

## 6. Feature Requests & Roadmap Signals

**Most-requested / likely next:**
- **[#42475](https://github.com/openclaw/openclaw/issues/42475) — Per-agent cost budgets at gateway** (27 comments, 1 👍). High operator demand; likely candidate once lifecycle stability settles.
- **[#15032](https://github.com/openclaw/openclaw/issues/15032) [CLOSED] — Per-spawn tool restrictions for sub-agents.** Strong security use case (DMZ/prompt-injection defense). Closure today + PR #181292 (`narrow-only native subagent profiles`) = **this is landing/has landed.**
- **[#13583](https://github.com/openclaw/openclaw/issues/13583) [CLOSED] — Pre-response enforcement hooks (hard gates).** Mechanical enforcement of "must call tool X" for quant/security workflows. Closed as product-decision — watch for a follow-up.
- **[#53763](https://github.com/openclaw/openclaw/issues/53763) [CLOSED] — Bundled headless browser.** Closure hints at a browser-tooling revamp.
- **[#144306](https://github.com/openclaw/openclaw/issues/144306) — Automation delivery to paired nodes for notifications** (P3).
- **[#138279](https://github.com/openclaw/openclaw/issues/138279) — Linux aarch64 companion builds (deb + AppImage)** (P3).
- **[#48918](https://github.com/openclaw/openclaw/issues/48918) [CLOSED] — User-level skill preferences/conventions.**
- **[#71330](https://github.com/openclaw/openclaw/issues/71330) [CLOSED] — Configurable memory promotion target.**
- **[#87660](https://github.com/openclaw/openclaw/issues/87660) — Lifecycle-aware LLM curation for MEMORY.md** (6 comments, 2 👍) — memory quality theme.

**Prediction:** Next minor release likely ships **subagent tool-narrowing (#181292), cost/usage-gating groundwork, and continued gateway-lifecycle hardening**. Headless browser and hard pre-response gates are strong candidates for the release after.

## 7. User Feedback Summary

**Pain points:**
- **Reliability after suspend/crash.** Recurring Windows/macOS sleep-wake failures (#140010, #158592, #156674) erode trust — "after wake everything breaks."
- **Security friction vs. autonomy.** [#151112](https://github.com/openclaw/openclaw/issues/151112) captures a real frustration: security/approval loops turn self-hosted owners into "manual execution agents," even when tasks were explicitly delegated. This is a tension between hardening and usability.
- **Secrets leakage.** #11829 (now closed) and #166137 (egress proxy 401s) show real key-exposure and credential-substitution anxiety.
- **Cost anxiety.** #42475: operators fear runaway spend and want native caps, not bolt-on monitoring.
- **Startup performance.** #160485, #160959: plugin compilation/capture makes the gateway feel broken on Windows.

**Satisfaction signals:** Rapid closure of long-standing feature issues (#11829, #53763, #15032, #13583) and steady PR throughput suggest an engaged, responsive maintainer team — but the volume of unresolved P0/P1 regressions in 2026.9.x is the counterweight.

**Use cases surfaced:** quant/finance policy enforcement (#13583), isolated DMZ web search (#15032), multi-account Matrix/Telegram bot routing (#45184, #56692), self-hosted non-technical operators (#151112), Android/iOS companion notifications (#144306).

## 8. Backlog Watch

Long-lived, high-value items needing maintainer attention (most reopened/still open despite age):

- **[#42475](https://github.com/openclaw/openclaw/issues/42475)** — Per-agent cost budgets (created 2026-03-10; 27 comments; `needs-product-decision`). **7+ months open** with clear demand — deserves a decision.
- **[#53763](https://github.com/openclaw/openclaw/issues/53763)** — Headless browser (created 2026-03-24; closed today — verify resolution).
- **[#13583](https://github.com/openclaw/openclaw/issues/13583)** — Hard pre-response gates (created 2026-02-10; closed today).
- **[#87660](https://github.com/openclaw/openclaw/issues/87660)** — MEMORY.md lifecycle curation (created 2026-05-28; recovery-stuck tag).
- **[#151112](https://github.com/openclaw/openclaw/issues/151112)** — Self-hosted operator autonomy vs. secrets/approval loops (created 2026-09-17; `needs-security-review` + `needs-product-decision`).
- **[#166670](https://github.com/openclaw/openclaw/issues/166670)** — CI OOM on Bun 667c (created 2026-10-07; infrastructure reliability — Bun qualification path remains unresolved).
- **[#166137](https://github.com/openclaw/openclaw/issues/166137)** — Egress proxy sentinel substitution failure (created 2026-10-06; security; `needs-info`).

**Watch recommendation:** #42475 (cost budgets) and #151112 (operator autonomy) are the two most strategically important open threads, as both reflect structural tensions — cost governance and security-vs-usability — that will shape adoption among self-hosted operators.

---

*Note on data quality: PR comment counts were reported as `undefined` in the source feed, so PR "hotness" is inferred from labels, size, and merge-risk tags rather than comment volume. Issue comment counts are reliable. All links point to `github.com/openclaw/openclaw`.*

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Date: 2026-10-23** | Scope: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source landscape on 2026-10-23 is **simultaneously maturing and straining under security and lifecycle debt**. All five tracked projects are in post-security-incident hardening mode: OpenClaw, QwenPaw, and ZeroClaw all shipped or staged patches responding to the October 2026 Node.js TLS compromise and the related **emSign CA distrust**, revealing that a shared upstream trust-store event rippled through the entire ecosystem within days. Activity is bimodal — OpenClaw, Hermes, QwenPaw, and ZeroClaw run at very high velocity (40–100 issue/PR updates per day), while IronClaw is in a low-velocity maintenance trough dominated by Dependabot. The distinguishing current battleground is no longer "can the agent call tools" but **gateway lifecycle reliability, approval safety, memory governance, and identity/permission scoping** — the plumbing that determines whether these agents are trustworthy enough for daily self-hosted use.

---

## 2. Activity Comparison

| Project | Issues Updated (24h) | PRs Updated (24h) | Issues Closed | PRs Merged/Closed | Release Status | Health Score |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 211 | 232 | v2026.10.6 (security/Node bump) | **8.0 / 10** — high throughput, but heavy P0/P1 regression load |
| **Hermes Agent** | 50 | 50 | 1 | 2 | None | **5.5 / 10** — active community, severe merge imbalance (~25:1) |
| **IronClaw** | ~1 | 6 | 1 | 1 | None | **6.5 / 10** — stable/low-velocity, mostly bot PRs, no critical bugs |
| **QwenPaw** | 22 | 50 | — | 2 | v2.2.2.post1 (security patch) | **6.5 / 10** — high energy, ~10 unfixed bugs, 48:2 PR backlog ratio |
| **ZeroClaw** | 42 | 50 | 12 | 8 | None (v0.8.7/v0.9.0 in flight) | **7.5 / 10** — disciplined release-gate work, parallel report-to-fix pipeline |

*Health score is a qualitative composite of throughput, merge balance, severity of open bugs, and release cadence observed in this window.*

---

## 3. OpenClaw's Position

**Advantages vs peers:**
- **Scale of community is an order of magnitude larger.** 500 issues and 500 PRs updated in 24h — roughly 10× the activity of Hermes, QwenPaw, or ZeroClaw, and ~100× IronClaw. OpenClaw is the de facto reference implementation of the ecosystem.
- **Only project with a same-day security release tied to the Node runtime floor** (v2026.10.6, requiring Node 24.22.1+/26.12.1+). Peers patched their own dependency trees; OpenClaw patched the runtime prerequisite itself — a stronger upstream posture.
- **Backlog hygiene is real.** 211 issues and 232 PRs closed/merged in one day, including long-standing feature decisions (#11829 secrets roadmap, #53763 headless browser, #15032 subagent tool restriction) — evidence of an engaged, decisive maintainer corps.

**Technical approach differences:**
- OpenClaw is a **monolithic gateway with a plugin-capture architecture**, which is precisely where its P0 regressions live (#160959 gateway blocked for minutes on large plugins, #160485 CPU-bound module compilation). Hermes and ZeroClaw are architecturally lighter — Hermes emphasizes memory pipelines, ZeroClaw an append-only session model — which avoids OpenClaw's plugin-capture stall class entirely.
- OpenClaw's Control UI (Solid-based) is more productized than peers, with active virtualization work (#181190) for 1,000-model catalogs.

**Community size comparison:** OpenClaw's issue tracker is effectively an industry signal feed — its hottest thread (#160959) has 42 comments vs the top thread on other projects at 7–35. Cost governance (#42475, 27 comments) and security-vs-autonomy (#151112) emerge from OpenClaw first and will likely propagate to peers.

**Caution:** OpenClaw's regression density is the highest of the set (multiple P0/P1 gateway-lifecycle, sleep/wake, and SQLite bugs around 2026.9.5–2026.9.8). Its health score is buoyed by throughput, not by stability.

---

## 4. Shared Technical Focus Areas

Four cross-cutting requirements are surfacing across **multiple projects independently** — the strongest signal that they are ecosystem-level, not project-specific:

**1. Approval / permission safety (agents taking destructive actions)**
- **Hermes #141346** — smart approval auto-approved `osascript` that destroyed an unsaved PowerPoint deck (35 comments, top thread).
- **Hermes #142834** — no approval gate on general `write_file`; only terminal/execute_code gated.
- **OpenClaw #151112** — security/approval loops turning owners into "manual execution agents".
- **ZeroClaw #11989** — per-channel `excluded_tools` config silently never applied (a documented security control that is inert).
- *Need:* approval heuristics that distinguish reversible from irreversible operations, and enforced (not advisory) tool-scoping.

**2. Cost governance / spend caps**
- **OpenClaw #42475** — per-agent cost budgets at the gateway (27 comments, 7+ months old).
- **Hermes PR #143376** — `usage_limits.session_cost_usd` with resume-on-continue.
- *Need:* hard spend ceilings enforced before model dispatch, native to the agent rather than bolt-on monitoring.

**3. Secrets / credential hygiene & CA trust**
- **OpenClaw** — #11829 API-key protection roadmap (closed), #166137 egress proxy credential substitution failures.
- **QwenPaw v2.2.2.post1** — emSign CA trust remediation across dependencies, installers, and builds.
- **ZeroClaw #11932** — container CA bundles still trust distrusted emSign chains; fix PR #11925.
- *Need:* enforcement that API keys cannot leak into prompts/tool calls, plus trustworthy TLS trust-store management — the emSign event hit every project on the same day.

**4. Gateway lifecycle reliability (sleep/wake, event-loop stalls)**
- **OpenClaw** — #160959 (plugin capture blocks gateway), #158592 (post-sleep recovery never recovers), #140010 (Windows sleep/resume WebSocket failures).
- **QwenPaw #8350** — Feishu synchronous network calls hang the entire event loop (`/api/healthz` times out, SIGTERM cannot exit).
- **ZeroClaw #11608** — Telegram listener wedges forever on blackholed request; #11951 WebSocket upgrades fail over built-in TLS.
- **Hermes #140189** — gateway retries undeliverable notification every 5s forever, no backoff.
- *Need:* event-loop isolation from plugins/channels, bounded HTTP timeouts, and a proper sleep/wake recovery path.

A fifth, more strategic thread — **memory governance** (write-time budgets, consent, and acceptance pipelines) — is prominent in Hermes (#135039, #116788) and hinted at in OpenClaw (#87660 MEMORY.md lifecycle curation), but not yet universal.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Primary focus** | Gateway + plugin ecosystem | Memory pipeline + hybrid deployment | Benchmark-driven model eval | Multi-channel Hub deployment | Identity/access + session model |
| **Target users** | Self-hosted power users, operators | Researchers, memory-sensitive users | ML/eval engineers | Teams, multi-user Hub operators | Security-conscious fleet operators |
| **Architecture style** | Monolithic gateway w/ plugin capture | Agent w/ memory subsystem | Framework + eval harness | Multi-channel adapter layer | Append-only session + principal scope |
| **Channel breadth** | Wide (Slack/Teams/Telegram/Feishu/Discord/Matrix) | Slack, messaging surfaces | Minimal (WebUI) | **Very wide** (Feishu/WeChat/QQ/DingTalk/Telegram) | Email, Telegram, XMPP (in flight) |
| **Distinctive strength** | Scale, Control UI, product maturity | Memory doc chains, spend caps | Benchmark taxonomy rigor | Hub/multi-user, roadmap transparency | Security-first principal-scope design |
| **Distinctive weakness** | Regression density in lifecycle layer | Merge imbalance, updater fragility | Community engagement near-zero | Channel adapter reliability, upgrade regressions | Silent config failures; slow v0.9.0 critical path |

**Notable divergence:** QwenPaw is the only project with a **strong multi-user Hub** posture and the broadest Chinese-ecosystem channel coverage (Feishu/WeChat/QQ/DingTalk) — a distinct market position. ZeroClaw is the only project with a **deliberate identity-access release gate** (the stacked #11225→#11230→#11220→#11234 PR chain), positioning security as its headline v0.9.0 feature. Hermes differentiates on **memory as a first-class governed subsystem** — no peer has an equivalent memory acceptance pipeline in PR form.

---

## 6. Community Momentum & Maturity

**Tier 1 — High velocity, iterating fast:**
- **OpenClaw** — 1,000 combined updates/day. Rapidly iterating *and* rapidly regressing. Mature codebase, immature stability in the 2026.9.x line.
- **ZeroClaw** — 92 combined updates/day, with disciplined parallel report-to-fix PR pairs (#11932/#11925, #11608/#11651). Pre-release crunch for v0.9.0. Best process maturity of the set.

**Tier 2 — High energy, backlog-heavy:**
- **QwenPaw** — 72 combined updates/day, but 48:2 open-to-merged PR ratio and ~10 unfixed bugs. High community engagement, maintainer review throughput is the bottleneck. Just shipped a security patch.
- **Hermes Agent** — 100 combined updates/day but 1 issue closed and 2 PRs merged. A 25:1 open-to-close ratio is the most alarming imbalance in the set — the community is generating signal faster than maintainers absorb it.

**Tier 3 — Stabilizing / low velocity:**
- **IronClaw** — 7 combined updates/day, all dependency bumps and one automated benchmark report. Zero comments/reactions across all items suggests either a quiet internal cadence or minimal external community. Stable but nearly dormant.

**Maturity read:** OpenClaw and ZeroClaw demonstrate the healthiest *process* (backlog hygiene, staged landing, release discipline). QwenPaw and Hermes have the healthiest *community energy* but the weakest *absorption capacity*. IronClaw has neither currently in evidence.

---

## 7. Trend Signals

Extracted from community feedback across all five projects — actionable for AI agent developers:

1. **Trust is the new feature differentiator.** Every top-engagement thread this cycle is about an agent doing something the user did not sanction: destroying data (#141346), persisting facts the user asked not to save (#116788), ignoring a documented `excluded_tools` control (#11989). **Developers should treat approval semantics and enforced scoping as core product surface, not configuration.**

2. **"Silent config failure" is a systemic defect class.** ZeroClaw #11989 (`excluded_tools` inert) and #11991 (raw HTML outbound) and QwenPaw #8374 (`QWENPAW_CORS_ORIGINS` frozen at import) share a root cause: settings that are documented, accepted, and never applied. **Config plumbing needs its own regression coverage** — this is cheap to test and expensive to miss.

3. **Upgrade fragility is a trust tax.** Hermes has 5+ concurrent updater bugs (#139091, #143361, #143331, #131149, #142988); QwenPaw has 3 post-upgrade breakage reports in a single day (#8388, #8378, #8392); OpenClaw v2026.10.6 imposes a hard Node runtime floor. **Migration testing between patch versions is an industry-wide gap.**

4. **Cost governance is the most-requested unmet feature that nobody has shipped.** OpenClaw #42475 has been open 7+ months with 27 comments; Hermes has a PR but not a merge. Operators are afraid of runaway spend and want hard pre-dispatch ceilings. **This is a wide-open product opportunity.**

5. **Event-loop isolation from plugins/channels is a recurring P0.** OpenClaw (#160959, #160485), QwenPaw (#8350), and ZeroClaw (#11608) all hit the same failure mode: a slow plugin or channel stalls the entire gateway. **Architectural lesson: plugins and channel adapters must not share the gateway event loop.**

6. **The security incident of October 2026 unified the ecosystem's threat model.** OpenClaw, QwenPaw, and ZeroClaw all patched the same upstream events (Node TLS compromise, emSign CA distrust) within days. **Supply-chain trust-store management is now a first-class agent-framework concern** — and the projects that patch it once, coherently, will win operator confidence.

7. **Memory is becoming a governed subsystem, not a scratchpad.** Hermes' acceptance pipeline, write-time budgets, and consent failures (#135039, #116788, #116564) signal that memory — because it injects into every turn — needs the same rigor as secrets management: budgets, provenance, and revocation.

---

**Bottom line for decision-makers:** OpenClaw is the ecosystem's gravitational center and will set the agenda on cost governance and plugin isolation; ZeroClaw is the best example of disciplined security-first release engineering; QwenPaw owns multi-user Hub deployments but must fix channel/upgrade reliability; Hermes has the most ambitious memory architecture but the weakest merge throughput; IronClaw is worth watching only for its evaluation methodology. The universal, unsolved problem across all five is **making autonomous agents trustworthy enough that users stop supervising them** — and no project has shipped that yet.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest
**Date: 2026-10-23** | Repository: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. Today's Overview

Hermes Agent shows very high community activity on 2026-10-23, with 50 issues and 50 PRs updated in the last 24 hours — but only 1 issue closed and 2 PRs merged/closed. This yields an **open-to-close ratio of roughly 25:1**, indicating a substantial maintenance backlog and a community generating far more reports and proposals than the project is currently absorbing. No new releases were published today. The issue mix skews heavily toward bugs (particularly in the CLI updater, gateway/multiplexing, memory subsystem, and Desktop client) plus a notable cluster of security/approval-gating concerns. The most-commented thread is a data-loss incident caused by smart approval auto-executing an `osascript` command against a user's PowerPoint deck, which is likely to drive near-term changes to approval heuristics and terminal tool safety.

---

## 2. Releases

**None.** No new releases were published in the last 24 hours, and no release-adjacent changelog activity is visible.

---

## 3. Project Progress

Only **2 PRs** were merged or closed today (not detailed in the top-20 by comment count), so visible merged progress is minimal. However, several substantial PRs are advancing through review and represent likely near-term landings:

- **Memory write pipeline** — [PR #139606](https://github.com/NousResearch/hermes-agent/pull/139606) implements the seven-stage acceptance pipeline and write-time budget for `MEMORY.md` / `USER.md` proposed in [Issue #135039](https://github.com/NousResearch/hermes-agent/issues/135039).
- **Memory read restoration** — [PR #141876](https://github.com/NousResearch/hermes-agent/pull/141876) reverts a 14-line removal of the memory `read` action (commit `56ee8a5cc6`), arguing that subsequent 5,000+ lines of churn failed to fix the underlying issue.
- **Memory doc chains** — [PR #116673](https://github.com/NousResearch/hermes-agent/pull/116673) enables `MEMORY.md` to anchor a chain of memory documents ([Issue #116564](https://github.com/NousResearch/hermes-agent/issues/116564)).
- **Turn-limit fix** — [PR #140980](https://github.com/NousResearch/hermes-agent/pull/140980) makes `hermes -z` honor `agent.max_turns` / `HERMES_MAX_ITERATIONS` (mirrors [Issue #140935](https://github.com/NousResearch/hermes-agent/issues/140935)).
- **Kanban deep links** — [PR #143385](https://github.com/NousResearch/hermes-agent/pull/143385) lands both receiver and emitter for canonical card URLs.
- **Gateway vault prompts** — [PR #142924](https://github.com/NousResearch/hermes-agent/pull/142924) lets `browser_vault` request sign-in codes and logins in Desktop chats, and [PR #130387](https://github.com/NousResearch/hermes-agent/pull/130387) extends vault prompts to messaging surfaces.
- **Session spend caps** — [PR #143376](https://github.com/NousResearch/hermes-agent/pull/143376) introduces `usage_limits.session_cost_usd` with resume-on-"continue" behavior.
- **Slack rich-text mentions** — [PR #133323](https://github.com/NousResearch/hermes-agent/pull/133323) fixes literal `<#channel>` tokens rendering in `rich_blocks` mode.
- **Dependency hygiene** — [PR #143377](https://github.com/NousResearch/hermes-agent/pull/143377) pins npm patches clearing `hermes doctor` high advisories.
- **Local model resume** — [PR #140109](https://github.com/NousResearch/hermes-agent/pull/140109) allows resuming interrupted large-model downloads.

---

## 4. Community Hot Topics

| Rank | Item | Comments | Signal |
|---|---|---|---|
| 1 | [Issue #141346](https://github.com/NousResearch/hermes-agent/issues/141346) — Smart approval auto-approved `osascript` that closed unsaved PowerPoint deck, unrecoverable data loss | 35 | 🔥 Highest-engagement item; safety of approval heuristics |
| 2 | [Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) — Remote Hermes agent with local tool execution | 29 | 42 👍 — top-voted open request; hybrid local/remote deployment |
| 3 | [Issue #135039](https://github.com/NousResearch/hermes-agent/issues/135039) — Budget + acceptance pipeline for `MEMORY.md` / `USER.md` | 15 | Memory hygiene; adjacent PR #139606 open |
| 4 | [Issue #139091](https://github.com/NousResearch/hermes-agent/issues/139091) — `hermes update` merge-base probe times out on partial clones | 8 | Stable-channel installer breakage |
| 5 | [Issue #143364](https://github.com/NousResearch/hermes-agent/issues/143364) — Multiplexed secondary profile progress delivered via primary bot | 7 | Profile/message isolation in multiplexed gateways |
| 6 | [Issue #116788](https://github.com/NousResearch/hermes-agent/issues/116788) — Background memory reviewer persists facts user asked not to save | 6 | Privacy/consent violation in memory pipeline |
| 7 | [Issue #143326](https://github.com/NousResearch/hermes-agent/issues/143326) — Post-update Windows permissions mismatch + model selection delay | 6 | Windows desktop/gateway update path |
| 8 | [Issue #142925](https://github.com/NousResearch/hermes-agent/issues/142925) — Desktop Context-usage popover empty for non-resident sessions | 6 | Session-state visibility in Desktop |

**Underlying needs analysis:** The top threads cluster around three themes — (a) **approval safety** (an agent action caused irreversible user data loss despite smart approval), (b) **memory governance** (budget, acceptance, and consent in a subsystem that injects into every turn), and (c) **deployment flexibility** (remote agent + local tool execution, strongly upvoted). The multiplexing/profile-isolation cluster (#143364) suggests the multi-bot gateway architecture is arriving in production use faster than its profile scoping has matured.

---

## 5. Bugs & Stability

Ranked by severity (P-level tags and impact):

**P2 / High:**
- [Issue #141346](https://github.com/NousResearch/hermes-agent/issues/141346) — **Security/data loss.** Smart approval auto-approved `osascript`; agent closed unsaved PowerPoint deck and deleted its export. Unrecoverable user data. No fix PR yet.
- [Issue #143326](https://github.com/NousResearch/hermes-agent/issues/143326) — Windows update left gateway running at admin level while app is not; permissions mismatch and model-selection delay. No fix PR.
- [Issue #143313](https://github.com/NousResearch/hermes-agent/issues/143313) — `pip install -e .` unsatisfiable on Python 3.14: `Pillow==13.0.0` contradicts `browser-harness`'s `pillow==12.3.0`. Clean-checkout install blocker. No fix PR.
- [Issue #143331](https://github.com/NousResearch/hermes-agent/issues/143331) — Windows: stale `gateway.pid` beside a held lock aborts `hermes update` every run. No fix PR.
- [Issue #143361](https://github.com/NousResearch/hermes-agent/issues/143361) — `hermes update` leaves release tags stale; `hermes --version` misreports a checkout already on the release commit. No fix PR.
- [Issue #136713](https://github.com/NousResearch/hermes-agent/issues/136713) — Dashboard Chat re-attach hard-interrupts in-flight turn; sessions close with `end_reason=tui_shutdown`. Work destroyed on page reload/second tab. No fix PR.
- [Issue #142925](https://github.com/NousResearch/hermes-agent/issues/142925) — Desktop Context-usage popover permanently empty for any session without a resident agent. No fix PR.
- [Issue #142988](https://github.com/NousResearch/hermes-agent/issues/142988) — Every `hermes update` wipes hand-installed `hindsight-all` memory-provider runtime; memory provider breaks after each toolchain refresh. No fix PR.
- [Issue #142834](https://github.com/NousResearch/hermes-agent/issues/142834) — Security gap: no approval gate on general `write_file` actions (only terminal/execute_code/protected files are gated). No fix PR.
- [Issue #140189](https://github.com/NousResearch/hermes-agent/issues/140189) — Gateway retries an undeliverable process-completion notification every 5s forever, no backoff/cap/log. No fix PR.
- [Issue #136315](https://github.com/NousResearch/hermes-agent/issues/136315) — Acknowledged async delegation completion lost at recursion-cap FIFO overwrite; work silently stranded. No fix PR.
- [Issue #139796](https://github.com/NousResearch/hermes-agent/issues/139796) — Desktop `session.resume` returns `not_found` for cold/evicted sessions; no cold-load path. No fix PR.
- [Issue #131149](https://github.com/NousResearch/hermes-agent/issues/131149) — Windows: `--no-gateway-restart` still stops the fleet; gateway-parented update killed mid-flight with SIGTERM (~20 min downtime). No fix PR.
- [Issue #138133](https://github.com/NousResearch/hermes-agent/issues/138133) — Telegram DM approval card unseen; terminal commands block full 300s then time out. Needs repro.
- [Issue #77775](https://github.com/NousResearch/hermes-agent/issues/77775) — SQLite preflight misclassifies vanished WAL/SHM sidecars as read-only (race condition). No fix PR.

**P3 / Lower:**
- [Issue #142820](https://github.com/NousResearch/hermes-agent/issues/142820) — `hermes cron run` ignores the global emergency stop (`hermes pause`). No fix PR.

**Notable fix PRs in flight:** [PR #140980](https://github.com/NousResearch/hermes-agent/pull/140980) closes the turn-limit class from [Issue #140935](https://github.com/NousResearch/hermes-agent/issues/140935); [PR #141876](https://github.com/NousResearch/hermes-agent/pull/141876) restores the memory read action; [PR #133323](https://github.com/NousResearch/hermes-agent/pull/133323) fixes Slack mention rendering. The biggest stability gaps (approval safety, updater on Windows, memory-provider persistence) currently have **no linked fix PRs**.

---

## 6. Feature Requests & Roadmap Signals

Requests are ranked by community traction and proximity to existing PRs:

1. **[Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) — Remote agent + local tool execution** (42 👍, 29 comments). The single strongest roadmap signal; no linked PR yet, but tagged `needs-decision`.
2. **[Issue #135039](https://github.com/NousResearch/hermes-agent/issues/135039) / [PR #139606](https://github.com/NousResearch/hermes-agent/pull/139606) — Memory write-time budget + acceptance pipeline.** Almost certain near-term landing; multiple design contributors named in the PR thread.
3. **[Issue #116564](https://github.com/NousResearch/hermes-agent/issues/116564) / [PR #116673](https://github.com/NousResearch/hermes-agent/pull/116673) — `MEMORY.md` as anchor for a memory doc chain.** PR is open and end-to-end usable.
4. **[Issue #142834](https://github.com/NousResearch/hermes-agent/issues/142834) — Approval gate for general `write_file`.** Likely coupled with the #141346 fallout.
5. **[Issue #138458](https://github.com/NousResearch/hermes-agent/issues/138458) — Kanban dispatcher: make assignee profile authoritative (opt-in `worker_policy`).** Aligns with the kanban deep-links PR.
6. **[Issue #115639](https://github.com/NousResearch/hermes-agent/issues/115639) — RFC: autonomous self-healing updates for 24/7 agent fleets.** Strategic-level request; fits the updater pain cluster.
7. **[PR #143376](https://github.com/NousResearch/hermes-agent/pull/143376) — Session spend caps with resume.** Already in PR form; likely to land soon.

**Prediction:** The most probable near-term roadmap items are memory governance (budget/acceptance/read restoration/doc chains), approval-gate expansion, and the spend-cap + local-model-resume UX improvements. The remote-agent/local-tool request is high-traction but architecturally heavy and marked `needs-decision`.

---

## 7. User Feedback Summary

**Pain points (dissatisfaction):**
- **Trust and safety:** The top-voted thread describes catastrophic data loss from an auto-approved command ([#141346](https://github.com/NousResearch/hermes-agent/issues/141346)). A separate user reports the background memory reviewer persisting a fact they explicitly asked not to save ([#116788](https://github.com/NousResearch/hermes-agent/issues/116788)). Trust in approval and memory is the dominant sentiment theme today.
- **Updater fragility:** The `hermes update` path is implicated in at least five separate open bugs today alone ([#139091](https://github.com/NousResearch/hermes-agent/issues/139091), [#143361](https://github.com/NousResearch/hermes-agent/issues/143361), [#143331](https://github.com/NousResearch/hermes-agent/issues/143331), [#131149](https://github.com/NousResearch/hermes-agent/issues/131149), [#142988](https://github.com/NousResearch/hermes-agent/issues/142988)), spanning Linux partial clones, Windows locks, tag staleness, and wiping hand-installed runtimes.
- **Desktop/gateway state loss:** In-flight turns destroyed on client re-attach ([#136713](https://github.com/NousResearch/hermes-agent/issues/136713)) and cold-session resume failures ([#139796](https://github.com/NousResearch/hermes-agent/issues/139796)) frustrate desktop users.
- **Multiplexing isolation bugs:** Secondary-profile traffic leaking to the primary bot ([#143364](https://github.com/NousResearch/hermes-agent/issues/143364)) undermines multi-profile deployments.

**Satisfaction / constructive signals:**
- Users are investing significant effort in high-quality reports: detailed environments, logs, root-cause analysis, and reproductions (e.g., the Windows updater reports, the delegation recursion-cap analysis in [#136315](https://github.com/NousResearch/hermes-agent/issues/136315)).
- Strong positive reception of the memory-chain and remote-agent proposals (42 👍 on #18715) suggests users see the core agent as worth extending rather than abandoning.
- Community members are actively submitting competing/consolidating PRs ([#141876](https://github.com/NousResearch/hermes-agent/pull/141876) "14 lines vs 5,000 lines of churn"), indicating engaged, technically deep contributors.

---

## 8. Backlog Watch

Long-unanswered or stale items deserving maintainer attention:

- **[Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715)** — Opened 2026-05-02 (≈174 days open), 42 👍, still `needs-decision`. Top-voted request with no decision recorded.
- **[Issue #77775](https://github.com/NousResearch/hermes-agent/issues/77775)** — SQLite WAL/SHM preflight race, opened 2026-08-03 (≈81 days), 4 comments, no fix PR.
- **[PR #43178](https://github.com/NousResearch/hermes-agent/pull/43178)** — Opened 2026-06-10 (≈135 days), warns when provider config shadows built-in providers; still open.
- **[Issue #116564](https://github.com/NousResearch/hermes-agent/issues/116564)** — Memory doc chain, opened 2026-09-20 (≈33 days); PR #116673 open but not yet merged.
- **[Issue #115639](https://github.com/NousResearch/hermes-agent/issues/115639)** — Self-healing updates RFC, opened 2026-09-19 (≈34 days), 4 comments, `needs-decision`.
- **[Issue #131149](https://github.com/NousResearch/hermes-agent/issues/131149)** — Windows `--no-gateway-restart` fleet disruption, opened 2026-10-02 (≈21 days), no fix PR, marked `risk-message-delivery` + `risk-platform-windows`.
- **[PR #110714](https://github.com/NousResearch/hermes-agent/pull/110714)** — `tools.tool_search.eager` (opened 2026-09-14, ≈39 days) and **[PR #122497](https://github.com/NousResearch/hermes-agent/pull/122497)** / **[PR #122493](https://github.com/NousResearch/hermes-agent/pull/122493)** (MrScraper skill + docs, opened 2026-09-25, ≈28 days) — all still open and awaiting review.
- **[Issue #136094](https://github.com/NousResearch/hermes-agent/issues/136094)** — Per-task `HERMES_HOME` republishing launcher (opened 2026-10-10, ≈13 days), `risk-compatibility`, no fix PR.

---

**Health assessment:** The project exhibits a **healthy, fast-moving, technically sophisticated community** but a **widening open/close imbalance** and clusters of unresolved bugs in mature surfaces (updater, Desktop state, gateway policy). The absence of new releases today combined with 48 open PRs and 49 active issues suggests maintainers are in a review-heavy phase. The #141346 data-loss incident is the highest-priority item — it

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-10-23

## 1. Today's Overview

IronClaw shows **low-to-moderate maintenance activity** today, dominated by automated dependency bumps rather than core feature development. Of 6 updated PRs, 5 remain open and all are Dependabot-maintained dependency upgrades (Storybook, Vite, DOMPurify, certifi), with only one prior DOMPurify bump (#8149) closed. Issue activity is minimal: one automated daily benchmark failure-taxonomy report (#8153) and the closure of a long-standing ARM64 Docker support request (#3168). **No new releases** were published. Overall project health appears stable but the day's activity is largely routine housekeeping, with no substantive feature or bug-fix PRs merged.

## 2. Releases

No new releases in the last 24 hours. The most recent release data is unavailable.

## 3. Project Progress

**Merged/Closed items today:**

- **[PR #8149](https://github.com/nearai/ironclaw/pull/8149)** — `chore(deps): bump dompurify from 3.4.12 to 3.4.16` (closed). This superseded PR was replaced by #8155, which bumps DOMPurify further to 3.4.17. Net effect: the frontend WebUI's HTML-sanitization library was advanced two patch versions. This is a security-relevant dependency (DOMPurify mitigates XSS), though no CVE is cited in the summary.

- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — Closed after ~6 months open (created 2026-05-01). Requested ARM64/aarch64 Docker image support, noting Cranelift already supports aarch64 and only armv7 (32-bit) is a confirmed limitation (tracked separately in #1339). Closure suggests resolution or consolidation, but no linked PR is visible in the data — maintainers should confirm the outcome is documented.

**Assessment:** No feature advancement today. Dependency hygiene progressed marginally.

## 4. Community Hot Topics

Activity is uniformly low — **no issue or PR has any comments or reactions** (all show 0 👍 and 0/undefined comments). The most notable items by recency and relevance:

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** — *Daily ironclaw failure taxonomy — 2026-10-22*. An automated (or semi-automated) benchmark analysis reporting 64 non-pass tasks on the `officeqa` suite, attributing them "overwhelmingly" to genuine model-quality errors in **DeepSeek-V4-Flash** navigation. This reflects an ongoing evaluation infrastructure (linked to nearai.github.io/benchmarks) rather than community discussion.

- **[PR #8154](https://github.com/nearai/ironclaw/pull/8154)** — Vite bump to 8.1.6, the only non-bot-fresh dependency PR from 2026-10-22.

**Underlying need:** The lack of comments across the board indicates either a small contributor base, low community engagement, or issues being filed/closed by maintainers without discussion. The failure-taxonomy thread hints at an internal evaluation-driven quality process rather than external user dialogue.

## 5. Bugs & Stability

**No new bug, crash, or regression reports were filed today.** The only stability-adjacent signal is:

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** (informational, not a project bug) — 64 non-pass benchmark tasks, classified as *model-quality* errors (not IronClaw infrastructure failures). Severity for the project itself: **low**, since it points to the evaluated model (DeepSeek-V4-Flash) rather than the agent framework.

Dependency bumps implicitly address stability/security:
- **[PR #8155](https://github.com/nearai/ironclaw/pull/8155)** — DOMPurify 3.4.17 (patch-level XSS-sanitizer fixes; parent #8149 superseded).
- **[PR #8157](https://github.com/nearai/ironclaw/pull/8157)** — certifi 2026.10.19, which per the summary *restores unaffected emSign roots* — a TLS trust-store correction worth fast-tracking.

No fix PRs for user-reported crashes exist because none were reported.

## 6. Feature Requests & Roadmap Signals

- **ARM64/aarch64 Docker support** ([Issue #3168](https://github.com/nearai/ironclaw/issues/3168)) — the major standing feature request, now **closed** after being open since May 2026. Its closure is the strongest roadmap signal of the day: expect official multi-arch (`linux/amd64` + `linux/arm64`) images to appear in upcoming release notes. armv7/32-bit remains explicitly out of scope (#1339).
- **Benchmark-driven model selection** — Issue #8153's taxonomy process suggests continued investment in evaluation tooling and possibly swapping/guiding model choices (DeepSeek-V4-Flash was evaluated here). No user-facing feature request accompanies it.

No other feature requests were raised today.

## 7. User Feedback Summary

Direct user feedback today is **effectively absent** (zero comments on all issues/PRs). Inferred pain points from the data:

- **Platform compatibility pain**: Issue #3168 documents real deployment friction for ARM64 users (Apple Silicon, Graviton, ARM servers) unable to run official images. Its closure is a satisfaction signal if resolved.
- **Quality transparency**: The automated failure taxonomy (#8153) reflects maintainers' own dissatisfaction with agent task success rates on `officeqa`, though framed as model- rather than framework-level.

No positive/negative sentiment, kudos, or complaints were registered by users in this window.

## 8. Backlog Watch

- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — Now closed, but **verify a resolution comment or linked PR exists**; an unexplained closure of a 6-month-old platform-support request could frustrate ARM users.
- **[Issue #1339](https://github.com/nearai/ironclaw/issues/1339)** — Referenced as the tracking issue for armv7 (32-bit) limitations; not updated today but worth monitoring if ARM support is being revisited.
- **Five open dependency PRs** ([#8154](https://github.com/nearai/ironclaw/pull/8154), [#8155](https://github.com/nearai/ironclaw/pull/8155), [#8156](https://github.com/nearai/ironclaw/pull/8156), [#8157](https://github.com/nearai/ironclaw/pull/8157), [#8158](https://github.com/nearai/ironclaw/pull/8158)) are all awaiting maintainer review/merge. Given #8157's TLS trust-store fix, **maintainer attention is recommended** to avoid staleness and potential security drift.

---

**Health summary:** Stable, low-velocity day. Housekeeping and dependency maintenance dominate; no new features, releases, or critical bugs. The project's engagement metrics (zero comments/reactions) suggest either a quiet development cadence or limited external community — worth watching for a trend if it persists.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-10-23

## 1. Today's Overview

QwenPaw is operating at high velocity today, with **22 issues** and **50 PRs** updated in the last 24 hours — a strong signal of an active, engaged community and maintainer team. The project shipped patch release **v2.2.2.post1**, primarily a security-driven release addressing CA trust remediation. However, this surge in activity is heavily weighted toward bug reports and stabilization work rather than net-new features, suggesting the project is in a post-2.2.x hardening phase (with v2.3.0 refactoring in preparation per Issue #8289). Roughly 20+ distinct bugs were touched today, several of them cross-channel and cross-platform regressions, while 48 PRs remain open versus only 2 merged/closed — a slight backlog accumulation worth watching.

## 2. Releases

**v2.2.2.post1** — Published (post-release verification issue #8386 closed today).

- **Changes:**
  - Version bump to `v2.2.2.post1` ([#8369](https://github.com/agentscope-ai/QwenPaw/pull/8369))
  - `fix(security): remediate emSign CA trust across dependencies, installers, and builds` ([#8370](https://github.com/agentscope-ai/QwenPaw/pull/8370))
- **Security Notice:** A dedicated security advisory was filed today ([#8385](https://github.com/agentscope-ai/QwenPaw/issues/8385)) urging **all users to upgrade to 2.2.2.post1 or later**. This is effectively a security patch release.
- **Breaking changes / migration notes:** None explicitly documented, but the emSign CA trust remediation may affect TLS trust chains in environments relying on previously bundled CA roots. Users with custom trust stores should validate after upgrade.

## 3. Project Progress

Merged/closed activity today was minimal:
- **[#8391](https://github.com/agentscope-ai/QwenPaw/pull/8391)** (chore): Merge of `Release/v2.2.2post1` into `main` — release branch consolidation.
- **[#8386](https://github.com/agentscope-ai/QwenPaw/issues/8386)** (CLOSED): Release duty verification for v2.2.2.post1 — all platform install checkpoints passed and closed same-day.
- **[#8370](https://github.com/agentscope-ai/QwenPaw/pull/8370)** security fix landed as part of the release.

**In-flight but advancing:**
- **v2.3.0 plugin architecture refactor** is being socialized via [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289), positioning QwenPaw to be "lighter and more extensible."
- A substantial matrix of stability PRs (approvals routing, media replay, Ollama context sizing, CRLF/GBK handling) remains under review — see Section 8.

## 4. Community Hot Topics

| Item | Comments | Type | Link |
|---|---|---|---|
| #8071 Plugin-facing theme extension point | 7 | Feature | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) |
| #8289 Coming in v2.3.0: Lighter & More Extensible | 3 | Roadmap | [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) |
| #8351 Composer draft keyed per-agent, not per-conversation | 3 | Bug | [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) |

**Underlying needs:**
- **Plugin extensibility is the top community ask.** #8071 (deep theme token overrides) and #8275 (global Skill/MCP sharing across Hub users) both point to a maturing plugin ecosystem that has outgrown the current single-knob (`colorPrimary`) model. Teams want shared, centrally-managed capabilities.
- **Roadmap transparency is working.** The v2.3.0 "lighter and more extensible" post (#8289) is drawing structured feedback, showing the community is aligned with the plugin-refactor direction.
- **State-scoping bugs generate disproportionate discussion** because they are hard to reproduce and affect daily UX (draft bleed-over across conversations of the same agent).

## 5. Bugs & Stability

Ranked by severity (P0 → P3):

**P0 — Service-breaking / data-loss:**
- **[#8350](https://github.com/agentscope-ai/QwenPaw/issues/8350)** — Feishu channel executes synchronous network calls on the main event loop; when the network is down, the whole service hangs (`/api/healthz` times out, SIGTERM cannot exit). *No fix PR yet.* — Critical availability risk.
- **[#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359)** — Hub-in-container: Docker runtime fails to start because readiness probe hardcodes `127.0.0.1` (Errno 111). Breaks the maintainer-recommended deployment path. *No fix PR yet.*

**P1 — Functional regressions:**
- **[#8388](https://github.com/agentscope-ai/QwenPaw/issues/8388)** — After upgrade, QQ channel fails: `No module named '_qwenpaw_remote_backend'`. Indicates a broken runtime post-upgrade path. *No fix PR yet.*
- **[#8378](https://github.com/agentscope-ai/QwenPaw/issues/8378)** — Model invocation broken after upgrade; `agent.json` still carries `active_model` while new code paths diverge. *No fix PR yet.*
- **[#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343)** — DingTalk final reply silently dropped when `sessionWebhook` expires (`errcode=300001`), no Open API fallback. *No fix PR yet.*
- **[#8335](https://github.com/agentscope-ai/QwenPaw/issues/8335)** — WeChat session permanently wedged by 48 MB request bodies (media replay). **Fix PR open: [#8337](https://github.com/agentscope-ai/QwenPaw/pull/8337)** and [#8299](https://github.com/agentscope-ai/QwenPaw/pull/8299).
- **[#8342](https://github.com/agentscope-ai/QwenPaw/issues/8342)** — Quoted replies lose channel control-command routing in **seven channels** (`/stop` misfires). Broader than a single adapter.
- **[#8329](https://github.com/agentscope-ai/QwenPaw/issues/8329)** — Telegram channel ignores `reply_to_message`; quoted context never reaches the agent (inconsistent with other channels).

**P2 — UX / correctness:**
- **[#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351)** — Composer draft keyed per-agent, not per-conversation → unsent text bleeds across chats of the same agent.
- **[#8368](https://github.com/agentscope-ai/QwenPaw/issues/8368)** — Deleting the currently-selected conversation returns 404. **Fix PR open: [#8375](https://github.com/agentscope-ai/QwenPaw/pull/8375)**
- **[#8374](https://github.com/agentscope-ai/QwenPaw/issues/8374)** — `QWENPAW_CORS_ORIGINS` set via Web UI/CLI has no effect (constant frozen at import time, env injection happens after import).
- **[#8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)** — Sidebar group header overlaps first conversation in source-group mode.
- **[#8078](https://github.com/agentscope-ai/QwenPaw/issues/8078)** — Cross-session messages registered as independent chats → same session split across UI pages.
- **[#8392](https://github.com/agentscope-ai/QwenPaw/issues/8392)** — Hub mode: local model configured for members displays incorrectly.

**P3 — Dev / build hygiene:**
- **[#8377](https://github.com/agentscope-ai/QwenPaw/issues/8377)** — Bare `pytest` aborts during collection (`import file mismatch: test_backup`) on a clean checkout; blocks the CONTRIBUTING.md local gate. *One-file fix claimed.*

**Stability assessment:** Roughly **10 open bugs with no fix PR**, concentrated in channel adapters (Feishu, DingTalk, Telegram, QQ) and upgrade paths. This suggests the channel abstraction layer is under-tested relative to the core, and upgrade regression testing is a gap.

## 6. Feature Requests & Roadmap Signals

**Likely for v2.3.0 (based on committed direction):**
- **Plugin/theme extensibility deep-dive** — semantic token override layer for plugins ([#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)); aligns directly with the announced plugin refactor in [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289).
- **Global Skill/MCP sharing in Hub** ([#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275)) — high team value, low friction to align with modular rework.

**Backlog candidates (needs triage):**
- **Desktop auto-scroll toggle** ([#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339)) — open since Aug 27 with no PR; a simple UX win that keeps slipping.
- **Hub AI gateway timeout configurable** ([#8372](https://github.com/agentscope-ai/QwenPaw/issues/8372)) — file-processing tasks routinely exceed the 120s default.

**Signal:** The community's center of gravity is shifting from "single-user local agent" toward **multi-user Hub deployments** and **team-shared configuration** — likely the theme of v2.3.0+.

## 7. User Feedback Summary

- **Pain points are operational and reproducible:** Users are reporting concrete, evidence-rich bugs (many with version numbers, commit hashes, and code references), indicating a sophisticated, technically literate audience. Several reports explicitly note reproducing on `main`.
- **Upgrade fragility is the loudest dissatisfaction:** Three separate post-upgrade breakage reports (#8388 QQ, #8378 model calls, plus #8392 Hub model display) point to insufficient migration testing between patch versions.
- **Channel reliability is inconsistent:** Feishu (event-loop hang), DingTalk (dropped replies), Telegram (ignored quotes), and WeChat (session wedge) all show gaps versus a solid console experience — users are clearly running QwenPaw across many messaging platforms.
- **Positives:** The transparent v2.3.0 roadmap post and same-day release verification closing show responsiveness; the 👍 on #8289 signals approval of the lighter-plugin direction.
- **Dev-experience friction:** #8377 (pytest collection failure blocking contributors) is a low-severity but high-annoyance friction point for new contributors.

## 8. Backlog Watch

Items needing maintainer attention (long-lived, unresolved, or high-impact-without-fix):

| Item | Age | Why it matters |
|---|---|---|
| [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) Desktop scroll-lock setting | ~2 months | Simple, repeatedly requested; still no PR. |
| [#8078](https://github.com/agentscope-ai/QwenPaw/issues/8078) Cross-session chat fragmentation | 3 weeks | Core session-model correctness issue. |
| [#7350](https://github.com/agentscope-ai/QwenPaw/issues/7350)-class channel bugs (see #8342, #8343, #8344) | 3–4 days | Cluster of adapter-layer regressions needing a coordinated fix. |
| [#8303](https://github.com/agentscope-ai/QwenPaw/pull/8303) Approval prompts not delivered to originating channel | open since Oct 18 | Cross-channel correctness; affects trust in long-running tasks. |
| [#8268](https://github.com/agentscope-ai/QwenPaw/pull/8268) TaskTracker run cleanup | open since Oct 16 | Leaked runs stay `running` forever — resource/state leak. |
| [#8231](https://github.com/agentscope-ai/QwenPaw/pull/8231) Market install provenance (fixes #8176) | open since Oct 13 | Blocks "Update All" for third-party plugins. |

**Overall health read:** QwenPaw is **high-energy but backlog-heavy** — an unusually large ratio of open-to-merged PRs (48:2) and ~10 unfixed bugs suggest the maintainers are in a release/pre-refactor crunch. The security patch and roadmap transparency are strong positives; the principal risks are (a) channel adapter reliability, (b) upgrade-path regressions, and (c) review throughput on the expanding PR queue. Addressing the P0 event-loop hang (#8350) and Feishu/Hub-container deployment (#8359) should be the immediate priority.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-10-23

## 1. Today's Overview

ZeroClaw remains in a high-velocity stabilization phase ahead of v0.8.7/v0.9.0. Activity is strong: **42 issues updated** (30 open/active, 12 closed) and **50 PRs updated** (42 open, 8 merged/closed) in the last 24 hours, with no new releases. The dominant theme is **security and identity-access hardening** — a stacked cluster of principal-scope PRs (#11225, #11230, #11220, #11234) from a distinguished contributor is driving toward release-gate quality for v0.9.0. Simultaneously, a wave of v0.8.7 cleanup issues (OIDC auth, plugin lifecycle, CI reliability, session-store races) is being closed, indicating the maintainers are consolidating release readiness while the larger architectural work continues.

---

## 2. Releases

**No new releases in the last 24h.** The last known published artifact is the **v0.8.6 archive** (referenced in issue #10999 and PR #11841), with **v0.8.7** and **v0.9.0** currently in flight across multiple issues and PRs. No breaking changes or migration notes to report today.

---

## 3. Project Progress

Eight PRs were merged or closed today, all pointing to **v0.8.7 release stabilization**:

| PR | Title | Impact |
|---|---|---|
| [#11863](https://github.com/zeroclaw-labs/zeroclaw/pull/11863) | test(runtime): make the receipt-bound `late_tool_search` tests opt-in | Fixes flaky CI by gating 23 fixture-dependent tests (closes #11806) |
| [#11848](https://github.com/zeroclaw-labs/zeroclaw/pull/11848) | fix(plugins): name the sender in `plugin_channel_sender_denied` records | Operator UX — denied senders now identifiable (closes #11821) |
| [#11841](https://github.com/zeroclaw-labs/zeroclaw/pull/11841) | docs(changelog): match v0.8.6 "In brief" OIDC wording | Docs consistency |

Closed issues today span **security, CI, and runtime reliability**:
- [#11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357) — `plugin remove` deleting the wrong directory (security: arbitrary directory deletion).
- [#11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327) — Plugin tool-name gate could pre-empt `tool_search`/MCP/peripheral tools (S2, S0-if-untrusted-plugin).
- [#11898](https://github.com/zeroclaw-labs/zeroclaw/issues/11898) — Daemon first-start race missing its RPC session store.
- [#11902](https://github.com/zeroclaw-labs/zeroclaw/issues/11902) — Valid OIDC token refused during concurrent JWKS fetch.
- [#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558), [#11828](https://github.com/zeroclaw-labs/zeroclaw/issues/11828), [#11966](https://github.com/zeroclaw-labs/zeroclaw/issues/11966) — CI flakiness and release-pipeline reliability.
- [#11926](https://github.com/zeroclaw-labs/zeroclaw/issues/11926), [#11928](https://github.com/zeroclaw-labs/zeroclaw/issues/11928) — Audit coverage and test race repairs.

**Advanced but not merged:** The identity-access stack (#11225 → #11230 → #11220 → #11234) remains open and under pinned review, signaling a deliberate, staged landing rather than a rushed merge.

---

## 4. Community Hot Topics

Ranked by comment count:

1. **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — [Tracker] Runtime, dashboard sign-in and gateway delivery** (15 comments, OPEN)
   The master roadmap tracker for runtime + gateway, deriving from RFC #5574 and allocated to **v0.9.0**. **Underlying need:** the community wants a *single, authoritative view* of what ships when — this tracker is effectively the project's release contract.

2. **[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) — RFC: Append-only session event history, deterministic state replay, derived agent streams** (13 comments, **CLOSED**)
   Proposes replacing mutable conversation persistence with an append-only event log enabling **deterministic replay**. **Underlying need:** reproducibility, auditability, and debuggability of agent behavior — a foundational architecture ask that will likely resurface as implementation issues.

3. **[#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) — Publish and prove Discord plugin installation from a release binary** (9 comments, OPEN, **blocked**)
   Real Discord in/out delivery is now verified on the v0.8.6 archive; remaining work is proving installation reproducibility from a published binary. **Underlying need:** users want plugins to "just work" from releases without local builds.

4. **[#9506](https://github.com/zeroclaw-labs/zeroclaw/issues/9506) — Email channel cannot preserve CC or send true Reply All** (3 comments)

5. **[#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558), [#11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357), [#11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)** (2 comments each, all CLOSED)

**Takeaway:** the most-discussed topics are **architecture (event sourcing, runtime/gateway roadmap)** and **plugin distribution reliability** — not incidental bugs.

---

## 5. Bugs & Stability

Ranked by severity:

### S0 / Critical
- **[#11932](https://github.com/zeroclaw-labs/zeroclaw/issues/11932) — Container CA bundles still trust distrusted emSign chains** (risk:high, OPEN)
  The published container's *native* CA bundle still authenticates paths through publicly distrusted emSign intermediates; updating the Rust verifier alone is insufficient. **Fix PR exists:** [#11925](https://github.com/zeroclaw-labs/zeroclaw/pull/11925) (container runtime CA store refresh).

### S1 / Workflow Blocked
- **[#11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608) — Telegram listener can wedge forever on a blackholed request** (OPEN)
  No HTTP request timeout means `listener_health` detects staleness but nothing recovers the channel. **Fix PR exists:** [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) (shared per-token flood gate, honors 429 `retry_after`).
- **[#11959](https://github.com/zeroclaw-labs/zeroclaw/issues/11959) — Unix null-device regression test fails on case-insensitive filesystems** (OPEN, reported today)
  Test fixture creates `nul` symlink; panics on macOS/Windows-style FS. Blocks CI on the affected platforms.

### S2 / Degraded Behavior
- **[#11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711) — Trimming a long conversation permanently deletes older turns** (OPEN) — data-loss-adjacent session persistence bug.
- **[#11709](https://github.com/zeroclaw-labs/zeroclaw/issues/11709) — Upgraded sockets outlive a gateway reload** (OPEN) — retired gateway instance keeps serving.
- **[#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) — Gateway WebSocket upgrades fail over built-in TLS listener** (OPEN, reported today, v0.9.0) — breaks dashboard chat; **related fix PR:** [#11901](https://github.com/zeroclaw-labs/zeroclaw/pull/11901) (drain connections after stop).
- **[#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) — Outbound email HTML carries raw markup and arbitrary image URLs** (OPEN, reported today) — HTML injection / tracking-pixel risk.
- **[#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989) — Per-channel `excluded_tools` is never applied** (OPEN, reported today) — documented security control is silently inert.
- **[#9506](https://github.com/zeroclaw-labs/zeroclaw/issues/9506) — Email CC / Reply-All broken** (OPEN).

### S3 / Minor (OPEN, reported today)
- **[#11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987) — Inline `nosemgrep` comments don't suppress code-scanning alerts.**

**Assessment:** Security-adjacent S0/S2 issues dominate. Encouragingly, **fix PRs exist in parallel with the reports** (e.g., #11932/#11925, #11608/#11651), indicating a healthy report-to-fix pipeline. However, three of the S2 issues (#11989, #11991, #11711) touch **documented security/behavioral contracts that are silently broken** — a pattern worth watching for systemic config-plumbing defects.

---

## 6. Feature Requests & Roadmap Signals

| Feature | Issue | Likely Target |
|---|---|---|
| Runtime/dashboard sign-in & gateway delivery | [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | **v0.9.0** (explicitly allocated) |
| Remote zerocode mints/stores its own bearer over mTLS | [#11679](https://github.com/zeroclaw-labs/zeroclaw/issues/11679) | v0.9.0 (identity-access cluster) |
| Email: quote original in replies (`quote_original` flag, off by default) | [#11938](https://github.com/zeroclaw-labs/zeroclaw/issues/11938) | Likely v0.9.x |
| Email: operator templates + sanitised HTML body for `send_via` | [#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992) | v0.9.x |
| Restore owned background delegation with principal-scoped results | [#11995](https://github.com/zeroclaw-labs/zeroclaw/issues/11995, filed today) | v0.9.0 (depends on #11225) |
| Process-message turn lifecycle for memory span nesting | [#8844](https://github.com/zeroclaw-labs/zeroclaw/issues/8844) | Parking-lot → observability epic |

**Prediction:** v0.9.0 will be headlined by **identity-access and principal-scope enforcement** (the IftekharUddin stacked PRs), **append-only session semantics** (post-#10526), and **gateway/TLS reliability** (#11951, #11901). Email-channel ergonomics (#11938, #11992) and XMPP support (PR [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)) are strong candidates for the following minor.

---

## 7. User Feedback Summary

**Pain points:**
- **Plugin distribution & lifecycle friction** — users cannot reliably install Discord plugins from release binaries (#10999), and `plugin remove` previously deleted the wrong directory (#11357). Trust in plugin operations is a recurring concern.
- **Email channel is a weak citizen** — no CC/Reply-All (#9506), no quoting (#11938), raw unsanitised HTML outbound (#11991). Users clearly want the email channel to match real mail-client behavior.
- **Silent config failures** — `excluded_tools` being ignored (#11989) and TLS WebSocket upgrades failing (#11951) erode confidence in the configuration surface.
- **CI/release reliability** — repeated issues about timeouts (#10558), OOM on arm64 dist builds (#11828), and preflight failures (#11966) suggest contributor friction.

**Satisfaction signals:** The rapid closing of security issues (#11357, #11327) and the disciplined stacked-PR review process suggest a responsive maintainer corps. The v0.8.6 Discord verification (#10999) is an explicit win.

**Dissatisfaction signals:** Multiple "reported today" S2 bugs (#11989, #11991, #11959) arriving together hints at insufficient regression coverage around **config plumbing and outbound message encoding**.

---

## 8. Backlog Watch

Long-unanswered or high-importance items needing maintainer attention:

- **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — Runtime/dashboard/gateway tracker** — open since 2026-06-09, last updated 2026-10-22, only 15 comments for a v0.9.0 roadmap owner. **Needs:** explicit acceptance criteria and a public status rollup.
- **[#8844](https://github.com/zeroclaw-labs/zeroclaw/issues/8844) — process_message turn lifecycle for OTEL span nesting** — open since 2026-07-08, tagged `status:parking-lot`. Observability foundation for memory/RAG tracing; could become a blocker for deeper runtime work.
- **[#9506](https://github.com/zeroclaw-labs/zeroclaw/issues/9506) — Email CC/Reply-All** — open since 2026-07-28 with only 3 comments despite being a clear functional gap. No linked fix PR while adjacent email issues (#11938, #11991, #11992) are being filed — suggests **fragmented email-channel ownership**.
- **[#11304](https://github.com/zeroclaw-labs/zeroclaw/pull/11304) — Record socket/WebSocket egress denials** — `status:blocked`, open since 2026-10-01. Security observability gap for plugin egress; worth unblocking before v0.9.0.
- **[#11230](https://github.com/zeroclaw-labs/zeroclaw/pull/11230), [#11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220), [#11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225), [#11234](https://github.com/zeroclaw-labs/zeroclaw/pull/11234)** — release-gate, p0/p1, all open and stacked since 2026-09-29. These are the **critical path to v0.9.0**; their merge cadence is the single best predictor of the next release date.

---

*Digest generated from GitHub activity data for 2026-10-23. All links point to zeroclaw-labs/zeroclaw.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*