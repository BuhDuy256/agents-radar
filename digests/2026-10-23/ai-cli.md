# Bản tin cộng đồng công cụ AI CLI 2026-10-23

> Tạo lúc: 2026-10-23 07:42 UTC | Công cụ theo dõi: 7

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

### md2video-audio — dựng Markdown thành MP4 có thuyết minh
Skill này biên dịch một tài liệu Markdown thành bộ slide qua Marp, rồi thêm thuyết minh để tạo ra MP4. Dùng khi cần biến một tài liệu viết thành video; pull request đang mở (anthropics/skills PR #1703).

### scnet-hpc — chạy job trên cụm SCNet
Skill này bao quát workflow SSH theo profile và Slurm cho các cụm SCNet HPC, gồm tạo job, hướng dẫn chọn partition và bộ nhớ, và dò tìm cụm. Dùng để gửi hoặc kiểm tra job tính toán trên SCNet; pull request đang mở (anthropics/skills PR #1615).

### document-typography — sửa lỗi typography trong tài liệu được tạo
Skill này nhắm vào lỗi ngắt dòng treo chữ, đoạn mồ côi và lệch số thứ tự trong tài liệu do Claude tạo. Dùng khi tài liệu phải đạt chuẩn typography; pull request đang mở (anthropics/skills PR #514).

**Yêu cầu đang mở**

- Issue #228 đề nghị chia sẻ skill trong toàn tổ chức trên Claude.ai: hiện tại người dùng phải tải file `.skill`, gửi qua Slack hoặc Teams, rồi từng đồng nghiệp phải tự tải lên thủ công trong Settings > Capabilities.

---

**Đã thay đổi**

v2.1.309 sửa hai lỗi liên quan đến việc thoát sandbox. Các lệnh Bash trong sandbox trên macOS và Linux không còn chạy file khởi động của shell bên ngoài sandbox trước mỗi lệnh. Riêng trên macOS, các mẫu glob `denyWrite` giờ áp dụng tại vị trí thật của đường dẫn khi thư mục của mẫu được truy cập qua symlink. Cả hai đều quan trọng nếu bạn dựa vào sandbox để ngăn các lệnh không đáng tin hoặc phá hoại, thay vì kiểm tra ở mức prompt.

**Đáng chú ý**

- [#85856](https://github.com/anthropics/claude-code/issues/85856) (OPEN, 15 bình luận): trên Windows với Git Bash, công cụ Bash giảm một nửa mọi dãy dấu gạch chéo ngược — `n` thành `ceil(n/2)` — trước khi bash phân tích lệnh, và việc trích dẫn không ngăn được. Ảnh hưởng đến người dùng Windows/MSYS2 khi nhập đường dẫn hoặc ký tự escape. Chưa có bản sửa trong dữ liệu.
- [#104519](https://github.com/anthropics/claude-code/issues/104519) (OPEN, 0 bình luận, v2.1.309): hai phiên chạy đồng thời trong các cửa sổ PowerShell riêng biệt trộn lẫn các tác vụ bash chạy nền. Ảnh hưởng đến bất kỳ ai chạy song song nhiều phiên Claude Code trên Windows.
- [#104509](https://github.com/anthropics/claude-code/issues/104509) (OPEN, 0 bình luận, đi kèm 2.1.308): trong ứng dụng desktop, bộ phân loại chế độ auto không bao giờ phê duyệt, nên mọi lệnh gọi công cụ đều yêu cầu xác nhận. Biến chế độ auto thành phê duyệt thủ công. Chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Những gì đã thay đổi**

Codex 0.164.0 thêm mười ô `/presets` được đánh số để lưu prompt và slash command tái sử dụng, truy cập qua menu bàn phím (#54380, #54381). Bạn giờ có thể đặt model, mức reasoning, tốc độ và hồ sơ quyền ngay trong dòng với tham số `/model` và `/permissions` (#54378, #54383). Cả hai tính năng có trong `rust-v0.164.0`, nên hữu ích khi bạn đổi model hoặc mức quyền giữa phiên thay vì khởi động lại.

Bản xem trước lần chạy đầu của v… có trong ghi chú phát hành nhưng bị cắt, nên chưa rõ phạm vi.

**Đáng để biết**

Issue #54841 (38 bình luận) báo rằng chế độ Work chặn gửi tin nhắn trong chế độ BYOK khi bật công cụ trình duyệt hoặc máy tính cục bộ; dữ liệu chưa cho thấy bản sửa. Issue #56378 (3 bình luận) chia sẻ bản vá writer-handoff tái lập được cho app-server, nhưng đây là tham chiếu thử nghiệm, không phải thay đổi đã merge. Issue #49464 đã đóng: GPT-6.1 Sol thiếu trong trình chọn model của VS Code (#49464).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Thay đổi gì

**Nightly v0.67.0-nightly.20261023.ga713410ab** phát hành hai bản sửa lỗi chính ([release](https://github.com/google-gemini/gemini-cli/pull/29887)). Metadata dùng token giờ được giữ lại và báo cáo theo từng lượt đã khớp ([#29834](https://github.com/google-gemini/gemini-cli/pull/29834)), và mọi lượt model có function call đều nhận thought signature ([commit](https://github.com/google-gemini/gemini-cli)). Dùng bản nightly này nếu bạn cần số token theo từng lượt chính xác hoặc dùng luồng function call.

**Đề xuất:** `gemini resume` có thể ngừng rò rỉ thư mục workspace. PR [#29890](https://github.com/google-gemini/gemini-cli/pull/29890) chỉ khôi phục các thư mục đã lưu sau khi `resumeChat` thành công, sửa lỗi [#29864](https://github.com/google-gemini/gemini-cli/issues/29864). Hiện tại, một lần resume thất bại để lại thư mục cũ trong ngữ cảnh workspace của bạn.

**Đề xuất:** các function call của subagent có thể xuất hiện lại trong task tree. PR [#29859](https://github.com/google-gemini/gemini-cli/pull/29859) giữ các call có trạng thái `executing` hiển thị thay vì để danh sách tool trống.

## Đáng chú ý

**Agent bị treo.** Khi Gemini CLI chuyển sang generalist agent, nó có thể treo vô thời hạn; người báo cáo đã chờ tới một giờ ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 bình luận, 8 👍). Yêu cầu model không dùng subagent sẽ tránh được. Chưa có bản sửa trong dữ liệu.

**GOAL báo thành công sai.** Một subagent `codebase_investigator` báo `status: "success"` sau khi chạm MAX_TURNS, che mất việc bị ngắt ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 bình luận). Đang mở, P1.

**Giới hạn tool.** Hơn 128 tool sẽ gây lỗi 400 ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)). Đang mở.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Có gì thay đổi**

Copilot CLI v1.0.103 (2026-10-22) sao chép mã gốc của phản hồi đã hoàn tất khi bạn bấm vào khối mã của nó, nếu bật cài đặt này. Các phiên ACP giờ tuân theo cài đặt sandbox đã lưu và cờ `--sandbox`/`--no-sandbox`, kể cả khi khôi phục phiên. Phản hồi từ cloud cũng giữ nguyên toàn bộ văn bản khi CLI kết nối lại sau khi mất kết nối.

**Đáng lưu ý**

Issue #5232 (đang mở, cập nhật 2026-10-23): ở chế độ quyền `manual`, một lệnh shell mà mọi đường dẫn tệp được tham chiếu đều nằm trong thư mục tin cậy sẽ chạy không cần nhắc. Người báo cáo nói rằng việc kiểm soát theo đường dẫn không thể biết một lệnh như `powershell.exe` hay `curl` sẽ làm gì. Dữ liệu chưa có bản sửa.

Issue #5238 (đang mở): sau ảnh thứ 50 trong một phiên, việc xóa ảnh cũ nhất kích hoạt nạp lại toàn bộ cache, điều mà người báo cáo gọi là tốn kém. Được báo cáo trên phiên bản 1.0.103.

Issue #5197 (đang mở, cập nhật 2026-10-22): nhập liệu bằng giọng nói bị segfault trên WSL2 sau khi cập nhật lên 1.0.100, khiến `/voice` kẹt ở trạng thái "Fetching voice models". Bốn bình luận, chưa có bản sửa nào được liệt kê.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Có gì thay đổi**

OpenCode v1.19.4 nâng runtime Bun đi kèm lên 1.4.4, bổ sung bản vá bảo mật cho Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket và `fetch`, đồng thời cập nhật chứng chỉ gốc lên NSS 3.131.1. Mọi bản cài đặt ở phiên bản này đều có sẵn các bản vá đó; hãy cập nhật nếu bạn phục vụ qua TLS hoặc dùng kết nối WebSocket.

Một bản vá hợp nhất hôm nay giúp `opencode run` và `opencode run --agent <id>` dùng `model` đã cấu hình của agent khi phiên bắt đầu mà chưa có model. Trước đây server rơi về mặc định chung (issue #55727, PR #58355). Điều này quan trọng với các lượt chạy headless và CI phụ thuộc vào model riêng của từng agent.

Hai PR MCP hợp nhất hôm nay: một PR ngăn các MCP server bị nhân đôi trong lần đối chiếu đầu (#58349), một PR dừng song song các MCP server khi tắt (#58351), giảm tình trạng treo khi khởi động lại.

**Đáng chú ý**

Compaction có thể kích hoạt sai model: `session.summarize` lưu model của nó vào lượt tiếp tục tổng hợp sau compaction, nên các lượt sau chạy trên model đó (issue #49386).

V2 không bao giờ tự tạo tiêu đề phiên, để nguyên "Untitled session", trong khi v1.18.x có tạo (issue #58176, đã tái hiện).

Trong v2, không thể hủy các subagent chạy nền (issue #36423, đang mở, 8 👍).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên mọi thứ dưới đây đang ở trạng thái xem xét, chưa phát hành.

- PR #11304 (đang mở) sẽ cho Pi khởi động khi một package đã cấu hình cài đặt thất bại, ghi nhận lỗi theo từng nguồn và tải phần còn lại. Hiện tại một package hỏng có thể làm hỏng cả quá trình khởi động.
- PR #11309 (đang mở) sẽ chờ các lượt `sendUserMessage` của extension trước khi command handler trả về, sửa #11238. Các extension gửi tin nhắn hiện mất tín hiệu hoàn thành.
- PR #11289 (đã đóng) dừng các nhóm tiến trình shell trên macOS trước khi kill, giảm trường hợp #11252 khi hủy `a; b` mà `b` vẫn chạy.

**Đáng chú ý**

- #11312 (đã đóng): `pi.exec()` làm hỏng UTF-8 bị tách qua các chunk stdout, trả về `"���好"` thay vì `"你好"`. Ảnh hưởng đến các extension đọc output đa byte.
- #11086 (đang mở, p0): ký tự lạ lọt vào ô nhập prompt trên terminal Windows khi CPU tải cao, tái hiện qua SSH vào Linux. Chưa có bản sửa nào được liên kết.
- Discussion #11306: `pi-continuity` tự động chạy tiếp các lượt bị dừng do giới hạn sử dụng của coding plan, ví dụ mức trần 5 giờ của OpenAI.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**
- v0.26.0-nightly.20261022 (`bf66a26c97`) phát hành tính năng lưu token của daemon qua PR [#15023](https://github.com/QwenLM/qwen-code/pull/15023). Token giờ tồn tại qua các lần khởi động lại daemon, nên bạn không phải xác thực lại một phiên `qwen serve` đang chạy. Điều này quan trọng với các agent chạy lâu bị khởi động lại giữa các lần chạy.
- Issue [#15077](https://github.com/QwenLM/qwen-code/issue/15077) đã đóng: danh sách phiên Managed Agent có thêm bộ lọc lưu trữ và tìm kiếm theo tiêu đề. Bạn có thể tìm các phiên cũ theo tên thay vì phải lật từng trang với con trỏ mờ. Hữu ích nếu bạn giữ nhiều phiên đã lưu trữ.
- PR [#15212](https://github.com/QwenLM/qwen-code/pull/15212) đã đóng: huy hiệu PR của phiên và bảng Pull requests hoạt động khi `gh` nằm ngoài `PATH`, sửa lỗi cho daemon macOS khởi động bằng launchd. Chỉ có hiệu lực khi được gộp vào một bản phát hành; dữ liệu cho thấy PR đã đóng, không phải ghi chú phát hành.

**Đáng chú ý**
- Issue [#15297](https://github.com/QwenLM/qwen-code/issue/15297) báo cáo 0.26.0 làm mất kết quả công cụ (~43 trong 1.663 lần gọi, một người dùng, Windows). Các chỉnh sửa vẫn được áp dụng, nhưng bạn có thể phải đọc lại file. Chưa có bản sửa trong dữ liệu.
- Issue [#15248](https://github.com/QwenLM/qwen-code/issue/15248): các bài test timing của runtime broker trong sdk-java flake 3/3 trên runner do GitHub host, chặn luồng nhanh cho PR từ fork. Chưa xác nhận bản sửa nào ở đây.
- Issue [#15324](https://github.com/QwenLM/qwen-code/issue/15324): một lệnh `write_file` qua ACP bị cắt do max_tokens vẫn được ghi xuống đĩa và báo là thành công. Ảnh hưởng đến Zed, VS Code companion, và `qwen serve`.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*