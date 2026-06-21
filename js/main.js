const widgetColors = {
  newsprint: { bgcolor: 'F0E2B0', textcolor: '1A0C04', linkcolor: 'C01810', darkbuttons: true },
  hardwood:  { bgcolor: '0D1B2A', textcolor: 'F5E8C4', linkcolor: 'C49410', darkbuttons: false },
  bourbon:   { bgcolor: '1C0A02', textcolor: 'F2DEB8', linkcolor: 'E8A020', darkbuttons: false },
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const c = widgetColors[theme] || widgetColors.newsprint;
  const widget = document.getElementById('ra-widget');
  if (widget) {
    widget.src = `https://ra.co/widget/eventlisting?dj=craiggonzalez&bgcolor=${c.bgcolor}&textcolor=${c.textcolor}&linkcolor=${c.linkcolor}&darkbuttons=${c.darkbuttons}`;
  }
}

const savedTheme = localStorage.getItem('cg-theme') || 'newsprint';
applyTheme(savedTheme);

const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.value = savedTheme;
themeSwitcher.addEventListener('change', () => {
  const theme = themeSwitcher.value;
  applyTheme(theme);
  localStorage.setItem('cg-theme', theme);
});

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
