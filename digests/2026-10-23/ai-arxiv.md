# Bản tin nghiên cứu AI trên ArXiv 2026-10-23

> Nguồn dữ liệu: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 bài báo | Tạo lúc: 2026-10-23 04:29 UTC

---

# ArXiv AI Research Digest — 2026-10-22

## 1. Điểm nổi bật hôm nay

Các bài nộp hôm nay cho thấy một xu hướng mạnh mẽ hướng tới **việc làm cho hành vi của mô hình có thể kiểm chứng và đáng tin cậy trong điều kiện triển khai thực tế**, bao trùm kiểm toán quyền riêng tư, từ chối có chọn lọc, và đánh giá an toàn cho các agent sử dụng công cụ. Một nhóm bài đáng chú ý đặt câu hỏi về **hiệu quả tại thời điểm suy luận** trong các mô hình lý luận, từ cắt tỉa suy nghĩ nhận biết pass@k đến chia sẻ KV trong kiến trúc vòng lặp và học cách bỏ mặt nạ trong diffusion LM. Một số bài cũng trực tiếp khảo sát **động lực huấn luyện và các chế độ thất bại** — lỗi số học softmax, sụp đổ token trong graph soft prompting, rò rỉ token tương lai ẩn, và quên thảm khốc qua lý thuyết ổn định. Các lĩnh vực embodied và khoa học xuất hiện qua proxy căn chỉnh sensorimotor, học hành động cho mô phỏng, và tối ưu thiết kế vật liệu/kỹ thuật. Nhìn chung, xu hướng là hướng tới **kiểm toán chi tiết hơn và phân tích hậu kiểm** các mô hình thay vì chỉ tăng thuần năng lực.

## 2. Các bài báo chính

### 🧠 Mô hình ngôn ngữ lớn (kiến trúc, huấn luyện, căn chỉnh, đánh giá)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [A Fix for Softmax and Cross-Entropy](http://arxiv.org/abs/2610.31642v1) | Barron, Gnanapragasam, Tschannen et al. | Xác định hai lỗi số học (Softmax Collapse và Softmax Cancellation) trong các triển khai softmax/log-softmax/cross-entropy tiêu chuẩn. Đưa ra các công thức đã sửa có khả năng ảnh hưởng rộng rãi đến việc huấn luyện ổn định các mô hình lớn. |
| [Low-Bit N-Gram Embeddings for Language Models](http://arxiv.org/abs/2610.31646v1) | Chung, Du | Nén bảng embedding n-gram, vốn đã trở thành nút thắt bộ nhớ lớn trong các LM trọng số mở. Cung cấp một hướng hiệu quả thực tiễn để triển khai các mô hình tăng cường n-gram. |
| [BeNice! Closing Looping's Inference-Memory Gap via KV-Sharing](http://arxiv.org/abs/2610.31633v1) | Prairie, Ryan, Berg-Kirkpatrick et al. | Giải quyết vấn đề tăng trưởng KV-cache tuyến tính trong kiến trúc vòng lặp bằng cách chia sẻ cache qua các lần đệ quy. Giúp các mô hình vòng lặp mở rộng chất lượng trở nên thân thiện hơn với triển khai. |
| [Questioning Instrumental Convergence in RLVR: Checkpoint Evidence from OLMo-3](http://arxiv.org/abs/2610.31624v1) | Alparslan, Tanwisuth, Petterson | Kiểm tra thực nghiệm liệu RLVR có tạo ra các mục tiêu phụ tìm kiếm quyền lực hay không, sử dụng bằng chứng từ checkpoint. Cung cấp bằng chứng cụ thể hiếm hoi về một giả thuyết an toàn AI được viện dẫn rộng rãi nhưng chưa được kiểm chứng đầy đủ. |
| [Bilingual Language Models Capture Cross-Linguistic Influence in Second-Language Reading](http://arxiv.org/abs/2610.31620v1) | Issam, Winther, Frank | Cho thấy các LM song ngữ dự đoán thời gian đọc ngôn ngữ thứ hai tốt hơn surprisal đơn ngữ nhờ nắm bắt được sự chuyển giao từ L1. Kết nối tâm lý ngôn ngữ học với mô hình nhận thức dựa trên LM. |
| [OP-Print: Tracing Membership Imprints in On-Policy Self-Distillation](http://arxiv.org/abs/2610.31616v1) | Li, Wang | Truy vết các tín hiệu thành viên được đưa vào bởi on-policy self-distillation, phát hiện rủi ro quyền riêng tư trong huấn luyện không cần teacher. Quan trọng cho bất kỳ ai kiểm toán nguồn gốc dữ liệu trong các mô hình đã chưng cất. |
| [Who Is Sycophantic to Whom? Confident LLMs, Human Deference, and the Collapse of Trust Calibration](http://arxiv.org/abs/2610.31579v1) | Deepthika S, Yadav, Sankar | Nghiên cứu trên đối tượng người cho thấy người dùng phục tùng các LLM tự tin nhưng sai, làm sụp đổ hiệu chuẩn niềm tin. Định hình lại sycophancy như một thất bại hai chiều giữa người và AI. |
| [The Geometry of Metaphor: Probing and Steering Metaphor Representations in LLMs](http://arxiv.org/abs/2610.31520v1) | Li, Andersen, Lewis | Sử dụng diễn giải cơ chế để định vị và điều khiển các không gian con ẩn dụ qua các kiến trúc. Nâng cao hiểu biết về biểu diễn và kiểm soát ngôn ngữ ẩn dụ. |

### 🤖 Agent & Lý luận (lập kế hoạch, sử dụng công cụ, đa agent, chain-of-thought)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [Direct Pass@k Optimization for Thought Pruning](http://arxiv.org/abs/2610.31667v1) | Salmani, Javanmard, Gupta et al. | Cắt tỉa các dấu vết lý luận bằng mục tiêu pass@k trực tiếp, cân bằng chất lượng và đa dạng trong mở rộng tại thời điểm kiểm tra. Giảm chi phí suy luận trong khi bảo toàn hành vi ít nhất một đúng. |
| [EpiSEM-Bench: Evaluating Safety and Evidence Recovery in LLM Agents under Missing Evidence](http://arxiv.org/abs/2610.31650v1) | Zhang, Wang, Zhao et al. | Giới thiệu một benchmark nơi các sự kiện liên quan đến an toàn bị thiếu khiến agent thực hiện hành động bị cấm dù các phát biểu là đúng. Phơi bày một chế độ thất bại tinh tế cho các agent sử dụng công cụ. |
| [Causal Chain of Thought: Mitigating Attention Leakage via Context Isolation](http://arxiv.org/abs/2610.31639v1) | Dominici, McMillan, Barez et al. | Thực thi cô lập ngữ cảnh để các bước CoT dẫn dắt câu trả lời một cách nhân quả thay vì rò rỉ attention đến ngữ cảnh tương lai. Tăng cường tính trung thực của các giải thích lý luận. |
| [METTA: Memory-Enhanced Test-Time Adaptation for Meta-RL](http://arxiv.org/abs/2610.31656v1) | Najar, Hasani, Fattah et al. | Kết hợp bộ nhớ và thích ứng tại thời điểm kiểm tra cho meta-RL để biểu diễn bằng chứng nhiệm vụ tốt hơn qua lịch sử dài. Cải thiện thích ứng few-shot vượt qua các baseline recurrent hoặc transformer. |
| [Simulated Control Evals](http://arxiv.org/abs/2610.31593v1) | Olmo, Zhang, Tracy | Xem xét liệu đánh giá kiểm soát có tổng quát hóa từ môi trường tổng hợp sang triển khai thực tế hay không. Đóng góp phương pháp luận nền tảng cho nghiên cứu kiểm soát AI. |
| [Same Luck, Different Choice: Twin-World Credit Assignment for Agentic RL](http://arxiv.org/abs/2610.31544v1) | Surio, Engel, Chou et al. | Đề xuất phân nhánh phản thực tế twin-world chia sẻ nhiễu lấy mẫu qua các nhánh để gán tín dụng chính xác cho từng quyết định. Cải thiện gán tín dụng agentic RL so với phản thực tế ngây thơ. |
| [DuoCook: An Overcooked-Inspired Benchmark for Visual Planning and Coordination](http://arxiv.org/abs/2610.31511v1) | Jiao, Zhang, Regmi et al. | Trình bày một benchmark Unreal Engine cho lập kế hoạch thị giác và phân bổ tài nguyên hai agent. Nhắm vào khoảng trống năng lực trong phối hợp thị giác-ngôn ngữ dưới áp lực thời gian. |

### 🔧 Phương pháp & Framework (kỹ thuật mới, benchmark, cải thiện hiệu quả)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [Reliable AI-Assisted Decisions via Selective Auditing](http://arxiv.org/abs/2610.31662v1) | Gibbs, Han, Tibshirani et al. | Framework giám sát trực tuyến kiểm toán có chọn lọc các quyết định bằng điểm tin cậy từ các mô hình có thể khác nhau. Cung cấp đảm bảo độ tin cậy thống kê cho các luồng quyết định AI đã triển khai. |
| [SpectralCanary: Low-Frequency Traces for T2I Dataset-Use Auditing](http://arxiv.org/abs/2610.31659v1) | Ho, Satheesh, Chawathe et al. | Cấy tín hiệu tần số thấp vào bộ dữ liệu ảnh để cho phép phát hiện hậu kiểm việc tinh chỉnh trái phép. Cơ chế chủ động, đơn giản cho quản trị dữ liệu T2I. |
| [Cost-Aware Abstention for LLM-Based IT Ticket Classification](http://arxiv.org/abs/2610.31657v1) | Gupta | Định hình mức độ sẵn sàng định tuyến như lựa chọn chính sách phụ thuộc chi phí trên dữ liệu hiệu chuẩn. Công thức thực tiễn để quyết định khi nào nên từ chối so với định tuyến tự động. |
| [Shift-aware score transport for privacy auditing without retraining](http://arxiv.org/abs/2610.31549v1) | Yang, Pradhan, Chen et al. | Cho phép kiểm toán quyền riêng tư quan sát dưới dịch chuyển phân phối mà không cần canary hay huấn luyện lại. Mở rộng kiểm toán suy luận thành viên sang các thiết lập hộp đen thực tế. |
| [Efficient and Optimal Learning of Discrete Distributions with Person-Level Privacy](http://arxiv.org/abs/2610.31612v1) | Kamath, Majid, Moitra et al. | Cung cấp thuật toán thời gian đa thức với lỗi TV tối ưu cho học phân phối dưới DP cấp người. Tiến bộ lý thuyết ước lượng thống kê bảo toàn quyền riêng tư. |
| [Rethinking Sequence Compression with Test-time Regression](http://arxiv.org/abs/2610.31574v1) | Yang, Huang, Li et al. | Định hình lại nén chuỗi như hồi quy tại thời điểm kiểm tra, vượt trội hơn các baseline pooling và projection. Gợi ý một nguyên thủy mới cho mô hình ngôn ngữ và đa phương thức hiệu quả. |
| [Fine-Grained Analysis of Catastrophic Forgetting via Algorithmic Stability](http://arxiv.org/abs/2610.31551v1) | Zheng, Sun, Wang et al. | Sử dụng ổn định thuật toán để đưa ra các cận tổng quát, không phụ thuộc cấu trúc về quên. Cung cấp bộ công cụ lý thuyết để hiểu hành vi học liên tục. |
| [What Makes a Good Unmasking Policy?](http://arxiv.org/abs/2610.31576v1) | Sakurai, Xu, Yoon | Nghiên cứu có kiểm soát tách bạch giám sát, đầu vào, và năng lực trong học bỏ mặt nạ cho diffusion LM. Làm rõ lựa chọn thiết kế nào thực sự thúc đẩy lợi ích tốc độ–độ chính xác. |

### 📊 Ứng dụng (theo lĩnh vực, đa phương thức, sinh mã)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [Sensorimotor Alignment: A Platonic Proxy for Embodied Policy Success](http://arxiv.org/abs/2610.31670v1) | Xie, Qian, Lan et al. | Đề xuất căn chỉnh sensorimotor như proxy offline rẻ để đánh giá chất lượng chính sách embodied, mở rộng Giả thuyết Biểu diễn Platonic. Có thể thay thế các rollout vòng kín tốn kém trong đánh giá robot. |
| [How Ground Truth Shapes Retrieval Scores: Evidence-Aware Evaluation of a RAG System for Breast Lesions](http://arxiv.org/abs/2610.31606v1) | Mochizuki Silva, Ismael, Dias et al. | Cho thấy các chỉ số truy xuất trong RAG lâm sàng phụ thuộc nhiều vào độ phủ chú thích, đề xuất đánh giá nhận biết bằng chứng. Cảnh báo quan trọng cho benchmark RAG y tế. |
| [Would an LLM Match into a Residency?](http://arxiv.org/abs/2610.31586v1) | Fernandez-de-Retana, Zulaika, Sanchez-Corcuera et al. | Đánh giá các LLM mở trên kỳ thi MIR Tây Ban Nha với chú ý đến độ bất định, lý luận, và sử dụng hình ảnh. Vượt ra ngoài độ chính xác để hướng tới mức độ sẵn sàng y tế liên quan đến triển khai. |
| [An Empirical Study of Recent LLMs for KG-to-Text on Standard Benchmarks](http://arxiv.org/abs/2610.31529v1) | Priyanka, Delbru, Bakkali et al. | Đánh giá các LLM gần đây so với encoder–decoder đã tinh chỉnh cho việc diễn đạt đồ thị tri thức. Cung cấp hướng dẫn cập nhật về khi nào LLM cạnh tranh cho structured-to-text. |
| [Action Learning for Scientific Simulations](http://arxiv.org/abs/2610.31585v1) | Liaw, Du, Du | Học các mục tiêu cấp quỹ đạo để điều khiển mô phỏng khoa học thay vì chuyển tiếp cục bộ. Nắm bắt tốt hơn các phụ thuộc tầm xa trong nhiệm vụ điều khiển khoa học. |
| [Piano2Pop: Expanding Piano Demos into Pop Productions](http://arxiv.org/abs/2610.31510v1) | Cheng, Tan, Huang et al. | Sử dụng giám sát giả không căn chỉnh để biến piano MIDI thành các bản phối pop đầy đủ qua mô hình flow-matching. Trình diễn sản xuất âm nhạc có thể mở rộng mà không cần dữ liệu ghép cặp. |
| [FairFRESH: Neuro-Symbolic Fair Food Recommendation](http://arxiv.org/abs/2610.31506v1) | Sathvik, Bora, M | Định hình gợi ý thực phẩm hộ gia đình như phân chia công bằng có ràng buộc với lý luận neuro-symbolic. Giải quyết khoảng trống thực tế trong công bằng hệ gợi ý đa người dùng. |

## 3. Tín hiệu xu hướng nghiên cứu

Một chủ đề rõ ràng xuyên suốt các bài nộp hôm nay là **kiểm toán và độ tin cậy của các mô hình đã triển khai thay vì chỉ mở rộng thuần năng lực**. Các bài như SpectralCanary, shift-aware privacy transport, OP-Print, và phát hiện rò rỉ token tương lai ẩn đều nhắm đến việc *xác minh* những gì mô hình đã học, đã ghi nhớ, hoặc đã rò rỉ — dấu hiệu cho thấy lĩnh vực đang trưởng thành hướng tới trách nhiệm giải trình. Thứ hai, **hiệu quả tại thời điểm suy luận** vẫn là chiến trường: cắt tỉa pass@k, chia sẻ KV cho mô hình vòng lặp, embedding n-gram bit thấp, và học bỏ mặt nạ đều nhắm vào các tầng khác nhau của chồng chi phí. Thứ ba, **các framework lý luận phản thực tế và nhân quả** (gán tín dụng Twin-World, Causal CoT, Diona) đang hội tụ về ý tưởng rằng thiết kế *chia sẻ nhiễu* hoặc *cô lập ngữ cảnh* mang lại tín dụng và giải thích trung thực hơn. Cuối cùng, động lực hướng đến con người — sycophancy, hiệu chuẩn niềm tin, đọc L2 — cho thấy sự quan tâm ngày càng tăng đối với vòng lặp người–mô hình như một đối tượng nghiên cứu hạng nhất.

## 4. Đáng đọc sâu

1. **[Reliable AI-Assisted Decisions via Selective Auditing](http://arxiv.org/abs/2610.31662v1)** — Bài này giải quyết một câu hỏi nền tảng: làm thế nào để đảm bảo thống kê độ tin cậy của một luồng quyết định AI khi các quyết định và điểm tin cậy có thể đến từ các mô hình khác nhau. Framework này có khả năng trở thành tài liệu tham chiếu cho giám sát trực tuyến và kiểm toán có chọn lọc trong các triển khai được quản lý.

2. **[A Fix for Softmax and Cross-Entropy](http://arxiv.org/abs/2610.31642v1)** — Các lỗi số học trong softmax và log-softmax âm thầm ảnh hưởng đến huấn luyện và tinh chỉnh ở quy mô lớn. Nếu các lỗi được báo cáo phổ biến như tuyên bố, đây là bài đọc có đòn bẩy cao cho bất kỳ ai huấn luyện hoặc gỡ lỗi các mô hình lớn, bao gồm cả thuộc tính tổng gradient bằng không.

3. **[EpiSEM-Bench: Evaluating Safety and Evidence Recovery in LLM Agents under Missing Evidence](http://arxiv.org/abs/2610.31650v1)** — Giới thiệu một chế độ thất bại chính xác, có động cơ rõ ràng (agent hành động dựa trên bằng chứng đúng nhưng không đầy đủ) mà các benchmark an toàn hiện có bỏ sót. Bài đọc thiết yếu cho các nhóm xây dựng agent sử dụng công cụ, và là mẫu mạnh cho các đánh giá an toàn trong tương lai.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*