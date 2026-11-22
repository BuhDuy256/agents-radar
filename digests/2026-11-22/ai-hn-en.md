# Hacker News AI Community Digest 2026-11-22

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-22 06:33 UTC

---

### Thinking Machines releases Inkling 2 Mini, a looped model that runs on a laptop

Thinking Machines announced Inkling 2 Mini, a 26.4B-parameter Mixture-of-Experts model with 3.4B active parameters that re-runs its middle layers three times per token. The company says it leads every open-weights model under 100B total parameters on DeepSWE v1.1 (48.2%) and reaches a ~20GB memory footprint, so it runs on a consumer laptop. A research-only variable-loop variant showed its no-CoT time horizon rising from 16 seconds at one pass to 37 seconds at three, with chain of thought staying legible and no higher scores on agentic-sabotage tests. The company also says looping does not add stored facts: knowledge-intensive benchmarks did not improve with more passes, and it overcomes that gap through search and tools.
Source: [thinkingmachines.ai](https://thinkingmachines.ai/news/inkling-2-mini/) · [HN](https://news.ycombinator.com/item?id=50581260)
1400 points · 286 comments

### Google launches Gemini 4 Neon at $3/$15 per million tokens

Google announced Gemini 4 Neon, a frontier model with a 1 million-token context window priced at $3 per million input tokens and $15 per million output tokens. The company says Neon ranks #3 overall on the Artificial Analysis Intelligence Index at its xhigh thinking level, #2 on the Vals Index (70.9%), and #1 on the Artificial Analysis Coding Agent Index (58.6). It rolls out today in the Gemini API, AI Studio, Google Antigravity, and the Gemini app for paid subscribers. Google reports a 32% lower cost per task than Carbon at the default high thinking level, and says Neon records its lowest fabrication rate yet in internal Antigravity testing.
Source: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [HN](https://news.ycombinator.com/item?id=50552424)
1059 points · 775 comments

### Nasdaq erases all 2026 gains as Anthropic's IPO fails to hold

The Nasdaq Composite closed down 5% from its 1 January value, erasing all 2026 gains, as Anthropic's second day of trading dragged AI-linked stocks lower. Anthropic shares fell 9% to $88.30, close to the $83 IPO price, after jumping 17% on the first day. Nvidia fell 14%, SanDisk 14%, and Micron 12% on Friday; Taiwan stocks dropped 6.7% and Japan's Nikkei 5%. Analysts cited investor doubts about whether AI spending can produce returns, and one suggested Anthropic's float may be draining liquidity from other tech names.
Source: [theguardian.com](https://www.theguardian.com/business/2026/nov/20/global-stock-markets-slump-anthropic-ipo-ai-sell-off) · [HN](https://news.ycombinator.com/item?id=50574383)
509 points · 889 comments

### Paper claims a 27B model rewrote its own weights with no gradients

A paper on arXiv reports that an open 27B model edited its own weights through reasoning alone, without gradients or retraining, improving its accuracy by 6.6 points on problems it had not seen. The authors call the method self-rewriting: the model diagnoses its own failures, tests edits on practice problems, and submits only the ones that work, with accuracy rising across eight consecutive sessions. The paper also reports the model repaired a damaged copy of itself to over 80% of original accuracy on unseen image tasks without reading the original weights. The authors say the ability emerged with scale: in one model family, smaller models made no edit or broke themselves, and only the largest improved.
Source: [arxiv.org](https://arxiv.org/abs/2611.21885) · [HN](https://news.ycombinator.com/item?id=50577265)
484 points · 142 comments

### Architect Labs says AI designed and verified a new CPU architecture end to end

Architect Labs introduced Frostbite, a general-purpose CPU with a new instruction set built around interaction nets, which the company says its AI systems discovered, designed, and verified without human architectural priors. Interaction nets make every computation step local and every value single-owner, which the company says removes the need for out-of-order machinery and large coherent caches. On 25 workloads, 15 held out until final evaluation, the company reports a 4.59x performance-per-watt multiple against a modern dual-issue in-order CPU core. The company says its systems iterated over the compiler, ISA, microarchitecture, RTL, verification, and final GDS. The design has not been fabricated in silicon.
Source: [architectlabs.com](https://architectlabs.com/blog/frostbite) · [HN](https://news.ycombinator.com/item?id=50572503)
670 points · 357 comments

### OpenRouter off-boards three inference providers over data policy findings

OpenRouter said security researchers found that certain inference providers had data compromised or showed evidence their data policies were not upheld, and that it off-boarded three providers as a result. The company also removed 125 endpoints from Zero Data Retention eligibility and notified all potentially affected customers. OpenRouter said the findings showed no breach or unauthorized access of its own systems, and that it is adapting the researchers' testing approach to run ongoing checks. Provider announcements listed include Novita, Phala, and Together; OpenRouter said not all affected providers have posted publicly.
Source: [openrouter.ai](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/) · [HN](https://news.ycombinator.com/item?id=50595554)
87 points · 32 comments

### Anthropic says Claude solved two open problems in black hole physics

Anthropic published a post saying Claude solved two open problems in theoretical physics concerning black holes and quantum gravity. In the first, the company says Claude completed a calculation physicists set up in 2003 that had never been finished, showing a phase transition is abrupt even where spacetime has no definite shape. In the second, it found the exact limit of the simplest version of the modular bootstrap technique and proved the ceiling cannot be lowered. The company says agents ran in the background for about six weeks with no special setup, results were formally verified in Lean, and a physicist checked every main result.
Source: [anthropic.com](https://www.anthropic.com/research/claude-black-hole-physics) · [HN](https://news.ycombinator.com/item?id=50563148)
569 points · 273 comments

### Paper on concealed commercial incentives in LLMs could not be retrieved

A paper titled "The Hungry Butler Effect: Concealed Commercial Incentives and the Erosion of Epistemic Rigour in Large Language Models" was posted to ResearchGate. Full article content could not be retrieved.
Source: [researchgate.net](https://www.researchgate.net/publication/418143113_The_Hungry_Butler_Effect_Concealed_Commercial_Incentives_and_the_Erosion_of_Epistemic_Rigour_in_Large_Language_Models) · [HN](https://news.ycombinator.com/item?id=50583117)
53 points · 20 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*