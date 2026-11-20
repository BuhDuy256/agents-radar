# Bản tin AI từ cộng đồng công nghệ 2026-11-20

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-20 07:00 UTC

---

## Workflow

### Tác giả biến trình soạn thảo bài viết mong manh của LinkedIn thành pipeline xuất bản một file
Skill publishing-kit của tác giả chỉnh HTML của bài Markdown trên trang `127.0.0.1` cục bộ, rồi lưu kết quả vào `window.name` để nội dung dán vẫn sống sót khi tab chuyển sang `linkedin.com/article/new/`. Một helper gỡ ảnh bìa ở đầu, giữ các inline code span, tách block quote nhiều đoạn, và kéo các mục list lồng lên trên, vì LinkedIn âm thầm bỏ bảng, inline code, đoạn quote thứ hai và ảnh đứng một mình mà không báo lỗi. Trong một lần chạy thử, nguồn HTML 11.358 ký tự mang theo 12.023 ký tự và dán thành công với một draft id đã lưu. Dùng được từ publishing-kit 0.37.1 trở lên kèm browser automation.
Nguồn: [dev.to](https://dev.to/gde/publishing-markdown-to-a-linkedin-article-from-an-agent-skill-1hbj)
Tương tác: 19 reaction · 2 bình luận · đọc 10 phút

### Tác giả chặn render video changelog bằng file phán quyết do agent viết
Pipeline GitHub Actions của tác giả đưa ghi chú release và các clip đã duyệt cho một coding agent, agent này sửa bản sao của một dự án video CoAnimator rồi ghi ra `verdict.json`. Một cổng shell sau đó từ chối render trừ khi phán quyết ghi `render`, không còn câu hỏi mở, khớp tag release, và trỏ tới các clip trong `clips/` mà dòng trích dẫn thực sự xuất hiện trong `notes.md`. Lúc đó `coa render` mới tạo ra MP4 và một contact sheet 12 khung. Cổng này chỉ kiểm tra tham chiếu: nó không biết clip có thực sự thể hiện thay đổi hay không, và vẫn phải có người cung cấp clip rồi duyệt đầu ra.
Nguồn: [dev.to](https://dev.to/sheen_417f0f3a7f4/automate-changelog-videos-with-github-actions-and-ai-114m)
Tương tác: 12 reaction · 2 bình luận · đọc 9 phút

## Thử nghiệm và so sánh

### Bỏ inline code trước khi dán khiến LinkedIn thêm 41 link mark sai
Tác giả đo cách trình soạn thảo bài viết của LinkedIn viết lại một bài đã lưu, so sánh nguồn 269 tag của bài hướng dẫn với những gì trình soạn thảo lưu sau khi tải lại. Inline code hiện trong trình soạn thảo nhưng 0 trong 40 code mark sống sót qua reload, trong khi trình soạn thảo tự động biến văn bản trông giống host thành link, ví dụ `make-medium.py` thành `http://make-medium.py`. Gỡ các inline code span trước tiên làm phát sinh thêm 41 link mark cho 4 đích thực; giữ nguyên span thì không thêm mark nào và bảo toàn 4 trên 4 đích. Chỉ những link có phần text là inline code mới bị gỡ, vì code mark của trình soạn thảo loại trừ các mark khác.
Nguồn: [dev.to](https://dev.to/gde/publishing-markdown-to-a-linkedin-article-from-an-agent-skill-1hbj)
Tương tác: 19 reaction · 2 bình luận · đọc 10 phút

### Gemma 4 E4B đạt 0,9272–0,9439 trên GSM8K, bật thinking mua được tối đa 16 bài
Tác giả thử Gemma 4 E4B trên RTX 3050 8 GB qua llama.cpp với 16 lần chạy — thinking tắt và bật, bản repack Q4_0 chính xác so với GGUF Q4_0 QAT của Google, có và không có drafter QAT của Google — trên toàn bộ 1.319 bài GSM8K và 30 bài AIME 2025, hết 26,83 giờ GPU. Bật thinking nâng GSM8K thêm +2, +4, +13 và +16 bài, và tốn thời gian gấp 1,19 đến 2,47 lần; chỉ lần +16 đạt p = 0,0440. Drafter của Google làm các lần chạy GSM8K nhanh hơn 1,99 đến 2,39 lần mà điểm không đổi. Mỗi thiết lập chỉ chạy một lần ở temperature 0; 30 bài AIME chỉ đủ để thấy hiệu ứng lớn.
Nguồn: [dev.to](https://dev.to/gde/thinking-on-or-off-gemma-4-e4b-on-an-8-gb-rtx-3050-5d5)
Tương tác: 15 reaction · 3 bình luận · đọc 9 phút

### Một chữ o Cyrillic trong tên tool nhìn giống hệt nhưng trượt khớp chính xác
Tác giả dùng AgentInspect 6.31.35 với một fixture tổng hợp, trong đó tool được gọi là `retrieve_p\u043Elicy` — chữ o nhỏ Cyrillic, U+043E — trong khi contract yêu cầu `retrieve_policy` ASCII (U+006F). Step callback thành công, nhưng một kiểm tra `evaluateTraceContractRead` báo tên bị thiếu và liệt kê code point U+043E. Tác giả cho rằng nên sửa ở ranh giới đặt tên, không phải trong một normalizer viết lại tên quan sát được để fixture pass, và lưu ý chẩn đoán này chỉ áp dụng cho một số trường hợp trộn script nhất định, không phải mọi tên.
Nguồn: [dev.to](https://dev.to/gde/tool-names-are-identifiers-dont-autocorrect-them-33g9)
Tương tác: 15 reaction · 6 bình luận · đọc 4 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*