# Bản tin AI từ cộng đồng công nghệ 2026-11-25

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-25 08:16 UTC

---

## Workflows
### Prompt đánh giá có cấu trúc ngang ngửa tiếng Anh thường trên sáu ca
Tác giả thử một prompt có cấu trúc, AP-06, đối chiếu với một bản kiểm soát viết bằng tiếng Anh thường trên sáu ca kiểm tra claim tổng hợp. Cả hai nhánh chạy qua Qwen2.5-0.5B-Instruct lượng tử hóa 4-bit với llama.cpp, temperature 0 và seed 42, mỗi lần trong một tiến trình mới. Tác giả chấm trước và đã biết các ca; một lượt đọc AI thứ hai, chạy mù, sau đó chấm cùng các output đã xáo trộn. Cách đọc tạm thời của tác giả cho AP-06 1/6 và bản kiểm soát 0/6; lượt đọc mù cho cả hai cùng 1/6, với bất đồng ở bốn nhãn của bản kiểm soát. Đây là pilot sáu ca, không có lần chạy model mới và không có bản sao lặp của người. Bảng điểm và output được công bố để kiểm chứng.
Nguồn: [dev.to](https://dev.to/gnomeman4201/i-tested-my-prompt-against-plain-english-one-answer-changed-the-result-4m3o)
Tương tác: 11 reactions · 1 comments · 6 min read

### Kiểm tra phê duyệt tool cho MCP server thay đổi sau khi review
Tác giả lập luận một tool MCP đã được phê duyệt có thể đổi hành vi mà vẫn giữ nguyên tên, nên kết nối vẫn xác thực và agent vẫn gọi nó. Ba câu hỏi phải tách riêng: đây có phải server dự định không, đây có phải hợp đồng tool đã phê duyệt không, và lần gọi này có được phép không. Workflow đề xuất thêm một manifest tool đáng tin cho mỗi định danh server, gồm tên tool, phiên bản, dấu vân tay schema và các khả năng được phép, rồi so sánh dấu vân tay schema hiện tại trước khi agent gọi. Bài viết đưa một schema_fingerprint() bằng Python dùng JSON chuẩn tắc với key đã sắp xếp và SHA-256; digest chỉ để minh họa, và quyết định bảo mật thuộc lớp policy, không thuộc model.
Nguồn: [dev.to](https://dev.to/katul1512/your-ai-agent-trusted-the-tool-the-tool-changed-overnight-2f65)
Tương tác: 8 reactions · 8 comments · 16 min read

## Experiments and comparisons
### Bộ quy tắc Ponytail giảm một nửa output của Claude Code; tác giả vẫn thích bản lớn hơn
Tác giả dựng một app ba lần: một bản gốc, cộng hai bản Claude Code với Opus 5.5 từ cùng PRD và prompt, một bản tắt bộ quy tắc Ponytail và một bản bật. Bản B (bật Ponytail) có 206 dòng và 10.8 KB so với 416 dòng và 14.1 KB của A, tốn $0.73 so với $0.85, và mất 1m 29s so với 1m 49s. B vượt 9 trên 9 kiểm tra chấp nhận; A vượt 8 trên 9. Tác giả lưu ý định dạng làm phóng đại khoảng cách số dòng, app được cố ý làm rất nhỏ, và PRD đóng góp phần lớn việc thu gọn. B cắt bỏ họa tiết nền, khung đồng thau và tiêu đề lớn, những thứ tác giả thấy thiếu.
Nguồn: [dev.to](https://dev.to/necoz/lazy-senior-dev-mode-made-my-app-smaller-was-it-better-90i)
Tương tác: 37 reactions · 1 comments · 10 min read

### 201 lần gọi thật phơi ra năm kiểu lỗi structured-output
Tác giả chạy 201 request DashScope thật trên bốn model để kiểm tra độ ổn định khi lặp lại với trích xuất JSON lồng nhau và định tuyến 6 tool. Kết quả khác biệt rõ: qwen3.8-max vượt mọi ô (10/10, 10/10, 20/20, 10/10), trong khi kimi-k3.1-pro hỏng cả 20 lần gọi định tuyến chỉ bằng prompt vì gọi query_order thay vì query_inventory, rồi đạt 10/10 khi có tool_choice. deepseek-v4-pro trả JSON hợp lệ nhưng sai tổng ở phần lớn lần hỏng, trả lời người dùng thay vì gọi tool 4/20 lần, và gặp một lỗi HTTP 400 khi biên dịch grammar. Chốt chặn của tác giả: khẳng định tên hàm trả về ngay trong code, xử lý nhánh không có tool call, và tính lại tổng tiền một cách xác định. Cờ thinking khác nhau ở một model.
Nguồn: [dev.to](https://dev.to/wangguode/structured-output-function-calling-under-stress-5-production-failure-modes-across-201-calls-62e)
Tương tác: 5 reactions · 0 comments · 3 min read

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*