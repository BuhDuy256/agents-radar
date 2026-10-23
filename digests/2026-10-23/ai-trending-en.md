# AI Open Source Trends 2026-10-23

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-10-23 04:29 UTC

---

# AI Open Source Trends Report — 2026-10-23

---

## 1. Today's Highlights

Today's GitHub AI landscape is dominated by **agent-centric tooling**: three of the five fastest-growing repos on the trending list (`cloudflare/security-audit-skill`, `ponytail`, `graphify`) are coding-agent skills, signaling that "skills" have become the primary distribution unit for AI dev tooling. Anthropic's entry into the trending list with `knowledge-work-plugins` confirms a push toward knowledge-worker agent plugins, while Cloudflare's security-audit skill shows enterprises entering the agent-skill ecosystem. Meanwhile, the topic search reveals **memory and context persistence** as the breakout category — `claude-mem`, `mem0`, `cognee`, and `OpenViking` all target long-term agent memory, a problem the ecosystem is now racing to standardize. A notable new direction is **"vectorless" / deterministic RAG** (`graphify`, `PageIndex`, `LEANN`), challenging the default assumption that RAG requires a vector store.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure (frameworks, SDKs, inference engines, dev tools, CLI)

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | JavaScript | 0 (+2,979) | A coding-agent skill for multi-phase security audits producing independently verified, machine-readable findings. Today's #1 trending AI repo by new stars — enterprise vendor (Cloudflare) entering the agent-skill space is a strong legitimacy signal. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 173,773 (+1,948) | Makes your AI agent "think like the laziest senior dev," biasing it toward writing less code. Vaulted to trending #3 on +1,948 stars today; its minimalist-coding philosophy resonates with cost/latency concerns in agent workflows. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 133,160 (+1,408) | Turns any codebase, docs, SQL schemas, configs, and PDFs into a queryable knowledge graph via a single skill for Claude Code, Cursor, Codex, and Gemini CLI. Its deterministic AST parsing with no vector store is a direct challenge to mainstream RAG assumptions. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 77,581 | Compresses tool outputs, logs, files, and RAG chunks before they reach the LLM — 20% fewer tokens for coding agents and 60–95% fewer for JSON. Token-cost optimization is becoming a standalone infrastructure layer. |
| [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi) | TypeScript | 36,308 | A terminal coding agent with the IDE wired in, built by Stencil Labs. Represents the "agent-native IDE" trend where the terminal rather than the editor is the primary surface. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 184,360 | Get up and running with Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and other models. Remains the default local-inference runtime; its model roster now leans heavily toward Chinese open-weight releases. |

### 🤖 AI Agents / Workflows (agent frameworks, automation, multi-agent systems)

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | Python | 0 (+303) | Anthropic's open-source plugin repository for knowledge workers using Claude Cowork. A first-party move to seed a plugin ecosystem around Cowork rather than leaving it to third parties. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 286,643 | Agent harness performance optimization system spanning skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, and Cursor. One of the highest-starred entries in the entire dataset, indicating intense appetite for cross-agent harness tuning. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 256,295 | "The agent that grows with you" — Nous Research's persistent agent offering. A research lab moving into consumer-facing agent products. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 118,910 | Open-source Python library for AI browser agents, plus a cloud offering with stealth browsers and a hosted agent API. Browser control remains the most commercially validated agent capability. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 101,080 | One CLI giving agents read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu with zero API fees. Notable for bundling Chinese platforms alongside Western ones — a rare bilingual data-access layer. |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | Python | 49,289 | Ultra-lightweight self-hosted personal agent framework in Python with WebUI, tools, memory, MCP, and multi-agent workflows. HKUDS is now a prolific multi-repo agent publisher. |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | Python | 47,512 | Open-source personal AI assistant and agent harness with planning, tools, self-evolving memory, and one-line install. Positions itself as a lightweight, extensible alternative to heavier harnesses. |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | TypeScript | 38,186 | The frontend stack for agents and generative UI across React, Angular, Mobile, and Slack; makers of the AG-UI Protocol. Frontend standardization for agents is an emerging battleground. |

### 📦 AI Applications (specific apps, vertical solutions)

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 76,646 | AI job-search agent that scans boards, scores jobs 1–5 against your CV, and tailors ATS-friendly resumes. Runs locally inside AI coding CLIs — a clean example of verticalizing agent tooling into a consumer workflow. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 66,903 | LLM-powered multi-market stock analysis with real-time news, decision dashboards, and cost-free scheduled runs. Finance remains the most crowded vertical-agent category. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 66,163 | Turns documents or topics into native PowerPoint decks with real shapes, transitions, charts, and audio narration. Native-format output (rather than HTML-to-PPTX hacks) is the differentiator. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 52,896 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants unified across frontier LLMs. A rare non-Chinese-exclusive desktop client maintaining scale. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 134,312 | Generates HD short videos from a topic or keyword via automated AI workflow. Sustained high stars show short-video automation remains an evergreen demand. |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Python | 36,352 | A personal trading agent from the HKUDS group. Second HKUDS finance-adjacent app in this dataset, showing deliberate vertical diversification. |

### 🧠 LLMs / Training (model weights, training frameworks, fine-tuning tools)

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [morluto/rea](https://github.com/morluto/rea) | TypeScript | 367,435 | Reverse-engineer anything with agents, from app behavior down to native binaries. The dataset's single highest star count; agentic reverse engineering is a striking and potentially controversial new use case. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 168,006 | The model-definition framework for state-of-the-art ML across text, vision, audio, and multimodal, for both inference and training. Still the canonical foundation layer. |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 201,192 | An open-source machine learning framework for everyone. Retains top star count among ML frameworks despite the PyTorch-era narrative. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 104,989 | Tensors and dynamic neural networks in Python with strong GPU acceleration. The de facto training backbone for the open-weight ecosystem. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,787 | Learn LLM inference systems on Apple Silicon by building a tiny vLLM + Qwen. A rare educational repo targeting Apple Silicon inference specifically. |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 318 | On-device LLM inference powered by X-bit quantization. Edge inference with aggressive quantization is a small but persistent niche. |

### 🔍 RAG / Knowledge (vector databases, retrieval-augmented generation, knowledge management)

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 156,506 | User-friendly AI interface supporting Ollama, OpenAI API, and more. The most-starred RAG-tagged project and the default self-hosted chat frontend. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 148,302 | "The agent engineering platform." Repositioned from RAG framework to agent platform — a telling strategic pivot. |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 142,750 | 100+ AI agents, agent skills, and RAG apps, free and open source. A high-traffic discovery surface for practitioners. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 102,353 | Persistent context across sessions for every agent — captures session activity, compresses with AI, and reinjects relevant context. Works across Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, and OpenCode. Memory portability across agents is its key bet. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 92,686 | Leading open-source RAG engine fusing retrieval with agent capabilities as a context layer for LLMs. One of the few major RAG engines written in Go. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 67,670 | Drop-in memory infrastructure for AI agents and apps, built for production. The most explicitly "production-positioned" memory layer in the set. |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | Python | 40,614 | Self-evolving context database unifying agent memory, knowledge RAG, and skills. ByteDance's cloud arm consolidating three previously separate layers into one store. |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 32,680 | Open-source AI memory platform giving agents persistent long-term memory with small models for free. Emphasizes running memory extraction without large-model costs. |

---

## 3. Trend Signal Analysis

**The explosive category is agent skills and harnesses, not models.** Three of today's top five trending repos (`security-audit-skill`, `ponytail`, `graphify`) are coding-agent skills, and the highest-starred entries in the topic search (`rea`, `ECC`, `hermes-agent`) are all harness- or agent-level. Model releases have commoditized; the scarce resource has shifted to how agents are configured, constrained, and given memory. The emergence of `headroom` as a dedicated token-compression layer confirms that agent operating cost has become a first-class engineering concern.

**New directions appearing for the first time: memory as a portable layer, and "vectorless" retrieval.** `claude-mem` explicitly targets cross-agent memory portability, while `OpenViking` fuses memory, RAG, and skills into a single store — both reject the assumption that each agent app owns its own context. Simultaneously, `graphify` (deterministic AST parsing, no vector store), `PageIndex` ("vectorless, reasoning-based RAG"), and `LEANN` (97% storage savings) form a visible counter-movement against vector-database-heavy architectures. Notably, `graphify` also appears on today's trending list, meaning this contrarian approach is not merely niche.

**Ecosystem connection.** Ollama's model lineup (Kimi, GLM, MiniMax, DeepSeek, Qwen, gpt-oss) reflects how thoroughly Chinese open-weight releases now define local inference defaults. Meanwhile, Anthropic's `knowledge-work-plugins` and Cloudflare's `security-audit-skill` show first-party vendors racing to occupy the skill registry before community conventions harden — the same land-grab pattern seen around MCP earlier.

---

## 4. Community Hot Spots

- **[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)** — +2,979 stars today, the single largest daily gain in the dataset. Enterprise security vendors entering the agent-skill space suggests auditable, machine-readable agent output will become a procurement requirement.

- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) & [mem0ai/mem0](https://github.com/mem0ai/mem0)** — Memory persistence is the most contested layer right now. Watch for a de facto standard emerging; whichever project gets cross-agent adoption wins a durable position.

- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — Both trending *and* high-starred in the RAG topic. Its deterministic, vectorless, edge-explainable approach is the strongest challenge yet to embedding-based retrieval for code and structured documents.

- **[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)** — 173,773 stars and +1,948 today for a repo whose thesis is "write less code." Signals growing practitioner fatigue with agent-generated code bloat.

- **[Affaan-m/ECC](https://github.com/affaan-m/ECC)** — 286,643 stars for cross-agent harness optimization spanning skills, memory, and security. As users run multiple agents (Claude Code, Codex, Cursor, Opencode), a vendor-neutral tuning layer has obvious appeal.

- **[morluto/rea](https://github.com/morluto/rea)** — Highest star count in the dataset (367,435) for agentic reverse engineering. Worth watching both for capability and for the policy questions it raises.

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*