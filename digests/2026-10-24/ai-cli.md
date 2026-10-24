# Bản tin cộng đồng công cụ AI CLI 2026-10-24

> Tạo lúc: 2026-10-24 01:01 UTC | Công cụ theo dõi: 7

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

### md2video-audio — Markdown thành video có thuyết minh
Biên dịch tài liệu Markdown thành video MP4 với giọng thuyết minh tự nhiên, dùng Marp để tạo slide. Đang mở tại anthropics/skills PR #1703; tác giả nói chi phí bằng không.

### notion-spec-to-implementation — đặc tả thành task Notion
Chuyển đặc tả sản phẩm hoặc kỹ thuật thành task Notion kèm kế hoạch triển khai, tiêu chí nghiệm thu và theo dõi tiến độ. Đang mở tại anthropics/skills PR #1245, gộp kèm skill quantitative-resume-auditor.

### proofcore-contract-auditor — phân tích tĩnh hợp đồng thông minh
Tự động phân tích tĩnh hợp đồng Solidity và Rust, rồi neo bằng chứng kiểm toán lên TON Blockchain qua giao thức Merkle của ProofCore. Đang mở tại anthropics/skills PR #1771.

**Yêu cầu đang mở**
Không thể chia sẻ skill trong toàn tổ chức trên Claude.ai: người dùng tải file .skill về, đồng nghiệp phải tự tải lên qua Settings > Capabilities. Đang mở tại anthropics/skills Issue #228, với 8 👍.

---

**Những gì đã thay đổi**

- v2.1.310 bổ sung công cụ Monitor và plugin monitors trên Bedrock, Vertex và Foundry, kể cả khi telemetry hoặc traffic không thiết yếu bị tắt. Giấc ngủ foreground dài giờ đã bị chặn trong những môi trường đó, nên các script kiểu polling cần được viết lại.
- Bản phát hành này cũng sửa lỗi request thất bại sau gateway và các server tương thích từ chối tham số `effort-2025-`. Các setup self-hosted và proxied từng trả lỗi sau khi nâng cấp nên thử lại trên v2.1.310.

**Đáng chú ý**

- Issue #93482 (Windows, Cowork): `device_commit_files` báo thành công khi ghi đè nhưng nội dung trên đĩa chậm một commit, với mtime mới. Ghi cũ âm thầm, nên kiểm tra nội dung file thay vì tin vào thông báo thành công. Đang mở, 22 bình luận, chưa có fix trong dữ liệu.
- Issue #76187 (Windows, Cowork): thư mục project context không bao giờ mount trong session mới và hộp thoại Add-folder không xác nhận được, tái hiện trên hai máy từ bản cập nhật ngày 8 tháng 7. Đang mở, 18 bình luận, chưa có fix.
- Issue #78604 (macOS): plugin LSP cài trước khi thay đổi định dạng manifest `lspServers` tải dưới dạng vỏ rỗng im lặng, và `plugin update` báo chúng đã cập nhật. Cài lại thay vì cập nhật. Đang mở, 5 bình luận.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Điều gì đã thay đổi**

- **Preset lệnh tái sử dụng.** rust-v0.164.0 thêm mười slot `/presets` được đánh số để lưu prompt và slash command tái sử dụng, kèm menu bàn phím để truy cập nhanh (#54380, #54381). Điều này giúp bạn không phải gõ lại những lệnh chạy thường xuyên; nó có ích cho các workflow lặp đi lặp lại.
- **Đối số lệnh inline.** Bản phát hành này cũng cho phép đặt model, reasoning effort, speed và permission profile trực tiếp bằng đối số inline `/model` và `/permissions` (#54378, #54383). Bạn cấu hình một session mà không cần rời khỏi composer.
- **Script cài đặt trả về 404.** `curl -fsSL https://chatgpt.com/codex/install.sh` trả về 404, được báo cáo cho cả người dùng CLI lẫn app (#56616, #56607). Dữ liệu không cho thấy bản sửa; người dùng dựa vào link cài đặt/cập nhật bị ảnh hưởng.

**Đáng chú ý**

- **Lỗi organization-settings trên Windows Desktop.** Codex trong app ChatGPT trên Windows dừng với "Unable to load organization settings" trước khi composer tải xong, nên không có session nào khởi động (#48324, 48 bình luận; cả #56620). Vẫn mở, dữ liệu không có bản sửa.
- **Lỗi gửi prompt trên Safari Codex Web.** Safari 27 trên iPadOS và macOS báo "Can't find variable: DisposableStack" khi gửi prompt (#55271, #55361, cả hai đã CLOSED). Dữ liệu cho thấy có bản sửa.
- **Lỗi lệnh trong sandbox Windows.** Sandbox của Codex App không thực thi được lệnh với HRESULT 0x80070020 (#55230) và code review không tải được (#51218). Cả hai vẫn mở, chỉ trên Windows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi**

Gemini CLI phát hành bản nightly v0.67.0-nightly.20261023.ga713410ab. Bản này sửa báo cáo metadata sử dụng token mở rộng trong A2A server và core ([PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834)), đồng thời đảm bảo các lượt model có gọi hàm nhận được thought signature.

Hai bản sửa đề xuất nhắm vào phiền toái hằng ngày. [PR #29904](https://github.com/google-gemini/gemini-cli/pull/29904) giới hạn việc render lại lịch sử inline sau khi đổi chiều rộng terminal, giảm output lặp do refresh khi resize. [PR #29859](https://github.com/google-gemini/gemini-cli/pull/29859) giữ các tool call đang chạy của subagent hiển thị trong task tree thay vì hiện danh sách rỗng. Cả hai vẫn đang mở, chưa phát hành.

[PR #29899](https://github.com/google-gemini/gemini-cli/pull/29899) đổi timeout hook của Claude Code từ giây sang mili giây trong `gemini hooks migrate --from-claude`, sửa lỗi hook bị kết thúc sớm 1.000× (ví dụ 30ms thay vì 30s). PR này đã đóng.

**Đáng chú ý**

Agent tổng quát có thể treo vô hạn ở các tác vụ đơn giản như tạo thư mục ([issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 bình luận). Yêu cầu model không giao việc cho subagent sẽ tránh được lỗi này; dữ liệu chưa cho thấy bản sửa nào.

Memory và skill của agent không được dùng: Gemini hiếm khi gọi skill tùy chỉnh hoặc subagent nếu không có chỉ dẫn rõ ràng ([issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)).

Gemini CLI trả lỗi 400 khi bật hơn 128 tool ([issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246)); người báo cáo kỳ vọng tool được tự động giới hạn.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Điều gì đã thay đổi**

Assisted Permissions giờ hoạt động mà không cần bật chế độ thử nghiệm (v1.0.104-0). Bạn có thể dùng xử lý quyền có hỗ trợ trong các phiên bình thường thay vì phải bật cờ thử nghiệm trước.

Chọn model tự động không còn thất bại mỗi lượt khi tùy chọn Auto đã lưu biến mất; nó chuyển sang tùy chọn mặc định (v1.0.104-0). Điều này quan trọng nếu bạn đổi tài khoản, model hoặc cấu hình mà lựa chọn Auto đã lưu trước đó không còn được cung cấp.

Phiên bản v1.0.104-1 liệt kê các bản sửa lỗi và thay đổi mà không có thêm chi tiết trong dữ liệu.

**Đáng lưu ý**

Thư mục tin cậy tự động phê duyệt chạy shell trong chế độ thủ công, kể cả với script, sqlcmd và curl, vì cơ chế kiểm soát theo đường dẫn không thấy được lệnh làm gì (Issue #5232, đang mở, 2 bình luận). Không có bản sửa lỗi nào trong dữ liệu.

Autopilot tương tác dừng sau 600 giây trong khi một subagent chạy nền vẫn đang hoạt động, đây là lỗi hồi quy từ 1.0.102 (Issue #5223, đang mở). Thông báo lỗi gợi ý dùng `COPILOT_TASK_WAIT_TIMEOUT_SECONDS` như cách xử lý tạm; không có bản sửa lỗi trong dữ liệu.

Subagent được khởi động cùng lượt với `exit_plan_mode` đã được phê duyệt không nhận được bất kỳ công cụ tích hợp nào, đây là lỗi hồi quy sau 1.0.95 (Issue #5243, đang mở). Không có bản sửa lỗi trong dữ liệu.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

Không có bản phát hành nào ra mắt trong 24 giờ qua. Các thay đổi dưới đây là PR đề xuất, không phải tính năng đã phát hành.

PR #58562 (cùng #58565 cho TUI và #58566 cho app) ghi lại chi phí được báo cáo và hạn mức Go, nên một phiên Go tốn $0 hiển thị hạn mức còn lại thay vì số không trơ. Nó bao phủ mọi giao thức mà gateway của OpenCode hỗ trợ, không chỉ Chat Completions như trong #52629.

PR #58567 cung cấp GPT-Live qua kết nối OpenCode Console mà không cần khóa OpenAI. Đây là bước tiếp nối của #58461, cho phép bộ chọn Server Voice trong ứng dụng iOS liệt kê các server chỉ có trên Console.

PR #58568 vá một lỗi `effect` khiến các stack frame của `Effect.fn` giữ tham số gọi sống mãi. Một ảnh chụp heap của server ở thời điểm uptime 11,7 giờ giữ 117 MB lịch sử tin nhắn theo cách này.

**Đáng biết**

Windows tạo một cửa sổ console hiển thị cho mỗi tiến trình — khoảng một tiến trình mỗi giây, phần lớn là `git.exe` — vì lệnh spawn thiếu `CREATE_NO_WINDOW` (Issue #52266, đang mở, báo lại của #22414 và #31629).

`~/.config/opencode` là symlink sẽ làm hỏng trình theo dõi tệp cấu hình với lỗi `inotify_add_watch ... Not a directory`, nên các chỉnh sửa `opencode.json` không bao giờ hot-reload (Issue #54933, đang mở).

Nhiều người dùng báo "Free usage limit reached" ngay ở yêu cầu model miễn phí đầu tiên, kể cả trên v2.1.3 (Issue #58284, #58285, #58550). #58284 đã đóng; các issue còn lại vẫn mở.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua. Các bản sửa lỗi đã được hợp nhất qua PR:

- **Model Kimi Coding K3.1 Pro** — PR #11355 (đang mở) suy ra preset K3 wire từ metadata effort đã phân tích, nên K3.1 Pro và Highspeed hiển thị low/high/max và gửi `reasoning_effort`. Đang đề xuất, chưa hợp nhất.
- **Lỗi hỏng UTF-8 của `pi.exec()`** — PR #11330 và #11326 (đều đã đóng) cấp cho stdout và stderr các instance `StringDecoder` riêng, sửa lỗi `"你好"` trả về thành `"���好"` khi một ký tự bị tách giữa các chunk (issue #11312).
- **Tốc độ fork trên session lớn** — PR #11288 (đã đóng) ghi session fork qua một file descriptor thay vì một `appendFileSync` cho mỗi entry. Fork một session 3.322 entry trước đây mất hơn 30 giây (issue #11253).

**Đáng chú ý**

- **openai-codex bị treo** — issue #4945 vẫn mở với 87 bình luận và 35 👍. TUI treo ở `Working...` không có output hay lỗi; Escape là cách duy nhất để thoát.
- **Lỗi hỏng tool-call của Anthropic** — issue #10074 (đang mở, 11 bình luận) báo cáo các lệnh gọi `edit` trên văn bản tiếng Hàn âm thầm chấp nhận các escape `\uXXXX` bị mất, làm hỏng file.
- **Proxy Socks làm crash khởi động** — issue #11195 báo cáo `ALL_PROXY=socks5h://...` thất bại với `Invalid URL protocol`; PR #11341 (đã đóng) thêm thông báo lỗi rõ ràng thay vào đó.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Đã thay đổi gì**

v0.26.0-nightly.20261023.5a0be33432 bổ sung khả năng lưu token daemon ([PR #15023](https://github.com/QwenLM/qwen-code/pull/15023)). Token daemon đã lưu giờ có thể tồn tại qua lần khởi động lại, nên bạn kết nối lại với `qwen serve` từ xa mà không cần xác thực lại. Đây là bản nightly, không phải bản phát hành ổn định.

Lệnh `qwen update` có thể có thêm `--target-version <version>` để cài đúng một bản phát hành mà không cần npm dò tìm ([PR #11486](https://github.com/QwenLM/qwen-code/pull/11486), vẫn đang mở). Hữu ích khi muốn ghim bản cài standalone; chưa được hợp nhất.

**Đáng chú ý**

Một phiên TUI chạy lâu trên macOS 26.5.1 với Qwen Code 0.26.0 bị crash do V8 hết bộ nhớ ([issue #15344](https://github.com/QwenLM/qwen-code/issues/15344)). Chưa có bản sửa trong dữ liệu; hiện có 5 bình luận.

Trong VS Code, heap của daemon `qwen serve` tăng không giới hạn cho đến khi chết ở mức trần runtime ~4 GB ([issue #15071](https://github.com/QwenLM/qwen-code/issues/15071)). Ảnh hưởng đến các phiên daemon chạy lâu; chưa có bản sửa nào được liệt kê.

Chạy headless có thể thoát với mã 0 và không có đầu ra khi phản hồi bị cắt do giới hạn đầu ra ([issue #15328](https://github.com/QwenLM/qwen-code/issues/15328)). Được báo cáo trên 0.23.4, nên script có thể âm thầm mất việc.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*