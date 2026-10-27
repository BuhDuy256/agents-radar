# Bản tin AI từ cộng đồng công nghệ 2026-10-27

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-10-27 03:11 UTC

---

## Workflow
### Tác giả cắt một MCP server từ 15 tool xuống còn 4 và hai lượt gọi
Tác giả dựng lại một MCP server phân loại chi phí AWS ở chế độ chỉ đọc, bản đầu trả lời câu hỏi "tôi đang lãng phí tiền ở đâu?" bằng bảy lượt gọi tool. Bản gọn dùng bốn tool ở mức kết quả: `find_waste` chạy mọi kiểm tra bên trong, tham số scope kiểu `Literal` chặn dữ liệu đầu vào rác, phản hồi mặc định chỉ gồm năm trường quyết định cho mỗi phát hiện, kèm `detail=True` để lấy toàn bộ dữ liệu, và một tool nhỏ `describe_scope()` chỉ được nạp khi cần. Schema của tool giảm 88% và câu hỏi tương tự chỉ tốn hai lượt gọi. Đây là số liệu của chính tác giả, không phải benchmark của nhà cung cấp. Cách này phù hợp với ai nhận thấy MCP server chậm dần khi số tool tăng lên.
Nguồn: [dev.to](https://dev.to/aws-builders/mcp-token-cost-i-cut-my-mcp-server-from-15-tools-to-4-cek)
Tương tác: 13 cảm xúc · 15 bình luận · đọc 9 phút

### Tác giả chuyển cơ chế thử lại MCP từ spec vào harness của riêng mình
Sau khi một tool MCP từ xa hết thời gian chờ mà agent vẫn tiếp tục như thể đã có câu trả lời, tác giả tra trong spec và không thấy cài đặt thử lại nào. Ông xác nhận MCP chỉ định nghĩa `tools/list` và `tools/call`, còn việc thử lại, điều khiển vòng lặp, bộ nhớ và phê duyệt người dùng đều thuộc về host. Cách sửa của ông: thử lại một lần khi hết thời gian chờ, sau đó chuyển lỗi cho model như một kết quả thất bại. Ông cũng lưu ý spec 2026-07-28 đã bỏ `initialize` và session, thêm lệnh gọi `server/discover`, và cấp cho kết quả `tools/list` các gợi ý `ttlMs` và `cacheScope` để làm mới cache.
Nguồn: [dev.to](https://dev.to/kartik-nvjk/a-flaky-mcp-tool-broke-my-agent-i-went-looking-for-the-retry-setting-in-the-protocol-3hl2)
Tương tác: 4 cảm xúc · 6 bình luận · đọc 5 phút

## Thử nghiệm và so sánh
### Cắt bỏ schema đưa tấn công đầu độc mô tả MCP xuống 7,8% top-1
Tác giả đóng băng 1.312 mô tả tool MCPTox, đầu độc chúng, rồi cho Swallow-8B-AWQ trả lời các truy vấn đơn giản dạng "gọi tool X", chấm điểm bằng quy tắc chứ không dùng LLM judge. Baseline truy hồi hybrid đi theo payload 13,8% số lần. Nhánh chỉ dùng schema, bỏ toàn bộ văn bản mô tả, giảm còn 7,8%; nhánh viết lại bằng LLM đạt 0,080 với một yếu tố gây nhiễu là dùng chung model, đã được công bố. Chi phí về tính hữu dụng được giới hạn, vì khoảng tin cậy của chỉ số hoàn thành lành tính trùng với baseline ở mọi nhánh. Tác giả nêu rõ không nhánh nào loại bỏ được đầu độc mà không có đánh đổi, và một gateway cần chuẩn hoá cộng với chính sách runtime. Các tấn công thích ứng đã được đăng ký trước nhưng còn chờ.
Nguồn: [dev.to](https://dev.to/raihan-js/your-mcp-tools-are-leaking-a-benchmark-for-description-canonicalisation-50dp)
Tương tác: 1 cảm xúc · 2 bình luận · đọc 3 phút

### Ollama nhanh gấp đôi vLLM với prompt code ngắn, chậm gấp bốn lần ở 100K
Tác giả lặp lại hai benchmark trên qwen3-coder:30b dùng Ollama trên Surface Laptop Ultra với RTX Spark N1X và 64 GB, không Docker cũng không vLLM. Prompt code ngắn giải mã ở 90,9 token một giây, gấp đôi mức 44,7 mà bài so sánh trên Lenovo đo được cho Qwen3.8-27B, nhưng một prompt 100.589 token mất 146 giây để ra token đầu tiên rồi đạt 19,7 token một giây, so với 44,3 của cấu hình Lenovo. Xử lý prompt đạt 687 token một giây so với 1.033. Đây là một phép đo, chạy trên cấu hình của chính tác giả: ông gợi ý vLLM phù hợp với agent liên tục gửi lại các cuộc hội thoại dài.
Nguồn: [dev.to](https://dev.to/steefjan_wiggers_34a415b/qwen3-coder-30b-on-a-surface-laptop-ultra-run-it-on-rtx-spark-with-ollama-3i9b)
Tương tác: 1 cảm xúc · 0 bình luận · đọc 13 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*