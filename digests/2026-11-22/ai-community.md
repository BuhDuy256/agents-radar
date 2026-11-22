# Bản tin AI từ cộng đồng công nghệ 2026-11-22

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-22 06:33 UTC

---

## Workflows
### ReptClip biến mọi trang chatbot miễn phí thành coding agent cho VS Code
Tác giả xây dựng ReptClip, một extension VS Code mã nguồn mở miễn phí, sao chép ngữ cảnh dự án vào clipboard để bạn dán vào bất kỳ chatbot miễn phí nào, rồi áp các code block từ chatbot trở lại file dưới dạng diff Search/Replace. Chọn ngữ cảnh hỗ trợ đường dẫn và glob pattern; v2.0 bổ sung lệnh `cat`, `grep` và `read-lines` để chatbot yêu cầu giữa cuộc trò chuyện. Diff áp dụng kiểu được hết hoặc không được gì, chỉ chạm vào file được git theo dõi, và có 10 mức undo riêng cho diff. Tác giả cho biết khoảng 1.500 dòng đóng góp bên ngoài đã gia cố cách xử lý symlink, `.git` và `.gitignore`. Cài từ VS Code Marketplace hoặc Open VSX.
Nguồn: [dev.to](https://dev.to/effessdev/a-vs-code-extension-to-turn-any-free-chatbot-website-into-an-ai-agent-kind-of-1n21)
Tương tác: 40 reactions · 42 comments · 7 min read

### Script Python 60 dòng đo token tool của bất kỳ MCP server từ xa nào
MCP server từ xa đưa tên, mô tả và input schema của mọi tool vào ngữ cảnh model ngay khi bắt đầu cuộc trò chuyện, và script này ước lượng chi phí đó. Nó chạy `initialize`, rồi `notifications/initialized`, rồi `tools/list` qua HTTPS POST, theo `nextCursor`, và xử lý cả phản hồi JSON thuần lẫn `text/event-stream`. Token được ước tính khoảng bốn ký tự JSON compact mỗi token, và script đánh dấu các tool có mô tả ngắn cùng tham số không có mô tả. Kết quả thực tế dao động từ ba tool của DeepWiki khoảng 426 token đến hai tool của Context7 khoảng 1.306 token. Tác giả lưu ý user agent mặc định `Python-urllib` bị trả 403, nên chỉ cần đặt `User-Agent` trung thực là hết.
Nguồn: [dev.to](https://dev.to/siftwright/how-many-tokens-do-your-mcp-tools-cost-measure-any-remote-mcp-server-in-60-lines-of-python-5h7d)
Tương tác: 1 reactions · 3 comments · 4 min read

### Hệ thống RAG kiểm chứng từng câu mất thông lượng khi quá tải
Tác giả xây lại một hệ thống RAG từ ba bài báo để mỗi câu được đối chiếu với đoạn trích dẫn trước khi hiển thị; bước kiểm chứng chạy song song lúc câu trả lời đang stream, và một câu không đạt sẽ dừng câu trả lời. Trong các đợt tải bình thường, câu đầu tiên được kiểm chứng xong đến ở mức trung vị 324,5 ms, so với 614,2 ms trước đó. Khi quá tải nặng, bản mới phục vụ được 62,8% yêu cầu so với 67,4% trước đây, tác giả cho rằng nguyên nhân là bộ kiểm chứng dừng phản hồi. Hệ thống dùng gói miễn phí của Groq với BM25 kết hợp embeddings, không có vector database, và tác giả cho biết yêu cầu chậm nhất mất 29,2 trong 29,8 giây để chờ quota thay vì xử lý.
Nguồn: [dev.to](https://dev.to/ayush_singh_9b0d83152be5b/I-made-my-rag-safer-it-got-worse-under-load-3olm)
Tương tác: 15 reactions · 4 comments · 7 min read

## Thử nghiệm và so sánh
### Quét 220.226 tool MCP gần như không thấy prompt injection nhưng lộ diện truy cập credential rộng
Serverdex quét định nghĩa tool từ 12.987 MCP server, tổng cộng 220.226 tool, vào ngày 21 tháng 11 năm 2026 để tìm chỉ dẫn cài cắm, ký tự ẩn và truy cập file nhạy cảm. Kết quả không có mô tả nào bảo model bỏ qua chỉ dẫn và không có ký tự zero-width; các trường hợp chạm file nhạy cảm đều vô hại khi kiểm tra, gồm cả scanner bảo mật mô tả những gì chúng phát hiện. Bản quét tìm thấy 3.053 server, tức 23,5%, có tool xử lý credential, token hoặc API key, cùng 188 server có shell hoặc thực thi code và 163 server đọc file cục bộ. Tác giả nói bản quét chỉ đọc mô tả, không đọc ý định hay hành vi lúc chạy, nên nó đo bề mặt tấn công chứ không đo độ an toàn.
Nguồn: [dev.to](https://dev.to/serverdex/i-scanned-220000-mcp-tool-descriptions-for-prompt-injection-the-scare-is-overblown-but-1-in-4-6pk)
Tương tác: 5 reactions · 16 comments · 3 min read

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*