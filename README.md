# 🎵 TikTokShop — Website Thương Hiệu Thông Minh 2025

**TikTokShop** là website giới thiệu và quản lý thương hiệu thông minh,
được xây dựng bằng **Node.js + Express + TailwindCSS** với giao diện neon phong cách TikTok.

---

## 🚀 Tính năng nổi bật

✅ Giao diện **neon TikTok** đẹp mắt, tương thích mọi thiết bị (PC, tablet, mobile)  
✅ Trang **Admin riêng** để chỉnh nội dung và xem tin nhắn  
✅ Hỗ trợ **gửi tin nhắn từ người dùng** → lưu trực tiếp vào `data.json`  
✅ **Hiệu ứng cuộn, gradient, neon động** siêu mượt  
✅ Dễ triển khai, không cần database phức tạp  
✅ Có thể **deploy online (Render, Vercel, hoặc Replit)**

---

## 📂 Cấu trúc thư mục

TikTokShop/
├── index.html # Trang chính (giao diện người dùng)
├── admin.html # Trang quản trị nội dung
├── server.js # Server Node.js + Express
├── data.json # Lưu dữ liệu website & tin nhắn
├── README.md # Tài liệu hướng dẫn này

yaml
Sao chép mã

---

## ⚙️ Cài đặt & Chạy thử

### 1️⃣ Cài Node.js
Tải tại: [https://nodejs.org](https://nodejs.org)  
Kiểm tra:
```bash
node -v
2️⃣ Cài dependencies
Mở Terminal trong thư mục TikTokShop:

bash
Sao chép mã
npm init -y
npm install express
3️⃣ Chạy server
bash
Sao chép mã
node server.js
Trình duyệt mở:

arduino
Sao chép mã
http://localhost:3000
🔑 Đăng nhập trang Admin
Truy cập:

bash
Sao chép mã
http://localhost:3000/admin.html
Mật khẩu mặc định:

nginx
Sao chép mã
tiktok123
Bạn có thể đổi mật khẩu trong file server.js:

js
Sao chép mã
const ADMIN_PASSWORD = "tiktok123";
💬 Gửi và xem tin nhắn
Khách truy cập gửi tin qua form trên trang chính (index.html)

Tin nhắn sẽ được lưu trong data.json

Vào admin.html để xem tất cả tin nhắn ngay lập tức

🌍 Tùy chỉnh nhanh
Thành phần	File chỉnh	Ghi chú
Tên thương hiệu	data.json (site.title)	Hiện ở đầu trang
Câu slogan	data.json (site.slogan)	Hiện ngay dưới tiêu đề
Mô tả thương hiệu	data.json (site.brand_description)	Giữa trang
Link truy cập	data.json (site.brand_link)	Đã gắn https://tiktokshop88.net
Liên hệ (email, facebook,...)	data.json (contact)	Hiện ở mục Liên hệ

🧠 Triển khai online (tùy chọn)
Bạn có thể deploy web dễ dàng trên:

Render.com

Vercel.com

Replit.com

Hoặc bất kỳ hosting nào hỗ trợ Node.js.
Sau khi deploy, website hoạt động 24/7 như một trang thương hiệu thực thụ 🌐

👨‍💻 Tác giả & Bản quyền
© 2025 TikTokShop
Phát triển bởi TikTokShop Team
Giao diện chuyên nghiệp & công nghệ bởi Node.js & Express

📧 Liên hệ kỹ thuật
Nếu bạn cần hỗ trợ cài đặt hoặc tuỳ chỉnh thêm:

Email: support@tiktokshop88.net
Website: https://tiktokshop88.net