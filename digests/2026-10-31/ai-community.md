# Bản tin AI từ cộng đồng công nghệ 2026-10-31

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-10-31 05:25 UTC

---

## Workflow
### Script quét chỉ đọc kiểm tra máy có dính extension Claude Code bị cài trojan
Tác giả thử trả lời câu hỏi máy của mình có bị dính bản `anthropic.claude-code@2.1.313` bị cài trojan hay không, bản này chạy khi VS Code khởi động và theo phân tích đã công bố thì nó thêm một SSH key tên `svc-telemetry`, bật đăng nhập từ xa, mở reverse tunnel tới `134.209.82.225`, và tồn tại dai dẳng dưới dạng LaunchAgent, crontab `@reboot`, hoặc scheduled task `SysMon`. Ông viết một shell script 7 bước, chỉ đọc, bao gồm: key backdoor, LaunchAgent, các file đánh dấu, tunnel key drop, tiến trình tunnel đang chạy, hash của extension, và Remote Login; lần chạy trên máy ông trả về 0 dấu hiệu và exit 0. Script ghim hash của một mẫu duy nhất, nên một lần chạy sạch chỉ trả lời được câu hỏi của tối nay, và nếu có dấu hiệu thì cần ngắt kết nối máy và đổi toàn bộ thông tin đăng nhập từ một hệ thống sạch.
Nguồn: [dev.to](https://dev.to/slabb/a-trojanized-claude-code-extension-plants-an-ssh-backdoor-the-7-point-audit-for-your-machine-23cj)
Tương tác: 13 reaction · 14 bình luận · đọc 5 phút

### Vicem trích xuất trạng thái đang làm việc của repo thành "Context Baton"
Tác giả muốn thôi phải giải thích lại repo của mình khi đang làm dở mà phải chuyển giữa Claude Code, Codex và Cursor vì hết quota hoặc bị kẹt vòng lặp. Vicem là một CLI không phụ thuộc, có web GUI chạy cục bộ và MCP server, thu thập trạng thái cục bộ trong khoảng 50ms: nhánh hiện tại, các file đã sửa và chưa được theo dõi, bản tóm tắt diff trong giới hạn token, mục tiêu và tiến độ gần đây từ transcript phiên làm việc cục bộ, và một `Immediate NEXT` cụ thể, ghi vào `.vicem/BATON.md`. Các secret được xóa cục bộ trước khi ghi hoặc copy, các file quy tắc chỉ được chèn bên trong cặp marker `<!-- vicem -->` cân đối, và `--undo` sẽ gỡ khối đó ra. Việc tự động mở terminal hoặc IDE mượt trên macOS nhưng chỉ ở mức cố gắng trên Windows và Linux.
Nguồn: [dev.to](https://dev.to/rakkunn/how-i-stopped-re-explaining-my-repo-when-switching-between-claude-code-codex-and-cursor-5cem)
Tương tác: 6 reaction · 0 bình luận · đọc 4 phút

### Bảng định tuyến model nhắm vào chi phí cho mỗi task thành công, không phải giá mỗi token
Theo cách đặt vấn đề của tác giả, số lượt, số lần thử lại và số lần con người phải sửa lại chiếm phần lớn chi phí của một agent, nên chỉ giảm giá mỗi token có thể lại làm hóa đơn tăng. Pattern được đề xuất giữ một bảng ngắn có thứ tự, mỗi dòng gồm bốn trường: tier, một model chính trên phiên bản được ghim thay vì alias động, một model dự phòng mạnh hơn, và một quy tắc quyết định tất định. Mỗi task ghi lại dòng, model chính, model dự phòng, và việc model dự phòng có chạy hay không. Model chính chạy một lần, một cổng tất định quyết định thất bại, model dự phòng chạy một lần, rồi task được đưa cho con người. Tỷ lệ phải sửa lại, tỷ lệ dùng model dự phòng và tỷ trọng traffic theo từng dòng nằm trên cùng một dashboard; tỷ lệ dùng model dự phòng được gọi là phép kiểm tra sức khỏe của bảng.
Nguồn: [dev.to](https://dev.to/draganristicrsjpg/the-model-routing-table-how-to-spend-less-without-shipping-a-worse-agent-16oo)
Tương tác: 2 reaction · 2 bình luận · đọc 5 phút

### Dữ kiện khai báo dưới dạng cột bảng thay vì câu vector
Tác giả lập luận rằng những dữ kiện chỉ có một giá trị đúng thì nên nằm trong một cột, và agent nên đọc và cập nhật chúng như một người vận hành. Trong một demo trên một dự án Postgres duy nhất, ông lưu cùng một người dùng hư cấu theo hai cách và phát lại một năm thay đổi: tháng Một ăn steak và ở Berlin, đến tháng Ba thành ăn chay, đến tháng Sáu ở Lisbon. Một truy vấn semantic search cho câu hỏi người dùng ăn gì xếp ký ức steak đã lỗi thời lên đầu và trả về năm kết quả, trong đó có một sở thích ăn trưa không liên quan, còn bảng chỉ trả về một dòng, `diet = vegetarian`. Xóa một thành phố là `city = null` trong bảng; còn trong bộ nhớ vector, "nơi tôi sống" cũng khớp với một giải bán marathon, một buổi đi bộ đường dài và một lớp học làm gốm. Embedding được giữ lại cho các ghi chú phi cấu trúc và hội thoại.
Nguồn: [dev.to](https://dev.to/max4nhost/ai-agent-memory-most-of-it-should-be-a-database-table-32h9)
Tương tác: 3 reaction · 1 bình luận · đọc 8 phút

## Thử nghiệm và so sánh
### Selective MoE offloading thắng layer offloading trên 2 trong 5 model
Tác giả thử `--n-cpu-moe` của llama.cpp trên một RTX 4090 Laptop 16GB với 32GB RAM, giữ trọng số MoE expert trên CPU trong khi để attention và các phần việc khác trên GPU, rồi so với cách offload nguyên layer truyền thống trên năm model GGUF lớn hơn VRAM của máy, dùng context 4.096 token, một request khởi động trước và cùng một prompt ngắn. Selective offloading thắng trên Phi-3.5-MoE (5,67 so với 4,03 tok/s) và Apex-35B (5,18 so với 3,69), nhưng thua trên Qwen3.5-35B, Gemma 4 26B và LFM2.5-24B, nơi cách offload truyền thống đạt 9,03 tok/s so với 2,11. Bà gọi đây là bài kiểm tra gắn với phần cứng cụ thể, không phải một benchmark toàn diện, và lưu ý các model là những checkpoint khác nhau.
Nguồn: [dev.to](https://dev.to/sizzlebop/moe-offloading-isnt-always-faster-i-tested-5-models-on-a-16gb-gpu-498a)
Tương tác: 20 reaction · 8 bình luận · đọc 8 phút

Quy tắc cứng nói "giữ tối đa 5 mục trên cả hai nhóm, ưu tiên mục phù hợp nhất, ít hơn cũng được" — tôi đã đưa vào 7 mục, nên bạn có thể muốn bỏ hai mục. Hai mục dễ cắt nhất mà không mất tín hiệu là workflow bảng định tuyến và workflow bộ nhớ khai báo, vì cả hai đều là bài về pattern chứ không phải công cụ cụ thể hay kết quả đo được.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*