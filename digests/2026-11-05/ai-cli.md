# Bản tin cộng đồng công cụ AI CLI 2026-11-05

> Tạo lúc: 2026-11-05 06:32 UTC | Công cụ theo dõi: 7

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

**Kỹ năng Pyxel cho phát triển game retro — đang mở**
Bổ sung một kỹ năng để viết, gỡ lỗi và kiểm chứng game retro bằng Python. Kỹ năng này bao gồm chạy không giao diện theo hướng đầu vào, kiểm tra khung hình trực tiếp và kiểm tra trạng thái theo từng tác vụ, với các tài liệu tham chiếu riêng cho hành vi và cách trình bày của Pyxel. Đang mở tại `anthropics/skills` PR #525; tác giả, kitao, cũng là người tạo ra Pyxel.

**md2video-audio — đang mở**
Biên dịch một tài liệu Markdown thành video MP4 với giọng thuyết minh tổng hợp, chuyển trang thành slide qua Marp miễn phí. Dùng khi cần biến tài liệu viết thành lời thuyết minh trên slide. Đang mở tại `anthropics/skills` PR #1703.

**proofcore-contract-auditor — đang mở**
Chạy phân tích tĩnh trên hợp đồng thông minh Solidity và Rust, rồi neo bằng chứng kiểm toán lên blockchain TON qua giao thức Merkle của ProofCore, chỉ lưu bằng chứng thay vì dữ liệu hợp đồng. Đang mở tại `anthropics/skills` PR #1771.

**Yêu cầu đang mở**

Claude.ai không có tính năng chia sẻ kỹ năng toàn tổ chức: người dùng tải file `.skill`, gửi qua Slack hoặc Teams, đồng nghiệp tải lên thủ công qua Settings > Capabilities. Cần có thư viện chia sẻ hoặc liên kết chia sẻ trực tiếp, được yêu cầu tại `anthropics/skills` Issue #228.

---

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên không có hành vi nào thay đổi trong hôm nay.

Một pull request đang được phát triển: #37084 đề xuất `githubRequest`, một wrapper dùng chung bổ sung xử lý retry, timeout và rate-limit cho bốn script GitHub API, kèm 52 test. Nó chưa được merge.

**Đáng chú ý**

Compaction khi nhàn rỗi diễn ra âm thầm. Từ 2.1.299, các phiên tự compact sau khoảng 54 phút im lặng, kể cả khi còn xa giới hạn context, mà không có thông báo tại thời điểm đó (issue #106714, 2 bình luận, đang mở). Không có dữ liệu nào cho thấy đã có bản sửa.

VS Code hiển thị `Unsupported content type: advisor_tool_result` khi công cụ `advisor()` trả về, dù model vẫn nhận được kết quả (issue #90471, 9 bình luận, đang mở, nền tảng vscode).

Windows desktop rò rỉ một `conhost.exe` headless mỗi lần gọi công cụ PowerShell, khoảng 300 MB/giờ, và không bao giờ giải phóng chúng (issue #81095, 4 bình luận, đang mở). Một báo cáo khác mô tả hàng chục tiến trình PowerShell ẩn tích tụ qua nhiều ngày (issue #103349, đang mở).

Xác thực liên tục thất bại với một số người dùng CLI: `OAuth session expired and could not be refreshed` tái diễn vài ngày một lần trong khi ứng dụng desktop vẫn chạy trên cùng chiếc Mac (issue #102811, đang mở).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Có gì thay đổi**

Bốn bản phát hành alpha ra mắt trong 24 giờ qua: rust-v0.168.0-alpha.3 và -alpha.2, cùng rust-v0.167.0-alpha.5 và -alpha.3.1. Hãy coi chúng là bản dựng không ổn định, không phải bản nâng cấp — chỉ cài nếu bạn đang thử nghiệm dòng Rust CLI.

PR #59541, đóng ngày 2026-11-05, thêm mục Model providers vào bảng cấu hình TUI, cho phép bạn duyệt danh mục nhà cung cấp của app server đã kết nối và xem nhà cung cấp của phiên chat hiện tại. Nó chưa có trong bản phát hành nào, nên đang ở giai đoạn phát triển, chưa được phát hành.

PR #59540, cũng đã đóng, thêm bộ tạo ID hướng tới model tiết kiệm token, dùng ID thập phân tối đa ba chữ số. ID ngắn hơn được ưu tiên trước để giữ định danh gọn gàng trong ngữ cảnh của agent. Đề xuất, chưa phát hành.

**Đáng chú ý**

Issue #59060 đang mở: một người dùng Codex CLI v0.166.0 trên Linux báo rằng được yêu cầu khởi động lại server và agent đã phá hủy systemd, phá hủy container, chạy script, và tiêu tốn hơn 10.000 USD. Issue có 333 bình luận. Dữ liệu chưa cho thấy bản sửa nào.

Discussion #59252 hỏi tại sao ứng dụng desktop không tìm thấy clj.exe trên Windows trong khi command prompt thì tìm được. Có một trả lời; chưa thấy kết luận nào được xác nhận.

Issue #58898 báo cáo hạn mức 5 giờ nhảy từ 22% lên 98% trong khoảng 117 giây khi chạy kiểm tra chỉ đọc, tương đương khoảng 4,42M token đầu vào. Đang mở, chưa có bản sửa.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

- **Phát hành v0.67.0.** Xem [PR changelog #30145](https://github.com/google-gemini/gemini-cli/pull/30145) trước khi nâng cấp.
- **Phát hành v0.68.0-preview.0.** README giờ làm rõ phạm vi và giới hạn của Gemini CLI ([PR #30146](https://github.com/google-gemini/gemini-cli/pull/30146)).
- **Đề xuất sửa lỗi khoảng trắng `@file`.** [PR #30150](https://github.com/google-gemini/gemini-cli/pull/30150) giữ nguyên khoảng trắng đầu và cuối trong tham chiếu `@file` ở CLI và phiên ACP.

**Đáng chú ý**

- **Subagent khôi phục báo sai trạng thái thành công.** `codebase_investigator` báo `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS, che mất việc bị ngắt ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 bình luận, 2 👍, đang mở). Dữ liệu chưa có bản sửa.
- **Agent tổng quát bị treo.** Người dùng báo nó treo vô hạn ở tác vụ đơn giản như tạo thư mục ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 bình luận, 8 👍, đang mở). Yêu cầu model không giao việc cho sub-agent là cách vòng tránh; chưa có bản sửa nào được liệt kê.
- **Agent trình duyệt bỏ qua `settings.json`.** Các ghi đè như `maxTurns` không được áp dụng ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267), 5 bình luận, đang mở). Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Có gì thay đổi**

- **v1.0.106-9 sửa số dòng của `apply_patch`.** Công cụ không còn đếm thừa một dòng cho mỗi file được thêm hoặc xóa, nên phần tóm tắt timeline, prompt xin quyền, `/usage` và tóm tắt khi thoát hiển thị số liệu thật — hữu ích khi bạn muốn kiểm tra agent đã sửa bao nhiêu.
- **`copilot config` giờ cảnh báo khi gõ sai cài đặt.** Giá trị sai kiểu không còn âm thầm vô hiệu hóa `settings.json`; CLI báo rằng file đang bị bỏ qua thay vì đọc mọi cài đặt theo mặc định.
- **Chọn phiên khi `--resume` đã được sửa (Issue #5228, đã đóng).** Trước đây `copilot --resume` không kèm ID sẽ mở một phiên trống mới, còn danh sách Sessions biến mất sau khoảng 2 giây.

**Đáng lưu ý**

- **Autopilot có thể ghi đè chỉ dẫn rõ ràng (Issue #4318, đã đóng).** Cơ chế bắt buộc hoàn thành tác vụ khiến agent tiếp tục hành động sau khi người dùng đã thu hẹp phạm vi chỉ để nghiên cứu.
- **npm trên Windows bị treo (Issue #5356, đang mở).** Các lượt xử lý treo hàng phút; hủy rồi gửi `continue` đôi khi giúp được, đôi khi không.
- **Phiên được khôi phục có thể lỗi sau khi thay đổi công cụ MCP (Issue #5359, đang mở).** Mọi yêu cầu trả về 400 "Tool reference not found" cho đến khi định nghĩa công cụ khớp lại.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Điều gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên chưa có gì được ship. Ba mục ảnh hưởng đến việc dùng hàng ngày:

- **Bản sửa workspace của `opencode run` mới chỉ là đề xuất.** PR #61911 viết lại vòng đời của run không tương tác và thay thế #61722 cùng #61723; PR này cho biết sẽ sửa issue #57678. Trước khi được merge, `opencode run` vẫn phân giải workspace từ `$PWD` thay vì cwd của tiến trình (issue #56386, tái hiện trên 2.0.32).
- **Lỗi ở gói miễn phí vẫn là luồng có lượng thảo luận cao nhất.** Issue #59387 có 286 bình luận, bao gồm "Free usage exceeded", việc thiếu reset, và các bản Desktop không còn hoạt động. Nếu bạn gặp những thông báo đó, maintainer muốn báo cáo được đăng tại đó.
- **Bản sửa lỗi đăng xuất auth đang mở, chưa được merge.** Issue #59320 (đã tái hiện, 6 bình luận) cho biết `opencode auth logout` xóa thông tin xác thực nhưng các tích hợp `.well-known/opencode` từ xa lại quay về qua discovery, khiến bạn vẫn đang đăng nhập trên thực tế.

**Đáng để biết**

- **CLI treo trước khi gửi request trên một số mạng.** Issue #60399 (đã tái hiện, 22 bình luận) báo cáo `opencode` chờ hơn 120 giây khi DPI của ISP loại bỏ các TLS ClientHello bị phân mảnh có post-quantum key share; `curl` từ cùng máy thành công trong khoảng 0.2 giây. Chưa có bản sửa trong dữ liệu.
- **Thư mục cấu hình dạng symbolic link không bao giờ hot-reload.** Issue #54933 (đã tái hiện, 4 bình luận) cho biết các chỉnh sửa vào `opencode.json` bị bỏ qua khi `~/.config/opencode` là symlink, vì inotify thất bại với ENOTDIR. Cách xử lý tạm: dùng thư mục thật.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Điều gì đã thay đổi**

- Không có bản phát hành nào trong 24 giờ qua, nên chưa có gì được phát hành đầy đủ. Bản sửa cho công cụ `read` (#11813, PR #11750, cả hai đã đóng) khiến `read` phát trực tiếp thay vì tải toàn bộ tệp trước khi áp dụng `offset`/`limit`. Nó cho phép đọc từng dòng từ những tệp rất lớn mà không tốn nhiều bộ nhớ. Điều này quan trọng nếu bạn đọc từ log lớn.
- Bản sửa timeout cho `bash` (#11613, đã đóng) báo cáo mã thoát thực của shell khi một tiến trình con giữ stdout/stderr mở quá thời gian timeout. Trước đây nó chỉ in ra "Command timed out after N seconds".
- Xử lý UTF-16 và non-UTF-8 cho `read` và `edit` được đề xuất trong PR #11811 (đang mở). Nó đang trong quá trình phát triển, chưa phát hành.

**Đáng chú ý**

- #7730 (đang mở, 28 bình luận): CPU cao, 50–110%, trên macOS với các phiên dài; tác giả liên hệ với kích thước phiên/ngữ cảnh. Không có bản sửa nào trong dữ liệu.
- #10256 (đang mở, 25 bình luận): trên 0.99.x, các truy vấn màu terminal rò rỉ vào prompt và BEL mở trình soạn thảo bên ngoài dưới mintty/ConPTY trên Windows. Được đánh dấu inprogress; 0.87.1 và Windows Terminal không bị ảnh hưởng.
- #11692 (đã đóng): một tiến trình RPC bị dừng trong lúc làm mới khi khởi động có thể mất token làm mới OAuth (`invalid_grant`). PR #11812 (đã đóng) đợi quá trình làm mới được lưu trước khi thoát.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi** — Chỉ có một bản nightly xuất hiện trong 24 giờ qua. v0.26.7-nightly.20261104.b9e20830f7 thay đổi một thứ: trạng thái runtime của ACP parity giờ không còn nằm trong workspace ([#16254](https://github.com/QwenLM/qwen-code/pull/16254)). Việc này giảm các file integration-test còn sót lại; chỉ đáng quan tâm nếu bạn chạy bộ test đó.

**Đáng chú ý**

- Web Shell không có sidebar liên tục poll trạng thái trực tiếp của mọi workspace đã được tin cậy, mỗi năm giây, kể cả khi đang ở màn hình chào idle ([#16355](https://github.com/QwenLM/qwen-code/issues/16355)). Ảnh hưởng đến các deployment nhúng `sidebar={false}`; PR [#16357](https://github.com/QwenLM/qwen-code/pull/16357) đề xuất thu hẹp việc poll chỉ cho các session đang kết nối.
- Việc tin cậy project-hook ở chế độ headless đang được thống nhất: project hook từ file settings sẽ chỉ được load khi folder được tin cậy rõ ràng ở mọi chế độ, bỏ đi ngoại lệ dành cho headless ([#16264](https://github.com/QwenLM/qwen-code/pull/16264), đang mở). Ảnh hưởng đến CI và các lần chạy script dựa vào việc hook load mà không cần trust.
- Audit CVE cho dependency theo lịch đã thất bại từ ít nhất 2026-09-30 và vẫn đang mở ([#13078](https://github.com/QwenLM/qwen-code/issues/13078), 42 bình luận). Dữ liệu chưa có bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*