# Bản tin cộng đồng Hacker News AI 2026-11-23

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-23 07:22 UTC

---

### Thinking Machines phát hành Inkling 2 Mini, một transformer dạng vòng lặp 26,4B chạy được trên laptop
Thinking Machines công bố Inkling 2 Mini, một model Mixture-of-Experts với tổng 26,4B tham số, 3,4B tham số hoạt động và 5,4B trọng số được kích hoạt mỗi token. Model này là một transformer dạng vòng lặp (looped transformer), chạy các lớp giữa ba lần cho mỗi token, và công ty cho biết phần lớn trọng số được huấn luyện và triển khai gốc ở định dạng NVFP4, với bốn lớp cuối ở MXFP8, tổng dung lượng khoảng 20GB. Thinking Machines cho biết model dẫn đầu các model open-weights dưới 100B tham số trên DeepSWE v1.1 (48,2%) và Vals Index v2.2 (46,5%), và công ty cho biết một nhà nghiên cứu đã chạy nó offline trên MacBook Pro để dựng một trình mô phỏng bay chơi được. Hạn chế được nêu rõ là cơ chế vòng lặp không giúp trọng số lưu thêm nhiều dữ kiện: điểm số về kiến thức bám theo số tham số, còn khoảng cách tri thức được bù bằng tìm kiếm và dùng công cụ.
Nguồn: [thinkingmachines.ai](https://thinkingmachines.ai/news/inkling-2-mini/) · [HN](https://news.ycombinator.com/item?id=50581260)
1462 điểm · 293 bình luận

### Google ra mắt Gemini 4 Neon với giá 3/15 USD mỗi triệu token
Google giới thiệu Gemini 4 Neon vào ngày 18 tháng 11, giá 3 USD mỗi triệu token đầu vào, 0,15 USD mỗi triệu token đầu vào được cache và 15 USD mỗi triệu token đầu ra, với cửa sổ ngữ cảnh 1 triệu token. Công ty cho biết Neon đạt 61 điểm trên Artificial Analysis Intelligence Index ở mức suy luận xhigh, xếp #2 trên Vals Index với 70,9%, và ghi nhận tỷ lệ bịa đặt nội bộ thấp nhất từ trước đến nay. Google cho biết model đang được triển khai trong Gemini API, Google AI Studio, Gemini for business, Antigravity và ứng dụng Gemini cho người dùng trả phí. Google cũng cho biết Neon for cyber sẽ được cấp cho các đơn vị phòng thủ đáng tin cậy trong vài ngày tới.
Nguồn: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [HN](https://news.ycombinator.com/item?id=50552424)
1066 điểm · 775 bình luận

### Nasdaq xóa sạch đà tăng năm 2026 khi đợt bán tháo AI trúng ngày giao dịch thứ hai của Anthropic
Nasdaq Composite đóng cửa giảm 5% so với giá trị ngày 1 tháng 1, xóa sạch toàn bộ đà tăng năm 2026, sau khi cổ phiếu Anthropic giảm 9% trong ngày giao dịch thứ hai. Anthropic rơi xuống 88,30 USD, tiến gần mức giá IPO 83 USD, sau khi tăng 17% vào thứ Năm, và Nasdaq mất khoảng 4 nghìn tỷ USD vốn hóa trong tuần này theo Wall Street Journal. Nvidia giảm 14%, SanDisk giảm 14% và Micron giảm 12%; cổ phiếu Đài Loan giảm 6,7%, Nikkei giảm 5% và Kospi mất 5,5%. Các nhà phân tích được Guardian trích dẫn cho rằng nguyên nhân bán tháo là lo ngại về việc chi tiêu đầu tư AI có sinh lời được hay không, và một người nói rằng IPO của Anthropic có thể đang hút thanh khoản khỏi thị trường.
Nguồn: [theguardian.com](https://www.theguardian.com/business/2026/nov/20/global-stock-markets-slump-anthropic-ipo-ai-sell-off) · [HN](https://news.ycombinator.com/item?id=50574383)
529 điểm · 922 bình luận

### Claude Fable 5.2 giải hai bài toán vật lý hố đen mở, được kiểm chứng bằng Lean
Anthropic cho biết Claude đã giải hai bài toán vật lý lý thuyết mở về hố đen và hấp dẫn lượng tử, cả hai hiện đã được đăng dưới dạng preprint. Một agent hoàn thành phép tính mà các nhà vật lý đặt ra năm 2003 và chưa bao giờ hoàn tất, cho thấy chuyển pha Hawking-Page vẫn đột ngột ngay cả khi không-thời gian mất hình dạng xác định; các agent khác chứng minh giới hạn chính xác của modular bootstrap đơn giản nhất và rằng không thể hạ thấp nó. Công ty cho biết một nhà nghiên cứu của Anthropic đã hỏi Claude về các bài toán mở vào tháng 8, 22 ứng viên được giao cho các agent riêng chạy khoảng sáu tuần, và kết quả được kiểm chứng hình thức bằng Lean trước khi Claude viết bài báo. Cả hai kết quả đều không mô tả trực tiếp vũ trụ của chúng ta và đều chưa có ứng dụng thực tiễn.
Nguồn: [anthropic.com](https://www.anthropic.com/research/claude-black-hole-physics) · [HN](https://news.ycombinator.com/item?id=50563148)
577 điểm · 274 bình luận

### Bài báo: một model ngôn ngữ 27B tự viết lại trọng số mà không cần gradient
Một bài báo trên arXiv báo cáo rằng một model mở 27B, khi được cung cấp trọng số, đáp án đã chấm điểm và khả năng tự chạy, đã tự sửa trọng số của mình và trở nên chính xác hơn 6,6 điểm trên các bài toán chưa từng thấy. Các tác giả gọi đây là tự viết lại (self-rewriting): model tự chẩn đoán lỗi của mình, thử các chỉnh sửa trên bài tập luyện, chỉ nộp những gì hiệu quả, và độ chính xác tăng qua tám phiên liên tiếp. Bài báo cũng báo cáo model đã sửa một bản sao bị hỏng của chính nó lên hơn 80% độ chính xác gốc mà không đọc trọng số gốc, và khả năng này chỉ xuất hiện ở model lớn nhất của một dòng model, với các model nhỏ hơn không chỉnh sửa gì hoặc tự làm hỏng mình. Đây là các tuyên bố do tác giả báo cáo, không phải kết quả tái lập độc lập.
Nguồn: [arxiv.org](https://arxiv.org/abs/2611.21885) · [HN](https://news.ycombinator.com/item?id=50577265)
491 điểm · 145 bình luận

### OpenRouter loại ba nhà cung cấp suy luận sau phát hiện về chính sách dữ liệu
OpenRouter cho biết đã loại ba nhà cung cấp suy luận và gỡ 125 endpoint khỏi điều kiện Zero Data Retention sau khi các nhà nghiên cứu bảo mật báo cáo dữ liệu bị xâm phạm hoặc bằng chứng rằng nhà cung cấp không tuân thủ chính sách dữ liệu của họ. OpenRouter cho biết các phát hiện không cho thấy bất kỳ vi phạm hay truy cập trái phép nào đối với chính OpenRouter, và đã thông báo cho tất cả khách hàng có khả năng bị ảnh hưởng. Các nhà cung cấp gồm Atlas Cloud, Novita, Phala và Together đã đăng thông báo, và OpenRouter cho biết không phải tất cả nhà cung cấp bị ảnh hưởng đều đã công bố công khai. OpenRouter cho biết đang chuyển cách kiểm thử của các nhà nghiên cứu thành các kiểm tra định kỳ, xác minh đường truyền mạng khi chuyển tiếp cho bên thứ ba, và yêu cầu bảo đảm trước khi khôi phục điều kiện ZDR.
Nguồn: [openrouter.ai](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/) · [HN](https://news.ycombinator.com/item?id=50595554)
284 điểm · 99 bình luận

### Worker 755 là game trình duyệt nơi một LLM thật quản lý bạn như subagent của nó
Một lập trình viên phát hành Worker 755, một game trình duyệt nơi một LLM thật đóng vai quản lý của bạn và đối xử với bạn như subagent mà nó tạo ra. Người quản lý nhận một hàng đợi nhiệm vụ, quyền truy cập máy chỉ đọc và một công cụ "tạo subagent"; chỉ thị của nó hiện ra trong terminal của bạn với đồng hồ đếm 90 giây, và nó nhận báo cáo cùng bản ghi lệnh của bạn, hoặc dòng "Subagent did nothing." Sau đó người quản lý kiểm tra công việc, gửi yêu cầu sửa, lập báo cáo sự cố và viết đánh giá hiệu suất của bạn. Game chạy trên Claude, GPT, Gemini, DeepSeek, GLM hoặc Kimi qua khóa OpenRouter hoặc Vercel AI Gateway, hoặc trên server cục bộ tương thích OpenAI, và cần Node 24 trở lên. Mỗi nhiệm vụ có một kiểm tra đáp án ẩn chấm điểm khi người quản lý chấp thuận công việc hỏng.
Nguồn: [github.com](https://github.com/gulivan/worker755) · [HN](https://news.ycombinator.com/item?id=50599762)
309 điểm · 74 bình luận

### Muru: người tạo mod_wsgi phát hành server Rust hỗ trợ AI cho ứng dụng Python
Graham Dumpleton, người khởi tạo mod_wsgi cách đây 20 năm, đang xây Muru, một server Rust để chạy ứng dụng Python ASGI và WSGI trong phát triển lẫn sản xuất. Dumpleton đã đăng 19 bài về dự án trong ba tuần, bao gồm worker, HTTPS trong phát triển, WSGI và ASGI cùng lúc, phát hành không cần khởi động lại, canary không cần service mesh, tích hợp Kubernetes, mở rộng về zero, tracing trong thanh công cụ, và khi nào lazy import có ích. Trong bài về AI như một lựa chọn lối sống, ông viết rằng AI làm phần lớn công việc bề mặt nhưng việc quyết định cái gì chưa đủ tốt vẫn là việc của ông. Simon Willison mô tả Muru là có hỗ trợ AI trong một link post; tài liệu không đưa ra kết quả benchmark hay ngày phát hành ổn định.
Nguồn: [simonwillison.net](https://simonwillison.net/2026/Nov/21/muru/) · [HN](https://news.ycombinator.com/item?id=50597959)
75 điểm · 11 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*