let appData = {};

async function loadData() {
    const res = await fetch("/api/data");
    return await res.json();
}

async function saveData() {
    await fetch("/api/admin/update-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appData),
    });
    alert("✅ Đã lưu dữ liệu thành công!");
}

function renderQRList() {
    const list = document.getElementById("qr-list");
    list.innerHTML = "";
    appData.qrcodes.forEach((qr, index) => {
        const div = document.createElement("div");
        div.className = "border border-gray-700 p-4 rounded";
        div.innerHTML = `
      <label>Tên QR:</label>
      <input type="text" value="${qr.label}" id="label-${index}" class="text-black rounded w-full mb-2 px-2 py-1" />
      <label>Link ảnh QR:</label>
      <input type="text" value="${qr.image}" id="image-${index}" class="text-black rounded w-full mb-2 px-2 py-1" placeholder="Dán link ảnh .png hoặc .jpg">
      <div class="flex justify-between">
        ${qr.image ? `<img src="${qr.image}" class="w-32 h-32 border rounded">` : "<p class='italic text-gray-400'>Chưa có ảnh</p>"}
        <button onclick="deleteQR(${index})" class="bg-red-500 px-3 py-1 rounded">🗑️ Xóa</button>
      </div>
    `;
        list.appendChild(div);
    });
}

function deleteQR(i) {
    appData.qrcodes.splice(i, 1);
    renderQRList();
}

document.getElementById("add-qr").onclick = () => {
    appData.qrcodes.push({ label: "QR mới", image: "" });
    renderQRList();
};

document.getElementById("save-all").onclick = async () => {
    appData.qrcodes.forEach((qr, i) => {
        qr.label = document.getElementById(`label-${i}`).value;
        qr.image = document.getElementById(`image-${i}`).value;
    });
    await saveData();
};

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
    } else alert("❌ Sai mật khẩu!");
};
