# Bản tin cộng đồng Hacker News AI 2026-10-24

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-10-24 01:01 UTC

---

### DeepSeek mở nguồn DeepInfer, framework suy luận production cho V4.1-Flash

DeepSeek phát hành DeepInfer trên GitHub, framework mà hãng cho biết đang chạy các dịch vụ production quy mô lớn, hỗ trợ suy luận offline cho DeepSeek-V4.1-Flash. Framework gồm kernel tối ưu, Attention DP với CP cân bằng, MoE EP cùng EPLB, lập lịch bất đồng bộ, suy luận bất biến theo batch, lấy mẫu tất định và structured output ràng buộc theo regex, JSON schema hoặc grammar EBNF. Nó chạy trên GPU NVIDIA SM100 và NPU Huawei Ascend 950 theo giấy phép Apache 2.0. Một dịch vụ hoàn chỉnh vẫn cần hệ thống KV cache, tách prefill/decode và cân bằng tải giữa các replica data-parallel — những phần này chưa có.

Nguồn: [github.com](https://github.com/deepseek-ai/DeepInfer) · [HN](https://news.ycombinator.com/item?id=50163277)
2341 điểm · 891 bình luận

### Kimi K3.1 Pro ra mắt với tư cách model open-weight lớp 3T, context 1M token

Moonshot AI giới thiệu Kimi K3.1 Pro, gọi đây là model open-weight lớp 3T mạnh nhất của hãng tính đến nay, với cửa sổ context 1 triệu token, kèm biến thể Highspeed mà hãng nói nhanh gấp 2-3 lần. Model đạt 65.7% trên Terminal-Bench 4.0, theo hãng là vượt GPT-6 Astra (58.2%) và chỉ kém Claude Opus 5.5 (66.4%). Hãng cho biết tỷ lệ hallucination trong bài stress-test nội bộ giảm từ 23.4% xuống 8.3%, và hãng đã loại dữ liệu liên quan đến cyber khỏi mid-training và RL cho bản open-weight. Trọng số đầy đủ của model sẽ có trước ngày 4/11.

Nguồn: [kimi.ai](https://www.kimi.ai/blog/kimi-k3-1-pro) · [HN](https://news.ycombinator.com/item?id=50212065)
701 điểm · 442 bình luận

### Mistral ra mắt Voxtral 3 với SDK voice agent và model giọng nói cho hơn 50 ngôn ngữ

Mistral công bố Voxtral 3, họ model speech-to-text và text-to-speech cùng SDK voice agent kết hợp nghe, suy luận, gọi công cụ và nói trong một pipeline streaming thời gian thực. Hãng cho biết Voxtral Small Transcribe 3 đạt mức state-of-the-art về phiên âm đa ngôn ngữ và diarization, vượt Whisper, Scribe v2 và Gemini 3.5 Transcribe, còn bản Mini 4B phiên âm với giá 0.0035 USD/phút. Voxtral Mini TTS 3 hỗ trợ hơn 35 ngôn ngữ và hơn 50 phương ngữ. Model dùng được qua API đặt tại EU của Mistral hoặc tự triển khai.

Nguồn: [mistral.ai](https://mistral.ai/news/voxtral-3/) · [HN](https://news.ycombinator.com/item?id=50168396)
768 điểm · 201 bình luận

### Anthropic giới thiệu trước Claude Duet, agent chủ động làm việc khi bạn vắng mặt

Anthropic mở danh sách chờ cho Claude Duet, bản research preview trên gói Pro và Max tại Mỹ, chạy bằng Opus 5.5. Hãng cho biết nó tóm tắt cho bạn mỗi sáng, nhận các task lớn nhỏ, làm việc trong máy cloud riêng bằng các app bạn kết nối, và chờ bạn phê duyệt trước những thao tác nhạy cảm như gửi tin nhắn hay thanh toán. Nó hoạt động với hơn 6.000 connector và plugin. Hãng nói nó có thể đọc sai một thread, đánh giá sai việc gì gấp, hoặc bỏ sót thứ đến giữa các lần kiểm tra. Gói Team và Enterprise chưa được hỗ trợ.

Nguồn: [claude.com](https://claude.com/product/claude-duet) · [HN](https://news.ycombinator.com/item?id=50186037)
561 điểm · 528 bình luận

### OpenAI phát hành công cụ dòng lệnh chính thức cho REST API

OpenAI ra mắt OpenAI CLI, công cụ dòng lệnh chính thức để gọi OpenAI REST API từ terminal hoặc shell script mà không cần viết ứng dụng. Nó tạo và lưu ảnh, upload và download file, gửi batch và chờ kết quả, và xuất output dạng JSON, JSONL, raw hoặc YAML để parse bằng công cụ như jq. Cài đặt qua binary dựng sẵn, Homebrew, hoặc Go 1.26+. Tài liệu phân biệt rõ với Codex CLI: dùng `openai` cho một lệnh gọi API cụ thể hoặc một script, và `codex` cho agent lập trình đang làm việc trên một dự án.

Nguồn: [github.com](https://github.com/openai/openai-cli) · [HN](https://news.ycombinator.com/item?id=50191507)
242 điểm · 111 bình luận

### Omnara ra mắt bản thay thế Apache 2.0 cho Claude Managed Agents

Omnara phát hành nền tảng managed agent mã nguồn mở, được hãng mô tả là bản thay thế tự host cho Claude Managed Agents và Agents API của OpenAI, theo giấy phép Apache 2.0. Agent được định nghĩa trong config YAML ghi rõ nhà cung cấp model và một máy, rồi khởi chạy qua CLI hoặc TypeScript SDK; API xử lý khởi chạy, input, streaming sự kiện và phê duyệt, với mọi bước của agent được lưu trong Postgres để bất kỳ worker nào cũng có thể tiếp tục agent sau khi restart. Máy chạy một daemon kết nối ra ngoài, nên không cần mở cổng vào. Tự host cần Docker Compose, và cấu hình mặc định khi chạy local cố ý không bảo mật.

Nguồn: [github.com](https://github.com/omnara-ai/omnara) · [HN](https://news.ycombinator.com/item?id=50183892)
111 điểm · 34 bình luận

### Add-on Claude đưa trợ lý vào Google Docs, Sheets và Slides

Anthropic đưa Claude for Google Workspace vào public beta trên mọi gói Claude trả phí, thêm sidebar đọc tài liệu, bảng tính hoặc slide đang mở, thấy phần bạn chọn và chỉnh sửa trực tiếp. Trong Docs, nó đề xuất chỉnh sửa dưới dạng suggestion card; trong Sheets, nó viết công thức, pivot table và biểu đồ gốc; trong Slides, nó tạo slide theo layout và theme của deck bạn. Chế độ mặc định hỏi trước mỗi lần sửa, kèm tùy chọn "Accept all edits". Connector cũng cho phép Claude tạo và sửa file Google từ chat, theo đúng quyền chia sẻ Google hiện có của bạn.

Nguồn: [claude.com](https://claude.com/resources/articles/claude-now-works-in-google-docs-sheets-and-slides) · [HN](https://news.ycombinator.com/item?id=50190357)
89 điểm · 15 bình luận

### OpenAI nói đang bảo mật môi trường huấn luyện model frontier

Bài viết có tiêu đề "Securing our frontier model training environment" và xuất hiện trên openai.com; thảo luận trên Hacker News đạt 70 điểm và 80 bình luận. Chưa có thông tin chi tiết nào khác. Không lấy được toàn bộ nội dung bài viết.

Nguồn: [openai.com](https://openai.com/index/securing-our-frontier-model-training-environment/) · [HN](https://news.ycombinator.com/item?id=50214416)
70 điểm · 80 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*