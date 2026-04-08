// JAX Electrical Services - main.js
// Lucide is loaded via CDN script tag in each HTML file

document.addEventListener('DOMContentLoaded', () => {

  // ── Lucide Icons ─────────────────────────────
  if (window.lucide) {
    lucide.createIcons();
  }

  // ── Enable JS-powered scroll reveal ──────────
  document.body.classList.add('js-ready');

  // ── Mobile Nav Toggle ─────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    });
  }

  // ── Mobile Our Work sub-toggle ────────────────
  const mobileDropdownToggle = document.getElementById('mobile-our-work-toggle');
  const mobileDropdown = document.getElementById('mobile-our-work');
  if (mobileDropdownToggle && mobileDropdown) {
    mobileDropdown.style.display = 'none';
    mobileDropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const open = mobileDropdown.style.display !== 'none';
      mobileDropdown.style.display = open ? 'none' : 'block';
    });
  }

  // ── Scroll Reveal ─────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    // Fallback: make all visible immediately
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ── Gallery Lightbox ──────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (lightbox) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.parentElement.addEventListener('click', () => {
        const fullSrc = img.src
          .replace('/thumb/', '/')
          .replace('-thumb.jpeg', '.jpeg');
        lightboxImg.src = fullSrc;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    };
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  // ── Slideshow (Our Work pages) ────────────────
  const slideshow = document.getElementById('slideshow');
  if (slideshow) {
    const images = JSON.parse(slideshow.dataset.images || '[]');
    if (images.length > 0) {
      slideshow.style.backgroundImage = `url('${images[0]}')`;
      slideshow.style.transition = 'opacity 0.4s ease';
      if (images.length > 1) {
        let idx = 0;
        setInterval(() => {
          slideshow.style.opacity = '0';
          setTimeout(() => {
            idx = (idx + 1) % images.length;
            slideshow.style.backgroundImage = `url('${images[idx]}')`;
            slideshow.style.opacity = '1';
          }, 400);
        }, 4000);
      }
    }
  }

  // ── Contact Form ──────────────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.textContent = 'Message Sent!';
      btn.disabled = true;
      btn.style.background = '#16a34a';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
        if (window.lucide) lucide.createIcons();
      }, 4000);
    });
  }
});
