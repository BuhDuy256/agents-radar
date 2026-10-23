# AI 基础设施日报 2026-10-23

> 生成时间: 2026-10-23 02:46 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目对比报告 — AI 基础设施文摘
**日期：2026-10-23 | 范围：vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth**

---

## 1. 生态概览

AI 基础设施栈正处于**整合与加固阶段**：今天六个项目均无重大版本发布，但 PR 队列和 issue 追踪器依然饱和。工作重心已从头部功能发布转向**分离式服务中的正确性加固**（vLLM、SGLang）、**供应链修复**（LiteLLM v1.107.0 被投毒事件），以及**面向 Hopper/Blackwell/ROCm 的内核级优化**（vLLM、SGLang、llama.cpp）。MoE、混合线性注意力（GDN/KDA/QSA）和 FP4 KV 缓存如今已成为普遍关注点，但它们也是今天几乎所有静默正确性 bug 的来源。与此同时，*服务引擎*（vLLM、SGLang）与*本地运行时*（llama.cpp、Ollama）之间的经典分界正受到两端挤压：网关（LiteLLM）正在吸收路由/成本/计费逻辑，而微调工具（Unsloth）正将推理运行时推入训练循环。

---

## 2. 活跃度对比

| 项目 | Issue（文摘中活跃） | PR（文摘中活跃） | 发布状态（24小时） | 主要活动主题 |
|---|---|---|---|---|
| **vLLM** | 约 12 个跟踪（4 个未解决的严重/高优先级） | 约 500 个更新，约 15 个重点 | **无**（无发布） | PD 分离正确性、ROCm 对齐、Rust 前端 |
| **SGLang** | 约 15 个跟踪（2 个严重） | 约 12 个重点 | **无**（当前 v0.5.22） | DSv4/GLM-5.3 内核融合、AMD FlyDSL、PD 分离 |
| **llama.cpp** | 约 10 个跟踪（2 个严重） | 约 10 个已合并/开放 | **高频发布**（b11815–b11829） | SYCL/Intel Arc 性能、MoE CPU 溢出、MiniCPM-OCR |
| **Ollama** | 约 10 个跟踪（2 个严重） | 约 10 个进行中 | **无** | 云端可靠性（#15453、#18980）、MLX/Nemotron |
| **LiteLLM** | 约 15 个跟踪（1 个严重安全） | 约 10 个进行中 | **无**（v1.107.0 已撤回） | **供应链修复**、提供商适配器 |
| **Unsloth** | 约 31 个活跃 | 约 20 个热门 PR | **无** | Studio/Desktop 用户体验、GRPO 正确性、扩散修复 |

**要点：**
- **llama.cpp** 是唯一保持每日发布节奏的项目——与其作为下游运行时（Ollama、Unsloth）基底的定位相符。
- **vLLM** 的原始 PR 量遥遥领先（约 500 个更新），反映其作为事实标准开源服务引擎的地位，但也意味着日益增长的维护负担。
- **LiteLLM** 的追踪器被单一严重事件主导；排除该事件后，提供商适配器的打磨是常态。
- **Unsloth** 的 31 个活跃 issue 偏重用户体验/Studio，表明它正从训练库成熟为应用界面。

---

## 3. 模型支持竞赛

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek-V4.x（含 V4.1-Flash）** | ✅ PP 分区、replay graph、MXFP4 索引器 | ✅ PD 分离（trtllm-gen）、内核融合（prefill index、K-norm-rope、mHC） | ❌ 受阻（dspark 架构无法识别） | ❌ | ⚠️ GGUF 受阻；DSpark sidecar 变通方案 |
| **GLM-5.3-Flash** | ✅ ROCm KDA prefill | ✅ Hopper SM90 跟踪 issue | ⚠️ QSA `kq_mask` 优化 | ✅ 云端（但正在退化） | — |
| **Qwen3.5 / Qwen3.8（含 QSA、GDN）** | ✅ GDN MTP Triton 移植（ROCm） | ✅ gfx950 上的 FlyDSL QSA/GDN 解码 | ⚠️ SYCL 上混合 DeltaNet 破损 | ✅ | ⚠️ GatedDeltaNet CP 不支持 |
| **Kimi-K3** | ✅ ROCm BF16 KDA 状态 | ⚠️ GB300 上 DCP a2a 乱码 | — | ✅ 云端 | — |
| **Nemotron 3.5 Bolt** | — | — | ⚠️ GQA/tokenizer PR 开放 | ✅ MLX PR（#19229） | — |
| **MiniCPM-OCR 1.0** | — | — | ✅ 自有 projector 类型 | — | — |
| **GigaChat 3.5 432B** | — | — | ⚠️ 审查中 | — | — |
| **SANA-Sprint 0.6B（扩散）** | — | ⚠️ 功能请求 | — | — | — |
| **Muse Spark** | — | ✅ Day-0 路线图 | — | — | — |

**领先者：** **vLLM** 和 **SGLang** 在前沿模型的 Day-0 支持上共同领先，但原因不同——vLLM 领先在*广度*（DeepSeek-V4.1、GLM-5.3、Kimi-K3、Qwen3.5/3.8 横跨 CUDA 和 ROCm），SGLang 领先在针对 DSv4 的*内核专门化深度*以及通过 **FlyDSL/Gluon** 路径的 **AMD gfx950/gfx1250** 支持。**llama.cpp** 在新 MoE 架构上严重落后（DeepSeek-V4.1-Flash 的 GGUF 实际上受阻），这级联影响到 **Ollama** 和 **Unsloth**。**Unsloth** 在 DeepSeek-V4.1-Flash 和 Qwen3.5 GatedDeltaNet CP 上的模型支持缺口对微调者影响最大。

---

## 4. 性能前沿

优化工作**分布不均**。按活动量排序：

| 领域 | 最活跃 | 工作性质 |
|---|---|---|
| **内核（融合 / Triton / FlyDSL）** | SGLang、vLLM、llama.cpp | DSv4 prefill index 融合、K-norm-rope 重写、GDN MTP Triton 移植、GLM-5.3 SM90 攻坚、SYCL XMX 重构 |
| **分离式服务（PD、KV 传输）** | vLLM、SGLang | Mooncake vs NIXL 基准测试（#63006）、trtllm-gen 的 DSv4 PD（#45221）、NIXL UCX/rocm_ipc 启用 |
| **KV 缓存（卸载、量化、策略）** | vLLM、SGLang、Ollama | GDN 混合模型的跨 TP 卸载、FP4 块缩放处理（SGLang PD 中破损）、可插拔 KV 连接器（Ollama 提案） |
| **MoE 内存治理** | llama.cpp、Unsloth | `--moe-cache-cpu-share` CPU 溢出、热/冷专家拆分请求、XPU/MPS 显存上限 |
| **量化精度（FP4/FP8/act-type）** | SGLang、llama.cpp、vLLM | FP4 MX block16 KV（PD 下破损）、`--act-type f16` graph-key 变更、gfx950 上的 MXFP4 稀疏索引器 |
| **分布式 / 多节点** | vLLM、Unsloth | GB200 DP4 prefill replay graph、家庭网络 mTLS RPC（Unsloth）、DGX Spark 2 节点集群 |
| **批处理 / 图捕获** | vLLM | B300 Qwen3.8 1024-token 捕获尺寸使大量 GDN prefill 收益未能兑现（#62556） |
| **路由 / 成本核算** | LiteLLM | Gemini 上下文缓存按 token-小时计费、rerank 成本保真 |

**信号：** **内核融合前沿现已成为 vLLM 和 SGLang 在 NVIDIA Hopper/Blackwell 上的主要战场**，而 **AMD 前沿已悄然成为 SGLang 的主场**（FlyDSL、Gluon MLA、aiter）。vLLM 的 ROCm 工作是追赶对齐驱动的（CUDA 内核的 Triton 移植）；SGLang 的则是全新开创（FlyDSL Qwen3.5 GDN prefill 达到 1.4–1.74× 加速）。

---

## 5. 层级定位

| 层级 | 项目 | 主要买家 / 用户 | 价值主张 | 当前压力 |
|---|---|---|---|---|
| **生产服务引擎** | vLLM、SGLang | 运行多租户推理的平台/基础设施团队 | 吞吐量、PD 分离、KV 策略、投机解码 | PD + 混合注意力的正确性 bug；Rust 前端（vLLM）和 AMD 对齐（SGLang） |
| **本地 / 消费级运行时** | llama.cpp、Ollama | 开发者、桌面用户、边缘/自托管者 | 单二进制、GGUF、量化、硬件广度 | Intel/Vulkan 上的混合注意力正确性；Ollama 云端可靠性 |
| **LLM 网关 / 代理** | LiteLLM | 抽象提供商的应用程序团队 + 平台团队 | 提供商抽象、路由、成本、密钥管理 | **供应链信任**；无界错误摄入；Retry-After 处理 |
| **微调 / 训练运行时** | Unsloth | 微调者、LoRA/GRPO 实践者 | 内存高效训练、蒸馏、量化基底 | GRPO+vLLM 静默权重失同步；Windows/XPU 健壮性 |
| **下游应用 / 智能体** | *上述所有层级的消费者* | 智能体构建者、RAG、编码助手 | — | 必须推理每一层的静默错误 |

**关键结构性洞察：** **各层正耦合得更加紧密**。vLLM 和 SGLang 正在添加面向路由器的原语（BlockStored 事件排序、render/generate/derender 契约），LiteLLM 正在发展过去存在于应用中的提供商语义，而 Unsloth 现在已发布桌面应用。**"网关中间层"正在增厚**——预计会走向整合，而非清晰分离。

---

## 6. 趋势信号

### 趋势 1 — PD 分离正确性是头号系统性风险
vLLM（#61160，前缀缓存下的跨请求 KV 污染）和 SGLang（#45866，PD 传输中 FP4 块缩放丢失；#45864，撤回时 QSA 状态损坏）都报告了分离式服务下的**静默错误输出**，而非崩溃。**智能体开发者应将 PD + 前缀缓存 + 混合注意力视为需要持续输出验证的三元组合**，而非一次性配置。

### 趋势 2 — 混合线性注意力是新的正确性前沿
GDN/GDN-Lite、KDA、QSA 和 DeltaNet 出现在 vLLM、SGLang、llama.cpp 和 Unsloth 中——并且在**四个推理项目中的三个**最严重 bug 中被牵连（llama.cpp SYCL token 乱码、Unsloth GRPO 失同步、SGLang QSA 撤回损坏）。**为混合注意力模型固定已知良好的构建版本，并将部署以 PPL 回归测试为门禁。**

### 趋势 3 — AMD 不再是追赶的次要目标
SGLang 在 gfx1250/gfx950 上的 FlyDSL/Gluon MLA 和 GDN prefill，加上 vLLM 的 Triton 移植和 `rocm_ipc` NIXL 启用，意味着 **MI3xx 现在是前沿模型服务的一等目标**。ROCm 上的投机解码正在弥合此前不可用的缺口（vLLM #63096、#61855）。

### 趋势 4 — 供应链信任现已成为基础设施关切
LiteLLM v1.107.0 被投毒事件（`cook.pth` 窃取器、`sitecustomize` RCE）是该时间窗口内最高严重性的事件。**决策者应在全部六个项目中强制使用摘要固定（digest-pinned）部署，并对网关特别进行 SBOM/SLSA 检查**——网关是技术栈中价值最高的注入点。

### 趋势 5 — MoE 内存治理正在成为自托管者的新兴痛点
llama.cpp 的 `--moe-cache-cpu-share`、Unsloth 的热/冷专家拆分请求，以及反复出现的"专家缓存"问题表明**行业尚未就 MoE 卸载方案达成共识**。在非数据中心硬件上运行前沿 MoE 的团队应预期在 prefill 延迟、解码吞吐量和显存余量之间做出取舍——而非三者兼得。

### 趋势 6 — 客户端取消并非统一行为
SGLang 明确记录 `/v1/systemone` 忽略断开连接，而聊天补全则遵守。**如果你依赖断开驱动的取消来控制成本，请在 SGLang、Ollama（`/v1/responses` 流语义）和 LiteLLM（Retry-After、错误体摄入）中添加显式中止调用和逐端点审计。**

### 趋势 7 — 成本核算正在成熟但尚不统一
LiteLLM 的 Gemini 上下文缓存按 token-小时计费和 rerank 成本保真修复是一个信号：**代理级成本遥测正从尽力而为升级为可审计**。基于 `spend_logs` 进行内部计费的团队应在将代理响应缓存采纳为计费原语之前，重新审视历史对账和缓存命中语义的模糊性（#39057）。

### 应用 / 智能体开发者应关注的事项
1. **将输出验证作为一等层级**——适用于任何涉及 PD 分离、混合注意力或云端的智能体（Ollama Pro 有 95% 失败率报告且未发布修复）。
2. **上下文长度真相**——Ollama `/api/show` 及类似 API 报告的是原生上下文，而非有效上下文（#18995）。请自行计算预算。
3. **工具调用解析健壮性**——参数中的字面 `</function>`（llama.cpp #19228）、有效调用后的尾随噪声（Gemma 4 #19226）、developer 角色被拒（Ollama/Mistral #19021）。添加 schema 验证 + 重试。
4. **Rust/对齐路线图**——vLLM 的 `VLLM_USE_RUST_FRONTEND=1` 和 Unsloth 的集群服务 PR 预示着 Python 可选、多节点服务的到来。规划 12–18 个月的迁移路径。
5. **计费原语**——Gemini 缓存存储和 rerank 成本此前被低估（LiteLLM #47989、#47843）；在向客户收费前请重新审视。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-10-23

## 1. 今日亮点

过去 24 小时内没有新版本发布；活动主要由大量 PR 队列（500 个已更新）以及围绕分离式服务、KV 缓存策略和 Rust 前端路线图的持续 RFC 讨论所主导。两个新提交的正确性 bug 值得关注：PD 分离下启用前缀缓存时的跨请求 KV 污染（#61160），以及流水线并行下 GLM-5.x 中过期的 top-k 索引读取（#63170）。在性能方面，ROCm 继续缩小差距，新增了 Triton 移植，并通过 UCX 版本升级为 NIXL 启用 `rocm_ipc`。

## 2. 版本发布与破坏性变更

过去 24 小时内无新版本发布。

已在进行中、合并后将影响部署的值得注意的变更：

- **[PR #61939](https://github.com/vllm-project/vllm/pull/61939)** — ROCm CI/发布流程重构，将六个镜像层级合并为统一的构建流水线。与 `ci-infra#820` 配套；必须一同合并，或先合并 ci-infra。预计会出现镜像标签/名称变动。
- **[PR #62827](https://github.com/vllm-project/vllm/pull/62827)** — 在 ROCm Dockerfile 中将 UCX 升级至 `v1.23.0-rc1`，移除 `UCX_RMA_PPLN_ENABLE`，设置 `UCX_ROCM_IPC_SIGPOOL_MAX_ELEMS=inf`，使 NIXL 真正使用 `rocm_ipc`。
- **[PR #63188](https://github.com/vllm-project/vllm/pull/63188)** — `BUILD_NIXL=true` 现在接受 Git-ref 覆盖，并构建 LIBFABRIC 插件，而不仅仅是固定标签的 UCX。
- 已关闭：**[#63056](https://github.com/vllm-project/vllm/issues/63056)** — 在 CLI 上暴露 `--sleep-mode-backend` 的请求已解决；可插拔的 sleep-mode 后端（RFC #34303）现在可以从 `EngineArgs` 访问。

## 3. 新模型与硬件支持

- **[PR #63106](https://github.com/vllm-project/vllm/pull/63106)** — DeepSeek-V4.1：通过 `VLLM_PP_LAYER_PARTITION` 支持任意非空流水线分区，包括 KV 共享组内的切割（例如 `10,30`、`12,28`、`25,15`、`10,10,10,10`）。跨阶段传递 Main KV、indexer K、top-k 索引。
- **[PR #58743](https://github.com/vllm-project/vllm/pull/58743)** — ROCm Kimi-K3：为 `--mamba-ssm-cache-dtype bfloat16` 支持 BF16 KDA 循环状态，包括分页预填充状态和检查点。
- **[PR #63072](https://github.com/vllm-project/vllm/pull/63072)** — GLM-5.3-Flash（ROCm）：chunk KDA 预填充现在消费来自 `GDNAttentionMetadata` 的预计算 `chunk_indices`，消除了每次预填充的一次 GPU→CPU 同步。
- **[PR #63096](https://github.com/vllm-project/vllm/pull/63096)** — ROCm `ROCM_AITER_UNIFIED_ATTN` 新增 `supports_draft_decode_metadata_update`，在 Model Runner V2 下启用融合多步 draft 解码（EAGLE/MTP）。
- **[PR #61855](https://github.com/vllm-project/vllm/pull/61855)** — 融合 GDN MTP 解码内核的 ROCm Triton 移植（Qwen3.5 系列扁平 `qkvz` 布局）；此前通过 #51674 仅支持 CUDA。现已关闭。
- **[PR #60834](https://github.com/vllm-project/vllm/pull/60834)** — ROCm gfx950：为 DeepSeek-V4 提供可选的 paged MXFP4 稀疏 indexer 稠密路径（68 B/token 的 indexer K 缓存，相比 FP8 的 132 B）。已关闭。

## 4. 性能与优化

- **[PR #63251](https://github.com/vllm-project/vllm/pull/63251)** — Model Runner V2：当 draft 模型的 `max_model_len` 更小且无法提升时，将引擎的 `max_model_len` 降至 draft 模型的值。修复 #57941 的 V2 场景。与正确性相关，但影响调度/内存。
- **[PR #63076](https://github.com/vllm-project/vllm/pull/63076)** — ROCm：为单组 MoE 路由（`num_expert_group == topk_group == 1`）提供寄存器驻留的 Triton sigmoid+bias top-k，绕过 AITER `biased_grouped_topk` 中未使用的 LDS 组扫描。
- **[PR #63155](https://github.com/vllm-project/vllm/pull/63155)** — DeepSeek-V4.1：在模型图流上捕获解码器重放图，复用共享图池的空闲块，而非保留第二个池。修复 #62965；影响 GB200 DP4 预填充。
- **[PR #62914](https://github.com/vllm-project/vllm/pull/62914)** — KV Offload：为 attention+GDN 混合模型提供规范的跨 TP offload，使文件系统缓存可在不同 TP 尺寸间复用（#61886 的 GDN 缓存类型切片）。
- **[PR #63006](https://github.com/vllm-project/vllm/pull/63006)** — 关于削减 Mooncake descriptor/WR 开销的 RFC：在全注意力 Qwen3 上测得相比 NIXL 的 KV 传输带宽下降 35% 至 67%，且 TTFT 更高；瓶颈是大量小传输。
- **[#62556](https://github.com/vllm-project/vllm/issues/62556)** — 开放讨论：Qwen3.8-Flash-Next B300 配方将 CUDA 图捕获尺寸留在 1,024 token，迫使预填充/混合步骤走 eager 路径并付出 GDN 主机开销。提高捕获尺寸可恢复可观吞吐。
- **[#52057](https://github.com/vllm-project/vllm/issues/52057)** — Adaptive DSpark 在线 profiling 在更高批量下漂移；启动时的重放估计需要改进。
- **[PR #63249](https://github.com/vllm-project/vllm/pull/63249)** — KV Offload：保留已存储事件的 prefix 顺序，使 `BlockStored` 事件保持父先于子，防止 KV 感知路由器丢弃子块。

## 5. 稳定性与回归

按严重程度排序：

1. **[#61160](https://github.com/vllm-project/vllm/issues/61160)**（OPEN，8 条评论）— 在 NIXL PD 分离下、启用自动前缀缓存（默认开启）服务 DeepSeek-V4.1-Flash 时出现**跨请求上下文污染**。响应中偶尔包含其他请求的内容。使用 `--no-enable-prefix-caching` 时干净。有可脚本化的复现。**最高优先级——正确性/安全性影响；无修复 PR 关联。**
2. **[#61229](https://github.com/vllm-project/vllm/issues/61229)**（OPEN，8 条评论）— NixlConnector：远程 READ 正在进行时，KV 块在租约到期时被释放；解码静默消费了被覆盖的 KV。出现在 vLLM 0.30.0，单主机 1P1D，UCX/TCP。
3. **[#63170](https://github.com/vllm-project/vllm/issues/63170)**（OPEN，4 条评论）— GLM-5.x（DSA）在流水线并行下（`--pipeline-parallel-size > 1`）：阶段开始时复用的层读取了过期的 top-k 索引。通过源码审查发现；与硬件无关。
4. **[#62939](https://github.com/vllm-project/vllm/issues/62939)**（OPEN，2 条评论）— MRV2 + DSpark + `enable_adaptive_verification` 在 `max_num_batched_tokens < max_num_seqs × draft query rows` 时启动失败（drafter 中的设备端 assert）。在 0.31.0 和 0.32.0、A100-40GB 上复现。
5. **[#62776](https://github.com/vllm-project/vllm/issues/62776)**（OPEN，7 条评论）— GB10（sm121，v0.32 nightly）上的 Qwen3.8-Flash-Next：超过约 `indexer_budget`（2048）token 的 prompt 内容对模型不可见。长上下文下的功能性回归。
6. **[#51743](https://github.com/vllm-project/vllm/issues/51743)**（OPEN，5 条评论）— H100 上的 DeepSeek-V4-Flash TP4：`--max-num-batched-tokens >= 24576` 使 EngineCore 在融合的 qnorm/rope/kv-insert 中崩溃；分配对内存 profiler 不可见。
7. **[#49197](https://github.com/vllm-project/vllm/issues/49197)**（OPEN，4 条评论）— Beam search 比预期慢约 1,000 倍（A100）。长期存在。
8. **[#46262](https://github.com/vllm-project/vllm/issues/46262)**（OPEN，8 条评论）— ROCm TP2 工具调用在 GLM-5.2-FP8 DSA 加 chunked prefill 下产生乱码输出；TP1 正常。
9. 今日关闭：**[#46283](https://github.com/vllm-project/vllm/issues/46283)**（中止的远程 KV 加载导致的解码侧 KV 块泄漏）、**[#53477](https://github.com/vllm-project/vllm/issues/53477)**（DFLASH2 强制重新处理上下文）、**[#56540](https://github.com/vllm-project/vllm/issues/56540)**（ROCm GLUON/TRITON 日志刷屏）。

缓解措施：对于 #61160，禁用前缀缓存或避免 PD 分离，直至修复。对于 #62939，确保 `max_num_batched_tokens >= max_num_seqs × draft query rows` 或禁用自适应验证。

## 6. 对应用开发者的意义

- **如果你在启用前缀缓存的情况下运行 PD 分离，现在就审计串扰问题。** #61160 属于那种表现为微妙错误答案而非崩溃的 bug——在 agentic 或多租户部署中非常危险。用 `--no-enable-prefix-caching` 做基准并比较输出。
- **分离式服务 API 正在围绕 render/generate/derender 趋于稳定。** [#56851](https://github.com/vllm-project/vllm/issues/56851) 和 [#42729](https://github.com/vllm-project/vllm/issues/42729) 在 `/inference/v1/generate` 上定义了请求级的 text/derender。如果你构建自定义 OpenAI 兼容前端，预期 render→generate→derender 契约将成为 token-ID 原生服务的标准路径。[#57593](https://github.com/vllm-project/vllm/issues/57593) 跟踪统一 `OpenAIServingChat` 和批量 derender 之间的聊天消息组装。
- **KV 感知路由器必须处理前缀有序的块事件。** 如果你消费 `BlockStored` 事件（LMCache、Mooncake、基于 NIXL 的路由器），关注 PR #63249——当父映射尚未建立索引时，子块可能被丢弃。
- **可编程 KV 缓存（[#57103](https://github.com/vllm-project/vllm/issues/57103)）即将为 agentic 工作负载到来。** 由路由器提供的会话生命周期意图驱动的、与提供方无关的保留/移动/配额策略。如果你正在为长期运行的 agent 构建会话感知路由，值得关注。
- **ROCm 上的推测解码正在追赶。** EAGLE/MTP 融合多步 draft 解码（#63096）加上 GDN MTP 解码 Triton 移植（#61855）打通了此前不可用的路径。在 MI3xx 上重新基准推测解码，别默认它不可行。
- **不要在没有测量的情况下过度调优 CUDA 图捕获尺寸。** #62556 显示 B300 Qwen3.8-Flash-Next 配方默认的 1,024 token 捕获尺寸让 GDN 模型错失大量预填充收益；两行配置改动可能比内核工作更重要。
- **Rust 前端处于对等路线图之上（[#44280](https://github.com/vllm-project/vllm/issues/44280)）。** `VLLM_USE_RUST_FRONTEND=1` 是实验性的且功能不完整；暂时不要用于生产，但要在中期规划一个 Python 可选的 API 服务器。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-10-23

## 1. 今日亮点

过去 24 小时内没有新版本发布，但 Q4 内核优化和模型支持方面的活动非常活跃。主要主题包括 Hopper（SM90）上的 GLM-5.3-Flash 性能工作、DeepSeek-V4（DSv4）内核融合与 PD 分离启用，以及 KV 缓存传输路径中的一系列正确性 bug（FP4 block scales、撤回时的 QSA indexer 状态），如果你运行分离式或混合模型工作负载，这些值得关注。CI/AMD 的 flaky 测试继续产生噪音，正在专门 issue 中跟踪。

---

## 2. 版本发布与破坏性变更

- **过去 24 小时内没有新版本发布。** 多份报告将 `v0.5.22` 和 `v0.5.17`/`v0.5.18` 作为当前/先前版本引用。今天没有宣布 API 或配置破坏性变更。

---

## 3. 新模型与硬件支持

- **SANA-Sprint 0.6B（扩散模型）** — 功能请求：为 `Efficient-Large-Model/Sana_Sprint_0.6B_1024px_diffusers` 提供原生 SGLang-Diffusion 支持，这是一个 1–4 步 1024px 文生图模型。[#43671](https://github.com/sgl-project/sglang/issues/43671)
- **Muse Spark** — Day-0 支持路线图，PR #44664–#44667 按顺序合并，外加 DeepGEMM 依赖升级。[#44678](https://github.com/sgl-project/sglang/issues/44678)
- **AMD gfx1250（aiter 后端）** — PR 在 gfx1250 上添加分页 **Gluon MLA decode**，通过直接读取 SGLang 的分页 KV 池，绕过 ASM MLA decode 内核对 FP8-Q / KV 布局的要求。[#44458](https://github.com/sgl-project/sglang/pull/44458)
- **AMD gfx950（FlyDSL）** — Qwen3.8 QSA decode 通过 AITER 的融合 FlyDSL 稀疏 decode 提供服务，取代当前的两遍 Triton gather+decode。[#45196](https://github.com/sgl-project/sglang/pull/45196)；以及 gfx95 上 Qwen3.5/Qwen3.8 的 FlyDSL GDN prefill / 因果 conv1d。[#39595](https://github.com/sgl-project/sglang/pull/39595)、[#41879](https://github.com/sgl-project/sglang/pull/41879)
- **昇腾 NPU** — 为全局多模态嵌入缓存（`--mm-global-cache-backend`）新增 `npu_memcache` 后端，消除了 NPU 部署对 RDMA/Mooncake 的依赖。[#41567](https://github.com/sgl-project/sglang/pull/41567)

---

## 4. 性能与优化

- **Hopper（SM90）上的 GLM-5.3-Flash** — Q4 路线图内核专项下的专门跟踪 issue（#42473）。[#45373](https://github.com/sgl-project/sglang/issues/45373)
- **DSv4 prefill 索引映射** — 将 V4.1 prefill top-k 页索引写入的 torch add/clamp/gather/compare/where/copy 流水线合并为单个内核。[#45938](https://github.com/sgl-project/sglang/pull/45938)
- **DSv4 K-norm-rope 存储** — 重写 `fused_k_norm_rope_flashmla`，以每 token 一个 warp（512 宽行）写入 V4.1 K 行，取代每 token 一个 256 线程 block 的方式，面向大 prefill 批次。[#45934](https://github.com/sgl-project/sglang/pull/45934)
- **DSv4 mHC 合并** — 通过依赖内核对每个元素的宽化，消除了完整 `[tokens, 4·hidden]` 残差的 fp32 拷贝。[#45940](https://github.com/sgl-project/sglang/pull/45940)（已关闭）
- **TRTLLM-Gen attention 的 DSv4 PD 分离** — 为 DSv4 trtllm-gen 后端启用 PD 分离（基于 #36652）。[#45221](https://github.com/sgl-project/sglang/pull/45221)
- **FLUX.3 扩散分离** — 将 prompt-encoder / image-encoder / DiT / decoder 拆分为独立 worker 池；后续 PR 添加声明式阶段部署。[#45309](https://github.com/sgl-project/sglang/pull/45309)、[#45394](https://github.com/sgl-project/sglang/pull/45394)
- **AMD GDN prefill** — 根据 PR 描述，FlyDSL 路径在 Qwen3.5-397B 形状（TP4、4 KV heads、16 V heads、K=V=128）上报告约 1.4–1.74× prefill 批次加速。[#39595](https://github.com/sgl-project/sglang/pull/39595)
- **Mooncake HiCache 控制** — 副本放置与读缓冲区控制，以及外部 linker 的预取模式，在准入前检测恢复失败。[#37390](https://github.com/sgl-project/sglang/pull/37390)、[#45600](https://github.com/sgl-project/sglang/pull/45600)

---

## 5. 稳定性与回归

按严重程度排序（正确性/静默错误优先）：

1. **PD 传输中 FP4 KV block scales 丢失** — 使用 `--kv-cache-dtype fp4_mx_block16` 时，PD 分离传输打包的 KV 但不传输 block scales；decode 对陈旧/零 scales 进行反量化 → **输出乱码**。[#45866](https://github.com/sgl-project/sglang/issues/45866)
2. **PD decode 撤回时 QSA indexer 状态损坏** — Qwen3.8-Flash-Next：一个被撤回后恢复的请求继承了另一个请求的 QSA indexer 状态（混合 `cpu_tensor` 备份路径）。[#45864](https://github.com/sgl-project/sglang/issues/45864)
3. **GLM-5.3-Flash EAGLE CUDA 非法内存访问** — 8×H20 TP8/EP8，在 `run_eagle_verify` → `build_grammar_vocab_mask` 中崩溃。[#45159](https://github.com/sgl-project/sglang/issues/45159)
4. **2 节点 GB300 上 Kimi-K3 DCP a2a decode 乱码** — CUDA-graph + NCCL graph-buffer 注册产生 12/12 退化输出；`NCCL_GRAPH_REGISTER=0` 可恢复输出。[#45367](https://github.com/sgl-project/sglang/issues/45367)
5. **`--enable-lmcache` + 禁用 radix cache 时调度器崩溃** — 在 0.5.22 上首次空闲检查时崩溃（影响自动禁用 radix cache 的 embedding 模式模型）。[#45929](https://github.com/sgl-project/sglang/issues/45929)
6. **`--max-queued-requests 0` + 优先级调度** — 空队列时调度器崩溃。[#45510](https://github.com/sgl-project/sglang/issues/45510)
7. **Triton 3.9 上 FP8 融合 MoE `swap_ab` 编译失败** — rank-0 scale 索引问题。[#45887](https://github.com/sgl-project/sglang/issues/45887)
8. **客户端断开时 `/v1/systemone` 请求未中止**（0.5.22）— 排队/运行中的工作继续执行至完成，与 chat completions 不同。[#45842](https://github.com/sgl-project/sglang/issues/45842)
9. **混合 GDN 模型上 HiCache 主机层命中降至零** — 一旦被驱逐的工作集超过约 3 个长前缀，mamba 池耗尽而 KV 留在主机上。[#45400](https://github.com/sgl-project/sglang/issues/45400)
10. **优先级抢占排序可能在 TP rank 间不一致** — 受害者按集合顺序重新入队，跨 rank 非确定性。[#45812](https://github.com/sgl-project/sglang/issues/45812)
11. **冷缓存下调用方 `mm_hashes` 导致 VLM 崩溃** — `index_copy_(): index out of bounds`；热缓存下调用方 hash 被静默忽略。修复 PR 已开：[#41375](https://github.com/sgl-project/sglang/pull/41375)
12. **CI/AMD**：`test_basic_sanity_dspark.py` 自 `c64886f9e3` 起在 H100 上 decode 与 prefill top-logprob 不匹配 >0.5 delta [#45846](https://github.com/sgl-project/sglang/issues/45846)；NIXL UCX 目标不可达 [#45850](https://github.com/sgl-project/sglang/issues/45850)；Mooncake v0.3.14 RDMA aux-data 失败 [#45849](https://github.com/sgl-project/sglang/issues/45849)；AMD 测试跟踪 [#45847](https://github.com/sgl-project/sglang/issues/45847)
13. **Flaky 测试/CI 汇总** — NVIDIA `PR Test Base`/`PR Test Extra` flakes 的持续跟踪。[#42752](https://github.com/sgl-project/sglang/issues/42752)

今天也有关闭为不活跃的：陈旧的 staging-watermark 订阅者（#34737）、Qwen3.8-27B NVFP4 坐标检测（#35949）、Ada SM89 上 Qwen3.8-27B AWQ（#36048）、`-lcuda` 链接失败（#36058）、`--config` 要求 `--model-path`（#36105）、DeepSeek-V4 `dsa_layer_skips_topk` 扩展（#36083）。

---

## 6. 对应用开发者的意义

- **在 PD 分离下暂时避免使用 FP4 KV 缓存（`fp4_mx_block16`）** — block-scale 传输缺口会产生静默错误输出而非报错。如果你已经运行此配置，在信任结果前请验证 decode 质量。
- **在撤回或 HiCache 下对混合/线性注意力模型保持谨慎** — 两份独立报告（#45864、#45400）显示驱逐或撤回后出现状态/KV 池不匹配。限制并发长前缀工作负载或监控主机 mamba 池利用率。
- **在 0.5.22 中 `--enable-lmcache` 目前无法与禁用 radix cache 组合使用** — 如果你使用 embedding 模式模型或 `--disable-radix-cache`，预计首次空闲时调度器会崩溃。
- **客户端取消行为不统一**：`/v1/chat/completions` 在断开时中止，但 `/v1/systemone` 不会。如果你依赖断开驱动的取消来控制成本，请为 systemone 流量添加显式中止调用。
- **Prometheus 指标命名可能变更** — 有一个 issue 提议将 `sglang:` 前缀改为下划线（#45418）；请规划仪表盘/告警以容忍或迁移。
- **Hopper 和 AMD 的性能提升即将到来**：GLM-5.3-Flash SM90、DSv4 内核融合以及 gfx950/gfx1250 FlyDSL 路径都在进行中 — 如果你在这些平台上，合并后值得基准测试。
- **扩散模型服务正在获得分离能力**（FLUX.3 encoder/DiT/decoder 拆分、SANA-Sprint 支持）— 如果你在 SGLang 上构建图像生成流水线，这与你相关。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-10-23

## 1. 今日亮点

发布节奏依然很高（b11815–b11829），其中最引人注目的是**新的 `--moe-cache-cpu-share` 路径，可在 CPU 上执行缓存未命中的 MoE 专家**（#30966），以及**Intel Arc 张量并行服务中提示词评估速度提升 19%**（#30956）。在正确性方面，两份独立的 SYCL DeltaNet“token 乱码”报告（#29183、#29167）以及 Qwen3.8-27B 长上下文吞吐量断崖（#27623，超过约 80K 后解码速度骤降约 25 倍）仍未解决，这应当给目前在 Intel/消费级硬件上对混合注意力模型的热情降温。

## 2. 发布与破坏性变更

- **b11829** — server：rerank 占位符现在仅从原始模板替换（[PR #30864](https://github.com/ggml-org/llama.cpp/pull/30864)）。对任何后处理 rerank 输出的用户来说，这是行为变更。
- **b11828** — server：real-time API 在**已提交音频排空后**发送 `complete`，完成触发点为提交的结束行，而非流干涸（[PR #30994](https://github.com/ggml-org/llama.cpp/pull/30994)）。这改变了流式音频客户端的时序语义。
- **b11826** — mtmd：MiniCPM-OCR 1.0 注册为独立的 projector 类型（[PR #30979](https://github.com/ggml-org/llama.cpp/pull/30979)）。
- **PR #31011**（开放中）— 引入 `--act-type {f32,f16}` / `LLAMA_ARG_ACT_TYPE`，默认 f32；激活类型成为**图复用键**的一部分，因此在请求间混用此设置会使图复用失效（[PR #31011](https://github.com/ggml-org/llama.cpp/pull/31011)）。

本窗口期内无 GGUF 格式或 CLI 破坏性移除。

## 3. 新模型与硬件支持

- **MiniCPM-OCR 1.0** — 通过复用 MiniCPM-V 4.6 clip 图和转换路径实现的视觉语言 OCR（[#30979](https://github.com/ggml-org/llama.cpp/pull/30979)）。
- **Nemotron** — 非标准 GQA、BPE tokenizer，以及 domyn-small pre-type 支持；`Metaspace prepend_scheme` 现在写入 GGUF 元数据（[#23343](https://github.com/ggml-org/llama.cpp/pull/23343)）。注意相关未修复 bug：Nemotron 3/3.5 GGUF 被错误标记为 "pixtral" 导致 pre-tokenizer 错误（[#30894](https://github.com/ggml-org/llama.cpp/issues/30894)）。
- **GigaChat 3.5 432B-A28B** — DeepSeek-V3 风格 MoE + MLA，审核中（[PR #25342](https://github.com/ggml-org/llama.cpp/pull/25342)）。
- **Hexagon NPU 后端** — 新增 CONV2D（f16/f32，已在 v75/v81 验证）和 CEIL 算子（[#30995](https://github.com/ggml-org/llama.cpp/pull/30995)、[#31006](https://github.com/ggml-org/llama.cpp/pull/31006)）；面向 Qwen3.8-Flash-Next 的 SGN 算子审核中（[#30346](https://github.com/ggml-org/llama.cpp/pull/30346)）。
- **OpenCL** — Adreno 深度卷积 conv2d，使用 local programs（[PR #30900](https://github.com/ggml-org/llama.cpp/pull/30900)）。
- **Soprano-1.1-80M 音频生成** — mtmd 支持审核中（[PR #28607](https://github.com/ggml-org/llama.cpp/pull/28607)）。
- **glm5** — QSA 层不再分配 `kq_mask`（[PR #31009](https://github.com/ggml-org/llama.cpp/pull/31009)）。

## 4. 性能与优化

- **SYCL 张量并行提示词评估：+19%**（范围 +16.7–20.6%），在双 Arc Pro B70 上通过更快的 `ggml_sycl_comm_exchange()` 实现，PPL 零变化 — 据报道使 `-sm tensor` 达到 `-sm layer` 同等水平（[PR #30956](https://github.com/ggml-org/llama.cpp/pull/30956)）。
- **MoE 专家缓存现可将未命中溢出到 CPU**（`--moe-cache-cpu-share`，外加调优脚本），以解码速度换取有效缓存容量（[PR #30966](https://github.com/ggml-org/llama.cpp/pull/30966)）。
- **Intel XMX mul_mat_vec_q 多列重构** — 针对重排 K-quants 和 Q8_0 在 int8 DPAS/ESIMD 上支持 2–80 激活列（[PR #29864](https://github.com/ggml-org/llama.cpp/pull/29864)）。
- **SYCL `set_tensor_2d`** 移除逐行上传回退，降低 `-sm tensor` 下的模型加载开销（[PR #30358](https://github.com/ggml-org/llama.cpp/pull/30358)）。
- **SYCL 图录制/重放**（CUDA-graph 移植）已合并，MKL flash-attention 的主机等待替换为显式依赖（B70 上约 4%），解除图使用阻塞（[PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725)、[PR #30684](https://github.com/ggml-org/llama.cpp/pull/30684)）。
- **FP16 激活端到端**（`--act-type f16`）审核中，受各架构支持检查限制（[PR #31011](https://github.com/ggml-org/llama.cpp/pull/31011)）。
- **glm5 输入优化** — 避免 `sel_mask_2d`/`new_pool_flat` 输入（[PR #30932](https://github.com/ggml-org/llama.cpp/pull/30932)）。

## 5. 稳定性与回归（按严重程度排序）

1. **SYCL DeltaNet 在长提示词上产生"token 乱码"**（Qwen3.6/3.8、Nemotron；Arc Pro B70）— 两份未修复报告，稠密模型在 131K+ 下不受影响（[#29183](https://github.com/ggml-org/llama.cpp/issues/29183)、[#29167](https://github.com/ggml-org/llama.cpp/issues/29167)）。尚无修复 PR；是混合注意力 + Intel 的基石问题。
2. **SYCL F16 在稠密 Qwen3.8-27B Q4_K_M 上自 #29107（IQ3 reorder）起输出 NaN**；禁用融合 GEMM 可掩盖（[#30892](https://github.com/ggml-org/llama.cpp/issues/30892)）。近期回归，有已知规避方法。
3. **Vulkan：Qwen3.8 DFlash/MTP 投机解码在 gfx1150 上发出越界 token `n_vocab`（248320）**（[#28158](https://github.com/ggml-org/llama.cpp/issues/28158)）。硬故障，AMD iGPU。
4. **CUDA/HIP flash attention 在 RDNA4 gfx1201、head_dim 256 上破坏长上下文预填充** — 立即高置信度 EOS（[#30884](https://github.com/ggml-org/llama.cpp/issues/30884)）。
5. **Qwen3.8-27B 混合 Gated DeltaNet 解码在 RTX 4080 SUPER 上超过约 80K 上下文后骤降约 25 倍**，而提示词处理正常（[#27623](https://github.com/ggml-org/llama.cpp/issues/27623)）。未解决，可能为架构性问题。
6. **CUDA MoE top-k NaN 清理缺口** — NaN 在选择偏置加入之前被清理，而非之后（[PR #31005](https://github.com/ggml-org/llama.cpp/pull/31005)）。
7. **`--tensor-split` 在长上下文 MoE 上输出退化**（[#28185](https://github.com/ggml-org/llama.cpp/issues/28185)，已关闭）以及**双 B70 SYCL 上 `-sm tensor` 内存泄漏**（[#27845](https://github.com/ggml-org/llama.cpp/issues/27845)，已关闭）。
8. **安全：通过 WebUI `?q=` 查询参数进行指令注入** — 仍开放（[#25790](https://github.com/ggml-org/llama.cpp/issues/25790)）。
9. **今日已关闭的回归：** Gemma 4 风格词表的 llama_detokenize 空格 bug（[#30905](https://github.com/ggml-org/llama.cpp/issues/30905)）、Nemotron tokenizer 处理错误（[#30894](https://github.com/ggml-org/llama.cpp/issues/30894)）、非连续 SYCL CONV_2D 错误结果（[#30363](https://github.com/ggml-org/llama.cpp/pull/30363)）。

## 6. 对应用开发者的意义

- **Intel Arc / SYCL 运维者：** 在长上下文下对混合注意力模型要有所选择。稠密 Qwen3.8 可工作到 131K+，但 Gated DeltaNet 变体在 SYCL 上正活跃地损坏（#29183、#29167），且稠密 Q4_K_M 自 #29107 起存在 F16 NaN 回归（#30892）— 请固定使用已知良好的构建或禁用融合 GEMM。不过收益是实打实的：在张量并行 B70 上提示词评估 +19%，使多 GPU Arc 服务真正具有竞争力。
- **MoE 自托管者：** 新的 `--moe-cache-cpu-share` 为你提供可调的 CPU 溢出专家缓存旋钮，这比外部缓存层更能回应反复出现的"专家缓存"功能请求（#20757、#29949）。搭配无 `kq_mask` 的 QSA 路径（#30965、#31009），在 4K–8K ub 下可释放 2–4 GB VRAM 供专家使用。
- **Rerank 和实时音频 API 用户：** 今日落地两项服务端语义变更 — rerank 占位符处理（#30864）和实时 `complete` 在已提交音频排空时触发而非流干涸（#30994）。请重新测试流式音频管道和 rerank 后处理。
- **Agent/WebUI 部署：** WebUI 查询参数中未修复的指令注入问题（#25790）意味着不可信的 URL 输入可影响提示词。在反代层进行净化，直到上游解决。
- **AMD 上的投机解码：** 在 Vulkan gfx1150 上避免将 DFlash/MTP 与 Qwen3.8 搭配，以及在 head_dim 256 的 RDNA4 上避免 flash attention（#28158、#30884）— 两者都产生静默垃圾或过早 EOS 而非显式错误，这是自动化管道最糟糕的故障模式。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-10-23

## 1. 今日要闻

过去 24 小时内没有新版本发布，但 issue 跟踪器被两个严重的云端可靠性问题占据：一个 Pro 级账户报告所有云端模型出现 95% 的失败率（[#15453](https://github.com/ollama/ollama/issues/15453)），以及 `glm-5.3-flash:cloud` 上持续存在的生成退化问题（[#18980](https://github.com/ollama/ollama/issues/18980)）。在工程方面，活动集中在 MLX 后端工作（YaRN 缩放、Nemotron 3.5 Bolt）以及一批针对 OpenAI 和 Anthropic 兼容端点的解析器/流式正确性修复。

---

## 2. 版本发布与破坏性变更

**过去 24 小时内没有新版本发布。**

有一个行为变更正以 PR 形式落地，开发者应当了解：

- **显式空 system prompt 将被遵循** — Modelfile 中的 `SYSTEM ""` 将清除基础模型的 system prompt，而不再静默继承它。语义变为：省略 → 继承，非空 → 替换，空 → 清除。（[#18990](https://github.com/ollama/ollama/pull/18990)）

---

## 3. 新模型与硬件支持

以下所有条目均为进行中的 PR，尚未发布：

- **Nemotron 3.5 Bolt 74B-A9B（MLX）** — 添加逐层专家配置、通过 DFlash runner 实现的 LiLiCorr 投机解码、预量化 affine 3-bit 导入以及混合精度专家堆叠。（[#19229](https://github.com/ollama/ollama/pull/19229)）
- **Qwen3 / Qwen3.5 的 YaRN RoPE 缩放（MLX）** — 遵循文本和 mRoPE 的显式 RoPE 缩放元数据，保留非旋转维度。（[#19231](https://github.com/ollama/ollama/pull/19231)）
- **Gradium Phonon GA 检查点** — 用 GA 格式替换预发布检查点路径，添加默认语音导入和语音条件控制；需要 Ollama ≥ 0.40.9。（[#19227](https://github.com/ollama/ollama/pull/19227)）
- **GB10（DGX Spark / Asus Ascent GX10）已被记录为受支持硬件。**（[#13987](https://github.com/ollama/ollama/pull/13987)）

---

## 4. 性能与优化

今天没有已落地的吞吐量或延迟相关工作。相关进行中条目：

- **`num_predict == -2` 用于动态 token 限制** — 与 llama.cpp 行为保持一致，填满上下文缓冲区，而非强制静态上限或无界生成。适用于长输出批处理任务。（[#9547](https://github.com/ollama/ollama/pull/9547)）
- **KV 缓存类型可从 Modelfile 设置**（功能请求，开放中）— 目前仅 `KV_CACHE_TYPE` 环境变量可控制此项；请求允许按模型设置 `q8_0` 等，这对在受限 VRAM 上容纳约 30B 模型很重要。（[#16245](https://github.com/ollama/ollama/issues/16245)）
- **可插拔 KV 连接器框架**（提案）— 初始范围为实现外部 KV 后端（如 LMCache）的生命周期框架。（[#17696](https://github.com/ollama/ollama/issues/17696)）
- **Grok + KV 缓存量化崩溃** — 与 llama.cpp 一致，现在对 Grok 强制关闭 flash attention，防止启用 KV 缓存量化时 runner 崩溃。（[#15050](https://github.com/ollama/ollama/pull/15050)）

---

## 5. 稳定性与回归

按严重程度排序：

**严重 — 云端**
- **Ollama Cloud Pro：所有云端模型约 95% 失败率** — 付费 Pro 订阅者报告 `glm-5.1`、`kimi-k2.5`、`qwen3.5`、`deepseek-v3.2` 云端端点服务基本不可用。55 条评论，22 个 👍 — 这是本时间窗口内参与度最高的 issue。无关联修复 PR。（[#15453](https://github.com/ollama/ollama/issues/15453)）

**高 — 本地生成正确性**
- **自 10-12 起 `glm-5.3-flash:cloud` 出现大规模退化** — 5–8% 的请求因严重输出退化而失败；报告者自己的调试暗示 "cluster 829" 上存在主机侧数据区故障。31 条评论。无修复 PR。（[#18980](https://github.com/ollama/ollama/issues/18980)）

**高 — API 兼容性**
- **`/v1/responses` 流在推理中途关闭且无终止事件**（已关闭）— 客户端在 `nemotron-3-super:120b` 的推理流中看到静默 EOF。修复 PR 检测带内生成错误并发出单个 `response.failed`，保留 HTTP 200 语义。（[#17118](https://github.com/ollama/ollama/issues/17118) → [#19225](https://github.com/ollama/ollama/pull/19225)）
- **`mistral-large-4` 以 HTTP 400 拒绝 `role: "developer"`** — 破坏发送 developer 角色指令的 Codex 客户端。变通方法：将角色改写为 `system`。相关 PR 在各渲染器中泛化 developer 指令处理。（[#19021](https://github.com/ollama/ollama/issues/19021) → [#19199](https://github.com/ollama/ollama/pull/19199)、[#19230](https://github.com/ollama/ollama/pull/19230)）
- **Gemma 4 的思考无法通过 OpenAI 兼容 API 可靠禁用** — 在 `gemma4:12b-mlx` 上，扩展推理导致 Aider 自动补全流程出现显著延迟。（[#19217](https://github.com/ollama/ollama/issues/19217)）

**中 — 工具调用 / 解析**
- **工具参数内的字面 `</function>` 破坏 XML 解码**并中止调用。修复跟踪参数嵌套，将闭合标签转义为数据。（[#19228](https://github.com/ollama/ollama/pull/19228)）
- **Gemma 4 完整工具调用在跟随尾随噪声（如 `$$`）时被丢弃**。修复使用 JSON 解码器的边界恢复完整对象。（[#19226](https://github.com/ollama/ollama/pull/19226)）
- **上下文截断可能丢弃最后一条用户消息**，当其后跟随工具调用时 — `chatPrompt()` 无论类型如何都保留最后一条消息。修复保留最后一条*用户*消息。（[#19058](https://github.com/ollama/ollama/pull/19058)）

**中 — 报告 / 配置**
- **`OLLAMA_CONTEXT_LENGTH` 未反映在 `/api/show` 或 `/api/tags` 中** — 即使有效可用上下文更低，模型仍报告原生上下文窗口，误导根据这些值调整 prompt 大小的客户端。（[#18995](https://github.com/ollama/ollama/issues/18995)）

**中 — Windows 应用**
- **桌面版 0.33.1 静默启动内置服务器失败** — `server.log` 保持 0 字节，无监听器；手动 `ollama serve` 可正常工作。修复 PR 记录此前被吞掉的 `osrv.Run` 错误。（[#18061](https://github.com/ollama/ollama/issues/18061) → [#19179](https://github.com/ollama/ollama/pull/19179)）

**低 — 安全 / 卫生（均已关闭）**
- **Ollama Go 二进制中 36 个 CVE**（1 个严重，11 个高危），主要来自 Go 工具链和 vendored 依赖。（[#16033](https://github.com/ollama/ollama/issues/16033)、[#19162](https://github.com/ollama/ollama/issues/19162)）

**已关闭 / 已修复**
- 由 `getExistingName` 未能跟踪规范化名称部分导致的间歇性 "model not found" 错误。（[#18438](https://github.com/ollama/ollama/pull/18438)）
- 初始请求上思考设置被放宽后，Anthropic web search 在后续请求中失败。（[#19098](https://github.com/ollama/ollama/pull/19098)）
- 启动器现在接收完整的云端模型元数据 — 上下文窗口、思考级别、能力。值得注意的是修复了 Codex 对未列表模型回退到 128k 的问题（例如 `glm-5.2` 现在正确报告 1,048,576）。（[#19223](https://github.com/ollama/ollama/pull/19223)）

---

## 6. 对应用开发者的意义

- **目前应将云端端点视为不可靠。** 如果你在生产中依赖 Ollama Cloud Pro，你需要一条回退路径 — 要么本地模型，要么备用提供商。95% 失败率的报告是付费计划的问题，且没有已发布的修复，而 `glm-5.3-flash` 的退化是间歇性的（约 5–8%），这比硬失败更糟，因为它会静默损坏输出。
- **不要信任 `/api/show` 返回的上下文长度。** 在 [#18995](https://github.com/ollama/ollama/issues/18995) 解决之前，即使 `OLLAMA_CONTEXT_LENGTH` 限制了有效窗口，模型仍报告原生上下文。请从你的环境配置计算自己的预算，而非依赖 API 响应。
- **`role: "developer"` 尚不可移植。** 如果你正在使用 Codex 风格客户端构建基于 `/v1/responses` 端点的应用，在 [#19199](https://github.com/ollama/ollama/pull/19199) 落地之前，请将 developer 消息规范化为 `system`，并注意某些云端模型（尤其是 `mistral-large-4`）会直接拒绝它。
- **流式错误处理需要超时 + 终止事件检查。** 如果你依赖 `/v1/responses` 流式传输，不要假设干净的 EOF 就意味着成功。[#19225](https://github.com/ollama/ollama/pull/19225) 中的修复引入了 `response.failed`，但在你使用包含该修复的构建之前，请为流包装空闲超时并验证确实收到了终止事件。
- **工具调用解析正变得更加健壮，但请围绕已知缺口进行规划。** 参数内的字面闭合标签和有效调用后的尾随噪声目前分别在 Qwen3-Coder 和 Gemma 4 上导致调用被丢弃。如果你在这些模型上进行 agentic 工作，请添加输出验证和重试逻辑，直到 [#19228](https://github.com/ollama/ollama/pull/19228) 和 [#19226](https://github.com/ollama/ollama/pull/19226) 发布。
- **空 `SYSTEM ""` 语义正在变化。** 如果你的任何 Modelfile 依赖于当前行为 — 即尽管显式空 `SYSTEM` 指令仍保留基础模型 prompt — 请在升级到 [#18990](https://github.com/ollama/ollama/pull/18990) 之后之前审计它们。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-10-23

## 今日焦点
最主要的事件仍然是 **v1.107.0 供应链投毒事件**（issue #47826）：PyPI 已下架该版本，Docker 的 `latest`/`main-stable` 标签也已重新指向，但修复工作仍在陆续合入——将 eMudhra 根 CA 修复回移植到 `stable/1.106.x` 的请求（#47904）以及捆绑 CA/Prisma 兼容性修复 PR（#47969）均在推进中。在安全工作之外，今天的 PR 队列集中在 provider 和适配器的打磨上（Speechify TTS、Gemini 上下文缓存成本核算、Vertex Model Garden 请求头转发、SAP 流式工具调用修复）。过去 24 小时内没有发布新版本。

## 发布与破坏性变更
过去 24 小时内无新版本发布。来自进行中工作的运维备注：
- **Docker 标签信任：** 如果你固定使用 `latest`/`main-stable`，请重新拉取——窃密镜像已被移除，但缓存层可能仍然存在。参见 #47826。
- **`stable/1.106.x` CA 根证书：** 1.106.x 镜像仍然信任 `emSign ECC Root CA - G3`；已在 #47904 中请求回移植 #47670。
- **System One 问题数量上限已移除**（#47985）：超过 128 个命名问题的批次现在可以通过共享校验器。

## 新模型与硬件支持
- **Speechify TTS**（`speechify/`）已为 `/v1/audio/speech` 添加，支持 `simba-3.5`、`simba-3.2`、`simba-3.0` — PR #47990。
- **TopxAI** 注册为 JSON 配置的 OpenAI 兼容 provider（Chat Completions + Responses，10 个模型）— PR #41919。
- **FlexAI** OpenAI 兼容 provider 注册（Token Service）— PR #35770。
- **JevRank / Perplexity + Jev 决策模型**通过 rerank 接口接入 — PR #47972。
- **Nano-Gpt** 被请求加入 UI provider 列表（已有文档，但不可选择）— issue #34499。
- **社区模型/provider 请求**继续在置顶主题中收集 — issue #18686。

## 性能与优化
- **Gemini 上下文缓存存储成本**现在按每 token 每小时核算；缓存 token 数量和缓存生命周期记录在 spend 行上 — PR #47989。
- **Rerank 成本保真度：** 现在使用 provider 上报的成本，而非硬编码的 $0 — PR #47843。
- **基于延迟的路由**在并发下仍会退化为随机加权选择，原因是 `async_log_success_event` 中的丢失更新竞态（16× Anthropic + 4× OpenAI 密钥）— issue #24720，无修复 PR。
- **无限制的上游错误体摄入**在遇到大体积（观测到 114 MB）错误响应时可能阻塞事件循环 — issue #34031，无修复 PR。
- **Retry-After 被忽略**，对于共享同一限流上游的多部署模型组 — issue #34399，无修复 PR。

## 稳定性与回归
按严重程度排序：

1. **严重 — v1.107.0 供应链投毒**（#47826）：`cook.pth` 凭据窃取器 + `sitecustomize` RCE 加载器，由仿冒仓库 `Berri-AI/litellm` 构建。PyPI 已移除；Docker 标签已撤下。修复 PR #47904、#47969 正在推进。**任何运行过 1.107.0 的人都必须轮换凭据。**
2. **高 — 团队删除后密钥仍然认证有效**（#34217）：`POST /team/delete` 不会像 `/key/delete` 那样从认证缓存中驱逐虚拟密钥。无修复 PR。
3. **高 — 多 worker 部署中 Postgres `max_connections` 耗尽时所有密钥失败**（#34479）。无修复 PR。
4. **高 — 瞬态 Postgres/HAProxy 故障 → 对有效模型误报 "Invalid model name"**（#26237）。无修复 PR。
5. **中 — 缓存命中 token 语义**（#39057）：`spend=0` 但 token 列重放了原始用量 — 对下游报表造成歧义。
6. **中 — `token_counter` 拒绝 `detail: "original"`**（#47327）→ 产生 ERROR 日志并跳过上下文窗口检查。
7. **中 — 图像生成上的 PII 掩码绕过**（#46482）：调用前的 Presidio MASK 对聊天进行了脱敏，但未处理图像提示词 — 修复 PR 已开。
8. **中 — Vertex Anthropic `response_format` + `thinking` 400**（#26334）；Claude Code + Foundry `reasoning.effort`/Pydantic 错误（#27091）。
9. **中 — Bedrock SigV4 重试时重放过期请求头**（#27513）。
10. **低–中 — Claude Code / Bedrock `websearch_interception` 从不触发**（#26252）；`complexity_router` 拒绝 `thinking.type=adaptive`（#26224）；`auto_router` 元数据泄漏到严格的 `/responses`（#26241）。
11. **进行中的修复：** SAP 流式工具调用 `ValidationError`（#46459）、Gemini `reasoning_effort` xhigh/max 钳制（#46514）、畸形 completion 导致的 400（#47986）、Anthropic `null stop_sequence`（#47987）、`search_result` token 计数（#47983）、Vertex Model Garden 请求头转发（#47984）、大小写不敏感的 `User-Agent` 查找（#41012）。

## 对应用开发者的意义
- **立即轮换凭据**，如果你从 PyPI 或 Docker 部署了 1.107.0——假定 `cook.pth` 和 `sitecustomize` 已执行。切回固定的 `stable/*` 标签并重新校验镜像摘要。
- **不要基于 Docker `latest` 构建**此项目；固定精确摘要。事件期间的标签切换本身就是供应链风险信号。
- **审计团队删除流程**（#34217）：如果在团队级别撤销，密钥可能仍从缓存中有效——在修复之前，同时删除单个密钥。
- **自行规划 Postgres 连接池大小，并设置感知 `Retry-After` 的客户端退避**——路由器不会为多部署组做这件事（#34399），而连接池耗尽会级联为所有密钥失败（#34479）。
- **如果你将 Claude Code / Anthropic Messages 路由到 Bedrock 或 Foundry**，多个适配器仍然粗糙（websearch、adaptive thinking、effort 参数）——在对应 PR 合入之前，预期需要手动丢弃或代理这些参数。
- **成本报表正在改善但并不统一**：Gemini 缓存存储和 rerank provider 成本此前被低估；如果你基于 `spend_logs` 做内部计费，在将代理响应缓存作为计费原语采用之前，请重新审视历史对账以及 #39057 中的缓存命中语义问题。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-10-23

## 1. 今日亮点

今天没有新版本发布，但有 31 个 issue 和 20 个热门 PR 有活动，主要集中在 Unsloth Studio/Desktop —— 尤其是 XPU/MPS 的 GPU 显存治理、MoE 热/冷专家拆分，以及一个通过双向 TLS RPC 将家庭网络机器配对成集群服务的 PR。此外还落地了一批正确性修复，涉及扩散模型（SDXL Hires 修复、Z-Image CFG 拆分、Wan 驻留）、旧版 TRL 上的 GRPO/vLLM 权重同步，以及 Windows 上的 safetensors 加载。

## 2. 发布与破坏性变更

过去 24 小时没有新版本发布。有两点配置/兼容性事项值得关注：

- **更新器现在会在索引滞后时锁定匹配的 `unsloth` + `unsloth-zoo` 组合**，防止安装时解析到不兼容的 zoo 版本（[#14834](https://github.com/unslothai/unsloth/pull/14834)）。
- **预量化缓存 etag 解析逻辑已变更**，改为遵循 `huggingface_hub>=1.32` 引入的共享 Hub blob 存储（Xet 布局）；旧缓存可能在失效前表现不同（[#14819](https://github.com/unslothai/unsloth/pull/14819)）。

## 3. 新模型与硬件支持

- **MoE 热/冷专家在 GPU 与 CPU 间拆分** —— 功能请求：自动将热专家放在 GPU、冷专家放在 CPU，以缓解新式 MoE 模型的显存压力（[#14484](https://github.com/unslothai/unsloth/issues/14484)）。
- **DeepSeek-V4.1-Flash GGUF 被阻止加载** —— 内置的 llama.cpp 无法识别 `deepseek41-dspark` 架构；正在通过 `--fit-target` DSpark sidecar 修复进行规避（[#14695](https://github.com/unslothai/unsloth/issues/14695)、[#14431](https://github.com/unslothai/unsloth/pull/14431)）。
- **家庭网络 RPC 集群** —— 机器配对一次后，即可通过 llama.cpp RPC 经 mTLS 将一个 GGUF 拆分到多台机器上；无需账号或互联网（[#14274](https://github.com/unslothai/unsloth/pull/14274)）。
- **DGX Spark 双节点集群** —— ConnectX-7 200GbE 流水线训练加诊断，已在真实 GB10/sm_121a 硬件上实测（[#10280](https://github.com/unslothai/unsloth/pull/10280)）。
- **OmniVoice LoRA/全量微调 + 推理** 请求集成进 UI（[#14660](https://github.com/unslothai/unsloth/issues/14660)）。
- **Qwen3.5 GatedDeltaNet 上下文并行** 仍不支持（循环卷积 + 门控 delta 规则阻止了 FSDP2 分片）（[#12051](https://github.com/unslothai/unsloth/issues/12051)）。

## 4. 性能与优化

- **Windows safetensors pread 路径** 针对 transformers 5.0–5.16，避免分片加载时的 commit-limit 耗尽和 OS error 1455（[#14856](https://github.com/unslothai/unsloth/pull/14856)）。
- **Z-Image CFG 拆分** 现在仅在去噪器已编译或正在重放计算图时启用，避免在 eager/off 层级中浪费拆分步骤（[#14868](https://github.com/unslothai/unsloth/pull/14868)）。
- **CFG 并行权重探测** 已修复，改为在大型推理张量内部采样，而非超出缓冲区（[#14844](https://github.com/unslothai/unsloth/pull/14844)）。
- **Wan 流水线驻留** 现在会在 `transformer_2` 为空槽时记录请求峰值（Wan2.1 / Wan2.2-TI2V-5B），从而启用可测量的驻留流式传输（[#14864](https://github.com/unslothai/unsloth/pull/14864)）。
- **请求为多 GPU 层拆分增加 0% 显存预算下限**，以强制卸载同时保留余量（[#13598](https://github.com/unslothai/unsloth/issues/13598)）。
- **XPU/MPS 训练显存上限** 以及图像生成遵循显存预算的问题仍未解决（[#8178](https://github.com/unslothai/unsloth/issues/8178)）。

## 5. 稳定性与回归

按严重程度排序：

1. **GRPO rollout 正确性（高）** —— 在 TRL 0.22–0.27 上搭配 `use_vllm=True, fast_inference=False` 时，LoRA 权重从未同步到 vLLM，导致整个训练过程中每次 rollout 都使用初始权重。修复 PR 已开启，同时拒绝量化基座（[#14831](https://github.com/unslothai/unsloth/pull/14831)）。
2. **Windows GGUF 加载崩溃（高）** —— Studio Web UI 可能让服务器崩溃，而不是走低显存路径；在无设备的 Vulkan 上，加载会挂起 30 分钟以上。PR 允许在 Vulkan 挂起或无设备时回退到 CPU（[#14513](https://github.com/unslothai/unsloth/issues/14513)、[#14521](https://github.com/unslothai/unsloth/pull/14521)）。
3. **DeepSeek-V4.1-Flash 上的 Metal OOM（高）** —— 使用 DSpark sidecar 和 `--fit on` 进行 prefill 时出现 `kIOGPUCommandBufferCallbackErrorOutOfMemory`；随后服务器拒绝所有请求。修复 PR 在 `--fit-target` 中预留 sidecar 并支持恢复（[#14431](https://github.com/unslothai/unsloth/pull/14431)）。
4. **SDXL Hires 修复在 CPU 卸载下失败（中）** —— VAE latent 编码在错误的设备上运行；PR 将编码移回卸载 VAE 计算所在的设备（[#14851](https://github.com/unslothai/unsloth/pull/14851)）。
5. **SDXL Hires latent 放大先解码为 PIL 再重新编码（中）** —— 重构后直接对 latent 进行插值，与 ComfyUI LatentUpscale 行为一致（[#14863](https://github.com/unslothai/unsloth/pull/14863)）。
6. **自动压缩后附件不可读（中）** —— 图像/PDF 变得无法恢复，且 `search_conversation` 从未被调用（[#14708](https://github.com/unslothai/unsloth/issues/14708)）。
7. **CPU 对话归档嵌入卡顿** —— 长时间、工具调用密集的聊天在 llama.cpp 接收推理前会在 CPU 嵌入上花费数分钟；Stop 无法取消（[#14519](https://github.com/unslothai/unsloth/issues/14519)）。
8. **pre-commit.ci 开销（中）** —— `scripts/enforce_kwargs_spacing.py` 高度未优化，给共享 CI 带来压力（[#14174](https://github.com/unslothai/unsloth/issues/14174)）。
9. **安全审计噪音（低）** —— pandas 3.1.0 新增的 `find_stack_level` 测试在每个 PR 上都触发 marshal/exec 扫描器报 HIGH；基线 PR 已提交（[#14870](https://github.com/unslothai/unsloth/pull/14870)）。
10. **Windows 上的 Intel XPU LoRA 推理** —— GNU/MSVC 混合链接参数导致构建失败（[#14807](https://github.com/unslothai/unsloth/issues/14807)）。
11. **全新 Ubuntu 安装后 Lemonade / FastFlowLM 停止工作**（[#14650](https://github.com/unslothai/unsloth/issues/14650)）。

近期已关闭：多账号模型同步（[#12365](https://github.com/unslothai/unsloth/issues/12365)）、消息编辑（[#13938](https://github.com/unslothai/unsloth/issues/13938)）、Qwen3-ASR 语言被忽略（[#14547](https://github.com/unslothai/unsloth/issues/14547)）。

## 6. 对应用开发者的意义

- **如果你在 TRL < 0.28 上使用 vLLM 运行 GRPO，请升级或等待 #14831** —— 训练看似正常运行，但 rollout 静默使用陈旧权重，这会使奖励信号和 checkpoint 失效。
- **Windows 上的 safetensors 加载现在更稳健了**，在 transformers 5.x 上；随着 #14856 落地，页面文件耗尽导致的 OOM 失败将减少。
- **本地多机服务正在成为一等公民**（#14274 中的家庭网络 mTLS RPC，#10280 中的 DGX Spark 集群）—— 对没有数据中心互联的团队来说是一条可行路径，但需要通过组合锁定的更新器（#14834）确保 Unsloth 构建版本匹配。
- **MoE 显存治理是新兴痛点** —— 热/冷专家拆分（#14484）与 XPU/MPS 显存上限（#8178）对在消费级或工作站 GPU 上运行大型 MoE 的团队影响最大。
- **Studio UX 债务**（预设持久化 #14603、工具审批通知 #14877、安装训练 CTA #14861、UI 冗长 #14582）正在被积极清理 —— 智能体开发者应期待审批流程和模型状态恢复方面更快的迭代。
- **自定义聊天模板超过 64KB 和远程提供商自定义请求头** 是开放缺口，如果你的部署依赖定制的 Jinja 或 LiteLLM 风格路由（[#14841](https://github.com/unslothai/unsloth/issues/14841)、[#14811](https://github.com/unslothai/unsloth/issues/14811)）。

</details>