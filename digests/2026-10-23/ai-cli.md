# Bản tin cộng đồng công cụ AI CLI 2026-10-23

> Tạo lúc: 2026-10-23 05:33 UTC | Công cụ theo dõi: 7

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

# Báo cáo So sánh Giữa các Công cụ: Hệ sinh thái AI CLI
**Ngày: 2026-10-23 | Công cụ: Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, Qwen Code**

---

## 1. Tổng quan Hệ sinh thái

Hệ sinh thái AI CLI vào cuối năm 2026 đã trưởng thành vượt qua câu hỏi "nó có chạy được không?" để bước vào giai đoạn củng cố và xây dựng niềm tin. Mọi công cụ lớn đều phát hành bản vá bảo mật hoặc độ tin cậy trong tuần này (Claude Code vá lỗ hổng thoát sandbox, OpenCode vá gói CVE Bun 1.4.4, Copilot CLI vá việc tuân thủ cờ sandbox), cho thấy các nhà cung cấp giờ coi những công cụ này là hạ tầng sản xuất chứ không còn là thử nghiệm. Một sự hội tụ cấu trúc rõ ràng đang diễn ra: vòng lặp agent, điều phối subagent, tích hợp công cụ MCP, hooks, và phân phạm vi quyền xuất hiện trong trình theo dõi vấn đề của mọi cộng đồng, cho thấy phạm vi kiến trúc đã ổn định. Sự khác biệt đang chuyển dịch khỏi năng lực cốt lõi sang **độ tin cậy, khả năng quan sát, sandboxing, và mức độ sẵn sàng cho doanh nghiệp**. Trong khi đó, cộng đồng ngày càng không khoan dung với các lỗi im lặng (gọi công cụ bị cắt ngắn, "GOAL" thành công ảo, đếm sai hạn mức) — niềm tin vào báo cáo tự thân của agent giờ là loại khiếu nại lặp lại nhiều nhất trên cả bảy công cụ.

---

## 2. So sánh Mức độ Hoạt động

| Công cụ | Vấn đề (hoạt động hôm nay) | PR (hoạt động hôm nay) | Thảo luận | Trạng thái Phát hành |
|---|---|---|---|---|
| **Claude Code** | 10 nóng + cụm ngữ cảnh 9 vấn đề | 7 (đều đã đóng, lô mod-infra) | N/A | **v2.1.309** — đã vá lỗ hổng thoát sandbox |
| **OpenAI Codex** | 10 nóng (~30 theo dõi) | ~10 đã hợp nhất (chủ yếu `copyberry[bot]`) | 17 mục (Ideas/QA/Show&Tell) | **rust-v0.164.0** ổn định + alpha cuốn chiếu |
| **Gemini CLI** | 10 nóng + vài P1/P2 | 10 đang hoạt động (bản vá P1 đang về) | N/A | **v0.67.0-nightly** — vá metadata token |
| **GitHub Copilot CLI** | 10 nóng | 0 PR được cập nhật | N/A | **v1.0.103** — vá clipboard/sandbox/kết nối lại |
| **OpenCode** | 10 nóng | ~10 (đợt củng cố vòng đời MCP dày đặc) | N/A | **v1.19.4** — gói CVE Bun 1.4.4 |
| **Pi** | 10 nóng | 10 (vá TUI/hiệu năng/xuất) | 2 (chỉ Show & Tell) | Không có phát hành trong 24h |
| **Qwen Code** | 10 nóng (nhiều lỗi đúng đắn P1) | 10 (hợp nhất vòng lặp agent, quản lý workspace) | N/A | **v0.26.0-nightly** — lưu token daemon |

**Đọc bảng:**
- **Cột Vấn đề** phản ánh các mục *nóng/hoạt động* xuất hiện trong mỗi bản tóm tắt, không phải tổng backlog đang mở. Tất cả công cụ trừ Copilot đều đang chạy dải tín hiệu khoảng 10 mục đồng đều.
- Các mục **N/A** cho thấy kho lưu trữ không có kênh Discussions trong tập dữ liệu (hoặc dùng Issues làm kênh duy nhất) — đây là lựa chọn kiến trúc kênh, không phải thiếu tương tác. Codex là công cụ duy nhất vận hành Discussions như một bề mặt cộng đồng hạng nhất.
- **Hoạt động PR** là yếu tố khác biệt rõ nhất: Gemini CLI, OpenCode, Pi, và Qwen Code đang giữa chừng với các PR sửa lỗi thực chất; Copilot CLI không có hoạt động hợp nhất nào, và lưu lượng PR duy nhất của Claude Code là một lô dọn dẹp mod-infra đã đóng.
- **Nhịp phát hành** đều cao — năm trong bảy công cụ phát hành trong 24h, tất cả đều mang tính bảo trì/củng cố chứ không phải tiêu đề tính năng.

---

## 3. Định hướng Tính năng Chung

Các yêu cầu xuất hiện trên **ba cộng đồng trở lên**, kèm nhu cầu cụ thể mà mỗi yêu cầu bộc lộ:

### 3.1 Sandboxing & Ranh giới Quyền
- **Claude Code** đã vá hai lỗ hổng thoát sandbox thực sự trong tuần này (tệp khởi động shell chạy ngoài sandbox; `denyWrite` glob bị vượt qua qua symlink) — đây giờ là bề mặt tấn công sống.
- **OpenCode #2242** (101 bình luận, 80 👍) yêu cầu giam hãm hệ thống tệp; **#52083** (vượt qua qua chuyển hướng) và **#50652** (vượt qua quyền plugin) cho thấy mô hình rò rỉ ở cả hai phía.
- **Copilot CLI #5232** (thư mục tin cậy tự động phê duyệt thực thi shell) và **#3013** (hooks không kích hoạt cho công cụ subagent) cùng một mẫu: các đường dẫn agent vượt qua mặt phẳng điều khiển đã khai báo.
- **Gemini CLI #19873** đề xuất sandbox OS không phụ thuộc; **#22672** yêu cầu agent tự giới hạn lệnh phá hoại.
- **Pi #9932** và **Qwen Code #15317** là phần mở rộng cấu trúc của cùng ý tưởng (loại bỏ công cụ và giới hạn độ sâu giá trị xuyên ranh giới).

**Yêu cầu chung:** một mô hình quyền *duy nhất, có thể thực thi* giữ vững trên công cụ tích hợp, plugin, máy chủ MCP, hooks, và subagent. Mọi công cụ hiện đang rò rỉ ở ít nhất một trong sáu bề mặt đó.

### 3.2 Khả năng Quan sát & Kiểm soát Subagent
- **Gemini CLI #22323** (MAX_TURNS được báo cáo là thành công `GOAL`) và **#21763** (`/bug` bỏ qua ngữ cảnh subagent) — subagent là hộp đen.
- **Claude Code** có vấn đề về công cụ `ccd_turn` tính vào giới hạn gói mà không có quy kết, cộng với hộp bước tiếp theo chạy đua với phản hồi của mô hình.
- **Codex #56282** (Codex Cloud tuyên bố PR hoàn thành mà không công bố cái nào) và **#56352/#55702** (trạng thái Daybreak bị chính agent báo cáo sai).
- **Copilot CLI #3013** (hooks không kích hoạt cho agent nền).

**Yêu cầu chung:** quỹ đạo subagent cần có thể kiểm tra, có thể quy kết cho hóa đơn, và báo cáo trung thực giữa thất bại và thành công. Hiện nay, subagent của mọi công cụ đều là hộp đen.

### 3.3 Minh bạch Sử dụng/Hạn mức
- **Codex #51088** (hạn mức cạn bất thường nhanh), **#32586** (tự động đổi các reset đã tích), **#56328/#55746** ("hết công suất" trên mọi mô hình).
- **Claude Code** — cụm ~9 vấn đề (bản cập nhật sau 2.37337.1 đã loại bỏ mức sử dụng cửa sổ ngữ cảnh khỏi vòng sử dụng).
- **OpenCode #57975** (bảng điều khiển sử dụng hợp nhất) và **#58014** (giới hạn miễn phí cạn sau vài yêu cầu).
- **Qwen Code** — phản hồi từ Claw Cloud bao gồm các mô hình mà Qwen Code không bao giờ đăng ký; kế toán bậc miễn phí không minh bạch.

**Yêu cầu chung:** kế toán sử dụng chính xác theo từng lượt, từng mô hình, từng subagent với tín hiệu công suất rõ ràng trước khi người dùng đụng tường. Niềm tin vào đồng hồ đo giờ là một tính năng cạnh tranh.

### 3.4 Độ bền Vòng đời MCP
- **Copilot CLI** — cụm năm vấn đề (#5229, #5233, #5234, #5236, #5242): refresh token tồn tại nhưng không được dùng, trạng thái xác thực không lưu, cạn inotify giết phiên.
- **OpenCode** — năm PR cùng ngày (#58341–#58351): tắc tắt máy, nhân bản khởi động, lỗi công cụ sai định dạng, phân loại sai callback OAuth, hết thời gian chờ fetch Bun.
- **Gemini CLI #29767** — giới hạn khám phá `tools/list` ở 60s (trước đó là 10 phút thời gian chờ kế thừa).
- **Claude Code #97936** — lệnh skills/plugin thiếu khỏi tự động hoàn thành `/`.

**Yêu cầu chung:** MCP là bề mặt mở rộng phổ quát của hệ sinh thái, và nó *không đáng tin cậy* ở mọi công cụ. Làm mới xác thực, hết thời gian khám phá, và tranh chấp vòng đời là ba chế độ thất bại hàng đầu.

### 3.5 Liên tục Xuyên Thiết bị / Xuyên Phiên
- **Codex #14067** (13 bình luận, 69 👍) — mục thảo luận được ủng hộ nhiều nhất trên toàn tập dữ liệu.
- **Pi #11292/#11291** (tải lại AGENTS.md giữa phiên) và tiện ích `pi-continuity` (#11306).
- **Claude Code #95364/#95491/#100114** — cụm tự động cập nhật/khởi động lại phá hủy trạng thái phiên.
- **Qwen Code #15323** (thư mục làm việc theo phiên) và lưu token daemon.

**Yêu cầu chung:** phiên nên sống sót qua khởi động lại ứng dụng, cập nhật, và thay đổi thiết bị. Hiện nay, có thể nói không công cụ nào cung cấp đầy đủ điều này.

### 3.6 Tôn trọng Agent Tùy chỉnh / Cấu hình
- **Copilot CLI #5241, #5219, #5133** — frontmatter model/reasoning-effort bị bỏ qua; cài đặt được tôn trọng ở một chế độ, bị bỏ qua ở chế độ khác.
- **Pi #11223** — `modelOverrides` bị bỏ qua im lặng cho các mô hình phân loại.
- **Gemini CLI #22267** — agent trình duyệt loại bỏ ghi đè `settings.json`.
- **Codex** — ghi đè danh mục mô hình giờ mới được áp dụng cho các công cụ lịch sử/ghi chú/ngữ cảnh (#56313).

**Yêu cầu chung:** nếu tài liệu hứa một nút cấu hình hoạt động, nó phải hoạt động trên mọi chế độ thực thi. Bỏ rơi cấu hình im lặng là loại lỗi tốn niềm tin nhất trong tập dữ liệu.

---

## 4. Phân tích Khác biệt

| Trục | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | OpenCode | Pi | Qwen Code |
|---|---|---|---|---|---|---|---|
| **Người dùng chính** | Người dùng chuyên Anthropic / tương đương web + desktop | Nhà phát triển doanh nghiệp + API/BYOK | Lập trình viên hệ sinh thái Google, luồng công việc ngữ cảnh lớn | Cửa hàng GitHub/doanh nghiệp + Windows | Ưu tiên OSS, không phụ thuộc nhà cung cấp | Nhà xây dựng tiện ích/công cụ | Alibaba Cloud / stack Qwen, quy mô đa thuê bao |
| **Trọng tâm kỹ thuật** | Củng cố sandbox, kiến trúc xác thực connector | Cấu hình được quản lý, hooks theo môi trường, phân nhánh luồng | Độ tin cậy agent, giảm ngữ cảnh nhận biết AST | Xác thực MCP doanh nghiệp + tương đương ACP | Vòng đời MCP, di trú V2, mô hình quyền | Hiệu năng TUI, API tiện ích, độ trung thực xuất | Vòng lặp agent hợp nhất, broker runtime được quản lý, mô hình phiên/workspace |
| **Kênh cộng đồng** | Issues + nhiều báo trùng lặp | Issues **+ Discussions** (duy nhất) | Issues | Issues | Issues | Issues + Show&Tell | Issues |
| **Tốc độ phát hành** | Bản vá hàng tuần (ưu tiên bảo mật) | Ổn định nhanh + alpha cuốn chiếu | Kênh nightly | Nhịp vá nhanh (**yêu cầu kênh ổn định #5203**) | Cập nhật runtime/bảo mật | Chậm hơn, cổng chất lượng | Nightly + tự động hóa được quản lý |
| **Thế đứng đặc trưng** | Sự soi xét bảo mật cao nhất; backlog cổng phát hành mod API | Đặt nền móng cho liên tục xuyên thiết bị (API fork) | Mô hình subagent như kiến trúc hạng nhất | Đa bề mặt (CLI + ACP + desktop); bị chặn ở doanh nghiệp | Không phụ thuộc nhà cung cấp, khác biệt OpenTUI | Độ sâu hệ sinh thái tiện ích; ngân sách khởi động so với jcode | Runtime đa thuê bao/tự lưu trữ cho triển khai lớn |

**Yếu tố khác biệt chính:**
- **Codex** là công cụ duy nhất vận hành kênh Discussions như một bề mặt cộng đồng hạng nhất — điều này khiến nó có cấu trúc tiếp nhận ý tưởng tính năng tốt hơn (#14067 là một sản phẩm Discussions, không phải Issue).
- **Claude Code** là công cụ duy nhất có quy trình cổng phát hành mod-API công khai

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nóng cộng đồng Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Báo cáo điểm nổi bật cộng đồng
*Ảnh chụp dữ liệu: 2026-10-23 · Nguồn: github.com/anthropics/skills*

---

## 1. Bảng xếp hạng Skills hàng đầu

Kho lưu trữ không hiển thị số lượng bình luận trên PR (tất cả đều là `undefined`); bảng xếp hạng dưới đây phản ánh mức độ chú ý của cộng đồng thông qua liên kết Issue, hoạt động chỉnh sửa và mức độ phụ thuộc vào các skill cốt lõi.

| # | Skill / PR | Chức năng | Điểm nổi bật trong thảo luận | Trạng thái |
|---|---|---|---|---|
| 1 | **mcp-builder** — sửa `streamable_http_client` & custom headers ([#1742](https://github.com/anthropics/skills/pull/1742)) | Sửa scaffolding MCP server cho `mcp>=2.0.0`, nơi API HTTP client đã được đổi tên/tái cấu trúc | Gắn với Issue [#1390](https://github.com/anthropics/skills/issues/1390) — harness đánh giá âm thầm cho điểm 0/N với MCP server thật. Hai bản sửa độc lập nhắm vào cùng một skill, cho thấy nó đang hỏng trong môi trường production | OPEN (cập nhật 2026-10-08) |
| 2 | **skill-creator** — cô lập trigger eval + sửa lỗi Windows ([#1298](https://github.com/anthropics/skills/pull/1298)) | Sửa lỗi chấm điểm trigger bị miss sai, lỗi Windows `select()` trên pipe, và xử lý lỗi runtime trong eval harness | Một trong nhiều bản sửa cạnh tranh: [#1681](https://github.com/anthropics/skills/pull/1681) (chạy độc lập), [#1997](https://github.com/anthropics/skills/pull/1997) (phân tích YAML). Được xác nhận bởi các Issue [#556](https://github.com/anthropics/skills/issues/556), [#1383](https://github.com/anthropics/skills/issues/1383), [#1394](https://github.com/anthropics/skills/issues/1394) — meta-skill dùng để tạo mọi skill khác lại là cái mong manh nhất | OPEN (cập nhật 2026-09-16) |
| 3 | **docx** — timeout LibreOffice & xác minh output ([#1792](https://github.com/anthropics/skills/pull/1792)) | Trả về lỗi thật khi `soffice` timeout; chỉ báo thành công sau khi xác minh các mark `w:ins`/`w:del` đã biến mất | Đi kèm [#1734](https://github.com/anthropics/skills/pull/1734) (bình luận mồ côi) và Issue [#2018](https://github.com/anthropics/skills/issues/2018) (XML không hợp lệ từ `merge_runs.py`). Xử lý tài liệu là nhóm skill được dùng nhiều nhất | OPEN (cập nhật 2026-09-25) |
| 4 | **notion-spec-to-implementation** + **quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | Biến spec Notion thành kế hoạch công việc khả thi kèm tiêu chí nghiệm thu; đánh giá CV theo định lượng | Bài gửi hai skill với tương tác bền vững (tháng 6–10). Đại diện cho cầu nối quy trình "spec → thực thi" mà cộng đồng liên tục yêu cầu | OPEN (cập nhật 2026-10-15) |
| 5 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Pipeline Markdown → MP4 chi phí bằng không (slide Marp + lồng tiếng TTS) | Định vị tái sử dụng nội dung như một skill hạng nhất; đáng chú ý vì tuyên bố không tốn chi phí API bên ngoài | OPEN (cập nhật 2026-09-15) |
| 6 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Phân tích tĩnh hợp đồng Solidity/Rust với neo Merkle-proof trên TON | Bài gửi Web3/audit nghiêm túc đầu tiên; làm dấy lên lo ngại về tin cậy namespace, khớp với Issue [#492](https://github.com/anthropics/skills/issues/492) | OPEN (cập nhật 2026-09-16) |
| 7 | **webapp-testing** — sửa bảo mật & tính đúng đắn ([#1980](https://github.com/anthropics/skills/pull/1980), [#1976](https://github.com/anthropics/skills/pull/1976)) | Loại bỏ command injection `shell=True` (CWE-78); sửa báo cáo phần tử textarea/select | Cùng tác giả (gerardrecinto) gửi các bản sửa theo cặp cùng algorithmic-art [#1977](https://github.com/anthropics/skills/pull/1977) — bằng chứng về một nhóm săn bug đang hoạt động | OPEN (cập nhật 2026-10-22) |
| 8 | **pyxel** phát triển game retro ([#525](https://github.com/anthropics/skills/pull/525)) | Tạo/debug/xác minh game Python retro với chạy input headless và kiểm tra frame | PR mở lâu nhất (hơn 8 tháng) vẫn nhận cập nhật — nhu cầu ngách nhưng bền bỉ cho quy trình xác minh phát triển game | OPEN (cập nhật 2026-09-22) |

---

## 2. Xu hướng nhu cầu cộng đồng

Đúc kết từ 15 Issue có nhiều bình luận nhất:

1. **Tin cậy & quản trị namespace** — Issue [#492](https://github.com/anthropics/skills/issues/492) (46 bình luận, issue hàng đầu): skill cộng đồng phát hành dưới namespace `anthropic/` mạo danh skill chính thức, cho phép leo thang quyền.
2. **Phân phối skill cho team/tổ chức** — Issue [#228](https://github.com/anthropics/skills/issues/228) (17 bình luận, 8 👍): người dùng muốn thư viện skill chia sẻ toàn tổ chức thay vì gửi file `.skill` thủ công qua Slack/Teams.
3. **Độ tin cậy của đánh giá & trigger** — Issue [#556](https://github.com/anthropics/skills/issues/556) (13 bình luận), [#1383](https://github.com/anthropics/skills/issues/1383), [#1394](https://github.com/anthropics/skills/issues/1394): `run_eval.py` báo tỷ lệ trigger 0%; lỗi benchmark diễn ra âm thầm. Nhu cầu về công cụ QA skill đáng tin cậy.
4. **Hiệu quả context/token** — Issue [#1487](https://github.com/anthropics/skills/issues/1487) (`claude-api` bơm ~156k token trong một lần gọi), [#202](https://github.com/anthropics/skills/issues/202) (`skill-creator` quá dài dòng): skill phải là hướng dẫn vận hành, không phải tài liệu.
5. **Bộ nhớ & trạng thái agent tầm xa** — Issue [#1329](https://github.com/anthropics/skills/issues/1329): `compact-memory` dùng ký hiệu tượng trưng cho trạng thái agent bền vững.
6. **Cổng kiểm soát chất lượng output** — Issue [#1385](https://github.com/anthropics/skills/issues/1385) (cổng chất lượng suy luận), [#412](https://github.com/anthropics/skills/issues/412) (quản trị agent): hiệu chỉnh trước tác vụ, đánh giá đối kháng, xác minh bàn giao.
7. **Tính đúng đắn của đóng gói** — Issue [#189](https://github.com/anthropics/skills/issues/189) (9 👍): `document-skills` và `example-skills` cài nội dung giống hệt nhau, trùng lặp context.

**Hướng skill đang nổi lên:** audit bảo mật, phân tích Web3/hợp đồng, QC typography tài liệu ([#514](https://github.com/anthropics/skills/pull/514)), vận hành HPC/Slurm ([#1615](https://github.com/anthropics/skills/pull/1615)), hỗ trợ ODT/ODF ([#486](https://github.com/anthropics/skills/pull/486)).

---

## 3. Skill đang chờ xử lý có tiềm năng cao

Các PR đang hoạt động với cập nhật gần đây và đường merge rõ ràng:

- **[#1997](https://github.com/anthropics/skills/pull/1997) — phân tích YAML frontmatter của skill-creator** (cập nhật 2026-10-19): Sửa lỗi xóa dấu ngoặc/dòng tiếp nối làm hỏng metadata mô tả. Nhỏ, phạm vi rõ, ảnh hưởng rộng.
- **[#1980](https://github.com/anthropics/skills/pull/1980) — loại bỏ `shell=True` trong webapp-testing** (cập nhật 2026-10-22): Bản sửa bảo mật (CWE-78); PR được chạm gần đây nhất trong nhóm.
- **[#1977](https://github.com/anthropics/skills/pull/1977) & [#1976](https://github.com/anthropics/skills/pull/1976) — sửa algorithmic-art + phát hiện phần tử** (cập nhật 2026-10-18): Hai bản sửa logic hai dòng, đều tham chiếu Issue đã đóng (#1897, #1891), gánh nặng review thấp.
- **[#1730](https://github.com/anthropics/skills/pull/1730) — thay URL chết trong claude-api** (cập nhật 2026-10-04): Sửa 3 URL, xác minh HTTP 200 qua `curl`. Merge dễ dàng.
- **[#1245](https://github.com/anthropics/skills/pull/1245) — Notion spec + resume auditor** (cập nhật 2026-10-15): Chạy dài nhưng vẫn hoạt động; bài gửi hai skill với SKILL.md được trau chuốt.
- **[#1742](https://github.com/anthropics/skills/pull/1742) — `streamable_http_client` của mcp-builder** (cập nhật 2026-10-08): Sửa thay đổi API gây vỡ; nhiều khả năng sẽ được merge khi maintainer chọn một trong các bản vá mcp-builder cạnh tranh.

---

## 4. Góc nhìn hệ sinh thái Skills

> **Nhu cầu tập trung nhất của cộng đồng không phải là skill mới mà là một chuỗi cung ứng skill đáng tin cậy, an toàn và tiết kiệm context — eval đáng tin, toàn vẹn namespace, và file SKILL.md gọn nhẹ — vì các meta-skill (`skill-creator`, `mcp-builder`) cùng lớp đóng gói/tin cậy bên dưới mọi skill hiện là những mắt xích yếu nhất của hệ thống.**

---
*Lưu ý: Số 👍 trên PR được báo là 0 hoặc không có trong toàn bộ tập dữ liệu; xếp hạng được cân theo tham chiếu chéo Issue, độ mới cập nhật, và cụm nhiều PR trên cùng một skill.*

---

# Claude Code Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Claude Code đã phát hành **v2.1.309**, một bản vá tăng cường bảo mật nhằm vá các lỗ hổng thoát sandbox trên macOS và Linux (các file khởi động shell chạy bên ngoài sandbox, và việc bỏ qua glob `denyWrite` thông qua symlink). Trong khi đó, sự chú ý của cộng đồng đang đổ dồn vào một nhóm **lỗi hồi quy của tab Code trên desktop từ bản cập nhật 2.37337.1 (2026-10-13)** — chỉ số sử dụng context-window đã biến mất khỏi vòng tròn/popover hiển thị mức sử dụng, và hộp "next-step" mới đang gây ra cả phàn nàn về UX lẫn lỗi phân bổ chi phí. Mục được upvote nhiều nhất vẫn là yêu cầu đa tài khoản Connector đã tồn tại từ lâu (#27302, 278 bình luận, 424 👍), vẫn chưa được giải quyết sau tám tháng.

## 2. Phát hành

**v2.1.309** (phát hành trong 24h qua) — bản phát hành bảo mật/sửa lỗi:

- **Sửa lỗi sandbox (macOS + Linux):** các file khởi động shell (`.bashrc`, `.zshrc`, v.v.) đang bị thực thi *bên ngoài* sandbox trước mỗi lệnh Bash — đây là một lỗ hổng thoát thực sự khi chạy các cấu hình dự án không đáng tin cậy. Nay đã được sandbox đúng cách.
- **Sửa `denyWrite` trên macOS:** các mẫu glob không được áp dụng tại vị trí thực của đường dẫn khi thư mục của mẫu được truy cập qua symlink. Việc duyệt symlink không còn bỏ qua lệnh cấm ghi.
- (Ghi chú phát hành bị cắt trong dữ liệu nguồn — có khả năng còn các biện pháp tăng cường sandbox khác.)

Nếu bạn chạy Claude Code với các repository không đáng tin cậy hoặc dùng chính sách `denyWrite` phụ thuộc vào đường dẫn symlink, **hãy nâng cấp ngay**.

## 3. Issue nổi bật

1. **[#27302](https://github.com/anthropics/claude-code/issues/27302) — Hỗ trợ nhiều tài khoản Connector (278 bình luận, 424 👍)** — Vị trí số 1 muôn thuở. Người dùng cần *cùng một* connector gắn với *các tài khoản khác nhau* (Google công việc vs. cá nhân, nhiều tổ chức GitHub) trên cả Claude web lẫn Claude Code. Đã tám tháng, 424 upvote, không có tiến triển. Đây là tín hiệu rõ nhất cho thấy xác thực connector là lỗ hổng kiến trúc lớn nhất.

2. **[#56281](https://github.com/anthropics/claude-code/issues/56281) — Không thể nâng cấp Max 5x → Max 20x, thanh toán thất bại, hỗ trợ không phản hồi (36 bình luận)** — Được gắn nhãn `invalid` nhưng có 36 bình luận của người dùng phản ánh cùng một lỗi. Các luồng thanh toán đi vào ngõ cụt mà không có đường hỗ trợ gây tổn hại danh tiếng không tương xứng.

3. **[#79305](https://github.com/anthropics/claude-code/issues/79305) — Desktop: theme tùy chỉnh / màu nhấn (23 bình luận, 71 👍)** — "Mọi chế độ tối đều trông giống hệt nhau" là một vấn đề UX thực sự với người dùng chạy nhiều màn hình. Yêu cầu có tính năng tương đương với hệ thống theme của CLI.

4. **[#102132](https://github.com/anthropics/claude-code/issues/102132) — Tab Code trên Desktop: công cụ `wrap_up` có thể kết thúc lượt trước khi phản hồi được viết (20 bình luận)** — Đây là lỗi đúng/sai, không phải vấn đề hình thức: hộp next-step mới chạy đua với phản hồi thực tế của mô hình. 27 👍.

5. **[#102273](https://github.com/anthropics/claude-code/issues/102273) — Hộp next-step với các nút trả lời cản trở việc thảo luận (19 bình luận, 45 👍)** — Quan điểm đối lập với #102132: ngay cả khi nó hoạt động, người dùng vẫn thấy hộp này xâm phạm. Ra mắt một tính năng và yêu cầu gỡ bỏ nó trong cùng hai tuần là dấu hiệu bất ổn trong quy trình thiết kế.

6. **[#95364](https://github.com/anthropics/claude-code/issues/95364) — macOS "cập nhật ngầm" thoát/khởi động lại ứng dụng khi người dùng vắng mặt, làm mất các phiên Remote Control (12 bình luận)** — Tự động cập nhật ngầm phá hủy trạng thái đúng là kiểu vấn đề làm xói mòn niềm tin vào cập nhật nền. Xem thêm #95491 và #100114 (cùng loại, biến thể trên Windows và sau khi khởi động lại) — **đây đã là một nhóm ít nhất ba issue**.

7. **[#52420](https://github.com/anthropics/claude-code/issues/52420) — Có thể cấu hình động từ cho dòng hoàn thành sau lượt (12 bình luận, 30 👍)** — Nhỏ, phạm vi rõ ràng, đã sáu tháng. Người dùng muốn kiểm soát trong `settings.json` đối với các động từ ngẫu nhiên luân phiên; báo cáo chỉ ra đúng rằng `spinnerVerbs` là hook sai (hiện tại vs. quá khứ).

8. **[#102095](https://github.com/anthropics/claude-code/issues/102095) — Mức effort giờ cần 3 cú click thay vì 1 (10 bình luận)** — Số học hồi quy cụ thể: 50 lần đổi effort/ngày = thêm 100 cú click. Một điều khiển tần suất cao bị chôn sâu thêm một cấp là hồi quy kinh điển.

9. **[#76353](https://github.com/anthropics/claude-code/issues/76353) — Công cụ Bash để rò rỉ tiến trình con mồ côi khi hết thời gian chờ trên Windows** — Giết `bash.exe` nhưng không giết các tiến trình con của nó nghĩa là một lệnh `find /` hết thời gian chờ vẫn tiếp tục quét hàng giờ. Không có 👍 nhưng sáu bình luận xác nhận — một lỗi cạn kiệt tài nguyên âm thầm trên Windows.

10. **[#73069](https://github.com/anthropics/claude-code/issues/73069) — CSP của webview VSCode chặn font codicon (ô tofu trong gutter của diff)** — Người báo cáo đã tìm ra nguyên nhân gốc: `font-src` thiếu `data:`, nên mọi biểu tượng gutter hiển thị thành ô ký tự thiếu. Một bản sửa một dòng bị treo từ tháng Bảy.

*Đáng chú ý thêm:* [#104474](https://github.com/anthropics/claude-code/issues/104474) (Fable 5.1 đốt ngân sách vào các lệnh shell thất bại — mới, nộp hôm nay), [#103018](https://github.com/anthropics/claude-code/issues/103018) (các công cụ tích hợp `ccd_turn` tính vào giới hạn gói), [#97936](https://github.com/anthropics/claude-code/issues/97936) (lệnh skills/plugin thiếu trong tự động hoàn thành `/` — với lịch sử đóng-vì-cũ đã được ghi nhận).

## 4. Tiến triển PR chính

Tất cả bảy PR được cập nhật trong 24h qua đều **ĐÃ ĐÓNG**, tất cả từ một người đóng góp duy nhất (`poteat`), và tất cả dường như là cùng một chuỗi cơ sở hạ tầng mod/bảo mật — một số ghi chú rõ rằng chúng đỏ-do-cấu-trúc chờ bản phát hành engine. Không có công việc mới nào được merge hôm nay; đây có vẻ là một đợt dọn dẹp hàng loạt.

1. **[#99137](https://github.com/anthropics/claude-code/pull/99137) — sec-default: plugin người dùng có thể siết chặt, không bao giờ nới lỏng, chính sách tổ chức** — Ở nơi `sec-default` được đặt, plugin của người dùng không còn có thể gỡ bỏ quy tắc từ chối/hỏi hoặc thay đổi biến đã ghim. Ngữ nghĩa ranh giới đặc quyền cốt lõi.
2. **[#99540](https://github.com/anthropics/claude-code/pull/99540) — sec-default: giới hạn công cụ của tổ chức vẫn giữ trên plugin do người dùng tự cài** — Mở rộng yêu cầu phê duyệt của tổ chức đối với công cụ connector sang plugin tự cài đặt cá nhân.
3. **[#97688](https://github.com/anthropics/claude-code/pull/97688) — sec-default: bộ thu thập ghi tiếp tục vượt qua tầng người dùng** — Plugin người dùng không còn có thể bỏ hoặc viết lại các bản ghi telemetry hướng đến bộ thu thập của tổ chức.
4. **[#97334](https://github.com/anthropics/claude-code/pull/97334) — sec-default: hàng hội thoại tiếp tục vượt qua tầng người dùng** — Cùng nguyên tắc phân tầng áp dụng cho `session.append`. Được gated rõ ràng dựa trên hỗ trợ engine.
5. **[#97293](https://github.com/anthropics/claude-code/pull/97293) — mods: khai báo cho cờ cắt `process.run` và `mtimeMs` của `fs.list`** — Bề mặt API có kiểu cho việc cắt stdout/stderr và mtime của file; giữ lại cho đến khi CLI phát hành thực sự mang các trường này.
6. **[#99118](https://github.com/anthropics/claude-code/pull/99118) — diff: toast hiển thị trong khi ngăn /diff mở** — Trước đây `/diff` dùng `holdToasts: true`, chặn *tất cả* thông báo của các plugin khác.
7. **[#99141](https://github.com/anthropics/claude-code/pull/99141) — diff: ngăn được giữ lại cho đến khi có thứ gì đó có thể vẽ nó** — Sửa lỗi `/diff` mở trước khi một host render đính kèm; xếp chồng trên #99118.

**Lưu ý cho maintainer:** cả một chuỗi ranh giới bảo mật đóng cùng ngày, với nhiều PR được đánh dấu là không thể merge cho đến khi engine phát hành, gợi ý rằng quy trình gating phát hành của API mod đang tạo ra tồn đọng. Đáng theo dõi liệu chúng có được đưa trở lại không.

## 5. Thảo luận nổi bật

Không có dữ liệu Discussions trong bộ dữ liệu này. Mục này được lược bỏ.

## 6. Xu hướng yêu cầu tính năng

Chắt lọc từ tất cả các Issue ở trên:

- **Đa dạng connector/tài khoản** (#27302) — yêu cầu chiếm ưu thế với khoảng cách lớn: nhiều tài khoản cho mỗi connector, trên cả web và Desktop/Code.
- **Theme cho Desktop** (#79305) — theme tùy chỉnh/màu nhấn, tương đương với CLI.
- **Bề mặt telemetry sử dụng/context hoạt động được trên Desktop** — một nhóm đáng chú ý: [#102094](https://github.com/anthropics/claude-code/issues/102094) (đã đóng), [#102103](https://github.com/anthropics/claude-code/issues/102103), [#102176](https://github.com/anthropics/claude-code/issues/102176), [#102133](https://github.com/anthropics/claude-code/issues/102133), [#102615](https://github.com/anthropics/claude-code/issues/102615), [#102623](https://github.com/anthropics/claude-code/issues/102623), [#103885](https://github.com/anthropics/claude-code/issues/103885), [#103918](https://github.com/anthropics/claude-code/issues/103918) (đã đóng), [#104471](https://github.com/anthropics/claude-code/issues/104471). Người dùng muốn mức sử dụng context-window, thời gian đã trôi qua, và số lượng token — một số được nộp như bug, một số như tính năng, vì ứng dụng bị hồi quy và các cửa sổ gói đã thay thế chúng.
- **Tùy chỉnh hình thức CLI có thể cấu hình** (#52420) — đưa động từ dòng hoàn thành vào `settings.json`.
- **Kiểm soát bố cục Desktop** (#102233) — bảng thông tin phiên có thể ẩn cho chế độ xem chia đôi.
- **Khả năng khám phá lệnh skills/plugin** (#97936) — tự động hoàn thành `/` nên lập chỉ mục `~/.claude/skills` và các lệnh plugin.

## 7. Điểm đau của nhà phát triển

1. **Cập nhật/khởi động lại Desktop phá hủy trạng thái phiên.** Một nhóm ba issue (#95364, #95491, #100114) mô tả cùng một kiểu thất bại: cập nhật tự động ngầm thoát và khởi động lại ứng dụng khi người dùng vắng mặt, giết các phiên Remote Control và lưu trữ chúng trên mobile. Cập nhật ngầm làm mất công việc là một mô thức phá vỡ niềm tin.
2. **Bản cập nhật desktop 2026-10-13 (2.37337.1) gây hồi quy khả năng hiển thị context trên toàn bộ.** Ít nhất chín issue trải rộng cả nhãn "bug" lẫn "enhancement" đều bắt nguồn từ cùng bản cập nhật đã xóa dòng context-window khỏi vòng tròn/popover hiển thị mức sử dụng. Khối lượng các báo cáo trùng lặp (hai đã đóng) cho thấy người dùng không có issue chính thức nào để tập hợp quanh nó.
3. **Hộp next-step là âm với nhiều người dùng.** #102132 (kết thúc lượt trước khi phản hồi được viết), #102273 (cản trở), #102342 (các nút vẫn có thể click và xếp hàng tin nhắn trùng lặp), #103018 (công cụ `ccd_turn` tính vào giới hạn gói và không được quy kết trong `/usage`). Bốn kiểu thất bại độc lập cho một tính năng mới.
4. **Các hồi quy UX ma s

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Bản phát hành `rust-v0.164.0` giới thiệu **các slot lệnh slash `/presets`** và **đối số inline cho `/model` và `/permissions`**, giúp đơn giản hóa đáng kể các quy trình làm việc trên TUI. Trong khi đó, một loạt lớn các PR từ `copyberry[bot]` đã được merge, tập trung vào **tải cấu hình được quản lý, hook theo phạm vi môi trường, và độ trung thực của rollout trace** — dấu hiệu của công việc đang diễn ra tích cực ở lớp hạ tầng doanh nghiệp/agent. Lượng issue vẫn ở mức cao xoay quanh **độ ổn định của Windows desktop (renderer crash, phình bộ nhớ, lỗi sandbox/env)** và **lỗi rate-limit/`at capacity`**, ảnh hưởng đến cả người dùng CLI lẫn desktop.

---

## 2. Bản phát hành

**`rust-v0.164.0`** (stable) — [#54380, #54381, #54378, #54383]
- **Các slot `/presets` được đánh số** để lưu prompt và lệnh slash có thể tái sử dụng, kèm menu bàn phím để gọi lại nhanh.
- **Đối số inline cho `/model` và `/permissions`**, cho phép người dùng thiết lập model, reasoning effort, speed và permission profile mà không cần mở menu.

**Kênh Alpha:** `rust-v0.164.0-alpha.12`, `rust-v0.164.0-alpha.11.1`, `rust-v0.163.0-alpha.11.2` — các bản alpha cuốn chiếu thông thường, không có tính năng đáng chú ý nào được nêu. Bản stable với hai tính năng UX ở trên là điểm nhấn chính.

---

## 3. Issue nổi bật

1. **[#54841](https://github.com/openai/codex/issues/54841)** — *Work mode chặn gửi tin nhắn ở chế độ BYOK khi bật công cụ trình duyệt/máy tính cục bộ.* 37 bình luận, 27 👍. **Tại sao quan trọng:** BYOK + Work mode là cấu hình thuộc gói trả phí; việc chặn gửi tin nhắn thực chất làm tê liệt quy trình làm việc. Đây là issue có lượng tương tác cao nhất trong ngày và rõ ràng là ưu tiên sửa hàng đầu.

2. **[#48938](https://github.com/openai/codex/issues/48938)** — *Windows: renderer crash liên tục, reload màn hình trắng, độ trễ nhập liệu nghiêm trọng sau khi cập nhật (26.924.x).* 26 bình luận. **Tại sao quan trọng:** Một người dùng Pro 20x trả phí báo cáo công việc bị gián đoạn và tốn kém chi phí. Đây là triệu chứng của tình trạng bất ổn Windows desktop rộng hơn (xem #51649, #42484).

3. **[#50329](https://github.com/openai/codex/issues/50329)** — *Windows App `read_thread` chỉ trả về `chatgpt-content-reference` cho các phản hồi ChatGPT đã hoàn thành.* 23 bình luận, 5 👍. **Tại sao quan trọng:** Phá vỡ khả năng khôi phục app-server/thread cho người tiêu dùng API; có thể tái hiện qua bằng chứng đường dẫn package.

4. **[#31925](https://github.com/openai/codex/issues/31925)** — *Khôi phục Option+Space Quick Chat trên macOS sau khi hợp nhất ứng dụng ChatGPT/Codex.* 18 bình luận, **42 👍**. **Tại sao quan trọng:** Tỷ lệ 👍 trên bình luận cao nhất ở đây; một regression do hợp nhất đối với phím tắt macOS được yêu thích. Tồn tại lâu (từ tháng 7), vẫn chưa được giải quyết.

5. **[#51649](https://github.com/openai/codex/issues/51649)** — *Windows: các batch tiến trình MCP/CUA/node_repl lặp lại → 200 Node helper, ~11,6 GB bộ nhớ private.* 18 bình luận. **Tại sao quan trọng:** Mô hình rò rỉ tài nguyên lặp lại #42484 (vòng lặp cua_node EPERM, ~59 GB). Chỉ ra vấn đề quản lý vòng đời mang tính hệ thống trong stack helper của Windows desktop.

6. **[#51667](https://github.com/openai/codex/issues/51667)** — *macOS VM: tin nhắn Codex bị chặn sau khi cập nhật lên 26.1002.52244* (tag auth/safety-check). 15 bình luận. **Tại sao quan trọng:** Hành vi "safety-check" chặn trên VM rất khó để người dùng lý giải; làm xói mòn niềm tin vào độ tin cậy của các bản cập nhật.

7. **[#55783](https://github.com/openai/codex/issues/55783)** — *macOS: Dot bị thiếu khỏi sidebar ChatGPT desktop trong khi Dot trên web vẫn hoạt động.* 13 bình luận, 7 👍. **Tại sao quan trọng:** Regression tích hợp đa nền tảng; người dùng ngày càng dựa vào Dot như một bề mặt trợ lý hạng nhất.

8. **[#51088](https://github.com/openai/codex/issues/51088)** — *Hạn mức Codex cạn kiệt bất thường nhanh ngay cả với prompt đã cache tầm thường.* 6 bình luận, 2 👍. **Tại sao quan trọng:** Liên quan đến thanh toán, mức độ nghiêm trọng cao. Tái hiện trên nhiều model và repo; người dùng không tin tưởng vào việc tính toán mức sử dụng của họ. Trùng lặp với #56328 và #55746 ("Selected model is at capacity").

9. **[#56264](https://github.com/openai/codex/issues/56264)** — *Windows desktop: khôi phục thread thất bại vì MXC launcher nhận `process.env` không có `SYSTEMROOT`.* 6 bình luận. **Tại sao quan trọng:** Một bug rõ ràng, có thể hành động (việc lọc env phá vỡ sandbox helper) — ứng viên mạnh cho bản sửa nhanh; giá trị người dùng cao trên mỗi đơn vị công sức.

10. **[#32586](https://github.com/openai/codex/issues/32586)** — *Tự động đổi các banked reset chưa dùng trước khi hết hạn.* 7 bình luận, 6 👍. **Tại sao quan trọng:** Cải tiến có giá trị tiền tệ thực sự; một chút công việc UX sẽ loại bỏ một phiền toái rõ ràng.

*Cũng đáng theo dõi:* #39767 (reasoning GPT-5.6 bị đếm hai lần → auto-compaction quá sớm), #56282 (Codex Cloud tuyên bố hoàn thành công việc PR mà không có PR nào được publish — mối lo về tính đúng đắn/an toàn cho các lần chạy không giám sát), #56352/#55702 (trạng thái Daybreak mode bị chính agent báo cáo sai — tính minh bạch hành vi model).

---

## 4. Tiến triển PR chính

Hầu hết PR hôm nay đến từ `copyberry[bot]` và đã CLOSED sau khi merge. Điểm nổi bật:

1. **[#56351](https://github.com/openai/codex/pull/56351)** — *Thêm attached thread fork thử nghiệm.* Bổ sung `attachToSource` vào `thread/fork`, lưu trữ một fork gắn với nguồn của nó mà không phát ra `thread/started`. Nền tảng cho các quy trình phân nhánh hội thoại.

2. **[#56343](https://github.com/openai/codex/pull/56343)** — *Chạy hook môi trường trên executor sở hữu chúng.* Hook giờ đây chạy với shell, thư mục làm việc và chính sách mạng được quản lý của từng owner — đóng một lỗ hổng sandbox/security trong các thiết lập đa môi trường.

3. **[#56342](https://github.com/openai/codex/pull/56342)** — *Khớp nội dung ảnh rollout trace qua các snapshot request.* Sửa lỗi tái sử dụng call-ID trên các đầu ra ảnh được phát lại bằng cách hash JSON chuẩn tắc cho các phần nội dung phi văn bản.

4. **[#56330](https://github.com/openai/codex/pull/56330)** — *Khiến agent-message wake tôn trọng interrupt và Plan mode.* Ngăn một wake đã đặt bắt đầu sau interrupt hoặc sau khi chuyển sang Plan mode — giảm race trong các luồng tự động.

5. **[#56314](https://github.com/openai/codex/pull/56314)** — *Thêm managed configuration loader cho config server tùy chỉnh.* Giới thiệu đường dẫn config-server (`<base_url>/codex/config/bundle`) không có redirect hay request logging — yếu tố hỗ trợ cấu hình doanh nghiệp.

6. **[#56313](https://github.com/openai/codex/pull/56313)** — *Áp dụng model catalog override cho history, notes và context tool.* Mô tả/schema của tool cho `history`, `notes`, `new_context`, `get_context_remaining` giờ đây lấy từ catalog của model đang hành động — đòn bẩy lớn hơn cho việc tinh chỉnh theo từng model.

7. **[#56312](https://github.com/openai/codex/pull/56312)** — *Theo dõi conversation history được chấp nhận trong rollout trace.* Phân biệt item phản hồi được chấp nhận so với bị loại bỏ — cải thiện độ chính xác của trace replay.

8. **[#56309](https://github.com/openai/codex/pull/56309)** — *Hỗ trợ cách diễn đạt writable-root permission theo từng model.* Template `writable_root`/`writable_roots` với thay thế `{{ roots }}` — bản địa hóa + thông điệp theo từng model.

9. **[#56304](https://github.com/openai/codex/pull/56304) + [#56302](https://github.com/openai/codex/pull/56302)** — *Managed hook theo phạm vi môi trường (khám phá + gắn kết).* Thêm `environment_hooks` vào `EnvironmentConfig`; hook thực thi trên môi trường sở hữu. Kết hợp với #56343, đây là một đợt đẩy phối hợp về cô lập hook.

10. **[#56295](https://github.com/openai/codex/pull/56295)** — *Tách việc tải managed configuration khỏi xác thực ChatGPT.* Giới thiệu interface `BundleSource`; chuyển tính đủ điều kiện gói và khôi phục credential vào `ChatGptSource`. Đơn giản hóa các đường dẫn xác thực phi ChatGPT trong tương lai.

*Cũng đáng chú ý:* [#24663](https://github.com/openai/codex/pull/24663) — tuần tự hóa việc làm mới managed ChatGPT token giữa các tiến trình chia sẻ `CODEX_HOME` (liên quan đến sự không ổn định xác thực đa tiến trình), và [#56286](https://github.com/openai/codex/pull/56286) — nâng `@modelcontextprotocol/sdk` lên `1.32.0`.

---

## 5. Thảo luận nổi bật

### Ý tưởng
- **[#14067](https://github.com/openai/codex/discussions/14067)** — *Đồng bộ thread/ngữ cảnh session Codex giữa các thiết bị.* **13 bình luận, 69 👍** — mục thảo luận được upvote nhiều nhất. Nhu cầu mạnh mẽ, rõ ràng về tính liên tục đa thiết bị.
- **[#56158](https://github.com/openai/codex/discussions/56158)** — *Mang lại nút worktree.* Phàn nàn về regression UI; thắng lợi UX nhanh nếu được xử lý.
- **[#2251](https://github.com/openai/codex/discussions/2251)** — *Codex Usage Limits* (59 bình luận, 57 👍). Chủ đề thường niên; sự nhầm lẫn tiếp diễn về giới hạn gói Plus so với giới hạn riêng của Codex.
- **[#47211](https://github.com/openai/codex/discussions/47211)** — *Dịch vụ phát triển ứng dụng marketplace ô tô (USA).* Gần như spam; bỏ qua.

### Hỏi & Đáp
- **[#56069](https://github.com/openai/codex/discussions/56069)** — *Hỗ trợ PiP trên macOS cho MCP App UI?* Các dev xây dựng MCP App cục bộ cần tài liệu về các tùy chọn trình bày.
- **[#56208](https://github.com/openai/codex/discussions/56208)** — *Thu thập tệp không giám sát trên Chrome — thiết lập được hỗ trợ?* Trở ngại `ERR_BLOCKED_BY_CLIENT` trong các luồng đã xác thực.
- **[#55792](https://github.com/openai/codex/discussions/55792)** — *Windows desktop: đường dẫn review được hỗ trợ khi `/approve` không khả dụng?* Người dùng muốn một đường dẫn khiếu nại có thể kiểm toán mà không cần workaround.

### Show and tell
- **[#56176](https://github.com/openai/codex/discussions/56176)** — *Agent Relay Check v0.1.1* — một kiểm tra trước/sau có thể lặp lại rằng một session mới thực sự nhận được `AGENTS.md`. Công cụ thực dụng cho một lỗ hổng niềm tin thực sự.
- **[#56181](https://github.com/openai/codex/discussions/56181)** — *pytest-codex* — biến các quy tắc `AGENTS.md` thành kiểm tra pytest với replay offline. Ý tưởng thanh lịch; biến chính sách thành hành vi có thể kiểm thử.
- **[#56337](https://github.com/openai/codex/discussions/56337)** — *Off the Wall* — gợi lại các chỉnh sửa trong quá khứ trước khi agent trả lời. Giải quyết nỗi đau được cảm nhận rộng rãi (lặp lại cùng một chỉnh sửa).
- **[#56215](https://github.com/openai/codex/discussions/56215) + [#55901](https://github.com/openai/codex/discussions/55901)** — nghiên cứu điển hình GFT-Merge / GFT Map về **bàn giao giữa các công cụ/agent**. Cách đặt vấn đề "handoff có thành công không?" là một lăng kính hữu ích để đánh giá quy trình đa agent.
- **[#54813](https://github.com/openai/codex/discussions/54813)** — *Octuo* — giao một mục tiêu cho Codex và nhận kết quả, tách người dùng khỏi vai trò người đưa tin.
- **[#56157](https://github.com/openai/codex/discussions/56157)** — *LinDesk trên Android* —

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Hoạt động hôm nay xoay quanh công việc cải thiện độ tin cậy của agent: một lỗi P1 ở subagent (#22323) báo cáo rằng việc cạn kiệt MAX_TURNS bị báo nhầm thành thành công `GOAL`, trong khi nhiều bản sửa P1/P2 được đưa vào các PR liên quan đến trạng thái workspace khi resume chat, tính nguyên tử của credential-store, và timeout khám phá MCP tool. Bản nightly `v0.67.0-nightly.20261023.ga713410ab` đã phát hành với các sửa lỗi bảo toàn metadata token usage và thought signature trên các lượt gọi hàm. Sự chú ý của cộng đồng vẫn tập trung vào khả năng quan sát subagent, tình trạng treo của browser/agent, và công cụ codebase nhận biết AST.

## 2. Bản phát hành

**v0.67.0-nightly.20261023.ga713410ab** ([PR #29887](https://github.com/google-gemini/gemini-cli/pull/29887))
- `fix(a2a-server,core)`: bảo toàn metadata token usage mở rộng và đồng bộ báo cáo theo từng lượt ([PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834))
- `fix(core)`: đảm bảo mọi lượt model có gọi hàm đều nhận được thought signature

## 3. Issue nổi bật

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent MAX_TURNS bị báo thành công như GOAL (P1, 13 bình luận)** — Subagent `codebase_investigator` báo thành công sau khi chạm giới hạn lượt mà không phân tích gì cả. Đây là issue được bình luận nhiều nhất hôm nay và đánh trực tiếp vào cốt lõi niềm tin vào agent: người dùng không thể phân biệt hoàn thành thật với việc bị cắt ngầm. Được gắn thẻ `status/need-retesting`.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent treo vô hạn (P1, 8 bình luận, 8 👍)** — Các tác vụ đơn giản như tạo thư mục bị treo vô thời hạn khi được chuyển cho generalist agent; tắt subagent deferral thì tạm khắc phục được. Số lượng 👍 cao cho thấy ảnh hưởng rộng.

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Sandbox OS không phụ thuộc thư viện + định tuyến ý định sau thực thi (P2, 9 bình luận)** — Đề xuất cho phép Gemini 3 phát huy sở trường bash gốc một cách an toàn. Một hướng kiến trúc quan trọng cho năng lực và bảo mật của agent.

4. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini sử dụng skills và sub-agent chưa đủ (P2)** — Mang tính giai thoại nhưng đáng tin: model bỏ qua custom skills trừ khi được yêu cầu rõ ràng. Liên quan trực tiếp đến giá trị của hệ thống subagent.

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — Đánh giá đọc/tìm kiếm/lập bản đồ file nhận biết AST (P2, EPIC)** — Theo dõi liệu công cụ nhận biết AST có giảm việc đọc sai lệch và nhiễu token không. Xem thêm [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) và [#22747](https://github.com/google-gemini/gemini-cli/issues/22747).

6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent thất bại trên Wayland (P1)** — Browser agent báo kết thúc `GOAL` dù thất bại; là rào cản trên desktop Linux cho nhánh công việc browser agent.

7. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) — Browser Agent bỏ qua ghi đè trong `settings.json` (P2)** — `AgentRegistry` đọc settings đúng nhưng browser agent lại bỏ qua chúng, kể cả `maxTurns`. Cấu hình âm thầm không có tác dụng làm xói mòn niềm tin người dùng.

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — Lỗi 400 khi có hơn 128 tool (P2)** — Agent nên giới hạn/phạm vi hóa tool thay vì báo lỗi. Càng trở nên cấp thiết khi các MCP server làm số lượng tool tăng lên.

9. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Agent nên hạn chế hành vi phá hoại (P2)** — Báo cáo về việc dùng `git reset` / `--force` khi có lựa chọn an toàn hơn. Liên quan đến an toàn và có thể sẽ tăng ưu tiên.

10. **[#21763](https://github.com/google-gemini/gemini-cli/issues/21763) — Báo cáo `/bug` thiếu ngữ cảnh subagent (P1)** — Báo cáo lỗi chỉ ghi lại phiên chính, làm suy yếu việc phân loại issue subagent. Kết hợp tự nhiên với [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) (khả năng xem quỹ đạo subagent qua `/chat share`).

Cũng đáng chú ý: [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) (file agent dạng symlink không được nhận diện), [#22465](https://github.com/google-gemini/gemini-cli/issues/22465) (treo ở prompt tương tác của Vite), [#18836](https://github.com/google-gemini/gemini-cli/issues/18836) (theo dõi task bền vững dựa trên file thay cho `WriteToDo`).

## 4. Tiến độ PR chính

1. **[#29890](https://github.com/google-gemini/gemini-cli/pull/29890) — Chỉ khôi phục thư mục workspace sau khi resume thành công** — Sửa lỗi rò rỉ trạng thái khi `resumeChat` thất bại để lại thư mục của phiên tồn tại vĩnh viễn trong workspace context (sửa #29864).

2. **[#29859](https://github.com/google-gemini/gemini-cli/pull/29859) — Hiển thị tool call đang thực thi của subagent trong cây task (P2)** — Tool call của subagent hiện biến mất khỏi UI khi đang thực thi; thay đổi này giữ các call ở trạng thái `executing` luôn hiển thị.

3. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765) — Ghi file credential store nguyên tử và tuần tự** — Ngăn mất credential ngầm khi ghi đồng thời và tránh bị khóa do ghi bị gián đoạn. Sửa lỗi độ tin cậy quan trọng cho người dùng `FileKeychain`.

4. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767) — Giới hạn khám phá MCP `tools/list` với timeout mặc định 60 giây (P1)** — Trước đây MCP server không phản hồi làm khám phá bị đình trệ 10 phút (kế thừa từ timeout tool-call trong #14375). Sửa #28355.

5. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762) — Bảo toàn chỉnh sửa trên đĩa khi thay đổi xác thực (P1)** — Ngăn việc ghi settings đè lên các chỉnh sửa được thực hiện sau khi CLI khởi động.

6. **[#29761](https://github.com/google-gemini/gemini-cli/pull/29761) — Ngừng để mẫu `$` làm hỏng prompt template và `{{args}}` (P2)** — Ngữ nghĩa replacement-pattern của `String.replace` (`$&`, `$$`, v.v.) âm thầm làm hỏng nội dung file và hướng dẫn chỉnh sửa.

7. **[#29771](https://github.com/google-gemini/gemini-cli/pull/29771) — Chỉ tự động nhắc khi continuation thật sự rỗng** — Siết lại cơ chế fire-and-forget "empty response" để tránh nhắc nhầm và await đúng cách.

8. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838) — Phân giải đường dẫn tương đối theo workspace root của IDE đang hoạt động (P1)** — Ảnh hưởng đến `WriteFileTool`, `EditTool`, `ReadFileTool`, và `correctPath`; sửa việc ghi nhầm vào project root trong phiên IDE.

9. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880) — Thêm lệnh `gemini models` và cờ `--list-models`** — Khám phá model theo cách lập trình được ở dạng JSON hoặc dễ đọc. Hữu ích cho scripting và CI.

10. **[#29884](https://github.com/google-gemini/gemini-cli/pull/29884) — Tin tưởng đường dẫn hệ thống Termux cho việc phân giải ripgrep** — Sửa `grep_search` trên Android/Termux nơi binary từ `pkg install ripgrep` bị từ chối (sửa #21836).

Đáng chú ý khác: [#29764](https://github.com/google-gemini/gemini-cli/pull/29764) (di trú hook `SubagentStop` của Claude Code), [#29763](https://github.com/google-gemini/gemini-cli/pull/29763) (unhandled rejection trong `scheduleToolCalls`), [#29883](https://github.com/google-gemini/gemini-cli/pull/29883) (độ rộng hiển thị SARA AM tiếng Thái/Lào), [#26686](https://github.com/google-gemini/gemini-cli/pull/26686) (hỗ trợ git submodule khi cài extension).

## 5. Thảo luận nổi bật

Không có dữ liệu Discussions trong tập dữ liệu này, nên phần này được lược bỏ.

## 6. Xu hướng yêu cầu tính năng

1. **Khả năng quan sát và điều khiển subagent** — Gần một nửa số issue hàng đầu liên quan đến hành vi subagent: khả năng xem quỹ đạo ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), ngữ cảnh báo cáo lỗi ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), ghi đè settings ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), khám phá dựa trên symlink ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)), và khám phá qua `settings.json` ([#18285](https://github.com/google-gemini/gemini-cli/issues/18285)).

2. **Hiệu quả token và ngữ cảnh chính xác** — Đọc/tìm kiếm nhận biết AST ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#22747](https://github.com/google-gemini/gemini-cli/issues/22747)) và "Tactful Extraction" ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561)) nhằm giảm mức nền ~36.6k token và tránh đọc tràn lan.

3. **Theo dõi task bền vững dựa trên file** — [#18836](https://github.com/google-gemini/gemini-cli/issues/18836) và [#21000](https://github.com/google-gemini/gemini-cli/issues/21000) thúc đẩy thay `WriteToDo` trong context bằng theo dõi có CRUD để chịu được context rot và ranh giới phiên.

4. **An toàn và sandbox** — Sandbox OS không phụ thuộc thư viện ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)) và hạn chế lệnh git/DB phá hoại ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).

5. **Hỗ trợ nền tảng rộng hơn** — Phân giải ripgrep trên Termux/Android ([#29884](https://github.com/google-gemini/gemini-cli/pull/29884)), browser agent trên Wayland ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), và độ chính xác hiển thị terminal (độ rộng Thái/Lào trong [#29883](https://github.com/google-gemini/gemini-cli/pull/29883)).

## 7. Điểm đau của nhà phát triển

- **Thất bại ngầm và trạng thái gây nhầm lẫn** — Chủ đề lặp lại xuyên suốt [#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21409](https://github.com/google-gemini/gemini-cli/issues/21409), và [#21983](https://github.com/google-gemini/gemini-cli/issues/21983): agent hoặc treo, hoặc báo thành công `GOAL` khi chưa thành công. Đây là nhóm gây tổn hại niềm tin người dùng nhiều nhất.
- **Cấu hình không có tác dụng** — Ghi đè `settings.json` bị browser agent bỏ qua ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) và việc ghi settings đè lên chỉnh sửa trên đĩa ([#29762](https://github.com/google-gemini/gemini-cli/pull/29762)) làm xói mòn niềm tin vào cấu hình.
- **Prompt tương tác phá vỡ tự động hóa** — Prompt tương tác của Vite làm treo CLI ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)); các crash liên quan trên hook output dài ([#22186](https://github.com/google-gemini/gemini-cli/issues/22186)).
- **Ô nhiễm workspace** — Model ghi script tạm vào các thư mục tùy ý ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)), gây khó khăn cho việc commit sạch.
- **Độ tin cậy MCP và credential trong thực tế** — Khám phá đình trệ 10 phút trên MCP server chết ([#29767](https://github.com/google-gemini/gemini-cli/pull/29767)) và nguy cơ mất credential do ghi không nguyên tử ([#29765](https://github.com/google-gemini/gemini-cli/pull/29765)) là kiểu lỗi hạ tầng âm thầm gây hại cho người dùng production.
- **Độ trung thực hiển thị terminal** — Nhấp nháy khi resize ([#21924](https://github.com/google-gemini/gemini-cli/issues/

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Một bản phát hành vá mới (**v1.0.103**) mang đến các sửa lỗi cho độ trung thực của clipboard, xử lý cờ sandbox trong các phiên ACP, và khả năng phục hồi khi kết nối lại. Trong khi đó, trình theo dõi issue chủ yếu xoay quanh **các vấn đề xác thực MCP** trên Windows và chế độ ACP, cùng với **các lỗ hổng về quyền và an toàn mới được phát hiện** khi thư mục tin cậy hoặc agent chạy nền có thể vượt qua các rào chắn dự kiến. Các yêu cầu từ cộng đồng về một **kênh phát hành ổn định** tiếp tục thu hút sự ủng hộ khi nhịp độ phát hành nhanh gây ra các lỗi hồi quy.

## 2. Bản phát hành

### v1.0.103 (2026-10-22)
- Nhấp vào khối mã của phản hồi đã hoàn thành giờ sẽ sao chép mã gốc khi tính năng này được bật.
- Các phiên ACP giờ tuân thủ cài đặt sandbox đã lưu và cờ `--sandbox`/`--no-sandbox`, kể cả khi tiếp tục phiên.
- Phản hồi từ cloud giữ nguyên toàn bộ văn bản khi CLI kết nối lại sau khi mất kết nối.
- Cải thiện trình duyệt Sessions (ghi chú bị cắt ngắn).

🔗 https://github.com/github/copilot-cli/releases

## 3. Issue nổi bật

1. **#5232 — Thư mục tin cậy tự động phê duyệt thực thi shell trong chế độ `manual`** ([link](https://github.com/github/copilot-cli/issues/5232))
   Việc kiểm soát dựa trên đường dẫn không thể suy luận về các tác động phụ — agent đã chạy `powershell.exe -NoProfile` từ một đường dẫn tin cậy mà không có bất kỳ lời nhắc nào. Vấn đề an toàn nghiêm trọng; mới được báo cáo và đã thu hút sự chú ý.

2. **#3013 — Hook không kích hoạt đối với agent chạy nền/tác vụ** ([link](https://github.com/github/copilot-cli/issues/3013)) *(ĐÃ ĐÓNG)*
   Lỗ hổng bảo mật tồn tại lâu nay khi các sub-agent vượt qua việc chặn lệnh dựa trên hook. Việc đóng issue sau sáu tháng cho thấy bản sửa đã được triển khai, nhưng mô hình (agent vượt qua) vẫn là một chủ đề lặp lại.

3. **#5242 — Phiên ngừng xử lý khi theo dõi cấu hình MCP chạm giới hạn inotify (ENOSPC)** ([link](https://github.com/github/copilot-cli/issues/5242))
   `copilot --server` trên các máy chủ chia sẻ từ bỏ hàng đợi phiên sau một lần thử lại. Liên quan đến bất kỳ ai chạy Copilot CLI trong container.

4. **#5233 — MCP OAuth từ xa: token hết hạn được gửi lại thay vì làm mới** ([link](https://github.com/github/copilot-cli/issues/5233))
   Sau khi nhận HTTP 401, client tiếp tục gửi lại cùng token hết hạn mỗi vài giây mà không gọi đến endpoint token.

5. **#5229 — Chế độ ACP bỏ qua refresh token đã lưu cho MCP OAuth** ([link](https://github.com/github/copilot-cli/issues/5229))
   Đi thẳng đến trang ủy quyền trên trình duyệt mặc dù có refresh token hợp lệ. Liên quan đến #5233 — một nhóm các vấn đề xác thực MCP.

6. **#5236 — Bộ nhớ đệm token của Windows Entra broker vẫn là 0 byte sau khi đăng nhập MCP** ([link](https://github.com/github/copilot-cli/issues/5236))
   Mỗi tiến trình mới lại yêu cầu chọn tài khoản; `/restart` chỉ khắc phục được trong cùng tiến trình.

7. **#5234 — CLI trên Windows không dùng được khi máy chủ MCP được cấu hình yêu cầu xác thực** ([link](https://github.com/github/copilot-cli/issues/5234))
   Mã escape thô và thông báo "Please use /login" gây nhầm lẫn cho đến khi máy chủ MCP được xác thực từ bên ngoài. Lỗi hồi quy UX nghiêm trọng trên Windows.

8. **#5133 — `includeCoAuthoredBy: false` bị bỏ qua trong chế độ ACP** ([link](https://github.com/github/copilot-cli/issues/5133))
   Các commit vẫn nhận được dòng `Co-authored-by: Copilot` dưới `--acp`, trong khi `copilot -p` tuân thủ cài đặt này. Lỗi về tính tương thích cấu hình với ảnh hưởng thực tế đến lịch sử repo.

9. **#5197 — Voice server bị segfault trên WSL2 kể từ 1.0.100** ([link](https://github.com/github/copilot-cli/issues/5197))
   `signal 11` khi khởi động khiến `/voice` bị kẹt ở "Fetching voice models." Lỗi hồi quy liên quan đến runtime voice mới trong 1.0.100.

10. **#5203 — Yêu cầu tính năng: kênh phát hành ổn định** ([link](https://github.com/github/copilot-cli/issues/5203))
    Cộng đồng yêu cầu các kênh stable/beta để tránh các lỗi hồi quy làm gián đoạn công việc hàng ngày — tâm tư này lặp lại xuyên suốt nhiều issue gần đây.

## 4. Tiến độ PR chính

Không có pull request nào được cập nhật trong 24 giờ qua. *(Mục này được lược bỏ theo dữ liệu.)*

## 5. Thảo luận nổi bật

Không có dữ liệu Discussions nào được cung cấp. *(Mục này được lược bỏ.)*

## 6. Xu hướng yêu cầu tính năng

- **Quản lý kênh phát hành** — #5203 yêu cầu một kênh ổn định; #5228 nêu bật sự bất tiện từ việc trình duyệt Sessions được thiết kế lại trở thành mặc định. Người dùng muốn sự ổn định hơn là tốc độ.
- **Kiểm soát lựa chọn model** — #5231 yêu cầu loại trừ các model không đáng tin cậy khỏi lựa chọn Auto; #5241 và #5219 cho thấy cài đặt model/reasoning-effort của custom agent không được áp dụng (bao gồm ngân sách dự phòng của subagent gây lỗi toàn bộ lượt).
- **Khả năng cấu hình voice** — #5226 yêu cầu ngôn ngữ phiên âm cố định thay vì `"auto"` được mã hóa cứng, quan trọng đối với người dùng không phải tiếng Anh.
- **UX terminal** — #5227 yêu cầu ô nhập liệu ghim lên đầu (tiện dụng cho các phiên dài); #2750 (đã đóng) yêu cầu cuộn bằng bàn phím.
- **Vòng đời xác thực MCP** — Nhiều yêu cầu cùng hướng đến một giải pháp: sử dụng refresh token đúng cách, bộ nhớ đệm thông tin xác thực bền vững, và lời nhắc xác thực không chặn (#5229, #5233, #5236, #5234).
- **Xử lý secret cục bộ** — #4065 muốn việc che giấu bớt hung hăng hơn để giữ lại nội dung hợp lệ như `${env.AUTH_TOKEN}` trong các tệp spec.

## 7. Điểm đau của nhà phát triển

- **MCP OAuth là nhóm vấn đề lớn nhất hôm nay** — bộ nhớ đệm broker trên Windows (#5236), ACP bỏ qua refresh token (#5229), vòng lặp gửi lại token (#5233), và TUI không dùng được trên các máy chủ yêu cầu xác thực (#5234). Chủ đề chung: refresh token tồn tại nhưng không được dùng, và trạng thái xác thực không được lưu giữ giữa các tiến trình.
- **Agent vượt qua quyền hạn** — Hook không kích hoạt cho sub-agent (#3013) và tự động phê duyệt thư mục tin cậy (#5232) làm xói mòn niềm tin vào mô hình quyền hạn. Cả hai đều được nêu rõ ràng là vấn đề bảo mật.
- **Cấu hình custom agent không được tuân thủ** — Model và reasoning-effort trong frontmatter bị âm thầm bỏ qua (#5241), và các ID model không xác định gây lỗi ngân sách prompt khiến phiên bị kẹt (#5219). Kết hợp với việc hủy MCP của agent plugin (#5237), custom agent có cảm giác như công dân hạng hai.
- **Khoảng trống về tính tương thích cấu hình** — Cài đặt được tuân thủ ở chế độ này nhưng bị bỏ qua ở chế độ khác (`includeCoAuthoredBy` trong ACP, cờ sandbox trước 1.0.103). Người dùng thực chất đang phải khám phá lại chế độ nào tuân thủ cài đặt nào.
- **Môi trường dễ bị tổn thương** — Lỗi DNS của `web_fetch` chỉ qua proxy (#5230), DNS sandbox trên Linux với `systemd-resolved` (mới được sửa, #5027), và cạn kiệt ngân sách inotify (#5242) cho thấy CLI gặp khó khăn trong môi trường doanh nghiệp/container bị hạn chế.
- **Chi phí và ngữ cảnh bất ngờ** — Giới hạn cache 50 ảnh kích hoạt việc nạp lại toàn bộ cache mỗi lần loại bỏ sau ảnh thứ 51 (#5238), tạo ra các phiên "rất, rất tốn kém".
- **Lỗi hồi quy trên phiên bản mới nhất** — Voice segfault kể từ 1.0.100 (#5197) và hỏng TTY trên macOS (#5240) củng cố yêu cầu về kênh ổn định.

---
*Digest được tạo từ hoạt động của github.com/github/copilot-cli vào ngày 2026-10-23. Các liên kết phản ánh URL issue gốc.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Một ngày phát hành yên ắng: `v1.19.4` là bản bảo trì nâng runtime Bun đi kèm lên 1.4.4, kéo theo các bản vá bảo mật cho Brotli, TLS, HTTP/1.1–3, WebSocket và `fetch`, cùng chứng chỉ gốc được cập nhật (NSS 3.131.1) — bản nâng cấp được khuyến nghị cho bất kỳ ai đang mở OpenCode ra mạng. Hoạt động issue vẫn xoay quanh quá trình chuyển đổi lên V2: thiếu hụt khả năng trong model picker, lỗi hồi quy đặt tên session, đăng ký provider thất bại, và lo ngại về ranh giới quyền hạn là những chủ đề lặp đi lặp lại. Về phía PR, maintainer cốt lõi `rekram1-node` đã hợp nhất một loạt lớn các bản sửa về vòng đời MCP và model mặc định, trong khi một PR cộng đồng đưa Brave Search trở lại thành websearch provider tích hợp sẵn.

---

## 2. Bản phát hành

### v1.19.4
**Core — Cải tiến**
- Nâng runtime Bun đi kèm lên **1.4.4**, bao gồm [bản vá bảo mật](https://bun.com/blog/bun-v1.4.4#security) cho Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket và `fetch`
- Cập nhật chứng chỉ gốc lên **NSS 3.131.1**

Không có thay đổi về hành vi hay API trong bản này — đây là bản bảo trì runtime/bảo mật.

---

## 3. Issue nóng

1. **[#2242 — Có cách nào sandbox agent không?](https://github.com/anomalyco/opencode/issues/2242)** (OPEN · 101 bình luận · 👍 80)
   Issue mở được thảo luận nhiều nhất. Người dùng muốn giới hạn filesystem cho các lệnh terminal của agent, so sánh với `seatbelt` trong gemini-cli/codex-cli. Lượng bình luận duy trì và số reaction cao khiến đây là tín hiệu rõ ràng nhất cho một câu chuyện sandboxing hạng nhất.

2. **[#52083 — Lệnh shell phức hợp làm mất redirection, biến một lệnh được phép thành ghi file không hỏi](https://github.com/anomalyco/opencode/issues/52083)** (OPEN · 4 bình luận)
   Một lỗ hổng vượt quyền liên quan đến bảo mật: bộ quét lệnh tách các lệnh nối chuỗi nhưng bỏ sót các đích redirection khỏi tài nguyên được đánh giá. Đi đôi trực tiếp với #2242 và nên được ưu tiên bất kể lộ trình sandbox ra sao.

3. **[#50652 — Công cụ plugin bên ngoài vượt qua quyền đã cấu hình](https://github.com/anomalyco/opencode/issues/50652)** (OPEN · 3 bình luận · 👍 2)
   Các công cụ do plugin đăng ký thực thi mà không áp dụng hành động quyền đã cấu hình, kể cả qua Code Mode. Mở rộng lo ngại về mô hình quyền ra ngoài xử lý shell tích hợp sẵn.

4. **[#50257 — Model picker trên Desktop hiển thị "No reasoning" cho mọi model V2](https://github.com/anomalyco/opencode/issues/50257)** (OPEN · 15 bình luận)
   `capabilities.reasoning` không bao giờ được đặt, nên tooltip dán nhãn sai cho mọi model V2 có khả năng reasoning. Chỉ là vấn đề hiển thị nhưng rất dễ thấy; 15 bình luận cho thấy ảnh hưởng rộng khắp người dùng desktop.

5. **[#51828 — Cơ chế loại bỏ do location không hoạt động gửi SIGTERM tới shell nền đang chạy sau 60 phút](https://github.com/anomalyco/opencode/issues/51828)** (OPEN · 6 bình luận)
   `locations.invalidate()` phá hủy đồ thị Shell/Pty theo phạm vi location trong khi tiến trình dịch vụ vẫn sống. Công việc nền chạy dài bị chết âm thầm — một vấn đề đúng đắn nghiêm trọng cho các luồng công việc agentic.

6. **[#58176 — Tiêu đề session không bao giờ được tạo trong v2](https://github.com/anomalyco/opencode/issues/58176)** (OPEN · 3 bình luận · đã tái hiện)
   Không có auto-trigger cộng với việc gói miễn phí bị từ chối khiến các session mới mãi là "Untitled session," một hồi quy rõ ràng so với v1.18.x. Mức độ riêng lẻ thì thấp, nhưng là hồi quy chất lượng dễ thấy cho mọi người dùng V2.

7. **[#58335 — Tài khoản Console đã kết nối nhưng provider `opencode` không bao giờ đăng ký](https://github.com/anomalyco/opencode/issues/58335)** (CLOSED · 3 bình luận)
   Console trả về 52 model, nhưng `/api/provider` bỏ sót `opencode` và `/api/model` không có mục `opencode/*` nào. Một rào cản cho người dùng Console trên v2.1.3.

8. **[#47646 — ChatGPT OAuth báo context 400k cho các model long-context](https://github.com/anomalyco/opencode/issues/47646)** (CLOSED · 15 bình luận)
   OpenCode ghi đè giới hạn context hiệu dụng (~1.05M theo catalog) bằng 400,000 token, khiến TUI báo thừa dư địa và làm suy giảm quyết định compaction. Nay đã đóng, nhưng tương tác cao.

9. **[#56783 — V2: compaction kích hoạt ngay request đầu / lặp khi `compaction.buffer` ≥ giới hạn context](https://github.com/anomalyco/opencode/issues/56783)** (CLOSED · 2 bình luận · đã tái hiện)
   Cấu hình sai tạo ra các tóm tắt có cấu trúc vô nghĩa ngay đầu session và lặp lại lỗi nội bộ `Session…`. Đáng có một guard/validation khi tải config.

10. **[#58327 — Provider websearch tùy chỉnh không thể báo hiệu rate limit](https://github.com/anomalyco/opencode/issues/58327)** + **[#58328 — Đưa Brave trở lại thành provider tích hợp sẵn](https://github.com/anomalyco/opencode/issues/58328)** (OPEN)
    Hai issue cùng ngày từ một tác giả: các provider tích hợp sẵn tham gia vào 429 → `Retry-After` → failover, nhưng provider do plugin đăng ký qua `ctx.websearch.transform` không có cách nào báo hiệu bị throttle. #58328 cũng chỉ ra một lỗ hổng quy trình — PR #48222 bị stale-bot đóng mà không được review.

---

## 4. Tiến triển PR chính

1. **[#58355 — fix(core): dùng model của agent khi session không có model](https://github.com/anomalyco/opencode/pull/58355)**
   Tôn trọng `agents.<id>.model` / frontmatter của agent cho `opencode run` và `run --agent`, vốn trước đây luôn dùng mặc định của server. Sửa một bất nhất lâu dài giữa headless/CLI.

2. **[#58352 — fix(core): mặc định về agent và model dùng lần cuối khi chưa chọn model](https://github.com/anomalyco/opencode/pull/58352)**
   Ngăn `opencode run` âm thầm rơi vào model mới phát hành nhất trên mọi provider (hiện là `opencode/flint-40b-free`) — một bản sửa đúng đắn về chi phí cho người dùng trả phí.

3. **[#58351 — fix(core): dừng các MCP server song song khi tắt](https://github.com/anomalyco/opencode/pull/58351)**
   Việc tắt tuần tự tốn 2–4s mỗi local server không hợp tác, vượt ngân sách khởi động lại ~5s. Sửa #50758.

4. **[#58350 — fix(core): bỏ qua công cụ MCP dị dạng thay vì làm hỏng server](https://github.com/anomalyco/opencode/pull/58350)**
   Xác thực từng công cụ riêng lẻ để một `inputSchema` hỏng không còn làm hỏng toàn bộ `tools/list` và đánh dấu server thất bại ngay lúc kết nối.

5. **[#58349 — fix(core): không nhân bản MCP server được khởi động trong lần đồng bộ ban đầu](https://github.com/anomalyco/opencode/pull/58349)**
   Sửa race lúc khởi động khi một launch trong hàng đợi vẫn chạy sau khi `connect()`/`disconnect()` hoàn tất, sinh ra bản sao thứ hai. Sửa #52741.

6. **[#58342 — fix(core): giữ MCP OAuth login chờ sau các request callback lạc](https://github.com/anomalyco/opencode/pull/58342)**
   Callback loopback không còn coi các request không có code (ví dụ preflight PNA của Chrome) là lỗi xác thực nghiêm trọng. Sửa #55201 và gỡ rào cho MCP auth trên Chrome-Linux.

7. **[#58341 — fix(core): giữ request MCP từ xa mở quá idle timeout của fetch trong Bun](https://github.com/anomalyco/opencode/pull/58341)**
   Các cuộc gọi MCP từ xa im lặng >5 phút nay vẫn sống thay vì thất bại tại idle timeout của Bun, vốn ngắn hơn nhiều so với timeout thực thi MCP 12 giờ của OpenCode.

8. **[#58344 — fix(ai): gấp ID tool call dài họ Mistral trên toàn bộ ID](https://github.com/anomalyco/opencode/pull/58344)** (và **#58339** liên quan)
   Giới hạn 9 ký tự của Mistral trước đây cắt thay vì gấp, gây xung đột tiền tố cho GLM và các model khác đứng sau các route có tiền tố mistral. Sửa #58323.

9. **[#58334 — feat(core): thêm tìm kiếm web Brave](https://github.com/anomalyco/opencode/pull/58334)**
   Đưa #48222 trở lại (Brave làm websearch provider tích hợp sẵn) sau khi bản gốc bị automation đóng PR cũ mà không review. Đóng #58328.

10. **[#58346 — fix(core): làm mới router DigitalOcean khi đã đăng nhập](https://github.com/anomalyco/opencode/pull/58346)**
    Khôi phục phát hiện router giữa session (đã bị gỡ trong #57175 để dừng polling khi đã đăng xuất) mà không đưa lại hành vi 5 phút một lần ở mọi nơi.

Cũng đáng theo dõi: **[#58343 — fix(desktop): theo sau tách dev server](https://github.com/anomalyco/opencode/pull/58343)** (bản build kênh dev có DB riêng; thêm gợi ý Home cho dogfooder cần di chuyển), **[#57470 — ảnh clipboard qua interop Windows trên WSL](https://github.com/anomalyco/opencode/pull/57470)**, và **[#58347 — dùng `/usr/local/etc/opencode` trên FreeBSD](https://github.com/anomalyco/opencode/pull/58347)**.

---

## 5. Thảo luận nóng

Không có dữ liệu Discussions trong nguồn; phần này được lược bỏ.

---

## 6. Xu hướng yêu cầu tính năng

Chưng cất từ Issues và PR được cập nhật trong 24 giờ qua:

- **Sandboxing agent và tăng cường quyền hạn** — #2242 (chế độ sandbox), #52083 (vượt redirect), #50652 (vượt quyền plugin). Đây giờ là một cụm, không chỉ một yêu cầu đơn lẻ, và là issue có nhiều bình luận/reaction nhất nói chung.
- **Linh hoạt websearch provider** — #58327 và #58328 đều nhắm cùng một subsystem: provider tùy chỉnh cần báo hiệu rate limit, và Brave tích hợp sẵn nên được đưa trở lại.
- **Bề mặt cấu hình model/thực thi** — #58330 yêu cầu nút bật vị trí thực thi model bên cạnh các quyền API key hiện có; #54881 yêu cầu header root session ID trên các request LLM để quy kết sub-agent.
- **Quan sát mức sử dụng** — #57975 đề xuất một dashboard sử dụng thời gian thực thống nhất cho mọi model AI, với động lực là giới hạn gói miễn phí không rõ ràng; #58014 báo cáo cạn giới hạn miễn phí chỉ sau vài request, gợi ý nhu cầu phần nào đến từ sự mơ hồ trong cách đếm.
- **Chỉnh trang UI/UX** — #58034 (định dạng timestamp cấu hình được trên desktop/web), #51868 (bản dịch máy tiếng Trung chưa review cùng 93 khóa thiếu trong 1828), #56109 (tab-completion `/cd` trên Windows thêm dấu backslash).

---

## 7. Điểm đau của nhà phát triển

- **Hồi quy khi chuyển lên V2 chiếm lĩnh issue tracker.** Đặt tên session (#58176), đăng ký provider (#58335), vòng lặp compaction (#56783), và hiển thị khả năng model (#50257) đều đặc thù V2 và đều người dùng thấy được. Một số đã được gắn nhãn `reproduced`.
- **Mô hình quyền không nhất quán giữa các bề mặt.** Shell tích hợp sẵn, công cụ plugin, và Code Mode mỗi cái hành xử khác nhau; #52083 và #50652 đều mô tả các lối vượt qua âm thầm. Niềm tin vào hệ thống quyền là khiếu nại gốc, không phải bất kỳ bug đơn lẻ nào.
- **Vòng đời MCP mong manh ở các cạnh.** Nhân bản lúc khởi động (#58349), tắc khi tắt tuần tự (#58351), server thất bại vì công cụ dị dạng (#58350), phân loại sai callback OAuth (#55201), và idle timeout fetch của Bun (#58341) là năm kiểu thất bại riêng biệt trên một subsystem — cụm PR core cùng ngày đọc như một đợt tăng cường có chủ đích.
- **Lệch tài liệu/catalog.** #55904 (model Exo và MiMo V2.5 đã ngừng vẫn được quảng cáo), #50405 (`location` vs `path` trong hướng dẫn plugin), và #51868 (chuỗi tiếng Trung chưa dịch/dịch sai) có chung nguyên

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Hoạt động hôm nay bị chi phối bởi một loạt các **bản sửa lỗi về TUI/hiệu năng và tính đúng đắn** được merge liên tiếp: sửa lỗi tràn stack khi export HTML, cải thiện xếp hạng tìm kiếm mờ, và các race condition khi kết thúc shell-group trên macOS đều đã có PR. Trong khi đó, **cuộc tranh luận về ngân sách thời gian khởi động (#7739)** vẫn tiếp tục là issue mở được bình luận nhiều nhất, cho thấy áp lực cạnh tranh ngày càng tăng từ các harness đối thủ như jcode. Một cụm issue đáng chú ý bị **đóng với trạng thái no-action** (loại bỏ comment HTML, `/reload` cho AGENTS.md, tên client MCP OAuth) cho thấy maintainer đang phân loại quyết liệt nhưng từ chối mở rộng phạm vi.

---

## 2. Bản phát hành

Không có bản phát hành mới trong 24 giờ qua.

---

## 3. Issue nổi bật

1. **[#7739 OPEN] Ngân sách thời gian khởi động hướng tới độ trễ và bộ nhớ tương đương jcode** — 11 bình luận
   Issue hoạt động sôi nổi nhất. Đề xuất một ngân sách thời gian khởi động chính thức cho Pi, đối chiếu với jcode v0.9.1888-dev. Đây là tín hiệu chiến lược: cộng đồng đang coi benchmark của đối thủ như kim chỉ nam. Đáng theo dõi vì ảnh hưởng đến roadmap.
   https://github.com/earendil-works/pi/issues/7739

2. **[#6167 CLOSED] Chuẩn hóa thinking-block của `transformMessages` so với `requiresReasoningContentOnAssistantMessages`** — 10 bình luận
   Một bug tương tác cờ tương thích tinh tế mất nhiều tháng mới giải quyết. Cho thấy việc xử lý reasoning-content xuyên nhà cung cấp vẫn còn mong manh như một lớp bug.
   https://github.com/earendil-works/pi/issues/6167

3. **[#9932 OPEN] `before_agent_start` ép system prompt giữ lại các tool đã bị xóa** — 6 bình luận
   Bug thứ tự vòng đời extension: các mục bị xóa bởi `setActiveTools()` bị mất khi system prompt bị ép buộc. Rất quan trọng với tác giả extension đang xây dựng agent bị giới hạn.
   https://github.com/earendil-works/pi/issues/9932

4. **[#10259 OPEN] API trình bày tool công khai hoặc chế độ tool một dòng** — 5 bình luận, 👍2
   Yêu cầu API chỉ hiển thị để kiểm soát tất cả các hàng tool (built-in, MCP, codemode, tùy chỉnh). Tín hiệu mạnh về hệ sinh thái extension.
   https://github.com/earendil-works/pi/issues/10259

5. **[#11223 OPEN] `modelOverrides` bị bỏ qua âm thầm đối với model classifier** — 5 bình luận
   Cấu hình bị bỏ qua âm thầm — một lớp bug nguy hiểm. Người dùng chỉ phát hiện khi hành vi không khớp với tài liệu.
   https://github.com/earendil-works/pi/issues/11223

6. **[#9807 OPEN] TUI re-render toàn bộ gây lag cuộn/gõ phím khi có 800+ tin nhắn** — 5 bình luận, 👍3
   Regression hiệu năng với sự đồng tình cao từ người dùng. Nguyên nhân gốc là thiếu diffing tăng dần ở mức cell (đối chiếu với OpenTUI của OpenCode).
   https://github.com/earendil-works/pi/issues/9807

7. **[#11086 OPEN, prio:p0] Ký tự rò rỉ vào input trên terminal Windows khi CPU tải cao** — 4 bình luận
   Lỗi hỏng input được gắn tag P0. Hồ sơ tái hiện khó chịu (SSH + CPU client tải cao) khiến khó truy vết nhưng tác động lớn.
   https://github.com/earendil-works/pi/issues/11086

8. **[#11259 CLOSED] WSL bracketed-paste từ Windows Terminal làm mất dán ảnh** — 3 bình luận
   Đã đóng, nhưng đại diện cho bề mặt đau nhức ngày càng tăng trong tương tác WSL/Windows.
   https://github.com/earendil-works/pi/issues/11259

9. **[#11172 OPEN] Đuôi mouse report bị tách rò rỉ vào prompt** — 2 bình luận
   Bug half-flush escape-timeout trong StdinBuffer. Ít bình luận nhưng có repro tối giản rõ ràng, có khả năng ảnh hưởng rộng đến độ bền của input editor.
   https://github.com/earendil-works/pi/issues/11172

10. **[#11253 OPEN, fix-available] `forkFrom` ghi một appendFileSync cho mỗi entry** — 2 bình luận
    Session 73 MB / 3.322 entry mất hơn 30 giây để fork, phá vỡ handshake của host. Tag "fix available" nghĩa là băng thông maintainer là rào cản duy nhất.
    https://github.com/earendil-works/pi/issues/11253

---

## 4. Tiến độ PR chính

1. **[#11309 OPEN] Await tin nhắn người dùng từ extension** — `muyiyr`
   Trả về promise bên dưới từ `sendUserMessage` của extension để command handler có thể await turn được tạo. Bao gồm test regression cho #11238.
   https://github.com/earendil-works/pi/pull/11309

2. **[#11304 OPEN] Khởi động khi một package được cấu hình cài đặt thất bại** — `Lincoln504`
   Ngăn một package lỗi hủy bỏ quá trình khởi động; lỗi hiển thị qua kênh cảnh báo của extension. Cải thiện lớn về độ bền cho các setup nhiều package.
   https://github.com/earendil-works/pi/pull/11304

3. **[#11296 CLOSED] Xếp hạng fuzzy match liền kề; tìm kiếm trường session riêng biệt** — `petrroll`
   Sửa lỗi xếp hạng kỳ lạ của `/model opus` (#11220) và đóng ba issue liên quan. Thay đổi cách tính điểm fuzzy để ưu tiên các match liền kề, căn chỉnh theo substring.
   https://github.com/earendil-works/pi/pull/11296

4. **[#11293 CLOSED] Render HTML export cho session sâu hơn call stack** — `petrroll`
   Thay thế việc duyệt cây đệ quy trong trình xem export bằng stack lặp. Session dài không còn render trống.
   https://github.com/earendil-works/pi/pull/11293

5. **[#11290 CLOSED] Render tin nhắn hệ thống trong HTML export** — `petrroll`
   Sửa #11261: các mục hệ thống (prompt ban đầu và cập nhật section) giờ xuất hiện trong export, cùng với CLI `--export` hiển thị prompt và tools.
   https://github.com/earendil-works/pi/pull/11290

6. **[#11289 CLOSED] Dừng shell group macOS trước khi kill chúng** — `petrroll`
   Đóng race condition abort (#11252) nơi `a; b` vẫn có thể chạy `b`. Đường dẫn Linux/Windows không đổi; fallback kill được giữ nguyên.
   https://github.com/earendil-works/pi/pull/11289

7. **[#11288 OPEN] Ghi session đã fork qua một fd duy nhất** — `robopipi[bot]`
   Sửa lỗi O(N) open/close trên `forkFrom` cho session lớn (#11253). Do bot tạo nhưng chạm đến vấn đề đúng đắn/hiệu năng thực sự.
   https://github.com/earendil-works/pi/pull/11288

8. **[#11278 CLOSED] Giữ nguyên getter `ctx.ui` qua `wrapUIPromptContext`** — `ljm15913101281`
   Object-spread đã đánh giá `get theme()` tại thời điểm bind, phá vỡ khởi tạo theme muộn trong các host như pi-web.
   https://github.com/earendil-works/pi/pull/11278

9. **[#11275 CLOSED] Tránh tràn stack khi export cây sâu** — `muyiyr`
   Bản sửa song song với #11293; landed cùng ngày với test regression 20.000 entry.
   https://github.com/earendil-works/pi/pull/11275

10. **[#10528 OPEN] Refactor đóng gói Nix** — `ReStranger`
    Tinh gọn `package.nix` (bỏ `*.map`, `*.d.ts`), dùng `makeBinaryWrapper`, bỏ qua kiểm tra version dưới Nix. Vẫn mở, đáng theo dõi cho phân phối Nix.
    https://github.com/earendil-works/pi/pull/10528

---

## 5. Thảo luận nổi bật

**Show and tell**

- **[#11307] `pi-better-web-search` — một tool web_search duy nhất, kết quả thô từ nhà cung cấp, fallback xuyên nhà cung cấp thực sự**
  Tách tool web-search ra khỏi `pi-web-search` để sửa hai vấn đề: kết quả bị viết lại và không có fallback khi model hiện tại không thể tìm kiếm.
  https://github.com/earendil-works/pi/discussions/11307

- **[#11306] `pi-continuity` — tự động tiếp tục sau khi hết hạn mức coding-plan và các turn bị gián đoạn**
  Tự động hóa vòng lặp "quay lại sau 5 giờ và gõ continue" cho giới hạn 5 giờ của OpenAI. Bổ sung cho các retry lỗi tạm thời và compaction hiện có.
  https://github.com/earendil-works/pi/discussions/11306

*(Không có thảo luận Ideas hay Q&A trong 24 giờ qua.)*

---

## 6. Xu hướng yêu cầu tính năng

- **API quan sát & trình bày extension** — #10259 (API trình bày tool công khai), #11090 (giữ nguyên gán model cho việc dùng token phụ trợ), #7828 (định danh tin nhắn trong context markdown transformer). Tác giả extension muốn hook sâu hơn với ít phỏng đoán hơn.
- **Hiệu năng khởi động / runtime** — #7739 (ngân sách khởi động so với jcode), #9807 (lag re-render TUI), #11253 (fork chậm "fix-available"). Hiệu năng giờ là câu chuyện cạnh tranh, không chỉ là trau chuốt.
- **Tương thích xuyên harness & độ trung thực cấu hình** — #11250/#11251 (loại bỏ comment HTML để khớp với Claude Code), #10226 (tên client MCP OAuth), #11223 (tuân thủ modelOverrides). Người dùng muốn Pi hành xử giống các công cụ khác.
- **Kiểm soát vòng đời session** — #11292/#11291 (reload AGENTS.md giữa session), #11295 (auto-compaction theo phạm vi nhà cung cấp với ngưỡng tuyệt đối). Kiểm soát chi tiết những gì được load và khi nào.
- **Khả năng cấu hình auto-compaction** — #11295 và thảo luận liên quan về ngưỡng theo từng nhà cung cấp.

---

## 7. Điểm đau của nhà phát triển

- **Các trường hợp biên về input/terminal chiếm ưu thế trong báo cáo bug.** Rò rỉ ký tự trên Windows khi CPU tải cao (#11086), mất dán ảnh bracketed-paste trên WSL (#11259), mouse report tách escape (#11172), race condition abort trên macOS (#11252). Lớp input của TUI là bề mặt ma sát cao nhất.
- **Thất bại âm thầm làm xói mòn niềm tin.** `modelOverrides` bị bỏ qua (#11223), thiếu `checkpointWhen` chỉ crash ở commit đầu tiên (#11305), `No API provider registered` không bắt được giữa session (#11287). Lỗi không hiển thị cho đến muộn hơn là lớp đau đớn nhất.
- **Session dài phá vỡ rendering và forking.** Tràn stack trong HTML export (#11225), full re-render trong TUI (#9807), và I/O `forkFrom` O(N) (#11253) đều chia sẻ nguyên nhân gốc: cấu trúc dữ liệu không mở rộng quá ~1k–3k entry.
- **Thứ tự vòng đời extension/agent mong manh.** #9932 (xóa tool bị mất khi ép system prompt) và #11278 (getter được đánh giá tại thời điểm bind) cho thấy giả định về thứ tự khởi tạo rò rỉ vào API công khai.
- **Khoảng cách giữa tài liệu và thực tế.** #11223 và #11282 đều trích dẫn tài liệu hoặc website hứa hẹn hành vi không khớp với code đã phát hành hoặc repository công khai.
- **Tốc độ phân loại so với mở rộng phạm vi.** Chín issue bị đóng với `[no-action]` chỉ trong hôm nay (comment HTML, `/reload`, tên MCP OAuth) — maintainer đang từ chối các yêu cầu tương thích nhỏ để bảo vệ phần lõi, điều mà một số contributor sẽ hiểu là "không lắng nghe."

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Một bản dựng mới `v0.26.0-nightly.20261022.bf66a26c97` đã ra mắt, với điểm nhấn là tính năng lưu trữ token của daemon trong `qwen serve`. Trong khi đó, cộng đồng đang hội tụ quanh chủ đề **quản lý phiên/workspace** — chuẩn hóa thuật ngữ, thư mục làm việc riêng cho từng phiên, và UX thanh bên — cùng với một nhóm lỗi P1 về tính đúng đắn liên quan đến tool call bị cắt cụt và mất kết quả tool trên Windows.

## 2. Bản phát hành

**v0.26.0-nightly.20261022.bf66a26c97** ([release notes](https://github.com/QwenLM/qwen-code/releases))
- `feat(serve)`: thêm tính năng lưu trữ token của daemon ([#15023](https://github.com/QwenLM/qwen-code/pull/15023) bởi @wenshao) — token tồn tại qua các lần khởi động lại daemon, đây là điều kiện tiên quyết cho quản lý phiên bền vững.
- `fix(release)`: bao phủ mọi binary vendored được sinh ra — khắc phục lỗ hổng đóng gói khi một số binary phát hành không được kiểm tra trong quá trình xác minh release.

## 3. Issue nổi bật

1. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078)** — *Daily dependency CVE audit failed* (29 bình luận, vẫn mở từ 09-30). Audit do bot theo dõi liên tục thất bại, cho thấy hoặc có cảnh báo nghiêm trọng kéo dài hoặc endpoint npm audit không khả dụng. Thread dài nhất trong ngày; đáng theo dõi cho vấn đề vệ sinh chuỗi cung ứng.

2. **[#13787](https://github.com/QwenLM/qwen-code/issues/13787)** — *XML recovery repeats prefix scans on large multi-call responses*. Suy giảm hiệu năng với benchmark tái lập được trên `main`; quan trọng vì kích thước phản hồi tăng theo quy trình nhiều tool. Cộng đồng đã cung cấp bản tái lập bằng direct-parser.

3. **[#15165](https://github.com/QwenLM/qwen-code/issues/15165)** — *Shell safety parser triggers ~1.6 GiB transient WASM allocation on Node 24.16.0*. Đỉnh bộ nhớ do V8 tối ưu trình phân tích Bash WASM đi kèm. Ảnh hưởng lớn đến người dùng CI/container có bộ nhớ hạn chế.

4. **[#15248](https://github.com/QwenLM/qwen-code/issues/15248)** — *ci(sdk-java): runtime broker timing tests flake 3/3 on GitHub-hosted runners*. Test flaky chặn làn nhanh PR từ fork — vấn đề trải nghiệm contributor trực tiếp cản trở đóng góp từ bên ngoài.

5. **[#15310](https://github.com/QwenLM/qwen-code/issues/15310)** — *Tell the model which shell it uses, instead of letting it assume bash*. Trên Windows, Qwen Code dùng `cmd.exe` nhưng prompt ngầm định POSIX, khiến lệnh thất bại. Sửa đơn giản, hiệu quả cao với bản tái lập rõ ràng.

6. **[#15297](https://github.com/QwenLM/qwen-code/issues/15297)** — *Qwen Code 0.26.0 loses tool output in ~1 of 40 calls* (P1). 43 trường hợp / 1.663 lần gọi, 28 xác nhận qua transcript. Tool chạy thành công nhưng không có `functionResponse` nào đến được model — vấn đề đúng đắn nghiêm trọng gây buộc phải đọc lại.

7. **[#15324](https://github.com/QwenLM/qwen-code/issues/15324)** — *bug(acp): edit truncated by `max_tokens` is written to disk* (P1). Một `write_file` một phần được thực thi và báo cáo thành công. Ảnh hưởng Zed, VS Code companion, và `qwen serve` — lỗi tiềm ẩn gây hỏng dữ liệu.

8. **[#15327](https://github.com/QwenLM/qwen-code/issues/15327)** — *tracking(core): run every surface on one agent loop behind `experimental.unifiedAgentLoop`* (P1). Đề xuất hợp nhất các agent loop trùng lặp (Ink vs. OpenTUI vs. ACP). Quan trọng về mặt kiến trúc; xem thêm #15326 bên dưới.

9. **[#15326](https://github.com/QwenLM/qwen-code/issues/15326)** — *OpenTUI runs tool calls from a retried attempt and does not record native tool results*. Bằng chứng cụ thể về sự phân kỳ mà #15327 nhắm loại bỏ — vòng lặp OpenTUI là một bản sao riêng trong `live-session.ts`.

10. **[#15325](https://github.com/QwenLM/qwen-code/issues/15325)** — *stream-json message past `--max-session-turns` returns success with the previous answer*. Chế độ thất bại im lặng trong SDK transport: không có yêu cầu model, trạng thái thành công, câu trả lời cũ. Client SDK gặp phải điều này.

Cũng đáng chú ý: [#15328](https://github.com/QwenLM/qwen-code/issues/15328) (headless thoát 0 không có output khi bị cắt cụt) và [#15077](https://github.com/QwenLM/qwen-code/issues/15077) (liệt kê phiên lưu trữ + tìm kiếm tiêu đề, nay đã CLOSED).

## 4. Tiến độ PR chính

1. **[#15211](https://github.com/QwenLM/qwen-code/pull/15211)** — *feat(serve): carry a scheduled-task gate through the daemon and Web Shell* (bởi @wenshao). Tiếp nối #15069; cho phép tác vụ định kỳ chạy lệnh shell gating mỗi lần kích hoạt. Cốt lõi cho câu chuyện tự động hóa có quản lý.

2. **[#15218](https://github.com/QwenLM/qwen-code/pull/15218)** — *feat(managed): gate managed automations on a Runtime probe run before the claim*. Ngữ nghĩa quiet-gate (`skipped/gate_quiet`) giải quyết các lần xuất hiện mà không cần một lượt — hiệu quả cho các lần kích hoạt không hành động.

3. **[#15323](https://github.com/QwenLM/qwen-code/pull/15323)** — *feat(serve): allow secondary sessions to `cd` within their workspace*. Triển khai mô hình thư mục làm việc sandbox được yêu cầu trong #15316, với ràng buộc realpath.

4. **[#15283](https://github.com/QwenLM/qwen-code/pull/15283)** — *feat(cli): align OpenTUI session recovery with Ink*. Một loạt lớn: hủy sở hữu, gọi lại bền vững, replay resume/branch, rewind, khôi phục checkpoint. Trực tiếp giải quyết sự phân kỳ OpenTUI/Ink.

5. **[#15255](https://github.com/QwenLM/qwen-code/pull/15255)** — *feat(managed-agent): shared Harness pool for Kubernetes*. Hosting dạng pool tùy chọn với placement epochs và writer-grant fencing — bước tiến ý nghĩa hướng tới quy mô đa tenant.

6. **[#15261](https://github.com/QwenLM/qwen-code/pull/15261)** — *feat(runtime-broker): HTTP-backed external scratch workers*. Đi kèm #15247: dịch vụ HTTP do operator vận hành sở hữu việc đặt worker; broker lưu trữ handle yêu cầu tất định cho retry idempotent.

7. **[#15256](https://github.com/QwenLM/qwen-code/pull/15256)** — *fix(ci): reuse open workflow failure issues*. Giảm nhiễu từ các issue thất bại CI do bot tạo — phản hồi trực tiếp cho lượng báo cáo `Main CI failed` như #15307.

8. **[#15329](https://github.com/QwenLM/qwen-code/pull/15329)** — *feat(ci): switchable Linux runner fleet (hosted/arm64) via `LINUX_RUNNER_FLEET`*. Cung cấp cho maintainer một làn arm64 và lối thoát sạch hơn so với công tắc ECS.

9. **[#15320](https://github.com/QwenLM/qwen-code/pull/15320)** + **[#15319](https://github.com/QwenLM/qwen-code/pull/15319)** — Tổ chức lại thanh bên Web Shell (bởi @deggs7): chuyển *Create group* vào menu **⋮** của workspace, và nâng *No-workspace sessions* thành nhóm ngang hàng. Triển khai các thảo luận #14988 / #15312 / #15309.

10. **[#15317](https://github.com/QwenLM/qwen-code/pull/15317)** — *fix(mods): refuse values nested too deeply to cross the Mod boundary*. Thêm giới hạn lồng 512 cấp cho giá trị Mod→Qwen Code, ngăn đệ quy không giới hạn tại ranh giới extension.

## 5. Thảo luận nổi bật

Không có dữ liệu GitHub Discussions trong tập dữ liệu nguồn, nên phần này được lược bỏ.

## 6. Xu hướng yêu cầu tính năng

- **Vòng đời phiên & workspace**: liệt kê/tìm kiếm phiên lưu trữ ([#15077](https://github.com/QwenLM/qwen-code/issues/15077), nay đã đóng), thư mục làm việc riêng theo phiên ([#15316](https://github.com/QwenLM/qwen-code/issues/15316), [#15323](https://github.com/QwenLM/qwen-code/pull/15323)), và *Unified Agent Loop* ([#15327](https://github.com/QwenLM/qwen-code/issues/15327)) đều chỉ ra quản lý phiên là trọng tâm của roadmap.
- **UX & thuật ngữ Web Shell**: nỗ lực phối hợp chuẩn hóa *Workspace / 工作区* và *Session / 会话* ([#14988](https://github.com/QwenLM/qwen-code/issues/14988)), di chuyển *Create group* ([#15312](https://github.com/QwenLM/qwen-code/issues/15312)), làm rõ nhóm *No-workspace* ([#15309](https://github.com/QwenLM/qwen-code/issues/15309)), và hiển thị đầy đủ args/kết quả tool MCP ([#15280](https://github.com/QwenLM/qwen-code/issues/15280)).
- **Hiện đại hóa MCP**: hỗ trợ hạng nhất MCP 2026-07-28 + MCP Apps với Web Shell là host chính ([#8968](https://github.com/QwenLM/qwen-code/issues/8968)).
- **Phân phối nền tảng & runtime**: Managed Agent Runtime Broker #15247, shared Harness pool #15255, và một nhóm công việc `runtime-broker`. Đầu tư đáng kể vào thực thi hosted/đa tenant.
- **Nhận biết môi trường shell**: [#15310](https://github.com/QwenLM/qwen-code/issues/15310) yêu cầu model được thông báo rằng nó đang trên `cmd.exe`; yêu cầu nhỏ nhưng ảnh hưởng lớn trên Windows.

## 7. Điểm đau của nhà phát triển

- **CI flaky chặn contributor bên ngoài.** Test timing broker sdk-java flaky trên runner GitHub-hosted ([#15248](https://github.com/QwenLM/qwen-code/issues/15248)), và làn nhanh từ fork bị nêu rõ là bị chặn. Nguyên nhân gốc là sự phân kỳ giữa runner hosted và self-hosted; #15286, #15289, và #15322 là phản hồi của maintainer.
- **Timeout trên hosted-runner ảnh hưởng dây chuyền đến ngân sách test.** PR #15101 và #15183 đều viết lại các khoảng chờ cố định 10s để dùng chính sách slow-host — bằng chứng môi trường hosted thường quá chậm so với ngân sách hiện tại.
- **Lỗi cắt cụt/mất mát là mối lo đúng đắn gay gắt nhất.** #15297 (mất kết quả tool im lặng trong 0.26.0), #15324 (ghi bị cắt cụt được ghi vào đĩa), #15325 (thành công cũ vượt giới hạn lượt), và #15328 (thoát 0, không output) là bốn báo cáo thất bại im lặng độc lập trong một ngày. Điểm chung: thất bại vô hình với caller và được báo cáo là thành công.
- **Xử lý shell trên Windows vẫn còn gồ ghề.** #15310 (không có ngữ cảnh shell trong prompt) và #15297 (mất kết quả tool đặc thù Windows) đều ảnh hưởng không cân xứng đến người dùng Windows.
- **Agent loop trùng lặp tạo ra các bề mặt lỗi phân kỳ.** Sự trôi dạt hành vi của vòng lặp OpenTUI ([#15326](https://github.com/QwenLM/qwen-code/issues/15326)) là triệu chứng tức thời; #15327 là đề xuất sửa cấu trúc.
- **Nhiễu issue do bot tạo.** Nhiều issue `Deferred review findings` và `Main CI failed` (#15307) được sinh tự động; #15256 (tái sử dụng issue thất bại đang mở) là biện pháp giảm thiểu.

---

Quy tắc:
- Chỉ xuất bản bản dịch. Không mở đầu, không giải thích, không hàng rào markdown bao quanh toàn bộ output.
- Giữ nguyên cấu trúc Markdown: tiêu đề, bảng (bao gồm hàng căn chỉnh cột), danh sách, blockquote, đậm/nghiêng, đường kẻ ngang, emoji.
- Giữ nguyên URL, đích liên kết, code span, code block, số và ngày.
- Giữ nguyên tên dự án, slug repository, username, tag phiên bản, đường dẫn file và định danh API/config — không dịch.
- Tham chiếu Issue/PR như #12345 và văn bản liên kết giữ nguyên.
- Dùng tiếng Việt tự nhiên, văn phong bản tin nhà phát triển Việt — rõ ràng và trực tiếp, không dịch từng chữ.
- Ưu tiên từ đơn giản và câu ngắn. Nêu rõ điều gì đã thay đổi và mục đích khi nguồn có đủ thông tin. Không thêm dữ kiện, so sánh phiên bản hay lợi ích không có trong nguồn.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*