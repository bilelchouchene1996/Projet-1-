/* =========================================================
   NOOR FÈS — Interactivité (sans dépendances)
   ========================================================= */
(function () {
  'use strict';

  // Year in footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  var menuBtn = document.querySelector('.menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var header = document.getElementById('header');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      if (!open) {
        mobileNav.hidden = false;
        header.classList.add('is-open');
      } else {
        mobileNav.hidden = true;
        header.classList.remove('is-open');
      }
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
        header.classList.remove('is-open');
      });
    });
  }

  // Header shadow on scroll
  var lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y > 4) header.style.boxShadow = '0 6px 24px rgba(28,20,16,.06)';
    else header.style.boxShadow = 'none';
    lastY = y;
  }, { passive: true });

  // Order form submission (front-end demo — POST to your endpoint in production)
  var form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = Object.fromEntries(new FormData(form).entries());

      // Basic validation
      if (!data.product || !data.name || !data.phone || !data.city || !data.address) {
        alert('Merci de remplir tous les champs obligatoires.');
        return;
      }
      var phone = (data.phone || '').replace(/\s+/g, '');
      if (!/^0[5-7][0-9]{8}$/.test(phone)) {
        alert('Numéro de téléphone invalide. Format attendu : 06XXXXXXXX');
        return;
      }

      // TODO: replace with real backend (Sheety, Google Sheets, YouCan, Shopify, Make.com, etc.)
      console.log('[NOOR FÈS] Commande reçue:', data);

      // Track conversion (Facebook Pixel / TikTok Pixel)
      if (window.fbq) window.fbq('track', 'Lead', { content_name: data.product });
      if (window.ttq) window.ttq.track('SubmitForm', { description: data.product });

      var success = document.getElementById('orderSuccess');
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  // Product page: swatch interaction + URL param
  var swatches = document.querySelectorAll('.swatch');
  swatches.forEach(function (s) {
    s.addEventListener('click', function () {
      var group = s.parentElement;
      group.querySelectorAll('.swatch').forEach(function (x) { x.classList.remove('is-active'); });
      s.classList.add('is-active');
    });
  });

  // Reveal-on-scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.product-card, .review, .materials__item, .trust__item, .story__media, .story__body').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .8s cubic-bezier(.2,.65,.2,1), transform .8s cubic-bezier(.2,.65,.2,1)';
      io.observe(el);
    });
    var styleObs = new MutationObserver(function () {});
    document.querySelectorAll('.product-card, .review, .materials__item, .trust__item, .story__media, .story__body').forEach(function (el) {
      // wait for first IntersectionObserver to add class, then reveal
    });
    // Set up reveal styles
    var revealStyle = document.createElement('style');
    revealStyle.textContent = '.is-visible { opacity: 1 !important; transform: none !important; }';
    document.head.appendChild(revealStyle);
  }
})();
