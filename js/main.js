const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const readMoreBtn = document.querySelector('.read-more-btn');
if (readMoreBtn) {
  const expanded = document.querySelector('.bio-expanded');
  readMoreBtn.addEventListener('click', () => {
    const isOpen = expanded.classList.toggle('open');
    readMoreBtn.textContent = isOpen ? 'Read Less ↑' : 'Read More ↓';
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    lightboxImg.src = el.href;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

document.querySelectorAll('.booking-email').forEach(el => {
  const email = el.dataset.u + '@' + el.dataset.d + '.' + el.dataset.t;
  el.href = 'mailto:' + email;
  el.textContent = email;
});
