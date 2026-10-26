# Bản tin cộng đồng công cụ AI CLI 2026-10-26

> Tạo lúc: 2026-10-26 04:34 UTC | Công cụ theo dõi: 7

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

**md2video-audio — biến Markdown thành video MP4 có thuyết minh**
Biên dịch tài liệu Markdown thành video MP4 bằng Marp cho phần slide và giọng đọc giống người, miễn phí. Dùng khi một tài liệu viết cần chuyển thành video. Đang mở, theo PR #1703 của anthropics/skills.

**document-typography — kiểm soát chất lượng trình bày cho tài liệu được tạo**
Bắt lỗi ngắt dòng lẻ (1–6 từ tràn xuống dòng tiếp theo), đoạn mồ côi và lệch số thứ tự trong tài liệu do Claude tạo. Dùng khi đầu ra sẽ được người đọc. Đang mở, theo PR #514 của anthropics/skills.

**proofcore-contract-auditor — phân tích tĩnh hợp đồng thông minh**
Thực hiện phân tích tĩnh tự động hợp đồng thông minh Solidity và Rust, đồng thời neo bằng chứng kiểm toán lên TON Blockchain qua giao thức Merkle. Đang mở, theo PR #1771 của anthropics/skills.

**Yêu cầu đang mở**

Người dùng không thể chia sẻ skill trong một tổ chức Claude.ai mà không tải file .skill về và gửi thủ công; họ đề nghị có thư viện chia sẻ hoặc link chia sẻ trực tiếp. Được báo trong Issue #228 của anthropics/skills.

---

**Thay đổi gì**

Không có bản phát hành nào và không có pull request nào được hợp nhất trong 24 giờ qua. PR duy nhất được cập nhật đã đóng: #29757, một thay đổi tài liệu cho hướng dẫn phát triển skill, làm rõ rằng tên skill nên khớp với thư mục theo kebab-case. Không có gì trong dữ liệu này thay đổi cách công cụ được dùng hiện nay.

**Đáng chú ý**

- Cấu hình shell của công cụ Bash là mục mở được thảo luận nhiều nhất: Issue #7490 (40 bình luận, 131 👍) đề nghị cho người dùng đặt shell mà công cụ Bash sử dụng hoặc kế thừa shell ban đầu. Đang mở, chưa có bản sửa trong dữ liệu.
- TaskStop không kill cả cây tiến trình, theo Issue #85200. Tác giả báo cáo một tiến trình `rm -rf /c` mồ côi vẫn tiếp tục xóa dữ liệu trong 20 phút sau khi dừng. Đang mở.
- Các lệnh gọi công cụ MCP với đối số chuỗi rỗng tạo ra JSON không hợp lệ (`"key": ,`), theo Issue #104954, trong đó ghi chú rằng #89313 vẫn tái hiện. Đang mở; trình kiểm tra từ chối lệnh gọi.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua và không có pull request nào được cập nhật, nên không có gì mới được ship.

Issue #28969 yêu cầu một cài đặt để tắt tính năng tự động resolve sau 60 giây cho các câu hỏi trong `codex-cli 0.141.0`; issue vẫn mở với 98 bình luận và 217 👍. Khi chưa có cài đặt đó, đồng hồ đếm vẫn cố định.

Issue #56264 báo cáo rằng việc resume một chat Windows desktop đang có sẵn sẽ thất bại sau khi cập nhật vì `process.env` của sandbox helper thiếu `SYSTEMROOT`. Tác giả cho biết lỗi xảy ra trước khi `AGENTS.md` được load. Dữ liệu chưa có bản sửa.

**Đáng chú ý**

Các phiên bản VS Code extension `26.1021.22027` và bản pre-release `26.51021.22027` bị timeout qua Remote-SSH; issue #56736 báo cáo rằng rollback về `26.1007.21434` khôi phục được UI. UI của extension cũng không khởi động được trên Linux trong #56992.

Trên Windows, #57013 báo cáo remote control của `codex-cli 0.164.0` trả về HTTP 409 "Remote app server already online."

Phản hồi dài trên desktop chạy chậm: #56861 đo được 496 request, trung bình 41,8s, P95 143,6s, tệ nhất 636,8s trên app `26.1021.31345`. Đây là báo cáo từ người dùng, không phải nguyên nhân đã được xác nhận.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Đã thay đổi những gì**

Không có bản phát hành nào trong 24 giờ qua, nên chưa có gì được ship. Một số bản sửa lỗi đang được phát triển:

- **Thông báo lỗi đường dẫn** (PR #29878): `list_directory` và `read_file` hiện báo "Path not in workspace" ngay cả khi đoạn bị chặn nằm trong một thư mục thuộc workspace. Bản sửa đề xuất sẽ nêu tên đoạn bị chặn thay vì báo chung chung. Điều này quan trọng khi cần gỡ lỗi tại sao một đường dẫn trông hợp lệ lại bị từ chối.
- **Đường dẫn tương đối trong chế độ IDE** (PR #29838): `WriteFileTool`, `EditTool` và `ReadFileTool` phân giải đường dẫn tương đối dựa trên thư mục đích ban đầu. Thay đổi đề xuất sẽ dùng thư mục gốc workspace IDE đang hoạt động.
- **Cô lập phiên agent từ xa** (PR #29946): các cuộc hội thoại có thể rò rỉ giữa các phiên cha và giữa các agent cùng tên ở những endpoint khác nhau. Bản sửa đề xuất sẽ giới hạn định danh theo phiên cha cộng với endpoint.

**Đáng chú ý**

- Subagent báo `status: "success"` với `Termination Reason: "GOAL"` ngay cả sau khi chạm MAX_TURNS và không phân tích gì (Issue #22323, 13 bình luận, 2 👍). Một lần chạy `codebase_investigator` kéo dài có thể trông như đã xong khi thực ra bị cắt ngang. Dữ liệu chưa có bản sửa.
- Agent tổng quát bị treo vô thời hạn ở những tác vụ đơn giản như tạo thư mục (Issue #21409, 8 bình luận, 8 👍). Cách vượt qua là yêu cầu model không giao lại cho subagent. Dữ liệu chưa có bản sửa.
- Subagent trình duyệt bị lỗi trên Wayland (Issue #21983, 4 bình luận, 1 👍) và bỏ qua các ghi đè trong `settings.json` như `maxTurns` (Issue #22267). Cả hai đều đang mở và chưa có bản sửa.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua.

Các yêu cầu tính năng đang mở đề xuất hành vi mới, không phải tính năng đã phát hành:
- Issue #3265 yêu cầu lệnh slash `/pause` hoặc `/stop` để ngắt agent sau khi agent suy luận xong, thay vì hủy giữa lúc suy luận (6 👍).
- Issue #4233 yêu cầu chế độ `--acp` phát sự kiện `usage_update` của ACP để các client ACP như Zed hiển thị mức dùng context window và AI-credit, khớp với statusline tương tác.

Hai issue đã đóng: #1935 (`az rest --url` bị báo nhầm là truy cập thư mục) và #4493 (`/restart` lỗi trong phiên khởi động bằng `-w`).

**Đáng chú ý**

- Issue #5254: trên Copilot CLI 1.0.103, một phiên dài được khôi phục trên máy Mac Apple Silicon 32 GiB đạt mức chiếm dụng bộ nhớ vật lý 37,3 GiB sau khoảng 6 giờ 19 phút, khiến máy không phản hồi. Dữ liệu chưa có bản sửa.
- Issue #5255: trên Windows, một phiên chạy quyền admin tạo `%USERPROFILE%\.copilot\.mcp-writer.lock` chặn các phiên không phải admin sau đó khởi động máy chủ MCP (`os_error=5`). Dữ liệu chưa có bản sửa.
- Issue #4802: tác giả báo cáo quota Copilot Pro (gói năm, PRU theo yêu cầu) bị xóa sạch, và cho rằng nguyên nhân là do bật Assisted Permissions. Chưa được xác nhận.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Đã thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua. Một tùy chọn TTL cho prompt cache được đề xuất trong PR #59157: các request hiện dùng thời gian sống mặc định của nhà cung cấp (5 phút trên Anthropic), nên một subagent hoặc tool chậm sẽ buộc phải viết lại toàn bộ ngữ cảnh ở bước tiếp theo. PR này cho phép cấu hình TTL đó.

**Đáng chú ý**

- Giới hạn dùng model miễn phí chiếm phần lớn danh sách issue hôm nay. #15585 (57 bình luận, 17 👍) và các báo cáo mới hơn (#58859, #58902, #59140) mô tả cùng một dạng: "Free usage exceeded, subscribe to Go" kèm đồng hồ đếm ngược hàng giờ (một người dùng nêu khoảng 15 giờ), và quyền truy cập không được khôi phục khi hết thời gian. Đây là báo cáo từ người dùng; dữ liệu không cho thấy bản sửa nào.
- Hai tiến trình server dùng chung một `opencode.db` cấp phát `session_message.seq` từ các bộ đếm độc lập, nên va chạm `UNIQUE(seq)` làm session thất bại (#53146, đang mở). Ảnh hưởng đến `opencode serve --service` chạy lâu dài cùng server nhúng trong TUI từ `opencode -c`.
- `opencode run "<prompt>"` bị treo, không có output trừ khi stdin đã ở EOF (#52938, đã đóng), làm hỏng việc dùng không tương tác và dùng trong script.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Đã thay đổi gì**

`pi --export <session.jsonl>` sẽ bao gồm system prompt, khớp với `/export` tương tác. PR #10718 đề xuất đọc prompt được ghi trên nhánh hiện tại của session; PR đang mở, chưa phát hành. Quan trọng khi export session để review hoặc chia sẻ. ([PR #10718](https://github.com/earendil-works/pi/pull/10718))

Các tham chiếu model như `--model "llama-server=http://host:10800/<model-id>"` giờ đây resolve được khi id provider chứa dấu `/`. PR #11393 sửa `splitProviderPrefix()` chia tại dấu slash đầu tiên; PR đã đóng. Quan trọng với các id provider bắt nguồn từ URL như `pi-llama-cpp`. ([PR #11393](https://github.com/earendil-works/pi/pull/11393), [#11394](https://github.com/earendil-works/pi/issues/11394))

`pi.exec()` sẽ giải mã stdout và stderr bằng hai instance StringDecoder riêng, nhờ đó các ký tự UTF-8 bị cắt ngang qua các chunk vẫn giữ nguyên. PR #11330 sửa lỗi "你好" biến thành "���好"; đã đóng, chưa có trong bản phát hành nào ở đây. ([PR #11330](https://github.com/earendil-works/pi/pull/11330))

**Đáng chú ý**

Các request đến Anthropic thất bại với `tool_reference_unresolved` sau khi reload extension làm mất một tool đã đăng ký ban đầu; được báo với mức prio:p0, 3 bình luận, chưa có bản sửa trong dữ liệu. ([#11376](https://github.com/earendil-works/pi/issues/11376))

Các file JSONL của session được ghi theo umask mặc định, 0644 với umask 022, nên ai cũng đọc được trên máy dùng chung; báo cáo đã đóng, chưa thấy bản sửa. ([#11417](https://github.com/earendil-works/pi/issues/11417))

`pi -e npm:<pkg>` dùng lại lần tải đầu tiên và không bao giờ tải lại; đang mở với 2 bình luận. ([#11375](https://github.com/earendil-works/pi/issues/11375))

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Đã thay đổi**

v0.26.1-nightly.20261025.8e28d5380c bổ sung quy tắc quyền theo phiên và phê duyệt tự động cho agent được quản lý ([PR #15448](https://github.com/QwenLM/qwen-code/pull/15448)). Điều này cho phép các phiên được quản lý phê duyệt trước hành động thay vì hỏi từng lần gọi; nó quan trọng nếu bạn chạy phiên được quản lý hoặc phiên không giao diện. Cùng bản phát hành này cũng gia cố token serve trong CLI.

**Đáng chú ý**

- Phiên được khôi phục vẫn gửi đầu ra công cụ của model mà hook `UserPromptSubmit` bị chặn lẽ ra phải ngăn ([#15595](https://github.com/QwenLM/qwen-code/issues/15595)). Phiên đang chạy và phiên được khôi phục không thống nhất về những gì model đã thấy, ảnh hưởng đến người dùng hook khi khôi phục phiên. Dữ liệu chưa có bản sửa.
- Phiên được khôi phục cũng tiếp tục chỉ vài giây sau khi hook chặn một prompt, theo [#15595](https://github.com/QwenLM/qwen-code/issues/15595).
- `-p` không giao diện từ chối các lệnh chỉ đọc có chứa `2>&1`, phân tích việc nhân bản fd thành ghi vào tệp tên "&1" ([#15600](https://github.com/QwenLM/qwen-code/issues/15600)). Ảnh hưởng đến người dùng chế độ không tương tác và phê duyệt tự động; dữ liệu chưa có bản sửa.
- Các truy vấn phía Anthropic yêu cầu JSON gửi `tool_choice` không được hỗ trợ và thất bại với lỗi 400 trên Claude Sonnet 5.5 / Opus 5.5 ([#15542](https://github.com/QwenLM/qwen-code/issues/15542)). Dữ liệu chưa có bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*