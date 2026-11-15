# Bản tin AI từ cộng đồng công nghệ 2026-11-15

> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | 5 mục | Tạo lúc: 2026-11-15 06:14 UTC

---

## Workflow
### Một dòng ghi người gửi đã cắt tuyên bố sai "chúng ta đang nói chuyện" của agent
Tác giả thử xem tin nhắn tự kiểm tra theo lịch có nên ghi rõ ai kích hoạt nó không. Trên một bản sao đóng băng của ngữ cảnh kiểm tra, họ thêm một dòng: "sender=scheduler, not Keniel; Keniel is not participating in this turn", rồi lên lịch 24 lần gọi cho mỗi phiên bản tới `gemini-3.5-flash-lite` ở temperature 0.7 và cho một model chấm 47 câu trả lời mà không biết phiên bản. Số lần tuyên bố có cuộc trò chuyện đang diễn ra giảm từ 20 trên 23 xuống 2 trên 24 (Fisher exact p ≈ 0,0000000365). Kết quả chỉ áp dụng cho một ngữ cảnh đóng băng và một model; phiên bản có ghi nhãn vẫn tuyên bố sai hai lần. Tác giả gợi ý thử cùng cách này trên bất kỳ agent nào có heartbeat theo lịch hoặc cron audit.
Nguồn: [dev.to](https://dev.to/kenielzep97/i-told-my-agent-who-sent-the-message-it-mostly-stopped-saying-we-were-talking-12o8)
Tương tác: 7 reaction · 0 bình luận · 6 phút đọc

### Quantize KV cache để nhét model 19,5GB vào 24GB VRAM
Tác giả giải thích vì sao model 32B Q4_K_M với khoảng 19,5 GB trọng số cộng thêm KV cache FP16 có thể vượt quá GPU 24 GB, và đưa ra cách khắc phục. Các bước: bật Flash Attention, đặt loại KV cache thành `q8_0` để giảm bộ nhớ cache khoảng một nửa, đặt số chuỗi song song bằng 1, và đặt độ dài ngữ cảnh cụ thể như 16384 qua Modelfile hoặc cờ `llama.cpp` như `-ctk q8_0` và `-ctv q8_0`. Tác giả ước tính giảm từ ngữ cảnh 32K xuống 16K sẽ đưa bộ nhớ KV từ khoảng 4,29 GB xuống 2,15 GB. Client có thể ghi đè các cài đặt này; kiểm tra bằng `ollama ps` và `nvidia-smi`.
Nguồn: [dev.to](https://dev.to/shuraj_shampang_823cf28f2/why-your-195gb-llm-crawls-on-24gb-vram-the-kv-cache-fix-1k19)
Tương tác: 5 reaction · 3 bình luận · 7 phút đọc

## Thử nghiệm và so sánh
### Chọn mục tiêu tốt hơn không tạo ra kết quả nhiệm vụ tốt hơn
Tác giả xây một model phán đoán tên Jev để chỉ huy xạ thủ bot trong game zombie, rồi so sánh ba nhánh trên cùng seed qua 48 nhiệm vụ ghép cặp: không có chỉ huy, luật viết tay, và Jev. Jev chọn mục tiêu bị nhà chắn 3 trên 715 lần so với 154 trên 706 của luật viết tay, nhưng tỉ lệ thắng, máy bay mất và người sống sót được cứu không khác biệt về mặt thống kê, trong khi điểm mỗi nhiệm vụ giảm khoảng 27% (trung bình −10.460, KTC 95% [−13.585, −7.276]). Tác giả cho rằng nguyên nhân là bot vốn đã quyết định lại mỗi nửa giây trong khi chỉ huy chỉ hành động mỗi 15 giây. Họ cũng lưu ý kết quả trước đó với 8 nhiệm vụ mỗi nhánh về số máy bay mất không giữ được khi tăng cỡ mẫu.
Nguồn: [dev.to](https://dev.to/copyleftdev/zombies-a-gunship-and-a-judgment-model-what-could-go-wrong-2k95)
Tương tác: 7 reaction · 0 bình luận · 7 phút đọc

### Swizzle Runtime báo 209 tok/s và 43ms TTFT trên GPU laptop 4GB
Công ty mở mã nguồn Swizzle Runtime v0.1.0 theo Apache-2.0, một binary Rust với kernel AVX2, CUDA và Vulkan, và công bố benchmark so với `llama.cpp`. Trên AMD Ryzen 7 170 với GPU RTX 3050 Laptop (4 GB, sm_86, CUDA 12.8), công ty cho biết đạt 209,70 tok/s so với 196,84 trên `tg128` với Qwen3-0.6B-Q8_0, TTFT 43,37 ms, và mức tăng phía CPU lớn hơn (90,61 so với 65,80 trên `edit256`). Các lần chạy được mô tả là greedy parity bit-identical với llama.cpp, lặp năm lần với 5 giây cooldown. Đây là số liệu của chính công ty trên một máy và một cặp model nhỏ; chúng không cho thấy hành vi trên các model lớn hơn.
Nguồn: [dev.to](https://dev.to/paramveer_singh_53163a04c/swizzle-runtime-v010-how-we-reached-209-toks-and-43ms-ttft-on-a-4gb-laptop-gpu-in-pure-rust-4l7l)
Tương tác: 9 reaction · 3 bình luận · 2 phút đọc

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*