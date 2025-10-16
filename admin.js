async function loadData() {
    const res = await fetch("/api/data");
    const data = await res.json();

    document.getElementById("title").value = data.site.title;
    document.getElementById("subtitle").value = data.site.subtitle;
    document.getElementById("homepage").value = data.site.homepage;
    document.getElementById("chat_id").value = data.site.chat_id;
    document.getElementById("chat_enabled").checked = data.site.chat_enabled;
    document.getElementById("theme_color").value = data.site.theme_color;

    renderQR(data.qrcodes);
}

function renderQR(qrs) {
    const container = document.getElementById("qr-list");
    container.innerHTML = qrs.map((qr, i) => `
    <div style="border:1px solid #333; border-radius:8px; padding:10px; margin:10px;">
      <input id="qr-label-${i}" value="${qr.label}" placeholder="Tên QR">
      <input id="qr-img-${i}" value="${qr.image}" placeholder="Link ảnh QR">
      <button class="btn-primary" onclick="deleteQR(${i})">Xóa</button>
    </div>
  `).join("");
}

function addQR() {
    const container = document.getElementById("qr-list");
    const index = container.children.length;
    const div = document.createElement("div");
    div.innerHTML = `
    <div style="border:1px solid #333; border-radius:8px; padding:10px; margin:10px;">
      <input id="qr-label-${index}" placeholder="Tên QR">
      <input id="qr-img-${index}" placeholder="Link ảnh QR">
    </div>
  `;
    container.appendChild(div);
}

function deleteQR(index) {
    document.getElementById(`qr-label-${index}`).parentNode.remove();
}

async function saveData() {
    const res = await fetch("/api/data");
    const data = await res.json();

    data.site = {
        title: document.getElementById("title").value,
        subtitle: document.getElementById("subtitle").value,
        homepage: document.getElementById("homepage").value,
        chat_id: document.getElementById("chat_id").value,
        chat_enabled: document.getElementById("chat_enabled").checked,
        theme_color: document.getElementById("theme_color").value
    };

    const qrs = [];
    const qrDivs = document.querySelectorAll("[id^='qr-label-']");
    qrDivs.forEach((el, i) => {
        qrs.push({
            label: document.getElementById(`qr-label-${i}`).value,
            image: document.getElementById(`qr-img-${i}`).value
        });
    });
    data.qrcodes = qrs;

    const update = await fetch("/api/admin/update-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await update.json();
    document.getElementById("status").textContent = result.success
        ? "✅ Đã lưu dữ liệu thành công!"
        : "❌ Lưu thất bại!";
}

loadData();
