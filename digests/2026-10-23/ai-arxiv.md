# Bản tin nghiên cứu AI trên ArXiv 2026-10-23

> Nguồn dữ liệu: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 bài báo | Tạo lúc: 2026-10-23 05:49 UTC

---

# ArXiv AI Research Digest — 23 tháng 10, 2026

## Điểm nổi bật hôm nay

Các bài gửi hôm nay cho thấy một xu hướng mạnh mẽ hướng tới **độ tin cậy và khả năng kiểm soát của các hệ thống AI đã triển khai**: từ chối trả lời có nhận thức về chi phí, kiểm toán chọn lọc, và công cụ tuân thủ EU AI Act cho thấy lĩnh vực này đang trưởng thành từ các bài đánh giá năng lực sang độ tin cậy vận hành. **Hiệu quả suy luận tại thời điểm kiểm tra** là một mạch chính khác, với các phương pháp mới để cắt tỉa suy nghĩ, chính sách bỏ mặt nạ trong diffusion LM, và nén chuỗi thông qua hồi quy tại thời điểm kiểm tra. Các công trình ở mức cơ chế cũng nổi bật — các bản sửa lỗi mới cho lỗi số học softmax/cross-entropy lâu đời, chuỗi suy nghĩ nhân quả thông qua cô lập ngữ cảnh, và khả năng diễn giải các biểu diễn ẩn dụ. Cuối cùng, **đánh giá tác tử** đang đa dạng hóa nhanh chóng: các benchmark cho an toàn khi thiếu bằng chứng, lập kế hoạch thị giác, và gỡ lỗi kho ngữ liệu cho thấy các tác tử đang được kiểm tra áp lực trong các bối cảnh thực tế hơn, có tính rủi ro cao hơn.

---

## Các bài báo chính

### 🧠 Mô hình ngôn ngữ lớn (kiến trúc, huấn luyện, căn chỉnh, đánh giá)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [A Fix for Softmax and Cross-Entropy](http://arxiv.org/abs/2610.31642v1) | Barron, Gnanapragasam, Tschannen và cs. | Xác định hai lỗi số học — "Softmax Collapse" và "Softmax Cancel[lation]" — trong các triển khai softmax/log-softmax/cross-entropy tiêu chuẩn gây hỏng gradient. Cung cấp bản sửa lỗi thực tiễn ảnh hưởng đến hầu như mọi pipeline huấn luyện mạng nơ-ron hiện đại, khiến đây trở thành một chỉnh sửa có tác động rộng lớn. |
| [Low-Bit N-Gram Embeddings for Language Models](http://arxiv.org/abs/2610.31646v1) | Chung, Du | Nén bảng nhúng n-gram thành biểu diễn bit thấp, nhắm vào nút thắt bộ nhớ lớn trong các mô hình trọng số mở sử dụng các bảng này. Mang lại lợi ích hiệu quả thực tiễn cho việc triển khai LM quy mô lớn. |
| [Questioning Instrumental Convergence in RLVR: Checkpoint Evidence from OLMo-3](http://arxiv.org/abs/2610.31624v1) | Alparslan, Tanwisuth, Petterson | Kiểm tra thực nghiệm liệu học tăng cường từ phần thưởng có thể xác minh có tạo ra các mục tiêu phụ tìm kiếm quyền lực (tự bảo tồn, lừa dối, chống giám sát) qua các checkpoint OLMo-3 hay không. Cung cấp bằng chứng thực nghiệm hiếm hoi về một tuyên bố an toàn AI được lý thuyết hóa nhiều. |
| [Causal Chain of Thought: Mitigating Attention Leakage via Context Isolation](http://arxiv.org/abs/2610.31639v1) | Dominici, McMillan, Barez và cs. | Chỉ ra rằng các bước CoT tiêu chuẩn có thể rò rỉ attention vào toàn bộ ngữ cảnh, làm suy yếu các tuyên bố nhân quả về tính trung thực của suy luận, sau đó đề xuất cô lập ngữ cảnh để thực thi chuỗi nhân quả. Quan trọng cho khả năng diễn giải và suy luận đáng tin cậy. |
| [Bilingual Language Models Capture Cross-Linguistic Influence in Second-Language Reading](http://arxiv.org/abs/2610.31620v1) | Issam, Winther, Frank | Chứng minh rằng surprisal của LM song ngữ dự đoán thời gian đọc L2 tốt hơn các baseline đơn ngữ, nắm bắt hiệu ứng chuyển giao từ L1 sang L2. Kết nối mô hình nhận thức và đánh giá LM. |
| [Efficient and Optimal Learning of Discrete Distributions with Person-Level Privacy](http://arxiv.org/abs/2610.31612v1) | Kamath, Majid, Moitra và cs. | Đưa ra thuật toán tối ưu, thời gian đa thức để học các phân phối rời rạc dưới quyền riêng tư vi phân cấp cá nhân trong thiết lập theo lô. Củng cố nền tảng lý thuyết cho học bảo toàn quyền riêng tư. |
| [On the Token Collapse Phenomenon in Textual Graph Soft Prompting](http://arxiv.org/abs/2610.31572v1) | Di Francesco, Jain, Nardini và cs. | Chẩn đoán "token collapse" trong soft prompting đồ thị (ví dụ: G-Retriever) nơi các token đồ thị được học mất khả năng phân biệt. Xác định một chế độ thất bại cụ thể và thúc đẩy cải thiện giao diện đồ thị-sang-LLM. |
| [The Geometry of Metaphor: Probing and Steering Metaphor Representations in LLMs](http://arxiv.org/abs/2610.31520v1) | Li, Andersen, Lewis | Sử dụng khả năng diễn giải cơ chế để định vị các không gian con nhân quả cho ẩn dụ across architectures và điều khiển chúng. Thúc đẩy cả hiểu biết ngôn ngữ-nhận thức và khả năng kiểm soát LLM. |
| [Beyond Causal Masks: Auditing and Localizing Hidden Future-Token Leakage in Adaptive Sequence Models](http://arxiv.org/abs/2610.31522v1) | Liu, Wu | Phát hiện rò rỉ token tương lai ẩn trong các decoder định tuyến dư thích ứng làm phồng các chỉ số teacher-forced trong khi làm suy giảm sinh tự do. Cung cấp phương pháp kiểm toán để định vị rò rỉ — quan trọng cho đánh giá kiến trúc trung thực. |

### 🤖 Tác tử & Suy luận (lập kế hoạch, sử dụng công cụ, đa tác tử, chuỗi suy nghĩ)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [Direct Pass@$k$ Optimization for Thought Pruning: Balancing Quality and Diversity in Test-Time Reasoning](http://arxiv.org/abs/2610.31667v1) | Salmani, Javanmard, Gupta và cs. | Tối ưu hóa cắt tỉa suy nghĩ trực tiếp cho pass@k, cân bằng chất lượng giải pháp và đa dạng trong mở rộng tại thời điểm kiểm tra. Giảm tính toán cho các mô hình suy luận mà không hy sinh độ chính xác câu trả lời cuối. |
| [EpiSEM-Bench: Evaluating Safety and Evidence Recovery in LLM Agents under Missing Evidence](http://arxiv.org/abs/2610.31650v1) | Zhang, Wang, Zhao và cs. | Giới thiệu một benchmark nơi phản hồi công cụ bỏ sót các sự kiện liên quan đến an toàn, khiến tác tử phê duyệt các hành động bị cấm mặc dù mọi tuyên bố được trả về đều đúng. Phơi bày một chế độ thất bại tinh tế nhưng nghiêm trọng trong các tác tử sử dụng công cụ. |
| [Would an LLM Match into a Residency? Uncertainty, Reasoning and Image Use of Open Language Models on the Spanish MIR Examination](http://arxiv.org/abs/2610.31586v1) | Fernandez-de-Retana, Zulaika, Sanchez-Corcuera và cs. | Ngoài độ chính xác thô, đánh giá hiệu chuẩn độ bất định, suy luận, và sử dụng hình ảnh của các LM mở trên một kỳ thi cấp phép y khoa thực tế. Đặt ra tiêu chuẩn cao hơn cho sự sẵn sàng lâm sàng của các mô hình mở. |
| [Simulated Control Evals](http://arxiv.org/abs/2610.31593v1) | Olmo, Zhang, Tracy | Đề xuất mô phỏng các thiết lập kiểm soát giống triển khai để làm cho đánh giá kiểm soát đại diện hơn và giảm lỗi ngoại suy. Cải thiện độ trung thực của kiểm thử kiểm soát an toàn AI. |
| [Same Luck, Different Choice: Twin-World Credit Assignment for Agentic Reinforcement Learning](http://arxiv.org/abs/2610.31544v1) | Surio, Engel, Chou và cs. | Một sơ đồ đối chứng hai thế giới cho gán tín dụng kết hợp nhiễu lấy mẫu nhánh với tập thực tế, sửa một độ lệch trong phân nhánh đối chứng. Làm sắc nét tín dụng theo từng quyết định trong RL tác tử tầm xa. |
| [METTA: Memory-Enhanced Test-Time Adaptation for Meta-Reinforcement Learning](http://arxiv.org/abs/2610.31656v1) | Najar, Hasani, Fattah và cs. | Kết hợp cơ chế bộ nhớ với thích ứng tại thời điểm kiểm tra cho meta-RL, cải thiện biểu diễn bằng chứng nhiệm vụ lịch sử dài. Giải quyết một hạn chế chính của cả tác tử meta-RL dựa trên hồi tiếp và transformer. |
| [DuoCook: An Overcooked-Inspired Benchmark for Visual Planning and Coordination](http://arxiv.org/abs/2610.31511v1) | Jiao, Zhang, Regmi và cs. | Một benchmark Unreal Engine kiểm tra các tác tử thị giác-ngôn ngữ về lập kế hoạch thị giác và phối hợp đa tác tử dưới áp lực thời gian. Mở rộng đánh giá tác tử sang cộng tác động, có thân thể. |
| [Would an LLM Match into a Residency? ...](http://arxiv.org/abs/2610.31586v1) | (xem ở trên) | — |

### 🔧 Phương pháp & Khung (kỹ thuật mới, benchmark, cải thiện hiệu quả)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [Reliable AI-Assisted Decisions via Selective Auditing](http://arxiv.org/abs/2610.31662v1) | Gibbs, Han, Tibshirani và cs. | Phát triển một khung giám sát trực tuyến nơi quyết định và điểm tin cậy của nó có thể đến từ các mô hình khác nhau, cho phép phân bổ kiểm toán chọn lọc. Cung cấp đảm bảo thống kê để triển khai các hệ thống quyết định AI một cách có trách nhiệm. |
| [Sensorimotor Alignment: A Platonic Proxy for Embodied Policy Success](http://arxiv.org/abs/2610.31670v1) | Xie, Qian, Lan và cs. | Đề xuất căn chỉnh giác quan-vận động như một proxy ngoại tuyến rẻ, lấy cảm hứng từ Giả thuyết Biểu diễn Platonic, để đánh giá các mô hình nền tảng robot mà không cần rollout vòng kín tốn kém. Có thể giảm đáng kể chi phí đánh giá trong AI có thân thể. |
| [BeNice! Closing Looping's Inference-Memory Gap via KV-Sharing](http://arxiv.org/abs/2610.31633v1) | Prairie, Ryan, Berg-Kirkpatrick và cs. | Giải quyết sự phình bộ nhớ trong kiến trúc lặp bằng cách chia sẻ bộ đệm KV qua các lần lặp thay vì tái tạo chúng. Giữ lợi ích hiệu quả tham số của looping tại thời điểm suy luận. |
| [Rethinking Sequence Compression with Test-time Regression](http://arxiv.org/abs/2610.31574v1) | Yang, Huang, Li và cs. | Tái định hình nén chuỗi như hồi quy tại thời điểm kiểm tra, vượt trội hơn các baseline pooling và chiếu được học. Mang lại cải thiện đa dụng cho mô hình ngôn ngữ và đa phương thức. |
| [When to Follow the Teacher: Advantage-Based On-Policy Distillation](http://arxiv.org/abs/2610.31563v1) | Sabbaghi, Pappas, Hassani và cs. | Thay vì buộc học sinh đi theo giáo viên ở mọi trạng thái, cân trọng số hướng dẫn theo advantage, chỉ đi theo giáo viên ở nơi có lợi. Làm cho chưng cất on-policy hiệu quả hơn SFT across regimes. |
| [Fine-Grained Analysis of Catastrophic Forgetting in Continual Learning via Algorithmic Stability](http://arxiv.org/abs/2610.31551v1) | Zheng, Sun, Wang và cs. | Cung cấp khung lý thuyết dựa trên ổn định thuật toán đưa ra các cận chi tiết về quên lãng mà không cần giả định hạn chế về mô hình/nhiệm vụ. Làm sâu sắc hiểu biết lý thuyết về học liên tục. |
| [Shift-aware score transport for privacy auditing without retraining](http://arxiv.org/abs/2610.31549v1) | Yang, Pradhan, Chen và cs. | Cho phép kiểm toán quyền riêng tư quan sát (không canary, không huấn luyện lại) thông qua vận chuyển điểm nhận thức dịch chuyển, đưa ra cận dưới suy luận thành viên hợp lệ dưới dịch chuyển phân phối. Mở rộng tính thực tiễn của kiểm toán quyền riêng tư. |
| [What Makes a Good Unmasking Policy? A Controlled Study of Learned Unmasking in Diffusion Language Models](http://arxiv.org/abs/2610.31576v1) | Sakurai, Xu, Yoon | Phân tách một cách hệ thống giám sát, đầu vào, và năng lực trong các chính sách bỏ mặt nạ được học cho masked diffusion LM. Làm rõ lựa chọn thiết kế nào thực sự quan trọng cho đánh đổi tốc độ-độ chính xác. |
| [Efficient and Optimal Learning of Discrete Distributions with Person-Level Privacy](http://arxiv.org/abs/2610.31612v1) | (xem ở trên) | — |
| [FairFRESH: A Neuro-Symbolic Framework for Fair and Explainable Household Food Recommendation](http://arxiv.org/abs/2610.31506v1) | Sathvik, Bora, M | Định hình gợi ý thực phẩm hộ gia đình như phân chia công bằng có ràng buộc, kết hợp suy luận thần kinh-biểu tượng với khả năng giải thích. Mở rộng gợi ý nhận thức công bằng sang thiết lập đa người dùng, tài nguyên chia sẻ. |
| [Direct Inference on Admissible Sets (Diona)](http://arxiv.org/abs/2610.31526v1) | Sabug, Kerrigan | Một phương pháp hồi quy ước lượng trạng thái và đạo hàm với cận chấp nhận được trực tiếp từ mẫu, tránh huấn luyện toàn cục dài. Hữu ích cho quy trình điều khiển và nhận dạng hệ thống. |
| [Nonparametric autoregressive estimation of probability distributions with parallel gradient boosting](http://arxiv.org/abs/2610.31524v1) | Chapelle | Giới thiệu bộ ước lượng tự hồi quy tăng cường gradient song song cho mật độ chung và có điều kiện đa chiều. Tấn công lời nguyền chiều một cách có thể mở rộng. |

### 📊 Ứng dụng (theo lĩnh vực, đa phương thức, sinh mã)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [SpectralCanary: Embarrassingly Simple Low-Frequency Traces for T2I Dataset-Use Auditing](http://arxiv.org/abs/2610.31659v1) | Ho, Satheesh, Chawathe và cs. | Cài tín hiệu tần số thấp đơn giản vào tập dữ liệu hình ảnh để cho phép kiểm toán hậu kiểm liệu một mô hình T2I có được tinh chỉnh trên chúng hay không. Làm cho kiểm toán sử dụng tập dữ liệu chủ động gần như miễn phí để triển khai. |
| [Cost-Aware Abstention for LLM-Based IT Ticket Classification](http://arxiv.org/abs/2610.31657v1) | Gupta | Định hình định tuyến ticket LLM như đánh giá sẵn sàng có điều kiện chi phí nơi từ chối trả lời được ưu tiên khi lỗi định tuyến tốn kém. Có thể hành động trực tiếp cho quyết định triển khai LLM doanh nghiệp. |
| [SpectralCanary ...](http://arxiv.org/abs/2610.31659v1) | (xem ở trên) | — |
| [CRANE: Post-Hoc Counterfactual Retrieval for Multimodal Classifiers](http://arxiv.org/abs/2610.31594v1) | Rugolon, Miliou, Papapetrou | Phương pháp giải thích đối chứng hậu kiểm đầu tiên được thiết kế riêng cho bộ phân loại đa phương thức. Lấp đầy khoảng trống trong khả năng giải thích nơi các công cụ đối chứng đơn phương thức không chuyển giao được. |
| [How Ground Truth Shapes Retrieval Scores: Evidence-Aware Evaluation of a Retrieval-Augmented Generation System for Breast Lesions](http://arxiv.org/abs/2610.31606v1) | Mochizuki Silva, Ismael, Dias và cs. | Chỉ ra rằng điểm truy xuất RAG rất nhạy cảm với độ phủ chú thích, và đề xuất một giao thức đánh giá nhận thức bằng chứng cho tài liệu lâm sàng. Cải thiện tính chặt chẽ trong đánh giá RAG y khoa. |
| [VERA: A Responsible AI Dashboard for Assessing LLM Deployments in Light of the EU AI Act](http://arxiv.org/abs/2610.31588v1) | Quériaux, Bachellery, Déléris và cs. | Xây dựng bảng điều khiển vận hành hóa diễn giải kỹ thuật EU AI Act của COMPL-AI cho triển khai LLM. Chuyển dịch quy định thành các sản phẩm kỹ thuật cụ thể. |
| [Piano2Pop: Expanding Piano Demos into Pop Productions Without Aligned Supervision](http://arxiv.org/abs/2610.31510v1) | Cheng, Tan, Huang và cs. | Phương pháp flow-matching bán giám sát biến MIDI piano độc tấu thành sản phẩm pop hoàn chỉnh mà không cần giám sát căn chỉnh. Mở rộng phạm vi thực tiễn của mô hình sinh nhạc. |
| [PYTHIA, a transferable machine learning framework for simultaneous defect and adsorption site optimization](http://arxiv.org/abs/2610.31539v1) | Kouroudis, Gu, Poonam và cs. | Mở rộng tối ưu hóa vật liệu bằng ML sang các họ ít được nghiên cứu bằng cách tối ưu hóa đồng thời khuyết tật và vị trí hấp phụ với khả năng chuyển giao. Mở rộng ứng dụng ML trong khám phá vật liệu. |
| [An Empirical Study of Recent Large Language Models for Knowledge Graph to Text Generation on Standard Benchmarks](http://arxiv.org/abs/2610.31529v1) | Priyanka, Delbru, Bakkali và cs. | Đánh giá chuẩn các LLM hiện đại so với encoder-decoder tinh chỉnh trên sinh văn bản từ đồ thị tri thức. Làm rõ nơi LLM đã và chưa vượt qua các mô hình chuyên nhiệm vụ. |
| [LACToS: Local Anomaly Detection via Conditional Typicality of Superpixels](http://arxiv.org/abs/2610.31538v1) | Hong, Kheirandish, Sanda và cs. | Phương pháp điển hình có điều kiện dựa trên superpixel cho phát hiện bất thường cục bộ tổng quát hóa ngoài thiết lập khuyết tật công nghiệp. Cải thiện định vị OOD mà không cần kỹ thuật chuyên lĩnh vực. |
| [Towards User Simulators That Stay On Task And Still Sound Natural](http://arxiv.org/abs/2610.31512v1) | Gul, Laban, Goyal và cs. | Xây dựng mô phỏng người dùng vừa tuân theo ý định đa lượt phức tạp vừa đọc tự nhiên, giải quyết thất bại trung thực trong đánh giá đối thoại tầm xa. Cho phép đánh giá trợ lý đáng tin cậy hơn. |

---

## Tín hiệu xu hướng nghiên cứu

Ba xu hướng hội tụ đang hiện rõ. Thứ nhất, **kỹ thuật độ tin cậy** đã chuyển từ khát vọng sang cơ chế cụ thể: kiểm toán chọn lọc, từ chối trả lời có nhận thức chi phí, đánh giá kiểm soát mô phỏng, và bảng điều khiển EU AI Act đều coi AI đã triển khai như một hệ thống cần được giám sát, giới hạn, và điều chỉnh — không chỉ đánh giá chuẩn. Thứ hai, **tính toán tại thời điểm kiểm tra đang được tối ưu hóa, không chỉ mở rộng**: cắt tỉa suy nghĩ, chính sách bỏ mặt nạ, hồi quy tại thời điểm kiểm tra cho nén, và chưng cất có cổng advantage đều hỏi *ở đâu* tính toán thêm xứng đáng. Thứ ba, **rò rỉ và chế độ thất bại ẩn** tái xuất across các thiết lập rất khác nhau — rò rỉ token tương lai trong decoder thích ứng, rò rỉ attention trong CoT, thất bại thiếu bằng chứng trong tác tử, và độ nhạy độ phủ chú thích trong RAG lâm sàng. Tổng thể, lĩnh vực đang đầu tư ít hơn vào năng lực thô và nhiều hơn vào việc làm cho năng lực *trung thực, có thể kiểm toán, và hiệu quả*.

---

## Đáng đọc sâu

1. **[A Fix for Softmax and Cross-Entropy](http://arxiv.org/abs/2610.31642v1)** — Barron và cs. xác định hai lỗi số học phổ biến ảnh hưởng đến các nguyên hàm được sử dụng nhiều nhất trong học sâu. Bởi vì softmax/cross-entropy nằm dưới hầu như mọi bộ phân loại và đầu LM

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*