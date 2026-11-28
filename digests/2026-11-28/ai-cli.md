# Bản tin cộng đồng công cụ AI CLI 2026-11-28

> Tạo lúc: 2026-11-28 07:35 UTC | Công cụ theo dõi: 7

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

# Claude Code Skills — Ghi chú trạng thái, 2026-11-28

## Skill game retro Pyxel (đang mở)
Bổ sung skill Pyxel để tạo, gỡ lỗi và kiểm tra game Python retro, bao gồm chạy headless theo input và kiểm tra frame. Vẫn là pull request đang mở: anthropics/skills PR #525.

## Skill Notion spec-to-implementation và quantitative resume auditor (đang mở)
Gộp hai skill: một skill chuyển spec sản phẩm hoặc kỹ thuật thành task Notion kèm tiêu chí nghiệm thu, skill còn lại kiểm tra resume. Cả hai chưa được merge: anthropics/skills PR #1245.

## Skill document-typography (đang mở)
Ngăn lỗi typography trong tài liệu sinh ra, gồm orphan word wrap, widow paragraphs và lệch numbering. Chưa được merge: anthropics/skills PR #514.

**Yêu cầu đang mở**
Skill cộng đồng phát hành dưới namespace `anthropic/` cho phép tác giả mạo danh skill chính thức của Anthropic, và người dùng có thể cấp quyền nâng cao dựa trên niềm tin nhầm đó — báo cáo trong anthropics/skills Issue #492.

---

**Những gì đã thay đổi**

Không có bản phát hành mới nào trong 24 giờ qua. Bốn PR được cập nhật:
- PR #53529 (đã đóng) thêm kiểm tra CI cho các mục marketplace cục bộ, phát hiện tham chiếu plugin không hợp lệ trước khi merge.
- PR #112684 (đang mở) khiến stale sweep đăng thông báo khi gắn nhãn một issue, giới hạn 100 issue mỗi lần chạy.
- PR #112436 (đã đóng) ngăn stale sweep gắn nhãn cho các issue có nhãn `has repro`, `reproduced`, `data-loss` hoặc `high-priority`.

**Đáng chú ý**

- Issue #64804 (đang mở): Trên Windows, phím Enter chèn dòng mới thay vì gửi, và ghi đè trong `keybindings.json` bị bỏ qua. Dữ liệu không có bản sửa.
- Issue #111336 (đang mở): Từ 2026-11-13 đến 2026-11-20, 78 yêu cầu bị chặn bởi safeguard `reasoning_extraction` dương tính giả trên Fable 5.2, Opus 5.5 và Sonnet 5.5. Tác giả báo cáo rằng công việc phát triển thông thường cũng kích hoạt nó.
- Issue #38928 (đã đóng): Subagent Explore thất bại ngay lập tức với "Prompt is too long" khi nhiều công cụ MCP được kết nối.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

Không có tính năng nào dành cho người dùng được phát hành trong 24 giờ qua. Bản phát hành duy nhất là `rust-v0.174.0-alpha.9`, một tag alpha không có changelog trong dữ liệu.

Một số bản sửa lỗi sandbox và TUI tồn tại dưới dạng PR đã đóng, không phải bản phát hành. PR #64415 giữ nguyên các hạn chế chỉ đọc và deny mask của sandbox Linux khi một đường dẫn ghi được là một symlink alias. PR #64416 khiến sandbox Windows tuân theo quyền hệ thống tập tin đã khai báo thay vì từ chối các chính sách workspace hợp lệ. Cả hai đều là nền tảng; chưa có cái nào được xác nhận phát hành.

Một bản sửa lỗi render TUI đã được merge trong PR #64400: inline code Markdown bắt đầu một đoạn trong một list item không còn nối vào dòng heading phía trước.

**Đáng chú ý**

Issue #45163 (mở, 39 bình luận, 👍46): bảng màu TUI chỉ được cache lúc khởi động, nên văn bản nhập vẫn không đọc được sau khi hệ thống chuyển đổi chế độ sáng/tối. Tồn tại qua `codex-cli 0.154.0` và trên `main` tại `a592c38c`. Không có bản sửa trong dữ liệu.

Issue #64419 (mở, 2 bình luận): một lần fetch `/models` thất bại không được cache, nên mỗi lượt đều chờ hết timeout fetch trong khi `/models` không truy cập được. Được báo cáo từ `main` tại `8cae463a69`; ảnh hưởng đến đăng nhập ChatGPT, API key và các nhà cung cấp tùy chỉnh.

Issue #62975 và #63042 báo cáo bộ chọn quyền Local/Cloud của Windows Desktop biến mất sau tin nhắn đầu tiên, trên các phiên bản `26.1117.41037` và `26.1117.4957.0`. Không có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Nội dung thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Các thay đổi dưới đây là pull request đang mở, không phải tính năng đã phát hành.

- **Đề xuất đóng phiên ACP** ([PR #30368](https://github.com/google-gemini/gemini-cli/pull/30368)) — thêm hỗ trợ `session/close` và quảng bá khả năng này khi khởi tạo, cho phép client ACP giải phóng phiên trước khi tiến trình Gemini CLI thoát.
- **Đề xuất xử lý abort cho output nền** ([PR #30498](https://github.com/google-gemini/gemini-cli/pull/30498), sửa #29945) — `ReadBackgroundOutputInvocation` sẽ từ chối với `AbortError` khi signal đã bị abort, và hủy các delay đang chờ qua helper `delay(ms, signal)` sẵn có.
- **Đề xuất chuẩn hóa diff CRLF** ([PR #30489](https://github.com/google-gemini/gemini-cli/pull/30489), sửa #30480) — chuẩn hóa `\r\n` thành `\n` trước khi tính diff xác nhận `write_file`, diff thực thi và `diffStat`, khớp với `edit.ts`, đồng thời giữ nguyên nội dung gốc cho `detectLineEnding`.

**Đáng chú ý**

- **Báo cáo sai thành công của subagent** ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 14 bình luận) — subagent `codebase_investigator` báo `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS trước khi phân tích bất cứ thứ gì. Vẫn mở; dữ liệu chưa có bản sửa.
- **Agent tổng quát bị treo** ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 bình luận, 8 👍) — chuyển sang agent tổng quát bị treo vô thời hạn, kể cả khi chỉ tạo thư mục đơn giản. Yêu cầu model không chuyển tiếp sẽ tránh được.
- **Browser agent bỏ qua cài đặt** ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) — các ghi đè trong `settings.json` như `maxTurns` bị bỏ qua. Vẫn mở, cần kiểm tra lại.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

- **v1.0.118-2** sửa lịch sử prompt khi nhấn Ctrl+R: sau khi tìm thấy kết quả khớp, phím Up và Down giờ điều hướng lịch sử thay vì áp dụng các gợi ý ẩn. Đáng chú ý khi bạn quay lại một prompt cũ và chỉnh sửa nó.
- **v1.0.118-1** sửa lỗi chạy `copilot mcp enable`/`disable` đồng thời, để các thay đổi trên những MCP server khác nhau được giữ nguyên. Đáng chú ý khi bạn viết script chỉnh sửa cấu hình MCP song song.
- **v1.0.117** thêm `sandbox.userPolicy.network.extraCaCertificates` (trong user settings hoặc managed settings) để tin cậy các CA tùy chỉnh cho lệnh chạy trong sandbox phía sau proxy chặn TLS, và thêm cơ chế công bố tool rõ ràng để custom agent tự chọn bật tool.

**Đáng biết**

- Issue [#5607](https://github.com/github/copilot-cli/issues/5607): các reasoning model nén context ở mức 30–40% cửa sổ vì ước lượng context vẫn đếm token suy luận cũ. Tác giả báo cáo 19 lần nén trong 107 phút khi dùng reasoning model với key riêng. Đang mở, chưa có bản sửa trong dữ liệu.
- Issue [#5601](https://github.com/github/copilot-cli/issues/5601): chỉnh sửa một skill yêu cầu phê duyệt bỏ qua sandbox dù đã cấp quyền đọc-ghi rõ ràng cho thư mục skills, trên 1.0.117. Đang mở.
- Issue [#5599](https://github.com/github/copilot-cli/issues/5599): Copilot CLI 1.0.116 từ chối các lệnh gọi `session.metadata.setWorkingDirectory` từ extension với lỗi RPC. Đang mở.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## Có gì thay đổi

Không có bản phát hành nào trong 24 giờ qua, nên không có gì được ship.

**Timeout của `execute` trong Code Mode** — Issue #54220 (đang mở, đã tái hiện) báo cáo rằng `execute` và các lệnh gọi công cụ plugin không có giới hạn thời gian trong V2; một lệnh gọi chậm sẽ chặn cả phiên cho đến khi bạn ngắt. Chưa có bản sửa trong dữ liệu.

**Subagent chỉ chạy nền** — Issue #66555 gọi việc loại bỏ chạy subagent ở foreground trong PR #63382 và #63223 là một regression, gây thêm lần đánh thức parent và làm ô nhiễm ngữ cảnh. Đang mở, chưa có bản sửa.

**Đề xuất: gộp các lần đánh thức subagent** — PR #66936 sẽ gộp các lần đánh thức của các subagent anh em đã hoàn thành cho subagent lồng nhau, thay vì mỗi child một lượt parent. Đang phát triển, chưa phát hành.

## Đáng chú ý

**Shell song song trên Windows thất bại** — Issue #66940: trên 2.4.2, đúng một trong hai lệnh gọi shell trong cùng một lượt thất bại với os error 5 dưới Store PowerShell 7. Chưa có bản sửa trong dữ liệu.

**Quyền `ask` bị cho phép âm thầm** — Issue #66861 (đã đóng): trong 2.4.1/2.4.2, các công cụ được phân giải thành `ask` chạy mà không hỏi gì cho `shell` và `webfetch`; 2.3.2 hỏi đúng.

**Esc xóa tin nhắn** — Issue #66824 (đã đóng): trong TUI 2.4.2, ngắt bằng double-Esc có thể xóa phần lớn phiên sau khi `revert.stage`/`revert.commit` được thêm vào.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Có gì thay đổi**

v1.7.0 bổ sung [khôi phục phiên terminal](https://github.com/earendil-works/pi/blob/v1.7.0/packages/coding-agent/docs/terminal-setup.md#program-resume): các terminal tương thích có thể mở lại phiên pi hiện tại sau khi khởi động lại với nguyên profile, giới hạn công cụ và hướng dẫn ban đầu. Điều này quan trọng khi việc khởi động lại terminal buộc bạn phải dựng lại trạng thái phiên.

PR [#12609](https://github.com/earendil-works/pi/pull/12609) sửa lỗi HTML xuất ra bị mất dấu `$` trong chi phí phiên ([#12608](https://github.com/earendil-works/pi/issues/12608)); `/export`, `/share` và `pi --export` đều bị ảnh hưởng.

PR [#12634](https://github.com/earendil-works/pi/pull/12634) xử lý việc phát hiện WSL không còn dựa vào biến môi trường WSL.

**Đáng lưu ý**

Tự động nén thất bại có thể tiếp tục công việc và thử lại vô hạn ([#12483](https://github.com/earendil-works/pi/issues/12483), 3 bình luận, p0). Người dùng trên 1.6.1 gặp lỗi này; hãy dừng thủ công nếu bạn thấy nó.

Dán đầu ra ANSI để lại văn bản chuỗi escape trong prompt, và một lần dán bracketed paste không có ký tự kết thúc có thể làm kẹt editor, kể cả Ctrl+C ([#11383](https://github.com/earendil-works/pi/issues/11383), 6 bình luận).

Nhảy lùi ký tự dừng ở cột 1 khi ký tự đầu tiên của dòng hiện tại khớp, kể cả khi có kết quả khớp ở dòng trước ([#12636](https://github.com/earendil-works/pi/issues/12636)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

- SDK TypeScript `sdk-typescript-v0.1.39` đã phát hành, đóng gói kèm CLI phiên bản 0.28.7 build từ cùng nhánh với SDK ([release](https://github.com/QwenLM/qwen-code/releases)). Dùng bản này khi bạn cần chắc chắn phiên bản SDK và CLI khớp nhau.
- PR #18528 (đã đóng) đặt mặc định `tool_stream: true` cho các yêu cầu streaming có tool gửi tới API tương thích OpenAI của Model Studio, áp dụng cho qwen4-max, qwen3.8-max, qwen3.8-flash và qwen3.7-plus. Không có thay đổi này, các model Qwen trên DashScope giữ lại tham số tool có schema khai báo object, khiến tool call bị treo. Kiểm tra PR #18528 trong `QwenLM/qwen-code` để biết nó đã vào phiên bản bạn dùng chưa.
- PR #18535 (đã đóng) sửa lỗi xóa session trên các worktree sidecar không đọc được: symlink hỏng, symlink vòng lặp và thư mục cha không đọc được bị nhầm là sidecar mất tích, âm thầm xóa transcript trong khi vẫn để lại checkout.

**Đáng lưu ý**

- Issue #18489 [P1, đang mở] báo cáo `qwen serve` v0.28.7 đóng băng event loop 6–8 phút trên một daemon có 23 workspace, nguyên nhân là `regularFiles.includes` độ phức tạp O(N²) chạy trên snapshot `.qwen` 300k file. Dữ liệu chưa có bản sửa.
- Issue #17489 [đang mở] báo cáo cấu hình project trên Windows tạo sau khi khởi động (ví dụ qua `qwen mcp add --scope project`) không bao giờ được hot-reload, nên session không bao giờ kết nối tới server. Dữ liệu chưa có bản sửa.
- Issue #18492 [đang mở] báo cáo Ink TUI mất các tùy chọn đã tick và văn bản đã gõ khi bạn cuộn ra khỏi một câu hỏi đang chờ; CLI vẫn chờ câu trả lời của bạn. Dữ liệu chưa có bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*