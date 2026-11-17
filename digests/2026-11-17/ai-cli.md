# Bản tin cộng đồng công cụ AI CLI 2026-11-17

> Tạo lúc: 2026-11-17 07:45 UTC | Công cụ theo dõi: 7

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

## Kỹ năng cộng đồng đang tìm chỗ đứng

**notion-spec-to-implementation — biến spec thành task Notion — đang mở**
Chuyển spec sản phẩm hoặc kỹ thuật thành task Notion cụ thể kèm kế hoạch triển khai, tiêu chí nghiệm thu và theo dõi tiến độ. Dùng khi bản spec viết sẵn cần trở thành việc mà agent có thể bắt tay vào. Được đề xuất cùng một kỹ năng thứ hai, `quantitative-resume-auditor`, trong PR #1245 của anthropics/skills (đang mở).

**md2video-audio — biên dịch Markdown thành video có thuyết minh — đang mở**
Kỹ năng miễn phí chuyển tài liệu Markdown thành video MP4: Marp biến Markdown thành slide, rồi thêm giọng đọc. Dùng khi một tài liệu viết sẵn cần xuất bản dưới dạng video thuyết trình mà không cần công cụ trả phí. Được đề xuất trong PR #1703 của anthropics/skills (đang mở).

**pyxel — phát triển game retro bằng Python — đang mở**
Hướng dẫn tạo, gỡ lỗi và kiểm tra game retro dựng bằng engine Pyxel, bao gồm chạy không giao diện theo input và xem trực tiếp từng frame. Dùng khi xây dựng hoặc kiểm thử một game pixel-art nhỏ. Được đề xuất trong PR #525 của anthropics/skills (đang mở).

## Yêu cầu đang mở

Issue #228 yêu cầu chia sẻ kỹ năng trong toàn tổ chức trên Claude.ai: hiện tại phải gửi file `.skill` cho đồng nghiệp qua Slack hoặc Teams rồi họ tự tải lên trong Settings > Capabilities. Người yêu cầu muốn có thư viện kỹ năng dùng chung hoặc link chia sẻ trực tiếp.

---

**Thay đổi gì**

- **v2.1.326 bật Code Mode với agent team.** Bật Code Mode khi team đang hoạt động giờ sẽ khởi động phiên team ở Code Mode → các workflow team hiện có chuyển mode mà không cần thêm bước → điều này quan trọng nếu bạn đã bật Code Mode. ([releases](https://github.com/anthropics/claude-code/releases))
- **v2.1.326 cảnh báo khi mục tool-list sai định dạng.** Cảnh báo lúc khởi động sẽ hiện khi giá trị `--allowedTools`, `--disallowedTools` hoặc `--tools` không giống một mục hoàn chỉnh → cờ tool cấu hình sai lộ ra ngay khi chạy thay vì lỗi âm thầm → điều này quan trọng khi script hóa lệnh CLI. ([releases](https://github.com/anthropics/claude-code/releases))
- **Đề xuất sửa lỗi MDM trên PowerShell 32-bit.** PR [#78049](https://github.com/anthropics/claude-code/pull/78049) (đã đóng) xử lý việc `Set-ClaudeCodePolicy.ps1` ghi vào Program Files (x86) khi chạy trên host 32-bit → đường dẫn policy đúng trong Intune mà không cần thiết lập host 64-bit → mới là đề xuất, chưa xác nhận đã phát hành.

**Đáng chú ý**

- Issue [#110589](https://github.com/anthropics/claude-code/issues/110589) (1 bình luận) báo rằng từ 2.1.326, dev server `run_in_background` giữ bản ghi con ở trạng thái `working` suốt phiên. Trên Linux, TUI, được đánh dấu là regression. Dữ liệu chưa có bản sửa.
- Issue [#75900](https://github.com/anthropics/claude-code/issues/75900) (9 bình luận) báo rằng văn bản của assistant giữa các lần gọi tool không được hiển thị, không có trong ctrl-o và không được lưu. Trên macOS. Đang mở, dữ liệu chưa có bản sửa.
- Issue [#83756](https://github.com/anthropics/claude-code/issues/83756) (7 bình luận) báo rằng các batch `ToolSearch` lớn của MCP làm mất hiệu lực toàn bộ cache hội thoại. Đang mở, dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Có gì thay đổi**

Các bản phát hành alpha vẫn tiếp tục ra mắt cho cả dòng 0.170 và 0.171: `rust-v0.171.0-alpha.11`, `rust-v0.171.0-alpha.10`, `.9`, `.8`, và `rust-v0.170.0-alpha.4.1`. Thẻ alpha nghĩa là bản dựng mới nhất, nên hãy ghim phiên bản nếu bạn cần sự ổn định.

Hai tính năng TUI được đề xuất trong các PR đã đóng: lịch sử undo/redo cho composer không dùng Vim (`composer.undo`/`composer.redo`, PR #61954) và cài đặt tốc độ cuộn chuột được lưu dưới tên `tui.mouse_scroll_speed` (PR #61976). Cả hai đang trong quá trình phát triển, chưa phát hành.

Một trình chọn môi trường Cloud được đề xuất (`Ctrl+X E`, PR #61974) sẽ cho phép các cuộc hội thoại TUI mới nhắm đến một môi trường cá nhân hoặc workspace đã lưu. Cũng đang trong quá trình phát triển.

**Đáng chú ý**

Windows Computer Use vẫn giữ chỉ báo chụp ảnh và viền màn hình vàng sau khi lượt tạo ảnh chụp kết thúc (issue #57101, 44 bình luận).

Trên Windows, việc nhập ảnh lặp lại với nén zstd trả về HTTP 400 trong khi cùng dữ liệu nhập không nén lại thành công (issue #60594, 11 bình luận). Chưa có bản sửa nào được liệt kê.

Các bản phát hành daemon của app-server được quản lý tích tụ dần: `~/.codex/packages/app-server-daemon/releases` đạt 2,8 GB (issue #52067).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Có gì thay đổi

Không có gì được phát hành trong 24 giờ qua — không có bản phát hành, không có PR nào được merge.

Một số bản sửa lỗi đã được đề xuất và vẫn đang mở. PR #30207 dự định xóa `bundle/` trước khi chạy esbuild, loại bỏ các chunk cũ đã đẩy tarball `@google/gemini-cli` lên 25.2 MB và gây lỗi `413 Request Entity Too Large` vào ban đêm kể từ 2026-11-05 ([PR #30207](https://github.com/google-gemini/gemini-cli/pull/30207)). PR #30268 sẽ cho phép chế độ YOLO đang hoạt động (`--approval-mode=yolo`) bỏ qua shell taint và các prompt xác nhận build-file, vốn hiện đang từ chối thẳng các chỉnh sửa với `POLICY_VIOLATION` ([PR #30268](https://github.com/google-gemini/gemini-cli/pull/30268)). PR #30289 sẽ khiến `gemini extensions link` phân giải và tiết lộ đích thực trên hệ thống tệp thông qua `fs.realpathSync`, đồng thời mặc định prompt đồng ý không tương tác thành không ([PR #30289](https://github.com/google-gemini/gemini-cli/pull/30289)).

## Đáng chú ý

`gemini mcp add` làm hỏng việc lọc công cụ: `--include-tools`/`--exclude-tools` giữ danh sách phân tách bằng dấu phẩy như một phần tử mảng duy nhất, đảo ngược bộ lọc, và `-e KEY=value` cắt giá trị tại dấu `=` thứ hai đồng thời bỏ các giá trị rỗng — cả hai đều thoát với mã 0 ([#30330](https://github.com/google-gemini/gemini-cli/issues/30330), [#30329](https://github.com/google-gemini/gemini-cli/issues/30329)). Không có bản sửa nào trong dữ liệu.

Agent đa dụng bị treo vô thời hạn ở các tác vụ đơn giản như tạo thư mục; hướng dẫn model không giao lại cho subagent sẽ tránh được tình trạng này (8 bình luận, 8 👍) ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)).

Các gián đoạn MAX_TURNS của subagent được báo cáo là `status: "success"` với `Termination Reason: "GOAL"`, che giấu việc bị cắt ngắn (13 bình luận) ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Điều gì đã thay đổi**

Quản trị viên giờ có thể tắt Browser Use tích hợp sẵn thông qua cài đặt được quản lý `features.browserUse`, kể cả trong các phiên đang chạy. Điều này cho phép tổ chức tắt tính năng mà không cần khởi động lại phiên. Có trong v1.0.113-1.

v1.0.113-0 là bản phát hành sửa lỗi và thay đổi; dữ liệu không liệt kê chi tiết cụ thể.

Issue #4998 (đã đóng, 12 bình luận) đề cập đến việc phiên trở nên không dùng được sau khi cập nhật/khởi động lại macOS, nguyên nhân là device ID hệ thống tệp `.mcp-writer.binding` cũ. Việc đóng issue cho thấy bản sửa đã được triển khai.

**Đáng chú ý**

Issue #5220 (đang mở, 11 👍, 3 bình luận): các model Claude dường như dùng TTL prompt cache 5 phút của Anthropic, nên khoảng nghỉ trên 5 phút sẽ gửi lại toàn bộ hội thoại. Dữ liệu không có bản sửa.

Issue #5207 (đang mở, 1 👍): trên Windows, khi bật `--sandbox` và thư mục làm việc nằm trên ổ đĩa không phải ổ hệ thống, các lệnh shell không thể liệt kê, stat hay chuyển vào thư mục trên ổ đĩa đó.

Issue #5478 (đang mở): Cortex XDR kill shell khởi chạy với `parent_process_spoofing` khi Copilot CLI spawn `git` trên Windows. Dữ liệu không có bản sửa.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

OpenCode 1 giờ có thể nâng cấp lên 2.0 từ desktop app, công bố trong v1.19.6. OpenCode 2 tải nền và chỉ cài theo lựa chọn của bạn: Restart to upgrade, Upgrade on quit, hoặc Later. Session, project và cài đặt được giữ nguyên, nhưng plugin của OpenCode 1 cần cập nhật.

`@opencode/pty@0.6.0` phát hành dưới dạng process-daemon v0.6.0 (protocol 9), publish từ `packages/process-daemon`. Đây là lớp đứng sau các báo cáo tiến trình zombie bên dưới.

Hai issue tiến trình zombie PTY trên Linux 2.3.0 đã đóng: #63817 và #63976, cả hai đều được đánh dấu reproduced. Người dùng báo mọi lệnh shell chạy xong đều nằm ở trạng thái `<defunct>` dưới `opencode-pty daemon` kể từ 2.2.7 → 2.3.0.

**Đáng chú ý**

Hết quota gói miễn phí vẫn không hiện ra cho đến khi lỗi. Issue #59387 (386 bình luận, 28 👍) tập hợp các báo cáo gồm thông báo "free usage exceeded" và những lần reset không bao giờ xảy ra. #64334, đã đóng, ghi nhận triệu chứng đầu tiên là một session mới thất bại với HTTP 429 `FreeUsageLimitError`.

Issue #64355 (đang mở): nếu thư mục làm việc của một session bị xóa bên ngoài opencode, mọi lệnh `shell` sau đó đều thất bại với `Working directory does not exist`, kể cả lệnh dùng đường dẫn tuyệt đối.

Issue #64304 (đang mở): bốn model miễn phí trả về HTTP 400 khi tắt đồng ý huấn luyện, dù tài liệu ghi zero retention.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Những gì đã thay đổi**

Bảy bản sửa lỗi từ chồng PR của petrroll đã được hợp nhất vào ngày 2026-11-16, bao gồm vòng đời session, chế độ in JSON và đầu ra TUI. Trong mọi trường hợp, agent giờ đây phát ra các sự kiện và cảnh báo mà trước đó nó đã nuốt mất, nên các extension và script `--mode json` thấy được `session_start`, thông báo model-fallback và chẩn đoán runtime vốn bị bỏ trước đây. Những điều này quan trọng nếu bạn xây dựng hoặc gỡ lỗi extension.

`pi -p` (headless) bị treo khi thoát mỗi khi có extension được tải, kể cả khi không có MCP server nào (#12241, đã đóng vì chưa phân loại). Trên 1.5.2, tình trạng treo rộng hơn trường hợp chỉ có MCP trước đây.

**Đáng để biết**

Các transcript lớn render lại toàn bộ transcript trên mỗi frame và mỗi lần resize, làm bão hòa một core trên máy Windows 2 core (#9549, đang mở, 18 bình luận). PR #11968 chỉ sửa đường cuộn fullscreen; chi phí resize và spinner ở chế độ thường vẫn còn.

Một script ở chế độ code thất bại trước khi chạy nếu nó khai báo biến cấp cao nhất tên là `tools` (#11226, đang mở).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

- Bản phát hành nightly [v0.27.4-nightly.20261116.eb3a599ef3](https://github.com/QwenLM/qwen-code/releases) thêm bộ lọc workspace vào thanh bên của Web Shell ([PR #17244](https://github.com/QwenLM/qwen-code/pull/17244)) và adapter DingTalk cho managed agent. Bộ lọc thanh bên hữu ích khi bạn chạy nhiều workspace và muốn thu hẹp danh sách session.
- Đề xuất trong [PR #17403](https://github.com/QwenLM/qwen-code/pull/17403): một Channel webhook chung chỉ gửi, POST `{"version": 1, "text": "..."}` đến endpoint đã cấu hình, dùng được cho Notify, gửi prompt thủ công và kết quả scheduled-task.
- Đề xuất trong [PR #17513](https://github.com/QwenLM/qwen-code/pull/17513): hỗ trợ `qwen4-max` chính thức trên cả bốn channel, kèm thang effort gốc, cache TTL và image detail.

**Đáng chú ý**

- [Issue #15425](https://github.com/QwenLM/qwen-code/issues/15425) báo cáo rằng tắt Workspace Shell không dừng automation trên các Session vẫn giữ Shell profile; README nói Turn mới phải bị từ chối với `409 workspace_unavailable`. Đang mở, 3 bình luận.
- [Issue #13078](https://github.com/QwenLM/qwen-code/issues/13078) theo dõi một đợt audit CVE dependency hàng ngày thất bại; 54 bình luận. Đang mở.
- [Issue #17099](https://github.com/QwenLM/qwen-code/issues/17099) theo dõi 29 phát hiện của Snyk trên 43 đường dẫn dependency qua `@qwen-code/web-shell@0.26.3` và `@qwen-code/sdk@0.1.25`; 15 bình luận. Đang mở.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*