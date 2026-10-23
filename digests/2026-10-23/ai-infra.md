# Bản tin hạ tầng AI 2026-10-23

> Tạo lúc: 2026-10-23 05:33 UTC | Dự án theo dõi: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## So sánh chéo dự án

# Báo cáo So sánh Liên dự án — AI Infrastructure Digest
**Ngày: 2026-10-23 | Phạm vi: vLLM · SGLang · llama.cpp · Ollama · LiteLLM · Unsloth**

---

## 1. Tổng quan Hệ sinh thái

Tầng hạ tầng AI đang ở **pha củng cố và gia cố**: không có bản phát hành lớn nào trong cả sáu dự án hôm nay, và hoạt động chủ yếu xoay quanh sửa lỗi tính đúng đắn, đồng bộ backend (ROCm/SM90/SM120/SYCL), và hỗ trợ cùng một nhóm mô hình tiên tiến — **DeepSeek-V4.1-Flash, GLM-5.3-Flash, Qwen3.8, Kimi-K3, MiniMax-M3.1, Nemotron 3.5**. Hai dạng rủi ro khác biệt chi phối: một **vụ xâm phạm chuỗi cung ứng trong LiteLLM v1.107.0** (trình đánh cắp thông tin xác thực / trình tải RCE chưa được vá) và một làn sóng **suy giảm tính đúng đắn âm thầm** trên các engine phục vụ (nhiễm bẩn KV liên yêu cầu trong vLLM PD disaggregation, thay thế SwiGLU→SiTU bằng MXFP4 trong SGLang, sụp đổ giải mã ngữ cảnh dài trong llama.cpp). Trong khi đó, **biên giới phục vụ tác tử** (KV cache lập trình được, hạ tầng PD disaggregation, giải mã speculative thích ứng, ngân sách gọi công cụ MCP) là nơi sự khác biệt kiến trúc đang diễn ra — không phải thông lượng thô. AMD ROCm/MI355X đang tiến vào lãnh địa hạng nhất trên cả vLLM và SGLang, trong khi các hướng phần cứng Apple/tiêu dùng (Ollama MLX, llama.cpp Metal) mang theo các lỗi hồi quy mới.

---

## 2. So sánh Hoạt động

| Dự án | Issues (đang hoạt động/đáng chú ý) | PRs (đang hoạt động/đáng chú ý) | Bản phát hành (24h qua) | Chủ đề chính |
|---|---|---|---|---|
| **vLLM** | ~15 được theo dõi (2 lỗi tính đúng đắn mức cao) | ~15 (hiệu năng + ROCm + hỗ trợ mô hình) | Không | Hỗ trợ mô hình tiên tiến, tính đúng đắn PD disaggregation |
| **SGLang** | ~10 (ma trận GLM-5.3-Flash + CI flake) | ~12 (kernel DeepSeek-V4.1, AMD) | Không | Độ tin cậy backend, kernel prefill thưa |
| **llama.cpp** | ~12 lỗi hồi quy mở (ngữ cảnh dài chiếm ưu thế) | ~20+ (SYCL, Hexagon, OpenCL, MoE) | **Có — b11819–b11829 (11 bản build)** | Độ phủ backend + gia cố bảo mật RPC |
| **Ollama** | ~10 mở (2 lỗi nghiêm trọng theo nền tảng) | ~8 (MLX, tương thích OpenAI/Anthropic) | Không | Bổ sung mô hình MLX, tính đúng đắn API |
| **LiteLLM** | ~20 (2 nghiêm trọng: RCE + tin cậy CA) | ~10 (định tuyến, ngân sách MCP, kiểu dữ liệu) | Không (đóng băng sau khi thu hồi) | **Khắc phục sự cố** |
| **Unsloth** | ~11 (1 cao: dự phòng ROCm) | ~10 (tái cấu trúc UI Studio, Metal OOM) | Không | Trải nghiệm tinh chỉnh, ổn định Mac Metal |

**Nhận xét:** llama.cpp là dự án duy nhất phát hành bản build hôm nay (11 bản), khẳng định nhịp độ "luôn hoạt động" của nó. Trạng thái không phát hành của LiteLLM là bất thường — nó phản ánh một **lệnh đóng băng có chủ đích** sau khi thu hồi v1.107.0, không phải hoạt động thấp. Trình theo dõi issue của SGLang bị lệch không cân xứng về một mô hình duy nhất (GLM-5.3-Flash) thất bại trên ba backend — dấu hiệu rằng hỗ trợ mô hình Ngày-0 đang vượt xa khả năng xác thực backend.

---

## 3. Cuộc đua Hỗ trợ Mô hình

| Mô hình / Kiến trúc | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek-V4.1-Flash** | ✅ Hỗ trợ + PR hiệu năng | ✅ Prefill thưa + đồ thị MXFP8 | ❌ (GGUF `deepseek41-dspark` bị từ chối) | ✅ Cloud | ⚠️ Tải GGUF thất bại (#14695) |
| **GLM-5.3-Flash** | ✅ Loại bỏ đồng bộ Chunk-KDA | ⚠️ **3 lỗi backend** (SM90/SM120) | ✅ Tối ưu QSA/đầu vào | ✅ Cloud | — |
| **Qwen3.8 / 3.5** | ✅ Giải mã GDN, ROCm | ✅ AMD lm_head, hợp nhất Kimi-K3 | ⚠️ Sụp đổ ngữ cảnh dài >64K | ⚠️ PR YaRN (#19231) | ⚠️ GDN CP không được hỗ trợ |
| **Kimi-K3** | ✅ Tháp thị giác trên ROCm | ⚠️ DCP a2a bị hỏng (GB300) | — | — | — |
| **MiniMax-M3.1-Flash** | ✅ PR mô hình mới | — | — | — | — |
| **Nemotron 3.5** | — | — | ✅ Hỗ trợ GQA/BPE | ✅ Bolt 74B-A9B (MLX) | — |
| **Gemma 4** | ✅ NVFP4 KV head_dim 512 | — | — | ✅ Khôi phục gọi công cụ | — |
| **Muse Spark** | ✅ ROCm + mô hình mới | ✅ Lộ trình | — | — | — |
| **SANA-Sprint / Cosmos3** | — | ✅ PR diffusion | — | — | ✅ Lưu trú video |

**Ai đang dẫn đầu:**
- **vLLM** dẫn đầu về độ phủ mô hình tiên tiến và đa dạng phần cứng (SM100/103, ROCm MI355X, GB10).
- **SGLang** nhanh nhất trong việc *thử* Ngày-0 (Muse Spark, SANA-Sprint, T-Head PPU) nhưng đang **trả giá bằng độ tin cậy** — GLM-5.3-Flash thực tế bị hỏng trên các backend không phải Triton.
- **llama.cpp** thắng về **hỗ trợ kiến trúc đuôi dài** (Nemotron, Hexagon, OpenCL, lượng tử hóa BF16X) nhưng chậm hơn về hỗ trợ MoE tiên tiến.
- **Ollama** là dự án duy nhất phát hành **nhập MLX lượng tử hóa** (Nemotron 3-bit affine với metadata theo module) — liên quan đến triển khai trên Apple Silicon.

**Khoảng trống cần theo dõi:** Không dự án nào có hỗ trợ *ổn định* cho DeepSeek-V4.1-Flash trên tất cả backend cùng lúc. Đây là rủi ro mô hình tiên tiến lớn nhất trong hệ sinh thái hiện nay.

---

## 4. Biên giới Hiệu năng

| Trục tối ưu hóa | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **KV cache** | PD disaggregation, NVFP4, RFC KV lập trình được | KVShard 0SM allgather, HiCache | — | RFC KV connector | — |
| **Batching / lập lịch** | Token spec nhận biết ngữ cảnh, MRV2 | Sửa ưu tiên preemption | — | `num_predict=-2` động | — |
| **Lượng tử hóa** | Hợp nhất MXFP4 ROCm, NVFP4 head_dim 512 | Prefill hợp nhất MXFP4, gfx1250 lm_head | BF16X (11.5bpw), q2_k OpenCL | MLX affine 3-bit | Giải lượng tử FP8 pre-sm89 |
| **Phục vụ phân tán** | Sửa đồng bộ PP/PCP rank, frontend Rust | 0SM KV allgather, ràng buộc nền tảng ngoài cây | `-sm tensor` SYCL (+19%), phát lại đồ thị | — | RPC N-máy (#13726) |
| **Kernel** | Giải mã Qwen GDN (+5.7–6.8%), loại bỏ đồng bộ host GLM KDA | Tập hợp 8 token DeepSeek-V4.1, prefill đồ thị MXFP8 | FlashAttention-MKL, RDNA3/4 split-K | Tắt flash attn cho Grok | Sửa Triton fp8e4nv |
| **Giải mã speculative** | Registry ngoài cây + xác minh cây (MRV2) | Lộ trình spec thích ứng (#23705) | DFlash/MTP (lỗi Vulkan OOB) | LiLiCorr qua DFlash (Nemotron) | — |

**Nơi nỗ lực tập trung:**
1. **Lượng tử hóa là trục bận rộn nhất** — mọi engine phục vụ và runtime đều phát hành các đường dẫn bit thấp mới (MXFP4, NVFP4, BF16X, MLX 3-bit). Đây đồng thời là cuộc chơi về *bộ nhớ* và *băng thông*.
2. **KV cache là chiến trường mới** — RFC Programmable KV Cache của vLLM, KVShard allgather của SGLang, và đề xuất KV connector của Ollama đều chỉ ra rằng vòng đời KV đang trở thành mối quan tâm API hạng nhất.
3. **Hạ tầng phân tán/PD disaggregation đang trưởng thành nhanh nhất ở vLLM**, nhưng với rủi ro tính đúng đắn cao nhất (#61160 nhiễm bẩn liên yêu cầu là lỗi phục vụ nghiêm trọng nhất trong digest này).
4. **Giải mã speculative đang được làm cho mở rộng được** (registry ngoài cây của vLLM, lộ trình thích ứng của SGLang) — dấu hiệu nó đang chuyển từ tính năng nghiên cứu sang nguyên thủy tầng định tuyến.

---

## 5. Định vị Tầng

| Tầng | Dự án | Vai trò | Khác biệt chính |
|---|---|---|---|
| **Engine phục vụ GPU** | vLLM, SGLang | Suy luận đa thuê bao thông lượng cao ở quy mô datacenter | PD disaggregation, MoE, mô hình tiên tiến Ngày-0 |
| **Runtime cục bộ / biên** | llama.cpp, Ollama | Một nút, phần cứng tiêu dùng, đa nền tảng | Độ phủ backend (CUDA/Metal/Vulkan/SYCL/Hexagon), hệ sinh thái GGUF |
| **Gateway / bộ định tuyến LLM** | LiteLLM | Trừu tượng hóa đa nhà cung cấp, xác thực, kế toán chi tiêu, ngân sách | Định tuyến đa nhà cung cấp, khóa ảo, đặt trước ngân sách MCP |
| **Tinh chỉnh / huấn luyện** | Unsloth | LoRA/QLoRA, trải nghiệm Studio, xuất GGUF | Tinh chỉnh tiết kiệm bộ nhớ, UI Studio, lộ trình RPC đa máy |

**Tương tác ngăn xếp đáng chú ý:**
- **llama.cpp là nền tảng** cho Ollama (`llama-server` đi kèm), Unsloth (xuất/runtime GGUF), và ngày càng cho suy luận phân tách RPC. Lỗi hồi quy lan xuống hạ nguồn — xem sụp đổ 30× AMD RADV của Ollama (#19201) và dự phòng ROCm của Unsloth (#14906), cả hai đều bắt nguồn từ hành vi llama.cpp đi kèm.
- **LiteLLM nằm trên tất cả chúng** — vụ xâm phạm chuỗi cung ứng v1.107.0 là một **sự cố liên tầng**, vì bất kỳ ai định tuyến vLLM/SGLang/llama.cpp qua proxy LiteLLM bị xâm phạm đều có khóa nhà cung cấp và thông tin xác thực DB gặp rủi ro.
- **Unsloth cấp mô hình cho llama.cpp/Ollama** — lỗi `trust_remote_code` khi xuất GGUF (#14688) và thất bại tải DeepSeek-V4.1-Flash (#14695) tạo ra **bàn giao bị hỏng** giữa tinh chỉnh và phục vụ cục bộ.
- **vLLM và SGLang chồng lấn nhưng không cạnh tranh hoàn toàn** — ràng buộc nền tảng ngoài cây của SGLang (AWS Trainium, T-Head PPU) và hỗ trợ diffusion (SANA-Sprint, Cosmos3) đẩy nó về vai trò "phục vụ đa phương thức" rộng hơn; vLLM vẫn tập trung chặt vào thông lượng LLM/MoE.

---

## 6. Tín hiệu Xu hướng

**1. Bảo mật chuỗi cung ứng giờ là rủi ro vận hành hạng cao nhất.**
Vụ xâm phạm LiteLLM v1.107.0 (trình tải RCE `cook.pth` + `sitecustomize`, repo giả mạo) là cuộc tấn công chuỗi cung ứng *được xác nhận* đầu tiên trong nhóm này. Kết hợp với lỗi đọc/ghi tùy ý trước xác thực `GRAPH_COMPUTE` RPC chưa được hợp nhất của llama.cpp (#31017/#31018) và các CVE chuỗi công cụ Go của Ollama, **2026 là năm "ghim bằng digest, không phải tag" trở thành điều kiện tối thiểu** cho triển khai hạ tầng AI.

**2. Sai âm thầm > sụp đổ.**
Các lỗi nguy hiểm nhất hôm nay không phải là sụp đổ:
- vLLM #61160: rò rỉ ngữ cảnh liên thuê bao với `--no-enable-prefix-caching` là biện pháp giảm thiểu duy nhất.
- SGLang #45755: `flashinfer_mxfp4` âm thầm tính SwiGLU thay vì SiTU.
- Ollama #19187: công cụ không xác định → phản hồi rỗng với `eval_count > 0`.
- llama.cpp #30905: detokenizer cắt quá nhiều khoảng trắng so với tham chiếu HF.
Ứng dụng phải **xác thực đầu ra bằng số**, không chỉ kiểm tra HTTP 200.

**3. AMD ROCm đang vượt ngưỡng đáng tin cậy — kèm theo lỗi hồi quy.**
vLLM và SGLang đều có trình theo dõi tối ưu MI355X/gfx950 với lợi ích thực (giải mã Qwen GDN, hợp

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành nào trong 24 giờ qua, nhưng hoạt động về issue và PR rất sôi động liên quan đến việc hỗ trợ **DeepSeek-V4-Flash/v4.1, GLM-5.3, Kimi-K3, Qwen3.8 và Minimax-M3.1**, cùng với một làn sóng lớn các công việc tối ưu hóa ROCm/gfx950 (MI355X) và MRV2 (Model Runner V2). Có hai lỗi đúng đắn cần được chú ý khẩn cấp: **nhiễm bẩn KV giữa các request** trong PD disaggregation với prefix caching, và **race điều kiện hết hạn lease của NIXL** khiến decode âm thầm tiêu thụ các KV block đã bị ghi đè. Về mặt tích cực, một số cải thiện hiệu năng cụ thể đã được merge hoặc đang trong quá trình review (Qwen GDN decode +5,7–6,8%, loại bỏ host-sync chunk-KDA của GLM-5.3, tái sử dụng graph-pool của DeepSeek-V4.1).

## 2. Bản phát hành & Thay đổi đột phá

Không có bản phát hành mới trong 24h qua. Không có thay đổi đột phá nào về API/config được ghi nhận hôm nay.

Lưu ý (không đột phá, mang tính định hướng): [#44280](https://github.com/vllm-project/vllm/issues/44280) — lộ trình tương thích frontend Rust vẫn tiếp tục; vẫn ở trạng thái thử nghiệm sau cờ `VLLM_USE_RUST_FRONTEND=1`.

## 3. Hỗ trợ Model & Phần cứng mới

- **[Model mới] MiniMax-M3.1-Flash** — [#63232](https://github.com/vllm-project/vllm/pull/63232) (kèm backport ROCm [#63270](https://github.com/vllm-project/vllm/pull/63270) cherry-pick bản sửa số lượng sparse PA KV block #61889).
- **Kimi-K3 Vision Tower trên ROCm** — đã bật `torch.compile` + encoder CUDA graph capture: [#63086](https://github.com/vllm-project/vllm/pull/63086).
- **NVFP4 KV cache ở head_dim 512 trên SM100/SM103** (các lớp global của Gemma 4) thông qua FlashInfer: [#62117](https://github.com/vllm-project/vllm/pull/62117).
- **Muse Spark (ROCm)** — shared RoPE cache được cấp phát theo `max_model_len` thay vì cache 1M vị trí cho từng lớp (tiết kiệm ~11,5 GiB/GPU): [#62757](https://github.com/vllm-project/vllm/pull/62757); PR model mới [#62766](https://github.com/vllm-project/vllm/pull/62766).
- **Khả năng mở rộng speculative decoding** — registry spec method ngoài cây + phần mở rộng verify cho linear-attention: [#62962](https://github.com/vllm-project/vllm/pull/62962); hook verify không theo chuỗi (tree) cho MRV2: [#62963](https://github.com/vllm-project/vllm/pull/62963).
- **Vẫn đang mở / được theo dõi**: hỗ trợ Ampere (SM8x) cho DeepSeek-V4-Flash — [#50576](https://github.com/vllm-project/vllm/issues/50576) (118 bình luận, 👍16).

## 4. Hiệu năng & Tối ưu hóa

- **Qwen GDN decode + MRV2 attention metadata** — Qwen3.8-27B @ TP4 trên B300: **decode +5,7% (không spec), +6,8% với MTP**: [#62961](https://github.com/vllm-project/vllm/pull/62961).
- **GLM-5.3-Flash chunk KDA** — loại bỏ đồng bộ GPU→CPU mỗi prefill khỏi `prepare_chunk_indices`: [#63072](https://github.com/vllm-project/vllm/pull/63072).
- **Đồ thị replay decoder của DeepSeek-V4.1** — capture trên model-graph stream để chia sẻ một graph pool thay vì hai: [#63155](https://github.com/vllm-project/vllm/pull/63155).
- **Hợp nhất quant trên ROCm** — block Hadamard rotation được hợp nhất vào AITER MXFP4 activation quant: [#63272](https://github.com/vllm-project/vllm/pull/63272); kernel Triton hợp nhất QK-norm+RoPE+gate được bật cho Qwen3-Next/Qwen3.5 trên ROCm: [#51406](https://github.com/vllm-project/vllm/pull/51406).
- **Theo dõi**: [ROCm][MI355X] Qwen3.8-2.4T-A95B — [#57149](https://github.com/vllm-project/vllm/issues/57149); Qwen3.8-Flash-Next — [#59575](https://github.com/vllm-project/vllm/issues/59575); GLM-5.3 chung — [#57406](https://github.com/vllm-project/vllm/issues/57406).
- **Nạp trọng số trên GB10 (DGX Spark)** — các bản sao H2D theo từng tensor trực tiếp từ mmap view của safetensors rất chậm: [#58726](https://github.com/vllm-project/vllm/issues/58726).
- **Lập lịch speculative** — đề xuất `num_speculative_tokens_per_batch_size` có nhận biết độ dài ngữ cảnh: [#48627](https://github.com/vllm-project/vllm/issues/48627).
- **Nút thắt về bằng chứng** — các eval/benchmark tái lập được BYOG cho các PR nhạy cảm về hiệu năng: [#61698](https://github.com/vllm-project/vllm/issues/61698).

## 5. Ổn định & Hồi quy

**Mức độ nghiêm trọng cao**

- **Nhiễm bẩn ngữ cảnh giữa các request trong PD disaggregation** với automatic prefix caching (NIXL, DeepSeek-V4.1-Flash): phản hồi chứa nội dung từ các request khác; hết sạch khi dùng `--no-enable-prefix-caching`. Có reproducer trên `/v1...`: [#61160](https://github.com/vllm-project/vllm/issues/61160). **Chưa có PR sửa lỗi nào được tham chiếu — hãy coi đây là vấn đề đúng đắn nghiêm trọng đối với triển khai PD đa tenant.**
- **Race điều kiện lease KV của NixlConnector** — producer giải phóng KV block khi lease hết hạn trong khi một READ từ xa đang thực hiện; decode âm thầm tiêu thụ KV đã bị ghi đè: [#61229](https://github.com/vllm-project/vllm/issues/61229). Chưa có PR sửa lỗi nào được tham chiếu.
- **Qwen3.8-Flash-Next trên GB10 (v0.32 nightly)** — nội dung prompt vượt quá ~`indexer_budget` (2048 token) không hiển thị với model: [#62776](https://github.com/vllm-project/vllm/issues/62776). Báo cáo gần đây; chưa có PR sửa lỗi nào được tham chiếu.

**Mức độ nghiêm trọng trung bình**

- **Chọn trang KV cho model hybrid với draft layer** + hai lỗ hổng warmup FA4 (các shape prefill được compile trong lúc serving) — PR sửa lỗi đang mở: [#62800](https://github.com/vllm-project/vllm/pull/62800).
- **Prefix-cache miss của Hybrid GDN dưới MTP spec decoding** (Qwen3.5-122B-A10B): các prompt có độ dài là bội số của hash unit nhận zero hit — PR sửa lỗi đang mở: [#52244](https://github.com/vllm-project/vllm/pull/52244).
- **Đầu ra garbled khi tool-calling với PP2** so với PP1 (GLM-5.2-FP8 DSA, chunked-prefill trên 8×MI355X): [#46262](https://github.com/vllm-project/vllm/issues/46262). Chưa có PR sửa lỗi nào được tham chiếu.
- **KV engine ID không được đồng bộ giữa các PCP rank** — lỗi khởi động đa node tại PP2/PCP8/TP2; bản sửa nháp: [#62916](https://github.com/vllm-project/vllm/pull/62916).

**Mức độ thấp hơn / tồn đọng lâu dài**

- Lỗi khởi tạo Gemma 4 với lượng tử hóa KV cache theo per-token-head: [#40388](https://github.com/vllm-project/vllm/issues/40388).
- Theo dõi ngữ nghĩa & tính xác định của logprobs/logits (liên quan MRV2): [#42259](https://github.com/vllm-project/vllm/issues/42259).

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Nếu bạn chạy PD disaggregation kèm prefix caching, hãy rà soát #61160 ngay.** Rò rỉ ngữ cảnh đa tenant âm thầm trong thiết lập NIXL phân tách là một rủi ro cô lập dữ liệu; tắt prefix caching là biện pháp giảm thiểu duy nhất hiện được ghi nhận. Cũng nên theo dõi #61229 nếu bạn dùng NixlConnector — cơ chế hỏng (decode đọc KV đã bị trục xuất/ghi đè) diễn ra âm thầm, không gây crash.
- **Serving đa tenant / agentic đang trở thành mối quan tâm hàng đầu**: RFC Programmable KV Cache ([#57103](https://github.com/vllm-project/vllm/issues/57103)) đề xuất các chính sách giữ lại/di chuyển/hạn ngạch có thể kết hợp, được điều khiển bởi ý định của router — phù hợp nếu bạn xây dựng các agent nhận biết phiên cần kiểm soát vòng đời KV tường minh.
- **Hạ tầng cho serving phân tách đang được hoàn thiện dần**: các endpoint `/render` → `/generate` → derender đang được bổ sung (text derender trên `/inference/v1/generate`: [#56851](https://github.com/vllm-project/vllm/issues/56851); streaming derender: [#47161](https://github.com/vllm-project/vllm/issues/47161)). Nếu bạn vận hành frontend/router tùy chỉnh, hãy kỳ vọng sự tách bạch rõ ràng hơn giữa tầng tiền xử lý CPU và tầng suy luận GPU.
- **Người dùng Qwen3.5/3.8 và GLM-5.x sẽ được lợi nhẹ ở decode** mà không cần đổi config sau khi #62961 và #63072 được merge — đáng để kiểm tra lại độ trễ trên B300/ROCm sau khi nâng cấp.
- **ROCm/MI355X giờ là mục tiêu hạng nhất đáng tin cậy** cho các model tiên tiến (Kimi-K3, GLM-5.3, Qwen3.8, MiniMax-M3.1); nếu bạn đang chần chừ với AMD cho khối lượng công việc vision hoặc MoE, các tracker tối ưu ở trên là nơi cần theo dõi.
- **Khoảng trống quan sát đáng lưu ý**: với khối lượng công việc agentic cần đo thời gian theo từng request hoặc từng engine-step, RFC observability ([#39979](https://github.com/vllm-project/vllm/issues/39979)) vẫn là đề xuất cần theo dõi — chỉ riêng PyTorch Profiler vẫn chưa đủ để quy kết ở mức thô.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Sức khỏe của CI đã trở thành chủ đề chiếm ưu thế: issue **#42752** (mở từ ngày 6/10) hiện là mục được bình luận nhiều nhất trong tracker với **123 bình luận**, ghi lại các lượt chạy `PR Test Base` / `PR Test Extra` chập chờn do workflow `/sglang-pr-babysit` phát hiện, và một tracker lỗi phía AMD mới (**#45847**) được mở hôm nay. Về mặt tính đúng đắn, sự chú ý tập trung vào **GLM-5.3-Flash**, nơi ba báo cáo riêng biệt (crash fa4/SM120, lỗi truy cập bộ nhớ bất hợp pháp của H20 EAGLE, và việc kernel `flashinfer_mxfp4` âm thầm thay thế SwiGLU bằng SiTU trên SM90) cho thấy ma trận backend của model này vẫn chưa được thống nhất. Trong khi đó, các PR tối ưu cho DeepSeek-V4.1 và GLM-5.3-Flash tiếp tục được merge đều đặn, phần lớn xoay quanh quantization thân thiện với CUDA-graph và các kernel sparse prefill.

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

Không có bản phát hành nào trong 24h qua. Một vài mục ở mức cấu hình đáng theo dõi:

- **`--enable-lmcache` + radix cache bị tắt sẽ làm crash scheduler** ở lần kiểm tra idle đầu tiên (**#45929**, v0.5.22). Mọi triển khai dựa vào lmcache với các model ở embedding-mode (vốn mặc định tắt radix cache) đều bị ảnh hưởng. [link](https://github.com/sgl-project/sglang/issues/45929)
- **`--model-path` vẫn bắt buộc khi truyền `--config`** (**#36105**, đã đóng vì không hoạt động) — đường dẫn config-file chưa bao giờ được tách hoàn toàn khỏi đối số model-path. [link](https://github.com/sgl-project/sglang/issues/36105)
- Một PR sửa biến môi trường chỉ một dòng (**#45976**) cho biết biến `SGLANG_SWA_EVICTION_INTERVAL_MULTIPLIER` được tài liệu hóa không hề tồn tại trong codebase; knob thực sự là `SGLANG_SWA_...` (khoảng thời gian eviction của sliding-window). Nếu bạn đã từng tinh chỉnh biến được tài liệu hóa đó, thì nó không có tác dụng gì.

## 3. Hỗ trợ Model & Phần cứng mới

- **SANA-Sprint 0.6B (diffusion)** — yêu cầu hỗ trợ native SGLang-Diffusion (**#43671**) và một PR tương ứng (**#45960**) được mở hôm nay, thêm xử lý `SanaSprintPipeline` / `SCMScheduler` cho sinh ảnh 1–4 bước, 1024px. [issue](https://github.com/sgl-project/sglang/issues/43671) · [PR](https://github.com/sgl-project/sglang/pull/45960)
- **T-Head PPU / SAIL (Zhenwu 810/810E/M890P)** — issue roadmap **#37519** cho hỗ trợ upstream chính thức các accelerator này. [link](https://github.com/sgl-project/sglang/issues/37519)
- **Binding nền tảng ngoài cây (AWS Trainium qua Neuron)** — PR **#45897** cho phép các nền tảng bên ngoài đăng ký group device và custom op, loại bỏ fallback cứng cuda/npu/xpu/musa trong `GroupCoordinator`. [link](https://github.com/sgl-project/sglang/pull/45897)
- **Muse Spark** — roadmap phát triển mở (**#44678**) theo dõi việc chia nhỏ PR Day-0 (#44664–#44667), phụ thuộc vào một bản patch/release của DeepGEMM. [link](https://github.com/sgl-project/sglang/issues/44678)
- **Diffusion: Cosmos3 V2V** — tối ưu tiền xử lý qua PyAV cho các frame điều kiện đầu/cuối, tránh phải decode toàn bộ video nguồn (**#45398**). [link](https://github.com/sgl-project/sglang/pull/45398)

## 4. Hiệu năng & Tối ưu hóa

Các công việc cụ thể đã landed hoặc đang được review hôm nay:

- **DeepSeek-V4.1 sparse prefill gather** — PR **#45793** giải lượng tử **8 KV token mỗi program** (tăng từ 1) trong gather paged FP8 (SWA) + FP4 (compressed), nhắm vào giới hạn băng thông bộ nhớ trong `dequantize_k_cache_paged_v41`. [link](https://github.com/sgl-project/sglang/pull/45793)
- **DeepSeek-V4 fused MXFP8 producer bên trong breakable prefill graph** — PR **#45980** mở rộng đường dẫn fused (`fused_mxfp8_rows`) sang graph-mode prefill, vốn trước đây fallback về bf16 + quantization riêng ở các hình dạng độ tương tranh thấp. [link](https://github.com/sgl-project/sglang/pull/45980)
- **AMD gfx1250 lm_head** — PR **#44455** định tuyến bf16 lm_head matmul qua `aiter.tuned_gemm.tgemm.mm` dưới `SGLANG_USE_AITER=1`, tránh đường dẫn hipBLASLt chậm ở kích thước batch decode. [link](https://github.com/sgl-project/sglang/pull/44455)
- **KVShard: 0SM KV cache allgather** — PR **#44029** đề xuất collective sharding KV cache không dùng SM. [link](https://github.com/sgl-project/sglang/pull/44029)
- **Chuẩn bị fusion cho interface attention Mono Kimi-K3** (AMD) — PR **#45202**. [link](https://github.com/sgl-project/sglang/pull/45202)
- **Roadmap Adaptive Speculative Decoding** (**#23705**) vẫn mở, thúc đẩy độ sâu suy đoán động dưới các workload agentic/hỗn hợp, nơi tỷ lệ chấp nhận dao động giữa các pha. [link](https://github.com/sgl-project/sglang/issues/23705)
- **GLM-5.3-Flash trên Hopper (SM90)** — issue theo dõi tối ưu riêng **#45373**, thuộc roadmap Q4 #42473. [link](https://github.com/sgl-project/sglang/issues/45373)
- **Căn chỉnh mamba chunked-prefill cut trên AMD** — PR **#41701** giữ các điểm cắt prefill trên lưới chunk của mamba để việc quyên góp checkpoint DCP không còn kiểu được ăn cả ngã về không. [link](https://github.com/sgl-project/sglang/pull/41701)

## 5. Ổn định & Hồi quy

Xếp theo mức độ nghiêm trọng:

1. **Các backend của GLM-5.3-Flash đều không đáng tin cậy trên mọi phương diện.**
   - **SM120 / RTX PRO 6000**: fa4 crash khi capture CUDA-graph trên hybrid extend reshape; chỉ triton hoạt động (**#42012**, 23 bình luận). [link](https://github.com/sgl-project/sglang/issues/42012)
   - **SM90 / 8×H20 TP8+EP8 với EAGLE**: truy cập bộ nhớ bất hợp pháp của CUDA trong `run_eagle_verify` → `build_grammar_vocab_mask` (**#45159**, v0.5.22). [link](https://github.com/sgl-project/sglang/issues/45159)
   - **SM90**: `flashinfer_mxfp4` âm thầm tính **SwiGLU thay vì SiTU** cho GPT-OSS — đây là sai số âm thầm chứ không phải crash (**#45755**). [link](https://github.com/sgl-project/sglang/issues/45755)
2. **NVFP4 KV cache + spec decoding không dùng được** — bất kỳ bước target-verify nào cũng crash với `TypeError: 'NoneType' object is not subscriptable` trong FlashInfer dequant workspace (`extend_prefix_lens_cpu is None`), tái hiện trên SM120 với native MTP NEXTN (**#36010**). [link](https://github.com/sgl-project/sglang/issues/36010)
3. **Kimi-K3 DCP a2a decode bị hỏng trên GB300 MNNVL 2 node** — 12/12 đầu ra thoái hóa khi bật NCCL graph buffer registration; `NCCL_GRAPH_REGISTER=0` khôi phục đầu ra đúng, cho thấy tương tác giữa CUDA-graph và NCCL registration (**#45367**). [link](https://github.com/sgl-project/sglang/issues/45367)
4. **HiCache trên các model GDN hybrid** — host-tier hit giảm về 0 khi working set bị evict vượt quá ~3 long prefix; host mamba pool cạn kiệt trong khi KV vẫn nằm trên host (**#45400**). [link](https://github.com/sgl-project/sglang/issues/45400)
5. **Scheduler: priority preemption requeue các nạn nhân theo thứ tự tập hợp, có thể lệch nhau giữa các rank TP** — bug tiềm ẩn dẫn đến treo/mất đồng bộ (**#45812**). [link](https://github.com/sgl-project/sglang/issues/45812)
6. **Responses API: các lượt Codex phát lại bị tách thành ba block assistant** bởi bước kiểm tra phase trong `_merge_consecutive_assistant_messages`, khiến model học cách kết thúc lượt trước khi gọi tool — đây là bug về tính đúng đắn của trajectory agent (**#42110**). [link](https://github.com/sgl-project/sglang/issues/42110)
7. **Anthropic `/v1/messages`: các block `tool_reference` bên trong `tool_result` trả về HTTP 500** trên các chat template không hỗ trợ deferred-reference (**#35692**). [link](https://github.com/sgl-project/sglang/issues/35692)

Không có PR sửa lỗi nào được liên kết rõ ràng với các vấn đề trên trong khoảng thời gian hôm nay. Về phía CI, tracker AMD (**#45847**) ghi nhận lỗi `ImportError: _check...` trong `TestDeepseekV4Fp4.setUpClass` trên `test/registered/amd/test_deepseek_v4_flash_fp4.py`.

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Chỉ định backend rõ ràng cho GLM-5.3-Flash.** Cho đến khi #42012/#45159/#45755 được giải quyết, ma trận backend attention trên SM90/SM120 thực tế là "triton hoặc không gì cả" đối với các hình dạng hybrid-extend, và đường dẫn SM90 MXFP4 có thể âm thầm tạo ra activation sai. Nếu bạn phục vụ model này, hãy kiểm tra số liệu đầu ra sau mọi lần nâng cấp backend hoặc flashinfer, không chỉ để phát hiện crash.
- **Không kết hợp NVFP4 KV cache với speculative decoding** (#36010). Sự kết hợp này hiện thất bại một cách tất yếu ở bước verify đầu tiên — không có cách workaround nào ngoài việc bỏ một trong hai tính năng.
- **Trên Kimi-K3 đa node GB300 MNNVL với DCP, hãy tắt NCCL graph buffer registration** (`NCCL_GRAPH_REGISTER=0`) nếu bạn thấy đầu ra greedy bị hỏng; lỗi tái hiện 12/12 trong các smoke test được báo cáo.
- **Các framework agent nên biết về bug tách lượt của Responses API (#42110).** Nó làm hỏng các trajectory kiểu Codex được phát lại theo cách gây thiên lệch hành vi gọi tool trong tương lai, rất tinh vi và chỉ lộ ra ở chất lượng eval đa lượt, không phải ở smoke test đơn lượt.
- **Người dùng endpoint Anthropic có deferred tool loading** nên tránh lồng `tool_reference` bên trong `tool_result` cho đến khi #35692 được merge, nếu không sẽ gặp lỗi 500.
- **Nếu bạn dùng `--enable-lmcache`, hãy tránh các môi trường mà radix cache bị tắt** (model embedding, `--disable-radix-cache` chỉ định rõ) — scheduler crash ở lần idle đầu tiên (#45929).
- **Người theo dõi hiệu năng**: người dùng DeepSeek-V4.1 sẽ thấy lợi ích prefill-gather từ #45793 (8 token/program) và MXFP8 graph prefill hợp nhất từ #45980 sau khi được merge; người dùng AMD gfx1250 sẽ có lợi ích ở kích thước batch decode trong lm_head nhờ #44455 dưới `SGLANG_USE_AITER=1`.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 23/10/2026

## 1. Điểm nổi bật hôm nay

Hôm nay có nhiều bản phát hành mới (b11819–b11829), trong đó hai bản đáng chú ý với nhà phát triển API: **nhập nội dung có kiểu cho endpoint `/rerank`** (hỗ trợ rerank đa phương thức) và **sửa lỗi API realtime để `complete` chỉ được gửi sau khi audio đã commit được xử lý hết**. Về hạ tầng, hỗ trợ MiniCPM-OCR 1.0 đã được thêm vào `mtmd`, và một loạt PR tăng cường bảo mật cho RPC server (kiểm tra descriptor `GRAPH_COMPUTE`) đã xuất hiện — nhưng tính đến thời điểm này chúng chưa được merge và bề mặt lỗ hổng vẫn còn lộ ra. Một nhóm lỗi hồi quy tiềm ẩn đáng kể tiếp tục gia tăng xung quanh việc decode ngữ cảnh dài (80K–130K+) trên các kiến trúc hybrid/DeltaNet (Qwen3.8-27B, Nemotron) trên các backend SYCL, CUDA và Vulkan.

---

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

- **b11829** — `server: Substitute rerank placeholder from the original template only` — thay đổi cách render template rerank; nếu bạn inject template rerank tùy chỉnh, hãy kiểm tra lại việc thay thế placeholder có còn đúng như mong đợi không. [Release](https://github.com/ggml-org/llama.cpp/releases)
- **b11828** — `server: realtime API: send complete after committed audio drains` — thay đổi hành vi cho client audio realtime: `complete` giờ được gắn với việc hoàn tất commit, không phải khi stream cạn. Client dựa vào timing cũ có thể thấy `complete` đến muộn hơn. ([#30994](https://github.com/ggml-org/llama.cpp/pull/30994))
- **b11818** — `server: support typed content input for RERANK endpoint` — hình dạng input mới được chấp nhận; tương thích ngược nhưng mở rộng schema request. ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625))

Không có thay đổi phá vỡ về định dạng config hay schema GGUF trong khoảng thời gian này.

---

## 3. Hỗ trợ Model & Phần cứng mới

- **MiniCPM-OCR 1.0** được thêm vào `mtmd` (đa phương thức). ([b11826](https://github.com/ggml-org/llama.cpp/releases))
- **Nemotron** — hỗ trợ GQA không chuẩn, tokenizer BPE và pre-type `domyn-small`; `gguf-py` giờ ghi Metaspace `prepend_scheme` dưới dạng metadata GGUF. ([b11819](https://github.com/ggml-org/llama.cpp/pull/23343))
- **Sửa tokenization Nemotron-3.5-Embed** — thiếu chuẩn hóa `U+200C` sau `[`/`<`; đã merge qua [#30974](https://github.com/ggml-org/llama.cpp/pull/30974). Lưu ý bug đang mở liên quan [#30894](https://github.com/ggml-org/llama.cpp/issues/30894) nơi GGUF Nemotron 3/3.5 bị gắn nhãn sai thành `pixtral` với pre-tokenizer sai.
- **OpenCL**: depthwise conv2d cho Adreno ([b11827](https://github.com/ggml-org/llama.cpp/pull/30900)), hỗ trợ `q2_k` bước đầu ([#30999](https://github.com/ggml-org/llama.cpp/pull/30999)).
- **Hexagon (Snapdragon)**: `CONV2D` ([#30995](https://github.com/ggml-org/llama.cpp/pull/30995)), `SGN` ([#30346](https://github.com/ggml-org/llama.cpp/pull/30346)), `CEIL` ([#31006](https://github.com/ggml-org/llama.cpp/pull/31006)), cùng với refactor op-fusion ([#30843](https://github.com/ggml-org/llama.cpp/pull/30843)).
- **SYCL**: refactor `mul_mat_vec_q` đa cột Intel XMX cho K-quant/Q8_0 đã sắp xếp lại (2–80 cột activation qua int8 DPAS/ESIMD). ([b11821](https://github.com/ggml-org/llama.cpp/pull/29864))
- **Đề xuất kiểu lượng tử hóa mới**: `GGML_TYPE_BF16X` (type 43) — nén lại bf16 gần như không mất mát ở 11.5 bpw, nhỏ hơn ~1.39 lần so với BF16. ([#29896](https://github.com/ggml-org/llama.cpp/pull/29896))

---

## 4. Hiệu năng & Tối ưu hóa

- **`-sm tensor` trên SYCL**: viết lại `ggml_sycl_comm_exchange()` cho kết quả **+16.7% đến +20.6% (trung bình ≈ +19%) prompt eval** trên dual Arc Pro B70, không thay đổi PPL — thu hẹp khoảng cách với `-sm layer`. ([#30956](https://github.com/ggml-org/llama.cpp/pull/30956))
- **SYCL FlashAttention-MKL**: thay bốn host wait bằng dependency tường minh; **cải thiện ~4%** trên B70 và là điều kiện tiên quyết cho SYCL graph replay. ([#30684](https://github.com/ggml-org/llama.cpp/pull/30684))
- **SYCL graph record/replay**: tương đương CUDA-graph đã có cho SYCL; cần sắp xếp lại dữ liệu trước khi ghi do treo async-alloc. ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725))
- **Tối ưu input GLM5**: tránh input `sel_mask_2d` và `new_pool_flat`. ([b11823](https://github.com/ggml-org/llama.cpp/pull/30932))
- **GLM5-Next QSA không cần `kq_mask`** — tiết kiệm **2 GB GPU/host ở ub 4096, 4 GB ở ub 8192**, có thể cấp lại cho expert cache hoặc context. ([#31009](https://github.com/ggml-org/llama.cpp/pull/31009))
- **MoE expert caching (đang thực hiện, hai hướng tiếp cận cạnh tranh)**:
  - `llama_moe_cache`: chạy expert bị miss trên CPU, điều chỉnh qua `--moe-cache-cpu-share`. ([#30966](https://github.com/ggml-org/llama.cpp/pull/30966))
  - LRU cache nằm trên GPU cho expert bị offload sang host (quyết định cache được nhúng trong graph). ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861))
- **`--act-type {f32,f16}` mới** (`llama-bench -at`, `LLAMA_ARG_ACT_TYPE`) — giữ activation ở F16 xuyên suốt cho các accelerator bị giới hạn băng thông. Mặc định f32. ([#31011](https://github.com/ggml-org/llama.cpp/pull/31011))
- **Tối ưu split-K large-tile Vulkan cho RDNA3/4** đang được xem xét. ([#30280](https://github.com/ggml-org/llama.cpp/pull/30280))
- **Sửa tràn fp16 CUDA MMVQ**: phép nhân scale Q4_1/Q5_1/Q8_1 được chuyển sang fp32 ở nơi `m*s` có thể vượt max fp16 (~65504). ([#31019](https://github.com/ggml-org/llama.cpp/pull/31019))

---

## 5. Ổn định & Hồi quy

Xếp theo mức độ nghiêm trọng:

1. **RPC `GRAPH_COMPUTE` đọc/ghi tùy ý trước xác thực** — descriptor `rpc_tensor` được tạo thủ công bỏ qua kiểm tra trong `deserialize_tensor()`; `view_offs` không được kiểm tra. PR sửa [#31017](https://github.com/ggml-org/llama.cpp/pull/31017) / [#31018](https://github.com/ggml-org/llama.cpp/pull/31018) — **cả hai chưa được merge**. Hãy coi listener RPC là mạng không tin cậy cho đến khi được vá.
2. **FlashAttention hỏng ngữ cảnh dài trên AMD RDNA4 (gfx1201)**, head_dim 256 (Qwen3.8-27B): logits prefill bị hỏng → EOS tự tin cao ngay lập tức. ([#30884](https://github.com/ggml-org/llama.cpp/issues/30884))
3. **SYCL F16 xuất NaN** trên Qwen3.8-27B Q4_K_M dense kể từ [#29107](https://github.com/ggml-org/llama.cpp/pull/29107) (sắp xếp lại code IQ3); tắt fused GEMM là cách workaround. Arc Pro B70. ([#30892](https://github.com/ggml-org/llama.cpp/issues/30892))
4. **Qwen3.8-27B decode sụp ~25x** ở ngữ cảnh >~80K trên CUDA, xử lý prompt không bị ảnh hưởng. ([#27623](https://github.com/ggml-org/llama.cpp/issues/27623))
5. **SYCL DeltaNet "token soup"** trên prompt dài với Qwen3.6/3.8 và Nemotron. ([#29183](https://github.com/ggml-org/llama.cpp/issues/29183), [#29167](https://github.com/ggml-org/llama.cpp/issues/29167))
6. **Metal MUL_MAT abort** với BF16 src1 ở K≥64, batch>8 (không có kernel `mul_mm` BF16). ([#30973](https://github.com/ggml-org/llama.cpp/issues/30973))
7. **Vulkan DFlash/MTP speculative phát token id ngoài biên == n_vocab** trên gfx1150. ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158))
8. **RPC DeepSeek V4 lặp thoái hóa** với 2 worker sau prompt dài; slot vẫn bị hỏng. ([#30794](https://github.com/ggml-org/llama.cpp/issues/30794))
9. **`llama_detokenize` cắt quá nhiều khoảng trắng** trước `! ? . ,` và `'s`/`'re` với vocab lớp Gemma 4 so với tham chiếu HF — khoảng cách đúng đắn hiển thị ở output. ([#30905](https://github.com/ggml-org/llama.cpp/issues/30905))
10. **WebUI injection chỉ thị qua `?q=`** (bảo mật, mức thấp, vẫn mở). ([#25790](https://github.com/ggml-org/llama.cpp/issues/25790))
11. **Ghim `id_slot` vào slot rỗng bỏ qua prompt cache.** ([#28139](https://github.com/ggml-org/llama.cpp/issues/28139))
12. **Build SYCL vỡ** do #28725 — đang chờ sửa. ([#31014](https://github.com/ggml-org/llama.cpp/pull/31014))

Suy giảm ngữ cảnh dài trên kiến trúc hybrid Gated DeltaNet giờ là chủ đề lặp lại chiếm ưu thế; nếu bạn phục vụ model lớp Qwen3.8 trên ngữ cảnh ~64K trở lên, hãy ghim một bản phát hành đã biết tốt và kiểm thử trên đúng backend của bạn.

---

## 6. Điều này có nghĩa gì với nhà phát triển ứng dụng

- **Nếu bạn mở RPC `llama-server` qua bất kỳ ranh giới tin cậy nào, hãy vá trước khi triển khai.** Lỗ hổng kiểm tra descriptor `GRAPH_COMPUTE` cho phép truy cập bộ nhớ tùy ý trước xác thực. PR sửa đã có nhưng chưa merge tính đến hôm nay.
- **Pipeline realtime/audio**: kiểm tra client của bạn với semantics `complete` mới của b11828 — đừng giả định `complete` kích hoạt khi stream idle.
- **Dịch vụ RAG và rerank**: b11818/b11829 thêm input rerank đa phương thức có kiểu và sửa placeholder template. Nếu bạn duy trì fork của template rerank, hãy diff với upstream.
- **Agent dùng ngữ cảnh nặng (>64K)**: model hybrid/DeltaNet (Qwen3.8-27B, Nemotron) cho thấy decode sụp hoặc hỏng tùy backend. Hãy benchmark tổ hợp cụ thể (model, quant, backend, context) của bạn thay vì tin số liệu từ một nhà cung cấp.
- **Phục vụ MoE bị giới hạn bộ nhớ**: hai nỗ lực expert-cache (#30966 đường CPU-miss, #27861 GPU-LRU) cộng với `--act-type f16` và loại bỏ mask QSA GLM5 (tiết kiệm 2–4 GB) là những đòn bẩy đáng theo dõi nhất để giảm chi phí trên mỗi token.
- **Lượng tử hóa**: `q2_k` trên OpenCL và đề xuất BF16X (11.5 bpw, ~1.39x so với BF16) đáng đánh giá cho triển khai edge/bị giới hạn băng thông, nhưng cả hai chưa phải mặc định ổn định.

---

Quy tắc:
- Chỉ xuất bản dịch. Không mở đầu, không giải thích, không rào markdown quanh toàn bộ output.
- Giữ nguyên cấu trúc Markdown: tiêu đề, bảng (bao gồm hàng căn chỉnh cột), danh sách, blockquote, in đậm/nghiêng, đường kẻ ngang, emoji.
- Giữ nguyên URL, link target, code span, code block, số và ngày.
- Giữ tên dự án, slug repository, username, tag phiên bản, đường dẫn file và định danh API/config ở dạng gốc — không dịch.
- Tham chiếu issue/PR như #12345 và text link giữ nguyên.
- Dùng tiếng Việt tự nhiên, văn phong bản tin nhà phát triển Việt Nam — rõ ràng và trực tiếp, không dịch từng chữ.
- Ưu tiên từ đơn giản và câu ngắn. Nêu rõ cái gì thay đổi và để làm gì khi nguồn cung cấp đủ thông tin. Không thêm sự kiện, so sánh phiên bản hay lợi ích không có trong nguồn.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới nào trong 24 giờ qua, nhưng hoạt động PR rất sôi động ở mảng hỗ trợ model và tính đúng đắn của API. Những mục quan trọng nhất là hai PR MLX bổ sung **Nemotron 3.5 Bolt 74B-A9B** và **YaRN RoPE scaling cho Qwen3/Qwen3.5** ([#19229](https://github.com/ollama/ollama/pull/19229), [#19231](https://github.com/ollama/ollama/pull/19231)), cùng một loạt bản sửa lỗi tương thích OpenAI/Anthropic cho lỗi streaming, xử lý developer-role và phân tích tool-call. Về mặt ổn định, một báo cáo mới về **suy giảm thông lượng ~30× trên AMD RADV/Vulkan khi bật prompt cache** ([#19201](https://github.com/ollama/ollama/issues/19201)) và hệ quả kéo dài từ các hồi quy MLX và Windows HTTP-reset của phiên bản 0.40.x đang chi phối issue tracker.

## 2. Bản phát hành & Thay đổi gây breaking

Không có bản phát hành nào trong 24h qua. Hai thay đổi liên quan đến tương thích đang trong tiến trình:

- **Các harness của `ollama launch` giờ đây tiêu thụ metadata cloud model** (context window, thinking levels, capabilities) thông qua [PR #19223](https://github.com/ollama/ollama/pull/19223) (đã merge/đóng) — Codex trước đây mặc định context 128k cho các model chưa được lập bảng; `glm-5.2` giờ báo cáo đúng 1.048.576.
- **Việc từ chối tham số `typical_p`** ([#18480](https://github.com/ollama/ollama/issues/18480), đã đóng) vẫn là một breaking change đối với người dùng Python API đang chuyển từ các client cũ hơn.

## 3. Hỗ trợ Model & Phần cứng mới

- **Nemotron 3.5 Bolt 74B-A9B (MLX)** — [PR #19229](https://github.com/ollama/ollama/pull/19229): cấu hình expert theo từng layer, giải mã suy đoán LiLiCorr qua DFlash runner, import affine **3-bit** đã lượng tử hóa sẵn với metadata lượng tử hóa theo từng module và xếp chồng expert độ chính xác hỗn hợp.
- **YaRN scaling cho Qwen3 / Qwen3.5 (MLX)** — [PR #19231](https://github.com/ollama/ollama/pull/19231): tuân thủ metadata RoPE scaling được chỉ định rõ ràng, áp dụng tần số/biên độ YaRN cho văn bản và mRoPE, giữ nguyên các chiều không quay. Sửa các báo cáo long-context thuộc loạt #182xx.
- **Checkpoint GA Gradium Phonon** — [PR #19227](https://github.com/ollama/ollama/pull/19227) (đã đóng): thay thế đường dẫn checkpoint prerelease bằng định dạng GA, thêm import giọng mặc định và điều kiện hóa giọng nói; yêu cầu tối thiểu **0.40.9** và từ chối checkpoint cũ.
- **Phân tích tool của Qwen3-Coder** — [PR #19228](https://github.com/ollama/ollama/pull/19228): escape văn bản `</function>` nguyên văn bên trong giá trị tham số để việc giải mã XML không còn hủy bỏ lệnh gọi.
- **Phục hồi tool-call của Gemma 4** — [PR #19226](https://github.com/ollama/ollama/pull/19226): phục hồi các đối tượng tham số hoàn chỉnh theo sau bởi nhiễu dư thừa (ví dụ `$$`).
- **DeepSeek-V4.1-Flash-1017 (cloud)** — [#19079](https://github.com/ollama/ollama/issues/19079) (đã đóng).

## 4. Hiệu năng & Tối ưu hóa

- **Hồi quy prompt-cache trên AMD RADV (Vulkan)** — [#19201](https://github.com/ollama/ollama/issues/19201): Ollama **0.40.8** trên RX 6600 XT cho thấy **thông lượng sinh giảm ~29,7×** ở *yêu cầu giống hệt thứ hai* khi bật prompt cache host-memory đi kèm của llama.cpp; model vẫn được offload hoàn toàn lên GPU. Chưa có PR sửa lỗi.
- **MLX prefill bị treo dưới tải single-slot** — [#18505](https://github.com/ollama/ollama/issues/18505) (đã đóng): các yêu cầu NVFP4 được chấp nhận có thể treo ở `processed=total-1` hàng phút; chỉ có SIGTERM trên runner mới khôi phục được. Giờ đã đóng — hãy kiểm tra lại với bản 0.40.x bạn đang ghim.
- **Giới hạn token động `num_predict == -2`** — [PR #9547](https://github.com/ollama/ollama/pull/9547) (vẫn mở): cho phép sinh lấp đầy bộ đệm context một cách động thay vì giới hạn tĩnh hoặc sinh không giới hạn, tương tự llama.cpp.
- **Flash attention bị buộc tắt cho Grok** — [PR #15050](https://github.com/ollama/ollama/pull/15050) (đã đóng): tránh crash runner khi bật lượng tử hóa KV cache, khớp với hành vi của llama.cpp thượng nguồn.
- **Đề xuất framework KV connector** — [#17696](https://github.com/ollama/ollama/issues/17696): các backend KV cache bên ngoài có thể cắm được (LMCache và cộng sự), phạm vi ban đầu là framework + lifecycle hooks.

## 5. Ổn định & Hồi quy

Xếp theo mức độ nghiêm trọng:

1. **Suy giảm thông lượng ~30× trên Vulkan/RADV với prompt cache** — [#19201](https://github.com/ollama/ollama/issues/19201) (mở, 0.40.8). Tái lập được; chặn inference AMD Linux trong production. **Chưa có PR sửa lỗi.**
2. **Windows HTTP connection reset trong quá trình inference** — [#19139](https://github.com/ollama/ollama/issues/19139) và [#19113](https://github.com/ollama/ollama/issues/19113) (mở, 0.40.4): reset ở khoảng ~15 giây với prompt lớn, và thỉnh thoảng xảy ra ngay cả khi bỏ qua Ollama API và gọi trực tiếp `llama-server`. Gợi ý một vấn đề transport ở tầng thấp hơn.
3. **Tỷ lệ thất bại 95% của Cloud Pro** — [#15453](https://github.com/ollama/ollama/issues/15453) (mở từ tháng Tư, 55 bình luận, 22 👍): vấn đề độ tin cậy kéo dài, chưa giải quyết trên `glm-5.1:cloud`, `kimi-k2.5:cloud`, `qwen3.5:cloud`, `deepseek-v3.2` v.v. Chưa ghi nhận biện pháp khắc phục.
4. **GLM-5.3-Flash cloud suy thoái từ 10-12** — [#18980](https://github.com/ollama/ollama/issues/18980) (mở, 31 bình luận): 5–8% yêu cầu tạo ra output suy thoái. Bằng chứng phía client chỉ ra sự hỏng dữ liệu phía host ("toàn số không" trong ảnh probe).
5. **Stream `/v1/responses` đóng mà không có sự kiện kết thúc** — [PR #19225](https://github.com/ollama/ollama/pull/19225) (đã đóng): các lỗi sau khi streaming bắt đầu bị nuốt thành EOF; bản sửa phát ra sự kiện `response.failed` đúng cách. Liên quan đến mọi client agent streaming.
6. **Gọi một tool không xác định âm thầm trả về phản hồi rỗng** — [#19187](https://github.com/ollama/ollama/issues/19187) (mở, 0.40.4–0.40.7): `qwen3:8b` trả về `eval_count > 0` mà không có nội dung khi model gọi tên một function không có trong `tools`. Nguy hiểm cho các vòng lặp agent.
7. **`OLLAMA_CONTEXT_LENGTH` không được phản ánh trong `/api/show` / `/api/tags`** — [#18995](https://github.com/ollama/ollama/issues/18995) (mở): context thực tế khác với quảng cáo, các công cụ ước tính kích thước prompt dựa trên các endpoint này sẽ hoạt động sai.
8. **Model eviction bị hủy bởi `keep_alive`; yêu cầu đang chờ bị treo** — [#19182](https://github.com/ollama/ollama/issues/19182) (mở, 0.40.2/0.40.7): với `OLLAMA_MAX_LOADED_MODELS=1`, một eviction đang chờ bị hủy khi yêu cầu của model thường trú mang `keep_alive`; yêu cầu đã xếp hàng sau đó phải chờ hết cửa sổ keep-alive.
9. **MLX panic "Maximum threads" trên 0.40.0** — [#18846](https://github.com/ollama/ollama/issues/18846) (đã đóng): `mlx: Maximum threads per threadgroup is 896 but requested 1024` sau khoảng ~1 phút; hạ cấp về 0.35.1 sẽ tránh được. Bản sửa đã vào — hãy nâng cấp vượt qua 0.40.0.
10. **CVE trong Go toolchain của binary** — [#19162](https://github.com/ollama/ollama/issues/19162) và [#16033](https://github.com/ollama/ollama/issues/16033) (đã đóng): 1 phát hiện CRITICAL / 11 HIGH; cần rebuild với **Go 1.26.9+**. Nếu bạn phân phối lại binary Ollama, hãy quét lại bản build của mình.
11. **Assertion SWA của `llama-server` trên `rnj-1`** — [#18924](https://github.com/ollama/ollama/issues/18924) (đã đóng): lỗi `GGML_ASSERT(hparams.is_swa_any())` từ 0.3x; đã được giải quyết.
12. **Mục model trùng lặp sau khi migrate GGUF compat cục bộ** — [#18830](https://github.com/ollama/ollama/issues/18830) (đã đóng, 0.40.0, macOS). Chỉ là vấn đề hình thức nhưng gây nhầm lẫn cho các công cụ liệt kê model.

## 6. Điều này có nghĩa gì với nhà phát triển ứng dụng

- **Ghim vào các phiên bản đã được kiểm chứng theo từng nền tảng.** 0.40.0 là một quả mìn đối với MLX (thread panic, [#18846](https://github.com/ollama/ollama/issues/18846)) và 0.40.8 đối với AMD Vulkan ([#19201](https://github.com/ollama/ollama/issues/19201)). Nếu bạn đang dùng AMD Linux, hãy tắt prompt caching cho đến khi vấn đề được giải quyết.
- **Đừng tin `eval_count` như một tín hiệu thành công.** [#19187](https://github.com/ollama/ollama/issues/19187) cho thấy các bộ đếm trông có vẻ hợp lệ nhưng nội dung rỗng khi model bịa ra tên tool không có trong `tools`. Hãy kiểm tra phản hồi với schema tool của bạn trước khi dispatch.
- **Các sự kiện kết thúc streaming giờ đã đúng** với [PR #19225](https://github.com/ollama/ollama/pull/19225) — nếu bạn phân tích các stream `/v1/responses`, hãy chuyển sang xử lý `response.failed` thay vì dựa vào EOF.
- **Thông điệp developer-role đang trở thành first-class** — [PR #19199](https://github.com/ollama/ollama/pull/19199) giữ nguyên các role `system/developer` qua quá trình rendering, cắt ngắn và replay nén cho Qwen3-Coder, Cogito và Olmo. Nếu bạn đang port các client thuộc lớp Codex, điều này lấp một khoảng trống thực sự.
- **Việc introspection độ dài context hiện không đáng tin** ([#18995](https://github.com/ollama/ollama/issues/18995)). Hãy tự tính ngân sách của bạn từ `OLLAMA_CONTEXT_LENGTH` thay vì đọc `/api/show`.
- **Độ tin cậy của cloud vẫn là một rủi ro phụ thuộc cứng.** [#15453](https://github.com/ollama/ollama/issues/15453) và [#18980](https://github.com/ollama/ollama/issues/18980) cho thấy các lỗi phía cloud kéo dài, chưa được giải quyết. Nếu bạn đang xây dựng trên các model `:cloud`, hãy triển khai retry phía client, kiểm tra chất lượng output và một đường dự phòng cục bộ.
- **Các workload Qwen3 long-context trên MLX** sẽ được hưởng lợi đáng kể một khi [PR #19231](https://github.com/ollama/ollama/pull/19231) được merge — trước đây YaRN bị bỏ qua, âm thầm cắt ngắn context hiệu dụng.

---

Quy tắc:
- Chỉ xuất bản bản dịch. Không có phần mở đầu, không giải thích, không có hàng rào markdown bao quanh toàn bộ output.
- Giữ nguyên cấu trúc Markdown một cách chính xác: tiêu đề, bảng (bao gồm cả hàng căn chỉnh cột), danh sách, blockquote, in đậm/in nghiêng, đường kẻ ngang, emoji.
- Giữ nguyên URL, link target, code span, code block, số và ngày tháng.
- Giữ nguyên tên dự án, slug repository, tên người dùng, tag phiên bản, đường dẫn file và các định danh API/config ở dạng gốc — không dịch chúng.
- Các tham chiếu Issue/PR như #12345 và văn bản liên kết của chúng giữ nguyên như gốc.
- Sử dụng tiếng Việt tự nhiên, theo văn phong bản tin dành cho nhà phát triển Việt Nam — rõ ràng và trực tiếp, không dịch từng chữ.
- Ưu tiên từ ngữ đơn giản và câu ngắn. Nêu rõ điều gì đã thay đổi và nó dùng để làm gì khi nguồn cung cấp đủ thông tin. Không thêm dữ kiện, so sánh phiên bản hay lợi ích không có trong nguồn.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

LiteLLM vẫn đang trong chế độ khắc phục sự cố sau khi phát hiện rằng **v1.107.0 được phát hành từ một repo giả mạo (`Berri-AI/litellm`) chứa trình đánh cắp thông tin xác thực và trình tải RCE** — bản phát hành này đã bị gỡ khỏi PyPI, và các Docker tag trên cả `ghcr.io` lẫn `docker.io` đã được trỏ lại khỏi image bị xâm phạm. Chủ đề mở nóng nhất (#47826, 25 bình luận, 19 👍) là cộng đồng đang phối hợp đánh giá phạm vi ảnh hưởng và khôi phục; một issue tiếp theo (#47904) yêu cầu backport bản sửa root CA eMudhra sang `stable/1.106.x`, ngụ ý rằng các image 1.106.x vẫn tin cậy một root mà chuỗi cung ứng bị xâm phạm đã móc nối vào. Không có bản phát hành mới nào trong 24h qua, điều này không bất ngờ given việc yank và đóng băng.

---

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

**Không có bản phát hành mới trong 24h qua.** Tuy nhiên, các operator nên coi những điều sau là thay đổi phá vỡ tương thích đang hoạt động:

- **v1.107.0 đã bị gỡ và không an toàn.** Mục trên PyPI đã bị xóa; các Docker tag `latest`, `main-latest`, `main-stable` trên `ghcr.io/berriai/litellm{,-database,-non_root}` và `docker.io/litellm/litellm` không còn trỏ đến image độc hại. Nếu bạn đã pull các tag này giữa thời điểm phát hành 1.107.0 và lúc yank, hãy coi như đã bị xâm phạm — xoay vòng toàn bộ provider key, thông tin xác thực DB, và mọi secret có thể truy cập được từ container.
  https://github.com/BerriAI/litellm/issues/47826
- **Yêu cầu backport cho `stable/1.106.x`.** Issue #47904 yêu cầu bản sửa eMudhra CA (#47670) được phát hành dưới dạng v1.106.3 — các image 1.106.x hiện tại vẫn tin cậy `emSign ECC Root CA - G3`. Các team đang ghim vào 1.106.x không nên cho rằng mình sạch khỏi cùng nguy cơ chuỗi tin cậy đó.
  https://github.com/BerriAI/litellm/issues/47904
- **Thay đổi nguồn thông báo nâng cấp (PR #47998).** Chuông trên Admin UI sẽ đọc phiên bản/link từ changelog tài liệu thay vì "latest release" của GitHub, để tránh trỏ admin đến những bản phát hành chưa được công bố. Chỉ là thay đổi giao diện, nhưng đáng biết nếu team bạn dựa vào banner.
  https://github.com/BerriAI/litellm/pull/47998

**Việc cần làm cho bất kỳ ai đang dùng 1.107.0 hoặc vừa pull `latest`:**
1. Ghim vào digest đã biết là tốt, không dùng tag động.
2. Kiểm tra các cuộc gọi ra ngoài từ mọi container đã chạy image để tìm dấu vết `cook.pth` / `sitecustomize`.
3. Xoay vòng secret; coi như thông tin xác thực đã bị đánh cắp.

---

## 3. Hỗ trợ Model & Phần cứng mới

- **Đã thêm provider Foundry Local (PR #47713)** trên SDK 2.2.1 — cho phép định tuyến đến các model Foundry chạy cục bộ.
  https://github.com/BerriAI/litellm/pull/47713
- **Hỗ trợ DashScope realtime WebSocket (PR #40579)** — thêm handler `DashScopeRealtime` dựa trên handler realtime OpenAI dùng chung, xử lý định dạng `session.update` phẳng của DashScope và các khác biệt trong handshake. Mở đường cho việc triển khai realtime dòng Qwen.
  https://github.com/BerriAI/litellm/pull/40579
- **OpenAI `image detail: "original"` chưa được chấp nhận** — `token_counter` từ chối giá trị này dù OpenAI đã phát hành và Azure Responses có liệt kê. Bug #47327 (5 bình luận) theo dõi việc kiểm tra trước cuộc gọi âm thầm hạ xuống log ERROR.
  https://github.com/BerriAI/litellm/issues/47327
- **Thread yêu cầu model/provider từ cộng đồng (#18686)** vẫn là nơi chính thức để đề xuất tích hợp.
  https://github.com/BerriAI/litellm/issues/18686

---

## 4. Hiệu năng & Tối ưu hóa

- **Định tuyến dựa trên độ trễ suy giảm thành chọn ngẫu nhiên (issue #24720).** Một race lost-update trong `async_log_success_event` làm hỏng tín hiệu độ trễ dưới tải đồng thời (16 key Anthropic + 4 key OpenAI), biến router thành công cụ chọn ngẫu nhiên có trọng số. Chưa có PR sửa nào được liên kết. Đây là issue về tính đúng đắn/hiệu năng có ảnh hưởng lớn nhất trên bảng đối với bất kỳ ai dựa vào định tuyến theo độ trễ.
  https://github.com/BerriAI/litellm/issues/24720
- **Nuốt body lỗi từ upstream không giới hạn (issue #34031).** Một body HTTP 400 khoảng 114 MB từ backend tương thích OpenAI khiến proxy đọc toàn bộ payload, chạy regex masking trên đó, và làm nghẽn event loop / phình RSS. Chưa có giới hạn kích thước nào được áp dụng. Bản sửa rất đơn giản (giới hạn vài trăm KB) và đáng vá cục bộ nếu bạn nằm sau upstream tương thích OpenAI dễ tạo ra các dump validation khổng lồ.
  https://github.com/BerriAI/litellm/issues/34031
- **Router bỏ qua `Retry-After` cho nhóm model nhiều deployment (issue #34399).** `Router._time_to_sleep_before_retry` chỉ tôn trọng header khi nhóm chỉ có một deployment; nếu không thì nó retry ngay lập tức vào upstream đang bị rate-limit, làm trầm trọng thêm các 429.
  https://github.com/BerriAI/litellm/issues/34399
- **Bedrock SigV4 replay (issue #27513).** Khi retry/fallback, các header `Authorization` cũ từ request trước có thể bị áp dụng lại sau khi ký.
  https://github.com/BerriAI/litellm/issues/27513
- **Stream Google GenAI bị ngắt trước event đầu tiên không được retry (PR #45750).** Gemini `:streamGenerateContent` trả 200 rồi ngắt được biểu hiện như một frame lỗi trong stream và bỏ qua `num_retries`.
  https://github.com/BerriAI/litellm/pull/45750
- **Streaming Gemini/Gemma-4-31B làm mất `tool_use.input` (issue #25390, đã đóng).** Non-streaming hoạt động; streaming cắt cụt payload của tool. Đáng kiểm tra trong phiên bản của bạn — nó được đánh dấu stale, nên hãy xác nhận bản sửa có trong build đã ghim của bạn.
  https://github.com/BerriAI/litellm/issues/25390

---

## 5. Ổn định & Hồi quy

Xếp hạng theo mức độ nghiêm trọng:

**Nghiêm trọng — chuỗi cung ứng / RCE**
- **#47826** — v1.107.0 bị xâm phạm: trình đánh cắp thông tin xác thực (`cook.pth`) + trình tải RCE `sitecustomize`, phát hành từ repo giả mạo. Đã xóa khỏi PyPI; Docker tag đã bị yank. **Coi mọi host đã chạy 1.107.0 là đã bị xâm phạm.**
  https://github.com/BerriAI/litellm/issues/47826
- **#47904** — Yêu cầu backport bản sửa root CA eMudhra sang `stable/1.106.x`; các image 1.106.x vẫn tin cậy root bị xâm phạm nhưng chưa bị gỡ.
  https://github.com/BerriAI/litellm/issues/47904

**Cao — auth / lộ dữ liệu**
- **#34217** — `POST /team/delete` xóa virtual key khỏi DB nhưng **không** trục xuất chúng khỏi auth cache; key đã xóa vẫn hợp lệ cho đến khi cache hết hạn. `/key/delete` có xóa cache — đường dẫn team bị bỏ sót.
  https://github.com/BerriAI/litellm/issues/34217
- **#34479** — Cạn kiệt `max_connections` của Postgres trong triển khai nhiều worker khiến **toàn bộ** API key của người dùng thất bại, không chỉ những key bị quá tải.
  https://github.com/BerriAI/litellm/issues/34479
- **#26231** — Xác minh license trong mạng airgap bị hỏng khi payload chứa `.` (ví dụ `user_id` giống domain) vì `_verify_license_str` tách theo byte `.` đầu tiên.
  https://github.com/BerriAI/litellm/issues/26231

**Cao — tính đúng đắn của định tuyến / chi tiêu**
- **#24720** — Race định tuyến theo độ trễ → chọn ngẫu nhiên.
- **#34399** — `Retry-After` bị bỏ qua cho nhóm nhiều deployment → bão retry tức thì.
- **#30081** — `input_cost_per_token: 0` ở cấp deployment bị âm thầm bỏ qua sau khi reload model-cost-map; giá theo request ghi đè các mục `model_cost` chuẩn. Ảnh hưởng đến các route BYOK/wildcard nơi bạn cố ý đặt giá bằng không.
  https://github.com/BerriAI/litellm/issues/30081
- **#47675** — `response_cost` là null và spend vẫn là $0 khi `custom_llm_provider=anthropic` và dòng giá nằm dưới provider khác.
  https://github.com/BerriAI/litellm/issues/47675
- **#39057** — Câu hỏi ngữ nghĩa: khi cache hit, spend bị đặt về 0 nhưng các cột token phát lại usage gốc — báo cáo token nên tổng hợp theo cơ sở nào? Chưa có quyết định; việc đối soát hóa đơn bị ảnh hưởng.
  https://github.com/BerriAI/litellm/issues/39057

**Trung bình — Claude Code / adapter Anthropic**
- **#26224** — `auto_router/complexity_router` từ chối `thinking.type=adaptive`.
- **#26241** — Adapter Anthropic → Responses bỏ qua `litellm.drop_params` khi ánh xạ `metadata.user_id` → `user`, làm hỏng các gateway `/responses` nghiêm ngặt.
- **#26214** — Model Azure qua LiteLLM trong Claude Cowork (5 👍).
- **#27091** — Claude Code + Microsoft Foundry: `reasoning.effort` không được hỗ trợ và lỗi validation Pydantic của Anthropic.
- **#26252** — `websearch_interception` không kích hoạt cho Claude Code + Bedrock pass-through; bản sửa được đề xuất (#25242) đưa vào một skip Bedrock mới lại làm hỏng nó lần nữa.

**Trung bình — proxy / hạ tầng**
- **#26237** — Sự cố Postgres/HAProxy tạm thời → các model hợp lệ thất bại với "Invalid model name."
- **#30118** (đã đóng) — Đăng nhập UI bị chuyển hướng đến IP Docker nội bộ sau nginx sau khi nâng cấp lên 1.88.x.

**Thấp — UI / tài liệu**
- **#24734** — Báo sai "guardrails feature unavailable" khi sửa các key không liên quan.
- **#19334** — Azure AI Foundry FLUX-1.1-pro và FLUX.1-Kontext-pro bị hỏng từ 1.80.15.
- **#14635** — `litellm.Timeout: ... after None seconds` — giá trị timeout không được đo, chỉ là vấn đề giao diện.

**Các bản sửa đang thực hiện đáng theo dõi:**
- **PR #45472** (đã đóng) — Khớp ID giá deployment với cost map chỉ trong provider của deployment; sửa nhóm bug "giá `model_info` rõ ràng tính $0" (trùng với #30081).
  https://github.com/BerriAI/litellm/pull/45472
- **PR #43668** — Sửa `_strip_prisma_query_params` làm rớt `host`, phá vỡ mọi triển khai Postgres qua Unix socket.
  https://github.com/BerriAI/litellm/pull/43668
- **PR #40092** — Chuyển đổi ngôn ngữ tiếng Trung cho đăng nhập/điều hướng.
- **PR #47999** — Dự trữ ngân sách trước mỗi lần gọi tool MCP tự động thực thi (hạch toán chi tiêu cho phí tool).
- **PR #48000** — Định giá/ủy quyền các vòng lặp model advisor riêng biệt với token của executor.
- **PR #41243** — Giữ nguyên `thinking.type=adaptive` và `output_config.effort` trên passthrough `/v1/messages` gốc.
- **PR #47789** — Xóa 1181 lỗi `Any` của basedpyright trên 431 file; QA chạy với OpenAI/Anthropic thật trả về phản hồi giống hệt. Cải thiện type-checking, không có thay đổi nào người dùng thấy được.
  https://github.com/BerriAI/litellm/pull/47789

---

## 6. Điều này có nghĩa gì với nhà phát triển ứng dụng

- **Xoay vòng secret ngay hôm nay nếu bạn đã đụng đến 1.107.0 hoặc một Docker tag động.** Coi container đã bị xâm phạm hoàn toàn: provider API key, thông tin xác thực DB, `LITELLM_MASTER_KEY`, mọi secret được mount. Từ giờ hãy chạy từ image ghim theo digest, và thêm chính sách rằng production pull digest, không pull tag.
- **Đừng tin ngữ nghĩa "latest" trong hệ sinh thái này lúc này.** Vụ xâm phạm thành công vì `latest`/`main-stable` trỏ vào build độc hại. Nếu pipeline CI của bạn deploy theo tag, hãy thêm phê duyệt thủ công hoặc ghim digest trước chu kỳ phát hành tiếp theo.
- **Key của team đã xóa vẫn có thể xác thực được.** Nếu nền tảng agent của bạn phát virtual key theo team và bạn dựa vào

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành nào trong 24 giờ qua, nhưng hàng đợi PR đang khá sôi động với một đợt **tái cấu trúc Studio UI radius-scale** phối hợp quy mô lớn (8 PR xếp chồng), công việc **phục vụ RPC đa máy** tiếp tục được đẩy mạnh (`#13726`, `#14274`), và một bản sửa trúng đích cho **lỗi Mac Metal OOM khi tải sidecar DeepSeek-V4.1-Flash DSpark** (`#14431`). Về mặt ổn định, một báo cáo AMD ROCm mới (`#14906`) cho thấy bản sửa cho `#7208` có thể đã gây ra **hồi quy CPU fallback âm thầm trên Linux native RDNA3**. Một số issue tồn đọng lâu nay đã đóng hôm nay, bao gồm lỗi đồng bộ model đa tài khoản qua LAN (`#12365`) và tình trạng tắc nghẽn load-path 76 giây của `get_statistics()` (`#14366`).

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

Không có gì trong 24 giờ qua. Không có migration API/config nào cần lưu ý.

## 3. Model & Phần cứng được hỗ trợ mới

- **Lỗi tải DeepSeek-V4.1-Flash-1017 GGUF** — `llama.cpp` từ chối kiến trúc `deepseek41-dspark`. Nhiều khả năng cần bump llama.cpp upstream. [#14695](https://github.com/unslothai/unsloth/issues/14695)
- **Context-parallel Qwen3.5 GatedDeltaNet** — vẫn chưa được hỗ trợ; FSDP2 không shard được các lớp hybrid recurrent. Đã đóng mà không có bản sửa nào. [#12051](https://github.com/unslothai/unsloth/issues/12051)
- **OmniVoice** yêu cầu full + LoRA finetune/inference cho Studio. [#14660](https://github.com/unslothai/unsloth/issues/14660)
- **Giới hạn kích thước chat template** — mức cap 64KB chặn các template DavidAU ~230KB; llama.cpp cho phép Jinja tới 8MB. [#14841](https://github.com/unslothai/unsloth/issues/14841)
- **ROCm / XPU / MPS** — hồi quy nhận diện GPU AMD RDNA3 (gfx1100) trên Linux native ([#14906](https://github.com/unslothai/unsloth/issues/14906)); LoRA inference Intel XPU trên Windows bị trộn tham số linker GNU/MSVC ([#14807](https://github.com/unslothai/unsloth/issues/14807)).
- **Tách expert MoE nóng/lạnh giữa GPU và CPU** được yêu cầu cho các model mới hơn. [#14484](https://github.com/unslothai/unsloth/issues/14484)
- **FP8 dequant dưới `torch.compile` trên pre-sm89** — Triton phát ra các lệnh load fp8e4nv không được hỗ trợ; bản sửa đã vào [#14913](https://github.com/unslothai/unsloth/pull/14913) (đã đóng, op giải mã byte không trong suốt).

## 4. Hiệu năng & Tối ưu hóa

- **Đã sửa tình trạng tắc nghẽn load-path `from_pretrained`** — kiểm tra liveness HuggingFace trong `get_statistics()` đang chặn load khoảng ~76 giây trên các máy qua proxy. Đã đóng hôm nay. [#14366](https://github.com/unslothai/unsloth/issues/14366)
- **Tái cấu trúc offload planner (đang review)** — `#9872` cân nhắc spill so với fitter của chính llama.cpp; đặt sau cờ `UNSLOTH_SMART_OFFLOAD` (opt-in). [#9872](https://github.com/unslothai/unsloth/pull/9872)
- **Khôi phục Metal OOM + đặt trước DSpark sidecar** — `#14431` đặt trước DSpark/DFlash sidecar trong `--fit-target` và khôi phục từ `kIOGPUCommandBufferCallbackErrorOutOfMemory` sau khi prefill thất bại. [#14431](https://github.com/unslothai/unsloth/pull/14431)
- **`checkpoint_skip_layers="auto"` dưới `torch.compile`** — planner không còn bị trace vào các vùng compile; sửa lỗi capture memory-query trong quá trình compile dynamic-shape. [#14928](https://github.com/unslothai/unsloth/pull/14928)
- **Sửa kernel FP8** — dequant per-tensor/rowwise trên pre-sm89 giờ đã compile được. [#14913](https://github.com/unslothai/unsloth/pull/14913)
- **Timestep sinusoid MOSS-Image** — timestep float64 được dựng trên CPU để tránh lệch device/backend. [#14929](https://github.com/unslothai/unsloth/pull/14929)
- **Khớp residency cho video** — khớp residency theo từng request cho denoise video streaming và HunyuanVideo-1.5. [#14865](https://github.com/unslothai/unsloth/pull/14865)
- **Áp lực pre-commit.ci** — `scripts/enforce_kwargs_spacing.py` chạy cực chậm trên CI; đã đóng. [#14174](https://github.com/unslothai/unsloth/issues/14174)

## 5. Ổn định & Hồi quy (xếp hạng)

1. **🔴 Hồi quy CPU fallback âm thầm trên ROCm (Linux native RDNA3)** — studio chèn `/opt/rocm/lib` vào trước khiến `llama-server` đi kèm không thấy GPU; nghi ngờ là hồi quy từ bản sửa `#7208`. Chưa có PR sửa. [#14906](https://github.com/unslothai/unsloth/issues/14906)
2. **🟠 Mac Metal OOM khi tải DSpark sidecar** — bản sửa đang review. [#14431](https://github.com/unslothai/unsloth/pull/14431)
3. **🟠 Tắc nghẽn trước inference trong chat dài** — embedding archive hội thoại trên CPU chặn llama.cpp; nút Stop không hủy được quá trình archive. Studio `v0.1.909-beta`. [#14519](https://github.com/unslothai/unsloth/issues/14519)
4. **🟠 Export GGUF thất bại với model remote-code** — `trust_remote_code` không được truyền khi export. PR sửa đang mở: [#14722](https://github.com/unslothai/unsloth/pull/14722). Issue: [#14688](https://github.com/unslothai/unsloth/issues/14688)
5. **🟠 Export Ling 3 Tiny GGUF thất bại** trên Windows / RTX 5060 Ti. [#14916](https://github.com/unslothai/unsloth/issues/14916)
6. **🟡 Lỗi tải DeepSeek-V4.1-Flash GGUF** — kiến trúc không được llama.cpp đi kèm nhận diện. [#14695](https://github.com/unslothai/unsloth/issues/14695)
7. **🟡 Sinh ảnh bỏ qua VRAM Budget** — đường đi diffusers planner bỏ qua thanh trượt; PR sửa đang mở. [#14816](https://github.com/unslothai/unsloth/pull/14816)
8. **🟡 LoRA inference Intel XPU trên Windows** — lệch tham số linker GNU/MSVC. [#14807](https://github.com/unslothai/unsloth/issues/14807)
9. **🟡 Lệch cờ direct-convolution của sd.cpp** — bản build sd.cpp được pin không còn mặc định tắt `--diffusion-conv-direct`; Studio giờ truyền `--conv-direct off` một cách tường minh. [#14859](https://github.com/unslothai/unsloth/pull/14859)
10. **🟡 Lemonade / FastFlowLM chat + models ngừng hoạt động** trên AMD Ryzen AI 7 350 / Ubuntu 26.10. [#14650](https://github.com/unslothai/unsloth/issues/14650)
11. **🟡 Mất đồng bộ model đa tài khoản qua LAN** — đã đóng hôm nay. [#12365](https://github.com/unslothai/unsloth/issues/12365)

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Độ trễ load:** Nếu bạn gọi `FastLanguageModel.from_pretrained` trong request path hoặc trên mạng qua proxy/offline, tình trạng tắc nghẽn 76 giây của `get_statistics()` đã hết — SLA cold-start tốt hơn nhiều.
- **Người dùng AMD Linux:** Đừng vội nâng cấp Studio nếu bạn phụ thuộc vào GPU inference trên RDNA3 — `#14906` là một hồi quy đang hoạt động. Giữ nguyên `LD_LIBRARY_PATH` / thiết lập ROCm hệ thống và theo dõi bản sửa.
- **Người dùng Apple Silicon với model MoE lớn:** Nếu bạn tải DSpark/DFlash sidecar (DeepSeek-V4.1-Flash), hãy đợi `#14431` land trước khi tăng `--parallel` hoặc `-c` — nếu không, một prefill thất bại sẽ đẩy llama-server vào trạng thái lỗi vĩnh viễn.
- **Model remote-code:** Nếu bạn finetune các model yêu cầu `trust_remote_code=True`, export GGUF/checkpoint từ UI hiện đang thất bại cho đến khi `#14722` merge. Cách vòng tránh: export qua Python API.
- **Inference đa máy sắp tới:** `#13726` (chia GGUF qua N máy bằng llama.cpp RPC) và `#14274` (ghép cặp mTLS trên LAN gia đình) đặt nền móng cho mở rộng ngang mà không cần phụ thuộc cloud. Đáng theo dõi nếu bạn muốn gom GPU tiêu dùng sau một endpoint.
- **`UNSLOTH_SMART_OFFLOAD`** vẫn là opt-in — không thay đổi hành vi trừ khi bạn bật, nhưng việc viết lại planner trong `#9872` là hướng đi cho việc dự trù VRAM tự động.
- **Người dùng headless/CI:** áp lực runtime pre-commit từ repo này đã được giải quyết; nếu bạn đã fork `enforce_kwargs_spacing.py`, hãy rebase. [#14174](https://github.com/unslothai/unsloth/issues/14174)

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*