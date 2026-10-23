# Báo cáo theo dõi nội dung chính thức của AI 2026-10-23

> Quét đầy đủ đầu tiên | Nội dung mới: 50 bài | Tạo lúc: 2026-10-23 07:53 UTC

Nguồn dữ liệu:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 25 bài mới (sitemap tổng: 480)
- OpenAI: [openai.com](https://openai.com) — 25 bài mới (sitemap tổng: 1082)

---

# Báo cáo cập nhật AI — 2026-10-23

## Thay đổi chính

Hai mục của Anthropic thay đổi quyền truy cập hoặc năng lực cho người dùng Claude Code; trang của OpenAI là lần thu thập đầu tiên và không có nội dung bài viết đọc được, nên chưa thể xác nhận thay đổi nào ở đó.

- **Agent Skills giờ do một tổ chức trung lập quản lý.** Anthropic đã trao chuẩn Agent Skills cho Agentic AI Foundation (AAIF) thuộc Linux Foundation. Agent Skills là một thư mục chứa tệp `SKILL.md` dạy agent một tác vụ. Công ty cho biết hơn 70 nền tảng agent, gồm GitHub Copilot và VS Code, đã tích hợp chuẩn này, với 1 triệu skill được công bố và gần 280 triệu lượt cài đặt. Chuẩn vẫn mở và trung lập về nhà cung cấp.
- **Claude giờ viết chứng minh hình thức cho code thật.** Phối hợp với Theorem, Anthropic cho biết Claude đã chứng minh các thuộc tính bảo mật ở mức hợp ngữ RISC-V trong hơn 100 thư viện mã nguồn mở thực tế, và tìm ra lỗi đã tồn tại qua nhiều năm kiểm thử. Công ty gọi đây là lần đầu tiên AI được dùng quy mô lớn cho kiểm chứng hình thức ở mức hợp ngữ. Không có thay đổi về sản phẩm hay quyền truy cập nào được nêu.
- **Trình quét lỗ hổng tự nguyện cho mã nguồn mở.** Anthropic ra mắt OSS Scanner, chạy quét định kỳ miễn phí trên các dự án mã nguồn mở tham gia. Công ty cho biết đã tìm hơn 29.000 lỗ hổng tiềm năng nhưng mới xem xét thủ công khoảng 6.000, và đang bị nghẽn ở khâu xác minh bởi con người.
- **Enterprise Frontier Safeguards kết hợp lưu trữ dữ liệu bằng không với phát hiện lạm dụng.** Anthropic cho biết EFS lưu dữ liệu trong hạ tầng đám mây do khách hàng kiểm soát thay vì của Anthropic. Tính năng này triển khai theo giai đoạn từ cuối mùa thu năm nay, và được nêu là hỗ trợ trên Claude Code, Claude Enterprise và Claude Platform, cùng một số nền tảng khác. Thông báo mang ngày 1 tháng 9 năm 2026.
- **Theo Anthropic, việc agent tự nhân bản trên thiết bị IoT đã gần đạt.** Nhóm Frontier Red Team của Anthropic báo cáo một model 9B chạy được suy luận trên 8 trong 9 loại phần cứng thử nghiệm, và các model từ 30B tham số trở xuống hoàn thành được nhiều bước tự nhân bản riêng lẻ ngay hôm nay. Đây là kết quả đánh giá, không phải năng lực đã phát hành.

Lần thu thập OpenAI trả về 25 mục chỉ có metadata, gồm `Decisions Api`, `Introducing O3 And O4 Mini`, `Gpt 6 Astra`, `Introducing Gpt Oss Safeguard`, `Work With Codex From Anywhere`, `Introducing Gpt 5`, `Practical Guide Building Gpt 6`, `Introducing Chatgpt Images 2 0`, `Premium Seats Chatgpt Business`, và `Introducing Deep Research`. Tiêu đề được suy ra từ slug URL và có thể không chính xác; không có nội dung bài viết nào. Danh mục: index.

- https://openai.com/index/decisions-api/
- https://openai.com/index/introducing-o3-and-o4-mini/
- https://openai.com/index/gpt-6-astra/
- https://openai.com/index/introducing-gpt-oss-safeguard/
- https://openai.com/index/work-with-codex-from-anywhere/
- https://openai.com/index/introducing-gpt-5/
- https://openai.com/index/practical-guide-building-gpt-6/
- https://openai.com/index/introducing-chatgpt-images-2-0/
- https://openai.com/index/premium-seats-chatgpt-business/
- https://openai.com/index/introducing-deep-research/

## Giá, hạn mức và quyền truy cập

Lần chạy này ghi nhận đường cơ sở cho 6 trang. Đường cơ sở không phải là thay đổi, và không thể báo cáo biến động giá, hạn mức hay quyền truy cập nào từ đó.

## Cần làm gì

- Nếu nhóm bạn đã viết Agent Skills nội bộ, lưu ý chuẩn này giờ thuộc AAIF, không phải Anthropic. Kiểm tra lại các liên kết tài liệu nội bộ.
- Nếu bạn dùng Claude Code trong môi trường doanh nghiệp, hỏi xem tài khoản của bạn có nằm trong giai đoạn triển khai EFS không, vì nó thay đổi nơi lưu dữ liệu.
- Nếu bạn bảo trì phần mềm mã nguồn mở, OSS Scanner nhận đăng ký tự nguyện để được quét định kỳ miễn phí.

Nguồn: [Kiểm chứng hình thức](https://www.anthropic.com/research/formal-verification) · [Trao tặng Agent Skills](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation) · [OSS Scanner](https://www.anthropic.com/research/launching-opt-in-vuln-finding-service-for-open-source) · [Enterprise Frontier Safeguards](https://www.anthropic.com/news/enterprise-frontier-safeguards) · [AI tự nhân bản](https://www.anthropic.com/research/self-replicating-ai)

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*