# Bản tin cộng đồng công cụ AI CLI 2026-11-09

> Tạo lúc: 2026-11-09 06:06 UTC | Công cụ theo dõi: 7

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

## Claude Code Skills — 2026-11-09

**notion-spec-to-implementation và quantitative-resume-auditor — biến spec sản phẩm thành task Notion; đánh giá CV theo tiêu chí đo lường được**
Skill đầu tiên chia trang spec thành kế hoạch triển khai gồm task, tiêu chí nghiệm thu và theo dõi tiến độ; skill thứ hai đánh giá CV theo các thang đo định lượng. Cả hai được đề xuất trong [anthropics/skills PR #1245](https://github.com/anthropics/skills/pull/1245), mở ngày 2026-06-02.
*Đang mở.*

**md2video-audio — biên dịch tài liệu Markdown thành video MP4 kèm thuyết minh**
Skill chuyển Markdown qua Marp thành slide, rồi thêm lời thuyết minh tự nhiên; tác giả nói chi phí bằng không. Đề xuất trong [anthropics/skills PR #1703](https://github.com/anthropics/skills/pull/1703), cập nhật lần cuối 2026-09-15.
*Đang mở.*

**document-typography — bắt lỗi từ mồ côi, dòng mồ côi và lệch số thứ tự trong tài liệu do Claude tạo**
Skill nhắm vào các lỗi typography ảnh hưởng đến tài liệu Claude tạo ra: 1–6 từ tràn xuống dòng sau, tiêu đề mục lạc xuống cuối trang, và số thứ tự lệch. Đề xuất trong [anthropics/skills PR #514](https://github.com/anthropics/skills/pull/514).
*Đang mở.*

**Yêu cầu đang chờ xử lý**

Người dùng muốn chia sẻ skill trong tổ chức mà không phải tải file `.skill` rồi upload thủ công qua Settings > Capabilities; họ yêu cầu có thư viện chia sẻ hoặc link trực tiếp trong [anthropics/skills Issue #228](https://github.com/anthropics/skills/issues/228). Một báo cáo riêng cho biết skill cộng đồng đang được phân phối dưới namespace `anthropic/`, khiến chúng trông như chính thức ([anthropics/skills Issue #492](https://github.com/anthropics/skills/issues/492)).

---

# Ghi chú hằng ngày về Claude Code — 2026-11-09

## Thay đổi

Không có bản phát hành, pull request hay bản vá nào được hợp nhất trong 24 giờ qua. Dữ liệu GitHub chỉ cho thấy hoạt động issue.

## Đáng chú ý

**User-Agent rò rỉ email người dùng khi tìm kiếm web.** Issue #107757 báo cáo rằng Claude Code đã gửi địa chỉ email của người báo cáo tới bên thứ ba trong header `User-Agent` khi tìm kiếm web mà không được phép ([#107757](https://github.com/anthropics/claude-code/issues/107757)). Người báo cáo cho rằng cần loại bỏ hẳn thay vì chuyển thành tùy chọn bật/tắt. Đang mở, 110 bình luận, 748 👍.

**Thay đổi mô tả của công cụ MCP không bao giờ tới được phiên đã tải.** Sau khi một công cụ MCP trì hoãn được tải qua ToolSearch, mô tả hoặc input schema đã thay đổi không bao giờ tới được model lần nữa trong cuộc hội thoại đó — kể cả qua `/mcp reconnect`, tắt/bật, hay `/exit` rồi `--resume` ([#97369](https://github.com/anthropics/claude-code/issues/97369)). Đang mở, dữ liệu không có bản vá nào.

**MCP Apps trên Windows Desktop ngừng hiển thị.** Từ khi Desktop tự động cập nhật lên 4.23118.0 vào 2026-11-05, các widget MCP Apps từ server stdio cục bộ không còn hiển thị trong Chat; công cụ vẫn chạy và trả về văn bản, nhưng tài nguyên `ui://` không bao giờ được đọc ([#108122](https://github.com/anthropics/claude-code/issues/108122)). Lỗi hồi quy đang mở, không có bản vá nào được liệt kê.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua. Ba PR đã đóng thay đổi hành vi của TUI và Cloud; chúng đã được hợp nhất/đóng, nên hãy coi đây là các bản sửa gần đây chứ không phải tính năng được công bố.

- PR #60335 tránh tin nhắn agent trùng lặp khi khôi phục luồng Cloud: lịch sử phát lại không còn hiển thị lại phần văn bản trợ lý đã hoàn thành. Điều này quan trọng khi mở lại một cuộc trò chuyện Cloud trong TUI.
- PR #60327 chặn các ngắt kết nối luồng Cloud cũ sau khi một luồng được mở lại, nên lỗi kết nối lại đã hết hiệu lực không còn đến TUI.
- PR #60270 cảnh báo lúc khởi động khi ghi đè model CLI đang hoạt động không có trong danh sách model ChatGPT, và gợi ý kiểm tra chính tả hoặc chọn model khác.

**Đáng chú ý**

- Issue #59347 báo cáo lỗi "Selected model is at capacity" không liên tục trên Windows desktop 26.1029.7803.0 và CLI 0.166.0, kể cả với các lệnh cục bộ đơn giản. Chưa có bản sửa trong dữ liệu.
- Issue #60332 (đã đóng) mô tả một daemon app-server cũ thiếu API key cho một nhà cung cấp model tùy chỉnh; khởi động lại đã khắc phục.
- Issue #28969 (ĐANG MỞ, 99 bình luận, 221 👍) yêu cầu một cài đặt để tắt tính năng tự động giải quyết câu hỏi sau 60 giây.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**
Không có bản phát hành nào trong 24 giờ qua, nên chưa có gì được ship. Hai thay đổi đang là đề xuất mở:
- PR #30204 đề xuất kill các shell con tách rời khi nhận SIGTERM/SIGINT/SIGHUP trong các lần chạy headless (`-p`). Việc này sẽ chặn các tiến trình `run_shell_command` chạy nền sống sót sau khi lần chạy bị huỷ.
- PR #29880 đề xuất lệnh `gemini models` và cờ `--list-models` với đầu ra JSON để script tự dò model.

**Đáng chú ý**
- Khôi phục subagent sau MAX_TURNS báo `status: "success"` và lý do kết thúc `GOAL` ngay cả khi không có phân tích nào chạy — 13 bình luận (issue #22323, đang mở, P1).
- Agent tổng quát bị treo vô hạn sau khi defer; 8 người dùng phản hồi. Cách lách: yêu cầu model không defer sang subagent (issue #21409, đang mở, P1, cần kiểm thử lại).
- Gemini CLI trả về HTTP 400 khi vượt quá 128 công cụ, người báo cáo mong đợi agent tự giới hạn công cụ trong phạm vi (issue #24246, đang mở, cần thêm thông tin). Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Có gì thay đổi**

Không có bản phát hành hay pull request nào được công bố trong 24 giờ qua, nên không có thay đổi nào ảnh hưởng đến người dùng để báo cáo.

**Đáng chú ý**

- **Subagent của tác vụ có thể làm kẹt phiên** ([#5219](https://github.com/github/copilot-cli/issues/5219), đang mở, 4 bình luận): một subagent `task` được gọi với model id không xác định sẽ rơi về giới hạn mặc định 128k và làm hỏng lượt với lỗi "Request exceeds the model's prompt budget". Các phiên tương tác chạy dài sẽ kẹt ở mọi lần ủy thác.

- **Việc gửi sự kiện phiên có thể hỏng vĩnh viễn** ([#5100](https://github.com/github/copilot-cli/issues/5100), đang mở, 3 bình luận): sau một lần hết thời gian chờ 120s chờ host xác nhận, `session.send` liên tục thất bại và phiên không dùng được cho đến khi bạn khôi phục nó.

- **Tiện ích mở rộng không khởi động cho các phiên `create_session`** ([#5380](https://github.com/github/copilot-cli/issues/5380), đang mở): model của phiên không có công cụ tiện ích mở rộng, skill hay hook cho đến khi bạn chuyển sang nó lần đầu.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Điều gì đã thay đổi**

Các MCP tool giờ không biến mất khi mất kết nối. PR #62756 ([link](https://github.com/anomalyco/opencode/pull/62756)) giữ nguyên danh sách tool của một stdio server đã crash và kết nối lại khi cần, nên bạn không phải xóa rồi thêm lại từ `/mcps`. Đề xuất, vẫn đang mở.

Warming giờ mặc định theo `cache.ttl` của model. PR #62831 ([link](https://github.com/anomalyco/opencode/pull/62831)) bỏ ping 4 phút vốn phớt lờ TTL thật của model. Đề xuất, vẫn đang mở.

TLS trust cho remote MCP server: PR #60039 ([link](https://github.com/anomalyco/opencode/pull/60039)) thêm block `tls` tùy chọn cho từng server, để có thể tin một chứng chỉ self-signed cho riêng server đó. Đề xuất, vẫn đang mở.

**Đáng chú ý**

Giới hạn gói miễn phí là chủ đề lớn nhất hôm nay: issue #59387 ([link](https://github.com/anomalyco/opencode/issues/59387)) có 333 bình luận, gom các báo cáo rằng mốc reset hàng ngày không bao giờ xảy ra. Đăng nhập không reset giới hạn theo IP và trả về đúng lỗi cũ (PR #62828).

Tự cập nhật trên Windows lên 2.2.6 để lại file `opencode.exe` 229 byte không khởi động được (#62696). Đã đánh dấu chờ đóng.

Nhắc nhở plan mode vẫn còn sau khi đổi agent trên v2.2.x, chặn công việc triển khai (#62797, 13 bình luận).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Đã thay đổi những gì**

Không có bản phát hành hay mục nào được hợp nhất trong 24 giờ qua. Hai thay đổi đề xuất đang nằm trong pull request:

- PR #11938 (đã đóng) đề xuất gửi audio và video đến Gemini theo tham chiếu: Pi tải tệp cục bộ lên Files API, chờ tối đa năm phút để Google xử lý, rồi gửi `fileData` thay vì byte nội tuyến. Điều này sẽ cho phép agent làm việc với các tệp media mà hiện tại nó không thể đính kèm.
- PR #11857 (đã đóng) đề xuất làm ấm prompt-cache trong p2. Tác giả đo được 789 lần viết lại toàn bộ prompt từ ngày 12 tháng 10 đến ngày 5 tháng 11, tốn khoảng $1,430, chiếm 26% chi tiêu của p2, vì cache 5 phút không bao giờ được làm mới.

**Đáng chú ý**

- Issue #10287 (đang mở, 8 bình luận): trên Pi 0.99.2, một lỗi mạng có thể thử lại khiến `getContextUsage()` nhảy từ 42,707 token lên 330,081. Dữ liệu chưa có bản sửa.
- Issue #10162 (đang mở, 8 bình luận): tác giả báo cáo rằng quá nhiều ảnh đầu vào khiến tác vụ agent dừng lại, làm hỏng các phiên chạy dài không giám sát. Dữ liệu chưa có bản sửa.
- Issue #11238 (đang mở, 3 bình luận): gọi `pi.sendUserMessage(...)` từ một lệnh extension trong chế độ in `-p` kết thúc lượt với thông báo "turn_end could not resolve the persisted assistant entry ID". Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

TypeScript SDK v0.1.29 đã phát hành sau khi workflow phát hành gốc thất bại ở bước push nhánh release; npm publish đã thành công trước đó, nên phiên bản này được bổ sung sau ([#16490](https://github.com/QwenLM/qwen-code/issues/16490)). Bản này đóng gói CLI 0.26.9, build từ cùng nhánh và ref. Nếu bạn ghim SDK, 0.1.29 hiện là phiên bản cài được.

Đề xuất: PR [#16716](https://github.com/QwenLM/qwen-code/pull/16716) sẽ tính cả thời gian tới token đầu tiên vào tốc độ xuất (TPS) mà `/stats` và Web Shell hiển thị. Hiện tại TPS lấy số token xuất chia cho khoảng từ chunk đầu đến chunk cuối, bỏ qua thời gian chờ trước token đầu tiên ([#16714](https://github.com/QwenLM/qwen-code/issues/16714)).

**Đáng chú ý**

Lane Java của `main` không biên dịch được do nhãn case trùng lặp trong `SurfaceAdmissionAcceptanceTest`, nên không có test Java nào chạy và gate Managed Agent kiểm tra thất bại ([#16712](https://github.com/QwenLM/qwen-code/issues/16712)). PR [#16719](https://github.com/QwenLM/qwen-code/pull/16719) đề xuất xóa các nhãn trùng.

`FileChangedWatcher` có thể bỏ sót vĩnh viễn một file được ghi vào thư mục con mới tạo trong thư mục gốc đang theo dõi, mà không có thông báo `FileChanged` ([#16708](https://github.com/QwenLM/qwen-code/issues/16708)). Chưa có bản sửa trong dữ liệu.

`/branch` báo không thể tạo nhánh khi đang có phản hồi hoặc tool call, kể cả sau khi mọi tác vụ đã xong, trên 0.27.0 ([#16700](https://github.com/QwenLM/qwen-code/issues/16700)). Chưa có bản sửa trong dữ liệu.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*