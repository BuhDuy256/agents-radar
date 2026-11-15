# Bản tin cộng đồng công cụ AI CLI 2026-11-15

> Tạo lúc: 2026-11-15 06:14 UTC | Công cụ theo dõi: 7

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

## Claude Code Skills — 2026-11-15

**proofcore-contract-auditor — phân tích tĩnh cho hợp đồng Solidity và Rust**
Quét hợp đồng thông minh để tìm lỗi và neo bằng chứng kiểm toán mã hóa lên TON Blockchain bằng giao thức Merkle của ProofCore. Dùng khi kiểm toán mã hợp đồng Web3; đang mở (anthropics/skills PR #1771).

**notion-spec-to-implementation — biến spec sản phẩm thành task Notion**
Chia trang spec thành kế hoạch triển khai với task, tiêu chí nghiệm thu và theo dõi tiến độ để Claude Code thực thi. Hữu ích khi một spec viết sẵn cần trở thành các work item được theo dõi; đang mở (anthropics/skills PR #1245).

**md2video-audio — biên dịch Markdown thành MP4 có thuyết minh**
Chuyển Markdown qua Marp thành slide, rồi thêm giọng đọc tự nhiên để tạo video MP4 với chi phí bằng không. Dùng khi một tài liệu cần trở thành video thuyết trình; đang mở (anthropics/skills PR #1703).

### Yêu cầu đang mở

Việc kích hoạt skill trong bộ công cụ đánh giá không ổn định: Issue #556 báo cáo rằng `run_eval.py` cho tỷ lệ kích hoạt 0% trên mọi truy vấn kiểm thử, và Issue #1352 báo cáo rằng khi có nhiều hơn một worker, script khớp chéo UUID của skill và trả về tỷ lệ kích hoạt gần bằng không. Cả hai vẫn đang mở.

---

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Chỉ có các PR đang mở, chưa cái nào được hợp nhất hay phát hành:

- **Trích dẫn đường dẫn hook của plugin** — PR #95698 ([link](https://github.com/anthropics/claude-code/pull/95698)) sẽ chạy các hook `.sh` của `ralph-wiggum` và `output-style` qua `bash` với đường dẫn được trích dẫn, thay vì đường dẫn trần không trích dẫn. Đang đề xuất, chưa phát hành.
- **Sửa thư mục cài đặt hookify** — PR #81672 ([link](https://github.com/anthropics/claude-code/pull/81672)) sẽ giúp gói `hookify` import được bất kể tên thư mục plugin. Đang đề xuất, tham chiếu #69665 và #81448.
- **Agent dedupe chạy nền trước** — PR #106972 ([link](https://github.com/anthropics/claude-code/pull/106972)) đặt `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` để các agent dedupe không bị cắt ngang. Đang đề xuất, chưa chạy trên GitHub.

**Đáng chú ý**

- **Minh bạch auto-memory** — Issue #82056 ([link](https://github.com/anthropics/claude-code/issues/82056), 80 bình luận) yêu cầu có cách ngay trong phiên để biết chỉ mục auto-memory đã tải đầy đủ, bị cắt ngắn hay không tải chút nào. Dữ liệu chưa có bản sửa.
- **Sửa câu trả lời Opus 5.5** — Issue #105112 ([link](https://github.com/anthropics/claude-code/issues/105112)) báo cáo câu trả lời đã sửa của tác giả tăng từ 5,2% lên 25,4% sau ngày 19 tháng 10. Báo cáo người dùng, macOS.
- **Tác vụ theo lịch bị kẹt ở quyền** — Issue #101851 ([link](https://github.com/anthropics/claude-code/issues/101851), bị đánh dấu trùng lặp) báo cáo tác vụ theo lịch trên desktop dừng ở lời nhắc phê duyệt, phá hỏng các lần chạy không giám sát. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Những thay đổi**

- **Các thread đã lưu trữ giờ chỉ đọc trong TUI, kèm hỗ trợ bỏ lưu trữ.** Theo PR #61586 (đã đóng), thread đã lưu trữ đóng băng phần nhập liệu trong khi vẫn giữ bản ghi đã lưu trong bộ nhớ đệm, bản nháp và các steer đang chờ, và phím `U` bỏ lưu trữ rồi tiếp tục thread. Điều này quan trọng nếu bạn mở lại các phiên cũ và định gõ nội dung vào đó.
- **Chuyển phiên Cloud giờ tuân theo Ctrl+C.** Theo PR #61481 (đã đóng), Ctrl+C trong lúc chờ chuyển phiên Cloud sẽ xóa nội dung nháp đã đệm, hoặc tắt và hủy việc chuyển khi không có bản nháp nào. Điều này quan trọng khi một phiên Cloud bị treo lúc điều hướng.
- **Siêu dữ liệu remote của Git giờ bị giới hạn độ dài.** Theo PR #61488 (đã đóng), URL fetch được đọc từ đầu ra phân tách bằng NUL và siêu dữ liệu URL remote bị giới hạn để siêu dữ liệu lượt vẫn nằm dưới giới hạn 8.096 ký tự của Responses API. Điều này quan trọng với các repo có mục remote rất dài hoặc bị lẫn văn bản filter.

**Đáng để biết**

- Codex Desktop trên Windows có thể không tiếp tục được các cuộc trò chuyện do cloud quản lý, báo lỗi `AbsolutePathBuf` trước khi bạn gửi tin nhắn (issue #59855, đang mở, 37 bình luận). Một lỗi tiếp tục phiên cloud trên Windows liên quan xuất hiện trong #60324 (đang mở). Dữ liệu không cho thấy bản sửa nào cho cả hai.
- Desktop macOS báo lỗi HTTP 400 lặp lại sau khi thao tác công cụ thành công, chặn các tác vụ dài (issue #58569, đang mở). Có mô tả việc thử lại nhưng chưa xác nhận bản sửa nào.
- Không có bản phát hành nào trong 24 giờ qua.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua. Các thay đổi dưới đây đang trong quá trình phát triển, chưa được phát hành.

- Một bản sửa đề xuất chuyển tiếp cài đặt `contextManagement` từ CLI đến core ([PR #30068](https://github.com/google-gemini/gemini-cli/pull/30068)). Hiện tại, ngưỡng che giấu đã cấu hình (ví dụ 400.000 token) bị bỏ qua và core giữ mặc định 50.000 token. Điều này quan trọng nếu bạn đặt ngưỡng che giấu đầu ra lớn.
- Một bản sửa đề xuất ngăn `gemini models` bỏ sót `gemini-3.8-flash`, model mà `/model manage` liệt kê trên v0.67.0 ([PR #30194](https://github.com/google-gemini/gemini-cli/pull/30194), sửa [#30193](https://github.com/google-gemini/gemini-cli/issues/30193)). Điều này quan trọng khi chọn model đó từ CLI.
- Một bản sửa đề xuất ngăn "Always allow" trên một lệnh shell bị nhiễm lưu quy tắc cố định cho gốc của lệnh, chẳng hạn mọi lệnh `npm ...` trong tương lai ([PR #30196](https://github.com/google-gemini/gemini-cli/pull/30196)). Giới hạn đó sẽ áp dụng cho các flag không đáng tin cậy hoặc lệnh build sau khi file build thay đổi.

**Đáng chú ý**

- Agent tổng quát có thể treo vô thời hạn với các tác vụ đơn giản như tạo thư mục; người báo cáo cho biết hướng dẫn model không giao lại cho subagent sẽ tránh được tình trạng này (8 bình luận, 8 👍) ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)). Không có bản sửa trong dữ liệu.
- Subagent `codebase_investigator` báo cáo `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS trước khi phân tích, che giấu việc bị ngắt (13 bình luận) ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)).
- Người dùng báo cáo Gemini hiếm khi tự gọi skill tùy chỉnh hoặc subagent trừ khi được yêu cầu rõ ràng (7 bình luận) ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

Không có bản phát hành hay pull request nào trong 24 giờ qua. Cả 50 mục được cập nhật đều là issue đang mở, nên không có gì trong dữ liệu này mô tả một thay đổi đã được phát hành.

**Đáng chú ý**

- Auth token ngừng làm mới trong các tiến trình chạy dài (#4929, 13 bình luận). Mọi prompt đều thất bại với lỗi xác thực và `/login` không khôi phục được tiến trình. Cách xử lý tạm: khởi động lại và tiếp tục cùng phiên.
- Model mặc định của subagent gồm `gpt-6-luna` và `claude-sonnet-5.5`, mà người báo cho biết không có trên gói miễn phí (#5456). Lượt chạy subagent báo lỗi; hãy đặt `explore`, `task` và `research` sang model mà gói của bạn có.
- Checkpoint của agent tạo commit dưới `refs/agents/<session-id>/checkpoints/turn/N` bằng danh tính git của bạn (#5323). Bạn không thể tắt việc này; đã có yêu cầu bổ sung tùy chọn cài đặt.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Có gì thay đổi**
- Không có bản phát hành nào trong 24 giờ qua. Mọi thay đổi dưới đây là pull request đang mở hoặc đã hợp nhất, không phải phiên bản đã phát hành.

**Đáng chú ý**
- Trên Linux, OpenCode 2.3.0 rò rỉ tiến trình shell zombie dưới `opencode-pty daemon`; các lệnh đã hoàn thành trả về bình thường nhưng không bao giờ được thu hồi. Được báo cáo hai lần (#63817, #63976, cả hai cập nhật ngày 2026-11-15). Dữ liệu không có bản sửa.
- Trên Windows 11, các lệnh gọi shell dùng Store PowerShell 7 không spawn được với lỗi `0xC0070005` sau khi nâng cấp 2.2.7 → 2.3.0 (#63892). Không có PR nào được liệt kê.
- Báo cáo hoàn thành của subagent đánh thức agent cha ở mọi lượt nội bộ ẩn trong 2.3.0 (#63894), ảnh hưởng đến các plugin tạo phiên con qua SDK. PR #64026 (đang mở, bởi rekram1-node) đề xuất báo cáo trạng thái subagent từ công việc còn tồn đọng; chưa phát hành.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Điều gì đã thay đổi**
PR #12163 đề xuất cài đặt `toolOutput.maxBytes` và `toolOutput.maxLines` để giới hạn đoạn trích xuất hiển thị cho model đối với bash và read; mặc định vẫn là 51200 byte và 2000 dòng. Điều này cho phép bạn thu gọn output dài của tool trong context.

PR #12110 (inprogress) gửi `reasoning_effort` và đọc reasoning token cho các model GitHub Copilot Gemini và Kimi, những model trước đây hardcode `supportsReasoningEffort: false`. Chưa phát hành.

PR #12178 thêm tùy chọn `description` vào `ctx.ui.select`, luồn qua `ExtensionSelectorComponent` hiện có. Đang đề xuất, đóng với tư cách hỗ trợ extension API.

**Đáng chú ý**
Issue #11950: khi agent gửi bash và read trong cùng một message, cả hai chạy đồng thời, nên read trả về output cũ hoặc thiếu. Đang mở, 7 bình luận.

Issue #9448: `pi auth check` không thấy được các provider do extension đăng ký, báo model thiếu là `invalid_state`. Đang mở, 5 bình luận, 1 👍.

Issue #12165: `searchTools()` trả về toàn bộ description — tác giả đo được ~950KB qua 73 lần gọi, chiếm ~25% context của một session ba ngày. Đã đóng.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

- Nightly v0.27.2-nightly.20261113.6f754be654 đăng ký filesystem phía client vào các phiên agent được quản lý ([PR #16844](https://github.com/QwenLM/qwen-code/pull/16844)). Việc này cho phép phiên được quản lý thấy file phía client mà không cần bridge riêng. Điều này quan trọng nếu bạn chạy agent được quản lý trên workspace host.
- Một bản phát hành v0.27.4 thất bại ngày 2026-11-15, với các job `integration_none` và `integration_docker` đều lỗi ([issue #17308](https://github.com/QwenLM/qwen-code/issues/17308), [issue #17305](https://github.com/QwenLM/qwen-code/issues/17305)). Cả hai đã đóng với trạng thái `ready-for-agent`. Nếu bạn phụ thuộc vào tag v0.27.4 sạch, hãy kiểm tra xem các nhánh integration đó đã chạy lại chưa.
- Chỉ là đề xuất: [PR #17320](https://github.com/QwenLM/qwen-code/pull/17320) thêm công cụ `get_context_remaining` và một luồng compaction tự kích hoạt, để model có thể tự truy vấn ngân sách context của mình thay vì chỉ dựa vào auto-compaction. Chưa phát hành.

**Đáng chú ý**

- Ở chế độ auto approval, một batch subagent có từ hai yêu cầu phê duyệt song song trở lên chỉ hiển thị một hộp thoại; phần còn lại bị bỏ rơi và làm treo batch ([issue #17332](https://github.com/QwenLM/qwen-code/issues/17332), P1, 3 bình luận). Dữ liệu chưa có bản sửa.
- Các công cụ MCP có thể giữ trạng thái `DISCONNECTED` suốt phần còn lại của phiên sau khi một lượt bị hủy giữa lúc gọi công cụ HTTP ([issue #12160](https://github.com/QwenLM/qwen-code/issues/12160), 3 bình luận). Nguyên nhân gốc nằm ở `packages/core/src/tools/mcp-tool.ts`; chưa có bản sửa nào được liệt kê.
- Trên Windows, việc bật/tắt thông tin môi trường trong Web Shell mở ra nhiều cửa sổ `cmd.exe` và các lần poll git chồng chéo ([issue #17266](https://github.com/QwenLM/qwen-code/issues/17266), 3 bình luận). Dữ liệu chưa có bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*