# Bản tin AI từ cộng đồng công nghệ 2026-11-06

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-06 06:26 UTC

---

## Workflows
### Script thắng markdown khi biến coding agent thành các hành động lặp lại được
Tác giả lập luận rằng bảo agent đọc style guide để lại cho nó quá nhiều phán đoán, còn script, Makefile target và hook thì biến sở thích thành kiểm tra đạt/không đạt. Ông mô tả việc chạy script lint, format và test thay vì các quy tắc viết, thêm kiểm tra độ dài câu tối đa như một editor hook sau khi phát hiện 9 lỗi trong 10 phản hồi, và dựa vào CI vì ông không viết Ruby. Giới hạn của ông: một kiểm tra chỉ bao phủ những gì nó kiểm tra, và ông nói hook cục bộ có thể bị bỏ qua, nên cần một CI job bắt buộc và merge gate để chống lưng.
Nguồn: [dev.to](https://dev.to/dannwaneri/dont-write-markdown-files-for-your-coding-agent-write-scripts-j00)
Tương tác: 40 reactions · 23 comments · 4 min read

### Gatekeeper sàng lọc các gói cài đặt của coding agent ngay trong chat của nhóm
Tác giả dựng "Gatekeeper" trên Switch, hạ tầng mã nguồn mở đưa agent vào kênh Slack, Discord hoặc Teams như những thành viên có tên, sau khi đo được rằng một open model bịa tên package trong 2 trên 150 prompt. Một coding agent xin cài package viết sai chính tả phải chờ phán quyết; Scout kiểm tra npm registry và nói dừng, Squat Watch ghi lại tên bịa vào tài liệu phòng qua một tin nhắn nhắm mục tiêu, và Fixer đăng lệnh đã sửa. Agent sau đó xác minh package thật và tiếp tục.
Nguồn: [dev.to](https://dev.to/ankithm1006/my-coding-agent-asked-another-agent-for-permission-it-said-no-3m3k)
Tương tác: 5 reactions · 0 comments · 11 min read

## Thử nghiệm và so sánh
### Vòng lặp suy nghĩ của Qwen giảm từ 93% xuống 33% sau khi sửa trọng số
Một nhóm liên kết với MIT báo cáo rằng GPT-6 Astra đã sửa khoảng 0,016% trọng số của Qwen3.5-0.8B, trừ đi một hướng liên quan đến lặp lại ở layer 15 và 19, với gradient và optimizer bị cấm. Độ chính xác MATH-500 được báo cáo tăng từ 7,9% lên 48,1% theo một giao thức cố định lấy trung bình bốn mẫu mỗi bài. Khoảng 33,1% câu trả lời đã sửa vẫn chạm giới hạn độ dài, và các tác giả nói rằng các câu hỏi đánh giá cuối cùng đã bị giữ lại. Matthew Honnibal riêng lập luận rằng việc gộp các thử nghiệm có điều kiện khác nhau lại tạo ấn tượng sai lệch.
Nguồn: [dev.to](https://dev.to/axrisi/qwen-weight-editing-how-astra-reduced-thinking-loops-2ccc)
Tương tác: 7 reactions · 0 comments · 8 min read

### Eval tự làm đặt trọng số ảo giác cao hơn chi phí cho một mẫu khai thuế
Tác giả xây gem Ruby llm-evals, hiện ở 0.5.0, để chấm điểm model trên nhiều bộ dữ liệu với một điểm số có trọng số thay vì sắp xếp nhiều cột. Với một ca khai thuế mơ hồ, gpt-4o-mini trả về married_jointly với 78,8% trong khi filing_status kỳ vọng là null, và deepseek-v4.1-flash-1017 đạt 100% mà không có chẩn đoán. Trong cấu hình Qualified.At, tác giả báo cáo khớp chính xác chiếm 20% điểm số còn lỗi cộng câu trả lời không hợp lệ chiếm 32%, với chi phí và độ trễ mỗi thứ 10%.
Nguồn: [dev.to](https://dev.to/kigster/home-made-evals-just-taste-better-2d5k)
Tương tác: 3 reactions · 0 comments · 8 min read

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*