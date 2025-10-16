async function loadData() {
    const res = await fetch("/api/data");
    const data = await res.json();

    document.getElementById("title").value = data.site.title;
    document.getElementById("subtitle").value = data.site.subtitle;
    document.getElementById("logo").value = data.site.logo;
    document.getElementById("chat_id").value = data.site.chat_id;
    document.getElementById("chat_enabled").checked = data.site.chat_enabled;

    renderContacts(data.contacts);
}

function renderContacts(list) {
    const div = document.getElementById("contact-list");
    div.innerHTML = list.map((c, i) => `
    <div class="contact-item">
      <input id="c-name-${i}" value="${c.name}" placeholder="Tên">
      <input id="c-link-${i}" value="${c.link}" placeholder="Liên kết">
      <input id="c-icon-${i}" value="${c.icon}" placeholder="Icon (link ảnh)">
      <input id="c-color-${i}" value="${c.color}" placeholder="Màu (#hex)">
      <button onclick="removeContact(${i})">Xóa</button>
    </div>
  `).join("");
}

function addContact() {
    const div = document.getElementById("contact-list");
    const i = div.children.length;
    div.insertAdjacentHTML("beforeend", `
    <div class="contact-item">
      <input id="c-name-${i}" placeholder="Tên">
      <input id="c-link-${i}" placeholder="Liên kết">
      <input id="c-icon-${i}" placeholder="Icon">
      <input id="c-color-${i}" placeholder="Màu (#hex)">
      <button onclick="removeContact(${i})">Xóa</button>
    </div>
  `);
}

function removeContact(i) {
    document.getElementById(`c-name-${i}`).parentNode.remove();
}

async function saveData() {
    const res = await fetch("/api/data");
    const data = await res.json();

    data.site.title = document.getElementById("title").value;
    data.site.subtitle = document.getElementById("subtitle").value;
    data.site.logo = document.getElementById("logo").value;
    data.site.chat_id = document.getElementById("chat_id").value;
    data.site.chat_enabled = document.getElementById("chat_enabled").checked;

    const list = [];
    document.querySelectorAll('.contact-item').forEach((el, i) => {
        list.push({
            name: document.getElementById(`c-name-${i}`).value,
            link: document.getElementById(`c-link-${i}`).value,
            icon: document.getElementById(`c-icon-${i}`).value,
            color: document.getElementById(`c-color-${i}`).value
        });
    });
    data.contacts = list;

    const save = await fetch("/api/admin/update-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const resSave = await save.json();
    document.getElementById("status").textContent = resSave.success ? "✅ Đã lưu thành công!" : "❌ Lỗi khi lưu!";
}

loadData();
