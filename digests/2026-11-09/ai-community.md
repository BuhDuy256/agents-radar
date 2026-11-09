# Bản tin AI từ cộng đồng công nghệ 2026-11-09

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-09 06:06 UTC

---

## Workflows
### Tác giả đổi tên ảnh chụp màn hình cục bộ bằng Gemma 4 và phát hiện một mật khẩu thử nghiệm
Tác giả thử Lazy Screenshot Namer để đổi tên bảy ảnh chụp màn hình thay vì mất 10–15 phút làm thủ công. Gemma 4 chạy cục bộ qua Ollama xem từng ảnh, mô tả ảnh, gợi ý tên ngắn và đánh dấu một ảnh chứa mật khẩu giả được tạo cho bài thử. Phiên bản đầu thất bại: model lặp từ, tạo ra một tên tệp dài 13.706 ký tự và mất khoảng 4 phút mỗi ảnh. Giới hạn đầu ra ở 40 token trong Ollama giảm xuống còn khoảng 9 giây mỗi ảnh. Bỏ ví dụ khỏi prompt khiến model không sao chép ví dụ nữa, và tách mô tả khỏi việc đặt tên đưa số tên dùng được từ 2 trên 7 lên 7 trên 7.
Nguồn: [dev.to](https://dev.to/devcarlat800/i-let-a-local-gemma-4-name-my-screenshots-and-it-caught-my-fake-password-bmb)
Tương tác: 2 reactions · 5 comments · 4 min read

## Experiments and comparisons
### Astra đọc và viết lại trọng số không cần gradient, đưa MATH-500 lên 48,1%
Theo nhóm tác giả MIT CSAIL, các LLM tiên tiến có thể đọc và ghi trọng số mạng nơ-ron trực tiếp. GPT-6 Astra nhận diện mạng PPO đã chơi game nào trong bốn game chỉ từ 17.253 trọng số thô, không dùng công cụ. Khi được yêu cầu cải thiện Qwen3.5-0.8B mà không dùng gradient, Astra chỉnh sửa 0,016% trọng số, nâng MATH-500 từ 7,9% lên 48,1% với cùng thiết lập lấy mẫu và tăng gấp ba IFEval. Bài viết báo cáo kết quả ban đầu trên các mạng nhỏ và một model ngôn ngữ, không phải tuyên bố chung rằng chỉnh sửa trọng số bằng LLM tốt hơn các optimizer.
Nguồn: [rikiyat.github.io](https://rikiyat.github.io/blog/weight-space-programming/)
Tương tác: 50 points · 16 comments

### AI SDK 7.0.163 thêm ping và steering-message, làm hỏng exhaustive switch
Việc thêm `ping` và `steering-message` vào union stream-part trong một bản patch khiến exhaustive switch trên `fullStream` không qua được kiểm tra kiểu dưới TypeScript 7.0.2, dù runtime không hỏng gì. Tác giả thử `ai` 7.0.165 với một model giả: ping xuất hiện trong `fullStream` nhưng không có trong văn bản sinh ra, và bị loại khỏi UI message stream, nên chỉ code phía server duyệt `fullStream` bị ảnh hưởng. Anthropic chỉ phát ping khi bật `includePings: true`. Cách sửa là thêm cả hai case, biên dịch sạch trên 7.0.165.
Nguồn: [dev.to](https://dev.to/sushilmagare10/ai-sdk-70163-added-two-stream-parts-in-a-patch-release-my-exhaustive-switch-stopped-compiling-1m14)
Tương tác: 5 reactions · 1 comments · 4 min read

### Support copilot Gemma cục bộ của tác giả chọn sai chính sách ở các ca không khớp
Tác giả thử Support Copilot, một trợ lý cho cửa hàng một người dùng model Gemma cục bộ qua Ollama, trên các ca khách hàng cũ lưu bằng pgvector. Với yêu cầu hoàn tiền cho bình hoa vỡ, tìm kiếm trả về một ca đồ vỡ và một ca đổi ý, và Gemma đôi khi áp sai chính sách trả hàng; với ngưỡng điểm tối thiểu thấp, nó còn khẳng định cửa hàng không có ấm trà. Giảm temperature xuống 0,2, yêu cầu model theo ca giống nhất và nâng ngưỡng điểm tối thiểu lên 0,6 cải thiện bản nháp. Người vẫn đọc từng bản nháp trước khi gửi.
Nguồn: [dev.to](https://dev.to/devcarlat800/i-built-a-support-copilot-for-one-person-shops-that-runs-gemma-4-on-a-laptop-4bpc)
Tương tác: 2 reactions · 5 comments · 4 min read

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*