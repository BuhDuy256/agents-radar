# Bản tin cộng đồng Hacker News AI 2026-11-26

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-26 08:03 UTC

---

### OpenAI cho biết lỗi tính phí khi ra mắt khiến GPT-6.2 Astra và Sol chạm giới hạn sử dụng sớm hơn

OpenAI đã sửa một lỗi tính phí khiến mức dùng GPT-6.2 Astra và Sol được giảm giá cho hầu hết người dùng kể từ khi ra mắt. Công ty cho biết cùng khối lượng công việc giờ sẽ tiêu tốn nhiều hạn mức sử dụng của gói hơn, nên người dùng sẽ chạm giới hạn nhanh hơn 40% với Astra và 25% với Sol so với tuần trước. OpenAI nói rằng mức sử dụng trong quá khứ sẽ không bị tính phí và công ty đang tặng thêm một lần đặt lại (banked reset) cho mọi người dùng gói Go, Plus, Pro và Business. Các model khác không bị ảnh hưởng.

Nguồn: [twitter.com](https://twitter.com/thsottiaux/status/2125784147889393806) · [HN](https://news.ycombinator.com/item?id=50651117)
186 điểm · 91 bình luận

### Các model GPT-6 thiết kế protein và kháng thể cho thấy khả năng gắn kết trong thử nghiệm lab

OpenAI cho biết dòng GPT-6 của mình có thể thiết kế hình dạng protein mới và trình tự axit amin của chúng chỉ bằng suy luận và code, không cần gọi các model sinh học chuyên dụng. Trong thử nghiệm lab với đối tác Onava, các protein dựa trên thiết kế của GPT-6.2 cho thấy bằng chứng gắn kết trên năm mục tiêu, và các kháng thể được thiết kế lại vẫn giữ được khả năng gắn kết. Trong 322 minibinder được thử với 5 mục tiêu, 35 cái (10,9%) cho kết quả dương tính với gắn kết. Các model chuyên dụng vẫn cung cấp trình tự và giúp chọn ứng viên, và việc dự đoán cấu trúc protein hoàn chỉnh vẫn là điểm yếu rõ rệt.

Nguồn: [openai.com](https://openai.com/index/gpt-6-models-demonstrate-intrinsic-protein-design-capabilities/) · [HN](https://news.ycombinator.com/item?id=50634658)
354 điểm · 97 bình luận

### NYT yêu cầu nhiếp ảnh gia tự do tránh Photoshop 2027 vì metadata AI ẩn

The New York Times đề nghị các nhiếp ảnh gia cộng tác không dùng Adobe Photoshop 2027 (bản 28.0.0 trở lên) khi đi làm nhiệm vụ, vì các tính năng AI của nó "có thể không rõ ràng với người dùng" và có thể gắn thẻ ảnh là do AI tạo trong metadata. Bản cập nhật tháng 11 thêm chế độ "AI Assisted Editor", một trợ lý AI, chỉnh sửa bằng prompt, công cụ nâng cấp độ phân giải mới và công cụ tái bố cục canvas. Vì NYT giữ việc chỉnh sửa ảnh ở mức tối thiểu, những thẻ đó có nguy cơ làm mất lòng tin của độc giả. Một phát ngôn viên của NYT đã xác nhận yêu cầu này.

Nguồn: [theverge.com](https://www.theverge.com/ai-artificial-intelligence/1041227/the-new-york-times-warns-photographers-not-to-update-photoshop-over-ai-features) · [HN](https://news.ycombinator.com/item?id=50647673)
337 điểm · 288 bình luận

### Anthropic đóng cửa dưới giá IPO 83 USD vào ngày giao dịch thứ tư

Cổ phiếu Anthropic đóng cửa ở mức 81,91 USD vào thứ Ba, giảm 6,5% và thấp hơn hơn 1% so với giá IPO 83 USD, lần đầu tiên giao dịch dưới mức đó kể từ màn ra mắt lập kỷ lục tuần trước. Cổ phiếu có lúc rơi xuống 81,28 USD trong phiên trước giờ mở cửa. Bloomberg ước tính vốn hóa thị trường của Anthropic vào khoảng 1,5 nghìn tỷ USD tại thời điểm đóng cửa thứ Ba. Chỉ một phần của bài viết có thể truy xuất được.

Nguồn: [bloomberg.com](https://www.bloomberg.com/news/articles/2026-11-24/anthropic-breaks-below-83-ipo-price-in-premarket-trading) · [HN](https://news.ycombinator.com/item?id=50627836)
427 điểm · 795 bình luận

### Anthropic chuyển Messages API sang Rust, dùng lưu lượng production làm bộ kiểm chứng

Anthropic viết lại Messages API từ Python sang Rust và kiểm tra tính tương đương bằng cách chạy bản mới trên lưu lượng production, rồi điều các agent đi sửa những chỗ khác biệt. Chỉ chạy test là không đủ: bộ test được chuyển sang có hơn 100 assertion bị làm yếu, và chỉ 20 tùy chọn nhị phân đã tạo ra hơn một triệu cấu hình. Công ty cho biết API Rust dùng ít hơn khoảng 70% CPU mỗi request và giảm khoảng 20% thời gian trung vị đến token đầu tiên, triển khai mà không phải tắt dịch vụ hay đóng băng việc phát triển tính năng.

Nguồn: [anthropic.com](https://www.anthropic.com/research/migrating-api-to-rust) · [HN](https://news.ycombinator.com/item?id=50646357)
26 điểm · 9 bình luận

### Ask HN: Anthropic đang buộc tội công ty tôi chưng cất model. Làm sao chứng minh tôi không làm?

Một người dùng Hacker News hỏi làm cách nào để chứng minh công ty họ không chưng cất model của Anthropic sau khi Anthropic đưa ra cáo buộc đó. Bài đăng thu hút hàng trăm điểm và bình luận. Không thể truy xuất toàn bộ nội dung bài viết.

Nguồn: [news.ycombinator.com](https://news.ycombinator.com/item?id=50630809) · [HN](https://news.ycombinator.com/item?id=50630809)
450 điểm · 345 bình luận

### GLM-5.4: Hướng tới lập trình tổng quát với loop transformer đầu tiên của chúng tôi

Z.ai đăng một bài blog có tiêu đề "Toward Generalized Coding with Our First Loop Transformer" mô tả GLM-5.4. Bài đăng thu hút hơn một nghìn điểm trên Hacker News. Không thể truy xuất toàn bộ nội dung bài viết.

Nguồn: [z.ai](https://z.ai/blog/glm-5.4) · [HN](https://news.ycombinator.com/item?id=50609685)
1179 điểm · 386 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*