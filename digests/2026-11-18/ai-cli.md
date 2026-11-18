# Bản tin cộng đồng công cụ AI CLI 2026-11-18

> Tạo lúc: 2026-11-18 07:12 UTC | Công cụ theo dõi: 7

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

**mcp-builder: sửa import và header của streamable HTTP client** — Sửa lỗi `mcp>=2.0.0`, khi `streamablehttp_client` được đổi tên thành `streamable_http_client` và header tùy chỉnh giờ đi qua `create_mcp_http_client`. Đang mở; đây có thể là thay đổi cần dùng nếu `connections.py` không import được trên các phiên bản MCP hiện tại. Tham chiếu: anthropics/skills PR #1742.

**skill-creator: cô lập trigger evals và xử lý lỗi trên Windows và lỗi runtime** — Khắc phục các trường hợp bỏ sót trigger sai do các probe chạy song song theo từng worker cạnh tranh nhau, `select()` lỗi trên pipe của tiến trình con trên Windows, và lỗi runtime bị tính là không trigger. Đang mở; hữu ích nếu bạn chạy `run_eval.py` và nhận được các ví dụ âm gây hiểu nhầm. Tham chiếu: anthropics/skills PR #1298.

**webapp-testing: tránh `shell=True` trong with_server.py** — Thay thế `subprocess.Popen(..., shell=True)`, vốn được dùng cho chuỗi `cd <dir> && <command>`, để bịt rủi ro command injection (CWE-78). Đang mở; dùng khi bạn spawn server từ chuỗi lệnh do agent tạo ra. Tham chiếu: anthropics/skills PR #1980.

**Yêu cầu đang mở**

Các org không thể chia sẻ skill trực tiếp — đồng nghiệp phải tải file `.skill` và upload thủ công qua Settings > Capabilities, nên cần có thư viện chia sẻ hoặc link chia sẻ. Tham chiếu: anthropics/skills Issue #228.

---

**Có gì thay đổi**

v2.1.327 thêm một bước xác nhận trước khi `/install-github-app` sửa repository, để bạn duyệt thay đổi trước. Cùng bản phát hành này bổ sung `claude mcp add-json <name> -`, đọc JSON của server từ stdin để token không lộ trên dòng lệnh; lệnh này không dùng được trong phiên Claude Code.

**Đáng chú ý**

Issue #110867 (đã đóng, 2 bình luận) báo rằng trên v2.1.326, khi khôi phục phiên, thông báo hệ thống `# Environment` được gửi rỗng, khiến prompt cache bị trượt ở mọi request khôi phục. Báo cáo đã đóng; release notes chỉ nhắc đến "một dòng khi ngữ cảnh trước đó của phiên khôi phục".

Issue #109170 (đang mở, 1 bình luận) báo rằng các request trên ~200K token thất bại với ECONNRESET từ 2026-11-11 ~22:50 UTC trên Windows, kèm `/compact` bị treo và không khôi phục được phiên. Dữ liệu không cho thấy bản sửa nào.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Những gì đã thay đổi**

- Từ rust-v0.170.0, các cuộc gọi thoại thời gian thực trên TUI dùng thương lượng WebRTC (#61172), nên cuộc gọi có thể kết nối ngang hàng thay vì qua đường cũ. Điều này quan trọng khi chất lượng thoại hoặc độ trễ trong phiên dài phụ thuộc vào đường truyền.
- rust-v0.170.0 bổ sung tự động làm mới header xác thực cho trình xuất OpenTelemetry qua HTTP (#61028). Phiên chạy dài xuất telemetry không còn cần xoay thông tin xác thực thủ công.
- rust-v0.170.0 bổ sung hỗ trợ thử nghiệm cho các MCP server cùng tên ở nhiều môi trường (#60905); không có chi tiết theo bản phát hành cho rust-v0.171.0-alpha.13, rust-v0.170.0-alpha.4.2 và rust-v0.171.0-alpha.12, còn rust-v0.169.1 chỉ liệt kê "Chores".

**Đáng chú ý**

- Windows Computer Use để lại chỉ báo truy cập và viền màn hình vàng sau khi lượt chụp màn hình hoàn tất (#57101, đang mở, 57 bình luận).
- Trên luồng Work của Windows và macOS, nút Send vẫn bị vô hiệu hoặc Enter thất bại im lặng dù văn bản đã được nhận (#54564, #51636, cả hai đang mở).
- Plugin MCP dùng `mcp.json` với `extensions.com.openai.auth` bị từ chối vì trường không xác định, khiến server bị loại bỏ (#53658, đang mở).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên không có gì được ship. Các thay đổi dưới đây là pull request đang mở hoặc đã đóng, không phải tính năng đã phát hành.

- **Đề xuất sửa lỗi treo UI trên Windows.** PR #30334 phân tích cú pháp lệnh PowerShell theo cách bất đồng bộ, nhằm chấm dứt tình trạng spinner treo vài giây trên Windows trước khi bảng công cụ Shell hiện ra. Trạng thái: đang mở.
- **Đề xuất sửa lỗi Git SSH.** PR #30335 ngăn `getSafeGitEnv()` đặt `core.sshCommand` thành chuỗi rỗng, nguyên nhân gây ra `error: cannot run : No such file or directory` khi thao tác git qua SSH. Trạng thái: đang mở.
- **Đề xuất sửa lỗi phân tích biến môi trường MCP.** PR #30331 giữ nguyên ký tự `=` và giá trị rỗng trong `gemini mcp add -e KEY=value`; trước đây `TOKEN=abc=def==` bị lưu thành `"abc"`. Trạng thái: đang mở.

**Đáng chú ý**

- **Agent đa dụng bị treo.** Issue #21409 (8 bình luận, 8 👍) báo cáo agent đa dụng treo vô thời hạn với các tác vụ đơn giản như tạo thư mục; yêu cầu model không chuyển cho subagent thì tránh được lỗi này. Dữ liệu chưa có bản sửa.
- **Subagent trình duyệt lỗi trên Wayland.** Issue #21983 (priority/p1) báo cáo subagent trình duyệt thất bại trong khi báo `Termination Reason: GOAL`. Dữ liệu chưa có bản sửa.
- **Lỗi 400 khi vượt quá 128 công cụ.** Issue #24246 báo cáo lỗi 400 khi có quá nhiều công cụ trong phạm vi. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Có gì thay đổi**

- v1.0.114 và v1.0.114-0 phát hành ngày 2026-11-18; cả hai chỉ ghi "Fixes and changes." Không có chi tiết tính năng nào.
- v1.0.113 (2026-11-17) thêm thiết lập được quản lý `features.browserUse`. Quản trị viên giờ có thể tắt Browser Use tích hợp, kể cả trong các phiên đang chạy.

**Đáng lưu ý**

- Issue #5492: trong 1.0.113, SDK của extension được đổi tên từ `@github/copilot-sdk` thành `@microsoft/copilot-sdk` mà không có alias và không có ghi chú phát hành. Các extension import tên cũ sẽ lỗi `ERR_MODULE_NOT_FOUND`. Dữ liệu chưa có bản sửa.
- Issue #5498: trong 1.0.113, các extension dạng plugin dừng rồi khởi động lại vài giây sau khi phiên tương tác bắt đầu, nên code khởi động của mỗi extension chạy hai lần. Dữ liệu chưa có bản sửa.
- Issue #5478 (6 bình luận): trên Windows, Cortex XDR kill shell khởi chạy qua `parent_process_spoofing` khi Copilot CLI spawn `git`. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Đã thay đổi gì**

Các lệnh shell chạm ngưỡng timeout giờ chuyển sang chạy nền thay vì bị kill (v2.3.1). Các bản build và test run dài sẽ chạy xong và báo kết quả về; `timeout: 0` ở foreground giờ nghĩa là mặc định 120 giây.

Prompt caching của GPT-6.2 đã được sửa trong v2.3.2. GPT-6.2 không cache system prompt gửi trong trường `instructions` của Responses, nên mỗi bước đều bị tính lại như input chưa cache; OpenCode giờ gửi nó dưới dạng developer message đứng đầu trên mọi route Responses, kể cả OpenAI.

OpenCode 1 giờ có bản nâng cấp lên OpenCode 2.0 (v1.19.6). Bản này tải về ở nền và chỉ cài khi chọn Restart to upgrade, Upgrade on quit hoặc Later; session, project và cài đặt được giữ nguyên, nhưng plugin của OpenCode 1 cần cập nhật.

**Đáng lưu ý**

Cache của model catalog không tự làm mới (#64489, đang mở). Một người báo cáo đo được nó cũ 154,9 giờ (6,5 ngày), nên `opencode models` và danh sách trên desktop bỏ sót các model mới ra cho đến khi background service khởi động lại.

`opencode.db` đạt 12,7 GB sau ba tuần, kèm 474 lỗi I/O đĩa SQLite trong 12 phút (#64588, đang mở). Chưa có bản sửa trong dữ liệu.

Thread về vấn đề gói miễn phí (#59387, đang mở, 390 bình luận) tập hợp các báo cáo về việc vượt hạn mức sử dụng mà không bao giờ được reset.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Đã thay đổi

**Điều hướng cây không còn làm bẩn lịch sử prompt (PR #12280, đang mở).** Cả bộ chọn `/tree` lẫn hành động `navigateTree` của extension đều render lại chat với `populateHistory: true`, khiến prompt nhánh được thêm lại vào lịch sử mũi tên lên mỗi lần nhảy. Bản sửa đề xuất dừng việc đó; điều này quan trọng nhất nếu bạn thường xuyên di chuyển giữa các nhánh.

**`/reload` giờ làm mới các model theo phạm vi (PR #12278, đang mở).** Thay đổi trong `enabledModels` có hiệu lực mà không cần khởi động lại pi, còn cờ `--models` lúc khởi động vẫn được ưu tiên. Phù hợp với ai đang thử cấu hình phạm vi model trong một phiên đang chạy.

**Resume không còn làm mất các tool tích hợp (issue #11460, đã đóng, có bản sửa).** Trên 1.4.0, một phiên có nhánh bị cắt cụt (`parentId` mồ côi sau ENOSPC) mất toàn bộ tool tích hợp khi resume.

## Đáng chú ý

- **Lỗi crash khi hủy ở Cod mode ảnh hưởng 1.5.2 (issue #12271, #12253, #11956).** Một `Promise.all` gồm các lệnh gọi `tools.read()` mà một đường dẫn thất bại trong khi đường dẫn khác đang mở dở sẽ làm crash toàn bộ tiến trình pi với `AbortError` không được xử lý. Nhiều người dùng báo cáo; #11956 đã đóng.
- **Người dùng Windows, 97 bình luận ở issue #7547.** Một thảo luận đang mở hỏi cách mọi người chạy pi trên Windows và gặp những vấn đề gì, xoay quanh việc core nên tập trung sửa ở đâu thay vì đẩy ra ngoài.
- **Cảnh báo xung đột skill bỏ qua thứ tự ưu tiên (issue #12257, PR #12256 đã đóng).** Pi vẫn cảnh báo ngay cả khi thứ tự ưu tiên tài nguyên đã chọn ra người thắng, gây cảnh báo lặp lại cho những lần ghi đè có chủ đích.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

v0.28.0 phát hành không có thay đổi gây lỗi nào được biết đến. Bản này thêm bộ lọc workspace ở sidebar vào Web Shell (PR #17244) và một adapter DingTalk cho managed agent. TypeScript SDK v0.1.35 đi kèm CLI 0.28.0.

Bản xem trước v0.28.1-preview.0 cũng đã xuất hiện, gia cố trình theo dõi verify-pr (PR #17506 nhắc đến một bài test E2E `/loop` theo lịch); đây là bản xem trước, không phải bản ổn định.

**Đáng chú ý**

- Issue #14724 (436 bình luận) theo dõi lỗi CI main kéo dài ở cổng Managed Agent; issue mở từ 2026-10-19 và vẫn mở — dữ liệu cho thấy cổng này không tìm thấy test, nên chưa thấy bản sửa nào.
- Issue #13851 báo cáo rằng chế độ headless/SDK trì hoãn `result` cuối cùng cho đến khi các tác vụ auto-memory managed chạy xong, mỗi lần chậm 40 giây đến 5 phút; TUI và ACP trả về ngay. Vẫn mở.
- Issue #17682 ghi lại lỗi Grep fallback: các tên file được theo dõi không phải UTF8 vượt qua được lstat guard và bị bỏ qua. Đã có một PR (#17530), nhưng bản sửa bị hoãn sang việc tiếp theo, chưa được merge.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*