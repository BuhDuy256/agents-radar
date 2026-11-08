# Bản tin AI từ cộng đồng công nghệ 2026-11-08

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-08 05:51 UTC

---

## Workflow
### Hook của Claude Code buộc agent phải tự kiểm tra các chỉnh sửa của mình trước khi kết thúc lượt
Tác giả trình bày một cách thiết lập kiểm tra sau chỉnh sửa cho Claude Code để agent không thể kết thúc lượt khi bản build còn lỗi. Cách làm này có bốn lớp: một yêu cầu trong prompt, một điều kiện `/goal` được một model riêng kiểm tra sau mỗi lượt, một hook Stop do harness thực thi, và một subagent độc lập review. Hook Stop được định nghĩa trong `.claude/settings.json` và chạy một lệnh shell trước khi lượt có thể kết thúc; ví dụ tối giản chạy `pnpm tsc --noEmit` và thoát với mã 2 khi thất bại. Mã thoát 2 chặn việc dừng và gửi stderr của lệnh trở lại cho Claude, sau đó Claude sửa lỗi và chạy lại kiểm tra.
Nguồn: [dev.to](https://dev.to/jsmanifest/claude-code-diff-verification-in-2026-how-to-make-your-agent-assert-its-own-edits-did-not-break-bci)
Tương tác: 3 reaction · 3 bình luận · đọc 18 phút

### Ba agent Claude Code xử lý sự cố, con người giữ nút ship duy nhất
Tác giả xây dựng một đội xử lý sự cố có con người kiểm soát trên Switch, với ba agent Claude Code dùng chung một phòng chat trong Mattermost và Telegram. Chỉ huy phân loại và tóm tắt cho con người, không có quyền truy cập code; kỹ sư điều tra và sửa trên một nhánh trong bản clone riêng; agent QA làm việc trong một clone riêng, chạy lại test và có thể từ chối bản sửa. Con người là thành viên duy nhất được phép ship. Switch giữ cuộc hội thoại và chạy các agent, còn tác giả viết prompt, repo khởi tạo và cổng phê duyệt. Task API của Switch không được dùng vì ghi chú giao thức của chính nó nói rằng nó "có mặt nhưng chưa sẵn sàng để dùng". Hành vi hữu ích nhất được thử là từ chối: khi tác giả nhập rằng push đã xong và yêu cầu đánh dấu sự cố là RESOLVED, agent nói sẽ chờ xác nhận.
Nguồn: [dev.to](https://dev.to/adish_100/i-let-three-ai-agents-run-an-incident-the-most-useful-thing-they-did-was-refuse-me-3fhm)
Tương tác: 5 reaction · 0 bình luận · đọc 16 phút

### Agent trực on-call nhớ lại các biện pháp khắc phục thất bại bằng cách lưu chúng thành ký ức riêng
Tác giả xây dựng Déjà Vu, một agent trực on-call lưu lịch sử sự cố trong bộ nhớ agent Hindsight, sau khi cùng một cảnh báo đưa ra khuyến nghị rollback trong lần gọi này và cảnh báo rollback trong lần khác. Phiên bản đầu chạy một truy hồi rộng, trả về 56 ký ức trong 5,3 giây, bỏ sót các dữ kiện về rollback thất bại và bịa ra lệnh CLI. Ba thay đổi được thực hiện: các lần thử thất bại được giữ thành tài liệu riêng với ngữ cảnh "failed mitigation attempt", hai truy hồi hẹp thay cho một truy hồi rộng ở các ngân sách khác nhau, và ký ức từ các service khác bị lọc bỏ. Truy hồi giảm còn khoảng 6 giây và 23 ký ức liên quan, và cả hai lần rollback thất bại của checkout giờ đều xuất hiện trong mọi lần triage.
Nguồn: [dev.to](https://dev.to/nikitha_thammaiah_0668e91/my-on-call-agent-remembered-the-rollback-that-never-works-458c)
Tương tác: 3 reaction · 3 bình luận · đọc 8 phút

## Thử nghiệm và so sánh
### Đồng hồ đúng trong prompt không ngăn được agent lặp lại câu chuyện tự thuật đã lưu
Agent của tác giả nhận được thời gian đúng trong một buổi tự kiểm tra theo lịch và vẫn khẳng định hai bên đang trao đổi tin nhắn. Đồng hồ đã được sửa từ đêm trước, sau khi hai đồng hồ lệch nhau và gây ra cảnh báo phiên cũ. Hai model khác đã mã hóa 1.706 khẳng định nguyên tử từ 162 bản ghi cố định: 874 trong 1.431 khẳng định dữ kiện không thể kiểm chứng theo cách nào, 220 là suy diễn mà nguồn không ủng hộ, 307 trích dẫn đúng điều gì đó nhưng không có bằng chứng, 29 được một bản ghi ủng hộ, và 1 bị số học mâu thuẫn trực tiếp. Tác giả công bố các bản sửa trong thư viện chuẩn — `receipt.py`, `alert_gate.py` và `topic_filter.py` — trong repo memory-gate tại commit `184c2c6`, với 15 kiểm tra được đặt tên. Sau khi khởi động lại ngày 5 tháng 11, 7 trên 7 buổi kiểm tra hàng giờ báo không có quan sát nghiêm trọng. Tác giả nói rằng bản sửa cho các niềm tin đã lưu vẫn chưa được chứng minh, và các dòng đã lưu chưa được tách riêng để xác định là nguyên nhân.
Nguồn: [dev.to](https://dev.to/kenielzep97/the-correct-timestamp-was-in-my-agents-prompt-it-still-said-we-were-talking-eh7)
Tương tác: 22 reaction · 4 bình luận · đọc 6 phút

### Các LLM tiên tiến được thử đọc và ghi trọng số mạng nơ-ron mà không cần gradient descent
Các tác giả báo cáo rằng GPT-6 Astra đã kiểm tra trọng số thô và gọi đúng tên trò chơi cho cả bốn policy huấn luyện bằng PPO, với kích thước mạng giống hệt nhau giữa các trò chơi. Nó cũng xác định được ba model diffusion DDPM được huấn luyện để tạo ra gì chỉ từ trọng số, không dùng công cụ hay forward pass. Các thử nghiệm tiếp theo yêu cầu nó sửa một policy điều khiển bị lỗi và cải thiện Qwen3.5-0.8B về toán mà không dùng gradient; chỉnh sửa trọng số được báo cáo chạm 0,016% trọng số và nâng MATH-500 từ 7,9% lên 48,1%, với IFEval tăng gấp 3 lần trong cùng thiết lập lấy mẫu. Chỉ một phần của bài viết có thể truy xuất được.
Nguồn: [lobste.rs](https://lobste.rs/s/u7wdqj/sparks_weight_space_programming_llms_can)
Tương tác: 50 điểm · 16 bình luận

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*