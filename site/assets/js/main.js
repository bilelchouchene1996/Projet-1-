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

  // Product page: swatch interaction
  var swatches = document.querySelectorAll('.swatch');
  swatches.forEach(function (s) {
    s.addEventListener('click', function () {
      var group = s.parentElement;
      group.querySelectorAll('.swatch').forEach(function (x) { x.classList.remove('is-active'); });
      s.classList.add('is-active');
    });
  });

  // Product page: gallery — click thumbnail to swap main image
  var galleryMain = document.getElementById('galleryMain');
  var thumbs = document.querySelectorAll('#gallery .thumb');
  if (galleryMain && thumbs.length) {
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        var src = t.getAttribute('data-img');
        var fallback = t.getAttribute('data-fallback');
        if (!src) return;
        thumbs.forEach(function (x) { x.classList.remove('is-active'); });
        t.classList.add('is-active');
        galleryMain.style.opacity = '0';
        var probe = new Image();
        probe.onload = function () {
          galleryMain.src = src;
          galleryMain.style.opacity = '1';
        };
        probe.onerror = function () {
          galleryMain.src = fallback || src;
          galleryMain.style.opacity = '1';
        };
        probe.src = src;
      });
    });
    galleryMain.style.transition = 'opacity .25s ease';
  }

  // Product page: load product from URL ?p=medina|aicha|atlas
  var products = {
    medina: { title: 'Sac à dos « Médina »', titleAr: 'حقيبة الظهر «المدينة»', priceNow: '490 DH', priceOld: '690 DH', folder: 'medina', fallback: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=1200&q=85' },
    aicha:  { title: 'Sac à main « Aïcha »', titleAr: 'حقيبة اليد «عائشة»', priceNow: '450 DH', priceOld: '650 DH', folder: 'aicha', fallback: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85' },
    atlas:  { title: 'Sac de voyage « Atlas »', titleAr: 'حقيبة السفر «أطلس»', priceNow: '890 DH', priceOld: '1 190 DH', folder: 'atlas', fallback: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85' }
  };
  var qs = new URLSearchParams(window.location.search);
  var p = qs.get('p');
  if (p && products[p]) {
    var prod = products[p];
    var lang = document.documentElement.getAttribute('lang') || 'fr';
    var titleEl = document.querySelector('.product-info h1');
    if (titleEl) titleEl.textContent = lang === 'ar' ? prod.titleAr : prod.title;
    var priceEl = document.querySelector('.product-info .price');
    var priceOldEl = document.querySelector('.product-info .price-old');
    if (priceEl) priceEl.textContent = prod.priceNow;
    if (priceOldEl) priceOldEl.textContent = prod.priceOld;
    // Swap gallery image paths to the right folder
    if (galleryMain) {
      galleryMain.src = 'assets/img/products/' + prod.folder + '/1-main.jpg'.replace('assets/', '../assets/').replace('../../', '../');
      // Cleaner: rebuild
      galleryMain.src = '../assets/img/products/' + prod.folder + '/1-main.jpg';
      galleryMain.onerror = function () { galleryMain.onerror = null; galleryMain.src = prod.fallback; };
    }
    thumbs.forEach(function (t, i) {
      var newSrc = '../assets/img/products/' + prod.folder + '/' + (i + 1) + '-' + ['main','back','detail','worn'][i] + '.jpg';
      t.setAttribute('data-img', newSrc);
      t.setAttribute('data-fallback', prod.fallback);
      var img = t.querySelector('img');
      if (img) {
        img.src = newSrc;
        img.onerror = function () { img.onerror = null; img.src = prod.fallback; };
      }
    });
    // Update page <title>
    document.title = (lang === 'ar' ? prod.titleAr : prod.title) + ' — NOOR FÈS';
  }

  // Re-apply on language change for product page dynamic title
  window.addEventListener('langchange', function (e) {
    if (p && products[p]) {
      var prod = products[p];
      var lang = e.detail.lang;
      var titleEl = document.querySelector('.product-info h1');
      if (titleEl) titleEl.textContent = lang === 'ar' ? prod.titleAr : prod.title;
      document.title = (lang === 'ar' ? prod.titleAr : prod.title) + ' — NOOR FÈS';
    }
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
