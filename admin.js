document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#adminForm");
    const qrList = document.querySelector("#qr-list");
    const messageBox = document.querySelector("#message-box");

    // Tải dữ liệu ban đầu
    fetch("/api/data")
        .then((res) => res.json())
        .then((data) => {
            document.querySelector("#title").value = data.title || "";
            document.querySelector("#description").value = data.description || "";
            document.querySelector("#homepage").value = data.homepage || "";
            document.querySelector("#phone").value = data.phone || "";

            qrList.innerHTML = "";
            (data.qr_codes || []).forEach((qr, i) => {
                const div = document.createElement("div");
                div.classList.add("qr-item");
                div.innerHTML = `
          <span>${qr.name}</span>
          <input type="text" value="${qr.image}" placeholder="Link hình ảnh QR">
          <input type="text" value="${qr.link}" placeholder="Liên kết nền tảng">
        `;
                qrList.appendChild(div);
            });

            // Hiển thị tin nhắn
            messageBox.innerHTML = "";
            (data.messages || []).forEach((msg) => {
                const m = document.createElement("div");
                m.classList.add("qr-item");
                m.innerHTML = `<strong>${msg.name}</strong> (${msg.email})<br><small>${msg.time}</small><br>${msg.message}`;
                messageBox.appendChild(m);
            });
        });

    // Thêm mã QR
    document.getElementById("add-qr").addEventListener("click", () => {
        const name = document.getElementById("new-qr-name").value;
        const image = document.getElementById("new-qr-img").value;
        const link = document.getElementById("new-qr-link").value;
        if (!name || !image) return alert("Vui lòng nhập đầy đủ thông tin!");

        const div = document.createElement("div");
        div.classList.add("qr-item");
        div.innerHTML = `
      <span>${name}</span>
      <input type="text" value="${image}" placeholder="Link hình ảnh QR">
      <input type="text" value="${link}" placeholder="Liên kết nền tảng">
    `;
        qrList.appendChild(div);

        document.getElementById("new-qr-name").value = "";
        document.getElementById("new-qr-img").value = "";
        document.getElementById("new-qr-link").value = "";
    });

    // Lưu thay đổi
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedData = {
            title: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            homepage: document.querySelector("#homepage").value,
            phone: document.querySelector("#phone").value,
            qr_codes: Array.from(document.querySelectorAll(".qr-item")).map((item) => ({
                name: item.querySelector("span").innerText,
                image: item.querySelectorAll("input")[0].value,
                link: item.querySelectorAll("input")[1].value
            }))
        };

        fetch("/api/admin/update-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
            .then((res) => res.json())
            .then((res) => {
                alert(res.success ? "✅ Lưu thành công!" : "❌ Lỗi khi cập nhật!");
            });
    });
});
