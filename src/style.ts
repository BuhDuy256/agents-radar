/**
 * One writing guide shared by every report prompt, the highlights prompt and
 * the translation pass. Keeping it in one place is what stops generation and
 * translation from asking for different voices.
 */

import type { Lang } from "./i18n.ts";

const EN = `Writing rules — apply to every sentence:
- Summary first. The first sentence states the change, the result or the method. Never open with "This article discusses…".
- One idea per sentence. Use a concrete subject and a concrete action. Around 20 words is the target, not a hard limit.
- Plain words. Keep a technical term when it is the precise one, and explain an unfamiliar term in a few words the first time it appears.
- One name per concept. Use "agent" everywhere; do not alternate between "agent", "assistant" and "actor".
- Be specific. Do not write "improves efficiency", "is useful" or "boosts productivity" without saying what changed or what the result was.
- Separate fact from claim. A personal test is "the author tried…", a company statement is "the company says…", an announcement is "the company announced…". Never turn a forecast into an event. Put an important limitation early.
- Keep the numbers needed to understand the result, usually one or two per item, with their unit and condition. Do not copy every number, model name and technical detail. Never add a confidence score or a percentage of certainty.
- Every paragraph adds something new. Do not repeat the same content in the overview, the table, the conclusion and a "worth reading" section.
- Match the shape to the item: Update = change → what it enables → condition. Workflow = result → steps → limit. Experiment = result → how it was tested → limit. Business = event → supported cause or impact. Forecast = who → basis → condition.
- Light formatting: short headings, prose by default, lists for steps, a table only when items are compared on the same criteria. Do not label every sentence "Problem" or "Idea".
- Output only the report body. Never repeat, summarise or translate these instructions into the answer.`;

const VI = `Quy tắc viết — áp dụng cho từng câu:
- Nêu kết quả trước. Câu đầu cho biết thay đổi, kết quả hoặc cách làm. Không mở bằng "Bài viết này bàn về…".
- Mỗi câu một ý. Dùng chủ ngữ và hành động cụ thể. Khoảng 20 từ là định hướng, không phải giới hạn cứng.
- Dùng từ quen thuộc. Giữ thuật ngữ khi cần chính xác; giải thích thuật ngữ lạ bằng vài từ ngay lần đầu xuất hiện.
- Một khái niệm dùng một tên. Dùng "agent" ở mọi chỗ; không đổi qua lại thành "tác nhân", "tác tử" hay "trợ lý".
- Nêu thông tin cụ thể. Không viết "tăng hiệu quả", "hữu ích" hay "cải thiện năng suất" mà không nói rõ thay đổi hoặc kết quả.
- Tách dữ kiện và nhận định. Tác giả thử thì viết "tác giả thử…"; công ty công bố thì viết "công ty cho biết…". Không biến dự đoán thành sự kiện. Giới hạn quan trọng phải xuất hiện sớm.
- Giữ số liệu cần hiểu kết quả, thường một hoặc hai số mỗi tin, kèm đơn vị và điều kiện. Không chép mọi số, tên model và chi tiết kỹ thuật. Không tự chấm điểm tin cậy hay phần trăm chắc chắn.
- Mỗi đoạn thêm thông tin mới. Không lặp nội dung ở tổng quan, bảng, kết luận và mục "đáng đọc".
- Chọn dạng theo loại tin: Cập nhật = thay đổi → công dụng → điều kiện. Workflow = kết quả → các bước → giới hạn. Thử nghiệm = kết quả → cách thử → giới hạn. Doanh nghiệp = sự kiện → nguyên nhân/tác động có căn cứ. Dự báo = ai dự báo → căn cứ → điều kiện.
- Định dạng nhẹ: tiêu đề ngắn, mặc định viết đoạn; dùng list cho các bước, bảng khi so sánh cùng tiêu chí. Không gắn nhãn "Vấn đề / Ý tưởng" cho mọi câu.
- Chỉ xuất phần nội dung báo cáo. Không lặp lại, tóm tắt hay dịch các chỉ dẫn này vào câu trả lời.`;

export function styleGuide(lang: Lang = "en"): string {
  return lang === "en" ? EN : VI;
}
