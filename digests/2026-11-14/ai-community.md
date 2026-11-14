# Bản tin AI từ cộng đồng công nghệ 2026-11-14

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-14 06:07 UTC

---

## Workflows
### Tự dựng ứng dụng học tập chạy trên trình duyệt, chỉ trả lời từ ghi chú của bạn
Tác giả đã dựng Grading Buddy, một ứng dụng học tập offline chạy LFM3-1.7B của Liquid AI ngay trong trình duyệt và chỉ trả lời dựa trên những ghi chú mà tác giả đã tự kiểm tra. Stack gồm Transformers.js, bản export ONNX của LFM3-1.7B ở mức `q4f16` (khoảng 1,1 GB) và WebGPU; model chạy trong Web Worker nên trang vẫn mượt. Ứng dụng khớp câu hỏi với một chủ đề, dừng sớm nếu không khớp, đưa các dữ kiện của chủ đề đó cho model, rồi bắt buộc phải vượt qua kiểm tra grounding và kiểm tra dữ kiện bắt buộc. Nếu một trong hai kiểm tra thất bại, ứng dụng hiển thị thẻ ghi chú thay vì câu trả lời. Đến nay tác giả chỉ dùng thử với môn Taekwon-Do, và ở bản tối giản thì model trả lời sai Chon-Ji.
Nguồn: [dev.to](https://dev.to/debs_obrien/build-an-offline-ai-study-app-with-local-models-liquid-ai-lfm3-17b-1lio)
Tương tác: 5 cảm xúc · 2 bình luận · đọc 7 phút

## Experiments and comparisons
### 89,6% trong 37.383 remote MCP server phản hồi một bài kiểm tra kết nối hằng ngày
NestDaddy đã kết nối tới mọi remote MCP server trong registry chính thức theo cách một MCP client làm — gửi `initialize`, `notifications/initialized`, rồi `tools/list` — không kèm thông tin xác thực và timeout 10 giây, chạy hằng ngày từ một server ở châu Âu. Trong 37.383 remote server, có 33.496 server (89,6%) phản hồi; 12.447 server trả về 401 hoặc 403, nhóm tác giả tính là còn sống nhưng cần key, nên không thấy được các tool của chúng. Lỗi phổ biến là lỗi kết nối (1.156) và HTTP 404 (997). Thời gian `initialize` trung vị khoảng 500 ms, đo từ một vị trí duy nhất, nên nhóm tác giả coi các con số thời gian chỉ là tham khảo chứ không phải bảng xếp hạng. Registry liệt kê 62.377 mục, trong đó nhóm tác giả ẩn 7.839 mục (12,6%) vì coi là spam.
Nguồn: [dev.to](https://dev.to/nestdaddy/we-tested-37000-mcp-servers-heres-how-many-actually-work-1pne)
Tương tác: 3 cảm xúc · 4 bình luận · đọc 5 phút

### Gemma 4 31B qua một API miễn phí, trên trang chat chạy local và một agent ADK nhỏ
Tác giả đã dựng một trang chat, một client terminal và một agent ADK nhỏ gọi Gemma 4 31B phục vụ qua AMD Token Lab, API tương thích OpenAI của AI Developer Program. Key mới đi kèm 10 điểm dùng trong 30 ngày (được gia hạn một lần thêm 15 ngày) và giới hạn 20 request mỗi phút. Trang chat viết bằng Python thư viện chuẩn, phục vụ một trang trên `127.0.0.1` và chuyển tiếp `/v1/*` tới base URL kèm key, nên key không bao giờ lộ ra trình duyệt. Trong lần chạy của tác giả, 23 request dùng hết 0,000335 trong 10 điểm; một câu trả lời mất 4,96 giây để ra token đầu tiên và giải mã ở tốc độ 9,5 token mỗi giây.
Nguồn: [dev.to](https://dev.to/gde/cant-beat-free-gemma-4-31b-on-amd-token-lab-with-a-local-chat-page-and-an-adk-agent-c5b)
Tương tác: 19 cảm xúc · 12 bình luận · đọc 9 phút

### So sánh xác suất một lượt với bốn model sinh trên 48 ticket hỗ trợ
Tác giả đã benchmark Gemini Decisions API — API chấm điểm một tập câu trả lời cho phép cố định trong một lượt forward và trả về xác suất — với Gemini 3.8 Flash, Gemini 4 Hydrogen, Gemini 3.5 Flash-Lite và Gemma 4 E2B trên CPU laptop. Cả năm backend nhận cùng ba câu hỏi phân loại; các model sinh trả lời qua prompt kèm JSON schema giới hạn câu trả lời trong tập cho phép. Theo tác giả, các ticket rõ ràng đạt 0,93 đến 1,00 về độ tin cậy nhóm; một ticket vừa có lỗi crash vừa có bốn khoản phí bị tách thành 0,58 cho billing và 0,39 cho technical, và bị gắn cờ cần xem lại; hai ca bỏ sót mức độ khẩn cấp cũng là hai độ tin cậy khẩn cấp thấp nhất, 0,699 và 0,663. Dữ liệu thô nằm trong repository.
Nguồn: [dev.to](https://dev.to/gde/benchmarking-the-gemini-decisions-api-l31)
Tương tác: 9 cảm xúc · 3 bình luận · đọc 13 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*