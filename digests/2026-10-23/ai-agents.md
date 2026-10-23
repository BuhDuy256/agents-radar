# Bản tin hệ sinh thái OpenClaw 2026-10-23

> Issues: 500 | PRs: 500 | Dự án theo dõi: 5 | Tạo lúc: 2026-10-23 05:33 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## Báo cáo chuyên sâu dự án OpenClaw

# OpenClaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

OpenClaw đang vận hành với thông lượng rất cao hôm nay, với 500 issue và 500 PR được cập nhật trong 24 giờ qua, phản ánh một dự án trưởng thành, có lưu lượng truy cập lớn với maintainer và pipeline triage (bot clawsweeper) tích cực cùng một lượng lớn người dùng tự host. Hoạt động nghiêng về củng cố tính ổn định hơn là tính năng mới: hàng đợi issue chủ yếu là các regression P0/P1 về crash-loop, mất tin nhắn và trạng thái session, trong khi hàng đợi PR chủ yếu do `steipete` và các maintainer khác gộp các bề mặt nội bộ dùng một consumer, sửa lỗi authority trong khôi phục sau khởi động lại, và cải thiện UI/hiệu năng. Dự án đã phát hành **v2026.10.6**, với điểm nhấn là việc bắt buộc nâng cấp runtime Node để vá lỗ hổng chứng chỉ TLS — một bản nâng cấp bắt buộc vì lý do bảo mật. Tín hiệu sức khỏe tổng thể: maintainer phản hồi tốt, nhưng vẫn tồn đọng backlog các regression đặc thù theo nền tảng (Windows, macOS sleep/wake) liên tục tái xuất qua các bản phát hành.

---

## 2. Phát hành

### v2026.10.6 — openclaw 2026.10.6

**Điểm nhấn: Runtime Node đã được vá giờ là bắt buộc.**

- **Thay đổi phá vỡ tương thích/bắt buộc:** OpenClaw giờ yêu cầu **Node 24.22.1+ (nhánh 24)** hoặc **26.12.1+ (nhánh 26)**. Các runtime này từ chối chuỗi TLS được ký bằng khóa chứng chỉ bị xâm phạm đã được đề cập trong các bản phát hành bảo mật Node.js tháng 10 năm 2026.
- **Docker:** các image chính thức giờ đi kèm Node 24.2x (tương thích với nhánh đã được vá).
- **Lưu ý khi nâng cấp:** Các operator đang chạy Node 24.x hoặc 26.x cũ hơn phải nâng cấp Node trước khi cài đặt bản phát hành này, nếu không các chuỗi TLS được ký bằng khóa bị xâm phạm vẫn có thể được chấp nhận. Đây là bản nâng cấp bắt buộc vì lý do bảo mật, không có nội dung tính năng nào được mô tả.

Không có bản phát hành nào khác trong 24 giờ qua.

---

## 3. Tiến độ dự án

**Thông lượng PR:** 259 PR được merge/đóng trong 24 giờ qua so với 241 PR vẫn còn mở — tỷ lệ merge lành mạnh.

Các công việc đã merge/đóng đáng chú ý hôm nay:

- **PR #181200 (đã đóng)** — `fix(compaction): explain empty summary budget failures` — cải thiện thông báo lỗi cho operator khi tóm tắt compaction bị dừng do độ dài/rỗng. [link](https://github.com/openclaw/openclaw/pull/181200)
- **PR #177929 (đã đóng)** — `fix(ui): Show earlier loses keyboard focus while older history loads` — sửa lỗi trợ năng trong Chat. [link](https://github.com/openclaw/openclaw/pull/177929)
- **PR #181191 (đã đóng)** — `fix(control-ui): preserve in-flight MCP app setup` — một thử nghiệm ghi nhận **15–33 yêu cầu `mcp.app.view` trùng lặp** mỗi lần tải lại dashboard đã đăng nhập. [link](https://github.com/openclaw/openclaw/pull/181191)
- **PR #181351 (đã đóng)** — `refactor: fold single-consumer entry and provider surfaces` — dọn dẹp nội bộ trong các plugin provider, không thay đổi gì với người dùng. [link](https://github.com/openclaw/openclaw/pull/181351)
- **PR #181176 (đã đóng)** — `docs: explain plugin-owned database client error recovery` — tài liệu hóa một pattern củng cố sau #146290 (lỗi PG client của plugin có thể làm Gateway chết). [link](https://github.com/openclaw/openclaw/pull/181176)
- **Issue #148308 (đã đóng)** — Mất quyền Tailscale Serve claim sau khi khởi động lại `tailscaled`. [link](https://github.com/openclaw/openclaw/issues/148308)
- **Issue #126836 (đã đóng)** — `sessions.reset` báo thành công mà không tạo window. [link](https://github.com/openclaw/openclaw/issues/126836)
- **Issue #144678 (đã đóng)** — Lỗi scheme host Gateway thủ công trên iOS. [link](https://github.com/openclaw/openclaw/issues/144678)

Các chủ đề đang tiến triển: tính đúng đắn của khôi phục sau khởi động lại (PR #181363, #181373, #181364), authority của memory plugin cho các session subagent/`sessions_send` (PR #181359), và dọn dẹp lazy-loading/hiệu năng trong Control UI (PR #181142, #181334, #181355).

---

## 4. Chủ đề cộng đồng nổi bật

Xếp theo số lượng bình luận:

1. **#160959 [OPEN, P0]** — *Gateway blocks for minutes while capturing large external plugins (2026.9.6 regression)* — 43 bình luận. Event-loop bị treo hàng phút khi khởi động và khi republish prepared-runtime. [link](https://github.com/openclaw/openclaw/issues/160959)
   - **Nhu cầu:** Các regression trong đường dẫn capture plugin-generation là khiếu nại lớn nhất. Người dùng có cây plugin lớn gần như bị chặn hoàn toàn.

2. **#42475 [OPEN, P2]** — *Per-agent cost budget enforcement at the gateway level* — 27 bình luận, 1 👍. [link](https://github.com/openclaw/openclaw/issues/42475)
   - **Nhu cầu:** Operator muốn giới hạn chi tiêu hàng ngày/hàng tháng được thực thi trước khi dispatch model, không cần giám sát bên ngoài. Đã tồn tại lâu (tạo 2026-03) và vẫn là một hạng mục chờ quyết định sản phẩm.

3. **#53763 [CLOSED, P3]** — *Built-in headless browser for reliable web access* — 18 bình luận. [link](https://github.com/openclaw/openclaw/issues/53763)
   - **Nhu cầu:** Loại bỏ sự phụ thuộc mong manh ba lớp (Chrome của người dùng / API bên thứ ba) cho truy cập web.

4. **#168955 [OPEN, P1]** — *Startup regression 2026.10.1: ready ~1030s vs ~410s (Windows); sidecars.control-ui-assets blocks 477s* — 17 bình luận. [link](https://github.com/openclaw/openclaw/issues/168955)
   - **Nhu cầu:** Khởi động trên Windows bị suy giảm ~2,5 lần, xuất phát từ một pha asset sidecar.

5. **#157531 [OPEN, P3]** — *2026.9.7 Fixes Tracker* — 17 bình luận. [link](https://github.com/openclaw/openclaw/issues/157531)

**Phân tích:** Năng lượng của cộng đồng tập trung vào *hiệu năng của các đường dẫn khởi động/runtime* và *các rào chắn vận hành (ngân sách chi phí, thay thế egress/secret)*. Số lượng issue P0 crash-loop cho thấy một lượng lớn người dùng đang chạy các triển khai tồn tại lâu dài với số lượng agent cao (ví dụ #180690 với ~810 agent).

---

## 5. Lỗi & Tính ổn định

Xếp theo mức độ nghiêm trọng/tác động trong các cập nhật hôm nay:

| Issue | Mức độ | Tác động | Có PR sửa? |
|---|---|---|---|
| [#160959](https://github.com/openclaw/openclaw/issues/160959) — Gateway chặn hàng phút khi capture plugin lớn | P0 | Event-loop treo; crash-loop | Không có PR sửa mới |
| [#156712](https://github.com/openclaw/openclaw/issues/156712) — Tiến trình con `openclaw triage` giữ khóa gateway-lifecycle, chặn khởi động lại | P0 | Chặn phát hành | Không có PR sửa mới |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) — Live Docs đi trước bản phát hành (Heartbeat IsolatedSessions) | P0 | Tài liệu/hành vi không khớp | Không |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) — Cooldown thanh toán kéo dài hơn sự cố; khóa cứng ~5h | P0 | Auth/provider | Không |
| [#158592](https://github.com/openclaw/openclaw/issues/158592) — Sau sleep/wake: publish prepared runtime bị timeout, mọi tin nhắn thất bại đến khi khởi động lại | P0 | Mất tin nhắn | Không |
| [#166634](https://github.com/openclaw/openclaw/issues/166634) — Lỗi checkpoint thu hồi muộn khiến agent không khả dụng | P0 | Trạng thái session/mất tin nhắn | Không |
| [#168955](https://github.com/openclaw/openclaw/issues/168955) — Regression khởi động Windows ~1030s | P1 | Crash-loop/chậm | Không |
| [#180690](https://github.com/openclaw/openclaw/issues/180690) — `doctor --fix` OOM heap ở 6 GB với state ~810 agent; 3 lượt, ~110 phút | P1 | Crash-loop | Không |
| [#140010](https://github.com/openclaw/openclaw/issues/140010) — Kết nối lại WebSocket sau sleep/resume trên Windows thất bại 30–60s+ | P1 | Crash-loop | Không |
| [#172837](https://github.com/openclaw/openclaw/issues/172837) — Codex nativeSubagentAssignments không bao giờ được xóa sau khi delivery từ bỏ | P1 | Trạng thái session/mất tin nhắn | Không (repro từ source) |
| [#145690](https://github.com/openclaw/openclaw/issues/145690) — Subagent hoàn thành giải phóng runtime generation; tác vụ lane tiếp theo thất bại trong ~15ms, tin nhắn bị bỏ | P1 | Mất tin nhắn | Không |
| [#160485](https://github.com/openclaw/openclaw/issues/160485) — Tải plugin bị nghẽn CPU khi biên dịch module; 3 plugin channel = 57,4s trong 60s | P1 | Hiệu năng khởi động | Không |
| [#167557](https://github.com/openclaw/openclaw/issues/167557) — Migration plugin bị trì hoãn không bao giờ hội tụ (Linux/npm) | P1 | Ma sát UX | Hướng đã rõ |
| [#166004](https://github.com/openclaw/openclaw/issues/166004) — Gateway scheduled-task trên Windows không khởi động; bản cập nhật 2026.9.8 bị rollback | P0 | Chặn phát hành | Không |
| [#141413](https://github.com/openclaw/openclaw/issues/141413) — Ứng dụng macOS bỏ qua token cho Gateway cục bộ dùng SecretRef | P0 | Auth | Không |
| [#141615](https://github.com/openclaw/openclaw/issues/141615) — WebChat kẹt "Authenticated profile verification is unavailable" làm tê liệt mọi RPC | P0 | Chặn phát hành | Có PR liên kết đang mở |

**Các pattern đáng chú ý:**
- **Windows là điểm đau tái diễn**: #168955, #140010, #157812, #166004, #155359 (giao dịch ghi SQLite giữ 5,9–33,2s vượt `busy_timeout=5000ms`).
- **Khôi phục sleep/wake mong manh** trên cả macOS (#158592) và Windows (#140010).
- **Lỗi vòng đời runtime-generation** (#145690, #172837) đang gây mất tin nhắn âm thầm trong luồng subagent/delegation.
- **Migration schema memory/DB** ở quy mô lớn (#180690) dễ bị OOM.
- Rất ít trong số các P0 này có PR sửa mới hôm nay — một khoảng trống về sự chú ý của maintainer cho các lỗi thuộc nhóm crash-loop.

---

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

Các yêu cầu tính năng đang hoạt động và hướng khả thi:

1. **#42475 — Thực thi ngân sách chi phí theo từng agent tại gateway** (P2, chờ quyết định sản phẩm). Nhu cầu mạnh từ operator; phù hợp tự nhiên cho một bản phát hành tương lai nhờ đã có tracking `session-cost-usage.ts`.
2. **#180139 (PR, đang mở) — Bundle plugin Knowledge memory** — plugin bộ nhớ có bằng chứng sẽ đi kèm core, mặc định tắt. Tín hiệu lộ trình mạnh hướng tới *bộ nhớ hạng nhất*. [link](https://github.com/openclaw/openclaw/pull/180139)
3. **#71142 — Giới hạn kích thước upload của Control UI có thể cấu hình** (hiện đang hardcode 5MB). [link](https://github.com/openclaw/openclaw/issues/71142)
4. **#71330 — File đích promotion memory có thể cấu hình** (hiện đang hardcode `MEMORY.md`, chịu cắt ngắn bootstrap 12KB). [link](https://github.com/openclaw/openclaw/issues/71330)
5. **#144306 — Gửi automation đến một node đã ghép nối** (kết quả theo lịch dưới dạng thông báo ứng dụng). [link](https://github.com/openclaw/openclaw/issues/144306)
6. **#138279 — Bản dựng companion Linux aarch64 (deb + AppImage)**. [link](https://github.com/openclaw/openclaw/issues/138279)
7. **#181375 (PR, đang mở) — CLI `gateway lanes` cho RPC `diagnostics.lanes`** — tinh chỉnh chẩn đoán hướng operator; có khả năng sẽ sớm vào. [link](https://github.com/openclaw/openclaw/pull/181375)
8. **#80638 — Biến `MAX_OVERFLOW_COMPACTION_ATTEMPTS` thành cấu hình được** (hiện hardcode 3; mỗi lần thử đều tính phí). [link](https://github.com/openclaw/openclaw/issues/80638)

**Dự đoán cho bản phát hành tiếp theo (2026.10.7+):** bundling plugin liên quan bundled/logbook (#180139), CLI chẩn đoán gateway (#181375), và tiếp tục sửa tính đúng đắn của khôi phục sau khởi động lại (#181363/#181373/#181364). Thực thi ngân sách chi phí (#42475) khả năng cao là hạng mục lộ trình 2026.11 do trạng thái mở lâu dài và tag chờ quyết định

---

## So sánh chéo hệ sinh thái

# Báo cáo so sánh liên dự án — Hệ sinh thái mã nguồn mở Trợ lý AI cá nhân / Agent
**Cửa sổ dữ liệu:** 2026-10-23 | **Dự án:** OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Tổng quan hệ sinh thái

Năm dự án được phân tích trải rộng trên một phổ trưởng thành rất rộng — từ OpenClaw, dự án chủ lực tự vận hành với thông lượng cao (~500 issue/PR được cập nhật mỗi ngày, bắt buộc nâng cấp runtime do vấn đề bảo mật) cho đến IronClaw đang trong giai đoạn bảo trì gần như đóng băng (tổng cộng 8 mục, chỉ có PR từ Dependabot). Trên toàn hệ sinh thái, chủ đề kỹ thuật chi phối trong tháng 10/2026 là **gia cố thay vì mở rộng**: khắc phục vòng lặp crash/mất tin nhắn trên Windows và các đường sleep/wake (OpenClaw, Hermes, QwenPaw), thực thi identity/principal-scope trong triển khai đa tenant (ZeroClaw), và độ tin cậy của channel-adapter (QwenPaw, ZeroClaw). Một chủ đề thứ cấp nhưng dai dẳng là **quản trị bộ nhớ** — ngân sách ghi, mục tiêu promotion, và ranh giới riêng tư — xuất hiện độc lập ở OpenClaw, Hermes và QwenPaw. Các sự kiện bảo mật (Node TLS bị xâm phạm ở OpenClaw; emSign CA ở QwenPaw) đã dẫn đến hai bản phát hành buộc nâng cấp trong vòng 24 giờ, cho thấy vệ sinh chuỗi cung ứng giờ đây là mối quan tâm hàng đầu khi phát hành.

---

## 2. So sánh mức độ hoạt động

| Dự án | Issue được cập nhật (24h) | PR được cập nhật (24h) | Tỷ lệ merge (PR đã merge/đã cập nhật) | Trạng thái phát hành (24h) | Tín hiệu sức khỏe |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | 259 đã merge / 500 (≈52%) | **v2026.10.6** — bắt buộc nâng cấp Node runtime (TLS bị xâm phạm) | Thông lượng mạnh; tồn đọng P0 dai dẳng (Windows, sleep/wake, runtime-gen) chưa có PR sửa |
| **Hermes Agent** | 50 | 50 | 15 đã merge / 50 (30%); 0 issue đã đóng | **v0.22.5** — tổng hợp ~81 PR trước v0.23.0 | Đà phát triển tính năng mạnh; chất lượng đường phát hành/cập nhật là rủi ro chính |
| **IronClaw** | 2 | 6 | 1 đã merge (Dependabot bị thay thế) | **Không có** | Ổn định nhưng vận tốc thấp; chỉ bảo trì; đóng góp từ con người gần như tạm dừng |
| **QwenPaw** | 22 | 50 | 2 đã merge / 50 (4%) | **v2.2.2.post1** — hotfix bảo mật emSign CA | Phản hồi nhanh với bảo mật; nút thắt băng thông review PR nghiêm trọng; cụm lỗi hồi quy khi nâng cấp |
| **ZeroClaw** | 34 | 50 | 8 PR đã merge/đóng; 11 issue đã đóng | **Không có** (ổn định trước v0.9.0) | Khối lượng cao; rủi ro thông lượng merge do các PR bảo mật XL xếp chồng |

**Đọc tổng hợp:** Chỉ OpenClaw thể hiện pipeline khối lượng lớn cân bằng. QwenPaw và ZeroClaw có khối lượng *đầu vào* cao nhưng *đầu ra* hạn chế — nút thắt review kinh điển trước phát hành major. Hermes đang giữa chu kỳ giữa các bản vá ổn định. IronClaw thực tế đang nghỉ ở các công việc do con người dẫn dắt.

---

## 3. Vị thế của OpenClaw

**Lợi thế so với các dự án cùng nhóm:**
- **Thông lượng ở quy mô lớn:** 500 issue + 500 PR được cập nhật trong 24h — gấp khoảng 10 lần Hermes và QwenPaw, và khoảng 15 lần ZeroClaw. 259 PR merge/24h là không đối thủ.
- **Hạ tầng triage có kỷ luật:** Bot `clawsweeper` tự động với nhãn `impact`/`severity` tạo ra backlog có thể phân tích bằng máy — dấu hiệu trưởng thành mà không dự án nào sánh được.
- **Nhịp độ release engineering:** Phát hành bản release có tên tính năng (v2026.10.6) kèm ghi chú migration rõ ràng, trong khi Hermes hoãn ghi chú được chọn lọc sang bản minor tiếp theo (v0.23.0) và QwenPaw/ZeroClaw đang giữa chu kỳ.
- **Độ rộng hệ sinh thái:** Plugin trình duyệt, google-meet, Node companion, Teams — bề mặt tích hợp rộng hơn bất kỳ dự án cùng nhóm nào.

**Khác biệt về cách tiếp cận kỹ thuật:**
- OpenClaw là **kiến trúc nặng nhất / dễ cắm nhất** trong nhóm: plugin-generation capture, thiết lập MCP app, xuất bản prepared-runtime, gateway lanes, các pha sidecar asset. Sức mạnh này cũng là điểm yếu — chính độ phức tạp plugin/capture tạo ra tình trạng tắc event-loop P0 (#160959) và hồi quy khởi động trên Windows (#168955) mà các dự án gọn nhẹ hơn không có.
- Hermes và QwenPaw chia sẻ mô hình gateway/plugin của OpenClaw nhưng với ít tầng kiến trúc hơn; ZeroClaw đánh đổi độ rộng lấy thiết kế ưu tiên bảo mật theo principal-scope; IronClaw là một artifact nhỏ hơn dựa trên Rust/Cranelift.

**So sánh quy mô cộng đồng:**
- OpenClaw rõ ràng là **tham chiếu của cả hạng mục** — số bình luận issue (43 ở #160959, 27 ở #42475) và các luồng thảo luận vận hành lâu dài cho thấy một cộng đồng người dùng power-user tự vận hành lớn, chạy hàng trăm agent (ví dụ: triển khai ~810 agent). Các dự án cùng nhóm vận hành ở mức ~1/10 lượng người tham gia.
- Tuy nhiên, **xét theo cường độ reaction**, Hermes vượt trội so với quy mô của mình: #18715 có 👍42, cao hơn bất kỳ mục OpenClaw nào trong bộ dữ liệu hôm nay — gợi ý một cộng đồng nhỏ hơn nhưng gắn bó về mặt ý tưởng hơn.

---

## 4. Các lĩnh vực kỹ thuật chung

| Yêu cầu | Dự án | Nhu cầu cụ thể |
|---|---|---|
| **Quản trị bộ nhớ / ngân sách ghi** | OpenClaw (#71330, #42475), Hermes (#135039, #116788), QwenPaw (#8376 PowerContext) | Mục tiêu promotion theo từng file, pipeline ngân sách/acceptance khi ghi, ranh giới riêng tư ngăn chặn lưu trữ bị cấm |
| **Truy cập theo principal-scope & thực thi quyền** | ZeroClaw (#8279, #11220, #11230, #11327), OpenClaw (#141413 SecretRef, #151112 vòng lặp phê duyệt) | Identity scope đầu-cuối — các triển khai hiện tại chỉ thực thi một phần (delegate bypass, approval-loop-toil) |
| **Độ tin cậy channel-adapter / ngữ nghĩa trả lời** | QwenPaw (#8342, #8329, #8343 — 4 trong 13 bug đặc thù theo channel), ZeroClaw (#11821, #11989) | Định tuyến trả lời trích dẫn, loại bỏ silent-drop, lọc tool theo channel, nhận diện người gửi trong log |
| **Phê duyệt an toàn / lớp lệnh phá hủy** | Hermes (#141346 mất dữ liệu osascript), OpenClaw (#151112) | Phân biệt lệnh tự động hóa OS/phá hủy với sử dụng tool thông thường; ngăn chế độ "smart" tự động phê duyệt hành động phá hủy dữ liệu |
| **Độ bền đường cập nhật** | Hermes (#143331, #143401, #143361), QwenPaw (#8388, #8378), OpenClaw (buộc nâng cấp Node) | Cập nhật tự phục hồi, độ tin cậy installer đa nền tảng (đặc biệt Windows), báo cáo phiên bản chính xác |
| **Khởi động / hiệu năng ở quy mô lớn** | OpenClaw (#168955, #160485), QwenPaw (PR #8244, cải thiện 15,1 giây khởi động) | Loại bỏ tắc event-loop, profiling CPU khi tải plugin, hồi quy khởi động riêng trên Windows |
| **Cộng tác liên gateway / liên bang** | Hermes (#97681, 👍4), ZeroClaw (OIDC đa principal), OpenClaw (tự chủ xuyên chủ sở hữu) | Agent cá nhân liên bang mà không mất quyền kiểm soát của từng chủ sở hữu với model/tool/bộ nhớ/thông tin xác thực |
| **Triển khai tối giản / headless** | ZeroClaw (#11971, #11969), OpenClaw (chỉ CLI), IronClaw (triển khai ARM64) | Bản build chỉ CLI, cô lập feature-flag để ngăn gateway lẫn vào artifact headless |

**Tín hiệu:** Bốn trong năm dự án độc lập nêu bật quản trị bộ nhớ và thực thi phạm vi quyền. Những điều này đang hội tụ thành **yêu cầu tối thiểu bắt buộc**, không còn là điểm khác biệt.

---

## 5. Phân tích khác biệt hóa

| Chiều | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Trọng tâm tính năng** | Rộng nhất: gateway, MCP, delegation, memory-core, trình duyệt | Danh mục media-gen (FAL/HeyGen), kanban, delegation, cộng tác liên gateway | Artifact Rust nhẹ; đánh giá benchmark/model (`officeqa`) | Tách plugin/channel (v2.3.0), triển khai nhóm Hub, bộ nhớ PowerContext | Ưu tiên bảo mật: OIDC, delegation theo principal-scope, vòng đời bền vững Goal Mode |
| **Người dùng mục tiêu** | Power operator tự vận hành, chạy đội agent lớn | Developer/kiến trúc sư muốn agent cá nhân liên bang | Người dùng đánh giá/benchmark; dấu chân triển khai hẹp | Desktop một người dùng → đang hình thành persona nhóm/Hub | Operator đa tenant / doanh nghiệp quan tâm bảo mật |
| **Kiến trúc** | Plugin đa tầng nặng + gateway + runtime-generation + sidecar | Gateway + bộ điều phối kanban + plugin hook; nhạy cảm với nhịp LLM | Rust + Cranelift (aarch64 native); bề mặt tối thiểu | Lõi Python + plugin channel cô lập qua subprocess (định hướng v2.3.0) | Rust; trạng thái phiên event-sourced chỉ ghi thêm (#10526); mô hình truy cập theo principal-scope |
| **Tư thế bảo mật** | Phản ứng nhanh (nâng cấp TLS) nhưng vòng lặp phê duyệt làm hao mòn tính tự chủ | Mô hình tin cậy đang bị lung lay (#141346) | Chỉ vệ sinh dependency (dompurify) | Buộc nâng cấp bảo mật (emSign) nhưng dễ hồi quy | **Chủ động nhất** — các PR bảo mật xếp chồng, allowlist containment, OIDC-native |
| **Đặt cược khác biệt** | Độ rộng & hệ sinh thái tích hợp | Cộng tác liên chủ sở hữu/liên bang + media-gen | Vòng lặp chất lượng model dựa trên benchmark | Persona triển khai nhóm/Hub | Identity/access làm tầng nền tảng |

**Tương phản chính:** ZeroClaw là dự án duy nhất coi **identity và kiểm soát truy cập là trung tâm kiến trúc**; OpenClaw coi **độ rộng tích hợp** là hào bảo vệ; Hermes là dự án duy nhất thiết kế nghiêm túc **liên bang xuyên gateway**; QwenPaw là dự án duy nhất chuyển hướng rõ rệt từ desktop một người dùng sang **persona nhóm/Hub**; khác biệt của IronClaw (bộ benchmark + Rust/Cranelift) hẹp và hiện chưa được khai thác.

---

## 6. Đà cộng đồng & độ trưởng thành

**Tầng 1 — Khối lượng lớn, trưởng thành, tự duy trì (OpenClaw):**
- Pipeline merge cân bằng (tỷ lệ merge 52%), triage tự động, phát hành phản hồi nhanh với bảo mật.
- Rủi ro: lớp P0 crash-loop dai dẳng không có PR sửa kèm theo; Windows và sleep/wake luôn là mắt xích yếu nhất.

**Tầng 2 — Vận tốc cao, trước phát hành major, nhiều contributor (Hermes, ZeroClaw, QwenPaw):**
- **Hermes:** Lặp nhanh; 0 issue đóng so với 50 đang hoạt động nghĩa là backlog đang tăng. Nhiều bug đã có PR sửa — vòng phản hồi lành mạnh. Cửa sổ ổn định v0.23.0.
- **ZeroClaw:** *Tham vọng kiến trúc* cao nhất (phiên event-sourced, Goal Mode). Nút thắt là **các PR bảo mật XL xếp chồng làm mới mỗi ngày mà không merge** — vấn đề sắp xếp tích hợp, không phải vấn đề đóng góp.
- **QwenPaw:** *Tín hiệu sức khỏe contributor* mạnh nhất (contributor lần đầu mang PR XXXL: #8376, #8345, #8328) nhưng **tỷ lệ merge PR 4%** là ràng buộc băng thông review sắc nét nhất của hệ sinh thái. Yêu cầu cũ nhất chưa được xử lý đã 57 ngày (#7339).

**Tầng 3 — Vận tốc thấp / chế độ bảo trì (IronClaw):**
- Ho

---

## Báo cáo chi tiết các dự án cùng phân khúc

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Bản tin dự án
**Ngày:** 2026-10-23 | **Repo:** [github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. Tổng quan hôm nay

Hermes Agent tiếp tục duy trì tốc độ hoạt động cao: **50 issue và 50 PR được cập nhật trong 24 giờ qua**, với 15 PR đã merge/đóng và 35 PR vẫn đang mở. Một bản patch (**v0.22.5**) đã gom khoảng 81 PR đã merge vào một tag ổn định trước thềm v0.23.0. Đáng chú ý, **không có issue nào được đóng** hôm nay so với 50 issue đang hoạt động — backlog mở tiếp tục tăng nhanh hơn tốc độ xử lý, và phần lớn hoạt động hôm nay tập trung vào **các báo cáo lỗi liên quan đến lộ trình cập nhật v0.22.x và độ ổn định của gateway** (lỗi cập nhật trên Windows, khôi phục phiên, crash khi compaction). Tốc độ phát triển của chính dự án ("hàng nghìn commit mỗi tuần") giờ đây cũng trở thành một chủ đề lặp lại trong cộng đồng, xuất hiện cả dưới dạng yêu cầu tính năng (tự động sửa lỗi khi cập nhật) lẫn nguyên nhân gốc của cụm lỗi liên quan đến cập nhật.

**Đánh giá sức khỏe dự án:** Đà phát triển tính năng rất mạnh (model media FAL mới, delegation, kanban), nhưng **chất lượng bản phát hành và độ ổn định của cơ chế cập nhật là tín hiệu rủi ro chính trong tuần này.**

---

## 2. Bản phát hành

### v0.22.5 — Bản Patch (22/10/2026)
> "Bản patch. Tag này gom khoảng 81 PR đã merge kể từ v0.22.4 thành một bản phát hành ổn định cho GitHub release (CLI và trình cài đặt), ứng dụng Microsoft Store, Docker và Hermes Cloud. Ghi chú đầy đủ cho giai đoạn này sẽ đi kèm v0.23.0."

- **Thay đổi:** Tổng hợp khoảng 81 PR đã merge; không có changelog chi tiết từng mục trong bản này.
- **Thay đổi phá vỡ tương thích:** Không có tuyên bố nào cho bản patch này.
- **Ghi chú migration:** Không yêu cầu. Ghi chú đầy đủ sẽ có ở v0.23.0.
- **Lưu ý đáng cảnh báo:** Bản phát hành này *diễn ra đồng thời với* một cụm lỗi mới liên quan đến lộ trình cập nhật (xem §5), trong đó một số báo cáo cho thấy chính cơ chế cập nhật bị lỗi trên Windows và trên các bản checkout cục bộ. Người dùng ở kênh pinned/stable nên theo dõi các PR sửa lỗi (#143407, và các vấn đề về update-tag/merge-base) trước khi tin dùng `hermes update`.

---

## 3. Tiến độ dự án (PR đã Merge / Đóng hôm nay)

15 PR đã được merge hoặc đóng. Các điểm nổi bật trong dữ liệu:

| PR | Loại | Tóm tắt | Link |
|---|---|---|---|
| #143322 | Bug (ĐÃ ĐÓNG) | **Quick Setup** giờ đây ghi nhận việc import từ agent khác và đề nghị giữ lại model đã import (Keep = mặc định) thay vì âm thầm thay thế bằng Nous Portal. Sửa lỗi auth/config khó chịu cho người dùng lần đầu. | [#143322](https://github.com/NousResearch/hermes-agent/pull/143322) |
| #40016 | Bug (ĐÃ ĐÓNG) | **Email gateway** tương thích với Purelymail: kiểm soát lệnh IMAP `ID` dựa trên khả năng hỗ trợ của server và chấp nhận header `Authentication-Results` độc quyền (fail-closed). | [#40016](https://github.com/NousResearch/hermes-agent/pull/40016) |
| #96932 | Bug (ĐÃ ĐÓNG) | **Tính nhất quán của vision runtime** sau khi restore — công bố lại runtime chính cho các consumer phụ trợ, định danh provider/model nguyên tử, bảo toàn prompt-cache. | [#96932](https://github.com/NousResearch/hermes-agent/pull/96932) |
| #99372 | Bug (ĐÃ ĐÓNG) | **Dispatch board mặc định của Kanban** được làm an toàn/bền vững — `--dry-run` giờ là bản xem trước thực sự không ghi qua snapshot SQLite trong bộ nhớ; worker dispatcher được định tuyến qua đường dẫn trạng thái thoát `chat -Q`. | [#99372](https://github.com/NousResearch/hermes-agent/pull/99372) |
| #96733 | Bug (ĐÃ ĐÓNG, trùng lặp) | **Vòng lặp goal của Kanban** giờ tôn trọng cờ `transport_failed` của judge thay vì bỏ qua nó. | [#96733](https://github.com/NousResearch/hermes-agent/pull/96733) |

**Định hướng:** Đợt này chủ yếu tập trung vào **ổn định các subsystem kanban, vision và gateway** thay vì ra mắt tính năng mới — nhất quán với đợt ổn định trước v0.23.0.

---

## 4. Chủ đề nóng trong cộng đồng

Xếp hạng theo số bình luận / reaction:

**1. [#97681 — Cho phép Bot cộng tác xuyên gateway](https://github.com/NousResearch/hermes-agent/issues/97681)** · 40 bình luận · 👍4 · P3 · `needs-decision`
Issue được thảo luận nhiều nhất. Đề xuất nền tảng cho **cộng tác Bot xuyên gateway, xuyên chủ sở hữu** trong khi vẫn bảo toàn quyền kiểm soát của từng chủ sở hữu đối với model, tool, memory và credential. Được gắn tag `sweeper:risk-session-state` và `sweeper:risk-message-delivery` — cho thấy maintainer nhận thấy ảnh hưởng đến session/message-delivery. Nhu cầu cốt lõi: người dùng muốn *personal agent liên bang* mà không phải từ bỏ quyền tự chủ — đây là vấn đề identity/trust hơn là vấn đề transport.

**2. [#141346 — Smart approval tự động phê duyệt `osascript` xóa một file PowerPoint chưa lưu (mất dữ liệu)](https://github.com/NousResearch/hermes-agent/issues/141346)** · 35 bình luận · P3 · `type/security`
Một lỗi an toàn nghiêm trọng và cụ thể: chế độ phê duyệt "smart" đã bật đèn xanh cho một AppleScript điều khiển PowerPoint đang mở của người dùng để đóng bản trình bày chưa lưu và xóa file export — mất dữ liệu không thể khôi phục. Mức độ cảm xúc cao và là thách thức trực tiếp đối với mô hình tin cậy của `approvals.mode = smart`. Nhu cầu cốt lõi: **heuristic phê duyệt cần một lớp nghiêm ngặt hơn cho các lệnh tự động hóa OS / có tính phá hủy.**

**3. [#18715 — Hỗ trợ remote Hermes agent với thực thi tool cục bộ](https://github.com/NousResearch/hermes-agent/issues/18715)** · 29 bình luận · 👍42 (số reaction cao nhất)
Mục được upvote nhiều nhất trong tập hợp. Người dùng muốn một **agent từ xa với thực thi tool cục bộ** (skill/memory/model ở xa; thao tác file/terminal chạy cục bộ). Đây là yêu cầu kiến trúc tách rời, xuất phát từ nhu cầu về quyền riêng tư và phân bổ compute.

**4. [#135039 — Thực thi ngân sách memory + pipeline chấp nhận cho MEMORY.md / USER.md](https://github.com/NousResearch/hermes-agent/issues/135039)** · 15 bình luận
Yêu cầu kiểm soát ngân sách/chấp nhận tại thời điểm ghi cho các file memory, vì chúng được chèn vào **mọi** lượt (độ trễ + chi phí). Nhu cầu cốt lõi: vệ sinh memory hiện đang không được quản lý.

**5. [#83047 — Guard respawn `blocker_auth` giam một task sẵn sàng vĩnh viễn](https://github.com/NousResearch/hermes-agent/issues/83047)** · 9 bình luận · P2
Dispatch Kanban có thể bỏ rơi một task vĩnh viễn — nhánh respawn dạng auth không phải là cooldown hữu hạn, nên công việc sẵn sàng không bao giờ được xử lý. Đây là lỗi correctness/liveness.

---

## 5. Lỗi & Độ ổn định

Xếp hạng theo mức độ nghiêm trọng. **Một số đã có PR sửa lỗi đang mở.**

**🔴 Nghiêm trọng — mất dữ liệu / lộ trình cập nhật bị hỏng**

- **[#141346](https://github.com/NousResearch/hermes-agent/issues/141346)** · P3 · *Bảo mật/mất dữ liệu* — Smart approval tự động chạy `osascript` → tài liệu chưa lưu của người dùng bị phá hủy. **Chưa có PR sửa lỗi.** Vấn đề tin cậy gốc rễ trong bộ phân loại smart-approval.
- **[#143331](https://github.com/NousResearch/hermes-agent/issues/143331)** · P2 · *Windows* — `hermes update` thất bại **mọi lần chạy**: một `gateway.pid` cũ nằm cạnh lock đang giữ khiến giai đoạn tạm dừng gateway bị hủy (+ từ chối hạ cấp kênh stable thoát với mã 1). Update gần như không dùng được với người dùng bị ảnh hưởng.
- **[#143401](https://github.com/NousResearch/hermes-agent/issues/143401)** · P2 · *Windows* — Gateway **chết ngay sau khi cập nhật từ trong chat**; lệnh `unlink` `.update_output.txt` không được bảo vệ (WinError 32) hủy khởi động.
- **[#143402](https://github.com/NousResearch/hermes-agent/issues/143402)** · P2 — Ghi ngược compaction thất bại với `int(None)` trên message id NULL; **kết quả nén bị âm thầm bỏ đi** (phiên vẫn đầy, kích hoạt lại mỗi lượt). **✅ PR sửa lỗi đang mở: [#143407](https://github.com/NousResearch/hermes-agent/pull/143407).**

**🟠 Cao — phá hủy phiên/lượt & correctness**

- **[#136713](https://github.com/NousResearch/hermes-agent/issues/136713)** · P2 — Gắn lại dashboard chat (PTY/WS churn) **ngắt cứng lượt đang xử lý**; phiên đóng với `end_reason=tui_shutdown`. Công việc bị phá hủy.
- **[#139796](https://github.com/NousResearch/hermes-agent/issues/139796)** · P2 — `session.resume` trả về `not_found` cho mọi phiên không nằm trong registry bộ nhớ của backend (phiên lạnh hoặc phiên sống bị orphan-reaper đuổi).
- **[#142271](https://github.com/NousResearch/hermes-agent/issues/142271)** · P2 · *Windows* — Worker quản lý bởi Kanban **deadlock một cách tất định** khi import numpy trong plugin memory-provider (race loader-lock).
- **[#116788](https://github.com/NousResearch/hermes-agent/issues/116788)** · P2 — Background memory reviewer có thể lưu lại những thông tin mà người dùng **đã yêu cầu rõ ràng là không lưu** (vi phạm ranh giới quyền riêng tư).

**🟡 Trung bình — hồi quy & tương thích**

- **[#143361](https://github.com/NousResearch/hermes-agent/issues/143361)** · P2 — `hermes update` để lại release tag cũ → `hermes --version` báo phiên bản lỗi thời.
- **[#139091](https://github.com/NousResearch/hermes-agent/issues/139091)** · P2 — Probe merge-base 10 giây của stable update bị timeout ngay cả khi có commit cục bộ.
- **[#143158](https://github.com/NousResearch/hermes-agent/issues/143158)** · P2 — Catalog plugin hook không hoạt động sau khi khởi động lại gateway (chỉ reload tường minh mới đăng ký chúng). **Ứng viên sửa lỗi: [#143404](https://github.com/NousResearch/hermes-agent/pull/143404)** (góc độ messaging/deps).
- **[#143409](https://github.com/NousResearch/hermes-agent/issues/143409)** · P2 — Nhấn nút Discord trong DM từ chối người dùng đã được phê duyệt pairing khi có thiết lập role allowlist.
- **[#143364](https://github.com/NousResearch/hermes-agent/issues/143364)** · P3 · *Bảo mật* — Tiến trình/thông báo của profile phụ multiplexed **rò rỉ sang bot chính**.

**Windows xuất hiện quá nhiều** trong cụm lỗi hôm nay (#143331, #143401, #142271, #143326) — lộ trình desktop/update trên Windows là mắt xích yếu nhất trong chu kỳ này.

---

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

| Issue | Tính năng | Khả năng cho v0.23.0 |
|---|---|---|
| [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) (👍42) | Remote agent + thực thi tool cục bộ | **Tín hiệu cao**, có thể trải qua nhiều bản phát hành |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Cộng tác Bot xuyên gateway | Chiến lược; `needs-decision` |
| [#135039](https://github.com/NousResearch/hermes-agent/issues/135039) | Pipeline ngân sách/chấp nhận tại thời điểm ghi memory | Khả thi |
| [#116564](https://github.com/NousResearch/hermes-agent/issues/116564) | MEMORY.md làm điểm neo cho chuỗi tài liệu memory | Khả thi |
| [#115639](https://github.com/NousResearch/hermes-agent/issues/115639) | Cập nhật tự sửa lỗi cho đội fleet chạy 24/7 | RFC cấp lộ trình |
| [#138458](https://github.com/NousResearch/hermes-agent/issues/138458) | Đặt profile assignee làm chuẩn khi spawn kanban | Có khả năng trong ngắn hạn (kanban đang hoạt động) |

**PR tính năng đang xử lý:** [#143412](https://github.com/NousResearch/hermes-agent/pull/143412) Bria FIBO 2.0 trong `image_generate`; [#143411](https://github.com/NousResearch/hermes-agent/pull/143411) HeyGen Video trong `video_generate`; [#139055](https://github.com/NousResearch/hermes-agent/pull/139055) xem trước Office/OpenDocument trên desktop; [#127268](https://github.com/NousResearch/hermes-agent/pull/127268) delegation tuần

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

IronClaw cho thấy **hoạt động ở mức trung bình, thiên về bảo trì** trong hôm nay: tổng cộng 8 mục được cập nhật trong 24 giờ qua (2 issue, 6 PR), **không có bản phát hành mới**. Hoạt động trong ngày chủ yếu là các đợt bump dependency của Dependabot (5 trong 6 PR), cho thấy một giai đoạn phát triển tính năng khá yên ắng, tập trung vào dọn dẹp thay vì công việc tạo ra năng lực mới. Việc đóng issue về hỗ trợ ARM64 Docker đã tồn tại từ lâu (#3168, mở từ tháng 5/2026) là tín hiệu đáng chú ý nhất trong ngày, dù đáng lưu ý rằng nó được đóng mà không có merge nào liên kết. Nhìn chung, sức khỏe dự án có vẻ **ổn định nhưng tốc độ chậm trên các tính năng cốt lõi** — tự động hóa bảo trì vẫn hoạt động tốt, trong khi đóng góp từ con người có vẻ đang tạm dừng.

## 2. Các bản phát hành

**Không có bản phát hành mới trong khoảng thời gian này.** Thông tin về bản phát hành gần nhất không có trong dữ liệu được cung cấp. Không có thay đổi phá vỡ tương thích hay ghi chú migration nào để báo cáo.

## 3. Tiến độ dự án

**Đã merge/đóng hôm nay:**
- **PR #8149** [CLOSED] — bump `dompurify` từ 3.4.12 → 3.4.16 trong `crates/product/ironclaw_webui/frontend`. PR này đã bị PR #8155 (bump tiếp lên 3.4.17) thay thế ngay trong cùng ngày, cho thấy bot tự động đóng PR cũ để nhường chỗ cho PR mới. ([link](https://github.com/nearai/ironclaw/pull/8149))
- **Issue #3168** [CLOSED] — hỗ trợ build Docker ARM64/aarch64. Đáng chú ý là không có PR Docker ARM64 nào xuất hiện trong dữ liệu hôm nay, nên việc đóng issue mà không thấy merge liên quan cần maintainer kiểm tra lại. ([link](https://github.com/nearai/ironclaw/issues/3168))

**Đánh giá tổng thể:** Không có tiến bộ tính năng ròng trong hôm nay; tiến độ chỉ giới hạn ở việc vệ sinh dependency và đóng một issue.

## 4. Chủ đề cộng đồng nổi bật

Mức độ tương tác trên tất cả các mục được theo dõi đều **thấp** — mọi issue và PR đều có 0 👍 và gần như 0 bình luận (các PR Dependabot báo cáo bình luận là `undefined`).

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** — *Daily ironclaw failure taxonomy — 2026-10-22* (OPEN, 0 bình luận). Đây là mục có ý nghĩa phân tích cao nhất: một báo cáo kiểm toán thất bại tự động/được chọn lọc, ghi nhận **64 task không đạt trong bộ `officeqa`**, được cho là "phần lớn" do lỗi chất lượng mô hình thực sự của **DeepSeek-V4-Flash**. Điều này cho thấy nhu cầu nền tảng về **đánh giá mô hình dựa trên benchmark** và có thể là một vòng khắc phục chất lượng mô hình.
- **[Issue #3168](https://github.com/nearai/ironclaw/issues/3168)** — hỗ trợ ARM64 (CLOSED). Yêu cầu tồn tại lâu dài, phản ánh nhu cầu thực tế của người dùng về **tính tương đồng trong triển khai đa nền tảng**.

**Nhu cầu ẩn sau:** Cộng đồng đang nêu lên các lo ngại về tính khả chuyển nền tảng và độ tin cậy của mô hình, nhưng thảo luận tương tác rất ít — gợi ý rằng hoặc cơ sở người đóng góp tích cực còn nhỏ, hoặc các issue đang được tạo bởi tự động hóa.

## 5. Lỗi & Độ ổn định

Không có crash, regression hay báo cáo lỗi mới nào được gửi trong hôm nay. Tuy nhiên, có một **tín hiệu về độ ổn định chất lượng mô hình** đáng lưu tâm:

- **Mức độ: Trung bình** — [Issue #8153](https://github.com/nearai/ironclaw/issues/8153): 64 task không đạt lặp lại trên `officeqa` với DeepSeek-V4-Flash. Dù được mô tả là "lỗi chất lượng mô hình thực sự" chứ không phải lỗi hạ tầng IronClaw, việc phân loại thất bại lặp lại hàng ngày cho thấy một **điểm yếu dai dẳng trong đánh giá**. Hiện chưa có PR sửa lỗi nào.

**Lưu ý về bảo mật dependency (tích cực):** Chuỗi bump `dompurify` (3.4.12 → 3.4.17, PR [#8149](https://github.com/nearai/ironclaw/pull/8149) đã đóng / [#8155](https://github.com/nearai/ironclaw/pull/8155) đang mở) là một thư viện sanitize bảo mật được cập nhật nhanh; việc bám sát phiên bản mới nhất là một biện pháp giảm thiểu rủi ro XSS ở mức nhỏ.

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

- **Docker image ARM64/aarch64** ([#3168](https://github.com/nearai/ironclaw/issues/3168)): Issue ghi chú rằng Cranelift đã hỗ trợ aarch64 và chỉ armv7 (32-bit, được theo dõi ở #1339) là hạn chế đã được xác nhận. Việc đóng issue này gợi ý mạnh rằng **việc publish Docker đa kiến trúc ARM64 đang được triển khai hoặc sắp hoàn tất**. Dự đoán sẽ có trong bản phát hành tới.
- **armv7 (32-bit ARM)** vẫn nằm ngoài phạm vi một cách rõ ràng (tham chiếu #1339) — khó có khả năng xuất hiện trên lộ trình ngắn hạn.
- Không có yêu cầu tính năng nào khác xuất hiện hôm nay; tín hiệu lộ trình còn mờ nhạt.

## 7. Tóm tắt phản hồi người dùng

Phản hồi thực sự mà người dùng có thể thấy được trong hôm nay khá thưa thớt:

- **Điểm đau (nền tảng):** Người dùng không thể chạy image chính thức trên máy ARM64 ([#3168](https://github.com/nearai/ironclaw/issues/3168)) — một điểm ma sát trong triển khai, nay có vẻ đã được giải quyết.
- **Điểm đau (chất lượng mô hình):** Các thất bại trên benchmark `officeqa` ([#8153](https://github.com/nearai/ironclaw/issues/8153)) cho thấy sự không hài lòng với độ tin cậy của DeepSeek-V4-Flash trên các task văn phòng/tài liệu.
- **Dấu hiệu hài lòng:** Không có tuyên bố rõ ràng nào. Việc không có phàn nàn, kết hợp với hoạt động Dependabot đều đặn, ngụ ý rằng **không có regression nghiêm trọng nào ảnh hưởng đến người dùng** trong khoảng thời gian này.

## 8. Theo dõi tồn đọng

- **[Issue #8153](https://github.com/nearai/ironclaw/issues/8153)** — OPEN, 0 bình luận, 0 👍, tạo ngày 2026-10-22. Bản phân loại thất bại hàng ngày này đang **chưa được phản hồi**; nếu chúng tích tụ mỗi ngày mà không được phân loại xử lý, nợ chất lượng mô hình sẽ âm thầm tăng lên. **Cần maintainer chú ý:** chỉ định người phụ trách hoặc thiết lập chính sách phân loại.
- **[PR #8155](https://github.com/nearai/ironclaw/pull/8155)** và **[PR #8158](https://github.com/nearai/ironclaw/pull/8158)** — các PR Dependabot đang mở và chưa được review tính đến hôm nay; tuy là việc thường lệ nhưng không nên để đình trệ (đặc biệt là đợt bump `dompurify` liên quan đến bảo mật).
- **Issue #1339** (được tham chiếu, không có chi tiết) — hạn chế hỗ trợ armv7 32-bit; đánh dấu để theo dõi nếu nhu cầu về ARM 32-bit trở nên rõ ràng.

---

**Tóm tắt sức khỏe:** IronClaw đang trong **giai đoạn tốc độ chậm, chế độ bảo trì** vào ngày 2026-10-23 — tự động hóa khỏe mạnh, không có bản phát hành, không có lỗi nghiêm trọng, nhưng cũng ít động lực từ con người. Hai mục cần theo dõi tiếp là **bản phân loại chất lượng mô hình chưa được phản hồi (#8153)** và xác nhận rằng **việc đóng issue ARM64 (#3168) đã thực sự đi kèm một bản sửa lỗi**.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

QwenPaw đang trong chu kỳ phản ứng bảo mật và ổn định tích cực: một bản phát hành hotfix (**v2.2.2.post1**) đã được công bố để khắc phục vấn đề tin cậy emSign CA, kèm theo một khuyến nghị bảo mật công khai kêu gọi tất cả người dùng nâng cấp. Hoạt động rất cao — **22 issue được cập nhật (20 đang mở)** và **50 PR được cập nhật (48 đang mở, chỉ 2 đã merge/đóng)** trong 24h qua — nhưng tỷ lệ merge cực thấp, cho thấy băng thông của maintainer đang tập trung vào review và release engineering hơn là thông lượng. Issue tracker chủ yếu là các bug ở tầng channel (Feishu, DingTalk, Telegram, QQ), mỗi cái được báo cáo là tái hiện trên `main`, cho thấy các regression tích lũy giữa 2.2.2 và nhánh phát triển 2.3.0. Đáng chú ý, một loạt PR sửa lỗi phong phú do cộng đồng đóng góp (media replay, approval routing, plugin loader, Ollama context) đang chờ review, đây là tín hiệu tích cực cho sức khỏe contributor.

## 2. Phát hành

### v2.2.2.post1 (post-release hotfix)
- **#8369** — `chore: bump the version to v2.2.2post1` ([PR #8369](https://github.com/agentscope-ai/QwenPaw/pull/8369))
- **#8370** — `fix(security): remediate emSign CA trust across dependencies, installers, and builds` ([PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370))
- Release notes bị cắt trong dataset; changelog hiển thị chỉ tập trung vào bảo mật.

**Khuyến nghị bảo mật:** [Issue #8385](https://github.com/agentscope-ai/QwenPaw/issues/8385) khuyến nghị rõ ràng nâng cấp lên **2.2.2.post1 hoặc mới hơn** trên Desktop installer, gói PyPI và container image. Không có breaking change hay bước migration nào được ghi trong dữ liệu hiện có — đây là bản patch drop-in.

**Xác minh phát hành:** [Issue #8386](https://github.com/agentscope-ai/QwenPaw/issues/8386) (Release Duty installation verification, CLOSED) theo dõi tiêu chí pass bốn checkpoint; nó đóng cùng ngày, ngụ ý xác minh đã hoàn tất.

**Merge-back đang tiến hành:** [PR #8391](https://github.com/agentscope-ai/QwenPaw/pull/8391) (`chore: merge Release/v2.2.2post1 into main`) đang mở, vì vậy hotfix chưa lên `main`.

## 3. Tiến độ dự án

Chỉ **2 PR được merge/đóng** trong 24h qua, cả hai gắn với release train:
- [PR #8369](https://github.com/agentscope-ai/QwenPaw/pull/8369) — bump version
- [PR #8370](https://github.com/agentscope-ai/QwenPaw/pull/8370) — khắc phục tin cậy emSign CA (bảo mật)

**Không có PR tính năng nào landed hôm nay.** Tuy nhiên, khối lượng công việc đáng kể đang được staged và cập nhật tích cực:
- [PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) (`size/XXXL`) — tách các channel chính thức thành plugin với cô lập subprocess. Đây là xương sống kiến trúc của đợt modularity 2.3.0 đã công bố.
- [PR #8376](https://github.com/agentscope-ai/QwenPaw/pull/8376) (`size/XXXL`, first-time contributor) — memory backend PowerContext v1.4.0 với structured context và Artifact APIs.
- [PR #8375](https://github.com/agentscope-ai/QwenPaw/pull/8375) — stale-request guard sau khi xóa chat (sửa trực tiếp cho #8368).
- [PR #8366](https://github.com/agentscope-ai/QwenPaw/pull/8366) — thay thế `html2text` GPL-3.0 bằng bộ chuyển đổi stdlib, giải quyết vấn đề tương thích giấy phép Apache-2.0. Đây là một thắng lợi compliance có ý nghĩa.

## 4. Chủ đề nóng cộng đồng

| Mục | Bình luận | Tín hiệu |
|---|---|---|
| [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) — Điểm mở rộng theme cho plugin | 7 | Tác giả plugin muốn theming sâu hơn nút `colorPrimary` duy nhất |
| [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) — "Making QwenPaw Lighter and More Extensible" (xem trước v2.3.0) | 3, 👍1 | Thread roadmap do maintainer dẫn dắt; cộng đồng được mời đóng góp ý kiến |
| [#8351](https://github.com/agentscope-ai/QwenPaw/issues/8351) — Composer draft keyed theo agent, không theo conversation | 3 | Rò rỉ text giữa các conversation; bug UX liên quan đến privacy |
| [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) — Quản lý Skill/MCP toàn cục trong Hub | 2, 👍1 | Nhu cầu provisioning đa người dùng cho team/enterprise |

**Phân tích nhu cầu ẩn:** Hai thread liên quan plugin (#8071, #8289) đều chỉ vào cùng một áp lực — bề mặt plugin là cơ chế mở rộng chính nhưng chưa được đặc tả đầy đủ (một nút theme, không có lớp semantic token). Các thread Hub (#8275, #8372) cho thấy một **persona triển khai nhóm** đang nổi lên: admin muốn phân phối Skill/MCP tập trung và kiểm soát gateway timeout, điều mà model per-user hiện tại không đáp ứng. Cùng nhau, chúng gợi ý cộng đồng đang vượt qua giả định desktop đơn người dùng mà kiến trúc được xây dựng trên đó.

## 5. Bug & Ổn định

Xếp hạng theo mức độ nghiêm trọng (tác động × khả năng tái hiện):

**Nghiêm trọng — cấp độ toàn dịch vụ hoặc mất dữ liệu:**
1. **#8350** — Channel Feishu thực hiện network call đồng bộ trên main event loop; khi mạng không truy cập được, toàn bộ dịch vụ bị treo (`/api/healthz` timeout, SIGTERM không thể thoát). [Issue #8350](https://github.com/agentscope-ai/QwenPaw/issues/8350) — **Không có PR sửa lỗi nào được xác định. Đây là mục nghiêm trọng nhất hôm nay.**
2. **#8335** — Media trong chat history bị re-upload mỗi request; một phiên WeChat đạt request body **48.9 MB**, endpoint từ chối, và phiên bị **treo vĩnh viễn** (mọi lượt tiếp theo đều thất bại trên cùng block). [Issue #8335](https://github.com/agentscope-ai/QwenPaw/issues/8335) — **Có PR sửa lỗi: [#8337](https://github.com/agentscope-ai/QwenPaw/pull/8337)** ("stop replaying media the model no longer needs"). Liên quan: [#8299](https://github.com/agentscope-ai/QwenPaw/pull/8299) thêm retry từ chối video.
3. **#8388** — Sau khi nâng cấp, channel QQ hoàn toàn hỏng; mọi tool call thất bại với `No module named '_qwenpaw_remote_backend'`. [Issue #8388](https://github.com/agentscope-ai/QwenPaw/issues/8388) — **Không có PR sửa lỗi; có thể là regression đóng gói trong 2.2.2.**

**Cao — mất tin nhắn âm thầm:**
4. **#8343** — Reply cuối cùng của DingTalk bị **âm thầm bỏ** khi `sessionWebhook` hết hạn; không có fallback Open API (errcode=300001). [Issue #8343](https://github.com/agentscope-ai/QwenPaw/issues/8343) — Không có PR sửa lỗi.
5. **#8342** — Quoted reply mất định tuyến channel control-command trên **bảy channel** (`/stop` được quote trở thành traffic thường). [Issue #8342](https://github.com/agentscope-ai/QwenPaw/issues/8342) — Không có PR sửa lỗi.
6. **#8329** — Channel Telegram bỏ qua `reply_to_message`; quoted context không bao giờ đến agent, khác với các channel khác. [Issue #8329](https://github.com/agentscope-ai/QwenPaw/issues/8329) — Không có PR sửa lỗi.

**Trung bình — cấu hình và regression:**
7. **#8378** — Lỗi gọi model sau nâng cấp; schema `active_model` của `agent.json` cũ không khớp. [Issue #8378](https://github.com/agentscope-ai/QwenPaw/issues/8378)
8. **#8374** — `QWENPAW_CORS_ORIGINS` đặt qua Web UI/CLI không có tác dụng — constant được bind tại module import, trước khi env injection. [Issue #8374](https://github.com/agentscope-ai/QwenPaw/issues/8374)
9. **#8351** — Composer draft keyed theo agent; text chưa gửi rò rỉ giữa các conversation. [Issue #8351](https://github.com/agentscope-ai/QwenPaw/issues/8351)
10. **#8359** — Khởi động Docker runtime Hub-in-container thất bại: readiness probe hardcode về `127.0.0.1` (Errno 111). [Issue #8359](https://github.com/agentscope-ai/QwenPaw/issues/8359)
11. **#8368** — Xóa conversation đang được chọn trả về 404. [Issue #8368](https://github.com/agentscope-ai/QwenPaw/issues/8368) — **PR sửa lỗi: [#8375](https://github.com/agentscope-ai/QwenPaw/pull/8375)**

**Thấp / trải nghiệm developer:**
12. **#8377** — `pytest` trần abort khi collection trên checkout sạch (`import file mismatch: test_backup`). Chặn local gate trong CONTRIBUTING.md. [Issue #8377](https://github.com/agentscope-ai/QwenPaw/issues/8377) — được mô tả là sửa một file; chưa có PR.
13. **#8333** — Header source-group ở sidebar chồng lên conversation đầu tiên. [Issue #8333](https://github.com/agentscope-ai/QwenPaw/issues/8333)

**Mẫu:** 4 trong 13 bug là đặc thù channel-adapter, và 3 trong số đó liên quan đến **ngữ nghĩa reply/quote** — một khoảng trống hệ thống trong cách các channel chuẩn hóa tin nhắn đến, không phải các defect riêng lẻ.

## 6. Yêu cầu tính năng & Tín hiệu roadmap

| Yêu cầu | Issue | Khả năng trong bản phát hành tới |
|---|---|---|
| Kiến trúc plugin nhẹ hơn, module hóa | [#8289](https://github.com/agentscope-ai/QwenPaw/issues/8289) | **Đã xác nhận cho v2.3.0** bởi maintainer; [PR #8187](https://github.com/agentscope-ai/QwenPaw/pull/8187) là bản triển khai |
| Lớp override semantic theme token cho plugin | [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) | **Cao** — bổ trợ trực tiếp cho refactor plugin 2.3.0 |
| Quản lý chia sẻ Skill + MCP toàn cục trong Hub | [#8275](https://github.com/agentscope-ai/QwenPaw/issues/8275) | **Trung bình** — cần quyết định sản phẩm về team model; chưa có PR |
| Khả năng cấu hình timeout của Hub AI gateway | [#8372](https://github.com/agentscope-ai/QwenPaw/issues/8372) | **Trung bình-Cao** — bề mặt nhỏ, nhu cầu người dùng rõ ràng (mặc định 120s quá ngắn cho xử lý file) |
| Cài đặt Desktop để tắt auto-scroll khi streaming | [#7339](https://github.com/agentscope-ai/QwenPaw/issues/7339) | **Thấp-Trung bình** — mở từ 2026-08-27 không có tiến triển |

**Dự đoán:** v2.3.0 sẽ phát hành việc tách plugin/channel (#8187, #8289) làm tiêu đề chính. Điểm mở rộng theme (#8071) là ứng viên đi kèm khả dĩ nhất, vì nó rẻ một khi định dạng plugin descriptor đã chốt. Toàn cầu hóa Hub (#8275) là ứng viên mạnh nhất cho 2.4.0.

## 7. Tóm tắt phản hồi người dùng

**Điểm đau, theo chủ đề:**

- **Lo lắng nâng cấp là thật và tái diễn.** Nhiều báo cáo gắn trực tiếp hỏng hóc với việc nâng cấp: channel QQ chết sau 2.2.2 (#8388, thiếu `_qwenpaw_remote_backend`), gọi model thất bại từ `agent.json` cũ (#8378). Kết hợp với khuyến nghị nâng cấp bảo mật bắt buộc (#8385), người dùng đang được yêu cầu nâng cấp vào một phiên bản có regression riêng. Đây là rủi ro hài lòng sắc nét nhất trong dataset.
- **Thất bại âm thầm làm xói mòn niềm tin.** DingTalk bỏ reply cuối cùng không có lỗi (#8343); Telegram âm thầm bỏ quoted context (#8329); approval được nêu từ một chat không bao giờ đến chat đó và resolve thành `TIMEOUT` sau năm phút ([PR #8303](https://github.com/agentscope-ai/QwenPaw/pull/8303) mô tả trường hợp WeChat). Người dùng không thể phân biệt "agent chọn không phản hồi" với "hệ thống thất bại."
- **Cạn kiệt tài nguyên chặn công việc.** Body WeChat 48.9 MB (#8335) và Feishu network-stall-giữ-toàn-bộ-dịch-vụ (#8350) đều khiến sản phẩm hoàn toàn không dùng được, không chỉ là suy giảm.
- **Người dùng Team/Hub cảm thấy như công dân hạng hai.** Timeout Hub quá ngắn (#8372), triển khai Hub-in-Docker hỏng (#8359), không có Skill/MCP chia sẻ (#8275).
- **Tín hiệu tích cực:** Contributor đang đầu tư nỗ lực thực sự — first-time contributor gửi PR đáng kể (#837

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-10-23

## 1. Tổng quan hôm nay

ZeroClaw cho thấy **hoạt động phát triển với tốc độ cao** với 34 issue và 50 PR được cập nhật trong 24 giờ qua. Dự án đang trong giai đoạn tăng tốc trước phát hành hướng tới **v0.9.0**, với phần lớn công việc mới mang thẻ cột mốc đó. Hoạt động tập trung mạnh vào **tăng cường bảo mật và kiểm soát danh tính/quyền truy cập** — ủy quyền theo phạm vi principal, đăng nhập dashboard bằng OIDC, quyền sở hữu phiên, và giới hạn allowlist công cụ chiếm ưu thế trong cả issue tracker lẫn hàng đợi PR. Đáng chú ý, một số PR bảo mật XL chạy dài (xếp chồng lên nhau) tiếp tục được làm mới hàng ngày mà chưa merge, cho thấy một nút thắt tích hợp phức tạp. Không có bản phát hành nào ra mắt hôm nay; nhóm dường như đang ổn định các bản sửa lỗi v0.8.7 (plugins, OIDC, CI) trong khi chuẩn bị các tính năng v0.9.0.

**Đánh giá sức khỏe:** Năng động và khỏe mạnh về khối lượng đóng góp, nhưng sự tập trung của các PR bảo mật rủi ro cao, phụ thuộc lẫn nhau (nhiều PR `risk:high`, `size:XL`, bị chặn bởi các điều kiện tiên quyết) tạo ra rủi ro về thông lượng merge.

---

## 2. Phát hành

**Không có.** Không có bản phát hành mới nào trong 24 giờ qua.

---

## 3. Tiến độ dự án

### PR đã merge / đóng hôm nay (tổng cộng 8)
Không có PR nào đã merge xuất hiện trong mẫu top-20 theo bình luận (tất cả PR hiển thị đều là `OPEN`). 8 PR đã merge/đóng là các mục có mức tương tác thấp hơn, không xuất hiện trong dữ liệu.

### Issue đã đóng hôm nay (tổng cộng 11) — Các đóng đáng chú ý
- **[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)** — RFC: Lịch sử sự kiện phiên chỉ ghi thêm, phát lại trạng thái xác định, và luồng agent dẫn xuất *(13 bình luận, đóng sau ~7 tuần)*. Đây là một cột mốc kiến trúc quan trọng: một RFC được chấp nhận điều chỉnh trạng thái phiên dựa trên sự kiện, làm nền tảng cho phần lớn lộ trình runtime.
- **[#11357](https://github.com/zeroclaw-labs/zeroclaw/issues/11357)** — `plugin remove` đã xóa nhầm thư mục (`plugins_dir/<name>` thay vì đường dẫn tải). Bản sửa vòng đời plugin liên quan đến bảo mật đã được triển khai.
- **[#11327](https://github.com/zeroclaw-labs/zeroclaw/issues/11327)** — Cổng tên công cụ plugin có thể cho phép plugin chiếm trước các công cụ `tool_search`, MCP, ngoại vi và skill. Đã đóng — liên quan đến mối lo allowlist #8279.
- **[#11902](https://github.com/zeroclaw-labs/zeroclaw/issues/11902)** — Token OIDC hợp lệ bị từ chối với lỗi `Misconfigured` trong quá trình fetch JWKS đồng thời (race condition).
- **[#10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558)** — Job CI Cranelift bị timeout 20 phút.
- **[#11806](https://github.com/zeroclaw-labs/zeroclaw/issues/11806)**, **[#11821](https://github.com/zeroclaw-labs/zeroclaw/issues/11821)**, **[#11828](https://github.com/zeroclaw-labs/zeroclaw/issues/11828)**, **[#11926](https://github.com/zeroclaw-labs/zeroclaw/issues/11926)**, **[#11928](https://github.com/zeroclaw-labs/zeroclaw/issues/11928)** — Dọn dẹp CI/test/observability được gắn thẻ `release:v0.8.7`.

**Kết luận:** Các đóng hôm nay chủ yếu là **ổn định v0.8.7** và **vệ sinh bảo mật/CI**, trong khi các tính năng v0.9.0 vẫn đang trong quá trình xử lý.

---

## 4. Chủ đề cộng đồng nổi bật

| Mục | Loại | Bình luận | Chủ đề |
|---|---|---|---|
| [#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) | Tracker (p2, rủi ro cao) | 15 | Lộ trình runtime / đăng nhập dashboard / phân phối gateway |
| [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) | RFC (p2, rủi ro cao) | 13 | Lịch sử phiên dựa trên sự kiện & phát lại xác định |
| [#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999) | Task *bị chặn* (trung bình) | 9 | Cài đặt/xác minh plugin Discord từ binary phát hành |
| [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | Bug (p1, rủi ro cao) | 5 | `delegate` bỏ qua allowlist công cụ của parent |

**Phân tích nhu cầu ẩn sau:**
- **#7432** là issue điều phối chính cho bản phát hành runtime/gateway v0.9.0 — chuỗi 15 bình luận của nó báo hiệu cuộc tranh luận liên tục về thứ tự và một đồ thị phụ thuộc lớn. Các bên liên quan muốn rõ ràng về những gì sẽ ra mắt trong v0.9.0.
- **Việc đóng #10526** sau cuộc thảo luận RFC kéo dài phản ánh một dự án đang trưởng thành, sẵn sàng tái kiến trúc lưu trữ xung quanh các sự kiện chỉ ghi thêm — dấu hiệu của đầu tư thiết kế dài hạn, dù công việc "luồng agent dẫn xuất" sẽ sinh ra các tracker tiếp theo.
- **#10999** ở trạng thái `status:blocked` dù đã xác minh Discord hoạt động trên v0.8.6 báo hiệu **ma sát về đóng gói/kỹ thuật phát hành** (chứng minh một plugin hoạt động từ *kho lưu trữ phát hành*, không phải từ source).
- **#8279** là lá cờ đầu về bảo mật: lỗ hổng bypass allowlist của delegate thuộc lớp S0 và p1, và nó kết nối trực tiếp với các PR xếp chồng (#11225, #11409, #11230) đã được làm mới trong nhiều tuần.

**Các PR được bình luận nhiều nhất** là chồng bảo mật của IftekharUddin và Aarlington (#11225 p0, #11409, #11220, #11230, #11234) và nền tảng Goal Mode #11878 — những thứ này dẫn dắt lộ trình hiển thị.

---

## 5. Bug & Ổn định

Xếp hạng theo mức độ nghiêm trọng (tất cả được báo cáo/cập nhật 2026-10-22–23):

| Mức độ | Issue | Mô tả | PR sửa? |
|---|---|---|---|
| **S1** | [#11957](https://github.com/zeroclaw-labs/zeroclaw/issues/11957) | Đăng ký OIDC gửi thông tin xác thực client thô trong header Basic; ký tự dành riêng phá vỡ đăng ký `client_credentials` & device-grant | ✅ **#11968** mở (form-encode thông tin xác thực) |
| **S0/S1** | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | `delegate` cho phép sub-agent gọi các công cụ mà chính sách của parent loại trừ | ✅ Được bao phủ bởi các PR xếp chồng #11225 / #11409 |
| **S2** | [#11951](https://github.com/zeroclaw-labs/zeroclaw/issues/11951) | Nâng cấp WebSocket của Gateway thất bại trên listener TLS tích hợp (101 rồi đóng) | ❌ Chưa có |
| **S2** | [#11962](https://github.com/zeroclaw-labs/zeroclaw/issues/11962) | 64 phiên RPC trực tiếp của Daemon không bao giờ được giải phóng khi nhàn rỗi → client từ xa có thể làm cạn kiệt chúng | ✅ **#11964** mở ("retire orphaned remote sessions") |
| **S2** | [#11970](https://github.com/zeroclaw-labs/zeroclaw/issues/11970) | `agents delete/rename` bỏ qua cascade trạng thái sở hữu + kiểm tra live-ACP trong bản build không có gateway | ❌ |
| **S2** | [#11989](https://github.com/zeroclaw-labs/zeroclaw/issues/11989) | `excluded_tools` theo kênh không bao giờ được áp dụng | ✅ **#11990** mở |
| **S2** | [#11991](https://github.com/zeroclaw-labs/zeroclaw/issues/11991) | Email đi HTML chứa markup thô / URL hình ảnh tùy ý (lớp XSS) | ❌ (tính năng #11992 liền kề) |
| **S2** | [#11823](https://github.com/zeroclaw-labs/zeroclaw/issues/11823) | Shell scanner bỏ qua command substitution trong heredoc có delimiter không trích dẫn (thoát sandbox) | ❌ |
| **S3** | [#11972](https://github.com/zeroclaw-labs/zeroclaw/issues/11972) | `gateway get-paircode` thoát với mã 0 khi thất bại | ❌ |
| **S3** | [#11969](https://github.com/zeroclaw-labs/zeroclaw/issues/11969) | Các tính năng `metrics` / `embedded-web` biên dịch toàn bộ gateway vào bản build headless | ✅ **#11269** mở |
| **S3** | [#11987](https://github.com/zeroclaw-labs/zeroclaw/issues/11987) | Bình luận `// nosemgrep` inline không chặn cảnh báo quét mã | ❌ |

**Đánh giá ổn định:** Hai bug thuộc **lớp thoát sandbox/bảo mật** vẫn còn mở (#11823, #11991) mà không có PR sửa — những cái này cần được ưu tiên. Bug đăng ký #11957 là S1 (quy trình bị chặn) nhưng bản sửa đã trong quá trình xem xét. Sự cố WebSocket TLS (#11951) là một vấn đề có dạng regression ảnh hưởng đến khả năng sử dụng dashboard.

---

## 6. Yêu cầu tính năng & Tín hiệu lộ trình

**Yêu cầu tính năng mới hôm nay (tất cả đều có khả năng là ứng viên v0.9.0 trừ khi có ghi chú khác):**
- **[#11961](https://github.com/zeroclaw-labs/zeroclaw/issues/11961)** — Đăng nhập dashboard bằng OIDC (tùy chọn tham gia). **PR #11965 đã mở** → tín hiệu mạnh cho v0.9.0.
- **[#11984](https://github.com/zeroclaw-labs/zeroclaw/issues/11984)** — Chat dashboard cho tài khoản đã đăng nhập không phải admin. Một phần của tracker #7432.
- **[#11971](https://github.com/zeroclaw-labs/zeroclaw/issues/11971)** — Build source chỉ CLI (không gateway/dashboard). Đi kèm với **[PR #11975](https://github.com/zeroclaw-labs/zeroclaw/pull/11975)**.
- **[#11992](https://github.com/zeroclaw-labs/zeroclaw/issues/11992)** / **[#11799](https://github.com/zeroclaw-labs/zeroclaw/issues/11799)** — Template email cho operator + thân HTML được làm sạch; thông báo từ chối chính sách shell với lý do + gợi ý cho operator (**PR #11983** mở).
- **[#11995](https://github.com/zeroclaw-labs/zeroclaw/issues/11995)** — Khôi phục ủy quyền nền thuộc sở hữu với kết quả theo phạm vi principal (tiếp theo của #11409).
- **[#11847](https://github.com/zeroclaw-labs/zeroclaw/pull/11847)** — Kênh XMPP/Prosody với OMEMO tùy chọn (PR tính năng, XL).

**Dự đoán lộ trình:** v0.9.0 sẽ tập trung vào (1) **OIDC/danh tính & truy cập theo phạm vi principal**, (2) **đăng nhập dashboard + chat theo phạm vi**, (3) **bản build chỉ CLI/tối giản**, và (4) **hoàn thiện kênh email**. **Vòng đời tác vụ bền vững của Goal Mode** (#11878, "proposal 1/12") báo hiệu một sáng kiến đa phát hành lớn hơn nhiều đang bắt đầu giai đoạn nền tảng.

---

## 7. Tóm tắt phản hồi người dùng

**Điểm đau được nêu trong các issue:**
- **Lo lắng về kiểm soát bảo mật** — Người dùng (và chính nhóm maintainer) đang tìm ra nhiều cách mà principal theo phạm vi thoát khỏi ranh giới của mình: bypass allowlist của delegate (#8279), thực thi SOP không có quyền admin (#11220), công cụ dữ liệu phiên bị lộ cho người không phải admin (#11230), plugin chiếm trước công cụ (#11327). Chủ đề lặp lại là **phạm vi danh tính tồn tại nhưng không được thực thi end-to-end**.
- **Ma sát vòng đời plugin** — #10999 bị kẹt ở `blocked` cho thấy operator gặp khó khăn để *chứng minh* một plugin cài đặt được từ artifact phát hành; #11357 (xóa nhầm thư mục) càng làm trầm trọng thêm vấn đề tin cậy.
- **Khoảng trống UX cho operator** — #11799 ("từ chối chính sách shell nên nói lý do"), #11821 (bản ghi log không nêu tên người gửi bị từ chối), và #11972 (thoát 0 khi thất bại) cho thấy một mẫu hình: **lỗi tồn tại nhưng không thể hành động được** đối với operator.
- **Nhu cầu triển khai tối giản** — #11971/#11969 phản ánh người dùng muốn bản build headless, không gateway mà không bị rò rỉ tính năng.
- **Chất lượng kênh email** — Một cụm issue về email (#11989, #11991, #119

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/BuhDuy256/agents-radar) tự động tạo.*