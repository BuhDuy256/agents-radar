# Hacker News AI Community Digest 2026-11-23

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-23 07:22 UTC

---

### Thinking Machines releases Inkling 2 Mini, a 26.4B looped transformer that runs on a laptop
Thinking Machines announced Inkling 2 Mini, a Mixture-of-Experts model with 26.4B total parameters, 3.4B active, and 5.4B weight activations per token. The model is a looped transformer that runs its middle layers three times per token, and the company says most weights train and deploy natively in NVFP4 with the last four layers in MXFP8, for a total footprint of about 20GB. Thinking Machines says it leads open-weights models under 100B total parameters on DeepSWE v1.1 (48.2%) and Vals Index v2.2 (46.5%), and the company says a researcher ran it offline on a MacBook Pro to build a playable flight simulator. The stated limitation is that looping does not let weights store more facts: knowledge-intensive scores track parameter count, while search and tool use carry the knowledge gap.
Source: [thinkingmachines.ai](https://thinkingmachines.ai/news/inkling-2-mini/) · [HN](https://news.ycombinator.com/item?id=50581260)
1462 points · 293 comments

### Google launches Gemini 4 Neon at $3/$15 per million tokens
Google introduced Gemini 4 Neon on Nov 18, priced at $3 per million input tokens, $0.15 per million cached input tokens, and $15 per million output tokens, with a 1 million-token context window. The company says Neon scores 61 on the Artificial Analysis Intelligence Index at its xhigh thinking level, ranks #2 on the Vals Index at 70.9%, and records its lowest internal fabrication rate yet. Google says the model is rolling out in the Gemini API, Google AI Studio, Gemini for business, Antigravity, and the Gemini app for paid subscribers. Google also says Neon for cyber is going to trusted defenders in the coming days.
Source: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [HN](https://news.ycombinator.com/item?id=50552424)
1066 points · 775 comments

### Nasdaq erases all 2026 gains as AI sell-off hits Anthropic’s second trading day
The Nasdaq Composite closed down 5% from its Jan 1 value, erasing all 2026 gains, after Anthropic shares fell 9% on their second day of trading. Anthropic dropped to $88.30, toward its $83 IPO price, after jumping 17% on Thursday, and the Nasdaq lost some $4tn in market value this week according to the Wall Street Journal. Nvidia fell 14%, SanDisk fell 14% and Micron fell 12%; Taiwan stocks dropped 6.7%, the Nikkei fell 5% and the Kospi lost 5.5%. Analysts quoted by the Guardian attributed the selling to concern about whether AI investment spending can produce returns, and one said Anthropic’s IPO may be draining market liquidity.
Source: [theguardian.com](https://www.theguardian.com/business/2026/nov/20/global-stock-markets-slump-anthropic-ipo-ai-sell-off) · [HN](https://news.ycombinator.com/item?id=50574383)
529 points · 922 comments

### Claude Fable 5.2 solves two open black hole physics problems, verified in Lean
Anthropic says Claude solved two open theoretical physics problems about black holes and quantum gravity, both now posted as preprints. One agent completed a calculation physicists set up in 2003 and never finished, showing the Hawking-Page transition stays abrupt even where spacetime loses definite shape; other agents proved the exact ceiling of the simplest modular bootstrap and that it cannot be lowered. The company says an Anthropic researcher asked Claude for open problems in August, 22 candidates were assigned to separate agents that ran about six weeks, and the results were formally verified in Lean before Claude wrote the paper. Neither result describes our universe directly and neither has practical applications.
Source: [anthropic.com](https://www.anthropic.com/research/claude-black-hole-physics) · [HN](https://news.ycombinator.com/item?id=50563148)
577 points · 274 comments

### Paper: a 27B language model rewrites its own weights without gradients
A paper on arXiv reports that an open 27B model, given its weights, its graded answers and the ability to run itself, edited its own weights and became 6.6 points more accurate on problems it had not seen. The authors call this self-rewriting: the model diagnoses its own failure, tests edits on practice problems, submits only what works, and its accuracy rose across eight consecutive sessions. The paper also reports the model repaired a damaged copy of itself to over 80% of original accuracy without reading the original weights, and that the ability only appeared in the largest model of one family, with smaller models making no edit or breaking themselves. The results are the authors’ reported claims, not an independent reproduction.
Source: [arxiv.org](https://arxiv.org/abs/2611.21885) · [HN](https://news.ycombinator.com/item?id=50577265)
491 points · 145 comments

### OpenRouter off-boards three inference providers over data policy findings
OpenRouter said it off-boarded three inference providers and removed 125 endpoints from Zero Data Retention eligibility after security researchers reported compromised data or evidence that providers were not upholding their data policies. OpenRouter says the findings did not show any breach or unauthorized access of OpenRouter itself, and that it notified all potentially affected customers. Providers including Atlas Cloud, Novita, Phala and Together have posted announcements, and OpenRouter says not all affected providers have posted publicly. OpenRouter says it is adapting the researchers’ testing approach into ongoing checks, verifying network paths for forwarding to third parties, and requiring assurances before restoring ZDR eligibility.
Source: [openrouter.ai](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/) · [HN](https://news.ycombinator.com/item?id=50595554)
284 points · 99 comments

### Worker 755 is a browser game where a real LLM manages you as its subagent
A developer released Worker 755, a browser game where a real LLM acts as your manager and treats you as the subagent it spawned. The manager gets a task queue, read-only machine access and a tool that “spawns a subagent”; its instructions arrive in your terminal with a 90-second clock, and it receives your report and command transcript, or the line “Subagent did nothing.” The manager then checks the work, sends corrections, files incident reports and writes your performance review. It runs on Claude, GPT, Gemini, DeepSeek, GLM or Kimi via OpenRouter or Vercel AI Gateway keys, or on a local OpenAI-compatible server, and needs Node 24 or newer. Each mission has a hidden ground-truth check that scores when the manager approved broken work.
Source: [github.com](https://github.com/gulivan/worker755) · [HN](https://news.ycombinator.com/item?id=50599762)
309 points · 74 comments

### Muru: mod_wsgi’s creator publishes an AI-assisted Rust server for Python apps
Graham Dumpleton, who started mod_wsgi 20 years ago, is building Muru, a Rust server for running ASGI and WSGI Python apps in development and production. Dumpleton has published 19 posts about the project in three weeks, covering workers, HTTPS in development, WSGI and ASGI together, releases without restarts, canaries without a service mesh, Kubernetes integration, scaling to zero, tracing in a toolbar, and when lazy imports help. In his post on AI as a lifestyle choice, he writes that the AI does much of the surface work but that deciding what isn’t good enough is still his job. Simon Willison describes Muru as AI-assisted in a link post; the material gives no benchmark results or stable release date.
Source: [simonwillison.net](https://simonwillison.net/2026/Nov/21/muru/) · [HN](https://news.ycombinator.com/item?id=50597959)
75 points · 11 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*