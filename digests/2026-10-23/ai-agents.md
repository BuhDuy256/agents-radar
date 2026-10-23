# Bản tin hệ sinh thái OpenClaw 2026-10-23

> Issues: 500 | PRs: 500 | Dự án theo dõi: 5 | Tạo lúc: 2026-10-23 05:49 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## Báo cáo chuyên sâu dự án OpenClaw

# OpenClaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

OpenClaw cho thấy **mức độ hoạt động rất cao** vào ngày 2026-10-23: 500 issue và 500 PR được cập nhật trong 24h qua, với tỷ lệ merge lành mạnh (269 PR đã merge/đóng so với 231 PR mở; 167 issue đã đóng so với 333 vẫn đang hoạt động). Một bản release đã được phát hành (v2026.10.6), chủ yếu là bản nâng cấp Node runtime vì lý do bảo mật. Tuy nhiên, dự án đang gánh **nợ regression đáng kể**, đặc biệt xoay quanh hiệu năng khởi động gateway, khả năng phục hồi sau sleep/wake trên Windows/macOS, tình trạng plugin-load bị chặn, và mất trạng thái session — nhiều issue P0/P1 về crash-loop vẫn đang mở mà chưa có PR sửa. Sự chú ý của cộng đồng tập trung vào tình trạng khởi động bị chặn bởi plugin lớn (#160959, 43 bình luận) và regression khởi động trên Windows (#168955, 18 bình luận), cho thấy dòng release 2026.9.6–2026.10.x đã gây ra các vấn đề độ tin cậy mà người vận hành nhìn thấy rõ. Năng suất của maintainer rất mạnh (nhiều PR `ready for maintainer look` từ `steipete` và những người khác), nhưng một phần đáng kể các bug mức độ nghiêm trọng cao vẫn ở trạng thái `clawsweeper:no-new-fix-pr`, cho thấy khoảng cách giữa triage và khắc phục.

---

## 2. Các bản Release

### v2026.10.6

**Điểm nổi bật:**
- **Yêu cầu Node runtime đã được vá:** OpenClaw hiện yêu cầu **Node 24.22.1+** (dòng 24) hoặc **26.12.1+** (dòng 26), các phiên bản này từ chối các chuỗi TLS được ký bằng khóa chứng chỉ bị xâm phạm đã được đề cập trong **các bản release bảo mật Node.js tháng 10 năm 2026**. Docker image đi kèm Node 24.2x.

**Tính chất thay đổi:** Đây là bản release tăng cường bảo mật với **yêu cầu tương thích gây phá vỡ** — các Node runtime cũ chưa được vá thực tế không còn được hỗ trợ.

**Ghi chú migration:**
- Người vận hành dùng cài đặt npm/global phải nâng cấp Node **trước khi** nâng cấp OpenClaw, nếu không khởi động/xác minh TLS có thể thất bại với các chuỗi chứng chỉ bị ảnh hưởng.
- Người dùng Windows managed-service nên kiểm tra phiên bản Node độc lập với OpenClaw updater, do có nhiều báo cáo về regression của updater (#157812, #172496, #166004).

⚠️ Lưu ý: Release notes có vẻ bị cắt ngắn ("Docker images ship Node 24.2"), nên có thể sẽ có changelog đầy đủ hơn sau.

---

## 3. Tiến độ dự án

- **269 PR đã merge/đóng trong 24h** — tốc độ maintainer rất mạnh.
- Các mục đã đóng đáng chú ý:
  - **#175639** — `fix(gateway)`: giữ deadline drain công việc đã được chấp nhận khi plugin reload trên đồng hồ monotonic (tăng độ bền trước điều chỉnh đồng hồ). [Liên kết PR](https://github.com/openclaw/openclaw/pull/175639)
  - **#171608** — `fix(trajectory)`: giữ nguyên tên thư mục export nguyên văn (đúng đắn của CLI). [Liên kết PR](https://github.com/openclaw/openclaw/pull/171608)
  - **#181267** — `refactor(ui)`: ghép cặp listener của chat viewport với page settlement. [Liên kết PR](https://github.com/openclaw/openclaw/pull/181267)
  - **#181142** — `perf(ui)`: lazy-load nội dung About/Dashboard. [Liên kết PR](https://github.com/openclaw/openclaw/pull/181142)
  - **#148308** (Issue, CLOSED) — Mất claim Tailscale Serve của Gateway sau khi `tailscaled` restart. [Liên kết Issue](https://github.com/openclaw/openclaw/issues/148308)
  - **#126836** (Issue, CLOSED) — `sessions.reset` âm thầm nuốt session. [Liên kết Issue](https://github.com/openclaw/openclaw/issues/126836)
- **Công việc đang triển khai:** Một loạt refactor hiệu năng/vòng đời UI rộng khắp của `steipete` (#181255, #181259, #181189, #181251, #181377, #181378), cùng các bản sửa độ tin cậy cho dispatch session (#181300, #181228) và pin sandbox mount (#180840). Các bản sửa đồng hồ monotonic cho dọn dẹp tiến trình nằm trong #181335 và #181360.
- **Bảo mật:** #181341 vá các advisory về dependency của extended-stable; #181303 thêm chế độ xem trước `security audit --fix --dry-run`.

---

## 4. Chủ đề nóng trong cộng đồng

| Mục | Bình luận | Loại | Liên kết |
|---|---|---|---|
| **#160959** — Gateway bị chặn hàng phút khi capture plugin ngoài lớn (regression 2026.9.6), P0 | 43 | Bug | [Issue](https://github.com/openclaw/openclaw/issues/160959) |
| **#42475** — Thực thi ngân sách chi phí theo từng agent tại gateway, P2 | 27 | Feature | [Issue](https://github.com/openclaw/openclaw/issues/42475) |
| **#168955** — Regression khởi động Windows 2026.10.1: ready ~1030s so với ~410s | 18 | Bug | [Issue](https://github.com/openclaw/openclaw/issues/168955) |
| **#53763** — Trình duyệt headless tích hợp sẵn (CLOSED), P3 | 18 | Feature | [Issue](https://github.com/openclaw/openclaw/issues/53763) |
| **#157531** — 2026.9.7 Fixes Tracker | 17 | Tracker | [Issue](https://github.com/openclaw/openclaw/issues/157531) |
| **#140010** — Windows sleep/resume: WS reconnect thất bại 30–60s+, P1 | 14 | Bug | [Issue](https://github.com/openclaw/openclaw/issues/140010) |
| **#172837** — Codex nativeSubagentAssignments không bao giờ được gỡ, P1 | 12 | Bug | [Issue](https://github.com/openclaw/openclaw/issues/172837) |

**Nhu cầu ẩn sau:**
- **Độ trễ khởi động chiếm ưu thế** — người dùng có nhiều plugin và host Windows đang trải qua tình trạng khởi động chậm đi hàng phút; đây là nỗi đau số 1 của người vận hành.
- **Quản trị chi phí** (#42475) là yêu cầu lặp lại từ doanh nghiệp/self-hosted: ngăn chi tiêu vượt kiểm soát mà không cần giám sát bên ngoài.
- **Độ tin cậy web** (#53763): agent cần truy cập trang có JS render/luồng đăng nhập một cách đáng tin cậy mà không phụ thuộc Chrome cục bộ — một điểm ma sát tích hợp lặp lại.
- **Tính đúng đắn vòng đời subagent** (#172837) phản ánh việc sử dụng ngày càng nhiều agent lồng nhau/tác vụ Codex và ngữ nghĩa dọn dẹp chưa đầy đủ.

---

## 5. Bug & Độ ổn định

### P0 / Crash-loop
| Issue | Tiêu đề | Có PR sửa? |
|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | Gateway bị chặn hàng phút khi capture plugin ngoài lớn (regression 2026.9.6) | Không |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | Live Docs đi trước release (thiếu heartbeat `IsolatedSessions`) | Không |
| [#156712](https://github.com/openclaw/openclaw/issues/156712) | `openclaw triage` subprocess giữ khóa gateway-lifecycle, chặn restart | Không |
| [#156674](https://github.com/openclaw/openclaw/issues/156674) | Áp lực tài nguyên gateway macOS với Codex worker tồn tại lâu dài | Không |
| [#166634](https://github.com/openclaw/openclaw/issues/166634) | Lỗi checkpoint thu hồi muộn → agent không khả dụng vĩnh viễn sau crash | Không |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) | Cooldown thanh toán tồn tại lâu hơn sự cố trên auth subscription | Không |
| [#158592](https://github.com/openclaw/openclaw/issues/158592) | Sau sleep/wake: publish model runtime đã chuẩn bị bị timeout → mọi tin nhắn thất bại cho đến khi restart | Không |
| [#141615](https://github.com/openclaw/openclaw/issues/141615) | WebChat "Authenticated profile verification unavailable" làm kẹt mọi RPC | PR đang mở (đã liên kết) |
| [#172496](https://github.com/openclaw/openclaw/issues/172496) | Windows managed update bị bỏ dở giữa activation (2026.9.8→2026.10.3) | Không |
| [#166004](https://github.com/openclaw/openclaw/issues/166004) | Gateway scheduled-task trên Windows không khởi động; update rollback | Không |

### P1 (chọn lọc)
- [#168955](https://github.com/openclaw/openclaw/issues/168955) — Regression khởi động Windows (sidecars.control-ui-assets chặn 477s).
- [#140010](https://github.com/openclaw/openclaw/issues/140010) — Windows sleep/resume WS reconnect thất bại 30–60s+.
- [#172837](https://github.com/openclaw/openclaw/issues/172837) — Codex nativeSubagentAssignments không bao giờ được gỡ; bị re-pin theo từng parent thread.
- [#167557](https://github.com/openclaw/openclaw/issues/167557) — Migration plugin bị trì hoãn không bao giờ hội tụ (npm/Linux).
- [#180690](https://github.com/openclaw/openclaw/issues/180690) — `doctor --fix` heap OOM tại 6 GB với state ~810 agent.
- [#155359](https://github.com/openclaw/openclaw/issues/155359) — SQLite write-transaction giữ 5.9–33.2s trên Windows (vượt `busy_timeout=5000ms`).
- [#145690](https://github.com/openclaw/openclaw/issues/145690) — Hoàn thành subagent run giải phóng model-runtime generation → tác vụ lane tiếp theo thất bại trong ~15ms.
- [#140085](https://github.com/openclaw/openclaw/issues/140085) — `ask_user` không bao giờ được gửi đến Telegram; session bị treo.
- [#160485](https://github.com/openclaw/openclaw/issues/160485) — Plugin load bị CPU-bound; 3 channel plugin = 57.4s trong phase 60s (Windows).
- [#158592](https://github.com/openclaw/openclaw/issues/158592) — Publish runtime sau sleep không bao giờ phục hồi (cụm trùng lặp với #140010).

### Chủ đề regression
Một cụm lớn các bug P0/P1 chia sẻ nguyên nhân gốc xoay quanh **event-loop bị đình trệ, phụ thuộc wall-clock, chi phí biên dịch plugin/module, và republish runtime sau resume**. Các bản sửa đang đến cho vấn đề đồng hồ (#181335, #181360, #175639) và dispatch owner (#181300), nhưng các vấn đề **khởi động với tenant lớn** và **Windows service** phần lớn vẫn chưa được giải quyết.

---

## 6. Yêu cầu tính năng & Tín hiệu Roadmap

| Yêu cầu | Issue | Khả năng trong bản release tới |
|---|---|---|
| Thực thi ngân sách chi phí theo từng agent tại gateway | [#42475](https://github.com/openclaw/openclaw/issues/42475) | Trung bình — nhu cầu cao, cần quyết định sản phẩm |
| Giới hạn kích thước upload của Control UI có thể cấu hình (hiện hardcode 5MB) | [#71142](https://github.com/openclaw/openclaw/issues/71142) | Trung bình — `needs-product-decision` |
| Automation gửi đến node đã ghép nối (thông báo ứng dụng) | [#144306](https://github.com/openclaw/openclaw/issues/144306) | Trung bình — phạm vi rõ, giá trị UX rõ |
| Bản build companion Linux aarch64 (deb + AppImage) | [#138279](https://github.com/openclaw/openclaw/issues/138279) | Trung bình — khoảng cách parity so với Windows ARM |
| Trạng thái heartbeat cho cadence/activeHours | [#178033 (PR)](https://github.com/openclaw/openclaw/pull/178033) | **Cao** — PR đang mở |
| `config explain` xuất xứ đơn đường dẫn | [#181342 (PR)](https://github.com/openclaw/openclaw/pull/181342) | **Cao** — PR đang mở |
| Plugin tool hiển thị native view trong chat | [#173135 (PR)](https://github.com/openclaw/openclaw/pull/173135) | Cao — PR XL đang review |
| Chọn tool nào được defer sau Tool Search | [#170071 (PR)](https://github.com/openclaw/openclaw/pull/170071) | Cao — PR XL đang review |
| Trình duyệt headless tích hợp sẵn | [#53763](https://github.com/openclaw/openclaw/issues/53763) (CLOSED) | Deferred/từ chối |

**Dự đoán cho phiên bản tới (v2026.10.7+):** Có khả năng bao gồm loạt refactor vòng đời/hiệu năng UI, tăng cường đồng hồ monotonic, security audit dry-run, và cải thiện dispatch-recovery. Các mục cost-budget và headless-browser khó có thể hoàn thành trong chu kỳ này do trạng thái `needs-product-decision`.

---

## 7. Tóm tắt phản hồi người dùng

**Điểm đau:**
- **Thời gian khởi động đã regress đáng kể** trên Windows và với nhiều plugin — từ ~410s lên ~1030s trong một báo cáo, với một host Windows dành 57.4/60s chỉ cho plugin load.
- **Phục hồi sau sleep/wake không đáng tin cậy** trên cả Windows và macOS, gây reconnect thất bại lặp lại và mất tin nhắn (#140010, #158592, #166634).
- **Managed update thường thất bại hoặc bỏ dở** trên Windows, khiến người dùng ở lại phiên bản cũ (#157812, #172496, #166004).
- **UX cooldown thanh toán** gây khó chịu cho người dùng subscription

---

## So sánh chéo hệ sinh thái

# Báo cáo So sánh Liên dự án — Hệ sinh thái Mã nguồn mở Trợ lý AI Cá nhân / Agent
**Ngày chụp nhanh: 2026-10-23** | Dự án: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Tổng quan Hệ sinh thái

Bối cảnh mã nguồn mở về trợ lý AI cá nhân / agent đang phân tách thành hai tầng trưởng thành: **các bản triển khai tham chiếu thông lượng cao** (OpenClaw, Hermes Agent, QwenPaw, ZeroClaw) hoạt động với nhịp phát hành hàng ngày và hàng trăm PR mỗi tuần, và **các dự án ổn định, tập trung vào triển khai** (IronClaw) vận hành theo nhịp bảo trì. Trên cả năm dự án, hoạt động ngày 2026-10-23 cho thấy một mô hình nhất quán — **cộng đồng đang triển khai agent như hạ tầng bền vững, luôn hoạt động** (đội multi-gateway, thực thi lai remote/local, triển khai Hub chia sẻ trong nhóm), và các yêu cầu kéo theo (định danh, sandbox, quản trị chi phí, vệ sinh bộ nhớ, độ bền của updater) đang vượt xa các giả định đơn người dùng, đơn máy mà hầu hết codebase được thiết kế xoay quanh. Các dòng phát hành trong toàn hệ sinh thái cho thấy **nợ hồi quy từ vòng lặp nhanh**: OpenClaw 2026.9.6–2026.10.x gây suy giảm khởi động kéo dài nhiều phút, Hermes Agent v0.22.x mang cụm lỗi updater, và đường nâng cấp 2.2.2 của QwenPaw phá vỡ nhiều kênh. Phản ứng bảo mật khá mạnh — QwenPaw phát hành bản khắc phục CA sau phát hành và ZeroClaw đang xếp chồng các PR định danh/kiểm soát truy cập — nhưng ràng buộc kỹ thuật chi phối toàn hệ sinh thái là **thông lượng review của maintainer**, không phải tham vọng tính năng.

---

## 2. So sánh Hoạt động

| Dự án | Issues (cập nhật 24h) | PRs (cập nhật 24h) | Trạng thái Phát hành | Tỷ lệ Merge | Điểm Sức khỏe* |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (167 đóng / 333 mở) | 500 (269 merged / 231 mở) | **v2026.10.6 đã phát hành** (bump Node bảo mật) | 54% merged | 🟡 **Căng thẳng** — tốc độ mạnh, nợ hồi quy P0 nặng (đặc biệt Windows/khởi động) |
| **Hermes Agent** | 50 (1 đóng / 49 mở) | 50 (14 merged / 36 mở) | **v0.22.5 patch** (gộp ~81 PR) | 28% merged | 🟠 **Đang ổn định** — tương tác cao nhưng nhịp phát hành căng; cụm lỗi updater trên Windows |
| **IronClaw** | 2 (1 đóng / 1 mở) | 6 (1 merged / 5 mở) | **Không phát hành** | 17% merged | 🟢 **Ổn định/yên ắng** — chế độ bảo trì; không có bug nào được báo; ARM64 đã đóng |
| **QwenPaw** | 22 (2 đóng / 20 mở) | 50 (2 merged / 48 mở) | **v2.2.2.post1** (khắc phục bảo mật) | 4% merged | 🟠 **Căng thẳng nhưng phản hồi tốt** — refactor quan trọng đang triển khai (#8187), lỗi tầng kênh tập trung |
| **ZeroClaw** | 35 (12 đóng / 23 mở) | 50 (8 merged / 42 mở) | **Không phát hành** (đang phạm vi hóa v0.9.0) | 16% merged | 🟡 **Tắc nghẽn** — chồng PR bảo mật/định danh bị chặn ở năng lực review |

*\*Điểm sức khỏe được tổng hợp từ tỷ lệ merge, số lượng P0/P1 đang mở, và độ ổn định nhịp phát hành. Không phải chỉ số chính thức.*

**Quan sát chính:**
- **OpenClaw hoạt động ở mức gấp 10 lần hoạt động thô** của bất kỳ dự án ngang hàng nào (500 issues + 500 PRs/24h) — quy mô triển khai tham chiếu thực sự.
- **Tỷ lệ merge tương quan nghịch với độ sâu chồng PR**: ZeroClaw (16%) và QwenPaw (4%) cố ý chặn các PR kiến trúc lớn đang chờ review.
- **Chỉ OpenClaw và QwenPaw phát hành hôm nay**; dự án sau là do bảo mật, không phải tính năng.
- **IronClaw là ngoại lệ** — hoạt động tối thiểu và không có bug mở, gợi ý hoặc là độ bền đã được chứng minh hoặc là lượng issue bên ngoài thấp.

---

## 3. Vị thế của OpenClaw

**Lợi thế so với các dự án ngang hàng:**
- **Quy mô & tốc độ.** 500 PR/ngày so với ~50 của Hermes Agent/QwenPaw/ZeroClaw và 6 của IronClaw. OpenClaw merge nhiều PR trong 24 giờ (269) hơn mức IronClaw cập nhật trong một tháng.
- **Hạ tầng phân loại.** Hệ thống nhãn `clawsweeper:*` cung cấp theo dõi mức độ nghiêm trọng/quyền sở hữu có cấu trúc mà các dự án ngang hàng thiếu — tín hiệu trưởng thành cho một dự án ở quy mô này.
- **Vị thế tham chiếu.** Được định vị (theo cách đóng khung của digest) như bản triển khai tham chiếu thực tế; các dự án ngang hàng giải quyết các vấn đề lân cận (Hermes: liên bang hóa cross-gateway; ZeroClaw: tầng định danh) thay vì cạnh tranh trực tiếp.
- **Thông lượng maintainer.** Nhiều PR `ready for maintainer look` từ các maintainer có tên (ví dụ `steipete`) cho thấy một đội ngũ nòng cốt đang hoạt động, không chỉ là khối lượng cộng tác viên.

**Khác biệt về cách tiếp cận kỹ thuật:**
- **Kiến trúc gateway nguyên khối** với các subsystem plugin-load và session-dispatch — đây là nguồn gốc của các hồi quy chặn khởi động (#160959, #160485), nơi 3 plugin kênh tiêu tốn 57.4/60s của pha tải.
- **Ràng buộc phát hành nặng hơn** — yêu cầu runtime Node của v2026.10.6 là ranh giới tương thích cứng mà các dự án ngang hàng không áp đặt.
- **Bề mặt rộng nhất** — hơn 500 issue đang hoạt động trải khắp vòng đời UI, gateway, sandbox, thanh toán và nền tảng, so với các miền hẹp hơn của các dự án ngang hàng.

**So sánh quy mô cộng đồng:**
- Số lượng bình luận trên các issue hàng đầu (43 ở #160959, 27 ở #42475, 18 ở #168955) gợi ý **số lượng người báo cáo hoạt động nhiều hơn một bậc độ lớn** so với Hermes Agent (cao nhất: 40 bình luận nhưng cơ sở hẹp hơn) hoặc ZeroClaw (cao nhất: 15).
- Tuy nhiên, **khối lượng bình luận cao tương quan với các P0 chưa giải quyết** — cộng đồng OpenClaw vừa lớn hơn *vừa* thất vọng hơn so với các dự án ngang hàng, đặc biệt trên Windows và các triển khai tenant lớn.

**Phán quyết:** OpenClaw là **dẫn đầu về quy mô và bản triển khai tham chiếu** của hệ sinh thái, nhưng đang trả giá cho quy mô đó bằng khoản nợ vận hành nghiêm trọng nhất hệ sinh thái. Vị thế của nó vững chắc về mức độ chấp nhận; rủi ro cạnh tranh là **xói mòn độ tin cậy** nếu các cụm khởi động/sleep-wake/Windows tiếp diễn qua một chu kỳ phát hành nữa.

---

## 4. Các Lĩnh vực Kỹ thuật Chung

Năm yêu cầu xuyên suốt nổi lên từ tập dữ liệu 2026-10-23:

| Lĩnh vực | Dự án phát tín hiệu | Nhu cầu cụ thể |
|---|---|---|
| **Định danh & kiểm soát truy cập** | ZeroClaw (#8279 bypass allowlist S0, dashboard OIDC #11965), Hermes (#143399 rò rỉ approval-mode), OpenClaw (#141615 lỗi WebChat auth) | Thực thi allowlist công cụ sub-agent; ranh giới phê duyệt theo profile; định danh dashboard/CLI dựa trên OIDC; cô lập cross-profile |
| **Tính đúng đắn của sub-agent / ủy quyền** | OpenClaw (#172837 rò rỉ nativeSubagentAssignments của Codex), ZeroClaw (#8279, #11225 bảo toàn owner), Hermes (#143399) | Ngữ nghĩa dọn dẹp trên agent lồng nhau; liên tục tác giả xuyên ủy quyền; định tuyến công cụ nhận biết quyền sở hữu |
| **Độ bền của updater / installer** | Hermes (cụm Windows: #143331, #143401, #143326; macOS #143390), OpenClaw (cập nhật managed Windows #172496, #166004), QwenPaw (#8378, #8388 hồi quy nâng cấp) | Đường cập nhật nguyên tử; xử lý PID cũ; di trú config cho bản cài cũ; xác minh theo nền tảng |
| **Quản trị bộ nhớ / ngữ cảnh** | Hermes (#135039 ngân sách bộ nhớ, #116788 vi phạm riêng tư), OpenClaw (#42475 ngân sách chi phí) | Kiểm soát admission tại thời điểm ghi; ngân sách kích thước; thực thi ranh giới riêng tư (đảm bảo cứng, không phải config) |
| **Cô lập sandbox / tiến trình** | ZeroClaw (#11823 bypass shell heredoc, chồng sandbox plugin #11225), QwenPaw (DoS event-loop Feishu #8350, channels-as-plugins #8187), OpenClaw (#160959 chặn plugin lớn) | Cô lập subprocess cho plugin/kênh; tăng cường sync-IO-trong-async; đảm bảo event-loop không chặn |

**Hội tụ đáng chú ý:** **Bốn trong năm dự án** (tất cả trừ IronClaw) có bug mở hoặc PR liên quan đến **tính đúng đắn của sub-agent ủy quyền** và **ranh giới định danh/tool-allowlist**. Đây là điểm đau kiến trúc nhất quán nhất của hệ sinh thái, gợi ý ngành đã chuẩn hóa trên kiến trúc agent lồng nhau mà chưa chuẩn hóa ngữ nghĩa cô lập.

---

## 5. Phân tích Khác biệt

| Chiều | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Trọng tâm tính năng** | Nền tảng trợ lý cá nhân đầy đủ (gateway, plugin, UI, thanh toán) | Hạ tầng bền vững: liên bang cross-gateway, quản trị bộ nhớ | Harness đánh giá / benchmark model | Nhắn tin đa kênh + triển khai nhóm Hub | Bảo mật trước tiên: định danh, SOP, sandbox |
| **Người dùng mục tiêu** | Người dùng cá nhân nâng cao → tenant tự host lớn | Đội multi-Mac, hybrid remote/local, vận hành đa bot | Kỹ sư benchmark, tự host ARM64 | Nhóm/tổ chức nhỏ qua Hub; người dùng đa phương thức nặng | Người vận hành quan tâm bảo mật, triển khai server tối thiểu |
| **Tín hiệu kiến trúc** | Gateway nguyên khối, chặn plugin-load | Split-brain (agent remote + tool local), hợp nhất browser-tool | Hướng benchmark, vệ sinh dependency | Channels-as-plugins với cô lập subprocess (PR #8187) | PR bảo mật xếp chồng, tùy chọn build chỉ CLI (#11971) |
| **Rủi ro đặc thù** | Hồi quy độ trễ khởi động | Xói mòn niềm tin updater | Tín hiệu cộng đồng thấp | Tập trung lỗi tầng kênh | Tắc nghẽn năng lực review trên PR bảo mật |
| **Điểm mạnh đặc thù** | Quy mô + độ trưởng thành phân loại | RFC kiến trúc sâu nhất (luồng liên bang 40 bình luận) | Không có bug được báo, đóng ARM64 | Tốc độ phản hồi bảo mật (sau phát hành <24h) | Báo cáo bug gắn nhãn mức độ nghiêm trọng chính xác |

**Phân kỳ kiến trúc là điểm khác biệt sắc nét nhất:**
- **OpenClaw** đặt cược vào **gateway nguyên khối** — khả năng tối đa, bán kính ảnh hưởng tối đa mỗi bug.
- **Hermes Agent** đang chuyển sang **thực thi tách rời** (não remote/tool local, #18715 với 42 👍) và **liên bang cross-instance** (#97681) — dự án ngang hàng có tham vọng kiến trúc nhất.
- **QwenPaw** đang refactor rõ ràng *rời khỏi* kênh nguyên khối hướng tới **plugin cô lập subprocess** (#8187) — phản hồi trực tiếp cho cùng vấn đề chặn event-loop mà OpenClaw gặp phải (#160959).
- **ZeroClaw** là ngoại lệ **bảo mật bản địa** — định danh, thẩm quyền SOP và sandbox là hạng nhất, không phải gắn thêm.
- **IronClaw** **lấy đánh giá làm trung tâm** — phân loại thất bại hàng ngày của nó (#8153) đóng khung agent như mục tiêu chất lượng model, không phải bề mặt triển khai.

---

## 

---

## Báo cáo chi tiết các dự án cùng phân khúc

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Tổng hợp dự án
**Ngày: 2026-10-23** | Kho lưu trữ: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. Tổng quan hôm nay

Hermes Agent cho thấy **mức độ hoạt động rất cao** với 50 issue và 50 PR được cập nhật trong 24 giờ qua, cùng một bản phát hành vá mới (v0.22.5) gộp khoảng 81 PR đã được merge kể từ v0.22.4. Trình theo dõi issue chủ yếu xoay quanh **các lỗi về độ ổn định và tương thích nền tảng** — đặc biệt là lỗi cài đặt/cập nhật trên Windows, vấn đề trạng thái phiên của gateway, và các lỗi về tính đúng đắn của bộ nhớ/compaction — thay vì các tính năng mới. Với chỉ 1 issue được đóng so với 49 issue vẫn đang hoạt động, và 36 PR vẫn đang mở so với 14 PR đã merge/đóng, các maintainer rõ ràng đang trong **chu kỳ ổn định hóa** trước v0.23.0 được cho là sắp ra mắt. Dự án khỏe mạnh về mức độ tương tác nhưng đang có dấu hiệu **căng thẳng về nhịp độ phát hành**: nhiều người báo cáo độc lập mô tả các lỗi hồi quy của `hermes update` trên Windows, quá trình migration trên macOS, và gắn tag kênh stable, cho thấy tốc độ merge nhanh (~81 PR/chu kỳ) đang vượt xa khả năng kiểm thử hồi quy.

---

## 2. Các bản phát hành

### v0.22.5 — Bản vá (2026-10-22)
- **Loại:** Bản vá / bản phát hành gộp.
- **Nội dung:** Tập hợp khoảng 81 PR đã merge kể từ v0.22.4 thành một bản phát hành ổn định trên GitHub release (CLI + trình cài đặt), ứng dụng Microsoft Store, Docker và Hermes Cloud.
- **Thay đổi phá vỡ tương thích:** Không có tài liệu nào. Đây rõ ràng là một tag ổn định.
- **Lưu ý migration:** Không cần — đây là bản vá thay thế trực tiếp.
- **Lưu ý:** Ghi chú đầy đủ đã được hoãn lại và "sẽ phát hành cùng v0.23.0", nghĩa là người dùng v0.22.5 **không có changelog chi tiết** cho chu kỳ merge. Đây là một khoảng trống tài liệu đáng lưu ý, đặc biệt khi có nhiều lỗi ổn định được báo cáo đối với v0.22.x hôm nay (crash compaction, lỗi cập nhật).

---

## 3. Tiến độ dự án

**PR đã merge/đóng hôm nay (tổng cộng 14):**
- [#143322](https://github.com/NousResearch/hermes-agent/pull/143322) — `fix(setup)`: Quick Setup giờ đây đề nghị *giữ lại* một model được nhập từ agent khác (mặc định "Keep") thay vì âm thầm thay thế bằng Nous Portal. Sửa một vấn đề về niềm tin/UX trong lần chạy đầu tiên.
- [#40016](https://github.com/NousResearch/hermes-agent/pull/40016) — `fix(email)`: Kiểm soát khả năng `ID` của Purelymail IMAP và chấp nhận `Authentication-Results` độc quyền; giữ nguyên tư thế bảo mật fail-closed.
- [#143298](https://github.com/NousResearch/hermes-agent/pull/143298) — Chỉ dành cho kiểm thử: thêm chẩn đoán (frame + DOM timeline artifacts) cho lỗi E2E flake "Stop-flash" không liên tục khi Desktop kết nối lại. Rõ ràng là *chưa* sửa lỗi flake này.

**Công việc đang tiến hành (đang mở, đáng chú ý):**
- [#143146](https://github.com/NousResearch/hermes-agent/pull/143146) — Tái cấu trúc lớn về tự động hóa trình duyệt: hợp nhất chỉ còn `browser_exec`, loại bỏ `agent-browser` và mười công cụ `browser_*` tích hợp, chuyển Camofox thành một plugin trong catalog. Đây là một **đơn giản hóa kiến trúc quan trọng** có khả năng sẽ ra mắt trong v0.23.0.
- [#143412](https://github.com/NousResearch/hermes-agent/pull/143412) — Thêm Bria FIBO 2.0 (dữ liệu có giấy phép, an toàn thương mại) vào catalog FAL của `image_generate`.
- [#143411](https://github.com/NousResearch/hermes-agent/pull/143411) — Thêm HeyGen Video (MiniMax H3, $0.02/s) vào bộ chọn FAL của `video_generate`.
- [#143407](https://github.com/NousResearch/hermes-agent/pull/143407) — Sửa lỗi crash `int(None)` của compaction (xem phần Bugs).
- [#56023](https://github.com/NousResearch/hermes-agent/pull/56023) — Theo từng giai đoạn: chế độ iMessage cục bộ không cần thông tin xác thực cho Photon.

**Đánh giá:** Về chủ đề, tiến độ hôm nay chia đều giữa **mở rộng catalog tạo phương tiện** (hình ảnh/video) và **các bản sửa lỗi tính đúng đắn/hạ tầng**. Việc hợp nhất công cụ trình duyệt là thay đổi hành vi lớn nhất đang được triển khai.

---

## 4. Chủ đề nóng trong cộng đồng

| Hạng | Mục | Tín hiệu | Nhu cầu cốt lõi |
|---|---|---|---|
| 1 | [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — *Cho phép Bot cộng tác xuyên gateway* | 40 bình luận, 4 👍 | **Liên bang hóa agent xuyên instance.** Người dùng muốn các agent cá nhân hợp tác xuyên máy và xuyên chủ sở hữu *mà không từ bỏ quyền kiểm soát* Bot của chính họ. Đây là cuộc thảo luận kiến trúc sâu nhất trong trình theo dõi (mở từ tháng 8). |
| 2 | [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) — *Smart approval tự động phê duyệt `osascript` → mất dữ liệu PowerPoint không thể phục hồi* | 35 bình luận | **Niềm tin/an toàn trong chế độ phê duyệt "smart".** Một tính năng bảo mật ở chế độ mặc định đã phê duyệt một AppleScript phá hoại, xóa dữ liệu chưa lưu của người dùng. Cảm xúc mạnh, mức độ nghiêm trọng cao. |
| 3 | [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) — *Agent từ xa + thực thi công cụ cục bộ* | 29 bình luận, **42 👍** | **Kiến trúc tách rời** (não từ xa, công cụ cục bộ). Mục có lượng reaction cao nhất — nhu cầu mạnh mẽ cho triển khai hybrid cục bộ/từ xa. |
| 4 | [#135039](https://github.com/NousResearch/hermes-agent/issues/135039) — *Thực thi ngân sách bộ nhớ + pipeline chấp nhận tại thời điểm ghi* | 15 bình luận | **Vệ sinh bộ nhớ.** `MEMORY.md`/`USER.md` được inject vào *mọi* lượt; người dùng muốn có ngân sách kích thước và kiểm soát chấp nhận để kiểm soát chi phí/độ trễ. |
| 5 | [#143298](https://github.com/NousResearch/hermes-agent/pull/143298) / [#143342](https://github.com/NousResearch/hermes-agent/pull/143342) | Các PR bot đang hoạt động | Vệ sinh CI và định dạng tự động. |

**Phân tích:** Các issue hàng đầu cho thấy một luận điểm nhất quán của người dùng: **Hermes đang được triển khai như hạ tầng bền vững, hoạt động liên tục** (đội máy, tách rời từ xa+cục bộ, cộng tác đa gateway), điều này làm nổi lên nhu cầu về quản trị (ngân sách bộ nhớ, an toàn phê duyệt) và tính linh hoạt (tách rời từ xa/cục bộ) mà mô hình một máy, một chủ sở hữu hiện tại chưa đáp ứng đầy đủ.

---

## 5. Lỗi & Độ ổn định

Xếp hạng theo mức độ nghiêm trọng (mất dữ liệu / bảo mật > hỏng nền tảng > tính đúng đắn > giao diện):

**🔴 Nghiêm trọng — mất dữ liệu / bảo mật**
- [#141346](https://github.com/NousResearch/hermes-agent/issues/141346) — *Smart approval tự động phê duyệt `osascript` đóng PowerPoint chưa lưu và xóa bản xuất của nó (không thể phục hồi).* macOS, mặc định `approvals.mode=smart`. **Bảo mật + mất dữ liệu.** Chưa thấy PR sửa lỗi.
- [#116788](https://github.com/NousResearch/hermes-agent/issues/116788) — *Trình đánh giá bộ nhớ chạy nền lưu lại một sự kiện mà người dùng đã yêu cầu rõ ràng KHÔNG lưu.* Vi phạm ranh giới riêng tư. Chưa thấy PR sửa lỗi.
- [#143399](https://github.com/NousResearch/hermes-agent/issues/143399) — *Subagent được định tuyến đến profile khác sử dụng chế độ phê duyệt của thành viên phòng, không phải của chính nó.* Rò rỉ ranh giới chế độ phê duyệt trong Group Chat. Chưa thấy PR sửa lỗi.
- [#143364](https://github.com/NousResearch/hermes-agent/issues/143364) — *Tiến độ/thông báo của profile phụ được multiplex gửi qua bot Telegram của profile chính.* Rò rỉ thông tin xuyên profile. Chưa thấy PR sửa lỗi.

**🟠 Cao — lỗi tính đúng đắn âm thầm**
- [#143402](https://github.com/NousResearch/hermes-agent/issues/143402) — *Ghi lại compaction thất bại với `int(None)` trên message id NULL → nén bị loại bỏ âm thầm* (v0.22.x). **PR sửa lỗi đã có: [#143407](https://github.com/NousResearch/hermes-agent/pull/143407).**
- [#142820](https://github.com/NousResearch/hermes-agent/issues/142820) — *`hermes cron run` không tuân theo lệnh dừng khẩn cấp toàn cục (`hermes pause`).* Hồi quy vượt qua kiểm soát an toàn.
- [#139091](https://github.com/NousResearch/hermes-agent/issues/139091) — *Cập nhật stable bị hủy do timeout 10s khi dò `merge-base` dù cả hai commit đều ở cục bộ.* Chặn hoàn toàn việc cập nhật trên các cấu hình bị ảnh hưởng.
- [#143361](https://github.com/NousResearch/hermes-agent/issues/143361) — *`hermes update` để lại các tag release cũ → `--version` báo phiên bản cũ trên checkout đã ở commit phát hành.* Chưa thấy PR sửa lỗi.

**🟠 Cao — hỏng nền tảng Windows (một cụm)**
- [#143326](https://github.com/NousResearch/hermes-agent/issues/143326) — Sai lệch quyền sau cập nhật (gateway admin vs. ứng dụng không phải admin) gây lỗi giao tiếp gateway.
- [#143331](https://github.com/NousResearch/hermes-agent/issues/143331) — *`hermes update` thất bại mọi lần chạy:* `gateway.pid` cũ bên cạnh lock đang bị giữ làm hủy giai đoạn pause; từ chối hạ cấp kênh stable thoát với mã 1.
- [#143401](https://github.com/NousResearch/hermes-agent/issues/143401) — *Gateway chết sau `/update` trong chat* — unlink không được bảo vệ của `.update_output.txt` (WinError 32) hủy khởi động.
- [#142271](https://github.com/NousResearch/hermes-agent/issues/142271) — *Kanban managed_worker bị deadlock khi import numpy trong một plugin memory-provider* (race loader-lock).

**🟡 Trung bình — tính đúng đắn về trạng thái/phiên**
- [#139796](https://github.com/NousResearch/hermes-agent/issues/139796) — `session.resume` trả về `not_found` cho các phiên nguội/bị loại bỏ (không có đường tải nguội).
- [#83047](https://github.com/NousResearch/hermes-agent/issues/83047) — Guard respawn `blocker_auth` giữ một tác vụ kanban sẵn sàng mãi mãi (không có drain).
- [#143414](https://github.com/NousResearch/hermes-agent/issues/143414) — Xoay phiên `/new` làm mất lý luận đang hoạt động (cờ không được đồng bộ lại).
- [#143383](https://github.com/NousResearch/hermes-agent/issues/143383) / [#143382](https://github.com/NousResearch/hermes-agent/issues/143382) — Group Chat đã giải tán hồi sinh / tiếp tục chấp nhận sự kiện trên các bản sao gateway.

**Đánh giá:** **Đường cập nhật trên Windows là hệ thống con mong manh nhất hôm nay** — bốn báo cáo riêng biệt về `hermes update` thất bại. Kết hợp với lỗi migration LaunchAgent trên macOS ([#143390](https://github.com/NousResearch/hermes-agent/issues/143390)), độ bền vững của trình cài đặt/trình cập nhật là ưu tiên ổn định rõ ràng nhất. Các lỗi về phê duyệt và cô lập profile có *mức độ nghiêm trọng* cao nhất (mất dữ liệu, riêng tư), dù chúng thu hút ít báo cáo trùng lặp hơn cụm Windows.

---

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

**Tín hiệu mạnh có khả năng cho v0.23.0 / ngắn hạn:**
- **Cộng tác Bot xuyên gateway** ([#97681](https://github.com/NousResearch/hermes-agent/issues/97681)) — issue có nhiều bình luận nhất; mang tính nền tảng, đã nằm trong "hàng đợi xem xét hiện tại." Có khả năng là mục tiêu đề của v0.23.0.
- **Agent từ xa + thực thi công cụ cục bộ** ([#18715](https://github.com/NousResearch/hermes-agent/issues/18715), 42 👍) — yêu cầu có nhiều reaction nhất; một khả năng định tuyến hybrid. Theo dõi RFC → nguyên mẫu

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# Tổng hợp dự án IronClaw — 2026-10-23

## 1. Tổng quan hôm nay

IronClaw cho thấy **mức độ hoạt động ở mức trung bình, tập trung vào bảo trì** trong hôm nay, với 2 issue và 6 PR được cập nhật trong 24 giờ qua. Dự án vẫn duy trì nhịp kỹ thuật ổn định: **5 trong 6 PR là các bản cập nhật dependency** từ Dependabot, và PR duy nhất được merge/đóng là bản trùng lặp đã bị thay thế bởi một bản cập nhật dependency khác. Đáng chú ý, **không có bản phát hành mới** nào được công bố, và không có PR nào về tính năng hay kiến trúc được đưa vào. Issue mở có nội dung thực chất duy nhất (#8153) là báo cáo phân loại lỗi chất lượng mô hình tự động hàng ngày, trong khi issue đã đóng duy nhất (#3168) giải quyết yêu cầu hỗ trợ ARM64 tồn đọng gần sáu tháng. Nhìn chung, tình trạng dự án có vẻ **ổn định nhưng yên ắng**, không có lỗi nghiêm trọng hay hồi quy nào xuất hiện trong hôm nay.

## 2. Bản phát hành

**Không có bản phát hành mới trong 24 giờ qua.** Không có ghi chú phát hành, thay đổi phá vỡ tương thích hay hướng dẫn di chuyển nào để báo cáo.

## 3. Tiến độ dự án

**PR đã merge/đóng (1):**
- [#8149](https://github.com/nearai/ironclaw/pull/8149) — `chore(deps): bump dompurify from 3.4.12 to 3.4.16` (tạo 2026-10-20, đóng 2026-10-23). PR này đã bị thay thế bởi [#8155](https://github.com/nearai/ironclaw/pull/8155), bản này nâng lên `3.4.17` mới hơn. Tác động thực tế: không có thay đổi chức năng nào ngoài việc vệ sinh dependency thường lệ.

**Issue đã đóng (1):**
- [#3168](https://github.com/nearai/ironclaw/issues/3168) — *Add arm64/aarch64 platform support for Docker builds* đã được đóng vào 2026-10-22/23 sau khi mở từ 2026-05-01. Đây là tín hiệu tiến độ quan trọng nhất hôm nay: nó gỡ rào cản cho việc sử dụng image Docker chính thức của IronClaw trên máy ARM64 (ví dụ: Apple Silicon, Graviton, Raspberry Pi 4/5), nhờ vào hỗ trợ aarch64 sẵn có của Cranelift. Lưu ý: phần tóm tắt issue chỉ loại trừ rõ ràng armv7 (32-bit, được theo dõi trong #1339); không có PR sửa lỗi liên kết nào xuất hiện trong dữ liệu hôm nay, nên maintainer cần xác nhận artifact đóng issue.

**Không có PR phát triển tính năng nào được đẩy tới hôm nay.**

## 4. Chủ đề cộng đồng nổi bật

Hoạt động hôm nay ở mức **tương tác thấp** — tất cả issue và PR đều có **0 bình luận và 0 reaction**, nên không có thảo luận "nóng" thực sự. Xếp hạng theo độ mới và mức liên quan:

- [#8153](https://github.com/nearai/ironclaw/issues/8153) — *Daily ironclaw failure taxonomy — 2026-10-22* (OPEN, 0 bình luận). Phân tích benchmark tự động/biên tập trên `officeqa` nơi DeepSeek-V4-Flash tạo ra 64 tác vụ không đạt, phần lớn được quy cho "lỗi chất lượng mô hình thực sự." **Nhu cầu ẩn sau:** khả năng quan sát chất lượng mô hình liên tục và cơ chế phân loại để tách lỗi mô hình khỏi lỗi harness/công cụ.
- [#3168](https://github.com/nearai/ironclaw/issues/3168) — *arm64/aarch64 Docker support* (CLOSED, 0 bình luận). **Nhu cầu ẩn sau:** tính di động nền tảng cho người tự host và CI trên phần cứng ARM — một chủ đề lặp lại ở các dự án hướng triển khai.
- Các PR Dependabot [#8155](https://github.com/nearai/ironclaw/pull/8155), [#8156](https://github.com/nearai/ironclaw/pull/8156), [#8157](https://github.com/nearai/ironclaw/pull/8157), [#8158](https://github.com/nearai/ironclaw/pull/8158) — thường lệ; không có thảo luận cộng đồng.

**Điểm chính:** Dự án không có tranh luận cộng đồng sôi nổi trong hôm nay; "chủ đề" chính là các cỗ máy tự động về dependency và phân loại lỗi.

## 5. Lỗi & Độ ổn định

**Không có lỗi, crash hay hồi quy nào do người dùng báo cáo trong hôm nay.** Xếp hạng mức độ nghiêm trọng:

| Mức độ | Mục | Trạng thái |
|---|---|---|
| — | Không có issue lỗi đang mở | — |
| Thông tin | [#8153](https://github.com/nearai/ironclaw/issues/8153) ghi nhận lỗi chất lượng mô hình (không phải lỗi sản phẩm) trong `officeqa` với DeepSeek-V4-Flash | Mang tính thông tin; không có PR sửa lỗi |
| Thông tin | [#3168](https://github.com/nearai/ironclaw/issues/3168) hạn chế ARM64 — **đã giải quyết/đóng hôm nay** | Đã đóng; không có PR sửa lỗi liên kết trong tập dữ liệu này |

**Lưu ý:** Việc không có báo cáo lỗi là tín hiệu ổn định tích cực, dù cũng có thể phản ánh lượng issue bên ngoài thấp hơn là độ bền đã được chứng minh.

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

- **Image Docker ARM64/aarch64** ([#3168](https://github.com/nearai/ironclaw/issues/3168)) — nay đã đóng. Nếu chưa được phát hành, đây là ứng viên mạnh cho **changelog của bản phát hành tiếp theo**, vì nó ảnh hưởng trực tiếp đến tương thích triển khai và đã được xác định rõ ràng là khả thi.
- **Hạ tầng benchmark chất lượng mô hình** ([#8153](https://github.com/nearai/ironclaw/issues/8153)) — nhịp phân loại lỗi hàng ngày cho thấy lộ trình đang chú trọng vào **công cụ đánh giá/quan sát mô hình** hơn là các tính năng agent.
- **Hiện đại hóa dependency** (Storybook 10.6.2, Vite 8.1.6, DOMPurify 3.4.17, certifi 2026.10.19) — những điều này báo trước một bản phát hành bảo trì thường lệ; không có tín hiệu tính năng.

**Dự đoán:** Phiên bản tiếp theo nhiều khả năng là **bản phát hành bảo trì + hỗ trợ nền tảng**, với điểm nhấn là khả năng dùng Docker trên ARM64, không có tính năng agent mới đáng kể nào được dữ liệu hôm nay chỉ ra.

## 7. Tóm tắt phản hồi người dùng

Phản hồi trực tiếp từ người dùng hôm nay **rất ít** (không có bình luận trên bất kỳ issue/PR nào). Các điểm đau được suy luận từ tập dữ liệu:

- **Điểm đau (đã giải quyết):** Người dùng trên phần cứng ARM64 không thể chạy image Docker chính thức — rào cản thực tế cho người dùng Apple Silicon và Graviton trên cloud ([#3168](https://github.com/nearai/ironclaw/issues/3168)).
- **Bất mãn (gián tiếp):** Lỗi chất lượng mô hình trên `officeqa` (64 tác vụ không đạt) qua DeepSeek-V4-Flash chỉ ra **lỗ hổng độ tin cậy phía mô hình** hơn là khiếm khuyết sản phẩm ([#8153](https://github.com/nearai/ironclaw/issues/8153)).
- **Tín hiệu hài lòng:** Việc đóng yêu cầu nền tảng đã tồn tại 6 tháng cho thấy maintainer phản hồi với các yêu cầu hạ tầng tồn đọng lâu, điều thường được người dùng tự host đánh giá tích cực.

Không có cảm xúc rõ ràng (tích cực hay tiêu cực) nào được bày tỏ trong bình luận hôm nay.

## 8. Theo dõi tồn đọng

Do số bình luận thấp, rủi ro tồn đọng được đánh giá theo **tuổi và tình trạng chưa giải quyết**:

- [#3168](https://github.com/nearai/ironclaw/issues/3168) — **đã giải quyết hôm nay** sau ~175 ngày mở. Đóng tốt, nhưng thời gian chờ dài cho thấy hạn chế về nguồn lực maintainer cho các yêu cầu hạ tầng.
- [#8153](https://github.com/nearai/ironclaw/issues/8153) — đang mở, 0 bình luận; một **issue phân loại tự động lặp lại** có thể cần maintainer phân loại hoặc quy trình sửa lỗi liên kết để các lỗi chất lượng mô hình phản hồi vào việc chọn mô hình/route.
- Các PR [#8155](https://github.com/nearai/ironclaw/pull/8155), [#8156](https://github.com/nearai/ironclaw/pull/8156), [#8157](https://github.com/nearai/ironclaw/pull/8157), [#8158](https://github.com/nearai/ironclaw/pull/8154) — bốn PR Dependabot đang mở được tạo trong 48h qua; **không có PR nào cần xử lý khẩn**, nhưng chúng sẽ tích tụ nếu không được merge theo lô. Lưu ý [#8155](https://github.com/nearai/ironclaw/pull/8155) thay thế [#8149](https://github.com/nearai/ironclaw/pull/8149) đã đóng, nên reviewer cần tránh làm việc trùng lặp.

**Khuyến nghị:** Maintainer nên (1) xác nhận bản sửa ARM64 thực sự đã được phát hành, (2) merge theo lô các PR dependency đang chờ để tránh hàng đợi phình ra, và (3) cân nhắc liên kết issue phân loại lỗi hàng ngày với quy trình phân loại có thể hành động.

---
*Nguồn dữ liệu: github.com/nearai/ironclaw — bản tổng hợp tạo ngày 2026-10-23. Mọi số liệu phản ánh cửa sổ 24 giờ được cung cấp.*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

QwenPaw đang trong **chu kỳ phát hành tập trung vào bảo mật với mức độ hoạt động cao**. Một bản post-release (`v2.2.2.post1`) đã được phát hành để khắc phục vấn đề tin cậy CA emSign trên các dependency, installer và bản build, kèm theo thông báo bảo mật từ maintainer khuyến nghị tất cả người dùng nâng cấp. Hoạt động diễn ra sôi nổi trên mọi mặt: **50 PR được cập nhật trong 24h (48 vẫn đang mở)** và **22 issue được cập nhật (20 đang mở)**, cho thấy một đợt refactor lớn đang triển khai (channels → plugins, theo PR #8187 và Issue #8289) cùng với lượng backlog ngày càng tăng về các bug liên quan đến channel và Console. Nhìn chung tình hình **tốt nhưng đang căng thẳng** — nhóm rõ ràng đang ưu tiên bảo mật và refactor mở rộng v2.3.0, trong khi một loạt lỗi chức năng do người dùng báo cáo (QQ channel, migration cấu hình model, xóa session) vẫn đang chờ sửa.

---

## 2. Releases

### v2.2.2.post1 (Post-release)
- **PR #8369** — `chore: bump the version to v2.2.2post1` (bởi @cuiyuebing)
- **PR #8370** — `fix(security): remediate emSign CA trust across dependencies, installers, and builds` (bởi @qbc2016)

**Điểm chính:**
- Đây là **bản post-release bảo mật**, không phải bản phát hành tính năng. Bản này xử lý vấn đề tin cậy CA (emSign) ảnh hưởng đến dependency, installer và build artifact.
- **Breaking changes:** Không có thay đổi nào được ghi nhận.
- **Ghi chú migration:** Không yêu cầu — nhưng **khuyến nghị nâng cấp bắt buộc** đã được đưa ra trong [Issue #8385](https://github.com/agentscope-ai/QwenPaw/issues/8385): *"Vui lòng nâng cấp lên QwenPaw 2.2.2.post1 hoặc mới hơn."*
- **Xác minh phát hành:** [Issue #8386](https://github.com/agentscope-ai/QwenPaw/issues/8386) (Release Duty, đã đóng) theo dõi việc xác minh cài đặt trên bốn checkpoint nền tảng.

> ⚠️ **Hành động cho người dùng:** Tất cả người dùng đang dùng 2.2.2 hoặc cũ hơn nên nâng cấp lên 2.2.2.post1 ngay khi có sẵn cho phương thức cài đặt của mình (Desktop installer, PyPI, Docker).

---

## 3. Tiến độ dự án

Khối lượng merge/đóng hôm nay thấp so với hoạt động đang mở — chỉ **2 PR được merge/đóng** và **2 issue được đóng** trong 24h.

**Đã đóng hôm nay:**
- [Issue #8392](https://github.com/agentscope-ai/QwenPaw/issues/8392) — `[question] HUB模式下配置本地模型给成员使用显示异常` (2 bình luận) — được xử lý nhanh, có thể do người dùng cấu hình sai.
- [Issue #8386](https://github.com/agentscope-ai/QwenPaw/issues/8386) — Xác minh cài đặt Release Duty cho v2.2.2.post1.

**Đang triển khai / tiến triển:**
- **PR #8391** ([link](https://github.com/agentscope-ai/QwenPaw/pull/8391)) — `chore: merge Release/v2.2.2post1 into main`, merge-back post-release tiêu chuẩn.
- **PR #8187** ([link](https://github.com/agentscope-ai/QwenPaw/pull/8187), `size/XXXL`) — refactor chủ lực **channels-as-plugins với cô lập subprocess**. Đây là xương sống của nỗ lực v2.3.0 "nhẹ hơn và dễ mở rộng hơn" được công bố trong [Issue #8289](https://github.com/agentscope-ai/QwenPaw/issues/8289).
- **PR #8375** ([link](https://github.com/agentscope-ai/QwenPaw/pull/8375)) — sửa race condition của request cũ sau khi xóa chat (xử lý #8368).
- **PR #8366** ([link](https://github.com/agentscope-ai/QwenPaw/pull/8366)) — vệ sinh license: thay thế **GPL-3.0 `html2text`** bằng converter stdlib để khôi phục tương thích Apache-2.0.

**Diễn giải:** Dự án đang ở giữa quá trình chuyển đổi kiến trúc lớn; việc merge được kiểm soát có chủ đích trong khi refactor đang hoàn thiện, nên thông lượng trên main branch tạm thời bị hạn chế.

---

## 4. Chủ đề cộng đồng nổi bật

| Xếp hạng | Mục | Bình luận | Tín hiệu |
|---|---|---|---|
| 1 | [Issue #8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) — Điểm mở rộng theme cho plugin | 7 | Độ trưởng thành của hệ sinh thái plugin |
| 2 | [Issue #8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) — Sắp có trong v2.3.0: nhẹ hơn & dễ mở rộng hơn | 3 (+1 👍) | Minh bạch roadmap |
| 3 | [Issue #8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) — Composer draft được key theo agent, không theo conversation | 3 | Bug mô hình dữ liệu UX cốt lõi |
| 4 | Nhiều issue có 2 bình luận | — | Tập trung quanh bug channel |

**Phân tích nhu cầu ẩn:**
- **Khả năng mở rộng plugin là chủ đề chiếm ưu thế.** Issue #8071 (theme tokens) và Issue #8289 (roadmap refactor plugin) cùng cho thấy một cộng đồng đã chấp nhận plugin nhưng giờ muốn các điểm tích hợp *sâu hơn* — theming ngữ nghĩa, không chỉ một nút `colorPrimary` duy nhất.
- **Hub/đa người dùng là chủ đề thứ hai.** [Issue #8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) yêu cầu **chia sẻ Skill/MCP toàn cục** cho nhóm — dấu hiệu rõ ràng QwenPaw đang được triển khai trong môi trường tổ chức chia sẻ, không chỉ desktop đơn người dùng.
- **Tương tác với roadmap lành mạnh:** Issue #8289 mời người dùng phản hồi về refactor v2.3.0, và người dùng đang hưởng ứng — dấu hiệu tốt của giao tiếp hai chiều.

---

## 5. Bug & Độ ổn định

Xếp hạng theo mức độ nghiêm trọng (tác động × khả năng tái hiện):

### 🔴 Nghiêm trọng
1. **[Issue #8350](https://github.com/agentscope-ai/QwenPaw/issues/8350) — Feishu channel chặn main event loop; service treo khi mạng không kết nối được.** Triệu chứng: `/api/healthz` timeout, SIGTERM không thể thoát. Đây là **bug thuộc nhóm denial-of-service** — gọi mạng đồng bộ trên main loop. Sync-IO-trong-async là lỗi kiến trúc nghiêm trọng.
   - *PR sửa:* Chưa xác định. **Cần maintainer chú ý.**

2. **[Issue #8388](https://github.com/agentscope-ai/QwenPaw/issues/8388) — QQ channel hỏng sau khi nâng cấp (`No module named '_qwenpaw_remote_backend'`).** Các tool call của agent tự thất bại trên toàn môi trường, cho thấy **đường nâng cấp bị hỏng / thiếu module** trong v2.2.2. Tác động cao — channel hoàn toàn không dùng được.

3. **[Issue #8335](https://github.com/agentscope-ai/QwenPaw/issues/8335) — Request body 48 MB khiến session WeChat kẹt vĩnh viễn.** Media trong lịch sử được upload lại mỗi request, chạm giới hạn body của provider; session trở nên vĩnh viễn không dùng được.
   - *PR sửa:* **[PR #8337](https://github.com/agentscope-ai/QwenPaw/pull/8337)** (ngừng replay media không cần thiết) và **[PR #8299](https://github.com/agentscope-ai/QwenPaw/pull/8299)** (retry không có video khi bị từ chối). ✅ Đang sửa.

### 🟠 Cao
4. **[Issue #8378](https://github.com/agentscope-ai/QwenPaw/issues/8378) — Model call thất bại sau khi nâng cấp** (định dạng config `active_model` trong `agent.json` cũ không còn khớp). Đây là **lỗi regression trong migration config** ảnh hưởng đến các bản cài đã nâng cấp.

5. **[Issue #8359](https://github.com/agentscope-ai/QwenPaw/issues/8359) — Hub-in-container Docker runtime thất bại: readiness probe hardcode 127.0.0.1 (Errno 111).** Phá vỡ chính việc triển khai Hub trong container mà maintainer đã khuyến nghị trong #8256.

6. **[Issue #8343](https://github.com/agentscope-ai/QwenPaw/issues/8343) — Reply cuối của DingTalk bị âm thầm loại bỏ khi `sessionWebhook` hết hạn** (errcode=300001, không có fallback Open API). Mất dữ liệu âm thầm — người dùng không nhận được gì.

### 🟡 Trung bình
7. **[Issue #8078](https://github.com/agentscope-ai/QwenPaw/issues/8078) — Tin nhắn `chat_with_agent` cross-session bị đăng ký thành chat riêng biệt**, tách một session thành nhiều trang UI.
8. **[Issue #8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) — Composer draft được key theo agent thay vì theo conversation**; văn bản chưa gửi rò rỉ qua các conversation.
9. **[Issue #8374](https://github.com/agentscope-ai/QwenPaw/issues/8374) — `QWENPAW_CORS_ORIGINS` đặt qua Web UI/CLI không có tác dụng** (hằng số được đọc lúc import, trước khi env injection).
10. **[Issue #8329](https://github.com/agentscope-ai/QwenPaw/issues/8329) — Telegram bỏ qua `reply_to_message`**; ngữ cảnh trích dẫn bị âm thầm loại bỏ (các channel khác đã implement).
11. **[Issue #8342](https://github.com/agentscope-ai/QwenPaw/issues/8342) — Reply trích dẫn mất định tuyến control-command trong bảy channel** (`/stop` bị coi như traffic thông thường).

### 🟢 Thấp
12. **[Issue #8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)** — Hover group-header sidebar bị chồng chéo (hiển thị).
13. **[Issue #8368](https://github.com/agentscope-ai/QwenPaw/issues/8368)** — Xóa conversation đang hoạt động trả về 404. *PR sửa: [#8375](https://github.com/agentscope-ai/QwenPaw/pull/8375).* ✅
14. **[Issue #8377](https://github.com/agentscope-ai/QwenPaw/issues/8377)** — `pytest` trần bị hủy trong quá trình collection (`import file mismatch: test_backup`) trên bản checkout sạch; chặn gate local của contributor.
15. **[Issue #8372](https://github.com/agentscope-ai/QwenPaw/issues/8372)** — Timeout 120s của Hub AI gateway quá ngắn để xử lý file.

**Đánh giá độ ổn định:** *Channel layer* là tâm chấn của các lỗi — Feishu, QQ, Telegram, DingTalk và WeChat đều có bug đang mở. Điều này càng củng cố lý do cho refactor cô lập channels-as-plugins trong PR #8187.

---

## 6. Yêu cầu tính năng & Tín hiệu roadmap

| Yêu cầu | Issue | Khả năng có trong v2.3.0 |
|---|---|---|
| Lớp override theme ngữ nghĩa cho plugin | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) | Trung bình — phù hợp với refactor plugin |
| Chia sẻ Skill & MCP toàn cục trên Hub | [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) | Trung bình — nhu cầu sử dụng nhóm cao |
| Tắt auto-scroll khi streaming | [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) | Trung bình — nhỏ, độc lập |
| Kiến trúc plugin nhẹ hơn, mô-đun hóa | [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) | **Cao — đã được ấn định cho v2.3.0** |

**Dự đoán:** **Refactor plugin v2.3.0** (Issue #8289, PR #8187) là trọng tâm của bản phát hành tiếp theo. Dự kiến nó sẽ ra mắt cùng với cô lập channel và giảm import SDK trên host-process. Yêu cầu chia sẻ Skill/MCP toàn cục trên Hub là tín hiệu tính năng *mới* mạnh nhất cho việc áp dụng ở cấp doanh nghiệp/nhóm và có thể sẽ có trong một bản minor tiếp theo.

---

## 7. Tổng hợp phản hồi người dùng

**Điểm đau (yếu tố gây không hài lòng):**
- **Regression sau nâng cấp là nỗi thất vọng số 1.** Nhiều issue (#8378 config model, #8388 QQ channel) báo cáo hỏng *sau khi* nâng cấp lên 2.2.2 — loại phản hồi gây tổn hại nhất, vì nó bào mòn niềm tin vào quy trình phát hành.
- **Độ tin cậy channel không đồng đều.** Feishu (event-loop blockage), DingTalk (âm thầm loại bỏ), Telegram (thiếu ngữ cảnh trích dẫn) và QQ (module hỏng) đều cho thấy sự mong manh đặc thù của từng channel.
- **Conversation có media lớn trở nên không dùng được** (WeChat 48 MB body) — lo ngại về khả năng mở rộng cho người dùng thực sự nặng.
- **Khả năng phản hồi của maintainer có vẻ tốt:** Hầu hết issue nhận được 1–3 bình luận trong vòng 1–2 ngày, và một số đã có PR sửa đang mở (#8337,

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

ZeroClaw cho thấy **hoạt động tốc độ cao, tập trung vào bảo mật** trong 24 giờ qua: 35 issue được cập nhật (23 đang mở/hoạt động, 12 đã đóng) và 50 PR được chạm tới (42 đang mở, chỉ 8 đã merge/đóng), không có bản phát hành mới. Tỷ lệ mở/đóng nghiêng về công việc đang mở cho thấy dự án đang trong giai đoạn review-và-tích-lũy tích cực hơn là giai đoạn phát hành — nhiều PR lớn (`size:XL`) đang xếp hàng chờ merge. Các chủ đề chính là **kiểm soát danh tính/truy cập, sandbox plugin, gia cố gateway/dashboard, và hỗ trợ build chỉ CLI**, với một cụm đáng chú ý các mục gắn thẻ `release:v0.9.0` báo hiệu cột mốc tiếp theo đang được định hình ngay lúc này. Một P0 (`#11225` bảo toàn chủ sở hữu bộ nhớ) và nhiều mục bảo mật P1 vẫn đang mở, cho thấy tồn đọng review bảo mật là rào cản chính đối với tiến độ. Nhìn chung sức khỏe dự án **mạnh nhưng bị nghẽn ở thông lượng review của maintainer**.

## 2. Bản phát hành

**Không có bản phát hành mới trong 24 giờ qua.** Không có release note, thay đổi phá vỡ tương thích, hay hướng dẫn migration để báo cáo. Tuy nhiên, hoạt động định hướng mạnh về cột mốc **v0.9.0** sắp tới (nhiều nhãn `release:v0.9.0` mới xuất hiện hôm nay), và vẫn còn công việc v0.8.7/v0.8.6 đang được hoàn tất (ví dụ `#11828` dist image, `#10999` chứng minh plugin Discord).

## 3. Tiến độ dự án

Chỉ 8 PR được merge/đóng trong 24h qua (tiêu đề từng PR đã merge không có trong dữ liệu), nhưng **tập issue đã đóng cho thấy những gì đã landed hoặc được giải quyết**:

- **RFC được chấp nhận & đóng — lịch sử sự kiện phiên chỉ ghi thêm** ([#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)): RFC về replay trạng thái tất định và luồng agent dẫn xuất đã đóng với 13 bình luận. Đây là hướng kiến trúc quan trọng (sự kiện thực thi bền vững) sẽ làm nền tảng cho các tính năng state/replay trong tương lai.
- **Sửa lỗi bảo mật plugin đã đóng** ([#11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357), [#11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)): Lỗi xóa thư mục của `plugin remove` và cổng chặn chiếm dụng tên công cụ plugin đều đã đóng — gia cố sandbox có ý nghĩa cho v0.8.7.
- **Sửa phân loại sai token OIDC** ([#11902](https://github.com/zeroclaw-labs/zeroclaw/issues/11902)): Token hợp lệ không còn bị từ chối là `Misconfigured` trong quá trình fetch JWKS đồng thời.
- **Ổn định CI/build** ([#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558) timeout Cranelift, [#11828](https://github.com/zeroclaw-labs/zeroclaw/issues/11828) OOM dist arm64, [#11928](https://github.com/zeroclaw-labs/zeroclaw/issues/11928) race test gateway bind) đều đã đóng.
- **Vệ sinh test**: [#11806](https://github.com/zeroclaw-labs/zeroclaw/issues/11806) chuyển test `late_tool_search` thành opt-in.
- **Quét advisory** ([#11926](https://github.com/zeroclaw-labs/zeroclaw/issues/11926)): Audit RustSec toàn bộ lockfile được thêm vào quét hàng ngày.

**Tóm lại:** Bảo mật và độ tin cậy CI đã tiến bộ; chồng PR bảo mật lớn (xem §8) vẫn chưa được merge.

## 4. Chủ đề nóng cộng đồng

| Mục | Bình luận | Ý nghĩa |
|---|---|---|
| [Issue #7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — Tracker: Runtime, đăng nhập dashboard và giao hàng gateway | 15 | Tracker lộ trình tổng cho v0.9.0; tương tác cao nhất. Dẫn dắt công việc đăng nhập dashboard OIDC và gateway. |
| [Issue #10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) — RFC: lịch sử phiên chỉ ghi thêm & replay tất định | 13 | Đóng hôm nay. Đồng thuận kiến trúc mạnh; sẽ định hình persistence/observability. |
| [Issue #10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) — Chứng minh cài đặt plugin Discord từ release binary | 9 | Đã xác minh trực tiếp trên v0.8.6 macOS arm64; trở ngại là `status:blocked` về chứng minh đa nền tảng. |
| [Issue #8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — delegate bỏ qua allowlist công cụ của parent | 5 | Bảo mật S0: sub-agent có thể gọi công cụ bị loại trừ. Cập nhật hôm nay, vẫn mở. |

**Nhu cầu ẩn sau:** Cộng đồng đang hội tụ về **ranh giới tin cậy** — agent là ai (danh tính OIDC), được phép làm gì (allowlist công cụ, quyền hạn SOP), và cái gì có thể replay/chứng minh nó đã xảy ra (lịch sử sự kiện). Tracker #7432 đang hoạt động như trung tâm điều phối cho các mối quan tâm này.

## 5. Lỗi & Ổn định

Xếp hạng theo mức độ nghiêm trọng (theo báo cáo trong issue):

**S0 / Nghiêm trọng:**
- [Issue #8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — `delegate` bỏ qua allowlist công cụ của parent; sub-agent gọi công cụ bị loại trừ. *Cập nhật hôm nay, không có PR sửa lỗi cụ thể nào được liệt kê.*

**S1 / Quy trình bị chặn:**
- [Issue #11957](https://github.com/zeroclaw-labs/zeroclaw/issues/11957) — Đăng ký OIDC gửi thông tin xác thực client dạng thô trong header Basic; ký tự dành riêng phá vỡ `client_credentials`/device-grant. **Đã có PR sửa: [#11968](https://github.com/zeroclaw-labs/zeroclaw/pull/11968)** (form-encode trước header Basic).

**S2 / Hành vi suy giảm:**
- [Issue #11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) — Nâng cấp WebSocket gateway thất bại qua listener TLS tích hợp (chat dashboard hỏng).
- [Issue #11962](https://github.com/zeroclaw-labs/zeroclaw/issues/11962) — 64 phiên RPC trực tiếp của daemon không bao giờ được giải phóng khi nhàn rỗi → client từ xa có thể làm cạn kiệt chúng. **PR sửa: [#11964](https://github.com/zeroclaw-labs/zeroclaw/pull/11964)** (thu hồi phiên từ xa mồ côi).
- [Issue #11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) — HTML email gửi đi mang markup thô + URL hình ảnh tùy ý (liên quan XSS).
- [Issue #11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989) — `excluded_tools` theo kênh không bao giờ được áp dụng. **PR sửa: [#11990](https://github.com/zeroclaw-labs/zeroclaw/pull/11990)**.
- [Issue #11970](https://github.com/zeroclaw-labs/zeroclaw/issues/11970) — `agents delete/rename` bỏ qua cascade trạng thái sở hữu và kiểm tra ACP trực tiếp trong build không có gateway.
- [Issue #11823](https://github.com/zeroclaw-labs/zeroclaw/issues/11823) — Shell scanner bỏ qua command substitution trong thân heredoc với delimiter không trích dẫn (vượt qua sandbox).

**S3 / Nhỏ:**
- [Issue #11972](https://github.com/zeroclaw-labs/zeroclaw/issues/11972) — `gateway get-paircode` thoát 0 khi thất bại (gây hiểu nhầm cho automation).
- [Issue #11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987) — Comment `nosemgrep` inline không chặn được cảnh báo Semgrep.
- [Issue #11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969) — Tính năng `metrics`/`embedded-web` kéo cả gateway vào build headless.

**Ghi chú ổn định:** Một mô hình đáng chú ý là **hầu hết lỗi S2 được báo cáo hôm qua và đã có PR sửa hôm nay** (#11968, #11964, #11990) — khả năng phản hồi tốt, nhưng các đường dẫn phiên gateway/runtime và TLS rõ ràng cần thêm độ phủ test trước v0.9.0.

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

Các yêu cầu tính năng mới/đang hoạt động, tập trung mạnh quanh v0.9.0:

- **[#11961](https://github.com/zeroclaw-labs/zeroclaw/issues/11961) Đăng nhập Dashboard với OIDC** + **[#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984) Chat dashboard cho tài khoản không phải admin** — PR [#11965](https://github.com/zeroclaw-labs/zeroclaw/pull/11965) đã triển khai đăng nhập dashboard OIDC. **Rất có thể vào v0.9.0.**
- **[#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971) Build từ source chỉ CLI** (không gateway/dashboard/ACP) — PR [#11974](https://github.com/zeroclaw-labs/zeroclaw/pull/11974)/[#11975](https://github.com/zeroclaw-labs/zeroclaw/pull/11975) đang thúc đẩy. **Có khả năng vào v0.9.0.**
- **[#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992) Template email cho operator + thân HTML đã sanitize cho `send_via`** — đi kèm [#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) (lỗi bảo mật) và PR [#11939](https://github.com/zeroclaw-labs/zeroclaw/pull/11939) (trích dẫn gốc trong trả lời).
- **[#11799](https://github.com/zeroclaw-labs/zeroclaw/issues/11799) Từ chối shell policy nên nói rõ lý do + chấp nhận gợi ý từ operator** — PR [#11983](https://github.com/zeroclaw-labs/zeroclaw/pull/11983) đã triển khai.

**Dự đoán:** v0.9.0 sẽ là bản phát hành **danh tính + tùy chọn triển khai**: OIDC ở mọi nơi (CLI→dashboard), build chỉ CLI, và khả năng giải thích chính sách bảo mật. Các sửa lỗi loại trừ công cụ cấp kênh (`excluded_tools` theo kênh, thu hẹp vai trò người gửi trong [#11068](https://github.com/zeroclaw-labs/zeroclaw/pull/11068)) cũng có vẻ hướng tới v0.9.0.

## 7. Tóm tắt phản hồi người dùng

**Điểm đau được nêu qua issue:**
- **Mặc định bảo mật quá thô / có thể vượt qua**: allowlist bị bỏ qua bởi delegation (#8279), `excluded_tools` theo kênh âm thầm không hoạt động (#11989), shell scanner bị vượt qua qua heredoc (#11823). Người dùng đang chủ động thăm dò và tìm ra lỗ hổng — dấu hiệu của mô hình mối đe dọa đang trưởng thành nhưng cũng cho thấy bề mặt bảo mật phức tạp.
- **Thông báo lỗi không hữu ích cho agent và operator**: từ chối shell trả về chuỗi dẫn xuất bool trần trụi (#11799), thông tin plugin ẩn từ chối cấu hình của runtime ([PR #11811](https://github.com/zeroclaw-labs/zeroclaw/pull/11811)), `plugin_channel_sender_denied` không nêu tên người gửi (#11821, đã đóng). Operator muốn chẩn đoán *có thể hành động*.
- **Cạn kiệt tài nguyên / tính đúng đắn dưới tải**: rò rỉ phiên daemon (#11962), race OIDC trong fetch JWKS (#11902, đã sửa), xử lý retry Telegram 429 ([PR #11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651)). Người dùng chạy ZeroClaw với client từ xa thực và API bị giới hạn tốc độ.
- **Nhu cầu linh hoạt triển khai**: yêu cầu build chỉ CLI (#11971) phản ánh người dùng triển khai trên server tối giản, không muốn gánh nặng gateway/dashboard.

**Tín hiệu hài lòng:** Người dùng đang gửi bug chính xác, tái hiện tốt với nhãn component/severity — cho thấy cộng đồng người dùng gắn bó, nghiêm túc về kỹ thuật chứ không phải người dùng phổ thông. Xác minh trực tiếp plugin Discord trên macOS arm64 (#10999) cho thấy một contributor (JordanTheJet) đang thực hiện kiểm chứng end-to-end thực sự, một dấu hiệu lành mạnh.

## 8. Theo dõi tồn đọng

**Các mục mở lâu / ưu tiên cao cần maintainer chú ý:**

- **[#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)** (mở từ 2026-06-24, bảo mật S0, cập nhật hôm nay) — delegate bỏ qua allowlist. Mở ~4 tháng không có PR sửa liên kết. **Mục mở rủi ro cao nhất.**
- **[#7432](https://github.com/zeroc

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*