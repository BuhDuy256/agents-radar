# Bản tin AI từ cộng đồng công nghệ 2026-11-23

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-23 07:22 UTC

---

## Workflow
### Waymark xin phép trước khi đụng vào code, và ghi nhớ các flow
Tác giả thử Waymark v0.4, một MCP server mã nguồn mở cung cấp cho Claude 35 công cụ trên C#, Python, TypeScript và JavaScript qua chỉ mục cú pháp, kiểm tra package ghim phiên bản, và lệnh có kiểu. Trong một phiên thực tế, Claude tải hướng dẫn, nhớ lại các flow sẵn có, đọc method bằng `code_skeleton`/`code_outline`/`code_method`, rồi lưu flow bằng `memorise`; một lần lưu bị từ chối vì một bước thụt lề không được bước trên gọi, nên Claude đã sửa lại. Một script `find` chạy shell được gửi qua `cmd_shell` nhưng hết hạn không trả lời sau mười phút, nên không có gì chạy. Muốn áp dụng cần `claude.ai` qua tunnel của người dùng hoặc Claude Code trên localhost.
Nguồn: [dev.to](https://dev.to/prashant_patil_9e62d3fa8a/claude-works-on-my-real-code-now-it-asks-first-and-it-remembers-waymark-v04-15n)
Tương tác: 6 reaction · 2 bình luận · đọc 15 phút

### JoeBro chia sẻ một bộ nhớ MCP chung cho Claude Code, Codex và OpenCode
Tác giả JoeBro, một app Mac miễn phí theo GPLv3, dựng một MCP server cục bộ trên một file SQLite để ba agent đọc và ghi cùng một bộ nhớ. Nó mở ra `memory_remember`, `memory_recall`, `memory_supersede` và `memory_forget`; mỗi fact mang kind, phạm vi project và nguồn gốc (agent, model, máy), và thao tác ghi từ chối các secret lộ liễu. Phần dọn dẹp dùng số học thay vì model: độ tương đồng Jaccard 0.8 thì củng cố thay vì nhân bản, decay có chu kỳ bán rã 30 ngày, và một lượt chạy ban đêm lưu trữ các fact dưới ngưỡng 0.12, giới hạn 150 fact hoạt động mỗi project. Đầu phiên, mỗi agent nhận một bản tóm tắt tối đa 400 token. Cài đặt cần macOS 26+.
Nguồn: [dev.to](https://dev.to/joexk1/how-i-made-claude-code-codex-and-opencode-share-one-memory-over-mcp-1nhm)
Tương tác: 2 reaction · 2 bình luận · đọc 4 phút

### otomode để Claude Code chạy không giám sát 8 giờ, commit theo từng task
Tác giả viết một skill otomode trong repo multi-model-orchestra để Claude Code làm việc trên một danh sách task trong lúc đi vắng. Khởi động nó kèm thời lượng sẽ hỏi một lần về task, lệnh kiểm tra cho mỗi task, quyền và giới hạn, rồi nó ghi `OTOMODE.md`, tạo branch, bật hook, và đặt lịch watchdog mỗi giờ. Hook đó từ chối mọi prompt và câu hỏi (ghi log vào `QUESTIONS.md`) và chặn các lệnh khó hoàn tác như `rm`, `git push`, `reset --hard` và `gh pr create`. Một lượt chạy 8 giờ với Go + React hoàn thành 16 task với khoảng 25 commit, từ chối 15 prompt, tạm dừng ở mức dùng 87% và không push gì; đây là một lượt chạy, không phải benchmark.
Nguồn: [dev.to](https://dev.to/yatuk/i-let-claude-code-work-alone-for-8-hours-here-is-the-hook-that-made-it-safe-fje)
Tương tác: 8 reaction · 5 bình luận · đọc 3 phút

## Thử nghiệm và so sánh
### Quy tắc quyền chỉ khớp lệnh shell sau khi thêm wildcard hai đầu
Tác giả chạy hai phiên DigitalOcean Managed Agents (harness claude-code, Sonnet 5.5, 2 vCPU) trên một repo Python công khai nhỏ. Với `default: allow` và quy tắc literal `git push *` / `gh pr create *`, lượt chạy đầu push và mở PR #10 mà không cần phê duyệt lần nào: lệnh thực tế bắt đầu bằng `cd` rồi nối cả hai hành động. Đổi pattern sang `*git*push*` và `*gh pr *` khiến mỗi lệnh bị chặn phải chờ — một lần push chờ 3 phút 24 giây, một lần thử lại cần phê duyệt riêng, và một `gh pr comment` bị từ chối thì không thử lại. Tác giả lưu ý khớp chuỗi bỏ sót file script, alias và lệnh gọi subprocess. Hai lượt chạy trên một repo không chứng minh được điều gì tổng quát.
Nguồn: [dev.to](https://dev.to/remdore/notes-on-making-an-ai-agent-ask-before-it-pushes-2lf7)
Tương tác: 6 reaction · 3 bình luận · đọc 5 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*