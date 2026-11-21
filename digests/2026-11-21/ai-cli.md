# Bản tin cộng đồng công cụ AI CLI 2026-11-21

> Tạo lúc: 2026-11-21 06:55 UTC | Công cụ theo dõi: 7

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

## Claude Code Skills — 2026-11-21

**mcp-builder: sửa lỗi import streamable HTTP client** — Cập nhật `skills/mcp-builder/scripts/connections.py` để skill chạy được với `mcp>=2.0.0`, phiên bản đổi tên `streamablehttp_client` thành `streamable_http_client`. Custom HTTP header giờ truyền qua `create_mcp_http_client` / `http_client` thay vì kwarg trực tiếp. Đang mở. (anthropics/skills PR #1742)

**skill-creator: đánh giá trigger tách biệt và hỗ trợ Windows** — Sửa lỗi bỏ sót nhầm và điểm không hợp lệ trong đánh giá trigger, khi các lệnh probe của từng worker tranh nhau, `select()` trên pipe của subprocess lỗi trên Windows, và các tool không liên quan làm dừng quá trình quét. Tác giả cho biết lỗi runtime trước đây bị tính là không trigger, khiến ví dụ âm được đánh giá đạt sai. Đang mở. (anthropics/skills PR #1298)

**webapp-testing: bỏ shell=True khỏi with_server.py** — Thay `subprocess.Popen(..., shell=True)` trong `skills/webapp-testing/scripts/with_server.py`, vốn dùng để hỗ trợ chuỗi `cd <dir> && <command>`. Thay đổi này loại bỏ nguy cơ command injection (CWE-78) từ chuỗi lệnh không được làm sạch. Đang mở. (anthropics/skills PR #1980)

**Yêu cầu đang mở**

Không thể chia sẻ skill trong nội bộ tổ chức: người dùng phải tải file `.skill`, gửi qua Slack hoặc Teams, rồi đồng nghiệp tải lên thủ công trong Settings > Capabilities. Một thư viện chia sẻ hoặc link chia sẻ trực tiếp sẽ thay thế bước thủ công đó (anthropics/skills Issue #228).

---

**Những gì đã thay đổi**

- v2.1.330 thêm tính năng đăng nhập vào các tổ chức được quản lý trong Enterprise Admin Console của Anthropic. Sau lệnh `claude auth login`, Claude Code áp dụng cài đặt của tổ chức và dùng nhà cung cấp cloud hoặc gateway của tổ chức đó. Điều này quan trọng nếu tổ chức của bạn quản lý quyền truy cập tập trung.
- Cùng bản phát hành này còn có "easel", một mod tích hợp sẵn giúp vẽ biểu đồ khi được yêu cầu và hiển thị kết quả dưới chỉ số MCP. Nó có trong v2.1.330, nên hãy cập nhật để dùng.
- PR #41447, "feat: open source claude code", mới chỉ được đề xuất, chưa phát hành. PR đang mở và sẽ đóng các issue #59, #456, #2846, #22002 và #41434 nếu được merge.

**Đáng chú ý**

- Tính năng tự động cập nhật trên desktop có thể thoát và khởi động lại ứng dụng khi bạn không có mặt, làm rớt các phiên Remote Control: issue #95364, 24 👍, đang mở. Một báo cáo thứ hai (#111476) cho biết Remote Control chỉ kết nối lại sau khi bạn gửi tin nhắn từ máy Mac.
- Trên Windows, file env hook của công cụ Bash (`CLAUDE_ENV_FILE`) phình ra sau mỗi lần compact, và một dòng export bị đứt khiến mọi lệnh thất bại với mã thoát 127: issue #78146, đang mở, có bước tái hiện.
- Desktop (Windows) hiện lời nhắc tin cậy workspace cho mọi liên kết `claude://code/new?folder=`, kể cả với thư mục đã được tin cậy: issue #111488, đang mở.

Dữ liệu phát hành không cho thấy bản sửa nào cho những vấn đề này.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Có gì thay đổi**

- Bản phát hành `rust-v0.173.0-alpha.4` (cùng `.3` và `.2`) ra mắt ngày 2026-11-21. Đây vẫn là bản alpha tiền phát hành, nên hãy coi nó là kênh thử nghiệm thay vì nâng cấp mặc định.
- Tóm tắt suy luận đang chuyển sang mặc định tự động. PR #62904 và #62903 là các đề xuất đã đóng nhằm đặt `concurrent_reasoning_summaries` ở trạng thái ổn định và dùng tóm tắt tự động trong TUI, nên cách gửi tóm tắt phụ thuộc vào bản build được phát hành.
- `/config` có thể có thêm trình chọn tóm tắt suy luận (PR #62905) với các lựa chọn Auto, Concise, Detailed hoặc None, được lưu thành `model_reasoning_summary` cho các cuộc trò chuyện mới.

**Đáng chú ý**

- Lịch sử trò chuyện trong VS Code không giới hạn theo workspace. Issue #25319 vẫn mở với 64 bình luận, nên người dùng extension có nhiều dự án vẫn dùng chung lịch sử hội thoại.
- Xem trước tệp và ảnh trên desktop Windows có thể bị treo với lỗi `fs/readFile AbsolutePathBuf` (#49891, đang mở, 5 bình luận). Chưa có cách khắc phục tạm thời nào được mô tả.
- Người dùng Windows và WSL báo cáo rằng tự động di chuyển khiến dự án không còn cuộc trò chuyện nào dù lịch sử vẫn nguyên vẹn (#62735, đang mở, 3 bình luận). Dữ liệu chưa cho thấy bản sửa lỗi nào.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Đã thay đổi gì

**Sửa lỗi đường dẫn home trên Windows.** v0.71.0-nightly.20261121.geecccfcd5 ([release](https://github.com/google-gemini/gemini-cli)) mở rộng các đường dẫn tương đối với home viết bằng `~` và dấu gạch chéo ngược. Điều này quan trọng khi bạn truyền đường dẫn Windows cho CLI và trước đây gặp lỗi thư mục chưa được giải quyết.

**Resume phiên chọn phiên đang hoạt động.** Cùng bản release này resume phiên *đang hoạt động* gần nhất thay vì phiên *được bắt đầu* gần nhất. Nếu bạn mở nhiều phiên cùng lúc, `--resume` giờ sẽ đưa bạn về phiên bạn làm việc cuối cùng.

**Đề xuất sửa chế độ YOLO.** [PR #30268](https://github.com/google-gemini/gemini-cli/pull/30268) sẽ ngăn các kiểm tra taint và build-file nhắc nhở hoặc từ chối thẳng các chỉnh sửa trong các lần chạy `--approval-mode=yolo` đáng tin cậy. PR đang mở, chưa phát hành.

## Đáng chú ý

**Agent generalist bị treo.** [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409) (8 bình luận, 👍 8) báo cáo agent generalist treo vô thời hạn với các tác vụ đơn giản; một người dùng đã đợi cả tiếng đồng hồ. Yêu cầu model không chuyển sang subagent là cách xử lý tạm. Dữ liệu chưa có bản sửa.

**Lỗ hổng phát hiện `rm` nguy hiểm.** [PR #30171](https://github.com/google-gemini/gemini-cli/pull/30171) (đã đóng) xử lý thứ tự cờ của `rm`, nhưng dữ liệu không xác nhận nó đã được phát hành.

**Nhiều tool gây lỗi 400.** [Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246) báo cáo lỗi 400 khi có hơn 128 tool khả dụng.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

- v1.0.115-5 thu gọn các phiên cục bộ chạy dài trên ổ đĩa và khôi phục chúng nhanh hơn, nên lịch sử lớn tốn ít dung lượng hơn và mở sớm hơn. Đáng quan tâm nếu bạn giữ phiên sống qua nhiều ngày.
- v1.0.115-4 ngăn một lỗi tranh chấp khi khởi tạo plugin khiến phiên mới bị chặn hoặc hỏng việc khôi phục phiên. Windows cũng dọn tiến trình con từ lệnh Git, hook và kiểm tra language server.
- v1.0.115-2 bật truy vấn gói sandbox trên Windows theo mặc định. Tắt bằng `sandbox.userPolicy.capabilities: []`. Trên macOS, `sandbox.userPolicy.seatbelt.extraMachLookups` cho phép tra cứu dịch vụ Mach cụ thể mà không cần bật quyền truy cập Keychain.

**Đáng để biết**

- Issue #5478 (8 bình luận, đang mở): trên Windows, Cortex XDR báo "parent_process_spoofing" và kill shell khởi chạy khi Copilot CLI spawn `git`. Chưa có bản sửa.
- Issue #5541 (đang mở, cần người xử lý): agent trích dẫn sai trong lệnh WSL `rsync -a --delete` đã xóa sạch ổ đĩa của người dùng. Chưa có bản sửa.
- Issue #5220 (17 👍, đang mở): prompt caching của Claude dùng TTL 5 phút, nên khoảng nghỉ tương tác bình thường khiến đọc lại toàn bộ. Chưa có bản sửa.
- Issue #5536 (đang mở): một hộp thoại xin quyền reset hộp thoại câu hỏi đang mở, buộc người dùng nhập lại câu trả lời. Chưa có bản sửa.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên các mục dưới đây chỉ là đề xuất, chưa được phát hành.

`opencode upgrade` từ 2.2.7 lên 2.3.2 có thể lỗi giữa chừng khi tải trên Linux; người dùng báo trong issue [#65253](https://github.com/anomalyco/opencode/issues/65253). Trong lúc chờ sửa, hãy nâng cấp thủ công.

Người dùng Windows với `"shell": "cmd"` gặp dấu ngoặc kép bị escape trong mọi lệnh (issue [#64573](https://github.com/anomalyco/opencode/issues/64573)). Đối số trong ngoặc kép đến dưới dạng literal `\"...\"`. Một PR đang mở sửa lỗi streaming cho giá trị chuỗi với các provider tương thích OpenAI ([#65335](https://github.com/anomalyco/opencode/pull/65335)).

Đề xuất: `opencode machine add|list|remove` sẽ nhận `--server` ([#65340](https://github.com/anomalyco/opencode/pull/65340)), và liên kết máy sẽ mang theo Iroh cho những máy không có địa chỉ công khai ([#65341](https://github.com/anomalyco/opencode/pull/65341)). Cả hai đều nằm sau cờ `machines`.

**Đáng chú ý**

Thread về gói miễn phí [#59387](https://github.com/anomalyco/opencode/issues/59387) là nơi tập trung báo cáo chính; thông tin reset sau khi hết hạn mức chưa được xác minh. Desktop 2.3.2 trên Windows mở lại `%USERPROFILE%` thay vì project đã chọn ([#65309](https://github.com/anomalyco/opencode/issues/65309), đã đóng). Một quy tắc hỏi `external_directory` được nạp nhưng không bao giờ hiện prompt trên Windows ([#65290](https://github.com/anomalyco/opencode/issues/65290), đang mở).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Thay đổi gì

**Pi v1.6.0 phát hành GPT-6.2 Astra và GPT-6.2 Sol** trên các provider `openai`, `azure` và `openai-codex`. Sol giờ là model mặc định trên cả ba, nên các cấu hình hiện có sẽ tự chuyển sang khi nâng cấp.

**Một lỗi p0 trong v1.6.0: `--thinking high`/`xhigh` trên các model GPT-6 gửi `reasoning.effort: "medium"`.** Cờ `compat.supportsMidConvoEffort: true` thêm vào các entry `openai-codex` cho gpt-6-astra, gpt-6-sol, gpt-6.2-sol và những model khác ghi đè mức effort bạn chọn (#12361). Báo cáo ngày 2026-11-20; chưa có bản sửa trong dữ liệu.

**Request Bedrock bị treo khi đặt `HTTPS_PROXY` cùng profile SSO** (#12353). Client Bedrock runtime nhận được handler hiểu proxy, nhưng chuỗi credential của AWS tự dựng các client SSO riêng không có proxy, nên request timeout sau 120s+ trên 1.6.0. PR sửa lỗi (#12365) đã đóng và được merge vào dữ liệu.

## Đáng chú ý

**Anthropic `/login` thất bại trên ghế Claude Team với lỗi `Unknown scope: user:i…`** (#12318, p0, đang xử lý). Tài khoản thuộc Team/Enterprise không thể xác thực; request bị từ chối trước màn hình đồng ý. 4 bình luận; bản sửa đang được phát triển.

**`pi -p` ở chế độ headless không thoát khi một MCP server stdio vẫn còn kết nối** (#12238). Kết quả được in ra nhưng tiến trình treo đến khi bị kill; các server lỗi lúc khởi động thì không chặn thoát. Chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Những thay đổi

- v0.28.3 đã phát hành. Không có thay đổi gây hỏng nào được biết. ([release](https://github.com/QwenLM/qwen-code/releases))
- Web Shell giờ giải thích các tác vụ chạy nền ngay từ chip trong ô soạn thảo (#17398), nên các lần tiếp diễn tự động của `/loop` và cron được mô tả ngay tại chỗ bạn gõ. ([PR #17398](https://github.com/QwenLM/qwen-code/pull/17398))
- PR #18008 đề xuất `qwen daemon status --offline`, đọc mức chiếm dụng slot listener từ một snapshot cục bộ được làm mới mỗi năm giây. Chưa phát hành. ([PR #18008](https://github.com/QwenLM/qwen-code/pull/18008))

## Đáng chú ý

- `qwen serve` trên các triển khai chạy dài có thể khóa luôn `/health`: các luồng SSE sống lâu làm cạn pool listener, và một `--port` chỉ định rõ có thể âm thầm khởi động daemon trùng lặp (#17479, đo trên qwen 0.27.3). Issue #18004 theo dõi việc đọc mức chiếm dụng offline. ([#17479](https://github.com/QwenLM/qwen-code/issues/17479), [#18004](https://github.com/QwenLM/qwen-code/issues/18004))
- Cổng Managed Agent có thể merge khi đang đỏ, nên bộ test Java của main sau đó fail với mọi PR đụng vào phạm vi đó (#17039, nay đã đóng). ([#17039](https://github.com/QwenLM/qwen-code/issues/17039))
- Kênh review lại PR thủ công đã chết: workflow phụ thuộc vào một tài khoản reviewer trả về 404 (#16832, đã đóng). ([#16832](https://github.com/QwenLM/qwen-code/issues/16832))

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*