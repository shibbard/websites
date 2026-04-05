// Everybody's Beautiful – main.js

document.addEventListener('DOMContentLoaded', () => {

  // ---- Load Lucide icons ----
  const lucideScript = document.createElement('script');
  lucideScript.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
  lucideScript.onload = () => {
    replaceIcons();
    lucide.createIcons();
  };
  document.head.appendChild(lucideScript);

  // ---- Replace emoji icons with Lucide ----
  function replaceIcons() {
    // Treatment category icons on homepage / treatments page
    const iconMap = {
      '🌸': 'flower-2',
      '💆': 'heart-handshake',
      '👁️': 'eye',
      '🪷': 'flower',
      '☀️': 'sun',
      '💉': 'syringe',
      '🕊️': 'feather',
      '💅': 'paintbrush-2',
      '💎': 'gem',
      '💫': 'star',
      '✨': 'sparkles',
      '🌿': 'leaf',
      '🎁': 'gift',
      '💧': 'droplets',
      '⚡': 'zap',
      '💼': 'briefcase',
      '💝': 'heart',
      '💻': 'monitor',
      '📋': 'clipboard-list',
      '📞': 'phone',
      '✉️': 'mail',
      '📍': 'map-pin',
      '🗓️': 'calendar',
    };

    // Replace .icon and .card-icon divs/spans
    document.querySelectorAll('.icon, .card-icon').forEach(el => {
      const text = el.textContent.trim();
      const lucideName = iconMap[text];
      if (lucideName) {
        el.innerHTML = `<i data-lucide="${lucideName}"></i>`;
        el.classList.add('lucide-icon-wrap');
      }
    });

    // Replace contact-icon content
    document.querySelectorAll('.contact-icon').forEach(el => {
      const text = el.textContent.trim();
      const lucideName = iconMap[text];
      if (lucideName) {
        el.innerHTML = `<i data-lucide="${lucideName}"></i>`;
      }
    });

    // Strip emoji from footer links (replace with small inline icon)
    document.querySelectorAll('.footer-col a').forEach(a => {
      const href = a.getAttribute('href') || '';
      let icon = null;
      if (href.startsWith('tel:'))    icon = 'phone';
      else if (href.startsWith('mailto:')) icon = 'mail';
      else if (a.textContent.includes('High Street') || a.textContent.includes('Stonehouse')) icon = 'map-pin';
      else if (href.includes('phorest')) icon = 'calendar';

      if (icon) {
        // Strip leading emoji and whitespace
        const cleanText = a.textContent.replace(/^[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}📞✉️📍🗓️✨💆🌿🎁\s]+/gu, '').trim();
        a.innerHTML = `<i data-lucide="${icon}" class="footer-link-icon"></i>${cleanText}`;
      }
    });

    // Strip emoji from CTA / contact buttons
    document.querySelectorAll('.btn').forEach(btn => {
      // Remove leading emoji + whitespace from button text
      btn.innerHTML = btn.innerHTML.replace(/^([\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}📞✉️📍🗓️✨🎁🗓️]\s*)+/gu, '').trim();
    });

    // Announcement bar - strip emoji
    document.querySelectorAll('.announcement').forEach(el => {
      el.innerHTML = el.innerHTML.replace(/✨\s*/g, '');
    });
  }

  // ---- Mobile nav toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navList.classList.contains('open'));
    });
  }

  // ---- Mobile: dropdown toggles ----
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // ---- Active nav link ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ---- Smooth reveal on scroll ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .team-card, .review-card, .treatment-section, .brand-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // ---- Close mobile menu on outside click ----
  document.addEventListener('click', (e) => {
    if (navList && !e.target.closest('.site-nav')) {
      navList.classList.remove('open');
    }
  });

});
