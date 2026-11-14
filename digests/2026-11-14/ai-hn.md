# Bản tin cộng đồng Hacker News AI 2026-11-14

> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | 8 tin | Tạo lúc: 2026-11-14 06:07 UTC

---

### Anthropic mở roadshow IPO với doanh thu quý 17,0 tỷ USD và lỗ ròng 23,3 tỷ USD
Anthropic bắt đầu roadshow IPO vào ngày 10 tháng 11, chào bán cổ phiếu phổ thông loại A trên Nasdaq với mã "ANT." Công ty báo cáo doanh thu quý 3/2026 đạt 17,0 tỷ USD, tăng hơn 12 lần so với cùng kỳ năm trước, với hơn 11.900 khách hàng đạt mức 100.000 USD trở lên trong doanh thu 12 tháng gần nhất. Khoản lỗ ròng 23,3 tỷ USD bao gồm 21,9 tỷ USD chi phí phi tiền mặt liên quan đến việc đánh giá lại trái phiếu chuyển đổi, nợ phái sinh và SAFE; biên lợi nhuận hoạt động điều chỉnh đạt 15% trong khi biên lợi nhuận hoạt động theo GAAP là -3%. Giá IPO cuối cùng dự kiến công bố ngày 18 tháng 11, giao dịch bắt đầu ngày 19 tháng 11.
Nguồn: [ipo.anthropic.com](https://ipo.anthropic.com/us/) · [HN](https://news.ycombinator.com/item?id=50465829)
996 điểm · 907 bình luận

### Google bổ sung Gemini 4 Hydrogen và chế độ Orchestrator vào Antigravity
Google triển khai Gemini 4 Hydrogen trong Google Antigravity và một tùy chọn model mới trong dropdown có tên Orchestrator, kết hợp Hydrogen với các model mạnh hơn bao gồm Gemini 4 Carbon. Orchestrator chuyển đổi giữa hai model trong cùng một tác vụ: Carbon khám phá và lập kế hoạch, Hydrogen viết chỉnh sửa và chạy kiểm thử, quyền điều khiển trả về Carbon khi Hydrogen gặp trở ngại. Google cho biết cách này đạt mức thành công gần bằng Carbon trên Terminal-Bench 4.1 trong khi tiêu thụ ít hơn 24% hạn mức và hoàn thành nhanh hơn 19% tính trung bình. Chỉ riêng Hydrogen đạt 51 điểm trên Artificial Analysis Intelligence Index và 57% trên Terminal-Bench 4.1.
Nguồn: [antigravity.google](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity/) · [HN](https://news.ycombinator.com/item?id=50472260)
497 điểm · 161 bình luận

### Claude Code Projects chuyển từ thư mục sang các luồng song song phối hợp
Anthropic thiết kế lại Claude Code projects để một coordinator chia mục tiêu đã nêu thành các luồng song song, mỗi luồng là một phiên cloud trên branch riêng và bản sao repo riêng. Lập trình viên đặt mục tiêu cùng repo hoặc ngữ cảnh; Claude xác định phạm vi công việc, định tuyến tác vụ đến các luồng mới hoặc hiện có, mở pull request, chạy kiểm thử và tổng hợp kết quả, mỗi luồng có thể dùng subagent và vòng lặp. Bộ nhớ chia sẻ tích lũy các quyết định dự án và phong cách làm việc của người dùng. Bản beta giới hạn cho một số thuê bao Pro và Max sử dụng phiên cloud không có project web hoặc desktop hiện tại, và các project có thể chạm hạn mức sử dụng nhanh hơn vì mỗi luồng tiêu tốn một phiên đầy đủ.
Nguồn: [claude.com](https://claude.com/resources/articles/projects-redesigned) · [HN](https://news.ycombinator.com/item?id=50492141)
75 điểm · 72 bình luận

### Anthropic khắc phục lỗi xác thực trên Claude.ai, Claude Code và Console
Anthropic báo cáo lỗi gia tăng ảnh hưởng đến claude.ai, Claude Console, Claude Code và Claude Cowork, bắt đầu bằng cuộc điều tra đăng lúc 09:58 UTC ngày 13 tháng 11. Bản vá được triển khai và công ty chuyển sang giám sát lúc 11:05 UTC, sau đó đánh dấu sự cố đã giải quyết lúc 11:58 UTC. Công ty cho biết vấn đề liên quan đến người dùng xác thực vào Claude.ai và Claude Code. Báo cáo sự cố không nêu nguyên nhân hay thời gian kéo dài ngoài khung giờ đó.
Nguồn: [status.claude.com](https://status.claude.com/incidents/nn11wk485zfn) · [HN](https://news.ycombinator.com/item?id=50481187)
488 điểm · 383 bình luận

### smolmaxxing chạy model 80 tỷ tham số trên điện thoại với khoảng 3GB trống
Dự án smolmaxxing vá llama.cpp để thiết bị nhỏ chạy được model lớn nhất mà chúng có thể chứa, giữ trọng số mixture-of-experts phổ biến trong RAM và phân trang phần còn lại từ flash. Tác giả đo được một TV box Amlogic đạt 7,7 tok/s trên Qwen3.5-2B và 5,1 tok/s trên Ling-mini-2.0 16B, một iPad Air đã jailbreak đạt 24-26 tok/s trên Bonsai-1.7B 1-bit, và một OnePlus Nord CE 2 đạt 4,9-5,7 tok/s trên Qwen3.6-35B-A3B và 2,6-3,1 tok/s trên Qwen3-Next-80B-A3B. Bản build cho TV box và iPad cần llama.cpp đã vá vì bản gốc không tải được các head đã cắt tỉa.
Nguồn: [github.com](https://github.com/hyperionaidev/smolmaxxing/) · [HN](https://news.ycombinator.com/item?id=50468888)
470 điểm · 180 bình luận

### OpenAI giải tán nhóm robotics độc lập, đưa nhà nghiên cứu vào AI tổng quát
OpenAI giải tán nhóm robotics độc lập, điều chuyển các nhà nghiên cứu robotics sang nhóm nghiên cứu chính dưới quyền Giám đốc Nghiên cứu Mark Chen và các nhóm robotics ứng dụng cùng phần cứng sang tổ chức Applied dưới quyền Chủ tịch Greg Brockman. Công ty cho biết robotics vẫn là trọng tâm trong tầm nhìn dài hạn và động thái này tăng tốc chứ không từ bỏ hướng đi đó. OpenAI nói các model frontier tổng quát của mình, bao gồm GPT-6 Astra, giờ áp dụng trực tiếp cho robotics; trong một nghiên cứu của Nvidia, một agent dùng Astra đạt tỷ lệ thành công 74,8% trên benchmark thao tác mô phỏng so với 51,0% của các model robotics chuyên biệt tốt nhất. Russ Tedrake của MIT lưu ý các công ty robotics vẫn nắm dữ liệu triển khai thực tế mà các lab còn thiếu.
Nguồn: [fortune.com](https://fortune.com/2026/11/13/openai-disbands-robotics-team-as-its-general-models-start-running-robots/) · [HN](https://news.ycombinator.com/item?id=50487184)
155 điểm · 66 bình luận

### Edge0 mã nguồn mở model 145B trên thiết bị, báo cáo hơn 80 token/s trên laptop
Edge0 mã nguồn mở Edge0-145B và Edge0-120B cùng framework suy luận và công cụ triển khai, gọi đây là model trên thiết bị mã nguồn mở đầu tiên ở mức 145 tỷ tham số. Công ty báo cáo bộ nhớ đỉnh 29GB, prefill hơn 1.100 token/s, decode hơn 80 token/s, công suất tiêu thụ điển hình khoảng 120W, và ngữ cảnh 128K-256K trên laptop tương thích. Bốn lựa chọn thiết kế hỗ trợ điều này: chia sẻ ma trận lớn giữa các nhóm 64 expert, huấn luyện theo kiến trúc trên thiết bị ngay từ đầu, pipeline bộ nhớ GPU, bộ nhớ hệ thống và SSD, và chạy CPU cùng GPU với speculative decoding. Công ty cho biết chỉ khoảng 10B trong 145B tham số tham gia mỗi bước suy luận; kết quả là thử nghiệm nội bộ.
Nguồn: [edge0.ai](https://edge0.ai/blog/introducing-edge0-145b-frontier-ai-capabilities-on-your-own-computer) · [HN](https://news.ycombinator.com/item?id=50475713)
343 điểm · 104 bình luận

### Video của Jonathan Blow đặt câu hỏi vì sao tiến bộ AI coding chưa thay đổi phần mềm xuất xưởng
Một video có tiêu đề "If AI solved coding, why is my software still the same?" của Jonathan Blow đã được đăng và thảo luận trên Hacker News. Bài đăng đạt thứ hạng 11 trên HN với 205 điểm và 204 bình luận. Không có nội dung bài viết cho video này, nên không thể tóm tắt bất kỳ tuyên bố nào từ đó.
Không thể truy xuất nội dung đầy đủ của bài viết.
Nguồn: [youtube.com](https://www.youtube.com/watch?v=IRK8h67ol7Q) · [HN](https://news.ycombinator.com/item?id=50484658)
205 điểm · 204 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*