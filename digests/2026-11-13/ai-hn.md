# Bản tin cộng đồng Hacker News AI 2026-11-13

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-13 06:26 UTC

---

### Anthropic mở roadshow IPO, nhắm niêm yết trên Nasdaq với mã "ANT"
Anthropic bắt đầu roadshow IPO vào ngày 10/11, giá cổ phiếu cuối cùng dự kiến chốt ngày 18/11 và giao dịch dự kiến bắt đầu ngày 19/11 trên Nasdaq với mã "ANT", theo trang chào bán của công ty. Trang này báo cáo doanh thu Q3'26 đạt 17,0 tỷ USD, được mô tả là tăng hơn 12 lần so với cùng kỳ năm trước, và hơn 11.900 khách hàng có doanh thu 12 tháng gần nhất từ 100K USD trở lên. Trang cũng báo lỗ ròng 23,3 tỷ USD, trong đó có khoản phí phi tiền mặt 21,9 tỷ USD liên quan đến thay đổi giá trị hợp lý của trái phiếu chuyển đổi, nợ phái sinh và SAFE. Công ty cho biết đợt chào bán là cổ phiếu phổ thông Class A và việc phân bổ không được đảm bảo.
Nguồn: [ipo.anthropic.com](https://ipo.anthropic.com/us/) · [HN](https://news.ycombinator.com/item?id=50465829)
888 điểm · 848 bình luận

### Anthropic ra mắt Claude Fable 5.2 và Mythos 5.2 với đầu ra nhanh hơn, rẻ hơn
Anthropic công bố Claude Fable 5.2 và Mythos 5.2 vào ngày 9/11, cho biết cả hai dùng chung một model nền: Fable có các biện pháp bảo vệ an ninh mạng và sinh học cho mục đích phổ thông, còn Mythos dành cho các tổ chức thông qua Life Sciences và Cyber Verification Programs. Công ty cho biết đầu ra tạo nhanh hơn tới 30% so với phiên bản 5.1 với giá 8 USD mỗi triệu token đầu vào và 40 USD mỗi triệu token đầu ra, kèm chế độ fast tùy chọn ở mức 16 USD và 80 USD. Các chỉ số hiệu năng được nêu theo từng benchmark: 49,1% trên FrontierCode 2.0 ở mức Xhigh effort, 69,9% trên FrontierSWE v2, và 89,6% trên CVE Rediscovery cho Mythos 5.2. Công ty khuyến nghị người dùng bắt đầu với Claude Opus 5.5 cho hầu hết tác vụ lập trình và tri thức, rồi nâng lên Fable hoặc Mythos khi cần.
Nguồn: [anthropic.com](https://www.anthropic.com/claude-fable-and-mythos-5-2) · [HN](https://news.ycombinator.com/item?id=50429068)
919 điểm · 1053 bình luận

### Google ra mắt Gemini 4 Hydrogen trên Gemini API, ứng dụng và Search
Google giới thiệu Gemini 4 Hydrogen vào ngày 12/11, một model mà công ty cho là được xây dựng để thực thi nhanh trong công việc lập trình hằng ngày và workflow agent, thay vì suy luận dài hạn, và đưa nó lên Google AI Studio, Gemini API, Gemini for business, ứng dụng Gemini, Google Search, cùng các gói trả phí AI Pro và Ultra trong Google Antigravity. Công ty cho biết Hydrogen đạt 51 điểm trên Artificial Analysis Intelligence Index ở mức suy luận high mặc định, cao hơn 50 điểm của Gemini 4 Argon, đạt 54 ở mức xhigh cao nhất, và có giá đồng nhất trên cửa sổ ngữ cảnh 1 triệu token ở mức 1,50 USD mỗi triệu token đầu vào và 7,50 USD mỗi triệu token đầu ra. Công ty báo cáo Hydrogen tăng hơn gấp ba điểm Terminal-Bench 4.1 so với Gemini 3.8 Flash (57% so với 18,2%) và giảm hơn 5 lần các tuyên bố bịa đặt; mọi số liệu đều do công ty tự công bố.
Nguồn: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/) · [HN](https://news.ycombinator.com/item?id=50471431)
505 điểm · 321 bình luận

### Google ghép Hydrogen với Carbon trong model router Orchestrator của Antigravity
Google Antigravity triển khai Gemini 4 Hydrogen cùng một tùy chọn mới trong menu model tên là Orchestrator, cho phép chuyển đổi giữa Gemini 4 Carbon và Hydrogen trong cùng một tác vụ thay vì đưa cả tác vụ cho một model ngay từ prompt đầu tiên. Blog mô tả cách làm này như sau: Carbon khám phá các phụ thuộc và lập kế hoạch, Hydrogen viết chỉnh sửa và chạy kiểm thử, rồi chuyển lại cho Carbon khi gặp trở ngại. Trên Terminal-Bench 4.1, công ty cho biết Orchestrator đạt tỷ lệ thành công gần bằng Carbon trong khi dùng ít hơn 24% quota và hoàn thành nhanh hơn trung bình 19%. Orchestrator đang được triển khai dưới dạng Orchestrator (Carbon) và Orchestrator (Argon) cho người đăng ký Google AI Ultra, và Orchestrator (Argon) cho người đăng ký trả phí Google AI Pro.
Nguồn: [antigravity.google](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/) · [HN](https://news.ycombinator.com/item?id=50472260)
374 điểm · 101 bình luận

### Gemini Decisions API của Google chấm điểm tới 1.000 câu hỏi trong một lần gọi
Google công bố Gemini Decisions API vào ngày 11/11, chạy trên model Gemini Decision 1 mới trả về xác suất và điểm tin cậy thay vì sinh văn bản trả lời từng token. Một yêu cầu duy nhất có thể mang một đầu vào đa phương thức gồm văn bản, hình ảnh, âm thanh, video và PDF tới 256K token, cộng thêm tối đa 1.000 câu hỏi độc lập thuộc ba loại: có/không, trắc nghiệm từ 2 đến 255 lựa chọn, và chấm điểm rubric có thứ tự. Công ty cho biết độ trễ là 150-250 ms từ đầu đến cuối và giá là 0,10 USD mỗi 1M token đầu vào, không tính phí token đầu ra, và bộ benchmark riêng của công ty cho thấy sai số hiệu chuẩn thấp nhất với chi phí thấp hơn gần 5 lần so với Gemini 3.5 Flash-Lite dùng Interactions API.
Nguồn: [blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/) · [HN](https://news.ycombinator.com/item?id=50456791)
556 điểm · 157 bình luận

### United Airlines cấm agent AI bên thứ ba đặt vé máy bay
United Airlines cho biết hôm thứ Tư rằng hãng đang hạn chế các agent và trợ lý AI cá nhân bên thứ ba không được phép đặt chỗ và xuất vé trên các nền tảng số của hãng cũng như gián tiếp qua các đại lý du lịch và aggregator. Hãng nêu lý do là rủi ro bảo mật khi chia sẻ thông tin đăng nhập tài khoản với trợ lý AI, khả năng mua nhầm hoặc thay đổi tài khoản ngoài ý muốn, và các quy định liên bang mà hãng cho là có thể bị vi phạm, chẳng hạn yêu cầu hành khách phải tự xác minh rằng hành lý không chứa chất cấm. Nhà phân tích hàng không Henry Harteveldt nói với CBS News rằng United có thể muốn tránh thêm một bên trung gian nữa và chi phí cho các lượt tìm chuyến bay bằng bot, và lưu ý Southwest thay vào đó đã cho người dùng ChatGPT xem được tồn kho vé.
Nguồn: [cbsnews.com](https://www.cbsnews.com/news/united-airlines-bans-ai-agents-booking-flights/) · [HN](https://news.ycombinator.com/item?id=50458900)
669 điểm · 693 bình luận

### Kỹ sư Amazon thay Sonnet 4.6 bằng Strands Decider để gắn nhãn ticket
Hai kỹ sư Amazon đã thay Claude Sonnet 4.6 bằng Strands Decider E4B để gắn nhãn ticket trong một hệ thống nội bộ với 20 loại danh mục, báo cáo kết quả ngang bằng hoặc tốt hơn với chi phí thấp hơn khoảng 98%. Họ chạy song song cả hai model trên lưu lượng thực trước khi chuyển, dùng cấu hình AWS AppConfig ba chế độ (BEDROCK, DUAL, DECIDER) để việc rollback chỉ là một thay đổi cấu hình. Họ đo được thời gian trung bình mỗi lần gọi là 897 ms so với 4.215 ms, và 2.010 token mỗi ticket so với 6.724; theo giá niêm yết ở us-east-1 mà họ dẫn ra, chi phí khoảng 0,0005 USD mỗi ticket so với 0,0222 USD. Họ lưu ý cách làm này phù hợp với các lựa chọn đóng từ một danh mục đã biết ở khối lượng lớn, và rằng việc đổi thứ tự các khóa JSON làm xác suất đầu ra lệch tới 0,19 trước khi họ sắp xếp các khóa.
Nguồn: [strandsagents.com](https://strandsagents.com/blog/amazon-saves-millions-replacing-sonnet-with-strands-decider/) · [HN](https://news.ycombinator.com/item?id=50436640)
727 điểm · 262 bình luận

### Edge0 open-source model 145B mà công ty nói chạy được trên laptop
Edge0 phát hành Edge0-145B và Edge0-120B dưới dạng model on-device mã nguồn mở, kèm framework suy luận và công cụ triển khai, tuyên bố Edge0-145B là model on-device mã nguồn mở đầu tiên ở mức 145 tỷ tham số. Công ty báo cáo bộ nhớ đỉnh 29GB, prefill hơn 1.100 token/s, decode hơn 80 token/s, và công suất tiêu thụ điển hình khoảng 120W trên một laptop tương thích, với ngữ cảnh 128K-256K. Thiết kế của nó chia sẻ các ma trận lớn theo nhóm 64 expert để chỉ khoảng 10 tỷ tham số tham gia mỗi bước suy luận, và nó luân chuyển dữ liệu qua bộ nhớ GPU, bộ nhớ hệ thống và SSD. Edge0 nêu điểm benchmark 64,6 trên DeepSWE 1.1, 90,4 trên GPQA-Diamond, và 80,6 trên IFBench; đây là so sánh của chính công ty với các model cloud cụ thể.
Nguồn: [edge0.ai](https://edge0.ai/blog/introducing-edge0-145b-frontier-ai-capabilities-on-your-own-computer) · [HN](https://news.ycombinator.com/item?id=50475713)
183 điểm · 44 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*