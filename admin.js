// ===== TikTokShop Admin Script =====

const admins = [
    { user: "superadmin", pass: "tkshop0", role: "super", name: "Quản trị cấp cao" },
    { user: "admin1", pass: "tkshop1", role: "normal", name: "Nguyễn Văn A" },
    { user: "admin2", pass: "tkshop2", role: "normal", name: "Trần Thị B" },
    { user: "admin3", pass: "tkshop3", role: "normal", name: "Lê Văn C" },
    { user: "admin4", pass: "tkshop4", role: "normal", name: "Phạm Thị D" },
    { user: "admin5", pass: "tkshop5", role: "normal", name: "Vũ Văn E" }
];

let currentAdmin = null;

// ===== Đăng nhập =====
function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const admin = admins.find(a => a.user === user && a.pass === pass);

    if (!admin) {
        document.getElementById("errorMsg").textContent = "Sai tài khoản hoặc mật khẩu!";
        return;
    }

    currentAdmin = admin;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("welcomeText").innerHTML = `Xin chào <b>${admin.name}</b> 👋`;
    document.getElementById("adminRole").innerHTML = `Quyền hạn: <b>${admin.role === "super" ? "Toàn quyền (Super Admin)" : "Giới hạn (chỉ chỉnh liên hệ + thông báo)"}</b>`;

    loadData();
    loadMessages();
}

// ===== Tải dữ liệu =====
async function loadData() {
    const res = await fetch("/api/getData");
    const data = await res.json();

    document.getElementById("heroTitle").value = data.heroTitle || "";
    document.getElementById("heroSubtitle").value = data.heroSubtitle || "";
    document.getElementById("ctaText").value = data.ctaText || "";
    document.getElementById("ctaLink").value = data.ctaLink || "";

    const notiDiv = document.getElementById("notifications");
    notiDiv.innerHTML = "";
    (data.notifications || []).forEach(n => addNotification(n));

    const contactDiv = document.getElementById("contacts");
    contactDiv.innerHTML = "";
    (data.contacts || []).forEach(c => addContact(c.type, c.link));

    if (currentAdmin.role !== "super") {
        document.querySelectorAll("#heroTitle,#heroSubtitle,#ctaText,#ctaLink,#heroImage,#zaloQR,#tiktokQR")
            .forEach(e => e.disabled = true);
    }
}

// ===== Thêm thông báo =====
function addNotification(text = "") {
    const div = document.createElement("div");
    div.innerHTML = `
    <input type="text" value="${text}" placeholder="Nội dung thông báo" style="width:80%;">
    <button type="button" onclick="this.parentElement.remove()">Xóa</button>`;
    document.getElementById("notifications").appendChild(div);
}

// ===== Thêm liên hệ =====
function addContact(type = "", link = "") {
    const div = document.createElement("div");
    div.innerHTML = `
    <input type="text" value="${type}" placeholder="Loại liên hệ (VD: Zalo, TikTok...)" style="width:30%;">
    <input type="text" value="${link}" placeholder="Liên kết hoặc số điện thoại" style="width:50%;">
    <button type="button" onclick="this.parentElement.remove()">Xóa</button>`;
    document.getElementById("contacts").appendChild(div);
}

// ===== Lưu dữ liệu =====
async function saveData() {
    const formData = new FormData();

    if (currentAdmin.role === "super") {
        formData.append("heroTitle", document.getElementById("heroTitle").value);
        formData.append("heroSubtitle", document.getElementById("heroSubtitle").value);
        formData.append("ctaText", document.getElementById("ctaText").value);
        formData.append("ctaLink", document.getElementById("ctaLink").value);

        const heroImage = document.getElementById("heroImage").files[0];
        const zaloQR = document.getElementById("zaloQR").files[0];
        const tiktokQR = document.getElementById("tiktokQR").files[0];
        if (heroImage) formData.append("heroImage", heroImage);
        if (zaloQR) formData.append("zaloQR", zaloQR);
        if (tiktokQR) formData.append("tiktokQR", tiktokQR);
    }

    // Danh sách thông báo
    const notifications = [];
    document.querySelectorAll('#notifications input').forEach(i => {
        if (i.value.trim()) notifications.push(i.value.trim());
    });
    formData.append("notifications", JSON.stringify(notifications));

    // Danh sách liên hệ
    const contacts = [];
    document.querySelectorAll('#contacts div').forEach(div => {
        const inputs = div.querySelectorAll('input');
        if (inputs[0].value && inputs[1].value) {
            contacts.push({ type: inputs[0].value, link: inputs[1].value });
        }
    });
    formData.append("contacts", JSON.stringify(contacts));

    try {
        const res = await fetch("/api/updateData", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        if (data.message) {
            alert("✅ " + data.message);
        } else {
            alert("❌ Lưu thất bại, vui lòng thử lại!");
        }
    } catch (error) {
        alert("⚠️ Lỗi kết nối tới máy chủ: " + error.message);
    }
}

// ===== Tải tin nhắn khách hàng =====
async function loadMessages() {
    const res = await fetch("/api/getMessages");
    const msgs = await res.json();
    const list = document.getElementById("messagesList");
    list.innerHTML = "";

    if (msgs.length === 0) {
        list.textContent = "Chưa có tin nhắn nào.";
        return;
    }

    msgs.forEach(m => {
        const div = document.createElement("div");
        div.style.background = "#1a1a1a";
        div.style.margin = "10px";
        div.style.padding = "10px";
        div.style.borderRadius = "8px";
        div.innerHTML = `<b>${m.name}</b> (${m.phone})<br>${m.message}<br><small>${m.time}</small>`;
        list.appendChild(div);
    });
}
