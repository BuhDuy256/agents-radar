# Bản tin nghiên cứu AI trên ArXiv 2026-10-23

> Nguồn dữ liệu: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 bài báo | Tạo lúc: 2026-10-23 03:54 UTC

---

# ArXiv AI Research Digest — 2026-10-22

## 1. Điểm nổi bật hôm nay

Các bài nộp hôm nay cho thấy một sự hội tụ đáng chú ý về việc **làm cho hành vi của mô hình trở nên đáng tin cậy và có thể kiểm toán** thay vì chỉ mạnh mẽ hơn. Một số bài báo giải quyết tính toàn vẹn của đánh giá: công trình về rò rỉ token tương lai ẩn trong các mô hình chuỗi thích ứng, đánh giá RAG nhận biết bằng chứng, và kiểm toán quyền riêng tư hậu kiểm mà không cần huấn luyện lại — tất cả đều đặt câu hỏi liệu các benchmark của chúng ta có đo lường đúng những gì chúng ta nghĩ hay không. Có một nhóm đáng chú ý về **hiệu quả suy luận và tính toán tại thời điểm kiểm tra**, từ tối ưu hóa Pass@k trực tiếp cho việc tỉa bớt suy nghĩ đến các chính sách bỏ mặt nạ được học trong các mô hình ngôn ngữ khuếch tán. Nghiên cứu về căn chỉnh và an toàn đang hướng tới các đảm bảo ở cấp độ quyết định—kiểm toán chọn lọc, từ chối dựa trên chi phí, và đánh giá kiểm soát tác nhân. Cuối cùng, công trình lý thuyết về chuyển pha khả năng huấn luyện và quên thảm khốc thông qua tính ổn định thuật toán báo hiệu sự quan tâm trở lại đối với nền tảng chặt chẽ bên dưới cuộc đua mở rộng quy mô dựa trên thực nghiệm.

## 2. Các bài báo chính

### 🧠 Mô hình ngôn ngữ lớn (kiến trúc, huấn luyện, căn chỉnh, đánh giá)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [**A Fix for Softmax and Cross-Entropy**](http://arxiv.org/abs/2610.31642v1) | Barron, Gnanapragasam, Tschannen | Xác định hai lỗi số—"Softmax Collapse" và "Softmax Cancellation"—trong các triển khai softmax/log-softmax/cross-entropy tiêu chuẩn gây hỏng hành vi gradient. Đề xuất các sửa chữa liên quan đến hầu như mọi pipeline huấn luyện, khiến đây trở thành một bản sửa chữa thực tiễn có đòn bẩy cao. |
| [**Low-Bit N-Gram Embeddings for Language Models**](http://arxiv.org/abs/2610.31646v1) | Chung, Du | Nén các bảng nhúng n-gram tốn bộ nhớ trong các LM trọng số mở thành biểu diễn bit thấp. Quan trọng cho việc triển khai các mô hình lớn dưới ngân sách bộ nhớ eo hẹp mà không đánh mất lợi ích hiệu năng của các đặc trưng n-gram. |
| [**Questioning Instrumental Convergence in RLVR: Checkpoint Evidence from OLMo-3**](http://arxiv.org/abs/2610.31624v1) | Alparslan, Tanwisuth, Petterson | Kiểm tra thực nghiệm liệu RL từ phần thưởng có thể xác minh có tạo ra các mục tiêu phụ tìm kiếm quyền lực (tự bảo tồn, lừa dối, chống giám sát) qua các checkpoint huấn luyện hay không. Cung cấp bằng chứng theo chiều dọc hiếm có về một mối lo an toàn được giả định rộng rãi nhưng ít được đo lường. |
| [**Bilingual Language Models Capture Cross-Linguistic Influence in Second-Language Reading**](http://arxiv.org/abs/2610.31620v1) | Issam, Winther, Frank | Cho thấy surprisal của LM song ngữ dự đoán thời gian đọc L2 tốt hơn surprisal đơn ngữ, nắm bắt các hiệu ứng chuyển giao do L1 dẫn dắt. Kết nối mô hình nhận thức và đánh giá LM trong một lĩnh vực mà các baseline đơn ngữ được biết là thất bại. |
| [**On the Token Collapse Phenomenon in Textual Graph Soft Prompting**](http://arxiv.org/abs/2610.31572v1) | Di Francesco, Jain, Nardini và cộng sự | Chẩn đoán "token collapse" nơi các soft prompt đồ thị được GNN học bị thoái hóa khi kết hợp với mô tả đồ thị bằng ngôn ngữ. Làm rõ một chế độ thất bại trong một paradigm phổ biến đưa đồ thị vào LLM. |
| [**The Geometry of Metaphor: Probing and Steering Metaphor Representations in LLMs**](http://arxiv.org/abs/2610.31520v1) | Li, Andersen, Lewis | Sử dụng diễn giải cơ chế để định vị các không gian con nhân quả mã hóa ẩn dụ và chứng minh khả năng điều khiển trên nhiều kiến trúc. Thúc đẩy cả khả năng diễn giải và khả năng kiểm soát ngôn ngữ ẩn dụ cấp cao. |
| [**Rethinking Sequence Compression with Test-time Regression**](http://arxiv.org/abs/2610.31574v1) | Yang, Huang, Li và cộng sự | Tái định hình nén chuỗi như hồi quy tại thời điểm kiểm tra, vượt trội hơn các baseline pooling và chiếu được học. Một nguyên thủy tổng quát đầy hứa hẹn cho hiệu quả ngữ cảnh dài và đa phương thức. |

### 🤖 Tác nhân & Suy luận (lập kế hoạch, sử dụng công cụ, đa tác nhân, chuỗi suy nghĩ)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [**Direct Pass@$k$ Optimization for Thought Pruning**](http://arxiv.org/abs/2610.31667v1) | Salmani, Javanmard, Gupta và cộng sự | Tối ưu hóa trực tiếp mục tiêu Pass@k trong quá trình tỉa bớt suy nghĩ, cân bằng chất lượng giải pháp với tính đa dạng tại thời điểm kiểm tra. Nhắm vào đánh đổi tính toán-độ chính xác trung tâm của mở rộng quy mô tại thời điểm kiểm tra cho các mô hình suy luận. |
| [**Causal Chain of Thought: Mitigating Attention Leakage via Context Isolation**](http://arxiv.org/abs/2610.31639v1) | Dominici, McMillan, Barez và cộng sự | Buộc các bước CoT phải chịu trách nhiệm nhân quả cho câu trả lời cuối cùng bằng cách cô lập ngữ cảnh để ngăn rò rỉ attention. Giải quyết chỉ trích cốt lõi rằng các lý do CoT có thể là hậu kiểm thay vì giải thích. |
| [**Simulated Control Evals**](http://arxiv.org/abs/2610.31593v1) | Olmo, Zhang, Tracy | Nghiên cứu mức độ các thiết lập đánh giá kiểm soát được xây dựng có mục đích có thể ngoại suy sang điều kiện triển khai thực tế để phát hiện các mô hình cố ý hành xử sai. Quan trọng cho việc diễn giải bằng chứng an toàn từ các đánh giá kiểm soát. |
| [**EpiSEM-Bench: Evaluating Safety and Evidence Recovery in LLM Agents under Missing Evidence**](http://arxiv.org/abs/2610.31650v1) | Zhang, Wang, Zhao và cộng sự | Giới thiệu một benchmark nơi phản hồi công cụ bỏ sót các sự kiện liên quan đến an toàn, khiến tác nhân cho phép các hành động bị cấm mặc dù các tuyên bố được trả về là đúng. Phơi bày một chế độ thất bại tinh tế nơi các yêu cầu lành tính tạo ra kết quả không an toàn. |
| [**Same Luck, Different Choice: Twin-World Credit Assignment for Agentic RL**](http://arxiv.org/abs/2610.31544v1) | Surio, Engel, Chou và cộng sự | Giải quyết vấn đề độc lập nhiễu trong phân nhánh phản thực tế cho gán tín dụng theo từng quyết định trong RL tác nhân. Cải thiện quy kết tín dụng trong các nhiệm vụ tầm xa nơi phần thưởng cấp tập quá thô. |
| [**Can an Agent Debug a Web Corpus? Agentic Auditing of Slovak FineWeb2**](http://arxiv.org/abs/2610.31636v1) | Šuppa, Vykopal, Kopčan | Sử dụng một tác nhân LLM như trình gỡ lỗi corpus thông qua API chỉ đọc có ngân sách để phát hiện các thất bại pipeline đặc thù ngôn ngữ trong dữ liệu web đa ngôn ngữ. Tái định hình tác nhân từ bộ phân loại thành kiểm toán viên điều tra chất lượng dữ liệu. |
| [**DuoCook: An Overcooked-Inspired Benchmark for Visual Planning and Coordination**](http://arxiv.org/abs/2610.31511v1) | Jiao, Zhang, Regmi và cộng sự | Xây dựng một benchmark trên Unreal Engine đánh giá các tác nhân thị giác-ngôn ngữ về lập kế hoạch thị giác và phối hợp chia sẻ tài nguyên dưới áp lực thời gian. Kiểm tra các năng lực mà các benchmark tĩnh đơn tác nhân bỏ qua. |

### 🔧 Phương pháp & Khung (kỹ thuật mới, benchmark, cải thiện hiệu quả)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [**Reliable AI-Assisted Decisions via Selective Auditing**](http://arxiv.org/abs/2610.31662v1) | Gibbs, Han, Tibshirani và cộng sự | Phát triển giám sát trực tuyến nơi điểm tin cậy (có thể từ một mô hình riêng) kích hoạt kiểm toán chọn lọc các quyết định. Cung cấp đảm bảo độ tin cậy thống kê cho các luồng quyết định AI được triển khai. |
| [**Sensorimotor Alignment: A Platonic Proxy for Embodied Policy Success**](http://arxiv.org/abs/2610.31670v1) | Xie, Qian, Lan và cộng sự | Đề xuất căn chỉnh giác quan-vận động như một proxy ngoại tuyến rẻ để đánh giá năng lực chính sách nhúng, tránh các rollout vòng kín tốn kém. Mở rộng Giả thuyết Biểu diễn Platonic sang đánh giá robot. |
| [**Phase Transition from Random Features to Fully Trainable Networks**](http://arxiv.org/abs/2610.31663v1) | He, Lao, Lu và cộng sự | Định lượng chuyển pha trong cận xấp xỉ khi mạng chuyển từ đặc trưng ngẫu nhiên cố định sang biểu diễn thích ứng hoàn toàn. Cung cấp hướng dẫn lý thuyết về việc cần huấn luyện bao nhiêu phần của mạng. |
| [**BeNice! Closing Looping's Inference-Memory Gap via KV-Sharing**](http://arxiv.org/abs/2610.31633v1) | Prairie, Ryan, Berg-Kirkpatrick và cộng sự | Giải quyết tăng trưởng KV-cache tuyến tính trong các kiến trúc lặp bằng cách chia sẻ KV qua các lần tái diễn. Cho phép lợi ích chất lượng của việc lặp mà không có hình phạt bộ nhớ tại thời điểm suy luận. |
| [**When to Follow the Teacher: Advantage-Based On-Policy Distillation**](http://arxiv.org/abs/2610.31563v1) | Sabbaghi, Pappas, Hassani và cộng sự | Thay thế OPD "theo giáo viên mọi nơi" ngây thơ bằng hướng dẫn chọn lọc dựa trên lợi thế. Cải thiện chưng cất bằng cách không tin tưởng mù quáng vào hành động của giáo viên tại mọi trạng thái. |
| [**Fine-Grained Analysis of Catastrophic Forgetting via Algorithmic Stability**](http://arxiv.org/abs/2610.31551v1) | Zheng, Sun, Wang và cộng sự | Cung cấp một khung lý thuyết cho quên lãng sử dụng tính ổn định thuật toán, tránh các giả định hạn chế về mô hình/nhiệm vụ. Đưa ra cái nhìn chi tiết hơn về cách các vòng lặp tích lũy quên lãng. |
| [**Shift-aware score transport for privacy auditing without retraining**](http://arxiv.org/abs/2610.31549v1) | Yang, Pradhan, Chen và cộng sự | Cho phép kiểm toán quyền riêng tư khi kiểm toán viên không thể chèn canary hoặc huấn luyện lại mô hình, sử dụng vận chuyển điểm dưới dịch chuyển phân phối. Mở rộng kiểm toán quyền riêng tư thực tiễn sang các thiết lập quan sát. |
| [**Efficient and Optimal Learning of Discrete Distributions with Person-Level Privacy**](http://arxiv.org/abs/2610.31612v1) | Kamath, Majid, Moitra và cộng sự | Đưa ra các thuật toán thời gian đa thức, gần tối ưu cho việc học phân phối rời rạc dưới DP cấp người trong mô hình theo lô. Thúc đẩy lý thuyết về quyền riêng tư với nhiều mẫu trên mỗi người dùng. |

### 📊 Ứng dụng (đặc thù lĩnh vực, đa phương thức, sinh mã)

| Bài báo | Tác giả | Tóm tắt |
| :--- | :--- | :--- |
| [**Automatic Text-to-Image Dataset-Use Auditing via SpectralCanary**](http://arxiv.org/abs/2610.31659v1) | Ho, Satheesh, Chawathe và cộng sự | Cấy các tín hiệu phổ tần số thấp vào dataset trước khi phát hành để sau này phát hiện việc tinh chỉnh T2I trái phép. Cung cấp một cơ chế thực tiễn, chi phí thấp cho nguồn gốc dataset chủ động. |
| [**VERA: A Responsible AI Dashboard for LLM Deployments under the EU AI Act**](http://arxiv.org/abs/2610.31588v1) | Quériaux, Bachellery, Déléris và cộng sự | Vận hành hóa diễn giải kỹ thuật của COMPL-AI về Đạo luật AI EU thành một dashboard đánh giá triển khai. Kết nối tuân thủ quy định và bằng chứng kỹ thuật cho việc sử dụng LLM được quản lý. |
| [**Cost-Aware Abstention for LLM-Based IT Ticket Classification**](http://arxiv.org/abs/2610.31657v1) | Gupta | Định hình định tuyến như một bài toán sẵn sàng có điều kiện chi phí, chọn chính sách dưới chi phí định tuyến sai rõ ràng trước đánh giá đóng băng. Cho thấy định tuyến sai có thể vượt chi phí phân loại của con người, thúc đẩy từ chối được hiệu chỉnh. |
| [**How Ground Truth Shapes Retrieval Scores: Evidence-Aware Evaluation of RAG for Breast Lesions**](http://arxiv.org/abs/2610.31606v1) | Silva, Ismael, Dias và cộng sự | Chứng minh rằng điểm truy xuất RAG lâm sàng phụ thuộc nhiều vào độ phủ chú thích, đề xuất một giao thức đánh giá nhận biết bằng chứng. Một đóng góp phương pháp luận cảnh báo cho benchmark RAG y tế. |
| [**Piano2Pop: Expanding Piano Demos into Pop Productions Without Aligned Supervision**](http://arxiv.org/abs/2610.31510v1) | Cheng, Tan, Huang và cộng sự | Biến đổi MIDI piano thành các sản phẩm pop hoàn chỉnh bằng cách điều kiện hóa một mô hình khớp luồng mà không cần giám sát căn chỉnh. Cho thấy các phương pháp giám sát giả có thể kết nối phiên âm và sinh nhạc. |
| [**Would an LLM Match into a Residency?**](http://arxiv.org/abs/2610.31586v1) | Fernandez-de-Retana, Zulaika, Sanchez-Corcuera và cộng sự | Đánh giá các LLM mở trên kỳ thi MIR Tây Ban Nha về độ chính xác, hiệu chỉnh độ bất định, và hiệu ứng tinh chỉnh y tế. Lập luận rằng các hệ thống y tế cần nhiều hơn độ chính xác trước khi triển khai lâm sàng. |

## 3. Tín hiệu xu hướng nghiên cứu

Ba hướng nổi bật hôm nay. Thứ nhất, **tính toàn vẹn của đánh giá đang trở thành một vấn đề nghiên cứu hạng nhất**: các bài báo về rò rỉ token tương lai ẩn, chấm điểm RAG nhận biết bằng chứng, và kiểm toán quyền riêng tư quan sát đều lập luận rằng các đo lường của chúng ta có thể gây hiểu lầm một cách hệ thống. Thứ hai, **tính toán tại thời điểm kiểm tra đang được tối ưu hóa thay vì chỉ mở rộng quy mô**—tối ưu hóa Pass@k, chính sách bỏ mặt nạ được học, và gán tín dụng thích ứng đều coi suy luận như một bài toán quyết định có ngân sách. Thứ ba, **an toàn đang chuyển từ căn chỉnh tại thời điểm huấn luyện sang đảm bảo tại thời điểm triển khai**: kiểm toán chọn lọc, từ chối dựa trên chi phí, tính hợp lệ của đánh giá kiểm soát, và dashboard quy định đều giải quyết những gì xảy ra sau khi mô hình được phát hành. Xuyên suốt cả ba là một **sự thức tỉnh lý thuyết**—chuyển pha, tính ổn định thuật toán, và DP cấp người—cho thấy lĩnh vực đang trưởng thành vượt ra ngoài mở rộng quy mô thuần túy thực nghiệm hướng tới các đảm bảo có nguyên tắc.

## 4. Đáng đọc sâu

1. **[A Fix for Softmax and Cross-Entropy](http://arxiv.org/abs/2610.31642v1)** — Nếu các lỗi số được chẩn đoán là thật và tổng quát như tuyên bố, chúng âm thầm ảnh hưởng đến một phần lớn các mô hình đã được huấn luyện. Bài báo ngắn gọn, có đòn bẩy cao, và có thể hành động ngay cho bất kỳ người thực hành nào; việc xác minh và áp dụng bản sửa chữa có thể cải thiện độ trung thực gradient trên toàn bộ lĩnh vực.

2. **[Direct Pass@$k$ Optimization for Thought Pruning](http://arxiv.org/abs/2610.31667v1)** — Mở rộng quy mô tại thời điểm kiểm tra là một trong những đòn bẩy quan trọng nhất hiện nay cho hiệu năng suy luận, và việc tỉa bớt ngây thơ thường hy sinh tính đa dạng làm cho Pass@k hoạt động. Bài báo này tấn công trực tiếp đánh đổi chất lượng-đa dạng, với hàm ý cho triển khai suy luận tiết kiệm chi phí.

3. **[Reliable AI-Assisted Decisions via Selective Auditing](http://arxiv.org/abs/2610.31662v1)** — Cung cấp một khung dựa trên thống kê cho giám sát trực tuyến nơi độ tin cậy và quyết định có thể đến từ các mô hình khác nhau, phù hợp với triển khai thực tế phức tạp. Các đảm bảo độ tin cậy khiến nó trở thành ứng viên mạnh để áp dụng trong các thiết lập được quản lý hoặc có rủi ro cao.

---

Quy tắc:
- Chỉ xuất bản dịch. Không mở đầu, không giải thích, không hàng rào markdown bao quanh toàn bộ đầu ra.
- Giữ nguyên cấu trúc Markdown chính xác: tiêu đề, bảng (bao gồm hàng căn chỉnh cột), danh sách, blockquote, bold/italic, đường kẻ ngang, emoji.
- Giữ nguyên URL, đích liên kết, code span, code block, số và ngày tháng.
- Giữ tên dự án, slug kho lưu trữ, tên người dùng, thẻ phiên bản, đường dẫn tệp và định danh API/config ở dạng gốc — không dịch chúng.
- Tham chiếu issue/PR như #12345 và văn bản liên kết của chúng giữ nguyên.
- Sử dụng tiếng Việt tự nhiên, văn phong của bản tin nhà phát triển Việt Nam — rõ ràng và trực tiếp, không dịch từng từ một.
- Ưu tiên từ đơn giản và câu ngắn. Nêu rõ điều gì đã thay đổi và nó dùng để làm gì khi nguồn cung cấp đủ thông tin. Không thêm sự kiện, so sánh phiên bản hoặc lợi ích không có trong nguồn.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*