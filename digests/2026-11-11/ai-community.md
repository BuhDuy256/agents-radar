# Bản tin AI từ cộng đồng công nghệ 2026-11-11

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-11 05:58 UTC

---

## Workflow
### Tạo một agent Strands, thêm công cụ có sẵn, rồi tự viết công cụ của bạn
Tác giả hướng dẫn từng bước tạo một AI agent bằng Strands Agents, SDK mã nguồn mở cho Python và TypeScript. Ba bước: gán system prompt cho model Amazon Bedrock để nó đóng vai quản trò; thêm công cụ có sẵn `http_request` và trỏ prompt vào API luật giả tưởng Open5e — model tự gọi API này để lấy tầm bắn và sát thương 8d6 của phép Fireball; sau đó định nghĩa một công cụ tùy chỉnh để gieo xúc xắc thật. Log gỡ lỗi hiển thị từng bước, kể cả `tool_count=` trước khi có công cụ. Cần Python, uv và thông tin xác thực AWS có quyền truy cập Bedrock.
Nguồn: [dev.to](https://dev.to/aws/once-upon-agentic-ai-part-1-create-your-own-agent-and-forge-its-tools-with-strands-agents-22mo)
Tương tác: 23 reaction · 3 bình luận · đọc 8 phút

### Cập nhật mọi coding agent trên máy Linux bằng một lệnh
Tác giả viết bộ script Bash `update-agents`, đưa Claude Code, OpenAI Codex CLI và CLI, hub, IDE của Antigravity lên bản mới nhất trong một lần chạy. `--check` báo phiên bản đã cài và không thay đổi gì; mỗi script riêng cho từng agent có thể chạy độc lập; installer lỗi được ghi lại và các phần còn lại tiếp tục, với exit 1 nêu tên lỗi. Bản cài hub và IDE dạng tarball không tự cập nhật được, nên `agy-update` đọc kênh phát hành, so sánh phiên bản bằng `sort -V`, tải về, xác minh sha256 khi có công bố, rồi hoán đổi bản sao đã chuẩn bị, giữ bản cũ làm `.prev`.
Nguồn: [dev.to](https://dev.to/xbill/coding-agent-updater-the-tool-you-didnt-know-you-needed-45pc)
Tương tác: 2 reaction · 0 bình luận · đọc 7 phút

## Thử nghiệm và so sánh
### RAG đưa model 8B chạy cục bộ từ 1/10 lên 9/10 ở câu hỏi KEDA
Tác giả thử OzAI, một stack Qwen3 8B tự host trên MacBook Pro 16 GB, với 10 câu hỏi KEDA khắt khe, chấm theo các từ khóa bắt buộc. Không có RAG, nó trả lời đúng 1 câu, tự bịa `lagThreshold` của Kafka là 1000 trong khi tài liệu ghi 10. Một script RAG 160 dòng viết tay trên 165 đoạn tài liệu KEDA đạt 6/10; chia đoạn nhỏ hơn không thay đổi gì, thêm điểm từ khóa vào cosine (tìm kiếm hybrid) đạt 8/10. Hai câu sai cuối trông như lỗi suy luận, nhưng model vẫn sai khi bật chế độ thinking, mất 27 và 41 giây. Năm câu hỏi mỗi cấu hình không đủ để chứng minh tìm kiếm hybrid nói chung tốt hơn mọi phương pháp khác.
Nguồn: [dev.to](https://dev.to/ozy31/rag-took-my-local-llm-from-110-to-910-the-last-bugs-werent-the-model-1df6)
Tương tác: 1 reaction · 1 bình luận · đọc 9 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*