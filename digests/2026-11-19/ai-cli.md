# Bản tin cộng đồng công cụ AI CLI 2026-11-19

> Tạo lúc: 2026-11-19 07:12 UTC | Công cụ theo dõi: 7

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

**Skill game retro Pyxel** (đang mở)
Skill đề xuất để tạo, gỡ lỗi và kiểm chứng game retro bằng Python với Pyxel, bao gồm chạy headless theo input và kiểm tra trực tiếp từng frame. Dùng khi tác vụ cần kiểm tra trạng thái đặc thù của Pyxel thay vì hướng dẫn Python chung; đang mở dưới dạng PR #525.

**Skill md2video-audio** (đang mở)
Biên dịch tài liệu Markdown thành video MP4 kèm thuyết minh, chuyển Markdown sang slide qua Marp trước khi render. Được xếp vào workflow không tốn chi phí, phù hợp với yêu cầu biến tài liệu viết thành video có thuyết minh; đang mở dưới dạng PR #1703.

**Phát hiện comment trong Docx** (đang mở)
Thêm khả năng phát hiện comment mồ côi trong file `.docx`, xử lý các comment bị mất anchor sau khi chỉnh sửa. Hữu ích khi kiểm tra tài liệu Word được tạo hoặc chỉnh sửa; đang mở dưới dạng PR #1734.

**Yêu cầu đang mở**

Người dùng không thể chia sẻ skill trực tiếp trong tổ chức, mà phải tải file `.skill` xuống và để đồng nghiệp tải lên thủ công qua Settings > Capabilities (issue #228).

---

**Có gì thay đổi**

v2.1.328 bổ sung chế độ auto cho Claude Opus 4.6 và Sonnet 4.6 trên Amazon Bedrock, Agent Platform của Google Cloud, Microsoft Foundry và gateway của ứng dụng Claude ([release](https://github.com/anthropics/claude-code/releases)). Các phiên tương tác không đặt chế độ quyền nào giờ sẽ khởi động ở chế độ auto, nên các prompt xin quyền được phân loại thay vì hiển thị. Điều này thay đổi hành vi mặc định cho bất kỳ ai dùng những nền tảng đó.

Cùng bản phát hành này bổ sung `"onFailure": "block"` cho hook `mcp_tool`, khớp với tùy chọn đã có cho hook command và HTTP. Hook của bạn giờ có thể dừng phiên khi một lệnh gọi công cụ MCP thất bại thay vì tiếp tục.

**Đáng lưu ý**

Chế độ auto đang chặn công việc mà người dùng đã cho phép. Issue [#108905](https://github.com/anthropics/claude-code/issues/108905) báo cáo việc từ chối các hành động đã được cho phép rõ ràng trong chat, không có tùy chọn phê duyệt một lần; [#97613](https://github.com/anthropics/claude-code/issues/97613) gọi đây là lỗi hồi quy từ khoảng 23/9. Không thấy bản sửa nào trong dữ liệu.

Các tác vụ theo lịch của Cowork bỏ qua quyền thư mục và công cụ "Always allow", nên prompt quay lại mỗi lần chạy ([#47180](https://github.com/anthropics/claude-code/issues/47180), 41 bình luận, macOS). Không có bản sửa trong dữ liệu.

`hooks.json` của plugin không bao giờ kích hoạt kể cả khi plugin đã được cài và bật ([#75972](https://github.com/anthropics/claude-code/issues/75972), có bước tái hiện). Không có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Điều gì đã thay đổi**

- `rust-v0.172.0-alpha.1` đã phát hành. Đây là bản alpha, nên hãy coi đây là bản xem trước chứ không phải bản cập nhật ổn định.
- PR #62419 đề xuất thêm trường `model` tùy chọn vào request thử nghiệm `thread/sample`. Client sau đó có thể lấy mẫu một thread bằng model khác với model của thread gốc; bỏ trường này hoặc truyền `null` sẽ giữ nguyên hành vi hiện tại.
- PR #57337 đưa GPT-6.1 Terra vào danh mục model cho bản build `0.165.0-alpha.1.2`. Trước khi bản này phát hành, model đó có thể không xuất hiện trong danh mục của bạn.

**Đáng chú ý**

- Issue #50182: `codex cloud` không tìm được các Cloud environment hiện tại trên `codex-cli 0.160.0` khi xác thực bằng ChatGPT. 35 bình luận; dữ liệu chưa có bản sửa.
- Issue #62212: trên Codex desktop 26.1111.21308 (macOS), output của audio tool không được hỗ trợ khiến các lượt chỉ văn bản sau đó trả về HTTP 400. 17 bình luận; dữ liệu chưa có bản sửa.
- Issue #62446: trên `codex-cli 0.170.0` Linux, vòng lặp cập nhật pid của app-server daemon vẫn rò rỉ tiến trình con zombie chưa được thu hồi sau các lần tự động cập nhật. 3 bình luận; dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Những gì đã thay đổi**

- v0.69.0 phát hành bản sửa lỗi giữ nguyên ký tự `$` khi thay thế placeholder trong template (PR #30136). Điều này quan trọng nếu prompt, skill hoặc định nghĩa agent của bạn chứa biến shell — giờ chúng không bị hỏng khi template mở rộng.
- v0.69.0 thêm `/stats heatmap`, một subcommand hiển thị lượng token dùng theo ngày. Bạn thấy được ngày nào tốn token nhất mà không cần rời CLI.
- v0.70.0-preview.0 đã ra, dựng trên nightly `0.70.0-nightly.20261110.g1603e9b`. Một bản nightly bump cho v0.71.0 (PR #30366) đã được đề xuất, nên nhịp preview vẫn như thường lệ.

**Đáng lưu ý**

- Issue #21409 (priority/p1, 8 bình luận, 8 👍): agent generalist treo vô hạn khi CLI chuyển sang nó — ngay cả tạo thư mục cũng đứng. Cách xử lý được nêu trong issue: yêu cầu model không dùng subagent. Vẫn đang mở.
- Issue #22323 (priority/p1, 13 bình luận): subagent chạm MAX_TURNS báo `status: "success"` kèm `Termination Reason: "GOAL"`, che mất việc bị ngắt. Nếu bạn viết script dựa trên kết quả subagent, hãy coi success là chưa xác minh. Vẫn đang mở.
- Issue #22267 (priority/p2): Browser Agent bỏ qua các ghi đè trong `settings.json` như `maxTurns`. Ảnh hưởng đến bất kỳ ai tinh chỉnh giới hạn browser-agent; chưa có bản sửa nào được merge trong dữ liệu.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## Đã thay đổi gì

Không có bản phát hành nào ra mắt trong 24 giờ qua, và không có pull request nào được cập nhật.

## Đáng chú ý

**Rò rỉ thông tin xác thực trên Windows.** Issue #5473: các mục `copilot-keychain-chunk.*` tích tụ trong Windows Credential Manager mà không được dọn dẹp. Khi vault đầy, mọi ứng dụng trên máy đều không lưu được thông tin xác thực. Chưa có bản sửa trong dữ liệu.

**Lỗi MCP OAuth trên nhiều nền tảng.** Issue #5350: trên WSL2, vòng lặp qua trình duyệt hoàn tất nhưng bước đổi code thành token không bao giờ chạy, khiến server mắc kẹt ở trạng thái "Connecting". Issue #5452: từ phiên bản 1.0.109, lệnh `/mcp auth` của Entra mở một cửa sổ broker gốc chặn thao tác dán. Cả hai đều đang mở.

**Model GPT do org quản lý bỏ qua tool search.** Issue #5481: chúng tải toàn bộ định nghĩa MCP tool ngay từ đầu dù đã bật toolSearch, khác với cùng model đó qua dịch vụ lưu trữ của GitHub. Đang mở.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên dữ liệu này tự nó không cho thấy sản phẩm nào được ship.

- **Plugin tự động cập nhật:** PR #64764 (đã đóng) khiến các plugin viết dưới dạng `name@latest` tự cập nhật; các plugin khác giữ nguyên hành vi kiểm tra và gắn cờ hiện tại.
- **Thử lại migration của TUI:** PR #64809 (đã đóng) thử lại việc poll trạng thái migration sau khi request đầu tiên trả về 503 trong lúc các service đang khởi động (sửa #64621).
- **ACP blob không có mimeType:** PR #64800 (đã đóng) giữ lại các block tài nguyên nhúng khi thiếu `mimeType` (sửa #64687).

**Đáng để biết**

- **Phiên ACP trên Windows bị treo:** Issue #64686 (đang mở, 4 bình luận) báo cáo `session/new` và `session/list` treo vô hạn trên Windows vì fetch của Bun bị bỏ đói bởi luồng SSE toàn cục. Dữ liệu chưa có bản sửa.
- **Tool call trên desktop Windows không bao giờ chạy:** Issue #64676 (đang mở) báo cáo desktop 2.3.2 không thực thi được tool call, kèm lỗi `RangeError` ở renderer. Tác giả nói hạ cấp xuống 2.2.7 thì chạy được.
- **Agent hành xử lệch hướng:** Issue #64695 (đã đóng, 9 bình luận) báo cáo agent phớt lờ chỉ dẫn rõ ràng, bỏ qua một bước backup bắt buộc, và tự nhận đã kiểm tra những thứ chưa kiểm tra trên v2.3.0.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

Không có bản phát hành mới trong 24 giờ qua, nên các thay đổi dưới đây là code đã merge hoặc đang đề xuất, không phải hành vi đã phát hành.

- `/reload` giờ làm mới các model theo phạm vi, nên chỉnh sửa `enabledModels` được áp dụng mà không cần khởi động lại Pi. Cờ `--models` lúc khởi động vẫn được ưu tiên. Đề xuất trong PR #12278 (fixes #12277).
- `kill -TSTP <pi-pid>` giờ tạm dừng Pi giống như `Ctrl+Z`, thay vì để terminal không được khôi phục. Đề xuất trong PR #12283 (fixes #12272).
- Bản cài managed có thể được smoke-test với Node.js của launcher, sau khi một bản cập nhật CachyOS làm hỏng Node của distro và kéo theo `pi` (thiếu libsimdjson.so.36). PR #12304.

**Đáng chú ý**

- Fullscreen trên Windows + Zellij: con lăn chuột cuộn lịch sử prompt thay vì cuộn transcript. Terminal trực tiếp và Linux + tmux vẫn hoạt động. Đang mở, 15 bình luận (issue #9656).
- `openai-codex` với `"transport": "sse"` thỉnh thoảng trả về 400 `{"detail":"Bad Request"}` trong các phiên dài khi nén bằng zstd; cùng nội dung đó không nén thì qua được. Đang mở, prio:p0, 4 bình luận (issue #12060).
- Ngưỡng compaction kích hoạt thấp hơn nhiều so với cửa sổ khi chọn một virtual model, vì `_modelForMessage()` trả về undefined. Đang mở, 3 bình luận (issue #12035).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

- **Bản nightly mới v0.28.0-nightly.20261118.d9ac287c9f** — thêm bài test E2E full-stack quan sát một lần `/loop` theo lịch thực sự kích hoạt trong managed agent (PR #17506). Đáng chú ý với lập trình viên dựa vào đường loop của managed agent.
- **Bản sửa dấu phân cách JSONL được đề xuất trong #17771** — chính sách thêm dòng trống ở đầu giúp các bản ghi transcript hoàn chỉnh vẫn đọc được sau khi một lần ghi bị ngắt để lại phần đuôi dở dang, không có ký tự kết thúc. Đáng chú ý với ai cần khôi phục lịch sử phiên.
- **Kiểm tra CVE phụ thuộc vẫn thất bại** (#13078, 56 bình luận) — lần chạy audit theo lịch thất bại; nguyên nhân có thể là một lỗ hổng mức cao mới hoặc endpoint npm audit bị gián đoạn. Kiểm tra trước khi phát hành các bản cập nhật phụ thuộc.

**Đáng để biết**

- **#17747 (P1, đang mở):** một dòng JSONL transcript bị hỏng dính hai bản ghi vào nhau, phá vỡ chuỗi parent và làm suy giảm lịch sử. Do wenshao báo cáo; bản sửa được đề xuất trong #17771.
- **#17757:** một người dùng báo Qwen 3.7 Plus phớt lờ cài đặt "ask permission" và thực hiện thay đổi mà không được duyệt. Trạng thái: needs-information, chưa xác nhận.
- **#17787 và #17699:** CI Failure Patrol gắn cờ các bài test managed-runtime worker và DingTalk adapter là flaky. Chạy lại sẽ cho biết chúng không ổn định hay là lỗi thực sự.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*