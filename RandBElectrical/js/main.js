/* R & B Electrical Installations — main.js */

// Lucide icons
(function loadLucide() {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
  script.onload = () => { lucide.createIcons(); };
  document.head.appendChild(script);
})();

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Active nav link
  const links = document.querySelectorAll('nav a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Scroll reveal — fire as soon as any pixel enters the viewport
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Hard fallback: make everything visible after 1.2s regardless
    setTimeout(() => {
      reveals.forEach(el => el.classList.add('visible'));
    }, 1200);
  }

  // Sticky header shadow on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,37,77,0.12)'
        : 'none';
    }, { passive: true });
  }

  // Contact form handler
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.style.background = '#16a34a';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

});
