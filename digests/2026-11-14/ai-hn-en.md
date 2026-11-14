# Hacker News AI Community Digest 2026-11-14

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-14 06:07 UTC

---

### Anthropic opens IPO roadshow with $17.0B quarterly revenue and a $23.3B net loss
Anthropic began its IPO roadshow on November 10, offering Class A common stock on Nasdaq under the ticker "ANT." The company reported Q3'26 revenue of $17.0B, more than 12x year over year, with over 11,900 customers at $100K or more in trailing-twelve-month revenue. Its $23.3B net loss includes a $21.9B non-cash charge tied to revaluation of convertible notes, derivative liabilities, and SAFEs; adjusted operating margin was 15% while GAAP operating margin was -3%. The final IPO price is expected November 18, with trading to begin November 19.
Source: [ipo.anthropic.com](https://ipo.anthropic.com/us/) · [HN](https://news.ycombinator.com/item?id=50465829)
996 points · 907 comments

### Google adds Gemini 4 Hydrogen and an Orchestrator mode to Antigravity
Google rolled out Gemini 4 Hydrogen inside Google Antigravity and a new model dropdown option called Orchestrator, which pairs Hydrogen with stronger models including Gemini 4 Carbon. Orchestrator switches between the two within a single task: Carbon explores and plans, Hydrogen writes edits and runs tests, and control hands back to Carbon when Hydrogen hits friction. Google says this reached near-Carbon success on Terminal-Bench 4.1 while consuming 24% less quota and finishing 19% faster on average. Hydrogen alone scores 51 on the Artificial Analysis Intelligence Index and 57% on Terminal-Bench 4.1.
Source: [antigravity.google](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/) · [HN](https://news.ycombinator.com/item?id=50472260)
497 points · 161 comments

### Claude Code Projects move from folders to coordinated parallel threads
Anthropic redesigned Claude Code projects so a coordinator splits a stated goal across parallel threads, each a cloud session on its own branch and copy of the repo. A developer sets a goal plus repos or context; Claude scopes the work, routes tasks to new or existing threads, opens pull requests, runs tests, and assembles results, with each thread able to use subagents and loops. A shared memory accumulates project decisions and the user's working style. The beta is limited to select Pro and Max subscribers using cloud sessions without existing web or desktop projects, and projects can hit usage limits faster because each thread consumes a full session.
Source: [claude.com](https://claude.com/resources/articles/projects-redesigned) · [HN](https://news.ycombinator.com/item?id=50492141)
75 points · 72 comments

### Anthropic resolves authentication errors across Claude.ai, Claude Code and Console
Anthropic reported elevated errors affecting claude.ai, Claude Console, Claude Code, and Claude Cowork, starting with an investigation posted November 13 at 09:58 UTC. A fix was deployed and the company moved to monitoring at 11:05 UTC, then marked the incident resolved at 11:58 UTC. The company said the issue involved users authenticating to Claude.ai and Claude Code. No cause or duration beyond that window was given in the incident report.
Source: [status.claude.com](https://status.claude.com/incidents/nn11wk485zfn) · [HN](https://news.ycombinator.com/item?id=50481187)
488 points · 383 comments

### smolmaxxing runs 80B-parameter models on a phone with about 3GB free
The smolmaxxing project patches llama.cpp so small devices run the largest model they can hold, keeping popular mixture-of-experts weights in RAM and paging the rest from flash. The author measured an Amlogic TV box at 7.7 tok/s on Qwen3.5-2B and 5.1 tok/s on a 16B Ling-mini-2.0, a jailbroken iPad Air at 24-26 tok/s on a 1-bit Bonsai-1.7B, and a OnePlus Nord CE 2 at 4.9-5.7 tok/s on Qwen3.6-35B-A3B and 2.6-3.1 tok/s on Qwen3-Next-80B-A3B. The TV box and iPad builds need the patched llama.cpp because stock builds cannot load the pruned heads.
Source: [github.com](https://github.com/hyperionaidev/smolmaxxing/) · [HN](https://news.ycombinator.com/item?id=50468888)
470 points · 180 comments

### OpenAI disbands its stand-alone robotics team, folding researchers into general AI
OpenAI disbanded its stand-alone robotics team, reassigning robotics researchers to the main research team under Chief Research Officer Mark Chen and its applied robotics and hardware teams to the Applied organization under President Greg Brockman. The company said robotics remains core to its long-term vision and that the move accelerates rather than abandons it. OpenAI says its general frontier models, including GPT-6 Astra, now apply directly to robotics; in an Nvidia study an Astra-powered agent reached a 74.8% success rate on a simulated manipulation benchmark versus 51.0% for the best specialized robotic models. MIT's Russ Tedrake noted robotics firms still hold real-world deployment data the labs lack.
Source: [fortune.com](https://fortune.com/2026/11/13/openai-disbands-robotics-team-as-its-general-models-start-running-robots/) · [HN](https://news.ycombinator.com/item?id=50487184)
155 points · 66 comments

### Edge0 open-sources a 145B on-device model reporting 80+ tokens/s on a laptop
Edge0 open-sourced Edge0-145B and Edge0-120B with its inference framework and deployment tools, calling it the first open-source on-device model at 145B parameters. The company reports 29GB peak memory, 1,100+ tokens/s prefill, 80+ tokens/s decode, roughly 120W typical power, and 128K-256K context on a compatible laptop. Four design choices support this: sharing large matrices across groups of 64 experts, training in the on-device architecture from the start, pipelining GPU memory, system memory and SSD, and running CPU and GPU together with speculative decoding. The company says only about 10B of the 145B parameters participate per inference step; results are internal testing.
Source: [edge0.ai](https://edge0.ai/blog/introducing-edge0-145b-frontier-ai-capabilities-on-your-own-computer) · [HN](https://news.ycombinator.com/item?id=50475713)
343 points · 104 comments

### Jonathan Blow video asks why AI coding progress has not changed shipped software
A video titled "If AI solved coding, why is my software still the same?" by Jonathan Blow was published and discussed on Hacker News. The submission reached HN rank 11 with 205 points and 204 comments. No article text was available for the video, so no claims from it can be summarized.
Full article content could not be retrieved.
Source: [youtube.com](https://www.youtube.com/watch?v=IRK8h67ol7Q) · [HN](https://news.ycombinator.com/item?id=50484658)
205 points · 204 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*