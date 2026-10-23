# Xu hướng mã nguồn mở AI 2026-10-23

> Nguồn dữ liệu: GitHub Trending + GitHub Search API | Tạo lúc: 2026-10-23 04:29 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở — 2026-10-23

---

## 1. Điểm nổi bật hôm nay

Bối cảnh AI trên GitHub hôm nay bị chi phối bởi **công cụ lấy agent làm trung tâm**: ba trong số năm repo tăng trưởng nhanh nhất trên bảng trending (`cloudflare/security-audit-skill`, `ponytail`, `graphify`) là các skill dành cho coding-agent, cho thấy "skill" đã trở thành đơn vị phân phối chính cho công cụ phát triển AI. Việc Anthropic góp mặt trong bảng trending với `knowledge-work-plugins` khẳng định xu hướng đẩy mạnh plugin agent cho lao động tri thức, trong khi skill kiểm toán bảo mật của Cloudflare cho thấy doanh nghiệp đang bước vào hệ sinh thái agent-skill. Trong khi đó, tìm kiếm theo chủ đề cho thấy **bộ nhớ và duy trì ngữ cảnh** là hạng mục đột phá — `claude-mem`, `mem0`, `cognee` và `OpenViking` đều nhắm vào bộ nhớ dài hạn cho agent, một bài toán mà hệ sinh thái đang chạy đua để chuẩn hóa. Một hướng đi mới đáng chú ý là **RAG "không vector" / tất định** (`graphify`, `PageIndex`, `LEANN`), thách thức giả định mặc định rằng RAG cần đến vector store.

---

## 2. Dự án hàng đầu theo danh mục

### 🔧 Hạ tầng AI (framework, SDK, inference engine, công cụ dev, CLI)

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | JavaScript | 0 (+2,979) | Skill cho coding-agent thực hiện kiểm toán bảo mật nhiều giai đoạn, tạo ra các phát hiện dạng máy đọc được và được xác minh độc lập. Repo AI trending #1 hôm nay theo số sao mới — việc một nhà cung cấp doanh nghiệp (Cloudflare) bước vào không gian agent-skill là tín hiệu mạnh về độ tin cậy. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 173,773 (+1,948) | Khiến AI agent của bạn "suy nghĩ như một senior dev lười nhất," thiên về viết ít code hơn. Vọt lên trending #3 với +1,948 sao hôm nay; triết lý viết code tối giản của nó cộng hưởng với mối lo về chi phí/độ trễ trong luồng công việc agent. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 133,160 (+1,408) | Biến bất kỳ codebase, tài liệu, schema SQL, file cấu hình và PDF thành knowledge graph có thể truy vấn chỉ qua một skill cho Claude Code, Cursor, Codex và Gemini CLI. Cách phân tích AST tất định không dùng vector store là thách thức trực tiếp đối với giả định RAG phổ biến. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 77,581 | Nén đầu ra công cụ, log, file và đoạn RAG trước khi chúng đến LLM — giảm 20% token cho coding agent và 60–95% cho JSON. Tối ưu chi phí token đang trở thành một tầng hạ tầng độc lập. |
| [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi) | TypeScript | 36,308 | Coding agent trên terminal tích hợp sẵn IDE, do Stencil Labs xây dựng. Đại diện cho xu hướng "IDE thuần agent" nơi terminal thay vì editor là bề mặt chính. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 184,360 | Chạy nhanh Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma và các mô hình khác. Vẫn là runtime inference cục bộ mặc định; danh sách mô hình của nó giờ nghiêng mạnh về các bản phát hành trọng số mở của Trung Quốc. |

### 🤖 AI Agent / Luồng công việc (framework agent, tự động hóa, hệ đa agent)

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | Python | 0 (+303) | Kho plugin mã nguồn mở của Anthropic dành cho lao động tri thức dùng Claude Cowork. Động thái first-party nhằm gieo mầm hệ sinh thái plugin quanh Cowork thay vì để bên thứ ba làm. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 286,643 | Hệ thống tối ưu hiệu năng agent harness bao trùm skill, instinct, bộ nhớ, bảo mật và phát triển theo hướng nghiên cứu trước cho Claude Code, Codex, Opencode và Cursor. Một trong những mục có số sao cao nhất toàn bộ dữ liệu, cho thấy nhu cầu mãnh liệt về tinh chỉnh harness đa agent. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 256,295 | "Agent lớn lên cùng bạn" — sản phẩm agent bền bỉ của Nous Research. Một phòng nghiên cứu đang tiến vào sản phẩm agent hướng người tiêu dùng. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 118,910 | Thư viện Python mã nguồn mở cho AI browser agent, kèm dịch vụ cloud với trình duyệt stealth và API agent được host. Điều khiển trình duyệt vẫn là năng lực agent được thương mại hóa rõ nhất. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 101,080 | Một CLI duy nhất cho agent quyền đọc/tìm kiếm trên Twitter, Reddit, YouTube, GitHub, Bilibili và XiaoHongShu với không phí API. Đáng chú ý vì gộp cả nền tảng Trung Quốc lẫn phương Tây — một tầng truy cập dữ liệu song ngữ hiếm có. |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | Python | 49,289 | Framework agent cá nhân tự host siêu nhẹ bằng Python với WebUI, công cụ, bộ nhớ, MCP và luồng đa agent. HKUDS giờ là đơn vị phát hành agent đa repo rất sung mãn. |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | Python | 47,512 | Trợ lý AI cá nhân và agent harness mã nguồn mở với lập kế hoạch, công cụ, bộ nhớ tự tiến hóa và cài đặt một dòng lệnh. Định vị là lựa chọn nhẹ nhàng, dễ mở rộng thay cho các harness nặng hơn. |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | TypeScript | 38,186 | Stack frontend cho agent và generative UI trên React, Angular, Mobile và Slack; là đơn vị tạo ra AG-UI Protocol. Chuẩn hóa frontend cho agent đang là chiến trường mới nổi. |

### 📦 Ứng dụng AI (ứng dụng cụ thể, giải pháp theo ngành dọc)

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 76,646 | Agent tìm việc bằng AI quét các bảng tuyển dụng, chấm điểm việc làm từ 1–5 so với CV của bạn và tùy chỉnh resume thân thiện với ATS. Chạy cục bộ trong các AI coding CLI — ví dụ điển hình của việc chuyển công cụ agent thành luồng công việc tiêu dùng. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 66,903 | Phân tích cổ phiếu đa thị trường bằng LLM với tin tức thời gian thực, bảng điều khiển quyết định và chạy theo lịch miễn phí. Tài chính vẫn là hạng mục agent ngành dọc đông đúc nhất. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 66,163 | Biến tài liệu hoặc chủ đề thành bài PowerPoint gốc với shape, hiệu ứng chuyển, biểu đồ và thuyết minh âm thanh thật. Đầu ra định dạng gốc (thay vì hack HTML-sang-PPTX) là điểm khác biệt. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 52,896 | Studio năng suất AI với chat thông minh, agent tự chủ và hơn 300 trợ lý hợp nhất trên các LLM tiên tiến. Một desktop client hiếm hoi không độc quyền cho Trung Quốc mà vẫn duy trì được quy mô. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 134,312 | Tạo video ngắn HD từ một chủ đề hoặc từ khóa qua luồng công việc AI tự động. Số sao cao bền vững cho thấy tự động hóa video ngắn vẫn là nhu cầu thường trực. |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Python | 36,352 | Agent giao dịch cá nhân từ nhóm HKUDS. Ứng dụng liên quan tài chính thứ hai của HKUDS trong bộ dữ liệu này, cho thấy sự đa dạng hóa ngành dọc có chủ đích. |

### 🧠 LLM / Huấn luyện (trọng số mô hình, framework huấn luyện, công cụ fine-tune)

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [morluto/rea](https://github.com/morluto/rea) | TypeScript | 367,435 | Dịch ngược bất cứ thứ gì bằng agent, từ hành vi ứng dụng xuống đến binary gốc. Số sao cao nhất toàn bộ dữ liệu; dịch ngược bằng agent là một use case mới gây ấn tượng và có thể gây tranh cãi. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 168,006 | Framework định nghĩa mô hình cho ML tiên tiến trên văn bản, thị giác, âm thanh và đa phương thức, cho cả inference lẫn huấn luyện. Vẫn là tầng nền tảng kinh điển. |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 201,192 | Framework học máy mã nguồn mở cho mọi người. Giữ số sao cao nhất trong các framework ML bất chấp câu chuyện thời đại PyTorch. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 104,989 | Tensor và mạng nơ-ron động trong Python với tăng tốc GPU mạnh mẽ. Xương sống huấn luyện thực tế cho hệ sinh thái trọng số mở. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,787 | Học hệ thống inference LLM trên Apple Silicon bằng cách xây dựng một vLLM + Qwen tí hon. Repo giáo dục hiếm hoi nhắm riêng vào inference trên Apple Silicon. |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 318 | Inference LLM trên thiết bị nhờ lượng tử hóa X-bit. Inference biên với lượng tử hóa mạnh là một ngách nhỏ nhưng bền bỉ. |

### 🔍 RAG / Tri thức (cơ sở dữ liệu vector, retrieval-augmented generation, quản lý tri thức)

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 156,506 | Giao diện AI thân thiện hỗ trợ Ollama, OpenAI API và hơn thế. Dự án gắn thẻ RAG có số sao cao nhất và là frontend chat tự host mặc định. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 148,302 | "Nền tảng kỹ thuật agent." Tái định vị từ framework RAG sang nền tảng agent — một bước chuyển chiến lược đáng chú ý. |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 142,750 | Hơn 100 AI agent, agent skill và ứng dụng RAG, miễn phí và mã nguồn mở. Bề mặt khám phá lưu lượng cao cho người hành nghề. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 102,353 | Ngữ cảnh bền bỉ xuyên phiên cho mọi agent — ghi lại hoạt động phiên, nén bằng AI và tiêm lại ngữ cảnh liên quan. Hoạt động trên Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot và OpenCode. Khả năng di chuyển bộ nhớ giữa các agent là cược chính của nó. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 92,686 | Engine RAG mã nguồn mở hàng đầu kết hợp retrieval với năng lực agent như một tầng ngữ cảnh cho LLM. Một trong số ít engine RAG lớn viết bằng Go. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 67,670 | Hạ tầng bộ nhớ cắm-là-chạy cho AI agent và ứng dụng, xây dựng cho môi trường production. Tầng bộ nhớ định vị "production" rõ ràng nhất trong nhóm. |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | Python | 40,614 | Cơ sở dữ liệu ngữ cảnh tự tiến hóa hợp nhất bộ nhớ agent, RAG tri thức và skill. Mảng cloud của ByteDance gộp ba tầng trước đây tách biệt vào một kho duy nhất. |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 32,680 | Nền tảng bộ nhớ AI mã nguồn mở cấp cho agent bộ nhớ dài hạn bền bỉ với mô hình nhỏ miễn phí. Nhấn mạnh việc chạy trích xuất bộ nhớ mà không tốn chi phí mô hình lớn. |

---

## 3. Phân tích tín hiệu xu hướng

**Hạng mục bùng nổ là agent skill và harness, không phải mô hình.** Ba trong năm repo trending hàng đầu hôm nay (`security-audit-skill`, `ponytail`, `graphify`) là skill cho coding-agent, và những mục có số sao cao nhất trong tìm kiếm chủ đề (`rea`, `ECC`, `hermes-agent`) đều ở tầng harness hoặc agent. Các bản phát hành mô hình đã bị hàng hóa hóa; nguồn lực khan hiếm đã chuyển sang cách agent được cấu hình, ràng buộc và cấp bộ nhớ. Sự xuất hiện của `headroom` như một tầng nén token chuyên dụng khẳng định chi phí vận hành agent đã trở thành mối quan tâm kỹ thuật hạng nhất.

**Hướng đi mới xuất hiện lần đầu: bộ nhớ như một tầng di động, và retrieval "không vector".** `claude-mem` nhắm thẳng vào khả năng di chuyển bộ nhớ giữa các agent, trong khi `OpenViking` hợp nhất bộ nhớ, RAG và skill vào một kho duy nhất — cả hai đều bác bỏ giả định rằng mỗi ứng dụng agent sở hữu ngữ cảnh riêng. Đồng thời, `graphify` (phân tích AST tất định, không vector store), `PageIndex` ("RAG không vector, dựa trên suy luận") và `LEANN` (tiết kiệm 97% lưu trữ) tạo thành một phong trào đối lập rõ rệt chống lại kiến trúc nặng về vector database. Đáng chú ý, `graphify` cũng xuất hiện trên bảng trending hôm nay, nghĩa là cách tiếp cận đi ngược này không chỉ là ngách nhỏ.

**Kết nối hệ sinh thái.** Danh sách mô hình của Ollama (Kimi, GLM, MiniMax, DeepSeek, Qwen, gpt-oss) phản ánh mức độ các bản phát hành trọng số mở Trung Quốc đã định hình mặc định inference cục bộ. Trong khi đó, `knowledge-work-plugins` của Anthropic và `security-audit-skill` của Cloudflare cho thấy các nhà cung cấp first-party đang chạy đua chiếm lĩnh registry skill trước khi quy ước cộng đồng cứng lại — cùng kiểu chiếm đất đã thấy quanh MCP trước đây.

---

## 4. Điểm nóng cộng đồng

- **[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)** — +2,979 sao hôm nay, mức tăng trong ngày lớn nhất toàn bộ dữ liệu. Việc các nhà cung cấp bảo mật doanh nghiệp bước vào không gian agent-skill gợi ý rằng đầu ra agent có thể kiểm toán, máy đọc được sẽ trở thành yêu cầu mua sắm.

- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) & [mem0ai/mem0](https://github.com/mem0ai/mem0)** — Duy trì bộ nhớ là tầng cạnh tranh gay gắt nhất hiện nay. Hãy theo dõi một chuẩn thực tế nổi lên; dự án nào được các agent khác nhau chấp nhận sẽ thắng vị trí bền vững.

- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — Vừa trending *vừa* có số sao cao trong chủ đề RAG. Cách tiếp cận tất định, không vector, có thể giải thích ở biên là thách thức mạnh nhất từ trước đến nay đối với retrieval dựa trên embedding cho code và tài liệu có cấu trúc.

- **[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)** — 173,773 sao và +1,948 hôm nay cho một repo có luận đề là "viết ít code hơn." Báo hiệu sự mệt mỏi ngày càng tăng của người hành nghề với tình trạng phình code do agent tạo ra.

- **[Affaan-m/ECC](https://github.com/affaan-m/ECC)** — 286,643 sao cho tối ưu harness đa agent bao trùm skill, bộ nhớ và bảo mật. Khi người dùng chạy nhiều agent (Claude Code, Codex, Cursor, Opencode), một tầng tinh chỉnh trung lập nhà cung cấp có sức hút rõ ràng.

- **[morluto/rea](https://github.com/morluto/rea)** — Số sao cao nhất toàn bộ dữ liệu (367,435) cho dịch ngược bằng agent. Đáng theo dõi cả về năng lực lẫn các câu hỏi chính sách mà nó đặt ra.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*