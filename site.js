// ============================================================
//  JAMIE'S LENS – Verhalten im Browser
//  (Alle Inhalte stehen bereits im HTML. Dieses Skript ergänzt
//  nur Interaktion: Menü, Galerie-Filter, Lightbox, FAQ,
//  Kontaktformular und Einblend-Animationen.)
// ============================================================
(function () {
  'use strict';

  // ── Mobiles Menü ──
  var burger = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }

  // ── Galerie-Filter ──
  var filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      document.querySelectorAll('.gallery-item').forEach(function (el) {
        el.classList.toggle('hidden', cat !== 'Alle' && el.getAttribute('data-category') !== cat);
      });
    });
  });

  // ── Lightbox ──
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.setAttribute('tabindex', '0');
    function open() {
      var img = item.querySelector('img');
      lbImg.src = item.getAttribute('data-full') || (img && img.currentSrc) || '';
      lbImg.alt = img ? img.alt : '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    item.addEventListener('click', open);
    item.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  if (lb) lb.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

  // ── FAQ ──
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (x) {
        x.classList.remove('open');
        x.querySelector('.faq-a').style.maxHeight = '0';
        x.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── Kontaktformular ──
  var form = document.getElementById('contactForm');
  if (form) {
    var statusEl = document.getElementById('formStatus');
    var submitBtn = document.getElementById('formSubmit');
    var email = form.getAttribute('data-email');
    var formspreeId = form.getAttribute('data-formspree');

    function showStatus(text, kind) {
      statusEl.textContent = text;
      statusEl.className = 'form-status ' + kind;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!formspreeId) {
        // Notlösung ohne Formspree: E-Mail-Programm mit vorausgefüllter Anfrage
        var body = 'Name: ' + form.name.value + '\n' +
          'Service: ' + form.service.value + '\n' +
          'Datum: ' + form.datum.value + '\n\n' + form.nachricht.value;
        window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Anfrage über jamieriedel.com') +
          '&body=' + encodeURIComponent(body);
        showStatus('Dein E-Mail-Programm öffnet sich – bitte dort noch auf „Senden“ klicken.', 'ok');
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet…';
      fetch('https://formspree.io/f/' + formspreeId, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (!res.ok) throw new Error('send failed');
        showStatus('Danke! Die Anfrage ist angekommen – ich melde mich innerhalb von 24 Stunden.', 'ok');
        form.reset();
      }).catch(function () {
        showStatus('✗ Senden fehlgeschlagen. Schreib mir bitte direkt an ' + email + '.', 'err');
      }).then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Anfrage senden';
      });
    });
  }

  // ── Jahr im Footer ──
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ── Einblenden beim Scrollen ──
  var faders = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); observer.unobserve(en.target); } });
    }, { threshold: 0.12 });
    faders.forEach(function (el) { observer.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('visible'); });
  }
})();
