# Bản tin AI từ cộng đồng công nghệ 2026-11-07

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-07 05:48 UTC

---

## Workflows
### Ba công cụ vẽ sơ đồ kiến trúc được thử trên cùng một codebase gồm năm repo
Tác giả chạy Floorplan, Archify và Understand Anything dưới dạng plugin Claude Code trên worklore, một dự án chia thành năm repo. Floorplan tạo bản đồ bấm được trong vài phút nhưng viết luồng người dùng từ ký ức, hai luồng sai; yêu cầu lại 17 luồng có dấu vết và kiểm thử staging 16 luồng thì 14 luồng đạt. Archify vẽ một sơ đồ cho mỗi repo trong khoảng một giờ với hai lần chạy lỗi, có dẫn số dòng code đã xác minh là tồn tại. Understand Anything dựng đồ thị 732 nút trong 14 phút với giá $13.01 theo giá API. Cả ba đều trả lời đúng ba câu hỏi chung, nhưng không công cụ nào phát hiện lỗ hổng phân quyền OAuth mà một agent đọc code thông thường tìm ra.
Nguồn: [dev.to](https://dev.to/yahhi/i-ran-3-claude-code-architecture-diagram-tools-on-my-repo-heres-what-each-one-got-right-110n)
Tương tác: 6 reactions · 6 bình luận · đọc 7 phút

## Experiments and comparisons
### Chỉnh sửa trong không gian trọng số hiệu quả với model nhỏ, thất bại với suy luận của LLM
Tác giả kiểm chứng tuyên bố lập trình không gian trọng số của MIT CSAIL bằng cách dùng một agent lập trình để chẩn đoán và vá sáu loại model. Một model dự báo mưa viết tay với zero nhãn đạt AUC 0.809, so với 0.839 của XGBoost huấn luyện trên 2,5 năm dữ liệu. Các bản vá rule-block sửa được một model phát hiện gian lận thiên lệch theo loại tiền và một bộ định tuyến ticket gần như không có tác dụng phụ. Trên một LLM 0.8B, tác giả tái tạo một chỉnh sửa đã công bố khiến kết thúc suy luận dễ xảy ra gấp 29 lần, nhưng chỉnh sửa của chính anh chỉ đẩy lên 1,2 lần. Chỉnh sửa loại bỏ hoặc chuyển hướng hành vi; nó không thêm kiến thức mà model chưa từng học.
Nguồn: [dev.to](https://dev.to/iyadh_khalfallah/i-tried-weight-space-programming-on-6-kinds-of-models-heres-where-it-works-and-where-it-breaks-58e3)
Tương tác: 2 reactions · 0 bình luận · đọc 6 phút

### Tám model review cùng năm PR; harness hỏng trước tiên
Tác giả benchmark tám model trên năm PR đã merge từ chính repo của mình bằng Proctor, agent review của anh, chấm điểm recall, precision và các phát hiện bị cấm. Ba lỗi harness lộ ra trước: một parser cắt theo dấu ngoặc đã loại bỏ phản hồi của Opus 5.5 có chứa `{ db }` trong văn xuôi, một router âm thầm gửi các lệnh gọi "Claude" tới DeepSeek/GLM/Kimi, và Sonnet 5.5 viết tool call dưới dạng văn bản trong một lượt không có tool. Sau khi sửa, Opus và Sonnet từ 3 và 2 review lỗi trên 15 xuống còn zero. Một hội đồng ba giám khảo đồng thuận trong khoảng hai điểm, nhưng K3.1 Pro dịch từ 54.6 xuống 50.4 giữa các vòng, cho thấy độ biến thiên giữa các lần chạy.
Nguồn: [dev.to](https://dev.to/grumbash/i-benchmarked-8-models-on-our-own-code-reviews-the-first-bug-was-ours-2c5p)
Tương tác: 2 reactions · 4 bình luận · đọc 7 phút

### Rò rỉ User-Agent của Claude Code, và cách kiểm tra bản cài của bạn
Tác giả báo cáo hai issue GitHub mô tả việc Claude Code gửi email tài khoản tới bên thứ ba. Issue #107757 (hơn 360 reactions) cho biết email tài khoản xuất hiện trong header `User-Agent` của các yêu cầu web, nên mọi log server trên đường đi của agent đều thu được địa chỉ developer đang hoạt động; issue #81138 (ngày 25 tháng 7, vẫn mở) dẫn code trong bundle chèn cùng email đó vào system prompt của mọi phiên. Anthropic phát hành mod `cc-plugin-privacy` tích hợp trong v2.1.317+ để "chặn hành vi này một cách tất định." Tác giả lưu ý một người báo cáo trên v2.1.318 vẫn thấy rò rỉ, nên anh đưa ra danh sách kiểm tra năm điểm, gồm một HTTP listener cục bộ cho thấy agent thực sự gửi gì.
Nguồn: [dev.to](https://dev.to/slabb/claude-code-was-mailing-your-email-address-to-every-website-it-visited-the-user-agent-leak-the-12k6)
Tương tác: 10 reactions · 5 bình luận · đọc 5 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*