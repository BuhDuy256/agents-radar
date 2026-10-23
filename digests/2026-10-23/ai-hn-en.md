# Hacker News AI Community Digest 2026-10-23

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-10-23 07:53 UTC

---

### Anthropic launches Claude Duet as a proactive agent on Opus 5.5

Anthropic opened a waitlist for Claude Duet, a research preview available to Pro and Max subscribers in the US, the company announced. Duet runs on Opus 5.5 and works on its own cloud computer, sending a morning brief, drafting next steps, and pausing for approval before sensitive actions like sending messages or paying. It supports more than 6,000 connectors and plugins and carries over memory, skills, and apps from the Claude account. The company says Duet may misread a thread, miscalibrate what is urgent, or miss something that arrives between check-ins. Team and Enterprise plans are not included.

Source: [claude.com](https://claude.com/product/claude-duet) · [HN](https://news.ycombinator.com/item?id=50186037)
550 points · 519 comments

### Mistral releases Voxtral 3 voice agent SDK with speech models in 50+ languages

Mistral announced Voxtral 3, a family of speech-to-text and text-to-speech models plus a voice agent SDK that combines listening, reasoning, tool calling, and speaking in one real-time streaming pipeline. Voxtral Small Transcribe 3 handles transcription, diarization, and context biasing in 50+ languages, and the company says it outperforms Whisper, Scribe v2, and Gemini 3.5 Transcribe on macro-average word error rate over 45 FLEURS languages. The Mini transcription model is 4B parameters at $0.0035 per minute. Voxtral Mini TTS 3 supports 35+ languages and 50+ dialects, and Pro Voice adaptation reproduces a speaker's style from 30 minutes of audio. It is available through Mistral's EU-hosted API or self-deployment.

Source: [mistral.ai](https://mistral.ai/news/voxtral-3/) · [HN](https://news.ycombinator.com/item?id=50168396)
768 points · 200 comments

### OpenAI ships an official CLI for its REST API

OpenAI published `openai`, a command-line tool for calling the OpenAI REST API from a terminal or shell script. It covers image generation, file upload and download, batch submission and result retrieval, speech, tokenizer inspection, and webhook testing, with JSON, JSONL, raw, and YAML output formats plus GJSON `--transform` field extraction. The repo distinguishes it from Codex CLI: use `openai` for a specific API call or a script, use `codex` for a coding agent working on a project. It installs from prebuilt binaries, Homebrew, or Go 1.26+, and documentation warns that piping untrusted JSON or YAML should set `OPENAI_UNTRUSTED_STDIN=1` to block local file reads.

Source: [github.com](https://github.com/openai/openai-cli) · [HN](https://news.ycombinator.com/item?id=50191507)
235 points · 110 comments

### Claude add-on brings editing into Google Docs, Sheets, and Slides

Anthropic released Claude for Google Workspace in public beta on all paid plans, adding a sidebar that reads the open file, sees the current selection, and edits in place. In Docs it proposes rewrites as suggestion cards; in Sheets it writes formulas, builds pivot tables and native charts, and can run a range through Python and write results back; in Slides it builds slides from the deck's own layouts and flags overlapping or off-slide elements. New Google Docs, Sheets, and Slides connectors let Claude create and edit files from chat, with access matching existing Google sharing permissions. The default "Ask before edits" mode waits for approval per change.

Source: [claude.com](https://claude.com/resources/articles/claude-now-works-in-google-docs-sheets-and-slides) · [HN](https://news.ycombinator.com/item?id=50190357)
86 points · 13 comments

### Omnara offers a self-hostable managed agent platform

Omnara is an Apache 2.0 open-source managed agent platform positioned as a self-hostable alternative to Claude Managed Agents and OpenAI's Agents API. Agents are declared in a YAML config naming a model provider, instructions, and a machine source, then launched from a CLI, the TypeScript SDK, or REST; events stream back as they happen and approvals are answered through the same API. It supports OpenAI, Anthropic, OpenRouter, Amazon Bedrock, LiteLLM, and Ollama models, with built-in tools, skills, and MCP. Each agent's event log lives in Postgres so any worker can resume it after a crash or restart, and the `omnarad` daemon connects machines outbound without inbound ports.

Source: [github.com](https://github.com/omnara-ai/omnara) · [HN](https://news.ycombinator.com/item?id=50183892)
110 points · 34 comments

### OpenAI models are coming to Google Cloud

The article title indicates OpenAI models will be offered through Google Cloud. Full article content could not be retrieved.

Source: [openai.com](https://openai.com/index/openai-models-google-cloud/) · [HN](https://news.ycombinator.com/item?id=50180079)
323 points · 145 comments

### OpenAI describes using thousands of AI agents on biological data

The article title indicates OpenAI used thousands of AI agents to find new leads in complex biological data. Full article content could not be retrieved.

Source: [openai.com](https://openai.com/index/scaling-ai-research-for-complex-biological-data/) · [HN](https://news.ycombinator.com/item?id=50180752)
157 points · 105 comments

### OpenAI outlines coordinated disclosure of critical vulnerabilities

The article title indicates OpenAI coordinated a global response as agents uncovered vulnerabilities. Full article content could not be retrieved.

Source: [openai.com](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/) · [HN](https://news.ycombinator.com/item?id=50181175)
265 points · 183 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*