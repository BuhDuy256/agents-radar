# Bản tin hạ tầng AI 2026-10-23

> Tạo lúc: 2026-10-23 04:29 UTC | Dự án theo dõi: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## So sánh chéo dự án

# Báo cáo Hạ tầng AI Liên dự án — 2026-10-23

## 1. Tổng quan Hệ sinh thái

Ngăn xếp hạ tầng AI đang ở **pha ưu tiên tính đúng đắn hơn tính năng**: trên cả sáu dự án, các lỗi hồi quy nghiêm trọng về độ ổn định (ô nhiễm KV âm thầm, xâm phạm chuỗi cung ứng, kernel kích hoạt sai) chiếm ưu thế trong tracker so với các thông báo model mới. Hỗ trợ model tiên phong đã hội tụ quanh một tập nhỏ kiến trúc — DeepSeek-V4.x, Qwen3.8, Kimi-K3, GLM-5.x, Nemotron 3.5 — và cuộc đua cạnh tranh giờ xoay quanh *độ phủ checkpoint ngày-0 theo từng tầng phần cứng* thay vì các lớp model hoàn toàn mới. Đa dạng hóa phần cứng là thật nhưng không đồng đều: NVIDIA Blackwell/SM120/GB300 và AMD ROCm/MI355X chi phối công việc hiệu năng, trong khi Ampere (SM8x) và Intel SYCL ngày càng trở thành công dân hạng hai trên các checkpoint mới nhất. Ở tầng gateway và huấn luyện, câu chuyện là quản lý rủi ro — sự cố chuỗi cung ứng `1.107.0` của LiteLLM và sự cố kéo dài của Ollama Cloud Pro là lời nhắc rằng phần "nhàm chán" ở giữa ngăn xếp lại mang bán kính ảnh hưởng vượt trội. Trong khi đó, các bề mặt workflow/soạn tác nhân (Unsloth Flows, SGLang diffusion, llama.cpp realtime audio) đang mở rộng, đẩy các serving engine sang lãnh thổ nền tảng ứng dụng.

## 2. So sánh Hoạt động

| Dự án | Tầng | Issue mở được nhấn mạnh | PR được nhấn mạnh | Trạng thái phát hành (24h) | Tín hiệu chi phối |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~7 (gồm 2 lỗi ô nhiễm âm thầm) | ~10+ | Không | DSv4.1 graph capture + tính đúng đắn PD-KV |
| **SGLang** | Serving engine | ~10 (gồm crash scheduler) | ~8 | Không | Tính đúng đắn GLM/Kimi + host-sync diffusion |
| **llama.cpp** | Runtime cục bộ | ~8 | ~10 | **7 bản phát hành (b11815–b11829)** | Hiệu năng SYCL + lỗi long-context |
| **Ollama** | Runtime cục bộ + cloud | ~10 | ~5 | Không | Sự cố cloud + hồi quy Windows |
| **LiteLLM** | Gateway | ~20+ | ~10 | Không (yank, không phát hành) | Xâm phạm chuỗi cung ứng |
| **Unsloth** | Nền tảng fine-tuning | ~9 | ~7 | Không | Trình soạn node Flows + GGUF đa node |

Ghi chú: số lượng chỉ phản ánh các mục được digest nhấn mạnh, không phải tracker đầy đủ. llama.cpp là dự án duy nhất có nhịp phát hành đều; "không phát hành" của LiteLLM là một lệnh *yank*, không phải ngày yên ắng.

## 3. Cuộc đua Hỗ trợ Model

**Độ phủ model tiên phong đang hội tụ, nhưng độ phủ theo tầng phần cứng phân kỳ mạnh.**

| Model / Arch | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| DeepSeek-V4.1 / V4-Flash | ✅ (SM100 trước; SM8x đang chờ #50576) | ✅ (ROCm prefill CP #43465) | ⚠️ DSv4.1-Flash-1017 load fail #14695 | ❌ | ⚠️ sidecar fix #14431 |
| Kimi-K3 | — | ✅ (kèm lưu ý: GB300 #45367, SM90 #45755) | — | ❌ | ❌ |
| GLM-5.3-Flash / GLM5 | — | ✅ (hiệu năng SM90 #45373, SM120 #42012) | ✅ (tùy chọn input GLM5) | ⚠️ thoái hóa cloud #18980 | ❌ |
| Qwen3.8 / Qwen4exp | ✅ (ROCm MI355X) | — | ✅ (DFlash, loại bỏ kq_mask #30965) | ✅ (chỉ cloud) | ❌ |
| Nemotron 3.5 Bolt | — | — | ✅ (GQA/tokenizer #23343) | ✅ (MLX 74B-A9B #19229) | ❌ |
| MiniCPM-OCR 1.0 / MOSS-Image | — | ✅ SANA-Sprint | ✅ MiniCPM-OCR | ❌ | ✅ MOSS-Image |
| Muse Spark | ✅ (ROCm MoE #63263) | ✅ (Ngày-0 #44664–67) | ❌ | ❌ | ❌ |

**Ai đang dẫn đầu:** vLLM và SGLang là các engine tiên phong ngày-0, nhưng cả hai đều giới hạn các checkpoint DeepSeek mới nhất sau SM90+/Blackwell — bỏ rơi A100/A800 và Ampere tiêu dùng. llama.cpp có *độ rộng* hỗ trợ model lớn nhất (Nemotron, GLM5, MiniCPM, MOSS) nhưng chậm chân ở dòng DeepSeek mới nhất. Ollama dẫn đầu về đóng gói MLX/Nemotron cắm-là-chạy cho Mac và DGX Spark. Unsloth là ngoại lệ: tập trung vào multimodal + GGUF + đa node thay vì độ phủ LLM tiên phong thuần túy.

## 4. Biên giới Hiệu năng

Nỗ lực tối ưu tập trung vào **năm nhóm**, với chuyên môn hóa dự án rõ ràng:

- **KV cache & tái sử dụng prefix** — lỗi HiCache hybrid-GDN của SGLang (#45400) và kế toán cache-hit của LiteLLM (#39057) cho thấy tái sử dụng KV giờ là một *bề mặt tính đúng đắn*, không chỉ là đòn bẩy hiệu năng. Nixl lease-expiry của vLLM (#61229) là ví dụ sắc nét nhất.
- **Lượng tử hóa & kernel low-bit** — llama.cpp (`GGML_TYPE_BF16X` ở 11.5 bpw, `--act-type f16`, OpenCL q2_k), vLLM (Humming > Machete trên SM90, MXFP4 MoE), và Ollama (nvfp4 prefill) đều đang đua trên các đường low-bit. Toán sai âm thầm (SGLang `flashinfer_mxfp4` → GPT-OSS SwiGLU, #45755) là mối nguy đang nổi lên.
- **Serving phân tán** — DeepSeek-V4.1 PP tùy ý (vLLM #63106), ROCm TP MoE down-projection (#63263), SYCL tensor-parallel +19% (llama.cpp #30956), GGUF đa node qua RPC (Unsloth #13726). Lợi ích kiểu định luật Moore giờ đến từ *topology*, không phải kernel đơn-GPU.
- **CUDA graphs & replay** — vLLM decoder replay (#63155), SGLang DSv4.1 prefill replay >16K (#45941), teardown graph diffusion của Unsloth (#14867). Graph capture là mục tiêu tối ưu mặc định; lỗi khi capture là lớp bug mới hàng đầu.
- **Attention cấp kernel** — PrimTS trên Blackwell (vLLM), FA4 crash trên SM120 (SGLang), loại bỏ `kq_mask` tiết kiệm ~2 GB (llama.cpp). Kernel attention vẫn là khu vực đòn bẩy cao nhất, rủi ro cao nhất.

Diffusion/video cũng nổi lên như một làn hiệu năng riêng biệt (SGLang loại bỏ host-sync, Unsloth allocator flush), báo hiệu khối lượng serving multimodal đã đủ lớn để cần track tối ưu riêng.

## 5. Định vị Tầng

Sáu dự án chiếm bốn tầng riêng biệt, với sự chồng lấp đáng kể đang xuất hiện:

- **Serving engine (vLLM, SGLang)** — Thông lượng cao, đa GPU, P/D phân tách, endpoint LLM production. Cả hai nhắm tới API tương thích OpenAI cùng các bề mặt phân tách nâng cao. vLLM nghiêng về độ rộng phần cứng và thử nghiệm frontend Rust; SGLang nghiêng về diffusion/multimodal và tương đương AMD.
- **Runtime cục bộ (llama.cpp, Ollama)** — Đơn node, tập trung GGUF/MLX, phần cứng rộng (SYCL, Vulkan, Metal, ROCm, CPU). llama.cpp là phòng thí nghiệm kernel/backend; Ollama là lớp bọc sản phẩm hóa với tầng cloud. Cả hai giờ đều cung cấp realtime audio, rerank, và structured output — lấn sân serving engine.
- **Gateway (LiteLLM)** — Định tuyến đa nhà cung cấp, xác thực, theo dõi chi tiêu, dịch Claude Code/Anthropic. Nằm trước mọi thứ khác; tình trạng ổn định và bảo mật của nó trực tiếp chi phối phần còn lại của ngăn xếp.
- **Huấn luyện/fine-tuning (Unsloth)** — LoRA/full finetune, xuất lượng tử hóa, và giờ là bề mặt pipeline/soạn tác nhân hoàn chỉnh (Flows). Ngày càng chồng lấp với tầng gateway và serving khi Studio trở thành nền tảng tự host.

**Cảnh báo chồng lấp:** serving engine đang thêm tính năng kiểu gateway (structured output, định tuyến, API render/generate), gateway đang thêm dịch thuật tiến gần đến ngữ nghĩa engine, và Unsloth đang thêm điều phối workflow. Ranh giới tích hợp đang mờ đi — dự kiến sẽ có thêm ma sát tại các đường nối này.

## 6. Tín hiệu Xu hướng

1. **Tính đúng đắn âm thầm là biên giới độ tin cậy mới.** Ba trong số các bug nghiêm trọng nhất hôm nay (vLLM #61160 rò rỉ KV liên request, SGLang #45755 kích hoạt sai, LiteLLM #34217 cache xác thực cũ) đều thất bại *âm thầm* — không crash, không log, chỉ có câu trả lời sai. Nhà phát triển ứng dụng phải dự trù cho kiểm tra đầu ra và canary testing, không chỉ giám sát uptime.
2. **Chuỗi cung ứng giờ là rủi ro hạ tầng hạng nhất.** LiteLLM `1.107.0` (`cook.pth` stealer + `sitecustomize` RCE) và cụm Go/CVE đang diễn ra của Ollama cho thấy vệ sinh phụ thuộc là mối quan tâm hàng đầu. Pin, audit, và xác minh root CA — khoảng trống backport (#47904) nghĩa là ngay cả các image 1.106.x "an toàn" cũng mang rủi ro còn sót lại.
3. **Phân tầng phần cứng đang cứng lại, không mềm đi.** Blackwell/SM120/GB300 được ưu ái ngày-0; Ampere và Intel SYCL nhận bug tính đúng đắn và nợ hiệu năng. Các đội trên phần cứng không tiên phong nên lập kế hoạch quanh *độ trễ*, không phải tương đương.
4. **Khối lượng công việc tác nhân đang phơi bày bug parser thất bại mềm.** Rơi tool-call của GLM (SGLang #45953, #42110), rơi tool âm thầm của Ollama (#19187), khoảng trống dịch Claude Code của LiteLLM (#26224) — vòng lặp tác nhân mong manh theo cách không lộ ra trong benchmark chat. Kiểm thử tool-calling đầu-cuối theo từng backend.
5. **Serving multimodal + diffusion đang tốt nghiệp từ demo lên làn production.** SANA-Sprint, MiniMax-H3 FP8 VAE, LTX-2 CFG sharding, MOSS-Image, MiniCPM-OCR — đủ hoạt động song song để cần lập kế hoạch dung lượng GPU riêng.
6. **Bề mặt workflow/soạn tác là chiến trường mới.** Unsloth Flows, pipeline diffusion của SGLang, và API render/generate phân tách của vLLM đều đẩy các dự án này lên cao hơn trong ngăn xếp. Nhà phát triển tác nhân nên theo dõi *hội tụ* — cùng một ứng dụng có thể sớm nhắm tới cả ba.

**Điều cần theo dõi tiếp:** liệu vLLM/SGLang có thu hẹp khoảng cách Ampere trên DeepSeek-V4.x (hỗ trợ SM8x), liệu LiteLLM có phát hành bản backport 1.106.3 sạch, và liệu có dự án nào phát hành bộ kiểm thử tính đúng đắn *có thể xác minh* cho tái sử dụng KV-cache — bề mặt thất bại âm thầm lớn nhất của ngành hiện nay.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới nào trong 24h qua, nhưng hoạt động issue và PR vẫn rất sôi động trên ba mặt trận: công việc graph capture và pipeline-parallel cho DeepSeek-V4.1 (DSv4.1) (PR #63264, #63155, #63106), một loạt lỗi correctness xung quanh việc tái sử dụng KV trong disaggregated prefill/decode (#61229, #61160), và một loạt tối ưu hiệu năng ROCm/MI355X cho các mô hình MoE lượng tử hóa (#63263, #57149, #59575). Rust frontend tiếp tục tiến tới feature parity (#44280) với việc rebase dependency lên `llm-multimodal` v1.14 (#59854).

## 2. Phát hành & Thay đổi phá vỡ tương thích

Không có gì trong 24h qua. Lưu ý rằng một số PR đang mở có đụng đến ngữ nghĩa vòng đời tham số trong `process_weights_after_loading` (ví dụ [#62407](https://github.com/vllm-project/vllm/pull/62407)), có thể ảnh hưởng đến các implementation mô hình lượng tử hóa tùy chỉnh sau khi được merge.

## 3. Hỗ trợ mô hình & phần cứng mới

- **[Hỗ trợ SM8x cho DeepSeek-V4-Flash](https://github.com/vllm-project/vllm/issues/50576)** — Feature request (118 bình luận, issue được thảo luận nhiều nhất hôm nay) nhằm bật hỗ trợ Ampere A100/A800 và RTX 30xx cho các checkpoint `DeepSeek-V4-Flash` / `-0731`, vốn hiện chỉ chạy trên các kiến trúc mới hơn.
- **[PrimTS attention cho Step5 trên Blackwell](https://github.com/vllm-project/vllm/pull/62550)** — PrimTS DSA và sliding-window attention dạng opt-in cho SM100/103/107, BF16 và E4M3 QKV; cần một bản patch FlashInfer từ upstream.
- **[Phân vùng PP tùy ý cho DeepSeek-V4.1](https://github.com/vllm-project/vllm/pull/63106)** — Loại bỏ hạn chế rằng một điểm cắt pipeline không được nằm trong một nhóm layer chia sẻ KV.
- **[Rust frontend rebase lên llm-multimodal v1.14](https://github.com/vllm-project/vllm/pull/59854)** — Giữ đường Rust luôn đồng bộ với crate multimodal; vẫn bị chặn sau `VLLM_USE_RUST_FRONTEND=1`.

## 4. Hiệu năng & Tối ưu hóa

- **[Prefill index sentinels cho DSv4.1](https://github.com/vllm-project/vllm/pull/63264)** — Thay thế memset toàn bộ workspace sparse-index bằng ghi sentinel `-1` từ combine kernel, loại bỏ một lần khởi chạy CUDA và một lần ghi toàn hàng cho mỗi layer prefill.
- **[Graph capture cho decoder replay của DSv4.1](https://github.com/vllm-project/vllm/pull/63155)** — Capture replay graph trên stream của model graph để tái sử dụng graph pool dùng chung; nhắm vào prefill trên GB200.
- **[Down-projection MoE ROCm/TP cho Muse Spark](https://github.com/vllm-project/vllm/pull/63263)** — Column-shard down projection của MXFP4 MoE khi TP > 1, thay reduce-scatter bằng các gather nhỏ hơn cho batch prefill ≥1024 token.
- **[Humming trước Machete trên SM90](https://github.com/vllm-project/vllm/pull/63265)** — Các layer linear chỉ-weight 4-bit (GPTQ/AWQ/compressed-tensors W4A16) giờ ưu tiên Humming hơn Machete trên Hopper.
- **Tracker ROCm MI355X**: [#57149](https://github.com/vllm-project/vllm/issues/57149) (Qwen3.8-2.4T-A95B) và [#59575](https://github.com/vllm-project/vllm/issues/59575) (Qwen3.8-Flash-Next) tiếp tục merge các PR xếp chồng.
- **[Nạp weight trên GB10/DGX Spark](https://github.com/vllm-project/vllm/issues/58726)** — Việc copy H2D từng tensor từ mmap view của safetensors được đánh dấu là chi phí đặc thù nền tảng trên GB10.

## 5. Ổn định & Hồi quy

Xếp theo mức độ nghiêm trọng:

1. **[Race hết hạn lease của NixlConnector](https://github.com/vllm-project/vllm/issues/61229)** — KV block bị giải phóng trong khi một READ từ xa đang bay; decode âm thầm tiêu thụ KV đã bị ghi đè. Hỏng dữ liệu âm thầm. Chưa có PR fix nào được tham chiếu.
2. **[Nhiễm KV giữa các request trong PD disaggregation](https://github.com/vllm-project/vllm/issues/61160)** — Khi bật automatic prefix caching trong triển khai NIXL P/D trên DeepSeek-V4.1-Flash, response thỉnh thoảng rò rỉ nội dung từ các request khác. Tái hiện được; sạch khi dùng `--no-enable-prefix-caching`.
3. **[Cắt cụt prompt Qwen3.8-Flash-Next trên GB10](https://github.com/vllm-project/vllm/issues/62776)** — Nội dung vượt quá ~2048 token (`indexer_budget`) không hiển thị với mô hình trên các bản nightly sm121.
4. **[Đọc ngoài biên trtllm-gen của HiSparse](https://github.com/vllm-project/vllm/pull/61659)** — `illegal memory access` ngẫu nhiên trong sparse MLA prefill; PR fix thêm padding cho KV đã staged.
5. **[Lỗi garbled khi gọi tool với PP2 trên ROCm](https://github.com/vllm-project/vllm/issues/46262)** — GLM-5.2-FP8 DSA với chunked prefill và PP2 cho output bị garbled; PP1 thì ổn.
6. **[Dấu cách bị garbled trong json_schema của Qwen3.5](https://github.com/vllm-project/vllm/issues/38696)** — Hồi quy structured output vẫn còn.
7. **[Va chạm encoder-cache của DeepSeek-VL2](https://github.com/vllm-project/vllm/pull/63120)** — PR fix đã mở cho identity cache xuyên các chế độ cropping.

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Tạm thời tránh prefix caching trong triển khai NIXL P/D.** #61160 là nhiễm chéo giữa các request âm thầm và xác suất — chế độ lỗi tệ nhất cho serving đa tenant. Cho đến khi được fix, hãy chạy với `--no-enable-prefix-caching` nếu bạn dùng PD disaggregation.
- **Coi luồng pull KV dựa trên lease là không an toàn khi tải cao.** #61229 nghĩa là decode có thể tiêu thụ KV cũ mà không báo lỗi; hãy theo dõi bất thường về độ chính xác thay vì chờ crash.
- **Người dùng Ampere vẫn là "kẻ kém may" với các checkpoint DeepSeek mới nhất.** Nếu bạn đang trên A100/A800, #50576 là issue cần theo dõi trước khi lên kế hoạch triển khai DeepSeek-V4-Flash.
- **API serving disaggregated đang dần ổn định.** Bề mặt render/generate/derender đang có ngữ nghĩa nhất quán giữa các đường streaming và batch (#63148, #42729, #47161) — đáng theo dõi nếu bạn đang xây dựng trên các endpoint disaggregated thay vì `/v1/chat/completions`.
- **Rust frontend chưa sẵn sàng cho production.** #44280 ghi rõ đây là experimental; chỉ bật để đánh giá.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới nào trong 24 giờ qua, nhưng tracker đang dày đặc các công việc về tính đúng đắn của GLM-5.3-Flash và Kimi-K3 trên SM90/SM120/GB300, cùng với một lỗi crash scheduler mức độ nghiêm trọng mới với `--enable-lmcache`. Về mặt hiệu năng, một loạt PR loại bỏ đồng bộ host cho diffusion (Cosmos3, Qwen-Image-2.1, LTX-2) và tinh chỉnh prefill/C4-indexer cho DeepSeek-V4 đã vào giai đoạn review. Tracker flaky-CI đang chạy dài tiếp tục chiếm ưu thế về số lượng bình luận, cho thấy nợ hạ tầng CI vẫn đang tồn tại và có thể làm chậm tốc độ PR.

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

Không có bản phát hành mới trong 24 giờ qua. Lưu ý một crash đang hoạt động ảnh hưởng đến khả năng tương thích cấu hình v0.5.22 (tương tác radix cache + LM cache, xem §5), người dùng phiên bản đó nên biết.

## 3. Hỗ trợ Model & Phần cứng mới

- **[Feat] diffusion: Hỗ trợ gốc SANA-Sprint** — thêm xử lý gốc cho `SanaSprintPipeline`/`SCMScheduler`, đóng #43671. Model text-to-image 0.6B hướng đến 1–4 bước suy luận ở 1024px. [PR #45960](https://github.com/sgl-project/sglang/pull/45960)
- **[Roadmap][Feature] Hỗ trợ T-Head PPU** — lộ trình upstream hỗ trợ first-class cho T-Head SAIL (Zhenwu 810/810E, M890P). [Issue #37519](https://github.com/sgl-project/sglang/issues/37519)
- **[Feat] [CPU] cpu-graph: đồ thị torch.compile prefill + fallback hình dạng động trên Intel AMX** — mở rộng bắt đồ thị CPU ra ngoài decode. [PR #44394](https://github.com/sgl-project/sglang/pull/44394)
- **[Feat] [AMD] DeepSeek-V4.1: Hỗ trợ prefill context parallel** — hỗ trợ CP cho prefill DSv4.1 trên ROCm. [PR #43465](https://github.com/sgl-project/sglang/pull/43465)
- **[Roadmap] Phát triển mở & Tối ưu hóa Muse Spark** — chia PR Day-0 (#44664–#44667), phụ thuộc vào bản vá DeepGEMM + tăng phiên bản phát hành. [Issue #44678](https://github.com/sgl-project/sglang/issues/44678)

## 4. Hiệu năng & Tối ưu hóa

- **Replay đồ thị prefill DeepSeek-V4.1 vượt 16K trên SM90** — SM90 giờ replay đồ thị CUDA prefill DeepSeek-V4.1 vượt ngữ cảnh 16K (khớp với SM100); metadata được ghi lại không phụ thuộc độ rộng. [PR #45941](https://github.com/sgl-project/sglang/pull/45941)
- **DeepSeek-V4 C4 indexer: xác minh điểm các hàng như một request** — loại bỏ việc đọc lại key theo từng hàng nháp trong xác minh MTP tĩnh (dựa trên bản sửa ratio-1/2 DSv4.1 của #45251). [PR #45378](https://github.com/sgl-project/sglang/pull/45378)
- **DSpark draft: loại bỏ sao chép luồng bf16→fp32 mHC** — kernel đã mở rộng khi tải; loại bỏ việc materialize fp32 toàn bộ `[tokens, hc_mult*hidden]`. [PR #45964](https://github.com/sgl-project/sglang/pull/45964)
- **Loại bỏ đồng bộ host cho diffusion** — ba PR loại bỏ các lần đọc `.item()` chặn trên đường tới hạn denoising: Cosmos3/Qwen-Image-2.1 đồng bộ theo bước và theo request ([#45967](https://github.com/sgl-project/sglang/pull/45967)) và đọc sigma của LTX-2 ([#45966](https://github.com/sgl-project/sglang/pull/45966)).
- **Phân mảnh CFG stage-2 của LTX-2** — stage 2 (bộ tinh chỉnh distilled) giờ phân mảnh theo các rank CFG như Ulysses; trước đây một GPU bị nhàn rỗi suốt stage 2 ở 768x512x121 trên 2×H200. [PR #45965](https://github.com/sgl-project/sglang/pull/45965)
- **VAE video MiniMax-H3** — decoder FP8 trực tuyến (36 khối ViT / 144 linear FP16; decode mất 3,26s trong pipeline 30s trên 4× RTX PRO 5000) [PR #45180](https://github.com/sgl-project/sglang/pull/45180); decode tile theo lô + chuỗi đầu ra hợp nhất [PR #45179](https://github.com/sgl-project/sglang/pull/45179).
- **Theo dõi hiệu năng GLM-5.3-Flash Hopper (SM90)** — mục lộ trình Q4 thuộc tối ưu hóa kernel. [Issue #45373](https://github.com/sgl-project/sglang/issues/45373)

Chúng tôi lưu ý #45378 được đánh dấu rõ ràng "by Claude Code" và các thay đổi kiểu #45941 nhạy cảm về hiệu năng; hãy kiểm chứng số liệu với workload của bạn.

## 5. Ổn định & Hồi quy

Xếp hạng theo mức độ nghiêm trọng:

1. **`--enable-lmcache` + radix cache bị tắt → crash scheduler ở lần nhàn rỗi đầu tiên (v0.5.22)** — ảnh hưởng đến các model chế độ embedding nơi radix cache tự động bị tắt, và `--disable-radix-cache` tường minh. Mới hôm nay, chưa tham chiếu PR sửa lỗi. [Issue #45929](https://github.com/sgl-project/sglang/issues/45929)
2. **Kimi-K3 DCP a2a decode bị lỗi ký tự trên GB300 2 node (MNNVL)** — 12/12 đầu ra suy biến dưới CUDA graph với đăng ký đồ thị NCCL; `NCCL_GRAPH_REGISTER=0` khôi phục đầu ra. Ảnh hưởng production cho GB300 MNNVL TP8/DCP8. Chưa tham chiếu PR sửa lỗi. [Issue #45367](https://github.com/sgl-project/sglang/issues/45367)
3. **GLM-5.3-Flash trên SM120: fa4 crash tại bước bắt CUDA-graph (reshape extend hybrid)** — triton là backend duy nhất hoạt động; 8× RTX PRO 6000, image v0.5.20. [Issue #42012](https://github.com/sgl-project/sglang/issues/42012)
4. **Kimi-K3 trên SM90: `flashinfer_mxfp4` âm thầm tính SwiGLU của GPT-OSS thay vì SiTU** — sai toán âm thầm, không phải crash; phụ thuộc vào flashinfer-ai/flashinfer#4209. v0.5.22 / main @ ce66b3ab. [Issue #45755](https://github.com/sgl-project/sglang/issues/45755)
5. **GLM-5.3-Flash trên 8×H20 (TP8/EP8) với EAGLE: truy cập bộ nhớ bất hợp lệ CUDA** trong `run_eagle_verify` → `build_grammar_vocab_mask`, v0.5.22. [Issue #45159](https://github.com/sgl-project/sglang/issues/45159)
6. **KV cache NVFP4 + speculative decoding không tương thích** — `extend_prefix_lens_cpu is None` trong workspace dequant FlashInfer; crash mọi bước xác minh target trên SM120 + NEXTN. [Issue #36010](https://github.com/sgl-project/sglang/issues/36010)
7. **Preemption ưu tiên scheduler đưa nạn nhân vào lại theo thứ tự tập hợp** — có thể phân kỳ giữa các rank TP. [Issue #45812](https://github.com/sgl-project/sglang/issues/45812)
8. **HiCache trên GDN hybrid: hit tầng host giảm về không** khi working set bị evict vượt ~3 prefix dài (pool mamba host cạn kiệt trong khi KV vẫn còn trên host). [Issue #45400](https://github.com/sgl-project/sglang/issues/45400)
9. **Responses API (Codex): lượt replay bị chia thành ba khối assistant** — kiểm tra phase trong `_merge_consecutive_assistant_messages` khiến model kết thúc lượt sớm trước khi gọi công cụ. Ảnh hưởng hành vi agent. [Issue #42110](https://github.com/sgl-project/sglang/issues/42110)
10. **Parse công cụ không streaming của GLM-4.7/GLM-5 làm mất lệnh gọi** khi tên hàm theo sau bởi dòng mới (`Glm47MoeDetector.detect_and_parse`). [Issue #45953](https://github.com/sgl-project/sglang/issues/45953)

Công việc cấu trúc liên quan: tracker test flaky [Issue #42752](https://github.com/sgl-project/sglang/issues/42752) (123 bình luận) và tracker lỗi `PR Test` AMD [Issue #45847](https://github.com/sgl-project/sglang/issues/45847) (ImportError `test_deepseek_v4_flash_fp4.py`).

## 6. Điều này có nghĩa gì với nhà phát triển ứng dụng

- **Ghim phiên bản cẩn thận nếu bạn phụ thuộc vào tầng caching.** Tương tác LM cache + radix-cache của v0.5.22 là crash cứng ở cấu hình model embedding phổ biến; tránh `--enable-lmcache` trên các phiên bản trước khi có bản sửa, hoặc giữ radix cache bật. Theo dõi [#45929](https://github.com/sgl-project/sglang/issues/45929).
- **Kimi-K3 trên GB300 MNNVL chưa sẵn sàng production dưới CUDA graph.** Nếu buộc phải triển khai, tắt đăng ký đồ thị NCCL như biện pháp tạm — nhưng hãy coi đây là cách lách, không phải bản sửa ([#45367](https://github.com/sgl-project/sglang/issues/45367)).
- **Các stack agent/gọi công cụ nên kiểm thử GLM và replay kiểu Codex.** Hai lỗi parse riêng biệt (#45953, #42110) có thể âm thầm làm mất lệnh gọi công cụ hoặc tạo kết thúc lượt sớm giả — cả hai đều nguy hiểm trong vòng lặp agentic vì chúng thất bại âm thầm, không ồn ào.
- **Người dùng speculative decoding: kiểm chứng các tổ hợp lượng tử hóa.** KV cache NVFP4 + spec decode vẫn hỏng (#36010); `flashinfer_mxfp4` trên SM90 âm thầm tính sai activation (#45755). Ưu tiên attention triton trên GLM SM120 cho đến khi fa4 được sửa ([#42012](https://github.com/sgl-project/sglang/issues/42012)).
- **Về mặt tích cực, người dùng multimodal/video và CPU/AMD có những thắng lợi đáng kể trong chu kỳ này**: hỗ trợ gốc SANA-Sprint, VAE FP8 MiniMax-H3, phân mảnh CFG LTX-2, đồ thị prefill CPU Intel AMX, và prefill CP DSv4.1 AMD đều đang review hoặc đã merge — đáng để benchmark nếu bạn phục vụ diffusion hoặc chạy trên tăng tốc không phải NVIDIA.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

llama.cpp tung ra một loạt bản phát hành nhanh (b11815–b11829), nổi bật là các bản sửa lỗi streaming API realtime trong `llama-server`, bổ sung hỗ trợ đa phương thức mới (MiniCPM-OCR 1.0), và tiếp tục gia cố các backend SYCL/OpenCL. Các nỗ lực tối ưu hiệu năng chiếm phần lớn hàng đợi PR đang mở: mức tăng +19% cho SYCL prompt-eval với tensor-parallel, bộ đệm chuyên gia MoE cư trú trên GPU, và các đường kích hoạt BF16. Trong khi đó, trình theo dõi issue cho thấy một cụm lỗi dai dẳng về tính đúng đắn ngữ cảnh dài trên SYCL, Vulkan và các mô hình hybrid-attention mà các đội hạ tầng nên theo dõi sát.

---

## 2. Bản phát hành & Thay đổi gây ảnh hưởng

- **b11829** — server: placeholder rerank giờ chỉ được thay thế từ template gốc ([#30864](https://github.com/ggml-org/llama.cpp/pull/30864))
- **b11828** — realtime API: sự kiện `complete` giờ kích hoạt sau khi audio đã cam kết được xả hết ([#30994](https://github.com/ggml-org/llama.cpp/pull/30994))
- **b11827** — OpenCL: Adreno depthwise conv2d ([#30900](https://github.com/ggml-org/llama.cpp/pull/30900))
- **b11826** — mtmd: hỗ trợ MiniCPM-OCR 1.0 ([#30979](https://github.com/ggml-org/llama.cpp/pull/30979))
- **b11823 / b11822 / b11821 / b11819 / b11818 / b11815** — GLM5 input opts, sửa Qwen4exp DFlash drafter, tái cấu trúc Intel XMX multi-column, Nemotron tokenizer/GQA, typed rerank input, sửa SYCL CONV_2D.

Không có thay đổi nào phá vỡ cấu hình được đánh dấu. Thay đổi hành vi đáng chú ý: endpoint rerank giờ chấp nhận **typed content input**, có thể ảnh hưởng đến các client gửi chuỗi thô ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625)).

---

## 3. Hỗ trợ mô hình & phần cứng mới

- **MiniCPM-OCR 1.0** — được đăng ký như một projector type tái sử dụng graph của MiniCPM-V 4.6 ([#30979](https://github.com/ggml-org/llama.cpp/pull/30979))
- **Nemotron** — GQA không chuẩn, BPE tokenizer, và pre-type `domyn-small`; Metaspace `prepend_scheme` được ghi dưới dạng metadata GGUF ([#23343](https://github.com/ggml-org/llama.cpp/pull/23343))
- **GLM5 / glm5-next** — tối ưu input đang được triển khai; QSA không dùng `kq_mask` đang trong quá trình phát triển ([#31009](https://github.com/ggml-org/llama.cpp/pull/31009))
- **Hexagon (Snapdragon NPU)** — đã thêm op SGN ([#30346](https://github.com/ggml-org/llama.cpp/pull/30346)) và op CEIL ([#31006](https://github.com/ggml-org/llama.cpp/pull/31006))
- **OpenCL** — hỗ trợ lượng tử hóa q2_k bước đầu ([#30999](https://github.com/ggml-org/llama.cpp/pull/30999))
- **Quant type mới `GGML_TYPE_BF16X`** — nén lại bfloat16 gần như không mất mát ở 11.5 bpw (nhỏ hơn 1.39× so với BF16), với thực thi trên CPU + GPU ([#29896](https://github.com/ggml-org/llama.cpp/pull/29896))
- **YaRN `truncate=false`** — chỉ CPU và CUDA; các backend khác đánh dấu là không hỗ trợ ([#30206](https://github.com/ggml-org/llama.cpp/pull/30206))

---

## 4. Hiệu năng & Tối ưu hóa

- **SYCL tensor-parallel prompt eval +19%** — `ggml_sycl_comm_exchange()` mới giúp `-sm tensor` nhanh ngang `-sm layer`, không thay đổi PPL, trên Arc Pro B70 ([#30956](https://github.com/ggml-org/llama.cpp/pull/30956))
- **Bộ đệm chuyên gia MoE** — bộ đệm LRU cư trú trên GPU cho trọng số chuyên gia được offload sang host ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861)); PR đi kèm chạy các chuyên gia bị bỏ lỡ trên CPU với một script tinh chỉnh ([#30966](https://github.com/ggml-org/llama.cpp/pull/30966))
- **Loại bỏ `kq_mask`** — Qwen4exp và GLM5-next QSA không còn cấp phát mask, tiết kiệm ~2 GB GPU/host ở ub 4096 và 4 GB ở ub 8192 để dành chỗ cho expert cache ([#30965](https://github.com/ggml-org/llama.cpp/pull/30965), [#31009](https://github.com/ggml-org/llama.cpp/pull/31009))
- **Kích hoạt FP16 (`--act-type f16`)** — đồ thị tính toán F16 end-to-end cho các accelerator bị nghẽn ở đường dữ liệu kích hoạt ([#31011](https://github.com/ggml-org/llama.cpp/pull/31011))
- **Tối ưu RDNA3/4 Vulkan large-tile Split-K** đang được xem xét ([#30280](https://github.com/ggml-org/llama.cpp/pull/30280))
- **Kernel SYCL FA** — các host wait được thay bằng chuỗi phụ thuộc tường minh (~4% trên B70), mở đường cho SYCL graph trong tương lai ([#30684](https://github.com/ggml-org/llama.cpp/pull/30684))

---

## 5. Ổn định & Hồi quy

Xếp theo mức độ nghiêm trọng:

1. **CAO — SYCL F16 xuất NaN** trên Qwen3.8-27B Q4_K_M dense sau khi sắp xếp lại mã IQ3 ([#30907](https://github.com/ggml-org/llama.cpp/pull/29107)); cách xử lý tạm: tắt fused GEMM. Chưa có PR sửa lỗi. ([#30892](https://github.com/ggml-org/llama.cpp/issues/30892))
2. **CAO — CUDA/HIP Flash Attention rác ở ngữ cảnh dài** trên RDNA4 (gfx1201), head_dim 256 — EOS xuất hiện ngay lập tức do logits prefill bị hỏng ([#30884](https://github.com/ggml-org/llama.cpp/issues/30884))
3. **CAO — Metal abort ở MUL_MAT** với BF16 src1 tại K≥64, batch>8 — không có kernel BF16 mul_mm ([#30973](https://github.com/ggml-org/llama.cpp/issues/30973))
4. **CAO — Thông lượng decode Qwen3.8-27B sụp đổ ~25×** vượt ngữ cảnh ~80K trên hybrid Gated DeltaNet, xử lý prompt không bị ảnh hưởng ([#27623](https://github.com/ggml-org/llama.cpp/issues/27623))
5. **TRUNG BÌNH — DeltaNet SYCL token soup** trên prompt dài (Qwen3.6/3.8, Nemotron) — nhiều báo cáo trùng lặp ([#29183](https://github.com/ggml-org/llama.cpp/issues/29183), [#29167](https://github.com/ggml-org/llama.cpp/issues/29167))
6. **TRUNG BÌNH — Qwen3.8 DFlash/MTP phát ra token id ngoài biên** (== n_vocab) trên Vulkan ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158))
7. **TRUNG BÌNH — Nemotron 3/3.5 GGUF bị gắn thẻ nhầm `pixtral`** → sai pre-tokenizer ([#30894](https://github.com/ggml-org/llama.cpp/issues/30894))
8. **THẤP — Thoái hóa đầu ra `--tensor-split`** trên MoE ngữ cảnh dài, tái hiện được qua API thô ([#28185](https://github.com/ggml-org/llama.cpp/issues/28185))

Cũng đáng lưu ý: một vấn đề **bảo mật** vẫn đang mở — instruction injection qua tham số `?q=` của WebUI ([#25790](https://github.com/ggml-org/llama.cpp/issues/25790)).

---

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **API realtime audio và rerank đang ổn định dần.** Nếu bạn đang xây dựng voice agent, hãy nâng cấp lên b11828+ — sự kiện `complete` giờ chờ đúng lúc audio đã cam kết được xả hết, sửa lỗi race condition trong pipeline streaming. Các bên dùng rerank gửi typed content nên xem lại [#29625](https://github.com/ggml-org/llama.cpp/pull/29625).
- **Các mô hình hybrid-attention ngữ cảnh dài (Qwen3.8, Nemotron) hiện khá rủi ro khi chạy production.** Nhiều báo cáo độc lập về sụp đổ thông lượng và token soup trên các đường SYCL, Vulkan và RDNA4. Nếu bạn phục vụ các mô hình này ở ngữ cảnh >80K, hãy ghim vào bản build đã biết là tốt và kiểm tra theo từng backend trước khi triển khai.
- **Phục vụ MoE trên VRAM hạn chế sắp được cải thiện đáng kể.** Các PR expert cache cư trú trên GPU ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861), [#30966](https://github.com/ggml-org/llama.cpp/pull/30966)) cùng QSA không mask ([#30965](https://github.com/ggml-org/llama.cpp/pull/30965)) nhắm trực tiếp vào nút cổ chai băng thông RAM host vốn chi phối decode với `-ncmoe`/`-ot exps=CPU`.
- **Theo dõi `--act-type f16` và BF16X cho các triển khai bị giới hạn bộ nhớ.** Cả hai đều giảm áp lực lên đường dữ liệu đối với các accelerator mà giới hạn là băng thông chứ không phải FLOPs.
- **Người dùng Intel SYCL** nhận được thắng lợi lớn nhất trong ngày hôm nay (+19% prompt eval, tensor-parallel), nhưng cũng gánh nhiều lỗi tính đúng đắn đang mở nhất — hồi quy F16 NaN là rào cản đối với các mô hình dense Q4_K_M.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới trong 24 giờ qua, nhưng tốc độ PR rất cao: MLX có thêm YaRN RoPE scaling cho Qwen3/Qwen3.5 và hỗ trợ Nemotron 3.5 Bolt 74B-A9B với LiLiCorr speculative decoding. Về mặt ổn định, sự cố Pro cloud (#15453, 55 bình luận, 22 👍) vẫn tiếp tục chiếm sóng, cùng với hai báo cáo riêng biệt về connection-reset trên Windows (#19113, #19139) và một regression prompt-cache trên Vulkan/AMD (#19201) vẫn đang mở.

## 2. Bản phát hành & thay đổi breaking

Không có bản phát hành nào trong 24 giờ qua. Hai lưu ý ở tầng API cho bên tích hợp:

- **`OLLAMA_CONTEXT_LENGTH` không được phản ánh trong `/api/show` hoặc `/api/tags`** — server báo cáo context window gốc của model, không phải giá trị bị giới hạn thực tế, nên client tính toán prompt từ metadata sẽ vượt quá. [#18995](https://github.com/ollama/ollama/issues/18995)
- **`typical_p` đã bị xóa khỏi Python API** — các request giờ trả về HTTP 400. [#18480](https://github.com/ollama/ollama/issues/18480)

## 3. Hỗ trợ model & phần cứng mới

- **Nemotron 3.5 Bolt 74B-A9B (MLX)** — cấu hình expert theo từng lớp, import affine prequantized 3-bit với metadata theo module, xếp chồng expert mixed-precision, và LiLiCorr speculative decoding thông qua DFlash runner. [#19229](https://github.com/ollama/ollama/pull/19229)
- **YaRN scaling trong MLX cho Qwen3 / Qwen3.5** — tôn trọng metadata RoPE scaling tường minh (tần số YaRN + biên độ) trên cả text và mRoPE; bổ sung các fixture prefill/decode/partial-rotation. [#19231](https://github.com/ollama/ollama/pull/19231)
- **GA Gradium Phonon checkpoints** — thay thế đường dẫn prerelease; đặt mức tối thiểu 0.40.9 cho hỗ trợ speech. [#19227](https://github.com/ollama/ollama/pull/19227)
- **GB10 (DGX Spark / Ascent GX10)** được thêm vào danh sách thiết bị hỗ trợ. [#13987](https://github.com/ollama/ollama/pull/13987)
- Metadata catalog cloud (context length, mức thinking, capabilities) giờ được truyền tới tất cả các harness của `ollama launch`. [#19223](https://github.com/ollama/ollama/pull/19223)

## 4. Hiệu năng & tối ưu hóa

- **Vulkan/AMD RADV chậm sinh token ~30×** sau request đầu tiên khi bật prompt cache — thông lượng sụt 29.7× ở request thứ hai giống hệt, Mesa RADV + RX 6600 XT, Ollama 0.40.8. Đây là regression, không phải vấn đề tuning. [#19201](https://github.com/ollama/ollama/issues/19201)
- **Speculative decode kiểu dspark** được yêu cầu để tăng tốc sinh token, lấy `memtp` làm tham chiếu. [#17016](https://github.com/ollama/ollama/issues/17016)
- **`num_predict == -2`** được đề xuất để lấp đầy context buffer động thay vì dùng cap tĩnh. [#9547](https://github.com/ollama/ollama/pull/9547)

## 5. Ổn định & regression

Xếp theo mức độ nghiêm trọng:

1. **Tỷ lệ thất bại 95% trên Ollama Cloud Pro** với các model cloud `glm-5.1`, `kimi-k2.5`, `qwen3.5`, `deepseek-v3.2` — dịch vụ gần như không dùng được đối với khách hàng trả phí kể từ tháng 4. [#15453](https://github.com/ollama/ollama/issues/15453)
2. **`glm-5.3-flash:cloud` bị thoái hóa** — 5–8% request thất bại với hiện tượng thoái hóa token nghiêm trọng từ 2026-10-12; có báo cáo về vùng dữ liệu bị zero ở phía host. [#18980](https://github.com/ollama/ollama/issues/18980)
3. **Windows bị reset kết nối sau ~15s với prompt lớn** (0.40.4, RTX 3090, `/api/chat`) — tái hiện được bất kể dùng Ollama API hay `llama-server` trực tiếp, nghĩa là lỗi nằm dưới gateway. [#19139](https://github.com/ollama/ollama/issues/19139) · [#19113](https://github.com/ollama/ollama/issues/19113)
4. **Panic `Maximum threads` trên MLX 0.40.0** — `mlx runner failed: panic: mlx: Maximum threads per threadgroup is 896 but requested 1024`. Hạ cấp xuống 0.35.1 sẽ hết. [#18846](https://github.com/ollama/ollama/issues/18846)
5. **MLX nvfp4 prefill bị treo** — request đã được nhận bị treo ở `processed=total-1` dưới tải single-slot liên tục; chỉ thoát được bằng SIGTERM. [#18505](https://github.com/ollama/ollama/issues/18505)
6. **Assert GGML với `rnj-1`** — lỗi `hparams.is_swa_any()` khi load sau khi nâng cấp lên 0.3x. [#18924](https://github.com/ollama/ollama/issues/18924)
7. **Race condition khi eviction** — eviction đang chờ bị hủy bởi một request `keep_alive` trên model đang cư trú; request đang đợi bị treo suốt cửa sổ keep-alive. [#19182](https://github.com/ollama/ollama/issues/19182)
8. **Tool-call bị rơi im lặng** — tool được gọi theo tên không có trong `tools` của request sẽ trả về response rỗng với `eval_count > 0`. Các PR fix đang trên đường: [#19228](https://github.com/ollama/ollama/pull/19228) (Qwen3 Coder XML escaping), [#19226](https://github.com/ollama/ollama/pull/19226) (Gemma4 khôi phục trailing-noise), [#19187](https://github.com/ollama/ollama/issues/19187)
9. **CVE trong Go toolchain** — 1 critical + 11 high trong các binary phát hành; cần nâng lên Go 1.26.9+. [#19162](https://github.com/ollama/ollama/issues/19162) · [#16033](https://github.com/ollama/ollama/issues/16033)
10. **Server khởi động thất bại im lặng trên Windows Desktop 0.33.1** — `server.log` rỗng, không có listener; chạy `ollama serve` thủ công thì được. [#18061](https://github.com/ollama/ollama/issues/18061); lỗi nuốt exception giờ đang được log bởi [#19179](https://github.com/ollama/ollama/pull/19179)

Các fix về tính đúng đắn/hành vi đã land hoặc đang chờ: giữ nguyên role `system/developer` cho client API trực tiếp [#19199](https://github.com/ollama/ollama/pull/19199), `SYSTEM ""` rỗng tường minh giờ xóa thay vì kế thừa [#18990](https://github.com/ollama/ollama/pull/18990), giữ lại tin nhắn cuối của user khi cắt context [#19058](https://github.com/ollama/ollama/pull/19058), lỗi stream Responses giờ phát `response.failed` thay vì EOF [#19225](https://github.com/ollama/ollama/pull/19225), và tái sử dụng thinking-settings cho Anthropic web-search [#19098](https://github.com/ollama/ollama/pull/19098).

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Đừng tin `/api/tags` hay `/api/show` để tính context budget.** Cứ giả định là context gốc, rồi tự giới hạn phía client. Nếu bạn dựa vào metadata để cắt, bạn sẽ vượt quá cửa sổ thực tế.
- **Windows + prompt lớn hiện không an toàn.** Nếu có luồng inference trên Windows, hãy giới hạn kích thước prompt, thêm retry-with-backoff khi bị reset, hoặc pin về phiên bản đã biết là tốt cho đến khi #19139/#19113 được giải quyết.
- **Pin phiên bản một cách có chủ đích.** 0.40.0 có panic MLX (#18846); 0.40.8 có regression prompt-cache AMD RADV (#19201). Với fleet hỗn hợp, hãy giữ ma trận phiên bản theo từng backend thay vì một mức sàn chung.
- **Độ bền tool-calling đang cải thiện nhanh.** Các parser Qwen3 Coder, Gemma4 và Responses-stream đều có fix đang trên đường. Nếu agent của bạn bị lặp vì output tool sai định dạng, hãy theo dõi các PR này trước khi tự build workaround.
- **Người dùng Cloud Pro**: báo cáo thất bại 95% đã mở từ tháng 4 mà chưa có giải pháp; hãy coi cloud là best-effort cho traffic production và luôn giữ đường fallback local.
- **Nâng cấp binary Go** nếu bạn ship Ollama trong container; cụm CVE được fix bằng Go 1.26.9+ và rebuild downstream.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Câu chuyện chính vẫn là **sự cố xâm phạm chuỗi cung ứng của `litellm 1.107.0`**, với các tag `latest`/`main-stable`/`main-latest` trên PyPI và Docker đã bị gỡ, nhưng vẫn còn lỗ hổng backport: bản vá eMudhra root CA (#47670) chỉ có trên nhánh `main`, khiến tất cả image `1.106.x` đã phát hành vẫn tin tưởng chuỗi root CA đã bị xâm phạm. Ngoài ra, một đợt refactor lớn cho Rust-gateway (dùng derive `Layered`) đang được triển khai trên settings, provider credentials và env resolution; và một loạt bug tồn đọng lâu về accounting, routing, và Claude-Code/Anthropic-translation đã được chú ý nhưng vẫn chưa được sửa.

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

Không có bản phát hành mới trong 24h qua.

- **PyPI `1.107.0` đã bị gỡ; Docker tag đã bị thu hồi** — `latest`, `main-latest`, `main-stable` trên `ghcr.io/berriai/litellm{,-database,-non_root}` và `docker.io/litellm/litellm` không còn trỏ đến image bị xâm phạm. [#47826](https://github.com/BerriAI/litellm/issues/47826)
- **Lỗ hổng CA trên nhánh stable (cần hành động với người dùng 1.106.x)** — Bản vá eMudhra root CA (#47670) chỉ có trên `main`. Mọi image `1.106.x` đã phát hành vẫn tin tưởng `emSign ECC Root CA - G3`, root mà các intermediate bị xâm phạm trỏ tới. Yêu cầu backport thành **v1.106.3**. [#47904](https://github.com/BerriAI/litellm/issues/47904)
- **Thay đổi nguồn thông báo nâng cấp UI (PR)** — Chuông trên Admin UI sẽ đọc version/link từ changelog tài liệu thay vì "latest release" trên GitHub, tránh nhắc nâng cấp sớm. [#47998](https://github.com/BerriAI/litellm/pull/47998)
- **Lỗi đăng nhập UI Docker (1.88.x)** — Sau khi nâng cấp, Admin UI sau nginx reverse proxy chuyển hướng đến IP nội bộ của container (regression từ 1.87.0). [#30118](https://github.com/BerriAI/litellm/issues/30118)

## 3. Hỗ trợ model & phần cứng mới

Không có model hay backend mới nào được tích hợp. Các mục đang xử lý/liên quan:

- **Hỗ trợ DashScope realtime WebSocket (PR)** — Thêm handler `DashScopeRealtime` dựa trên handler OpenAI dùng chung, xử lý định dạng wire phẳng `session.update` của DashScope. [#40579](https://github.com/BerriAI/litellm/pull/40579)
- **Provider Nano-GPT thiếu trên UI** — Có tài liệu tại `docs.litellm.ai/docs/providers/nano-gpt` nhưng không xuất hiện trong danh sách provider trên UI. [#34499](https://github.com/BerriAI/litellm/issues/34499)
- **Thread yêu cầu provider/model tập trung** — Cộng đồng đang bỏ phiếu cho model/provider/endpoint mới. [#18686](https://github.com/BerriAI/litellm/issues/18686)

## 4. Hiệu năng & Tối ưu hóa

- **Event-loop proxy bị treo / RSS phình to khi upstream trả error body lớn** — Proxy đọc error-response body không giới hạn (đã quan sát thấy **HTTP 400 ~114 MB**), chạy regex masking trên toàn bộ payload và truyền tiếp, làm treo event loop. Cần giới hạn kích thước. [#34031](https://github.com/BerriAI/litellm/issues/34031)
- **Latency-based routing thoái hóa thành chọn ngẫu nhiên** — Race condition lost-update trong `async_log_success_event` khiến latency-based routing suy giảm thành chọn ngẫu nhiên có trọng số theo số deployment khi có concurrency (đề cập 16 key Anthropic + 4 key OpenAI mỗi group). [#24720](https://github.com/BerriAI/litellm/issues/24720)
- **Router bỏ qua `Retry-After` với group nhiều deployment** — `Router._time_to_sleep_before_retry` chỉ tôn trọng `Retry-After` khi model group có **một** deployment duy nhất; group nhiều deployment retry ngay lập tức vào upstream dùng chung đang bị rate-limit. [#34399](https://github.com/BerriAI/litellm/issues/34399)
- **Sửa least-busy routing (PR, đã đóng/lâu ngày)** — So sánh strictly less-than khiến toàn bộ traffic dồn vào deployment đầu tiên khi số in-flight bằng nhau; đã chuyển sang xử lý tie đúng. [#23924](https://github.com/BerriAI/litellm/pull/23924)
- **Quét type-safety (PR)** — Dọn **1.181 lỗi `Any` của basedpyright trên 431 file**; QA trực tiếp hai pod với OpenAI và Anthropic thật trả về response giống hệt. [#47789](https://github.com/BerriAI/litellm/pull/47789)

## 5. Ổn định & Regression

Xếp theo mức độ nghiêm trọng:

**Nghiêm trọng**
- **Sự cố chuỗi cung ứng `1.107.0`** — `cook.pth` đánh cắp credential + `sitecustomize` RCE loader, được build từ repo giả mạo `Berri-AI/litellm`. PyPI/Docker đã thu hồi; **1.106.x vẫn chứa root CA bị xâm phạm** chờ backport. [#47826](https://github.com/BerriAI/litellm/issues/47826), [#47904](https://github.com/BerriAI/litellm/issues/47904)

**Cao**
- **Mọi key thất bại khi Postgres hết `max_connections`** — Trong deployment proxy nhiều worker, khi connection cạn kiệt thì toàn bộ API key người dùng đều thất bại. [#34479](https://github.com/BerriAI/litellm/issues/34479)
- **Worker gặp sự cố Postgres/HAProxy tạm thời → "Invalid model name"** — Các model hợp lệ đã cấu hình (ví dụ `google/gemini-2.5-flash`) thất bại vô cớ khi DB chập chờn. [#26237](https://github.com/BerriAI/litellm/issues/26237)
- **Key của team đã xóa vẫn xác thực được trong cache** — `POST /team/delete` xóa key khỏi DB nhưng không evict khỏi auth cache (`/key/delete` thì có). [#34217](https://github.com/BerriAI/litellm/issues/34217)

**Trung bình — accounting / tính đúng chi phí**
- **Cache hit: spend về 0 nhưng token phát lại usage gốc** — Câu hỏi thiết kế mở về việc báo cáo token nên tổng hợp theo cơ sở nào. [#39057](https://github.com/BerriAI/litellm/issues/39057)
- **Custom pricing (`input_cost_per_token: 0`) bị bỏ qua âm thầm** — Pricing theo request ghi đè entry `model_cost` chuẩn sau khi reload model-cost-map, ảnh hưởng đến route BYOK/wildcard. [#30081](https://github.com/BerriAI/litellm/issues/30081)
- **`response_cost` null / spend `$0`** — Khi `custom_llm_provider=anthropic` nhưng dòng có giá nằm dưới provider khác. [#47675](https://github.com/BerriAI/litellm/issues/47675)

**Trung bình — translation / Claude Code**
- **Anthropic `/v1/messages` streaming mất `tool_use.input`** với `gemini/gemma-4-31b-it` (non-streaming vẫn hoạt động). [#25390](https://github.com/BerriAI/litellm/issues/25390)
- **`websearch_interception` không kích hoạt với Claude Code + Bedrock passthrough** — tool được chuyển tiếp đến Bedrock và bị từ chối; PR #25242 sẽ sửa root cause nhưng lại thêm Bedrock skip mới khiến nó hỏng lại. [#26252](https://github.com/BerriAI/litellm/issues/26252)
- **`auto_router/complexity_router` từ chối `thinking.type=adaptive`** với request Claude Code. [#26224](https://github.com/BerriAI/litellm/issues/26224) — **PR sửa đang xử lý** giữ adaptive thinking/effort trên `/v1/messages` gốc. [#41243](https://github.com/BerriAI/litellm/pull/41243)
- **Adapter Anthropic→Responses bỏ qua `drop_params`** khi map `metadata.user_id` sang `user`, làm hỏng các gateway `/responses` nghiêm ngặt. [#26241](https://github.com/BerriAI/litellm/issues/26241)
- **`token_counter` từ chối image `detail: "original"`** — Kiểm tra context trước khi gọi ghi log ERROR và **bỏ qua kiểm tra context-window** cho các request này. [#47327](https://github.com/BerriAI/litellm/issues/47327)
- **Vertex Anthropic `response_format` + `thinking` trả 400** trên `vertex_ai/claude-opus-4-7`. [#26334](https://github.com/BerriAI/litellm/issues/26334)

**Thấp hơn — timeout, license, cache, đặc thù provider**
- **`litellm.Timeout: Connection timed out after None seconds.`** — timeout không bao giờ được đo/đối chiếu (SDK 1.77.1). [#14635](https://github.com/BerriAI/litellm/issues/14635)
- **Xác minh license airgapped thất bại khi payload chứa dấu `.`** (ví dụ `user_id` giống domain) — `_verify_license_str` tách theo byte `.` đầu tiên. [#26231](https://github.com/BerriAI/litellm/issues/26231)
- **Bedrock retry phát lại SigV4 header cũ** sau khi đã ký, trên đường retry/fallback. [#27513](https://github.com/BerriAI/litellm/issues/27513)
- **Azure FLUX-1.1-pro / FLUX.1-Kontext-pro lỗi** sau khi nâng cấp lên 1.80.15. [#19334](https://github.com/BerriAI/litellm/issues/19334)
- **Fireworks Kimi 2.6 từ chối `tool_choice`** (`UnsupportedParamsError`). [#26257](https://github.com/BerriAI/litellm/issues/26257)
- **Báo sai "guardrails feature unavailable"** khi chỉnh sửa bất kỳ cấu hình key nào trong 1.82.3. [#24734](https://github.com/BerriAI/litellm/issues/24734)

**PR sửa đang xử lý**
- Giữ nguyên một ID item encrypted-content giữa `/v1/responses` dạng streamed và final (client key theo ID bị hỏng khi không khớp). [#47991](https://github.com/BerriAI/litellm/pull/47991)
- Retry stream Gemini bị ngắt trước sự kiện SSE đầu tiên (`num_retries` hiện không áp dụng). [#45750](https://github.com/BerriAI/litellm/pull/45750)
- Ngừng strip `cache_control` của chính caller khỏi messages/tools. [#35602](https://github.com/BerriAI/litellm/pull/35602)
- Ngừng gửi key BYOK không phải Bedrock đến AWS như bearer token trong guardrails. [#37942](https://github.com/BerriAI/litellm/pull/37942)
- Thêm `aclose()` vào `ResponsesAPIStreamingIterator` để tránh rò rỉ connection upstream. [#26250](https://github.com/BerriAI/litellm/issues/26250)
- Tránh cảnh báo pydantic serializer trong `validate_and_fix_openai_messages`. [#25933](https://github.com/BerriAI/litellm/pull/25933)

## 6. Điều này có ý nghĩa gì với lập trình viên ứng dụng

- **Pin và audit ngay nếu bạn đã chạy `1.107.0`.** `cook.pth` đánh cắp và exfiltrate credential; hãy coi mọi secret mà container/môi trường Python đó thấy được là đã bị xâm phạm. Nếu bạn đang dùng image Docker `1.106.x`, bạn vẫn phơi nhiễm với chuỗi eMudhra root CA cho đến khi bản backport phát hành — theo dõi [#47904](https://github.com/BerriAI/litellm/issues/47904).
- **Đừng dựa vào thông báo "latest release" trên UI** để hướng dẫn nâng cấp — hành vi đang chuyển sang changelog tài liệu ([#47998](https://github.com/BerriAI/litellm/pull/47998)). Hãy đăng ký trực tiếp releases/issues.
- **Accounting chi phí/token không đáng tin trong các trường hợp biên**: cache hit (spend 0, token phát lại), `input_cost_per_token: 0` tùy chỉnh, và các dòng có giá khác provider. Nếu bạn bill hoặc quota dựa trên spend log của LiteLLM, hãy đối chiếu với hóa đơn provider. [#39057](https://github.com/BerriAI/litellm/issues/39057), [#30081](https://github.com/BerriAI/litellm/issues/30081), [#47675](https://github.com/BerriAI/litellm/issues/47675)
- **Routing nhiều deployment không đảm bảo công bằng**: latency-based routing sụp đổ dưới concurrency ([#24720](https://github.com/BerriAI/litellm/issues/24720)), và `Retry-After` bị bỏ qua với group nhiều deployment ([#34399](https://github.com/BerriAI/litellm/issues/34399)). Thêm client-side backoff và tránh fan-out vào upstream dùng chung duy nhất.
- **Nếu bạn build trên Claude Code / Anthropic `/v1/messages`**: một số lỗ hổng translation ảnh hưởng đến streaming tool call ([#25390](https://github.com/BerriAI/litellm/issues/25390)), adaptive thinking ([#26224](https://github.com/BerriAI/litellm/issues/26224)), và Bedrock web-search interception ([#26252](https://github.com/BerriAI/litellm/issues/26252)). Test trên đúng backend của bạn trước khi phụ thuộc vào các đường này.
- **Postgres là dependency cứng ở quy mô lớn**: cạn connection và DB chập chờn có thể làm sập toàn bộ xác thực key ([#34479](https://github.com/BerriAI/litellm/issues/34479), [#26237](https://github.com/BerriAI/litellm/issues/26237)). Cân nhắc local auth cache với invalidation đúng (lưu ý lỗ rò cache team-delete hiện có, [#34217](https://github.com/BerriAI/litellm/issues/34217)) và dự phòng connection-pool.
- **Phòng chống error body upstream quá lớn** ([#34031](https://github.com/BerriAI/litellm/issues/34031)) — giảm timeout/

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới trong 24h qua, nhưng hàng đợi PR cực kỳ sôi động: loạt trình chỉnh sửa node Flows (#14730, #14889, #14891, #14898, #14899, #14904, #14905) đang được hợp nhất theo dạng xếp chồng, mở rộng Studio thành một bề mặt soạn thảo pipeline/game/agent hoàn chỉnh. Về phía hạ tầng, phục vụ GGUF đa node qua llama.cpp RPC tiếp tục trưởng thành (#13726, #14274, #10323, #10280), và một loạt bản sửa lỗi ổn định đã được hợp nhất cho xử lý đồ thị CUDA diffusion (#14867, #14777) và staging LoRA ảnh cho `sd-server` (#14860). Các regression mới đáng chú ý nhất được báo cáo hôm nay liên quan đến việc âm thầm fallback về CPU trên AMD RDNA3 Linux (#14906) và đường phục hồi MacOS Metal OOM (#14431).

## 2. Phát hành & Thay đổi phá vỡ tương thích

Không có. Không có bản phát hành nào trong 24h qua; không có mục di chuyển API/config.

## 3. Hỗ trợ Model & Phần cứng mới

- **DeepSeek-V4.1-Flash-1017 (GGUF) lỗi tải** — người dùng báo cáo kiến trúc `deepseek41-dspark` không được llama.cpp đi kèm nhận diện; việc xử lý sidecar DSpark/DFlash đang được giải quyết trong [#14431](https://github.com/unslothai/unsloth/pull/14431), nơi dành riêng bộ nhớ sidecar trong `--fit-target` và thêm phục hồi Metal OOM. Issue: [#14695](https://github.com/unslothai/unsloth/issues/14695).
- **MOSS-Image port trong cây** — bản dựng lượng tử hóa và GGUF qua stable-diffusion.cpp, được thêm như một họ ảnh trong Studio ([#14552](https://github.com/unslothai/unsloth/pull/14552), hiện đã đóng/đã hợp nhất).
- **Phục vụ GGUF đa node** — chia N-node qua nhiều máy qua llama.cpp RPC, xếp chồng trên orchestrator hai-Spark ([#13726](https://github.com/unslothai/unsloth/pull/13726)); ghép nối mạng gia đình với mutual TLS ([#14274](https://github.com/unslothai/unsloth/pull/14274)); bộ gợi ý topology hai-Spark với async replica router ([#10323](https://github.com/unslothai/unsloth/pull/10323)); clustering DGX Spark một/hai node và huấn luyện pipeline ([#10280](https://github.com/unslothai/unsloth/pull/10280)).
- **Qwen3.5 GatedDeltaNet** — context parallel / FSDP2 sharding cho các lớp hồi quy hybrid vẫn chưa được hỗ trợ; issue đã đóng mà không ghi nhận bản sửa ([#12051](https://github.com/unslothai/unsloth/issues/12051)).
- **OmniVoice** — yêu cầu hỗ trợ finetune full/LoRA và inference trong Studio ([#14660](https://github.com/unslothai/unsloth/issues/14660)).
- **Giới hạn bộ nhớ XPU/MPS** — khoảng trống còn lại về giới hạn bộ nhớ GPU cho huấn luyện XPU và MPS, cùng việc sinh ảnh tuân thủ ngân sách VRAM ([#8178](https://github.com/unslothai/unsloth/issues/8178)).

## 4. Hiệu năng & Tối ưu hóa

- **Sửa lỗi flush allocator diffusion** — pre-hook mã hóa prompt gọi `torch.cuda.empty_cache()` sau mỗi lần giải phóng nhóm trên các tầng offload/streaming, gây đồng bộ thiết bị cộng với churn allocator trên *mỗi prompt*. Bản sửa dừng flush mỗi lần mã hóa ([#14777](https://github.com/unslothai/unsloth/pull/14777), đã đóng).
- **Tháo dỡ đồ thị CUDA diffusion** — dừng ghi đồ thị CUDA một khi VMM arena đã thất bại, và tách nó ra, tránh việc ghi đồ thị lãng phí dưới `low_vram` CPU offload ([#14867](https://github.com/unslothai/unsloth/pull/14867), đã đóng).
- **KV preemption cho chat song song** — một llama-server giữ một KV cache duy nhất giờ đây tạm dừng/preempt công việc qua `--preempt-ram` khi được hỗ trợ, với Studio chuyển giao preemption cho server; nhắm đến đồng thời tốt hơn trên cache chia sẻ ([#10301](https://github.com/unslothai/unsloth/pull/10301), đang mở).
- **pre-commit.ci compute** — `scripts/enforce_kwargs_spacing.py` cực kỳ chậm và tạo tải CI đáng kể trên repo có lượng PR cao ([#14174](https://github.com/unslothai/unsloth/issues/14174), đã đóng).
- **Embedding lưu trữ hội thoại bị đình trệ** — các cuộc trò chuyện dài, nhiều công cụ có thể mất *hàng phút* trong embedding lưu trữ dựa trên CPU trước khi llama.cpp nhận được bất kỳ yêu cầu inference nào trên Studio Desktop v0.1.909-beta ([#14519](https://github.com/unslothai/unsloth/issues/14519), đang mở).

## 5. Ổn định & Regression

Xếp hạng theo mức độ nghiêm trọng:

1. **Âm thầm fallback về CPU trên Linux AMD native (RDNA3/gfx1100)** — Studio thêm `/opt/rocm/lib` vào đầu khiến GPU bị ẩn khỏi `llama-server` đi kèm; nghi ngờ là regression từ bản sửa #7208. Cài lại AppImage mới trên CachyOS vẫn tái hiện ([#14906](https://github.com/unslothai/unsloth/issues/14906), đang mở, chưa có PR sửa).
2. **MacOS Metal OOM khiến llama-server lỗi vĩnh viễn** — prefill đầu tiên chết với `kIOGPUCommandBufferCallbackErrorOutOfMemory`, sau đó mọi yêu cầu đều thất bại; đường phục hồi trong [#14431](https://github.com/unslothai/unsloth/pull/14431) (đang mở).
3. **Tệp đính kèm trở nên không thể đọc vĩnh viễn sau tự động nén** — ảnh/PDF bị mất sau nén, và `search_conversation` không bao giờ được gọi ([#14708](https://github.com/unslothai/unsloth/issues/14708), đang mở).
4. **Mất đồng bộ model cục bộ đa tài khoản** — nhiều tài khoản LAN trên cùng một inference server mất đồng bộ tải model ([#12365](https://github.com/unslothai/unsloth/issues/12365), đã đóng).
5. **Lỗi linker inference LoRA Intel XPU trên Windows** — tham số linker GNU và MSVC bị trộn lẫn ([#14807](https://github.com/unslothai/unsloth/issues/14807), đang mở).
6. **Lemonade/FastFlowLM chat+models ngừng hoạt động** — regression trên AMD Ryzen AI 7 350 sau cơ chế #11743 ([#14650](https://github.com/unslothai/unsloth/issues/14650), đang mở).
7. **Regression UI/UX** — xử lý phím mũi tên trong chat MacOS ([#14764](https://github.com/unslothai/unsloth/issues/14764)), bảng trình duyệt mất bản xem trước đã render khi chỉnh sửa yêu cầu ([#14783](https://github.com/unslothai/unsloth/issues/14783)), chọn model không lưu lại qua các cuộc trò chuyện đa model ([#14506](https://github.com/unslothai/unsloth/issues/14506), đã đóng), tin nhắn assistant không thể chỉnh sửa ([#13938](https://github.com/unslothai/unsloth/issues/13938), đã đóng).
8. **Lỗi xuất** — model có mã từ xa không thể xuất từ UI ([#14688](https://github.com/unslothai/unsloth/issues/14688), đang mở).
9. **Vệ sinh chuỗi cung ứng** — trình cài đặt ghim uv ≥0.13.4 (loại bỏ root CA emSign) trong [#14894](https://github.com/unslothai/unsloth/pull/14894).

## 6. Điều này có nghĩa gì với nhà phát triển ứng dụng

- **Studio đang trở thành một nền tảng, không chỉ là trình huấn luyện.** Ngăn xếp Flows (#14730 + các phần tiếp theo) thêm trình chỉnh sửa node, sub-flows, chế độ xem ứng dụng, polling job, GPU lease, khối memory-stream (mẫu Generative Agents), và khối chuyển đổi dữ liệu/tài liệu. Nếu bạn xây dựng pipeline agentic, hãy theo dõi bề mặt này — nó giờ chồng lấn với các workflow kiểu Langflow/Flowise/n8n và được thiết kế cho thực thi model cục bộ.
- **Triển khai đa người dùng / đa tenant cần cẩn thận.** Mất đồng bộ đa tài khoản LAN (#12365) và yêu cầu lời chào/cấu hình theo người dùng (#14680) cho thấy Studio đang được dùng như một inference server chia sẻ. Hãy dự kiến các cạnh chưa mượt quanh cách ly phiên và trạng thái model cho đến khi chúng được hợp nhất.
- **Người dùng AMD/Linux và Windows-Intel nên ghim đường dẫn ROCm/oneAPI đã biết là tốt** — hành vi thêm vào đầu (#14906) có thể âm thầm đẩy bạn xuống CPU, đây là một vực thẳm về độ trễ, không phải một vụ crash.
- **Khối lượng công việc agent ngữ cảnh dài có chi phí trước inference ẩn** trên Studio Desktop: embedding lưu trữ trước khi llama.cpp nhận yêu cầu (#14519). Hãy dự trù cho nó hoặc tắt lưu trữ trong các vòng lặp nhạy cảm độ trễ.
- **Lên kế hoạch cho tranh chấp KV cache** nếu bạn ghép nhiều chat vào một server; công việc preemption (#10301) là hướng đi nhưng chưa được hợp nhất.
- **Phục vụ đa node qua RPC là thật nhưng còn tiên phong** — ghép nối mutual-TLS (#14274) và chọn topology (#10323) là tùy chọn và nhắm đến thiết lập home-lab/DGX Spark; đừng chuẩn hóa nó cho production vội.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*