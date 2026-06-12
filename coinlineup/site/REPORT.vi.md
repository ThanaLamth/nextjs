# Báo cáo CoinLineup

## Phạm vi đã hoàn thành

- Xây dựng frontend CoinLineup bằng Next.js trong khi vẫn giữ WordPress làm CMS.
- Kết nối frontend với WordPress REST API đang chạy thật để lấy bài viết, trang, archive và trust content.
- Giữ dự án ở trạng thái chạy song song để WordPress vẫn live trong lúc bản Next.js được kiểm thử và xác thực.

## Hạ tầng và triển khai

- Thiết lập project trong Git và đẩy code đang hoạt động lên `main`.
- Deploy bản Next.js lên Railway và ổn định hành vi deploy production.
- Fix lỗi build thiếu ổn định bằng cách pin các dependency gây vấn đề.
- Viết lại phần sinh sitemap để Railway không còn fail ở bước prerender sitemap.

## Thay đổi frontend và sản phẩm

- Fix header bám khi scroll.
- Đặt theme mặc định là light mode.
- Fix lỗi header mobile và menu mobile bị cắt hoặc không scroll đúng.
- Gỡ hoặc rollback các hướng UI làm site kém chất editorial hoặc kém chuyên nghiệp.
- Làm sạch lại hướng trình bày single post sau khi đối chiếu với các publisher editorial mạnh hơn.
- Gỡ các pattern account/profile public không phù hợp với mô hình site publisher.

## WordPress headless và render nội dung

- Hoàn thiện việc render article, page, category và archive từ dữ liệu WordPress.
- Thêm frontend override cho trust pages ở những chỗ nội dung WordPress quá mỏng hoặc quá bẩn để public.
- Làm sạch HTML render từ WordPress để bỏ các block thừa như plugin-generated elements làm xấu giao diện.

## Dọn authors, byline và trust

- Chuẩn hóa cách hiển thị author trên article.
- Thêm mô hình author public chuẩn với role và profile handling.
- Dọn output byline để author ẩn hoặc author WordPress không phù hợp không bị lộ ra frontend.
- Cập nhật article JSON-LD để không phát ra author rác.
- Xóa các tham chiếu public tới những author không mong muốn như Pizza và Thorne.
- Đồng bộ hướng trust public giữa article pages, Authors page và Masthead.
- Thêm fallback dùng `CoinLineup Editorial Team` khi author WordPress không nên public.

## Trust pages và độ sẵn sàng cho Google News

- Xây cụm trust pages cần thiết để site có presentation đáng tin cậy hơn:
  - About
  - Authors
  - Editorial Policy
  - Corrections Policy
  - Ownership & Funding Transparency
  - Masthead
  - Contact
  - Privacy Policy
  - Terms of Service
  - Content Disclaimer
  - Affiliate Disclaimer
  - RSS
- Mở rộng nội dung các trang này để không còn là placeholder mỏng.
- Gom trust links và legal links rõ ràng trong footer navigation.
- Thêm tài liệu giải thích tại sao trust-page set này tồn tại và dùng để làm gì.
- Thêm script sync trust pages ngược lại WordPress khi cần.

## Newsletter và subscribe flow

- Thêm xử lý subscribe newsletter.
- Tích hợp logic subscribe qua Brevo.
- Thêm luồng confirm và post-confirmation cho newsletter subscriptions.
- Xác minh đường đi để giữ subscriber list phục vụ các campaign email về sau.
- Sau đó tạm tắt hướng gửi mail chủ động cho tới khi tài khoản/vendor được nâng cấp.

## SEO và technical search

- Thêm và ổn định `robots.txt`.
- Thêm và ổn định `sitemap.xml`.
- Làm sạch metadata snippets và descriptions cho trust pages.
- Audit live site theo hướng dẫn chính thức của Google Search Central về technical SEO và trust signals.
- Xác nhận article pages có structured data và source attribution ở các mẫu đã kiểm tra.
- Xác nhận RSS đã được public qua trang RSS.

## Tài liệu và handoff

- Viết runbook tái sử dụng cho các dự án WordPress sang Next.js:
  - `MIGRATION_PLAYBOOK.md`
- Viết handoff notes riêng cho project:
  - `HANDOFF.md`
- Ghi lại rationale và implementation notes cho trust pages:
  - `docs/trust-pages-notes.md`

## Các việc follow-up hiện còn biết

- Canonical và article schema vẫn cần được thống nhất hoàn toàn về `https://coinlineup.com`.
- Homepage và archive pages vẫn cần canonical tường minh.
- Một số News topic links vẫn cần sửa slug để internal links chỉ trỏ vào route hợp lệ.
- Chỉ nên cutover domain sau khi canonical, schema và link cleanup đã xong.
