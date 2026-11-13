# Hacker News AI Community Digest 2026-11-13

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-13 06:26 UTC

---

### Anthropic opens IPO roadshow, targeting Nasdaq listing under ticker "ANT"
Anthropic began its IPO roadshow on November 10, with the final share price expected to be set on November 18 and trading expected to start November 19 on Nasdaq under the ticker "ANT", according to the company's offering page. The page reports Q3'26 revenue of $17.0B, described as more than 12x year-over-year, and more than 11,900 customers with at least $100K in trailing-twelve-month revenue. It also reports a $23.3B net loss that includes a $21.9 billion non-cash charge tied to a change in the fair value of convertible notes, derivative liabilities, and SAFEs. The company says the offering is for Class A common stock and that allocations are not guaranteed.
Source: [ipo.anthropic.com](https://ipo.anthropic.com/us/) · [HN](https://news.ycombinator.com/item?id=50465829)
888 points · 848 comments

### Anthropic releases Claude Fable 5.2 and Mythos 5.2 with faster, cheaper output
Anthropic announced Claude Fable 5.2 and Mythos 5.2 on November 9, saying the two share one underlying model: Fable ships with cybersecurity and biology safeguards for general availability, while Mythos is available to organizations through its Life Sciences and Cyber Verification Programs. The company says outputs generate up to 30% faster than the 5.1 versions at $8 per million input tokens and $40 per million output tokens, with an optional fast mode at $16 and $80. Performance figures are stated per benchmark: 49.1% on FrontierCode 2.0 at Xhigh effort, 69.9% on FrontierSWE v2, and 89.6% on CVE Rediscovery for Mythos 5.2. The company recommends users start with Claude Opus 5.5 for most coding and knowledge tasks and move up to Fable or Mythos as needed.
Source: [anthropic.com](https://www.anthropic.com/claude-fable-and-mythos-5-2) · [HN](https://news.ycombinator.com/item?id=50429068)
919 points · 1053 comments

### Google launches Gemini 4 Hydrogen across the Gemini API, app, and Search
Google introduced Gemini 4 Hydrogen on November 12, a model it says is built for fast execution in everyday coding and agentic workflows rather than long-horizon reasoning, and made it available across Google AI Studio, the Gemini API, Gemini for business, the Gemini app, Google Search, and paid AI Pro and Ultra tiers in Google Antigravity. The company says Hydrogen scores 51 on the Artificial Analysis Intelligence Index at its default high thinking level, above Gemini 4 Argon's 50, reaching 54 at the highest xhigh setting, and is priced flat across its 1 million-token context window at $1.50 per million input tokens and $7.50 per million output tokens. It reports Hydrogen more than tripled Terminal-Bench 4.1 scores versus Gemini 3.8 Flash (57% vs 18.2%) and cut fabricated claims by more than 5x; all figures are the company's own.
Source: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) · [HN](https://news.ycombinator.com/item?id=50471431)
505 points · 321 comments

### Google pairs Hydrogen with Carbon in Antigravity's Orchestrator model router
Google Antigravity rolled out Gemini 4 Hydrogen alongside a new model dropdown option called Orchestrator, which switches between Gemini 4 Carbon and Hydrogen within a single task instead of routing the whole task to one model from the first prompt. The blog describes the pattern as Carbon exploring dependencies and building a plan, Hydrogen writing edits and running tests, and handing back to Carbon when it hits friction. On Terminal-Bench 4.1, the company says Orchestrator reached near-Carbon task success rates while consuming 24% less quota and finishing 19% faster on average. Orchestrator is rolling out as Orchestrator (Carbon) and Orchestrator (Argon) for Google AI Ultra subscribers and Orchestrator (Argon) for paid Google AI Pro subscribers.
Source: [antigravity.google](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/) · [HN](https://news.ycombinator.com/item?id=50472260)
374 points · 101 comments

### Google's Gemini Decisions API scores up to 1,000 questions in one pass
Google announced the Gemini Decisions API on November 11, powered by a new Gemini Decision 1 model that returns probabilities and confidence scores rather than generating answer text token by token. A single request can carry one multimodal input across text, images, audio, video, and PDFs up to 256K tokens plus up to 1,000 independent questions in three types: yes/no, multiple choice from 2 to 255 options, and ordered rubric scoring. The company says latency is 150-250 ms end-to-end and pricing is $0.10 per 1M input tokens with zero output tokens billed, and that its own benchmark suite shows the lowest calibration error with nearly 5x lower cost than Gemini 3.5 Flash-Lite with the Interactions API.
Source: [blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/) · [HN](https://news.ycombinator.com/item?id=50456791)
556 points · 157 comments

### United Airlines bans third-party AI agents from booking flights
United Airlines said on Wednesday it is restricting unauthorized, third-party personal AI agents and assistants from booking and ticketing on its digital platforms and indirectly through travel agencies and aggregators. The carrier cited security risks from sharing account credentials with AI assistants, possible unintended purchases or account changes, and federal rules it says could be violated, such as requirements that travelers verify in person that luggage contains no banned substances. Aviation analyst Henry Harteveldt told CBS News that United may want to avoid adding another intermediary and the expense of bot flight searches, and noted Southwest instead made its inventory viewable to ChatGPT users.
Source: [cbsnews.com](https://www.cbsnews.com/news/united-airlines-bans-ai-agents-booking-flights/) · [HN](https://news.ycombinator.com/item?id=50458900)
669 points · 693 comments

### Amazon engineers swap Sonnet 4.6 for Strands Decider on ticket labeling
Two Amazon engineers replaced Claude Sonnet 4.6 with Strands Decider E4B for labeling tickets in an internal system across 20 category types, reporting equal or better results at about 98% less cost. They ran both models in parallel on live traffic before switching, using a three-way AWS AppConfig setting (BEDROCK, DUAL, DECIDER) so a rollback was a config change. They measured 897 ms average time per call versus 4,215 ms, and 2,010 tokens per ticket versus 6,724; at published us-east-1 prices they cite about $0.0005 per ticket versus $0.0222. They note the approach fits closed choices from a known catalog at high volume, and that reordering JSON keys moved output probabilities by up to 0.19 before they sorted keys.
Source: [strandsagents.com](https://strandsagents.com/blog/amazon-saves-millions-replacing-sonnet-with-strands-decider/) · [HN](https://news.ycombinator.com/item?id=50436640)
727 points · 262 comments

### Edge0 open-sources a 145B parameter model it says runs on a laptop
Edge0 released Edge0-145B and Edge0-120B as open-source on-device models, along with an inference framework and deployment tools, claiming Edge0-145B is the first open-source on-device model at 145 billion parameters. The company reports 29GB peak memory, 1,100+ tokens/s prefill, 80+ tokens/s decode, and about 120W typical power on a compatible laptop, with 128K-256K context. Its design shares large matrices across groups of 64 experts so only about 10B parameters participate per inference step, and it pipelines GPU memory, system memory, and SSD. Edge0 lists benchmark scores of 64.6 on DeepSWE 1.1, 90.4 on GPQA-Diamond, and 80.6 on IFBench; these are the company's own comparisons against specific cloud models.
Source: [edge0.ai](https://edge0.ai/blog/introducing-edge0-145b-frontier-ai-capabilities-on-your-own-computer) · [HN](https://news.ycombinator.com/item?id=50475713)
183 points · 44 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*