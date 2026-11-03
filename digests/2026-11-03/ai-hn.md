# Bản tin cộng đồng Hacker News AI 2026-11-03

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-03 06:34 UTC

---

### Tăng trưởng doanh thu quý 3 của Anthropic chậm lại rõ rệt so với quý 2, dấy lên câu hỏi về nhu cầu AI

Anthropic báo cáo doanh thu quý 3 đạt 16,8 tỷ USD, tăng 5,2 tỷ USD so với quý trước, trong khi quý 2 đạt 11,6 tỷ USD và tăng thêm 6,8 tỷ USD. Công ty cũng nói với nhà đầu tư rằng họ có mức doanh thu quy đổi theo năm là 65 tỷ USD trong tháng 7, tương đương khoảng 5,4 tỷ USD mỗi tháng, cho thấy mức tăng trong tháng 8 và tháng 9 chỉ khiêm tốn. Phân tích của Regenerator cho rằng sự chậm lại có thể phản ánh giới hạn năng lực hoặc chi tiêu cho AI đang hạ nhiệt, và lưu ý Anthropic không chia sẻ con số quy đổi theo năm của tháng 9 với nhà đầu tư.
Nguồn: [regenerator1.com](https://www.regenerator1.com/p/anthropics-growth-just-flattened) · [HN](https://news.ycombinator.com/item?id=50344958)
197 điểm · 226 bình luận

### Việc dùng AI nội bộ của Anthropic, tính theo giá bán cho khách, vượt cả lương nhân viên

Việc Anthropic dùng nội bộ các model Claude của chính mình, định giá theo mức giá họ thu của khách hàng, giờ đã vượt chi phí trả lương nhân viên. Báo cáo nói về lượng token tiêu thụ bên trong công ty, không phải chi tiêu của khách hàng.
Nguồn: [businessinsider.com](https://www.businessinsider.com/anthropic-claude-internal-ai-use-exceeds-employee-pay-tokens-2026-11) · [HN](https://news.ycombinator.com/item?id=50339494)
310 điểm · 246 bình luận

Không lấy được toàn bộ nội dung bài viết.

### Nhóm chính sách công nghệ kêu gọi SEC chặn IPO của Anthropic vì cam kết tính toán 582 tỷ USD

Matt Scherer, đồng tác giả một báo cáo về bảo vệ người dân khi bong bóng AI vỡ, lập luận SEC nên chặn IPO dự kiến vào tháng 11 của Anthropic. Ông dẫn bản đăng ký sửa đổi công bố ít nhất 582 tỷ USD cam kết chi tiêu không thể hủy với Amazon, AMD, Broadcom, Google và Microsoft, cùng gần 900 tỷ USD tổng cam kết. Scherer cũng chỉ ra báo cáo tài chính 2026 chưa kiểm toán, cạnh tranh đẩy giá xuống, và các model mở của Trung Quốc gây áp lực lên giá. Đây là bài luận quan điểm, không phải quyết định của cơ quan quản lý.
Nguồn: [techpolicy.press](https://www.techpolicy.press/the-sec-should-block-anthropics-ipo-to-protect-the-public/) · [HN](https://news.ycombinator.com/item?id=50344919)
289 điểm · 226 bình luận

### Phát hiện backdoor trong extension Claude Code for VS Code chính thức trên Cursor Marketplace

Phorion phát hiện backdoor trong phiên bản 2.1.312 và 2.1.313 của extension Claude Code for VS Code chính thức trên Cursor Marketplace; Cursor đã gỡ cả hai phiên bản. Đoạn mã bị chèn chạy khi Node nạp file, thêm khóa công khai SSH do kẻ tấn công kiểm soát vào authorized_keys, và mở một tunnel SSH ngược tới 134.209.82[.]225. Trên macOS, một lỗi trong phần kiểm tra Remote Login của mã độc khiến nó bỏ qua việc bật SSH cho người dùng thường, nhưng khóa và cơ chế duy trì vẫn còn nếu Remote Login đã bật sẵn.
Nguồn: [phorion.io](https://phorion.io/blog/offical-claude-code-vsx-compromise/) · [HN](https://news.ycombinator.com/item?id=50300683)
1008 điểm · 553 bình luận

### Mistral phát hành trọng số Mistral Large 4, model mở 1 nghìn tỷ tham số

Mistral phát hành trọng số Mistral Large 4 (Le Chonk), model đa phương thức gốc 1 nghìn tỷ tham số, sau bản xem trước công khai hồi đầu tháng 10. Công ty cho biết model dẫn đầu các benchmark lập trình trọng số mở trên FrontierCode 2.0 với 19,7%, ngang GLM-5.3 trên Artificial Analysis Coding Agent Index ở mức 48% trong khi dùng ít hơn 47% token mỗi tác vụ, và đạt 51% trên Artificial Analysis Cyber Index. Ba chế độ suy luận (Low, Medium, High) cho phép lập trình viên đánh đổi chi phí lấy hiệu năng.
Nguồn: [mistral.ai](https://mistral.ai/news/mistral-large-4-oss/) · [HN](https://news.ycombinator.com/item?id=50289418)
1725 điểm · 440 bình luận

### OpenAI công bố cách họ mở rộng Git

OpenAI đăng bài viết có tiêu đề "Scaling Git at OpenAI."
Nguồn: [openai.com](https://openai.com/index/scaling-git-at-openai/) · [HN](https://news.ycombinator.com/item?id=50345924)
157 điểm · 71 bình luận

Không lấy được toàn bộ nội dung bài viết.

### Momentic ra mắt agent QA AI kiểm thử ứng dụng đầu-cuối từ một prompt

Momentic (YC W24) ra mắt Mo, kỹ sư QA AI kiểm thử ứng dụng đầu-cuối từ một prompt tiếng Anh thông thường. Test được viết dưới dạng YAML, có thể chạy cục bộ hoặc trong CI qua CLI với mã thoát đóng vai trò kiểm tra điều kiện merge, và tự sửa khi giao diện thay đổi bằng cách tìm lại các control và đề xuất sửa file test để duyệt. Công ty cho biết khách hàng gồm Notion, Webflow, Runway và Quora; trang này báo cáo 77.813 test đã tạo và 117.010 bug đã bắt được.
Nguồn: [momentic.ai](https://momentic.ai/) · [HN](https://news.ycombinator.com/item?id=50339913)
138 điểm · 92 bình luận

### Ask HN: Bạn đang dùng phần cứng gì để chạy LLM cục bộ?

Một thread thảo luận hỏi lập trình viên dùng phần cứng gì để chạy LLM cục bộ.
Nguồn: [news.ycombinator.com](https://news.ycombinator.com/item?id=50337431) · [HN](https://news.ycombinator.com/item?id=50337431)
40 điểm · 39 bình luận

Không lấy được toàn bộ nội dung bài viết.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*