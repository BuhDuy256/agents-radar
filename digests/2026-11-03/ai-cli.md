# Bản tin cộng đồng công cụ AI CLI 2026-11-03

> Tạo lúc: 2026-11-03 06:34 UTC | Công cụ theo dõi: 7

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

**threejs shaders — cấp phát và đặt tên cho một pool tài nguyên có giới hạn**
Thay thế cách khởi tạo shader tùy tiện bằng một pool rõ ràng gồm 8 chương trình WebGL được cấp phát trước, nhờ đó việc cấp phát giữa khung hình không còn làm nghẽn vòng lặp render. Dùng khi một scene cần vài biến thể shader mà không muốn tốn chi phí biên dịch theo từng lần vẽ. PR #2051 của nikki-dotcom, cập nhật 2026-10-15, đang mở và chưa được merge.

**test-fixture — tạo bộ khung fixture pytest khớp với repo**
Truy vết các import trong test hiện có và cấu trúc conftest, rồi sinh ra fixture khớp với tên helper thật của dự án thay vì placeholder chung chung. Dùng khi thêm những test đầu tiên cho một module chưa có test. PR #2043 của jamesk94, cập nhật 2026-10-16, đang mở và chưa được merge.

**issue-triage — định tuyến issue GitHub đến người phụ trách theo nhãn**
Đọc nội dung issue và các nhãn hiện có, rồi đề xuất một người phụ trách và một nhãn ưu tiên cho mỗi issue mà không ghi vào tracker cho đến khi được yêu cầu. Dùng khi một repo không có ai theo dõi đang tích tụ lẫn lộn báo cáo lỗi và yêu cầu tính năng. PR #2033 của priyankamalviya, cập nhật 2026-10-14, đang mở và chưa được merge.

**Yêu cầu đang mở**

`claude-api` tiêm khoảng 156k token trong một lần gọi tool, làm cạn cửa sổ ngữ cảnh; người báo cáo đề nghị skill này nạp các file tham chiếu theo nhu cầu thay vì nạp hết (anthropics/skills Issue #1487).

---

**Điều gì đã thay đổi**

v2.1.317 thêm cảnh báo vào `/schedule` khi một tác vụ đã lên lịch trên cloud nhận được các connector bạn không yêu cầu, và chỉ cách xóa chúng. Bản này cũng thêm bước xác nhận trước khi một lệnh gọi công cụ web hoặc shell gửi địa chỉ email tài khoản của bạn lên mạng. Cả hai thay đổi đều ảnh hưởng đến workflow cloud và workflow gọi công cụ.
Bản phát hành này cũng thêm `onFailure: "block"` cho cấu hình hook của Agent SDK, cho phép hook dừng agent thay vì tiếp tục chạy.

**Đáng chú ý**

Các phàn nàn về tính toán mức sử dụng vẫn tiếp diễn: Issue #102667 báo cáo giới hạn hàng tuần cạn nhanh hơn trước, và Issue #105621 báo cáo điều tương tự trên Max với workflow Windows không thay đổi. Dữ liệu này không cho thấy bản sửa lỗi nào.
Cowork MCP elicitation có thể trả về `{"status":"cancelled"}` mà không hiện lời nhắc nào (Issue #106880).
Claude Desktop đăng nhập thất bại với thông báo "We couldn't verify your browser" trên macOS (Issue #103788); người báo cáo nói chỉ khi đổi exit-IP thì đường dẫn email mới hoạt động.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**Có gì thay đổi**

- `rust-v0.167.0-alpha.4` đã phát hành ([release](https://github.com/openai/codex/releases)). Không có chi tiết changelog, nên hãy coi đây là bản alpha chưa có thay đổi hành vi nào được ghi nhận.
- Phạm vi workspace trong VS Code là yêu cầu mở được thảo luận nhiều nhất, #25319, với 58 bình luận và 127 👍. Tác giả đề nghị lịch sử chat Codex trong VS Code chỉ giới hạn trong workspace hoặc project hiện tại. Vẫn đang mở, nên chưa dùng được.
- PR #59015, "Make SQLite schema migrations safe for concurrent startup," đã đóng. PR này gói kiểm tra schema và migration vào một transaction kèm cơ chế thử lại khi SQLite bận, xử lý tranh chấp khi nhiều tiến trình cùng mở database. Dữ liệu không cho biết PR này thuộc bản phát hành nào.

**Đáng chú ý**

- Báo cáo phần tử được focus của Windows Computer Use bị sai, và thao tác theo chỉ số của Calculator thay đổi theo vòng đời cửa sổ (#58482). Ảnh hưởng đến người dùng Windows desktop; dữ liệu chưa có bản sửa.
- Session xuyên thiết bị hỏng ở cả hai chiều: iOS hết thời gian chờ khi tải session desktop dài và không thử lại (#28480), còn Dot không đọc được Work thread cục bộ do "unsupported placement format version 2" (#50698). Cả hai đều đang mở.
- Các vấn đề MCP không được sửa, theo thảo luận #33682 (22 👍, 5 bình luận), nêu các bug OAuth và tool-discovery đã tồn tại nhiều tuần. Đây là báo cáo từ người dùng, chưa được xác nhận.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

**Những gì đã thay đổi**

- `v0.67.0-nightly.20261103` phát hành PR [#30058](https://github.com/google-gemini/gemini-cli/pull/30058): các lượt tải model Whisper bị gián đoạn không còn để lại file dở dang mà `isModelInstalled()` vẫn coi là hoàn chỉnh. Điều này quan trọng nếu bạn dùng Whisper và từng thử tải lại sau khi tải thất bại.

- PR đề xuất [#30104](https://github.com/google-gemini/gemini-cli/pull/30104) làm mới slash command sau `/skills link <path>`. Hiện tại skill được phát hiện lại nhưng không hiện trong danh sách `/` cho đến khi khởi động lại. Chưa được merge.

- PR đề xuất [#30094](https://github.com/google-gemini/gemini-cli/pull/30094) hiển thị các lượt gọi công cụ của subagent đang chạy trong trạng thái UI; bộ lọc trong `useToolScheduler` đã bỏ qua những lượt gọi không cần phê duyệt. Sửa lỗi #22589.

**Đáng chú ý**

- [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409) (8 bình luận, 8 👍) báo cáo agent tổng quát bị treo vô hạn, kể cả khi chỉ tạo thư mục đơn giản. Yêu cầu model không dùng subagent thì tránh được lỗi. Chưa có bản sửa trong dữ liệu.

- [Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323) (13 bình luận) báo cáo một subagent chạm MAX_TURNS vẫn báo `status: "success"` và `Termination Reason: "GOAL"`. Đang mở.

- [Issue #24246](https://github.com/google-gemini/gemini-cli/issues/24246) báo cáo lỗi 400 khi vượt quá 128 công cụ. Đang mở.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

**Thay đổi**

- v1.0.106-6 cho `/settings` mở bảng điều khiển hợp nhất cho mọi người dùng và thêm tìm kiếm toàn cục trên cài đặt lẫn tài nguyên cục bộ. Bạn tìm cài đặt hoặc tài nguyên theo tên thay vì phải duyệt menu. Áp dụng mỗi khi bạn chạy `/settings`.
- v1.0.106-5 tuân thủ `includeCoAuthoredBy: false` trong chế độ ACP (`copilot --acp`), sửa Issue #5133. Client ACP không còn thêm dòng `Co-authored-by` vào commit. Điều này quan trọng nếu bạn dùng Copilot CLI qua client ACP và đã tắt dòng đó trong `copilot -p`.
- v1.0.106-4 sửa lỗi mention `@file` viết trong ngoặc đơn, ngoặc vuông, ngoặc nhọn, dấu ngoặc kép hoặc backtick. Mention giờ đính kèm tệp và mở rộng đúng trong lệnh shell `!` thay vì bị bỏ qua âm thầm.

**Đáng chú ý**

- `copilot --resume` không có ID có thể rơi vào một phiên trống mới, và danh sách Sessions tự động bị thay sau khoảng 2 giây (Issue #5228, đã đóng, 2 bình luận). Lúc đó prompt tin cậy sẽ nhận lần Enter đầu tiên của bạn.
- Các helper chèn chỉ dẫn thường trực bỏ sót thông điệp điều hướng: hook `userPromptTransformed` bị bỏ qua với thông điệp gửi đến khi agent đang làm việc (Issue #4640, đang mở, 1 bình luận).
- Dán ảnh (Ctrl+V/Meta+V) không hoạt động trong terminal devcontainer của VS Code (Issue #5334, đang mở, 1 bình luận); dán văn bản vẫn hoạt động. Được báo trên 1.0.105, linux-arm64.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

**Có gì thay đổi**

Không có bản phát hành nào trong 24 giờ qua.

Hai bản sửa lỗi được đề xuất cho những vấn đề lập trình viên gặp hằng ngày. PR #61314 dựng lại vị trí đã lưu trong cache sau khi thư mục của nó trở thành repo git, nhờ đó các dự án mở trước `git init` không còn mất phiên làm việc. PR #61341 loại bỏ các trang lịch sử đã bị thay thế, ngăn một trang đến muộn ghi đè lại đoạn hội thoại đã xóa hoặc đặt lại con trỏ. Cả hai vẫn đang mở, chưa phát hành.

PR #61244, nay đã đóng, liên kết các workspace Console mới (ID `org_`, trước đây chỉ nhận `wrk_`) với trang Go của chúng và hiển thị thời điểm đặt lại hạn mức Go hằng tháng.

**Đáng chú ý**

Issue #59387 vẫn là luồng thảo luận chính về gói miễn phí: 221 bình luận, thông báo đặt lại nhưng không bao giờ đặt lại, và các báo cáo về mức dùng miễn phí.

Issue #61072 báo cáo Claude Agent rút cạn hạn mức gói 5 giờ nhanh hơn khoảng 1,8 lần vì SDK gắn nhãn request là `sdk-ts`; issue #61282 báo cáo mức tái dùng cache thấp hơn 3,9 lần với Opus 5.5. Chưa có bản sửa nào được liệt kê.

Issue #61318 báo cáo các agent chính và subagent dùng cùng model đẩy cache của nhau ra trong lúc chạy song song.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

**Thay đổi gì**

Pi v1.5.0 bổ sung changelog cập nhật extension: lần khởi động mới sau khi cập nhật sẽ hiển thị những gì đã thay đổi trong các gói extension đã cài. Tác giả gói tự chọn đường dẫn changelog, và `collapseChangelog` gộp các thông báo lại.

`pi update` giờ báo cáo những gói nào đã thay đổi và thay đổi lên phiên bản nào ([PR #11707](https://github.com/earendil-works/pi/pull/11707)), và self-update báo cáo đúng phiên bản mà trình quản lý gói đã cài thay vì phiên bản được quảng cáo ([PR #11709](https://github.com/earendil-works/pi/pull/11709)). Cả hai đều quan trọng khi npm phân giải metadata cũ từ registry và cài lại phiên bản cũ.

**Đáng chú ý**

CPU cao trên macOS với các phiên dài: 50–110% CPU và 600–800MB bộ nhớ, theo ghi nhận có liên quan đến kích thước ngữ cảnh ([issue #7730](https://github.com/earendil-works/pi/issues/7730), 23 bình luận, đang mở). Dữ liệu chưa có cách khắc phục.

Các transcript lớn render lại mỗi frame, và mỗi lần thay đổi kích thước lại phát lại toàn bộ transcript, làm bão hòa một nhân trên Windows Terminal ([issue #9549](https://github.com/earendil-works/pi/issues/9549), đang mở, đang xử lý).

Với `cacheWarming: "idle"`, việc làm ấm khi rảnh không bao giờ kích hoạt một khi extension xử lý `turn_end` và ngữ cảnh chứa tin nhắn tùy chỉnh hoặc tin nhắn compaction; cả 507 quyết định trong một báo cáo đều ở `continuationProbability: 1` ([issue #10956](https://github.com/earendil-works/pi/issues/10956), đang mở).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Những gì đã thay đổi**

v0.26.6 bổ sung chế độ xem hoạt động Web Shell ở thanh bên cho các cuộc trò chuyện trong workspace tin cậy. Chế độ này hiển thị trạng thái phê duyệt, nhập liệu và lỗi cùng số lượng chưa đọc, để bạn thấy agent đang chờ gì mà không cần mở từng phiên.

sdk-typescript-v0.1.27 đi kèm CLI phiên bản 0.26.6. Kéo SDK về để dùng đúng CLI tương ứng.

Kết quả công cụ không còn bị báo là "không được ghi lại … Coi như thất bại và thử lại" sau khi phiên kết thúc đột ngột, theo issue #15799. Điều này quan trọng khi terminal đóng (SIGHUP) giữa lúc gọi công cụ song song và bạn khôi phục phiên.

**Điều cần biết**

Issue #16144: các kênh GitHub và GitLab tạo từ Web Shell mặc định mở cho mọi người, trong khi tài liệu nói quyền truy cập nhóm bị tắt theo mặc định. Báo cáo cho biết biểu mẫu chọn sẵn `Open` cho chính sách nhóm. Không có bản sửa lỗi nào được liên kết trong dữ liệu.

Issue #16171: mở một số phiên Web Shell rất chậm vì phát lại trực tiếp giữ lại toàn bộ nội dung tệp từ kết quả công cụ chỉnh sửa. Issue đã đóng; dữ liệu không nêu bản sửa lỗi.

Issue #16169: tin nhắn xếp hàng trong lúc công cụ chạy bị mất im lặng khi phiên tương tác nhận SIGHUP. Người dùng báo cáo tin nhắn không có trong cuộc trò chuyện đã khôi phục và không có trong `~/...`. Không có bản sửa lỗi nào được liên kết.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*