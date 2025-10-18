const admins = [
    { user: "admin1", pass: "tkshop1" },
    { user: "admin2", pass: "tkshop2" },
    { user: "admin3", pass: "tkshop3" },
    { user: "admin4", pass: "tkshop4" },
    { user: "admin5", pass: "tkshop5" },
];

function login() {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();
    const err = document.getElementById("loginError");
    const valid = admins.find(a => a.user === u && a.pass === p);
    if (valid) {
        document.querySelector("section").style.display = "none";
        document.getElementById("adminPanel").style.display = "block";
        fetchData();
        loadMessages();
    } else {
        err.textContent = "❌ Sai tài khoản hoặc mật khẩu!";
    }
}

function addNotification() {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<input type="text" placeholder="Nội dung thông báo"><button onclick="this.parentElement.remove()">Xóa</button>`;
    document.getElementById("notificationsList").appendChild(div);
}

function addContact() {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<input type="text" placeholder="Loại liên hệ"><input type="text" placeholder="Liên kết"><button onclick="this.parentElement.remove()">Xóa</button>`;
    document.getElementById("contactsList").appendChild(div);
}

async function fetchData() {
    const res = await fetch("/api/getData");
    const data = await res.json();
    const notiList = document.getElementById("notificationsList");
    notiList.innerHTML = "";
    data.notifications.forEach(n => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `<input type="text" value="${n}"><button onclick="this.parentElement.remove()">Xóa</button>`;
        notiList.appendChild(div);
    });
    const cList = document.getElementById("contactsList");
    cList.innerHTML = "";
    data.contacts.forEach(c => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `<input type="text" value="${c.type}"><input type="text" value="${c.link}"><button onclick="this.parentElement.remove()">Xóa</button>`;
        cList.appendChild(div);
    });
}

async function uploadQRCodes() {
    const formData = new FormData();
    const zalo = document.getElementById("qrZalo").files[0];
    const tiktok = document.getElementById("qrTiktok").files[0];
    if (zalo) formData.append("qrZalo", zalo);
    if (tiktok) formData.append("qrTiktok", tiktok);
    await fetch("/api/uploadQR", { method: "POST", body: formData });
    alert("✅ Đã tải ảnh QR lên!");
}

async function saveData() {
    const notifications = Array.from(document.querySelectorAll("#notificationsList input")).map(i => i.value.trim()).filter(Boolean);
    const contacts = Array.from(document.querySelectorAll("#contactsList .item")).map(div => ({
        type: div.children[0].value,
        link: div.children[1].value,
    }));
    await fetch("/api/saveData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notifications, contacts }),
    });
    alert("✅ Đã lưu thay đổi!");
}

async function loadMessages() {
    const res = await fetch("/api/getMessages");
    const msgs = await res.json();
    const box = document.getElementById("messagesList");
    box.innerHTML = "";
    msgs.forEach(m => {
        const div = document.createElement("div");
        div.className = "message-box";
        div.innerHTML = `<strong>${m.name}</strong> (${m.phone})<br>${m.message}<br><small>${m.time}</small>`;
        box.appendChild(div);
    });
}
