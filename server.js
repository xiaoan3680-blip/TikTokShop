// --- Import các thư viện cần thiết ---
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// --- Thiết lập đường dẫn ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Khởi tạo ứng dụng Express ---
const app = express();
const PORT = process.env.PORT || 3000;

// 🟢 --- Ghi log hoạt động ---
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// --- Cấu hình middleware ---
app.use(bodyParser.json());
app.use(express.static(__dirname));

// --- File dữ liệu JSON ---
const dataFile = path.join(__dirname, "data.json");

// --- Hàm đọc dữ liệu từ file ---
const getData = () => {
    try {
        return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    } catch {
        return { messages: [], qrcodes: [] };
    }
};

// --- API đọc dữ liệu ---
app.get("/api/data", (req, res) => {
    try {
        res.json(getData());
    } catch {
        res.status(500).json({ error: "Không thể đọc dữ liệu" });
    }
});

// --- API gửi tin nhắn ---
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

// --- API đăng nhập admin ---
app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    res.json({ success: password === "tiktok123" });
});

// --- API cập nhật dữ liệu ---
app.post("/api/admin/update-data", (req, res) => {
    try {
        const newData = req.body;
        fs.writeFileSync(dataFile, JSON.stringify(newData, null, 2));
        res.json({ success: true });
    } catch {
        res.status(500).json({ success: false });
    }
});

// --- Trang admin ---
app.get("/admin", (req, res) =>
    res.sendFile(path.join(__dirname, "admin.html"))
);

// --- Trang chính ---
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "index.html"))
);

// --- Khởi động server ---
app.listen(PORT, () =>
    console.log(`✅ Server đang chạy tại http://localhost:${PORT}`)
);
