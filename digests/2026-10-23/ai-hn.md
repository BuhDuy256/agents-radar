# Bản tin cộng đồng Hacker News AI 2026-10-23

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-10-23 07:53 UTC

---

### Anthropic ra mắt Claude Duet dưới dạng agent chủ động trên Opus 5.5

Anthropic đã mở danh sách chờ cho Claude Duet, bản xem trước nghiên cứu dành cho người đăng ký Pro và Max tại Mỹ. Duet chạy trên Opus 5.5 và hoạt động trên máy tính đám mây riêng, gửi bản tóm tắt buổi sáng, soạn các bước tiếp theo và tạm dừng để chờ phê duyệt trước những hành động nhạy cảm như gửi tin nhắn hay thanh toán. Nó hỗ trợ hơn 6.000 connector và plugin, đồng thời kế thừa bộ nhớ, skill và ứng dụng từ tài khoản Claude. Công ty cho biết Duet có thể đọc sai một luồng hội thoại, đánh giá sai mức độ khẩn cấp, hoặc bỏ sót thông tin đến giữa các lần kiểm tra. Gói Team và Enterprise không nằm trong phạm vi này.

Nguồn: [claude.com](https://claude.com/product/claude-duet) · [HN](https://news.ycombinator.com/item?id=50186037)
550 điểm · 519 bình luận

### Mistral phát hành SDK voice agent Voxtral 3 với model giọng nói hỗ trợ hơn 50 ngôn ngữ

Mistral công bố Voxtral 3, một họ model speech-to-text và text-to-speech cùng SDK voice agent kết hợp nghe, suy luận, gọi công cụ và nói trong một pipeline streaming thời gian thực. Voxtral Small Transcribe 3 xử lý phiên âm, phân tách người nói và context biasing cho hơn 50 ngôn ngữ; công ty cho biết model này vượt Whisper, Scribe v2 và Gemini 3.5 Transcribe về word error rate trung bình trên 45 ngôn ngữ FLEURS. Model phiên âm Mini có 4B tham số với giá 0,0035 USD mỗi phút. Voxtral Mini TTS 3 hỗ trợ hơn 35 ngôn ngữ và hơn 50 phương ngữ, còn Pro Voice adaptation tái tạo phong cách của người nói từ 30 phút âm thanh. Sản phẩm có sẵn qua API do Mistral vận hành tại EU hoặc tự triển khai.

Nguồn: [mistral.ai](https://mistral.ai/news/voxtral-3/) · [HN](https://news.ycombinator.com/item?id=50168396)
768 điểm · 200 bình luận

### OpenAI ra mắt CLI chính thức cho REST API

OpenAI phát hành `openai`, công cụ dòng lệnh để gọi OpenAI REST API từ terminal hoặc shell script. Công cụ này bao phủ tạo ảnh, tải lên và tải xuống tệp, gửi batch và lấy kết quả, speech, kiểm tra tokenizer, và kiểm thử webhook, với các định dạng đầu ra JSON, JSONL, raw và YAML cùng tính năng trích xuất trường bằng GJSON qua `--transform`. Repo phân biệt rõ với Codex CLI: dùng `openai` cho một lệnh gọi API cụ thể hoặc script, dùng `codex` cho coding agent làm việc trên một dự án. Công cụ cài từ binary dựng sẵn, Homebrew hoặc Go 1.26+, và tài liệu cảnh báo rằng khi pipe JSON hoặc YAML không đáng tin cậy nên đặt `OPENAI_UNTRUSTED_STDIN=1` để chặn việc đọc tệp cục bộ.

Nguồn: [github.com](https://github.com/openai/openai-cli) · [HN](https://news.ycombinator.com/item?id=50191507)
235 điểm · 110 bình luận

### Add-on Claude đưa khả năng chỉnh sửa vào Google Docs, Sheets và Slides

Anthropic phát hành Claude cho Google Workspace ở dạng public beta trên mọi gói trả phí, thêm sidebar đọc tệp đang mở, thấy vùng chọn hiện tại và chỉnh sửa trực tiếp. Trong Docs, nó đề xuất bản viết lại dưới dạng thẻ gợi ý; trong Sheets, nó viết công thức, dựng pivot table và biểu đồ gốc, có thể chạy một vùng dữ liệu qua Python rồi ghi kết quả trở lại; trong Slides, nó tạo slide từ chính layout của bộ slide và đánh dấu các phần tử bị chồng lấn hoặc tràn ra ngoài. Các connector mới cho Google Docs, Sheets và Slides cho phép Claude tạo và chỉnh sửa tệp từ chat, với quyền truy cập khớp theo thiết lập chia sẻ Google hiện có. Chế độ mặc định "Ask before edits" chờ phê duyệt từng thay đổi.

Nguồn: [claude.com](https://claude.com/resources/articles/claude-now-works-in-google-docs-sheets-and-slides) · [HN](https://news.ycombinator.com/item?id=50190357)
86 điểm · 13 bình luận

### Omnara cung cấp nền tảng agent được quản lý, tự host được

Omnara là nền tảng agent được quản lý, mã nguồn mở theo giấy phép Apache 2.0, định vị là lựa chọn tự host thay cho Claude Managed Agents và Agents API của OpenAI. Agent được khai báo trong file cấu hình YAML ghi rõ nhà cung cấp model, hướng dẫn và nguồn máy, rồi khởi chạy từ CLI, TypeScript SDK hoặc REST; sự kiện được stream về ngay khi xảy ra và phê duyệt được trả lời qua cùng API đó. Nền tảng hỗ trợ model từ OpenAI, Anthropic, OpenRouter, Amazon Bedrock, LiteLLM và Ollama, kèm công cụ, skill và MCP có sẵn. Event log của mỗi agent nằm trong Postgres nên bất kỳ worker nào cũng có thể tiếp tục sau khi crash hoặc khởi động lại, và daemon `omnarad` kết nối máy theo hướng outbound mà không cần mở cổng vào.

Nguồn: [github.com](https://github.com/omnara-ai/omnara) · [HN](https://news.ycombinator.com/item?id=50183892)
110 điểm · 34 bình luận

### Model của OpenAI sắp có mặt trên Google Cloud

Tiêu đề bài viết cho biết model của OpenAI sẽ được cung cấp qua Google Cloud. Không lấy được toàn bộ nội dung bài viết.

Nguồn: [openai.com](https://openai.com/index/openai-models-google-cloud/) · [HN](https://news.ycombinator.com/item?id=50180079)
323 điểm · 145 bình luận

### OpenAI mô tả việc dùng hàng nghìn AI agent trên dữ liệu sinh học

Tiêu đề bài viết cho biết OpenAI đã dùng hàng nghìn AI agent để tìm manh mối mới trong dữ liệu sinh học phức tạp. Không lấy được toàn bộ nội dung bài viết.

Nguồn: [openai.com](https://openai.com/index/scaling-ai-research-for-complex-biological-data/) · [HN](https://news.ycombinator.com/item?id=50180752)
157 điểm · 105 bình luận

### OpenAI trình bày quy trình công bố phối hợp các lỗ hổng nghiêm trọng

Tiêu đề bài viết cho biết OpenAI đã phối hợp phản ứng toàn cầu khi các agent phát hiện ra lỗ hổng. Không lấy được toàn bộ nội dung bài viết.

Nguồn: [openai.com](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/) · [HN](https://news.ycombinator.com/item?id=50181175)
265 điểm · 183 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*