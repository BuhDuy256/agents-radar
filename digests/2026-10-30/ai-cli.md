# Bản tin cộng đồng công cụ AI CLI 2026-10-30

> Tạo lúc: 2026-10-29 16:21 UTC | Công cụ theo dõi: 7

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

### <tên skill — công dụng>
1. **algorithmic-art — wrapAround() giờ đã wrap đúng**
   `wrapAround()` trong `algorithmic-art` trả về `max` cho mọi giá trị âm và `0` cho mọi giá trị lớn hơn `max`; giờ hàm dùng phép modulo xử lý được số âm, giữ kết quả trong `[0, max)`. **Đang mở**, sửa #1897 (PR #1977).

2. **mcp-builder — hỗ trợ import mcp>=2 và custom header**
   Trong `mcp>=2.0.0`, `streamablehttp_client` được đổi tên thành `streamable_http_client`, và custom HTTP header được cấu hình qua `create_mcp_http_client` / `http_client` thay vì truyền trực tiếp dạng kwarg. PR này sửa các kết nối bị hỏng sau khi đổi tên. **Đang mở**, sửa #1668 (PR #1742).

3. **skill-creator — parse scalar trong YAML frontmatter chính xác**
   `parse_skill_md` tự tay cắt dấu ngoặc kép và nối các dòng tiếp nối, nên lệnh evaluation và tối ưu description có thể nhận metadata khác với YAML trong `SKILL.md`. Ví dụ, description thuần `Use for requests like "review my draft."` bị mất dấu ngoặc kép đóng. **Đang mở** (PR #1997).

**Yêu cầu đang mở**
- **Skill cộng đồng mạo danh namespace `anthropic/`** (Issue #492, 46 bình luận): skill do cộng đồng làm đang được phát hành dưới namespace `anthropic/`, khiến người dùng có thể cấp quyền cao cho những skill mà họ tưởng là chính thức. Đây là báo cáo bảo mật từ người dùng, không phải thay đổi đã được chấp nhận.
- **`run_eval.py` không bao giờ trigger skill** (Issue #556, 13 bình luận): tác giả báo cáo rằng `claude -p` không gọi được tool `Skill` hay `Read` cho các query kiểm thử, dẫn đến tỷ lệ trigger 0% trên mọi query.

---

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên không có gì được ship. Hai PR đã được cập nhật:

- **Sự kiện stop/prompt của Hookify** — PR [#32751](https://github.com/anthropics/claude-code/pull/32751) sửa các quy tắc cú pháp `pattern` đơn giản với `event: stop` hoặc `event: prompt`, vốn không bao giờ kích hoạt vì `config_loader.py` ánh xạ chúng sang một trường mà rule engine không resolve được cho những sự kiện đó. Đề xuất, chưa merge: các quy tắc stop/prompt của hookify vẫn im lặng cho đến khi nó được merge.
- **Plugin edit-verifier** — PR [#32755](https://github.com/anthropics/claude-code/pull/32755) thêm một hook PostToolUse để xác minh Edit thực sự được áp dụng thay vì mặc định là thành công. Đề xuất: lỗi edit âm thầm (lệch khoảng trắng, target đã bị sửa trước đó) là trường hợp nó nhắm tới.

**Đáng chú ý**

- **Cô lập Worktree từ chối Bash không có git** — Issue [#95122](https://github.com/anthropics/claude-code/issues/95122) báo cáo 75 lần từ chối trong 3 ngày trên 2.1.272/2.1.273 cho các lệnh gọi không có `git`, chỉ dùng đường dẫn nội bộ worktree, bao gồm đọc `$VAR`, `"$(…)"`, vòng lặp và heredoc sau `&&`. Dữ liệu không có bản sửa; một repro và 6 bình luận.
- **`--max-turns` trong chế độ headless** — Issue [#105974](https://github.com/anthropics/claude-code/issues/105974) báo cáo cờ này không được thực thi nhất quán dưới `-p`. Đã đóng 2026-10-29, cùng ngày được mở.
- **Phiên Remote Control sau auto-update** — Issue [#103005](https://github.com/anthropics/claude-code/issues/103005) báo cáo auto-update trên desktop khi khởi động lại sẽ archive các phiên Remote Control đang hoạt động mà không khôi phục chúng; từ điện thoại chúng biến mất và hiển thị "Remote c…". Đang mở, 5 bình luận, không có bản sửa nào được liệt kê.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Có gì thay đổi**

- Rust CLI 0.166.0-alpha.6 và 0.166.0-alpha.5.1 đã được phát hành (rust-v0.166.0-alpha.6, rust-v0.166.0-alpha.5.1). Cả hai đều là bản alpha, nên chỉ dùng nếu bạn theo dõi các phiên bản CLI trước khi phát hành chính thức.
- Đề xuất, chưa phát hành: PR #58045 thêm checkpoint lệnh được quản lý, yêu cầu phê duyệt mới từ người dùng, độc lập với các phê duyệt đã lưu hoặc hook. Nếu được hợp nhất, nó thay đổi những lệnh mà policy có thể buộc phải nhắc.
- Đề xuất, chưa phát hành: PR #57870 bật cắt ngắn output phía server cho các phiên Code Mode, vốn trước đây xử lý output hoàn toàn phía client, khiến ngân sách quan sát phía server không được dùng.

**Đáng chú ý**

- Tiện ích mở rộng VS Code 26.51021.22027 không khởi động được giao diện trên Windows (Issue #56655, 36 bình luận); lỗi tương tự trên macOS Intel ở phiên bản 26.1021.22027 đã được xử lý tạm bằng cách quay về 26.1007.21434 (Issue #56660). Dữ liệu không liệt kê bản sửa lỗi nào.
- Cấp phát sandbox trên Windows thất bại với tài khoản không nâng quyền: 26.1023.6621.0 báo `helper_sandbox_lock_failed` (Issue #57617) và lỗi 5 khiến hồ sơ người dùng ở mức Low integrity, làm hỏng biểu tượng và thông tin đăng nhập Edge (Issue #58107).
- Làm việc từ xa trên Windows ngừng cập nhật với các lần ngắt kết nối lặp lại trên 26.1021.31345 (Issue #58097).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Đã thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua. Các PR đang mở đề xuất thay đổi hành vi mà bạn có thể sớm gặp:

- **Kiểm soát thay thế lệnh (PR #30029, đề xuất):** thêm cài đặt `security.allowCommandSubstitution`, mặc định `false`, thay thế cho việc chặn vô điều kiện cứng nhắc `$()`, dấu backtick và `<()`/`>()`. Chế độ YOLO sẽ bỏ qua kiểm tra này. Đáng quan tâm nếu bạn cần thay thế lệnh trong shell tools ngay bây giờ.
- **Hỗ trợ hủy cho đọc nền (PR #29977, đề xuất):** `read_background_output` hiện bỏ qua tín hiệu hủy, nên một lệnh gọi đã bị hủy với `delay_ms` vẫn tiếp tục chờ rồi đọc log. PR này từ chối thẳng các lệnh gọi đã bị hủy.
- **Sửa lỗi trùng lặp khi thử lại (PR #30020, đề xuất):** khi thử lại giữa luồng, các lệnh gọi công cụ từ cả lần thất bại và lần thành công đều được thu thập và thực thi, nên các lệnh có tác dụng phụ có thể chạy hai lần.

**Đáng chú ý**

- Agent tổng quát bị treo: Issue #21409 (8 bình luận, 8 👍) báo cáo `gemini-cli` treo vô hạn khi chuyển sang agent tổng quát, kể cả với thay đổi đơn giản như tạo thư mục. Chưa có bản sửa trong dữ liệu.
- Cấu hình browser agent: Issue #22267 báo cáo Browser Agent bỏ qua các ghi đè `settings.json` như `maxTurns`. Chưa có bản sửa trong dữ liệu.
- Báo cáo sai thành công của subagent: Issue #22323 báo cáo subagent `codebase_investigator` trả về `status: "success"` và lý do kết thúc `GOAL` sau khi đạt MAX_TURNS.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## Có gì thay đổi

Không có bản phát hành nào ra mắt trong 24 giờ qua, nên không có tính năng hay bản sửa lỗi mới nào được phát hành.

Hai mục đã đóng có thể quan trọng nếu bạn gặp phải: #4613 báo cáo rằng schema công cụ MCP bị tiêm sớm từ 1.0.80, thêm 354K token khởi động vào những prompt đơn giản; #4710 báo cáo rằng một phiên `copilot --yolo` nhàn rỗi vẫn giữ luồng `copilot-file-search` chạy, ghim một nhân CPU và ghi log không giới hạn. Cả hai đều được đánh dấu CLOSED, nên hãy kiểm tra phiên bản của bạn.

Đề xuất nhưng chưa phát hành: #5275 yêu cầu một allowlist công cụ nghiêm ngặt trong chế độ không tương tác, vì `--deny-tool` hiện đang ghi đè `--allow-tool`. Đang mở, một bình luận.

## Đáng chú ý

#5254: một phiên được khôi phục trên 1.0.103 đạt 37,3 GiB bộ nhớ vật lý sau 6 giờ 19 phút chạy các agent song song. Đang mở, hai bình luận; không có bản sửa lỗi trong dữ liệu.

#552: `/login` trả về `Failed to list models: 403 unauthorized` cho một tổ chức đã bật Copilot CLI, trên 0.0.355. Mở từ 2025-11-13, 31 bình luận; chưa giải quyết.

#5205: việc chuyển tiếp cửa sổ ngữ cảnh thất bại với lỗi "checkpoint.md is absent for this agent", làm sập các phiên chạy dài. Đang mở.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Điều gì đã thay đổi**

- v2.2.1 bổ sung `/goal <objective>`, giữ một phiên chạy cho đến khi người đánh giá xác nhận mục tiêu đã đạt. Điều khiển bằng `/goal pause`, `/goal resume`, hoặc `/goal clear` từ TUI hoặc Desktop (#59437).
- `process-daemon` v0.3.3 phát hành `opencode-pty` 0.3.3 (giao thức 7), công bố lên npm với tên `@opencode/pty@0.3.3`. PR #60276 đề xuất chuyển phụ thuộc PTY của core từ `@opencode-ai/pty@0.3.1` sang bản này.
- PR #60120 đề xuất giới hạn cập nhật tiến độ của `execute` tối đa một lần mỗi 100 ms. Hiện tại mỗi lần bắt đầu và kết thúc một lệnh gọi lồng nhau đều gửi một cập nhật kèm toàn bộ các dòng từ trước đến giờ, nên N lệnh gọi tạo ra 2N cập nhật ngày càng lớn.

**Đáng chú ý**

- Nhiều người dùng báo hạn mức tin nhắn miễn phí không được đặt lại hoặc đặt lại quá muộn ở cả v2.2.0 và v2.2.1 (#60131, #60132, #60080). Issue #60124 đã đóng ở trạng thái chờ đóng; dữ liệu không cho thấy bản sửa nào.
- Đóng ứng dụng không dừng các agent đang chạy; một người dùng báo một agent tiếp tục chạy hàng giờ (#55214, 7 bình luận). Vẫn đang mở.
- Chế độ tự động bắn thông báo quyền sai lặp đi lặp lại vì việc phê duyệt diễn ra ở phía client sau khi server phát yêu cầu (#47545, 17 bình luận). Đã đóng.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua. Hai bản sửa đã được hợp nhất: PR #11577 khiến `resizeImageInProcess` trả về ảnh nhỏ hơn giữa PNG và JPEG, nên ảnh giống ảnh chụp không còn bị gửi dưới dạng PNG quá khổ; PR #11565 ngừng ghi các dấu nhắc OSC 133 trong chế độ TUI thông thường, vốn đã ẩn chỉ báo đang làm việc trong Rex và iTerm2 3.7.5+. PR #11572 ngừng thử lại lỗi giới hạn sử dụng của Zhipu/Z.ai (HTTP 429, mã 1308), nên giới hạn gói không còn đốt lượt thử lại. Không bản nào trong số này là bản phát hành có gắn thẻ — hãy kiểm tra phiên bản của bạn trước khi dựa vào chúng.

**Đáng để biết**

Issue #7547 (91 bình luận, đang mở) hỏi cách mọi người chạy Pi trên Windows và nên dồn sức vào đâu; hãy coi đây là luồng hiện tại cho các vấn đề thiết lập trên Windows. Issue #9549 báo cáo rằng các bản ghi lớn kết xuất lại mỗi khung hình và mỗi lần thay đổi kích thước lại phát lại toàn bộ bản ghi, làm một nhân CPU quá tải trên Windows Terminal với 2 nhân logic; người báo cáo đã kiểm chứng bằng `pi -ne`. Không có bản sửa nào xuất hiện trong dữ liệu này. Discussion #11503 mô tả `pi-rs`, một bản chuyển Rust bên ngoài theo giấy phép MIT của phần lõi headless trong pi 0.74.2, kèm một phát hiện về tương thích API DeepSeek; nó độc lập với repo chính.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

- **v0.26.4 đã ra mắt.** Các view UI được tạo giờ tuân theo theme của host ([#15798](https://github.com/QwenLM/qwen-code/pull/15798)). Chưa có thay đổi phá vỡ nào được biết. Đáng lưu ý nếu bạn xây dựng hoặc nhúng các view được tạo và trước đây phải khớp theme thủ công.
- **Desktop v0.26.4 có bản sửa lỗi config.** Các control trước đây bị bỏ qua giờ được báo cáo lại ([#15794](https://github.com/QwenLM/qwen-code/pull/15794)). Đáng lưu ý khi một cài đặt có vẻ bị bỏ qua: bạn nhận được báo cáo thay vì im lặng. Desktop v0.26.3 đã thêm quy tắc quyền cho session và Auto approval ([#15448](https://github.com/QwenLM/qwen-code/pull/15448)).
- **SDK TypeScript v0.1.26 đã phát hành** ([PR #15876](https://github.com/QwenLM/qwen-code/pull/15876)), đi kèm CLI 0.26.4.

**Đáng để biết**

- **`contextWindowSize` đang bị tự động xóa** ([#15855](https://github.com/QwenLM/qwen-code/issues/15855), P1, đang mở, cần thêm thông tin). Một người dùng báo cáo trên Ollama với `qwen3.8:27b`; chưa có bản sửa trong dữ liệu.
- **Smoke test của Web Shell thất bại trên mọi PR** ([#15861](https://github.com/QwenLM/qwen-code/issues/15861), P1, đang mở, sẵn sàng cho agent). Thất bại tại `web-shell.host-directory-picker.spec.ts:90`, không phụ thuộc vào nội dung PR.
- **stream-json của SDK đổi message id sau khi thinking** ([#15875](https://github.com/QwenLM/qwen-code/issues/15875), đang mở, 2 bình luận). `message.id` trong bản chụp văn bản khác với id trong `message_start` trước đó; chưa có bản sửa trong dữ liệu.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*