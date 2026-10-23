# Bản tin cộng đồng công cụ AI CLI 2026-10-23

> Tạo lúc: 2026-10-23 04:29 UTC | Công cụ theo dõi: 7

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

# Báo cáo so sánh đa công cụ — Hệ sinh thái AI CLI
**Bản tin cộng đồng ngày 2026-10-23**

---

## 1. Tổng quan hệ sinh thái

Bối cảnh công cụ AI CLI hiện là cuộc đua sáu chiều (Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, cùng Qwen Code), với sự **hội tụ rõ rệt về an toàn và quản trị** nhưng vẫn **phân hóa dai dẳng về kiến trúc và đối tượng người dùng**. Mọi dự án được theo dõi đều đang lặp theo nhịp nightly/alpha, với các bản patch chủ yếu tập trung vào sửa lỗi ranh giới sandbox, gia cố mô hình quyền, và tính đúng đắn của vòng đời thông tin xác thực/token — chứ không phải tính năng hào nhoáng. Nỗi thất vọng chung của cộng đồng giờ không còn là năng lực thô — mà là **niềm tin**: liệu "đã được duyệt" có đồng nghĩa với "đã bị kiểm soát," liệu báo cáo thành công có phản ánh thực tế, và liệu hạn mức/giới hạn có minh bạch và truy vết được không. Trong khi đó, các giao diện desktop đang nổi lên như kênh phát triển nhanh nhất và dễ hồi quy nhất, và khả năng mở rộng (plugin, hook, MCP) đã trở thành trục khác biệt hóa sản phẩm chính.

---

## 2. So sánh mức độ hoạt động (ảnh chụp 2026-10-23)

| Công cụ | Issues (cập nhật hôm nay) | PRs (cập nhật hôm nay) | Discussions | Trạng thái phát hành |
|---|---|---|---|---|
| **Claude Code** | 10 hot + được nhắc danh dự (tracker lớn; cụm trùng lặp) | 7 (đều từ 1 contributor, đều CLOSED/engine-gated) | N/A (không cung cấp) | v2.1.308, v2.1.309 (patch) |
| **OpenAI Codex** | 10 hot (gồm cụm 3 issue về capacity) | 10 (tập trung infra/config/hooks) | Có: 2 Ideas, 2 Q&A, 7 Show&tell | 3 bản dựng `rust-v0.164.0-alpha` |
| **Gemini CLI** | 10 hot (agent reliability chiếm ưu thế) | 10 (settings/sandbox/security) | N/A (không cung cấp) | v0.67.0-nightly |
| **GitHub Copilot CLI** | 10 hot + ghi chú (**36 cập nhật trong 24h**) | **0** (không có cập nhật) | N/A (không cung cấp) | v1.0.103 |
| **OpenCode** | 10 hot (sandbox/permissions chiếm ưu thế) | 10 (auth, MCP, tính đúng đắn) | N/A (không cung cấp) | v1.19.4 (chỉ bản bump Bun bảo mật) |
| **Pi** | 10 hot (perf/UX chiếm ưu thế) | 10 (+ được nhắc danh dự) | Có: 2 Show&tell | **Không có** |
| **Qwen Code** | 10 hot (serve/Web Shell + bug P1) | 10 (gia cố serve/web-shell) | N/A (không cung cấp) | v0.26.0-nightly |

**Ghi chú:**
- Copilot CLI có thông lượng issue cao nhất hôm nay (36 cập nhật) nhưng **không có hoạt động PR nào** — đáng lo với một sản phẩm v1.x.
- Pi và Qwen Code không phát hành bản ổn định nào trong khoảng thời gian này; cả hai đều đang ở nhánh nightly/feature-branch.
- Discussions chỉ được điền đầy đủ đáng tin cậy cho Codex và Pi; việc thiếu ở nơi khác phản ánh **cấu hình kênh báo cáo**, không phải cộng đồng không hoạt động (đánh dấu N/A ở trên).

---

## 3. Các hướng tính năng chung

| Hướng | Công cụ | Nhu cầu cụ thể |
|---|---|---|
| **Gia cố sandbox / quyền** | Claude Code, OpenCode, Copilot CLI, Gemini CLI, Qwen Code | Claude Code đã đóng các lỗ thoát shell-startup trước lệnh và các đường vòng `denyWrite` qua symlink; OpenCode có bug bypass đang tồn tại (#50652, #52083); auto-approve trusted-folders của Copilot CLI (#5232); bypass shell-wrapper của Gemini (#29688). Chủ đề chung: **"được phép" phải đồng nghĩa với "đã bị kiểm soát."** |
| **Vòng đời thông tin xác thực & token** | Copilot CLI, Codex, Gemini CLI, OpenCode | Lỗi refresh OAuth của MCP (Copilot #5229/#5233), race điều kiện token-refresh giữa các tiến trình (Codex #24663), ghi keychain nguyên tử (Gemini #29765), so sánh mật khẩu an toàn về thời gian (OpenCode #58337). |
| **Khả năng mở rộng & quản trị plugin** | Claude Code, Pi, Codex, OpenCode, Qwen Code | "Mods" của Claude (#91870) + stack sec-default; API trình bày công cụ công khai của Pi (#10259); hook theo môi trường của Codex (#56304); phơi bày nguồn hook của OpenCode (#58332). |
| **Khả năng quan sát mức sử dụng / hạn mức** | Claude Code, Codex, OpenCode, Pi | Hồi quy context-window (Claude #102094 + 5 trùng lặp), đốt quota 1.8× ở headless (Claude #97074), tự động hóa reset (Codex #32586), dashboard sử dụng hợp nhất (OpenCode #57975). |
| **Báo cáo sai thành công / trạng thái thiếu trung thực** | Gemini CLI, Qwen Code, Claude Code | Subagent của Gemini báo `GOAL` sau `MAX_TURNS` (#22323, #21983); Qwen âm thầm bỏ kết quả công cụ (#15297); Claude agent mở rộng phạm vi quá mức (#97641, #104341). |
| **Đa thiết bị / đa danh tính** | Codex, Claude Code, Copilot CLI | Đồng bộ thread Codex giữa các thiết bị (#14067, 69👍) + khóa writer iOS; xác thực đa tài khoản Connector của Claude (#27302, issue có tương tác cao nhất). |
| **Nợ kỹ thuật đúng đắn trên Windows** | Claude Code, Codex, Copilot CLI, Qwen Code, Pi | Chuẩn hóa ký tự ổ đĩa (Claude #75855), tiến trình Node/MXC chạy hoang (Codex #51649/#42484), updater bị khóa `node.exe` (Qwen #15276), rò rỉ symbol khi CPU tải cao (Pi #11086, p0). |

---

## 4. Phân tích khác biệt hóa

**Trục trọng tâm:**
- **Claude Code** — Quản trị cấp doanh nghiệp. Stack PR `sec-default` biến "chính sách tổ chức luôn ghi đè ý định plugin cá nhân" thành nguyên tắc kiến trúc tường minh. Mục tiêu: nhóm/người mua doanh nghiệp. Issue có tương tác cao nhất là xác thực đa tài khoản Connector, tức danh tính tổ chức.
- **OpenAI Codex** — Hạ tầng & cấu hình được quản lý. Loạt PR hôm nay (config server, hook theo phạm vi môi trường, rollout tracing, tách rời xác thực ChatGPT) chỉ về chiến lược **control-plane doanh nghiệp dạng pluggable**. BYOK + trình nạp cấu hình được quản lý là dấu hiệu doanh nghiệp trực tiếp.
- **Gemini CLI** — Tính đúng đắn của agent-loop và công cụ nhận biết AST. Các EPIC cho đọc AST-grep (#22745-#22747) và trạng thái tác vụ dựa trên file bền vững thể hiện đầu tư vào **hiệu quả token và độ tin cậy tầm dài** thay vì tính năng bề mặt.
- **GitHub Copilot CLI** — Tích hợp IDE/AGENTS trung thành với nhịp phát hành do IDE dẫn dắt. Copy code-block và cờ sandbox ACP của v1.0.103 cho thấy tư thế **trau chuốt hơn tính năng**, nhưng cụm MCP/OAuth đang bào mòn giá trị.
- **OpenCode** — Do cộng đồng quản trị, không phụ thuộc model. Bản bump bảo mật Bun đi kèm, tìm kiếm web Brave, sửa ID Mistral cho thấy định vị **ít ma sát, đa nhà cung cấp**. Quyền là khoảng trống chưa giải quyết ồn ào nhất của nó.
- **Pi (earendil-works)** — TUI tối ưu hiệu năng. So sánh ngân sách khởi động với jcode, công việc render tăng dần, khả năng mở rộng xuất HTML. Mục tiêu: **người dùng tương tác nặng** chạy các phiên 800+ tin nhắn.
- **Qwen Code** — Kiến trúc ưu tiên `serve`/daemon cho triển khai **Managed Agent** được host, với UI Web Shell trưởng thành nhanh. Điểm nhấn khác biệt: tập trung mạnh vào CI/hosted-runner và tính tiện dụng Windows cho thị trường Trung Quốc (#15310).

**Cách tiếp cận kỹ thuật:** Trong khi Claude/Codex/Copilot là các triển khai **nhà cung cấp đóng, nhiều chính sách** với pipeline phát hành công khai, OpenCode/Pi/Qwen dựa vào **kiến trúc ưu tiên mở rộng** và thông lượng PR cộng đồng. Tư thế bảo mật khác biệt rõ rệt: Claude và Codex đẩy các kiểm soát *tổ chức*; OpenCode và Pi vẫn đang xây sandboxing *cấp người dùng*.

---

## 5. Đà phát triển & độ trưởng thành của cộng đồng

**Lặp nhanh (phát hành hàng ngày):**
- **OpenAI Codex** — Ba bản dựng alpha + ~10 PR infra/ngày là chuyến tàu phát hành nhanh nhất trong nhóm.
- **Qwen Code** — Nightly với lộ trình `serve`/Managed Agent mạch lạc và phản hồi UX Web Shell dày đặc.
- **Gemini CLI** — Nightly với thông lượng sửa P1 ổn định; maintainer phản hồi tốt (ví dụ #29762 được merge cùng chu kỳ với lúc báo cáo).

**Cường độ tương tác cộng đồng cao nhất:**
- **Copilot CLI** — 36 issue cập nhật trong 24h, nhưng **không có hoạt động PR nào** và mệt mỏi vì hồi quy tái diễn (nhu cầu kênh ổn định, #5203). Tín hiệu: cơ sở người dùng lớn, thông lượng maintainer căng thẳng.
- **Claude Code** — Tương tác mỗi thread cao nhất (278 bình luận ở #27302; 424👍), nhưng sức khỏe tracker suy giảm do **cụm trùng lặp** (5+ issue context-window gần như giống hệt) và bị thổi phồng nhân tạo bởi `/feedback` 403 hỏng (#55348).

**Do cộng đồng dẫn dắt nhất (lực hấp dẫn từ khả năng mở rộng):**
- **OpenCode** và **Pi** — Cả hai đều có sự tham gia dày đặc của **tác giả plugin**; các issue gắn nhãn "fix-available" của Pi và việc merge sửa lỗi xuất HTML nhanh cho thấy vòng lặp contributor↔maintainer lành mạnh.

**Đánh giá độ trưởng thành:**
| Công cụ | Tín hiệu trưởng thành |
|---|---|
| Claude Code | Mô hình chính sách trưởng thành nhất; vệ sinh cộng đồng kém trưởng thành nhất (trùng lặp, feedback hỏng). |
| Codex | **Release engineering** trưởng thành nhất; tương thích Windows/nền tảng kém trưởng thành nhất. |
| Gemini CLI | **Pipeline nghiên cứu tính đúng đắn của agent** trưởng thành nhất (AST, trạng thái bền vững). |
| Copilot CLI | **Tích hợp IDE** trưởng thành nhất; **vòng đời auth** kém trưởng thành nhất. |
| OpenCode | **Bề mặt plugin** trưởng thành nhất; **giam giữ sandbox** kém trưởng thành nhất. |
| Pi | Văn hóa **hiệu năng TUI** trưởng thành nhất; **nhịp phát hành** kém trưởng thành nhất. |
| Qwen Code | Tầm nhìn **daemon/serve** trưởng thành nhất; kỷ luật **kênh ổn định** kém trưởng thành nhất. |

---

## 6. Tín hiệu xu hướng

**Cho đội ngũ sản phẩm & nền tảng:**
1. **Quản trị là cuộc chiến tính năng mới.** Qua ba công cụ (Claude, Codex, Copilot), câu chuyện bảo mật đã chuyển từ *liệu* agent có thể làm X sang *chính sách của ai thắng khi tổ chức và người dùng bất đồng*. Bất kỳ RFP AI CLI doanh nghiệp nào năm 2027 nên hỏi: *"Plugin cá nhân có thể nới lỏng quy tắc deny của tổ chức không?"* — hiện nay, chỉ Claude có câu trả lời tường minh (không).
2. **Xác thực MCP là mắt xích yếu nhất của hệ sinh thái.** Bốn trong bảy công cụ cho thấy bug vòng đời thông tin xác thực (Copilot nghiêm trọng nhất). Lời hứa của MCP bị suy yếu bởi xử lý refresh OAuth, cache token, và luồng chế độ headless. **Ai phát hành SDK xác thực MCP tham chiếu trước sẽ giành được hệ sinh thái tích hợp.**
3. **Telemetry agent trung thực đang trở thành kỳ vọng cơ bản.** `GOAL` sai, tool-drop âm thầm, báo cáo capacity sai — người dùng không còn dễ dãi với ngữ nghĩa trạng thái mang tính xấp xỉ. Các công cụ cho thấy *tại sao* một hành động dừng lại sẽ tạo khác biệt.
4. **Windows vẫn là thuế đúng đắn của ngành.** Năm trong bảy công cụ báo cáo hồi quy đặc thù Windows hôm nay. Tương thích đa nền tảng nên được coi là **luồng công việc kỹ thuật hạng nhất**, không phải hàng đợi bug.



---

## Báo cáo chi tiết từng công cụ

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Điểm nóng cộng đồng Claude Code Skills

> Nguồn dữ liệu: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Báo cáo điểm nổi bật cộng đồng

*Dữ liệu tính đến 2026-10-23 · Nguồn: github.com/anthropics/skills*

---

## 1. Bảng xếp hạng Skills hàng đầu

Repository trả về số lượng bình luận là `undefined` cho tất cả PR, nên bảng xếp hạng dưới đây dựa trên mức độ chú ý đa tín hiệu (cập nhật, tham chiếu chéo issue, hoạt động lặp lại của tác giả, và các Issue liên kết chéo). Tất cả PR được liệt kê vẫn đang **OPEN** — chưa có PR nào được merge.

| # | PR | Skill / Phạm vi | Chức năng | Điểm nổi bật trong thảo luận | Trạng thái |
|---|----|---------------|--------------|----------------------|--------|
| 1 | [#1742](https://github.com/anthropics/skills/pull/1742) | Sửa `mcp-builder` | Điều chỉnh `connections.py` cho `mcp>=2.0.0` (đổi tên `streamable_http_client`, custom headers qua `create_mcp_http_client`). | Sửa trực tiếp Issue #1668; liên quan đến cụm lỗi MCP-builder rộng hơn (#1390). | OPEN (cập nhật 2026-10-08) |
| 2 | [#1298](https://github.com/anthropics/skills/pull/1298) | Sửa `skill-creator` | Cô lập trigger evals, sửa lỗi `select()` của subprocess trên Windows và phân loại sai runtime-error. | Tương ứng với Issue #1383 (benchmark thất bại âm thầm, Windows trigger evals). | OPEN (cập nhật 2026-09-16) |
| 3 | [#1245](https://github.com/anthropics/skills/pull/1245) | `notion-spec-to-implementation` + `quantitative-resume-auditor` | Chuyển đổi spec sản phẩm/kỹ thuật thành task triển khai trên Notion; đánh giá CV theo định lượng. | Gửi hai skill trong một; mở từ tháng Sáu. | OPEN (cập nhật 2026-10-15) |
| 4 | [#1792](https://github.com/anthropics/skills/pull/1792) | Sửa `docx` | Báo cáo timeout của LibreOffice như lỗi thực sự và xác minh revision marks đã bị xóa trước khi báo thành công. | Đi kèm Issue #2018 (`merge_runs.py` XML không hợp lệ) tạo thành nhóm về độ tin cậy của docx. | OPEN (cập nhật 2026-09-25) |
| 5 | [#1980](https://github.com/anthropics/skills/pull/1980) | Sửa bảo mật `webapp-testing` | Loại bỏ `shell=True` trong `with_server.py`, đóng rủi ro command-injection CWE-78. | Tăng cường bảo mật — hiếm gặp trong repo này; được cộng đồng ủng hộ. | OPEN (cập nhật 2026-10-22) |
| 6 | [#1771](https://github.com/anthropics/skills/pull/1771) | `proofcore-contract-auditor` | Phân tích tĩnh hợp đồng Solidity/Rust với chứng thực Merkle-proof trên TON. | Đề xuất skill Web3/blockchain đầu tiên; lĩnh vực mới. | OPEN (cập nhật 2026-09-16) |
| 7 | [#1703](https://github.com/anthropics/skills/pull/1703) | `md2video-audio` | Biên dịch Markdown → MP4 với slide Marp và voiceover giống người thật. | Pipeline media chi phí bằng không; cập nhật tích cực trong tháng Chín. | OPEN (cập nhật 2026-09-15) |
| 8 | [#525](https://github.com/anthropics/skills/pull/525) | `pyxel` | Phát triển game retro với chạy input headless và kiểm tra frame. | Tồn tại lâu (mở từ tháng Ba), vẫn nhận cập nhật trong tháng Chín. | OPEN (cập nhật 2026-09-22) |

*Cũng đáng chú ý (lâu hơn nhưng vẫn tồn tại):* [#514](https://github.com/anthropics/skills/pull/514) `document-typography`, [#486](https://github.com/anthropics/skills/pull/486) `odt`, [#83](https://github.com/anthropics/skills/pull/83) `skill-quality-analyzer` + `skill-security-analyzer`.

---

## 2. Xu hướng nhu cầu cộng đồng

Tổng hợp từ 15 Issue hàng đầu theo số lượng bình luận:

**a. Tin cậy & Bảo mật Namespace** — Issue [#492](https://github.com/anthropics/skills/issues/492) (46 bình luận, mục được thảo luận nhiều nhất) chỉ ra rằng các skill cộng đồng được công bố dưới namespace `anthropic/` là một vector lạm dụng ranh giới tin cậy. Đây là tín hiệu nhu cầu mạnh nhất trong repo và được củng cố bởi bản sửa command-injection trong PR #1980.

**b. Chia sẻ Skill ở cấp Tổ chức** — Issue [#228](https://github.com/anthropics/skills/issues/228) (17 bình luận, 8 👍) yêu cầu thư viện skill dùng chung / link chia sẻ trực tiếp, thay thế quy trình "tải .skill rồi gửi qua Slack" hiện tại.

**c. Độ tin cậy của Đánh giá & Benchmark** — Issue [#556](https://github.com/anthropics/skills/issues/556) (13 bình luận, 7 👍, tỷ lệ trigger 0%) cùng #1383, #1390, #1394 tạo thành một cụm rõ ràng: cộng đồng muốn harness đánh giá của skill-creator / mcp-builder thực sự hoạt động.

**d. Hiệu quả Context & Memory** — Issue [#1487](https://github.com/anthropics/skills/issues/1487) (`claude-api` chèn ~156k token) và [#1329](https://github.com/anthropics/skills/issues/1329) (`compact-memory` ký hiệu symbolic) cho thấy nhu cầu về skill tiết kiệm token và trạng thái agent gọn nhẹ.

**e. Quản trị & Chất lượng Suy luận** — Issue [#412](https://github.com/anthropics/skills/issues/412) (agent-governance) và [#1385](https://github.com/anthropics/skills/issues/1385) (Reasoning Quality Gate Pipeline) phản ánh nhu cầu ngày càng tăng với các meta-skill về an toàn/chất lượng.

**f. Vệ sinh Đóng gói** — Issue [#189](https://github.com/anthropics/skills/issues/189) (9 👍) báo cáo `document-skills` và `example-skills` phát hành nội dung giống hệt nhau — nhu cầu về ranh giới plugin rõ ràng.

---

## 3. Skills đang chờ có tiềm năng cao

Các PR có bình luận sôi nổi với cập nhật gần đây, khả năng được merge sớm:

- **[#1742](https://github.com/anthropics/skills/pull/1742) — tương thích `mcp>=2` cho mcp-builder.** Sửa lỗi hồi quy đã phát hành; xác suất merge cao nhất.
- **[#1980](https://github.com/anthropics/skills/pull/1980) — loại bỏ `shell=True` trong webapp-testing.** Bản sửa bảo mật, cập nhật trong vòng 24h tính từ thời điểm chụp dữ liệu.
- **[#1977](https://github.com/anthropics/skills/pull/1977) & [#1976](https://github.com/anthropics/skills/pull/1976) — `wrapAround()` của algorithmic-art + `element_discovery.py` của webapp-testing.** Cặp bản sửa nhỏ, phạm vi rõ ràng từ cùng một tác giả (cả hai đóng Issue #1897 / #1891 hiện có); merge rủi ro thấp.
- **[#1997](https://github.com/anthropics/skills/pull/1997) — phân tích YAML frontmatter của skill-creator.** Bản sửa tính đúng đắn cho tối ưu hóa eval/description.
- **[#1792](https://github.com/anthropics/skills/pull/1792) — xử lý timeout LibreOffice của docx.** Giải quyết một chế độ lỗi thực tế; bổ sung cho Issue #2018.
- **[#1681](https://github.com/anthropics/skills/pull/1681) — thực thi trực tiếp `package_skill.py` của skill-creator.** Sửa `ModuleNotFoundError` khi chạy độc lập.
- **[#1734](https://github.com/anthropics/skills/pull/1734) — Phát hiện bình luận docx mồ côi.** PR tính năng nhỏ, tập trung.
- **[#1730](https://github.com/anthropics/skills/pull/1730) — dọn URL chết của claude-api.** Bảo trì tầm thường; tất cả URL đã xác minh HTTP 200.

*Đề xuất skill mới đáng theo dõi:* [#1703](https://github.com/anthropics/skills/pull/1703) `md2video-audio`, [#1615](https://github.com/anthropics/skills/pull/1615) `scnet-hpc`, [#1771](https://github.com/anthropics/skills/pull/1771) `proofcore-contract-auditor`.

---

## 4. Góc nhìn về hệ sinh thái Skills

> **Nhu cầu tập trung nhất của cộng đồng không phải là Skills mới mà là tin cậy, tính đúng đắn và độ ổn định của những skill hiện có** — tăng cường namespace/bảo mật (#492), harness đánh giá hoạt động được (#556, #1383), và các bản sửa đóng gói/phân tích chiếm ưu thế so với đề xuất năng lực hoàn toàn mới.

---

# Claude Code Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Hai bản patch đã ra mắt (v2.1.308, v2.1.309), trong đó v2.1.309 xử lý các hành vi sandbox liên quan đến bảo mật trên macOS/Linux, bao gồm các file khởi động shell rò rỉ ra ngoài sandbox và việc phân giải glob `denyWrite` có nhận biết symlink. Issue tracker vẫn bị chi phối bởi **cụm lỗi hồi quy "Code tab" trên desktop** liên quan đến việc thiếu chỉ báo mức sử dụng context-window, kéo theo nhiều thread trùng lặp trên cả Windows lẫn macOS. Trong khi đó, sáng kiến mở rộng "Mods" (#91870) tiếp tục là enhancement có mức độ tương tác cao nhất, sau tính năng hỗ trợ đa tài khoản Connector.

## 2. Releases

**v2.1.309**
- Sửa lỗi các lệnh Bash trong sandbox trên macOS/Linux thực thi các file khởi động của shell **bên ngoài sandbox** trước mỗi lệnh (liên quan đến bảo mật — có thể là vector thoát trước khi chạy lệnh).
- Sửa lỗi các pattern glob `denyWrite` của sandbox macOS không được áp dụng tại **vị trí thực** của đường dẫn khi thư mục của pattern được truy cập qua symlink (bỏ qua lệnh cấm ghi qua symlink).
- Các bản sửa lỗi sandbox khác (changelog bị cắt ngắn).

**v2.1.308**
- Sửa lỗi chung và cải thiện độ ổn định.

*Đánh giá:* v2.1.309 là bản đáng chú ý — cả hai bản sửa lỗi chính đều vá các lỗ hổng ranh giới sandbox, quan trọng với bất kỳ ai chạy workflow tự động/headless với quyền ghi bị hạn chế.

## 3. Issue nổi bật

1. **[#27302 — Hỗ trợ nhiều tài khoản Connector (cùng connector, khác tài khoản)](https://github.com/anthropics/claude-code/issues/27302)** — OPEN, 278 bình luận, 424 👍. Issue có mức tương tác cao nhất trong tracker. Người dùng cần gán các credential riêng biệt cho cùng một loại connector (ví dụ: hai tổ chức GitHub, hai workspace Slack) trên Claude và Claude Code web. Kiến trúc xác thực là điểm nghẽn.

2. **[#91870 — Mods: làm Claude mở rộng gấp 10 lần](https://github.com/anthropics/claude-code/issues/91870)** — OPEN, 268 bình luận, 131 👍. Nỗ lực mở rộng plugin/hooks chủ lực, kèm cập nhật cộng đồng từ maintainer (9/9 / 1/10). Cụm PR từ `poteat` (bên dưới) là phần triển khai của sáng kiến này.

3. **[#79305 — Ứng dụng desktop: hỗ trợ theme tùy chỉnh / màu accent](https://github.com/anthropics/claude-code/issues/79305)** — OPEN, 23 bình luận, 71 👍. Yêu cầu đồng bộ với hệ thống theme tùy chỉnh của CLI. Lý do rất thực tế: nhận diện cửa sổ trong thiết lập nhiều màn hình.

4. **[#55348 — `/feedback` trả về 403 trong 3 ngày](https://github.com/anthropics/claude-code/issues/55348)** — OPEN, 14 bình luận. Meta-bug kinh niên — kênh phản hồi trong sản phẩm bị hỏng, dồn báo cáo về GitHub. Liên quan: [#101651](https://github.com/anthropics/claude-code/issues/101651) báo cùng lỗi 403 kèm chia sẻ transcript thất bại.

5. **[#95364 — Desktop "stealth update" thoát/khởi động lại khi người dùng vắng mặt, làm mất phiên Remote Control](https://github.com/anthropics/claude-code/issues/95364)** — OPEN, có repro, 12 bình luận, 14 👍. Logic auto-update trong cửa sổ idle giết mọi phiên Remote Control `claude.ai/code`. Ảnh hưởng lớn đến workflow từ xa.

6. **[#97074 — Headless `claude -p` dùng ~1.8× cửa sổ 5 giờ mỗi token so với CLI tương tác](https://github.com/anthropics/claude-code/issues/97074)** — OPEN, có repro, 11 bình luận. Chênh lệch quy kết chi phí giữa entrypoint `sdk-cli` và `cli` tương tác trên cùng workload. Ảnh hưởng trực tiếp đến ngân sách CI/tự động hóa.

7. **[#102094 — Desktop: mức sử dụng context-window không còn hiển thị ở đâu](https://github.com/anthropics/claude-code/issues/102094)** — CLOSED, 10 bình luận, 18 👍. Tâm điểm của cụm hồi quy hiển thị context; việc đóng issue gợi ý đã có hướng khắc phục, nhưng các bản trùng lặp vẫn tiếp tục được gửi (xem #102103, #102133, #102615, #103885, #103918).

8. **[#102095 — Desktop: chọn mức effort giờ cần 3 click thay vì 1](https://github.com/anthropics/claude-code/issues/102095)** — OPEN, 10 bình luận, 11 👍. Hồi quy UX với lập luận chi phí định lượng (≈100 click thêm mỗi ngày cho người hay chuyển đổi). Báo cáo lỗi mẫu mực.

9. **[#75855 — Chữ cái ổ đĩa Windows không được chuẩn hóa trong project keys](https://github.com/anthropics/claude-code/issues/75855)** — OPEN, 10 bình luận. Gây ra các entry trùng lặp trong `.claude.json` / `installed_plugins.json` và âm thầm mất trust của VS Code. Bug correctness tồn tại lâu trên Windows.

10. **[#81377 — Chuyển input-source bằng Caps Lock bị lật hai lần (Hebrew ⇄ English)](https://github.com/anthropics/claude-code/issues/81377)** — OPEN, 3 bình luận. Bug input method không phải tiếng Anh trong ô chat desktop; niche nhưng là rào cản cứng với người dùng bị ảnh hưởng.

*Đáng chú ý thêm:* [#96043](https://github.com/anthropics/claude-code/issues/96043) (MCP elicitation được khai báo nhưng chưa bao giờ được nối trong Desktop), [#104341](https://github.com/anthropics/claude-code/issues/104341) và [#97641](https://github.com/anthropics/claude-code/issues/97641) (agent vượt phạm vi / hành động không được phê duyệt — chủ đề tin cậy tái diễn), [#103788](https://github.com/anthropics/claude-code/issues/103788) (đăng nhập desktop "couldn't verify your browser").

## 4. Tiến độ PR chính

Cả bảy PR được cập nhật đều đến từ một contributor duy nhất (`poteat`) và tạo thành một stack phối hợp **Mods / gia cố sec-default**. Lưu ý: tất cả đều ở trạng thái CLOSED với phụ thuộc thứ tự merge vào các bản engine release — hãy coi như đang chờ, chưa landed.

1. **[#97293 — mods: cờ truncation cho process.run + khai báo mtimeMs trong list](https://github.com/anthropics/claude-code/pull/97293)** — Đặt các khai báo sau hỗ trợ CLI đã release (`isStdoutTruncated`/`isStderrTruncated`, `mtimeMs`) để tránh hứa hẹn API mà CLI đã cài không trả lời được.

2. **[#97334 — sec-default: hàng conversation tiếp tục vượt qua tier người dùng](https://github.com/anthropics/claude-code/pull/97334)** — Yêu cầu `session.append` trên main mà không có release branch nào thiếu nó. Test red-by-construction cho đến khi CLI ship event.

3. **[#97688 — sec-default: bản ghi collector tiếp tục vượt qua tier người dùng](https://github.com/anthropics/claude-code/pull/97688)** — Ngăn plugin của người dùng xóa hoặc viết lại các bản ghi telemetry hướng đến collector do tổ chức đặt. Quan trọng cho tính toàn vẹn audit doanh nghiệp.

4. **[#99118 — diff: toast hiển thị trong khi pane đang mở](https://github.com/anthropics/claude-code/pull/99118)** — Sửa `holdToasts` giữ quá lâu: toast tạm thời của plugin khác bị chặn khi `/diff` đang mở.

5. **[#99137 — sec-default: plugin có thể siết chặt, không bao giờ nới lỏng, chính sách tổ chức](https://github.com/anthropics/claude-code/pull/99137)** — Plugin người dùng không còn có thể gỡ bỏ quy tắc deny/ask hoặc thay đổi biến đã ghim khi sec-default đang được đặt. Không cần engine mới.

6. **[#99141 — diff: giữ pane khi chưa có gì vẽ được nó](https://github.com/anthropics/claude-code/pull/99141)** — Stacked trên #99118; hoãn đóng pane cho đến khi renderer gắn vào.

7. **[#99540 — sec-default: mức trần tool của tổ chức giữ trên plugin do người dùng cài](https://github.com/anthropics/claude-code/pull/99540)** — Áp dụng yêu cầu phê duyệt của tổ chức cho connector tool lên plugin cài riêng; mọi hook quyết định đều có `.catch`.

*Đánh giá:* Một thiết kế bảo mật mạch lạc đang hình thành — **chính sách tổ chức luôn thắng ý muốn plugin cá nhân**, và luồng telemetry/audit chống giả mạo vượt qua tier người dùng. Chờ các bản engine release để mở khóa các merge xếp tầng.

## 5. Thảo luận nổi bật

Không có dữ liệu Discussion trong payload nguồn; phần này được lược bỏ.

## 6. Xu hướng yêu cầu tính năng

- **Khả năng mở rộng & quản trị plugin** — Mods (#91870) cùng stack PR sec-default: hooks, quyền plugin, thứ tự ưu tiên chính sách tổ chức, làm giàu hook `PreToolUse` ([#104458](https://github.com/anthropics/claude-code/issues/104458), đóng cùng ngày).
- **Xác thực đa danh tính / đa tài khoản** — #27302 dẫn đầu với khoảng cách lớn; multiplexing connector/tài khoản là nhu cầu chưa được đáp ứng hàng đầu.
- **Khả năng quan sát usage & context** — Yêu cầu lặp lại về side panel usage ([#104471](https://github.com/anthropics/claude-code/issues/104471)), khôi phục hiển thị context-window (#102623, #103885), và đơn vị token dễ đọc.
- **Đồng bộ Desktop ↔ CLI** — Theme tùy chỉnh (#79305), căn chỉnh cài đặt/hành vi giữa Code tab và CLI.
- **Kiểm soát worktree desktop** — [#104479](https://github.com/anthropics/claude-code/issues/104479): giới hạn hoặc lọc các file `.claude/**` bị gitignore được sao chép vào worktree overlay (hiện không có giới hạn kích thước).

## 7. Điểm đau của nhà phát triển

1. **Hồi quy hiển thị mức sử dụng context-window (desktop)** — Nỗi bực xúc lan rộng và ồn ào nhất. Hơn năm issue gần như trùng lặp (#102094, #102103, #102133, #102615, #103885) báo rằng vòng/popover usage không còn hiển thị context, chỉ hiển thị giới hạn gói. Nguồn gốc hồi quy thậm chí được trích dẫn (#91712). Người dùng gửi trùng lặp hàng loạt — dấu hiệu thay đổi không được thông báo và cách khắc phục chưa rõ.

2. **Kênh phản hồi/báo cáo bị hỏng** — `/feedback` trả 403 (#55348, #101651) và chia sẻ transcript thất bại dồn mọi thứ về GitHub, làm phình tracker và xói mòn niềm tin vào báo cáo trong sản phẩm.

3. **Chi phí & quota không minh bạch** — Đốt quota gấp 1.8× ở chế độ headless (#97074), lãng phí token do lệnh shell thất bại (#104474), và hành vi agent vượt phạm vi đốt ngân sách (#104341, #97641). Nhà phát triển muốn chi tiêu dự đoán được và quy kết được.

4. **Agent hành động mà không có phê duyệt rõ ràng** — Chủ đề tái diễn trong #97641 và #104341: model coi phản hồi mơ hồ là đồng ý và vượt phạm vi công việc được giao. Đây là vấn đề quyền hạn/tin cậy, không chỉ là chất lượng.

5. **Auto-update desktop làm gián đoạn phiên** — Thoát/khởi động lại lén lút làm mất phiên Remote Control (#95364) phá vỡ workflow từ xa chạy dài.

6. **Nợ correctness trên Windows** — Chuẩn hóa chữ cái ổ đĩa (#75855) gây entry cấu hình trùng lặp và mất trust âm thầm; nhiều hồi quy UI desktop đặc thù Windows.

7. **Khoảng trống nền tảng/accessibility** — Lật hai lần input method (#81377), lỗi xác minh đăng nhập desktop (#103788), và survey phiên không thể bỏ qua (#94710, được gửi như bản trùng) — ít về số lượng nhưng gây ma sát lớn cho người dùng bị ảnh hưởng.

---

*Digest được tạo từ hoạt động của github.com/anthropics/claude-code ngày 2026-10-23. Lưu ý: các PR # ở trạng thái CLOSED và phần lớn phụ thuộc engine release; "closed" ở đây không có nghĩa là đã merged.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Nhóm Codex đã phát hành thêm ba bản dựng `rust-v0.164.0-alpha` đồng thời hợp nhất một loạt lớn các PR hạ tầng xoay quanh cấu hình được quản lý, hook theo phạm vi môi trường và truy vết rollout. Về phía cộng đồng, một lỗi tuần tự hóa trên desktop macOS đã đóng (#55744) thu hút lượng tương tác lớn (168 👍, 84 bình luận), trong khi người dùng desktop Windows tiếp tục báo cáo một cụm lỗi rò rỉ bộ nhớ/tiến trình và lỗi "model at capacity". Các vấn đề liên quan đến auth, sandbox và BYOK vẫn là những nhóm lỗi được thảo luận sôi nổi nhất.

## 2. Bản phát hành

Ba bản dựng tiền phát hành đã được công bố trong 24 giờ qua (tất cả thuộc kênh `rust-`):
- **rust-v0.164.0-alpha.12** — openai/codex Releases
- **rust-v0.164.0-alpha.11.1** — openai/codex Releases
- **rust-v0.163.0-alpha.11.2** — openai/codex Releases

Không có changelog chi tiết nào được cung cấp; đây có vẻ là các bản lặp alpha tăng dần của dòng 0.164/0.163.

## 3. Issue nổi bật

1. **#55744 [CLOSED]** Ứng dụng macOS 26.1016.51333 không mở được chat với lỗi "Cannot serialize value" — https://github.com/openai/codex/issues/55744 — Issue có lượng tương tác cao nhất (84 bình luận, 168 👍). Một lỗi tuần tự hóa ở tin nhắn đầu tiên đã chặn mọi chat mới đối với người dùng macOS; việc đóng issue này là tín hiệu mạnh cho thấy nhóm đang ưu tiên độ ổn định của desktop.

2. **#54841 [OPEN]** Chế độ Work chặn gửi tin nhắn ở chế độ BYOK khi bật công cụ trình duyệt/máy tính cục bộ — https://github.com/openai/codex/issues/54841 — Lỗi hồi quy BYOK + Work mode ảnh hưởng đến người dùng Windows; 37 bình luận cho thấy tác động rộng đến các quy trình trả phí.

3. **#50329 [OPEN]** Ứng dụng Windows: `read_thread` chỉ trả về `chatgpt-content-reference` cho các phản hồi đã hoàn tất — https://github.com/openai/codex/issues/50329 — Vấn đề giao thức app-server trên bản dựng Windows MSIX; liên quan đến bất kỳ ai tích hợp với Codex theo cách lập trình.

4. **#51731 / #52873 [OPEN]** Tích hợp Dot thất bại: "unsupported placement format version 3" khi đọc luồng Codex — https://github.com/openai/codex/issues/51731 | https://github.com/openai/codex/issues/52873 — Hai báo cáo liên quan về khả năng tương thích luồng Dot<->Codex; cho thấy sự không khớp phiên bản schema trong định dạng placement.

5. **#51649 [OPEN]** Windows Codex Desktop tích lũy 200 tiến trình Node phụ và ~11,6 GB bộ nhớ — https://github.com/openai/codex/issues/51649 — Lỗi hồi quy rò rỉ tài nguyên nghiêm trọng trên Windows; tương đồng với vòng lặp EPERM của cua_node trong #42484.

6. **#42484 [OPEN]** `cua_node rename_staging` EPERM lặp vô hạn, tiêu tốn ~59 GB — https://github.com/openai/codex/issues/42484 — Trường hợp cực đoan của nhóm rò rỉ tiến trình trên Windows; tồn tại lâu dài và vẫn tái hiện được.

7. **#51667 [OPEN]** macOS VM: Tin nhắn Codex bị chặn sau khi cập nhật lên 26.1002.52244 — https://github.com/openai/codex/issues/51667 — Tương tác auth/kiểm tra an toàn phá vỡ việc gửi tin nhắn trong môi trường VM (UTM).

8. **#51053 [OPEN]** iOS Remote không xem được tác vụ Codex đang hoạt động trong VS Code do writer lock — https://github.com/openai/codex/issues/51053 — Lỗi sở hữu phiên giữa các thiết bị; liên quan đến luồng công việc đa thiết bị trong Discussion #14067.

9. **#56264 [OPEN]** Windows desktop: khôi phục luồng thất bại vì `process.env` của MXC thiếu `SYSTEMROOT` — https://github.com/openai/codex/issues/56264 — Lỗi hồi quy sandbox mới (22/10); ngăn khôi phục các chat hiện có.

10. **#56328 / #55746 / #52894 [OPEN]** "Selected model is at capacity" trên mọi model — https://github.com/openai/codex/issues/56328 | https://github.com/openai/codex/issues/55746 | https://github.com/openai/codex/issues/52894 — Một cụm báo cáo liên quan đến capacity trải rộng CLI, Desktop và tài khoản Pro, gợi ý hoặc cấu hình sai rate-limit hoặc sự kiện capacity ở backend.

## 4. Tiến triển PR chính

1. **#56343** Chạy hook môi trường trên đúng executor sở hữu chúng — https://github.com/openai/codex/pull/56343 — Đảm bảo hook lệnh thực thi với shell, cwd và chính sách mạng đúng theo từng môi trường.

2. **#56314** Thêm loader cấu hình được quản lý cho các config server tùy chỉnh — https://github.com/openai/codex/pull/56314 — Giới thiệu lựa chọn `config_server` và tải bundle tại `<base_url>/codex/config/bundle`.

3. **#56295** Tách việc tải cấu hình được quản lý khỏi xác thực ChatGPT — https://github.com/openai/codex/pull/56295 — Tái cấu trúc thành interface `BundleSource`; cho phép thiết lập BYOK/doanh nghiệp độc lập với auth ChatGPT.

4. **#56304 / #56302** Hook được quản lý theo phạm vi môi trường và cấu hình hook trên attachment môi trường — https://github.com/openai/codex/pull/56304 | https://github.com/openai/codex/pull/56302 — Đặt nền tảng cho việc thực thi và khám phá hook theo từng môi trường.

5. **#56330** Cho phép đánh thức agent-message tôn trọng interrupt và chế độ Plan — https://github.com/openai/codex/pull/56330 — Sửa race condition khi tin nhắn agent trong hàng đợi có thể bị tiêu thụ sau một interrupt.

6. **#56312** Theo dõi lịch sử hội thoại được chấp nhận trong rollout trace — https://github.com/openai/codex/pull/56312 — Cải thiện độ trung thực của trace bằng cách phân biệt các lần thử model bị loại bỏ với đầu ra được chấp nhận.

7. **#56308** Tách phạm vi thư mục và repository trong TUI — https://github.com/openai/codex/pull/56308 — Khôi phục lọc chỉ theo `Cwd` tách biệt với nhóm repo linked-worktree.

8. **#56292 / #56293** Sửa hạ tầng kiểm thử: callback metadata hủy MCP; fixture auth Vertex dùng token cố định — https://github.com/openai/codex/pull/56292 | https://github.com/openai/codex/pull/56293 — Gỡ rào cản cho việc giải quyết credential đồng thời trong test.

9. **#56288 / #56290** Ghim Cosign ở v3.1.4 để ký artifact Linux; khóa công cụ build phát hành Python bằng `uv` — https://github.com/openai/codex/pull/56288 | https://github.com/openai/codex/pull/56290 — Tăng cường chuỗi cung ứng cho pipeline phát hành.

10. **#24663** Tuần tự hóa việc làm mới token ChatGPT được quản lý — https://github.com/openai/codex/pull/24663 — PR tồn tại lâu cuối cùng đã đóng; ngăn race condition làm mới token giữa các tiến trình dùng chung `CODEX_HOME`.

## 5. Thảo luận nổi bật

### Ý tưởng
- **#14067** Đồng bộ luồng Codex và ngữ cảnh phiên giữa các thiết bị (13 bình luận, 69 👍) — https://github.com/openai/codex/discussions/14067 — Yêu cầu tính năng được bình chọn cao nhất; liên quan trực tiếp đến lỗi writer-lock iOS Remote (#51053) và lỗi remote SSH trên desktop (#53080).
- **#56158** Mang trở lại nút worktree (0 bình luận, 1 👍) — https://github.com/openai/codex/discussions/56158 — Khiếu nại nhỏ nhưng gay gắt về lỗi hồi quy UX do nút worktree bị ẩn.
- **#56157** Chạy Codex CLI trên Android qua LinDesk — https://github.com/openai/codex/discussions/56157 — Demo quy trình di động thực tế; cho thấy nhu cầu về các mục tiêu Codex không phải desktop.

### Hỏi & Đáp
- **#55792** Windows desktop: đường review nào được hỗ trợ khi `/approve` không khả dụng? — https://github.com/openai/codex/discussions/55792 — Người dùng muốn có cơ chế ghi đè phê duyệt rõ ràng sau khi auto-review từ chối một hành động.
- **#56208** Chrome downloads: thiết lập nào được hỗ trợ để thu thập file không giám sát đáng tin cậy? — https://github.com/openai/codex/discussions/56208 — Câu hỏi về độ tin cậy của browser-use sau `ERR_BLOCKED_BY_CLIENT` khi tải PDF đã xác thực.

### Show and tell
- **#56176** Phiên Codex mới có nhận được `AGENTS.md` không? Kiểm tra before/after có thể lặp lại (Agent Relay Check v0.1.1) — https://github.com/openai/codex/discussions/56176
- **#56181** `pytest-codex`: biến quy tắc `AGENTS.md` thành kiểm tra pytest với replay offline (v0.2.0) — https://github.com/openai/codex/discussions/56181
- **#56337** Off the Wall: nhớ lại các sửa đổi trước đây trước khi Codex trả lời — https://github.com/openai/codex/discussions/56337
- **#54813** Octuo: giao mục tiêu cho Codex dưới tài khoản riêng, nhận kết quả về — https://github.com/openai/codex/discussions/54813
- **#56215** GFT-Merge: kết hợp các hội thoại cục bộ và bắt đầu phiên Codex mới — https://github.com/openai/codex/discussions/56215
- **#56242** ibara: tác vụ Codex desktop đầu tiên trên máy tính dự phòng Omarchy — https://github.com/openai/codex/discussions/56242
- **#55421** Nguyên mẫu authorization-gateway TAHU tìm 3 nhà phát triển dùng thử — https://github.com/openai/codex/discussions/55421

## 6. Xu hướng yêu cầu tính năng

- **Đồng bộ phiên đa thiết bị** — #14067 (69 👍) là tín hiệu rõ ràng nhất; kết hợp với các issue remote/SSH và writer-lock iOS (#51053, #53080), cho thấy nhu cầu về lớp phiên Codex đa máy thống nhất.
- **UX rate-limit và tự động hóa reset** — #32586 yêu cầu tự động dùng các lượt reset tích trữ trước khi hết hạn; các lỗi capacity (#56328, #55746, #52894) càng củng cố nhu cầu hiển thị rõ hơn trạng thái quota.
- **Kiểm soát worktree & phạm vi** — #56158 (nút worktree) và PR #56308 (phạm vi thư mục vs repo trong TUI) cho thấy người dùng muốn các chỉ báo phạm vi rõ ràng, luôn hiển thị.
- **Công cụ xác minh chỉ dẫn agent** — Hai dự án cộng đồng #56176 (Agent Relay Check) và #56181 (pytest-codex) đều nhắm đến việc xác minh `AGENTS.md` thực sự được áp dụng, gợi ý nhu cầu về công cụ truy vết nguồn gốc chỉ dẫn từ phía chính thức.
- **Bộ nhớ sửa đổi / tùy chọn lâu dài** — #56337 (Off the Wall) và #56215 (GFT-Merge) đều giải quyết việc tái sử dụng các tương tác/sửa đổi trước đây giữa các phiên.

## 7. Điểm đau của nhà phát triển

- **Bất ổn định trên Windows desktop chiếm ưu thế trong báo cáo lỗi.** Rò rỉ bộ nhớ và tiến trình Node/MXC phụ chạy loạn (#51649, #42484, #52343), khôi phục luồng thất bại sau cập nhật (#56264), vòng lặp từ chối truy cập khi hydration nền (#51572) và lỗi khởi động headless (#41540) tạo thành cụm khiếu nại lớn nhất.
- **"Selected model is at capacity" tái diễn trên nhiều nền tảng.** Được báo cáo cho CLI, Desktop và Web/Work (#56328, #55746, #52894) — bao gồm một trường hợp cụ thể theo tài khoản khi tài khoản khác hoạt động trên cùng máy, gợi ý lỗi cấu hình capacity/quota theo tài khoản thay vì tải thực sự.
- **Lỗi hồi quy auth và BYOK chặn quy trình trả phí.** #54841 (BYOK Work mode), #51667 (chặn tin nhắn trên macOS VM) và #52894 (gating capacity trên Pro) đều ngăn người dùng gửi tin nhắn dù có subscription hợp lệ.
- **Biến sandbox/môi trường phá vỡ khôi phục luồng.** Thiếu `SYSTEMROOT` dưới MXC trong #56264, cộng với vấn đề sandbox `/diff` trên Windows tồn tại lâu (#28649), cho thấy hệ thống môi trường trên Windows còn mong manh.
- **Khoảng cách tương thích giữa Desktop ↔ remote/bề mặt ngoài.** Dot từ chối các luồng do người dùng tạo (#51731, #52873), iOS Remote gặp writer lock (#51053) và chat remote SSH không hiển thị lịch sử (#53080) — bề mặt "kết nối mọi thứ với Codex" vẫn còn dễ vỡ.
- **CLI/TUI vẫn còn nhiều phiền toái nhỏ.** Các vấn đề nhỏ nhưng dai d

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Độ tin cậy của agent vẫn là chủ đề chính trong chu kỳ này: một lỗi P1 ở subagent (#22323) báo cáo sai thành công `GOAL` sau khi chạm `MAX_TURNS`, trong khi lỗi treo của generalist agent (#21409, 8 👍) tiếp tục thu hút phiếu bầu từ cộng đồng. Về phía PR, một bản sửa cấu hình quan trọng (#29762) giữ nguyên các chỉnh sửa trên đĩa trong khi thay đổi xác thực, và việc ghi vào credential-store đang được chuyển sang dạng atomic (#29765) để ngăn mất dữ liệu keychain âm thầm.

## 2. Bản phát hành

**v0.67.0-nightly.20261023.ga713410ab**
- fix(a2a-server,core): giữ nguyên metadata mở rộng về token usage và đồng bộ báo cáo theo từng lượt ([#29834](https://github.com/google-gemini/gemini-cli/pull/29834))
- fix(core): đảm bảo mọi lượt model có function call đều nhận được thought signature ([@amelidev](https://github.com/google-gemini/gemini-cli))

## 3. Issue nóng

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent báo cáo thành công `GOAL` sau `MAX_TURNS`, che giấu việc bị ngắt. 13 bình luận; một lỗi đúng đắn làm xói mòn niềm tin vào báo cáo trạng thái của agent. *P1, need-retesting.*
2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — Đề xuất tận dụng khả năng bash của Gemini thông qua sandbox OS không phụ thuộc và định tuyến ý định sau thực thi. 9 bình luận; một hướng nâng cao năng lực agent có ý nghĩa chiến lược.
3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist agent treo vô thời hạn với các tác vụ đơn giản như tạo thư mục. 8 👍; issue được cộng đồng bình chọn cao nhất trong danh sách, cho thấy ảnh hưởng rộng.
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — EPIC đánh giá việc đọc file, tìm kiếm và lập bản đồ codebase theo AST. 7 bình luận; một điều tra nền tảng về hiệu quả.
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — Gemini hiếm khi tự động gọi custom skill/sub-agent mà không có chỉ dẫn rõ ràng. 7 bình luận; rào cản áp dụng cho các tính năng mở rộng.
6. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — Lỗi 400 khi đăng ký hơn 128 tool. 3 bình luận; giới hạn mở rộng thực tế cho người dùng dùng nhiều MCP.
7. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)** — Agent nên dừng/khuyến cáo tránh các lệnh phá hoại (`git reset`, `--force`). 1 👍; lo ngại an toàn cho thao tác git và DB.
8. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)** — Browser Agent bỏ qua các ghi đè trong `settings.json` như `maxTurns`. 4 bình luận; mâu thuẫn về thứ tự ưu tiên cấu hình trong agent stack.
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — Browser subagent thất bại trên Wayland dù báo cáo `GOAL`. *Lỗi P1*; khoảng trống tương thích desktop Linux.
10. **[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)** — Thay `WriteToDo` bằng theo dõi tác vụ dựa trên file lâu dài để chống context rot và mất ký ức phiên. 2 bình luận; cải thiện UX mang tính cấu trúc.

## 4. Tiến độ PR chính

1. **[#29762](https://github.com/google-gemini/gemini-cli/pull/29762)** — fix(settings): giữ chỉnh sửa trên đĩa khi thay đổi xác thực *(P1, size/l)* — ngăn snapshot lúc khởi động ghi đè các thay đổi cấu hình đồng thời.
2. **[#29765](https://github.com/google-gemini/gemini-cli/pull/29765)** — fix(core): ghi `FileKeychain` atomic, tuần tự hóa — ngăn mất credential âm thầm và khóa tài khoản do ghi đồng thời/bị gián đoạn.
3. **[#29767](https://github.com/google-gemini/gemini-cli/pull/29767)** — fix(core): giới hạn khám phá MCP `tools/list` với timeout mặc định 60 giây — loại bỏ tình trạng khám phá bị treo 10 phút âm thầm.
4. **[#29688](https://github.com/google-gemini/gemini-cli/pull/29688)** — fix(core): đóng lỗ hổng vượt qua guard command-substitution qua cờ shell wrapper — tăng cường bảo mật cho `stripShellWrapper()`.
5. **[#29838](https://github.com/google-gemini/gemini-cli/pull/29838)** — fix(core): giải quyết đường dẫn file tương đối theo workspace root đang hoạt động của IDE *(P1, maintainer-only)* — sửa việc nhắm mục tiêu của file tool trong ngữ cảnh đa root.
6. **[#29859](https://github.com/google-gemini/gemini-cli/pull/29859)** — fix(cli): hiển thị các tool call đang thực thi của subagent trong task tree — khôi phục khả năng hiển thị subagent trên UI.
7. **[#29761](https://github.com/google-gemini/gemini-cli/pull/29761)** — fix(core): ngăn các mẫu `$&`/`` $` ``/`$'`/`$$` làm hỏng prompt template và `{{args}}`.
8. **[#29771](https://github.com/google-gemini/gemini-cli/pull/29771)** — fix(cli): chỉ tự động nhắc khi continuation thực sự trống và chờ đúng cách.
9. **[#29880](https://github.com/google-gemini/gemini-cli/pull/29880)** — feat(cli): thêm lệnh `gemini models` và cờ `--list-models` với đầu ra JSON — cải thiện scripting/khám phá.
10. **[#29884](https://github.com/google-gemini/gemini-cli/pull/29884)** — fix(core): cho phép đường dẫn hệ thống tin cậy trên Android/Termux để giải quyết ripgrep.

## 5. Thảo luận nóng

Không có dữ liệu thảo luận cho giai đoạn này; mục này được lược bỏ.

## 6. Xu hướng yêu cầu tính năng

- **Tooling theo AST**: Hai EPIC liên kết (#22745, #22746, #22747) theo đuổi việc đọc/tìm kiếm kiểu AST-grep để giảm số lượt và nhiễu token.
- **Trạng thái tác vụ lâu dài**: Nhiều issue (#18836, #21000) kêu gọi theo dõi tác vụ dựa trên file thay vì `WriteToDo` trong context để giảm context rot.
- **Agent tự nhận thức**: #21432 yêu cầu tự báo cáo chính xác cờ CLI/hotkey; #22598 yêu cầu hiển thị quỹ đạo subagent qua `/chat share`.
- **Tiết kiệm token**: #19561 đề xuất đọc "Tactful Extraction" có chọn lọc so với mức cơ sở ~36,6k token/lượt.
- **Subagent song song & bộ nhớ chia sẻ**: #18287 khám phá cộng tác, hiện đang bị chặn bởi hỗ trợ song song.

## 7. Điểm đau của nhà phát triển

- **Báo cáo thành công sai** (#22323, #21983): subagent báo cáo `GOAL` dù chạm giới hạn hoặc thất bại — ngữ nghĩa trạng thái không đáng tin.
- **Agent treo** (#21409, #22465): generalist agent và prompt tương tác (ví dụ: tạo khung Vite) đình trệ vô thời hạn.
- **Ghi đè cấu hình bị bỏ qua** (#22267): các giá trị `settings.json` như `maxTurns` bị Browser Agent âm thầm bỏ qua.
- **Giới hạn số lượng tool** (#24246): lỗi 400 khi có hơn 128 tool buộc phải giới hạn thủ công.
- **Vệ sinh workspace** (#23571): script tạm rải rác khắp thư mục gây khó khăn cho commit sạch.
- **Rủi ro lệnh phá hoại** (#22672): dùng `git reset`/`--force` không an toàn mà không có rào chắn.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Nhóm Copilot CLI đã phát hành **v1.0.103**, mang đến các bản sửa lỗi thiết thực xoay quanh việc sao chép code block, xử lý cờ sandbox của ACP, và độ tin cậy khi kết nối lại cloud. Trong khi đó, issue tracker hoạt động bất thường: **36 issue được cập nhật trong 24 giờ qua**, với một cụm đáng chú ý xoay quanh **xác thực MCP/xử lý OAuth token** (Issue #5229, #5233, #5234, #5236) và hệ quả kéo dài từ lỗi **segfault của voice server trên WSL2** xuất hiện từ 1.0.100. Không có pull request nào được cập nhật trong khoảng thời gian này.

---

## 2. Bản phát hành

### v1.0.103 — phát hành 2026-10-22
- **Hành vi sao chép code block**: Nhấp vào code block trong phản hồi đã hoàn thành giờ sẽ sao chép code gốc (trước khi render) khi được bật — sửa lỗi mất định dạng/cắt ngắn trước đây.
- **Tôn trọng cài đặt sandbox của ACP**: Các phiên ACP giờ tuân thủ cài đặt sandbox đã lưu và cờ `--sandbox`/`--no-sandbox`, *kể cả khi resume*.
- **Khả năng phục hồi khi kết nối lại cloud**: Phản hồi từ cloud giữ nguyên toàn bộ văn bản khi CLI kết nối lại sau khi mất kết nối.
- **Cải thiện trình duyệt phiên** (changelog bị cắt ngắn).

Liên kết: [github/copilot-cli releases](https://github.com/github/copilot-cli/releases)

---

## 3. Issue nổi bật

1. **#5197 — Voice server segfault (signal 11) trên WSL2 sau 1.0.100** [OPEN]
   Lỗi hồi quy ảnh hưởng nặng: `/voice` treo ở "Fetching voice models" vì voice runtime crash vài giây sau khi khởi chạy. 4 bình luận, 2👍 — người dùng thực sự bị chặn khỏi tính năng này.
   https://github.com/github/copilot-cli/issues/5197

2. **#3013 — Hooks không kích hoạt cho background (task) agents** [CLOSED]
   Lỗi liên quan đến an toàn: các permission hook chặn lệnh nguy hiểm bị bỏ qua khi lệnh chạy qua subagent. Đã đóng sau thảo luận dài. 4 bình luận, 0👍 nhưng mức độ nghiêm trọng cao.
   https://github.com/github/copilot-cli/issues/3013

3. **#4065 — Che giấu bí mật quá mạnh tay** [OPEN]
   Việc che giấu làm hỏng nội dung hợp lệ (ví dụ: `${env.AUTH_TOKEN}` trong file spec). 3 bình luận, 3👍 — cộng đồng đồng ý rằng điều này làm hỏng các file cấu hình thực tế.
   https://github.com/github/copilot-cli/issues/4065

4. **#5232 — Trusted folders âm thầm tự động phê duyệt thực thi shell trong chế độ thủ công** [OPEN]
   Việc kiểm soát dựa trên đường dẫn không thể dự đoán tác dụng phụ — ví dụ: `powershell.exe -NoProfile -Ex...` chạy script, `sqlcmd`, hoặc `curl`. Một lo ngại nghiêm trọng về mô hình quyền. 2 bình luận.
   https://github.com/github/copilot-cli/issues/5232

5. **#5203 — Yêu cầu tính năng: Kênh phát hành ổn định** [OPEN]
   Các bản phát hành nhanh đang phá vỡ quy trình làm việc hàng ngày; người dùng muốn có kênh Stable/Beta như các công cụ dev khác. 2 bình luận.
   https://github.com/github/copilot-cli/issues/5203

6. **#5219 — Subagent `task` với model id không xác định rơi về giới hạn 128k và làm kẹt phiên** [OPEN]
   Toàn bộ lượt tương tác thất bại với "Request exceeds the model's prompt budget" ngay cả khi context chính vẫn ổn. 2 bình luận.
   https://github.com/github/copilot-cli/issues/5219

7. **#5229 — Chế độ ACP dùng trang ủy quyền OAuth thay vì refresh token** [OPEN]
   Lỗi 401 từ MCP server từ xa kích hoạt luồng trình duyệt ngay cả khi đã lưu refresh token — phá vỡ việc sử dụng headless/agentic. 0 bình luận nhưng đại diện cho cụm xác thực MCP đang lớn dần.
   https://github.com/github/copilot-cli/issues/5229

8. **#5233 — MCP access token hết hạn bị gửi lại liên tục thay vì làm mới** [OPEN]
   Phiên lặp vô hạn ở lỗi 401 mỗi ~... giây, không làm mới token hay nhắc lại. Phá vỡ các phiên MCP dài hạn.
   https://github.com/github/copilot-cli/issues/5233

9. **#5228 — `copilot --resume` không có ID rơi vào phiên trống; danh sách tự động bị thay sau ~2 giây** [OPEN]
   Lỗi hồi quy của Unified Sessions browser khiến việc khôi phục phiên không đáng tin cậy; trust prompt chiếm lần Enter đầu tiên.
   https://github.com/github/copilot-cli/issues/5228

10. **#5224 — Build tương tác không dùng PTY quay vô hạn; cây tiến trình WSL tồn tại qua khởi động lại editor** [OPEN]
    Menu cấu hình tương tác của một build chạy ~10,5 giờ trên một CPU sau khi editor đóng — cho thấy lỗ hổng vòng đời tiến trình trên Windows/WSL.
    https://github.com/github/copilot-cli/issues/5224

*Cũng đáng lưu ý:* **#5238** (xóa toàn bộ cache lặp lại sau ảnh thứ 50 — tốn kém), **#5027** (đã đóng: DNS sandbox Linux hỏng với systemd-resolved), **#4914** (đã đóng: Gemini "Tool name is required" trên lịch sử đa model).

---

## 4. Tiến độ PR chính

Không có pull request nào được cập nhật trong 24 giờ qua (Tổng: 0 mục). Không có mục nào để báo cáo trong phần này.

---

## 5. Thảo luận nổi bật

Không có dữ liệu thảo luận trong nguồn; phần này được lược bỏ.

---

## 6. Xu hướng yêu cầu tính năng

Đúc kết từ 36 issue được cập nhật:

- **Ổn định phát hành & kênh** — Yêu cầu về kênh Stable/Beta (#5203) phản ánh sự mệt mỏi với các bản phát hành nhanh dễ gây hồi quy.
- **Tinh chỉnh mô hình quyền/sandbox** — Trusted folders bỏ qua prompt chế độ thủ công (#5232), hooks không bao phủ subagent (#3013), và DNS sandbox (#5027) cho thấy nhu cầu về một mô hình bảo mật dễ dự đoán và có thể kiểm toán hơn.
- **Vòng đời xác thực MCP** — Nhiều yêu cầu/bản sửa xoay quanh refresh token OAuth, cache token, và duy trì đăng nhập (#5229, #5233, #5234, #5236). Đây là chủ đề mới nổi rõ ràng nhất.
- **Kiểm soát chọn model** — Loại trừ các model không ổn định khỏi chế độ Auto (#5231), và xử lý tốt hơn các model ID subagent không xác định (#5219).
- **Linh hoạt nhập/xuất** — Ghim ô nhập lên đầu (#5227), cuộn chỉ bằng bàn phím (#2750), và ngôn ngữ phiên âm giọng nói có thể cấu hình (#5226).
- **Duy trì context qua compaction** — Giữ `additionalContext` của hook `sessionStart` sau compaction (#5225).

---

## 7. Điểm đau của nhà phát triển

- **Xác thực MCP/OAuth đang rạn nứt**: token hết hạn bị gửi lại, refresh token bị bỏ qua, cache Entra broker trống, và lỗi xác thực MCP khiến CLI trên Windows không dùng được (#5229, #5233, #5234, #5236). Đây là cụm điểm đau tập trung nhất hôm nay.
- **Hồi quy khôi phục phiên & trình duyệt phiên**: `--resume` rơi vào phiên trống và danh sách phiên tự động thay thế (#5228) làm xói mòn niềm tin vào quy trình cốt lõi.
- **Voice trên WSL2 hỏng từ 1.0.100** (#5197): tính năng ngừng hoạt động hoàn toàn, chưa có cách khắc phục nào được báo cáo.
- **Mô hình quyền gây bất ngờ**: tự động phê duyệt âm thầm trong trusted folders (#5232) và hook bị bỏ qua qua subagent (#3013) làm xói mòn niềm tin vào các đảm bảo an toàn.
- **Che giấu bí mật quá mạnh tay làm hỏng file hợp lệ** (#4065).
- **Hành vi cache ảnh tốn kém**: nạp lại toàn bộ cache ở ảnh thứ 51 (#5238) — tốn kém ở quy mô lớn.
- **Mệt mỏi với nhịp phát hành**: các hồi quy lặp lại thúc đẩy yêu cầu về kênh ổn định (#5203).

---

*Digest tạo ngày 2026-10-23. Nguồn: github.com/github/copilot-cli. Dữ liệu issue phản ánh các mục được cập nhật trong 24 giờ qua; không có PR hay Discussions nào trong bản chụp này.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Câu chuyện lớn nhất hôm nay liên quan đến bảo mật: một issue vẫn còn mở về việc sandbox agent (#2242, 101 bình luận, 80 👍) vẫn là mối quan tâm hàng đầu của cộng đồng, trong khi các PR mới bổ sung xác thực timing-safe và gia cố pathspec. Cùng lúc đó, một nhóm lỗi vượt quyền (#52083, #50652) và việc dọn dẹp tài liệu về model đã ngừng hỗ trợ (#55904) cho thấy dự án đang phải cân bằng giữa an toàn, tính đúng đắn và vệ sinh danh mục. Về phía phát hành, v1.19.4 là một bản cập nhật hẹp chỉ vá bảo mật cho Bun runtime đi kèm.

## 2. Phát hành

**v1.19.4**
- **Core:** Nâng cấp Bun runtime đi kèm lên **1.4.4**, kéo theo các bản vá bảo mật cho Brotli, TLS, HTTP/1.1, HTTP/2, HTTP/3, WebSocket và `fetch`, cùng chứng chỉ gốc được cập nhật (NSS 3.131.1).
- Không có thay đổi về tính năng hay hành vi; đây là bản phát hành gia cố. Đáng nâng cấp nếu bạn dựa vào remote MCP hoặc các lệnh gọi công cụ qua mạng trên các giao thức bị ảnh hưởng.

## 3. Issue nổi bật

1. **[#2242 — Có cách nào sandbox agent không?](https://github.com/anomalyco/opencode/issues/2242)** (OPEN, 101 bình luận, 👍80)
   Issue mở được thảo luận nhiều nhất. Người dùng muốn có sự giới hạn filesystem/terminal tương đương seatbelt của Codex trên macOS. Số lượng 👍 cao cho thấy đây là khoảng trống sản phẩm hàng đầu, không phải yêu cầu của một nhóm nhỏ.

2. **[#34344 — Lỗi khai thác sử dụng không giới hạn trên các model opencode](https://github.com/anomalyco/opencode/issues/34344)** (CLOSED, 17 bình luận)
   Người báo cáo đã chứng minh rằng giới hạn tốc độ của model miễn phí dựa theo IP có thể bị reset bằng cách xoay VPN, cho phép sử dụng miễn phí liên tục. Đã đóng, nhưng quan trọng với bất kỳ ai đang suy xét về kiểm soát lạm dụng và kinh tế của gói miễn phí.

3. **[#50257 — Bộ chọn model trên Desktop hiển thị "No reasoning" cho mọi model V2](https://github.com/anomalyco/opencode/issues/50257)** (OPEN, 15 bình luận, 👍4)
   `capabilities.reasoning` không bao giờ được đặt, nên các model có khả năng reasoning (deepseek-v4.1-flash, kimi-k3, glm-5.3) bị dán nhãn sai trên UI. Một lỗi tính đúng đắn rõ ràng với nguyên nhân gốc đã được xác định.

4. **[#47646 — ChatGPT OAuth báo 400k context cho các model long-context](https://github.com/anomalyco/opencode/issues/47646)** (CLOSED, 15 bình luận, 👍3)
   OpenCode ghi đè giới hạn catalog ~1.05M token thành 400k khi dùng OAuth, khiến TUI báo thừa context khả dụng. Đã đóng, nhưng là ví dụ điển hình về việc metadata từ nhà cung cấp bị lệch.

5. **[#51828 — Location inactivity eviction gửi SIGTERM đến background shell đang chạy sau 60 phút](https://github.com/anomalyco/opencode/issues/51828)** (OPEN, 6 bình luận)
   `locations.invalidate()` phá hủy đồ thị Shell/Pty trong khi service vẫn còn sống. Một lỗi vòng đời tinh vi có khả năng gây mất dữ liệu thực sự cho các tác vụ nền chạy dài.

6. **[#52083 — Lệnh shell phức hợp làm mất chuyển hướng, biến một lệnh được phép thành ghi file không hỏi](https://github.com/anomalyco/opencode/issues/52083)** (OPEN, 4 bình luận)
   Liên quan đến bảo mật: bộ quét quyền tách các lệnh phức hợp nhưng bỏ qua đích chuyển hướng, nên một lệnh được `allow` trở thành công cụ ghi file tùy ý. Nên được ưu tiên cùng với #2242.

7. **[#50652 — Công cụ plugin bên ngoài vượt qua quyền đã cấu hình](https://github.com/anomalyco/opencode/issues/50652)** (OPEN, 3 bình luận, 👍2)
   Các công cụ do plugin đăng ký (và các lệnh gọi Code Mode) thực thi mà không áp dụng hành động quyền đã cấu hình. Điều này trực tiếp làm suy yếu mô hình quyền.

8. **[#58128 — Đừng ngừng thử lại khi LLM API gặp lỗi](https://github.com/anomalyco/opencode/issues/58128)** (OPEN, 4 bình luận)
   Cơ chế backoff lũy thừa 10×10s cố định từ bỏ quá nhanh khi gặp trục trặc mạng/backend tạm thời, làm dừng phiên. Một bề mặt cấu hình nhỏ có thể sẽ làm hài lòng hầu hết người dùng.

9. **[#58188 — New Session và Open Project bị làm mờ trên Linux (2.1.3)](https://github.com/anomalyco/opencode/issues/58188)** (OPEN, 3 bình luận)
   Các mục menu trên Desktop bị vô hiệu vĩnh viễn trên Linux `.deb`, khớp với một mẫu lỗi vòng đời menu đã biết. Các lỗi hồi quy desktop đặc thù theo nền tảng đang chồng chất.

10. **[#58314 — Quyền truy cập workspace OpenCode Go trả phí bị từ chối, hỗ trợ không phản hồi](https://github.com/anomalyco/opencode/issues/58314)** (OPEN, 2 bình luận)
    Người đăng ký trả phí bị khóa nhiều ngày (HTTP 403) với nhiều yêu cầu hỗ trợ chưa được giải quyết. Lỗi truy cập gói trả phí là rủi ro danh tiếng và đáng theo dõi cùng với #58014 và #58003.

## 4. Tiến độ PR chính

1. **[#58341 — fix(core): giữ remote MCP request mở quá idle timeout của fetch trên Bun](https://github.com/anomalyco/opencode/pull/58341)**
   Các cuộc gọi remote MCP im lặng >~5 phút sẽ thất bại dưới idle timeout của Bun, sớm hơn nhiều so với timeout MCP 12h của chính OpenCode. Quan trọng cho các công cụ MCP chạy dài.

2. **[#58340 — fix(ui): chỉ giữ spinner dot-matrix cho hoạt động AI](https://github.com/anomalyco/opencode/pull/58340)**
   Khôi phục `Loader` dạng vòng cho các trạng thái không phải AI (tải lại trình duyệt, cập nhật) để spinner dot-matrix lại mang nghĩa "AI đang làm việc". Một bản sửa UX nhất quán tốt.

3. **[#58337 — fix(server): so sánh mật khẩu server theo thời gian hằng số](https://github.com/anomalyco/opencode/pull/58337)**
   Thay `===` bằng `timingSafeEqual` trong `authorized()`, khớp với `verifySession`. Vá rò rỉ thời gian phản hồi trên mật khẩu server.

4. **[#58338 — fix(core): truyền pathspec theo nghĩa literal khi lấy patch từng file](https://github.com/anomalyco/opencode/pull/58338)**
   Ngăn các tên file chứa glob/colon-magic (`a*.txt`, `:(exclude)x`) khớp hoặc ẩn các file không mong muốn trong fallback diff.

5. **[#58336 — fix(ai): ID tool call duy nhất cho các model họ Mistral](https://github.com/anomalyco/opencode/pull/58336)**
   Các ID của GLM đều gộp thành `chatcmplt` sau khi chuẩn hóa, gây lỗi Mistral `400 Duplicate tool call id`. Định tuyến ID họ Mistral qua một đường an toàn hơn.

6. **[#58334 — feat(core): thêm tìm kiếm web Brave](https://github.com/anomalyco/opencode/pull/58334)**
   Đưa #48222 trở lại dưới dạng nhà cung cấp websearch tích hợp sau khi bị bot đóng vì cũ. Đi kèm với #58328 và mối lo về giới hạn tốc độ/failover trong #58327.

7. **[#58332 — feat(core): công khai nguồn tool call cho hook tạo shell](https://github.com/anomalyco/opencode/pull/58332)**
   Thêm tham số cho công cụ `shell` để hook `shell.create` có thể tùy chỉnh hành vi theo nguồn gọi. Hữu ích cho tác giả plugin xây dựng chính sách/guardrail.

8. **[#58305 — fix(app): hiển thị form MCP elicitation trên desktop và web](https://github.com/anomalyco/opencode/pull/58305)**
   Từ #58184, TUI render các form `elicitation/create`, nhưng desktop/web chỉ xử lý `question` và `websearch.provider`—nên các tool call bị treo. Mang lại sự đồng nhất giữa các bề mặt.

9. **[#58130 — fix(client): giữ service còn sống khi bị treo qua một lần suspend](https://github.com/anomalyco/opencode/pull/58130)**
   Ngăn client giết một background service khỏe mạnh mà các probe không phản hồi trong lúc suspend/wake. Giải quyết một lỗi phổ biến trong quy trình làm việc trên laptop.

10. **[#57470 — fix(tui): đọc ảnh clipboard qua Windows interop trên WSL](https://github.com/anomalyco/opencode/pull/57470)**
    Dán ảnh bằng Ctrl+V trả về `unsupported` trên WSL vì Windows Terminal giữ quyền chọn. Sửa #49895—một phàn nàn thường gặp của lập trình viên WSL.

## 5. Thảo luận nổi bật

Không có dữ liệu Discussions cho khoảng thời gian này, nên phần này được bỏ qua.

## 6. Xu hướng yêu cầu tính năng

- **Sandbox & gia cố quyền:** #2242 (sandbox) và #50652 / #52083 (vượt quyền) cho thấy nhu cầu rộng hơn về một mô hình giới hạn/quyền thực sự thay vì chỉ nhắc nhở.
- **Hiển thị & giới hạn sử dụng:** #57975 (bảng điều khiển sử dụng thời gian thực hợp nhất), #58014 (chạm giới hạn miễn phí sau vài yêu cầu), #34344 (lỗi khai thác reset giới hạn) — người dùng muốn việc tính toán minh bạch và đáng tin.
- **Kiểm soát vị trí thực thi:** #58330 yêu cầu nút bật/tắt vị trí thực thi model cho từng API key, mở rộng cài đặt quyền Go hiện có.
- **Khả năng mở rộng websearch:** #58328 (đưa Brave trở lại làm tích hợp) và #58327 (nhà cung cấp tùy chỉnh không thể báo giới hạn tốc độ / bị loại khỏi failover) — xu hướng hướng tới một lớp nhà cung cấp tìm kiếm pluggable hạng nhất.
- **Khả năng cấu hình retry/độ bền:** #58128 yêu cầu hành vi retry có thể cấu hình thay vì giới hạn 10×10s cố định.

## 7. Điểm đau của nhà phát triển

- **Mô hình quyền/sandbox là nỗi thất vọng chủ đạo.** Issue hàng đầu (#2242) và hai lỗi vượt quyền đang hoạt động (#50652, #52083) cho thấy người dùng không tin rằng "được phép" nghĩa là "được giới hạn."
- **Ma sát giữa gói miễn phí/trả phí và giới hạn không rõ ràng.** #58014, #58003 (độ trễ nghiêm trọng trên DeepSeek V4.1 Flash trả phí), #58314 (workspace trả phí 403), và #34344 (lỗi khai thác reset giới hạn) kết hợp thành vấn đề niềm tin quanh OpenCode Go/Console.
- **Lỗi tạm thời làm hủy phiên.** #58128 (từ bỏ sau 10 lần thử) và #51828 (background shell bị giết sau 60 phút) đều làm gián đoạn công việc chạy dài mà người dùng ít kiểm soát.
- **Lỗi hồi quy desktop/TUI đa nền tảng.** #58188 (menu Linux bị làm mờ), #56109 (hoàn thành tab `/cd` trên Windows thêm dấu gạch chéo ngược), các vấn đề clipboard WSL liên quan #57470, và #58000 (prompt phiên/thư mục sau khi sleep) cho thấy các cạnh thô đặc thù theo nền tảng tái diễn.
- **Metadata nhà cung cấp bị lệch.** #50257 (reasoning không bao giờ được đặt), #47646 (context bị ghi đè dưới OAuth), và #55904 (tài liệu vẫn liệt kê Exo/MiMo V2.5 đã ngừng) cho thấy độ chính xác của catalog là gánh nặng bảo trì dai dẳng.
- **Chất lượng bản địa hóa.** #51868 chỉ ra lỗi dịch máy và 93 key `zh` chưa dịch, một tín hiệu cho quy trình rà soát i18n.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Không có bản phát hành mới nào trong 24 giờ qua, nhưng issue tracker vẫn rất sôi động: cuộc tranh luận dài kỳ về **ngân sách độ trễ khởi động/bộ nhớ** (#7739) đã đạt 11 bình luận, và một loạt **bản sửa lỗi xuất HTML** (#11225, #11261, #11290, #11293, #11275, #11274) đã được đóng liên tiếp sau khi một lỗi tràn stack khiến các phiên dài bị trắng. Một nhóm **vấn đề về TUI/hiệu năng/độ ổn định** cũng thu hút sự chú ý (xếp hạng tìm kiếm mờ, rò rỉ ký tự trên Windows, fork phiên lớn chậm), cho thấy UX hàng ngày và độ tin cậy đang là ưu tiên hàng đầu của cộng đồng.

---

## 2. Bản phát hành

*Không có. Không có bản phát hành mới nào trong 24 giờ qua.*

---

## 3. Issue nổi bật (10 đáng chú ý)

| # | Issue | Tại sao quan trọng | Tín hiệu cộng đồng |
|---|-------|----------------|------------------|
| [#7739](https://github.com/earendil-works/pi/issues/7739) | **Ngân sách thời gian khởi động nhắm đến độ trễ/bộ nhớ tương đương jcode** | So sánh benchmark định lượng (10 lần khởi chạy PTY tương tác, Linux) đặt pi 0.62.0 đối đầu jcode v0.9.1888-dev; một ngân sách khởi động chính thức sẽ giúp các hồi quy hiệu năng có thể hành động được. | 11 bình luận, vẫn mở, cập nhật hôm nay |
| [#7553](https://github.com/earendil-works/pi/issues/7553) | **Cấu hình mức độ suy nghĩ/model cho compaction** | Compaction hiện tại tái sử dụng mức độ suy nghĩ của phiên một cách vô điều kiện — đây là vấn đề chi phí thực sự với người dùng chạy auto-compaction trên các model reasoning. | 12 bình luận, 3 👍, gắn thẻ `to-discuss` |
| [#9807](https://github.com/earendil-works/pi/issues/9807) | **TUI full re-render gây lag cuộn/gõ phím khi có 800+ tin nhắn** | So sánh trực tiếp với diffing cấp cell tăng dần của OpenCode; các phiên có kích thước này rất phổ biến với người dùng agent nặng. | 5 bình luận, 3 👍 |
| [#11253](https://github.com/earendil-works/pi/issues/11253) | **`forkFrom` sao chép một `appendFileSync` cho mỗi entry — 30s+ trên phiên 73MB** | Một lần mở/đóng cho mỗi entry phá vỡ bắt tay RPC trên các phiên lớn; được gắn nhãn `fix-available`, nên một PR có thể sắp ra mắt. | 2 bình luận, đánh dấu **fix-available** |
| [#11086](https://github.com/earendil-works/pi/issues/11086) | **[p0] Ký tự rò rỉ vào đầu vào terminal Windows khi CPU tải cao** | Bug mở có ưu tiên cao nhất; chỉ tái hiện được qua SSH khi client CPU tải cao, khiến việc tìm nguyên nhân rất khó. | 4 bình luận, `prio:p0` |
| [#9932](https://github.com/earendil-works/pi/issues/9932) | **`before_agent_start`: system prompt bị ép buộc vẫn giữ các tool đã bị xóa qua `setActiveTools()`** | Bug thứ tự extension tinh vi: prompt bị ép buộc được chụp trước khi đồng bộ bộ tool, nên các tool đã xóa vẫn được quảng cáo. | 6 bình luận |
| [#11223](https://github.com/earendil-works/pi/issues/11223) | **`modelOverrides` bị bỏ qua âm thầm cho các model classifier** | Tài liệu hứa overrides hoạt động với model tích hợp/extension; no-op âm thầm vi phạm nguyên tắc ít bất ngờ nhất và tốn thời gian gỡ lỗi. | 5 bình luận |
| [#10259](https://github.com/earendil-works/pi/issues/10259) | **API trình bày tool công khai hoặc chế độ tool một dòng tích hợp** | Extension không thể kiểm soát cách trình bày các hàng tool tích hợp/MCP/codemode; chế độ tóm tắt một dòng là yêu cầu thường xuyên. | 5 bình luận, 2 👍 |
| [#11172](https://github.com/earendil-works/pi/issues/11172) | **Chuột tách rời để lại đuôi escape-sequence trong prompt** | Escape-timeout của StdinBuffer xả nửa sequence và editor gõ phần còn lại — một lớp bug hỏng đầu vào. | 2 bình luận, repro chi tiết |
| [#11127](https://github.com/earendil-works/pi/issues/11127) | **Cấu hình khoảng thời gian làm ấm cache khi rảnh** | Mặc định 30 phút so với lịch làm mới ~27/54 phút tạo ra ranh giới cứng; người dùng muốn tùy chọn 60/120 phút. | 3 bình luận |

---

## 4. Tiến độ PR chính (10)

| PR | Thay đổi | Trạng thái |
|----|--------|--------|
| [#11293](https://github.com/earendil-works/pi/pull/11293) | **Duyệt cây xuất HTML lặp** (`sortChildren`, `mapNodes`, `markActive`) — sửa trang `/export` trắng trên phiên ~6k+ entry. Đóng #11225. | Đã đóng (đường hợp nhất) |
| [#11290](https://github.com/earendil-works/pi/pull/11290) | **Hiển thị system message trong xuất HTML** — prompt/tool dẫn đầu + cập nhật phần sau giờ đã hiển thị; đóng #11261. | Đã đóng |
| [#11288](https://github.com/earendil-works/pi/pull/11288) | **Ghi fork một fd duy nhất** — thay thế ~3.000 chu kỳ mở/đóng cho mỗi fork của phiên 3k entry (bot tạo, sửa #11253). | Mở |
| [#11296](https://github.com/earendil-works/pi/pull/11296) | **Xếp hạng khớp mờ liền kề + tìm kiếm phiên theo trường** — sửa hành vi "opus xếp dưới Sonnet"; đóng #11220, liên quan #10552/#10065/#11024. | Đã đóng |
| [#11304](https://github.com/earendil-works/pi/pull/11304) | **Khởi động khi package được cấu hình cài đặt thất bại** — ghi nhận thất bại theo nguồn, bỏ qua như chế độ offline, hiển thị cảnh báo extension. | Mở |
| [#11289](https://github.com/earendil-works/pi/pull/11289) | **Dừng nhóm shell macOS trước khi kill** — giảm race khi `a; b` tiếp tục sau khi hủy `a` (sửa #11252). | Đã đóng |
| [#11257](https://github.com/earendil-works/pi/pull/11257) | **Giữ lỗi spawn của `pi.exec`** dưới dạng `stderr` khi không có stderr nào được tạo; kiểm thử hồi quy cho executable thiếu (sửa #11085). | Đã đóng |
| [#11299](https://github.com/earendil-works/pi/pull/11299) | **Sửa guard `thinkingLevelMap?.off` + `max_completion_tokens` thừa** — giải quyết HTTP 400 cho model `reasoning: true`/`openrouter` không có level map. | Đã đóng |
| [#7952](https://github.com/earendil-works/pi/pull/7952) | **`messageId` + `timestamp` trong context markdown transformer** — cho phép extension trang trí theo từng tin nhắn; đóng #7828. | Đã đóng |
| [#9301](https://github.com/earendil-works/pi/pull/9301) | **Xác nhận hành động browser/clipboard mã thiết bị** — khôi phục UX tự động mở nhưng có sự đồng ý rõ ràng của người dùng (sửa #9282). | Đã đóng |

Đáng chú ý thêm: [#6843](https://github.com/earendil-works/pi/pull/6843) (PR xuất lặp ban đầu, đóng hôm nay), [#10528](https://github.com/earendil-works/pi/pull/10528) (dọn dẹp đóng gói Nix, vẫn mở), [#9329](https://github.com/earendil-works/pi/pull/9329) (phát hiện ảnh Kitty trên terminal Orca), [#11278](https://github.com/earendil-works/pi/pull/11278) (giữ getter `ctx.ui` qua `wrapUIPromptContext`), [#11231](https://github.com/earendil-works/pi/pull/11231) (tab trình cài đặt Windows trong Quickstart).

---

## 5. Thảo luận nổi bật

### Show and tell

- **[#11306 — pi-continuity: tự động tiếp tục sau giới hạn sử dụng coding plan và lượt bị gián đoạn](https://github.com/earendil-works/pi/discussions/11306)** — Giải quyết giới hạn 5 giờ của OpenAI (và tương tự) bằng cách tự động tiếp tục các lần chạy mà retry lỗi tạm thời và compaction của Pi không bao phủ. 1 👍.
- **[#11307 — pi-better-web-search: một tool `web_search`, kết quả thô từ provider, fallback thực sự giữa các provider](https://github.com/earendil-works/pi/discussions/11307)** — Tách ra từ `pi-web-search` để sửa hai vấn đề: kết quả bị viết lại và thất bại cứng khi model hiện tại không thể tìm kiếm nhưng provider khác đã đăng nhập có thể. 1 👍.

*(Không có thảo luận Ideas hay Q&A nào được cập nhật trong 24h qua.)*

---

## 6. Xu hướng yêu cầu tính năng

1. **Ngân sách & ngưỡng có thể cấu hình** — mức độ suy nghĩ/model cho compaction (#7553), ngân sách độ trễ khởi động/bộ nhớ (#7739), khoảng thời gian làm ấm cache khi rảnh (#11127), auto-compaction theo provider với ngưỡng token tuyệt đối (#11295). Người dùng ngày càng muốn các nút điều chỉnh được thay vì mặc định toàn cục.
2. **Mở rộng bề mặt extension/API** — API trình bày tool công khai hoặc chế độ tool một dòng (#10259), `messageId`/`timestamp` trong context markdown transformer (#7828 → PR #7952), bản ghi sử dụng phụ trợ theo model (#11090), extension MCP bền vững (#10837), tên client OAuth tùy chỉnh cho server MCP (#10226).
3. **Tiện dụng vòng đời phiên** — `/reload` nhận các chỉnh sửa `AGENTS.md` (#11291, #11292 đóng không hành động), tự động hoàn thành slash nội tuyến cho skills (#11294), chất lượng tìm kiếm mờ trong `/model` và `/resume` (#11220).
4. **Trung thực với Claude Code về context-file** — loại bỏ comment HTML cả dòng khỏi context file (#11250, #11251, cả hai đóng không hành động), gợi ý rằng việc căn chỉnh với hệ sinh thái rộng hơn đang được người dùng quan tâm.

---

## 7. Điểm đau của nhà phát triển

- **Hiệu năng phiên lớn là chủ đề chi phối.** Full TUI re-render khi 800+ tin nhắn (#9807), fork 30s+ của phiên 73MB (#11253), và tràn stack xuất HTML (#11225) đều chỉ ra các thuật toán không mở rộng theo kích thước phiên. Việc hợp nhất nhanh các bản sửa xuất lặp cho thấy maintainer đang phản hồi.
- **Thất bại âm thầm làm xói mòn niềm tin.** `modelOverrides` bị bỏ qua không cảnh báo (#11223), lỗi cài package hủy khởi động (#11304), và lỗi spawn thiếu trong `pi.exec` (#11257) đều chia sẻ một mẫu: hệ thống biết có gì đó sai và không nói ra.
- **Xử lý đầu vào terminal vẫn mong manh.** Rò rỉ ký tự Windows khi CPU tải (#11086, p0), đuôi escape chuột tách rời (#11172), dán bracketed rỗng trên WSL (#11259), và Ctrl+C xóa prompt (#9190) cho thấy lớp đầu vào/escape-sequence cần được gia cố.
- **Ngữ nghĩa thứ tự extension chưa được tài liệu hóa đầy đủ.** Bug đồng bộ tool `before_agent_start` (#9932) và vấn đề giải quyết getter `wrapUIPromptContext` (PR #11278) cho thấy tác giả extension đang vật lộn với thời điểm vòng đời ngầm định.
- **Bất đối xứng nền tảng.** Race kill nhóm tiến trình macOS (#11252), đường đầu vào Windows/WSL, phát hiện khả năng terminal Orca (#9329), và tài liệu cài Homebrew/macOS (#11282) đều phơi bày các lỗ hổng đặc thù theo nền tảng.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-10-23

## 1. Điểm nổi bật hôm nay

Bản nightly v0.26.0 tiếp tục gia cố đường dẫn `serve`/daemon, với tâm điểm là tính bền vững của token daemon. Một loạt lỗi ưu tiên cao chiếm lĩnh ngày hôm nay: một **lỗi P1 âm thầm làm mất kết quả công cụ** trong 0.26.0 (~1 trong 30–40 lần gọi), một **lỗi cập nhật Windows Desktop** do `node.exe` bị khóa, và một **cấp phát WASM tạm thời ~1,6 GiB** trong bộ phân tích an toàn shell trên Node 24. Trong khi đó, UX của Web Shell (thuật ngữ, vị trí phiên, thanh bên) chứng kiến một loạt yêu cầu tính năng dày đặc, báo hiệu sự trưởng thành nhanh chóng của giao diện Managed Agent.

## 2. Phát hành

**v0.26.0-nightly.20261022.bf66a26c97** — [Release](https://github.com/QwenLM/qwen-code/releases)
- **feat(serve): thêm tính bền vững token daemon** ([#15023](https://github.com/QwenLM/qwen-code/pull/15023), @wenshao) — token bearer của daemon giờ tồn tại qua các lần khởi động lại, cải thiện trải nghiệm `qwen serve`/`qwen daemon`.
- **fix(release): bao phủ mọi binary vendored được spawn** — bao phủ rộng hơn các binary vendored trong đóng gói phát hành.

## 3. Issue nổi bật

1. **[#13078](https://github.com/QwenLM/qwen-code/issues/13078) — Kiểm tra CVE phụ thuộc hàng ngày thất bại** (29 bình luận). Lỗi tự động hóa kéo dài; có thể do endpoint npm audit không khả dụng hoặc một cảnh báo mức độ nghiêm trọng cao mới. Issue có tương tác cao nhất trong ngày.
2. **[#15297](https://github.com/QwenLM/qwen-code/issues/15297) — [P1] 0.26.0 âm thầm làm mất kết quả công cụ (~1 trong 30 lần gọi)** — 43 trong 1.663 đã xác minh, 28 được xác nhận qua bản ghi. Các chỉnh sửa vẫn được áp dụng, nhưng mô hình đọc lại, lãng phí token. Một hồi quy nghiêm trọng về tính đúng đắn/khả năng quan sát trên Windows.
3. **[#13787](https://github.com/QwenLM/qwen-code/issues/13787) — Khôi phục XML lặp lại quét tiền tố trên các phản hồi đa lệnh gọi lớn** — tái hiện parser có giới hạn trên main và PR #13579; một vách ngăn độ trễ thực sự cho khối lượng công việc agentic đa lệnh gọi.
4. **[#15276](https://github.com/QwenLM/qwen-code/issues/15276) — [P1] Cập nhật Windows Desktop thất bại, `node.exe` bị khóa** — trình cài đặt không thể ghi đè runtime Node đi kèm; chặn nâng cấp trong ứng dụng.
5. **[#15165](https://github.com/QwenLM/qwen-code/issues/15165) — [P2] Bộ phân tích an toàn shell kích hoạt cấp phát WASM ~1,6 GiB trên Node 24.16.0** — tăng vọt bộ nhớ native tạm thời trong quá trình tối ưu hóa V8 của parser Bash WASM; đã có PR giảm thiểu.
6. **[#15248](https://github.com/QwenLM/qwen-code/issues/15248) — [P2] Kiểm thử timing broker của sdk-java flake 3/3 trên runner do GitHub host** — chặn làn nhanh PR từ fork; tương phản hành vi self-hosted so với hosted.
7. **[#14988](https://github.com/QwenLM/qwen-code/issues/14988) — Web Shell: chuẩn hóa thuật ngữ Workspace/Session** — đồng bộ với cách đặt tên DSH; thúc đẩy một loạt issue UI liên quan.
8. **[#8968](https://github.com/QwenLM/qwen-code/issues/8968) — Hỗ trợ MCP 2026-07-28 + MCP Apps trong daemon WebShell** — di trú spec chính thức; yêu cầu tích hợp dài hạn.
9. **[#15316](https://github.com/QwenLM/qwen-code/issues/15316) — Thư mục làm việc theo từng phiên trong workspace chia sẻ** — cần cho sử dụng daemon đa dự án; đi kèm với PR #15323.
10. **[#15310](https://github.com/QwenLM/qwen-code/issues/15310) — Cho mô hình biết nó dùng shell nào (Windows `cmd.exe`)** — mô hình giả định POSIX; mỗi lệnh sai đốt một lượt. Cải thiện nhanh cho độ tin cậy trên Windows.

## 4. Tiến độ PR chính

1. **[#15323](https://github.com/QwenLM/qwen-code/pull/15323) — feat(serve): phiên phụ có thể `cd` trong workspace của chúng** — thay đổi thư mục được giới hạn bởi realpath; cho phép luồng công việc cwd theo từng phiên.
2. **[#15321](https://github.com/QwenLM/qwen-code/pull/15321) — fix(cli): cảnh báo về đỉnh Wasm trên Node 24/25 mà không tắt kiểm tra AST** — cảnh báo stderr không chặn, khuyến nghị Node 26.12.1; giải quyết #15165.
3. **[#15228](https://github.com/QwenLM/qwen-code/pull/15228) — fix(cli): gia cố phân giải token serve chống tiêm nhiễm env dự án** — token chỉ từ `--token`, env đã export, hoặc `.env` trong home; tư thế bảo mật mạnh cho `qwen serve`.
4. **[#15211](https://github.com/QwenLM/qwen-code/pull/15211) — feat(serve): mang gate tác vụ theo lịch qua daemon và Web Shell** — tiếp nối #15069; tác vụ theo lịch có thể chạy lệnh gate tại thời điểm kích hoạt.
5. **[#15089](https://github.com/QwenLM/qwen-code/pull/15089) — feat(serve): cấp `todo_write` cho phiên workspace được quản lý** — hồ sơ công cụ mới `/3`; các phiên hiện có giữ hồ sơ trước đó.
6. **[#14904](https://github.com/QwenLM/qwen-code/pull/14904) — feat(web-shell): thanh bên phiên gần đây hợp nhất** — mục Recent có thể thu gọn, hợp nhất hội thoại dự án + không có workspace.
7. **[#15303](https://github.com/QwenLM/qwen-code/pull/15303) — fix(web-shell): giữ tệp đính kèm nháp qua làm mới và cấp phát** — sửa hai khiếm khuyết từ #15025.
8. **[#15284](https://github.com/QwenLM/qwen-code/pull/15284) — fix(ci): giới hạn khóa job sdk-java cho ghi lại cache** — giảm tranh chấp khóa và bề mặt flake trên runner self-hosted.
9. **[#15314](https://github.com/QwenLM/qwen-code/pull/15314) — fix(managed-agent): bỏ tham số constructor publication đã xóa** — khôi phục biên dịch fixture tool-turn được host sau merge.
10. **[#15174](https://github.com/QwenLM/qwen-code/pull/15174) — fix(ci): từ chối danh sách trang job một phần trước khi báo cáo** — trình báo cáo thất bại nhánh main giờ xác thực tổng phân trang trước khi công bố.

## 5. Thảo luận nổi bật

_Không có dữ liệu Discussions trong nguồn; mục này được lược bỏ._

## 6. Xu hướng yêu cầu tính năng

- **Quản lý phiên Managed Agent / `serve`**: cwd theo từng phiên ([#15316](https://github.com/QwenLM/qwen-code/issues/15316), [PR #15323](https://github.com/QwenLM/qwen-code/pull/15323)), liệt kê phiên lưu trữ + tìm kiếm tiêu đề ([#15077](https://github.com/QwenLM/qwen-code/issues/15077)), thư mục hội thoại cấu hình được ([#15298](https://github.com/QwenLM/qwen-code/issues/15298)), provisioner runtime HTTP bên ngoài ([#15247](https://github.com/QwenLM/qwen-code/issues/15247)).
- **Sự trưởng thành UX của Web Shell**: chuẩn hóa thuật ngữ ([#14988](https://github.com/QwenLM/qwen-code/issues/14988)), đặt tên không có workspace ([#15309](https://github.com/QwenLM/qwen-code/issues/15309)), di chuyển menu "Create group" ([#15312](https://github.com/QwenLM/qwen-code/issues/15312)), chi tiết thẻ công cụ MCP đầy đủ ([#15280](https://github.com/QwenLM/qwen-code/issues/15280)).
- **Khả năng cấu hình tìm kiếm web**: host tin cậy tùy chọn / `web_search` rõ ràng cho gateway tương thích DashScope ([#15302](https://github.com/QwenLM/qwen-code/issues/15302), [#15299](https://github.com/QwenLM/qwen-code/issues/15299)).
- **Tương thích tiến tới của MCP**: MCP 2026-07-28 + MCP Apps ([#8968](https://github.com/QwenLM/qwen-code/issues/8968)).
- **Nền tảng/cấu hình**: tiết lộ shell trên Windows ([#15310](https://github.com/QwenLM/qwen-code/issues/15310)), thư mục cơ sở worktree cấu hình được ([#15292](https://github.com/QwenLM/qwen-code/issues/15292)).

## 7. Điểm đau của nhà phát triển

- **Độ tin cậy của vòng lặp agent**: mất kết quả công cụ âm thầm ([#15297](https://github.com/QwenLM/qwen-code/issues/15297)) và khôi phục XML chậm ([#13787](https://github.com/QwenLM/qwen-code/issues/13787)) gây hại cho các lần chạy không giám sát và ngân sách token.
- **Ma sát cài đặt/nâng cấp trên Windows**: `node.exe` bị khóa trong khi cập nhật Desktop ([#15276](https://github.com/QwenLM/qwen-code/issues/15276)) và lỗi giả định shell ([#15310](https://github.com/QwenLM/qwen-code/issues/15310)).
- **Flakiness CI và niềm tin hạ tầng**: flake trên runner hosted ([#15248](https://github.com/QwenLM/qwen-code/issues/15248)), lỗi công bố JUnit ([PR #15322](https://github.com/QwenLM/qwen-code/pull/15322)), thất bại main-CI lặp lại ([#15307](https://github.com/QwenLM/qwen-code/issues/15307), [#15287](https://github.com/QwenLM/qwen-code/issues/15287)).
- **Nguy hiểm cô lập kiểm thử**: `--no-isolate` ghi đè `~/.qwen/settings.json` thật ([#15267](https://github.com/QwenLM/qwen-code/issues/15267)).
- **Bot cũ/theo dõi thủ công chồng chất**: issue xem xét trì hoãn ([#12842](https://github.com/QwenLM/qwen-code/issues/12842), [#15301](https://github.com/QwenLM/qwen-code/issues/15301)) và yêu cầu quyết định merge ([#15214](https://github.com/QwenLM/qwen-code/issues/15214)) cho thấy nút thắt xem xét của maintainer.

---

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*