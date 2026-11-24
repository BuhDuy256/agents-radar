# Bản tin cộng đồng Hacker News AI 2026-11-24

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-24 09:43 UTC

---

### OpenAI và Cisco ra mắt Shirudo, runtime eBPF mã nguồn mở để bảo vệ Linux chưa vá

OpenAI và Cisco công bố Shirudo, một runtime mã nguồn mở bảo vệ hệ thống Linux đang chạy trong lúc chuẩn bị bản vá. Trong một thử nghiệm có kiểm soát, lá chắn do Codex tạo đã chặn một nỗ lực khai thác Java4Shell nhắm vào dịch vụ Elasticsearch đang chạy mà không cần khởi động lại, công ty cho biết. Các lá chắn được ký bằng mật mã, kiểm tra bởi trình xác minh eBPF của Linux và ghi lại qua Trusted Platform Module. Dự án dùng giấy phép BSD 2-Clause, với các chương trình BPF đồng giấy phép BSD và GPL; tài liệu không đưa ra số liệu hiệu năng nào ngoài thử nghiệm duy nhất đó.

Nguồn: [openai.com](https://openai.com/index/introducing-shirudo/) · [HN](https://news.ycombinator.com/item?id=50619630)
69 điểm · 20 bình luận

### OpenAI đề xuất perplexity làm chỉ số an toàn chung giữa các lab

Nhà khoa học trưởng của OpenAI, Jakub Pachocki, công bố các số liệu perplexity tiền huấn luyện nội bộ bắt đầu từ GPT-3.5 và lập luận dùng perplexity làm chuẩn an toàn chung giữa các lab. Bài viết theo dõi log-perplexity từ khoảng 0.99 ở GPT-3.5 xuống dưới 0.8, mức mà công ty cho biết các năng lực về an ninh mạng và toán học xuất hiện, và dự đoán tiến bộ tiếp theo trong khoảng 0.68-0.7. Pachocki đề xuất các giới hạn chung mà nhà phát triển không vượt qua cho đến khi đạt các mốc giám sát, đồng thời liệt kê thách thức: bộ dữ liệu đánh giá khác nhau, tách rời khỏi tác vụ có thể hành động, và lợi ích từ chain-of-thought không làm giảm perplexity.

Nguồn: [openai.com](https://openai.com/index/perplexity-and-intelligence/) · [HN](https://news.ycombinator.com/item?id=50601525)
705 điểm · 446 bình luận

### Claude Ship đưa pull request qua bước review, sửa lỗi và phê duyệt

Anthropic công bố Claude Ship ở bản beta, kết hợp Code Review với hai agent mới: PR Steward, xử lý các kiểm tra CI thất bại, xung đột merge và phản hồi review, và Claude Approvals, áp dụng tệp chính sách phê duyệt do nhóm viết từ kho lưu trữ. Nhà phát triển có thể chạy /ship trong Claude Code để push, mở, review và sửa một PR; quản trị viên bật nó theo từng kho lưu trữ và có thể chọn mức review Quick, Standard hoặc Deep cùng giới hạn chi tiêu. Công ty cho biết số PR được merge trong nhóm Claude Code tăng hơn gấp đôi từ tháng 6 đến tháng 9, trong khi tỷ lệ bị revert giảm hơn 40%. Tính năng này không khả dụng cho các tổ chức dùng Zero Data Retention, cấu hình HIPAA hoặc khóa mã hóa do khách hàng quản lý. Các tổ chức Enterprise đủ điều kiện có thể nhận ít nhất 10.000 USD tín dụng trước ngày 15 tháng 1 năm 2027.

Nguồn: [claude.com](https://claude.com/resources/articles/introducing-claude-ship) · [HN](https://news.ycombinator.com/item?id=50618513)
55 điểm · 16 bình luận

### Thử nghiệm đọc màn hình cho thấy cây trợ năng giúp model yếu, không giúp model mạnh

Greptile thử ba cách trên 172 tác vụ OSWorld, mỗi tác vụ một lần thử với giới hạn 50 bước: chỉ ảnh chụp màn hình, ảnh chụp màn hình kèm cây trợ năng với click theo tọa độ, và click theo ID phần tử. Cây trợ năng nâng GPT-5.2 từ 15,8% lên 36,2% và GPT-4.1 từ 5,4% lên 20,6%, trong khi ba model mạnh nhất không cho thấy thay đổi có ý nghĩa thống kê; GPT-6.1 Sol đạt 83,8% chỉ với ảnh chụp màn hình và 82,7% khi có cây trợ năng. Click theo ID phần tử tránh được lỗi pixel và giúp model yếu tốt hơn nữa. Kết quả chỉ gồm một benchmark và một lần thử mỗi tác vụ, nên không đủ để kết luận một model tốt hơn tổng thể.

Nguồn: [greptile.com](https://www.greptile.com/blog/trex-computer-use) · [HN](https://news.ycombinator.com/item?id=50615520)
51 điểm · 23 bình luận

### Hướng dẫn cho người mới thiết lập AI cục bộ trên Windows với Unsloth và Qwen

Tác giả thử tự chạy một model cục bộ trên Windows, dùng Unsloth Desktop để phục vụ một model AI lượng tử hóa vừa với VRAM của GPU, đặt kích thước ngữ cảnh và bật truy cập LAN để cả nhà dùng chung. Trên RTX 5090 với 32GB VRAM, tác giả chọn Qwen3.8-27B ở lượng tử hóa 4-bit với ngữ cảnh 128K. Hướng dẫn cũng lưu ý Inkling 2 Mini, model mixture-of-experts 26,4 tỷ tham số ra mắt ngày 17 tháng 11 năm 2026, vừa với card 24GB ở tệp 4-bit khuyến nghị. Lượng tử hóa đánh đổi độ chính xác để vừa bộ nhớ và chạy nhanh hơn, và tác giả nói mức đánh đổi này khác nhau tùy tác vụ.

Nguồn: [gpupartner.com](https://www.gpupartner.com/blog/beginners-guide-local-ai-inkling-qwen-unsloth) · [HN](https://news.ycombinator.com/item?id=50603845)
758 điểm · 306 bình luận

### OpenRouter cho biết tuần trước người dùng chi nhiều hơn cho model của Google so với OpenAI

OpenRouter đăng rằng tuần trước người dùng của họ chi nhiều tiền hơn cho các model của Google so với OpenAI, đẩy Google vượt mốc 50%. Bài viết quy sự thay đổi này cho nhiều đợt ra mắt được đón nhận tốt, gồm Gemini 4 Neon và Carbon. Chỉ một phần bài viết truy cập được.

Nguồn: [twitter.com](https://twitter.com/openrouter/status/2124925631012209137) · [HN](https://news.ycombinator.com/item?id=50623834)
12 điểm · 2 bình luận

### GLM-5.4 ra mắt là loop transformer đầu tiên của Z.ai cho lập trình

Z.ai công bố GLM-5.4, mô tả đây là loop transformer đầu tiên của mình và định vị nó như một bước tiến tới lập trình tổng quát. Thông báo thu hút 1.121 điểm và 366 bình luận trên Hacker News. Không truy cập được toàn bộ nội dung bài viết.

Nguồn: [z.ai](https://z.ai/blog/glm-5.4) · [HN](https://news.ycombinator.com/item?id=50609685)
1121 điểm · 366 bình luận

### Declare là ngôn ngữ UI được thiết kế để cả người và AI kiểm chứng

David Temkin phát hành Declare, một ngôn ngữ chuyên biệt cho giao diện người dùng, nơi bố cục, chuyển động, trạng thái và vẽ là một phần của ngôn ngữ thay vì thư viện. Chương trình được trình biên dịch kiểm tra, và thông báo chẩn đoán nêu rõ quy tắc bị vi phạm cùng cách viết lại hợp lệ. Trong một so sánh được đo lường, cùng một agent xây dựng ứng dụng mua vé hai lần: bản Declare dài 1.279 dòng so với 2.666 dòng của React, và bản chạy được đầu tiên của nó vượt qua cả mười một kiểm tra ẩn trong khi React vượt qua sáu. Tác giả nói đây là một lần chạy, không phải benchmark, với mọi lần chạy đều có trong kho lưu trữ.

Nguồn: [davidtemkin.github.io](https://davidtemkin.github.io/declarelang/) · [HN](https://news.ycombinator.com/item?id=50622854)
52 điểm · 41 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*