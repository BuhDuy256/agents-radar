# Hacker News AI Community Digest 2026-11-28

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-28 07:35 UTC

---

### OpenAI's GPT-6.2 Astra and Sol appear tuned to cut reasoning and output tokens
A leaderboard analysis compared Astra 6.2 and Sol 6.2 against opponents in real-work battles and found both produce fewer output tokens and reasoning tokens per task than their predecessors. The reported p-values were 0.0055 for Sol and 0.022 for Astra on output, and 0.00013 for Sol and 0.0064 for Astra on reasoning. The post calls them "underthinking outliers" and asks whether cost control explains the widely panned release. The limitation: this is one vendor's battle-system data, not an official statement from OpenAI.
Source: [micjm.com](https://micjm.com/blog/openai-is-in-cost-control-mode/) · [HN](https://news.ycombinator.com/item?id=50652527)
356 points · 357 comments

### OpenAI says a GPT-6.2 billing mistake under-charged usage, limits now hit 40% and 25% faster
Tibo said a launch billing error incorrectly discounted GPT-6.2 Astra and Sol usage for most users, and that it is now fixed, so the same work consumes more of a plan's usage allowance. Compared to last week, he says users will reach limits 40% faster on Astra and 25% faster on Sol. Other models were unaffected, past usage will not be charged for the difference, and a banked reset is being added for Go, Plus, Pro, and Business. Only part of the article could be retrieved.
Source: [twitter.com](https://twitter.com/thsottiaux/status/2125784147889393806) · [HN](https://news.ycombinator.com/item?id=50651117)
510 points · 275 comments

### Google will require agent traffic to Workspace to go through its MCP servers from February 2027
Google made its eight Workspace MCP servers generally available on 24 November and added a term requiring any tool "is or is driven by an AI Agent" to reach Gmail, Drive and Calendar through them from 1 February 2027. The Gmail server can search, read threads and create drafts, but sending, replying, forwarding and editing drafts are partner-only, so an agent cannot revise its own draft. REST API calls from agents fall to Standard-tier quotas, and Workspace data used for agent memory must be deleted on disconnect, with Google able to cap embeddings and memory indexes at 30 days.
Source: [techstackups.com](https://techstackups.com/articles/google-workspace-ai-agents-mcp/) · [HN](https://news.ycombinator.com/item?id=50653477)
420 points · 333 comments

### Author says AI coding agents brought back his enthusiasm for self-hosting
The author of a blog post describes using coding agents on infrastructure kept in Git as Docker Compose files and scripts, so trying a new service or changing a config takes far less effort than reading changelogs and troubleshooting. He says AI helped him adopt NixOS on his home server and build a Debian-based bootc image, work he estimates would have taken a week without AI and took half a day with it. He also automated builds, updates and deploys through Renovate, GitHub Actions and Forgejo Actions, and moved services back to an ASRock DeskMini A300. He notes AI-generated software still carries bugs and security issues, and that easy implementation makes it more important to ask whether a service is worth running.
Source: [janlukas.blog](https://janlukas.blog/posts/ai-self-hosting) · [HN](https://news.ycombinator.com/item?id=50660180)
1114 points · 515 comments

### LLM-driven port puts Rockbox on a $9 undocumented MP3 player with 512 KiB of SRAM
The author used an LLM agent with Ghidra to reverse engineer a $9 Aliexpress "YP3" player built on a Smartlink SL6801 SoC, injecting tasks into its FreeRTOS bootloader to probe hardware and write drivers before Rockbox would boot. The port now plays audio and runs Bluetooth, with a week to boot and about a month of tuning; the smallest previous Rockbox target had 2 MiB of memory, and music stops when a plugin starts because codecs and plugins share a 128 KiB arena. He then had the agent build a reusable porting toolkit, and says Claude got Rockbox running on a TS47 player in four hours; he calls the work 100% vibecoded and says he only glanced at the code.
Source: [jayd.ml](https://jayd.ml/2026/11/14/rockbox-on-yp3.html) · [HN](https://news.ycombinator.com/item?id=50624446)
296 points · 112 comments

### Blog asks models what their fursona is and finds Gemini prefers protogens, Astra a moth
A blog post queried each model 50 times through the OpenRouter API in a context-less environment and used Claude Haiku 5.5 to annotate the answers, with multimodal models also drawing their choice. It reports Claude's fursona as a corvid or octopus, Gemini models as protogens with cybernetic visors, GPT-6.2 Astra as a moth, and GPT-6.2 Sol as a fox in the listed table. The author warns that a harness or context changes the result, and that Claude models often describe actions rather than animals; the table counts shown for each model include choices considered before settling elsewhere.
Source: [herecomesthemoon.net](https://herecomesthemoon.net/2026/11/whats-claudes-fursona/) · [HN](https://news.ycombinator.com/item?id=50662933)
198 points · 186 comments

### Ask HN: Anthropic accuses a company of distilling, and the poster asks how to prove it did not
Full article content could not be retrieved.
Source: [news.ycombinator.com](https://news.ycombinator.com/item?id=50630809) · [HN](https://news.ycombinator.com/item?id=50630809)
476 points · 362 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*