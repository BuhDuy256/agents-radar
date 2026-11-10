# Bản tin AI từ cộng đồng công nghệ 2026-11-10

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-10 07:06 UTC

---

## Thử nghiệm và so sánh

### Một thử nghiệm prompt-injection 125 lượt trên một agent cho thấy lỗ hổng nằm ở bài test, không phải ở lớp phòng thủ
Tác giả chạy 125 cuộc tấn công prompt-injection (25 kiểu tấn công, mỗi kiểu 5 lượt) nhắm vào GAWE, một engine trong đó một model đọc không có công cụ trích xuất phát hiện, một planner riêng biệt không bao giờ thấy tài liệu, và một policy engine YAML mặc định từ chối. Model không bị lừa trong 122 lượt quyết định được và không bước tấn công nào chạy trong 125 lượt, nhưng vì model chống lại, nên policy, phê duyệt và kiểm tra kế hoạch chưa bao giờ được kích hoạt. Lần chạy lại ngày 10 tháng 11 với các model được lập trình để bị lừa cho qua 10 trong 38 bước tấn công, tất cả đều được policy bằng văn bản cho phép. Giới hạn: tác giả tự viết và cố định các cuộc tấn công, và CUAD có thể nằm trong dữ liệu huấn luyện.
Nguồn: [dev.to](https://dev.to/riadgaffar/i-ran-125-prompt-injection-attacks-on-my-ai-agent-none-got-through-and-that-wasnt-the-4ib6)
Tương tác: 4 reactions · 36 bình luận · đọc 6 phút

### Một bản dựng lại PHP bằng Rust vượt qua các bài test WordPress nhưng chậm hơn PHP từ 2,4× đến 4,6×
Tác giả đọc hai bản chuyển ngữ do AI viết: php-rust, khoảng 155K dòng Rust dựng lại PHP 8.5, và ts-rust, một bản chuyển TypeScript compiler sang Rust. Theo chính COVERAGE.md của php-rust, nó khớp với PHP thật trên 30.472 bài test lõi WordPress cùng Composer, PHPUnit, Doctrine và Symfony http-kernel, nhưng benchmark của chính tác giả cho thấy CPU time gấp 2,4× đến 4,6× PHP và 1,77× trên bộ test WordPress. Thử Laravel nhiều khả năng sẽ lỗi ngay lúc khởi động vì chỉ 1 trong 64 hàm openssl_* của PHP tồn tại. Đây là một người đọc repo; không có gì được build hay chạy.
Nguồn: [dev.to](https://dev.to/ttebify/people-are-rebuilding-whole-languages-in-rust-with-ai-im-still-asking-why-59k)
Tương tác: 3 reactions · 3 bình luận · đọc 3 phút

## Workflow

### Một khảo sát operator biến ý tưởng định danh agent không dùng key thành JWT có thu hồi nhanh
Tác giả đề xuất định danh mật mã riêng cho từng agent đối với các MCP server, rồi hỏi những operator vận hành chúng xem họ cần gì. Phần lớn thiết kế ban đầu thất bại: một agent ID miễn phí, tự tạo không ngăn được lạm dụng, nhiều operator đã thu hồi theo key người dùng, và ba builder từ chối một ví credential được host. Thứ thay vào đó là một JWT nhàm chán từ một issuer mà server xác minh dựa trên JWKS công khai, với danh sách agent-ID đã thu hồi được cache tối đa 60 giây cho thao tác đọc và kiểm tra trực tiếp cho thao tác ghi, cộng thêm các scope riêng cho gửi, xóa và chi tiêu. Triển khai trước hết ở chế độ chỉ quan sát, ghi log token mà không chặn. Tác giả đang tìm một hoặc hai operator của server ghi chú, bộ nhớ hoặc tài liệu để thử trên các công cụ đọc, khoảng 30 phút với một snippet và hai cài đặt.
Nguồn: [dev.to](https://dev.to/zachbenson/per-agent-tokens-for-mcp-servers-what-operators-told-me-and-the-design-that-came-out-of-it-40ml)
Tương tác: 8 reactions · 15 bình luận · đọc 3 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*