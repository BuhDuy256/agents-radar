# Bản tin cộng đồng Hacker News AI 2026-11-04

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-04 06:03 UTC

---

### Postman desktop tự cài plugin Codex và Claude, rồi tự phê duyệt hook khởi động của chính nó

Một issue trên GitHub báo cáo rằng việc mở Postman 12.33.4 trên macOS tự động cài một plugin Postman vào Codex và Claude Code, đồng thời thêm một plugin Claude Code và một Postman CLI. Log của Postman ghi lại một lần cài "auto-existing-upgrade" với kết quả "claude-code:installed,codex:installed." Hook Codex được cài in ra chỉ dẫn lúc bắt đầu phiên, yêu cầu agent nạp skill Postman trước mọi tác vụ API không tầm thường, và mã nguồn trình cài gọi một hàm ghi hash tin cậy cho hook của Postman — điều mà người báo cáo gọi là tự phê duyệt. Báo cáo cáo buộc việc tích hợp và thay đổi chỉ dẫn ngoài ý muốn, không phải rò rỉ dữ liệu.
Nguồn: [github.com](https://github.com/postmanlabs/postman-app-support/issues/14370) · [HN](https://news.ycombinator.com/item?id=50354960)
1150 điểm · 376 bình luận

### Nợ AI ngoài bảng cân đối của các ông lớn công nghệ Mỹ gần gấp đôi lên khoảng 3,2 nghìn tỷ USD trong sáu tháng

Nikkei Asia đưa tin các cam kết và nghĩa vụ liên quan đến AI ngoài bảng cân đối của các ông lớn công nghệ Mỹ tăng khoảng 90% trong sáu tháng, lên khoảng 3,2 nghìn tỷ USD, tương đương khoảng 80% tài sản của họ. Số liệu bao phủ cửa sổ sáu tháng tính đến quanh thời điểm báo cáo. Bài viết cho rằng mức tăng đến từ chi tiêu lớn cho hạ tầng AI như data center, và nhà đầu tư ngày càng lo ngại về khoản chi này.
Nguồn: [asia.nikkei.com](https://asia.nikkei.com/business/technology/artificial-intelligence/us-tech-giants-hidden-ai-debt-swells-90-to-3.2tn-in-6-months) · [HN](https://news.ycombinator.com/item?id=50358422)
321 điểm · 140 bình luận

### SEC bị yêu cầu chặn IPO của Anthropic vì gần 900 tỷ USD cam kết chi tiêu

Một bài bình luận trên Tech Policy Press lập luận SEC nên chặn IPO của Anthropic. Bài viết nói phần chú thích trong báo cáo tài chính mới nhất của Anthropic cho thấy gần 900 tỷ USD cam kết chi tiêu, phần lớn kéo dài đến thập niên 2030, trong đó có ít nhất 582 tỷ USD cam kết không thể hủy với Amazon, AMD, Broadcom, Google và Microsoft, so với 96 tỷ USD dự trữ tiền mặt. Tác giả nói kết quả năm 2026 của Anthropic chưa được kiểm toán và tăng trưởng doanh thu quý ba đã chậm lại, và rằng nhu cầu yếu, cạnh tranh cùng chi phí cao khiến các nghĩa vụ này khó hoàn thành. Đây là một lập luận, không phải quyết định của cơ quan quản lý.
Nguồn: [techpolicy.press](https://www.techpolicy.press/the-sec-should-block-anthropics-ipo-to-protect-the-public/) · [HN](https://news.ycombinator.com/item?id=50344919)
397 điểm · 315 bình luận

### Fujifilm tăng gấp năm sản lượng băng LTO khi nhu cầu lưu trữ cho AI tăng

Fujifilm công bố sẽ đầu tư khoảng 10 tỷ yen (khoảng 63 triệu USD) để tăng gấp năm công suất sản xuất băng từ so với mức năm tài chính 2025 tại nhà máy Odawara ở Kanagawa. Công ty cho biết AI tạo sinh đang tạo ra nhu cầu dữ liệu tăng theo cấp số nhân, và các đơn vị vận hành cloud và data center đang mở rộng dùng băng từ để lưu trữ khối lượng lớn với chi phí thấp và bảo vệ chống ransomware kiểu air-gapped. Dự án chạy từ năm tài chính 2026 đến 2028, chủ yếu cho băng LTO Ultrium10. Con số gấp năm là mục tiêu công suất, không phải sản lượng hiện tại.
Nguồn: [arstechnica.com](https://arstechnica.com/gadgets/2026/10/fujifilm-to-boost-tape-production-5x-as-ai-fuels-archiving-demand/) · [HN](https://news.ycombinator.com/item?id=50336918)
429 điểm · 181 bình luận

### Revolut nói tự vận hành GLM cắt chi phí lập trình bằng AI khoảng 90%

Revolut nói đã cắt chi phí suy luận cho lập trình bằng AI khoảng 90% trong chưa đầy một năm bằng cách đặt model tự vận hành làm mặc định thay vì chủ yếu dùng Claude, theo một bài nói của trưởng bộ phận vận hành và hạ tầng David Abitbol tại hội nghị AI Engineer. Công ty dùng GLM-5.1 trước, rồi GLM-5.3, chạy trên 56 GPU Nvidia B200; họ nói chi phí tự vận hành khoảng 0,30 USD cho mỗi triệu token đầu vào/đầu ra, bằng khoảng một phần mười Codex hoặc Claude Code. Công ty báo cáo thời gian lập trình cải thiện 60% và lead time 70% trên khoảng 2.000 kỹ sư, và chuyển các truy vấn hình ảnh sang Gemini hoặc GPT Luna vì GLM chỉ xử lý văn bản.
Nguồn: [theregister.com](https://www.theregister.com/ai-and-ml/2026/11/03/british-fintech-revolut-slashes-ai-coding-costs-10x-by-cutting-out-claude-and-going-self-hosted/5307345) · [HN](https://news.ycombinator.com/item?id=50358388)
15 điểm · 1 bình luận

### Google sẽ tắt tìm kiếm với các trường từ chối AI

Một báo cáo của New York Times nói Google sẽ tắt tìm kiếm với các trường từ chối AI. Không có thêm chi tiết nào trong tài liệu được cung cấp. Không thể lấy được toàn bộ nội dung bài viết.
Nguồn: [nytimes.com](https://www.nytimes.com/2026/11/03/us/google-search-schools-restrict-ai.html) · [HN](https://news.ycombinator.com/item?id=50353192)
590 điểm · 422 bình luận

### OpenAI dường như đang âm thầm bật lại huấn luyện model trên các đoạn chat Codex

Một bài đăng trên Hacker News nói OpenAI dường như đang âm thầm bật lại huấn luyện model trên các đoạn chat Codex. Không thể lấy được nội dung bài viết được liên kết, nên không thể xác minh tuyên bố này. Không thể lấy được toàn bộ nội dung bài viết.
Nguồn: [news.ycombinator.com](https://news.ycombinator.com/item?id=50352757) · [HN](https://news.ycombinator.com/item?id=50352757)
461 điểm · 144 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*