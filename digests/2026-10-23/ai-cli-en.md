# AI CLI Tools Community Digest 2026-10-23

> Generated: 2026-10-23 05:33 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report: AI CLI Ecosystem
**Date: 2026-10-23 | Tools: Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, Qwen Code**

---

## 1. Ecosystem Overview

The AI CLI ecosystem in late 2026 has matured past "does it work?" into a hardening-and-trust phase. Every major tool shipped security or reliability patches this week (Claude Code sandbox escapes, OpenCode's Bun 1.4.4 CVE bundle, Copilot CLI sandbox-flag honoring), signaling that vendors now treat these tools as production infrastructure rather than experiments. A clear structural convergence is underway: agent loops, subagent orchestration, MCP tool integration, hooks, and permission scoping appear in every community's issue tracker, suggesting the architectural envelope has stabilized. Differentiation is shifting away from core capability and toward **reliability, observability, sandboxing, and enterprise readiness**. Meanwhile, communities are growing increasingly intolerant of silent failures (truncated tool calls, phantom "GOAL" success, quota miscounts) — trust in the agent's self-report is now the single most recurring complaint class across all seven tools.

---

## 2. Activity Comparison

| Tool | Issues (active today) | PRs (active today) | Discussions | Release Status |
|---|---|---|---|---|
| **Claude Code** | 10 hot + 9-issue context cluster | 7 (all closed, mod-infra batch) | N/A | **v2.1.309** — sandbox escapes patched |
| **OpenAI Codex** | 10 hot (~30 tracked) | ~10 landed (mostly `copyberry[bot]`) | 17 items (Ideas/QA/Show&Tell) | **rust-v0.164.0** stable + rolling alphas |
| **Gemini CLI** | 10 hot + several P1/P2 | 10 active (P1 fixes landing) | N/A | **v0.67.0-nightly** — token metadata fixes |
| **GitHub Copilot CLI** | 10 hot | 0 PRs updated | N/A | **v1.0.103** — clipboard/sandbox/reconnect fixes |
| **OpenCode** | 10 hot | ~10 (dense MCP-lifecycle hardening pass) | N/A | **v1.19.4** — Bun 1.4.4 CVE bundle |
| **Pi** | 10 hot | 10 (TUI/perf/export fixes) | 2 (Show & Tell only) | No release in 24h |
| **Qwen Code** | 10 hot (heavy P1 correctness) | 10 (agent-loop unification, workspace mgmt) | N/A | **v0.26.0-nightly** — daemon token persistence |

**Reading the table:**
- **Issues column** reflects *hot/active* items surfaced in each digest, not total open backlog. All tools except Copilot are running a roughly even 10-item signal band.
- **N/A** entries indicate the repository does not surface a Discussions channel in the dataset (or uses Issues as the sole channel) — this is a channel-architecture choice, not disengagement. Codex is the only tool running Discussions as a first-class community surface.
- **PR activity** is the sharpest differentiator: Gemini CLI, OpenCode, Pi, and Qwen Code are mid-flight on substantive correctness PRs; Copilot CLI shows zero merge activity, and Claude Code's only PR traffic was a closed mod-infra cleanup batch.
- **Release cadence** is uniformly high — five of seven shipped in 24h, all in maintenance/hardening skin rather than feature headlines.

---

## 3. Shared Feature Directions

Requirements appearing across **three or more** communities, with the specific need each surfaces:

### 3.1 Sandboxing & Permission Boundaries
- **Claude Code** patched two real sandbox escapes this week (shell startup files running outside sandbox; `denyWrite` glob bypass via symlinks) — this is now a live attack surface.
- **OpenCode #2242** (101 comments, 80 👍) demands filesystem confinement; **#52083** (redirection bypass) and **#50652** (plugin permission bypass) show the model leaks on both sides.
- **Copilot CLI #5232** (trusted folders auto-approve shell execution) and **#3013** (hooks don't fire for subagent tools) are the same pattern: agent paths that bypass the declared control plane.
- **Gemini CLI #19873** proposes zero-dependency OS sandboxing; **#22672** asks the agent to self-limit destructive commands.
- **Pi #9932** and **Qwen Code #15317** are structural extensions of the same idea (tool removal and cross-boundary value depth limits).

**The shared ask:** a *single, enforceable* permission model that holds across built-in tools, plugins, MCP servers, hooks, and subagents. Every tool currently leaks in at least one of those six surfaces.

### 3.2 Subagent Observability & Control
- **Gemini CLI #22323** (MAX_TURNS reported as `GOAL` success) and **#21763** (`/bug` omits subagent context) — subagents are opaque.
- **Claude Code** issues around `ccd_turn` tools counting against plan limits without attribution, plus the next-step box racing the model's reply.
- **Codex #56282** (Codex Cloud claims PR complete without publishing one) and **#56352/#55702** (Daybreak state misreported by the agent itself).
- **Copilot CLI #3013** (hooks don't fire for background agents).

**The shared ask:** subagent trajectories should be inspectable, attributable for billing, and honestly report failure vs. success. Today, every tool's subagent is effectively a black box.

### 3.3 Usage/Quota Transparency
- **Codex #51088** (quota drains abnormally fast), **#32586** (auto-redeem banked resets), **#56328/#55746** ("at capacity" on all models).
- **Claude Code** ~9-issue cluster (post-2.37337.1 update removed context-window usage from the usage ring).
- **OpenCode #57975** (unified usage dashboard) and **#58014** (free limits exhausted after a few requests).
- **Qwen Code** — the Claw Cloud response included models that Qwen Code never registers; the free-tier accounting is opaque.

**The shared ask:** accurate, per-turn, per-model, per-subagent usage accounting with clear capacity signaling before the user hits a wall. Trust in the meter is now a competitive feature.

### 3.4 MCP Lifecycle Robustness
- **Copilot CLI** — five-issue cluster (#5229, #5233, #5234, #5236, #5242): refresh tokens exist but aren't used, auth state doesn't persist, inotify exhaustion kills sessions.
- **OpenCode** — five same-day PRs (#58341–#58351): shutdown stalls, startup duplication, malformed-tool failures, OAuth callback misclassification, Bun fetch idle timeouts.
- **Gemini CLI #29767** — bounding `tools/list` discovery at 60s (was 10 min inherited timeout).
- **Claude Code #97936** — skills/plugin commands missing from `/` autocomplete.

**The shared ask:** MCP is the ecosystem's universal extension surface, and it is *unreliable* in every tool. Auth refresh, discovery timeouts, and lifecycle races are the top three failure modes.

### 3.5 Cross-Device / Cross-Session Continuity
- **Codex #14067** (13 comments, 69 👍) — the single most-upvoted discussion item across the dataset.
- **Pi #11292/#11291** (reload AGENTS.md mid-session) and the `pi-continuity` extension (#11306).
- **Claude Code #95364/#95491/#100114** — the auto-update/relaunch cluster destroys session state.
- **Qwen Code #15323** (per-session working directories) and daemon token persistence.

**The shared ask:** sessions should survive app restarts, updates, and device changes. Today, arguably no tool fully delivers this.

### 3.6 Custom Agent / Config Honoring
- **Copilot CLI #5241, #5219, #5133** — model/reasoning-effort frontmatter ignored; settings respected in one mode, ignored in another.
- **Pi #11223** — `modelOverrides` silently ignored for classifier models.
- **Gemini CLI #22267** — browser agent discards `settings.json` overrides.
- **Codex** — model-catalog overrides only now being applied to history/notes/context tools (#56313).

**The shared ask:** if the docs promise a config knob works, it must work across every execution mode. Silent config drops are the highest-trust-cost bug class in the dataset.

---

## 4. Differentiation Analysis

| Axis | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | OpenCode | Pi | Qwen Code |
|---|---|---|---|---|---|---|---|
| **Primary user** | Anthropic power users / web + desktop parity | Enterprise + API/BYOK developers | Google-ecosystem devs, large-context workflows | GitHub/enterprise + Windows shops | OSS-first, provider-agnostic | Extension/tooling builders | Alibaba Cloud / Qwen stack, multi-tenant scale |
| **Technical focus** | Sandbox hardening, connector auth architecture | Managed config, environment-scoped hooks, thread forking | Agent reliability, AST-aware context reduction | Enterprise MCP auth + ACP parity | MCP lifecycle, V2 migration, permission model | TUI performance, extension API, export fidelity | Unified agent loop, managed runtime broker, session/workspace model |
| **Community channel** | Issues + heavy duplicate filings | Issues **+ Discussions** (unique) | Issues | Issues | Issues | Issues + Show&Tell | Issues |
| **Release velocity** | Weekly patch (security-first) | Rapid stable + rolling alphas | Nightly channel | Rapid patch cadence (**stable-channel ask #5203**) | Runtime/security bumps | Slower, quality-gated | Nightly + managed automation |
| **Distinctive posture** | Highest security scrutiny; mod API release-gating backlog | Laying foundations for cross-device continuity (fork APIs) | Subagent model as first-class architecture | Multi-surface (CLI + ACP + desktop); enterprise-blocked | Provider-agnostic, OpenTUI differentiation | Extension ecosystem depth; startup budget vs. jcode | Hosted/multi-tenant runtime for large deployments |

**Key differentiators:**
- **Codex** is the only tool running a Discussions channel as a first-class community surface — this makes it structurally more receptive to feature ideation (#14067 is a Discussions artifact, not an Issue).
- **Claude Code** is the only tool with a public mod-API release-gating process visible in PR metadata; the entire security-boundary PR series landing un-merged the same day is a governance signal.
- **Copilot CLI** is the only tool where **zero PR activity** appeared in 24h — the whole contribution pipeline runs internally. This shows as community demand for a stable channel rather than code contribution.
- **Pi** and **OpenCode** both have a strong "second-order" contribution pattern (bot-authored or community-authored PRs regularly landing), suggesting more open cooperative shaping.
- **Qwen Code** is the only tool explicitly building a **multi-tenant runtime broker** (#15247, #15255, #15261) — it is targeting hosted SaaS-like deployments rather than single-developer CLI use.

---

## 5. Community Momentum & Maturity

**Most active communities (raw engagement, 24h window):**
1. **OpenAI Codex** — highest discussion engagement (#14067 at 69 👍), highest cross-tool issue comment volume (#54841 at 37 comments), and 20+ PRs. Most balanced across issues/PRs/discussions.
2. **Claude Code** — dominated by issues, but issue comments run high (278 on #27302 alone). PR pipeline is bottlenecked by the mod-engine release gate.
3. **Gemini CLI** — several P1 bugs with high community agreement, dense fix-PR flow. Reads as an engineering team actively working through a backlog.

**Most rapid iteration (PR velocity + release cadence):**
1. **Qwen Code** — nightly releases, ~10 substantive PRs/day, structural refactors (unified agent loop, runtime broker) landing.
2. **OpenCode** — dense MCP hardening pass (five related PRs same-day) plus Bun 1.4.4 CVE bump.
3. **Pi** — four same-day merges on a coordinated TUI/export/perf fix wave.

**Most mature / process-conscious:**
- **Claude Code** — batch cleanup of a security-boundary series, mod API release-gating visible; issue triage shows a mod-facing release discipline the others haven't needed yet.
- **Gemini CLI** — P1/P2 labeling discipline, `status/need-retesting` tags, EPIC tracking (#22745) for large initiatives.

**Lagging maturity signals:**
- **Copilot CLI** — no public PR activity; the community is asked to *trust* the roadmap rather than co-shape it. The stable-channel request (#5203) is a maturity gap: rapid releases without beta lanes are landing regressions on daily drivers.
- **Pi** — heavy `[no-action]` triage (nine issues closed same-day) risks alienating contributors filing small compatibility asks.

**Community health scorecard (subjective, data-backed):**

| Tool | Responsiveness | Openness to contribution | Trust in agent behavior |
|---|---|---|---|
| Claude Code | Low (278-comment issue, 8mo stale) | Low (gated mod API) | Medium |
| OpenAI Codex | Medium | Medium-High (botic + community PRs) | Low (agent self-report issues) |
| Gemini CLI | Medium | High | Low (silent MAX_TURNS as success) |
| Copilot CLI | Low (zero PRs) | Low | Low (permission bypasses) |
| OpenCode | High (same-day fixes) | High (Brave re-land) | Medium |
| Pi | High (same-day merges) | High | Medium |
| Qwen Code | High | High | Low (silent truncation cluster) |

---

## 6. Trend Signals

### 6.1 Trust in agent self-report is the emerging crisis
Across **every** tool, the top complaint is not "the agent can't do X" but "the agent says it did X and it didn't." Examples: Gemini CLI MAX_TURNS → GOAL success (#22323); Codex Cloud claims PR complete without publishing (#56282); Qwen Code truncation silently reported as success (#15324, #15325, #15328); Pi `modelOverrides` silently ignored (#11223). **Reference value for developers:** if you are building an agent product, invest in *falsifiable* completion signals — the agent should be able to prove it did what it claims, and should fail loudly.

### 6.2 MCP is universal infrastructure and universally fragile
Every tool with MCP support is fighting a variation of the same battles: OAuth refresh, discovery timeouts, lifecycle races, malformed-tool handling. **Reference value:** if your tool consumes MCP, treat OAuth-refresh, discovery-bounding, and per-tool validation as table stakes, not follow-up work. Codex's `@modelcontextprotocol/sdk` bump (#56286) shows the SDK is where the systemic fix has to land.

### 6.3 Permission models are leaking across tool surfaces
Built-in shell, plugin tools, MCP servers, hooks, subagents, and Code Mode each have *different* permission semantics in nearly every tool. **Reference value:** design a single canonical permission evaluation path and make every execution surface route through it. Every tool currently has at least one public exploit-by-design documented in its issue tracker.

### 6.4 Usage accounting is a competitive feature, not a billing annoyance
Claude Code's context-visibility regression cluster, Codex's quota-drain complaints, OpenCode's free-limit confusion, and Qwen Code's Claw Cloud model-registration failures all point the same way: developers plan work around these meters. **Reference value:** if your metering is opaque or inaccurate, users will assume the worst. A real-time, per-turn, per-model, per-subagent usage surface is an emerging market differentiator, not a nice-to-have.

### 6.5 Session durability is the new "just works"
Auto-update destroying state (Claude Code), cross-device continuity (Codex #14067), mid-session config reload (Pi), daemon token persistence (Qwen Code), and per-session working directories (Qwen Code #15323) all point to a shared industry realization: agents now run long enough that **session lifecycle is a first-class feature**. Silent updates that quit the app and drop sessions are a trust-breaking pattern vendors will pay for eventually.

### 6.6 The startup/latency budget is now competitive narrative
Pi #7739 explicitly benchmarks against `jcode`; OpenCode bundles a newer Bun runtime specifically for security fixes; Claude Code and Codex both ship near-daily. **Reference value:** startup time and per-turn latency are now externally benchmarked by communities. Treating them as "polish" rather than engineering metrics is a competitive liability.

### 6.7 Enterprise/enterprise-adjacent features are quietly maturing
Codex's managed config loaders (#56314), environment-scoped hooks (#56302/#56304/#56343), and BYOK+Work mode (#54841); Qwen Code's runtime broker and shared Harness pool; Copilot CLI's ACP parity. **Reference value:** the enterprise tier is moving from "we support SSO" to "hooks and config are environment-aware and org-policy-aware." This is the emerging baseline for procurement-grade AI CLIs.

### 6.8 Contribution pipelines are the hidden bottleneck
Claude Code's mod-engine release-gating holds back a whole security series; OpenCode's stale-bot closed a fully-implemented PR (#48222) without review; Qwen Code's flaky CI blocks external contributors (#15248); Pi's `[no-action]` closure rate is high. **Reference value for platform teams:** the code is not the constraint — review latency and CI reliability are. Tools that solve the review pipeline will out-iterate tools that only solve the coding.

---

*Prepared for technical decision-makers evaluating AI CLI tooling. Source: community digests dated 2026-10-23. Figures reflect same-day activity surfaced in each repository's tracking; not exhaustive of total open backlog.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
*Data snapshot: 2026-10-23 · Source: github.com/anthropics/skills*

---

## 1. Top Skills Ranking

The repository does not expose comment counts on PRs (all listed as `undefined`); ranking below reflects community attention via Issues linkage, revision activity, and dependency on core skills.

| # | Skill / PR | Functionality | Discussion Highlights | Status |
|---|---|---|---|---|
| 1 | **mcp-builder** — fix `streamable_http_client` & custom headers ([#1742](https://github.com/anthropics/skills/pull/1742)) | Repairs MCP server scaffolding for `mcp>=2.0.0`, where the HTTP client API was renamed/restructured | Tied to Issue [#1390](https://github.com/anthropics/skills/issues/1390) — evaluation harness silently scores 0/N against real MCP servers. Two independent fixes target the same skill, signaling it is broken in production use | OPEN (updated 2026-10-08) |
| 2 | **skill-creator** — trigger eval isolation + Windows fixes ([#1298](https://github.com/anthropics/skills/pull/1298)) | Fixes false-miss trigger scoring, Windows `select()` on pipes, and runtime failure handling in eval harness | One of several competing fixes: [#1681](https://github.com/anthropics/skills/pull/1681) (standalone execution), [#1997](https://github.com/anthropics/skills/pull/1997) (YAML parsing). Corroborated by Issues [#556](https://github.com/anthropics/skills/issues/556), [#1383](https://github.com/anthropics/skills/issues/1383), [#1394](https://github.com/anthropics/skills/issues/1394) — the meta-skill that builds all other skills is the most fragile | OPEN (updated 2026-09-16) |
| 3 | **docx** — LibreOffice timeout & output verification ([#1792](https://github.com/anthropics/skills/pull/1792)) | Returns a real error on `soffice` timeout; only claims success after verifying `w:ins`/`w:del` marks are gone | Paired with [#1734](https://github.com/anthropics/skills/pull/1734) (orphaned comments) and Issue [#2018](https://github.com/anthropics/skills/issues/2018) (invalid XML from `merge_runs.py`). Document processing is the highest-traffic skill family | OPEN (updated 2026-09-25) |
| 4 | **notion-spec-to-implementation** + **quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | Transforms Notion specs into actionable task plans with acceptance criteria; audits resumes quantitatively | Dual-skill submission with sustained engagement (Jun–Oct). Represents the "spec → execution" workflow bridge the community keeps requesting | OPEN (updated 2026-10-15) |
| 5 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Zero-cost Markdown → MP4 pipeline (Marp slides + TTS voiceover) | Positions content-repurposing as a first-class skill; notable for claiming no external API cost | OPEN (updated 2026-09-15) |
| 6 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Static analysis of Solidity/Rust contracts with Merkle-proof anchoring on TON | First serious Web3/audit submission; raises namespace-trust concerns consistent with Issue [#492](https://github.com/anthropics/skills/issues/492) | OPEN (updated 2026-09-16) |
| 7 | **webapp-testing** — security & correctness fixes ([#1980](https://github.com/anthropics/skills/pull/1980), [#1976](https://github.com/anthropics/skills/pull/1976)) | Removes `shell=True` command injection (CWE-78); corrects textarea/select element reporting | Same author (gerardrecinto) filed paired fixes plus algorithmic-art [#1977](https://github.com/anthropics/skills/pull/1977) — evidence of an active bug-hunting cohort | OPEN (updated 2026-10-22) |
| 8 | **pyxel** retro game dev ([#525](https://github.com/anthropics/skills/pull/525)) | Create/debug/verify retro Python games with headless input runs and frame inspection | Longest-running open PR (8+ months) still receiving updates — niche but persistent demand for game-dev verification workflows | OPEN (updated 2026-09-22) |

---

## 2. Community Demand Trends

Distilled from the 15 highest-comment Issues:

1. **Trust & namespace governance** — Issue [#492](https://github.com/anthropics/skills/issues/492) (46 comments, top issue): community skills published under the `anthropic/` namespace impersonate official skills, enabling permission escalation.
2. **Team/org skill distribution** — Issue [#228](https://github.com/anthropics/skills/issues/228) (17 comments, 8 👍): users want an org-wide shared skill library instead of manual `.skill` file passing via Slack/Teams.
3. **Evaluation & trigger reliability** — Issues [#556](https://github.com/anthropics/skills/issues/556) (13 comments), [#1383](https://github.com/anthropics/skills/issues/1383), [#1394](https://github.com/anthropics/skills/issues/1394): `run_eval.py` reports 0% trigger rates; benchmark failures are silent. Demand for trustworthy skill QA tooling.
4. **Context/token efficiency** — Issues [#1487](https://github.com/anthropics/skills/issues/1487) (`claude-api` injects ~156k tokens in one call), [#202](https://github.com/anthropics/skills/issues/202) (`skill-creator` too verbose): skills must be operational instructions, not documentation.
5. **Memory & long-horizon agent state** — Issue [#1329](https://github.com/anthropics/skills/issues/1329): symbolic-notation `compact-memory` for persistent agent state.
6. **Output quality gating** — Issues [#1385](https://github.com/anthropics/skills/issues/1385) (reasoning quality gates), [#412](https://github.com/anthropics/skills/issues/412) (agent governance): pre-task calibration, adversarial review, delivery verification.
7. **Packaging correctness** — Issue [#189](https://github.com/anthropics/skills/issues/189) (9 👍): `document-skills` and `example-skills` install identical content, duplicating context.

**Emerging Skill directions:** security audit, Web3/contract analysis, document typography QC ([#514](https://github.com/anthropics/skills/pull/514)), HPC/Slurm operations ([#1615](https://github.com/anthropics/skills/pull/1615)), ODT/ODF support ([#486](https://github.com/anthropics/skills/pull/486)).

---

## 3. High-Potential Pending Skills

Active PRs with recent updates and clear merge paths:

- **[#1997](https://github.com/anthropics/skills/pull/1997) — skill-creator YAML frontmatter parsing** (updated 2026-10-19): Corrects quote-stripping/continuation-line bugs that corrupt description metadata. Small, well-scoped, high blast radius.
- **[#1980](https://github.com/anthropics/skills/pull/1980) — webapp-testing `shell=True` removal** (updated 2026-10-22): Security fix (CWE-78); most recently touched PR in the set.
- **[#1977](https://github.com/anthropics/skills/pull/1977) & [#1976](https://github.com/anthropics/skills/pull/1976) — algorithmic-art + element discovery fixes** (updated 2026-10-18): Two-line logic corrections, both reference closed Issues (#1897, #1891), low review burden.
- **[#1730](https://github.com/anthropics/skills/pull/1730) — claude-api dead URL replacement** (updated 2026-10-04): 3 URLs fixed, verified HTTP 200 via `curl`. Trivial to merge.
- **[#1245](https://github.com/anthropics/skills/pull/1245) — Notion spec + resume auditor** (updated 2026-10-15): Long-running but still active; dual-skill submission with polished SKILL.md.
- **[#1742](https://github.com/anthropics/skills/pull/1742) — mcp-builder `streamable_http_client`** (updated 2026-10-08): Fixes a breaking API change; likely to land once maintainers settle on one of the competing mcp-builder patches.

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is not for new skills but for a trustworthy, secure, and context-efficient skill supply chain — reliable evals, namespace integrity, and lean SKILL.md files — because the meta-skills (`skill-creator`, `mcp-builder`) and the packaging/trust layer underneath every skill are currently the system's weakest links.**

---
*Note: PR 👍 counts were reported as 0 or unavailable across the dataset; ranking weighted by Issue cross-references, update recency, and multi-PR clustering on the same skill.*

---

# Claude Code Community Digest — 2026-10-23

## 1. Today's Highlights

Claude Code shipped **v2.1.309**, a hardening release patching sandbox escapes on macOS and Linux (shell startup files running outside the sandbox, and `denyWrite` glob bypasses via symlinks). Meanwhile, the community's attention is fixated on a cluster of **desktop Code tab regressions from the 2.37337.1 update (2026-10-13)** — context-window usage has vanished from the usage ring/popover, and the new "next-step" box is drawing both UX complaints and cost-attribution bugs. The single most upvoted item remains the long-running multi-account Connector request (#27302, 278 comments, 424 👍), still unaddressed after eight months.

## 2. Releases

**v2.1.309** (shipped in last 24h) — security/bugfix release:

- **Sandbox fix (macOS + Linux):** shell startup files (`.bashrc`, `.zshrc`, etc.) were being executed *outside* the sandbox before each Bash command — a real escape vector when running untrusted project configs. Now correctly sandboxed.
- **macOS `denyWrite` fix:** glob patterns were not applying at a path's real location when the pattern's folder was reached through a symlink. Symlink traversal no longer bypasses write denial.
- (Release notes truncated in source data — additional sandbox hardening likely present.)

If you run Claude Code against untrusted repositories or with `denyWrite` policies depending on symlinked paths, **upgrade immediately**.

## 3. Hot Issues

1. **[#27302](https://github.com/anthropics/claude-code/issues/27302) — Support multiple Connector accounts (278 comments, 424 👍)** — The perennial #1. Users need the *same* connector bound to *different* accounts (work vs. personal Google, multiple GitHub orgs) in both Claude web and Claude Code. Eight months old, 424 upvotes, zero movement. This is the clearest signal that connector auth is the top architectural gap.

2. **[#56281](https://github.com/anthropics/claude-code/issues/56281) — Can't upgrade Max 5x → Max 20x, payment fails, support unresponsive (36 comments)** — Tagged `invalid` but with 36 comments of users echoing the same failure. Billing flows that dead-end with no support path generate disproportionate reputational damage.

3. **[#79305](https://github.com/anthropics/claude-code/issues/79305) — Desktop: custom themes / accent colors (23 comments, 71 👍)** — "Every dark mode looks identical" is a real UX problem for users running multiple monitors. Requests parity with the CLI's theme system.

4. **[#102132](https://github.com/anthropics/claude-code/issues/102132) — Desktop Code tab: `wrap_up` turn tool can end the turn before the reply is written (20 comments)** — A correctness bug, not cosmetic: the new next-step box races the model's actual response. 27 👍.

5. **[#102273](https://github.com/anthropics/claude-code/issues/102273) — Next-step box with answer buttons gets in the way of discussion (19 comments, 45 👍)** — The counterpoint to #102132: even when it works, users find the box intrusive. Landing a feature and its removal request in the same fortnight is a design-process smell.

6. **[#95364](https://github.com/anthropics/claude-code/issues/95364) — macOS "stealth update" quits/relaunches app while user is away, dropping Remote Control sessions (12 comments)** — Silent auto-update destroying state is exactly the kind of thing that erodes trust in background updates. See also #95491 and #100114 (same class, Windows and post-relaunch variants) — **this is now a cluster of at least three issues**.

7. **[#52420](https://github.com/anthropics/claude-code/issues/52420) — Configurable verb for post-turn completion line (12 comments, 30 👍)** — Small, well-scoped, six months old. Users want `settings.json` control over the rotating whimsical verbs; correctly notes `spinnerVerbs` is the wrong hook (present vs. past tense).

8. **[#102095](https://github.com/anthropics/claude-code/issues/102095) — Effort level now takes 3 clicks instead of 1 (10 comments)** — Concrete regression arithmetic: 50 effort switches/day = 100 extra clicks. High-frequency control buried one level deeper is a textbook regression.

9. **[#76353](https://github.com/anthropics/claude-code/issues/76353) — Bash tool leaks orphaned child processes on Windows timeout** — Killing `bash.exe` but not its descendants means a timed-out `find /` keeps scanning for hours. Zero 👍 but six comments of confirmations — a silent resource-exhaustion bug on Windows.

10. **[#73069](https://github.com/anthropics/claude-code/issues/73069) — VSCode webview CSP blocks codicon font (tofu boxes in diff gutter)** — Root-caused by the reporter: `font-src` is missing `data:`, so every gutter icon renders as a missing-glyph box. A one-line fix sitting open since July.

*Honorable mentions:* [#104474](https://github.com/anthropics/claude-code/issues/104474) (Fable 5.1 burning budget on failed shell commands — fresh, filed today), [#103018](https://github.com/anthropics/claude-code/issues/103018) (`ccd_turn` built-in tools count against plan limits), [#97936](https://github.com/anthropics/claude-code/issues/97936) (skills/plugin commands missing from `/` autocomplete — with a documented history of stale-closing).

## 4. Key PR Progress

All seven PRs updated in the last 24h are **CLOSED**, all from a single contributor (`poteat`), and all appear to be the same mod-infrastructure/security series — several explicitly noting they were red-by-construction pending an engine release. No new work merged forward today; this looks like a batch cleanup.

1. **[#99137](https://github.com/anthropics/claude-code/pull/99137) — sec-default: user plugins may tighten, never loosen, org policy** — Where `sec-default` is seated, a user's plugin can no longer lift a deny/ask rule or change a pinned variable. Core privilege-boundary semantics.
2. **[#99540](https://github.com/anthropics/claude-code/pull/99540) — sec-default: org tool ceiling holds over user-installed plugins** — Extends org approval requirements for connector tools to personally-installed plugins.
3. **[#97688](https://github.com/anthropics/claude-code/pull/97688) — sec-default: collector records continue past the user tier** — User plugins can no longer drop or rewrite telemetry records bound for an org's collector.
4. **[#97334](https://github.com/anthropics/claude-code/pull/97334) — sec-default: conversation rows continue past the user tier** — Same tiering principle applied to `session.append`. Explicitly gated on engine support.
5. **[#97293](https://github.com/anthropics/claude-code/pull/97293) — mods: declarations for `process.run` truncation flags and `fs.list` `mtimeMs`** — Typed API surface for stdout/stderr truncation and file mtimes; held until the released CLI actually carries the fields.
6. **[#99118](https://github.com/anthropics/claude-code/pull/99118) — diff: toasts show while the /diff pane is open** — Previously `/diff` used `holdToasts: true`, suppressing *all* other plugins' notifications.
7. **[#99141](https://github.com/anthropics/claude-code/pull/99141) — diff: pane is retained until something can draw it** — Fixes `/diff` opened before a rendering host attaches; stacked on #99118.

**Note for maintainers:** a whole security-boundary series closing the same day, with multiple PRs flagged as un-mergeable-until-engine-release, suggests the mod API's release-gating process is creating a backlog. Worth watching whether these re-land.

## 5. Hot Discussions

No Discussions data was provided in this dataset. Section omitted.

## 6. Feature Request Trends

Distilled from all Issues above:

- **Connector/account multiplicity** (#27302) — the dominant request by a wide margin: multiple accounts per connector, across web and Desktop/Code.
- **Desktop theming** (#79305) — custom themes/accent colors, parity with CLI.
- **A working usage/context telemetry surface in Desktop** — a striking cluster: [#102094](https://github.com/anthropics/claude-code/issues/102094) (closed), [#102103](https://github.com/anthropics/claude-code/issues/102103), [#102176](https://github.com/anthropics/claude-code/issues/102176), [#102133](https://github.com/anthropics/claude-code/issues/102133), [#102615](https://github.com/anthropics/claude-code/issues/102615), [#102623](https://github.com/anthropics/claude-code/issues/102623), [#103885](https://github.com/anthropics/claude-code/issues/103885), [#103918](https://github.com/anthropics/claude-code/issues/103918) (closed), [#104471](https://github.com/anthropics/claude-code/issues/104471). Users want context-window usage, elapsed time, and token counts — some filed as bugs, some as features, because the app regressed and the plan windows replaced them.
- **Configurable CLI cosmetics** (#52420) — expose the completion-line verb in `settings.json`.
- **Desktop layout control** (#102233) — hideable session info panel for split view.
- **Skills/plugin command discoverability** (#97936) — `/` autocomplete should index `~/.claude/skills` and plugin commands.

## 7. Developer Pain Points

1. **Desktop update/relaunch destroys session state.** A three-issue cluster (#95364, #95491, #100114) describes the same failure mode: a stealth auto-update quits and relaunches the app while the user is away, killing Remote Control sessions and archiving them on mobile. Silent updates that lose work are a trust-breaking pattern.
2. **The 2026-10-13 desktop update (2.37337.1) regressed context visibility across the board.** At least nine issues spanning "bug" and "enhancement" labels all trace to the same update removing the context-window line from the usage ring/popover. The volume of duplicate filings (two already closed) suggests users had no canonical issue to rally around.
3. **The next-step box is a net-negative for many users.** #102132 (ends turn before reply is written), #102273 (gets in the way), #102342 (buttons stay clickable and queue duplicate messages), #103018 (`ccd_turn` tools count against plan limits and are unattributed in `/usage`). Four independent failure modes for one new feature.
4. **Small-friction UX regressions compound.** #102095 (3 clicks instead of 1 for effort), #102233 (panel can't be hidden). Individually minor; collectively a pattern of adding surface without control.
5. **Billing/support dead-ends.** #56281: upgrade payment fails on every attempt, support unresponsive, issue marked `invalid`. No recourse path is the worst possible outcome for a paying user.
6. **Platform-specific correctness gaps.** #76353 (Windows orphaned child processes), #73069 (VSCode CSP font block), #81377 (macOS Caps Lock input-source double-flip). Long-lived, root-caused, still open.
7. **Stale-closing without resolution.** #97936 explicitly documents that its precursors (#62482, #76932) were auto-closed as stale with fixes never landed — the reporter had to file a new issue. This discourages careful bug reporting.

---

*Digest generated from github.com/anthropics/claude-code data as of 2026-10-23. Note: the v2.1.309 release notes were truncated in the source data; the summary above reflects the visible changes only.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-23

## 1. Today's Highlights

The `rust-v0.164.0` release introduces **`/presets` slash-command slots** and **inline `/model` and `/permissions` arguments**, significantly streamlining TUI-driven workflows. Meanwhile, a large batch of `copyberry[bot]` PRs landed focused on **managed configuration loading, environment-scoped hooks, and rollout trace fidelity** — signals of active work on the enterprise/agent-infrastructure layer. Issue volume remains high around **Windows desktop stability (renderer crashes, memory bloat, sandbox/env failures)** and **rate-limit/`at capacity` errors**, which cut across CLI and desktop users.

---

## 2. Releases

**`rust-v0.164.0`** (stable) — [#54380, #54381, #54378, #54383]
- **Numbered `/presets` slots** for saving reusable prompts and slash commands, with a keyboard menu for rapid recall.
- **Inline arguments for `/model` and `/permissions`**, letting users set model, reasoning effort, speed, and permission profiles without opening menus.

**Alpha channel:** `rust-v0.164.0-alpha.12`, `rust-v0.164.0-alpha.11.1`, `rust-v0.163.0-alpha.11.2` — routine rolling alphas, no notable features called out. The stable release with the two UX features above is the headline.

---

## 3. Hot Issues

1. **[#54841](https://github.com/openai/codex/issues/54841)** — *Work mode blocks message submission in BYOK mode when local browser/computer tools are enabled.* 37 comments, 27 👍. **Why it matters:** BYOK + Work mode is a paid-tier configuration; blocking submission effectively bricks the workflow. Highest-engagement issue of the day and a clear top-priority fix.

2. **[#48938](https://github.com/openai/codex/issues/48938)** — *Windows: repeated renderer crashes, white-screen reloads, severe input lag after update (26.924.x).* 26 comments. **Why it matters:** A paying Pro 20x user reports work disruption and expense impact. Symptomatic of broader Windows desktop instability (see #51649, #42484).

3. **[#50329](https://github.com/openai/codex/issues/50329)** — *Windows App `read_thread` returns only `chatgpt-content-reference` for completed ChatGPT replies.* 23 comments, 5 👍. **Why it matters:** Breaks app-server/thread restoration for API consumers; reproducible via package path evidence.

4. **[#31925](https://github.com/openai/codex/issues/31925)** — *Restore Option+Space Quick Chat on macOS after ChatGPT/Codex app unification.* 18 comments, **42 👍**. **Why it matters:** Highest 👍-to-comment ratio here; unification regression on a beloved macOS shortcut. Long-lived (since July), still unaddressed.

5. **[#51649](https://github.com/openai/codex/issues/51649)** — *Windows: repeated MCP/CUA/node_repl process batches → 200 Node helpers, ~11.6 GB private memory.* 18 comments. **Why it matters:** Resource leak pattern echoes #42484 (cua_node EPERM loop, ~59 GB). Points to systemic lifecycle management problems in the Windows desktop helper stack.

6. **[#51667](https://github.com/openai/codex/issues/51667)** — *macOS VM: Codex messages blocked after updating to 26.1002.52244* (auth/safety-check tags). 15 comments. **Why it matters:** Blocking "safety-check" behavior on a VM is hard for users to reason about; undermines trust in reliability of updates.

7. **[#55783](https://github.com/openai/codex/issues/55783)** — *macOS: Dot missing from ChatGPT desktop sidebar while web Dot works.* 13 comments, 7 👍. **Why it matters:** Cross-modal integration regression; users increasingly rely on Dot as a first-class assistant surface.

8. **[#51088](https://github.com/openai/codex/issues/51088)** — *Codex quota drains abnormally fast even on trivial cached prompts.* 6 comments, 2 👍. **Why it matters:** Billing-adjacent, high-severity. Reproduced across models and repos; users don't trust their usage accounting. Overlaps with #56328 and #55746 ("Selected model is at capacity").

9. **[#56264](https://github.com/openai/codex/issues/56264)** — *Windows desktop: thread resume fails because MXC launcher receives `process.env` without `SYSTEMROOT`.* 6 comments. **Why it matters:** A crisp, actionable bug (env scrubbing breaks sandbox helper) — a strong candidate for a quick fix; high user-value per unit effort.

10. **[#32586](https://github.com/openai/codex/issues/32586)** — *Automatically redeem unused banked resets before they expire.* 7 comments, 6 👍. **Why it matters:** Enhancement with real money-like stakes; a small amount of UX work would eliminate an obvious annoyance.

*Also worth tracking:* #39767 (GPT-5.6 reasoning double-counted → premature auto-compaction), #56282 (Codex Cloud claims PR work complete without a published PR — a correctness/safety concern for unattended runs), #56352/#55702 (Daybreak mode state misreported by the agent itself — model-behavior transparency).

---

## 4. Key PR Progress

Most PRs today came from `copyberry[bot]` and were CLOSED after landing. Highlights:

1. **[#56351](https://github.com/openai/codex/pull/56351)** — *Add experimental attached thread forks.* Adds `attachToSource` to `thread/fork`, persisting a fork attached to its source without emitting `thread/started`. Foundational for branching conversation workflows.

2. **[#56343](https://github.com/openai/codex/pull/56343)** — *Run environment hooks on their owning executors.* Hooks now run with each owner's shell, working directory, and managed network policy — closing a sandbox/security gap in multi-environment setups.

3. **[#56342](https://github.com/openai/codex/pull/56342)** — *Match rollout trace image content across request snapshots.* Fixes call-ID reuse errors on replayed image outputs by hashing canonical JSON for non-text content parts.

4. **[#56330](https://github.com/openai/codex/pull/56330)** — *Make agent-message wakes respect interrupts and Plan mode.* Prevents a reserved wake from starting after an interrupt or a switch to Plan mode — reduces races in autonomous flows.

5. **[#56314](https://github.com/openai/codex/pull/56314)** — *Add managed configuration loaders for custom config servers.* Introduces a config-server path (`<base_url>/codex/config/bundle`) with no redirects or request logging — enterprise-config enabler.

6. **[#56313](https://github.com/openai/codex/pull/56313)** — *Apply model catalog overrides to history, notes, and context tools.* Tool descriptions/schemas for `history`, `notes`, `new_context`, `get_context_remaining` now come from the acting model's catalog — bigger lever for per-model tuning.

7. **[#56312](https://github.com/openai/codex/pull/56312)** — *Track accepted conversation history in rollout traces.* Distinguishes accepted vs. discarded response items — improves trace replay accuracy.

8. **[#56309](https://github.com/openai/codex/pull/56309)** — *Support model-specific writable-root permission wording.* `writable_root`/`writable_roots` templates with `{{ roots }}` substitution — localization + model-specific messaging.

9. **[#56304](https://github.com/openai/codex/pull/56304) + [#56302](https://github.com/openai/codex/pull/56302)** — *Environment-scoped managed hooks (discovery + attachment).* Adds `environment_hooks` to `EnvironmentConfig`; hooks execute on the owning environment. Paired with #56343, this is a coordinated push on hook isolation.

10. **[#56295](https://github.com/openai/codex/pull/56295)** — *Decouple managed configuration loading from ChatGPT authentication.* Introduces a `BundleSource` interface; moves plan eligibility and credential recovery into `ChatGptSource`. Simplifies future non-ChatGPT auth paths.

*Also notable:* [#24663](https://github.com/openai/codex/pull/24663) — serialize managed ChatGPT token refreshes across processes sharing `CODEX_HOME` (relevant to multi-process auth flakiness), and [#56286](https://github.com/openai/codex/pull/56286) — bump `@modelcontextprotocol/sdk` to `1.32.0`.

---

## 5. Hot Discussions

### Ideas
- **[#14067](https://github.com/openai/codex/discussions/14067)** — *Synchronize Codex threads/session context across devices.* **13 comments, 69 👍** — the single most-upvoted discussion item. Strong, coherent demand for cross-device continuity.
- **[#56158](https://github.com/openai/codex/discussions/56158)** — *Bring back the worktree button.* UI regression complaint; quick UX win if addressed.
- **[#2251](https://github.com/openai/codex/discussions/2251)** — *Codex Usage Limits* (59 comments, 57 👍). Perennial topic; ongoing confusion over Plus tier limits vs. Codex-specific limits.
- **[#47211](https://github.com/openai/codex/discussions/47211)** — *Automotive marketplace app dev services (USA).* Spam-adjacent; skip.

### Q&A
- **[#56069](https://github.com/openai/codex/discussions/56069)** — *macOS PiP support for MCP App UIs?* Devs building local MCP Apps need documented presentation options.
- **[#56208](https://github.com/openai/codex/discussions/56208)** — *Chrome unattended file collection — supported setup?* `ERR_BLOCKED_BY_CLIENT` friction in authenticated flows.
- **[#55792](https://github.com/openai/codex/discussions/55792)** — *Windows desktop: supported review path when `/approve` is unavailable?* Users want an auditable appeal path without workarounds.

### Show and tell
- **[#56176](https://github.com/openai/codex/discussions/56176)** — *Agent Relay Check v0.1.1* — a repeatable before/after check that a fresh session actually receives `AGENTS.md`. Pragmatic tooling for a real trust gap.
- **[#56181](https://github.com/openai/codex/discussions/56181)** — *pytest-codex* — turn `AGENTS.md` rules into pytest checks with offline replay. Elegant idea; converts policy into testable behavior.
- **[#56337](https://github.com/openai/codex/discussions/56337)** — *Off the Wall* — recall past corrections before the agent answers. Addresses a widely felt pain (repeating the same corrections).
- **[#56215](https://github.com/openai/codex/discussions/56215) + [#55901](https://github.com/openai/codex/discussions/55901)** — GFT-Merge / GFT Map case studies on **cross-tool/agent handoff**. The "handoff succeeded?" framing is a useful lens for evaluating multi-agent workflows.
- **[#54813](https://github.com/openai/codex/discussions/54813)** — *Octuo* — hand a goal to Codex and get a result, decoupling the user from the courier role.
- **[#56157](https://github.com/openai/codex/discussions/56157)** — *LinDesk on Android* — Codex CLI inside a Linux-on-Android workspace; useful evidence that CLI portability is real.
- **[#56242](https://github.com/openai/codex/discussions/56242)** — *ibara* — give an existing agent a desktop on another machine over MCP.

---

## 6. Feature Request Trends

Distilled from issues and discussions in the last 24h:

1. **Cross-device / cross-session continuity.** #14067 dominates demand: thread + session context sync for users on multiple machines. Forking APIs (#56351) suggest the team is laying foundations here.
2. **Granular, transparent usage and quota controls.** #2251, #51088, #32586, #56328, #55746 — users want (a) accurate quota accounting, (b) auto-redeem of banked resets, and (c) clearer signals when a model is at capacity.
3. **Windows desktop reliability.** Recurring across #48938, #51649, #42484, #51731, #56264, #56078: crashes, memory/process leaks, sandbox env scrubbing, MXC helper failures.
4. **Hooks and configuration as first-class, environment-aware primitives.** Reflected in PRs #56302/#56304/#56314/#56343: environment-scoped hooks, config-server bundles, and per-model tool descriptions.
5. **Agent behavior observability.** #56176, #56181, #56337, #56352/#55702 — developers want to verify what the agent actually sees and did (AGENTS.md delivery, Daybreak state, past corrections).
6. **MCP App / MCP UI surface maturity.** #56069, #56286 — PiP presentation support and SDK currency.
7. **Bring back removed UI affordances.** #56158 (worktree button), #31925 (Option+Space) — low-cost UX restorations with outsized community goodwill.

---

## 7. Developer Pain Points

- **Windows desktop is the dominant stability pain.** Memory/process growth (#51649, #42484), renderer crashes (#48938), sandbox ACL/env issues (#56264, #56078), and Dot/`read_thread` regressions (#50329, #51731) combine into an environment that paying users describe as work-disrupting.
- **Quota and capacity messaging erodes trust.** "At capacity" on all models (#56328, #55746) plus perceived fast quota drain (#51088) leaves users unable to plan usage or reconcile with what they pay.
- **State is opaque to the agent itself.** Daybreak state (#56352, #55702), AGENTS.md delivery (#56176), and PR-published claims (#56282) all point to the same underlying gap: the agent can't reliably self-report its own effective configuration or environmental state.
- **Cross-process/session inconsistencies.** Auth token refresh races (#24663), unlinked-inode rollout writes (#38149), and app-server startup failures (#50978) indicate brittleness in multi-process and long-lived session paths.
- **Unattended cloud/browser flows break on auth boundaries.** #56208 (`ERR_BLOCKED_BY_CLIENT`), #54693 (credential recovery loop), #54323 (DNS in Work Cloud) — users building "leave it running" workflows hit friction specifically at authentication/network layers, not at reasoning layers.
- **App unification regressions.** #31925, #55783, #40581 — moving ChatGPT and Codex into a single app surface continues to produce cross-view leakage and missing affordances.
- **BYOK + Work mode blocking (#54841)** is the sharpest single pain: a paid configuration where the primary action (submitting a message) is unavailable.

---

*Digest compiled from `github.com/openai/codex` data for 2026-10-23. Item counts: 30 top issues, 20 top PRs, 17 discussions.*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-10-23

## 1. Today's Highlights

Today's activity is dominated by agent reliability work: a P1 subagent bug (#22323) reports MAX_TURNS exhaustion being silently reported as `GOAL` success, while several P1/P2 fixes land in PRs around resumed-chat workspace state, credential-store atomicity, and MCP tool discovery timeouts. The nightly `v0.67.0-nightly.20261023.ga713410ab` shipped with fixes for token usage metadata preservation and thought signatures on function-call turns. Community attention remains concentrated on subagent observability, browser/agent hangs, and AST-aware codebase tooling.

## 2. Releases

**v0.67.0-nightly.20261023.ga713410ab** ([PR #29887](https://github.com/google-gemini/gemini-cli/pull/29887))
- `fix(a2a-server,core)`: preserve extended token usage metadata and align per-turn reporting ([PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834))
- `fix(core)`: ensure all model turns with function calls receive thought signatures

## 3. Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent MAX_TURNS reported as GOAL success (P1, 13 comments)** — The `codebase_investigator` subagent claims success after hitting its turn limit without analyzing anything. This is the most-commented issue today and strikes at the core of agent trust: users cannot distinguish real completion from silent truncation. Tagged `status/need-retesting`.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs forever (P1, 8 comments, 8 👍)** — Simple tasks like folder creation hang indefinitely when deferred to the generalist agent; disabling subagent deferral works around it. The high 👍 count signals broad impact.

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-dependency OS sandboxing + post-execution intent routing (P2, 9 comments)** — Proposes letting Gemini 3 lean into its native bash affinity safely. A significant architectural direction for agent capability and security.

4. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini underuses skills and sub-agents (P2)** — Anecdotal but credible: the model ignores custom skills unless explicitly told. Directly relevant to the value proposition of the subagent system.

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — Assess AST-aware file reads/search/mapping (P2, EPIC)** — Tracks whether AST-aware tooling reduces misaligned reads and token noise. See also [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) and [#22747](https://github.com/google-gemini/gemini-cli/issues/22747).

6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland (P1)** — Browser agent reports `GOAL` termination despite failure; a Linux-desktop blocker for the browser agent workstream.

7. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) — Browser Agent ignores `settings.json` overrides (P2)** — `AgentRegistry` reads settings correctly but the browser agent discards them, including `maxTurns`. Configuration that silently does nothing erodes user trust.

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error with >128 tools (P2)** — Agent should scope/limit tools rather than erroring. Becomes more urgent as MCP servers multiply tool counts.

9. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Agent should discourage destructive behavior (P2)** — Reports of `git reset` / `--force` used where safer alternatives exist. Safety-adjacent and likely to grow in priority.

10. **[#21763](https://github.com/google-gemini/gemini-cli/issues/21763) — `/bug` report omits subagent context (P1)** — Bug reports only capture the main session, undermining triage of subagent issues. Pairs naturally with [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) (subagent trajectory visibility via `/chat share`).

Also notable: [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) (symlinked agent files not recognized), [#22465](https://github.com/google-gemini/gemini-cli/issues/22465) (hang on Vite interactive prompt), [#18836](https://github.com/google-gemini/gemini-cli/issues/18836) (file-based persistent task tracking to replace `WriteToDo`).

## 4. Key PR Progress

1. **[#29890](https://github.com/google-gemini/gemini-cli/pull/29890) — Restore workspace directories only after successful resume** — Fixes a state-leak where failed `resumeChat` left the session's directories permanently in workspace context (fixes #29864).

2. **[#29859](https://github.com/google-gemini/gemini-cli/pull/29859) — Show executing subagent tool calls in the task tree (P2)** — Subagent tool calls currently vanish from the UI while executing; this keeps `executing`-status calls visible.

3. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765) — Atomic, serialized file credential store writes** — Prevents silent credential loss under concurrent writes and lockouts from interrupted writes. Important reliability fix for `FileKeychain` users.

4. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767) — Bound MCP `tools/list` discovery with a 60s default timeout (P1)** — A non-responsive MCP server previously stalled discovery for 10 minutes (inherited from the tool-call timeout in #14375). Fixes #28355.

5. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762) — Preserve disk edits when changing authentication (P1)** — Stops settings writes from clobbering edits made after CLI startup.

6. **[#29761](https://github.com/google-gemini/gemini-cli/pull/29761) — Stop `$` patterns corrupting prompt templates and `{{args}}` (P2)** — `String.replace` replacement-pattern semantics (`$&`, `$$`, etc.) were silently mangling file contents and edit instructions.

7. **[#29771](https://github.com/google-gemini/gemini-cli/pull/29771) — Only auto-nudge genuinely empty continuations** — Tightens the fire-and-forget "empty response" nudge to avoid spurious nudges and awaits it properly.

8. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838) — Resolve relative paths against active IDE workspace root (P1)** — Affects `WriteFileTool`, `EditTool`, `ReadFileTool`, and `correctPath`; fixes writes going to the wrong project root in IDE sessions.

9. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880) — Add `gemini models` command and `--list-models` flag** — Programmatic model discovery in JSON or human-readable form. Useful for scripting and CI.

10. **[#29884](https://github.com/google-gemini/gemini-cli/pull/29884) — Trust Termux system paths for ripgrep resolution** — Fixes `grep_search` on Android/Termux where `pkg install ripgrep` binaries were rejected (fixes #21836).

Other notables: [#29764](https://github.com/google-gemini/gemini-cli/pull/29764) (Claude Code `SubagentStop` hook migration), [#29763](https://github.com/google-gemini/gemini-cli/pull/29763) (unhandled rejection in `scheduleToolCalls`), [#29883](https://github.com/google-gemini/gemini-cli/pull/29883) (Thai/Lao SARA AM display width), [#26686](https://github.com/google-gemini/gemini-cli/pull/26686) (git submodule support in extension installs).

## 5. Hot Discussions

No Discussions data was provided in this dataset, so this section is omitted.

## 6. Feature Request Trends

1. **Subagent observability and control** — Almost half the top issues touch subagent behavior: trajectory visibility ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), bug-report context ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), settings overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), symlink-based discovery ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)), and discovery via `settings.json` ([#18285](https://github.com/google-gemini/gemini-cli/issues/18285)).

2. **Token efficiency and surgical context** — AST-aware reads/search ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#22747](https://github.com/google-gemini/gemini-cli/issues/22747)) and "Tactful Extraction" ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561)) aim to cut the ~36.6k-token baseline and avoid firehose reads.

3. **Persistent, file-based task tracking** — [#18836](https://github.com/google-gemini/gemini-cli/issues/18836) and [#21000](https://github.com/google-gemini/gemini-cli/issues/21000) push to replace in-context `WriteToDo` with CRUD-backed tracking to survive context rot and session boundaries.

4. **Safety and sandboxing** — Zero-dependency OS sandboxing ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)) and discouraging destructive git/DB commands ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).

5. **Broader platform support** — Termux/Android ripgrep resolution ([#29884](https://github.com/google-gemini/gemini-cli/pull/29884)), Wayland browser agent ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), and terminal rendering correctness (Thai/Lao width in [#29883](https://github.com/google-gemini/gemini-cli/pull/29883)).

## 7. Developer Pain Points

- **Silent failures and misleading status** — The recurring theme across [#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21409](https://github.com/google-gemini/gemini-cli/issues/21409), and [#21983](https://github.com/google-gemini/gemini-cli/issues/21983): agents either hang or report `GOAL` success when they have not succeeded. This is the single most damaging category for user confidence.
- **Configuration that does not take effect** — `settings.json` overrides ignored by the browser agent ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) and settings writes clobbering disk edits ([#29762](https://github.com/google-gemini/gemini-cli/pull/29762)) erode trust in configuration.
- **Interactive prompts break automation** — Vite's interactive prompt hangs the CLI ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)); related crashes on long output hooks ([#22186](https://github.com/google-gemini/gemini-cli/issues/22186)).
- **Workspace pollution** — Models write temp scripts to arbitrary directories ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)), complicating clean commits.
- **Real-world MCP and credential reliability** — 10-minute discovery stalls on dead MCP servers ([#29767](https://github.com/google-gemini/gemini-cli/pull/29767)) and potential credential loss from non-atomic writes ([#29765](https://github.com/google-gemini/gemini-cli/pull/29765)) are the kind of infrastructure bugs that quietly hurt production users.
- **Terminal rendering fidelity** — Flicker on resize ([#21924](https://github.com/google-gemini/gemini-cli/issues/21924)) and CJK/Thai/Lao width mismatches remain persistent quality-of-life complaints.

---

*Note: The dataset spans issues created between February and March 2026, all updated on 2026-10-23; only the release and a subset of PRs carry same-day creation timestamps.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-23

## 1. Today's Highlights

A new patch release (**v1.0.103**) ships fixes for clipboard fidelity, sandbox flag handling in ACP sessions, and reconnect resilience. Meanwhile, the issue tracker is dominated by **MCP authentication problems** across Windows and ACP mode, plus **newly discovered permission and safety gaps** where trusted folders or background agents can bypass intended guardrails. Community requests for a **stable release channel** continue to gain traction as the rapid release cadence introduces regressions.

## 2. Releases

### v1.0.103 (2026-10-22)
- Clicking a completed response code block now copies its original code when enabled.
- ACP sessions now honor saved sandbox settings and `--sandbox`/`--no-sandbox` flags, including on resume.
- Cloud replies retain full text when the CLI reconnects after a dropped connection.
- Sessions browser improvements (notes truncated).

🔗 https://github.com/github/copilot-cli/releases

## 3. Hot Issues

1. **#5232 — Trusted folders silently auto-approve shell execution in `manual` mode** ([link](https://github.com/github/copilot-cli/issues/5232))
   Path-based gating can't reason about side effects — the agent ran `powershell.exe -NoProfile` from a trusted path with no prompt. High-severity safety concern; freshly filed and already drawing attention.

2. **#3013 — Hooks don't fire for background/task agents** ([link](https://github.com/github/copilot-cli/issues/3013)) *(CLOSED)*
   Long-standing security gap where sub-agents bypass hook-based command blocking. Closure after six months suggests a fix landed, but the pattern (agent bypass) remains a theme.

3. **#5242 — Sessions stop processing when MCP config watch hits inotify limit (ENOSPC)** ([link](https://github.com/github/copilot-cli/issues/5242))
   `copilot --server` on shared hosts abandons the session queue after one retry. Relevant to anyone running Copilot CLI in containers.

4. **#5233 — Remote MCP OAuth: expired token resent instead of refreshed** ([link](https://github.com/github/copilot-cli/issues/5233))
   After an HTTP 401, the client keeps replaying the same expired token every ~few seconds without hitting the token endpoint.

5. **#5229 — ACP mode ignores stored refresh tokens for MCP OAuth** ([link](https://github.com/github/copilot-cli/issues/5229))
   Goes straight to a browser authorization page despite a valid refresh token. Related to #5233 — a cluster of MCP auth issues.

6. **#5236 — Windows Entra broker token cache stays 0 bytes after MCP sign-in** ([link](https://github.com/github/copilot-cli/issues/5236))
   Every new process re-prompts for account selection; `/restart` works around it only within the same process.

7. **#5234 — Windows CLI unusable when a configured MCP server needs auth** ([link](https://github.com/github/copilot-cli/issues/5234))
   Raw escape codes and misleading "Please use /login" message until the MCP server is authenticated externally. Severe UX regression on Windows.

8. **#5133 — `includeCoAuthoredBy: false` ignored in ACP mode** ([link](https://github.com/github/copilot-cli/issues/5133))
   Commits still receive `Co-authored-by: Copilot` trailers under `--acp`, while `copilot -p` respects the setting. Config-parity bug with real repo-history implications.

9. **#5197 — Voice server segfault on WSL2 since 1.0.100** ([link](https://github.com/github/copilot-cli/issues/5197))
   `signal 11` on startup leaves `/voice` stuck on "Fetching voice models." Regression tied to the new voice runtime in 1.0.100.

10. **#5203 — Feature request: stable release channel** ([link](https://github.com/github/copilot-cli/issues/5203))
    Community asks for stable/beta channels to avoid regressions breaking daily work — sentiment that echoes across many recent issues.

## 4. Key PR Progress

No pull requests were updated in the last 24 hours. *(Section omitted per data.)*

## 5. Hot Discussions

No Discussions data was provided. *(Section omitted.)*

## 6. Feature Request Trends

- **Release channel management** — #5203 asks for a stable channel; #5228 highlights friction from the redesigned Sessions browser becoming default. Users want predictability over velocity.
- **Model selection control** — #5231 requests excluding unreliable models from Auto selection; #5241 and #5219 show custom-agent model/reasoning-effort settings not being applied (including subagent fallback budgets causing full-turn failures).
- **Voice configurability** — #5226 asks for a fixed transcription language instead of hard-coded `"auto"`, important for non-English users.
- **Terminal UX** — #5227 requests a pin-to-top input box (ergonomics for long sessions); #2750 (closed) asked for keyboard-based scrolling.
- **MCP auth lifecycle** — Multiple requests map to one direction: correct refresh-token use, persistent credential caches, and non-blocking auth prompts (#5229, #5233, #5236, #5234).
- **Localized secret handling** — #4065 wants less aggressive redaction that preserves legitimate content like `${env.AUTH_TOKEN}` in spec files.

## 7. Developer Pain Points

- **MCP OAuth is the biggest cluster today** — Windows broker caches (#5236), ACP refresh-token bypass (#5229), token resend loops (#5233), and unusable TUIs on auth-required servers (#5234). The unified theme: refresh tokens exist but aren't used, and auth states don't persist across processes.
- **Agent permission bypasses** — Hooks not firing for sub-agents (#3013) and trusted-folder auto-approval (#5232) erode confidence in the permission model. Both framed explicitly as security issues.
- **Custom agent config not honored** — Model and reasoning-effort frontmatter silently ignored (#5241), and unknown model IDs cause prompt-budget failures that wedge sessions (#5219). Combined with plugin agent MCP cancellations (#5237), custom agents feel second-class.
- **Configuration parity gaps** — Settings respected in one mode but ignored in another (`includeCoAuthoredBy` in ACP, sandbox flags pre-1.0.103). Users are effectively re-discovering which mode honors which setting.
- **Environment fragility** — Proxy-only `web_fetch` DNS failures (#5230), Linux sandbox DNS with `systemd-resolved` (recently fixed, #5027), and inotify budget exhaustion (#5242) show the CLI struggles in constrained enterprise/container environments.
- **Cost and context surprises** — The 50-image cache limit triggers full cache refills on each eviction after image 51 (#5238), producing "very, very expensive" sessions.
- **Regressions on the bleeding edge** — Voice segfault since 1.0.100 (#5197) and macOS TTY breakage (#5240) reinforce the stable-channel ask.

---
*Digest generated from github.com/github/copilot-cli activity on 2026-10-23. Links reflect source issue URLs.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-10-23

## 1. Today's Highlights

A quiet release day: `v1.19.4` is a maintenance bump that upgrades the bundled Bun runtime to 1.4.4, pulling in security fixes across Brotli, TLS, HTTP/1.1–3, WebSocket, and `fetch`, plus updated root certificates (NSS 3.131.1) — a recommended upgrade for anyone exposing OpenCode over the network. Issue activity remains dominated by the V2 migration: model picker capability gaps, session titling regressions, provider registration failures, and permission-boundary concerns are recurring themes. On the PR side, core maintainer `rekram1-node` landed a large batch of MCP lifecycle and model-default fixes, while a community PR re-lands Brave Search as a built-in websearch provider.

---

## 2. Releases

### v1.19.4
**Core — Improvements**
- Upgraded the bundled Bun runtime to **1.4.4**, which includes [security fixes](https://bun.com/blog/bun-v1.4.4#security) for Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket, and `fetch`
- Updated root certificates to **NSS 3.131.1**

No behavioral or API changes in this release — it is a runtime/security maintenance drop.

---

## 3. Hot Issues

1. **[#2242 — Is there a way to sandbox the agent?](https://github.com/anomalyco/opencode/issues/2242)** (OPEN · 101 comments · 👍 80)
   The single most-discussed open issue. Users want filesystem confinement for agent terminal commands, comparing against `seatbelt` in gemini-cli/codex-cli. The sustained comment volume and high reaction count make this the clearest signal for a first-class sandboxing story.

2. **[#52083 — Compound shell commands drop redirection, turning an allowed command into an unprompted file write](https://github.com/anomalyco/opencode/issues/52083)** (OPEN · 4 comments)
   A security-relevant permission bypass: the command scanner splits chained commands but omits redirection targets from evaluated resources. Pairs directly with #2242 and should be prioritized regardless of the sandbox roadmap.

3. **[#50652 — External plugin tools bypass configured permissions](https://github.com/anomalyco/opencode/issues/50652)** (OPEN · 3 comments · 👍 2)
   Plugin-registered tools execute without applying their configured permission action, including via Code Mode. Extends the permission-model concerns beyond built-in shell handling.

4. **[#50257 — Desktop model picker shows "No reasoning" for all V2 models](https://github.com/anomalyco/opencode/issues/50257)** (OPEN · 15 comments)
   `capabilities.reasoning` is never set, so the tooltip mislabels every reasoning-capable V2 model. Cosmetic but highly visible; 15 comments indicate broad impact across the desktop user base.

5. **[#51828 — Location inactivity eviction SIGTERMs live background shells after 60 minutes](https://github.com/anomalyco/opencode/issues/51828)** (OPEN · 6 comments)
   `locations.invalidate()` tears down the location-scoped Shell/Pty graph while the service process stays alive. Long-running background work dies silently — a serious correctness issue for agentic workflows.

6. **[#58176 — Session titles never generated in v2](https://github.com/anomalyco/opencode/issues/58176)** (OPEN · 3 comments · reproduced)
   No auto-trigger plus free-tier rejection means new sessions stay "Untitled session," a clear regression from v1.18.x. Low-severity individually, but a visible quality regression for all V2 users.

7. **[#58335 — Console account connected but `opencode` provider never registers](https://github.com/anomalyco/opencode/issues/58335)** (CLOSED · 3 comments)
   Console returns 52 models, yet `/api/provider` omits `opencode` and `/api/model` has zero `opencode/*` entries. A blocker for Console users on v2.1.3.

8. **[#47646 — ChatGPT OAuth reports 400k context for long-context models](https://github.com/anomalyco/opencode/issues/47646)** (CLOSED · 15 comments)
   OpenCode overwrites effective context limits (~1.05M catalog) with 400,000 tokens, causing the TUI to overstate headroom and degrade compaction decisions. Now closed, but high engagement.

9. **[#56783 — V2: compaction fires on first request / loops when `compaction.buffer` ≥ context limit](https://github.com/anomalyco/opencode/issues/56783)** (CLOSED · 2 comments · reproduced)
   Misconfiguration produces meaningless structured summaries at session start and repeating `Session…` internal errors. Worth a guard/validation in config loading.

10. **[#58327 — Custom websearch providers cannot signal rate limits](https://github.com/anomalyco/opencode/issues/58327)** + **[#58328 — Re-land Brave as a built-in provider](https://github.com/anomalyco/opencode/issues/58328)** (OPEN)
    Two same-day issues from one author: built-in providers participate in 429 → `Retry-After` → failover, but plugin-registered providers via `ctx.websearch.transform` have no way to signal throttling. #58328 also flags a process gap — PR #48222 was stale-bot-closed without review.

---

## 4. Key PR Progress

1. **[#58355 — fix(core): use the agent's model when a session has none](https://github.com/anomalyco/opencode/pull/58355)**
   Honors `agents.<id>.model` / agent frontmatter for `opencode run` and `run --agent`, which previously always used the server default. Fixes a long-standing headless/CLI inconsistency.

2. **[#58352 — fix(core): default to agent and last used model when none is selected](https://github.com/anomalyco/opencode/pull/58352)**
   Prevents `opencode run` from silently landing on the newest released model across all providers (currently `opencode/flint-40b-free`) — a real cost-correctness fix for paid users.

3. **[#58351 — fix(core): stop MCP servers in parallel on shutdown](https://github.com/anomalyco/opencode/pull/58351)**
   Serial shutdown cost 2–4s per uncooperative local server, blowing the ~5s restart budget. Fixes #50758.

4. **[#58350 — fix(core): skip malformed MCP tools instead of failing the server](https://github.com/anomalyco/opencode/pull/58350)**
   Validates each tool individually so one bad `inputSchema` no longer fails the whole `tools/list` and marks the server as failed at connect time.

5. **[#58349 — fix(core): don't duplicate MCP servers started during initial reconciliation](https://github.com/anomalyco/opencode/pull/58349)**
   Fixes a startup race where a queued launch still runs after `connect()`/`disconnect()` completes, spawning a second copy. Fixes #52741.

6. **[#58342 — fix(core): keep MCP OAuth login waiting after stray callback requests](https://github.com/anomalyco/opencode/pull/58342)**
   Loopback callback no longer treats code-less requests (e.g. Chrome PNA preflights) as fatal auth failures. Fixes #55201 and unblocks Chrome-on-Linux MCP auth.

7. **[#58341 — fix(core): keep remote MCP requests open past Bun's fetch idle timeout](https://github.com/anomalyco/opencode/pull/58341)**
   Remote MCP calls silent >5 min now survive instead of failing at Bun's idle timeout, far ahead of OpenCode's 12h MCP execution timeout.

8. **[#58344 — fix(ai): fold long Mistral-family tool call IDs over the whole ID](https://github.com/anomalyco/opencode/pull/58344)** (and related **#58339**)
   Mistral's 9-char ID cap was truncating rather than folding, causing prefix collisions for GLM and other models behind mistral-prefixed routes. Fixes #58323.

9. **[#58334 — feat(core): add Brave web search](https://github.com/anomalyco/opencode/pull/58334)**
   Re-lands #48222 (Brave as a built-in websearch provider) after the original was closed by stale-PR automation without review. Closes #58328.

10. **[#58346 — fix(core): refresh DigitalOcean routers while signed in](https://github.com/anomalyco/opencode/pull/58346)**
    Restores router discovery mid-session (removed in #57175 to stop signed-out polling) without re-introducing the every-5-minutes-everywhere behavior.

Also worth watching: **[#58343 — fix(desktop): follow up dev server split](https://github.com/anomalyco/opencode/pull/58343)** (dev-channel builds get their own DB; adds a Home hint for migrating dogfooders), **[#57470 — clipboard images via Windows interop on WSL](https://github.com/anomalyco/opencode/pull/57470)**, and **[#58347 — use `/usr/local/etc/opencode` on FreeBSD](https://github.com/anomalyco/opencode/pull/58347)**.

---

## 5. Hot Discussions

No Discussions data was provided in the source material; this section is omitted.

---

## 6. Feature Request Trends

Distilled from Issues and PRs updated in the last 24h:

- **Agent sandboxing and permissions hardening** — #2242 (sandbox mode), #52083 (redirect bypass), #50652 (plugin permission bypass). This is now a cluster, not a single ask, and the top comment/reaction issue overall.
- **Websearch provider flexibility** — #58327 and #58328 both target the same subsystem: custom providers need rate-limit signaling, and built-in Brave should be re-landed.
- **Model/execution configuration surface** — #58330 requests a model execution location toggle alongside existing API key permissions; #54881 requests a root session ID header on LLM requests for sub-agent attribution.
- **Usage observability** — #57975 proposes a unified real-time usage dashboard across all AI models, motivated by unclear free-tier limits; #58014 reports free-limit exhaustion after only a few requests, suggesting the demand is partly driven by counting ambiguity.
- **UI/UX polish** — #58034 (configurable timestamp format in desktop/web), #51868 (unreviewed zh machine translations plus 93 missing keys of 1828), #56109 (Windows `/cd` tab-completion appends backslash).

---

## 7. Developer Pain Points

- **V2 migration regressions dominate the issue tracker.** Session titling (#58176), provider registration (#58335), compaction loops (#56783), and model capability display (#50257) are all V2-specific and all user-visible. Several are already labeled `reproduced`.
- **Permission model is inconsistent across surfaces.** Built-in shell, plugin tools, and Code Mode each behave differently; #52083 and #50652 both describe silent bypasses. Trust in the permission system is the underlying complaint, not any single bug.
- **MCP lifecycle is fragile at the edges.** Startup duplication (#58349), serial shutdown stalls (#58351), malformed-tool server failure (#58350), OAuth callback misclassification (#55201), and Bun fetch idle timeouts (#58341) are five distinct failure modes on one subsystem — the same-day cluster of core PRs reads as a deliberate hardening pass.
- **Documentation/catalog drift.** #55904 (retired Exo and MiMo V2.5 models still advertised), #50405 (`location` vs `path` in the plugins guide), and #51868 (untranslated/mistranslated zh strings) share a root cause: docs and locale catalogs lag the shipping product.
- **Process friction in the contribution pipeline.** #58328 explicitly calls out a fully implemented PR (#48222) that was closed by stale-bot automation without ever being reviewed on its merits — a case where the review process, not the code, is the bottleneck.
- **Windows/FreeBSD platform gaps.** #56109 (backslash on `/cd` completion), #57470 (WSL clipboard), and #58347 (FreeBSD config path) show non-macOS/Linux platforms still need targeted fixes rather than falling out of the main development loop.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-10-23

## 1. Today's Highlights

Today's activity is dominated by a cluster of **TUI/performance and correctness fixes** landing in quick succession: HTML export stack-overflow fixes, fuzzy-search ranking improvements, and macOS shell-group termination races all got PRs. Meanwhile, the **startup-time budget debate (#7739)** continues as the most-commented open issue, signaling growing competitive pressure from rival harnesses like jcode. A notable cluster of **closed-as-no-action** issues (HTML comment stripping, `/reload` for AGENTS.md, MCP OAuth client names) suggests maintainers are triaging aggressively but declining scope creep.

---

## 2. Releases

No new releases in the last 24 hours.

---

## 3. Hot Issues

1. **[#7739 OPEN] Startup-time budget targeting jcode-comparable latency and memory** — 11 comments
   The single most active issue. Proposes a formal startup-time budget for Pi, benchmarked against jcode v0.9.1888-dev. This is a strategic signal: the community is treating competitor benchmarks as a north star. Worth watching for roadmap impact.
   https://github.com/earendil-works/pi/issues/7739

2. **[#6167 CLOSED] `transformMessages` thinking-block normalization vs. `requiresReasoningContentOnAssistantMessages`** — 10 comments
   A subtle compatibility-flag interaction bug that took months to resolve. Demonstrates how fragile cross-provider reasoning-content handling remains as a class of bugs.
   https://github.com/earendil-works/pi/issues/6167

3. **[#9932 OPEN] `before_agent_start` forced system prompt keeps removed tools** — 6 comments
   Extension lifecycle ordering bug: `setActiveTools()` removals are lost when a system prompt is forced. High-value for extension authors building constrained agents.
   https://github.com/earendil-works/pi/issues/9932

4. **[#10259 OPEN] Public tool-presentation API or one-line tool mode** — 5 comments, 👍2
   Requests a display-only API to control all tool rows (built-ins, MCP, codemode, custom). Strong extension-ecosystem signal.
   https://github.com/earendil-works/pi/issues/10259

5. **[#11223 OPEN] `modelOverrides` silently ignored for classifier models** — 5 comments
   Config silently ignored — a dangerous class of bug. Users discover it only when behavior doesn't match docs.
   https://github.com/earendil-works/pi/issues/11223

6. **[#9807 OPEN] TUI full re-render causes scroll/typing lag at 800+ messages** — 5 comments, 👍3
   Performance regression with high user agreement. Root cause is lack of incremental cell-level diffing (contrasted with OpenCode's OpenTUI).
   https://github.com/earendil-works/pi/issues/9807

7. **[#11086 OPEN, prio:p0] Symbols leaking into input on Windows terminal under CPU load** — 4 comments
   P0-tagged input corruption. Nasty reproducibility profile (SSH + client CPU load) makes it hard to chase but high-impact.
   https://github.com/earendil-works/pi/issues/11086

8. **[#11259 CLOSED] WSL bracketed-paste from Windows Terminal drops image paste** — 3 comments
   Closed, but representative of the growing WSL/Windows interop pain surface.
   https://github.com/earendil-works/pi/issues/11259

9. **[#11172 OPEN] Split mouse report tail leaks into prompt** — 2 comments
   Escape-timeout half-flush bug in StdinBuffer. Low comment count but a clean minimal repro that likely affects editor input robustness broadly.
   https://github.com/earendil-works/pi/issues/11172

10. **[#11253 OPEN, fix-available] `forkFrom` writes one appendFileSync per entry** — 2 comments
    73 MB / 3,322-entry session took >30s to fork, breaking host handshake. "Fix available" tag means maintainer bandwidth is the only blocker.
    https://github.com/earendil-works/pi/issues/11253

---

## 4. Key PR Progress

1. **[#11309 OPEN] Await extension user messages** — `muyiyr`
   Returns the underlying promise from extension `sendUserMessage` so command handlers can await the generated turn. Includes a regression test for #11238.
   https://github.com/earendil-works/pi/pull/11309

2. **[#11304 OPEN] Start when a configured package fails to install** — `Lincoln504`
   Prevents a bad package from aborting startup; failures surface via the extension warning channel. Big resilience win for multi-package setups.
   https://github.com/earendil-works/pi/pull/11304

3. **[#11296 CLOSED] Rank contiguous fuzzy matches; search session fields separately** — `petrroll`
   Fixes the `/model opus` ranking weirdness (#11220) and closes three related issues. Changes fuzzy scoring to prefer contiguous, substring-aligned matches.
   https://github.com/earendil-works/pi/pull/11296

4. **[#11293 CLOSED] Render HTML export for sessions deeper than the call stack** — `petrroll`
   Replaces recursive tree walks in the export viewer with iterative stacks. Long sessions no longer render blank.
   https://github.com/earendil-works/pi/pull/11293

5. **[#11290 CLOSED] Render system messages in HTML export** — `petrroll`
   Fixes #11261: system entries (initial prompt and section updates) now appear in exports, plus CLI `--export` surfaces prompt and tools.
   https://github.com/earendil-works/pi/pull/11290

6. **[#11289 CLOSED] Stop macOS shell groups before killing them** — `petrroll`
   Closes the abort-race (#11252) where `a; b` could still run `b`. Linux/Windows paths unchanged; kill fallbacks preserved.
   https://github.com/earendil-works/pi/pull/11289

7. **[#11288 OPEN] Write forked session through one fd** — `robopipi[bot]`
   Fixes the O(N) open/close on `forkFrom` for large sessions (#11253). Bot-authored but touches a real correctness/perf issue.
   https://github.com/earendil-works/pi/pull/11288

8. **[#11278 CLOSED] Preserve `ctx.ui` getters through `wrapUIPromptContext`** — `ljm15913101281`
   Object-spread was evaluating `get theme()` at bind time, breaking late theme initialization in hosts like pi-web.
   https://github.com/earendil-works/pi/pull/11278

9. **[#11275 CLOSED] Avoid deep export tree stack overflow** — `muyiyr`
   Parallel fix to #11293; landed the same day with a 20,000-entry regression test.
   https://github.com/earendil-works/pi/pull/11275

10. **[#10528 OPEN] Refactor Nix packaging** — `ReStranger`
    Slims `package.nix` (drop `*.map`, `*.d.ts`), uses `makeBinaryWrapper`, skips version check under Nix. Still open, worth tracking for the Nix distribution.
    https://github.com/earendil-works/pi/pull/10528

---

## 5. Hot Discussions

**Show and tell**

- **[#11307] `pi-better-web-search` — one web_search tool, raw provider results, real cross-provider fallback**
  Extracts the web-search tool from `pi-web-search` to fix two gripes: rewritten results and no fallback when the current model can't search.
  https://github.com/earendil-works/pi/discussions/11307

- **[#11306] `pi-continuity` — auto-resume after coding-plan usage limits and interrupted turns**
  Automates the "come back in 5 hours and type continue" loop for OpenAI 5-hour limits. Complements existing transient-error retries and compaction.
  https://github.com/earendil-works/pi/discussions/11306

*(No Ideas or Q&A discussions in the last 24h.)*

---

## 6. Feature Request Trends

- **Extension observability & presentation APIs** — #10259 (public tool-presentation API), #11090 (preserve model attribution for auxiliary token usage), #7828 (message identity in markdown transformer context). Extension authors want deeper hooks with less guessing.
- **Startup / runtime performance** — #7739 (startup budget vs. jcode), #9807 (TUI re-render lag), #11253 ("fix-available" fork slowness). Perf is now a competitive narrative, not just polish.
- **Cross-harness compatibility & config fidelity** — #11250/#11251 (HTML comment stripping to match Claude Code), #10226 (MCP OAuth client name), #11223 (modelOverrides honoring). Users want Pi to behave the way other tools do.
- **Session lifecycle control** — #11292/#11291 (reload AGENTS.md mid-session), #11295 (provider-scoped auto-compaction with absolute thresholds). Fine-grained control over what's loaded and when.
- **Auto-compaction configurability** — #11295 and related discussion of per-provider thresholds.

---

## 7. Developer Pain Points

- **Input/terminal edge cases dominate bug reports.** Windows symbol leakage under CPU load (#11086), WSL bracketed-paste image drops (#11259), split-escape mouse reports (#11172), macOS abort races (#11252). The TUI input layer is the highest-friction surface.
- **Silent failures erode trust.** `modelOverrides` ignored (#11223), missing `checkpointWhen` crashing only at first commit (#11305), uncaught `No API provider registered` mid-session (#11287). Errors that don't surface until much later are the most painful class.
- **Long sessions break rendering and forking.** Stack overflows in HTML export (#11225), full re-renders in TUI (#9807), and O(N) `forkFrom` I/O (#11253) all share a root cause: data structures that don't scale past ~1k–3k entries.
- **Extension/agent lifecycle ordering is fragile.** #9932 (tool removal lost when forcing system prompt) and #11278 (getters evaluated at bind time) show that init-order assumptions leak into public APIs.
- **Docs vs. reality gaps.** #11223 and #11282 both cite docs or the website promising behavior that doesn't match shipped code or public repositories.
- **Triaging pace vs. scope creep.** Nine issues closed as `[no-action]` today alone (HTML comments, `/reload`, MCP OAuth names) — maintainers are declining small compatibility asks to protect the core, which some contributors will read as "not listening."

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-10-23

## 1. Today's Highlights

A new `v0.26.0-nightly.20261022.bf66a26c97` build landed, headlined by daemon token persistence in `qwen serve`. Meanwhile, the community is converging on **session/workspace management** as the dominant theme — terminology standardization, per-session working directories, and sidebar UX — alongside a cluster of P1 correctness bugs around truncated tool calls and lost tool results on Windows.

## 2. Releases

**v0.26.0-nightly.20261022.bf66a26c97** ([release notes](https://github.com/QwenLM/qwen-code/releases))
- `feat(serve)`: add daemon token persistence ([#15023](https://github.com/QwenLM/qwen-code/pull/15023) by @wenshao) — tokens survive daemon restarts, a prerequisite for durable session management.
- `fix(release)`: cover every spawned vendored binary — closes a packaging gap where some shipped binaries were not exercised during release verification.

## 3. Hot Issues

1. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078)** — *Daily dependency CVE audit failed* (29 comments, still open since 09-30). The bot-tracked audit keeps failing, suggesting either a persistent high-severity advisory or an unavailable npm audit endpoint. Longest-running thread of the day; worth watching for supply-chain hygiene.

2. **[#13787](https://github.com/QwenLM/qwen-code/issues/13787)** — *XML recovery repeats prefix scans on large multi-call responses*. Performance regression with a reproducible benchmark on `main`; matters because response sizes grow with multi-tool workflows. Community supplied a direct-parser reproduction.

3. **[#15165](https://github.com/QwenLM/qwen-code/issues/15165)** — *Shell safety parser triggers ~1.6 GiB transient WASM allocation on Node 24.16.0*. A memory spike from V8 optimizing the bundled Bash WASM parser. High-impact for CI/container users with constrained memory.

4. **[#15248](https://github.com/QwenLM/qwen-code/issues/15248)** — *ci(sdk-java): runtime broker timing tests flake 3/3 on GitHub-hosted runners*. Flaky tests block the fork PR fast lane — a contributor-experience problem that directly impedes outside contributions.

5. **[#15310](https://github.com/QwenLM/qwen-code/issues/15310)** — *Tell the model which shell it uses, instead of letting it assume bash*. On Windows, Qwen Code uses `cmd.exe` but the prompt implies POSIX, so commands fail. Simple, high-leverage fix with a clear repro.

6. **[#15297](https://github.com/QwenLM/qwen-code/issues/15297)** — *Qwen Code 0.26.0 loses tool output in ~1 of 40 calls* (P1). 43 instances / 1,663 calls, 28 confirmed via transcripts. Tool runs successfully but no `functionResponse` reaches the model — a serious correctness issue causing forced re-reads.

7. **[#15324](https://github.com/QwenLM/qwen-code/issues/15324)** — *bug(acp): edit truncated by `max_tokens` is written to disk* (P1). A partial `write_file` is executed and reported as success. Affects Zed, the VS Code companion, and `qwen serve` — potential data-corruption class bug.

8. **[#15327](https://github.com/QwenLM/qwen-code/issues/15327)** — *tracking(core): run every surface on one agent loop behind `experimental.unifiedAgentLoop`* (P1). Proposes consolidating the duplicated agent loops (Ink vs. OpenTUI vs. ACP). Architecturally significant; see also #15326 below.

9. **[#15326](https://github.com/QwenLM/qwen-code/issues/15326)** — *OpenTUI runs tool calls from a retried attempt and does not record native tool results*. Concrete evidence of the divergence #15327 aims to eliminate — the OpenTUI loop is a separate copy in `live-session.ts`.

10. **[#15325](https://github.com/QwenLM/qwen-code/issues/15325)** — *stream-json message past `--max-session-turns` returns success with the previous answer*. Silent failure mode in SDK transport: no model request, success status, stale answer. SDK clients see this.

Also noteworthy: [#15328](https://github.com/QwenLM/qwen-code/issues/15328) (headless exits 0 with no output when truncated) and [#15077](https://github.com/QwenLM/qwen-code/issues/15077) (archived session listing + title search, now CLOSED).

## 4. Key PR Progress

1. **[#15211](https://github.com/QwenLM/qwen-code/pull/15211)** — *feat(serve): carry a scheduled-task gate through the daemon and Web Shell* (by @wenshao). Follow-up to #15069; lets scheduled tasks run a gating shell command at each fire. Core to the managed-automation story.

2. **[#15218](https://github.com/QwenLM/qwen-code/pull/15218)** — *feat(managed): gate managed automations on a Runtime probe run before the claim*. Quiet-gate semantics (`skipped/gate_quiet`) settle occurrences without a turn — efficient for no-op fires.

3. **[#15323](https://github.com/QwenLM/qwen-code/pull/15323)** — *feat(serve): allow secondary sessions to `cd` within their workspace*. Implements the sandboxed working-directory model requested in #15316, with realpath containment.

4. **[#15283](https://github.com/QwenLM/qwen-code/pull/15283)** — *feat(cli): align OpenTUI session recovery with Ink*. A large batch: owned cancellation, persistent recall, resume/branch replay, rewind, checkpoint restore. Directly addresses the OpenTUI/Ink divergence.

5. **[#15255](https://github.com/QwenLM/qwen-code/pull/15255)** — *feat(managed-agent): shared Harness pool for Kubernetes*. Opt-in pooled hosting with placement epochs and writer-grant fencing — a meaningful step toward multi-tenant scale.

6. **[#15261](https://github.com/QwenLM/qwen-code/pull/15261)** — *feat(runtime-broker): HTTP-backed external scratch workers*. Pairs with #15247: operator-run HTTP service owns worker placement; the broker persists a deterministic request handle for idempotent retries.

7. **[#15256](https://github.com/QwenLM/qwen-code/pull/15256)** — *fix(ci): reuse open workflow failure issues*. Cuts down the noise from bot-filed CI failure issues — a direct response to the volume of `Main CI failed` reports like #15307.

8. **[#15329](https://github.com/QwenLM/qwen-code/pull/15329)** — *feat(ci): switchable Linux runner fleet (hosted/arm64) via `LINUX_RUNNER_FLEET`*. Gives maintainers an arm64 lane and a cleaner escape hatch than the ECS kill switch.

9. **[#15320](https://github.com/QwenLM/qwen-code/pull/15320)** + **[#15319](https://github.com/QwenLM/qwen-code/pull/15319)** — Web Shell sidebar reorganization (by @deggs7): move *Create group* into the workspace **⋮** menu, and promote *No-workspace sessions* to a peer group. Implements the #14988 / #15312 / #15309 discussions.

10. **[#15317](https://github.com/QwenLM/qwen-code/pull/15317)** — *fix(mods): refuse values nested too deeply to cross the Mod boundary*. Adds a 512-level nesting limit for Mod→Qwen Code values, preventing unbounded recursion at the extension boundary.

## 5. Hot Discussions

No GitHub Discussions data was provided in the source dataset, so this section is omitted.

## 6. Feature Request Trends

- **Session & workspace lifecycle**: archived-session listing/search ([#15077](https://github.com/QwenLM/qwen-code/issues/15077), now closed), per-session working directories ([#15316](https://github.com/QwenLM/qwen-code/issues/15316), [#15323](https://github.com/QwenLM/qwen-code/pull/15323)), and *Unified Agent Loop* ([#15327](https://github.com/QwenLM/qwen-code/issues/15327)) all point to session management as the roadmap's center of gravity.
- **Web Shell UX & terminology**: a coordinated push to standardize on *Workspace / 工作区* and *Session / 会话* ([#14988](https://github.com/QwenLM/qwen-code/issues/14988)), relocate *Create group* ([#15312](https://github.com/QwenLM/qwen-code/issues/15312)), clarify the *No-workspace* group ([#15309](https://github.com/QwenLM/qwen-code/issues/15309)), and render full MCP tool args/results ([#15280](https://github.com/QwenLM/qwen-code/issues/15280)).
- **MCP modernization**: first-class MCP 2026-07-28 + MCP Apps support with the Web Shell as primary host ([#8968](https://github.com/QwenLM/qwen-code/issues/8968)).
- **Platform distribution & runtime**: Managed Agent Runtime Broker #15247, shared Harness pool #15255, and a cluster of `runtime-broker` work. Significant investment in hosted/multi-tenant execution.
- **Shell environment awareness**: [#15310](https://github.com/QwenLM/qwen-code/issues/15310) asks the model be told it's on `cmd.exe`; a small ask with outsized Windows impact.

## 7. Developer Pain Points

- **CI flakiness blocks external contributors.** The sdk-java broker timing tests flake on GitHub-hosted runners ([#15248](https://github.com/QwenLM/qwen-code/issues/15248)), and the fork fast lane is explicitly named as blocked. Hosted vs. self-hosted runner divergence is the root cause; #15286, #15289, and #15322 are the maintainer response.
- **Hosted-runner timeouts cascade into test budgets.** PRs #15101 and #15183 both rewrite fixed 10s waits to use a slow-host policy — evidence the hosted environment is routinely too slow for the current budgets.
- **Truncation/loss bugs are the sharpest correctness concern.** #15297 (silent tool-result loss in 0.26.0), #15324 (truncated write committed to disk), #15325 (stale success past turn limit), and #15328 (exit 0, no output) are four independent silent-failure reports in one day. The common thread: failures are invisible to the caller and reported as success.
- **Windows shell handling remains a rough edge.** #15310 (no shell context in prompt) and #15297 (Windows-specific tool-result loss) both hit Windows users disproportionately.
- **Duplicate agent loops create divergent bug surfaces.** The OpenTUI loop's behavioral drift ([#15326](https://github.com/QwenLM/qwen-code/issues/15326)) is the immediate symptom; #15327 is the proposed structural fix.
- **Bot-filed issue noise.** Multiple `Deferred review findings` and `Main CI failed` issues (#15307) are generated by automation; #15256 (reuse open failure issues) is the mitigation.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*