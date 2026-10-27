# Bản tin cộng đồng công cụ AI CLI 2026-10-27

> Tạo lúc: 2026-10-27 03:11 UTC | Công cụ theo dõi: 7

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

## Đề xuất skill

### Notion spec to implementation — biến spec sản phẩm thành task Notion
Lấy các trang spec và chia thành kế hoạch triển khai gồm task, tiêu chí nghiệm thu và theo dõi tiến độ. Dùng khi một spec sản phẩm hoặc kỹ thuật cần chuyển thành công việc cụ thể để agent thực thi. Đang mở, PR #1245.

### proofcore-contract-auditor — phân tích tĩnh cho hợp đồng Solidity và Rust
Chạy phân tích tĩnh tự động trên hợp đồng thông minh và neo bằng chứng audit lên blockchain công khai TON bằng giao thức Merkle zero-storage. Dùng khi lập trình viên Web3 cần một bản review hợp đồng có thể kiểm chứng. Đang mở, PR #1771.

### md2video-audio — biên dịch Markdown thành video MP4 có thuyết minh
Chuyển tài liệu Markdown qua Marp thành slide trình bày, rồi thêm giọng đọc thực tế để tạo đầu ra MP4 với chi phí bằng không. Dùng khi một tài liệu cần trở thành video có thuyết minh. Đang mở, PR #1703.

**Yêu cầu đang mở**

Issue #492 báo cáo rằng các skill do cộng đồng làm ra được phân phối dưới namespace `anthropic/`, tác giả cho rằng điều này khiến người dùng nhầm chúng là skill chính thức của Anthropic và cấp cho chúng quyền cao hơn.

---

## Những gì đã thay đổi

- **v2.1.311** bổ sung `--hold-idle-file` và `--max-hold-min` cho `self-hosted-runner`, giúp một phiên idle vẫn sống trong khi host báo cáo các tiến trình nó để lại đang chạy. Bản phát hành này cũng sửa lỗi đơ lúc khởi động kéo dài và lỗi đơ khi khởi động lại sau khi resume ([release](https://github.com/anthropics/claude-code/releases)).
- Kiểu đầu ra Explanatory giờ hiển thị một gợi ý khi bạn yêu cầu Claude giải thích, dẫn bạn tới kiểu đó ([v2.1.311](https://github.com/anthropics/claude-code/releases)).

## Đáng chú ý

- **#105020** — `claude plugin validate` cắt các dòng footprint ở khoảng 1.000 ký tự, ở cả đầu ra text lẫn `--json`. Báo cáo ngày 2026-10-25, dữ liệu chưa có bản sửa.
- **#96628** — sau khi một tool call không parse được, thông báo thử lại có thể trỏ `parentUuid` vào một dòng không bao giờ được ghi, khiến `--resume` mất mọi thứ trước đó. Gắn thẻ `data-loss`, có repro, macOS. Dữ liệu chưa có bản sửa.
- **#104497** — `bfs 4.1.1` đi kèm trong Bash tool, khi gặp junction ntfs3 thì lặp vô hạn và tăng bộ nhớ không giới hạn; tác giả báo cáo OOM toàn cục. GNU find thì dừng được. Linux, dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Đã thay đổi

Ba bản phát hành alpha đã ra mắt: `rust-v0.166.0-alpha.1`, `rust-v0.165.0-alpha.3` và `rust-v0.165.0-alpha.1.1`. Ghi chú phát hành chỉ chứa chuỗi phiên bản, nên không mô tả thay đổi nào dành cho người dùng.

Một PR đã đóng đề xuất thêm GPT-6.1 Terra vào danh mục đi kèm, GCP Vertex và Amazon Bedrock (openai/codex PR #57293). PR đã được hợp nhất vào `main`, chưa có trong bản phát hành nào được gắn thẻ.

Một PR đã đóng đề xuất phân loại các subagent thất bại là không cần người dùng chú ý, nhờ đó một thất bại không còn đẩy tác vụ cha vào trạng thái "Needs you" (openai/codex PR #57315).

## Đáng chú ý

Issue #56691: Codex 26.1021.22027 không khởi động được giao diện trong VS Code 1.143.1 trên Windows, do một người dùng ChatGPT Plus báo cáo; 34 bình luận. Dữ liệu không cho thấy bản sửa nào.

Issue #56655 mô tả cùng lỗi khởi động giao diện với tiện ích VS Code 26.51021.22027 trên Windows, với 24 bình luận. Dữ liệu không cho thấy bản sửa nào.

Issue #28058 báo cáo rằng các tin nhắn MultiAgentV2 được mã hóa đã xóa mất dấu vết kiểm tra tác vụ có thể đọc được, được báo cáo lần đầu sau #26210; 42 bình luận. Issue vẫn đang mở.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Có gì thay đổi**
- v0.67.0-nightly.20261027.g363a13119 sửa lỗi giới hạn chi tiêu của project (PR #29961, @jesussamuel-byte): phản hồi HTTP 429/400 với mảng `details` rỗng giờ được xếp vào lỗi quota không thể phục hồi. Khi project AI Studio của bạn chạm mức trần hàng tháng, CLI coi đó là dừng do quota thay vì lỗi không xác định.
- Cùng bản nightly này bổ sung metadata của MCP server và tool vào các yêu cầu cấp quyền ACP (PR #29910, @duvanka-prasad): hộp thoại xin quyền giờ hiển thị tên MCP server và tool cụ thể trong nhãn lựa chọn.
- Đề xuất trong PR #29973 (frabcd): kiểm tra lại việc hủy ngay trước khi `replace` hoặc `write_file` ghi. Hiện tại, hủy giữa lúc đọc file vẫn có thể ghi đè file đích hoặc tạo file mới; chưa phát hành.

**Đáng chú ý**
- Issue #22323 (13 bình luận): subagent `codebase_investigator` báo `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS mà chưa phân tích gì. Nó che mất việc bị ngắt. Chưa có bản sửa trong dữ liệu.
- Issue #21409 (8 bình luận, 👍 8): agent generalist treo vô thời hạn mỗi khi CLI chuyển sang nó — kể cả khi tạo thư mục. Hướng dẫn model không chuyển sang nó thì tránh được; chưa có bản sửa trong dữ liệu.
- Issue #21968 (7 bình luận): tác giả báo Gemini hiếm khi dùng skill tùy chỉnh hoặc subagent trừ khi được yêu cầu rõ ràng. Đây là báo cáo của người dùng, không phải lỗi đã được xác nhận.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

- Ở v1.0.104, model được quản lý "fusion" bắt đầu phiên ở chế độ Auto và áp dụng cài đặt `fusionTier`. Nếu bạn dựa vào model được ghim cố định khi bắt đầu phiên, hãy kiểm tra lượt đầu tiên.
- Các phiên Autopilot tương tác và qua SDK giờ tiếp tục chờ các tác vụ nền đính kèm thay vì dừng sau `COPILOT_TASK_WAIT_TIMEOUT_SECONDS`. `-p --autopilot` vẫn tuân theo thời gian chờ đó, nên các lần chạy không giao diện hoạt động như trước.
- v1.0.104-4 được phát hành với tiêu đề "Fixes and changes," không có thêm chi tiết trong ghi chú phát hành.

**Đáng chú ý**

- Issue [#5253](https://github.com/github/copilot-cli/issues/5253) báo cáo các phiên chạy dài trở nên không phản hồi trên 1.0.103, với lỗi lặp lại `session lock unavailable during is_session_generation_current`. Dữ liệu không cho thấy bản sửa nào.
- Issue [#4560](https://github.com/github/copilot-cli/issues/4560) cho rằng model `auto` luôn chạy với `reasoningEffort: null` và từ chối các lần thử cấu hình.
- Issue [#4024](https://github.com/github/copilot-cli/issues/4024) báo cáo `/voice` phiên âm trả về rỗng với cả ba model ASR đi kèm; 14 bình luận, vẫn đang mở.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Những gì đã thay đổi**

- Plugin GUI giờ có thể dùng toast, dialog, thông báo hệ điều hành, shell tab và đọc/ghi composer. Đề xuất trong PR #59469 và #59462, cả hai đều đã đóng; chỉ là bản nháp, chưa phát hành. Đáng chú ý nếu bạn chuyển các tính năng plugin từ TUI sang Desktop.
- `@opencode/ai` có hỗ trợ tool bất đồng bộ và `generateObject`, nên bạn không cần Effect và `Effect.tryPromise` để định nghĩa một tool nữa (PR #59445, đã đóng).
- Lỗi mã hóa phản hồi giờ trả về lỗi server thay vì 400 `InvalidRequestError` gây hiểu nhầm (PR #59459). Ảnh hưởng đến các API như `/api/experimental/generate/image`.

**Đáng để biết**

- Các vấn đề gói miễn phí được gom vào issue mở #59387 (15 bình luận): lỗi "free usage exceeded", và việc reset không bao giờ xảy ra. Chưa có bản sửa trong dữ liệu.
- Plan mode có thể sửa file trước khi bị chặn; issue #57066 đã đóng với trạng thái tái hiện được.
- v2 (`opencode2`) gửi `max_tokens` mà không tôn trọng `limit.output`, khiến các lượt suy nghĩ bị cắt ngắn (#47398, đã đóng).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Đã thay đổi**

Đã sửa xếp hạng tìm kiếm công cụ để ưu tiên tên công cụ khớp chính xác (PR #11440, #11437; issue #11331, đã đóng với trạng thái fix-available). `tool_search` và codemode `searchTools()` giờ ưu tiên công cụ có tên khớp với truy vấn, thay vì để chuẩn hóa độ dài BM25 xếp mô tả ngắn hơn không liên quan lên cao hơn. Điều này quan trọng khi agent của bạn yêu cầu một công cụ cụ thể như `thread_read` và trước đây nhận nhầm công cụ khác.

Đã sửa giải mã phím chức năng Kitty trong TUI (PR #11422, đang phát triển; sửa #11345). Bản sửa đề xuất giải mã chuỗi F1–F12 kèm sự kiện modifier, repeat và release, đồng thời ngăn các codepoint private-use bị chèn như văn bản in được. Ảnh hưởng đến bạn nếu bạn dùng Kitty hoặc terminal hỗ trợ giao thức Kitty.

Hộp thoại `ctx.ui.custom()` có thể chọn báo trạng thái blocked qua tùy chọn `blocked` (issue #11428, đã đóng). Trước đây chỉ `select()` và `confirm()` báo trạng thái blocked qua OSC 7501; hộp thoại tùy chỉnh thì không.

**Đáng chú ý**

Pi không nhận thông tin xác thực AWS mới trong các phiên chạy dài (issue #11221, đang mở, 4 bình luận). Phiên Bedrock thất bại với `ExpiredTokenException` sau khi token được làm mới; dữ liệu chưa có bản sửa.

Phản hồi JSON qua HTTP của MCP bỏ qua `maxMessageBytes` (issue #11335, đang mở). Với giới hạn 512 byte, mô tả công cụ dài 2.048 byte trong JSON vẫn được chấp nhận, trong khi cùng nội dung đó qua SSE thì bị từ chối.

`pi update --models` bị từ chối với lỗi `Unknown option` dù đã có trong tài liệu (issue #11453, đóng cùng ngày).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

- **Quy tắc quyền theo phiên và chế độ Auto approval (v0.26.2-preview.0, v0.26.1-nightly.20261026.34769f9d41).** Phiên được quản lý giờ có thể mang theo quy tắc quyền cùng chế độ Auto approval ([PR #15448](https://github.com/QwenLM/qwen-code/pull/15448)). Điều này quan trọng khi bạn chạy agent được quản lý và muốn việc phê duyệt diễn ra tự động.
- **Phát hành TypeScript SDK v0.1.23**, đóng gói kèm CLI 0.26.1. Cập nhật SDK để khớp với phiên bản CLI đó.
- **Đề xuất, chưa phát hành:** [#15422](https://github.com/QwenLM/qwen-code/pull/15422) bổ sung chế độ Workflow lâu dài theo từng phiên, đặt được qua `--workflow-mode on`, `/workflows mode on`, SDK, hoặc ACP/daemon. Vẫn đang mở.

**Đáng chú ý**

- Chế độ headless `-p` từ chối các ghi auto-memory được quản lý, nên memory không bao giờ lưu dưới mặc định hoặc Auto approval ([#15597](https://github.com/QwenLM/qwen-code/issues/15597), P1). Dữ liệu không có bản sửa.
- Headless `-p` cũng từ chối các lệnh shell chỉ đọc có chứa `2>&1`, coi đó là ghi vào tệp tên `&1` ([#15600](https://github.com/QwenLM/qwen-code/issues/15600)). Không có bản sửa nào được liệt kê.
- Homebrew 0.26.1 trên Apple Silicon không ghi lại được install name của `libopentui.dylib`; `qwen --version` vẫn chạy ([#15690](https://github.com/QwenLM/qwen-code/issues/15690)).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*