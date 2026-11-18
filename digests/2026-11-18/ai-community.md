# Bản tin AI từ cộng đồng công nghệ 2026-11-18

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-18 07:12 UTC

---

## Workflows

### Tác giả thêm cổng Python tất định từ chối pull request của agent thiếu bằng chứng
Tác giả xây dựng một cổng bằng chứng kiểm tra pull request do agent tạo trước khi người thật review, dùng Amazon Nova Pro làm job Kiro Crew trên một repo GitHub đã fork với bug được cài sẵn. Cổng chạy năm kiểm tra: quét sửa đổi trái phép, API công khai còn nguyên, không regression, test phải fail trước, và đối chiếu lời khai với bằng chứng. Ở lần chạy đầu, Nova Pro khai đã sửa một lỗi nhưng làm hỏng một test gốc; cổng đăng "REJECTED. 1 fix claimed, 0 verified." Với phản hồi từ cổng và chọn best-of-3 qua tối đa 4 vòng, cùng PR đó được đánh dấu "TRUSTED." Trên 8 lỗi được cài sẵn, chế độ one-shot đạt 4. Dùng khi agent mở PR mà bạn phải xác minh.
Nguồn: [dev.to](https://dev.to/aws-builders/ai-agents-open-17-million-pull-requests-a-month-i-built-a-gate-that-rejects-the-ones-that-lie-46n7)
Tương tác: 30 reactions · 18 comments · 6 min read

### Tác giả phân biệt số lần thử thao tác với số dòng JSONL bằng fixture của AgentInspect
Tác giả dùng AgentInspect 6.31.35 với một thao tác đọc tổng hợp để cho thấy đếm số dòng trace chỉ bằng số lần thử nếu bạn định nghĩa identity trước. Fixture ghi lại hai lần thử của một thao tác logic với các giá trị attemptId khác nhau, rồi kiểm tra hai contract: maxAttempts 1 fail, maxAttempts 2 pass. Một test đi kèm thêm đúng bản ghi terminal được gửi lại; cả hai contract vẫn cho cùng kết quả, cho thấy bản trùng khớp hoàn toàn không được tạo ra thêm một lần thử. Trường hợp tái sử dụng xung đột là chuyện riêng. Dùng khi số lần retry phải đọc từ bằng chứng trace.
Nguồn: [dev.to](https://dev.to/gde/count-attempts-not-jsonl-rows-2pn2)
Tương tác: 15 reactions · 2 comments · 4 min read

## Experiments and comparisons

### Cổng regression prompt chặn bản sửa gọn gàng làm giảm một nửa độ chính xác hoàn tiền
Tác giả xây dựng một cổng regression prompt và thử sáu phiên bản prompt trên 16 case với Llama 3.2 3B, Qwen 2.5 1.5B và Gemma 3 1B qua Ollama trên RTX 4060, ghi lại 1.710 câu trả lời. Một bản sửa "gọn gàng" đưa điểm tổng từ 84,2% xuống 80,0% nhưng làm quy tắc hoàn tiền sụp từ 10/10 đúng xuống 3/10; các quy tắc theo từng case đã chặn nó. Trên Llama, hai trong bốn thay đổi pass và hai bị chặn; mọi thay đổi đều bị chặn trên Qwen và Gemma vì baseline của chúng vốn đã fail các quy tắc tiền. Quy tắc token cũng chặn một bản sửa hợp lệ. Chỉ model nhỏ, 16 case, grader dựa trên chuỗi.
Nguồn: [dev.to](https://dev.to/aws-builders/prompt-regression-testing-for-llm-apps-a-free-ci-gate-tested-on-3-real-models-1n22)
Tương tác: 6 reactions · 2 comments · 23 min read

### Tác giả phát hiện cộng span ngây thơ làm đôi số token của agent lên 101.464
Tác giả trace một agent phân loại sự cố ba bước và cộng mọi span mang usage, ra 101.464 token; chỉ riêng span LLM đã là 50.732, vì span của agent lặp lại các span con. Cách sửa là quy tắc leaf: chỉ đếm một span nếu nó mang usage và không span nào bên dưới cũng mang. Lần gọi đầu dùng 1.078 token, lần gọi ở bước 3 dùng 16.610, không lần gọi nào trả về quá 61 output token. Bước 2 chiếm 77,9% chi phí lượt chạy, và một lần retry trúng prompt cache ở 16.384 trong 16.486 token. Số token ở đây là tổng hợp, ước lượng từ kích thước request.
Nguồn: [dev.to](https://dev.to/kartik-nvjk/i-summed-every-span-in-my-agent-trace-the-token-count-came-out-exactly-double-3ddh)
Tương tác: 7 reactions · 1 comments · 4 min read

### Structured prompt contract làm thay đổi quy tắc thành diff thay vì sửa văn xuôi
Tác giả cho rằng spec của một semantic node nên được version hóa và validate như schema API, gọi là structured prompt contract, với bốn trường: role, hard constraints, I/O contract, và fallback rules. Giới hạn 200 của agent hoàn tiền âm thầm thành 500 trong một pilot VIP và không bao giờ được hạ lại; một khoản hoàn tiền 340 sau đó pass mà không có phê duyệt, và không bản ghi lượt chạy nào cho thấy phiên bản quy tắc nào đang chạy. Mỗi constraint có một id, predicate, đích on_fail, và lý do, nên đổi phiên bản là một diff trên các predicate. Tác giả không đưa ra thử nghiệm nào cho cách làm này, và lưu ý nó không sửa được lỗi phán đoán hay quyết định ngưỡng đúng.
Nguồn: [dev.to](https://dev.to/tokenlat/your-prompt-contract-should-fail-a-test-before-your-agent-does-mod)
Tương tác: 10 reactions · 6 comments · 6 min read

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*