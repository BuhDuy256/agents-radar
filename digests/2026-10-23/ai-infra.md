# Bản tin hạ tầng AI 2026-10-23

> Tạo lúc: 2026-10-23 05:49 UTC | Dự án theo dõi: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## So sánh chéo dự án

# Báo cáo So sánh Liên dự án — Hệ sinh thái Hạ tầng AI
**Ngày tổng hợp: 2026-10-23 | Dự án: vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth**

---

## 1. Tổng quan Hệ sinh thái

Hệ sinh thái đang ở **giai đoạn gia cố**, không phải mở rộng tính năng: mọi dự án trong bản tổng hợp này đều bị chi phối bởi công việc về tính đúng đắn, bảo mật và ổn định thay vì các bản phát hành lớn. Hai sự cố định hình bối cảnh — **vụ xâm phạm chuỗi cung ứng của LiteLLM 1.107.0** và **lỗi hỏng KV âm thầm dưới PD disaggregation của vLLM** — cả hai đều là lỗi thuộc nhóm toàn vẹn dữ liệu/bảo mật chứ không phải suy giảm hiệu năng. Đồng thời, biên giới đang phân nhánh theo phần cứng: ROCm (MI3xx), Intel XPU/SYCL, Qualcomm Hexagon, T-Head SAIL, và các làn Adreno/NPU tiêu dùng đều có công việc bring-up hôm nay, trong khi CUDA trên Hopper/Blackwell hấp thụ phần lớn sự chú ý tối ưu hóa. Chủ đề kiến trúc sôi động nhất xuyên suốt vLLM, SGLang và llama.cpp là **các mô hình hybrid ngữ cảnh dài (Gated DeltaNet / lớp Qwen3.8)**, đang cho thấy hiện tượng sụp đổ decode không an toàn cho production ở mức 80K+ token trên nhiều backend.

---

## 2. So sánh Mức độ Hoạt động

| Dự án | Issues (đang hoạt động, 24h qua) | PRs (mở/đã merge, 24h qua) | Bản phát hành | Nhóm Rủi ro Chính |
|---|---|---|---|---|
| **vLLM** | ~6 mức độ nghiêm trọng cao nổi lên | Nhiều (Disagg, ROCm, MoE, spec-decode) | Không | **Tính đúng đắn / cô lập dữ liệu** (KV crosstalk) |
| **SGLang** | 9 regression đã xếp hạng + CI tracker (123 bình luận) | Nhiều (SAIL, XPU, MoE, diffusion) | Không | **Tính đúng đắn + Bất ổn CI** |
| **llama.cpp** | ~10 regression đã xếp hạng | ~15+ PRs; 10 bản build b11815–b11829 | **10 bản build** | **Sụp đổ decode ngữ cảnh dài + Bảo mật RPC** |
| **Ollama** | 12 đã xếp hạng (1 nghiêm trọng, 1 cao) | Một số (MLX, tool-calling, streaming) | Không | **Độ tin cậy Cloud Pro (thất bại 95%)** |
| **LiteLLM** | 14 đã xếp hạng (1 CRITICAL) | Lớn (dọn dẹp typing 431 file, sửa proxy) | Không (backport đang chờ) | **Xâm phạm chuỗi cung ứng** |
| **Unsloth** | ~13 đã xếp hạng | ~13 PRs (FSDP2, ROCm, Studio) | Không | **Fallback CPU âm thầm / FSDP2 4-bit** |

**Nhận xét:** Tốc độ phát hành tương quan nghịch với tầng — llama.cpp (runtime cục bộ, nhịp lặp nhanh nhất) phát hành 10 bản build; các serving engine và gateway phát hành zero. Gánh nặng ổn định tỷ lệ thuận với bán kính ảnh hưởng: LiteLLM và vLLM mang các issue nghiêm trọng nhất vì chúng nằm gần nhất với thông tin xác thực và dữ liệu giữa các request.

---

## 3. Cuộc đua Hỗ trợ Mô hình

| Mô hình / Kiến trúc | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek V4.1-Flash** | ✅ ROCm monokernel; ⚠️ thiếu SM8x (#50576) | ✅ đường MXFP8 | ✗ (arch không nhận diện trong Studio GGUF) | — | ✗ (load thất bại) |
| **GLM-5.x / 5.3-Flash** | Chỉ perf tracker | ✅ Hopper tracker + sửa EAGLE | ✅ tiết kiệm VRAM QSA | ✅ (metadata harness) | — |
| **Kimi-K3** | ✅ Vision tower + MegaMoE trên ROCm | ⚠️ DCP a2a bị lỗi (có workaround) | — | ✅ cloud | — |
| **Qwen3.8 / 3.5** | Tracker đang mở | — | ⚠️ Sụp đổ ngữ cảnh dài | ✅ YaRN (MLX) | ⚠️ thiếu sharding FSDP2 |
| **Nemotron 3.5 Bolt 74B-A9B** | — | — | ✅ đã sửa GQA/tokenizer | ✅ MLX (mới) | — |
| **MiniCPM-OCR 1.0** | — | — | ✅ mtmd | — | — |
| **MiniMax-M3.1-Flash** | ✅ công thức MI355X PD | — | — | — | — |
| **T-Head SAIL / Zhenwu** | — | ✅ **PR kernel đầu tiên** | — | — | — |
| **Muse Spark / SANA-Sprint** | — | Roadmap / yêu cầu | — | — | — |
| **OmniVoice** | — | — | — | — | Yêu cầu tính năng |

**Ai đang dẫn đầu:**
- **vLLM** dẫn đầu về **chiều sâu AMD ROCm** (Kimi-K3, MiniMax, DeepSeek monokernel) và **khả năng mở rộng speculative decoding** (đăng ký draft ngoài cây).
- **SGLang** dẫn đầu về **bring-up phần cứng tiên phong** (T-Head SAIL, Intel XPU SYCL indexer) và **pipeline Muse Spark Day-0**.
- **llama.cpp** dẫn đầu về **độ phủ hỗ trợ quantized cục bộ** và nhịp độ áp dụng mô hình nhanh nhất (MiniCPM-OCR, Nemotron, GLM-5 QSA).
- **Ollama** dẫn đầu về **ngữ cảnh dài MLX-native** (YaRN cho Qwen3) và metadata cloud nhận biết harness.
- **Khoảng trống của ngày:** A100/A800/RTX 30xx (SM8x) vẫn **bị chặn với DeepSeek-V4-Flash** với khối lượng 118 bình luận và không có đường triển khai — một ràng buộc quan trọng cho việc lập kế hoạch dung lượng.

---

## 4. Biên giới Hiệu năng

Nỗ lực **phân bổ không đồng đều trên năm mặt trận**:

**KV Cache (cường độ cao nhất)**
- vLLM: NVFP4 KV tại head_dim 512 (Gemma 4), lượng tử hóa MLA Kimi-K2.x, lập lịch spec nhận biết độ dài ngữ cảnh (#48627)
- SGLang: NVFP4 + spec decode **không tương thích** (#36010); KVShard cho MTP (#40929); sụp đổ tầng host HiCache trên GDN hybrid (#45400)
- Chủ đề chung: **KV cache lượng tử hóa đang xung đột với speculative decoding và prefix caching** — ba tối ưu hóa chưa thể kết hợp được với nhau.

**Lượng tử hóa**
- llama.cpp: `GGML_TYPE_BF16X` mới (11.5 bpw gần như không mất mát); sửa encoder UE4M3
- vLLM: block Hadamard input rotation cho MXFP4; Quark online-rotation
- SGLang: đường producer MXFP8 hợp nhất vào đồ thị prefill có thể ngắt
- Unsloth: lỗi NVFP4 token over-match (Studio); sửa lỗi merge 4-bit FSDP2

**Phục vụ Phân tán / Disaggregated**
- vLLM: **NIXL/PD là tâm chấn rủi ro** — hết hạn KV lease (#61229) và crosstalk prefix-cache (#61160)
- llama.cpp: truyền thông tensor-parallel SYCL **+19% prompt-eval** (dual Arc Pro B70); SYCL graph replay
- SGLang: sharding LTX-2 refiner; vấn đề đăng ký đồ thị NCCL DCP a2a trên GB300

**Kernel**
- vLLM: sửa sentinel sparse prefill DeepSeek-V4.1 (giảm workspace memset); đọc Engram peer-HBM
- SGLang: QSA prefill gather; chồng PR bảo toàn workspace MoE (5 PRs)
- llama.cpp: hợp nhất toán tử AMD/NPU; tinh chỉnh split-K RDNA4

**Batching / Lập lịch**
- vLLM: tracker bất định batch-invariance (#27433); chọn K spec nhận biết độ dài ngữ cảnh
- llama.cpp: **MoE expert offload** — hai thiết kế cạnh tranh (GPU-LRU #27861 vs CPU-share #30966)
- SGLang: lỗi bất định requeue preemption ưu tiên (#45812)

**Tín hiệu:** Biên giới đã chuyển từ thông lượng thô sang **khả năng kết hợp các tối ưu hóa** — các vấn đề khó giờ là lỗi tương tác "lượng tử hóa × spec decode × prefix cache × disaggregation", không phải thắng lợi từ kỹ thuật đơn lẻ.

---

## 5. Định vị Tầng

| Tầng | Dự án | Vai trò trong Stack | Tối ưu hóa Chính cho | Bán kính Ảnh hưởng Khi Lỗi |
|---|---|---|---|---|
| **Serving engine** (datacenter) | **vLLM, SGLang** | Suy luận đa thuê bao thông lượng cao; PD disaggregation, MoE, TP/EP | Tokens/giây/GPU, TTFT, cô lập giữa các request | **Cao** — ô nhiễm giữa các request là sự kiện bảo mật |
| **Runtime cục bộ** (edge/desktop) | **llama.cpp, Ollama** | Suy luận đơn người dùng / fleet nhỏ trên silicon tiêu dùng + tăng tốc | Độ phủ mô hình, linh hoạt quant, cold-start | **Thấp–Trung bình** — nhưng gia cố RPC (llama.cpp) là RCE trước xác thực |
| **Gateway / proxy** | **LiteLLM** | Định tuyến đa nhà cung cấp, auth, ngân sách, khả năng quan sát | Chuẩn hóa nhà cung cấp, xử lý rate-limit, kế toán chi phí | **Nghiêm trọng** — phạm vi chuỗi cung ứng và thông tin xác thực |
| **Huấn luyện / tinh chỉnh** | **Unsloth** | LoRA/QLoRA, FSDP2, xuất checkpoint đã merge, UX Studio | Hiệu quả bộ nhớ, tính đúng đắn huấn luyện lượng tử hóa | **Trung bình** — fallback CPU âm thầm, lưu 4-bit hỏng |

**Khác biệt kiến trúc then chốt:** vLLM và SGLang là **những peer đang hội tụ về cùng một bộ tính năng** (disaggregation, MoE, spec decode, KV lượng tử hóa) — sự khác biệt nằm ở chiến lược phần cứng (ROCm-first vs CUDA-first) và độ trưởng thành CI. llama.cpp và Ollama chiếm các nấc liền kề: llama.cpp là **engine** (và ngày càng là một server), Ollama là **wrapper đã sản phẩm hóa** — nhưng bản digest của Ollama cho thấy wrapper đang thừa hưởng bug từ llama.cpp (prompt cache, reset TCP Windows) mà nó không thể sửa bên dưới tầng API của chính mình. LiteLLM và Unsloth nằm ở **hai đầu đối lập của vòng đời mô hình** và hiếm khi cạnh tranh.

---

## 6. Tín hiệu Xu hướng

**1. Rủi ro chuỗi cung ứng đã trở thành vấn đề của tầng suy luận.**
Trình đánh cắp `cook.pth` của LiteLLM 1.107.0 là mục nghiêm trọng nhất trong toàn bộ bản tổng hợp. Gateway là trung tâm thông tin xác thực; một image proxy bị xâm phạm có bán kính ảnh hưởng rộng hơn một engine bị xâm phạm. **Hành động:** ghim digest, xác minh image, xoay thông tin xác thực cho bất kỳ môi trường nào đã pull `latest` trong khoảng thời gian đó.

**2. Phục vụ phân tán chưa sẵn sàng production cho khối lượng công việc quan trọng về tính đúng đắn.**
Hết hạn KV lease NIXL và PD prefix-cache crosstalk của vLLM, cộng với bất tương thích NVFP4+spec và sụp đổ HiCache của SGLang, đều chỉ về cùng một hướng: **disaggregation, prefix caching và KV cache lượng tử hóa chưa được chứng minh là có thể kết hợp ở quy mô lớn.** Các nhà vận hành chạy khối lượng công việc ngữ cảnh dài sâu nên tắt prefix caching dưới PD cho đến khi các bản sửa được triển khai.

**3. Các mô hình hybrid ngữ cảnh dài (dòng Gated DeltaNet) là rủi ro hệ thống.**
Qwen3.8/3.5 và Nemotron cho thấy sụp đổ decode ở 80K+ trên CUDA, "token soup" trên SYCL, và logits rác trên RDNA4 Vulkan. Đây không phải bug của một nhà cung cấp — đây là khoảng trống trưởng thành kiến trúc. **Các nhà phát triển agent xây dựng trên cửa sổ ngữ cảnh lớn nên xác thực tổ hợp backend+mô hình+quant cụ thể của mình và ghim bản build.**

**4. Đa dạng phần cứng là thực nhưng có phân tầng.**
ROCm (MI3xx) đang trở thành mục tiêu phục vụ hạng nhất trong vLLM; Intel XPU/SYCL đang trưởng thành trong llama.cpp và SGLang; Qualcomm, Adreno và T-Head SAIL đang ở giai đoạn bring-up. **CUDA vẫn nhận được các bản sửa tính đúng đắn nhanh nhất; các làn phi CUDA tụt hậu về độ phủ CI.**

**5. Speculative decoding đang được sản phẩm hóa.**
Đăng ký plugin ngoài cây của vLLM (#62962) và chọn K nhận biết ngữ cảnh (#48627), cộng với công việc DFlash/MTP của llama.cpp/Unsloth, nghĩa là spec decode đang chuyển từ nghiên cứu sang runtime có thể cấu hình. Nhưng hiện tại nó **xung đột với KV cache NVFP4** (SGLang #36010) — chọn một trong hai cho mỗi triển khai.

**6. MoE trên phần cứng tiêu dùng là biên giới cụ

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới nào trong 24 giờ qua, nhưng hoạt động vẫn rất sôi động trên các nhánh ROCm, disaggregated-serving và MoE kernel. Những mục quan trọng nhất hôm nay là hai lỗi tính đúng đắn trong NIXL/PD disaggregation liên quan đến vòng đời KV block và prefix caching — một trong số đó đã xuất hiện dưới dạng "crosstalk" giữa các request trong các triển khai kiểu production ([#61229](https://github.com/vllm-project/vllm/issues/61229), [#61160](https://github.com/vllm-project/vllm/issues/61160)). Về phía công việc đang triển khai, việc xử lý sentinel DSv4.1 trong sparse-prefill combine kernel đang được sửa và đưa trở lại ([#63264](https://github.com/vllm-project/vllm/pull/63264), [#60613](https://github.com/vllm-project/vllm/pull/60613)), và các recipe ROCm MI3xx tiếp tục được mở rộng (Kimi-K3 MegaMoE, MiniMax-M3.1-Flash PD, DeepSeek-V4.1 monokernel).

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

Không có bản phát hành nào trong 24h qua. Một đợt dọn dẹp flag ảnh hưởng đến hành vi đang được tiến hành: [#61628](https://github.com/vllm-project/vllm/pull/61628) loại bỏ `VLLM_ROCM_AITER_MLA_DCP_VERIFY` và luôn chọn DCP multi-token verify kernel thông qua heuristic `auto` hiện có trên ROCm MLA. Hành vi mặc định không thay đổi; chỉ những trường hợp ghi đè rõ ràng biến môi trường cũ bị ảnh hưởng.

## 3. Hỗ trợ Model & Phần cứng mới

- **Hỗ trợ Ampere (SM8x) cho DeepSeek-V4-Flash / V4-Flash-0731** — feature request đã tồn tại lâu ([#50576](https://github.com/vllm-project/vllm/issues/50576), 118 bình luận). Cả hai checkpoint hiện không chạy được trên A100/A800 hay RTX 30xx; đây là khoảng trống năng lực mở có lượng truy cập cao nhất.
- **Kimi-K3 Vision Tower trên ROCm** — `torch.compile` + encoder CUDA graph capture (`cudagraph_mm_encoder`) cho `MoonViT3dPretrainedModel`/`KimiK25MultiModalProjector` trên MI300X/MI350X/MI355X ([#63086](https://github.com/vllm-project/vllm/pull/63086)).
- **Kimi-K3 MegaMoE trên ROCm** — đường dẫn AITER MegaMoE dạng opt-in, TP8 A8W4 eager khởi đầu, trên tám GPU gfx950 ([#63273](https://github.com/vllm-project/vllm/pull/63273)).
- **Recipe MiniMax-M3.1-Flash cho MI355X** — cụm PD (1P1D, TP4 mỗi vai trò), bố cục KV BLHNC, NIXL với 4 thread, Quark MXFP4, mono decode ([#63257](https://github.com/vllm-project/vllm/pull/63257)).
- **NVFP4 KV cache ở head_dim 512 (các lớp global của Gemma 4)** — thông qua FlashInfer trên SM100/SM103 (B200/B300); context attention materialize các trang NVFP4 sang FP8 ([#62117](https://github.com/vllm-project/vllm/pull/62117)).
- **Lượng tử hóa MLA cho Kimi-K2.5/K2.6** — đăng ký MLA attention với lượng tử hóa KV-cache compressed-tensors và ánh xạ các scale q/k/v từ checkpoint vào các module MLA lồng nhau ([#63097](https://github.com/vllm-project/vllm/pull/63097)).
- **PARD-2 parallel draft models** — parallel draft căn chỉnh theo target cho speculative decoding trên ModelRunnerV2 ([#49406](https://github.com/vllm-project/vllm/pull/49406)). Đăng ký spec-decode ngoài cây nguồn qua `vllm.general_plugins` cũng được đưa vào ([#62962](https://github.com/vllm-project/vllm/pull/62962)).
- **Kế hoạch hiệu năng GLM-5.3** ([#57406](https://github.com/vllm-project/vllm/issues/57406)) và **các tracker MI355X cho Qwen3.8-2.4T-A95B / Qwen3.8-Flash-Next** ([#57149](https://github.com/vllm-project/vllm/issues/57149), [#59575](https://github.com/vllm-project/vllm/issues/59575)) vẫn mở dưới dạng các tracker tối ưu hóa.

## 4. Hiệu năng & Tối ưu hóa

- **Sparse prefill DeepSeek-V4.1** — ghi các sentinel `-1` vào workspace của combine kernel thay vì memset toàn bộ workspace, sửa các index cũ và loại bỏ chi phí memset ([#63264](https://github.com/vllm-project/vllm/pull/63264), bản sửa xếp chồng [#60613](https://github.com/vllm-project/vllm/pull/60613)).
- **Tra cứu Engram của DeepSeek-V4.1** — đọc trực tiếp các bảng Engram GPU từ HBM của peer thay vì dùng collective DP `all_gather`/`all_to_all_single`, hướng tới FULL CUDA graph decode ([#62091](https://github.com/vllm-project/vllm/pull/62091)).
- **DeepSeek-V4.1 trên MI325X** — `--monokernel` được bật cho recipe TP MI325X; mono decode kernel chạy ở TP4, decode tối đa 42 hàng (7 request × 5 draft DSpark). MI300X không thay đổi ([#62713](https://github.com/vllm-project/vllm/pull/62713)).
- **Block Hadamard input rotation cho các lớp linear** — `mxfp4_hadamard32` online và checkpoint Quark online-rotation, bọc bất kỳ phương thức linear nào ([#62750](https://github.com/vllm-project/vllm/pull/62750)).
- **Batch invariance** — issue theo dõi tiếp tục đóng các khoảng trống nondeterminism còn lại ([#27433](https://github.com/vllm-project/vllm/issues/27433)).
- **Chi phí nạp trọng số trên GB10** — các bản sao H2D theo từng tensor từ các view mmap của safetensors được xác định là nút thắt của đường dẫn mặc định trên DGX Spark ([#58726](https://github.com/vllm-project/vllm/issues/58726)).
- **RFC Observability** cho một time tracker theo từng request/từng iteration (engine-step) ở mức thô, vượt ra ngoài PyTorch Profiler ([#39979](https://github.com/vllm-project/vllm/issues/39979)).
- **Lập lịch speculative nhận biết độ dài context** — mở rộng `num_speculative_tokens_per_batch_size` với bảng chọn K `(batch, ctx)` tùy chọn, tương thích ngược ([#48627](https://github.com/vllm-project/vllm/issues/48627)).

## 5. Ổn định & Suy giảm chất lượng

Xếp hạng theo mức độ nghiêm trọng; lưu ý liệu có PR sửa lỗi hay không.

1. **Hỏng KV âm thầm trong luồng pull của NixlConnector** ([#61229](https://github.com/vllm-project/vllm/issues/61229)) — producer giải phóng KV block khi `kv_lease` hết hạn trong khi một READ từ xa vẫn đang thực hiện; decode sau đó tiêu thụ KV đã bị ghi đè. Thuộc nhóm toàn vẹn dữ liệu, chưa có PR sửa lỗi nào được liên kết. **Ưu tiên cao nhất.**
2. **Nhiễm bẩn context giữa các request trong PD disaggregation với automatic prefix caching** ([#61160](https://github.com/vllm-project/vllm/issues/61160)) — phản hồi thỉnh thoảng chứa nội dung từ các request khác trên DeepSeek-V4.1-Flash + NIXL; sạch khi dùng `--no-enable-prefix-caching`. Có reproducer dạng script trên `/v1`. Liên quan đến tính đúng đắn/bảo mật, chưa có PR sửa lỗi nào được liên kết.
3. **Prefill DeepSeek-V4.1-Flash bị NaN/rác qua các sparse index cũ** ([#60613](https://github.com/vllm-project/vllm/pull/60613), [#63264](https://github.com/vllm-project/vllm/pull/63264)) — các PR sửa lỗi đang mở và sắp được đưa vào.
4. **Qwen3.8-Flash-Next trên GB10 cắt cụt prompt vượt quá `indexer_budget` (~2048 token)** ([#62776](https://github.com/vllm-project/vllm/issues/62776)) — model hành xử như thể prompt kết thúc ở khoảng ~2K token; không chỉ đơn thuần là truy xuất kém. Ảnh hưởng đến tính đúng đắn trên v0.32 nightly, chưa có PR sửa lỗi nào được liên kết.
5. **Tool calling PP2 bị lộn xộn trên GLM-5.2-FP8 DSA + chunked prefill, ROCm MI355X** ([#46262](https://github.com/vllm-project/vllm/issues/46262)) — PP1 hoạt động, PP2 bị lộn xộn; node 8× MI355X.
6. **Gemma 4 không khởi tạo được với lượng tử hóa KV cache theo per-token-head** ([#40388](https://github.com/vllm-project/vllm/issues/40388)) — lỗi tại thời điểm khởi tạo.
7. **Structured output hỏng với Qwen3 khi `enable_thinking=False`** ([#18819](https://github.com/vllm-project/vllm/issues/18819)) — hiện đã đóng/stale; 6 👍.

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Không chạy PD-disaggregated NIXL với prefix caching mặc định trên DeepSeek-V4.1-Flash cho đến khi #61160 và #61229 được giải quyết.** Nếu bạn cần disaggregation ngay bây giờ, hãy tắt prefix caching (`--no-enable-prefix-caching`) hoặc ghim vào một commit trước thay đổi lease-expiry và rà soát lại thời điểm giải phóng KV block của bạn. Crosstalk giữa các request là vấn đề về tính đúng đắn và cô lập dữ liệu, không chỉ là vấn đề hiệu năng.
- **Người dùng A100/A800 và RTX 30xx vẫn bị chặn với DeepSeek-V4-Flash.** Hãy hoạch định năng lực quanh SM9x/SM10x hoặc theo dõi #50576; tính đến hôm nay vẫn chưa có đường dẫn SM8x nào được đưa vào.
- **ROCm MI300X/MI325X/MI355X đang trở thành mục tiêu hạng nhất.** Kimi-K3 vision compile, MegaMoE, DeepSeek-V4.1 monokernel và các recipe MiniMax-M3.1-Flash PD đều đang được đưa vào hoặc đang trong PR. Nếu bạn chạy AMD, hãy kiểm chứng tổ hợp model/lượng tử hóa của bạn dựa trên các recipe này thay vì mặc định cho rằng tương đương với các mặc định trên CUDA.
- **Các phương thức spec-decode ngoài cây nguồn giờ đã có thể cắm vào** ([#62962](https://github.com/vllm-project/vllm/pull/62962)) — nếu bạn duy trì một scheme draft/verify tùy chỉnh, bạn không còn cần fork nữa; hãy đăng ký qua `vllm.general_plugins` và chọn theo tên trong `--speculative-config`.
- **Tinh chỉnh độ trễ đang có thêm một trục mới:** chọn K nhận biết độ dài context cho speculative decoding ([#48627](https://github.com/vllm-project/vllm/issues/48627)) sẽ cho phép bạn tinh chỉnh độ sâu draft theo cả batch size lẫn độ dài prompt, hữu ích cho các fleet hỗn hợp long-context/short-chat.
- **Với triển khai DGX Spark / GB10:** nạp trọng số hiện là một chi phí khởi động có thể đo được ([#58726](https://github.com/vllm-project/vllm/issues/58726)) — hãy dự trù thời gian cold-start cho phù hợp và theo dõi bản sửa.
- **Structured output + `enable_thinking=False`** trên Qwen3 trước đây đã bị hỏng ([#18819](https://github.com/vllm-project/vllm/issues/18819)); hãy kiểm chứng với phiên bản vLLM của bạn nếu bạn tắt thinking và dựa vào guided decoding.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Hoạt động chủ yếu xoay quanh đợt tăng tốc GLM-5.3-Flash (theo dõi hiệu năng trên Hopper, sửa lỗi khởi động speculative trên Blackwell) cùng đà mở rộng phần cứng: T-Head SAIL có PR attention-kernel đầu tiên, trong khi các nhánh XPU, AMD và NPU ghi nhận công việc về CI và tính năng. Bên cạnh đó, một loạt lỗi đúng đắn (correctness bug) xuất hiện quanh đường MoE routing / quantized-KV, và trình theo dõi flaky-CI (#42752) đã phình lên 123 bình luận, cho thấy tình trạng bất ổn vẫn tiếp diễn ở các làn test PR của NVIDIA.

## 2. Phát hành & Thay đổi phá vỡ tương thích

Không có. Không có bản phát hành nào trong 24h qua. Không có thay đổi phá vỡ API/config nào được đánh dấu hôm nay.

## 3. Hỗ trợ Model & Phần cứng mới

- **T-Head SAIL (Zhenwu 810/810E/M890P)**: PR #45946 bổ sung hỗ trợ attention SAIL FA3 và FlashMLA, tham chiếu roadmap #37519. Đây là lần đầu tiên nền tảng này được đưa lên thực sự ở mức kernel.
- **Intel XPU**: PR #35304 bổ sung embeddings NomicBERT/ModernBERT và hỗ trợ InternVL3_5; PR #45780 chuyển indexer mxfp4 của DeepSeek sang kernel SYCL.
- **Diffusion — SANA-Sprint 0.6B**: Yêu cầu tính năng #43671 cho hỗ trợ gốc model text-to-image 1024px với 1–4 bước.
- **Muse Spark**: Roadmap #44678 theo dõi hỗ trợ Day-0; thứ tự merge đã được ấn định (#44664 → #44667) với phụ thuộc DeepGEMM.
- **AMD CI**: Các PR #45882 (dispatch chỉ build), #45869/#45870 (song song hóa làn diffusion) cải thiện độ phủ ROCm.

## 4. Hiệu năng & Tối ưu hóa

- **GLM-5.3-Flash trên Hopper (SM90)**: Issue theo dõi #45373 (thuộc roadmap Q4 #42473) tập hợp công việc tối ưu kernel.
- **QSA prefill indexer gather**: PR #45752 tối ưu gather phía prefill.
- **DeepSeek-V4 MXFP8**: PR #45980 mở rộng đường producer MXFP8 hợp nhất vào đồ thị prefill có thể ngắt (breakable prefill graphs), loại bỏ một bước lượng tử hóa bf16→MXFP8 riêng ở mức đồng thời thấp.
- **Sửa workspace/budget cho MoE**: Chuỗi PR #45681 / #45917 / #45462 / #45916 / #45915 giữ nguyên workspace Marlin, metadata routing CUTLASS, budget routing GGUF và định danh projection MoE — giảm cấp phát bộ nhớ mỗi lần gọi.
- **KVShard cho MTP**: PR #40929 bổ sung phân mảnh KV cache ở mức pool cho multi-token prediction.
- **LTX-2 diffusion**: PR #45965 phân mảnh stage-2 refiner theo các rank CFG như Ulysses (trước đây một GPU bị nhàn rỗi trên 2×H200 ở 768×512×121).

## 5. Ổn định & Hồi quy

Xếp theo mức độ nghiêm trọng:

1. **Kimi-K3 DCP a2a decode bị lỗi ký tự trên GB300 2 node** (#45367) — thoái hóa dưới CUDA graphs với đăng ký graph NCCL; `NCCL_GRAPH_REGISTER=0` khôi phục output. *Có cách xử lý tạm.*
2. **GLM-5.3-Flash EAGLE truy cập bộ nhớ bất hợp lệ trên H20 TP8/EP8** (#45159) — crash trong `run_eagle_verify` → `build_grammar_vocab_mask`. Chưa có PR sửa.
3. **`flashinfer_mxfp4` âm thầm tính SwiGLU của GPT-OSS thay vì SiTU trên SM90** (#45755) — kết quả sai âm thầm với Kimi-K3. Phụ thuộc flashinfer#4209 đang mở.
4. **`--enable-lmcache` + radix cache bị tắt làm crash scheduler ở lần nhàn rỗi đầu tiên** (#45929, 0.5.22) — crash tất định; ảnh hưởng các model chế độ embedding.
5. **NVFP4 KV cache + speculative decoding không tương thích** (#36010) — `extend_prefix_lens_cpu is None` trong workspace dequant. Chưa có PR sửa.
6. **fa4 crash khi capture CUDA-graph trên SM120 với GLM-5.3-Flash** (#42012) — hybrid extend reshape; triton là backend duy nhất hoạt động.
7. **HiCache host-tier hit sụp đổ trên các model GDN hybrid** (#45400) — pool mamba host cạn kiệt trong khi KV vẫn còn trên host.
8. **Thứ tự requeue preemption ưu tiên khác nhau giữa các rank TP** (#45812) — lỗi tính tất định của scheduler.
9. **Bất ổn CI**: #42752 (123 bình luận) theo dõi các test PR flaky của NVIDIA; `test_deepseek_v4_flash_fp4` của AMD thất bại với ImportError (#45847).

## 6. Điều này có nghĩa gì với nhà phát triển ứng dụng

- **Tránh `--enable-lmcache` khi radix cache bị tắt** trên 0.5.22 — crash scheduler tất định; theo dõi #45929.
- **NVFP4 KV cache và speculative decoding hiện loại trừ lẫn nhau** (#36010) — chọn một trong hai cho triển khai SM120/Blackwell.
- **Nếu bạn phục vụ Kimi-K3 trên GB300 với DCP a2a, hãy đặt `NCCL_GRAPH_REGISTER=0`** như biện pháp giảm thiểu tức thì (#45367).
- **Tính đúng đắn của MoE mixed-precision đang được củng cố tích cực** (chuỗi PR quanh #45681); nếu bạn dựa vào LoRA + MoE hoặc GGUF + MoE, hãy kỳ vọng các bản sửa correctness sẽ được đưa vào và có thể thay đổi nhẹ số liệu output.
- **Người dùng Hopper chạy GLM-5.3-Flash** nên theo dõi #45373 — công việc hiệu năng đã xếp hàng nhưng một số vấn đề correctness (#45159, #42012) vẫn còn mở.
- **Đa dạng phần cứng đang mở rộng** (SAIL, XPU, AMD, NPU) — nếu bạn đang lên kế hoạch cho các fleet không đồng nhất, hỗ trợ upstream đang trưởng thành nhưng độ phủ CI vẫn còn thua các làn CUDA.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Một ngày phát hành dày đặc (10 bản build, b11815–b11829) với nhiều thay đổi đáng kể ở server: endpoint rerank giờ đã chấp nhận nội dung có kiểu (hỗ trợ đa phương thức), API realtime chỉ báo hoàn tất sau khi audio đã commit được xử lý hết, và một lỗi placeholder trong template rerank đã được sửa. Về phía backend, OpenCL có thêm depthwise conv2d (Adreno), SYCL được refactor XMX đa cột, và MiniCPM-OCR 1.0 đã có mặt trong mtmd. Chủ đề mở đáng quan tâm nhất vẫn là cụm vấn đề suy giảm long-context của Qwen3.8/Gated-DeltaNet, hiện đã lan sang cả backend SYCL, CUDA và Vulkan.

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

Các bản build gần đây (phân phối binary macOS/iOS nay qua [llama.app](https://llama.app)):

- **b11829** — server: chỉ thay thế placeholder rerank từ template gốc. ([PR #30864](https://github.com/ggml-org/llama.cpp/pull/30864))
- **b11827** — opencl: thêm depthwise conv2d (Adreno). ([PR #30900](https://github.com/ggml-org/llama.cpp/pull/30900))
- **b11818** — server: đầu vào nội dung có kiểu cho endpoint RERANK. ([PR #29625](https://github.com/ggml-org/llama.cpp/pull/29625)) — định dạng request mới được chấp nhận; client gửi nội dung dạng chuỗi thuần vẫn tương thích, nhưng đầu vào rerank đa phương thức sẽ bị từ chối nếu model không có rerank chat template.
- **b11819** — nemotron: GQA không chuẩn, BPE tokenizer, pre-type domyn-small; `gguf-py` giờ ghi Metaspace `prepend_scheme` dưới dạng metadata GGUF và `vocab` phân tích nó thành enum ([PR #23343](https://github.com/ggml-org/llama.cpp/pull/23343)). **Lưu ý migration:** các file Nemotron GGUF đã convert nên được convert lại để có metadata đúng; các file cũ bị gắn tag `pixtral` và nhận sai pre-tokenizer ([issue #30894](https://github.com/ggml-org/llama.cpp/issues/30894)).

Không có thay đổi API phá vỡ tương thích; thay đổi hành vi duy nhất đáng lưu ý là việc kiểm tra đầu vào rerank chặt chẽ hơn.

## 3. Hỗ trợ Model & Phần cứng mới

| Khu vực | Thay đổi | Liên kết |
|---|---|---|
| **MiniCPM-OCR 1.0** | Đã thêm hỗ trợ mtmd | [b11826 / PR #30979](https://github.com/ggml-org/llama.cpp/pull/30979) |
| **Nemotron (3 / 3.5)** | GQA không chuẩn, BPE tokenizer, pre-type domyn-small; metadata GGUF metaspace | [PR #23343](https://github.com/ggml-org/llama.cpp/pull/23343) |
| **GLM-5** | Các layer QSA được tối ưu để tránh đầu vào `sel_mask_2d` / `new_pool_flat`; PR `glm5-next` loại bỏ cấp phát `kq_mask` cho QSA attention, tiết kiệm ~2 GB VRAM @ ub 4096 / ~4 GB @ ub 8192 | [b11823 / PR #30932](https://github.com/ggml-org/llama.cpp/pull/30932), [PR #31009](https://github.com/ggml-org/llama.cpp/pull/31009) |
| **Qwen4exp** | Sửa đầu vào layer cho DFlash drafters (lệch layout residual wide) | [b11822 / PR #30927](https://github.com/ggml-org/llama.cpp/pull/30927) |
| **OpenCL (Adreno)** | Depthwise conv2d; hỗ trợ Q2_K bước đầu | [PR #30900](https://github.com/ggml-org/llama.cpp/pull/30900), [PR #30999](https://github.com/ggml-org/llama.cpp/pull/30999) |
| **SYCL / Intel XMX** | `mul_mat_vec_q` đa cột (2–80 cột activation) cho K-quant đã sắp xếp lại và Q8_0 qua int8 DPAS (ESIMD) | [b11821 / PR #29864](https://github.com/ggml-org/llama.cpp/pull/29864) |
| **Hexagon (Qualcomm NPU)** | Các op `CONV2D` (f16/f32), `SGN`, `CEIL`; refactor op-fusion | [PR #30995](https://github.com/ggml-org/llama.cpp/pull/30995), [PR #30346](https://github.com/ggml-org/llama.cpp/pull/30346), [PR #31006](https://github.com/ggml-org/llama.cpp/pull/31006) |
| **Lượng tử hóa** | Đề xuất `GGML_TYPE_BF16X` (type 43), nén lại bf16 gần như không mất mát ở 11.5 bpw, CPU + GPU | [PR #29896](https://github.com/ggml-org/llama.cpp/pull/29896) |

## 4. Hiệu năng & Tối ưu hóa

- **Giao tiếp tensor-parallel trên SYCL:** việc làm lại `ggml_sycl_comm_exchange()` cho **+16.7% đến +20.6% prompt-eval t/s (trung bình ≈ +19%)** trên dual Arc Pro B70 với `-sm tensor`, đưa nó ngang bằng `-sm layer` mà không thay đổi PPL. ([PR #30956](https://github.com/ggml-org/llama.cpp/pull/30956))
- **Ghi/phát lại graph trên SYCL:** CUDA graph capture đã được port sang SYCL (đã đóng/merge). ([PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725))
- **Offload expert MoE (đang thực hiện):** Hai thiết kế cạnh tranh — một LRU cache nằm trên GPU cho các expert được offload lên host ([PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)) và một biến thể `llama_moe_cache` chạy các expert bị miss trên CPU với script tinh chỉnh (`--moe-cache-mib`, `--moe-cache-cpu-share`) ([PR #30966](https://github.com/ggml-org/llama.cpp/pull/30966)). Giải quyết yêu cầu lâu nay trong [issue #29949](https://github.com/ggml-org/llama.cpp/issues/29949).
- **RDNA3/4 Vulkan split-K:** tinh chỉnh split-K với tile lớn (128×128) cho prefill. ([PR #30280](https://github.com/ggml-org/llama.cpp/pull/30280))
- **Activation FP16:** Tùy chọn mới `--act-type {f32,f16}` (cũng có `llama-bench -at`, `LLAMA_ARG_ACT_TYPE`) giữ activation ở F16 xuyên suốt — nhắm đến các accelerator bị nghẽn băng thông activation. ([PR #31011](https://github.com/ggml-org/llama.cpp/pull/31011))
- **Tăng cường bảo mật RPC:** Hai PR đóng lỗ hổng đọc/ghi tùy ý qua tensor descriptor được tạo thủ công trong `GRAPH_COMPUTE` (`view_offs` không được kiểm tra, đường dẫn `deserialize_tensor` với buffer null). ([PR #31017](https://github.com/ggml-org/llama.cpp/pull/31017), [PR #31018](https://github.com/ggml-org/llama.cpp/pull/31018))

## 5. Ổn định & Hồi quy

Xếp theo mức độ nghiêm trọng:

1. **SYCL F16 NaN trên Qwen3.8-27B Q4_K_M** — từ đợt reorder IQ3-code #29107; tắt fused GEMM là cách workaround. Arc Pro B70. ([#30892](https://github.com/ggml-org/llama.cpp/issues/30892))
2. **Qwen3.8-27B decode sụp khoảng 25× khi vượt ~80K context** (hybrid Gated DeltaNet), xử lý prompt không bị ảnh hưởng; tái hiện trên CUDA + WSL2, RTX 4080 SUPER. ([#27623](https://github.com/ggml-org/llama.cpp/issues/27623))
3. **Gated DeltaNet "token soup" với prompt dài, trên SYCL** — ảnh hưởng Qwen3.6/3.8 và Nemotron; các model dense vẫn ổn đến 131K+. ([#29183](https://github.com/ggml-org/llama.cpp/issues/29183), [#29167](https://github.com/ggml-org/llama.cpp/issues/29167))
4. **Vulkan Flash Attention: logits rác / EOS ngay lập tức ở context dài** trên gfx1201 (RDNA4), `head_dim` 256. ([#30884](https://github.com/ggml-org/llama.cpp/issues/30884))
5. **Qwen3.8 DFlash/MTP phát ra token id ngoài phạm vi == n_vocab (248320) trên Vulkan** (gfx1150). ([#28158](https://github.com/ggml-org/llama.cpp/issues/28158))
6. **Metal abort trên MUL_MAT với src1 BF16** khi K ≥ 64, batch > 8 (không có kernel `mul_mm` cho BF16). Hồi quy từ master thời b11813. ([#30973](https://github.com/ggml-org/llama.cpp/issues/30973))
7. **Tràn fp16 trong CUDA MMVQ** ở phép nhân scale Q4_1/Q5_1/Q8_1 — PR sửa đang mở, nhân bằng fp32. ([#30950](https://github.com/ggml-org/llama.cpp/issues/30950) → [PR #31019](https://github.com/ggml-org/llama.cpp/pull/31019))
8. **UE4M3 encoder bão hòa sai** với giá trị ≥ 256 — PR sửa đang mở (làm tròn RNE + giới hạn bão hòa). ([#31010](https://github.com/ggml-org/llama.cpp/issues/31010) → [PR #31020](https://github.com/ggml-org/llama.cpp/pull/31020))
9. **Detokenizer chèn/xóa dấu cách sai** với các vocab kiểu Gemma 4 (`x != y` → `x!= y`) — khác biệt so với tokenizer của HF. ([#30905](https://github.com/ggml-org/llama.cpp/issues/30905))
10. **RPC với hai worker:** đầu ra DeepSeek V4 thoái hóa thành lặp token sau prompt dài; slot vẫn bị hỏng. ([#30794](https://github.com/ggml-org/llama.cpp/issues/30794))

Đã có PR sửa cho mục 7 và 8; mục 1–6 vẫn đang được điều tra. Cũng lưu ý bản sửa build SYCL đang mở cho tham số device của `mul_mat_uses_onednn` ([PR #31014](https://github.com/ggml-org/llama.cpp/pull/31014)).

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Rerank đang trở thành endpoint đa phương thức hạng nhất.** Đầu vào nội dung có kiểu ([PR #29625](https://github.com/ggml-org/llama.cpp/pull/29625)) cùng bản sửa placeholder template ([PR #30864](https://github.com/ggml-org/llama.cpp/pull/30864)) cho phép reranker RAG kết hợp văn bản và hình ảnh — nhưng hãy kiểm tra model của bạn có rerank chat template trước khi gửi payload đa phương thức, nếu không server sẽ từ chối request.
- **Agent realtime/voice có tín hiệu hoàn tất chính xác.** Thay đổi ở b11828 gắn "complete" với việc xả hết audio đã commit thay vì thời điểm stream cạn, loại bỏ một loại bug cắt ngắn/race trong pipeline audio streaming ([PR #30994](https://github.com/ggml-org/llama.cpp/pull/30994)).
- **MoE trên phần cứng tiêu dùng là mặt trận sôi động nhất.** Cả hai PR MoE-cache đang mở đều nhắm cùng điểm đau — decode bị giới hạn bởi băng thông RAM host khi expert được offload. Nếu bạn chạy `-ot ...exps=CPU` hoặc `-ncmoe`, nên benchmark cả hai nhánh; biến thể CPU-share thêm các knob tinh chỉnh ([PR #30966](https://github.com/ggml-org/llama.cpp/pull/30966)) trong khi biến thể GPU-LRU giữ bản sao trong graph tính toán ([PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861)).
- **Các model hybrid long-context (lớp Qwen3.8, Nemotron) chưa an toàn cho production ở 100K+ token** trên SYCL hoặc RDNA4 Vulkan, và cho thấy vách suy giảm decode trên CUDA khi vượt ~80K. Nếu agent của bạn dựa vào cửa sổ context lớn, hãy ghim vào một bản build đã kiểm chứng và theo dõi các issue #27623, #29167, #29183.
- **Người dùng Intel Arc đa GPU được lợi miễn phí** với prompt-eval ở `-sm tensor` trên SYCL (nhanh hơn ~19%, [PR #30956](https://github.com/ggml-org/llama.cpp/pull/30956)), và cờ activation FP16 mới ([PR #31011](https://github.com/ggml-org/llama.cpp/pull/31011)) đáng để thử với các accelerator bị nghẽn băng thông.
- **Nếu bạn để worker RPC lộ ra mạng không tin cậy, hãy nâng cấp ngay** — các bản sửa tăng cường tensor descriptor vá lỗ hổng đọc/ghi tùy ý trước xác thực ([PR #31017](https://github.com/ggml-org/llama.cpp/pull/31017), [PR #31018](https://github.com/ggml-org/llama.cpp/pull/31018)). Cũng nên thận trọng tương tự với báo cáo injection qua query-parameter của WebUI đã mở từ lâu ([#25790](https://github.com/ggml-org/llama.cpp/issues/25790)).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới nào trong 24 giờ qua, nhưng hàng đợi issue và PR vẫn sôi động: một **sự cố nghiêm trọng về độ tin cậy của Ollama Cloud Pro** (#15453, tỷ lệ thất bại 95%, 22 👍, 55 bình luận) tiếp tục thu hút sự chú ý, trong khi một nhóm các lỗi hồi quy mạng trên Windows (#19139, #19113) và tình trạng chậm prompt-cache trên AMD/Vulkan (#19201) cho thấy những lỗ hổng về độ ổn định ở phía cục bộ. Về mặt kỹ thuật, mở rộng MLX là tiêu đề chính — các PR bổ sung **Nemotron 3.5 Bolt 74B-A9B** (#19229) và **YaRN scaling cho Qwen3/Qwen3.5** (#19231) đều đã được hợp nhất vào quy trình xem xét hôm nay.

---

## 2. Bản phát hành & Thay đổi phá vỡ tương thích

Không có bản phát hành mới nào được công bố trong 24 giờ qua. Tuy nhiên, hai PR đang trong quá trình xử lý có hàm ý về hành vi/API đáng được lưu ý trước phiên bản tiếp theo:

- **`num_predict == -2` cho giới hạn token động** — PR [#9547](https://github.com/ollama/ollama/pull/9547) (đã mở từ lâu) sẽ mô phỏng hành vi của llama.cpp, cho phép quá trình sinh lấp đầy bộ đệm ngữ cảnh thay vì bị giới hạn hoặc vô hạn.
- **Ngữ nghĩa `SYSTEM ""`** — PR [#18990](https://github.com/ollama/ollama/pull/18990) thay đổi hành vi tạo Modelfile để một system prompt rỗng được chỉ định rõ ràng sẽ thực sự xóa prompt của model cơ sở, thay vì bị bỏ qua một cách âm thầm.
- **`typical_p` bị loại bỏ khỏi đường dẫn Python API** — Issue [#18480](https://github.com/ollama/ollama/issues/18480) (ĐÃ ĐÓNG) ghi nhận rằng các client gọi qua `ollama-python` giờ đây nhận HTTP 400; hãy chuyển đổi khỏi sampler này.

---

## 3. Hỗ trợ Model & Phần cứng mới

- **Nemotron 3.5 Bolt 74B-A9B (MLX)** — PR [#19229](https://github.com/ollama/ollama/pull/19229) bổ sung cấu hình expert theo từng lớp và giải mã speculative LiLiCorr thông qua runner DFlash hiện có, cùng với nhập khẩu affine 3-bit đã lượng tử hóa sẵn với metadata lượng tử hóa theo từng module và xếp chồng expert với độ chính xác hỗn hợp.
- **YaRN RoPE scaling cho Qwen3 / Qwen3.5 (MLX)** — PR [#19231](https://github.com/ollama/ollama/pull/19231) tôn trọng metadata RoPE scaling rõ ràng (tần số YaRN, amplitude scaling, bảo toàn mRoPE). Sửa lỗi ngoại suy ngữ cảnh dài cho các model thuộc dòng Qwen3.
- **Gemma 4 (MLX)** — Chế độ Thinking được cho là không thể tắt một cách đáng tin cậy qua API tương thích OpenAI trong v0.40.6 (Issue [#19217](https://github.com/ollama/ollama/issues/19217)); ảnh hưởng đến các agent sử dụng ngữ nghĩa `think: false`.
- **Yêu cầu hỗ trợ model** cho các model System 1 (Kev, Laya) — Issue [#18594](https://github.com/ollama/ollama/issues/18594) (ĐÃ ĐÓNG mà không triển khai).
- **Metadata model Cloud** — PR [#19223](https://github.com/ollama/ollama/pull/19223) giúp `ollama launch <harness>` nhận biết độ dài ngữ cảnh, mức thinking và khả năng của model cloud theo từng harness (đáng chú ý là Codex `context_window` tăng từ mặc định 128k lên 1.048.576 cho glm-5.2).

---

## 4. Hiệu năng & Tối ưu hóa

- **Hồi quy prompt cache trên AMD RADV / Vulkan** — Issue [#19201](https://github.com/ollama/ollama/issues/19201) báo cáo **tốc độ sinh giảm ~29,7 lần** ở yêu cầu giống hệt lần *thứ hai* khi bật prompt cache trong host-memory của llama.cpp đi kèm, trên RX 6600 XT chạy Ollama 0.40.8. Model vẫn được offload hoàn toàn lên GPU; vấn đề nằm ở cache-key.
- **MLX nvfp4 prefill bị treo** — Issue [#18505](https://github.com/ollama/ollama/issues/18505) (ĐÃ ĐÓNG): với `OLLAMA_NUM_PARALLEL=1`, các yêu cầu được chấp nhận đôi khi bị treo trong prefill ở `processed = total-1` trong nhiều phút; chỉ khi gửi SIGTERM cho runner mới khôi phục được. Đáng theo dõi nếu tái diễn.
- **Tính đúng đắn của việc cắt prompt** — PR [#19058](https://github.com/ollama/ollama/pull/19058) sửa việc cắt tỉa `chatPrompt()` để giữ lại tin nhắn *người dùng* cuối cùng (thay vì tin nhắn cuối cùng thuộc bất kỳ loại nào), ngăn các prompt chỉ có tool-call âm thầm loại bỏ truy vấn đang hoạt động.

---

## 5. Độ ổn định & Hồi quy

Xếp hạng theo mức độ nghiêm trọng:

1. **Tỷ lệ thất bại 95% của Ollama Cloud Pro** — Issue [#15453](https://github.com/ollama/ollama/issues/15453) (MỞ, 👍 22, 55 bình luận). Ảnh hưởng đến `glm-5.1:cloud`, `kimi-k2.5:cloud`, `qwen3.5:cloud`, `deepseek-v3.2:cloud` trên macOS; người dùng báo cáo không mất gói tin nào đến `ollama.com`, loại trừ mạng phía client. **Không có PR sửa lỗi nào được tham chiếu.**
2. **Suy thoái sinh nghiêm trọng từ ngày 10-10 trên `glm-5.3-flash:cloud`** — Issue [#18980](https://github.com/ollama/ollama/issues/18980) (MỞ, 31 bình luận). Đầu ra cho thấy các vòng lặp lặp lại bệnh lý. Trùng thời gian với sự cố Cloud Pro.
3. **Windows TCP connection reset với prompt lớn** — Issue [#19139](https://github.com/ollama/ollama/issues/19139) và [#19113](https://github.com/ollama/ollama/issues/19113) (cả hai đều MỞ). Reset ở khoảng ~15 giây, tái hiện cả qua Ollama API lẫn trực tiếp với `llama-server`, cho thấy vấn đề nằm bên dưới lớp API.
4. **AMD RADV chậm ~30 lần ở yêu cầu thứ 2** — Issue [#19201](https://github.com/ollama/ollama/issues/19201) (MỞ, được tạo hôm nay). Xem §4.
5. **Panic "Maximum threads per threadgroup" trên macOS 0.40.0 MLX** — Issue [#18846](https://github.com/ollama/ollama/issues/18846) (ĐÃ ĐÓNG). Hồi quy so với 0.35.1; panic trong kernel `sdpa_vector_2pass_*`.
6. **CVE của Go trong các binary đã phát hành** — Issue [#16033](https://github.com/ollama/ollama/issues/16033) và [#19162](https://github.com/ollama/ollama/issues/19162) (cả hai đều ĐÃ ĐÓNG). Hướng dẫn nâng cấp: Go 1.26.9+. Thư viện bị ảnh hưởng bao gồm `buger/jsonparser`.
7. **RVPI 5 (`qwen2.5:3b`) lần `ollama run` thứ hai bị treo** — Issue [#18796](https://github.com/ollama/ollama/issues/18796) (MỞ). Dịch vụ systemd trên Debian 13; lần chạy đầu thành công, các lần chạy sau treo âm thầm.
8. **Windows Desktop 0.33.1 server tích hợp khởi chạy thất bại âm thầm** — Issue [#18061](https://github.com/ollama/ollama/issues/18061) (ĐÃ ĐÓNG). `server.log` trống, không có listener; chạy thủ công `ollama serve` thì được. Sửa lỗi liên quan: PR [#19179](https://github.com/ollama/ollama/pull/19179) giờ ghi lại lỗi `osrv.Run` trước đây bị nuốt.
9. **Treo do eviction model với `OLLAMA_MAX_LOADED_MODELS=1`** — Issue [#19182](https://github.com/ollama/ollama/issues/19182) (MỞ). Việc eviction đang chờ bị hủy khi một yêu cầu mang `keep_alive`, chặn yêu cầu đang chờ trong suốt khoảng keep-alive (mặc định 30 phút).
10. **Tool-call bị loại bỏ âm thầm với tên hàm không xác định** — Issue [#19187](https://github.com/ollama/ollama/issues/19187) (MỞ). Model gọi một hàm không có trong `tools`; server trả về phản hồi rỗng với `eval_count > 0`, không có lỗi nào được báo. Các PR sửa lỗi liên quan: [#19228](https://github.com/ollama/ollama/pull/19228) (Qwen3-coder chứa literal `</function>` trong args) và [#19226](https://github.com/ollama/ollama/pull/19226) (khôi phục nhiễu cuối cho Gemma4).
11. **Stream `/v1/responses` đóng mà không có sự kiện kết thúc** — Issue [#17118](https://github.com/ollama/ollama/issues/17118) (ĐÃ ĐÓNG). Được xử lý bởi PR [#19225](https://github.com/ollama/ollama/pull/19225), phát ra `response.failed` thay vì EOF âm thầm khi lỗi sinh xảy ra giữa stream.
12. **Mục model trùng lặp sau khi migrate compat GGUF cục bộ** — Issue [#18830](https://github.com/ollama/ollama/issues/18830) (ĐÃ ĐÓNG). `ollama list` hiển thị model hai lần kèm tag `llamacpp:<sha>` giả.

---

## 6. Điều này có ý nghĩa gì với nhà phát triển ứng dụng

- **Nếu bạn phụ thuộc vào Ollama Cloud Pro, hãy có phương án dự phòng ngay hôm nay.** Tỷ lệ thất bại trên mặt phẳng Pro và báo cáo suy thoái `glm-5.3-flash` xảy ra đồng thời và chưa được giải quyết; định tuyến các cuộc gọi cloud mà không có failover cục bộ hoặc nhà cung cấp thay thế là không an toàn cho agent production.
- **Theo dõi ngữ nghĩa cắt tỉa của bạn sau bản phát hành tiếp theo.** PR #19058 thay đổi tin nhắn nào được giữ lại khi cắt tỉa — nếu agent của bạn dựa vào việc tin nhắn cuối cùng được giữ lại bất kể vai trò, hãy kiểm tra lại vòng lặp tool-call.
- **Windows + prompt lớn vẫn mong manh.** Connection reset tái hiện bên dưới Ollama API, nên việc bọc trực tiếp `llama-server` sẽ không bảo vệ bạn. Hãy giới hạn lô prompt hoặc thử lại với backoff.
- **Ngừng sử dụng `typical_p`.** Nó giờ trả về HTTP 400 từ client Python.
- **Client streaming nên xử lý `response.failed`.** PR #19225 giới thiệu một sự kiện kết thúc thất bại đúng nghĩa cho `/v1/responses`; các client hiện tại có thể hiểu sai EOF âm thầm là hoàn thành hợp lệ.
- **Người dùng MLX với workload ngữ cảnh dài trên Qwen3** nên theo dõi PR #19231 — các bản sửa YaRN scaling sắp ra mắt; cho đến khi được hợp nhất, cấu hình RoPE thủ công có thể hoạt động kém ở ngữ cảnh mở rộng.
- **Việc tăng cường tool-calling đang được tiến hành** (Qwen3-coder, Gemma4). Nếu bạn có các model phát ra tool call bị lỗi hoặc nhiễu, hãy ghim vào phiên bản bao gồm PR #19226 và #19228 khi được phát hành.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Câu chuyện chính vẫn là **sự cố xâm phạm chuỗi cung ứng của `litellm 1.107.0`** (Issue #47826, 25 bình luận, 19 👍), khi phiên bản này nhúng một trình đánh cắp thông tin đăng nhập `cook.pth` và một trình tải RCE `sitecustomize`, được phát hành từ một repo giả mạo (`Berri-AI/litellm`). PyPI và các tag Docker `latest`/`main-stable` đã bị gỡ, nhưng hậu quả vẫn đang lan rộng: người dùng hiện đang yêu cầu bản vá root-CA của eMudhra được backport về `stable/1.106.x`, vì mọi image 1.106.x đã phát hành vẫn tin cậy chuỗi CA bị xâm phạm. Ngoài ra, một nỗ lực gia cố hệ thống kiểu dữ liệu lớn (#47789, 431 tệp) và một số bản sửa lỗi kế toán/ủy quyền của proxy đang trong quá trình xem xét.

## 2. Bản phát hành & Thay đổi gây ảnh hưởng

- **Không có bản phát hành mới trong 24 giờ qua.**
- **Yêu cầu backport bảo mật đang chờ xử lý** — [Issue #47904](https://github.com/BerriAI/litellm/issues/47904): bản sửa lỗi root CA `eMudhra` (#47670) chỉ tồn tại trên `main`; tất cả image `1.106.x` đã phát hành vẫn tin cậy `emSign ECC Root CA - G3`. Đang yêu cầu image `v1.106.3`.
- **Thay đổi nguồn thông báo nâng cấp** — [PR #47998](https://github.com/BerriAI/litellm/pull/47998): banner nâng cấp trên Admin UI giờ đọc phiên bản/liên kết từ changelog tài liệu thay vì "latest release" trên GitHub, vì pipeline phát hành tạo GitHub release mà không có người kiểm duyệt.

> ⚠️ Người vận hành nên ghim vào một phiên bản đã biết là tốt và xác minh digest của image cho đến khi bản backport 1.106.x được phát hành.

## 3. Hỗ trợ Model & Phần cứng mới

- **Nhà cung cấp Foundry Local** — [PR #47713](https://github.com/BerriAI/litellm/pull/47713): bổ sung một nhà cung cấp suy luận cục bộ với thiết lập SDK 2.2.1.
- **DashScope realtime WebSocket** — [PR #40579](https://github.com/BerriAI/litellm/pull/40579): bổ sung handler `DashScopeRealtime` trên đường dẫn realtime chung của OpenAI, giữ nguyên định dạng `session.update` phẳng của DashScope.
- **Chi tiết ảnh `"original"` của OpenAI** — [Issue #47327](https://github.com/BerriAI/litellm/issues/47327): `token_counter` hiện từ chối giá trị detail `"original"` mới, khiến các kiểm tra ngữ cảnh trước khi gọi ghi log ERROR và âm thầm bỏ qua việc xác thực cửa sổ.
- **Các vòng lặp của model advisor** — [PR #48000](https://github.com/BerriAI/litellm/pull/48000): các vòng lặp advisor của Anthropic giờ có thể chỉ định một model với mức giá riêng; mức sử dụng được theo dõi và tính giá riêng.

## 4. Hiệu năng & Tối ưu hóa

- **Định tuyến dựa trên độ trễ bị suy giảm thành chọn ngẫu nhiên** — [Issue #24720](https://github.com/BerriAI/litellm/issues/24720): một race điều kiện lost-update trong `async_log_success_event` làm định tuyến độ trễ sụp đổ thành weighted-random dưới tải đồng thời (quan sát được với 16 key Anthropic + 4 key OpenAI). Chưa có PR sửa lỗi.
- **Event-loop bị treo do body lỗi không giới hạn** — [Issue #34031](https://github.com/BerriAI/litellm/issues/34031): proxy đọc toàn bộ body lỗi từ upstream (quan sát được ~114 MB cho HTTP 400) và chạy regex masking trên đó, làm treo event loop và tăng RSS. Chưa có bản sửa.
- **Retry-After bị bỏ qua với nhóm nhiều deployment** — [Issue #34399](https://github.com/BerriAI/litellm/issues/34399): `_time_to_sleep_before_retry` chỉ tôn trọng `Retry-After` khi một model group chỉ có một deployment, gây ra bão retry tức thời nhắm vào các upstream bị rate-limit dùng chung.
- **Đặt trước ngân sách MCP** — [PR #47999](https://github.com/BerriAI/litellm/pull/47999): đặt trước ngân sách cho mỗi lần gọi tool MCP tự động thực thi, ngăn việc tính thiếu phí tool.
- **Dọn dẹp kiểu dữ liệu** — [PR #47789](https://github.com/BerriAI/litellm/pull/47789) xóa 1181 lỗi Any của `basedpyright` trên 431 tệp; [PR #48001](https://github.com/BerriAI/litellm/pull/48001) là phần đầu tiên. Không có thay đổi hành vi nào dự kiến.

## 5. Ổn định & Hồi quy

Xếp hạng theo mức độ nghiêm trọng:

1. **[CRITICAL] Sự cố xâm phạm chuỗi cung ứng của 1.107.0** — [Issue #47826](https://github.com/BerriAI/litellm/issues/47826): trình đánh cắp thông tin đăng nhập `.pth` độc hại + trình tải RCE `sitecustomize`. PyPI và các tag Docker đã bị gỡ; **xác minh tất cả image và ghim digest**. Rủi ro còn lại: bản backport tin cậy CA cho 1.106.x vẫn đang mở (#47904).
2. **[HIGH] Xóa team để lại key vẫn hợp lệ về xác thực** — [Issue #34217](https://github.com/BerriAI/litellm/issues/34217): `POST /team/delete` xóa các hàng trong DB nhưng không loại bỏ các mục trong auth-cache, khác với `/key/delete`.
3. **[HIGH] Cạn kiệt kết nối DB làm mọi key thất bại** — [Issue #34479](https://github.com/BerriAI/litellm/issues/34479): khi `max_connections` của Postgres bị chạm trong các deployment nhiều worker, mọi API key của người dùng đều thất bại.
4. **[HIGH] Sự cố DB tạm thời → "Invalid model name"** — [Issue #26237](https://github.com/BerriAI/litellm/issues/26237): một trục trặc Postgres/HAProxy khiến các model hợp lệ bị báo là không hợp lệ.
5. **[MED] Postgres qua Unix-socket bị hỏng** — [PR #43668](https://github.com/BerriAI/litellm/pull/43668): `_strip_prisma_query_params` loại bỏ `host`, làm hỏng mọi deployment Postgres qua Unix-socket (bản sửa đang được xem xét).
6. **[MED] Luồng Gemini không được retry khi bị ngắt sớm** — [PR #45750](https://github.com/BerriAI/litellm/pull/45750): trường hợp `200 OK` + kết nối bị ngắt trước sự kiện SSE đầu tiên không bao giờ kích hoạt retry.
7. **[MED] Phát lại header SigV4 của Bedrock** — [Issue #27513](https://github.com/BerriAI/litellm/issues/27513): các đường dẫn retry có thể phát lại header SigV4 cũ sau khi đã ký.
8. **[MED] Bộ chuyển đổi Anthropic→Responses bỏ qua `drop_params`** — [Issue #26241](https://github.com/BerriAI/litellm/issues/26241): `metadata.user_id` được ánh xạ vô điều kiện thành `user`, làm hỏng các gateway `/responses` nghiêm ngặt.
9. **[LOW] Ngữ nghĩa spend/token khi cache hit** — [Issue #39057](https://github.com/BerriAI/litellm/issues/39057): khi cache hit, `spend=0` nhưng các cột token phát lại mức sử dụng gốc, gây mơ hồ cho việc tổng hợp hóa đơn.
10. **[LOW] Azur

---
*Lưu ý: bản digest trên đang được hoàn thiện cho các mục mức độ thấp còn lại và các phần kết. Nội dung đầy đủ tiếp theo:*

10. **[LOW] Hồi quy Azure FLUX** — [Issue #19334](https://github.com/BerriAI/litellm/issues/19334): các lệnh gọi FLUX-1.1-pro và FLUX.1-Kontext-pro thất bại sau khi nâng cấp lên 1.80.15-stable.1.
11. **[LOW] Guardrails dương tính giả** — [Issue #24734](https://github.com/BerriAI/litellm/issues/24734): lỗi "guardrails feature unavailable" được kích hoạt khi chỉnh sửa API key mà không có guardrails nào được cấu hình (1.82.3).
12. **[LOW] Đăng nhập UI chuyển hướng đến IP Docker nội bộ** — [Issue #30118](https://github.com/BerriAI/litellm/issues/30118): hồi quy từ 1.87.0 → 1.88.x khi đứng sau reverse proxy nginx (nay đã đóng).

## 6. Điều này có ý nghĩa gì với các nhà phát triển ứng dụng

- **Kiểm tra chuỗi cung ứng của bạn ngay lập tức.** Nếu bạn đã pull `litellm==1.107.0` hoặc bất kỳ image `latest`/`main-stable` nào trong khoảng thời gian từ lúc bị xâm phạm đến lúc bị gỡ, hãy xoay vòng toàn bộ thông tin đăng nhập mà các môi trường đó có thể truy cập (API key, token cloud, thông tin DB) và build lại từ một tag đã ghim, đã xác minh digest. Hãy coi thông tin đăng nhập trong `cook.pth` đã bị rò rỉ.
- **Ghim phiên bản và digest.** Với bản backport tin cậy CA cho 1.106.x vẫn đang mở, các tag động vẫn còn rủi ro. Hãy coi các registry ghcr.io và docker.io là không đáng tin cậy cho đến khi bạn pull lại sau khi bị gỡ.
- **Xác thực độ chính xác của hóa đơn nếu bạn dựa vào cache + log spend.** Ngữ nghĩa cache hit (#39057) nghĩa là các hàng `spend_logs` có spend=0 nhưng mang số token gốc — hãy đối soát cẩn thận trước khi tin tưởng vào việc quy kết chi phí theo team/key.
- **Chú ý đến việc vô hiệu hóa auth-cache.** Xóa team (#34217) không vô hiệu hóa key; nếu bạn xây dựng vòng đời key đa tenant trên proxy, hãy thêm các lệnh gọi `/key/delete` rõ ràng như một cách xử lý tạm.
- **Gia cố hành vi retry của router cho các upstream dùng chung.** Nếu bạn chia sẻ một backend bị rate-limit giữa nhiều deployment, hãy lường trước các retry tức thời (#34399) và việc xử lý `Retry-After` không nhất quán; cân nhắc nhóm các deployment bị rate-limit hoặc đặt một limiter riêng của bạn phía trước.
- **Định tuyến Claude Code / tương thích Anthropic có một số trường hợp biên đang mở** (#26241, #26252, #26214, #27091): input tool-use bị mất khi streaming, việc chặn websearch không kích hoạt qua pass-through Bedrock, và `thinking.type=adaptive` bị từ chối qua bộ định tuyến độ phức tạp. Hãy kiểm thử rõ ràng các đường dẫn này nếu bạn định tuyến coding agent qua LiteLLM.

**Theo dõi tiếp theo:** bản backport CA cho `stable/1.106.x` (#47904) và bất kỳ khuyến cáo mới nào về phạm vi của sự cố xâm phạm 1.107.0.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-10-23

## Điểm nổi bật hôm nay
Không có bản phát hành nào trong 24 giờ qua, nhưng issue tracker và hàng đợi PR lại khá bận rộn: câu chuyện AMD Linux ROCm tiếp tục với một regression mới (#14906) và một PR sửa lỗi gần như cùng lúc (#14933), cùng với một loạt bản sửa lỗi đúng đắn FSDP2/QDoRA đang hội tụ cho merged 4-bit saves. Về phía Studio, công việc tiếp tục với việc phân tích GGUF variant (#14931, #14733), lập kế hoạch residency cho diffusion/video, và các vấn đề UX desktop tồn đọng lâu nay.

## Bản phát hành & Thay đổi phá vỡ tương thích
Không có gì trong 24 giờ qua.

## Hỗ trợ Model & Phần cứng mới
- **DeepSeek-V4.1-Flash-1017 (GGUF)** — Không tải được: llama.cpp đi kèm không nhận diện kiến trúc `deepseek41-dspark`. PR #14931 cũng sửa một bug Studio liên quan, nơi các quant được đánh trọng số imatrix có tên `<model>-<QUANT>-imatrix.gguf` bị phân loại nhầm thành file calibration và bị ẩn đi. ([Issue #14695](https://github.com/unslothai/unsloth/issues/14695), [PR #14931](https://github.com/unslothai/unsloth/pull/14931))
- **AMD Linux ROCm (RDNA3 / gfx1100)** — Báo cáo về việc âm thầm fallback về CPU trên Linux gốc: Studio thêm `/opt/rocm/lib` vào đầu, khiến GPU bị ẩn khỏi `llama-server` đi kèm. Đây là regression từ bản sửa #7208; PR #14933 giữ runtime ROCm đi kèm khi việc prepend của hệ thống che thiết bị. ([Issue #14906](https://github.com/unslothai/unsloth/issues/14906), [PR #14933](https://github.com/unslothai/unsloth/pull/14933))
- **Intel XPU LoRA inference trên Windows** — Trộn lẫn tham số linker GNU và MSVC trong quá trình build. ([Issue #14807](https://github.com/unslothai/unsloth/issues/14807))
- **Lemonade / FastFlowLM (Ryzen AI)** — Chat và tải model ngừng hoạt động sau vài ngày trên Ubuntu 26.10 / Ryzen AI 7 350. ([Issue #14650](https://github.com/unslothai/unsloth/issues/14650))
- **OmniVoice** — Yêu cầu finetune đầy đủ + LoRA và tích hợp UI. ([Issue #14660](https://github.com/unslothai/unsloth/issues/14660))

## Hiệu năng & Tối ưu hóa
- **Embeddings của Studio conversation-archive** — Các cuộc chat dài, nhiều tool mất hàng phút trong `SentenceTransformer.encode` đồng bộ trước khi llama.cpp thấy bất kỳ inference nào; nút Stop không hủy được quá trình archiving. PR sửa #14546 giới hạn và hủy được lượt embedding. ([Issue #14519](https://github.com/unslothai/unsloth/issues/14519), [PR #14546](https://github.com/unslothai/unsloth/pull/14546))
- **`get_statistics()` làm nghẽn đường tải** — `from_pretrained()` bị chặn ~76 giây trên máy qua proxy do kiểm tra khả năng truy cập HuggingFace nằm trong đường tải. ([Issue #14366](https://github.com/unslothai/unsloth/issues/14366))
- **Autotune MoE grouped GEMM trên `device_map` GPU hỗn hợp** — Cache key, lượt tuning, kiểm tra khả năng disk-cache và SMEM fit đều đọc thiết bị CUDA hiện tại thay vì thiết bị thực tế của các experts. PR #14719 key và tune theo GPU của experts. ([PR #14719](https://github.com/unslothai/unsloth/pull/14719))
- **Offset 64-bit cho bảng RoPE** — `cos + pos*stride` với position int32 bị tràn qua 2^31 phần tử (16,8 triệu position ở head_dim 128); PR #14714 dùng offset hàng 64-bit. ([PR #14714](https://github.com/unslothai/unsloth/pull/14714))
- **Studio diffusion: residency FLUX.2 Klein** — Lần tải đầu stream mọi block mỗi bước ngay cả khi int8 vừa đủ để thường trú; PR #14866 khởi tạo residency từ đỉnh đo được ở lần tải đầu. ([PR #14866](https://github.com/unslothai/unsloth/pull/14866))
- **Studio video: residency theo request trên tier streaming / HunyuanVideo-1.5** — Fit lại prefix thường trú dựa trên bộ nhớ trống và hình dạng request. ([PR #14865](https://github.com/unslothai/unsloth/pull/14865))
- **Tải pre-commit.ci** — `scripts/enforce_kwargs_spacing.py` cực kỳ chậm; là gánh nặng tái diễn trên CI xuyên suốt các PR. ([Issue #14174](https://github.com/unslothai/unsloth/issues/14174))

## Ổn định & Regression
Xếp theo mức độ nghiêm trọng:

1. **AMD Linux ROCm fallback CPU âm thầm (regression từ #7208)** — Linux gốc + ROCm hệ thống ẩn GPU khỏi `llama-server` đi kèm; người dùng nhận inference tốc độ CPU mà không có lỗi. PR sửa #14933 đang mở. ([Issue #14906](https://github.com/unslothai/unsloth/issues/14906), [PR #14933](https://github.com/unslothai/unsloth/pull/14933))
2. **FSDP2 merged 4-bit saves** — `save_pretrained_merged` / `push_to_hub_merged` gom trọng số NF4 đã đóng gói về GPU rank 0; PR #14823 staged trên CPU và merge từng layer một, PR #14674 giữ toán hạng merge trên GPU giống như đường không-merged. ([PR #14823](https://github.com/unslothai/unsloth/pull/14823), [PR #14674](https://github.com/unslothai/unsloth/pull/14674))
3. **FSDP2 4-bit QuantState không được khôi phục khi load DCP đầy đủ** — `_without_quant_state` làm mất `weight.absmax` / `quant_map` / `quant_state.bitsandbytes__nf4` khi load; PR #14747 khôi phục chúng. ([PR #14747](https://github.com/unslothai/unsloth/pull/14747))
4. **Load safetensors shard trên Windows bị OOM / os error 1455** — transformers 5.0–5.16 mở mọi shard; PR #14856 chuyển sang `pread`. ([PR #14856](https://github.com/unslothai/unsloth/pull/14856))
5. **Đồng bộ model LAN đa tài khoản** — Nhiều tài khoản trên cùng server cục bộ không giữ model đã tải đồng bộ. Đã đóng. ([Issue #12365](https://github.com/unslothai/unsloth/issues/12365))
6. **Qwen3.5 GatedDeltaNet + context parallel / FSDP2** — Các layer recurrent lai (30/40 GatedDeltaNet) không được shard hoặc context-parallelize đúng cách. ([Issue #12051](https://github.com/unslothai/unsloth/issues/12051))
7. **Xuất GGUF trên Ling 3 Tiny** — Export thất bại với lệnh chuyển đổi nội bộ trên Win 11 + RTX 5060 Ti. ([Issue #14916](https://github.com/unslothai/unsloth/issues/14916))
8. **Model remote-code không xuất được từ UI** — `trust_remote_code=True` hoạt động cho training/chat nhưng Export thất bại khi tải checkpoint; PR sửa #14722. ([Issue #14688](https://github.com/unslothai/unsloth/issues/14688), [PR #14722](https://github.com/unslothai/unsloth/pull/14722))
9. **Tệp đính kèm không đọc được sau auto-compaction** — Ảnh/PDF trở nên vĩnh viễn không đọc được; `search_conversation` không bao giờ được gọi. ([Issue #14708](https://github.com/unslothai/unsloth/issues/14708))
10. **Khớp quá mức quant-token NVFP4 trong Studio** — Các repo có tên model chứa `-NVFP4-` gộp mọi file GGUF thành một variant; PR #14733 giới hạn phạm vi token. ([PR #14733](https://github.com/unslothai/unsloth/pull/14733))
11. **Studio Images Compare grid vs Hires sai lệch negative-prompt** — Logic CFG khác nhau giữa Compare và Hires; đã sửa trong #14875. ([PR #14875](https://github.com/unslothai/unsloth/pull/14875))
12. **Xung đột tham số linker Windows Intel XPU** — Cờ GNU và MSVC bị trộn trong build LoRA inference. ([Issue #14807](https://github.com/unslothai/unsloth/issues/14807))
13. **Chỉnh sửa tin nhắn assistant** — Bị lỗi; đã đóng. ([Issue #13938](https://github.com/unslothai/unsloth/issues/13938))

## Điều này có ý nghĩa gì với nhà phát triển ứng dụng
- **Đừng tin "nó đã tải" trên AMD Linux.** Cho đến khi #14933 được merge, hãy xác minh `llama-server` thực sự chạy trên GPU (`ggml_cuda_init` / phát hiện thiết bị) thay vì suy ra thành công từ UI chat đã hiển thị. Fallback CPU âm thầm là kiểu lỗi chiếm ưu thế trong môi trường này.
- **Nếu bạn chạy FSDP2 QDoRA, hãy ghim phiên bản quanh các vấn đề trọng số merged-agent.** Merged 4-bit saves và khôi phục DCP đầy đủ của checkpoint 4-bit đang được sửa tích cực (#14823, #14674, #14747) — ưu tiên `save_pretrained` + merge riêng, hoặc dựa vào các PR này nếu bạn cần merged-4bit dưới FSDP2.
- **Studio như một gateway inference cục bộ đang trưởng thành nhưng vẫn có rủi ro ở đường tải.** Việc nghẽn archive-embedding (#14519/#14546) có thể khiến các phiên agent dài trông như bị treo trước khi sinh token nào; nút "Stop" hiển thị cho người dùng không ngắt được lượt archive — đáng để bạn bọc thêm timeout riêng nếu bạn xây dựng lên trên.
- **Tải dữ liệu trên Windows là rủi ro thực sự ở quy mô lớn.** Nếu bạn phát hành cho người dùng Windows, OOM khi load safetensors shard (#14856) sẽ xuất hiện trên các model có nhiều shard — theo dõi PR đó cho cửa sổ transformers 5.0–5.16.
- **Xử lý GGUF variant chưa ổn định.** #14931 (đặt tên imatrix) và #14733 (token NVFP4) cho thấy heuristic dựa trên repo/tên file vẫn phân loại nhầm, ảnh hưởng đến kế hoạch tải và menu variant — hãy kiểm tra việc phân giải model ở phía server nếu bạn để người dùng chọn model.
- **Thông lượng CI quan trọng với bạn với tư cách người tiêu dùng, không chỉ maintainer.** Hook pre-commit chậm (#14174) và các PR viết lại formatter lặp lại (#14930) làm tăng độ trễ merge trên toàn repo; hãy dự kiến tiến độ PR chậm hơn một chút cho đến khi điều đó được giải quyết.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*