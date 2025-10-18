import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cho phép truy cập ảnh trong thư mục uploads
app.use("/uploads", express.static("uploads"));

// Đường dẫn lưu file
const DATA_FILE = process.env.DATA_FILE || "./data.json";
const MESSAGE_FILE = process.env.MESSAGE_FILE || "./messages.json";
const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";

// ⚙️ Cấu hình Multer (upload ảnh QR)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
        const name = file.fieldname === "qrZalo" ? "qr_zalo.png" : "qr_tiktok.png";
        cb(null, name);
    },
});
const upload = multer({ storage });

// 🧠 Đọc dữ liệu hiện tại
function loadData() {
    if (!fs.existsSync(DATA_FILE)) return { notifications: [], contacts: [] };
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function loadMessages() {
    if (!fs.existsSync(MESSAGE_FILE)) return [];
    return JSON.parse(fs.readFileSync(MESSAGE_FILE));
}

function saveMessages(msgs) {
    fs.writeFileSync(MESSAGE_FILE, JSON.stringify(msgs, null, 2));
}

// 🧾 API lấy dữ liệu cho trang chủ
app.get("/api/getData", (req, res) => {
    const data = loadData();
    const qr_zalo = "/uploads/qr_zalo.png";
    const qr_tiktok = "/uploads/qr_tiktok.png";
    res.json({ ...data, qr_zalo, qr_tiktok });
});

// 📩 API nhận tin nhắn từ khách
app.post("/api/sendMessage", (req, res) => {
    const { name, phone, message } = req.body;
    if (!name || !phone || !message)
        return res.status(400).json({ message: "Thiếu thông tin!" });
    const msgs = loadMessages();
    msgs.push({ name, phone, message, time: new Date().toLocaleString() });
    saveMessages(msgs);
    res.json({ message: "Cảm ơn bạn! Tin nhắn đã được gửi." });
});

// 🧾 API lấy tin nhắn trong admin
app.get("/api/getMessages", (req, res) => {
    res.json(loadMessages());
});

// 🖼️ API upload QR
app.post("/api/uploadQR", upload.fields([{ name: "qrZalo" }, { name: "qrTiktok" }]), (req, res) => {
    res.json({ message: "Ảnh QR đã được tải lên!" });
});

// 💾 API lưu dữ liệu thay đổi (thông báo + liên hệ)
app.post("/api/saveData", (req, res) => {
    const { notifications, contacts } = req.body;
    const data = { notifications, contacts };
    saveData(data);
    res.json({ message: "Lưu thành công!" });
});

// ✅ Trang test
app.get("/", (req, res) => {
    res.send("✅ TikTokShop server đang hoạt động!");
});

// 🚀 Khởi chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TikTokShop server đang chạy tại http://localhost:${PORT}`);
});
