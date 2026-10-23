# Bản tin hệ sinh thái OpenClaw 2026-10-23

> Issues: 500 | PRs: 500 | Dự án theo dõi: 5 | Tạo lúc: 2026-10-23 04:29 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## Báo cáo chuyên sâu dự án OpenClaw

# OpenClaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

OpenClaw vẫn đang trong giai đoạn bảo trì với tốc độ cao nhưng gánh nặng lỗi lớn. Trong 24 giờ qua, **500 issue** và **500 PR** đã được cập nhật, với tỷ lệ mở/đóng gần như cân bằng (issue: 290 mở / 210 đóng; PR: 279 mở / 221 đã merge hoặc đóng). Hoạt động chủ yếu tập trung vào **phân loại hồi quy và ổn định khởi động/phục hồi** liên quan đến dòng 2026.9.x, cùng với một bản phát hành vá (v2026.10.6) do phụ thuộc bảo mật Node.js từ upstream. Dự án cho thấy thông lượng đóng góp mạnh mẽ (nhiều PR mới từ maintainer `steipete` và bot tự động `roboclaw-bot`), nhưng mật độ các lỗi **P0/P1 về crash-loop, mất tin nhắn và trạng thái phiên** — một số đã mở nhiều tuần — cho thấy nợ ổn định đang vượt xa tốc độ phát triển tính năng. Tình trạng chung: **hoạt động tích cực và phản hồi nhanh, nhưng căng thẳng về độ tin cậy**.

## 2. Phát hành

**v2026.10.6** (1 bản phát hành mới)

- **Yêu cầu runtime Node đã vá (thay đổi môi trường):** OpenClaw giờ yêu cầu **Node 24.22.1+** trên dòng 24, hoặc **26.12.1+** trên dòng 26. Các phiên bản này từ chối chuỗi TLS được ký bằng **khóa chứng chỉ bị xâm phạm** đã được xử lý trong bản phát hành bảo mật Node.js tháng 10/2026.
- **Ghi chú nâng cấp:** Các operator đang dùng Node 24.x/26.x cũ hơn phải nâng cấp runtime trước hoặc cùng lúc với bản phát hành này, nếu không kết nối TLS có thể thất bại. Docker image đã bao gồm Node 24.2x (bị cắt trong ghi chú phát hành).
- **Hành động cần làm:** Môi trường self-hosted và CI đang ghim phiên bản Node minor cũ nên kiểm tra phiên bản runtime để tránh bị từ chối TLS âm thầm.

## 3. Tiến độ dự án

221 PR đã được merge/đóng trong 24 giờ qua. Các chủ đề nổi bật trong công việc đã đóng/chuyển tiếp:

- **Hiện đại hóa UI/hiệu năng (chuyển sang Solid):** Một nhóm lớn PR từ maintainer `steipete` và `roboclaw-bot` thúc đẩy tái cấu trúc Control UI — xác nhận chuyển đổi gateway tải chậm ([#181302](https://github.com/openclaw/openclaw/pull/181302)), trì hoãn nội dung nền ([#181306](https://github.com/openclaw/openclaw/pull/181306)), và **giảm dung lượng truyền khởi động bằng gzip** ([#181233](https://github.com/openclaw/openclaw/pull/181233): khởi động -12.527 B, Chat -52.342 B, New Session -32.092 B).
- **Sửa khởi động Gateway:** [#181289](https://github.com/openclaw/openclaw/pull/181289) (`steipete`) cho phép tải plugin tiếp tục trước khi đánh dấu orphan hoàn tất trên kho phiên lớn — nhắm trực tiếp vào nhóm phàn nàn về khởi động chậm.
- **Sửa phục hồi/readiness:** [#181274](https://github.com/openclaw/openclaw/pull/181274) (đã đóng) sửa lỗi recovery fixture treo Gateway readiness sau khi phát lại chat input đã lưu.
- **Tăng cường xử lý secret:** [#167250](https://github.com/openclaw/openclaw/pull/167250) ngăn UTF-8 sai định dạng ghi đè secret đã lưu (nhạy cảm bảo mật, đang chờ maintainer).

Các bug đã đóng bao gồm nhiều mục tồn đọng lâu dài: Discord mention-gating ([#44502](https://github.com/openclaw/openclaw/issues/44502)), bỏ qua phát hiện bộ nhớ trên macOS ([#47273](https://github.com/openclaw/openclaw/issues/47273)), và mất claim Tailscale Serve ([#148308](https://github.com/openclaw/openclaw/issues/148308)).

## 4. Chủ đề nóng cộng đồng

Xếp theo số lượng bình luận:

1. **[#160959](https://github.com/openclaw/openclaw/issues/160959) — P0, 42 bình luận:** Gateway bị chặn *nhiều phút* khi thu thập plugin ngoài lớn (hồi quy 2026.9.6). Thread nóng nhất; xếp hạng `🦞 diamond lobster`. **Nhu cầu:** nhường event-loop trong quá trình thu thập plugin generation.
2. **[#42475](https://github.com/openclaw/openclaw/issues/42475) — P2, 27 bình luận:** Thực thi ngân sách chi phí theo từng agent tại gateway. Tồn tại lâu (từ tháng 3), vẫn cần quyết định sản phẩm. **Nhu cầu:** rào chắn chi phí cho operator mà không cần giám sát bên ngoài.
3. **[#11829](https://github.com/openclaw/openclaw/issues/11829) — ĐÃ ĐÓNG, 21 bình luận:** Lộ trình bảo mật bảo vệ API key khỏi truy cập của agent. **Nhu cầu:** cô lập secret theo lớp khỏi context của LLM.
4. **[#157531](https://github.com/openclaw/openclaw/issues/157531) — 17 bình luận:** Fixes Tracker 2026.9.7, điều phối 18/21 ứng viên P1 đã xác định. **Tín hiệu:** maintainer đang gom nhóm việc tăng cường độ ổn định cho bản phát hành.
5. **[#140010](https://github.com/openclaw/openclaw/issues/140010) — P1, 14 bình luận:** Lỗi reconnect WebSocket khi Windows sleep/resume (30–60 giây+). **Nhu cầu:** ưu tiên phục hồi sau thaw trước gateway đang bận.

Mẫu chung: năng lượng cộng đồng tập trung vào **khởi động/event-loop bị treo, quản trị chi phí và bảo vệ secret**, không phải tính năng mới.

## 5. Bug & Ổn định

Các mục mở được cập nhật hôm nay, xếp theo mức độ nghiêm trọng (không có PR sửa riêng được liên kết trừ khi có ghi chú):

**P0 — Nhóm crash/mất dữ liệu:**
- [#160959](https://github.com/openclaw/openclaw/issues/160959): Gateway chặn nhiều phút khi thu thập plugin lớn — *hồi quy khởi động*.
- [#156712](https://github.com/openclaw/openclaw/issues/156712): Tiến trình con sửa chữa `openclaw triage` không thoát, giữ khóa gateway-lifecycle, chặn khởi động lại.
- [#156674](https://github.com/openclaw/openclaw/issues/156674): Áp lực tài nguyên gateway trên macOS với Codex worker chạy lâu dài.
- [#158592](https://github.com/openclaw/openclaw/issues/158592): Sau sleep/wake, việc công bố model runtime bị timeout vĩnh viễn — mọi tin nhắn đến đều thất bại cho đến khi khởi động lại.
- [#166634](https://github.com/openclaw/openclaw/issues/166634): Lỗi checkpoint thu hồi muộn khiến agent không khả dụng sau phục hồi crash.
- [#141615](https://github.com/openclaw/openclaw/issues/141615): WebChat "Authenticated profile verification unavailable" làm kẹt toàn bộ RPC.
- [#166004](https://github.com/openclaw/openclaw/issues/166004): Gateway chạy scheduled-task trên Windows không khởi động; cập nhật 2026.9.8 bị rollback.
- [#141413](https://github.com/openclaw/openclaw/issues/141413): Ứng dụng macOS bỏ qua token cho Gateway cục bộ dùng SecretRef.

**P1:**
- [#172837](https://github.com/openclaw/openclaw/issues/172837): Codex `nativeSubagentAssignments` không bao giờ được gỡ — ghim lại/gửi lại theo từng parent thread (mất tin nhắn).
- [#167557](https://github.com/openclaw/openclaw/issues/167557): Di chuyển dữ liệu/cài đặt plugin không bao giờ hội tụ (Linux/npm).
- [#180690](https://github.com/openclaw/openclaw/issues/180690): `doctor --fix` OOM heap ở 6 GB trên trạng thái ~810 agent; ~110 phút qua 3 lượt.
- [#138042](https://github.com/openclaw/openclaw/issues/138042): Yêu cầu điều khiển Gateway bị treo 157–276 giây.
- [#160485](https://github.com/openclaw/openclaw/issues/160485): Tải plugin trên Windows bị nghẽn CPU; 3 plugin channel = 57,4 giây trong pha 60 giây.
- [#145690](https://github.com/openclaw/openclaw/issues/145690), [#154716](https://github.com/openclaw/openclaw/issues/154716), [#159787](https://github.com/openclaw/openclaw/issues/159787), [#155359](https://github.com/openclaw/openclaw/issues/155359).

**Chủ đề:** Một nhóm **sleep/wake + event-loop bị treo + trạng thái phiên** lặp lại (Windows và macOS) là rủi ro ổn định chính. Chỉ #181289/#181274 có PR sửa liên quan hôm nay; hầu hết P0 không có PR sửa được liên kết.

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

- **[#42475](https://github.com/openclaw/openclaw/issues/42475) Ngân sách chi phí theo từng agent** — tương tác cao, cần quyết định sản phẩm; ứng viên khả thi cho bản phát hành sắp tới do nhu cầu kiểm soát chi phí.
- **[#53763](https://github.com/openclaw/openclaw/issues/53763) Trình duyệt headless tích hợp** (nay ĐÃ ĐÓNG, 18 bình luận) — giảm mong manh cho truy cập web.
- **[#15032](https://github.com/openclaw/openclaw/issues/15032) Hạn chế công cụ theo từng spawn cho sub-agent** (ĐÃ ĐÓNG) — phòng chống prompt-injection; gắn chặt với bảo mật.
- **[#138279](https://github.com/openclaw/openclaw/issues/138279) Bản build companion Linux aarch64** (deb + AppImage).
- **[#144306](https://github.com/openclaw/openclaw/issues/144306) Gửi tự động đến node đã ghép nối** (thông báo).
- **[#71330](https://github.com/openclaw/openclaw/issues/71330) Mục tiêu thăng cấp bộ nhớ có thể cấu hình** (ĐÃ ĐÓNG) và **[#87660](https://github.com/openclaw/openclaw/issues/87660) Quản lý MEMORY.md nhận biết vòng đời** — hệ thống bộ nhớ là khu vực lộ trình đang phát triển.

**Dự đoán:** ngân sách chi phí (#42475) và sandbox công cụ sub-agent (#15032) có khả năng cao nhất được đưa vào bản minor tiếp theo, nhờ khung bảo mật/chi phí và sự chú ý của maintainer.

## 7. Tổng hợp phản hồi người dùng

- **Điểm đau:** Khởi động và phục hồi sau wake là nỗi thất vọng hàng đầu — [#160959](https://github.com/openclaw/openclaw/issues/160959), [#140010](https://github.com/openclaw/openclaw/issues/140010), [#158592](https://github.com/openclaw/openclaw/issues/158592), [#157812](https://github.com/openclaw/openclaw/issues/157812) đều mô tả tình trạng không thể truy cập từ vài giây đến vài phút sau sleep hoặc cập nhật. Operator Windows bị ảnh hưởng không tương xứng (cập nhật, scheduled task, tải plugin).
- **Ma sát UX:** Bàn phím di động che khuất ([#137508](https://github.com/openclaw/openclaw/issues/137508)), WebChat nhân đôi văn bản assistant ([#140723](https://github.com/openclaw/openclaw/issues/140723)), widget context-window cũ ([#165421](https://github.com/openclaw/openclaw/issues/165421)).
- **Nhạy cảm bảo mật:** Runtime-context carrier nội bộ rò rỉ thành lượt hiển thị qua Teams ([#136360](https://github.com/openclaw/openclaw/issues/136360)), Slack/Telegram/Feishu/Discord — mối lo hệ thống xuyên kênh.
- **Tín hiệu không hài lòng:** [#151112](https://github.com/openclaw/openclaw/issues/151112) — operator self-hosted cảm thấy bị vướng vào vòng lặp secret/phê duyệt, giảm tính tự chủ.
- **Tín hiệu hài lòng:** Các mục được thumbs cao (ví dụ: bug sandbox #43996 với 👍:2, quản lý bộ nhớ #87660 với 👍:2) cho thấy người dùng đang tích cực xác nhận các bản sửa.

## 8. Theo dõi tồn đọng

Các mục lâu không được trả lời hoặc bị maintainer chặn cần chú ý:

- **[#42475](https://github.com/openclaw/openclaw/issues/42475)** (từ 2026-03-10): Ngân sách chi phí theo từng agent — hơn 7 tháng, cần quyết định sản phẩm.
- **[#138042](https://github.com/openclaw/openclaw/issues/138042)** (từ 2026-09-04): Yêu cầu điều khiển Gateway treo 157–276 giây — không có PR sửa, P1.
- **[#138279](https://github.com/openclaw/openclaw/issues/138279)** (từ 2026-09-04): Bản build Linux aarch64 — đình trệ ở quyết định sản phẩm.
- **[#126836](https://github.com/openclaw/openclaw/issues/126836)** (từ 2026-08-20): `sessions.reset` trả về ok nhưng không tạo cửa sổ — phiên bị nuốt âm thầm.
- **[#167250](https://github.com/openclaw/openclaw/pull/167250)** (từ 2026-10-08): PR tăng cường chống ghi đè secret — đang chờ đánh giá bảo mật.
- **[#180690](https://github.com/openclaw/openclaw/issues/180690)** (mới, P1): `doctor --fix` OOM trên trạng thái lớn — tác động vận hành cao cho người dùng nâng cao, chưa có PR liên kết.

**Khuyến nghị cho maintain

---

## So sánh chéo hệ sinh thái

# Báo cáo So sánh Liên dự án
## Hệ sinh thái mã nguồn mở Trợ lý AI Cá nhân / Agent
**Ngày phân tích: 2026-10-23** | Nguồn: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Tổng quan Hệ sinh thái

Bối cảnh mã nguồn mở về trợ lý AI cá nhân / agent vào cuối năm 2026 đang **tăng tốc mạnh, siết chặt bảo mật, và chuyển dịch từ trợ lý đơn-agent sang nền tảng agent phân tán, đa chủ sở hữu**. Trên cả năm dự án, lượng issue và PR tiếp nhận vượt xa tốc độ merge, cho thấy một thị trường nơi tham vọng của người dùng (liên bang hóa, thực thi từ xa, quản trị bộ nhớ) đang vượt trước năng lực của đội ngũ maintainer. Một lộ trình trưởng thành chung đang hiện rõ: mọi dự án trừ IronClaw đang ngủ đông đều đang trong **giai đoạn củng cố ổn định/bảo mật tích cực** — vá lỗi phục hồi sleep/wake, cô lập thông tin xác thực, lỗ hổng mô hình phê duyệt, và toàn vẹn chuỗi cung ứng thay vì tung ra tính năng mới. Thảo luận cộng đồng đang hội tụ về **tin cậy, kiểm soát, và khả năng tương tác** — thực thi đặc quyền tối thiểu, quản trị bộ nhớ/chi phí, và cộng tác liên gateway — thay vì chỉ tập trung vào năng lực thô. Trong khi đó, nợ độ tin cậy đặc thù theo nền tảng (đặc biệt là Windows) và các kiểm soát bảo mật được ghi nhận nhưng không được thực thi là những tín hiệu bất mãn lặp lại nhiều nhất trong hệ sinh thái.

---

## 2. So sánh Mức độ Hoạt động

| Dự án | Issue cập nhật (24h) | PR cập nhật (24h) | Thông lượng Merge/Close | Trạng thái Release | Điểm Sức khỏe |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (290 mở / 210 đóng) | 500 (279 mở / 221 merged/closed) | **Cao** (~221/ngày) | v2026.10.6 (bản vá bảo mật Node TLS) | 🟡 Hoạt động nhưng **căng thẳng về độ tin cậy** |
| **Hermes Agent** | 50 (49 mở / 1 đóng) | 50 (41 mở / 9 đóng) | **Thấp** (9/50, chủ yếu là backlog cũ) | Không có | 🟠 Hoạt động rất cao, **backlog đang tăng** |
| **IronClaw** | 2 (1 mở / 1 đóng) | 6 (5 mở / 1 đóng) | **Tối thiểu** (chỉ Dependabot) | Không có | 🟢 Yên ắng / **chế độ bảo trì** |
| **QwenPaw** | 22 (20 mở / 2 đóng) | 50 (48 mở / 2 merged) | **Thấp** (2/50, đóng băng cắt release) | **v2.2.2.post1 (bản vá bảo mật)** | 🟢 Phản hồi mạnh, **nút thắt review** |
| **ZeroClaw** | 35 | 50 (42 mở / 8 đóng) | **Không merge** | Không có (đóng băng trước v0.9.0) | 🟡 Ổn định có kỷ luật, **bị chặn bởi hàng đợi merge** |

**Chú thích:** Điểm Sức khỏe cân nhắc mức hoạt động, thông lượng, ổn định, tư thế bảo mật, và rủi ro backlog.
**Quan sát chính:** Chỉ OpenClaw cho thấy thông lượng merge cao; ZeroClaw và QwenPaw gần như đóng băng (cổng release / backlog review); Hermes có lượng tiếp nhận ≫ tốc độ xử lý; IronClaw không hoạt động.

---

## 3. Vị thế của OpenClaw

### Lợi thế so với các dự án cùng nhóm
- **Quy mô & khả năng phản hồi:** Với ~500 issue + ~500 PR được chạm trong 24h và ~221 PR được merge, OpenClaw vận hành với thông lượng lớn hơn một bậc so với bất kỳ dự án nào khác. Đây là **triển khai tham chiếu** thực tế của hệ sinh thái.
- **Độ trưởng thành hạ tầng:** Là dự án duy nhất có nhịp độ release tích cực (v2026.10.6), Docker image, các companion đa nền tảng, và tự động hóa phân loại chính thức (`roboclaw-bot`).
- **Bề mặt kênh và nền tảng rộng nhất:** Bao phủ Discord, Slack, Telegram, Feishu, Teams, WebChat, cùng các companion Windows/macOS/Linux.

### Khác biệt về Tiếp cận Kỹ thuật
- **Kiến trúc lấy gateway làm trung tâm:** Một tiến trình gateway tồn tại lâu dài duy nhất làm trung gian cho session, plugin, và kênh — mạnh mẽ nhưng là **nguyên nhân gốc rễ của nhóm lỗi chiếm ưu thế** (event-loop đình trệ, plugin capture chặn trong nhiều phút, lỗi tái kết nối sleep/wake). Các dự án như ZeroClaw đang chủ động *rời xa* gateway bắt buộc (bản build chỉ CLI, PR #11975).
- **Mô hình plugin khá nặng:** Plugin ngoài lớn là chủ đề P0 nóng (#160959), trong khi QwenPaw đang tái cấu trúc kênh thành plugin cô lập qua tiến trình con (PR #8187) và ZeroClaw coi plugin như các artifact release có thể cài đặt.

### So sánh Quy mô Cộng đồng
| Khía cạnh | OpenClaw | Các dự án cùng nhóm |
|---|---|---|
| Biến động issue/PR hàng ngày | ~1000 sự kiện | 8–100 sự kiện |
| Tương tác luồng hàng đầu | 42 bình luận (P0) | 40 (Hermes), 15 (ZeroClaw), 7 (QwenPaw), 0 (IronClaw) |
| Tín hiệu reaction | Trung bình | Hermes dẫn đầu (42 👍 trên #18715) |
| Độ rộng người đóng góp | Maintainer + tự động hóa chiếm ưu thế | Hermes/QwenPaw có nhiều người đóng góp lần đầu hơn |

**Kết luận:** OpenClaw là **trọng tâm và tiêu chuẩn thực tế** của hệ sinh thái, nhưng nợ ổn định (nhiều lỗi P0 crash-loop/session-state mở hàng tuần mà không có PR sửa) là rủi ro đơn lẻ lớn nhất của hệ sinh thái. Bề rộng là hào bảo vệ; độ tin cậy là điểm phơi bày.

---

## 4. Các Lĩnh vực Kỹ thuật Chia sẻ

Các yêu cầu sau xuất hiện **độc lập trên nhiều dự án**, cho thấy nhu cầu thực sự trên toàn hệ sinh thái:

| Nhu cầu Xuyên suốt | Dự án | Bằng chứng cụ thể |
|---|---|---|
| **Cộng tác đa-agent / liên gateway** | OpenClaw, Hermes, ZeroClaw | Hermes #97681 (bot liên bang) + #18715 (agent từ xa/công cụ cục bộ, 42 👍); OpenClaw sandbox công cụ sub-agent #15032; ZeroClaw allowlist ủy quyền #8279 |
| **Đặc quyền tối thiểu & hạn chế công cụ được thực thi** | OpenClaw, Hermes, ZeroClaw | OpenClaw #15032; Hermes mở rộng cổng phê duyệt #142834; ZeroClaw #8279 (vượt qua allowlist), #11989 (`excluded_tools` bị bỏ qua) |
| **Trưởng thành mô hình phê duyệt ngoài shell/code** | Hermes, OpenClaw, ZeroClaw | Hermes #141346 (mất dữ liệu `osascript`), #142834; OpenClaw ma sát secret/phê duyệt #151112; ZeroClaw leo thang thẩm quyền SOP |
| **Quản trị bộ nhớ (ngân sách + chấp nhận tại thời điểm ghi)** | OpenClaw, Hermes, QwenPaw | OpenClaw MEMORY.md nhận biết vòng đời #87660; Hermes ngân sách/chấp nhận #135039; QwenPaw ngữ cảnh bộ nhớ PR #8376 |
| **Rào chắn chi phí / ngân sách theo agent** | OpenClaw, Hermes, QwenPaw | OpenClaw #42475 (mở hơn 7 tháng); Hermes #135039 (chi phí tiêm theo lượt); QwenPaw phát lại media mất kiểm soát #8335 |
| **Cô lập thông tin xác thực / secret** | OpenClaw, ZeroClaw, Hermes | OpenClaw #11829 (API key từ ngữ cảnh agent); ZeroClaw mã hóa thông tin xác thực OIDC #11957; Hermes ghim SHA256 chuỗi cung ứng |
| **Tính đúng đắn vòng đời session (resume / cold-load / cancel)** | OpenClaw, Hermes, ZeroClaw | OpenClaw #126836 (mất session âm thầm); Hermes #139796 (cold resume not_found), #136713; ZeroClaw session store #11898 |
| **Khả năng di động nền tảng (Windows, ARM64)** | OpenClaw, Hermes, IronClaw, QwenPaw | Windows chiếm ưu thế trong bug của OpenClaw/Hermes; IronClaw ARM64 #3168; QwenPaw Windows CRLF/GBK PR #8234/#8235 |
| **Toàn vẹn chuỗi cung ứng / artifact release** | OpenClaw, Hermes, ZeroClaw, QwenPaw | Bản vá Node TLS của OpenClaw; checksum Electron/TTS của Hermes; bằng chứng binary release Discord của ZeroClaw #10999; sửa lỗi emSign CA của QwenPaw |

**Tín hiệu:** Hệ sinh thái đang cùng nhau khám phá rằng **quyền tự chủ phải đi kèm với chính sách có thể thực thi, và chính sách phải có thể kiểm chứng trong các artifact đã phát hành**. Đây là làn sóng yêu cầu định hình của giai đoạn 2026-10.

---

## 5. Phân tích Khác biệt hóa

| Khía cạnh | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Trọng tâm chính** | Nền tảng gateway đa kênh rộng | Agent cá nhân phân tán, cộng tác | Agent Rust/WASM được benchmark | Trợ lý định hướng nhóm/Hub, dễ mở rộng | Agent siết chặt bảo mật, đặc quyền tối thiểu |
| **Người dùng mục tiêu** | Vận hành viên tự host chuyên sâu, doanh nghiệp | Người đam mê đa chủ, đa máy | Người đánh giá benchmark/ML | Nhóm, người xây plugin | Vận hành viên quan tâm bảo mật, đội fleet |
| **Kiến trúc** | Trung tâm gateway, plugin nặng | Gateway + profile, tách remote/local | Nhẹ, định hướng benchmark | Hub + kênh như plugin (cô lập tiến trình con) | Gateway tùy chọn (chỉ CLI), ngôn ngữ chính sách |
| **Tính năng đặc trưng** | Bề rộng kênh, Control UI (Solid) | Liên bang liên gateway, công cụ từ xa | Telemetry phân loại lỗi hàng ngày | Khả năng mở rộng plugin/theme v2.3.0 | Chính sách vai trò người gửi, mô hình thẩm quyền SOP |
| **Điểm mạnh riêng** | Thông lượng, quy mô, vị thế tham chiếu | Đồng thuận tầm nhìn cộng đồng | Vệ sinh phụ thuộc có kỷ luật | Phản hồi bảo mật nhanh, lộ trình rõ ràng | Chặt chẽ về vấn đề bảo mật, phân loại có cấu trúc |
| **Điểm phơi bày riêng** | Nợ độ tin cậy, backlog P0 | Backlog tăng, lỗ hổng Windows | Ngủ đông, đóng ARM64 âm thầm | Nút thắt review (48 PR mở) | Chặn bởi hàng đợi merge (0 merge/ngày) |
| **Tư thế release** | Vá thường xuyên | Gần đây không có | Không có | Nhịp vá bảo mật | Đóng băng trước v0.9.0 |

**Diễn giải:**
- **OpenClaw** và **Hermes** cạnh tranh về **bề rộng và tham vọng** — các nền tảng đa dụng.
- **ZeroClaw** là **chuyên gia bảo mật** — coi đặc quyền tối thiểu và release có thể chứng minh là ưu tiên hàng đầu, và chất lượng issue (vượt allowlist, leo thang SOP) phản ánh một cộng đồng am hiểu bảo mật.
- **QwenPaw** là **nước đi mở rộng** — vận hành nhóm dựa trên Hub cộng với tái cấu trúc hệ sinh thái plugin hướng tới v2.3.0.
- **IronClaw** là **trường hợp ngoại lệ đánh giá/nghiên cứu** — tập trung hiệu năng Rust/WASM, hiện đang nhàn rỗi.
- **Hermes** là **nhà tầm nhìn liên bang** — cộng tác liên gateway và tách tính toán/thực thi là những đặt cược đặc trưng.

---

## 6. Đà phát triển & Độ trưởng thành Cộng đồng

### Phân tầng Hoạt động

**Tầng 1 — Bên lặp nhanh (nhanh nhưng căng thẳng)**
- **OpenClaw** — Tốc độ tuyệt đối cao nhất; bị giới hạn bởi ổn định.
- **Hermes Agent** — Tiếp nhận rất cao, thông lượng merge thấp; tham vọng về kiến trúc; rủi ro backlog.

**Tầng 2 — Ổn định / Cổng Release (nhịp kiểm soát)**
- **ZeroClaw** — Đóng băng có chủ đích trước v0.9.0; công việc bug/bảo mật có kỷ luật; hàng đợi merge là nút thắt.
- **QwenPaw** — Chu kỳ release định hướng bảo mật; phản hồi nhanh nhưng bị hạn chế bởi review; lộ trình mở rộng v2.3.0

---

## Báo cáo chi tiết các dự án cùng phân khúc

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Tổng hợp dự án
**Ngày: 2026-10-23** | Nguồn: github.com/nousresearch/hermes-agent

---

## 1. Tổng quan hôm nay

Hermes Agent cho thấy **mức độ hoạt động rất cao và liên tục** trong ngày 2026-10-23: 50 issue và 50 PR được cập nhật trong 24 giờ qua, chỉ có 1 issue được đóng và không có bản phát hành mới. Tỷ lệ open/active bị lệch mạnh (49/50 issue, 41/50 PR đang mở), cho thấy một **backlog đang phình to** khi lượng tiếp nhận vượt xa tốc độ xử lý — đặc trưng của một nền tảng agent đang phát triển nhanh nhưng cũng là rủi ro tiềm ẩn về băng thông của maintainer. Tín hiệu trong ngày bị chi phối bởi **hai cụm vấn đề**: (a) các lỗi về tính đúng đắn của gateway/đa hồ sơ/trạng thái phiên (gửi nhầm tin nhắn, khôi phục phiên thất bại, rò rỉ hồ sơ), và (b) **các lo ngại về bảo mật và cổng phê duyệt**, bao gồm một sự cố mất dữ liệu nghiêm trọng qua tự động phê duyệt `osascript` và các PR tăng cường chuỗi cung ứng. Tương tác cộng đồng cao nhất tập trung vào các tính năng cộng tác nền tảng & thực thi từ xa (#97681, #18715), cho thấy cộng đồng đang thúc đẩy Hermes hướng tới vận hành **đa agent, đa chủ sở hữu, phân tán**.

**Đánh giá hoạt động: CAO** (mức biến động issue/PR cao hơn hẳn chuẩn OSS thông thường), nhưng **thông lượng merge thấp** (9 trong 50 PR được đóng/merge), và phần lớn PR được đóng hôm nay là các nhánh cũ, tồn tại lâu — dấu hiệu của việc dọn backlog hơn là tốc độ phát triển mới.

---

## 2. Bản phát hành

**Không có.** Không có bản phát hành mới trong 24 giờ qua.

⚠️ Vấn đề vệ sinh liên quan: [`hermes update` để lại release tag cũ](#143361) — người dùng trên bản checkout đã ở commit phát hành vẫn thấy output `hermes --version` lỗi thời (ví dụ `0.22.2+3030.g4d04303`). Không phải bản phát hành, nhưng nó làm sai lệch việc báo cáo phiên bản.

---

## 3. Tiến độ dự án

### PR được merge/đóng hôm nay (tổng cộng 9)

| PR | Trạng thái | Lĩnh vực | Tác động |
|---|---|---|---|
| [#47532](https://github.com/NousResearch/hermes-agent/pull/47532) | CLOSED | `type/security`, xác thực dashboard | **Loại bỏ session token dashboard cũ** — cổng OAuth pluggable trở thành cổng định danh duy nhất; bind loopback giờ chạy không có cổng định danh |
| [#51590](https://github.com/NousResearch/hermes-agent/pull/51590) | CLOSED | telemetry gateway | Telemetry khởi động bị chặn có cấu trúc + khả năng hiển thị crash-loop trên `/api/status` |
| [#52423](https://github.com/NousResearch/hermes-agent/pull/52423) | CLOSED | Discord gateway | Xóa tin nhắn seed auto-thread mồ côi khi fallback thất bại (sửa #52422) |
| [#70608](https://github.com/NousResearch/hermes-agent/pull/70608) | CLOSED | webhooks/Discord | Tạo một thread Discord cho mỗi sự kiện webhook; phản hồi đầu tiên trở thành thread starter |
| [#96100](https://github.com/NousResearch/hermes-agent/pull/96100) | CLOSED | backend STT | Managed tool gateway trở thành **backend STT mặc định** (tránh tải Whisper về máy/đốt CPU trên Cloud) |
| [#105589](https://github.com/NousResearch/hermes-agent/pull/105589) | CLOSED | TUI | Tiêu đề tab/cửa sổ terminal giờ có thể cấu hình |
| [#118554](https://github.com/NousResearch/hermes-agent/pull/118554) | CLOSED | telemetry | Opt-in shared-metrics xuyên suốt onboarding Desktop, Settings, CLI, các instance tự động |
| [#122097](https://github.com/NousResearch/hermes-agent/pull/122097) | CLOSED | UX cài đặt TTS | Báo cáo lý do cài đặt lần đầu của pm thay vì gợi ý chung chung |

**Hiệu ứng lô đáng chú ý:** bảy trong chín PR được đóng đều do cùng một contributor (`benbarclay`) tạo và là các **nhánh tồn tại lâu (tháng 6–9)** nay mới được merge — điều này cho thấy đây là một đợt dọn backlog có chủ đích, không phải tốc độ phát triển mới.

### Tính năng đang tiến triển (vẫn mở)
- **Tính đúng đắn quyền sở hữu gateway**: [#106221](https://github.com/NousResearch/hermes-agent/pull/106221) giữ các thay đổi Settings/session trên gateway sở hữu trong cấu hình Desktop hai gateway.
- **Khả năng phục hồi của mô hình cục bộ**: [#140109](https://github.com/NousResearch/hermes-agent/pull/140109) tiếp tục tải xuống bị gián đoạn / hủy bỏ các phần tải dở.
- **Chuỗi cung ứng**: [#82891](https://github.com/NousResearch/hermes-agent/pull/82891) (pin SHA256 của kittentts) và [#82889](https://github.com/NousResearch/hermes-agent/pull/82889) (xác minh checksum của Electron mirror).

---

## 4. Chủ đề nóng trong cộng đồng

Xếp theo số bình luận / reaction:

1. **[#97681 — Cho phép Bot cộng tác xuyên gateway](https://github.com/NousResearch/hermes-agent/issues/97681)** — *40 bình luận, 4 👍* | `type/feature`, gateway, sessions
   Mục được thảo luận nhiều nhất. Personal Bot (mô hình, công cụ, bộ nhớ, thông tin xác thực riêng) làm việc cùng nhau **xuyên máy và xuyên chủ sở hữu mà không mất quyền kiểm soát**. Đây là một luồng kiến trúc nền tảng — cộng đồng đang tranh luận về ranh giới tin cậy, định danh và nhắn tin liên gateway. Nhu cầu cốt lõi: **cộng tác agent cá nhân dạng liên bang.**

2. **[#141346 — Smart approval tự động phê duyệt osascript, gây mất dữ liệu không thể phục hồi](https://github.com/NousResearch/hermes-agent/issues/141346)** — *35 bình luận* | `type/security`, tools, macOS
   Agent điều khiển PowerPoint đang mở của người dùng qua `osascript` để render slide thành PNG; các lệnh vượt qua phê duyệt `smart`, đóng một deck chưa lưu và xóa bản export của nó. Nhu cầu cốt lõi: **một mô hình phê duyệt có nguyên tắc, hiểu được tự động hóa hệ thống mang tính hủy hoại**, không chỉ dừng ở thực thi shell/code.

3. **[#18715 — Hỗ trợ Hermes agent từ xa với thực thi công cụ cục bộ](https://github.com/NousResearch/hermes-agent/issues/18715)** — *29 bình luận, **42 👍 (reaction cao nhất trong tập dữ liệu)*** | `type/feature`, agent/gateway/tools
   Nhu cầu cộng đồng mạnh mẽ: agent từ xa (skills/memory/sessions/models trên Máy B) với **thực thi công cụ giữ cục bộ trên Máy A**. Nhu cầu cốt lõi: tách compute/execution vì bảo mật, độ trễ và tính cục bộ tài nguyên.

4. **[#135039 — Thực thi ngân sách + pipeline chấp nhận cho MEMORY.md / USER.md](https://github.com/NousResearch/hermes-agent/issues/135039)** — *15 bình luận* | `type/feature`, memory, compression
   Bộ nhớ được inject mỗi lượt có tác động về chi phí/độ trễ; không có ngân sách lúc ghi hay acceptance test. Nhu cầu: **quản trị chi phí và kiểm soát chất lượng bộ nhớ.**

5. **[#83047 — Guard respawn `blocker_auth` của kanban giữ một task sẵn sàng mãi mãi](https://github.com/NousResearch/hermes-agent/issues/83047)** — *9 bình luận* | `type/bug`, cron, plugins
   Lỗi dispatch dạng auth bị chặn vĩnh viễn (không có drain), khác với sentinel rate-limit hữu hạn. Nhu cầu: **ngữ nghĩa thất bại/phục hồi thống nhất.**

**Mẫu hình:** các luồng hàng đầu xoay quanh **tin cậy, kiểm soát và khả năng tương tác** — người dùng muốn Hermes có thể kết hợp và phân tán mà không phải nhượng quyền sở hữu, và họ muốn mô hình an toàn trưởng thành song hành cùng tính tự chủ.

---

## 5. Lỗi & Độ ổn định

Xếp theo mức độ nghiêm trọng (P2/P3 + tác động):

### 🔴 Nghiêm trọng / Mất dữ liệu
- **[#141346](https://github.com/NousResearch/hermes-agent/issues/141346)** — `type/security` + mất dữ liệu. Smart approval cho phép `osascript` đóng PowerPoint chưa lưu và xóa bản export. **Dữ liệu người dùng không thể phục hồi.** Không thấy PR sửa. *Mục ổn định ưu tiên cao nhất.*
- **[#136713](https://github.com/NousResearch/hermes-agent/issues/136713)** — Re-attach chat trên Dashboard (PTY/WS churn) **ngắt cứng lượt đang xử lý**; phiên đóng với `end_reason=tui_shutdown`. Công việc bị phá hủy. Không thấy PR sửa.

### 🟠 Cao (P2, hỏng chức năng)
- **[#143331](https://github.com/NousResearch/hermes-agent/issues/143331)** — `hermes update` thất bại mỗi lần chạy trên Windows; `gateway.pid` cũ + lock bị giữ khiến việc tạm dừng gateway bị hủy; từ chối hạ cấp kênh stable thoát với mã 1.
- **[#139091](https://github.com/NousResearch/hermes-agent/issues/139091)** — Probe merge-base 10 giây của `hermes update` bị timeout ngay cả khi commit đã cục bộ (partial clone, ghi commit-graph bị tắt). Chặn hoàn toàn việc cập nhật.
- **[#139796](https://github.com/NousResearch/hermes-agent/issues/139796)** — `session.resume` trên Desktop trả về `not_found` cho các phiên cold/bị evict (không có đường cold-load). Ảnh hưởng Windows + Feishu.
- **[#140189](https://github.com/NousResearch/hermes-agent/issues/140189)** — Gateway thử lại thông báo hoàn thành tiến trình không gửi được **mỗi 5 giây mãi mãi** (không backoff/cap/log). Rò rỉ tài nguyên âm thầm.
- **[#142271](https://github.com/NousResearch/hermes-agent/issues/142271)** — managed_worker kanban trên Windows **deadlock khi import numpy** trong plugin memory-provider (race loader-lock).
- **[#136315](https://github.com/NousResearch/hermes-agent/issues/136315)** — Hoàn thành async delegation đã được xác nhận bị **mất** tại giới hạn đệ quy follow-up (delivery được đánh dấu `delivered` nhưng không bao giờ đến parent).
- **[#116788](https://github.com/NousResearch/hermes-agent/issues/116788)** — Background memory reviewer vẫn lưu các fact mà người dùng đã yêu cầu rõ ràng không lưu. **Suy giảm quyền riêng tư.**
- **[#143326](https://github.com/NousResearch/hermes-agent/issues/143326)** — Lệch quyền admin-vs-user của Desktop/gateway trên Windows sau khi cập nhật; độ trễ chọn mô hình.
- **[#143158](https://github.com/NousResearch/hermes-agent/issues/143158)** — Hook plugin của Catalog vẫn không hoạt động sau khi khởi động lại gateway; chỉ reload thủ công mới đăng ký chúng.

### 🟡 Trung bình (P3)
- **[#143364](https://github.com/NousResearch/hermes-agent/issues/143364)** — Tiến độ giữa lượt của hồ sơ phụ được gửi qua **bot (launch-profile) chính** — rò rỉ hồ sơ.
- **[#142925](https://github.com/NousResearch/hermes-agent/issues/142925)** — Popover Context-usage trên Desktop luôn trống cho các phiên non-resident.
- **[#142820](https://github.com/NousResearch/hermes-agent/issues/142820)** — `hermes cron run` bỏ qua lệnh dừng khẩn cấp toàn cục (`hermes pause`). **Lỗ hổng an toàn.**
- **[#143383](https://github.com/NousResearch/hermes-agent/issues/143383)** / **[#143382](https://github.com/NousResearch/hermes-agent/issues/143382)** — Group Chat đã giải tán hồi sinh thành phòng hoạt động / tiếp tục nhận sự kiện (hai báo cáo liên quan).
- **[#123629](https://github.com/NousResearch/hermes-agent/issues/123629)** — Đồng bộ slash-command của Discord timeout; lệnh plugin không bao giờ đăng ký.
- **[#142248](https://github.com/NousResearch/hermes-agent/issues/142248)** — Group Chat trên Desktop mất cross-machine rooms, reply-in-thread, @ picker kể từ #106742.

**PR sửa đang được xử lý:** [#137187](https://github.com/NousResearch/hermes-agent/pull/137187) (dừng agent khi task của lượt bị hủy — chạm vào đường dẫn #136713), [#128570](https://github.com/NousResearch/hermes-agent/pull/128570) (liveness của Photon zombie-stream), [#113240](https://github.com/NousResearch/hermes-agent/pull/113240) (tự phục hồi khi bị khóa sidecar-rotation), [#140935](https://github.com/NousResearch/hermes-agent/issues/140935) (lớp oneshot iteration-budget). Phần lớn issue mức nghiêm trọng cao nhất vẫn **chưa có PR sửa liên kết**.

**Chủ đề:** Độ ổn định trên Windows, vòng đời phiên (cold resume / eviction / cancel), và **cô lập hồ sơ** là những rủi ro ổn định chiếm ưu thế.

---

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

| Issue | Lĩnh vực | Độ mạnh tín hiệu |
|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Bản tin Dự án IronClaw — 2026-10-23

## 1. Tổng quan hôm nay

IronClaw cho thấy **hoạt động bảo trì ở mức vừa phải** trong 24 giờ qua, chủ yếu là quản lý phụ thuộc tự động thay vì các công việc tính năng thực chất. Trong 6 PR được cập nhật, 5 PR vẫn mở và 1 PR đã đóng — mục đã đóng (#8149) chỉ đơn thuần bị thay thế bởi một bản cập nhật Dependabot mới hơn (#8155), không phải một lần hợp nhất có ý nghĩa. Chỉ có 2 issue được chạm tới: một yêu cầu hỗ trợ ARM64 đã tồn tại lâu (#3168) được đóng và một báo cáo phân loại benchmark hàng ngày mới được mở (#8153). Với **không có bản phát hành mới** và không có PR nào do con người tạo trong pipeline, hoạt động hôm nay có thể được mô tả đúng nhất là vệ sinh thường lệ thay vì đà phát triển của dự án.

## 2. Bản phát hành

Không có bản phát hành mới nào được công bố trong 24 giờ qua. Thông tin về bản phát hành gần nhất không có sẵn trong tập dữ liệu này.

## 3. Tiến độ Dự án

- **[PR #8149](https://github.com/nearai/ironclaw/pull/8149) [ĐÃ ĐÓNG]** — Dependabot cập nhật `dompurify` từ 3.4.12 → 3.4.16. Đã đóng và ngay lập tức được thay thế bởi #8155, nhắm tới phiên bản mới hơn 3.4.17. Đây là một sự thay thế thường lệ, không phải một tính năng đã được hợp nhất.
- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168) [ĐÃ ĐÓNG]** — "Thêm hỗ trợ nền tảng arm64/aarch64 cho các bản dựng Docker." Đã đóng sau khoảng 6 tháng mở. Việc đóng này gợi ý rằng hoặc hỗ trợ Docker ARM64 đã được giải quyết ở nơi khác, hoặc issue được coi là nằm ngoài phạm vi; tuy nhiên, không có PR sửa lỗi nào được liên kết trong tập dữ liệu này, nên **cơ chế giải quyết vẫn chưa rõ ràng và cần được xác nhận**.

**Tiến độ thực chất hôm nay: tối thiểu.** Không có mã nào do con người viết được hợp nhất.

## 4. Chủ đề Nóng trong Cộng đồng

Mức độ hoạt động trên tất cả các mục **đều thấp đồng đều** — mọi issue/PR hôm nay đều có 0 bình luận và 0 reaction, cho thấy mức độ tương tác cộng đồng hạn chế trong khoảng thời gian này.

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** — Phân loại lỗi hàng ngày cho ngày 2026-10-22 (officeqa, 64 tác vụ không đạt). Đây là một phần của nghi thức benchmark hàng ngày có vẻ được tự động hóa; đáng chú ý vì tiết lộ rằng **các lỗi của DeepSeek-V4-Flash "áp đảo là lỗi chất lượng mô hình thực sự"**, đây là tín hiệu về việc lựa chọn mô hình chứ không phải về mã của chính IronClaw.
- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — Hỗ trợ Docker ARM64, mục phi tự động thực chất nhất trong ngày hôm nay dù đã bị đóng mà không có thảo luận nào rõ ràng.

**Nhu cầu ẩn sau:** Nhu cầu rõ ràng nhất của cộng đồng vẫn là **khả năng di động nền tảng (ARM64)**, trong khi những người bảo trì đang đầu tư vào **đo lường chất lượng mô hình liên tục** qua phân loại lỗi.

## 5. Lỗi & Độ ổn định

Không có lỗi, sự cố hay thoái bộ mới nào được báo cáo hôm nay. Hai cụm cập nhật phụ thuộc liên quan đến các gói bảo mật và công cụ build:

- **[PR #8155](https://github.com/nearai/ironclaw/pull/8155)** — `dompurify` 3.4.12 → 3.4.17 (frontend). DOMPurify là thư viện chống XSS; ghi chú phát hành 3.4.16 có đề cập đến "một vấn đề" với hành vi làm sạch. **Đề xuất ưu tiên cập nhật này** vì nó có thể mang theo bản sửa lỗi liên quan đến bảo mật. Mức độ: **vừa phải** (vệ sinh bảo mật).
- **[PR #8156](https://github.com/nearai/ironclaw/pull/8156)** / **[#8158](https://github.com/nearai/ironclaw/pull/8158)** — Storybook 10.5.7 → 10.6.2 (chỉ dành cho dev). Mức độ: **thấp**.
- **[PR #8154](https://github.com/nearai/ironclaw/pull/8154)** — Vite 8.1.3 → 8.1.6 (dev/build). Mức độ: **thấp**.
- **[PR #8157](https://github.com/nearai/ironclaw/pull/8157)** — `certifi` 2026.7.22 → 2026.10.19 trong các bài kiểm thử e2e, bao gồm các thay đổi chứng chỉ gốc CA ("Khôi phục các chứng chỉ gốc emSign không bị ảnh hưởng"). Mức độ: **thấp** nhưng có thể ảnh hưởng đến hành vi TLS trong các lần chạy e2e.

Không có PR sửa lỗi cho các lỗi runtime hôm nay vì không có lỗi runtime nào được báo cáo.

## 6. Yêu cầu Tính năng & Tín hiệu Lộ trình

- **Bản dựng Docker ARM64/aarch64** ([#3168](https://github.com/nearai/ironclaw/issues/3168)) — nay đã đóng, nhưng thảo luận ghi chú rằng Cranelift đã hỗ trợ aarch64 và chỉ còn armv7 bị chặn (#1339). Nếu việc đóng này là một giải pháp thực sự, hãy kỳ vọng **các image đa kiến trúc chính thức** sẽ xuất hiện trong một bản phát hành gần đây. Nếu bị đóng vì đã cũ, nó có thể sẽ nổi lên trở lại.
- Không có yêu cầu tính năng mới nào được gửi trong khoảng thời gian này.

**Dự đoán:** Bản phát hành tiếp theo (bất cứ khi nào diễn ra) rất có thể sẽ bao gồm một **image Docker đa kiến trúc** (nếu #3168 thực sự được giải quyết) cùng với các bản cập nhật Dependabot tích lũy (DOMPurify, Vite, Storybook).

## 7. Tóm tắt Phản hồi Người dùng

Các tín hiệu từ người dùng thực ngày hôm nay khá thưa thớt, nhưng hai chủ đề nổi lên:

1. **Khó khăn về tương thích nền tảng** — Issue ARM64 ([#3168](https://github.com/nearai/ironclaw/issues/3168)) phản ánh việc người dùng trên Apple Silicon và máy chủ ARM không thể chạy các image chính thức. Đây là điểm ma sát phổ biến đối với các dự án Rust/WASM và ảnh hưởng trực tiếp đến trải nghiệm nhà phát triển cục bộ.
2. **Lo ngại về độ tin cậy của mô hình** — Phân loại lỗi ([#8153](https://github.com/nearai/ironclaw/issues/8153)) chỉ ra rằng các trường hợp không đạt benchmark là do **lựa chọn mô hình (DeepSeek-V4-Flash) chứ không phải bản thân IronClaw**, ngụ ý rằng người dùng nên cân nhắc các mô hình mạnh hơn cho các tác vụ kiểu officeqa.

Không có tuyên bố hài lòng/không hài lòng rõ ràng nào được ghi nhận (0 bình luận, 0 reaction trên tất cả các mục).

## 8. Theo dõi Backlog

- **[Issue #1339](https://github.com/nearai/ironclaw/issues/1339)** (được tham chiếu nhưng không có trong danh sách hôm nay) — Hạn chế ARMv7 (32-bit), được nêu là rào cản còn lại sau khi #3168 đóng. **Đề xuất người bảo trì chú ý** để làm rõ liệu ARM 32-bit có vĩnh viễn nằm ngoài phạm vi hay không.
- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — Đã đóng mà không có PR giải quyết nào được liên kết rõ ràng. **Đáng để người bảo trì bình luận tiếp theo** xác nhận liệu hỗ trợ Docker ARM64 có thực sự được phát hành hay không, vì việc đóng im lặng làm xói mòn niềm tin cộng đồng.
- **Chuỗi issue phân loại lỗi hàng ngày** ([#8153](https://github.com/nearai/ironclaw/issues/8153) và các mục tiền nhiệm) đang tích lũy tự động với ít sự phân loại của con người — hãy cân nhắc chỉ định một người phụ trách để trích xuất hướng dẫn lựa chọn mô hình có thể hành động từ các báo cáo này.

---

**Kết luận:** IronClaw đang ở **giai đoạn yên tĩnh, chế độ bảo trì** tính đến ngày 2026-10-23. Không có bản phát hành, không có PR do con người tạo, và chỉ có sự thay đổi phụ thuộc tự động. Mục đáng chú ý nhất là **việc đóng im lặng yêu cầu Docker ARM64** — nếu điều đó phản ánh một giải pháp thực sự, đó là tiến bộ thực chất; nếu không, nó xứng đáng được người bảo trì làm rõ.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# Tổng hợp dự án QwenPaw — 2026-10-23

## 1. Tổng quan hôm nay

QwenPaw đang trong **chu kỳ phát hành tập trung vào bảo mật với mức độ hoạt động cao**. Một bản vá mới **v2.2.2.post1** đã được phát hành hôm nay, chủ yếu để khắc phục **vấn đề tin cậy emSign CA trên các dependency, trình cài đặt và bản build** — kèm theo một thông báo bảo mật chính thức kêu gọi tất cả người dùng nâng cấp. Luồng issue vẫn rất nhiều (22 cập nhật, 20 đang mở), với một cụm **lỗi tích hợp kênh** đáng chú ý (Telegram, DingTalk, Feishu, QQ, WeChat) và một **nỗ lực tái cấu trúc plugin/module hóa** (Issue #8289, PR #8187) báo hiệu hướng đi của v2.3.0. Trong khi đó, 50 PR được xử lý hôm nay nhưng chỉ 2 được merge/đóng, cho thấy **hàng đợi review lớn và đang tăng** có thể đang làm chậm tiến độ. Nhìn chung sức khỏe dự án tốt về khả năng phản hồi, nhưng pipeline merge/review là một điểm nghẽn cần theo dõi.

## 2. Phát hành

### v2.2.2.post1 (Bản vá bảo mật)
- **Chore:** Tăng version lên v2.2.2post1 — [PR #8369](https://github.com/agentscope-ai/QwenPaw/pull/8369)
- **Security Fix:** Khắc phục tin cậy emSign CA trên các dependency, trình cài đặt và bản build — [PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370)

**Thay đổi phá vỡ tương thích / ghi chú migration:** Không có tuyên bố chính thức. Đây là **bản vá tăng cường sau phát hành**; tất cả người dùng đang dùng 2.2.2 hoặc cũ hơn nên nâng cấp. Một thông báo bảo mật riêng đã được tạo: [[Thông báo bảo mật] Vui lòng nâng cấp lên QwenPaw 2.2.2.post1 hoặc mới hơn — Issue #8385](https://github.com/agentscope-ai/QwenPaw/issues/8385), bao gồm trình cài đặt Desktop, gói PyPI và các kênh phân phối khác.

**Liên quan:** Một issue xác minh trực phát hành ([[Release Duty] v2.2.2.post1 — Issue #8386](https://github.com/agentscope-ai/QwenPaw/issues/8386)) đã được mở và **đóng** hôm nay, xác nhận cổng phát hành (bốn điểm kiểm tra nền tảng đều xanh) đã vượt qua.

## 3. Tiến độ dự án

Khối lượng PR được merge/đóng hôm nay thấp (2 trên 50), phù hợp với giai đoạn đóng băng cắt phát hành — mục được merge chính là **merge nhánh phát hành**:
- [PR #8391](https://github.com/agentscope-ai/QwenPaw/pull/8391) — `chore: merge Release/v2.2.2post1 into main` (size/L), đồng bộ bản vá bảo mật trở lại nhánh chính.

**Các tính năng đáng chú ý đang tiến triển (vẫn mở, đang được review tích cực):**
- [PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) — `feat(channels): extract channels into plugins with subprocess isolation` (size/XXXL). Một cuộc tái cấu trúc kiến trúc lớn, phù hợp với mục tiêu v2.3.0 "nhẹ hơn, dễ mở rộng hơn" trong Issue #8289.
- [PR #8376](https://github.com/agentscope-ai/QwenPaw/pull/8376) — `feat(memory): support PowerContext prepared context and Artifact APIs` (cộng tác viên lần đầu, size/XXXL).
- [PR #8337](https://github.com/agentscope-ai/QwenPaw/pull/8337) — `feat(agents): stop replaying media the model no longer needs` — giải quyết trực tiếp vấn đề request body 48 MB mất kiểm soát được báo trong Issue #8335.
- [PR #8328](https://github.com/agentscope-ai/QwenPaw/pull/8328) — `feat(deploy): offline image variant with Office/PDF toolchain`.

**Các bản sửa đang được xử lý với PR fix đã mở:**
- [PR #8375](https://github.com/agentscope-ai/QwenPaw/pull/8375) → sửa #8368 (404 khi xóa cuộc trò chuyện đang chọn)
- [PR #8303](https://github.com/agentscope-ai/QwenPaw/pull/8303) → prompt phê duyệt không đến được kênh chat gốc
- [PR #8299](https://github.com/agentscope-ai/QwenPaw/pull/8299) → thử lại không có video khi nhà cung cấp từ chối
- [PR #8235](https://github.com/agentscope-ai/QwenPaw/pull/8235), [PR #8234](https://github.com/agentscope-ai/QwenPaw/pull/8234) → xử lý CRLF và mã hóa GBK/CP936 trên Windows trong các công cụ file

## 4. Chủ đề cộng đồng nổi bật

| Xếp hạng | Mục | Tương tác | Liên kết |
|---|---|---|---|
| 1 | **[Feature] Plugin-facing theme extension point** | 7 bình luận | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) |
| 2 | **[Feature] Sắp có trong v2.3.0: Làm QwenPaw nhẹ hơn và dễ mở rộng hơn** | 3 bình luận, 1 👍 | [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) |
| 3 | **[Bug][Console] Bản nháp Composer gắn theo agent, không theo cuộc trò chuyện** | 3 bình luận | [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) |
| 4 | **[Question] Hiển thị mô hình cục bộ HUB bất thường** | 2 bình luận (đã đóng) | [#8392](https://github.com/agentscope-ai/QwenPaw/issues/8392) |
| 5 | **[Feature] Quản lý thống nhất Skill & MCP toàn cục trong Hub** | 2 bình luận, 1 👍 | [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) |

**Phân tích nhu cầu ẩn sau:**
- **Độ trưởng thành của hệ sinh thái plugin** (#8071, #8289): Các tác giả plugin muốn kiểm soát sâu hơn một nút `colorPrimary` đơn lẻ. Kết hợp với lộ trình module hóa v2.3.0, điều này cho thấy cộng đồng đang chuyển từ "người dùng QwenPaw" sang "người xây dựng trên QwenPaw", và bề mặt API cần bắt kịp.
- **Vận hành đa người thuê / theo nhóm** (#8275): Hub đang được dùng trong các nhóm, và việc mỗi người dùng phải lặp lại cấu hình skills/MCP là điểm ma sát thực sự. Một lớp quản trị toàn cục do admin quản lý là bước tiếp theo tự nhiên.
- **Trau chuốt UX Console** (#8351): Lưu bản nháp theo sai khóa là một lỗi nhỏ nhưng dễ thấy, làm xói mòn niềm tin vào trải nghiệm chat.

## 5. Lỗi & Độ ổn định

Xếp theo mức độ nghiêm trọng (khả năng mất dữ liệu, gián đoạn dịch vụ hoặc lỗi âm thầm):

**Nghiêm trọng — Ảnh hưởng toàn dịch vụ:**
- **[#8350](https://github.com/agentscope-ai/QwenPaw/issues/8350)** — Kênh Feishu thực hiện các cuộc gọi mạng đồng bộ trên event loop chính; khi mạng không kết nối được, `/api/healthz` bị timeout và **SIGTERM không thể thoát**. Đây là sự cố kẹt toàn dịch vụ. *Chưa xác định được PR fix.*
- **[#8343](https://github.com/agentscope-ai/QwenPaw/issues/8343)** — Phản hồi cuối cùng của DingTalk bị **âm thầm bỏ** khi `sessionWebhook` hết hạn (errcode=300001); không có fallback Open API. Đã tái hiện trên main. *Chưa xác định được PR fix.*
- **[#8335](https://github.com/agentscope-ai/QwenPaw/issues/8335)** — Request body 48 MB và **phiên bị kẹt vĩnh viễn** do tải lại media trong lịch sử. Fix đang xử lý: [PR #8337](https://github.com/agentscope-ai/QwenPaw/pull/8337).

**Cao — Hồi quy kênh:**
- **[#8388](https://github.com/agentscope-ai/QwenPaw/issues/8388)** — Kênh QQ bị hỏng sau khi nâng cấp: `No module named '_qwenpaw_remote_backend'`, làm hỏng môi trường runtime cho *tất cả* lệnh gọi công cụ. *Chưa xác định được PR fix.*
- **[#8378](https://github.com/agentscope-ai/QwenPaw/issues/8378)** — Gọi mô hình thất bại sau khi nâng cấp; cấu hình `active_model` trong `agent.json` không còn ánh xạ đúng.
- **[#8329](https://github.com/agentscope-ai/QwenPaw/issues/8329)** — Telegram bỏ qua `reply_to_message`; ngữ cảnh trích dẫn bị âm thầm bỏ. Các kênh khác đã triển khai → khoảng cách nhất quán.

**Trung bình — UX và tính đúng đắn:**
- **[#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351)** — Bản nháp Composer gắn theo agent, rò rỉ văn bản chưa gửi giữa các cuộc trò chuyện.
- **[#8359](https://github.com/agentscope-ai/QwenPaw/issues/8359)** — Probe sẵn sàng Docker của Hub-in-container bị hardcode thành `127.0.0.1` (Errno 111).
- **[#8374](https://github.com/agentscope-ai/QwenPaw/issues/8374)** — `QWENPAW_CORS_ORIGINS` đặt qua Web UI/CLI không có hiệu lực (hằng số được đọc tại thời điểm import).
- **[#8342](https://github.com/agentscope-ai/QwenPaw/issues/8342)** — Trả lời trích dẫn mất định tuyến lệnh điều khiển (`/stop`) trên bảy kênh.
- **[#8368](https://github.com/agentscope-ai/QwenPaw/issues/8368)** — 404 khi xóa cuộc trò chuyện đang được chọn. PR fix: [PR #8375](https://github.com/agentscope-ai/QwenPaw/pull/8375).
- **[#8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)** — Tiêu đề nhóm sidebar bị chồng lấn trong chế độ source-group.

**Thấp — Trải nghiệm nhà phát triển:**
- **[#8377](https://github.com/agentscope-ai/QwenPaw/issues/8377)** — `pytest` trần bị hủy trong giai đoạn collection trên bản checkout sạch (lỗi import `test_backup`). Cản trở cộng tác viên làm theo CONTRIBUTING.md.

**Nhận xét:** Lớp kênh là **nguồn bất ổn lớn nhất** — 5 trong số các issue hàng đầu đều liên quan đến kênh cụ thể. Điều này củng cố lý lẽ cho phương án cô lập subprocess của [PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187).

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

**Lộ trình đã xác nhận (từ Issue #8289, "Sắp có trong v2.3.0"):**
- Tái cấu trúc plugin để có lõi **nhẹ hơn, mô-đun hơn**.
- Kết quả thử nghiệm sơ bộ đã được chia sẻ; maintainer đang tích cực thu thập nhu cầu từ cộng đồng.

**Ứng viên khả năng cho v2.3.0 hoặc ngay sau đó:**
- **Quản lý Skill & MCP toàn cục trong Hub** ([#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275)) — trường hợp sử dụng nhóm mạnh, rủi ro kiến trúc thấp, 1 👍. Phù hợp với quỹ đạo đa người dùng của Hub.
- **Điểm mở rộng theme cho plugin** ([#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071)) — issue tính năng có nhiều bình luận nhất; bạn đồng hành tự nhiên của việc tái cấu trúc plugin.
- **Tách kênh thành plugin** ([#8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)) — đã ở dạng PR, size/XXXL.
- **Nút bật/tắt khóa cuộn trên Desktop** ([#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339)) — mở từ tháng 8, yêu cầu đơn giản, được quan tâm đều đặn.

**Dự đoán:** v2.3.0 đang thành hình như **"bản phát hành mở rộng"** — cô lập plugin, hook theme và cấu hình chia sẻ qua Hub là chủ đề nhất quán. Các bản vá bảo mật (2.2.2.post1) là bước đệm ổn định.

## 7. Tổng hợp phản hồi người dùng

**Điểm đau được nêu:**
1. **Nâng cấp dễ hỏng** — Nhiều người dùng (#8388, #8378) báo kênh/mô hình bị hỏng *sau* khi nâng cấp. Lỗi thiếu module `_qwenpaw_remote_backend` đặc biệt nguy hiểm vì khiến agent tin rằng môi trường của chính nó bị hỏng, tạo ra output tự chẩn đoán gây nhầm lẫn. Đường nâng cấp cần được kiểm thử xác minh.
2. **Lỗi âm thầm** — DingTalk (#8343), Telegram (#8329) và vấn đề định tuyến trích dẫn (#8342) đều có chung một mẫu: agent *có vẻ* hoạt động nhưng người d

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Tổng hợp Dự án ZeroClaw — 2026-10-23

## 1. Tổng quan hôm nay

ZeroClaw đang trong chu kỳ ổn định hóa căng thẳng trước v0.9.0. Mức độ hoạt động vẫn rất cao (35 issue được chạm tới, 50 PR được cập nhật trong 24h) nhưng chủ yếu là sửa lỗi, tăng cường bảo mật và công việc chuẩn bị phát hành thay vì tính năng mới. Đáng chú ý, **không có PR nào được merge và không có bản phát hành nào được cắt hôm nay** — chỉ có 8 PR được đóng/merge trong khoảng thời gian này, so với 42 PR vẫn đang mở, cho thấy nút thắt trong khâu review hoặc một đợt đóng băng có chủ đích trước v0.9.0. Một cụm issue bảo mật P1/P0 (delegate allowlist bypass, SOP authority escalation, principal-scope leaks) đang được sửa chữa tích cực thông qua các PR xếp tầng từ cộng tác viên xuất sắc IftekharUddin. Nhìn chung sức khỏe dự án **thận trọng nhưng kỷ luật**: nhóm đang đóng các regression (OIDC JWKS race, daemon session store) đồng thời mở các ticket chặn phát hành (TLS WebSocket upgrade, OIDC enrollment encoding) — đặc trưng của giai đoạn ổn định hóa cuối kỳ.

## 2. Bản phát hành

**Không có bản phát hành mới hôm nay.** Artifact được ship gần nhất được nhắc đến trong backlog là **v0.8.6**, với các ticket **v0.8.7** (plugins, email, CI) đang đóng dần và các ticket **v0.9.0** đang tích lũy. Maintainer cần lưu ý hai vấn đề phát hành v0.8.6 vẫn đang tồn đọng:
- [#11828](https://github.com/zeroclaw-labs/zeroclaw/issues/11828) (đã đóng) — image `dist` arm64 bị OOM trong `docker-publish.yml`; v0.8.6 có thể đã ship mà không có image `dist`.
- [#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) (mở, bị chặn) — cài đặt Discord plugin từ release binary đã được xác minh trên v0.8.6, nhưng bằng chứng đầy đủ vẫn đang chờ.

Không có changelog hay ghi chú migration nào cho bản 0.9.0 chưa phát hành.

## 3. Tiến độ Dự án

Với **không PR nào được merge hôm nay**, tiến độ nên được hiểu là "sửa chữa đã sẵn sàng, chưa landed." Hàng đợi merge đang hoạt động được xếp tầng dày đặc:

- **Tăng cường identity/authority (P0–P1), stack của IftekharUddin:** [#11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225) (giữ owner trong delegation, P0) → [#11230](https://github.com/zeroclaw-labs/zeroclaw/pull/11230) (giữ lại session-data tools khỏi non-admin) → [#11220](https://github.com/zeroclaw-labs/zeroclaw/pull/11220) (yêu cầu admin authority để thực thi SOP) → [#11234](https://github.com/zeroclaw-labs/zeroclaw/pull/11234) (đánh giá quyền sở hữu session trong hàng đợi theo authority hiện tại).
- **Khôi phục rename bền vững:** [#11301](https://github.com/zeroclaw-labs/zeroclaw/pull/11301) — khôi phục committed-rename chia sẻ giữa CLI, gateway và RPC (XL, `needs-author-action`).
- **ZeroClaw không có gateway:** [#11269](https://github.com/zeroclaw-labs/zeroclaw/pull/11269) (ngăn metrics/embedded-web bật gateway), [#11975](https://github.com/zeroclaw-labs/zeroclaw/pull/11975) (UX build chỉ CLI), giải quyết trực tiếp [#11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969) và [#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971).
- **Tính đúng đắn của kênh:** [#11990](https://github.com/zeroclaw-labs/zeroclaw/pull/11990) sửa lỗi "excluded_tools không bao giờ được áp dụng" ([#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989)); [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) thêm Telegram 429 flood-gating.

Các issue được đóng hôm nay bao gồm một số regression v0.8.7: #10558 (Cranelift CI timeout), #11357 (xóa path `plugin remove`), #11327 (plugin tool-name pre-emption), #11898 (daemon session store trên data dir mới), và #11902 (OIDC JWKS race). **Không có gì được merge nghĩa là mọi bản sửa ở trên vẫn đang trong quá trình xử lý.**

## 4. Chủ đề Nóng trong Cộng đồng

| Xếp hạng | Mục | Bình luận | Tín hiệu |
|---|---|---|---|
| 1 | [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — Tracker: runtime, dashboard sign-in, gateway delivery (P2, release:v0.9.0) | 15 | Issue lộ trình tổng cho v0.9.0; mọi thứ bên dưới đều phụ thuộc vào nó. |
| 2 | [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) ĐÃ ĐÓNG — RFC: append-only session events & deterministic replay | 13 | RFC kiến trúc; việc đóng cho thấy hướng đi đã được chấp nhận, nhưng không có PR triển khai nào được thấy. |
| 3 | [#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) — Chứng minh cài đặt Discord plugin từ release binary | 9 | Tính nghiêm ngặt trong xác minh phát hành; bằng chứng mạng thực trên macOS arm64. |
| 4 | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — Delegate bỏ qua parent tool allowlist (P1, S0) | 5 | Lỗ hổng bảo mật tồn tại lâu nhất (mở từ tháng 6, vẫn mở, cập nhật hôm nay). |

**Nhu cầu ẩn sau:** cộng đồng đang hội tụ về ba yêu cầu — (a) artifact phát hành *có thể chứng minh được* (plugin phải cài được từ binary đã publish, không chỉ trong tree), (b) ngữ nghĩa session/state *có nguyên tắc* (event sourcing, deterministic replay, survivor sessions), và (c) least-privilege *có thể thực thi được* (delegate, SOP, channel-scoped tools). Tracker #7432 đang hoạt động như một đặc tả phát hành không chính thức.

## 5. Lỗi & Tính Ổn định

Xếp hạng theo mức độ nghiêm trọng được khai báo và khả năng khai thác:

**S0 / P1 — Bảo mật nghiêm trọng**
- [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — `delegate` lọc *tập hợp* parent tool *chưa được lọc*, nên sub-agent có thể gọi các tool mà policy của parent loại trừ. **Không tìm thấy PR sửa nào được liên kết.** Đây là mục mở có rủi ro cao nhất và đã mở ~4 tháng.
- [#11225](https://github.com/zeroclaw-labs/zeroclaw/pull/11225) (P0) — memory delegation mất principal scope; bản sửa đã sẵn sàng.

**S1 — Workflow bị chặn**
- [#11957](https://github.com/zeroclaw-labs/zeroclaw/issues/11957) — OIDC enrollment gửi raw client credentials trong Basic header, phá vỡ `client_credentials`/device-grant khi secret chứa ký tự dành riêng (vi phạm RFC 6749 §2.3.1). **Bản sửa đã có:** [#11968](https://github.com/zeroclaw-labs/zeroclaw/pull/11968).

**S2 — Suy giảm**
- [#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) — **Gateway WebSocket upgrade thất bại trên TLS tích hợp** (`101` rồi đóng), phá vỡ chat dashboard. Chặn phát hành cho v0.9.0; chưa có PR sửa.
- [#11962](https://github.com/zeroclaw-labs/zeroclaw/issues/11962) — 64 live RPC session không bao giờ được giải phóng khi idle → remote client có thể làm cạn kiệt. **Bản sửa đã sẵn sàng:** [#11964](https://github.com/zeroclaw-labs/zeroclaw/pull/11964).
- [#11823](https://github.com/zeroclaw-labs/zeroclaw/issues/11823) — shell scanner bỏ qua command substitution bên trong heredoc có delimiter không được quote (vector thoát sandbox). Chưa có PR sửa.
- [#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) — email HTML outbound truyền raw markup và URL ảnh tùy ý từ văn bản agent (rủi ro phishing/tracking).
- [#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989) — per-channel `excluded_tools` bị bỏ qua âm thầm. **Bản sửa đã sẵn sàng:** [#11990](https://github.com/zeroclaw-labs/zeroclaw/pull/11990).
- [#11970](https://github.com/zeroclaw-labs/zeroclaw/issues/11970) — `agents delete/rename` bỏ qua owned-state cascade trong các build không có gateway.

**S3 — Nhỏ**
- [#11972](https://github.com/zeroclaw-labs/zeroclaw/issues/11972) — `gateway get-paircode` thoát với mã 0 khi thất bại (script không thể phát hiện). [#11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987) — comment `nosemgrep` inline không chặn được cảnh báo code-scanning. [#11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969) — tính năng metrics/embedded-web kéo theo toàn bộ gateway.

**Kết luận về ổn định:** dòng regression vào được cân bằng bởi các bản sửa đã sẵn sàng, nhưng #8279 và #11951 chưa được giảm thiểu và cả hai đều là blocker bảo mật/phát hành.

## 6. Yêu cầu Tính năng & Tín hiệu Lộ trình

Các ứng viên rõ ràng cho v0.9.0, theo thứ tự ưu tiên tương đối:

1. **Dashboard OIDC sign-in** — [#11961](https://github.com/zeroclaw-labs/zeroclaw/issues/11961) / PR [#11965](https://github.com/zeroclaw-labs/zeroclaw/pull/11965), cùng các follow-on [#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) (chat scoped cho non-admin) và [#11985](https://github.com/zeroclaw-labs/zeroclaw/issues/11985) (test JWKS/failed-write/retirement). Tất cả đều được gắn tag `release:v0.9.0`.
2. **Build nguồn chỉ CLI** — [#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971) + [#11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969), bản sửa trong [#11975](https://github.com/zeroclaw-labs/zeroclaw/pull/11975)/[#11269](https://github.com/zeroclaw-labs/zeroclaw/pull/11269). Nhu cầu "cài đặt server tối giản" mạnh mẽ.
3. **Thu hẹp sender-role theo kênh** — [#11068](https://github.com/zeroclaw-labs/zeroclaw/pull/11068) (`[peer_groups.<name>] risk_profile`) — tính năng ngôn ngữ policy, XL, gắn tag bảo mật.
4. **Hoàn thiện kênh email** — template cho operator + HTML được sanitize ([#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992)), trả lời trích dẫn ([#11939](https://github.com/zeroclaw-labs/zeroclaw/pull/11939)).
5. **Khả năng giải thích của shell policy** — [#11799](https://github.com/zeroclaw-labs/zeroclaw/issues/11799) → PR [#11983](https://github.com/zeroclaw-labs/zeroclaw/pull/11983): từ chối kèm lý do + gợi ý cho operator.
6. **Kênh XMPP/Prosody với OMEMO tùy chọn** — [#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847), XL, do cộng đồng đóng góp.

**Dự đoán:** v0.9.0 sẽ ship OIDC dashboard sign-in, build chỉ CLI, và stack tăng cường identity/authority. Thu hẹp sender-role và XMPP nhiều khả năng thuộc v0.9.x.

## 7. Tóm tắt Phản hồi Người dùng

- **Niềm tin vào phát hành là chủ đề lớn nhất.** #10999 cho thấy người dùng muốn cài *plugin đã publish* và được xác minh end-to-end, không chỉ pass trong CI. #11828 (dist image OOM) củng cố rằng pipeline phát hành là mắt xích yếu.
- **Tư thế bảo mật đang được kiểm tra áp lực.** Nhiều reporter độc lập (IftekharUddin, wangmiao0668000666, mov-xound-glitch) đã tìm ra allowlist bypass, leo thang đặc quyền SOP, và email HTML không được escape. Điều này cho thấy người dùng có hiểu biết bảo mật, đang tìm ra các lỗ hổng thực sự — sự giám sát lành mạnh, nhưng cũng là cảnh báo rằng mô hình tin cậy chưa được đặc tả đầy đủ.
- **Least-privilege được kỳ vọng mặc định.** #11989 (`excluded_tools` được tài liệu hóa nhưng bị bỏ qua âm thầm) là kiểu thất vọng kinh điển "tài liệu hứa, code không thực hiện"; #8279 cùng loại nhưng ở mức đặt cược cao hơn.
- **UX cho operator quan trọng.** #11799 (từ chối nên nói *tại sao*) và #11972 (thoát 0 khi thất bại) là những defect nhỏ nhưng gây khó chịu cao cho bất kỳ ai script hóa ZeroClaw.
- **Mẫu điểm đau:** *các kiểm soát bảo mật được tài liệu hóa nhưng không thực sự thực thi.* Đây là tín hiệu bất mãn lặp lại

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*