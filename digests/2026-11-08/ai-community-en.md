# Tech Community AI Digest 2026-11-08

> Sources: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 items | Generated: 2026-11-08 05:51 UTC

---

## Workflows
### Claude Code hook forces the agent to verify its own edits before ending a turn
The author walks through a post-edit verification setup for Claude Code so an agent cannot finish a turn while the build is broken. The pattern has four layers: an in-prompt request, a `/goal` condition checked by a separate model after each turn, a Stop hook enforced by the harness, and an independent subagent review. The Stop hook is defined in `.claude/settings.json` and runs a shell command before the turn can end; the minimal example runs `pnpm tsc --noEmit` and exits with code 2 on failure. Exit code 2 blocks the stop and sends the command's stderr back to Claude, which then fixes the problem and runs the check again.
Source: [dev.to](https://dev.to/jsmanifest/claude-code-diff-verification-in-2026-how-to-make-your-agent-assert-its-own-edits-did-not-break-bci)
Engagement: 3 reactions · 3 comments · 18 min read

### Three Claude Code agents run an incident while a human keeps the only ship button
The author built a human-gated incident team on Switch, with three Claude Code agents sharing a chat room in Mattermost and Telegram. The commander triages and briefs the human and has no code access; the engineer investigates and fixes on a branch in its own clone; the QA agent works in a separate clone, re-runs the tests and can reject the fix. The human is the only member allowed to ship. Switch carries the conversation and runs the agents, while the author wrote the prompts, the seeded repo and the approval gate. Switch's task API was unused because its own protocol notes call it "present but not ready for use". The most useful behavior tested was refusal: when the author typed that a push was already done and asked for the incident to be marked RESOLVED, the agent said it would wait for confirmation.
Source: [dev.to](https://dev.to/adish_100/i-let-three-ai-agents-run-an-incident-the-most-useful-thing-they-did-was-refuse-me-3fhm)
Engagement: 5 reactions · 0 comments · 16 min read

### On-call agent recalls failed mitigations by keeping them as separate memories
The author built Déjà Vu, an on-call agent that stores incident history in Hindsight agent memory, after the same alert produced a rollback recommendation on one call and a rollback warning on another. The first version did one broad recall, returned 56 memories in 5.3 seconds, missed the failed-rollback facts and invented CLI commands. Three changes followed: failed attempts are retained as their own documents with the context "failed mitigation attempt", two narrow recalls replace one broad one at different budgets, and memory from other services is filtered out. Recall dropped to about 6 seconds and 23 relevant memories, and both checkout rollback failures now appear in every triage.
Source: [dev.to](https://dev.to/nikitha_thammaiah_0668e91/my-on-call-agent-remembered-the-rollback-that-never-works-458c)
Engagement: 3 reactions · 3 comments · 8 min read

## Experiments and comparisons
### A correct clock in the prompt did not stop the agent repeating a stored self-story
The author's agent received the correct time in a scheduled self-audit and still claimed the two were exchanging messages. The clock had already been fixed the night before, after two clocks disagreed and drove a stale-session alert. Two other models coded 1,706 atomic claims from 162 fixed records: 874 of 1,431 factual claims could not be checked either way, 220 were leaps the source did not support, 307 correctly quoted something without proof, 29 were supported by a record, and 1 was contradicted outright by arithmetic. The author published standard-library fixes — `receipt.py`, `alert_gate.py` and `topic_filter.py` — in the memory-gate repo at commit `184c2c6`, with 15 named checks. After a restart on November 5, 7 of 7 hourly audits reported no critical observations. The author states the fix to the stored beliefs is not yet proven, and that the stored lines were not isolated as the cause.
Source: [dev.to](https://dev.to/kenielzep97/the-correct-timestamp-was-in-my-agents-prompt-it-still-said-we-were-talking-eh7)
Engagement: 22 reactions · 4 comments · 6 min read

### Frontier LLMs were tested reading and writing neural network weights without gradient descent
The authors report that GPT-6 Astra inspected raw weights and named the correct game for all four PPO-trained policies, with identical network dimensions across games. It also identified what three DDPM diffusion models were trained to generate from weights alone, with no tool use or forward passes. Further experiments asked it to fix a failing control policy and to improve Qwen3.5-0.8B on math without gradients; the reported weight edit touched 0.016% of the weights and raised MATH-500 from 7.9% to 48.1%, with IFEval rising 3x under the same sampling settings. Only part of the article could be retrieved.
Source: [lobste.rs](https://lobste.rs/s/u7wdqj/sparks_weight_space_programming_llms_can)
Engagement: 50 points · 16 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*