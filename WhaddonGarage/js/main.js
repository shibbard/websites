import { createIcons, Wrench, Car, CheckCircle, ArrowRight, Phone, MapPin, Clock, Shield, Star, Zap, Settings, Truck, AlertTriangle, ChevronRight, Menu, X } from 'https://unpkg.com/lucide@latest/dist/esm/lucide.js';

document.addEventListener('DOMContentLoaded', () => {
  // Lucide icons
  createIcons({ icons: { Wrench, Car, CheckCircle, ArrowRight, Phone, MapPin, Clock, Shield, Star, Zap, Settings, Truck, AlertTriangle, ChevronRight, Menu, X } });

  // Mobile nav toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
});
