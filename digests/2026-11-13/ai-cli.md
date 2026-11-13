# Bản tin cộng đồng công cụ AI CLI 2026-11-13

> Tạo lúc: 2026-11-13 06:26 UTC | Công cụ theo dõi: 7

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

# Claude Code Skills — 2026-11-13

**claude-api skill: cập nhật hướng dẫn cho pause_turn trên Python** (open)
Hướng dẫn cho Python nói rằng tool runner không thể tiếp tục `pause_turn` và khuyên khởi động lại nó trong một vòng lặp bên ngoài. Python SDK 1.1.0 đã thêm khả năng tự động tiếp tục, nên bộ đếm đó không còn giới hạn các request bị tạm dừng nữa. [PR #1950](https://github.com/anthropics/skills/pull/1950)

**mcp-builder: hỗ trợ import `mcp>=2` và custom header** (open)
Trong `mcp>=2.0.0`, `streamablehttp_client` được đổi tên thành `streamable_http_client`, và custom HTTP header chuyển sang `create_mcp_http_client` thay vì truyền trực tiếp qua kwarg. `connections.py` vẫn dùng dạng cũ. [PR #1742](https://github.com/anthropics/skills/pull/1742)

**scnet-hpc: vận hành cụm SCNet HPC** (open)
Skill này bao gồm các workflow SSH và Slurm theo profile cho cụm SCNet, gồm thiết lập SSH, tạo job, dò tìm cụm và làm mới profile. [PR #1615](https://github.com/anthropics/skills/pull/1615)

### Các yêu cầu đang mở

**Chia sẻ skill trong toàn tổ chức trên Claude.ai** — một người dùng đề nghị có thư viện skill dùng chung hoặc link chia sẻ trực tiếp, thay vì phải tải file `.skill` rồi gửi qua Slack để đồng nghiệp tự upload thủ công. [Issue #228](https://github.com/anthropics/skills/issues/228)

---

**Nội dung thay đổi**

v2.1.323 bổ sung Code Mode, một tính năng thử nghiệm cho phép bật tùy chọn để agent viết JavaScript gọi chính các công cụ của nó. Bật theo từng người dùng hoặc tắt theo tổ chức tại code.claude.com/docs/en/code-mode. Liên kết changelog hiện trả về 404 (#109442).

Cùng bản phát hành này đã xóa cài đặt `subagentStatusLine`. Các tệp cài đặt còn giữ khóa này giờ vẫn tải được nhưng khóa bị bỏ qua, và thông tin ngữ cảnh, chi phí, model cùng mức effort của từng agent không còn hiển thị nữa (#109446).

`plugin.json` có thêm `engines["claude-code"]`, cho phép plugin khai báo những phiên bản Claude Code mà nó hỗ trợ.

**Đáng chú ý**

Issue #69044, mở từ 2026-06-17 và hiện có 136 bình luận, là nhật ký nhiều tháng của một người dùng về các lỗi lặp lại trong quá trình sử dụng hằng ngày. Dữ liệu không ghi bản sửa nào.

Issue #34255 (74 bình luận, 112 👍) báo cáo các kết nối Remote Control trên macOS và iOS tự ngắt im lặng mà không tự kết nối lại. Ghi chú phát hành không thấy bản sửa.

Issue #109455 báo cáo một phiên bị dừng do chạm giới hạn tự động chạy lại vào lúc đặt lại hạn mức và tiêu hết cửa sổ mới mà không có người trông.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

- Codex CLI 0.168.0 cho phép bạn duyệt các nhà cung cấp model trong Sessions → Model providers và chọn mặc định cho các chat mới (#59541, #59722). Đặt một lần khi đổi nhà cung cấp thay vì chỉnh từng chat.
- Bản phát hành này cũng thêm `features.tui_workspace`, mở một cuộc trò chuyện phụ bên cạnh chat chính. Kéo thanh chia để đổi kích thước, hoặc nhấn `leader z` để phóng to khung đang chọn. Hữu ích khi bạn muốn thấy một luồng thứ hai trong lúc làm việc.
- Các PR đề xuất sẽ từ chối `request_key` trong chế độ sandbox seccomp `Restricted` và `ProxyRouted` trên Linux (#61256) và bật gzip cùng zstd trong HTTP client dùng chung (#61264). Cả hai là PR đã đóng, không phải tính năng đã phát hành.

**Đáng chú ý**

- Trên macOS, một Dot follow-up cho task Codex cục bộ đang có bị treo trước khi lượt bắt đầu trên app 26.1106.51428 (#61258, 3 bình luận). Dữ liệu chưa có bản sửa.
- Khởi tạo sandbox trên Windows thất bại với SYSTEM bị từ chối WRITE_DAC trên `.sandbox-bin` (#59038, 6 bình luận), và khi chọn "Full access" thì gửi `permission_profile: "managed"` và rơi về workspace-write (#56663, 5 bình luận). Cả hai đều đang mở.
- Trên Windows với agent WSL, một người dùng yêu cầu Codex kiểm tra trước công cụ Linux và giải thích các bước khôi phục sau khi đổi agent (#61274, 1 bình luận). Đề xuất cải tiến đang mở, chưa có bản sửa.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Đã thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nhưng hai pull request đang mở giải quyết các vấn đề người dùng gặp phải. PR #30266 đề xuất giới hạn chỉ báo thử lại foreground trong prompt chính đang hoạt động, để các lần thử lại từ yêu cầu subagent chạy nền không còn xuất hiện trong đó. PR #30174 đề xuất cho phép các lượt model dài vượt qua timeout body 5 phút của undici thay vì hủy và phát lại yêu cầu tới ba lần.

**Đáng chú ý**

Issue #21409 báo cáo agent tổng quát bị treo vô thời hạn ở các tác vụ đơn giản như tạo thư mục, bao gồm cả trường hợp chờ một giờ; yêu cầu model không giao lại cho subagent sẽ tránh được điều này. Dữ liệu không cho thấy bản sửa nào.

Issue #21968 báo cáo Gemini hiếm khi gọi skill tùy chỉnh hoặc subagent trừ khi được yêu cầu rõ ràng, ngay cả khi chúng phù hợp với tác vụ. Dữ liệu không cho thấy bản sửa nào.

Issue #22323 báo cáo rằng subagent chạm MAX_TURNS trả về `status: "success"` và `Termination Reason: "GOAL"` dù không phân tích gì, khiến các lần gián đoạn trông giống như thành công. Đang mở, 13 bình luận.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

Copilot CLI v1.0.111-0 bổ sung hỗ trợ regex cho các quy tắc quyền Shell, Bash và PowerShell do doanh nghiệp quản lý ([release](https://github.com/github/copilot-cli/releases)). Bản này cũng thêm `--host-allow-session-creation`, cho phép client từ xa tạo phiên trên máy chạy CLI trong một lần khởi chạy mà không đổi cài đặt đã lưu — hữu ích với máy dùng chung hoặc máy CI, nơi bạn không muốn sửa cấu hình lâu dài.

v1.0.110 (2026-11-12) thử nghiệm trả lời các prompt mật khẩu git, ssh và sudo trong một hộp thoại che ký tự, bật bằng `/experimental on`. Bản này cũng tránh các popup lỗi không cần thiết khi đăng nhập Microsoft Entra nếu đã có tài khoản tổ chức.

**Đáng chú ý**

Issue [#5236](https://github.com/github/copilot-cli/issues/5236) (đang mở, 7 bình luận): trên Windows, cache token của Entra broker vẫn ở 0 byte sau khi đăng nhập MCP, nên mỗi tiến trình mới lại hỏi chọn tài khoản. Dữ liệu chưa có bản sửa.

Issue [#5447](https://github.com/github/copilot-cli/issues/5447) (đang mở): `copilot --acp` bỏ qua bước dò `~/.copilot/ide`, nên phiên ACP không có MCP server của IDE và không bao giờ hiện "Visual Studio Connected", trong khi CLI tương tác kết nối trong khoảng 1 giây. Dữ liệu chưa có bản sửa.

Issue [#5446](https://github.com/github/copilot-cli/issues/5446) (đang mở): cache snapshot công cụ MCP được lưu lại phình to theo các workspace tạm và có thể làm cạn bộ nhớ lúc khởi động. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua, nên đây là các thay đổi đang phát triển, chưa được phát hành.

- **Đang bổ sung các nhà cung cấp tạo video.** Các PR đề xuất thêm tạo video Seedance (#63680), OpenRouter (#63681), MiniMax (#63682) và Kling (#63684) vào `@opencode/ai`. Quan trọng nếu bạn tạo media qua API của nhà cung cấp.

- **Plan mode có thể ngừng đánh thức lại phiên sau khi nén.** PR #63669 cho biết nó gỡ bỏ đoạn code thêm lại nhắc nhở của Plan dưới dạng tin nhắn tổng hợp sau mỗi lần nén, nguyên nhân gây vòng lặp (đóng #62628). Chưa phát hành.

- **Đề xuất hỗ trợ Safari < 17.4.** PR #63332 polyfill `AbortSignal.any` cho Safari và các trình duyệt cũ hơn (đóng #62873), nơi ứng dụng hiện đang hỏng.

**Đáng chú ý**

- **Lượt chạy hủy mà không rõ nguyên nhân.** Issue #63632 báo cáo các lượt chạy v2.0.22/2.0.27 chết không rõ lý do, với store và stream không khớp nhau và các trường quyết định bị mất. Đang mở, 8 bình luận.

- **Giới hạn gói miễn phí bị chạm nhanh.** Issue #63658 báo cáo giới hạn miễn phí bị chạm trong vòng 5 phút. Đang mở; dữ liệu chưa có cách khắc phục.

- **Đổi tên chỉ khác chữ hoa chữ thường sẽ xóa file.** Issue #63126, đã tái hiện và được đánh dấu mức nghiêm trọng cao, báo cáo rằng một patch chỉ thay đổi chữ hoa chữ thường của tên file sẽ xóa file đó trên hệ thống file không phân biệt chữ hoa chữ thường (macOS, Windows). Đã đóng, dữ liệu chưa rõ cách khắc phục.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

`find` không còn khớp mẫu đường dẫn xuyên qua các thư mục phía trên đường dẫn tìm kiếm. Trong PR #12116 (đóng #12066), `find src/**/*.ts` trong `~/src/app` trả về mọi tệp `.ts` trong dự án; fd giờ neo glob tại đường dẫn tìm kiếm. Điều này quan trọng khi dự án nằm trong thư mục cha cùng tên.

`/copy` bỏ qua các lượt kết thúc mà không có câu trả lời. PR #12121 (đóng #12119) khiến `getLastAssistantText()` bỏ qua các tin nhắn chỉ gọi công cụ và tin nhắn rỗng sau Esc, nên `/copy` trả về câu trả lời thật cuối cùng.

Các model GitHub Copilot Gemini giờ có thể nhận `reasoning_effort`, và `usage.reasoning_tokens` được đọc. PR #12110 (đóng #12019) lấy cờ này từ models.dev; PR đang mở, chưa phát hành, nên `--thinking` chưa có tác dụng cho đến khi được merge.

**Đáng chú ý**

Với `cacheWarming: "idle"`, quá trình làm ấm khi rảnh lặng lẽ dừng lại một khi extension xử lý `turn_end` và ngữ cảnh chứa tin nhắn tùy chỉnh hoặc tin nhắn nén (#10956, 14 bình luận, đang mở). `/session` hiển thị `Inactive (conversation context changed)`. Dữ liệu chưa có bản sửa.

Trên các luồng tin nhắn Anthropic, mọi lần gửi lại toàn bộ sau khi fallback `thread_not_found` đều làm mất các thinking block với `prefix_binding_mismatch`, nguyên nhân là một đối số công cụ dạng số nhưng kiểu chuỗi (#12098, đang mở). Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Có gì thay đổi**

- v0.27.3 thêm chip phía trên ô soạn thảo của Web Shell cho các workflow chạy nền, shell, monitor và agent cục bộ chưa hoàn tất. Bạn thấy và nhảy về được công việc chạy nền vẫn đang chạy. Điều này quan trọng nếu bạn chạy tác vụ dài từ Web Shell.
- v1.0.0-preview.1 sửa lỗi tài khoản đăng ký Qwen không dùng được model đăng ký sau khi đăng nhập. Danh mục model giờ tự theo trạng thái đăng nhập, nên không cần cấu hình provider thủ công. Chỉ liên quan nếu bạn dùng tài khoản đăng ký.
- SDK TypeScript v0.1.33 đóng gói CLI phiên bản 0.27.3. Ghi chú phát hành cũng liệt kê CLI 0.27.2 đi kèm, nên hãy kiểm tra phiên bản bạn thực sự ghim.

**Đáng chú ý**

- Issue #17093 (mở): trong một lượt chạy headless một lần, `run_shell_command` có thể trả về output rỗng với mã thoát 0 khi nhiều lệnh gọi công cụ kết thúc gần như cùng lúc. Dữ liệu không nêu bản sửa nào.
- Issue #17040 (mở, P1): trong daemon Web Shell, một phiên bị chết với lỗi "agent channel closed mid-request" sau các lệnh gọi `curl`/công cụ mạng. Dữ liệu không nêu bản sửa nào.
- Issue #16030 (mở): WebKitGTK đi kèm trong AppImage Linux cần 9 thư viện không có trong image, khiến dán ảnh bị hỏng. Có mô tả cách xử lý tạm; không có bản sửa chính thức nào được nêu.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*