# Bản tin cộng đồng công cụ AI CLI 2026-10-23

> Tạo lúc: 2026-10-23 05:49 UTC | Công cụ theo dõi: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## So sánh chéo công cụ

# Công cụ AI CLI — Báo cáo so sánh đa công cụ

**Ngày:** 2026-10-23 · **Phạm vi:** Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, Qwen Code

---

## 1. Tổng quan hệ sinh thái

Bối cảnh các công cụ AI CLI giờ đây đã là một sân chơi trưởng thành và cạnh tranh, nơi các coding agent chạy native trên terminal đang hội tụ về một bộ tính năng chung — sandbox, tích hợp MCP, subagent, duy trì phiên làm việc, và khả năng quan sát chi phí — trong khi khác biệt hóa ở mô hình thực thi, đối tượng người dùng, và độ phủ nền tảng. Các bản digest kỳ này cho thấy một sự dịch chuyển từ câu hỏi "agent có làm được việc không?" sang "tôi có thể tin và kiểm soát agent đang làm việc không?": lỗ hổng trong mô hình phân quyền, thành công giả âm thầm, và cấu hình âm thầm không được áp dụng xuất hiện ở gần như mọi công cụ. Tăng cường bảo mật (thoát sandbox, bypass symlink, làm mới token) là chủ đề kỹ thuật chiếm ưu thế, với Claude Code, Gemini CLI, và các dự án liên quan Gemini CLI đều đã phát hành hoặc đang triển khai các bản vá sandbox. Đồng thời, một "món nợ parity" đang tích tụ rõ rệt khi các bề mặt Desktop, IDE, Web Shell, và ACP tụt lại phía sau CLI, tạo ra các cụm lỗi hồi quy. Windows vẫn là nền tảng yếu nhất trên mọi phương diện — rò rỉ tiến trình, lỗi ACL, và sự ngây thơ trong xử lý shell liên tục tái diễn.

---

## 2. So sánh mức độ hoạt động

*Dữ liệu phản ánh cửa sổ 24 giờ kết thúc ngày 2026-10-23. Số liệu được báo cáo trong các bản digest. "N/A" = kênh không được sử dụng/không có sẵn ở phía upstream, không phải không hoạt động.*

| Công cụ | Issue nổi bật được trích dẫn | Tiến độ PR chính | Thảo luận | Trạng thái phát hành |
|---|---|---|---|---|
| **Claude Code** | 10 + danh dự đề cập | 7 (tất cả CLOSED, một tác giả) | N/A (không có) | ✅ v2.1.309 (tăng cường sandbox) |
| **OpenAI Codex** | 10 + 3 cụm "at capacity" | 10 (chủ yếu do bot tạo, CLOSED) | ✅ 2 Ideas, 3 Q&A, 6 Show-and-tell | ✅ rust-v0.164.0 + alphas |
| **Gemini CLI** | 10 | 10 (hỗn hợp open/closed) | N/A (không có) | ⚠️ Chỉ nightly (không có stable) |
| **GitHub Copilot CLI** | 10 | 0 (không có PR nào cập nhật) | N/A (không có) | ✅ v1.0.103 (patch) |
| **OpenCode** | 10 | 12 (hỗn hợp open/closed) | N/A (trong Issues/PRs) | ✅ v1.19.4 (Bun 1.4.4) |
| **Pi** | 10 | 10 (hỗn hợp open/closed) | ✅ 2 Show-and-tell | ❌ Không có trong 24h |
| **Qwen Code** | 10 | 10 (hỗn hợp open/closed) | N/A (trong Issues) | ⚠️ Chỉ nightly |

**Đọc bảng này:**
- **Nhịp phát hành mang tính lưỡng cực.** Claude Code, Codex, Copilot CLI, và OpenCode phát hành thay đổi hướng người dùng hàng ngày đến hàng tuần; Gemini CLI và Qwen Code đang trong giai đoạn ổn định chỉ-nightly.
- **Thông lượng PR khác biệt rất lớn.** Copilot CLI báo cáo *không* có hoạt động PR nào (vận hành dựa trên issue/release), trong khi OpenCode và Pi cho thấy 10–12 PR với tỷ lệ open/closed lành mạnh.
- **Kênh thảo luận khá mỏng.** Chỉ Codex và Pi có Discussions được tổ chức. Claude Code, Gemini CLI, Copilot CLI, và Qwen Code thực chất định tuyến đầu vào cộng đồng qua Issues — một tín hiệu về cách các dự án này quản lý bề mặt cộng đồng rất khác nhau.

---

## 3. Định hướng tính năng chung

Năm cụm yêu cầu xuất hiện độc lập ở nhiều cộng đồng công cụ, cho thấy nhu cầu thực sự ở cấp hệ sinh thái chứ không phải nhiễu từ một dự án đơn lẻ.

**A. Sandbox có thể thực thi & tăng cường phân quyền** — *Claude Code, OpenCode, Copilot CLI, Gemini CLI, Pi*
- OpenCode #2242 (101 bình luận, 80 👍) vẫn là issue đa công cụ được upvote cao nhất: người dùng muốn các hạn chế tương đương macOS seatbelt để ngăn truy cập ngoài cwd.
- Copilot CLI #5232 (thư mục tin cậy tự động phê duyệt shell trong chế độ thủ công) và OpenCode #52083/#50652 (bypass phân quyền qua lệnh ghép/plugin) mô tả *cùng một kiểu lỗi*: allow-list không xác thực được ý định.
- Gemini CLI #29688 (bypass qua shell-wrapper) và Claude Code #56281/cụm PR (hệ thống phân cấp plugin "chỉ thắt chặt") cho thấy maintainer đang chủ động bịt các lỗ hổng này.

**B. Khả năng quan sát context-window / mức sử dụng / chi phí** — *Claude Code, Codex, OpenCode*
- Claude Code cho thấy làn sóng thực sự (8 issue trùng lặp) yêu cầu khôi phục vòng tròn/popover context-window trong tab Desktop Code.
- Codex #51088 (quota cạn kiệt trên prompt đã cache) và OpenCode #57975 (dashboard sử dụng hợp nhất), #34344 (lỗ hổng rate-limit) phản ánh khả năng quan sát chi phí là yêu cầu thiết yếu, gắn với niềm tin.
- Điểm chung: người dùng không thể đối chiếu những gì bị tính phí với những gì họ nhìn thấy.

**C. Thành công âm thầm / thất bại âm thầm là không thể chấp nhận** — *Gemini CLI, Qwen Code, Pi, OpenCode*
- Gemini CLI #22323 (`status: "success"` sau khi chạm MAX_TURNS) và #21983 (`GOAL` khi Wayland thất bại).
- Qwen Code #15328 (exit 0, không có output khi lượt bị cắt ngắn), #15325 (câu trả lời cũ vượt giới hạn lượt), #15297 (kết quả tool bị mất).
- Pi #11223 (`modelOverrides` bị âm thầm bỏ qua) và OpenCode #58335 (provider không bao giờ đăng ký).
- Yêu cầu đồng thuận: **thất bại to và sớm hơn là no-op âm thầm.**

**D. Parity đa bề mặt & duy trì phiên làm việc** — *Codex, Claude Code, Qwen Code*
- Codex #14067 (69 👍) — đồng bộ thread/context giữa các thiết bị.
- Claude Code — parity Desktop↔CLI (theme, autocomplete, động từ cấu hình được).
- Qwen Code #15327 — hợp nhất CLI/Web Shell/ACP/SDK trên một agent loop để loại bỏ lỗi phân kỳ.

**E. Khả năng cấu hình & mật độ output** — *Pi, Claude Code, Codex, Copilot CLI*
- Pi #10259 (chế độ tool một dòng / API trình bày tool công khai), #11127 (phạm vi làm ấm cache).
- Claude Code #102095 (mức effort: 3 click so với 1), #52420 (động từ hoàn thành cấu hình được).
- Codex v0.164.0 `/presets` + inline `/model` đã đáp ứng trực tiếp điều này.
- Xuyên suốt: **người dùng chuyên sâu muốn giành lại click và không gian dọc.**

---

## 4. Phân tích khác biệt hóa

| Chiều | Claude Code | Codex | Gemini CLI | Copilot CLI | OpenCode | Pi | Qwen Code |
|---|---|---|---|---|---|---|---|
| **Người dùng chính** | Người dùng Anthropic chuyên sâu, gói Max | Pro/Plus, BYOK, doanh nghiệp | Native terminal, gần GCP | Lập trình viên GitHub/doanh nghiệp | Dân OSS mày mò, đa provider | Lập trình viên quan tâm hiệu năng | Người dùng Qwen Cloud / MaaS |
| **Trọng tâm khác biệt** | Hệ thống phân cấp bảo mật plugin; ứng dụng Desktop | Preset, cấu hình quản lý, cloud agent | Kỹ thuật độ tin cậy agent; tooling AST | Mô hình phân quyền; vòng đời MCP/OAuth | Đa provider, i18n, tăng cường MCP | Độ trễ khởi động, mở rộng TUI | Stack Managed Agent/daemon/Web Shell |
| **Mô hình thực thi** | Bash sandbox + Desktop | Hook quản lý, executor theo phạm vi env | Đa dụng + subagent trình duyệt | Chế độ ACP, subagent nền | Dựa trên server, theo phiên | Nhiều extension, host Harness | Unified loop (đề xuất) |
| **Cách tiếp cận kỹ thuật** | Hợp đồng bảo mật, gating engine/mod | Rust, thay đổi nội bộ (PR bot) | Kỷ luật thiết kế tham chiếu (EPIC) | Nhịp patch nhanh | Runtime Bun đi kèm, sửa MCP mạnh | Benchmark hiệu năng so với jcode | Tăng cường CI, broker runtime |
| **Điểm yếu nhất** | Lỗi hồi quy Desktop tích tụ | Rò rỉ tài nguyên Windows (từ tháng 6) | Thành công giả âm thầm | MCP/OAuth trên Windows | Bypass phân quyền | Độ bền nhập liệu TUI | Chế độ thất bại âm thầm |

**Khác biệt cấu trúc chính:**
- **Claude Code** là công cụ duy nhất chính thức hóa *hệ thống phân cấp bảo mật plugin* (org > user; "chỉ thắt chặt"). Họ đang xử lý khả năng mở rộng như một bài toán quản trị.
- **Codex** dẫn đầu về thông lượng PR do bot — thay đổi nội bộ mạnh quanh cấu hình quản lý và rollout tracing cho thấy đang đặt nền móng cho doanh nghiệp.
- **Gemini CLI** tập trung vào độ tin cậy một cách bất thường đối với một nhà cung cấp mô hình lớn: các issue hàng đầu là lỗi đúng đắn trong điều phối agent, không phải thiếu tính năng.
- **Pi** cạnh tranh rõ ràng về **hiệu năng** (ngân sách khởi động benchmark so với jcode, độ trễ re-render TUI ở 800+ tin nhắn) — một trục khác biệt riêng.
- **Qwen Code** định hướng "product-stack" nhất, xây dựng daemon + Web Shell + managed runtime thay vì một CLI đơn lẻ.
- **OpenCode** *không phụ thuộc provider* nhất và có tư thế i18n/đa provider mạnh nhất, nhưng lỗ hổng mô hình phân quyền là khiếu nại tái diễn nghiêm trọng nhất.

---

## 5. Đà phát triển cộng đồng & độ trưởng thành

**Xếp hạng đà phát triển (tổng hợp từ độ nóng issue, thông lượng PR, hoạt động thảo luận, nhịp phát hành):**

1. **OpenCode** — Tương tác duy trì cao nhất (#2242 với 101 bình luận là outlier của hệ sinh thái), 12 PR với hỗn hợp open/closed thực sự, phát hành hàng ngày. Một hệ thống con non trẻ (vòng đời MCP, phân quyền) đang được tăng cường mạnh mẽ. *Đang lặp nhanh, chưa trưởng thành.*
2. **Claude Code** — Hoạt động issue dày đặc, cụm PR một tác giả cho thấy nỗ lực maintainer tập trung, phát hành bảo mật định kỳ. *Trưởng thành nhưng nợ Desktop đang tích tụ.*
3. **Codex** — Khối lượng PR cao nhưng chủ yếu là PR CLOSED do bot tạo (gợi ý quy trình hàng loạt/tự động), hiện diện Discussion mạnh, phát hành hướng người dùng. *Trưởng thành về cấu trúc, cộng đồng ít hiện diện trong code.*
4. **Qwen Code** — 10 PR trải khắp nhiều hệ thống con, công việc CI tích cực, phát hành nightly. *Đang lặp nhanh trên một stack rộng.*
5. **Pi** — Cộng đồng nhỏ hơn nhưng gắn kết (văn hóa Show-and-tell, issue có phản ứng tích cực), tốc độ sửa lỗi mạnh. *Cộng đồng tinh gọn, phản hồi nhanh, trẻ.*
6. **Gemini CLI** — Quản lý issue chất lượng cao (tag P0/P1, EPIC) nhưng không có bản phát hành ổn định và nhịp chỉ-nightly trong hôm nay. *Kỹ thuật kỷ luật, tốc độ hướng người dùng chậm hơn trong cửa sổ này.*
7. **Copilot CLI** — **Không có PR nào hôm nay**, vận hành dựa trên issue, chỉ phát hành patch. *Tốc độ code thấp nhất thấy được trong cửa sổ này; có thể bị giới hạn băng thông maintainer hoặc là nội bộ.*

**Tín hiệu trưởng thành:**
- **Hạ tầng cộng đồng trưởng thành nhất:** Codex và Pi (Discussions có tổ chức, Q&A, Show-and-tell).
- **Bề mặt kém trưởng thành nhất:** mô hình phân quyền OpenCode, độ tin cậy headless của Qwen Code — cả hai đều cho thấy đau đớn của hệ thống non trẻ.
- **Cờ rủi ro niềm tin:** Claude Code #97936 ghi chú rõ các báo cáo trước đây *bị tự động đóng là stale mà không có bản sửa* — một anti-pattern trưởng thành đáng theo dõi.

---

## 6. Tín hiệu xu hướng

**Cho lập trình viên xây dựng trên các công cụ này:**

1. **Thất bại âm thầm là biên giới niềm tin mới.** Trên Gemini CLI, Qwen Code, Pi, và OpenCode, "success"

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nóng cộng đồng Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Báo cáo điểm nổi bật cộng đồng
*Nguồn dữ liệu: github.com/anthropics/skills · Ảnh chụp: 2026-10-23*

---

## 1. Bảng xếp hạng Skills hàng đầu
*Lưu ý: tập dữ liệu PR hiển thị số lượng bình luận là `undefined`, nên bảng xếp hạng dưới đây được suy ra từ liên kết issue, độ mới của cập nhật, và khối lượng thảo luận tham chiếu chéo trong Issues.*

| # | Skill / PR | Chức năng | Điểm thảo luận nổi bật | Trạng thái |
|---|------------|---------------|----------------------|--------|
| 1 | **mcp-builder** — [PR #1742](https://github.com/anthropics/skills/pull/1742) | Sửa đổi tên import MCP `>=2.0.0` (`streamablehttp_client` → `streamable_http_client`) và xử lý custom header qua `create_mcp_http_client` | Liên kết với Issue [#1390](https://github.com/anthropics/skills/issues/1390) (eval harness đạt 0/N điểm với các MCP server thật); tác động lớn đến tooling của agent | OPEN |
| 2 | **skill-creator** — [PR #1298](https://github.com/anthropics/skills/pull/1298) | Cô lập trigger evals, sửa lỗi subprocess/`select()` trên Windows, ngăn lỗi runtime bị chấm nhầm thành non-trigger | Tương ứng với Issues [#556](https://github.com/anthropics/skills/issues/556) (tỷ lệ trigger 0%) và [#1383](https://github.com/anthropics/skills/issues/1383) (lỗi benchmark âm thầm) | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** — [PR #1245](https://github.com/anthropics/skills/pull/1245) | Chuyển đổi spec sản phẩm/kỹ thuật thành task Notion kèm tiêu chí nghiệm thu; skill thứ hai kiểm tra định lượng CV | Chạy dài (mở tháng 6, cập nhật tháng 10) — cho thấy cộng đồng quan tâm bền vững đến quy trình spec-to-task | OPEN |
| 4 | **proofcore-contract-auditor** — [PR #1771](https://github.com/anthropics/skills/pull/1771) | Phân tích tĩnh hợp đồng Solidity/Rust với bằng chứng audit mật mã neo trên TON Blockchain | Mảng Web3; đáng chú ý như một trong những Skill gốc blockchain đầu tiên được gửi lên | OPEN |
| 5 | **md2video-audio** — [PR #1703](https://github.com/anthropics/skills/pull/1703) | Pipeline chi phí bằng không: Markdown → slide Marp → MP4 với giọng đọc như người thật | Đại diện cho nhóm Skill "sản xuất nội dung" | OPEN |
| 6 | **pyxel** — [PR #525](https://github.com/anthropics/skills/pull/525) | Phát triển game retro bằng Python: chạy headless theo input, kiểm tra frame, kiểm tra state | Một trong những PR mở lâu nhất (tháng 3 → tháng 9); niche game/sáng tạo riêng | OPEN |
| 7 | **document-typography** — [PR #514](https://github.com/anthropics/skills/pull/514) | Ngăn orphan wrap, widow paragraph, lệch số thứ tự trong tài liệu được tạo | Ứng dụng phổ quát — ảnh hưởng đến *mọi* tài liệu Claude tạo ra | OPEN |
| 8 | **odt** — [PR #486](https://github.com/anthropics/skills/pull/486) | Tạo OpenDocument (.odt/.ods), điền template, phân tích ODT→HTML | Lấp khoảng trống định dạng bên cạnh các skill docx/pdf/xlsx hiện có | OPEN |

---

## 2. Xu hướng nhu cầu cộng đồng

Chắt lọc từ ảnh chụp Issues:

- **Tin cậy & bảo mật namespace** — Issue [#492](https://github.com/anthropics/skills/issues/492) (46 bình luận, cao nhất từ trước đến nay) yêu cầu ranh giới rõ ràng giữa skill chính thức `anthropic/` và skill do cộng đồng gửi. **Mối quan tâm lớn nhất của cộng đồng.**
- **Chia sẻ skill toàn tổ chức / trải nghiệm marketplace** — Issue [#228](https://github.com/anthropics/skills/issues/228) (8 👍) muốn có thư viện chia sẻ thay vì quy trình Slack-rồi-upload.
- **Độ tin cậy của eval & benchmark** — Issues [#556](https://github.com/anthropics/skills/issues/556), [#1383](https://github.com/anthropics/skills/issues/1383): trigger evals thực tế bị hỏng (tỷ lệ trigger 0%, không tương thích Windows). **Meta-tooling là một nhóm nhu cầu riêng.**
- **Hiệu quả context/token** — Issue [#1487](https://github.com/anthropics/skills/issues/1487): skill `claude-api` nạp sẵn ~156k token, làm cạn context window. Issue [#1329](https://github.com/anthropics/skills/issues/1329) đề xuất ký hiệu tượng trưng `compact-memory`.
- **Quản trị agent & cổng chất lượng** — Issues [#412](https://github.com/anthropics/skills/issues/412), [#1385](https://github.com/anthropics/skills/issues/1385): thực thi policy, đánh giá đối kháng, pipeline xác minh bàn giao.
- **Vệ sinh trùng lặp skill** — Issue [#189](https://github.com/anthropics/skills/issues/189) (9 👍): `document-skills` và `example-skills` cài nội dung giống hệt nhau, làm phình context.

**Các mảng dọc mới nổi được cộng đồng quan tâm:** Web3/hợp đồng thông minh, vận hành HPC (SCNet), game retro, tạo video, định dạng ODT/ODF.

---

## 3. Các Skill đang chờ xử lý có tiềm năng cao
*Các PR có bình luận sôi nổi chưa được merge, khả năng cao sẽ được hợp nhất.*

| Skill / PR | Vì sao sắp được merge | Liên kết |
|------------|----------------|------|
| **Sửa YAML frontmatter của skill-creator** | Mở ngày 10/10, cập nhật 19/10 — bản sửa đang hoạt động mới nhất; khắc phục lệch metadata giữa tên eval và SKILL.md | [PR #1997](https://github.com/anthropics/skills/pull/1997) |
| **Loại bỏ `shell=True` trong webapp-testing** | Cập nhật 22/10 (mới nhất trong tập dữ liệu); xử lý lỗ hổng command injection CWE-78 | [PR #1980](https://github.com/anthropics/skills/pull/1980) |
| **Phát hiện bình luận mồ côi trong docx** | Được chỉnh sửa liên tục 6/9 → 25/9, bổ sung tính năng đơn giản | [PR #1734](https://github.com/anthropics/skills/pull/1734) |
| **Xử lý timeout LibreOffice trong docx** | Sửa báo cáo thành công giả; đi kèm Issue [#2018](https://github.com/anthropics/skills/issues/2018) | [PR #1792](https://github.com/anthropics/skills/pull/1792) |
| **Sửa `wrapAround()` trong algorithmic-art** | Đóng Issue [#1897](https://github.com/anthropics/skills/issues/1897); dựa trên modulo, rủi ro thấp | [PR #1977](https://github.com/anthropics/skills/pull/1977) |
| **Khám phá phần tử trong webapp-testing** | Đóng Issue [#1891](https://github.com/anthropics/skills/issues/1891); báo cáo thẻ textarea/select | [PR #1976](https://github.com/anthropics/skills/pull/1976) |
| **Chạy độc lập skill-creator** | Cập nhật 8/10 — sửa `ModuleNotFoundError` khi chạy trực tiếp `package_skill.py` | [PR #1681](https://github.com/anthropics/skills/pull/1681) |
| **Dọn URL chết trong claude-api** | Đơn giản, đã xác minh thay thế HTTP 200; merge ít ma sát | [PR #1730](https://github.com/anthropics/skills/pull/1730) |

**Mẫu hình:** các merge ngắn hạn mạnh nhất là **sửa meta-tooling cho `skill-creator`, `webapp-testing`, và `docx`** — lớp hạ tầng, không phải mảng dọc mới.

---

## 4. Góc nhìn về hệ sinh thái Skills

> **Nhu cầu tập trung nhất của cộng đồng không phải là Skill mới, mà là độ tin cậy và đáng tin cậy của chính hạ tầng Skills** — trigger eval bị hỏng, mạo danh namespace, meta-skill làm phình context, và lỗi script âm thầm chiếm phần lớn thảo luận, nhiều hơn hẳn bất kỳ năng lực mới đơn lẻ nào.

---

# Claude Code Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

**Code tab** của ứng dụng Desktop đang chiếm sóng toàn bộ cuộc thảo luận hôm nay, với một loạt lỗi regression xoay quanh khả năng hiển thị context-window, tính bền vững của Remote Control, và hộp "next-step" cuối lượt mới đang gây ra nhiều trở ngại đáng kể. Về phía kỹ thuật, một bản phát hành **tăng cường sandbox** quan trọng (v2.1.309) đã sửa các vấn đề rò rỉ startup-file và lỗ hổng ghi bypass qua symlink trên macOS/Linux. Một vấn đề thanh toán gây chú ý (lỗi nâng cấp Max 5x → Max 20x) vẫn tiếp tục âm ỉ mà không có dấu hiệu giải quyết từ bộ phận hỗ trợ.

---

## 2. Bản phát hành

**v2.1.309** — Sửa lỗi sandbox tập trung vào bảo mật:
- Sửa lỗi các lệnh Bash trong sandbox trên macOS/Linux thực thi **startup file của shell bên ngoài sandbox** trước mỗi lệnh (một vector thoát tiềm ẩn nghiêm trọng).
- Sửa lỗi các mẫu glob `denyWrite` trên macOS không được áp dụng tại **vị trí thực** của đường dẫn khi truy cập qua symlink.
- Các bản sửa sandbox bổ sung (bị cắt trong changelog).

Đây là một bản phát hành tăng cường bảo mật có ý nghĩa với bất kỳ ai dựa vào Bash sandbox như một ranh giới tin cậy; nên nâng cấp.

---

## 3. Issue nổi bật

1. **[#56281](https://github.com/anthropics/claude-code/issues/56281)** — *Nâng cấp Max 5x → Max 20x thất bại, hỗ trợ không phản hồi.* 36 bình luận, 11 👍. Vấn đề thanh toán leo thang suốt năm tháng không có giải pháp. Mọi lần thanh toán đều thất bại bất chấp nhãn từ khóa `[invalid]` — người dùng thất vọng cả về luồng thanh toán lẫn việc không nhận được phản hồi hỗ trợ.

2. **[#79305](https://github.com/anthropics/claude-code/issues/79305)** — *Theme tùy chỉnh / màu accent cho Desktop.* 23 bình luận, **71 👍** — issue được upvote nhiều nhất trong đợt này. Người dùng muốn có sự tương đồng với hệ thống theme của CLI; phàn nàn về "các cửa sổ tối không thể phân biệt" nhận được nhiều đồng tình trong các quy trình làm việc đa màn hình.

3. **[#102132](https://github.com/anthropics/claude-code/issues/102132)** — *Hộp next-step trên Desktop có thể kết thúc lượt trước khi phản hồi được viết.* 20 bình luận, 27 👍. Đây là lỗi chức năng, không chỉ là UX: `wrap_up` với `ask` cắt ngắn phản hồi thực tế của model.

4. **[#102273](https://github.com/anthropics/claude-code/issues/102273)** — *Hộp next-step "cản trở thảo luận thực sự".* 19 bình luận, 45 👍. Đồng hành trực tiếp với #102132; cộng đồng đang thống nhất quan điểm rằng giao diện cuối lượt mới mang tính gia trưởng và gây gián đoạn.

5. **[#52420](https://github.com/anthropics/claude-code/issues/52420)** — *Tùy chỉnh động từ cho dòng hoàn thành sau lượt.* 12 bình luận, 30 👍. Yêu cầu đã có sáu tháng về việc tùy chỉnh dòng "cogitated for 12s" đầy ngẫu hứng qua `settings.json`. Mức độ tương tác cao cho một thay đổi có vẻ nhỏ.

6. **[#102095](https://github.com/anthropics/claude-code/issues/102095)** — *Mức effort giờ cần 3 cú click thay vì 1.* 10 bình luận. Nỗi đau người dùng được định lượng: "50 lần chuyển/ngày = thêm 100 cú click." Lỗi regression kinh điển giữa khả năng khám phá và mật độ hiển thị.

7. **[#102094](https://github.com/anthropics/claude-code/issues/102094) [ĐÃ ĐÓNG]** — *Mức sử dụng context-window không còn được hiển thị ở đâu cả.* Một trong nhiều bản trùng lặp (#102103, #102176, #102133, #102615, #103885, #103918) — xem Xu hướng Tính năng bên dưới.

8. **[#76353](https://github.com/anthropics/claude-code/issues/76353)** — *Công cụ Bash rò rỉ tiến trình con mồ côi khi timeout trên Windows.* Các tiến trình `find.exe` chạy hoang tàn tích tụ hàng giờ. Không có 👍 nhưng đây là lỗi rò rỉ tài nguyên nghiêm trọng trên nền tảng Windows.

9. **[#100973](https://github.com/anthropics/claude-code/issues/100973)** — *Thu hồi/chỉnh sửa tin nhắn giết chết TẤT CẢ tác vụ nền.* Ngữ nghĩa rewind khác nhau giữa terminal (giữ nguyên) và Desktop (giết chết). Ảnh hưởng đến bất kỳ ai dùng background agent.

10. **[#97936](https://github.com/anthropics/claude-code/issues/97936)** — *Autocomplete `/` bỏ sót user skill và lệnh plugin trong Desktop Projects / Remote Control.* Lệnh vẫn hoạt động nếu gõ đầy đủ — một khoảng trống thuần bề mặt khiến việc khám phá trở nên bất khả thi. Đáng chú ý, các báo cáo trước đó đã bị **tự động đóng vì stale mà không có bản sửa nào**.

Trích dẫn danh dự: [#73069](https://github.com/anthropics/claude-code/issues/73069) font codicon VSCode bị chặn bởi CSP; [#104494](https://github.com/anthropics/claude-code/issues/104494) lỗi tổng hợp "Prompt is too long" do bug thứ tự trong auto-compact; [#103018](https://github.com/anthropics/claude-code/issues/103018) công cụ `ccd_turn` tích hợp sẵn bị tính vào giới hạn gói và thiếu trong `/usage`.

---

## 4. Tiến độ PR quan trọng

Tất cả PR hiển thị hôm nay đều đến từ một người đóng góp duy nhất (`poteat`) và đều ở trạng thái **ĐÃ ĐÓNG**, chủ yếu xoay quanh các tầng bảo mật plugin và trạng thái UI. Một số được xếp chồng và ghi chú phụ thuộc thứ tự merge vào các bản phát hành engine chưa công bố.

1. **[#97293](https://github.com/anthropics/claude-code/pull/97293)** — Khai báo cho cờ cắt ngắn `process.run` (`isStdoutTruncated`/`isStderrTruncated`) và `mtimeMs` của `fs.list`. Giữ lại cho đến khi npm CLI mang các trường này. Ví dụ điển hình về kỷ luật contract-first, bị chặn theo bản phát hành.

2. **[#97334](https://github.com/anthropics/claude-code/pull/97334)** — Sự kiện `session.append` tiếp tục vượt qua tầng người dùng dưới `sec-default`. Kiểm tra `test` đỏ *theo thiết kế* cho đến khi CLI phát hành mang sự kiện — một mẫu đáng theo dõi.

3. **[#97688](https://github.com/anthropics/claude-code/pull/97688)** — Bản ghi collector tiếp tục vượt qua tầng người dùng: plugin của người dùng không còn có thể bỏ hoặc viết lại telemetry dành cho collector của tổ chức. Hook `prepend`/`append` của tổ chức được giữ nguyên.

4. **[#99118](https://github.com/anthropics/claude-code/pull/99118)** — Pane `/diff` không còn giữ toast toàn cục (`holdToasts: true` đang chặn thông báo của plugin khác).

5. **[#99137](https://github.com/anthropics/claude-code/pull/99137)** — "Plugin của một người có thể thắt chặt, không bao giờ nới lỏng." Dưới `sec-default`, plugin người dùng không thể gỡ deny/ask hoặc thay đổi biến đã ghim. Không cần engine mới.

6. **[#99141](https://github.com/anthropics/claude-code/pull/99141)** — `/diff` giữ pane khi chưa có gì vẽ được nó; render một khi host gắn vào. Xếp chồng trên #99118.

7. **[#99540](https://github.com/anthropics/claude-code/pull/99540)** — Giới hạn công cụ cấp tổ chức mở rộng lên cả plugin do người dùng cài đặt, với `.catch` trên mọi hook quyết định. Hoàn thiện câu chuyện tầng bảo mật từ #99137.

8. (Không có PR bổ sung để tóm tắt; nhóm trên đại diện cho toàn bộ tập hợp đã cập nhật.)

**Đọc của tuần:** nhóm này là một nỗ lực nhất quán nhằm chính thức hóa **hệ thống phân cấp bảo mật plugin** (tổ chức > người dùng) và làm rõ hợp đồng engine/mod. Nếu bạn xây dựng plugin cho Claude Code, hãy chuẩn bị đón quy tắc "chỉ thắt chặt" sẽ được thực thi từ nay về sau.

---

## 5. Thảo luận nổi bật

Không có dữ liệu thảo luận được cung cấp; phần này được lược bỏ.

---

## 6. Xu hướng Yêu cầu Tính năng

Chưng cất từ Issue và (không có) Discussion trong kỳ này:

- **Tương đồng Desktop ↔ CLI.** Theme/màu accent (#79305, 71 👍), autocomplete `/` cho user skill và lệnh plugin (#97936), động từ hoàn thành tùy chỉnh (#52420), và session lưu trữ chỉ đọc trong VS Code (#104495) đều chỉ về cùng một hướng: Desktop và IDE tụt hậu so với khả năng tùy biến của CLI.
- **Khả năng hiển thị context-window.** Một đợt sóng thực sự: #102094, #102103, #102176, #102133, #102615, #102623, #103885, #104471. Người dùng muốn khôi phục vòng tròn/popover context trong Code tab, với số liệu theo từng session, trạng thái auto-compaction, và đơn vị token dễ đọc.
- **Hiển thị mức sử dụng/chi phí phong phú hơn.** #104471 (panel bên usage), #103018 (gán công cụ `ccd_turn` vào `/usage`), #104474 (khả năng hiển thị lãng phí token) — khả năng quan sát chi phí đang trở thành yêu cầu hạng nhất.
- **Giảm UX cuối lượt mang tính gia trưởng.** #102273 + #102132: người dùng muốn chọn không dùng hộp next-step, hoặc ít nhất để nó không chặn trước phản hồi.
- **UI tùy chỉnh, ít click.** #102095 (mức effort), #52420 (động từ), #102233 (ẩn panel thông tin session trong split view) — cộng đồng đang yêu cầu giành lại hiệu quả về không gian dọc và số lần click.

---

## 7. Điểm đau của Nhà phát triển

- **Lỗi regression trên Code tab Desktop đang chồng chất.** Chỉ báo context-window bị loại bỏ trong bản cập nhật gần đây, tương tác mức effort suy giảm, các panel bên mới xuất hiện không được yêu cầu, hộp next-step hoạt động sai. Nhiều báo cáo được gắn cờ `regression` và một số là trùng lặp, cho thấy nhóm đang sửa triệu chứng ở một chỗ trong khi bề mặt khác lại thoái hóa.
- **Đóng vì stale mà không sửa.** #97936 chỉ rõ rằng các báo cáo trước đó về cùng lỗi autocomplete skill/plugin đã bị tự động đóng vì stale và chưa bao giờ được sửa. Nguy cơ xói mòn niềm tin.
- **Thanh toán và hỗ trợ.** #56281 (lỗi nâng cấp, hỗ trợ không phản hồi) cộng với #104474 (đốt token khi lệnh shell thất bại) cho thấy vấn đề niềm tin liên quan đến chi phí ở cả hai phía của đồng hồ đo.
- **Các trường hợp biên của sandbox.** #76353 (tiến trình mồ côi trên Windows), cộng với ba sửa lỗi sandbox trong v2.1.309, cho thấy sandbox đang được cải thiện nhưng vẫn là mục tiêu di động — đừng cho rằng nó kín kẽ trên mọi nền tảng.
- **Bug thứ tự auto-compact.** #104494 — lỗi tổng hợp "Prompt is too long" trước khi attachment đầu lượt được thêm vào. Chặn đứng bất kỳ ai dùng Bedrock trong session dài; cách khắc phục (gửi lại) không thể khám phá được.
- **Bề mặt plugin/bảo mật thay đổi dưới chân người đóng góp.** Nhóm PR tham chiếu các phụ thuộc thứ tự merge vào các sự kiện engine chưa phát hành; tác giả plugin nên chuẩn bị cho sự xáo trộn trong ngữ nghĩa `sec-default`.

---

*Nguồn: tất cả mục được liên kết ở trên từ [github.com/anthropics/claude-code](https://github.com/anthropics/claude-code). Digest được tạo từ cửa sổ 24 giờ kết thúc ngày 2026-10-23.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Nhóm Codex đã phát hành **rust-v0.164.0**, giới thiệu các slot `/presets` có thể tái sử dụng cho prompt và slash command, cùng với các tham số inline `/model` và `/permissions` — một nâng cấp đáng chú ý về trải nghiệm cho người dùng chuyên sâu. Trong khi đó, issue tracker bị chi phối bởi một cụm **lỗi "Selected model is at capacity" phía server** ảnh hưởng đến nhiều tài khoản Pro/Plus, và các báo cáo dai dẳng về **rò rỉ bộ nhớ/tiến trình trên Windows** khi Codex Desktop tích tụ hàng trăm tiến trình Node/MCP phụ trợ. Hàng đợi PR cho thấy nhiều thay đổi nội bộ (chủ yếu là các PR CLOSED do `copyberry[bot]` tạo) xoay quanh cấu hình được quản lý, hook theo phạm vi môi trường, và rollout tracing.

---

## 2. Bản phát hành

**rust-v0.164.0** ([release](https://github.com/openai/codex/releases))
- **`/presets` có thể tái sử dụng**: Lưu prompt và slash command vào mười slot được đánh số với menu bàn phím để truy cập nhanh (#54380, #54381).
- **Cấu hình inline**: Đặt model, reasoning effort, speed, và permission profile trực tiếp qua tham số `/model` và `/permissions` (#54378, #54383).
- Chức năng preview được giới thiệu (bị cắt trong release notes).

**Kênh Alpha** tiếp tục với `rust-v0.164.0-alpha.12`, `rust-v0.164.0-alpha.11.1`, và `rust-v0.163.0-alpha.11.2` — các bản build tiền phát hành thông thường không có changelog chi tiết.

---

## 3. Issue nổi bật

1. **[#35446](https://github.com/openai/codex/issues/35446) — Deadlock Computer Use trên Windows 10** (50 bình luận, OPEN, từ tháng 7)
   Một deadlock kéo dài đang chờ chuyển đổi `SoftwareBitmap` bên trong `FrameArrived`. Issue có nhiều bình luận nhất trong ngày và là dấu hiệu cho thấy Computer Use trên Windows 10 vẫn còn mong manh. Mức độ quan tâm từ cộng đồng thấp (1 👍) nhưng độ dài thread cho thấy người dùng đã nỗ lực chẩn đoán liên tục.

2. **[#54841](https://github.com/openai/codex/issues/54841) — Chế độ Work chặn gửi tin nhắn trong BYOK** (37 bình luận, 27 👍)
   Người dùng BYOK có bật công cụ browser/computer không thể gửi tin nhắn trong chế độ Work. Số upvote cao khiến đây trở thành bug được cộng đồng ủng hộ nhiều nhất hôm nay — một regression nghiêm trọng cho nhóm người dùng bring-your-own-key.

3. **[#48938](https://github.com/openai/codex/issues/48938) — Renderer Windows crash và lag nhập liệu** (26 bình luận)
   Một subscriber Pro 20x bức xúc báo cáo tình trạng màn hình trắng reload liên tục và lag nghiêm trọng sau cập nhật, ảnh hưởng đến công việc trả phí và chi phí. Đáng chú ý vì giọng điệu — một power user trả phí công khai leo thang một regression về độ ổn định.

4. **[#31925](https://github.com/openai/codex/issues/31925) — Khôi phục Option+Space Quick Chat trên macOS** (18 bình luận, **42 👍**)
   Issue được upvote nhiều nhất hôm nay. Người dùng macOS muốn phím tắt Quick Chat trở lại sau khi hợp nhất ứng dụng ChatGPT/Codex — tín hiệu rõ ràng rằng việc hợp nhất đã loại bỏ một workflow được đánh giá cao.

5. **[#51649](https://github.com/openai/codex/issues/51649) — Tích tụ tiến trình MCP/CUA/node_repl** (18 bình luận)
   Báo cáo về khoảng 200 tiến trình Node phụ trợ và ~11,6 GB bộ nhớ private trên Windows Desktop. Liên quan chặt chẽ đến #29079, cho thấy vấn đề vòng đời tiến trình mang tính hệ thống trên nền tảng đó.

6. **[#29079](https://github.com/openai/codex/issues/29079) — Tiến trình Node/MCP mồ côi trên Windows** (15 bình luận, từ tháng 6)
   Người anh em cũ hơn của #51649. Việc cả hai vẫn mở cách nhau nhiều tháng cho thấy rò rỉ gốc chưa được giải quyết dù đã có nhiều báo cáo.

7. **[#51667](https://github.com/openai/codex/issues/51667) — Tin nhắn bị chặn sau cập nhật macOS** (15 bình luận)
   Tin nhắn Codex bị chặn sau khi cập nhật lên `26.1002.52244` trong một máy ảo macOS; được gắn tag `safety-check` và `auth`. Chặn chức năng cốt lõi với telemetry không rõ ràng.

8. **[#55783](https://github.com/openai/codex/issues/55783) — Dot mất khỏi sidebar macOS** (13 bình luận, 7 👍)
   Một Dot biến mất khỏi sidebar desktop trong khi vẫn hoạt động trên web. Liên quan đến bề mặt "Dots" đang mở rộng và các vấn đề tương thích desktop/web (so sánh #54693).

9. **[#51088](https://github.com/openai/codex/issues/51088) — Quota Codex cạn bất thường nhanh** (6 bình luận)
   Giới hạn sử dụng cạn dramatically ngay cả với prompt cached tầm thường trong tháng qua. Vấn đề tin cậy liên quan đến thanh toán, xuất hiện lặp lại cùng với #39767 (reasoning bị đếm hai lần).

10. **[#56282](https://github.com/openai/codex/issues/56282) — Codex Cloud báo cáo PR không tồn tại** (2 bình luận)
    Trong một batch 15 tác vụ cloud theo issue, agent tuyên bố đã làm PR trong khi hầu hết PR chưa bao giờ được publish. Lo ngại về tính toàn vẹn dữ liệu cho workflow cloud tự động; ít bình luận nhưng mức độ nghiêm trọng cao.

*Cũng đáng chú ý:* **[#56078](https://github.com/openai/codex/issues/56078)** (lỗi ACL sandbox elevated trên Windows, `os error 5`), **[#56264](https://github.com/openai/codex/issues/56264)** (resume thread thất bại do thiếu `SYSTEMROOT`), và **cụm "model at capacity"** — [#56105](https://github.com/openai/codex/issues/56105), [#55746](https://github.com/openai/codex/issues/55746), [#56324](https://github.com/openai/codex/issues/56324).

---

## 4. Tiến triển PR chính

Hầu hết PR hôm nay do `copyberry[bot]` tạo và được đánh dấu CLOSED, cho thấy hoặc là công việc nội bộ được merge theo batch hoặc các PR speculative bị đóng mà không merge. Điểm nổi bật:

1. **[#56351](https://github.com/openai/codex/pull/56351) — Fork thread đính kèm thử nghiệm**
   Thêm `attachToSource` vào `thread/fork`, lưu một fork đính kèm nguồn của nó mà không phát `thread/started`. Ẩn các thread đính kèm khỏi danh sách thông thường — nền tảng cho các workflow hội thoại kiểu branch.

2. **[#56343](https://github.com/openai/codex/pull/56343) — Chạy environment hook trên executor sở hữu**
   Thực thi command hook trong shell, cwd, env policy, và network policy riêng của từng môi trường — công việc correctness quan trọng cho cấu hình đa môi trường.

3. **[#56330](https://github.com/openai/codex/pull/56330) — Agent-message wake tôn trọng interrupt và chế độ Plan**
   Sửa race condition nơi một wake đang chờ có thể tồn tại lâu hơn interrupt hoặc chuyển đổi chế độ Plan. Ngăn tin nhắn trong hàng đợi bị tiêu thụ sai.

4. **[#56313](https://github.com/openai/codex/pull/56313) — Ghi đè model catalog cho context tool**
   Cho phép `history`, `notes`, `new_context`, và `get_context_remaining` lấy mô tả/schema từ catalog của model đang hoạt động — cho phép tùy chỉnh tool theo từng model.

5. **[#56312](https://github.com/openai/codex/pull/56312) — Theo dõi lịch sử hội thoại được chấp nhận trong rollout trace**
   Phân biệt lịch sử được chấp nhận với các nỗ lực bị loại bỏ; quan trọng cho việc replay/debug trung thực các phiên agent.

6. **[#56309](https://github.com/openai/codex/pull/56309) — Từ ngữ permission writable-root theo model**
   Thêm template `writable_root`/`writable_roots` vào thông báo permission — UX tốt hơn cho prompt permission.

7. **[#56308](https://github.com/openai/codex/pull/56308) — Tách phạm vi directory và repository trong TUI**
   Sửa lọc session để `Cwd` không còn kéo theo linked worktree; tách nhóm project — liên quan trực tiếp đến sự nhầm lẫn worktree trong Discussion #56158.

8. **[#56304](https://github.com/openai/codex/pull/56304) / [#56302](https://github.com/openai/codex/pull/56302) — Managed hook theo phạm vi môi trường**
   Thêm API discovery/listing và `environment_hooks` trong `EnvironmentConfig`, định tuyến thực thi hook đến môi trường sở hữu. Một phần của nỗ lực managed-hooks rộng hơn.

9. **[#56295](https://github.com/openai/codex/pull/56295) / [#56314](https://github.com/openai/codex/pull/56314) — Managed config loader tách khỏi xác thực ChatGPT**
   Giới thiệu interface `BundleSource` và custom config-server loader — nền tảng kiến trúc cho cấu hình doanh nghiệp/tùy chỉnh được quản lý.

10. **[#56288](https://github.com/openai/codex/pull/56288) — Ghim ký artifact Linux vào Cosign v3.1.4**
    Vệ sinh chuỗi cung ứng release, giữ các signature bundle v2 cho verifier hiện có. Đi kèm với [#56290](https://github.com/openai/codex/pull/56290) (công cụ release Python khóa bằng uv).

---

## 5. Thảo luận nổi bật

### Ý tưởng
- **[#14067](https://github.com/openai/codex/discussions/14067) — Đồng bộ thread và context phiên Codex giữa các thiết bị** (13 bình luận, **69 👍**)
  Ý tưởng được upvote nhiều nhất trong digest này. Người dùng làm việc trên nhiều máy muốn đồng bộ thread/context thay vì phiên gắn với từng môi trường. Nhu cầu chưa được đáp ứng mạnh mẽ.
- **[#56158](https://github.com/openai/codex/discussions/56158) — Hãy mang lại nút worktree**
  Người dùng mệt mỏi vì phải kiểm tra toggle worktree trong cài đặt session; yêu cầu đưa nó lên nổi bật hoặc hiển thị chỉ báo. Phù hợp với PR #56308.

### Hỏi & Đáp
- **[#56069](https://github.com/openai/codex/discussions/56069) — Hỗ trợ picture-in-picture cho MCP App trên macOS?**
  Một developer đang xây dựng trình theo dõi trạng thái triển khai trực tiếp hỏi liệu trình bày PiP có được hỗ trợ cho UI MCP App của bên thứ ba không và cách bật.
- **[#56208](https://github.com/openai/codex/discussions/56208) — Cấu hình được hỗ trợ cho tải xuống Chrome không giám sát đáng tin cậy?**
  Tìm kiếm con đường mạnh mẽ cho tải xuống có xác thực; báo cáo `ERR_BLOCKED_BY_CLIENT` trên một số link PDF.
- **[#55792](https://github.com/openai/codex/discussions/55792) — Windows desktop: đường dẫn review khi `/approve` không khả dụng?**
  Yêu cầu một luồng xem xét lại bởi con người được hỗ trợ khi auto-approval từ chối một hành động và `/approve` không có trong menu.

### Show and tell
- **[#56176](https://github.com/openai/codex/discussions/56176) — Agent Relay Check: phiên mới có nhận được AGENTS.md không?**
  Kiểm tra before/after có thể lặp lại sử dụng marker ngẫu nhiên tạm thời để xác minh truyền đạt instruction-path.
- **[#56181](https://github.com/openai/codex/discussions/56181) — pytest-codex: biến quy tắc AGENTS.md thành kiểm tra pytest**
  Plugin pytest giấy phép MIT cho kiểm thử hành vi CLI, với replay offline. v0.2.0 hiện có sẵn — một cách thực dụng để thực thi tuân thủ AGENTS.md.
- **[#56337](https://github.com/openai/codex/discussions/56337) — Off the Wall: nhớ lại các chỉnh sửa trước đây trước khi Codex trả lời**
  Giữ nguyên các chỉnh sửa của người dùng verbatim và trích dẫn chúng trước khi agent phản hồi — giải quyết một bực bội rất phổ biến.
- **[#56215](https://github.com/openai/codex/discussions/56215) — GFT-Merge: kết hợp hội thoại cục bộ thành phiên mới**
  Công cụ cục bộ giấy phép MIT để merge hội thoại Claude Code/Codex qua kéo-thả vào phiên mới.
- **[#55421](https://github.com/openai/codex/discussions/55421) — TAHU: nguyên mẫu nghiên cứu authorization-gateway, tìm 3 dev thử nghiệm**
  Khám phá việc cho agent trả lời câu hỏi công khai mà không rò rỉ ghi chú nhân viên riêng tư hoặc yêu cầu phê duyệt từng bước.
- **[#56242](https://github.com/openai/codex/discussions/56242) — ibara: tác vụ Codex desktop đầu tiên trên máy tính dự phòng Omarchy**
  Cấp cho agent hiện có một desktop từ xa cho công việc browser/app, với MCP tool và bảng điều khiển.

*Cũng đang hoạt động:* **[#2251](https://github.com/openai/codex/discussions/2251) — Codex Usage Limits** (59 bình luận, 57 👍), thread lâu năm về giới hạn tier Plus so với giới hạn ứng dụng ChatGPT.

---

## 6. Xu hướ

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Hoạt động hôm nay xoay quanh việc đảm bảo độ tin cậy của agent: các maintainer đang vật lộn với việc báo cáo giới hạn lượt của subagent, tình trạng treo ở generalist agent, và cách xử lý phiên của browser-agent. Bên cạnh đó, một loạt PR gia cố đã được merge liên quan đến bảo mật (bỏ qua shell-wrapper, ghi credential nguyên tử) và tính đúng đắn (lỗi hỏng `$` trong prompt-template, lưu trữ settings). Không có bản phát hành ổn định nào; chỉ có bản nightly tăng phiên bản.

## 2. Phát hành

**v0.67.0-nightly.20261023.ga713410ab** ([PR #29887](https://github.com/google-gemini/gemini-cli/pull/29887))

- `fix(a2a-server,core)`: giữ nguyên metadata sử dụng token mở rộng và đồng bộ báo cáo theo từng lượt.
- `fix(core)`: đảm bảo mọi lượt của model có chứa function call đều nhận được thought signature.

Đây là bản nightly thông thường; cả hai thay đổi đều nhắm vào độ chính xác telemetry của A2A server và tính toàn vẹn của reasoning-signature trong core, chứ không phải tính năng hướng người dùng.

## 3. Issue nổi bật

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent báo GOAL thành công sau khi chạm MAX_TURNS** (P1, 13 bình luận). Subagent `codebase_investigator` trả về `status: "success"` ngay cả khi đầu ra của chính nó nói rằng đã hết lượt trước khi phân tích được gì. Đây là issue có lượng tương tác cao nhất hôm nay và là một vấn đề đúng đắn thực sự: thành công giả âm thầm còn tệ hơn thất bại hiển thị, vì bên gọi không thể phân biệt công việc bị cắt ngắn với công việc đã hoàn thành. Được gắn thẻ `status/need-retesting`, nên có thể bản sửa đang được xử lý.

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Sandbox OS không phụ thuộc cho các model thuần bash** (P2, 9 bình luận). Một đề xuất thiết kế cho phép Gemini 3 tận dụng khả năng thuần thục `grep`/`sed`/`awk` bẩm sinh, đồng thời kiểm soát rủi ro qua sandboxing và định tuyến ý định sau khi thực thi. Đây là một hướng kiến trúc đáng chú ý vì nó định nghĩa lại sandboxing như yếu tố cho phép phát huy thế mạnh của model, thay vì là một hạn chế.

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent treo vô hạn** (P1, 8 bình luận, 8 👍). Các thao tác đơn giản như tạo thư mục bị treo vô thời hạn khi CLI chuyển sang generalist agent; người dùng báo phải chờ tới một giờ. Số lượng reaction cao cho thấy ảnh hưởng rộng. Cách xử lý tạm: yêu cầu model không dùng subagent.

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — Đọc, tìm kiếm và ánh xạ file nhận biết AST** (P2, 7 bình luận). Một EPIC điều tra liệu tooling nhận biết AST có thể cắt giảm các lượt lãng phí do đọc sai lệch và giảm nhiễu token hay không. Kết nối trực tiếp với [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) và [#22747](https://github.com/google-gemini/gemini-cli/issues/22747), vốn đánh giá các công cụ cụ thể (tilth, glyph, ast-grep).

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini ít dùng skills và subagent** (P2, 7 bình luận). Mang tính giai thoại nhưng được nhiều người đồng tình: các skill tùy chỉnh ("gradle", "git") bị bỏ qua trừ khi được gọi tường minh. Đây là nút thắt áp dụng cho toàn bộ bộ tính năng skills/subagent — nếu model không tự chọn chúng, đầu tư vào hệ sinh thái sẽ không sinh lời.

6. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) — Browser Agent bỏ qua ghi đè `settings.json`** (P2, 4 bình luận). `AgentRegistry` đọc và hợp nhất settings đúng khi khởi tạo, nhưng Browser Agent sau đó bỏ qua chúng (ví dụ: `maxTurns`). Cấu hình âm thầm không được áp dụng là vấn đề niềm tin đối với các nhóm đang chuẩn hóa hành vi CLI.

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent thất bại trên Wayland** (P1, 4 bình luận). Báo cáo `Termination Reason: GOAL` dù thất bại trên phiên Wayland. Ít phổ biến nhưng ưu tiên cao với người dùng desktop Linux, một nhóm người dùng cốt lõi của CLI terminal.

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — Lỗi 400 với >128 tool** (P2, 3 bình luận). CLI đưa quá nhiều tool vào phạm vi và API từ chối request. Khi việc dùng MCP tăng lên, quản lý số lượng tool sẽ trở thành vấn đề hạ tầng không thể tránh.

9. **[#23571](https://github.com/google-gemini/gemini-cli/issues/23571) — Model rải script tạm khắp repo** (P2, 3 bình luận). Khi thực thi shell bị hạn chế qua loại trừ, model rải các script chỉnh sửa khắp các thư mục, gây chi phí dọn dẹp trước khi commit. Điều này trực tiếp phá hoại quy trình "commit sạch" mà CLI được thiết kế để hỗ trợ.

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Agent nên dừng hành vi phá hoại** (P2, 3 bình luận). Model chọn `git reset` hoặc `--force` khi có đường an toàn hơn, và tỏ ra thiếu thận trọng với tài nguyên DB. Liên quan đến an toàn và có khả năng ngày càng quan trọng khi agent tự chủ hơn.

## 4. Tiến độ PR chính

1. **[#29688](https://github.com/google-gemini/gemini-cli/pull/29688) — Ngăn chặn bypass command-substitution guard qua cờ shell wrapper** (đã đóng, `area/security`). Sửa `stripShellWrapper()` để các wrapper có cờ trung gian trước `-c` vẫn được nhận diện. Một bản sửa bảo mật với hệ quả bypass thực sự.

2. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765) — Ghi file credential store nguyên tử, tuần tự hóa**. `FileKeychain` có thể âm thầm mất credential khi ghi đồng thời và khóa người dùng hoàn toàn khi ghi bị gián đoạn. Quan trọng cho môi trường không có keychain bẩm sinh.

3. **[#29890](https://github.com/google-gemini/gemini-cli/pull/29890) — Chỉ khôi phục thư mục workspace sau khi resume thành công**. Sửa [#29864](https://github.com/google-gemini/gemini-cli/issues/29864): các thư mục được thêm vào workspace context trước khi `resumeChat` hoàn tất, rò rỉ trạng thái khi resume thất bại.

4. **[#29859](https://github.com/google-gemini/gemini-cli/pull/29859) — Hiển thị các tool call đang thực thi của subagent trong task tree** (`help wanted`). Cập nhật scheduler không phải root giờ đây giữ lại các tool call có trạng thái `executing`, sửa danh sách tool trống mà người dùng thấy trong khi subagent đang làm việc. Cải thiện trực tiếp khả năng debug được nêu trong [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) và [#21763](https://github.com/google-gemini/gemini-cli/issues/21763).

5. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767) — Giới hạn khám phá `tools/list` của MCP với timeout 60s**. Khám phá kế thừa timeout tool-call 10 phút, nên một MCP server không phản hồi làm startup đình trệ mười phút. Sửa [#28355](https://github.com/google-gemini/gemini-cli/issues/28355).

6. **[#29761](https://github.com/google-gemini/gemini-cli/pull/29761) — Dừng mẫu `$` làm hỏng prompt template**. `String.prototype.replace(string, string)` diễn giải `$&`, `` $` ``, `$'`, và `$$` như mẫu thay thế, âm thầm làm hỏng hướng dẫn chỉnh sửa, nội dung file, và `{{args}}`.

7. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762) — Giữ chỉnh sửa trên đĩa khi thay đổi xác thực**. Lưu dựa trên nội dung đĩa hiện tại thay vì ảnh chụp lúc khởi động, nên chỉnh sửa đồng thời của người dùng không bị ghi đè khi thay đổi xác thực.

8. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838) — Phân giải đường dẫn tương đối theo root workspace IDE đang hoạt động**. `WriteFileTool`, `EditTool`, và `ReadFileTool` giờ đây phân giải theo IDE workspace được theo dõi (hoặc Git root lồng nhau) thay vì thư mục đích ban đầu — một thắng lợi đúng đắn thực sự cho các phiên IDE đa root.

9. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880) — Thêm lệnh `gemini models` và cờ `--list-models`**. Cho phép khám phá model theo lập trình dạng JSON, hữu ích cho scripting và tích hợp CI.

10. **[#29884](https://github.com/google-gemini/gemini-cli/pull/29884) — Cho phép đường dẫn hệ thống tin cậy trên Android/Termux cho ripgrep**. Cho phép `grep_search` phân giải binary từ `pkg install ripgrep`, mở khóa cho người dùng Termux. Sửa [#21836](https://github.com/google-gemini/gemini-cli/issues/21836).

Cũng đáng chú ý: [#26686](https://github.com/google-gemini/gemini-cli/pull/26686) thêm hỗ trợ Git submodule cho cài đặt extension, và [#29883](https://github.com/google-gemini/gemini-cli/pull/29883) sửa độ rộng hiển thị SARA AM tiếng Thái/Lào.

## 5. Thảo luận nổi bật

Không có dữ liệu thảo luận cho giai đoạn này, nên mục này được lược bỏ.

## 6. Xu hướng yêu cầu tính năng

- **Điều phối và độ tin cậy của agent**: Nhóm issue lớn nhất liên quan đến hành vi subagent — tính toàn vẹn giới hạn lượt (#22323), khôi phục sau treo (#21409), kích hoạt skills/subagent quá ít (#21968), khả năng quan sát trajectory qua `/chat share` (#22598, [#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), bộ nhớ chia sẻ và cộng tác song song (#18287), và khám phá subagent qua `settings.json` (#18285, #20079).
- **Hiểu codebase qua tooling AST**: Một EPIC phối hợp (#22745, #22746, #22747) cùng các thao tác đọc tiết kiệm token (#19561) cho thấy sự quan tâm bền vững trong việc vượt qua tìm kiếm văn bản thô để tiến tới điều hướng code theo cấu trúc.
- **Theo dõi task bền vững**: #18836 và #21000 đều đề xuất thay thế `WriteToDo` trong context (với context rot và chi phí token) bằng theo dõi task CRUD dạng file.
- **Tự nhận thức và an toàn của agent**: #21432 (cờ/hotkey CLI chính xác) và #22672 (tránh lệnh phá hoại) phản ánh nhu cầu về một agent hiểu cả bản thân lẫn phạm vi ảnh hưởng của hành động.
- **Sử dụng lập trình/headless**: Khám phá model (#29880) và ổn định eval (#23166, #23313) chỉ ra các use case CI và tự động hóa đang tăng.

## 7. Điểm đau của nhà phát triển

- **Thành công giả âm thầm**: Loại bug gây hại nhất được báo cáo hôm nay. #22323 báo `status: "success"` trên một lượt chạy bị cắt ngắn; #21983 báo `Termination Reason: GOAL` trên thất bại Wayland. Nhà phát triển không thể phân biệt công việc đã hoàn thành với công việc bị hủy, điều này bào mòn niềm tin vào tự động hóa.
- **Cấu hình không được áp dụng**: #22267 (Browser Agent bỏ qua `settings.json`) và #20079 (file agent symlink không được nhận diện) đều mô tả cấu hình đã khai báo bị âm thầm bỏ qua.
- **Treo vô hạn không timeout**: #21409 (generalist agent treo tới một giờ) và tình trạng đình trệ khám phá MCP đã được sửa (#29767) cùng nguyên nhân gốc — timeout kế thừa quá dài cho sử dụng tương tác.
- **Ô nhiễm workspace**: Script tạm rải rác của #23571 và prompt tương tác bị kẹt của #22465 (ví dụ: `create vite`) phá vỡ quy trình commit sạch.
- **Giới hạn quy mô**: #24246 (>128 tool → lỗi 400) sẽ chỉ tệ hơn khi MCP server sinh sôi; phạm vi tool cần trở nên thích ứng.
- **Độ trung thực terminal/nền tảng**: Thất bại Wayland (#21983), sai lệch độ rộng tiếng Thái/Lào (#29883), và nhấp nháy khi resize terminal (#21924) cho thấy lỗ hổng tinh chỉnh giữ

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Bản vá mới (v1.0.103) vừa ra mắt với các sửa lỗi cho việc sao chép code block, xử lý cờ ACP sandbox, và khả năng kết nối lại ổn định cho các phản hồi từ cloud. Các lo ngại về bảo mật và mô hình quyền đang chiếm ưu thế trong issue tracker hôm nay: tự động phê duyệt thư mục tin cậy (#5232), hook bị bỏ qua âm thầm cho background agent (#3013), và việc redact secret quá mạnh tay (#4065) đều đang thu hút sự chú ý. Một loạt lỗi hết hạn MCP/OAuth (#5229, #5233, #5234, #5236) cho thấy vòng đời xác thực remote-MCP cần được gia cố khẩn cấp, đặc biệt trên Windows và trong chế độ ACP.

## 2. Bản phát hành

**v1.0.103** (2026-10-22)
- Nhấp vào code block của phản hồi đã hoàn thành giờ sẽ sao chép mã gốc khi cài đặt copy-on-click được bật.
- Phiên ACP tuân thủ đúng cài đặt sandbox đã lưu và các cờ `--sandbox` / `--no-sandbox`, kể cả khi resume.
- Phản hồi từ cloud giữ nguyên toàn bộ văn bản khi CLI kết nối lại sau khi mất kết nối.
- Cải thiện trình duyệt phiên làm việc.

## 3. Issue nổi bật

1. **[#5232](https://github.com/github/copilot-cli/issues/5232) — Thư mục tin cậy âm thầm tự động phê duyệt thực thi shell ở chế độ thủ công** — Cơ chế kiểm soát dựa trên đường dẫn phê duyệt các lệnh `powershell.exe`, `sqlcmd`, và `curl` có đối số nằm trong thư mục tin cậy mà không hề hỏi người dùng. Lỗ hổng mô hình quyền mức độ nghiêm trọng cao. 2 bình luận, lo ngại từ cộng đồng đang tăng.
2. **[#3013](https://github.com/github/copilot-cli/issues/3013) — Hook không kích hoạt cho background (task) agent** — Hook có thể chặn các lệnh nguy hiểm trong agent chính, nhưng sub-agent chạy nền vẫn có thể thực thi chúng. Người báo cáo coi đây là lỗ hổng bảo mật; hiện đã đóng nhưng mô hình này đáng để rà soát.
3. **[#5197](https://github.com/github/copilot-cli/issues/5197) — Voice server bị segfault trên WSL2 sau 1.0.100** — Crash tín hiệu 11 khiến `/voice` kẹt ở trạng thái "Fetching voice models." 2 👍, 4 bình luận, ảnh hưởng đến lượng người dùng WSL2 đang tăng.
4. **[#5229](https://github.com/github/copilot-cli/issues/5229) — Chế độ ACP mở OAuth trình duyệt thay vì dùng refresh token** — Access token MCP hết hạn không bao giờ thử cấp `refresh_token`, buộc người dùng phải xác thực lại thủ công mỗi phiên.
5. **[#5233](https://github.com/github/copilot-cli/issues/5233) — Remote MCP liên tục gửi lại access token đã hết hạn** — Phiên làm việc gửi lại token cũ mỗi vài giây sau lỗi 401 thay vì refresh hoặc nhắc người dùng.
6. **[#5234](https://github.com/github/copilot-cli/issues/5234) — CLI trên Windows không dùng được khi MCP server cần xác thực** — Mã escape thô và lời nhắc `/login` giả cho đến khi người dùng xác thực qua ứng dụng desktop.
7. **[#5236](https://github.com/github/copilot-cli/issues/5236) — Bộ đệm token Entra broker giữ 0 byte trên Windows** — File token được ghi nhưng rỗng, nên mỗi tiến trình mới lại yêu cầu đăng nhập.
8. **[#5219](https://github.com/github/copilot-cli/issues/5219) — Task subagent với model không xác định làm kẹt phiên** — Fallback về ngân sách 128k khiến toàn bộ lượt thất bại với lỗi "exceeds the model's prompt budget."
9. **[#5238](https://github.com/github/copilot-cli/issues/5238) — Cache bust cho mọi ảnh sau ảnh thứ 50** — Xóa ảnh cũ nhất kích hoạt làm đầy lại toàn bộ cache mỗi lượt; đốt token "rất, rất tốn kém."
10. **[#5203](https://github.com/github/copilot-cli/issues/5203) — Yêu cầu tính năng: kênh phát hành ổn định** — Người dùng đề nghị tách kênh Stable và Latest để công việc hàng ngày không bị ảnh hưởng bởi regression từ các bản phát hành nhanh.

## 4. Tiến triển PR chính

Không có pull request nào được cập nhật trong 24 giờ qua (0 mục). Hoạt động issue và bản phát hành v1.0.103 là những thay đổi duy nhất hôm nay. Hãy theo dõi tracker để bắt các PR tiếp theo xử lý cụm lỗi MCP/OAuth.

## 5. Thảo luận nổi bật

Nguồn tin không cung cấp dữ liệu thảo luận.

## 6. Xu hướng yêu cầu tính năng

- **Ổn định kênh phát hành** (#5203): người dùng muốn có các kênh Stable/Beta/Preview vì regression từ bản phát hành hàng tuần ảnh hưởng đến công việc hàng ngày.
- **Kiểm soát chọn model** (#5231): cho phép loại trừ các model không đáng tin khỏi chế độ Auto; chỉ dùng chúng khi chọn thủ công.
- **Tiện dụng terminal** (#5227, #2750): tùy chọn ghim ô nhập liệu, và cuộn hội thoại chỉ bằng bàn phím cho môi trường không có chuột.
- **Cấu hình voice** (#5226): cho phép cấu hình ngôn ngữ transcription `"auto"` cho người dùng không phải tiếng Anh.
- **Độ trung thực custom-agent** (#5241): trình chọn agent trong composer nên áp dụng `model` và `reasoning-effort` từ frontmatter của agent thay vì âm thầm giữ mặc định người dùng.

## 7. Điểm đau của nhà phát triển

- **Xói mòn niềm tin vào mô hình quyền.** Thư mục tin cậy (#5232), hook bị bypass bởi background agent (#3013), và redact secret quá mạnh tay (#4065) đều cho thấy allow-list không thực sự xác thực ý định. Các dev ngày càng coi đây là thất bại ranh giới bảo mật, không phải bug.
- **Vòng đời MCP/OAuth mong manh.** Bốn báo cáo riêng biệt (#5229, #5233, #5234, #5236) mô tả cùng một kiểu thất bại cốt lõi — token hết hạn không bao giờ được refresh, buộc xác thực lại thủ công và trên Windows thì CLI không dùng được. Thiếu tính tương đồng đa nền tảng (Windows, ACP, tương tác).
- **Chi phí vượt kiểm soát do hành vi context/cache.** #5238 (cache bust ảnh) và #5219 (fallback ngân sách subagent không giới hạn) cho thấy chính sách cache và ngân sách nội bộ có thể đốt token bất ngờ; dev muốn có khả năng quan sát và kiểm soát.
- **Regression trạng thái phiên.** #5228 (`--resume` rơi vào phiên rỗng và nuốt lần Enter đầu tiên), #5242 (MCP inotify watch cạn kiệt khiến hàng đợi phiên bị bỏ), và #5133 (`includeCoAuthoredBy` bị bỏ qua trong ACP) đều cho thấy bộ máy phiên/trình duyệt vừa phát hành đang rò rỉ các trường hợp biên vào sử dụng hàng ngày.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Một ngày tập trung vào bảo trì: **v1.19.4** phát hành bản nâng cấp runtime Bun đi kèm lên 1.4.4 với các bản vá bảo mật cho Brotli, TLS, HTTP/1.1–3, WebSocket và `fetch`. Trong khi đó, dòng 2.x tiếp tục hấp thụ các công việc ổn định hóa, với một loạt PR cốt lõi từ `rekram1-node` giải quyết các lỗi vòng đời MCP, phân giải model của session, và hành vi shutdown. Sự chú ý của cộng đồng vẫn chia đều giữa nhu cầu sandboxing đang tiếp diễn (#2242, 101 bình luận) và một làn sóng lỗi hồi quy v2 xoay quanh tiêu đề session, xử lý tool-call, và đăng ký Console provider.

## 2. Phát hành

**v1.19.4**
- **Core / Cải tiến:** Nâng cấp runtime Bun đi kèm lên **1.4.4**, bao gồm [các bản vá bảo mật](https://bun.com/blog/bun-v1.4.4#security) cho Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket và `fetch`, cùng chứng chỉ gốc được cập nhật (NSS 3.131.1). Không có thay đổi API hay hành vi nào ngoài việc nâng cấp runtime.

## 3. Issue nổi bật

1. **#2242 — Sandboxing the agent** ([link](https://github.com/anomalyco/opencode/issues/2242)) — Issue hàng đầu muôn thuở, vẫn mở từ tháng 8/2025 với **101 bình luận / 80 👍**. Người dùng yêu cầu các hạn chế tương đương seatbelt trên macOS (như đã thấy trong gemini-cli/codex-cli) để ngăn agent đọc/ghi ra ngoài thư mục làm việc. Tín hiệu mạnh cho thấy sandboxing vẫn là nhu cầu nền tảng số 1 chưa được đáp ứng.
2. **#34344 — Lỗ hổng sử dụng không giới hạn trên các model miễn phí** ([link](https://github.com/anomalyco/opencode/issues/34344)) — Một báo cáo về việc vượt qua rate-limit: giới hạn của model miễn phí được áp theo IP, nên việc xoay VPN sẽ reset chúng ngay lập tức. Đã đóng, nhưng vector lạm dụng này đặt ra câu hỏi về thiết kế thực thi cho gói miễn phí.
3. **#50257 — Model picker trên Desktop hiển thị "No reasoning" cho mọi model V2** ([link](https://github.com/anomalyco/opencode/issues/50257)) — `capabilities.reasoning` không bao giờ được điền, nên các model có khả năng reasoning (deepseek-v4.1-flash, kimi-k3, glm-5.3) bị gán nhãn sai. Vẫn mở; lỗi hiển thị UI rõ ràng trong ứng dụng desktop.
4. **#52083 — Lệnh shell phức hợp vượt qua quyền redirection** ([link](https://github.com/anomalyco/opencode/issues/52083)) — Một lệnh shell được `allow` khi ghép vào lệnh phức hợp sẽ làm mất mục tiêu redirection khỏi quá trình đánh giá quyền, biến nó thành công cụ ghi tệp tùy ý không cần nhắc. Một lỗ hổng trong mô hình quyền có liên quan đến bảo mật.
5. **#50652 — Công cụ từ plugin bên ngoài vượt qua quyền đã cấu hình** ([link](https://github.com/anomalyco/opencode/issues/50652)) — Các công cụ do plugin đăng ký thực thi mà không áp dụng hành động quyền đã cấu hình, và cùng kiểu vượt qua này cũng xảy ra qua Code Mode. Làm trầm trọng thêm các lo ngại về mô hình quyền trong #52083.
6. **#51828 — Cơ chế trục xuất do không hoạt động gửi SIGTERM đến shell nền đang chạy sau 60 phút** ([link](https://github.com/anomalyco/opencode/issues/51828)) — Việc trục xuất của `LocationActivity` phá hủy đồ thị Shell/Pty theo phạm vi location trong khi service vẫn sống, giết chết công việc nền chạy dài. Điểm đau cho các tác vụ agentic dài hạn.
7. **#58335 — Tài khoản Console kết nối nhưng provider `opencode` không bao giờ được đăng ký** ([link](https://github.com/anomalyco/opencode/issues/58335)) — `/api/v2/config` trả về 52 model, nhưng `/api/provider` bỏ qua `opencode` và `/api/model` không có mục `opencode/*` nào. Đã đóng nhanh, nhưng là rào cản onboarding đáng chú ý ở v2.1.3.
8. **#58176 — Tiêu đề session không bao giờ được tạo trong v2** ([link](https://github.com/anomalyco/opencode/issues/58176)) — Session mới vẫn là "Untitled" (`title = NULL`); v1.18.x tự đặt tiêu đề bình thường. Đã được đánh dấu tái hiện; nghi ngờ thiếu auto-trigger cộng với việc gói miễn phí bị từ chối.
9. **#58027 — DeepSeek ghi "[Assistant tool call]" dưới dạng văn bản thay vì thực thi** ([link](https://github.com/anomalyco/opencode/issues/58027)) — Hồi quy sau 2.0.32 → 2.1.2: các tool call hiện ra dưới dạng văn bản thuần. Phá vỡ quy trình agentic cho người dùng DeepSeek.
10. **#51868 — Lỗi dịch máy của locale zh** ([link](https://github.com/anomalyco/opencode/issues/51868)) — 93 trong số 1828 key rơi về tiếng Anh, cùng những bản dịch sai rõ ràng (壳牌/出口/个贝壳 cho shell/exit/seashell). Vấn đề chất lượng i18n cấp cộng đồng đang thu hút sự chú ý liên tục.

Cũng đáng theo dõi: **#12671** (lỗi số dư/nạp tiền GLM-4.7), **#47646** (ChatGPT OAuth phóng đại context 400k), **#57975** (yêu cầu dashboard sử dụng hợp nhất), **#58328/#58327** (tái đưa Brave vào và tín hiệu rate-limit cho custom websearch).

## 4. Tiến triển PR chính

1. **#58355 — Dùng model của agent khi session không có model** ([link](https://github.com/anomalyco/opencode/pull/58355)) — Sửa lỗi `opencode run` / `run --agent <id>` bỏ qua config `agents.<id>.model` và frontmatter; trước đây chỉ TUI áp dụng nó ở phía client.
2. **#58352 — Mặc định dùng agent và model dùng lần cuối khi không chọn gì** ([link](https://github.com/anomalyco/opencode/pull/58352)) — Trước đây server chọn model mới nhất trong tất cả provider (hiện là `opencode/flint-40b-free`), âm thầm đưa người dùng trả phí sang model miễn phí.
3. **#58351 — Dừng các MCP server song song khi shutdown** ([link](https://github.com/anomalyco/opencode/pull/58351)) — Đóng #50758; shutdown tuần tự tốn 2–4 giây mỗi local server không phản hồi, khiến `opencode service restart` bị force-kill.
4. **#58350 — Bỏ qua các MCP tool bị lỗi định dạng thay vì làm hỏng server** ([link](https://github.com/anomalyco/opencode/pull/58350)) — SDK xác thực `tools/list` như một tổng thể; chỉ một `inputSchema` hỏng khiến toàn bộ server trông như thất bại. Giờ các tool được xác thực riêng lẻ.
5. **#58349 — Không nhân đôi MCP server khởi động trong quá trình đối soát ban đầu** ([link](https://github.com/anomalyco/opencode/pull/58349)) — Sửa race condition lúc khởi động khi các launch đã xếp hàng vẫn kích hoạt sau khi `connect()`/`disconnect()` hoàn tất, tạo ra server trùng lặp.
6. **#58342 — Giữ đăng nhập MCP OAuth chờ sau các request callback lạc** ([link](https://github.com/anomalyco/opencode/pull/58342)) — Sửa #55201; callback loopback coi các request không có code (preflight PNA của Chrome) là lỗi xác thực nghiêm trọng.
7. **#58341 — Giữ các request MCP từ xa mở quá idle timeout của fetch trong Bun** ([link](https://github.com/anomalyco/opencode/pull/58341)) — Các tool call im lặng kéo dài >5 phút bị thất bại bất chấp timeout MCP 12 giờ của opencode.
8. **#58347 — Dùng `/usr/local/etc/opencode` trên FreeBSD** ([link](https://github.com/anomalyco/opencode/pull/58347)) — `ConfigDiscovery.systemDirectory()` trả về sai `/etc/opencode` trên các nền tảng không phải macOS/Windows, bao gồm FreeBSD.
9. **#58344 — Gộp đúng các tool call ID dài thuộc họ Mistral** ([link](https://github.com/anomalyco/opencode/pull/58344)) — Sửa #58323; việc cắt còn 9 ký tự phá vỡ ID từ các model không phải Mistral được định tuyến qua endpoint có tiền tố mistral (ví dụ GLM).
10. **#58346 — Làm mới router DigitalOcean khi đã đăng nhập** ([link](https://github.com/anomalyco/opencode/pull/58346)) — Khôi phục khả năng hiển thị router giữa session sau khi #57175 loại bỏ cơ chế poll 5 phút quá tích cực.
11. **#57429 — Giữ bản nháp của tab mới khi Prompt mount muộn** ([link](https://github.com/anomalyco/opencode/pull/57429)) — Sửa mất bản nháp khi chuyển tab trong TUI (đóng #47023).
12. **#57470 — Đọc ảnh clipboard qua interop Windows trên WSL** ([link](https://github.com/anomalyco/opencode/pull/57470)) — Sửa #49895; dán ảnh bằng Ctrl+V trước đây trả về `unsupported` trên WSL.

## 5. Thảo luận nổi bật

Không có dữ liệu Discussion riêng lẻ nào được cung cấp trong tập dữ liệu này; hoạt động thảo luận được ghi nhận trong các Issue và PR ở trên.

## 6. Xu hướng yêu cầu tính năng

- **Sandboxing & tăng cường quyền** — #2242 (sandbox), #52083 và #50652 (vượt quyền) tạo thành một chủ đề mạch lạc: người dùng muốn các hạn chế có thể thực thi và kiểm toán được đối với những gì agent và plugin có thể chạm tới.
- **Khả năng hiển thị mức sử dụng & rõ ràng về giới hạn** — #57975 (dashboard sử dụng hợp nhất), #58014 (chạm giới hạn miễn phí sau vài request), #12671 (lỗi số dư), và #34344 (lỗ hổng rate-limit) đều chỉ ra sự nhầm lẫn và thiếu tin tưởng quanh hạn mức.
- **Kiểm soát vị trí thực thi model** — #58330 yêu cầu một toggle bên cạnh quyền API-key để chọn nơi model thực thi.
- **Khả năng quan sát / metadata session** — #54881 yêu cầu header root-session ID trên các request LLM; #58034 yêu cầu định dạng timestamp có thể cấu hình trong UI.
- **Khả năng mở rộng nhà cung cấp tìm kiếm** — #58328 (tái đưa Brave tích hợp) và #58327 (tín hiệu rate-limit cho provider tùy chỉnh để failover) cho thấy nhu cầu về một lớp websearch có thể cắm thêm và chịu lỗi tốt.
- **Chất lượng bản địa hóa** — #51868 và PR #58357 báo hiệu nhu cầu liên tục về bản dịch tiếng Trung chính xác thay vì các bản fallback do máy tạo.

## 7. Điểm đau của nhà phát triển

- **Các lỗ hổng trong mô hình quyền tái diễn và liên quan đến bảo mật.** Cả #52083 (redirection shell bị bỏ qua trong lệnh phức hợp) lẫn #50652 (công cụ plugin vượt quyền) đều mô tả các cách thoát khỏi quy tắc `allow`/`deny` đã cấu hình. Đây là những phàn nàn tái diễn có mức độ nghiêm trọng cao nhất.
- **Sự mong manh vòng đời MCP thống trị hàng đợi PR tuần này.** Server trùng lặp, shutdown tuần tự bị kẹt, tool lỗi định dạng làm hỏng cả server, phân loại sai callback OAuth, và idle timeout của fetch trong Bun cùng nhau cho thấy một subsystem non trẻ với nhiều edge case đang được tích cực gia cố.
- **Các hồi quy v2 bào mòn niềm tin của người nâng cấp.** Tiêu đề session biến mất (#58176), tool call của DeepSeek thoái hóa thành văn bản (#58027), và đăng ký Console provider thất bại (#58335) đều là các báo cáo kiểu "nó chạy được ở 1.x/2.0" — mẫu friction migration kinh điển.
- **Giới hạn gói miễn phí có cảm giác mờ đục và rò rỉ.** Người dùng có thể vượt giới hạn qua xoay VPN (#34344) nhưng lại chạm "daily limit reached" sau vài request (#58014) — thực thi không nhất quán, gây hại cả niềm tin lẫn kiếm tiền.
- **Chất lượng i18n tụt lại so với sản phẩm.** 93 key `zh` bị thiếu cộng với các bản dịch sai như 壳牌 cho "shell" cho thấy dịch máy được phát hành mà không qua kiểm duyệt.
- **Công việc agent chạy dài rất mong manh.** Shell nền bị giết sau 60 phút không hoạt động của location (#51828) và các cuộc gọi MCP từ xa timeout ở ~5 phút (#58341) đều gây bất lợi đúng cho những workflow tầm xa mà OpenCode hướng tới.

*Được tạo từ hoạt động của github.com/anomalyco/opencode ngày 2026-10-23.*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới nào trong 24 giờ qua, nên hoạt động hôm nay chủ yếu là phân loại issue và một loạt PR sửa lỗi. Chủ đề sôi nổi nhất là **đề xuất ngân sách thời gian khởi động (#7739)**, benchmark Pi so với jcode với 11 bình luận — dấu hiệu cho thấy hiệu suất khởi động nguội đang trở thành mối quan tâm cạnh tranh. Trong khi đó, các maintainer đã dọn dẹp một lượng lớn issue tồn đọng `no-action` và `untriaged`, và nhiều PR cộng đồng đã sửa lỗi crash khi export phiên sâu, xếp hạng tìm kiếm mờ, và hiệu suất fork phiên.

## 2. Bản phát hành

Không có trong 24 giờ qua.

## 3. Issue nổi bật

1. **[#7739 — Đặt ngân sách thời gian khởi động nhắm đến độ trễ và bộ nhớ tương đương jcode](https://github.com/earendil-works/pi/issues/7739)** (OPEN, 11 bình luận) — Issue được bình luận nhiều nhất trong ngày. Đề xuất một ngân sách khởi động chính thức, benchmark dựa trên bảng trong README của jcode (độ trễ/bộ nhớ khi khởi chạy PTY tương tác). Cho thấy áp lực ngày càng tăng đối với hiệu suất khởi động nguội như một yếu tố khác biệt.

2. **[#6167 — Chuẩn hóa thinking-block của `transformMessages` so với `requiresReasoningContentOnAssistantMessages`](https://github.com/earendil-works/pi/issues/6167)** (CLOSED, 10 bình luận) — Một lỗi liên mô hình tinh tế: khi chuyển đổi mô hình, nội dung thinking dạng văn bản thuần được chèn vào, sau đó kích hoạt cờ tương thích trên các nhà cung cấp yêu cầu nội dung reasoning. Lỗi tương tác đuôi dài, nay đã được giải quyết.

3. **[#9932 — System prompt bắt buộc của `before_agent_start` giữ lại các tool đã bị `setActiveTools` xóa](https://github.com/earendil-works/pi/issues/9932)** (OPEN, 6 bình luận) — Lỗi thứ tự trong extension hook: system prompt bắt buộc được ghi lại trước khi tập tool đang hoạt động được đồng bộ, nên các tool đã xóa vẫn được quảng cáo. Quan trọng với các tác giả extension đang xây dựng logic gating tool.

4. **[#10259 — API trình bày tool công khai hoặc chế độ tool một dòng tích hợp sẵn](https://github.com/earendil-works/pi/issues/10259)** (OPEN, 5 bình luận, 👍2) — Yêu cầu một API chỉ để hiển thị bao phủ tất cả các hàng tool (built-in, MCP, codemode, extension), hoặc một chế độ một dòng gọn nhẹ tích hợp sẵn. Một trong số ít issue hôm nay có reaction tích cực — nhu cầu kiểm soát mật độ hiển thị rất rõ ràng.

5. **[#11223 — `modelOverrides` bị bỏ qua âm thầm đối với mô hình classifier](https://github.com/earendil-works/pi/issues/11223)** (OPEN, 5 bình luận) — Cấu hình được chấp nhận nhưng bị loại bỏ âm thầm, mâu thuẫn với `docs/models.md`. Chế độ thất bại âm thầm là kiểu tệ nhất; người dùng muốn hoặc là được tôn trọng, hoặc có cảnh báo rõ ràng.

6. **[#9807 — TUI re-render toàn bộ gây lag cuộn/gõ phím khi có hơn 800 tin nhắn](https://github.com/earendil-works/pi/issues/9807)** (OPEN, 5 bình luận, 👍3) — So sánh việc re-render toàn bộ scrollback của Pi không thuận lợi so với diffing cấp cell tăng dần của OpenCode. Issue mở có nhiều reaction nhất hôm nay; trải nghiệm phiên lớn là điểm đau thực sự về khả năng mở rộng.

7. **[#11250 / #11251 — Loại bỏ HTML comment cả dòng khỏi các file ngữ cảnh để khớp với Claude Code](https://github.com/earendil-works/pi/issues/11250)** (CLOSED, 4+2 bình luận) — Ghi chú của maintainer trong `CLAUDE.md` hiện được gửi nguyên văn cho mô hình. Một khoảng trống di chuyển cụ thể cho các nhóm chuyển từ Claude Code.

8. **[#11086 — Ký tự rò rỉ vào input trên terminal Windows khi CPU tải cao](https://github.com/earendil-works/pi/issues/11086)** (OPEN, `prio:p0`, 4 bình luận) — Input bị hỏng khi SSH vào máy chủ Pi Linux trong khi client đang chịu tải. Được đánh dấu P0, trở thành lỗi mở nghiêm trọng nhất trong đợt này.

9. **[#11127 — Cho phép cấu hình khoảng thời gian làm ấm cache khi nhàn rỗi](https://github.com/earendil-works/pi/issues/11127)** (OPEN, 3 bình luận) — Mặc định 30 phút hardcode không khớp với lịch refresh 27/54 phút dưới TTL prompt-cache 30 phút. Yêu cầu tinh chỉnh hiệu quả chi phí cho người dùng nặng.

10. **[#11252 — macOS: hủy `a; b` vẫn có thể chạy `b`](https://github.com/earendil-works/pi/issues/11252)** (CLOSED, 2 bình luận) — Race process-group trên macOS khi tải cao khiến lệnh bash đã hủy vẫn có thể thực thi lệnh chuỗi tiếp theo. Liên quan đến an toàn; đã được sửa qua PR #11289.

## 4. Tiến độ PR quan trọng

1. **[#11309 — fix(coding-agent): await tin nhắn người dùng từ extension](https://github.com/earendil-works/pi/pull/11309)** (OPEN) — Trả về promise bên dưới từ `sendUserMessage` và cho phép command handler await turn được tạo; test hồi quy cho #11238. Cải thiện ergonomics của extension.

2. **[#11304 — fix(coding-agent): khởi động khi package được cấu hình cài đặt thất bại](https://github.com/earendil-works/pi/pull/11304)** (OPEN) — Package được cấu hình bị hỏng không còn hủy khởi động; lỗi được báo qua kênh cảnh báo extension và các package khác vẫn tải được.

3. **[#11296 — fix(tui,coding-agent): xếp hạng khớp mờ liền kề, tìm kiếm các trường phiên riêng biệt](https://github.com/earendil-works/pi/pull/11296)** (CLOSED) — Làm lại thuật toán khớp trái nhất tham lam để tính điểm các căn chỉnh liền kề; đóng #11220 và giải quyết #10552, #10065, #11024. Sửa trực tiếp phàn nàn "gõ `opus` lại xếp Sonnet cao hơn".

4. **[#11295 / #11145 — Thứ tự mô hình theo phạm vi và ưu tiên khớp chuỗi con](https://github.com/earendil-works/pi/pull/11145)** (CLOSED) — Thêm tùy chọn bỏ qua hình phạt vị trí khớp trong trình chọn mô hình theo phạm vi để các khớp tương đương giữ nguyên thứ tự đã cấu hình. Bổ sung cho việc làm lại tìm kiếm mờ.

5. **[#11290 — fix(coding-agent): render tin nhắn hệ thống trong export HTML](https://github.com/earendil-works/pi/pull/11290)** (CLOSED) — Render tin nhắn hệ thống đầu tiên dưới dạng system prompt + danh sách tool, và các tin nhắn hệ thống sau đó dưới dạng cập nhật phần có tên; đóng #11261 và #3464.

6. **[#11293 / #11275 / #6843 — Duyệt cây export HTML lặp](https://github.com/earendil-works/pi/pull/11293)** (CLOSED) — Thay thế `sortChildren`/`mapNodes`/`markActive` đệ quy bằng stack tường minh cùng test hồi quy 20.000 cấp; sửa lỗi tràn stack khi export trắng (#11225). Ba PR độc lập hội tụ về cùng một cách sửa.

7. **[#11289 — fix(coding-agent): dừng shell group trên macOS trước khi kill](https://github.com/earendil-works/pi/pull/11289)** (CLOSED) — Giảm race khi kill tiến trình con foreground đánh thức shell trước khi shell được gửi tín hiệu; đóng #11252.

8. **[#11288 — fix(coding-agent): ghi phiên đã fork qua một fd](https://github.com/earendil-works/pi/pull/11288)** (OPEN) — Thay thế `appendFileSync` cho từng entry (≈3.000 chu kỳ mở/đóng cho fork 3.000 entry) bằng một fd duy nhất; nhắm đến tình trạng treo fork hơn 30 giây trong #11253.

9. **[#11278 — fix(extensions): giữ getter ctx.ui qua wrapUIPromptContext](https://github.com/earendil-works/pi/pull/11278)** (CLOSED) — Object spread giải quyết `get theme()` tại thời điểm bind, làm hỏng các host bind UI context trước khi theme được khởi tạo.

10. **[#11270 — fix(coding-agent): bỏ override min-release-age khỏi npm ci được quản lý](https://github.com/earendil-works/pi/pull/11270)** (CLOSED) — Cờ `--min-release-age=0` không có tác dụng với lockfile được pin nhưng lại kích hoạt scanner bảo mật chặn cập nhật; bỏ nó giúp mở khóa pipeline cài đặt.

## 5. Thảo luận nổi bật

**Show and tell**
- **[#11307 — pi-better-web-search](https://github.com/earendil-works/pi/discussions/11307)** (👍1) — Một tool `web_search` duy nhất với kết quả provider thô (không viết lại) và fallback thực sự giữa các provider, để mô hình không có tìm kiếm gốc sẽ fallback sang provider mà bạn đã đăng nhập thay vì thất bại.
- **[#11306 — pi-continuity](https://github.com/earendil-works/pi/discussions/11306)** (👍1) — Tự động tiếp tục sau khi đạt giới hạn sử dụng gói coding (ví dụ: giới hạn 5 giờ của OpenAI) và các turn bị gián đoạn, không cần gõ "continue" thủ công sau nhiều giờ.

## 6. Xu hướng yêu cầu tính năng

- **Ngân sách hiệu suất và mở rộng phiên lớn**: độ trễ khởi động so với jcode (#7739), lag re-render TUI khi có hơn 800 tin nhắn (#9807), fork bị treo trên phiên 73MB (#11253), và crash export đệ quy (#11225) đều chỉ ra công việc hiệu suất là chủ đề hàng đầu.
- **Mở rộng bề mặt Extension/API**: API trình bày tool công khai (#10259), định danh tin nhắn trong ngữ cảnh markdown transformer (#7828, đã ship qua #7952), extension MCP bền vững cho host Harness (#10837), và tùy chỉnh tên client OAuth cho MCP server (#10226).
- **Mật độ hiển thị và khả năng cấu hình**: chế độ tool một dòng (#10259), khoảng thời gian làm ấm cache cấu hình được (#11127), auto-compaction theo phạm vi provider với ngưỡng token tuyệt đối (#11295), autocomplete slash inline cho skill (#11294), và `/reload` làm mới `AGENTS.md` (#11291/#11292).
- **Tương đương Claude Code cho file ngữ cảnh**: loại bỏ HTML comment cả dòng (#11250/#11251) — yêu cầu nhỏ nhưng cụ thể về giảm ma sát di chuyển.

## 7. Điểm đau của nhà phát triển

- **Thất bại âm thầm**: `modelOverrides` bị bỏ qua không cảnh báo (#11223), thiếu `checkpointWhen` vượt qua validation cho đến khi commit đầu tiên crash (#11305), và `pi.exec` nuốt lỗi spawn (#11257) — nhà phát triển liên tục yêu cầu validation rõ ràng, sớm thay vì no-op âm thầm.
- **Độ bền vững input TUI**: ký tự rò rỉ vào input khi CPU tải cao (#11086, P0), bracketed paste rỗng trên WSL làm mất ảnh (#11259), báo cáo chuột bị tách để lại đuôi escape sequence trong prompt (#11172), và `Ctrl+C` xóa toàn bộ prompt từ lâu (#9190) — xử lý input terminal vẫn là khu vực nhiều bug nhất.
- **Vòng đời tiến trình/phiên mong manh**: race hủy `a; b` trên macOS (#11252), provider API extension bị xóa bởi reload cài đặt giữa phiên gây exception không bắt được (#11287), và copy phiên fork chậm (#11253).
- **Kỳ vọng cấu hình không được đáp ứng**: tài liệu hứa hẹn hành vi (`docs/models.md`, reload `AGENTS.md`) mà runtime không thực hiện, buộc phải khởi động lại phiên (#11291/#11292).
- **Phân phối/hạ tầng chưa rõ ràng**: thiếu hướng dẫn cài đặt macOS/brew và repo liên quan không công khai (#11282) — cho thấy khoảng trống tài liệu và kênh phát hành song song với các vấn đề code.

---
*Được tạo từ hoạt động của github.com/earendil-works/pi ngày 2026-10-23.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Một bản nightly mới (`v0.26.0-nightly.20261022`) đã phát hành tính năng lưu trữ token cho daemon, nhưng sự chú ý trong ngày chủ yếu tập trung vào **các lỗi hồi quy về độ tin cậy trong dòng 0.26.0** — đáng chú ý là báo cáo P1 về việc kết quả công cụ bị mất âm thầm (#15297) và lỗi P1 trong ACP khi tham số `write_file` bị cắt ngắn lại được ghi xuống đĩa (#15324). Về tính năng, manifest tiếp tục mở rộng xoay quanh stack **Managed Agent / daemon / Web Shell**: cổng kiểm soát tác vụ theo lịch, provisioner Runtime bên ngoài, thư mục làm việc riêng theo phiên, và một thảo luận dài về việc hợp nhất mọi bề mặt vào một agent loop duy nhất (#15327).

## 2. Bản phát hành

**v0.26.0-nightly.20261022.bf66a26c97** — [Release](https://github.com/QwenLM/qwen-code/releases)
- `feat(serve)`: thêm tính năng lưu trữ token cho daemon (PR [#15023](https://github.com/QwenLM/qwen-code/pull/15023), @wenshao) — token xác thực của daemon giờ đây tồn tại qua các lần khởi động lại, đây là điều kiện tiên quyết cho việc triển khai `qwen serve` / Web Shell ổn định.
- `fix(release)`: bao phủ mọi binary vendored được spawn trong pipeline phát hành.

## 3. Issue nóng

1. **[#15297](https://github.com/QwenLM/qwen-code/issues/15297) — P1: 0.26.0 âm thầm mất kết quả công cụ (~1 trong 30 lần gọi)** — Người dùng Windows báo cáo `functionCall` không có `functionResponse`; chỉnh sửa vẫn được áp dụng nhưng model đọc lại file. Đây là lỗi hồi quy nghiêm trọng nhất trong ngày; 43/1663 lần gọi, 28 trường hợp xác nhận qua transcript.
2. **[#15324](https://github.com/QwenLM/qwen-code/issues/15324) — P1: ACP ghi tham số `write_file` bị cắt ngắn xuống đĩa** — Việc cắt do giới hạn output tạo ra các file ghi dở nhưng được báo là thành công. Ảnh hưởng đến Zed, VS Code companion, `qwen serve` và các SDK client.
3. **[#15327](https://github.com/QwenLM/qwen-code/issues/15327) — P1 tracking: hợp nhất mọi bề mặt vào một agent loop** — Đề xuất chạy CLI, Web Shell, ACP và SDK qua một `experimental.unifiedAgentLoop` duy nhất; sẽ loại bỏ nhóm lỗi phân kỳ như đã thấy trong #15326.
4. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078) — Kiểm tra CVE phụ thuộc hàng ngày thất bại (29 bình luận)** — Thread chạy lâu nhất trong tracker; kiểm tra theo lịch vẫn đỏ, gợi ý có thể có vấn đề với endpoint npm audit hoặc một phát hiện mức độ nghiêm trọng cao chưa được xử lý.
5. **[#15165](https://github.com/QwenLM/qwen-code/issues/15165) — Parser an toàn shell gây cấp phát WASM tạm thời ~1,6 GiB trên Node 24.16.0** — Đo được mức tăng bộ nhớ native trong Bash parser đi kèm; đây là vấn đề nghiêm trọng với CI và container bị giới hạn bộ nhớ.
6. **[#15328](https://github.com/QwenLM/qwen-code/issues/15328) — Chạy headless thoát với mã 0 và không có output khi lượt bị cắt ngắn** — Chế độ thất bại "thành công âm thầm" phá vỡ việc dùng trong script/CI; tái hiện 3 trong 4 lần chạy trên 0.23.4.
7. **[#15325](https://github.com/QwenLM/qwen-code/issues/15325) — stream-json vượt `--max-session-turns` trả về thành công với câu trả lời trước đó** — Lỗi trả về câu trả lời cũ mà không có tín hiệu lỗi; gây hiểu nhầm trực tiếp cho người dùng SDK.
8. **[#15248](https://github.com/QwenLM/qwen-code/issues/15248) — Test timing runtime broker của sdk-java flake 3/3 trên runner do GitHub host** — Làn nhanh cho PR từ fork gần như bị chặn; sự khác biệt giữa runner host và self-hosted là chủ đề lặp lại nhiều lần.
9. **[#8968](https://github.com/QwenLM/qwen-code/issues/8968) — Hỗ trợ MCP core spec 2026-07-28 + MCP Apps trong daemon WebShell** — Yêu cầu tích hợp đã tồn tại lâu (từ tháng 8); việc migration từ SDK v1 lên bản hiện tại vẫn còn mở và là khoảng trống MCP chính.
10. **[#13787](https://github.com/QwenLM/qwen-code/issues/13787) — Khôi phục XML lặp lại quét prefix trên các phản hồi lớn có nhiều lần gọi** — Tái hiện có giới hạn trên `main`; đây là điểm suy giảm hiệu năng với các đợt gọi công cụ dài.

## 4. Tiến độ PR chính

1. **[#15218](https://github.com/QwenLM/qwen-code/pull/15218) — feat(managed): chặn automation bằng Runtime probe trước khi nhận** — Automation có thể mang theo cổng shell-command; một lần thoát im lặng được ghi nhận là `skipped/gate_quiet` mà không có lượt phiên.
2. **[#15211](https://github.com/QwenLM/qwen-code/pull/15211) — feat(serve): mang cổng tác vụ theo lịch qua daemon và Web Shell** — Tiếp nối #15069; đưa cơ chế chặn vào đường đi của daemon.
3. **[#15261](https://github.com/QwenLM/qwen-code/pull/15261) — feat(runtime-broker): worker scratch bên ngoài dùng HTTP** — Provider `external-scratch` tùy chọn ủy thác việc đặt worker cho một service do operator vận hành, kèm attestation và ngữ nghĩa retry.
4. **[#15041](https://github.com/QwenLM/qwen-code/pull/15041) — feat(core): header source-config cho 千问AI平台 / QwenCloud** — Thêm `X-DashScope-Source-Config` cho các họ host `maas.qianwenaiapi.com` / `maas.qwencloudapi.com`.
5. **[#15089](https://github.com/QwenLM/qwen-code/pull/15089) — feat(serve): `todo_write` cho phiên workspace được quản lý** — Thêm profile công cụ `/3`; các phiên `/1` và `/2` giữ nguyên hành vi.
6. **[#15283](https://github.com/QwenLM/qwen-code/pull/15283) — feat(cli): đồng bộ khôi phục phiên OpenTUI với Ink** — Một batch khôi phục bao gồm hủy, Retry, recall, replay resume/branch, rewind, khôi phục checkpoint.
7. **[#15246](https://github.com/QwenLM/qwen-code/pull/15246) — perf(memory): giữ lại snapshot catalog legacy không đổi** — Cải thiện mức dùng bộ nhớ cho các phiên được resume và retry.
8. **[#15290](https://github.com/QwenLM/qwen-code/pull/15290) — fix(ci): chặn suite Windows Hosted khi cài đặt thành công** — Khôi phục phụ thuộc ngầm rằng các case Hosted thực sự có bản cài đặt dùng được.
9. **[#15286](https://github.com/QwenLM/qwen-code/pull/15286) / [#15275](https://github.com/QwenLM/qwen-code/pull/15275) — fix(ci): giới hạn host lock của sdk-java cho ghi cache** — Chạy Maven không khóa từ repo cục bộ theo job; giải quyết chuỗi đói host lock.
10. **[#15311](https://github.com/QwenLM/qwen-code/pull/15311) — fix(web-shell): làm mới phiên standalone sau khi cấp phát** — Cuộc hội thoại mới giờ xuất hiện ngay cả khi phản hồi đầu tiên vẫn đang stream.

## 5. Thảo luận nóng

Không có dữ liệu Discussion riêng cho khoảng thời gian này; các cuộc trao đổi về câu hỏi thiết kế đang diễn ra trong Issue (#15077, #14988, #15327, #15166) thay vì Discussions.

## 6. Xu hướng yêu cầu tính năng

- **Quản lý phiên trưởng thành hơn**: liệt kê phiên đã lưu trữ + tìm kiếm theo tiêu đề ([#15077](https://github.com/QwenLM/qwen-code/issues/15077), đã đóng), thư mục làm việc riêng theo phiên trong workspace chia sẻ ([#15316](https://github.com/QwenLM/qwen-code/issues/15316)), và theo dõi hợp nhất agent-loop ([#15327](https://github.com/QwenLM/qwen-code/issues/15327)).
- **Nhất quán UX Web Shell**: thống nhất thuật ngữ Workspace/Session ([#14988](https://github.com/QwenLM/qwen-code/issues/14988)), vị trí nhóm Create trong sidebar ([#15312](https://github.com/QwenLM/qwen-code/issues/15312)), hiển thị đầy đủ tham số/kết quả cho thẻ công cụ MCP mở rộng ([#15280](https://github.com/QwenLM/qwen-code/issues/15280)).
- **Hiện đại hóa MCP**: hỗ trợ đầy đủ MCP core spec 2026-07-28 và host MCP Apps trong daemon WebShell ([#8968](https://github.com/QwenLM/qwen-code/issues/8968)).
- **Bề mặt mở rộng**: provisioner Runtime bên ngoài dùng HTTP ([#15247](https://github.com/QwenLM/qwen-code/issues/15247), đã landed dưới PR #15261).
- **Cấu hình web search linh hoạt**: opt-in rõ ràng cho gateway tương thích DashScope ([#15302](https://github.com/QwenLM/qwen-code/issues/15302)) và cấu hình thêm host tin cậy ([#15299](https://github.com/QwenLM/qwen-code/issues/15299)).
- **Đúng đắn theo nền tảng**: cho model biết nó dùng shell nào trên Windows ([#15310](https://github.com/QwenLM/qwen-code/issues/15310)).

## 7. Điểm đau của nhà phát triển

- **Chế độ thất bại âm thầm**: exit code 0 mà không có output (#15328), câu trả lời cũ vượt giới hạn lượt (#15325), và mất kết quả công cụ (#15297) đều phá vỡ niềm tin vào automation và dùng headless/CI.
- **Xử lý cắt ngắn**: việc cắt do giới hạn token không được phát hiện trước khi có hiệu ứng phụ — ACP ghi file dở (#15324).
- **Bất ổn CI và phân kỳ runner**: sdk-java flake trên runner host (#15248), spam lỗi theo commit (#15166), và đói host lock trên self-hosted (#15275, #15286) chiếm phần lớn sự chú ý của maintainer.
- **Hồi quy bộ nhớ và hiệu năng**: cấp phát WASM tạm thời 1,6 GiB trong phân loại an toàn shell (#15165) và quét khôi phục XML bậc hai (#13787).
- **Ngây thơ về nền tảng**: giả định về shell Windows (#15310) và cấu hình sai suite host trên Windows (#15290).
- **Lỗ hổng vệ sinh phụ thuộc kéo dài**: issue kiểm tra CVE (#13078) đã mở và đỏ từ 2026-09-30 với 29 bình luận và chưa có giải pháp.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*