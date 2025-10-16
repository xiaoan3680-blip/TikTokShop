const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const dataFile = path.join(__dirname, "data.json");

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Ghi log truy cập
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API: lấy dữ liệu
app.get("/api/data", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
        res.json(data);
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// API: cập nhật dữ liệu từ admin
app.post("/api/admin/update-data", (req, res) => {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (err) {
        console.error("❌ Lỗi khi ghi file:", err);
        res.status(500).json({ success: false });
    }
});

// Route admin & index
app.get("/admin", (req, res) =>
    res.sendFile(path.join(__dirname, "admin.html"))
);
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "index.html"))
);

app.listen(PORT, () =>
    console.log(`✅ Server chạy tại: http://localhost:${PORT}`)
);
