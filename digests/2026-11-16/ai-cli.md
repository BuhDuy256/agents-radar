# Bản tin cộng đồng công cụ AI CLI 2026-11-16

> Tạo lúc: 2026-11-16 06:12 UTC | Công cụ theo dõi: 7

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

**md2video-audio — Markdown thành MP4 có thuyết minh**
Biên dịch tài liệu Markdown thành video MP4 với giọng thuyết minh tự nhiên, dùng Marp để tạo slide; tác giả giới thiệu là miễn phí hoàn toàn. PR #1703, đang mở.

**proofcore-contract-auditor — phân tích tĩnh hợp đồng thông minh**
Chạy phân tích tĩnh tự động trên hợp đồng Solidity và Rust, rồi neo bằng chứng kiểm toán lên TON Blockchain qua giao thức Merkle của ProofCore. PR #1771, đang mở.

**scnet-hpc — vận hành cụm SCNet**
Bao quát workflow SSH và Slurm trên cụm SCNet HPC, gồm partition, module, tạo job và dò cụm theo từng profile. PR #1615, đang mở.

**Yêu cầu đang mở**
Người dùng muốn chia sẻ skill trong nội bộ tổ chức mà không phải tải file lên rồi gửi lại thủ công — hiện tại phải gửi file `.skill` qua Slack hoặc Teams và từng đồng nghiệp tự tải lên qua Settings > Capabilities (Issue #228).

---

**Có gì thay đổi**

Không có bản phát hành hay pull request nào trong 24 giờ qua.

**Đáng chú ý**

- **Phiên Remote Control trên Windows vẫn hỏng sau khi khởi động lại.** Issue #100114 cho biết sau khi ứng dụng desktop khởi động lại (kể cả cập nhật ngầm), Remote Control không được khôi phục và mọi phiên đang kết nối đều chuyển sang "Archive" trên mobile. Bỏ lưu trữ trên điện thoại sẽ đánh thức phiên desktop, rồi phiên này lại biến mất. Dữ liệu chưa có bản sửa.
- **Bản ghi phiên dưới 30 ngày bị xóa.** Issue #109897 cho biết các tệp `~/.claude/projects/*/<session-id>.jsonl` từ 1–3 tuần gần nhất bị xóa trên macOS dù chưa đặt `cleanupPeriodDays`, khiến `claude --resume` hỏng. Dữ liệu chưa có bản sửa.
- **Lỗi hook stderr của mod không cho model biết lý do.** Issue #110314 cho biết một quy tắc hookify `action: block` trả về `permissionDecision: "deny"` mà không có `permissionDecisionReason`; thông báo của quy tắc chỉ nằm trong `systemMessage`, thứ mà model không bao giờ thấy. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

Hai bản alpha vừa ra mắt: rust-v0.171.0-alpha.7 và rust-v0.171.0-alpha.6. Dữ liệu chỉ cho thấy tăng số phiên bản, nên hãy coi đây là các bản pre-release chưa có danh sách tính năng được xác nhận.

Một loạt bản sửa lỗi TUI được đề xuất trong các PR đã đóng: #61713 khôi phục raw mode sau khi dùng trình soạn thảo bên ngoài, #61724 dùng `clip.exe` để sao chép ASCII một dòng trên WSL, và #61697 khôi phục chế độ alternate-scroll gốc của terminal. Các thay đổi này nhắm vào hành vi bàn phím và clipboard bên trong CLI.

PR #61707 đề xuất `codex exec --remote <ADDR>` để chạy một lượt không tương tác với app server đang có, hỗ trợ thread mới hoặc resume bằng UUID với xác thực bearer-token. Tính năng này đang phát triển, chưa phát hành.

**Đáng chú ý**

Người dùng Windows báo cáo ứng dụng desktop làm mất thư mục dự án và trình duyệt: #61294 (dự án cục bộ biến mất sau khi cập nhật, 5 bình luận), #56873 (Chrome và IAB không khả dụng, 19 bình luận), và #60812 (các thư mục dự án phụ bị bỏ sót khỏi writable roots). Dữ liệu không cho thấy bản sửa nào.

#61749 báo cáo cửa sổ terminal liên tục bật lên khi dùng CLI bình thường trên v0.169.0 dưới Windows. Vẫn đang mở.

Người dùng MacOS 26.1111.21308 báo cáo cửa sổ chính quay về màn hình logo trong khi tác vụ vẫn tiếp tục (#61637); New Window được xác nhận là khôi phục được chế độ xem tác vụ dùng được.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Đã thay đổi gì**

Không có bản phát hành nào ra mắt trong 24 giờ qua, nên đây là các thay đổi đang trong quá trình phát triển.

- **Lỗi của subagent sẽ không còn báo là thành công.** PR #29367 sửa #22323, nơi một subagent chạm MAX_TURNS lại báo `status: success` và `Termination Reason: GOAL`. PR đang mở giữ nguyên lý do kết thúc gốc, để bạn phân biệt được agent bị ngắt với agent đã hoàn thành. Quan trọng khi bạn tin vào output trạng thái của subagent. [PR #29367](https://github.com/google-gemini/gemini-cli/pull/29367)
- **Sửa mô tả shell trên Windows.** PR #30312 khiến `run_shell_command` mô tả đúng shell thực sự được chọn trên Windows thay vì luôn báo là `powershell.exe`. Quan trọng nếu bạn chạy lệnh shell trên Windows và dựa vào mô tả của model về shell.
- **Đường dẫn tilde-backslash trên Windows.** PR #30308 mở rộng đường dẫn `~\...` trong `resolvePath` để các cài đặt như `policyPaths` và `includeDirectories` được resolve theo `homedir()` thay vì giữ nguyên literal. Quan trọng với người dùng Windows khi chỉnh các cài đặt đó.

**Đáng chú ý**

- Issue #21409: agent đa dụng treo vô hạn ở các tác vụ đơn giản như tạo thư mục; người báo cáo nói rằng yêu cầu model không giao lại cho subagent thì tránh được lỗi này. 8 bình luận, 8 👍. Chưa có bản sửa trong dữ liệu. [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)
- Issue #27393: command substitution bị chặn bởi một bức tường hardcoded không có tùy chọn cài đặt; 32 bình luận. [Issue #27393](https://github.com/google-gemini/gemini-cli/issues/27393)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi gì**

Không có bản phát hành hay pull request nào trong 24 giờ qua. Thay đổi duy nhất trong khoảng này là các cập nhật issue, liệt kê bên dưới.

**Đáng chú ý**

- `copilot.exe` trên Windows có thể crash cứng với lỗi access violation (0xc0000005), làm mất lượt đang chạy và hỏng trạng thái terminal. Được báo cáo trên các bản build thời 1.0.85 (#4891, 1 bình luận). Chưa có bản sửa trong dữ liệu.
- `~/.copilot/config.json` bị ghi lại toàn bộ khi thoát, nên các phiên chạy song song có thể làm mất `trustedFolders` và các trạng thái được quản lý khác (#4900, 1 bình luận). Chưa có bản sửa trong dữ liệu.
- Xử lý kết nối MCP đang lỗi trong nhiều báo cáo: một lệnh `initialize` kiểu cũ gửi sau khi `server/discover` thành công bị từ chối (#4888), và một server stdio chậm kích hoạt cơ chế dự phòng trên cùng kết nối mà server Python SDK từ chối với mã -32022 (#5464). Cả hai vẫn mở, chưa có bản sửa.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Những gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua. Hai thay đổi đang được phát triển, chưa phát hành:

- **Automations (đề xuất, PR #64160):** các lịch trình thử nghiệm trở thành một trigger cộng với một action, hoặc nhắc một session hoặc chạy Code Mode không có model. Vẫn nằm sau một flag, tắt trong bản build phát hành. Chỉ quan trọng nếu bạn chạy bản build local hoặc dev.
- **Thay đổi tool giữa cuộc trò chuyện (đề xuất, PR #64166):** `@opencode/ai` có thêm khả năng thêm hoặc bớt tool ngay giữa cuộc trò chuyện; trên các model hỗ trợ sẵn, danh sách tool ban đầu vẫn giữ nguyên. Đóng #64114 link: không, không phải vậy. Đừng để tôi bịa. Thực ra #64166 ghi "None" cho issue. Tốt.
- **Thử lại spawn pipe trên Windows (đề xuất, PR #64137):** thử lại việc spawn shell khi gặp lỗi từ chối truy cập trên bản đóng gói, đóng #63892. PowerShell 7 từ Store thất bại với 0xC0070005 trước khi chạy lệnh trên Windows; quan trọng nếu bạn gọi shell trên Windows 2.3.0.

Để tôi viết lại thành văn xuôi cuối cùng, giữ dưới 200 từ.

**Những gì đã thay đổi**

Không có bản phát hành nào trong 24 giờ qua, nên không có gì được phát hành. Hai đề xuất đáng chú ý:

- Automations (PR #64160, đề xuất): các lịch trình thử nghiệm trở thành một trigger cộng với một action, hoặc nhắc một session hoặc chạy Code Mode không có model. Nằm sau một flag, tắt trong bản phát hành.
- Thay đổi tool giữa cuộc trò chuyện (PR #64166, đề xuất): `@opencode/ai` có thể thêm hoặc bớt tool ngay giữa cuộc trò chuyện. Trên các model hỗ trợ, danh sách tool ban đầu vẫn giữ nguyên.

Không phát hành gì mới trừ khi bạn chạy bản build dev.

**Đáng biết**

- Gói miễn phí: issue #59387 (371 bình luận) là điểm tập hợp các lỗi của gói miễn phí, gồm cả những lần reset không bao giờ xảy ra. Đây là báo cáo mở từ người dùng, không phải bản sửa đã xác nhận.
- Quyền thư mục ngoài: #56288 (đã tái hiện, mức độ nghiêm trọng cao) báo cáo `external_directory: ask` được thực thi cho các tool file nhưng bị bỏ qua với `shell`, nên shell ghi ra ngoài session mà không được nhắc. Đang mở, có đề xuất sửa? Không có bản sửa trong dữ liệu.
- Tăng budget, zombie chưa thu hồi #63976 (đang mở) là bài sau 2.3.0 xác nhận các tiến trình con của shell không được thu hồi. Có thể đưa vào so với phần quyền. Tôi sẽ giữ hai mục.

Số từ ổn, dưới 200.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Đã thay đổi**

Bản sửa lỗi dọn dẹp tiến trình trên Windows đang được phát triển. PR #11854 thay `taskkill /F /T /PID` bằng một cách xử lý khác để kill các cây lệnh bash và PowerShell khi tiến trình cha đã thoát, vì `taskkill /T` đi theo PID cha. Điều này quan trọng với những ai chạy vòng lặp nền trên Windows ([PR #11854](https://github.com/earendil-works/pi/pull/11854)).

Hỗ trợ model Ant Ling chuyển sang định dạng suy luận tương thích DeepSeek với Ling 3.0, Ling 3.0 Flash VL và Ling 3.1 Flash, bỏ Ling 2.6, Ring 2.6 và `thinkingFormat: "ant-ling"`. PR #11800 đã đóng; issue #12201 đã yêu cầu thay đổi này ([issue #12201](https://github.com/earendil-works/pi/issues/12201)).

**Đáng chú ý**

Đăng nhập ChatGPT báo cửa sổ ngữ cảnh 272K cho `gpt-6.1-sol`, trong khi danh mục model trực tiếp của cùng tài khoản đó quảng cáo 500K, khiến Pi có ngân sách nén nhỏ hơn. Issue #11021 đang mở với 14 bình luận và 8 👍 ([issue #11021](https://github.com/earendil-works/pi/issues/11021)).

Các provider do extension đăng ký đôi khi bỏ qua `defaultProvider`/`defaultModel` trong phiên mới và rơi về mặc định của provider khác. Issue #8810 đang mở ([issue #8810](https://github.com/earendil-works/pi/issues/8810)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

**Phiên Managed Agent có quyền truy cập thư mục cục bộ và web terminal.** v0.27.4 đăng ký filesystem của client vào phiên managed và mở Managed Web Terminal tương tác mà không lưu thông tin xác thực hay đường dẫn ([#16844](https://github.com/QwenLM/qwen-code/pull/16844), [#16866](https://github.com/QwenLM/qwen-code/pull/16866)). Đáng chú ý khi bạn muốn phiên managed truy cập được các thư mục cục bộ đã cấp quyền.

**TypeScript SDK v0.1.34 đóng gói CLI 0.27.4**, nên SDK và CLI luôn cùng phiên bản. Đáng chú ý khi bạn cần ghim phiên bản khớp nhau.

**Thêm adapter DingTalk cho managed agent** ([#17136](https://github.com/QwenLM/qwen-code/pull/17136) với các theo dõi review trong [#17173](https://github.com/QwenLM/qwen-code/issues/17173)). Cho phép phiên managed chạy qua DingTalk.

**Điều cần biết**

**`/effort` liệt kê đủ năm bậc cho các model có bậc hỗ trợ đã biết**, gồm cả `gpt-5-pro` — model này trên 0.27.4/macOS chỉ nhận `high` ([#17411](https://github.com/QwenLM/qwen-code/issues/17411)). Bản sửa được đề xuất trong [#17425](https://github.com/QwenLM/qwen-code/pull/17425).

**`/rewind` sau `/cd` có thể khôi phục checkpoint vào sai thư mục làm việc**, ghi đè các file không liên quan ([#16982](https://github.com/QwenLM/qwen-code/issues/16982)). Chưa có bản sửa trong dữ liệu; được đánh dấu sẵn sàng cho người xử lý.

**Managed hook từ chối metadata `description` và `statusMessage` được hỗ trợ trong lúc cài extension** ([#17381](https://github.com/QwenLM/qwen-code/issues/17381)). Chặn cài đặt khi dùng metadata hook chuẩn; chưa có bản sửa nào được liệt kê.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*