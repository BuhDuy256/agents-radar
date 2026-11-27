# Bản tin cộng đồng công cụ AI CLI 2026-11-27

> Tạo lúc: 2026-11-27 08:10 UTC | Công cụ theo dõi: 7

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

# Claude Code Skills — 2026-11-27

### Skill pyxel để phát triển game retro
Bổ sung skill Pyxel hướng dẫn cách tạo, gỡ lỗi và kiểm chứng game retro bằng Python, gồm cả chạy headless theo input và xem trực tiếp từng frame. Dùng khi cần xây dựng hoặc kiểm thử game Pyxel; các tài liệu tham chiếu riêng nói về hành vi và cách trình bày của Pyxel. Đang mở — anthropics/skills PR #525.

### webapp-testing: bỏ shell=True trong with_server.py
Thay `subprocess.Popen(..., shell=True)` trong `with_server.py`, vốn cho phép chuỗi `cd <dir> && <command>`. Bỏ shell giúp đóng rủi ro chèn lệnh (CWE-78). Đang mở — anthropics/skills PR #1980.

### docx: báo lỗi khi LibreOffice hết thời gian chờ
`accept_changes.py` giờ trả về Error khi `soffice` hết thời gian chờ thay vì báo thành công, và chỉ báo thành công sau khi xác nhận file DOCX đầu ra không còn dấu revision. Đang mở — anthropics/skills PR #1792.

**Yêu cầu đang mở**

Các skill cộng đồng phát hành dưới namespace `anthropic/` mạo danh skill chính thức của Anthropic, khiến người dùng cấp quyền cao hơn cho những skill mà họ tưởng là chính thức. Issue có 46 bình luận; đây là báo cáo từ người dùng, không phải thay đổi đã được chấp nhận. Đang mở — anthropics/skills Issue #492.

---

## Thay đổi gì

Không có bản phát hành nào trong 24 giờ qua.

## Đáng chú ý

**WSL vẫn treo.** Issue #26224 (135 bình luận, 152 👍) báo cáo Claude Code bị treo khi nhập prompt từ 5–20 phút trên WSL, cập nhật 2026-11-27. Dữ liệu không cho thấy bản sửa nào.

**Cảnh báo reasoning báo sai.** Issue #111336 báo cáo 78 sự kiện chặn `[reasoning_extraction]` từ 2026-11-13 đến 2026-11-20 trên Fable 5.2 (45 lần chặn), Opus 5.5 và Sonnet 5.5, trong công việc phát triển thông thường. Tác giả đã đếm các request ID; không có bản sửa nào được liệt kê.

**Giới hạn sử dụng nhảy lên 100%.** Issue #112477 báo cáo v2.1.332 nhảy giới hạn sử dụng 5 giờ từ 0% lên 100% khi reset hoặc chỉ với một prompt (Linux, lỗi hồi quy). Liên quan: #112557 báo cáo mức tiêu thụ 5 giờ quá mức trên Pro. Dữ liệu không có bản sửa nào cho cả hai.

**Đề xuất thay đổi stale-sweep.** PR #112436 đề xuất stale sweep không đóng các issue được gắn nhãn `has repro`, `reproduced`, `data-loss` hoặc `high-priority`. Đang mở, chưa merge.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Điều gì đã thay đổi

**Sidebar diff trong TUI (PR #64258).** `/diff` mở trong một tab sidebar chỉ đọc thay vì pager toàn màn hình, giữ hội thoại hiển thị trong khi xem thay đổi trên working tree. PR đã đóng, và dữ liệu không cho biết bản phát hành nào có nó.

**Ảnh Markdown inline (PR #64254).** TUI hiển thị preview cho các tham chiếu ảnh Markdown cục bộ, thay vì in alt text như trước, trên các terminal được hỗ trợ. Đã đóng, chưa phát hành.

**Bản phát hành alpha.** `rust-v0.174.0-alpha.8` được phát hành trong 24 giờ qua, không có thay đổi nào ngoài số phiên bản. ([release](https://github.com/openai/codex/releases))

## Đáng chú ý

**Lỗi sandbox và PATH trên Windows.** Issue [#13542](https://github.com/openai/codex/issues/13542) (37 bình luận, 28 👍) báo cáo `rg` đi kèm thất bại với lỗi Access Denied trong PowerShell tích hợp của Codex Desktop. Issue [#31073](https://github.com/openai/codex/issues/31073) báo cáo các thao tác Git qua HTTPS remote thất bại hoặc crash bên trong sandbox Windows. Cả hai đang mở, dữ liệu không có bản sửa.

**Lỗi trả lời và crash trên Windows.** Issue [#54564](https://github.com/openai/codex/issues/54564) (34 bình luận) báo cáo nút Send bị vô hiệu hóa trong các thread Work mới. Issue [#64038](https://github.com/openai/codex/issues/64038) báo cáo crash React ErrorBoundary lặp lại trên Home và New Thread. Cả hai đang mở, dữ liệu không có bản sửa.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Nội dung thay đổi

**Hook input có thêm `tool_call_id`.** PR #30491 bổ sung `tool_call_id` vào input của hook BeforeTool và AfterTool, để hook ghép cặp sự kiện before/after của một lần gọi theo id thay vì đoán từ tên tool cộng tham số. Hiện đang mở, chưa phát hành. Đáng chú ý nếu bạn viết hook cần liên kết các lần gọi tool.

**Mô tả shell trên Windows đã được sửa.** PR #30312 sửa mô tả `run_shell_command` mà model nhìn thấy để nêu đúng shell được chọn trên Windows, gồm cả hành vi dấu ngoặc kép của PowerShell 5.1. Đang mở, nên chưa phát hành. Liên quan nếu bạn dựa vào lệnh shell trên Windows.

**Sửa tài liệu extension.** PR #30305 sửa tài liệu khuyến nghị `"excludeTools": ["run_shell_command(rm -rf)"]`, vốn được tài liệu nói là chặn lệnh nhưng thực tế không khớp gì, vì các mục được so với toàn bộ tên tool. Đang mở.

## Đáng chú ý

**Agent tổng quát bị treo.** Issue #21409 (8 bình luận, 8 👍): chuyển sang agent tổng quát bị treo vô hạn, kể cả khi tạo thư mục. Một người dùng báo rằng yêu cầu model không dùng subagent thì hết treo. Trạng thái: cần kiểm thử lại; dữ liệu chưa có bản sửa.

**Lỗi 400 khi vượt giới hạn tool.** Issue #24246: Gemini CLI trả lỗi 400 khi có hơn 128 tool. Đang mở, trạng thái cần thêm thông tin. Dữ liệu chưa có bản sửa.

**File agent là symlink bị bỏ qua.** Issue #20079: symlink trong `~/.gemini/agents/filename.md` không được nhận là agent. Đang mở, cần thêm thông tin.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Những gì đã thay đổi**

v1.0.117-5 bổ sung `sandbox.userPolicy.network.extraCaCertificates` trong cài đặt người dùng hoặc cài đặt được quản lý, cho phép các lệnh chạy trong sandbox tin cậy chứng chỉ CA tùy chỉnh qua proxy chặn TLS. Dùng khi mạng của bạn kiểm tra TLS và các lệnh trong sandbox bị lỗi kiểm tra chứng chỉ.

v1.0.117-3 cải thiện Assisted Permissions để Copilot bỏ qua bước xác nhận khi nó dừng một tiến trình do chính nó khởi chạy trong cùng phiên, khớp theo process ID. Bản phát hành này cũng sửa việc phê duyệt công cụ MCP: phê duyệt công cụ của một MCP server cho một phiên hoặc một vị trí không còn phê duyệt luôn các yêu cầu tích hợp sẵn của Copilot, ví dụ shell.

v1.0.117-4 sửa lỗi Page Down bị kẹt ở prompt được ghim trong terminal 10 dòng khi bật tab.

**Đáng chú ý**

Issue #5593 (đang mở): khi bật sandbox cục bộ, `git submodule update` bị chặn ngay cả khi mọi submodule đã ở đúng commit đã ghi, làm hỏng script cài đặt hoặc build. Tác giả cho biết lệnh này hoạt động ở 1.0.99-2.

Issue #5591 (đang mở): Copilot CLI được báo cáo là tích lũy hàng trăm mục `copilot-mcp-oauth` / `copilot-keychain-chunk` trong Windows Credential Manager mà không xóa, cho đến khi các ứng dụng khác gặp lỗi `CredWrite` số 8.

Issue #5586 (đang mở): trên Windows 1.0.114, các đường dẫn UNC đang tồn tại bị từ chối trong bước preflight với lý do bị chính sách nội dung của tổ chức loại trừ, đây là lỗi hồi quy so với 1.0.108.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Điều gì đã thay đổi**

Không có bản phát hành nào ra mắt trong 24 giờ qua, nên những thay đổi dưới đây là các PR đề xuất, chưa phải hành vi đã phát hành.

- **Lượt trả lời của trợ lý rỗng kèm tool call**: PR #66754 gửi `content: null` thay vì chuỗi rỗng, sửa lỗi 400 từ các nhà cung cấp tương thích OpenAI khó tính ([#66749](https://github.com/anomalyco/opencode/issues/66749)). Quan trọng nếu bạn định tuyến qua các nhà cung cấp như Agnes API.
- **Lỗi tải skill**: PR #66742 nâng một `SKILL.md` bị bỏ qua từ log debug lên cảnh báo ([#66716](https://github.com/anomalyco/opencode/issues/66716)). Hiện tại frontmatter sai định dạng khiến skill biến mất mà không có tín hiệu nào.
- **Tải lại cấu hình TUI**: PR #66752 tải lại `cli.json` khi đích symlink của nó thay đổi ([#66743](https://github.com/anomalyco/opencode/issues/66743)). Quan trọng nếu bạn để dotfiles dưới dạng symlink.

**Đáng chú ý**

- Lỗi ở gói miễn phí vẫn là chủ đề nóng nhất: [#59387](https://github.com/anomalyco/opencode/issues/59387) có 414 bình luận về thông báo "free usage exceeded" và các lần reset không bao giờ xảy ra.
- Chạy không giao diện đôi khi không đăng ký máy chủ MCP nào (~10% phiên), nên mọi lệnh gọi công cụ MCP đều thất bại — [#65932](https://github.com/anomalyco/opencode/issues/65932).
- Ảnh chụp nhanh gom cả file bị git bỏ qua và file >2 MiB vào kho lưu trữ, được báo cáo lên tới 90 GB trong [#65127](https://github.com/anomalyco/opencode/issues/65127).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Những gì đã thay đổi**

- **Không có bản phát hành nào trong 24 giờ qua.** Tất cả mục dưới đây là issue và PR, không phải thay đổi đã phát hành.

- **Đã sửa lỗi phát lại `reasoning_opaque` của Copilot.** PR [#12505](https://github.com/earendil-works/pi/pull/12505) (đã đóng) ghi lại và phát lại giá trị reasoning không minh bạch mà trước đây Pi bỏ qua trên `openai-completions`. Quan trọng với người dùng GitHub Copilot khi gửi yêu cầu nhiều lượt, vì các lượt sau phát lại `reasoning_text` mà thiếu giá trị này (issue [#12418](https://github.com/earendil-works/pi/issues/12418)).

- **Đầu ra `!!` không còn làm phồng ước lượng ngữ cảnh.** PR [#12592](https://github.com/earendil-works/pi/pull/12592) (đã đóng) loại các message `bashExecution` có `excludeFromContext: true` khỏi `estimateTokens()`. Quan trọng khi đầu ra `!!` lớn khiến việc nén ngữ cảnh kích hoạt sớm.

- **ID ảnh Kitty bị giới hạn trong signed 32-bit.** PR [#12596](https://github.com/earendil-works/pi/pull/12596) (đã đóng) giữ ID trong khoảng mà Konsole phân tích được. Sửa lỗi mất ảnh trong issue [#12548](https://github.com/earendil-works/pi/issues/12548); phần xóa scrollback nằm ở PR [#12597](https://github.com/earendil-works/pi/pull/12597) (đã đóng).

**Đáng chú ý**

- **Provider do extension đăng ký thỉnh thoảng bị bỏ qua.** Issue [#8810](https://github.com/earendil-works/pi/issues/8810) (đang mở, 12 bình luận): phiên mới đôi khi bỏ qua `defaultProvider`/`defaultModel` khi provider đến từ `pi.registerProvider()`. Dữ liệu chưa có bản sửa.

- **Mức dùng ngữ cảnh có thể tăng vọt sau lỗi mạng.** Issue [#10287](https://github.com/earendil-works/pi/issues/10287) (đang mở, 9 bình luận): trên 0.99.2, `getContextUsage()` nhảy từ ~42k lên 330.081 token sau một lỗi có thể thử lại. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

Qwen Code CLI giờ chạy trên kernel Harness, phát hành trong v0.28.7 ([#18351](https://github.com/QwenLM/qwen-code/pull/18351)). Thống kê sử dụng vẫn tắt trừ khi `privacy.usageStatisticsEnabled` là `true`, và các lần từ chối gọi công cụ lặp lại giờ giải thích nguyên nhân. Kiểm tra cài đặt quyền riêng tư trước khi nâng cấp nếu bạn dựa vào việc telemetry im lặng theo mặc định.

SDK TypeScript v0.1.39 đi kèm CLI 0.28.7 ([PR #18513](https://github.com/QwenLM/qwen-code/pull/18513)). Ghi chú phát hành cũng liệt kê một mục CLI 0.28.6 đi kèm, nên hãy xác nhận phiên bản CLI bạn thực sự nhận được nếu bạn ghim SDK.

Một bản sửa đề xuất nhắm vào tình trạng treo `qwen serve` ở v0.28.7: việc giữ lại worktree có thể làm đứng event loop 6–8 phút do tra cứu O(N²) trên các snapshot `.qwen` lớn ([#18489](https://github.com/QwenLM/qwen-code/issues/18489), [PR #18494](https://github.com/QwenLM/qwen-code/pull/18494)).

**Đáng chú ý**

Phân trang transcript của `qwen serve` phân tích lại toàn bộ JSONL mỗi request, nên `limit=1` tốn chi phí như `limit=500` và làm đứng event loop ([#17889](https://github.com/QwenLM/qwen-code/issues/17889)). Đang mở, 3 bình luận.

Các MCP server HTTP dùng OAuth mất công cụ khi access token đã lưu hết hạn, vì token được ghim tại thời điểm kết nối ([#15649](https://github.com/QwenLM/qwen-code/issues/15649)). Đang mở, 3 bình luận.

Linux Desktop AppImage hiển thị cửa sổ xám trên Mesa hiện tại; tác giả cho biết nó đi kèm `libwayland-client` cũ ([#18486](https://github.com/QwenLM/qwen-code/issues/18486)). Đang mở, 3 bình luận.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*