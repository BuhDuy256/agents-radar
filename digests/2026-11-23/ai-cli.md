# Bản tin cộng đồng công cụ AI CLI 2026-11-23

> Tạo lúc: 2026-11-23 07:22 UTC | Công cụ theo dõi: 7

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

## Skills đang được xem xét tại anthropics/skills — 2026-11-23

### md2video-audio — biên dịch Markdown thành video MP4 có thuyết minh
Bổ sung một skill chuyển tài liệu Markdown thành video MP4 thông qua slide Marp kèm track thuyết minh. Tác giả ghi là miễn phí hoàn toàn. Trạng thái: đang mở (anthropics/skills PR #1703).

### notion-spec-to-implementation — chuyển spec thành task Notion
Chuyển các trang spec sản phẩm hoặc kỹ thuật thành task triển khai trên Notion kèm tiêu chí nghiệm thu và theo dõi tiến độ. Đi kèm một skill thứ hai, quantitative-resume-auditor. Trạng thái: đang mở (anthropics/skills PR #1245).

### scnet-hpc — chạy job trên cluster SCNet
Hướng dẫn cấu hình SSH, tạo job Slurm và thiết lập module cho cluster SCNet HPC. Bao gồm partition, bộ nhớ, accelerator và dò tìm cluster. Trạng thái: đang mở (anthropics/skills PR #1615).

**Yêu cầu đang mở**

Issue anthropics/skills Issue #228 đề nghị chia sẻ skill trong toàn tổ chức trên Claude.ai: hiện tại người dùng tải file .skill, gửi qua Slack hoặc Teams, rồi đồng nghiệp tải lên thủ công trong Settings > Capabilities. Người bình luận muốn có thư viện dùng chung hoặc link chia sẻ trực tiếp. Trạng thái: đang mở, chưa được xử lý.

---

## Có gì thay đổi

Không có bản phát hành nào trong 24 giờ qua.

PR #95698 (đang mở, chưa phát hành) đề xuất đặt đường dẫn script trong dấu ngoặc kép và chạy các hook `ralph-wiggum` và `output-style` qua `bash`, sửa phần plugin đi kèm của #78490 và #95673.

## Đáng chú ý

**Tải lên Skills đang lỗi.** Issue #26310 [OPEN] báo cáo rằng tải lên Skills trả về "Internal server error" trên Claude Web và Desktop. 30 bình luận, 16 👍. Không có bản sửa trong dữ liệu.

**Sandbox hỏng trên Ubuntu 26.04.** Issue #105194 [OPEN] báo cáo rằng profile `bwrap-userns-restrict` của AppArmor từ chối `CAP_SYS_ADMIN`, khiến mọi lệnh Bash trong sandbox đều thất bại. 9 👍. Không có bản sửa trong dữ liệu.

**Lệnh Windows phá hoại.** Issue #111755 [OPEN] báo cáo rằng `Remove-Item -Recurse -Force` chạy trên một đường dẫn nằm trong biến `$HOME` chỉ đọc, xóa các thư mục profile người dùng. Báo cáo ngày 2026-11-23, 1 bình luận. Không có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Những gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Một bản sửa lỗi đã được hợp nhất: PR #63262 đóng lời nhắc tin cậy thư mục khi app server ngắt kết nối, nên một xác nhận đang chờ không còn có thể được xử lý trên kết nối đã đóng. PR #63219 đã đóng và loại trừ việc gán usage theo từng mục theo mặc định qua header `x-codex-exclude`. Chưa có gì ở đây được phát hành.

**Đáng chú ý**

Tính toán rate-limit vẫn là vấn đề mở hàng đầu: #41220 theo dõi các báo cáo về việc quota và credits cạn nhanh hơn mức người dùng dự đoán, với 100 bình luận và 21 👍 tính đến 2026-11-23. Chưa có bản sửa lỗi trong dữ liệu.

Các luồng Windows Work vẫn hỏng: #54564 và #62393 báo cáo nút Send vẫn bị vô hiệu hóa trong các cuộc trò chuyện mới, và #62918 bổ sung lỗi "Connection for host ID local not found" khi khởi động lại.

Trên macOS, #63078 báo cáo một phiên Local Full Access mới chạy dưới dạng managed workspace-write với mạng bị vô hiệu hóa. #62700, lỗi làm hỏng local skills trong slash menu, đã được đóng.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Những thay đổi**

- Bản phát hành nightly `v0.71.0-nightly.20261123.geecccfcd5` đã ra mắt, được bump trong PR #30411. Chỉ dùng nếu bạn theo dõi bản nightly.
- PR #30305 đề xuất sửa tài liệu extension đang khuyến nghị `"excludeTools": ["run_shell_command(rm -rf)"]`. Mục này chưa bao giờ khớp vì exclude tools được so sánh với tên tool đầy đủ, nên khối tài liệu đó không có tác dụng gì.
- PR #30404 đề xuất chỉ cắt `.json` ở cuối tên checkpoint. Tên sinh ra từ các file như `package.json` bị hỏng, khiến `/restore <name>` thất bại với lỗi "File not found".

**Đáng chú ý**

- Issue #21409 (8 bình luận, 8 👍) báo cáo agent generalist treo vô hạn ở các tác vụ đơn giản như tạo thư mục, chờ tới một giờ. Yêu cầu model không giao lại cho subagent sẽ tránh được lỗi này.
- Issue #22323 báo cáo subagent `codebase_investigator` trả về `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm MAX_TURNS, che mất việc bị ngắt.
- Issue #21983 báo cáo subagent trình duyệt lỗi trên Wayland.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Có gì thay đổi**

- Copilot CLI v1.0.115-7 sửa lỗi client `--ui-server` gắn vào phiên đã resume: giờ chúng kết nối được ngay khi server bắt đầu lắng nghe, nên gắn lại sau resume không còn phải chờ thiết lập phiên.
- Cùng bản phát hành này chặn Copilot CLI cài qua npm tiếp tục sống nền khi khởi động bị ngắt. Nếu bạn Ctrl-C lúc khởi động, tiến trình giờ thoát sạch thay vì treo lại.
- Đề xuất, chưa phát hành: PR #5554 thêm tùy chọn tạo connection token cho container CLI. Đặt `COPILOT_CONNECTION_TOKEN_GENERATE=true` sẽ in ra một token ngẫu nhiên mới lúc khởi động, cho phép client SDK cục bộ kết nối tới CLI headless trước khi phiên có thông tin xác thực GitHub.

**Đáng lưu ý**

- Công cụ Bash loại bỏ ký tự ngoài ASCII (Issue #3601). Shell khởi tạo với `LC_CTYPE=C`, âm thầm cắt bỏ chữ Trung, Nhật, Hàn, Latin có dấu và emoji khỏi câu lệnh; đường dẫn chứa các ký tự đó trở nên không thể truy cập. Đã đóng.
- Một client MCP khai báo extension Tasks trên `tools/call` nhưng từ chối `CreateTaskResult` (Issue #5555, đang mở, 0 bình luận). Server trả về `resultType: "task"` làm tool call thất bại, và `tasks/get` không bao giờ được gửi.
- Phiên cloud sandbox không kết nối lại sau tool call (Issue #5552, đang mở). Một người báo cáo nói phiên không nhận kết nối trực tiếp nào sau khi tool call xong, chỉ còn lịch sử chỉ đọc; GitHub Mobile ngắt phiên cloud khi chuyển sang nền (Issue #5553, đang mở).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Điều gì đã thay đổi**

Script Code Mode giờ có thể gọi trực tiếp OpenCode HTTP API bằng `fetch("opencode:///api/...")`. Đề xuất trong [PR #65725](https://github.com/anomalyco/opencode/pull/65725), request chạy trong cùng tiến trình và giữ nguyên trạng thái đăng nhập. Nhờ đó agent có thể liệt kê và đọc session, tạo và prompt session khác, kiểm tra job mà không cần gọi shell ra `opencode`. Tính năng đang phát triển, chưa phát hành.

Agent widget được đề xuất trong [PR #65261](https://github.com/anomalyco/opencode/pull/65261). Agent có thể hiển thị widget tương tác trong session bằng template PsychoScript kèm dữ liệu JSON, render native trên từng client. Vẫn đang mở, chưa phát hành.

Bản sửa đề xuất [PR #65621](https://github.com/anomalyco/opencode/pull/65621) làm phẳng tool namespace một lần, trước các provider adapter. Việc này xử lý [issue #52088](https://github.com/anomalyco/opencode/issues/52088), nơi một provider phẳng định nghĩa `crm_lookup` nhưng lựa chọn bắt buộc vẫn ghi là `crm.lookup`. Chưa có bản phát hành nào chứa nó.

**Đáng chú ý**

Thread theo dõi gói miễn phí [issue #59387](https://github.com/anomalyco/opencode/issues/59387) là nơi chính cho các báo cáo về gói miễn phí, với 406 bình luận.

Issue [#46358](https://github.com/anomalyco/opencode/issues/46358) báo cáo Plan mode từ chối ghi vào `/Users/<user>/.opencode/plan/003-example.md` trong khi lại đặt chính thư mục đó làm thư mục plan. Vẫn đang mở và đã tái hiện.

Issue [#65600](https://github.com/anomalyco/opencode/issues/65600) báo cáo `serve --service` thoát sạch sau khi location-services bị evict lúc rảnh, cắt client bên ngoài không cảnh báo. Chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Ba bản sửa đang được đề xuất hoặc đang thực hiện, chưa bản nào phát hành:

- PR #12400 (đã đóng) từ chối đầu vào gửi trong khi phiên đang được thay thế, sửa issue #12243 nơi prompt chạy trên phiên đã bị hủy. Quan trọng trong lúc `switchSession`, `newSession` hoặc `fork`.
- PR #12404 (đã đóng) cho phép hoàn thành tệp @ trên di động bằng thao tác chạm thay vì phải chấp nhận đầu vào. Đã thử trên Android Firefox và Chrome.
- PR #12421 (đang mở) thêm API `pi-classifier` vào `KnownClassifierApi` và export `PiClassifierOptions`. Mới đề xuất, chưa phát hành.

**Đáng chú ý**

- Issue #10256 (đang mở, 26 bình luận, đang xử lý): trên 0.99.x, phản hồi truy vấn màu terminal lọt vào prompt và BEL mở trình soạn thảo ngoài dưới mintty trên Windows với ConPTY. 0.87.1 không bị ảnh hưởng; Windows Terminal không sao.
- Issue #11950 (đang mở, đang xử lý): khi model gửi bash và read trong cùng một tin nhắn, cả hai chạy cùng lúc, nên read có thể trả về nội dung cũ trước khi lệnh chạy xong.
- Issue #8643 (đang mở, 17 bình luận, 10 👍): Bedrock từ chối ảnh lồng trong `toolResult.content` cho các model OpenAI. Tác giả đã có bản sửa và test hồi quy sẵn sàng.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

- **Phát hành v0.28.4 (23/11/2026).** Bản dựng desktop `desktop-v0.28.4` đi kèm trong đợt này. Dữ liệu phát hành không có ghi chú migration, nên coi đây là bản cập nhật thường kỳ.

- **Chế độ daemon cục bộ của Web Shell có thêm thư viện artifact theo workspace** với quét tăng dần và cập nhật dạng streaming ([#18071](https://github.com/QwenLM/qwen-code/pull/18071)). Artifact hiện ra ngay khi đang quét thay vì chờ quét xong, điều này quan trọng với workspace lớn.

- **Chat của Web Shell có thêm ChatSurface dùng chung, huy hiệu Continue và chip gợi ý.** ChatSurface được dùng chung thay vì riêng theo từng view, nên trạng thái chat nhất quán giữa các điểm vào của Web Shell. Đây là các tính năng trong dữ liệu phát hành v0.28.4.

**Đáng lưu ý**

- **Gemma 3 và Gemma 4 được xử lý như model chỉ có văn bản** ([#18136](https://github.com/QwenLM/qwen-code/issues/18136)). Hình ảnh không bao giờ được gửi với các tag Ollama (`gemma3:27b`, `gemma4:31b`) hay tên Hugging Face phục vụ qua vLLM. Dữ liệu không có bản sửa.

- **Trên Windows, tính năng tự động hoàn thành `@` và kéo thả âm thầm bỏ qua file có tên chứa dấu cách hoặc dấu ngoặc đơn** ([#18141](https://github.com/QwenLM/qwen-code/issues/18141)). Prompt được gửi đi mà không có file và không hiện lỗi.

- **CI chính có các lỗi chạy dài hạn** được theo dõi trong [#14724](https://github.com/QwenLM/qwen-code/issues/14724) (545 bình luận), [#11680](https://github.com/QwenLM/qwen-code/issues/11680) (106 bình luận), và [#11678](https://github.com/QwenLM/qwen-code/issues/11678) (68 bình luận). Đây là các báo cáo do bot tạo, chưa được xác nhận là lỗi ảnh hưởng đến người dùng.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*