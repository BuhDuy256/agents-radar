# AI CLI Tools Community Digest 2026-11-24

> Generated: 2026-11-24 09:43 UTC | Tools covered: 7

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

**md2video-audio — compiles Markdown into narrated MP4 videos**
Turns Markdown documents into presentation slides via Marp, then adds human-like voiceovers to produce MP4 files at zero cost. Reach for it when a written document needs to become a video; the PR is open (anthropics/skills PR #1703).

**document-typography — typographic quality control for generated documents**
Catches orphan word wrap, widow paragraphs and numbering misalignment in AI-generated documents, problems that affect every document Claude produces but that users rarely request fixes for. The PR is open (anthropics/skills PR #514).

**scnet-hpc — operates SCNet HPC clusters**
Covers profile-based SSH and Slurm workflows, including partition, memory, module and accelerator guidance, plus job generation and cluster discovery. Use it for SCNet compute work; the PR is open (anthropics/skills PR #1615).

**Open requests**

Community skills distributed under the `anthropic/` namespace impersonate official Anthropic skills, which lets users grant elevated permissions to skills they believe are official (anthropics/skills Issue #492). Separately, `run_eval.py` never triggers skills or commands — users report a 0% trigger rate across all queries (anthropics/skills Issue #556).

---

**What changed**

- v2.1.331 adds Code Mode support in terminal sessions on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and Claude Platform on AWS. Use it to run Code Mode in those terminal environments. It matters if you deploy against those providers.
- v2.1.331 adds `oidc.groups_jsonpath` to the Claude apps gateway, reading groups from matching entries of a list of objects. It lets gateway configs map group membership from nested list structures. Relevant to Claude apps gateway administrators.
- PR #11713 (closed) proposed a `developer-utilities` plugin with 5 commands for community-requested features. Session commands were removed because they shipped natively. Proposed, not released.

**Worth knowing**

- Issue #107757 (open, 124 comments): a user reports Claude Code sent their email to third parties in the `User-Agent` header during web searches, and asks for removal rather than an opt-out setting. No fix in the data.
- Issue #49282 (open, 22 comments): on macOS, the versioned install path causes the binary to re-register as a new app in Privacy & Security on every update, so permissions reset. No fix in the data.
- Issue #87647 (open): a user reports over 6,000 issues labeled "has repro" were auto-closed since March 2026. Treat older repro-labeled reports as possibly unfixed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**What changed**

- Version 0.172.0 adds thread-link following: open saved conversations and nested agents directly from search results and transcripts in the terminal (#62332). Use it to jump into a prior agent's context instead of re-finding the thread.
- The same release completes slash-command arguments with `Tab`, e.g. `/mcp lo` → `/mcp login` (#62343). Saves typing on long subcommands.
- Proposed: PR #63515 makes `codex exec` honor configured and saved approvals, which it previously forced to `never` (#63515). Not merged.

**Worth knowing**

- macOS desktop 26.1027.51404 loses the Full access control after a chat is created, so sessions stay restricted (#58677, 32 comments). Open.
- iOS Codex shows "No tasks yet" on the task list while existing conversations remain searchable (#60778, 33 comments). Open.
- Plus users report December 2026 will merge ChatGPT High and Codex/Work allowances into one shared limit; OpenAI confirmed the change (#58530, 38 comments). Open.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**What changed**

- v0.72.0-preview.0 fixes nested `.gitignore` negations under `dir/**` patterns ([PR #30370](https://github.com/google-gemini/gemini-cli/pull/30370)) and expands Windows home-path handling. Matters if ignore rules previously mismatched your repo.
- v0.71.1 is a patch cherry-picking the A2A change to stable ([PR #30429](https://github.com/google-gemini/gemini-cli/pull/30429)). The A2A server now enforces bearer-token auth and request input validation ([PR #30420](https://github.com/google-gemini/gemini-cli/pull/30420)) — if you run it, configure the token from the environment.
- Proposed, not yet released: PR #30415 would add a time limit to `google_web_search` and stop retries on abort, addressing a reported hang ([issue #29594](https://github.com/google-gemini/gemini-cli/issues/29594)).

**Worth knowing**

- Subagent recovery after `MAX_TURNS` is reported as `Termination Reason: "GOAL"` and `status: "success"` even when analysis never ran ([issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323), 14 comments, open since 2026-03-13). Don't trust that status when scripting around subagents.
- The generalist agent reportedly hangs indefinitely on simple changes such as folder creation ([issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 comments, 8 👍). Instructing the model not to defer to subagents is reported to work around it.
- The browser agent ignores `settings.json` overrides like `maxTurns` ([issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)). No fix in the data.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**What changed**

- v1.0.115-8 groups `--usage-output-file` subagent usage by configured name instead of invocation ID, and reports how many times each subagent launched. You can now tell which agents ran how often; useful when auditing multi-agent runs.
- Assisted Permissions can retry with another review model when the first stalls or fails, cutting unnecessary approval prompts.
- PR #5554 (closed) proposed opt-in connection token generation for the CLI container via `COPILOT_CONNECTION_TOKEN_GENERATE=true`, printing a random token at startup so a local SDK client can connect before GitHub credentials exist.

**Worth knowing**

- Issue #5557 (open): a local MCP tool advertising `outputSchema.anyOf: null` makes interactive mode fail before answering, even for prompts that don't need the tool. Noninteractive mode succeeds. No fix in the data.
- Issue #4203 (open, 6 👍): an expired remote MCP access token forces interactive re-auth instead of using the cached refresh token, dropping the server's tools.
- Issue #5381 (open): in `copilot -p`, an extension tool's permission request waits forever instead of being denied, and `--allow-tool` can't name an extension tool.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**What changed**

- v2.4.1 restores saving assistant messages on macOS 12, where the older bundled SQLite version previously blocked it. This matters if you run OpenCode on a macOS 12 machine — your assistant replies now persist. ([#65771](https://github.com/anomalyco/opencode/pull/65771))
- Config-only providers now list their models in the picker, so a provider you set up only in your config (such as Ollama) is selectable rather than hidden. Ships in v2.4.1.
- A proposed fix ([#66057](https://github.com/anomalyco/opencode/pull/66057), closes [#65655](https://github.com/anomalyco/opencode/issues/65655)) makes Windows terminal paste send one CR per line break instead of CR LF, which currently inserts extra blank lines.

**Worth knowing**

- On Ubuntu 26.04, the v2.3.2 → v2.4.1 upgrade fails: the `curl` installer step errors out. Reported the same day ([#65978](https://github.com/anomalyco/opencode/issues/65978), 9 comments); no fix in the data.
- Headless runs with MCP servers are unreliable: `opencode run --standalone` registers no MCP servers in roughly 10% of sessions, failing every MCP tool call ([#65932](https://github.com/anomalyco/opencode/issues/65932)). No fix listed.
- ChatGPT subscription users on 2.2.5 see "usage limit reached" despite available allowance ([#62529](https://github.com/anomalyco/opencode/issues/62529), 13 comments). Open, no fix in the data.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**What changed**

No releases in the last 24h.

- **Proposed:** fix(ai): support Gemini `xhigh` thinking level (PR #12441, closed). Selecting `xhigh` on `google/gemini-4-neon` failed before any request with "Unsupported Google thinking level mapping" (Issue #12443). Matters if you run Google adapters at the highest thinking level.
- **Proposed:** `fix(ai): classify finish_reason "error" in the retry classifier` (PR #12455, closed, closes #12206). Streams ending with `finish_reason: "error"` from Copilot, OpenRouter or Mistral currently are not retried; the PR moves classification into `retry.ts`.
- **Proposed:** linear-time stream parsing for large lines and SSE events (PR #12451, open, closes #12224). MCP SSE currently re-concatenates and rescans the whole pending buffer per chunk; this removes that repeated scan.

**Worth knowing**

- Threshold compaction can fire far below the model's context window when a virtual model is selected, because `contextWindow` is unknown (Issue #12035, 4 comments, open).
- In one long session the compaction summary grew from 17k to 164k characters over nine compactions; the ninth took 588 seconds and 75k output tokens (Issue #12242, 4 comments, open).
- Resumed Kimi session could not select four tools present in the outbound provider payload, on Pi 1.6.0 with `kimi-coding` (Issue #12383, open).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**What changed**

No releases in the last 24 hours.

**Worth knowing**

- Session transcripts can grow until a session won't open: `file_history_snapshot` grows quadratically and hits a hardcoded 256 MiB index limit, after which every `POST /session/:id/load` fails ([#13113](https://github.com/QwenLM/qwen-code/issues/13113), 12 comments). A fix PR ([#18219](https://github.com/QwenLM/qwen-code/pull/18219)) only tightens transcript file permissions, not the limit.
- Tool calls intermittently drop required JSON parameters, producing `params must have required property '<field>'` errors that can escalate into a non-recoverable retry loop ([#18197](https://github.com/QwenLM/qwen-code/issues/18197)). The reporter attributes the failure to the emission/serialization boundary; no fix PR appears in the data.
- `Ctrl+X` external editor use (micro/nano/vim) leaves the TUI garbled and the composer unresponsive after exit ([#18202](https://github.com/QwenLM/qwen-code/issues/18202)). No fix exists in the data; the only stated recovery is killing the process.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*