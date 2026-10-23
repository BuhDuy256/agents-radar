# Bản tin cộng đồng công cụ AI CLI 2026-10-23

> Tạo lúc: 2026-10-23 06:10 UTC | Công cụ theo dõi: 7

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

---

## 1. Bảng xếp hạng Skill hàng đầu

Xếp hạng theo mức độ chú ý của cộng đồng (bình luận, hoạt động review, tham chiếu chéo). Lưu ý: số lượng bình luận trên PR không có sẵn trong tập dữ liệu, nên thứ hạng phản ánh độ mới của cập nhật, các issue liên kết và độ sâu thảo luận.

| # | Skill / PR | Chức năng | Điểm nổi bật trong thảo luận | Trạng thái |
|---|---|---|---|---|
| 1 | **mcp-builder fix** ([#1742](https://github.com/anthropics/skills/pull/1742)) | Cập nhật MCP builder cho `mcp>=2.0.0` — đổi tên `streamablehttp_client` → `streamable_http_client`, thêm hỗ trợ custom header qua `create_mcp_http_client`. Liên kết với issue #1668. | Nằm trong một cụm lỗi của mcp-builder (xem thêm #1390, #1668); vẫn hoạt động tính đến 2026-10-08. | OPEN |
| 2 | **skill-creator: isolate trigger evals** ([#1298](https://github.com/anthropics/skills/pull/1298)) | Sửa lỗi false-miss/invalid-score trong đánh giá trigger — tranh chấp probe giữa các worker, lỗi `select()` trên Windows, các tool không liên quan làm hủy scan. | Phản hồi trực tiếp vấn đề bất ổn định eval do cộng đồng báo cáo (#1383, #556). Cập nhật 2026-09-16. | OPEN |
| 3 | **notion-spec-to-implementation + quantitative-resume-auditor** ([#1245](https://github.com/anthropics/skills/pull/1245)) | Gói hai skill: chuyển đổi spec Notion thành task Notion khả thi kèm tiêu chí chấp nhận; audit resume theo định lượng. | PR tồn tại lâu (mở từ tháng 6, cập nhật 15/10) — contributor duy trì tham gia đều đặn. | OPEN |
| 4 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Phân tích tĩnh cho smart contract Solidity/Rust với bằng chứng audit mật mã neo vào TON Blockchain (giao thức Merkle). | Mảng Web3 mới lạ; ngách nhưng đặc sắc. | OPEN |
| 5 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Pipeline miễn phí biên dịch Markdown → slide Marp → MP4 với voiceover AI. | Skill tạo media; cho thấy nhu cầu về đầu ra đa phương thức. | OPEN |
| 6 | **pyxel retro game dev** ([#525](https://github.com/anthropics/skills/pull/525)) | Hướng dẫn tạo, debug và kiểm thử headless game retro Pyxel. | Tồn tại lâu (từ tháng 3); cộng đồng quan tâm ổn định. | OPEN |
| 7 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | Ngăn ngừa orphan word wrap, widow paragraph và lệch số thứ tự trong tài liệu được tạo. | Hấp dẫn rộng rãi — ảnh hưởng đến *mọi* tài liệu Claude tạo ra. | OPEN |
| 8 | **ODT skill** ([#486](https://github.com/anthropics/skills/pull/486)) | Hỗ trợ đầy đủ OpenDocument (.odt/.ods): tạo/điền/parse/chuyển sang HTML. | Lấp khoảng trống rõ ràng trong nhóm document-skills. | OPEN |

**Đáng chú ý thêm:** `scnet-hpc` (#1615), `skill-quality-analyzer` + `skill-security-analyzer` (#83), đại tu độ rõ ràng của frontend-design (#210).

---

## 2. Xu hướng nhu cầu cộng đồng

Chắt lọc từ top 15 Issue. Bốn nhóm nhu cầu rõ rệt xuất hiện:

**A. Tin cậy, Bảo mật & Quản trị** *(tương tác cao nhất)*
- [#492](https://github.com/anthropics/skills/issues/492) — **46 bình luận, issue #1**: skill cộng đồng phân phối dưới namespace `anthropic/` cho phép lạm dụng ranh giới tin cậy.
- [#1394](https://github.com/anthropics/skills/issues/1394) — XSS trong eval-viewer qua `escapeHtml()` không an toàn với attribute.
- [#412](https://github.com/anthropics/skills/issues/412) — đề xuất skill `agent-governance` (thực thi chính sách, audit trail). CLOSED.
- **Tín hiệu:** người dùng muốn provenance, sandboxing và các primitive quản trị trước khi tin tưởng skill bên thứ ba.

**B. Độ tin cậy của Skill-Creator & Công cụ đánh giá** *(xuất hiện thường xuyên nhất)*
- [#556](https://github.com/anthropics/skills/issues/556), [#1383](https://github.com/anthropics/skills/issues/1383), [#202](https://github.com/anthropics/skills/issues/202) — trigger eval ở mức 0%, hỏng trên Windows, sai lệch benchmark, vi phạm tone/style.
- **Tín hiệu:** bộ meta-tooling để viết skill chính là nguồn ma sát lớn nhất.

**C. Tự động hóa quy trình & Cộng tác**
- [#228](https://github.com/anthropics/skills/issues/228) — chia sẻ skill trong toàn tổ chức (17 bình luận, 8 👍).
- [#189](https://github.com/anthropics/skills/issues/189) — nội dung trùng lặp giữa plugin `document-skills`/`example-skills` (9 👍).
- **Tín hiệu:** doanh nghiệp áp dụng cần chia sẻ, khử trùng lặp và quản lý thư viện.

**D. Quality Gate & Bộ nhớ**
- [#1385](https://github.com/anthropics/skills/issues/1385) — Pipeline Reasoning Quality Gate (calibration → adversarial review → delivery verification).
- [#1329](https://github.com/anthropics/skills/issues/1329) — ký hiệu symbolic `compact-memory` cho trạng thái agent.
- [#1487](https://github.com/anthropics/skills/issues/1487) — skill `claude-api` tiêm ~156k token trong một lần gọi.
- **Tín hiệu:** nhu cầu về tiết kiệm context và các pattern tự xác minh.

---

## 3. Skill đang chờ xử lý có tiềm năng cao

Các PR có bình luận/cập nhật tích cực, khả năng được merge sớm (tất cả OPEN):

| PR | Skill | Vì sao đáng kỳ vọng |
|---|---|---|
| [#1977](https://github.com/anthropics/skills/pull/1977) | Sửa wrapAround của algorithmic-art | Bug fix nhỏ, độc lập; đóng #1897; cập nhật 2026-10-18. |
| [#1976](https://github.com/anthropics/skills/pull/1976) | Sửa element_discovery trong webapp-testing | Đóng #1891; phạm vi đơn giản; cùng tác giả với #1977. |
| [#1980](https://github.com/anthropics/skills/pull/1980) | Loại bỏ `shell=True` trong webapp-testing | Bản vá bảo mật (CWE-78); cập nhật 2026-10-22 — PR mới nhất trong nhóm. |
| [#1997](https://github.com/anthropics/skills/pull/1997) | Parser YAML frontmatter của skill-creator | Sửa lỗi lệch metadata; cập nhật 2026-10-19. |
| [#1792](https://github.com/anthropics/skills/pull/1792) | Xử lý timeout LibreOffice của docx | Sửa tính đúng đắn — ngăn báo thành công giả. |
| [#1730](https://github.com/anthropics/skills/pull/1730) | Thay URL chết trong claude-api | Đơn giản, đã xác minh HTTP 200; merge rủi ro thấp. |
| [#1681](https://github.com/anthropics/skills/pull/1681) | Thực thi độc lập của skill-creator | Sửa `ModuleNotFoundError` khi chạy script trực tiếp. |
| [#1245](https://github.com/anthropics/skills/pull/1245) | Notion spec + resume auditor | Đề xuất skill mới; contributor duy trì hoạt động đến 15/10. |

**Xu hướng:** một làn sóng PR bug fix nhỏ, chất lượng cao xuất hiện từ 6–22/10, cho thấy băng thông review đang ưu tiên các bản sửa rủi ro thấp hơn là các đề xuất skill mới lớn.

---

## 4. Góc nhìn về hệ sinh thái Skill

> **Nhu cầu tập trung nhất của cộng đồng không phải là thêm nhiều skill — mà là skill *đáng tin cậy*: xử lý provenance/namespace an toàn, công cụ đánh giá đáng tin, và tính đúng đắn có thể xác minh, tất cả hiện đang cản trở việc áp dụng nhiều hơn là năng lực thô.**

---

*Soạn từ metadata PR và Issue của anthropics/skills, 2026-10-23. Số bình luận trên PR không được điền trong tập dữ liệu nguồn; thứ hạng PR được suy ra từ độ mới cập nhật, mật độ issue liên kết và tham chiếu chéo.*

---

**Những gì đã thay đổi**

- v2.1.309 sửa lỗi các lệnh Bash trong sandbox trên macOS và Linux chạy các file khởi động của shell bên ngoài sandbox trước mỗi lệnh — liên quan nếu bạn dựa vào sandbox cho các lệnh không đáng tin cậy.
- Cùng bản phát hành này sửa lỗi các mẫu glob `denyWrite` của sandbox macOS không được áp dụng tại vị trí thực của đường dẫn khi truy cập qua symlink; hữu ích nếu các quy tắc deny của bạn nhắm vào các thư mục được symlink.
- PR #99118 (đã đóng) thay đổi `/diff` để toast của các plugin khác hiển thị trong khi pane hoặc dialog đang mở, thay vì bị giữ lại cho đến khi đóng.
- PR #99540 (đã đóng) đặt mức trần phê duyệt công cụ của tổ chức lên trên các plugin do người dùng cài đặt.

**Đáng lưu ý**

- Tab Code trên Desktop: mức sử dụng context-window bị thiếu khỏi vòng/popover hiển thị mức sử dụng qua nhiều báo cáo (#102094 đã đóng, #102615, #102103, #102176, #103885). Ảnh hưởng đến người dùng desktop; một cái đã đóng, các cái khác vẫn mở.
- Windows: công cụ Bash rò rỉ các tiến trình con mồ côi khi hết thời gian chờ (#76353) — các lệnh `find`/quét chạy hoang tích tụ trong nhiều giờ.
- Windows: Remote Control không được khôi phục sau khi khởi động lại ứng dụng, các phiên bị lưu trữ trên di động (#100114).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Những thay đổi**

- Thêm mười slot `/presets` được đánh số cho các prompt và slash command có thể tái sử dụng, kèm menu bàn phím; hữu ích khi bạn lặp lại cùng một prompt và muốn gọi chúng chỉ bằng một phím ([rust-v0.164.0](https://github.com/openai/codex/releases)).
- `/model` và `/permissions` giờ chấp nhận đối số inline cho model, reasoning effort, speed và permission profile; hữu ích khi bạn đổi cấu hình mà không cần rời khỏi prompt ([rust-v0.164.0](https://github.com/openai/codex/releases)).
- Thêm experimental attached thread forks (`attachToSource` trên `thread/fork`), giữ một fork gắn với nguồn của nó mà không phát `thread/started`; yêu cầu local storage và từ chối `ephemeral`/`deferGoalContinuation` ([#56351](https://github.com/openai/codex/pull/56351)).
- `thread/sample` chấp nhận `threadSource` tùy chọn, mặc định là `thread_sample` khi bỏ qua ([#56364](https://github.com/openai/codex/pull/56364)).

**Đáng chú ý**

- Windows 10 Computer Use bị deadlock khi chờ chuyển đổi SoftwareBitmap bên trong FrameArrived — 50 bình luận, vẫn mở ([#35446](https://github.com/openai/codex/issues/35446)).
- BYOK Work mode chặn gửi tin nhắn khi bật local browser/computer tools — 37 bình luận, 27 👍, đang mở ([#54841](https://github.com/openai/codex/issues/54841)).
- Hạn mức CLI cạn bất thường nhanh ngay cả với prompt đã cache tầm thường; đang mở ([#51088](https://github.com/openai/codex/issues/51088)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Những thay đổi**

- v0.67.0-nightly.20261023.ga713410ab đã ra mắt; bản này sửa lỗi bảo toàn metadata sử dụng token mở rộng với căn chỉnh báo cáo theo từng lượt ([PR #29834](https://github.com/google-gemini/gemini-cli/pull/29834)) và đảm bảo các lượt model có lời gọi hàm nhận được thought signature.
- [PR #29890](https://github.com/google-gemini/gemini-cli/pull/29890) chỉ khôi phục thư mục workspace sau khi phiên chat được tiếp tục thành công; hữu ích khi việc resume thất bại và bạn không muốn các thư mục cũ còn sót lại trong context.
- [PR #29859](https://github.com/google-gemini/gemini-cli/pull/29859) hiển thị lại các lời gọi công cụ của subagent đang thực thi trong task tree; hữu ích khi bạn cần xem subagent đang chạy gì.
- [PR #29880](https://github.com/google-gemini/gemini-cli/pull/29880) thêm subcommand `gemini models` và flag `--list-models` với đầu ra JSON; hữu ích khi bạn cần khám phá model bằng chương trình.

**Đáng lưu ý**

- Generalist agent có thể treo vô thời hạn, ngay cả với các thay đổi đơn giản như tạo thư mục ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), 8 bình luận); yêu cầu model không chuyển tiếp cho subagent được cho là giúp tránh tình trạng này. Chưa có bản sửa trong dữ liệu.
- Browser Agent bỏ qua các ghi đè trong `settings.json` như `maxTurns` ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)); chưa có bản sửa trong dữ liệu.
- Hơn khoảng 128 công cụ sẽ kích hoạt lỗi 400 ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)); chưa có bản sửa trong dữ liệu.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Những gì đã thay đổi**

- v1.0.103 (2026-10-22): Nhấp vào khối mã của phản hồi đã hoàn tất sẽ sao chép mã gốc khi tính năng này được bật; hữu ích khi bạn muốn đoạn mã thô thay vì kết quả hiển thị lại.
- v1.0.103: Các phiên ACP giờ tuân theo cài đặt sandbox đã lưu và cờ `--sandbox`/`--no-sandbox`, kể cả khi khôi phục phiên.
- v1.0.103: Phản hồi từ cloud giữ nguyên toàn bộ văn bản khi CLI kết nối lại sau khi mất kết nối.
- v1.0.103: Trình duyệt phiên sh (nội dung mục bị cắt trong dữ liệu).

**Đáng chú ý**

- Issue #5232 (OPEN, cập nhật 2026-10-23): Ở chế độ quyền `manual`, các lệnh shell mà mọi đường dẫn được tham chiếu đều nằm trong thư mục tin cậy sẽ tự động được phê duyệt mà không hỏi, kể cả với script, sqlcmd hay curl. Chưa có bản sửa.
- Issue #5242 (OPEN, 2026-10-23): Khi ngân sách theo dõi inotify của host cạn kiệt, việc đăng ký theo dõi cấu hình MCP thất bại với lỗi ENOSPC và các phiên ngừng xử lý prompt. Chưa có bản sửa.
- Issue #5238 (OPEN, 2026-10-23, v1.0.103): Vượt quá giới hạn 50 ảnh mỗi phiên, việc xóa ảnh cũ nhất sẽ kích hoạt nạp lại toàn bộ cache cho mọi ảnh tiếp theo, gây tốn kém. Chưa có bản sửa.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Những gì đã thay đổi**

- Phát hành v1.19.4, nâng cấp runtime Bun đi kèm lên 1.4.4 (bản vá bảo mật cho Brotli, TLS, HTTP/1.1–3, WebSocket, `fetch`; root certs cập nhật lên NSS 3.131.1).
- PR #58355 (đã đóng): `model` đã cấu hình của agent giờ được dùng khi một phiên không có model, sửa lỗi `opencode run --agent <id>` âm thầm rơi về mặc định của server.
- PR #58352 (đang mở): khi không có model nào được chọn, phiên sẽ mặc định dùng agent và model dùng lần cuối thay vì model mới phát hành nhất (trước đây thường rơi vào một model miễn phí).
- PR #58349/#58351 (đã đóng): các MCP server không còn bị nhân bản trong lần đồng bộ ban đầu và dừng song song khi tắt, sửa lỗi `service restart` chậm.

**Đáng lưu ý**

- Issue #58176 (đang mở, đã tái hiện): v2 không bao giờ tạo tiêu đề phiên; phiên mới vẫn là "Untitled session" trong khi v1.18.x tự động đặt tiêu đề. Không có bản sửa trong dữ liệu.
- Issue #51828 (đang mở): các shell chạy nền bị SIGTERM sau 60 phút không có hoạt động tại location, phá hủy shell graph theo phạm vi location trong khi service vẫn sống.
- Issue #50257 (đang mở): trình chọn model trên desktop hiển thị "No reasoning" cho tất cả model V2 vì `capabilities.reasoning` không bao giờ được đặt.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Những thay đổi**
- Không có bản phát hành mới trong 24h qua.
- PR #11299 sửa type guard `thinkingLevelMap?.off` và `max_completion_tokens` thừa; hữu ích khi chạy model `reasoning: true` + `thinkingFormat: "openrouter"` mà không có `thinkingLevelMap` thông qua `--model`. (earendil-works/pi PR #11299)
- PR #11293/#11275 thay thế việc duyệt cây đệ quy khi export HTML bằng stack tường minh; hữu ích cho `/export` trên các session dài trước đây render ra trắng. (earendil-works/pi PR #11293)
- PR #11290 render system message trong export HTML; hữu ích để xem prompt ban đầu và các cập nhật section/tool giữa session. (earendil-works/pi PR #11290)

**Đáng chú ý**
- #11086 (OPEN, prio:p0): ký tự rò rỉ vào input trên terminal Windows khi CPU tải cao trong lúc SSH đến máy Linux chạy Pi 1.3; chưa có fix trong dữ liệu. (earendil-works/pi Issue #11086)
- #11287 (CLOSED): reload cài đặt giữa session xóa các API provider do extension cung cấp, gây uncaughtException `No API provider registered` và thoát process; đã đóng, nhưng không có PR liên kết trong dữ liệu. (earendil-works/pi Issue #11287)
- Discussion #11307: `pi-better-web-search` đăng ký một tool `web_search` với kết quả thô từ provider và fallback giữa các provider; hữu ích khi model hiện tại không search được. (earendil-works/pi Discussion #11307)

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Những thay đổi**
- Thêm tính năng lưu trữ token daemon trong `qwen serve` qua PR [#15023](https://github.com/QwenLM/qwen-code/pull/15023), phát hành trong v0.26.0-nightly.20261022.bf66a26c97; hữu ích khi bạn chạy daemon và cần token tồn tại qua các lần khởi động lại.
- PR [#15313](https://github.com/QwenLM/qwen-code/pull/15313) thêm `web_fetch` vào Managed Agent Workspace Sessions; hữu ích khi một Workspace Session cần tải URL, đáp ứng yêu cầu tính năng trong issue [#15076](https://github.com/QwenLM/qwen-code/issues/15076).
- [v0.26.0-nightly.20261022.bf66a26c97](https://github.com/QwenLM/qwen-code/releases) sửa lỗi phạm vi phát hành cho mọi binary vendored được sinh ra.
- PR [#15332](https://github.com/QwenLM/qwen-code/pull/15332) sửa bước build-test của review để nó đi đến giai đoạn test trên monorepo này sau khi chuyển sang pnpm; hữu ích khi một PR chạm vào các package phụ thuộc ở root như core, cli, hoặc acp-bridge.

**Đáng chú ý**
- Issue [#15297](https://github.com/QwenLM/qwen-code/issues/15297) báo cáo Qwen Code 0.26.0 âm thầm làm mất kết quả tool (~43 trong 1.663 lần gọi mỗi vòng, 28 trường hợp được xác nhận qua transcript); gắn nhãn P1, trạng thái/need-information — chưa có bản sửa trong dữ liệu.
- Issue [#15328](https://github.com/QwenLM/qwen-code/issues/15328): các lần chạy headless thoát với mã 0 và không có output khi một lượt bị cắt do giới hạn output; ảnh hưởng đến việc dùng phi tương tác/script, chưa có bản sửa nào được liệt kê.
- Issue [#15165](https://github.com/QwenLM/qwen-code/issues/15165): phân loại an toàn shell có thể tăng vọt lên ~1,6 GiB bộ nhớ WASM tạm thời trên Node 24.16.0/Linux x64; ảnh hưởng đến môi trường eo hẹp bộ nhớ, chưa có bản sửa trong dữ liệu.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*