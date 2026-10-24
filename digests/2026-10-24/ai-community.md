# Bản tin AI từ cộng đồng công nghệ 2026-10-24

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-10-24 01:01 UTC

---

## Workflows
### Hai công cụ backend cho phép agent chạy deep research đã được phê duyệt
Tác giả muốn một agent nghiên cứu một quyết định kỹ thuật mà không để model kiểm soát ngân sách hay định danh tác vụ. Dùng Vercel AI SDK và Valyu DeepResearch trong TypeScript, ứng dụng gửi một brief cố định cho bài toán tìm kiếm ticket hỗ trợ giữa PostgreSQL và Elasticsearch, lưu task ID trả về, rồi lấy báo cáo có trích dẫn và các bản ghi nguồn sau đó. Hai công cụ, `start_deep_research` và `get_deep_research_status`, không nhận tham số nào từ model; brief giới hạn tìm kiếm web trong `postgresql.org` và `elastic.co` và đặt rõ mode `fast`. Bài hướng dẫn nói rằng cách này thu hẹp nguồn bằng chứng nhưng không đảm bảo lấy được mọi trang liên quan hay mọi khẳng định đều đúng.
Nguồn: [dev.to](https://dev.to/valyuai/how-to-integrate-deep-research-into-your-ai-agent-2n82)
Tương tác: 7 reactions · 2 comments · 15 min read

## Experiments and comparisons
### Cùng trọng số, số học engine khác nhau lật ngược đáp án gsm8k
Tác giả chạy DeepSeek-R1-Distill-Qwen-7B Q8_0 greedy trên 600 bài gsm8k, đổi qua lại giữa hai engine chạy cùng trọng số nhưng số học khác nhau. Phần lớn nội dung câu trả lời thay đổi và tính đúng sai lật ngược ở 53 bài — 25 bài thành sai, 28 bài thành đúng, thay đổi ròng là 3. Một lần chạy riêng trên server llama.cpp với tám request đồng thời khác với chạy từng cái một ở 41 trong 100 bài gsm8k, đẩy strict-match từ 0.83 xuống 0.82. Tác giả cho rằng nguyên nhân là thứ tự rút gọn số dấu phẩy động thay đổi theo batching, prompt cache và speculative decoding, chứ không phải temperature hay seed. Giới hạn: kết quả phụ thuộc vào model, GPU và bản build, nên hãy so từng output thay vì so điểm.
Nguồn: [dev.to](https://dev.to/moca_fd0227eb23c29ea2d065/why-your-local-llm-gives-different-answers-at-temperature-0-32jn)
Tương tác: 4 reactions · 4 comments · 8 min read

### Chiến lược memory, không phải độ chính xác, quyết định hóa đơn token qua 30 lượt
Tác giả benchmark ba chiến lược memory trên cùng một bài toán chuỗi suy luận 30 lượt với GPT-4o, dùng giá tháng 6 năm 2024 ($5/M input, $15/M output). Full context đạt độ chính xác 0.94 với $0.1122; selective recall (window 4) đạt 0.91 với $0.0486; retrieval-augmented external memory (top_k 4) đạt 0.84 với $0.0434. Full recall làm chi phí tăng khoảng gấp ba để đổi lấy một chút độ chính xác, và theo tác giả thì không bền vững qua 20–30 lượt, trong khi external memory là cách duy nhất giữ chi phí ổn định khi phiên dài ra. Bộ test tái lập được qua repo của tác giả; so sánh này chỉ là một bài toán trên một model, nên không chứng minh một chiến lược là tốt nhất nói chung.
Nguồn: [dev.to](https://dev.to/priyeshdave6/token-cost-is-the-real-bottleneck-in-agentic-ai-an-empirical-test-of-agent-memory-strategies-3o3d)
Tương tác: 2 reactions · 3 comments · 4 min read

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*