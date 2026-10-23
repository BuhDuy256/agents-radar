# Bản tin AI từ cộng đồng công nghệ 2026-10-23

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-10-23 06:10 UTC

---

### Nền tảng agent của Anthropic: 30.000 agent chạy đồng thời, tỷ lệ chặn 0,002%, và chuyện gì đã xảy ra ở AL4
- Vấn đề: Anthropic kiểm soát hàng chục nghìn agent Claude hoạt động đồng thời như thế nào — và các phép đo tự động hóa của họ thực sự cho thấy điều gì.
- Ý tưởng / cách tiếp cận: Theo các phép đo đã công bố của Anthropic, tính đến tháng 8 năm 2026, khoảng 30.000 agent đang làm công việc nghiên cứu và kỹ thuật đồng thời trên nền tảng nội bộ được dùng nhiều nhất của họ, với 26% công việc R&D mô hình được đo ở mức AL4 trên thang sáu cấp của Epoch AI (không có hạng mục đo nào đạt AL5). Mọi hành động đều đi qua một bộ giám sát trước khi thực thi, chặn khoảng một trong 47.000 quyết định (≈0,002%) trên hơn một tỷ quyết định, trong khi một pipeline sau thực thi gắn cờ ~100.000 bản ghi mỗi tuần và chuyển ~50 trường hợp ưu tiên cao mỗi tuần cho con người. Các agent cũng có danh tính bền vững cùng nhật ký tin nhắn được chia sẻ, ghi rõ nguồn gốc và liên kết với bản ghi, nên một khẳng định có thể được truy vết về phép đo gốc; bài viết lưu ý rằng chỉ riêng tỷ lệ chặn thấp không đủ để xác định mức độ bỏ sót của các bộ giám sát.
- Dùng khi: Bạn đang thiết kế danh tính, liên kết tin nhắn, hoặc giám sát trước/sau hành động cho một hệ thống đa agent và muốn có các con số tham chiếu từ một triển khai đã được báo cáo.
Nguồn: [dev.to](https://dev.to/bargan/anthropic-runs-30000-agents-at-once-what-keeps-them-under-control-4aa8)
Tương tác: 12 cảm xúc · 2 bình luận · 9 phút đọc

### ART: một agent từng tìm ra mảng DNA giống CRISPR, và mười lần chạy lại đều không tìm thấy nữa
- Vấn đề: Vì sao phát hiện của một agent nghiên cứu tự trị không thể tái lập bằng cách lặp lại đúng chiến dịch đó.
- Ý tưởng / cách tiếp cận: Theo Anthropic, ~950 phiên agent đã xử lý 215,6 triệu token trong 21,5 giờ để quét hơn 200.000 reverse transcriptase; một agent Claude Mythos 5 đã phát hiện một mảng trình tự lặp nối tiếp và viết "I can see by eye a tandem repeat array", dẫn đến hệ thống được đặt tên ART (đơn vị repeat-and-spacer ~200 nt, repeat bảo tồn 15–49 nt, spacer 120–220 nt) trong thể thực khuẩn. Mười chiến dịch chạy lại với cùng harness và đề bài đều không tái phát hiện mảng này, và trong một điều kiện dựa trên tệp, Opus 5 ở mức đầu vào 4 chỉ nhận ra mẫu 32% số lần so với hơn 90% khi trình tự được đặt trực tiếp vào ngữ cảnh — giới hạn nằm ở quỹ đạo điều tra, không phải ở khả năng nhận diện. Bằng chứng trong phòng thí nghiệm chỉ ủng hộ biểu hiện RNA; chức năng và bất kỳ khả năng chỉnh sửa nào vẫn chưa được chứng minh, và một bài báo trên Journal of Virology năm 2021 đã mô tả reverse transcriptase MarsHill cùng một vùng không mã hóa phía thượng nguồn mà không đặc trưng hóa mảng này.
- Dùng khi: Bạn đang đánh giá liệu phát hiện của một agent có tái lập được không, hoặc đang trang bị cho agent khả năng đọc đủ ngữ cảnh liên tục trước khi kết luận.
Nguồn: [dev.to](https://dev.to/bargan/claude-found-a-crispr-like-pattern-in-dna-ten-reruns-couldnt-find-it-again-1pkj)
Tương tác: 11 cảm xúc · 2 bình luận · 9 phút đọc

### Một chính sách retry phát lại toàn bộ ngữ cảnh có thể tốn gấp 4 lần — hãy định tuyến tác vụ thay vì thế
- Vấn đề: Các vòng lặp retry âm thầm nhân chi phí LLM lên đúng ở những tác vụ đắt đỏ và đang thất bại, vì dashboard chỉ hiển thị chi phí trung bình trên mỗi yêu cầu thành công.
- Ý tưởng / cách tiếp cận: Ví dụ của tác giả: một tác vụ ngữ cảnh 50k token với `retries: 3` vẫn thất bại thì phải trả cho 4 lần thử ≈ 204k token, một khoản thuế gấp 4 lần tập trung vào các đầu vào ngữ cảnh dài, chuỗi công cụ nặng, và nó không hiện ra dưới dạng "4×" trên dashboard. Giải pháp được đề xuất là một chính sách nhận biết chi phí không phát lại: khi thất bại, chuyển tác vụ sang mô hình tương đương tiếp theo mang cùng ngữ cảnh bàn giao, với bản phác dùng vòng lặp `model_registry.ordered_for(task.capability)` và `model.call(task.handoff_context)` thay vì `model.call(task.full_context)`.
- Dùng khi: Bạn sắp tung ra `retries: 3` trên một model client và chưa tính ngân sách cho lượng token phát lại.
Nguồn: [dev.to](https://dev.to/tokenlat/your-retry-loop-is-your-most-expensive-feature-59dk)
Tương tác: 8 cảm xúc · 16 bình luận · 3 phút đọc

### Vì sao temperature 0 không mang tính tất định: bất biến theo batch và thứ tự rút gọn
- Vấn đề: Cùng một prompt ở temperature 0 và seed cố định lại trả về các câu trả lời khác nhau trên các server LLM cục bộ.
- Ý tưởng / cách tiếp cận: Temperature và seed chỉ chọn token từ logits đã tính; chúng không kiểm soát logits, và thứ tự cộng số dấu phẩy động làm thay đổi các bit cuối. Trong thử nghiệm của tác giả (gsm8k, 100 bài, llama.cpp server build b11643, Qwen2.5-7B-Instruct Q8_0, `-np 8`), yêu cầu từng cái một so với tám yêu cầu đồng thời tạo ra văn bản khác nhau ở 41 bài và đẩy strict-match từ 0,83 xuống 0,82; các nguyên nhân được liệt kê là batching/đồng thời (thiếu bất biến theo batch), prompt caching và kích thước chunk, speculative decoding, và lượng tử hóa KV cache/phiên bản GPU/driver, với `"cache_prompt": false` được đưa ra cho từng yêu cầu. Tác giả trích dẫn việc Thinking Machines tạo ra 80 completion khác nhau từ 1.000 prompt temperature-0 và nghiên cứu của Yuan và cộng sự về mức biến thiên độ chính xác lên tới 9% do số lượng GPU, loại GPU, hoặc kích thước batch.
- Dùng khi: Bạn đang so sánh hai mô hình hoặc hai bản lượng tử hóa — tác giả khuyên nên so sánh từng mục đầu ra với nhau, vì các lần lật đúng/sai cho ra 25 sai và 28 đúng trong một lần chạy 600 bài.
Nguồn: [dev.to](https://dev.to/moca_fd0227eb23c29ea2d065/why-your-local-llm-gives-different-answers-at-temperature-0-32jn)
Tương tác: 1 cảm xúc · 1 bình luận · 8 phút đọc

### Bốn giai đoạn của Pólya được áp dụng thành 15 kỹ năng agent với một khoảng dừng bắt buộc trước khi viết code
- Vấn đề: Các agent lập trình bắt đầu phát ra phần triển khai ngay lập tức, viết lại mô hình miền và làm hỏng các test không liên quan trước khi hỏi bất kỳ câu hỏi làm rõ nào.
- Ý tưởng / cách tiếp cận: Tác giả ánh xạ các giai đoạn trong *How to Solve It* năm 1945 của George Pólya (hiểu vấn đề, lập kế hoạch, thực hiện kế hoạch, nhìn lại) cùng Clean Architecture của Robert C. Martin lên một bộ kỹ năng agent mô-đun mã nguồn mở gồm 15 kỹ năng trong vòng đời 6 pha, bao gồm `/to-ask-help`, `/to-map`, `/to-explore`, `/to-prd`, `/to-spec`, `/to-grill-me`, `/to-clarify`, và `/to-plan`, được chặn cổng bởi một bước căn chỉnh với con người mà bài viết gọi là Mandatory Pause Rule. Tác giả lý giải nguyên nhân gốc là chứng cận thị tự hồi quy và trích dẫn *Mathematical Problem Solving* (1985) của Alan H. Schoenfeld về kiểm soát giám sát siêu nhận thức.
- Dùng khi: Agent của bạn tạo ra các diff lớn làm hỏng code hiện có và bạn muốn chèn bước khám phá có cấu trúc trước khi triển khai.
Nguồn: [dev.to](https://dev.to/gulajavaministudio/why-an-80-year-old-math-book-fixed-my-ai-coding-agent-517b)
Tương tác: 10 cảm xúc · 0 bình luận · 12 phút đọc

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*