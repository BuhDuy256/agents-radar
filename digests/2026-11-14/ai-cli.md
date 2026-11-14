# Bản tin cộng đồng công cụ AI CLI 2026-11-14

> Tạo lúc: 2026-11-14 06:07 UTC | Công cụ theo dõi: 7

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

**md2video-audio — biến Markdown thành video MP4 có thuyết minh**
Biên dịch một tài liệu Markdown thành MP4 với giọng đọc chân thực, chuyển sang slide qua Marp rồi thêm âm thanh. Dùng khi cần một bản video có tiếng cho tài liệu viết sẵn mà không tốn chi phí. Đang mở — anthropics/skills PR #1703.

**proofcore-contract-auditor — kiểm tra tĩnh cho hợp đồng thông minh**
Chạy phân tích tĩnh tự động trên hợp đồng Solidity và Rust, đồng thời neo bằng chứng kiểm tra lên TON Blockchain bằng giao thức Merkle không lưu trữ. Dùng khi lập trình viên Web3 cần một bản ghi có thể xác minh cho một lần review hợp đồng. Đang mở — anthropics/skills PR #1771.

**scnet-hpc — điều khiển cụm SCNet HPC**
Vận hành cụm SCNet qua SSH theo profile và các workflow Slurm, bao gồm tạo job, dò cụm và cấu hình kết nối hoặc phân vùng theo từng profile. Dùng khi cần nộp và quản lý job tính toán trên SCNet. Đang mở — anthropics/skills PR #1615.

**Yêu cầu đang mở**
Người dùng không thể chia sẻ skill trong cùng một tổ chức một cách trực tiếp; hiện tại họ phải tải file `.skill`, gửi qua Slack hoặc Teams, rồi từng đồng nghiệp tự tải lên thủ công trong Settings > Capabilities (anthropics/skills Issue #228).

---

**Thay đổi gì**

- v2.1.325 sửa một lỗi bảo mật trong cách giải mã phản hồi nén bằng zstd ([release v2.1.325](https://github.com/anthropics/claude-code)). Ai đang dùng phản hồi nén nên cập nhật.
- v2.1.325 thêm một mẹo spinner một lần trong VS Code và các terminal tích hợp tương tự: chạy lại một cell Jupyter notebook sau khi Claude đã đọc hoặc sửa nó. Chỉ áp dụng sau khi notebook được truy cập.
- v2.1.323 đã xóa cài đặt `subagentStatusLine` mà không có thay thế, theo issue [#109446](https://github.com/anthropics/claude-code/issues/109446). Ngữ cảnh, chi phí, model và effort theo từng agent không còn hiển thị; các file cài đặt chứa khóa này vẫn tải được.

**Đáng chú ý**

- Chạy `claude --agent <name>` bỏ qua trường `effort:` trong frontmatter của agent đối với các phiên main-thread kể từ 2.1.322 ([#109779](https://github.com/anthropics/claude-code/issues/109779)). Dữ liệu không có bản sửa.
- Người dùng desktop Windows và macOS báo cáo rằng tác vụ theo lịch không thể gọi `start_session`, nên các handoff thất bại theo thiết kế ([#109767](https://github.com/anthropics/claude-code/issues/109767)). Dữ liệu không có bản sửa.
- Một báo cáo trên macOS mô tả tình trạng fseventsd chạy loạn trên các máy Mac dùng nhiều agent, chặn Claude Code lúc khởi động ([#98769](https://github.com/anthropics/claude-code/issues/98769), 18 bình luận). Dữ liệu không có bản sửa.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Đã thay đổi**

- **Tab side-chat trong workspace terminal (rust-v0.169.0).** Workspace terminal dạng opt-in giờ hỗ trợ nhiều tab side-chat, chuyển đổi bằng bàn phím hoặc chuột, và các side chat lưu cục bộ sẽ mở lại sau khi khởi động lại Codex (#59784, #60152, #60181). Điều này hữu ích nếu bạn giữ nhiều cuộc trò chuyện song song khi làm việc trong terminal.
- **Tìm kiếm tác vụ cũ trong agent command center (rust-v0.169.0).** Bạn có thể tìm tác vụ cũ theo tên, bản xem trước prompt hoặc working item. Hữu ích khi cần tìm lại tác vụ trước đó mà không phải cuộn qua lịch sử.
- **Model catalog giờ theo phạm vi thread (PR #61421, đã đóng).** Thay đổi đề xuất này giải quyết metadata model thông qua catalog của chính thread thay vì catalog khởi động, tránh sai khả năng của provider sau khi đổi provider mặc định. Chưa phát hành.

**Đáng lưu ý**

- **Windows Computer Use để lại viền chụp và quyền truy cập mở** (#57101, 28 bình luận, đang mở). Viền màn hình vàng/vàng kim vẫn còn sau khi lượt chụp ảnh hoàn tất. Chưa có bản sửa trong dữ liệu.
- **Máy tính để bàn macOS trả về lỗi HTTP 400 định kỳ** (#58569, 6 bình luận, đang mở). Thao tác tool thành công có thể bị tiếp nối bằng lần tiếp tục model thất bại, chặn tác vụ. Chưa có bản sửa trong dữ liệu.
- **Cập nhật Windows Store thất bại trên gói MSIX cũ bị khóa** (#25770, 24 bình luận, đang mở). Báo cáo tương tự xuất hiện trong #51588 và #42520. Chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Những gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên không có gì được ship. Hai pull request đang mở sẽ thay đổi hành vi hằng ngày nếu được merge:

- **[PR #30169](https://github.com/google-gemini/gemini-cli/pull/30169)** (đang mở, đề xuất): văn bản dán sẽ trở thành trơ theo mặc định qua `ui.escapePastedAtSymbols`, và các khớp `@` mờ sẽ ngừng đính kèm khóa riêng SSH. Điều này quan trọng khi bạn dán log shell có chứa `@`.
- **[PR #30175](https://github.com/google-gemini/gemini-cli/pull/30175)** (đang mở, đề xuất): các subagent cục bộ sẽ áp dụng `generateContentConfig` của chúng (temperature, topP, topK, thinkingConfig) cho mọi giá trị model, không chỉ `auto`. Hiện nay các subagent không phải `auto` âm thầm bỏ qua những cài đặt đó.
- **[PR #30170](https://github.com/google-gemini/gemini-cli/pull/30170)** (đang mở, đề xuất): một lệnh gọi model đơn lẻ bị treo sẽ không còn khiến các subagent cục bộ phải chờ hết `maxTimeMinutes` 3 phút cộng thêm lượt phục hồi trước khi hết thời gian.

**Đáng chú ý**

- **[Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)** (đang mở, 8 bình luận, 8 👍): agent tổng quát treo vô thời hạn ở các tác vụ đơn giản như tạo thư mục. Tác giả cho biết yêu cầu model không giao lại cho subagent sẽ tránh được lỗi này. Dữ liệu chưa có bản sửa.
- **[Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)** (đang mở, 13 bình luận): subagent `codebase_investigator` báo `Termination Reason: "GOAL"` và `status: "success"` sau khi chạm MAX_TURNS mà không phân tích gì. Kết quả được duyệt theo trạng thái có thể che giấu việc bị ngắt.
- **[Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)** (đang mở): Gemini CLI trả về lỗi 400 khi có hơn 128 công cụ khả dụng.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Những gì đã thay đổi**

- **v1.0.111 bổ sung hỗ trợ regex cho các quy tắc quyền Shell, Bash và PowerShell do doanh nghiệp quản lý.** Điều này cho phép admin viết quy tắc allow/deny theo mẫu thay vì khớp lệnh chính xác. Nó quan trọng với các nhóm mà chính sách quản lý trước đây phải liệt kê từng lệnh một.
- **v1.0.111 thêm `--host-allow-session-creation`.** Client từ xa có thể tạo phiên trên CLI host cho một lần chạy mà không thay đổi cài đặt đã lưu. Liên quan nếu bạn mở CLI host cho máy khác và không muốn quyền đó tồn tại lâu dài.
- **v1.0.112 sửa lỗi output `/compact` thất bại.** Khi compact thất bại, giờ đây hiển thị thông báo lỗi của nhà cung cấp model mà không có tiền tố host-rethrow nội bộ. Bạn nhận được nguyên nhân thật thay vì bị bọc lại.

**Đáng chú ý**

- **Chi phí context tăng thêm ~20K token mỗi phiên sau CLI 1.0.106**, theo Issue #5450 (desktop app 1.4.0). Tác giả báo cáo dung lượng khả dụng giảm từ ~112K xuống ~93K trên cửa sổ 200K, nên auto-compaction kích hoạt sớm hơn. Dữ liệu chưa có bản sửa.
- **Các phiên tương tác dài vẫn crash vì hết bộ nhớ**, theo Issue #5435 trên 1.0.109. Tác giả báo cáo lỗi tái diễn, và việc khôi phục phiên làm mất background agent trước đó. Dữ liệu chưa có bản sửa.
- **Assisted permissions đang hỏi lại quá nhiều lệnh**, theo Issue #5066 đang mở. Tác giả gọi đây là hồi quy và lưu ý phần nào đó là cảm nhận; một vấn đề quota liên quan (#4802) đã đóng.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Điều gì đã thay đổi**

- **v2.3.0: subagent chạy nền theo mặc định.** Subagent giờ trả về ngay, chạy nền và báo lại khi rảnh, nên bạn có thể tiếp tục làm việc trong session cha trong khi nhiều subagent chạy cùng lúc ([#63382](https://github.com/anomalyco/opencode/pull/6)).
- **Tiến trình zombie trên Linux trong 2.3.0.** Các lệnh shell đã xong không bao giờ được thu hồi dưới `opencode-pty daemon` sau khi nâng cấp từ 2.2.7, dù kết quả và mã thoát vẫn trả về ([#63817](https://github.com/anomalyco/opencode/issues/63817), đã đóng).
- **Đề xuất:** khả dụng model theo thời gian kèm fallback, giới hạn model theo khung giờ ([PR #63728](https://github.com/anomalyco/opencode/pull/63728)).

**Đáng chú ý**

- `--auto` trong V2 TUI chỉ duyệt yêu cầu quyền cho route của session đang chọn; một tab chạy nền có thể vẫn bị chặn cho đến khi bạn chọn nó ([#44007](https://github.com/anomalyco/opencode/issues/44007), đã tái hiện, đang mở).
- Tiếp tục subagent bằng `sessionID` thất bại: công cụ nhận `"ses"` và trả về "Subagent session not found". Tạo subagent mới vẫn hoạt động ([#59293](https://github.com/anomalyco/opencode/issues/59293), đang mở).
- `opencode api model.list --standalone` trả về HTTP 503 "Location plugins did not finish activating"; các lệnh gọi background-service vẫn hoạt động ([#63273](https://github.com/anomalyco/opencode/issues/63273), đã tái hiện, đang mở).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua.

Ba bản sửa đang được đề xuất hoặc chờ duyệt:

- Thử lại các mã lỗi socket thuần của Node. PR [#12136](https://github.com/earendil-works/pi/pull/12136) thêm `ECONNRESET`, `EPIPE` và `ETIMEDOUT` vào mẫu lỗi provider có thể thử lại. Luồng bị ngắt sẽ thử lại lượt thay vì hủy bỏ.
- Giữ cảnh báo non-vision của `read` ngoài ngữ cảnh model. PR [#12139](https://github.com/earendil-works/pi/pull/12139) ngăn ghi chú `[Current model does not support images…]` bị lưu và phát lại sau khi chuyển sang model vision.
- Hiển thị kết quả tool tự render lớn mà không bị crash. PR [#12145](https://github.com/earendil-works/pi/pull/12145) sửa lỗi crash TUI với diff `edit` lớn được báo trong [#8036](https://github.com/earendil-works/pi/issues/8036).

**Đáng chú ý**

- Các tool call trong cùng một message chạy đồng thời với `bash`, nên một lệnh `read` có thể chạy trước khi lệnh kết thúc ([#11950](https://github.com/earendil-works/pi/issues/11950), mở, prio:p0).
- MCP HTTP vẫn tiếp tục nhận luồng phản hồi của tool sau khi hủy hoặc hết thời gian chờ ([#11763](https://github.com/earendil-works/pi/issues/11763), mở, đã có bản sửa).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Thay đổi gì

Không có bản phát hành nào trong 24 giờ qua, nên không có gì ở đây đã được phát hành — đây là các thay đổi đang trong quá trình phát triển.

**Cài đặt folder-trust cũ được tự động di chuyển** ([PR #17123](https://github.com/QwenLM/qwen-code/pull/17123), đang mở). Các giá trị boolean `folderTrustFeature` cũ giờ được chuyển thành cài đặt folder-trust đang hoạt động, và giá trị `folderTrust` cũ được chỉ định rõ sẽ thắng alias của nó. Điều này quan trọng nếu bạn còn giữ file cài đặt cũ: lựa chọn bật/tắt của bạn được giữ lại thay vì bị âm thầm bỏ qua.

**Web Shell có thể commit một tập con các file** ([PR #16681](https://github.com/QwenLM/qwen-code/pull/16681), đang mở). Giao diện commit liệt kê mọi file chưa commit kèm checkbox, chọn sẵn tất cả, và chỉ gửi tập được chọn. Các file không được chọn vẫn nằm trong working tree. Điều này quan trọng khi bạn muốn tách một working tree đang dở thành nhiều commit mà không cần rời khỏi Web Shell.

**Chế độ code hybrid thêm công cụ `exec`** ([PR #11854](https://github.com/QwenLM/qwen-code/pull/11854), đang mở, cũ hơn). Một enum `tools.mode` mới chấp nhận `direct`, `code_mode`, và `code_mode_only`; `code_mode` giữ các công cụ thông thường có thể gọi được trong khi mở ra một `exec` JavaScript tách biệt.

## Đáng chú ý

**Lệnh dừng `/loop` gửi dưới dạng tin nhắn người dùng không hủy được `loop_wakeup` đang chờ** ([Issue #15894](https://github.com/QwenLM/qwen-code/issues/15894), đang mở, 0.26.1). Một vòng lặp tự điều chỉnh nhịp tự tái kích hoạt, nên nó tiếp tục sau lệnh dừng rõ ràng. Báo cáo ngày 2026-10-29, vẫn đang mở, chưa có bản sửa trong dữ liệu.

**Các quy tắc quyền sai định dạng được phân tích thành vô hiệu mà không có cảnh báo** ([Issue #16078](https://github.com/QwenLM/qwen-code/issues/16078), đang mở). Các dạng như `Bash(rm -rf /))` được phân tích với dấu `)` thừa bên trong specifier và khớp khác với ý định. Ảnh hưởng đến bất kỳ ai tự viết quy tắc quyền.

**CLI có thể bị treo ở bước xác minh đăng nhập trên Linux headless** ([Issue #17038](https://github.com/QwenLM/qwen-code/issues/17038), đang mở). Sau khi đăng nhập qua trình duyệt từ máy khác, CLI vẫn kẹt và không bao giờ tiếp tục. Chưa có bản sửa trong dữ liệu; `need-information`.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*