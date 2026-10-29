# Bản tin AI từ cộng đồng công nghệ 2026-10-30

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-10-29 16:21 UTC

---

## Workflows
### Thêm một lượt falsifier vào work order bắt được 90% lỗ hổng bàn giao
Tác giả thử chuyển review lên trước bàn giao vì 90% việc làm lại đến từ work order mơ hồ, không phải lỗi của người làm. Họ phân loại 61 mục "must fix" trong 10 order: 55 mục là lỗ hổng khi order không nói rõ cần làm gì. Họ thêm một lượt falsifier dùng Sonnet — model chỉ đọc order và repo, trả về tối đa 7 phát hiện đã xếp hạng kèm dòng trích dẫn và input gây lỗi. Hai lượt chạy bắt được 39 trong 55 lỗ hổng (71%), mỗi lượt tốn khoảng $0.07 và 34 giây. Hãy áp dụng bước này trước khi gửi order triển khai cho một coding agent.
Nguồn: [dev.to](https://dev.to/lizhuojunx86/90-of-my-coding-agents-rework-came-from-my-own-work-orders-51n4)
Tương tác: 3 reactions · 3 comments · đọc 5 phút

### Giữ model pin trong một registry, đừng rải rác khắp các call site
Tác giả cho rằng nâng cấp model cần được kỷ luật như schema migration. Đặt snapshot có ngày vào một registry duy nhất, khóa theo tên tác vụ logic, versioned trong git, kèm prompt hash và schema version trong cùng bản ghi. Ship một reader chấp nhận cả định dạng output cũ lẫn mới trước khi đổi pin. Kiểm tra `finish_reason == "stop"` trước khi parse để bắt truncation. Đánh version cho embedding index theo tên model, vì vector từ các thế hệ khác nhau không so sánh được. Giới hạn: đây là pattern đề xuất, không phải kết quả đã kiểm nghiệm.
Nguồn: [dev.to](https://dev.to/dima_kruglov_608741d9a416/treat-a-model-upgrade-like-a-schema-migration-49gm)
Tương tác: 2 reactions · 0 comments · đọc 5 phút

### Kiểm tra cited_text bắt được những con số mà URL hợp lệ bỏ sót
Sau khi tự mở 56 liên kết từ ba lần quét, tác giả tìm ra ba lỗi: một con số thị trường ("32 triệu hộ gia đình") không nguồn nào xác nhận, một trang khiếu nại bị liệt kê là website đối thủ, và một bài blog bị coi là đối thủ. URL hợp lệ chỉ chứng minh trang tồn tại, không chứng minh trang chứa con số được nêu. Cách sửa: giữ đoạn `cited_text` mà search API đã trả về, rồi yêu cầu mọi con số trong một câu về thị trường phải xuất hiện trong đoạn trích đó. Giới hạn: đoạn trích dài 150 ký tự là ngắn, và nguồn có thể làm tròn khác đi.
Nguồn: [dev.to](https://dev.to/evpaula/my-llm-pipeline-cited-real-urls-for-numbers-those-pages-never-said-kgf)
Tương tác: 1 reactions · 2 comments · đọc 6 phút

## Thử nghiệm và so sánh
### Hai lượt falsifier bắt được nhiều lỗ hổng order hơn một lượt, mỗi lượt $0.07
Tác giả chạy falsifier hai lần trên cùng 10 work order để kiểm tra độ tin cậy. Lượt 1 bắt được 33 trong 55 lỗ hổng order (60%), lượt 2 bắt được 31 (56%), cả hai lượt cùng bắt được 25, và một trong hai lượt bắt được 39 (71%). Hai lượt tốn tổng cộng khoảng $0.14. Để so sánh, một order làm lại hai vòng dùng khoảng 9M token so với 3.6M cho một vòng, cộng thêm một lần review và khoảng 20 phút thời gian thực. Giới hạn: đây là thiết lập của một người trên 10 order, và judge với falsifier dùng chung một họ model.
Nguồn: [dev.to](https://dev.to/lizhuojunx86/90-of-my-coding-agents-rework-came-from-my-own-work-orders-51n4)
Tương tác: 3 reactions · 3 comments · đọc 5 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*