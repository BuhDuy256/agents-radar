# Bản tin cộng đồng công cụ AI CLI 2026-11-26

> Tạo lúc: 2026-11-26 08:03 UTC | Công cụ theo dõi: 7

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

### md2video-audio — biên dịch Markdown thành video MP4 có thuyết minh
Chuyển tài liệu Markdown thành video MP4 với giọng đọc tổng hợp, dùng Marp để render slide. Dùng khi cần một bản video cho tài liệu đã viết; pull request đang mở. `anthropics/skills PR #1703`

### scnet-hpc — vận hành cụm SCNet HPC
Hướng dẫn cấu hình kết nối SSH, tạo job Slurm, tìm cụm và chọn partition, bộ nhớ và module cho các cụm SCNet. Dùng cho công việc HPC thay vì tính toán cục bộ; pull request đang mở. `anthropics/skills PR #1615`

### proofcore-contract-auditor — audit tĩnh hợp đồng Solidity và Rust
Chạy phân tích tĩnh tự động trên hợp đồng thông minh và neo bằng chứng audit lên TON Blockchain qua giao thức Merkle không lưu trữ. Dành cho lập trình viên Web3 kiểm tra mã hợp đồng; pull request đang mở. `anthropics/skills PR #1771`

**Yêu cầu đang mở**
- Người dùng không thể chia sẻ skill trong một tổ chức Claude.ai: họ phải tải file `.skill`, gửi qua Slack hoặc Teams, rồi để đồng nghiệp tải lên thủ công trong Settings > Capabilities. Issue đề nghị có thư viện skill dùng chung hoặc link chia sẻ trực tiếp. `anthropics/skills Issue #228`

---

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua.

**Đáng chú ý**

- Hai PR đang mở đề xuất công bố mã nguồn CLI. PR #41518 cho biết đã trích xuất 1.906 tệp TypeScript từ `cli.js.map` trong gói npm và build bằng Bun; PR #41447 có tiêu đề "feat: open source claude code". Cả hai đều chưa được hợp nhất, nên đây không phải là tính năng đã phát hành. (anthropics/claude-code PR #41518, PR #41447)
- Issue #16157 báo cáo gói đăng ký Max chạm giới hạn sử dụng ngay lập tức; issue có 1.500 bình luận và 697 👍, vẫn đang mở. Issue #38335 báo cáo tình trạng tương tự với các phiên CLI kể từ ngày 23 tháng 3 năm 2026, với 879 bình luận. Cả hai đều mang nhãn `area:cost`; dữ liệu không cho thấy bản sửa lỗi nào.
- Issue #112142 báo cáo rằng trong tab Code của Desktop, các phiên được nhận từ một spare đã làm nóng trước sẽ mất công cụ cuối lượt (`mcp__ccd_turn__wrap_up`) kể từ phiên bản 2.1.331. Lỗi ảnh hưởng đến người dùng macOS Desktop; có một bình luận, không có bản sửa lỗi nào được liệt kê.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Điều gì đã thay đổi

**TUI đính kèm ảnh giờ phân giải từ gốc tìm kiếm tệp.** PR #64071 (đã đóng) mở ảnh được hoàn thành bằng `@` theo đường dẫn đầy đủ thay vì đường dẫn tương đối. Chọn ảnh không còn thất bại khi gốc tìm kiếm khác thư mục làm việc của bạn.

**Trường MCP dạng số giờ hiển thị thành biểu mẫu.** PR #64023 (đã đóng) thay lời nhắc phê duyệt chung cho biểu mẫu MCP bằng các trường số. Bạn có thể nhập giá trị được yêu cầu thay vì chỉ chấp nhận, điều này quan trọng khi server cần số trước khi tiếp tục.

**Kết quả lệnh chạy nền hiện trong TUI.** PR #64015 (đã đóng) hiển thị các lệnh chạy nền khi khởi chạy và kết quả muộn, kể cả kết quả đến sau khi lượt khởi chạy kết thúc. Kết quả không còn bị bỏ khi không có lượt nào đang hoạt động.

Bản alpha mới: rust-v0.174.0-alpha.7.

## Đáng chú ý

**Issue #15723 (đang mở, 34 bình luận):** subagent chạy nền không đánh thức agent gọi nó khi hoàn thành. Được báo trên codex-cli 0.116.0, Linux. Dữ liệu chưa có bản sửa.

**Issue #62732 (đang mở, 11 bình luận):** liên kết tệp cục bộ trong CLI mở trong trình xem thanh bên, và `file_opener` không có tác dụng. Được báo trên codex-cli 0.171.0, macOS. Dữ liệu chưa có bản sửa.

**Issue #62901 (đang mở, 20 bình luận):** ứng dụng ChatGPT desktop trên Windows đóng rồi mở lại khi nhấn Send kèm lỗi `Peer closed MessagePort connection`. Phiên bản 26.1117.3838.0. Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Có gì thay đổi**

- Không có bản phát hành nào trong 24 giờ qua, nên mọi thay đổi dưới đây chỉ là đề xuất trong các PR đang mở, chưa được phát hành.
- PR #30470 (đề xuất) thêm alias `gemini-2.5-flash-image` với `responseModalities: ['TEXT', 'IMAGE']`, chọn được qua `--model` và `/model`, dùng cho các yêu cầu tạo ảnh.
- PR #30362 (đề xuất) khiến chế độ ACP báo lý do agent dừng dưới dạng tin nhắn assistant thay vì kết thúc bằng một lượt trống (sửa #30199).

**Đáng chú ý**

- Issue #21409: agent generalist treo vô hạn khi Gemini CLI chuyển sang nó; một tác giả cho biết đã chờ tới một giờ, và yêu cầu model không chuyển sang thì tránh được lỗi. Tình trạng: cần kiểm thử lại, chưa có bản sửa nào được phát hành.
- Issue #22323: `codebase_investigator` báo `status: "success"` và `Termination Reason: "GOAL"` ngay cả khi chạm MAX_TURNS trước khi phân tích. 14 bình luận; đang mở.
- Issue #24246: Gemini CLI trả lỗi 400 khi có hơn 128 tool; phần nội dung nhắc tới con số hơn 400. Đang mở, bot đã phân loại.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Những gì đã thay đổi**

- v1.0.117-2 sửa `copilot help extensions`, vốn mô tả sai rằng extension của bạn và extension từ plugin được nạp bằng `-p`. Extension chỉ khởi động như vậy nếu lần chạy trước đó đã được phê duyệt qua `--allow-all-tools`, `--yolo` hoặc một phê duyệt đã lưu. Điều này quan trọng nếu bạn dựa vào phần trợ giúp đó để đoán thứ gì sẽ chạy ở chế độ không tương tác.
- v1.0.117-1 thêm thông báo dịch vụ vào trình chọn `/model` và đánh dấu các model sắp ngừng hỗ trợ, để bạn thấy cảnh báo trước khi chọn. Cùng bản phát hành này hiển thị lỗi thay vì âm thầm đổi nhà cung cấp khi một repository ghim model vào một nhà cung cấp không khả dụng — việc đổi nhà cung cấp âm thầm trong lúc chạy model bị ghim giờ sẽ báo lỗi rõ ràng.
- v1.0.117-0 cho phép agent tùy chỉnh chọn dùng công cụ thông qua cơ chế công bố công cụ tường minh, và cho phép agent chạy nền tiếp tục hội thoại sau khi khởi động lại CLI và resume một session.

**Đáng chú ý**

- Issue #5574 (1 bình luận): từ 1.0.115, `copilot -p` thoát với lỗi ngay cả khi agent hoàn thành nhiệm vụ nhưng không in ra kết luận, làm hỏng các automation vốn chạy được tới 1.0.114. Dữ liệu chưa có bản sửa.
- Issue #5578 (0 bình luận): một skill của plugin khi gọi kèm bất kỳ tham số nào đều lỗi "Unknown command"; dạng `/<plugin>:<skill> <args>` thì chạy được. Dữ liệu chưa có bản sửa.
- Issue #5323 (8 bình luận): mỗi lượt của agent tạo commit dưới `refs/agents/*` bằng danh tính git của bạn, và có yêu cầu bổ sung tùy chọn để tắt chúng nhưng chưa được phát hành.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## Những thay đổi

**v2.4.2 phát hành system prompt cho GPT-6.2.** GPT-6.2 Sol và Astra, cùng các alias `gpt-latest`, giờ dùng prompt viết riêng cho GPT-6.2 ([#66297](https://github.com/anomalyco/opencode/pull/66297)). Sau khi kết nối OpenCode, trình chọn model cũng liệt kê OpenCode Go.

**Đề xuất: Kimi dùng system prompt mặc định.** Một PR bỏ phần ghi đè `kimi.txt`, vốn yêu cầu model xác nhận git mỗi lần và dùng tên tool đã lỗi thời ([#66538](https://github.com/anomalyco/opencode/pull/66538)). Chưa merge, nên chưa có gì thay đổi cho đến khi được hợp nhất.

**Đề xuất: phân biệt các tool call ID bị trùng.** Khi model lặp lại một tool call ID qua nhiều bước, các backend strict từ chối lịch sử phát lại và phiên dừng lại. Một PR sửa lỗi này cho Chat và Responses ([#66544](https://github.com/anomalyco/opencode/pull/66544)).

## Đáng chú ý

**Cửa sổ console trên Windows nhấp nháy khoảng một lần mỗi giây.** Mọi tiến trình console được spawn đều cấp phát một cửa sổ hiển thị vì lệnh spawn thiếu `CREATE_NO_WINDOW`; `git.exe` là trường hợp rõ nhất ([#52266](https://github.com/anomalyco/opencode/issues/52266), đang mở, 13 bình luận).

**Subagent chạy nền vẫn không thể hủy trong v2.** Tool `subagent` trả về session ID và các phiên có thể được tiếp tục, nhưng không có cách hủy ([#36423](https://github.com/anomalyco/opencode/issues/36423), 19 bình luận).

**TUI `/sessions` mất hai hành vi ghim sau 1.19.0 → 2.4.2.** Các phiên đã ghim nằm ngoài trang hiện tại không còn hiện cùng số chuyển nhanh, và Ctrl+F ngừng đi theo hàng đã ghim ([#66534](https://github.com/anomalyco/opencode/issues/66534), đang mở).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

Pi v1.6.1 bổ sung model quyết định vào codemode. `models.classify()` giờ gọi được `gpt-6-luna-decisions` của GitHub Copilot và các model quyết định của Radius, kết quả trả về kèm `responseId` từ nhà cung cấp. Đáng chú ý nếu bạn định tuyến phân loại qua codemode và cần truy vết kết quả về nhà cung cấp.

**Đáng lưu tâm**

Issue #10956 (19 bình luận, đang mở): với `cacheWarming: "idle"`, việc làm ấm cache lúc rảnh không bao giờ chạy khi một extension xử lý `turn_end` và ngữ cảnh chứa message tùy chỉnh hoặc message nén. Tác giả báo cáo 507 sự kiện `cache_warming_decision` từ tháng 9, tất cả ở `continuationProbability: 1`, không có sự kiện nào ở 0.15. Dữ liệu chưa có cách khắc phục.

Issue #12367 (đã đóng): sau khi cập nhật lên 1.6.0, OpenAI loại bỏ các reasoning item với `prefix_mismatch`. Được báo cáo là chập chờn, không tái hiện được theo yêu cầu.

PR #12556 (bản nháp, đang mở): đề xuất tùy chọn từ chối `DO_NOT_TRACK` cho telemetry cài đặt và attribution. Chưa phát hành.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Có gì thay đổi

- **v0.28.6 phát hành kèm tính năng parking cho managed-session.** Session giờ có thể park trong khi chờ phê duyệt tool, câu hỏi, hoặc quyết định từ Hooks/MCP, tồn tại qua các lần khởi động lại Harness, và resume qua cold recovery ([#17953](https://github.com/QwenLM/qwen-code/pull/17953), [#18115](https://github.com/QwenLM/qwen-code/pull/18115)). Parking hiện chỉ bao gồm các trường hợp chờ mà cold recovery vốn đã chấp nhận, nên hầu hết session có phê duyệt đang chờ vẫn nằm thường trú ([#18149](https://github.com/QwenLM/qwen-code/issues/18149)).
- **sdk-typescript-v0.1.36 đi kèm CLI 0.28.6** ([PR #18413](https://github.com/QwenLM/qwen-code/pull/18413)). Cập nhật SDK và CLI cùng lúc để giữ đồng bộ.
- **Đề xuất, chưa phát hành:** [PR #18418](https://github.com/QwenLM/qwen-code/pull/18418) sẽ loại bỏ hoàn toàn loop detection, để model tự quyết định thay vì dùng cơ chế phát hiện. Loop detection hiện báo nhầm trên các chu kỳ verification và ngắt các lượt không giám sát mà không thể phục hồi ([#9733](https://github.com/QwenLM/qwen-code/issues/9733), 5 bình luận).

## Đáng chú ý

- **Lỗ hổng bảo mật của `qwen -p`:** trong thư mục trusted, chế độ headless không có cờ `--approval-mode` đọc được các file ngoài workspace mà `--approval-mode=default` từ chối ([#18379](https://github.com/QwenLM/qwen-code/issues/18379)). Dữ liệu chưa có bản sửa.
- **Compaction đếm trùng kết quả tool đang chờ,** làm ước tính kích thước request tiếp theo tăng thêm 20K và dừng lượt hoặc gửi `max_tokens: 1` ([#15486](https://github.com/QwenLM/qwen-code/issues/15486)). Dữ liệu chưa có bản sửa.
- **`/btw` xếp hàng đợi thay vì trả lời** khi một tool call đang chạy, dù gợi ý hiển thị nó giữa lượt ([#18401](https://github.com/QwenLM/qwen-code/issues/18401)).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*