# AI Infrastructure Digest 2026-10-23

> Generated: 2026-10-23 03:54 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Infrastructure Ecosystem
**Digest date: 2026-10-23**

---

## 1. Ecosystem Overview

Today's AI infrastructure landscape is defined less by new releases than by *correctness hardening under scale*. Across the two flagship serving engines (vLLM and SGLang), the highest-severity items are silent-corruption bugs in disaggregated serving and hybrid-attention models — KV contamination in PD disaggregation (#61160), NIXL lease-expiry races (#61229), and Kimi-K3 DCP a2a graph corruption (#45367) — signaling that distributed serving has outrun its test harnesses. Meanwhile, a **supply-chain compromise of LiteLLM v1.107.0** (#47826) is the day's most severe ecosystem-wide event, forcing the gateway layer to confront digest-pinning and admission control as table stakes. On the model side, hybrid architectures (Gated DeltaNet, QSA, GLM-5.3-Flash, Qwen3.8-flash-next) now dominate new work and are simultaneously the largest source of regressions across CUDA, SYCL, ROCm, and RDNA4. The overall picture: rapid capability expansion, unsteady foundations at long context and multi-node, and an urgent need for deterministic correctness contracts.

---

## 2. Activity Comparison

| Project | Layer | Issues (active/notable 24h) | PRs (landed / in flight) | Releases | Dominant theme |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~10+ (heavy tracker activity: #61160, #61229, #50576) | ~3 merged-related, ~6 fix PRs in flight | **None** (no release) | Disaggregated-serving correctness, SM8x/ROCm support |
| **SGLang** | Serving engine | **49 issues updated in 24h** (#42752 top by activity) | AFD stack #45958 + multiple fix PRs | **None** | Stability cycle regressions (Kimi-K3, GLM-5.3-Flash) |
| **llama.cpp** | Local runtime | ~9 open regressions + 3 closed | **~15 builds (b11815–b11829)**, 10+ PRs | **Continuous (b11829)** | MoE expert caching, Intel Arc SYCL, mobile/edge |
| **Ollama** | Local runtime / cloud | ~16 ranked regressions (#15453 dominant) | ~8 fix PRs landed, MLX model support | **None** (0.40.8/0.40.9 current) | Cloud reliability, tool-call parser fixes |
| **LiteLLM** | Gateway | ~10+ (supply-chain, DoS, auth) | ~5 fixes (#23924, #45750, #47789) | **None** (1.107.0 withdrawn) | Supply-chain compromise response |
| **Unsloth** | Fine-tuning | ~10 ranked (#14513, #14519, #14708) | **~15+ PRs** (danielhanchen batch) | **None** (uv pinned 0.13.5) | Studio Flows stack, FP8 dequant, GRPO correctness |

**Reading the table:** llama.cpp has the highest release cadence (build-per-PR model); SGLang has the highest issue churn; Unsloth has the densest PR throughput on a single day. Only LiteLLM suffered a security event requiring *retraction* of a release.

---

## 3. Model Support Race

**Who shipped what today:**

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Unsloth | Leader |
|---|---|---|---|---|---|---|
| **DeepSeek-V4.1 / V4-Flash** | ⚠️ In progress (SM8x blocked #50576; graph replay #63155) | ✅ CP>1 replay #45954; AMD prefill CP #43465 | — | ✅ Cloud catalog #19079 | ⚠️ **Fails to load in Studio** #14695 | **SGLang** |
| **GLM-5.3-Flash** | ✅ Optimizations #63072, #57406 | ⚠️ Ascend port #43305; SM120 crash #42012; SM90 tracker #45373 | — | — | — | **vLLM** (perf) / SGLang (portability, w/ caveats) |
| **Qwen3.8 / Qwen3.8-Flash-Next (qwen4exp)** | ✅ Active ROCm tracking (#57149, #59575) | ⚠️ AMD hc_mix #41880 | ✅ SGN op #30346; DFlash fix #30927 | ⚠️ YaRN fix PR #19231 | ❌ Context-parallel unsupported | **vLLM** (perf), **llama.cpp** (fresh kernels) |
| **Kimi-K3** | — | ⚠️ GB300 DCP bug #45367; SM90 SwiGLU/SiTU silent bug #45755 | — | — | — | SGLang (but unstable) |
| **Nemotron 3.5 Bolt 74B-A9B** | — | — | ✅ Non-standard GQA #23343 | ✅ **MLX #19229** | — | **Ollama** (consumer) / llama.cpp (GGUF) |
| **MiniCPM-OCR 1.0** | — | — | ✅ **#30979** | — | — | **llama.cpp** |
| **Muse Spark** | (perf PRs on ROCm) | ✅ Day-0 stack #44664–#44667 | — | — | — | **SGLang** |
| **T-Head SAIL (Zhenwu NPU)** | — | ✅ Roadmap #37519 | — | — | — | **SGLang** |

**Verdict:** SGLang is winning breadth (Ascend, T-Head, Muse Spark, DeepSeek-V4.1 CP), but vLLM leads on **perf depth** for the models that matter commercially (GLM-5.3, Qwen3.8). llama.cpp is uniquely fast at Day-0 multimodal/GGUF conversion (MiniCPM-OCR, Nemotron). Ollama owns the **consumer-cloud convenience layer**, especially MLX on Apple Silicon. The clear gap: **DeepSeek-V4-Flash on Ampere is unsupported in vLLM** with 118 comments of demand — an open opportunity.

---

## 4. Performance Frontier

Optimization effort today clusters in five distinct battlefronts:

**a) KV cache & eviction (highest density of work)**
- vLLM: cross-TP KV offload for GDN hybrids (#62914); NIXL lease lifecycle (buggy).
- SGLang: **KVShard** pool-level sharding for MTP (#40929); HiCache MLA DCP file L3 (#41187); but HiCache host-tier exhaustion bug #45400.
- llama.cpp: `kq_mask` elimination saves **2 GB @ ub4096 / 4 GB @ ub8192** (#30965, #31009).
- Ollama: proposed pluggable KV connector #17696; Modelfile KV cache type #16245.

**b) MoE serving under memory pressure**
- llama.cpp leads decisively: `llama_moe_cache` CPU-fallback (#30966), GPU-resident expert LRU (#27861), `--moe-cache-cpu-share`.
- This is the most actionable horizontal win in today's digest — multi-GB VRAM redirected to expert residency.

**c) Quantization & dequant kernels**
- Unsloth: **FP8 dequant collapsed to single Triton pass** (#14886) — direct LoRA backward speedup.
- llama.cpp: OpenCL Q2_K (#30999); global FP16 activations `--act-type f16` (#31011); YaRN `truncate=false` (#30206).
- vLLM: FA4 SM90 FP8 MMA for Gemma-4 (#60372); FlashInfer attention sinks on SM8x (#59878) unblocks FP8 KV on Ampere.

**d) Distributed serving topology**
- vLLM: PD disaggregation graphs for DeepSeek-V4.1 (GB200 DP4 prefill, #63155).
- SGLang: **AFD (Attention-FFN disaggregation)** — a new axis beyond P/D, independently sizing attention vs FFN GPU groups (#45958, RFC #45568).
- AFD is the architectural signal to watch; it generalizes the asymmetry insight beyond prefill/decode.

**e) Backend-specific kernel sprints**
- SYCL/Intel Arc: multi-column XMX (#29864), +19% prompt-eval on tensor split (#30956), graph replay (#28725) — **simultaneously most improved and most regressed backend** (F16 NaN #30892, DeltaNet token soup #29183).
- ROCm/MI355X: Qwen3.8 perf trackers, GLM-5.3 sync removal (#63072), AITER hc_mix (#41880).
- Hexagon/Adreno/OpenCL: CONV2D (#30995), depthwise conv2d (#30900) — mobile/edge becoming first-class.

---

## 5. Layer Positioning

The six projects map cleanly to four ecosystem layers, with overlapping adjacencies:

```
┌──────────────────────────────────────────────────────────────────┐
│  GATEWAY / ROUTING        LiteLLM (#1 priority: supply-chain)    │
│  ├─ Multi-provider routing, auth, cost accounting                │
│  └─ Adapter normality across OpenAI/Anthropic/Gemini APIs        │
├──────────────────────────────────────────────────────────────────┤
│  SERVING ENGINE (cluster/GPU, multi-node)                        │
│  ├─ vLLM — CUDA/GB200/ROCm, PD disaggregation, prefix caching    │
│  └─ SGLang — RadixAttention, AFD, Ascend/NPU portability         │
├──────────────────────────────────────────────────────────────────┤
│  LOCAL RUNTIME (single-node → small cluster)                     │
│  ├─ llama.cpp — GGUF, MoE caching, mobile/edge, build-per-commit │
│  └─ Ollama — consumer UX wrapper, MLX backend, cloud catalog     │
├──────────────────────────────────────────────────────────────────┤
│  TRAINING / FINE-TUNING                                          │
│  └─ Unsloth — LoRA/GRPO, Studio UI, TRL/vLLM integration         │
└──────────────────────────────────────────────────────────────────┘
```

**Key differentiators:**
- **vLLM vs SGLang**: Both are multi-node serving engines, but vLLM optimizes for the *NVIDIA datacenter path* (GB200, H100/H200, MI355X), while SGLang is pursuing *hardware breadth* (Ascend A3/A5, T-Head NPU) and new *serving topologies* (AFD). For Western GPU fleets, vLLM; for heterogeneous/NPU fleets, SGLang.
- **llama.cpp vs Ollama**: llama.cpp is the *engine* (GGUF, kernels, portability); Ollama is the *product* (UX, model catalog, cloud). Ollama's regressions in 0.40.x show how the product layer inherits engine fragility.
- **LiteLLM** sits *above* all engines — it routes to vLLM, SGLang, Ollama, and hosted APIs. Its compromise is a *systemic* risk because it holds credentials for everything beneath it.
- **Unsloth** is the only project operating *before* serving — but its GRPO/vLLM weight-sync bug (#14831) shows how tightly training and serving are now coupled: a "training" bug silently produces garbage serving outputs.

---

## 6. Trend Signals

**Four industry trends this digest makes concrete:**

**1. Silent correctness failures are the dominant risk class.**
Not crashes — *silent* wrongness. vLLM's cross-request KV leakage (#61160), NIXL stale reads (#61229), SGLang's Kimi-K3 SiTU→SwiGLU silent swap (#45755), Ollama's out-of-schema tool calls returning empty with `eval_count>0` (#19187), and Unsloth's GRPO no-op (#14831) share a signature: *requests succeed but outputs are wrong*. For infrastructure decision-makers, this means **output validation and eval harnesses must move into the serving path**, not just CI.

**2. Disaggregation is maturing but not production-safe.**
vLLM's PD disaggregation + prefix caching is a default-on configuration that today returns content from *other requests*. SGLang's Kimi-K3 DCP a2a garbles 12/12 outputs until `NCCL_GRAPH_REGISTER=0`. Both engines have fix PRs, but neither is safe to enable blind. **Rule for Q4: disaggregated serving requires explicit output-isolation testing and pinned builds.**

**3. Hybrid attention (GDN/QSA/linear) is the new instability frontier.**
Gated DeltaNet, QuerySparse Attention, and HyperConnection hybrids (Qwen3.8, Nemotron, GLM-5-next, qwen4exp) appear in nearly every backend's top regression. Symptoms are consistent: long-context token soup, decode collapse past ~80K, F16 NaN. This is a *kernel maturity* problem, not a model problem — the architectures are new and the attention+recurrent kernels are young.

**4. The supply chain is now part of the inference stack.**
LiteLLM v1.107.0's `cook.pth` credential stealer is the second-order consequence of gateways becoming *the* credential convergence point. Combined with the Go CVE tracking in Ollama (#16033) and the `uv` GHSA pin in Unsloth (#14894), the pattern is clear: **infrastructure that holds API keys is now a primary attack surface**, and floating tags are no longer a safety boundary.

**What agent/application developers should watch:**

| Signal | Action |
|---|---|
| vLLM #61160 / #61229 | Disable prefix caching if running NIXL PD disaggregation until fixes land |
| SGLang #45367 | Pin `NCCL_GRAPH_REGISTER=0` for multi-node Kimi-K3; don't merge both fix PRs |
| Ollama #15453, #18980 | Build local fallback; don't route production to Ollama Cloud |
| LiteLLM #47826 | Rotate all credentials; pin by SHA; body-size cap in front |
| Unsloth #14831 | Any GRPO result on TRL<0.28 is suspect — re-run or upgrade |
| llama.cpp MoE cache PRs | Reallocate VRAM to expert residency if serving Qwen4exp/GLM5-next |
| SGLang AFD stack | Pilot if attention/FFN scaling is asymmetric in your workload |

**Bottom line:** The ecosystem is racing forward on capability while accruing correctness debt at the disaggregated-serving and hybrid-attention boundaries. For the next quarter, the highest-leverage engineering investments for application teams are **(a) output validation in the serving path**, **(b) digest-pinned, credential-isolated deployment**, and **(c) per-backend regression testing for any hybrid-attention model in production**.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-23

## 1. Today's Highlights

No new releases landed in the last 24h, but tracker activity is heavy across DeepSeek-V4/V4.1, GLM-5.3, and Qwen3.8 serving paths. The most consequential open items are a **cross-request KV contamination bug in PD disaggregation with automatic prefix caching** (#61160) and a **NIXL lease-expiry race** that lets decode consume overwritten KV blocks (#61229) — both correctness-class issues for disaggregated deployments. Meanwhile, ROCm/MI355X performance trackers for Qwen3.8 models and the Rust frontend parity roadmap continue to advance.

---

## 2. Releases & Breaking Changes

None. No new releases in the last 24h. No merged API/config breaking changes surfaced in the current issue/PR window.

Related but not yet landed:
- **Streaming-input overflow hardening** — PR #63113 rejects input merges that would exceed `max_model_len` at merge time and parks the session, rather than wedging the engine. Behavior change for streaming-input clients once merged: oversized updates now get rejected instead of silently corrupting state. [PR #63113](https://github.com/vllm-project/vllm/pull/63113)

---

## 3. New Model & Hardware Support

- **DeepSeek-V4-Flash-0731 on SM8x (Ampere A100/A800, RTX 30xx)** — open feature request #50576 (118 comments, most active issue). Neither the base `DeepSeek-V4-Flash` nor the `-0731` checkpoint currently runs on Ampere; blocks A100 users. [Issue #50576](https://github.com/vllm-project/vllm/issues/50576)
- **FlashInfer attention sinks on SM8x** — PR #59878 adds sink support for SM8x, unblocking `gpt-oss` from falling back to `TRITON_ATTN` and enabling FP8 KV cache paths that currently have no backend on Ampere. [PR #59878](https://github.com/vllm-project/vllm/pull/59878)
- **FA4 SM90 FP8 MMA for Gemma-4 full attention** — PR #60372 enables FP8 MMA in the SM90 FA4 full-attention kernel while retaining FP8 KV-cache storage (head dim 512 full / 256 sliding-window). [PR #60372](https://github.com/vllm-project/vllm/pull/60372)
- **XPU kernels bump** — vLLM-xpu-kernels to v0.1.16.1 (PR #61956). [PR #61956](https://github.com/vllm-project/vllm/pull/61956)
- **GDN hybrid cross-TP KV offload** — PR #62914 enables filesystem cache reuse across TP sizes for attention+GDN hybrids in the native `OffloadingConnector`. [PR #62914](https://github.com/vllm-project/vllm/pull/62914)

---

## 4. Performance & Optimization

**ROCm / MI355X (gfx950) — active trackers:**
- **Qwen3.8-2.4T-A95B** (MXFP4 Quark) perf plan, landing as stacked PRs. [Issue #57149](https://github.com/vllm-project/vllm/issues/57149)
- **Qwen3.8-Flash-Next** — `qwen4_exp` arch (GatedDeltaNet ×36 layers, QuerySparse Attention ×12, HyperConnection gated residual, MXFP4 MoE). [Issue #59575](https://github.com/vllm-project/vllm/issues/59575)
- **GLM-5.3-Flash** — PR #63072 removes a per-prefill GPU→CPU sync by passing precomputed `chunk_indices` into `chunk_kda` instead of recomputing via `prepare_chunk_indices`. [PR #63072](https://github.com/vllm-project/vllm/pull/63072)
- **GLM-5.3 general optimization** — tracker #57406 follows the GLM-5.2 work; `glm_moe_dsa` optimizations carry over. [Issue #57406](https://github.com/vllm-project/vllm/issues/57406)

**CUDA / graph capture:**
- **DeepSeek-V4.1 decoder replay graphs** — PR #63155 captures decoder replay graphs on the model graph's capture stream so they reuse the model graph's free blocks in the shared graph pool instead of reserving a second pool (fixes #62965). Targets GB200 DP4 prefill with breakable PIECEWISE graphs. [PR #63155](https://github.com/vllm-project/vllm/pull/63155)

**Scheduling / speculative decoding:**
- **Context-length-aware speculative token scheduling** — RFC #48627 proposes extending `num_speculative_tokens_per_batch_size` with an optional context-length axis, so K is picked from a `(batch, ctx)` table. [Issue #48627](https://github.com/vllm-project/vllm/issues/48627)
- **Adaptive DSpark online profiling** — feature request #52057 to reduce drift at higher batch sizes in the startup replay-based verification-time estimate. [Issue #52057](https://github.com/vllm-project/vllm/issues/52057)
- **Batch invariant determinism** — tracker #27433 (102 comments) continues the work based on Thinking Machines' nondeterminism blog. [Issue #27433](https://github.com/vllm-project/vllm/issues/27433)

**Observability:**
- **Per-request / per-engine-step coarse-grained tracker** — RFC #39979 (9 👍) requests a lighter-weight profiler than PyTorch Profiler for E2E optimization. [Issue #39979](https://github.com/vllm-project/vllm/issues/39979)

---

## 5. Stability & Regressions

Ranked by severity:

1. **🔴 Cross-request KV contamination in PD disaggregation with prefix caching (default)** — Issue #61160. NIXL prefill/decode disaggregated deployment serving DeepSeek-V4.1-Flash intermittently returns **content from other requests**. Clean with `--no-enable-prefix-caching`. Scriptable reproducer on `/v1/...`. This is a data-leak-class correctness bug in a default-on configuration. No fix PR referenced. [Issue #61160](https://github.com/vllm-project/vllm/issues/61160)

2. **🔴 NixlConnector: KV blocks freed on lease expiry while remote READ in flight** — Issue #61229. Producer releases KV blocks on `kv_lease` expiry while a remote READ is still in flight; decode silently consumes overwritten KV. vLLM 0.30.0, 1P1D, UCX. Silent corruption. No fix PR referenced. [Issue #61229](https://github.com/vllm-project/vllm/issues/61229)

3. **🟠 Qwen3.8-Flash-Next: prompt content past ~2048 (`indexer_budget`) tokens invisible on GB10 (sm121)** — Issue #62776. On 2× DGX Spark, the model answers as if the prompt ended at ~2K tokens. Distinct from retrieval quality — content is dropped. Nightly v0.32. [Issue #62776](https://github.com/vllm-project/vllm/issues/62776)

4. **🟠 PP2 tool-calling garbled output on ROCm (GLM-5.2-FP8 DSA, chunked-prefill)** — Issue #46262. PP1 works correctly; PP2 produces garbled output. 8× MI355X, ROCm 7.2.3. [Issue #46262](https://github.com/vllm-project/vllm/issues/46262)

5. **🟠 Structured output broken with Qwen3 when `enable_thinking=False`** — Issue #18819 (9 comments, 6 👍). Guided decoding fails specifically in non-thinking mode. [Issue #18819](https://github.com/vllm-project/vllm/issues/18819)

6. **🟠 Qwen3.5 JSON-schema `response_format` emits garbled spaces** — Issue #38696. Reproducible on `vllm/vllm-openai:nightly`. [Issue #38696](https://github.com/vllm-project/vllm/issues/38696)

7. **🟡 Gemma 4 fails to initialize with per-token-head KV cache quantization** — Issue #40388. [Issue #40388](https://github.com/vllm-project/vllm/issues/40388)

**Fix PRs in flight:**
- **Muse quadratic attribute scans in tool-call extraction** — PR #62345 (tagged Security) fixes quadratic complexity on two independent paths scaling with model output length. [PR #62345](https://github.com/vllm-project/vllm/pull/62345)
- **Realtime STT: abort engine request on websocket disconnect** — PR #52519; previously `cleanup()` cancelled the asyncio task but did not abort the engine request, leaking compute. [PR #52519](https://github.com/vllm-project/vllm/pull/52519)
- **DeepSeek-VL2 encoder-cache collisions across cropping modes** — PR #63120 distinguishes raw-image cache identities across cropping modes. [PR #63120](https://github.com/vllm-project/vllm/pull/63120)
- **ROCm Muse Spark batch-sharded sampling** — PR #62756 restores output multiplier and final-logit softcap in `compute_logits_local`. [PR #62756](https://github.com/vllm-project/vllm/pull/62756)
- **KV connector engine-ID sync across PCP ranks** — PR #62916 (draft) addresses multi-node PP2/PCP8/TP2 startup failure. [PR #62916](https://github.com/vllm-project/vllm/pull/62916)
- **NIXL agent recreation across sleep** — PR #63144 (draft) removes the `RCACHE_ENABLE=n,TLS=^cuda_ipc` sleep workaround; blocked on an upstream UCX PR. [PR #63144](https://github.com/vllm-project/vllm/pull/63144)

---

## 6. What This Means for Application Developers

- **PD disaggregation + prefix caching is not production-safe right now.** Issues #61160 and #61229 are both silent-corruption bugs (cross-request leakage and stale KV reads) in NIXL-based disaggregated deployments. If you run disaggregated serving with automatic prefix caching, audit your configuration or disable prefix caching until these close. This is the highest-priority takeaway of the day.

- **A100/Ampere users remain blocked on DeepSeek-V4-Flash.** If you're targeting V4-Flash or the `-0731` checkpoint on A100/A800/RTX 30xx, you cannot serve today (#50576). Plan for Hopper/Blackwell or wait for SM8x kernel work.

- **Disaggregated serving is maturing but the API surface is still in flux.** The render/generate/derender split (#56851, #42729) and streaming derender (#47161) are actively landing. If you've built custom detokenization/stop-string handling around `/inference/v1/generate`, note that stop-string semantics in the token path are still being worked out (#57052) — validate your stop handling against current `main`.

- **Determinism and logprobs semantics are becoming explicit contracts.** If you depend on reproducible sampling or logprob values (e.g., for RL or evals), track #27433, #42259, and #48627 — batch invariance, logits/logprobs semantics across Model Runner V2, and context-aware speculative scheduling are all being formalized.

- **Tool-calling and structured output still have sharp edges.** Qwen3 non-thinking structured output (#18819), Qwen3.5 JSON schema (#38696), PP2 tool calling on ROCm (#46262), and a security-relevant quadratic blowup in Muse tool-call extraction (#62345) are all open. If you serve agentic workloads, pin your model/quant/parallelism combo and test tool-call extraction with adversarial outputs.

- **Rust frontend is experimental.** The drop-in Rust API server (`VLLM_USE_RUST_FRONTEND=1`) still lacks feature parity (#44280). Don't ship it for anything relying on full frontend behavior yet.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-23

## 1. Today's Highlights

Activity today is dominated by stability work rather than releases: **49 issues were updated in the last 24h**, with the long-running flaky-CI tracker (#42752, 123 comments) still the highest-traffic item. On the feature side, the **Attention-FFN disaggregation (AFD)** RFC (#45568) advanced with a companion implementation PR (#45958), signaling a new serving-topology direction beyond prefill/decode disaggregation. Several correctness regressions landed in the 0.5.22 cycle, notably around **Kimi-K3 DCP a2a** and **GLM-5.3-Flash on SM120**, for which fix PRs are already open.

No new releases were published in the last 24h.

## 2. Releases & Breaking Changes

- **No new releases.** Latest referenced version in issues remains **v0.5.22** (`main` at `ce66b3ab` is being tracked by reporters).
- **Deprecation watch:** `python -m sglang.bench_serving` is a deprecated shim scheduled for removal; docs are being migrated to `python -m sglang.benchmark.serving` ([PR #45959](https://github.com/sgl-project/sglang/pull/45959)). Tooling/scripts that still invoke the old module should be updated now.
- **Prometheus metric naming:** an open request ([#45418](https://github.com/sgl-project/sglang/issues/45418)) proposes replacing colons with underscores in `sglang:*` metric names (e.g., `sglang_per_stage_request...`). Not yet merged, but dashboard/alert authors should anticipate a rename.
- **`--enable-lmcache` + disabled radix cache** is broken in 0.5.22 ([#45929](https://github.com/sgl-project/sglang/issues/45929)) — avoid this flag combination until fixed.

## 3. New Model & Hardware Support

- **GLM-5.3-Flash on Ascend A3/A5** — port of the hybrid MLA+DSA MoE VLM with built-in MTP head to NPU, via [PR #43305](https://github.com/sgl-project/sglang/pull/43305).
- **T-Head SAIL / Zhenwu 810, 810E, M890P** — roadmap for first-class upstream support ([#37519](https://github.com/sgl-project/sglang/issues/37519)).
- **Muse Spark** — Day-0 support being landed in ordered PR slices (#44664–#44667), depends on a DeepGEMM patch ([#44678](https://github.com/sgl-project/sglang/issues/44678)).
- **SANA-Sprint 0.6B (diffusion)** — native SGLang-Diffusion support requested for 1–4 step, 1024px text-to-image ([#43671](https://github.com/sgl-project/sglang/issues/43671)).
- **DeepSeek-V4.1 CP>1 encoder replay** with P/D and HiCache — extends CP1 SWA bounded replay to CP>1 ([PR #45954](https://github.com/sgl-project/sglang/pull/45954)).
- **Prefill context parallel for DeepSeek-V4.1 on AMD** — [PR #43465](https://github.com/sgl-project/sglang/pull/43465).
- **GLM-5.3-Flash on Hopper (SM90)** — performance tracking issue opened ([#45373](https://github.com/sgl-project/sglang/issues/45373)).

## 4. Performance & Optimization

- **AFD framework (attention/FFN disaggregation):** execution framework for independently sized attention and FFN GPU groups, covering worker startup, model loading, token dispatch, and output combination ([PR #45958](https://github.com/sgl-project/sglang/pull/45958), RFC [#45568](https://github.com/sgl-project/sglang/issues/45568)).
- **DeepSeek-V4.1 MegaGate:** drops the padded-row zero-copy `torch.where` on `sgl-deep-gemm 0.2.3.post1`, saving a read+write over the padded MoE input each layer ([PR #45933](https://github.com/sgl-project/sglang/pull/45933)).
- **Adaptive speculative decoding with two-batch overlap** — removes the static-parameter fallback under TBO ([PR #45956](https://github.com/sgl-project/sglang/pull/45956); roadmap [#23705](https://github.com/sgl-project/sglang/issues/23705)).
- **NPU AscendAttnBackend:** D2H-free block-table gather for mirrorless DSA graph replay ([PR #45949](https://github.com/sgl-project/sglang/pull/45949)).
- **AMD gfx950:** AITER FlyDSL `hc_mix` for Qwen3.8 hyper-connections, low-rank gate fusion on the `[M, 4·2560]` hyper-state ([PR #41880](https://github.com/sgl-project/sglang/pull/41880)).
- **XPU / FLUX.2:** fused bit-exact LayerNorm + gated residual norm Triton kernel ([PR #41942](https://github.com/sgl-project/sglang/pull/41942)).
- **KVShard:** pool-level KV cache sharding for MTP ([PR #40929](https://github.com/sgl-project/sglang/pull/40929)).
- **HiCache:** MLA DCP with file L3 across matching engines, first of a 3-PR stack ([PR #41187](https://github.com/sgl-project/sglang/pull/41187)).
- **Scheduler RFC:** time-budgeted prefill admission for colocated TP serving ([#45415](https://github.com/sgl-project/sglang/issues/45415)).

## 5. Stability & Regressions (ranked by severity)

1. **Kimi-K3 DCP a2a garbled decode on 2-node GB300** — CUDA-graph corruption with NCCL graph buffer registration; 12/12 degraded outputs. Workaround: `NCCL_GRAPH_REGISTER=0`. Two competing fixes open: [PR #45824](https://github.com/sgl-project/sglang/pull/45824) (persistent a2a buffers) vs. #45371 — **do not merge both** ([#45367](https://github.com/sgl-project/sglang/issues/45367)).
2. **GLM-5.3-Flash / fa4 crash on SM120 at CUDA-graph capture** — hybrid extend reshape issue on RTX PRO 6000; Triton is currently the only working attention backend ([#42012](https://github.com/sgl-project/sglang/issues/42012)).
3. **GLM-5.3-Flash on 8×H20 with EAGLE** — CUDA illegal memory access in `run_eagle_verify` → `build_grammar_vocab_mask` ([#45159](https://github.com/sgl-project/sglang/issues/45159)).
4. **Kimi-K3 on SM90:** `flashinfer_mxfp4` silently computes GPT-OSS SwiGLU instead of SiTU — **silent numerical wrongness**, not a crash. Blocked on flashinfer-ai/flashinfer#4209 ([#45755](https://github.com/sgl-project/sglang/issues/45755)).
5. **`--enable-lmcache` crashes scheduler at first idle** in 0.5.22 when radix cache is disabled ([#45929](https://github.com/sgl-project/sglang/issues/45929)).
6. **Priority preemption requeues victims in set order** — can diverge across TP ranks ([#45812](https://github.com/sgl-project/sglang/issues/45812)).
7. **HiCache on hybrid GDN:** host-tier hits drop to zero once evicted working set exceeds ~3 long prefixes (host mamba pool exhausted while KV stays on host) ([#45400](https://github.com/sgl-project/sglang/issues/45400)).
8. **`--max-queued-requests 0` with priority scheduling** crashes scheduler on empty queue ([#45510](https://github.com/sgl-project/sglang/issues/45510)).
9. **Responses API:** replayed Codex turn split into three assistant blocks, teaching the model to end turns before tool calls — an **agent-training/behavior regression** ([#42110](https://github.com/sgl-project/sglang/issues/42110)).
10. **GLM-4.7/GLM-5 tool-call parsing:** newline after function name silently drops the call in non-streaming mode ([#45953](https://github.com/sgl-project/sglang/issues/45953)).
11. **CI:** AMD PR Test failures tracked ([#45847](https://github.com/sgl-project/sglang/issues/45847)); flaky-test tracker remains the top issue by activity ([#42752](https://github.com/sgl-project/sglang/issues/42752)).

## 6. What This Means for Application Developers

- **If you serve Kimi-K3 on multi-node GB300 with DCP, pin NCCL graph registration off** (`NCCL_GRAPH_REGISTER=0`) until the persistent-buffer fix lands, and watch for which of the two competing PRs is merged.
- **If you run GLM-5.3-Flash on consumer/workstation Blackwell (SM120), stay on the Triton attention backend** — fa4 crashes at graph capture.
- **Avoid `--enable-lmcache` with a disabled radix cache** on 0.5.22; it is a hard scheduler crash.
- **Agent builders should validate tool-call round-trips on GLM-4.7/GLM-5** (newline-after-name drop, #45953) and on the Responses API (#42110), since both bugs corrupt multi-turn agent trajectories rather than failing loudly.
- **Benchmark scripts should migrate** to `sglang.benchmark.serving`; the old module is deprecated.
- **Metric-based dashboards** should prepare for the `sglang:` → `sglang_` rename if #45418 is accepted.
- **Watch the AFD stack (#45958)** — if your workload has asymmetric attention/FFN scaling, independently sized A and F groups may become the relevant deployment topology on top of existing P/D disaggregation.

---
*Sources: [sgl-project/sglang](https://github.com/sgl-project/sglang) issues and PRs updated 2026-10-22 to 2026-10-23. Some issue summaries were truncated in the source data; details above reflect available text.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-23

## 1. Today's Highlights

The release train continues at high velocity (builds b11815–b11829 in the last 24h), with the most notable landings being **MiniCPM-OCR 1.0 multimodal support** and **OpenCL depthwise conv2d** for Adreno GPUs. On the server side, two significant API-facing changes landed: typed content input for the RERANK endpoint and fixes to the realtime API's commit/drain semantics. Meanwhile, the SYCL/Intel Arc Pro B70 issue cluster around Gated DeltaNet and F16 NaN output is intensifying, with multiple long-context correctness reports converging on the same kernels — a growing concern for anyone deploying Qwen3.8/Nemotron hybrids on Intel hardware.

---

## 2. Releases & Breaking Changes

- **b11829 — `server: Substitute rerank placeholder from the original template only`** ([#30864](https://github.com/ggml-org/llama.cpp/pull/30864))
  Fixes rerank placeholder substitution behavior; downstream clients relying on the previous (over-broad) substitution may see slightly different templated prompts.

- **b11828 — `server: realtime API: send complete after committed audio drains`** ([#30994](https://github.com/ggml-org/llama.cpp/pull/30994))
  Changes when the `complete` event fires in the realtime API: it now waits for committed audio to fully drain rather than firing on stream-empty as a timing proxy. Any client keying off the previous timing should re-validate.

- **b11818 — `server: support typed content input for RERANK endpoint`** ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625))
  RERANK now accepts typed (multimodal-style) content parts; multimodal rerank input is rejected when the model lacks a rerank chat template. This is an additive API change but expands the input schema.

- **b11826 — `mtmd: add MiniCPM-OCR 1.0 support`** ([#30979](https://github.com/ggml-org/llama.cpp/pull/30979))
  New `PROJECTOR_TYPE_MINICPM_OCR_1_0` reuses the MiniCPM-V 4.6 clip graph and conversion path. No migration required.

*No config-format or GGUF-breaking changes in this window.*

---

## 3. New Model & Hardware Support

| Item | Build/PR | Notes |
|---|---|---|
| **MiniCPM-OCR 1.0** (mtmd) | b11826 / [#30979](https://github.com/ggml-org/llama.cpp/pull/30979) | Registers new projector type over MiniCPM-V 4.6 stack. |
| **Nemotron: non-standard GQA, BPE tokenizer, domyn-small pre-type** | b11819 / [#23343](https://github.com/ggml-org/llama.cpp/pull/23343) | Also writes Metaspace `prepend_scheme` as GGUF metadata. Related fix: Nemotron GGUFs incorrectly tagged `pixtral` — [#30894](https://github.com/ggml-org/llama.cpp/issues/30894) (CLOSED). |
| **OpenCL: depthwise conv2d (Adreno)** | b11827 / [#30900](https://github.com/ggml-org/llama.cpp/pull/30900) | Enables vision/conv paths on Qualcomm mobile GPUs. |
| **OpenCL: initial Q2_K support** (in progress) | [#30999](https://github.com/ggml-org/llama.cpp/pull/30999) | Based on #30180, heavily rewritten. |
| **Hexagon: CONV2D (f16/f32)** | [#30995](https://github.com/ggml-org/llama.cpp/pull/30995) | Tested on v75/v81 Android and v81 WoA; 1021/1021 backend ops pass. |
| **Hexagon: SGN op** | [#30346](https://github.com/ggml-org/llama.cpp/pull/30346) | Motivated by Qwen3.8-Flash-Next (qwen4exp). |
| **SYCL: F16 support for SWIGLU_OAI** | [#30857](https://github.com/ggml-org/llama.cpp/pull/30857) | Kernel previously asserted on F16 despite declaring support. |

Also of architectural interest: **glm5 input optimization** (b11823 / [#30932](https://github.com/ggml-org/llama.cpp/pull/30932)) and **qwen4exp DFlash drafter layer-input fix** (b11822 / [#30927](https://github.com/ggml-org/llama.cpp/pull/30927)).

---

## 4. Performance & Optimization

- **SYCL multi-column XMX mul_mat_vec_q refactor** (b11821 / [#29864](https://github.com/ggml-org/llama.cpp/pull/29864)) — 2–80 activation columns for reordered K-quant and Q8_0 weights on Intel XMX (int8 DPAS, ESIMD).

- **SYCL FA MKL host-wait removal** ([#30684](https://github.com/ggml-org/llama.cpp/pull/30684), CLOSED) — replaced four host waits in the MKL FA kernel with explicit dependency chaining. **~4% improvement on Arc Pro B70**, and a prerequisite for SYCL graph capture.

- **SYCL `ggml_sycl_comm_exchange` fast path** ([#30956](https://github.com/ggml-org/llama.cpp/pull/30956)) — **+19% prompt-eval t/s with `-sm tensor`** on dual Arc Pro B70, bringing tensor split on par with layer split at zero PPL cost.

- **SYCL graph record & replay** ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725), CLOSED) — CUDA graph port; allows reordering data before recording due to async-alloc hangs.

- **RDNA3/4 Vulkan large-tile Split-K optimization** ([#30280](https://github.com/ggml-org/llama.cpp/pull/30280)) — in review; targets prefill with 128×128 tiles at `ubatch=512`.

- **`--act-type f16` global FP16 activations** ([#31011](https://github.com/ggml-org/llama.cpp/pull/31011)) — end-to-end F16 compute graph; motivated by bandwidth-bound accelerators. Default remains f32.

- **MoE expert caching (multiple tracks):**
  - [`llama_moe_cache`](https://github.com/ggml-org/llama.cpp/pull/30966) — run cache-missed experts on CPU, tunable via `--moe-cache-cpu-share`.
  - [GPU-resident LRU cache for host-offloaded MoE experts](https://github.com/ggml-org/llama.cpp/pull/27861) — targets decode throughput on `-ot ...exps=CPU` / `-ncmoe` setups.
  - [`kq_mask` elimination in qwen4exp](https://github.com/ggml-org/llama.cpp/pull/30965) and [glm5-next](https://github.com/ggml-org/llama.cpp/pull/31009) — **saves 2 GB at ub 4096 / 4 GB at ub 8192**, redirectable to expert cache.

- **YaRN `truncate=false` support** ([#30206](https://github.com/ggml-org/llama.cpp/pull/30206)) — CPU + CUDA only for now; other backends mark unsupported.

---

## 5. Stability & Regressions (by severity)

**High — correctness at long context / on hybrid models:**

- **[#30892](https://github.com/ggml-org/llama.cpp/issues/30892) [OPEN] SYCL F16: NaN output on dense Qwen3.8-27B Q4_K_M since #29107** — regression traced to IQ3 code reorder; disabling fused GEMM works around it. Arc Pro B70. *No fix PR yet.*
- **[#30884](https://github.com/ggml-org/llama.cpp/issues/30884) [OPEN] CUDA/HIP flash attention garbage at long context on gfx1201 (RDNA4)** — immediate high-confidence EOS, head_dim 256 (Qwen3.8-27B). Corruption is in prefill. *No fix PR yet.*
- **[#29183](https://github.com/ggml-org/llama.cpp/issues/29183) / [#29167](https://github.com/ggml-org/llama.cpp/issues/29167) [OPEN] SYCL DeltaNet produces token soup on long prompts** — affects Qwen3.6, Qwen3.8, Nemotron on Arc Pro B70. Dense models are fine to 131K+, implicating the recurrent DeltaNet kernel specifically.
- **[#27623](https://github.com/ggml-org/llama.cpp/issues/27623) [OPEN] Qwen3.8-27B hybrid Gated DeltaNet: ~25× decode throughput collapse past ~80K context** — prompt processing stays fast. Reproduced on RTX 4080 SUPER across Windows/WSL. *17 comments, active discussion.*

**Medium — platform-specific:**

- **[#30973](https://github.com/ggml-org/llama.cpp/issues/30973) [OPEN] Metal aborts on MUL_MAT with BF16 src1 at K≥64, batch>8** — no BF16 `mul_mm` kernel exists. Reproducible via `test-backend-ops`.
- **[#27845](https://github.com/ggml-org/llama.cpp/issues/27845) [CLOSED, bug-unconfirmed] Memory leak with `-sm tensor` on dual Intel B70 SYCL.**
- **[#30905](https://github.com/ggml-org/llama.cpp/issues/30905) [CLOSED] Detokenize removes spaces before punctuation** for Gemma 4-family vocabs — `x != y` rendered as `x!= y`. Fixed.
- **[#30894](https://github.com/ggml-org/llama.cpp/issues/30894) [CLOSED] Nemotron GGUFs mis-tagged as `pixtral`** → wrong pre-tokenizer. Fixed.

**Low / long-standing:**

- **[#25790](https://github.com/ggml-org/llama.cpp/issues/25790) [OPEN, security] Instruction injection via `?q=` in WebUI** — still open.
- **[#28158](https://github.com/ggml-org/llama.cpp/issues/28158) [OPEN] Vulkan Qwen3.8 DFlash/MTP emits OOB token id == n_vocab (248320)** on gfx1150.
- **[#20697](https://github.com/ggml-org/llama.cpp/issues/20697) [OPEN] Disk-based context checkpoint offloading (`--cache-disk`)** — 61 👍, most-upvoted enhancement in the list.

---

## 6. What This Means for Application Developers

- **Server API is maturing on two fronts:** RERANK now accepts typed/multimodal content ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625)), and the realtime API's completion timing is now semantically correct rather than timing-approximated ([#30994](https://github.com/ggml-org/llama.cpp/pull/30994)). If you run realtime voice or rerank pipelines, re-test event ordering and input schemas.

- **MoE serving on constrained VRAM is getting real work.** The cluster of PRs around expert LRU caching, CPU-fallback for `llama_moe_cache`, `--moe-cache-cpu-share`, and the `kq_mask` memory savings in qwen4exp/glm5 means multi-GB VRAM budgets can now be redirected to expert residency. If you serve Qwen4exp or GLM5-next, watch [#30965](https://github.com/ggml-org/llama.cpp/pull/30965) and [#31009](https://github.com/ggml-org/llama.cpp/pull/31009) — those are immediate, horizontal memory wins.

- **Intel Arc is simultaneously the most improved and most regressed backend.** You get +19% prompt-eval on tensor-split ([#30956](https://github.com/ggml-org/llama.cpp/pull/30956)), depthwise conv2d for vision, and SYCL graphs — but the F16 NaN regression ([#30892](https://github.com/ggml-org/llama.cpp/issues/30892)) and DeltaNet token-soup issues ([#29183](https://github.com/ggml-org/llama.cpp/issues/29183), [#29167](https://github.com/ggml-org/llama.cpp/issues/29167)) mean any hybrid-attention model (Qwen3.6/3.8, Nemotron) at long context should be pinned to a known-good build or run with `GGML_SYCL_F16=OFF`.

- **Hybrid architectures are the new frontier of instability.** Gated DeltaNet / QSA / linear-attention hybrids (Qwen3.8, Nemotron, glm5-next, qwen4exp) dominate today's bug reports across CUDA, SYCL, and RDNA4. If your agent app targets very long contexts on these families, budget for regression-testing per backend and per build, and monitor Flash Attention + recurrent-state kernels specifically.

- **Mobile/edge inference is quietly expanding:** OpenCL depthwise conv2d for Adreno ([#30900](https://github.com/ggml-org/llama.cpp/pull/30900)), Q2_K on OpenCL ([#30999](https://github.com/ggml-org/llama.cpp/pull/30999)), and Hexagon CONV2D ([#30995](https://github.com/ggml-org/llama.cpp/pull/30995)) together signal that on-device multimodal inference on smartphones is becoming a first-class target.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-10-23

## 1. Today's Highlights
Cloud reliability remains the dominant story: Issue [#15453](https://github.com/ollama/ollama/issues/15453) (Ollama Cloud Pro, ~95% failure rate, 55 comments, 22 👍) continues to dominate community attention, alongside a new wave of local regressions tied to the 0.40.x line. On the engineering side, the `mlx` backend is getting active attention — YaRN scaling support for Qwen3/Qwen3.5 ([#19231](https://github.com/ollama/ollama/pull/19231)) and Nemotron 3.5 Bolt 74B-A9B support ([#19229](https://github.com/ollama/ollama/pull/19229)) both landed as PRs today. A cluster of tool-calling parser fixes (Gemma4, Qwen3-Coder, OpenAI Responses streaming) suggests the team is tightening the OpenAI-compatibility surface.

## 2. Releases & Breaking Changes
- **No releases in the last 24h.** Current shipped version referenced by users across issues is **0.40.8/0.40.9** (see [#19201](https://github.com/ollama/ollama/issues/19201), [#19227](https://github.com/ollama/ollama/pull/19227)).
- **Behavior change:** `SYSTEM ""` in a Modelfile will now *clear* the base model's system prompt instead of being ignored — semantics become `omitted → inherit`, `nonempty → replace`, `empty → clear`. See [#18990](https://github.com/ollama/ollama/pull/18990).
- **Fixed regression:** `typical_p` was removed from the Python API surface and is now rejected with HTTP 400 ([#18480](https://github.com/ollama/ollama/issues/18480), CLOSED).
- **Security:** Go toolchain CVEs across the `ollama` binary continue to be tracked in [#16033](https://github.com/ollama/ollama/issues/16033) and [#19162](https://github.com/ollama/ollama/issues/19162); remediation requires Go 1.26.9+.

## 3. New Model & Hardware Support
- **Nemotron 3.5 Bolt 74B-A9B (MLX):** per-layer expert configs, prequantized affine 3-bit import, mixed-precision expert stacking, LiLiCorr speculative decoding via the DFlash runner. [#19229](https://github.com/ollama/ollama/pull/19229)
- **MLX YaRN scaling** for Qwen3 and Qwen3.5: honors explicit RoPE scaling metadata, mRoPE amplitude scaling, non-rotary dimensions preserved. Fixes [#18256](https://github.com/ollama/ollama/issues/18256). [#19231](https://github.com/ollama/ollama/pull/19231)
- **Gradium Phonon GA checkpoints:** switched from prerelease to GA format, includes default-voice import and speech conditioning (min version 0.40.9). [#19227](https://github.com/ollama/ollama/pull/19227) (CLOSED/merged)
- **DeepSeek-V4.1-Flash-1017** added to cloud catalog. [#19079](https://github.com/ollama/ollama/issues/19079)
- **Cloud model metadata awareness in launchers** — Codex, et al. now see correct `context_window`, thinking levels, and capabilities for cloud models (e.g., `glm-5.2` → 1,048,576). [#19223](https://github.com/ollama/ollama/pull/19223)

## 4. Performance & Optimization
- **Vulkan/AMD RADV regression under investigation:** ~**30× throughput collapse** on the *second identical request* with the bundled llama.cpp host-memory prompt cache enabled, on RX 6600 XT / Ubuntu 24.04.5 / Ollama 0.40.8. Model stays fully GPU-offloaded. [#19201](https://github.com/ollama/ollama/issues/19201)
- **KV connector framework proposal** for pluggable external KV cache backends (LMCache-style) — scoped as a small extensible lifecycle shim. [#17696](https://github.com/ollama/ollama/issues/17696)
- **KV cache type in Modelfile** requested; currently only settable via `KV_CACHE_TYPE` env var. Relevant for 30B-class models that only fit with `q8_0`. [#16245](https://github.com/ollama/ollama/issues/16245)
- **`num_predict == -2`** proposed to fill the context buffer as a dynamic generation limit. [#9547](https://github.com/ollama/ollama/pull/9547)
- **Load/total durations** for model loads proposed as a new server metric. [#9277](https://github.com/ollama/ollama/pull/9277)
- **`dspark` / speculative decode features** requested for significantly faster LLM output. [#17016](https://github.com/ollama/ollama/issues/17016)

## 5. Stability & Regressions
Ranked by severity:

1. **🔴 Cloud Pro service unusable (~95% failure).** 55 comments, 22 👍, still OPEN since 2026-04-09. Affects `glm-5.1:cloud`, `kimi-k2.5:cloud`, `qwen3.5:cloud`, `deepseek-v3.2:cloud`. [#15453](https://github.com/ollama/ollama/issues/15453)
2. **🔴 Generation degeneration on `glm-5.3-flash:cloud`** since 2026-10-12 — 5–8% of requests fail with severe token degeneration, host-side cluster corruption evidenced. 31 comments. [#18980](https://github.com/ollama/ollama/issues/18980)
3. **🟠 MLX `Maximum threads` panic** on macOS after ~1 minute with v0.40.0; kernel requests 1024 threads, HW max 896 (`sdpa_vector_2pass_1_bfloat16_t_256_256_nomask_qnt_c_nos...`). Downgrade to 0.35.1 is the workaround. [#18846](https://github.com/ollama/ollama/issues/18846)
4. **🟠 MLX nvfp4 prefill stall** under single-slot sustained load (`OLLAMA_NUM_PARALLEL=1`): admitted request stalls at `processed=total-1` for minutes; only runner SIGTERM recovers. [#18505](https://github.com/ollama/ollama/issues/18505)
5. **🟠 Vulkan/RADV ~30× slowdown** on second identical request with prompt cache. [#19201](https://github.com/ollama/ollama/issues/19201)
6. **🟠 Windows `/api/chat` connection reset after ~15s** with large prompts (RTX 3090, Qwen3.8-27B). Reproducible on 0.40.4. [#19139](https://github.com/ollama/ollama/issues/19139) — also see [#19113](https://github.com/ollama/ollama/issues/19113) for the same underlying TCP reset when hitting `llama-server` directly.
7. **🟠 Pending eviction cancelled by `keep_alive`** with `OLLAMA_MAX_LOADED_MODELS=1`: a request for a non-resident model stalls for the full `keep_alive` (30m default) because the resident model's eviction is deferred. [#19182](https://github.com/ollama/ollama/issues/19182)
8. **🟡 Silent empty responses** when the model calls a function not in `tools` — response comes back empty with `eval_count > 0`. Seen on 0.40.4–0.40.7 with `qwen3:8b`. [#19187](https://github.com/ollama/ollama/issues/19187)
9. **🟡 JSON schema ignored by cloud models** on `/api/chat` (local `qwen3-coder:30b` fine, `qwen3-coder:480b-cloud` ignores the schema). [#12362](https://github.com/ollama/ollama/issues/12362)
10. **🟡 `/v1/responses` stream** closes mid-reasoning without a terminal event (nemotron-3-super:120b). [#17118](https://github.com/ollama/ollama/issues/17118) — fix PR: preserve failures as one `response.failed` event. [#19225](https://github.com/ollama/ollama/pull/19225)
11. **🟡 `OLLAMA_CONTEXT_LENGTH` not reflected** in `/api/show` or `/api/tags`. [#18995](https://github.com/ollama/ollama/issues/18995)
12. **🟡 `mistral-large-4` cloud rejects `role: "developer"`** with HTTP 400 (blocks Codex clients). [#19021](https://github.com/ollama/ollama/issues/19021) — fix PR: [#19199](https://github.com/ollama/ollama/pull/19199)
13. **🟡 Gemma4 thinking cannot be reliably disabled** via OpenAI-compatible API. [#19217](https://github.com/ollama/ollama/issues/19217)
14. **🟡 Tool-call parser bugs:** Qwen3-Coder dropping calls with literal `</function>` in arguments — fix PR [#19228](https://github.com/ollama/ollama/pull/19228); Gemma4 dropping complete tool calls followed by `$$` noise — fix PR [#19226](https://github.com/ollama/ollama/pull/19226).
15. **🟡 `rnj-1` GGML assert** on SWA hparams since >0.3x. [#18924](https://github.com/ollama/ollama/issues/18924)
16. **🟡 Duplicate model listing** after local compat GGUF migration. [#18830](https://github.com/ollama/ollama/issues/18830)

Fix PRs landed:
- Intermittent `model not found` due to `getExistingName` canonicalization bug — [#18438](https://github.com/ollama/ollama/pull/18438) (CLOSED/merged)
- Grok FA forced off when KV cache quantization is set — [#15050](https://github.com/ollama/ollama/pull/15050)
- App-side swallowed server `Run` error now logged — [#19179](https://github.com/ollama/ollama/pull/19179)
- Preserve last user message during context truncation — [#19058](https://github.com/ollama/ollama/pull/19058)

## 6. What This Means for Application Developers
- **Do not depend on Ollama Cloud for production workloads right now.** The 95%-failure issue on Pro ([#15453](https://github.com/ollama/ollama/issues/15453)) and the ongoing degeneration bug on `glm-5.3-flash:cloud` ([#18980](https://github.com/ollama/ollama/issues/18980)) are unresolved and affect multiple flagship cloud models. Build a local fallback path.
- **Pin your local version.** 0.40.x has a cluster of regressions (MLX `Maximum threads` panic on 0.40.0, Vulkan 30× slowdown on 0.40.8, Windows TCP resets on 0.40.4). 0.35.1 is cited as a stable fallback for macOS MLX users.
- **Tool-calling is the active development frontier.** If you rely on structured tool calls, expect interim parser gaps — literal `</function>` strings, trailing noise after Gemma4 JSON, and silent drops for out-of-schema tool names are all being actively fixed. Validate responses rather than trusting empty payloads, especially when `eval_count > 0` but content is empty ([#19187](https://github.com/ollama/ollama/issues/19187)).
- **OpenAI-compat surface is tightening.** `developer` role handling ([#19199](https://github.com/ollama/ollama/pull/19199)), `response.failed` events on streaming errors ([#19225](https://github.com/ollama/ollama/pull/19225)), and per-launcher cloud model metadata ([#19223](https://github.com/ollama/ollama/pull/19223)) all improve parity with OpenAI clients (Codex, Aider, etc.). If you're routing through a gateway, upgrade once a 0.41.x release lands.
- **KV cache control is coming.** Modelfile-level KV cache type ([#16245](https://github.com/ollama/ollama/issues/16245)), dynamic `num_predict=-2` ([#9547](https://github.com/ollama/ollama/pull/9547)), and the proposed KV connector framework ([#17696](https://github.com/ollama/ollama/issues/17696)) point toward more inference-engine-grade control — useful for memory-constrained 30B+ deployments and for anyone building a gateway that needs deterministic memory budgets.
- **Watch the Vulkan/AMD issue closely** if you run consumer AMD hardware ([#19201](https://github.com/ollama/ollama/issues/19201)): disabling the prompt cache is the current workaround until a fix lands.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-10-23

## Today's Highlights
The dominant story is a **supply-chain compromise of LiteLLM v1.107.0** (Issue [#47826](https://github.com/BerriAI/litellm/issues/47826)): a malicious build shipped via a lookalike repo (`Berri-AI/litellm`) containing a `cook.pth` credential stealer and `sitecustomize` RCE loader. PyPI has removed the release and Docker tags `latest`/`main-latest`/`main-stable` have been yanked, but a backport request ([#47904](https://github.com/BerriAI/litellm/issues/47904)) highlights that stable 1.106.x images still trust a root CA chained to the compromise. Separately, significant work continues on proxy hardening — streaming, cache accounting, router fairness, and a large typing refactor — though no new releases landed in the last 24h.

## Releases & Breaking Changes
- **No new releases in the last 24h.**
- **v1.107.0 withdrawn**: PyPI removed and GHCR/Docker Hub `latest`, `main-latest`, `main-stable` retagged. Users pinned to 1.107.0 must downgrade/pin explicitly and rotate credentials — see [#47826](https://github.com/BerriAI/litellm/issues/47826).
- **1.106.x CA trust gap**: eMudhra root CA fix (#47670) exists only on `main`; backport to `stable/1.106.x` requested for v1.106.3 ([#47904](https://github.com/BerriAI/litellm/issues/47904)).

## New Model & Hardware Support
- **DashScope realtime (WebSocket)** support added, with a custom handler for DashScope's non-OpenAI wire format — PR [#40579](https://github.com/BerriAI/litellm/pull/40579).
- **Speechify TTS** provider added for `/v1/audio/speech`, supporting `simba-3.5`, `simba-3.2`, `simba-3.0` — PR [#47990](https://github.com/BerriAI/litellm/pull/47990).
- **Gemini local token counting** now converts Gemini `contents` before estimation, avoiding HTTP 500 on `/utils/token_counter` — PR [#41286](https://github.com/BerriAI/litellm/pull/41286).
- **Provider requests**: Nano-Gpt UI listing requested ([#34499](https://github.com/BerriAI/litellm/issues/34499)).

## Performance & Optimization
- **Router least-busy fix**: strict less-than comparison caused all traffic to converge on the first deployment when in-flight counts were equal; PR [#23924](https://github.com/BerriAI/litellm/pull/23924) (closed) corrects selection.
- **Latency-based routing race**: lost-update in `async_log_success_event` degrades latency routing to weighted random under concurrency ([#24720](https://github.com/BerriAI/litellm/issues/24720)).
- **Retry-After ignored** for multi-deployment model groups sharing a rate-limited upstream, causing immediate retries ([#34399](https://github.com/BerriAI/litellm/issues/34399)).
- **Streaming retry**: Gemini streams that drop before the first SSE event now retry rather than surfacing an in-stream error at HTTP 200 — PR [#45750](https://github.com/BerriAI/litellm/pull/45750).
- **Type-checking refactor**: 1,181 basedpyright `Any` errors cleared across 431 files; QA reports identical behavior against real OpenAI/Anthropic calls — PR [#47789](https://github.com/BerriAI/litellm/pull/47789).

## Stability & Regressions
Ranked by severity:

1. **Supply-chain compromise (Critical)** — v1.107.0 credential stealer + RCE, lookalike repo. Containment ongoing; CA trust still weak on 1.106.x. [#47826](https://github.com/BerriAI/litellm/issues/47826), [#47904](https://github.com/BerriAI/litellm/issues/47904)
2. **Unbounded upstream error-body ingestion (High)** — a ~114 MB HTTP 400 from a backend triggers event-loop stall and RSS blowup via regex masking. [#34031](https://github.com/BerriAI/litellm/issues/34031)
3. **Postgres max_connections exhaustion (High)** — all user API keys fail in multi-worker proxy when DB pool is saturated. [#34479](https://github.com/BerriAI/litellm/issues/34479)
4. **Deleted team keys remain auth-valid (High)** — `POST /team/delete` doesn't evict from auth cache (contrast with `/key/delete`). [#34217](https://github.com/BerriAI/litellm/issues/34217)
5. **Transient DB outage → "Invalid model name" (Medium)** — workers under HAProxy/Postgres blips reject valid models. [#26237](https://github.com/BerriAI/litellm/issues/26237)
6. **Timeout reports "None seconds"** ([#14635](https://github.com/BerriAI/litellm/issues/14635)); **UI login redirect to container IP behind nginx** ([#30118](https://github.com/BerriAI/litellm/issues/30118)); **Bedrock stale SigV4 replay on retry** ([#27513](https://github.com/BerriAI/litellm/issues/27513)); **custom pricing `input_cost_per_token: 0` overwritten on reload** ([#30081](https://github.com/BerriAI/litellm/issues/30081)); **`response_cost=null` when provider differs from pricing row** ([#47675](https://github.com/BerriAI/litellm/issues/47675)).
7. **Claude Code / Anthropic adapter edge cases** — streaming `tool_use.input` dropped for Gemini/Gemma ([#25390](https://github.com/BerriAI/litellm/issues/25390)); unsupported `reasoning.effort` on Azure Foundry ([#27091](https://github.com/BerriAI/litellm/issues/27091)); `thinking.type=adaptive` rejected by complexity router ([#26224](https://github.com/BerriAI/litellm/issues/26224)); `drop_params` ignored on Anthropic→Responses metadata mapping ([#26241](https://github.com/BerriAI/litellm/issues/26241)); passthrough PR preserves adaptive thinking [#41243](https://github.com/BerriAI/litellm/pull/41243).
8. **Cost-accounting semantics** — cache hits zero spend but replay original token counts, raising an open question on which basis to aggregate ([#39057](https://github.com/BerriAI/litellm/issues/39057)).

## What This Means for Application Developers
- **Treat v1.107.0 as hostile.** If you built anything against it, rotate API keys, cloud credentials, and any secrets reachable from the process; verify your image digests against pre-1.107.0 tags; do not trust `latest`/`main-stable` until upstream re-announces.
- **Pin digests, not tags.** The tag-retagging during the incident shows floating tags are not a safety boundary. Pin by SHA and use a private mirror with admission control.
- **Guard multi-tenant proxies.** The Postgres exhaustion and stale team-key bugs mean a single noisy neighbor can invalidate auth across all tenants — cap connections per worker and audit `/team/delete` cache invalidation in your deployment.
- **Budget for error-body limits.** If you route to OpenAI-compatible backends that can emit large validation dumps, front LiteLLM with a body-size cap; the event-loop stall in [#34031](https://github.com/BerriAI/litellm/issues/34031) is a DoS-class issue.
- **Expect incremental routing fixes.** Latency-based routing under load is unreliable until [#24720](https://github.com/BerriAI/litellm/issues/24720) and [#34399](https://github.com/BerriAI/litellm/issues/34399) land — prefer weighted or least-busy with the patched PR (#23924) for fairness-critical workloads.
- **Cache accounting needs a decision.** If you bill per-token, reconcile cache-hit rows ([#39057](https://github.com/BerriAI/litellm/issues/39057)) before monthly close, or you'll double-count tokens against zero spend.
- **Agent/serving integrations improving**: DashScope realtime, Speechify TTS, and Gemini token counting fixes broaden the multi-modal surface; Claude Code paths continue to accumulate narrow adapter bugs, so test tool-calling and `thinking` configs end-to-end per provider.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-10-23

## 1. Today's Highlights

No new releases shipped in the last 24h, but the PR queue is unusually active: a large batch of `danielhanchen`-authored PRs landed, headlined by a **Studio "Flows" stack** (#14730 and its dependents #14889–#14893) that turns notebooks, benchmarks, evals and image/video pipelines into composable flow blocks. On the inference side, **FP8 dequant was collapsed to a single Triton pass** (#14886) and a **ROCm flash-attention bucket-recompile fix** (#14869) targets a real throughput cliff. Stability work focuses on **GGUF loads crashing Windows Studio hosts** (#14513 → fix #14514) and **assistant-message editing** (#13938, closed).

---

## 2. Releases & Breaking Changes

No new releases, tags, or version bumps in the last 24h. One operational breaking change worth noting for CI consumers:

- **`uv` pinned to 0.13.5, older-than-0.13.4 replaced** — Addresses GHSA-hq85-5cpj-mr62 (emSign ECC Root CA G3 weak-key intermediates). Installer environments will be forced forward. [PR #14894](https://github.com/unslothai/unsloth/pull/14894)
- **pre-commit.ci load complaint resolved** — `scripts/enforce_kwargs_spacing.py` was flagged as massively unoptimized and consuming disproportionate CI compute across the ecosystem ([#14174](https://github.com/unslothai/unsloth/issues/14174), closed). Follow-up formatting PR [#14885](https://github.com/unslothai/unsloth/pull/14885) corrects two files merged unformatted in #14821/#14886.

---

## 3. New Model & Hardware Support

- **DeepSeek-V4.1-Flash (`deepseek41-dspark`) fails to load in Studio** — Bundled llama.cpp build does not recognize the architecture. Users need a newer llama.cpp; no fix PR yet. [Issue #14695](https://github.com/unslothai/unsloth/issues/14695)
- **Larger chat templates (up to 8 MB)** — Current 64 KB cap blocks models such as DavidAU's ~230 KB templates; llama.cpp's Jinja limit is 8 MB. [Issue #14841](https://github.com/unslothai/unsloth/issues/14841)
- **MoE hot/cold expert split across GPU+CPU** — Requested feature for hybrid expert placement on new MoE checkpoints. [Issue #14484](https://github.com/unslothai/unsloth/issues/14484)
- **OmniVoice inference + LoRA/full fine-tune in Studio UI** — Feature request for first-class UI support. [Issue #14660](https://github.com/unslothai/unsloth/issues/14660)
- **Intel XPU / Apple MPS VRAM capping for training** — Partial; GGUF inference VRAM Budget landed in #8589, XPU/MPS training caps and image-gen honoring the budget still pending. [Issue #8178](https://github.com/unslothai/unsloth/issues/8178)
- **DGX Spark two-node clustering + pipeline training** — GB10/aarch64/sm_121a with ConnectX-7 200GbE; measured on real hardware. Still in review. [PR #10280](https://github.com/unslothai/unsloth/pull/10280)
- **Vulkan fallback ladder corrected for Arc/ROCm** — A single transient Vulkan "device lost" no longer counts as a strike; UHD iGPUs co-resident with a discrete card no longer veto Vulkan. [PR #14610](https://github.com/unslothai/unsloth/pull/14610)

---

## 4. Performance & Optimization

- **FP8 per-tensor / rowwise dequant → single Triton pass** — `weight_dequant` previously wrote a 16-bit copy then read it back to scale; now one pass over e4m3fn bytes. Directly reduces cost of every LoRA backward on FBGEMM and compressed-tensors rowwise FP8 checkpoints. [PR #14886](https://github.com/unslothai/unsloth/pull/14886) (merged)
- **ROCm flash-attention: eliminate per-bucket recompiles** — Bucket edges were guarding on symbolic query length, so crossing a power-of-two boundary forced recompilation. Verdicts are now cached; CFG replica also gated. [PR #14869](https://github.com/unslothai/unsloth/pull/14869)
- **RoPE cache cold-build under `torch.compile`** — A lazy per-device cache built inside a compiled region re-traced because `torch.is_inference_mode_enabled()` is untraceable by Dynamo; fix under review. [PR #14728](https://github.com/unslothai/unsloth/pull/14728)
- **GRPO LoRA weight-sync to TRL's vLLM engine (TRL < 0.28)** — With `use_vllm=True, fast_inference=False` on TRL 0.22–0.27, `_move_model_to_vllm` returned early for PEFT/quantized models, meaning *every rollout for the entire run used initial weights* while appearing to train. Fix now pushes LoRA weights correctly and refuses quantized bases. This is a correctness fix with major throughput/quality implications. [PR #14831](https://github.com/unslothai/unsloth/pull/14831)
- **Pre-tokenized dataset masking bug** — `completion_mask` / `assistant_masks` were not truncated alongside `input_ids`/`labels`, and TRL's collator applies them to the wrong span. [PR #14884](https://github.com/unslothai/unsloth/pull/14884)
- **Native FSDP2 unsharded generation on torch 2.6/2.7** — Custom `Accelerator` loops silently fell back to plain DDP (no param/optimizer sharding) since #14273. [PR #14882](https://github.com/unslothai/unsloth/pull/14882)

---

## 5. Stability & Regressions (ranked)

1. **GRPO training silently no-op on TRL 0.22–0.27** — Entire runs trained on stale rollout weights. Fix PR [#14831](https://github.com/unslothai/unsloth/pull/14831). *Highest severity: silent correctness failure.*
2. **Studio GGUF load crashes Windows server** — Exhausts system commit instead of taking the low-memory path (Windows 10 22H2). Fix PR [#14514](https://github.com/unslothai/unsloth/pull/14514). [Issue #14513](https://github.com/unslothai/unsloth/issues/14513)
3. **CPU conversation-archive embedding stalls inference, Stop ineffective** — Long tool-heavy chats on v0.1.909-beta (Ryzen AI MAX+ 395) spend minutes in CPU embedding before llama.cpp sees the request. Stop does not cancel archiving. [Issue #14519](https://github.com/unslothai/unsloth/issues/14519) — *open, no fix PR*
4. **Attachments become permanently unreadable after auto-compaction; `search_conversation` never invoked** — Data loss on long conversations. [Issue #14708](https://github.com/unslothai/unsloth/issues/14708) — *open*
5. **Multi-user LAN model sync** — Multiple accounts on one local inference server do not see the currently loaded model. [Issue #12365](https://github.com/unslothai/unsloth/issues/12365) — closed.
6. **Intel XPU LoRA inference mixes GNU/MSVC linker args on Windows** — Build failure on Windows 10 26200. [Issue #14807](https://github.com/unslothai/unsloth/issues/14807) — *open*
7. **Models with remote code can't be exported from the UI**. [Issue #14688](https://github.com/unslothai/unsloth/issues/14688) — *open*
8. **Lemonade & FastFlowLM chat/models stopped working** after initial successful setup on Ryzen AI 7 350 / Ubuntu 26.10 (regression of #11743). [Issue #14650](https://github.com/unslothai/unsloth/issues/14650) — *open*
9. **Qwen3-ASR ignores requested transcription language in mtmd backend**. [Issue #14547](https://github.com/unslothai/unsloth/issues/14547) — closed.
10. **Context parallel unsupported for Qwen3.5 GatedDeltaNet** (40 layers, 30 recurrent) — no FSDP2 sharding for the hybrid. [Issue #12051](https://github.com/unslothai/unsloth/issues/12051) — closed.

---

## 6. What This Means for Application Developers

- **If you're running GRPO on TRL < 0.28 with `use_vllm=True` and `fast_inference=False`, your training was almost certainly a no-op.** Upgrade TRL or apply #14831 before trusting any GRPO results. This is the single most consequential item in this digest.
- **Windows Studio users loading large GGUFs should hold until #14514 merges** — the current failure mode is a hard server crash rather than a graceful low-memory fallback.
- **Watch the Studio Flows stack (#14730 + #14889–#14893).** Job polling, partial outputs, bindable params, a GPU lease, and native notebook/benchmark/eval blocks are arriving as opt-in primitives. Existing flows are unchanged, but this is the direction for anyone scripting multi-step pipelines on top of Unsloth today.
- **Custom-header support for remote providers (#14811) is still missing** — if you route through LiteLLM and depend on headers for tracking or feature selection, you cannot pass them yet.
- **FP8 checkpoint users get a real backward-pass win** from #14886 with no API change; safe to adopt.
- **Long-conversation agents on Desktop should be audited for the archive-embedding stall (#14519) and post-compaction attachment loss (#14708)** — both affect agentic tool-heavy workloads specifically and have no fixes yet.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*