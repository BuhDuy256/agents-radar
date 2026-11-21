# Bản tin AI từ cộng đồng công nghệ 2026-11-21

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-21 06:55 UTC

---

## Workflows
### CLI Python dạng agent tự động hoá điện mặt trời, pin và sạc EV mỗi 30 phút
Tác giả xây dựng **cheap-watts**, một CLI Python 3.12 không giao diện, trong một ngày cuối tuần để điều phối điện mặt trời mái nhà, pin gia đình 10 kWh, hai xe EV và biểu giá theo giờ linh động. Anh chia việc trong Google Antigravity: Gemini 4 Hydrogen soạn tài liệu kế hoạch và các trường hợp biên; Gemini 4 Carbon tạo khung module, viết bitmask Modbus và chạy pytest. Điều khiển inverter chuyển từ API đám mây sang Modbus LAN cục bộ qua cổng 8899. Một chốt chặn cứng theo ngày ngăn kế hoạch bị ghi lại giữa lúc đang sạc, và khung giờ EV được lên lịch trước khi sạc pin từ lưới. Kết quả: một repo mã nguồn mở với hơn 25 commit và bộ test chạy offline. Bạn có thể áp dụng cách này khi các API về biểu giá và xe không phối hợp được với nhau.
Nguồn: [dev.to](https://dev.to/googleai/agentic-engineering-a-smart-home-energy-system-with-antigravity-and-gemini-4-53md)
Tương tác: 23 lượt cảm xúc · 2 bình luận · 9 phút đọc

## Thử nghiệm và so sánh
### Benchmark Strands: trộn nhiều orchestrator tốn thêm tới 192,8% token model
Tác giả chạy chín thử nghiệm trên SDK Strands Agents mã nguồn mở trong cùng một tiến trình, đặt một Graph, một công cụ Workflow thương mại và một Swarm lên cùng một tác vụ, dùng Bedrock làm model. Chỉ văn bản được truyền giữa các orchestrator, và anh phải tự viết các adapter. Lỗi bên trong Swarm lồng nhau không hiện ra ở kết quả bên ngoài: một lượt chạy cho thấy workflow thành công 100,0% trong khi một tác vụ ghi lỗi ra đĩa. Hai lượt chạy trộn dùng nhiều hơn 74,5% và 192,8% token model so với baseline Graph thuần, với thời gian thực tới 3,02 lần. Benchmark này khảo sát một ranh giới, không phải lưu lượng sản xuất.
Nguồn: [dev.to](https://dev.to/aws-builders/orchestrating-agents-three-orchestrators-one-process-4agc)
Tương tác: 3 lượt cảm xúc · 1 bình luận · 23 phút đọc

### SWE-sweep buộc coding agent tự tìm bug mà không có báo cáo lỗi
Các nhà nghiên cứu Meta, trong đó có hai người tạo SWE-bench, công bố SWE-sweep ngày 1 tháng 10 năm 2026: một benchmark trong đó agent nhận một repository thật và không có gợi ý nào về chỗ hỏng. Benchmark bao gồm 4.068 bug đã biết trên 100 repository và 22 ngôn ngữ, với bản sửa được xác minh bằng test ẩn. Model tốt nhất được thử chỉ sửa được 4,7 phần trăm, nên khâu tìm bug chứ không phải sửa bug mới là nút thắt. Repo GitHub có 246 sao, chưa có bản phát hành và chưa ghi giấy phép. Các nhóm xây dựng coding agent có thể chạy agent của mình trên đó để đo khâu tìm bug tách khỏi khâu sửa.
Nguồn: [dev.to](https://dev.to/alexr/swe-sweep-a-benchmark-that-makes-coding-agents-find-the-bugs-themselves-2k75)
Tương tác: 5 lượt cảm xúc · 0 bình luận · 2 phút đọc

### Đổi thương hiệu bằng agent hợp nhất PR lộ ra hai pipeline đã chết âm thầm
Tác giả để các agent AI hợp nhất 13 pull request trên năm repository trong một đêm để đổi màu hệ sinh thái ESLint của mình từ tím Tailwind sang cam cháy. Cả hai vấn đề chỉ lộ ra sau khi phát hành: một bản deploy tài liệu đã thất bại mọi lần trong hai tuần trong khi môi trường sản xuất vẫn phục vụ bản build giữa tháng Bảy, do `npx vercel` không ghim phiên bản nên trôi mất bốn major; và các workflow PR trong một repo riêng đã bị tắt trong đợt cắt giảm chi phí tháng Năm, khiến bốn PR được hợp nhất mà không có kiểm tra nào. Cách khắc phục là ghim CLI vào `vercel@54.20.1` và bật lại các workflow. Agent viết diff; còn nhận ra vấn đề là việc của tác giả.
Nguồn: [dev.to](https://dev.to/ofri-peretz/i-let-ai-agents-rebrand-my-entire-oss-ecosystem-in-one-night-two-pipelines-were-silently-dead-49i6)
Tương tác: 1 lượt cảm xúc · 0 bình luận · 4 phút đọc

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*