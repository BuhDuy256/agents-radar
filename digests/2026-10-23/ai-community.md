# Bản tin AI từ cộng đồng công nghệ 2026-10-23

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-10-23 07:53 UTC

---

## Workflow

### Các persona người dùng mới mô phỏng kiểm tra quy trình onboarding của ứng dụng để tìm rào cản
Tác giả đã xây dựng First User Audit, một Agent Skill mã nguồn mở hướng dẫn coding agent khám phá ứng dụng từ bốn hành vi người dùng mới mô phỏng: Impatient, Skeptic, Mobile (viewport 375px) và Breaker. Workflow xác định "thành công đầu tiên" nghĩa là gì, chạy bốn persona trong phiên trình duyệt mới, ghi lại rào cản kèm bằng chứng trình duyệt và bước tái hiện, ưu tiên các vấn đề, và đề xuất bản sửa có giới hạn. Nó cần công cụ trình duyệt được kết nối để thực hiện audit. Tác giả cho biết persona mô phỏng không thay thế kiểm thử khả dụng thực tế, và subagent độc lập phụ thuộc vào môi trường coding. Cài đặt qua skills CLI hoặc prompt copy-paste.
Nguồn: [dev.to](https://dev.to/bargan/i-built-an-agent-skill-that-tests-your-app-like-four-first-time-users-180d)
Tương tác: 13 reactions · 10 comments · đọc 2 phút

### Danh sách kiểm tra bảo mật MCP trước khi nối agent với công cụ thật
Carlos (Bloqarl) đã công bố danh sách kiểm tra 24 điểm để nối agent với công cụ qua MCP, nơi server thường chạy với key và quyền truy cập mạng của người dùng. Các kiểm tra bao gồm path traversal, command injection, execute primitive trong git, ranh giới ghi, chỉ thị injected trong output của công cụ, nội dung ẩn, exfiltration, mô tả công cụ, thông tin xác thực hardcode, key có phạm vi, đặc quyền tối thiểu của tiến trình, tổ hợp server nguy hiểm, ngữ cảnh chia sẻ, chuỗi cung ứng, ô nhiễm ngữ cảnh, SSRF, giới hạn tần suất, và log kèm tham số. Tác giả khuyến nghị chọn ba điểm nếu không làm gì khác: không dựng chuỗi shell từ input của model, không dùng key rộng tồn tại lâu, và coi mọi kết quả công cụ như do kẻ tấn công viết. Phỏng theo hướng dẫn mà nhóm tác giả đã công bố.
Nguồn: [dev.to](https://dev.to/bloqarl/an-mcp-security-checklist-for-developers-wiring-agents-to-real-tools-l71)
Tương tác: 5 reactions · 8 comments · đọc 6 phút

## Thử nghiệm và so sánh

### Temperature 0 vẫn dao động: batching và cache thay đổi logits được tính
Tác giả phát hiện server llama.cpp (build b11643, Qwen2.5-7B-Instruct Q8_0, `-np 8`) cho output greedy khác nhau ở 41 trong 100 bài toán gsm8k khi một request chạy đơn lẻ so với tám request đồng thời; điểm strict-match chuyển từ 0.83 xuống 0.82. Tác giả giải thích rằng temperature và seed chọn token tiếp theo nhưng không cố định xác suất, và thứ tự cộng số thực dấu phẩy động thay đổi theo batch size, cách chia chunk prompt cache, speculative decoding, và phiên bản GPU hoặc kernel. Bài viết kèm script để tái hiện so sánh đơn lẻ với đồng thời trên bất kỳ server tương thích OpenAI nào. Giới hạn: mức độ khác nhau phụ thuộc vào model, GPU và build.
Nguồn: [dev.to](https://dev.to/moca_fd0227eb23c29ea2d065/why-your-local-llm-gives-different-answers-at-temperature-0-32jn)
Tương tác: 2 reactions · 2 comments · đọc 8 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*