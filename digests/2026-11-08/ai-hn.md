# Bản tin cộng đồng Hacker News AI 2026-11-08

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-08 05:51 UTC

---

### Claude Code gửi địa chỉ email người dùng trong header yêu cầu web, theo cáo buộc trong GitHub issue

Một GitHub issue mở ngày 5/11/2026 trên repo anthropics/claude-code cáo buộc Claude Code tiết lộ địa chỉ email người dùng cho các website bên thứ ba tùy ý thông qua header yêu cầu User-Agent trong lúc tìm kiếm web, mà không có sự cho phép của người dùng. Người báo cáo, taylor-edwards, cho biết hậu quả là hàng chục email lừa đảo mỗi ngày và họ đang chuyển công ty sang Pi với OpenRouter. Một cộng tác viên của Anthropic trả lời trong thread rằng công ty đã thêm một mod tích hợp tên cc-plugin-privacy để chặn triệt để hành vi này từ v2.1.317 trở đi, bật mặc định và có thể tắt qua /plugins, đồng thời đề nghị người dùng báo cáo nếu phát hiện lỗ hổng trong các bước kiểm tra.

Nguồn: [github.com](https://github.com/anthropics/claude-code/issues/107757) · [HN](https://news.ycombinator.com/item?id=50385272)
1593 điểm · 519 bình luận

### Google ra mắt Gemini Omni 1.2 Flash với clip video 15 giây và giảm giá 30%

Google công bố Gemini Omni 1.2 Flash, có thể tạo clip gốc dài tối đa 15 giây, tăng từ 10 giây ở Omni 1.1, và cho phép chỉ định thời lượng theo từng giây từ 3 đến 15 giây. Công ty cho biết giá giảm 30% còn 0,07 USD mỗi giây cho video 720p, và model đã phổ dụng trên Gemini API và Google Cloud với Provisioned Throughput cùng watermark SynthID khó nhận biết trên đầu ra. Model bổ sung chỉnh sửa hội thoại nhiều lượt, cho phép sửa một chi tiết bằng prompt tiếp theo thay vì tạo lại clip, và Google lưu ý vẫn đang phát triển cho cảnh thể thao nhanh, thay đổi kịch bản đột ngột và vật lý phức tạp.

Nguồn: [blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/) · [HN](https://news.ycombinator.com/item?id=50392118)
361 điểm · 251 bình luận

### Nhóm AI Frontiers của Microsoft Research bị giải thể sau khi tái cơ cấu vào Microsoft AI

John Langford viết rằng nhóm AI Frontiers thuộc Microsoft Research, một nhóm khoảng 50 người thành lập năm 2023 để tổ chức các nỗ lực nghiên cứu mạch lạc, đã kết thúc sau khi bị tái cơ cấu vào Microsoft AI đầu tháng 9/2026. Langford cho biết ban lãnh đạo MAI xuất thân từ Inflection tập trung vào mở rộng quy mô và "dứt khoát không nghiên cứu", và mọi thành viên ban lãnh đạo sáng lập AIF khác đều đi đến kết luận tương tự. Ông dẫn các thử nghiệm của Bytedance gợi ý một biến thể của Full Bandwidth Transformer có thể ngang bằng model lớn gấp đôi, và nói rằng ông không thể đưa đổi mới vào sử dụng hay được xem xét nghiêm túc khi ở MAI. Ông cũng cho biết sẽ không có thực tập sinh với nhóm trong năm tới.

Nguồn: [hunch.net](https://hunch.net/?p=13764006) · [HN](https://news.ycombinator.com/item?id=50406563)
430 điểm · 255 bình luận

### Thử nghiệm của Hightouch cho thấy Jev kết hợp Opus đạt độ chính xác biên giới với chi phí thấp hơn bốn lần

Hightouch thử nghiệm liệu các model quyết định giá rẻ như Jev và GPT-6 Luna có thể chấm điểm phân giải danh tính tốt như các LLM biên giới hay không, dùng benchmark 1.000 danh tính xây bằng trình mô phỏng pseudopeople, một nửa là người độc thân với hồ sơ nhiễu và một nửa là các vụ gộp thừa. Claude Opus 5.5 đạt độ chính xác 99,0% với 3,86 USD mỗi 1.000 danh tính và 2,2 giây mỗi danh tính, trong khi một phương án kết hợp Jev với Opus đạt độ chính xác gần Opus với chi phí thấp hơn hơn 4 lần. Nhóm tác giả báo cáo độ tin cậy của Jev được hiệu chỉnh tốt hơn Luna, với hầu hết lỗi của Jev ở mức tin cậy thấp và hầu hết lỗi của Luna ở mức tin cậy cao, nhưng tài liệu lưu ý các model quyết định vẫn kém Opus khoảng 6 điểm phần trăm trên các benchmark khó hơn.

Nguồn: [hightouch.com](https://hightouch.com/blog/llm-judges-identity-resolution) · [HN](https://news.ycombinator.com/item?id=50397429)
573 điểm · 146 bình luận

### Rivet ra mắt điều phối Actor xây trên S3 với khởi động nguội p99 4,99 ms

Rivet (YC W23) ra mắt Rivet Actors, các tiến trình sống lâu với trạng thái trong bộ nhớ, cơ sở dữ liệu SQLite, WebSockets và lập lịch mà lập trình viên có thể tạo cho từng agent, người dùng, phiên hoặc tenant. Dự án tuyên bố 72 KB mỗi Actor, khởi động nguội p99 4,99 ms, và SQLite chạy trên S3 với ghi bền 1,07 ms và đọc 1,36 ms ở p99, rẻ hơn khoảng 10,4 lần so với lưu trữ SSD nhân bản. Mẫu được đề xuất là chạy vòng lặp agent bên ngoài sandbox—"tách phần đầu khỏi phần tay"—để trạng thái, bộ nhớ và ngữ cảnh nằm trong Actor và nó chỉ kết nối tới sandbox qua các công cụ khi cần chạy code, điều mà dự án cho là giới hạn phạm vi ảnh hưởng. Đánh đổi được nêu là các agent cần chạy code sinh ra vẫn phải có sandbox, hoặc agentOS hoặc một nhà cung cấp sẵn có.

Nguồn: [github.com](https://github.com/rivet-dev/rivet) · [HN](https://news.ycombinator.com/item?id=50381687)
120 điểm · 59 bình luận

### Bài viết mô tả các daemon không tài liệu của Apple đang xây dựng đồ thị tri thức cá nhân

Một bài viết trên Eighth Rank mô tả knowledgeconstructiond và intelligenceplatformd, cặp daemon có trên mọi máy Mac từ macOS 13 (2022) để xây dựng đồ thị tri thức trên thiết bị về người dùng và những người xung quanh họ. Theo tác giả, đồ thị được xây bằng cách đối chiếu Contacts, Calendar, Photos, Messages, Mail, vị trí, Screen Time và các tín hiệu hành vi khác, và được lưu dưới dạng kho có thể truy vấn mà các LLM truy xuất từ đó. Bài viết cho biết mô tả chính thức gần nhất là man page của knowledgeconstructiond, chỉ nói rằng nó phân tích nội dung thiết bị để giúp xây dựng đồ thị tri thức đa dụng. Tác giả cũng cung cấp một công cụ để bạn kiểm tra đồ thị của chính mình, và lưu ý hệ thống này phần lớn không được tài liệu hóa.

Nguồn: [8rank.ai](https://8rank.ai/game/apple-intelligence-personal-knowledge-graph) · [HN](https://news.ycombinator.com/item?id=50403097)
664 điểm · 371 bình luận

### Người mua IPO Anthropic được cho là thấy định giá thấp nhất 1,1 nghìn tỷ USD

Bloomberg đưa tin người mua IPO Anthropic thấy định giá thấp nhất 1,1 nghìn tỷ USD, sau một đợt bán tháo AI. Không lấy được toàn bộ nội dung bài viết.

Nguồn: [bloomberg.com](https://www.bloomberg.com/news/articles/2026-11-06/anthropic-ipo-valuation-expectations-pressured-after-ai-rout) · [HN](https://news.ycombinator.com/item?id=50394906)
312 điểm · 614 bình luận

### Cài đặt "Don't Ask Again" của Claude Code được cho là để lộ mật khẩu trong 1.122 tệp GitHub công khai

Một bài blog của Apiiro, theo tiêu đề, báo cáo rằng cài đặt "Don't Ask Again" của Claude Code để lộ mật khẩu trong 1.122 tệp GitHub công khai. Không lấy được toàn bộ nội dung bài viết.

Nguồn: [apiiro.com](https://apiiro.com/blog/coding-agents-leaking-secrets-github-dont-ask-again) · [HN](https://news.ycombinator.com/item?id=50407882)
294 điểm · 201 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*