async function loadData() {
    const res = await fetch("/api/data");
    const data = await res.json();

    document.getElementById("phone").value = data.contact.phone;
    document.getElementById("email").value = data.contact.email;
    document.getElementById("facebook").value = data.contact.facebook;
    document.getElementById("tiktok").value = data.contact.tiktok;
    document.getElementById("zalo").value = data.contact.zalo;

    const qrList = document.getElementById("qrList");
    qrList.innerHTML = data.qrcodes.map(
        (qr, i) => `
    <div>
      <input value="${qr.label}" placeholder="Tên mã QR">
      <input value="${qr.image}" placeholder="Link ảnh QR">
    </div>`
    ).join("");
}

document.getElementById("saveData").addEventListener("click", async () => {
    const updatedData = {
        contact: {
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            facebook: document.getElementById("facebook").value,
            tiktok: document.getElementById("tiktok").value,
            zalo: document.getElementById("zalo").value
        }
    };
    const res = await fetch("/api/admin/update-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    });
    const result = await res.json();
    alert(result.success ? "✅ Lưu thành công!" : "❌ Lỗi khi lưu dữ liệu!");
});

loadData();
