// =============================
// 🚀 TikTokShop Server 2025
// =============================
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "data.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// =============================
// 📦 API: Lấy dữ liệu trang
// =============================
app.get("/api/data", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
        res.json(data);
    } catch (err) {
        console.error("❌ Lỗi đọc data.json:", err);
        res.status(500).json({ error: "Không thể đọc dữ liệu." });
    }
});

// =============================
// 📝 API: Cập nhật dữ liệu
// =============================
app.post("/api/update", (req, res) => {
    try {
        const newData = req.body;
        if (!newData || !newData.adminKey)
            return res.status(400).json({ error: "Thiếu mã PIN quản trị." });

        // Đọc dữ liệu cũ
        const oldData = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

        // Kiểm tra mã PIN
        if (newData.adminKey !== oldData.adminKey)
            return res.status(403).json({ error: "Sai mã PIN." });

        // Ghi dữ liệu mới
        fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2), "utf8");
        console.log("✅ Dữ liệu đã được cập nhật bởi Admin.");
        res.json({ message: "Lưu thành công!" });
    } catch (err) {
        console.error("❌ Lỗi ghi data.json:", err);
        res.status(500).json({ error: "Không thể lưu dữ liệu." });
    }
});

// =============================
// 🖼️ API: Favicon + Ảnh QR
// =============================
app.get("/favicon.ico", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
        const iconUrl = data.favicon || "";
        if (iconUrl.startsWith("http")) return res.redirect(iconUrl);
        res.sendFile(path.join(__dirname, "favicon.ico"));
    } catch {
        res.status(404).end();
    }
});

// =============================
// 🧩 Phục vụ file tĩnh
// =============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =============================
// ⚡ Server
// =============================
app.listen(PORT, () => {
    console.log(`🚀 TikTokShop Server đang chạy tại: http://localhost:${PORT}`);
});
