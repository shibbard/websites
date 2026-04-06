// JAX Electrical Services - main.js
// Lucide icons via CDN
import { createIcons, icons } from 'https://unpkg.com/lucide@latest/dist/esm/lucide.js';

document.addEventListener('DOMContentLoaded', () => {
  // ── Lucide Icons ─────────────────────────────
  createIcons({ icons });

  // ── Mobile Nav Toggle ─────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // ── Mobile Dropdown ───────────────────────────
  const mobileDropdownToggle = document.getElementById('mobile-our-work-toggle');
  const mobileDropdown = document.getElementById('mobile-our-work');
  if (mobileDropdownToggle && mobileDropdown) {
    mobileDropdownToggle.addEventListener('click', () => {
      mobileDropdown.classList.toggle('open');
      mobileDropdown.style.display = mobileDropdown.classList.contains('open') ? 'block' : 'none';
    });
    mobileDropdown.style.display = 'none';
  }

  // ── Active Nav Link ───────────────────────────
  const currentPath = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop() || 'index.html';
    if (href === currentPath) link.classList.add('active');
  });

  // ── Scroll Reveal ─────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
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
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ── Slideshow (Our Work pages) ────────────────
  const slideshow = document.getElementById('slideshow');
  if (slideshow) {
    const images = JSON.parse(slideshow.dataset.images || '[]');
    if (images.length > 1) {
      let idx = 0;
      slideshow.style.backgroundImage = `url('${images[0]}')`;
      setInterval(() => {
        slideshow.style.opacity = '0';
        setTimeout(() => {
          idx = (idx + 1) % images.length;
          slideshow.style.backgroundImage = `url('${images[idx]}')`;
          slideshow.style.opacity = '1';
        }, 400);
      }, 4000);
      slideshow.style.transition = 'opacity 0.4s ease';
    } else if (images.length === 1) {
      slideshow.style.backgroundImage = `url('${images[0]}')`;
    }
  }

  // ── Contact Form ──────────────────────────────
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Message Sent!';
      btn.disabled = true;
      btn.style.background = '#16a34a';
      setTimeout(() => {
        btn.textContent = 'Send Enquiry';
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 4000);
    });
  }
});
