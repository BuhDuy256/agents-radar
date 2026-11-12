# Bản tin AI từ cộng đồng công nghệ 2026-11-12

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-12 07:00 UTC

---

## Workflows

### Eval gate chặn pull request khi câu trả lời của agent xuống dưới 4/5
Tác giả thêm eval gate vào một agent đã scaffold để điểm số không đạt sẽ chặn merge. Agents CLI v1.13.0 kết thúc `eval run` bằng `RESULT: PASS` hoặc `RESULT: FAIL`, và khi trượt ngưỡng hoặc có case lỗi thì thoát với mã 1, mà CI vốn đã coi là thất bại. Tác giả chạy `agents-cli eval run --fail-under custom_response_quality=4`, rồi cố tình phá instruction của agent; unit test placeholder vẫn pass trong khi eval fail. Bước GitHub Actions chạy `uvx google-agents-cli eval run`, và muốn đánh dấu job `test` là required thì phải xóa block `paths:` của workflow. Ba eval case là một gate còn nhỏ.
Nguồn: [dev.to](https://dev.to/googlecloud/use-your-eval-as-a-ci-gate-with-agents-cli-1ha1)
Tương tác: 9 reactions · 3 comments · 6 min read

### Kiro CLI review pull request trong GitHub Action và đăng một comment
Một Developer Advocate tại AWS dựng job CI để Kiro CLI review từng diff của pull request và đăng review dưới dạng comment trên PR. Agent là một file Markdown trong `.kiro/agents/` với `tools: ["read"]` và các quy tắc deny cho ghi file, shell và web fetch. Workflow cài Kiro CLI, diff với base branch, giới hạn diff ở 150 KB, pipe vào `kiro-cli chat --v3 --no-interactive`, rồi đăng bằng `gh pr comment --edit-last --create-if-none`. PR từ fork bị bỏ qua vì không nhận được secrets. Tác giả gợi ý chỉ để nó comment trước khi cho phép chặn merge.
Nguồn: [dev.to](https://dev.to/erikch/how-to-review-pull-requests-with-kiro-cli-and-github-actions-1b9b)
Tương tác: 14 reactions · 2 comments · 6 min read

## Experiments and comparisons

### State giữ trên host đạt 1.500/1.500 bước chính xác, trong khi chat giữ lịch sử trượt từ lượt 223
Tác giả so sánh một chat gửi lại toàn bộ lịch sử mỗi bước với AXI, cách giữ state của job trên host và gửi prompt ngắn mới mỗi bước. Qua 1.500 bước, prompt trung bình của chat giữ lịch sử là 476.835 token, đỉnh 949.591, so với 2.824 token của state giữ trên host, nhỏ hơn khoảng 169 lần. Tác giả báo cáo 1.500/1.500 bước chính xác, so với chat trượt từ lượt 223, và chi phí mỗi bước đúng thấp hơn 4,5 lần. Giới hạn: đây là những job cụ thể trên Gemini 3.8 Flash và Qwen, và việc sửa lỗi chỉ áp dụng được khi có quy tắc rõ ràng.
Nguồn: [dev.to](https://dev.to/shalendra_gaur_ecd0567a49/your-llm-agent-re-reads-its-history-every-step-we-measured-what-that-costs-jjg)
Tương tác: 3 reactions · 5 comments · 3 min read

### OpenAI cho biết Control Room dừng output của model nghiên cứu trong vòng 35 giây
OpenAI cho biết họ đã triển khai Control Room trên toàn bộ hạ tầng nghiên cứu, một hệ thống trung tâm có thể dừng output của model trong vòng 35 giây sau quyết định tạm dừng hoặc hủy job. Một workload yêu cầu job ID, gắn ID đó vào mọi inference request, và inference engine kiểm tra ID với dịch vụ trung tâm trước khi sinh output. Bước kiểm tra nằm ngoài code của chính experiment, nên việc tắt không phụ thuộc vào việc workload có thực hiện lệnh hay không. Nếu Control Room không khả dụng, inference request bị từ chối. Công ty cho biết độ trễ 35 giây đến từ quyền được cache và họ muốn giảm nó.
Nguồn: [dev.to](https://dev.to/the_daily_flare/openai-deploys-control-room-to-halt-research-ai-output-within-35-seconds-feh)
Tương tác: 3 reactions · 1 comment · 3 min read

## Not included

**Your Agent Needs a Schema, Not a Better Prompt** (frank coyle, dev.to) — Không có nội dung, và hai tiêu đề của digest yêu cầu một bản tường thuật về những gì đã thử hoặc đã xây, nên nó bị bỏ ra thay vì viết thêm cho đủ.
Nguồn: [dev.to](https://dev.to/dailycontext/your-agent-needs-a-schema-not-a-better-prompt-53bm)

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*