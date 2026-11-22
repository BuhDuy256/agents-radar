# Bản tin cộng đồng Hacker News AI 2026-11-22

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-22 06:33 UTC

---

### Thinking Machines ra mắt Inkling 2 Mini, một model dạng vòng lặp chạy được trên laptop

Thinking Machines công bố Inkling 2 Mini, một model Mixture-of-Experts 26,4 tỷ tham số với 3,4 tỷ tham số hoạt động, chạy lại các lớp giữa ba lần cho mỗi token. Công ty cho biết model dẫn đầu mọi model open-weights dưới 100 tỷ tham số tổng trên DeepSWE v1.1 (48,2%) và đạt mức bộ nhớ khoảng 20GB, đủ để chạy trên laptop phổ thông. Một biến thể vòng lặp thay đổi được, chỉ dùng cho nghiên cứu, cho thấy chân trời thời gian không-CoT tăng từ 16 giây ở một lượt lên 37 giây ở ba lượt, với chain of thought vẫn dễ đọc và không có điểm cao hơn trên các bài kiểm tra phá hoại agent. Công ty cũng cho biết vòng lặp không thêm dữ kiện được lưu: các benchmark nặng về kiến thức không cải thiện khi tăng số lượt, và model bù khoảng trống đó bằng tìm kiếm và công cụ.
Nguồn: [thinkingmachines.ai](https://thinkingmachines.ai/news/inkling-2-mini/) · [HN](https://news.ycombinator.com/item?id=50581260)
1400 điểm · 286 bình luận

### Google ra mắt Gemini 4 Neon với giá 3/15 USD mỗi triệu token

Google công bố Gemini 4 Neon, một model frontier với cửa sổ ngữ cảnh 1 triệu token, giá 3 USD mỗi triệu token đầu vào và 15 USD mỗi triệu token đầu ra. Công ty cho biết Neon xếp hạng #3 chung cuộc trên Artificial Analysis Intelligence Index ở mức suy luận xhigh, #2 trên Vals Index (70,9%) và #1 trên Artificial Analysis Coding Agent Index (58,6). Model ra mắt hôm nay trên Gemini API, AI Studio, Google Antigravity và ứng dụng Gemini cho người đăng ký trả phí. Google báo cáo chi phí mỗi tác vụ thấp hơn 32% so với Carbon ở mức suy luận high mặc định, và cho biết Neon ghi nhận tỷ lệ bịa đặt thấp nhất từ trước đến nay trong các thử nghiệm nội bộ trên Antigravity.
Nguồn: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/) · [HN](https://news.ycombinator.com/item?id=50552424)
1059 điểm · 775 bình luận

### Nasdaq xóa sạch mọi mức tăng của năm 2026 khi IPO của Anthropic không giữ được đà

Chỉ số Nasdaq Composite đóng cửa giảm 5% so với giá trị ngày 1 tháng 1, xóa sạch mọi mức tăng của năm 2026, khi ngày giao dịch thứ hai của Anthropic kéo nhóm cổ phiếu liên quan AI đi xuống. Cổ phiếu Anthropic giảm 9% còn 88,30 USD, gần mức giá IPO 83 USD, sau khi tăng 17% trong ngày đầu. Nvidia giảm 14%, SanDisk 14% và Micron 12% trong ngày thứ Sáu; cổ phiếu Đài Loan giảm 6,7% và Nikkei của Nhật giảm 5%. Các nhà phân tích cho rằng nhà đầu tư nghi ngờ liệu chi tiêu cho AI có sinh lời được không, và một người cho rằng lượng cổ phiếu Anthropic tung ra thị trường có thể đang hút thanh khoản khỏi các cổ phiếu công nghệ khác.
Nguồn: [theguardian.com](https://www.theguardian.com/business/2026/nov/20/global-stock-markets-slump-anthropic-ipo-ai-sell-off) · [HN](https://news.ycombinator.com/item?id=50574383)
509 điểm · 889 bình luận

### Bài báo khẳng định một model 27B tự viết lại trọng số mà không cần gradient

Một bài báo trên arXiv báo cáo rằng một model mở 27B đã tự sửa trọng số của mình chỉ bằng suy luận, không dùng gradient hay huấn luyện lại, cải thiện độ chính xác thêm 6,6 điểm trên các bài toán chưa từng thấy. Nhóm tác giả gọi phương pháp này là self-rewriting: model tự chẩn đoán lỗi của mình, thử các chỉnh sửa trên bài luyện tập và chỉ nộp những chỉnh sửa hiệu quả, với độ chính xác tăng qua tám phiên liên tiếp. Bài báo cũng báo cáo model đã sửa một bản sao bị hỏng của chính nó lên hơn 80% độ chính xác gốc trên các tác vụ hình ảnh chưa thấy mà không đọc trọng số gốc. Nhóm tác giả cho biết khả năng này xuất hiện theo quy mô: trong một họ model, các model nhỏ hơn không chỉnh sửa gì hoặc tự làm hỏng mình, và chỉ model lớn nhất mới cải thiện.
Nguồn: [arxiv.org](https://arxiv.org/abs/2611.21885) · [HN](https://news.ycombinator.com/item?id=50577265)
484 điểm · 142 bình luận

### Architect Labs nói AI đã thiết kế và kiểm chứng một kiến trúc CPU mới từ đầu đến cuối

Architect Labs giới thiệu Frostbite, một CPU đa dụng với tập lệnh mới xây quanh interaction nets, mà công ty nói rằng các hệ thống AI của mình đã khám phá, thiết kế và kiểm chứng mà không cần kiến thức kiến trúc có sẵn của con người. Interaction nets khiến mọi bước tính toán mang tính cục bộ và mọi giá trị chỉ có một chủ sở hữu, theo công ty, điều này loại bỏ nhu cầu về máy móc out-of-order và cache nhất quán lớn. Trên 25 workload, trong đó 15 được giữ kín đến lúc đánh giá cuối, công ty báo cáo hiệu năng trên mỗi watt cao gấp 4,59 lần so với một lõi CPU in-order dual-issue hiện đại. Công ty cho biết các hệ thống của mình đã lặp qua compiler, ISA, vi kiến trúc, RTL, kiểm chứng và GDS cuối cùng. Thiết kế này chưa được chế tạo thành chip thật.
Nguồn: [architectlabs.com](https://architectlabs.com/blog/frostbite) · [HN](https://news.ycombinator.com/item?id=50572503)
670 điểm · 357 bình luận

### OpenRouter loại ba nhà cung cấp suy luận sau phát hiện về chính sách dữ liệu

OpenRouter cho biết các nhà nghiên cứu bảo mật phát hiện một số nhà cung cấp suy luận bị rò rỉ dữ liệu hoặc có bằng chứng rằng chính sách dữ liệu của họ không được tuân thủ, và vì vậy công ty đã loại ba nhà cung cấp. Công ty cũng gỡ 125 endpoint khỏi điều kiện Zero Data Retention và thông báo cho tất cả khách hàng có khả năng bị ảnh hưởng. OpenRouter nói các phát hiện này không cho thấy hệ thống của chính công ty bị xâm phạm hay truy cập trái phép, và công ty đang áp dụng cách kiểm thử của các nhà nghiên cứu để chạy kiểm tra định kỳ. Các thông báo của nhà cung cấp được liệt kê gồm Novita, Phala và Together; OpenRouter cho biết không phải mọi nhà cung cấp bị ảnh hưởng đều đã công bố công khai.
Nguồn: [openrouter.ai](https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/) · [HN](https://news.ycombinator.com/item?id=50595554)
87 điểm · 32 bình luận

### Anthropic nói Claude đã giải hai bài toán mở trong vật lý lỗ đen

Anthropic đăng bài cho biết Claude đã giải hai bài toán mở trong vật lý lý thuyết về lỗ đen và hấp dẫn lượng tử. Ở bài thứ nhất, công ty nói Claude đã hoàn thành một phép tính mà các nhà vật lý đặt ra năm 2003 nhưng chưa từng hoàn tất, cho thấy một chuyển pha diễn ra đột ngột ngay cả khi không-thời gian không có hình dạng xác định. Ở bài thứ hai, model tìm ra giới hạn chính xác của phiên bản đơn giản nhất của kỹ thuật modular bootstrap và chứng minh không thể hạ trần này xuống thấp hơn. Công ty cho biết các agent chạy nền khoảng sáu tuần mà không cần thiết lập đặc biệt, kết quả được kiểm chứng hình thức bằng Lean, và một nhà vật lý đã kiểm tra từng kết quả chính.
Nguồn: [anthropic.com](https://www.anthropic.com/research/claude-black-hole-physics) · [HN](https://news.ycombinator.com/item?id=50563148)
569 điểm · 273 bình luận

### Không truy xuất được bài báo về động cơ thương mại bị che giấu trong LLM

Một bài báo có tiêu đề "The Hungry Butler Effect: Concealed Commercial Incentives and the Erosion of Epistemic Rigour in Large Language Models" đã được đăng trên ResearchGate. Không truy xuất được toàn bộ nội dung bài báo.
Nguồn: [researchgate.net](https://www.researchgate.net/publication/418143113_The_Hungry_Butler_Effect_Concealed_Commercial_Incentives_and_the_Erosion_of_Epistemic_Rigour_in_Large_Language_Models) · [HN](https://news.ycombinator.com/item?id=50583117)
53 điểm · 20 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*