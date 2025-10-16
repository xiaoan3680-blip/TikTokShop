let appData = {};

// --- Tải dữ liệu từ server ---
async function loadData() {
    const res = await fetch("/api/data");
    return await res.json();
}

// --- Lưu dữ liệu lên server ---
async function saveData() {
    await fetch("/api/admin/update-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appData),
    });
    alert("✅ Dữ liệu đã được lưu thành công!");
}

// --- Hiển thị danh sách mã QR ---
function renderQRList() {
    const list = document.getElementById("qr-list");
    list.innerHTML = "";
    appData.qrcodes.forEach((qr, index) => {
        const div = document.createElement("div");
        div.className = "border border-gray-700 p-4 rounded bg-[#111]";
        div.innerHTML = `
      <label>Tên QR:</label>
      <input type="text" value="${qr.label}" id="label-${index}" class="text-black rounded w-full mb-2 px-2 py-1" />
      <label>Link ảnh QR:</label>
      <input type="text" value="${qr.image}" id="image-${index}" class="text-black rounded w-full mb-2 px-2 py-1" placeholder="Dán link ảnh .png hoặc .jpg">
      <div class="flex justify-between items-center">
        ${qr.image ? `<img src="${qr.image}" class="w-32 h-32 border rounded">` : "<p class='italic text-gray-400'>Chưa có ảnh</p>"}
        <button onclick="deleteQR(${index})" class="bg-red-500 px-3 py-1 rounded">🗑️ Xóa</button>
      </div>
    `;
        list.appendChild(div);
    });
}

// --- Xóa mã QR ---
function deleteQR(i) {
    appData.qrcodes.splice(i, 1);
    renderQRList();
}

// --- Hiển thị tin nhắn khách hàng ---
function renderMessages() {
    const list = document.getElementById("messages-list");
    if (!appData.messages || appData.messages.length === 0) {
        list.innerHTML = "<p class='italic text-gray-400'>Chưa có tin nhắn nào.</p>";
        return;
    }

    list.innerHTML = appData.messages.map(msg => `
    <div class="border border-gray-700 p-4 rounded bg-[#111]">
      <p><strong>👤 Tên:</strong> ${msg.name}</p>
      <p><strong>📧 Email:</strong> ${msg.email}</p>
      <p><strong>💬 Tin nhắn:</strong> ${msg.message}</p>
      <p class="text-gray-400 text-sm">🕒 ${msg.time}</p>
    </div>
  `).join("");
}

// --- Thêm mã QR mới ---
document.getElementById("add-qr").onclick = () => {
    appData.qrcodes.push({ label: "QR mới", image: "" });
    renderQRList();
};

// --- Lưu toàn bộ dữ liệu ---
document.getElementById("save-all").onclick = async () => {
    appData.qrcodes.forEach((qr, i) => {
        qr.label = document.getElementById(`label-${i}`).value;
        qr.image = document.getElementById(`image-${i}`).value;
    });
    await saveData();
};

// --- Đăng nhập admin ---
document.getElementById("login-btn").onclick = async () => {
    const pw = document.getElementById("admin-password").value;
    const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
    });
    const data = await res.json();
    if (data.success) {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("admin-panel").classList.remove("hidden");
        appData = await loadData();
        renderQRList();
        renderMessages();

        // Tự động làm mới danh sách tin nhắn mỗi 15 giây
        setInterval(async () => {
            appData = await loadData();
            renderMessages();
        }, 15000);

    } else alert("❌ Sai mật khẩu!");
};
