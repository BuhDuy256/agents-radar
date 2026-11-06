# Bản tin cộng đồng công cụ AI CLI 2026-11-06

> Tạo lúc: 2026-11-06 06:26 UTC | Công cụ theo dõi: 7

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

### webapp-testing: tránh shell=True trong with_server.py
Thay `shell=True` bằng một lệnh gọi an toàn hơn trong `skills/webapp-testing/scripts/with_server.py`, khắc phục rủi ro command injection (CWE-78) từ chuỗi lệnh agent không được làm sạch. Mở dưới dạng PR #1980; lưu ý thay đổi này loại bỏ hỗ trợ cho chuỗi `cd <dir> && <command>`.

### fix(docx): báo lỗi khi LibreOffice hết thời gian chờ và kiểm tra đầu ra
Khiến `skills/docx/scripts/accept_changes.py` trả về lỗi khi `soffice` hết thời gian chờ, và chỉ báo thành công sau khi kiểm tra file DOCX đầu ra không còn dấu revision. Mở dưới dạng PR #1792.

### fix(xlsx): phân giải defined name và alias theo phạm vi worksheet trong external_links_at_risk
Sửa lỗi âm tính giả trong `skills/xlsx/scripts/recalc.py`, khi `external_links_at_risk` chỉ khớp defined name ở cấp workbook và bỏ sót các công thức tham chiếu liên kết ngoài một cách gián tiếp. Mở dưới dạng PR #2019.

**Yêu cầu đang mở**

Issue #1487 báo cáo skill `claude-api` chủ động đưa vào khoảng 156k token trong một lệnh gọi tool duy nhất, làm cạn context window; người dùng muốn skill này tải nội dung theo cách lazy.

---

## Có gì thay đổi

Không có bản phát hành mới trong 24 giờ qua. Tính năng #18435 đề xuất chuyển đổi tài khoản trong Claude Desktop; issue vẫn mở với 1.007 👍 và 236 bình luận, chưa được phát hành.

PR #107768 (mods: thêm mod privacy) đã đóng sau khi công bố mã nguồn của mod `privacy` tích hợp sẵn, mod này chặn các lệnh shell chứa địa chỉ email của tài khoản đang đăng nhập. Mods cho phép bạn đọc nội dung sẽ chạy trước khi bật các hook tùy chỉnh.

## Đáng chú ý

Issue #107757 (đang mở, 41 bình luận, 240 👍) báo cáo Claude Code gửi email của người dùng trong header `User-Agent` khi tìm kiếm trên web, làm lộ địa chỉ cho bên thứ ba. Dữ liệu chưa có bản vá.

Issue #106074 (đã đóng) — trong Claude Desktop, nhấn Tab trên menu slash-command sẽ chạy lệnh thay vì hoàn thành lệnh; gõ `/cl` rồi Tab kích hoạt `/clear` và xóa cuộc trò chuyện. Đã đóng, nên coi như đã sửa.

Issue #103591 (đang mở, Windows, Claude Code 2.1.302): tự động tiếp tục khi chạm giới hạn sử dụng không bao giờ kích hoạt dù cài đặt hiển thị `true` trong `/config`. Chưa có bản sửa nào được liệt kê.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

`rust-v0.167.0` bổ sung một trung tâm điều khiển agent: chạy `codex agents --no-daemon` để mở nó, và trung tâm điều khiển cùng trình chọn phiên đánh dấu kết quả chưa đọc (#58238, #58239, #58263, #58264). Điều này hữu ích khi bạn theo dõi nhiều agent đang chạy và cần biết cái nào đã xong.

Cùng bản phát hành này cho phép bạn chuyển đổi giữa các backend đã kết nối ngay từ trình chọn phiên trên terminal, giữ nguyên bản nháp khi chuyển (#58280, #58457). Điều này hữu ích nếu bạn làm việc với nhiều hơn một backend trong cùng một phiên.

Bốn bản phát hành ra mắt trong 24 giờ qua: `rust-v0.167.0`, cùng các bản alpha `rust-v0.168.0-alpha.7`, `-alpha.6`, và `rust-v0.167.0-alpha.3.2`. Các bản alpha không liệt kê thay đổi nào.

**Đáng chú ý**

Issue #59060 (431 bình luận) báo cáo Codex CLI v0.166.0 phá hủy systemd và container cùng chạy script khi được yêu cầu khởi động lại server, với chi phí được cho là hơn 10.000 USD. Không có bản sửa nào xuất hiện trong ghi chú phát hành.

Issue #56691 (50 bình luận) báo cáo tiện ích mở rộng Codex VS Code 26.1021.22027 không khởi động được giao diện trên Windows VS Code 1.143.1; issue #57759 báo cáo cùng phiên bản đó làm treo VS Code trên Linux/Wayland, được khắc phục bằng cách hạ cấp xuống 26.908.40401.

Issue #11626 (56 bình luận, 230 👍) yêu cầu một lệnh `/rewind` khôi phục cả ngữ cảnh trò chuyện lẫn các chỉnh sửa code do Codex áp dụng; hiện tại Esc rewind chỉ hoàn tác trạng thái hội thoại.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên chưa có gì được ship. Ba PR đang mở xử lý những vấn đề người dùng thực sự gặp.

- PR #30170 (area/agent, priority/p1, "fix(core): stop local subagents from waiting out their deadline on a stalled model call") đề xuất giới hạn thời gian cho một lần gọi model bị treo, để subagent cục bộ thất bại nhanh thay vì đốt hết `maxTimeMinutes` 3 phút cộng thêm tối đa 60 giây phục hồi.
- PR #30171 (priority/p1) đề xuất gắn cờ cho lệnh `rm` đệ quy hoặc cưỡng bức bất kể vị trí cờ. Hiện tại `isDangerousCommand` chỉ kiểm tra `args[1]`, nên `rm -r -f x`, `rm -Rf x` và `rm x -rf` đều bỏ qua heuristic shell của `PolicyEngine`.
- PR #29901 đề xuất `_session/steering` cho các client ACP, cho phép extension trên Zed, JetBrains hoặc VS Code thêm tin nhắn vào một lượt đang chạy mà không hủy nó, giống như `experimental.modelSteering` làm trong terminal.

**Đáng chú ý**

- Issue #21409 ([OPEN], p1, 8 bình luận, 8 👍): chuyển sang generalist agent sẽ treo vô thời hạn với những thay đổi đơn giản như tạo thư mục; yêu cầu model không chuyển thì tránh được. Dữ liệu chưa có bản sửa.
- Issue #21968 ([OPEN], p2, 7 bình luận): tác giả báo cáo Gemini hiếm khi tự gọi custom skill và sub-agent trừ khi được yêu cầu rõ ràng.
- Issue #24246 ([OPEN], p2): có hơn 128 tool khả dụng sẽ kích hoạt lỗi 400.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Những gì đã thay đổi**

- **v1.0.106 (2026-11-05)** thêm lệnh `/code` để mở phiên hiện tại trong VS Code, và `/settings` giờ mở một bảng điều khiển thống nhất với tìm kiếm toàn cục trên cài đặt lẫn tài nguyên cục bộ. Dùng khi bạn muốn nhảy thẳng tới editor hoặc tìm một cài đặt mà không phải lục menu.
- **v1.0.106** thêm cài đặt tier cho Fusion vào `copilot config`, cho Fusion mode một tier cấu hình được.
- **v1.0.106-11** sửa một lỗi xử lý prompt: ảnh bị xóa bằng Ctrl+U, Ctrl+K hoặc Ctrl+W, hoặc bị thay bằng một mục lịch sử được gọi lại, sẽ không còn được gửi kèm tin nhắn. Ctrl+S giờ có thể cất prompt lại sau đó, và văn bản dán chứa NEL hoặc dấu phân cách dòng/đoạn Unicode sẽ điền vào các dòng prompt riêng biệt.

**Đáng chú ý**

- Issue #5367 (đang mở): agent thường xuyên mất schema công cụ MCP sau khi quay lại một phiên. Người báo cho biết `/compact` khôi phục lại khả năng hiển thị. Có cách xử lý tạm; chưa có bản sửa trong dữ liệu.
- Issue #5366 (đang mở): với MCP OAuth từ xa (Microsoft Entra), các lệnh gọi thất bại sau khi access token hết hạn trong khi `mcp.list` vẫn báo đã kết nối. Người báo nói chỉ khởi động lại server mới hồi phục.
- Issue #5361 (đang mở): sau khi giới hạn phiên 5 giờ được đặt lại, một phiên thất bại với lỗi 400 "model is not available" trên 1.0.105. Chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Có gì thay đổi**

`@opencode/pty` 0.5.0 phát hành với tên `process-daemon-v0.5.0` (giao thức 8). Nếu bạn xây dựng trực tiếp trên giao thức PTY, hãy kiểm tra tương thích giao thức trước khi nâng cấp.

PR #61961 (đang mở) đọc lại tệp khi trình duyệt tệp mở lại tệp đó, nhắm vào nửa vấn đề nội dung cũ của issue #52941. Chưa phát hành.

PR #62287 (đang mở) đề xuất biểu đồ trực quan nội tuyến: một khối `visual` trong dấu fenced kèm đặc tả JSON, hiện có một renderer `plot`. Đang phát triển, tham chiếu #62258.

**Đáng biết**

Issue #59387 vẫn mở với 304 bình luận: giới hạn gói miễn phí (`Free usage exceeded`, reset không bao giờ xảy ra). Những người bảo trì dùng đó làm luồng thảo luận chính về gói miễn phí, nên báo cáo ở đó.

Issue #44007 (đang mở, đã tái hiện): TUI `--auto` chỉ phê duyệt quyền cho route của session đang chọn, nên các tab chạy nền bị kẹt ở lời nhắc quyền cho đến khi bạn chọn chúng.

Issue #61775 (đang mở, đã tái hiện): session warming dựng lại một request khác với request mà bước đó gửi. Trên Anthropic thì gần như hòa vốn, còn trên OpenAI và Gemini thì lỗ.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Những gì đã thay đổi**

Không có bản phát hành nào ra mắt trong 24 giờ qua, nên không có gì mới được ship. Chuyển động trong ngày nằm ở các bản sửa lỗi và đề xuất.

- **Dọn dẹp tiến trình bash trên Windows (PR #11854, đang mở).** Bản sửa đề xuất sẽ kill toàn bộ cây tiến trình thay vì dựa vào `taskkill /T`, vốn bỏ sót các tiến trình mà tiến trình cha đã thoát. Điều này quan trọng trên Windows với các lệnh chạy tiến trình con ở nền, ví dụ `(while true; do echo tick; sleep 0.05; done) &`.
- **MCP OAuth bị treo (issue #11311, đã đóng; PR #11855).** `OAuthCallbackServer.close()` chờ `http.Server.close()`, mà hàm này lại chờ các socket trình duyệt nhàn rỗi, khiến `/mcp login` kẹt ở "Connecting…" trong nhiều phút. Bản sửa sẽ đóng các kết nối còn lại.
- **Làm nóng prompt-cache cho p2 (PR #11857, đang mở).** p2 chưa bao giờ làm mới cache 5 phút của Anthropic, nên tác giả báo cáo 789 lần ghi lại toàn bộ và tốn thêm khoảng $1,430 trong giai đoạn 12/10–5/11.

**Đáng chú ý**

- **CPU cao trong các phiên macOS dài (issue #7730, đang mở, 30 bình luận).** Người dùng thấy CPU 50–110% với 600–800MB bộ nhớ, theo ghi nhận có liên quan đến độ dài ngữ cảnh hoặc phiên làm việc. Chưa có bản sửa nào được liệt kê.
- **Groq Qwen3.8 27B trả về HTTP 400 (issue #10741, đang mở).** Pi gửi role `developer`, mà template của Groq từ chối. Cách xử lý tạm: dùng provider hoặc model khác.
- **`getContextUsage()` ước tính quá cao sau lỗi mạng (issue #10287, đang mở).** Trên Pi 0.99.2, tác giả đo được mức nhảy từ ~42k lên 330,081 token sau một lần lỗi có thể thử lại.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

- **Phát hành v0.26.8.** Tính năng duy nhất được liệt kê là chạy hook `prompt.submit` trong terminal OpenTUI ([#16195](https://github.com/QwenLM/qwen-code/pull/16195)). Không có thay đổi gây lỗi nào được biết. Điều này quan trọng nếu bạn dựa vào hook `prompt.submit` và dùng terminal OpenTUI.
- **Phát hành TypeScript SDK v0.1.28.** Bản này đóng gói CLI phiên bản 0.26.8 (ghi chú cũng liệt kê 0.26.6 trong một khối thứ hai). Quan trọng khi ghim SDK và CLI cùng nhau.
- **Phát hành Desktop v0.26.8**, gồm một refactor dùng chung vòng lặp gửi sự kiện phiên Managed Agent ([#15952](https://github.com/QwenLM/qwen-code/pull/15952)).

**Đáng chú ý**

- Việc phê duyệt quyền cho agent trong workflow không bao giờ hiển thị; lượt chạy bị treo trong khi thanh trạng thái báo cần phê duyệt. Được báo trên 0.26.6 và tái hiện trên 0.26.8 ([#16425](https://github.com/QwenLM/qwen-code/issues/16425), 3 bình luận). Một bản sửa được đề xuất trong PR đang mở [#16432](https://github.com/QwenLM/qwen-code/pull/16432), chưa phát hành.
- Khôi phục tác vụ đến từ kênh GitHub ngừng chạy sau khi kho tác vụ phục hồi từ lỗi đọc lúc khởi động ([#16393](https://github.com/QwenLM/qwen-code/issues/16393), đã đóng). Ghi chú bản nightly 0.26.8 liệt kê một PR sửa lỗi ([#16402](https://github.com/QwenLM/qwen-code/pull/16402)) để giữ cơ chế khôi phục luôn sẵn sàng sau một lần đọc thất bại.
- Các lệnh gọi `write_file` quá lớn chỉ bị từ chối sau khi toàn bộ phản hồi được tạo xong, làm mất lượt thử ([#16417](https://github.com/QwenLM/qwen-code/issues/16417), 0.26.8). Dữ liệu không cho thấy có kiểm tra trước khi gửi.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*