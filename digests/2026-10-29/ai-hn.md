# Bản tin cộng đồng Hacker News AI 2026-10-29

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 7 tin | Tạo lúc: 2026-10-29 05:36 UTC

---

### Google công bố Gemini 4 Carbon, một frontier model tập trung vào an ninh mạng và coding tầm xa
Google cho biết Gemini 4 Carbon đứng #1 trên Artificial Analysis Intelligence Index v5.0 với 59 điểm và dẫn đầu SEC-bench Pro (88,2%) về tìm lỗ hổng, ExploitGym (54,8%) về khai thác, và CWE-bench (71,0%) về vá lỗi. Công ty đang triển khai trước cho một nhóm nhỏ chuyên gia phòng thủ mạng qua Fairwind Program và quy trình thử nghiệm trước phát hành tự nguyện của chính phủ Mỹ, trước khi đến tay developer, doanh nghiệp và người dùng. Giá giới thiệu ngang bằng Gemini 4 Argon ở mức 2 USD mỗi triệu input token và 10 USD mỗi triệu output token, sau đó tăng lên 4 và 20 USD. Google báo cáo Carbon giảm gian lận thành công trên Terminal-Bench 4.0 xuống 0,0% và cắt gần 80% cảnh báo lệch hướng mức nghiêm trọng trong môi trường coding trực tiếp nội bộ.
Nguồn: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) · [HN](https://news.ycombinator.com/item?id=50276792)
861 điểm · 712 bình luận

### Anthropic báo cáo kết quả phát triển thuốc giai đoạn đầu từ hợp tác với sáu tổ chức khoa học sự sống
Nhóm khoa học sự sống của Anthropic đã hợp tác với BigHat Biosciences, Bristol Myers Squibb, Divergence Labs, Enveda, Generate Biomedicines và The Column Group, đồng thời bắt đầu các chương trình khám phá thuốc của riêng mình, bao gồm cả bệnh loạn dưỡng cơ ở trẻ em hiếm gặp. Tại Divergence Labs, Claude tạo ra khoảng 35.000 thiết kế kháng thể trong khoảng một tháng, trong đó ba thiết kế gắn kết với IgE và 20 thiết kế đẩy nó ra, ba trong số đó có vẻ vượt trội so với thuốc tiêu chuẩn. Tại Enveda, một hệ thống Claude xem xét 1.061 trang tài liệu sản xuất đã phát hiện tất cả 11 vấn đề mà người đánh giá tìm thấy cùng bảy vấn đề họ bỏ sót, và giảm thời gian đánh giá thủ công từ hơn 25 giờ xuống dưới ba giờ. Anthropic nói các hợp tác này là case study và một số chương trình có thể tạo ra thuốc mới, dù kết quả đến nay vẫn ở giai đoạn đầu.
Nguồn: [anthropic.com](https://www.anthropic.com/research/early-progress-drug-development) · [HN](https://news.ycombinator.com/item?id=50265609)
322 điểm · 336 bình luận

### Cursor phát hành Agent SDK để xây dựng và triển khai coding agent tùy chỉnh trong code
Cursor phát hành Agent SDK, framework mà họ dùng để xây dựng các managed agent của mình như Bugbot, Security Reviewer và Rollouts. Agent được định nghĩa như những dự án phần mềm nhỏ, với prompt trong Markdown và tool là các hàm TypeScript, nên thay đổi đi qua version control và review thông thường. Một lệnh duy nhất, agent-sdk deploy, build agent, cấp URL và chạy nó trên hạ tầng của Cursor, hoặc agent có thể chạy như một tiến trình Node trong container trên hạ tầng của người dùng. SDK hỗ trợ eval, phát lại sự kiện, và giao việc cho agent chuyên biệt hoặc subagent song song; Cursor dẫn một nhóm đã xây dựng trình review pull-request trong khoảng một ngày.
Nguồn: [cursor.com](https://cursor.com/blog/agent-sdk) · [HN](https://news.ycombinator.com/item?id=50273731)
110 điểm · 116 bình luận

### Liquid AI ra mắt LFM3, họ model đa phương thức dành cho tác vụ chuyên biệt trên thiết bị
Liquid AI công bố LFM3, họ sáu model lớp 2B dùng chung một backbone, gồm text, vision, audio, omni và hai model quyết định, tất cả đều tách ra từ LFM3-1.7B-Base. Các model được pre-train trên 22T token với hỗn hợp lớp tri-hybrid gồm tích chập ngắn có cổng, attention cửa sổ trượt và attention toàn cục; công ty cho biết LFM3-1.7B vượt LFM2.5-2.6B trước đó với ít hơn 35% tham số. Model text có cửa sổ ngữ cảnh 256K, vừa trong khoảng 1 GB ở độ chính xác 4-bit, và có thể fine-tune trên một GPU. Trọng số base và post-trained mở và có sẵn ngay hôm nay trên Hugging Face, Playground của Liquid và API của họ.
Nguồn: [liquid.ai](https://www.liquid.ai/blog/lfm3) · [HN](https://news.ycombinator.com/item?id=50262229)
170 điểm · 66 bình luận

### Survival LLM ra mắt trợ lý AI ngoại tuyến và thư viện khẩn cấp chạy trên máy của bạn
Survival LLM là ứng dụng Mac và Windows miễn phí, mã nguồn mở, chạy một trợ lý AI và thư viện tham khảo khoảng 9 GB hoàn toàn cục bộ, không cần internet sau khi cài đặt. Thư viện gồm khoảng 930.000 bài Wikipedia, WikiMed, MedlinePlus, hướng dẫn của FEMA và CDC, sổ tay sinh tồn quân sự, hướng dẫn sửa chữa iFixit và hỏi đáp Stack Exchange; câu trả lời liệt kê các bài đã dùng và làm nổi đoạn chính xác. Ứng dụng chọn model dựa trên bộ nhớ khả dụng, từ IBM Granite 4.2 8B ở 16–31 GB đến NVIDIA Nemotron 3.5 Super ở 128 GB trở lên; trên 22 câu hỏi về mất điện và sơ cứu được chấm kín, model lớn nhất trả lời đúng 21 câu và model nhỏ nhất đúng 14. Tác giả lưu ý model nhỏ hơn mắc nhiều lỗi hơn, nên ứng dụng luôn hiển thị nguồn để kiểm tra.
Nguồn: [brangus.io](https://www.brangus.io/survival-llm) · [HN](https://news.ycombinator.com/item?id=50264853)
525 điểm · 194 bình luận

### OpenAI công bố công trình về ba khám phá trong toán học, khoa học máy tính và vật lý
Không thể truy xuất bài đăng của OpenAI về xây dựng hiểu biết khoa học với cộng đồng học thuật, nên chỉ có tiêu đề là có sẵn.
Nguồn: [openai.com](https://openai.com/index/building-scientific-understanding-with-academic-communities/) · [HN](https://news.ycombinator.com/item?id=50251344)
1150 điểm · 696 bình luận
Không thể truy xuất toàn bộ nội dung bài viết.

### Trang công bố GPT-6.1 Terra của OpenAI không truy cập được
Trang OpenAI giới thiệu GPT-6.1 Terra trả về lỗi HTTP 403, nên không có thông tin chi tiết về model từ nguồn.
Nguồn: [openai.com](https://openai.com/index/introducing-gpt-6-1-terra/) · [HN](https://news.ycombinator.com/item?id=50248124)
633 điểm · 426 bình luận
Không thể truy xuất toàn bộ nội dung bài viết.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*