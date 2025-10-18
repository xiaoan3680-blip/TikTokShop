let adminKey = "";

function login() {
    adminKey = document.getElementById("pin").value.trim();
    fetch("/api/data")
        .then(res => res.json())
        .then(data => {
            if (adminKey !== data.adminKey) return alert("Sai mã PIN!");

            document.getElementById("login").classList.add("hidden");
            document.getElementById("adminForm").classList.remove("hidden");

            // Điền dữ liệu hiện tại vào form
            document.getElementById("title").value = data.title;
            document.getElementById("description").value = data.description;
            document.getElementById("about").value = data.about;
            document.getElementById("logo").value = data.logo || "";
            document.getElementById("faviconUrl").value = data.favicon || "";
            document.getElementById("email").value = data.contact.email;
            document.getElementById("phone").value = data.contact.phone;
            document.getElementById("facebook").value = data.contact.facebook;
            document.getElementById("tiktok").value = data.contact.tiktok;
            document.getElementById("zalo").value = data.contact.zalo;
            document.getElementById("qrZalo").value = data.qr.zalo;
            document.getElementById("qrTiktok").value = data.qr.tiktok;

            // Cập nhật logo và favicon hiện tại
            updateLogoPreview();
        });
}

function updateLogoPreview() {
    const logoUrl = document.getElementById("logo").value.trim();
    const faviconUrl = document.getElementById("faviconUrl").value.trim();

    if (logoUrl) {
        const img = document.getElementById("siteLogo");
        const preview = document.getElementById("previewLogo");
        img.src = logoUrl;
        preview.src = logoUrl;
        preview.classList.remove("hidden");
    }

    if (faviconUrl) {
        document.getElementById("favicon").href = faviconUrl;
    }
}

function saveChanges() {
    const updated = {
        adminKey,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        about: document.getElementById("about").value,
        logo: document.getElementById("logo").value,
        favicon: document.getElementById("faviconUrl").value,
        contact: {
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            facebook: document.getElementById("facebook").value,
            tiktok: document.getElementById("tiktok").value,
            zalo: document.getElementById("zalo").value
        },
        qr: {
            zalo: document.getElementById("qrZalo").value,
            tiktok: document.getElementById("qrTiktok").value
        }
    };

    fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    })
        .then(res => res.json())
        .then(data => alert(data.message || "Đã lưu thay đổi!"))
        .catch(() => alert("Lỗi khi lưu dữ liệu!"));
}
