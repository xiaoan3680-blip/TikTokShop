const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const DATA_PATH = path.join(__dirname, "data.json");

// API: Lấy dữ liệu cho trang chủ
app.get("/api/data", (req, res) => {
    fs.readFile(DATA_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Không đọc được dữ liệu" });
        res.json(JSON.parse(data));
    });
});

// API: Cập nhật dữ liệu từ trang admin
app.post("/api/update", (req, res) => {
    const newData = req.body;
    fs.readFile(DATA_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Không đọc được file" });

        const current = JSON.parse(data);
        if (newData.adminKey !== current.adminKey)
            return res.status(403).json({ error: "Sai mã PIN quản trị" });

        fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Không ghi được dữ liệu" });
            res.json({ success: true, message: "✅ Cập nhật thành công!" });
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
);
