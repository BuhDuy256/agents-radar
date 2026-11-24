# Bản tin cộng đồng công cụ AI CLI 2026-11-24

> Tạo lúc: 2026-11-24 09:43 UTC | Công cụ theo dõi: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nóng cộng đồng Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

**md2video-audio — biên dịch Markdown thành video MP4 có thuyết minh**
Chuyển tài liệu Markdown thành slide trình bày qua Marp, rồi thêm giọng đọc giống người để tạo file MP4 miễn phí. Dùng khi cần biến một tài liệu viết thành video; PR đang mở (anthropics/skills PR #1703).

**document-typography — kiểm soát chất lượng trình bày cho tài liệu sinh tự động**
Bắt các lỗi xuống dòng lẻ từ, đoạn mồ côi và lệch số thứ tự trong tài liệu do AI tạo ra — những vấn đề ảnh hưởng đến mọi tài liệu Claude tạo nhưng người dùng hiếm khi yêu cầu sửa. PR đang mở (anthropics/skills PR #514).

**scnet-hpc — vận hành cụm SCNet HPC**
Bao gồm quy trình SSH và Slurm theo profile, kèm hướng dẫn về partition, bộ nhớ, module và accelerator, cùng tính năng tạo job và dò tìm cụm. Dùng cho công việc tính toán trên SCNet; PR đang mở (anthropics/skills PR #1615).

**Yêu cầu đang mở**

Các skill cộng đồng phát hành dưới namespace `anthropic/` mạo danh skill chính thức của Anthropic, khiến người dùng cấp quyền nâng cao cho những skill họ tưởng là chính thức (anthropics/skills Issue #492). Ngoài ra, `run_eval.py` không bao giờ kích hoạt skill hay command — người dùng báo tỷ lệ kích hoạt 0% trên mọi truy vấn (anthropics/skills Issue #556).

---

**Những gì đã thay đổi**

- v2.1.331 bổ sung hỗ trợ Code Mode trong các phiên terminal trên Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry và Claude Platform on AWS. Dùng nó để chạy Code Mode trong những môi trường terminal đó. Điều này quan trọng nếu bạn triển khai trên các nhà cung cấp này.
- v2.1.331 bổ sung `oidc.groups_jsonpath` vào Claude apps gateway, đọc groups từ các mục khớp trong một danh sách object. Nó cho phép cấu hình gateway ánh xạ tư cách thành viên nhóm từ các cấu trúc danh sách lồng nhau. Liên quan đến quản trị viên Claude apps gateway.
- PR #11713 (đã đóng) đề xuất một plugin `developer-utilities` với 5 lệnh cho các tính năng được cộng đồng yêu cầu. Các lệnh session đã bị loại bỏ vì chúng đã có sẵn native. Mới chỉ đề xuất, chưa phát hành.

**Đáng để biết**

- Issue #107757 (đang mở, 124 bình luận): một người dùng báo cáo Claude Code đã gửi email của họ cho bên thứ ba trong header `User-Agent` khi tìm kiếm web, và yêu cầu loại bỏ hẳn thay vì thêm tùy chọn opt-out. Dữ liệu chưa có bản sửa.
- Issue #49282 (đang mở, 22 bình luận): trên macOS, đường dẫn cài đặt có version khiến binary đăng ký lại như một ứng dụng mới trong Privacy & Security sau mỗi lần cập nhật, nên quyền bị reset. Dữ liệu chưa có bản sửa.
- Issue #87647 (đang mở): một người dùng báo cáo hơn 6.000 issue gắn nhãn "has repro" đã bị tự động đóng từ tháng 3/2026. Hãy coi các báo cáo cũ có nhãn repro là có thể chưa được sửa.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Có gì thay đổi**

- Bản 0.172.0 thêm tính năng theo liên kết thread: mở các cuộc hội thoại đã lưu và agent lồng nhau ngay từ kết quả tìm kiếm và transcript trong terminal (#62332). Dùng để nhảy vào ngữ cảnh của agent trước đó thay vì tìm lại thread.
- Cùng bản này, hoàn thiện đối số lệnh slash bằng `Tab`, ví dụ `/mcp lo` → `/mcp login` (#62343). Đỡ phải gõ các lệnh con dài.
- Đề xuất: PR #63515 khiến `codex exec` tuân theo phê duyệt đã cấu hình và đã lưu, thay vì trước đây luôn ép thành `never` (#63515). Chưa được merge.

**Đáng chú ý**

- macOS desktop 26.1027.51404 mất quyền điều khiển Full access sau khi tạo cuộc trò chuyện, nên các phiên bị giới hạn (#58677, 32 bình luận). Đang mở.
- iOS Codex hiển thị "No tasks yet" trên danh sách tác vụ trong khi các cuộc hội thoại hiện có vẫn tìm kiếm được (#60778, 33 bình luận). Đang mở.
- Người dùng Plus phản ánh tháng 12/2026 sẽ gộp hạn mức ChatGPT High và Codex/Work thành một giới hạn chung; OpenAI đã xác nhận thay đổi này (#58530, 38 bình luận). Đang mở.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Thay đổi gì**

- v0.72.0-preview.0 sửa lỗi phủ định `.gitignore` lồng nhau trong các mẫu `dir/**` ([PR #30370](https://github.com/google-gemini/gemini-cli/pull/30370)) và mở rộng xử lý đường dẫn home trên Windows. Đáng lưu ý nếu trước đây quy tắc ignore không khớp với repo của bạn.
- v0.71.1 là bản patch cherry-pick thay đổi A2A vào nhánh stable ([PR #30429](https://github.com/google-gemini/gemini-cli/pull/30429)). Máy chủ A2A giờ bắt buộc xác thực bằng bearer token và kiểm tra dữ liệu đầu vào của request ([PR #30420](https://github.com/google-gemini/gemini-cli/pull/30420)) — nếu bạn chạy nó, hãy cấu hình token từ biến môi trường.
- Đề xuất, chưa phát hành: PR #30415 sẽ thêm giới hạn thời gian cho `google_web_search` và dừng thử lại khi bị hủy, nhằm xử lý tình trạng treo được báo cáo ([issue #29594](https://github.com/google-gemini/gemini-cli/issues/29594)).

**Cần biết**

- Quá trình khôi phục subagent sau `MAX_TURNS` được báo cáo là `Termination Reason: "GOAL"` và `status: "success"` ngay cả khi phân tích chưa từng chạy ([issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323), 14 bình luận, mở từ 2026-03-13). Đừng tin trạng thái đó khi viết script quanh subagent.
- Agent generalist được báo cáo là treo vô hạn với những thay đổi đơn giản như tạo thư mục ([issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 bình luận, 8 👍). Yêu cầu model không chuyển sang subagent được cho là cách xử lý tạm.
- Agent trình duyệt bỏ qua các ghi đè trong `settings.json` như `maxTurns` ([issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)). Dữ liệu chưa có bản sửa.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Có gì thay đổi**

- v1.0.115-8 nhóm `--usage-output-file` của subagent theo tên đã cấu hình thay vì invocation ID, và báo cáo số lần mỗi subagent được khởi chạy. Giờ bạn biết agent nào chạy bao nhiêu lần; hữu ích khi kiểm tra các lượt chạy nhiều agent.
- Assisted Permissions có thể thử lại với một review model khác khi model đầu bị treo hoặc lỗi, giảm các lần nhắc phê duyệt không cần thiết.
- PR #5554 (đã đóng) đề xuất tạo connection token theo kiểu opt-in cho container CLI qua `COPILOT_CONNECTION_TOKEN_GENERATE=true`, in ra một token ngẫu nhiên lúc khởi động để client SDK cục bộ kết nối trước khi có thông tin xác thực GitHub.

**Đáng lưu ý**

- Issue #5557 (đang mở): một MCP tool cục bộ quảng bá `outputSchema.anyOf: null` khiến chế độ tương tác lỗi trước khi trả lời, kể cả với prompt không cần tool đó. Chế độ không tương tác vẫn chạy được. Chưa có bản sửa trong dữ liệu.
- Issue #4203 (đang mở, 6 👍): remote MCP access token hết hạn buộc xác thực lại ở chế độ tương tác thay vì dùng refresh token đã cache, làm mất các tool của server.
- Issue #5381 (đang mở): trong `copilot -p`, yêu cầu quyền của extension tool chờ mãi thay vì bị từ chối, và `--allow-tool` không thể gọi tên một extension tool.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Những gì đã thay đổi**

- v2.4.1 khôi phục tính năng lưu tin nhắn assistant trên macOS 12, nơi phiên bản SQLite đi kèm trước đó đã chặn việc này. Điều này quan trọng nếu bạn chạy OpenCode trên máy macOS 12 — phản hồi của assistant giờ được lưu lại. ([#65771](https://github.com/anomalyco/opencode/pull/65771))
- Các provider chỉ cấu hình trong config giờ hiển thị model của họ trong picker, nên provider bạn chỉ thiết lập trong config (chẳng hạn Ollama) có thể chọn được thay vì bị ẩn. Có trong v2.4.1.
- Một bản sửa đề xuất ([#66057](https://github.com/anomalyco/opencode/pull/66057), đóng [#65655](https://github.com/anomalyco/opencode/issues/65655)) khiến thao tác dán trong terminal Windows gửi một CR cho mỗi lần xuống dòng thay vì CR LF, vốn hiện đang chèn thêm dòng trống.

**Đáng lưu ý**

- Trên Ubuntu 26.04, nâng cấp từ v2.3.2 lên v2.4.1 thất bại: bước cài đặt bằng `curl` báo lỗi. Được báo cáo cùng ngày ([#65978](https://github.com/anomalyco/opencode/issues/65978), 9 bình luận); chưa có bản sửa trong dữ liệu.
- Chạy headless với MCP server không ổn định: `opencode run --standalone` không đăng ký MCP server nào trong khoảng 10% phiên, khiến mọi lệnh gọi công cụ MCP thất bại ([#65932](https://github.com/anomalyco/opencode/issues/65932)). Chưa có bản sửa nào được liệt kê.
- Người dùng gói ChatGPT subscription trên 2.2.5 thấy "usage limit reached" dù vẫn còn hạn mức ([#62529](https://github.com/anomalyco/opencode/issues/62529), 13 bình luận). Đang mở, chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua.

- **Đề xuất:** fix(ai): hỗ trợ mức thinking `xhigh` của Gemini (PR #12441, đã đóng). Chọn `xhigh` trên `google/gemini-4-neon` thất bại trước cả khi gửi request với lỗi "Unsupported Google thinking level mapping" (Issue #12443). Đáng quan tâm nếu bạn chạy adapter Google ở mức thinking cao nhất.
- **Đề xuất:** `fix(ai): classify finish_reason "error" in the retry classifier` (PR #12455, đã đóng, đóng #12206). Các stream kết thúc với `finish_reason: "error"` từ Copilot, OpenRouter hoặc Mistral hiện không được thử lại; PR chuyển phần phân loại vào `retry.ts`.
- **Đề xuất:** phân tích stream theo thời gian tuyến tính cho dòng lớn và sự kiện SSE (PR #12451, đang mở, đóng #12224). MCP SSE hiện nối lại và quét toàn bộ buffer đang chờ theo từng chunk; thay đổi này loại bỏ việc quét lặp đó.

**Đáng chú ý**

- Compaction theo ngưỡng có thể kích hoạt sớm hơn nhiều so với context window của model khi chọn một virtual model, vì `contextWindow` không xác định (Issue #12035, 4 bình luận, đang mở).
- Trong một phiên dài, phần tóm tắt compaction tăng từ 17k lên 164k ký tự qua chín lần compaction; lần thứ chín mất 588 giây và 75k output token (Issue #12242, 4 bình luận, đang mở).
- Phiên Kimi được khôi phục không chọn được bốn tool có trong payload gửi tới provider, trên Pi 1.6.0 với `kimi-coding` (Issue #12383, đang mở).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Thay đổi gì**

Không có bản phát hành nào trong 24 giờ qua.

**Đáng chú ý**

- Bản ghi phiên có thể phình to đến mức phiên không mở được: `file_history_snapshot` tăng theo bậc hai và chạm giới hạn chỉ mục 256 MiB được hardcode, sau đó mọi `POST /session/:id/load` đều thất bại ([#13113](https://github.com/QwenLM/qwen-code/issues/13113), 12 bình luận). Một PR sửa lỗi ([#18219](https://github.com/QwenLM/qwen-code/pull/18219)) chỉ siết quyền truy cập tệp bản ghi, không động đến giới hạn này.
- Các lệnh gọi công cụ thỉnh thoảng làm mất tham số JSON bắt buộc, gây lỗi `params must have required property '<field>'`, có thể leo thang thành vòng lặp thử lại không thể phục hồi ([#18197](https://github.com/QwenLM/qwen-code/issues/18197)). Người báo cáo cho rằng lỗi nằm ở ranh giới phát sinh/tuần tự hóa; dữ liệu không cho thấy PR sửa lỗi nào.
- Dùng trình soạn thảo ngoài bằng `Ctrl+X` (micro/nano/vim) khiến TUI bị lỗi hiển thị và ô soạn thảo không phản hồi sau khi thoát ([#18202](https://github.com/QwenLM/qwen-code/issues/18202)). Dữ liệu không có cách sửa; cách khôi phục duy nhất được nêu là tắt tiến trình.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*