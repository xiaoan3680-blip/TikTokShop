const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // cho phép truy cập file tĩnh như index.html, admin.html

// Tạo thư mục uploads nếu chưa có
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Cấu hình multer để upload ảnh QR
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// File dữ liệu
const DATA_FILE = path.join(__dirname, "data.json");
const MSG_FILE = path.join(__dirname, "messages.json");

// Khởi tạo file rỗng nếu chưa có
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ notifications: [], contacts: [] }, null, 2));
if (!fs.existsSync(MSG_FILE)) fs.writeFileSync(MSG_FILE, JSON.stringify([], null, 2));

// Trang chính
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

// Trang admin
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "admin.html")));

// API lấy dữ liệu
app.get("/api/getData", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

// API lưu thông báo + liên kết
app.post("/api/saveData", (req, res) => {
    const { notifications, contacts } = req.body;
    const data = { notifications, contacts };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ message: "Dữ liệu đã được lưu thành công!" });
});

// API upload ảnh QR
app.post("/api/uploadQR", upload.fields([{ name: "qrZalo" }, { name: "qrTiktok" }]), (req, res) => {
    res.json({ message: "Đã tải ảnh QR lên!" });
});

// API gửi tin nhắn từ form khách hàng
app.post("/api/sendMessage", (req, res) => {
    const { name, phone, message } = req.body;
    const msgs = JSON.parse(fs.readFileSync(MSG_FILE));
    msgs.push({ name, phone, message, time: new Date().toLocaleString() });
    fs.writeFileSync(MSG_FILE, JSON.stringify(msgs, null, 2));
    res.json({ message: "Tin nhắn của bạn đã được gửi!" });
});

// API lấy danh sách tin nhắn cho admin
app.get("/api/getMessages", (req, res) => {
    const msgs = JSON.parse(fs.readFileSync(MSG_FILE));
    res.json(msgs);
});

// Khởi động server
app.listen(PORT, () => console.log(`🚀 TikTokShop server đang chạy tại http://localhost:${PORT}`));
