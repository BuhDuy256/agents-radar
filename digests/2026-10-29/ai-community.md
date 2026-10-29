# Bản tin AI từ cộng đồng công nghệ 2026-10-29

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-10-29 05:36 UTC

---

## Workflows
### Replay của một agent BI 286K token đã giảm sau khi cắt gọt và rút gọn công cụ
Tác giả đã cắt token đầu vào cho một agent BI vốn tiêu tốn khoảng 17.070 token cho hướng dẫn và 36 khai báo công cụ trước cả khi có câu hỏi, và 286.522 token đầu vào trải qua mười lần gọi model trong một replay offline ba câu hỏi. Ông xây một bench năm kịch bản có kiểm tra chất lượng, bỏ mười công cụ mà agent không bao giờ gọi (từ 36 xuống 26, lần gọi đầu từ 17.070 xuống 13.598), nén các kết quả công cụ cũ trong khi giữ nguyên lượt hiện tại, và sắp xếp bảng schema theo thứ tự xác định. Việc cắt gọt kết quả cũ tiết kiệm 21–26%; giảm số vòng lặp cắt 41% ở một câu hỏi thực. Áp dụng điều này khi agent của bạn gửi lại các kết quả công cụ lớn mỗi lượt.
Nguồn: [dev.to](https://dev.to/anis_meziani_52aab42304a8/how-to-cut-your-ai-agents-input-tokens-what-worked-what-failed-and-a-bench-to-measure-yours-f90)
Tương tác: 16 reaction · 11 bình luận · đọc 25 phút

### Mô tả công cụ cho agent biết khi nào không nên gọi công cụ
Tác giả giải thích rằng agent chỉ chọn công cụ từ tên, mô tả và input schema của công cụ — nó không bao giờ thấy code — và cho rằng hầu hết mô tả công cụ được viết quá qua loa. Với một dịch vụ thuê xe đạp hư cấu, ông đối chiếu một công cụ `book` yếu với `rental_book_bike`, mà bốn câu của nó nêu rõ nó làm gì, giới hạn 14 ngày, khi nào chỉ dùng sau khi người dùng xác nhận, rằng ID xe đạp phải đến từ `rental_search_bikes`, và rằng cùng một `requestKey` không bao giờ đặt hai lần. Mô tả tham số và thông báo lỗi chỉ ra cách sửa cũng là một phần của thiết kế. Dùng điều này khi agent gọi sai công cụ hoặc truyền ID bịa ra.
Nguồn: [dev.to](https://dev.to/sascha-ms/how-to-write-tool-descriptions-for-ai-agents-5fd1)
Tương tác: 4 reaction · 4 bình luận · đọc 18 phút

## Experiments and comparisons
### Định nghĩa công cụ của một Apify Actor tốn 32.737 token
Tác giả ghim 20 Actor tìm việc trên MCP server Apify được host, từng cái một, và đọc payload `tools/list`, đếm token bằng `o200k_base` của tiktoken (đây là thang đo, không phải hóa đơn, vì tokenizer của Claude không công khai). Chi phí token mỗi công cụ dao động từ 2.139 đến 32.737, trung vị 3.829; lớn nhất là 32.136 token output schema do server suy ra từ kết quả của Actor so với 406 token input schema do tác giả viết. Ghim một Actor vẫn thêm 3.788 token công cụ phụ trợ — khoảng một nửa mức trung vị. Mô tả thì rẻ, 43–107 token.
Nguồn: [dev.to](https://dev.to/kevinhall/mcp-tool-cost-20-job-actors-on-apify-21k-to-327k-tokens-each-1hm4)
Tương tác: 6 reaction · 10 bình luận · đọc 11 phút

### Đảo thứ tự trường prompt khiến một policy đóng băng rơi từ 85,0% xuống 19,2%
Một bài báo mới của Jian Mu, Ruibo Shen và Yao Shu (arXiv:2610.37255) lập luận rằng so sánh harness trên model đóng băng trộn lẫn hai thứ: trần của harness và mức phạt do lệch pha của một policy được post-train trên harness khác. Trên MiniWoB++, đảo thứ tự trường observation, trong khi mọi action vẫn hợp lệ, khiến một policy đóng băng rơi từ 85,0% xuống 19,2%. Trên Terminal-Bench Lite, năm harness lập trình xếp hạng theo độ chính xác giống như theo ước lượng trần trừ mức lệch pha. Khuyến nghị của các tác giả: thích ứng checkpoint theo từng harness hoặc ước lượng trần riêng. Bằng chứng dựa trên những setup đã thử này, không phải mọi harness.
Nguồn: [dev.to](https://dev.to/reidmarlow/why-changing-an-agent-harness-breaks-frozen-models-3imb)
Tương tác: 6 reaction · 4 bình luận · đọc 3 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*