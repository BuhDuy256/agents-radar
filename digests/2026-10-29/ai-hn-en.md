# Hacker News AI Community Digest 2026-10-29

> Source: [Hacker News](https://news.ycombinator.com/) | 7 stories | Generated: 2026-10-29 05:36 UTC

---

### Google announces Gemini 4 Carbon, a frontier model focused on cybersecurity and long-horizon coding
Google says Gemini 4 Carbon ranks #1 on the Artificial Analysis Intelligence Index v5.0 at 59 and leads SEC-bench Pro (88.2%) for finding vulnerabilities, ExploitGym (54.8%) for exploitation, and CWE-bench (71.0%) for patching. The company is rolling it out first to a subset of cyber defenders through its Fairwind Program and the U.S. government's voluntary pre-release testing process before reaching developers, businesses, and consumers. Introductory pricing matches Gemini 4 Argon at $2 per million input tokens and $10 per million output tokens, rising to $4 and $20 after the introductory period. Google reports Carbon reduced successful cheating on Terminal-Bench 4.0 to 0.0% and cut high-severity misalignment alerts in internal live coding environments by almost 80%.
Source: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) · [HN](https://news.ycombinator.com/item?id=50276792)
861 points · 712 comments

### Anthropic reports early drug development results from partnerships with six life sciences organizations
Anthropic's life sciences team partnered with BigHat Biosciences, Bristol Myers Squibb, Divergence Labs, Enveda, Generate Biomedicines, and The Column Group, and also began its own drug discovery programs, including for rare childhood muscular dystrophy. At Divergence Labs, Claude generated roughly 35,000 antibody designs in about a month, of which three bound IgE and 20 dislodged it, with three appearing to outperform standard medication. At Enveda, a Claude system reviewing 1,061 pages of manufacturing documentation caught all 11 issues human reviewers found plus seven they missed, and reduced human review time from over 25 hours to under three. Anthropic says the partnerships serve as case studies and that some programs may produce new medicines, though results so far are early-stage.
Source: [anthropic.com](https://www.anthropic.com/research/early-progress-drug-development) · [HN](https://news.ycombinator.com/item?id=50265609)
322 points · 336 comments

### Cursor releases Agent SDK for building and deploying custom coding agents in code
Cursor released the Agent SDK, the framework it uses to build its own managed agents like Bugbot, Security Reviewer, and Rollouts. Agents are defined as small software projects, with prompts in Markdown and tools as TypeScript functions, so changes go through normal version control and review. A single command, agent-sdk deploy, builds the agent, gives it a URL, and runs it on Cursor's infrastructure, or the agent can run as a Node process in a container on the user's own infrastructure. The SDK supports evals, event replay, and handing tasks to specialized agents or parallel subagents; Cursor cites a team that built a pull-request reviewer in about a day.
Source: [cursor.com](https://cursor.com/blog/agent-sdk) · [HN](https://news.ycombinator.com/item?id=50273731)
110 points · 116 comments

### Liquid AI launches LFM3, a multimodal model family built for on-device specialized tasks
Liquid AI announced LFM3, a family of six 2B-class models sharing one backbone, covering text, vision, audio, omni, and two decision models, all branched from LFM3-1.7B-Base. The models were pre-trained on 22T tokens with a tri-hybrid layer mix of gated short convolutions, sliding-window attention, and global attention; the company says LFM3-1.7B outperforms its previous LFM2.5-2.6B using 35% fewer parameters. The text model has a 256K context window, fits in about 1 GB at 4-bit precision, and can be fine-tuned on a single GPU. Base and post-trained weights are open and available today on Hugging Face, Liquid's Playground, and its API.
Source: [liquid.ai](https://www.liquid.ai/blog/lfm3) · [HN](https://news.ycombinator.com/item?id=50262229)
170 points · 66 comments

### Survival LLM ships an offline AI assistant and emergency library that runs on your own computer
Survival LLM is a free, open-source Mac and Windows app that runs an AI assistant and a roughly 9 GB reference library entirely locally, requiring no internet after setup. The library includes about 930,000 Wikipedia articles, WikiMed, MedlinePlus, FEMA and CDC guidance, military survival manuals, iFixit repair guides, and Stack Exchange Q&A; answers list the articles used and highlight the exact passage. The app picks a model based on available memory, from IBM Granite 4.2 8B at 16–31 GB up to NVIDIA Nemotron 3.5 Super at 128 GB or more; on 22 blackout and first-aid questions graded blind, the largest model answered 21 correctly and the smallest 14. The author notes smaller models make more mistakes, so the app always shows sources to check.
Source: [brangus.io](https://www.brangus.io/survival-llm) · [HN](https://news.ycombinator.com/item?id=50264853)
525 points · 194 comments

### OpenAI publishes work on three discoveries in mathematics, computer science, and physics
The OpenAI post on building scientific understanding with academic communities could not be retrieved, so only its title is available.
Source: [openai.com](https://openai.com/index/building-scientific-understanding-with-academic-communities/) · [HN](https://news.ycombinator.com/item?id=50251344)
1150 points · 696 comments
Full article content could not be retrieved.

### OpenAI's GPT-6.1 Terra announcement page is inaccessible
The OpenAI page introducing GPT-6.1 Terra returned an HTTP 403 error, so no details on the model were available from the source.
Source: [openai.com](https://openai.com/index/introducing-gpt-6-1-terra/) · [HN](https://news.ycombinator.com/item?id=50248124)
633 points · 426 comments
Full article content could not be retrieved.

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*