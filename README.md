# 🛍️ TikTokShop Việt Nam – Website Bán Hàng Chuyên Nghiệp

Dự án **TikTokShop Việt Nam** là nền tảng giới thiệu và quản lý gian hàng TikTokShop với giao diện **chuyên nghiệp**, **màu sắc neon dịu phong cách TikTok**, và **tối ưu hiển thị trên mọi thiết bị**.

---

## 🚀 Tính năng nổi bật

### 👨‍💻 Trang chính (`index.html`)
- Giao diện hiện đại, tông đen–xám ánh hồng neon.  
- Tự động hiển thị dữ liệu từ `data.json`.  
- Các phần nội dung chuyên nghiệp:
  - Giới thiệu TikTokShop  
  - Lợi ích khi kinh doanh trên TikTok Shop  
  - Hỗ trợ & tư vấn qua Zalo  
  - Liên hệ & kênh kết nối  
- **Tự động thay ảnh lỗi bằng ảnh mặc định** (không còn “Image Not Found”).  
- **Chat tự động (TuDongChat)** hoạt động ổn định ở góc phải.

### ⚙️ Trang quản trị (`/admin`)
- Quản lý toàn bộ nội dung trang mà **không cần sửa code**.  
- Có thể chỉnh:
  - Tiêu đề, mô tả, logo  
  - Chatbox ID  
  - Danh sách liên hệ (Zalo, TikTok, Facebook, Hotline, v.v.)  
- Giao diện **neon dịu, chuyên nghiệp**, font **Inter**.  
- Lưu dữ liệu trực tiếp vào `data.json` qua API.

### 🧩 Backend (`server.js`)
- Xây dựng bằng **Express.js**  
- Cấu hình API đọc & ghi dữ liệu (`/api/data`, `/api/admin/update-data`)  
- Ghi log truy cập để tiện theo dõi người dùng.  
- Hỗ trợ deploy dễ dàng trên Render hoặc bất kỳ server Node nào.

---

## 🗂 Cấu trúc dự án

📁 TikTokShop/
├── server.js
├── data.json
├── index.html
├── admin.html
├── admin.js
├── admin.css
├── render.yaml
├── package.json
└── README.md

yaml
Sao chép mã

---

## 🧠 Cài đặt & chạy cục bộ

### 1️⃣ Cài Node.js
Cần Node >= **18.x**

```bash
node -v
2️⃣ Cài dependencies
bash
Sao chép mã
npm install
3️⃣ Chạy ứng dụng
bash
Sao chép mã
npm start
Truy cập tại:
👉 http://localhost:3000

🌐 Triển khai trên Render
Tự động triển khai
Khi bạn push code lên GitHub, Render sẽ tự động:

Cài đặt dependencies (npm install)

Chạy server (node server.js)

Cung cấp website trực tuyến với HTTPS tự động.

Cấu hình Render
Trong file render.yaml:

yaml
Sao chép mã
services:
  - type: web
    name: tiktokshop
    env: node
    plan: free
    buildCommand: "npm install"
    startCommand: "node server.js"
🔧 Chỉnh sửa nội dung website
Trang chính
Dữ liệu hiển thị được lấy từ data.json.
Để thay đổi, có 2 cách:

✅ Cách 1: Dùng trang Admin
Truy cập:

bash
Sao chép mã
https://tiktokshop888.com/admin
Nhập thông tin và nhấn “Lưu thay đổi” → dữ liệu được cập nhật tự động.

⚙️ Cách 2: Sửa trực tiếp data.json
Mở file:

json
Sao chép mã
{
  "site": {
    "title": "TikTokShop Việt Nam",
    "subtitle": "Nền tảng bán hàng hiện đại..."
  }
}
💬 Chat tự động
Chatbox được tích hợp sẵn qua TuDongChat.com
Thay đổi ID trong data.json:

json
Sao chép mã
"chat_id": "Nd9qOWI0l8QwPObLIb9Dx"
🖼 Ảnh fallback (phòng lỗi)
Mọi ảnh (logo, liên hệ, QR...) đều có cơ chế tự động thay bằng ảnh mặc định:

js
Sao chép mã
img.onerror = () => (img.src = "https://i.imgur.com/hRWK7MZ.png");
🔐 Bảo mật & ghi chú
Mật khẩu admin được định sẵn trong server.js có thể thay đổi:

js
Sao chép mã
password === "tiktok123"
Không chia sẻ mã chatbox hoặc mật khẩu admin công khai.

Nên bật HTTPS (Render tự cấu hình).

👑 Bản quyền
© 2025 TikTokShop Việt Nam
Phát triển bởi nhóm Linh Dan
Mọi bản quyền thuộc về chủ sở hữu hợp pháp.

