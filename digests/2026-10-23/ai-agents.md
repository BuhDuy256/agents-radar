# OpenClaw 生态日报 2026-10-23

> Issues: 98 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-10-23 02:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-10-23

## 1. 今日概览

OpenClaw 展现出**极高的工程推进速度**，过去 24 小时内有 500 个 PR 和 98 个 issue 被更新，不过开放 PR 数（245）和开放 issue 数（67）表明审查积压正在增长。新版本（v2026.10.6）发布了**强制性的 Node 运行时升级**，原因是上游 TLS 证书遭到破坏——这是一次重要的安全强制迁移。当天的活动主要集中在**稳定性回归**（网关阻塞、事件循环停滞、会话状态失败）以及围绕密钥、exec 审批和 realtime Talk 的**安全/权限处理问题**。总体而言项目健康且维护活跃，但发布阻塞项（多个带有 `impact:ux-release-blocker` 的 P0/P1）表明当前稳定分支仍背负未解决的可靠性债务。

---

## 2. 版本发布

### v2026.10.6 — `openclaw 2026.10.6`

**亮点（摘自发布说明）：**
- **现在必须使用已修补的 Node 运行时：**
  - 24 系列需 Node **24.22.1+**，26 系列需 Node **26.12.1+**。
  - 原因：这些构建会拒绝使用**2026 年 10 月 Node.js 安全版本中所涉及的已泄露证书密钥**签名的 TLS 链。
  - Docker 镜像已附带已修补的 Node。

**迁移 / 破坏性说明：**
- 对于运行旧版 Node 24/26 构建的用户，这实际上是一次**强制升级**——未修补的 Node 版本在对接更新后的证书链时可能 TLS 握手失败。
- 24 系列用户必须使用 `>=24.22.1`；26 系列用户必须使用 `>=26.12.1`。
- 相关的后续问题已在跟踪器中显现：[#180903](https://github.com/openclaw/openclaw/issues/180903) 报告了一次受 Node 限制的更新，导致插件 peer-link 仍停留在旧的安装根目录，而处于降级状态的网关的状态所有权随后阻止了 `openclaw update` 修复。
- 摘要中未宣布破坏 schema 的配置迁移，但 Doctor/状态 schema 的工作仍在继续（参见 [#180690](https://github.com/openclaw/openclaw/issues/180690) 关于 v28→v31 schema 迁移）。

**评估：** 这是一次**安全强制发布**，而非功能发布。运维人员应将 Node 升级视为强制要求。

---

## 3. 项目进展

24 小时内**合并/关闭了 255 个 PR**，吞吐量强劲。数据中反映的值得关注的推进/修复工作：

- **已关闭的 issue（修复已落地或已解决）：**
  - [#181101](https://github.com/openclaw/openclaw/issues/181101) — Linux 非 ASCII 挂载点被解码为错误路径（P3，`not-repro-on-main`，已关联 PR）。
  - [#181125](https://github.com/openclaw/openclaw/issues/181125) — Doctor 媒体迁移有损地重写损坏的对话记录归档（P2，数据丢失，已关联 PR 开放中）。
  - [#181050](https://github.com/openclaw/openclaw/issues/181050) — npm 更新在 UGREEN UGOS 上因执行位导致 `package-verify` 失败（P0，发布阻塞，已关闭）。
  - [#180903](https://github.com/openclaw/openclaw/issues/180903) — 受 Node 限制的更新导致插件 peer-link 陈旧（P1，已关闭）。
  - [#177876](https://github.com/openclaw/openclaw/issues/177876) — `2026.10.5` Doctor 运行时清理被 `sd-pam` 阻塞（P1，`queueable-fix`，已关闭）。
  - [#175794](https://github.com/openclaw/openclaw/issues/175794) — Realtime Talk WebSocket 绕过受管代理（P1，安全，已关闭）。
  - [#179158](https://github.com/openclaw/openclaw/issues/179158) — 大型流式工具调用对每个增量重复解析整个参数缓冲区（P2，已关闭）。
  - [#159104](https://github.com/openclaw/openclaw/issues/159104) — Ambient webchat 解析为 `kind: cron` 会话（P0，发布阻塞，已关闭）。
  - [#176994](https://github.com/openclaw/openclaw/issues/176994) — QA 子代理交接超时且未标识缺失的转换（已修复）。
  - [#144223](https://github.com/openclaw/openclaw/issues/144223) — 2026.9.3 云 worker 因内嵌工具权限不匹配而被拒绝（已关闭）。
  - [#172817](https://github.com/openclaw/openclaw/issues/172817) — 控制 UI 中未加标签的空「Locale」文本框（P2，`queueable-fix`，已关闭）。

- **活跃 PR 主题：** 会话权限修复（[#181203](https://github.com/openclaw/openclaw/pull/181203)）、模型目录性能（[#181190](https://github.com/openclaw/openclaw/pull/181190)）、聊天中的插件原生视图（[#173135](https://github.com/openclaw/openclaw/pull/173135)）、PostgreSQL 上的配置错误处理（[#180687](https://github.com/openclaw/openclaw/pull/180687)、[#181224](https://github.com/openclaw/openclaw/pull/181224)），以及内存/Dreaming 性能（[#180692](https://github.com/openclaw/openclaw/pull/180692)）。

---

## 4. 社区热点

| 排名 | 条目 | 评论数 | 重要原因 |
|------|------|----------|----------------|
| 1 | [#160959](https://github.com/openclaw/openclaw/issues/160959) — 网关在捕获大型外部插件时阻塞数分钟（2026.9.6 回归） | 42 | **P0，钻石龙虾。** 讨论最多的单一 issue。底层需求：插件/包捕获不得阻塞网关事件循环。自 #144252 以来的回归。 |
| 2 | [#53763](https://github.com/openclaw/openclaw/issues/53763) — 内置无头浏览器以实现可靠的 Web 访问（已关闭） | 18 | 用户希望有一流的可靠 Web 访问，而不受 Chrome/第三方 API 脆弱性的影响。 |
| 3 | [#140010](https://github.com/openclaw/openclaw/issues/140010) — Windows 睡眠/恢复时 WebSocket 重连失败（30–60 秒以上） | 14 | P1。Windows 笔记本睡眠/唤醒的 UX 是一个反复出现、高摩擦的主题。 |
| 4 | [#167557](https://github.com/openclaw/openclaw/issues/167557) — 延迟的插件数据/设置迁移永不收敛（Linux/npm） | 10 | P1，`fix-shape-clear`。迁移收敛失败使插件卡住。 |
| 5 | [#166634](https://github.com/openclaw/openclaw/issues/166634) — 迟到回收提交检查点失败使代理不可用 | 9 | P0，消息丢失 + 会话状态；崩溃恢复正确性。 |

**底层需求分析：**
- **一组睡眠/唤醒和事件循环停滞问题**（[#160959](https://github.com/openclaw/openclaw/issues/160959)、[#140010](https://github.com/openclaw/openclaw/issues/140010)、[#158592](https://github.com/openclaw/openclaw/issues/158592)、[#155359](https://github.com/openclaw/openclaw/issues/155359)、[#111376](https://github.com/openclaw/openclaw/issues/111376)）指向一个系统性架构隐患：**消费级硬件（Windows 笔记本、macOS）上的长生命周期网关在睡眠周期和沉重的插件/内存负载下表现脆弱。** 这是当前社区的主导主题。
- **第二组**涉及**权限/许可正确性**（[#167876](https://github.com/openclaw/openclaw/issues/167876)、[#133296](https://github.com/openclaw/openclaw/issues/133296)、[#181215](https://github.com/openclaw/openclaw/issues/181215)、[#181220](https://github.com/openclaw/openclaw/issues/181220)）——多人会话、共享 auth profile，以及 Side chat 隐私。

---

## 5. Bug 与稳定性

按严重程度排序（P0 → P2）。数据可归因时注明「修复 PR」。

**P0 — 严重**
- [#160959](https://github.com/openclaw/openclaw/issues/160959) — 网关在大型插件捕获时阻塞数分钟（回归）。**需要维护者审查；无修复 PR。** ⚠️ 头号阻塞项。
- [#166634](https://github.com/openclaw/openclaw/issues/166634) — 检查点失败导致代理在崩溃后永久不可用；消息丢失 + 会话状态。无修复 PR；`intake:needs-repro`。
- [#158592](https://github.com/openclaw/openclaw/issues/158592) — macOS 睡眠/唤醒后，准备好的模型运行时发布超时；在重启前每一条入站消息都失败。`ux-release-blocker`。
- [#181050](https://github.com/openclaw/openclaw/issues/181050) — npm 更新在 UGREEN UGOS 上 `package-verify` 失败（执行位不匹配）。**已关闭** — 已解决。
- [#159104](https://github.com/openclaw/openclaw/issues/159104) — Ambient webchat 解析为 `kind: cron` 会话；对话轮失败。**已关闭** — 已解决。
- [#181032](https://github.com/openclaw/openclaw/issues/181032) — 安装失败：`bun` 需要 AVX，而服务器级 CPU 上不具备。**P0 崩溃**，无修复 PR。值得注意的是这广泛影响服务器硬件。

**P1 — 高**
- [#167557](https://github.com/openclaw/openclaw/issues/167557) — 延迟的插件迁移永不收敛。`fix-shape-clear`（修复可定义）但尚无 PR。
- [#140010](https://github.com/openclaw/openclaw/issues/140010) — Windows 睡眠/恢复重连失败（陈旧，需要维护者审查）。
- [#158592](https://github.com/openclaw/openclaw/issues/158592) — （上文已列）。
- [#180690](https://github.com/openclaw/openclaw/issues/180690) — `doctor --fix` 在约 800 个代理状态上 6 GB 堆 OOM；v28→v31 耗时 110 分钟 / 3 轮。无修复 PR。扩展性隐患。
- [#181078](https://github.com/openclaw/openclaw/issues/181078) — 2026.10.5 回归：HTTP 200 后 4/20 对话轮失败，报「Canonical session reader continuation is no longer current」。会话状态 + 消息丢失。
- [#180898](https://github.com/openclaw/openclaw/issues/180898) — 网关堆：每轮通过 AsyncLocalStorage 保留完整会话存储深拷贝；**1 天后占堆的 60%，在 10.6 中仍存在**。内存泄漏级别。
- [#178907](https://github.com/openclaw/openclaw/issues/178907) — MiniMax M3.1 Flash（Ollama Pro）工具调用 100% 失败（「malformed tool call」）。auth-provider。
- [#178805](https://github.com/openclaw/openclaw/issues/178805) — 在 `ollama/minimax-m3.1-flash:cloud` 上压缩失败；thinking 消耗了全部 6553 token 的摘要预算。
- [#177656](https://github.com/openclaw/openclaw/issues/177656) — 2026.10.5 上原生宿主 exec 报「shared-state integrity-admission」错误；≥28 次失败。无子结果。
- [#162654](https://github.com/openclaw/openclaw/issues/162654) — 慢速存储（Raspberry Pi microSD）上出现 `SessionTranscriptWriterClaimReboundError`。
- [#181226](https://github.com/openclaw/openclaw/issues/181226) — Codex 源回复在 `message_tool_only` 后最终化丢失上下文；**有 `fix-shape-clear`**，消息丢失。
- [#133296](https://github.com/openclaw/openclaw/issues/133296) — 密钥应用将共享 auth-profile 引用路由到代理存储（安全）。需要安全审查。
- [#167876](https://github.com/openclaw/openclaw/issues/167876) — Talk 咨询在会话建立后丢失调用方权限（安全）。需要安全审查。

**P2 — 中**
- [#111376](https://github.com/openclaw/openclaw/issues/111376) — memory-core Dreaming 重写未变化的工作区状态，阻塞事件循环。
- [#163900](https://github.com/openclaw/openclaw/issues/163900) — Dreaming 预算压缩从不移除「## Consolidated Memory」章节；MEMORY.md 满时晋升停滞（`fix-shape-clear`、`queueable-fix`）。
- [#172227](https://github.com/openclaw/openclaw/issues/172227) — 历史归档回执的会话迁移对账。
- [#180941](https://github.com/openclaw/openclaw/issues/180941) — 代理在 `nothing_pending` 后于 `sessions_yield` 上循环（多个模型）。
- [#181165](https://github.com/openclaw/openclaw/issues/181165) — `tools.github.configure` 吞掉了真正的失败原因（`queueable-fix`）。
- [#181070](https://github.com/openclaw/openclaw/issues/181070) — Telegram 带字幕的最终 TTS 将完整回复文本发送两次（`queueable-fix`，消息丢失）。
- [#181084](https://github.com/openclaw/openclaw/issues/181084) — 35k 事件 / 228 MB 主会话导致 SQLite 快照读取耗时数秒；`sessions compact` 报「admission is closed」失败。
- [#180892](https://github.com/openclaw/openclaw/issues/180892) — Windows Doctor 拒绝在卷根祖先上对 DELETE-self 的原生捕获（security-review）。
- [#120411](https://github.com/openclaw/openclaw/issues/120411) — `config-audit.jsonl` 从 argv 记录明文密钥（安全）。

**今日观察到的修复 PR（稳定性相关）：**
- [#180850](https://github.com/openclaw/openclaw/pull/180850) — 在声明节点状态前拒绝畸形 UTF-8。
- [#181098](https://github.com/openclaw/openclaw/pull/181098) — 限制停滞的会话归档与对账工作（P1）。
- [#173994](https://github.com/openclaw/openclaw/pull/173994) — 在代理启动期间重试临时数据库容量故障。
- [#181198](https://github.com/openclaw/openclaw/pull/181198) — 在继承的 auth owner 准备期间保持启动（P1）。
- [#181159](https://github.com/openclaw/openclaw/pull/181159) — 尊重已校验的 Windows 卷根 ACL（已关闭，安全边界）。

**健康度解读：** 很大一部分 P0/P1 issue 带有 `clawsweeper:no-new-fix-pr` 和 `impact:ux-release-blocker`，意味着**已知的发布阻塞项缺乏已提交的修复**——这是一个维护者需关注的信号（见 §8）。

---

## 6. 功能请求与路线图信号

过去 24 小时内活跃的用户请求功能：

- [#53763](https://github.com/openclaw/openclaw/issues/53763) — **内置无头浏览器**以实现可靠的 Web 访问（已关闭；18 条评论）。高需求，可能影响路线图。
- [#142966](https://github.com/openclaw/openclaw/issues/142966) — **双栏模型选择器**（左侧提供商，右侧模型），适用于大型多提供商配置。
- [#137513](https://github.com/openclaw/openclaw/issues/137513) — 添加 **Fal H3 Max** 视频模型支持。
- [#177432](https://github.com/openclaw/openclaw/issues/177432) — 配置选项以**从系统提示中省略「Current model identity」**。
- [#181158](https://github.com/openclaw/openclaw/issues/181158) — `openclaw skills list --bundled` / `--no-bundled` 过滤器。
- [#113895](https://github.com/openclaw/openclaw/issues/113895) — 为 Dream Diary 提供可选的 **Nephesh dream provenance** 元数据。
- [#181215](https://github.com/openclaw/openclaw/issues/181215) 与 [#181220](https://github.com/openclaw/openclaw/issues/181220) — 使 **Side chat 按用户私有** / 以提问者权限创建临时分支（安全驱动的产品诉求）。

**路线图预测（未来 1–2 个版本）：**
- **性能工作已有开放 PR**，极有可能落地：模型目录虚拟化（[#181190](https://github.com/openclaw/openclaw/pull/181190)）、gzip 启动传输缩减（[#181233](https://github.com/openclaw/openclaw/pull/181233)），以及聊天行空闲优化（[#181205](https://github.com/openclaw/openclaw/pull/181205)）。
- **聊天中的插件原生视图**（[#173135](https://github.com/openclaw/open

---

## 横向生态对比

# 跨项目对比报告
## 个人 AI 助手 / Agent 开源生态 — 2026-10-23

---

## 1. 生态概览

2026-10-23 的个人 AI 助手与 Agent 开源格局呈现出这样的特征：**成熟的参考实现背负着沉重的可靠性债务运行**，同时一批较小的项目在模块化与安全加固上持续迭代。OpenClaw 以绝对规模占据主导地位（每天 500 个 PR），但明显被围绕睡眠/唤醒、会话状态和事件循环卡顿的 P0/P1 回归问题拖得不堪重负，且这些问题的修复 PR 尚未提交。Hermes Agent 和 ZeroClaw 处于富有产出的中端梯队——贡献者活跃度高，同时处于积极的稳定化周期——而 QwenPaw 在持续累积渠道和升级路径 bug 的同时交付安全关键补丁，IronClaw 则处于仅维护模式。在全部项目中，一条**共同的核心关切轴**已经浮现：多租户/多配置身份隔离、安全边界的正确性（密钥、执行审批、HTML/shell 净化），以及会话在传输层动荡中的持久存活能力。值得注意的是，**五个项目中有两个（OpenClaw、QwenPaw）今天发布了因安全问题被迫推出的版本**，均与上游证书泄露事件相关——这是一次罕见的同步供应链事件，预示着整个生态的依赖脆弱性。

---

## 2. 活跃度对比

| 项目 | Issue（更新 / 未关闭） | PR（更新 / 未关闭 / 已合并） | 发布状态 | 健康分* |
|---|---|---|---|---|
| **OpenClaw** | 98 更新 / 67 未关闭 | 500 更新 / 245 未关闭 / 255 已合并关闭 | ✅ v2026.10.6（安全强制 Node 升级） | **6.5 / 10** — 高活跃度，高未合并 PR 积压，P0 阻塞未解决 |
| **Hermes Agent** | 13 更新 / 12 未关闭 | 50 更新 / 33 未关闭 / 17 已合并关闭 | ❌ 无发布 | **7.5 / 10** — 分诊快速，少量老化的 P2 积压 |
| **IronClaw** | 1（自动）/ 1 未关闭 | 6 更新 / 5 未关闭 / 1 已关闭 | ❌ 无发布 | **6.0 / 10** — 稳定但近乎休眠；Dependabot 堆积 |
| **QwenPaw** | 19 更新 / 19 未关闭 / 0 已关闭 | 28 更新 / 22 未关闭 / 6 已合并 | ✅ v2.2.2.post1（安全补丁） | **6.0 / 10** — 持续交付修复但 Issue 零关闭，升级回归问题 |
| **ZeroClaw** | 13 更新 / 7 未关闭 / 6 已关闭 | 50 更新 / 42 未关闭 / 8 已合并关闭 | ❌ 无发布（v0.8.7 稳定化中） | **7.5 / 10** — 当日关闭能力强，审查队列增长 |

*\*健康分是一个综合启发式指标，权衡活跃度、审查积压比例、未解决的关键 bug 和发布卫生。并非官方项目指标。*

**关键观察：**
- **OpenClaw 的活跃度约为任何同行的 10 倍**，但其未关闭 PR 与已合并 PR 的比例（今日约 1:1）掩盖了审查队列正在加深的事实。
- **Hermes 和 ZeroClaw 展现了最健康的关闭比例**（24 小时内 33–46% 的被触及 PR 已合并/关闭）。
- **QwenPaw 的 19 未关闭 / 0 已关闭 Issue 比例**是整个集合中最令人担忧的分诊信号。
- **IronClaw 是异类**：几乎无人工活动，仅有依赖类 PR——实际上处于看管模式。

---

## 3. OpenClaw 的定位

**相对同行的优势：**
- **贡献者基数规模**：每天 500 个 PR，同行仅 28–50 个——生态规模大约高出一个数量级。这使 OpenClaw 拥有更快的 bug 发现速度和更广的插件面。
- **参考实现地位**：OpenClaw 的架构（gateway + Doctor + Dreaming + Talk）是其他项目部分模仿或竞争的事实标准模式（例如 Hermes 的 `hermes-talk` 实时语音插件就映射了 OpenClaw 的 Talk 子系统）。
- **分发的成熟度**：唯一按节奏发布正式版本号的项目（`v2026.10.x`），并提供 Docker 镜像、npm/PyPI 分发以及 schema 迁移工具（v28→v31）。
- **安全响应能力**：因 2026 年 10 月 TLS 证书泄露事件被迫升级 Node 运行时——与上游 Node.js 安全版本协调发布。

**技术路线差异：**
- 更重、更单体化的 gateway，具有持久会话状态、Dreaming 记忆子系统和内置浏览器野心（issue #53763）。
- **在消费级硬件上相对更脆弱**——P0 的主要集群（Windows/macOS 上的睡眠/唤醒、事件循环卡顿）在较小同行中基本不存在，说明架构复杂性是根本原因。
- 状态所有权模型（会话权威、检查点提交）更精细，但也是正确性 bug 的来源（#166634、#181078）。

**社区规模对比：**
- OpenClaw 的热门 issue #160959 拥有 **42 条评论**——超过 Hermes、IronClaw、QwenPaw 和 ZeroClaw 今天评论总量之和。其用户群体**人口统计学上更广泛**（Windows 笔记本、树莓派、UGREEN NAS、服务器级 CPU），而同行的用户则更偏向技术/企业方向。

**定位结论：** OpenClaw 是**无可争议的重心**，但正在为其规模付出可靠性债务的代价。同行实际上是"OpenClaw 子集"实现，活动部件更少，相应的脆弱模式也更少。

---

## 4. 共同技术关注领域

以下需求**在两个或更多项目中同时出现**，表明这是生态级别的需求而非项目特有的怪癖：

| 需求 | 项目 | 具体表现 |
|---|---|---|
| **多租户 / 多配置身份隔离** | OpenClaw、Hermes、ZeroClaw | OpenClaw：会话权威泄漏（#167876、#181215、#181220）；Hermes：跨配置消息路由（#143364），`sessionOwnerHints` 过期（#143348）；ZeroClaw：委托中保留 owner（#11225、#11995） |
| **会话在传输层动荡中的持久存活** | OpenClaw、Hermes | OpenClaw：检查点失败导致 agent 不可用（#166634）；Hermes：仪表盘重新连接会终止进行中的回合（#136713，"工作被销毁"） |
| **安全边界的正确性** | 全部五个 | OpenClaw：密钥应用路由到错误的存储（#133296），`config-audit.jsonl` 中的明文密钥（#120411）；Hermes：配置路由泄漏；ZeroClaw：shell 扫描器绕过（#11822、#11994），`excluded_tools` 被忽略（#11989）；QwenPaw：emSign CA 修复（#8370）；IronClaw：dompurify/certifi 升级 |
| **长生命周期 gateway 的事件循环 / 资源卫生** | OpenClaw、QwenPaw | OpenClaw：gateway 在插件捕获时阻塞数分钟（#160959），运行 1 天后堆内存达 60%（#180898），Dreaming 卡顿（#111376）；QwenPaw：飞书阻塞主循环，SIGTERM 失败（#8350） |
| **静默失败的有界重试 / 可观测性** | OpenClaw、Hermes、QwenPaw、ZeroClaw | Hermes：无限 5 秒重试（#140189）；QwenPaw：钉钉静默丢弃（#8343）；ZeroClaw：拒绝记录缺少发送者（#11821）；OpenClaw：`tools.github.configure` 吞掉原因（#181165） |
| **容器化部署可行性** | QwenPaw、IronClaw、OpenClaw | QwenPaw：Docker 中的 Hub 开箱即坏（#8359）；IronClaw：ARM64 Docker 问题在 5.5 个月后关闭（#3168）；OpenClaw：Docker 镜像搭载已修补的 Node |
| **供应链 / 证书信任修复** | OpenClaw、QwenPaw | OpenClaw：为 2026 年 10 月 TLS 泄露修补 Node；QwenPaw：移除 emSign CA 信任（#8370、#8371） |

**综合：** 整个生态正在汇聚到一个**共同的最低可行正确性门槛**——身份隔离、传输持久的会话、有界重试和供应链卫生——大多数项目*部分*满足，但没有一个完全解决。

---

## 5. 差异化分析

| 维度 | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **功能焦点** | 全平台助手（浏览器、Dreaming、Talk、插件） | 多模态 + 语音/电话 + 浏览器自动化整合 | 基准驱动的 agent 脚手架（officeqa） | 渠道密集型（飞书、钉钉、QQ、Telegram、微信）+ Console UI | 安全加固的多租户 agent 运行时 |
| **目标用户** | 广泛消费者 + 专业用户（Windows/macOS 笔记本、NAS、树莓派） | 技术用户、语音重度用户、多配置部署者 | 基准/ML 研究者、自托管用户 | 中国市场企业、团队/全局共享 | 企业多租户、安全敏感型运维者 |
| **架构** | 单体 gateway + 持久状态；schema 版本化 | 模块化 agent + gateway + 插件；PTY/WS 传输 | 围绕模型的脚手架（失败归因于模型而非框架） | 桌面守护进程 + Hub + 渠道即插件 | Rust/Cranelift，基于插件，OIDC，principal 作用域 |
| **发布节奏** | 版本化（`v2026.10.x`），安全强制 | 基于 tag，当前已陈旧（#143361） | 近期无发布 | 安全补丁后发布（`v2.2.2.post1`） | 双轨（`v0.8.7` 修复、`v0.9.0` 功能） |
| **差异化赌注** | 无头浏览器、插件原生视图、Dreaming 记忆 | 实时双工语音，浏览器整合到 `browser_exec` | 将模型质量归因作为特性而非 bug | 全局 Skill/MCP 共享、Python Code Mode | 仅追加事件日志 / 确定性回放（RFC #10526） |
| **语言/运行时** | Node.js（强制 ≥24.22.1 / ≥26.12.1） | Python（PTY/WS） | Python + WebUI（Vite/Storybook） | Python + Node（22.23.4，已修补） | Rust |
| **多租户成熟度** | 新兴（权威缺口） | 新兴（配置混淆） | N/A（单用户基准） | 新兴（全局共享请求） | **最先进**（principal 作用域、OIDC RBAC） |

**关键洞察：** 各项目正沿**两条轴线**分化：(a) *助手能力的广度*（OpenClaw、Hermes 在此竞争），对比 (b) *面向多租户/安全部署的加固*（ZeroClaw 领先，QwenPaw 跟进）。IronClaw 独特地将自身定位为**模型归因优先**——将基准失败视为模型能力信号而非框架缺陷。

---

## 6. 社区动能与成熟度

**第一梯队 — 规模化快速迭代：**
- **OpenClaw**：庞大的贡献者基数，但速度已超过维护者审查能力（245 个未关闭 PR）。成熟度高，但**可靠性债务正在累积**；若干发布阻塞项缺少修复 PR。结论：*规模承压*。
- **ZeroClaw**：42 个未关闭 PR，当日关闭能力强，但审查队列增长，且带有 `size:XL`/`risk:high` 的 PR（#11822、#11847）。结论：*有纪律但带宽受限*。

**第二梯队 — 稳定化中的中端：**
- **Hermes Agent**：体量小但积压沉重（P2 bug 已老化 12–13 天未修复）。对新条目的分诊快速；语音架构今日成熟（一天内完成 contract + streaming + docs）。结论：*稳定化中，受维护者带宽限制*。
- **QwenPaw**：PR 吞吐量高，安全响应强，但**今日 Issue 零关闭**且 24 小时内有 3 个升级后回归。结论：*交付速度快于验证能力*。

**第三梯队 — 维护/休眠：**
- **IronClaw**：6 个 PR 中 5 个来自 Dependabot；唯一实质性信号是自动化失败分类和一个 5.5 个月之久的 ARM64 issue 被关闭。结论：*看管模式；无功能动能*。

**动能排名（迭代速度）：** OpenClaw ≈ ZeroClaw > Hermes > QwenPaw > IronClaw
**成熟度排名（生产就绪信号）：** ZeroClaw > OpenClaw > Hermes > QwenPaw > IronClaw

---

## 7. 趋势信号

从全部五个项目的社区反馈、issue 模式和 PR 主题中提取——**对 AI agent 开发者和平台架构师可操作**：

1. **安全强制的运行时升级正在变得常规化。** 2026 年 10 月一次同步的证书泄露事件迫使 OpenClaw 和 QwenPaw 在同一窗口内发布补丁版本（Node 24.22.1+/26.12.1+；emSign CA 移除；Node CVE-2026-111497/105481）。*含义：* Agent 项目必须将**运行时版本锁定策略**视为一等公民关切——可复现构建、`.nvmrc` 引用（QwenPaw #8371）和 Docker 镜像重建流水线如今已是入门门槛。

2. **多租户委托是下一个正确性前沿。** ZeroClaw 关于在委托中保留 owner 的 `priority:p0`/`release-gate` 修复（#11225）和 OpenClaw 反复出现的权威泄漏表明，行业正在从*单用户助手*过渡到*共享多角色/团队部署*——而身份模型在任何项目中都尚未成熟。

3. **仅追加事件历史正成为状态正确性的架构答案。** ZeroClaw 已接受的 RFC #10526（确定性回放、派生 agent 流）直接针对 OpenClaw 正在遭受的那类 bug（检查点失败、规范会话读取器续传错误、消息丢失）。*预测：* 其他项目将在 2–3 个发布周期内采用事件溯源的会话持久化。

4. **"静默成功"是最具腐蚀性的失败模式。** 在 Hermes（#136315 已投递但从未到达、#140189 不可见重试）、QwenPaw（#8343 钉钉静默丢弃）和 ZeroClaw（#11821 无法识别的拒绝）中，用户报告系统在未成功时自认为成功。*含义：* 投递/执行的可观测性应当是**默认开启的特性**，而非运维者的附加选项。

5. **消费级硬件的耐久性是一个被忽视的架构需求。** OpenClaw 的主要痛苦集群（Windows/macOS 上的睡眠/唤醒、插件负载下的事件循环卡顿、约 800 agent 状态时的 OOM）反映了一个更广泛的缺口：**没有任何项目对笔记本和边缘设备有可信的长生命周期 gateway 方案。** 较小同行是通过减少活动部件来回避问题，而非解决问题。

6. **工具执行的纵深防御如今是差异化因素。** ZeroClaw 的 shell 扫描器边界拆分（#11822、#11994）和 `excluded_tools` 执行缺口（#11989）表明，随着 agent 运行更多模型生成的 shell，**语法感知的策略执行**（而非基于正则）正在成为预期标准。OpenClaw 的执行审批问题也汇聚到同一需求。

7. **渠道矩阵质量正成为竞争轴。** QwenPaw 的主要 bug 类别（飞书、钉钉、Telegram、QQ、微信渠道特定失败）反映了一个**集成广度**即是卖点的市场——但每增加一个渠道就成倍增加 QA 面。*含义：* 渠道即隔离插件架构（QwenPaw #8187）是新兴的缓解模式。

8. **破坏性架构简化正通过 PR 部署。** Hermes 的浏览器整合（#143146：移除 agent-browser + 10 个内置工具以改用 `browser_exec`，将 Camofox 迁移为 catalog 插件）是一个值得注意的模式：**在添加功能前先缩减表面积。** 随着生态成熟并越过其"厨房水槽式助手"阶段，预计会出现类似的整合。

9. **语音正从特性过渡为契约。** Hermes 的实时语音 provider 契约（#101808）和 OpenClaw 的 Talk 子系统表明，语音/语音到语音正在围绕**可插拔 provider 抽象**标准化，而非一次性集成。

10. **i18n 和本地化受制于维护者决策，而非贡献者努力。** Hermes 的韩语 PR（#120011，开放 30 天，`needs-decision`）是一个微小但说明问题的信号：生态对**本地化范围和维护负担**的政策仍未定义——随着用户群全球化，这很可能成为近期的治理问题。

---

*本报告根据 2026-10-23 OpenClaw、Hermes Agent、IronClaw、QwenPaw 和 ZeroClaw 的 GitHub 活动摘要汇编。健康分是分析性综合指标，非厂商指标。所有数字反映截至 2026-10-23 的 24 小时窗口。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — 项目摘要
**日期：2026-10-23** | 来源：`github.com/NousResearch/hermes-agent`

---

## 1. 今日概览

Hermes Agent 呈现出**高频、高争用**的活动态势：24 小时内涉及 50 个 PR（33 个开放，17 个已合并/关闭），对应 13 个更新的 issue（12 个开放，1 个关闭）——PR 与 issue 的比例约为 **4:1**，表明活跃的贡献者群体推动修复的速度快于新报告的积累。然而，**issue 质量偏向 P2 严重级别**，反复出现的集群集中在会话状态、网关消息投递以及 Desktop/Gateway 配置不匹配——其中若干问题**长期存在（10 天以上）且仍未解决**（#136713、#136094、#136315）。没有新版本发布。值得注意的是，今日的 PR 队列包含**三个针对核心子系统的独立修复**（更新/版本管理、vision 工具、浏览器自动化整合），表明维护者正处于稳定化与重构周期，而非功能发布周期。

**健康信号：** 贡献者参与度强劲，但多个 P2 bug 持续存在、评论众多却无关联修复 PR（见 §5），表明**维护者的评审带宽是当前瓶颈**，而非贡献者供给不足。

---

## 2. 版本发布

**无。** 过去 24 小时内没有新版本发布。请注意 issue #143361（`hermes update` 导致 release tag 陈旧）直接影响已处于 release commit 上的用户的版本报告——见 §5。

---

## 3. 项目进展

今日合并/关闭的 PR（共 17 个；可见样本中的重要条目）：

| PR | 类型 | 摘要 | 链接 |
|---|---|---|---|
| #143353 (CLOSED) | feat(agent/gateway) | 新增仅限消息会话的 `skip_response()` 工具——允许 agent 明确终止一轮对话并**不做任何回复**，而非发送填充式确认 | [PR #143353](https://github.com/NousResearch/hermes-agent/pull/143353) |
| #101808 (CLOSED) | feat(agent/cli/plugins/tts) | **实时语音提供商契约** + 编排器 + 首个内置提供商——语音到语音抽象，一项长期努力（于 2026-09-03 开启） | [PR #101808](https://github.com/NousResearch/hermes-agent/pull/101808) |
| #97436 (CLOSED) | fix(discord/tts) | Discord 语音频道 TTS 现在**逐句流式输出**，而非等待完整 LLM 响应——为语音用户带来显著的延迟优化 | [PR #97436](https://github.com/NousResearch/hermes-agent/pull/97436) |
| #97325 (CLOSED) | docs(voice) | 记录通过 `hermes-talk` 插件实现的实时双工语音 | [PR #97325](https://github.com/NousResearch/hermes-agent/pull/97325) |
| #79716 (CLOSED) | feat(plugins) | 向插件作者暴露只读的 `PluginContext.active_parent_session_id` | [PR #79716](https://github.com/NousResearch/hermes-agent/pull/79716) |

**主题解读：** 语音架构今日大幅成熟（契约 + 流式 + 文档同步落地）。`skip_response` 工具是消息集成方面一个小而锐利的 UX 改进。插件 API 表面持续渐进扩展。

**仍开放但高影响：**
- #143146 — *浏览器自动化整合*：移除 agent-browser + 10 个内置浏览器工具，改用 `browser_exec`；Camofox 迁移为目录插件。**这是通过 PR 落地的破坏性变更**——见 §5/§6。
- #143356 — 回复中途的 `/compress` 现在排队至轮次边界，而非被拒绝（移植自 `kimi-code#4276`）。
- #143363 — 修复陈旧 release tag 的版本报告 bug（与 issue #143361 配对）。

---

## 4. 社区热点

按 issue 评论活动排序（数据集中无 PR 评论数；一项带有 👍）。

**🥇 #136713 — Dashboard 聊天重新连接会扼杀进行中的轮次**（5 条评论，更新于 2026-10-23，开启于 2026-10-11）
[Issue #136713](https://github.com/NousResearch/hermes-agent/issues/136713)
PTY/WS 客户端断开（页面刷新、第二个标签页、可见性重连）会在 **40–80 ms 内硬中断运行中的轮次**——工作被销毁，会话以 `end_reason=tui_shutdown` 关闭。标签面广泛（cli、gateway、dashboard、sessions、streaming、tui-gateway）。*底层需求：*用户将 dashboard 视为持久控制面，期望会话能在传输层波动中存活。这可以说是板上最具破坏性的 UX bug——它静默销毁工作，而不仅仅是显示状态。

**🥈 #140189 — Gateway 无限重试无法投递的通知**（5 条评论）
[Issue #140189](https://github.com/NousResearch/hermes-agent/issues/140189)
被拒绝的进程完成通知会**每 5 秒无限重试**，没有退避、没有上限、没有解释性日志。*底层需求：*运维人员需要有限的重试语义和可诊断的失败日志——这既是资源泄漏，也是可观测性黑洞。

**🥉 #143326 — Windows 权限 / 更新后模型选择延迟**（4 条评论，今日开启）
[Issue #143326](https://github.com/NousResearch/hermes-agent/issues/143326)
Gateway 以提升权限运行而 Desktop 应用未提升 → 通信错误；外加模型选择缓慢。*底层需求：*Windows 安装/更新的人机工程学与权限模型一致性仍是粗糙边缘。

**同样值得注意：** #136094（3 条评论，**1 👍**——今日 issue 集合中唯一的反应）涉及每任务 `HERMES_HOME` 符号链接布局重新发布共享 checkout 启动器。它热度较低但结构上重要，因为它影响**编排器/多配置文件部署模式**。

---

## 5. Bug 与稳定性

按严重性/影响排序。除非另有说明，**以下任何 P2 issue 均未发现关联的修复 PR**。

### 🔴 严重
- **#136713** — Dashboard 重新连接时销毁工作的轮次中断。*持续 12 天，5 条评论，无可见修复 PR。*
  [Issue #136713](https://github.com/NousResearch/hermes-agent/issues/136713)
- **#136315** — 已确认的异步委派完成在**递归上限 FIFO 覆写时丢失**；委派被标记为 `delivery_state=delivered` 却从未到达父 agent，静默搁置工作。*持续 13 天。*
  [Issue #136315](https://github.com/NousResearch/hermes-agent/issues/136315)

### 🟠 高
- **#140189** — 无法投递的 gateway 通知上的无限 5 秒重试循环（无退避/上限/日志）。[Issue #140189](https://github.com/NousResearch/hermes-agent/issues/140189)
- **#143348**（今日开启）— Desktop：陈旧的 `sessionOwnerHints` 将会话固定到 `profile=default` → REST 404 + `session.resume` `not_found`。**跨配置文件会话损坏。** [Issue #143348](https://github.com/NousResearch/hermes-agent/issues/143348)
- **#143347**（今日开启）— Vision 探测无法为具名自定义提供商解析 `catalog_provider`（被路由为 `custom`），尽管目录解析正确，仍破坏 vision 路由。[Issue #143347](https://github.com/NousResearch/hermes-agent/issues/143347)
- **#143326** — Windows gateway/Desktop 权限不匹配 + 更新后模型选择延迟。[Issue #143326](https://github.com/NousResearch/hermes-agent/issues/143326)
- **#143364**（今日开启）— **多路复用次要配置文件的轮次中途进度与后台审查通知通过主启动配置文件 bot 投递**——跨配置文件消息路由泄漏，对多租户/多角色部署有潜在隐私影响。[Issue #143364](https://github.com/NousResearch/hermes-agent/issues/143364)

### 🟡 中
- **#143361** — `hermes update` 不刷新 release tag；`--version` 报告陈旧版本。**修复 PR 已存在：#143363。** [Issue #143361](https://github.com/NousResearch/hermes-agent/issues/143361) · [PR #143363](https://github.com/NousResearch/hermes-agent/pull/143363)
- **#136094** — 每任务 `HERMES_HOME` 符号链接重新发布共享 checkout 启动器。[Issue #136094](https://github.com/NousResearch/hermes-agent/issues/136094)
- **#143349**（今日开启）— 当journaled发送未通过验证（例如 >64 KB 载荷）时，Desktop Group Chat 编辑器的**重试会永久锁定**——需要重启才能摆脱的死胡同 UI 状态。[Issue #143349](https://github.com/NousResearch/hermes-agent/issues/143349)

### 🟢 低
- **#130443** — `hermes skills install` 将速率限制报告为“no skill”；修复 PR 已存在：**#143351**（代理 `is_rate_limited`）。[Issue #130443](https://github.com/NousResearch/hermes-agent/issues/130443) · [PR #143351](https://github.com/NousResearch/hermes-agent/pull/143351)

**模式：** 今日新 bug 中的三个（#143348、#143349、#143364）加上一个更早的（#136094）都涉及多配置文件或多 bot 部署中的**配置文件/会话身份混淆**。这正浮现为一个系统性弱点。

---

## 6. 功能请求与路线图信号

| 条目 | 信号 | 可能的路线段位 |
|---|---|---|
| **#143346** — Kanban 调度器应在“stuck”警告中报告*为何*被上限持有（当前误导性；当只是 `max_in_progress` 满时暗示配置文件健康问题） | 可观测性打磨 | 下个补丁 |
| **#143354**（同日关闭） — Desktop Bot 中继维护者路由 / 遗留模糊执行处理 | 流程/维护者分诊，迅速关闭 | N/A |
| **PR #143146** — 浏览器自动化整合为 `browser_exec`；移除 agent-browser + 10 个内置工具；Camofox → 自动安装的目录插件 | **破坏性架构简化** | 下个次要版本（关注迁移说明） |
| **PR #143356** — `/compress` 排队而非被拒绝 | 与 kimi-code 的 UX 对齐 | 下个补丁 |
| **PR #120011** — 完整韩语桌面本地化 | i18n 扩展（自 2026-09-23 开放，标记 needs-decision） | 待定——决策待定 |
| **PR #143358/#143359** — 策展 `gpt-image-2.5-sunburst/-flare`；修复 OpenRouter 编辑的 `aspect_ratio: auto` | 模型目录维护 | 持续 |

**预测：** 下个版本很可能将**浏览器工具整合（#143146）**作为头条变更打包（附迁移说明），外加 `/compress` 排队行为和 release tag 修复。韩语本地化仍取决于维护者决策。

---

## 7. 用户反馈总结

**痛点（按报告文本中的情绪权重排序）：**
1. **工作销毁是首要不满。** #136713 的报告者强调“work is destroyed”——不仅仅是中断。用户正在因短暂的 UI 事件丢失真实的任务进度。这侵蚀了对 dashboard 作为严肃控制面的信任。
2. **静默失败无处不在。** #136315（已投递却从未到达）、#140189（无限不可见重试）和 #143364（通知投递到错误的 bot）共享一个主题：*系统在未成功时自认为成功*，用户只能通过手动调查才发现。
3. **更新摩擦。** Windows 用户遭遇权限不匹配（#143326）；源码 checkout 用户得到误导性的版本字符串（#143361）。更新本身就是一个可靠性面。
4. **多配置文件部署是二等公民。** 编排器、多角色 Telegram 设置和每任务 `HERMES_HOME` 布局反复损坏（#136094、#143348、#143364）。

**满意信号：** #143354 的快速同日关闭以及在多个 bug 被报告的当天提交的快速修复 PR（#143351、#143363）显示分诊响应迅速。语音功能工作（流式 TTS、实时契约）稳步落地——语音/电话高级用户得到了良好的服务。

**异议信号：** 今日全部 13 个 issue 中仅有 **一个 👍**——异常低的反应数。要么受影响的基础较小，要么受影响的用户过于专注于编写详细复现而无暇反应。然而评论质量很高（详细环境 + commit 哈希），表明是一个技术型用户群体。

---

## 8. 积压观察

需要维护者关注的 issue/PR，按陈旧度 × 严重性排序：

| 条目 | 年龄 | 为何需要关注 |
|---|---|---|
| **#136713** [Issue](https://github.com/NousResearch/hermes-agent/issues/136713) | 12 天 | 影响最大的开放 bug（销毁进行中的工作），5 条评论，**无关联修复 PR**。很可能需要一位维护者负责 PTY/WS 生命周期修复。 |
| **#136315** [Issue](https://github.com/NousResearch/hermes-agent/issues/136315) | 13 天 | 异步委派投递丢失 + 递归上限处的 FIFO 覆写。复杂，跨组件（agent/gateway/delegate）。无修复 PR。 |
| **#136094** [Issue](https://github.com/NousResearch/hermes-agent/issues/136094) | 13 天 | 唯一带 👍 的条目；影响编排器部署。标记 `sweeper:risk-compatibility`。无修复 PR。 |
| **#130443** [Issue](https://github.com/NousResearch/hermes-agent/issues/130443) | 22 天 | 最古老的开放条目；**修复 PR #143351 现已存在**——需要评审/合并以闭环。 |
| **#120011** [PR](https://github.com/NousResearch/hermes-agent/pull/120011) | 30 天 | 韩语本地化，自 9 月 23 日起标记 `needs-decision`——**等待维护者 i18n 政策决策**，阻塞一项完整的社区贡献。 |
| **#122497 / #122493** [PRs](https://github.com/NousResearch/hermes-agent/pull/122497) | 28 天 | MrScraper 技能 + 文档，自 9 月 25 日开放。目录 PR #143345（今日开启）表明供应商正在积极迭代，但更早的两个可能已陈旧/被取代，应明确关闭或关联。 |

**积压健康判决：** 积压**小而重**——少数 P2 正确性 bug 已老化超过一周而无修复，这是最清晰的可行动风险。相反，*新*条目的分诊很快，供应商/插件 PR 正在刷新。唯一值得关注的维护者决策瓶颈是 **Kimi i18n PR #120011** 以及浏览器工具整合（#143146）作为破坏性变更的更广泛问题。

---

*本摘要基于 2026-10-23 的 GitHub 活动数据生成。源数据集中无 PR 的评论数，已按此注明。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-10-23

## 1. 今日概览

IronClaw 呈现出**中等程度的维护活动**，没有新版本发布，也没有功能级 PR，完全由 Dependabot 依赖升级主导（6 个 PR 中有 5 个得到更新）。唯一实质性的信号来自自动化的每日失败分类问题（#8153）以及一个长期存在的 ARM64 Docker 支持问题（#3168，自 2026 年 5 月起开放——已超过 5 个月）的关闭。5 个开放的 PR 均为等待审核的常规依赖更新，表明当前瓶颈在于维护者的精力而非贡献者的供给。整体项目健康度**稳定但安静**——今日没有浮现回归或严重缺陷，但也没有向前推进的功能动力。

---

## 2. 版本发布

**过去 24 小时内没有新版本发布。** 无内容可报告。

---

## 3. 项目进展

**今日合并/关闭：**
- **[#8149](https://github.com/nearai/ironclaw/pull/8149)** — `dompurify` 从 3.4.12 → 3.4.16 升级（已关闭，被 #8155 取代，后者升级至 3.4.17）。这是一个常规的更替模式：较旧的 Dependabot PR 被关闭，以让位于更新的升级。
- **[#3168](https://github.com/nearai/ironclaw/issues/3168)** — ARM64/aarch64 Docker 构建支持问题在约 5.5 个月后**关闭**。值得注意的是，问题正文确认 Cranelift 已支持 aarch64，且 ARM 方面唯一的真正限制是 armv7（32 位，追踪于 #1339）。关闭该问题意味着要么相关支持已交付，要么该问题被解决/标记为不予修复——摘要数据无法确认是哪一种情况，但此次关闭是一次有意义的积压清理。

今日没有功能 PR 被合并。今日所有向前推进的工作均为依赖维护。

---

## 4. 社区热点

整体活跃度**非常低**——今日每一条目的评论数和反应数均为零。

| 条目 | 类型 | 评论 | 👍 | 链接 |
|---|---|---|---|---|
| #8153 每日失败分类 2026-10-22 | Issue（OPEN） | 0 | 0 | [链接](https://github.com/nearai/ironclaw/issues/8153) |
| #3168 ARM64 Docker 支持 | Issue（CLOSED） | 0 | 0 | [链接](https://github.com/nearai/ironclaw/issues/3168) |
| #8158–#8154 Dependabot PR | PR（OPEN） | — | 0 | [链接](https://github.com/nearai/ironclaw/pulls) |

**潜在需求分析：** 讨论的缺失本身就是一个信号。信息量最丰富的条目是**每日失败分类（#8153）**，它报告在 64 个非通过的 `officeqa` 任务中，失败*“绝大多数为真实的模型质量错误”*，归因于 **DeepSeek-V4-Flash** 的导航行为——即这些失败被归因于底层模型，而非 IronClaw 的智能体脚手架。这一反复出现的自动化问题构成了项目的主要质量追踪机制。ARM64 问题的关闭（#3168）反映了一个真实的用户部署需求（在 ARM 机器上运行官方镜像），现已得到解决。

---

## 5. 缺陷与稳定性

**今日没有报告新的缺陷、崩溃或回归。**

- 唯一的质量信号是**自动化的失败分类（#8153）**，它将基准测试失败归类为**模型质量问题而非框架缺陷**——这对 IronClaw 自身的稳定性是一个积极指标。严重程度：**信息性**，无需修复 PR（这是模型能力问题，不是代码缺陷）。
- 依赖升级 PR **#8155（dompurify 3.4.12 → 3.4.17）** 包含与安全相关的上游修复（“恢复未受影响的 emSign 根证书”、根证书处理）——出于供应链卫生考虑，值得优先合并。摘要数据中未确认 CVE。

---

## 6. 功能请求与路线图信号

**今日没有新的功能请求。**

- **#3168（ARM64 Docker 支持）**的关闭是最强的路线图信号：多架构容器发布（linux/amd64 + linux/aarch64）现在很可能已纳入或从近期路线中移除。由于 Cranelift 已支持 aarch64，预计**原生 ARM Docker 镜像**将作为增量版本改进而非头条功能出现。
- 次要信号：**#1339（armv7/32 位限制）**仍被引用为已知约束——考虑到 32 位 ARM 的相关性日渐下降，它不太可能被优先处理。
- 下一版本预测：继续推进 **WebUI 工具链现代化**（Storybook 10.6.x、Vite 8.1.x），而非面向用户的功能。

---

## 7. 用户反馈摘要

今日评论和反应数均为零，**直接的用户反馈实际上处于缺席状态**——这是一个低参与度时期。从仓库产物中推断出的痛点：

- **部署摩擦（已解决）：** 使用 ARM64 硬件的用户无法运行官方 Docker 镜像（#3168）——现已关闭，回应了一个真实的可移植性诉求。
- **模型质量不满（间接）：** #8153 的分类揭示出，在使用 **DeepSeek-V4-Flash** 时，IronClaw 的基准测试成功率受制于模型的导航可靠性，而非智能体框架。运行较弱/本地模型的用户可能会感知到实际上是模型局限的“IronClaw 失败”——这可能是一个**文档/预期设定方面的缺口**。
- 未记录到满意/不满的情绪指标（无反应）。

---

## 8. 积压观察

| 条目 | 时长 | 状态 | 为何需要关注 |
|---|---|---|---|
| [#8158](https://github.com/nearai/ironclaw/pull/8158) Storybook 10.5.7→10.6.2 | 0 天 | OPEN | 等待审核；与 #8156 批量处理 |
| [#8157](https://github.com/nearai/ironclaw/pull/8157) certifi 2026.7.22→2026.10.19 | 0 天 | OPEN | 证书/CA 证书包更新——与安全相关，应尽快合并 |
| [#8156](https://github.com/nearai/ironclaw/pull/8156) @storybook/addon-vitest 升级 | 0 天 | OPEN | 与 #8158 配对 |
| [#8155](https://github.com/nearai/ironclaw/pull/8155) dompurify 3.4.12→3.4.17 | 0 天 | OPEN | 取代已关闭的 #8149；与安全相关 |
| [#8154](https://github.com/nearai/ironclaw/pull/8154) vite 8.1.3→8.1.6 | 1 天 | OPEN | 工具链更新 |
| [#8153](https://github.com/nearai/ironclaw/issues/8153) 失败分类 | 1 天 | OPEN | 反复出现的自动化追踪器；监测长期趋势 |

**担忧：** 主要的积压模式是 **Dependabot PR 的堆积**——五个开放的依赖 PR 无人审核介入。虽然单个风险较低，但 **certifi（#8157）**和 **dompurify（#8155）**的升级涉及安全相关库（TLS 信任根、HTML 净化），不应久拖不决。维护者的审核能力似乎是制约项目速度的主要因素。反复出现的失败分类问题（#8153）是一项健康的自动化实践，但未引发任何人工讨论，值得关注其是否从模型质量失败转向框架质量失败的趋势变化。

---

*摘要基于 2026-10-23 的 GitHub 活动数据生成。活动评估：低至中等，仅维护的一天。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-10-23

## 1. 今日概览

QwenPaw 目前处于**高活跃度但问题密集**的状态。过去 24 小时内，共有 19 个 issue 有更新（全部仍处于开启状态，零关闭），28 个 PR 有活动（22 个开启，6 个已合并/关闭）。一个以安全为重点的补丁版本 **v2.2.2.post1** 已发布，并触发了全项目范围的升级建议。活动主要由各渠道（飞书、Telegram、钉钉、QQ）的 bug 报告、Console UI 问题以及硬件/运行时配置问题驱动。今日没有关闭任何 issue，加上不断增长的开放 issue 队列，表明维护者团队正优先保障合并吞吐量和发布节奏，而非 issue 分类处理。整体健康状况为**稳定但承压**——项目在积极发布安全修复的同时，也在不断积累未解决的渠道特定 bug。

## 2. 版本发布

### v2.2.2.post1（补丁版本）
一次面向安全的后续发布。主要变更：

- **安全修复（具有破坏性影响）：** 在依赖、安装程序及构建中修复 **emSign CA 信任**问题（[PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370)）——这似乎是一次供应链/证书信任修复，可能由 CA 泄露或信任撤销事件触发。
- 版本号提升的例行变更（[PR #8369](https://github.com/agentscope-ai/QwenPaw/pull/8369)）。
- 发布说明中另有被截断的安全修复内容。

**迁移指引：** 一份专门的安全公告（[Issue #8385](https://github.com/agentscope-ai/QwenPaw/issues/8385)）**强烈建议所有用户升级至 v2.2.2.post1 或更高版本**，涵盖 Desktop 安装程序、PyPI 及其他分发方式。使用固定版本或离线安装的用户应优先处理。除 CA 信任范围外，未记录有破坏性 API 变更。

## 3. 项目进展

**已合并/关闭的 PR（共 6 个），值得关注的：**
- [PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370) — `fix(security)`：emSign CA 信任修复（已关闭，随 .post1 发布）。
- [PR #8371](https://github.com/agentscope-ai/QwenPaw/pull/8371) — `fix(security)`：Node.js 升级至 22.23.4，修补 CVE-2026-111497 和 CVE-2026-105481；Docker/CI 现在从 `.nvmrc` 获取版本。

**推进中的功能（有活跃更新的开放 PR）：**
- [PR #8373](https://github.com/agentscope-ai/QwenPaw/pull/8373) — 共享桌面守护进程，支持独立窗口和协调更新（XXXL）。
- [PR #8384](https://github.com/agentscope-ai/QwenPaw/pull/8384) — Hub Docker 运行时修复（直接解决容器就绪 bug #8359）。
- [PR #8387](https://github.com/agentscope-ai/QwenPaw/pull/8387) — 可配置的 Hub 网关超时（默认 600s），修复 #8372。
- [PR #8389](https://github.com/agentscope-ai/QwenPaw/pull/8389) — 运行时 CORS 来源读取，修复 #8374。
- [PR #8366](https://github.com/agentscope-ai/QwenPaw/pull/8366) — 许可证清理：用标准库转换器替换 GPL-3.0 的 `html2text`（Apache-2.0 合规）。

修复类 PR 明显与 bug 报告成对出现，表明即便 issue 在验证前仍保持开放，修复流水线依然响应迅速。

## 4. 社区热点

| 条目 | 类型 | 评论数 | 信号 |
|---|---|---|---|
| [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) 面向插件的主题扩展点 | 功能 | 7 | 插件生态日趋成熟；作者需要比单一颜色调节更深入的主题定制能力 |
| [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) 输入框草稿按 agent 还是按会话隔离 | Bug | 3 | 影响每一位多会话用户；修复 PR #8362 已开启 |
| [#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359) Hub 容器内 Docker 就绪失败 | Bug | 2 | 阻断了维护者推荐的容器化 Hub 部署方式 |
| [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) 全局 Skill 与 MCP 管理 | 增强 | 2, 👍1 | 反响最强的请求；团队/企业共享需求 |

**底层需求分析：** 主要主题为 (a) **插件/扩展深度**——插件 API 的发展已超出当前接口的承载能力；(b) **多会话状态正确性**——一类反复出现的 localStorage/会话作用域 bug；(c) **容器化部署可行性**——Hub-in-Docker 虽有文档说明，但在边缘场景下无法正常工作；以及 (d) **团队级资源共享**，标志着 QwenPaw 正从单用户工具向共享/企业部署转型。

## 5. Bug 与稳定性

按严重程度排序：

1. **🔴 升级后运行时损坏** — [#8388](https://github.com/agentscope-ai/QwenPaw/issues/8388)：`No module named '_qwenpaw_remote_backend'` 导致*所有*工具调用（QQ 渠道、文件读取、Python 执行）中断。最高严重级别：使安装部分不可用。**尚无修复 PR。**
2. **🔴 事件循环阻塞/服务冻结** — [#8350](https://github.com/agentscope-ai/QwenPaw/issues/8350)：飞书渠道在主循环上执行同步网络调用；当网络不可达时，`/api/healthz` 超时且 SIGTERM 无法终止进程。**尚无修复 PR。**
3. **🟠 静默消息丢失** — [#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343)：当 `sessionWebhook` 过期时（errcode=300001），钉钉丢弃最终回复，且无 Open API 回退。**相关：** [PR #8341](https://github.com/agentscope-ai/QwenPaw/pull/8341) 解决了长回复分块问题，但未处理 webhook 过期。**无针对性修复 PR。**
4. **🟠 大体积媒体导致会话卡死** — [#8335](https://github.com/agentscope-ai/QwenPaw/issues/8335)：48 MB 请求体会永久卡死微信会话（`length limit exceeded`）。**无修复 PR。**
5. **🟠 配置回归** — [#8374](https://github.com/agentscope-ai/QwenPaw/issues/8374)：通过 UI/CLI 设置的 `QWENPAW_CORS_ORIGINS` 从未生效（常量在环境变量加载前被读取）。**修复 PR [#8389](https://github.com/agentscope-ai/QwenPaw/pull/8389) 已开启。**
6. **🟡 升级后模型调用失败** — [#8378](https://github.com/agentscope-ai/QwenPaw/issues/8378)：`agent.json` 的 `active_model` 配置在升级后不兼容。**无修复 PR。**
7. **🟡 会话间草稿泄漏** — [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351)。**修复 PR [#8362](https://github.com/agentscope-ai/QwenPaw/pull/8362) 已开启。**
8. **🟡 7 个渠道中引用回复的控制命令误路由** — [#8342](https://github.com/agentscope-ai/QwenPaw/issues/8342)：引用消息中的 `/stop` 被当作普通消息处理。**无修复 PR。**
9. **🟡 Telegram 丢弃引用上下文** — [#8329](https://github.com/agentscope-ai/QwenPaw/issues/8329)。**无修复 PR。**
10. **🟢 侧边栏标题重叠** — [#8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)。**修复 PR [#8334](https://github.com/agentscope-ai/QwenPaw/pull/8334) 已开启。**
11. **🟢 删除选中会话 404** — [#8368](https://github.com/agentscope-ai/QwenPaw/issues/8368)。**修复 PR [#8375](https://github.com/agentscope-ai/QwenPaw/pull/8375) 已开启。**
12. **🟢 干净检出时测试收集失败** — [#8377](https://github.com/agentscope-ai/QwenPaw/issues/8377)。**修复 PR [#8379](https://github.com/agentscope-ai/QwenPaw/pull/8379) 已开启。**

**模式：** 今日排名前三的 bug 中有三个是**升级后回归**（#8388、#8378、#8374）。这表明升级路径测试不足——这是值得向维护者提示的稳定性风险。

## 6. 功能请求与路线图信号

| 请求 | Issue | 下一版本可能性 |
|---|---|---|
| 插件主题扩展点（语义 token 覆盖） | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) | 中 — 讨论活跃，与插件推进方向一致 |
| 面向 Hub 的全局 Skill 与 MCP 共享管理 | [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) | 中高 — 社区有反响，企业需求 |
| 流式输出时禁用自动滚动 | [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) | 中 — UX 范围小，自 8 月起开放 |

**通过 PR 可见的进行中路线图事项：** Python Code Mode（[PR #8224](https://github.com/agentscope-ai/QwenPaw/pull/8224)）、渠道作为隔离插件（[PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)）、PawApp SDK 重新设计（[PR #7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)），以及 PowerContext 记忆后端 v1.4.0 支持（[PR #8376](https://github.com/agentscope-ai/QwenPaw/pull/8376)）。项目显然正在投入于**模块化（插件）、可扩展性（Code Mode、PawApp）和企业功能（全局共享）**。

## 7. 用户反馈总结

- **满意度：** 安全响应能力强——emSign 修复和快速补丁发布体现了维护者的勤勉。修复 PR 常常在数小时内与 bug 报告成对出现。
- **痛点：**
  - **升级脆弱性** — 多位用户报告更新后环境损坏（#8388、#8378），削弱了对发布质量的信任。
  - **渠道可靠性** — 静默消息丢失（钉钉 #8343）、引用上下文丢失（Telegram #8329、多渠道 #8342）以及服务冻结（飞书 #8350）降低了核心渠道体验。
  - **容器部署缺口** — 推荐的 Hub-in-Docker 路径开箱即坏（#8359）。
  - **超时调优** — Hub 网关默认 120s 对文件处理类工作负载过短（#8372），表明存在真实生产使用模式。
- **整体情绪：** 用户参与度高，报告了详细且可复现的 bug（良好迹象），但渠道特定问题和升级路径问题的数量表明，**渠道矩阵和升级场景的质量保证是该项目的最大短板**。

## 8. 待办关注

长期未答复或需要维护者关注的重要事项：

- **🔴 [#8388](https://github.com/agentscope-ai/QwenPaw/issues/8388)** — 升级后运行时损坏（`_qwenpaw_remote_backend` 缺失）。无修复 PR，用户影响大。**需立即分类处理。**
- **🔴 [#8350](https://github.com/agentscope-ai/QwenPaw/issues/8350)** — 飞书渠道事件循环阻塞导致冻结。无修复 PR。属于架构性问题，而非表面问题。
- **🟠 [#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343)** — 钉钉静默回复丢失。尽管根因明确，仍无针对性修复 PR。
- **🟠 [#8335](https://github.com/agentscope-ai/QwenPaw/issues/8335)** — 大体积媒体导致会话永久卡死；设计层面问题。
- **⏳ [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339)** — 自动滚动禁用开关，自 **2026-08-27** 起开放（约 2 个月）。工作量小，反复被提及；适合作为快速胜利项。
- **⏳ [PR #7874](https://github.com/agentscope-ai/QwenPaw/pull/7874)** 和 **[PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)** — 均为 XXXL，自 9 月/10 月起开放且仍在更新。属于需要持续审查带宽的大型架构性 PR。

---

*数据来源：github.com/agentscope-ai/QwenPaw。摘要基于 24 小时活动窗口于 2026-10-23 生成。*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-10-23

## 1. 今日概览

ZeroClaw 在 2026-10-23 展现出**极高的开发活跃度**，过去 24 小时内更新了 50 个 PR（42 个仍处于打开状态，8 个已合并/关闭），涉及 13 个 issue（7 个打开/活跃，6 个已关闭）。活动覆盖面广泛：shell 扫描器的安全加固、网关生命周期修复、channel/plugin 正确性以及 CI 可靠性工作均在同步推进。值得注意的是，**今日未发布新版本**，但一批带有 `release:v0.8.7` 标签的修复已合并或关闭，表明 v0.8.7 正处于最终稳定阶段。维护者团队（尤其是 JordanTheJet）响应非常积极，CI/测试类 issue 均在当日关闭。若干大型 PR（`risk:high`、`size:XL`）带来了较高的风险水平，需要谨慎分配审查资源。

---

## 2. 版本发布

**过去 24 小时内无新版本发布。** 今日无需发布说明或迁移指南。

作为背景，带有 `release:v0.8.7` 标签的已关闭 issue（见 §3）表明下一版本正在积累修复而非新功能，而 issue #11984 面向 `release:v0.9.0` 的 dashboard 聊天功能——这意味着双轨发布节奏。

---

## 3. 项目进展（今日已合并/关闭）

过去 24 小时内有 8 个 PR 被合并/关闭。重点如下：

| PR | 标题 | 影响 |
|---|---|---|
| [#11863](https://github.com/zeroclaw-labs/zeroclaw/pull/11863) | test(runtime): make receipt-bound `late_tool_search` tests opt-in | 通过将 23 个测试以 fixture receipt 为门槛，修复了易失败/易超时的 CI |
| [#11848](https://github.com/zeroclaw-labs/zeroclaw/pull/11848) | fix(plugins): name the sender in `plugin_channel_sender_denied` records | 运维体验——拒绝日志现在可操作 |
| [#11941](https://github.com/zeroclaw-labs/zeroclaw/pull/11941) | ci(plugins): raise cranelift runtime leg timeout to 30 min | 解决了持续存在的 20 分钟超时问题 |
| [#11833](https://github.com/zeroclaw-labs/zeroclaw/pull/11833) | ci(docker): bound arm64 build memory + dry-run dispatch | 修复了 arm64 fat-LTO 链接期间的 OOM |
| [#11967](https://github.com/zeroclaw-labs/zeroclaw/pull/11967) | fix(ci): crates.io preflight only for PR's own version bump | 防止 tag 已存在后的误报失败 |
| [#11841](https://github.com/zeroclaw-labs/zeroclaw/pull/11841) | docs(changelog): match v0.8.6 OIDC wording | 一致性 |

**主题：** CI 稳定性（8 个中的 4 个）、可观测性/运维体验（2 个）、文档（1 个）、测试卫生（1 个）。无重大功能落地——这是一个**稳定化日**。

---

## 4. 社区热点话题

按评论量和战略权重排序：

1. **[Issue #10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)**（已关闭，13 条评论）—— *RFC：仅追加的会话事件历史、确定性状态重放与派生 agent 流。*
   - **为何重要：** 这是一个标记为 `status:accepted`、`risk:high`、`domain:architecture` 的架构 RFC。它提议用仅追加的事件日志取代可变对话持久化，以实现确定性重放。底层需求：**agent 行为的可复现性、可审计性与可调试性**——这是企业级的持续性需求。

2. **[PR #11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225)**（打开，`priority:p0`、`release-gate`、`domain:security`）—— *fix(memory): preserve owner in delegation.*
   - **为何重要：** 直接关联多租户身份隔离。配套 issue **[#11995](https://github.com/zeroclaw-labs/zeroclaw/issues/11995)**（今日创建）要求在主体作用域完全可靠之后*恢复*后台委派。底层需求：**安全的多租户委派**——生产多用户部署的硬性阻塞点。

3. **[PR #11822](https://github.com/zeroclaw-labs/zeroclaw/pull/11822)** / **[PR #11994](https://github.com/zeroclaw-labs/zeroclaw/pull/11994)**（打开，`security:policy`）—— *Shell 命令扫描器：在替换/子 shell 边界处拆分 POSIX 命令；按 bash 语法解析 POSIX。*
   - **为何重要：** 这些 PR 处理 `tool:shell` 策略执行中的命令注入式绕过。底层需求：**agent 工具执行的纵深防御**，尤其是在 agent 运行不受信任的模型生成 shell 时。

4. **[Issue #11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984)**（打开，`release:v0.9.0`）—— *为无管理员权限的已登录账户提供 Dashboard 聊天。*
   - **为何重要：** 直接扩大受众——非管理员 OIDC 用户现在可以与授权 agent 聊天。底层需求：**企业级 RBAC + 自助访问**。

---

## 5. 缺陷与稳定性

按严重程度排序（均为 2026-10-22/23 报告/更新）：

**S2 — 功能降级**
- **[#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991)** —— Email channel HTML 透传：来自 agent 文本的原始标记和任意图片 URL 泄漏到传输层。*已有修复 PR：* [#11993](https://github.com/zeroclaw-labs/zeroclaw/pull/11993) 在 `markdown_to_html` 中剥离原始 HTML。
- **[#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989)** —— 按 channel 配置的 `excluded_tools` 从未生效。*暂无修复 PR。* 策略执行缺口——模型可以访问操作者本意隐藏的工具。
- **[#11966](https://github.com/zeroclaw-labs/zeroclaw/issues/11966)**（已关闭）—— crates.io preflight 在继承版本号提升时触发，并在 tag 已存在后失败。*已由* [#11967](https://github.com/zeroclaw-labs/zeroclaw/pull/11967) *修复*。
- **[#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558)**（已关闭）—— Cranelift CI 20 分钟超时。*已由* [#11941](https://github.com/zeroclaw-labs/zeroclaw/pull/11941) *修复*。

**S3 — 轻微**
- **[#11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987)** —— 内联 `nosemgrep` 注释无法抑制 Semgrep 代码扫描告警。*暂无修复 PR。*
- **[#11821](https://github.com/zeroclaw-labs/zeroclaw/issues/11821)**（已关闭）—— 拒绝记录缺少发送者身份。*已由* [#11848](https://github.com/zeroclaw-labs/zeroclaw/pull/11848) *修复*。

**值得注意的非 issue 稳定性工作：** PR [#11901](https://github.com/zeroclaw-labs/zeroclaw/pull/11901) 处理网关关闭语义（连接在路由器停止后继续提供服务）——这是每次守护进程重载时潜在的崩溃/正确性风险。

---

## 6. 功能请求与路线图信号

| 项目 | 信号 | 预计落地 |
|---|---|---|
| [#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) 面向非管理员已登录账户的 Dashboard 聊天 | 标记为 `release:v0.9.0` | **v0.9.0** |
| [#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992) Email 运维模板 + 供 `send_via` 使用的净化 HTML 正文 | 与缺陷 #11991 的修复配对 | **v0.8.7–v0.9.0** |
| [#11995](https://github.com/zeroclaw-labs/zeroclaw/issues/11995) 恢复具有主体作用域结果的自有后台委派 | #11225 的后续（`p0`、`release-gate`） | **以 #11225 为门槛** |
| [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847) 带可选 OMEMO 的 XMPP/Prosody channel | `size:XL`、`risk:high`，仍打开 | **v0.9.0 之后的候选** |
| [#11879](https://github.com/zeroclaw-labs/zeroclaw/pull/11879) Goal V1 提案 2/12 —— 配置与命令语法 | 休眠中，分阶段推出 | **多版本系列** |

**趋势：** 路线图正在分叉为 (a) **安全与多租户加固** 和 (b) **channel/身份扩展**（email 模板、XMPP、OIDC dashboard 聊天）。

---

## 7. 用户反馈汇总

**今日浮现的痛点：**
- **运维可见性：** #11821（"无法判断该批准谁"）—— 运维人员需要*可识别*的拒绝事件。当日修复。
- **策略信任：** #11989（`excluded_tools` 被静默忽略）削弱了对 channel 级限制确实被执行的信心。这可以说是当日**最令人担忧的未修复 issue**。
- **Email 渲染安全：** #11991 表明用户希望发出精心设计的邮件，*同时*不让 agent 注入任意 HTML/图片——这是一种安全与可用性的张力。
- **发布可靠性：** #11828 和 #11966 反映出 CI/发布机制可能阻塞交付的挫败感（arm64 OOM、preflight 误报失败）。

**满意信号：** CI 缺陷的当日快速周转以及重大架构 RFC（#10526）的接受，表明贡献者-维护者循环健康。

**不满信号：** 24 小时内出现两个关于 *channel 正确性* 的 S2 issue（#11989、#11991），且均来自同一作者（mov-xound-glitch），暗示 channels 子系统已积累了潜在缺口。

---

## 8. 积压关注

值得维护者关注的长期未响应项：

- **[PR #10034](https://github.com/zeroclaw-labs/zeroclaw/pull/10034)**（自 2026-08-16 打开，约 68 天）—— *fix(tools): probe saved provider alias after model-routing update.* 标记为 `domain:security`、`risk:medium`、`size:XL`。近期无处置。
- **[PR #11304](https://github.com/zeroclaw-labs/zeroclaw/pull/11304)**（自 2026-10-01 打开，`status:blocked`、`topic:plugins`）—— *Record socket and WebSocket egress denials.* 明确受阻；需要维护者介入以解除阻塞。
- **[PR #11822](https://github.com/zeroclaw-labs/zeroclaw/pull/11822)**（自 2026-10-17 打开，`needs-maintainer-review`、`security:policy`、`risk:high`）—— Shell 扫描器边界拆分。安全价值高；等待审查。
- **[PR #11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)**（XMPP channel，`size:XL`、`risk:high`，自 2026-10-19 活跃）—— 大表面积贡献，需要持续的审查带宽。

**健康提示：** 24 小时内打开的 PR 数（42）对比已合并数（8），开放/合并比约为 5:1。虽然活动活跃，但审查队列正在增长——如果 `size:XL` PR 持续累积而审查吞吐量不成比例增长，可能成为潜在瓶颈。

---

*基于 2026-10-23 的 GitHub 活动生成。所有链接指向 `github.com/zeroclaw-labs/zeroclaw`。*

</details>