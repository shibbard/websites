/* ===========================
   Ian Rice Building Ltd
   main.js
   =========================== */

// ─── Lucide Icons ───────────────────────────────────────────────────────────
(function loadLucide() {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
  script.onload = () => {
    if (window.lucide) window.lucide.createIcons();
  };
  document.head.appendChild(script);
})();

// ─── Mobile Nav Toggle ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const navPrimary = document.querySelector('.nav-primary');
  const dropdownParents = document.querySelectorAll('.has-dropdown');

  if (toggle && navPrimary) {
    toggle.addEventListener('click', function () {
      const isOpen = navPrimary.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen);
      // toggle icon
      const icon = this.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // Mobile dropdown toggles
  dropdownParents.forEach(function (item) {
    const link = item.querySelector('a');
    if (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // Close nav when clicking outside
  document.addEventListener('click', function (e) {
    if (navPrimary && !navPrimary.contains(e.target) && toggle && !toggle.contains(e.target)) {
      navPrimary.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ─── Active nav link ──────────────────────────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-primary a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.split('/').pop() === currentPath) {
      link.classList.add('active');
    }
  });

  // ─── Scroll Reveal ────────────────────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // ─── Sticky header shadow on scroll ──────────────────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,.5)'
        : '0 2px 12px rgba(0,0,0,.35)';
    }, { passive: true });
  }
});
