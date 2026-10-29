# Bản tin cộng đồng Hacker News AI 2026-10-30

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-10-29 16:21 UTC

---

### Google công bố Gemini 4 Carbon với điểm số dẫn đầu trong các benchmark an ninh mạng
Google công bố Gemini 4 Carbon, một frontier model mà công ty cho biết đứng đầu Artificial Analysis Intelligence Index v5 với 59 điểm. Model đạt 88,2% trên SEC-bench Pro về tìm lỗ hổng, 54,8% trên ExploitGym về khai thác và 71,0% trên CWE-bench về vá lỗi. Model chưa mở công khai; quyền truy cập bắt đầu với một nhóm chuyên gia phòng thủ mạng và đối tác tin cậy qua Fairwind Program. Giá giới thiệu là 2 USD mỗi triệu token đầu vào và 10 USD mỗi triệu token đầu ra, sau đó tăng lên 4 USD và 20 USD.
Source: [blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/) · [HN](https://news.ycombinator.com/item?id=50276792)
987 points · 786 comments

### Gemini 4 Carbon đứng #1 trên Intelligence Index v5, thứ hai về agent lập trình
Artificial Analysis cho biết Gemini 4 Carbon đạt 59 điểm trên Intelligence Index v5, dẫn đầu 4 trong 9 bài đánh giá gồm HLE-Diamond và Terminal-Bench-Science. Với Antigravity CLI, model đạt 59 điểm trên Coding Agent Index, kém Claude Code dùng Claude Opus 5.5 ba điểm, và xếp thứ hai trên Terminal-Bench 4.0 với 64%. Model chưa mở công khai, và Google đang giảm giá 50% khi ra mắt nhưng chưa công bố ngày kết thúc. Ở giá tiêu chuẩn, mỗi tác vụ Intelligence Index tốn 7,76 USD.
Source: [artificialanalysis.ai](https://artificialanalysis.ai/articles/gemini-4-carbon-new-number-1) · [HN](https://news.ycombinator.com/item?id=50288019)
267 points · 207 comments

### Mistral phát hành open weights cho Mistral Large 4, model 1 nghìn tỷ tham số
Mistral phát hành trọng số của Mistral Large 4 (Le Chonk), model đa phương thức 1 nghìn tỷ tham số, sau ba tuần reinforcement learning bổ sung. Công ty cho biết model dẫn đầu về lập trình open-weight trên FrontierCode 2.0 với 19,7%, cải thiện Terminal-Bench 4.0 lên 41% so với bản preview, và đạt 51% trên Artificial Analysis Cyber Index. Lập trình viên có thể tự host và tùy chỉnh; model hỗ trợ ba chế độ suy luận thấp, trung bình và cao. Mistral cho biết model có tỷ lệ từ chối trung bình 96,6% với các yêu cầu mạng độc hại.
Source: [mistral.ai](https://mistral.ai/news/mistral-large-4-oss/) · [HN](https://news.ycombinator.com/item?id=50289418)
459 points · 116 comments

### Cursor phát hành Agent SDK để định nghĩa và triển khai agent bằng code
Cursor phát hành Agent SDK, framework mà hãng dùng cho các agent được quản lý như Bugbot và Security Reviewer. Agent được tổ chức như một dự án phần mềm: prompt viết bằng Markdown, tool là các hàm TypeScript, kèm evals và event replay. Lập trình viên chạy `agent-sdk deploy` để build agent, nhận URL và chạy trên hạ tầng Cursor, hoặc chạy như một tiến trình Node duy nhất trong container trên hạ tầng riêng. Một nhóm của Cursor build agent review PR tên kb-reviewer trong khoảng một ngày; SDK mở công khai từ hôm nay.
Source: [cursor.com](https://cursor.com/blog/agent-sdk) · [HN](https://news.ycombinator.com/item?id=50273731)
137 points · 130 comments

### Một preload của Bun chặn các lệnh gọi tóm tắt agent nền của Claude Code
Một gist của Flamerix AI mô tả script Bun `--preload` ngăn Claude Code gửi lại toàn bộ transcript của mỗi agent nền khoảng 30 giây một lần chỉ để lấy dòng trạng thái 3-5 từ. Script chỉ bọc hàm `setTimeout` toàn cục và trả về một handle trơ khi source của callback chứa anchor của summarizer, nên các timer khác đi qua bình thường. Số đo trong gist cho thấy `agent_summary` chiếm 16,4% chi phí Claude Code và 19,7% request API trước khi có hook, và 0% sau đó. Binary không bị sửa, nhưng tác giả nói một bản cập nhật có thể âm thầm vô hiệu hook, nên phải kiểm tra lại.
Source: [gist.github.com](https://gist.github.com/flamerix-ai/c3905705cc4205e5de3011fa2e74efce) · [HN](https://news.ycombinator.com/item?id=50284255)
523 points · 211 comments

### Anthropic báo cáo kết quả phát triển thuốc ban đầu từ các hợp tác với Claude
Nhóm khoa học sự sống của Anthropic mô tả công việc với sáu tổ chức đang phát triển thuốc, cùng các chương trình khám phá thuốc của chính hãng. Trong một trường hợp, Generate Biomedicines dùng Claude Code để đề xuất thiết kế liệu pháp CAR T-cell; một thiết kế ngắn hơn khoảng 70% và trong thử nghiệm lab tạo ra số receptor nhiều gấp khoảng 10 lần. Divergence Labs cho biết Claude tạo ra khoảng 35.000 thiết kế kháng thể trong khoảng một tháng, còn Enveda giảm 89% thời gian con người review 1.061 trang tài liệu. Công ty gọi đây là kết quả ban đầu và cho biết sẽ mở rộng công việc.
Source: [anthropic.com](https://www.anthropic.com/research/early-progress-drug-development) · [HN](https://news.ycombinator.com/item?id=50265609)
328 points · 337 comments

### DAYJOB: Benchmark thuế cho thấy agent bỏ sót các vấn đề thuế quan trọng
Surge AI phát hành DAYJOB: Tax, gồm 50 môi trường và 1.789 file kiểm tra liệu agent có xử lý được công việc thuế từ yêu cầu của khách đến sản phẩm bàn giao. Claude Sonnet 5.5 dẫn đầu với tỷ lệ pass 10,8% ở ngưỡng rubric 95%, tiếp theo là Claude Fable 5.1 với 9,6% và Claude Opus 5.5 với 9,2%. Trong một case study, Astra không bao giờ nhận ra hạn chót yêu cầu cư trú qua năm lần thử, còn Opus nhận ra trong cả năm lần. Các tác vụ do chuyên gia thuế tạo và review, benchmark bao phủ tám lĩnh vực hành nghề thuế.
Source: [surgehq.ai](https://surgehq.ai/blog/dayjob-tax) · [HN](https://news.ycombinator.com/item?id=50275626)
248 points · 163 comments

### OpenAI báo cáo ba phát hiện trong toán học, khoa học máy tính và vật lý
Không lấy được nội dung đầy đủ của bài. OpenAI đăng một trang có tiêu đề "Building scientific understanding with academic communities" mô tả ba phát hiện mới trong toán học, khoa học máy tính và vật lý.
Source: [openai.com](https://openai.com/index/building-scientific-understanding-with-academic-communities/) · [HN](https://news.ycombinator.com/item?id=50251344)
1153 points · 699 comments

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*