// admin-news.js
// Script untuk mengelola berita di halaman admin

const form = document.getElementById('news-form');
const newsList = document.getElementById('news-list');
const cancelEditBtn = document.getElementById('cancel-edit');
const newsIdInput = document.getElementById('news-id');
const titleInput = document.getElementById('news-title');
const contentInput = document.getElementById('news-content');
const imageInput = document.getElementById('news-image');
const fullInput = document.getElementById('news-full');

function getNews() {
  return JSON.parse(localStorage.getItem('news') || '[]');
}

function saveNews(news) {
  localStorage.setItem('news', JSON.stringify(news));
}

function renderNewsList() {
  const news = getNews();
  newsList.innerHTML = '';
  if (news.length === 0) {
    newsList.innerHTML = '<div class="text-slate-400">Belum ada berita.</div>';
    return;
  }
  news.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'bg-slate-800 rounded-lg shadow p-4 flex flex-col md:flex-row gap-4';
    div.innerHTML = `
      <img src="${item.image || 'assets/images/adinaya.webp'}" alt="Gambar Berita" class="w-32 h-32 object-cover rounded mb-2 md:mb-0">
      <div class="flex-1">
        <h4 class="text-xl font-bold mb-1">${item.title}</h4>
        <p class="text-slate-300 mb-2">${item.content}</p>
        <p class="text-slate-400 text-sm mb-2">${item.full ? item.full.substring(0, 60) + (item.full.length > 60 ? '...' : '') : ''}</p>
        <div class="flex gap-2 mb-2">
          <a href="news/detail.html?id=${idx}" target="_blank" class="bg-slate-700 hover:bg-indigo-500 text-white px-4 py-1 rounded">Lihat Detail</a>
        </div>
        <div class="flex gap-2">
          <button class="edit-btn bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded" data-idx="${idx}">Edit</button>
          <button class="delete-btn bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded" data-idx="${idx}">Hapus</button>
        </div>
      </div>
    `;
    newsList.appendChild(div);
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const news = getNews();
  const id = newsIdInput.value;
  const newItem = {
    title: titleInput.value,
    content: contentInput.value,
    full: fullInput.value,
    image: imageInput.value
  };
  if (id) {
    news[id] = newItem;
  } else {
    news.unshift(newItem);
  }
  saveNews(news);
  form.reset();
  newsIdInput.value = '';
  cancelEditBtn.classList.add('hidden');
  renderNewsList();
});

newsList.addEventListener('click', function(e) {
  if (e.target.classList.contains('edit-btn')) {
    const idx = e.target.getAttribute('data-idx');
    const news = getNews();
    const item = news[idx];
    newsIdInput.value = idx;
    titleInput.value = item.title;
    contentInput.value = item.content;
    fullInput.value = item.full || '';
    imageInput.value = item.image;
    cancelEditBtn.classList.remove('hidden');
  }
  if (e.target.classList.contains('delete-btn')) {
    const idx = e.target.getAttribute('data-idx');
    const news = getNews();
    if (confirm('Yakin ingin menghapus berita ini?')) {
      news.splice(idx, 1);
      saveNews(news);
      renderNewsList();
    }
  }
});

cancelEditBtn.addEventListener('click', function() {
  form.reset();
  newsIdInput.value = '';
  fullInput.value = '';
  cancelEditBtn.classList.add('hidden');
});

// Render saat halaman dibuka
renderNewsList();
