# Hacker News AI Community Digest 2026-11-08

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-08 05:51 UTC

---

### Claude Code Sent User Email Addresses in Web Request Headers, GitHub Issue Alleges

A GitHub issue filed Nov 5, 2026 on the anthropics/claude-code repository alleges that Claude Code disclosed users' email addresses to arbitrary third-party websites via the User-Agent request header during web searches, without user permission. The reporter, taylor-edwards, says the result was dozens of scam emails per day and that they are migrating their company to Pi with OpenRouter. An Anthropic contributor replied in the thread that the company introduced a built-in mod called cc-plugin-privacy to deterministically block the behavior in v2.1.317 and later, enabled by default and switchable off via /plugins, and asked users to report any gaps in the checks.

Source: [github.com](https://github.com/anthropics/claude-code/issues/107757) · [HN](https://news.ycombinator.com/item?id=50385272)
1593 points · 519 comments

### Google Releases Gemini Omni 1.2 Flash With 15-Second Video Clips and a 30% Price Cut

Google announced Gemini Omni 1.2 Flash, which generates clips natively up to 15 seconds, up from 10 seconds in Omni 1.1, and can specify duration in one-second increments from 3 to 15 seconds. The company says the price dropped 30% to $0.07 per second for 720p video, and the model is generally available on the Gemini API and Google Cloud with Provisioned Throughput and an imperceptible SynthID watermark on outputs. It adds multi-turn conversational editing, so a detail can be fixed with a follow-up prompt instead of regenerating a clip, and Google notes development continues on fast sports action, rapid script changes and complex physics.

Source: [blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/) · [HN](https://news.ycombinator.com/item?id=50392118)
361 points · 251 comments

### Microsoft Research's AI Frontiers Group Is Shut Down After Reorg Into Microsoft AI

John Langford wrote that Microsoft Research's AI Frontiers sub-organization, an approximately 50-person group founded in 2023 to organize coherent research efforts, ended after being reorged into Microsoft AI in early September 2026. Langford says the ex-Inflection leadership of MAI is focused on scaling and "aggressively not research," and that every other founding AIF leadership team member reached a similar conclusion. He cites the Bytedance experiments suggesting a variant of the Full Bandwidth Transformer might match a model of twice the size, and says he could not get innovation into use or seriously considered while in MAI. He also said there will be no internships with the group in the coming year.

Source: [hunch.net](https://hunch.net/?p=13764006) · [HN](https://news.ycombinator.com/item?id=50406563)
430 points · 255 comments

### Hightouch Test Finds Jev Plus Opus Reaches Frontier Accuracy at Four Times Lower Cost

Hightouch tested whether cheap decision models like Jev and GPT-6 Luna could grade identity resolution as well as frontier LLMs, using a benchmark of 1,000 identities built with the pseudopeople simulator, half single people with noisy records and half over-merges. Claude Opus 5.5 scored 99.0% accuracy at $3.86 per 1,000 identities and 2.2 seconds per identity, while a hybrid combining Jev with Opus reached near-Opus accuracy at more than 4x lower cost. The authors report Jev's confidence is better calibrated than Luna's, with most Jev mistakes coming at low confidence and most Luna mistakes at high confidence, but the material notes decision models still trail Opus by about 6 percentage points on harder benchmarks.

Source: [hightouch.com](https://hightouch.com/blog/llm-judges-identity-resolution) · [HN](https://news.ycombinator.com/item?id=50397429)
573 points · 146 comments

### Rivet Launches Actor Orchestration Built on S3 With 4.99 ms p99 Cold Starts

Rivet (YC W23) launched Rivet Actors, long-lived processes with in-memory state, a SQLite database, WebSockets and scheduling that developers can create per agent, user, session or tenant. The project claims 72 KB per Actor, 4.99 ms p99 cold starts, and SQLite backed by S3 with 1.07 ms durable writes and 1.36 ms reads at p99, roughly 10.4x cheaper than replicated SSD storage. The suggested pattern is to run the agent loop outside the sandbox—"separating the head from the hands"—so state, memory and context live in the Actor and it reaches a sandbox through tools only when code must run, which the project says limits the blast radius. The stated tradeoff is that agents needing to run generated code still require a sandbox, either agentOS or an existing provider.

Source: [github.com](https://github.com/rivet-dev/rivet) · [HN](https://news.ycombinator.com/item?id=50381687)
120 points · 59 comments

### Write-Up Describes Undocumented Apple Daemons Building a Personal Knowledge Graph

A write-up on Eighth Rank describes knowledgeconstructiond and intelligenceplatformd, a pair of daemons shipped on every Mac since macOS 13 (2022) that build an on-device knowledge graph about the user and the people around them. According to the author, the graph is built by cross-referencing Contacts, Calendar, Photos, Messages, Mail, location, Screen Time and other behavioral signals, and is held as a queryable store that LLMs retrieve from. The piece says the closest official description is the man page for knowledgeconstructiond, which states only that it analyzes device content to help build a general-purpose knowledge graph. The author also offers a tool to inspect your own graph, and notes the system is largely undocumented.

Source: [8rank.ai](https://8rank.ai/game/apple-intelligence-personal-knowledge-graph) · [HN](https://news.ycombinator.com/item?id=50403097)
664 points · 371 comments

### Anthropic IPO Buyers Reportedly See Valuation as Low as $1.1T

Bloomberg reported that Anthropic IPO buyers see valuation as low as $1.1 trillion, following an AI rout. Full article content could not be retrieved.

Source: [bloomberg.com](https://www.bloomberg.com/news/articles/2026-11-06/anthropic-ipo-valuation-expectations-pressured-after-ai-rout) · [HN](https://news.ycombinator.com/item?id=50394906)
312 points · 614 comments

### Claude Code's "Don't Ask Again" Reportedly Exposed Passwords in 1,122 Public GitHub Files

An Apiiro blog post, per its title, reports that Claude Code's "Don't Ask Again" setting exposed passwords in 1,122 public GitHub files. Full article content could not be retrieved.

Source: [apiiro.com](https://apiiro.com/blog/coding-agents-leaking-secrets-github-dont-ask-again) · [HN](https://news.ycombinator.com/item?id=50407882)
294 points · 201 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*