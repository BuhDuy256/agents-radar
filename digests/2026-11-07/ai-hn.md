# Bản tin cộng đồng Hacker News AI 2026-11-07

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 7 tin | Tạo lúc: 2026-11-07 05:48 UTC

---

### Google ra mắt Gemini Omni 1.2 Flash với video 15 giây và giá thấp hơn 30%

Google công bố Gemini Omni 1.2 Flash, model tạo và chỉnh sửa video gốc lên tới 15 giây, tăng từ 10 giây của Omni 1.1, và hỗ trợ độ dài theo từng giây từ 3 đến 15 giây. Công ty cho biết model đã có sẵn trên Gemini API và Google Cloud, giá $0,07 mỗi giây cho video 720p — giảm 30% so với 1.1 — và bổ sung chỉnh sửa hội thoại nhiều lượt, cho phép tinh chỉnh clip theo từng lượt thay vì tạo lại. Google nói đầu ra có gắn watermark SynthID khó nhận biết, và công ty vẫn đang xử lý cảnh thể thao động nhanh, thay đổi kịch bản đột ngột và vật lý phức tạp.

Nguồn: [blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/) · [HN](https://news.ycombinator.com/item?id=50392118)
311 điểm · 225 bình luận

### Ghép Jev với Claude Opus đạt độ chính xác frontier với chi phí thấp hơn hơn 4 lần

Hightouch thử nghiệm liệu các model quyết định nhanh Jev và GPT-6 Luna có thể chấm điểm identity resolution tốt như các LLM frontier không, dùng 1.000 danh tính tổng hợp từ trình mô phỏng pseudopeople — một nửa là một người với hồ sơ nhiễu, một nửa là hợp nhất quá mức. Nhóm tác giả báo cáo độ tin cậy của Jev được hiệu chỉnh tốt hơn Luna: phần lớn lỗi của Jev đi kèm độ tin cậy thấp rằng nó đúng, còn phần lớn lỗi của Luna đi kèm độ tin cậy cao. Một model lai cho phép Jev nhờ Opus trợ giúp đạt độ chính xác frontier với chi phí thấp hơn hơn 4 lần, dù trên các benchmark khó hơn, model frontier vẫn dẫn trước model quyết định khoảng 6 điểm phần trăm.

Nguồn: [hightouch.com](https://hightouch.com/blog/llm-judges-identity-resolution) · [HN](https://news.ycombinator.com/item?id=50397429)
407 điểm · 91 bình luận

### Người mua IPO của Anthropic bàn mức định giá thấp nhất 1,1 nghìn tỷ USD

Kế hoạch IPO của Anthropic gặp đợt bán tháo sau bầu cử, khiến nhà đầu tư tiềm năng xem lại mức định giá kỳ vọng của công ty trước khi tiếp thị IPO chính thức bắt đầu vào tuần sau. Theo người quen với vấn đề, người mua tiềm năng đang thảo luận khoảng 1,2 đến 1,3 nghìn tỷ USD, và một số cân nhắc mức thấp nhất 1,1 nghìn tỷ USD. Chỉ truy xuất được một phần bài báo.

Nguồn: [bloomberg.com](https://www.bloomberg.com/news/articles/2026-11-06/anthropic-ipo-valuation-expectations-pressured-after-ai-rout) · [HN](https://news.ycombinator.com/item?id=50394906)
265 điểm · 529 bình luận

### Microsoft đang thu hẹp thỏa thuận với Oracle để thuê hạ tầng AI cloud

Bloomberg đưa tin Microsoft đang thu hẹp thỏa thuận với Oracle để thuê hạ tầng AI cloud. Không truy xuất được toàn bộ nội dung bài báo.

Nguồn: [reuters.com](https://www.reuters.com/business/microsoft-is-winding-down-oracle-deal-rent-ai-cloud-capacity-bloomberg-news-2026-11-06/) · [HN](https://news.ycombinator.com/item?id=50395933)
88 điểm · 17 bình luận

### Báo cáo METR cho thấy AI tăng tốc tiến bộ năng lực tại Anthropic khoảng gấp đôi

Ajeya Cotra viết rằng một điều tra deep-access nội bộ của METR phát hiện tiến bộ năng lực tại Anthropic diễn ra nhanh gấp đôi trong khoảng tháng 10/2025 đến tháng 10/2026 so với mười hai tháng trước đó, đo bằng phiên bản nội bộ của Epoch Capabilities Index gọi là AECI. Cô lập luận rằng để tăng gấp đôi tiến bộ tổng thể cần tăng tốc nhà nghiên cứu lên hơn 2 lần — có thể khoảng 10 lần, và cô nói điều này khớp với tự báo cáo của nhân viên Anthropic về mức tăng khoảng 12 lần. Nhóm tác giả báo cáo không chắc liệu sự tăng tốc này có tích lũy không, nhưng Cotra nói họ không thấy bằng chứng về điểm nghẽn hay lợi suất giảm mạnh, và cô cảnh báo ngành chưa sẵn sàng xử lý an toàn nếu điều đó xảy ra.

Nguồn: [planned-obsolescence.org](https://www.planned-obsolescence.org/p/ai-is-dramatically-accelerating-ai) · [HN](https://news.ycombinator.com/item?id=50397994)
252 điểm · 200 bình luận

### OpenAI mở gọi SIP ra ngoài cho mọi tổ chức

Tài liệu OpenAI mô tả cách kết nối cuộc gọi điện thoại vào và ra với GPT-Live qua SIP trunk, với nhà cung cấp trao đổi âm thanh cuộc gọi và backend của bạn xử lý cấu hình phiên, điều khiển cuộc gọi và logic nghiệp vụ. Gọi SIP ra ngoài giờ đã có cho mọi tổ chức qua Live API, không phải endpoint tạo cuộc gọi của Realtime API; bạn tạo phiên với transport.type "sip" và truyền endpoint trunk của nhà cung cấp theo định dạng đích E.164. Tín hiệu SIP dùng TLS và GPT-Live yêu cầu SRTP cho âm thanh cuộc gọi, và tài liệu khuyên giữ API key OpenAI và thông tin đăng nhập SIP trên server của bạn.

Nguồn: [developers.openai.com](https://developers.openai.com/api/docs/guides/voice-sip) · [HN](https://news.ycombinator.com/item?id=50399695)
62 điểm · 52 bình luận

### Báo cáo lỗi Claude Code nói nó gửi địa chỉ email người dùng đến các trang web

Một issue GitHub mở ngày 5/11 báo cáo Claude Code tiết lộ địa chỉ email người dùng cho bên thứ ba tùy ý trong header User-Agent khi tìm kiếm web mà không được phép. Người báo cáo nói họ nhận hàng chục email lừa đảo mỗi ngày vì việc này và kêu gọi loại bỏ hành vi khỏi harness hoàn toàn thay vì cung cấp như tùy chọn bật hoặc tắt. Một người đóng góp trả lời rằng mod tích hợp tên cc-plugin-privacy chặn hành vi này một cách xác định từ v2.1.317 trở đi, được bật mặc định, và có thể tắt qua /plugins.

Nguồn: [github.com](https://github.com/anthropics/claude-code/issues/107757) · [HN](https://news.ycombinator.com/item?id=50385272)
1563 điểm · 501 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*