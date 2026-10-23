# Bản tin hạ tầng AI 2026-10-23

> Tạo lúc: 2026-10-23 03:54 UTC | Dự án theo dõi: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## So sánh chéo dự án

# Báo cáo so sánh liên dự án — Hệ sinh thái hạ tầng AI
**Ngày tổng hợp: 2026-10-23**

---

## 1. Tổng quan hệ sinh thái

Bức tranh hạ tầng AI hôm nay được định hình không phải bởi các bản phát hành mới, mà bởi *việc gia cố tính đúng đắn dưới tải lớn*. Trên hai engine phục vụ chủ lực (vLLM và SGLang), các vấn đề nghiêm trọng nhất đều là lỗi hỏng dữ liệu âm thầm trong phục vụ phân tách (disaggregated serving) và các mô hình hybrid-attention — nhiễm bẩn KV trong PD disaggregation (#61160), tranh chấp hết hạn lease NIXL (#61229), và hỏng đồ thị a2a DCP của Kimi-K3 (#45367) — cho thấy phục vụ phân tán đã vượt xa bộ kiểm thử của nó. Trong khi đó, một **cuộc tấn công chuỗi cung ứng vào LiteLLM v1.107.0** (#47826) là sự kiện nghiêm trọng nhất toàn hệ sinh thái trong ngày, buộc tầng gateway phải đối mặt với việc ghim digest và kiểm soát đầu vào như điều kiện tiên quyết. Về phía mô hình, các kiến trúc hybrid (Gated DeltaNet, QSA, GLM-5.3-Flash, Qwen3.8-flash-next) giờ đây chiếm ưu thế trong các công việc mới và đồng thời là nguồn hồi quy lớn nhất trên CUDA, SYCL, ROCm và RDNA4. Bức tranh tổng thể: mở rộng năng lực nhanh chóng, nền tảng không vững ở ngữ cảnh dài và đa nút, và nhu cầu cấp thiết về các hợp đồng tính đúng đắn có tính xác định.

---

## 2. So sánh mức độ hoạt động

| Dự án | Tầng | Issue (hoạt động/đáng chú ý trong 24h) | PR (đã merge / đang xử lý) | Bản phát hành | Chủ đề chính |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~10+ (tracker hoạt động mạnh: #61160, #61229, #50576) | ~3 liên quan đã merge, ~6 PR sửa đang xử lý | **Không** (không có bản phát hành) | Tính đúng đắn của disaggregated serving, hỗ trợ SM8x/ROCm |
| **SGLang** | Serving engine | **49 issue được cập nhật trong 24h** (#42752 dẫn đầu về hoạt động) | AFD stack #45958 + nhiều PR sửa | **Không** | Hồi quy chu kỳ ổn định (Kimi-K3, GLM-5.3-Flash) |
| **llama.cpp** | Local runtime | ~9 hồi quy đang mở + 3 đã đóng | **~15 bản build (b11815–b11829)**, 10+ PR | **Liên tục (b11829)** | MoE expert caching, Intel Arc SYCL, mobile/edge |
| **Ollama** | Local runtime / cloud | ~16 hồi quy được xếp hạng (#15453 chiếm ưu thế) | ~8 PR sửa đã merge, hỗ trợ mô hình MLX | **Không** (0.40.8/0.40.9 hiện hành) | Độ tin cậy cloud, sửa parser tool-call |
| **LiteLLM** | Gateway | ~10+ (chuỗi cung ứng, DoS, xác thực) | ~5 bản sửa (#23924, #45750, #47789) | **Không** (1.107.0 đã bị thu hồi) | Ứng phó sự cố chuỗi cung ứng |
| **Unsloth** | Fine-tuning | ~10 được xếp hạng (#14513, #14519, #14708) | **~15+ PR** (loạt của danielhanchen) | **Không** (uv ghim 0.13.5) | Studio Flows stack, FP8 dequant, tính đúng đắn GRPO |

**Đọc bảng:** llama.cpp có nhịp phát hành cao nhất (mô hình build-theo-PR); SGLang có mức luân chuyển issue cao nhất; Unsloth có thông lượng PR dày đặc nhất trong một ngày. Chỉ LiteLLM gặp sự cố bảo mật buộc phải *thu hồi* một bản phát hành.

---

## 3. Cuộc đua hỗ trợ mô hình

**Ai đã ra mắt gì hôm nay:**

| Mô hình / Kiến trúc | vLLM | SGLang | llama.cpp | Ollama | Unsloth | Dẫn đầu |
|---|---|---|---|---|---|---|
| **DeepSeek-V4.1 / V4-Flash** | ⚠️ Đang tiến hành (SM8x bị chặn #50576; graph replay #63155) | ✅ Replay CP>1 #45954; AMD prefill CP #43465 | — | ✅ Danh mục cloud #19079 | ⚠️ **Không load được trong Studio** #14695 | **SGLang** |
| **GLM-5.3-Flash** | ✅ Tối ưu hóa #63072, #57406 | ⚠️ Bản port Ascend #43305; crash SM120 #42012; tracker SM90 #45373 | — | — | — | **vLLM** (hiệu năng) / SGLang (khả năng port, kèm lưu ý) |
| **Qwen3.8 / Qwen3.8-Flash-Next (qwen4exp)** | ✅ Theo dõi ROCm đang hoạt động (#57149, #59575) | ⚠️ AMD hc_mix #41880 | ✅ SGN op #30346; sửa DFlash #30927 | ⚠️ PR sửa YaRN #19231 | ❌ Không hỗ trợ context-parallel | **vLLM** (hiệu năng), **llama.cpp** (kernel mới) |
| **Kimi-K3** | — | ⚠️ Lỗi GB300 DCP #45367; lỗi âm thầm SM90 SwiGLU/SiTU #45755 | — | — | — | SGLang (nhưng không ổn định) |
| **Nemotron 3.5 Bolt 74B-A9B** | — | — | ✅ GQA phi tiêu chuẩn #23343 | ✅ **MLX #19229** | — | **Ollama** (tiêu dùng) / llama.cpp (GGUF) |
| **MiniCPM-OCR 1.0** | — | — | ✅ **#30979** | — | — | **llama.cpp** |
| **Muse Spark** | (PR hiệu năng trên ROCm) | ✅ Stack Day-0 #44664–#44667 | — | — | — | **SGLang** |
| **T-Head SAIL (Zhenwu NPU)** | — | ✅ Lộ trình #37519 | — | — | — | **SGLang** |

**Kết luận:** SGLang đang thắng về độ phủ (Ascend, T-Head, Muse Spark, DeepSeek-V4.1 CP), nhưng vLLM dẫn đầu về **chiều sâu hiệu năng** cho những mô hình quan trọng về mặt thương mại (GLM-5.3, Qwen3.8). llama.cpp đặc biệt nhanh ở khâu chuyển đổi multimodal/GGUF Day-0 (MiniCPM-OCR, Nemotron). Ollama nắm giữ **tầng tiện lợi cloud tiêu dùng**, đặc biệt là MLX trên Apple Silicon. Khoảng trống rõ ràng: **DeepSeek-V4-Flash trên Ampere không được vLLM hỗ trợ** với 118 bình luận yêu cầu — một cơ hội còn bỏ ngỏ.

---

## 4. Biên giới hiệu năng

Nỗ lực tối ưu hôm nay tập trung vào năm mặt trận riêng biệt:

**a) KV cache & loại bỏ (mật độ công việc cao nhất)**
- vLLM: offload KV xuyên TP cho hybrid GDN (#62914); vòng đời lease NIXL (có lỗi).
- SGLang: **KVShard** phân mảnh cấp pool cho MTP (#40929); HiCache MLA DCP file L3 (#41187); nhưng có lỗi cạn kiệt tầng host HiCache #45400.
- llama.cpp: loại bỏ `kq_mask` tiết kiệm **2 GB @ ub4096 / 4 GB @ ub8192** (#30965, #31009).
- Ollama: đề xuất connector KV pluggable #17696; loại KV cache trong Modelfile #16245.

**b) Phục vụ MoE dưới áp lực bộ nhớ**
- llama.cpp dẫn đầu rõ rệt: `llama_moe_cache` fallback CPU (#30966), LRU expert cư trú GPU (#27861), `--moe-cache-cpu-share`.
- Đây là thắng lợi ngang hàng khả thi nhất trong bản tổng hợp hôm nay — nhiều GB VRAM được chuyển sang cư trú expert.

**c) Kernel lượng tử hóa & giải lượng tử**
- Unsloth: **FP8 dequant gộp thành một lượt Triton duy nhất** (#14886) — tăng tốc trực tiếp backward của LoRA.
- llama.cpp: OpenCL Q2_K (#30999); kích hoạt FP16 toàn cục `--act-type f16` (#31011); YaRN `truncate=false` (#30206).
- vLLM: FA4 SM90 FP8 MMA cho Gemma-4 (#60372); attention sinks FlashInfer trên SM8x (#59878) mở khóa FP8 KV trên Ampere.

**d) Cấu trúc liệu phục vụ phân tán**
- vLLM: đồ thị PD disaggregation cho DeepSeek-V4.1 (GB200 DP4 prefill, #63155).
- SGLang: **AFD (Attention-FFN disaggregation)** — một trục mới vượt ra ngoài P/D, định cỡ độc lập nhóm GPU attention và FFN (#45958, RFC #45568).
- AFD là tín hiệu kiến trúc cần theo dõi; nó tổng quát hóa insight về tính bất đối xứng vượt ra ngoài prefill/decode.

**e) Sprint kernel theo backend**
- SYCL/Intel Arc: XMX đa cột (#29864), +19% prompt-eval trên tensor split (#30956), graph replay (#28725) — **backend được cải thiện nhiều nhất đồng thời cũng hồi quy nhiều nhất** (F16 NaN #30892, DeltaNet token soup #29183).
- ROCm/MI355X: tracker hiệu năng Qwen3.8, loại bỏ đồng bộ GLM-5.3 (#63072), AITER hc_mix (#41880).
- Hexagon/Adreno/OpenCL: CONV2D (#30995), depthwise conv2d (#30900) — mobile/edge đang trở thành hạng nhất.

---

## 5. Định vị tầng

Sáu dự án ánh xạ gọn gàng vào bốn tầng hệ sinh thái, với các vùng lân cận chồng lấn:

```
┌──────────────────────────────────────────────────────────────────┐
│  GATEWAY / ĐỊNH TUYẾN     LiteLLM (ưu tiên #1: chuỗi cung ứng)   │
│  ├─ Định tuyến đa nhà cung cấp, xác thực, kế toán chi phí        │
│  └─ Chuẩn hóa adapter trên API OpenAI/Anthropic/Gemini           │
├──────────────────────────────────────────────────────────────────┤
│  SERVING ENGINE (cluster/GPU, đa nút)                            │
│  ├─ vLLM — CUDA/GB200/ROCm, PD disaggregation, prefix caching    │
│  └─ SGLang — RadixAttention, AFD, khả năng port Ascend/NPU       │
├──────────────────────────────────────────────────────────────────┤
│  LOCAL RUNTIME (đơn nút → cluster nhỏ)                           │
│  ├─ llama.cpp — GGUF, MoE caching, mobile/edge, build-theo-commit│
│  └─ Ollama — lớp bọc UX tiêu dùng, backend MLX, danh mục cloud   │
├──────────────────────────────────────────────────────────────────┤
│  HUẤN LUYỆN / FINE-TUNING                                        │
│  └─ Unsloth — LoRA/GRPO, Studio UI, tích hợp TRL/vLLM            │
└──────────────────────────────────────────────────────────────────┘
```

**Khác biệt chính:**
- **vLLM vs SGLang**: Cả hai đều là serving engine đa nút, nhưng vLLM tối ưu cho *đường datacenter NVIDIA* (GB200, H100/H200, MI355X), trong khi SGLang theo đuổi *độ phủ phần cứng* (Ascend A3/A5, T-Head NPU) và các *cấu trúc liệu phục vụ* mới (AFD). Với đội GPU phương Tây, chọn vLLM; với đội phần cứng không đồng nhất/NPU, chọn SGLang.
- **llama.cpp vs Ollama**: llama.cpp là *engine* (GGUF, kernel, khả năng port); Ollama là *sản phẩm* (UX, danh mục mô hình, cloud). Hồi quy của Ollama trong 0.40.x cho thấy tầng sản phẩm thừa hưởng sự mong manh của engine như thế nào.
- **LiteLLM** nằm *trên* tất cả engine — nó định tuyến đến vLLM, SGLang, Ollama và các API hosted. Sự cố của nó là rủi ro *mang tính hệ thống* vì nó giữ thông tin xác thực cho mọi thứ bên dưới.
- **Unsloth** là dự án duy nhất hoạt động *trước* giai đoạn phục vụ — nhưng lỗi đồng bộ trọng số GRPO/vLLM (#14831) cho thấy huấn luyện và phục vụ giờ đây gắn kết chặt chẽ đến mức nào: một lỗi "huấn luyện" âm thầm tạo ra đầu ra phục vụ rác.

---

## 6. Tín hiệu xu hướng

**Bốn xu hướng ngành mà bản tổng hợp này cụ thể hóa:**

**1. Lỗi đúng đắn âm thầm là nhóm rủi ro chiếm ưu thế.**
Không phải crash — mà là *sai một cách âm thầm*. Rò rỉ KV xuyên request của vLLM (#61160), đọc dữ liệu cũ của NIXL (#61229), hoán đổi âm thầm SiTU→SwiGLU của Kimi-K3 trong SGLang (#45755), tool call ngoài schema của Ollama trả về rỗng với `eval_count>0` (#19187), và GRPO no-op của Unsloth (#14831) đều có chung một dấu hiệu: *request thành công nhưng đầu ra sai*. Với người ra quyết định về hạ tầng, điều này có nghĩa **kiểm tra đầu ra và bộ eval phải được đưa vào đường phục vụ**, không chỉ trong CI.

**2. Disaggregation đang trưởng thành nhưng chưa an toàn cho production.**
PD disaggregation + prefix caching của vLLM là cấu hình mặc định bật, nhưng hôm nay trả về nội dung từ *request khác*. DCP a2a của Kimi-K3 trong SGLang làm hỏng 12/12 đầu ra cho đến khi đặt `NCCL_GRAPH_REGISTER=0`. Cả hai engine đều có PR sửa, nhưng không cái nào an toàn để bật mù quáng. **Quy tắc cho

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới nào trong 24h qua, nhưng hoạt động trên tracker rất sôi động ở các đường phục vụ DeepSeek-V4/V4.1, GLM-5.3 và Qwen3.8. Các mục đang mở quan trọng nhất là **lỗi nhiễm bẩn KV giữa các request trong PD disaggregation với automatic prefix caching** (#61160) và **race hết hạn lease của NIXL** khiến decode tiêu thụ các KV block đã bị ghi đè (#61229) — cả hai đều là vấn đề thuộc nhóm tính đúng đắn đối với các triển khai disaggregated. Trong khi đó, các tracker hiệu năng ROCm/MI355X cho các model Qwen3.8 và lộ trình parity của Rust frontend vẫn tiếp tục tiến triển.

---

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

Không có. Không có bản phát hành mới nào trong 24h qua. Không có thay đổi phá vỡ tương thích nào về API/config được merge trong cửa sổ issue/PR hiện tại.

Liên quan nhưng chưa landed:
- **Tăng cường chống tràn cho streaming-input** — PR #63113 từ chối các merge input vượt quá `max_model_len` tại thời điểm merge và tạm dừng session, thay vì làm kẹt engine. Thay đổi hành vi đối với client streaming-input sau khi merge: các bản cập nhật quá lớn giờ sẽ bị từ chối thay vì âm thầm làm hỏng trạng thái. [PR #63113](https://github.com/vllm-project/vllm/pull/63113)

---

## 3. Hỗ trợ Model & Phần cứng mới

- **DeepSeek-V4-Flash-0731 trên SM8x (Ampere A100/A800, RTX 30xx)** — feature request đang mở #50576 (118 bình luận, issue sôi động nhất). Cả checkpoint `DeepSeek-V4-Flash` gốc lẫn `-0731` hiện đều không chạy được trên Ampere; chặn người dùng A100. [Issue #50576](https://github.com/vllm-project/vllm/issues/50576)
- **FlashInfer attention sinks trên SM8x** — PR #59878 bổ sung hỗ trợ sink cho SM8x, gỡ chặn `gpt-oss` khỏi việc fallback về `TRITON_ATTN` và mở các đường FP8 KV cache vốn chưa có backend trên Ampere. [PR #59878](https://github.com/vllm-project/vllm/pull/59878)
- **FA4 SM90 FP8 MMA cho full attention của Gemma-4** — PR #60372 bật FP8 MMA trong kernel full-attention FA4 SM90 trong khi vẫn giữ lưu trữ FP8 KV-cache (head dim 512 full / 256 sliding-window). [PR #60372](https://github.com/vllm-project/vllm/pull/60372)
- **Nâng cấp XPU kernels** — vLLM-xpu-kernels lên v0.1.16.1 (PR #61956). [PR #61956](https://github.com/vllm-project/vllm/pull/61956)
- **GDN hybrid cross-TP KV offload** — PR #62914 cho phép tái sử dụng filesystem cache xuyên các kích thước TP cho các hybrid attention+GDN trong `OffloadingConnector` native. [PR #62914](https://github.com/vllm-project/vllm/pull/62914)

---

## 4. Hiệu năng & Tối ưu hóa

**ROCm / MI355X (gfx950) — các tracker đang hoạt động:**
- **Qwen3.8-2.4T-A95B** (MXFP4 Quark) kế hoạch hiệu năng, đang landed dưới dạng các PR xếp chồng. [Issue #57149](https://github.com/vllm-project/vllm/issues/57149)
- **Qwen3.8-Flash-Next** — kiến trúc `qwen4_exp` (GatedDeltaNet ×36 lớp, QuerySparse Attention ×12, HyperConnection gated residual, MXFP4 MoE). [Issue #59575](https://github.com/vllm-project/vllm/issues/59575)
- **GLM-5.3-Flash** — PR #63072 loại bỏ một sync GPU→CPU mỗi prefill bằng cách truyền `chunk_indices` đã tính trước vào `chunk_kda` thay vì tính lại qua `prepare_chunk_indices`. [PR #63072](https://github.com/vllm-project/vllm/pull/63072)
- **Tối ưu hóa tổng quát cho GLM-5.3** — tracker #57406 tiếp nối công việc GLM-5.2; các tối ưu `glm_moe_dsa` được kế thừa. [Issue #57406](https://github.com/vllm-project/vllm/issues/57406)

**CUDA / graph capture:**
- **Decoder replay graphs của DeepSeek-V4.1** — PR #63155 capture decoder replay graphs trên capture stream của model graph để chúng tái sử dụng các free block của model graph trong shared graph pool thay vì dự trữ một pool thứ hai (sửa #62965). Nhắm tới GB200 DP4 prefill với các PIECEWISE graph có thể phá vỡ. [PR #63155](https://github.com/vllm-project/vllm/pull/63155)

**Lập lịch / speculative decoding:**
- **Lập lịch speculative token nhận biết độ dài ngữ cảnh** — RFC #48627 đề xuất mở rộng `num_speculative_tokens_per_batch_size` với một trục độ dài ngữ cảnh tùy chọn, để K được chọn từ bảng `(batch, ctx)`. [Issue #48627](https://github.com/vllm-project/vllm/issues/48627)
- **Adaptive DSpark online profiling** — feature request #52057 nhằm giảm drift ở batch size lớn hơn trong ước lượng verification-time dựa trên startup replay. [Issue #52057](https://github.com/vllm-project/vllm/issues/52057)
- **Batch invariant determinism** — tracker #27433 (102 bình luận) tiếp tục công việc dựa trên blog về nondeterminism của Thinking Machines. [Issue #27433](https://github.com/vllm-project/vllm/issues/27433)

**Khả năng quan sát:**
- **Tracker thô ở mức per-request / per-engine-step** — RFC #39979 (9 👍) yêu cầu một profiler nhẹ hơn PyTorch Profiler cho tối ưu E2E. [Issue #39979](https://github.com/vllm-project/vllm/issues/39979)

---

## 5. Ổn định & Hồi quy

Xếp theo mức độ nghiêm trọng:

1. **🔴 Nhiễm bẩn KV giữa các request trong PD disaggregation với prefix caching (mặc định)** — Issue #61160. Triển khai NIXL prefill/decode disaggregated phục vụ DeepSeek-V4.1-Flash thỉnh thoảng trả về **nội dung từ các request khác**. Sạch khi dùng `--no-enable-prefix-caching`. Có reproducer dạng script trên `/v1/...`. Đây là lỗi tính đúng đắn thuộc nhóm rò rỉ dữ liệu trong cấu hình bật mặc định. Chưa có PR sửa nào được tham chiếu. [Issue #61160](https://github.com/vllm-project/vllm/issues/61160)

2. **🔴 NixlConnector: KV block bị giải phóng khi lease hết hạn trong khi remote READ đang bay** — Issue #61229. Producer giải phóng KV block khi `kv_lease` hết hạn trong khi remote READ vẫn đang bay; decode âm thầm tiêu thụ KV đã bị ghi đè. vLLM 0.30.0, 1P1D, UCX. Hỏng âm thầm. Chưa có PR sửa nào được tham chiếu. [Issue #61229](https://github.com/vllm-project/vllm/issues/61229)

3. **🟠 Qwen3.8-Flash-Next: nội dung prompt vượt khoảng ~2048 (`indexer_budget`) token trở nên vô hình trên GB10 (sm121)** — Issue #62776. Trên 2× DGX Spark, model trả lời như thể prompt kết thúc ở khoảng ~2K token. Khác với vấn đề chất lượng retrieval — nội dung bị bỏ. Nightly v0.32. [Issue #62776](https://github.com/vllm-project/vllm/issues/62776)

4. **🟠 Output tool-calling bị xáo trộn với PP2 trên ROCm (GLM-5.2-FP8 DSA, chunked-prefill)** — Issue #46262. PP1 hoạt động đúng; PP2 tạo output bị xáo trộn. 8× MI355X, ROCm 7.2.3. [Issue #46262](https://github.com/vllm-project/vllm/issues/46262)

5. **🟠 Structured output hỏng với Qwen3 khi `enable_thinking=False`** — Issue #18819 (9 bình luận, 6 👍). Guided decoding thất bại cụ thể ở chế độ non-thinking. [Issue #18819](https://github.com/vllm-project/vllm/issues/18819)

6. **🟠 JSON-schema `response_format` của Qwen3.5 tạo ra các khoảng trắng bị xáo trộn** — Issue #38696. Tái hiện được trên `vllm/vllm-openai:nightly`. [Issue #38696](https://github.com/vllm-project/vllm/issues/38696)

7. **🟡 Gemma 4 không khởi tạo được với per-token-head KV cache quantization** — Issue #40388. [Issue #40388](https://github.com/vllm-project/vllm/issues/40388)

**Các PR sửa đang trên đường:**
- **Giảm quét attribute dạng bậc hai trong trích xuất tool-call của Muse** — PR #62345 (gắn tag Security) sửa độ phức tạp bậc hai trên hai đường độc lập tăng theo độ dài output của model. [PR #62345](https://github.com/vllm-project/vllm/pull/62345)
- **Realtime STT: hủy engine request khi websocket ngắt kết nối** — PR #52519; trước đây `cleanup()` hủy asyncio task nhưng không hủy engine request, gây rò rỉ compute. [PR #52519](https://github.com/vllm-project/vllm/pull/52519)
- **Va chạm encoder-cache của DeepSeek-VL2 xuyên các chế độ cropping** — PR #63120 phân biệt danh tính cache ảnh thô xuyên các chế độ cropping. [PR #63120](https://github.com/vllm-project/vllm/pull/63120)
- **Batch-sharded sampling cho ROCm Muse Spark** — PR #62756 khôi phục output multiplier và final-logit softcap trong `compute_logits_local`. [PR #62756](https://github.com/vllm-project/vllm/pull/62756)
- **Đồng bộ engine-ID của KV connector xuyên các rank PCP** — PR #62916 (draft) xử lý lỗi khởi động multi-node PP2/PCP8/TP2. [PR #62916](https://github.com/vllm-project/vllm/pull/62916)
- **Tái tạo NIXL agent sau sleep** — PR #63144 (draft) loại bỏ workaround sleep `RCACHE_ENABLE=n,TLS=^cuda_ipc`; bị chặn bởi một PR UCX upstream. [PR #63144](https://github.com/vllm-project/vllm/pull/63144)

---

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **PD disaggregation + prefix caching hiện chưa an toàn cho production.** Issue #61160 và #61229 đều là các lỗi hỏng âm thầm (rò rỉ giữa các request và đọc KV cũ) trong các triển khai disaggregated dựa trên NIXL. Nếu bạn chạy disaggregated serving với automatic prefix caching, hãy rà soát cấu hình hoặc tắt prefix caching cho đến khi các lỗi này được đóng lại. Đây là điểm cần lưu ý ưu tiên cao nhất trong ngày.

- **Người dùng A100/Ampere vẫn bị chặn với DeepSeek-V4-Flash.** Nếu bạn nhắm tới V4-Flash hoặc checkpoint `-0731` trên A100/A800/RTX 30xx, bạn không thể phục vụ được ở thời điểm hiện tại (#50576). Hãy tính đến Hopper/Blackwell hoặc chờ công việc kernel SM8x.

- **Disaggregated serving đang trưởng thành nhưng bề mặt API vẫn đang biến động.** Việc tách render/generate/derender (#56851, #42729) và streaming derender (#47161) đang tích cực landed. Nếu bạn đã xây dựng xử lý detokenization/stop-string tùy chỉnh quanh `/inference/v1/generate`, hãy lưu ý rằng ngữ nghĩa stop-string trong đường token vẫn đang được làm rõ (#57052) — hãy kiểm chứng xử lý stop của bạn với `main` hiện tại.

- **Determinism và ngữ nghĩa logprobs đang trở thành các hợp đồng tường minh.** Nếu bạn phụ thuộc vào sampling tái lập được hoặc giá trị logprob (ví dụ cho RL hoặc evals), hãy theo dõi #27433, #42259 và #48627 — batch invariance, ngữ nghĩa logits/logprobs xuyên Model Runner V2, và lập lịch speculative nhận biết ngữ cảnh đều đang được chính thức hóa.

- **Tool-calling và structured output vẫn còn những cạnh sắc.** Structured output non-thinking của Qwen3 (#18819), JSON schema của Qwen3.5 (#38696), tool calling PP2 trên ROCm (#46262), và một vụ bùng nổ bậc hai liên quan đến bảo mật trong trích xuất tool-call của Muse (#62345) đều đang mở. Nếu bạn phục vụ workload agentic, hãy ghim tổ hợp model/quant/parallelism của bạn và kiểm thử trích xuất tool-call với các output đối kháng.

- **Rust frontend còn thử nghiệm.** API server Rust drop-in (`VLLM_USE_RUST_FRONTEND=1`) vẫn thiếu feature parity (#44280). Đừng đưa nó vào production cho bất cứ thứ gì phụ thuộc vào hành vi frontend đầy đủ.

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Hoạt động hôm nay chủ yếu xoay quanh công việc ổn định hệ thống hơn là các bản phát hành: **49 issue được cập nhật trong 24 giờ qua**, với tracker flaky-CI đã tồn tại từ lâu (#42752, 123 bình luận) vẫn là mục có lưu lượng truy cập cao nhất. Về phía tính năng, RFC **Attention-FFN disaggregation (AFD)** (#45568) đã tiến thêm một bước với PR triển khai đi kèm (#45958), báo hiệu một hướng tiếp cận mới về topology phục vụ (serving topology) vượt ra ngoài disaggregation prefill/decode. Một số lỗi hồi quy (regression) về tính đúng đắn đã xuất hiện trong chu kỳ 0.5.22, đáng chú ý là quanh **Kimi-K3 DCP a2a** và **GLM-5.3-Flash trên SM120**, với các PR sửa lỗi đã được mở.

Không có bản phát hành mới nào được công bố trong 24 giờ qua.

## 2. Phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)

- **Không có bản phát hành mới.** Phiên bản mới nhất được nhắc đến trong các issue vẫn là **v0.5.22** (`main` tại `ce66b3ab` đang được người báo cáo theo dõi).
- **Cảnh báo deprecation:** `python -m sglang.bench_serving` là một shim đã bị deprecate và có lịch trình xóa bỏ; tài liệu đang được chuyển sang `python -m sglang.benchmark.serving` ([PR #45959](https://github.com/sgl-project/sglang/pull/45959)). Các công cụ/script vẫn gọi module cũ cần được cập nhật ngay.
- **Đặt tên metric Prometheus:** một yêu cầu đang mở ([#45418](https://github.com/sgl-project/sglang/issues/45418)) đề xuất thay dấu hai chấm bằng dấu gạch dưới trong tên metric `sglang:*` (ví dụ: `sglang_per_stage_request...`). Chưa được merge, nhưng người viết dashboard/alert nên lường trước việc đổi tên.
- **`--enable-lmcache` + radix cache bị tắt** bị lỗi trong 0.5.22 ([#45929](https://github.com/sgl-project/sglang/issues/45929)) — tránh kết hợp cờ này cho đến khi được sửa.

## 3. Hỗ trợ Model & Phần cứng mới

- **GLM-5.3-Flash trên Ascend A3/A5** — port mô hình hybrid MLA+DSA MoE VLM với MTP head tích hợp sang NPU, qua [PR #43305](https://github.com/sgl-project/sglang/pull/43305).
- **T-Head SAIL / Zhenwu 810, 810E, M890P** — lộ trình hỗ trợ first-class trong upstream ([#37519](https://github.com/sgl-project/sglang/issues/37519)).
- **Muse Spark** — hỗ trợ Day-0 đang được đưa vào theo các PR chia nhỏ có thứ tự (#44664–#44667), phụ thuộc vào một bản patch DeepGEMM ([#44678](https://github.com/sgl-project/sglang/issues/44678)).
- **SANA-Sprint 0.6B (diffusion)** — yêu cầu hỗ trợ SGLang-Diffusion native cho text-to-image 1–4 bước, 1024px ([#43671](https://github.com/sgl-project/sglang/issues/43671)).
- **DeepSeek-V4.1 CP>1 encoder replay** với P/D và HiCache — mở rộng CP1 SWA bounded replay lên CP>1 ([PR #45954](https://github.com/sgl-project/sglang/pull/45954)).
- **Prefill context parallel cho DeepSeek-V4.1 trên AMD** — [PR #43465](https://github.com/sgl-project/sglang/pull/43465).
- **GLM-5.3-Flash trên Hopper (SM90)** — issue theo dõi hiệu năng đã được mở ([#45373](https://github.com/sgl-project/sglang/issues/45373)).

## 4. Hiệu năng & Tối ưu hóa

- **Khung AFD (disaggregation attention/FFN):** framework thực thi cho các nhóm GPU attention và FFN có kích thước độc lập, bao gồm khởi động worker, tải model, điều phối token và kết hợp đầu ra ([PR #45958](https://github.com/sgl-project/sglang/pull/45958), RFC [#45568](https://github.com/sgl-project/sglang/issues/45568)).
- **DeepSeek-V4.1 MegaGate:** loại bỏ `torch.where` zero-copy trên hàng đã pad trên `sgl-deep-gemm 0.2.3.post1`, tiết kiệm một lần đọc+ghi trên đầu vào MoE đã pad ở mỗi layer ([PR #45933](https://github.com/sgl-project/sglang/pull/45933)).
- **Adaptive speculative decoding với two-batch overlap** — loại bỏ fallback tham số tĩnh dưới TBO ([PR #45956](https://github.com/sgl-project/sglang/pull/45956); roadmap [#23705](https://github.com/sgl-project/sglang/issues/23705)).
- **NPU AscendAttnBackend:** block-table gather không D2H cho mirrorless DSA graph replay ([PR #45949](https://github.com/sgl-project/sglang/pull/45949)).
- **AMD gfx950:** AITER FlyDSL `hc_mix` cho hyper-connection Qwen3.8, low-rank gate fusion trên hyper-state `[M, 4·2560]` ([PR #41880](https://github.com/sgl-project/sglang/pull/41880)).
- **XPU / FLUX.2:** kernel Triton fused bit-exact LayerNorm + gated residual norm ([PR #41942](https://github.com/sgl-project/sglang/pull/41942)).
- **KVShard:** sharding KV cache ở mức pool cho MTP ([PR #40929](https://github.com/sgl-project/sglang/pull/40929)).
- **HiCache:** MLA DCP với file L3 trên các engine khớp nhau, PR đầu tiên trong chuỗi 3 PR ([PR #41187](https://github.com/sgl-project/sglang/pull/41187)).
- **Scheduler RFC:** prefill admission theo ngân sách thời gian cho serving TP colocated ([#45415](https://github.com/sgl-project/sglang/issues/45415)).

## 5. Ổn định & Hồi quy (xếp theo mức độ nghiêm trọng)

1. **Kimi-K3 DCP a2a decode bị lỗi ký tự trên GB300 2-node** — hỏng CUDA-graph với đăng ký NCCL graph buffer; 12/12 đầu ra bị suy giảm. Cách xử lý tạm: `NCCL_GRAPH_REGISTER=0`. Hai bản sửa đang cạnh tranh: [PR #45824](https://github.com/sgl-project/sglang/pull/45824) (persistent a2a buffer) so với #45371 — **không merge cả hai** ([#45367](https://github.com/sgl-project/sglang/issues/45367)).
2. **GLM-5.3-Flash / fa4 crash trên SM120 tại CUDA-graph capture** — vấn đề reshape extend hybrid trên RTX PRO 6000; Triton hiện là backend attention duy nhất hoạt động ([#42012](https://github.com/sgl-project/sglang/issues/42012)).
3. **GLM-5.3-Flash trên 8×H20 với EAGLE** — CUDA illegal memory access trong `run_eagle_verify` → `build_grammar_vocab_mask` ([#45159](https://github.com/sgl-project/sglang/issues/45159)).
4. **Kimi-K3 trên SM90:** `flashinfer_mxfp4` âm thầm tính GPT-OSS SwiGLU thay vì SiTU — **sai số âm thầm**, không phải crash. Đang bị chặn bởi flashinfer-ai/flashinfer#4209 ([#45755](https://github.com/sgl-project/sglang/issues/45755)).
5. **`--enable-lmcache` làm crash scheduler ở lần idle đầu tiên** trong 0.5.22 khi radix cache bị tắt ([#45929](https://github.com/sgl-project/sglang/issues/45929)).
6. **Priority preemption requeue các victim theo thứ tự set** — có thể lệch giữa các TP rank ([#45812](https://github.com/sgl-project/sglang/issues/45812)).
7. **HiCache trên hybrid GDN:** host-tier hit giảm về 0 khi working set bị evict vượt ~3 long prefix (host mamba pool cạn kiệt trong khi KV vẫn ở host) ([#45400](https://github.com/sgl-project/sglang/issues/45400)).
8. **`--max-queued-requests 0` với priority scheduling** làm crash scheduler khi queue rỗng ([#45510](https://github.com/sgl-project/sglang/issues/45510)).
9. **Responses API:** Codex turn được replay bị tách thành ba assistant block, khiến model học cách kết thúc turn trước khi gọi tool — một **hồi quy về hành vi agent/agent-training** ([#42110](https://github.com/sgl-project/sglang/issues/42110)).
10. **Parse tool-call của GLM-4.7/GLM-5:** newline sau tên hàm âm thầm làm rớt lời gọi trong chế độ non-streaming ([#45953](https://github.com/sgl-project/sglang/issues/45953)).
11. **CI:** lỗi AMD PR Test được theo dõi ([#45847](https://github.com/sgl-project/sglang/issues/45847)); tracker flaky-test vẫn là issue đứng đầu về mức độ hoạt động ([#42752](https://github.com/sgl-project/sglang/issues/42752)).

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Nếu bạn phục vụ Kimi-K3 trên GB300 đa node với DCP, hãy tắt đăng ký NCCL graph** (`NCCL_GRAPH_REGISTER=0`) cho đến khi bản sửa persistent-buffer được merge, và theo dõi xem PR nào trong hai PR cạnh tranh được merge.
- **Nếu bạn chạy GLM-5.3-Flash trên Blackwell tiêu dùng/workstation (SM120), hãy giữ backend attention Triton** — fa4 crash tại graph capture.
- **Tránh `--enable-lmcache` với radix cache bị tắt** trên 0.5.22; đây là crash scheduler cứng.
- **Nhà xây dựng agent nên kiểm tra round-trip tool-call trên GLM-4.7/GLM-5** (lỗi rớt do newline sau tên hàm, #45953) và trên Responses API (#42110), vì cả hai bug đều làm hỏng quỹ đạo agent đa lượt thay vì báo lỗi rõ ràng.
- **Script benchmark nên được chuyển** sang `sglang.benchmark.serving`; module cũ đã bị deprecate.
- **Dashboard dựa trên metric** nên chuẩn bị cho việc đổi tên `sglang:` → `sglang_` nếu #45418 được chấp nhận.
- **Theo dõi AFD stack (#45958)** — nếu workload của bạn có tỷ lệ mở rộng attention/FFN không đối xứng, các nhóm A và F có kích thước độc lập có thể trở thành topology triển khai phù hợp, xếp trên disaggregation P/D hiện có.

---
*Nguồn: [sgl-project/sglang](https://github.com/sgl-project/sglang) issue và PR được cập nhật từ 2026-10-22 đến 2026-10-23. Một số tóm tắt issue đã bị cắt ngắn trong dữ liệu nguồn; chi tiết ở trên phản ánh phần văn bản hiện có.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Nhịp phát hành vẫn tiếp tục với tốc độ cao (các build b11815–b11829 trong 24 giờ qua), với những thay đổi đáng chú ý nhất là **hỗ trợ đa phương thức MiniCPM-OCR 1.0** và **depthwise conv2d trên OpenCL** cho GPU Adreno. Về phía server, có hai thay đổi quan trọng liên quan đến API: đầu vào nội dung có kiểu (typed content input) cho endpoint RERANK và các sửa lỗi cho ngữ nghĩa commit/drain của realtime API. Trong khi đó, cụm vấn đề SYCL/Intel Arc Pro B70 xoay quanh Gated DeltaNet và đầu ra NaN với F16 đang ngày càng nghiêm trọng, với nhiều báo cáo về độ chính xác ở ngữ cảnh dài cùng hội tụ vào các kernel giống nhau — một mối lo ngại ngày càng lớn cho những ai triển khai các mô hình lai Qwen3.8/Nemotron trên phần cứng Intel.

---

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

- **b11829 — `server: Substitute rerank placeholder from the original template only`** ([#30864](https://github.com/ggml-org/llama.cpp/pull/30864))
  Sửa hành vi thay thế placeholder trong rerank; các client phía sau dựa vào cách thay thế trước đó (quá rộng) có thể thấy prompt được template hóa hơi khác đi.

- **b11828 — `server: realtime API: send complete after committed audio drains`** ([#30994](https://github.com/ggml-org/llama.cpp/pull/30994))
  Thay đổi thời điểm sự kiện `complete` được kích hoạt trong realtime API: giờ đây nó chờ audio đã commit được xử lý hết thay vì kích hoạt khi stream rỗng như một cách ước lượng thời điểm. Bất kỳ client nào dựa vào thời điểm trước đó nên kiểm tra lại.

- **b11818 — `server: support typed content input for RERANK endpoint`** ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625))
  RERANK giờ đây chấp nhận các phần nội dung có kiểu (kiểu đa phương thức); đầu vào rerank đa phương thức bị từ chối khi mô hình không có chat template cho rerank. Đây là thay đổi API mang tính bổ sung nhưng mở rộng schema đầu vào.

- **b11826 — `mtmd: add MiniCPM-OCR 1.0 support`** ([#30979](https://github.com/ggml-org/llama.cpp/pull/30979))
  `PROJECTOR_TYPE_MINICPM_OCR_1_0` mới tái sử dụng clip graph và đường chuyển đổi của MiniCPM-V 4.6. Không cần migration.

*Không có thay đổi nào phá vỡ định dạng config hay GGUF trong khoảng thời gian này.*

---

## 3. Hỗ trợ mô hình & phần cứng mới

| Mục | Build/PR | Ghi chú |
|---|---|---|
| **MiniCPM-OCR 1.0** (mtmd) | b11826 / [#30979](https://github.com/ggml-org/llama.cpp/pull/30979) | Đăng ký projector type mới trên nền MiniCPM-V 4.6. |
| **Nemotron: GQA không chuẩn, BPE tokenizer, domyn-small pre-type** | b11819 / [#23343](https://github.com/ggml-org/llama.cpp/pull/23343) | Cũng ghi Metaspace `prepend_scheme` như metadata GGUF. Sửa lỗi liên quan: GGUF của Nemotron bị gắn tag `pixtral` sai — [#30894](https://github.com/ggml-org/llama.cpp/issues/30894) (CLOSED). |
| **OpenCL: depthwise conv2d (Adreno)** | b11827 / [#30900](https://github.com/ggml-org/llama.cpp/pull/30900) | Cho phép các đường vision/conv trên GPU di động Qualcomm. |
| **OpenCL: hỗ trợ Q2_K bước đầu** (đang thực hiện) | [#30999](https://github.com/ggml-org/llama.cpp/pull/30999) | Dựa trên #30180, được viết lại nhiều. |
| **Hexagon: CONV2D (f16/f32)** | [#30995](https://github.com/ggml-org/llama.cpp/pull/30995) | Đã kiểm thử trên v75/v81 Android và v81 WoA; 1021/1021 backend op pass. |
| **Hexagon: op SGN** | [#30346](https://github.com/ggml-org/llama.cpp/pull/30346) | Được thúc đẩy bởi Qwen3.8-Flash-Next (qwen4exp). |
| **SYCL: hỗ trợ F16 cho SWIGLU_OAI** | [#30857](https://github.com/ggml-org/llama.cpp/pull/30857) | Kernel trước đây bị assert với F16 dù đã khai báo hỗ trợ. |

Cũng đáng chú ý về mặt kiến trúc: **tối ưu đầu vào glm5** (b11823 / [#30932](https://github.com/ggml-org/llama.cpp/pull/30932)) và **sửa layer-input của qwen4exp DFlash drafter** (b11822 / [#30927](https://github.com/ggml-org/llama.cpp/pull/30927)).

---

## 4. Hiệu năng & Tối ưu hóa

- **Tái cấu trúc SYCL multi-column XMX mul_mat_vec_q** (b11821 / [#29864](https://github.com/ggml-org/llama.cpp/pull/29864)) — 2–80 cột activation cho trọng số K-quant và Q8_0 đã sắp xếp lại trên Intel XMX (int8 DPAS, ESIMD).

- **Loại bỏ host-wait trong SYCL FA MKL** ([#30684](https://github.com/ggml-org/llama.cpp/pull/30684), CLOSED) — thay bốn host wait trong kernel MKL FA bằng chuỗi phụ thuộc tường minh. **Cải thiện ~4% trên Arc Pro B70**, và là điều kiện tiên quyết cho SYCL graph capture.

- **Đường nhanh `ggml_sycl_comm_exchange` của SYCL** ([#30956](https://github.com/ggml-org/llama.cpp/pull/30956)) — **+19% prompt-eval t/s với `-sm tensor`** trên hai Arc Pro B70, đưa tensor split ngang bằng layer split với chi phí PPL bằng không.

- **Ghi & phát lại graph của SYCL** ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725), CLOSED) — cổng chuyển CUDA graph; cho phép sắp xếp lại dữ liệu trước khi ghi do treo async-alloc.

- **Tối ưu Split-K large-tile cho RDNA3/4 Vulkan** ([#30280](https://github.com/ggml-org/llama.cpp/pull/30280)) — đang review; nhắm vào prefill với tile 128×128 ở `ubatch=512`.

- **`--act-type f16` cho activation FP16 toàn cục** ([#31011](https://github.com/ggml-org/llama.cpp/pull/31011)) — đồ thị tính toán F16 đầu-cuối; được thúc đẩy bởi các accelerator bị giới hạn băng thông. Mặc định vẫn là f32.

- **Cache expert MoE (nhiều hướng):**
  - [`llama_moe_cache`](https://github.com/ggml-org/llama.cpp/pull/30966) — chạy các expert bị cache-miss trên CPU, có thể tinh chỉnh qua `--moe-cache-cpu-share`.
  - [Cache LRU nằm trên GPU cho expert MoE offload lên host](https://github.com/ggml-org/llama.cpp/pull/27861) — nhắm vào throughput decode trên các cấu hình `-ot ...exps=CPU` / `-ncmoe`.
  - [Loại bỏ `kq_mask` trong qwen4exp](https://github.com/ggml-org/llama.cpp/pull/30965) và [glm5-next](https://github.com/ggml-org/llama.cpp/pull/31009) — **tiết kiệm 2 GB ở ub 4096 / 4 GB ở ub 8192**, có thể chuyển sang cache expert.

- **Hỗ trợ YaRN `truncate=false`** ([#30206](https://github.com/ggml-org/llama.cpp/pull/30206)) — hiện chỉ CPU + CUDA; các backend khác đánh dấu không hỗ trợ.

---

## 5. Ổn định & Hồi quy (theo mức độ nghiêm trọng)

**Cao — độ chính xác ở ngữ cảnh dài / trên mô hình lai:**

- **[#30892](https://github.com/ggml-org/llama.cpp/issues/30892) [OPEN] SYCL F16: đầu ra NaN trên Qwen3.8-27B dense Q4_K_M kể từ #29107** — hồi quy bắt nguồn từ việc sắp xếp lại mã IQ3; tắt fused GEMM giúp khắc phục tạm. Arc Pro B70. *Chưa có PR sửa.*
- **[#30884](https://github.com/ggml-org/llama.cpp/issues/30884) [OPEN] CUDA/HIP flash attention cho kết quả rác ở ngữ cảnh dài trên gfx1201 (RDNA4)** — EOS ngay lập tức với độ tin cậy cao, head_dim 256 (Qwen3.8-27B). Hỏng dữ liệu nằm ở prefill. *Chưa có PR sửa.*
- **[#29183](https://github.com/ggml-org/llama.cpp/issues/29183) / [#29167](https://github.com/ggml-org/llama.cpp/issues/29167) [OPEN] SYCL DeltaNet tạo ra "token soup" trên prompt dài** — ảnh hưởng Qwen3.6, Qwen3.8, Nemotron trên Arc Pro B70. Các mô hình dense vẫn ổn đến 131K+, cho thấy kernel DeltaNet hồi quy là thủ phạm cụ thể.
- **[#27623](https://github.com/ggml-org/llama.cpp/issues/27623) [OPEN] Qwen3.8-27B hybrid Gated DeltaNet: throughput decode sụp ~25× khi vượt ngữ cảnh ~80K** — xử lý prompt vẫn nhanh. Tái hiện trên RTX 4080 SUPER trên cả Windows/WSL. *17 bình luận, thảo luận đang diễn ra.*

**Trung bình — đặc thù nền tảng:**

- **[#30973](https://github.com/ggml-org/llama.cpp/issues/30973) [OPEN] Metal abort ở MUL_MAT với BF16 src1 khi K≥64, batch>8** — không tồn tại kernel `mul_mm` cho BF16. Tái hiện được qua `test-backend-ops`.
- **[#27845](https://github.com/ggml-org/llama.cpp/issues/27845) [CLOSED, bug-unconfirmed] Rò rỉ bộ nhớ với `-sm tensor` trên hai Intel B70 SYCL.**
- **[#30905](https://github.com/ggml-org/llama.cpp/issues/30905) [CLOSED] Detokenize xóa khoảng trắng trước dấu câu** với vocab họ Gemma 4 — `x != y` hiển thị thành `x!= y`. Đã sửa.
- **[#30894](https://github.com/ggml-org/llama.cpp/issues/30894) [CLOSED] GGUF của Nemotron bị gắn tag sai thành `pixtral`** → sai pre-tokenizer. Đã sửa.

**Thấp / tồn đọng lâu dài:**

- **[#25790](https://github.com/ggml-org/llama.cpp/issues/25790) [OPEN, security] Chèn instruction qua `?q=` trong WebUI** — vẫn mở.
- **[#28158](https://github.com/ggml-org/llama.cpp/issues/28158) [OPEN] Vulkan Qwen3.8 DFlash/MTP phát ra token id OOB == n_vocab (248320)** trên gfx1150.
- **[#20697](https://github.com/ggml-org/llama.cpp/issues/20697) [OPEN] Offload checkpoint ngữ cảnh dựa trên đĩa (`--cache-disk`)** — 61 👍, enhancement được upvote nhiều nhất trong danh sách.

---

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **API server đang trưởng thành trên hai mặt:** RERANK giờ chấp nhận nội dung có kiểu/đa phương thức ([#29625](https://github.com/ggml-org/llama.cpp/pull/29625)), và thời điểm hoàn thành của realtime API giờ đúng về mặt ngữ nghĩa thay vì ước lượng theo thời gian ([#30994](https://github.com/ggml-org/llama.cpp/pull/30994)). Nếu bạn chạy pipeline realtime voice hoặc rerank, hãy kiểm thử lại thứ tự sự kiện và schema đầu vào.

- **Phục vụ MoE trên VRAM hạn chế đang được đầu tư thực sự.** Cụm PR xoay quanh cache LRU cho expert, fallback CPU cho `llama_moe_cache`, `--moe-cache-cpu-share`, và tiết kiệm bộ nhớ `kq_mask` trong qwen4exp/glm5 nghĩa là ngân sách VRAM nhiều GB giờ có thể được chuyển sang lưu trú expert. Nếu bạn phục vụ Qwen4exp hoặc GLM5-next, hãy theo dõi [#30965](https://github.com/ggml-org/llama.cpp/pull/30965) và [#31009](https://github.com/ggml-org/llama.cpp/pull/31009) — đây là những thắng lợi bộ nhớ ngang hàng, tức thời.

- **Intel Arc đồng thời là backend được cải thiện nhiều nhất và hồi quy nhiều nhất.** Bạn được +19% prompt-eval khi tensor-split ([#30956](https://github.com/ggml-org/llama.cpp/pull/30956)), depthwise conv2d cho vision, và SYCL graph — nhưng hồi quy F16 NaN ([#30892](https://github.com/ggml-org/llama.cpp/issues/30892)) và vấn đề token-soup của DeltaNet ([#29183](https://github.com/ggml-org/llama.cpp/issues/29183), [#29167](https://github.com/ggml-org/llama.cpp/issues/29167)) nghĩa là bất kỳ mô hình hybrid-attention nào (Qwen3.6/3.8, Nemotron) ở ngữ cảnh dài nên được ghim vào build đã biết là tốt hoặc chạy với `GGML_SYCL_F16=OFF`.

- **Kiến trúc lai là biên giới mới của sự bất ổn định.** Các mô hình lai Gated DeltaNet / QSA / linear-attention (Qwen3.8, Nemotron, glm5-next, qwen4exp) chiếm ưu thế trong các báo cáo lỗi hôm nay trên CUDA, SYCL và RDNA4. Nếu ứng dụng agent của bạn nhắm đến ngữ cảnh rất dài trên các họ mô hình này, hãy dự trù cho việc kiểm thử hồi quy theo từng backend và từng build, và đặc biệt theo dõi các kernel Flash Attention + recurrent-state.

- **Suy luận di động/biên đang

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay
Độ tin cậy của cloud vẫn là câu chuyện chủ đạo: Issue [#15453](https://github.com/ollama/ollama/issues/15453) (Ollama Cloud Pro, tỷ lệ lỗi ~95%, 55 bình luận, 22 👍) tiếp tục thu hút sự chú ý của cộng đồng, cùng với một làn sóng lỗi hồi quy cục bộ mới gắn với dòng 0.40.x. Về phía kỹ thuật, backend `mlx` đang được chú ý tích cực — hỗ trợ YaRN scaling cho Qwen3/Qwen3.5 ([#19231](https://github.com/ollama/ollama/pull/19231)) và hỗ trợ Nemotron 3.5 Bolt 74B-A9B ([#19229](https://github.com/ollama/ollama/pull/19229)) đều đã được mở PR trong hôm nay. Một loạt bản sửa lỗi parser tool-calling (Gemma4, Qwen3-Coder, OpenAI Responses streaming) cho thấy nhóm đang siết chặt bề mặt tương thích OpenAI.

## 2. Bản phát hành & thay đổi gây ảnh hưởng
- **Không có bản phát hành nào trong 24 giờ qua.** Phiên bản hiện hành được người dùng nhắc đến trong các issue là **0.40.8/0.40.9** (xem [#19201](https://github.com/ollama/ollama/issues/19201), [#19227](https://github.com/ollama/ollama/pull/19227)).
- **Thay đổi hành vi:** `SYSTEM ""` trong Modelfile giờ sẽ *xóa* system prompt của model gốc thay vì bị bỏ qua — ngữ nghĩa trở thành `bỏ trống → kế thừa`, `có nội dung → thay thế`, `chuỗi rỗng → xóa`. Xem [#18990](https://github.com/ollama/ollama/pull/18990).
- **Sửa lỗi hồi quy:** `typical_p` đã bị loại khỏi bề mặt Python API và giờ bị từ chối với HTTP 400 ([#18480](https://github.com/ollama/ollama/issues/18480), CLOSED).
- **Bảo mật:** Các CVE của Go toolchain trong binary `ollama` tiếp tục được theo dõi tại [#16033](https://github.com/ollama/ollama/issues/16033) và [#19162](https://github.com/ollama/ollama/issues/19162); việc khắc phục yêu cầu Go 1.26.9+.

## 3. Hỗ trợ model & phần cứng mới
- **Nemotron 3.5 Bolt 74B-A9B (MLX):** cấu hình expert theo từng layer, nhập affine 3-bit đã lượng tử hóa sẵn, xếp chồng expert với độ chính xác hỗn hợp, giải mã suy đoán LiLiCorr qua runner DFlash. [#19229](https://github.com/ollama/ollama/pull/19229)
- **MLX YaRN scaling** cho Qwen3 và Qwen3.5: tuân thủ metadata RoPE scaling tường minh, mRoPE amplitude scaling, giữ nguyên các chiều không quay. Sửa [#18256](https://github.com/ollama/ollama/issues/18256). [#19231](https://github.com/ollama/ollama/pull/19231)
- **Checkpoint Gradium Phonon GA:** chuyển từ định dạng prerelease sang GA, bao gồm nhập giọng mặc định và điều kiện hóa giọng nói (phiên bản tối thiểu 0.40.9). [#19227](https://github.com/ollama/ollama/pull/19227) (CLOSED/đã merge)
- **DeepSeek-V4.1-Flash-1017** đã được thêm vào catalog cloud. [#19079](https://github.com/ollama/ollama/issues/19079)
- **Nhận biết metadata model cloud trong các launcher** — Codex, v.v. giờ thấy đúng `context_window`, mức thinking và khả năng của model cloud (ví dụ `glm-5.2` → 1.048.576). [#19223](https://github.com/ollama/ollama/pull/19223)

## 4. Hiệu năng & tối ưu hóa
- **Đang điều tra lỗi hồi quy Vulkan/AMD RADV:** thông lượng sụt giảm ~**30 lần** ở *request giống hệt thứ hai* khi bật prompt cache dùng host-memory của llama.cpp đi kèm, trên RX 6600 XT / Ubuntu 24.04.5 / Ollama 0.40.8. Model vẫn được offload hoàn toàn lên GPU. [#19201](https://github.com/ollama/ollama/issues/19201)
- **Đề xuất framework KV connector** cho các backend KV cache bên ngoài có thể cắm rời (kiểu LMCache) — được phạm vi hóa như một shim vòng đời nhỏ, có thể mở rộng. [#17696](https://github.com/ollama/ollama/issues/17696)
- **Yêu cầu đặt kiểu KV cache trong Modelfile;** hiện chỉ có thể đặt qua biến môi trường `KV_CACHE_TYPE`. Liên quan tới các model cỡ 30B chỉ vừa đủ với `q8_0`. [#16245](https://github.com/ollama/ollama/issues/16245)
- **`num_predict == -2`** được đề xuất để lấp đầy context buffer như một giới hạn sinh động. [#9547](https://github.com/ollama/ollama/pull/9547)
- **Thời lượng load/tổng** cho việc nạp model được đề xuất như một metric server mới. [#9277](https://github.com/ollama/ollama/pull/9277)
- **Các tính năng `dspark` / giải mã suy đoán** được yêu cầu để tăng tốc đáng kể đầu ra LLM. [#17016](https://github.com/ollama/ollama/issues/17016)

## 5. Ổn định & lỗi hồi quy
Xếp theo mức độ nghiêm trọng:

1. **🔴 Dịch vụ Cloud Pro không dùng được (lỗi ~95%).** 55 bình luận, 22 👍, vẫn OPEN từ 2026-04-09. Ảnh hưởng tới `glm-5.1:cloud`, `kimi-k2.5:cloud`, `qwen3.5:cloud`, `deepseek-v3.2:cloud`. [#15453](https://github.com/ollama/ollama/issues/15453)
2. **🔴 Suy thoái sinh văn bản trên `glm-5.3-flash:cloud`** từ 2026-10-12 — 5–8% request thất bại với suy thoái token nghiêm trọng, có bằng chứng hỏng cluster phía host. 31 bình luận. [#18980](https://github.com/ollama/ollama/issues/18980)
3. **🟠 Panic `Maximum threads` trên MLX** trên macOS sau khoảng 1 phút với v0.40.0; kernel yêu cầu 1024 thread, HW tối đa 896 (`sdpa_vector_2pass_1_bfloat16_t_256_256_nomask_qnt_c_nos...`). Hạ cấp về 0.35.1 là cách xử lý tạm. [#18846](https://github.com/ollama/ollama/issues/18846)
4. **🟠 Kẹt prefill MLX nvfp4** dưới tải duy trì single-slot (`OLLAMA_NUM_PARALLEL=1`): request được nhận bị kẹt ở `processed=total-1` trong nhiều phút; chỉ SIGTERM runner mới khôi phục được. [#18505](https://github.com/ollama/ollama/issues/18505)
5. **🟠 Vulkan/RADV chậm ~30 lần** ở request giống hệt thứ hai khi có prompt cache. [#19201](https://github.com/ollama/ollama/issues/19201)
6. **🟠 Windows `/api/chat` bị reset kết nối sau ~15 giây** với prompt lớn (RTX 3090, Qwen3.8-27B). Tái hiện được trên 0.40.4. [#19139](https://github.com/ollama/ollama/issues/19139) — xem thêm [#19113](https://github.com/ollama/ollama/issues/19113) cho cùng lỗi reset TCP khi gọi thẳng `llama-server`.
7. **🟠 Việc eviction đang chờ bị `keep_alive` hủy** với `OLLAMA_MAX_LOADED_MODELS=1`: request cho model không thường trú bị kẹt suốt `keep_alive` (mặc định 30 phút) vì việc eviction model thường trú bị hoãn. [#19182](https://github.com/ollama/ollama/issues/19182)
8. **🟡 Phản hồi rỗng im lặng** khi model gọi một hàm không có trong `tools` — phản hồi trả về rỗng với `eval_count > 0`. Gặp trên 0.40.4–0.40.7 với `qwen3:8b`. [#19187](https://github.com/ollama/ollama/issues/19187)
9. **🟡 JSON schema bị model cloud bỏ qua** trên `/api/chat` (`qwen3-coder:30b` cục bộ thì ổn, `qwen3-coder:480b-cloud` bỏ qua schema). [#12362](https://github.com/ollama/ollama/issues/12362)
10. **🟡 Luồng `/v1/responses`** đóng giữa lúc suy luận mà không có sự kiện kết thúc (nemotron-3-super:120b). [#17118](https://github.com/ollama/ollama/issues/17118) — PR sửa: giữ lỗi thành một sự kiện `response.failed`. [#19225](https://github.com/ollama/ollama/pull/19225)
11. **🟡 `OLLAMA_CONTEXT_LENGTH` không được phản ánh** trong `/api/show` hay `/api/tags`. [#18995](https://github.com/ollama/ollama/issues/18995)
12. **🟡 `mistral-large-4` cloud từ chối `role: "developer"`** với HTTP 400 (chặn client Codex). [#19021](https://github.com/ollama/ollama/issues/19021) — PR sửa: [#19199](https://github.com/ollama/ollama/pull/19199)
13. **🟡 Không thể tắt thinking của Gemma4 một cách đáng tin cậy** qua API tương thích OpenAI. [#19217](https://github.com/ollama/ollama/issues/19217)
14. **🟡 Lỗi parser tool-call:** Qwen3-Coder bỏ call khi đối số có chuỗi `</function>` nguyên văn — PR sửa [#19228](https://github.com/ollama/ollama/pull/19228); Gemma4 bỏ các tool call hoàn chỉnh nối sau bởi nhiễu `$$` — PR sửa [#19226](https://github.com/ollama/ollama/pull/19226).
15. **🟡 Assert GGML của `rnj-1`** trên SWA hparams từ >0.3x. [#18924](https://github.com/ollama/ollama/issues/18924)
16. **🟡 Liệt kê model trùng lặp** sau khi di chuyển GGUF tương thích cục bộ. [#18830](https://github.com/ollama/ollama/issues/18830)

Các PR sửa lỗi đã landed:
- Lỗi `model not found` không liên tục do bug chuẩn hóa `getExistingName` — [#18438](https://github.com/ollama/ollama/pull/18438) (CLOSED/đã merge)
- Grok FA bị buộc tắt khi đặt lượng tử hóa KV cache — [#15050](https://github.com/ollama/ollama/pull/15050)
- Lỗi `Run` phía server bị nuốt ở phía ứng dụng giờ đã được ghi log — [#19179](https://github.com/ollama/ollama/pull/19179)
- Giữ tin nhắn người dùng cuối cùng khi cắt ngắn context — [#19058](https://github.com/ollama/ollama/pull/19058)

## 6. Điều này có nghĩa gì với lập trình viên ứng dụng
- **Đừng phụ thuộc vào Ollama Cloud cho workload production lúc này.** Issue lỗi 95% trên Pro ([#15453](https://github.com/ollama/ollama/issues/15453)) và bug suy thoái đang diễn ra trên `glm-5.3-flash:cloud` ([#18980](https://github.com/ollama/ollama/issues/18980)) chưa được giải quyết và ảnh hưởng tới nhiều model cloud chủ lực. Hãy xây dựng đường dự phòng cục bộ.
- **Ghim phiên bản cục bộ của bạn.** 0.40.x có một cụm lỗi hồi quy (panic `Maximum threads` của MLX trên 0.40.0, Vulkan chậm 30 lần trên 0.40.8, reset TCP trên Windows với 0.40.4). 0.35.1 được nhắc đến như bản dự phòng ổn định cho người dùng MLX trên macOS.
- **Tool-calling là mặt trận phát triển đang hoạt động.** Nếu bạn dựa vào tool call có cấu trúc, hãy chuẩn bị cho các lỗ hổng parser tạm thời — chuỗi `</function>` nguyên văn, nhiễu phía sau JSON của Gemma4, và việc âm thầm bỏ qua các tên tool ngoài schema đều đang được sửa tích cực. Hãy kiểm chứng phản hồi thay vì tin các payload rỗng, đặc biệt khi `eval_count > 0` nhưng nội dung trống ([#19187](https://github.com/ollama/ollama/issues/19187)).
- **Bề mặt tương thích OpenAI đang được siết chặt.** Xử lý role `developer` ([#19199](https://github.com/ollama/ollama/pull/19199)), sự kiện `response.failed` khi lỗi streaming ([#19225](https://github.com/ollama/ollama/pull/19225)), và metadata model cloud theo từng launcher ([#19223](https://github.com/ollama/ollama/pull/19223)) đều cải thiện tính tương đồng với client OpenAI (Codex, Aider, v.v.). Nếu bạn định tuyến qua gateway, hãy nâng cấp khi bản 0.41.x ra mắt.
- **Kiểm soát KV cache đang đến.** Kiểu KV cache ở cấp Modelfile ([#16245](https://github.com/ollama/ollama/issues/16245)), `num_predict=-2` động ([#9547](https://github.com/ollama/ollama/pull/9547)), và framework KV connector được đề xuất ([#17696](https://github.com/ollama/ollama/issues/17696)) đều hướng tới khả năng kiểm soát cấp inference engine nhiều hơn — hữu ích cho triển khai 30B+ bị hạn chế bộ nhớ và cho bất kỳ ai xây gateway cần ngân sách bộ nhớ xác định.
- **Theo dõi sát issue Vulkan/AMD** nếu bạn chạy phần cứng AMD tiêu dùng ([#19201](https://github.com/ollama/ollama/issues/19201)): tắt prompt cache là cách xử lý tạm hiện tại cho tới khi có bản sửa.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-10-23

## Điểm nổi bật hôm nay
Câu chuyện chính là **sự cố xâm phạm chuỗi cung ứng của LiteLLM v1.107.0** (Issue [#47826](https://github.com/BerriAI/litellm/issues/47826)): một bản build độc hại được phát hành qua repo giả mạo (`Berri-AI/litellm`) chứa `cook.pth` đánh cắp thông tin đăng nhập và `sitecustomize` loader RCE. PyPI đã gỡ bản phát hành này và các Docker tag `latest`/`main-latest`/`main-stable` đã bị thu hồi, nhưng một yêu cầu backport ([#47904](https://github.com/BerriAI/litellm/issues/47904)) cho thấy các image stable 1.106.x vẫn tin tưởng một root CA nối vào sự cố xâm phạm. Ngoài ra, các công việc quan trọng vẫn tiếp tục trên việc tăng cường bảo mật proxy — streaming, hạch toán cache, công bằng router, và một đợt refactor typing lớn — dù không có bản phát hành mới nào trong 24h qua.

## Phát hành & Thay đổi phá vỡ tương thích
- **Không có bản phát hành mới trong 24h qua.**
- **v1.107.0 bị thu hồi**: PyPI đã gỡ và GHCR/Docker Hub `latest`, `main-latest`, `main-stable` được gắn lại tag. Người dùng đang ghim vào 1.107.0 phải hạ cấp/ghim lại rõ ràng và xoay vòng thông tin đăng nhập — xem [#47826](https://github.com/BerriAI/litellm/issues/47826).
- **Lỗ hổng tin cậy CA trên 1.106.x**: bản sửa eMudhra root CA (#47670) chỉ có trên `main`; đã yêu cầu backport sang `stable/1.106.x` cho v1.106.3 ([#47904](https://github.com/BerriAI/litellm/issues/47904)).

## Hỗ trợ Model & Phần cứng mới
- **DashScope realtime (WebSocket)** đã được thêm, với handler tùy chỉnh cho định dạng wire không theo chuẩn OpenAI của DashScope — PR [#40579](https://github.com/BerriAI/litellm/pull/40579).
- **Speechify TTS** provider đã được thêm cho `/v1/audio/speech`, hỗ trợ `simba-3.5`, `simba-3.2`, `simba-3.0` — PR [#47990](https://github.com/BerriAI/litellm/pull/47990).
- **Đếm token cục bộ cho Gemini** giờ chuyển đổi `contents` của Gemini trước khi ước lượng, tránh HTTP 500 trên `/utils/token_counter` — PR [#41286](https://github.com/BerriAI/litellm/pull/41286).
- **Yêu cầu provider**: đã yêu cầu liệt kê Nano-Gpt trên UI ([#34499](https://github.com/BerriAI/litellm/issues/34499)).

## Hiệu năng & Tối ưu hóa
- **Sửa lỗi router least-busy**: so sánh strictly less-than khiến toàn bộ lưu lượng dồn vào deployment đầu tiên khi số in-flight bằng nhau; PR [#23924](https://github.com/BerriAI/litellm/pull/23924) (đã đóng) sửa lại việc chọn.
- **Race condition trong định tuyến theo độ trễ**: lost-update trong `async_log_success_event` làm định tuyến theo độ trễ suy giảm thành weighted random dưới tải đồng thời ([#24720](https://github.com/BerriAI/litellm/issues/24720)).
- **Retry-After bị bỏ qua** đối với các nhóm model nhiều deployment dùng chung upstream bị rate-limit, gây retry ngay lập tức ([#34399](https://github.com/BerriAI/litellm/issues/34399)).
- **Retry streaming**: các stream Gemini bị ngắt trước sự kiện SSE đầu tiên giờ được retry thay vì trả lỗi trong stream ở HTTP 200 — PR [#45750](https://github.com/BerriAI/litellm/pull/45750).
- **Refactor type-checking**: 1.181 lỗi `Any` của basedpyright đã được dọn sạch trên 431 file; QA báo cáo hành vi giống hệt khi gọi thật tới OpenAI/Anthropic — PR [#47789](https://github.com/BerriAI/litellm/pull/47789).

## Ổn định & Hồi quy
Xếp theo mức độ nghiêm trọng:

1. **Xâm phạm chuỗi cung ứng (Nghiêm trọng)** — v1.107.0 đánh cắp thông tin đăng nhập + RCE, repo giả mạo. Đang tiếp tục khoanh vùng; tin cậy CA vẫn yếu trên 1.106.x. [#47826](https://github.com/BerriAI/litellm/issues/47826), [#47904](https://github.com/BerriAI/litellm/issues/47904)
2. **Nạp body lỗi từ upstream không giới hạn (Cao)** — một HTTP 400 ~114 MB từ backend gây nghẽn event-loop và RSS phình to qua regex masking. [#34031](https://github.com/BerriAI/litellm/issues/34031)
3. **Cạn kiệt max_connections của Postgres (Cao)** — tất cả API key người dùng đều lỗi trong proxy nhiều worker khi pool DB bị bão hòa. [#34479](https://github.com/BerriAI/litellm/issues/34479)
4. **Key của team đã xóa vẫn còn hiệu lực xác thực (Cao)** — `POST /team/delete` không loại khỏi auth cache (ngược với `/key/delete`). [#34217](https://github.com/BerriAI/litellm/issues/34217)
5. **DB gián đoạn tạm thời → "Invalid model name" (Trung bình)** — worker sau HAProxy/Postgres bị chập chờn từ chối các model hợp lệ. [#26237](https://github.com/BerriAI/litellm/issues/26237)
6. **Timeout báo "None seconds"** ([#14635](https://github.com/BerriAI/litellm/issues/14635)); **UI login chuyển hướng tới IP container sau nginx** ([#30118](https://github.com/BerriAI/litellm/issues/30118)); **Bedrock replay SigV4 cũ khi retry** ([#27513](https://github.com/BerriAI/litellm/issues/27513)); **custom pricing `input_cost_per_token: 0` bị ghi đè khi reload** ([#30081](https://github.com/BerriAI/litellm/issues/30081)); **`response_cost=null` khi provider khác dòng pricing** ([#47675](https://github.com/BerriAI/litellm/issues/47675)).
7. **Các edge case Claude Code / Anthropic adapter** — `tool_use.input` trong streaming bị mất với Gemini/Gemma ([#25390](https://github.com/BerriAI/litellm/issues/25390)); `reasoning.effort` không được hỗ trợ trên Azure Foundry ([#27091](https://github.com/BerriAI/litellm/issues/27091)); `thinking.type=adaptive` bị complexity router từ chối ([#26224](https://github.com/BerriAI/litellm/issues/26224)); `drop_params` bị bỏ qua khi map metadata Anthropic→Responses ([#26241](https://github.com/BerriAI/litellm/issues/26241)); PR passthrough giữ nguyên adaptive thinking [#41243](https://github.com/BerriAI/litellm/pull/41243).
8. **Ngữ nghĩa hạch toán chi phí** — cache hit không tính chi phí nhưng phát lại số token gốc, đặt ra câu hỏi mở về việc tổng hợp dựa trên cơ sở nào ([#39057](https://github.com/BerriAI/litellm/issues/39057)).

## Điều này có nghĩa gì với nhà phát triển ứng dụng
- **Coi v1.107.0 là đối tượng thù địch.** Nếu bạn đã build bất cứ thứ gì dựa trên nó, hãy xoay vòng API key, thông tin đăng nhập cloud, và mọi secret mà tiến trình có thể truy cập; xác minh digest của image so với các tag trước 1.107.0; đừng tin `latest`/`main-stable` cho đến khi upstream thông báo lại.
- **Ghim theo digest, không ghim theo tag.** Việc gắn lại tag trong sự cố cho thấy tag động không phải là ranh giới an toàn. Ghim theo SHA và dùng mirror riêng có kiểm soát admission.
- **Bảo vệ proxy đa tenant.** Lỗi cạn kiệt Postgres và key team cũ có nghĩa là một noisy neighbor duy nhất có thể vô hiệu hóa xác thực trên toàn bộ tenant — giới hạn kết nối mỗi worker và kiểm tra lại việc vô hiệu hóa cache của `/team/delete` trong deployment của bạn.
- **Dự trù giới hạn body lỗi.** Nếu bạn route tới các backend tương thích OpenAI có thể phát ra validation dump lớn, hãy đặt LiteLLM sau một giới hạn kích thước body; tình trạng nghẽn event-loop trong [#34031](https://github.com/BerriAI/litellm/issues/34031) là vấn đề cấp độ DoS.
- **Chờ đợi các bản sửa định tuyến dần dần.** Định tuyến theo độ trễ dưới tải không đáng tin cho đến khi [#24720](https://github.com/BerriAI/litellm/issues/24720) và [#34399](https://github.com/BerriAI/litellm/issues/34399) được xử lý — ưu tiên weighted hoặc least-busy với PR đã sửa (#23924) cho các workload nhạy cảm về công bằng.
- **Hạch toán cache cần một quyết định.** Nếu bạn tính phí theo token, hãy đối chiếu các dòng cache hit ([#39057](https://github.com/BerriAI/litellm/issues/39057)) trước khi chốt sổ hàng tháng, nếu không bạn sẽ đếm trùng token so với chi phí bằng không.
- **Tích hợp agent/serving đang được cải thiện**: DashScope realtime, Speechify TTS, và các bản sửa đếm token Gemini mở rộng bề mặt đa phương thức; các đường dẫn Claude Code tiếp tục tích lũy nhiều lỗi adapter hẹp, nên hãy kiểm thử tool-calling và cấu hình `thinking` đầu-cuối theo từng provider.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới nào trong 24 giờ qua, nhưng hàng đợi PR hoạt động bất thường: một loạt lớn các PR do `danielhanchen` tạo đã được merge, nổi bật là **stack "Flows" của Studio** (#14730 và các PR phụ thuộc #14889–#14893), biến notebook, benchmark, eval và pipeline ảnh/video thành các khối flow có thể kết hợp. Về phía inference, **FP8 dequant đã được gộp thành một lượt Triton duy nhất** (#14886) và **bản sửa lỗi biên dịch lại theo bucket của flash-attention trên ROCm** (#14869) nhắm vào một điểm nghẽn throughput thực sự. Công việc về độ ổn định tập trung vào **tải GGUF làm crash máy chủ Studio trên Windows** (#14513 → bản sửa #14514) và **chỉnh sửa tin nhắn assistant** (#13938, đã đóng).

---

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

Không có bản phát hành mới, tag mới hay tăng phiên bản nào trong 24 giờ qua. Một thay đổi phá vỡ tương thích về vận hành đáng lưu ý cho người dùng CI:

- **`uv` được ghim ở 0.13.5, các bản cũ hơn 0.13.4 bị thay thế** — Khắc phục GHSA-hq85-5cpj-mr62 (chứng chỉ trung gian khóa yếu emSign ECC Root CA G3). Môi trường cài đặt sẽ bị buộc nâng cấp. [PR #14894](https://github.com/unslothai/unsloth/pull/14894)
- **Đã giải quyết phàn nàn về tải của pre-commit.ci** — `scripts/enforce_kwargs_spacing.py` bị đánh dấu là chưa được tối ưu nghiêm trọng và tiêu tốn tài nguyên CI không tương xứng trên toàn hệ sinh thái ([#14174](https://github.com/unslothai/unsloth/issues/14174), đã đóng). PR định dạng tiếp theo [#14885](https://github.com/unslothai/unsloth/pull/14885) sửa hai tệp đã được merge mà chưa định dạng trong #14821/#14886.

---

## 3. Hỗ trợ Model & Phần cứng mới

- **DeepSeek-V4.1-Flash (`deepseek41-dspark`) không tải được trong Studio** — Bản llama.cpp đi kèm không nhận diện kiến trúc này. Người dùng cần llama.cpp mới hơn; chưa có PR sửa. [Issue #14695](https://github.com/unslothai/unsloth/issues/14695)
- **Chat template lớn hơn (tới 8 MB)** — Giới hạn 64 KB hiện tại chặn các model như template ~230 KB của DavidAU; giới hạn Jinja của llama.cpp là 8 MB. [Issue #14841](https://github.com/unslothai/unsloth/issues/14841)
- **Tách expert hot/cold của MoE giữa GPU+CPU** — Tính năng được yêu cầu để đặt expert theo kiểu hybrid trên các checkpoint MoE mới. [Issue #14484](https://github.com/unslothai/unsloth/issues/14484)
- **Inference OmniVoice + LoRA/full fine-tune trong UI Studio** — Yêu cầu tính năng hỗ trợ UI chính thức. [Issue #14660](https://github.com/unslothai/unsloth/issues/14660)
- **Giới hạn VRAM cho huấn luyện trên Intel XPU / Apple MPS** — Mới một phần; VRAM Budget cho inference GGUF đã có trong #8589, giới hạn huấn luyện XPU/MPS và image-gen tuân theo ngân sách vẫn đang chờ. [Issue #8178](https://github.com/unslothai/unsloth/issues/8178)
- **Cluster hai node DGX Spark + huấn luyện pipeline** — GB10/aarch64/sm_121a với ConnectX-7 200GbE; đã đo trên phần cứng thật. Vẫn đang review. [PR #10280](https://github.com/unslothai/unsloth/pull/10280)
- **Sửa thang fallback Vulkan cho Arc/ROCm** — Một lần "device lost" thoáng qua của Vulkan không còn bị tính là một strike; iGPU UHD cùng tồn tại với card rời không còn phủ quyết Vulkan. [PR #14610](https://github.com/unslothai/unsloth/pull/14610)

---

## 4. Hiệu năng & Tối ưu hóa

- **Dequant FP8 per-tensor / rowwise → một lượt Triton duy nhất** — `weight_dequant` trước đây ghi một bản sao 16-bit rồi đọc lại để scale; giờ chỉ một lượt trên các byte e4m3fn. Giảm trực tiếp chi phí của mọi lượt backward LoRA trên các checkpoint FP8 rowwise của FBGEMM và compressed-tensors. [PR #14886](https://github.com/unslothai/unsloth/pull/14886) (đã merge)
- **ROCm flash-attention: loại bỏ việc biên dịch lại theo từng bucket** — Các cạnh bucket đang chặn theo độ dài query tượng trưng, nên việc vượt qua một ranh giới lũy thừa của hai buộc phải biên dịch lại. Kết quả giờ đã được cache; bản sao CFG cũng được gated. [PR #14869](https://github.com/unslothai/unsloth/pull/14869)
- **RoPE cache khởi tạo nguội dưới `torch.compile`** — Một cache lazy theo từng thiết bị được xây dựng bên trong vùng đã compile bị trace lại vì `torch.is_inference_mode_enabled()` không thể trace bởi Dynamo; bản sửa đang được review. [PR #14728](https://github.com/unslothai/unsloth/pull/14728)
- **Đồng bộ trọng số GRPO LoRA sang engine vLLM của TRL (TRL < 0.28)** — Với `use_vllm=True, fast_inference=False` trên TRL 0.22–0.27, `_move_model_to_vllm` trả về sớm cho các model PEFT/lượng tử hóa, nghĩa là *mọi rollout trong toàn bộ lần chạy đều dùng trọng số ban đầu* trong khi trông như đang huấn luyện. Bản sửa giờ đẩy trọng số LoRA đúng cách và từ chối các base đã lượng tử hóa. Đây là bản sửa tính đúng đắn với ảnh hưởng lớn đến throughput/chất lượng. [PR #14831](https://github.com/unslothai/unsloth/pull/14831)
- **Lỗi masking dataset đã pre-tokenize** — `completion_mask` / `assistant_masks` không được cắt ngắn cùng với `input_ids`/`labels`, và collator của TRL áp dụng chúng vào span sai. [PR #14884](https://github.com/unslothai/unsloth/pull/14884)
- **Sinh không shard của FSDP2 native trên torch 2.6/2.7** — Các vòng lặp `Accelerator` tùy chỉnh âm thầm rơi về DDP thường (không shard param/optimizer) kể từ #14273. [PR #14882](https://github.com/unslothai/unsloth/pull/14882)

---

## 5. Độ ổn định & Hồi quy (xếp hạng)

1. **Huấn luyện GRPO âm thầm không có tác dụng trên TRL 0.22–0.27** — Toàn bộ lần chạy huấn luyện trên trọng số rollout cũ. PR sửa [#14831](https://github.com/unslothai/unsloth/pull/14831). *Mức độ nghiêm trọng cao nhất: lỗi đúng đắn âm thầm.*
2. **Tải GGUF trong Studio làm crash máy chủ Windows** — Cạn kiệt system commit thay vì đi theo đường low-memory (Windows 10 22H2). PR sửa [#14514](https://github.com/unslothai/unsloth/pull/14514). [Issue #14513](https://github.com/unslothai/unsloth/issues/14513)
3. **Embedding lưu trữ hội thoại trên CPU làm đình trệ inference, Stop không hiệu quả** — Các cuộc trò chuyện dài, nhiều tool trên v0.1.909-beta (Ryzen AI MAX+ 395) tốn hàng phút trong embedding CPU trước khi llama.cpp thấy yêu cầu. Stop không hủy được quá trình lưu trữ. [Issue #14519](https://github.com/unslothai/unsloth/issues/14519) — *mở, chưa có PR sửa*
4. **Tệp đính kèm trở nên vĩnh viễn không đọc được sau auto-compaction; `search_conversation` không bao giờ được gọi** — Mất dữ liệu trong các cuộc trò chuyện dài. [Issue #14708](https://github.com/unslothai/unsloth/issues/14708) — *mở*
5. **Đồng bộ model trên LAN nhiều người dùng** — Nhiều tài khoản trên một máy chủ inference cục bộ không thấy được model đang được tải. [Issue #12365](https://github.com/unslothai/unsloth/issues/12365) — đã đóng.
6. **Inference LoRA trên Intel XPU trộn tham số linker GNU/MSVC trên Windows** — Lỗi build trên Windows 10 26200. [Issue #14807](https://github.com/unslothai/unsloth/issues/14807) — *mở*
7. **Model có remote code không thể export từ UI**. [Issue #14688](https://github.com/unslothai/unsloth/issues/14688) — *mở*
8. **Chat/model của Lemonade & FastFlowLM ngừng hoạt động** sau khi thiết lập thành công ban đầu trên Ryzen AI 7 350 / Ubuntu 26.10 (hồi quy của #11743). [Issue #14650](https://github.com/unslothai/unsloth/issues/14650) — *mở*
9. **Qwen3-ASR bỏ qua ngôn ngữ phiên âm được yêu cầu trong backend mtmd**. [Issue #14547](https://github.com/unslothai/unsloth/issues/14547) — đã đóng.
10. **Context parallel không được hỗ trợ cho Qwen3.5 GatedDeltaNet** (40 layer, 30 recurrent) — không có sharding FSDP2 cho mô hình hybrid. [Issue #12051](https://github.com/unslothai/unsloth/issues/12051) — đã đóng.

---

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Nếu bạn đang chạy GRPO trên TRL < 0.28 với `use_vllm=True` và `fast_inference=False`, quá trình huấn luyện của bạn gần như chắc chắn không có tác dụng.** Hãy nâng cấp TRL hoặc áp dụng #14831 trước khi tin vào bất kỳ kết quả GRPO nào. Đây là mục quan trọng nhất trong bản digest này.
- **Người dùng Studio trên Windows tải GGUF lớn nên chờ đến khi #14514 được merge** — chế độ thất bại hiện tại là crash máy chủ cứng thay vì fallback low-memory mượt mà.
- **Theo dõi stack Studio Flows (#14730 + #14889–#14893).** Polling job, đầu ra từng phần, tham số có thể bind, GPU lease, và các khối notebook/benchmark/eval native đang đến dưới dạng primitive opt-in. Các flow hiện tại không thay đổi, nhưng đây là hướng đi cho bất kỳ ai đang script pipeline nhiều bước trên Unsloth hôm nay.
- **Hỗ trợ custom-header cho nhà cung cấp từ xa (#14811) vẫn còn thiếu** — nếu bạn định tuyến qua LiteLLM và phụ thuộc vào header để theo dõi hoặc chọn tính năng, bạn chưa thể truyền chúng.
- **Người dùng checkpoint FP8 được lợi thực sự ở lượt backward** từ #14886 mà không thay đổi API; an toàn để áp dụng.
- **Agent hội thoại dài trên Desktop nên được rà soát cho vấn đề đình trệ embedding lưu trữ (#14519) và mất tệp đính kèm sau compaction (#14708)** — cả hai đều ảnh hưởng cụ thể đến workload agentic nhiều tool và chưa có bản sửa.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*