# Bản tin cộng đồng công cụ AI CLI 2026-11-10

> Tạo lúc: 2026-11-10 07:06 UTC | Công cụ theo dõi: 7

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

## mcp-builder — thêm hỗ trợ client HTTP streamable của mcp>=2
Sửa import `streamablehttp_client` đã đổi tên (nay là `streamable_http_client` trong mcp>=2.0.0) và chuyển cấu hình HTTP header tùy chỉnh sang `create_mcp_http_client`, theo PR #1742. Đang mở.

## skill-creator — tách biệt đánh giá trigger và xử lý lỗi runtime
Ngăn các lệnh thăm dò của từng worker tranh chấp nhau và lỗi trên `select()` của Windows qua pipe subprocess, nhờ đó lỗi runtime không còn bị tính là không trigger. Đang mở, PR #1298.

## webapp-testing — bỏ shell=True khỏi with_server.py
Thay `subprocess.Popen(..., shell=True)` bằng cách spawn không qua shell, loại bỏ rủi ro command injection (CWE-78) từ chuỗi lệnh server chưa được làm sạch. Đang mở, PR #1980.

**Yêu cầu đang mở**
Issue #556 báo cáo rằng `run_eval.py` không bao giờ trigger được skill: chạy `claude -p` với file lệnh được tạo ra cho tỷ lệ trigger 0% trên tất cả truy vấn kiểm thử.

---

**Điều gì đã thay đổi**

Claude Fable 5.2 (`claude-fable-5-2`) giờ là model Fable mặc định. Nó có cửa sổ ngữ cảnh 1M token với giá $8/$40 mỗi Mtok và $0.20/Mtok cho cache reads. Chọn nó khi công việc ngữ cảnh dài trước đây cần chọn model thủ công (v2.1.321).

Fast mode giờ hoạt động trên Vertex ở các region global, us và eu. Claude Code tự chuyển về tốc độ tiêu chuẩn khi Vertex từ chối, nên bạn có thể bật mà không làm hỏng session trên các endpoint đó (v2.1.322).

`claude remote-control` nhận `--settings <file>`, áp dụng file settings đó cho mọi session nó khởi tạo. File thay đổi sẽ không còn áp dụng cho session mới (v2.1.321).

**Cần biết**

Tab Desktop Code chạy Fable 5.2 với cửa sổ ngữ cảnh 200K vì Claude Code 2.1.317 đi kèm không có mục catalog cho `claude-fable-5-2`. Kiểm tra phiên bản đi kèm nếu bạn mong đợi đủ 1M ngữ cảnh (Issue #108640).

Auto-update qua đêm trên Desktop tắt Remote Control cho mọi session và không bao giờ kết nối lại, kể cả khi đã bật "Connect new sessions to Remote Control" (Issue #107825).

Người dùng gói Ultra và Team báo cáo mức dùng hàng tuần chạm 29–100% chỉ sau khoảng hai ngày, với lượng token thấp hơn so với tháng 10 (Issues #108734, #107390).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Những gì đã thay đổi

**Context không đáng tin giờ đến model dưới dạng tool output.** PR #60487 đánh dấu `untrusted_as_tool_output` là ổn định và bật mặc định, nên context phụ không đáng tin (ví dụ thông tin trình duyệt) đến dưới dạng các mục `function_call_output` trong namespace `agent`. Điều này quan trọng khi thiết lập của bạn dựa vào việc context đó đến model ở mọi lượt.

**Fork và khôi phục phiên không còn lỗi khi tool call chưa hoàn tất.** PR #60519 coi một tool call được khôi phục mà output chưa được ghi nhận là công việc bị gián đoạn. Điều này quan trọng khi bạn fork, hoặc mở lại một phiên đã dừng giữa lúc gọi.

**Daybreak tự tắt khi model được chọn không dùng được nó.** PR #60526 tự động tắt Daybreak sau khi đổi model hoặc làm mới catalog. Không có nó, trạng thái Daybreak cũ có thể chặn các lượt tiếp theo.

Cả ba PR đều đã đóng và được merge vào codebase; không có release note nào mô tả chúng là tính năng đã phát hành.

## Đáng chú ý

**Giao diện tiện ích VS Code trên Windows không khởi động được.** Nhiều báo cáo (Issue #56655, 55 bình luận; #56691, đã đóng) mô tả `26.1021.22027` lỗi với `renderer_ready_timeout`; người dùng cho biết phiên bản trước đó vẫn chạy. Thread chính vẫn đang mở.

**Việc ghi turn-diff có thể làm đầy ổ đĩa bằng các file `tmp_pack`.** Issue #54955 báo cáo 263,7 GB và Issue #50920 hơn 774 GiB file `tmp_pack_*` sau các lần ghi bị hủy. Cả hai đều đang mở, dữ liệu không nêu cách khắc phục.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Những gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua.

Hai bản sửa đang được xem xét nhưng chưa phát hành. PR #30095 đề xuất từ chối các đối số Git nguy hiểm trên Windows, khắc phục lỗ hổng vượt quyền `git diff` mô tả trong issue #29189, nơi `git diff --output=<path>` được đưa vào danh sách chỉ đọc và âm thầm ghi đè các tệp tùy ý. PR #30102 đề xuất ghi log mọi kết nối IDE là `ide_connection` thay vì `start_session`, vốn đang làm phồng số lượng phiên cho người dùng IDE companion.

PR #30212 đề xuất cài đặt `tools.callTimeout` (giây, mặc định 0 = tắt). Khi một lệnh gọi vượt quá thời gian này, AbortSignal của công cụ sẽ kích hoạt và lệnh gọi kết thúc bằng lỗi `TOOL_CALL_TIMEOUT` có thể phục hồi.

**Đáng chú ý**

Subagent `codebase_investigator` có thể báo cáo `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm giới hạn số lượt tối đa (issue #22323, 13 bình luận). Chưa có bản sửa trong dữ liệu.

Agent đa năng bị treo vô thời hạn ở các tác vụ đơn giản như tạo thư mục (issue #21409, 8 bình luận, 8 👍). Người báo cáo cho biết hướng dẫn model không dùng subagent sẽ tránh được lỗi này. Chưa có bản sửa trong dữ liệu.

`browser_agent` bỏ qua các ghi đè trong `settings.json` như `maxTurns` (issue #22267). `AgentRegistry` đọc cài đặt, nhưng agent không áp dụng chúng.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

- v1.0.109-1 bổ sung hỗ trợ IPv4/IPv6 CIDR cho quy tắc cho phép và từ chối host sandbox trong cài đặt, nên bạn có thể mô tả dải mạng thay vì từng địa chỉ đơn lẻ.
- v1.0.109-1 thêm Claude Fable 5.2 vào danh sách chọn model trong mục "New models".
- v1.0.109-0 yêu cầu xác nhận trước khi `/share` hoặc `/export` đi theo symlink khi lưu file cục bộ.

**Đáng chú ý**

- `disable-model-invocation: true` trong `SKILL.md` của một project skill khiến skill không thể truy cập: `copilot skill list` vẫn hiển thị nó, nhưng công cụ `skill()` trả về "Skill not found", nên các yêu cầu tường minh đều thất bại. Issue #4438 đang mở, 17 bình luận.
- Trên Windows, khởi động `copilot` từ một phiên PowerShell 7 tương tác bên trong git repo sẽ kết thúc tiến trình `pwsh.exe` cha thông qua một ngoại lệ không được xử lý liên quan đến đánh index tgrep trong 1.0.108. Issue #5404 đang mở; chưa có bản sửa nào được liệt kê.
- 1.0.108 làm hỏng các phiên do SDK host sau một lệnh gọi công cụ MCP bị hoãn, khiến yêu cầu tiếp theo thất bại với lỗi "Missing namespace for function_call". Issue #5400 đã đóng.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên chưa có gì dưới đây được phát hành.

- **Đề xuất: tool-input trùng lặp không còn làm chết một bước.** PR #63048 đóng #63035, nơi một provider gửi lại `tool-input-start` cho một tool-call id đang mở thì chết với lỗi `Duplicate tool input start`. Quan trọng nếu provider của bạn stream tool call hai lần.
- **Đề xuất: lệnh shell sống lâu hơn timeout của nó.** PR #63024 sẽ giữ một lệnh chạy tiếp sau khi hết timeout foreground và gửi kết quả qua đường thông báo background sẵn có, thay vì kill các build và test dài.
- **Đề xuất: sửa gatewayApiKey cho Cloudflare AI Gateway.** PR #62574 đóng #48293, nơi một gateway chỉ cấu hình với `gatewayApiKey` gửi request không xác thực.

**Đáng biết**

- Thread free-tier #59387 là hub báo cáo chính (340 bình luận). Issue #60311 báo cáo giới hạn 5 giờ, hàng tuần và hàng tháng của Go là một pool chung, không phải theo từng model như tài liệu.
- Trên Windows, `opencode serve --service` spawn một console hiển thị khoảng hai lần mỗi giây và cướp focus bàn phím (#62988); khởi động cũng mở PowerShell để kiểm tra phiên bản package-manager (#62837).
- Issue #62872 báo cáo một lần ghi một phần tạm thời vào `opencode.jsonc` từ chối toàn bộ config mà không có fallback last-good, làm chết các session đang chạy.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

Pi v1.5.1 bổ sung lệnh xác thực phía shell: `pi auth login <provider>` và `pi auth logout <provider>` giờ chạy được mà không cần mở session, kèm tùy chọn đăng nhập bằng API key và không dùng trình duyệt ([ghi chú phát hành](https://github.com/earendil-works/pi/blob/v1.5.1/packages/coding-agent/docs/cli.md#credent)). Điều này hữu ích cho các thiết lập chạy script hoặc headless, nơi trước đây bạn phải khởi động Pi để xác thực.

Các mẫu đường dẫn của công cụ tìm kiếm trên Windows giờ hoạt động với nhiều phiên bản fd; fd trước 10.5.1 không bao giờ khớp glob `--full-path` chứa `/` (#11972, đã đóng). Ngoài ra, trình cài đặt Windows không còn dừng khi npm ghi cảnh báo ra stderr dưới PowerShell 5.1 (#11944, #11962).

**Cần biết**

Footer crash trên các session được khôi phục khi entry của assistant có object `usage` thiếu `cost`: `usage.cost.total` bị đọc vô điều kiện, gây `TypeError` (#11982, còn mở trên 1.5.1). Các request Anthropic OAuth ghim `claude-cli/2.1.280` và bị từ chối với `claude_code_version_too_old`; bản vá nâng user-agent lên 2.1.321 (#11969, PR #11970 đã đóng).

`/login` bằng API key hiển thị key trên màn hình ngay khi gõ hoặc dán, và để dòng đã gửi lộ ra sau prompt tiếp theo (#11977).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

- **Phát hành v0.27.1.** Không có thay đổi gây hỏng nào được biết đến. Tính năng CLI duy nhất được liệt kê là `feat(core): name the active shell in the startup context` ([#16491](https://github.com/QwenLM/qwen-code/pull/16491)), nên ngữ cảnh khởi động của agent giờ đây xác định được shell mà nó đang chạy. Điều này quan trọng khi bạn dựa vào ngữ cảnh khởi động để suy luận về hành vi đặc thù của shell.
- **TypeScript SDK v0.1.31 đóng gói CLI 0.27.1.** Người dùng SDK nhận được CLI 0.27.1 bằng cách nâng cấp SDK thay vì nâng cấp CLI trực tiếp.
- **Desktop v0.27.1 đã phát hành.** Ghi chú của bản này liệt kê một thay đổi tài liệu cho Wally trên các nhà cung cấp tương thích OpenAI ([#16529](https://github.com/QwenLM/qwen-code/pull/16529)) và một mục `fix(core)` bị cắt cụt trong dữ liệu, nên bản sửa cụ thể chưa được xác nhận.

**Đáng chú ý**

- Desktop 0.27 được cho là gặp lỗi trên Mac Intel x64 với sự cố runtime đóng gói trước khi URL lắng nghe được báo cáo ([#16683](https://github.com/QwenLM/qwen-code/issues/16683), 3 bình luận, đang mở). Không có bản sửa nào xuất hiện trong dữ liệu này.
- Lỗi `/cd` với thông báo "response or tool call in progress" sau v0.24.0 ([#12224](https://github.com/QwenLM/qwen-code/issues/12224), 6 bình luận) nay đã đóng; `/branch` gặp cùng thông báo trong 0.27.0 ([#16700](https://github.com/QwenLM/qwen-code/issues/16700), 3 bình luận, đóng vì cần thêm thông tin).
- Một tín hiệu nhóm bị từ chối trong quá trình teardown bị chốt vĩnh viễn thành lỗi tắt máy; một bản sửa đề xuất đang mở tại [#16703](https://github.com/QwenLM/qwen-code/pull/16703), chưa phát hành.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*