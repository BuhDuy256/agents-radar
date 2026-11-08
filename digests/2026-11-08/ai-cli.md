# Bản tin cộng đồng công cụ AI CLI 2026-11-08

> Tạo lúc: 2026-11-08 05:51 UTC | Công cụ theo dõi: 7

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

**mcp-builder sửa lỗi import client cho mcp>=2 — open (PR #1742)**
Dùng bản này khi một agent Claude Code điều khiển server Model Context Protocol qua `skills/mcp-builder/scripts/connections.py`. Bản vá xử lý việc đổi tên `streamablehttp_client` thành `streamable_http_client` trong mcp 2.0.0 và truyền HTTP header tùy chỉnh qua `create_mcp_http_client` thay vì dùng kwarg trực tiếp. Thực thi lệnh an toàn hơn cho webapp-testing — open (PR #1980)
Dùng bản này khi một agent khởi tạo server cục bộ để test trình duyệt. Bản vá loại bỏ `shell=True` khỏi `with_server.py`, bịt lỗ hổng command injection (CWE-78) phát sinh từ việc truyền chuỗi `cd <dir> && <command>` nối tiếp vào shell hệ thống.

**Xử lý timeout LibreOffice cho docx — open (PR #1792)**
Dùng bản này khi một agent chuyển đổi hoặc chấp nhận tracked changes trong file Word và cần trạng thái thoát đáng tin cậy. `accept_changes.py` giờ trả về lỗi khi `soffice` timeout và chỉ báo thành công sau khi xác nhận không còn dấu revision nào trong `word/*.xml`.

**Yêu cầu đang mở**
Các tác giả agent báo cáo rằng `claude-api` tiêm khoảng 156k token trong một lần gọi tool duy nhất, làm cạn context window (Issue #1487), và rằng `run_eval.py` không bao giờ kích hoạt skill hay command, cho tỷ lệ kích hoạt 0% trên mọi truy vấn test (Issue #556).

---

**Những gì đã thay đổi**

Không có bản phát hành, pull request hay bản sửa lỗi nào trong 24 giờ qua. Hoạt động mới duy nhất là các issue đang mở; không có gì thay đổi cách công cụ hoạt động hiện nay.

**Đáng chú ý**

- **`claude -p` chạy không giao diện có thể đốt quota nhanh hơn.** Issue [#97074](https://github.com/anthropics/claude-code/issues/97074) (73 bình luận, 154 👍) báo cáo rằng các phiên chạy `claude -p` không giao diện, entrypoint `sdk-cli`, tiêu tốn khoảng 1,8× cửa sổ 5 giờ trên mỗi token so với `cli` tương tác trên cùng khối lượng công việc. Đang mở, chưa có bản sửa trong dữ liệu. Quan trọng nếu bạn chạy các job dạng script hoặc CI.

- **ToolSearch bị từ chối sau khi MCP kết nối lại.** Issue [#107860](https://github.com/anthropics/claude-code/issues/107860) báo cáo rằng việc kết nối lại một MCP server bị lỗi qua `/mcp` khiến mọi `select:` ToolSearch trả về "Permission to use ToolSearch with max_results:N has been denied" mà không nêu quy tắc hay nguồn nào. Đang mở.

- **Thu gọn khi dán ẩn nội dung prompt.** Issue [#23134](https://github.com/anthropics/claude-code/issues/23134) (56 bình luận, 163 👍) yêu cầu một tùy chọn để tắt thu gọn `[Pasted text #N +X lines]` để có thể xem lại văn bản đã dán trước khi gửi. Đề xuất cải tiến đang mở.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Có gì thay đổi**

- `rust-v0.169.0-alpha.3` đã phát hành; ghi chú phát hành chỉ có số phiên bản, nên không mô tả thay đổi nào cho người dùng ([release](https://github.com/openai/codex/releases)).
- Các bản cập nhật công cụ Code Mode tăng dần đi qua một chuỗi PR đã đóng: định nghĩa công cụ lồng nhau và namespace giờ có thể được cập nhật hoặc gỡ bỏ mà không cần gửi lại toàn bộ khai báo `functions.exec` ([PR #60157](https://github.com/openai/codex/pull/60157), [PR #60163](https://github.com/openai/codex/pull/60163), [PR #60188](https://github.com/openai/codex/pull/60188)). Điều này quan trọng với các phiên dài, khi danh mục công cụ thay đổi giữa chừng.
- Đăng nhập giờ có thể tạo provider hoặc gateway tùy chỉnh khi chưa có cấu hình gateway đã lưu ([PR #60186](https://github.com/openai/codex/pull/60186)). Trước đây đường này dừng lại ở lỗi.

**Đáng chú ý**

- Công cụ trình duyệt và computer-use vẫn từ chối tải một số trang, kể cả sau khi đã xóa lệnh từ chối ở cấp hội thoại ([#29343](https://github.com/openai/codex/issues/29343), 57 bình luận; [#49453](https://github.com/openai/codex/issues/49453), 48 bình luận). Chưa có bản sửa nào được liệt kê.
- Trên Windows, các lệnh cục bộ đã xác thực bị từ chối với lý do "blocked by policy" mà không có giải thích ([#53982](https://github.com/openai/codex/issues/53982)); một báo cáo RAM nhàn rỗi cũng nêu tên các tiến trình ChatGPT/Codex ([#53146](https://github.com/openai/codex/issues/53146)).
- `agent-recap` tìm kiếm bản ghi JSONL của Codex và Claude Code ngay trên máy trong một tab trình duyệt ([Discussion #60185](https://github.com/openai/codex/discussions/60185)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Điều gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Những thay đổi dưới đây là các PR được đề xuất, không phải tính năng đã phát hành.

- PR #30196 đề xuất khiến "Always allow" chỉ áp dụng cho lệnh hiện tại đối với các lệnh shell bị đánh dấu (tainted) (cờ không đáng tin cậy, hoặc lệnh build sau khi file build thay đổi). Hiện nay một lệnh bị đánh dấu có thể lưu một quy tắc thường trực cho gốc của nó, ví dụ mọi lần gọi `npm ...` sau này. Điều này quan trọng khi bạn phê duyệt các build rủi ro.

- PR #30171 đề xuất gắn cờ `rm` đệ quy và cưỡng bức bất kể vị trí cờ trên POSIX. Hiện nay chỉ `args[1]` được so với `-f`, `-rf` và `-fr`, nên `rm -r -f x`, `rm -Rf x` và `rm x -rf` được phân loại là không nguy hiểm và bỏ qua các heuristic của shell. Điều này quan trọng mỗi khi bạn dựa vào các prompt chính sách.

- PR #30175 đề xuất áp dụng `generateContentConfig` của subagent cục bộ (temperature, topP, topK, thinkingConfig) cho mọi giá trị model, bao gồm `flash`, `pro` và các tên cụ thể. Hiện nay chỉ các agent `auto` mới nhận được chúng.

**Đáng chú ý**

- Issue #21409 (8 bình luận, 8 👍): agent tổng quát bị treo vô hạn ở các tác vụ đơn giản như tạo thư mục; người báo cáo đã chờ tới một giờ. Yêu cầu model không giao lại cho subagent sẽ tránh được điều này. Chưa có bản sửa trong dữ liệu.

- Issue #22323 (13 bình luận): `codebase_investigator` báo `status: "success"` và `Termination Reason: "GOAL"` ngay cả sau khi chạm MAX_TURNS trước khi phân tích bất cứ thứ gì. Đang mở.

- Issue #24246 (3 bình luận): lỗi 400 xuất hiện khi có hơn 128 công cụ khả dụng. Đang mở.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

- **Hỗ trợ trạng thái chương trình OSC 7501** (Issue #5112, đã đóng): CLI tương tác giờ báo trạng thái agent (đang làm việc, bị chặn) tới các terminal hỗ trợ giao thức OSC 7501. Hữu ích nếu terminal của bạn hiển thị chỉ báo trạng thái theo từng pane.
- **`/rubber-duck` biến mất** (Issue #5372, đã đóng): lệnh này không còn trong copilot-cli và issue đã được đóng. Nếu bạn từng dùng nó, hãy kiểm tra xem nó đã trở lại trong phiên bản của bạn chưa.
- **Sửa lỗi ripgrep crash trên ARM64** (Issue #4977, #4918, đã đóng): các công cụ `rg`/`glob` đi kèm bị abort với lỗi jemalloc `Unsupported system page size` trên kernel có page size 16KB và 64KB (đáng chú ý là Asahi Linux). Người dùng trên các hệ thống đó giờ có thể tìm kiếm lại.

**Đáng biết**

- **Prompt phê duyệt trên Windows PowerShell** (Issue #5379, đang mở): trong 1.0.107, người dùng đã cấp quyền cho lệnh git vẫn bị hỏi review toàn bộ script. Dữ liệu chưa có bản sửa.
- **Tái sử dụng token OAuth của MCP** (Issue #4695, đang mở, 2 👍): các MCP server HTTP dùng OAuth tạo ra các entry cache-key trùng lặp, buộc phải xác thực lại nhiều lần giữa các phiên. Dữ liệu chưa có bản sửa.
- **Công cụ extension ở prompt-mode bị treo** (Issue #5381, đang mở): trong `copilot -p`, yêu cầu cấp quyền của một công cụ extension không bao giờ được trả lời, nên lượt chạy cứ chờ đến khi bị kill. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên các thay đổi dưới đây là PR đề xuất, không phải hành vi đã phát hành.

- Cập nhật danh mục Code Mode thu gọn thành ngân sách riêng cho từng server thay vì một ngân sách chung 2k, nên một server kết nối hay rời đi không còn liệt kê lại công cụ của mọi server khác. Đề xuất trong PR #62176; dùng nếu bạn chạy nhiều MCP server.
- Đầu ra trạng thái shell rõ hơn: `Exit code: N`, timeout ghi rõ đã chờ bao lâu và tiến trình thoát thế nào, và glob zsh không khớp sẽ đi qua thay vì báo lỗi. Đã merge trong PR #62141.
- Gửi lại ảnh từ lịch sử bị giới hạn trên dòng 1.x (backport của #39929, tiếp theo #56983) trong PR #62270. Liên quan nếu phiên dài có dán ảnh bị nhà cung cấp từ chối.

**Đáng biết**

- Giới hạn gói miễn phí chiếm phần lớn tracker. Issue #59387 là luồng báo cáo chính với 327 bình luận; người dùng phản ánh việc reset không bao giờ xảy ra. Đây là nơi chính thức để đăng báo cáo, không phải bản sửa.
- `edit` và `apply_patch` âm thầm thay byte UTF-8 không hợp lệ bằng U+FFFD, làm hỏng file không phải UTF-8, theo issue #45924 (`severity:high`, đã tái hiện). Chưa có bản sửa nào được liệt kê.
- `opencode serve --service` có thể deadlock trên container Kubernetes dùng chung uid qua overlayfs; `OPENCODE_DISABLE_FILEWATCHER=1` khắc phục được, theo issue #62687.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Đã thay đổi gì

**Cursor sửa lỗi chọn chuột.** Issue [#10862](https://github.com/earendil-works/pi/issues/10862) báo cáo rằng với `showHardwareCursor: true`, con trỏ phần cứng nhảy sang cột sai khi đang chọn bằng chuột. Cột được tính bởi `extractCursorPosition()` từ độ rộng văn bản trước một marker zero-width. Cập nhật 2026-11-07.

**Khai báo công cụ trong script Codemode.** PR [#11920](https://github.com/earendil-works/pi/pulls/11920) sửa lỗi script khai báo `tools` hoặc `console` ở cấp cao nhất bị lỗi định nghĩa lại (Issue #11226). Bản sửa cho phép script khai báo các binding đó; PR đã đóng nhưng chưa phát hành.

**Làm nóng prompt cache (đề xuất).** PR [#11857](https://github.com/earendil-works/pi/pulls/11857) đang mở và sẽ làm mới prompt cache 5 phút của Anthropic cho p2. Tác giả đo được 789 lần viết lại toàn bộ từ 12/10–5/11, tốn thêm khoảng 1.430 USD (26% chi phí p2). Chưa được merge.

## Đáng chú ý

**MCP kết nối lại chặn vài phút.** Issue [#11919](https://github.com/earendil-works/pi/issues/11919) báo cáo pi 1.5.0 bắt tay lại lần lượt tất cả MCP server sau khi đăng nhập vào một server, mỗi lần chờ 30–60 giây. Xảy ra trên Linux và macOS với từ 3 server trở lên. Dữ liệu chưa có bản sửa.

**Công cụ MCP OAuth trả về rỗng.** Issue [#11918](https://github.com/earendil-works/pi/issues/11918) báo cáo các lệnh gọi công cụ Google Workspace MCP trả về rỗng dù token hợp lệ. Header session/auth dường như không được giữ sau khi đăng nhập. Dữ liệu chưa có bản sửa.

**Mistral stream nội dung dạng mảng.** Issue [#11916](https://github.com/earendil-works/pi/issues/11916) báo cáo pi 1.5.0 hiển thị `delta.content` dạng mảng của Mistral thành `[object Object]` tràn lan. Ảnh hưởng đến người dùng các provider `openai-completions`.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

v0.27.0 phát hành các phiên managed-agent giữ nhiều câu hỏi con cùng lúc, trả lời theo bất kỳ thứ tự nào, với bản nháp và lỗi được tách riêng theo từng câu con ([#16484](https://github.com/QwenLM/qwen-code/pull/16484)). Đáng chú ý khi một lượt agent tỏa ra nhiều câu hỏi song song.

TypeScript SDK v0.1.30 đi kèm CLI phiên bản 0.27.0, nên người dùng SDK nhận được bản phát hành trên mà không cần cài CLI riêng.

v0.26.9-nightly.20261107 ghi tài liệu Wally dưới các nhà cung cấp tương thích OpenAI ([#16529](https://github.com/QwenLM/qwen-code/pull/16529)).

**Đáng lưu ý**

Microcompaction loại bỏ các tham chiếu `<persisted-output>` hiện có khi xóa kết quả công cụ cũ, thay đường dẫn đã lưu, digest sha256 và bản xem trước bằng một placeholder trống ([#16596](https://github.com/QwenLM/qwen-code/issues/16596), đang mở, 3 bình luận). Toàn bộ byte vẫn còn trên đĩa. Chưa có bản sửa trong dữ liệu.

Loại trừ glob của `--disable-mcp-server` không thể gỡ bỏ trong phiên, và các đường dẫn bật báo thành công trong khi server vẫn mất kết nối ([#14465](https://github.com/QwenLM/qwen-code/issues/14465), đang mở, 4 bình luận). Ảnh hưởng đến người dùng loại trừ MCP server khi khởi chạy.

Một thay đổi đề xuất sẽ che các kết quả công cụ cũ vào đĩa thay vì xóa chúng ([#16585](https://github.com/QwenLM/qwen-code/issues/16585), đang mở, 3 bình luận).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*