# Bản tin AI từ cộng đồng công nghệ 2026-11-26

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-26 08:03 UTC

---

## Workflow
### Tác giả cài đặt skill đánh giá Well-Architected bên trong coding agent
Tác giả, cựu AWS Solutions Architect, đã thử skill `aws-well-architected-review` từ Agent Toolkit for AWS, chạy được trong Kiro, Claude Code, Cursor và Codex. Skill này khám phá workload từ infrastructure-as-code và mã ứng dụng, trả về phát hiện kèm tên file và số dòng, và lấy nội dung framework từ tài liệu AWS trực tiếp tại thời điểm đánh giá thay vì từ dữ liệu huấn luyện. Nó có bốn chế độ: full, quick, pillar-scoped và score. Tác giả trỏ nó vào một mẫu serverless books API công khai. Cài đặt cần cài toolkit, nhưng skill không cần tài khoản AWS, IAM hay gói hỗ trợ. Dùng nó cho đánh giá trước khi ra mắt hoặc kiểm toán.
Nguồn: [dev.to](https://dev.to/aws/can-your-agent-review-your-cloud-architecture-4coh)
Tương tác: 12 reactions · 2 comments · 12 min read

## Thử nghiệm và so sánh
### Cổng quyết định 2B chặn 7 trong 11 yêu cầu hoàn tiền xấu; Nova Pro chặn 9
Tác giả thử Strands Decider 2B làm cổng công cụ trên 16 trường hợp hoàn tiền, đối chiếu với Amazon Nova Pro làm giám khảo. Cổng chạy trên `before_tool_call`, hỏi ba câu, và trả về Proceed, Guide hoặc Deny. Cổng khớp 9 trong 16 trường hợp và để lọt 4 trong 11 yêu cầu xấu với độ tin cậy từ 0,80 đến 0,95; Nova Pro khớp 14 trong 16 và để lọt 2. Cả hai đều không chặn được đòn injection yêu cầu classifier cho phép. Tác giả lưu ý ngưỡng 0,90 được chọn sau khi xem kết quả và biên độ chỉ khoảng 0,03.
Nguồn: [dev.to](https://dev.to/aws-builders/stop-ai-agents-acting-on-bluffs-a-strands-decider-2b-tool-gate-test-5004)
Tương tác: 23 reactions · 14 comments · 11 min read

### Độ chính xác gọi công cụ của Gemma 4 phụ thuộc vào cài đặt sampling, không phải kích thước model
Tác giả chạy các model Gemma 4 E2B, E4B và 12B, mỗi model là bản 4-bit QAT trên RTX 3050 8 GB qua llama.cpp, trên 840 bài toán Berkeley Function Calling Leaderboard với bốn cài đặt. Ở temperature 0 với thinking tắt, ba model đạt 748, 758 và 756 trên 840, trong đó E2B nhanh nhất với 0,84 giây mỗi bài. Cài đặt sampling của Google với thinking tắt khiến E4B mất 60 bài và E2B mất 46 bài. Tác giả khuyến nghị dùng E2B với thinking tắt ở temperature 0, hoặc E4B/E2B với thinking bật theo cài đặt của Google.
Nguồn: [dev.to](https://dev.to/gde/gemma-4-function-calls-on-an-8-gb-rtx-3050-the-setting-matters-more-than-the-size-53a5)
Tương tác: 12 reactions · 0 comments · 11 min read

### Hộp đen ghi lại hoạt động của coding agent cần một hợp đồng xác nhận giao hàng
Tác giả, người xây dựng ccdeck, kể lại việc biến một dashboard chỉ quan sát thành dashboard có thể trả lời các yêu cầu cấp quyền của agent. ccdeck 4.0.0 thêm terminal bên trong dashboard, 4.1.0 thêm card cho câu hỏi và phê duyệt của Claude Code, 4.3.0 thêm giám sát cho opencode và GitHub Copilot CLI, và 4.3.13 thêm tab cho nhiều phiên. Thiết kế hiển thị "Sending…" khi việc giao hàng còn chưa chắc chắn và đưa ra "Show Term" thay vì xác nhận một tin nhắn chưa được chấp nhận. Chỉ Claude Code và Codex CLI có tích hợp terminal-và-chat được quản lý; opencode và Copilot CLI chỉ để giám sát.
Nguồn: [dev.to](https://dev.to/bargan/i-built-a-flight-recorder-for-coding-agents-then-i-had-to-give-it-a-keyboard-46c1)
Tương tác: 5 reactions · 0 comments · 6 min read

### Thiết kế kiểm toán agent được làm lại để agent không thể tự đặt ra ràng buộc
Thiết kế bản ghi kiểm toán ban đầu của tác giả để agent tự khai báo ràng buộc của chính nó, nghĩa là một agent bị dẫn dắt có thể bỏ qua ràng buộc đó. Sau chín bình luận từ một độc giả khác, tác giả đề xuất chuyển ràng buộc vào cấu hình của người vận hành để một bản ghi không viện dẫn phiên bản chính sách nào tự nó là cảnh báo, và thêm nguồn gốc đối số: đánh dấu mỗi đối số quan trọng đến từ tác vụ thường trực hay chỉ từ đầu vào không đáng tin. Giá trị có nguồn gốc không đáng tin không bị từ chối nhưng không được dùng ngay lần đầu xuất hiện, kèm thời gian chờ và một kênh thứ hai. Quy tắc này vẫn thất bại khi bị chiếm quyền, lúc danh tính và nguồn đều hợp lệ.
Nguồn: [dev.to](https://dev.to/mickyarun/your-agent-is-licensed-to-read-the-email-it-is-not-licensed-to-pay-the-account-number-inside-it-3ajm)
Tương tác: 5 reactions · 11 comments · 11 min read

Chỉ bốn bài đầu xuất hiện ở trên; mục thứ năm là mục thứ năm tối đa và trích đoạn Bài 5 thứ hai được đưa vào như vị trí thử nghiệm thứ tư.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*