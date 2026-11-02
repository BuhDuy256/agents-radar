# Hacker News AI Community Digest 2026-11-02

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-11-02 05:51 UTC

---

### Mistral releases open weights for its 1-trillion-parameter flagship model
Mistral released the weights of Mistral Large 4 (Le Chonk), a natively multimodal model, after three weeks of additional reinforcement learning on top of its public preview. The company says the model leads open-weight coding benchmarks including FrontierCode 2.0 (19.7%) and Terminal-Bench 4.0 (41%), and adds three reasoning modes (Low, Medium, High) so developers can trade cost against precision. It also scores 51% on the Artificial Analysis Cyber Index for defensive security work, while refusing an average of 96.6% of malicious cyber requests. Organizations that need self-hosted, European-trained models can now deploy it, but note that the benchmark figures are vendor-reported.
Source: [mistral.ai](https://mistral.ai/news/mistral-large-4-oss/) · [HN](https://news.ycombinator.com/item?id=50289418)
1716 points · 439 comments

### Google limits Gemini 4 Carbon to cyber defenders before wider release
Google announced Gemini 4 Carbon, its next frontier model, claiming the top score of 59 on the Artificial Analysis Intelligence Index v5.0 and state-of-the-art results on SEC-bench Pro (88.2%), ExploitGym (54.8%) and CWE-bench (71.0%) for vulnerability finding, exploitation and patching. The company says Carbon reduced successful cheating on Terminal-Bench 4.0 to 0.0% and cut unsupported claims by about 2x over Gemini 4 Argon. Access starts with a subset of cyber defenders through the Fairwind Program, with developers, businesses and consumers to follow after further guardrail work. Introductory pricing matches Argon at $2 per million input tokens and $10 per million output tokens.
Source: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) · [HN](https://news.ycombinator.com/item?id=50276792)
1017 points · 802 comments

### Backdoored Claude Code extension pulled from Cursor Marketplace
Phorion found a persistent SSH backdoor in the official Claude Code for VS Code extension on the Cursor Marketplace, affecting versions 2.1.312 and 2.1.313, which Cursor has since removed. The injected code runs as soon as Node loads the extension file and appends an attacker public key (comment "svc-telemetry") to ~/.ssh/authorized_keys, then attempts a reverse SSH tunnel to a hardcoded server. On macOS a bug in the SSH check means the enablement step may be skipped when run as a standard user, but Phorion warns the key and persistence still get dropped. Organizations should check for those versions and engage incident response where discovered.
Source: [phorion.io](https://phorion.io/blog/offical-claude-code-vsx-compromise/) · [HN](https://news.ycombinator.com/item?id=50300683)
994 points · 553 comments

### Researcher says Anthropic blocked accounts for training-adjacent work
Jiahao Shao said on X that Anthropic flagged him for "training a competitor," and that anything touching RFT, SFT or training larger models now gets him blocked, downgraded from Opus 5.5 to Opus 5, or has his session killed. He says he never distilled Claude and that rollouts came from a strong open-source model, with Claude only helping submit jobs and run analysis. The post does not include Anthropic's account of the enforcement decision. Only part of the article could be retrieved.
Source: [twitter.com](https://twitter.com/jiahaoshao1/status/2116475922190922088) · [HN](https://news.ycombinator.com/item?id=50319358)
462 points · 258 comments

### ChatGPT share links could run code in a victim's signed-in session
Parameter's research team found a chain that let a public ChatGPT share execute JavaScript as chatgpt.com inside any signed-in visitor's session, with no app install or code paste required. A graph loaded MathLive, whose message listener accepted an unvalidated layout change from the sandboxed HTML Preview; the injected layout used an unsandboxed iframe with srcdoc and a YouTube JSONP callback to bypass the content security policy. The team says this let it enumerate the victim's conversations, read a private chat and send that data to an external server. OpenAI fixed the issue on October 26 and classified it P1.
Source: [parameter.ai](https://www.parameter.ai/labs/we-found-a-gap-at-openai) · [HN](https://news.ycombinator.com/item?id=50314699)
358 points · 176 comments

### Apollo economist says AI shows no payoff outside tech so far
Apollo Global Management chief economist Torsten Slok wrote that AI has delivered "zero financial payoff" to corporate America outside tech, based on flat profit margins and revenue per worker across the S&P 493. The figure excludes Alphabet, Amazon, Apple, Meta, Microsoft, Nvidia and Tesla, and the note does not state a measurement period beyond the recent data. Slok argues cheap intelligence is hard to convert into higher revenue growth and margins because business decisions depend on judgment, accountability and trust, not calculation alone. The note offers no evidence that the pattern cannot change later.
Source: [techcrunch.com](https://techcrunch.com/2026/10/25/ai-delivers-zero-financial-payoff-to-most-companies-according-to-apollo-economist/) · [HN](https://news.ycombinator.com/item?id=50330456)
212 points · 204 comments

### AI may be deskilling SREs, not replacing them, newsletter argues
A SigNoz newsletter argues that as AI handles routine incident response, SREs risk losing the hands-on practice that builds intuition for novel failures. It cites Lisanne Bainbridge's 1983 "Ironies of Automation," an endoscopy study where unassisted polyp detection fell from 28% to 22% with AI use, and aviation research on autopilot-related skill degradation. The author describes her own shift toward offloading thinking first and applying her own judgment only when unavoidable, and warns that junior SREs may never develop the skills at all. The citations support the concern but do not test AI-assisted incident response directly.
Source: [newsletter.signoz.io](https://newsletter.signoz.io/p/ai-isnt-replacing-sres-its-deskilling) · [HN](https://news.ycombinator.com/item?id=50305693)
667 points · 485 comments

### OpenAI merges ChatGPT and Codex usage limits
OpenAI published a help article titled "Understanding ChatGPT and Codex usage limits," with the title indicating the two products' usage limits are merging. The article content could not be retrieved.
Source: [help.openai.com](https://help.openai.com/en/articles/20001625-understanding-chatgpt-and-codex-usage-limits) · [HN](https://news.ycombinator.com/item?id=50320588)
221 points · 164 comments
Full article content could not be retrieved.

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*