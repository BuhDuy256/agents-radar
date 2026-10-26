# Bản tin AI từ cộng đồng công nghệ 2026-10-26

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-10-26 04:34 UTC

---

## Workflow
### Một verifier biến README do AI viết của một repo thành hàng đợi review gồm 47 claim
Tác giả xây Doxify, một CLI chạy cục bộ, biên dịch một git repository thành các evidence card, cho Gemma viết chỉ từ những card đó, rồi để một verifier tất định quyết định câu nào được giữ. Kết quả tác giả báo cáo trên `nextjs-dashboard`: 13 trong 47 claim được xác minh, 34 bị gắn cờ `[needs evidence]`, không câu nào bị loại. 34 cờ đó chính là hàng đợi review, không phải thất bại. Doxify chạy trên laptop 8 GB chỉ dùng CPU với `gemma3:1b` qua Ollama, không cần API key và không upload; trình cài đặt tạo một môi trường `uv` tách biệt và chạy `doxify self-check`. Dùng khi bạn đã ship một repo nhưng chưa giải thích nó.
Nguồn: [dev.to](https://dev.to/ekomjah/a-1b-gemma-wrote-47-claims-about-a-repo-my-verifier-let-13-through-1ofg)
Tương tác: 5 reaction · 0 bình luận · đọc 14 phút

## Thử nghiệm và so sánh
### Đổi Responses API sang Chat Completions nâng tỷ lệ trích dẫn của một agent
Tác giả chạy một loạt thử nghiệm đăng ký trước, mỗi lần đổi một thứ, trên một framework agent, so sánh tỷ lệ sống sót của trích dẫn (CSR) trên cùng 127 câu hỏi với khoảng bootstrap ghép cặp từng câu. Cấu hình gốc đạt 0.333 khi chạy lại so với 0.323 đã công bố, nên hiệu ứng lặp lại được. Đặt temperature bằng 0 cho +0.082, không có ý nghĩa thống kê; mô tả công cụ MCP được khuyến nghị không tạo hiệu ứng. Đổi SDK từ Responses API sang Chat Completions nâng CSR lên 0.533, tức +0.108 có ý nghĩa thống kê, giảm số câu trả lời thiếu `[url]` từ 54 xuống 18. RAG một lượt đạt 0.618 để tham chiếu. Thử nghiệm dừng khi hết credit OpenAI.
Nguồn: [dev.to](https://dev.to/ayanarshad02/one-agent-framework-seemed-to-lose-half-its-citations-most-were-just-reformatted-2h1l)
Tương tác: 1 reaction · 0 bình luận · đọc 13 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*