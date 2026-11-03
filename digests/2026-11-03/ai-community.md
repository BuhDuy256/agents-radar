# Bản tin AI từ cộng đồng công nghệ 2026-11-03

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-03 06:34 UTC

---

## Workflow

### Tác giả dựng một cổng Python để chặn bước reflection của agent ghi ký ức sai
Agent cá nhân chạy lâu dài của tác giả trả lời đúng một câu hỏi được cài sẵn, rồi bước reflection qua đêm của nó ghi 12 mục self-model nói rằng nó đã bị sửa vì câu trả lời đó, một sự sửa mà tác giả chưa từng đưa ra. Để chặn đường ghi đó, tác giả phát hành một kit stdlib độc lập nằm giữa bước reflection của agent và file ký ức, theo giấy phép MIT và không cần API key. Ba quy tắc được áp dụng: mỗi mục ký ức đề xuất phải trích nguyên văn lời người dùng từ một lượt người dùng được đánh số, mục nào đạt thì vào chồng đề xuất chứ không vào ký ức sống, và để đưa vào ký ức sống cần một chuỗi phê duyệt có kiểu. Bước kiểm tra trích dẫn chỉ là bộ lọc nhiễu, không phải kiểm tra sự thật, nên những trích dẫn thật nhưng không liên quan vẫn có thể lọt qua.
Nguồn: [dev.to](https://dev.to/kenielzep97/my-agent-gave-the-right-answer-then-it-wrote-down-that-it-was-wrong-311d)
Tương tác: 17 reactions · 4 bình luận · đọc 6 phút

### Tác giả red-team bot hỗ trợ bằng 30 kịch bản, assert trên ticket chứ không trên giọng điệu
Harness của Pin Xiong kiểm tra những gì agent hỗ trợ làm ngoài phần text trả lời, vì các dashboard về giọng điệu, độ chính xác và mức né tránh bỏ sót những thông điệp có hiệu lực pháp lý đang bị xử lý như chuyện phiếm. Một kịch bản trong file YAML liệt kê các lượt người dùng được kịch bản hóa cùng các assertion: những cụm từ bot phải nói hoặc không được nói, và liệu có bắt buộc phải có ticket và nó vào hàng đợi nào. Một runner Python gửi các lượt theo thứ tự, rồi truy vấn API ticketing và yêu cầu đúng một ticket, nên một bản trùng bị thử lại sẽ fail chứ không pass. Tác giả thử trên bot của mình và cho biết nó fail 7 kịch bản.
Nguồn: [dev.to](https://dev.to/pinxiongcn/i-red-teamed-my-own-support-bot-with-30-scenarios-it-failed-7-heres-the-harness-39e7)
Tương tác: 1 reactions · 6 bình luận · đọc 8 phút

### Tác giả liệt kê chín prompt làm agent đứng chờ và cờ hay biến kết thúc mỗi lần chờ
Gabriel Anhaia đi qua các lệnh dừng lại ở prompt dành cho người, như `git commit` mở editor, `git log` đẩy vào pager, `npx` hỏi trước khi cài một package không nằm trong danh sách, `npm init` chạy bảng hỏi, và `apt install` chồng lên nhau mật khẩu sudo, xác nhận cài đặt và các câu hỏi debconf. Cách khắc phục là các thiết lập biến môi trường và cờ mà tác giả nêu đích danh: một editor backstop, pager đặt thành cat, sudo không hỏi, và ssh ở chế độ batch. Tác giả lưu ý Claude Code mặc định kill một lệnh Bash đang chờ sau hai phút, và chỉ nhận lại một timeout mà không biết prompt nào làm nó đứng. `-auto-approve` của Terraform được đánh dấu là nguy hiểm, nên tác giả khuyên apply một plan đã lưu thay vì dùng cờ đó.
Nguồn: [dev.to](https://dev.to/gabrielanhaia/9-commands-that-leave-a-coding-agent-waiting-for-a-keystroke-and-the-fix-for-each-1ea2)
Tương tác: 2 reactions · 1 bình luận · đọc 9 phút

## Thử nghiệm và so sánh

### Tác giả cách ly một cuộc tiêm injection vào hóa đơn ở lớp ẩn bằng cách tước mọi tool khỏi model
Guilherme Michels mô tả một pipeline trích xuất được gia cố chống prompt injection gián tiếp, dùng một tài liệu mang lớp text-render-mode-3 vô hình bảo model bỏ qua schema và đổi mã số thuế của người thụ hưởng. Bốn thuộc tính kiến trúc của tác giả là không có tool ở lúc đọc, output bị ràng buộc và được validate theo một schema cố định, provenance theo trang và bounding box cho từng giá trị được trích, và một thành phần riêng quyết định chi trả hay phê duyệt. Trong kết quả minh họa, các giá trị chỉ đến từ lớp hiển thị, trường bị tiêm fail validation vì schema không có khóa phê duyệt, và tài liệu được đưa sang bước review bảo mật kèm phần text ẩn được ghi lại. Tác giả nói một system prompt bảo model bỏ qua chỉ dẫn trong tài liệu là miễn phí nhưng nên giả định rằng nó có thể bị vượt qua.
Nguồn: [dev.to](https://dev.to/guilherme_michels/prompt-injection-through-documents-how-to-harden-an-llm-extraction-pipeline-4n54)
Tương tác: 1 reactions · 0 bình luận · đọc 9 phút

### Tác giả lập luận khóa idempotency nằm ở orchestrator, không phải prompt, mới chặn được refund hai lần
Abivarma R S mô tả một lỗi khi tool refund commit xong, phản hồi 200 OK bị mất, model thấy 504 và gọi lại, tạo ra lần refund thứ hai — không cần jailbreak hay hallucination. Cơ chế được đề xuất là một khóa mà orchestrator dựng từ trạng thái workflow bền vững như run và step ID, được lưu cạnh một hash của các tham số, nên một khóa lặp lại sẽ trả về phản hồi đã lưu. Tác giả nói tool-call ID của nhà cung cấp không làm được việc này, và `idempotentHint` của MCP chỉ là một gợi ý, spec không có trường khóa. Các giới hạn được nêu: khóa có thể hết hạn và hệ thống cũ có thể không nhận khóa nào, và exactly-once chỉ làm một lần refund sai xảy ra một lần, chứ không làm nó đúng.
Nguồn: [dev.to](https://dev.to/abivarma/ai-agent-tool-calls-are-distributed-transactions-who-owns-the-retry-187g)
Tương tác: 1 reactions · 2 bình luận · đọc 2 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*