# Bản tin cộng đồng công cụ AI CLI 2026-11-20

> Tạo lúc: 2026-11-20 07:00 UTC | Công cụ theo dõi: 7

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

**Skills đang được xem xét**

**Sửa lỗi mcp-builder — hỗ trợ MCP 2 HTTP client**
Bản vá này đổi tên import `streamable_http_client` đã bị gỡ và chuyển custom header qua `create_mcp_http_client`/`http_client` trong `skills/mcp-builder/scripts/connections.py`. Dùng khi skill builder không kết nối được với `mcp>=2.0.0`; PR #1742 đang mở.

**Sửa lỗi skill-creator — đánh giá trigger tách biệt, xử lý Windows và runtime**
Thay đổi này tách riêng probe lệnh theo từng worker, tránh dùng `select()` trên pipe của subprocess trên Windows, và coi lỗi runtime là lỗi thay vì non-trigger. Nó nhắm vào tỷ lệ bỏ sót trigger sai trong `run_eval.py`; PR #1298 đang mở.

**Sửa lỗi docx — timeout của LibreOffice được báo là lỗi**
`accept_changes.py` giờ trả về lỗi khi `soffice` hết thời gian chờ, và kiểm tra DOCX đầu ra xem còn sót dấu revision `w:ins`/`w:del`/`w:moveFrom`/`w:moveTo` không trước khi báo thành công. PR #1792 đang mở.

**Yêu cầu đang mở**

Các skill cộng đồng đang được publish dưới namespace `anthropic/`, khiến chúng trông có vẻ chính thức với người dùng cấp quyền cao; người báo cáo cho biết phát hiện điều này khi so sánh các nguồn skill (Issue #492, đang mở, 46 bình luận).

---

## Thay đổi gì

**v2.1.329 thêm khả năng hiển thị hook vào managed settings.** Hộp thoại tin cậy giờ nêu tên thư mục khai báo hook của một phiên, và các host không tương tác như Claude Desktop sẽ cảnh báo ngay trong cuộc trò chuyện khi hook trong managed settings không tải được. Bạn biết thư mục nào chịu trách nhiệm trước khi hook chạy.

**Fable 5.2 bị thiếu trong trình chọn /model.** Issue #108955 (đã đóng) báo cáo rằng v2.1.322 trên Windows chỉ hiển thị Fable 5.1, trong khi gõ `/model claude-fable-5-2` vẫn hoạt động. Khoảng trống trong trình chọn thu về 4 bình luận và 6 👍, nên hãy kiểm tra trình chọn thay vì cho rằng model không khả dụng.

**Chế độ print dừng tác vụ Bash chạy nền khi hết lượt.** Issue #111159 (đã đóng) báo cáo rằng `claude -p` dừng một tác vụ khởi chạy với `run_in_background: true` khi lượt kết thúc, dù kết quả công cụ nói rằng model sẽ được thông báo.

## Đáng chú ý

**Desktop Windows bỏ qua `ENABLE_TOOL_SEARCH=true`.** Issue #111283 báo cáo ứng dụng tải toàn bộ schema công cụ MCP ngay khi bắt đầu phiên, trong khi CLI hoãn lại. Dữ liệu chưa có bản sửa.

**Keychain trên macOS 26 hỏi lại mỗi phiên.** Issue #83841 báo cáo hộp thoại "truy cập dữ liệu từ ứng dụng khác" xuất hiện lại mỗi lần khởi chạy Claude Code và không thể xóa.

**Một PR đang mở sẽ chặn mention `@claude` trong fork.** PR #111198 đề xuất không chạy chúng, hiện chỉ là đề xuất.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Những thay đổi**

- **GPT-6.2 Sol và Astra được thêm vào danh mục model, Sol được đặt làm lựa chọn mặc định trong danh mục** (`rust-v0.171.0`, #62106). Trình chọn model dựa trên danh mục giờ liệt kê cả hai, và thread mới mặc định dùng Sol trừ khi bạn ghi đè. Điều này quan trọng nếu bạn script việc chọn model hoặc dựa vào một mặc định ổn định.
- **Workspace TUI bật mặc định cho `rust-v0.171.0`** (#61352, #61888, #61889, #61919). Xem trước tài liệu có thể tìm kiếm, xem trước ảnh và bản ghi subagent giờ xuất hiện cạnh hội thoại chính. Điều này thay đổi bố cục bạn thấy mỗi lần khởi chạy, không chỉ khi bạn tự bật.
- **Tìm kiếm @-mention trong CLI TUI được làm lại** — #62241 (CLOSED) báo cáo rằng gõ trong trình chọn `@` trên CLI 0.170.0 khởi chạy các lượt quét ripgrep chồng lấn trên lịch sử hội thoại đã lưu trước khi submit. Đã đóng; chỉ coi là đã sửa trên phiên bản có chứa thay đổi này.

**Đáng lưu ý**

- #41220 [OPEN] theo dõi tình trạng cạn kiệt quota và credit nhanh bất thường qua nhiều báo cáo (94 bình luận). Không có bản sửa trong dữ liệu. Kiểm tra lại cách tính usage nếu mức tiêu thụ của bạn thay đổi.
- #62650 [OPEN] — Codex App 26.1117.31558 crash khi khởi chạy trên macOS với hình nền động; 26.1111.71704 đã được xác nhận khởi chạy được. Không có bản sửa nào được liệt kê.
- #58507 [OPEN] — trên macOS Desktop 26.1027.30824, thread mới luôn dùng `:workspace` và `default_permissions`/`sandbox_mode` trong `config.toml` bị bỏ qua. Không có bản sửa nào được liệt kê.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

- `v0.71.0-nightly.20261120` thêm lệnh con `/stats heatmap` hiển thị lượng token dùng mỗi ngày ([ghi chú phát hành](https://github.com/google-gemini/gemini-cli/releases)). Dùng lệnh này để theo dõi mức tiêu thụ context theo ngày thay vì đoán.
- Bản nightly này cũng sửa lỗi ký tự `$` bị biến dạng khi thay thế placeholder trong template ([PR #30136](https://github.com/google-gemini/gemini-cli/pull/30136)). Prompt hoặc file chứa `$` giờ hiển thị nguyên vẹn. Cập nhật trước khi dựa vào ký tự đô la trong template.
- `v0.70.0` là bản stable hiện tại, còn `v0.71.0-preview.0` có sẵn để thử sớm ([PR #30380](https://github.com/google-gemini/gemini-cli/pull/30380), [PR #30378](https://github.com/google-gemini/gemini-cli/pull/30378)).

**Đáng chú ý**

- Một subagent báo `status: "success"` kèm `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS, che mất việc bị ngắt giữa chừng ([Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 bình luận). Kiểm tra trực tiếp output của subagent; chưa có bản sửa nào được liên kết.
- Mức tin cậy ở cấp MCP server tự động phê duyệt mọi tool mà server đó cung cấp, kể cả tool thêm sau khi phê duyệt, không có xác nhận lần đầu ([Issue #30369](https://github.com/google-gemini/gemini-cli/issues/30369)). Chỉ áp dụng nếu bạn tin tưởng một MCP server.
- Agent tổng quát có thể treo vô thời hạn sau khi được gọi ([Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 👍). Yêu cầu model không giao việc cho subagent sẽ tránh được lỗi này; dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Những gì đã thay đổi**

- v1.0.115-1 sửa lỗi đăng nhập MCP khi server cấp các scope cần thiết nhưng bỏ qua scope refresh-token được yêu cầu tự động. Trước đây tổ hợp này có thể làm dừng luồng. Điều này quan trọng nếu bạn xác thực các server MCP từ xa.
- v1.0.115-1 khiến việc thực thi workflow trực tiếp chờ các workflow của project extension đăng ký xong. Điều này ngăn workflow khởi động trước khi extension sẵn sàng.
- PR #2957 (đã đóng) đề xuất sửa lỗi lệch đường dẫn bootstrap extension trong `launchExtension()`, khi extension trên macOS và Windows không tải được vì tiến trình con kiểm tra đường dẫn khác với đường dẫn mà `app.js` truyền vào. Đây là đề xuất, chưa phát hành.

**Đáng chú ý**

- Issue #4203 (đang mở, 5 bình luận) báo cáo rằng access token MCP hết hạn buộc người dùng đăng nhập lại thủ công thay vì dùng refresh token đã lưu, khiến server mất các công cụ.
- Issue #5516 (đang mở) báo cáo rằng `store_memory` vẫn cung cấp `scope: "user"` khi memory cấp người dùng không khả dụng, nên mọi lần lưu theo user đều thất bại với lỗi 404; lưu theo repository vẫn hoạt động.
- Issue #5517 (đang mở) báo cáo rằng dán một file PDF làm ước lượng context phình to (ước tính 620k so với 31k token thực tế), gây nén context không cần thiết.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

`session.collapse_all`, một lệnh TUI được đề xuất (PR #65079), thu gọn mọi nhóm transcript trong một session cùng lúc. Hiện tại bạn phải tự tay đóng từng nhóm tool và thought đã mở rộng, và các nhóm đã mở vẫn giữ nguyên sau khi đổi mức verbosity. Lệnh này hữu ích trong các session dài khi bạn muốn toàn bộ transcript gọn lại.

Các session tool của Code Mode được đổi tên trong một thay đổi phá vỡ tương thích (PR #65080): `opencode.session.rename` và `opencode.session.move`. Bất kỳ đoạn code nào gọi đường dẫn Code Mode cũ đều cần cập nhật.

Một bản sửa diff trên website (PR #65075) xử lý các hunk có header `@@` kèm tiền tố màu ANSI, nhờ đó khung review hiển thị nội dung diff thay vì chỉ hiện số dòng thêm và xóa.

**Đáng chú ý**

Vấn đề chính về gói miễn phí (#59387) có 393 bình luận. Các báo cáo bao gồm thông báo "reset never happens" cho tin nhắn miễn phí hàng ngày.

Cài đặt plugin Git bị treo ở bước nhắc nhập thông tin xác thực trên Windows (#65015), khiến `/api/model` và `/api/provider` trả về 503 và không hiển thị model nào.

Một lỗi của `claude-agent` (#62916, đã đóng) làm rơi system message khỏi lịch sử, nên các cập nhật instruction có key không bao giờ đến được Claude.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Đã thay đổi gì

**Công cụ strict giờ được gửi tới các model Copilot Responses.** PR #12329 (đã đóng) thêm `strict` vào 18 model Responses của GitHub Copilot (GPT, Grok, MAI-Code), sửa lỗi #12286 khi thiếu `strict` khiến Copilot điền `""` hoặc `0` vào mọi tham số công cụ tùy chọn. PR tiếp theo #12332 mở rộng cho Claude trên Copilot. Liên quan nếu bạn chạy công cụ Pi qua Copilot.

**`SIGTSTP` từ bên ngoài giờ khôi phục terminal.** PR #12283 (đã đóng) đưa `kill -TSTP <pid>` đi qua cùng đường với Ctrl+Z, sửa lỗi #12272 khi mouse tracking và Kitty keyboard reporting vẫn bật khi về shell. PR #12339 siết chặt quyền sở hữu listener. Liên quan khi bạn tạm dừng Pi từ bên ngoài.

**Đề xuất: system prompt Codex có thể cache.** PR #12319 (đang mở) chuyển system prompt `openai-codex` của Pi ra khỏi `instructions` cấp cao nhất, nơi GPT-6.2 đặt ngoài prefix có thể cache. Chưa phát hành.

## Đáng chú ý

**Cách dùng trên Windows vẫn chưa ngã ngũ.** Issue #7547 (đang mở, 100 bình luận) hỏi nên chạy Pi trên Windows thế nào. Liên quan: #12340 báo Git Bash âm thầm cắt ngắn lệnh bash RPC dài; #12133 báo chuỗi escape terminal rò rỉ sau khi thoát.

**Model doanh nghiệp Copilot vẫn bị ẩn.** Issue #11006 (đang mở) báo các model được admin bật gần đây vẫn không xuất hiện trong picker vì `availableModelIds` chỉ làm mới khi token refresh. PR #12325 đề xuất bản sửa.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

- Chế độ xem commit của Web Shell giờ chỉ commit các file được chọn. PR #16681 biến danh sách file đang sửa thành dạng tick chọn, mặc định chọn tất cả, và giữ nguyên các file không tick trong working tree. Hữu ích khi bạn muốn một commit duy nhất thay vì stage thủ công. Vẫn đang mở.
- OpenTUI mặc định chạy trên vòng lặp agent dùng chung. PR #17745 đưa từng lượt model và từng batch tool về cùng vòng lặp mà các bề mặt khác đang dùng; tắt bằng `"experimental": { "unifiedAgentLoop": false }`. Đã đóng.
- Thiết kế chẩn đoán JSONL tail được đánh dấu đã merge (PR #17913), sau khi bản sửa phía writer được hợp nhất.

**Đáng chú ý**

- Issue #15486 (P1, 7 bình luận): sau khi nén tự động, ước lượng kích thước của request kế tiếp đếm trùng một tool result đang chờ và cộng thêm 20K đệm, khiến lượt đó bị dừng hoặc gửi với `max_tokens: 1`. Cần thảo luận.
- Issue #11680 (87 bình luận, cập nhật 2026-11-19): E2E Tests fail trên `main` trong `sandbox:docker` trước khi có bất kỳ kết quả test nào được báo. Dữ liệu chưa có bản sửa.
- Issue #17854 (P1): ở chế độ AUTO, mức tin cậy MCP cấp server bỏ qua bộ phân loại LLM, nên các tool thêm sau khi phê duyệt sẽ chạy mà không được kiểm duyệt.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*