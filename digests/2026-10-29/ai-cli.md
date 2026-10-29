# Bản tin cộng đồng công cụ AI CLI 2026-10-29

> Tạo lúc: 2026-10-29 05:36 UTC | Công cụ theo dõi: 7

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

## Skills

**mcp-builder fix — hỗ trợ HTTP transport cho mcp>=2 — open**
Xử lý các MCP server trên mcp>=2, nơi `streamablehttp_client` đã được đổi tên thành `streamable_http_client` và custom header chuyển sang `create_mcp_http_client`. Dùng khi cần dựng kết nối MCP phải nhận header hoặc chạy trên mcp 2.0 trở lên; đang mở, theo anthropics/skills PR #1742.

**webapp-testing fix — bỏ shell=True khi khởi động server — open**
Bịt lỗ hổng command injection (CWE-78) trong `skills/webapp-testing/scripts/with_server.py`, nơi lệnh server được spawn qua system shell để cho phép chuỗi `cd <dir> && <command>`. Dùng khi skill webapp-testing khởi động server cục bộ từ chuỗi lệnh do agent cung cấp; đang mở, theo anthropics/skills PR #1980.

**pyxel skill — làm game retro bằng Python — open**
Hướng dẫn tạo, gỡ lỗi và kiểm tra game Pyxel retro, gồm chạy headless theo input, xem trực tiếp từng frame và kiểm tra state theo từng task. Dùng khi task liên quan đến việc tạo hoặc test game Pyxel; đang mở, theo anthropics/skills PR #525.

**Yêu cầu đang mở**
Skill hiện chưa thể chia sẻ trong nội bộ tổ chức trên Claude.ai: người dùng tải file `.skill`, gửi qua Slack hoặc Teams, rồi đồng nghiệp tải lên thủ công trong Settings > Capabilities. Những người yêu cầu việc này muốn có thư viện skill dùng chung hoặc link chia sẻ trực tiếp, theo anthropics/skills Issue #228.

---

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên không có gì được ship. Hai PR đang mở, đều là đề xuất và chưa được merge: PR #32755 thêm plugin `edit-verifier` dùng hook PostToolUse, giúp bắt các lệnh Edit thất bại âm thầm — tác giả cho biết Claude hiện mặc định mọi chỉnh sửa đều thành công. PR #32753 thay các liên kết cũ `docs.anthropic.com` và `docs.claude.com` bằng `code.claude.com` trên 12 file. Cả hai đều từ tháng 3/2026 và vẫn chưa được review.

**Đáng chú ý**

Hôm nay các phàn nàn về tính toán usage tập trung lại. Issue #97074 (59 bình luận, 102 👍) báo cáo rằng chế độ headless `claude -p` qua entrypoint `sdk-cli` tiêu tốn khoảng 1,8× cửa sổ 5 giờ mỗi token so với `cli` tương tác trên cùng khối lượng công việc. Issue #102667 và #105240/#105295 báo cáo giới hạn hàng tuần cạn nhanh hơn từ giữa tháng 10; #105125 báo cáo usage hàng tuần của Opus ở mức 72% sau hai ngày. Đây là báo cáo từ người dùng, không phải bản sửa lỗi đã được xác nhận.

Trên macOS, issue #105847 báo cáo quyền thư mục TCC gắn với đường dẫn binary theo từng phiên bản, nên mỗi lần auto-update native đều hỏi lại quyền truy cập Downloads, Desktop và Documents. Issue #105861 mô tả lỗi liên quan: dọn dẹp phiên bản xóa một bản build mà các phiên đang chạy vẫn đang thực thi, vì lock chỉ bảo vệ tiến trình đầu tiên.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

Hai bản alpha đã phát hành: `rust-v0.166.0-alpha.6` và `rust-v0.166.0-alpha.5.1`. Đây là bản pre-release, không phải bản stable.

Một số bản sửa lỗi sandbox và MCP mới chỉ là đề xuất, chưa phát hành. PR #57985 bỏ qua việc mở rộng volume-root chỉ đọc trong sandbox MXC. PR #57978 thêm lease riêng cho từng chat đối với kết nối MCP dùng chung. Cả hai đều ở trạng thái CLOSED.

PR #57859 đề xuất kéo dài thời gian chờ đăng nhập OAuth của provider từ ba lên mười phút, cho người dùng thêm thời gian hoàn tất đăng nhập trên trình duyệt, kể cả MFA.

**Đáng chú ý**

Người dùng Windows báo side chat mất sau bản cập nhật 26.1023.51421: Ctrl+Alt+S và `/side` không còn hoạt động. Issue #57668 ở trạng thái CLOSED; issue #57988 vẫn OPEN.

Issue #52873 (OPEN, 31 bình luận) báo dot không đọc được các thread Codex do người dùng tạo, lỗi "unsupported placement format version". Chưa có bản sửa trong dữ liệu.

Issue #38162 (OPEN, 21 bình luận) báo các công cụ MCP cục bộ được phát hiện nhưng không hiển thị cho các phiên Chat trên Windows. Chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Các thay đổi dưới đây là PR mở đang đề xuất, không phải tính năng đã phát hành.

- **Phân trang công cụ MCP** — PR #29843 (mở) bọc `discoverTools` trong `packages/core/src/tools/mcp-client.ts` để đi theo token `nextCursor` từ `tools/list`. Nó ngăn các MCP server có nhiều công cụ âm thầm bỏ hết mọi thứ sau trang đầu (sửa #29825). Đáng quan tâm nếu bạn kết nối các server expose nhiều công cụ hơn một trang.
- **Khử trùng lặp khi thử lại** — PR #30020 (mở) khiến `GeminiChat` bỏ các lệnh gọi công cụ được stream bởi lần thử thất bại trong lúc thử lại giữa stream. Trước đây cả lệnh gọi của lần thất bại lẫn lần thành công đều được thực thi, nên một lệnh có tác dụng phụ có thể chạy hai lần.
- **Giữ lịch sử phiên** — PR #30019 (mở) ngăn việc che đầu ra công cụ gộp prompt đầu tiên của người dùng vào các lượt liền kề, nhờ đó khi tiếp tục một phiên đã bị che vẫn giữ được prompt đó.

**Đáng biết**

- Issue #21409 (mở, p1, 8 bình luận, 8 👍): agent đa dụng bị treo vô thời hạn khi được gọi; tác giả báo đã chờ tới một giờ. Yêu cầu model không nhường cho subagent sẽ tránh được. Dữ liệu không có bản sửa nào.
- Issue #21968 (mở, p2, 7 bình luận): tác giả báo Gemini hiếm khi dùng skill tùy chỉnh và subagent trừ khi được yêu cầu rõ ràng.
- PR #29989 (mở, p2) đề xuất sửa việc escape `\n` ngây thơ làm hỏng các chuỗi escape trong chỉnh sửa file và đầu ra văn bản của công cụ.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua; các bản sửa lỗi script cài đặt dưới đây vẫn là PR đề xuất, chưa phải hành vi đã phát hành.

- PR #5093 đề xuất xác minh mục checksum khớp với tarball đã tải, thay vì kiểm tra `SHA256SUMS.txt` bằng `--ignore-missing`, vốn có thể pass một cách vô nghĩa. Điều này quan trọng nếu bạn cài qua script curl/wget.
- PR #2565 đề xuất ngăn các mục PATH trùng lặp khi cài lại, vì kiểm tra `command -v copilot` hiện tại cần khởi động lại shell mới phản ánh bản cài mới.
- PR #1598 đề xuất thêm trap để dọn thư mục tạm `mktemp -d` khi `install.sh` thoát sớm dưới `set -e`.

**Đáng chú ý**

- Issue #5236 (Windows): cache token của Entra broker vẫn 0 byte sau khi đăng nhập MCP, nên mỗi tiến trình mới lại hỏi chọn tài khoản. Ba bình luận; dữ liệu chưa có bản sửa.
- Issue #5254: một phiên 1.0.103 được tiếp tục đã tăng lên 37,3 GiB dung lượng vật lý sau khoảng 6 giờ 19 phút làm việc với agent song song. Hai bình luận; dữ liệu chưa có bản sửa.
- Issue #5281 (Windows): trình chạy lệnh shell không kế thừa biến môi trường PowerShell, làm hỏng các lệnh dựa vào biến như `GITHUB_PERSONAL_ACCESS_TOKEN`.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Những gì đã thay đổi**

- v2.2.1 thêm chế độ goal: chạy `/goal <objective>` trong TUI hoặc Desktop, và phiên tiếp tục cho đến khi người kiểm tra xác nhận đã đạt mục tiêu. Điều khiển bằng `/goal pause`, `/goal resume` hoặc `/goal clear` ([#59437](https://github.com/anomalyco/opencode/pull/59437)). Tính năng này hữu ích khi một tác vụ cần chạy qua nhiều lượt mà bạn không phải nhắc lại.
- v1.19.5 sửa lỗi request worker TUI thất bại, giờ trả về lỗi thay vì để bên gọi bị treo ([#54936](https://github.com/anomalyco/opencode/pull/54936), bởi @Nowaker).
- process-daemon v0.3.2 phát hành kèm opencode-pty 0.3.2 (giao thức 7), đăng lên npm với tên @opencode/pty@0.3.2.

**Đáng chú ý**

- OpenCode 2.2.0 được báo cáo là crash ngay sau khi cập nhật từ 2.1.4, lỗi `UnknownError: An error occurred in Effect.tryPromise`. Dữ liệu này chưa thấy bản sửa nào ([#59684](https://github.com/anomalyco/opencode/issues/59684)).
- Một thread về sự cố gói miễn phí đề cập các lỗi như "Free usage exceeded" và đồng hồ đếm reset không bao giờ reset. Thread có 80 bình luận ([#59387](https://github.com/anomalyco/opencode/issues/59387)).
- Yêu cầu sandbox agent và hạn chế truy cập file ngoài thư mục làm việc vẫn đang mở với 105 bình luận ([#2242](https://github.com/anomalyco/opencode/issues/2242)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua; các mục dưới đây là hoạt động issue và PR, không phải hành vi đã được phát hành.

- `pi.exec()` có đề xuất giới hạn đầu ra. PR [#11546](https://github.com/earendil-works/pi/pull/11546) đóng [#11360](https://github.com/earendil-works/pi/issues/11360), nơi việc tích lũy stdout/stderr không giới hạn làm crash tiến trình với `RangeError: Invalid string length` khi vượt giới hạn ~536M ký tự của V8. Giới hạn mặc định là giá trị nhỏ hơn giữa 256 MiB và giới hạn chuỗi của runtime, và trả về `truncated: true` kèm exit code khác 0.
- `stripAnsi` có đề xuất sửa cho các chuỗi CSI private-parameter. PR [#11543](https://github.com/earendil-works/pi/pull/11543) xử lý [#11377](https://github.com/earendil-works/pi/issues/11377): `ESC[<35;59;1M` báo cáo chuột để lại `35;59;1M` dưới dạng văn bản trong đầu ra của tool.
- Resize ảnh trả về PNG quá khổ. Issue [#11550](https://github.com/earendil-works/pi/issues/11550) báo cáo rằng `resizeImageInProcess` chọn ứng viên đầu tiên dưới `maxBytes`, và PNG luôn đứng đầu, nên một ảnh cỡ JPEG có thể được gửi dưới dạng PNG lớn hơn ~10 lần.

**Đáng chú ý**

- Model mặc định đã lưu nhưng thiếu trong catalog bị thay thế âm thầm bằng fallback. Issue [#10812](https://github.com/earendil-works/pi/issues/10812) và [#9884](https://github.com/earendil-works/pi/issues/9884) mô tả các phiên bắt đầu với `deepseek/deepseek-v4-pro` thay vì model đã cấu hình, không có cảnh báo. Không có fix trong dữ liệu.
- `pi.exec("npm", …)` thất bại trên Windows. Issue [#10616](https://github.com/earendil-works/pi/issues/10616) báo cáo exit 1 với stdout rỗng cho các lệnh `.cmd`; cùng lệnh đó hoạt động qua bash tool.
- `resizeImage` trả về null trong các binary Bun đã biên dịch. Issue [#10645](https://github.com/earendil-works/pi/issues/10645) (đã đóng) đề cập các tệp đính kèm ảnh bị bỏ sót trong `v0.87.1` và `v1.0.4`.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Những gì đã thay đổi**

- Desktop v0.26.3 bổ sung quy tắc quyền theo phiên và phê duyệt tự động cho các phiên được quản lý ([#15448](https://github.com/QwenLM/qwen-code/pull/15448)), cho phép người dùng desktop được quản lý phê duyệt trước các hành động trong phiên thay vì xác nhận từng thao tác. Dùng khi một phiên chạy dài không có người trông.
- v0.26.3-nightly.20261028.ca204559a7 sửa lỗi báo cáo cấu hình cho các control bị âm thầm loại bỏ ([#15794](https://github.com/QwenLM/qwen-code/pull/15794)). Những cài đặt trước đây biến mất không cảnh báo nay hiện trong báo cáo.
- Thẻ UI được tạo nay giữ nguyên input và trạng thái khi điều hướng và ở chế độ chia màn hình, hiện chế độ xem trực tiếp sau lần tính đầu tiên, và chỉ render cho client hỗ trợ MCP Apps ([#15611](https://github.com/QwenLM/qwen-code/pull/15611), [#15787](https://github.com/QwenLM/qwen-code/pull/15787)).

**Đáng chú ý**

- Máy chủ MCP có tên tool trùng nhau bị loại bỏ toàn bộ, kèm theo lỗi "không có tool" thứ hai gây hiểu nhầm. Được báo cáo trên 0.26.2 chạy macOS; dữ liệu chưa có bản sửa ([#15741](https://github.com/QwenLM/qwen-code/issues/15741)).
- `writeCodingPlanConfig` và `writeModelProvidersConfig` của tiện ích VS Code ghi đè toàn bộ đối tượng `settings.model`, xóa các khóa cùng cấp như `baseUrl` và `reasoningEffort` ([#15822](https://github.com/QwenLM/qwen-code/issues/15822)).
- Việc abort hoặc close SDK có thể để tiến trình CLI worker được khởi chạy lại tiếp tục chạy ([#13016](https://github.com/QwenLM/qwen-code/issues/13016)). Đang mở, P1, chưa có bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*