# Bản tin cộng đồng Hacker News AI 2026-10-25

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-10-25 01:18 UTC

---

### Kimi K3.1 Pro ra mắt dưới dạng model mở trọng số lớp 3T với cửa sổ ngữ cảnh 1M token
Kimi phát hành K3.1 Pro, gọi đây là model mở trọng số lớp 3T mạnh nhất của mình, cùng với K3.1 Pro Highspeed — công ty cho biết chạy nhanh hơn 2–3× để tương tác mượt hơn. Cả hai đều có trên Kimi.ai, Kimi Work, Kimi Code và Kimi API; công ty nói trọng số đầy đủ sẽ phát hành trước ngày 4/11. Trên Terminal-Bench 4.0, K3.1 Pro đạt 65,7%, cao hơn GPT-6 Astra (58,2%) và thấp hơn Claude Opus 5.5 (66,4%). Với lập trình viên, bản phát hành này ghép cửa sổ ngữ cảnh dài với mức cải thiện được báo cáo ở tác vụ viết code và agent; các con số benchmark là do công ty tự công bố.
Nguồn: [kimi.ai](https://www.kimi.ai/blog/kimi-k3-1-pro) · [HN](https://news.ycombinator.com/item?id=50212065)
1057 điểm · 652 bình luận

### Claude chứng minh các tính chất bảo mật ở mức assembly trong 123 thư viện mã nguồn mở
Trong hợp tác với Theorem, Anthropic cho biết đã dùng Claude để xác minh hình thức các tính chất bảo mật ở mức assembly RISC-V trên 123 thư viện mã nguồn mở, chứng minh chương trình thoát bình thường mà không có lỗi an toàn bộ nhớ hay assertion thất bại với đầu vào dưới 64 MB. Công ty gọi đây là nỗ lực quy mô lớn đầu tiên áp dụng xác minh hình thức cho phần mềm sản xuất ở mức assembly. Claude cũng tìm ra các lỗi đã tồn tại qua nhiều năm kiểm thử. Các chứng minh giả định binary tĩnh đơn luồng trên CPU RISC-V bộ nhớ cố định, nên kết quả không bao quát mọi lỗi có thể. Một phần chứng minh cùng ngữ nghĩa RISC-V và OS đã được công bố để tái sử dụng.
Nguồn: [anthropic.com](https://www.anthropic.com/research/formal-verification) · [HN](https://news.ycombinator.com/item?id=50202217)
457 điểm · 304 bình luận

### Claude Duet là agent chủ động, làm việc nền và hỏi trước khi hành động
Anthropic ra mắt Claude Duet dưới dạng bản xem trước nghiên cứu, một agent chủ động chạy trên Opus 5.5, tóm tắt cho người dùng mỗi sáng, nhận tác vụ gửi qua tin nhắn và làm việc trên máy tính đám mây riêng dùng các ứng dụng đã kết nối. Nó xin phê duyệt trước các thao tác nhạy cảm như gửi tin nhắn hay thanh toán, và trong thời gian xem trước thì dùng chung hạn mức gói với phần còn lại của Claude. Có trên gói Pro và Max tại Mỹ qua danh sách chờ; gói Team và Enterprise không được cấp. Công ty lưu ý nó có thể đọc sai mạch hội thoại hoặc đánh giá sai mức độ khẩn cấp, và có thể bỏ sót thứ đến giữa các lần kiểm tra.
Nguồn: [claude.com](https://claude.com/product/claude-duet) · [HN](https://news.ycombinator.com/item?id=50186037)
565 điểm · 533 bình luận

### Voxtral 3 bổ sung SDK agent thoại và model giọng nói cho hơn 50 ngôn ngữ
Mistral phát hành Voxtral 3, họ model chuyển giọng nói thành văn bản và văn bản thành giọng nói, kèm SDK agent thoại kết hợp nghe, suy luận, gọi công cụ và nói trong một pipeline streaming thời gian thực. Voxtral Small Transcribe 3 xử lý phiên âm và phân tách người nói trên hơn 50 ngôn ngữ, hỗ trợ điều hướng ngữ cảnh bằng keyphrase; Voxtral Mini TTS 3 hỗ trợ hơn 35 ngôn ngữ và hơn 50 phương ngữ. SDK nhắm đến tổng đài chăm sóc khách hàng, trợ lý ảo và copilot rảnh tay. Có qua API đặt tại EU của Mistral hoặc tự triển khai, cho phép tổ chức kiểm soát nơi xử lý âm thanh và việc có lưu hội thoại hay không. Bản Mini transcribe có giá 0,0035 USD/phút.
Nguồn: [mistral.ai](https://mistral.ai/news/voxtral-3/) · [HN](https://news.ycombinator.com/item?id=50168396)
769 điểm · 201 bình luận

### Kinh tế trưởng của Apollo nói AI không mang lại lợi ích ngoài ngành công nghệ
Torsten Slok, kinh tế trưởng tại Apollo, viết rằng AI chưa mang lại lợi ích tài chính nào cho doanh nghiệp Mỹ ngoài ngành công nghệ: doanh thu trên mỗi lao động và biên lợi nhuận tăng với Mag 7 nhưng đi ngang với S&P 493, không có dấu hiệu AI thúc đẩy tăng trưởng năng suất. Ông nói các công ty đại chúng bắt đầu coi chi tiêu token là trung tâm chi phí thay vì nguồn tăng trưởng, và công ty được VC hậu thuẫn chi nhiều hơn cho token trong khi doanh nghiệp đại chúng thấy không cần model mới nhất. Lập luận là AI không nắm được phán đoán, trách nhiệm hay niềm tin — những thứ ông gắn với tăng trưởng doanh thu. Các con số là phân tích của ông trên dữ liệu được dẫn, không phải kết quả đã kiểm toán.
Nguồn: [apollo.com](https://www.apollo.com/wealth/insights-news/insights/daily-spark/no-signs-of-ai-payoff-outside-the-tech-sector) · [HN](https://news.ycombinator.com/item?id=50224463)
471 điểm · 464 bình luận

### Bài báo cho thấy văn bản do AI tạo dùng ngôn ngữ khó xử lý hơn văn viết của người
Một bài báo của Thomas Hikaru Clark, Matias B. Martin và Kyle Mahowald phân tích các đặc trưng tâm lý ngôn ngữ gắn với độ khó đọc trong một corpus văn bản do AI tạo thuộc nhiều lĩnh vực. So với văn viết của người, cả chín model biên và cận biên được nghiên cứu dùng nhiều chủ ngữ vô sinh với động từ hữu sinh hơn và nhiều n-gram tần suất thấp hơn, phần lớn dùng phụ thuộc dài hơn, danh từ xếp chồng và mệnh đề quan hệ rút gọn. Nhóm tác giả cho rằng ngôn ngữ người được tối ưu cho giao tiếp còn văn bản AI được tối ưu cho các mục tiêu như toán, code và suy luận, nơi mật độ thông tin quan trọng hơn. Họ cho thấy một model được fine-tune dưới hình phạt độ dài sẽ lệch khỏi ngôn ngữ giống người. Kết quả dựa trên corpus và không chứng minh model nào tốt hơn tổng thể.
Nguồn: [arxiv.org](https://arxiv.org/abs/2610.29162) · [HN](https://news.ycombinator.com/item?id=50223647)
151 điểm · 146 bình luận

### Chip LogSync của EPFL giải mã liên lạc giữa các vùng não dưới 200 microwatt
Nhóm nghiên cứu EPFL chế tạo LogSync, một system-on-chip cấy ghép 4x2 mm ghi hoạt động não, trích xuất biomarker cho độ mạnh dao động và đồng bộ giữa các vùng não, rồi dùng thuật toán học máy để phân loại trạng thái nhận thức và cảm xúc và kích hoạt kích thích. Công trình, đăng trên IEEE Journal of Solid-State Circuits, được tài trợ bởi khoản NIMH 6,6 triệu CHF cho hệ thống cấy ghép nhắm vào bệnh tâm thần nặng. Chip giữ công suất dưới 200 microwatt. Nó được đánh giá trên bản ghi não người có sẵn và trong thí nghiệm trên chuột tại Đại học Minnesota; ứng dụng tâm thần trên người chưa được chứng minh.
Nguồn: [actu.epfl.ch](https://actu.epfl.ch/news/neural-chip-decodes-interactions-between-brain-r-2/) · [HN](https://news.ycombinator.com/item?id=50222525)
89 điểm · 31 bình luận

### OpenAI đăng bài về bảo vệ môi trường huấn luyện model biên của mình
Bài có tiêu đề "Securing our frontier model training environment", đăng trên site OpenAI ngày 23/10/2026. Không có thêm chi tiết nào từ tài liệu thu thập được.
Nguồn: [openai.com](https://openai.com/index/securing-our-frontier-model-training-environment/) · [HN](https://news.ycombinator.com/item?id=50214416)
118 điểm · 119 bình luận

Không thu thập được toàn bộ nội dung bài viết.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*