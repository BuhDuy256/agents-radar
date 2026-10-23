# Xu hướng mã nguồn mở AI 2026-10-23

> Nguồn dữ liệu: GitHub Trending + GitHub Search API | Tạo lúc: 2026-10-23 05:33 UTC

---

# Báo cáo Xu hướng Mã nguồn Mở AI — 2026-10-23

## 1. Điểm nổi bật hôm nay

Hệ sinh thái mã nguồn mở AI hôm nay bị chi phối áp đảo bởi **công cụ agent và "skills" dành cho nhà phát triển**. Sự bùng nổ lớn nhất là **cloudflare/security-audit-skill** (+2,979 sao), một skill cho coding-agent dùng để kiểm tra bảo mật có thể xác minh bằng máy, cho thấy doanh nghiệp giờ muốn đầu ra của agent *có thể kiểm toán, xác định trước* thay vì chỉ sinh nội dung thô. **DietrichGebert/ponytail** (+1,948) nắm bắt xu hướng ngược lại: agent được tối ưu cho sự *tiết chế* ("code tốt nhất là code bạn không bao giờ viết"), chống lại việc sinh quá nhiều. **Graphify-Labs/graphify** (+1,408) thúc đẩy cách tiếp cận đồ thị tri thức "không vector store" để hiểu codebase, thách thức trực tiếp dòng chính RAG. Trong khi đó, **Anthropic** bước vào không gian plugin cho công việc tri thức với **knowledge-work-plugins** (+303), chính thức hóa mô hình phân phối "skill/plugin" cho Claude Cowork.

---

## 2. Dự án hàng đầu theo danh mục

### 🔧 Hạ tầng AI

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | JavaScript | 0 (+2,979) | Một skill cho coding-agent dùng để kiểm tra bảo mật đa giai đoạn, tạo ra các phát hiện có thể xác minh độc lập và đọc được bằng máy. Mức tăng +2,979 hôm nay cho thấy doanh nghiệp đang ưu tiên đầu ra agent có thể xác minh hơn là năng lực thô. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 286,664 | Hệ thống tối ưu "harness" cho agent, bao gồm skills, instincts, memory và security trên Claude Code, Codex, Cursor và nhiều công cụ khác. Khả năng tương thích đa harness khiến nó trở thành ứng viên chuẩn hóa việc tinh chỉnh hiệu suất agent. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 77,584 | Nén đầu ra công cụ, log, tệp và chunk RAG trước khi chúng đến LLM — giảm 20%–95% token mà vẫn giữ nguyên câu trả lời. Áp lực chi phí token biến đây thành tiện ích đòn bẩy cao cho agent trong môi trường production. |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,947 | Framework Rust để xây dựng ứng dụng LLM dạng module, có thể mở rộng. Phản ánh xu hướng dịch chuyển đều đặn của việc xây dựng ứng dụng LLM sang các ngôn ngữ hệ thống vì hiệu năng và an toàn. |
| [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | Rust | 59,639 | API công cụ tìm kiếm cực nhanh mang tìm kiếm hybrid do AI hỗ trợ đến các trang web và ứng dụng. Tìm kiếm hybrid (từ khóa + vector) đang trở thành kỳ vọng mặc định cho các ứng dụng hướng AI. |

### 🤖 AI Agents / Workflows

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 173,820 (+1,948) | Khiến AI agent "suy nghĩ như một senior dev lười nhất", ưu tiên code tối giản. Mức tăng +1,948 là tín hiệu mạnh cho thấy các đội đang chống lại việc agent làm quá phức tạp bằng các ràng buộc về prompt/hành vi. |
| [morluto/rea](https://github.com/morluto/rea) | TypeScript | 367,726 | Dịch ngược mọi thứ bằng agent, từ hành vi ứng dụng xuống đến binary gốc. Đứng đầu chủ đề LLM theo số sao thô; dịch ngược bằng agent là một ngách bảo mật tấn công/phòng thủ đang trưởng thành nhanh chóng. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 256,304 | "Agent lớn lên cùng bạn" — một agent bền bỉ, tự cải thiện từ một phòng lab mô hình nổi tiếng. Các framework agent do lab hậu thuẫn ngày càng cạnh tranh với các harness cộng đồng. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 118,914 | Thư viện Python mã nguồn mở cho AI browser agent, kèm cloud được host với trình duyệt stealth. Tự động hóa trình duyệt vẫn là năng lực agent giá trị nhất, giờ đã được sản phẩm hóa. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 101,095 | Cho agent quyền đọc/tìm kiếm trên Twitter, Reddit, YouTube, GitHub, Bilibili và — một CLI, không phí API. Truy cập dữ liệu miễn phí cho agent là bước mở khóa lớn cho quy trình nghiên cứu tự động. |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | Python | 47,512 | Trợ lý AI cá nhân mã nguồn mở và harness agent với memory, tools, skills, hỗ trợ đa agent. Cài đặt một dòng giúp hạ thấp rào cản áp dụng agent tự host. |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | TypeScript | 38,186 | Ngăn xếp frontend cho agent và giao diện sinh (React, Angular, Mobile, Slack), đồng thời là đơn vị tạo ra AG-UI Protocol. UX cho agent đang hội tụ quanh các framework frontend, lặp lại thời kỳ ứng dụng web. |
| [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | Go | 35,936 | Coding agent đáng tin cậy cho các tác vụ kỹ thuật phần mềm phức tạp, viết bằng Go. Coding agent bằng ngôn ngữ biên dịch phản ánh nhu cầu ngày càng tăng về khả năng triển khai và tốc độ. |

### 📦 Ứng dụng AI

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 133,207 (+1,408) | Biến bất kỳ codebase, tài liệu, schema SQL, config và PDF thành đồ thị tri thức có thể truy vấn thông qua một skill cho Claude Code, Cursor, Codex, Gemini CLI. Cách phân tích AST xác định và định hướng "không vector store" đang tăng nhanh (+1,408 hôm nay). |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | Python | 0 (+303) | Repo plugin mã nguồn mở chính thức của Anthropic dành cho người làm công việc tri thức sử dụng Claude Cowork. Phân phối plugin của bên thứ nhất cho thấy nhà cung cấp đang chính thức hóa một hệ sinh thái ứng dụng cho agent của mình. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 76,655 | Agent tìm việc AI mã nguồn mở, quét các bảng tin, chấm điểm việc làm theo CV và tùy chỉnh resume. Chạy cục bộ trong coding CLI, cho thấy các agent chuyên ngành đang chuyển sang hình thức CLI-first. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 66,908 | Hệ thống phân tích cổ phiếu đa thị trường do LLM điều khiển, với dữ liệu thị trường, tin tức, dashboard và lập lịch miễn phí. Tài chính vẫn là ngành dọc đông đúc nhất cho ứng dụng agent LLM. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 66,198 | Biến tài liệu hoặc chủ đề thành bộ PowerPoint gốc với shape, biểu đồ, animation và thuyết minh thật. Đầu ra định dạng gốc (không phải ảnh) là điểm khác biệt cho môi trường doanh nghiệp. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 52,898 | Studio năng suất AI với chat, agent tự động và hơn 300 trợ lý truy cập các LLM tiên tiến. Các ứng dụng khách tổng hợp vẫn là điểm vào lưu lượng cao cho quy trình đa mô hình. |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | Python | 49,290 | Framework agent AI cá nhân siêu nhẹ, tự host, với WebUI, tools, memory, MCP và quy trình đa agent. Tự host nhẹ là câu trả lời cho lo ngại về chi phí và quyền riêng tư. |
| [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) | Python | 35,969 | Trợ lý AI cá nhân có thể triển khai cục bộ hoặc trên cloud, hỗ trợ nhiều ứng dụng chat. Phân phối gốc qua ứng dụng chat phản ánh nơi người dùng không chuyên thực sự ở. |

### 🧠 LLM / Huấn luyện

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 168,010 | Framework định nghĩa mô hình cho các mô hình văn bản, thị giác, âm thanh và đa phương thức tiên tiến trong cả suy luận lẫn huấn luyện. Vẫn là trung tâm hấp dẫn của hệ sinh thái. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 184,364 | Chạy nhanh Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma và các mô hình khác. Runtime suy luận cục bộ được ưa chuộng, giờ bao phủ cả mô hình mở tiên tiến Trung Quốc lẫn phương Tây. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,537 | Nền tảng đánh giá LLM bao phủ OpenAI, Anthropic, Gemini, Qwen, GLM, DeepSeek trên hơn 100 bộ dữ liệu. Đánh giá nghiêm ngặt đang trở thành điểm nghẽn khi số lượng mô hình bùng nổ. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,787 | Dự án học qua xây dựng cho hệ thống suy luận LLM trên Apple Silicon (tiny vLLM + Qwen). Các ngăn xếp suy luận mang tính giáo dục đang phát triển khi kỹ sư hệ thống bước vào AI. |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 318 | Suy luận LLM trên thiết bị nhờ lượng tử hóa X-bit. Suy luận trên thiết bị tiếp tục đẩy về phía dấu chân nhỏ hơn, hiệu quả hơn. |
| [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) | HTML | 1,865 | Awesome-list cho Agentic RL. Sự hội tụ của agent và học tăng cường là một biên giới nghiên cứu mới nổi. |
| [thinkwee/AwesomeOPD](https://github.com/thinkwee/AwesomeOPD) | — | 879 | Awesome-list cho On-Policy Distillation. Chưng cất đang thu hút lại sự chú ý như một con đường rẻ để có mô hình nhỏ có năng lực. |

### 🔍 RAG / Tri thức

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 142,749 | Hơn 100 AI Agent, Agent Skills và ứng dụng RAG, tất cả đều miễn phí và mã nguồn mở. Một trung tâm khám phá lưu lượng cao cho các triển khai thực tế, dễ sao chép. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 102,361 | Ngữ cảnh bền vững xuyên phiên cho mọi agent — thu thập, nén và tái đưa ngữ cảnh liên quan vào các phiên sau. Hoạt động với Claude Code, Codex, Gemini, Hermes và nhiều công cụ khác. Memory đa harness đang trở thành điều kiện tối thiểu. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 92,690 | Engine RAG mã nguồn mở hàng đầu, kết hợp retrieval-augmented generation với năng lực agent. RAG và agent đang rõ ràng hợp nhất thành một "lớp ngữ cảnh" duy nhất. |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | Python | 86,065 | Web crawler mã nguồn mở biến bất kỳ trang nào thành Markdown sạch, sẵn sàng cho LLM, kèm cloud tùy chọn. Thu thập dữ liệu vẫn là điểm nghẽn kém hấp dẫn cho chất lượng RAG. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 67,671 | Lớp memory cho AI agent — hạ tầng ngữ cảnh bền vững cắm là chạy cho production. Memory đang hội tụ thành một danh mục hạ tầng riêng biệt. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 52,629 | Nền tảng xử lý tài liệu cho AI. Vẫn là framework chuẩn mực cho pipeline RAG hướng tài liệu. |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 40,279 | Triển khai bài báo EMNLP 2025: retrieval-augmented generation đơn giản và nhanh. RAG nhẹ được hậu thuẫn học thuật tiếp tục thu hút áp dụng. |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 32,682 | Nền tảng memory AI mã nguồn mở cung cấp cho agent memory dài hạn bền vững với mô hình nhỏ, miễn phí. Memory dùng mô hình nhỏ là giải pháp tiết kiệm chi phí thay cho cách tiếp cận ngữ cảnh lớn. |

*Hạ tầng RAG/tri thức đáng chú ý khác:* [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) (39,506) — đánh chỉ mục tài liệu dựa trên suy luận, không dùng vector; [volcengine/OpenViking](https://github.com/volcengine/OpenViking) (40,623) — cơ sở dữ liệu ngữ cảnh tự tiến hóa hợp nhất memory, RAG và skills; [qdrant/qdrant](https://github.com/qdrant/qdrant) (35,198), [weaviate/weaviate](https://github.com/weaviate/weaviate) (16,905), [lancedb/lancedb](https://github.com/lancedb/lancedb) (11,746) và [alibaba/zvec](https://github.com/alibaba/zvec) (16,138) — lớp cơ sở dữ liệu vector đang mở rộng sang các dạng nhúng, in-process và cloud-native; [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) (29,977) — hướng dẫn kỹ thuật RAG nâng cao; [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) (13,058) — tiết kiệm 97% lưu trữ cho RAG riêng tư trên thiết bị.

---

## 3. Phân tích tín hiệu xu hướng

**Agent skills và harness là danh mục bùng nổ.** Năm trong số chín repo đang thịnh hành hôm nay và nhiều dự án dẫn đầu chủ đề là *công cụ* agent chứ không phải mô hình: security-audit-skill, ponytail, graphify, ECC, browser-use và repo plugin của Anthropic. Sự chú ý của cộng đồng đã rõ ràng chuyển từ "mô hình nào" sang "làm sao để agent đáng tin cậy, có thể kiểm toán và rẻ". Đáng chú ý, hai trong ba dự án tăng trưởng mạnh nhất hôm nay — security-audit-skill của Cloudflare và ponytail — đều nói về việc *ràng buộc* hành vi agent (phát hiện có thể xác minh; viết ít code hơn), gợi ý một giai đoạn trưởng thành sau cơn hype năng lực thô của các chu kỳ trước.

**Hướng đi mới: truy xuất không vector store và memory cho agent.** Định hướng "phân tích AST xác định cục bộ, mọi cạnh đều được giải thích, không vector store" của Graphify tấn công trực tiếp vào chính thống RAG, được PageIndex hưởng ứng với "RAG không vector, dựa trên suy luận". Đồng thời, hạ tầng memory (claude-mem, mem0, cognee, OpenViking) đang hội tụ thành danh mục riêng, và khả năng tương thích đa harness (Claude Code, Codex, Cursor, Gemini CLI) giờ là điểm bán tiêu chuẩn chứ không còn là điểm khác biệt.

**Tín hiệu ngăn xếp công nghệ.** Rust xuất hiện lặp lại trong hạ tầng (rig, qdrant, lancedb, meilisearch, Codewhale), và Go chiếm ưu thế trong công cụ vector/tìm kiếm (ollama, ragflow, milvus, weaviate). Các dự án tập trung vào thiết bị và lượng tử hóa (picollm, LEANN, tiny-llm) cho thấy áp lực tiếp tục lên chi phí suy luận và quyền riêng tư. Sự hiện diện rộng rãi của DeepSeek, Qwen, GLM, Kimi và MiniMax trong danh sách mô hình của ollama xác nhận các mô hình mở Trung Quốc giờ là công dân hạng nhất trong công cụ phương Tây.

---

## 4. Điểm nóng cộng đồng

- **[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)** — Dự án tăng mạnh nhất trong ngày (+2,979). Các phát hiện kiểm toán đọc được bằng máy, xác minh độc lập là mẫu hình cho đầu ra agent đáng tin cậy trong môi trường được quản lý/doanh nghiệp; dự đoán sẽ có nhiều dự án bắt chước.
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — Thách thức mạnh nhất đối với RAG dùng vector store (+1,408). Đồ thị codebase xác định, có thể giải thích hấp dẫn cho tuân thủ và gỡ lỗi; đáng theo dõi liệu "không vector store" có trở thành một phong trào thực sự.
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** — Nén token (tiết kiệm 20%–95%) kém hấp dẫn nhưng tấn công trực tiếp vào chi phí vận hành lớn nhất của agent production. Đòn bẩy thực tế cao cho bất kỳ ai triển khai ở quy mô lớn.
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) & [mem0ai/mem0](https://github.com/mem0ai/mem0)** — Memory cho agent đang kết tinh thành một lớp hạ tầng riêng biệt. Ngữ cảnh bền vững xuyên phiên, xuyên harness đang trở thành kỳ vọng cơ bản, không còn là tính năng.
- **[Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)** — Truy cập miễn phí API vào Twitter, Reddit, YouTube và nhiều nguồn khác giúp hạ mạnh chi phí cho agent nghiên cứu tự động. Cần theo dõi cả rủi ro về điều khoản dịch vụ và độ tin cậy bên cạnh tiện ích rõ ràng.

---

Quy tắc:
- Chỉ xuất bản bản dịch. Không mở đầu, không giải thích, không rào markdown quanh toàn bộ đầu ra.
- Giữ nguyên cấu trúc Markdown: tiêu đề, bảng (bao gồm hàng căn chỉnh cột), danh sách, blockquote, in đậm/in nghiêng, đường kẻ ngang, emoji.
- Giữ nguyên URL, đích liên kết, code span, code block, số và ngày tháng.
- Giữ nguyên tên dự án, slug repo, tên người dùng, thẻ phiên bản, đường dẫn tệp và định danh API/config — không dịch chúng.
- Các tham chiếu issue/PR như #12345 và văn bản liên kết của chúng giữ nguyên.
- Dùng tiếng Việt tự nhiên, theo văn phong bản tin dành cho nhà phát triển Việt Nam — rõ ràng và trực tiếp, không dịch từng chữ.
- Ưu tiên từ đơn giản và câu ng

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*