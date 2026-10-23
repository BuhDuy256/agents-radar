# AI Infrastructure Digest 2026-10-23

> Generated: 2026-10-23 02:46 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Infrastructure Digest
**Date: 2026-10-23 | Scope: vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth**

---

## 1. Ecosystem Overview

The AI infrastructure stack is in a **consolidation-and-hardening phase**: no major releases landed across any of the six projects today, yet PR queues and issue trackers remain saturated. Effort has shifted from headline feature launches toward **correctness hardening in disaggregated serving** (vLLM, SGLang), **supply-chain remediation** (LiteLLM's v1.107.0 compromise), and **kernel-level optimization for Hopper/Blackwell/ROCm** (vLLM, SGLang, llama.cpp). MoE, hybrid linear-attention (GDN/KDA/QSA), and FP4 KV cache are now universal concerns, but they are also the source of nearly every silent-correctness bug reported today. Meanwhile, the classic split between *serving engines* (vLLM, SGLang) and *local runtimes* (llama.cpp, Ollama) is being pressured from both ends: gateways (LiteLLM) are absorbing routing/cost/billing logic, and fine-tuning tools (Unsloth) are pushing inference runtimes into the training loop.

---

## 2. Activity Comparison

| Project | Issues (active in digest) | PRs (active in digest) | Release status (24h) | Dominant activity theme |
|---|---|---|---|---|
| **vLLM** | ~12 tracked (4 open critical/high) | ~500 updated, ~15 highlighted | **None** (no release) | PD disaggregation correctness, ROCm parity, Rust frontend |
| **SGLang** | ~15 tracked (2 critical) | ~12 highlighted | **None** (v0.5.22 current) | DSv4/GLM-5.3 kernel fusion, AMD FlyDSL, PD disagg |
| **llama.cpp** | ~10 tracked (2 critical) | ~10 merged/open | **High cadence** (b11815–b11829) | SYCL/Intel Arc perf, MoE CPU spill, MiniCPM-OCR |
| **Ollama** | ~10 tracked (2 critical) | ~10 in flight | **None** | Cloud reliability (#15453, #18980), MLX/Nemotron |
| **LiteLLM** | ~15 tracked (1 critical security) | ~10 in flight | **None** (v1.107.0 yanked) | **Supply-chain remediation**, provider adapters |
| **Unsloth** | ~31 active | ~20 top PRs | **None** | Studio/Desktop UX, GRPO correctness, diffusion fixes |

**Takeaways:**
- **llama.cpp** is the only project on a daily-release cadence — consistent with its role as the substrate for downstream runtimes (Ollama, Unsloth).
- **vLLM** has by far the largest raw PR volume (~500 updated), reflecting its role as the de facto OSS serving engine but also a growing maintenance load.
- **LiteLLM's** tracker is dominated by a single critical event; excluding that, provider-adapter polish is the norm.
- **Unsloth's** 31 active issues skew toward UX/Studio, signaling it is maturing from a training library into an application surface.

---

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek-V4.x (incl. V4.1-Flash)** | ✅ PP partitioning, replay graphs, MXFP4 indexer | ✅ PD disagg (trtllm-gen), kernel fusion (prefill index, K-norm-rope, mHC) | ❌ blocked (dspark arch unrecognized) | ❌ | ⚠️ GGUF blocked; DSpark sidecar workaround |
| **GLM-5.3-Flash** | ✅ ROCm KDA prefill | ✅ Hopper SM90 tracking issue | ⚠️ QSA `kq_mask` opt | ✅ cloud (but degenerating) | — |
| **Qwen3.5 / Qwen3.8 (incl. QSA, GDN)** | ✅ GDN MTP Triton port (ROCm) | ✅ FlyDSL QSA/GDN decode on gfx950 | ⚠️ hybrid DeltaNet broken on SYCL | ✅ | ⚠️ GatedDeltaNet CP unsupported |
| **Kimi-K3** | ✅ ROCm BF16 KDA state | ⚠️ DCP a2a garbled on GB300 | — | ✅ cloud | — |
| **Nemotron 3.5 Bolt** | — | — | ⚠️ GQA/tokenizer PR open | ✅ MLX PR (#19229) | — |
| **MiniCPM-OCR 1.0** | — | — | ✅ own projector type | — | — |
| **GigaChat 3.5 432B** | — | — | ⚠️ in review | — | — |
| **SANA-Sprint 0.6B (diffusion)** | — | ⚠️ feature request | — | — | — |
| **Muse Spark** | — | ✅ Day-0 roadmap | — | — | — |

**Ahead:** **vLLM** and **SGLang** are jointly ahead on frontier-model day-0 support, but for different reasons — vLLM leads on *breadth* (DeepSeek-V4.1, GLM-5.3, Kimi-K3, Qwen3.5/3.8 across CUDA and ROCm), SGLang leads on *depth of kernel specialization* for DSv4 and on **AMD gfx950/gfx1250 via FlyDSL/Gluon** paths. **llama.cpp** trails badly on new MoE architectures (DeepSeek-V4.1-Flash GGUF is effectively blocked), which cascades to **Ollama** and **Unsloth**. **Unsloth's** model-support gap on DeepSeek-V4.1-Flash and Qwen3.5 GatedDeltaNet CP is the most consequential for fine-tuners.

---

## 4. Performance Frontier

Optimization effort is **unevenly concentrated**. Ranked by activity volume:

| Area | Most active | Nature of work |
|---|---|---|
| **Kernels (fused / Triton / FlyDSL)** | SGLang, vLLM, llama.cpp | DSv4 prefill index fusion, K-norm-rope rewrite, GDN MTP Triton port, GLM-5.3 SM90 campaign, SYCL XMX refactor |
| **Disaggregated serving (PD, KV transfer)** | vLLM, SGLang | Mooncake vs NIXL benchmarking (#63006), DSv4 PD for trtllm-gen (#45221), NIXL UCX/rocm_ipc enablement |
| **KV cache (offload, quantization, policy)** | vLLM, SGLang, Ollama | Cross-TP offload for GDN hybrids, FP4 block-scale handling (broken in SGLang PD), pluggable KV connector (Ollama proposal) |
| **MoE memory governance** | llama.cpp, Unsloth | `--moe-cache-cpu-share` CPU spill, hot/cold expert split request, XPU/MPS VRAM caps |
| **Quantization precision (FP4/FP8/act-type)** | SGLang, llama.cpp, vLLM | FP4 MX block16 KV (broken under PD), `--act-type f16` graph-key change, MXFP4 sparse indexer on gfx950 |
| **Distributed / multi-node** | vLLM, Unsloth | GB200 DP4 prefill replay graphs, home-network mTLS RPC (Unsloth), DGX Spark 2-node clustering |
| **Batching / graph capture** | vLLM | B300 Qwen3.8 1024-token capture size is leaving large GDN prefill gains on the table (#62556) |
| **Routing / cost accounting** | LiteLLM | Gemini context-cache per-token-hour billing, rerank cost fidelity |

**Signal:** The **kernel-fusion frontier is now the primary battleground** between vLLM and SGLang on NVIDIA Hopper/Blackwell, while the **AMD frontier has quietly become SGLang's home turf** (FlyDSL, Gluon MLA, aiter). vLLM's ROCm work is parity-driven (Triton ports of CUDA kernels); SGLang's is net-new (FlyDSL Qwen3.5 GDN prefill at 1.4–1.74× speedup).

---

## 5. Layer Positioning

| Layer | Projects | Primary buyer / user | Value proposition | Today's pressure |
|---|---|---|---|---|
| **Production serving engine** | vLLM, SGLang | Platform/infra teams running multi-tenant inference | Throughput, PD disagg, KV policy, spec-decode | Correctness bugs in PD + hybrid attn; Rust frontend (vLLM) and AMD parity (SGLang) |
| **Local / consumer runtime** | llama.cpp, Ollama | Developers, desktop users, edge/self-hosters | Single-binary, GGUF, quantized, hardware breadth | Hybrid-attention correctness on Intel/Vulkan; Ollama cloud reliability |
| **LLM gateway / proxy** | LiteLLM | App teams + platform teams abstracting providers | Provider abstraction, routing, cost, key mgmt | **Supply-chain trust**; unbounded error ingestion; Retry-After handling |
| **Fine-tuning / training runtime** | Unsloth | Fine-tuners, LoRA/GRPO practitioners | Memory-efficient training, distillation, quantized bases | GRPO+vLLM silent weight desync; Windows/XPU robustness |
| **Downstream apps / agents** | *consumers of all above* | Agent builders, RAG, coding assistants | — | Must reason about silent-wrongness across every layer |

**Key structural insight:** The **layers are coupling more tightly**. vLLM and SGLang are adding router-facing primitives (BlockStored event ordering, render/generate/derender contracts), LiteLLM is growing provider semantics that used to live in apps, and Unsloth now ships a desktop application. The **"gateway middle" is thickening** — expect consolidation, not clean separation.

---

## 6. Trend Signals

### Trend 1 — PD disaggregation correctness is the #1 systemic risk
Both vLLM (#61160, cross-request KV contamination with prefix caching) and SGLang (#45866, FP4 block scales dropped in PD transfer; #45864, QSA state corruption on retraction) reported **silently wrong outputs**, not crashes, under disaggregated serving. **Agent developers should treat PD + prefix caching + hybrid-attention as a triple that requires continuous output validation**, not one-and-done setup.

### Trend 2 — Hybrid linear attention is the new correctness frontier
GDN/GDN-Lite, KDA, QSA, and DeltaNet appear across vLLM, SGLang, llama.cpp, and Unsloth — and are implicated in the worst bugs in **three of four inference projects** (llama.cpp SYCL token soup, Unsloth GRPO desync, SGLang QSA retraction corruption). **Pin known-good builds for hybrid-attention models and gate deployments on PPL regression tests.**

### Trend 3 — AMD is no longer a parity afterthought
SGLang's FlyDSL/Gluon MLA and GDN prefill on gfx1250/gfx950, plus vLLM's Triton ports and `rocm_ipc` NIXL enablement, mean **MI3xx is now a first-class target for frontier-model serving**. Spec-decode on ROCm is closing a previously non-functional gap (vLLM #63096, #61855).

### Trend 4 — Supply-chain trust is now an infra concern
LiteLLM's v1.107.0 compromise (`cook.pth` stealer, `sitecustomize` RCE) is the highest-severity event in the window. **Decision-makers should mandate digest-pinned deployments across all six projects, plus SBOM/SLSA checks for gateways in particular** — a gateway is the highest-value injection point in the stack.

### Trend 5 — MoE memory governance is the emerging self-hoster pain
llama.cpp's `--moe-cache-cpu-share`, Unsloth's hot/cold expert split request, and recurring "expert cache" issues indicate **the industry has not settled on a MoE offload story**. Teams running frontier MoE on non-datacenter hardware should expect to choose between prefill latency, decode throughput, and VRAM headroom — not have all three.

### Trend 6 — Client-side cancellation is not uniform
SGLang explicitly documents that `/v1/systemone` ignores disconnect while chat completions honor it. **If you rely on disconnect-driven cancellation for cost control, add explicit abort calls and per-endpoint audits** across SGLang, Ollama (`/v1/responses` stream semantics), and LiteLLM (Retry-After, error-body ingestion).

### Trend 7 — Cost accounting is maturing but not uniform
LiteLLM's Gemini context-cache per-token-hour billing and rerank cost fidelity fixes are a signal: **proxy-level cost telemetry is graduating from best-effort to auditable**. Teams billing internally off `spend_logs` should revisit historical reconciliation and the cache-hit semantics ambiguity (#39057) before adopting proxy response caching as a billing primitive.

### What application / agent developers should watch
1. **Output validation as a first-class layer** for any agent touching PD disagg, hybrid attn, or cloud (Ollama Pro has a 95% failure report with no fix posted).
2. **Context-length truth** — Ollama `/api/show` and similar APIs report native context, not effective context (#18995). Compute own budgets.
3. **Tool-call parsing robustness** — literal `</function>` in args (llama.cpp #19228), trailing noise after valid calls (Gemma 4 #19226), developer-role rejection (Ollama/Mistral #19021). Add schema validation + retries.
4. **Rust/parity roadmaps** — vLLM's `VLLM_USE_RUST_FRONTEND=1` and Unsloth's cluster-serving PRs presage Python-optional, multi-node serving. Plan a 12–18-month migration path.
5. **Billing primitives** — Gemini cache storage and rerank costs were previously undercounted (LiteLLM #47989, #47843); revisit before charging customers.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-23

## 1. Today's Highlights

No releases landed in the last 24 hours; activity is dominated by a large PR queue (500 updated) and continued RFC traffic around disaggregated serving, KV cache policy, and the Rust frontend roadmap. Two freshly filed correctness bugs warrant attention: cross-request KV contamination under PD disaggregation with prefix caching (#61160), and stale top-k index reads in GLM-5.x under pipeline parallelism (#63170). On the performance side, ROCm continues closing the gap with new Triton ports and a UCX bump to enable `rocm_ipc` for NIXL.

## 2. Releases & Breaking Changes

No new releases in the last 24h.

Notable in-flight changes that will affect deployments once merged:

- **[PR #61939](https://github.com/vllm-project/vllm/pull/61939)** — ROCm CI/release overhaul collapses six image tiers into a unified build pipeline. Companion to `ci-infra#820`; must merge together or with ci-infra first. Expect image tag/name churn.
- **[PR #62827](https://github.com/vllm-project/vllm/pull/62827)** — Bumps UCX to `v1.23.0-rc1` in ROCm Dockerfiles, drops `UCX_RMA_PPLN_ENABLE`, sets `UCX_ROCM_IPC_SIGPOOL_MAX_ELEMS=inf` so NIXL actually uses `rocm_ipc`.
- **[PR #63188](https://github.com/vllm-project/vllm/pull/63188)** — `BUILD_NIXL=true` now accepts a Git-ref override and builds the LIBFABRIC plugin, not just UCX at a pinned tag.
- Closed: **[#63056](https://github.com/vllm-project/vllm/issues/63056)** — request to expose `--sleep-mode-backend` on the CLI was resolved; pluggable sleep-mode backends (RFC #34303) are now reachable from `EngineArgs`.

## 3. New Model & Hardware Support

- **[PR #63106](https://github.com/vllm-project/vllm/pull/63106)** — DeepSeek-V4.1: arbitrary non-empty pipeline partitions via `VLLM_PP_LAYER_PARTITION`, including cuts inside KV-sharing groups (e.g. `10,30`, `12,28`, `25,15`, `10,10,10,10`). Relays Main KV, indexer K, top-k indices across stages.
- **[PR #58743](https://github.com/vllm-project/vllm/pull/58743)** — ROCm Kimi-K3: BF16 KDA recurrent state honored for `--mamba-ssm-cache-dtype bfloat16`, including paged prefill states and checkpoints.
- **[PR #63072](https://github.com/vllm-project/vllm/pull/63072)** — GLM-5.3-Flash (ROCm): chunk KDA prefill now consumes precomputed `chunk_indices` from `GDNAttentionMetadata`, eliminating a GPU→CPU sync per prefill.
- **[PR #63096](https://github.com/vllm-project/vllm/pull/63096)** — ROCm `ROCM_AITER_UNIFIED_ATTN` gains `supports_draft_decode_metadata_update`, enabling fused multi-step draft decode (EAGLE/MTP) under Model Runner V2.
- **[PR #61855](https://github.com/vllm-project/vllm/pull/61855)** — Triton port of the fused GDN MTP decode kernel for ROCm (Qwen3.5-family flat `qkvz` layout); previously CUDA-only via #51674. Now closed.
- **[PR #60834](https://github.com/vllm-project/vllm/pull/60834)** — ROCm gfx950: opt-in paged MXFP4 sparse indexer dense path for DeepSeek-V4 (68 B/token indexer K cache vs. 132 B FP8). Closed.

## 4. Performance & Optimization

- **[PR #63251](https://github.com/vllm-project/vllm/pull/63251)** — Model Runner V2: lowers engine `max_model_len` to the draft model's when the draft's is smaller and cannot be raised. Fixes the V2 case of #57941. Correctness-adjacent but affects scheduling/memory.
- **[PR #63076](https://github.com/vllm-project/vllm/pull/63076)** — ROCm: register-resident Triton sigmoid+bias top-k for single-group MoE routing (`num_expert_group == topk_group == 1`), bypassing AITER `biased_grouped_topk`'s unused LDS group scan.
- **[PR #63155](https://github.com/vllm-project/vllm/pull/63155)** — DeepSeek-V4.1: decoder replay graphs captured on the model graphs' stream, reusing shared graph-pool free blocks instead of reserving a second pool. Fixes #62965; affects GB200 DP4 prefill.
- **[PR #62914](https://github.com/vllm-project/vllm/pull/62914)** — KV Offload: canonical cross-TP offload for attention+GDN hybrids, enabling filesystem cache reuse across TP sizes (GDN cache-type slice of #61886).
- **[PR #63006](https://github.com/vllm-project/vllm/pull/63006)** — RFC to cut Mooncake descriptor/WR overhead: measured −35% to −67% KV-transfer bandwidth vs. NIXL on full-attention Qwen3, and higher TTFT; bottleneck is many small transfers.
- **[#62556](https://github.com/vllm-project/vllm/issues/62556)** — Open discussion: Qwen3.8-Flash-Next B300 recipe leaves CUDA graph capture sizes at 1,024 tokens, forcing eager prefill/mixed steps and paying GDN host overhead. Raising capture sizes recovers meaningful throughput.
- **[#52057](https://github.com/vllm-project/vllm/issues/52057)** — Adaptive DSpark online profiling drifts at higher batch sizes; startup-time replay estimates need improvement.
- **[PR #63249](https://github.com/vllm-project/vllm/pull/63249)** — KV Offload: preserves stored event prefix order so `BlockStored` events stay parent-before-child, preventing KV-aware routers from dropping child blocks.

## 5. Stability & Regressions

Ranked by severity:

1. **[#61160](https://github.com/vllm-project/vllm/issues/61160)** (OPEN, 8 comments) — **Cross-request context contamination** in NIXL PD disaggregation with automatic prefix caching (default on) serving DeepSeek-V4.1-Flash. Responses intermittently contain content from other requests. Clean with `--no-enable-prefix-caching`. Scriptable reproducer available. **Highest priority — correctness/safety impact; no fix PR linked.**
2. **[#61229](https://github.com/vllm-project/vllm/issues/61229)** (OPEN, 8 comments) — NixlConnector: KV blocks released on lease expiry while remote READ is in flight; decode silently consumes overwritten KV. Seen on vLLM 0.30.0, single-host 1P1D, UCX/TCP.
3. **[#63170](https://github.com/vllm-project/vllm/issues/63170)** (OPEN, 4 comments) — GLM-5.x (DSA) under pipeline parallelism (`--pipeline-parallel-size > 1`): reuse layers at a stage start read stale top-k indices. Found by source inspection; hardware-independent.
4. **[#62939](https://github.com/vllm-project/vllm/issues/62939)** (OPEN, 2 comments) — MRV2 + DSpark + `enable_adaptive_verification` fails at startup (device-side assert in drafter) when `max_num_batched_tokens < max_num_seqs × draft query rows`. Reproduced on 0.31.0 and 0.32.0, A100-40GB.
5. **[#62776](https://github.com/vllm-project/vllm/issues/62776)** (OPEN, 7 comments) — Qwen3.8-Flash-Next on GB10 (sm121, v0.32 nightly): prompt content beyond ~`indexer_budget` (2048) tokens is invisible to the model. Functional regression at long context.
6. **[#51743](https://github.com/vllm-project/vllm/issues/51743)** (OPEN, 5 comments) — DeepSeek-V4-Flash TP4 on H100: `--max-num-batched-tokens >= 24576` crashes EngineCore in fused qnorm/rope/kv-insert; allocation invisible to memory profiler.
7. **[#49197](https://github.com/vllm-project/vllm/issues/49197)** (OPEN, 4 comments) — Beam search ~1000× slower than expected (A100). Long-standing.
8. **[#46262](https://github.com/vllm-project/vllm/issues/46262)** (OPEN, 8 comments) — ROCm TP2 tool calling produces garbled output on GLM-5.2-FP8 DSA with chunked prefill; TP1 fine.
9. Closed today: **[#46283](https://github.com/vllm-project/vllm/issues/46283)** (decode-side KV block leak on aborted remote-KV load), **[#53477](https://github.com/vllm-project/vllm/issues/53477)** (DFLASH2 force-reprocessing context), **[#56540](https://github.com/vllm-project/vllm/issues/56540)** (ROCm GLUON/TRITON log spam).

Mitigations: for #61160, disable prefix caching or avoid PD disaggregation until fixed. For #62939, ensure `max_num_batched_tokens >= max_num_seqs × draft query rows` or disable adaptive verification.

## 6. What This Means for Application Developers

- **If you run PD disaggregation with prefix caching, audit for crosstalk now.** #61160 is the kind of bug that surfaces as subtly wrong answers, not crashes — dangerous in agentic or multi-tenant deployments. Benchmark with `--no-enable-prefix-caching` and compare outputs.
- **Disaggregated serving APIs are stabilizing around render/generate/derender.** [#56851](https://github.com/vllm-project/vllm/issues/56851) and [#42729](https://github.com/vllm-project/vllm/issues/42729) define request-level text/derender on `/inference/v1/generate`. If you build custom OpenAI-compatible frontends, expect the render→generate→derender contract to become the standard path for token-ID-native serving. [#57593](https://github.com/vllm-project/vllm/issues/57593) tracks unifying chat message assembly between `OpenAIServingChat` and batch derender.
- **KV-aware routers must handle prefix-ordered block events.** If you consume `BlockStored` events (LMCache, Mooncake, NIXL-based routers), watch PR #63249 — child blocks can be dropped when a parent mapping isn't indexed yet.
- **Programmable KV Cache ([#57103](https://github.com/vllm-project/vllm/issues/57103)) is coming for agentic workloads.** Provider-neutral retention/movement/quota policies driven by router-supplied session lifecycle intent. Worth tracking if you're building session-aware routing for long-running agents.
- **Spec-decode on ROCm is catching up.** EAGLE/MTP fused multi-step draft decode (#63096) plus the GDN MTP decode Triton port (#61855) close previously non-functional paths. Re-benchmark speculative decoding on MI3xx before assuming it's off the table.
- **Don't over-tune CUDA graph capture sizes without measurement.** #62556 shows the B300 Qwen3.8-Flash-Next recipe's default 1,024-token capture size is leaving large prefill gains on the table for GDN models; a two-line config change can matter more than kernel work.
- **Rust frontend is on a parity roadmap ([#44280](https://github.com/vllm-project/vllm/issues/44280)).** `VLLM_USE_RUST_FRONTEND=1` is experimental and not feature-complete; don't ship it to production yet, but plan for a Python-optional API server in the medium term.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-23

## 1. Today's Highlights

No new releases landed in the last 24h, but activity is high across Q4 kernel optimization and model support. The dominant themes are GLM-5.3-Flash performance work on Hopper (SM90), DeepSeek-V4 (DSv4) kernel fusion and PD-disaggregation enablement, and a cluster of correctness bugs in KV-cache transfer paths (FP4 block scales, QSA indexer state on retraction) that are worth watching if you run disaggregated or hybrid-model workloads. CI/AMD flakes continue to generate noise and are being tracked in dedicated issues.

---

## 2. Releases & Breaking Changes

- **No new releases in the last 24h.** Several reports reference `v0.5.22` and `v0.5.17`/`v0.5.18` as current/previous versions. No API or config-breaking changes announced today.

---

## 3. New Model & Hardware Support

- **SANA-Sprint 0.6B (diffusion)** — feature request for native SGLang-Diffusion support of `Efficient-Large-Model/Sana_Sprint_0.6B_1024px_diffusers`, a 1–4 step 1024px text-to-image model. [#43671](https://github.com/sgl-project/sglang/issues/43671)
- **Muse Spark** — Day-0 support roadmap with PRs #44664–#44667 being merged in order, plus DeepGEMM dependency bumps. [#44678](https://github.com/sgl-project/sglang/issues/44678)
- **AMD gfx1250 (aiter backend)** — PR adds paged **Gluon MLA decode** on gfx1250, working around the ASM MLA decode kernels' FP8-Q / KV-layout requirements by reading SGLang's paged KV pool directly. [#44458](https://github.com/sgl-project/sglang/pull/44458)
- **AMD gfx950 (FlyDSL)** — Qwen3.8 QSA decode served via AITER's fused FlyDSL sparse decode, replacing the current two-pass Triton gather+decode. [#45196](https://github.com/sgl-project/sglang/pull/45196); and FlyDSL GDN prefill / causal conv1d for Qwen3.5/Qwen3.8 on gfx95. [#39595](https://github.com/sgl-project/sglang/pull/39595), [#41879](https://github.com/sgl-project/sglang/pull/41879)
- **Ascend NPU** — `npu_memcache` backend added for the global multimodal-embedding cache (`--mm-global-cache-backend`), removing the RDMA/Mooncake dependency for NPU deployments. [#41567](https://github.com/sgl-project/sglang/pull/41567)

---

## 4. Performance & Optimization

- **GLM-5.3-Flash on Hopper (SM90)** — dedicated tracking issue under the Q4 roadmap kernel campaign (#42473). [#45373](https://github.com/sgl-project/sglang/issues/45373)
- **DSv4 prefill index mapping** — collapses the torch add/clamp/gather/compare/where/copy pipeline for V4.1 prefill top-k page-index writes into a single kernel. [#45938](https://github.com/sgl-project/sglang/pull/45938)
- **DSv4 K-norm-rope store** — rewrites `fused_k_norm_rope_flashmla` to write V4.1 K rows with one warp per token (512-wide rows) instead of one 256-thread block per token, targeting large prefill batches. [#45934](https://github.com/sgl-project/sglang/pull/45934)
- **DSv4 mHC combine** — removes an fp32 copy of the full `[tokens, 4·hidden]` residual by relying on the kernel's per-element widening. [#45940](https://github.com/sgl-project/sglang/pull/45940) (closed)
- **DSv4 PD disaggregation for TRTLLM-Gen attention** — enables PD disagg for the DSv4 trtllm-gen backend (stacked on #36652). [#45221](https://github.com/sgl-project/sglang/pull/45221)
- **FLUX.3 diffusion disaggregation** — split prompt-encoder / image-encoder / DiT / decoder into independent worker pools; follow-up PR adds declarative stage deployments. [#45309](https://github.com/sgl-project/sglang/pull/45309), [#45394](https://github.com/sgl-project/sglang/pull/45394)
- **AMD GDN prefill** — FlyDSL path reports ~1.4–1.74× prefill batch speedup on Qwen3.5-397B shapes (TP4, 4 KV heads, 16 V heads, K=V=128) per the PR description. [#39595](https://github.com/sgl-project/sglang/pull/39595)
- **Mooncake HiCache controls** — replica placement and read-buffer controls, plus a prefetch mode for the external linker that detects restoration failure before admission. [#37390](https://github.com/sgl-project/sglang/pull/37390), [#45600](https://github.com/sgl-project/sglang/pull/45600)

---

## 5. Stability & Regressions

Ranked by severity (correctness/silent-wrongness first):

1. **FP4 KV block scales dropped in PD transfer** — with `--kv-cache-dtype fp4_mx_block16`, PD disaggregation ships packed KV but not block scales; decode dequantizes against stale/zero scales → **garbage output**. [#45866](https://github.com/sgl-project/sglang/issues/45866)
2. **QSA indexer state corruption on PD decode retraction** — Qwen3.8-Flash-Next: a retracted-then-resumed request inherits another request's QSA indexer state (hybrid `cpu_tensor` backup path). [#45864](https://github.com/sgl-project/sglang/issues/45864)
3. **GLM-5.3-Flash EAGLE CUDA illegal memory access** — 8×H20 TP8/EP8, crash in `run_eagle_verify` → `build_grammar_vocab_mask`. [#45159](https://github.com/sgl-project/sglang/issues/45159)
4. **Kimi-K3 DCP a2a garbled decode on 2-node GB300** — CUDA-graph + NCCL graph-buffer registration produces 12/12 degenerate outputs; `NCCL_GRAPH_REGISTER=0` restores output. [#45367](https://github.com/sgl-project/sglang/issues/45367)
5. **Scheduler crash with `--enable-lmcache` + disabled radix cache** — crashes at first idle check on 0.5.22 (affects embedding-mode models that auto-disable radix cache). [#45929](https://github.com/sgl-project/sglang/issues/45929)
6. **`--max-queued-requests 0` + priority scheduling** — scheduler crash on empty queue. [#45510](https://github.com/sgl-project/sglang/issues/45510)
7. **FP8 fused MoE `swap_ab` compile failure on Triton 3.9** — rank-0 scale indexing. [#45887](https://github.com/sgl-project/sglang/issues/45887)
8. **`/v1/systemone` requests not aborted on client disconnect** (0.5.22) — queued/running work continues to completion, unlike chat completions. [#45842](https://github.com/sgl-project/sglang/issues/45842)
9. **HiCache host-tier hits drop to zero on hybrid GDN models** — mamba pool exhausts while KV stays on host once evicted working set exceeds ~3 long prefixes. [#45400](https://github.com/sgl-project/sglang/issues/45400)
10. **Priority preemption ordering can diverge across TP ranks** — victims requeued in set order, non-deterministic across ranks. [#45812](https://github.com/sgl-project/sglang/issues/45812)
11. **VLM crash with caller `mm_hashes` on cold cache** — `index_copy_(): index out of bounds`; on warm cache caller hash silently ignored. Fix PR open: [#41375](https://github.com/sgl-project/sglang/pull/41375)
12. **CI/AMD**: `test_basic_sanity_dspark.py` decode vs prefill top-logprob mismatch >0.5 delta on H100 since `c64886f9e3` [#45846](https://github.com/sgl-project/sglang/issues/45846); NIXL UCX destination-unreachable [#45850](https://github.com/sgl-project/sglang/issues/45850); Mooncake v0.3.14 RDMA aux-data failure [#45849](https://github.com/sgl-project/sglang/issues/45849); AMD test tracker [#45847](https://github.com/sgl-project/sglang/issues/45847)
13. **Flaky-test/CI umbrella** — ongoing tracker for NVIDIA `PR Test Base`/`PR Test Extra` flakes. [#42752](https://github.com/sgl-project/sglang/issues/42752)

Also closed as inactive today: stale staging-watermark subscribers (#34737), Qwen3.8-27B NVFP4 coordinate detection (#35949), Qwen3.8-27B AWQ on Ada SM89 (#36048), `-lcuda` link failure (#36058), `--model-path` required with `--config` (#36105), DeepSeek-V4 `dsa_layer_skips_topk` extension (#36083).

---

## 6. What This Means for Application Developers

- **Avoid FP4 KV cache (`fp4_mx_block16`) under PD disaggregation for now** — the block-scale transfer gap produces silently wrong output rather than an error. If you already run this config, validate decode quality before trusting results.
- **Be cautious with hybrid/linear-attention models under retraction or HiCache** — two separate reports (#45864, #45400) show state/KV pool mismatches after eviction or retraction. Cap concurrent long-prefix workloads or monitor host mamba pool utilization.
- **`--enable-lmcache` does not currently compose with disabled radix cache** in 0.5.22 — expect a scheduler crash at first idle if you use embedding-mode models or `--disable-radix-cache`.
- **Client-side cancellation is not uniform**: `/v1/chat/completions` aborts on disconnect, but `/v1/systemone` does not. If you rely on disconnect-driven cancellation for cost control, add explicit abort calls for systemone traffic.
- **Prometheus metric naming may change** — an issue is open to switch `sglang:` prefixes to underscores (#45418); plan dashboards/alerts to tolerate or migrate.
- **Perf upside is coming for Hopper and AMD**: GLM-5.3-Flash SM90, DSv4 kernel fusion, and gfx950/gfx1250 FlyDSL paths are all in flight — worth benchmarking once merged if you're on those platforms.
- **Diffusion serving is getting disaggregation** (FLUX.3 encoder/DiT/decoder split, SANA-Sprint support) — relevant if you're building image-generation pipelines on SGLang.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-23

## 1. Today's Highlights

Release cadence remains high (b11815–b11829), with the standout work being a **new `--moe-cache-cpu-share` path that executes cache-missed MoE experts on CPU** (#30966) and a **19% prompt-eval speedup for Intel Arc tensor-parallel serving** (#30956). On the correctness side, two independent SYCL DeltaNet "token soup" reports (#29183, #29167) and a Qwen3.8-27B long-context throughput cliff (#27623, ~25x decode collapse past ~80K) remain open and unresolved, which should temper enthusiasm for hybrid-attention models on Intel/consumer hardware right now.

## 2. Releases & Breaking Changes

- **b11829** — server: rerank placeholder now substituted from the original template only ([PR #30864](https://github.com/ggml-org/llama.cpp/pull/30864)). Behavior change for anyone post-processing rerank outputs.
- **b11828** — server: realtime API sends `complete` **after committed audio drains**, with completion triggered at the commit's end row rather than by stream dryness ([PR #30994](https://github.com/ggml-org/llama.cpp/pull/30994)). This changes timing semantics for streaming audio clients.
- **b11826** — mtmd: MiniCPM-OCR 1.0 registered as its own projector type ([PR #30979](https://github.com/ggml-org/llama.cpp/pull/30979)).
- **PR #31011** (open) — introduces `--act-type {f32,f16}` / `LLAMA_ARG_ACT_TYPE`, default f32; the activation type becomes part of the **graph reuse key**, so mixing this setting across requests invalidates graph reuse ([PR #31011](https://github.com/ggml-org/llama.cpp/pull/31011)).

No GGUF format or CLI-breaking removals in this window.

## 3. New Model & Hardware Support

- **MiniCPM-OCR 1.0** — vision-language OCR via reusing the MiniCPM-V 4.6 clip graph and conversion path ([#30979](https://github.com/ggml-org/llama.cpp/pull/30979)).
- **Nemotron** — non-standard GQA, BPE tokenizer, and domyn-small pre-type support; `Metaspace prepend_scheme` now written as GGUF metadata ([#23343](https://github.com/ggml-org/llama.cpp/pull/23343)). Note the related open bug: Nemotron 3/3.5 GGUFs mis-tagged "pixtral" get the wrong pre-tokenizer ([#30894](https://github.com/ggml-org/llama.cpp/issues/30894)).
- **GigaChat 3.5 432B-A28B** — DeepSeek-V3-style MoE + MLA, in review ([PR #25342](https://github.com/ggml-org/llama.cpp/pull/25342)).
- **Hexagon NPU backend** — CONV2D (f16/f32, validated on v75/v81) and CEIL ops added ([#30995](https://github.com/ggml-org/llama.cpp/pull/30995), [#31006](https://github.com/ggml-org/llama.cpp/pull/31006)); SGN op in review for Qwen3.8-Flash-Next ([#30346](https://github.com/ggml-org/llama.cpp/pull/30346)).
- **OpenCL** — Adreno depthwise conv2d, using local programs ([PR #30900](https://github.com/ggml-org/llama.cpp/pull/30900)).
- **Soprano-1.1-80M audio generation** — mtmd support in review ([PR #28607](https://github.com/ggml-org/llama.cpp/pull/28607)).
- **glm5** — QSA layers no longer allocate `kq_mask` ([PR #31009](https://github.com/ggml-org/llama.cpp/pull/31009)).

## 4. Performance & Optimization

- **SYCL tensor-parallel prompt eval: +19%** (range +16.7–20.6%) on dual Arc Pro B70 via a faster `ggml_sycl_comm_exchange()`, with zero PPL change — reported to bring `-sm tensor` up to `-sm layer` parity ([PR #30956](https://github.com/ggml-org/llama.cpp/pull/30956)).
- **MoE expert cache can now spill misses to CPU** (`--moe-cache-cpu-share`, plus a tuning script), trading decode speed for effective cache capacity ([PR #30966](https://github.com/ggml-org/llama.cpp/pull/30966)).
- **Intel XMX mul_mat_vec_q multi-column refactor** — 2–80 activation columns for reordered K-quants and Q8_0 on int8 DPAS/ESIMD ([PR #29864](https://github.com/ggml-org/llama.cpp/pull/29864)).
- **SYCL `set_tensor_2d`** removes per-row upload fallback, cutting model-load overhead in `-sm tensor` ([PR #30358](https://github.com/ggml-org/llama.cpp/pull/30358)).
- **SYCL graph record/replay** (CUDA-graph port) merged, and MKL flash-attention host waits replaced with explicit dependencies (~4% on B70), unblocking graph use ([PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725), [PR #30684](https://github.com/ggml-org/llama.cpp/pull/30684)).
- **FP16 activations end-to-end** (`--act-type f16`) under review, gated by per-architecture support checks ([PR #31011](https://github.com/ggml-org/llama.cpp/pull/31011)).
- **glm5 input optimization** — avoids `sel_mask_2d`/`new_pool_flat` inputs ([PR #30932](https://github.com/ggml-org/llama.cpp/pull/30932)).

## 5. Stability & Regressions (ranked by severity)

1. **SYCL DeltaNet produces "token soup" on long prompts** (Qwen3.6/3.8, Nemotron; Arc Pro B70) — two open reports, dense models unaffected to 131K+ ([#29183](https://github.com/ggml-org/llama.cpp/issues/29183), [#29167](https://github.com/ggml-org/llama.cpp/issues/29167)). No fix PR yet; cornerstones hybrid-attention + Intel.
2. **SYCL F16 NaN output on dense Qwen3.8-27B Q4_K_M since #29107 (IQ3 reorder)**; disabling fused GEMM masks it ([#30892](https://github.com/ggml-org/llama.cpp/issues/30892)). Recent regression with a known workaround.
3. **Vulkan: Qwen3.8 DFlash/MTP spec decode emits OOB token `n_vocab` (248320)** on gfx1150 ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158)). Hard failure, AMD iGPU.
4. **CUDA/HIP flash attention corrupts long-context prefill on RDNA4 gfx1201, head_dim 256** — immediate high-confidence EOS ([#30884](https://github.com/ggml-org/llama.cpp/issues/30884)).
5. **Qwen3.8-27B hybrid Gated DeltaNet decode collapses ~25x past ~80K context** on RTX 4080 SUPER while prompt processing is fine ([#27623](https://github.com/ggml-org/llama.cpp/issues/27623)). Unresolved, likely architectural.
6. **CUDA MoE top-k NaN sanitization gap** — NaNs are cleaned before the selection bias is added, not after ([PR #31005](https://github.com/ggml-org/llama.cpp/pull/31005)).
7. **`--tensor-split` output degeneration on long-context MoE** ([#28185](https://github.com/ggml-org/llama.cpp/issues/28185), closed) and **memory leak with `-sm tensor` on dual B70 SYCL** ([#27845](https://github.com/ggml-org/llama.cpp/issues/27845), closed).
8. **Security: instruction injection via WebUI `?q=` query parameter** — still open ([#25790](https://github.com/ggml-org/llama.cpp/issues/25790)).
9. **Regressions closed today:** llama_detokenize spacing bug for Gemma 4-style vocabs ([#30905](https://github.com/ggml-org/llama.cpp/issues/30905)), Nemotron tokenizer mishandling ([#30894](https://github.com/ggml-org/llama.cpp/issues/30894)), non-contiguous SYCL CONV_2D wrong results ([#30363](https://github.com/ggml-org/llama.cpp/pull/30363)).

## 6. What This Means for Application Developers

- **Intel Arc / SYCL operators:** be selective with hybrid-attention models at long context. Dense Qwen3.8 works to 131K+, but Gated DeltaNet variants are actively broken on SYCL (#29183, #29167) and dense Q4_K_M has an F16 NaN regression since #29107 (#30892) — pin a known-good build or disable fused GEMM. The upside is real, though: +19% prompt eval on tensor-parallel B70s makes multi-GPU Arc serving genuinely competitive.
- **MoE self-hosters:** the new `--moe-cache-cpu-share` gives you a tunable CPU-spill knob for expert cache, which is a better answer to the recurring "expert cache" feature requests (#20757, #29949) than external caching layers. Pair with the `kq_mask`-free QSA paths (#30965, #31009) to free 2–4 GB of VRAM for experts at 4K–8K ub.
- **Rerank and realtime-audio API users:** two server-side semantic changes landed today — rerank placeholder handling (#30864) and realtime `complete` firing on committed-audio drain rather than stream dryness (#30994). Retest streaming audio pipelines and rerank post-processing.
- **Agent/WebUI deployments:** the open instruction-injection issue in the WebUI query parameter (#25790) means untrusted URL input can influence prompts. Sanitize at your reverse proxy until upstream addresses it.
- **Speculative decoding on AMD:** avoid DFlash/MTP with Qwen3.8 on Vulkan gfx1150 and flash attention on RDNA4 with head_dim 256 (#28158, #30884) — both produce silent garbage or premature EOS rather than explicit errors, which is the worst failure mode for automated pipelines.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-10-23

## 1. Today's Highlights

No new releases landed in the last 24 hours, but the issue tracker is dominated by two serious cloud-side reliability problems: a Pro-tier account reporting a 95% failure rate across all cloud models ([#15453](https://github.com/ollama/ollama/issues/15453)) and ongoing generation degeneration on `glm-5.3-flash:cloud` ([#18980](https://github.com/ollama/ollama/issues/18980)). On the engineering side, activity is concentrated in MLX backend work (YaRN scaling, Nemotron 3.5 Bolt) and a batch of parser/streaming correctness fixes for OpenAI- and Anthropic-compatible endpoints.

---

## 2. Releases & Breaking Changes

**No new releases in the last 24h.**

One behavioral change is landing in PR form that developers should be aware of:

- **Explicit empty system prompts will be honored** — `SYSTEM ""` in a Modelfile will clear the base model's system prompt instead of silently inheriting it. Semantics become: omitted → inherit, non-empty → replace, empty → clear. ([#18990](https://github.com/ollama/ollama/pull/18990))

---

## 3. New Model & Hardware Support

All items below are in-progress PRs, not yet released:

- **Nemotron 3.5 Bolt 74B-A9B (MLX)** — Adds per-layer expert configs, LiLiCorr speculative decoding via the DFlash runner, prequantized affine 3-bit import, and mixed-precision expert stacking. ([#19229](https://github.com/ollama/ollama/pull/19229))
- **YaRN RoPE scaling for Qwen3 / Qwen3.5 (MLX)** — Honors explicit RoPE scaling metadata for text and mRoPE, preserving non-rotary dimensions. ([#19231](https://github.com/ollama/ollama/pull/19231))
- **Gradium Phonon GA checkpoints** — Replaces the prerelease checkpoint path with the GA format, adds default-voice import and speech conditioning; requires Ollama ≥ 0.40.9. ([#19227](https://github.com/ollama/ollama/pull/19227))
- **GB10 (DGX Spark / Asus Ascent GX10) documented as supported hardware.** ([#13987](https://github.com/ollama/ollama/pull/13987))

---

## 4. Performance & Optimization

No landed throughput or latency work today. Relevant in-flight items:

- **`num_predict == -2` for dynamic token limits** — Mirrors llama.cpp behavior to fill the context buffer instead of forcing a static cap or unbounded generation. Useful for long-output batch jobs. ([#9547](https://github.com/ollama/ollama/pull/9547))
- **KV cache type settable from Modelfile** (feature request, open) — Currently only `KV_CACHE_TYPE` env var controls this; the request is to allow per-model `q8_0` etc., which matters for fitting ~30B models on constrained VRAM. ([#16245](https://github.com/ollama/ollama/issues/16245))
- **Pluggable KV connector framework** (proposal) — Scoped initially as a lifecycle framework to enable external KV backends such as LMCache. ([#17696](https://github.com/ollama/ollama/issues/17696))
- **Grok + KV cache quantization crash** — Flash attention is now forced off for Grok in line with llama.cpp, preventing runner crashes when KV cache quantization is enabled. ([#15050](https://github.com/ollama/ollama/pull/15050))

---

## 5. Stability & Regressions

Ranked by severity:

**Critical — Cloud**
- **Ollama Cloud Pro: ~95% failure rate across all cloud models** — Paid Pro subscriber reports essentially unusable service across `glm-5.1`, `kimi-k2.5`, `qwen3.5`, `deepseek-v3.2` cloud endpoints. 55 comments, 22 👍 — this is the highest-engagement issue in the window. No linked fix PR. ([#15453](https://github.com/ollama/ollama/issues/15453))

**High — Local generation correctness**
- **Massive degeneration on `glm-5.3-flash:cloud` since 10-12** — 5–8% of requests fail with severe output degeneration; reporter's own debugging hints at a host-side data-area fault on "cluster 829." 31 comments. No fix PR. ([#18980](https://github.com/ollama/ollama/issues/18980))

**High — API compatibility**
- **`/v1/responses` streams close mid-reasoning with no terminal event** (closed) — Clients saw silent EOF during reasoning streams on `nemotron-3-super:120b`. Fix PR detects in-band generation errors and emits a single `response.failed`, preserving HTTP 200 semantics. ([#17118](https://github.com/ollama/ollama/issues/17118) → [#19225](https://github.com/ollama/ollama/pull/19225))
- **`mistral-large-4` rejects `role: "developer"` with HTTP 400** — Breaks Codex clients that send developer-role instructions. Workaround: rewrite role to `system`. Related PR generalizes developer-instruction handling across renderers. ([#19021](https://github.com/ollama/ollama/issues/19021) → [#19199](https://github.com/ollama/ollama/pull/19199), [#19230](https://github.com/ollama/ollama/pull/19230))
- **Gemma 4 thinking cannot be reliably disabled via OpenAI-compatible API** — Extended reasoning causes significant latency in Aider auto-complete flows on `gemma4:12b-mlx`. ([#19217](https://github.com/ollama/ollama/issues/19217))

**Medium — Tool calling / parsing**
- **Literal `</function>` inside tool arguments breaks XML decoding** and aborts the call. Fix tracks parameter nesting to escape closing tags as data. ([#19228](https://github.com/ollama/ollama/pull/19228))
- **Gemma 4 complete tool calls dropped when followed by trailing noise** (e.g. `$$`). Fix recovers the complete object using the JSON decoder's boundary. ([#19226](https://github.com/ollama/ollama/pull/19226))
- **Context truncation can drop the last user message** when it's followed by tool calls — `chatPrompt()` preserves the last message regardless of type. Fix preserves the last *user* message. ([#19058](https://github.com/ollama/ollama/pull/19058))

**Medium — Reporting / config**
- **`OLLAMA_CONTEXT_LENGTH` not reflected in `/api/show` or `/api/tags`** — Models report native context window even when the effective available context is lower, misleading clients that size prompts from these values. ([#18995](https://github.com/ollama/ollama/issues/18995))

**Medium — Windows app**
- **Desktop 0.33.1 silently fails to launch built-in server** — `server.log` stays 0 bytes, no listener; manual `ollama serve` works. Fix PR logs the previously-swallowed `osrv.Run` error. ([#18061](https://github.com/ollama/ollama/issues/18061) → [#19179](https://github.com/ollama/ollama/pull/19179))

**Low — Security / hygiene (both closed)**
- **36 CVEs in the Ollama Go binary** (1 critical, 11 high), largely from the Go toolchain and vendored deps. ([#16033](https://github.com/ollama/ollama/issues/16033), [#19162](https://github.com/ollama/ollama/issues/19162))

**Closed / fixed**
- Intermittent "model not found" errors caused by `getExistingName` failing to track canonicalized name parts. ([#18438](https://github.com/ollama/ollama/pull/18438))
- Anthropic web search failing on follow-up after thinking settings were relaxed on the initial request. ([#19098](https://github.com/ollama/ollama/pull/19098))
- Launchers now receive full cloud model metadata — context windows, thinking levels, capabilities. Notably fixes Codex falling back to 128k for untabled models (e.g. `glm-5.2` now correctly reports 1,048,576). ([#19223](https://github.com/ollama/ollama/pull/19223))

---

## 6. What This Means for Application Developers

- **Treat cloud endpoints as unreliable right now.** If you depend on Ollama Cloud Pro in production, you need a fallback path — either a local model or a secondary provider. The 95%-failure report is a paid-plan issue with no posted fix, and the `glm-5.3-flash` degeneration is intermittent (~5–8%), which is worse than a hard failure because it silently corrupts output.
- **Don't trust context length from `/api/show`.** Until [#18995](https://github.com/ollama/ollama/issues/18995) is resolved, models report native context even when `OLLAMA_CONTEXT_LENGTH` caps the effective window. Compute your own budget from your environment config rather than from the API response.
- **`role: "developer"` is not yet portable.** If you're building against the `/v1/responses` endpoint with Codex-style clients, normalize developer messages to `system` until [#19199](https://github.com/ollama/ollama/pull/19199) lands, and be aware some cloud models (notably `mistral-large-4`) reject it outright.
- **Streaming error handling needs a timeout + terminal-event check.** If you rely on `/v1/responses` streaming, don't assume a clean EOF means success. The fix in [#19225](https://github.com/ollama/ollama/pull/19225) introduces `response.failed`, but until you're on a build with it, wrap streams with an idle timeout and validate that a terminal event was actually received.
- **Tool-call parsing is getting more robust, but plan around known gaps.** Literal closing tags inside arguments and trailing noise after valid calls currently drop calls on Qwen3-Coder and Gemma 4 respectively. If you're doing agentic work on those models, add output validation and retry logic until [#19228](https://github.com/ollama/ollama/pull/19228) and [#19226](https://github.com/ollama/ollama/pull/19226) ship.
- **Empty `SYSTEM ""` semantics are changing.** If any of your Modelfiles relied on the current behavior of retaining the base model's prompt despite an explicitly empty `SYSTEM` directive, audit them before upgrading past [#18990](https://github.com/ollama/ollama/pull/18990).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-10-23

## Today's Highlights
The dominant story remains the **v1.107.0 supply-chain compromise** (issue #47826): PyPI has removed the release and Docker `latest`/`main-stable` tags have been re-pointed, but remediation work is still landing — a backport request for the eMudhra root-CA fix to `stable/1.106.x` (#47904) and a bundled-CA/Prisma-compat fix PR (#47969) are both active. Alongside the security work, today's PR queue is heavy on provider and adapter polish (Speechify TTS, Gemini context-cache cost accounting, Vertex Model Garden header forwarding, SAP streaming tool-call fix). No new releases were published in the last 24h.

## Releases & Breaking Changes
No new releases in the last 24h. Operational notes from in-flight work:
- **Docker tag trust:** if you pin `latest`/`main-stable`, re-pull — the stealer image was yanked but cached layers may persist. See #47826.
- **`stable/1.106.x` CA roots:** 1.106.x images still trust `emSign ECC Root CA - G3`; backport of #47670 requested in #47904.
- **System One question cap removed** (#47985): batches >128 named questions now pass through the shared validator.

## New Model & Hardware Support
- **Speechify TTS** (`speechify/`) added for `/v1/audio/speech` with `simba-3.5`, `simba-3.2`, `simba-3.0` — PR #47990.
- **TopxAI** registered as a JSON-configured OpenAI-compatible provider (Chat Completions + Responses, 10 models) — PR #41919.
- **FlexAI** OpenAI-compatible provider registration (Token Service) — PR #35770.
- **JevRank / Perplexity + Jev decision models** wired through the rerank interface — PR #47972.
- **Nano-Gpt** requested for the UI provider list (already documented, not selectable) — issue #34499.
- **Community model/provider requests** continue in the pinned thread — issue #18686.

## Performance & Optimization
- **Gemini context-cache storage costs** now accounted per-token-hour; cached token counts and cache lifetime recorded on spend rows — PR #47989.
- **Rerank cost fidelity:** provider-reported cost now used instead of hardcoded $0 — PR #47843.
- **Latency-based routing** still degrades to random weighted selection under concurrency due to a lost-update race in `async_log_success_event` (16× Anthropic + 4× OpenAI keys) — issue #24720, no fix PR.
- **Unbounded upstream error-body ingestion** can stall the event loop on large (114 MB observed) error responses — issue #34031, no fix PR.
- **Retry-After ignored** for multi-deployment model groups sharing a rate-limited upstream — issue #34399, no fix PR.

## Stability & Regressions
Ranked by severity:

1. **CRITICAL — Supply-chain compromise of v1.107.0** (#47826): `cook.pth` credential stealer + `sitecustomize` RCE loader, built from lookalike repo `Berri-AI/litellm`. PyPI removed; Docker tags yanked. Remediation PRs #47904, #47969 in flight. **Anyone who ran 1.107.0 must rotate credentials.**
2. **HIGH — Team deletion leaves keys auth-valid** (#34217): `POST /team/delete` doesn't evict virtual keys from the auth cache, unlike `/key/delete`. No fix PR.
3. **HIGH — All keys fail when Postgres `max_connections` exhausted** in multi-worker deploys (#34479). No fix PR.
4. **HIGH — Transient Postgres/HAProxy outage → spurious "Invalid model name"** for valid models (#26237). No fix PR.
5. **MEDIUM — Cache-hit token semantics** (#39057): `spend=0` but token columns replay original usage — ambiguity for downstream reporting.
6. **MEDIUM — `token_counter` rejects `detail: "original"`** (#47327) → ERROR logs and skipped context-window checks.
7. **MEDIUM — PII mask bypass on image generation** (#46482): pre-call Presidio MASK redacted chat but not image prompts — fix PR open.
8. **MEDIUM — Vertex Anthropic `response_format` + `thinking` 400** (#26334); Claude Code + Foundry `reasoning.effort`/Pydantic errors (#27091).
9. **MEDIUM — Bedrock SigV4 stale-header replay on retry** (#27513).
10. **LOW–MEDIUM — Claude Code / Bedrock `websearch_interception` never fires** (#26252); `complexity_router` rejects `thinking.type=adaptive` (#26224); `auto_router` metadata leakage to strict `/responses` (#26241).
11. **Fixes in flight:** SAP streaming tool-call `ValidationError` (#46459), Gemini `reasoning_effort` xhigh/max clamp (#46514), malformed-completion 400s (#47986), Anthropic `null stop_sequence` (#47987), `search_result` token counting (#47983), Vertex Model Garden header forwarding (#47984), case-insensitive `User-Agent` lookup (#41012).

## What This Means for Application Developers
- **Rotate credentials now** if you deployed 1.107.0 from PyPI or Docker — assume `cook.pth` and `sitecustomize` executed. Move back to a pinned `stable/*` tag and re-verify image digests.
- **Don't build on Docker `latest`** for this project; pin exact digests. The tag-flip during the incident is itself a supply-chain risk signal.
- **Audit team-deletion flows** (#34217): if you revoke at the team level, keys may remain valid from cache — also delete individual keys until fixed.
- **Size your Postgres pool and set `Retry-After`-aware client backoff yourself** — the router won't do it for multi-deployment groups (#34399) and pool exhaustion cascades to total key failure (#34479).
- **If you route Claude Code / Anthropic Messages to Bedrock or Foundry**, several adapters are still rough (websearch, adaptive thinking, effort params) — expect to drop or proxy these params manually until the corresponding PRs land.
- **Cost reporting is improving but not uniform**: Gemini cache storage and rerank provider costs were previously undercounted; if you bill internally off `spend_logs`, revisit historical reconciliation and the cache-hit semantics question in #39057 before adopting proxy response caching as a billing primitive.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-10-23

## 1. Today's Highlights

No new releases today, but 31 issues and 20 top PRs saw activity, with a heavy concentration in Unsloth Studio/Desktop — notably GPU memory governance for XPU/MPS, MoE hot/cold expert splitting, and a cluster-serving PR that pairs home-network machines over mutual-TLS RPC. A wave of correctness fixes landed for diffusion (SDXL Hires fix, Z-Image CFG split, Wan residency), GRPO/vLLM weight syncing on older TRL, and safetensors loading on Windows.

## 2. Releases & Breaking Changes

No new releases in the last 24h. Two config/compatibility notes worth tracking:

- **Updater now pins matched `unsloth` + `unsloth-zoo` pairs** when the index lags, preventing installs that resolve to incompatible zoo versions ([#14834](https://github.com/unslothai/unsloth/pull/14834)).
- **Prequant cache etag resolution changed** to follow the shared Hub blob store introduced in `huggingface_hub>=1.32` (Xet layout); older caches may behave differently until invalidated ([#14819](https://github.com/unslothai/unsloth/pull/14819)).

## 3. New Model & Hardware Support

- **MoE hot/cold expert split across GPU and CPU** — feature request for automatic placement of hot experts on GPU and cold experts on CPU, addressing memory pressure for newer MoE models ([#14484](https://github.com/unslothai/unsloth/issues/14484)).
- **DeepSeek-V4.1-Flash GGUF blocked** — `deepseek41-dspark` architecture unrecognized by the bundled llama.cpp; workarounds in progress via `--fit-target` DSpark sidecar fix ([#14695](https://github.com/unslothai/unsloth/issues/14695), [#14431](https://github.com/unslothai/unsloth/pull/14431)).
- **Home-network RPC clustering** — pair machines once, then split a GGUF across them over mTLS via llama.cpp RPC; no accounts or internet required ([#14274](https://github.com/unslothai/unsloth/pull/14274)).
- **DGX Spark two-node clustering** — ConnectX-7 200GbE pipeline training plus diagnostics, measured on real GB10/sm_121a hardware ([#10280](https://github.com/unslothai/unsloth/pull/10280)).
- **OmniVoice LoRA/full finetune + inference** requested for UI integration ([#14660](https://github.com/unslothai/unsloth/issues/14660)).
- **Qwen3.5 GatedDeltaNet context parallel** still unsupported (recurrent conv + gated delta rule prevents FSDP2 sharding) ([#12051](https://github.com/unslothai/unsloth/issues/12051)).

## 4. Performance & Optimization

- **Windows safetensors pread path** for transformers 5.0–5.16 avoids commit-limit exhaustion and OS error 1455 during shard loads ([#14856](https://github.com/unslothai/unsloth/pull/14856)).
- **Z-Image CFG split** now only arms when the denoiser is compiled or replaying graphs, avoiding wasted split steps in eager/off tiers ([#14868](https://github.com/unslothai/unsloth/pull/14868)).
- **CFG-parallel weight probe** fixed to sample inside large inference tensors rather than overshooting the buffer ([#14844](https://github.com/unslothai/unsloth/pull/14844)).
- **Wan pipeline residency** now records request peaks when `transformer_2` is an empty slot (Wan2.1 / Wan2.2-TI2V-5B), enabling measured residency streaming ([#14864](https://github.com/unslothai/unsloth/pull/14864)).
- **VRAM budget floor of 0%** requested for multi-GPU layer spreading to force offload while preserving headroom ([#13598](https://github.com/unslothai/unsloth/issues/13598)).
- **XPU/MPS memory cap** for training plus honoring the VRAM budget for image generation remains open ([#8178](https://github.com/unslothai/unsloth/issues/8178)).

## 5. Stability & Regressions

Ranked by severity:

1. **GRPO rollout correctness (high)** — On TRL 0.22–0.27 with `use_vllm=True, fast_inference=False`, LoRA weights were never synced to vLLM, so every rollout used initial weights for the entire run. Fix PR open, also refuses quantized bases ([#14831](https://github.com/unslothai/unsloth/pull/14831)).
2. **Windows GGUF load crash (high)** — Studio Web UI can crash the server instead of taking the low-memory route; on Vulkan without a device, loads hang 30+ min. PR allows CPU fallback when Vulkan hangs or has no device ([#14513](https://github.com/unslothai/unsloth/issues/14513), [#14521](https://github.com/unslothai/unsloth/pull/14521)).
3. **Metal OOM on DeepSeek-V4.1-Flash (high)** — `kIOGPUCommandBufferCallbackErrorOutOfMemory` on prefill with DSpark sidecar and `--fit on`; server then rejects all requests. Fix PR reserves sidecar in `--fit-target` and recovers ([#14431](https://github.com/unslothai/unsloth/pull/14431)).
4. **SDXL Hires fix fails under CPU offload (medium)** — VAE latent encode ran on the wrong device; PR moves encode to where the offloaded VAE computes ([#14851](https://github.com/unslothai/unsloth/pull/14851)).
5. **SDXL Hires latent upscale decoded to PIL then re-encoded (medium)** — refactor interpolates latents directly, matching ComfyUI LatentUpscale ([#14863](https://github.com/unslothai/unsloth/pull/14863)).
6. **Attachments unreadable after auto-compaction (medium)** — images/PDFs become unrecoverable and `search_conversation` is never invoked ([#14708](https://github.com/unslothai/unsloth/issues/14708)).
7. **CPU conversation-archive embeddings stall** — long tool-heavy chats spend minutes in CPU embedding before llama.cpp receives inference; Stop does not cancel ([#14519](https://github.com/unslothai/unsloth/issues/14519)).
8. **Pre-commit.ci cost (medium)** — `scripts/enforce_kwargs_spacing.py` is highly unoptimized and stresses shared CI ([#14174](https://github.com/unslothai/unsloth/issues/14174)).
9. **Security audit noise (low)** — pandas 3.1.0's new `find_stack_level` test trips the marshal/exec scanner as HIGH on every PR; baseline PR up ([#14870](https://github.com/unslothai/unsloth/pull/14870)).
10. **Intel XPU LoRA inference on Windows** — mixed GNU/MSVC linker args break build ([#14807](https://github.com/unslothai/unsloth/issues/14807)).
11. **Lemonade / FastFlowLM stopped working** after a fresh Ubuntu install ([#14650](https://github.com/unslothai/unsloth/issues/14650)).

Recently closed: multi-account model sync ([#12365](https://github.com/unslothai/unsloth/issues/12365)), message editing ([#13938](https://github.com/unslothai/unsloth/issues/13938)), Qwen3-ASR language ignoring ([#14547](https://github.com/unslothai/unsloth/issues/14547)).

## 6. What This Means for Application Developers

- **If you run GRPO with vLLM on TRL < 0.28, upgrade or hold for #14831** — training appears to run but rollouts are silently stale, which invalidates reward signal and checkpoints.
- **Windows safetensors loads are now more robust** on transformers 5.x; expect fewer OOM-of-pagefile failures after #14856 lands.
- **Local multi-machine serving is becoming first-class** (home-network mTLS RPC in #14274, DGX Spark clustering in #10280) — viable path for teams without datacenter interconnects, but requires matched Unsloth builds via the pair-pinned updater (#14834).
- **MoE memory governance is the emerging pain point** — hot/cold expert splitting (#14484) and XPU/MPS VRAM caps (#8178) will matter most for teams running large MoE on consumer or workstation GPUs.
- **Studio UX debt** (preset persistence #14603, tool-approval notifications #14877, install-training CTA #14861, verbose UI #14582) is actively being closed — agent builders should expect faster iteration on approval flows and model-state restore.
- **Custom chat templates >64KB and remote-provider custom headers** are open gaps if your deployment depends on bespoke Jinja or LiteLLM-style routing ([#14841](https://github.com/unslothai/unsloth/issues/14841), [#14811](https://github.com/unslothai/unsloth/issues/14811)).

</details>