# Bản tin cộng đồng công cụ AI CLI 2026-11-02

> Tạo lúc: 2026-11-02 05:51 UTC | Công cụ theo dõi: 7

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

**mcp-builder — cập nhật lên HTTP client `mcp>=2` (PR #1742, đang mở)**
Script `connections.py` của skill hỏng trên `mcp>=2.0.0` vì `streamablehttp_client` đã đổi tên thành `streamable_http_client`, và custom header giờ phải đi qua `create_mcp_http_client` thay vì truyền thẳng bằng keyword argument. Pull request đang mở, chưa merge, cập nhật script theo tên mới.

**skill-creator — cô lập trigger eval và sửa lỗi trên Windows (PR #1298, đang mở)**
Trigger eval có thể báo miss sai: các lệnh probe của từng worker tranh nhau, `select()` trên pipe của subprocess hỏng trên Windows, và các tool không liên quan làm dừng quá trình quét. Eval còn tính lỗi runtime là không trigger, khiến ví dụ âm pass và làm lệch kết quả tối ưu. Pull request đang mở.

**webapp-testing — bỏ `shell=True` khỏi `with_server.py` (PR #1980, đang mở)**
Lệnh server được spawn bằng `subprocess.Popen(..., shell=True)` để hỗ trợ chuỗi `cd <dir> && <command>`, việc này cho phép chuỗi lệnh từ người dùng hoặc agent chưa được làm sạch đi vào shell hệ thống. Đây là lỗi command injection, CWE-78. Pull request đang mở và chưa merge.

**Các request đang mở**

Chia sẻ skill toàn tổ chức trên Claude.ai (Issue #228, đang mở, 17 bình luận): người dùng hiện phải tải file `.skill`, gửi qua Slack hoặc Teams, rồi đồng nghiệp upload thủ công trong Settings > Capabilities. Request đề nghị có thư viện skill dùng chung hoặc link chia sẻ trực tiếp.

---

**Điều gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên không có thay đổi nào được ghi nhận.

**Đáng chú ý**

- Issue [#104123](https://github.com/anthropics/claude-code/issues/104123) (đang mở, 1 bình luận): `claude remote-control` khi resume trên Windows ghi đè file transcript cục bộ `.jsonl` bằng bản sao từ server, làm mất toàn bộ nội dung trước lần nén (compaction) gần nhất — tác giả báo mất khoảng 150 tin nhắn trong sáu file phiên làm việc. Hãy sao lưu `~/.claude/projects/<project>/` trước khi resume một phiên Remote Control.
- Issue [#94478](https://github.com/anthropics/claude-code/issues/94478) (đang mở, 13 bình luận): ứng dụng desktop trên Windows khởi chạy `git.exe` 15–20 lần mỗi giây, mỗi lần kèm một tiến trình `conhost.exe`, tác giả cho rằng nguyên nhân là rò rỉ kernel pool khoảng 6 GB mỗi ngày. Ảnh hưởng đến người dùng desktop Windows khi làm việc trong phiên dài.
- Issue [#103832](https://github.com/anthropics/claude-code/issues/103832) (đang mở, 7 bình luận): trên desktop macOS, `start_session` vẫn hiện "Allow Claude to start the session?" khi ở chế độ Bypass permissions, buộc phải phê duyệt thêm một lần nữa. Ảnh hưởng đến các agent mở phiên qua `mcp__ccd_session__start_session`.

PR [#106583](https://github.com/anthropics/claude-code/pull/106583) đề xuất chuyển các workflow phân loại (triage) và khử trùng lặp (dedupe) sang Sonnet 5.5; PR chưa được merge.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Đã thay đổi gì

**Hai bản phát hành Rust alpha** — `rust-v0.167.0-alpha.3` và `rust-v0.167.0-alpha.2` đã ra mắt, không có ghi chú nào ngoài chuỗi phiên bản. Đây là bản alpha, nên hãy chuẩn bị tinh thần có xáo trộn trước khi chuyển toolchain sang dùng chúng.

**Tạm dừng các artifact phát hành qua Bazel** — PR #58717 biến các kiểm tra Bazel thành dạng tham khảo và chỉ phát hành artifact Cargo, vì một khóa BuildBuddy đã bị thu hồi. PR #58757 đã xóa các output Bazel khỏi cấu hình DotSlash cho `0.167.0-alpha.2`. Nếu pipeline của bạn dùng các release asset build bằng Bazel, chúng sẽ không còn.

**Các bản sửa lỗi TUI mới chỉ được đề xuất, chưa phát hành** — PR #58767 hoãn việc tiêu thụ bản nháp cho đến khi `/fork` xác thực xong, giữ nguyên bản nháp và các tệp ảnh đính kèm. PR #58720 ưu tiên các luồng cần phê duyệt trong `/subagents`. Cả hai đều đã đóng; hãy kiểm tra phiên bản của bạn trước khi dựa vào bất kỳ bản nào.

## Đáng chú ý

**Computer Use trên Windows hỏng khá nhiều.** Issue #25271 (66 bình luận), #35446 (56 bình luận) và #54532 báo lỗi nhận diện URL của Chrome và tình trạng deadlock trong `FrameArrived`. Dữ liệu không cho thấy bản sửa nào.

**Cháy quota trên GPT-6 Astra.** Issue #42987 và #58816 báo quota 5 giờ của gói Plus cạn trong vài phút với các lượt ngắn. Đây chỉ là báo cáo từ người dùng.

**Quyền truy cập trình duyệt mất giữa phiên.** Issue #54989 và #58809 báo quyền truy cập bị tắt âm thầm dù nút bật vẫn đang bật, khởi động lại ứng dụng thì khôi phục được.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

- Bản nightly `v0.67.0-nightly.20261102.g6814e00d6` đã phát hành ([so sánh](https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261101.g6814e00d6...v0.67.0-nightly.20261102.g6814e00d6)). PR #30091 đề xuất tăng phiên bản. Chỉ có link changelog tự động, nên ở đây không nêu chi tiết tính năng.
- Đề xuất sửa lỗi: PR #29935 ngăn `@file` xóa khoảng trắng đầu và cuối, hiện đang gửi `    print("hello")` cho model thành `print("hello")`. Điều này quan trọng khi bạn đính kèm file nhạy cảm với thụt lề hoặc dòng mới.
- Đề xuất sửa lỗi: PR #29929 sửa giới hạn đầu ra trong danh sách model thành 65.536 token cho Gemini 2.5 Pro và Flash, đồng thời ẩn giá trị 8.192 gây nhầm lẫn cho các model không có giới hạn đã biết.

**Đáng chú ý**

- Issue #21409 báo cáo agent tổng quát bị treo vô thời hạn, ngay cả khi tạo thư mục; tác giả nói rằng yêu cầu model không giao cho subagent thì tránh được lỗi này. Dữ liệu chưa có bản sửa.
- Issue #22323 báo cáo subagent `codebase_investigator` trả về `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS trước khi phân tích bất cứ thứ gì. 13 bình luận; vẫn mở.
- Issue #21968 báo cáo Gemini hiếm khi gọi skill tùy chỉnh hoặc subagent trừ khi được yêu cầu rõ ràng, ngay cả khi mô tả của chúng khớp với tác vụ. 7 bình luận; vẫn mở.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên không có gì được ship. Các mục đang xử lý có thể thay đổi cách dùng nếu được merge:

- #1857 đề xuất hủy các tin nhắn đang chờ trong hàng đợi. Hiện tại, tin nhắn xếp hàng bằng `Ctrl+Q`/`Ctrl+Enter` trong lúc agent bận hoặc đang `/compact` không thể gỡ bỏ.
- #3709 đề xuất đổi model trong một session. BYOK hiện ghim một session vào một model duy nhất qua `COPILOT_MODEL`.
- #4560 (đã đóng) báo cáo rằng `auto` gửi `reasoningEffort: null` và từ chối cấu hình.

**Đáng chú ý**

- #5318: công cụ `rg` tích hợp trả về sai tên file và số dòng khi quá trình compaction coi hậu tố số của tên file hoặc phần thư mục là dấu phân cách grep. ripgrep chạy độc lập trong bash vẫn đúng.
- #5319: mở một Cloud session có sẵn trên CLI 1.0.105 thất bại với lỗi "Cloud relay sessions are unavailable in this CLI configuration."
- #4430: một repository skill và một plugin skill giống hệt nhau được nạp hai lần, làm gấp đôi phần mô tả skill. Được báo cáo trên 1.0.79-9.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Những gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Ba PR đang được phát triển:

- **Gộp kết nối MCP (connection pooling)** — PR #61185 đề xuất tùy chọn `pool: true` để một server chia sẻ kết nối MCP giữa nhiều thư mục. Hiện tại 20 thư mục đang mở nghĩa là 20 kết nối đến cùng một MCP server, kèm theo 20 bản sao của danh sách 3.762 công cụ của Cloudflare. Điều này quan trọng nếu bạn chạy nhiều thư mục với các MCP server nặng.
- **Hành vi thử lại (retry)** — PR #60674 đề xuất thử lại các stream bị lỗi: thử lại y nguyên yêu cầu nếu chưa có output nào, ngược lại thử lại từ prompt với phần trả lời dở dang bị loại bỏ, giữ nguyên các kết quả tool đã hoàn thành. Điều này quan trọng khi stream lỗi giữa lúc đang trả lời.
- **Proxy loopback** — PR #60441 đề xuất giữ các yêu cầu loopback không đi qua proxy của môi trường, sửa #52054 và #51247.

**Đáng chú ý**

- **Báo cáo giới hạn gói miễn phí** — Issue #59387 (196 bình luận) tập hợp các vấn đề của gói miễn phí, bao gồm thông báo "You've used today's free messages. They reset at…" nhưng việc reset không bao giờ xảy ra. Không có bản sửa nào trong dữ liệu.
- **Không chọn được nhà cung cấp bên thứ ba** — Issue #60997 báo cáo các tích hợp kết nối qua `opencode auth login` được lưu nhưng không dùng được sau khi nâng cấp lên 2.2.5. Đã đóng; không thấy bản sửa.
- **Công cụ trình duyệt biến mất sau tự động cập nhật** — Issue #60474 báo cáo một phiên đang chạy mất namespace công cụ `browser` khi ứng dụng desktop cập nhật từ 2.2.0 → 2.2.2; các RPC attach trả về HTTP 499 và không được thử lại. Đã đóng.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Có gì thay đổi**

- Không có bản phát hành nào trong 24 giờ qua. Các thay đổi gần đây nằm trong issue đã đóng và PR đã merge, nên chỉ coi là đã phát hành nếu chúng có mặt trong bản bạn đang chạy.
- PR #11659 thêm `glm-5.3` vào allowlist của Individual Token Plan, khớp với thang effort low/high/max của models.dev cho team, CN và individual. Điều này quan trọng nếu bạn dùng `qwen-token-plan-individual`. (earendil-works/pi PR #11659)
- PR #11656 đồng bộ lại các git SHA được pin khi khởi động, nên sửa commit đã pin trong settings sẽ có hiệu lực mà không cần `pi update --extensions`. Sửa #10758. (earendil-works/pi PR #11656)

**Đáng chú ý**

- Issue #11674: bash tool không có timeout mặc định, nên một lệnh không giới hạn sẽ chặn lượt chạy vô thời hạn. Tác giả gặp lỗi này khi chạy `find /` qua các mount WSL 9p. Dữ liệu chưa có bản sửa. (earendil-works/pi Issue #11674)
- Issue #10885: lỗi tràn context của llama.cpp server ("Context size has been exceeded.") không được phát hiện, nên auto-compaction không bao giờ kích hoạt. Ảnh hưởng đến `openai-completions` khi dùng với `llama-server`. Dữ liệu chưa có bản sửa. (earendil-works/pi Issue #10885)
- Issue #10287: một lỗi mạng có thể thử lại khiến `getContextUsage()` nhảy từ khoảng 42k lên 330.081 token trên Pi 0.99.2. Dữ liệu chưa có bản sửa. (earendil-works/pi Issue #10287)

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

- `fix(permissions): match amend invocations instead of raw text` ([PR #16075](https://github.com/QwenLM/qwen-code/pull/16075), đang mở) sẽ khiến chế độ AUTO ngừng chặn những đoạn văn bản vô hại chỉ nhắc đến cụm từ amend, xử lý [#13570](https://github.com/QwenLM/qwen-code/issues/13570). Đề xuất, chưa phát hành.
- `fix(core): avoid unsupported forced Anthropic tool selection` ([PR #15558](https://github.com/QwenLM/qwen-code/pull/15558), đang mở) chuyển các request sang chế độ chọn tool `auto` trên Claude Opus 5.5, Sonnet 5.5, Fable 5.1 và Mythos 5.1, đồng thời nêu tên tool mong đợi một cách tường minh. Đề xuất.
- Bản nightly `v0.26.5-nightly.20261101.7b4b353750` dùng chung vòng lặp gửi sự kiện phiên của managed-agent ([PR #15952](https://github.com/QwenLM/qwen-code/pull/15952)). Refactor nội bộ.

**Đáng chú ý**

- Sandbox image cho `0.26.5` chưa từng được phát hành vì job build release thất bại trước khi `ghcr.io/qwenlm/qwen-code:0.26.5` tồn tại ([#16039](https://github.com/QwenLM/qwen-code/issues/16039)). Các lane CI dựa trên sandbox cài đúng phiên bản npm tương ứng sẽ crash với lỗi `manifest unknown`. Dữ liệu chưa có bản sửa.
- Một host trong pool CI, `ecs-qwen-hz6-18`, không có Node.js trên PATH, nên check `Lint & Static` bắt buộc sẽ fail với mọi commit rơi vào host đó ([#16005](https://github.com/QwenLM/qwen-code/issues/16005)). Dữ liệu chưa có bản sửa.
- Lệnh stop gửi dưới dạng tin nhắn người dùng không hủy `loop_wakeup` đang chờ, nên `/loop` tự nhịp sẽ chạy lại sau khi đã stop rõ ràng trong 0.26.1 ([#15894](https://github.com/QwenLM/qwen-code/issues/15894), 4 bình luận). Dữ liệu chưa có bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*