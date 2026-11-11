# Bản tin cộng đồng Hacker News AI 2026-11-11

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-11 05:58 UTC

---

### Anthropic phát hành Claude Fable 5.2 và Mythos 5.2 với đầu ra nhanh hơn, rẻ hơn
Anthropic công bố hai model ngày 9/11/2026, cho biết chúng tạo đầu ra nhanh hơn tới 30% so với bản 5.1 và có giá 8 USD mỗi triệu token đầu vào, 40 USD mỗi triệu token đầu ra. Một chế độ nhanh tùy chọn đẩy tốc độ sinh token lên tối đa 2,5 lần với giá 16 USD đầu vào và 80 USD đầu ra. Công ty nói cùng một model nền được phát hành với các biện pháp bảo vệ an ninh mạng và sinh học mạnh mẽ dưới tên Fable, còn Mythos dành cho các nhà nghiên cứu an ninh mạng và y sinh đã được thẩm định. Anthropic cho biết đã chạy thử nghiệm an toàn trước phát hành quy mô lớn, gồm các đánh giá mới về thoát sandbox, và thấy rủi ro lệch hướng ở mức cao vẫn thấp.
Nguồn: [anthropic.com](https://www.anthropic.com/claude-fable-and-mythos-5-2) · [HN](https://news.ycombinator.com/item?id=50429068)
886 điểm · 1012 bình luận

### Amazon nói đã thay Sonnet 4.6 bằng Strands Decider khi gán nhãn ticket, tiết kiệm 98% chi phí
Hai kỹ sư Amazon viết rằng họ đã đổi Claude Sonnet 4.6 sang Strands Decider E4B, một model ra quyết định trả về xác suất cho từng lựa chọn thay vì sinh văn bản, trên một hệ thống ticket nội bộ có 20 nhóm nhãn. Trên tập kiểm thử, bản E4B vượt model Sonnet đang chạy production, và trong một lần chuyển đổi trực tiếp ba chiều, Amazon đo thời gian gọi trung bình giảm từ 4.215 ms xuống 897 ms và tổng token mỗi ticket từ 6.724 xuống 2.010. Amazon ghi chi phí mỗi triệu ticket khoảng 22.200 USD với Sonnet so với khoảng 500 USD với model ra quyết định. Nhóm tác giả nói cách làm này chỉ phù hợp với các lựa chọn đóng từ một danh mục đã biết, nơi ngữ cảnh hữu ích vừa trong vài nghìn token.
Nguồn: [strandsagents.com](https://strandsagents.com/blog/amazon-saves-millions-replacing-sonnet-with-strands-decider/) · [HN](https://news.ycombinator.com/item?id=50436640)
700 điểm · 246 bình luận

### Artificial Analysis cho Claude Fable 5.2 điểm 65 trên Intelligence Index
Artificial Analysis công bố một trang xếp Claude Fable 5.2 (Max) đứng đầu trong 74 model trên Intelligence Index v5.0.1 với điểm 65, so với mức trung vị 40. Cùng trang đó xếp model này gần cuối về tốc độ, ghi 233,95 giây để ra token trả lời đầu tiên và 45,2 phút mỗi tác vụ Intelligence Index, đồng thời mô tả nó rất dài dòng và đắt đỏ, với chi phí 26,54 USD mỗi tác vụ. Chỉ số này tổng hợp chín đánh giá, gồm AA-Briefcase v1.1, AutomationBench-AA, Terminal-Bench 4.0 và FrontierCode-AA 2.0. Điểm trên các chỉ số kiểu này thay đổi theo tập tác vụ và cấu hình.
Nguồn: [artificialanalysis.ai](https://artificialanalysis.ai/models/claude-fable-5-2) · [HN](https://news.ycombinator.com/item?id=50431144)
375 điểm · 269 bình luận

### Google đưa Gemini 4 Carbon ra mắt với giá bằng Argon
Google công bố Gemini 4 Carbon cho nhà phát triển, doanh nghiệp, nhà khoa học và người dùng ngày 10/11/2026, với mức giá giới thiệu bằng Gemini 4 Argon: 2 USD mỗi triệu token đầu vào và 10 USD mỗi triệu token đầu ra. Google nói Carbon dẫn đầu trên CursorBench 4.0, WANDR của Perplexity và AutomationBench của Zapier với chi phí mỗi tác vụ thấp hơn hơn 2 lần so với model bên ngoài tốt thứ hai, và giới thiệu trước tính năng /swarm trong Google Antigravity giúp phối hợp nhiều agent. Carbon cho an ninh mạng, truy cập qua Fairwind Program, là model an ninh mạng mạnh nhất của Google tới nay, công ty cho biết. Đây là kết quả benchmark do nhà cung cấp báo cáo.
Nguồn: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/) · [HN](https://news.ycombinator.com/item?id=50442303)
282 điểm · 154 bình luận

### Anthropic ra mắt Whiteboards và Sheets bản beta, đưa Dashboards thành Claude Data chính thức
Anthropic ra mắt Claude Whiteboards và Claude Sheets bản beta và đổi tên Claude Dashboards, trước đó cũng ở bản beta, thành Claude Data với trạng thái chính thức. Whiteboards là bảng chia sẻ để các nhóm cùng brainstorm với Claude; Sheets tạo bảng tính có tab, công thức và định dạng từ một prompt, và có thể xuất ra .xlsx hoặc CSV. Claude Data bổ sung truy vấn chỉ số đã chứng nhận, data story, chia sẻ trực tiếp cho người xem không có quyền truy cập connector, design system và caching. Cả ba đều nằm trong các gói trả phí; ở gói Enterprise, Whiteboards và Sheets tắt mặc định còn Claude Data bật ngày 19/11/2026.
Nguồn: [claude.com](https://claude.com/resources/articles/sheets-whiteboards-data) · [HN](https://news.ycombinator.com/item?id=50443716)
167 điểm · 137 bình luận

### Một kỹ sư lập luận code do AI tạo ra dẫn đến codebase dễ vỡ
Evan X. Merz, người bị Meta cho nghỉ việc hồi tháng 5, viết rằng những tháng cuối ở đó anh tạo ít nhất 90% code bằng AI nhưng vẫn tập trung vào chất lượng code, và hiện viết 100% code bằng AI tại một công ty công nghệ lớn khác. Anh liệt kê bốn kiểu thất bại mà anh nói mình quan sát được: test do AI viết hời hợt, bỏ sót độ phủ thực sự; code quá phức tạp; hiểu biết của con người về codebase giảm dần; và tốc độ review vượt xa chuẩn chất lượng. Anh đưa ra bốn triệu chứng, gồm số sự cố tăng và thời gian khắc phục dài hơn. Đây là quan sát của một kỹ sư, không phải phát hiện đã đo lường.
Nguồn: [evanxmerz.com](https://evanxmerz.com/post/ai-usage-generates-a-fragile-codebase/) · [HN](https://news.ycombinator.com/item?id=50438318)
459 điểm · 453 bình luận

### Goldman Sachs giới hạn Claude Code và GitHub cho kỹ sư, cắt quyền trader và banker
Goldman Sachs giới hạn Claude Code của Anthropic và GitHub của Microsoft cho khoảng 12.000 kỹ sư của mình theo hướng dẫn nội bộ cập nhật tháng 10, sau một đợt rà soát về năng suất và lo ngại rủi ro, Bloomberg đưa tin. Các trader từng dùng công cụ này để theo dõi dòng giao dịch của khách hàng và mô phỏng vị thế, và một số bất mãn với thay đổi; nhóm strats vẫn giữ quyền truy cập. Ngân hàng này trước đó đã cấm banker Hong Kong dùng Claude từ tháng 4, và là một trong các nhà bảo lãnh chính cho IPO của Anthropic. Một phát ngôn viên Goldman nói ngân hàng cung cấp một số công cụ AI nhất định để xác định các trường hợp sử dụng tốt nhất.
Nguồn: [thestateofai.com](https://www.thestateofai.com/news/goldman-sachs-claude-code-traders-bankers) · [HN](https://news.ycombinator.com/item?id=50415628)
899 điểm · 492 bình luận

### Anthropic được cho là nhắm định giá 1,4 nghìn tỷ USD trong IPO
Một video Bloomberg đăng lên Hacker News ngày 10/11/2026 đưa tin Anthropic nhắm định giá 1,4 nghìn tỷ USD trong IPO.
Không lấy được toàn bộ nội dung bài viết.
Nguồn: [bloomberg.com](https://www.bloomberg.com/news/videos/2026-11-10/anthropic-targets-1-4-trillion-valuation-in-ipo-video) · [HN](https://news.ycombinator.com/item?id=50445463)
16 điểm · 1 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*