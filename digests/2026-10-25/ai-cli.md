# Bản tin cộng đồng công cụ AI CLI 2026-10-25

> Tạo lúc: 2026-10-25 01:18 UTC | Công cụ theo dõi: 7

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

**Tên skill — chức năng**
1-2 câu: nhiệm vụ mà skill xử lý, khi nào nên dùng và trạng thái của nó là open, merged hay draft theo dữ liệu. Giữ nguyên tham chiếu PR đúng như đã cho.

---

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên không có tính năng mới hay sửa lỗi nào được xác nhận. Hai pull request đã đóng liên quan đến thiết lập và công cụ repo, không phải bề mặt CLI:

- PR #62597 *(đã đóng)* sửa 10 lỗi script và workflow, trong đó `comment-on-duplicates.sh` giờ dùng `GITHUB_REPOSITORY` thay vì repo hardcode, nên script chạy được trong fork.
- PR #16132 *(đã đóng)* làm cho `/install-github-app` hoạt động trong dev container; trước đó nó báo lỗi `gh` chưa xác thực dù đã đăng nhập thành công. Chỉ quan trọng nếu bạn thiết lập GitHub app theo cách đó.

**Đáng chú ý**

- Issue #95426 *(đang mở)* báo cáo lệnh `rm -rf "$(cygpath -u 'C:\')"` tự chạy trên Windows, trỏ đến thư mục gốc ổ đĩa và xóa khoảng 600GB. Chưa có bản sửa.
- Issue #93287 *(đang mở, ưu tiên cao, mất dữ liệu)* báo cáo việc xóa nội dung thư mục Applications trên macOS; #93408 báo cáo việc xóa nội dung thư mục home bao gồm cả keychain. Cả hai đều chưa có bản sửa.
- Issue #103335 *(đang mở)* báo cáo gợi ý prompt trong tab Code trên desktop ngừng xuất hiện sau bản cập nhật 2026-10-13. Khởi động lại và tạo phiên mới đều không khôi phục được.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Đã thay đổi gì**

Không có bản phát hành hay pull request nào được cập nhật trong 24 giờ qua, nên không có gì mới được ship. Issue #55034 (CLI, Windows/MSYS2 mintty) đóng ngày 2026-10-25 sau khi Shift+Enter và Ctrl+J ngừng chèn dòng mới trong trình soạn prompt; issue #55024 (CLI 0.163.0) cũng đóng, sửa lỗi nhấn Shift+Left hai lần thay thế prompt đang xếp hàng. Hai bản sửa khác vẫn mở: #54564 báo nút Send bị vô hiệu trong thread Work mới trên Windows.

**Đáng chú ý**

Issue #55781 (rate-limits, CLI) báo "Selected model is at capacity" trong ba ngày, task phức tạp thất bại trong khi chat vẫn hoạt động. Issue #56691 (17 bình luận) báo Codex 26.1021.22027 không khởi động được UI trong VS Code 1.143.1 trên Windows. Issue #53623 báo `helper_unknown_error: setup refresh had errors` trên codex-cli 0.162.1 dưới Windows 11 PowerShell. Cả ba đều là báo cáo người dùng đang mở, chưa có bản sửa nào được xác nhận trong dữ liệu.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Hai thay đổi CLI đang được xem xét:

- **Báo cáo trạng thái terminal (PR #29918, đang mở):** TUI sẽ báo cáo các trạng thái working, blocked, done, error và idle qua OSC 7501, để terminal hỗ trợ có thể hiển thị phiên nào cần nhập liệu. Hữu ích khi chạy nhiều phiên ở các tab khác nhau.
- **Thêm vào system prompt (PR #29919, đang mở):** bổ sung `--append-system-prompt`, `--append-system-prompt-file` và `GEMINI_APPEND_SYSTEM_MD`, cho phép thêm ngữ cảnh dự án mà không thay thế toàn bộ prompt như `GEMINI_SYSTEM_MD`.
- **Báo cáo lỗi Ripgrep (PR #29779, đang mở):** các tìm kiếm `RipGrepTool` thất bại sẽ ghi vào trường error, để scheduler ngừng ghi nhận chúng là thành công.

**Đáng chú ý**

- **Agent generalist bị treo (Issue #21409, 8 bình luận, 8 👍):** tác giả báo cáo agent treo vô thời hạn khi chuyển sang agent generalist, kể cả khi chỉ tạo thư mục đơn giản; yêu cầu nó không dùng subagent thì tránh được. Chưa có bản sửa trong dữ liệu.
- **Phục hồi subagent bị báo cáo sai (Issue #22323, 13 bình luận):** một subagent chạm MAX_TURNS được cho là báo cáo `status: "success"` với lý do kết thúc GOAL, che giấu việc bị ngắt. Đang mở, cần kiểm thử lại.
- **Browser Agent bỏ qua cài đặt (Issue #22267, 4 bình luận):** các ghi đè trong `settings.json` như `maxTurns` được cho là bị bỏ qua dù `AgentRegistry` có đọc chúng. Đang mở.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

- v1.0.104-3 phát hành chỉ với mục "Fixes and changes" trong ghi chú phát hành; dữ liệu không công bố chi tiết tính năng nào. Bản dựng trước đó được nhắc trong các báo cáo là 1.0.103.
- Issue #5147 (CLOSED): `/restart` không còn lỗi khi CLI được khởi chạy với `--new-session-id`. Điều này quan trọng nếu bạn script việc khởi động lại session với ID cố định.
- Issue #3815 (CLOSED): đường dẫn debug-log trên Windows giờ đã có dấu `\` còn thiếu, nên bạn có thể dán thẳng vào Explorer.

**Đáng chú ý**

- Issue #5243 (OPEN, được báo là regression sau 1.0.95): subagent khởi động cùng lượt với `exit_plan_mode` đã được duyệt thì không có công cụ built-in nào — không có `bash`, `view`, `edit`, `grep` hay `web`. Dữ liệu chưa có bản sửa.
- Issue #5246 (OPEN): sửa prompt để nó bắt đầu bằng `!` sẽ khiến bạn mắc kẹt trong Shell mode. Ảnh hưởng đến việc sửa prompt bình thường.
- Issue #5205 (OPEN): session dài bị lỗi context rollover với thông báo "checkpoint.md is absent for this agent".

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên không có gì mới đến tay người dùng.

Đề xuất: hỗ trợ model tự động cho GitHub Copilot (PR #55960) sẽ thêm `github-copilot/auto`, vì gói Copilot Student và Free trả về `model_picker_enabled: false` cho mọi model và Copilot hiện không hiển thị model nào.

Đề xuất: bỏ mảng tools rỗng qua `compatibility.omitEmptyTools` (PR #58790, đóng #58648), dành cho các request có tập tool rỗng trong khi lịch sử chứa các lệnh gọi tool.

**Đáng chú ý**

Giới hạn dùng miễn phí đang báo lỗi tràn lan. Người dùng phản ánh "Free usage exceeded" dù Console ghi nhận 0 lượt dùng (#58536, #58781: năm bình luận, năm 👍) và đồng hồ đếm ngược khởi động lại thay vì đặt lại (#58831, #58836, #58837). Ghi nhận trên CLI v2.1.1 và Desktop 1.19.4. Dữ liệu này chưa cho thấy bản sửa nào.

MCP server từ xa lỗi một lần thì giữ trạng thái `failed` cho đến khi dịch vụ nền khởi động lại (#52237, 11 bình luận, đang mở). Phiên mới và khởi động lại TUI đều không xóa được trạng thái này.

Nén thủ công có thể lưu một tin nhắn thiếu trường `recent` bắt buộc, khiến phiên và các nhánh của nó không đọc được (#58724, đang mở).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Đã thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên chưa có gì được ship. Công việc đang diễn ra nằm ở các pull request.

PR #11371 (đang mở) đề xuất phục vụ 13 model Claude chưa bị deprecate trên Google Vertex AI thông qua Anthropic Messages API. Nó xếp chồng lên PR #11370, vốn đề xuất thêm DeepInfra, Nebius, Ollama Cloud, Scaleway, SiliconFlow và StepFun làm nhà cung cấp hosted.

PR #11372 (đang mở) đề xuất định tuyến 16 model Bedrock qua Bedrock Mantle, endpoint tương thích OpenAI, vì Converse từ chối chúng với lý do định danh model không hợp lệ. Nó xử lý #5363 và áp dụng cho API key của Bedrock.

PR #11363 (đã đóng) đề xuất một thiết lập `fullscreenCopyTarget` để copy-on-select ghi vào primary selection của X11/Wayland thay vì clipboard.

**Đáng chú ý**

Issue #4945 (đang mở, `inprogress`, 88 bình luận, 35 👍) báo cáo `openai-codex` / `gpt-5.5` khiến TUI kẹt ở `Working...` mà không có text stream hay lỗi; chỉ có Escape mới thoát được. Dữ liệu chưa có bản sửa.

Issue #6665 (đang mở, 15 bình luận) báo cáo TUI chiếm trọn một nhân CPU khi stream các phiên dài, nguyên nhân là `Intl.Segmenter` không được cache và việc dựng lại Markdown theo từng chunk. Tái hiện được với `pi -ne`, nên không phải do extension gây ra. Dữ liệu chưa có bản sửa.

Issue #8810 (đang mở) báo cáo các phiên mới thỉnh thoảng bỏ qua `defaultProvider`/`defaultModel` khi nhà cung cấp được đăng ký bởi một extension qua `pi.registerProvider`. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Những thay đổi

- **v0.26.1 đã phát hành, kèm thay đổi gây lỗi (breaking change) cho người dùng bot QQ.** `fix(qqbot)!: restore per-group session isolation under thread scope` ([#13882](https://github.com/QwenLM/qwen-code/pull/13882)) thay đổi cách phân tách phiên (session), sửa lỗi [#14350](https://github.com/QwenLM/qwen-code/issues/14350). Nếu bạn đặt `sessionScope: "chat_thread"` trên một kênh QQ, tin nhắn trực tiếp không còn được coi là một phiên dùng chung nữa. Kiểm tra lại cấu hình trước khi nâng cấp.
- **Đề xuất tăng giới hạn cài đặt skill** ([#15030](https://github.com/QwenLM/qwen-code/pull/15030)). Từ ngày 2026-07-17, trình cài đặt gốc dùng một hạn mức cố định cho cả ba kiểu cài zip, GitHub và thư mục cục bộ (6 MiB nén, 6 MiB sau giải nén, 2 MiB mỗi tệp, 128 tệp). PR này tách giới hạn truyền tải khỏi giới hạn trên đĩa. Chưa phát hành.

## Đáng chú ý

- **Web Shell không tải được trên trình duyệt không dùng tiếng Anh.** [#15445](https://github.com/QwenLM/qwen-code/issues/15445) báo lỗi `TypeError: Cannot read properties of undefined (reading 'desktopRelay.trigger')` từ bản 0.26.0, do tra cứu i18n của `desktopRelay` không có giá trị dự phòng. Ảnh hưởng đến mọi ngôn ngữ giao diện trình duyệt ngoài tiếng Anh và tiếng Trung. Trạng thái: cần kiểm thử lại; dữ liệu chưa có bản sửa.
- **Phiên lớn có thể không mở được.** [#13113](https://github.com/QwenLM/qwen-code/issues/13113) báo cáo `file_history_snapshot` tăng theo bậc hai, vượt giới hạn chỉ mục cố định 256 MiB; mọi lệnh `POST /session/:id/load` sau đó đều thất bại. Dữ liệu chưa có bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*