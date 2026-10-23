# AI Infrastructure Digest 2026-10-23

> Generated: 2026-10-23 05:33 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Infrastructure Digest
**Date: 2026-10-23 | Scope: vLLM · SGLang · llama.cpp · Ollama · LiteLLM · Unsloth**

---

## 1. Ecosystem Overview

The AI infrastructure layer is in a **consolidation-and-hardening phase**: no major releases across any of the six projects today, and activity is dominated by correctness fixes, backend parity work (ROCm/SM90/SM120/SYCL), and enablement for the same cohort of frontier models — **DeepSeek-V4.1-Flash, GLM-5.3-Flash, Qwen3.8, Kimi-K3, MiniMax-M3.1, Nemotron 3.5**. Two distinct risk profiles dominate: a **supply-chain compromise in LiteLLM v1.107.0** (unpatched credential stealer / RCE loader) and a wave of **silent correctness regressions** across serving engines (cross-request KV contamination in vLLM PD disaggregation, MXFP4 SwiGLU→SiTU substitution in SGLang, long-context decode collapse in llama.cpp). Meanwhile, the **agentic-serving frontier** (programmable KV cache, PD disaggregation plumbing, adaptive speculative decoding, MCP tool-call budgeting) is where architectural differentiation is now happening — not raw throughput. AMD ROCm/MI355X is crossing into first-class territory across vLLM and SGLang, while Apple/consumer hardware paths (Ollama MLX, llama.cpp Metal) carry fresh regressions.

---

## 2. Activity Comparison

| Project | Issues (active/notable) | PRs (active/notable) | Releases (last 24h) | Dominant theme |
|---|---|---|---|---|
| **vLLM** | ~15 tracked (2 high-severity correctness) | ~15 (perf + ROCm + model enablement) | None | Frontier-model enablement, PD disaggregation correctness |
| **SGLang** | ~10 (GLM-5.3-Flash matrix + CI flakes) | ~12 (DeepSeek-V4.1 kernels, AMD) | None | Backend reliability, sparse prefill kernels |
| **llama.cpp** | ~12 open regressions (long-context dominant) | ~20+ (SYCL, Hexagon, OpenCL, MoE) | **Yes — b11819–b11829 (11 builds)** | Backend breadth + RPC security hardening |
| **Ollama** | ~10 open (2 platform-critical) | ~8 (MLX, OpenAI/Anthropic compat) | None | MLX model additions, API correctness |
| **LiteLLM** | ~20 (2 critical: RCE + CA trust) | ~10 (routing, MCP budget, types) | None (freeze post-yank) | **Incident recovery** |
| **Unsloth** | ~11 (1 high: ROCm fallback) | ~10 (Studio UI refactor, Metal OOM) | None | Fine-tuning UX, Mac Metal stability |

**Reading:** llama.cpp is the only project shipping releases today (11 builds), reinforcing its "always-on" cadence. LiteLLM's zero-release status is an anomaly — it reflects a **deliberate freeze** after the v1.107.0 yank, not low activity. SGLang's issue tracker is disproportionately weighted to a single model (GLM-5.3-Flash) failing across three backends — a signal that Day-0 model support is outpacing backend validation.

---

## 3. Model Support Race

| Model / Arch | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek-V4.1-Flash** | ✅ Enablement + perf PRs | ✅ Sparse prefill + MXFP8 graph | ❌ (`deepseek41-dspark` GGUF rejected) | ✅ Cloud | ⚠️ GGUF load fails (#14695) |
| **GLM-5.3-Flash** | ✅ Chunk-KDA sync removal | ⚠️ **3 backend bugs** (SM90/SM120) | ✅ QSA/input opt | ✅ Cloud | — |
| **Qwen3.8 / 3.5** | ✅ GDN decode, ROCm | ✅ AMD lm_head, Kimi-K3 fusion | ⚠️ Long-context collapse >64K | ⚠️ YaRN PR (#19231) | ⚠️ GDN CP unsupported |
| **Kimi-K3** | ✅ Vision tower on ROCm | ⚠️ DCP a2a garbled (GB300) | — | — | — |
| **MiniMax-M3.1-Flash** | ✅ New model PR | — | — | — | — |
| **Nemotron 3.5** | — | — | ✅ GQA/BPE support | ✅ Bolt 74B-A9B (MLX) | — |
| **Gemma 4** | ✅ NVFP4 KV head_dim 512 | — | — | ✅ Tool-call recovery | — |
| **Muse Spark** | ✅ ROCm + new model | ✅ Roadmap | — | — | — |
| **SANA-Sprint / Cosmos3** | — | ✅ Diffusion PR | — | — | ✅ Video residency |

**Who's ahead:**
- **vLLM** leads on frontier-model breadth and hardware diversity (SM100/103, ROCm MI355X, GB10).
- **SGLang** is fastest to *attempt* Day-0 (Muse Spark, SANA-Sprint, T-Head PPU) but is **paying a reliability tax** — GLM-5.3-Flash is effectively broken on non-Triton backends.
- **llama.cpp** wins on **long-tail architecture support** (Nemotron, Hexagon, OpenCL, BF16X quantization) but trails frontier MoE enablement.
- **Ollama** is the only project shipping **quantized MLX imports** (Nemotron 3-bit affine with per-module metadata) — relevant to Apple Silicon deployments.

**Gap to watch:** No project has *stable* support for DeepSeek-V4.1-Flash across all backends simultaneously. This is the single biggest frontier-model risk in the ecosystem today.

---

## 4. Performance Frontier

| Optimization axis | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **KV cache** | PD disaggregation, NVFP4, programmable KV RFC | KVShard 0SM allgather, HiCache | — | KV connector RFC | — |
| **Batching / scheduling** | Context-aware spec tokens, MRV2 | Priority preemption fix | — | Dynamic `num_predict=-2` | — |
| **Quantization** | MXFP4 ROCm fusion, NVFP4 head_dim 512 | MXFP4 fused prefill, gfx1250 lm_head | BF16X (11.5bpw), q2_k OpenCL | 3-bit MLX affine | FP8 pre-sm89 dequant |
| **Distributed serving** | PP/PCP rank sync fix, Rust frontend | 0SM KV allgather, out-of-tree platform bindings | `-sm tensor` SYCL (+19%), graph replay | — | N-machine RPC (#13726) |
| **Kernels** | Qwen GDN decode (+5.7–6.8%), GLM KDA host-sync removal | DeepSeek-V4.1 8-token gather, MXFP8 graph prefill | FlashAttention-MKL, RDNA3/4 split-K | Flash attn off for Grok | Triton fp8e4nv fix |
| **Speculative decoding** | Out-of-tree registry + tree verify (MRV2) | Adaptive spec roadmap (#23705) | DFlash/MTP (Vulkan OOB bug) | LiLiCorr via DFlash (Nemotron) | — |

**Where the effort is concentrated:**
1. **Quantization is the busiest axis** — every serving engine and runtime is shipping new low-bit paths (MXFP4, NVFP4, BF16X, 3-bit MLX). This is equally a *memory* and *bandwidth* play.
2. **KV cache is the new battleground** — vLLM's Programmable KV Cache RFC, SGLang's KVShard allgather, and Ollama's KV connector proposal all point to KV lifecycle becoming a first-class API concern.
3. **Distributed/PD disaggregation plumbing is maturing fastest at vLLM**, but with the highest correctness risk (#61160 cross-request contamination is the single highest-severity serving bug in this digest).
4. **Speculative decoding is being made extensible** (vLLM out-of-tree registry, SGLang adaptive roadmap) — a sign it's moving from a research feature to a routing-layer primitive.

---

## 5. Layer Positioning

| Layer | Project | Role | Key differentiator |
|---|---|---|---|
| **GPU serving engine** | vLLM, SGLang | High-throughput multi-tenant inference at datacenter scale | PD disaggregation, MoE, frontier-model Day-0 |
| **Local / edge runtime** | llama.cpp, Ollama | Single-node, consumer hardware, cross-platform | Backend breadth (CUDA/Metal/Vulkan/SYCL/Hexagon), GGUF ecosystem |
| **LLM gateway / router** | LiteLLM | Cross-provider abstraction, auth, spend accounting, budgets | Multi-provider routing, virtual keys, MCP budget reservation |
| **Fine-tuning / training** | Unsloth | LoRA/QLoRA, Studio UX, GGUF export | Memory-efficient finetune, Studio UI, RPC multi-machine roadmap |

**Stack interactions worth noting:**
- **llama.cpp is a substrate** for Ollama (bundled `llama-server`), Unsloth (GGUF export/runtime), and increasingly for RPC-split inference. Regressions propagate downstream — see Ollama's AMD RADV 30× collapse (#19201) and Unsloth's ROCm fallback (#14906), both rooted in bundled llama.cpp behavior.
- **LiteLLM sits above all of them** — the v1.107.0 supply-chain compromise is a **cross-layer incident**, because anyone routing vLLM/SGLang/llama.cpp through a compromised LiteLLM proxy had provider keys and DB credentials at risk.
- **Unsloth feeds models into llama.cpp/Ollama** — the GGUF export `trust_remote_code` bug (#14688) and DeepSeek-V4.1-Flash load failure (#14695) create a **broken handoff** between fine-tuning and local serving.
- **vLLM and SGLang overlap but don't fully compete** — SGLang's out-of-tree platform bindings (AWS Trainium, T-Head PPU) and diffusion support (SANA-Sprint, Cosmos3) push it toward a broader "multimodal serving" role; vLLM stays tightly focused on LLM/MoE throughput.

---

## 6. Trend Signals

**1. Supply-chain security is now a top-tier operational risk.**
The LiteLLM v1.107.0 compromise (`cook.pth` + `sitecustomize` RCE loader, lookalike repo) is the first *confirmed* supply-chain attack in this cohort. Combined with llama.cpp's unmerged RPC `GRAPH_COMPUTE` pre-auth arbitrary read/write (#31017/#31018) and Ollama's Go toolchain CVEs, **2026 is the year "pin by digest, not tag" becomes table stakes** for AI infra deployment.

**2. Silent wrongness > crashes.**
The most dangerous bugs today aren't crashes:
- vLLM #61160: cross-tenant context bleed with `--no-enable-prefix-caching` as the only mitigation.
- SGLang #45755: `flashinfer_mxfp4` silently computing SwiGLU instead of SiTU.
- Ollama #19187: undefined tool → empty response with `eval_count > 0`.
- llama.cpp #30905: detokenizer over-trims spaces vs HF reference.
Applications must **validate outputs numerically**, not just check for HTTP 200.

**3. AMD ROCm is crossing the credibility threshold — with regressions.**
vLLM and SGLang both have MI355X/gfx950 optimization trackers with real gains (Qwen GDN decode, AITER MXFP4 fusion, gfx1250 lm_head). But Unsloth's silent CPU fallback regression (#14906) and Ollama's RADV 30× collapse (#19201) show **the AMD path is not yet production-safe without per-release validation**.

**4. Agentic serving is driving architectural change.**
Four independent signals point the same way:
- vLLM **Programmable KV Cache RFC** (#57103) — router-driven KV retention/movement.
- SGLang **Responses API turn-splitting bug** (#42110) — agent-trajectory corruption from a merge bug; subtle, only visible in multi-turn eval.
- Ollama **developer-role preservation** PR (#19199) — Codex-class clients need role fidelity.
- LiteLLM **MCP tool-call budget reservation** (#47999) — pricing tool calls like tokens.

The agent loop is now the **primary design constraint** for serving engines, gateways, and runtimes alike.

**5. Context length is the new reliability cliff.**
llama.cpp has 4+ open issues on hybrid/DeltaNet architectures above ~64K (Qwen3.8-27B, Nemotron) across CUDA/SYCL/Vulkan. vLLM has Qwen3.8-Flash-Next GB10 truncation (#62776). SGLang has HiCache exhaustion on hybrid GDN (#45400). **Whatever context window your model advertises, validate it end-to-end on your exact backend before shipping.**

**6. Speculative decoding is going mainstream but is not composable yet.**
vLLM is building an out-of-tree registry; SGLang has an adaptive-depth roadmap; llama.cpp has Vulkan OOB bugs; Ollama has NVFP4+spec decoding crashes (SGLang #36010). **Never combine a new KV/draft feature with speculative decoding without a dedicated eval suite.**

---

### What Agent / Application Developers Should Do This Week

| Priority | Action |
|---|---|
| 🔴 **Immediate** | Rotate secrets if you touched LiteLLM 1.107.0 or floating Docker tags. Pin by digest. |
| 🔴 **Immediate** | Audit vLLM PD disaggregation + prefix caching deployments for #61160; disable prefix caching until fixed. |
| 🟠 **High** | Pin backend explicitly for GLM-5.3-Flash (SGLang) — Triton or bust on SM90/SM120. |
| 🟠 **High** | Do not combine NVFP4 KV cache + speculative decoding (SGLang #36010) — deterministic failure. |
| 🟡 **Medium** | Validate context-length claims above 64K for Qwen3.8/Nemotron on your exact backend. |
| 🟡 **Medium** | Compute context budgets client-side — Ollama's `/api/show` misreports (#18995); don't trust `eval_count` (#19187). |
| 🟢 **Watch** | Programmable KV Cache RFC (vLLM #57103), adaptive speculative decoding (SGLang #23705), MCP budget reservation (LiteLLM #47999). |

**Bottom line:** the ecosystem is shipping *breadth* (models, hardware, quantization) faster than it is shipping *guarantees* (isolation, determinism, secure supply chain). For production deployments today, the winning posture is **digest-pinned, backend-explicit, correctness-eval-gated**, and **skeptical of advertised context windows and feature combinations**.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-23

## 1. Today's Highlights

No releases in the last 24 hours, but issue and PR activity is heavy on **DeepSeek-V4-Flash/v4.1, GLM-5.3, Kimi-K3, Qwen3.8, and Minimax-M3.1** enablement, plus a large wave of ROCm/gfx950 (MI355X) and MRV2 (Model Runner V2) optimization work. Two correctness bugs warrant urgent attention: a **cross-request KV contamination** in PD disaggregation with prefix caching, and a **NIXL lease-expiry race** that silently lets decode consume overwritten KV blocks. On the positive side, several concrete perf wins landed or are in review (Qwen GDN decode +5.7–6.8%, GLM-5.3 chunk-KDA host-sync removal, DeepSeek-V4.1 graph-pool reuse).

## 2. Releases & Breaking Changes

No new releases in the last 24h. No documented API/config breaking changes today.

Note (non-breaking, forward-looking): [#44280](https://github.com/vllm-project/vllm/issues/44280) — Rust frontend parity roadmap continues; still experimental behind `VLLM_USE_RUST_FRONTEND=1`.

## 3. New Model & Hardware Support

- **[New Model] MiniMax-M3.1-Flash** — [#63232](https://github.com/vllm-project/vllm/pull/63232) (with ROCm backport [#63270](https://github.com/vllm-project/vllm/pull/63270) cherry-picking sparse PA KV block-count fix #61889).
- **Kimi-K3 Vision Tower on ROCm** — `torch.compile` + encoder CUDA graph capture enabled: [#63086](https://github.com/vllm-project/vllm/pull/63086).
- **NVFP4 KV cache at head_dim 512 on SM100/SM103** (Gemma 4 global layers) via FlashInfer: [#62117](https://github.com/vllm-project/vllm/pull/62117).
- **Muse Spark (ROCm)** — shared RoPE cache sized by `max_model_len` instead of per-layer 1M-position caches (~11.5 GiB/GPU saved): [#62757](https://github.com/vllm-project/vllm/pull/62757); new-model PR [#62766](https://github.com/vllm-project/vllm/pull/62766).
- **Speculative decoding extensibility** — out-of-tree spec methods registry + linear-attention verify extension: [#62962](https://github.com/vllm-project/vllm/pull/62962); non-chain (tree) verification hooks for MRV2: [#62963](https://github.com/vllm-project/vllm/pull/62963).
- **Still open / tracked**: Ampere (SM8x) support for DeepSeek-V4-Flash — [#50576](https://github.com/vllm-project/vllm/issues/50576) (118 comments, 👍16).

## 4. Performance & Optimization

- **Qwen GDN decode + MRV2 attention metadata** — Qwen3.8-27B @ TP4 on B300: **decode +5.7% (no spec), +6.8% with MTP**: [#62961](https://github.com/vllm-project/vllm/pull/62961).
- **GLM-5.3-Flash chunk KDA** — remove per-prefill GPU→CPU sync from `prepare_chunk_indices`: [#63072](https://github.com/vllm-project/vllm/pull/63072).
- **DeepSeek-V4.1 decoder replay graphs** — capture on model-graph stream to share one graph pool instead of two: [#63155](https://github.com/vllm-project/vllm/pull/63155).
- **ROCm quant fusions** — block Hadamard rotation fused into AITER MXFP4 activation quant: [#63272](https://github.com/vllm-project/vllm/pull/63272); fused QK-norm+RoPE+gate Triton kernel enabled for Qwen3-Next/Qwen3.5 on ROCm: [#51406](https://github.com/vllm-project/vllm/pull/51406).
- **Trackers**: [ROCm][MI355X] Qwen3.8-2.4T-A95B — [#57149](https://github.com/vllm-project/vllm/issues/57149); Qwen3.8-Flash-Next — [#59575](https://github.com/vllm-project/vllm/issues/59575); GLM-5.3 general — [#57406](https://github.com/vllm-project/vllm/issues/57406).
- **Weight loading on GB10 (DGX Spark)** — per-tensor H2D copies straight from safetensors mmap views are slow: [#58726](https://github.com/vllm-project/vllm/issues/58726).
- **Speculative scheduling** — context-length-aware `num_speculative_tokens_per_batch_size` proposal: [#48627](https://github.com/vllm-project/vllm/issues/48627).
- **Evidence bottleneck** — BYOG reproducible evals/benchmarks for perf-sensitive PRs: [#61698](https://github.com/vllm-project/vllm/issues/61698).

## 5. Stability & Regressions

**High severity**

- **Cross-request context contamination in PD disaggregation** with automatic prefix caching (NIXL, DeepSeek-V4.1-Flash): responses contain content from other requests; clean with `--no-enable-prefix-caching`. Reproducer on `/v1...`: [#61160](https://github.com/vllm-project/vllm/issues/61160). **No fix PR referenced yet — treat as correctness-critical for multi-tenant PD deployments.**
- **NixlConnector KV lease race** — producer releases KV blocks on lease expiry while a remote READ is in flight; decode silently consumes overwritten KV: [#61229](https://github.com/vllm-project/vllm/issues/61229). No fix PR referenced.
- **Qwen3.8-Flash-Next on GB10 (v0.32 nightly)** — prompt content beyond ~`indexer_budget` (2048 tokens) invisible to the model: [#62776](https://github.com/vllm-project/vllm/issues/62776). Recent report; no fix PR referenced.

**Medium severity**

- **Hybrid model KV page selection with draft layers** + two FA4 warmup gaps (prefill shapes compiling during serving) — fix PR open: [#62800](https://github.com/vllm-project/vllm/pull/62800).
- **Hybrid GDN prefix-cache misses under MTP spec decoding** (Qwen3.5-122B-A10B): prompts with length multiple of hash unit get zero hits — fix PR open: [#52244](https://github.com/vllm-project/vllm/pull/52244).
- **PP2 tool-calling garbled output** vs PP1 (GLM-5.2-FP8 DSA, chunked-prefill on 8×MI355X): [#46262](https://github.com/vllm-project/vllm/issues/46262). No fix PR referenced.
- **KV engine IDs not synchronized across PCP ranks** — multi-node startup failure at PP2/PCP8/TP2; draft fix: [#62916](https://github.com/vllm-project/vllm/pull/62916).

**Lower severity / long-running**

- Gemma 4 init failure with per-token-head KV cache quantization: [#40388](https://github.com/vllm-project/vllm/issues/40388).
- Logprobs/logits semantics & determinism tracker (MRV2-relevant): [#42259](https://github.com/vllm-project/vllm/issues/42259).

## 6. What This Means for Application Developers

- **If you run PD disaggregation with prefix caching, audit for #61160 now.** Silent cross-tenant context bleed in a disaggregated NIXL setup is a data-isolation risk; disabling prefix caching is the only currently documented mitigation. Track #61229 as well if you use NixlConnector — the failure mode (decode reading evicted/overwritten KV) is silent, not a crash.
- **Multi-tenant / agentic serving is becoming a first-class concern**: the Programmable KV Cache RFC ([#57103](https://github.com/vllm-project/vllm/issues/57103)) proposes composable retention/movement/quota policies driven by router intent — relevant if you build session-aware agents that need explicit KV lifecycle control.
- **Disaggregated serving plumbing is filling in**: `/render` → `/generate` → derender endpoints are being completed (text derender on `/inference/v1/generate`: [#56851](https://github.com/vllm-project/vllm/issues/56851); streaming derender: [#47161](https://github.com/vllm-project/vllm/issues/47161)). If you operate a custom frontend/router, expect a cleaner split between CPU preprocessing and GPU inference tiers.
- **Qwen3.5/3.8 and GLM-5.x users get modest decode gains** without config changes once #62961 and #63072 land — worth retesting latency on B300/ROCm after upgrade.
- **ROCm/MI355X is now a credible first-class target** for frontier models (Kimi-K3, GLM-5.3, Qwen3.8, MiniMax-M3.1); if you were holding off on AMD for vision or MoE workloads, the optimization trackers above are the places to watch.
- **Observation gap worth noting**: for agentic workloads needing per-request or per-engine-step timing, the observability RFC ([#39979](https://github.com/vllm-project/vllm/issues/39979)) remains the proposal to follow — PyTorch Profiler alone is still insufficient for coarse-grained attribution.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-23

## 1. Today's Highlights

CI health has become the dominant theme: issue **#42752** (open since Oct 6) is now the single most-commented item in the tracker at **123 comments**, cataloguing flaky `PR Test Base` / `PR Test Extra` runs surfaced by the `/sglang-pr-babysit` workflow, and a new AMD-side failure tracker (**#45847**) opened today. On the correctness front, attention is concentrated on **GLM-5.3-Flash**, where three separate reports (fa4/SM120 crash, H20 EAGLE illegal memory access, and a silent `flashinfer_mxfp4` SwiGLU-vs-SiTU kernel substitution on SM90) suggest the model's backend matrix is not yet consolidated. Meanwhile, DeepSeek-V4.1 and GLM-5.3-Flash optimization PRs continue to land at a steady cadence, largely around CUDA-graph-friendly quantization and sparse prefill kernels.

## 2. Releases & Breaking Changes

No releases in the last 24h. A few configuration-level items worth tracking:

- **`--enable-lmcache` + disabled radix cache crashes the scheduler** at first idle check (**#45929**, v0.5.22). Any deployment relying on lmcache with embedding-mode models (which implicitly disable radix cache) is affected. [link](https://github.com/sgl-project/sglang/issues/45929)
- **`--model-path` still required when `--config` is passed** (**#36105**, closed as inactive) — the config-file path was never fully decoupled from the model-path argument. [link](https://github.com/sgl-project/sglang/issues/36105)
- A one-line env-var correction PR (**#45976**) notes that documented `SGLANG_SWA_EVICTION_INTERVAL_MULTIPLIER` does not exist in the codebase; the real knob is `SGLANG_SWA_...` (sliding-window eviction interval). If you've been tuning the documented variable, it was a no-op.

## 3. New Model & Hardware Support

- **SANA-Sprint 0.6B (diffusion)** — native SGLang-Diffusion support requested (**#43671**) and a corresponding PR (**#45960**) opened today adding `SanaSprintPipeline` / `SCMScheduler` handling for 1–4 step, 1024px generation. [issue](https://github.com/sgl-project/sglang/issues/43671) · [PR](https://github.com/sgl-project/sglang/pull/45960)
- **T-Head PPU / SAIL (Zhenwu 810/810E/M890P)** — roadmap issue **#37519** for first-class upstream support of these accelerators. [link](https://github.com/sgl-project/sglang/issues/37519)
- **Out-of-tree platform binding (AWS Trainium via Neuron)** — PR **#45897** lets external platforms register group devices and custom ops, removing the hardcoded cuda/npu/xpu/musa fallback in `GroupCoordinator`. [link](https://github.com/sgl-project/sglang/pull/45897)
- **Muse Spark** — open development roadmap (**#44678**) tracking the Day-0 PR split (#44664–#44667), with a dependency on a DeepGEMM patch/release. [link](https://github.com/sgl-project/sglang/issues/44678)
- **Diffusion: Cosmos3 V2V** — preprocessing optimization via PyAV for first/last conditioning frames, avoiding full source-video decode (**#45398**). [link](https://github.com/sgl-project/sglang/pull/45398)

## 4. Performance & Optimization

Concrete work landed or under review today:

- **DeepSeek-V4.1 sparse prefill gather** — PR **#45793** dequantizes **8 KV tokens per program** (up from 1) in the paged FP8 (SWA) + FP4 (compressed) gather, targeting the memory-bandwidth wall in `dequantize_k_cache_paged_v41`. [link](https://github.com/sgl-project/sglang/pull/45793)
- **DeepSeek-V4 fused MXFP8 producers inside breakable prefill graphs** — PR **#45980** extends the fused path (`fused_mxfp8_rows`) to graph-mode prefill, which previously fell back to bf16 + separate quantization at low-concurrency shapes. [link](https://github.com/sgl-project/sglang/pull/45980)
- **AMD gfx1250 lm_head** — PR **#44455** routes bf16 lm_head matmul through `aiter.tuned_gemm.tgemm.mm` under `SGLANG_USE_AITER=1`, avoiding the slow hipBLASLt path at decode batch sizes. [link](https://github.com/sgl-project/sglang/pull/44455)
- **KVShard: 0SM KV cache allgather** — PR **#44029** proposes an SM-free KV cache sharding collective. [link](https://github.com/sgl-project/sglang/pull/44029)
- **Mono Kimi-K3 attention interface prep for fusion** (AMD) — PR **#45202**. [link](https://github.com/sgl-project/sglang/pull/45202)
- **Adaptive Speculative Decoding roadmap** (**#23705**) remains open, motivating dynamic speculation depth under agentic/mixed workloads where acceptance rates swing between phases. [link](https://github.com/sgl-project/sglang/issues/23705)
- **GLM-5.3-Flash on Hopper (SM90)** — dedicated optimization tracking issue **#45373**, part of Q4 roadmap #42473. [link](https://github.com/sgl-project/sglang/issues/45373)
- **AMD mamba chunked-prefill cut alignment** — PR **#41701** keeps prefill cuts on the mamba chunk grid so DCP checkpoint donation isn't all-or-nothing. [link](https://github.com/sgl-project/sglang/pull/41701)

## 5. Stability & Regressions

Ranked by severity:

1. **GLM-5.3-Flash backends are unreliable across the board.**
   - **SM120 / RTX PRO 6000**: fa4 crashes at CUDA-graph capture on hybrid extend reshape; only triton works (**#42012**, 23 comments). [link](https://github.com/sgl-project/sglang/issues/42012)
   - **SM90 / 8×H20 TP8+EP8 with EAGLE**: CUDA illegal memory access in `run_eagle_verify` → `build_grammar_vocab_mask` (**#45159**, v0.5.22). [link](https://github.com/sgl-project/sglang/issues/45159)
   - **SM90**: `flashinfer_mxfp4` silently computes GPT-OSS **SwiGLU instead of SiTU** — a silent numerical wrongness rather than a crash (**#45755**). [link](https://github.com/sgl-project/sglang/issues/45755)
2. **NVFP4 KV cache + spec decoding is unusable** — any target-verify step crashes with `TypeError: 'NoneType' object is not subscriptable` in the FlashInfer dequant workspace (`extend_prefix_lens_cpu is None`), reproduced on SM120 with native MTP NEXTN (**#36010**). [link](https://github.com/sgl-project/sglang/issues/36010)
3. **Kimi-K3 DCP a2a garbled decode on 2-node GB300 MNNVL** — 12/12 degenerate outputs with NCCL graph buffer registration enabled; `NCCL_GRAPH_REGISTER=0` restores correct output, pointing at CUDA-graph + NCCL registration interaction (**#45367**). [link](https://github.com/sgl-project/sglang/issues/45367)
4. **HiCache on hybrid GDN models** — host-tier hits drop to zero once the evicted working set exceeds ~3 long prefixes; host mamba pool exhausts while KV remains on host (**#45400**). [link](https://github.com/sgl-project/sglang/issues/45400)
5. **Scheduler: priority preemption requeues victims in set order, which can diverge across TP ranks** — potential hang/desync class bug (**#45812**). [link](https://github.com/sgl-project/sglang/issues/45812)
6. **Responses API: replayed Codex turns split into three assistant blocks** by the phase check in `_merge_consecutive_assistant_messages`, causing the model to learn to end turns before tool calls — an agent-trajectory correctness bug (**#42110**). [link](https://github.com/sgl-project/sglang/issues/42110)
7. **Anthropic `/v1/messages`: `tool_reference` blocks inside `tool_result` yield HTTP 500** on chat templates without deferred-reference support (**#35692**). [link](https://github.com/sgl-project/sglang/issues/35692)

No fix PRs are explicitly linked to the above in today's window. CI-side, the AMD tracker (**#45847**) records an `ImportError: _check...` in `TestDeepseekV4Fp4.setUpClass` on `test/registered/amd/test_deepseek_v4_flash_fp4.py`.

## 6. What This Means for Application Developers

- **Pin your backend explicitly for GLM-5.3-Flash.** Until #42012/#45159/#45755 resolve, the attention backend matrix on SM90/SM120 is effectively "triton or bust" for hybrid-extend shapes, and the SM90 MXFP4 path can silently produce wrong activations. If you serve this model, validate outputs numerically after any backend or flashinfer upgrade, not just for crashes.
- **Do not combine NVFP4 KV cache with speculative decoding** (#36010). This combination currently fails deterministically on the first verify step — no workaround short of dropping one of the two features.
- **On GB300 MNNVL multi-node Kimi-K3 with DCP, disable NCCL graph buffer registration** (`NCCL_GRAPH_REGISTER=0`) if you observe garbled greedy output; the failure reproduces 12/12 in reported smoke tests.
- **Agent frameworks should be aware of the Responses API turn-splitting bug (#42110).** It corrupts replayed Codex-style trajectories in a way that biases future tool-call behavior, which is subtle and only visible in multi-turn eval quality, not in single-turn smoke tests.
- **Anthropic-endpoint users doing deferred tool loading** should avoid nesting `tool_reference` inside `tool_result` until #35692 lands, or they'll hit 500s.
- **If you use `--enable-lmcache`, avoid environments where radix cache is disabled** (embedding models, explicit `--disable-radix-cache`) — scheduler crash at first idle (#45929).
- **Perf watchers**: DeepSeek-V4.1 users should see prefill-gather gains from #45793 (8 tokens/program) and fused MXFP8 graph prefill from #45980 once merged; AMD gfx1250 users get a decode-batch-size win in lm_head via #44455 under `SGLANG_USE_AITER=1`.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-23

## 1. Today's Highlights

Several releases landed today (b11819–b11829), two of which matter for API builders: **typed content input for the `/rerank` endpoint** (multimodal rerank support) and a **realtime API fix ensuring `complete` is sent only after committed audio drains**. On the infrastructure side, MiniCPM-OCR 1.0 support was added to `mtmd`, and a cluster of security hardening PRs for the RPC server (`GRAPH_COMPUTE` descriptor validation) appeared — though as of this writing they are unmerged and the bug surface remains exposed. A significant latent regression class continues to grow around long-context (80K–130K+) decode on hybrid/DeltaNet architectures (Qwen3.8-27B, Nemotron) across SYCL, CUDA, and Vulkan backends.

---

## 2. Releases & Breaking Changes

- **b11829** — `server: Substitute rerank placeholder from the original template only` — changes how rerank templates render; if you inject custom rerank templates, verify placeholder substitution still matches expectations. [Release](https://github.com/ggml-org/llama.cpp/releases)
- **b11828** — `server: realtime API: send complete after committed audio drains` — behavior change for realtime audio clients: `complete` is now tied to commit completion, not stream dry-out. Clients relying on the old timing proxy may see `complete` arrive later. ([#30994](https://github.com/ggml-org/llama.cpp/pull/30994))
- **b11818** — `server: support typed content input for RERANK endpoint` — new accepted input shape; backward-compatible but expands request schema. ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625))

No config-format or GGUF schema breaks in this window.

---

## 3. New Model & Hardware Support

- **MiniCPM-OCR 1.0** added to `mtmd` (multimodal). ([b11826](https://github.com/ggml-org/llama.cpp/releases))
- **Nemotron** — non-standard GQA, BPE tokenizer, and `domyn-small` pre-type support; `gguf-py` now writes Metaspace `prepend_scheme` as GGUF metadata. ([b11819](https://github.com/ggml-org/llama.cpp/pull/23343))
- **Nemotron-3.5-Embed tokenization fix** — missing `U+200C` normalization after `[`/`<`; merged via [#30974](https://github.com/ggml-org/llama.cpp/pull/30974). Note the related open bug [#30894](https://github.com/ggml-org/llama.cpp/issues/30894) where Nemotron 3/3.5 GGUFs are mis-tagged `pixtral` with the wrong pre-tokenizer.
- **OpenCL**: depthwise conv2d for Adreno ([b11827](https://github.com/ggml-org/llama.cpp/pull/30900)), initial `q2_k` support ([#30999](https://github.com/ggml-org/llama.cpp/pull/30999)).
- **Hexagon (Snapdragon)**: `CONV2D` ([#30995](https://github.com/ggml-org/llama.cpp/pull/30995)), `SGN` ([#30346](https://github.com/ggml-org/llama.cpp/pull/30346)), `CEIL` ([#31006](https://github.com/ggml-org/llama.cpp/pull/31006)), plus op-fusion refactor ([#30843](https://github.com/ggml-org/llama.cpp/pull/30843)).
- **SYCL**: Intel XMX multi-column `mul_mat_vec_q` refactor for reordered K-quant/Q8_0 (2–80 activation columns via int8 DPAS/ESIMD). ([b11821](https://github.com/ggml-org/llama.cpp/pull/29864))
- **New quantization type proposal**: `GGML_TYPE_BF16X` (type 43) — near-lossless bf16 recompression at 11.5 bpw, ~1.39x smaller than BF16. ([#29896](https://github.com/ggml-org/llama.cpp/pull/29896))

---

## 4. Performance & Optimization

- **`-sm tensor` on SYCL**: `ggml_sycl_comm_exchange()` rewrite claims **+16.7% to +20.6% (mean ≈ +19%) prompt eval** on dual Arc Pro B70, with zero PPL change — closes the gap to `-sm layer`. ([#30956](https://github.com/ggml-org/llama.cpp/pull/30956))
- **SYCL FlashAttention-MKL**: replaced four host waits with explicit dependencies; **~4% improvement** on B70 and a prerequisite for SYCL graph replay. ([#30684](https://github.com/ggml-org/llama.cpp/pull/30684))
- **SYCL graph record/replay**: CUDA-graph equivalent landed for SYCL; data reorder required pre-recording due to async-alloc hang. ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725))
- **GLM5 input optimization**: avoids `sel_mask_2d` and `new_pool_flat` inputs. ([b11823](https://github.com/ggml-org/llama.cpp/pull/30932))
- **GLM5-Next QSA without `kq_mask`** — saves **2 GB GPU/host at ub 4096, 4 GB at ub 8192**, reallocatable to expert cache or context. ([#31009](https://github.com/ggml-org/llama.cpp/pull/31009))
- **MoE expert caching (in progress, two competing approaches)**:
  - `llama_moe_cache`: run missed experts on CPU, tunable via `--moe-cache-cpu-share`. ([#30966](https://github.com/ggml-org/llama.cpp/pull/30966))
  - GPU-resident LRU cache for host-offloaded experts (graph-embedded cache decisions). ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861))
- **New `--act-type {f32,f16}`** (`llama-bench -at`, `LLAMA_ARG_ACT_TYPE`) — keeps activations F16 end-to-end for bandwidth-bound accelerators. Default f32. ([#31011](https://github.com/ggml-org/llama.cpp/pull/31011))
- **RDNA3/4 Vulkan large-tile split-K** optimization under review. ([#30280](https://github.com/ggml-org/llama.cpp/pull/30280))
- **CUDA MMVQ fp16 overflow fix**: Q4_1/Q5_1/Q8_1 scale multiplication moved to fp32 where `m*s` can exceed fp16 max (~65504). ([#31019](https://github.com/ggml-org/llama.cpp/pull/31019))

---

## 5. Stability & Regressions

Ranked by severity:

1. **RPC `GRAPH_COMPUTE` pre-auth arbitrary read/write** — crafted `rpc_tensor` descriptors bypass validation in `deserialize_tensor()`; `view_offs` unchecked. Fix PRs [#31017](https://github.com/ggml-org/llama.cpp/pull/31017) / [#31018](https://github.com/ggml-org/llama.cpp/pull/31018) — **neither merged yet**. Treat RPC listeners as untrusted-network until patched.
2. **FlashAttention long-context corruption on AMD RDNA4 (gfx1201)**, head_dim 256 (Qwen3.8-27B): corrupted prefill logits → immediate high-confidence EOS. ([#30884](https://github.com/ggml-org/llama.cpp/issues/30884))
3. **SYCL F16 NaN output** on dense Qwen3.8-27B Q4_K_M since [#29107](https://github.com/ggml-org/llama.cpp/pull/29107) (IQ3 code reorder); disabling fused GEMM works around it. Arc Pro B70. ([#30892](https://github.com/ggml-org/llama.cpp/issues/30892))
4. **Qwen3.8-27B decode collapse ~25x** at context >~80K on CUDA, prompt processing unaffected. ([#27623](https://github.com/ggml-org/llama.cpp/issues/27623))
5. **SYCL DeltaNet "token soup"** on long prompts for Qwen3.6/3.8 and Nemotron. ([#29183](https://github.com/ggml-org/llama.cpp/issues/29183), [#29167](https://github.com/ggml-org/llama.cpp/issues/29167))
6. **Metal MUL_MAT abort** with BF16 src1 at K≥64, batch>8 (no BF16 `mul_mm` kernel). ([#30973](https://github.com/ggml-org/llama.cpp/issues/30973))
7. **Vulkan DFlash/MTP speculative emits OOB token id == n_vocab** on gfx1150. ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158))
8. **RPC DeepSeek V4 degenerate repetition** with 2 workers after long prompt; slot stays corrupted. ([#30794](https://github.com/ggml-org/llama.cpp/issues/30794))
9. **`llama_detokenize` over-trims spaces** before `! ? . ,` and `'s`/`'re` for Gemma 4-class vocabs vs HF reference — output-visible correctness gap. ([#30905](https://github.com/ggml-org/llama.cpp/issues/30905))
10. **WebUI `?q=` instruction injection** (security, low-severity, still open). ([#25790](https://github.com/ggml-org/llama.cpp/issues/25790))
11. **`id_slot` pinning to an empty slot bypasses prompt cache.** ([#28139](https://github.com/ggml-org/llama.cpp/issues/28139))
12. **SYCL build break** introduced by #28725 — fix pending. ([#31014](https://github.com/ggml-org/llama.cpp/pull/31014))

Long-context degradation on hybrid Gated DeltaNet architectures is now the dominant recurring theme; if you serve Qwen3.8-class models above ~64K context, pin a known-good release and test on your exact backend.

---

## 6. What This Means for Application Developers

- **If you expose `llama-server` RPC across any trust boundary, patch before deploying.** The `GRAPH_COMPUTE` descriptor validation gap allows pre-auth arbitrary memory access. Fix PRs exist but are unmerged as of today.
- **Realtime/audio pipelines**: verify your client against b11828's new `complete` semantics — do not assume `complete` fires on stream-idle.
- **RAG and rerank services**: b11818/b11829 add typed multimodal rerank input and template-placeholder fixes. If you maintain a fork of the rerank template, diff it against upstream.
- **Context-heavy agents (>64K)**: hybrid/DeltaNet models (Qwen3.8-27B, Nemotron) show backend-dependent decode collapse or corruption. Benchmark your specific (model, quant, backend, context) combination rather than trusting single-vendor numbers.
- **Memory-constrained MoE serving**: the two expert-cache efforts (#30966 CPU-miss path, #27861 GPU-LRU) plus `--act-type f16` and GLM5 QSA mask elimination (2–4 GB savings) are the levers most worth tracking for cost-per-token reduction.
- **Quantization**: `q2_k` on OpenCL and the BF16X proposal (11.5 bpw, ~1.39x vs BF16) are worth evaluating for edge/bandwidth-bound deployments, but neither is a stable default yet.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-10-23

## 1. Today's Highlights

No new releases landed in the last 24 hours, but PR activity is heavy across model support and API correctness. The most consequential items are two MLX PRs adding **Nemotron 3.5 Bolt 74B-A9B** and **YaRN RoPE scaling for Qwen3/Qwen3.5** ([#19229](https://github.com/ollama/ollama/pull/19229), [#19231](https://github.com/ollama/ollama/pull/19231)), alongside a cluster of OpenAI/Anthropic-compat fixes for streaming errors, developer-role handling, and tool-call parsing. On the stability side, a fresh report of a **~30× throughput collapse on AMD RADV/Vulkan with prompt cache enabled** ([#19201](https://github.com/ollama/ollama/issues/19201)) and continued fallout from the 0.40.x MLX and Windows HTTP-reset regressions dominate the issue tracker.

## 2. Releases & Breaking Changes

No releases in the last 24h. Two compatibility-relevant changes are in flight:

- **`ollama launch` harnesses now consume cloud model metadata** (context window, thinking levels, capabilities) via [PR #19223](https://github.com/ollama/ollama/pull/19223) (merged/closed) — Codex previously defaulted to 128k context for untabled models; `glm-5.2` now correctly reports 1,048,576.
- **`typical_p` parameter rejection** ([#18480](https://github.com/ollama/ollama/issues/18480), closed) remains a breaking change for Python API users migrating from older clients.

## 3. New Model & Hardware Support

- **Nemotron 3.5 Bolt 74B-A9B (MLX)** — [PR #19229](https://github.com/ollama/ollama/pull/19229): per-layer expert configs, LiLiCorr speculative decoding via the DFlash runner, prequantized affine **3-bit** import with per-module quantization metadata and mixed-precision expert stacking.
- **YaRN scaling for Qwen3 / Qwen3.5 (MLX)** — [PR #19231](https://github.com/ollama/ollama/pull/19231): honors explicit RoPE scaling metadata, applies YaRN frequencies/amplitude to text and mRoPE, preserves non-rotary dims. Fixes #182xx-series long-context reports.
- **GA Gradium Phonon checkpoints** — [PR #19227](https://github.com/ollama/ollama/pull/19227) (closed): replaces prerelease checkpoint path with GA format, adds default-voice import and speech conditioning; sets **0.40.9 minimum** and rejects the old checkpoint.
- **Qwen3-Coder tool parsing** — [PR #19228](https://github.com/ollama/ollama/pull/19228): escapes literal `</function>` text inside parameter values so XML decoding no longer aborts the call.
- **Gemma 4 tool-call recovery** — [PR #19226](https://github.com/ollama/ollama/pull/19226): recovers complete arguments objects followed by trailing noise (e.g. `$$`).
- **DeepSeek-V4.1-Flash-1017 (cloud)** — [#19079](https://github.com/ollama/ollama/issues/19079) (closed).

## 4. Performance & Optimization

- **Prompt-cache regression on AMD RADV (Vulkan)** — [#19201](https://github.com/ollama/ollama/issues/19201): Ollama **0.40.8** on RX 6600 XT shows **~29.7× generation throughput collapse** on the *second identical request* when the bundled llama.cpp host-memory prompt cache is enabled; model remains fully GPU-offloaded. No fix PR yet.
- **MLX prefill stall under single-slot load** — [#18505](https://github.com/ollama/ollama/issues/18505) (closed): admitted NVFP4 requests could hang at `processed=total-1` for minutes; only SIGTERM on the runner recovered. Now closed — verify against your 0.40.x pin.
- **`num_predict == -2` dynamic token limit** — [PR #9547](https://github.com/ollama/ollama/pull/9547) (still open): allows generation to fill the context buffer dynamically rather than a static cap or unbounded generation, mirroring llama.cpp.
- **Flash attention forced off for Grok** — [PR #15050](https://github.com/ollama/ollama/pull/15050) (closed): avoids runner crashes when KV cache quantization is set, matching upstream llama.cpp behavior.
- **KV connector framework proposal** — [#17696](https://github.com/ollama/ollama/issues/17696): pluggable external KV cache backends (LMCache et al.), scoped initially to framework + lifecycle hooks.

## 5. Stability & Regressions

Ranked by severity:

1. **Vulkan/RADV ~30× throughput collapse with prompt cache** — [#19201](https://github.com/ollama/ollama/issues/19201) (open, 0.40.8). Reproducible; blocks production AMD Linux inference. **No fix PR yet.**
2. **Windows HTTP connection resets during inference** — [#19139](https://github.com/ollama/ollama/issues/19139) and [#19113](https://github.com/ollama/ollama/issues/19113) (open, 0.40.4): resets at ~15s with large prompts, and intermittently even when bypassing the Ollama API and hitting `llama-server` directly. Suggests a lower-level transport issue.
3. **Cloud Pro 95% failure rate** — [#15453](https://github.com/ollama/ollama/issues/15453) (open since April, 55 comments, 22 👍): long-running, unresolved reliability problem across `glm-5.1:cloud`, `kimi-k2.5:cloud`, `qwen3.5:cloud`, `deepseek-v3.2` etc. No remediation noted.
4. **GLM-5.3-Flash cloud degeneration since 10-12** — [#18980](https://github.com/ollama/ollama/issues/18980) (open, 31 comments): 5–8% of requests produce degenerate output. Client-side evidence points to host-side data corruption ("all zeros" in probe image).
5. **`/v1/responses` streams close without terminal event** — [PR #19225](https://github.com/ollama/ollama/pull/19225) (closed): errors after streaming starts were swallowed into EOF; fix emits a proper `response.failed` event. Relevant to all streaming agent clients.
6. **Calling an undefined tool silently returns empty response** — [#19187](https://github.com/ollama/ollama/issues/19187) (open, 0.40.4–0.40.7): `qwen3:8b` returns `eval_count > 0` with no content when the model names a function absent from `tools`. Nasty for agent loops.
7. **`OLLAMA_CONTEXT_LENGTH` not reflected in `/api/show` / `/api/tags`** — [#18995](https://github.com/ollama/ollama/issues/18995) (open): effective context differs from advertised, tooling that sizes prompts off these endpoints will misbehave.
8. **Model eviction cancelled by `keep_alive`; waiting request stalls** — [#19182](https://github.com/ollama/ollama/issues/19182) (open, 0.40.2/0.40.7): with `OLLAMA_MAX_LOADED_MODELS=1`, a pending eviction is cancelled when the resident model's request carries `keep_alive`; the queued request then waits the full keep-alive window.
9. **MLX "Maximum threads" panic on 0.40.0** — [#18846](https://github.com/ollama/ollama/issues/18846) (closed): `mlx: Maximum threads per threadgroup is 896 but requested 1024` after ~1 min; downgrade to 0.35.1 avoids it. Fix landed — upgrade past 0.40.0.
10. **Go toolchain CVEs in binaries** — [#19162](https://github.com/ollama/ollama/issues/19162) and [#16033](https://github.com/ollama/ollama/issues/16033) (closed): 1 CRITICAL / 11 HIGH findings; requires **Go 1.26.9+** rebuild. If you redistribute Ollama binaries, re-scan your build.
11. **`llama-server` SWA assertion on `rnj-1`** — [#18924](https://github.com/ollama/ollama/issues/18924) (closed): `GGML_ASSERT(hparams.is_swa_any())` failures since 0.3x; resolved.
12. **Duplicate model entry after local compat GGUF migration** — [#18830](https://github.com/ollama/ollama/issues/18830) (closed, 0.40.0, macOS). Cosmetic but confusing for tooling that enumerates models.

## 6. What This Means for Application Developers

- **Pin to vetted versions per platform.** 0.40.0 is a landmine for MLX (thread panic, [#18846](https://github.com/ollama/ollama/issues/18846)) and 0.40.8 for AMD Vulkan ([#19201](https://github.com/ollama/ollama/issues/19201)). If you're on AMD Linux, disable prompt caching until resolved.
- **Don't trust `eval_count` as a success signal.** [#19187](https://github.com/ollama/ollama/issues/19187) shows valid-looking counters with empty content when a model hallucinates a tool name not in `tools`. Validate responses against your tool schema before dispatching.
- **Streaming terminal events are now correct** with [PR #19225](https://github.com/ollama/ollama/pull/19225) — if you parse `/v1/responses` streams, switch to handling `response.failed` rather than relying on EOF.
- **Developer-role messages are becoming first-class** — [PR #19199](https://github.com/ollama/ollama/pull/19199) preserves `system/developer` roles through rendering, truncation, and compaction replay for Qwen3-Coder, Cogito, and Olmo. If you're porting Codex-class clients, this closes a real gap.
- **Context-length introspection is unreliable today** ([#18995](https://github.com/ollama/ollama/issues/18995)). Compute your own budget from `OLLAMA_CONTEXT_LENGTH` rather than reading `/api/show`.
- **Cloud reliability remains a hard dependency risk.** [#15453](https://github.com/ollama/ollama/issues/15453) and [#18980](https://github.com/ollama/ollama/issues/18980) indicate sustained, unresolved cloud-side failures. If you're building on `:cloud` models, implement client-side retries, output-quality checks, and a local fallback path.
- **Long-context Qwen3 workloads on MLX** should benefit materially once [PR #19231](https://github.com/ollama/ollama/pull/19231) lands — YaRN was previously ignored, silently truncating effective context.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-10-23

## 1. Today's Highlights

LiteLLM is still in incident-recovery mode following the discovery that **v1.107.0 was published from a lookalike repo (`Berri-AI/litellm`) containing a credential stealer and an RCE loader** — the release has been pulled from PyPI, and Docker tags on both `ghcr.io` and `docker.io` have been re-pointed away from the compromised image. The top open thread (#47826, 25 comments, 19 👍) is the community coordinating on blast-radius assessment and rollback; a follow-up issue (#47904) asks for the eMudhra root CA fix to be backported to `stable/1.106.x`, implying 1.106.x images still trust a root the compromised supply chain chained to. No new releases landed in the last 24h, which is unsurprising given the yank and freeze.

---

## 2. Releases & Breaking Changes

**No new releases in the last 24h.** However, operators should treat the following as active breaking changes:

- **v1.107.0 is pulled and unsafe.** PyPI entry removed; Docker tags `latest`, `main-latest`, `main-stable` on `ghcr.io/berriai/litellm{,-database,-non_root}` and `docker.io/litellm/litellm` no longer resolve to the malicious image. If you pulled these tags between the 1.107.0 publish and the yank, assume compromise — rotate all provider keys, DB credentials, and any secrets reachable from the container.
  https://github.com/BerriAI/litellm/issues/47826
- **Backport request for `stable/1.106.x`.** Issue #47904 asks for the eMudhra CA fix (#47670) to be shipped as v1.106.3 — current 1.106.x images still trust `emSign ECC Root CA - G3`. Teams pinned to 1.106.x should not assume they are clean of the same trust-chain exposure.
  https://github.com/BerriAI/litellm/issues/47904
- **Upgrade-notice source change (PR #47998).** The Admin UI bell will read version/link from the docs changelog instead of GitHub's "latest release," to avoid pointing admins at releases that haven't been announced. Cosmetic, but worth knowing if your team relies on the banner.
  https://github.com/BerriAI/litellm/pull/47998

**Action items for anyone on 1.107.0 or recently-pulled `latest`:**
1. Pin to a known-good digest, not a floating tag.
2. Audit outbound calls from any container that ran the image for `cook.pth` / `sitecustomize` artifacts.
3. Rotate secrets; assume credential theft.

---

## 3. New Model & Hardware Support

- **Foundry Local provider added (PR #47713)** on SDK 2.2.1 — enables routing to locally-hosted Foundry models.
  https://github.com/BerriAI/litellm/pull/47713
- **DashScope realtime WebSocket support (PR #40579)** — adds a `DashScopeRealtime` handler on top of the shared OpenAI realtime handler, handling DashScope's flat `session.update` format and its handshake differences. Unblocks realtime Qwen-family deployments.
  https://github.com/BerriAI/litellm/pull/40579
- **OpenAI `image detail: "original"` not yet accepted** — `token_counter` rejects the value even though OpenAI shipped it and Azure Responses lists it. Bug #47327 (5 comments) tracks the pre-call check silently degrading to an ERROR log.
  https://github.com/BerriAI/litellm/issues/47327
- **Community model/provider request thread (#18686)** remains the canonical place to ask for integrations.
  https://github.com/BerriAI/litellm/issues/18686

---

## 4. Performance & Optimization

- **Latency-based routing degrades to random selection (issue #24720).** A lost-update race in `async_log_success_event` corrupts the latency signal under concurrency (16 Anthropic + 4 OpenAI keys), effectively turning the router into a weighted random picker. No fix PR linked yet. This is the most impactful correctness/perf issue on the board for anyone relying on latency routing.
  https://github.com/BerriAI/litellm/issues/24720
- **Unbounded upstream error-body ingestion (issue #34031).** A ~114 MB HTTP 400 body from an OpenAI-compatible backend caused the proxy to read the entire payload, run regex masking over it, and stall the event loop / blow up RSS. No size cap landed. Fix is trivial (cap at a few hundred KB) and worth patching locally if you sit behind an OpenAI-compatible upstream prone to giant validation dumps.
  https://github.com/BerriAI/litellm/issues/34031
- **Router ignores `Retry-After` for multi-deployment model groups (issue #34399).** `Router._time_to_sleep_before_retry` only honors the header when a group has a single deployment; otherwise it retries instantly against a rate-limited upstream, amplifying 429s.
  https://github.com/BerriAI/litellm/issues/34399
- **Bedrock SigV4 replay (issue #27513).** On retry/fallback, stale `Authorization` headers from a prior request can be re-applied after signing.
  https://github.com/BerriAI/litellm/issues/27513
- **Google GenAI streams that drop before first event aren't retried (PR #45750).** Gemini `:streamGenerateContent` returning 200 then dropping is surfaced as an in-stream error frame and bypasses `num_retries`.
  https://github.com/BerriAI/litellm/pull/45750
- **Gemini/Gemma-4-31B streaming dropped `tool_use.input` (issue #25390, closed).** Non-streaming worked; streaming truncated the tool payload. Worth verifying in your version — it's marked stale, so confirm the fix is present in your pinned build.
  https://github.com/BerriAI/litellm/issues/25390

---

## 5. Stability & Regressions

Ranked by severity:

**Critical — supply chain / RCE**
- **#47826** — v1.107.0 compromised: credential stealer (`cook.pth`) + `sitecustomize` RCE loader, published from lookalike repo. PyPI removed; Docker tags yanked. **Treat any host that ran 1.107.0 as compromised.**
  https://github.com/BerriAI/litellm/issues/47826
- **#47904** — Backport request for eMudhra root CA fix to `stable/1.106.x`; 1.106.x images still trust the compromised-but-not-removed root.
  https://github.com/BerriAI/litellm/issues/47904

**High — auth / data-exposure**
- **#34217** — `POST /team/delete` removes virtual keys from DB but does **not** evict them from the auth cache; deleted keys remain valid until cache expiry. `/key/delete` does clear cache — the team path was missed.
  https://github.com/BerriAI/litellm/issues/34217
- **#34479** — Postgres `max_connections` exhaustion in multi-worker deployments causes **all** user API keys to fail, not just overloaded ones.
  https://github.com/BerriAI/litellm/issues/34479
- **#26231** — Airgapped license verification breaks when the payload contains `.` (e.g. domain-like `user_id`) because `_verify_license_str` splits on the first `.` byte.
  https://github.com/BerriAI/litellm/issues/26231

**High — routing / spend correctness**
- **#24720** — Latency routing race → random selection.
- **#34399** — `Retry-After` ignored for multi-deployment groups → instant retry storms.
- **#30081** — Deployment-level `input_cost_per_token: 0` silently ignored after model-cost-map reload; per-request pricing overwrites canonical `model_cost` entries. Affects BYOK/wildcard routes where you deliberately priced at zero.
  https://github.com/BerriAI/litellm/issues/30081
- **#47675** — `response_cost` is null and spend stays $0 when `custom_llm_provider=anthropic` and the priced row lives under a different provider.
  https://github.com/BerriAI/litellm/issues/47675
- **#39057** — Semantics question: on cache hits, spend is zeroed but token columns replay original usage — which basis should token reports aggregate? No decision yet; billing reconciliation is affected.
  https://github.com/BerriAI/litellm/issues/39057

**Medium — Claude Code / Anthropic adapter**
- **#26224** — `auto_router/complexity_router` rejects `thinking.type=adaptive`.
- **#26241** — Anthropic → Responses adapter ignores `litellm.drop_params` when mapping `metadata.user_id` → `user`, breaking strict `/responses` gateways.
- **#26214** — Azure models via LiteLLM in Claude Cowork (5 👍).
- **#27091** — Claude Code + Microsoft Foundry: unsupported `reasoning.effort` and Anthropic Pydantic validation error.
- **#26252** — `websearch_interception` doesn't fire for Claude Code + Bedrock pass-through; the proposed fix (#25242) introduces a new Bedrock skip that re-breaks it.

**Medium — proxy / infra**
- **#26237** — Transient Postgres/HAProxy outage → valid models fail with "Invalid model name."
- **#30118** (closed) — UI login redirected to internal Docker IP behind nginx after 1.88.x upgrade.

**Low — UI / docs**
- **#24734** — False "guardrails feature unavailable" on unrelated key edits.
- **#19334** — Azure AI Foundry FLUX-1.1-pro and FLUX.1-Kontext-pro broken since 1.80.15.
- **#14635** — `litellm.Timeout: ... after None seconds` — timeout value not measured, cosmetic.

**In-progress fixes worth tracking:**
- **PR #45472** (closed) — Match deployment pricing IDs against cost map only within the deployment's provider; fixes the "explicit `model_info` prices bill $0" class of bug (overlaps #30081).
  https://github.com/BerriAI/litellm/pull/45472
- **PR #43668** — Fix `_strip_prisma_query_params` dropping `host`, breaking every Unix-socket Postgres deployment.
  https://github.com/BerriAI/litellm/pull/43668
- **PR #40092** — Chinese language switching for login/navigation.
- **PR #47999** — Reserve budget before each auto-executed MCP tool call (spend accounting for tool charges).
- **PR #48000** — Price/authorize advisor model iterations separately from executor tokens.
- **PR #41243** — Preserve `thinking.type=adaptive` and `output_config.effort` on native `/v1/messages` passthrough.
- **PR #47789** — 1181 basedpyright `Any` errors cleared across 431 files; QA run against real OpenAI/Anthropic returned identical responses. Type-checking improvement, no user-visible change.
  https://github.com/BerriAI/litellm/pull/47789

---

## 6. What This Means for Application Developers

- **Rotate secrets today if you touched 1.107.0 or a floating Docker tag.** Treat the container as fully compromised: provider API keys, DB credentials, `LITELLM_MASTER_KEY`, any mounted secrets. Run from a digest-pinned image going forward, and add a policy that production pulls digests, not tags.
- **Don't trust "latest" semantics in this ecosystem right now.** The compromise worked because `latest`/`main-stable` pointed at the malicious build. If your CI pipeline deploys by tag, add a manual approval or digest pin before the next release cycle.
- **Deleted team keys may still authenticate.** If your agent platform issues per-team virtual keys and you rely on `POST /team/delete` for revocation, add an explicit cache invalidation or force a proxy restart on team deletion until #34217 lands. This is a real security gap for multi-tenant agent deployments.
- **Latency-based routing is unreliable under load** (issue #24720). If your SLO depends on routing to the fastest deployment, either switch to a simpler strategy (weighted/shuffle) or patch the race — the current behavior silently degrades to count-weighted random, which can look fine in dashboards while systematically mis-routing.
- **Watch your error paths for oversized upstream bodies.** If any of your OpenAI-compatible backends can emit large validation-error JSON, patch a size cap in before propagating to LiteLLM (issue #34031) — a single 114 MB error body can stall the event loop.
- **Spend accounting has multiple open correctness bugs** (#30081, #47675, #39057). If you bill internally off `spend_logs`, reconcile against provider invoices this month rather than trusting the proxy's numbers — zero-priced deployments, cross-provider pricing lookups, and cache-hit token replay are all known to skew totals.
- **Budget reservations for MCP tool calls are being added** (PR #47999). If you use MCP with priced tools, expect a behavior change: tool charges will reserve against the request's admitted budget before execution and settle after. Plan for slightly different headroom behavior in tight-budget agents.
- **Claude Code users:** several Anthropic-adapter bugs remain open (#26224, #26241, #27091, #26252). If you route Claude Code through LiteLLM to Bedrock or Foundry, verify `thinking=adaptive`, `output_config.effort`, and `websearch_interception` on your deployment — none are reliable in current stable.
- **Postgres multi-worker deployments:** watch connection limits (#34479) and Unix-socket URLs (#43668). Both can take down auth globally.

---

*Digest generated from github.com/BerriAI/litellm activity on 2026-10-23. Given the active security incident, verify all version and tag information against the source issue before acting.*

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-10-23

## 1. Today's Highlights

No releases shipped in the last 24h, but the PR queue is active with a large coordinated **Studio UI radius-scale refactor** (8 stacked PRs), continued **multi-machine RPC serving** work (`#13726`, `#14274`), and a targeted fix for **Mac Metal OOM during DeepSeek-V4.1-Flash DSpark sidecar loads** (`#14431`). On the stability side, a fresh AMD ROCm report (`#14906`) suggests the fix for `#7208` may have introduced a **silent CPU fallback regression on native Linux RDNA3**. Several long-running issues closed today, including the LAN multi-account model-sync bug (`#12365`) and the `get_statistics()` 76s load-path stall (`#14366`).

## 2. Releases & Breaking Changes

None in the last 24h. No API/config migrations to flag.

## 3. New Model & Hardware Support

- **DeepSeek-V4.1-Flash-1017 GGUF load failure** — `llama.cpp` rejects the `deepseek41-dspark` architecture. Likely needs an upstream llama.cpp bump. [#14695](https://github.com/unslothai/unsloth/issues/14695)
- **Qwen3.5 GatedDeltaNet context-parallel** — still unsupported; FSDP2 does not shard the hybrid recurrent layers. Closed without a landed fix. [#12051](https://github.com/unslothai/unsloth/issues/12051)
- **OmniVoice** full + LoRA finetune/inference requested for Studio. [#14660](https://github.com/unslothai/unsloth/issues/14660)
- **Chat template size limit** — 64KB cap blocks ~230KB DavidAU templates; llama.cpp allows up to 8MB Jinja. [#14841](https://github.com/unslothai/unsloth/issues/14841)
- **ROCm / XPU / MPS** — AMD RDNA3 (gfx1100) native Linux GPU detection regression ([#14906](https://github.com/unslothai/unsloth/issues/14906)); Intel XPU LoRA inference on Windows mixes GNU/MSVC linker args ([#14807](https://github.com/unslothai/unsloth/issues/14807)).
- **MoE hot/cold expert split across GPU and CPU** requested for newer models. [#14484](https://github.com/unslothai/unsloth/issues/14484)
- **FP8 dequant under `torch.compile` on pre-sm89** — Triton emits unsupported fp8e4nv loads; fix landed in [#14913](https://github.com/unslothai/unsloth/pull/14913) (closed, opaque byte-decode op).

## 4. Performance & Optimization

- **`from_pretrained` load-path stall fixed** — `get_statistics()` HuggingFace-liveness check was blocking loads for ~76s on proxied machines. Closed today. [#14366](https://github.com/unslothai/unsloth/issues/14366)
- **Offload planner rework (in review)** — `#9872` weighs spills against llama.cpp's own fitter; gated behind `UNSLOTH_SMART_OFFLOAD` (opt-in). [#9872](https://github.com/unslothai/unsloth/pull/9872)
- **Metal OOM recovery + DSpark sidecar reservation** — `#14431` reserves the DSpark/DFlash sidecar in `--fit-target` and recovers from `kIOGPUCommandBufferCallbackErrorOutOfMemory` after a failed prefill. [#14431](https://github.com/unslothai/unsloth/pull/14431)
- **`checkpoint_skip_layers="auto"` under `torch.compile`** — planner is no longer traced into compile regions; fixes memory-query capture during dynamic-shape compilation. [#14928](https://github.com/unslothai/unsloth/pull/14928)
- **FP8 kernel fix** — pre-sm89 per-tensor/rowwise dequant now compiles. [#14913](https://github.com/unslothai/unsloth/pull/14913)
- **MOSS-Image timestep sinusoid** — float64 timestep built on CPU to avoid a device/backend mismatch. [#14929](https://github.com/unslothai/unsloth/pull/14929)
- **Video residency fitting** — per-request residency fitting for streaming video denoise and HunyuanVideo-1.5. [#14865](https://github.com/unslothai/unsloth/pull/14865)
- **pre-commit.ci pressure** — `scripts/enforce_kwargs_spacing.py` runs extremely slowly on the CI; closed. [#14174](https://github.com/unslothai/unsloth/issues/14174)

## 5. Stability & Regressions (ranked)

1. **🔴 ROCm silent CPU fallback regression (native Linux RDNA3)** — studio-prepended `/opt/rocm/lib` hides GPU from bundled `llama-server`; suspected regression from the `#7208` fix. No fix PR yet. [#14906](https://github.com/unslothai/unsloth/issues/14906)
2. **🟠 Mac Metal OOM on DSpark sidecar loads** — fix in review. [#14431](https://github.com/unslothai/unsloth/pull/14431)
3. **🟠 Long-chat stall before inference** — CPU conversation-archive embeddings block llama.cpp; Stop does not cancel archiving. Studio `v0.1.909-beta`. [#14519](https://github.com/unslothai/unsloth/issues/14519)
4. **🟠 GGUF export fails for remote-code models** — `trust_remote_code` not passed on export. Fix PR open: [#14722](https://github.com/unslothai/unsloth/pull/14722). Issue: [#14688](https://github.com/unslothai/unsloth/issues/14688)
5. **🟠 Ling 3 Tiny GGUF export failure** on Windows / RTX 5060 Ti. [#14916](https://github.com/unslothai/unsloth/issues/14916)
6. **🟡 DeepSeek-V4.1-Flash GGUF load failure** — architecture not recognized by bundled llama.cpp. [#14695](https://github.com/unslothai/unsloth/issues/14695)
7. **🟡 Image generation ignores VRAM Budget** — diffusers planner path ignored the slider; fix PR open. [#14816](https://github.com/unslothai/unsloth/pull/14816)
8. **🟡 Intel XPU LoRA inference on Windows** — GNU/MSVC linker arg mismatch. [#14807](https://github.com/unslothai/unsloth/issues/14807)
9. **🟡 sd.cpp direct-convolution flag drift** — pinned sd.cpp build no longer defaults `--diffusion-conv-direct` off; Studio now passes `--conv-direct off` explicitly. [#14859](https://github.com/unslothai/unsloth/pull/14859)
10. **🟡 Lemonade / FastFlowLM chat + models stopped working** on AMD Ryzen AI 7 350 / Ubuntu 26.10. [#14650](https://github.com/unslothai/unsloth/issues/14650)
11. **🟡 LAN multi-account model desync** — closed today. [#12365](https://github.com/unslothai/unsloth/issues/12365)

## 6. What This Means for Application Developers

- **Load latency:** If you're calling `FastLanguageModel.from_pretrained` in a request path or on proxied/offline networks, the 76s `get_statistics()` stall is gone — cold-start SLAs are much better.
- **AMD Linux users:** Do not upgrade Studio blindly if you depend on GPU inference on RDNA3 — `#14906` is an active regression. Preserve your `LD_LIBRARY_PATH` / system ROCm setup and watch for a fix.
- **Apple Silicon users on large MoE models:** If you load DSpark/DFlash sidecars (DeepSeek-V4.1-Flash), wait for `#14431` to land before raising `--parallel` or `-c` — otherwise a failed prefill puts llama-server into a permanent error state.
- **Remote-code models:** If you fine-tune models requiring `trust_remote_code=True`, GGUF/checkpoint export from the UI currently fails until `#14722` merges. Workaround: export via the Python API.
- **Multi-machine inference is coming:** `#13726` (N-machine GGUF split over llama.cpp RPC) and `#14274` (mTLS pairing on a home LAN) lay the groundwork for horizontal scaling without cloud dependencies. Worth tracking if you want to pool consumer GPUs behind one endpoint.
- **`UNSLOTH_SMART_OFFLOAD`** remains opt-in — no behavior change unless you set it, but the planner rewrite in `#9872` is the direction of travel for automatic VRAM budgeting.
- **Headless/CI users:** pre-commit runtime pressure from this repo is resolved; if you forked `enforce_kwargs_spacing.py`, rebase. [#14174](https://github.com/unslothai/unsloth/issues/14174)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*