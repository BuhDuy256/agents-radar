# Xu hướng mã nguồn mở AI 2026-10-25

> Nguồn dữ liệu: GitHub Trending + GitHub Search API | Tạo lúc: 2026-10-25 01:18 UTC

---

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Chức năng / khi nào dùng |
| :--- | :--- | ---: | :--- |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | JavaScript | 0 (+2,264) | Thêm một skill cho coding agent để chạy kiểm tra bảo mật nhiều giai đoạn và tạo ra kết quả dạng máy đọc được, đã được xác minh độc lập. Hữu ích khi bạn cần agent kiểm tra bảo mật một codebase và trả về kết quả có cấu trúc để bạn xử lý tiếp. |
| [NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell) | Rust | 0 (+896) | Cung cấp môi trường chạy an toàn, riêng tư cho các AI agent tự hành. Hữu ích khi bạn cần chạy agent trong môi trường tách biệt. |
| [aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) | Python | 0 (+13) | Cung cấp các MCP server, skill và plugin do AWS hỗ trợ, giúp agent xây dựng trên AWS. Hữu ích khi bạn cần agent gọi các dịch vụ AWS qua tích hợp chính thức do nhà cung cấp duy trì. |
| [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | CSS | 0 (+455) | Thêm skill thiết kế chống "AI slop" cho Claude Code, Cursor và Codex. Hữu ích khi bạn cần giao diện do agent tạo ra tuân theo một chuẩn thiết kế nhất quán thay vì đầu ra template mặc định. |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Rust | 0 (+619) | Cung cấp một design language giúp AI harness làm thiết kế tốt hơn. Hữu ích khi bạn muốn agent harness tạo ra sản phẩm thiết kế chứ không chỉ code. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 134,484 | Biến một codebase cùng tài liệu, schema SQL, config và PDF thành knowledge graph có thể truy vấn, mở ra dưới dạng skill /graphify cho Claude Code, Cursor, Codex và Gemini CLI. Nó dùng AST parsing cục bộ, tất định, mọi cạnh đều được giải thích và không dùng vector store; hữu ích khi bạn muốn trả lời câu hỏi về codebase mà không cần chạy embedding. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 102,833 | Ghi lại những gì agent làm trong phiên, nén bằng AI, rồi đưa ngữ cảnh liên quan vào các phiên sau để giữ ngữ cảnh lâu dài. Hoạt động với Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot và OpenCode; hữu ích khi agent của bạn mất trạng thái giữa các phiên. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 77,734 | Nén đầu ra công cụ, log, file và RAG chunk trước khi chúng tới LLM, cắt token theo báo cáo là 20% với coding agent và 60–95% với JSON. Phát hành dưới dạng library, proxy và MCP server; hữu ích khi đầu ra công cụ đang lấp đầy context window của bạn. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 288,107 | Hệ thống tối ưu hiệu năng cho agent harness, bao gồm skill, instinct, memory, bảo mật và phát triển theo hướng nghiên cứu trước. Nhắm tới Claude Code, Codex, Opencode, Cursor và các harness tương tự; hữu ích khi bạn cần tinh chỉnh một harness có sẵn thay vì tự xây. |
| [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi) | TypeScript | 36,473 | Một coding agent gắn liền với IDE, do Stencil Labs xây dựng. Hữu ích khi bạn muốn agent làm việc ngay trong editor thay vì chỉ trong terminal. |

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*