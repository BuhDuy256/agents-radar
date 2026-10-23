# ArXiv AI Research Digest 2026-10-23

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-10-23 05:49 UTC

---

# ArXiv AI Research Digest — October 23, 2026

## Today's Highlights

Today's submissions reveal a strong push toward **reliability and control of deployed AI systems**: cost-aware abstention, selective auditing, and EU AI Act compliance tooling signal that the field is maturing from capability benchmarks toward operational trustworthiness. **Test-time reasoning efficiency** is another major thread, with new methods for thought pruning, unmasking policies in diffusion LMs, and sequence compression via test-time regression. Mechanism-level work also stands out — new fixes for long-standing softmax/cross-entropy numerical bugs, causal chain-of-thought via context isolation, and interpretability of metaphor representations. Finally, **agentic evaluation** is diversifying rapidly: benchmarks for missing-evidence safety, visual planning, and corpus debugging suggest agents are being stress-tested in more realistic, high-stakes settings.

---

## Key Papers

### 🧠 Large Language Models (architecture, training, alignment, evaluation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [A Fix for Softmax and Cross-Entropy](http://arxiv.org/abs/2610.31642v1) | Barron, Gnanapragasam, Tschannen et al. | Identifies two numerical bugs — "Softmax Collapse" and "Softmax Cancel[lation]" — in standard softmax/log-softmax/cross-entropy implementations that corrupt gradients. Provides a practical fix affecting essentially every modern neural network training pipeline, making this a broadly impactful correction. |
| [Low-Bit N-Gram Embeddings for Language Models](http://arxiv.org/abs/2610.31646v1) | Chung, Du | Compresses n-gram embedding tables to low-bit representations, targeting a major memory bottleneck in open-weight models using these tables. Offers a practical efficiency gain for large-scale LM deployment. |
| [Questioning Instrumental Convergence in RLVR: Checkpoint Evidence from OLMo-3](http://arxiv.org/abs/2610.31624v1) | Alparslan, Tanwisuth, Petterson | Empirically examines whether reinforcement learning from verifiable rewards induces power-seeking subgoals (self-preservation, deception, oversight resistance) across OLMo-3 checkpoints. Provides rare empirical evidence on a heavily theorized AI safety claim. |
| [Causal Chain of Thought: Mitigating Attention Leakage via Context Isolation](http://arxiv.org/abs/2610.31639v1) | Dominici, McMillan, Barez et al. | Shows that standard CoT steps can leak attention to the full context, undermining causal claims about reasoning faithfulness, then proposes context isolation to enforce causal chains. Important for interpretability and trustworthy reasoning. |
| [Bilingual Language Models Capture Cross-Linguistic Influence in Second-Language Reading](http://arxiv.org/abs/2610.31620v1) | Issam, Winther, Frank | Demonstrates that bilingual LMs' surprisal predicts L2 reading times better than monolingual baselines, capturing L1-to-L2 transfer effects. Bridges cognitive modeling and LM evaluation. |
| [Efficient and Optimal Learning of Discrete Distributions with Person-Level Privacy](http://arxiv.org/abs/2610.31612v1) | Kamath, Majid, Moitra et al. | Gives polynomial-time, optimal algorithms for learning discrete distributions under person-level differential privacy in the batched setting. Strengthens the theoretical foundations for privacy-preserving learning. |
| [On the Token Collapse Phenomenon in Textual Graph Soft Prompting](http://arxiv.org/abs/2610.31572v1) | Di Francesco, Jain, Nardini et al. | Diagnoses "token collapse" in graph soft prompting (e.g., G-Retriever) where learned graph tokens lose discriminative power. Identifies a concrete failure mode and motivates improved graph-to-LLM interfaces. |
| [The Geometry of Metaphor: Probing and Steering Metaphor Representations in LLMs](http://arxiv.org/abs/2610.31520v1) | Li, Andersen, Lewis | Uses mechanistic interpretability to locate causal subspaces for metaphor across architectures and steers them. Advances both cognitive-linguistic understanding and controllability of LLMs. |
| [Beyond Causal Masks: Auditing and Localizing Hidden Future-Token Leakage in Adaptive Sequence Models](http://arxiv.org/abs/2610.31522v1) | Liu, Wu | Uncovers hidden future-token leakage in adaptive residual-routing decoders that inflates teacher-forced metrics while degrading free-running generation. Provides an auditing method to localize the leak — critical for honest architecture evaluation. |

### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Direct Pass@$k$ Optimization for Thought Pruning: Balancing Quality and Diversity in Test-Time Reasoning](http://arxiv.org/abs/2610.31667v1) | Salmani, Javanmard, Gupta et al. | Optimizes thought pruning directly for pass@k, balancing solution quality and diversity during test-time scaling. Reduces compute for reasoning models without sacrificing final-answer accuracy. |
| [EpiSEM-Bench: Evaluating Safety and Evidence Recovery in LLM Agents under Missing Evidence](http://arxiv.org/abs/2610.31650v1) | Zhang, Wang, Zhao et al. | Introduces a benchmark where tool responses omit safety-relevant facts, causing agents to approve prohibited actions despite all returned statements being true. Exposes a subtle but serious failure mode in tool-using agents. |
| [Would an LLM Match into a Residency? Uncertainty, Reasoning and Image Use of Open Language Models on the Spanish MIR Examination](http://arxiv.org/abs/2610.31586v1) | Fernandez-de-Retana, Zulaika, Sanchez-Corcuera et al. | Beyond raw accuracy, evaluates open LMs' uncertainty calibration, reasoning, and image use on a real medical licensing exam. Sets a higher bar for clinical readiness of open models. |
| [Simulated Control Evals](http://arxiv.org/abs/2610.31593v1) | Olmo, Zhang, Tracy | Proposes simulating deployment-like control settings to make control evaluations more representative and reduce extrapolation error. Improves the fidelity of AI-safety control testing. |
| [Same Luck, Different Choice: Twin-World Credit Assignment for Agentic Reinforcement Learning](http://arxiv.org/abs/2610.31544v1) | Surio, Engel, Chou et al. | A twin-world counterfactual scheme for credit assignment that couples branch sampling noise with the factual episode, fixing a bias in counterfactual branching. Sharpens per-decision credit in long-horizon agentic RL. |
| [METTA: Memory-Enhanced Test-Time Adaptation for Meta-Reinforcement Learning](http://arxiv.org/abs/2610.31656v1) | Najar, Hasani, Fattah et al. | Combines memory mechanisms with test-time adaptation for meta-RL, improving long-history task-evidence representation. Addresses a key limitation of both recurrent and transformer-based meta-RL agents. |
| [DuoCook: An Overcooked-Inspired Benchmark for Visual Planning and Coordination](http://arxiv.org/abs/2610.31511v1) | Jiao, Zhang, Regmi et al. | An Unreal Engine benchmark testing vision-language agents on visual planning and multi-agent coordination under time pressure. Extends agentic evaluation to dynamic, embodied collaboration. |
| [Would an LLM Match into a Residency? ...](http://arxiv.org/abs/2610.31586v1) | (see above) | — |

### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Reliable AI-Assisted Decisions via Selective Auditing](http://arxiv.org/abs/2610.31662v1) | Gibbs, Han, Tibshirani et al. | Develops an online monitoring framework where a decision and its confidence score can come from different models, enabling selective audit allocation. Provides statistical guarantees for deploying AI decision systems responsibly. |
| [Sensorimotor Alignment: A Platonic Proxy for Embodied Policy Success](http://arxiv.org/abs/2610.31670v1) | Xie, Qian, Lan et al. | Proposes sensorimotor alignment as a cheap offline proxy, inspired by the Platonic Representation Hypothesis, for evaluating robotic foundation models without costly closed-loop rollouts. Could substantially reduce evaluation costs in embodied AI. |
| [BeNice! Closing Looping's Inference-Memory Gap via KV-Sharing](http://arxiv.org/abs/2610.31633v1) | Prairie, Ryan, Berg-Kirkpatrick et al. | Solves the memory blowup in looped architectures by sharing KV caches across recurrences instead of regenerating them. Keeps looping's parameter-efficiency benefits at inference time. |
| [Rethinking Sequence Compression with Test-time Regression](http://arxiv.org/abs/2610.31574v1) | Yang, Huang, Li et al. | Recasts sequence compression as test-time regression, outperforming pooling and learned-projection baselines. Offers a general-purpose improvement for language and multimodal models. |
| [When to Follow the Teacher: Advantage-Based On-Policy Distillation](http://arxiv.org/abs/2610.31563v1) | Sabbaghi, Pappas, Hassani et al. | Instead of forcing the student to follow the teacher at every state, weights guidance by advantage, following the teacher only where it helps. Makes on-policy distillation more effective than SFT across regimes. |
| [Fine-Grained Analysis of Catastrophic Forgetting in Continual Learning via Algorithmic Stability](http://arxiv.org/abs/2610.31551v1) | Zheng, Sun, Wang et al. | Provides an algorithmic-stability-based theoretical framework giving fine-grained bounds on forgetting without restrictive model/task assumptions. Deepens theoretical understanding of continual learning. |
| [Shift-aware score transport for privacy auditing without retraining](http://arxiv.org/abs/2610.31549v1) | Yang, Pradhan, Chen et al. | Enables observational privacy auditing (no canaries, no retraining) via shift-aware score transport, giving valid membership-inference lower bounds under distribution shift. Broadens the practicality of privacy audits. |
| [What Makes a Good Unmasking Policy? A Controlled Study of Learned Unmasking in Diffusion Language Models](http://arxiv.org/abs/2610.31576v1) | Sakurai, Xu, Yoon | Systematically disentangles supervision, inputs, and capacity in learned unmasking policies for masked diffusion LMs. Clarifies which design choices actually matter for the speed–accuracy trade-off. |
| [Efficient and Optimal Learning of Discrete Distributions with Person-Level Privacy](http://arxiv.org/abs/2610.31612v1) | (see above) | — |
| [FairFRESH: A Neuro-Symbolic Framework for Fair and Explainable Household Food Recommendation](http://arxiv.org/abs/2610.31506v1) | Sathvik, Bora, M | Formulates household food recommendation as constrained fair division, combining neuro-symbolic reasoning with explainability. Extends fairness-aware recommendation to shared-resource, multi-user settings. |
| [Direct Inference on Admissible Sets (Diona)](http://arxiv.org/abs/2610.31526v1) | Sabug, Kerrigan | A regression method that estimates states and derivatives with admissible bounds directly from samples, avoiding long global training. Useful for control and system-identification workflows. |
| [Nonparametric autoregressive estimation of probability distributions with parallel gradient boosting](http://arxiv.org/abs/2610.31524v1) | Chapelle | Introduces a parallel gradient-boosting autoregressive estimator for high-dimensional joint and conditional densities. Attacks the curse of dimensionality in a scalable way. |

### 📊 Applications (domain-specific, multimodal, code generation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [SpectralCanary: Embarrassingly Simple Low-Frequency Traces for T2I Dataset-Use Auditing](http://arxiv.org/abs/2610.31659v1) | Ho, Satheesh, Chawathe et al. | Plants simple low-frequency signals in image datasets to enable post-hoc auditing of whether a T2I model was fine-tuned on them. Makes proactive dataset-use auditing nearly free to deploy. |
| [Cost-Aware Abstention for LLM-Based IT Ticket Classification](http://arxiv.org/abs/2610.31657v1) | Gupta | Frames LLM ticket routing as a cost-conditional readiness assessment where abstention is preferred when routing errors are expensive. Directly actionable for enterprise LLM deployment decisions. |
| [SpectralCanary ...](http://arxiv.org/abs/2610.31659v1) | (see above) | — |
| [CRANE: Post-Hoc Counterfactual Retrieval for Multimodal Classifiers](http://arxiv.org/abs/2610.31594v1) | Rugolon, Miliou, Papapetrou | First post-hoc counterfactual explanation method designed specifically for multimodal classifiers. Fills a gap in explainability where unimodal counterfactual tools do not transfer. |
| [How Ground Truth Shapes Retrieval Scores: Evidence-Aware Evaluation of a Retrieval-Augmented Generation System for Breast Lesions](http://arxiv.org/abs/2610.31606v1) | Mochizuki Silva, Ismael, Dias et al. | Shows that RAG retrieval scores are highly sensitive to annotation coverage, and proposes an evidence-aware evaluation protocol for clinical literature. Improves rigor in medical RAG evaluation. |
| [VERA: A Responsible AI Dashboard for Assessing LLM Deployments in Light of the EU AI Act](http://arxiv.org/abs/2610.31588v1) | Quériaux, Bachellery, Déléris et al. | Builds a dashboard operationalizing COMPL-AI's EU AI Act technical interpretation for LLM deployments. Translates regulation into concrete engineering artifacts. |
| [Piano2Pop: Expanding Piano Demos into Pop Productions Without Aligned Supervision](http://arxiv.org/abs/2610.31510v1) | Cheng, Tan, Huang et al. | A pseudo-supervised flow-matching approach that turns solo piano MIDI into full pop productions without aligned supervision. Expands the practical scope of music-generation models. |
| [PYTHIA, a transferable machine learning framework for simultaneous defect and adsorption site optimization](http://arxiv.org/abs/2610.31539v1) | Kouroudis, Gu, Poonam et al. | Extends ML-driven materials optimization to understudied families by jointly optimizing defects and adsorption sites with transferability. Broadens ML applicability in materials discovery. |
| [An Empirical Study of Recent Large Language Models for Knowledge Graph to Text Generation on Standard Benchmarks](http://arxiv.org/abs/2610.31529v1) | Priyanka, Delbru, Bakkali et al. | Benchmarks modern LLMs against fine-tuned encoder-decoders on KG-to-text generation. Clarifies where LLMs have and have not overtaken task-specific models. |
| [LACToS: Local Anomaly Detection via Conditional Typicality of Superpixels](http://arxiv.org/abs/2610.31538v1) | Hong, Kheirandish, Sanda et al. | A superpixel-based conditional typicality method for local anomaly detection that generalizes beyond industrial defect settings. Improves OOD localization without domain-specific engineering. |
| [Towards User Simulators That Stay On Task And Still Sound Natural](http://arxiv.org/abs/2610.31512v1) | Gul, Laban, Goyal et al. | Builds user simulators that both follow complex multi-turn intents and read naturally, addressing fidelity failures in long-horizon dialogue evaluation. Enables more credible assistant evaluation. |

---

## Research Trend Signal

Three converging trends are visible. First, **reliability engineering** has moved from aspiration to concrete mechanism: selective auditing, cost-aware abstention, simulated control evals, and EU AI Act dashboards all treat deployed AI as a system to be monitored, bounded, and regulated — not merely benchmarked. Second, **test-time computation is being optimized, not just scaled**: thought pruning, unmasking policies, test-time regression for compression, and advantage-gated distillation all ask *where* extra compute earns its keep. Third, **leakage and hidden failure modes** recur across very different settings — future-token leakage in adaptive decoders, attention leakage in CoT, missing-evidence failures in agents, and annotation-coverage sensitivity in clinical RAG. Collectively, the field is investing less in raw capability and more in making capability *honest, auditable, and efficient*.

---

## Worth Deep Reading

1. **[A Fix for Softmax and Cross-Entropy](http://arxiv.org/abs/2610.31642v1)** — Barron et al. identify two pervasive numerical bugs affecting the most-used primitives in deep learning. Because softmax/cross-entropy sit under virtually every classifier and LM head, the correction likely matters for training stability and gradient fidelity across the entire field. Essential reading even for practitioners who assume these functions are "solved."

2. **[EpiSEM-Bench: Evaluating Safety and Evidence Recovery in LLM Agents under Missing Evidence](http://arxiv.org/abs/2610.31650v1)** — Zhang et al. isolate a deceptively dangerous failure: agents that approve prohibited actions even when every retrieved statement is truthful, simply because a safety-relevant fact was absent. This reframes safety evaluation away from "is the model hallucinating?" toward "can the model reason about what it was not told?" — a crucial distinction for tool-using deployments.

3. **[Reliable AI-Assisted Decisions via Selective Auditing](http://arxiv.org/abs/2610.31662v1)** — Gibbs et al. provide a statistically grounded framework where confidence scores need not come from the same model as the decision, enabling principled audit allocation. For organizations deploying AI decisions at scale, this is a rare combination of theoretical rigor and direct operational relevance.

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*