# Bản tin cộng đồng công cụ AI CLI 2026-11-07

> Tạo lúc: 2026-11-07 05:48 UTC | Công cụ theo dõi: 7

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

**Claude Code Skills — 2026-11-07**

**Yêu cầu đang mở**

Bảo mật: các skill cộng đồng được phân phối dưới namespace `anthropic/` có thể mạo danh skill chính thức của Anthropic, khiến người dùng cấp quyền nâng cao cho những skill mà họ tưởng là chính thức (anthropics/skills Issue #492). Một báo cáo khác cho biết skill `claude-api` tiêm khoảng 156k token trong một lần gọi tool, làm cạn cửa sổ ngữ cảnh ngay lập tức (anthropics/skills Issue #1487).

---

**Có gì thay đổi**

- v2.1.319 đổi cách xử lý auto mode khi telemetry hoặc feature flag bị tắt, kể cả khi chạy sau LLM gateway. Những lệnh gọi mà server không kiểm tra được giờ sẽ bị hỏi lại hoặc từ chối, không fallback về classifier tích hợp. Đặt `CLAUDE_CODE_AUTO_MODE_SERVER=0` để giữ classifier cũ. Bedrock, Vertex và Foundry không đổi. Điều này quan trọng nếu bạn chạy auto mode sau gateway.

**Đáng chú ý**

- Issue #107757 (99 bình luận, 699 👍) báo rằng header `User-Agent` làm lộ email người dùng cho bên thứ ba trong các lần tìm kiếm web. Người báo muốn xóa hẳn trường này, không phải chuyển sang opt-in/opt-out. Đang mở, chưa có fix trong dữ liệu.
- Issue #105334 báo rằng ứng dụng desktop macOS từ chối các yêu cầu MCP `elicitation/create` mà không hiển thị chúng, dù có quảng cáo là hỗ trợ elicitation; CLI trên 2.1.311 xử lý khác. Đang mở.
- Issue #106714 báo rằng idle compaction (từ 2.1.299) chạy âm thầm sau khoảng 54 phút im lặng, kể cả khi còn xa giới hạn context. Tác giả đề nghị có prompt lần đầu và một thông báo. Đang mở ở 2.1.316.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

- Phát hành `rust-v0.169.0-alpha.2` ([release](https://github.com/openai/codex/releases)). Chỉ là bản alpha canary; không có ghi chú nào ngoài chuỗi phiên bản.
- PR [#60041](https://github.com/openai/codex/pull/60041) yêu cầu xác nhận tin cậy dự án rõ ràng trong các lần chạy không tương tác, nên `codex exec --sandbox workspace-write` vẫn tắt config và MCP server không đáng tin trừ khi bạn truyền `--trust`. CLOSED, chưa xác nhận trạng thái merged.
- Các PR [#60031](https://github.com/openai/codex/pull/60031)–[#60032](https://github.com/openai/codex/pull/60032) thống nhất bố cục status-line của TUI và cho phép nội dung trạng thái của extension dùng tối đa bốn dòng footer. CLOSED.

**Đáng chú ý**

- Issue [#60047](https://github.com/openai/codex/issues/60047): macOS desktop `26.1103.32239` mở ra trống và composer không phản hồi với các dự án remote qua SSH. Được báo là lỗi hồi quy P0; 2 bình luận, dữ liệu chưa có bản sửa.
- Issue [#59013](https://github.com/openai/codex/issues/59013): Windows 11 Codex CLI 0.166.0 TUI không nhận bất kỳ input bàn phím nào khi khởi động. Người dùng bị ảnh hưởng là người dùng Windows CLI; dữ liệu chưa có bản sửa.
- Issue [#59344](https://github.com/openai/codex/issues/59344): Windows desktop `26.1029.7803.0` định tuyến workspace thất bại với HTTP 432 và `account/read -32603`, vẫn tiếp diễn sau khi đăng nhập OAuth. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Công việc đang tiếp tục trên agent và các bản sửa lỗi lõi.

- PR #30020 (đang mở) loại bỏ các lệnh gọi công cụ được stream bởi những lần thử thất bại khi retry giữa stream. Hiện tại cả hai lần thử đều thực thi sự kiện `ToolCallRequest`, nên một lệnh có tác dụng phụ có thể chạy hai lần. Quan trọng khi retry mạng gặp lệnh shell. → google-gemini/gemini-cli/pull/30020
- PR #30185 (đang mở) chặn các phiên `gemini` tương tác đệ quy được spawn bên trong Shell Mode (`!`) và công cụ `[Shell]`. Quan trọng nếu bạn vô tình khởi chạy gemini từ gemini.
- PR #30053 (đang mở) sửa lỗi `Background PIDs: NaN` khi file PID nền có dòng không phải số. Quan trọng cho việc theo dõi shell nền.

**Đáng để biết**

- Issue #21409 (đang mở, 8 bình luận, 👍 8): agent đa dụng treo vô thời hạn ở các tác vụ đơn giản như tạo thư mục. Cách xử lý theo người báo cáo: yêu cầu model không giao lại cho subagent. Chưa có bản sửa nào được phát hành.
- Issue #21968 (đang mở, 7 bình luận): Gemini hiếm khi gọi skill tùy chỉnh hoặc subagent mà không được yêu cầu; cần chỉ dẫn rõ ràng. Đây là quan sát cá nhân của tác giả.
- Issue #24246 (đang mở): lỗi 400 khi bật hơn 128 công cụ. Không có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

- v1.0.108-1 khởi động lại MCP server cục bộ đang chạy sau `/cd` khi bật sandbox. Server giờ tuân theo đường dẫn bị chặn của thư mục mới thay vì giữ đường dẫn của thư mục cũ. Điều này quan trọng khi bạn đổi project giữa phiên làm việc với sandboxing được bật.
- v1.0.108-1 sửa lỗi đính kèm PDF trên Grok 4.7 và 4.6: chúng chuyển sang tham chiếu tệp thay vì làm hỏng lượt chat.
- v1.0.108-0 thêm lệnh `/index` và bật mặc định index tgrep chia sẻ được quản lý cho các repository đủ điều kiện. Cũng thêm `sandbox.userPolicy.filesystem.enumeratePaths` trong `settings.json` để cấp quyền thư mục chỉ liệt kê trên Windows.

**Đáng chú ý**

- Issue #5375 yêu cầu cách tắt các slash command tích hợp, vì một skill review tùy chỉnh xung đột với `/review` tích hợp. Chưa có bản sửa trong dữ liệu.
- Issue #5378 đề nghị điều hướng bàn phím trên toàn bộ dòng thời gian chat, không chỉ trong ô soạn prompt. Mở ngày 2026-11-07, không có bình luận.
- Issue #5370 báo cáo output của agent bị giữ lại đến lượt người dùng tiếp theo khi các lệnh shell dài chạy nền trong chế độ Fusion/Auto. Đang mở, một bình luận.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## Thay đổi gì

**v2.2.6 bổ sung kết nối MCP dùng chung.** Bật pooling cho một MCP server sẽ chia sẻ một kết nối giữa các dự án có cùng cấu hình, nhờ đó chạy ít tiến trình hơn và khởi động nhanh hơn ([#61185](https://github.com/anomalyco/opencode/pull/61185)). Bản phát hành này cũng thêm theme plugin cho GUI và các slot mới, theo phần nổi bật của bản phát hành.

**Output shell trên Windows hỏng ở v2.2.6.** Khi `"shell": "pwsh"` trỏ tới alias app-execution của Microsoft Store, mọi lệnh trả về `exit=0` với output rỗng ([#62512](https://github.com/anomalyco/opencode/issues/62512)). PR [#62522](https://github.com/anomalyco/opencode/pull/62522) đã đóng nhưng ghi chú liệt kê nó là bản sửa lỗi, không phải bản phát hành.

**Compaction có thể làm mất kết quả tool.** Khi auto compaction bắt đầu ngay sau một bước model kết thúc bằng tool call, request đầu tiên sau compaction bỏ sót kết quả của call đó, nên OpenAI từ chối với lỗi "No tool output found for function call" ([#62481](https://github.com/anomalyco/opencode/issues/62481)).

## Đáng chú ý

**Người dùng PowerShell 7 từ Store có thể thấy output shell rỗng** cho đến khi có bản build đã sửa. Theo dõi [#62512](https://github.com/anomalyco/opencode/issues/62512).

**Vấn đề reset gói miễn phí là thread sôi nổi nhất.** Issue [#59387](https://github.com/anomalyco/opencode/issues/59387) có 318 bình luận về lỗi giới hạn miễn phí và các lần reset không bao giờ xảy ra.

**Quy tắc permission phụ thuộc vào cách viết.** Một quy tắc `deny` cho shell khớp với đúng đoạn lệnh gốc, nên các wrapper như `bash -c` đi vòng qua nó ([#62513](https://github.com/anomalyco/opencode/issues/62513), [#58775](https://github.com/anomalyco/opencode/issues/58775)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Những gì đã thay đổi

**Ctrl+o giờ mở rộng output `!`/`!!` chạy trong lúc agent stream.** Trước đây hộp output trong vùng tin nhắn chờ vẫn bị thu gọn (PR #11886, issue #11875). Điều này quan trọng khi bạn gọi lệnh shell giữa lúc phản hồi và cần đọc kết quả.

**Đối số prompt template giữ nguyên dấu nháy đơn.** `/ask why doesn't the user's cache work` bị gửi thành `why doesnt the users cache work` (PR #11873, issue #11861). Ảnh hưởng đến mọi đối số `/command` chứa `'` hoặc `"`.

**Edit không còn ghi lại kiểu xuống dòng của những dòng không bị sửa.** Trong file trộn CRLF/LF, sửa một dòng lại làm thay đổi byte ở chỗ khác (PR #11751, issue #8544). Xử lý encoding cho file không phải UTF-8 và UTF-16 là một PR riêng đang mở (#11894).

## Đáng chú ý

**`StringEnum` trong pi-ai 1.5.0 suy ra `unknown` cho tham số tool.** Kiểu của `registerTool` vỡ ngay lúc biên dịch (issue #11869, đang mở, p0). Ảnh hưởng đến người dùng SDK đăng ký tool có trường enum. Chưa có bản sửa trong dữ liệu.

**`Harness.close()` không giải phóng tài nguyên session của pi-ai provider.** Một tiến trình Node độc lập vẫn giữ WebSocket và bộ đếm idle năm phút của nó (issue #11676, đang mở). Ảnh hưởng đến agent nhúng dùng `pi-durable`.

**`openai-completions` báo context 272K cho `gpt-6.1-sol` dù catalog tài khoản ghi 500K.** Ngân sách compaction nhỏ hơn so với máy chủ công bố (issue #11021, đang mở, 8 bình luận). Ảnh hưởng đến người dùng `openai` xác thực qua ChatGPT.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Đã thay đổi gì

**v0.26.9 đã phát hành.** Bản này bổ sung upload Skill dạng ZIP, API daemon, hỗ trợ TypeScript SDK, kích hoạt hàng loạt và các biện pháp bảo vệ khôi phục. Không có thay đổi gây vỡ nào được liệt kê. Nguồn: [v0.26.9](https://github.com/QwenLM/qwen-code/releases).

**Đề xuất: tự động nén khi rảnh.** Issue [#16508](https://github.com/QwenLM/qwen-code/issues/16508) đề xuất chạy nén hội thoại lúc người dùng không dùng, thay vì giữa lượt, để độ trễ nén không rơi vào lượt đang hiển thị.

**Đề xuất: kiểm tra kích thước write_file trước khi ghi.** Issue [#16417](https://github.com/QwenLM/qwen-code/issues/16417) yêu cầu Qwen Code từ chối `write_file` quá lớn trước khi tạo, thay vì sau khi cắt. Hiện tại lần thử đó bị mất và không có gì được ghi.

## Đáng chú ý

- Session không mở được khi file transcript `.jsonl` vượt giới hạn index 256 MiB hardcode ([#13113](https://github.com/QwenLM/qwen-code/issues/13113), 11 bình luận). Ảnh hưởng đến các session dài đụng nhiều file.
- Chế độ headless `-p` không bao giờ lưu auto-memory: lệnh cấm edit/write_file ngầm ghi đè quyền cho phép của memory agent ([#15597](https://github.com/QwenLM/qwen-code/issues/15597), 9 bình luận).
- Trên Windows, model mặc định dùng shell POSIX vì prompt không bao giờ nêu `cmd.exe` ([#15310](https://github.com/QwenLM/qwen-code/issues/15310), 6 bình luận).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*