/* ═══════════════════════════════════════════════════════
   script.js — Delegación Ingeniería Informática UNT
   PERUMEC 2026 Cusco
   ═══════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────
   LINKS CONFIGURABLES
   Reemplaza estos valores antes de desplegar en Vercel.
   ───────────────────────────────────────────────────── */
const CONFIG = {
  WHATSAPP_URL:    'WHATSAPP_URL_AQUI',      // Ej: 'https://wa.me/51999999999?text=Hola, quiero información sobre PERUMEC 2026'
  GOOGLE_DRIVE_URL:'GOOGLE_DRIVE_URL_AQUI',  // Ej: 'https://drive.google.com/drive/folders/XXXXX'
  FORMULARIO_URL:  'FORMULARIO_URL_AQUI',    // Ej: 'https://forms.gle/XXXXX'
  LINK_WEB:        'LINK_WEB_AQUI',          // Ej: 'https://perumec-unt.vercel.app'
};

/* ─────────────────────────────────────────────────────
   MENÚ HAMBURGUESA (MÓVIL)
   ───────────────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  if (!hamburger || !navMobile) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    navMobile.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cerrar menú al hacer click en un link del menú móvil
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      navMobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
})();

/* ─────────────────────────────────────────────────────
   HEADER SCROLL EFFECT
   ───────────────────────────────────────────────────── */
(function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial
})();

/* ─────────────────────────────────────────────────────
   SCROLL SUAVE (fallback para navegadores sin soporte CSS)
   ───────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─────────────────────────────────────────────────────
   REVEAL ON SCROLL (IntersectionObserver)
   ───────────────────────────────────────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Si el navegador no soporta IntersectionObserver, mostrar todo directamente
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  // Respetar preferencia de movimiento reducido
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // una sola vez
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ─────────────────────────────────────────────────────
   CONTADOR ANIMADO PARA MÉTRICAS
   ───────────────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.metric-num[data-target]');
  if (!counters.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    if (prefersReduced) {
      el.textContent = target.toLocaleString('es-PE');
      return;
    }

    const duration = 1600; // ms
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString('es-PE');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();

/* ─────────────────────────────────────────────────────
   BOTÓN VOLVER ARRIBA
   ───────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const onScroll = () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ─────────────────────────────────────────────────────
   PLACEHOLDERS DE IMAGEN
   Si una imagen no carga, agrega clase para mostrar
   el placeholder con degradado.
   ───────────────────────────────────────────────────── */
document.querySelectorAll('img[onerror]').forEach(img => {
  if (!img.complete || img.naturalWidth === 0) {
    // ya manejado por el onerror del HTML
  }
});
