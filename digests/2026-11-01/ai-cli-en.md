# AI CLI Tools Community Digest 2026-11-01

> Generated: 2026-11-01 05:50 UTC | Tools covered: 7

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

### md2video-audio — Markdown to narrated MP4
Turns a Markdown document into a slide deck video with a realistic voiceover, all at zero cost by the author's account. Reach for it when a written doc needs to become a watchable presentation. Open, PR #1703.

### proofcore-contract-auditor — smart contract static analysis with on-chain proofs
Runs automated static analysis on Solidity and Rust contracts and anchors audit proofs to the TON Blockchain using ProofCore's Merkle protocol. Use it when a Web3 audit needs a verifiable, tamper-evident record. Open, PR #1771.

### webapp-testing hardening — element discovery and server launch
Two open fixes make the webapp-testing skill more accurate and safer: element_discovery.py now reports textarea and select by tag name instead of falling back to "text", and with_server.py drops shell=True to close a command injection risk (CWE-78). Open, PR #1976 and PR #1980.

**Open requests**
Community skills published under the `anthropic/` namespace impersonate official Anthropic skills, letting users grant elevated permissions to code they believe is first-party — reporter aliksir found this during a comparison; the issue is open with 46 comments. Issue #492.

---

**What changed**

No releases in the last 24 hours, so nothing shipped. Three closed PRs from March 2026 were updated on 2026-10-31, all proposed plugin work rather than released features:
- [#32756](https://github.com/anthropics/claude-code/pull/32756) proposes a `/pattern-sweep` slash command that reads the recent `git diff` to find similar buggy patterns elsewhere in the codebase. This addresses #32647.
- [#32755](https://github.com/anthropics/claude-code/pull/32755) proposes an edit-verifier plugin: a PostToolUse hook that checks whether an Edit actually applied, so a silent no-op (whitespace mismatch, already-modified code) does not let the agent continue on a false assumption.
- [#32751](https://github.com/anthropics/claude-code/pull/32751) fixes hookify rules with `event: stop` or `event: prompt`, which never fire because `config_loader.py` maps them to `field='content'`.

All three are closed, so treat them as proposed only.

**Worth knowing**

- Issue [#96422](https://github.com/anthropics/claude-code/issues/96422): project instruction and memory files are not re-loaded after context compaction. The agent keeps running from the summary and silently stops honouring rules that live only in those files. No fix in the data.
- Issue [#93607](https://github.com/anthropics/claude-code/issues/93607): on Linux, `pkill -f` / `pgrep -f` in the Bash tool match the tool's own wrapper, producing exit 144 and phantom PIDs. A 2.1.214 guard covers only the CLI process. Open, 6 comments, 4 👍.
- Issue [#93071](https://github.com/anthropics/claude-code/issues/93071): on Windows 10 22H2, Cowork reports `sandbox-helper: no Plan9 drive shares mounted` and `device_bash` has been dead since 2026-09-08, surviving restarts and updates. Open, 10 comments.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

No releases or pull requests landed in the last 24 hours, so nothing new shipped. The daily delta is issue traffic only.

**Worth knowing**

Codex CLI 0.166.0 goals stall repeatedly with `{"detail":"Bad Request"}`; `/goal resume` and restarts do not recover, per Issue #58639. Affects agent-goal users on ARM64 Linux. No fix in the data.

An open PR is not a released feature — none are present here.

Two recurring desktop problems stay open: PPTX attachments leave Send spinning on macOS after 26.1027.30824 (Issue #58642, also Windows #58258), and Windows Files-pane right-click collapsed to only "Select All" (#58294).

Contributor `jif-oai` is designing memories in Codex and asks users to rate citation (1–5) and per-thread versus global recall (Discussion #12567, 40 comments). Not released.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- Nightly release v0.67.0-nightly.20261101.g6814e00d6 shipped; full changelog at [compare link](https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261031.g6814e00d6...v0.67.0-nightly.20261101.g6814e00d6). Nightly users get it on next update; version bump PR [#30072](https://github.com/google-gemini/gemini-cli/pull/30072) tracks it.
- PR [#29799](https://github.com/google-gemini/gemini-cli/pull/29799) (closed) preserves the latest prompt and completed tool rounds when a request stops for quota or cancellation, so quit/signout cleanup no longer erases resumable history; one Escape stops the quota retry dialog.
- PR [#29800](https://github.com/google-gemini/gemini-cli/pull/29800) (closed) routes Auto mode across model tiers (Pro ↔ Flash) on true quota exhaustion instead of dead-ending the session.

**Worth knowing**

- Issue [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (13 comments, open, p1): `codebase_investigator` reports `status: "success"` and `Termination Reason: "GOAL"` after hitting MAX_TURNS, hiding the interruption. No fix in the data.
- Issue [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (8 comments, p1): the generalist agent hangs indefinitely; a user waits up to an hour. Workaround in the report: instruct the model not to defer to subagents.
- Issue [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) (5 comments): Browser Agent ignores `settings.json` overrides such as `maxTurns`. Proposed fix in PR [#30067](https://github.com/google-gemini/gemini-cli/pull/30067), not merged.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.106-2 fixes `--screen-reader` output: failed and rejected tool calls, unknown commands, and warnings now start with "Error:" or "Warning:". This matters when you rely on a screen reader to catch failures.
- `/resume <session-id>` now foregrounds an already-running background session instead of showing it twice. Use it when you need to return to a specific background session.
- v1.0.106-1 fixes `apply_patch` on files mixing LF and CRLF: unchanged lines keep their original endings instead of the whole file being rewritten. `COPILOT_PROVIDER_GHES_HOST` also now accepts the instance's browser address (e.g. `https://ghes.example`).

**Worth knowing**

- Issue #5312 reports context window rollover still fails with "checkpoint.md is absent" on 1.0.105, after #5205 was closed as completed on 2026-10-30 with no linked fix. 3 comments; no fix in the data.
- Issue #1857 requests a way to cancel enqueued messages before they run. 13 comments, 33 👍; open, no fix.
- Issue #2776 reports Shift+Enter submits the prompt instead of inserting a newline. 8 comments; open.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

No release shipped in the last 24 hours. Three proposals are open:

- PR #61017 fixes a crash where an unrecognised post-login redirect URL killed `createSessionRetention` ([issue #61001](https://github.com/anomalyco/opencode/issues/61001)). It returns the home route instead, and the author added regression tests. Matters if your web app boots on auth-proxy callbacks or deep links.
- PR #60936 adds Responses API routes for Fireworks and Groq. Both providers only had Chat Completions, so 29 Fireworks and 9 Groq models listed on models.dev were routed through a generic entry point. Matters if you run those providers.
- PR #61005 splits the tool loop in `packages/ai/src/llm.ts` into smaller pieces; PR #61018 removes unread `metadata` fields. Refactors only, no user-facing behaviour stated.

**Worth knowing**

- Free-tier quota complaints continue to dominate: issue #59387 has 176 comments, with #60990 and #60806 reporting exhausted quota after minutes. Issue #59387 is the maintainer-designated reporting thread; no fix is named in the data.
- The 2.2.5 upgrade breaks third-party providers ([#60997](https://github.com/anomalyco/opencode/issues/60997)): four integrations show in `opencode auth list` but are unselectable. One user reports this, labelled a possible regression.
- Sessions created on 1.19.4 don't appear after upgrading to 2.2.x ([#60773](https://github.com/anomalyco/opencode/issues/60773)): 12 sessions remain intact in the local database.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## What changed

No releases in the last 24h, so nothing shipped to users.

**Proposed:** PR [#11642](https://github.com/earendil-works/pi/pull/11642) keeps late and header-less terminal color replies out of the prompt. It fixes [#10256](https://github.com/earendil-works/pi/issues/10256) and covers duplicates #10362, #10742, #10717, and #10970 — Windows/ConPTY users who saw color fragments leak in or BEL open the external editor.

**Closed:** PR [#11638](https://github.com/earendil-works/pi/pull/11638) declares tools at the top level for a custom OpenAI `baseUrl`. It fixes [#11637](https://github.com/earendil-works/pi/issues/11637), where a gateway that drops `additional_tools` lost all 28 tools.

**Closed:** PR [#11648](https://github.com/earendil-works/pi/pull/11648) keeps updating git packages when `git clean` fails. It closes [#11597](https://github.com/earendil-works/pi/issues/11597), where `pi update` stopped on Windows against npm staging dirs.

## Worth knowing

**[#11613](https://github.com/earendil-works/pi/issues/11613)** (open): the bash tool reports "Command timed out after N seconds" even when the command already exited with a real exit code, if a descendant keeps the inherited pipe busy. Two comments; no fix in the data.

**Windows color leakage stays open:** [#10256](https://github.com/earendil-works/pi/issues/10256) has 20 comments, 4 👍. PR #11642 is the proposed fix, not released.

**[#11021](https://github.com/earendil-works/pi/issues/11021)** (open, 7 👍): ChatGPT sign-in reports a 272K context window for `gpt-6.1-sol` while Pi 1.3.0's account catalog reports 500K. No fix in the data.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

- v0.26.5 adds bounded SQL history queries for Managed local H2 and Hosted MySQL, enabling paged recent messages and journal transactions ([release](https://github.com/QwenLM/qwen-code/releases)). Reach for it when reading long message history a page at a time.
- No breaking changes are listed for v0.26.5.
- Desktop v0.26.5 ships alongside it in the same release.

**Worth knowing**

- Main CI is failing on the Managed Agent gate: two separate main runs failed the same job, and the failing measurement varies run to run ([#15898](https://github.com/QwenLM/qwen-code/issues/15898), 7 comments, P1). It is red for every PR triggering the full tier; no fix is in the data.
- One self-hosted pool host `ecs-qwen-hz6-18` has no Node.js on PATH, so the required Lint & Static check fails for any commit landing there ([#16005](https://github.com/QwenLM/qwen-code/issues/16005), 5 comments). Affects contributors scheduled onto that host.
- Main CI also failed on a duplicated MCP tool name discarding the whole server and reporting a misleading "no tools" error ([#15741](https://github.com/QwenLM/qwen-code/issues/15741), closed). A fix appears to exist since the issue is closed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*