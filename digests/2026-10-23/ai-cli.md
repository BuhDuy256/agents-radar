# Bản tin cộng đồng công cụ AI CLI 2026-10-23

> Tạo lúc: 2026-10-23 07:53 UTC | Công cụ theo dõi: 7

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

### mcp-builder — hỗ trợ import HTTP client của mcp>=2
Sửa lỗi #1668 bằng cách import `streamable_http_client` (đổi tên từ `streamablehttp_client` trong mcp 2.0.0) và truyền HTTP header tùy chỉnh qua `create_mcp_http_client` / `http_client` thay vì truyền trực tiếp dưới dạng kwarg. Đang mở dưới dạng PR #1742 của anthropics/skills.

### skill-creator — cô lập trigger eval, xử lý lỗi trên Windows và lỗi runtime
Ngăn chặn bỏ sót giả và điểm số không hợp lệ bằng cách cấp cho mỗi worker một command probe riêng, tránh dùng `select()` trên pipe của subprocess trên Windows, và phân loại lại lỗi runtime để chúng không còn bị tính là non-trigger vượt qua ví dụ âm. Đang mở dưới dạng PR #1298 của anthropics/skills.

### proofcore-contract-auditor — công chứng hợp đồng thông minh
Thực hiện phân tích tĩnh tự động các hợp đồng Solidity và Rust, đồng thời neo bằng chứng kiểm toán lên TON Blockchain công khai bằng giao thức Merkle zero-storage của ProofCore. Đang mở dưới dạng PR #1771 của anthropics/skills.

**Yêu cầu đang mở**

Issue #492 (anthropics/skills Issue #492) báo cáo các skill do cộng đồng tạo ra được phân phối dưới namespace `anthropic/` mạo danh skill chính thức, khiến người dùng cấp quyền nâng cao cho những skill mà họ tưởng là chính thức.

---

**Đã thay đổi gì**

v2.1.309 sửa lỗi các lệnh Bash chạy trong sandbox trên macOS và Linux vốn chạy các file khởi động của shell bên ngoài sandbox trước mỗi lệnh. Bản phát hành này cũng sửa lỗi các mẫu glob `denyWrite` trên macOS không được áp dụng tại vị trí thật của đường dẫn khi truy cập qua symlink. Cả hai đều quan trọng nếu bạn dựa vào cách ly sandbox cho các lần chạy Bash không đáng tin cậy hoặc tự động; bản sửa symlink vá một đường mà quy tắc từ chối có thể bị vượt qua.

**Đáng chú ý**

Windows/Git Bash giảm một nửa số dấu gạch chéo ngược trong lệnh của Bash tool — `n` dấu gạch chéo ngược đến nơi chỉ còn `ceil(n/2)`, và việc đặt trong dấu nháy không ngăn được (đang mở, #85856). Ảnh hưởng đến lập trình viên Windows khi truyền đường dẫn hoặc regex qua Bash tool.

Các tác vụ Bash chạy nền lẫn sang nhau giữa các phiên đồng thời trên Windows PowerShell: hai phiên trộn lẫn tác vụ và chạy chúng trong terminal của nhau (đang mở, #104519, v2.1.309). Tránh các phiên Bash đồng thời cho đến khi được sửa; dữ liệu chưa có bản sửa.

Tự động cập nhật rồi khởi động lại trên desktop sẽ lưu trữ các phiên Remote Control đang hoạt động và không khôi phục chúng (đang mở, #103005). Ảnh hưởng đến bất kỳ ai chạy Remote Control qua ứng dụng desktop.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Những gì đã thay đổi

`rust-v0.164.0` thêm mười ô `/presets` được đánh số để lưu prompt và slash command tái sử dụng, kèm menu bàn phím để truy cập nhanh (#54380, #54381). Giờ bạn có thể đặt model, reasoning effort, speed và permission profile ngay trong dòng thông qua đối số của `/model` và `/permissions` thay vì phải mở menu (#54378, #54383).

## Điều đáng biết

Tình trạng cạn quota vẫn được theo dõi ở issue #41220 (71 bình luận, mở từ 2026-08-27): người dùng báo cáo quota thuê bao hoặc credit đã mua cạn nhanh hơn so với mức dự đoán từ baseline hoặc bằng chứng token cục bộ của họ.

Thông báo "Selected model is at capacity" vẫn xuất hiện trên Desktop, CLI và Cloud Web (#43375, #55260). Một bản sửa đề xuất, issue #50238, yêu cầu hàng đợi capacity có thể hủy và duy trì liên tục thay vì ngắt công việc đang chạy dài.

Lỗi thiếu model picker trong VS Code đã được đóng (#49464); lỗi tương tự trên macOS Desktop (#51096) cũng đã đóng. Issue #29343 (55 bình luận) báo cáo plugin Chrome từ chối tải một số trang nhất định.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Có gì thay đổi**

- Bản **v0.67.0-nightly.20261023.ga713410ab** sửa lỗi báo cáo metadata mở rộng về lượng token đã dùng và đảm bảo mọi lượt model có gọi hàm đều nhận thought signature ([release](https://github.com/google-gemini/gemini-cli/releases)). Điều này quan trọng nếu bạn phân tích lượng token theo từng lượt hoặc dựa vào thought signature xuyên các lần gọi công cụ.
- Bản sửa đề xuất #29890 chỉ khôi phục thư mục workspace sau khi phiên chat tiếp tục thành công ([PR #29890](https://github.com/google-gemini/gemini-cli/pull/29890)). Hiện tại, một lần tiếp tục thất bại để lại các thư mục đã lưu trong ngữ cảnh workspace của bạn; bản sửa giới hạn việc đó vào các lần tiếp tục thành công. Chưa phát hành.
- Bản sửa đề xuất #29767 giới hạn thời gian khám phá `tools/list` của MCP ở mức mặc định 60 giây thay vì dùng luôn timeout 10 phút của lần gọi công cụ ([PR #29767](https://github.com/google-gemini/gemini-cli/pull/29767)). Điều này quan trọng khi một MCP server ngừng phản hồi bước khám phá.

**Đáng biết**

- Issue #21409 (8 bình luận): agent tổng quát treo vô thời hạn với các tác vụ đơn giản như tạo thư mục; một người dùng báo phải chờ tới một giờ. Dữ liệu chưa có bản sửa.
- Issue #21968 (7 bình luận): tác giả báo Gemini hiếm khi gọi skill tùy chỉnh và sub-agent trừ khi được yêu cầu rõ ràng. Dữ liệu chưa có bản sửa.
- Issue #24246: lỗi 400 xuất hiện khi có hơn 128 công cụ khả dụng. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Đã thay đổi**

v1.0.103 (2026-10-22) sửa lỗi sao chép: nhấp vào khối mã của phản hồi đã hoàn tất giờ sao chép mã gốc khi tính năng này được bật. Phiên ACP tuân theo cài đặt sandbox đã lưu và cờ `--sandbox`/`--no-sandbox`, kể cả khi tiếp tục phiên. Phản hồi đám mây giữ nguyên toàn bộ văn bản khi CLI kết nối lại sau khi mất kết nối.

**Đáng chú ý**

Thư mục tin cậy tự động phê duyệt chạy shell ở chế độ cấp quyền thủ công, kể cả với script, `sqlcmd` và `curl` có tác dụng phụ khó lường ([#5232](https://github.com/github/copilot-cli/issues/5232), cập nhật 2026-10-23, 2 bình luận, đang mở). Cơ chế kiểm soát theo đường dẫn không xác định được lệnh sẽ làm gì.

Tính năng che dấu bí mật che quá mức nội dung hợp lệ, chẳng hạn tệp spec ghi lại cú pháp nội suy `${env.AUTH_TOKEN}` ([#4065](https://github.com/github/copilot-cli/issues/4065), 3 bình luận, đang mở).

Giới hạn 50 ảnh mỗi phiên khiến toàn bộ cache phải nạp lại khi ảnh thứ 51 đẩy ảnh đầu ra, làm phiên dài tốn kém trên 1.0.103 ([#5238](https://github.com/github/copilot-cli/issues/5238), đang mở).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Thay đổi gì**

v1.19.4 nâng runtime Bun đi kèm lên 1.4.4, mang theo bản vá bảo mật cho Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket và `fetch`, cùng chứng chỉ gốc cập nhật lên NSS 3.131.1. Điều này quan trọng nếu bạn dựa vào bất kỳ giao thức nào trong số đó.

PR #58374 (đang mở) sẽ khiến OpenCode chờ các MCP server đang khởi động trước request đầu tiên, sửa lỗi race khiến `McpTool.flush` bỏ qua những server còn đang kết nối. Chưa phát hành.

PR #58370 (đang mở) đề xuất chấp nhận URL redirect dán vào cho MCP OAuth, giúp đăng nhập qua SSH, container hoặc server từ xa. Đang phát triển.

**Đáng chú ý**

Issue #49827 (đang mở, 17 bình luận): sau khi nâng cấp từ V1.18.31 lên V2.0.8, các session tạo trong thư mục không phải git thuộc project `global` của V1 trở nên vô hình trong trình chọn session của TUI, vì V2 tạo project riêng theo từng thư mục. Lịch sử vẫn còn trên đĩa. Không có cách sửa trong dữ liệu.

Issue #58175 (đang mở, 5 bình luận): từ 2026-10-17, các prompt của `opencode/deepseek-v4.1-flash` trên khoảng 256k token ngừng tái sử dụng prompt cache, nên hội thoại bị tính lại theo mức giá input không cache mỗi lượt. Không có cách sửa nào được liệt kê.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Đã thay đổi những gì**

- HTML `/export` không còn trắng trang với các phiên dài. Ba lần duyệt cây đệ quy (`sortChildren`, `mapNodes`, `markActive`) tràn call stack ở khoảng 6k+ mục; PR #11293 và PR #11275 thay chúng bằng ngăn xếp tường minh. Người dùng export phiên dài nhận được trang đã render thay vì chỉ có thanh filter.
- Tin nhắn hệ thống giờ hiển thị trong HTML export. PR #11290 hiển thị tin nhắn hệ thống đầu tiên dưới dạng system prompt và danh sách tool, các tin sau dưới dạng cập nhật từng phần, sửa #11261. Quan trọng nếu bạn export phiên để kiểm tra agent thực sự chạy prompt nào.
- Sửa race abort của bash trên macOS: kill tiến trình con foreground có thể khiến shell chạy lệnh tiếp theo trong `a; b`. PR #11289 gửi tín hiệu tới nhóm shell trước (#11252). Ảnh hưởng đến các lệnh gọi nhiều lệnh bị ngắt khi CPU tải cao.

**Đáng để biết**

- `pi.exec()` làm hỏng UTF-8 bị tách qua các chunk stdout — "你好" trả về thành "���好" — vì mỗi chunk được decode độc lập (#11312). Đã đóng, không có fix nào được liên kết trong dữ liệu.
- TUI render lại toàn bộ gây lag cuộn và gõ phím khi vượt khoảng 800 tin nhắn (#9807, 5 bình luận, đang mở).
- Ký tự lạ lọt vào input trên terminal Windows qua SSH khi client CPU tải cao (#11086, prio:p0, đang mở).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

**v0.26.0-nightly.20261022.bf66a26c97** bổ sung khả năng lưu bền token daemon cho `serve` ([PR #15023](https://github.com/QwenLM/qwen-code/pull/15023)). Daemon khởi động lại giờ giữ nguyên token thay vì mất đi, nên các thiết lập `qwen serve` chạy dài hạn bớt được một bước xác thực lại.

`todo_write` được đề xuất cho Managed Agent Workspace Sessions qua hai tool profile mới `hosted-workspace-files/3` và `hosted-workspace-shell/3` ([PR #15089](https://github.com/QwenLM/qwen-code/pull/15089), issue [#15076](https://github.com/QwenLM/qwen-code/issues/15076)). Các session `/1` và `/2` hiện có vẫn giữ nguyên tool; chỉ session ghim vào profile mới mới có thêm tool này.

Một bản sửa đề xuất thay thế placeholder kết quả tool được tạo giả bằng kết quả thật đến muộn ([PR #15308](https://github.com/QwenLM/qwen-code/pull/15308)). Nó nhắm vào các session mà luồng model chết sau các chunk gọi tool, khiến một lượt sửa orphan ghi ra phản hồi giả "execution result unavailable".

**Đáng chú ý**

Issue [#15297](https://github.com/QwenLM/qwen-code/issues/15297) báo cáo Qwen Code 0.26.0 làm mất output của tool khoảng một lần mỗi 30–40 lần gọi trên Windows: tool chạy với `status: success`, nhưng không có `functionResponse` nào tới được model, buộc phải đọc lại. Dữ liệu chưa có bản sửa.

Issue [#15165](https://github.com/QwenLM/qwen-code/issues/15165) báo cáo phân loại an toàn shell trên Node v24.16.0 kích hoạt cấp phát WASM tạm thời ~1,6 GiB. Được báo cáo cho 0.25.2 trên Linux x64 với 6 bình luận; dữ liệu chưa có bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*