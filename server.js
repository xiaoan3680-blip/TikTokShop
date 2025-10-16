import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // phục vụ file tĩnh

// File dữ liệu chính
const dataFile = path.join(__dirname, "data.json");
const getData = () => {
    try {
        return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    } catch {
        return { contact: {}, messages: [] };
    }
};

// --- API: đọc dữ liệu ---
app.get("/api/data", (req, res) => {
    try {
        const data = getData();
        res.json(data);
    } catch {
        res.status(500).json({ error: "Không thể đọc dữ liệu" });
    }
});

// --- API: nhận tin nhắn người dùng ---
app.post("/api/contact-form", (req, res) => {
    try {
        const { name, email, message } = req.body;
        const data = getData();
        data.messages.push({
            name,
            email,
            message,
            time: new Date().toLocaleString(),
        });
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        res.status(200).json({ success: true });
    } catch {
        res.status(500).json({ success: false });
    }
});

// --- API: đăng nhập admin ---
app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    res.json({ success: password === "tiktok123" });
});

// --- API: admin cập nhật dữ liệu ---
app.post("/api/admin/update-data", (req, res) => {
    try {
        const data = getData();
        const newData = req.body;
        fs.writeFileSync(dataFile, JSON.stringify({ ...data, ...newData }, null, 2));
        res.status(200).json({ success: true });
    } catch {
        res.status(500).json({ success: false });
    }
});

// --- Fallback: nếu không khớp route API, trả về trang chính ---
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// --- Khởi chạy server ---
app.listen(PORT, () => {
    console.log(`✅ TikTokShop đang chạy tại http://localhost:${PORT}`);
});
