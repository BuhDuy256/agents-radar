# Bản tin AI từ cộng đồng công nghệ 2026-11-19

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-19 07:12 UTC

---

## Workflow

### Strands Decider khiến AI Game Master hỏi thay vì đoán
Tác giả dựng một demo game nhập vai định tuyến mọi quyết định qua Strands Decider, một model nhỏ chạy cục bộ trả lời câu hỏi yes/no, chọn-một, hoặc cho điểm trong vài trăm mili giây. Cách dựng: clone repo mẫu, khởi động model server bằng uv, rồi chạy các lệnh chapter; một thanh confidence trong engine.py quyết định game master hành động hay hỏi người chơi. Dừng lại nhìn một âm thanh được trả lời yes ở mức 0.857 và tung xúc xắc d6; mời một sinh vật uống cà phê rơi xuống dưới ngưỡng với confidence 0.060, nên game master đã hỏi. Câu trả lời dưới ngưỡng sẽ hỏi người chơi thay vì tự quyết.
Nguồn: [dev.to](https://dev.to/aws/lets-strands-decider-our-role-playing-game-489e)
Tương tác: 16 reactions · 0 bình luận · đọc 10 phút

## Thử nghiệm và so sánh

### Số lượng tool trong danh sách gần như không đổi chi phí mỗi task; danh sách cỡ trung tốn thêm 41%
Tác giả chia 4.310 lượt chạy đã công bố từ bảng xếp hạng THOL theo số lượng tool trong danh sách, trên 17 task dài nơi mỗi lượt chạy đốt hơn 200.000 token. Claude Code nguyên bản tốn 301.467 token mỗi task giải xong, danh sách 8 tool tốn 294.318, danh sách 30 tool tốn 304.341 — tất cả nằm trong khoảng nhiễu run-to-run cỡ 17% của bảng. Danh sách 13 tool tốn 425.411 token, tăng 41%, với 5,5 lượt thêm. Tác giả cho rằng nguyên nhân là do tool trả về kém buộc phải đọc lại dự phòng, không phải do kích thước danh sách, và lưu ý dữ liệu không có mục 200-tool thực sự và gần như mọi lượt chạy đều thành công.
Nguồn: [dev.to](https://dev.to/aheadkit/stop-counting-tools-start-counting-turns-lmj)
Tương tác: 3 reactions · 0 bình luận · đọc 6 phút

### Mười một model chọn cùng một tool ở 17 trong 20 hạng mục, nhưng auth chia rẽ mạnh
Tác giả chạy 100 task build ẩn danh hai lần qua Claude Sonnet 5.5, GPT-5.6 Terra và Gemini 3.1 Pro (30 câu trả lời mỗi hạng mục), rồi qua tám model open-weight (80 mỗi hạng mục), chỉ đếm những gì được cài đặt. Sentry và Playwright xuất hiện trong cả 30 câu trả lời của bộ ba lớn; các model mở cài Sentry trong 76 trên 80. Các model mở khớp với lựa chọn đầu tiên của bộ ba lớn ở 17 trong 20 hạng mục. Auth không có người thắng: Claude chọn Auth.js, Gemini chọn Clerk, còn GPT tự viết login trong 4 trên 10 câu trả lời. Datadog được nhắc trong 28 câu trả lời và không được cài trong câu nào.
Nguồn: [dev.to](https://dev.to/momen_elshamy/what-ai-coding-agents-install-and-what-they-skip-3lg0)
Tương tác: 12 reactions · 1 bình luận · đọc 6 phút

### Một script mỗi lượt giảm 98,7% token trong thử nghiệm MCP của công ty nhưng giấu giá trị runtime khỏi classifier
Code Mode cho Claude viết một chương trình JavaScript duy nhất thực hiện nhiều lời gọi tool, nên chỉ những gì code trả về mới đến được model, thay vì một lời gọi và kết quả mỗi lượt. Nghiên cứu MCP của Anthropic đo định nghĩa tool và kết quả ở 150.000 token qua context, giảm còn 2.000 khi đưa công việc vào code, theo tác giả. Ở chế độ auto, classifier xem xét script chứ không xem giá trị runtime, nên một đường dẫn tính từ kết quả tìm kiếm sẽ không bao giờ được thấy; cần có rule hoặc hook bao phủ. Tính năng này đang ở dạng thử nghiệm, chỉ hỗ trợ JavaScript, và không khả dụng trên Bedrock, Vertex, gateway, và custom base URL.
Nguồn: [dev.to](https://dev.to/dishant0406/code-mode-cuts-claudes-token-bill-it-also-blinds-the-guardrail-36ek)
Tương tác: 2 reactions · 1 bình luận · đọc 6 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*