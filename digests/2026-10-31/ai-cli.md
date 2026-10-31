# Bản tin cộng đồng công cụ AI CLI 2026-10-31

> Tạo lúc: 2026-10-31 05:25 UTC | Công cụ theo dõi: 7

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

**proofcore-contract-auditor — kiểm tra hợp đồng thông minh tĩnh kèm bằng chứng trên chuỗi**
Quét hợp đồng Solidity và Rust để tìm lỗ hổng, rồi neo kết quả kiểm tra thành bằng chứng mật mã trên blockchain TON. Dùng khi agent cần tạo bản ghi kiểm tra có thể xác minh cho mã Web3; đây là pull request đang mở (anthropics/skills PR #1771).

**notion-spec-to-implementation — biến đặc tả sản phẩm thành task Notion**
Chia một trang đặc tả thành kế hoạch triển khai gồm task cụ thể, tiêu chí nghiệm thu và theo dõi tiến độ để agent thực thi tiếp. Đây là pull request đang mở (anthropics/skills PR #1245).

### Yêu cầu đang mở

**Skill cộng đồng phát hành dưới namespace `anthropic/`**
Các skill do cộng đồng làm đang được phát hành dưới namespace `anthropic/`, theo người báo cáo thì điều này cho phép chúng mạo danh skill chính thức của Anthropic và khiến người dùng cấp quyền cao hơn (anthropics/skills Issue #492).

---

**Những gì đã thay đổi**

- v2.1.316 thêm `CLAUDE_CODE_DISABLE_ULTRATHINK`, biến tắt từ khóa `ultrathink`. Đặt biến này khi bạn muốn từ khóa bị bỏ qua thay vì kích hoạt suy luận mở rộng.
- Bản phát hành này cũng thêm ngân sách nhóm gộp vào gateway của ứng dụng Claude. Quản trị viên đặt `pooled_budget` trên API quản trị giới hạn chi tiêu, cho một nhóm một ngân sách hàng tháng dùng chung giữa các thành viên, cộng thêm hạn mức riêng của từng người.

**Đáng chú ý**

- Trình cài đặt gốc tạo ra gói ứng dụng macOS chưa được ký (unsealed), khiến kiểm tra chữ ký mã từ chối, nên macOS báo `ClaudeCode.app` là "hư hỏng và không thể mở" (issue #70647, đang mở, 17 bình luận, 8 👍). Dữ liệu chưa cho thấy bản sửa nào.
- Kết quả từ công cụ MCP qua stdio lớn hơn khoảng 8 MiB sẽ đóng kết nối và giết server (issue #105703, đang mở, 2 bình luận). Tác giả đã tái hiện bằng một server tối giản; dữ liệu chưa cho thấy bản sửa nào.
- `--dangerously-skip-permissions` không giúp agent chạy không giám sát đọc được artifact Claude chia sẻ qua liên kết, vì công cụ Artifact yêu cầu xác nhận thủ công mỗi phiên (issue #106332 và #106321, cả hai đang mở).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua. Hai thay đổi đang trong quá trình phát triển, chưa phát hành.

- **Đề xuất: bật mặc định deferred tool world state.** PR #58410 đánh dấu `deferred_tool_world_state` là ổn định và bật nó, chuyển các không gian tên công cụ deferred vào ngữ cảnh `<tools>` của nhà phát triển thay vì mô tả `tool_search`. Tắt rõ ràng tính năng này sẽ giữ nguyên hành vi khám phá cũ. Điều này quan trọng khi bạn dựa vào `tool_search` để tìm công cụ.
- **Đề xuất: chuyển phiên TUI giữa các backend.** PR #58457 tiếp tục một cuộc hội thoại đã chọn thông qua backend sở hữu nó, nên trình chọn phiên không còn từ chối các cuộc hội thoại từ backend khác.

**Đáng chú ý**

- Bão tiến trình taskkill/conhost trên Windows vẫn tiếp diễn: Issue #33776 (44 bình luận) báo cáo hàng trăm tiến trình `taskkill.exe`/`conhost.exe` còn sót lại gây bão WMI và suy giảm DWM. Không có bản sửa trong dữ liệu.
- Hồi quy hooks trên desktop: Issue #21639 (29 bình luận) báo cáo hooks không còn chạy sau bản cập nhật Codex Desktop. Không có bản sửa trong dữ liệu.
- Người dùng Pro mất vòng sử dụng hàng tuần trên macOS: Issue #57333 báo cáo vòng sử dụng hàng tuần của Codex trên macOS bị thiếu ở gói Pro nhưng vẫn hiển thị ở gói Plus. Không có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

- Bản nightly `v0.67.0-nightly.20261031.g6814e00d6` sửa hai lỗi lõi: shadow repo giờ tuân thủ `.git/info/exclude` và `core.excludesFile` ([PR #30034](https://github.com/google-gemini/gemini-cli/pull/30034)), và `CodeAssistServer` xả buffer SSE còn tồn đọng khi stream kết thúc ([PR #30059](https://github.com/google-gemini/gemini-cli/pull/30059)). Lỗi đầu quan trọng nếu các file bạn loại trừ vẫn xuất hiện trong ngữ cảnh của agent; lỗi sau quan trọng nếu sự kiện stream cuối cùng bị âm thầm bỏ mất.

**Đáng lưu ý**

- Tình trạng agent tổng quát bị treo được báo trong [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) (8 bình luận, 8 👍): chuyển sang agent tổng quát thì treo vô thời hạn, kể cả khi chỉ tạo thư mục đơn giản. Tác giả vượt qua bằng cách yêu cầu model không dùng sub-agent. Dữ liệu chưa có bản sửa.
- Tình trạng sub-agent cạn lượt được báo là `status: "success"` với `Termination Reason: "GOAL"` trong [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) (13 bình luận, p1). Nếu bạn viết script dựa trên trạng thái của sub-agent, một lượt chạy bị ngắt có thể trông như đã hoàn thành.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**
- Không có bản phát hành nào trong 24 giờ qua, nên hôm nay không có gì thay đổi với người dùng.
- PR #5310 (đang mở, devm33) đề xuất sửa lỗi smoke-test container trên amd64 và arm64: workspace được tạo với mode `0700`, chặn user runtime của image (UID 10001), và Git init chạy dưới quyền root. Đang phát triển, chưa phát hành.
- PR #5307 và #5308 (đã đóng, brunoborges) sẽ publish một image server Copilot CLI headless lên `ghcr.io/github/copilot-cli` mỗi lần phát hành, giải quyết issue #55. Phản hồi review chỉ ra rằng manifest `latest` hoặc `prerelease` sẵn có không có annotation version có thể bị ghi đè bởi bản phát hành cũ hơn. Chưa phát hành.

**Đáng chú ý**
- Issue #5306: `--available-tools=` với giá trị rỗng sẽ lộ tất cả 21 tool tích hợp thay vì không có tool nào. Không có cách nào được tài liệu hóa để chạy `copilot -p` với zero tool. Đang mở.
- Issue #5301: tool `web_search` tích hợp thỉnh thoảng thất bại với HTTP 504 Gateway Timeout sau khoảng 120s từ GitHub MCP server từ xa; tác giả báo lỗi hơn một nửa số lần gọi trong ~9 ngày. Đang mở.
- Issue #5298: `copilot --model fusion` thất bại trong 1.0.105 với lỗi "requires dynamic Auto tiers" trừ khi bật flag `DYNAMIC_AUTO_TIERS` không được tài liệu hóa. Đang mở.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Những gì đã thay đổi**

- v2.2.5 thêm phím tắt cho worktree và shell mode: `⌘⌥O`/`Ctrl+Alt+O` chọn worktree, `⌘⌥B`/`Ctrl+Alt+B` chọn nhánh base của nó, và `⌘⇧X`/`Ctrl+Shift+X` bật tắt shell mode trong composer. Dùng khi cần xử lý nhiều nhánh mà không rời composer.
- v2.2.3 cho phép dùng Claude Code bên trong OpenCode: cài Claude Code, chạy `claude auth login`, rồi chọn **Claude Agent** trong `/connect`. Cách này đưa đăng nhập và model Claude Code sẵn có của bạn qua OpenCode.
- v2.2.4 giữ terminal trên desktop tồn tại theo từng session; chúng sống sót qua lần khởi động lại server cùng scrollback và đồng bộ với TUI và các cửa sổ khác. Terminal đã đổi tên giữ nguyên tên qua các lần khởi động lại.

**Đáng chú ý**

- Issue #59387 (149 bình luận) là thread theo dõi lỗi gói miễn phí — "Free usage exceeded", lỗi quota, và các lần reset không bao giờ xảy ra. Đây là báo cáo từ người dùng, không phải bản sửa đã xác nhận.
- Issue #60399 báo cáo CLI treo hơn 120 giây trước khi gửi bất kỳ request nào trên các mạng có DPI loại bỏ gói TLS ClientHello bị phân mảnh; `curl` thường vẫn thành công trên cùng máy. Trạng thái: đã tái hiện, đang mở.
- Nhiều báo cáo (#60534, #60455, #59291) mô tả lỗi socket `ECONNRESET`; không có bản sửa nào xuất hiện trong dữ liệu này.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

## Có gì thay đổi

**Reload extension giờ được hoãn lại.** `ctx.requestReload()` thay thế `ctx.reload()` dạng await, nhờ đó extension có thể yêu cầu một lần reload runtime chuẩn sau khi các thao tác, compaction hoặc tóm tắt nhánh hoàn tất (PR #7948). Các reload trực tiếp không an toàn bị từ chối. Thay đổi này đi kèm yêu cầu từ issue #6552.

**Xếp hạng tìm kiếm tool đã được sửa.** `tool_search` giờ trả về một tool khi truy vấn trùng đúng tên tool đó, và tên tool có trọng số cao hơn phần khớp mô tả (PR #11625, #11632). Một PR tiếp theo xếp lại thứ tự các tool khớp nhiều từ khóa truy vấn lên trước. PR #11631 riêng biệt chuyển cùng cách xếp hạng này sang durable.

**Helper interop WSL giờ khởi động từ `/`.** Trước đây Pi kế thừa cwd khi spawn `powershell.exe`, nên các đường dẫn sâu vượt MAX_PATH thất bại với lỗi `Invalid argument` (PR #11627, sửa #11592). PR này cũng báo cáo lỗi trình soạn thảo bên ngoài.

## Đáng chú ý

**Terminal Windows để lọt phản hồi truy vấn màu vào prompt.** Trên mintty/ConPTY ở bản 0.99.x, truy vấn màu lúc khởi động chèn văn bản escape như `;0;rgb:0000/…` vào prompt, và BEL mở trình soạn thảo bên ngoài (#10256, 15 bình luận). Bản 0.87.1 và Windows Terminal không bị ảnh hưởng. PR #11609 đề xuất cách xử lý phản hồi bảng màu không tiền tố của mintty.

**Phiên Anthropic hỏng sau khi extension bỏ một tool giữa phiên.** Mọi request sau đó thất bại với `tool_reference_unresolved` (#11376, 4 bình luận, `prio:p0`). Một lần reload extension ngừng đăng ký tool sẽ kích hoạt lỗi này; issue #10954 báo cáo cùng lỗi trên `anthropic-messages` qua OpenCode Go.

**Chế độ RPC không thoát khi shutdown bất đồng bộ.** Tiến trình `--mode rpc` đang rảnh với stdin mở vẫn sống sau khi extension gọi `ctx.shutdown()` từ timer; yêu cầu không được xử lý cho đến khi có lệnh khác đến (#11599).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Những gì đã thay đổi**

- `cua-driver-rs v0.27.0` phát hành binary Qwen CUA Driver dựng sẵn trong `packages/cua-driver`. macOS nhận một universal binary đã codesign, notarized cùng `QwenCuaDriver.app`; bản Linux và Windows không ký (Linux yêu cầu glibc 2.31 trở lên). Điều này quan trọng nếu bạn điều khiển CUA desktop trên bất kỳ nền tảng nào trong số này.
- Đề xuất trong PR [#15953](https://github.com/QwenLM/qwen-code/pull/15953): kiểm tra "lệnh `cd` này có rời khỏi repo không?" của shell tool sẽ so sánh đường dẫn tuyệt đối của `cd`/`pushd` với thư mục làm việc thực tế. Hiện tại, đường dẫn tuyệt đối bị mặc định là rời khỏi repo, có thể chặn một lệnh amend.
- Đề xuất trong PR [#15789](https://github.com/QwenLM/qwen-code/pull/15789): đầu ra shell được đệm sẽ được giải mã một lần trên các code page không phải UTF-8 (CP936, CP932, CP866). Hiện tại, chunk đầu ra đầu tiên quyết định encoding.

**Đáng chú ý**

- Issue [#15276](https://github.com/QwenLM/qwen-code/issues/15276): cập nhật desktop trên Windows thất bại với lỗi "Error opening file for writing" trên `runtime\qwen-code\node\node.exe`, vì installer giữ khóa Node runtime đi kèm. Đang mở, 4 bình luận.
- Issue [#15919](https://github.com/QwenLM/qwen-code/issues/15919): `@qwen-code/qwen-code@0.26.4` đi kèm fast-uri 3.1.0 thông qua `@modelcontextprotocol/client` 2.0.0, nên bản nâng lên 3.1.7 từ #10862 không áp dụng được cho nó. Đang mở.
- Issue [#15861](https://github.com/QwenLM/qwen-code/issues/15861): lane `web-shell E2E Smoke` timeout ở dialog Add Workspace trên các PR không liên quan, buộc phải phân loại lại nhiều vòng.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*