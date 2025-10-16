import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

const dataFile = path.join(__dirname, "data.json");

// Hàm đọc file JSON
const getData = () => JSON.parse(fs.readFileSync(dataFile, "utf-8"));

// Ghi log truy cập
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API: Lấy dữ liệu
app.get("/api/data", (req, res) => res.json(getData()));

// API: Gửi form liên hệ
app.post("/api/contact-form", (req, res) => {
    try {
        const { name, email, message } = req.body;
        const data = getData();
        data.messages.push({ name, email, message, time: new Date().toLocaleString() });
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        res.json({ success: true });
    } catch (err) {
        console.error("Lỗi ghi form:", err);
        res.status(500).json({ success: false });
    }
});

// API: Đăng nhập admin
app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    res.json({ success: password === "tiktok123" });
});

// API: Cập nhật dữ liệu trang
app.post("/api/admin/update-data", (req, res) => {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch {
        res.status(500).json({ success: false });
    }
});

// Giao diện chính
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, () => console.log(`✅ Server chạy tại http://localhost:${PORT}`));
