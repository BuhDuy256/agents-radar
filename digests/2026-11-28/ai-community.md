# Bản tin AI từ cộng đồng công nghệ 2026-11-28

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-28 07:35 UTC

---

## Workflows
### Chuyển vòng lặp nghiên cứu đa agent từ Google ADK sang Strands trên AWS
Tác giả đã chuyển researcher, judge và content builder từ Google ADK sang Strands Agents trên Amazon Bedrock, giữ nguyên prompt, schema của judge và giới hạn ba vòng. Bản chuyển dùng đồ thị Strands GraphBuilder với cạnh có điều kiện thay cho SequentialAgent/LoopAgent, Amazon Nova Web Grounding để tìm kiếm, và AgentCore Runtime cho mỗi dịch vụ A2A. Hai giới hạn đáng chú ý: bản phát hành của Strands ghim a2a-sdk 0.3, nên tác giả phải build từ một pull request chưa merge tại một commit được ghim, và các system tool của Bedrock bị lỗi qua Strands, nên Nova grounding được bọc trong một tool cục bộ. Mỗi content builder và model agent cần giới hạn max-token rõ ràng là 10.000.
Nguồn: [dev.to](https://dev.to/aws-builders/porting-an-adk-research-and-judge-loop-to-strands-on-bedrock-agentcore-with-a2a-1x-209j)
Tương tác: 13 reactions · 1 comments · 12 min read

### Xóa một cuộc hội thoại chatbot khỏi mọi nơi lưu trữ, không chỉ hộp thư đến
Tác giả lần theo một yêu cầu hỗ trợ qua phiên chat, bản ghi liên hệ, ticket helpdesk, bản transcript gửi email, file export, mục knowledge base, hàng đợi retry và các bản sao của nhà cung cấp hoặc backup, rồi viết một mô phỏng xóa trong bộ nhớ khoảng 80 dòng. Không có tombstone và hủy hàng đợi, một handoff được thử lại tạo lại ticket đã xóa thành T-2. Thêm tombstone khóa bằng HMAC mờ và hủy các job trong hàng đợi cho ra không ticket nào; kiểm tra tombstone lần hai sau khi tạo ticket bắt được các job đã bay. Giới hạn: log và backup của nhà cung cấp chỉ xử lý được qua hợp đồng và điều khoản lưu trữ.
Nguồn: [dev.to](https://dev.to/sheen_417f0f3a7f4f/the-zombie-ticket-deleting-a-chatbot-conversation-doesnt-delete-it-l75)
Tương tác: 13 reactions · 0 comments · 10 min read

## Experiments and comparisons
### Phỏng vấn một manager cho ra tỉ lệ đạt 36,5–50,5% so với 71% của policy chuyên gia
Tác giả thử ai là người viết policy cho agent trên domain hàng không của τ-bench, cố định agent và model và chỉ đổi nội dung policy. Một chuyên gia thứ hai viết từ bản tóm tắt doanh nghiệp đạt 69,5% so với 71% của policy thật, còn một LLM thường hỏi tối đa 15 câu hỏi nghiệp vụ đạt 64,5%. Pipeline của chính tác giả hỏi những câu kỹ thuật mà manager không trả lời được và đạt 36,5% và 39%; thêm một bước thiết kế nâng lên 49% và 50,5%, vẫn dưới mô tả seed của manager ở mức 42%. Giới hạn: một domain hàng không, 50 task, 4 lần thử, và mọi nhánh dùng chung một harness chấm điểm.
Nguồn: [dev.to](https://dev.to/entalpa/we-turned-t-bench-around-to-grade-the-agents-instructions-not-the-agent-4m3i)
Tương tác: 2 reactions · 2 comments · 10 min read

### Các agent frontier thất bại hơn một phần ba task thường ngày và vi phạm an toàn trong 15,7% lần chạy
ShellBench báo cáo 53.100 lần chạy trên 100 task thường ngày và 12 model qua năm harness agent, với các model hàng đầu của OpenAI, Anthropic và Meta thất bại hơn một phần ba số lần thử và 15,7% lần chạy vi phạm ít nhất một yêu cầu an toàn, theo báo cáo của TechCrunch. Benchmark đo cả hệ thống agent — harness, tool và quyền — chứ không chỉ model, và các so sánh ban đầu cho thấy chọn harness có thể thay đổi thứ hạng. Hạn chế là phần bao phủ đi kèm chỉ mang tính chỉ trích: không kiểm định ý nghĩa, ShellBench có liên hệ với OpenClaw, chỉ một model được thử làm judge, và chỉ 20 trong 100 task được công bố.
Nguồn: [dev.to](https://dev.to/spaisee/frontier-ai-agents-still-fail-more-than-one-third-of-everyday-tasks-3lh)
Tương tác: 2 reactions · 0 comments · 8 min read

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*