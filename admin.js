let appData = { contact: {} };

// --- Lấy dữ liệu từ server ---
async function loadData() {
    const res = await fetch("/api/data");
    const data = await res.json();
    return data;
}

// --- Ghi dữ liệu vào server ---
async function saveData() {
    const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appData),
    });
    return await res.json();
}

// --- Hiển thị giao diện form liên hệ ---
function renderContact() {
    const section = document.getElementById("admin-contact");
    if (!section) return;

    section.innerHTML = `
    <h2 class='text-xl font-semibold mb-4 text-tiktok-cyan'>Thông tin liên hệ & Mạng xã hội</h2>

    <label>Email:</label>
    <input type='email' id='contact-email' value='${appData.contact.email || ""}'>

    <label>Điện thoại:</label>
    <input type='text' id='contact-phone' value='${appData.contact.phone || ""}'>

    <label>Facebook:</label>
    <input type='text' id='contact-facebook' value='${appData.contact.facebook || ""}'>

    <label>TikTok:</label>
    <input type='text' id='contact-tiktok' value='${appData.contact.tiktok || ""}'>

    <label>Instagram:</label>
    <input type='text' id='contact-instagram' value='${appData.contact.instagram || ""}'>

    <label>Ảnh mã QR (URL):</label>
    <input type='text' id='contact-qr' value='${appData.contact.qr || ""}' placeholder='Dán link hình QR...'>
    
    <div style="text-align:center; margin-top:15px">
      ${appData.contact.qr
            ? `<img src="${appData.contact.qr}" class="w-40 h-40 border rounded">`
            : "<p class='text-gray-400 italic'>Chưa có mã QR</p>"
        }
    </div>

    <button id='save-contact-btn' class='bg-tiktok-pink text-white px-4 py-2 rounded mt-4'>💾 Lưu thông tin</button>
  `;

    document.getElementById("save-contact-btn").onclick = async () => {
        appData.contact.email = document.getElementById("contact-email").value;
        appData.contact.phone = document.getElementById("contact-phone").value;
        appData.contact.facebook = document.getElementById("contact-facebook").value;
        appData.contact.tiktok = document.getElementById("contact-tiktok").value;
        appData.contact.instagram = document.getElementById("contact-instagram").value;
        appData.contact.qr = document.getElementById("contact-qr").value;

        await saveData();
        alert("✅ Đã lưu thông tin liên hệ thành công!");
        renderContact();
    };
}

// --- Khi load trang ---
window.onload = async () => {
    appData = await loadData();
    renderContact();
};
