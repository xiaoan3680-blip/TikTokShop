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

// Ghi log truy cập
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const dataFile = path.join(__dirname, "data.json");
const getData = () => JSON.parse(fs.readFileSync(dataFile, "utf-8"));

// --- API đọc dữ liệu ---
app.get("/api/data", (req, res) => {
    try {
        res.json(getData());
    } catch {
        res.status(500).json({ error: "Không thể đọc dữ liệu" });
    }
});

// --- API cập nhật dữ liệu ---
app.post("/api/admin/update-data", (req, res) => {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch {
        res.status(500).json({ success: false });
    }
});

app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "admin.html")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, () => console.log(`✅ Server chạy tại http://localhost:${PORT}`));
