# Bản tin cộng đồng Hacker News AI 2026-10-23

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-10-23 07:42 UTC

---

### Anthropic mở waitlist cho Claude Duet, agent chủ động chạy trên Opus 5.5
Anthropic công bố bản xem trước nghiên cứu của Claude Duet, một agent tóm tắt thông tin cho người dùng mỗi sáng, nhận việc và dừng lại chờ phê duyệt với các thao tác nhạy cảm. Công ty cho biết agent này chạy trên Opus 5.5, hoạt động với hơn 6.000 connector và tiếp cận người dùng qua iOS, Android và web trong cùng một luồng hội thoại. Truy cập hiện qua waitlist giới hạn cho gói Pro và Max tại Mỹ; gói Team và Enterprise chưa được bao gồm. Công ty nói agent có thể hiểu sai một luồng hội thoại hoặc đánh giá sai mức độ khẩn cấp, và các tác vụ chạy nền dùng chung hạn mức của gói. Không lấy được toàn bộ nội dung bài viết.
Nguồn: [claude.com](https://claude.com/product/claude-duet) · [HN](https://news.ycombinator.com/item?id=50186037)
550 điểm · 519 bình luận

### OpenAI ra mắt CLI chính thức cho REST API
OpenAI phát hành `openai`, công cụ dòng lệnh chính thức để gọi REST API từ terminal hoặc shell script. Lập trình viên có thể tạo ảnh, tải file lên và xuống, gửi batch và kiểm tra kết quả mà không cần viết ứng dụng, với `--format json` hoặc `jsonl` kèm `jq` để viết script. Cài đặt qua binary dựng sẵn, Homebrew hoặc Go 1.26 trở lên, và cần API key. Tài liệu phân biệt rõ với Codex CLI: dùng `openai` cho một lệnh gọi API cụ thể hoặc một script, dùng `codex` cho agent lập trình có thể sửa dự án. README cảnh báo rằng chi tiết lỗi và log `--debug` có thể chứa dữ liệu nhạy cảm.
Nguồn: [github.com](https://github.com/openai/openai-cli) · [HN](https://news.ycombinator.com/item?id=50191507)
234 điểm · 110 bình luận

### Mistral ra mắt voice agent Voxtral 3 với model giọng nói hỗ trợ hơn 50 ngôn ngữ
Mistral giới thiệu Voxtral 3, bộ model speech-to-text và text-to-speech cùng SDK voice agent kết hợp nghe, suy luận, gọi công cụ và nói trong một pipeline streaming thời gian thực. Công ty cho biết Voxtral Small Transcribe 3 đạt kết quả state-of-the-art về phiên âm đa ngôn ngữ, phân tách người nói và context biasing trên hơn 50 ngôn ngữ, còn Voxtral Mini TTS 3 hỗ trợ hơn 35 ngôn ngữ và hơn 50 phương ngữ, với tính năng Pro Voice adaptation từ 30 phút âm thanh. Voxtral dùng được qua API đặt tại EU của Mistral hoặc tự triển khai, điều mà công ty gắn với chủ quyền dữ liệu và quyền kiểm soát việc có lưu giữ âm thanh hay không. Theo công ty, model Mini transcribe chạy ở 4B tham số với giá 0,0035 USD/phút.
Nguồn: [mistral.ai](https://mistral.ai/news/voxtral-3/) · [HN](https://news.ycombinator.com/item?id=50168396)
768 điểm · 200 bình luận

### Omnara ra mắt như lựa chọn tự host thay cho các nền tảng agent dạng managed
Omnara công bố nền tảng agent managed mã nguồn mở, giấy phép Apache 2.0, để chạy agent trên mọi model và mọi máy với công cụ, secret, quyền và streaming tích hợp sẵn. REST API, SDK TypeScript và CLI của nó khởi chạy agent từ file cấu hình `agent.yaml`; event log Postgres lưu trạng thái từng agent để bất kỳ worker nào cũng có thể tiếp tục sau khi crash. Agent chạy trên các máy đã kết nối qua daemon `omnarad` kết nối ra ngoài, và tự host chạy bằng Docker Compose, dù cấu hình mặc định khi chạy local cố ý không bảo mật. Đăng nhập cloud cung cấp model provider và pool sandbox, còn instance tự host khởi đầu không có model hay máy nào cho đến khi người dùng tự thêm vào.
Nguồn: [github.com](https://github.com/omnara-ai/omnara) · [HN](https://news.ycombinator.com/item?id=50183892)
110 điểm · 34 bình luận

### Alter ra mắt quản lý truy cập đặc quyền cho agent AI nhiều người dùng
Alter (YC S25) ra mắt nền tảng đặt lưu trữ thông tin xác thực, kiểm tra policy, danh tính riêng cho từng agent, phê duyệt và audit log trên một đường đi duy nhất giữa agent và API bên ngoài. Thay vì dùng chung một key cấp quyền quá rộng cho nhiều agent, mỗi agent có danh tính và phạm vi riêng theo quy tắc mặc định từ chối, và các lệnh gọi nhạy cảm phải chờ người phê duyệt được chỉ định. Công ty cho biết một lệnh gọi SDK xử lý lưu trữ, làm mới, policy và audit cho 140 nhà cung cấp, với tích hợp sẵn cho LangChain, MCP và AWS. Alter nêu đang trong quá trình đạt SOC 2 và đã kiểm thử xâm nhập trong 12 tháng gần nhất, và nói thông tin xác thực chỉ nằm trong vault.
Nguồn: [alterauth.com](https://alterauth.com/) · [HN](https://news.ycombinator.com/item?id=50176908)
67 điểm · 44 bình luận

### Model của OpenAI sắp có trên Google Cloud
OpenAI thông báo các model của mình sắp có mặt trên Google Cloud, theo tiêu đề bài đăng. Bài đăng ghi ngày 21 tháng 10, 2026.
Nguồn: [openai.com](https://openai.com/index/openai-models-google-cloud/) · [HN](https://news.ycombinator.com/item?id=50180079)
323 điểm · 145 bình luận

### Ask HN: Nếu model giỏi đến vậy, sao không mở 100 công ty?
Một thảo luận trên Hacker News đặt câu hỏi vì sao OpenAI không đơn giản mở 100 công ty nếu model giỏi đến vậy. Bài đăng ghi ngày 22 tháng 10, 2026.
Nguồn: [news.ycombinator.com](https://news.ycombinator.com/item?id=50200997) · [HN](https://news.ycombinator.com/item?id=50200997)
92 điểm · 87 bình luận

### Cùng một yêu cầu AI phát thải CO2 ở Texas cao gấp 8,5 lần so với Thụy Điển
Thông cáo của Berget nêu rằng cùng một yêu cầu AI phát thải lượng CO2 ở Texas cao gấp 8,5 lần so với ở Thụy Điển. Bài đăng ghi ngày 23 tháng 10, 2026.
Nguồn: [berget.ai](https://berget.ai/en/blog/per-request-co2-press-release) · [HN](https://news.ycombinator.com/item?id=50205229)
54 điểm · 26 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*