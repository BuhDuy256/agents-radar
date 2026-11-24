# Hacker News AI Community Digest 2026-11-24

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-24 09:43 UTC

---

### OpenAI and Cisco launch Shirudo, an open-source eBPF runtime for shielding unpatched Linux

OpenAI and Cisco announced Shirudo, an open-source runtime that protects running Linux systems while patches are prepared. In a controlled test, a Codex-generated shield blocked a Java4Shell exploit attempt against a running Elasticsearch service without a restart, the company says. Shields are cryptographically signed, checked by the Linux eBPF verifier, and recorded via a Trusted Platform Module. The project is BSD 2-Clause licensed, with BPF programs dual-licensed BSD and GPL; the material does not give performance figures beyond the single test.

Source: [openai.com](https://openai.com/index/introducing-shirudo/) · [HN](https://news.ycombinator.com/item?id=50619630)
69 points · 20 comments

### OpenAI proposes perplexity as a shared safety metric across labs

OpenAI Chief Scientist Jakub Pachocki published internal pretraining perplexity figures starting from GPT-3.5 and argued for perplexity as a cross-lab safety benchmark. The post tracks log-perplexity from roughly 0.99 at GPT-3.5 to below 0.8, where the company says capabilities in cybersecurity and mathematics emerged, and projects further advances in the 0.68-0.7 window. Pachocki proposes common limits developers would not cross until monitoring milestones are met, while listing challenges: different evaluation datasets, detachment from actionable tasks, and chain-of-thought gains that do not reduce perplexity.

Source: [openai.com](https://openai.com/index/perplexity-and-intelligence/) · [HN](https://news.ycombinator.com/item?id=50601525)
705 points · 446 comments

### Claude Ship takes pull requests through review, fixes and approval

Anthropic announced Claude Ship in beta, combining Code Review with two new agents: PR Steward, which works on failing CI checks, merge conflicts and review feedback, and Claude Approvals, which applies a team-written approval policy file from the repository. Developers can run /ship in Claude Code to push, open, review and fix a PR; admins enable it per repository and can choose Quick, Standard or Deep review levels and spend limits. The company says merged PRs on the Claude Code team more than doubled from June to September while the share reverted fell by more than 40%. It is unavailable to organizations with Zero Data Retention, the HIPAA configuration, or customer-managed encryption keys. Eligible Enterprise organizations can claim at least $10,000 in credits by January 15, 2027.

Source: [claude.com](https://claude.com/resources/articles/introducing-claude-ship) · [HN](https://news.ycombinator.com/item?id=50618513)
55 points · 16 comments

### Screen reading test finds accessibility trees help weak models, not strong ones

Greptile tested screenshots alone, screenshots plus an accessibility tree with coordinate clicks, and clicks by element ID on 172 OSWorld tasks, one attempt each with a 50-step limit. The tree raised GPT-5.2 from 15.8% to 36.2% and GPT-4.1 from 5.4% to 20.6%, while the three strongest models showed no statistically significant change; GPT-6.1 Sol scored 83.8% with screenshots alone and 82.7% with the tree. Clicks by element ID bypassed pixel errors and further boosted weaker models. The results cover one benchmark and one attempt per task, so they do not establish one model as better overall.

Source: [greptile.com](https://www.greptile.com/blog/trex-computer-use) · [HN](https://news.ycombinator.com/item?id=50615520)
51 points · 23 comments

### Beginner guide sets up local AI on Windows with Unsloth and Qwen

The author tried hosting a local model on Windows, using Unsloth Desktop to serve a quantized AI model sized to the GPU's VRAM, setting a context size, and turning on LAN access so the household can use it. On an RTX 5090 with 32GB VRAM the author chose Qwen3.8-27B at 4-bit quantization with a 128K context. The guide also notes Inkling 2 Mini, a 26.4B-parameter mixture-of-experts model released November 17, 2026, fits a 24GB card at its recommended 4-bit file. Quantization trades accuracy for fit and speed, and the author says workloads vary in how much that tradeoff costs.

Source: [gpupartner.com](https://www.gpupartner.com/blog/beginners-guide-local-ai-inkling-qwen-unsloth) · [HN](https://news.ycombinator.com/item?id=50603845)
758 points · 306 comments

### OpenRouter says users spent more on Google models than OpenAI last week

OpenRouter posted that its users spent more money on models from Google than from OpenAI last week, pushing Google over the 50% mark. The post attributes the shift to multiple well-received launches, including Gemini 4 Neon and Carbon. Only part of the article could be retrieved.

Source: [twitter.com](https://twitter.com/openrouter/status/2124925631012209137) · [HN](https://news.ycombinator.com/item?id=50623834)
12 points · 2 comments

### GLM-5.4 arrives as Z.ai's first loop transformer for coding

Z.ai published GLM-5.4, describing it as its first loop transformer and framing it as a step toward generalized coding. The announcement drew 1,121 points and 366 comments on Hacker News. Full article content could not be retrieved.

Source: [z.ai](https://z.ai/blog/glm-5.4) · [HN](https://news.ycombinator.com/item?id=50609685)
1121 points · 366 comments

### Declare is a UI language built for both people and AI to verify

David Temkin released Declare, a domain-specific language for user interfaces where layout, motion, states and drawing are part of the language rather than libraries. Programs are checked by a compiler, and diagnostics name the broken rule and a valid rewrite. In a single measured comparison, the same agent built a ticket-buying app twice: the Declare version was 1,279 lines versus React's 2,666, and its first working build passed all eleven hidden checks while React's passed six. The author states this is one run, not a benchmark, with every run in the repository.

Source: [davidtemkin.github.io](https://davidtemkin.github.io/declarelang/) · [HN](https://news.ycombinator.com/item?id=50622854)
52 points · 41 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*