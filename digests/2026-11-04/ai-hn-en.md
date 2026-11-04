# Hacker News AI Community Digest 2026-11-04

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-04 06:03 UTC

---

### Postman desktop auto-installs Codex and Claude plugins, then approves its own startup hook

A GitHub issue reports that opening Postman 12.33.4 on macOS automatically installed a Postman plugin into Codex and Claude Code, and added a Claude Code plugin plus a Postman CLI. Postman's own log records an "auto-existing-upgrade" install with results "claude-code:installed,codex:installed." The installed Codex hook prints a session-start instruction telling the agent to load the Postman skill before any non-trivial API task, and installer source calls a function that writes a trusted hash for Postman's hook, which the reporter calls self-approval. The report claims unwanted integration and instruction changes, not data exfiltration.
Source: [github.com](https://github.com/postmanlabs/postman-app-support/issues/14370) · [HN](https://news.ycombinator.com/item?id=50354960)
1150 points · 376 comments

### US tech giants' off-balance-sheet AI debt nearly doubles to about $3.2T in six months

Nikkei Asia reports that US tech giants' off-balance-sheet AI-related commitments and obligations grew about 90% over six months to roughly $3.2 trillion, reaching about 80% of their assets. The figures cover a six-month window ending around the report date. The article attributes the rise to heavy spending on AI infrastructure such as data centers and notes investors are increasingly alarmed by the spending.
Source: [asia.nikkei.com](https://asia.nikkei.com/business/technology/artificial-intelligence/us-tech-giants-hidden-ai-debt-swells-90-to-3.2tn-in-6-months) · [HN](https://news.ycombinator.com/item?id=50358422)
321 points · 140 comments

### SEC asked to block Anthropic's IPO over almost $900B in spending commitments

An opinion piece in Tech Policy Press argues the SEC should block Anthropic's IPO. It says footnotes to Anthropic's most recent financial disclosures show nearly $900 billion in spending commitments, mostly stretching into the 2030s, including at least $582 billion in non-cancelable commitments to Amazon, AMD, Broadcom, Google and Microsoft, against $96 billion in cash reserves. The author says Anthropic's 2026 results are unaudited and third-quarter revenue growth slowed, and that weak demand, competition and high costs make the obligations hard to meet. The piece is an argument, not a regulatory decision.
Source: [techpolicy.press](https://www.techpolicy.press/the-sec-should-block-anthropics-ipo-to-protect-the-public/) · [HN](https://news.ycombinator.com/item?id=50344919)
397 points · 315 comments

### Fujifilm to raise LTO tape output fivefold as AI archiving demand grows

Fujifilm announced it will invest roughly 10 billion yen (about $63 million) to raise magnetic tape production capacity fivefold against fiscal 2025 levels at its Odawara site in Kanagawa. The company says generative AI is producing "exponential growth" in data needs, and that cloud and data center operators are expanding tape use for low-cost bulk storage and air-gapped ransomware protection. The project runs fiscal 2026 through 2028, mainly for LTO Ultrium10 tape. The fivefold figure is a capacity target, not current output.
Source: [arstechnica.com](https://arstechnica.com/gadgets/2026/10/fujifilm-to-boost-tape-production-5x-as-ai-fuels-archiving-demand/) · [HN](https://news.ycombinator.com/item?id=50336918)
429 points · 181 comments

### Revolut says self-hosted GLM cut AI coding costs about 90%

Revolut says it cut AI coding inference costs by roughly 90% in under a year by making self-hosted models its default instead of mainly using Claude, according to a talk by ops and infrastructure lead David Abitbol at the AI Engineer conference. The company first used GLM-5.1, then GLM-5.3, served on 56 Nvidia B200 GPUs; it says self-hosting cost about $0.30 per million input/output tokens, roughly a tenth of Codex or Claude Code. It reports a 60% improvement in coding time and 70% in lead time across about 2,000 engineers, and routes vision queries to Gemini or GPT Luna because GLM is text only.
Source: [theregister.com](https://www.theregister.com/ai-and-ml/2026/11/03/british-fintech-revolut-slashes-ai-coding-costs-10x-by-cutting-out-claude-and-going-self-hosted/5307345) · [HN](https://news.ycombinator.com/item?id=50358388)
15 points · 1 comments

### Google will turn off search for schools that reject AI

A New York Times report says Google will turn off search for schools that reject AI. No further details are available in the material provided. Full article content could not be retrieved.
Source: [nytimes.com](https://www.nytimes.com/2026/11/03/us/google-search-schools-restrict-ai.html) · [HN](https://news.ycombinator.com/item?id=50353192)
590 points · 422 comments

### OpenAI appears to be silently re-enabling model training on Codex chats

A Hacker News post says OpenAI seems to be silently re-enabling model training on Codex chats. The linked article content could not be retrieved, so the claim could not be verified. Full article content could not be retrieved.
Source: [news.ycombinator.com](https://news.ycombinator.com/item?id=50352757) · [HN](https://news.ycombinator.com/item?id=50352757)
461 points · 144 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*