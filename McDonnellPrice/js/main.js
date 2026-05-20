// McDonnell-Price — main.js

// Lucide icons
(function () {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
  script.onload = () => { if (typeof lucide !== 'undefined') lucide.createIcons(); };
  document.head.appendChild(script);
})();

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile nav toggle ──
  const hamburger = document.getElementById('hamburger');
  const navWrap   = document.getElementById('site-nav-wrap');
  const navList   = document.getElementById('nav-list');

  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      if (navWrap) navWrap.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      const [s1, , s3] = hamburger.querySelectorAll('span');
      if (open) {
        s1.style.transform = 'translateY(7px) rotate(45deg)';
        hamburger.querySelectorAll('span')[1].style.opacity = '0';
        s3.style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        if (navWrap) navWrap.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ── Active nav link ──
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === file || (file === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.10 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ── Gallery lightbox ──
  const galleryItems = document.querySelectorAll('.gallery-item img');
  if (galleryItems.length) {
    const overlay = Object.assign(document.createElement('div'), {
      style: 'display:none;position:fixed;inset:0;background:rgba(9,20,38,0.95);z-index:1000;align-items:center;justify-content:center;cursor:pointer;'
    });
    const lbImg = Object.assign(document.createElement('img'), {
      style: 'max-width:90vw;max-height:90vh;border-radius:8px;'
    });
    overlay.appendChild(lbImg);
    document.body.appendChild(overlay);
    galleryItems.forEach(img => {
      img.addEventListener('click', () => { lbImg.src = img.src; overlay.style.display = 'flex'; });
    });
    overlay.addEventListener('click', () => { overlay.style.display = 'none'; });
  }
});
