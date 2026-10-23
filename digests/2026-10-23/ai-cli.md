# Bản tin cộng đồng công cụ AI CLI 2026-10-23

> Tạo lúc: 2026-10-23 03:54 UTC | Công cụ theo dõi: 7

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

# Báo cáo So sánh Giữa các Công cụ — Hệ sinh thái AI CLI
**Ngày: 2026-10-23 | Nguồn: Tổng hợp từ cộng đồng GitHub cho 7 công cụ AI CLI lớn**

---

## 1. Tổng quan Hệ sinh thái

Bối cảnh AI CLI giờ đây đã là một hệ sinh thái trưởng thành với bảy công cụ trở lên, nơi **tính ổn định và tăng cường bảo mật đã thay thế tốc độ bổ sung tính năng thô** để trở thành câu chuyện kỹ thuật chủ đạo. Mọi công cụ đều phát hành một bản vá hoặc nightly trong khung 24 giờ, nhưng các codebase đang hội tụ về cùng ba điểm áp lực: ranh giới tin cậy của subagent/plugin, tính đúng đắn của sandbox, và hành vi tài nguyên trong phiên dài. Trong khi đó, ma sát trong cộng đồng đã chuyển rõ rệt từ "nó có chạy không?" sang "tôi có thể tin nó, hạch toán nó, và chi trả cho nó không?" — rò rỉ tiến trình trên Windows, lỗi "at capacity" mờ mịt, sự bất đối xứng quota giữa chế độ headless và tương tác, cùng các lỗ hổng bỏ qua quét quyền đồng loạt xuất hiện trên nhiều tracker. Hạ tầng bậc hai (marketplace, hooks, xác thực MCP, onboarding qua deep-link) chính là nơi sự khác biệt thực sự đang được tranh đấu.

---

## 2. So sánh Mức độ Hoạt động

| Công cụ | Issues (hot/active hôm nay) | PRs (cập nhật ≤24h) | Discussions | Trạng thái Phát hành (24h qua) |
|---|---|---|---|---|
| **Claude Code** | ~13 hot; vài mega-thread (278 / 268 bình luận) | **7 PR, tất cả đã đóng** (tăng cường Mods/sec-default) | **N/A** (không báo cáo) | 2 bản vá: v2.1.308, v2.1.309 (bảo mật sandbox) |
| **OpenAI Codex** | ~15 hot; issue đóng hàng đầu 84 bình luận / 168 👍 | **10 PR**, phần lớn do bot tạo, merge trong ngày | **Có — 6+ thread đang hoạt động** (Ideas/Q&A/Show-and-tell; #14067: 69 👍) | 4 bản alpha: rust-v0.164.0-alpha.11/.11.1/.12; rust-v0.163.0-alpha.11.2 |
| **Gemini CLI** | ~10 hot; lỗi P1 chiếm ưu thế | **10 PR** (gồm atomicity cho credential-store, timeout MCP, fix lớp CVE cho shell-wrapper) | **N/A** (không báo cáo) | 1 nightly: v0.67.0-nightly.20261023 |
| **GitHub Copilot CLI** | ~10 hot; cụm regression xác thực MCP | **0 PR** (không có cập nhật) | **N/A** (không báo cáo) | 1 bản stable: v1.0.103 |
| **OpenCode** | ~10 hot; issue sandbox #2242 ở mức 101 bình luận / 80 👍 | **10 PR** (cấu hình remote-server desktop, line ending của patch-tool) | **N/A** (không báo cáo) | 1 bản vá: v1.19.4 (backport bảo mật Bun 1.4.4) |
| **Pi** | ~10 hot; #7553 dẫn đầu (12 bình luận) | **10 PR** (hiệu năng phiên lớn, xuất HTML, trình cài Windows) | **N/A** (không báo cáo) | **Không có** |
| **Qwen Code** | ~13 hot; P1 mất kết quả tool trên Windows | **10 PR** (quản lý phiên web-shell, guard ranh giới Mods) | **N/A** (không báo cáo) | 1 nightly: v0.26.0-nightly.20261022 |

*Ghi chú:* Chỉ **OpenAI Codex** báo cáo hoạt động Discussions đáng kể; sáu công cụ còn lại hoặc không mở Discussions hoặc không cung cấp dữ liệu — được ghi là N/A thay vì "không hoạt động." **Copilot CLI** là công cụ duy nhất không có chuyển động PR trong khung này; **Pi** là công cụ duy nhất không có bản phát hành trong 24h (chủ ý dồn backlog để phân loại, không phải đình trệ).

---

## 3. Định hướng Tính năng Chung

Bốn chủ đề xuyên công cụ lặp lại đủ độc lập để có thể coi là đồng thuận của hệ sinh thái:

| Định hướng | Công cụ | Tín hiệu cụ thể |
|---|---|---|
| **Sandboxing & tăng cường quyền** | Claude Code, Codex, Gemini CLI, OpenCode, Copilot CLI | Claude v2.1.309 fix sandbox-escape; Gemini #19873 sandbox OS zero-dep; OpenCode #2242 (101 bình luận / 80 👍) issue mở hàng đầu; OpenCode #52083 bypass redirection; Copilot #5232 tự động phê duyệt trusted-folder |
| **Độ tin cậy subagent & tính đúng đắn của delegation** | Gemini CLI, Copilot CLI, Claude Code, Qwen Code | Gemini #22323 báo GOAL thành công giả, #21409 treo vô hạn; Copilot #5197, #5219 (fallback model subagent kẹt phiên), #3013 hooks bị bỏ qua cho background agent; Claude #104341 vượt phạm vi |
| **Khả năng quan sát phiên/plugin** | Claude Code, Codex, Gemini CLI, Qwen Code, Pi | Gemini #22598 trajectory subagent qua `/chat share`; Codex #56176/#56181 công cụ xác minh AGENTS.md; Qwen quản lý phiên như bề mặt hạng nhất; Claude #91870 Mods |
| **Ổn định tài nguyên phiên dài** | Codex, Claude Code, OpenCode, Pi | Codex #54416 (8.7 GiB), #52343 (8→20 GB); Claude #101456 (file output 143 GB); Pi #9807 (TUI lag ở 800+ tin nhắn), #11253 (timeout fork 30s) |
| **Khả năng quan sát context/instruction** | Codex, Pi, Gemini CLI | Codex #14067 đồng bộ thread đa thiết bị (69 👍); Pi #9932 forced prompt cũ; Gemini #22745 đọc hiểu AST-aware |
| **Minh bạch rate-limit / quota** | Codex, OpenCode, Claude Code | Cụm "at capacity" của Codex ×4 và #32586 tự động đổi banked reset; OpenCode #58014 nhầm lẫn free-tier, #34344 khai thác xoay IP; Claude #97074 phạt headless 1.8× |

---

## 4. Phân tích Khác biệt

- **Claude Code — Nước đi quản trị doanh nghiệp.** Công cụ duy nhất có các PR đã merge đọc như một *lớp chính sách*: sec-default trở thành mức trần trên các plugin do người dùng cài (PR #99540, #99137, #97688). Người dùng mục tiêu là tổ chức doanh nghiệp cần cưỡng chế theo từng plugin. Cộng đồng tham gia rất mạnh (thread ghim 278/268 bình luận) nhưng mức tham gia đó tích lũy lâu dài, không phải trong ngày.

- **OpenAI Codex — Lặp nhanh trên lõi Rust, nhịp độ tiêu dùng.** Bốn bản alpha trong 24h với các PR do bot tạo, merge trong ngày báo hiệu một cỗ máy phát hành chạy nội bộ. Cộng đồng ở đây hòa đồng nhất trong nhóm — là công cụ *duy nhất* vận hành Discussions thực chất, với các ý tưởng được vote cao (#14067, 69 👍) rõ ràng định hình roadmap. Điểm yếu: nhịp độ alpha đang tạo ra regression do cập nhật (#55795, #55744).

- **Gemini CLI — Kỹ thuật phòng thủ ưu tiên bảo mật.** Các PR chính là câu chuyện: atomicity credential-store, timeout khám phá MCP, fix bypass shell-wrapper — một tư thế bảo mật mạch lạc. *Độ tin cậy* subagent là vết thương hở (ba lỗi P1 quanh báo thành công giả / treo). Mục tiêu khả dĩ: các agent tự trị shell-native cần cổng an toàn.

- **GitHub Copilot CLI — Gắn với tích hợp, bị regression giày vò.** Không có hoạt động PR và cụm xác thực MCP dày đặc (#5229–#5236) cộng với yêu cầu công khai về kênh ổn định (#5203) báo hiệu một công cụ phát hành qua pipeline riêng (VS Code / nền tảng GitHub) và phơi bày độ trễ ở lớp CLI. Người dùng mục tiêu là thuê bao GitHub Copilot hiện hữu, không phải người dùng mới hoàn toàn.

- **OpenCode — UX & tính đúng đắn do cộng đồng dẫn dắt.** Mười PR do bên ngoài đóng góp (remote server desktop, xác nhận deep-link, fix CRLF). Thiếu hụt định nghĩa của nó là *không có sandbox* (#2242, issue được upvote số 1) — đáng chú ý vì đối thủ đang coi sandboxing là điều kiện tối thiểu. Mạnh ở câu chuyện desktop remote/đa server.

- **Pi — Boutique ám ảnh hiệu năng.** Được xây quanh việc sửa các *lớp* bug cụ thể (duyệt đệ quy, re-render toàn phần, bão FD fork) mà các công cụ lớn hơn coi là edge case. Số bình luận ít hơn nhưng mật độ tín hiệu cao. Mục tiêu khả dĩ: người dùng chuyên sâu với phiên đo bằng hàng nghìn tin nhắn.

- **Qwen Code — Agent được quản lý / quy mô đa tenant.** Các PR (#15255 pool K8s Harness, #15247 provisioner Runtime bên ngoài, #15218 cổng automation) nhắm đến *triển khai được host*, không chỉ người dùng CLI cá nhân. Tương đương Windows và tăng cường ranh giới Mods (giới hạn độ sâu 512 cấp, #15317) hoàn thiện bản sắc "nền tảng, không phải công cụ" đặc trưng.

---

## 5. Đà phát triển & Độ trưởng thành Cộng đồng

**Hoạt động mạnh nhất (tương tác thô):** Claude Code (mega-thread ở 278/268 bình luận), Codex (issue đóng 84 bình luận + hệ sinh thái Discussions có ý nghĩa duy nhất ở 69 👍), OpenCode (#2242 ở 101 bình luận / 80 👍).

**Lặp nhanh nhất:** Codex (4 alpha/24h, 10 PR) và Gemini CLI (nightly + 10 PR bảo mật/hiệu năng). Claude Code phát hành các bản vá *quan trọng nhất* (fix sandbox-escape lên v2.1.309).

**Quy trình trưởng thành nhất:** Claude Code (chuỗi PR Mods/sec-default có quản trị với lý do chính sách rõ ràng), Gemini CLI (kỷ luật phân loại P1/P2/P3, PR bảo mật có gắn nhãn lớp CVE).

**Ít hoạt động nhất trong khung này:** Copilot CLI (0 PR; cụm regression gợi ý nằm sau pipeline phát hành lớn hơn), Pi (không phát hành — nhưng 10 PR gồm ba cái hội tụ về cùng nguyên nhân gốc hiệu năng, cho thấy maintainer đang tích cực phân loại).

**Phân bố độ trưởng thành:**
- **V2+ (ổn định, dẫn dắt bởi quản trị):** Claude Code, Copilot CLI, OpenCode
- **V1+/lặp nhanh trên lõi:** Codex (0.164 alpha), Gemini CLI (0.67 nightly), Qwen Code (0.26 nightly)
- **Boutique / tăng cường:** Pi

---

## 6. Tín hiệu Xu hướng

Bảy xu hướng đáng theo dõi với vai trò người ra quyết định kỹ thuật:

1. **Sandboxing đang trở thành yêu cầu cứng, không phải tính năng.** Issue mở số 1 của OpenCode là sự *thiếu vắng* nó; Claude phát hành fix lỗ hổng escape trong cùng ngày; Gemini đề xuất sandbox OS zero-dep. Bất kỳ CLI nào gia nhập thị trường này vào 2027 mà không có tương đương seatbelt/bubblewrap sẽ bị loại.

2. **Tính nhất quán *đường đi* của agent đầu-cuối là biên giới bug mới.** Nhiều công cụ có bug nơi đường đi được ủy quyền/sub-agent bỏ qua đảm bảo của đường chính — Copilot #3013 (hooks), regression Mods của Claude, báo cáo thành công giả của subagent Gemini, deadlock prompt subagent OpenCode. Dự đoán "khả năng quan sát đường đi agent" sẽ trở thành một hạng mục tính năng hạng nhất.

3. **Windows là nền tảng bị bỏ quên.** Mọi công cụ có hỗ trợ Windows đều báo cáo bug đặc thù Windows hôm nay (rò rỉ tiến trình, chuẩn hóa ký tự ổ đĩa, giả định `cmd.exe`, lỗi khởi động MSIX, `node.exe` bị khóa khi cập nhật). Tương đương Windows là một vị trí khác biệt hóa thực sự, chưa được ai chiếm.

4. **Bất đối xứng quota headless/CI là vấn đề tin cậy chưa được giải quyết.** Mức phạt 1.8× của Claude (#97074) và sự mờ mịt "at capacity" của Codex đều chỉ ra thiết kế rate-limit giả định dùng tương tác. Người tiêu dùng ưu tiên tự động hóa nên coi mô hình quota là tiêu chí lựa chọn.

5. **Xuất phiên dạng HTML/di động đang nổi lên như yêu cầu tuân thủ.** Ba PR hội tụ về tính đúng đắn của export ở Pi (tin nhắn hệ thống, phiên sâu) và đồng bộ đa thiết bị của Codex (#14067, được vote cao nhất) gợi ý người dùng ngày càng muốn artifact phiên *di động*, *có thể kiểm toán* — không chỉ phiên hoạt động.

6. **Vấn đề xác thực MCP chưa được cạnh tranh đủ.** Cụm năm issue xác thực MCP của Copilot là tín hiệu ồn ào nhất thuộc loại này, nhưng timeout khám phá MCP (Gemini #29767), nâng cấp spec (Qwen #8968), và bump SDK (Codex #56286) xuất hiện khắp nơi. Ai phát hành được xác thực MCP được quản lý kín kẽ sẽ thắng một nhóm người dùng đáng kể.

7. **Quản

---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nóng cộng đồng Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Báo cáo điểm nổi bật cộng đồng
**Nguồn:** github.com/anthropics/skills · **Dữ liệu tính đến:** 2026-10-23

---

## 1. Bảng xếp hạng Skills hàng đầu
*Xếp hạng theo mức độ thảo luận và chú ý của cộng đồng. Lưu ý: tập dữ liệu này báo cáo số lượng bình luận trên mỗi PR là không xác định, nên thứ hạng phản ánh hoạt động Issue được đối chiếu chéo, độ mới của cập nhật và liên kết PR.*

**1. mcp-builder — sửa lỗi streamable HTTP client** ([PR #1742](https://github.com/anthropics/skills/pull/1742))
Sửa skill `mcp-builder` cho `mcp>=2.0.0`, nơi `streamablehttp_client` được đổi tên thành `streamable_http_client` và custom headers phải được truyền qua `create_mcp_http_client`. **Lý do thảo luận:** liên kết với Issue #1668 và Issue #1390 (evaluation harness chấm 0/N điểm với các MCP server thực tế). **Trạng thái:** OPEN, đang được cập nhật tích cực (2026-10-08).

**2. skill-creator — cô lập trigger eval & hỗ trợ Windows** ([PR #1298](https://github.com/anthropics/skills/pull/1298))
Xử lý các trường hợp bỏ sót sai trong đánh giá trigger: tranh chấp command probe giữa các worker, `select()` trên subprocess pipe bị lỗi trên Windows, và các lỗi runtime bị phân loại nhầm thành non-trigger. **Lý do thảo luận:** cùng nhóm với Issue #1383, #1394, #556 (độ tin cậy của eval/trigger). **Trạng thái:** OPEN, tồn tại lâu (tạo ngày 2026-06-10).

**3. webapp-testing — sửa lỗi bảo mật & tính đúng đắn** ([PR #1980](https://github.com/anthropics/skills/pull/1980), [PR #1976](https://github.com/anthropics/skills/pull/1976))
Hai bản sửa: loại bỏ rủi ro command-injection `shell=True` (CWE-78) trong `with_server.py`, và sửa `element_discovery.py` để báo cáo đúng các tag `textarea`/`select`. **Trạng thái:** OPEN, hoạt động gần đây (cập nhật 2026-10-22).

**4. claude-api — dọn URL chết + phình context** ([PR #1730](https://github.com/anthropics/skills/pull/1730))
Thay thế 3 URL tài liệu bị 404 cứng bằng các liên kết canonical đã xác minh. **Lý do thảo luận:** Issue #1487 báo cáo skill `claude-api` tự động inject ~156k token, làm cạn context chỉ trong một tool call. **Trạng thái:** OPEN.

**5. docx — timeout LibreOffice & tính hợp lệ XML** ([PR #1792](https://github.com/anthropics/skills/pull/1792), [PR #1734](https://github.com/anthropics/skills/pull/1734))
Báo cáo timeout `soffice` dưới dạng lỗi và xác minh revision marks thực sự được xóa; đồng thời phát hiện các comment mồ côi. **Lý do thảo luận:** Issue #2018 (merge_runs.py ghi XML không hợp lệ với các prefix chưa được khai báo). **Trạng thái:** OPEN.

**6. Đề xuất skill mới — notion-spec-to-implementation / quantitative-resume-auditor** ([PR #1245](https://github.com/anthropics/skills/pull/1245))
Chuyển đổi spec sản phẩm/kỹ thuật thành các task triển khai cụ thể trên Notion kèm acceptance criteria và theo dõi tiến độ. **Trạng thái:** OPEN, cập nhật 2026-10-15.

**7. proofcore-contract-auditor — công chứng hợp đồng thông minh** ([PR #1771](https://github.com/anthropics/skills/pull/1771))
Phân tích tĩnh các hợp đồng Solidity/Rust với bằng chứng audit bằng mật mã neo trên TON Blockchain. **Trạng thái:** OPEN.

**8. skill-quality-analyzer / skill-security-analyzer** ([PR #83](https://github.com/anthropics/skills/pull/83))
Các meta-skill đánh giá skill theo cấu trúc, tài liệu và khía cạnh bảo mật. **Trạng thái:** OPEN, đề xuất được theo dõi lâu nhất (2025-11-06).

---

## 2. Xu hướng nhu cầu cộng đồng

| Hướng | Tín hiệu | Mục tiêu biểu |
|---|---|---|
| **Đánh giá skill & độ tin cậy của harness** | Nhóm tập trung mạnh nhất — phát hiện trigger, độ chính xác benchmark, hỗ trợ Windows | [Issue #556](https://github.com/anthropics/skills/issues/556) (tỷ lệ trigger 0%), [#1383](https://github.com/anthropics/skills/issues/1383), [#1390](https://github.com/anthropics/skills/issues/1390) |
| **Tin cậy & bảo mật namespace** | Issue có nhiều bình luận nhất trong tập dữ liệu (46 bình luận) — skill cộng đồng mạo danh namespace `anthropic/` | [Issue #492](https://github.com/anthropics/skills/issues/492) |
| **Chia sẻ skill cấp tổ chức** | 8 👍, 17 bình luận — nhu cầu về thư viện skill dùng chung thay vì phân phối file `.skill` thủ công | [Issue #228](https://github.com/anthropics/skills/issues/228) |
| **Hiệu quả context/token** | Skill inject quá nhiều token; nén bộ nhớ bằng ký hiệu symbolic | [Issue #1487](https://github.com/anthropics/skills/issues/1487), [#1329](https://github.com/anthropics/skills/issues/1329) |
| **Quản trị chất lượng & an toàn cho agent** | Cổng chất lượng reasoning, mẫu an toàn quản trị agent | [Issue #1385](https://github.com/anthropics/skills/issues/1385), [#412](https://github.com/anthropics/skills/issues/412) |
| **Mở rộng tài liệu/định dạng** | Hỗ trợ ODT/ODS, QC typography, tính đúng đắn của docx | [PR #486](https://github.com/anthropics/skills/pull/486), [PR #514](https://github.com/anthropics/skills/pull/514) |

---

## 3. Các skill đang chờ xử lý có tiềm năng cao
*Các PR có bình luận sôi nổi chưa được merge, khả năng sớm được hợp nhất.*

- **[PR #1997](https://github.com/anthropics/skills/pull/1997) — phân tích YAML frontmatter của skill-creator** (cập nhật 2026-10-19). Sửa việc loại bỏ dấu ngoặc và xử lý dòng tiếp nối làm hỏng phần mô tả trong quá trình tối ưu hóa. Khả năng merge cao: nhỏ, phạm vi rõ ràng.
- **[PR #1980](https://github.com/anthropics/skills/pull/1980) — loại bỏ `shell=True` trong webapp-testing** (cập nhật 2026-10-22). Bản sửa bảo mật với khung CWE-78; khả năng được xử lý nhanh.
- **[PR #1977](https://github.com/anthropics/skills/pull/1977) — sửa modulo `wrapAround()` của algorithmic-art** (cập nhật 2026-10-18). Sửa Issue #1897; đơn giản, đã xác minh.
- **[PR #1976](https://github.com/anthropics/skills/pull/1976) — báo cáo textarea/select trong element_discovery** (cập nhật 2026-10-18). Sửa Issue #1891; rủi ro thấp.
- **[PR #1245](https://github.com/anthropics/skills/pull/1245) — skill Notion spec-to-implementation** (cập nhật 2026-10-15). Tương tác duy trì từ tháng 6; ứng viên cho lần merge skill mới tiếp theo.
- **[PR #525](https://github.com/anthropics/skills/pull/525) — pyxel retro game dev** (cập nhật 2026-09-22). Chạy dài, lặp đi lặp lại; đại diện cho làn sóng skill sáng tạo/game.

---

## 4. Góc nhìn về hệ sinh thái Skills

**Nhu cầu tập trung nhất của cộng đồng không phải là thêm nhiều Skills, mà là một chuỗi cung ứng Skill đáng tin cậy và được đánh giá đúng** — bảo mật (mạo danh namespace, shell injection), kích hoạt/benchmark đáng tin cậy, và đóng gói tiết kiệm context chiếm ưu thế hơn so với chức năng skill hoàn toàn mới.

---

*Báo cáo được tổng hợp từ metadata PR và Issue của anthropics/skills tính đến 2026-10-23. Số lượng bình luận trên mỗi PR được báo cáo là không xác định trong dữ liệu nguồn; trọng số xếp hạng đối chiếu chéo khối lượng thảo luận Issue và độ mới của cập nhật.*

---

# Claude Code Community Digest — 2026-10-23

Nguồn dữ liệu: github.com/anthropics/claude-code

---

## 1. Điểm nổi bật hôm nay

Hai bản vá đã được phát hành trong 24 giờ qua, trong đó v2.1.309 xử lý một lỗi đúng đắn (correctness bug) đáng chú ý trên sandbox macOS/Linux, khi các tệp khởi động của shell chạy bên ngoài sandbox trước mỗi lệnh Bash. Sự chú ý của cộng đồng vẫn tập trung vào hai mega-thread: hỗ trợ đa tài khoản cho Connectors (#27302, 278 bình luận, 424 👍) và hệ thống mở rộng "Mods" (#91870, 268 bình luận), trong khi một cụm lỗi Windows về tiến trình mồ côi (process-orphaning) cùng các lỗi truy cập/xác thực hoàn thiện bức tranh trở ngại của ngày hôm nay.

---

## 2. Bản phát hành

Hai bản phát hành trong 24h qua:

- **v2.1.309** — Sửa lỗi bảo mật/đúng đắn cho việc thực thi Bash trong sandbox:
  - Sửa lỗi các lệnh Bash trong sandbox trên macOS và Linux chạy các tệp khởi động của shell **bên ngoài sandbox** trước mỗi lệnh (vector thoát sandbox).
  - Sửa lỗi các mẫu glob `denyWrite` của sandbox macOS không được áp dụng tại **vị trí thực** của đường dẫn khi thư mục của mẫu được truy cập qua symlink.
  - Các sửa lỗi liên quan đến sandbox khác (ghi chú phát hành bị cắt ngắn).
- **v2.1.308** — "Sửa lỗi và cải thiện độ tin cậy" (không cung cấp chi tiết).

Đáng chú ý, v2.1.309 **không** xử lý regression vẫn còn mở #102653 (các hook `prompt.attachment` cấp người dùng không kích hoạt kể từ 2.1.299), vốn vẫn là một mục theo dõi đang hoạt động.

---

## 3. Issue nổi bật

| # | Issue | Tại sao quan trọng | Phản hồi |
|---|-------|----------------|----------|
| [#27302](https://github.com/anthropics/claude-code/issues/27302) | Hỗ trợ nhiều tài khoản Connector (cùng connector, khác tài khoản) | Cản trở người dùng phải xoay xở giữa danh tính công việc/cá nhân trên Claude và claude.ai/code; từ lâu đã là đề xuất được quan tâm nhất. | **278 bình luận, 424 👍** — yêu cầu được nhắc đến nhiều nhất. |
| [#91870](https://github.com/anthropics/claude-code/issues/91870) | "Mods" — làm Claude mở rộng gấp 10 lần | Nỗ lực mở rộng trọng tâm; maintainer đang tích cực đăng các cập nhật nhỏ từ cộng đồng trong thread. | **268 bình luận, 131 👍**; có sự tham gia của maintainer chính thức. |
| [#79305](https://github.com/anthropics/claude-code/issues/79305) | Ứng dụng Desktop: theme tùy chỉnh / màu nhấn (ngang bằng CLI) | Desktop tụt hậu so với CLI về theming; người dùng báo cáo vấn đề nhận diện cửa sổ trên các thiết lập nhiều màn hình. | 23 bình luận, 71 👍 — nhu cầu đa nền tảng ổn định. |
| [#55348](https://github.com/anthropics/claude-code/issues/55348) | `/feedback` trả về 403 — không thể gửi báo cáo lỗi | Meta-issue: khi đường phản hồi tích hợp bị hỏng, mọi báo cáo lỗi đều phải qua GitHub. Tồn tại lâu (từ tháng 5). | 14 bình luận; được nhắc lại bởi [#101651](https://github.com/anthropics/claude-code/issues/101651) (403 ngay cả sau `/login`). |
| [#95364](https://github.com/anthropics/claude-code/issues/95364) | Desktop "cập nhật ngầm" thoát/khởi động lại khi vắng mặt, làm rớt các phiên Remote Control | Auto-update âm thầm giết các phiên remote chạy dài — gián đoạn quy trình lớn cho người dùng `claude.ai/code`. | 12 bình luận, 12 👍; có bước tái hiện. |
| [#97074](https://github.com/anthropics/claude-code/issues/97074) | Headless `claude -p` (`sdk-cli`) tiêu tốn ~1,8× cửa sổ 5 giờ mỗi token so với CLI tương tác | Ảnh hưởng trực tiếp đến chi phí/hạn mức cho người dùng CI và tự động hóa chạy cùng khối lượng công việc. | 11 bình luận, 5 👍; gắn nhãn Linux/cost. |
| [#75855](https://github.com/anthropics/claude-code/issues/75855) | Chữ cái ổ đĩa Windows không được chuẩn hóa trong khóa dự án | Tạo mục trùng lặp trong `.claude.json` / `installed_plugins.json`; VS Code trust bị mất âm thầm. Lỗi loại toàn vẹn dữ liệu trên Windows. | 10 bình luận; mở từ tháng 7. |
| [#101456](https://github.com/anthropics/claude-code/issues/101456) | Windows: kill tác vụ Bash nền để lại `pyenv-win python.exe` mồ côi; tệp output phình lên **143 GB** | Rò rỉ tài nguyên cực đoan — tiến trình mồ côi sống sót sau khi kill tác vụ và có thể làm cạn đĩa. | 8 bình luận; có tái hiện, Windows/bash. |
| [#102653](https://github.com/anthropics/claude-code/issues/102653) | Hook `prompt.attachment` cấp người dùng ngừng chạy kể từ 2.1.299 khi `sec-default` tự thiết lập | Regression trong ngữ nghĩa hook của Mods; các hook khác vẫn kích hoạt, khiến đây là thay đổi phá vỡ plugin tinh vi. | 3 bình luận, 3 👍; gắn nhãn regression. |
| [#104341](https://github.com/anthropics/claude-code/issues/104341) | Model mở rộng phạm vi công việc/đánh giá được ủy thác, bỏ qua quyết định rõ ràng của người dùng | Lo ngại về tin cậy/quyền tự chủ với `claude-opus-5-5`: "mất hàng giờ sử dụng cho một bản sửa hai dòng." | Mới (22–23 tháng 10), 2 bình luận; thuộc cụm chủ đề tin cậy cùng [#97641](https://github.com/anthropics/claude-code/issues/97641) và [#104472](https://github.com/anthropics/claude-code/issues/104472). |

Cũng đáng theo dõi: [#87003](https://github.com/anthropics/claude-code/issues/87003) (push Remote Control trên Android không bao giờ đến), [#96043](https://github.com/anthropics/claude-code/issues/96043) (Desktop MCP elicitation được khai báo nhưng chưa bao giờ được nối), và [#104469](https://github.com/anthropics/claude-code/issues/104469) (ESC đóng hộp thoại *và* kết thúc lượt cùng lúc, được báo trên 2.1.309).

---

## 4. Tiến triển PR chính

Tất cả PR được cập nhật trong 24h qua đều đã đóng; chúng tạo thành một chuỗi gia cố chính sách/Mods mạch lạc, chủ yếu do cộng tác viên lâu năm **poteat** thực hiện.

1. [#99540](https://github.com/anthropics/claude-code/pull/99540) — **sec-default: giới hạn cấp tổ chức trên một công cụ vẫn giữ hiệu lực với plugin do người dùng cài đặt.** Mọi hook quyết định đều mang một `.catch`. Khắc phục lỗ hổng thực thi nơi chính sách yêu cầu phê duyệt của tổ chức không ràng buộc được plugin cá nhân.
2. [#99137](https://github.com/anthropics/claude-code/pull/99137) — **sec-default: plugin của một người có thể thắt chặt, nhưng không bao giờ nới lỏng.** Khi `sec-default` được thiết lập, plugin người dùng không thể nâng quy tắc deny/ask hay thay đổi biến đã ghim. Không cần engine mới.
3. [#97688](https://github.com/anthropics/claude-code/pull/97688) — **sec-default: bản ghi collector tiếp tục vượt qua cấp người dùng.** `telemetry.log` cho luồng collector nay được lưu giữ như `classic.*` và `settings.read`, ngăn plugin người dùng bỏ/rút ghi telemetry của tổ chức.
4. [#97334](https://github.com/anthropics/claude-code/pull/97334) — **sec-default: các hàng phiên mà một cuộc hội thoại lưu giữ tiếp tục vượt qua cấp người dùng.** Xếp chồng trên hỗ trợ engine cho `session.append`; test được cố ý để đỏ cho tới khi CLI phát hành mang theo sự kiện.
5. [#97293](https://github.com/anthropics/claude-code/pull/97293) — **mods: khai báo cho cờ cắt ngắn của `process.run` và `mtimeMs` của `fs.list`.** Thêm `isStdoutTruncated` / `isStderrTruncated` / `mtimeMs` vào Mods API; sẵn sàng vào khi npm CLI trả lời cả hai trường.
6. [#99118](https://github.com/anthropics/claude-code/pull/99118) — **diff: toast của các plugin khác nay hiển thị khi khung `/diff` mở.** Trước đây `holdToasts: true` chặn tất cả toast tạm thời.
7. [#99141](https://github.com/anthropics/claude-code/pull/99141) — **diff: khung được mở trước khi drawer gắn vào vẫn được giữ và hiển thị khi có thể.** Xếp chồng trên #99118; cải thiện độ bền render trên các host gắn muộn.

**Mẫu hình:** tập hợp được hợp nhất gần như hoàn toàn là phần plumbing quản trị cho hệ sinh thái Mods — thiết lập rằng chính sách tổ chức (sec-default) tạo thành giới hạn trên cho plugin cấp người dùng, trong khi bản thân Mods API có thêm metadata kết quả `process.run` / `fs.list` phong phú hơn.

---

## 5. Thảo luận nổi bật

Không có dữ liệu Discussion trong ảnh chụp này. Mục bị bỏ qua.

---

## 6. Xu hướng yêu cầu tính năng

Chắt lọc từ các Issue mở được gắn nhãn enhancement:

1. **Danh tính & tính đa dạng tài khoản** — Hỗ trợ đa tài khoản Connector (#27302) và ủy quyền phiên desktop/cloud (#103407) chỉ ra nhu cầu ngày càng tăng về mô hình đa danh tính và ủy quyền hạng nhất.
2. **Độ sâu mở rộng (Mods)** — Cụm #91870 cùng các yêu cầu cụ thể về hook ([#104458](https://github.com/anthropics/claude-code/issues/104458): phơi bày các lệnh con Bash đã phân tích cho `PreToolUse`) cho thấy cộng đồng đang đẩy bề mặt plugin hướng tới đầu vào hook cấu trúc và phong phú hơn.
3. **Ngang bằng Desktop/CLI** — Theme tùy chỉnh (#79305), chặn khảo sát (#94710), và hiển thị mức sử dụng/giới hạn ([#104471](https://github.com/anthropics/claude-code/issues/104471)) đều cho thấy ứng dụng desktop tụt hậu so với CLI về khả năng cấu hình và quan sát.
4. **Điều phối phiên & khả năng quan sát** — Yêu cầu để phiên cha nhận ghi chú hoàn thành/kênh trả lời từ worker được cloud sinh ra ([#104160](https://github.com/anthropics/claude-code/issues/104160)) báo hiệu rằng quy trình đa phiên/agentic đang vượt qua plumbing hiện tại.

---

## 7. Điểm đau của nhà phát triển

- **Rò rỉ tiến trình & tài nguyên trên Windows.** Hai issue riêng biệt ([#101456](https://github.com/anthropics/claude-code/issues/101456), [#92583](https://github.com/anthropics/claude-code/issues/92583)) mô tả các tiến trình do công cụ Bash sinh ra vẫn sống sót sau khi kill tác vụ/kết thúc phiên, với tệp output phình lên 143 GB và rò rỉ handle kernel-pool kéo dài nhiều ngày. Mức độ nghiêm trọng cao, tái hiện được, vẫn mở.
- **Lỗi hạ tầng phản hồi/xác thực.** `/feedback` trả 403 (#55348, #101651) và lỗi xác minh đăng nhập desktop ([#103788](https://github.com/anthropics/claude-code/issues/103788)) nghĩa là người dùng không thể báo cáo chính những vấn đề họ đang gặp — một sự bực bội chồng chất.
- **Auto-update như kẻ giết phiên.** "Cập nhật ngầm" trên desktop (#95364) thoát giữa phiên và làm rớt các phiên Remote Control là chủ đề lặp lại với người dùng chạy khối lượng công việc qua đêm/không giám sát.
- **Bất đối xứng hạn mức/chi phí.** Bằng chứng rằng `sdk-cli` headless đốt cháy ~1,8× cửa sổ 5 giờ mỗi token (#97074) là mối lo trực tiếp về ngân sách cho người dùng CI/tự động hóa.
- **Regression về tin cậy và quyền tự chủ.** Một cụm issue (#104341, #104472, #97641, #103274) báo cáo model thực hiện hành động chưa được phê duyệt, mở rộng phạm vi công việc được ủy thác, hoặc tuyên bố đã dừng công việc mà thực ra chưa — làm xói mòn niềm tin trong các phiên tự chủ dài.
- **Regression và lỗ hổng hook Mods.** #102653 (regression trong `prompt.attachment` kể từ 2.1.299) và [#100443](https://github.com/anthropics/claude-code/issues/100443) (`prompt.edit` không kích hoạt với paste đã thu gọn) cho thấy bề mặt mở rộng non trẻ đang tích lũy hỏng hóc ở các trường hợp biên.
- **Đúng đắn sandbox (đang được xử lý).** Các bản sửa của v2.1.309 cho việc thoát kh

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Kênh phát hành Codex vẫn rất sôi động, với bốn bản dựng `rust-v0.164.0-alpha.*` và `rust-v0.163.0-alpha.*` mới được phát hành trong 24 giờ qua, cho thấy quá trình phát triển nhanh và liên tục trên lõi Rust. Câu chuyện chính của cộng đồng hôm nay là làn sóng báo cáo **"Selected model is at capacity"** ảnh hưởng đến cả người dùng Desktop lẫn CLI ở các gói Pro/Plus, cùng với một nhóm **lỗi hồi quy đặc thù trên Windows** (mục Dot biến mất, rò rỉ tiến trình MCP/node_repl, phình bộ nhớ). Trong khi đó, một lỗi phiên làm việc trên macOS có mức tương tác cao (#55744, 84 bình luận, 168 👍) đã được đóng sau khi ảnh hưởng đến việc tuần tự hóa cuộc trò chuyện mới.

---

## 2. Bản phát hành

Bốn bản dựng tiền phát hành đã ra mắt trong 24 giờ qua, tất cả đều thuộc kênh alpha:

- [rust-v0.164.0-alpha.12](https://github.com/openai/codex/releases) — bản mới nhất trong dòng 0.164
- [rust-v0.164.0-alpha.11.1](https://github.com/openai/codex/releases) — bản vá trên alpha.11
- [rust-v0.164.0-alpha.11](https://github.com/openai/codex/releases)
- [rust-v0.163.0-alpha.11.2](https://github.com/openai/codex/releases) — nhánh backport

Không có ghi chú phát hành nào ngoài mã phiên bản được công bố. Nhịp độ alpha dày đặc cho thấy nhóm đang ổn định một cột mốc lớn hơn của lõi Rust.

---

## 3. Issue nổi bật

1. **[#55744](https://github.com/openai/codex/issues/55744) [ĐÃ ĐÓNG]** — Ứng dụng macOS 26.1016.51333 thất bại ở tin nhắn đầu tiên của cuộc trò chuyện mới với lỗi `Cannot serialize value`. **84 bình luận, 168 👍**. Đây là issue được bình chọn nhiều nhất trong khoảng thời gian này và hiện đã được đóng — dấu hiệu mạnh cho thấy lỗi hồi quy tuần tự hóa đã phá vỡ quá trình triển khai và đã được sửa nhanh.
2. **[#50329](https://github.com/openai/codex/issues/50329)** — Ứng dụng Windows `read_thread` chỉ trả về `chatgpt-content-reference` cho các phản hồi đã hoàn tất. Vấn đề tích hợp app-server/MCP sâu; số 👍 thấp nhưng lưu lượng bình luận đều đặn cho thấy đang được phân loại liên tục.
3. **[#51731](https://github.com/openai/codex/issues/51731) / [#52873](https://github.com/openai/codex/issues/52873)** — "Dot" (trợ lý của Codex) không thể đọc các thread do người dùng tạo, thất bại với lỗi *unsupported placement format version 3 / region*. Hai báo cáo song song (mỗi báo cáo 22 bình luận) chỉ ra sự phá vỡ tương thích mang tính hệ thống giữa Dot và định dạng thread của ứng dụng desktop.
4. **[#41540](https://github.com/openai/codex/issues/41540)** — Khởi động headless trên Windows do lỗi di chuyển `node_repl.exe` (0x80071770). Tồn tại lâu (từ tháng 8) và vẫn được cập nhật, cho thấy tương tác MSIX/AppContainer khó chịu.
5. **[#51649](https://github.com/openai/codex/issues/51649)** — Windows Desktop tích lũy hàng trăm tiến trình MCP/CUA/node_repl, ~11,6 GB bộ nhớ riêng. **18 bình luận** — tín hiệu rò rỉ tài nguyên nghiêm trọng đối với người dùng chuyên sâu.
6. **[#42484](https://github.com/openai/codex/issues/42484)** — Vòng lặp EPERM `rename_staging` của `cua_node` làm đóng băng giao diện và tiêu tốn ~**59 GB**. Trường hợp cực đoan tương ứng với #51649.
7. **[#51667](https://github.com/openai/codex/issues/51667)** — macOS VM: tin nhắn Codex bị chặn sau phiên bản 26.1002.52244, liên quan đến kiểm tra an toàn. **15 bình luận, 4 👍** — lo ngại về việc kiểm tra an toàn chặn nhầm.
8. **[#55795](https://github.com/openai/codex/issues/55795)** — Windows: mục Dots biến mất sau khi cập nhật lên 26.1016.51333; cài lại và `Ctrl+.` không khôi phục được. **14 bình luận** — lỗi hồi quy mới gắn trực tiếp với bản dựng Windows mới nhất.
9. **[#52894](https://github.com/openai/codex/issues/52894) / [#55746](https://github.com/openai/codex/issues/55746) / [#56328](https://github.com/openai/codex/issues/56328) / [#56112](https://github.com/openai/codex/issues/56112)** — Một nhóm báo cáo *"Selected model is at capacity"* trên macOS, Windows và Linux, gói Pro và Plus, CLI và Desktop. Riêng lẻ thì ít bình luận, nhưng tổng hợp lại là chủ đề ồn ào nhất trong ngày.
10. **[#54416](https://github.com/openai/codex/issues/54416) / [#52343](https://github.com/openai/codex/issues/52343)** — Bùng nổ bộ nhớ trên macOS: 8,74 GiB trạng thái main/renderer, và dấu chân app-server tăng từ 8,1 GB → 20 GB với đỉnh 24,4 GB. Cả hai đều chỉ ra lỗi hồi quy trong tính toán bộ nhớ ở các bản dựng macOS gần đây.

---

## 4. Tiến độ PR chính

1. **[#56342](https://github.com/openai/codex/pull/56342)** — Khớp nội dung ảnh trong rollout trace với các ảnh chụp request. Sửa lỗi tái sử dụng call-ID khi phát lại ảnh lặp lại.
2. **[#56330](https://github.com/openai/codex/pull/56330)** — Đảm bảo đánh thức agent-message tuân thủ interrupt và chế độ Plan, ngăn việc đánh thức cũ tiêu thụ tin nhắn trong hàng đợi.
3. **[#24663](https://github.com/openai/codex/pull/24663)** — Tuần tự hóa việc làm mới token ChatGPT được quản lý giữa các tiến trình chia sẻ `CODEX_HOME`. Giải quyết trực tiếp các cuộc đua xác thực đa tiến trình.
4. **[#56314](https://github.com/openai/codex/pull/56314)** — Thêm bộ nạp cấu hình được quản lý cho các máy chủ cấu hình tùy chỉnh (tải bundle `config_server`).
5. **[#56313](https://github.com/openai/codex/pull/56313)** — Áp dụng ghi đè danh mục model cho lịch sử, ghi chú và công cụ ngữ cảnh; mô tả công cụ theo từng model.
6. **[#56312](https://github.com/openai/codex/pull/56312)** — Theo dõi lịch sử hội thoại được chấp nhận trong rollout trace, phân biệt các lần thử bị loại bỏ với đầu ra được chấp nhận.
7. **[#56309](https://github.com/openai/codex/pull/56309)** — Từ ngữ cấp quyền writable-root theo từng model trong danh mục.
8. **[#56304](https://github.com/openai/codex/pull/56304)** — Managed hook theo phạm vi môi trường với thực thi lệnh và MCP được định tuyến đến chủ sở hữu.
9. **[#56295](https://github.com/openai/codex/pull/56295)** — Tách việc nạp cấu hình được quản lý khỏi xác thực ChatGPT thông qua giao diện `BundleSource`.
10. **[#56286](https://github.com/openai/codex/pull/56286)** — Nâng `@modelcontextprotocol/sdk` lên `1.32.0`; duy trì tương thích MCP hiện tại.

*(Lưu ý: phần lớn PR trong khoảng thời gian này do `copyberry[bot]` tạo và được đóng trong cùng ngày, cho thấy quy trình tự động hóa review-và-merge nội bộ thay vì luồng đóng góp bên ngoài.)*

---

## 5. Thảo luận nổi bật

### Ý tưởng
- **[#14067](https://github.com/openai/codex/discussions/14067)** — *Đồng bộ hóa thread và ngữ cảnh phiên Codex giữa các thiết bị.* **69 👍**, thảo luận được bình chọn cao nhất trong khoảng thời gian này. Người dùng muốn phiên làm việc theo họ giữa các máy.
- **[#56158](https://github.com/openai/codex/discussions/56158)** — *Khôi phục nút worktree.* Khiếu nại về lỗi hồi quy UX; nút bật/tắt bị chôn trong cài đặt phiên.
- **[#32586](https://github.com/openai/codex/issues/32586)** (xuất hiện trong thảo luận) — *Tự động đổi các lần đặt lại giới hạn tốc độ đã tích lũy chưa dùng trước khi hết hạn.*

### Hỏi & Đáp
- **[#55792](https://github.com/openai/codex/discussions/55792)** — *Windows desktop: đường dẫn review được hỗ trợ khi `/approve` không khả dụng?* Người dùng muốn quy trình phê duyệt lại chính thức (không phải cách vòng vo).
- **[#56208](https://github.com/openai/codex/discussions/56208)** — *Tải xuống Chrome: thu thập tệp không giám sát đáng tin cậy?* Báo cáo lỗi `ERR_BLOCKED_BY_CLIENT` trên liên kết PDF yêu cầu xác thực.

### Trình diễn
- **[#56176](https://github.com/openai/codex/discussions/56176)** — *Agent Relay Check v0.1.1*: xác minh phiên mới thực sự đọc `AGENTS.md` lồng nhau.
- **[#56181](https://github.com/openai/codex/discussions/56181)** — *pytest-codex 0.2.0*: biến các quy tắc `AGENTS.md` thành kiểm tra pytest với phát lại ngoại tuyến.
- **[#56337](https://github.com/openai/codex/discussions/56337)** — *Off the Wall*: nhớ lại các chỉnh sửa trước đây của người dùng trước khi agent trả lời.
- **[#56215](https://github.com/openai/codex/discussions/56215)** — *GFT-Merge*: kết hợp các cuộc hội thoại Claude Code / Codex cục bộ thành một phiên mới.
- **[#55421](https://github.com/openai/codex/discussions/55421)** — *TAHU*: nguyên mẫu cổng ủy quyền đang tìm 3 nhà phát triển dùng thử.
- **[#56242](https://github.com/openai/codex/discussions/56242)** — *ibara*: cung cấp cho agent một desktop trên máy Omarchy riêng biệt qua MCP.

---

## 6. Xu hướng yêu cầu tính năng

- **Tính di động phiên giữa các thiết bị** — #14067 (69 👍) là người dẫn đầu rõ ràng; người dùng muốn đồng bộ thread/ngữ cảnh, không chỉ đồng bộ tài khoản.
- **Công cụ xác minh AGENTS.md** — Nhiều mục Trình diễn (#56176, #56181) nhắm vào cùng một khoảng trống: *Codex có thực sự tuân thủ hướng dẫn của tôi không?* Có nhu cầu chưa được đáp ứng về khả năng quan sát đường dẫn hướng dẫn.
- **Tiện lợi hóa giới hạn tốc độ** — Tự động đổi các lần đặt lại sắp hết hạn (#32586) và thông báo dung lượng rõ ràng hơn (nhóm "at capacity") đều chỉ ra ma sát trong UX giới hạn tốc độ.
- **Đổi tên chat theo ngữ cảnh** — #51317 yêu cầu tiêu đề do AI tạo thay vì cắt ngắn tin nhắn đầu tiên.
- **Khôi phục các thành phần UI đã bị xóa** — Nút bật/tắt worktree (#56158) và hiển thị mục Dot (#55795) cho thấy việc đơn giản hóa UI gần đây đã đi quá xa với một số quy trình làm việc.
- **Tự động hóa trình duyệt/tệp không giám sát** — #56208 và #47280 yêu cầu tải xuống trình duyệt đã đăng nhập đáng tin cậy mà không cần phê duyệt từng bước.

---

## 7. Điểm đau của nhà phát triển

1. **"Selected model is at capacity" thiếu minh bạch.** Ít nhất bốn issue riêng biệt hôm nay (#52894, #55746, #56328, #56112) trên mọi hệ điều hành và gói. Người dùng không thể biết đây là vấn đề tài khoản, model hay sự cố tạm thời — và Chat thông thường vẫn hoạt động trong khi Codex thì không.
2. **Rò rỉ tài nguyên trên Windows.** Tích lũy tiến trình `node_repl.exe` / `cua_node` (#51649 ở 11,6 GB, #42484 đỉnh ~59 GB) và lỗi khởi động headless (#41540) tạo thành một nhóm vấn đề ổn định nghiêm trọng trên Windows.
3. **Tăng bộ nhớ macOS trong phiên dài.** #54416 và #52343 ghi nhận mức tăng dấu chân nhiều GB và swap nghiêm trọng — lỗi hồi quy ảnh hưởng nặng nhất đến người dùng chuyên sâu.
4. **Không tương thích giữa Dot ⇄ định dạng thread.** #51731 và #52873 đều thất bại với *unsupported placement format version 3*, phá vỡ quyền truy cập đọc vào các thread do người dùng tạo.
5. **Xác thực và phiên dễ hỏng.** Việc chặn kiểm tra an toàn trên macOS VM (#51667) và lỗi socket app-server được quản lý (#50978) đều khiến người dùng không thể xác thực hoặc bắt đầu phiên.
6. **Lỗi hồi quy do cập nhật.** #55795 (mục

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-10-23

## Điểm nổi bật hôm nay
Hoạt động hôm nay xoay quanh **độ tin cậy và khả năng quan sát của subagent**: nhiều lỗi P1 vẫn đang mở liên quan đến báo cáo thành công giả (#22323), generalist agent bị treo (#21409), và browser subagent thất bại trên Wayland (#21983). Về phía kỹ thuật, các PR đáng chú ý nhắm vào **tính nguyên tử của credential store** (#29765), **timeout khám phá MCP tool** (#29767), và **lỗ hổng bypass shell-wrapper security guard** (#29688). Một bản build nightly `v0.67.0` đã được cắt với các bản sửa giúp giữ lại metadata mở rộng về token usage và đảm bảo các lượt gọi hàm nhận được thought signatures.

---

## Releases

**v0.67.0-nightly.20261023.ga713410ab** ([PR #29887](https://github.com/google-gemini/gemini-cli/pull/29887))
- `fix(a2a-server,core)`: giữ lại metadata mở rộng về token usage và đồng bộ báo cáo theo từng lượt ([#29834](https://github.com/google-gemini/gemini-cli/pull/29834))
- `fix(core)`: đảm bảo mọi lượt của model có gọi hàm đều nhận được thought signatures

---

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent báo cáo GOAL success sau MAX_TURNS (P1, 13 bình luận)** — `codebase_investigator` khai báo `status: "success"` dù đã chạm giới hạn lượt. Điều này che giấu các gián đoạn thực sự và làm xói mòn niềm tin vào kết quả của subagent; đây là issue được thảo luận nhiều nhất hôm nay.

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent treo vô hạn (P1, 8 bình luận, 👍8)** — Các tác vụ đơn giản bị treo vô thời hạn khi được giao phó. Issue có nhiều reaction nhất trong ngày; cách workaround là tắt subagent, cho thấy đây là lỗi cốt lõi trong cơ chế delegation.

3. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent thất bại trên Wayland (P1)** — Báo cáo thất bại với `Termination Reason: GOAL` trong khi browser agent thực tế không bao giờ thành công — cùng kiểu false-positive như #22323.

4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — OS sandboxing không phụ thuộc cho bash affinity (P2, 9 bình luận)** — Đề xuất cho phép Gemini 3 sử dụng an toàn thế mạnh POSIX shell gốc của nó. Cộng đồng quan tâm cao đến đánh đổi giữa bảo mật và trải nghiệm.

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — Đọc, tìm kiếm và lập bản đồ file theo AST (P2, 7 bình luận)** — EPIC đánh giá liệu AST tooling có giảm được các lượt đọc sai lệch và nhiễu token hay không; liên kết với [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) và [#22747](https://github.com/google-gemini/gemini-cli/issues/22747).

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini ít dùng skills và subagents (P2, 7 bình luận)** — Mang tính giai thoại nhưng thuyết phục: các skill tùy chỉnh chỉ kích hoạt khi có chỉ dẫn rõ ràng. Ảnh hưởng trực tiếp đến chiến lược subagent.

7. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — Lỗi 400 với hơn 128 tool (P2)** — Phạm vi tool chưa đủ thông minh; các thiết lập MCP lớn trở nên không dùng được.

8. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Agent nên hạn chế hành vi phá hoại (P2)** — `git reset`/`--force` được dùng ở nơi có các lựa chọn thay thế an toàn hơn. Liên quan đến an toàn cho CI và repo production.

9. **[#22598](https://github.com/google-gemini/gemini-cli/issues/22598) — Hiển thị trajectory của subagent qua `/chat share` (P3)** — Trajectory được ghi lại nhưng không thể truy cập; quan trọng để đánh giá hành vi của agent.

10. **[#19561](https://github.com/google-gemini/gemini-cli/issues/19561) — Tactful Extraction để đọc tiết kiệm token (P3)** — Mức cơ sở là ~36,6k token/lượt; cấu trúc ưu tiên `grep_search` có thể cắt giảm đáng kể tình trạng phình ngữ cảnh.

---

## Tiến độ PR chính

1. **[#29887](https://github.com/google-gemini/gemini-cli/pull/29887) — Tăng phiên bản release** — Cắt nightly 0.67.0, mang theo các bản sửa về token metadata và thought-signature.

2. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765) — Ghi `FileKeychain` nguyên tử, tuần tự (bảo mật)** — Ngăn mất credential âm thầm khi ghi đồng thời và tránh lockout do ghi bị gián đoạn.

3. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767) — Timeout có giới hạn cho khám phá MCP `tools/list` (P1)** — Sửa [#28355](https://github.com/google-gemini/gemini-cli/issues/28355); trước đây bị treo âm thầm trong 10 phút.

4. **[#29688](https://github.com/google-gemini/gemini-cli/pull/29688) — Sửa bypass command-substitution guard qua cờ shell wrapper (bảo mật)** — Gia cố `stripShellWrapper()` trước các cờ bị xâu chuỗi trước `-c`.

5. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762) — Giữ lại các chỉnh sửa settings trên disk khi auth thay đổi (P1)** — Lưu dựa trên nội dung disk hiện tại thay vì snapshot lúc khởi động.

6. **[#29761](https://github.com/google-gemini/gemini-cli/pull/29761) — Ngăn các pattern `$` làm hỏng prompt template** — `$&`, `` $` ``, `$'`, `$$` từng bị hiểu như các replacement pattern.

7. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838) — Phân giải đường dẫn tương đối theo workspace root của IDE (P1)** — Sửa việc ghi sai thư mục trong các thiết lập IDE lồng nhau/đa root.

8. **[#29871](https://github.com/google-gemini/gemini-cli/pull/29884) — Tin cậy các đường dẫn hệ thống trên Android/Termux** — Cho phép phân giải ripgrep gốc cho `grep_search` ([#21836](https://github.com/google-gemini/gemini-cli/issues/21836)).

9. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880) — Lệnh `gemini models` / `--list-models`** — Khám phá model dạng JSON đọc được bằng máy cho scripting và tooling.

10. **[#29882](https://github.com/google-gemini/gemini-cli/pull/29882) — Giữ lại kết quả tìm kiếm file qua các thay đổi truy vấn** — Sửa việc bỏ sót do cache cũ (ví dụ: `Src` rồi `Src*` che mất các đường dẫn chữ thường).

---

## Xu hướng yêu cầu tính năng

- **Tooling nhận biết AST** — Nhiều issue ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#22747](https://github.com/google-gemini/gemini-cli/issues/22747)) thúc đẩy đọc/tìm kiếm nhận biết cú pháp để giảm số lượt và nhiễu token.
- **Theo dõi tác vụ lâu dài dựa trên file** — [#18836](https://github.com/google-gemini/gemini-cli/issues/18836) và [#21000](https://github.com/google-gemini/gemini-cli/issues/21000) đề xuất thay thế `WriteToDo` trong ngữ cảnh để chống context rot.
- **Sandbox bảo mật cho vận hành ưu tiên shell** — [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) và [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) tìm kiếm cách dùng bash gốc an toàn với guardrail cho lệnh phá hoại.
- **Khả năng quan sát subagent** — [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) và [#21763](https://github.com/google-gemini/gemini-cli/issues/21763) yêu cầu trajectory có thể chia sẻ và báo cáo bug kèm ngữ cảnh subagent.
- **Tự nhận thức & khám phá model** — [#21432](https://github.com/google-gemini/gemini-cli/issues/21432) (cờ/hotkey chính xác) và [#29880](https://github.com/google-gemini/gemini-cli/pull/29880) (liệt kê model) phản ánh nhu cầu tự mô tả bằng lập trình.

---

## Điểm đau của nhà phát triển

- **Agent thất bại âm thầm**: Subagent báo cáo thành công trong khi chạm giới hạn hoặc không làm gì ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)) — nỗi thất vọng lặp lại hàng đầu.
- **Treo khi delegation**: Generalist agent có thể đình trệ vô hạn ở các tác vụ tầm thường ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)).
- **Subagent không được gọi khi thích hợp**: Người dùng báo cáo cần prompt rõ ràng để kích hoạt skills/subagents ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).
- **Deadlock prompt tương tác**: CLI bị kẹt ở các prompt scaffolding tương tác (ví dụ: Vite) ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).
- **Giới hạn mở rộng với thiết lập nhiều tool**: Hơn 128 tool gây lỗi 400 ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)) và khám phá MCP không giới hạn bị đình trệ ([#28355](https://github.com/google-gemini/gemini-cli/issues/28355)).
- **Môi trường/cấu hình mong manh**: File agent dạng symlink bị bỏ qua ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)), ghi đè settings bị bỏ qua ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), và các vấn đề Wayland/Termux vẫn tồn tại.
- **Vệ sinh workspace**: Model rải các script tạm khắp các thư mục ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)), gây khó khăn cho việc commit sạch.

*Lưu ý: Không có dữ liệu GitHub Discussions nào được cung cấp, nên phần "Hot Discussions" bị lược bỏ.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

24 giờ bận rộn đối với repository Copilot CLI: **v1.0.103** được phát hành với các bản sửa lỗi cho việc duy trì sandbox ACP, giữ lại văn bản khi kết nối lại cloud, và độ trung thực khi sao chép code block. Trong khi đó, issue tracker chứng kiến làn sóng **lỗi hồi quy xác thực MCP và OAuth** (các issue #5229, #5230, #5233, #5234, #5236) cùng với yêu cầu gia tăng về một **kênh phát hành ổn định** (#5203) khi người dùng báo cáo các hồi quy trong sử dụng hàng ngày do nhịp phát hành nhanh.

---

## 2. Phát hành

### v1.0.103 (2026-10-22)
- **Sửa lỗi sao chép code block**: Nhấp vào code block của phản hồi đã hoàn thành giờ sẽ sao chép mã gốc khi được bật.
- **Hỗ trợ sandbox ACP**: Các phiên ACP tuân thủ cài đặt sandbox đã lưu và các cờ `--sandbox`/`--no-sandbox`, kể cả khi khôi phục phiên.
- **Khả năng phục hồi khi kết nối lại cloud**: Phản hồi từ cloud giữ nguyên toàn bộ văn bản khi CLI kết nối lại sau khi mất kết nối.
- **Trình duyệt phiên**: Cải tiến tăng dần cho trình duyệt phiên hợp nhất.

---

## 3. Issue nổi bật

1. **[#5232 OPEN] Thư mục tin cậy tự động phê duyệt thực thi shell trong chế độ thủ công** ([link](https://github.com/github/copilot-cli/issues/5232)) — Cơ chế kiểm soát theo đường dẫn không thể dự đoán tác động phụ của các lệnh như `powershell.exe` hoặc `curl`. Được gửi hôm qua; là mối lo ngại bảo mật đáng kể cho các nhóm dựa vào ranh giới thư mục tin cậy.

2. **[#3013 CLOSED] Hooks không kích hoạt cho các agent nền (task)** ([link](https://github.com/github/copilot-cli/issues/3013)) — Lỗ hổng bảo mật tồn tại lâu nay khi các sub-agent bỏ qua permission hook. Giờ đã đóng sau nhiều tháng — đáng để xác minh liệu bản sửa có hoàn chỉnh không.

3. **[#4065 OPEN] Che giấu bí mật quá mạnh tay và che giấu cả nội dung hợp lệ** ([link](https://github.com/github/copilot-cli/issues/4065)) — Các file spec của người dùng với biến như `${env.AUTH_TOKEN}` bị biến dạng. 3 👍 cho thấy sự thất vọng rộng rãi với các dương tính giả.

4. **[#5238 OPEN] Xóa cache lặp lại cho mọi ảnh sau ảnh thứ 50** ([link](https://github.com/github/copilot-cli/issues/5238)) — Ảnh thứ 51 đẩy ảnh đầu tiên ra, kích hoạt nạp lại toàn bộ cache ảnh. Có thể rất tốn kém cho các phiên dài.

5. **[#5219 OPEN] Subagent với model ID không xác định rơi về giới hạn 128k và làm kẹt phiên** ([link](https://github.com/github/copilot-cli/issues/5219)) — Sự không khớp model-ID gây thất bại toàn bộ lượt với lỗi ngân sách prompt; ngữ cảnh chính vẫn ổn, nên nguyên nhân gốc gây khó hiểu.

6. **[#5197 OPEN] Voice server segfault trên WSL2 sau 1.0.100** ([link](https://github.com/github/copilot-cli/issues/5197)) — Hồi quy trong runtime voice cho người dùng WSL2; `/voice` kẹt ở "Fetching voice models."

7. **[#5203 OPEN] Yêu cầu tính năng: Kênh phát hành ổn định** ([link](https://github.com/github/copilot-cli/issues/5203)) — Yêu cầu trực tiếp về kênh ổn định so với preview. Được đồng tình nhờ các hồi quy gần đây.

8. **[#5190 OPEN] Autopilot 'Task complete' ẩn đầu ra của model** ([link](https://github.com/github/copilot-cli/issues/5190)) — Đầu ra bị thay bằng tóm tắt resume, phá vỡ các quy trình phụ thuộc vào đầu ra đầy đủ của model.

9. **[#5027 CLOSED] DNS hỏng cho sandbox Linux với stub `systemd-resolved`** ([link](https://github.com/github/copilot-cli/issues/5027)) — Loopback `127.0.0.53` không thể truy cập bên trong sandbox. Đóng tốt — cải thiện khả năng dùng sandbox Linux.

10. **[#5133 OPEN] `includeCoAuthoredBy: false` bị bỏ qua trong chế độ ACP** ([link](https://github.com/github/copilot-cli/issues/5133)) — Sự không nhất quán cấu hình giữa chế độ `--acp` và `-p`; nhỏ nhưng gây khó chịu cho việc giữ commit sạch.

---

## 4. Tiến độ PR chính

Không có pull request nào được cập nhật trong 24 giờ qua.

---

## 5. Thảo luận nổi bật

Không có dữ liệu thảo luận cho giai đoạn này.

---

## 6. Xu hướng yêu cầu tính năng

- **Quản lý kênh phát hành** (#5203): Người dùng muốn kênh ổn định/preview để tránh hồi quy.
- **Kiểm soát chọn model** (#5231): Loại trừ các model có vấn đề khỏi chế độ Auto; chỉ gọi khi chỉ định rõ.
- **UX ưu tiên bàn phím** (#2750 closed, #5227 open): Cuộn tốt hơn không cần chuột; ghim ô nhập liệu lên trên cùng.
- **Cấu hình ngữ cảnh/ngôn ngữ** (#5226): Cho phép cấu hình ngôn ngữ phiên âm giọng nói thay vì hard-code `"auto"`.
- **Duy trì hook/ngữ cảnh** (#5225): Giữ `additionalContext` của hook `sessionStart` qua quá trình compaction.

---

## 7. Điểm đau của nhà phát triển

1. **Ma sát xác thực MCP**: Một cụm issue (#5229, #5230, #5233, #5234, #5236) mô tả luồng refresh OAuth bị hỏng, token hết hạn bị thử lại, cache token trống trên Windows/Entra, và CLI trở nên không dùng được khi MCP server cần xác thực.

2. **Hồi quy do phát hành nhanh**: Voice (WSL2), hành vi khôi phục phiên (#5228), và xử lý TTY trên macOS (#5240) đều hỏng cho người dùng ở các phiên bản gần đây — động lực cốt lõi đằng sau #5203.

3. **Bất ngờ về chi phí/tác động phụ**: Việc cache ảnh bị đảo lộn (#5238) và tự động phê duyệt thư mục tin cậy (#5232) đều tạo ra chi phí ẩn hoặc rủi ro an toàn mà lý luận dựa trên đường dẫn không bắt được.

4. **Đường ống subagent/model**: Các task subagent bỏ qua hook (#3013), fallback sai model-ID (#5219), và lệch cấu hình chế độ ACP (#5133) chỉ ra sự không nhất quán giữa đường đi agent chính và đường đi được ủy quyền.

5. **UX terminal trong môi trường hạn chế**: Các bản build không có PTY quay vô hạn trong WSL (#5224) và menu cấu hình kiểu Postman chiếm phiên tương tác.

*Được tạo từ dữ liệu GitHub công khai cho github/copilot-cli tính đến 2026-10-23.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Bản phát hành vá tập trung vào bảo mật (**v1.19.4**) mang đến runtime Bun nâng cấp với các bản sửa lỗi cho Brotli, TLS, HTTP/1.1–3, WebSocket và `fetch`. Trình theo dõi issue vẫn xoay quanh các thảo luận dài kỳ về **sandbox agent** (#2242, 101 bình luận) và một nhóm **lỗi vòng đời background shell** khiến các location idle âm thầm kill tiến trình đang chạy. Trong khi đó, tính ổn định của desktop và tính đúng đắn của quét quyền vẫn là động lực cho các PR sôi động nhất.

---

## 2. Bản phát hành

**v1.19.4** — Cải tiến lõi:
- Nâng cấp runtime Bun đi kèm lên **1.4.4**, bao gồm [các bản vá bảo mật](https://bun.com/blog/bun-v1.4.4#security) cho Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket và `fetch`, cùng chứng chỉ gốc cập nhật lên NSS 3.131.1.

> Một bản phát hành bảo trì; giá trị chính nằm ở bản vá bảo mật thông qua Bun. Không có thay đổi API hay tính năng.

---

## 3. Issue nóng

1. **[#2242] Có cách nào sandbox agent không?** — *Open, 101 bình luận, 👍80*
   Issue mở được cộng đồng upvote nhiều nhất. Người dùng muốn có giới hạn filesystem/terminal tương đương seatbelt trên macOS của gemini-cli/codex-cli. Việc thiếu sandbox là rào cản niềm tin lặp đi lặp lại đối với sử dụng trong môi trường production.
   https://github.com/anomalyco/opencode/issues/2242

2. **[#34344] Khai thác sử dụng không giới hạn trên các model opencode** — *Closed, 17 bình luận*
   Giới hạn tốc độ model miễn phí gắn với IP; xoay VPN đặt lại ngay lập tức. Cho phép dùng không giới hạn DeepSeek V4 Flash và MiMo v2.5. Một lo ngại về kiếm tiền/lạm dụng nay đã đóng nhưng phản ánh điểm yếu trong thiết kế giới hạn tốc độ.
   https://github.com/anomalyco/opencode/issues/34344

3. **[#47646] [2.0] openai: ChatGPT OAuth báo context 400k cho các model long-context** — *Closed, 15 bình luận*
   Kết nối OAuth ghi đè giới hạn context thực (~1.05M) bằng 400k, khiến TUI báo thừa context khả dụng. Ảnh hưởng đến người dùng OpenAI long-context.
   https://github.com/anomalyco/opencode/issues/47646

4. **[#51828] [Bug] Location inactivity eviction gửi SIGTERM đến background shell đang chạy sau 60 phút** — *Open*
   Background shell bị kill khi `LocationActivity` evict một location idle; service vẫn sống nhưng đồ thị Shell/Pty bị phá hủy. Làm hỏng các job chạy dài.
   https://github.com/anomalyco/opencode/issues/51828

5. **[#52083] permissions: lệnh shell ghép nối làm mất redirection** — *Open*
   Một lỗi liên quan bảo mật: lệnh được `allow` trở thành primitive ghi file tùy ý không hỏi khi bị ghép chuỗi, vì scanner bỏ qua đích redirection. Mức độ nghiêm trọng cao với bất kỳ ai dựa vào prompt quyền.
   https://github.com/anomalyco/opencode/issues/52083

6. **[#58128] đừng ngừng retry khi LLM API thất bại** — *Open*
   Exponential backoff hardcoded giới hạn 10 lần thử / tối đa 10s làm dừng phiên khi gặp trục trặc mạng tạm thời hoặc backend khởi động lại. Cộng đồng muốn retry cấu hình được và kiên trì.
   https://github.com/anomalyco/opencode/issues/58128

7. **[#57656] mô tả tool shell ghi tên backend shell, khiến model gọi tool `bash` không tồn tại** — *Open*
   Tool được đăng ký là `shell` nhưng mô tả là `bash`; model gọi `bash`, thất bại, rồi thử lại — tốn một lượt lãng phí mỗi lần. Sửa rẻ, phiền thường xuyên.
   https://github.com/anomalyco/opencode/issues/57656

8. **[#56907] [đã tái hiện] Prompt quyền bị treo khi xem một subagent** — *Open*
   Mở phiên subagent ẩn prompt quyền của nó; auto-accept thấy danh sách rỗng, nên subagent bị chặn vĩnh viễn. Deadlock quy trình agent.
   https://github.com/anomalyco/opencode/issues/56907

9. **[#58314] Truy cập OpenCode Go Workspace trả phí bị từ chối – Nhiều yêu cầu hỗ trợ không được trả lời** — *Open*
   Một subscriber trả phí bị khóa nhiều ngày (403 / "Workspace access restricted") mà không có phản hồi hỗ trợ. Phản ánh khoảng trống hỗ trợ/quyền lợi khi tải cao.
   https://github.com/anomalyco/opencode/issues/58314

10. **[#56432] tui: /highlights nên hiển thị tất cả bản phát hành kể từ phiên bản trước** — *Open*
    Nhảy từ v2.0.26 → v2.0.32 chỉ hiển thị ghi chú của bản phát hành mới nhất; năm bản phát hành trung gian bị ẩn. Người dùng muốn highlight bản phát hành được tích lũy, cuộn được.
    https://github.com/anomalyco/opencode/issues/56432

---

## 4. Tiến độ PR chính

1. **[#58332] feat(plugin): expose tool call source cho shell create hooks** — *Open*
   Thêm đối số cho tool `shell` được đưa ra qua hook `shell.create`, cho phép plugin tùy chỉnh hành vi shell theo từng lần gọi. Giải quyết #21767, #54032, #41117.
   https://github.com/anomalyco/opencode/pull/58332

2. **[#58324] fix(core): giữ nguyên line ending trong patch tool** — *Open*
   Patch tool ghi lại các dòng bị ảnh hưởng bằng `\n`, làm hỏng file CRLF thành line ending hỗn hợp. Đóng #45926, #54605 — quan trọng cho repo Windows.
   https://github.com/anomalyco/opencode/pull/58324

3. **[#58320] feat(desktop): cấu hình remote server từ settings** — *Open*
   Cấu hình remote server và server mặc định qua `opencode.settings`, với mật khẩu đọc từ file riêng và tắt khởi động local khi dùng mặc định remote.
   https://github.com/anomalyco/opencode/pull/58320

4. **[#58321] feat(desktop): xác nhận deep link add-server** — *Open*
   Thêm deep link `opencode://add-server` với xác nhận native; xếp chồng trên #58320. Cải thiện onboarding remote server an toàn.
   https://github.com/anomalyco/opencode/pull/58321

5. **[#58331] fix(desktop): cho dev build có server riêng và giữ beta tránh xa dev server** — *Closed*
   Dev build chia sẻ `service.json`/port/db của kênh phát hành, nên khởi động desktop dev ghi đè server stable/beta. Cô lập dev server.
   https://github.com/anomalyco/opencode/pull/58331

6. **[#58325] fix: focus sau shortcut ^~ trong web UI bị sai chỗ** — *Closed*
   Sau `^~`, focus đáp xuống prompt chat thay vì terminal, nên `git status` + Enter bị gửi đến agent. Sửa một footgun trong web UI.
   https://github.com/anomalyco/opencode/pull/58325

7. **[#58310] fix(cli): giữ lại binary Windows qua các volume** — *Open*
   Retention thất bại với `EXDEV` khi package và cache nằm trên các volume Windows khác nhau. Sửa xử lý retire-path của npm.
   https://github.com/anomalyco/opencode/pull/58310

8. **[#58194] feat(core): chuyển giới hạn context ChatGPT vào plugin riêng** — *Closed*
   Tách các giới hạn context ChatGPT hardcoded khỏi plugin OpenAI và mở rộng phạm vi ngoài đăng nhập Codex cũ. Liên quan trực tiếp đến #47646.
   https://github.com/anomalyco/opencode/pull/58194

9. **[#58130] fix(client): giữ service sống khi bị treo qua suspend** — *Open*
   Client không còn kill service nền khỏe mạnh khi health probe thất bại qua suspend/resume, giải quyết vấn đề khóa desktop.
   https://github.com/anomalyco/opencode/pull/58130

10. **[#57224] [contributor] feat(app): animate timeline như iOS khi phiên chạy** — *Open*
    Animate mượt timeline desktop trong phiên thay vì giật theo frame (code +1156/−105). PR trau chuốt UX đáng chú ý.
    https://github.com/anomalyco/opencode/pull/57224

---

## 5. Thảo luận nóng

Không có dữ liệu Discussion cho kỳ digest này, nên mục này được lược bỏ.

---

## 6. Xu hướng yêu cầu tính năng

- **Sandbox & tăng cường quyền** — #2242 (sandbox), #52083 (bỏ qua redirection), #56907 (prompt subagent treo). Chủ đề chiếm ưu thế: người dùng muốn ranh giới filesystem/shell có thể thực thi và kiểm tra được.
- **Độ tin cậy của hoạt động chạy dài** — #51828, #58050, #58049 (background shell bị kill khi idle eviction), #58128 (chính sách retry).
- **Minh bạch sử dụng** — #57975 (dashboard sử dụng thời gian thực hợp nhất), #58014 (giới hạn free-tier không rõ ràng). Người dùng không thể đối chiếu quota tài liệu với thực tế.
- **Bản địa hóa & trau chuốt TUI** — #51868 (lỗi dịch máy tiếng Trung), #56432 (highlight bản phát hành tích lũy), #56109 (tab-completion `/cd` trên Windows với backslash).
- **Remote/multi-server và độ tin cậy gói Go** — PR cấu hình remote server desktop (#58320/#58321) và vấn đề độ trễ/truy cập gói Go (#58003, #58314).

---

## 7. Điểm đau của nhà phát triển

- **Không có sandbox agent**: Issue mở được upvote #1 (#2242, 👍80) — không có tương đương seatbelt, chặn sử dụng tự động an toàn.
- **Background shell bị chấm dứt âm thầm**: Nhiều báo cáo (#51828, #58050, #58049) về shell bị kill khi idle eviction với thông báo hoàn thành đã hứa không bao giờ được gửi.
- **Lỗ hổng quét quyền**: Lệnh ghép nối bỏ redirection (#52083) biến lệnh được cho phép thành ghi không hỏi — vấn đề bảo mật người dùng phải tự suy luận.
- **Lệch mô tả model/tool**: Sự không khớp tên `shell` vs `bash` (#57656) tốn một lượt model mỗi lần gọi.
- **Retry/backoff quá hung hăng**: Giới hạn hardcoded 10×/10s (#58128) dừng phiên khi lỗi tạm thời.
- **Nhầm lẫn free-tier & khoảng trống hỗ trợ trả phí**: Giới hạn không rõ (#58014), phơi bày khai thác lạm dụng (#34344), và khóa gói trả phí không được trả lời (#58314, #58003).
- **Cạnh thô đa nền tảng**: Hỏng CRLF trong patch (#58324), retention volume Windows (#58310), và tab-completion `/cd` (#56109).
- **Truyền thông cập nhật**: Highlight bản phát hành thiếu các phiên bản trung gian (#56432) khiến người dùng không biết về các bản sửa.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Hoạt động hôm nay chủ yếu xoay quanh một nhóm bản sửa lỗi liên quan đến hiệu năng phiên làm việc lớn và xuất HTML — ba PR độc lập (#11275, #11293, #11274) cùng hướng đến việc thay thế duyệt cây đệ quy để sửa lỗi xuất trắng và tràn ngăn xếp trên các phiên dài. Nhóm cũng đã phát hành bản sửa lỗi tranh chấp bash-abort trên macOS và sửa lỗi hiển thị tin nhắn hệ thống cho xuất file. Trong khi đó, một loạt đóng `[no-action]` (tìm kiếm mờ, tải lại AGENTS.md, chú thích HTML) cho thấy maintainer đang tích cực phân loại và xử lý tồn đọng thay vì để tích tụ.

## 2. Bản phát hành

Không có bản phát hành mới trong 24 giờ qua. Bỏ qua.

## 3. Issue nổi bật

1. **[#7553] Cấu hình mức độ/thinking model cho compaction** (12 bình luận, 👍3) — Compaction luôn tái sử dụng thinking level hiện tại của phiên, buộc người dùng reasoning-model phải tiêu tốn ngân sách suy luận cho việc tóm tắt. Issue mở có tương tác cao nhất; đang thảo luận sôi nổi về việc tách reasoning compaction khỏi các lượt thông thường. [link](https://github.com/earendil-works/pi/issues/7553)

2. **[#7739] Ngân sách thời gian khởi động hướng đến độ trễ/bộ nhớ tương đương jcode** (11 bình luận) — Benchmark cho thấy pi chậm hơn jcode khi khởi động PTY tương tác. Số bình luận cao phản ánh lo ngại kéo dài về hiệu năng cold-start. [link](https://github.com/earendil-works/pi/issues/7739)

3. **[#9807] perf(tui): full re-render gây lag cuộn/gõ phím ở 800+ tin nhắn** (5 bình luận, 👍3) — Pi render lại toàn bộ scrollback mỗi lần tương tác (so với diff cấp ô của OpenCode). Liên quan trực tiếp đến các PR export-stack hôm nay; vấn đề khả năng mở rộng cốt lõi cho phiên dài. [link](https://github.com/earendil-works/pi/issues/9807)

4. **[#10259] API trình bày tool công khai / chế độ tool một dòng** (5 bình luận, 👍2) — Tác giả extension không thể kiểm soát cách hiển thị hàng tool tích hợp/MCP. Yêu cầu ngày càng tăng từ hệ sinh thái extension. [link](https://github.com/earendil-works/pi/issues/10259)

5. **[#11223] modelOverrides bị bỏ qua âm thầm cho classifier models** (5 bình luận) — Hành vi tài liệu hóa không khớp với hành vi thực tế, không có cảnh báo. Lỗi điển hình về độ tin cậy cấu hình. [link](https://github.com/earendil-works/pi/issues/11223)

6. **[#11086] [prio:p0] Ký tự rò rỉ vào input trên terminal Windows khi CPU tải cao** (4 bình luận) — Lỗi hỏng input mức ưu tiên không qua SSH khi tải cao. Bug mở nghiêm trọng nhất trong danh sách hôm nay. [link](https://github.com/earendil-works/pi/issues/11086)

7. **[#9932] before_agent_start forced system prompt giữ lại các tool đã xóa** (6 bình luận) — Lỗi thứ tự handler khi việc xóa bằng `setActiveTools()` bị ghi đè bởi forced prompt cũ. Ảnh hưởng đến tính đúng đắn của việc kết hợp extension. [link](https://github.com/earendil-works/pi/issues/9932)

8. **[#11090] Giữ nguyên gán model cho token sử dụng phụ trợ** (3 bình luận) — Tóm tắt compaction/branch thiếu bản ghi sử dụng theo từng model, làm hỏng việc xuất telemetry chi phí chính xác. [link](https://github.com/earendil-works/pi/issues/11090)

9. **[#11172] Báo cáo chuột bị tách để lại đuôi escape-sequence trong prompt** (2 bình luận) — Xử lý escape-timeout trong `StdinBuffer` xả nửa chuỗi, chèn input lạc. Có thể tái hiện với code đã phát hành. [link](https://github.com/earendil-works/pi/issues/11172)

10. **[#11253] forkFrom sao chép session một appendFileSync mỗi entry** (2 bình luận, `fix-available`) — Fork 73 MB / 3.322 entry mất hơn 30 giây và timeout handshake của host. Được xử lý trực tiếp bởi PR #11288. [link](https://github.com/earendil-works/pi/issues/11253)

## 4. Tiến độ PR chính

1. **[#11288] Ghi session đã fork qua một fd** — Sửa #11253; thay hàng nghìn chu kỳ open/close bằng một file descriptor duy nhất. [link](https://github.com/earendil-works/pi/pull/11288)

2. **[#11293] Render xuất HTML cho session sâu hơn call stack** — Duyệt lặp thay thế duyệt đệ quy; sửa lỗi xuất trắng ở ~6k entry. [link](https://github.com/earendil-works/pi/pull/11293)

3. **[#11290] Render tin nhắn hệ thống trong xuất HTML** — Hiển thị prompt ban đầu và cập nhật phần giữa phiên; đóng #11261. [link](https://github.com/earendil-works/pi/pull/11290)

4. **[#11289] Dừng nhóm shell macOS trước khi kill chúng** — Giảm tranh chấp khi abort `a; b` vẫn chạy `b`; đóng #11252. [link](https://github.com/earendil-works/pi/pull/11289)

5. **[#11296] Xếp hạng khớp mờ liền kề và tìm kiếm trường session riêng biệt** — Đóng #11220; cũng xử lý #10552, #10065, #11024. Sửa xếp hạng model phản trực giác. [link](https://github.com/earendil-works/pi/pull/11296)

6. **[#11257] Giữ nguyên lỗi spawn của pi.exec** — Hiển thị lỗi thiếu executable ra stderr; đóng #11085. [link](https://github.com/earendil-works/pi/pull/11257)

7. **[#11299] Sửa type guard thinkingLevelMap?.off và max_completion_tokens thừa** — Ngăn HTTP 400 cho reasoning model định dạng OpenRouter thiếu thinking level map. [link](https://github.com/earendil-works/pi/pull/11299)

8. **[#11278] Giữ nguyên getter ctx.ui qua wrapUIPromptContext** — Spread đã resolve `get theme()` tại thời điểm bind, làm hỏng host khởi tạo theme muộn. [link](https://github.com/earendil-works/pi/pull/11278)

9. **[#11231] docs(quickstart): thêm tab installer Windows** — Tài liệu hóa `install.ps1` song song với installer curl. [link](https://github.com/earendil-works/pi/pull/11231)

10. **[#11304] Khởi động khi package đã cấu hình cài đặt thất bại** — Suy giảm nhẹ nhàng: bỏ qua package lỗi, cảnh báo, tiếp tục tải các package khác. [link](https://github.com/earendil-works/pi/pull/11304)

## 5. Thảo luận nổi bật

Không có dữ liệu GitHub Discussions được cung cấp. Bỏ qua.

## 6. Xu hướng yêu cầu tính năng

- **Khả năng cấu hình compaction** — Thinking level/model độc lập, opt-in theo provider, và ngưỡng token tuyệt đối (#7553, #11295).
- **API extension/UI** — Kiểm soát trình bày tool và ngữ cảnh markdown transformer phong phú hơn (#10259, #7828) chiếm ưu thế trong yêu cầu từ tác giả extension.
- **Tiện dụng context-file** — Ngang bằng Claude Code: loại bỏ chú thích HTML (#11250/#11251) và tải lại `AGENTS.md` trực tiếp qua `/reload` (#11291/#11292).
- **Cache warming & kiểm soát chi phí** — Khoảng thời gian cache warming khi nhàn rỗi có thể cấu hình (#11127) và gán token phụ trợ theo từng model (#11090).
- **Hiệu năng khởi động** — Đặt ngân sách rõ ràng so với benchmark jcode (#7739).

## 7. Điểm đau của nhà phát triển

- **Suy giảm ở phiên lớn** — Ba triệu chứng riêng biệt (lag TUI #9807, tràn ngăn xếp xuất HTML #11225/#11261, fork chậm #11253) đều xuất phát từ triển khai đệ quy/full-rerender không mở rộng được. Đây là điểm đau hệ thống rõ ràng nhất trong ngày và đang được xử lý bởi nhiều PR song song.
- **Cấu hình sai âm thầm** — `modelOverrides` bị bỏ qua không cảnh báo (#11223); thiếu `checkpointWhen` chỉ crash tại thời điểm commit (#11305). Người dùng muốn validation fail-fast tại thời điểm tải define.
- **Mong manh escape-sequence terminal** — Báo cáo chuột bị tách (#11172), rò rỉ ký tự Windows (#11086), bracketed paste rỗng trên WSL (#11259), và tranh chấp process-group macOS (#11252) cho thấy xử lý input đa nền tảng vẫn là nguồn bug dai dẳng.
- **Thứ tự handler/extension** — Forced-prompt `before_agent_start` vs. `setActiveTools()` (#9932) và getter UI theme muộn (#11278) chỉ ra sự nhầm lẫn giữa thời điểm bind và thời điểm đánh giá trong API extension.
- **Khoảng trống tài liệu/chỉ mục** — Thiếu repo Homebrew (#11282) và tài liệu cài Windows chưa đầy đủ (#11231) chỉ ra ma sát khám phá cho người dùng mới.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Một bản nightly mới (`v0.26.0-nightly.20261022.bf66a26c97`) đã được phát hành với tính năng lưu trữ token của daemon và mở rộng phạm vi bao phủ các binary đi kèm trong pipeline phát hành. Hoạt động sửa lỗi chủ yếu tập trung vào các regression P1/P2 trong v0.26.0 — đáng chú ý là việc âm thầm mất kết quả tool trên Windows (#15297), tình trạng tăng vọt bộ nhớ trong bộ phân tích an toàn shell (#15165), và lỗi cập nhật desktop trên Windows liên quan đến runtime đi kèm bị khóa (#15276). Trong khi đó, nhóm Web Shell tiếp tục thống nhất thuật ngữ hướng người dùng (Workspace/Session) và sửa hành vi làm mới danh sách session.

## 2. Bản phát hành

**v0.26.0-nightly.20261022.bf66a26c97**
- `feat(serve)`: thêm tính năng lưu trữ token của daemon (#15023, @wenshao) — token do daemon cấp giờ đây tồn tại qua các lần khởi động lại, cải thiện độ ổn định cho các phiên `qwen serve` chạy dài hạn.
- `fix(release)`: bao phủ mọi binary đi kèm được sinh ra — khắc phục lỗ hổng khi một số binary đi kèm không được phát hành/kiểm tra.

Không có bản phát hành ổn định nào trong 24 giờ qua.

## 3. Issue nổi bật

1. **#13078 — Kiểm tra CVE phụ thuộc hàng ngày thất bại** (29 bình luận) — Lỗi quét CVE tự động lặp đi lặp lại đã mở khoảng 3 tuần; có thể do endpoint npm audit bị treo hoặc một cảnh báo mức độ nghiêm trọng cao mới xuất hiện. Cộng đồng quan tâm nhiều vì nó chặn pipeline tín hiệu bảo mật. [link](https://github.com/QwenLM/qwen-code/issues/13078)

2. **#13787 — Khôi phục XML quét lại tiền tố trên các phản hồi đa lệnh gọi lớn** (10 bình luận) — Regression hiệu năng khi việc khôi phục XML của lệnh gọi tool quét lại tiền tố, tăng theo bậc hai với kích thước phản hồi. Đã xác nhận bằng bản tái hiện có giới hạn. [link](https://github.com/QwenLM/qwen-code/issues/13787)

3. **#15297 — v0.26.0 âm thầm mất kết quả tool (~1 trong 30 lệnh gọi)** (P1) — Trên Windows, khoảng 4% lệnh gọi tool không bao giờ trả về `functionResponse` cho model dù đã thực thi thành công. 28 trường hợp được xác nhận từ transcript. Người dùng phải đọc lại file, lãng phí lượt. [link](https://github.com/QwenLM/qwen-code/issues/15297)

4. **#15165 — Bộ phân tích an toàn shell gây cấp phát WASM tạm thời ~1.6 GiB** (P2) — Node v24.16.0 + bộ phân tích Bash WASM đi kèm gây tăng vọt bộ nhớ native trong quá trình tối ưu hóa V8, đo trên 100 lệnh gọi. Đây là mối lo nghiêm trọng về cạn kiệt tài nguyên cho các host chạy nhiều phiên. [link](https://github.com/QwenLM/qwen-code/issues/15165)

5. **#15276 — Cập nhật desktop trên Windows thất bại với "Error opening file for writing"** (P1) — Trình cập nhật trong ứng dụng không thể thay thế `node.exe` vì runtime đi kèm giữ khóa trên file đó. Chặn nâng cấp desktop cho người dùng Windows. [link](https://github.com/QwenLM/qwen-code/issues/15276)

6. **#15077 — Managed Agent: liệt kê các Session đã lưu trữ và tìm kiếm theo tiêu đề** (đã đóng) — Các tính năng quản lý session do cộng đồng yêu cầu (bộ lọc đã lưu trữ + tìm kiếm theo tiêu đề) đã được triển khai/đóng. Quan trọng cho người dùng có lịch sử Managed Agent chạy dài hạn. [link](https://github.com/QwenLM/qwen-code/issues/15077)

7. **#8968 — Hỗ trợ MCP 2026-07-28 và MCP Apps trong daemon WebShell** (P2, dài hạn) — Muốn chuyển đổi hạng nhất từ MCP SDK v1 sang spec lõi mới, với `qwen daemon`/`qwen serve` là host chính. Thể hiện nhu cầu hỗ trợ UI của MCP Apps. [link](https://github.com/QwenLM/qwen-code/issues/8968)

8. **#15310 — Cho model biết nó dùng shell nào (Windows `cmd.exe`)** — Trên Windows, model giả định shell POSIX và phát ra các lệnh thất bại; mỗi thất bại tốn một lượt. Sửa đơn giản ở mức prompt nhưng tác động lớn cho người dùng Windows. [link](https://github.com/QwenLM/qwen-code/issues/15310)

9. **#15248 — Kiểm thử timing của runtime broker trong `sdk-java` flake 3/3 trên hosted runner** (P2) — Làn nhanh cho PR từ fork bị chặn bởi các kiểm thử nhạy cảm timing trên Azure runner trong khi self-hosted vẫn pass. Đây là vấn đề gây khó chịu cho contributor. [link](https://github.com/QwenLM/qwen-code/issues/15248)

10. **#15302 / #15299 — Opt-in WebSearch rõ ràng cho custom gateway tương thích DashScope** (P3, sẵn sàng cho người) — Cộng đồng muốn có `tools.webSearch.allowedHosts` để custom gateway HTTPS triển khai tìm kiếm DashScope Responses có thể dùng tool `web_search` tích hợp. [link #15302](https://github.com/QwenLM/qwen-code/issues/15302) · [link #15299](https://github.com/QwenLM/qwen-code/issues/15299)

Cũng đáng chú ý: **#15267** (chạy kiểm thử CLI với `--no-isolate` ghi đè `~/.qwen/settings.json` thật của developer — một cái bẫy khó chịu), **#15269** (unhandled rejection khi trích xuất bộ nhớ làm Core CI thất bại sau khi merge), và **#15304** (session độc lập mới không xuất hiện trong sidebar cho đến khi lượt đầu tiên hoàn thành).

## 4. Tiến độ PR chính

1. **#15308 — fix(cli): Thay thế placeholder kết quả tool tổng hợp bằng kết quả thật muộn** — Giải quyết nhóm lỗi "mất kết quả tool" bằng cách ưu tiên kết quả thật hơn placeholder lỗi tổng hợp khi stream chết giữa lượt. [link](https://github.com/QwenLM/qwen-code/pull/15308)

2. **#15311 — fix(web-shell): làm mới session độc lập sau khi cấp phát** — Sửa trực tiếp #15304; các cuộc trò chuyện độc lập giờ xuất hiện trong sidebar ngay khi được tạo, không phải sau lượt đầu tiên. [link](https://github.com/QwenLM/qwen-code/pull/15311)

3. **#15315 — fix(web-shell): chuẩn hóa nội dung hiển thị workspace và session** — Triển khai việc thống nhất thuật ngữ Workspace/Session từ issue #14988. [link](https://github.com/QwenLM/qwen-code/pull/15315)

4. **#15313 — feat(managed-agent): Thêm `web_fetch` cho Workspace Sessions** — Mở rộng bộ tool của Workspace với khả năng fetch qua mạng dưới runtime managed-agent. [link](https://github.com/QwenLM/qwen-code/pull/15313)

5. **#15246 — perf(memory): giữ lại snapshot catalog legacy không đổi** — Tránh việc tạo snapshot dư thừa trong lịch sử hội thoại khi catalog bộ nhớ không thay đổi. Giảm chi phí retry/resume. [link](https://github.com/QwenLM/qwen-code/pull/15246)

6. **#15306 — feat(mods): gửi `tool.check` ask của chính Mod tới người dùng** — Khắc phục lỗ hổng bảo mật: `ask` đã được diễn đạt lại của Mod trước đây được tự động phê duyệt bởi các đường phân loại YOLO/AUTO. Giờ đây luôn được người dùng xác nhận. [link](https://github.com/QwenLM/qwen-code/pull/15306)

7. **#15317 — fix(mods): từ chối các giá trị lồng quá sâu để vượt ranh giới Mod** — Giới hạn các giá trị vượt ranh giới ở 512 cấp để ngăn các cạm bẫy stack/DoS qua ranh giới runtime Mod. [link](https://github.com/QwenLM/qwen-code/pull/15317)

8. **#15218 — feat(managed): gate các automation được quản lý bằng một lần chạy probe Runtime trước khi claim** — Cho phép gate shell trước khi claim cho automation; ngữ nghĩa `skipped/gate_quiet` tránh các commit và lượt journal không cần thiết. Hữu ích cho các agent theo lịch được kiểm soát chi phí. [link](https://github.com/QwenLM/qwen-code/pull/15218)

9. **#15255 — feat(managed-agent): Thêm pool Harness chia sẻ cho Kubernetes** — Pool Hosted Harness opt-in với fencing dựa trên epoch và cấp quyền ghi ràng buộc placement; một phần nền tảng cho khả năng mở rộng của triển khai đa tenant. [link](https://github.com/QwenLM/qwen-code/pull/15255)

10. **#15283 — feat(cli): căn chỉnh khôi phục session OpenTUI với Ink** — Mang lại sự tương đương về cancel/retry/rewind/restore giữa frontend OpenTUI và Ink — một khoảng trống UX tồn tại lâu. [link](https://github.com/QwenLM/qwen-code/pull/15283)

## 5. Thảo luận nổi bật

Không có dữ liệu GitHub Discussions cho khoảng thời gian này. Bỏ qua mục này.

## 6. Xu hướng yêu cầu tính năng

Qua các issue và PR được cập nhật trong 24 giờ qua, các hướng tính năng mạnh nhất là:

- **Quản lý session như một bề mặt hạng nhất** — lọc đã lưu trữ, tìm kiếm theo tiêu đề (#15077), sửa sidebar (#15304), và chuẩn hóa thuật ngữ (#14988, #15315, #15309, #15312) cho thấy đầu tư liên tục vào UX Workspace/Session.
- **Khả năng mở rộng MCP & web tooling** — MCP 2026-07-28 + MCP Apps (#8968), chi tiết tool card MCP phong phú hơn (#15280), và host tin cậy `web_search` có thể cấu hình (#15299, #15302).
- **Quy mô & kiểm soát runtime Managed Agent** — provisioner Runtime bên ngoài dựa trên HTTP (#15247), pool Harness Kubernetes (#15255), gate automation (#15218), và thư mục gốc làm việc của Conversations có thể cấu hình (#15298).
- **Linh hoạt cấu hình** — `worktree.baseDir` có thể cấu hình (#15292), `--conversations-dir` cho `qwen serve` (#15298).
- **Tương đương trên Windows** — nhận biết shell trong prompt (#15310), độ bền installer/updater (#15276), và độ tin cậy gửi kết quả tool (#15297).

## 7. Điểm đau của developer

1. **Việc gửi kết quả tool không đáng tin cậy trong v0.26.0** — Mất âm thầm `functionResponse` (Windows, ~1/30 lệnh gọi, #15297) cùng placeholder tổng hợp che khuất kết quả thật (#15308) xóa lượt của model và buộc đọc lại.
2. **Vách hiệu năng trong pipeline shell/tool** — Quét lại tiền tố XML theo bậc hai (#13787) và tăng vọt WASM tạm thời ~1.6 GiB trong phân loại an toàn shell (#15165) khiến các phiên đa lệnh gọi dài hạn tốn kém không tương xứng.
3. **Ergonomics cài đặt/cập nhật trên Windows** — `node.exe` bị khóa phá vỡ cập nhật trong ứng dụng (#15276); model vẫn giả định shell POSIX dù chạy dưới `cmd.exe` (#15310).
4. **CI flake và cạm bẫy hạ tầng kiểm thử** — Kiểm thử timing `sdk-java` chỉ flake trên GitHub-hosted runner, chặn PR từ fork (#15248); `vitest --no-isolate` ghi đè settings thật của developer (#15267); unhandled rejection khi trích xuất bộ nhớ làm Core CI thất bại sau khi tất cả kiểm thử pass (#15269); constructor `ToolPublicationStore` lệch pha phá vỡ fixture (#15305, #15314).
5. **Nhà vận hành custom gateway vật lộn với allowlist host** — Người dùng có gateway tương thích DashScope không thể opt-in `web_search` tích hợp (#15299, #15302) hoặc cấu hình root Conversations (#15298).
6. **Suy giảm tín hiệu bảo mật dài hạn** — Kiểm tra CVE đã thất bại nhiều tuần (#13078), che khuất việc dự án hiện có phụ thuộc mức độ nghiêm trọng cao chưa được xử lý hay không.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*