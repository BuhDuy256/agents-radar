# Bản tin cộng đồng công cụ AI CLI 2026-10-23

> Tạo lúc: 2026-10-23 06:31 UTC | Công cụ theo dõi: 7

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

# Claude Code Skills — Báo cáo điểm nổi bật cộng đồng
*Ảnh chụp dữ liệu: 2026-10-23 | Nguồn: github.com/anthropics/skills*

> **Lưu ý về chất lượng dữ liệu:** Tập dữ liệu PR báo cáo `Comments: undefined` cho tất cả 50 dòng, nên không thể xếp hạng PR strictly theo số lượng bình luận. Xếp hạng dưới đây dựa trên các tín hiệu chú ý tổng hợp (độ mới, tần suất cập nhật, số lượng 👍, số issue liên kết, và mức độ nổi bật trong feed đã sắp xếp). Các issue — vốn có số lượng bình luận — được xếp hạng trực tiếp.

---

## 1. Xếp hạng Skill hàng đầu (theo mức độ chú ý của PR / thảo luận)

| # | Skill / PR | Chức năng | Điểm nổi bật trong thảo luận | Trạng thái |
|---|-----------|---------------|----------------------|--------|
| 1 | **mcp-builder fix** — `streamable_http_client` + custom headers ([#1742](https://github.com/anthropics/skills/pull/1742)) | Sửa skill MCP server builder cho `mcp>=2.0.0`, phiên bản đã đổi tên `streamablehttp_client` và chuyển headers sang `create_mcp_http_client`. | Sửa trực tiếp Issue #1668; được cập nhật suốt một tháng (2026-09-08 → 2026-10-08), cho thấy đang được lặp liên tục. Issue liên quan #1390 cho thấy `evaluation.py` của cùng skill này đạt 0/N điểm trên server thực — skill MCP-builder đang chịu áp lực bảo trì liên tục. | OPEN |
| 2 | **skill-creator: trigger eval isolation + Windows/runtime fixes** ([#1298](https://github.com/anthropics/skills/pull/1298)) | Làm cho việc đánh giá trigger trở nên tất định — cô lập command probe theo từng worker, sửa `select()` trên subprocess pipe trên Windows, ngăn các tool không liên quan hủy bỏ scan. | Một trong nhiều bản sửa skill-creator (xem thêm #1681, #1997); liên quan đến Issue #556 (tỷ lệ trigger 0%), #1383 (trigger eval hỏng trên Windows), #1394 (XSS trong eval-viewer). Bộ công cụ skill-creator là cụm báo lỗi cộng đồng lớn nhất. | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | Chuyển đổi spec sản phẩm/kỹ thuật trên Notion thành các task Claude Code cụ thể, có thể hành động (tiêu chí nghiệm thu, theo dõi tiến độ); skill thứ hai đánh giá resume theo định lượng. | Bản submission được cập nhật tích cực lâu nhất trong nhóm dẫn đầu (2026-06-02 → 2026-10-15). Đại diện cho xu hướng tự động hóa quy trình "spec → kế hoạch thực thi". | OPEN |
| 4 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Phân tích tĩnh tự động cho smart contract Solidity/Rust với bằng chứng audit mật mã neo trên blockchain TON (giao thức Merkle zero-storage). | Đáng chú ý là đại diện Web3/blockchain trong một hệ sinh thái vốn bị chi phối bởi skill về tài liệu và dev-tooling; mang tính thương hiệu (tác giả gửi kèm protocol). | OPEN |
| 5 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Pipeline chi phí bằng không, biên dịch Markdown → slide Marp → MP4 có thuyết minh với giọng đọc tự nhiên. | Mở rộng họ skill tạo tài liệu (docx/pdf/odt) sang đầu ra media; cách định vị "zero-cost" cho thấy nó tránh các API TTS trả phí — một mối quan tâm thường gặp của cộng đồng. | OPEN |
| 6 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | QC typography cho tài liệu được tạo ra: ngắt dòng từ mồ côi, đoạn văn mồ côi, lệch số thứ tự. | Rất khớp về mặt khái niệm với bộ document-skills chính thức; gần như mọi tài liệu do Claude tạo đều mắc các lỗi này, nên có tính ứng dụng rộng dù ít 👍. | OPEN |
| 7 | **pyxel** ([#525](https://github.com/anthropics/skills/pull/525)) | Phát triển game retro bằng Python qua Pyxel — chạy headless dựa trên input, kiểm tra frame trực tiếp, kiểm tra state. | Submission skill lâu đời nhất trong top 20 với cập nhật liên tục (2026-03-05 → 2026-09-22), cho thấy tác giả đang duy trì nó qua các vòng review. | OPEN |
| 8 | **skill-quality-analyzer + skill-security-analyzer** ([#83](https://github.com/anthropics/skills/pull/83)) | Meta-skill đánh giá skill theo năm chiều chất lượng (cấu trúc, tài liệu, v.v.) và review bảo mật. | PR lâu đời nhất trong top 20 (2025-11-06) và gắn về mặt chủ đề với Issue #492 (lạm dụng ranh giới tin cậy) — meta-tooling vẫn là một khoảng trống chưa được giải quyết. | OPEN |

*Các bản sửa đáng chú ý khác:* [webapp-testing loại bỏ shell=True (CWE-78)](https://github.com/anthropics/skills/pull/1980), [docx xử lý timeout của LibreOffice](https://github.com/anthropics/skills/pull/1792), [skill-creator phân tích YAML frontmatter](https://github.com/anthropics/skills/pull/1997), [algorithmic-art sửa `wrapAround()`](https://github.com/anthropics/skills/pull/1977).

---

## 2. Xu hướng nhu cầu cộng đồng (từ Issues)

Xếp hạng theo số bình luận và độ mới:

1. **Bảo mật chuỗi cung ứng & tin cậy namespace** — [Issue #492](https://github.com/anthropics/skills/issues/492) (46 bình luận, 👍3, hoạt động 7+ tháng). Các skill cộng đồng được publish dưới `anthropic/` mạo danh skill chính thức, cho phép leo thang đặc quyền qua ranh giới tin cậy. **Issue có mức tương tác cao nhất trong toàn bộ tập dữ liệu, vượt trội về mọi mặt.**

2. **Phân phối skill trong toàn tổ chức** — [Issue #228](https://github.com/anthropics/skills/issues/228) (17 bình luận, 👍8). Người dùng phải tải thủ công file `.skill`, chia sẻ qua Slack/Teams, và đồng nghiệp phải upload lại qua Settings. Nhu cầu: thư viện skill chia sẻ và link chia sẻ.

3. **Độ tin cậy của trigger / đánh giá skill** — [Issue #556](https://github.com/anthropics/skills/issues/556) (13 bình luận, 👍7). `run_eval.py` không bao giờ trigger skill (tỷ lệ trigger 0%) vì `claude -p` + frontmatter `.claude/commands/` không gọi tool `Skill`/`Read`. Được củng cố bởi #1383 và #1298.

4. **Hiệu quả context & vệ sinh skill** — [Issue #1487](https://github.com/anthropics/skills/issues/1487): `claude-api` chủ động inject ~156k token trong một lần gọi tool, làm cạn cửa sổ context. [Issue #189](https://github.com/anthropics/skills/issues/189) (👍9): skill trùng lặp từ plugin `document-skills` và `example-skills` làm phình context. Nhu cầu: lazy loading và loại bỏ trùng lặp.

5. **Thực hành tốt khi viết skill** — [Issue #202](https://github.com/anthropics/skills/issues/202) (CLOSED): skill-creator đọc như tài liệu dành cho developer, không phải hướng dẫn vận hành; giọng văn dài dòng làm giảm hiệu quả token, và tên vi phạm chính hướng dẫn của nó.

6. **Mô hình quản trị / an toàn** — [Issue #412](https://github.com/anthropics/skills/issues/412, CLOSED): thực thi policy, phát hiện mối đe dọa, chấm điểm tin cậy, audit trail cho hệ thống agent. [Issue #1385](https://github.com/anthropics/skills/issues/1385): pipeline chất lượng suy luận ba cổng (calibration → adversarial review → delivery verification).

7. **Nén bộ nhớ & trạng thái** — [Issue #1329](https://github.com/anthropics/skills/issues/1329): ký hiệu symbolic để nén bộ nhớ agent chạy dài và giảm chi phí context. Liên quan đến xu hướng #4.

**Các hướng nhu cầu đã chắt lọc:** ranh giới bảo mật/tin cậy, phân phối trong tổ chức, meta-tooling (độ tin cậy trigger, bộ phân tích chất lượng/bảo mật), kỷ luật ngân sách context, và pipeline cổng chất lượng chính thức. Đáng chú ý là vắng mặt trong nhu cầu: sinh test và review code — lực kéo của cộng đồng hướng về *hạ tầng xung quanh skill*, chứ không phải skill miền mới.

---

## 3. Skill đang chờ có tiềm năng cao (đang hoạt động, chưa merge)

Các PR có hoạt động cập nhật gần đây (tháng 9–10/2026) và chưa được merge:

| PR | Skill | Vì sao có thể sớm được nhận |
|----|-------|---------------------|
| [#1997](https://github.com/anthropics/skills/pull/1997) | Sửa phân tích scalar YAML của skill-creator | Cập nhật 2026-10-19; xử lý một bug đúng đắn cụ thể (`parse_skill_md` làm hỏng description có dấu ngoặc kép), nằm ngay thượng nguồn của chất lượng trigger/eval. |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder tương thích `mcp>=2` | Cập nhật 2026-10-08; sửa lỗi hỏng hoàn toàn (#1668) cho bất kỳ ai dùng MCP SDK hiện tại. Các bản sửa tương thích thường được merge nhanh nhất. |
| [#1245](https://github.com/anthropics/skills/pull/1245) | notion-spec-to-implementation + resume auditor | Cập nhật 2026-10-15; chạy dài nhưng vẫn được chỉnh sửa tích cực — có thể đang chờ phản hồi về việc tách skill hoặc đặt tên. |
| [#1980](https://github.com/anthropics/skills/pull/1980) | webapp-testing loại bỏ `shell=True` | Cập nhật 2026-10-22 (mới nhất trong tập dữ liệu); bản sửa bảo mật CWE-78 gọn gàng với diff nhỏ — ít ma sát khi review. |
| [#1730](https://github.com/anthropics/skills/pull/1730) | claude-api thay URL chết | Cập nhật 2026-10-04; 3 URL được thay bằng đích HTTP 200 đã xác minh bằng curl — bản sửa tài liệu dễ merge. |
| [#1681](https://github.com/anthropics/skills/pull/1681) | skill-creator thực thi trực tiếp `package_skill.py` | Cập nhật 2026-10-08; sửa `ModuleNotFoundError` khi gọi độc lập, một workflow phổ biến của developer. |
| [#1792](https://github.com/anthropics/skills/pull/1792) | docx timeout LibreOffice → lỗi thực | Cập nhật 2026-09-25; biến false-success im lặng thành output đã xác minh — sửa đúng đắn với hành vi có thể kiểm thử. |
| [#1976](https://github.com/anthropics/skills/pull/1976) / [#1977](https://github.com/anthropics/skills/pull/1977) | webapp-testing báo cáo `textarea`/`select`; algorithmic-art `wrapAround()` | Cập nhật 2026-10-18; cả hai tham chiếu Issue đã đóng (#1891, #1897) và là các bản sửa bug nhỏ, phạm vi rõ ràng. |

**Quy luật:** các bản merge có xác suất cao nhất trong ngắn hạn là *sửa bug cho skill chính thức hiện có* (skill-creator, mcp-builder, webapp-testing, docx, claude-api), không phải skill mới hoàn toàn. Các PR skill mới (#1245, #1771, #1703, #1615, #525, #514, #486) vẫn mở lâu hơn nhiều — một số từ đầu năm 2026.

---

## 4. Góc nhìn về hệ sinh thái Skill

**Nhu cầu tập trung nhất của cộng đồng không phải là skill miền mới, mà là gia cố *hạ tầng* skill — ranh giới tin cậy (Issue #492 với 46 bình luận), trigger/đánh giá đáng tin cậy (tỷ lệ trigger 0% trong #556), và kỷ luật ngân sách context (#1487, #189) — trong khi thông lượng PR bị chi phối bởi các bản sửa đúng đắn cho bộ công cụ skill-creator và mcp-builder chính thức, chứ không phải các submission năng lực mới.**

---

**Những gì đã thay đổi**

- v2.1.309 đã sửa lỗi Bash trong sandbox trên macOS và Linux chạy các tệp khởi động shell bên ngoài sandbox trước mỗi lệnh; hữu ích nếu bạn chạy các lệnh không đáng tin cậy trong sandbox.
- v2.1.309 đã sửa lỗi mẫu glob `denyWrite` của sandbox macOS không được áp dụng tại vị trí thực của đường dẫn khi truy cập qua symlink; hữu ích nếu bạn chặn ghi trong các thư mục được liên kết tượng trưng.
- Bảy PR của @poteat (ví dụ #99540, #99137, #97688, #97334) đã bị đóng: ở nơi `sec-default` được đặt, plugin của một người không còn có thể nới lỏng quy tắc deny/ask, nâng trần công cụ của tổ chức, hoặc xóa/ghi đè bản ghi collector.
- #99118 và #99141 giải quyết hành vi của khung `/diff`: thông báo từ các plugin khác giờ hiển thị khi khung đang mở, và khung được mở trước khi có gì đó có thể vẽ nó sẽ hiển thị một khi có thứ có thể vẽ.

**Đáng biết**

- Mức sử dụng cửa sổ ngữ cảnh của tab Code trên Desktop liên tục biến mất: #102094 (đã đóng, Windows), #103918 (đã đóng, macOS), #102615, #102103, #102623, #103885, #102133 — giới hạn gói vẫn hiển thị.
- #76353: trên Windows, thời gian chờ của công cụ Bash kill `bash.exe` nhưng không kill các tiến trình con, nên các `find`/quét mồ côi vẫn tiếp tục chạy; đang mở, chưa có fix trong dữ liệu.
- #104497: `find` đi kèm (bfs 4.1.1) lặp vô hạn và tăng bộ nhớ không giới hạn trên một ntfs3 junction được báo là DT_DIR; GNU find kết thúc bình thường; đang mở, chưa có fix.

Links: github.com/anthropics/claude-code

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## Những thay đổi
- Thêm các slot `/presets` được đánh số cho prompt và slash command có thể tái sử dụng, kèm menu bàn phím; hữu ích khi bạn lặp lại cùng một prompt thường xuyên. (rust-v0.164.0, #54380, #54381)
- Thêm đối số inline cho `/model` và `/permissions` để đặt model, reasoning effort, speed và permission profile trực tiếp. (rust-v0.164.0, #54378, #54383)
- Thêm `threadSource` vào request `thread/sample`, mặc định là `thread_sample` khi bỏ qua. (PR #56364)
- Thêm `attachToSource` vào `thread/fork` để giữ lại bản fork gắn với nguồn của nó; yêu cầu lưu trữ cục bộ và không thể dùng `ephemeral` hoặc `deferGoalContinuation`. (PR #56351)

## Đáng lưu ý
- Người dùng Windows CLI 0.163.0 với `[windows] sandbox = "elevated"` gặp lỗi làm mới sandbox ACL (`os error 5`) trước khi PowerShell khởi động, ngay cả với lệnh chỉ đọc, trên cả workspace Git hiện có lẫn mới. Chưa có bản sửa trong dữ liệu. (#56078)
- Người dùng Windows desktop có thể thấy lỗi "workspace routing discovery timed out" lặp lại trong các goal và luồng subagent. Chưa có bản sửa trong dữ liệu. (#54540)
- Nhiều người dùng báo lỗi "Selected model is at capacity" trên mọi model, trong đó một người báo 69 lần thất bại đã xác nhận; một báo cáo cho biết web vẫn hoạt động bình thường. Chưa có bản sửa trong dữ liệu. (#56105, #56368)

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Những thay đổi**
- Bản nightly `v0.67.0-nightly.20261023.ga713410ab` giữ lại metadata mở rộng về mức sử dụng token và đồng bộ báo cáo theo từng lượt ([PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834)); đồng thời đảm bảo mọi lượt của model có gọi hàm đều nhận được thought signature.
- Các lệnh gọi công cụ của subagent giờ vẫn hiển thị trong task tree trong khi thực thi ([PR #29859](https://github.com/google-gemini/gemini-cli/pull/29859)); hữu ích khi theo dõi công việc subagent đang chạy.
- Hook `SubagentStop` của Claude Code giờ di chuyển đúng cách, với `Stop` và `SubagentStop` được thêm vào thay vì ghi đè ([PR #29764](https://github.com/google-gemini/gemini-cli/pull/29764)).
- Việc khám phá `tools/list` của MCP được giới hạn bởi timeout mặc định 60 giây thay vì kế thừa timeout gọi công cụ 10 phút ([PR #29767](https://github.com/google-gemini/gemini-cli/pull/29767)).

**Đáng chú ý**
- Generalist agent treo vô thời hạn ở các tác vụ đơn giản như tạo thư mục ([Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 bình luận); chưa có bản sửa trong dữ liệu.
- Browser Agent bỏ qua các ghi đè trong `settings.json` như `maxTurns` ([Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)); chưa có bản sửa trong dữ liệu.
- Việc phục hồi subagent sau `MAX_TURNS` được báo cáo là thành công `GOAL`, che giấu sự gián đoạn ([Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)); chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Những gì đã thay đổi**
- v1.0.103 (2026-10-22): Nhấp vào khối mã của phản hồi đã hoàn thành giờ sẽ sao chép mã gốc khi được bật; hữu ích khi bạn muốn chính xác mã nguồn, không phải đầu ra đã kết xuất.
- Các phiên ACP giờ tuân theo cài đặt sandbox đã lưu và cờ `--sandbox`/`--no-sandbox`, kể cả khi tiếp tục; hữu ích khi tiếp tục công việc mà không cần chỉ định lại sandbox.
- Phản hồi đám mây giữ toàn bộ văn bản khi CLI kết nối lại sau khi mất kết nối; hữu ích trên mạng chập chờn.
- Các thay đổi trình duyệt phiên được phát hành trong cùng bản phát hành (chi tiết bị cắt trong dữ liệu).

**Đáng biết**
- #5240 (đã đóng): Chế độ tương tác làm hỏng TTY terminal trên macOS 1.0.98 trong iTerm2 và Terminal.app. Trạng thái đã đóng được báo cáo; không có chi tiết sửa lỗi trong dữ liệu.
- #5197 (mở): Máy chủ thoại bị segfault (tín hiệu 11) trên WSL2 sau khi cập nhật lên 1.0.100; `/voice` vẫn ở "Fetching voice models". 4 bình luận, 2 👍. Không có sửa lỗi trong dữ liệu.
- #5232 (mở): Ở chế độ cấp quyền thủ công, các lệnh shell có đường dẫn nằm trong thư mục tin cậy sẽ chạy mà không nhắc, kể cả khi có tác dụng phụ không lường trước. 2 bình luận. Không có sửa lỗi trong dữ liệu.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Những thay đổi**
- v1.19.4 nâng cấp Bun runtime đi kèm lên 1.4.4, mang đến các bản vá bảo mật cho Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket và `fetch`, cùng chứng chỉ gốc NSS 3.131.1.
- PR #58355 sửa lỗi cài đặt `model` của agent bị bỏ qua khi phiên bắt đầu mà không có model, nên `opencode run --agent <id>` không còn rơi về mặc định của server.
- PR #58350 bỏ qua từng MCP tool bị lỗi thay vì làm hỏng cả server, nên một `inputSchema` sai không còn kéo sập toàn bộ tools của server.
- PR #58351 dừng các MCP server song song khi tắt, giải quyết độ trễ đóng stdin 2–4s mỗi server được báo trong #50758.

**Đáng lưu ý**
- Issue #50257 (mở): trình chọn model trên desktop hiển thị "No reasoning" cho tất cả model V2, kể cả những model hỗ trợ reasoning, vì `capabilities.reasoning` không bao giờ được đặt. Chưa có bản sửa trong dữ liệu.
- Issue #58176 (mở, đã tái hiện): V2 không bao giờ tạo tiêu đề phiên — phiên mới vẫn là "Untitled session" — không có trigger tự động và bị từ chối ở gói miễn phí.
- Issue #58364 (mở): các phiên đã lưu trữ vẫn xuất hiện trong trình chọn phiên của TUI (`Ctrl+O`), dù bộ lọc API `GET /api/session?archived=false` hoạt động.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Những gì đã thay đổi**
- PR [#11304](https://github.com/earendil-works/pi/pull/11304) (đang mở) ngăn quá trình khởi động bị hủy khi một package đã cấu hình cài đặt thất bại — nó bỏ qua nguồn đó và tải phần còn lại, hữu ích nếu một mục settings lỗi hiện đang khiến việc khởi chạy bị kẹt.
- PR [#11288](https://github.com/earendil-works/pi/pull/11288) (đang mở) viết lại các phiên forked thông qua một file descriptor duy nhất thay vì một `appendFileSync` cho mỗi mục, khắc phục tình trạng `--fork` bị treo 30 giây+ trên các phiên lớn (xem issue [#11253](https://github.com/earendil-works/pi/issues/11253)).
- Nhiều PR đã được merge ([#11293](https://github.com/earendil-works/pi/pull/11293), [#11275](https://github.com/earendil-works/pi/pull/11275), [#6843](https://github.com/earendil-works/pi/pull/6843)) thay thế các phép duyệt HTML-export đệ quy bằng stack lặp, khắc phục tình trạng trang `/export` trắng trên các phiên dài ([#11225](https://github.com/earendil-works/pi/issues/11225)).
- PR [#11289](https://github.com/earendil-works/pi/pull/11289) (đã merge) gửi tín hiệu đến các process group của shell trên macOS trước khi kill chúng, giảm tình trạng race khi hủy `a; b` mà `b` vẫn chạy ([#11252](https://github.com/earendil-works/pi/issues/11252)).

**Đáng chú ý**
- Issue [#11086](https://github.com/earendil-works/pi/issues/11086) (đang mở, p0): các ký hiệu rò rỉ vào input trên terminal Windows khi CPU tải cao; chưa có bản sửa trong dữ liệu.
- Issue [#9807](https://github.com/earendil-works/pi/issues/9807) (đang mở): việc re-render toàn bộ TUI gây lag cuộn/gõ phím khi có 800+ tin nhắn; chưa có bản sửa trong dữ liệu.
- Issue [#9932](https://github.com/earendil-works/pi/issues/9932) (đang mở): các system prompt bị ép bởi `before_agent_start` vẫn giữ lại các tool đã bị gỡ qua `setActiveTools()`; chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Những thay đổi**
- v0.26.0-nightly.20261022.bf66a26c97 đã phát hành: lưu trữ token daemon qua PR #15023, cùng bản sửa lỗi phát hành cho mọi binary vendored được spawn.
- PR #15212 giúp huy hiệu PR phiên, bảng Pull requests và ảnh chụp PR của daemon hoạt động khi `gh` không nằm trên PATH của Qwen; hữu ích trên macOS khi launchd hoặc trình khởi chạy desktop khởi động daemon.
- PR #15211 đưa cổng tác vụ theo lịch qua daemon và Web Shell, theo thiết kế của #15069; hữu ích khi tác vụ theo lịch cần một lệnh shell gating mỗi lần kích hoạt.
- PR #15331 căn chỉnh sidebar Managed với điều hướng daemon — tìm kiếm phiên dùng chung, nhãn "New task" đơn giản, tiêu đề workspace nhất quán. PR #15303 giữ tệp đính kèm nháp qua quá trình làm mới summary và cấp phát phiên.

**Đáng chú ý**
- Issue #15297 (P1): Qwen Code 0.26.0 âm thầm mất kết quả công cụ khoảng 1 trong 30 lần gọi — công cụ chạy với `status: success`, nhưng không có `functionResponse` nào đến được model, buộc phải đọc lại. Được báo cáo trên Windows; dữ liệu chưa có bản sửa.
- Issue #15248: các bài kiểm tra timing của sdk-java runtime broker flake 3/3 trên runner do GitHub host, chặn làn đường nhanh cho PR từ fork. PR #15275/#15254 thử lại các thay đổi khóa.
- Issue #15165: phân loại an toàn shell có thể kích hoạt cấp phát WASM tạm thời ~1.6 GiB trên Node 24.16.0 (Linux x64).

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*