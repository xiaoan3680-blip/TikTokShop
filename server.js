// ====== TIKTOKSHOP SERVER (Express + File Storage) ======

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Cho phép phục vụ file tĩnh (HTML, CSS, ảnh...)

// === Cấu hình thư mục uploads ===
const upload = multer({ dest: "uploads/" });

// === Đường dẫn file dữ liệu ===
const DATA_FILE = path.join(__dirname, "data.json");
const MSG_FILE = path.join(__dirname, "messages.json");

// ======== API LẤY DỮ LIỆU TRANG CHỦ ========
app.get("/api/getData", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Không đọc được dữ liệu" });
        res.json(JSON.parse(data || "{}"));
    });
});

// ======== API CẬP NHẬT DỮ LIỆU TỪ ADMIN ========
app.post(
    "/api/updateData",
    upload.fields([
        { name: "zaloQR" },
        { name: "tiktokQR" },
        { name: "heroImage" },
    ]),
    (req, res) => {
        fs.readFile(DATA_FILE, "utf8", (err, data) => {
            const content = JSON.parse(data || "{}");

            // Cập nhật nội dung cơ bản
            content.heroTitle = req.body.heroTitle || content.heroTitle;
            content.heroSubtitle = req.body.heroSubtitle || content.heroSubtitle;
            content.ctaText = req.body.ctaText || content.ctaText;
            content.ctaLink = req.body.ctaLink || content.ctaLink;

            // Cập nhật danh sách thông báo và liên hệ
            if (req.body.notifications)
                content.notifications = JSON.parse(req.body.notifications);
            if (req.body.contacts)
                content.contacts = JSON.parse(req.body.contacts);

            // Cập nhật ảnh (QR / hero)
            if (req.files["zaloQR"])
                content.zaloQR = req.files["zaloQR"][0].path;
            if (req.files["tiktokQR"])
                content.tiktokQR = req.files["tiktokQR"][0].path;
            if (req.files["heroImage"])
                content.heroImage = req.files["heroImage"][0].path;

            // Ghi dữ liệu lại file JSON
            fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), (err2) => {
                if (err2)
                    return res.status(500).json({ error: "Không lưu được dữ liệu" });
                res.json({ message: "✅ Dữ liệu đã được cập nhật thành công!" });
            });
        });
    }
);

// ======== API GỬI TIN NHẮN KHÁCH HÀNG ========
app.post("/api/sendMessage", (req, res) => {
    const { name, phone, message } = req.body;
    const newMsg = {
        name,
        phone,
        message,
        time: new Date().toLocaleString(),
    };

    fs.readFile(MSG_FILE, "utf8", (err, data) => {
        const messages = data ? JSON.parse(data) : [];
        messages.push(newMsg);
        fs.writeFile(MSG_FILE, JSON.stringify(messages, null, 2), (err2) => {
            if (err2)
                return res.status(500).json({ error: "Không lưu được tin nhắn" });
            res.json({ message: "Tin nhắn đã được gửi thành công!" });
        });
    });
});

// ======== API LẤY DANH SÁCH TIN NHẮN ========
app.get("/api/getMessages", (req, res) => {
    fs.readFile(MSG_FILE, "utf8", (err, data) => {
        if (err) return res.json([]);
        res.json(JSON.parse(data || "[]"));
    });
});

// ======== ROUTE TRANG CHỦ & TRANG ADMIN ========

// Trang chủ
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Trang quản trị
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "admin.html"));
});

// ======== KHỞI ĐỘNG SERVER ========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 TikTokShop Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`🔐 Trang quản trị: http://localhost:${PORT}/admin`);
});
