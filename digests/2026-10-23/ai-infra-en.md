# AI Infrastructure Digest 2026-10-23

> Generated: 2026-10-23 04:29 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Report — 2026-10-23

## 1. Ecosystem Overview

The AI infrastructure stack is in a **correctness-over-features phase**: across all six projects, high-severity stability regressions (silent KV contamination, supply-chain compromise, wrong-activation kernels) dominate the tracker relative to new model announcements. Frontier model support has consolidated around a small set of architectures — DeepSeek-V4.x, Qwen3.8, Kimi-K3, GLM-5.x, Nemotron 3.5 — and the competitive race is now about *day-0 checkpoint coverage per hardware tier* rather than net-new model classes. Hardware diversification is real but uneven: NVIDIA Blackwell/SM120/GB300 and AMD ROCm/MI355X dominate perf work, while Ampere (SM8x) and Intel SYCL are increasingly second-class citizens on the newest checkpoints. On the gateway and training layers, the story is risk management — LiteLLM's `1.107.0` supply-chain event and Ollama Cloud Pro's long-running outage are reminders that the "boring" middle of the stack carries outsized blast radius. Meanwhile, workflow/agent-authoring surfaces (Unsloth Flows, SGLang diffusion, llama.cpp realtime audio) are expanding, pushing serving engines into application-platform territory.

## 2. Activity Comparison

| Project | Layer | Open Issues Highlighted | PRs Highlighted | Release Status (24h) | Dominant Signal |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~7 (incl. 2 silent-corruption) | ~10+ | None | DSv4.1 graph capture + PD-KV correctness |
| **SGLang** | Serving engine | ~10 (incl. scheduler crash) | ~8 | None | GLM/Kimi correctness + diffusion host-sync |
| **llama.cpp** | Local runtime | ~8 | ~10 | **7 releases (b11815–b11829)** | SYCL perf + long-context bugs |
| **Ollama** | Local runtime + cloud | ~10 | ~5 | None | Cloud outage + Windows regressions |
| **LiteLLM** | Gateway | ~20+ | ~10 | None (yank, no release) | Supply-chain compromise |
| **Unsloth** | Fine-tuning platform | ~9 | ~7 | None | Flows node editor + multi-node GGUF |

Note: counts reflect digest-highlighted items only, not exhaustive trackers. llama.cpp is the only project with a shipping release cadence; LiteLLM's "no release" is a *yank*, not a quiet day.

## 3. Model Support Race

**Frontier model coverage is converging, but hardware-tier coverage diverges sharply.**

| Model / Arch | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| DeepSeek-V4.1 / V4-Flash | ✅ (SM100 first; SM8x pending #50576) | ✅ (ROCm prefill CP #43465) | ⚠️ DSv4.1-Flash-1017 load fail #14695 | ❌ | ⚠️ sidecar fix #14431 |
| Kimi-K3 | — | ✅ (with caveats: GB300 #45367, SM90 #45755) | — | ❌ | ❌ |
| GLM-5.3-Flash / GLM5 | — | ✅ (SM90 perf #45373, SM120 #42012) | ✅ (GLM5 input opts) | ⚠️ cloud degeneration #18980 | ❌ |
| Qwen3.8 / Qwen4exp | ✅ (ROCm MI355X) | — | ✅ (DFlash, kq_mask elim #30965) | ✅ (cloud only) | ❌ |
| Nemotron 3.5 Bolt | — | — | ✅ (GQA/tokenizer #23343) | ✅ (MLX 74B-A9B #19229) | ❌ |
| MiniCPM-OCR 1.0 / MOSS-Image | — | ✅ SANA-Sprint | ✅ MiniCPM-OCR | ❌ | ✅ MOSS-Image |
| Muse Spark | ✅ (ROCm MoE #63263) | ✅ (Day-0 #44664–67) | ❌ | ❌ | ❌ |

**Who's ahead:** vLLM and SGLang are the day-0 frontier engines, but both gate the newest DeepSeek checkpoints behind SM90+/Blackwell — leaving A100/A800 and consumer Ampere out. llama.cpp has the broadest *breadth* of model support (Nemotron, GLM5, MiniCPM, MOSS) but trails on the very newest DeepSeek family. Ollama leads on turnkey MLX/Nemotron packaging for Mac and DGX Spark. Unsloth is the outlier: focused on multimodal + GGUF + multi-node rather than raw frontier LLM coverage.

## 4. Performance Frontier

Optimization effort is concentrated in **five clusters**, with clear project specialization:

- **KV cache & prefix reuse** — SGLang's HiCache hybrid-GDN bug (#45400) and LiteLLM's cache-hit accounting (#39057) show KV reuse is now a *correctness surface*, not just a perf lever. vLLM's Nixl lease-expiry (#61229) is the sharpest example.
- **Quantization & low-bit kernels** — llama.cpp (`GGML_TYPE_BF16X` at 11.5 bpw, `--act-type f16`, OpenCL q2_k), vLLM (Humming > Machete on SM90, MXFP4 MoE), and Ollama (nvfp4 prefill) are all racing on low-bit paths. Silent wrong-math (SGLang `flashinfer_mxfp4` → GPT-OSS SwiGLU, #45755) is the emerging hazard.
- **Distributed serving** — DeepSeek-V4.1 arbitrary PP (vLLM #63106), ROCm TP MoE down-projection (#63263), SYCL tensor-parallel +19% (llama.cpp #30956), multi-node GGUF over RPC (Unsloth #13726). Moore's-law-style gains now come from *topology*, not single-GPU kernels.
- **CUDA graphs & replay** — vLLM decoder replay (#63155), SGLang DSv4.1 >16K prefill replay (#45941), Unsloth diffusion graph teardown (#14867). Graph capture is the default optimization target; failures under capture are the top new bug class.
- **Kernel-level attention** — PrimTS on Blackwell (vLLM), FA4 crashes on SM120 (SGLang), `kq_mask` elimination saving ~2 GB (llama.cpp). Attention kernels remain the highest-leverage, highest-risk area.

Diffusion/video also emerged as a distinct perf lane (SGLang host-sync elimination, Unsloth allocator flush), signaling the multimodal serving workload is now large enough to warrant its own optimization track.

## 5. Layer Positioning

The six projects occupy four distinct layers, with meaningful overlap emerging:

- **Serving engines (vLLM, SGLang)** — High-throughput, multi-GPU, disaggregated P/D, production LLM endpoints. Both target OpenAI-compatible APIs plus advanced disaggregated surfaces. vLLM leans toward hardware breadth and Rust-frontend experimentation; SGLang leans toward diffusion/multimodal and AMD parity.
- **Local runtimes (llama.cpp, Ollama)** — Single-node, GGUF/MLX-centric, broad hardware (SYCL, Vulkan, Metal, ROCm, CPU). llama.cpp is the kernel/backend lab; Ollama is the productized wrapper with a cloud tier. Both now offer realtime audio, rerank, and structured output — encroaching on serving-engine territory.
- **Gateway (LiteLLM)** — Cross-provider routing, auth, spend tracking, Claude Code/Anthropic translation. Sits in front of everything else; its reliability and security posture directly gate the rest of the stack.
- **Training/fine-tuning (Unsloth)** — LoRA/full finetune, quantization export, and now a full pipeline/agent-authoring surface (Flows). Increasingly overlaps with gateway and serving layers as Studio becomes a self-hosted platform.

**Overlap warning:** serving engines are adding gateway-like features (structured output, routing, render/generate APIs), gateway is adding translation that edges toward engine semantics, and Unsloth is adding workflow orchestration. Integration boundaries are blurring — expect more friction at these seams.

## 6. Trend Signals

1. **Silent correctness is the new reliability frontier.** Three of today's most severe bugs (vLLM #61160 cross-request KV leak, SGLang #45755 wrong activation, LiteLLM #34217 stale auth cache) fail *silently* — no crash, no log, just wrong answers. Application developers must budget for output-validation and canary testing, not just uptime monitoring.
2. **The supply chain is now a first-class infra risk.** LiteLLM `1.107.0` (`cook.pth` stealer + `sitecustomize` RCE) and the ongoing Ollama Go/CVE cluster show dependency hygiene is a top-tier concern. Pin, audit, and verify root CAs — the backport gap (#47904) means even "safe" 1.106.x images carry residual risk.
3. **Hardware tiering is hardening, not softening.** Blackwell/SM120/GB300 get day-0 love; Ampere and Intel SYCL get correctness bugs and perf debt. Teams on non-frontier hardware should plan around *lag*, not parity.
4. **Agent workloads are exposing soft-fail parser bugs.** GLM tool-call drops (SGLang #45953, #42110), Ollama silent tool drops (#19187), LiteLLM Claude Code translation gaps (#26224) — agent loops are brittle in ways that don't surface in chat benchmarks. Test tool-calling end-to-end per backend.
5. **Multimodal + diffusion serving is graduating from demo to production lane.** SANA-Sprint, MiniMax-H3 FP8 VAE, LTX-2 CFG sharding, MOSS-Image, MiniCPM-OCR — enough parallel activity to warrant dedicated GPU capacity planning.
6. **Workflow/authoring surfaces are the new battleground.** Unsloth Flows, SGLang diffusion pipelines, and vLLM's disaggregated render/generate APIs all push these projects up the stack. Agent developers should watch for *convergence* — the same app may soon target all three.

**What to watch next:** whether vLLM/SGLang close the Ampere gap on DeepSeek-V4.x (SM8x support), whether LiteLLM ships a clean 1.106.3 backport, and whether any project ships a *verifiable* correctness test harness for KV-cache reuse — the industry's largest silent-failure surface today.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-23

## 1. Today's Highlights

No new releases landed in the last 24h, but issue and PR activity remains intense across three fronts: DeepSeek-V4.1 (DSv4.1) graph capture and pipeline-parallel work (PRs #63264, #63155, #63106), a cluster of correctness bugs around disaggregated prefill/decode KV reuse (#61229, #61160), and a batch of ROCm/MI355X performance optimizations for quantized MoE models (#63263, #57149, #59575). The Rust frontend continues its march toward feature parity (#44280) with a dependency rebase onto `llm-multimodal` v1.14 (#59854).

## 2. Releases & Breaking Changes

None in the last 24h. Note that several open PRs touch parameter lifecycle semantics under `process_weights_after_loading` (e.g., [#62407](https://github.com/vllm-project/vllm/pull/62407)), which may affect custom quantized model implementations once merged.

## 3. New Model & Hardware Support

- **[SM8x support for DeepSeek-V4-Flash](https://github.com/vllm-project/vllm/issues/50576)** — Feature request (118 comments, the most-discussed issue today) to enable Ampere A100/A800 and RTX 30xx support for `DeepSeek-V4-Flash` / `-0731` checkpoints, which currently only run on newer arches.
- **[PrimTS attention for Step5 on Blackwell](https://github.com/vllm-project/vllm/pull/62550)** — Opt-in PrimTS DSA and sliding-window attention for SM100/103/107, BF16 and E4M3 QKV; requires an upstream FlashInfer patch.
- **[Arbitrary PP partitions for DeepSeek-V4.1](https://github.com/vllm-project/vllm/pull/63106)** — Removes the restriction that a pipeline cut cannot fall inside a KV-sharing layer group.
- **[Rust frontend rebased to llm-multimodal v1.14](https://github.com/vllm-project/vllm/pull/59854)** — Keeps the Rust path current with the multimodal crate; still gated behind `VLLM_USE_RUST_FRONTEND=1`.

## 4. Performance & Optimization

- **[DSv4.1 prefill index sentinels](https://github.com/vllm-project/vllm/pull/63264)** — Replaces a full sparse-index workspace memset with `-1` sentinel writes from the combine kernel, removing one CUDA launch and a full-row write per prefill layer.
- **[DSv4.1 decoder replay graph capture](https://github.com/vllm-project/vllm/pull/63155)** — Captures replay graphs on the model graphs' stream to reuse the shared graph pool; targets GB200 prefill.
- **[ROCm/TP MoE down-projection for Muse Spark](https://github.com/vllm-project/vllm/pull/63263)** — Column-shards the MXFP4 MoE down projection at TP > 1, replacing a reduce-scatter with smaller gathers for prefill batches ≥1024 tokens.
- **[Humming before Machete on SM90](https://github.com/vllm-project/vllm/pull/63265)** — 4-bit weight-only linear layers (GPTQ/AWQ/compressed-tensors W4A16) now prefer Humming over Machete on Hopper.
- **ROCm MI355X trackers**: [#57149](https://github.com/vllm-project/vllm/issues/57149) (Qwen3.8-2.4T-A95B) and [#59575](https://github.com/vllm-project/vllm/issues/59575) (Qwen3.8-Flash-Next) continue landing stacked PRs.
- **[GB10/DGX Spark weight loading](https://github.com/vllm-project/vllm/issues/58726)** — Per-tensor H2D copies from safetensors mmap views are flagged as a platform-specific cost on GB10.

## 5. Stability & Regressions

Ranked by severity:

1. **[NixlConnector lease-expiry race](https://github.com/vllm-project/vllm/issues/61229)** — KV blocks released while a remote READ is in flight; decode silently consumes overwritten KV. Silent data corruption. No fix PR referenced.
2. **[Cross-request KV contamination in PD disaggregation](https://github.com/vllm-project/vllm/issues/61160)** — With automatic prefix caching enabled in a NIXL P/D deployment on DeepSeek-V4.1-Flash, responses intermittently leak content from other requests. Reproducible; clean with `--no-enable-prefix-caching`.
3. **[Qwen3.8-Flash-Next prompt truncation on GB10](https://github.com/vllm-project/vllm/issues/62776)** — Content beyond ~2048 tokens (`indexer_budget`) is invisible to the model on sm121 nightlies.
4. **[HiSparse trtllm-gen out-of-bounds read](https://github.com/vllm-project/vllm/pull/61659)** — Random `illegal memory access` in sparse MLA prefill; fix PR pads staged KV.
5. **[PP2 tool-calling garbling on ROCm](https://github.com/vllm-project/vllm/issues/46262)** — GLM-5.2-FP8 DSA with chunked prefill and PP2 produces garbled output; PP1 is fine.
6. **[Qwen3.5 json_schema garbled spaces](https://github.com/vllm-project/vllm/issues/38696)** — Structured output regression persists.
7. **[DeepSeek-VL2 encoder-cache collision](https://github.com/vllm-project/vllm/pull/63120)** — Fix PR open for cache identity across cropping modes.

## 6. What This Means for Application Developers

- **Avoid prefix caching in NIXL P/D deployments for now.** #61160 is silent, probabilistic cross-request contamination — the worst failure mode for multi-tenant serving. Until fixed, run with `--no-enable-prefix-caching` if you use PD disaggregation.
- **Treat lease-based KV pull flows as unsafe under load.** #61229 means decode can consume stale KV without erroring; monitor for accuracy anomalies rather than crashes.
- **Ampere users are still the have-nots for the newest DeepSeek checkpoints.** If you're on A100/A800, #50576 is the issue to track before planning a DeepSeek-V4-Flash rollout.
- **Disaggregated serving APIs are stabilizing.** The render/generate/derender surface is getting consistent semantics across streaming and batch paths (#63148, #42729, #47161) — worth tracking if you're building on the disaggregated endpoints rather than `/v1/chat/completions`.
- **Rust frontend is not production-ready.** #44280 explicitly labels it experimental; enable only for evaluation.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-23

## 1. Today's Highlights

No new releases landed in the last 24h, but the tracker is dense with GLM-5.3-Flash and Kimi-K3 correctness work across SM90/SM120/GB300, plus a fresh high-severity scheduler crash with `--enable-lmcache`. On the performance side, a wave of diffusion host-sync elimination PRs (Cosmos3, Qwen-Image-2.1, LTX-2) and DeepSeek-V4 prefill/C4-indexer tuning landed in review. The long-running flaky-CI tracker continues to dominate comment volume, signaling ongoing CI infrastructure debt that may slow PR velocity.

## 2. Releases & Breaking Changes

No new releases in the last 24h. Note one active crash affecting v0.5.22 configuration compatibility (radix cache + LM cache interaction, see §5), which users on that version should be aware of.

## 3. New Model & Hardware Support

- **[Feat] diffusion: Native SANA-Sprint support** — adds native handling for `SanaSprintPipeline`/`SCMScheduler`, closing #43671. 0.6B text-to-image model targeting 1–4 inference steps at 1024px. [PR #45960](https://github.com/sgl-project/sglang/pull/45960)
- **[Roadmap][Feature] Support T-Head PPU** — roadmap to upstream first-class support for T-Head SAIL (Zhenwu 810/810E, M890P). [Issue #37519](https://github.com/sgl-project/sglang/issues/37519)
- **[Feat] [CPU] cpu-graph: prefill torch.compile graphs + dynamic shape fallback on Intel AMX** — extends CPU graph capture beyond decode. [PR #44394](https://github.com/sgl-project/sglang/pull/44394)
- **[Feat] [AMD] DeepSeek-V4.1: Support prefill context parallel** — CP support for DSv4.1 prefill on ROCm. [PR #43465](https://github.com/sgl-project/sglang/pull/43465)
- **[Roadmap] Muse Spark Open Development & Optimization** — Day-0 PR split (#44664–#44667), depends on DeepGEMM patch + release bump. [Issue #44678](https://github.com/sgl-project/sglang/issues/44678)

## 4. Performance & Optimization

- **DeepSeek-V4.1 prefill graph replay past 16K on SM90** — SM90 now replays DeepSeek-V4.1 prefill CUDA graph past 16K contexts (matching SM100); captured metadata is width-independent. [PR #45941](https://github.com/sgl-project/sglang/pull/45941)
- **DeepSeek-V4 C4 indexer: score verify rows as one request** — eliminates per-draft-row key re-reads in static MTP verify (builds on #45251's DSv4.1 ratio-1/2 fix). [PR #45378](https://github.com/sgl-project/sglang/pull/45378)
- **DSpark draft: bf16→fp32 mHC stream copy removed** — kernel already widens on load; eliminates a full `[tokens, hc_mult*hidden]` fp32 materialization. [PR #45964](https://github.com/sgl-project/sglang/pull/45964)
- **Diffusion host-sync elimination** — three PRs remove blocking `.item()` reads on the denoising critical path: Cosmos3/Qwen-Image-2.1 per-step and per-request syncs ([#45967](https://github.com/sgl-project/sglang/pull/45967)) and LTX-2 sigma reads ([#45966](https://github.com/sgl-project/sglang/pull/45966)).
- **LTX-2 stage-2 CFG sharding** — stage 2 (distilled refiner) now shards over CFG ranks as Ulysses; previously one GPU was idle for all of stage 2 at 768x512x121 on 2×H200. [PR #45965](https://github.com/sgl-project/sglang/pull/45965)
- **MiniMax-H3 video VAE** — online FP8 decoder (36 ViT blocks / 144 FP16 linears; decode was 3.26s of a 30s pipeline on 4× RTX PRO 5000) [PR #45180](https://github.com/sgl-project/sglang/pull/45180); batched tile decode + fused output chain [PR #45179](https://github.com/sgl-project/sglang/pull/45179).
- **GLM-5.3-Flash Hopper (SM90) perf tracking** — Q4 roadmap item under kernel optimization. [Issue #45373](https://github.com/sgl-project/sglang/issues/45373)

We note #45378 is explicitly marked "by Claude Code" and #45941-style changes are perf-sensitive; verify numbers against your workload.

## 5. Stability & Regressions

Ranked by severity:

1. **`--enable-lmcache` + disabled radix cache → scheduler crash at first idle (v0.5.22)** — affects embedding-mode models where radix cache is auto-disabled, and explicit `--disable-radix-cache`. New today, no fix PR referenced. [Issue #45929](https://github.com/sgl-project/sglang/issues/45929)
2. **Kimi-K3 DCP a2a garbled decode on 2-node GB300 (MNNVL)** — 12/12 degenerate outputs under CUDA graphs with NCCL graph registration; `NCCL_GRAPH_REGISTER=0` restores output. Production-impacting for GB300 MNNVL TP8/DCP8. No fix PR referenced. [Issue #45367](https://github.com/sgl-project/sglang/issues/45367)
3. **GLM-5.3-Flash on SM120: fa4 crashes at CUDA-graph capture (hybrid extend reshape)** — triton is the only working backend; 8× RTX PRO 6000, v0.5.20 image. [Issue #42012](https://github.com/sgl-project/sglang/issues/42012)
4. **Kimi-K3 on SM90: `flashinfer_mxfp4` silently computes GPT-OSS SwiGLU instead of SiTU** — silent wrong-math, not a crash; depends on flashinfer-ai/flashinfer#4209. v0.5.22 / main @ ce66b3ab. [Issue #45755](https://github.com/sgl-project/sglang/issues/45755)
5. **GLM-5.3-Flash on 8×H20 (TP8/EP8) with EAGLE: CUDA illegal memory access** in `run_eagle_verify` → `build_grammar_vocab_mask`, v0.5.22. [Issue #45159](https://github.com/sgl-project/sglang/issues/45159)
6. **NVFP4 KV cache + speculative decoding incompatible** — `extend_prefix_lens_cpu is None` in FlashInfer dequant workspace; crashes any target-verify step on SM120 + NEXTN. [Issue #36010](https://github.com/sgl-project/sglang/issues/36010)
7. **Scheduler priority preemption requeues victims in set order** — can diverge across TP ranks. [Issue #45812](https://github.com/sgl-project/sglang/issues/45812)
8. **HiCache on hybrid GDN: host-tier hits drop to zero** once evicted working set exceeds ~3 long prefixes (host mamba pool exhausted while KV remains on host). [Issue #45400](https://github.com/sgl-project/sglang/issues/45400)
9. **Responses API (Codex): replayed turn split into three assistant blocks** — phase check in `_merge_consecutive_assistant_messages` causes model to emit premature turn end before tool calls. Agent-behavior impact. [Issue #42110](https://github.com/sgl-project/sglang/issues/42110)
10. **GLM-4.7/GLM-5 non-streaming tool parsing drops calls** when function name is followed by newline (`Glm47MoeDetector.detect_and_parse`). [Issue #45953](https://github.com/sgl-project/sglang/issues/45953)

Related structural work: flaky-test tracker [Issue #42752](https://github.com/sgl-project/sglang/issues/42752) (123 comments) and AMD `PR Test` failure tracker [Issue #45847](https://github.com/sgl-project/sglang/issues/45847) (`test_deepseek_v4_flash_fp4.py` ImportError).

## 6. What This Means for Application Developers

- **Pin carefully if you rely on caching layers.** v0.5.22's LM cache + radix-cache interaction is a hard crash in a common embedding-model configuration; avoid `--enable-lmcache` on versions before the fix, or keep radix cache enabled. Track [#45929](https://github.com/sgl-project/sglang/issues/45929).
- **Kimi-K3 on GB300 MNNVL is not production-ready under CUDA graphs yet.** If you must deploy, disable NCCL graph registration as a stopgap — but treat this as a workaround, not a fix ([#45367](https://github.com/sgl-project/sglang/issues/45367)).
- **Agent/tool-calling stacks should test GLM and Codex-style replays.** Two separate parsing bugs (#45953, #42110) can silently drop tool calls or fabricate early turn termination — both are dangerous in agentic loops because they fail soft, not loud.
- **Speculative decoding users: validate your quantization combos.** NVFP4 KV cache + spec decode remains broken (#36010); `flashinfer_mxfp4` on SM90 silently computes the wrong activation (#45755). Prefer triton attention on SM120 GLM until fa4 is fixed ([#42012](https://github.com/sgl-project/sglang/issues/42012)).
- **On the positive side, multimodal/video and CPU/AMD users get meaningful wins** this cycle: SANA-Sprint native support, MiniMax-H3 FP8 VAE, LTX-2 CFG sharding, Intel AMX CPU prefill graphs, and AMD DSv4.1 prefill CP are all in review or merged — worth benchmarking if you serve diffusion or run on non-NVIDIA-vendor accelerators.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-23

## 1. Today's Highlights

llama.cpp shipped a rapid burst of releases (b11815–b11829) headlined by realtime API streaming fixes in `llama-server`, new multimodal coverage (MiniCPM-OCR 1.0), and continued hardening of the SYCL/OpenCL backends. Performance work dominates the open PR queue: a +19% SYCL prompt-eval gain for tensor-parallel, a GPU-resident MoE expert cache, and BF16 activation paths. Meanwhile, the issue tracker shows a persistent cluster of long-context correctness bugs on SYCL, Vulkan, and hybrid-attention models that infra teams should track closely.

---

## 2. Releases & Breaking Changes

- **b11829** — server: rerank placeholder now substituted only from the original template ([#30864](https://github.com/ggml-org/llama.cpp/pull/30864))
- **b11828** — realtime API: `complete` event now fires after committed audio drains ([#30994](https://github.com/ggml-org/llama.cpp/pull/30994))
- **b11827** — OpenCL: Adreno depthwise conv2d ([#30900](https://github.com/ggml-org/llama.cpp/pull/30900))
- **b11826** — mtmd: MiniCPM-OCR 1.0 support ([#30979](https://github.com/ggml-org/llama.cpp/pull/30979))
- **b11823 / b11822 / b11821 / b11819 / b11818 / b11815** — GLM5 input opts, Qwen4exp DFlash drafter fix, Intel XMX multi-column refactor, Nemotron tokenizer/GQA, typed rerank input, SYCL CONV_2D fix.

No config-breaking changes flagged. Behavior change worth noting: the rerank endpoint now accepts **typed content input**, which may affect clients sending raw strings ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625)).

---

## 3. New Model & Hardware Support

- **MiniCPM-OCR 1.0** — registered as a projector type reusing the MiniCPM-V 4.6 graph ([#30979](https://github.com/ggml-org/llama.cpp/pull/30979))
- **Nemotron** — non-standard GQA, BPE tokenizer, and `domyn-small` pre-type; Metaspace `prepend_scheme` written as GGUF metadata ([#23343](https://github.com/ggml-org/llama.cpp/pull/23343))
- **GLM5 / glm5-next** — input optimization landing; QSA without `kq_mask` in progress ([#31009](https://github.com/ggml-org/llama.cpp/pull/31009))
- **Hexagon (Snapdragon NPU)** — SGN op ([#30346](https://github.com/ggml-org/llama.cpp/pull/30346)) and CEIL op ([#31006](https://github.com/ggml-org/llama.cpp/pull/31006)) added
- **OpenCL** — initial q2_k quantization support ([#30999](https://github.com/ggml-org/llama.cpp/pull/30999))
- **New quant type `GGML_TYPE_BF16X`** — near-lossless bfloat16 recompression at 11.5 bpw (1.39× smaller than BF16), with CPU + GPU execution ([#29896](https://github.com/ggml-org/llama.cpp/pull/29896))
- **YaRN `truncate=false`** — CPU and CUDA only; other backends mark unsupported ([#30206](https://github.com/ggml-org/llama.cpp/pull/30206))

---

## 4. Performance & Optimization

- **SYCL tensor-parallel prompt eval +19%** — new `ggml_sycl_comm_exchange()` makes `-sm tensor` as fast as `-sm layer`, zero PPL change, on Arc Pro B70 ([#30956](https://github.com/ggml-org/llama.cpp/pull/30956))
- **MoE expert caching** — GPU-resident LRU cache for host-offloaded expert weights ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861)); companion PR runs missed experts on CPU with a tuning script ([#30966](https://github.com/ggml-org/llama.cpp/pull/30966))
- **`kq_mask` elimination** — Qwen4exp and GLM5-next QSA no longer allocate the mask, saving ~2 GB GPU/host at ub 4096 and 4 GB at ub 8192 for expert cache headroom ([#30965](https://github.com/ggml-org/llama.cpp/pull/30965), [#31009](https://github.com/ggml-org/llama.cpp/pull/31009))
- **FP16 activations (`--act-type f16`)** — end-to-end F16 compute graph for accelerators bottlenecked on the activation data path ([#31011](https://github.com/ggml-org/llama.cpp/pull/31011))
- **RDNA3/4 Vulkan large-tile Split-K** optimization under review ([#30280](https://github.com/ggml-org/llama.cpp/pull/30280))
- **SYCL FA kernel** — host waits replaced with explicit dependency chaining (~4% on B70), enabling future SYCL graphs ([#30684](https://github.com/ggml-org/llama.cpp/pull/30684))

---

## 5. Stability & Regressions

Ranked by severity:

1. **HIGH — SYCL F16 NaN output** on dense Qwen3.8-27B Q4_K_M after IQ3 code reorder ([#30907](https://github.com/ggml-org/llama.cpp/pull/29107)); workaround: disable fused GEMM. No fix PR yet. ([#30892](https://github.com/ggml-org/llama.cpp/issues/30892))
2. **HIGH — CUDA/HIP Flash Attention garbage at long context** on RDNA4 (gfx1201), head_dim 256 — immediate EOS from corrupted prefill logits ([#30884](https://github.com/ggml-org/llama.cpp/issues/30884))
3. **HIGH — Metal aborts on MUL_MAT** with BF16 src1 at K≥64, batch>8 — no BF16 mul_mm kernel ([#30973](https://github.com/ggml-org/llama.cpp/issues/30973))
4. **HIGH — Qwen3.8-27B decode throughput collapse ~25×** beyond ~80K context on hybrid Gated DeltaNet, prompt processing unaffected ([#27623](https://github.com/ggml-org/llama.cpp/issues/27623))
5. **MED — DeltaNet SYCL token soup** on long prompts (Qwen3.6/3.8, Nemotron) — duplicate reports ([#29183](https://github.com/ggml-org/llama.cpp/issues/29183), [#29167](https://github.com/ggml-org/llama.cpp/issues/29167))
6. **MED — Qwen3.8 DFlash/MTP emits OOB token id** (== n_vocab) on Vulkan ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158))
7. **MED — Nemotron 3/3.5 GGUFs mistagged `pixtral`** → wrong pre-tokenizer ([#30894](https://github.com/ggml-org/llama.cpp/issues/30894))
8. **LOW — `--tensor-split` output degeneration** on long-context MoE, reproducible via raw API ([#28185](https://github.com/ggml-org/llama.cpp/issues/28185))

Also of note: a **security** issue remains open — instruction injection via the WebUI `?q=` parameter ([#25790](https://github.com/ggml-org/llama.cpp/issues/25790)).

---

## 6. What This Means for Application Developers

- **Realtime audio and rerank APIs are stabilizing.** If you're building voice agents, upgrade to b11828+ — the `complete` event now correctly waits for committed audio to drain, fixing race conditions in streaming pipelines. Rerank consumers sending typed content should review [#29625](https://github.com/ggml-org/llama.cpp/pull/29625).
- **Long-context hybrid-attention models (Qwen3.8, Nemotron) are risky in production right now.** Multiple independent reports of throughput collapse and token soup on SYCL, Vulkan, and RDNA4 paths. If you serve these at >80K context, pin to a known-good build and validate per-backend before rollout.
- **MoE serving on constrained VRAM is about to get materially better.** The GPU-resident expert cache PRs ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861), [#30966](https://github.com/ggml-org/llama.cpp/pull/30966)) plus mask-free QSA ([#30965](https://github.com/ggml-org/llama.cpp/pull/30965)) directly target the host-RAM-bandwidth bottleneck that dominates `-ncmoe`/`-ot exps=CPU` decode.
- **Watch `--act-type f16` and BF16X for memory-bound deployments.** Both reduce data-path pressure for accelerators where bandwidth, not FLOPs, is the limit.
- **Intel SYCL users** get the biggest single win today (+19% prompt eval, tensor-parallel), but also bear the most open correctness bugs — the F16 NaN regression is a blocker for Q4_K_M dense models.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-10-23

## 1. Today's Highlights

No new releases in the last 24h, but PR velocity is high: MLX gets YaRN RoPE scaling for Qwen3/Qwen3.5 and Nemotron 3.5 Bolt 74B-A9B support with LiLiCorr speculative decoding. On the stability side, the Pro cloud outage (#15453, 55 comments, 22 👍) continues to dominate, and two separate Windows connection-reset reports (#19113, #19139) plus a Vulkan/AMD prompt-cache regression (#19201) are still open.

## 2. Releases & Breaking Changes

No releases in the last 24h. Two API-level notes for integrators:

- **`OLLAMA_CONTEXT_LENGTH` not reflected in `/api/show` or `/api/tags`** — servers report the model's native context window, not the effective capped value, so clients sizing prompts from metadata will overshoot. [#18995](https://github.com/ollama/ollama/issues/18995)
- **`typical_p` removed from the Python API** — requests now return HTTP 400. [#18480](https://github.com/ollama/ollama/issues/18480)

## 3. New Model & Hardware Support

- **Nemotron 3.5 Bolt 74B-A9B (MLX)** — per-layer expert configs, 3-bit prequantized affine import with per-module metadata, mixed-precision expert stacking, and LiLiCorr speculative decoding via the DFlash runner. [#19229](https://github.com/ollama/ollama/pull/19229)
- **YaRN scaling in MLX for Qwen3 / Qwen3.5** — honors explicit RoPE scaling metadata (YaRN frequencies + amplitude) across text and mRoPE; adds prefill/decode/partial-rotation fixtures. [#19231](https://github.com/ollama/ollama/pull/19231)
- **GA Gradium Phonon checkpoints** — replaces the prerelease path; sets a 0.40.9 minimum for speech support. [#19227](https://github.com/ollama/ollama/pull/19227)
- **GB10 (DGX Spark / Ascent GX10)** added to supported devices. [#13987](https://github.com/ollama/ollama/pull/13987)
- Cloud catalog metadata (context length, thinking levels, capabilities) now propagated to all `ollama launch` harnesses. [#19223](https://github.com/ollama/ollama/pull/19223)

## 4. Performance & Optimization

- **Vulkan/AMD RADV ~30× generation slowdown** after the first request with prompt cache enabled — a 29.7× throughput collapse on second identical request, Mesa RADV + RX 6600 XT, Ollama 0.40.8. This is a regression, not a tuning issue. [#19201](https://github.com/ollama/ollama/issues/19201)
- **dspark-style speculative decode** requested to raise generation speed, citing `memtp` as a reference implementation. [#17016](https://github.com/ollama/ollama/issues/17016)
- **`num_predict == -2`** proposed to fill the context buffer dynamically instead of a static cap. [#9547](https://github.com/ollama/ollama/pull/9547)

## 5. Stability & Regressions

Ranked by severity:

1. **Ollama Cloud Pro 95% failure rate** across `glm-5.1`, `kimi-k2.5`, `qwen3.5`, `deepseek-v3.2` cloud models — service effectively unusable for a paying customer since April. [#15453](https://github.com/ollama/ollama/issues/15453)
2. **`glm-5.3-flash:cloud` degeneration** — 5–8% of requests fail with massive token degeneration since 2026-10-12; reported host-side zeroed data areas. [#18980](https://github.com/ollama/ollama/issues/18980)
3. **Windows connection resets ~15s into large prompts** (0.40.4, RTX 3090, `/api/chat`) — reproducible regardless of Ollama API vs. direct `llama-server`, so the fault sits below the gateway. [#19139](https://github.com/ollama/ollama/issues/19139) · [#19113](https://github.com/ollama/ollama/issues/19113)
4. **MLX 0.40.0 `Maximum threads` panic** — `mlx runner failed: panic: mlx: Maximum threads per threadgroup is 896 but requested 1024`. Downgrade to 0.35.1 resolves. [#18846](https://github.com/ollama/ollama/issues/18846)
5. **MLX nvfp4 prefill stall** — admitted request hangs at `processed=total-1` under sustained single-slot load; only SIGTERM recovery. [#18505](https://github.com/ollama/ollama/issues/18505)
6. **`rnj-1` GGML assert** — `hparams.is_swa_any()` failure on load after 0.3x upgrade. [#18924](https://github.com/ollama/ollama/issues/18924)
7. **Eviction race** — pending eviction cancelled by a `keep_alive` request on the resident model; waiting request stalls for the full keep-alive window. [#19182](https://github.com/ollama/ollama/issues/19182)
8. **Silent tool-call drop** — tool invoked by name not in the request's `tools` returns empty response with `eval_count > 0`. Fix PRs in flight: [#19228](https://github.com/ollama/ollama/pull/19228) (Qwen3 Coder XML escaping), [#19226](https://github.com/ollama/ollama/pull/19226) (Gemma4 trailing-noise recovery), [#19187](https://github.com/ollama/ollama/issues/19187)
9. **Go toolchain CVEs** — 1 critical + 11 high in released binaries; upgrade to Go 1.26.9+ required. [#19162](https://github.com/ollama/ollama/issues/19162) · [#16033](https://github.com/ollama/ollama/issues/16033)
10. **Silent server-start failure on Windows Desktop 0.33.1** — `server.log` stays empty, no listener; manual `ollama serve` works. [#18061](https://github.com/ollama/ollama/issues/18061); swallowing bug now being logged by [#19179](https://github.com/ollama/ollama/pull/19179)

Correctness/behavioral fixes landed or pending: `system/developer` role preservation for direct API clients [#19199](https://github.com/ollama/ollama/pull/19199), explicit empty `SYSTEM ""` now clears instead of inheriting [#18990](https://github.com/ollama/ollama/pull/18990), last-user-message preserved during context truncation [#19058](https://github.com/ollama/ollama/pull/19058), Responses stream failures now emit `response.failed` instead of EOF [#19225](https://github.com/ollama/ollama/pull/19225), and Anthropic web-search thinking-settings reuse [#19098](https://github.com/ollama/ollama/pull/19098).

## 6. What This Means for Application Developers

- **Don't trust `/api/tags` or `/api/show` for context budgeting.** Assume native context, then cap client-side. If you rely on metadata to truncate, you will overshoot the effective window.
- **Windows + large prompts is currently unsafe.** If you have a Windows inference path, either cap prompt size, add retry-with-backoff on resets, or pin to a known-good version until #19139/#19113 are resolved.
- **Pin versions deliberately.** 0.40.0 has an MLX panic (#18846); 0.40.8 has the AMD RADV prompt-cache regression (#19201). For mixed fleets, keep a per-backend version matrix rather than a single version floor.
- **Tool-calling robustness is improving fast.** The Qwen3 Coder, Gemma4, and Responses-stream parsers all have fixes in flight. If your agent loops on malformed tool output, watch these PRs before building workarounds.
- **Cloud Pro users**: the 95% failure report has been open since April with no resolution; treat cloud as best-effort for production traffic and keep a local fallback path.
- **Upgrade Go binaries** if you ship Ollama in a container; the CVE cluster is fixed by Go 1.26.9+ and downstream rebuilds.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-10-23

## 1. Today's Highlights

The dominant story remains the **supply-chain compromise of `litellm 1.107.0`**, with PyPI and Docker `latest`/`main-stable`/`main-latest` tags now yanked, but a backport gap persists: the eMudhra root CA fix (#47670) is only on `main`, leaving all published `1.106.x` images still trusting the compromised root chain. Elsewhere, a large Rust-gateway refactor (`Layered` derive) is landing across settings, provider credentials, and env resolution; and a cluster of long-stale accounting, routing, and Claude-Code/Anthropic-translation bugs got attention but remain unfixed.

## 2. Releases & Breaking Changes

No new releases in the last 24h.

- **PyPI `1.107.0` removed; Docker tags yanked** — `latest`, `main-latest`, `main-stable` on `ghcr.io/berriai/litellm{,-database,-non_root}` and `docker.io/litellm/litellm` no longer point to the compromised image. [#47826](https://github.com/BerriAI/litellm/issues/47826)
- **Stable-branch CA gap (action required for 1.106.x users)** — The eMudhra root CA fix (#47670) is `main`-only. Every published `1.106.x` image still trusts `emSign ECC Root CA - G3`, the root the compromised intermediates chain to. Request to backport as **v1.106.3**. [#47904](https://github.com/BerriAI/litellm/issues/47904)
- **UI upgrade notice source change (PR)** — Admin UI bell will read version/link from the docs changelog instead of GitHub "latest release," avoiding premature upgrade prompts. [#47998](https://github.com/BerriAI/litellm/pull/47998)
- **Docker UI login regression (1.88.x)** — Post-upgrade, Admin UI behind nginx reverse proxy redirects to an internal container IP (regression from 1.87.0). [#30118](https://github.com/BerriAI/litellm/issues/30118)

## 3. New Model & Hardware Support

No new models or backends landed. Relevant in-flight/related items:

- **DashScope realtime WebSocket support (PR)** — Adds a `DashScopeRealtime` handler on the shared OpenAI one, handling DashScope's flat `session.update` wire format. [#40579](https://github.com/BerriAI/litellm/pull/40579)
- **Nano-GPT provider missing from UI** — Documented at `docs.litellm.ai/docs/providers/nano-gpt` but absent from the UI provider list. [#34499](https://github.com/BerriAI/litellm/issues/34499)
- **Central provider/model request thread** — Ongoing community voting for new models/providers/endpoints. [#18686](https://github.com/BerriAI/litellm/issues/18686)

## 4. Performance & Optimization

- **Proxy event-loop stall / RSS blowup on large upstream error bodies** — Proxy reads unbounded error-response bodies (observed a **~114 MB HTTP 400**), runs regex masking over the whole payload, and propagates it, stalling the event loop. Needs a size bound. [#34031](https://github.com/BerriAI/litellm/issues/34031)
- **Latency-based routing degrades to random selection** — A lost-update race in `async_log_success_event` causes latency-based routing to collapse toward random weighted by deployment count under concurrency (16 Anthropic + 4 OpenAI keys per group mentioned). [#24720](https://github.com/BerriAI/litellm/issues/24720)
- **Router ignores `Retry-After` for multi-deployment groups** — `Router._time_to_sleep_before_retry` only honors `Retry-After` when a model group has a **single** deployment; multi-deployment groups retry instantly against a shared rate-limited upstream. [#34399](https://github.com/BerriAI/litellm/issues/34399)
- **Least-busy routing fix (PR, closed/stale)** — Strict less-than comparison caused all traffic to pile onto the first deployment when in-flight counts tied; switched to correct tie handling. [#23924](https://github.com/BerriAI/litellm/pull/23924)
- **Type-safety sweep (PR)** — Clears **1,181 basedpyright `Any` errors across 431 files**; live two-pod QA against real OpenAI and Anthropic calls returned identical responses. [#47789](https://github.com/BerriAI/litellm/pull/47789)

## 5. Stability & Regressions

Ranked by severity:

**Critical**
- **`1.107.0` supply-chain compromise** — `cook.pth` credential stealer + `sitecustomize` RCE loader, built from lookalike repo `Berri-AI/litellm`. PyPI/Docker yanked; **1.106.x still ships the compromised root CA** pending backport. [#47826](https://github.com/BerriAI/litellm/issues/47826), [#47904](https://github.com/BerriAI/litellm/issues/47904)

**High**
- **All keys fail on Postgres `max_connections` exhaustion** — In multi-worker proxy deployments, once connections are exhausted all user API keys fail. [#34479](https://github.com/BerriAI/litellm/issues/34479)
- **Worker with transient Postgres/HAProxy outage → "Invalid model name"** — Valid, configured models (e.g. `google/gemini-2.5-flash`) fail spuriously during DB blips. [#26237](https://github.com/BerriAI/litellm/issues/26237)
- **Deleted team keys stay auth-valid in cache** — `POST /team/delete` removes keys from DB but never evicts them from the auth cache (`/key/delete` does). [#34217](https://github.com/BerriAI/litellm/issues/34217)

**Medium — accounting / cost correctness**
- **Cache hits: spend zeroed but tokens replay original usage** — Open design question on which basis token reports should aggregate. [#39057](https://github.com/BerriAI/litellm/issues/39057)
- **Custom pricing (`input_cost_per_token: 0`) silently ignored** — Per-request pricing overwrites canonical `model_cost` entries after model-cost-map reload, affecting BYOK/wildcard routes. [#30081](https://github.com/BerriAI/litellm/issues/30081)
- **`response_cost` null / spend `$0`** — When `custom_llm_provider=anthropic` but the priced row lives under a different provider. [#47675](https://github.com/BerriAI/litellm/issues/47675)

**Medium — translation / Claude Code**
- **Anthropic `/v1/messages` streaming drops `tool_use.input`** for `gemini/gemma-4-31b-it` (non-streaming works). [#25390](https://github.com/BerriAI/litellm/issues/25390)
- **`websearch_interception` doesn't fire for Claude Code + Bedrock passthrough** — tool forwarded to Bedrock which rejects it; PR #25242 would fix root cause but introduces a new Bedrock skip that re-breaks it. [#26252](https://github.com/BerriAI/litellm/issues/26252)
- **`auto_router/complexity_router` rejects `thinking.type=adaptive`** for Claude Code requests. [#26224](https://github.com/BerriAI/litellm/issues/26224) — **in-flight fix PR** keeps adaptive thinking/effort on native `/v1/messages`. [#41243](https://github.com/BerriAI/litellm/pull/41243)
- **Anthropic→Responses adapter ignores `drop_params`** when mapping `metadata.user_id` to `user`, breaking strict `/responses` gateways. [#26241](https://github.com/BerriAI/litellm/issues/26241)
- **`token_counter` rejects image `detail: "original"`** — Pre-call context checks log ERROR and **skip the context-window check** for these requests. [#47327](https://github.com/BerriAI/litellm/issues/47327)
- **Vertex Anthropic `response_format` + `thinking` returns 400** on `vertex_ai/claude-opus-4-7`. [#26334](https://github.com/BerriAI/litellm/issues/26334)

**Lower — timeouts, license, cache, provider-specific**
- **`litellm.Timeout: Connection timed out after None seconds.`** — timeout is never measured/attributed (SDK 1.77.1). [#14635](https://github.com/BerriAI/litellm/issues/14635)
- **Airgapped license verification fails when payload contains `.`** (e.g. domain-like `user_id`) — `_verify_license_str` splits on the first `.` byte. [#26231](https://github.com/BerriAI/litellm/issues/26231)
- **Bedrock retry replays stale SigV4 headers** after signing, on retry/fallback paths. [#27513](https://github.com/BerriAI/litellm/issues/27513)
- **Azure FLUX-1.1-pro / FLUX.1-Kontext-pro fail** after upgrade to 1.80.15. [#19334](https://github.com/BerriAI/litellm/issues/19334)
- **Fireworks Kimi 2.6 rejects `tool_choice`** (`UnsupportedParamsError`). [#26257](https://github.com/BerriAI/litellm/issues/26257)
- **False "guardrails feature unavailable"** when editing any key config in 1.82.3. [#24734](https://github.com/BerriAI/litellm/issues/24734)

**Fix PRs in flight**
- Keep one encrypted-content item ID across streamed and final `/v1/responses` (ID-keyed clients break on mismatch). [#47991](https://github.com/BerriAI/litellm/pull/47991)
- Retry Gemini streams that drop before the first SSE event (`num_retries` currently doesn't apply). [#45750](https://github.com/BerriAI/litellm/pull/45750)
- Stop stripping caller's own `cache_control` from messages/tools. [#35602](https://github.com/BerriAI/litellm/pull/35602)
- Stop sending non-Bedrock BYOK key to AWS as bearer token in guardrails. [#37942](https://github.com/BerriAI/litellm/pull/37942)
- Add `aclose()` to `ResponsesAPIStreamingIterator` to prevent upstream connection leak. [#26250](https://github.com/BerriAI/litellm/issues/26250)
- Avoid pydantic serializer warnings in `validate_and_fix_openai_messages`. [#25933](https://github.com/BerriAI/litellm/pull/25933)

## 6. What This Means for Application Developers

- **Pin and audit immediately if you ran `1.107.0`.** The `cook.pth` stealer exfiltrates credentials; treat any secrets visible to that container/Python environment as compromised. If you're on `1.106.x` Docker images, you're still exposed to the eMudhra root CA chain until the backport ships — track [#47904](https://github.com/BerriAI/litellm/issues/47904).
- **Don't rely on UI "latest release" prompts** for upgrade guidance — behavior is moving to the docs changelog ([#47998](https://github.com/BerriAI/litellm/pull/47998)). Subscribe to releases/issues directly.
- **Cost/token accounting is unreliable in edge cases**: cache hits (spend 0, tokens replayed), custom `input_cost_per_token: 0`, and cross-provider priced rows. If you bill or quota on LiteLLM spend logs, reconcile against provider bills. [#39057](https://github.com/BerriAI/litellm/issues/39057), [#30081](https://github.com/BerriAI/litellm/issues/30081), [#47675](https://github.com/BerriAI/litellm/issues/47675)
- **Multi-deployment routing fairness is not guaranteed**: latency-based routing collapses under concurrency ([#24720](https://github.com/BerriAI/litellm/issues/24720)), and `Retry-After` is ignored for multi-deployment groups ([#34399](https://github.com/BerriAI/litellm/issues/34399)). Add client-side backoff and avoid single-shared-upstream fan-out.
- **If you build on Claude Code / Anthropic `/v1/messages`**: several translation gaps affect streaming tool calls ([#25390](https://github.com/BerriAI/litellm/issues/25390)), adaptive thinking ([#26224](https://github.com/BerriAI/litellm/issues/26224)), and Bedrock web-search interception ([#26252](https://github.com/BerriAI/litellm/issues/26252)). Test on your exact backend before relying on these paths.
- **Postgres is a hard dependency at scale**: connection exhaustion and DB blips can take down all key auth ([#34479](https://github.com/BerriAI/litellm/issues/34479), [#26237](https://github.com/BerriAI/litellm/issues/26237)). Consider a local auth cache with correct invalidation (note the existing team-delete cache leak, [#34217](https://github.com/BerriAI/litellm/issues/34217)) and connection-pool headroom.
- **Guard against oversized upstream error bodies** ([#34031](https://github.com/BerriAI/litellm/issues/34031)) — dials down your own timeouts/retries if a backend can emit large 4xx/5xx dumps.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-10-23

## 1. Today's Highlights

No new releases in the last 24h, but the PR queue is extremely active: the Flows node editor series (#14730, #14889, #14891, #14898, #14899, #14904, #14905) is landing in stacked form, extending Studio toward a full pipeline/game/agent authoring surface. On the infrastructure side, multi-node GGUF serving over llama.cpp RPC continues to mature (#13726, #14274, #10323, #10280), and a cluster of stability fixes landed for diffusion CUDA graph handling (#14867, #14777) and image LoRA staging for `sd-server` (#14860). The most notable new regressions reported today involve silent CPU fallback on AMD RDNA3 Linux (#14906) and a MacOS Metal OOM recovery path (#14431).

## 2. Releases & Breaking Changes

None. No releases published in the last 24h; no API/config migration items.

## 3. New Model & Hardware Support

- **DeepSeek-V4.1-Flash-1017 (GGUF) loading failure** — users report `deepseek41-dspark` architecture unrecognized by the bundled llama.cpp; DSpark/DFlash sidecar handling is being addressed in [#14431](https://github.com/unslothai/unsloth/pull/14431), which reserves sidecar memory in `--fit-target` and adds Metal OOM recovery. Issue: [#14695](https://github.com/unslothai/unsloth/issues/14695).
- **MOSS-Image in-tree port** — quantized builds and GGUF via stable-diffusion.cpp, added as an image family in Studio ([#14552](https://github.com/unslothai/unsloth/pull/14552), now closed/merged).
- **Multi-node GGUF serving** — N-node split across machines over llama.cpp RPC, stacked on the two-Spark orchestrator ([#13726](https://github.com/unslothai/unsloth/pull/13726)); home-network pairing with mutual TLS ([#14274](https://github.com/unslothai/unsloth/pull/14274)); two-Spark topology recommender with async replica router ([#10323](https://github.com/unslothai/unsloth/pull/10323)); DGX Spark single/two-node clustering and pipeline training ([#10280](https://github.com/unslothai/unsloth/pull/10280)).
- **Qwen3.5 GatedDeltaNet** — context parallel / FSDP2 sharding for hybrid recurrent layers remains unsupported; issue closed without a fix noted ([#12051](https://github.com/unslothai/unsloth/issues/12051)).
- **OmniVoice** — request for full/LoRA finetune and inference support in Studio ([#14660](https://github.com/unslothai/unsloth/issues/14660)).
- **XPU/MPS memory capping** — remaining gap on GPU memory caps for XPU and MPS training, plus image-gen honoring the VRAM budget ([#8178](https://github.com/unslothai/unsloth/issues/8178)).

## 4. Performance & Optimization

- **Diffusion allocator flush fix** — the prompt-encode pre-hook called `torch.cuda.empty_cache()` after every group release on offload/streaming tiers, causing a device sync plus allocator churn on *every prompt*. Fix stops the per-encode flush ([#14777](https://github.com/unslothai/unsloth/pull/14777), closed).
- **Diffusion CUDA graph teardown** — stop recording CUDA graphs once the VMM arena has failed, and detach it, avoiding wasted graph capture under `low_vram` CPU offload ([#14867](https://github.com/unslothai/unsloth/pull/14867), closed).
- **KV preemption for parallel chats** — one llama-server holding a single KV cache now parks/preempts work via `--preempt-ram` when supported, with Studio handing preemption to the server; targets better concurrency on shared cache ([#10301](https://github.com/unslothai/unsloth/pull/10301), open).
- **pre-commit.ci compute** — `scripts/enforce_kwargs_spacing.py` is extremely slow and adds significant CI load across the high-PR-volume repo ([#14174](https://github.com/unslothai/unsloth/issues/14174), closed).
- **Conversation-archive embeddings stall** — long, tool-heavy chats can spend *minutes* in CPU-based archive embedding before llama.cpp sees any inference request on Studio Desktop v0.1.909-beta ([#14519](https://github.com/unslothai/unsloth/issues/14519), open).

## 5. Stability & Regressions

Ranked by severity:

1. **Silent CPU fallback on native Linux AMD (RDNA3/gfx1100)** — Studio-prepended `/opt/rocm/lib` hides the GPU from the bundled `llama-server`; suspected regression from the #7208 fix. Fresh AppImage reinstall on CachyOS reproduces ([#14906](https://github.com/unslothai/unsloth/issues/14906), open, no fix PR yet).
2. **MacOS Metal OOM leaves llama-server permanently erroring** — first prefill dies with `kIOGPUCommandBufferCallbackErrorOutOfMemory`, then all requests fail; recovery path in [#14431](https://github.com/unslothai/unsloth/pull/14431) (open).
3. **Attachments become permanently unreadable after auto-compaction** — images/PDFs lost post-compaction, and `search_conversation` never invoked ([#14708](https://github.com/unslothai/unsloth/issues/14708), open).
4. **Multi-account local model desync** — multiple LAN accounts against the same inference server lose model-load synchronization ([#12365](https://github.com/unslothai/unsloth/issues/12365), closed).
5. **Windows Intel XPU LoRA inference linker mismatch** — GNU and MSVC linker args mixed ([#14807](https://github.com/unslothai/unsloth/issues/14807), open).
6. **Lemonade/FastFlowLM chat+models stopped working** — regression on AMD Ryzen AI 7 350 after the #11743 mechanism ([#14650](https://github.com/unslothai/unsloth/issues/14650), open).
7. **UI/UX regressions** — arrow-key handling in MacOS chat ([#14764](https://github.com/unslothai/unsloth/issues/14764)), browser panel losing rendered preview on request edits ([#14783](https://github.com/unslothai/unsloth/issues/14783)), model selection not persisting across multi-model conversations ([#14506](https://github.com/unslothai/unsloth/issues/14506), closed), assistant messages not editable ([#13938](https://github.com/unslothai/unsloth/issues/13938), closed).
8. **Export failure** — models with remote code can't be exported from the UI ([#14688](https://github.com/unslothai/unsloth/issues/14688), open).
9. **Supply-chain hygiene** — installer pins uv ≥0.13.4 (emSign root CA removal) in [#14894](https://github.com/unslothai/unsloth/pull/14894).

## 6. What This Means for Application Developers

- **Studio is becoming a platform, not just a trainer.** The Flows stack (#14730 + follow-ups) adds a node editor, sub-flows, app view, job polling, GPU leases, memory-stream blocks (Generative Agents pattern), and data-transform/document blocks. If you build agentic pipelines, watch this surface — it now overlaps with Langflow/Flowise/n8n style workflows and is designed for local model execution.
- **Multi-user / multi-tenant deployments need care.** The LAN multi-account desync (#12365) and per-user greeting/config requests (#14680) show Studio is being used as a shared inference server. Expect rough edges around session and model-state isolation until those land.
- **AMD/Linux and Windows-Intel users should pin known-good ROCm/oneAPI paths** — the prepend behavior (#14906) can silently drop you to CPU, which is a latency cliff, not a crash.
- **Long-context agent workloads have a hidden pre-inference cost** on Studio Desktop: archive embedding before llama.cpp gets the request (#14519). Budget for it or disable archiving in latency-sensitive loops.
- **Plan for KV cache contention** if you multiplex chats against one server; the preemption work (#10301) is the direction of travel but is not yet merged.
- **Multi-node serving over RPC is real but bleeding-edge** — mutual-TLS pairing (#14274) and topology selection (#10323) are opt-in and target home-lab/DGX Spark setups; don't standardize on it for production yet.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*