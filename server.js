const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const DATA_FILE = path.join(__dirname, "data.json");

app.get("/api/data", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
        res.json(data);
    } catch {
        res.status(500).json({ error: "Không đọc được dữ liệu." });
    }
});

app.post("/api/update", (req, res) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Không thể lưu dữ liệu." });
    }
});

app.post("/api/message", (req, res) => {
    const { name, phone, message } = req.body;
    if (!name || !phone || !message)
        return res.status(400).json({ error: "Thiếu thông tin." });

    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
        const newMsg = {
            id: Date.now(),
            name,
            phone,
            message,
            time: new Date().toLocaleString("vi-VN"),
        };
        data.messages = data.messages || [];
        data.messages.push(newMsg);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Không thể lưu tin nhắn." });
    }
});

app.get("/api/messages", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
        res.json(data.messages || []);
    } catch {
        res.status(500).json({ error: "Không thể đọc tin nhắn." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
    console.log(`🚀 TikTokShop server đang chạy tại cổng ${PORT}`)
);
