# Bản tin cộng đồng Hacker News AI 2026-11-10

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-10 07:06 UTC

---

### Anthropic ra mắt Claude Fable 5.2 và Mythos 5.2 cho các tác vụ kỹ thuật khó hơn
Anthropic công bố hai model này vào ngày 9 tháng 11, cho biết chúng dùng cùng một model nền nhưng có biện pháp bảo vệ khác nhau: Fable 5.2 mở cho mọi người dùng, còn Mythos 5.2 cần truy cập qua Life Sciences và Cyber Verification Programs của công ty. Anthropic cho biết hai model này tạo output nhanh hơn Fable 5.1 và Mythos 5.1 tới 30%, giá 8 USD mỗi triệu token input và 40 USD mỗi triệu token output, kèm chế độ nhanh tùy chọn giá 16 USD và 80 USD. Anthropic khuyến nghị bắt đầu với Claude Opus 5.5 cho hầu hết tác vụ lập trình và tri thức, rồi nâng lên Fable hoặc Mythos cho "những công việc kỹ thuật tham vọng nhất, mở".
Nguồn: [anthropic.com](https://www.anthropic.com/claude-fable-and-mythos-5-2) · [HN](https://news.ycombinator.com/item?id=50429068)
465 điểm · 741 bình luận

### Claude Fable 5.2 đứng đầu bảng Artificial Analysis với 65 điểm, nhưng chậm và đắt
Artificial Analysis cho Claude Fable 5.2 (Max) 65 điểm trên Intelligence Index, xếp thứ nhất trong 74 model, cao hơn nhiều so với mức trung vị 40. Cùng phân tích đó xếp nó gần cuối về tốc độ và chi phí: 46,4 phút cho mỗi tác vụ Intelligence Index so với trung vị 12,6 phút, 26,54 USD mỗi tác vụ, và 8 USD input / 40 USD output mỗi triệu token. Nó cũng tạo 275M token so với trung vị 72,8M, mức mà trang này gọi là rất dài dòng.
Nguồn: [artificialanalysis.ai](https://artificialanalysis.ai/models/claude-fable-5-2) · [HN](https://news.ycombinator.com/item?id=50431144)
335 điểm · 242 bình luận

### Google mở rộng TPU thế hệ thứ tám với 8tx và 8i Max
Google bổ sung TPU 8tx cho inference bảo mật, kín, và TPU 8i Max cho cửa sổ ngữ cảnh lớn, đây là hệ thống TPU mới thứ tư trong năm nay. TPU 8tx bảo vệ dữ liệu và trọng số model ngay cả khi đang dùng, dùng chung silicon với TPU 8t, và Google cho biết nó chạy với độ trễ thấp hơn TPU 8t tới 2 lần. TPU 8i Max ghép hai chip TPU 8i trong một package, nhân đôi compute, SRAM và băng thông HBM mà không cần rack lớn hơn; Google cho biết dòng này hiện phục vụ gần 100 khách hàng.
Nguồn: [blog.google](https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/) · [HN](https://news.ycombinator.com/item?id=50432831)
243 điểm · 73 bình luận

### Lợi suất trái phiếu CoreWeave vượt 16% khi lo ngại tín dụng AI lan rộng
Lợi suất trái phiếu CoreWeave đáo hạn năm 2032 vượt 16%, và hợp đồng hoán đổi rủi ro vỡ nợ (CDS) kỳ hạn 5 năm vọt lên trên 1.289 điểm cơ bản trước khi hạ về khoảng 1.155. Dữ liệu của Deutsche Bank mà CNBC dẫn cho thấy chi phí bảo hiểm vỡ nợ cũng tăng với Nvidia, Broadcom và Amazon, dù chênh lệch của họ vẫn thấp hơn nhiều. Goldman Sachs dự báo 440 tỷ USD phát hành nợ của các hyperscaler trong năm tới, cộng thêm 300 tỷ USD phát hành ở cấp dự án, và cho biết các lệnh tạm dừng xây data center có thể có dưới các thống đốc Dân chủ mới có thể ảnh hưởng tới 45% công suất dự kiến của Mỹ.
Nguồn: [cnbc.com](https://www.cnbc.com/2026/11/06/coreweave-bond-yield-tops-16percent-as-ai-credit-stress-rises.html) · [HN](https://news.ycombinator.com/item?id=50435660)
108 điểm · 48 bình luận

### Goldman Sachs giới hạn Claude Code và GitHub cho kỹ sư
Goldman Sachs cập nhật hướng dẫn nội bộ vào tháng 10 để hạn chế Claude Code của Anthropic và GitHub của Microsoft cho khoảng 12.000 kỹ sư của mình, cắt quyền truy cập của trader và banker từng dùng chúng để theo dõi dòng lệnh khách hàng và xây model thị trường, theo Bloomberg. Giám đốc thông tin của Goldman từng khen các công cụ AI do trader tự xây vào tháng 7, và ngân hàng này là một trong các underwriter chính cho IPO của Anthropic dự kiến trước cuối tháng 11. Hạn chế áp dụng cho các agent bên thứ ba biết viết và chạy code; trợ lý nội bộ của Goldman, dùng model từ nhiều công ty, vẫn có sẵn toàn công ty.
Nguồn: [thestateofai.com](https://www.thestateofai.com/news/goldman-sachs-claude-code-traders-bankers) · [HN](https://news.ycombinator.com/item?id=50415628)
888 điểm · 477 bình luận

### Anthropic mô tả "dreaming" như cách sắp xếp bộ nhớ của agent
Bài viết kỹ thuật của Anthropic chia bộ nhớ agent thành hai phần: ghi chú trong phiên làm việc và sắp xếp lại sau đó, quá trình họ gọi là dreaming, mượn ý từ cách não phát lại trải nghiệm gần đây. Trong một tác vụ database CL-Bench 1.0, Claude Opus 5 khép kín vòng lặp: nó lưu quy tắc kèm bằng chứng, câu trả lời trước đó và cảnh báo, còn Sonnet 4.6 chỉ đưa ra phỏng đoán chưa kiểm chứng. Trong Pokémon Red, Sonnet 3.7 viết 413 file bộ nhớ trong 225 thư mục và giành một huy hiệu; Fable 5 viết chín file trong hai thư mục và giành bốn huy hiệu.
Nguồn: [anthropic.com](https://www.anthropic.com/research/components-of-agent-memory) · [HN](https://news.ycombinator.com/item?id=50402212)
187 điểm · 103 bình luận

### ChatGPT Desktop chuyển tiếp SSH agent của bạn tới máy từ xa
Bài viết cho biết ChatGPT Desktop chuyển tiếp SSH agent của người dùng tới máy từ xa. Không lấy được toàn bộ nội dung bài viết.
Nguồn: [news.ycombinator.com](https://news.ycombinator.com/item?id=50422628) · [HN](https://news.ycombinator.com/item?id=50422628)
208 điểm · 73 bình luận

### "Don't Ask Again" của Claude Code liên quan tới mật khẩu trong 1.122 file GitHub công khai
Một báo cáo cho biết tùy chọn "Don't Ask Again" của Claude Code có liên quan tới mật khẩu bị lộ tìm thấy trong 1.122 file GitHub công khai. Không lấy được toàn bộ nội dung bài viết.
Nguồn: [apiiro.com](https://apiiro.com/blog/coding-agents-leaking-secrets-github-dont-ask-again) · [HN](https://news.ycombinator.com/item?id=50407882)
623 điểm · 422 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*