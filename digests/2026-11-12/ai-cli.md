# Bản tin cộng đồng công cụ AI CLI 2026-11-12

> Tạo lúc: 2026-11-12 07:00 UTC | Công cụ theo dõi: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nóng cộng đồng Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

**scnet-hpc — chạy job trên cụm SCNet HPC qua SSH dựa trên profile và Slurm**
Skill mang theo hướng dẫn về kết nối, partition, bộ nhớ, module và accelerator cho từng profile, đồng thời tạo job Slurm. Đang mở tại PR #1615 của anthropics/skills.

**md2video-audio — biến tài liệu Markdown thành video MP4 có thuyết minh**
Workflow chuyển Markdown bằng Marp thành slide rồi thêm giọng đọc chân thực mà không tốn chi phí. Đang mở tại PR #1703 của anthropics/skills.

**proofcore-contract-auditor — kiểm tra tĩnh hợp đồng thông minh Solidity và Rust**
Công cụ neo bằng chứng kiểm tra bằng mật mã lên TON Blockchain qua giao thức Merkle zero-storage của ProofCore. Đang mở tại PR #1771 của anthropics/skills.

**Yêu cầu đang mở**

Issue #228 đề nghị chia sẻ skill trong toàn tổ chức trên Claude.ai: hiện tại người dùng phải tải file .skill, gửi qua Slack hoặc Teams, rồi từng đồng nghiệp phải tự tải lên thủ công trong Settings > Capabilities.

---

**Thay đổi gì**

Không có bản phát hành hay pull request nào trong 24 giờ qua, nên không có gì thay đổi cách dùng công cụ. Các số phiên bản dưới đây đến từ báo cáo đang mở, không phải bản dựng mới.

**Đáng chú ý**

- Issue #109176 báo cáo một phiên VS Code dài trên Windows 11 với Opus 5.5 làm đầy ổ hệ thống đến mức chỉ còn khoảng 67 MB trống do các subagent chạy song song, rồi làm CPU quá tải. Tác giả nói Claude đã thực hiện thêm các hành động không được phép. Đang mở, chưa có cách khắc phục trong dữ liệu.
- Issue #93782 báo cáo lỗi hồi quy ở 2.1.269: dán bằng công cụ đọc chính tả (clipboard kèm Ctrl+V mô phỏng) không còn chèn văn bản vào terminal tích hợp của VS Code trên WSL2. Phiên bản 2.1.268 vẫn hoạt động. Đang mở, 26 bình luận.
- Issue #87971 báo cáo Claude dùng công cụ bash để đọc, ghi và sửa trong Auto Mode trên Windows và VS Code. Đang mở, 101 lượt phản hồi.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

Codex 0.167.2 gửi cập nhật công cụ theo kiểu tăng dần theo mặc định trên Google Cloud Vertex AI. Cách này giảm kích thước payload khi chạy công cụ lâu; đặt `incremental_tools_legacy_gcp = false` trong mục `[features]` của `config.toml` để tắt ([#60617](https://github.com/openai/codex/pull/60617), [#60848](https://github.com/openai/codex/pull/60848)).

Các bản alpha 0.169.0-alpha.11.x và 0.170.0-alpha.1/2 phát hành không kèm ghi chú phát hành, nên dữ liệu không nêu thay đổi nào ảnh hưởng đến người dùng.

Một PR đề xuất sẽ tự động kết nối lại các hội thoại Cloud đang nhàn rỗi sau khi luồng bị ngắt tạm thời, và giữ input trong hàng đợi cho đến khi luồng trả lời dùng được. PR này đã đóng, không phải tính năng đã phát hành ([#60969](https://github.com/openai/codex/pull/60969)).

**Đáng chú ý**

Form elicitation của MCP bị tự động từ chối trên CLI 0.167.0 và desktop, kể cả khi đặt `approval_policy = "on-request"`, khiến các prompt MCP cần nhập liệu bị chặn ([#60158](https://github.com/openai/codex/issues/60158)). 3 bình luận, chưa có cách khắc phục.

Codex CLI 0.167.2 giữ lại nền prompt và tin nhắn người dùng cũ sau khi chuyển đổi light/dark trên macOS, làm phiên khó đọc ([#61054](https://github.com/openai/codex/issues/61054)). Chưa có cách khắc phục.

`thread/fork` bỏ qua `developerInstructions` được truyền trong request model tiếp theo, kể cả qua Python SDK ([#61046](https://github.com/openai/codex/issues/61046)). Chưa có cách khắc phục.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Những thay đổi

Không có bản phát hành nào ra mắt trong 24 giờ qua. Hai bản sửa lỗi đang được đề xuất trong các PR đang mở.

**Sửa lỗi: giới hạn output token hiển thị trong danh sách model** — PR [#30253](https://github.com/google-gemini/gemini-cli/pull/30253) (đang mở) khiến `gemini models`, `gemini models list` và `--list-models` ngừng in ra giới hạn output token cứng 8.192. Các model Gemini 2.5 và Gemini 3 đã biết sẽ hiển thị 65.536; các model chưa biết sẽ bỏ qua trường này. Điều này quan trọng khi bạn tính ngân sách output từ CLI thay vì từ tài liệu.

**Sửa lỗi: phân tích cú pháp PowerShell chặn event loop** — PR [#30247](https://github.com/google-gemini/gemini-cli/pull/30247) (đang mở) chuyển việc phân tích cú pháp lệnh PowerShell ra khỏi luồng chính trong quá trình kiểm tra shell policy trên Windows. Hiện tại, việc phân tích cú pháp đồng bộ đóng băng spinner Thinking trước khi bảng Shell xuất hiện.

## Đáng chú ý

**Lỗi giới hạn lượt của subagent trông giống như thành công** — Issue [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (đang mở, p1, 13 bình luận) báo cáo `codebase_investigator` trả về `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS mà không thực hiện phân tích nào. Được gắn nhãn `status/need-retesting`; chưa có bản sửa lỗi trong dữ liệu.

**Agent đa dụng treo vô thời hạn** — Issue [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (đang mở, p1, 8 👍) báo cáo `gemini-cli` treo mãi mãi khi nó chuyển sang agent đa dụng, ngay cả với việc tạo thư mục. Người báo cáo cho biết hướng dẫn model không chuyển sang subagent sẽ tránh được tình trạng này. Chưa có bản sửa lỗi trong dữ liệu.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Những gì đã thay đổi**

- v1.0.110-3 sửa lỗi popup đăng nhập Microsoft Entra: hộp thoại lỗi không còn hiện khi có tài khoản tổ chức. Điều này quan trọng với người dùng tổ chức đăng nhập vào CLI.
- v1.0.110-2 đánh dấu là chưa hoàn chỉnh các phản hồi một phần và phần suy luận từ những lần thử bị ngắt hoặc thất bại, giữ nguyên văn bản thay vì loại bỏ.
- v1.0.110-2 chặn lỗi crash Node stack trace khi bạn chạy `copilot` từ một thư mục đã bị xóa; CLI giờ báo thư mục không còn tồn tại và cách khắc phục.

**Đáng chú ý**

- Issue #5053 (đang mở, 4 bình luận): từ 1.0.89, các phiên ACP đã hoàn thành ngừng đánh chỉ mục lịch sử hội thoại và mức sử dụng trong `session-store.db`. Ảnh hưởng đến người dùng ACP; dữ liệu chưa có bản sửa.
- Issue #2955 (đang mở, 4 bình luận): `/allow-all` vẫn hiện hộp thoại cấp quyền cho mỗi lần gọi công cụ bash/shell. Được báo từ thời 1.0.55; dữ liệu chưa có bản sửa.
- Issue #5429 (đang mở, tạo ngày 2026-11-12): một prompt ngôn ngữ tự nhiên bắt đầu bằng đường dẫn API như `/chat-sessions` bị phân tích thành slash command và báo lỗi. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

- `@opencode/pty@0.5.2` (process-daemon v0.5.2, protocol 8) đã được publish lên npm từ `packages/process-daemon`. Các phiên terminal giờ dùng protocol 8, nên client và daemon khác phiên bản có thể lệch nhau.
- PR #63458 đề xuất tách riêng job deploy và release v1 cho pipeline ký CLI; phần build web app được đưa ra khỏi job deploy. Việc ký desktop chưa xong, nên chưa có gì được phát hành.
- PR #63469 đề xuất hỏi lại trước khi chấp nhận form MCP elicitation không có trường nào, thay vì âm thầm trả lời `accept`.

**Đáng chú ý**

- Issue #63357: TUI kill background service dùng chung sau 45 giây không có SSE, hủy phiên và chèn dòng "The server restarted while you were working". Có bốn bình luận; dữ liệu không cho thấy bản sửa nào.
- Issue #55076: các phiên `opencode run --standalone` bị background service resume sau khi run bị kill, mà không có quyền hay giới hạn bước của nó — một báo cáo lên tới 1.660 bước và khoảng $24.
- Issue #2242 (mở từ tháng 8/2025, 113 bình luận): không có cách tích hợp sẵn để sandbox lệnh terminal của agent trong thư mục hiện tại.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Ba bản sửa lỗi đã được hợp nhất cho các vấn đề người dùng gặp phải: PR [#12058](https://github.com/earendil-works/pi/pull/12058) giữ lại đầu ra bash khi phần đuôi được giữ chỉ là một dòng bị cắt, nhờ đó các lệnh có dòng đầu ngắn không còn trả về rỗng (issue [#12062](https://github.com/earendil-works/pi/issues/12062)); PR [#12054](https://github.com/earendil-works/pi/pull/12054) ngăn các phiên được khôi phục làm mất các MCP tool mà `tool_search` đã tải (issue [#11996](https://github.com/earendil-works/pi/issues/11996)); PR [#12052](https://github.com/earendil-works/pi/pull/12052) chuyển đổi các siêu liên kết OSC 8 trong HTML của `/export` để liên kết hiển thị đúng dạng liên kết thay vì văn bản escape (issue [#12003](https://github.com/earendil-works/pi/issues/12003)).

**Đáng chú ý**

Issue [#10024](https://github.com/earendil-works/pi/issues/10024) (đang mở, 6 bình luận): thay đổi bộ tool được chọn giữa chừng khiến phần đầu của system prompt dịch chuyển và tính phí lại cuộc hội thoại từ thời điểm đó.

Issue [#10162](https://github.com/earendil-works/pi/issues/10162) (đang mở, 9 bình luận): quá nhiều ảnh đầu vào khiến tác vụ của agent dừng lại, điều này quan trọng với các phiên chạy dài không giám sát.

Issue [#12076](https://github.com/earendil-works/pi/issues/12076) (đã đóng, 2 bình luận): trên Pi 1.5.2 với vLLM, Pi kết thúc vòng lặp tool một cách im lặng thay vì nén gần giới hạn context.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Đã thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua.

Tính năng gửi qua Channel giờ hỗ trợ webhook ra nền tảng bên ngoài. PR #16802 bổ sung phần backend và một adapter DingTalk, PR #16804 bổ sung luồng Web Shell dùng chung, đóng issue #16751 vào ngày 2026-11-12. Một webhook custom-bot Feishu được đề xuất trong issue #16997 cho cùng hệ thống Channel.

Tính năng gắn PR vào session đang được phát triển. PR #16877 thêm lệnh `/pr <number | url>` cho TUI, CLI headless và session daemon, kèm hộp thoại gắn PR trong Web Shell, dùng khi việc gắn tự động bỏ sót PR.

**Đáng chú ý**

Issue #15486 (P1) báo rằng sau khi nén tự động, ước lượng kích thước của request kế tiếp đếm trùng một tool result đang chờ và cộng thêm 20K pad, khiến lượt đó bị dừng hoặc gửi với `max_tokens: 1`. Issue vẫn đang mở.

Issue #16915 báo một task hiện hai lỗi và không thể tiếp tục, trong đó có "kết nối tới dịch vụ model bị ngắt". Issue được gắn nhãn `status/need-information`, nên chưa xác định được nguyên nhân.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*