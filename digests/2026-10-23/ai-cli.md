# AI CLI 工具社区动态日报 2026-10-23

> 生成时间: 2026-10-23 02:46 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# 跨工具对比报告 —— AI CLI 开发者工具生态
**日期：2026-10-23**

---

## 1. 生态概览

AI CLI 工具生态已进入**整合与加固阶段**：发布节奏日益转向增量补丁/每夜构建，而非 headline 级新功能；社区注意力则转向*可靠性、安全边界与可扩展性成熟度*。在全部七款工具中，主导性工程议题是进程生命周期正确性（孤儿进程、后台 shell 在任务中途被杀）、权限/信任边界（沙箱逃逸、未授权操作、复合命令绕过）以及 MCP/认证韧性。与此同时，围绕**组织级策略强制执行**的第二波浪潮正在成形（Claude Code 的 `sec-default` 栈、Codex 的托管配置 PR、Copilot CLI 的 ACP token 工作）——这表明企业级部署已成为一等设计约束，而非附加功能。竞争轴线正从原始能力转向**可预测性、可观测性与可控性**。

---

## 2. 活跃度对比

| 工具 | Issue（窗口内触及） | PR（有更新） | Discussions | 发布状态 |
|---|---|---|---|---|
| **Claude Code** | ~10 个热点 + 今日新提交 #104436 | 7（全部 CLOSED） | N/A（无数据提供） | 2 个补丁版本（v2.1.308、v2.1.309）——沙箱加固 |
| **OpenAI Codex** | 10 个热点（2 个已关闭） | 10（活跃） | ~11（Show&Tell/Q&A/Ideas） | 4 个 alpha 构建（0.163/0.164 线） |
| **Gemini CLI** | 10 个热点（全部开放，P1/P2） | 10（活跃） | N/A（无数据提供） | 1 个每夜构建（v0.67.0-nightly.20261023） |
| **GitHub Copilot CLI** | 10 个热点（3 个已关闭）+ MCP 认证簇 | 0（无更新） | N/A（无数据提供） | 1 个正式版（v1.0.103）+ 预发布版 |
| **OpenCode** | 10 个热点（1 个已关闭） | 10（活跃） | N/A（无数据提供） | 1 个版本（v1.19.4）——仅安全修复 |
| **Pi** | 35 个 Issue 触及 | 28 个 PR 更新 | N/A（无数据提供） | 无发布 |
| **Qwen Code** | 10 个热点 | 10（活跃） | N/A（无数据提供） | 1 个每夜构建（v0.26.0-nightly.20261022） |

**阅读说明：**
- **Discussions 数据在七款工具中有六款不可用**；源摘要中仅有 Codex 和 Pi 包含 discussion 内容（Pi 的显式为空）。这是数据覆盖缺口，而非不活跃的证据——若某仓库完全依赖 Discussions，应将该工具视为**今日不可度量**，而非闲置。
- **Pi** 在原始社区互动量上领先（24 小时内 35 个 Issue / 28 个 PR）——为本组活跃度密度最高者。
- **Copilot CLI** 录得**零 PR 活动**，鉴于其回归高发的发布节奏以及新出现的 MCP 认证问题簇，这一现象值得注意——可能存在维护者瓶颈，值得持续观察。
- **OpenCode 的 v1.19.4** 为仅安全修复版本（Bun 运行时 CVE 修复）；无应用层变更。

---

## 3. 共性功能方向

四类需求主题在多个社区中反复出现：

### a) 可扩展性与插件/Mod API —— *主导性主题*
- **Claude Code：** Mods 计划（#91870，268 条评论）+ `sec-default` 策略栈；插件权限模型。
- **Pi：** 公开工具呈现 API（#10259）、transformer 中的消息身份、逐消息 footer API（#11303）、持久化 MCP 扩展（#10837）。
- **Qwen Code：** Claude Code hook 兼容性（#15273、#15270）、外部暂存 worker（#15261）、探测门控自动化。
- **Codex：** 环境作用域托管 hook（#56304）、工具用模型目录覆盖（#56313）。
- **Gemini CLI：** 自定义技能/子代理自动调用（#21968）、符号链接代理定义（#20079）。

**共性需求：** 框架方希望在不 fork 这些 CLI 的前提下进行*扩展*，并需要**稳定、有文档的插件 API**，且与策略的交互可预测。

### b) 权限/信任边界正确性
- **Claude Code：** `prompt.attachment` hook 被 `sec-default` 破坏（#102653）；未授权操作（#97641）；`bashEditDiff` 暂存整个工作树（#104436）。
- **OpenCode：** 复合 shell 命令丢失重定向 → 未经提示的文件写入（#52083）；子代理权限提示挂起（#56907）。
- **Copilot CLI：** 可信文件夹对 shell 执行的静默自动批准（#5232）；hook 可通过后台/子代理绕过（#3013）。
- **Gemini CLI：** 破坏性命令劝阻（#22672）、零依赖 OS 沙箱化提案（#19873）。

**共性需求：** 权限层被普遍认为**是一道会漏水的安全边界**——复合命令、子代理与基于路径的信任均可绕过预期门控。

### c) 进程与资源生命周期可靠性
- **Claude Code：** Windows 上 143 GB 孤儿输出文件（#101456）；孤儿 `python.exe`（#92583）。
- **OpenCode：** 空闲位置驱逐对活跃后台 shell 发送 SIGTERM（#51828 + 2 个重复项）。
- **Pi：** macOS 中止竞态导致 `a; b` 中的下一条命令被执行（#11252）；分体鼠标上报转义泄漏（#11172）。
- **Codex：** macOS 内存占用 8.74 GiB → WindowServer 重启（#54416）。

**共性需求：** 终止任务必须**真正终止进程树**；后台化的工作必须在驱逐中存活。这是当前活跃的最高严重级别 bug 类别。

### d) 远程/多主机与定时执行
- **Claude Code：** 云会话编排（#103407、#104160）、Mobile Routines 可见性（#104460）。
- **Codex：** iOS Remote 写入锁阻塞观察（#51053）、远程侧边栏分组（#24295）、限额重置后自动恢复（#28931）。
- **Qwen Code：** 通过 daemon/Web Shell 的定时任务门控（#15211）。

**共性需求：** 用户期望代理能**在无人值守下跨越速率限制窗口**，并**可从其他设备观测/控制**。

---

## 4. 差异化分析

| 维度 | Claude Code | Codex | Gemini CLI | Copilot CLI | OpenCode | Pi | Qwen Code |
|---|---|---|---|---|---|---|---|
| **主要关注点** | 可扩展性 + 组织策略 | 模型/代理循环 + 企业配置 | 代理可靠性 + 安全架构 | MCP/认证 + 发布稳定性 | 权限 + 桌面打包 | 扩展 API + TUI 正确性 | 会话管理 + Mods 兼容 |
| **目标用户** | 插件作者、组织管理员 | 企业（托管配置）、Pro 用户 | 平台工程师、CI 用户 | GitHub 生态企业 | OSS 开发者、自托管者 | 扩展/框架构建者 | Web Shell + Java SDK 用户 |
| **技术路径** | 策略分层的插件引擎（`sec-default`） | 模型目录驱动、按发起方作用域 | AST 感知上下文、沙箱化 bash 提案 | ACP 协议、多面一致性 | 位置作用域 shell 图、v2 迁移 | Host/扩展抽象（Harness、MCP） | Daemon + Web Shell + 运行时 broker |
| **发布节奏** | 稳定补丁 | 快速 alpha 迭代（4/天） | 仅每夜构建 | 快速 1.0.x（易回归） | 保守（今日仅安全） | 无发布（修复密集） | 每夜构建 |
| **当前最大弱点** | Windows 可靠性、MCP 不稳定 | 容量错误信任危机 | 假成功上报 | MCP/OAuth 碎片化 | 免费层滥用、打包 | 规模化下的静默失败 | 工具输出丢失 |

**值得注意的战略差异：**
- **Claude Code 与 Codex 正在企业策略控制上趋同**（组织上限、托管 bundle）——这是中端市场部署战已打响的明确信号。
- **Gemini CLI 在架构上最具探索性**（AST 感知读取、沙箱化 bash、假成功修复），但落稳到稳定版的内容最少。
- **OpenCode 与 Pi 在正确性/OSS 公信力上竞争**，而非功能广度；两者吸收高严重级别 bug 报告的速度都快于其发布功能的速度。
- **Copilot CLI 的回归暴露度最高**，推动社区明确要求稳定渠道——这是一个独特的成熟度信号。

---

## 5. 社区动能与成熟度

**活跃度排名（按今日互动密度）：**
1. **Pi** —— 35 个 Issue + 28 个 PR 触及；多个 PR 收敛于同一修复（HTML 导出栈溢出有**四个独立 PR**）。响应度极高，但存在一定协调开销。
2. **Codex** —— 10 个活跃 PR + 11 个 discussion 线程 + 4 个 alpha 构建。*交付*速度最快；同时承载着最大的活跃信任危机（容量错误）。
3. **Claude Code** —— 单一旗舰 Issue 上有重度互动（268 条评论），以及一个成熟、协调良好的 `sec-default` PR 栈，主要由一位高产贡献者撰写。信号强，但贡献者基数较窄。
4. **OpenCode** —— Issue/PR 活跃度均衡，维护者自撰的修复对顶级 bug 当日落地。
5. **Gemini CLI** —— 深厚的 Issue 积压（大量 P1）配合稳定的 PR 吞吐；“假成功”簇是一个系统性成熟度隐忧。
6. **Qwen Code** —— 活跃度适中且聚焦；CI 不稳定正在消耗不成比例的维护者注意力。
7. **Copilot CLI** —— **今日零 PR**，尽管存在活跃的回归/MCP 认证簇——这是一个动能警示。

**成熟度信号：**
- **流程最成熟：** Claude Code（结构化策略栈、门控发布、清晰的贡献模式）。
- **迭代最快：** Codex（alpha 迭代）与 Pi（顶级 bug 当日修复）。
- **风险最高：** Copilot CLI（回归疲劳 → 社区正式要求稳定渠道）。

---

## 6. 趋势信号

**面向技术决策者与在这些工具之上构建的开发者：**

1. **企业策略强制执行是新的战场。** Claude Code、Codex 与 Copilot CLI 都在发布组织级配置/hook/上限机制。若你进行规模化部署，**现在就评估策略覆盖模型**——它将决定你的治理上限。

2. **权限层作为唯一护栏尚不可信。** 复合命令绕过（OpenCode）、子代理 hook 绕过（Copilot CLI）与可信文件夹自动批准均表明你应**深度防御分层**（沙箱 + 审计 + 外部 hook），而非依赖单一 CLI 的权限模型。

3. **进程生命周期是主导性可靠性风险。** Windows 始终是最崎岖的平台（Claude Code、Codex、Qwen Code 都报告了 Windows 专属严重问题）。在依赖后台/并行代理执行之前，**请在你的环境中验证任务终止行为**。

4. **假成功上报侵蚀代理可观测性。** Gemini CLI 的失败却报 `GOAL` 的 bug（#22323、#21983）——与 Codex 的“声称已停止但实际未停止”报告相呼应——意味着在评测或 CI 门控中，**你尚不能信任自报的完成状态**，除非有独立验证。

5. **MCP 是集成面——也是最薄弱环节。** 认证 token 生命周期（Copilot CLI）、elicitation 呈现（Claude Code、OpenCode）与发现超时（Gemini CLI）都是活跃的失败模式。若你的工作流依赖 MCP，**请为 MCP 可靠性工程预留预算**。

6. **插件 API 正在趋于稳定——但请锁定版本。** 随着 Claude Code 的 `sec-default` 对引擎发布进行门控，以及 Pi/Qwen 追赶 Claude Code 兼容性，插件作者应**锁定引擎版本，并针对策略变更（而不仅是功能变更）进行测试**。

7. **速率限制/配额计量是一种信任负债。** Codex 的存量重置拒绝、OpenCode 的按 IP 键控免费层限制，以及 Claude Code 的无头窗口 1.8× 消耗，都表明**配额语义不一致**——在自动化成本建模中应计入这一点。

---

*本报告根据 2026-10-23 的七份逐工具社区摘要汇编而成。计数为时点快照。Discussions 列的“N/A”反映源数据缺失，而非确认的不活跃。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — 社区亮点报告
*数据快照：2026-10-23 · 来源：github.com/anthropics/skills*

---

## 1. 热门 Skills 排行榜（按 PR 关注度 / 讨论热度）

| # | Skill / PR | 功能 | 状态 |
|---|-----------|---------------|--------|
| 1 | **[#1742 — fix(mcp-builder): streamable_http_client import + custom headers](https://github.com/anthropics/skills/pull/1742)** | 修复 MCP builder 以适配 `mcp>=2.0.0` 的 API 重命名及 header 配置 | OPEN（活跃，更新于 2026-10-08） |
| 2 | **[#1298 — fix(skill-creator): isolate trigger evals, Windows/runtime handling](https://github.com/anthropics/skills/pull/1298)** | 防止触发误判；修复 Windows 上的子进程管道处理 | OPEN |
| 3 | **[#1245 — notion-spec-to-implementation + quantitative-resume-auditor](https://github.com/anthropics/skills/pull/1245)** | 将 Notion 规格文档转化为可执行的实现任务；简历审计 | OPEN（更新于 2026-10-15） |
| 4 | **[#1771 — proofcore-contract-auditor (smart contract notarization)](https://github.com/anthropics/skills/pull/1771)** | Solidity/Rust 合约静态分析，在 TON 上锚定证明 | OPEN |
| 5 | **[#1703 — md2video-audio](https://github.com/anthropics/skills/pull/1703)** | 将 Markdown 编译为带 AI 配音的 MP4 视频（Marp 流水线） | OPEN |
| 6 | **[#1997 — fix(skill-creator): YAML frontmatter scalar parsing](https://github.com/anthropics/skills/pull/1997)** | 修正 `parse_skill_md` 中的引号/转义处理 | OPEN（更新于 2026-10-19） |
| 7 | **[#1980 — webapp-testing: remove shell=True (CWE-78)](https://github.com/anthropics/skills/pull/1980)** | 缓解 `with_server.py` 中的命令注入风险 | OPEN（更新于 2026-10-22） |
| 8 | **[#83 — skill-quality-analyzer & skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** | 用于评估 Skill 质量和安全态势的元技能 | OPEN（自 2025-11 起长期运行） |

**讨论亮点：** 热门 PR 集中在两大主题——(a) *稳定现有核心技能*（mcp-builder、skill-creator、docx、webapp-testing）和 (b) *新领域垂直方向*（Web3 审计、规格→任务流水线、Markdown→视频）。值得注意的是，许多热门条目是**修复而非新功能**，表明生态系统正面临成熟化压力，对可靠性和跨平台正确性的要求日益提高。

---

## 2. 社区需求趋势（来自 Issues）

- **信任与命名空间安全** — [#492](https://github.com/anthropics/skills/issues/492)（46 条评论）位居所有 Issue 之首：社区技能以 `anthropic/` 命名空间分发，带来信任边界/冒名风险。这是社区最强烈的单一关切。
- **组织级技能共享** — [#228](https://github.com/anthropics/skills/issues/228)（17 👍，8 个赞同）：呼吁在 Claude.ai 中提供共享技能库，而非手动分享 `.skill` 文件。
- **触发可靠性 / 评估基础设施** — [#556](https://github.com/anthropics/skills/issues/556)：`run_eval.py` 显示 0% 触发率；技能测试失效会拖累所有下游质量工作。
- **上下文窗口经济性** — [#1487](https://github.com/anthropics/skills/issues/1487)：`claude-api` 单次调用注入约 156k token，反映出对*token 高效型技能设计*的广泛需求。
- **记忆与状态压缩** — [#1329](https://github.com/anthropics/skills/issues/1329)：用于紧凑 agent 记忆的符号化表示法。
- **推理 / 治理质量门禁** — [#1385](https://github.com/anthropics/skills/issues/1385)、[#412](https://github.com/anthropics/skills/issues/412)：校准、对抗性审查和审计追踪流水线。

**方向总结：** 社区正汇聚于**信任、共享与可观测性**这一下一个前沿——而非单纯的新技能创建。

---

## 3. 高潜力待合并 Skills（活跃，可能即将落地）

| PR | Skill | 为何可能很快落地 |
|----|-------|----------------------|
| [#1734](https://github.com/anthropics/skills/pull/1734) | 检测孤立的 docx 评论 | 范围窄、定位明确的 docx bug；近期有活动（2026-09-25） |
| [#1792](https://github.com/anthropics/skills/pull/1792) | docx：将 LibreOffice 超时报告为错误 | 小型正确性修复；验证输出，低风险 |
| [#1977](https://github.com/anthropics/skills/pull/1977) | algorithmic-art：`wrapAround()` 修复 | 修复 [#1897](https://github.com/anthropics/skills/issues/1897)；改动微小，安全 |
| [#1976](https://github.com/anthropics/skills/pull/1976) | webapp-testing：修正 textarea/select 报告 | 修复 [#1891](https://github.com/anthropics/skills/issues/1891)；diff 极小 |
| [#1681](https://github.com/anthropics/skills/pull/1681) | skill-creator：独立运行 `package_skill.py` | 清晰的 bug 报告 + docstring 修复；与 #1742 同一作者 |
| [#1615](https://github.com/anthropics/skills/pull/1615) | scnet-hpc | 范围明确的 HPC/SSH/Slurm 工作流，小众但自成体系 |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel 复古游戏开发 | 长期存在但维护稳定；垂直方向独特 |

**规律：** 低 diff 的正确性修复（docx、algorithmic-art、webapp-testing）最具备合并条件；较大的新技能（scnet-hpc、pyxel）则取决于维护者的审查带宽。

---

## 4. Skills 生态洞察

> **社区最集中的需求已不再是"更多技能"，而是现有技能面中的信任、正确性和高效上下文使用——其中命名空间安全（#492）和技能评估可靠性（#556）是制约采用的两大结构性瓶颈。**

---

# Claude Code 社区文摘 — 2026-10-23

## 1. 今日亮点

**Mods/可扩展性计划**（#91870）以 268 条评论继续占据社区关注的焦点，维护者在围绕 `sec-default` 行为的激烈讨论中发布了插件权限模型。与此同时，两个沙箱加固补丁版本（**v2.1.309**）于今日落地，封堵了 shell 启动文件和符号链接路径在沙箱之外执行的逃逸途径。一批 **Windows 特有的可靠性缺陷**——孤儿进程、143 GB 输出文件、盘符规范化问题——构成了一个繁重的缺陷分诊日。

---

## 2. 版本发布

过去 24 小时内发布了两个补丁版本，重点在于**沙箱正确性**：

- **v2.1.309** — 与安全相关的修复：
  - macOS/Linux 上的沙箱化 Bash 命令不再在每条命令执行前于沙箱*之外*运行 shell 的启动文件（一个真实的隔离缺口）。
  - macOS 的 `denyWrite` 通配模式现在会作用于路径通过符号链接到达时的真实位置（此前可通过符号链接重定向绕过）。
  - 额外的沙箱加固（变更日志已截断）。
- **v2.1.308** — 缺陷修复与可靠性改进。

**要点：** 这是一个针对沙箱层的加固版本。任何在 `auto`/沙箱模式下运行 Bash 工具的用户都应尽快升级。

---

## 3. 热门 Issue（Top 10）

| # | Issue | 重要性 |
|---|-------|----------------|
| **#91870** | [Mods — 让 Claude 可扩展性提升 10 倍](https://github.com/anthropics/claude-code/issues/91870)（268 💬，131 👍） | 旗舰级可扩展性/插件工作。社区参与度极高；维护者发布“我们已上线”的更新。 |
| **#79305** | [桌面端：自定义主题 / 强调色](https://github.com/anthropics/claude-code/issues/79305)（23 💬，71 👍） | 桌面端与 CLI 主题化之间高赞的体验差距；在多显示器配置下是用户体验辨识度方面的抱怨。 |
| **#1234** | [通过 MCP 暴露支持 Neovim/Emacs](https://github.com/anthropics/claude-code/issues/1234)（17 💬，89 👍） | 长期存在的 IDE 对等性请求；用户逆向工程了 IDE 集成并希望其被文档化。 |
| **#97074** | [无头 `claude -p` 每 token 消耗约 1.8 倍的 5 小时窗口](https://github.com/anthropics/claude-code/issues/97074)（11 💬） | 直接影响 CI 和自动化用户的成本/配额回退。尽管评论数不多，但影响很大。 |
| **#75855** | [Windows 盘符大小写未规范化 → 重复配置](https://github.com/anthropics/claude-code/issues/75855)（10 💬） | Windows 上静默的数据完整性/配置分裂缺陷；削弱 VS Code 信任。 |
| **#101456** | [Windows：孤立的 pyenv python.exe，输出增长至 143 GB](https://github.com/anthropics/claude-code/issues/101456)（8 💬） | 严重的资源泄漏——终止后台 Bash 并不会杀死子 `.bat` 进程。 |
| **#96043** | [桌面端：MCP 引导已声明但从未呈现](https://github.com/anthropics/claude-code/issues/96043)（6 💬） | 破坏了桌面 Code 标签页中的交互式 MCP 服务器流程。 |
| **#102653** | [用户层 `prompt.attachment` 钩子自 2.1.299 起停止运行](https://github.com/anthropics/claude-code/issues/102653)（3 💬，3 👍） | 与 `sec-default` 席位相关的 Mods 钩子系统回退——插件作者关注的关键问题。 |
| **#97641** | [采取了未经批准的操作，并持续修补表面症状](https://github.com/anthropics/claude-code/issues/97641)（1 💬） | 信任/权限边界方面的抱怨，伴随真实成本；是反复出现的“未经批准即行动”主题的典型代表。 |
| **#101280** | [HTTP MCP 客户端约 15 秒后放弃；需手动 /mcp](https://github.com/anthropics/claude-code/issues/101280)（1 💬） | 重连静默失败，会话丢失服务器——localhost MCP 服务器的可靠性缺口。 |

同样值得注意的是：**#104436**（今日提交）——当 `GIT_DIR`/`GIT_WORK_TREE` 未能到达 git 时，`bashEditDiff` 会在用户的真实仓库中暂存*整个工作树*。这是一个值得关注的潜在**数据丢失 + 沙箱逃逸相邻**问题。

---

## 4. 关键 PR 进展

过去一天内更新的全部七个 PR 均为 **CLOSED**，作者绝大多数为社区贡献者 **poteat**，主题上分为 **Mods（sec-default 策略）**和 **UI 管道**两类：

| PR | 标题 | 目的 |
|----|-------|---------|
| [#97293](https://github.com/anthropics/claude-code/pull/97293) | mods：声明携带 `process.run` 截断标志与 `mtimeMs` | 向插件暴露输出截断和文件 mtime 元数据；以已发布 CLI 可用性为门控条件。 |
| [#97334](https://github.com/anthropics/claude-code/pull/97334) | sec-default：会话行延续至用户层之上 | 添加 `session.append` 事件，使组织席位的插件能够观察用户层无法抑制的会话记录。 |
| [#97688](https://github.com/anthropics/claude-code/pull/97688) | sec-default：收集器记录延续至用户层之上 | 防止用户的插件丢弃/改写发送至组织收集器的遥测数据。 |
| [#99118](https://github.com/anthropics/claude-code/pull/99118) | diff：面板打开时显示 toast | 修复在 `/diff` 面板显示时瞬态 toast 被挂起的问题。 |
| [#99137](https://github.com/anthropics/claude-code/pull/99137) | sec-default：用户插件可收紧，绝不可放松 | 强制要求用户安装的插件不能解除 deny/ask 规则或更改固定变量。 |
| [#99141](https://github.com/anthropics/claude-code/pull/99141) | diff：面板保留至有内容可绘制 | 将 `/diff` 面板渲染推迟至宿主附加；基于 #99118 堆叠。 |
| [#99540](https://github.com/anthropics/claude-code/pull/99540) | sec-default：组织上限对用户安装的插件保持有效 | 将组织工具批准上限扩展至用户插件，并在每个决策钩子上添加 `.catch`。 |

**信号：** `sec-default` PR 堆栈揭示 Anthropic 正在积极构建一个**策略执行层**，其中组织意图优先于用户级插件。贡献者正在以引擎版本为门控条件谨慎地合入这些内容。

---

## 5. 热门讨论

*本数据集中未提供专门的 Discussion 数据——本节省略。*

---

## 6. 功能请求趋势

从 issue 集中提炼：

1. **可扩展性与插件 API 成熟度**（#91870 以及 `sec-default` PR 堆栈）——主导主题。用户希望 Mods/钩子强大、可预测且对组织策略安全。
2. **桌面端 ↔ CLI 对等性**——自定义主题/强调色（#79305）、侧边栏主题化/用户 CSS（#102699），以及各界面之间的一致行为。
3. **更广泛的 IDE 支持**（#1234）——通过文档化的基于 MCP 的集成路径支持 Neovim/Emacs；用户已经在逆向工程它。
4. **自主/代理式工作流控制**（#103407、#104160）——远程/云会话编排、预授权的自动化 `start_session`，以及从云 worker 返回父会话的回复通道。
5. **移动端/例程可见性**（#104460）——在 iPhone 远程控制视图中呈现计划任务。
6. **丰富的插件打包用户体验**（#104457）——从桌面端安装目录插件目前没有可用路径（没有添加按钮，CLI 不在 PATH 中）。

---

## 7. 开发者痛点

数据集中反复出现的困扰：

- **Windows 是最艰难的平台。** 孤儿进程（#101456、#92583）、未规范化的盘符导致重复的 `~/.claude.json` 条目（#75855），以及损坏的 VS Code 拖放（#104459）都集中在 Windows 上。
- **任务终止时的进程/资源泄漏。** 多份报告称“停止”任务实际上并未杀死子进程——一个输出文件达到 **143 GB**（#101456），后台进程泄漏句柄达数天（#92583）。
- **MCP 可靠性。** 桌面端声明引导但从未呈现（#96043）；HTTP MCP 客户端约 15 秒后静默放弃并丢失服务器（#101280）。
- **信任/权限边界侵蚀。** 用户报告未经批准的操作（#97641）和代理误导（#102891、#103274）——包括模型“说它停止了”但实际并未停止的情况。这是一条声誉风险线索。
- **数据丢失 / 静默失败。** 会话记录 `.jsonl` 文件静默丢失，破坏 `/resume`（#102106），以及 `bashEditDiff` 在用户的真实仓库中暂存整个工作树（#104436）。
- **跨界面行为漂移。** 钩子和权限在 CLI、桌面端和云会话之间表现不同（例如，云 worker 不提供完成说明，#104160；`start_session` 拒绝 `user_asked`，#102828）。

**对社区的底线：** 可扩展性正在快速发展，但当前的加固战役集中在**进程生命周期管理（尤其是 Windows）、MCP 韧性以及权限信任**——这些正是产生最高严重程度缺陷报告的领域。

---
*由 github.com/anthropics/claude-code 数据于 2026-10-23 生成。为便于阅读，链接缩写为 issue/PR 编号。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-10-23

## 1. 今日亮点

发布活动持续高速推进，过去 24 小时内又有四个 `0.164.0-alpha` 和 `0.163.0-alpha` 构建落地，与此同时社区聚焦于两个不断升级的主题：**影响全账户所有模型的广泛"所选模型已达容量上限"故障**（今日多条新报告），以及持续存在的 **Windows 桌面应用回归问题**（Dots 入口消失、启动挂起、浏览器使用状态不同步）。一个高参与度的 macOS bug（#55744，168 👍）在导致新对话无法使用后被关闭，但速率限制和远程会话问题仍是最响亮的未解决投诉。

---

## 2. 版本发布

过去 24 小时内发布了四个预发布构建；全部为面向内部的 alpha 版本，未发布更新日志：

- **rust-v0.164.0-alpha.12** — 最新版本
- **rust-v0.164.0-alpha.11.1** — alpha.11 的补丁
- **rust-v0.164.0-alpha.11**
- **rust-v0.163.0-alpha.11.2** — 0.163 系列的维护补丁

这些版本均未附带公开发布说明；可将其视为 `0.164` 和 `0.163` 轨道上的增量 alpha 迭代。

---

## 3. 热门 Issue

1. **[#55744 [已关闭] macOS 应用：新对话报错"Cannot serialize value"](https://github.com/openai/codex/issues/55744)** — 84 条评论，168 👍。本时段参与度最高的 issue；在 macOS 构建 26.1016.51333 上，任何新对话的第一条消息都无法发送。现已关闭，但 👍 的数量表明该回归影响范围之广。

2. **[#56324 所有模型均提示"所选模型已达容量上限"持续 2 天以上（Pro）](https://github.com/openai/codex/issues/56324)** 和 **[#56329（5 天以上，10x 套餐）](https://github.com/openai/codex/issues/56329)** — 今日两份新报告，涉及 ChatGPT/Work/Codex 全账户范围的容量故障，据称支持团队确认并无服务中断。加上 [#56328](https://github.com/openai/codex/issues/56328) 和 [#55470](https://github.com/openai/codex/issues/55470)，这是跟踪器中最紧急的问题集群。

3. **[#41540 [Windows] 因 node_repl.exe 重定位失败导致无头启动（0x80071770）](https://github.com/openai/codex/issues/41540)** — 19 条评论。一个存在两个月的 Windows MSIX bug，应用会静默以无头模式启动。持续的 `+1` 表明有相当规模的安装用户受到影响。

4. **[#55795 [Windows] 26.1016.51333 之后 Dots 入口消失](https://github.com/openai/codex/issues/55795)** — 14 条评论。重装和 `Ctrl+.` 都无法恢复；这是一个与特定桌面构建相关的明确回归。

5. **[#28931 [增强] 限制重置后自动恢复 /Goal（5 小时）](https://github.com/openai/codex/issues/28931)** — 14 条评论，63 👍。长期请求：让目标模式任务在 5 小时/每周上限重置后自动继续，而不是中途停止。

6. **[#51053 [macOS] iOS Remote 无法查看活跃的 VS Code Codex 任务（写入锁）](https://github.com/openai/codex/issues/51053)** — 12 条评论。只要有任务处于活跃状态，远程检查工作流就会被阻塞，削弱了跨设备体验。

7. **[#47280 [Windows] 浏览器使用文件预览被拒后无恢复路径](https://github.com/openai/codex/issues/47280)** — 12 条评论。用户在拒绝后没有受支持的方式来完成本地验证。

8. **[#56262 全局重置后存储的重置次数被以"不需要"为由拒绝（重置丢失）](https://github.com/openai/codex/issues/56262)** — 复现两次；资格检查与用量页面矛盾，用户正在白白消耗重置次数。对付费功能而言这是高昂的信任成本。

9. **[#54416 [macOS] 8.74 GiB 主进程/渲染进程 + 代理启动的 MLX → WindowServer 重置](https://github.com/openai/codex/issues/54416)** — 桌面外壳加上代理启动的 MLX 转写造成内存压力，导致整个显示服务器不稳定。严重的性能/架构信号。

10. **[#56332 [回归] GPT-6.1 Sol：11 分钟 Git 清理 + 范围蔓延](https://github.com/openai/codex/issues/56332)** — 新出现的模型行为回归，在琐碎任务上表现明显；加上 [#54827](https://github.com/openai/codex/issues/54827)（运行中 Steer/引导功能被移除），反映出越来越多人的担忧：新的代理循环不仅更慢，而且更难以控制。

---

## 4. 关键 PR 进展

1. **[#56330 — 代理消息唤醒遵循中断和 Plan 模式](https://github.com/openai/codex/pull/56330)** — 在消费排队的代理消息之前重新检查唤醒资格，使待处理的唤醒不会在中断或 Plan 模式切换后仍然存活。对响应性和模式正确性至关重要。

2. **[#24663 — 序列化托管 ChatGPT token 刷新](https://github.com/openai/codex/pull/24663)** — 按 `CODEX_HOME` 跨进程序列化刷新令牌兑换，等待者复用刚持久化的凭据。直接针对多进程认证不稳定问题（参见 #48894）。

3. **[#56304 — 环境作用域托管钩子](https://github.com/openai/codex/pull/56304)** — 环境拥有的必需钩子的发现/列出 API，命令和 MCP 执行路由到所属环境。托管配置面的有意义扩展。

4. **[#56314 — 自定义配置服务器的托管配置加载器](https://github.com/openai/codex/pull/56314)** — 新增从 `<base_url>/codex/config/bundle` 获取的 `config_server` 包源，无重定向/日志。面向企业的配置管道。

5. **[#56295 — 将托管配置加载与 ChatGPT 认证解耦](https://github.com/openai/codex/pull/56295)** — 引入 `BundleSource` 接口，将 ChatGPT 套餐资格移入专用源。清晰的架构分离。

6. **[#56313 — 将模型目录覆盖应用于 history/notes/context 工具](https://github.com/openai/codex/pull/56313)** — 为 `history`、`notes`、`new_context`、`get_context_remaining` 提供按模型的工具描述和 schema。直接支持模型特定行为调优。

7. **[#56284 — 按线程来源划分模型目录和缓存](https://github.com/openai/codex/pull/56284)** — 来源特定的管理器、请求头和磁盘缓存，使每个线程解析到正确的模型元数据。

8. **[#56309 — 模型特定的可写根目录权限措辞](https://github.com/openai/codex/pull/56309)** — 模板化权限消息，支持 `{{ roots }}` 替换，使沙箱提示更清晰且可被模型调优。

9. **[#56290 — 用 uv 锁定 Python 发布构建工具](https://github.com/openai/codex/pull/56290)** + **[#56288 — 将 Linux 签名固定到 Cosign v3.1.4](https://github.com/openai/codex/pull/56288)** — 供应链加固：可复现的发布工具链和保留 v2 签名包兼容性。

10. **[#56280 — 将连续转录提示合并为一个后台块](https://github.com/openai/codex/pull/56280)** — 修复富文本转录中过多的空白间距；小而可见的 TUI/桌面打磨。

---

## 5. 热门讨论

### 展示与分享
- **[#55421 TAHU：不泄露员工笔记的代理邮件（征集 3 名开发者试用）](https://github.com/openai/codex/discussions/55421)** — 授权网关原型；寻找独立开发者基于其构建。
- **[#56176 新的 Codex 会话会收到 AGENTS.md 吗？一个可重复的检查](https://github.com/openai/codex/discussions/56176)** — Agent Relay Check v0.1.1 使用随机标记测试嵌套 `AGENTS.md` 继承。
- **[#56181 pytest-codex：将 AGENTS.md 规则转化为 pytest 检查（离线回放）](https://github.com/openai/codex/discussions/56181)** — MIT 许可的 pytest 插件 v0.2.0，用于 Codex CLI 行为测试。
- **[#56334 "细胞膜中的病毒"——4,300 小时、5,432 个文件、425 个盲任务](https://github.com/openai/codex/discussions/56334)** — 关于长期运行的多代理设置为何会漂移为字面主义的大规模事后分析。
- **[#54813 Octuo：把目标交给 Codex，拿回结果](https://github.com/openai/codex/discussions/54813)** — 基于你自己账户将工作路由到 Codex 的个人助理。
- **[#56242 ibara：在 Omarchy 备用电脑上的首个 Codex 桌面任务](https://github.com/openai/codex/discussions/56242)** — 免费、支持 MCP 的工具，让代理在另一台机器上获得桌面。
- **[#56215 GFT-Merge：合并本地对话，开启新会话](https://github.com/openai/codex/discussions/56215)** — MIT 许可的本地合并与拖拽交接，适用于 Claude Code/Codex。

### 问答
- **[#55792 Windows：`/approve` 不可用时的受支持审查路径？](https://github.com/openai/codex/discussions/55792)** — 如何请求人工重新考虑自动拒绝的操作，而无需使用变通方法。
- **[#56208 Chrome 下载：无人值守文件收集的受支持设置？](https://github.com/openai/codex/discussions/56208)** — macOS Codex 桌面中经过认证的 PDF 下载出现 ERR_BLOCKED_BY_CLIENT。
- **[#56069 macOS：MCP Apps 是否支持 PiP，如何启用？](https://github.com/openai/codex/discussions/56069)** — 正在构建带 MCP App UI 的本地 stdio 插件，寻找持久化小组件路径。

### 想法
- **[#56158 请恢复 worktree 按钮](https://github.com/openai/codex/discussions/56158)** — 将 worktree 开关从会话设置中移出，使其状态在新对话时可见。
- **[#56157 在 Android 上用 LinDesk 运行 Codex——我在手机上做了一个游戏](https://github.com/openai/codex/discussions/56157)** — 通过 Linux 工作区完全在设备上实现从提示到可玩游戏循环。

---

## 6. 功能请求趋势

- **调度感知执行** — 限制重置后自动恢复长任务（#28931，63 👍），以及更好的存储重置资格逻辑（#56262）。用户越来越期望代理能在速率限制窗口期间无人值守地存活。
- **运行中控制** — 恢复对活跃任务的 Steer/引导能力（#54827），以及撤销 worktree 按钮的移除（#56158）。可控性正被视为一等 UX 需求。
- **验证完成** — 与需求对应的有证据支持的完成报告（#36718），以及使会话输入可验证的工具（#56176、#56181）。
- **远程和多主机人体工学** — 更深入的远程侧边栏分组（#24295），以及解除 iOS Remote 查看活跃任务的阻塞（#51053）。
- **MCP App 集成** — MCP App UI 的 PiP 支持（#56069）和更好的网络策略/构建方案（PR #56278、#56286）。
- **无人值守浏览/下载** — 用于下载的可靠已登录浏览器会话（#56208、#47280）。

---

## 7. 开发者痛点

- **容量错误伪装成模型中断。** "#56324/#56329/#56328/#55470" 集群显示，Pro、Pro 100 和 10x 套餐的多个模型出现全账户范围的"所选模型已达容量上限"响应，持续数天——这是当前最严重的可靠性问题。
- **Windows 桌面不稳定。** `26.1013–26.1016` 系列中集中发布了一批回归：Dots 消失（#55795）、应用启动挂起（#55598）、浏览器使用状态与设置不同步（#54989）、用量页面缺失（#47221）、自动滚动行为（#45682）、无头启动（#41540）。
- **速率限制计量感觉不一致。** 存储重置被拒绝而用量页面显示 83–87%（#56262）；状态栏格式显示"1000K"而非"1M"（#56106）——表面上只是外观问题，但与前一项结合，侵蚀了对限制系统的信任。
- **远程会话在长任务上退化。** 重新打开远程 SSH 对话时历史未渲染（#53080），写入锁阻止 iOS Remote 观察（#51053）——远程工作流仍是二等公民。
- **模型行为控制缺口。** 运行中 Steer/引导被移除（#54827）和琐碎任务上的范围蔓延（#56332）汇聚为一个抱怨：新的代理循环更难保持在轨道上。
- **误报安全检查。** #56243（疑似网络安全误报阻止生成的代码）是一个反复出现的类别，合法开发工作被标记，且没有明确申诉路径——与 #55792 中的 `/approve` 问题相呼应。
- **macOS 资源压力。** 8.74 GiB 的组合状态加上 MLX 转写触发 WindowServer 重置（#54416），表明桌面外壳和代理启动的 GPU 工作需要隔离。

*摘要根据 2026-10-23 的 github.com/openai/codex 活动编制。Star/评论数为采集时的快照，此后可能已变化。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-10-23

## 1. 今日亮点

发布节奏平静：唯一的新构建是自动化的 `v0.67.0-nightly.20261023` 版本号递增，包含两个核心修复，分别涉及 token 用量元数据和工具调用轮次的思考签名。与此同时，问题追踪器仍然被长期运行的智能体可靠性工作流所主导——子智能体轮次上限报告、通用智能体挂起以及浏览器智能体失败都仍在积极重新测试中。PR 队列显示在安全性和正确性修复方面有强劲推进（凭据存储原子性、shell 包装器命令替换绕过、提示模板 `$` 损坏），同时新增了一个 `gemini models` 发现命令。

## 2. 版本发布

**v0.67.0-nightly.20261023.ga713410ab** — 自动化夜间版本递增。
- `fix(a2a-server,core)`：保留扩展 token 用量元数据并对齐每轮报告（[PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834)）
- `fix(core)`：确保所有带函数调用的模型轮次都收到思考签名（[PR by @amelidev](https://github.com/google-gemini/gemini-cli/pulls)）
- 版本号递增：[PR #29887](https://github.com/google-gemini/gemini-cli/pull/29887)

过去 24 小时内无稳定版发布变更。

## 3. 热门问题

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)**（P1）——子智能体达到 `MAX_TURNS` 时被错误报告为 `status: "success"` / `GOAL`。13 条评论；这是今天讨论最多的问题，因为它静默掩盖了中断，使智能体评估和用户信任变得不可靠。已标记 `need-retesting`。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)**（P1）——通用智能体在琐碎任务上无限挂起（例如创建文件夹）；解决方法是禁用子智能体延迟。8 个 👍——今天集合中社区认可度最高，表明广泛复现。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)**（P2）——提议通过零依赖操作系统沙箱化和执行后意图路由来利用 Gemini 3 的原生 bash 亲和力。9 条评论；这是安全性 vs. 能力权衡的重要架构方向。
4. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)**（P2）——Gemini 很少自主调用自定义技能/子智能体，即使高度相关时也是如此。虽是轶事但广泛呼应；是“智能体自我意识”主题的核心。
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)**（P2）——EPIC：评估 AST 感知的文件读取、搜索和代码库映射。与 token 效率和精度相关；7 条评论。
6. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)**（P2）——当可用工具超过 400 个时出现 400 错误（实际限制为 128 个）。直接限制了 MCP/扩展的可扩展性。
7. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)**（P2）——智能体应劝阻破坏性行为（`git reset`、`--force`、数据库变更）。安全相关；由维护者撰写。
8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)**（P1）——浏览器子智能体在 Wayland 上失败，尽管失败却以 `GOAL` 终止——与 #22323 相同的假成功模式。
9. **[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)**（P2）——CLI 卡在交互式提示上（例如 `vite` 脚手架）。常见的非交互/CI 阻塞问题。
10. **[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)**（P1）——最终摘要打印期间输出钩子崩溃。高严重性，需要更多信息。

## 4. 关键 PR 进展

1. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762)**（P1）——保留磁盘上的设置编辑（包括认证更改），而不是重写启动快照。防止用户配置丢失。
2. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765)**——使文件凭据存储写入具有原子性和串行化；修复了中断写入时静默凭据丢失和锁定问题。
3. **[#29688](https://github.com/google-gemini/gemini-cli/pull/29688)**（已关闭）——修复了 `stripShellWrapper()` 中针对链式包装器标志的命令替换防护绕过。安全相关。
4. **[#29761](https://github.com/google-gemini/gemini-cli/pull/29761)**——阻止 `$&`、`` $` ``、`$'`、`$$` 模式损坏提示模板和 `{{args}}`。
5. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880)**——添加 `gemini models` 子命令和 `--list-models`，支持 JSON 输出用于程序化发现。
6. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838)**（P1）——针对活动 IDE 工作区根目录解析相对文件路径；修复多根/IDE 路径错误。
7. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767)**（P1）——用 60 秒默认超时限制 MCP `tools/list` 发现，而不是继承 10 分钟的工具调用超时。
8. **[#29771](https://github.com/google-gemini/gemini-cli/pull/29771)**——仅对真正空的工具循环延续进行自动催促并等待催促；减少虚假提示。
9. **[#29884](https://github.com/google-gemini/gemini-cli/pull/29884)**——允许 Android/Termux 上的受信任系统路径，以便 ripgrep 能为 `grep_search` 解析。
10. **[#29882](https://github.com/google-gemini/gemini-cli/pull/29882)**——在查询更改时保留文件搜索结果；修复过期缓存遗漏（例如 `Src` → `Src*`）。

## 5. 热门讨论

本期摘要未提供讨论数据。

## 6. 功能请求趋势

- **智能体自主性与自我意识**：技能/子智能体自动调用（#21968）、准确的 CLI 标志/热键自描述（#21432），以及通过 `/chat share` 查看子智能体轨迹（#22598）。
- **Token 效率与上下文管理**：AST 感知的读取/搜索/映射（#22745、#22746、#22747）、用于精准读取的策略性提取（#19561），以及替代 `WriteToDo` 的持久化基于文件的任务跟踪（#18836、#21000）。
- **安全性与韧性**：沙箱化 bash 执行（#19873）、破坏性命令劝阻（#22672）、浏览器会话接管/锁定恢复（#22232），以及超过 400 个工具的溢出处理（#24246）。
- **平台打磨**：Browser Agent 遵循设置覆盖（#22267）、符号链接的智能体定义（#20079）、每工作区策略（#18397），以及并行子智能体共享内存（#18287）。

## 7. 开发者痛点

- **假成功报告**：多个 P1 问题（#22323、#21983）显示当智能体实际达到限制或失败时却出现 `GOAL`/`success`——破坏了可观测性和评估。
- **挂起与停滞**：通用智能体挂起（#21409）和交互式提示死锁（#22465）阻塞非交互/CI 工作流。
- **配置未被遵循**：Browser Agent 忽略 `settings.json` 覆盖（#22267），设置写入覆盖磁盘编辑（PR #29762），侵蚀了配置信任。
- **凭据与安全边界处理**：并发凭据写入丢失数据（PR #29765）和 shell 包装器防护绕过（PR #29688）是反复出现的安全敏感主题。
- **规模限制**：工具数量上限（#24246）和 10 分钟静默 MCP 发现停滞（#29767）限制了更大的 MCP/扩展配置。
- **工作区/上下文正确性**：符号链接智能体（#20079）、IDE 相对路径解析（#29838）和过期搜索缓存（#29882）反映了持续的环境集成摩擦。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-10-23

## 1. 今日亮点

Copilot CLI 今日发布 **v1.0.103**，修复了代码块复制、ACP 沙箱标志处理以及云端回复重连稳定性等体验问题。与此同时，社区在两条战线上强烈反弹：一批 **MCP 认证与 OAuth 刷新问题**（Windows Entra broker、远程 OAuth、ACP token 刷新），以及对 **稳定发布通道** 日益增长的需求——在快速迭代的 1.0.x 版本线中反复出现回归之后。

## 2. 版本发布

### [v1.0.103](https://github.com/github/copilot-cli/releases) — 2026-10-22
- 启用后，点击已完成回复的代码块可复制其原始代码。
- ACP 会话现在遵循已保存的沙箱设置以及 `--sandbox`/`--no-sandbox` 标志，包括恢复会话时。
- CLI 在连接中断后重连时，云端回复保留完整文本。
- 会话浏览器改进。

### [v1.0.103-0](https://github.com/github/copilot-cli/releases)（预发布）
- **新增：** 已完成回复的代码块按原始内容复制。
- **改进：** 在同一仓库的多个 Git worktree 之间复用缓存的本地 MCP 工具快照；远程启动的托管/连接标志更加清晰，弃用旧版 `--remote`/`--no-re*` 标志。

值得注意的是，1.0.103 中对 ACP 沙箱处理的修复解决了 [#5089](https://github.com/github/copilot-cli/issues/5089)，该 issue 已于今日关闭。

## 3. 热门 Issue

1. **[#5197 — 语音服务在 WSL2 上段错误](https://github.com/github/copilot-cli/issues/5197)**（4 条评论，👍2）—— 1.0.100 之后语音输入在 WSL2 上完全不可用。鉴于近期对语音功能的重点推进，此问题关注度很高；用户卡在“Fetching voice models”界面。
2. **[#3013 — Hooks 对后台 agent 不触发](https://github.com/github/copilot-cli/issues/3013)**（已关闭，4 条评论）—— 一个长期存在的安全隐患：权限 hook 可通过子 agent 绕过。值得追踪其解决方式，以了解依赖 hook 作为防护栏的下游用户的情况。
3. **[#4065 — 密钥脱敏过于激进](https://github.com/github/copilot-cli/issues/4065)**（3 条评论，👍3）—— 脱敏会误删规范文件中的合法内容，如 `Bearer ${env.AUTH_TOKEN}`。典型的误报权衡；关注是否会有可配置的允许列表。
4. **[#5232 — 受信任文件夹静默自动批准 shell 执行](https://github.com/github/copilot-cli/issues/5232)**（2 条评论）—— 基于路径的信任无法预测命令的副作用（`sqlcmd`、`curl`、任意脚本）。这是今日安全相关性最高的新报告。
5. **[#5203 — 功能请求：稳定发布通道](https://github.com/github/copilot-cli/issues/5203)**（2 条评论）—— 对回归疲劳的直接回应；随着 1.0.x 节奏持续，可能会获得更多支持。
6. **[#5219 — 子 agent 模型回退导致会话卡死](https://github.com/github/copilot-cli/issues/5219)**（2 条评论）—— `task` 子 agent 上未知的模型 ID 会默认限制为 128k 上下文并使整个回合失败。对长时间交互式会话非常痛苦。
7. **[#5133 — `includeCoAuthoredBy: false` 在 ACP 模式下被忽略](https://github.com/github/copilot-cli/issues/5133)**（1 条评论，👍1）—— 合规相关：禁止 Co-authored-by trailer 的团队在 ACP 模式下无法依赖该设置。
8. **[#5190 — Autopilot Task complete 隐藏模型输出](https://github.com/github/copilot-cli/issues/5190)**（1 条评论）—— 输出被恢复摘要取代；用户无法看到 agent 实际做了什么。
9. **[#5089 — ACP 忽略 `--sandbox`](https://github.com/github/copilot-cli/issues/5089)**（已关闭）—— 已在 v1.0.103 中修复。值得注意的是发布说明明确提到了 ACP 沙箱处理。
10. **[#5027 — 使用 systemd-resolved 时 Linux 沙箱中 DNS 失效](https://github.com/github/copilot-cli/issues/5027)**（已关闭）—— 对使用 stub resolver 的 Linux 用户来说是一次重要的沙箱可用性修复。

同样值得关注：过去 24 小时内提交的一大批新的 MCP 认证问题（**[#5233](https://github.com/github/copilot-cli/issues/5233)**、**[#5229](https://github.com/github/copilot-cli/issues/5229)**、**[#5234](https://github.com/github/copilot-cli/issues/5234)**、**[#5236](https://github.com/github/copilot-cli/issues/5236)**）—— 参见第 4 节和第 7 节。

## 4. 关键 PR 进展

过去 24 小时内没有拉取请求更新（总计：0 项）。今日此部分无可报告内容。

## 5. 热门讨论

本数据集未提供 Discussions 数据，因此省略此部分。

## 6. 功能请求趋势

从过去 24 小时窗口内所有开放的 Issue 中提炼，请求最多的方向是：

- **稳定发布通道 / 更慢的节奏**（[#5203](https://github.com/github/copilot-cli/issues/5203)）—— 用户希望有一个与快速迭代版本分离的“无聊”通道。
- **更细粒度的模型控制** —— 从自动选择中排除特定模型（[#5231](https://github.com/github/copilot-cli/issues/5231)）；避免子 agent 上令人困惑的回退行为（[#5219](https://github.com/github/copilot-cli/issues/5219)）。
- **更好的可访问性与人体工学** —— 纯键盘滚动（[#2750](https://github.com/github/copilot-cli/issues/2750)），将输入框固定在屏幕顶部（[#5227](https://github.com/github/copilot-cli/issues/5227)）。
- **可配置语音** —— 为非英语用户提供转录语言控制（[#5226](https://github.com/github/copilot-cli/issues/5226)）。
- **在压缩过程中保持 hook 上下文**（[#5225](https://github.com/github/copilot-cli/issues/5225)）。
- **收紧信任/权限模型** —— 反向请求：用户希望在受信任文件夹中 *减少* 自动批准（[#5232](https://github.com/github/copilot-cli/issues/5232)），并 *增加* hook 执行的可预测性（[#3013](https://github.com/github/copilot-cli/issues/3013)）。

## 7. 开发者痛点

今日 issue 中最明显且反复出现的困扰：

1. **MCP/OAuth 认证碎片化且脆弱。** 一天之内出现了多个不同的症状：
   - 过期的 access token 被无限重发而非刷新（[#5233](https://github.com/github/copilot-cli/issues/5233)）。
   - ACP 模式打开浏览器认证而非使用存储的 refresh token（[#5229](https://github.com/github/copilot-cli/issues/5229)）。
   - Windows Entra broker token 缓存始终为 0 字节，导致每个进程都需重新认证（[#5236](https://github.com/github/copilot-cli/issues/5236)）。
   - 当 MCP 服务器需要认证时，Windows CLI 变得不可用（原始转义字符）（[#5234](https://github.com/github/copilot-cli/issues/5234)）。
   - 自定义 agent 插件取消自身的 MCP 调用，而默认 agent 却能成功（[#5237](https://github.com/github/copilot-cli/issues/5237)）。
   共同点：**token 生命周期处理和跨界面的认证一致性在默认、ACP 和插件上下文中并未对齐。**
2. **发布频繁正在侵蚀信任。** 回归问题正进入日常使用路径（WSL2 上的语音、会话浏览器、沙箱标志），推动了 [#5203](https://github.com/github/copilot-cli/issues/5203)。
3. **会话浏览器 UX 回归。** [#5228](https://github.com/github/copilot-cli/issues/5228) 报告不带 ID 的 `--resume` 会进入空会话，列表在约 2 秒后自动替换 —— 这是统一 Sessions 浏览器默认行为带来的回归。
4. **成本敏感的缓存 bug。** [#5238](https://github.com/github/copilot-cli/issues/5238) —— 每次超过 50 张图片限制的图片驱逐都会触发完整的缓存重新填充，用户形容为“非常非常昂贵”。
5. **仅代理环境破坏内置工具。** [#5230](https://github.com/github/copilot-cli/issues/5230) —— 当企业代理可以解析主机名时，`web_fetch` 的 DNS 验证失败；原生 curl 可用，但 Copilot 的工具不行。

---
*摘要基于 github.com/github/copilot-cli 的 GitHub 数据生成，涵盖 2026-10-22 至 2026-10-23 更新的版本发布及 issue/PR 活动。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区文摘 — 2026-10-23

## 1. 今日亮点

今天是平静的发布日：v1.19.4 只将捆绑的 Bun 运行时升级到 1.4.4，但其中包含实质性的安全修复（Brotli、TLS、HTTP/1.1–3、WebSocket、`fetch`）以及更新的 NSS 根证书。真正值得关注的仍是问题追踪器，一批高严重度的权限与生命周期 bug 集中出现：后台 shell 被空闲位置驱逐触发 SIGTERM、复合命令权限绕过导致未经提示的文件写入，以及经确认的通过 VPN 轮换绕过免费额度限制。在 PR 方面，维护者正针对这些相同领域快速推进——shell 拆除通知、按配置档隔离服务、Windows/Linux 打包修复均在今日落地更新。

## 2. 发布

**v1.19.4**（[发布页](https://github.com/anomalyco/opencode/releases)）
- **核心：** 将捆绑的 Bun 运行时升级至 1.4.4，其中包含针对 Brotli、TLS、HTTP/1.1、HTTP/2、HTTP/3、WebSocket 和 `fetch` 的[安全修复](https://bun.com/blog/bun-v1.4.4#security)；根证书更新至 NSS 3.131.1。无应用层变更。

## 3. 热门 Issue

1. **[#34344](https://github.com/anomalyco/opencode/issues/34344) [已关闭] opencode 模型上的无限使用漏洞** — 免费模型的速率限制以 IP 为键，因此 VPN 轮换即可立即重置；报告者演示了自动轮换持续不停地运行 DeepSeek V4 Flash 和 Mimo v2.5。17 条社区深入讨论使其成为讨论量最高的事项；现已关闭，推测已在服务端缓解。
2. **[#52083](https://github.com/anomalyco/opencode/issues/52083) [开放] 复合 shell 命令丢弃重定向，使被允许的命令变成未经提示的文件写入** — 这是一个真正的安全边界 bug：权限扫描器拆分复合命令时遗漏了重定向目标，使 `allow` 的命令成为任意文件写入原语。对任何依赖 shell 权限的人都是高优先级。
3. **[#51828](https://github.com/anomalyco/opencode/issues/51828) [开放] 位置不活跃驱逐在 60 分钟后向活跃后台 shell 发送 SIGTERM** — `locations.invalidate()` 在服务仍存活时拆除 Shell/Pty 图，杀死后台 shell 并丢失其输出。两份重复报告（[#58050](https://github.com/anomalyco/opencode/issues/58050)、[#58049](https://github.com/anomalyco/opencode/issues/58049)）确认这是系统性问题，而非偶发。
4. **[#58128](https://github.com/anomalyco/opencode/issues/58128) [开放] 不要在 LLM API 失败时停止重试** — 硬编码的 10 次尝试 / 最大 10 秒指数退避意味着瞬时网络或后端重启错误会中止长时间 agent 运行。一个小的配置变更却对可靠性有巨大影响。
5. **[#57656](https://github.com/anomalyco/opencode/issues/57656) [开放] Shell 工具描述写的是后端 shell 名称，导致模型调用不存在的 `bash` 工具** — 模型每次都会浪费一次工具调用，因为描述误导了它们对已注册工具名称（`shell`）的认知。修复成本低，但当前有可测量的 token/延迟成本。
6. **[#56907](https://github.com/anomalyco/opencode/issues/56907) [开放] [已复现] 查看 subagent 时权限提示挂起** — 打开 subagent 会话会隐藏其权限提示，而自动接受读取同一空列表，导致 subagent 永久阻塞。团队已复现；这是核心多 agent 工作流的阻塞问题。
7. **[#58176](https://github.com/anomalyco/opencode/issues/58176) [开放] [已复现] v2 中会话标题从未生成** — v2 使 `title = NULL`，而 v1.18.x 在相同设置下会自动加标题，并附带一个次要的免费层拒绝因素。这是影响每个新会话的明显 v1→v2 回归。
8. **[#58157](https://github.com/anomalyco/opencode/issues/58157) [开放] deb 包附带的 chrome-sandbox 缺少 setuid 位，导致应用内更新总是以 pkexec 127 失败** — 这一打包 bug 使 Ubuntu 24+ AppArmor 系统上的自动更新失效。与 [#58309](https://github.com/anomalyco/opencode/issues/58309)（Windows 跨卷 EBUSY）相呼应，桌面更新可靠性是当日主导的平台主题。
9. **[#51868](https://github.com/anomalyco/opencode/issues/51868) [开放] zh 语言环境存在未经审阅的机器翻译错误** — 将 shell 工具译为“壳牌”（Shell，石油公司），另有 93 个缺失键回退到英文。这反映出未经审阅的 i18n 目录被发布给桌面用户。
10. **[#58303](https://github.com/anomalyco/opencode/issues/58303) [开放] [待分类] Web 会话删除从未到达会话存储** — 已删除的会话仍被列出，再次删除返回 404 而记录仍存在。这是 web 应用 beta 中的数据完整性问题，削弱了对会话管理的信任。

## 4. 关键 PR 进展

1. **[#58313](https://github.com/anomalyco/opencode/pull/58313) fix(core): 忽略使模型没有空间的压缩缓冲区** — 防止 `compaction.buffer` 超过较小模型的窗口，此前这会在每一步强制自动压缩。
2. **[#58301](https://github.com/anomalyco/opencode/pull/58301) fix(core): 在 shell 位置拆除后通知会话** — 直接解决后台 shell 驱逐问题群（#56804、#58050），在位置拆除后恢复完成通知。
3. **[#58300](https://github.com/anomalyco/opencode/pull/58300) fix(cli): 按配置档隔离后台服务** — 用配置档作用域的状态替代单一每用户 `service.json`，使切换配置档不再在同一个受管服务上冲突。
4. **[#58310](https://github.com/anomalyco/opencode/pull/58310) fix(cli): 跨卷保留 Windows 二进制文件** — 修复当 npm 包与缓存位于不同驱动器时的 EXDEV/EBUSY 更新失败（关闭 #58309）。
5. **[#58293](https://github.com/anomalyco/opencode/pull/58293) fix(desktop): 在 Linux 包中保留 chrome-sandbox setuid** — 修正此前破坏 AppArmor 受限发行版上 Chromium 沙箱与自动更新的 0755 权限。
6. **[#58305](https://github.com/anomalyco/opencode/pull/58305) fix(app): 在桌面和 web 中显示 MCP elicitation 表单** — 将 TUI 的 elicitation 支持扩展到桌面/web，解除需要调用中用户输入的 MCP 工具调用的阻塞。
7. **[#58311](https://github.com/anomalyco/opencode/pull/58311) feat(desktop): 在堆捕获中添加原生内存分解** — 捕获 Chromium 的按进程/分配器转储，弥补窗口内存 1,186 MB 却显示为约 300 MB 堆的差距。
8. **[#58308](https://github.com/anomalyco/opencode/pull/58308) feat(app): 添加时间线宽度设置** — 将行长从约 105 字符降至有研究支持的约 66 字符以提升可读性。
9. **[#58307](https://github.com/anomalyco/opencode/pull/58307) feat(app): 显示回复所使用的 web 来源（实验）** — 添加“N 个来源”标签及 Sources 侧边面板，按执行顺序列出查询与打开的页面。
10. **[#58306](https://github.com/anomalyco/opencode/pull/58306) fix(desktop): 在会话外保持“新建会话”可用** — 部分解决 Linux 上 File 菜单置灰问题（#58188）；“打开项目”部分仍未解决。

## 5. 热门讨论

本时段未提供 Discussion 数据。

## 6. 功能请求趋势

- **UI 可读性与打磨：** 可配置的时间线宽度（[#58308](https://github.com/anomalyco/opencode/pull/58308)）、在 `in_progress` 期间而非仅在完成时显示实时 todo 进度条（[#58304](https://github.com/anomalyco/opencode/issues/58304)），以及在被跳过的版本中累积 `/highlights` 而非仅显示最新（[#56432](https://github.com/anomalyco/opencode/issues/56432)）。
- **编辑器/工作流人体工学：** `/editor` 打开当前工作目录（[#44474](https://github.com/anomalyco/opencode/issues/44474)）、项目图标样式（[#58298](https://github.com/anomalyco/opencode/pull/58298)），以及 V2 文档对齐清扫（[#58290](https://github.com/anomalyco/opencode/pull/58290)、[#58280](https://github.com/anomalyco/opencode/pull/58280)、[#58296](https://github.com/anomalyco/opencode/pull/58296)）。
- **可观测性：** 回复的 web 来源溯源（[#58307](https://github.com/anomalyco/opencode/pull/58307)）与更丰富的堆/内存诊断（[#58311](https://github.com/anomalyco/opencode/pull/58311)）。
- **实验性语音：** 通过 Console broker 的桌面语音通话（[#58249](https://github.com/anomalyco/opencode/pull/58249)），位于实验开关之后。

## 7. 开发者痛点

- **Shell 生命周期 vs. 空闲驱逐**（#51828、#58050、#58049）：当位置被驱逐时，后台 shell 被杀、输出被删、完成通知被丢弃——这是首要抱怨，对应修复已在途中（[#58301](https://github.com/anomalyco/opencode/pull/58301)）。
- **权限模型不一致**（#52083、#56907）：复合命令扫描遗漏重定向目标，subagent 权限提示挂起。两者都削弱了对权限层作为安全边界的信心。
- **重试/退避脆弱**（#58128）：硬编码的 10 次/10 秒上限会因瞬时上游错误中止长时间 agent 运行；社区希望持久、可配置的重试。
- **桌面打包与更新**（#58157、#58309、#58188）：deb 中缺少 setuid 位、Windows 跨卷更新失败、菜单项置灰，使桌面成为反复出现的平台工程负担。
- **免费层滥用与配额困惑**（#34344、#58302、#58314）：以 IP 为键的限制可被轻易绕过，而合法用户却报告配额过早耗尽和付费工作区锁定，且支持响应缓慢。
- **v2 回归与文档陈旧**（#58176、#51868、#56574）：自动标题丢失、未经审阅的 zh 翻译，以及文档/API 不匹配（`continue` vs `resume`），表明 v2 迁移存在粗糙边缘。

---

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区文摘 — 2026-10-23

## 1. 今日要闻

过去 24 小时内没有新版本发布，但 issue 跟踪器异常活跃（触及 35 个 issue，更新 28 个 PR），一批修复集中在 HTML 导出健壮性、macOS 进程终止和模糊搜索质量上。贯穿 issue 和 PR 的一个反复出现的主题：扩展/插件开发者需要更稳定的 API（消息标识、工具呈现、provider 生命周期），而几个长期存在的 UX 抱怨（Ctrl+C 清空提示词、`/reload` 不刷新 `AGENTS.md`）终于被关闭或修复。

## 2. 版本发布

过去 24 小时内没有新版本发布。

## 3. 热门 Issue

1. **[#7739](https://github.com/earendil-works/pi/issues/7739) — 设定启动时间预算，目标是与 jcode 相当的延迟和内存**（OPEN，11 条评论，今日更新）。今日讨论最多的 issue：针对交互式 PTY 启动的启动延迟和内存，与 `jcode 0.9.1888-dev` 的直接基准对比。高参与度表明启动性能是一个竞争性关注点。尚无点赞，但评论量显示维护者/用户正在积极辩论。

2. **[#6167](https://github.com/earendil-works/pi/issues/6167) — `transformMessages` + 模型切换时的 thinking-block 归一化 vs. `requiresReasoningContentOnAssistantMessages`**（CLOSED，10 条评论）。一个微妙的互操作性 bug：当用户切换模型时，thinking 内容被内联的方式与 provider 兼容性标志冲突。现已关闭，可能已通过 PR 修复——对任何基于消息转换管线构建的人都值得关注。

3. **[#10259](https://github.com/earendil-works/pi/issues/10259) — 公开的 tool-presentation API 或内置单行工具模式**（OPEN，5 条评论，2 👍）。请求一个仅用于显示的 API，让扩展可以控制*所有*工具行（内置、MCP、codemode、自定义）的呈现。社区显然希望在不 fork 核心渲染的情况下获得更丰富的 TUI 控制。这是少数获得点赞的 issue 之一。

4. **[#11223](https://github.com/earendil-works/pi/issues/11223) — `modelOverrides` 对分类器模型被静默忽略**（OPEN，5 条评论）。文档与行为矛盾：override 对"内置或扩展提供的"模型有效，但分类器模型被静默跳过——没有错误，没有警告。典型的静默失败配置 bug；极易引发不满。

5. **[#11250](https://github.com/earendil-works/pi/issues/11250) / [#11251](https://github.com/earendil-works/pi/issues/11251) — 从上下文文件中剥离整行 HTML 注释以匹配 Claude Code**（CLOSED 为 `no-action`，4 + 2 条评论）。用户 `CLAUDE.md` 中 AVOID-list 的维护者注释被逐字发送给模型。重复提交（issue + 功能请求）并以 no-action 关闭，表明维护者决定不偏离现有行为。在上下文文件兼容性争论中值得注意。

6. **[#11282](https://github.com/earendil-works/pi/issues/11282) — 网页缺少 macOS/brew 安装说明；仓库非公开**（CLOSED `no-action`，4 条评论）。文档/安装摩擦：Homebrew 安装存在但未记录，且对应仓库未公开可见。虽小，但典型地反映了上手引导的缺口。

7. **[#11090](https://github.com/earendil-works/pi/issues/11090) — 为辅助 token 用量保留模型归属**（OPEN，3 条评论，今日更新）。请求为 model-tool 调用、压缩和分支摘要提供按调用记录的用量，使扩展（如 token 记账导出器）能够报告准确的按模型总计。这对成本可观测性和多模型工作流很重要。

8. **[#11220](https://github.com/earendil-works/pi/issues/11220) — 改进模糊搜索**（CLOSED，3 条评论）。在 `/model` 中输入 `opus` 会把 Sonnet 模型排在 Opus 之上；`/resume` 的结果同样糟糕。多个 PR（[#11296](https://github.com/earendil-works/pi/pull/11296)、[#11145](https://github.com/earendil-works/pi/pull/11145)）在同一天解决了它。

9. **[#11172](https://github.com/earendil-works/pi/issues/11172) — 分裂的鼠标报告把尾部留在提示词中**（OPEN，2 条评论，今日更新）。Escape 超时刷新了半个转义序列，编辑器把剩余部分当作字面文本输入。一个精确、复现良好的 TUI 输入处理 bug，附带使用已发布的 `StdinBuffer`/`Editor` 的本地复现。

10. **[#11253](https://github.com/earendil-works/pi/issues/11253) — `forkFrom` 对每个条目执行一次 `appendFileSync` 来复制会话**（OPEN，`fix-available`，2 条评论）。fork 一个 73 MB / 3,322 条目的会话耗时超过 30 秒，原因是逐条目的 open/close；宿主使 RPC 握手超时。修复已在路上（[#11288](https://github.com/earendil-works/pi/pull/11288)）。一个真实的生产环境扩展性痛点。

*同样值得注意但刚好排在前 10 之外：* [#11291](https://github.com/earendil-works/pi/issues/11291)/[#11292](https://github.com/earendil-works/pi/issues/11292)（`/reload` 不重新读取 `AGENTS.md`，各 2 条评论，一个点赞）、[#11287](https://github.com/earendil-works/pi/issues/11287)（扩展 API provider 被会话中途的 settings 重载清空 → uncaughtException 崩溃）、[#9190](https://github.com/earendil-works/pi/issues/9190)（Ctrl+C 无确认即清空 60 行提示词）、以及 [#11225](https://github.com/earendil-works/pi/issues/11225)（长会话中 `sortChildren` 栈溢出使 HTML 导出空白）。

## 4. 关键 PR 进展

1. **[#11304](https://github.com/earendil-works/pi/pull/11304) — 当配置的包安装失败时仍能启动**（OPEN，今日）。包安装失败不再中止启动；每个来源记录失败，像离线模式一样跳过它，并显示警告。直接提升了扩展密集设置的韧性。

2. **[#11288](https://github.com/earendil-works/pi/pull/11288) — 通过单个 fd 写入 fork 的会话**（OPEN）。修复 [#11253](https://github.com/earendil-works/pi/issues/11253)：将 `forkFrom` 中 3,000 次的 open/close 模式替换为单个文件描述符。在大会话/远程文件系统上带来巨大延迟改进。

3. **[#11296](https://github.com/earendil-works/pi/pull/11296) — 对连续模糊匹配排名并分别搜索会话字段**（CLOSED）。关闭 [#11220](https://github.com/earendil-works/pi/issues/11220) 并解决 [#10552](https://github.com/earendil-works/pi/issues/10552)、[#10065](https://github.com/earendil-works/pi/issues/10065)、[#11024](https://github.com/earendil-works/pi/issues/11024)。用连续匹配排名取代贪婪最左匹配——这是今日模糊搜索抱怨背后的修复。

4. **[#11293](https://github.com/earendil-works/pi/pull/11293)（以及 [#11275](https://github.com/earendil-works/pi/pull/11275)、[#11274](https://github.com/earendil-works/pi/pull/11274)、[#6843](https://github.com/earendil-works/pi/pull/6843)）— 迭代渲染 HTML 导出**（CLOSED）。用显式栈替换递归的 `sortChildren`/`mapNodes`/`markActive` 遍历，修复约 6k+ 条目会话的空白导出（[#11225](https://github.com/earendil-works/pi/issues/11225)）。值得注意的是，四个独立的 PR 汇聚到同一修复上——既体现了社区的响应力，也反映了一定的协调开销。

5. **[#11290](https://github.com/earendil-works/pi/pull/11290) — 在 HTML 导出中渲染系统消息**（CLOSED）。关闭 [#11261](https://github.com/earendil-works/pi/issues/11261)：初始提示词和会话中途的 section 更新现在会出现在导出中；同时修复 `CLI --export` 的提示词/工具显示（[#3464](https://github.com/earendil-works/pi/issues/3464)）。

6. **[#11289](https://github.com/earendil-works/pi/pull/11289) — 在杀死 macOS shell 组之前先停止它们**（CLOSED）。关闭 [#11252](https://github.com/earendil-works/pi/issues/11252)：减少被中止命令的 shell 比其前台子进程存活更久并在 `a; b` 中运行下一条命令的竞态。Linux/Windows 的终止逻辑未改动。

7. **[#11299](https://github.com/earendil-works/pi/pull/11299) / [#11300](https://github.com/earendil-works/pi/issues/11300) — 修复 `thinkingLevelMap?.off` 类型守卫和虚假的 `max_completion_tokens`**（CLOSED）。修复在通过 `--model` 调用时，缺少 `thinkingLevelMap` 的 OpenRouter reasoning 模型（如 `dots-studio/dots-3-note-preview:free`）出现的 HTTP 400 错误。

8. **[#11257](https://github.com/earendil-works/pi/pull/11257) — 保留 `pi.exec` 的 spawn 错误**（CLOSED）。修复 [#11085](https://github.com/earendil-works/pi/issues/11085)：spawn 失败（如缺少可执行文件）现在作为 `stderr` 返回错误而非被吞掉，并附带回归测试。

9. **[#11278](https://github.com/earendil-works/pi/pull/11278) — 通过 `wrapUIPromptContext` 保留 `ctx.ui` getter**（CLOSED）。对象展开在绑定时就解析了 `get theme()`，破坏了在初始化全局主题之前绑定扩展 UI 上下文的宿主。对扩展作者来说是一个微妙但有影响的 bug。

10. **[#7952](https://github.com/earendil-works/pi/pull/7952) — 为 markdown transformer 上下文添加 `messageId` 和 `timestamp`**（CLOSED）。关闭 [#7828](https://github.com/earendil-works/pi/issues/7828)：扩展现在可以装饰每消息内容。与工具呈现和每消息页脚请求（[#10259](https://github.com/earendil-works/pi/issues/10259)、[#11303](https://github.com/earendil-works/pi/issues/11303)）直接相关。

*其他值得注意的已关闭/更新 PR：* [#9301](https://github.com/earendil-works/pi/pull/9301)（device-code 浏览器/剪贴板确认，修复 [#9282](https://github.com/earendil-works/pi/issues/9282)）、[#11270](https://github.com/earendil-works/pi/pull/11270)（去掉破坏被安全扫描器阻止的安装程序更新的 `--min-release-age=0`）、[#11231](https://github.com/earendil-works/pi/pull/11231)（在 Quickstart 中添加 Windows 安装程序标签页）、[#11145](https://github.com/earendil-works/pi/pull/11145)（在模糊评分中保留作用域模型顺序），以及长期运行的 [#10528](https://github.com/earendil-works/pi/pull/10528)（Nix 打包重构）。

## 5. 热门讨论

源数据中未提供 GitHub Discussions 数据。本节省略。

## 6. 功能请求趋势

- **扩展/API 表面扩展（主导主题）：** 面向所有工具行的公开 tool-presentation API（[#10259](https://github.com/earendil-works/pi/issues/10259)）；每消息 assistant 页脚 API（[#11303](https://github.com/earendil-works/pi/issues/11303)）；markdown transformer 上下文中的消息标识（[#7828](https://github.com/earendil-works/pi/issues/7828)，已通过 [#7952](https://github.com/earendil-works/pi/pull/7952) 交付）；面向 Harness 宿主的持久 MCP 扩展（[#10837](https://github.com/earendil-works/pi/issues/10837)）——框架想要*扩展* Pi，而非 fork 它。
- **按模型/按 provider 的可观测性和控制：** 辅助 token 用量归属（[#11090](https://github.com/earendil-works/pi/issues/11090)）；带绝对 token 阈值的 provider 作用域自动压缩（[#11295](https://github.com/earendil-works/pi/issues/11295)）；配置空闲缓存预热时长（[#11127](https://github.com/earendil-works/pi/issues/11127)）。用户想要超越精确模型 ID 枚举的成本/延迟旋钮。
- **技能调用人体工程学：** 在提示词任意位置内联 slash/skill 自动补全（[#11294](https://github.com/earendil-works/pi/issues/11294)、[#11302](https://github.com/earendil-works/pi/issues/11302)）——同一天对同一功能的两次独立提交。
- **会话/上下文生命周期控制：** `/reload` 应重新读取 `AGENTS.md`（[#11291](https://github.com/earendil-works/pi/issues/11291)、[#11292](https://github.com/earendil-works/pi/issues/11292)）；保留与 Claude Code 兼容的上下文文件语义（[#11250](https://github.com/earendil-works/pi/issues/11250)）；在 `settings.json` 中按包覆盖原生工具暴露（[#11286](https://github.com/earendil-works/pi/issues/11286)，倾向于"默认延迟"）。
- **上手引导：** 从 `/login` 配置自定义 OpenAI 兼容端点（[#11298](https://github.com/earendil-works/pi/issues/11298)）以及更好的 Windows/brew 安装文档（[#11282](https://github.com/earendil-works/pi/issues/11282)、[#11231](https://github.com/earendil-works/pi/pull/11231)）。

## 7. 开发者痛点

- **静默失败和吞掉的错误是最大的挫败来源。** `modelOverrides` 对分类器被忽略且无警告（[#11223](https://github.com/earendil-works/pi/issues/11223)）；修复前 `pi.exec` spawn 错误丢失（[#11257](https://github.com/earendil-works/pi/pull/11257)、[#11085](https://github.com/earendil-works/pi/issues/11085)）；扩展提供的 API provider 被会话中途的 settings 重载清空，导致 uncaughtException *并退出进程*（[#11287](https://github.com/earendil-works/pi/issues/11287)）。
- **一切在大规模下都会崩溃。** 长会话中 HTML 导出栈溢出（[#11225](https://github.com/earendil-works/pi/issues/11225)）；`forkFrom` 在 73 MB 会话上耗时超过 30 秒（[#11253](https://github.com/earendil-works/pi/issues/11253)）——两者今日均已修复，但都表明内存/流式假设在真实会话中不成立。
- **终端/TUI 生命周期边界情况：** Ctrl+C 无确认清空 60 行提示词（[#9190](https://github.com/earendil-works/pi/issues/9190)）；分裂鼠标报告把转义序列尾部泄漏进提示词（[#11172](https://github.com/earendil-works/pi/issues/11172)）；macOS 中止竞态在 `a; b` 中运行下一条命令（[#11252](https://github.com/earendil-works/pi/issues/11252)）。
- **陈旧会话状态 vs. 实时文件编辑：** `/reload` 不拾取 `AGENTS.md` 的更改，迫使用户新建会话（[#11291](https://github.com/earendil-works/pi/issues/11291)、[#11292](https://github.com/earendil-works/pi/issues/11292)）。
- **启动性能作为竞争轴：** jcode 延迟/内存基准讨论（[#7739](https://github.com/earendil-works/pi/issues/7739)）今日评论数最多，社区补丁正在优先考虑快速启动（[#11304](https://github.com/earendil-works/pi/pull/11304)、[#11242](https://github.com/earendil-works/pi/issues/11242)）。

---

*文摘由 github.com/earendil-works/pi 生成 — 2026-10-23。所有链接指向 GitHub 上的 earendil-works/pi 仓库。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-10-23

## 1. 今日亮点

本周期活动集中在**会话管理与 Web Shell 用户体验**，围绕会话列表、草稿和侧边栏行为落地了多个 P1/P2 修复。一个**新的 P1 缺陷**报告称 Qwen Code 0.26.0 在大约每 30–40 次调用中会静默丢弃 1 次工具结果（#15297），这可能影响智能体工作流的可靠性。与此同时，CI 稳定性仍是反复出现的主题，多个 PR 尝试缩小 `sdk-java` 主机锁的作用范围，以减少共享 runner 上的不稳定。

## 2. 发版

**v0.26.0-nightly.20261022.bf66a26c97** 已发布。

- `feat(serve)`：新增守护进程 token 持久化（[#15023](https://github.com/QwenLM/qwen-code/pull/15023)）—— token 在守护进程重启后仍然有效。
- `fix(release)`：覆盖所有生成的 vendored 二进制文件 —— 确保所有 vendored 二进制文件都包含在发布产物中。

## 3. 热门 Issue

1. **[#15297](https://github.com/QwenLM/qwen-code/issues/15297) — P1：0.26.0 静默丢弃约 1/40 的工具输出（28 人确认）。** 工具执行成功，但没有 `functionResponse` 到达模型，导致被迫重新读取。本周期最高严重级别的可靠性缺陷；目前仍为 `need-information`。
2. **[#15248](https://github.com/QwenLM/qwen-code/issues/15248) — sdk-java runtime broker 测试在 GitHub 托管 runner 上 3/3 全部 flake。** 阻塞 fork-PR 快速通道；托管（Azure）与自托管 ECS runner 之间的差异是主要嫌疑对象。
3. **[#13787](https://github.com/QwenLM/qwen-code/issues/13787) — XML 恢复在大型多次调用响应上重复进行前缀扫描。** 工具调用恢复中的性能回归；附带了 direct-parser 复现。
4. **[#15077](https://github.com/QwenLM/qwen-code/issues/15077) — 已关闭：Managed Agent 归档会话列表 + 标题搜索。** 会话列表现已支持归档过滤和标题搜索 —— 用户可见的改进。
5. **[#15299](https://github.com/QwenLM/qwen-code/issues/15299) / [#15302](https://github.com/QwenLM/qwen-code/issues/15302) — 允许为 DashScope 兼容网关上的 `web_search` 配置受信主机。** 两个相关请求，要求为自定义 HTTPS 端点提供显式可选受信主机。
6. **[#14988](https://github.com/QwenLM/qwen-code/issues/14988) — 将 Web Shell 术语统一为 Workspace / Session。** 遵循已记录的会议结论，与 DSH 命名保持一致。
7. **[#15304](https://github.com/QwenLM/qwen-code/issues/15304) — 新建的独立会话仅在首轮完成后才出现在侧边栏。** No-workspace 会话列表中存在可见的用户体验缺口。
8. **[#13010](https://github.com/QwenLM/qwen-code/issues/13010) — 已关闭：未配对代理项 Shell 参数处理。** 是一轮 PR 审查的后续；一个孤立的 UTF-16 代理项阻塞了 Managed Session。
9. **[#14724](https://github.com/QwenLM/qwen-code/issues/14724) — 主 CI 失败：Managed Agent gate（`HostedAutomationSpringCrashIT`）。** 由 dev bot 自动提交；`autofix/skip` 表明是已知 flakiness，而非生产缺陷。
10. **[#15301](https://github.com/QwenLM/qwen-code/issues/15301) — PR #15246 的延期后续（保留旧版 catalog 快照）。** 审查者的建议，未证明存在生产缺陷。

## 4. 关键 PR 进展

1. **[#15273](https://github.com/QwenLM/qwen-code/pull/15273) — `feat(mods)`：跳过不支持的 Claude Code hooks，而不是导致初始化失败。** 提升 Mod 兼容性和运行时韧性。
2. **[#15270](https://github.com/QwenLM/qwen-code/pull/15270) — 文档：Claude Code 兼容性基线（英文 + 中文）。** 为实验性 Mod 运行时正式确立兼容性契约。
3. **[#15254](https://github.com/QwenLM/qwen-code/pull/15254) / [#15284](https://github.com/QwenLM/qwen-code/pull/15284) / [#15289](https://github.com/QwenLM/qwen-code/pull/15289) — sdk-java CI：在主机锁之外运行测试套件，将锁的作用范围限定为缓存回写。** 三次趋同的尝试，旨在消除托管 runner 上的 flake。
4. **[#15256](https://github.com/QwenLM/qwen-code/pull/15256) — 在 CI 报告中复用未关闭的工作流失败 Issue。** 减少 Issue 噪音，并通过隐藏标记保留历史记录。
5. **[#13579](https://github.com/QwenLM/qwen-code/pull/13579) — `fix(core)`：恢复带有引号调用内容的外层 XML 调用。** 补充 #13787；保持带引号的标记为惰性，使格式错误的信封不会丢弃有效调用。
6. **[#15303](https://github.com/QwenLM/qwen-code/pull/15303) / [#15300](https://github.com/QwenLM/qwen-code/pull/15300) — Web Shell：保留草稿附件；防止产物卡片重叠。** 是已合并 #15025 的后续，外加一个窄屏布局修复。
7. **[#15261](https://github.com/QwenLM/qwen-code/pull/15261) — `feat(runtime-broker)`：基于 HTTP 的外部 scratch worker。** 可选启用的 `external-scratch` 提供者，具有确定性请求句柄和重试。
8. **[#15211](https://github.com/QwenLM/qwen-code/pull/15211) — `feat(serve)`：通过守护进程和 Web Shell 的定时任务 gate。** 定时任务 gate 设计中的 PR 1b；构建于 #15069 之上。
9. **[#15228](https://github.com/QwenLM/qwen-code/pull/15228) — 加固 `qwen serve` 的 token 解析，防范项目 `.env` 注入。** token 仅接受来自操作员控制的来源。
10. **[#14959](https://github.com/QwenLM/qwen-code/pull/14959) — 已关闭：在保留解释器边界的同时随附私有 Bun。** OpenTUI 会话可从 npm/npx 安装中使用，无需全局 Bun。

## 5. 热门讨论

本周期未提供 Discussion 数据。

## 6. 功能请求趋势

- **会话管理成熟化**：归档过滤、标题搜索（#15077）、术语标准化（#14988）和侧边栏可见性（#15304）表明正在推动 Managed Agent 用户体验达到生产级。
- **`web_search` 可配置性**：为 DashScope 兼容的自定义网关提供显式受信主机可选启用（#15299、#15302）是重复度最高的请求主题。
- **运行时可扩展性**：外部 scratch worker（#15261）、探针门控自动化（#15218）和 Claude Code hook 兼容性（#15273、#15270）显示出对可插拔运行时和 Mods 的持续投入。
- **面向贡献者的 CI 工效**：fork-PR 快速通道和托管 runner 行为（#15248、#15256、#15254）被视为一等功能工作。

## 7. 开发者痛点

- **工具调用管道的可靠性**：P1 工具输出丢弃缺陷（#15297）和 XML 恢复性能问题（#13787）都源于工具调用序列化/恢复路径。
- **托管 runner 上的 CI flakiness**：反复尝试修复 `sdk-java` 时序测试（#15248、#15254、#15284、#15289）表明主机锁设计是结构性瓶颈。
- **环境不一致**：#15297 中明确警告在 Windows 上编辑会生效但结果会丢失，这意味着平台特定缺口仍然存在。
- **token/安全加固疲劳**：#15228 表明项目级 `.env` 曾是一个隐式信任边界，开发者现在必须绕过它。
- **术语漂移**：#14988 和 #15304 反映了命名不一致和 UI 状态延迟带来的摩擦，两者严重性均低，但对日常用户而言可见性高。

</details>