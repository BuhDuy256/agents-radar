# Hacker News AI Community Digest 2026-11-07

> Source: [Hacker News](https://news.ycombinator.com/) | 7 stories | Generated: 2026-11-07 05:48 UTC

---

### Google launches Gemini Omni 1.2 Flash with 15-second video and 30% lower price

Google announced Gemini Omni 1.2 Flash, which generates and edits video natively up to 15 seconds, up from 10 seconds with Omni 1.1, and supports durations in one-second increments from 3 to 15 seconds. The company says the model is generally available on the Gemini API and Google Cloud, costs $0.07 per second for 720p video — a 30% drop from 1.1 — and adds multi-turn conversational editing, so a clip can be refined turn by turn instead of regenerated. Google states outputs carry an imperceptible SynthID watermark, and that work continues on fast sports action, rapid script changes and complex physics.

Source: [blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/) · [HN](https://news.ycombinator.com/item?id=50392118)
311 points · 225 comments

### Pairing Jev with Claude Opus matches frontier accuracy at over 4x lower cost

Hightouch tested whether fast decision models Jev and GPT-6 Luna could grade identity resolution as well as frontier LLMs, using 1,000 synthetic identities from the pseudopeople simulator — half one person with noisy records, half over-merges. The authors report that Jev's confidence was better calibrated than Luna's: most of Jev's mistakes came with low confidence it was right, while most of Luna's mistakes came with high confidence. A hybrid model where Jev can ask Opus for help reached frontier accuracy at more than 4x lower cost, though on harder benchmarks frontier models stayed about 6 percentage points ahead of decision models alone.

Source: [hightouch.com](https://hightouch.com/blog/llm-judges-identity-resolution) · [HN](https://news.ycombinator.com/item?id=50397429)
407 points · 91 comments

### Anthropic IPO buyers discuss valuation as low as $1.1 trillion

Anthropic's IPO plans ran into a post-election selloff, prompting prospective investors to rethink the company's expected valuation before formal IPO marketing starts next week. According to people familiar with the matter, potential buyers are discussing a $1.2 trillion to $1.3 trillion range, and some are weighing a value as low as $1.1 trillion. Only part of the article could be retrieved.

Source: [bloomberg.com](https://www.bloomberg.com/news/articles/2026-11-06/anthropic-ipo-valuation-expectations-pressured-after-ai-rout) · [HN](https://news.ycombinator.com/item?id=50394906)
265 points · 529 comments

### Microsoft is winding down its Oracle deal to rent AI cloud capacity

Bloomberg reported that Microsoft is winding down its Oracle deal to rent AI cloud capacity. Full article content could not be retrieved.

Source: [reuters.com](https://www.reuters.com/business/microsoft-is-winding-down-oracle-deal-rent-ai-cloud-capacity-bloomberg-news-2026-11-06/) · [HN](https://news.ycombinator.com/item?id=50395933)
88 points · 17 comments

### METR report points to AI roughly doubling capabilities progress at Anthropic

Ajeya Cotra writes that an internal METR deep-access investigation found capabilities progress at Anthropic went about twice as fast between October 2025 and October 2026 as over the prior twelve months, measured with an internal version of the Epoch Capabilities Index called AECI. She argues that doubling overall progress requires speeding researchers up by much more than 2x — perhaps ~10x, which she says lines up with Anthropic staff self-reports of a ~12x uplift. The report authors were uncertain whether the acceleration compounds, but Cotra says they found no evidence of bottlenecks or steep diminishing returns, and she warns the industry is not prepared to handle it safely if it does.

Source: [planned-obsolescence.org](https://www.planned-obsolescence.org/p/ai-is-dramatically-accelerating-ai) · [HN](https://news.ycombinator.com/item?id=50397994)
252 points · 200 comments

### OpenAI opens outbound SIP calling to all organizations

OpenAI's docs describe how to connect inbound and outgoing phone calls to GPT-Live through a SIP trunk, with the provider exchanging call audio and your backend handling session configuration, call controls and business logic. Outbound SIP calling is now available to all organizations through the Live API, not the Realtime API call-creation endpoint; you create a session with transport.type "sip" and pass your provider's trunk endpoint in E.164 destination format. SIP signaling uses TLS and GPT-Live requires SRTP for call audio, and the docs advise keeping your OpenAI API key and SIP credentials on your server.

Source: [developers.openai.com](https://developers.openai.com/api/docs/guides/voice-sip) · [HN](https://news.ycombinator.com/item?id=50399695)
62 points · 52 comments

### Claude Code bug report says it sent users' email addresses to websites

A GitHub issue opened on Nov 5 reports that Claude Code disclosed users' email addresses to arbitrary third parties in the User-Agent request header during web searches without permission. The reporter says they receive dozens of scam emails per day as a result and calls for the behavior to be removed from the harness entirely rather than offered as an opt-in or opt-out setting. A contributor replied that a built-in mod named cc-plugin-privacy blocks the behavior deterministically in v2.1.317 and later, is enabled by default, and can be turned off via /plugins.

Source: [github.com](https://github.com/anthropics/claude-code/issues/107757) · [HN](https://news.ycombinator.com/item?id=50385272)
1563 points · 501 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*