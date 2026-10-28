# Bản tin cộng đồng công cụ AI CLI 2026-10-28

> Tạo lúc: 2026-10-28 05:27 UTC | Công cụ theo dõi: 7

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

## Sửa lỗi skill đang chờ duyệt

### mcp-builder — hỗ trợ client HTTP streamable của mcp>=2 — đang mở
Cập nhật `skills/mcp-builder/scripts/connections.py` cho `mcp>=2.0.0`, trong đó `streamablehttp_client` được đổi tên thành `streamable_http_client` và header HTTP tùy chỉnh giờ truyền qua `create_mcp_http_client` / `http_client` thay vì kwarg trực tiếp — theo anthropics/skills PR #1742.

### skill-creator — cô lập đánh giá trigger và xử lý lỗi trên Windows — đang mở
Ngăn đánh giá trigger báo nhầm miss hoặc điểm không hợp lệ: các lệnh thăm dò của từng worker tranh nhau, `select()` trên pipe subprocess lỗi trên Windows, và các tool không liên quan làm hủy quá trình quét — theo anthropics/skills PR #1298.

### webapp-testing — bỏ shell=True trong with_server.py — đang mở
Thay `subprocess.Popen(..., shell=True)` trong `skills/webapp-testing/scripts/with_server.py`, loại bỏ rủi ro command injection (CWE-78) do truyền chuỗi lệnh chưa được làm sạch từ agent vào shell hệ thống — theo anthropics/skills PR #1980.

## Yêu cầu đang mở

Issue #228 đề nghị chia sẻ skill trong toàn tổ chức trên Claude.ai, vì hiện tại muốn chia sẻ phải tải file `.skill` xuống và đồng nghiệp tải lên thủ công trong Settings > Capabilities.

---

## Những thay đổi

**v2.1.312 bổ sung `oidc.user_id_claim` vào cổng Claude apps.** Việc này cho phép quản trị viên nhận diện người dùng bằng một claim trong `id_token` khác với `sub`, ví dụ `oid` của Microsoft Entra ID. Điều này quan trọng với các nhóm xác thực qua Entra ID và cần ID người dùng ổn định.

**v2.1.312 bổ sung tính năng nhấp để gửi cho tin nhắn trong hàng đợi.** Ở chế độ toàn màn hình, nhấp vào gợi ý "to send now" bên dưới tin nhắn trong hàng đợi sẽ gửi ngay lập tức, khớp với phím tắt. Không cần chờ lượt kết thúc nữa.

**PR #15620 đề xuất sửa lỗi phân tích YAML trong các ví dụ plugin-dev.** Mảng JSON trong `tools:` và `allowed-tools:` bị phân tích thành chuỗi ký tự; PR chuyển chúng sang YAML phân tách bằng dấu phẩy trên 11 file. Chưa được hợp nhất.

## Đáng chú ý

**Issue #97074 báo cáo `claude -p` chạy không giao diện dùng ~1,8× cửa sổ 5 giờ mỗi token so với `cli` tương tác.** Cùng khối lượng công việc, entrypoint `sdk-cli`. 54 bình luận, dữ liệu không có bản sửa.

**Issue #105579 báo cáo rằng trên Windows Desktop, tin nhắn trong hàng đợi không bao giờ được gửi sau khi lượt của Claude kết thúc.** Nó giữ ở trạng thái "1 message queued" vô thời hạn. Liên quan: #105577 (tin nhắn giữa lượt bị xếp hàng đợi đến khi lượt kết thúc). Không có bản sửa nào được liệt kê.

**Issue #105551 báo cáo các lệnh gọi công cụ Bash bị treo 10–17+ phút trước khi shell khởi động trên Windows,** sau bản cập nhật Desktop lên 4.29.0 (Claude Code 2.1.309). Đây là lỗi hồi quy, dữ liệu không có bản sửa.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Những gì đã thay đổi**

- `rust-v0.165.0` bổ sung nhà cung cấp Google Cloud Vertex AI tích hợp sẵn, đặt bằng `model_provider = "gcp"`, cùng GPT-6.1 Terra trong danh mục model (#56265, #57337). Bạn có thể trỏ Codex vào Vertex AI mà không cần lớp shim nhà cung cấp tùy chỉnh. Điều này hữu ích khi dự án của bạn đã chạy trên GCP.
- Trình chọn phiên làm việc có thêm bộ lọc repository và trung tâm lệnh agent có thêm nhóm theo thư mục, giúp bạn tìm một phiên mà không phải cuộn hết danh sách (#56265, #57337).
- PR #57606 và #57638 đề xuất `codex doctor --network-only` và các loại yêu cầu OpenTelemetry trong giao thức app-server; cả hai đang phát triển, chưa phát hành.

**Đáng chú ý**

- Issue #13733 (45 bình luận) báo cáo rằng việc polling `write_stdin` đốt token: mỗi lần kiểm tra trạng thái tiến trình nền đều gửi một lượt API đầy đủ kèm toàn bộ lịch sử. Ảnh hưởng đến bất kỳ ai chạy các tác vụ kiểu `cargo build`. Dữ liệu chưa có bản sửa.
- Issue #15723 (29 bình luận) báo cáo rằng subagent nền không đánh thức agent gọi khi hoàn thành, nên công việc đình trệ cho đến khi bạn kiểm tra. Một số issue đang mở (#32188, #29922, #33542) yêu cầu đánh thức theo sự kiện.
- Issue #49980 (27 bình luận) báo cáo rằng công cụ của agent thất bại với lỗi tạo tiến trình và lỗi URI workspace đối với workspace WSL trên Windows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Đã thay đổi gì

- **v0.67.0-nightly.20261028.gfa5c17365** sửa cách phân giải ripgrep trên Android/Termux bằng cách cho phép các đường dẫn hệ thống đáng tin cậy ([PR #29884](https://github.com/google-gemini/gemini-cli/pull/29884)). Bản này cũng chuẩn hóa ký tự xuống dòng CRLF trước khi so sánh diff trong `getDiffContextSnippet`. Đáng quan tâm nếu bạn chạy Gemini CLI trên Termux hoặc làm việc với file CRLF.
- **v0.67.0-preview.0** và **v0.66.0** đã phát hành. v0.66.0 cập nhật ROADMAP.md để xóa lộ trình 2025 đã lỗi thời. Dữ liệu không ghi nhận thay đổi hành vi nào với người dùng.
- **PR #29980** (đang mở) đề xuất `gemini extensions validate <path>` để kiểm tra `gemini-extension.json` trước khi cài hoặc phát hành. Mới là đề xuất, chưa phát hành.

## Đáng chú ý

- Subagent khôi phục sau MAX_TURNS được báo là thành công GOAL, che mất gián đoạn ([Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 bình luận, 👍2). Subagent `codebase_investigator` báo thành công dù đã chạm giới hạn lượt. Dữ liệu chưa có bản sửa.
- Agent tổng quát treo vô thời hạn với các tác vụ đơn giản như tạo thư mục ([Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 bình luận, 👍8). Theo báo cáo, yêu cầu model không chuyển cho subagent sẽ khắc phục được. Dữ liệu chưa có bản sửa.
- Browser Agent bỏ qua các ghi đè trong `settings.json` như `maxTurns` ([Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)). `AgentRegistry` đọc được cài đặt, nhưng agent không áp dụng. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Có gì thay đổi**

- v1.0.105 (2026-10-27): Chọn Copilot Fusion High hoặc Max trong `/model` giờ hoạt động từ các phiên long-context. Trước đây lựa chọn này thất bại khi phiên vượt quá context window; giờ nó áp dụng mà không cần khởi động lại phiên.
- v1.0.105-0 (2026-10-27): Bản sửa tương tự được phát hành riêng dưới dạng bản pre-release. Dùng nó nếu bạn theo dõi các phiên bản pre-release.

**Đáng chú ý**

- Các phiên Windows/WSL2 có thể crash và đóng băng TUI ở mức ~215% CPU khi nhàn rỗi (#3700, mở từ 1.0.60, 5 bình luận). Chưa có bản sửa; khởi động lại là cách duy nhất.
- Voice input trên WSL2 bị segfault sau 1.0.100, khiến `/voice` kẹt ở "Fetching voice models" (#5197, 5 bình luận). Một voice runtime mới được phát hành cùng 1.0.100; không có bản sửa trong dữ liệu.
- Chọn model vẫn không được lưu: `/model gpt-5-mini` quay về `claude-sonnet-4.6` sau khi khởi động lại (#1869, 7 bình luận). Phải chọn lại model mỗi phiên.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

- v2.2.0 phát hành plugin Desktop (thử nghiệm): tạo, cài đặt và chia sẻ tiện ích GUI ([#55246](https://github.com/anomalyco/opencode/pull/55246), [#59469](https://github.com/anomalyco/opencode/pull/59469), [#59489](https://github.com/anomalyco/opencode/pull/59489)). Đáng chú ý nếu bạn mở rộng ứng dụng desktop thay vì TUI.
- Đề xuất: `experimental.subagent_concurrency` giới hạn số subagent chạy đồng thời, không đặt thì giữ nguyên không giới hạn như hiện tại ([#55983](https://github.com/anomalyco/opencode/pull/55983)). Đang phát triển, chưa phát hành.
- Đề xuất: prompt theo lịch cho phép session tự đánh thức theo thời gian hoặc cron ([#59401](https://github.com/anomalyco/opencode/pull/59401), [#59457](https://github.com/anomalyco/opencode/pull/59457)). Mặc định tắt trừ khi bật `experimental.schedules`.

**Đáng lưu ý**

- Yêu cầu cấp quyền MCP phát sinh trong Code Mode (`execute`) không bao giờ hiển thị trong TUI, nên quá trình thực thi treo cho đến khi bạn ngắt; báo cáo trên 2.0.16, 8 bình luận, chưa có bản sửa trong dữ liệu ([#51223](https://github.com/anomalyco/opencode/issues/51223)).
- Subagent đã hoàn thành có thể trả về nội dung rỗng cho parent dù child báo `idle_outcome: succeeded` kèm lượng token thực tế ([#59051](https://github.com/anomalyco/opencode/issues/59051)).
- `opencode serve` tăng RSS từ 161 MB lên ~1.0 GB trong ~7 giờ và vẫn ở mức cao khi nhàn rỗi; một báo cáo, 7 bình luận ([#51340](https://github.com/anomalyco/opencode/issues/51340)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Đã thay đổi gì

**Session resume không còn làm mất các tool built-in.** Khi một nhánh session bị cắt bởi `parentId` mồ côi sau lỗi ghi ENOSPC, resume mất toàn bộ tool mặc định (#11460). Đã sửa, đánh dấu p0. Quan trọng nếu bạn gặp tình trạng đầy đĩa trên Windows.

**Hidden thinking với label rỗng không còn tạo dòng trống.** Đặt `ctx.ui.setHiddenThinkingLabel("")` trước đây để lại 2–3 dòng trống cho mỗi thinking block (#11470). Đã sửa. Quan trọng với các extension ẩn hiển thị thinking.

**`/tree` summarization giờ truyền đúng thinking level của bạn.** Tùy chọn Summarize bỏ qua nó, nên `generateBranchSummary` tạo request không có `reasoning` (#11482). Đã sửa. Quan trọng với các reasoning model qua OpenAI Responses và Azure.

## Đáng chú ý

**Đăng nhập OpenAI ChatGPT Business vẫn lỗi.** `3p_delegated_access_policy_denied` khi đăng nhập bằng gói OpenAI thường; tùy chọn "OpenAI Codex (legacy)" hoạt động với cùng tài khoản (#10953, 11 bình luận). Đã đóng vì không có hành động, nên cách workaround vẫn là cách khắc phục.

**Session có thể kẹt ở ngưỡng context trên reasoning model.** Mọi request trả về `stopReason: "length"` với `usage.output: 16`, và auto-compaction bỏ cuộc (#9409, 10 bình luận). Vẫn mở.

**Một bug của Anthropic SSE parser làm hỏng turn.** Nếu một CRLF bị tách qua hai network chunk, event đang chờ được flush mà không có trường `data:` và JSON parsing ném lỗi (#10390). Vẫn mở.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

`v0.26.2` phát hành một thay đổi phá vỡ tương thích: `fix(managed-agent)!: simplify Web Shell controls and retire cwd submissions` ([#15616](https://github.com/QwenLM/qwen-code/pull/15616)). Các nút điều khiển Web Shell được đơn giản hóa và việc gửi cwd bị loại bỏ, nên những luồng managed-agent từng gửi thư mục làm việc phải được sửa lại. Kiểm tra điều này trước khi nâng cấp.

`v0.26.3-preview.0` bổ sung tùy chọn bật nhịp trích xuất bộ nhớ sau một lần chạy không thao tác ([#13571](https://github.com/QwenLM/qwen-code/pull/13571)), cùng với việc khôi phục lệnh gọi XML bên ngoài có nội dung trích dẫn. Cả hai chỉ có trong bản xem trước, chưa nằm trong bản phát hành ổn định.

`v0.26.2-preview.1` đề xuất quy tắc quyền cho phiên managed và phê duyệt tự động ([#15448](https://github.com/QwenLM/qwen-code/pull/15448)). Đang phát triển, chưa phát hành.

**Đáng chú ý**

Thông báo hoàn thành tác vụ nền của subagent chỉ đến được agent cấp cao nhất ([#15748](https://github.com/QwenLM/qwen-code/issues/15748), 2 bình luận, đang mở). Người báo cáo nói subagent không bao giờ nhận được thông báo, và việc đánh thức agent cấp cao nhất có thể gây nhầm lẫn hoặc làm sập OOM. Dữ liệu chưa có bản sửa.

Vị từ sở hữu của managed-agent có thể chạm tới khóa sắp đặt runtime không giới hạn trên các đường điều khiển mỗi lượt ([#15766](https://github.com/QwenLM/qwen-code/issues/15766), P1, đang mở). Chưa xác nhận bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*