// ============================================================
//  BUILD – erzeugt statische HTML-Seiten aus content.js
//
//  Läuft automatisch bei jedem Push (GitHub Action, siehe
//  .github/workflows/build.yml). Lokal: `node build.mjs`
//  (vorher `python3 scripts/images.py` für Bildvarianten).
//
//  Erzeugt:
//    index.html, preise/index.html, portfolio/index.html,
//    hochzeitsfotograf-wuppertal/index.html,
//    hochzeitsfotograf-duesseldorf/index.html, sitemap.xml
//
//  Diese Dateien NICHT von Hand bearbeiten – Änderungen gehen
//  beim nächsten Build verloren. Inhalte: content.js / admin.html.
//  Design: src/styles.css. Verhalten: site.js.
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

// ── Inhalte laden ──
const sandbox = { window: {} };
vm.runInNewContext(read('content.js'), sandbox);
const C = sandbox.window.SITE_CONTENT;
if (!C) throw new Error('content.js enthält kein window.SITE_CONTENT');

const manifest = fs.existsSync(path.join(ROOT, 'images/manifest.json'))
  ? JSON.parse(read('images/manifest.json')) : {};
const FONTS_CSS = read('fonts.css').replace(/url\('fonts\//g, "url('/fonts/");
const CSS = read('src/styles.css');
const SITE = (C.meta.siteUrl || 'https://jamieriedel.com').replace(/\/$/, '');
const BRAND = (C.brand && C.brand.name) || "Jamie's Lens";
const OWNER = (C.brand && C.brand.owner) || 'Jamie-Lee Riedel';
const TODAY = new Date().toISOString().slice(0, 10);
const YEAR = new Date().getFullYear();

// ── Helfer ──
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
const abs = (p) => (/^https?:/.test(p) ? p : SITE + '/' + String(p).replace(/^\//, ''));
const rootPath = (p) => (/^https?:/.test(p) ? p : '/' + String(p).replace(/^\//, ''));

/** Bild mit srcset, width/height (gegen CLS) und lazy loading. */
function img(src, { alt = '', sizes = '100vw', cls = '', eager = false, id = '' } = {}) {
  const m = manifest[src.replace(/^\//, '')];
  const attrs = [];
  if (id) attrs.push(`id="${id}"`);
  if (cls) attrs.push(`class="${cls}"`);
  if (m && m.webp && m.webp.length) {
    const set = m.webp.map((w) => `/images/r/${m.stem}-${w}.webp ${w}w`).join(', ');
    const mid = m.webp[Math.min(1, m.webp.length - 1)];
    attrs.push(`src="/images/r/${m.stem}-${mid}.webp"`, `srcset="${set}"`, `sizes="${sizes}"`);
  } else {
    attrs.push(`src="${esc(rootPath(src))}"`);
  }
  if (m) attrs.push(`width="${m.width}"`, `height="${m.height}"`);
  attrs.push(`alt="${esc(alt)}"`);
  if (eager) attrs.push('loading="eager"', 'fetchpriority="high"');
  else attrs.push('loading="lazy"', 'decoding="async"');
  return `<img ${attrs.join(' ')} />`;
}

/** Größte verfügbare Variante (für Lightbox / OG). */
function largest(src) {
  const m = manifest[src.replace(/^\//, '')];
  if (m && m.webp && m.webp.length) return `/images/r/${m.stem}-${m.webp[m.webp.length - 1]}.webp`;
  return rootPath(src);
}

/** Hero als <picture> mit AVIF + WebP. */
function heroPicture() {
  const src = C.hero.image;
  const m = manifest[src];
  const alt = C.hero.imageAlt || BRAND;
  const sizes = '(max-width: 900px) 100vw, 50vw';
  if (!m || !m.webp.length) return { html: img(src, { alt, eager: true, id: 'heroImage' }), preload: '' };
  const set = (fmt) => m[fmt].map((w) => `/images/r/${m.stem}-${w}.${fmt} ${w}w`).join(', ');
  const mid = m.webp[Math.min(1, m.webp.length - 1)];
  const avif = m.avif && m.avif.length ? `<source type="image/avif" srcset="${set('avif')}" sizes="${sizes}" />` : '';
  const html = `<picture>${avif}<source type="image/webp" srcset="${set('webp')}" sizes="${sizes}" />` +
    `<img id="heroImage" src="/images/r/${m.stem}-${mid}.webp" width="${m.width}" height="${m.height}" alt="${esc(alt)}" loading="eager" fetchpriority="high" /></picture>`;
  const preload = m.avif && m.avif.length
    ? `<link rel="preload" as="image" type="image/avif" imagesrcset="${set('avif')}" imagesizes="${sizes}" fetchpriority="high" />`
    : `<link rel="preload" as="image" imagesrcset="${set('webp')}" imagesizes="${sizes}" fetchpriority="high" />`;
  return { html, preload };
}

const jsonLd = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`;

// ── Strukturierte Daten ──
const BUSINESS_ID = SITE + '/#business';
const business = {
  '@type': 'ProfessionalService',
  '@id': BUSINESS_ID,
  name: BRAND,
  description: C.about.lead || C.meta.description,
  url: SITE + '/',
  image: abs(largest(C.hero.image)),
  telephone: C.contact.phone.replace(/\s/g, ''),
  email: C.contact.email,
  priceRange: 'ab ' + Math.min(...C.services.map((s) => s.priceFrom || Infinity)) + ' €',
  founder: { '@type': 'Person', name: OWNER, jobTitle: 'Hochzeitsfotograf' },
  address: { '@type': 'PostalAddress', addressLocality: 'Wuppertal', addressRegion: 'Nordrhein-Westfalen', addressCountry: 'DE' },
  areaServed: [
    { '@type': 'City', name: 'Wuppertal' },
    { '@type': 'City', name: 'Düsseldorf' },
    { '@type': 'Place', name: 'Bergisches Land' },
    { '@type': 'State', name: 'Nordrhein-Westfalen' }
  ],
  knowsAbout: ['Hochzeitsfotografie', 'Hochzeitsreportage', 'Portraitfotografie', 'Eventfotografie'],
  sameAs: C.meta.sameAs || [C.contact.instagramUrl]
};

function offerFor(s, url) {
  const fixed = /^\s*\d/.test(s.price) && !/ab/i.test(s.price);
  const offer = { '@type': 'Offer', url, priceCurrency: 'EUR', availability: 'https://schema.org/InStock',
    itemOffered: { '@type': 'Service', name: s.name === 'Hochzeit' ? 'Hochzeitsfotografie' : s.name + ' Fotoshooting', description: s.desc, provider: { '@id': BUSINESS_ID } } };
  if (fixed) offer.price = String(s.priceFrom);
  else offer.priceSpecification = { '@type': 'PriceSpecification', minPrice: s.priceFrom, priceCurrency: 'EUR' };
  return offer;
}

function breadcrumb(name, url) {
  return { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name, item: url }
  ] };
}

// ── Bausteine ──
const NAV_LINKS = [
  ['/#about', 'Über mich'],
  ['/portfolio/', 'Portfolio'],
  ['/preise/', 'Preise'],
  ['/#contact', 'Kontakt']
];

function layout({ urlPath, title, description, main, ld = [], preload = '' }) {
  const url = SITE + urlPath;
  const ogImg = abs(largest(C.meta.ogImage || C.hero.image));
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(BRAND)}" />
  <meta property="og:image" content="${ogImg}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:locale" content="de_DE" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${ogImg}" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  ${preload}
  <link rel="preload" href="/fonts/cormorant-garamond.woff2" as="font" type="font/woff2" crossorigin />
  <script>document.documentElement.classList.add('js');</script>
  ${ld.map(jsonLd).join('\n  ')}
  <style>
${FONTS_CSS}
${CSS}  </style>
</head>
<body>
<!-- Diese Datei wird automatisch von build.mjs erzeugt. Nicht von Hand bearbeiten. -->

<nav>
  <a href="/" class="nav-logo">Jamie's <span>Lens</span></a>
  <ul class="nav-links">
    ${NAV_LINKS.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('\n    ')}
  </ul>
  <a href="/#contact" class="nav-cta">Anfragen</a>
  <button class="hamburger" id="hamburger" aria-label="Menü öffnen" aria-controls="mobileMenu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
<ul class="mobile-menu" id="mobileMenu">
  ${NAV_LINKS.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('\n  ')}
</ul>

<main>
${main}
</main>

${whatsappButton()}

<footer>
  <div class="footer-left">
    <div style="font-size:0.75rem; color:rgba(255,255,255,0.4); letter-spacing:0.08em;">© <span id="year">${YEAR}</span> ${esc(OWNER)}</div>
    <p>Alle Rechte vorbehalten</p>
  </div>
  <div class="footer-logo">Jamie's <span>Lens</span></div>
  <div class="footer-right">
    <a href="/${C.pages.wuppertal.slug}/">Hochzeitsfotograf Wuppertal</a>
    <a href="/${C.pages.duesseldorf.slug}/">Hochzeitsfotograf Düsseldorf</a>
    <a href="/preise/">Preise</a>
    <a href="/portfolio/">Portfolio</a>
    <a href="/impressum.html">Impressum</a>
    <a href="/datenschutz.html">Datenschutz</a>
  </div>
</footer>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Bildansicht">
  <button class="lightbox-close" aria-label="Schließen">×</button>
  <img id="lightboxImg" alt="" />
</div>

<script src="/site.js" defer></script>
</body>
</html>
`;
}

function whatsappButton() {
  const k = C.contact;
  if (!k.whatsappEnabled || !k.whatsappNumber) return '';
  const href = 'https://wa.me/' + k.whatsappNumber.replace(/\D/g, '') + '?text=' + encodeURIComponent(k.whatsappGreeting || '');
  return `<a class="wa-btn" href="${esc(href)}" target="_blank" rel="noopener" aria-label="Per WhatsApp schreiben">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>
<span class="wa-tooltip">Schnelle Frage? Schreib mir!</span>`;
}

function sectionHero() {
  const h = C.hero;
  const pic = heroPicture();
  const html = `<section id="hero">
  <div class="hero-text">
    <h1 class="hero-tag">${esc(h.h1)}</h1>
    <p class="hero-title">${esc(h.titleLine1)}<br>${esc(h.titleLine2Prefix)}<em>${esc(h.titleLine2Em)}</em></p>
    <p class="hero-sub">${esc(h.subtitle)}</p>
    <div class="hero-actions">
      <a href="#contact" class="btn-primary">Jetzt anfragen</a>
      <a href="/portfolio/" class="btn-secondary">Portfolio ansehen</a>
    </div>
  </div>
  <div class="hero-image">
    ${pic.html}
  </div>
  <div class="hero-scroll">Scroll</div>
</section>`;
  return { html, preload: pic.preload };
}

function marquee() {
  const items = ['Hochzeitsfotografie', 'Portrait Sessions', 'Event Fotografie', 'Wuppertal & NRW', 'Authentische Momente'];
  const spans = Array(4).fill(items).flat().map((t) => `<span>${esc(t)}</span>`).join('');
  return `<div class="marquee-wrap" aria-hidden="true"><div class="marquee-track">${spans}</div></div>`;
}

function sectionAbout({ headingLevel = 'h2', links = '' } = {}) {
  const a = C.about;
  return `<section id="about">
  <div class="about-image fade-up">
    <div class="about-image-accent"></div>
    ${img(a.image, { alt: a.imageAlt || OWNER, sizes: '(max-width: 900px) 100vw, 45vw' })}
  </div>
  <div class="about-text fade-up">
    <p class="section-label">Über mich</p>
    <${headingLevel} class="section-title">Hallo, ich bin<br><em>Jamie-Lee</em></${headingLevel}>
    ${a.lead ? `<p class="about-lead">${esc(a.lead)}</p>` : ''}
    <div id="aboutParagraphs">
      ${a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
    </div>
    <a href="#contact" class="btn-primary" style="margin-top: 1rem;">Unverbindlich anfragen</a>
    <div class="about-stats">
      ${a.stats.map((s) => `<div><div class="stat-num">${esc(s.num)}</div><div class="stat-label">${esc(s.label)}</div></div>`).join('\n      ')}
    </div>
    ${links}
  </div>
</section>`;
}

function galleryGrid(items, { filters = true } = {}) {
  const used = C.gallery.categories.filter((c) => items.some((i) => i.category === c));
  const filterHtml = filters && used.length > 1
    ? `<div class="gallery-filters" id="galleryFilters">${['Alle', ...used].map((c, i) =>
      `<button type="button" class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('')}</div>`
    : '';
  const grid = items.map((it) => `<figure class="gallery-item" data-category="${esc(it.category)}" data-full="${esc(largest(it.src))}">
      ${img(it.src, { alt: it.alt || it.category, sizes: '(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw' })}
      <div class="gallery-item-overlay"><span class="gallery-item-tag">${esc(it.category)}</span></div>
    </figure>`).join('\n    ');
  return `${filterHtml}
  <div class="gallery-grid" id="galleryGrid">
    ${grid}
  </div>`;
}

function sectionGallery({ items, title = 'Ausgewählte<br><em>Arbeiten</em>', more = true, filters = true }) {
  return `<section id="gallery">
  <div class="gallery-header fade-up">
    <div>
      <p class="section-label">Portfolio</p>
      <h2 class="section-title">${title}</h2>
    </div>
    <a href="#contact" class="btn-secondary">Anfrage stellen</a>
  </div>
  ${galleryGrid(items, { filters })}
  ${more ? '<p class="section-more"><a href="/portfolio/" class="btn-secondary">Ganzes Portfolio ansehen</a></p>' : ''}
</section>`;
}

function serviceCard(s, i) {
  return `<article class="service-card fade-up">
      <div class="service-num">${String(i + 1).padStart(2, '0')}</div>
      <h3 class="service-name">${esc(s.name)}</h3>
      <p class="service-desc">${esc(s.desc)}</p>
      <ul class="service-includes">${s.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <div class="service-price">${esc(s.price)}<small>${esc(s.priceNote)}</small></div>
      <a href="#contact" class="service-cta">${esc(s.cta)}</a>
    </article>`;
}

function sectionServices({ services = C.services, more = true, title = 'Was wir gemeinsam<br><em>erschaffen können</em>', extra = '' } = {}) {
  return `<section id="services">
  <div class="fade-up" style="text-align:center; max-width: 600px; margin: 0 auto 1rem;">
    <p class="section-label">Leistungen</p>
    <h2 class="section-title">${title}</h2>
  </div>
  <div class="services-grid">
    ${services.map(serviceCard).join('\n    ')}
  </div>
  ${extra}
  ${more ? '<p class="section-more"><a href="/preise/" class="btn-secondary">Alle Preise im Überblick</a></p>' : ''}
</section>`;
}

function sectionProcess() {
  const steps = C.process || [];
  return `<section id="process">
  <div class="fade-up" style="text-align:center; max-width: 600px; margin: 0 auto;">
    <p class="section-label">Ablauf</p>
    <h2 class="section-title">So einfach<br><em>läuft's ab</em></h2>
  </div>
  <div class="process-grid">
    ${steps.map((s, i) => `<div class="process-step fade-up">
      <div class="process-num">${String(i + 1).padStart(2, '0')}</div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
      ${i < steps.length - 1 ? '<span class="process-arrow" aria-hidden="true">→</span>' : ''}
    </div>`).join('\n    ')}
  </div>
  <div class="fade-up" style="text-align:center; margin-top: 4rem;">
    <a href="#contact" class="btn-primary">Schritt 1 starten — Anfrage senden</a>
  </div>
</section>`;
}

function sectionFaq(items = C.faq) {
  return `<section id="faq">
  <div class="fade-up" style="text-align:center; max-width: 600px; margin: 0 auto;">
    <p class="section-label">Häufige Fragen</p>
    <h2 class="section-title">Gut zu<br><em>wissen</em></h2>
  </div>
  <div class="faq-list">
    ${items.map((f, i) => `<div class="faq-item fade-up">
      <h3 style="font: inherit; margin: 0;"><button type="button" class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">${esc(f.q)}</button></h3>
      <div class="faq-a" id="faq-a-${i}"><p>${esc(f.a)}</p></div>
    </div>`).join('\n    ')}
  </div>
</section>`;
}

function sectionTestimonials() {
  if (!C.testimonials || !C.testimonials.length) return '';
  return `<section id="testimonials">
  <div class="fade-up" style="text-align:center; max-width:600px; margin: 0 auto;">
    <p class="section-label" style="color:var(--accent)">Stimmen</p>
    <h2 class="section-title">Was Brautpaare<br><em>sagen</em></h2>
  </div>
  <div class="testimonials-grid">
    ${C.testimonials.map((t) => `<blockquote class="testimonial fade-up">
      <p class="testimonial-text">${esc(t.text)}</p>
      <div class="testimonial-name">${esc(t.name)}</div>
      <div class="testimonial-event">${esc(t.event)}</div>
    </blockquote>`).join('\n    ')}
  </div>
</section>`;
}

function sectionContact() {
  const k = C.contact;
  const details = [
    ['✉', 'E-Mail', `<a href="mailto:${esc(k.email)}">${esc(k.email)}</a>`],
    ['☎', 'Telefon / WhatsApp', `<a href="tel:${esc(k.phone.replace(/\s/g, ''))}">${esc(k.phone)}</a>`],
    ['📍', 'Standort', esc(k.location)],
    ['◎', 'Instagram', `<a href="${esc(k.instagramUrl)}" target="_blank" rel="noopener">${esc(k.instagram)}</a>`]
  ];
  const action = k.formspreeId ? `action="https://formspree.io/f/${esc(k.formspreeId)}" method="POST"` : `action="mailto:${esc(k.email)}" method="POST" enctype="text/plain"`;
  const options = ['<option value="">Bitte wählen…</option>',
    ...C.services.map((s) => `<option>${esc(s.name + ' (' + s.price + ')')}</option>`), '<option>Sonstiges</option>'].join('');
  return `<section id="contact">
  <div class="contact-info fade-up">
    <p class="section-label">Kontakt</p>
    <h2 class="section-title">Lass uns<br><em>reden</em></h2>
    <p>${esc(k.introText)}</p>
    ${C.responsePromise ? `<p>${esc(C.responsePromise)}</p>` : ''}
    <div>
      ${details.map(([icon, label, html]) => `<div class="contact-detail"><div class="contact-detail-icon" aria-hidden="true">${icon}</div><div class="contact-detail-text"><strong>${label}</strong>${html}</div></div>`).join('\n      ')}
    </div>
  </div>

  <div class="fade-up">
    <form class="contact-form" id="contactForm" ${action} data-email="${esc(k.email)}" data-formspree="${esc(k.formspreeId || '')}">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name *</label>
          <input type="text" id="name" name="name" placeholder="Dein Name" autocomplete="name" required />
        </div>
        <div class="form-group">
          <label for="email">E-Mail *</label>
          <input type="email" id="email" name="email" placeholder="deine@email.de" autocomplete="email" required />
        </div>
      </div>
      <div class="form-group">
        <label for="service">Was interessiert dich?</label>
        <select id="service" name="service">${options}</select>
      </div>
      <div class="form-group">
        <label for="date">Gewünschtes Datum (falls bekannt)</label>
        <input type="date" id="date" name="datum" />
      </div>
      <div class="form-group">
        <label for="message">Deine Nachricht *</label>
        <textarea id="message" name="nachricht" placeholder="Erzähl mir von deinem Wunsch-Shooting — Anlass, Ort, besondere Wünsche…" required></textarea>
      </div>
      <input type="hidden" name="_subject" value="Anfrage über jamieriedel.com" />
      <button type="submit" class="form-submit" id="formSubmit">Anfrage senden</button>
      <div class="form-status" id="formStatus" role="status" aria-live="polite"></div>
      <p class="form-hint">Lieber direkt? Schreib mir an <a href="mailto:${esc(k.email)}">${esc(k.email)}</a>.</p>
    </form>
  </div>
</section>`;
}

function pageIntro({ label, h1, paragraphs, cta = true }) {
  return `<section class="page-intro">
  <p class="section-label">${esc(label)}</p>
  <h1>${esc(h1)}</h1>
  ${paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n  ')}
  ${cta ? `<div class="hero-actions"><a href="#contact" class="btn-primary">Jetzt anfragen</a><a href="/portfolio/" class="btn-secondary">Portfolio ansehen</a></div>` : ''}
</section>`;
}

function cityLinks() {
  return `<div class="page-links">
    <a href="/${C.pages.wuppertal.slug}/">Hochzeitsfotograf Wuppertal</a>
    <a href="/${C.pages.duesseldorf.slug}/">Hochzeitsfotograf Düsseldorf</a>
    <a href="/preise/">Preise</a>
  </div>`;
}

// ── Seiten ──
const pages = [];
const weddingItems = C.gallery.items.filter((i) => i.category === 'Hochzeit');
const wedding = C.services.find((s) => s.name === 'Hochzeit');

// Startseite
{
  const hero = sectionHero();
  const main = [
    hero.html,
    marquee(),
    sectionAbout({ links: cityLinks() }),
    sectionGallery({ items: C.gallery.items.slice(0, C.gallery.homeCount || 9) }),
    sectionServices(),
    sectionProcess(),
    sectionFaq(),
    sectionTestimonials(),
    sectionContact()
  ].join('\n\n');
  pages.push({
    file: 'index.html', urlPath: '/', priority: '1.0',
    html: layout({
      urlPath: '/', title: C.meta.title, description: C.meta.description, main, preload: hero.preload,
      ld: [{ '@context': 'https://schema.org', '@graph': [
        business,
        { '@type': 'WebSite', '@id': SITE + '/#website', url: SITE + '/', name: BRAND, inLanguage: 'de-DE', publisher: { '@id': BUSINESS_ID } },
        { '@type': 'FAQPage', '@id': SITE + '/#faq', mainEntity: C.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
      ] }]
    })
  });
}

// Preise
{
  const P = C.pages.preise;
  const url = SITE + '/preise/';
  const todo = `<!-- TODO (Jamie): Hochzeitspakete ergänzen – je Paket: Name, Stunden, Leistungen, Anzahl Bilder, Preis.
       Bis dahin steht hier nur der Einstiegspreis aus content.js (ab 300 €). -->`;
  const main = [
    pageIntro({ label: 'Preise', h1: P.h1, paragraphs: [P.intro] }),
    sectionServices({ more: false, title: 'Alle Leistungen<br><em>&amp; Preise</em>', extra: todo }),
    sectionFaq(C.faq.filter((f) => /Bezahlung|außerhalb|Bilder bekomme/.test(f.q))),
    sectionContact()
  ].join('\n\n');
  pages.push({
    file: 'preise/index.html', urlPath: '/preise/', priority: '0.8',
    html: layout({ urlPath: '/preise/', title: P.title, description: P.description, main,
      ld: [{ '@context': 'https://schema.org', '@graph': [
        { ...business, hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Fotografie-Leistungen', itemListElement: C.services.map((s) => offerFor(s, url)) } },
        breadcrumb('Preise', url)
      ] }] })
  });
}

// Portfolio
{
  const P = C.pages.portfolio;
  const url = SITE + '/portfolio/';
  const main = [
    pageIntro({ label: 'Portfolio', h1: P.h1, paragraphs: [P.intro], cta: false }),
    sectionGallery({ items: C.gallery.items, title: 'Alle<br><em>Arbeiten</em>', more: false }),
    sectionTestimonials(),
    sectionContact()
  ].join('\n\n');
  pages.push({
    file: 'portfolio/index.html', urlPath: '/portfolio/', priority: '0.8',
    html: layout({ urlPath: '/portfolio/', title: P.title, description: P.description, main,
      ld: [{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'CollectionPage', '@id': url, url, name: P.h1, description: P.description, about: { '@id': BUSINESS_ID },
          primaryImageOfPage: { '@type': 'ImageObject', url: abs(largest(C.gallery.items[0].src)) } },
        breadcrumb('Portfolio', url)
      ] }] })
  });
}

// Stadtseiten
for (const key of ['wuppertal', 'duesseldorf']) {
  const P = C.pages[key];
  const city = key === 'wuppertal' ? 'Wuppertal' : 'Düsseldorf';
  const urlPath = `/${P.slug}/`;
  const url = SITE + urlPath;
  const todo = `<!-- TODO (Jamie): Lokale Inhalte für ${city} ergänzen, damit die Seite einzigartig wird –
       z. B. Standesämter, Locations oder Parks, an denen du schon fotografiert hast, und 1–2 Bilder von dort
       (Alt-Text mit Ort). Keine erfundenen Orte eintragen. -->`;
  const main = [
    pageIntro({ label: 'Hochzeitsfotografie · ' + city, h1: P.h1, paragraphs: P.intro }) + '\n' + todo,
    sectionGallery({ items: weddingItems.slice(0, 9), title: 'Hochzeiten<br><em>aus meiner Kamera</em>', more: true, filters: false }),
    sectionServices({ services: [wedding], more: true, title: 'Eure Hochzeit<br><em>mit mir</em>' }),
    sectionProcess(),
    sectionTestimonials(),
    sectionFaq(C.faq.filter((f) => /außerhalb|kennenlernen|Bezahlung|lange dauert/.test(f.q))),
    sectionContact()
  ].join('\n\n');
  pages.push({
    file: `${P.slug}/index.html`, urlPath, priority: '0.9',
    html: layout({ urlPath, title: P.title, description: P.description, main,
      ld: [{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'Service', '@id': url + '#service', name: 'Hochzeitsfotografie in ' + city, serviceType: 'Hochzeitsfotografie',
          description: P.intro.join(' '), url, provider: { '@id': BUSINESS_ID },
          areaServed: { '@type': 'City', name: city }, offers: offerFor(wedding, url) },
        { ...business },
        breadcrumb('Hochzeitsfotograf ' + city, url)
      ] }] })
  });
}

// ── Schreiben ──
for (const p of pages) {
  const out = path.join(ROOT, p.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, p.html);
}

const extra = [['/impressum.html', '0.3', 'yearly'], ['/datenschutz.html', '0.3', 'yearly']];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages.map((p) => [p.urlPath, p.priority, 'monthly']), ...extra].map(([u, pr, cf]) => `  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${cf}</changefreq>
    <priority>${pr}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
console.log('Gebaut:', pages.map((p) => p.file).join(', '), '+ sitemap.xml');
