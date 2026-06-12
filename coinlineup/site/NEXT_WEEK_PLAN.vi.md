# Kế hoạch CoinLineup Tuần Tới

## Mục tiêu

Chuẩn bị CoinLineup cho việc cutover domain an toàn và tăng độ sẵn sàng cho Google Search / Google News, đồng thời xử lý nốt các điểm chưa nhất quán còn lại trong giai đoạn chạy song song hiện tại.

## Ưu tiên 1: Canonical và thống nhất domain

- Chốt `coinlineup.com` là canonical domain duy nhất trên toàn bộ frontend.
- Cập nhật metadata bài viết để canonical URLs trỏ về `https://coinlineup.com`.
- Cập nhật article JSON-LD để `mainEntityOfPage`, `publisher.url` và các public author URLs nếu có đều trỏ về `https://coinlineup.com`.
- Thêm canonical tường minh cho:
  - homepage
  - `/news`
  - `/guides`
  - news category pages
  - các section/archive pages khác hiện còn đang phụ thuộc mặc định
- Kiểm tra lại `robots.txt` và `sitemap.xml` sau khi cập nhật metadata để chắc mọi tín hiệu index đều đồng bộ.

## Ưu tiên 2: Pre-launch SEO audit

- Audit các URL đại diện gồm:
  - homepage
  - news archive
  - guides archive
  - ít nhất 3 bài viết live
- Kiểm tra trên từng page:
  - title
  - meta description
  - canonical
  - Open Graph tags
  - structured data
  - byline
  - publication date
  - updated date nếu có
- Xác nhận internal links không còn dẫn tới route cũ hoặc route hỏng.
- Xác định các page còn mỏng, rỗng hoặc giá trị thấp để quyết định:
  - ẩn
  - cải thiện nội dung
  - hoặc noindex trước cutover

## Ưu tiên 3: Trust và chất lượng editorial

- Rà lại author pages và article bylines để chắc public presentation thống nhất.
- Rà source attribution trên article pages và siết lại ở những chỗ cần thiết.
- Xem lại trust pages để phát hiện phần nào còn generic hoặc còn mỏng.
- Xác nhận người đọc có thể tìm thấy dễ dàng:
  - About
  - Authors
  - Editorial Policy
  - Corrections Policy
  - Ownership & Funding Transparency
  - Masthead
  - Contact
  - RSS

## Ưu tiên 4: Chất lượng market/data

- Quyết định cách market widgets nên hoạt động khi CoinGecko fail:
  - empty state tử tế
  - fallback mềm hơn
  - hoặc tiếp tục giữ mock fallback nhưng có guard rõ hơn
- Rà xem homepage market widget có nên lọc bớt các tài sản low-signal hoặc nhìn không editorial hay không.

## Ưu tiên 5: Chuẩn bị cutover domain

- Add `coinlineup.com` và subdomain cần thiết vào Railway.
- Xác nhận env production đúng, đặc biệt:
  - `NEXT_PUBLIC_SITE_URL=https://coinlineup.com`
- Test site trên custom domain trước khi cutover DNS.
- Chuẩn bị checklist cutover cho:
  - DNS
  - canonical
  - sitemap
  - robots
  - Search Console
  - rollback path

## Ưu tiên 6: Monitoring và kiểm tra vận hành cơ bản

- Kiểm tra deploy health sau mỗi lần release production.
- Xác minh WordPress API fetch fail phải degrade an toàn.
- Xác minh revalidation endpoint hoạt động đúng.
- Thêm hoặc xác nhận logging cơ bản cho:
  - WordPress fetch failures
  - newsletter subscribe failures
  - deploy/runtime regressions

## Thứ tự thực hiện đề xuất

1. Sửa canonical, schema và domain signals.
2. Chạy lại live SEO audit sau khi các fix đó deploy.
3. Dọn các section còn mỏng/rỗng hoặc đặt indexing behavior an toàn hơn.
4. Add custom domain vào Railway và test trên host đó.
5. Thực hiện checklist cutover cuối cùng.

## Kết quả kỳ vọng vào cuối tuần tới

- CoinLineup có bề mặt SEO sạch và nhất quán hơn.
- Canonical và schema signals đã đồng bộ với domain production cuối cùng.
- Site an toàn hơn để chuyển traffic chính từ WordPress sang frontend Next.js.
- Các rủi ro còn lại chủ yếu là rollout vận hành, không còn là các lỗ hổng rõ ràng về trust hoặc content surface.
