# AI Infrastructure Digest 2026-10-23

> Generated: 2026-10-23 05:49 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Infrastructure Ecosystem
**Digest date: 2026-10-23 | Projects: vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth**

---

## 1. Ecosystem Overview

The ecosystem is in a **hardening phase**, not a feature-expansion one: every project in this snapshot is dominated by correctness, security, and stability work rather than headline releases. Two incidents set the tone — LiteLLM's **supply-chain compromise of 1.107.0** and vLLM's **silent KV corruption under PD disaggregation** — both of which are data-integrity/security-class failures rather than performance regressions. Simultaneously, the frontier is bifurcating by hardware: ROCm (MI3xx), Intel XPU/SYCL, Qualcomm Hexagon, T-Head SAIL, and consumer Adreno/NPU lanes all saw bring-up work today, while CUDA on Hopper/Blackwell absorbed most optimization attention. The most active architectural thread across vLLM, SGLang, and llama.cpp is **long-context hybrid models (Gated DeltaNet / Qwen3.8-class)**, which are showing production-unsafe decode collapse at 80K+ tokens on multiple backends.

---

## 2. Activity Comparison

| Project | Issues (active, last 24h) | PRs (open/merged, last 24h) | Releases | Headline Risk Class |
|---|---|---|---|---|
| **vLLM** | ~6 high-severity surfaced | Multiple (Disagg, ROCm, MoE, spec-decode) | None | **Correctness / data isolation** (KV crosstalk) |
| **SGLang** | 9 ranked regressions + CI tracker (123 comments) | Multiple (SAIL, XPU, MoE, diffusion) | None | **Correctness + CI instability** |
| **llama.cpp** | ~10 ranked regressions | ~15+ PRs; 10 builds b11815–b11829 | **10 builds** | **Long-context decode collapse + RPC security** |
| **Ollama** | 12 ranked (1 severe, 1 high) | Several (MLX, tool-calling, streaming) | None | **Cloud Pro reliability (95% fail)** |
| **LiteLLM** | 14 ranked (1 CRITICAL) | Large (431-file typing cleanup, proxy fixes) | None (backport pending) | **Supply-chain compromise** |
| **Unsloth** | ~13 ranked | ~13 PRs (FSDP2, ROCm, Studio) | None | **Silent CPU fallback / FSDP2 4-bit** |

**Observation:** Release velocity is inversely correlated with layer — llama.cpp (local runtime, fastest iteration cadence) shipped 10 builds; the serving engines and gateway shipped zero. Stability burden scales with blast radius: LiteLLM and vLLM carry the highest-severity issues because they sit closest to credentials and inter-request data.

---

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek V4.1-Flash** | ✅ ROCm monokernel; ⚠️ SM8x gap (#50576) | ✅ MXFP8 path | ✗ (arch unrecognized in Studio GGUF) | — | ✗ (load fail) |
| **GLM-5.x / 5.3-Flash** | Perf tracker only | ✅ Hopper tracker + EAGLE fix | ✅ QSA VRAM savings | ✅ (harness metadata) | — |
| **Kimi-K3** | ✅ Vision tower + MegaMoE on ROCm | ⚠️ DCP a2a garbled (workaround) | — | ✅ cloud | — |
| **Qwen3.8 / 3.5** | Trackers open | — | ⚠️ Long-context collapse | ✅ YaRN (MLX) | ⚠️ FSDP2 sharding gap |
| **Nemotron 3.5 Bolt 74B-A9B** | — | — | ✅ GQA/tokenizer fixed | ✅ MLX (new) | — |
| **MiniCPM-OCR 1.0** | — | — | ✅ mtmd | — | — |
| **MiniMax-M3.1-Flash** | ✅ MI355X PD recipe | — | — | — | — |
| **T-Head SAIL / Zhenwu** | — | ✅ **First kernel PR** | — | — | — |
| **Muse Spark / SANA-Sprint** | — | Roadmap / request | — | — | — |
| **OmniVoice** | — | — | — | — | Feature request |

**Who's ahead:**
- **vLLM** leads on **AMD ROCm depth** (Kimi-K3, MiniMax, DeepSeek monokernels) and **speculative decoding extensibility** (out-of-tree draft registration).
- **SGLang** leads on **first-mover hardware bring-up** (T-Head SAIL, Intel XPU SYCL indexer) and **Muse Spark Day-0 pipeline**.
- **llama.cpp** leads on **breadth of quantized local support** and fastest model-adoption cadence (MiniCPM-OCR, Nemotron, GLM-5 QSA).
- **Ollama** leads on **MLX-native long-context** (YaRN for Qwen3) and harness-aware cloud metadata.
- **Gap of the day:** A100/A800/RTX 30xx (SM8x) remains **blocked on DeepSeek-V4-Flash** with 118 comment volume and no landed path — a meaningful capacity-planning constraint.

---

## 4. Performance Frontier

Effort is **unevenly distributed across five fronts**:

**KV Cache (highest intensity)**
- vLLM: NVFP4 KV at head_dim 512 (Gemma 4), Kimi-K2.x MLA quantization, context-length-aware spec scheduling (#48627)
- SGLang: NVFP4 + spec decode **incompatible** (#36010); KVShard for MTP (#40929); HiCache host-tier collapse on hybrid GDN (#45400)
- Common theme: **quantized KV caches are colliding with speculative decoding and prefix caching** — the three optimizations are not yet composable.

**Quantization**
- llama.cpp: new `GGML_TYPE_BF16X` (11.5 bpw near-lossless); UE4M3 encoder fix
- vLLM: block Hadamard input rotation for MXFP4; Quark online-rotation
- SGLang: MXFP8 fused producer path into breakable prefill graphs
- Unsloth: NVFP4 token over-match bug (Studio); FSDP2 4-bit merge repairs

**Distributed / Disaggregated Serving**
- vLLM: **NIXL/PD is the risk epicenter** — KV lease expiry (#61229) and prefix-cache crosstalk (#61160)
- llama.cpp: SYCL tensor-parallel comms **+19% prompt-eval** (dual Arc Pro B70); SYCL graph replay
- SGLang: LTX-2 refiner sharding; DCP a2a NCCL graph registration issue on GB300

**Kernels**
- vLLM: DeepSeek-V4.1 sparse prefill sentinel fix (−workspace memset); Engram peer-HBM reads
- SGLang: QSA prefill gather; MoE workspace preservation stack (5 PRs)
- llama.cpp: AMD/NPU op fusion; RDNA4 split-K tuning

**Batching / Scheduling**
- vLLM: batch-invariance nondeterminism tracker (#27433); context-length-aware spec K-selection
- llama.cpp: **MoE expert offload** — two competing designs (GPU-LRU #27861 vs CPU-share #30966)
- SGLang: priority preemption requeue determinism bug (#45812)

**Signal:** The frontier has moved from raw throughput to **composability of optimizations** — the hard problems are now "quantization × spec decode × prefix cache × disaggregation" interaction bugs, not single-technique wins.

---

## 5. Layer Positioning

| Layer | Projects | Role in Stack | Primary Optimizing For | Failure Blast Radius |
|---|---|---|---|---|
| **Serving engine** (datacenter) | **vLLM, SGLang** | High-throughput multi-tenant inference; PD disaggregation, MoE, TP/EP | Tokens/sec/GPU, TTFT, cross-request isolation | **High** — inter-request contamination is a security event |
| **Local runtime** (edge/desktop) | **llama.cpp, Ollama** | Single-user / small-fleet inference on consumer + accelerator silicon | Model breadth, quant flexibility, cold-start | **Low–Medium** — but RPC hardening (llama.cpp) is pre-auth RCE |
| **Gateway / proxy** | **LiteLLM** | Multi-provider routing, auth, budgeting, observability | Provider normalization, rate-limit handling, cost accounting | **Critical** — supply-chain and credential scope |
| **Training / fine-tuning** | **Unsloth** | LoRA/QLoRA, FSDP2, merged checkpoint export, Studio UX | Memory efficiency, quantized training correctness | **Medium** — silent CPU fallback, corrupt 4-bit saves |

**Key architectural distinction:** vLLM and SGLang are **peers converging on the same feature set** (disaggregation, MoE, spec decode, quantized KV) — the differentiation is hardware strategy (ROCm-first vs CUDA-first) and CI maturity. llama.cpp and Ollama occupy adjacent rungs: llama.cpp is the **engine** (and increasingly a server), Ollama is the **productized wrapper** — but the Ollama digest shows the wrapper inheriting llama.cpp bugs (prompt cache, Windows TCP resets) that it cannot fix below its own API layer. LiteLLM and Unsloth sit on **opposite ends of the model lifecycle** and rarely compete.

---

## 6. Trend Signals

**1. Supply-chain risk has become an inference-layer problem.**
LiteLLM 1.107.0's `cook.pth` stealer is the highest-severity item in the entire snapshot. Gateways are credential hubs; a compromised proxy image has broader blast radius than a compromised engine. **Action:** pin digests, verify images, rotate credentials for any environment that pulled `latest` during the window.

**2. Disaggregated serving is not production-ready for correctness-critical workloads.**
vLLM's NIXL KV lease expiry and PD prefix-cache crosstalk, plus SGLang's NVFP4+spec incompatibility and HiCache collapse, all point the same way: **disaggregation, prefix caching, and quantized KV caches have not been proven composable at scale.** Operators running deep long-context workloads should disable prefix caching under PD until fixes land.

**3. Long-context hybrid models (Gated DeltaNet lineage) are a systemic risk.**
Qwen3.8/3.5 and Nemotron show decode collapse at 80K+ on CUDA, "token soup" on SYCL, and garbage logits on RDNA4 Vulkan. This is not a single-vendor bug — it's an architectural maturity gap. **Agent developers building on large context windows should validate their specific backend+model+quant combination and pin builds.**

**4. Hardware diversity is real but tiered.**
ROCm (MI3xx) is becoming a first-class serving target in vLLM; Intel XPU/SYCL is maturing in llama.cpp and SGLang; Qualcomm, Adreno, and T-Head SAIL are bring-up stage. **CUDA still gets the fastest correctness fixes; non-CUDA lanes lag on CI coverage.**

**5. Speculative decoding is being productized.**
vLLM's out-of-tree plugin registration (#62962) and context-aware K-selection (#48627), plus llama.cpp/Unsloth's DFlash/MTP work, mean spec decode is shifting from research to configurable runtime. But it currently **conflicts with NVFP4 KV cache** (SGLang #36010) — pick one per deployment.

**6. MoE on consumer hardware is the hottest local frontier.**
Two competing llama.cpp PRs (GPU-LRU vs CPU-share expert offload) target the same bottleneck: decode bound by host RAM bandwidth. Expect a merge decision soon; benchmark both if you run `-ot ...exps=CPU`.

**7. Security hardening is landing in unexpected places.**
llama.cpp's RPC tensor-descriptor fixes (pre-auth arbitrary read/write) and WebUI query-param injection are the kind of issues that matter for anyone exposing local runtimes on untrusted networks — an increasingly common pattern in agent frameworks.

**What application developers should watch next:**
- **vLLM #61160 / #61229** (NIXL crosstalk) — the highest-priority correctness gate for any PD deployment
- **LiteLLM #47904** (1.106.x CA backport) — residual supply-chain exposure
- **SGLang #45367** (Kimi-K3 GB300 workaround) — set `NCCL_GRAPH_REGISTER=0` today
- **llama.cpp #27623 / #29167 / #29183** (Qwen3.8 long-context cluster) — the gating issues for any 100K+ agent workload
- **Unsloth #14933** (ROCm silent CPU fallback) — verify GPU engagement, don't trust the UI

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-23

## 1. Today's Highlights

No new releases landed in the last 24 hours, but activity remains very high across the ROCm, disaggregated-serving, and MoE kernel tracks. The most consequential items today are a pair of correctness bugs in NIXL/PD disaggregation around KV block lifecycle and prefix caching — one already showing up as cross-request "crosstalk" in production-style deployments ([#61229](https://github.com/vllm-project/vllm/issues/61229), [#61160](https://github.com/vllm-project/vllm/issues/61160)). On the active-work side, DSv4.1 sentinel handling in the sparse-prefill combine kernel is being fixed and re-landed ([#63264](https://github.com/vllm-project/vllm/pull/63264), [#60613](https://github.com/vllm-project/vllm/pull/60613)), and ROCm MI3xx recipes continue to expand (Kimi-K3 MegaMoE, MiniMax-M3.1-Flash PD, DeepSeek-V4.1 monokernel).

## 2. Releases & Breaking Changes

No releases in the last 24h. One behavior-affecting flag cleanup is in flight: [#61628](https://github.com/vllm-project/vllm/pull/61628) removes `VLLM_ROCM_AITER_MLA_DCP_VERIFY` and always selects the DCP multi-token verify kernel via the existing `auto` heuristic on ROCm MLA. Default behavior is unchanged; only explicit overrides of the old env var are affected.

## 3. New Model & Hardware Support

- **Ampere (SM8x) support for DeepSeek-V4-Flash / V4-Flash-0731** — long-running feature request ([#50576](https://github.com/vllm-project/vllm/issues/50576), 118 comments). Neither checkpoint currently runs on A100/A800 or RTX 30xx; this is the highest-traffic open capability gap.
- **Kimi-K3 Vision Tower on ROCm** — `torch.compile` + encoder CUDA graph capture (`cudagraph_mm_encoder`) for `MoonViT3dPretrainedModel`/`KimiK25MultiModalProjector` on MI300X/MI350X/MI355X ([#63086](https://github.com/vllm-project/vllm/pull/63086)).
- **Kimi-K3 MegaMoE on ROCm** — opt-in AITER MegaMoE path, TP8 A8W4 eager to start, on eight gfx950 GPUs ([#63273](https://github.com/vllm-project/vllm/pull/63273)).
- **MiniMax-M3.1-Flash recipe for MI355X** — PD cluster (1P1D, TP4 per role), BLHNC KV layout, NIXL with 4 threads, Quark MXFP4, mono decode ([#63257](https://github.com/vllm-project/vllm/pull/63257)).
- **NVFP4 KV cache at head_dim 512 (Gemma 4 global layers)** — via FlashInfer on SM100/SM103 (B200/B300); context attention materializes NVFP4 pages to FP8 ([#62117](https://github.com/vllm-project/vllm/pull/62117)).
- **Kimi-K2.5/K2.6 MLA quantization** — registers MLA attention with compressed-tensors KV-cache quantization and maps checkpoint q/k/v scales into nested MLA modules ([#63097](https://github.com/vllm-project/vllm/pull/63097)).
- **PARD-2 parallel draft models** — target-aligned parallel draft for speculative decoding on ModelRunnerV2 ([#49406](https://github.com/vllm-project/vllm/pull/49406)). Out-of-tree spec-decode registration via `vllm.general_plugins` also lands ([#62962](https://github.com/vllm-project/vllm/pull/62962)).
- **GLM-5.3 perf plan** ([#57406](https://github.com/vllm-project/vllm/issues/57406)) and **Qwen3.8-2.4T-A95B / Qwen3.8-Flash-Next MI355X trackers** ([#57149](https://github.com/vllm-project/vllm/issues/57149), [#59575](https://github.com/vllm-project/vllm/issues/59575)) remain open as optimization trackers.

## 4. Performance & Optimization

- **DeepSeek-V4.1 sparse prefill** — write `-1` sentinels into the combine kernel's workspace instead of a full-workspace memset, fixing stale indices and removing the memset cost ([#63264](https://github.com/vllm-project/vllm/pull/63264), stacked fix [#60613](https://github.com/vllm-project/vllm/pull/60613)).
- **DeepSeek-V4.1 Engram lookups** — read GPU Engram tables directly from peer HBM instead of DP `all_gather`/`all_to_all_single` collectives, targeting FULL CUDA graph decode ([#62091](https://github.com/vllm-project/vllm/pull/62091)).
- **DeepSeek-V4.1 on MI325X** — `--monokernel` enabled for the MI325X TP recipe; mono decode kernels run at TP4, decode up to 42 rows (7 requests × 5 DSpark drafts). MI300X unchanged ([#62713](https://github.com/vllm-project/vllm/pull/62713)).
- **Block Hadamard input rotation for linear layers** — online `mxfp4_hadamard32` and Quark online-rotation checkpoints, wrapping any linear method ([#62750](https://github.com/vllm-project/vllm/pull/62750)).
- **Batch invariance** — tracking issue continues to close remaining nondeterminism gaps ([#27433](https://github.com/vllm-project/vllm/issues/27433)).
- **GB10 weight-loading cost** — per-tensor H2D copies from safetensors mmap views identified as the default-path bottleneck on DGX Spark ([#58726](https://github.com/vllm-project/vllm/issues/58726)).
- **Observability RFC** for a coarse-grained per-request/per-iteration (engine-step) time tracker beyond PyTorch Profiler ([#39979](https://github.com/vllm-project/vllm/issues/39979)).
- **Context-length-aware speculative scheduling** — extend `num_speculative_tokens_per_batch_size` with an optional `(batch, ctx)` K-selection table, backward compatible ([#48627](https://github.com/vllm-project/vllm/issues/48627)).

## 5. Stability & Regressions

Ranked by severity; note whether a fix PR exists.

1. **Silent KV corruption in NixlConnector pull flow** ([#61229](https://github.com/vllm-project/vllm/issues/61229)) — producer releases KV blocks on `kv_lease` expiry while a remote READ is still in flight; decode then consumes overwritten KV. Data-integrity class, no fix PR linked yet. **Highest priority.**
2. **Cross-request context contamination in PD disaggregation with automatic prefix caching** ([#61160](https://github.com/vllm-project/vllm/issues/61160)) — responses intermittently contain content from other requests on DeepSeek-V4.1-Flash + NIXL; clean with `--no-enable-prefix-caching`. Scriptable reproducer on `/v1`. Correctness/security-relevant, no fix PR linked yet.
3. **DeepSeek-V4.1-Flash prefill NaN/garbage via stale sparse indices** ([#60613](https://github.com/vllm-project/vllm/pull/60613), [#63264](https://github.com/vllm-project/vllm/pull/63264)) — fix PRs open and close to landing.
4. **Qwen3.8-Flash-Next on GB10 truncates prompts past `indexer_budget` (~2048 tokens)** ([#62776](https://github.com/vllm-project/vllm/issues/62776)) — model behaves as if the prompt ended at ~2K tokens; not merely poor retrieval. Correctness-impacting on v0.32 nightly, no fix PR linked.
5. **PP2 tool calling garbled on GLM-5.2-FP8 DSA + chunked prefill, ROCm MI355X** ([#46262](https://github.com/vllm-project/vllm/issues/46262)) — PP1 works, PP2 garbles; 8× MI355X node.
6. **Gemma 4 fails to initialize with per-token-head KV cache quantization** ([#40388](https://github.com/vllm-project/vllm/issues/40388)) — init-time failure.
7. **Structured output broken with Qwen3 when `enable_thinking=False`** ([#18819](https://github.com/vllm-project/vllm/issues/18819)) — now closed/stale; 6 👍.

## 6. What This Means for Application Developers

- **Do not run PD-disaggregated NIXL with default prefix caching on DeepSeek-V4.1-Flash until #61160 and #61229 are resolved.** If you need disaggregation today, either disable prefix caching (`--no-enable-prefix-caching`) or pin to a commit before the lease-expiry change and audit your KV block release timing. Crosstalk across requests is a correctness and data-isolation issue, not just a perf concern.
- **A100/A800 and RTX 30xx users remain blocked on DeepSeek-V4-Flash.** Plan capacity around SM9x/SM10x or track #50576; there is no landed SM8x path as of today.
- **ROCm MI300X/MI325X/MI355X is becoming a first-class target.** Kimi-K3 vision compile, MegaMoE, DeepSeek-V4.1 monokernel, and MiniMax-M3.1-Flash PD recipes are all landing or in PR. If you run AMD, validate your model/quant combination against these recipes rather than assuming parity with CUDA defaults.
- **Out-of-tree spec-decode methods are now pluggable** ([#62962](https://github.com/vllm-project/vllm/pull/62962)) — if you maintain a custom draft/verify scheme, you no longer need a fork; register via `vllm.general_plugins` and select by name in `--speculative-config`.
- **Latency tuning is getting a new axis:** context-length-aware K selection for speculative decoding ([#48627](https://github.com/vllm-project/vllm/issues/48627)) will let you tune draft depth by both batch size and prompt length, useful for mixed long-context/short-chat fleets.
- **For DGX Spark / GB10 deployments:** weight-loading is currently a measurable startup cost ([#58726](https://github.com/vllm-project/vllm/issues/58726)) — budget cold-start time accordingly and watch for a fix.
- **Structured output + `enable_thinking=False`** on Qwen3 was broken historically ([#18819](https://github.com/vllm-project/vllm/issues/18819)); verify against your vLLM version if you disable thinking and rely on guided decoding.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-23

## 1. Today's Highlights

Activity is dominated by the GLM-5.3-Flash ramp-up (Hopper perf tracking, Blackwell speculative startup fixes) and a broadening hardware push: T-Head SAIL got its first attention-kernel PR, while XPU, AMD, and NPU lanes saw CI and feature work. Meanwhile, a cluster of correctness bugs surfaced around MoE routing / quantized-KV paths, and the flaky-CI tracker (#42752) has ballooned to 123 comments, signaling ongoing instability in NVIDIA PR test lanes.

## 2. Releases & Breaking Changes

None. No releases in the last 24h. No API/config breaking changes flagged today.

## 3. New Model & Hardware Support

- **T-Head SAIL (Zhenwu 810/810E/M890P)**: PR #45946 adds SAIL FA3 and FlashMLA attention support, refs roadmap #37519. First real kernel-level bring-up for this platform.
- **Intel XPU**: PR #35304 adds NomicBERT/ModernBERT embeddings and InternVL3_5 support; PR #45780 ports the DeepSeek mxfp4 indexer to SYCL kernels.
- **Diffusion — SANA-Sprint 0.6B**: Feature request #43671 for native support of the 1–4 step 1024px text-to-image model.
- **Muse Spark**: Roadmap #44678 tracks Day-0 support; merge order is set (#44664 → #44667) with a DeepGEMM dependency.
- **AMD CI**: PRs #45882 (build-only dispatch), #45869/#45870 (diffusion lane parallelism) improve ROCm coverage.

## 4. Performance & Optimization

- **GLM-5.3-Flash on Hopper (SM90)**: Tracking issue #45373 (part of Q4 roadmap #42473) collects kernel-optimization work.
- **QSA prefill indexer gather**: PR #45752 optimizes the prefill-side gather.
- **DeepSeek-V4 MXFP8**: PR #45980 extends the fused MXFP8 producer path into breakable prefill graphs, removing a separate bf16→MXFP8 quantization step at low concurrency.
- **MoE workspace/budget fixes**: PR stack #45681 / #45917 / #45462 / #45916 / #45915 preserves Marlin workspace, CUTLASS routing metadata, GGUF routing budgets, and MoE projection identity — reducing per-call allocations.
- **KVShard for MTP**: PR #40929 adds pool-level KV cache sharding for multi-token prediction.
- **LTX-2 diffusion**: PR #45965 shards stage-2 refiner across CFG ranks as Ulysses (previously one GPU idle on 2×H200 at 768×512×121).

## 5. Stability & Regressions

Ranked by severity:

1. **Kimi-K3 DCP a2a garbled decode on 2-node GB300** (#45367) — degenerates under CUDA graphs with NCCL graph registration; `NCCL_GRAPH_REGISTER=0` restores output. *Workaround exists.*
2. **GLM-5.3-Flash EAGLE illegal memory access on H20 TP8/EP8** (#45159) — crash in `run_eagle_verify` → `build_grammar_vocab_mask`. No fix PR noted.
3. **`flashinfer_mxfp4` silently computes GPT-OSS SwiGLU instead of SiTU on SM90** (#45755) — silent wrong results for Kimi-K3. Depends on open flashinfer#4209.
4. **`--enable-lmcache` + disabled radix cache crashes scheduler at first idle** (#45929, 0.5.22) — deterministic crash; affects embedding-mode models.
5. **NVFP4 KV cache + speculative decoding incompatible** (#36010) — `extend_prefix_lens_cpu is None` in dequant workspace. No fix PR.
6. **fa4 crashes at CUDA-graph capture on SM120 for GLM-5.3-Flash** (#42012) — hybrid extend reshape; triton is the only working backend.
7. **HiCache host-tier hits collapse on hybrid GDN models** (#45400) — host mamba pool exhausted while KV remains on host.
8. **Priority preemption requeue order differs across TP ranks** (#45812) — scheduler determinism bug.
9. **CI instability**: #42752 (123 comments) tracks flaky NVIDIA PR tests; AMD `test_deepseek_v4_flash_fp4` failing with ImportError (#45847).

## 6. What This Means for Application Developers

- **Avoid `--enable-lmcache` with radix cache disabled** on 0.5.22 — deterministic scheduler crash; track #45929.
- **NVFP4 KV cache and speculative decoding are mutually exclusive today** (#36010) — pick one for SM120/Blackwell deployments.
- **If you serve Kimi-K3 on GB300 with DCP a2a, set `NCCL_GRAPH_REGISTER=0`** as an immediate mitigation (#45367).
- **Mixed-precision MoE correctness is under active hardening** (PR stack around #45681); if you rely on LoRA + MoE or GGUF + MoE, expect correctness fixes landing that may change output numerics slightly.
- **Hopper users running GLM-5.3-Flash** should watch #45373 — perf work is queued but several correctness issues (#45159, #42012) remain open.
- **Hardware diversity is expanding** (SAIL, XPU, AMD, NPU) — if you're planning heterogeneous fleets, upstream support is maturing but CI coverage still lags CUDA lanes.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-23

## 1. Today's Highlights

A heavy release day (10 builds, b11815–b11829) with meaningful server work: the rerank endpoint now accepts typed (multimodal-aware) content, the realtime API correctly signals completion only after committed audio drains, and a rerank template placeholder bug was fixed. On the backend side, OpenCL gained depthwise conv2d (Adreno), SYCL got multi-column XMX refactoring, and MiniCPM-OCR 1.0 landed in mtmd. The most consequential open thread remains the Qwen3.8/Gated-DeltaNet long-context degradation cluster, now spanning SYCL, CUDA, and Vulkan backends.

## 2. Releases & Breaking Changes

Recent builds (macOS/iOS binary distribution now via [llama.app](https://llama.app)):

- **b11829** — server: substitute rerank placeholder from original template only. ([PR #30864](https://github.com/ggml-org/llama.cpp/pull/30864))
- **b11827** — opencl: add depthwise conv2d (Adreno). ([PR #30900](https://github.com/ggml-org/llama.cpp/pull/30900))
- **b11818** — server: typed content input for RERANK endpoint. ([PR #29625](https://github.com/ggml-org/llama.cpp/pull/29625)) — new request shape accepted; clients sending plain-string content remain compatible, but multimodal rerank input is now rejected when the model lacks a rerank chat template.
- **b11819** — nemotron: non-standard GQA, BPE tokenizer, domyn-small pre-type; `gguf-py` now writes Metaspace `prepend_scheme` as GGUF metadata and `vocab` parses it into an enum ([PR #23343](https://github.com/ggml-org/llama.cpp/pull/23343)). **Migration note:** converted Nemotron GGUFs should be re-converted to pick up correct metadata; older files are tagged `pixtral` and get the wrong pre-tokenizer ([issue #30894](https://github.com/ggml-org/llama.cpp/issues/30894)).

No hard API breakages; the only behavioral change worth flagging is the stricter rerank input validation.

## 3. New Model & Hardware Support

| Area | Change | Link |
|---|---|---|
| **MiniCPM-OCR 1.0** | mtmd support added | [b11826 / PR #30979](https://github.com/ggml-org/llama.cpp/pull/30979) |
| **Nemotron (3 / 3.5)** | Non-standard GQA, BPE tokenizer, domyn-small pre-type; GGUF metaspace metadata | [PR #23343](https://github.com/ggml-org/llama.cpp/pull/23343) |
| **GLM-5** | QSA layers optimized to avoid `sel_mask_2d` / `new_pool_flat` inputs; `glm5-next` PR drops `kq_mask` allocation for QSA attention, saving ~2 GB VRAM @ ub 4096 / ~4 GB @ ub 8192 | [b11823 / PR #30932](https://github.com/ggml-org/llama.cpp/pull/30932), [PR #31009](https://github.com/ggml-org/llama.cpp/pull/31009) |
| **Qwen4exp** | Fixed layer inputs for DFlash drafters (wide residual layout mismatch) | [b11822 / PR #30927](https://github.com/ggml-org/llama.cpp/pull/30927) |
| **OpenCL (Adreno)** | Depthwise conv2d; initial Q2_K support | [PR #30900](https://github.com/ggml-org/llama.cpp/pull/30900), [PR #30999](https://github.com/ggml-org/llama.cpp/pull/30999) |
| **SYCL / Intel XMX** | Multi-column (2–80 activation columns) `mul_mat_vec_q` for reordered K-quant and Q8_0 via int8 DPAS (ESIMD) | [b11821 / PR #29864](https://github.com/ggml-org/llama.cpp/pull/29864) |
| **Hexagon (Qualcomm NPU)** | `CONV2D` (f16/f32), `SGN`, `CEIL` ops; op-fusion refactoring | [PR #30995](https://github.com/ggml-org/llama.cpp/pull/30995), [PR #30346](https://github.com/ggml-org/llama.cpp/pull/30346), [PR #31006](https://github.com/ggml-org/llama.cpp/pull/31006) |
| **Quantization** | Proposed `GGML_TYPE_BF16X` (type 43), near-lossless bf16 recompression at 11.5 bpw, CPU + GPU | [PR #29896](https://github.com/ggml-org/llama.cpp/pull/29896) |

## 4. Performance & Optimization

- **SYCL tensor-parallel comms:** `ggml_sycl_comm_exchange()` rework yields **+16.7% to +20.6% prompt-eval t/s (mean ≈ +19%)** on dual Arc Pro B70 with `-sm tensor`, bringing it in line with `-sm layer` at zero PPL change. ([PR #30956](https://github.com/ggml-org/llama.cpp/pull/30956))
- **SYCL graph record/replay:** CUDA graph capture ported to SYCL (closed/merged-track). ([PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725))
- **MoE expert offload (in progress):** Two competing designs — a GPU-resident LRU cache for host-offloaded experts ([PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)) and a `llama_moe_cache` variant that executes missed experts on CPU with a tuning script (`--moe-cache-mib`, `--moe-cache-cpu-share`) ([PR #30966](https://github.com/ggml-org/llama.cpp/pull/30966)). Addresses the long-standing request in [issue #29949](https://github.com/ggml-org/llama.cpp/issues/29949).
- **RDNA3/4 Vulkan split-K:** large-tile (128×128) split-K tuning for prefill. ([PR #30280](https://github.com/ggml-org/llama.cpp/pull/30280))
- **FP16 activations:** New `--act-type {f32,f16}` (also `llama-bench -at`, `LLAMA_ARG_ACT_TYPE`) keeps activations F16 end-to-end — aimed at accelerators bottlenecked on activation bandwidth. ([PR #31011](https://github.com/ggml-org/llama.cpp/pull/31011))
- **RPC hardening:** Two PRs closing arbitrary read/write via crafted tensor descriptors in `GRAPH_COMPUTE` (unvalidated `view_offs`, null-buffer `deserialize_tensor` path). ([PR #31017](https://github.com/ggml-org/llama.cpp/pull/31017), [PR #31018](https://github.com/ggml-org/llama.cpp/pull/31018))

## 5. Stability & Regressions

Ranked by severity:

1. **SYCL F16 NaN on Qwen3.8-27B Q4_K_M** — since IQ3-code reorder #29107; fused GEMM off works around it. Arc Pro B70. ([#30892](https://github.com/ggml-org/llama.cpp/issues/30892))
2. **Qwen3.8-27B decode collapse ~25× past ~80K context** (hybrid Gated DeltaNet), prompt processing unaffected; reproduced on CUDA + WSL2, RTX 4080 SUPER. ([#27623](https://github.com/ggml-org/llama.cpp/issues/27623))
3. **Gated DeltaNet "token soup" on long prompts, SYCL** — affects Qwen3.6/3.8 and Nemotron; dense models fine to 131K+. ([#29183](https://github.com/ggml-org/llama.cpp/issues/29183), [#29167](https://github.com/ggml-org/llama.cpp/issues/29167))
4. **Vulkan Flash Attention: garbage logits / immediate EOS at long context** on gfx1201 (RDNA4), `head_dim` 256. ([#30884](https://github.com/ggml-org/llama.cpp/issues/30884))
5. **Qwen3.8 DFlash/MTP emits OOB token id == n_vocab (248320) on Vulkan** (gfx1150). ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158))
6. **Metal abort on MUL_MAT with BF16 src1** at K ≥ 64, batch > 8 (no BF16 `mul_mm` kernel). Regression from b11813-era master. ([#30973](https://github.com/ggml-org/llama.cpp/issues/30973))
7. **CUDA MMVQ fp16 overflow** in Q4_1/Q5_1/Q8_1 scale multiplication — fix PR open, multiply in fp32. ([#30950](https://github.com/ggml-org/llama.cpp/issues/30950) → [PR #31019](https://github.com/ggml-org/llama.cpp/pull/31019))
8. **UE4M3 encoder false saturation** for values ≥ 256 — fix PR open (RNE rounding + saturation bounds). ([#31010](https://github.com/ggml-org/llama.cpp/issues/31010) → [PR #31020](https://github.com/ggml-org/llama.cpp/pull/31020))
9. **Detokenizer inserts/removes spaces incorrectly** for Gemma 4-class vocabs (`x != y` → `x!= y`) — divergence from HF tokenizers. ([#30905](https://github.com/ggml-org/llama.cpp/issues/30905))
10. **RPC with two workers:** DeepSeek V4 output degenerates to repeated token after long prompt; slot stays corrupted. ([#30794](https://github.com/ggml-org/llama.cpp/issues/30794))

Fix PRs exist for items 7 and 8; items 1–6 are open investigations. Note also the open SYCL build fix for `mul_mat_uses_onednn` device argument ([PR #31014](https://github.com/ggml-org/llama.cpp/pull/31014)).

## 6. What This Means for Application Developers

- **Rerank is becoming a first-class multimodal endpoint.** Typed content input ([PR #29625](https://github.com/ggml-org/llama.cpp/pull/29625)) plus the template placeholder fix ([PR #30864](https://github.com/ggml-org/llama.cpp/pull/30864)) mean RAG rerankers can now mix text and images — but validate your model has a rerank chat template before sending multimodal payloads, or the server will reject the request.
- **Realtime/voice agents get a correct completion signal.** b11828's change ties "complete" to committed-audio drain rather than stream-dry timing, which removes a class of truncation/race bugs in streaming audio pipelines ([PR #30994](https://github.com/ggml-org/llama.cpp/pull/30994)).
- **MoE on consumer hardware is the most active frontier.** Both open MoE-cache PRs target the same pain point — decode bound by host RAM bandwidth when experts are offloaded. If you run `-ot ...exps=CPU` or `-ncmoe`, worth benchmarking both branches; the CPU-share variant adds tunable knobs ([PR #30966](https://github.com/ggml-org/llama.cpp/pull/30966)) while the GPU-LRU variant keeps copies inside the compute graph ([PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)).
- **Long-context hybrid models (Qwen3.8-class, Nemotron) are not yet safe for production at 100K+ tokens** on SYCL or RDNA4 Vulkan, and show a decode cliff on CUDA past ~80K. If your agent relies on large context windows, pin to a build you've validated and watch issues #27623, #29167, #29183.
- **Multi-GPU Intel Arc users get a free win** with SYCL `-sm tensor` prompt-eval (~19% faster, [PR #30956](https://github.com/ggml-org/llama.cpp/pull/30956)), and the new FP16-activation flag ([PR #31011](https://github.com/ggml-org/llama.cpp/pull/31011)) is worth testing for bandwidth-bound accelerators.
- **If you expose RPC workers to untrusted networks, upgrade now** — the tensor-descriptor hardening fixes are pre-auth arbitrary read/write ([PR #31017](https://github.com/ggml-org/llama.cpp/pull/31017), [PR #31018](https://github.com/ggml-org/llama.cpp/pull/31018)). Same caution applies to the long-open WebUI query-parameter injection report ([#25790](https://github.com/ggml-org/llama.cpp/issues/25790)).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-10-23

## 1. Today's Highlights

No new releases landed in the last 24h, but the issue and PR queues are active: a **severe Ollama Cloud Pro reliability incident** (#15453, 95% failure rate, 22 👍, 55 comments) continues to dominate attention, while a cluster of Windows networking regressions (#19139, #19113) and an AMD/Vulkan prompt-cache slowdown (#19201) point to stability gaps on the local side. On the engineering front, MLX expansion is the headline — PRs adding **Nemotron 3.5 Bolt 74B-A9B** (#19229) and **YaRN scaling for Qwen3/Qwen3.5** (#19231) both merged into review today.

---

## 2. Releases & Breaking Changes

No new releases published in the last 24h. However, two PRs in flight carry behavioral/API implications worth flagging ahead of the next version:

- **`num_predict == -2` for dynamic token limits** — PR [#9547](https://github.com/ollama/ollama/pull/9547) (long-open) would shadow llama.cpp behavior, letting generation fill the context buffer rather than being capped or infinite.
- **`SYSTEM ""` semantics** — PR [#18990](https://github.com/ollama/ollama/pull/18990) changes Modelfile create behavior so an explicitly empty system prompt truly clears the base model's prompt, rather than being silently ignored.
- **`typical_p` removed from Python API path** — Issue [#18480](https://github.com/ollama/ollama/issues/18480) (CLOSED) documents that clients calling via `ollama-python` now receive HTTP 400; migrate off this sampler.

---

## 3. New Model & Hardware Support

- **Nemotron 3.5 Bolt 74B-A9B (MLX)** — PR [#19229](https://github.com/ollama/ollama/pull/19229) adds per-layer expert configurations and LiLiCorr speculative decoding via the existing DFlash runner, plus prequantized affine 3-bit import with per-module quantization metadata and mixed-precision expert stacking.
- **YaRN RoPE scaling for Qwen3 / Qwen3.5 (MLX)** — PR [#19231](https://github.com/ollama/ollama/pull/19231) honors explicit RoPE scaling metadata (YaRN frequencies, amplitude scaling, mRoPE preservation). Fixes long-context extrapolation for Qwen3-lineage models.
- **Gemma 4 (MLX)** — Thinking mode reportedly cannot be reliably disabled via the OpenAI-compatible API in v0.40.6 (Issue [#19217](https://github.com/ollama/ollama/issues/19217)); impacts agents using `think: false` semantics.
- **Model support request** for System 1 models (Kev, Laya) — Issue [#18594](https://github.com/ollama/ollama/issues/18594) (CLOSED without implementation).
- **Cloud model metadata** — PR [#19223](https://github.com/ollama/ollama/pull/19223) makes `ollama launch <harness>` aware of cloud model context lengths, thinking levels, and capabilities per harness (notably Codex `context_window` bumps from 128k fallback to 1,048,576 for glm-5.2).

---

## 4. Performance & Optimization

- **AMD RADV / Vulkan prompt cache regression** — Issue [#19201](https://github.com/ollama/ollama/issues/19201) reports a **~29.7× generation collapse** on the *second* identical request with the bundled llama.cpp host-memory prompt cache enabled, on an RX 6600 XT running Ollama 0.40.8. Model remains fully GPU-offloaded; the pathology is cache-keyed.
- **MLX nvfp4 prefill stall** — Issue [#18505](https://github.com/ollama/ollama/issues/18505) (CLOSED): under `OLLAMA_NUM_PARALLEL=1`, admitted requests intermittently stalled in prefill at `processed = total-1` for minutes; only runner SIGTERM recovered. Worth watching if it recurs.
- **Prompt truncation correctness** — PR [#19058](https://github.com/ollama/ollama/pull/19058) fixes `chatPrompt()` pruning so the last *user* message is preserved (rather than the last message of any type), preventing tool-call-only prompts from silently dropping the active query.

---

## 5. Stability & Regressions

Ranked by severity:

1. **Ollama Cloud Pro 95% failure rate** — Issue [#15453](https://github.com/ollama/ollama/issues/15453) (OPEN, 👍 22, 55 comments). Affects `glm-5.1:cloud`, `kimi-k2.5:cloud`, `qwen3.5:cloud`, `deepseek-v3.2:cloud` on macOS; users report zero packet loss to `ollama.com`, ruling out client network. **No fix PR referenced.**
2. **Massive generation degeneration since 10-10 on `glm-5.3-flash:cloud`** — Issue [#18980](https://github.com/ollama/ollama/issues/18980) (OPEN, 31 comments). Output shows pathological repetition loops. Overlaps temporally with the Cloud Pro incident.
3. **Windows TCP connection resets under large prompts** — Issues [#19139](https://github.com/ollama/ollama/issues/19139) and [#19113](https://github.com/ollama/ollama/issues/19113) (both OPEN). Resets at ~15s, reproduced both through the Ollama API and directly against `llama-server`, indicating the issue sits below the API layer.
4. **AMD RADV ~30× slowdown on 2nd request** — Issue [#19201](https://github.com/ollama/ollama/issues/19201) (OPEN, filed today). See §4.
5. **macOS 0.40.0 MLX "Maximum threads per threadgroup" panic** — Issue [#18846](https://github.com/ollama/ollama/issues/18846) (CLOSED). Regression vs. 0.35.1; panic in `sdpa_vector_2pass_*` kernel.
6. **Go CVEs in shipped binaries** — Issues [#16033](https://github.com/ollama/ollama/issues/16033) and [#19162](https://github.com/ollama/ollama/issues/19162) (both CLOSED). Upgrade guidance: Go 1.26.9+. Affected library includes `buger/jsonparser`.
7. **RVPI 5 (`qwen2.5:3b`) second `ollama run` hangs** — Issue [#18796](https://github.com/ollama/ollama/issues/18796) (OPEN). systemd service on Debian 13; first run succeeds, subsequent runs stall silently.
8. **Windows Desktop 0.33.1 built-in server silent launch failure** — Issue [#18061](https://github.com/ollama/ollama/issues/18061) (CLOSED). `server.log` empty, no listener; manual `ollama serve` works. Related fix: PR [#19179](https://github.com/ollama/ollama/pull/19179) now logs the previously-swallowed `osrv.Run` error.
9. **Model-eviction stall with `OLLAMA_MAX_LOADED_MODELS=1`** — Issue [#19182](https://github.com/ollama/ollama/issues/19182) (OPEN). Pending eviction is cancelled when a request carries `keep_alive`, blocking the waiting request for the full keep-alive interval (default 30m).
10. **Silent tool-call drop with unknown function names** — Issue [#19187](https://github.com/ollama/ollama/issues/19187) (OPEN). Model calls a function absent from `tools`; server returns empty response with `eval_count > 0`, no error surfaced. Fix PRs relevant here: [#19228](https://github.com/ollama/ollama/pull/19228) (Qwen3-coder literal `</function>` in args) and [#19226](https://github.com/ollama/ollama/pull/19226) (Gemma4 trailing-noise recovery).
11. **`/v1/responses` streams close without terminal event** — Issue [#17118](https://github.com/ollama/ollama/issues/17118) (CLOSED). Addressed by PR [#19225](https://github.com/ollama/ollama/pull/19225), which emits `response.failed` instead of silent EOF when generation errors occur mid-stream.
12. **Duplicate model entries after local compat GGUF migration** — Issue [#18830](https://github.com/ollama/ollama/issues/18830) (CLOSED). `ollama list` shows model twice plus a bogus `llamacpp:<sha>` tag.

---

## 6. What This Means for Application Developers

- **If you depend on Ollama Cloud Pro, have a fallback today.** The Pro-plane failure rate and the `glm-5.3-flash` degeneration report are concurrent and unresolved; routing cloud calls without local or alt-provider failover is unsafe for production agents.
- **Watch your truncation semantics after the next release.** PR #19058 changes which message survives pruning — if your agent relies on the last message being preserved regardless of role, re-test tool-call loops.
- **Windows + large prompts remains fragile.** The connection reset reproduces below the Ollama API, so wrapping `llama-server` directly will not protect you. Cap prompt batches or retry with backoff.
- **Stop using `typical_p`.** It now returns HTTP 400 from the Python client.
- **Streaming clients should handle `response.failed`.** PR #19225 introduces a proper terminal failure event for `/v1/responses`; current clients may misread silent EOF as a valid completion.
- **MLX users on Qwen3 long-context workloads** should track PR #19231 — YaRN scaling fixes are imminent; until landed, manual RoPE configs may underperform at extended context.
- **Tool-calling hardening is underway** (Qwen3-coder, Gemma4). If you have models emitting malformed or noisy tool calls, pin to the version that includes PRs #19226 and #19228 once released.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-10-23

## 1. Today's Highlights

The dominant story remains the **supply-chain compromise of `litellm 1.107.0`** (Issue #47826, 25 comments, 19 👍), which embedded a `cook.pth` credential stealer and a `sitecustomize` RCE loader and was published from a lookalike repo (`Berri-AI/litellm`). PyPI and the `latest`/`main-stable` Docker tags have been pulled, but the fallout is still spreading: users are now asking for the eMudhra root-CA fix to be backported to `stable/1.106.x`, since every shipped 1.106.x image still trusts the compromised CA chain. Separately, a large typing-hardening effort (#47789, 431 files) and several proxy accounting/authorization fixes are moving through review.

## 2. Releases & Breaking Changes

- **No new releases in the last 24h.**
- **Security backport request pending** — [Issue #47904](https://github.com/BerriAI/litellm/issues/47904): `eMudhra` root CA fix (#47670) exists only on `main`; all published `1.106.x` images still trust `emSign ECC Root CA - G3`. Requesting a `v1.106.3` image.
- **Upgrade-notice source change** — [PR #47998](https://github.com/BerriAI/litellm/pull/47998): Admin UI upgrade banner now reads version/link from the docs changelog rather than GitHub "latest release," since the release pipeline sets GitHub releases without human review.

> ⚠️ Operators should pin to a known-good version and verify image digests until the 1.106.x backport lands.

## 3. New Model & Hardware Support

- **Foundry Local provider** — [PR #47713](https://github.com/BerriAI/litellm/pull/47713): adds a local-inference provider with SDK 2.2.1 setup.
- **DashScope realtime WebSocket** — [PR #40579](https://github.com/BerriAI/litellm/pull/40579): adds a `DashScopeRealtime` handler on the shared OpenAI realtime path, preserving DashScope's flat `session.update` format.
- **OpenAI image detail `"original"`** — [Issue #47327](https://github.com/BerriAI/litellm/issues/47327): `token_counter` currently rejects the new `"original"` detail value, causing pre-call context checks to log ERROR and silently skip window validation.
- **Advisor model iterations** — [PR #48000](https://github.com/BerriAI/litellm/pull/48000): Anthropic advisor iterations can now name a model with distinct rates; usage is tracked and priced separately.

## 4. Performance & Optimization

- **Latency-based routing degraded to random selection** — [Issue #24720](https://github.com/BerriAI/litellm/issues/24720): a lost-update race in `async_log_success_event` collapses latency routing to weighted-random under concurrency (16 Anthropic + 4 OpenAI keys observed). No fix PR referenced.
- **Event-loop stall from unbounded error bodies** — [Issue #34031](https://github.com/BerriAI/litellm/issues/34031): proxy reads full upstream error bodies (observed ~114 MB HTTP 400) and runs regex masking over them, stalling the event loop and inflating RSS. No fix yet.
- **Retry-After ignored for multi-deployment groups** — [Issue #34399](https://github.com/BerriAI/litellm/issues/34399): `_time_to_sleep_before_retry` only honors `Retry-After` when a model group has a single deployment, causing instant retry storms against shared rate-limited upstreams.
- **MCP budget reservation** — [PR #47999](https://github.com/BerriAI/litellm/pull/47999): reserves budget per auto-executed MCP tool call, preventing under-counting of tool charges.
- **Typing cleanup** — [PR #47789](https://github.com/BerriAI/litellm/pull/47789) clears 1181 `basedpyright` Any errors across 431 files; [PR #48001](https://github.com/BerriAI/litellm/pull/48001) is the first slice. No intended behavior change.

## 5. Stability & Regressions

Ranked by severity:

1. **[CRITICAL] Supply-chain compromise of 1.107.0** — [Issue #47826](https://github.com/BerriAI/litellm/issues/47826): malicious `.pth` credential stealer + `sitecustomize` RCE loader. PyPI and Docker tags removed; **verify all images and pin digests**. Residual risk: 1.106.x CA trust backport still open (#47904).
2. **[HIGH] Team deletion leaves keys auth-valid** — [Issue #34217](https://github.com/BerriAI/litellm/issues/34217): `POST /team/delete` removes DB rows but does not evict auth-cache entries, unlike `/key/delete`.
3. **[HIGH] DB connection exhaustion fails all keys** — [Issue #34479](https://github.com/BerriAI/litellm/issues/34479): when Postgres `max_connections` is hit in multi-worker deployments, all user API keys fail.
4. **[HIGH] Transient DB outage → "Invalid model name"** — [Issue #26237](https://github.com/BerriAI/litellm/issues/26237): a Postgres/HAProxy blip causes valid models to be reported as invalid.
5. **[MED] Unix-socket Postgres broken** — [PR #43668](https://github.com/BerriAI/litellm/pull/43668): `_strip_prisma_query_params` drops `host`, breaking every Unix-socket Postgres deployment (fix in review).
6. **[MED] Gemini stream not retried on early drop** — [PR #45750](https://github.com/BerriAI/litellm/pull/45750): a `200 OK` + connection drop before the first SSE event never triggers retries.
7. **[MED] Bedrock SigV4 header replay** — [Issue #27513](https://github.com/BerriAI/litellm/issues/27513): retry paths can replay stale SigV4 headers after signing.
8. **[MED] Anthropic→Responses adapter ignores `drop_params`** — [Issue #26241](https://github.com/BerriAI/litellm/issues/26241): `metadata.user_id` is unconditionally mapped to `user`, breaking strict `/responses` gateways.
9. **[LOW] Cache-hit spend/token semantics** — [Issue #39057](https://github.com/BerriAI/litellm/issues/39057): on cache hits, `spend=0` but token columns replay the original usage, which is ambiguous for billing aggregation.
10. **[LOW] Azur

---
*Note: the digest above is being completed for the remaining low-severity items and the closing sections. Full continued content:*

10. **[LOW] Azure FLUX regressions** — [Issue #19334](https://github.com/BerriAI/litellm/issues/19334): FLUX-1.1-pro and FLUX.1-Kontext-pro calls fail after upgrading to 1.80.15-stable.1.
11. **[LOW] Guardrails false-positive** — [Issue #24734](https://github.com/BerriAI/litellm/issues/24734): "guardrails feature unavailable" error triggered when editing API keys with no guardrails configured (1.82.3).
12. **[LOW] UI login redirect to internal Docker IP** — [Issue #30118](https://github.com/BerriAI/litellm/issues/30118): regression from 1.87.0 → 1.88.x behind nginx reverse proxy (now closed).

## 6. What This Means for Application Developers

- **Audit your supply chain immediately.** If you pulled `litellm==1.107.0` or any `latest`/`main-stable` image between the compromise window and the takedown, rotate all credentials those environments could reach (API keys, cloud tokens, DB creds) and rebuild from a pinned, digest-verified tag. Assume `cook.pth` credentials are exfiltrated.
- **Pin versions and digests.** With the 1.106.x CA-trust backport still open, floating tags remain risky. Treat the ghcr.io and docker.io registries as untrusted until you have re-pulled after the yank.
- **Validate billing accuracy if you rely on cache + spend logs.** The cache-hit semantics (#39057) mean `spend_logs` rows are spend=0 but carry original token counts — reconcile carefully before trusting per-team/per-key cost attribution.
- **Watch auth-cache invalidation.** Team deletion (#34217) does not invalidate keys; if you build multi-tenant key lifecycle on top of the proxy, add explicit `/key/delete` calls as a workaround.
- **Harden router retry behavior for shared upstreams.** If you share a rate-limited backend across multiple deployments, expect instant retries (#34399) and inconsistent `Retry-After` handling; consider grouping rate-limited deployments or fronting with your own limiter.
- **Claude Code / Anthropic-compatible routing has several open edge cases** (#26241, #26252, #26214, #27091): tool-use input dropping on streaming, websearch interception not firing through Bedrock pass-through, and `thinking.type=adaptive` rejections via the complexity router. Test these paths explicitly if you route coding agents through LiteLLM.

**Watching next:** the `stable/1.106.x` CA backport (#47904) and any new advisory on the scope of the 1.107.0 compromise.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-10-23

## Today's Highlights
No releases landed in the last 24h, but the issue tracker and PR queue were busy: the AMD Linux ROCm saga continues with a fresh regression (#14906) and a near-simultaneous fix PR (#14933), and a cluster of FSDP2/QDoRA correctness fixes are converging for merged 4-bit saves. On the Studio side, work continues on GGUF variant parsing (#14931, #14733), diffusion/video residency planning, and long-standing desktop UX papercuts.

## Releases & Breaking Changes
None in the last 24h.

## New Model & Hardware Support
- **DeepSeek-V4.1-Flash-1017 (GGUF)** — Fails to load: bundled llama.cpp does not recognize the `deepseek41-dspark` architecture. PR #14931 also fixes a related Studio bug where imatrix-weighted quants named `<model>-<QUANT>-imatrix.gguf` were being misclassified as calibration files and hidden. ([Issue #14695](https://github.com/unslothai/unsloth/issues/14695), [PR #14931](https://github.com/unslothai/unsloth/pull/14931))
- **AMD Linux ROCm (RDNA3 / gfx1100)** — Report of silent CPU fallback on native Linux: Studio prepends `/opt/rocm/lib`, hiding the GPU from the bundled `llama-server`. Regression from the #7208 fix; PR #14933 keeps the bundled ROCm runtime when the system prepend hides the device. ([Issue #14906](https://github.com/unslothai/unsloth/issues/14906), [PR #14933](https://github.com/unslothai/unsloth/pull/14933))
- **Intel XPU LoRA inference on Windows** — Mixes GNU and MSVC linker arguments during build. ([Issue #14807](https://github.com/unslothai/unsloth/issues/14807))
- **Lemonade / FastFlowLM (Ryzen AI)** — Chat and model loading stopped working after a few days on Ubuntu 26.10 / Ryzen AI 7 350. ([Issue #14650](https://github.com/unslothai/unsloth/issues/14650))
- **OmniVoice** — Request for full + LoRA finetune and UI integration. ([Issue #14660](https://github.com/unslothai/unsloth/issues/14660))

## Performance & Optimization
- **Studio conversation-archive embeddings** — Long, tool-heavy chats spend minutes in synchronous `SentenceTransformer.encode` before llama.cpp sees any inference; Stop does not cancel archiving. Fix PR #14546 bounds and cancels the embedding pass. ([Issue #14519](https://github.com/unslothai/unsloth/issues/14519), [PR #14546](https://github.com/unslothai/unsloth/pull/14546))
- **`get_statistics()` load-path stall** — `from_pretrained()` blocked ~76s on a proxied machine due to a HuggingFace reachability check inside the load path. ([Issue #14366](https://github.com/unslothai/unsloth/issues/14366))
- **MoE grouped GEMM autotune on mixed-GPU `device_map`** — Cache key, tuning run, disk-cache capability check and SMEM fit all read the current CUDA device rather than the experts' actual device. PR #14719 keys and tunes per experts' GPU. ([PR #14719](https://github.com/unslothai/unsloth/pull/14719))
- **RoPE table 64-bit offsets** — `cos + pos*stride` with int32 position wraps past 2^31 elements (16.8M positions at head_dim 128); PR #14714 uses 64-bit row offsets. ([PR #14714](https://github.com/unslothai/unsloth/pull/14714))
- **Studio diffusion: FLUX.2 Klein residency** — First load streams every block per step even when int8 fits resident; PR #14866 seeds residency from measured peak on first load. ([PR #14866](https://github.com/unslothai/unsloth/pull/14866))
- **Studio video: per-request residency on streaming tier / HunyuanVideo-1.5** — Refits resident prefix from free memory and request shape. ([PR #14865](https://github.com/unslothai/unsloth/pull/14865))
- **pre-commit.ci load** — `scripts/enforce_kwargs_spacing.py` is extremely slow; a recurring drain on CI across PRs. ([Issue #14174](https://github.com/unslothai/unsloth/issues/14174))

## Stability & Regressions
Ranked by severity:

1. **AMD Linux ROCm silent CPU fallback (regression from #7208)** — Native Linux + system ROCm hides GPU from bundled `llama-server`; user gets CPU-speed inference with no error. Fix PR #14933 open. ([Issue #14906](https://github.com/unslothai/unsloth/issues/14906), [PR #14933](https://github.com/unslothai/unsloth/pull/14933))
2. **FSDP2 merged 4-bit saves** — `save_pretrained_merged` / `push_to_hub_merged` gather packed NF4 weights onto rank 0 GPU; PR #14823 stages on CPU and merges one layer at a time, PR #14674 keeps merge operands on GPU like the non-merged path. ([PR #14823](https://github.com/unslothai/unsloth/pull/14823), [PR #14674](https://github.com/unslothai/unsloth/pull/14674))
3. **FSDP2 4-bit QuantState not restored on full DCP load** — `_without_quant_state` drops `weight.absmax` / `quant_map` / `quant_state.bitsandbytes__nf4` on load; PR #14747 restores them. ([PR #14747](https://github.com/unslothai/unsloth/pull/14747))
4. **Windows safetensors shard load OOM / os error 1455** — transformers 5.0–5.16 opens every shard; PR #14856 switches to `pread`. ([PR #14856](https://github.com/unslothai/unsloth/pull/14856))
5. **Multi-account LAN model sync** — Multiple accounts against the same local server do not keep the loaded model in sync. Closed. ([Issue #12365](https://github.com/unslothai/unsloth/issues/12365))
6. **Qwen3.5 GatedDeltaNet + context parallel / FSDP2** — Hybrid recurrent layers (30/40 GatedDeltaNet) are not sharded or context-parallelized correctly. ([Issue #12051](https://github.com/unslothai/unsloth/issues/12051))
7. **GGUF export on Ling 3 Tiny** — Export fails with the internal conversion command on Win 11 + RTX 5060 Ti. ([Issue #14916](https://github.com/unslothai/unsloth/issues/14916))
8. **Remote-code models cannot export from UI** — `trust_remote_code=True` works for training/chat but Export fails to load the checkpoint; fix PR #14722. ([Issue #14688](https://github.com/unslothai/unsloth/issues/14688), [PR #14722](https://github.com/unslothai/unsloth/pull/14722))
9. **Attachments unreadable after auto-compaction** — Images/PDFs become permanently unreadable; `search_conversation` never invoked. ([Issue #14708](https://github.com/unslothai/unsloth/issues/14708))
10. **NVFP4 quant-token over-match in Studio** — Repos whose model name contains `-NVFP4-` collapse all GGUF files into one variant; PR #14733 scopes the token. ([PR #14733](https://github.com/unslothai/unsloth/pull/14733))
11. **Studio Images Compare grid vs Hires negative-prompt mismatch** — Different CFG logic between Compare and Hires; fixed in #14875. ([PR #14875](https://github.com/unslothai/unsloth/pull/14875))
12. **Windows Intel XPU linker arg clash** — GNU and MSVC flags mixed in LoRA inference build. ([Issue #14807](https://github.com/unslothai/unsloth/issues/14807))
13. **Assistant message editing** — Was broken; closed. ([Issue #13938](https://github.com/unslothai/unsloth/issues/13938))

## What This Means for Application Developers
- **Don't trust "it loaded" on AMD Linux.** Until #14933 lands, verify `llama-server` is actually on the GPU (`ggml_cuda_init` / device detection) rather than inferring success from a populated chat UI. Silent CPU fallback is the dominant failure mode in this environment.
- **If you run FSDP2 QDoRA, pin around merged-agent weight issues.** Merged 4-bit saves and full DCP restores of 4-bit checkpoints are actively being repaired (#14823, #14674, #14747) — prefer `save_pretrained` + separate merge, or lean on these PRs if you need merged-4bit under FSDP2.
- **Studio as a local inference gateway is maturing but has load-path hazards.** The archive-embedding stall (#14519/#14546) can make long agent sessions appear hung before any token is generated; a user-visible "Stop" not interrupting the archive pass is worth wrapping with your own timeout if you build on top.
- **Windows data loading is a real risk at scale.** If you ship Windows users, the safetensors shard-load OOM (#14856) will show up on models with many shards — track that PR for the 5.0–5.16 transformers window.
- **GGUF variant handling is not yet stable.** #14931 (imatrix naming) and #14733 (NVFP4 token) show that repo/file-name heuristics still misclassify, which affects download plans and the variant menu — validate model resolution server-side if you expose model selection to users.
- **CI throughput matters to you as a consumer, not just maintainers.** The slow pre-commit hook (#14174) and repeated formatter-rewrite PRs (#14930) increase merge latency across the repo; expect slightly slower movement on PRs until that's addressed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*