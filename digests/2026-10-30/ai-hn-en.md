# Hacker News AI Community Digest 2026-10-30

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-10-29 16:21 UTC

---

### Google announces Gemini 4 Carbon with top scores in cybersecurity benchmarks
Google announced Gemini 4 Carbon, a frontier model the company says ranks first on Artificial Analysis Intelligence Index v5 with a score of 59. It reports 88.2% on SEC-bench Pro for finding vulnerabilities, 54.8% on ExploitGym for exploitation and 71.0% on CWE-bench for patching. The model is not publicly available yet; access starts with a subset of cyber defenders and trusted partners through the Fairwind Program. Introductory pricing is $2 per million input tokens and $10 per million output tokens, later rising to $4 and $20.
Source: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) · [HN](https://news.ycombinator.com/item?id=50276792)
987 points · 786 comments

### Gemini 4 Carbon takes #1 on Intelligence Index v5, second on coding agents
Artificial Analysis reported Gemini 4 Carbon scores 59 on Intelligence Index v5, leading four of nine evaluations including HLE-Diamond and Terminal-Bench-Science. With Antigravity CLI it scores 59 on the Coding Agent Index, three points behind Claude Code with Claude Opus 5.5, and ranks second on Terminal-Bench 4.0 at 64%. It is not yet publicly available, and Google is offering a 50% launch discount with no confirmed end date. At standard pricing it costs $7.76 per Intelligence Index task.
Source: [artificialanalysis.ai](https://artificialanalysis.ai/articles/gemini-4-carbon-new-number-1) · [HN](https://news.ycombinator.com/item?id=50288019)
267 points · 207 comments

### Mistral releases open weights for Mistral Large 4, a 1-trillion-parameter model
Mistral released the weights of Mistral Large 4 (Le Chonk), a 1-trillion-parameter multimodal model, after three weeks of additional reinforcement learning. The company says it leads open-weight coding on FrontierCode 2.0 at 19.7%, improved Terminal-Bench 4.0 to 41% from its preview, and scores 51% on the Artificial Analysis Cyber Index. Developers can self-host and customize it; the model supports low, medium and high reasoning modes. Mistral says it averages a 96.6% refusal rate on malicious cyber requests.
Source: [mistral.ai](https://mistral.ai/news/mistral-large-4-oss/) · [HN](https://news.ycombinator.com/item?id=50289418)
459 points · 116 comments

### Cursor releases Agent SDK for defining and deploying agents in code
Cursor released the Agent SDK, the framework it uses for its own managed agents like Bugbot and Security Reviewer. Agents are organized as software projects: prompts in Markdown, tools as TypeScript functions, with evals and event replay included. Developers run `agent-sdk deploy` to build the agent, get a URL and launch it on Cursor infrastructure, or run it as a single Node process in a container on their own infrastructure. One Cursor team built a PR-review agent called kb-reviewer in about a day; the SDK is generally available today.
Source: [cursor.com](https://cursor.com/blog/agent-sdk) · [HN](https://news.ycombinator.com/item?id=50273731)
137 points · 130 comments

### A Bun preload suppresses Claude Code's background agent summary calls
A gist by Flamerix AI describes a Bun `--preload` script that stops Claude Code from re-sending each background agent's transcript every ~30 seconds for a 3-5 word status line. The script wraps only the global `setTimeout` and returns an inert handle when a callback's source contains a summarizer anchor, so other timers pass through untouched. Measurements in the gist put `agent_summary` at 16.4% of Claude Code spend and 19.7% of API requests before the hook, and 0% after. The binary is not modified, but the author says an update can silently undo the hook, so it must be re-verified.
Source: [gist.github.com](https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce) · [HN](https://news.ycombinator.com/item?id=50284255)
523 points · 211 comments

### Anthropic reports early drug-development results from Claude partnerships
Anthropic's life sciences team described work with six organizations developing medicines, plus its own drug discovery programs. In one case, Generate Biomedicines used Claude Code to propose CAR T-cell therapy designs; one design was about 70% shorter and, in lab tests, produced roughly 10 times as many receptors. Divergence Labs says Claude generated roughly 35,000 antibody designs in about a month, while Enveda reduced human review time on 1,061 pages of documentation by 89%. The company calls these early results and says it plans to scale the work.
Source: [anthropic.com](https://www.anthropic.com/research/early-progress-drug-development) · [HN](https://news.ycombinator.com/item?id=50265609)
328 points · 337 comments

### DAYJOB: Tax benchmark finds agents miss consequential tax issues
Surge AI released DAYJOB: Tax, 50 environments and 1,789 files testing whether agents handle tax work from client request to deliverable. Claude Sonnet 5.5 leads with a 10.8% pass rate at a 95% rubric threshold, followed by Claude Fable 5.1 at 9.6% and Claude Opus 5.5 at 9.2%. In one case study, Astra never identified a residence-requirement deadline across five attempts, while Opus identified it in all five. Tasks were created and reviewed by tax experts, and the benchmark covers eight areas of tax practice.
Source: [surgehq.ai](https://surgehq.ai/blog/dayjob-tax) · [HN](https://news.ycombinator.com/item?id=50275626)
248 points · 163 comments

### OpenAI reports three discoveries in mathematics, computer science and physics
Full article content could not be retrieved. OpenAI published a page titled "Building scientific understanding with academic communities" describing three new discoveries in mathematics, computer science and physics.
Source: [openai.com](https://openai.com/index/building-scientific-understanding-with-academic-communities/) · [HN](https://news.ycombinator.com/item?id=50251344)
1153 points · 699 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*