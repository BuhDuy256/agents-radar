# Bản tin AI từ cộng đồng công nghệ 2026-10-25

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-10-25 01:18 UTC

---

## Workflow

### Báo cáo hoàn thành tách phần đã chạy khỏi phần chỉ được giả định
Tác giả đề xuất một checklist để đánh giá thông báo "done" của agent AI trước khi merge. Workflow bắt đầu bằng việc nêu kết quả quan sát được và tiêu chí nghiệm thu trước khi agent sửa, sau đó yêu cầu báo cáo hoàn thành liệt kê những gì đã thay đổi, lệnh nào đã chạy, chúng có pass không, và những gì không thể kiểm tra. Người review xác nhận regression test fail với code gốc và pass sau khi sửa, đọc mọi thay đổi trong chính các test, và khớp cách xác minh với loại thay đổi, vì build xanh không chứng minh checkout hoạt động. Các kiểm tra bị chặn vẫn được ghi là chưa xác minh. Bài viết đưa ra một prompt tái sử dụng nhưng không có kết quả đo lường.
Nguồn: [dev.to](https://dev.to/robertadam987_/your-ai-agent-says-done-what-did-it-actually-verify-16jd)
Tương tác: 5 reactions · 6 comments · 4 min read

## Thử nghiệm và so sánh

### Một plugin linter vượt prompt đối thủ tốt nhất 2,67 trên 60 ở các task công khai
Tác giả benchmark linter AI-slop của mình với sáu writing skill của Claude Code cộng với baseline không plugin: 11 nhánh, ba lần chạy mỗi task trên Sonnet 5.5, với grader mù về tiêu chí đánh giá. Trên 12 task công khai, linter đạt 58,67 trên 60 so với 56,00 của Humanizer khi được gọi đích danh, chênh 2,67 với khoảng tin cậy 95% là [1,00, 4,33]. Trên 6 task held-out, nó kém unslop 0,33, với bốn nhánh đạt từ 29,67 trên 30 trở lên, nên tập này không phân tách được các nhánh dẫn đầu. Linter tốn gấp 2,43 lần baseline mỗi cell, khoảng 0,125 so với 0,051 đô la.
Nguồn: [dev.to](https://dev.to/efe_genc/humanizer-has-about-60000-stars-on-12-public-tasks-my-linter-plugin-scored-267-higher-2cdg)
Tương tác: 6 reactions · 15 comments · 6 min read

### Một model 1,5B cho phán quyết có/không không ổn định trên cùng một phát hiện
Tác giả chạy một auditor cục bộ đưa từng phát hiện code cho Qwen2.5-Coder-1.5B-Instruct với sáu dòng ngữ cảnh và một câu hỏi có/không, khoảng mười hai giây mỗi câu hỏi trên CPU laptop. Ông hỏi Gemma 2 2B IT cùng câu hỏi về cùng đoạn code ba lần trong ngữ cảnh tách biệt và nhận được NO, NO, YES, dù bug có tồn tại. Vì vậy ông coi model là gợi ý, không phải phán quyết: vị trí đến từ các kiểm tra tất định, và "UNSURE" là câu trả lời hợp lệ. Ông nói ngưỡng kích hoạt và tỷ lệ đảo kết quả khi đổi prompt vẫn chưa được đo.
Nguồn: [dev.to](https://dev.to/rytjy/a-15b-model-is-a-triage-signal-not-a-verdict-2j63)
Tương tác: 3 reactions · 12 comments · 5 min read

### Điểm tool-calling khác nhau ở phần sửa, không ở phần đọc hay chạy lệnh
Tác giả chạy ToolCallBench, một công cụ PyPI do ông viết, với bốn model Ollama trên MacBook M4 16GB: mỗi model 20 task trên một dự án Python nhỏ có hai test fail cố ý, một lần chạy mỗi task, temperature 0. gemma4:e4b pass 95%, qwen3:8b 75%, llama3.1:8b 60% và qwen3.5:0.8b 55%; cả bốn đều pass mọi task chạy lệnh và ba pass mọi task đọc, trong khi nhóm sửa tách chúng ra 5, 3, 2 và 1 trên 5. chain-04 fail ở mọi model. Với một lần chạy mỗi task và 20 task, tác giả nói các khoảng cách nằm trong nhiễu và bảng này không phải xếp hạng model.
Nguồn: [dev.to](https://dev.to/herinpatel15/i-built-a-pip-tool-to-test-how-well-any-local-llm-calls-tools-here-is-what-my-demo-run-showed-177c)
Tương tác: 4 reactions · 4 comments · 5 min read

### Fine-tune model 4B trên các điều khoản bất công nâng macro F1 từ 0,707 lên 0,874
Tác giả fine-tune Qwen/Qwen3.5-4B với LoRA rank-16 trên Tinker qua benchmark LexGLUE UNFAIR-ToS, chấm điểm model zero-shot gốc và checkpoint một lần trên một lát cắt cố định gồm 422 câu. Macro F1 tăng từ 0,707 lên 0,874 và micro F1 từ 0,695 lên 0,848; precision của arbitration đi từ 0,189 zero-shot lên 1,000, và macro F1 của checkpoint vượt điểm LexGLUE được trích dẫn của Legal-BERT (0,810) và RoBERTa-base (0,790). Huấn luyện chạy 196 bước tối ưu. Bài viết là bài dự thi của chính tác giả cho một thử thách Hacktoberfest, và các chi tiết về pipeline trích xuất, phân đoạn và chấm điểm ngoài benchmark được trích dẫn chưa được lấy đầy đủ.
Nguồn: [dev.to](https://dev.to/emmasofia/everyone-clicks-i-agree-no-one-reads-them-i-fine-tuned-a-4b-model-with-tinker-to-catch-unfair-30lm)
Tương tác: 4 reactions · 1 comments · 8 min read

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*