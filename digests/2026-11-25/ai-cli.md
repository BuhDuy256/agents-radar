# Bản tin cộng đồng công cụ AI CLI 2026-11-25

> Tạo lúc: 2026-11-25 08:16 UTC | Công cụ theo dõi: 7

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

**pyxel retro game development — pull request đang mở #525**
Bổ sung skill viết, gỡ lỗi và kiểm chứng game retro Python bằng Pyxel. Skill bao gồm chạy headless theo input và kiểm tra từng frame trực tiếp. Pull request đang mở.

**document-typography — pull request đang mở #514**
Bắt lỗi typography trong tài liệu sinh ra: chữ mồ côi khi một đến sáu từ tràn xuống dòng dưới, và tiêu đề mục bị kẹt ở cuối trang. Pull request đang mở.

**notion-spec-to-implementation — pull request đang mở #1245**
Biến spec sản phẩm hoặc kỹ thuật thành task Notion kèm kế hoạch triển khai, tiêu chí nghiệm thu và theo dõi tiến độ. Cùng pull request này cũng thêm quantitative-resume-auditor. Pull request đang mở.

**Yêu cầu đang mở**

**Chia sẻ skill toàn tổ chức trong Claude.ai — issue #228**
Một người dùng đề nghị cho phép chia sẻ skill trong nội bộ tổ chức trực tiếp, thay vì tải file .skill rồi gửi qua Slack để đồng nghiệp tự upload thủ công. Issue đang mở.

---

**Có gì thay đổi**

Claude Code v2.1.332 bổ sung hỗ trợ beta cho các skill do MCP server cung cấp; chúng hiển thị dưới dạng `server:skill` trong menu `/`, còn các skill khác giữ nguyên tên. Bản này cũng thêm hook event `PreSkillShellCommand`, có thể từ chối các lệnh shell inline của skill hoặc command khi chúng đang tải. Trên 2.1.331 và các bản cũ hơn, file settings có nêu hook này sẽ báo lỗi.

**Đáng chú ý**

Gợi ý prompt trong VS Code (ghost text, nhấn Tab để chấp nhận) ngừng tạo từ ngày 2026-11-22, được báo trên 2.1.327 và 2.1.330 mà không ghi log lỗi (Issue #111668). Một báo cáo VS Code khác (Issue #112137) cho biết kiểm tra `rm` trên critical path từ chối lệnh mà không hỏi, kể cả ở chế độ Bypass. Cả hai vẫn đang mở; dữ liệu chưa cho thấy bản sửa nào.

Trên macOS, các phiên chạy nền mất quyền TCC sau mỗi lần tự động cập nhật vì đường dẫn binary có version không khớp với tuyên bố miễn trách nhiệm (Issue #94878, đang mở).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Điều gì đã thay đổi**

- Codex giờ lưu lựa chọn giọng nói trong tùy chọn tài khoản ChatGPT thay vì `realtime.voice`, theo PR #63845 (đã đóng). Điều này giúp lựa chọn giọng nói khớp nhau giữa ChatGPT và Codex, nhưng PR đã đóng, nên hãy kiểm tra xem nó đã có trong bản build của bạn chưa.
- Giới hạn ngữ cảnh bổ sung cho mỗi giá trị tăng từ 1.000 lên 10.000 token (PR #63843, đã đóng). Nhiều nội dung hơn của mỗi giá trị ngữ cảnh đến được model; một bucket histogram 40 KiB đã được thêm vào.
- ripgrep đóng gói chuyển sang 16.0.0 (PR #63811, đã đóng). Hành vi tìm kiếm có thể thay đổi với các pattern mà ripgrep 16 đã đổi ngữ nghĩa.

**Đáng chú ý**

- Windows Computer Use để mở hộp thoại cấp quyền chụp màn hình và viền màn hình màu vàng sau khi lượt chụp ảnh kết thúc (issue #57101, 88 bình luận, đang mở). Ảnh hưởng đến người dùng Windows Codex App; chưa có bản sửa trong dữ liệu.
- Terminal CLI `@Browser` báo lỗi "The browser access host is unavailable" sau bản cập nhật Windows desktop 26.1023.6123.0 (issue #57641, 60 bình luận, 48 👍, đang mở). macOS cũng hiện lỗi tương tự (issue #56928).
- Trên macOS, cập nhật lên 26.1117.31558 khiến người dùng bị đăng xuất khỏi trình duyệt tích hợp, xóa sạch Password Manager và vô hiệu hóa một extension chưa đóng gói (issue #62832, đang mở).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên những thay đổi dưới đây là PR đề xuất, không phải tính năng đã phát hành.

- **Cài đặt extension qua git an toàn hơn (đề xuất).** PR [#30459](https://github.com/google-gemini/gemini-cli/pull/30459) bật các hạng mục cấu hình `unsafe` mà `getSafeGitEnv()` cần. Từ 0.70.0, `gemini extensions install <git-url>` và `extensions update` báo lỗi `Use of "GIT_CONFIG_SYSTEM" is not permitted...`. Điều này ảnh hưởng nếu bạn cài extension từ git URL trên 0.70.0 trở lên.
- **Giá trị env của MCP có dấu `=` được giữ nguyên (đề xuất).** PR [#30331](https://github.com/google-gemini/gemini-cli/pull/30331) sửa lỗi `gemini mcp add -e KEY=value` vốn cắt bỏ mọi thứ sau dấu `=` thứ hai và âm thầm bỏ qua giá trị rỗng. Điều này ảnh hưởng khi bạn truyền token có chứa `=`.
- **Phân nhánh hội thoại (đề xuất).** PR [#30464](https://github.com/google-gemini/gemini-cli/pull/30464) thêm `/fork [name] [--stay]` và tùy chọn "Fork conversation from here" trong `/rewind`.

**Đáng chú ý**

- Có báo cáo về việc agent đa năng bị treo khi CLI chuyển sang nó; các tác vụ đơn giản bị đình trệ tới một giờ theo người báo cáo. 8 bình luận, 8 👍. Issue [#21409](https://github.com/google-gemini/gemini-cli/issues/21409).
- Subagent có thể báo `status: "success"` / `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS mà không làm việc, che giấu việc bị ngắt. Issue [#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 14 bình luận.
- Browser Agent bỏ qua các ghi đè trong `settings.json` như `maxTurns`. Issue [#22267](https://github.com/google-gemini/gemini-cli/issues/22267).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Những gì đã thay đổi**

- **v1.0.116-4**: Quy tắc cho phép PowerShell giờ chấp nhận tham số có chữ số, chẳng hạn `-n1` hoặc `-ExpectedSha256`, thay vì bắt phải phê duyệt toàn bộ script. Điều này quan trọng nếu bạn chạy PowerShell với các cờ nằm trong danh sách cho phép.
- **v1.0.116-1 / v1.0.116-2**: Copilot cảnh báo khi một plugin và một MCP server độc lập cùng trỏ tới một endpoint, và hiển thị cách tắt một trong hai trong `/mcp`. Các prompt đang chờ giờ được hủy mà không cần đợi làm mới hoạt động.
- **v1.0.116-5**: Prompt phê duyệt shell trong các client ACP hiển thị lệnh bạn đang cấp quyền thay vì phần mô tả của nó. Điều này xử lý [#4335](https://github.com/github/copilot-cli/issues/4335), nơi `toolCall.title` che mất lệnh thực thi.

**Đáng chú ý**

- [#5564](https://github.com/github/copilot-cli/issues/5564): với sandbox cục bộ, công cụ `edit` được báo cáo là đọc và sao chép một file nằm trong `deniedPaths` trước khi từ chối chỉnh sửa, để lại nội dung dưới `~/.copilot/session-state/`. Vẫn mở, dữ liệu chưa có bản sửa.
- [#4755](https://github.com/github/copilot-cli/issues/4755): một phiên có thể kẹt vĩnh viễn khi tin nhắn trong hàng đợi rơi vào cuối lượt; input bị từ chối và chỉ có cách kill tiến trình mới gỡ được. Vẫn mở.
- [#5084](https://github.com/github/copilot-cli/issues/5084): prompt `ask_user` hiển thị markdown nguyên văn, nên `**bold**` hiện ra dấu sao. Vẫn mở.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Điều gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên những mục dưới đây là đề xuất sửa lỗi, không phải tính năng đã phát hành.

- **Công cụ patch làm mất dòng `+` trống cuối cùng** (#66314). PR #66315 sửa parser để khối `*** Add File` giữ lại dòng trống ở cuối. Điều này quan trọng khi file sinh ra cần một dòng mới ở cuối.
- **Hoàn tác snapshot viết lại CRLF thành LF trên Windows** (#66311). PR #66312 giữ nguyên byte gốc khi `core.autocrlf=true`. Ảnh hưởng đến file `.bat` và `.cmd` sau khi hoàn tác chỉnh sửa của agent.
- **TUI quên tin nhắn hiện tại sau khi chuyển tab** (#66304). PR #66307 khôi phục vị trí tin nhắn, nên `<leader>home`/`<leader>end` tính từ tin nhắn đó thay vì từ đầu viewport.

**Đáng lưu ý**

- **Thay đổi kích thước Windows Terminal làm crash TUI** (#66301, #66302). `setRawMode` thất bại với errno 32 mỗi lần resize; cả hai issue đã đóng.
- **Khởi động lại daemon để session mắc kẹt ở trạng thái "running"** (#66289, v2.4.1, macOS). `opencode service restart` không xóa được trạng thái này; `--standalone` thì hoạt động.
- **Ctrl+V trên Windows không dán được gì trong TUI** (#65913, v2.4.1, WSL2). Lệnh copy báo thành công nhưng clipboard vẫn giữ nội dung cũ; PR #66310 đề xuất interop cho Windows.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Điều gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên không có gì được ship. Hai bản sửa lỗi đang được phát triển cho các vấn đề người dùng gặp phải. PR #12502 (đã đóng) báo cáo phản hồi lỗi HTTP tới `onResponse` và sự kiện mở rộng `after_provider_response` trên các adapter SDK, những sự kiện trước đây không bao giờ kích hoạt với lỗi 4xx/5xx, khiến các extension báo cáo lỗi im lặng. PR #12494 (đã đóng) tìm Git Bash qua `git` trên PATH trên Windows thay vì chỉ dò `%ProgramFiles%`, điều này quan trọng khi Git được cài ở nơi khác và công cụ bash rơi vào trình khởi chạy WSL trong System32. PR #12505 (đang mở) đề xuất phát lại `reasoning_opaque` của GitHub Copilot trong `openai-completions`; nó chưa được phát hành.

**Đáng chú ý**

Lỗi làm mới token OAuth của MCP được thử lại trên mọi lần gọi công cụ (#12428, đang mở, 2 bình luận); token hết hạn được giữ lại và thử lại. Dành cho: người dùng các máy chủ MCP xác thực bằng OAuth. Không có bản sửa trong dữ liệu. Ở chế độ RPC, hộp thoại extension trong `session_start` không thể trả lời được và Pi thoát khoảng 20 ms sau đó (#12147, đang mở, 2 bình luận). `cacheWarming: "idle"` không bao giờ kích hoạt khi một extension xử lý `turn_end` và ngữ cảnh chứa thông điệp tùy chỉnh hoặc nén (#10956, đang mở, 5 👍).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Những gì đã thay đổi**

- **v1.0.0-preview.2** thêm Qwen4-Max vào danh mục subscription Qwen, với cửa sổ ngữ cảnh 1M token và đầu vào hình ảnh/video. Bản này cũng hiển thị đếm ngược reset khi credit subscription hết, và thêm lệnh `/upgrade` để mở trang gói đăng ký. (Release v1.0.0-preview.2)
- **PR #18301** (đang mở) khiến bảng cài đặt Web Shell hiển thị boolean chưa đặt là "Not set (each surface uses its default)" thay vì OFF. Điều này quan trọng với `experimental.unifiedAgentLoop` và `experimental.eventBusAgentLoop`, vì default trong schema của chúng là `undefined`. (Issue #18298)
- **PR #18317** (đang mở) thêm hướng dẫn khôi phục vào lỗi hiển thị khi provider từ chối request với thông báo "Repetitive tool calls detected in the conversation history", cho người dùng biết cách xử lý tiếp.

**Đáng chú ý**

- `read_file` có thể báo một khoảng dòng không tồn tại ở EOF: file 5 dòng không có newline cuối trả về "Showing lines 6-6 of 5 total lines." (Issue #17668, P3, đang mở).
- Voice dictation từ chối các model Bailian `qwen-audio-*-asr-flash` vì `resolveVoiceTransport` chỉ nhận diện `qwen3-asr-*`. (Issue #18305, đang mở).
- Live Voice hardcode `turn_detection.type = "semantic_vad"`, giá trị mà `qwen-audio-3.0-realtime-plus` từ chối, và không có cài đặt ghi đè. (Issue #17000, đang mở).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*