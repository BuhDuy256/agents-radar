# Tech Community AI Digest 2026-11-03

> Sources: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 items | Generated: 2026-11-03 06:34 UTC

---

## Workflows

### Author builds a Python gate that stops an agent's reflection from writing false memories
The author's long-running personal agent answered a planted question correctly, then its overnight reflection wrote 12 self-model items claiming it had been corrected for that answer, a correction the author never gave. To block that write path, the author published a standalone stdlib kit that sits between an agent's reflection step and its memory file, under an MIT licence and without API keys. Three rules apply: each proposed memory item must quote the user's exact words from a numbered user turn, passing items go to a proposed pile rather than live memory, and promotion to live memory needs a chained typed approval. The quote check is a noise filter, not a truth check, so unrelated real quotes can still pass.
Source: [dev.to](https://dev.to/kenielzep97/my-agent-gave-the-right-answer-then-it-wrote-down-that-it-was-wrong-311d)
Engagement: 17 reactions · 4 comments · 6 min read

### Author red-teams a support bot with 30 scripted scenarios, asserts on tickets not tone
Pin Xiong's harness checks what a support agent does outside the reply text, because tone, accuracy and deflection dashboards miss legally operative messages being handled as small talk. A scenario in a YAML file lists scripted user turns plus assertions: phrases the bot must say or must not say, and whether a ticket must exist and which queue it goes to. A Python runner sends the turns in order, then queries the ticketing API and requires exactly one ticket, so a retried duplicate fails rather than passes. The author tried it on their own bot and reports it failed 7 scenarios.
Source: [dev.to](https://dev.to/pinxiongcn/i-red-teamed-my-own-support-bot-with-30-scenarios-it-failed-7-heres-the-harness-39e7)
Engagement: 1 reactions · 6 comments · 8 min read

### Author lists nine agent-stalling prompts and the flag or variable that ends each wait
Gabriel Anhaia walks through commands that stop on a human prompt, such as `git commit` opening an editor, `git log` piping into a pager, `npx` asking before installing an unlisted package, `npm init` running a questionnaire, and `apt install` stacking a sudo password, an install confirmation and debconf questions. The fixes are environment and flag settings the author states by name: a backstop editor, a pager set to cat, non-prompting sudo, and a batch-mode ssh. The author notes Claude Code kills a waiting Bash call after two minutes by default, and gets back a timeout without knowing which prompt stalled. Terraform's `-auto-approve` is flagged as destructive, so the author recommends applying a saved plan instead.
Source: [dev.to](https://dev.to/gabrielanhaia/9-commands-that-leave-a-coding-agent-waiting-for-a-keystroke-and-the-fix-for-each-1ea2)
Engagement: 2 reactions · 1 comments · 9 min read

## Experiments and comparisons

### Author quarantines a hidden-layer invoice injection by stripping the model of every tool
Guilherme Michels describes an extraction pipeline hardened against indirect prompt injection, using a document carrying an invisible text-render-mode-3 layer that tells the model to ignore the schema and change a beneficiary tax ID. The author's four architectural properties are no tools at read time, constrained output validated against a fixed schema, page-and-bounding-box provenance per extracted value, and a separate component that decides to pay or approve. In the illustrative result, values come from the visible layer only, the injected field fails validation because the schema has no approval key, and the document goes to security review with hidden text recorded. The author states a system prompt telling the model to ignore document instructions is free but should be assumed bypassable.
Source: [dev.to](https://dev.to/guilherme_michels/prompt-injection-through-documents-how-to-harden-an-llm-extraction-pipeline-4n54)
Engagement: 1 reactions · 0 comments · 9 min read

### Author argues an idempotency key on the orchestrator, not the prompt, is what stops double refunds
Abivarma R S describes a failure where a refund tool commits, the 200 OK is lost, the model sees a 504 and calls again, producing a second refund — no jailbreak or hallucination required. The proposed mechanism is a key the orchestrator builds from durable workflow state such as run and step IDs, stored next to a hash of the arguments, so a repeated key returns the saved response. The author states provider tool-call IDs cannot do this, and that MCP's `idempotentHint` is only a hint with no key field in the spec. Limits named: keys can expire and legacy systems may take none, and exactly-once makes a wrong refund happen once, not correctly.
Source: [dev.to](https://dev.to/abivarma/ai-agent-tool-calls-are-distributed-transactions-who-owns-the-retry-187g)
Engagement: 1 reactions · 2 comments · 2 min read

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*