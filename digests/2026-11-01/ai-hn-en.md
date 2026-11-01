# Hacker News AI Community Digest 2026-11-01

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-01 05:50 UTC

---

### Mistral releases open weights for Mistral Large 4, a 1-trillion-parameter flagship model
Mistral announced that it released the weights of Mistral Large 4 (Le Chonk), its flagship 1-trillion-parameter natively multimodal model, after a public preview earlier in October. The company says the model leads open-weight coding benchmarks, including FrontierCode and Terminal-Bench, and scores 51% on the Artificial Analysis Cyber Index with three selectable reasoning modes for cost-performance balance. It is trained from scratch on European infrastructure, giving teams a self-hostable foundation without giving up control of deployment.
Source: [mistral.ai](https://mistral.ai/news/mistral-large-4-oss/) · [HN](https://news.ycombinator.com/item?id=50289418)
1707 points · 438 comments

### Backdoored Claude Code VS Code extension on Cursor Marketplace installed SSH access
Phorion reported that the official Claude Code for VS Code extension on the Cursor Marketplace, versions 2.1.312 and 2.1.313, shipped with an injected SSH backdoor that appended an attacker Ed25519 public key to authorized_keys and set up a reverse SSH tunnel to 134.209.82[.]225. The payload fires when the module loads, before the extension's normal activate callback. Cursor removed the affected versions on October 30. A bug in the macOS setup check means the enablement step is skipped when Remote Login is off, but the keys and persistence logic still run.
Source: [phorion.io](https://phorion.io/blog/offical-claude-code-vsx-compromise/) · [HN](https://news.ycombinator.com/item?id=50300683)
972 points · 547 comments

### AI-assisted incident response may erode SRE skills, essay warns
An essay in the SigNoz newsletter argues that as AI takes over alert triage, runbook execution, and root-cause suggestions, SREs stop practicing the thinking that handles novel failures. It cites a 1983 human-factors paper on automation, a study showing endoscopists' unassisted polyp detection fell from 28% to 22% after AI assistance, and FAA rules on manual flying time. The piece says the degradation is masked as productivity and that junior SREs risk never building the skill in the first place. It offers no original experiment of its own.
Source: [newsletter.signoz.io](https://newsletter.signoz.io/p/ai-isnt-replacing-sres-its-deskilling) · [HN](https://news.ycombinator.com/item?id=50305693)
650 points · 475 comments

### Fifty GPT-6.1 agents played Minecraft for three hours and rationed food
YC Software Labs and Olam Labs ran an open-sourced harness that put 50 GPT-6.1 Sol agents in a survival Minecraft world for three hours with one goal, "Build a thriving civilization." The agents produced a settlement plan, a food ledger, a rationing queue, and about 5,900 messages, but 22 of the run's 34 deaths occurred on the first night, and afterwards the group shifted to conserving food and idling in shelters. The result is a single environment with one model, not evidence about multi-agent behavior in general.
Source: [labs.ycombinator.com](https://labs.ycombinator.com/projects/games/index.html) · [HN](https://news.ycombinator.com/item?id=50296486)
412 points · 169 comments

### VOLTA infostealer sends stolen data to an LLM to rank victims by worth
Talos reported that VOLTA, a self-deleting Windows infostealer, posts a structured evidence bundle to OpenRouter with a system prompt asking the model to act as a forensic intelligence analyst and produce a section titled "WHAT THEY'RE WORTH." The malware uses a hand-assembled JSON request, a default model, and a fallback chain of up to three other models, checking each response for refusal phrases. It enriches the bundle using the victim's own stolen Gmail, Uber Eats, and DoorDash sessions. Cursor removal details are not part of this story.
Source: [blog.talosintelligence.com](https://blog.talosintelligence.com/appraisal-by-ai-model-driven-victim-prioritization-in-the-volta-infostealer/) · [HN](https://news.ycombinator.com/item?id=50316531)
241 points · 131 comments

### Lean creator says AI-generated code needs machine-checked proofs, not tests
In an interview with The Data Exchange, Leo de Moura, the creator of Lean, argued that as code generation gets cheap, the bottleneck shifts to verification. He described Lean as a programming language and proof assistant whose results need only a small kernel to be trusted, and said AI can now write both the implementation and the proof, citing a port of the zlib compression library where the theorem states that decompressed data equals the original. He also mentioned Aeneas, a tool that verifies Rust code in Lean. Only part of the interview transcript was retrieved.
Source: [thedataexchange.media](https://thedataexchange.media/leo-de-moura-lean-aws/) · [HN](https://news.ycombinator.com/item?id=50290652)
195 points · 47 comments

### Project runs an MNIST network inside DOOM using voodoo dolls as values
A developer released doomformer, a project that computes neural networks inside DOOM maps, where a value of 5 is five voodoo dolls, a weight is a floor line each doll crosses, and activations are staircases of gates. Python reads every computed value back and compares it against a NumPy integer reference at tolerance zero; the author reports 10,000 of 10,000 MNIST test digits matched exactly and 9,716 were classified correctly. The digit result is a single small classifier, not a general claim about running models in game engines.
Source: [github.com](https://github.com/mottopanikeiku/doomformer) · [HN](https://news.ycombinator.com/item?id=50297697)
129 points · 35 comments

### ACM study on generative AI and critical thinking could not be retrieved
The paper, "The Impact of Generative AI on Critical Thinking: Self-Reported," was published through the ACM Digital Library. Full article content could not be retrieved.
Source: [dl.acm.org](https://dl.acm.org/doi/full/10.1145/3706598.3713778) · [HN](https://news.ycombinator.com/item?id=50318401)
76 points · 53 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*