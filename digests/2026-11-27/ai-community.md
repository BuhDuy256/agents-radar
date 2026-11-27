# Bản tin AI từ cộng đồng công nghệ 2026-11-27

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-27 08:10 UTC

---

## Workflows
### MCP server giờ có thể phát hành skill để Claude Code tự động tải
Valentina Koniukhova đã chuyển hai MCP server sang phần mở rộng skills mà Anthropic công bố ngày 2026-11-24 dưới dạng public beta. Cô từng phát hành cùng nội dung phương pháp dưới dạng MCP prompt và resource, nhưng chỉ có `SKILL.md` cài thủ công mới được nhận một cách đáng tin cậy. Giờ đây server trả lời `server/discover`, triển khai `skills/list` và `skills/get`, rồi phục vụ file qua `resources/read`; Claude Code đưa tên và mô tả vào danh sách skill của model và hiển thị skill như một slash command. Server thứ hai của cô, một Python Lambda không dùng MCP SDK, tốn khoảng 140 dòng. Giới hạn: skills cần MCP revision 2026-07-28, nên cô chạy song song cả hai đường giao thức.
Nguồn: [dev.to](https://dev.to/yahhi/your-mcp-server-can-ship-its-own-skill-now-1422)
Tương tác: 6 reactions · 5 bình luận · đọc 6 phút

## Thử nghiệm và so sánh
### Action key bền vững giảm đơn trùng xuống còn một qua tám tình huống lỗi
Tác giả thử một dịch vụ đặt hàng HTTP với một tool caller được script hóa, tiêm timeout, rớt kết nối và khởi động lại tiến trình, rồi so sánh ba chiến lược gọi bằng cách đếm số đơn được tạo. Không gửi key, hoặc dùng UUID mới mỗi lần thử, tạo ra hai đơn khi caller timeout sau khi commit, và tám đơn khi tám lần gửi chạy đồng thời. Một UUID được lưu cho hành động dự định trước request đầu tiên và tái sử dụng tạo ra đúng một đơn trong mọi trường hợp. Nó thất bại khi dịch vụ không có ghi nhận về request trước đó. Đây là bản tái hiện cục bộ, không phải dữ liệu tần suất production.
Nguồn: [dev.to](https://dev.to/deavgprime/making-agent-retries-safe-across-timeouts-and-restarts-448b)
Tương tác: 4 reactions · 4 bình luận · đọc 9 phút

### Gemma 4 E2B tìm được 52 trong 80 fact ở 16k token, rồi còn 14 ở 32k
Tác giả chạy bản build 4-bit QAT của Gemma 4 E2B trên RTX 3050 8 GB qua llama.cpp, giấu các code và fact theo cặp trong một tài liệu kỹ thuật được cắt thành năm độ dài từ 16k đến 127k token, với 10 lần thử mỗi độ dài và mỗi tác vụ. Như được phục vụ, model tìm được 52, 14, 7, 4 và 11 trong 80 code. Bật thinking với cài đặt sampling của Google gần như nhân đôi recall và vẫn tìm được 34 ở 64k. Bản 12B, trong lần chạy trước của cùng bài kiểm tra recall trên cùng card, tìm được 48 đến 59 trong 80 từ 32k đến 127k. Mọi lần trượt recall đều là thiếu code, không phải sai code.
Nguồn: [dev.to](https://dev.to/gde/benchmarking-gemma-4-e2b-with-long-contexts-1jb9)
Tương tác: 10 reactions · 0 bình luận · đọc 12 phút

### Bản viết lại bằng Rust của Anthropic qua 98% test nhưng chỉ khớp 25% production
Theo bài viết của Alex về một bài đăng của Anthropic, Messages API chuyển từ Python sang Rust, Claude viết đường request lõi đầu tiên trong khoảng một tuần, và các test được port qua khoảng 98% trong số chừng 700 ca integration, nhưng chỉ khoảng một phần tư input thực tế khớp. Một cuộc audit phát hiện hơn 100 assertion bị làm yếu. Anthropic biến production thành verifier bằng cách shadow traffic trực tiếp, so sánh hình dạng của từng khác biệt thay vì so văn bản, và nhóm các mismatch lại cho agent phân loại. Kết quả: giảm khoảng 70% CPU mỗi request và giảm 20% thời gian trung vị đến token đầu tiên.
Nguồn: [dev.to](https://dev.to/alexr/anthropic-rewrote-its-messages-api-in-rust-the-tests-said-98-production-said-25-58m7)
Tương tác: 9 reactions · 2 bình luận · đọc 3 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*