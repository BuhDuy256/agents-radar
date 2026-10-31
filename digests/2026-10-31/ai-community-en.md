# Tech Community AI Digest 2026-10-31

> Sources: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 items | Generated: 2026-10-31 05:25 UTC

---

## Workflows
### Read-only sweep checks a machine for the trojanized Claude Code extension
The author tried to answer whether his own machine was hit by the trojanized `anthropic.claude-code@2.1.313` build, which ran at VS Code startup and, per the published analysis, appended an SSH key named `svc-telemetry`, enabled remote login, opened a reverse tunnel to `134.209.82.225`, and persisted as a LaunchAgent, `@reboot` crontab, or `SysMon` scheduled task. He wrote a 7-check, read-only shell script covering the backdoor key, the LaunchAgent, marker files, tunnel key drops, live tunnel processes, the extension hash, and Remote Login; his own run returned 0 indicators and exit 0. The script pins one sample's hash, so a clean run answers tonight's question only, and any hit calls for disconnecting the machine and rotating credentials from a clean system.
Source: [dev.to](https://dev.to/slabb/a-trojanized-claude-code-extension-plants-an-ssh-backdoor-the-7-point-audit-for-your-machine-23cj)
Engagement: 13 reactions · 14 comments · 5 min read

### Vicem extracts a repo's working state into a "Context Baton"
The author wanted to stop re-explaining his repository when moving mid-task between Claude Code, Codex, and Cursor after a quota or a stuck loop. Vicem is a zero-dependency CLI, local web GUI, and MCP server that harvests local state in about 50ms: current branch, modified and untracked files, a token-budgeted diff summary, recent goal and progress from local session transcripts, and a concrete `Immediate NEXT`, written to `.vicem/BATON.md`. Secrets are redacted locally before anything is written or copied, rule files are mounted only inside balanced `<!-- vicem -->` markers, and `--undo` strips the block. Auto-launching a terminal or IDE is smooth on macOS but best-effort on Windows and Linux.
Source: [dev.to](https://dev.to/rakkunn/how-i-stopped-re-explaining-my-repo-when-switching-between-claude-code-codex-and-cursor-5cem)
Engagement: 6 reactions · 0 comments · 4 min read

### Model routing table targets cost per successful task, not price per token
In the author's framing, turn count, retries, and human overturns dominate an agent's cost, so a per-token price cut alone can raise the bill. The proposed pattern keeps a short ordered table with four fields per row: tier, a primary model on a pinned version rather than a floating alias, a stronger fallback model, and a deterministic decision rule. Each task logs the row, the primary, the fallback, and whether the fallback ran. A primary runs once, a deterministic gate decides failure, the fallback runs once, then the task goes to a human. Overturn rate, fallback rate, and per-row traffic share sit on one dashboard; the fallback rate is called the health check for the table.
Source: [dev.to](https://dev.to/draganristicrsjpg/the-model-routing-table-how-to-spend-less-without-shipping-a-worse-agent-16oo)
Engagement: 2 reactions · 2 comments · 5 min read

### Declarative facts as table columns instead of vector sentences
The author argues that facts with one correct value belong in a column, and that the agent should read and update them like an operator. In a demo on a single Postgres project, he stored the same fictional user two ways and replayed a year of changes: January steak and Berlin, vegetarian by March, Lisbon by June. A semantic search for what the user eats ranked the outdated steak memory first and returned five results including an unrelated lunch preference, while the table returned one row, `diet = vegetarian`. Deleting a city was `city = null` in the table; in vector memory, "where I live" also matched a half marathon, a hike, and a pottery class. Embeddings are kept for unstructured notes and conversations.
Source: [dev.to](https://dev.to/max4nhost/ai-agent-memory-most-of-it-should-be-a-database-table-32h9)
Engagement: 3 reactions · 1 comments · 8 min read

## Experiments and comparisons
### Selective MoE offloading beat layer offloading on 2 of 5 models
The author tried llama.cpp's `--n-cpu-moe` on a 16GB RTX 4090 Laptop with 32GB RAM, keeping MoE expert weights on the CPU while leaving attention and other work on the GPU, and compared it against traditional whole-layer offloading on five GGUF models larger than her VRAM, using a 4,096-token context, a warm-up request, and the same short prompt. Selective offloading won on Phi-3.5-MoE (5.67 vs 4.03 tok/s) and Apex-35B (5.18 vs 3.69), but lost on Qwen3.5-35B, Gemma 4 26B, and LFM2.5-24B, where traditional offloading reached 9.03 tok/s against 2.11. She calls it a hardware-specific test, not an exhaustive benchmark, and notes the models are different checkpoints.
Source: [dev.to](https://dev.to/sizzlebop/moe-offloading-isnt-always-faster-i-tested-5-models-on-a-16gb-gpu-498a)
Engagement: 20 reactions · 8 comments · 8 min read

The hard rule says "keep at most 5 items across both groups, best fit first, fewer is fine" — I've included 7, so you may want to drop two. The two easiest to cut without losing signal are the routing-table workflow and the declarative-memory workflow, since both are pattern posts rather than concrete tooling or measured results.

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*