# Bản tin hệ sinh thái OpenClaw 2026-10-23

> Issues: 500 | PRs: 500 | Dự án theo dõi: 5 | Tạo lúc: 2026-10-23 03:54 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## Báo cáo chuyên sâu dự án OpenClaw

# Tóm tắt Dự án OpenClaw — 2026-10-23

## 1. Tổng quan hôm nay

OpenClaw cho thấy mức độ hoạt động liên tục rất cao: 500 issue và 500 PR được cập nhật trong 24 giờ qua, với 211 issue đã đóng và 232 PR đã merge/đóng. Một bản phát hành vá duy nhất (v2026.10.6) đã ra mắt, chủ yếu là **nâng cấp runtime Node vì lý do bảo mật** để phản ứng với sự cố xâm phạm chứng chỉ TLS của Node.js tháng 10/2026. Tuy nhiên, issue tracker đang bị chi phối bởi các **lỗi hồi quy P0/P1 về crash-loop, mất tin nhắn và gateway bị treo** vẫn còn mở từ dòng 2026.9.x — đáng chú ý là gateway bị chặn bởi plugin lớn (#160959, 42 bình luận), lỗi phục hồi sau khi ngủ (#140010, #158592), và biên dịch plugin khởi động ngốn CPU (#160485). Các issue P2/P3 cũ từ tháng 3–5/2026 đang được đóng dần, cho thấy maintainer đang tích cực dọn dẹp backlog trong khi một làn sóng hồi quy mới từ 2026.9.6–2026.10.x chiếm đầu hàng đợi. Tổng thể: **thông lượng cao nhưng nặng về hồi quy; công việc ổn định là chủ đề chính.**

## 2. Bản phát hành

### v2026.10.6 — Mới nhất

**Điểm nổi bật:**
- **Yêu cầu runtime Node đã được vá.** OpenClaw giờ đây yêu cầu **Node 24.22.1+** trên dòng 24 hoặc **26.12.1+** trên dòng 26. Các phiên bản này từ chối chuỗi TLS được ký bằng khóa chứng chỉ bị xâm phạm đã được đề cập trong bản phát hành bảo mật Node.js tháng 10/2026. Docker image đi kèm Node đã được vá.

**Tác động / Ghi chú nâng cấp:**
- Đây thực chất là một **bản phát hành tăng cường bảo mật**. Các operator đang chạy Node 24.x hoặc 26.x cũ phải nâng cấp Node trước/khi cập nhật OpenClaw, nếu không việc xác thực TLS với các chuỗi bị ảnh hưởng có thể hoạt động không nhất quán.
- Không có thay đổi phá vỡ schema hay config nào được đề cập trong nội dung bản phát hành, nhưng mức runtime tối thiểu là điều kiện tiên quyết cứng — các triển khai CI/tự host bị ghim vào Node cũ sẽ thất bại hoặc suy giảm.
- Với số lượng lỗi hồi quy gateway/plugin đang mở trên 2026.9.6+, người dùng 2026.9.x nên cân nhắc nâng cấp thẳng lên 2026.10.6, nhưng cần lưu ý một số issue P1 của 2026.10.x vẫn còn mở (xem §5).

*(Chỉ có một bản phát hành trong khoảng thời gian này; không có diff so với phiên bản trước.)*

## 3. Tiến độ dự án

Mặc dù mẫu PR được cung cấp chủ yếu là PR **đang mở**, một số PR đã đóng cho thấy luồng sửa lỗi đang hoạt động. Các mục đã merge/đóng quan trọng và công việc đang tiến triển:

- **PR #181174 [ĐÃ ĐÓNG]** — `refactor(ui): remove redundant Solid lifetime snapshots` — Dọn dẹp Control UI, giảm chi phí reactive trong các tab, command palette, hàng transcript, panel sidebar. [Liên kết](https://github.com/openclaw/openclaw/pull/181174)
- **PR #181245 [ĐÃ ĐÓNG]** — `fix(cron): stop CLI reply hooks after run cancellation` — ngăn các hook cron dựa trên CLI nhận việc sau khi một run bị hủy. Được gắn tag ranh giới bảo mật. [Liên kết](https://github.com/openclaw/openclaw/pull/181245)
- **PR #181288 [ĐÃ ĐÓNG]** — `fix: wait for keyboard progress hide before resize` — sửa hành vi ẩn/flake E2E của UI mobile. [Liên kết](https://github.com/openclaw/openclaw/pull/181288)

**Các PR tính năng/sửa lỗi đáng chú ý được mở hôm nay (đang tiến triển, chưa merge):**
- **PR #181289** — `fix: large session stores delay Gateway plugin startup` (Sửa #181090) — giải quyết trực tiếp nhóm lỗi chặn khởi động.
- **PR #181203** — `fix: resume peer updates with session-scoped authority` (ranh giới bảo mật).
- **PR #181260** — `fix(agents): settle consumed yield cohorts without retry` (sửa gửi trùng sau khi khởi động lại dưới `merge-risk: 🚨 message-delivery`).
- **PR #180824** — `feat(ui): save per-agent model favorites in the chat picker` (Đóng #180755).
- **PR #181190** — `perf(ui): virtualize large model picker catalogs` (hiệu năng catalog 1.000 model).
- **PR #181292** — `feat(plugins): enforce narrow-only native subagent profiles` — vai trò reviewer chỉ-đọc cho plugin subagent.

**Xu hướng đóng backlog:** nhiều issue từ tháng 3–5/2026 được đóng hôm nay (#44502, #15032, #33975, #53540, #56692, #47273, #50481, #48918, #45184, #126836, #71330), cho thấy maintainer đang dọn dẹp các mục quyết định sản phẩm cũ.

## 4. Chủ đề cộng đồng nổi bật

Các thread hàng đầu theo số bình luận:

1. **[#160959](https://github.com/openclaw/openclaw/issues/160959) — Gateway bị chặn hàng phút bởi plugin ngoài lớn (hồi quy 2026.9.6)** — 42 bình luận, P0, 🦞 diamond lobster. Issue nóng nhất. Nhu cầu cốt lõi: **việc capture plugin không được chặn event loop của gateway**. Cây package/dependency lớn làm đình trệ khởi động và chu kỳ republish. Đây là vấn đề kinh điển "hồi quy từ capture thế hệ plugin".

2. **[#42475](https://github.com/openclaw/openclaw/issues/42475) — Thực thi ngân sách chi phí theo từng agent ở cấp gateway** — 27 bình luận. Người dùng muốn **giới hạn chi tiêu cứng theo ngày/tháng** trước khi dispatch model, không cần giám sát bên ngoài. Cho thấy quản trị chi phí là mối quan tâm hàng đầu của operator.

3. **[#11829](https://github.com/openclaw/openclaw/issues/11829) [ĐÃ ĐÓNG] — Lộ trình Bảo mật: Bảo vệ API Key khỏi truy cập của Agent** — 21 bình luận. Bảo vệ secrets theo lớp; khóa rò rỉ vào prompt/chat. Đóng hôm nay — tín hiệu cột mốc bảo mật quan trọng.

4. **[#53763](https://github.com/openclaw/openclaw/issues/53763) [ĐÃ ĐÓNG] — Trình duyệt headless tích hợp** — 18 bình luận. Người dùng thất vọng với dependency truy cập web ba lớp mong manh.

5. **[#157531](https://github.com/openclaw/openclaw/issues/157531) — Fixes Tracker 2026.9.7** — 17 bình luận, theo dõi 18/21 ứng viên P1 đã xác lập bao gồm các mục privacy/security.

**Phân tích:** Nhu cầu chưa được đáp ứng chiếm ưu thế của cộng đồng là (a) **cô lập event loop gateway khỏi plugin**, (b) **kiểm soát chi phí**, và (c) **vệ sinh secrets/khóa**. Việc đóng lộ trình API-key (#11829) và trình duyệt headless (#53763) cho thấy maintainer đang chuyển các yêu cầu lâu dài thành cam kết lộ trình.

## 5. Lỗi & Ổn định

Xếp hạng theo mức độ nghiêm trọng (P0 trước). ⚠️ = hồi quy đang hoạt động trên dòng 2026.9.6+.

**P0 / Crash-loop / Mất tin nhắn:**
- ⚠️ **[#160959](https://github.com/openclaw/openclaw/issues/160959)** — Gateway bị chặn hàng phút bởi plugin lớn. **Bản sửa đang được tiến hành:** PR #181289 giải quyết nhóm chậm khởi động/session-store liên quan; bản thân việc đình trệ event loop do capture plugin vẫn đang được maintainer xem xét.
- ⚠️ **[#156712](https://github.com/openclaw/openclaw/issues/156712)** — Tiến trình con sửa chữa `openclaw triage` không thoát sạch, giữ lock `gateway-lifecycle`, chặn khởi động lại. Chỉ xử lý thủ công; chưa có PR sửa.
- ⚠️ **[#156674](https://github.com/openclaw/openclaw/issues/156674)** — Áp lực tài nguyên gateway trên macOS với Codex worker sống lâu (VM 8 GiB). Dừng gateway khôi phục khả năng phản hồi.
- ⚠️ **[#158592](https://github.com/openclaw/openclaw/issues/158592)** — Sau khi host sleep/wake, việc publish runtime model đã chuẩn bị bị timeout và không bao giờ phục hồi → mọi tin nhắn đến đều thất bại cho đến khi khởi động lại.
- ⚠️ **[#166634](https://github.com/openclaw/openclaw/issues/166634)** — Lỗi commit checkpoint thu hồi muộn khiến agent không khả dụng vĩnh viễn sau phục hồi crash (`not-repro-on-main`).
- **[#141615](https://github.com/openclaw/openclaw/issues/141615)** — webchat kẹt "Authenticated profile verification is unavailable" làm tê liệt mọi RPC session/task. **PR liên quan đang mở.**

**P1:**
- ⚠️ **[#140010](https://github.com/openclaw/openclaw/issues/140010)** — Windows sleep/resume: WebSocket reconnect thất bại 30–60 giây+.
- ⚠️ **[#172837](https://github.com/openclaw/openclaw/issues/172837)** — Codex `nativeSubagentAssignments` không bao giờ bị xóa sau khi việc gửi hoàn thành bị từ bỏ (session-state/mất tin nhắn). Cũng liên quan đến PR #181260.
- ⚠️ **[#167557](https://github.com/openclaw/openclaw/issues/167557)** — Migration plugin bị trì hoãn không bao giờ hội tụ; "managed handoff lease database identity changed." **fix-shape-clear.**
- ⚠️ **[#155359](https://github.com/openclaw/openclaw/issues/155359)** — Giao dịch ghi SQLite giữ tới 33,2 giây vượt `busy_timeout` trên Windows.
- ⚠️ **[#138042](https://github.com/openclaw/openclaw/issues/138042)** — Yêu cầu điều khiển gateway bị đình trệ 157–276 giây.
- ⚠️ **[#160485](https://github.com/openclaw/openclaw/issues/160485)** — Load plugin ngốn CPU do biên dịch module (57,4 giây trong 60 giây pha plugin).
- ⚠️ **[#145690](https://github.com/openclaw/openclaw/issues/145690)** — Hoàn thành subagent giải phóng thế hệ model-runtime → task làn tiếp theo thất bại, tin nhắn bị bỏ như timeout giả.
- **[#154716](https://github.com/openclaw/openclaw/issues/154716)** — Auth CLI Claude gốc cho kết quả auth-unknown, chặn reseed lịch sử.

**P2 / Đáng chú ý:**
- **[#165421](https://github.com/openclaw/openclaw/issues/165421)** — `maxTokens` cũ (128k) trong widget context của Control UI.
- **[#166137](https://github.com/openclaw/openclaw/issues/166137)** — Thay thế sentinel proxy egress không hiệu quả gián đoạn → 401 với thông tin xác thực cũ (bảo mật).
- **[#140723](https://github.com/openclaw/openclaw/issues/140723)** — WebChat nhân đôi văn bản assistant ×2–×3.
- **[#136360](https://github.com/openclaw/openclaw/issues/136360)** — Carrier nội bộ `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` rò rỉ thành lượt hiển thị trên Teams (cùng loại với Slack/Telegram/Feishu/Discord).
- **[#157812](https://github.com/openclaw/openclaw/issues/157812)** — Tự động cập nhật Windows thất bại liên tục.

**Đánh giá sức khỏe:** Mật độ lỗi P0/P1 về gateway-lifecycle, sleep/wake, SQLite và khởi động plugin quanh 2026.9.5–2026.9.8 cho thấy **nợ ổn định tập trung ở lớp vòng đời plugin/runtime**. Nhiều PR sửa lỗi (ví dụ #181289, #181260, #181203) đang nhắm chính xác vào đó, đây là tín hiệu tích cực rằng đội ngũ đang hội tụ về nguyên nhân gốc.

## 6. Yêu cầu Tính năng & Tín hiệu Lộ trình

**Được yêu cầu nhiều nhất / có khả năng tiếp theo:**
- **[#42475](https://github.com/openclaw/openclaw/issues/42475) — Ngân sách chi phí theo từng agent ở gateway** (27 bình luận, 1 👍). Nhu cầu operator cao; ứng viên khả thi sau khi ổn định vòng đời.
- **[#15032](https://github.com/openclaw/openclaw/issues/15032) [ĐÃ ĐÓNG] — Hạn chế công cụ theo từng lần spawn cho sub-agent.** Trường hợp bảo mật mạnh (DMZ/phòng thủ prompt-injection). Đóng hôm nay + PR #181292 (`narrow-only native subagent profiles`) = **điều này đang/đã được triển khai.**
- **[#13583](https://github.com/openclaw/openclaw/issues/13583) [ĐÃ ĐÓNG] — Hook thực thi trước phản hồi (cổng cứng).** Thực thi cơ học "phải gọi công cụ X" cho workflow quant/bảo mật. Đóng như quyết định sản phẩm — chờ theo dõi tiếp theo.
- **[#53763](https://github.com/openclaw/openclaw/issues/53763) [ĐÃ ĐÓNG] — Trình duyệt headless đi kèm.** Việc đóng gợi ý cải tổ công cụ trình duyệt.
- **[#144306](https://github.com/openclaw/openclaw/issues/144306) — Gửi

---

## So sánh chéo hệ sinh thái

# Báo cáo So sánh Liên dự án — Hệ sinh thái Mã nguồn mở Trợ lý AI Cá nhân / Agent
**Ngày: 2026-10-23** | Phạm vi: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Tổng quan Hệ sinh thái

Bối cảnh mã nguồn mở về trợ lý AI cá nhân / agent vào ngày 2026-10-23 đang **đồng thời trưởng thành và căng thẳng dưới áp lực nợ kỹ thuật về bảo mật và vòng đời**. Cả năm dự án được theo dõi đều đang trong chế độ tăng cường bảo mật sau sự cố: OpenClaw, QwenPaw và ZeroClaw đều đã phát hành hoặc chuẩn bị các bản vá để ứng phó với sự cố xâm phạm TLS của Node.js tháng 10/2026 và việc **emSign CA bị mất tin cậy** liên quan, cho thấy một sự kiện chia sẻ về trust-store ở thượng nguồn đã lan truyền khắp hệ sinh thái chỉ trong vài ngày. Mức độ hoạt động mang tính lưỡng cực — OpenClaw, Hermes, QwenPaw và ZeroClaw hoạt động với tốc độ rất cao (40–100 cập nhật issue/PR mỗi ngày), trong khi IronClaw đang ở giai đoạn bảo trì với tốc độ thấp, chủ yếu là các PR của Dependabot. Chiến trường khác biệt hiện tại không còn là "agent có thể gọi công cụ hay không" mà là **độ tin cậy vòng đời gateway, an toàn phê duyệt, quản trị bộ nhớ, và phạm vi định danh/quyền hạn** — những hạ tầng nền tảng quyết định liệu các agent này có đủ đáng tin để dùng hàng ngày trên môi trường tự vận hành hay không.

---

## 2. So sánh Mức độ Hoạt động

| Dự án | Issue được cập nhật (24h) | PR được cập nhật (24h) | Issue đã đóng | PR đã merge/đóng | Trạng thái Phát hành | Điểm Sức khỏe |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 211 | 232 | v2026.10.6 (bảo mật/Node bump) | **8.0 / 10** — thông lượng cao, nhưng tải hồi quy P0/P1 nặng |
| **Hermes Agent** | 50 | 50 | 1 | 2 | Không có | **5.5 / 10** — cộng đồng活跃, mất cân bằng merge nghiêm trọng (~25:1) |
| **IronClaw** | ~1 | 6 | 1 | 1 | Không có | **6.5 / 10** — ổn định/tốc độ thấp, chủ yếu PR bot, không có lỗi nghiêm trọng |
| **QwenPaw** | 22 | 50 | — | 2 | v2.2.2.post1 (bản vá bảo mật) | **6.5 / 10** — năng lượng cao, ~10 lỗi chưa sửa, tỷ lệ tồn đọng PR 48:2 |
| **ZeroClaw** | 42 | 50 | 12 | 8 | Không có (v0.8.7/v0.9.0 đang triển khai) | **7.5 / 10** — công việc release-gate có kỷ luật, pipeline báo cáo-sửa song song |

*Điểm sức khỏe là chỉ số tổng hợp định tính từ thông lượng, cân bằng merge, mức độ nghiêm trọng của lỗi đang mở, và nhịp độ phát hành quan sát được trong khoảng thời gian này.*

---

## 3. Vị thế của OpenClaw

**Lợi thế so với các dự án cùng nhóm:**
- **Quy mô cộng đồng lớn hơn một bậc độ lớn.** 500 issue và 500 PR được cập nhật trong 24h — gấp khoảng 10× hoạt động của Hermes, QwenPaw hay ZeroClaw, và gấp ~100× IronClaw. OpenClaw là bản tham chiếu thực tế của hệ sinh thái.
- **Dự án duy nhất có bản phát hành bảo mật trong cùng ngày gắn với yêu cầu phiên bản Node runtime tối thiểu** (v2026.10.6, yêu cầu Node 24.22.1+/26.12.1+). Các dự án cùng nhóm vá cây phụ thuộc của riêng họ; OpenClaw vá chính điều kiện tiên quyết runtime — một thế đứng thượng nguồn mạnh hơn.
- **Vệ sinh tồn đọng là thực chất.** 211 issue và 232 PR được đóng/merge trong một ngày, bao gồm các quyết định tính năng lâu dài (#11829 lộ trình secrets, #53763 trình duyệt headless, #15032 hạn chế công cụ subagent) — bằng chứng về đội ngũ maintainer quyết đoán và tận tâm.

**Khác biệt về cách tiếp cận kỹ thuật:**
- OpenClaw là **gateway nguyên khối với kiến trúc plugin-capture**, đây chính xác là nơi các hồi quy P0 của nó nằm (#160959 gateway bị chặn hàng phút với plugin lớn, #160485 biên dịch module tốn CPU). Hermes và ZeroClaw nhẹ hơn về kiến trúc — Hermes nhấn mạnh pipeline bộ nhớ, ZeroClaw dùng mô hình phiên chỉ ghi thêm — tránh hoàn toàn lớp tắc nghẽn plugin-capture của OpenClaw.
- Control UI của OpenClaw (dựa trên Solid) được sản phẩm hóa hơn so với các dự án cùng nhóm, với công việc ảo hóa đang hoạt động (#181190) cho danh mục 1.000 model.

**So sánh quy mô cộng đồng:** Issue tracker của OpenClaw thực sự là nguồn tín hiệu ngành — chủ đề nóng nhất (#160959) có 42 bình luận so với chủ đề hàng đầu của các dự án khác ở mức 7–35. Quản trị chi phí (#42475, 27 bình luận) và bảo mật-so-với-tự chủ (#151112) xuất hiện từ OpenClaw trước và có khả năng lan sang các dự án cùng nhóm.

**Lưu ý:** Mật độ hồi quy của OpenClaw cao nhất trong nhóm (nhiều lỗi P0/P1 về vòng đời gateway, sleep/wake, và SQLite quanh phiên bản 2026.9.5–2026.9.8). Điểm sức khỏe của nó được nâng bởi thông lượng, không phải bởi độ ổn định.

---

## 4. Các Lĩnh vực Kỹ thuật Chia sẻ

Bốn yêu cầu xuyên suốt đang xuất hiện ở **nhiều dự án một cách độc lập** — tín hiệu mạnh nhất cho thấy chúng thuộc cấp hệ sinh thái, không phải đặc thù từng dự án:

**1. An toàn phê duyệt / quyền hạn (agent thực hiện hành động phá hoại)**
- **Hermes #141346** — phê duyệt thông minh tự động chấp thuận `osascript` đã phá hủy một bài PowerPoint chưa lưu (35 bình luận, chủ đề hàng đầu).
- **Hermes #142834** — không có cổng phê duyệt cho `write_file` nói chung; chỉ terminal/execute_code được kiểm soát.
- **OpenClaw #151112** — vòng lặp bảo mật/phê duyệt biến chủ sở hữu thành "agent thực thi thủ công".
- **ZeroClaw #11989** — cấu hình `excluded_tools` theo kênh âm thầm không bao giờ được áp dụng (một kiểm soát bảo mật được tài liệu hóa nhưng không hoạt động).
- *Nhu cầu:* heuristic phê duyệt phân biệt được thao tác có thể đảo ngược và không thể đảo ngược, cùng phạm vi công cụ được thực thi (không chỉ khuyến nghị).

**2. Quản trị chi phí / giới hạn chi tiêu**
- **OpenClaw #42475** — ngân sách chi phí theo agent tại gateway (27 bình luận, đã 7+ tháng).
- **Hermes PR #143376** — `usage_limits.session_cost_usd` với khả năng tiếp tục khi resume.
- *Nhu cầu:* giới hạn chi tiêu cứng được thực thi trước khi gửi đến model, tích hợp sẵn trong agent thay vì giám sát gắn thêm.

**3. Vệ sinh secrets / thông tin xác thực & tin cậy CA**
- **OpenClaw** — #11829 lộ trình bảo vệ API-key (đã đóng), #166137 lỗi thay thế thông tin xác thực qua egress proxy.
- **QwenPaw v2.2.2.post1** — khắc phục tin cậy emSign CA trên các phụ thuộc, trình cài đặt và bản build.
- **ZeroClaw #11932** — bundle CA của container vẫn tin cậy chuỗi emSign đã bị mất tin cậy; PR sửa #11925.
- *Nhu cầu:* đảm bảo API key không thể rò rỉ vào prompt/lệnh gọi công cụ, cùng quản lý trust-store TLS đáng tin cậy — sự kiện emSign ảnh hưởng đến mọi dự án trong cùng một ngày.

**4. Độ tin cậy vòng đời gateway (sleep/wake, tắc event-loop)**
- **OpenClaw** — #160959 (plugin-capture chặn gateway), #158592 (khôi phục sau sleep không bao giờ thành công), #140010 (lỗi WebSocket khi sleep/resume trên Windows).
- **QwenPaw #8350** — lệnh gọi mạng đồng bộ Feishu treo toàn bộ event loop (`/api/healthz` timeout, SIGTERM không thể thoát).
- **ZeroClaw #11608** — listener Telegram kẹt vĩnh viễn khi request bị blackhole; #11951 nâng cấp WebSocket thất bại qua TLS tích hợp.
- **Hermes #140189** — gateway thử lại thông báo không gửi được mỗi 5 giây mãi mãi, không có backoff.
- *Nhu cầu:* cô lập event-loop khỏi plugin/kênh, timeout HTTP có giới hạn, và đường khôi phục sleep/wake đúng cách.

Một luồng thứ năm mang tính chiến lược hơn — **quản trị bộ nhớ** (ngân sách tại thời điểm ghi, sự đồng ý, và pipeline chấp nhận) — nổi bật ở Hermes (#135039, #116788) và có dấu hiệu ở OpenClaw (#87660 quản lý vòng đời MEMORY.md), nhưng chưa phổ biến.

---

## 5. Phân tích Khác biệt hóa

| Chiều | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Trọng tâm chính** | Gateway + hệ sinh thái plugin | Pipeline bộ nhớ + triển khai hybrid | Đánh giá model dựa trên benchmark | Triển khai Hub đa kênh | Định danh/truy cập + mô hình phiên |
| **Người dùng mục tiêu** | Người dùng tự vận hành chuyên sâu, operator | Nhà nghiên cứu, người dùng nhạy cảm về bộ nhớ | Kỹ sư ML/eval | Nhóm, operator Hub đa người dùng | Operator đội fleet quan tâm bảo mật |
| **Phong cách kiến trúc** | Gateway nguyên khối với plugin-capture | Agent với hệ thống con bộ nhớ | Framework + harness eval | Lớp adapter đa kênh | Phiên chỉ-ghi-thêm + phạm vi principal |
| **Độ phủ kênh** | Rộng (Slack/Teams/Telegram/Feishu/Discord/Matrix) | Slack, các bề mặt nhắn tin | Tối thiểu (WebUI) | **Rất rộng** (Feishu/WeChat/QQ/DingTalk/Telegram) | Email, Telegram, XMPP (đang triển khai) |
| **Thế mạnh đặc trưng** | Quy mô, Control UI, độ chín sản phẩm | Chuỗi tài liệu bộ nhớ, giới hạn chi tiêu | Chặt chẽ về phân loại benchmark | Hub/đa người dùng, minh bạch lộ trình | Thiết kế phạm vi-principal bảo mật trước tiên |
| **Điểm yếu đặc trưng** | Mật độ hồi quy ở lớp vòng đời | Mất cân bằng merge, updater dễ vỡ | Tương tác cộng đồng gần như bằng không | Độ tin cậy adapter kênh, hồi quy sau nâng cấp | Lỗi cấu hình âm thầm; đường găng v0.9.0 chậm |

**Khác biệt đáng chú ý:** QwenPaw là dự án duy nhất có **thế mạnh Hub đa người dùng** rõ rệt và độ phủ kênh hệ sinh thái Trung Quốc rộng nhất (Feishu/WeChat/QQ/DingTalk) — một vị thế thị trường riêng biệt. ZeroClaw là dự án duy nhất có **release gate định danh-truy cập có chủ đích** (chuỗi PR xếp tầng #11225→#11230→#11220→#11234), định vị bảo mật là tính năng chủ đạo của v0.9.0. Hermes khác biệt ở **bộ nhớ như một hệ thống con được quản trị hạng nhất** — không dự án cùng nhóm nào có pipeline chấp nhận bộ nhớ tương đương ở dạng PR.

---

## 6. Đà phát triển & Độ chín của Cộng đồng

**Bậc 1 — Tốc độ cao, lặp nhanh:**
- **OpenClaw** — 1.000 cập nhật kết hợp/ngày. Vừa lặp nhanh *vừa* hồi quy nhanh. Codebase trưởng thành, độ ổn định chưa trưởng thành trong dòng 2026.9.x.
- **ZeroClaw** — 92 cập nhật kết hợp/ngày, với các cặp PR báo cáo-sửa song song có kỷ luật (#11932/#11925, #11608/#11651). Giai đoạn nước rút trước phát hành v0.9.0. Độ chín quy trình tốt nhất trong nhóm.

**Bậc 2 — Năng lượng cao, tồn đọng nhiều:**
- **QwenPaw** — 72 cập nhật kết hợp/ngày, nhưng tỷ lệ PR mở-trên-đã-merge là 48:2 và ~10 lỗi chưa sửa. Tương tác cộng đồng cao, thông lượng review của maintainer là nút thắt. Vừa phát hành bản vá bảo mật.
- **Hermes Agent** — 100 cập nhật kết hợp/ngày nhưng chỉ 1 issue đóng và 2 PR

---

## Báo cáo chi tiết các dự án cùng phân khúc

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Tổng hợp dự án
**Ngày: 2026-10-23** | Kho lưu trữ: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. Tổng quan hôm nay

Hermes Agent cho thấy hoạt động cộng đồng rất cao vào ngày 2026-10-23, với 50 issue và 50 PR được cập nhật trong 24 giờ qua — nhưng chỉ có 1 issue được đóng và 2 PR được merge/đóng. Điều này tạo ra **tỷ lệ mở-đóng khoảng 25:1**, cho thấy tồn đọng bảo trì đáng kể và cộng đồng đang tạo ra báo cáo cùng đề xuất nhiều hơn mức dự án có thể tiếp nhận hiện tại. Không có bản phát hành mới nào được công bố hôm nay. Các issue chủ yếu nghiêng về bug (đặc biệt ở trình cập nhật CLI, gateway/multiplexing, hệ thống con bộ nhớ và ứng dụng Desktop) cùng một cụm đáng chú ý về các lo vấn đề bảo mật/cổng phê duyệt. Chủ đề được bình luận nhiều nhất là sự cố mất dữ liệu do smart approval tự động thực thi lệnh `osascript` lên bộ PowerPoint của người dùng, điều này có khả năng sẽ thúc đẩy các thay đổi gần hạn đối với heuristic phê duyệt và an toàn của công cụ terminal.

---

## 2. Bản phát hành

**Không có.** Không có bản phát hành mới nào được công bố trong 24 giờ qua, và không có hoạt động changelog liên quan đến phát hành nào được thấy.

---

## 3. Tiến độ dự án

Chỉ có **2 PR** được merge hoặc đóng hôm nay (không được nêu chi tiết trong top-20 theo số lượng bình luận), nên tiến độ merge được thấy là tối thiểu. Tuy nhiên, một số PR đáng kể đang tiến triển qua quá trình review và đại diện cho những thứ có khả năng được merge gần hạn:

- **Pipeline ghi bộ nhớ** — [PR #139606](https://github.com/NousResearch/hermes-agent/pull/139606) triển khai pipeline chấp nhận bảy giai đoạn và ngân sách thời điểm ghi cho `MEMORY.md` / `USER.md` được đề xuất trong [Issue #135039](https://github.com/NousResearch/hermes-agent/issues/135039).
- **Khôi phục đọc bộ nhớ** — [PR #141876](https://github.com/NousResearch/hermes-agent/pull/141876) hoàn tác việc xóa 14 dòng của hành động `read` bộ nhớ (commit `56ee8a5cc6`), lập luận rằng 5.000+ dòng thay đổi sau đó đã không sửa được vấn đề gốc.
- **Chuỗi tài liệu bộ nhớ** — [PR #116673](https://github.com/NousResearch/hermes-agent/pull/116673) cho phép `MEMORY.md` neo một chuỗi tài liệu bộ nhớ ([Issue #116564](https://github.com/NousResearch/hermes-agent/issues/116564)).
- **Sửa giới hạn lượt** — [PR #140980](https://github.com/NousResearch/hermes-agent/pull/140980) khiến `hermes -z` tuân thủ `agent.max_turns` / `HERMES_MAX_ITERATIONS` (tương ứng [Issue #140935](https://github.com/NousResearch/hermes-agent/issues/140935)).
- **Deep link Kanban** — [PR #143385](https://github.com/NousResearch/hermes-agent/pull/143385) triển khai cả bộ nhận và bộ phát cho URL thẻ chuẩn.
- **Prompt vault gateway** — [PR #142924](https://github.com/NousResearch/hermes-agent/pull/142924) cho phép `browser_vault` yêu cầu mã đăng nhập và thông tin đăng nhập trong chat Desktop, và [PR #130387](https://github.com/NousResearch/hermes-agent/pull/130387) mở rộng prompt vault đến các bề mặt nhắn tin.
- **Giới hạn chi tiêu phiên** — [PR #143376](https://github.com/NousResearch/hermes-agent/pull/143376) giới thiệu `usage_limits.session_cost_usd` với hành vi tiếp tục khi "continue".
- **Đề cập rich-text Slack** — [PR #133323](https://github.com/NousResearch/hermes-agent/pull/133323) sửa việc token `<#channel>` hiển thị nguyên văn trong chế độ `rich_blocks`.
- **Vệ sinh phụ thuộc** — [PR #143377](https://github.com/NousResearch/hermes-agent/pull/143377) ghim các bản vá npm để xóa cảnh báo cao của `hermes doctor`.
- **Tiếp tục mô hình cục bộ** — [PR #140109](https://github.com/NousResearch/hermes-agent/pull/140109) cho phép tiếp tục tải xuống mô hình lớn bị gián đoạn.

---

## 4. Chủ đề nóng cộng đồng

| Hạng | Mục | Bình luận | Tín hiệu |
|---|---|---|---|
| 1 | [Issue #141346](https://github.com/NousResearch/hermes-agent/issues/141346) — Smart approval tự động phê duyệt `osascript` đã đóng bộ PowerPoint chưa lưu, mất dữ liệu không thể khôi phục | 35 | 🔥 Mục có tương tác cao nhất; an toàn của heuristic phê duyệt |
| 2 | [Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) — Hermes agent từ xa với thực thi công cụ cục bộ | 29 | 42 👍 — yêu cầu mở được bình chọn cao nhất; triển khai hybrid cục bộ/từ xa |
| 3 | [Issue #135039](https://github.com/NousResearch/hermes-agent/issues/135039) — Ngân sách + pipeline chấp nhận cho `MEMORY.md` / `USER.md` | 15 | Vệ sinh bộ nhớ; PR liên quan #139606 đang mở |
| 4 | [Issue #139091](https://github.com/NousResearch/hermes-agent/issues/139091) — Thăm dò merge-base của `hermes update` hết thời gian trên bản clone một phần | 8 | Hỏng trình cài đặt kênh ổn định |
| 5 | [Issue #143364](https://github.com/NousResearch/hermes-agent/issues/143364) — Tiến độ hồ sơ phụ được multiplex chuyển qua bot chính | 7 | Cô lập hồ sơ/tin nhắn trong gateway multiplex |
| 6 | [Issue #116788](https://github.com/NousResearch/hermes-agent/issues/116788) — Trình review bộ nhớ nền lưu giữ sự kiện người dùng yêu cầu không lưu | 6 | Vi phạm quyền riêng tư/sự đồng ý trong pipeline bộ nhớ |
| 7 | [Issue #143326](https://github.com/NousResearch/hermes-agent/issues/143326) — Sau cập nhật, quyền Windows không khớp + độ trễ chọn mô hình | 6 | Đường dẫn cập nhật desktop/gateway trên Windows |
| 8 | [Issue #142925](https://github.com/NousResearch/hermes-agent/issues/142925) — Popover Context-usage của Desktop trống cho các phiên không thường trú | 6 | Khả năng hiển thị trạng thái phiên trong Desktop |

**Phân tích nhu cầu ẩn:** Các chủ đề hàng đầu tập trung quanh ba chủ đề — (a) **an toàn phê duyệt** (một hành động của agent gây mất dữ liệu người dùng không thể đảo ngược dù có smart approval), (b) **quản trị bộ nhớ** (ngân sách, chấp nhận và đồng ý trong một hệ thống con được chèn vào mọi lượt), và (c) **linh hoạt triển khai** (agent từ xa + thực thi công cụ cục bộ, được bình chọn mạnh). Cụm cô lập multiplex/hồ sơ (#143364) gợi ý rằng kiến trúc gateway đa bot đang đi vào sử dụng thực tế nhanh hơn mức độ trưởng thành của phạm vi hồ sơ.

---

## 5. Bug & Ổn định

Xếp hạng theo mức độ nghiêm trọng (thẻ P-level và tác động):

**P2 / Cao:**
- [Issue #141346](https://github.com/NousResearch/hermes-agent/issues/141346) — **Bảo mật/mất dữ liệu.** Smart approval tự động phê duyệt `osascript`; agent đóng bộ PowerPoint chưa lưu và xóa bản xuất của nó. Dữ liệu người dùng không thể khôi phục. Chưa có PR sửa.
- [Issue #143326](https://github.com/NousResearch/hermes-agent/issues/143326) — Cập nhật Windows để gateway chạy ở cấp admin trong khi ứng dụng thì không; quyền không khớp và độ trễ chọn mô hình. Chưa có PR sửa.
- [Issue #143313](https://github.com/NousResearch/hermes-agent/issues/143313) — `pip install -e .` không thể thỏa mãn trên Python 3.14: `Pillow==13.0.0` mâu thuẫn với `pillow==12.3.0` của `browser-harness`. Chặn cài đặt trên bản checkout sạch. Chưa có PR sửa.
- [Issue #143331](https://github.com/NousResearch/hermes-agent/issues/143331) — Windows: `gateway.pid` cũ bên cạnh lock đang giữ khiến `hermes update` hủy mỗi lần chạy. Chưa có PR sửa.
- [Issue #143361](https://github.com/NousResearch/hermes-agent/issues/143361) — `hermes update` để lại tag phát hành cũ; `hermes --version` báo sai một bản checkout đã ở commit phát hành. Chưa có PR sửa.
- [Issue #136713](https://github.com/NousResearch/hermes-agent/issues/136713) — Dashboard Chat gắn lại ngắt cứng lượt đang chạy; phiên đóng với `end_reason=tui_shutdown`. Công việc bị phá hủy khi tải lại trang/mở tab thứ hai. Chưa có PR sửa.
- [Issue #142925](https://github.com/NousResearch/hermes-agent/issues/142925) — Popover Context-usage của Desktop vĩnh viễn trống với mọi phiên không có agent thường trú. Chưa có PR sửa.
- [Issue #142988](https://github.com/NousResearch/hermes-agent/issues/142988) — Mỗi `hermes update` xóa runtime nhà cung cấp bộ nhớ `hindsight-all` được cài thủ công; nhà cung cấp bộ nhớ hỏng sau mỗi lần làm mới toolchain. Chưa có PR sửa.
- [Issue #142834](https://github.com/NousResearch/hermes-agent/issues/142834) — Lỗ hổng bảo mật: không có cổng phê duyệt cho hành động `write_file` nói chung (chỉ terminal/execute_code/tệp được bảo vệ mới được gác). Chưa có PR sửa.
- [Issue #140189](https://github.com/NousResearch/hermes-agent/issues/140189) — Gateway thử lại thông báo hoàn thành tiến trình không thể gửi mỗi 5 giây mãi mãi, không backoff/giới hạn/log. Chưa có PR sửa.
- [Issue #136315](https://github.com/NousResearch/hermes-agent/issues/136315) — Hoàn thành ủy quyền bất đồng bộ đã xác nhận bị mất khi ghi đè FIFO ở giới hạn đệ quy; công việc bị bỏ mặc âm thầm. Chưa có PR sửa.
- [Issue #139796](https://github.com/NousResearch/hermes-agent/issues/139796) — `session.resume` của Desktop trả về `not_found` cho các phiên lạnh/bị loại bỏ; không có đường tải lạnh. Chưa có PR sửa.
- [Issue #131149](https://github.com/NousResearch/hermes-agent/issues/131149) — Windows: `--no-gateway-restart` vẫn dừng toàn bộ fleet; cập nhật do gateway làm cha bị giết giữa chừng bằng SIGTERM (~20 phút downtime). Chưa có PR sửa.
- [Issue #138133](https://github.com/NousResearch/hermes-agent/issues/138133) — Thẻ phê duyệt DM Telegram không được thấy; lệnh terminal chặn đủ 300 giây rồi hết thời gian. Cần tái hiện.
- [Issue #77775](https://github.com/NousResearch/hermes-agent/issues/77775) — Kiểm tra trước SQLite phân loại sai các sidecar WAL/SHM đã biến mất là read-only (race condition). Chưa có PR sửa.

**P3 / Thấp hơn:**
- [Issue #142820](https://github.com/NousResearch/hermes-agent/issues/142820) — `hermes cron run` bỏ qua lệnh dừng khẩn cấp toàn cục (`hermes pause`). Chưa có PR sửa.

**PR sửa đáng chú ý đang trong tiến trình:** [PR #140980](https://github.com/NousResearch/hermes-agent/pull/140980) đóng lớp giới hạn lượt từ [Issue #140935](https://github.com/NousResearch/hermes-agent/issues/140935); [PR #141876](https://github.com/NousResearch/hermes-agent/pull/141876) khôi phục hành động đọc bộ nhớ; [PR #133323](https://github.com/NousResearch/hermes-agent/pull/133323) sửa hiển thị đề cập Slack. Các khoảng trống ổn định lớn nhất (an toàn phê duyệt, trình cập nhật trên Windows, tính bền vững của nhà cung cấp bộ nhớ) hiện **không có PR sửa nào được liên kết**.

---

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

Các yêu cầu được xếp hạng theo sức hút cộng đồng và mức độ gần với các PR hiện có:

1. **[Issue #18715](https://github.com/NousResearch/hermes-agent/issues/18715) — Agent từ xa + thực thi công cụ cục bộ** (42 👍, 29 bình luận). Tín hiệu lộ trình mạnh nhất; chưa có PR liên kết, nhưng được gắn thẻ `needs-decision`.
2. **[Issue #135039](https://github.com/NousResearch/hermes-agent/issues/135039) / [PR #139606](https://github.com/NousResearch/hermes-agent/pull/139606) — Ngân sách thời điểm ghi bộ nhớ + pipeline chấp nhận.** Gần như chắc chắn được merge gần hạn; nhiều người đóng góp thiết kế được nêu tên trong luồng PR.
3. **[Issue #116564](https://github.com/NousResearch/hermes-agent/issues/116564) / [PR #116673](https://github.com/NousResearch/hermes-agent/pull/116673) — `MEMORY.md` làm neo cho chuỗi tài liệu bộ nhớ.** PR đang mở và dùng được đầu-cuối.
4. **[Issue #142834](https://github.com/NousResearch/hermes-agent/issues/142834) — Cổng phê duyệt cho `write_file` nói chung.** Có khả năng gắn với hậu quả của #141346.
5. **[Issue #138458](https://github.com

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

IronClaw có **mức độ hoạt động bảo trì từ thấp đến trung bình** trong ngày hôm nay, chủ yếu là các đợt cập nhật phụ thuộc tự động thay vì phát triển tính năng cốt lõi. Trong 6 PR được cập nhật, 5 PR vẫn đang mở và tất cả đều là các nâng cấp phụ thuộc do Dependabot duy trì (Storybook, Vite, DOMPurify, certifi), chỉ có một PR DOMPurify trước đó (#8149) đã đóng. Hoạt động issue ở mức tối thiểu: một báo cáo phân loại lỗi benchmark tự động hàng ngày (#8153) và việc đóng yêu cầu hỗ trợ Docker ARM64 đã tồn tại từ lâu (#3168). **Không có bản phát hành mới** nào được công bố. Nhìn chung, tình trạng dự án có vẻ ổn định nhưng hoạt động trong ngày chủ yếu là công việc dọn dẹp thường lệ, không có PR tính năng hay sửa lỗi thực chất nào được hợp nhất.

## 2. Bản phát hành

Không có bản phát hành mới trong 24 giờ qua. Dữ liệu bản phát hành gần nhất không khả dụng.

## 3. Tiến độ dự án

**Các mục đã hợp nhất/đóng hôm nay:**

- **[PR #8149](https://github.com/nearai/ironclaw/pull/8149)** — `chore(deps): bump dompurify from 3.4.12 to 3.4.16` (đã đóng). PR này đã bị thay thế bởi #8155, nâng DOMPurify lên 3.4.17. Kết quả thực tế: thư viện làm sạch HTML của WebUI frontend đã được nâng thêm hai phiên bản patch. Đây là phụ thuộc liên quan đến bảo mật (DOMPurify giảm thiểu XSS), mặc dù không có CVE nào được đề cập trong tóm tắt.

- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — Đã đóng sau khoảng 6 tháng mở (tạo ngày 2026-05-01). Yêu cầu hỗ trợ Docker image ARM64/aarch64, lưu ý rằng Cranelift đã hỗ trợ aarch64 và chỉ armv7 (32-bit) là hạn chế đã được xác nhận (được theo dõi riêng tại #1339). Việc đóng issue này gợi ý đã được giải quyết hoặc hợp nhất, nhưng không có PR liên kết nào hiển thị trong dữ liệu — người bảo trì nên xác nhận kết quả đã được ghi lại.

**Đánh giá:** Không có tiến bộ tính năng nào hôm nay. Việc vệ sinh phụ thuộc tiến triển ở mức nhỏ.

## 4. Chủ đề cộng đồng nổi bật

Hoạt động đồng đều ở mức thấp — **không có issue hay PR nào có bình luận hoặc reaction** (tất cả đều hiển thị 0 👍 và 0/không xác định số bình luận). Các mục đáng chú ý nhất theo thời gian và mức độ liên quan:

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** — *Daily ironclaw failure taxonomy — 2026-10-22*. Một phân tích benchmark tự động (hoặc bán tự động) báo cáo 64 tác vụ không đạt trên bộ `officeqa`, quy chúng "phần lớn" cho lỗi chất lượng mô hình thực sự trong điều hướng của **DeepSeek-V4-Flash**. Điều này phản ánh cơ sở hạ tầng đánh giá đang diễn ra (liên kết đến nearai.github.io/benchmarks) hơn là thảo luận cộng đồng.

- **[PR #8154](https://github.com/nearai/ironclaw/pull/8154)** — Nâng Vite lên 8.1.6, PR phụ thuộc không phải bot mới duy nhất từ 2026-10-22.

**Nhu cầu ẩn sau:** Việc thiếu bình luận trên toàn bộ các mục cho thấy hoặc là cơ sở người đóng góp nhỏ, mức độ tương tác cộng đồng thấp, hoặc các issue được người bảo trì tạo/đóng mà không có thảo luận. Chuỗi phân loại lỗi gợi ý một quy trình chất lượng dựa trên đánh giá nội bộ hơn là đối thoại với người dùng bên ngoài.

## 5. Lỗi & Ổn định

**Không có báo cáo lỗi, sự cố hay hồi quy mới nào được gửi hôm nay.** Tín hiệu duy nhất liên quan đến ổn định là:

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** (mang tính thông tin, không phải lỗi dự án) — 64 tác vụ benchmark không đạt, được phân loại là lỗi *chất lượng mô hình* (không phải lỗi cơ sở hạ tầng IronClaw). Mức độ nghiêm trọng đối với chính dự án: **thấp**, vì nó chỉ ra mô hình được đánh giá (DeepSeek-V4-Flash) chứ không phải framework agent.

Các nâng cấp phụ thuộc ngầm giải quyết vấn đề ổn định/bảo mật:
- **[PR #8155](https://github.com/nearai/ironclaw/pull/8155)** — DOMPurify 3.4.17 (bản sửa lỗi làm sạch XSS ở cấp patch; PR gốc #8149 đã bị thay thế).
- **[PR #8157](https://github.com/nearai/ironclaw/pull/8157)** — certifi 2026.10.19, theo tóm tắt là *khôi phục các root emSign không bị ảnh hưởng* — một chỉnh sửa TLS trust-store đáng được xử lý nhanh.

Không có PR sửa lỗi cho sự cố do người dùng báo cáo vì không có báo cáo nào.

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

- **Hỗ trợ Docker ARM64/aarch64** ([Issue #3168](https://github.com/nearai/ironclaw/issues/3168)) — yêu cầu tính năng tồn đọng chính, nay đã **đóng** sau khi mở từ tháng 5/2026. Việc đóng này là tín hiệu lộ trình mạnh nhất trong ngày: hãy kỳ vọng các image đa kiến trúc chính thức (`linux/amd64` + `linux/arm64`) sẽ xuất hiện trong ghi chú phát hành sắp tới. armv7/32-bit vẫn nằm ngoài phạm vi rõ ràng (#1339).
- **Lựa chọn mô hình dựa trên benchmark** — quy trình phân loại của Issue #8153 gợi ý tiếp tục đầu tư vào công cụ đánh giá và có thể hoán đổi/hướng dẫn lựa chọn mô hình (DeepSeek-V4-Flash được đánh giá ở đây). Không có yêu cầu tính năng hướng đến người dùng nào đi kèm.

Không có yêu cầu tính năng nào khác được nêu hôm nay.

## 7. Tóm tắt phản hồi người dùng

Phản hồi trực tiếp từ người dùng hôm nay **gần như không có** (không bình luận nào trên tất cả issue/PR). Các điểm khó khăn suy ra từ dữ liệu:

- **Khó khăn về tương thích nền tảng**: Issue #3168 ghi lại trở ngại triển khai thực tế cho người dùng ARM64 (Apple Silicon, Graviton, máy chủ ARM) không thể chạy image chính thức. Việc đóng issue là tín hiệu hài lòng nếu đã được giải quyết.
- **Minh bạch chất lượng**: Phân loại lỗi tự động (#8153) phản ánh sự không hài lòng của chính người bảo trì với tỷ lệ thành công tác vụ của agent trên `officeqa`, dù được trình bày ở cấp mô hình chứ không phải framework.

Không có cảm xúc tích cực/tiêu cực, lời khen hay khiếu nại nào được người dùng ghi nhận trong khoảng thời gian này.

## 8. Theo dõi tồn đọng

- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — Nay đã đóng, nhưng **hãy xác minh có bình luận giải quyết hoặc PR liên kết tồn tại**; việc đóng không giải thích một yêu cầu hỗ trợ nền tảng đã 6 tháng có thể gây thất vọng cho người dùng ARM.
- **[Issue #1339](https://github.com/nearai/ironclaw/issues/1339)** — Được tham chiếu là issue theo dõi các hạn chế armv7 (32-bit); không được cập nhật hôm nay nhưng đáng theo dõi nếu hỗ trợ ARM đang được xem xét lại.
- **Năm PR phụ thuộc đang mở** ([#8154](https://github.com/nearai/ironclaw/pull/8154), [#8155](https://github.com/nearai/ironclaw/pull/8155), [#8156](https://github.com/nearai/ironclaw/pull/8156), [#8157](https://github.com/nearai/ironclaw/pull/8157), [#8158](https://github.com/nearai/ironclaw/pull/8158)) đều đang chờ người bảo trì xem xét/hợp nhất. Với bản sửa TLS trust-store của #8157, **nên có sự chú ý của người bảo trì** để tránh tồn đọng và trôi dạt bảo mật tiềm ẩn.

---

**Tóm tắt sức khỏe:** Ngày ổn định, tốc độ thấp. Công việc dọn dẹp và bảo trì phụ thuộc chiếm ưu thế; không có tính năng mới, bản phát hành hay lỗi nghiêm trọng nào. Các chỉ số tương tác của dự án (không bình luận/reaction) gợi ý nhịp phát triển yên ắng hoặc cộng đồng bên ngoài hạn chế — đáng theo dõi nếu xu hướng này kéo dài.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

QwenPaw đang vận hành với tốc độ cao trong hôm nay, với **22 issue** và **50 PR** được cập nhật trong 24 giờ qua — tín hiệu mạnh mẽ về một cộng đồng và đội ngũ maintainer năng động, gắn kết. Dự án đã phát hành bản patch **v2.2.2.post1**, chủ yếu là bản phát hành nhằm xử lý bảo mật liên quan đến khắc phục tin cậy CA. Tuy nhiên, làn sóng hoạt động này chủ yếu nghiêng về báo cáo lỗi và công việc ổn định hóa hơn là các tính năng mới, cho thấy dự án đang trong giai đoạn gia cố hậu 2.2.x (với việc tái cấu trúc v2.3.0 đang được chuẩn bị theo Issue #8289). Khoảng hơn 20 lỗi khác nhau đã được xử lý trong hôm nay, một số là regression liên kênh và liên nền tảng, trong khi 48 PR vẫn đang mở so với chỉ 2 PR được merge/đóng — lượng tồn đọng tích lũy nhẹ cần theo dõi.

## 2. Các bản phát hành

**v2.2.2.post1** — Đã phát hành (issue xác minh sau phát hành #8386 đã đóng hôm nay).

- **Thay đổi:**
  - Tăng phiên bản lên `v2.2.2.post1` ([#8369](https://github.com/agentscope-ai/QwenPaw/pull/8369))
  - `fix(security): remediate emSign CA trust across dependencies, installers, and builds` ([#8370](https://github.com/agentscope-ai/QwenPaw/pull/8370))
- **Thông báo bảo mật:** Một security advisory riêng đã được tạo hôm nay ([#8385](https://github.com/agentscope-ai/QwenPaw/issues/8385)) kêu gọi **tất cả người dùng nâng cấp lên 2.2.2.post1 hoặc mới hơn**. Đây thực chất là một bản phát hành vá bảo mật.
- **Thay đổi phá vỡ tương thích / ghi chú migration:** Không có tài liệu nào được ghi rõ, nhưng việc khắc phục tin cậy emSign CA có thể ảnh hưởng đến chuỗi tin cậy TLS trong các môi trường phụ thuộc vào CA root đi kèm trước đây. Người dùng có trust store tùy chỉnh nên kiểm tra lại sau khi nâng cấp.

## 3. Tiến độ dự án

Hoạt động merge/đóng trong hôm nay rất ít:
- **[#8391](https://github.com/agentscope-ai/QwenPaw/pull/8391)** (chore): Merge `Release/v2.2.2post1` vào `main` — hợp nhất nhánh phát hành.
- **[#8386](https://github.com/agentscope-ai/QwenPaw/issues/8386)** (CLOSED): Xác minh nhiệm vụ phát hành cho v2.2.2.post1 — tất cả checkpoint kiểm tra cài đặt trên các nền tảng đều đạt và đóng trong cùng ngày.
- **[#8370](https://github.com/agentscope-ai/QwenPaw/pull/8370)** bản vá bảo mật đã được đưa vào bản phát hành.

**Đang triển khai nhưng có tiến triển:**
- **Tái cấu trúc kiến trúc plugin v2.3.0** đang được phổ biến qua [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289), định vị QwenPaw trở nên "nhẹ hơn và dễ mở rộng hơn."
- Một loạt PR ổn định đáng kể (định tuyến approval, phát lại media, kích thước context Ollama, xử lý CRLF/GBK) vẫn đang được review — xem Mục 8.

## 4. Chủ đề nóng trong cộng đồng

| Mục | Bình luận | Loại | Liên kết |
|---|---|---|---|
| #8071 Điểm mở rộng theme cho plugin | 7 | Tính năng | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) |
| #8289 Sắp có trong v2.3.0: Nhẹ hơn & Dễ mở rộng hơn | 3 | Lộ trình | [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) |
| #8351 Bản nháp Composer được khóa theo agent, không theo cuộc trò chuyện | 3 | Lỗi | [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) |

**Nhu cầu ẩn sau:**
- **Khả năng mở rộng plugin là yêu cầu hàng đầu của cộng đồng.** #8071 (ghi đè token theme chuyên sâu) và #8275 (chia sẻ Skill/MCP toàn cục giữa các người dùng Hub) đều cho thấy hệ sinh thái plugin đang trưởng thành vượt qua mô hình một tham số duy nhất (`colorPrimary`) hiện tại. Các nhóm muốn có khả năng chia sẻ và quản lý tập trung.
- **Minh bạch lộ trình đang phát huy hiệu quả.** Bài đăng v2.3.0 "nhẹ hơn và dễ mở rộng hơn" (#8289) đang thu hút phản hồi có cấu trúc, cho thấy cộng đồng đồng thuận với hướng tái cấu trúc plugin.
- **Các lỗi về phạm vi trạng thái tạo ra thảo luận không tương xứng** vì khó tái hiện và ảnh hưởng đến UX hàng ngày (bản nháp tràn sang các cuộc trò chuyện khác của cùng agent).

## 5. Lỗi & Ổn định

Xếp hạng theo mức độ nghiêm trọng (P0 → P3):

**P0 — Gây hỏng dịch vụ / mất dữ liệu:**
- **[#8350](https://github.com/agentscope-ai/QwenPaw/issues/8350)** — Kênh Feishu thực thi các cuộc gọi mạng đồng bộ trên event loop chính; khi mạng ngừng hoạt động, toàn bộ dịch vụ bị treo (`/api/healthz` hết thời gian chờ, SIGTERM không thể thoát). *Chưa có PR sửa.* — Rủi ro khả dụng nghiêm trọng.
- **[#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359)** — Hub-trong-container: Docker runtime không khởi động được vì readiness probe hardcode `127.0.0.1` (Errno 111). Phá vỡ đường triển khai được maintainer khuyến nghị. *Chưa có PR sửa.*

**P1 — Regression chức năng:**
- **[#8388](https://github.com/agentscope-ai/QwenPaw/issues/8388)** — Sau khi nâng cấp, kênh QQ lỗi: `No module named '_qwenpaw_remote_backend'`. Cho thấy đường dẫn runtime sau nâng cấp bị hỏng. *Chưa có PR sửa.*
- **[#8378](https://github.com/agentscope-ai/QwenPaw/issues/8378)** — Gọi model bị hỏng sau nâng cấp; `agent.json` vẫn chứa `active_model` trong khi các code path mới đã phân kỳ. *Chưa có PR sửa.*
- **[#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343)** — Phản hồi cuối cùng của DingTalk bị âm thầm loại bỏ khi `sessionWebhook` hết hạn (`errcode=300001`), không có fallback qua Open API. *Chưa có PR sửa.*
- **[#8335](https://github.com/agentscope-ai/QwenPaw/issues/8335)** — Session WeChat bị kẹt vĩnh viễn do request body 48 MB (phát lại media). **PR sửa đang mở: [#8337](https://github.com/agentscope-ai/QwenPaw/pull/8337)** và [#8299](https://github.com/agentscope-ai/QwenPaw/pull/8299).
- **[#8342](https://github.com/agentscope-ai/QwenPaw/issues/8342)** — Trả lời trích dẫn làm mất định tuyến lệnh điều khiển kênh trong **bảy kênh** (`/stop` kích hoạt sai). Rộng hơn một adapter đơn lẻ.
- **[#8329](https://github.com/agentscope-ai/QwenPaw/issues/8329)** — Kênh Telegram bỏ qua `reply_to_message`; ngữ cảnh trích dẫn không bao giờ đến được agent (không nhất quán với các kênh khác).

**P2 — UX / tính đúng đắn:**
- **[#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351)** — Bản nháp Composer được khóa theo agent, không theo cuộc trò chuyện → văn bản chưa gửi bị tràn sang các chat khác của cùng agent.
- **[#8368](https://github.com/agentscope-ai/QwenPaw/issues/8368)** — Xóa cuộc trò chuyện đang được chọn trả về 404. **PR sửa đang mở: [#8375](https://github.com/agentscope-ai/QwenPaw/pull/8375)**
- **[#8374](https://github.com/agentscope-ai/QwenPaw/issues/8374)** — `QWENPAW_CORS_ORIGINS` đặt qua Web UI/CLI không có hiệu lực (hằng số bị đóng băng tại thời điểm import, việc inject env xảy ra sau import).
- **[#8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)** — Header nhóm sidebar chồng lên cuộc trò chuyện đầu tiên ở chế độ source-group.
- **[#8078](https://github.com/agentscope-ai/QwenPaw/issues/8078)** — Tin nhắn liên session được đăng ký như các chat độc lập → cùng một session bị tách ra nhiều trang UI.
- **[#8392](https://github.com/agentscope-ai/QwenPaw/issues/8392)** — Chế độ Hub: model cục bộ được cấu hình cho thành viên hiển thị không đúng.

**P3 — Vệ sinh dev / build:**
- **[#8377](https://github.com/agentscope-ai/QwenPaw/issues/8377)** — Lệnh `pytest` trần bị abort trong quá trình collection (`import file mismatch: test_backup`) trên bản checkout sạch; chặn cổng kiểm tra cục bộ trong CONTRIBUTING.md. *Đã có đề xuất sửa một file.*

**Đánh giá ổn định:** Khoảng **10 lỗi đang mở chưa có PR sửa**, tập trung ở các adapter kênh (Feishu, DingTalk, Telegram, QQ) và đường dẫn nâng cấp. Điều này cho thấy lớp trừu tượng kênh đang được kiểm thử chưa đủ so với phần lõi, và kiểm thử regression khi nâng cấp là một khoảng trống.

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

**Có khả năng cho v2.3.0 (dựa trên hướng đi đã cam kết):**
- **Đào sâu khả năng mở rộng plugin/theme** — lớp ghi đè token ngữ nghĩa cho plugin ([#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)); phù hợp trực tiếp với tái cấu trúc plugin đã công bố trong [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289).
- **Chia sẻ Skill/MCP toàn cục trong Hub** ([#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275)) — giá trị cao cho nhóm, ít trở ngại để phù hợp với việc tái cấu trúc module.

**Ứng viên tồn đọng (cần phân loại):**
- **Nút bật/tắt auto-scroll trên Desktop** ([#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339)) — mở từ 27/8 không có PR; một cải tiến UX đơn giản liên tục bị trì hoãn.
- **Cấu hình timeout AI gateway của Hub** ([#8372](https://github.com/agentscope-ai/QwenPaw/issues/8372)) — các tác vụ xử lý file thường vượt quá mặc định 120 giây.

**Tín hiệu:** Trọng tâm của cộng đồng đang chuyển từ "agent cục bộ đơn người dùng" sang **triển khai Hub đa người dùng** và **cấu hình chia sẻ theo nhóm** — có khả năng là chủ đề của v2.3.0+.

## 7. Tóm tắt phản hồi người dùng

- **Điểm đau mang tính vận hành và có thể tái hiện:** Người dùng báo cáo các lỗi cụ thể, giàu bằng chứng (nhiều báo cáo có số phiên bản, commit hash và tham chiếu code), cho thấy một nhóm người dùng kỹ thuật, có hiểu biết. Một số báo cáo ghi rõ tái hiện trên `main`.
- **Sự mong manh khi nâng cấp là bất mãn lớn nhất:** Ba báo cáo hỏng hóc sau nâng cấp riêng biệt (#8388 QQ, #8378 gọi model, cộng với #8392 hiển thị model Hub) cho thấy kiểm thử migration giữa các phiên bản patch chưa đủ.
- **Độ tin cậy của kênh không đồng nhất:** Feishu (event-loop treo), DingTalk (phản hồi bị bỏ), Telegram (bỏ qua trích dẫn) và WeChat (session kẹt) đều cho thấy khoảng trống so với trải nghiệm console vững chắc — người dùng rõ ràng đang chạy QwenPaw trên nhiều nền tảng nhắn tin.
- **Điểm tích cực:** Bài đăng lộ trình v2.3.0 minh bạch và việc xác minh phát hành đóng trong cùng ngày cho thấy sự phản hồi nhanh; lượt 👍 trên #8289 thể hiện sự đồng thuận với hướng plugin nhẹ hơn.
- **Ma sát trải nghiệm dev:** #8377 (lỗi collection pytest chặn contributor) là điểm ma sát mức độ thấp nhưng gây khó chịu cao cho contributor mới.

## 8. Theo dõi tồn đọng

Các mục cần maintainer chú ý (tồn tại lâu, chưa giải quyết, hoặc tác động cao nhưng chưa có bản sửa):

| Mục | Thời gian | Lý do quan trọng |
|---|---|---|
| [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) Cài đặt khóa scroll Desktop | ~2 tháng | Đơn giản, được yêu cầu nhiều lần; vẫn chưa có PR. |
|

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

ZeroClaw vẫn đang trong giai đoạn ổn định hóa với tốc độ cao trước thềm v0.8.7/v0.9.0. Hoạt động rất sôi nổi: **42 issue được cập nhật** (30 đang mở/hoạt động, 12 đã đóng) và **50 PR được cập nhật** (42 đang mở, 8 đã hợp nhất/đóng) trong 24 giờ qua, không có bản phát hành mới. Chủ đề chính là **tăng cường bảo mật và danh tính-quyền truy cập** — một cụm PR xếp chồng về phạm vi principal (#11225, #11230, #11220, #11234) từ một cộng tác viên xuất sắc đang hướng tới chất lượng cổng phát hành cho v0.9.0. Đồng thời, một loạt issue dọn dẹp v0.8.7 (xác thực OIDC, vòng đời plugin, độ tin cậy CI, race condition trong session-store) đang được đóng lại, cho thấy các maintainer đang củng cố mức độ sẵn sàng phát hành trong khi công việc kiến trúc lớn hơn vẫn tiếp tục.

---

## 2. Các bản phát hành

**Không có bản phát hành mới trong 24 giờ qua.** Artifact đã phát hành gần nhất được biết đến là **v0.8.6 archive** (được tham chiếu trong issue #10999 và PR #11841), với **v0.8.7** và **v0.9.0** hiện đang trong quá trình hoàn thiện qua nhiều issue và PR. Không có thay đổi phá vỡ tương thích hay ghi chú migration nào cần báo cáo hôm nay.

---

## 3. Tiến độ dự án

Tám PR đã được hợp nhất hoặc đóng hôm nay, tất cả đều hướng tới **ổn định phát hành v0.8.7**:

| PR | Tiêu đề | Tác động |
|---|---|---|
| [#11863](https://github.com/zeroclaw-labs/zeroclaw/pull/11863) | test(runtime): make the receipt-bound `late_tool_search` tests opt-in | Sửa CI không ổn định bằng cách gate 23 test phụ thuộc fixture (đóng #11806) |
| [#11848](https://github.com/zeroclaw-labs/zeroclaw/pull/11848) | fix(plugins): name the sender in `plugin_channel_sender_denied` records | UX cho operator — sender bị từ chối giờ đã nhận diện được (đóng #11821) |
| [#11841](https://github.com/zeroclaw-labs/zeroclaw/pull/11841) | docs(changelog): match v0.8.6 "In brief" OIDC wording | Nhất quán tài liệu |

Các issue được đóng hôm nay trải rộng trên **bảo mật, CI và độ tin cậy runtime**:
- [#11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357) — `plugin remove` xóa nhầm thư mục (bảo mật: xóa thư mục tùy ý).
- [#11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327) — Gate tên tool của plugin có thể chặn trước `tool_search`/MCP/các tool ngoại vi (S2, S0-nếu-plugin-không-đáng-tin).
- [#11898](https://github.com/zeroclaw-labs/zeroclaw/issues/11898) — Race condition khi daemon khởi động lần đầu thiếu session store RPC của nó.
- [#11902](https://github.com/zeroclaw-labs/zeroclaw/issues/11902) — Token OIDC hợp lệ bị từ chối trong quá trình fetch JWKS đồng thời.
- [#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558), [#11828](https://github.com/zeroclaw-labs/zeroclaw/issues/11828), [#11966](https://github.com/zeroclaw-labs/zeroclaw/issues/11966) — CI không ổn định và độ tin cậy pipeline phát hành.
- [#11926](https://github.com/zeroclaw-labs/zeroclaw/issues/11926), [#11928](https://github.com/zeroclaw-labs/zeroclaw/issues/11928) — Phạm vi audit và sửa race condition trong test.

**Đã tiến triển nhưng chưa hợp nhất:** Cụm danh tính-quyền truy cập (#11225 → #11230 → #11220 → #11234) vẫn đang mở và đang được review ghim, cho thấy việc landing có chủ đích theo từng giai đoạn thay vì hợp nhất vội vàng.

---

## 4. Chủ đề nóng trong cộng đồng

Xếp theo số lượng bình luận:

1. **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — [Tracker] Runtime, dashboard sign-in and gateway delivery** (15 bình luận, ĐANG MỞ)
   Tracker lộ trình tổng cho runtime + gateway, xuất phát từ RFC #5574 và được phân bổ cho **v0.9.0**. **Nhu cầu cốt lõi:** cộng đồng muốn một *góc nhìn duy nhất, có thẩm quyền* về việc cái gì sẽ ra mắt khi nào — tracker này thực chất là hợp đồng phát hành của dự án.

2. **[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) — RFC: Append-only session event history, deterministic state replay, derived agent streams** (13 bình luận, **ĐÃ ĐÓNG**)
   Đề xuất thay thế lưu trữ hội thoại có thể thay đổi bằng event log chỉ ghi thêm, cho phép **replay xác định**. **Nhu cầu cốt lõi:** khả năng tái lập, kiểm toán và debug hành vi agent — một yêu cầu kiến trúc nền tảng có khả năng sẽ tái xuất hiện dưới dạng các issue triển khai.

3. **[#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) — Publish and prove Discord plugin installation from a release binary** (9 bình luận, ĐANG MỞ, **bị chặn**)
   Gửi/nhận Discord thực tế giờ đã được xác minh trên v0.8.6 archive; công việc còn lại là chứng minh khả năng tái lập cài đặt từ binary đã phát hành. **Nhu cầu cốt lõi:** người dùng muốn plugin "chạy được ngay" từ các bản phát hành mà không cần build cục bộ.

4. **[#9506](https://github.com/zeroclaw-labs/zeroclaw/issues/9506) — Email channel cannot preserve CC or send true Reply All** (3 bình luận)

5. **[#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558), [#11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357), [#11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)** (mỗi cái 2 bình luận, tất cả ĐÃ ĐÓNG)

**Điểm mấu chốt:** các chủ đề được thảo luận nhiều nhất là **kiến trúc (event sourcing, lộ trình runtime/gateway)** và **độ tin cậy phân phối plugin** — không phải các bug ngẫu nhiên.

---

## 5. Bug & Độ ổn định

Xếp theo mức độ nghiêm trọng:

### S0 / Nghiêm trọng
- **[#11932](https://github.com/zeroclaw-labs/zeroclaw/issues/11932) — Container CA bundles still trust distrusted emSign chains** (risk:high, ĐANG MỞ)
  CA bundle *gốc* của container đã phát hành vẫn xác thực các đường dẫn qua các intermediate emSign bị công khai không tin cậy; chỉ cập nhật trình xác minh Rust là không đủ. **Đã có PR sửa:** [#11925](https://github.com/zeroclaw-labs/zeroclaw/pull/11925) (làm mới CA store của container runtime).

### S1 / Quy trình bị chặn
- **[#11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608) — Telegram listener can wedge forever on a blackholed request** (ĐANG MỞ)
  Không có timeout cho HTTP request nghĩa là `listener_health` phát hiện được sự cũ nhưng không có gì khôi phục kênh. **Đã có PR sửa:** [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) (flood gate chia sẻ theo token, tuân thủ 429 `retry_after`).
- **[#11959](https://github.com/zeroclaw-labs/zeroclaw/issues/11959) — Unix null-device regression test fails on case-insensitive filesystems** (ĐANG MỞ, báo cáo hôm nay)
  Fixture test tạo symlink `nul`; panic trên FS kiểu macOS/Windows. Chặn CI trên các nền tảng bị ảnh hưởng.

### S2 / Hành vi suy giảm
- **[#11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711) — Trimming a long conversation permanently deletes older turns** (ĐANG MỞ) — bug lưu trữ session liên quan đến mất dữ liệu.
- **[#11709](https://github.com/zeroclaw-labs/zeroclaw/issues/11709) — Upgraded sockets outlive a gateway reload** (ĐANG MỞ) — instance gateway đã nghỉ vẫn tiếp tục phục vụ.
- **[#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) — Gateway WebSocket upgrades fail over built-in TLS listener** (ĐANG MỞ, báo cáo hôm nay, v0.9.0) — phá vỡ chat dashboard; **PR sửa liên quan:** [#11901](https://github.com/zeroclaw-labs/zeroclaw/pull/11901) (drain connection sau khi dừng).
- **[#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) — Outbound email HTML carries raw markup and arbitrary image URLs** (ĐANG MỞ, báo cáo hôm nay) — rủi ro HTML injection / tracking-pixel.
- **[#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989) — Per-channel `excluded_tools` is never applied** (ĐANG MỞ, báo cáo hôm nay) — kiểm soát bảo mật được tài liệu hóa nhưng âm thầm không hoạt động.
- **[#9506](https://github.com/zeroclaw-labs/zeroclaw/issues/9506) — Email CC / Reply-All broken** (ĐANG MỞ).

### S3 / Nhỏ (ĐANG MỞ, báo cáo hôm nay)
- **[#11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987) — Inline `nosemgrep` comments don't suppress code-scanning alerts.**

**Đánh giá:** Các issue S0/S2 liên quan đến bảo mật chiếm ưu thế. Đáng khích lệ là **các PR sửa tồn tại song song với báo cáo** (ví dụ #11932/#11925, #11608/#11651), cho thấy pipeline báo cáo-đến-sửa lành mạnh. Tuy nhiên, ba trong số các issue S2 (#11989, #11991, #11711) chạm vào **các hợp đồng bảo mật/hành vi được tài liệu hóa nhưng âm thầm bị phá vỡ** — một pattern đáng theo dõi cho các khiếm khuyết hệ thống trong config-plumbing.

---

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

| Tính năng | Issue | Mục tiêu dự kiến |
|---|---|---|
| Runtime/dashboard sign-in & gateway delivery | [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | **v0.9.0** (được phân bổ rõ ràng) |
| Remote zerocode tự mint/lưu bearer của riêng nó qua mTLS | [#11679](https://github.com/zeroclaw-labs/zeroclaw/issues/11679) | v0.9.0 (cụm danh tính-quyền truy cập) |
| Email: trích dẫn nội dung gốc trong trả lời (cờ `quote_original`, mặc định tắt) | [#11938](https://github.com/zeroclaw-labs/zeroclaw/issues/11938) | Khả năng v0.9.x |
| Email: template cho operator + HTML body đã sanitise cho `send_via` | [#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992) | v0.9.x |
| Khôi phục background delegation sở hữu với kết quả theo phạm vi principal | [#11995](https://github.com/zeroclaw-labs/zeroclaw/issues/11995, nộp hôm nay) | v0.9.0 (phụ thuộc #11225) |
| Vòng đời turn process-message cho lồng ghép memory span | [#8844](https://github.com/zeroclaw-labs/zeroclaw/issues/8844) | Parking-lot → epic observability |

**Dự đoán:** v0.9.0 sẽ được dẫn dắt bởi **danh tính-quyền truy cập và thực thi phạm vi principal** (các PR xếp chồng của IftekharUddin), **ngữ nghĩa session chỉ ghi thêm** (sau #10526), và **độ tin cậy gateway/TLS** (#11951, #11901). Tính tiện dụng của kênh email (#11938, #11992) và hỗ trợ XMPP (PR [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)) là các ứng viên mạnh cho bản minor tiếp theo.

---

## 7. Tóm tắt phản hồi người dùng

**Điểm đau:**
- **Ma sát phân phối & vòng đời plugin** — người dùng không thể cài đặt plugin Discord một cách đáng tin cậy từ binary phát hành (#10999), và `plugin remove` trước đây đã xóa nhầm thư mục (#11357). Niềm tin vào các thao tác plugin là mối quan tâm lặp lại.
- **Kênh email là công dân hạng hai** — không có CC/Reply-All (#9506), không có trích dẫn (#11938), HTML gửi đi chưa được sanitise (#11991). Người dùng rõ ràng muốn kênh email khớp với hành vi của mail client thực thụ.
- **Lỗi cấu hình âm thầm** — `excluded_tools` bị bỏ qua (#11989) và nâng cấp WebSocket TLS thất bại (#11951) làm xói mòn niềm tin vào bề mặt cấu hình.
- **Độ tin cậy CI/phát hành** — các issue lặp lại về timeout (#10558), OOM trên build arm64 dist (#11828), và lỗi preflight (#11966) cho thấy ma sát cho cộng tác viên.

**Tín hiệu hài lòng:** Việc đóng nhanh các issue bảo mật (#11357, #11327) và quy trình review PR xếp chồng có kỷ luật cho thấy đội maintainer phản hồi nhanh. Việc xác minh Discord v0.8.6 (#10999) là một thắng lợi rõ ràng

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*