# 🛍️ TikTokShop — Nền tảng bán hàng TikTok

[![Keep Render Awake](https://github.com/xiaoan3680-blip/TikTokShop/actions/workflows/keep-render-awake.yml/badge.svg)](https://github.com/xiaoan3680-blip/TikTokShop/actions/workflows/keep-render-awake.yml)

> Ứng dụng web hỗ trợ bán hàng và quản lý sản phẩm trên TikTok, được triển khai miễn phí trên **Render.com** và tự động giữ hoạt động 24/7 bằng **GitHub Actions**.

---

## 🌐 Website hoạt động
- **Render URL:** [https://tiktokshop-fb59.onrender.com](https://tiktokshop-fb59.onrender.com)  
- **Tên miền chính:** [https://tiktokshop888.com](https://tiktokshop888.com)

> ⚡ Trang web luôn “thức” nhờ workflow `Keep Render Awake` ping tự động mỗi 10 phút.

---

## 🚀 Tính năng chính
- Quản lý và hiển thị sản phẩm TikTok.
- Trang **Admin** dễ dùng để cập nhật dữ liệu.
- Tự động cập nhật nội dung sản phẩm.
- Hoạt động ổn định trên Render Free Tier.

---

## 🧩 Cấu trúc thư mục

TikTokShop/
│
├── admin.html # Trang quản trị
├── index.html # Trang chính (hiển thị sản phẩm)
├── admin.js # Logic quản lý sản phẩm
├── data.js # Dữ liệu sản phẩm
├── messages.json # Nội dung ngôn ngữ
├── uploads/ # Ảnh hoặc file tải lên
├── render.yaml # Cấu hình Render
└── .github/workflows/
└── keep-render-awake.yml # Giữ cho Render luôn hoạt động

yaml
Sao chép mã

---

## 🧠 Hướng dẫn cài đặt local

Nếu bạn muốn chạy dự án trên máy tính của mình:

```bash
# 1️⃣ Tải mã nguồn về
git clone https://github.com/xiaoan3680-blip/TikTokShop.git

# 2️⃣ Cài Node.js nếu chưa có
# https://nodejs.org

# 3️⃣ Chạy server local
cd TikTokShop
node server.js
Mở trình duyệt và truy cập:
👉 http://localhost:10000

⚙️ Triển khai (Deploy) lên Render
Đăng nhập Render.com

Kết nối GitHub → chọn repo TikTokShop

Render tự build và khởi chạy

Domain sẽ có dạng tên-miền.onrender.com

✅ Bạn có thể gán tên miền riêng (VD: tiktokshop888.com) trong mục Settings → Custom Domain

🪄 Giữ Render luôn “thức”
File workflow: .github/workflows/keep-render-awake.yml

Tự động chạy mỗi 10 phút

Ping domain chính của bạn để Render không bị sleep

Bạn có thể kiểm tra trạng thái ở tab Actions → Keep Render Awake.

💬 Liên hệ & đóng góp
Nếu bạn muốn cải thiện hoặc đóng góp thêm tính năng:

Gửi Pull Request

Hoặc liên hệ qua GitHub: xiaoan3680-blip

❤️ Ghi chú
Dự án được xây dựng với mục tiêu học tập & thực hành triển khai web tĩnh + Node.js trên Render.
Mọi đóng góp đều được hoan nghênh!

yaml
Sao chép mã

---

## 💡 Gợi ý:
Sau khi bạn thêm file này:
1. Quay lại repo → GitHub sẽ tự hiển thị đẹp như một trang giới thiệu.  
2. Huy hiệu “Keep Render Awake” 🟢 sẽ luôn cập nhật tự động.  

---

Bạn có muốn mình **thêm phần “Ảnh xem trước website (preview)”** ở đầu README luôn cho đẹp không?  
Mình có
