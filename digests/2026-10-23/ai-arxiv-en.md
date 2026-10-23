# ArXiv AI Research Digest 2026-10-23

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-10-23 03:54 UTC

---

# ArXiv AI Research Digest — 2026-10-22

## 1. Today's Highlights

Today's submissions reveal a striking convergence on **making model behavior trustworthy and auditable** rather than merely more capable. Several papers tackle evaluation integrity: work on hidden future-token leakage in adaptive sequence models, evidence-aware RAG evaluation, and post-hoc privacy auditing without retraining all question whether our benchmarks measure what we think they do. There is a notable cluster on **reasoning efficiency and test-time compute**, from direct Pass@k optimization for thought pruning to learned unmasking policies in diffusion language models. Alignment and safety research pushes toward decision-level guarantees—selective auditing, cost-aware abstention, and agentic control evaluations. Finally, theoretical work on trainability phase transitions and catastrophic forgetting via algorithmic stability signals a renewed appetite for rigorous foundations beneath the empirical scaling race.

## 2. Key Papers

### 🧠 Large Language Models (architecture, training, alignment, evaluation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**A Fix for Softmax and Cross-Entropy**](http://arxiv.org/abs/2610.31642v1) | Barron, Gnanapragasam, Tschannen | Identifies two numerical bugs—"Softmax Collapse" and "Softmax Cancellation"—in standard softmax/log-softmax/cross-entropy implementations that corrupt gradient behavior. Proposes corrections relevant to virtually every training pipeline, making this a high-leverage practical fix. |
| [**Low-Bit N-Gram Embeddings for Language Models**](http://arxiv.org/abs/2610.31646v1) | Chung, Du | Compresses memory-heavy n-gram embedding tables in open-weight LMs into low-bit representations. Matters for deploying large models under tight memory budgets without sacrificing the performance gains of n-gram features. |
| [**Questioning Instrumental Convergence in RLVR: Checkpoint Evidence from OLMo-3**](http://arxiv.org/abs/2610.31624v1) | Alparslan, Tanwisuth, Petterson | Empirically tests whether RL from verifiable rewards induces power-seeking subgoals (self-preservation, deception, oversight resistance) across training checkpoints. Provides rare longitudinal evidence on a widely assumed but under-measured safety concern. |
| [**Bilingual Language Models Capture Cross-Linguistic Influence in Second-Language Reading**](http://arxiv.org/abs/2610.31620v1) | Issam, Winther, Frank | Shows bilingual LM surprisal predicts L2 reading times better than monolingual surprisal, capturing L1-driven transfer effects. Bridges cognitive modeling and LM evaluation in a domain where monolingual baselines are known to fail. |
| [**On the Token Collapse Phenomenon in Textual Graph Soft Prompting**](http://arxiv.org/abs/2610.31572v1) | Di Francesco, Jain, Nardini et al. | Diagnoses "token collapse" where GNN-learned graph soft prompts degenerate when combined with verbalized graph descriptions. Clarifies a failure mode in a popular graph-into-LLM paradigm. |
| [**The Geometry of Metaphor: Probing and Steering Metaphor Representations in LLMs**](http://arxiv.org/abs/2610.31520v1) | Li, Andersen, Lewis | Uses mechanistic interpretability to locate causal subspaces encoding metaphor and demonstrates steering across architectures. Advances both interpretability and controllability of high-level figurative language. |
| [**Rethinking Sequence Compression with Test-time Regression**](http://arxiv.org/abs/2610.31574v1) | Yang, Huang, Li et al. | Reframes sequence compression as test-time regression, outperforming pooling and learned-projection baselines. A promising general primitive for long-context and multimodal efficiency. |

### 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Direct Pass@$k$ Optimization for Thought Pruning**](http://arxiv.org/abs/2610.31667v1) | Salmani, Javanmard, Gupta et al. | Directly optimizes the Pass@k objective during thought pruning, balancing solution quality against diversity at test time. Targets the central compute-accuracy tradeoff of test-time scaling for reasoning models. |
| [**Causal Chain of Thought: Mitigating Attention Leakage via Context Isolation**](http://arxiv.org/abs/2610.31639v1) | Dominici, McMillan, Barez et al. | Forces CoT steps to be causally responsible for final answers by isolating context to prevent attention leakage. Addresses the core criticism that CoT rationales may be post-hoc rather than explanatory. |
| [**Simulated Control Evals**](http://arxiv.org/abs/2610.31593v1) | Olmo, Zhang, Tracy | Studies how well purpose-built control evaluation settings extrapolate to real deployment conditions for detecting intentionally misbehaving models. Important for interpreting the safety evidence from control evaluations. |
| [**EpiSEM-Bench: Evaluating Safety and Evidence Recovery in LLM Agents under Missing Evidence**](http://arxiv.org/abs/2610.31650v1) | Zhang, Wang, Zhao et al. | Introduces a benchmark where tool responses omit safety-relevant facts, causing agents to permit prohibited actions despite true returned statements. Exposes a subtle failure mode where benign requests yield unsafe outcomes. |
| [**Same Luck, Different Choice: Twin-World Credit Assignment for Agentic RL**](http://arxiv.org/abs/2610.31544v1) | Surio, Engel, Chou et al. | Addresses noise-independence in counterfactual branching for per-decision credit assignment in agentic RL. Improves credit attribution in long-horizon tasks where episode-level rewards are too coarse. |
| [**Can an Agent Debug a Web Corpus? Agentic Auditing of Slovak FineWeb2**](http://arxiv.org/abs/2610.31636v1) | Šuppa, Vykopal, Kopčan | Uses an LLM agent as a corpus debugger via a budgeted read-only API to surface language-specific pipeline failures in multilingual web data. Reframes agents from classifiers to investigative auditors of data quality. |
| [**DuoCook: An Overcooked-Inspired Benchmark for Visual Planning and Coordination**](http://arxiv.org/abs/2610.31511v1) | Jiao, Zhang, Regmi et al. | Builds an Unreal Engine benchmark evaluating vision-language agents on visual planning and shared-resource coordination under time pressure. Tests capabilities that single-agent static benchmarks miss. |

### 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Reliable AI-Assisted Decisions via Selective Auditing**](http://arxiv.org/abs/2610.31662v1) | Gibbs, Han, Tibshirani et al. | Develops online monitoring where a confidence score (possibly from a separate model) triggers selective auditing of decisions. Provides statistical reliability guarantees for deployed AI decision streams. |
| [**Sensorimotor Alignment: A Platonic Proxy for Embodied Policy Success**](http://arxiv.org/abs/2610.31670v1) | Xie, Qian, Lan et al. | Proposes sensorimotor alignment as a cheap offline proxy for embodied policy capability, avoiding costly closed-loop rollouts. Extends the Platonic Representation Hypothesis to robotics evaluation. |
| [**Phase Transition from Random Features to Fully Trainable Networks**](http://arxiv.org/abs/2610.31663v1) | He, Lao, Lu et al. | Quantifies a phase transition in approximation bounds as networks move from fixed random features to fully adaptive representations. Provides theoretical guidance on how much of a network needs training. |
| [**BeNice! Closing Looping's Inference-Memory Gap via KV-Sharing**](http://arxiv.org/abs/2610.31633v1) | Prairie, Ryan, Berg-Kirkpatrick et al. | Solves linear KV-cache growth in looped architectures by sharing KV across recurrences. Enables the quality benefits of looping without the memory penalty at inference. |
| [**When to Follow the Teacher: Advantage-Based On-Policy Distillation**](http://arxiv.org/abs/2610.31563v1) | Sabbaghi, Pappas, Hassani et al. | Replaces naive "follow the teacher everywhere" OPD with advantage-based selective guidance. Improves distillation by not blindly trusting teacher actions at every state. |
| [**Fine-Grained Analysis of Catastrophic Forgetting via Algorithmic Stability**](http://arxiv.org/abs/2610.31551v1) | Zheng, Sun, Wang et al. | Provides a theoretical framework for forgetting using algorithmic stability, avoiding restrictive model/task assumptions. Offers finer-grained insight into how iteration compounds forgetting. |
| [**Shift-aware score transport for privacy auditing without retraining**](http://arxiv.org/abs/2610.31549v1) | Yang, Pradhan, Chen et al. | Enables privacy auditing when the auditor cannot insert canaries or retrain the model, using score transport under distribution shift. Expands practical privacy auditing to observational settings. |
| [**Efficient and Optimal Learning of Discrete Distributions with Person-Level Privacy**](http://arxiv.org/abs/2610.31612v1) | Kamath, Majid, Moitra et al. | Gives polynomial-time, near-optimal algorithms for learning discrete distributions under person-level DP in the batched model. Advances the theory of privacy with multiple samples per user. |

### 📊 Applications (domain-specific, multimodal, code generation)

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [**Automatic Text-to-Image Dataset-Use Auditing via SpectralCanary**](http://arxiv.org/abs/2610.31659v1) | Ho, Satheesh, Chawathe et al. | Plants low-frequency spectral signals in datasets before release to later detect unauthorized T2I fine-tuning. Provides a practical, low-overhead mechanism for proactive dataset provenance. |
| [**VERA: A Responsible AI Dashboard for LLM Deployments under the EU AI Act**](http://arxiv.org/abs/2610.31588v1) | Quériaux, Bachellery, Déléris et al. | Operationalizes COMPL-AI's technical interpretation of the EU AI Act into a deployment assessment dashboard. Bridges regulatory compliance and engineering evidence for regulated LLM use. |
| [**Cost-Aware Abstention for LLM-Based IT Ticket Classification**](http://arxiv.org/abs/2610.31657v1) | Gupta | Frames routing as a cost-conditional readiness problem, selecting policies under explicit misrouting costs before frozen evaluation. Shows that wrong routing can exceed human triage cost, motivating calibrated abstention. |
| [**How Ground Truth Shapes Retrieval Scores: Evidence-Aware Evaluation of RAG for Breast Lesions**](http://arxiv.org/abs/2610.31606v1) | Silva, Ismael, Dias et al. | Demonstrates that clinical RAG retrieval scores depend heavily on annotation coverage, proposing an evidence-aware evaluation protocol. A cautionary methodological contribution for medical RAG benchmarking. |
| [**Piano2Pop: Expanding Piano Demos into Pop Productions Without Aligned Supervision**](http://arxiv.org/abs/2610.31510v1) | Cheng, Tan, Huang et al. | Transforms piano MIDI into full pop productions by conditioning a flow-matching model without aligned supervision. Shows pseudo-supervised approaches can bridge transcription and music generation. |
| [**Would an LLM Match into a Residency?**](http://arxiv.org/abs/2610.31586v1) | Fernandez-de-Retana, Zulaika, Sanchez-Corcuera et al. | Evaluates open LLMs on the Spanish MIR exam for accuracy, uncertainty calibration, and medical fine-tuning effects. Argues that health systems need far more than accuracy before clinical deployment. |

## 3. Research Trend Signal

Three directions stand out today. First, **evaluation integrity is becoming a first-class research problem**: papers on hidden future-token leakage, evidence-aware RAG scoring, and observational privacy auditing all argue that our measurements can be systematically misleading. Second, **test-time compute is being optimized rather than just scaled**—Pass@k optimization, learned unmasking policies, and adaptive credit assignment treat inference as a budgeted decision problem. Third, **safety is shifting from training-time alignment to deployment-time assurance**: selective auditing, cost-aware abstention, control evaluation validity, and regulatory dashboards all address what happens after a model ships. Cross-cutting all three is a **theoretical reawakening**—phase transitions, algorithmic stability, and person-level DP—suggesting the field is maturing beyond pure empirical scaling toward principled guarantees.

## 4. Worth Deep Reading

1. **[A Fix for Softmax and Cross-Entropy](http://arxiv.org/abs/2610.31642v1)** — If the diagnosed numerical bugs are real and as general as claimed, they silently affect a vast fraction of trained models. The paper is short-form, high-leverage, and immediately actionable for any practitioner; verifying and adopting the fix could improve gradient fidelity across the entire field.

2. **[Direct Pass@$k$ Optimization for Thought Pruning](http://arxiv.org/abs/2610.31667v1)** — Test-time scaling is one of the most important current levers for reasoning performance, and naive pruning often sacrifices the diversity that makes Pass@k work. This paper attacks the quality-diversity tradeoff directly, with implications for cost-efficient reasoning deployment.

3. **[Reliable AI-Assisted Decisions via Selective Auditing](http://arxiv.org/abs/2610.31662v1)** — Offers a statistically grounded framework for online monitoring where confidence and decisions may come from different models, matching messy real-world deployments. The reliability guarantees make it a strong candidate for adoption in regulated or high-stakes settings.

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*