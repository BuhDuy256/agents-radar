# Xu hướng mã nguồn mở AI 2026-10-23

> Nguồn dữ liệu: GitHub Trending + GitHub Search API | Tạo lúc: 2026-10-23 05:49 UTC

---

# Báo cáo Xu hướng AI Mã nguồn mở — 2026-10-23

---

## 1. Điểm nổi bật hôm nay

Dữ liệu trending trên GitHub hôm nay cho thấy một sự chuyển dịch rõ rệt từ "xây dựng mô hình AI" sang **tối ưu cách các agent tiêu thụ và lưu trữ ngữ cảnh**. Chủ đề thống trị duy nhất là hiệu quả token và bộ nhớ: các dự án như `headroom`, `graphify` và `claude-mem` đều giải quyết cùng một vấn đề — agent lãng phí token vào ngữ cảnh không liên quan, và người thắng cuộc là những ai nén, lập chỉ mục hoặc lưu trữ nó một cách thông minh. Trong khi đó, `cloudflare/security-audit-skill` (+2.979) và `DietrichGebert/ponytail` (+1.948) cho thấy sức hút bùng nổ của **"skill" cho coding-agent** như một định dạng phân phối mới — những gói năng lực mỏng, có thể kết hợp thay vì các framework đồ sộ. Danh mục RAG đang âm thầm bị chiếm lĩnh bởi các phương pháp truy xuất "không vector" và dựa trên đồ thị (`PageIndex`, `graphify`, `LEANN`), báo hiệu rằng kỷ nguyên vector-store đang chín muồi chứ không phải kết thúc. Đáng chú ý, gần như mọi repo trending đều là *skill, harness hoặc lớp ngữ cảnh* cho Claude Code / Codex / Cursor — IDE agent giờ đây đã trở thành nền tảng chính.

---

## 2. Dự án hàng đầu theo danh mục

### 🔧 Hạ tầng AI

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 286.670 | Hệ thống tối ưu hiệu năng agent harness, bổ sung skill, instinct, bộ nhớ và bảo mật cho Claude Code, Codex, Cursor và nhiều công cụ khác. Số sao khổng lồ cho thấy tối ưu ở cấp harness đã trở thành mối quan tâm hàng đầu của lập trình viên. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 184.366 | Trình chạy mô hình cục bộ thực tế, hiện hỗ trợ Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen và Gemma. Vẫn là điểm khởi đầu cho suy luận tự lưu trữ và là thước đo cho việc tiếp nhận mô hình trọng số mở. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 173.841 (+1.948) | Plugin khiến AI agent "suy nghĩ như một senior dev lười nhất", ưu tiên code tối giản. Mức +1.948 hôm nay là một trong những tín hiệu đà tăng mạnh nhất trong ngày cho công cụ hành vi agent. |
| [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | Go | 35.938 | Coding agent đáng tin cậy được xây dựng riêng cho các tác vụ kỹ thuật phần mềm phức tạp. Đại diện cho thị trường ngách "agent tinh chỉnh suy luận" đang nổi lên bằng Go. |
| [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi) | TypeScript | 36.312 | Coding agent tích hợp trực tiếp IDE, do Stencil Labs xây dựng. Làm nổi bật xu hướng agent được phát hành dưới dạng IDE-native thay vì CLI độc lập. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4.787 | Dự án giảng dạy xây dựng một stack suy luận vLLM + Qwen nhỏ gọn trên Apple Silicon cho kỹ sư hệ thống. Có giá trị như một trong số ít hướng dẫn thực hành phục vụ LLM trên phần cứng cục bộ. |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 318 | Suy luận LLM trên thiết bị nhờ lượng tử hóa X-bit. Một tín hiệu nhỏ nhưng mang tính chiến lược cho suy luận biên/riêng tư. |

### 🤖 AI Agent / Quy trình công việc

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 256.307 | "Agent phát triển cùng bạn", từ đội ngũ đứng sau dòng mô hình Hermes. Số sao đứng đầu danh sách khiến nó trở thành framework agent mở hàng đầu hiện tại. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 101.101 | Cho agent con mắt khắp Twitter, Reddit, YouTube, GitHub, Bilibili và XiaoHongShu qua một CLI duy nhất với chi phí API bằng không. Một giải pháp thực dụng cho vấn đề truy cập dữ liệu của agent. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 76.657 | Agent tìm việc AI quét các bảng tin, chấm điểm vị trí dựa trên CV của bạn và tùy chỉnh CV thân thiện với ATS. Chạy cục bộ trong Claude Code/Codex — một ví dụ mạnh mẽ về agent theo ngành dọc. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 66.211 | Biến tài liệu hoặc chủ đề thành bộ PowerPoint gốc với shape, biểu đồ, thuyết minh và template tùy chỉnh thật. Một trong những công cụ "agent tạo ra sản phẩm thật" thiết thực nhất đang trending hôm nay. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 52.899 | Studio năng suất AI cung cấp chat thông minh, agent tự trị và hơn 300 trợ lý trên các LLM tiên tiến. Một workspace agent hướng người tiêu dùng đã trưởng thành. |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | Python | 49.289 | Framework agent cá nhân tự lưu trữ, siêu nhẹ với WebUI, công cụ, bộ nhớ, MCP và quy trình đa agent. Phản ánh nhu cầu về lõi agent tối giản, dễ tùy biến. |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | Python | 47.512 | Trợ lý AI cá nhân và agent harness biết lập kế hoạch, chạy công cụ/skill và tự tiến hóa với bộ nhớ. Đa mô hình, đa kênh, cài đặt một dòng lệnh. |
| [Codewhale](https://github.com/codewhale-hq/Codewhale) | Rust | 41.111 | Agent gốc terminal viết bằng Rust hỗ trợ mọi nhà cung cấp hoặc mô hình. Đáng chú ý là một trong số ít agent Rust có nhiều sao, gợi ý về runtime agent ưu tiên hiệu năng. |

### 📦 Ứng dụng AI

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | JavaScript | 0 (+2.979 hôm nay) | Skill cho coding-agent dùng để kiểm tra bảo mật đa giai đoạn với kết quả được xác minh độc lập, đọc được bằng máy. Mức +2.979 là mức tăng trong ngày lớn nhất hôm nay và cho thấy các nhà cung cấp doanh nghiệp đang phát hành skill agent trực tiếp. |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | Python | 0 (+303 hôm nay) | Kho plugin mã nguồn mở của Anthropic cho nhân viên tri thức dùng Claude Cowork. Việc phân phối plugin agent bên thứ nhất là một tín hiệu nền tảng quan trọng. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 134.330 | Tạo video ngắn HD từ một chủ đề hoặc từ khóa qua quy trình AI tự động. Một mục yêu thích lâu dài trong ngành truyền thông sáng tạo. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 66.909 | Hệ thống phân tích chứng khoán đa thị trường bằng LLM với tin tức trực tiếp, dashboard và thông báo theo lịch miễn phí. Minh họa cho sự bùng nổ agent ngành tài chính. |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Python | 36.355 | Agent giao dịch cá nhân từ phòng thí nghiệm HKUDS. Thuộc một cụm agent tài chính đang cùng trending. |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Python | 42.207 | Gia sư cá nhân hóa suốt đời nhờ LLM. Đại diện cho sự hiện diện ngày càng tăng của agent trong ngành giáo dục. |

### 🧠 LLM / Huấn luyện

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 201.193 | Framework ML mở lâu đời. Vẫn là điểm tham chiếu cho ML sản xuất bất chấp sự chuyển dịch sang PyTorch thời kỳ LLM. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 168.010 | Framework định nghĩa mô hình cho các mô hình văn bản, thị giác, âm thanh và đa phương thức tiên tiến. Vẫn là trung tâm chung cho trọng số và kiến trúc mô hình. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 104.993 | Tensor và mạng nơ-ron động với tăng tốc GPU mạnh mẽ. Nền tảng huấn luyện mặc định cho gần như mọi công việc LLM mở. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7.537 | Nền tảng đánh giá LLM bao gồm OpenAI, Anthropic, Gemini, Qwen, GLM và DeepSeek trên hơn 100 bộ dữ liệu. Đánh giá ngày càng là nút thắt khi phát hành, khiến nó có tầm quan trọng chiến lược. |
| [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) | HTML | 1.865 | Awesome-list về học tăng cường cho agent. Báo hiệu RL cho agent đang trở thành một phân ngành nghiên cứu riêng biệt. |
| [datamllab/OpenEBFM](https://github.com/datamllab/OpenEBFM) | Python | 129 | Mã nguồn mở để huấn luyện và mở rộng mô hình nền tảng dựa trên năng lượng. Một hướng huấn luyện mới lạ, đáng theo dõi. |
| [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) | TypeScript | 1.442 | Tổng quan về các LLM tiếng Nhật. Phản ánh sự phát triển tiếp tục của hệ sinh thái mô hình chủ quyền/phi tiếng Anh. |

### 🔍 RAG / Tri thức

| Dự án | Ngôn ngữ | Sao (tổng / hôm nay) | Tóm tắt |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 133.226 (+1.408) | Biến mọi codebase, tài liệu, schema SQL, cấu hình và PDF thành đồ thị tri thức có thể truy vấn bằng phân tích AST cục bộ tất định — không cần vector store. Mức +1.408 hôm nay đánh dấu truy xuất dựa trên đồ thị, có thể giải thích, như một đối thủ thực sự của embedding. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 102.364 | Ngữ cảnh liên phiên bền vững cho agent, nén hoạt động phiên và tái đưa bộ nhớ liên quan vào. Hoạt động trên Claude Code, OpenClaw, Codex, Gemini và Copilot — lưu trữ ngữ cảnh giờ là mối quan tâm đa nhà cung cấp. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 77.588 | Nén đầu ra công cụ, log, tệp và đoạn RAG trước khi chúng đến LLM — tiết kiệm 60-95% token trên JSON với câu trả lời tương đương. Phát hành dưới dạng thư viện, proxy và MCP server; thuần túy là bài toán kinh tế token. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 67.671 | Lớp bộ nhớ cắm-vào-dùng-ngay cho AI agent và ứng dụng. Một trong những hạ tầng bộ nhớ được thiết lập nhất, nay định vị cho môi trường sản xuất. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 92.694 | Engine RAG mã nguồn mở hàng đầu kết hợp truy xuất với năng lực agent để tạo thành lớp ngữ cảnh vượt trội. Một trụ cột nặng ký của danh mục RAG. |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 39.508 | Chỉ mục tài liệu cho RAG không vector, dựa trên suy luận. Thuộc làn sóng chống vector-store đang hiện rõ cùng với graphify và LEANN. |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | Python | 40.625 | Cơ sở dữ liệu ngữ cảnh tự tiến hóa hợp nhất bộ nhớ agent, RAG tri thức và skill. Sự tham gia của Volcengine báo hiệu cạnh tranh đám mây lớn trong không gian lớp ngữ cảnh. |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | Python | 13.058 | Hệ thống RAG đạt giải best-paper MLSys 2026, tiết kiệm 97% dung lượng lưu trữ cho truy xuất trên thiết bị hoàn toàn riêng tư. Sự công nhận học thuật cộng với hiệu quả cực cao khiến nó nổi bật. |

---

## 3. Phân tích tín hiệu xu hướng

**Lớp ngữ cảnh là chiến trường.** Ba trong số các dự án có đà tăng mạnh nhất hôm nay — `graphify` (+1.408), `headroom` và `claude-mem` — không phải là mô hình hay thậm chí agent; chúng là *trình quản lý ngữ cảnh*. Cộng đồng đã nhận thức rằng việc nhồi nhét ngữ cảnh ngây thơ là không bền vững, và giờ đang cạnh tranh về tỷ lệ nén (headroom giảm 60-95% JSON), tính bền vững (claude-mem) và khả năng giải thích (graphify với "mọi cạnh đều được giải thích").

**"Skill" là định dạng phân phối mới.** `cloudflare/security-audit-skill` (+2.979) và `anthropics/knowledge-work-plugins` cho thấy các nhà cung cấp giờ phát hành *năng lực* thay vì framework. Một skill thì nhỏ, có thể kiểm toán và cài vào agent hiện có — một đơn vị phân phối về cơ bản khác với thư viện hay ứng dụng. Hãy kỳ vọng điều này trở thành cách tiếp cận thị trường chủ đạo cho công cụ AI đến năm 2027.

**Truy xuất không vector và đồ thị đang lên ngôi.** `PageIndex` ("RAG không vector, dựa trên suy luận"), `graphify` ("không vector store") và `LEANN` đều từ chối mô hình thuần embedding để chuyển sang suy luận, đồ thị hoặc chỉ mục nén cực mạnh. Đây là phản ứng trực tiếp trước tính mờ đục và chi phí của vector store, và nó đến với sự hậu thuẫn học thuật (best paper MLSys của LEANN).

**Tín hiệu về stack.** Rust xuất hiện ngày càng nhiều trong các agent nghiêm túc (`Codewhale`), trong khi Go thống trị hạ tầng phục vụ agent và vector (`ollama`, `ragflow`, `DeepSeek-Reasonix`). Các ngành dọc tài chính, giáo dục và nghề nghiệp đang tụ lại rõ rệt (ba repo tài chính/giáo dục của HKUDS), gợi ý rằng agent ngành dọc là làn sóng tiếp theo khi các harness ngang đã đông đúc.

---

## 4. Điểm nóng cộng đồng

- **`headroom` và kinh tế token** — Khi phiên agent ngày càng dài, token đầu vào chiếm ưu thế về chi phí. Một thư viện/proxy cắt 60-95% token JSON với câu trả lời tương đương có thể triển khai ngay và giảm trực tiếp hóa đơn; mọi đội agent nên đo điểm chuẩn với nó.
- **`graphify` + `PageIndex` (truy xuất không vector)** — Đây là lựa chọn kiến trúc đáng tin cậy thay cho pipeline embedding, với phân tích AST cục bộ và các cạnh có thể giải thích. Đáng để thử nghiệm nếu RAG của bạn gặp trích dẫn ảo giác hoặc phình dung lượng lưu trữ.
- **`claude-mem` và bộ nhớ liên phiên** — Bộ nhớ bền vững không phụ thuộc nhà cung cấp, hoạt động trên Claude Code, Codex, Gemini và Copilot là một thắng lợi hiếm hoi về khả năng tương tác; hãy theo dõi nó trở thành lớp chuẩn thực tế.
- **"Skill" agent như một định dạng (`cloudflare/security-audit-skill`, `anthropics/knowledge-work-plugins`)** — Với việc cả Cloudflare và Anthropic cùng phát hành skill bên thứ nhất trong cùng một ngày, lập trình viên nên học cách viết và kiểm toán skill ngay bây giờ, trước khi định dạng này bị đóng băng.
- **`career-ops` và agent tài chính (`Vibe-Trading`, `daily_stock_analysis`)** — Các agent ngành dọc, cục bộ, có con người trong vòng lặp đang chứng minh khả năng sinh lời. Đây là các mẫu để áp dụng stack agent vào một lĩnh vực giá trị cao duy nhất.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*