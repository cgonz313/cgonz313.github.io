fetch('instagram/posts.json')
  .then(r => r.json())
  .then(posts => {
    if (!posts.length) return;
    const grid = document.getElementById('ig-grid');
    grid.innerHTML = posts.map(p => `
      <a class="ig-cell" href="${p.href}" target="_blank" rel="noopener">
        <img src="${p.src}" alt="Instagram post" loading="lazy">
      </a>
    `).join('');
  })
  .catch(() => {}); // silently keep placeholders if JSON isn't there yet
