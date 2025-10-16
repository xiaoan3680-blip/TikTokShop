async function fetchData() {
    const res = await fetch('/api/data');
    return await res.json();
}

async function loadData() {
    const data = await fetchData();

    // Thông tin chung
    document.getElementById('site-title').value = data.site?.title || '';
    document.getElementById('site-slogan').value = data.site?.slogan || '';
    document.getElementById('site-link').value = data.site?.brand_link || '';
    document.getElementById('site-image').value = data.site?.brand_image || '';
    document.getElementById('contact-phone').value = data.contact?.phone || '';
    document.getElementById('chat-code').value = data.chat?.code || '';
    document.getElementById('chat-enable').checked = data.chat?.enabled || false;

    // Liên hệ
    document.getElementById('contact-email').value = data.contact?.email || '';
    document.getElementById('contact-facebook').value = data.contact?.facebook || '';
    document.getElementById('contact-tiktok').value = data.contact?.tiktok || '';
    document.getElementById('contact-instagram').value = data.contact?.instagram || '';

    // QR
    const qrList = document.getElementById('qr-list');
    qrList.innerHTML = '';
    data.qrcodes?.forEach((qr, i) => {
        const div = document.createElement('div');
        div.className = 'qr-item';
        div.innerHTML = `
      <span>${qr.label}</span>
      <input type="text" value="${qr.image}" readonly />
      <button onclick="removeQR(${i})">Xóa</button>
    `;
        qrList.appendChild(div);
    });
}

function removeQR(index) {
    fetch('/api/admin/remove-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
    }).then(() => loadData());
}

document.getElementById('add-qr').onclick = () => {
    const label = document.getElementById('qr-label').value;
    const image = document.getElementById('qr-image').value;
    fetch('/api/admin/add-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label, image })
    }).then(() => loadData());
};

document.getElementById('save-main').onclick = () => {
    const payload = {
        title: document.getElementById('site-title').value,
        slogan: document.getElementById('site-slogan').value,
        brand_link: document.getElementById('site-link').value,
        brand_image: document.getElementById('site-image').value,
        phone: document.getElementById('contact-phone').value,
        chat_code: document.getElementById('chat-code').value,
        chat_enable: document.getElementById('chat-enable').checked
    };
    fetch('/api/admin/update-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
};

document.getElementById('save-contact').onclick = () => {
    const payload = {
        email: document.getElementById('contact-email').value,
        facebook: document.getElementById('contact-facebook').value,
        tiktok: document.getElementById('contact-tiktok').value,
        instagram: document.getElementById('contact-instagram').value
    };
    fetch('/api/admin/update-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
};

loadData();
