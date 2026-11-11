# Bản tin cộng đồng công cụ AI CLI 2026-11-11

> Tạo lúc: 2026-11-11 05:58 UTC | Công cụ theo dõi: 7

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

## Đề xuất skill và bản sửa lỗi

**Sửa lỗi đánh giá trigger của skill-creator — PR #1298**
Cô lập đánh giá trigger theo từng worker và xử lý lỗi pipe trên Windows, nên các trường hợp bị báo thiếu là thật chứ không phải do các phép thử tranh nhau. Dùng khi `run_eval.py` báo âm tính giả. Đang mở.

**Sửa lỗi HTTP client của mcp-builder — PR #1742**
Cập nhật `connections.py` cho `mcp>=2.0.0`, khi `streamablehttp_client` được đổi tên thành `streamable_http_client` và header chuyển sang `create_mcp_http_client`. Dùng khi skill mcp-builder hỏng trên các phiên bản `mcp` hiện tại. Đang mở.

**Phát hiện comment trong docx — PR #1734**
Thêm tính năng phát hiện comment mồ côi trong file DOCX, đánh dấu các tham chiếu comment không còn gắn với run nào. Dùng khi review tài liệu còn luồng thảo luận cũ. Đang mở.

**Yêu cầu đang mở**

Người dùng Claude Code không thể chia sẻ skill trong nội bộ tổ chức: họ phải tải file `.skill` rồi gửi qua Slack hoặc Teams, sau đó đồng nghiệp tải lên thủ công trong Settings > Capabilities. Issue #228 đề nghị có thư viện skill dùng chung hoặc link chia sẻ trực tiếp. Đây là yêu cầu, không phải thay đổi đã được chấp nhận.

---

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua.

**Đáng chú ý**

- Issue #88583 (OPEN) báo cáo `claudeAiOauth` bị xóa trắng trong Keychain trên macOS khi các phiên Desktop chạy song song tranh nhau refresh token dùng một lần. Người báo cáo cho biết lỗi refresh ghi đè lên credential đã xoay vòng của phiên thắng. Dữ liệu chưa có bản sửa.
- Remote Control mất kết nối sau các bản tự động cập nhật âm thầm trên Windows. Các issue #100114, #95491, #104206 và #108519 mô tả phiên bị tắt hoặc lưu trữ sau khi khởi động lại. #108960 (CLOSED) báo cáo một bản tự động cập nhật trên Windows kết thúc tiến trình agent đang chạy mà không cảnh báo.
- Issue #108726 (OPEN) báo cáo `DISABLE_TELEMETRY=1` ẩn Fable 5.2 khỏi trình chọn `/model`: cờ này khiến Claude Code bỏ qua các feature flag đã lưu trong bộ nhớ đệm. 5 bình luận, 12 👍.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Có gì thay đổi**

`rust-v0.167.1` được phát hành trong 24 giờ qua dưới dạng bản vá cho `rust-v0.167.0` ([so sánh](https://github.com/openai/codex/compare/rust-v0.167.0...rust-v0.167.1)). Dữ liệu cho thấy không có mục changelog nào ngoài việc tăng số phiên bản, nên hãy coi đây là bản cập nhật thường lệ.

Các bản dựng tiền phát hành `rust-v0.169.0-alpha.9`, `rust-v0.169.0-alpha.10` và `rust-v0.167.0-alpha.4.2` cũng đã được phát hành. Đây là các bản alpha, không phải bản ổn định.

Một số bản sửa lỗi cho sandbox trên Windows, tình trạng hủy turn và quyền vẫn đang ở trạng thái **đề xuất** trong các pull request đã đóng, chưa được phát hành: #60708 (chuẩn hóa thư mục home của sandbox và khôi phục đường dẫn junction đã lưu), #60700 (hoàn tất các turn bị hủy để một turn đang hoạt động không bị kẹt), và #60702 (tập trung hóa việc chọn cấu hình quyền).

**Đáng chú ý**

Issue #56655 (78 bình luận, đang mở): giao diện extension VS Code không khởi động được trên Windows sau khi nâng cấp lên 26.51021.22027. Dữ liệu không cho thấy bản sửa lỗi nào.

Issue #59895 (55 bình luận, đang mở): các dự án local trên Windows biến mất sau khi cập nhật ứng dụng và chuyển về tài khoản ChatGPT cá nhân.

Issue #48774 (62 bình luận, đang mở): ghép nối Codex Remote thất bại trên Android, nên đăng nhập bằng mã QR không hoàn tất được.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

`/stats heatmap` là subcommand mới hiển thị mức dùng token theo ngày, được thêm trong v0.69.0-preview.0 ([bối cảnh PR #30136](https://github.com/google-gemini/gemini-cli/pull/30136), [bản phát hành v0.69.0-preview.0](https://github.com/google-gemini/gemini-cli/releases)). Lệnh này cho bạn xem mức tiêu thụ từng ngày mà không cần rời CLI. Dùng khi cần theo dõi chi phí trong một dự án dài.

Ký tự `$` giờ được giữ nguyên khi thay thế placeholder trong template. Bản sửa có trong v0.69.0-preview.0 cho `{{args}}` và các phép thay thế prompt như `${AgentSkills}`. Điều này quan trọng khi đối số của bạn chứa `$$`, `$&` hoặc `$1`, vốn bị hỏng trước đây. Một bản sửa tương ứng, [PR #30115](https://github.com/google-gemini/gemini-cli/pull/30115), vẫn đang mở.

v0.68.0 đã phát hành dưới dạng bản ổn định, với changelog trong [PR #30224](https://github.com/google-gemini/gemini-cli/pull/30224). Dữ liệu không cho thấy thay đổi phá vỡ tương thích nào.

**Đáng chú ý**

Một subagent chạm MAX_TURNS lại báo `status: "success"` và `Termination Reason: "GOAL"`, che mất việc bị ngắt ([issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323), 13 bình luận). Tác giả gặp điều này với `codebase_investigator`. Dữ liệu không cho thấy bản sửa nào.

Agent tổng quát có thể treo vô hạn, kể cả với các tác vụ như tạo thư mục ([issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 bình luận, 8 👍). Một người dùng cho biết yêu cầu model không giao lại cho subagent thì tránh được lỗi này.

Agent trình duyệt bỏ qua các ghi đè trong `settings.json` như `maxTurns` ([issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)). Dữ liệu không cho thấy bản sửa nào.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Có gì thay đổi**

- v1.0.110-0 thêm một tùy chọn thử nghiệm để trả lời các prompt mật khẩu git, ssh và sudo từ lệnh của agent trong một hộp thoại được che, bật bằng `/experimental on` ([release](https://github.com/github/copilot-cli)).
- v1.0.110-1 sửa `copilot --resume`: phiên được mở lại sẽ được đánh dấu là đang dùng ngay lập tức, nên `copilot -p --resume` và cửa sổ thứ hai không còn ghi vào một phiên đang nhàn rỗi ([release](https://github.com/github/copilot-cli)).
- v1.0.110-1 căn thẳng các dòng trạng thái tùy chỉnh bằng cách giữ nguyên thụt lề của dòng đầu tiên ([release](https://github.com/github/copilot-cli)).

**Đáng chú ý**

- Phiên được mở lại có thể lỗi mọi yêu cầu với `400 Tool reference '...' not found in available tools` khi các công cụ của một MCP server thay đổi giữa các lần khởi chạy; đang mở, chưa có bản sửa ([#5359](https://github.com/github/copilot-cli/issues/5359), cập nhật 2026-11-11).
- Trên Windows 11, điều hướng bằng numpad khi tắt NumLock và phím Delete bị bỏ qua ở phiên bản 1.0.98; đang mở, chưa có bản sửa ([#5171](https://github.com/github/copilot-cli/issues/5171), 5 bình luận).
- Ở 1.0.109, mọi slash command của extension đều in "No client found for command" dù handler vẫn chạy; đang mở, chưa có bản sửa ([#5412](https://github.com/github/copilot-cli/issues/5412)).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

OpenCode v2.2.7 bổ sung **GitHub Copilot Auto** vào trình chọn model ([#62997](https://github.com/anomalyco/opencode/issues/62997)). Chọn Auto khi tài khoản Copilot của bạn có pool Auto; router của Copilot sẽ chọn model cho từng phiên theo mức giá Auto. Nếu định tuyến thất bại, OpenCode quay về model chat mặc định của tài khoản.

**Đáng lưu ý**

Gói miễn phí có một tracker đang mở tại [#59387](https://github.com/anomalyco/opencode/issues/59387), với 347 bình luận và 27 👍. Tracker này ghi nhận lỗi `Free usage exceeded`, các lần reset giới hạn không bao giờ xảy ra, và một bản Desktop không còn khởi động được. Không có bản sửa nào xuất hiện trong dữ liệu.

Sandbox cho agent vẫn chưa được giải quyết tại [#2242](https://github.com/anomalyco/opencode/issues/2242) (108 bình luận, 84 👍). Lệnh terminal từ agent có thể chạm tới các file ngoài thư mục làm việc; tác giả đề nghị giới hạn kiểu seatbelt nhưng cho biết chưa có cơ chế tương đương.

[#58638](https://github.com/anomalyco/opencode/issues/58638) báo cáo rằng một symlink vượt qua quy tắc đọc và kiểm tra `external_directory`: các kiểm tra quyền dùng đường dẫn được ghi ra, không dùng file đã resolve. Đã được đánh dấu tái hiện; chưa có bản sửa nào được liệt kê.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Có gì thay đổi**

- v1.5.2 bổ sung tính năng fork session khi thư mục gốc không còn tồn tại. Fork session đó vào thư mục hiện tại thay vì chỉ tiếp tục, để các lần resume sau không hỏi lại.
- PR #12025 (đã đóng) sửa lỗi crash p0 trong #11956, khi hủy thao tác đọc trong lúc mở file làm Pi thoát với AbortError không bắt được.
- PR #12016 (đã đóng) đề xuất xác thực Microsoft Entra ID cho Azure OpenAI qua DefaultAzureCredential, bỏ yêu cầu API key cho Microsoft Foundry.

**Đáng chú ý**

- `cacheWarming: "idle"` dừng âm thầm với hai nhóm: session mà extension xử lý `turn_end` và context chứa message tùy chỉnh hoặc compaction (#10956), và session trên virtual model đăng ký bằng `registerVirtualModel` (#10536). Cả hai đều đang mở, chưa có fix trong dữ liệu.
- `pi.sendMessage(msg, { triggerTurn: true })` khởi động một lượt chạy trong lúc compaction thủ công (#10982, 4 bình luận). Bản sửa được đề xuất trong PR #12028, chưa phát hành.
- `StringEnum` trong Pi 1.5.0 phá vỡ kiểu dữ liệu lúc biên dịch: các trường tham số của tool bị suy ra thành `unknown`, dễ gây lỗi kiểu (#11869, đang mở, 3 👍).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

Qwen Code v1.0.0-preview đã ra mắt, hợp nhất năng lực agent của Qoder với Qwen Code để hiểu mã, gỡ lỗi và kiểm thử. Ghi chú phát hành cảnh báo giao diện, tùy chọn cấu hình và hành vi có thể thay đổi trong giai đoạn Preview. Chỉ dùng nếu bạn chịu được thay đổi liên tục.

v0.27.2 bổ sung cấu hình kênh Web Shell cho WeChat, QQ và Email, gồm đăng nhập bằng mã QR, tiến trình quét, hiển thị danh tính và đăng xuất ở nơi được hỗ trợ (#16736, #16724). Điều này cho phép bạn điều khiển phiên từ các nền tảng đó.

PR #16858 (đang mở) đề xuất đổi bộ phân loại chế độ AUTO để đánh giá liệu người dùng có cho phép một hành động hay không, thay vì xem hành động đó có khớp với tin nhắn cuối cùng không. Chưa phát hành.

**Đáng chú ý**

Phê duyệt quyền cho workflow-agent không bao giờ hiển thị, khiến lượt chạy bị treo trong khi thanh trạng thái vẫn hiện huy hiệu chờ phê duyệt; ghi nhận trên 0.26.6 và tái hiện trên 0.26.8 (#16425). Dữ liệu không có bản sửa.

Chế độ AUTO lặp lại lệnh gọi công cụ đang chờ dưới dạng "Prior action", báo cho bộ phân loại rằng nó đã chạy rồi (#16496, 6 bình luận). Không thấy bản sửa.

Bản phát hành v0.27.1-nightly.20261110.c238beb56f thất bại ngày 2026-11-10 ở job integration_docker (#16861).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*