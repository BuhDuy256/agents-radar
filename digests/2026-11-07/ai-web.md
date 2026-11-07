# Báo cáo theo dõi nội dung chính thức của AI 2026-11-07

> Cập nhật hôm nay | Nội dung mới: 7 bài | Thay đổi watchlist: 1 | Tạo lúc: 2026-11-07 05:48 UTC

Nguồn dữ liệu:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 6 bài mới (sitemap tổng: 495)
- OpenAI: [openai.com](https://openai.com) — 1 bài mới (sitemap tổng: 1116)

---

# Cập nhật AI — 2026-11-07

## Những thay đổi

- **Anthropic phác thảo kiến trúc bộ nhớ cho agent** ([The components of agent memory](https://www.anthropic.com/research/components-of-agent-memory)): agent ghi lại công việc vào log, rồi trong lúc rảnh sẽ suy ngẫm trên các log đó — bài viết gọi quá trình này là "dreaming" — để sửa lỗi và tạo ghi chú mới. Bài viết dẫn sleep-time compute từ Letta và UC Berkeley làm cơ sở. Đây là một design pattern cho các phiên Claude Code chạy dài, nơi ngữ cảnh hiện đang bị mất giữa các lần chạy.
- **Anthropic công bố phương pháp ba bước để AI xây dựng mô hình khoa học** ([Teaching AI to build scientific models](https://www.anthropic.com/research/teaching-ai-to-build-scientific-models)): các grantee của AI for Science tại ELLIS Institute Tübingen mô tả cách AI đang thay đổi việc phát triển mô hình trong khoa học thần kinh. Đọc bài này nếu nhóm bạn xây dựng code mô phỏng hoặc mô hình hóa.
- **Anthropic đo lường cách các nhà khoa học thực sự dùng Claude** ([How scientists use Claude](https://www.anthropic.com/research/how-researchers-use-claude)): nghiên cứu bao gồm 207.000 phiên Claude và Claude Code dùng cho nghiên cứu. Mức sử dụng cao hơn ở khoa học máy tính, toán học và thống kê so với quy mô lĩnh vực, và thấp hơn ở y tế và khoa học vật lý trong phòng thí nghiệm. Hãy coi đây là số liệu cơ sở về mức sử dụng, không phải tuyên bố về hiệu năng.
- **Anthropic cho Claude chạy trong hai game MMORPG thuộc EVE Universe** ([Project EVE](https://www.anthropic.com/research/project-eve-claude-plays-mmorpgs)): Claude giao dịch trên thị trường EVE Online và điều hành các hạm đội trong EVE Frontier, với Fenris Creations là đối tác. Đây là bối cảnh đánh giá an toàn cho công việc agent dài hạn.
- **OpenAI đăng một mục, chỉ có metadata** ([Measuring How Ai Agents Handle Wet Lab Science](https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/), chuyên mục: index): không có nội dung bài viết.

Cũng mới, ít tác động hơn: [How scientists use Claude to accelerate research](https://www.anthropic.com/research/accelerating-scientific-research) giới thiệu ba nhóm nghiên cứu đang dùng Claude, và [Open call for guest investigators in the life sciences](https://www.anthropic.com/news/open-call-guest-investigators-life-sciences) mời nộp đề xuất cho các dự án 8–12 tuần, trong đó Anthropic chạy model miễn phí.

## Giá, hạn mức và quyền truy cập

- Trang gói Claude: dòng "Context window — Up to 1M varies by model" không còn xuất hiện → ảnh hưởng đến những ai đang lên kế hoạch cho công việc Claude dùng ngữ cảnh dài → kiểm tra giới hạn ngữ cảnh hiện tại của model bạn dùng trước khi dựa vào 1M.
- Trang đó cũng không còn hiển thị "Up to 1" cho dòng này. Nguồn không có câu chữ nào nói rõ về thay đổi giá, nên đây là chỉnh sửa trang, không phải tăng hay giảm được ghi nhận.

## Nên làm gì

- Kiểm tra lại context window cho model Claude bạn dùng, vì dòng 1M đã biến mất khỏi trang giá.
- Nếu bạn chạy các phiên agent dài, hãy thử pattern ghi log rồi suy ngẫm từ bài về bộ nhớ agent trước khi thay đổi workflow Claude Code tiếp theo.
- Nhóm khoa học sự sống: đề xuất cho chương trình guest investigator đang mở tại link ở trên.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*