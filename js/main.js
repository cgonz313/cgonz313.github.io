const widgetColors = {
  newsprint:     { bgcolor: 'F0E2B0', textcolor: '1A0C04', linkcolor: 'C01810', darkbuttons: true },
  hardwood:      { bgcolor: '0D1B2A', textcolor: 'F5E8C4', linkcolor: 'C49410', darkbuttons: false },
  bourbon:       { bgcolor: '1C0A02', textcolor: 'F2DEB8', linkcolor: 'E8A020', darkbuttons: false },
  amigos:        { bgcolor: '0E0E0E', textcolor: 'F5F0E8', linkcolor: 'DE7C00', darkbuttons: false },
  cougars:       { bgcolor: '1C4A82', textcolor: 'FFFFFF', linkcolor: 'C8102E', darkbuttons: false },
  chaparrals:    { bgcolor: '002080', textcolor: 'F5F0EC', linkcolor: 'D50032', darkbuttons: false },
  rockets:       { bgcolor: '3E1060', textcolor: 'FFFFFF', linkcolor: 'FEDD00', darkbuttons: false },
  nuggets:       { bgcolor: '003DA5', textcolor: 'FFF8E8', linkcolor: 'FFC72C', darkbuttons: false },
  floridians:    { bgcolor: '0A0A0A', textcolor: 'F5F0EC', linkcolor: 'E35205', darkbuttons: false },
  mavericks:     { bgcolor: '002468', textcolor: 'FFF8E8', linkcolor: 'FFC72C', darkbuttons: false },
  pacers:        { bgcolor: '001E7C', textcolor: 'FFF8E8', linkcolor: 'FEDD00', darkbuttons: false },
  colonels:      { bgcolor: '00451E', textcolor: 'F0EDDC', linkcolor: 'C09020', darkbuttons: false },
  lastars:       { bgcolor: 'D8EEF8', textcolor: '0A1830', linkcolor: 'D50032', darkbuttons: true },
  tams:          { bgcolor: '004A1E', textcolor: 'F5EDD0', linkcolor: 'FFC72C', darkbuttons: false },
  miami:         { bgcolor: '002060', textcolor: 'FFF0E8', linkcolor: 'E35205', darkbuttons: false },
  muskies:       { bgcolor: '002880', textcolor: 'FFF8EC', linkcolor: 'B08C5C', darkbuttons: false },
  nets:          { bgcolor: 'F5F2EC', textcolor: '0A0A18', linkcolor: 'D50032', darkbuttons: true },
  buccaneers:    { bgcolor: '041E42', textcolor: 'F5E8CC', linkcolor: 'D50032', darkbuttons: false },
  oaks:          { bgcolor: '1A4020', textcolor: 'F0EDDC', linkcolor: 'FFA400', darkbuttons: false },
  condors:       { bgcolor: '5C0010', textcolor: 'FFF0E0', linkcolor: 'FFCD00', darkbuttons: false },
  pipers:        { bgcolor: '001E6C', textcolor: 'FFF8E8', linkcolor: 'FFD100', darkbuttons: false },
  spurs:         { bgcolor: '080808', textcolor: 'E8E8E8', linkcolor: 'C1C6C8', darkbuttons: false },
  conquistadors: { bgcolor: '8C0010', textcolor: 'FFFDE8', linkcolor: 'FFC72C', darkbuttons: false },
  sails:         { bgcolor: '002580', textcolor: 'F5F8FC', linkcolor: '00843D', darkbuttons: false },
  spirits:       { bgcolor: '100C08', textcolor: 'F0ECE8', linkcolor: 'BE3A34', darkbuttons: false },
  stars:         { bgcolor: '002878', textcolor: 'F5F0EC', linkcolor: 'D50032', darkbuttons: false },
  squires:       { bgcolor: '2A1E1A', textcolor: 'F5EDE0', linkcolor: 'FF8200', darkbuttons: false },
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const c = widgetColors[theme] || widgetColors.newsprint;
  const widget = document.getElementById('ra-widget');
  if (widget) {
    widget.src = `https://ra.co/widget/eventlisting?dj=craiggonzalez&bgcolor=${c.bgcolor}&textcolor=${c.textcolor}&linkcolor=${c.linkcolor}&darkbuttons=${c.darkbuttons}`;
  }
}

const savedTheme = localStorage.getItem('cg-theme') || 'spirits';
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

document.getElementById('footer-year').textContent = new Date().getFullYear();

let secretClicks = 0;
let secretTimer;
document.querySelector('.footer-logo').addEventListener('click', () => {
  secretClicks++;
  clearTimeout(secretTimer);
  secretTimer = setTimeout(() => { secretClicks = 0; }, 2000);
  if (secretClicks >= 5) {
    secretClicks = 0;
    document.getElementById('main-nav').classList.toggle('picker-visible');
  }
});

document.querySelectorAll('.booking-email').forEach(el => {
  const email = el.dataset.u + '@' + el.dataset.d + '.' + el.dataset.t;
  el.href = 'mailto:' + email;
  el.textContent = email;
});
