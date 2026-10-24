# Hacker News AI Community Digest 2026-10-24

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-10-24 01:01 UTC

---

### DeepSeek open-sources DeepInfer, its production inference framework for V4.1-Flash

DeepSeek released DeepInfer on GitHub, the framework it says powers its large-scale production services, with offline inference support for DeepSeek-V4.1-Flash. It includes optimized kernels, Attention DP with balanced CP, MoE EP plus EPLB, asynchronous scheduling, batch-invariant inference, deterministic sampling, and structured outputs constrained to a regex, JSON schema, or EBNF grammar. It runs on NVIDIA SM100 GPUs and Huawei Ascend 950 NPUs under Apache 2.0. A complete service still needs a KV cache system, prefill/decode disaggregation, and load balancing across data-parallel replicas, none of which are included.

Source: [github.com](https://github.com/deepseek-ai/DeepInfer) · [HN](https://news.ycombinator.com/item?id=50163277)
2341 points · 891 comments

### Kimi K3.1 Pro ships as a 3T-class open-weight model with 1M-token context

Moonshot AI introduced Kimi K3.1 Pro, calling it its most capable 3T-class open-weight model so far, with a 1-million-token context window, plus a Highspeed variant the company says is 2-3x faster. It scored 65.7% on Terminal-Bench 4.0, which the company says is ahead of GPT-6 Astra (58.2%) and just behind Claude Opus 5.5 (66.4%). The company says its internal stress-test hallucination rate fell from 23.4% to 8.3%, and it removed cyber-related data from mid-training and RL for the open-weight release. Full model weights arrive by Nov 4.

Source: [kimi.ai](https://www.kimi.ai/blog/kimi-k3-1-pro) · [HN](https://news.ycombinator.com/item?id=50212065)
701 points · 442 comments

### Mistral launches Voxtral 3 with a voice agent SDK and speech models in 50+ languages

Mistral announced Voxtral 3, a family of speech-to-text and text-to-speech models plus a voice agent SDK that combines listening, reasoning, tool calling, and speaking in one real-time streaming pipeline. The company says Voxtral Small Transcribe 3 is state-of-the-art in multilingual transcription and diarization, beating Whisper, Scribe v2, and Gemini 3.5 Transcribe, while the 4B Mini variant transcribes at $0.0035/min. Voxtral Mini TTS 3 covers 35+ languages and 50+ dialects. It is available through Mistral's EU-hosted API or self-deployment.

Source: [mistral.ai](https://mistral.ai/news/voxtral-3/) · [HN](https://news.ycombinator.com/item?id=50168396)
768 points · 201 comments

### Anthropic previews Claude Duet, a proactive agent that works while you're away

Anthropic opened a waitlist for Claude Duet, a research preview on Pro and Max plans in the US, powered by Opus 5.5. The company says it briefs you each morning, takes on tasks of all sizes, works in its own cloud computer using apps you connect, and waits for your approval before sensitive operations like sending messages or paying. It works with more than 6,000 connectors and plugins. The company says it may misread a thread, miscalibrate what is urgent, or miss something arriving between check-ins. Team and Enterprise plans are not included yet.

Source: [claude.com](https://claude.com/product/claude-duet) · [HN](https://news.ycombinator.com/item?id=50186037)
561 points · 528 comments

### OpenAI publishes official command-line tool for its REST API

OpenAI released OpenAI CLI, an official command-line tool for calling the OpenAI REST API from a terminal or shell script without writing an application. It can generate and save images, upload and download files, submit batches and wait for results, and export output as JSON, JSONL, raw, or YAML for parsing with tools such as jq. It installs via prebuilt binaries, Homebrew, or Go 1.26+. The documentation distinguishes it from Codex CLI: use `openai` for a specific API call or a script, and `codex` for a coding agent working on a project.

Source: [github.com](https://github.com/openai/openai-cli) · [HN](https://news.ycombinator.com/item?id=50191507)
242 points · 111 comments

### Omnara ships an Apache 2.0 alternative to Claude Managed Agents

Omnara released an open-source managed agent platform it describes as a self-hostable alternative to Claude Managed Agents and OpenAI's Agents API, licensed under Apache 2.0. Agents are defined in a YAML config naming a model provider and a machine, then launched through the CLI or a TypeScript SDK; the API handles launch, input, event streaming, and approvals, with every agent step saved in Postgres so any worker can resume an agent after a restart. Machines run an outbound-connecting daemon, so no inbound ports are needed. Self-hosting requires Docker Compose, and local defaults are intentionally insecure.

Source: [github.com](https://github.com/omnara-ai/omnara) · [HN](https://news.ycombinator.com/item?id=50183892)
111 points · 34 comments

### Claude add-on brings the assistant into Google Docs, Sheets, and Slides

Anthropic put Claude for Google Workspace into public beta on all paid Claude plans, adding a sidebar that reads the open document, sheet, or deck, sees your selection, and edits in place. In Docs it proposes edits as suggestion cards; in Sheets it writes formulas, pivot tables, and native charts; in Slides it builds slides from your deck's layouts and themes. The default mode asks before each edit, with an "Accept all edits" option. Connectors also let Claude create and edit Google files from a chat, matching your existing Google sharing permissions.

Source: [claude.com](https://claude.com/resources/articles/claude-now-works-in-google-docs-sheets-and-slides) · [HN](https://news.ycombinator.com/item?id=50190357)
89 points · 15 comments

### OpenAI says it is securing its frontier model training environment

The post is titled "Securing our frontier model training environment" and appears on openai.com; the Hacker News discussion drew 70 points and 80 comments. No further detail is available. Full article content could not be retrieved.

Source: [openai.com](https://openai.com/index/securing-our-frontier-model-training-environment/) · [HN](https://news.ycombinator.com/item?id=50214416)
70 points · 80 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*