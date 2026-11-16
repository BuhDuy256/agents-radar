# Bản tin AI từ cộng đồng công nghệ 2026-11-16

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-16 06:12 UTC

---

## Workflows

### Thiết lập vòng phát triển kernel khép kín với một coding agent
Tác giả mô tả cách build và boot kernel Linux mainline bằng cách để một coding agent chạy theo vòng lặp: đọc phần khung (file `AGENTS.md` của chính kernel, cùng runbook và file memory), sửa cây nguồn, build qua script `kernel-build`, cài bằng `INSTALL_MOD_STRIP`, boot, rồi đọc `dmesg` và `journalctl` và ghi phát hiện vào file memory. Cây nguồn kernel có sẵn tài liệu cho agent — `coding-assistants.rst`, `generated-content.rst` và một symlink `AGENTS.md` trỏ tới `README` — trong đó cấm agent tự thêm dòng `Signed-off-by`. Tác giả cho biết cùng vòng lặp này chạy trên một laptop Intel, hai laptop Windows-on-ARM và một Pixel 3a.
Nguồn: [dev.to](https://dev.to/xbill/the-vibe-coding-kernel-pocalypse-is-here-and-it-is-a-good-thing-3d83)
Tương tác: 9 reactions · 8 bình luận · đọc 11 phút

### Chặn chỉnh sửa của agent bằng hook Claude Code thay vì quy tắc trong prompt
Tác giả chuyển các quy tắc khỏi `CLAUDE.md` sang hook Claude Code, thứ mà harness chạy tại các sự kiện vòng đời như `PreToolUse`, `PostToolUse` và `Stop`. Một hook bash `PreToolUse` chặn đọc và sửa file bí mật bằng cách thoát với mã 2; hook `PostToolUse` chỉ format đúng file vừa sửa; hook `Stop` chặn Claude kết thúc khi type-check còn lỗi. Tác giả lưu ý chỉ mã thoát 2 mới chặn được lệnh gọi tool — mã thoát 1 chỉ là lỗi không chặn — và `PreToolUse` không chặn được lệnh `Bash` như `cat .env`.
Nguồn: [dev.to](https://dev.to/ahmed_mahmoud360/claude-code-hooks-deterministic-guardrails-for-ai-coding-agents-field-notes-1db5)
Tương tác: 2 reactions · 2 bình luận · đọc 7 phút

## Experiments and comparisons

### Tách pane cho agent builder và reviewer bắt được lỗi mà tự kiểm tra bỏ sót
Tác giả chạy build một Go Kubernetes operator với một bầy coding agent trong các pane tmux: một builder làm việc trong git worktree dùng một lần, một instance reviewer riêng đọc diff và chạy bảng mutation test mà builder không viết, và tác giả là người duy nhất merge. Ở một slice, bảng mutation của reviewer bắt được một event của builder kích hoạt mỗi lần test pass thay vì một lần, cùng bốn mutation gate không có spec. Một cron mười phút chạy review qua đêm. Tác giả nói vòng lặp này không mở rộng quá một operator, một máy và một chủ sở hữu.
Nguồn: [dev.to](https://dev.to/jamie_nuttall_1e67ffad134/how-i-run-a-swarm-of-coding-agents-on-a-single-machine-and-what-breaks-5b0e)
Tương tác: 3 reactions · 10 bình luận · đọc 7 phút

### Phân loại giao thức agent theo thứ agent giao tiếp
Tác giả xếp các giao thức agent thành từng lớp thay vì coi chúng là đối thủ: MCP cho tool và dữ liệu, A2A cho các agent khác, AG-UI và A2UI cho hiển thị với người dùng, UCP cho thương mại, và AP2 cho thanh toán. Bài viết lưu ý spec MCP ngày 2026-07-28 đã chuyển sang request và response không trạng thái, A2A v1.0 ra mắt ngày 12 tháng 3 năm 2026, và AP2 v0.2 đã được trao cho FIDO Alliance. Tác giả nói đây là các phiên bản hiện tại và không báo cáo việc chạy thử so sánh.
Nguồn: [dev.to](https://dev.to/gde/mcp-a2a-ucp-ap2-confused-a-simple-map-of-ai-agent-protocols-november-2026-3ph)
Tương tác: 8 reactions · 0 bình luận · đọc 8 phút

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*