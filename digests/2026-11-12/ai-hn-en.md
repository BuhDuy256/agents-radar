# Hacker News AI Community Digest 2026-11-12

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-12 07:00 UTC

---

### Anthropic launches Claude Fable 5.2 and Mythos 5.2 for hard technical work
Anthropic announced Claude Fable 5.2 and Mythos 5.2, the same underlying model with different safeguards: Fable has cybersecurity and biology limits for general release, while organizations can apply for Mythos access through Anthropic's Life Sciences and Cyber Verification Programs. The company says the models generate outputs up to 30% faster than the 5.1 versions and cost $8 per million input tokens and $40 per million output tokens, with an optional fast mode at $16 and $80. On FrontierCode 2.0, Fable 5.2 scored 49.1% at Xhigh effort, the highest figure Anthropic reports testing. Anthropic recommends starting most coding and knowledge work with Opus 5.5 and moving up or down as scope requires.
Source: [anthropic.com](https://www.anthropic.com/claude-fable-and-mythos-5-2) · [HN](https://news.ycombinator.com/item?id=50429068)
912 points · 1039 comments

### Amazon engineers cut ticket labeling cost 98% by swapping Sonnet 4.6 for a decision model
Two Amazon engineers replaced Claude Sonnet 4.6 with Strands Decider E4B, a decision model that returns a probability per option instead of generating text, for labeling tickets across 20 categories in an internal system. They say token use per ticket fell 70% (6,724 to 2,010) and average call time fell 78%, cutting cost from about $22,200 to about $500 per million tickets. A three-way AppConfig switch (Bedrock, Dual, Decider) let them run both models in parallel on real traffic before switching over. The authors warn the approach fits closed-choice, high-volume tasks, not labels that need explanation text or catalogs that change weekly.
Source: [strandsagents.com](https://strandsagents.com/blog/amazon-saves-millions-replacing-sonnet-with-strands-decider/) · [HN](https://news.ycombinator.com/item?id=50436640)
723 points · 257 comments

### United Airlines bans third-party AI agents from booking flights
United Airlines said it is restricting access to its digital platforms, and indirectly through travel agencies and aggregators, to prohibit use by unauthorized third-party personal AI agents. The carrier cited security risks from sharing account credentials with AI assistants, which it said could lead to unintended purchases or account changes, and said agent actions such as check-in could violate federal rules requiring travelers to verify luggage contents. Aviation analyst Henry Harteveldt told CBS News that United may want to avoid search costs from AI bots and retain control of booking, and noted Southwest instead made its inventory viewable to ChatGPT users.
Source: [cbsnews.com](https://www.cbsnews.com/news/united-airlines-bans-ai-agents-booking-flights/) · [HN](https://news.ycombinator.com/item?id=50458900)
508 points · 494 comments

### Apple's unreleased Harbor app turns Macs into a private AI inference server
Leaker Aaron Perris found evidence of an Apple Mac app called Harbor, in private preview under Apple's Claris brand, that runs open-weight models locally on Apple silicon. The app is described as detecting devices over Thunderbolt 5 to form a cluster, pooling unified memory so two or more Macs can run models larger than one machine, and browsing and loading models from inside the app. Apple has not announced a public release date, so the described features remain unconfirmed by the company.
Source: [9to5mac.com](https://9to5mac.com/2026/11/10/apple-has-new-mac-app-coming-to-make-running-local-ai-models-easy/) · [HN](https://news.ycombinator.com/item?id=50446520)
528 points · 535 comments

### Anthropic's vulnerability project adds 12,000 findings and 15 fixes in two months
VulnCheck tracked 442 CVEs attributable to Anthropic seven months into Project Glasswing, about 0.5% of this year's published CVEs, with two identified as exploited in the wild. Anthropic's own ledger shows 37,966 findings and 217 fixes as of November 2, with 19.4% made public, 1,654 marked duplicate and 419 withdrawn; its claimed true positive rate rose from 90.8% to 94.2%. In a maintainer-side check, curl published 34 of 45 Anthropic reports, with 19 marked not a vulnerability, six confirmed low severity and nine awaiting assessment.
Source: [vulncheck.com](https://www.vulncheck.com/blog/anthropic-glasswing-november-update) · [HN](https://news.ycombinator.com/item?id=50447074)
449 points · 219 comments

### Anthropic adds Whiteboards, Sheets and Data to Claude on all paid plans
Claude Whiteboards and Claude Sheets entered beta and Claude Dashboards became generally available as Claude Data, letting teams keep boards, spreadsheets and dashboards inside Claude instead of exporting them. Whiteboards turns spoken plans into a board and can move output into tools like Lucid, Miro or Vani; Sheets builds tabs, formulas and formatting from a prompt and can export to .xlsx or CSV. Claude Data adds certified queries, data stories, live sharing and caching. On Enterprise plans Whiteboards and Sheets are off by default, and Data turns on November 19, 2026.
Source: [claude.com](https://claude.com/resources/articles/sheets-whiteboards-data) · [HN](https://news.ycombinator.com/item?id=50443716)
285 points · 216 comments

### Apple researchers train small networks to route retrieval queries faster
Apple researchers presented a paper at ICML 2026 describing SupportNet and KeyNet, small neural networks trained offline per key database to route queries toward their best match in maximum inner product search. Their claim is that routing by cluster centroid misses nearest neighbors, so the networks approximate each cluster's support function or predict the best-matching key directly, cutting the search cost at inference. The approach depends on training data drawn from the query distribution that matters, and the material gives no general claim that it beats every baseline for all inputs.
Source: [machinelearning.apple.com](https://machinelearning.apple.com/research/faster-retrieval) · [HN](https://news.ycombinator.com/item?id=50455633)
191 points · 36 comments

### Modelplane publishes an inference engineering guide for platform teams
Modelplane released a field guide for platform engineers moving into inference work, covering inference engines, the stack of kernels, engine, control plane and gateway, and how existing skills like GPU placement, cache-aware routing and cost per million tokens map onto the role. The guide argues self-hosting makes sense when API spend becomes a real line item, latency or reliability needs outgrow vendors, or data cannot leave the network, and that a hosted API is still the right call early in a product's life. It states that figures and tool versions are as of October 2026.
Source: [docs.modelplane.ai](https://docs.modelplane.ai/guides/inference-guide) · [HN](https://news.ycombinator.com/item?id=50443714)
92 points · 10 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*