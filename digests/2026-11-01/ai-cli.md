# Bản tin cộng đồng công cụ AI CLI 2026-11-01

> Tạo lúc: 2026-11-01 05:50 UTC | Công cụ theo dõi: 7

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

### md2video-audio — Markdown thành MP4 có thuyết minh
Biến một tài liệu Markdown thành video slide kèm giọng đọc chân thực, theo tác giả là hoàn toàn miễn phí. Dùng khi cần chuyển một tài liệu viết thành bài trình bày xem được. Đang mở, PR #1703.

### proofcore-contract-auditor — phân tích tĩnh hợp đồng thông minh với bằng chứng trên chuỗi
Chạy phân tích tĩnh tự động trên hợp đồng Solidity và Rust, rồi neo bằng chứng kiểm toán lên TON Blockchain bằng giao thức Merkle của ProofCore. Dùng khi một cuộc kiểm toán Web3 cần bản ghi có thể xác minh và chống sửa đổi. Đang mở, PR #1771.

### webapp-testing được tăng cường — phát hiện phần tử và khởi chạy server
Hai bản sửa đang mở giúp skill webapp-testing chính xác hơn và an toàn hơn: element_discovery.py giờ báo cáo textarea và select theo tên thẻ thay vì mặc định về "text", còn with_server.py bỏ shell=True để đóng một rủi ro chèn lệnh (CWE-78). Đang mở, PR #1976 và PR #1980.

**Yêu cầu đang mở**
Các skill cộng đồng đăng dưới namespace `anthropic/` mạo danh skill chính thức của Anthropic, khiến người dùng cấp quyền cao cho mã mà họ tưởng là của chính hãng — người báo cáo aliksir phát hiện điều này khi so sánh; issue đang mở với 46 bình luận. Issue #492.

---

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên không có gì được ship. Ba PR đã đóng từ tháng 3/2026 được cập nhật ngày 2026-10-31, đều là đề xuất plugin chứ không phải tính năng đã phát hành:
- [#32756](https://github.com/anthropics/claude-code/pull/32756) đề xuất lệnh slash `/pattern-sweep`, đọc `git diff` gần đây để tìm các mẫu lỗi tương tự ở nơi khác trong codebase. PR này xử lý issue #32647.
- [#32755](https://github.com/anthropics/claude-code/pull/32755) đề xuất plugin edit-verifier: một hook PostToolUse kiểm tra xem thao tác Edit có thực sự được áp dụng không, để một lần no-op âm thầm (lệch khoảng trắng, code đã bị sửa trước đó) không khiến agent tiếp tục dựa trên giả định sai.
- [#32751](https://github.com/anthropics/claude-code/pull/32751) sửa các rule hookify dùng `event: stop` hoặc `event: prompt`, vốn không bao giờ kích hoạt vì `config_loader.py` ánh xạ chúng thành `field='content'`.

Cả ba đều đã đóng, nên chỉ nên coi là đề xuất.

**Đáng chú ý**

- Issue [#96422](https://github.com/anthropics/claude-code/issues/96422): các file hướng dẫn dự án và memory không được nạp lại sau khi nén ngữ cảnh. Agent tiếp tục chạy dựa trên bản tóm tắt và âm thầm ngừng tuân theo các rule chỉ nằm trong những file đó. Dữ liệu chưa có bản sửa.
- Issue [#93607](https://github.com/anthropics/claude-code/issues/93607): trên Linux, `pkill -f` / `pgrep -f` trong Bash tool khớp với chính wrapper của tool, gây exit 144 và các PID ma. Bản guard 2.1.214 chỉ bao phủ tiến trình CLI. Đang mở, 6 bình luận, 4 👍.
- Issue [#93071](https://github.com/anthropics/claude-code/issues/93071): trên Windows 10 22H2, Cowork báo `sandbox-helper: no Plan9 drive shares mounted` và `device_bash` đã chết từ 2026-09-08, vẫn không hồi phục sau khi khởi động lại và cập nhật. Đang mở, 10 bình luận.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Có gì thay đổi**

Không có bản phát hành hay pull request nào trong 24 giờ qua, nên không có gì mới được ship. Thay đổi trong ngày chỉ là các issue.

**Đáng chú ý**

Codex CLI 0.166.0 liên tục kẹt mục tiêu với `{"detail":"Bad Request"}`; `/goal resume` và khởi động lại đều không khôi phục được, theo Issue #58639. Ảnh hưởng đến người dùng agent-goal trên ARM64 Linux. Dữ liệu chưa có bản sửa.

Một PR đang mở không phải là tính năng đã phát hành — ở đây không có PR nào như vậy.

Hai vấn đề desktop tái diễn vẫn còn mở: tệp đính kèm PPTX khiến nút Send quay mãi trên macOS sau 26.1027.30824 (Issue #58642, cả Windows #58258), và menu chuột phải ở khung Files trên Windows chỉ còn "Select All" (#58294).

Người đóng góp `jif-oai` đang thiết kế memories trong Codex và đề nghị người dùng đánh giá trích dẫn (1–5) cùng khả năng gợi nhớ theo từng thread so với toàn cục (Discussion #12567, 40 bình luận). Chưa phát hành.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

- Bản nightly v0.67.0-nightly.20261101.g6814e00d6 đã phát hành; changelog đầy đủ tại [liên kết so sánh](https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261031.g6814e00d6...v0.67.0-nightly.20261101.g6814e00d6). Người dùng nightly sẽ nhận được ở lần cập nhật tới; PR bump phiên bản [#30072](https://github.com/google-gemini/gemini-cli/pull/30072) theo dõi việc này.
- PR [#29799](https://github.com/google-gemini/gemini-cli/pull/29799) (đã đóng) giữ lại prompt mới nhất và các vòng gọi tool đã hoàn tất khi yêu cầu dừng vì hạn mức hoặc bị hủy, nên thao tác dọn dẹp khi thoát/đăng xuất không còn xóa lịch sử có thể tiếp tục; một lần nhấn Escape dừng hộp thoại thử lại hạn mức.
- PR [#29800](https://github.com/google-gemini/gemini-cli/pull/29800) (đã đóng) chuyển chế độ Auto qua các bậc model (Pro ↔ Flash) khi thực sự hết hạn mức, thay vì kết thúc phiên.

**Đáng chú ý**

- Issue [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (13 bình luận, đang mở, p1): `codebase_investigator` báo `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS, che giấu việc bị ngắt. Dữ liệu chưa có bản sửa.
- Issue [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (8 bình luận, p1): agent đa dụng treo vô thời hạn; một người dùng chờ tới cả tiếng. Cách xử lý tạm trong báo cáo: yêu cầu model không giao việc cho subagent.
- Issue [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) (5 bình luận): Browser Agent bỏ qua các ghi đè trong `settings.json` như `maxTurns`. Bản sửa đề xuất ở PR [#30067](https://github.com/google-gemini/gemini-cli/pull/30067), chưa được merge.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Đã thay đổi**

- v1.0.106-2 sửa output của `--screen-reader`: các lệnh gọi tool thất bại và bị từ chối, lệnh không xác định, và cảnh báo giờ bắt đầu bằng "Error:" hoặc "Warning:". Điều này quan trọng khi bạn dựa vào trình đọc màn hình để phát hiện lỗi.
- `/resume <session-id>` giờ đưa một background session đang chạy lên foreground thay vì hiển thị nó hai lần. Dùng khi bạn cần quay lại một background session cụ thể.
- v1.0.106-1 sửa `apply_patch` trên các file trộn LF và CRLF: những dòng không đổi giữ nguyên ký tự xuống dòng gốc thay vì cả file bị viết lại. `COPILOT_PROVIDER_GHES_HOST` cũng chấp nhận địa chỉ trình duyệt của instance (ví dụ `https://ghes.example`).

**Đáng chú ý**

- Issue #5312 báo cáo việc rollover context window vẫn thất bại với lỗi "checkpoint.md is absent" trên 1.0.105, sau khi #5205 được đóng là hoàn thành vào 2026-10-30 mà không có fix nào được liên kết. 3 bình luận; dữ liệu không có fix.
- Issue #1857 yêu cầu một cách để hủy các tin nhắn đang trong hàng đợi trước khi chúng chạy. 13 bình luận, 33 👍; còn mở, chưa có fix.
- Issue #2776 báo cáo Shift+Enter gửi prompt thay vì chèn dòng mới. 8 bình luận; còn mở.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào ra mắt trong 24 giờ qua. Ba đề xuất đang mở:

- PR #61017 sửa lỗi crash khi một URL chuyển hướng sau đăng nhập không được nhận diện làm sập `createSessionRetention` ([issue #61001](https://github.com/anomalyco/opencode/issues/61001)). Thay vào đó nó trả về route trang chủ, và tác giả đã thêm test hồi quy. Đáng quan tâm nếu web app của bạn khởi động dựa trên callback của auth-proxy hoặc deep link.
- PR #60936 thêm các route Responses API cho Fireworks và Groq. Cả hai nhà cung cấp trước đây chỉ có Chat Completions, nên 29 model Fireworks và 9 model Groq được liệt kê trên models.dev phải đi qua một entry point chung. Đáng quan tâm nếu bạn dùng các nhà cung cấp này.
- PR #61005 tách vòng lặp tool trong `packages/ai/src/llm.ts` thành các phần nhỏ hơn; PR #61018 xóa các trường `metadata` không được đọc. Chỉ là refactor, không nêu thay đổi nào về hành vi người dùng.

**Đáng chú ý**

- Khiếu nại về quota gói miễn phí vẫn chiếm phần lớn: issue #59387 có 176 bình luận, với #60990 và #60806 báo hết quota chỉ sau vài phút. Issue #59387 là thread báo cáo do maintainer chỉ định; dữ liệu không nêu bản sửa nào.
- Bản nâng cấp 2.2.5 làm hỏng các nhà cung cấp bên thứ ba ([#60997](https://github.com/anomalyco/opencode/issues/60997)): bốn tích hợp hiện trong `opencode auth list` nhưng không chọn được. Một người dùng báo cáo, được gắn nhãn là hồi quy có thể xảy ra.
- Các session tạo trên 1.19.4 không xuất hiện sau khi nâng cấp lên 2.2.x ([#60773](https://github.com/anomalyco/opencode/issues/60773)): 12 session vẫn còn nguyên trong cơ sở dữ liệu cục bộ.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Đã thay đổi

Không có bản phát hành nào trong 24 giờ qua, nên không có gì đến tay người dùng.

**Đề xuất:** PR [#11642](https://github.com/earendil-works/pi/pull/11642) giữ các phản hồi màu từ terminal đến muộn và không có header khỏi prompt. PR này sửa [#10256](https://github.com/earendil-works/pi/issues/10256) và bao gồm các bản trùng lặp #10362, #10742, #10717, và #10970 — những người dùng Windows/ConPTY từng thấy các mảnh màu rò rỉ vào hoặc ký tự BEL mở trình soạn thảo bên ngoài.

**Đã đóng:** PR [#11638](https://github.com/earendil-works/pi/pull/11638) khai báo các tool ở cấp cao nhất cho một `baseUrl` tùy chỉnh của OpenAI. PR này sửa [#11637](https://github.com/earendil-works/pi/issues/11637), nơi một gateway loại bỏ `additional_tools` làm mất toàn bộ 28 tool.

**Đã đóng:** PR [#11648](https://github.com/earendil-works/pi/pull/11648) tiếp tục cập nhật các gói git khi `git clean` thất bại. PR này đóng [#11597](https://github.com/earendil-works/pi/issues/11597), nơi `pi update` dừng lại trên Windows với các thư mục staging của npm.

## Đáng chú ý

**[#11613](https://github.com/earendil-works/pi/issues/11613)** (đang mở): tool bash báo "Command timed out after N seconds" ngay cả khi lệnh đã thoát với mã thoát thực, nếu một tiến trình con vẫn giữ đường ống kế thừa bận. Hai bình luận; chưa có bản sửa trong dữ liệu.

**Rò rỉ màu trên Windows vẫn mở:** [#10256](https://github.com/earendil-works/pi/issues/10256) có 20 bình luận, 4 👍. PR #11642 là bản sửa được đề xuất, chưa phát hành.

**[#11021](https://github.com/earendil-works/pi/issues/11021)** (đang mở, 7 👍): đăng nhập ChatGPT báo cửa sổ ngữ cảnh 272K cho `gpt-6.1-sol` trong khi danh mục tài khoản của Pi 1.3.0 báo 500K. Chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

- v0.26.5 bổ sung truy vấn lịch sử SQL có giới hạn cho Managed local H2 và Hosted MySQL, cho phép phân trang tin nhắn gần đây và giao dịch journal ([release](https://github.com/QwenLM/qwen-code/releases)). Dùng khi cần đọc lịch sử tin nhắn dài theo từng trang.
- Không có thay đổi phá vỡ nào được liệt kê cho v0.26.5.
- Desktop v0.26.5 phát hành cùng đợt trong cùng bản release.

**Điều đáng biết**

- CI chính đang fail ở cổng Managed Agent: hai lần chạy main riêng biệt fail cùng một job, và phép đo bị fail thay đổi giữa các lần chạy ([#15898](https://github.com/QwenLM/qwen-code/issues/15898), 7 bình luận, P1). Nó đỏ với mọi PR kích hoạt tier đầy đủ; dữ liệu chưa cho thấy bản sửa nào.
- Một host trong pool self-hosted `ecs-qwen-hz6-18` không có Node.js trên PATH, nên check Lint & Static bắt buộc fail với mọi commit chạy trên đó ([#16005](https://github.com/QwenLM/qwen-code/issues/16005), 5 bình luận). Ảnh hưởng đến contributor được xếp vào host đó.
- CI chính cũng fail vì tên MCP tool bị trùng lặp làm loại bỏ toàn bộ server và báo lỗi "no tools" gây hiểu nhầm ([#15741](https://github.com/QwenLM/qwen-code/issues/15741), đã đóng). Có vẻ đã có bản sửa vì issue đã đóng.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*