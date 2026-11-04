# Bản tin cộng đồng công cụ AI CLI 2026-11-04

> Tạo lúc: 2026-11-04 06:03 UTC | Công cụ theo dõi: 7

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

**fix(mcp-builder) — hỗ trợ import HTTP client của mcp>=2**
Cập nhật script kết nối của MCP builder để chạy được với `mcp>=2.0.0`, nơi `streamablehttp_client` được đổi tên thành `streamable_http_client` và các custom header giờ truyền qua `create_mcp_http_client`. Dùng khi build hoặc test MCP server trên SDK mới hơn. Đang mở (anthropics/skills PR #1742).

**Thêm skill md2video-audio — Markdown sang MP4 kèm voiceover**
Biên dịch tài liệu Markdown thành video MP4 qua slide Marp kèm voiceover giống giọng người, theo mô tả của tác giả. Dùng khi cần biến một tài liệu thành video có thuyết minh. Đang mở (anthropics/skills PR #1703).

**Thêm skill pyxel — phát triển game retro**
Hướng dẫn tạo, debug và kiểm tra game Python retro, bao gồm chạy headless theo input, xem trực tiếp từng frame và kiểm tra state theo từng tác vụ. Dùng khi build hoặc test game Pyxel. Đang mở (anthropics/skills PR #525).

**Yêu cầu đang mở**

`claude-api` tiêm khoảng 156k token trong một tool call, làm cạn context window; người báo cáo chạy Claude Code 2.1.220 (anthropics/skills Issue #1487).

---

## Những gì đã thay đổi

- **v2.1.318** ghi lại câu trả lời của bạn khi Claude Code hỏi có bật mods mà nó ghi trong phiên hay không. `assume_role` giờ được chấp nhận trên các upstream `mantle` của gateway Claude apps, dành cho vai trò AWS cross-account và phân bổ chi phí theo từng developer.
- PR #95698 đề xuất định tuyến các hook `.sh` của ba plugin đi kèm qua `bash` với đường dẫn được trích dẫn, sửa phần ralph-wiggum và output-style của #78490. Chưa phát hành.
- PR #106972 đề xuất đặt `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` trên các lượt dedupe để agent hoàn thành lượt của mình thay vì bị cắt ngang. Đang phát triển.

## Đáng chú ý

- Issue #97074: `claude -p` headless (entrypoint `sdk-cli`) tiêu thụ cửa sổ 5 giờ nhiều hơn khoảng 1,8 lần trên mỗi token so với `cli` tương tác trên cùng khối lượng công việc, theo đo lường của tác giả. 68 bình luận; không có bản sửa trong dữ liệu.
- Issue #45596: `/buddy` biến mất trong v2.1.97 mà không có ghi chú changelog; 1195 👍 và 284 bình luận yêu cầu khôi phục. Vẫn mở.
- Issue #107144: kiểm tra email tài khoản trong 2.1.317+ từ chối các lệnh Bash chỉ chạy cục bộ (ghi heredoc, curl tới 127.0.0.1) trong các lượt bypass headless. Báo cáo ngày 2026-11-04.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Những thay đổi

**Ngân sách hình ảnh hợp nhất được bật mặc định** — PR #59282 đánh dấu `unified_image_budget` là ổn định, nên các model được hỗ trợ giờ chuẩn bị ảnh ở mức chi tiết `original`. Điều này tăng độ trung thực của ảnh, và `view_image` bỏ tham số `detail` khỏi schema. Đáng lưu ý nếu prompt hoặc công cụ của bạn đặt `detail` một cách tường minh.

**Phím tắt chuyển focus theo hướng trong workspace mode** — PR #59287 thêm `focus_pane_left` và `focus_pane_right` có thể cấu hình (mặc định `leader left`/`leader h` và `leader right`/`leader l`). Việc này cho phép bạn di chuyển giữa cuộc trò chuyện chính và cuộc trò chuyện bên cạnh mà không cần mở lại pane đang ẩn.

**rust-v0.168.0-alpha.1 đã ra mắt** — một bản alpha mới, không có chi tiết changelog trong dữ liệu. Bản alpha thay đổi hành vi không báo trước; chỉ dùng khi bạn chấp nhận được điều đó.

## Đáng chú ý

**Issue #59060** (đang mở, 115 bình luận): một người dùng báo cáo Codex CLI v0.166.0, khi được yêu cầu khởi động lại một server, đã phá hủy systemd, phá hủy container và chạy các script ngẫu nhiên. Không có bản sửa trong dữ liệu.

**Issue #54227** (đang mở, 11 bình luận): một người dùng ChatGPT Pro trên Windows báo cáo lỗi `server_overloaded` lặp lại và lỗi compact từ xa trên nhiều model Codex kể từ ngày 10 tháng 9. Không có bản sửa trong dữ liệu.

**Issue #59323** (đang mở): một người dùng Enterprise trên Windows với phiên bản 26.1029.61003 không thể tiếp tục các cuộc trò chuyện dùng nhà cung cấp model được cấu hình khác sau một bản cập nhật. Không có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Điều gì đã thay đổi**

Gemini CLI phát hành bản nightly v0.67.0-nightly.20261104.g89e9d25d6 với hai bản sửa lỗi. CLI giờ xử lý lỗi luồng khi tải bản phát hành extension (PR #30100), và core giữ nguyên model `gemini-2.5-flash` khi được đặt tường minh trong quá trình phân giải model động. Điểm thứ hai quan trọng nếu bạn ghim model đó và cần nó không bị thay thế.

Hai bản sửa đề xuất đang được xử lý cho hai báo cáo người dùng tồn đọng. PR #30122 sẽ tải định nghĩa agent từ các file markdown có symlink trong `~/.gemini/agents/`, sửa issue #20079, nơi các file agent có symlink bị bỏ qua. PR #30124 sẽ yêu cầu một ranh giới dấu phân cách đường dẫn trong `tildeifyPath()`, ngăn các thư mục anh em có tiền tố chung bị viết lại thành đường dẫn home.

**Đáng chú ý**

Issue #21409 (8 bình luận, 8 👍) báo cáo agent generalist treo vô hạn ở các tác vụ đơn giản như tạo thư mục; hướng dẫn model không chuyển sang subagent là cách xử lý tạm. Không có bản sửa nào trong dữ liệu này.

Issue #22323 (13 bình luận) báo cáo subagent `codebase_investigator` trả về `status: "success"` và `Termination Reason: "GOAL"` sau khi chạm giới hạn lượt tối đa trước khi phân tích. Không có bản sửa nào trong dữ liệu này.

Issue #24246 báo cáo lỗi 400 khi có hơn 128 tool khả dụng. Không có bản sửa nào trong dữ liệu này.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi**

- v1.0.106-8: Tải model local trên Windows giờ tự động cài llama.cpp và hiển thị tiến trình cài engine. Điều này quan trọng nếu bạn chạy model local trên Windows và trước đây phải tự cài engine.
- v1.0.106-7 thêm `/code`, mở phiên hiện tại trong VS Code, và một thiết lập Fusion tier trong `copilot config`. Điều này quan trọng khi bạn muốn tiếp tục phiên CLI trong editor.
- v1.0.106-6 khiến `/settings` mở dashboard hợp nhất cho mọi người dùng và thêm tìm kiếm toàn cục trên settings lẫn tài nguyên local.

**Đáng chú ý**

- Issue #5347: mọi phiên tương tác đều in "Connected Connectors could not be loaded", trong khi cùng phiên bản, tài khoản và thư mục vẫn tải Connectors thành công ở chế độ `-p`. Lỗi gốc chỉ được ghi log ở mức debug. Đang mở, chưa có bản sửa trong dữ liệu.
- Issue #5343: `providers.json` bị bỏ qua nếu thiếu `COPILOT_PROVIDER_BASE_URL`, và `--model` âm thầm thay bằng một model thuộc subscription. Ảnh hưởng đến người dùng BYOK, gồm cả plugin tự gọi `copilot -p`. Đang mở.
- Issue #5270: khi chọn GPT-6.1 Sol, quá trình chuyển từ chế độ Plan sang Implementation không bao giờ xảy ra. Ảnh hưởng đến người dùng chọn model đó trực tiếp hoặc qua Auto. Đang mở.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## Có gì thay đổi

**Không có bản phát hành nào trong 24 giờ qua.** Không có gì được ship; các mục dưới đây đã được merge hoặc đang chờ review.

**Tiến trình nền lạc trên `opencode run`** — PR #61564 ngăn `run` để lại tiến trình `serve --service` tách rời khi thoát. Điều này quan trọng trong CI và Docker, nơi tiến trình mồ côi vẫn tồn tại (issue #55908). PR đang mở, chưa merge.

**Fork phiên giờ đã đến được client** — PR #61559 phát `session.forked` bên cạnh `session.created`, nên các phiên được fork xuất hiện mà không cần refresh thủ công. Đóng #61554; vẫn đang review.

**Giới hạn ảnh mỗi request** — PR #61563 thêm giới hạn theo số lượng qua `media.image.max_images`, xử lý các phiên gửi lại toàn bộ ảnh trong lịch sử mỗi request (#59794) và trở nên không dùng được trên các backend có giới hạn ảnh mỗi prompt, như vLLM. Đang mở.

## Đáng chú ý

**Lỗi gói miễn phí vẫn là thread đứng đầu.** Issue #59387 (254 bình luận) tập hợp các báo cáo về `Free usage exceeded`, việc reset tin nhắn miễn phí không bao giờ kích hoạt, và lỗi gói miễn phí trên Desktop. Chưa có bản sửa nào được liệt kê.

**Mất dữ liệu khi migrate V1→V2.** Issue #49827 ẩn các phiên không phải git (dự án toàn cục) khỏi trình chọn TUI sau khi nâng cấp; #54736 hủy toàn bộ quá trình migrate khi các message ID cũ không khớp schema `Session.Message.ID`.

**Subagent chạy song song phá prompt cache.** Issue #61318 và #61556 báo cáo agent chính và agent con đẩy cache của nhau ra khi chạy đồng thời; phiên một agent không bị ảnh hưởng.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào ra mắt trong 24 giờ qua, nên hôm nay không có gì mới để cài đặt. Những thay đổi dưới đây là các bản sửa lỗi đã được hợp nhất và các đề xuất đang mở, hiển thị trong dữ liệu issue và PR.

Một tiến trình ở chế độ RPC giờ sẽ thoát khi có lệnh gọi `ctx.shutdown()` nhàn rỗi từ một extension, ví dụ như callback của timer, thay vì chờ lệnh tiếp theo ([#11599](https://github.com/earendil-works/pi/issues/11599)). Một PR tiếp theo giữ cho tiến trình shutdown đã bắt đầu tiếp tục chạy khi stdin đóng và SIGTERM đến trong cùng một tick ([#11752](https://github.com/earendil-works/pi/pull/11752)). Điều này liên quan nếu bạn chạy `--mode rpc` dưới systemd hoặc một supervisor.

Công cụ grep giờ lấy các dòng ngữ cảnh từ ripgrep thay vì đọc toàn bộ từng file khớp, khắc phục lỗi crash do hết bộ nhớ khi dùng SDK headless ([#9276](https://github.com/earendil-works/pi/issues/9276), [#11705](https://github.com/earendil-works/pi/pull/11705)).

MCP Streamable HTTP giờ áp dụng `maxMessageBytes` cho các phản hồi `application/json`, không chỉ SSE ([#11335](https://github.com/earendil-works/pi/issues/11335), [#11749](https://github.com/earendil-works/pi/pull/11749)).

**Đáng chú ý**

Trên Windows với mintty và ConPTY, các phản hồi truy vấn màu terminal rò rỉ vào prompt và BEL mở trình soạn thảo bên ngoài; phiên bản 0.99.x bị ảnh hưởng, 0.87.1 thì không ([#10256](https://github.com/earendil-works/pi/issues/10256), 23 bình luận, đang mở, đang xử lý).

Trên Windows, Ctrl+V không được gán phím trong trình soạn thảo; chỉ có Alt+V để dán ([#11765](https://github.com/earendil-works/pi/issues/11765), đã đóng).

`find` không trả về kết quả cho các mẫu glob dùng dấu phân cách backslash như `src\**\*.ts`, và không báo lỗi ([#9262](https://github.com/earendil-works/pi/issues/9262), đang mở).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Đã thay đổi gì**

- **Phát hành v0.26.7.** Bản này thêm cài đặt `model.catalogRefresh` theo phạm vi operator và cho phép `privacy.usageStatisticsEnabled: false` dừng việc làm mới danh mục model chạy nền. Ghi chú phát hành không liệt kê thay đổi gây vỡ tương thích. ([release](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.7))

- **Đang hợp nhất cơ chế tin cậy cho project-hook (PR #16264, đang mở).** Bản sửa khiến hook trong `.qwen/settings.json` chỉ được nạp khi thư mục được tin cậy rõ ràng ở mọi chế độ — TUI, headless và ACP/SDK — bỏ quyền miễn trừ cho chế độ không tương tác. Báo cáo bảo mật liên quan #14746 đã đóng. Chưa phát hành.

- **Windows CUA Driver 0.27.0 bị gắn cờ.** Bitdefender chặn tệp ZIP x64 chính thức với mã `Gen:Variant.Barys.381847` và từ chối truy cập (issue #16249, đang mở, P1). Dữ liệu chưa có bản sửa.

**Đáng chú ý**

- **Tác vụ theo lịch bền vững có thể biến mất im lặng.** Sau khi daemon khởi động lại, tác vụ có session không còn tồn tại sẽ không khôi phục được, không cảnh báo và không chạy bù (issue #16207, đang mở, P1). Ảnh hưởng đến người dùng daemon; dữ liệu chưa có bản sửa.

- **Workflow của bot làm cạn rate limit `GITHUB_TOKEN`.** Các đợt gọi dồn dập từ workflow autofix, triage và review khiến job CI không liên quan thất bại với HTTP 403 (issue #16188, đang mở, P1). Báo cáo ngày 2026-11-03.

- **Response có thể timeout ở khoảng 300s.** Request tương thích Anthropic trong 0.26.4 ngắt kết nối gần 301s dù đã đặt `QWEN_CODE_API_TIMEOUT_MS`; issue #16187 đã đóng.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*