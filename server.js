import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config(); // 🔹 Đọc file .env

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// =============================
// 📁 CẤU HÌNH THƯ MỤC
// =============================
app.use(express.static(__dirname));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());

// =============================
// 💾 CẤU HÌNH LƯU FILE QR
// =============================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        if (file.fieldname === "qrZalo") cb(null, "qr_zalo.png");
        else if (file.fieldname === "qrTiktok") cb(null, "qr_tiktok.png");
    },
});
const upload = multer({ storage: storage });

// =============================
// 📄 ĐỌC / GHI DỮ LIỆU JSON
// =============================
const dataPath = process.env.DATA_FILE || "./data.json";
const messagePath = process.env.MESSAGE_FILE || "./messages.json";

// Tạo file JSON nếu chưa có
if (!fs.existsSync(dataPath))
    fs.writeFileSync(
        dataPath,
        JSON.stringify({ notifications: [], contacts: [] }, null, 2)
    );
if (!fs.existsSync(messagePath))
    fs.writeFileSync(messagePath, JSON.stringify([], null, 2));

// =============================
// 🌐 TRANG CHỦ & TRANG QUẢN TRỊ
// =============================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "admin.html"));
});

// =============================
// 📥 API LẤY DỮ LIỆU
// =============================
app.get("/api/getData", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataPath));
        const zaloQR = fs.existsSync("uploads/qr_zalo.png")
            ? "uploads/qr_zalo.png"
            : null;
        const tiktokQR = fs.existsSync("uploads/qr_tiktok.png")
            ? "uploads/qr_tiktok.png"
            : null;
        res.json({ ...data, qr_zalo: zaloQR, qr_tiktok: tiktokQR });
    } catch (err) {
        res.status(500).json({ error: "Lỗi đọc dữ liệu!" });
    }
});

// =============================
// 💾 API LƯU DỮ LIỆU
// =============================
app.post("/api/saveData", (req, res) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
        res.json({ message: "Đã lưu dữ liệu thành công!" });
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi lưu dữ liệu!" });
    }
});

// =============================
// 📤 API UPLOAD ẢNH QR
// =============================
app.post(
    "/api/uploadQR",
    upload.fields([
        { name: "qrZalo", maxCount: 1 },
        { name: "qrTiktok", maxCount: 1 },
    ]),
    (req, res) => {
        res.json({ message: "Upload thành công!" });
    }
);

// =============================
// 📬 API GỬI TIN NHẮN LIÊN HỆ
// =============================
app.post("/api/sendMessage", (req, res) => {
    try {
        const { name, phone, message } = req.body;
        if (!name || !phone || !message)
            return res.status(400).json({ error: "Thiếu thông tin!" });
        const allMessages = JSON.parse(fs.readFileSync(messagePath));
        allMessages.push({
            name,
            phone,
            message,
            time: new Date().toLocaleString("vi-VN"),
        });
        fs.writeFileSync(messagePath, JSON.stringify(allMessages, null, 2));
        res.json({ message: "Tin nhắn của bạn đã được gửi thành công!" });
    } catch (err) {
        res.status(500).json({ error: "Không thể gửi tin nhắn!" });
    }
});

// =============================
// 📩 API LẤY TIN NHẮN CHO ADMIN
// =============================
app.get("/api/getMessages", (req, res) => {
    try {
        const msgs = JSON.parse(fs.readFileSync(messagePath));
        res.json(msgs);
    } catch (err) {
        res.status(500).json({ error: "Không đọc được tin nhắn!" });
    }
});

// =============================
// 🤖 CALLBACK XÁC THỰC ZALO OA
// =============================
app.post("/zalo-callback", (req, res) => {
    console.log("📩 Callback từ Zalo OA:", req.body);

    // Trả về “OK” để xác thực
    res.status(200).send("OK");
});

// =============================
// 🧠 KIỂM TRA XÁC THỰC ZALO OA
// =============================
app.get("/zalo-verification", (req, res) => {
    const verifier = req.query["verify"];
    if (!verifier)
        return res.status(400).send("Thiếu mã xác thực từ Zalo OA!");
    res.send(`Zalo OA xác thực thành công với mã: ${verifier}`);
});

// =============================
// 🚀 KHỞI CHẠY SERVER
// =============================
app.listen(PORT, () => {
    console.log(`🚀 TikTokShop server chạy tại: http://localhost:${PORT}`);
});
