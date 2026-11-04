# Bản tin AI từ cộng đồng công nghệ 2026-11-04

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-04 06:03 UTC

---

## Workflow
### Chính sách gateway không chặn được những route mà agent của bạn không bao giờ đi
MCP gateway chỉ kiểm soát được những tool mà nó nhìn thấy. Tác giả mô tả một bài kiểm tra cửa hông: bắt đầu từ một hành động như gửi email, liệt kê mọi route dẫn tới nó (MCP tool, một shell script điều khiển client cục bộ, một phiên trình duyệt đã đăng nhập, một API token trong biến môi trường), rồi ghi lại danh tính mà mỗi route mang theo. Sau đó cấp cho agent một danh tính chỉ soạn nháp, không có quyền gửi, và chạy từng lần thử trong một tài khoản sandbox. Kiểm tra lại bằng Sent Items của hộp thư và message trace của tenant, không dựa vào báo cáo của chính agent. Nếu một route thành công, ranh giới đã thất bại.
Nguồn: [dev.to](https://dev.to/bengreenberg/your-agent-has-a-side-door-testing-mcp-policy-beyond-the-tool-list-1699)
Tương tác: 8 reactions · 10 comments · đọc 4 phút

## Thử nghiệm và so sánh
### Rollback bằng snapshot giúp một model 27B đạt 80,2 trên OSWorld Verified
Nhóm tác giả CUA-Master báo cáo model 27B của họ đạt 80,2 trên OSWorld Verified, 36,9 trên OSWorld 2.0 và 43,9 trên WeaveBench. Thay vì bỏ toàn bộ lượt chạy khi một rollout thất bại, runtime của họ chụp snapshot VM tại các ranh giới ổn định, dùng một detector để tìm bước phân kỳ sớm nhất từ residuals của verifier, trajectory và trạng thái cuối, rồi rollback về snapshot ngay trước đó và chỉ giữ lại nhánh pass sạch nhất. Nhiệm vụ đến từ các video hướng dẫn đã cắt cùng một không gian hành động GUI và shell thống nhất. Giới hạn: đây là điểm do chính bài báo báo cáo, không phải một lần tái lập độc lập.
Nguồn: [dev.to](https://dev.to/reidmarlow/why-80-on-osworld-required-vm-snapshot-rollbacks-5ffe)
Tương tác: 5 reactions · 0 comments · đọc 5 phút

### Một harness, 11 dòng model: top mười nằm trong khoảng năm phần trăm điểm
Tác giả benchmark bảy GGUF trên llama.cpp cộng một model trên engine Strata, tất cả trên hai RTX 5080 với sampling cố định và ba seed mỗi task, qua 18 tool task, 72 code task và 72 agent task nhiều bước. Bật Thinking làm tăng độ trễ mỗi lượt (280–1060 ms so với 19–85 ms) nhưng chủ yếu có lợi ở code khó, nơi UD-Q3 tăng từ 79% lên 93%; code dễ (91–100%) không phân biệt được các model. Một engine thứ hai làm lệch đúng 72 agent task đó ba phần nghìn. Đây là bài test tĩnh, trên phần cứng của một tác giả.
Nguồn: [dev.to](https://dev.to/jordimarsal/which-local-model-should-a-coding-agent-run-hjn)
Tương tác: 3 reactions · 3 comments · đọc 6 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*