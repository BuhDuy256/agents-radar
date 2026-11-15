# Hacker News AI Community Digest 2026-11-15

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-15 06:14 UTC

---

### Google releases Gemini 4 Hydrogen, a faster model for everyday coding and agent work
Google introduced Gemini 4 Hydrogen, which the company says beats Gemini 4 Argon on the Artificial Analysis Intelligence Index at its default high thinking level (51 vs. 50) and scores 54 at its new xhigh setting. Hydrogen has a 1-million-token context window and flat pricing of $1.50 per million input tokens and $7.50 per million output tokens. Google says it finishes tasks 2.5 times faster than Gemini 3.8 Flash at high setting and more than triples Terminal-Bench 4.1 scores (57% vs. 18.2%). The model is rolling out to all tiers of Google AI Studio, the Gemini API, Gemini for business, the Gemini app, Search, and paid Google AI Pro and Ultra subscribers in Google Antigravity.
Source: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) · [HN](https://news.ycombinator.com/item?id=50471431)
569 points · 350 comments

### Antigravity adds Orchestrator, which switches between Gemini 4 Carbon and Hydrogen mid-session
Google's Antigravity added Orchestrator, a model option that dynamically switches between Gemini 4 Carbon and Gemini 4 Hydrogen within one session instead of routing a whole task to one model upfront. Google says Carbon can plan and explore in a read-only phase, Hydrogen writes edits and runs tests, and Hydrogen hands back to Carbon when it hits friction. On Terminal-Bench 4.1, Google says Orchestrator reached near-Carbon task success while consuming 24% less quota and finishing 19% faster on average. Orchestrator is rolling out to Google AI Ultra and paid AI Pro subscribers, with additional models and plans supported later.
Source: [antigravity.google](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/) · [HN](https://news.ycombinator.com/item?id=50472260)
502 points · 163 comments

### Claude outage resolved after authentication errors hit claude.ai, Claude Code, and Console
Anthropic reported elevated errors affecting claude.ai, Claude Console (platform.claude.com), Claude Code, and Claude Cowork. The company said it was investigating an issue with users authenticating, deployed a fix, and later marked the incident resolved. The status page timeline ran from 09:58 UTC on Nov 13, 2026 through a monitoring update at 11:05 UTC and a resolution notice at 11:58 UTC. The incident affected authentication across all four listed surfaces, so developers and teams relying on Claude Code or the Console during that window should check whether failed sessions were caused by the outage.
Source: [status.claude.com](https://status.claude.com/incidents/nn11wk485zfn) · [HN](https://news.ycombinator.com/item?id=50481187)
493 points · 390 comments

### Claude Meetings enters beta so Claude can join video calls and produce notes and docs
Anthropic launched Claude Meetings in beta, letting Claude join video calls as a visible participant that answers questions, writes notes, and builds docs and whiteboards during the meeting. It is rolling out on Team and Enterprise plans with Google Meet support first; by default Claude stays out of calls with outside guests and leaves if one joins, unless an admin allows it. Claude saves a transcript, summary, and screen descriptions but not audio. The beta is not available to some organizations, including those with zero data retention, HIPAA-ready configuration, or customer-managed encryption keys. Notes and transcripts are free during beta, and call artifacts are free through February 10, 2027.
Source: [claude.com](https://claude.com/resources/articles/claude-meetings) · [HN](https://news.ycombinator.com/item?id=50491097)
111 points · 87 comments

### OpenAI disbands its stand-alone robotics team, reassigns researchers to general AI groups
OpenAI confirmed it disbanded its stand-alone robotics team and reassigned the researchers, moving the robotics research team under Chief Research Officer Mark Chen and the applied robotics and hardware teams under President Greg Brockman. The company says the move accelerates robotics work because general-purpose models including GPT-6 Astra have shown they can be applied directly to robots. In an Nvidia study, an Astra-powered agent achieved a 74.8% success rate on a simulated manipulation benchmark versus 51.0% reported by the best specialized robotic models on that leaderboard. The reorganization challenges startups built on the premise that robots need their own specialized models.
Source: [fortune.com](https://fortune.com/2026/11/13/openai-disbands-robotics-team-as-its-general-models-start-running-robots/) · [HN](https://news.ycombinator.com/item?id=50487184)
176 points · 73 comments

### Perplexity releases Decider v1.3 and Flash v1.3 decision models with a new locate feature
Perplexity released Decider v1.3 and the distilled Decider Flash v1.3, general-purpose classifiers that return probability distributions over answer options for yes/no, multiple-choice, and score questions in a single forward pass. The models are available on Hugging Face under an Apache license, through OpenRouter, and via the Perplexity Decisions API. The new locate feature highlights matched text for named entity recognition, personal information identification, and extractive question-answering instead of selecting from predefined options. The models were trained on Qwen3.8-27B and distilled into Qwen3.5-4B using generalist training, LoRA specialization, and a vision step. Internal uses include routing requests, judging outputs, moderation, and reranking.
Source: [perplexity.ai](https://www.perplexity.ai/hub/blog/perplexity-decider) · [HN](https://news.ycombinator.com/item?id=50488464)
145 points · 26 comments

### Study finds generative AI uses more energy on non-English text
A University of Michigan news item reports that generative AI uses more energy when processing non-English text. Full article content could not be retrieved.
Source: [news.umich.edu](https://news.umich.edu/generative-ai-uses-more-energy-on-non-english-text/) · [HN](https://news.ycombinator.com/item?id=50441444)
197 points · 103 comments

### The Atlantic piece argues AI is eroding trust between writers and readers
A story in The Atlantic titled "AI is destroying the trust between writers and readers" discusses AI-related literary scams on Amazon. Full article content could not be retrieved.
Source: [theatlantic.com](https://www.theatlantic.com/books/2026/11/ai-literary-scams-amazon/689391/) · [HN](https://news.ycombinator.com/item?id=50481870)
366 points · 228 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*