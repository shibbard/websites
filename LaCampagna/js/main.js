/* ============================================================
   LA CAMPAGNA — main.js
   ============================================================ */

// ── Contact Form (Formspree) ──────────────────────────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name  = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending\u2026';

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (res.ok) {
      document.getElementById('form-container').style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    } else {
      const data = await res.json();
      alert(data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong. Please call us instead.');
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  } catch {
    alert('Could not send your message. Please call your nearest restaurant directly.');
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // ── Lucide Icons ─────────────────────────────────────────
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ── Mobile Nav ───────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Hero Slider ──────────────────────────────────────────
  const track = document.querySelector('.hero-slides');
  if (track) {
    const slides  = track.querySelectorAll('.hero-slide');
    const dots    = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-arrow-prev');
    const nextBtn = document.querySelector('.hero-arrow-next');
    let current = 0;
    let timer;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 5500);
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startTimer(); }));
    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startTimer(); });

    // Touch / swipe support
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); startTimer(); }
    });

    goTo(0);
    startTimer();
  }

  // ── Active Nav Link ──────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Scroll Reveal ────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ── Lightbox ─────────────────────────────────────────────
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');
  const lbItems   = Array.from(document.querySelectorAll('[data-lightbox]'));
  let lbIndex = 0;

  function lbOpen(index) {
    lbIndex = index;
    const item = lbItems[index];
    lbImg.src = item.dataset.img;
    lbImg.alt = item.dataset.caption || '';
    lbCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function lbCloseFn() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  if (lightbox && lbItems.length) {
    lbItems.forEach((item, i) => item.addEventListener('click', () => lbOpen(i)));
    lbClose.addEventListener('click', lbCloseFn);
    lbPrev.addEventListener('click', () => lbOpen((lbIndex - 1 + lbItems.length) % lbItems.length));
    lbNext.addEventListener('click', () => lbOpen((lbIndex + 1) % lbItems.length));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lbCloseFn(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     lbCloseFn();
      if (e.key === 'ArrowLeft')  lbOpen((lbIndex - 1 + lbItems.length) % lbItems.length);
      if (e.key === 'ArrowRight') lbOpen((lbIndex + 1) % lbItems.length);
    });
  }

});
