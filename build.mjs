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

function packageOffers(url) {
  return (C.weddingPackages || []).map((p) => ({ '@type': 'Offer', url, priceCurrency: 'EUR', price: String(p.price), availability: 'https://schema.org/InStock',
    name: 'Hochzeitspaket ' + p.name,
    itemOffered: { '@type': 'Service', name: 'Hochzeitsfotografie – ' + p.name, description: [p.desc, p.hours, p.images].join(' · '), provider: { '@id': BUSINESS_ID } } }));
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
const eur = (n) => Number(n).toLocaleString('de-DE') + ' €';

function layout({ urlPath, title, description, main, ld = [], preload = '', robots = '' }) {
  const url = SITE + urlPath;
  const ogImg = abs(largest(C.meta.ogImage || C.hero.image));
  const current = (h) => (h === urlPath ? ' aria-current="page"' : '');
  const navItems = NAV_LINKS.map(([h, t]) => `<li><a href="${h}"${current(h)}>${t}</a></li>`);
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${url}" />
  ${robots ? `<meta name="robots" content="${robots}" />` : ''}
  <meta name="theme-color" content="#FBFAF7" />
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

<header class="site-nav">
  <div class="wrap">
    <a href="/" class="nav-logo">${esc(BRAND)}</a>
    <nav aria-label="Hauptnavigation">
      <ul class="nav-links">
        ${navItems.join('\n        ')}
      </ul>
    </nav>
    <a href="/#contact" class="btn nav-cta">Anfragen</a>
    <button class="hamburger" id="hamburger" aria-label="Menü öffnen" aria-controls="mobileMenu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<ul class="mobile-menu" id="mobileMenu">
  ${navItems.join('\n  ')}
  <li><a href="/#contact">Anfrage senden</a></li>
</ul>

<main>
${main}
</main>

${whatsappButton()}

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a href="/" class="footer-logo">${esc(BRAND)}</a>
        <p>${esc(OWNER)} – Hochzeitsfotograf aus Wuppertal für Düsseldorf, das Bergische Land und ganz NRW.</p>
      </div>
      <div>
        <h2>Hochzeitsfotografie</h2>
        <ul>
          <li><a href="/${C.pages.wuppertal.slug}/">Hochzeitsfotograf Wuppertal</a></li>
          <li><a href="/${C.pages.duesseldorf.slug}/">Hochzeitsfotograf Düsseldorf</a></li>
          <li><a href="/preise/">Pakete und Preise</a></li>
          <li><a href="/portfolio/">Portfolio</a></li>
        </ul>
      </div>
      <div>
        <h2>Kontakt</h2>
        <ul>
          <li><a href="mailto:${esc(C.contact.email)}">${esc(C.contact.email)}</a></li>
          <li><a href="tel:${esc(C.contact.phone.replace(/\s/g, ''))}">${esc(C.contact.phone)}</a></li>
          <li><a href="${esc(C.contact.instagramUrl)}" target="_blank" rel="noopener">Instagram ${esc(C.contact.instagram)}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="year">${YEAR}</span> ${esc(OWNER)}</span>
      <span><a href="/impressum.html" style="color:inherit">Impressum</a> &nbsp;·&nbsp; <a href="/datenschutz.html" style="color:inherit">Datenschutz</a></span>
    </div>
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
</a>`;
}

function sectionHero() {
  const h = C.hero;
  const pic = heroPicture();
  const html = `<section class="hero" id="hero" aria-labelledby="hero-title">
  <div class="hero-text">
    <h1 id="hero-title">${esc(h.h1)}</h1>
    <p class="lede">${esc(h.subtitle)}</p>
    <div class="actions">
      <a href="#contact" class="btn">Termin anfragen</a>
      <a href="/portfolio/" class="link">Portfolio ansehen</a>
    </div>
    ${C.availabilityNote ? `<p class="hero-note">${esc(C.availabilityNote)}</p>` : ''}
  </div>
  <div class="hero-image">
    ${pic.html}
  </div>
</section>`;
  return { html, preload: pic.preload };
}

function sectionAbout({ links = '' } = {}) {
  const a = C.about;
  return `<section id="about">
  <div class="wrap about">
    <div class="about-image">
      ${img(a.image, { alt: a.imageAlt || OWNER, sizes: '(max-width: 1000px) 90vw, 40vw' })}
    </div>
    <div class="about-text">
      <h2>Hallo, ich bin Jamie-Lee</h2>
      ${a.lead ? `<p class="about-lead">${esc(a.lead)}</p>` : ''}
      ${a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      <dl class="facts">
        ${a.stats.map((s) => `<div><dt>${esc(s.num)}</dt><dd>${esc(s.label)}</dd></div>`).join('\n        ')}
      </dl>
      <div class="actions"><a href="#contact" class="btn">Kennenlernen vereinbaren</a></div>
      ${links}
    </div>
  </div>
</section>`;
}

function figure(it, sizes) {
  return `<figure class="gallery-item" data-category="${esc(it.category)}" data-full="${esc(largest(it.src))}">
        ${img(it.src, { alt: it.alt || it.category, sizes })}
      </figure>`;
}

/** Mosaik: Die 6. Kachel ist ein Panorama – dort ein Querformat platzieren. */
function arrangeForMosaic(items) {
  const out = items.slice(0, 6);
  const isLandscape = (it) => { const m = manifest[it.src]; return m && m.width > m.height; };
  if (out.length === 6 && !isLandscape(out[5])) {
    const i = out.findIndex(isLandscape);
    if (i !== -1) { const [l] = out.splice(i, 1); out.push(l); }
    else { const extra = items.slice(6).find(isLandscape); if (extra) out[5] = extra; }
  }
  return out;
}

function sectionMosaic({ items, title, lede = '', more = true }) {
  items = arrangeForMosaic(items);
  return `<section id="gallery">
  <div class="wrap">
    <div class="section-head">
      <h2>${esc(title)}</h2>
      ${lede ? `<p class="lede">${esc(lede)}</p>` : ''}
    </div>
    <div class="mosaic">
      ${items.map((it) => figure(it, '(max-width: 640px) 100vw, 60vw')).join('\n      ')}
    </div>
    ${more ? `<div class="section-foot"><a href="/portfolio/" class="link">Alle Arbeiten im Portfolio</a><a href="#contact" class="btn btn-ghost">Termin anfragen</a></div>` : ''}
  </div>
</section>`;
}

function sectionPortfolio(items) {
  const used = C.gallery.categories.filter((c) => items.some((i) => i.category === c));
  const filters = used.length > 1
    ? `<div class="gallery-filters" role="group" aria-label="Nach Kategorie filtern">${['Alle', ...used].map((c, i) =>
      `<button type="button" class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join('')}</div>`
    : '';
  return `<section id="gallery" style="padding-top:0">
  <div class="wrap">
    ${filters}
    <div class="gallery-grid">
      ${items.map((it) => figure(it, '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw')).join('\n      ')}
    </div>
  </div>
</section>`;
}

function sectionPackages({ title = 'Hochzeitspakete', lede = 'Drei Pakete als Orientierung – am Ende planen wir euren Tag gemeinsam und passen alles an euch an.', others = true, bg = '' } = {}) {
  const P = C.weddingPackages || [];
  if (!P.length) return '';
  const rest = C.services.filter((s) => s.name !== 'Hochzeit');
  const also = others && rest.length ? `<div class="also">
      <h3>Außerdem</h3>
      <ul>
        ${rest.map((s) => `<li><strong>${esc(s.name)}</strong><span>${esc(s.price)} · ${esc(s.includes.slice(0, 2).join(', '))}</span></li>`).join('\n        ')}
      </ul>
    </div>` : '';
  return `<section id="pakete"${bg ? ` style="background:${bg}"` : ''}>
  <div class="wrap">
    <div class="section-head">
      <h2>${esc(title)}</h2>
      ${lede ? `<p class="lede">${esc(lede)}</p>` : ''}
    </div>
    <div class="packages">
      ${P.map((p) => `<article class="package${p.highlight ? ' package--featured' : ''}">
        <p class="package-tag">${p.highlight ? 'Am häufigsten gebucht' : ''}</p>
        <h3>${esc(p.name)}</h3>
        <p class="package-meta">${esc(p.hours)} · ${esc(p.images)}</p>
        <p class="package-price">${eur(p.price)}</p>
        <p class="package-desc">${esc(p.desc)}</p>
        <ul>${p.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <a href="#contact" class="btn${p.highlight ? '' : ' btn-ghost'}">${esc(p.name)} anfragen</a>
      </article>`).join('\n      ')}
    </div>
    ${C.weddingPackagesNote ? `<p class="packages-note">${esc(C.weddingPackagesNote)}</p>` : ''}
    ${also}
  </div>
</section>`;
}

function sectionServices({ services, title, lede = '' }) {
  return `<section id="services">
  <div class="wrap">
    <div class="section-head">
      <h2>${esc(title)}</h2>
      ${lede ? `<p class="lede">${esc(lede)}</p>` : ''}
    </div>
    <div class="services">
      ${services.map((s) => `<article class="service">
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.desc)}</p>
        <ul>${s.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <p class="service-price">${esc(s.price)}<small>${esc(s.priceNote)}</small></p>
        <a href="#contact" class="link">${esc(s.cta)}</a>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function sectionProcess({ bg = 'var(--sand)' } = {}) {
  const steps = C.process || [];
  return `<section id="process" style="background:${bg}">
  <div class="wrap">
    <div class="section-head">
      <h2>So läuft es ab</h2>
      <p class="lede">Von der ersten Nachricht bis zur fertigen Galerie – ohne Stress und mit einem festen Ansprechpartner.</p>
    </div>
    <ol class="steps">
      ${steps.map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>`;
}

function sectionFaq(items = C.faq) {
  return `<section id="faq">
  <div class="wrap faq">
    <div>
      <h2>Häufige Fragen</h2>
      <p class="lede">Eure Frage ist nicht dabei? Schreibt mir einfach – ich antworte innerhalb von 24 Stunden.</p>
    </div>
    <div class="faq-list">
      ${items.map((f, i) => `<div class="faq-item">
        <h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">${esc(f.q)}</button></h3>
        <div class="faq-a" id="faq-a-${i}"><p>${esc(f.a)}</p></div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function sectionTestimonials() {
  if (!C.testimonials || !C.testimonials.length) return '';
  return `<section id="testimonials" class="voices">
  <div class="wrap">
    <div class="section-head center">
      <h2>Was Kund:innen sagen</h2>
    </div>
    <div class="quotes">
      ${C.testimonials.map((t) => `<figure class="quote">
        <blockquote><p>${esc(t.text)}</p></blockquote>
        <figcaption>${esc(t.name)} <span>· ${esc(t.event)}</span></figcaption>
      </figure>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function sectionContact() {
  const k = C.contact;
  const action = k.formspreeId ? `action="https://formspree.io/f/${esc(k.formspreeId)}" method="POST"` : `action="mailto:${esc(k.email)}" method="POST" enctype="text/plain"`;
  const options = ['<option value="">Bitte wählen</option>',
    ...(C.weddingPackages || []).map((p) => `<option>Hochzeit – ${esc(p.name)} (${eur(p.price)})</option>`),
    ...C.services.filter((s) => s.name !== 'Hochzeit').map((s) => `<option>${esc(s.name + ' (' + s.price + ')')}</option>`),
    '<option>Sonstiges</option>'].join('');
  return `<section id="contact" class="contact">
  <div class="wrap contact-grid">
    <div class="contact-info">
      <h2>Erzählt mir von eurem Tag</h2>
      <p>${esc(k.introText)}</p>
      ${C.responsePromise ? `<p>${esc(C.responsePromise)}</p>` : ''}
      <ul class="contact-list">
        <li><span>E-Mail</span><a href="mailto:${esc(k.email)}">${esc(k.email)}</a></li>
        <li><span>Telefon / WhatsApp</span><a href="tel:${esc(k.phone.replace(/\s/g, ''))}">${esc(k.phone)}</a></li>
        <li><span>Standort</span>${esc(k.location)}</li>
        <li><span>Instagram</span><a href="${esc(k.instagramUrl)}" target="_blank" rel="noopener">${esc(k.instagram)}</a></li>
      </ul>
    </div>
    <form class="contact-form" id="contactForm" ${action} data-email="${esc(k.email)}" data-formspree="${esc(k.formspreeId || '')}">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name *</label>
          <input type="text" id="name" name="name" autocomplete="name" required />
        </div>
        <div class="form-group">
          <label for="email">E-Mail *</label>
          <input type="email" id="email" name="email" autocomplete="email" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="service">Was interessiert euch?</label>
          <select id="service" name="service">${options}</select>
        </div>
        <div class="form-group">
          <label for="date">Datum (falls bekannt)</label>
          <input type="date" id="date" name="datum" />
        </div>
      </div>
      <div class="form-group">
        <label for="message">Nachricht *</label>
        <textarea id="message" name="nachricht" placeholder="Ort, ungefähre Gästezahl, was euch wichtig ist …" required></textarea>
      </div>
      <input type="hidden" name="_subject" value="Anfrage über jamieriedel.com" />
      <button type="submit" class="btn form-submit" id="formSubmit">Anfrage senden</button>
      <div class="form-status" id="formStatus" role="status" aria-live="polite"></div>
      <p class="form-hint">Lieber direkt? Schreibt an <a href="mailto:${esc(k.email)}">${esc(k.email)}</a>.</p>
    </form>
  </div>
</section>`;
}

function pageIntro({ crumb, h1, paragraphs, cta = true }) {
  return `<section class="page-intro">
  <div class="wrap">
    ${crumb ? `<p class="crumbs"><a href="/">Startseite</a> / ${esc(crumb)}</p>` : ''}
    <h1>${esc(h1)}</h1>
    ${paragraphs.map((p) => `<p class="lede">${esc(p)}</p>`).join('\n    ')}
    ${cta ? `<div class="actions"><a href="#contact" class="btn">Termin anfragen</a><a href="/portfolio/" class="link">Portfolio ansehen</a></div>` : ''}
  </div>
</section>`;
}

function cityLinks() {
  return `<p class="page-links">
        <a class="link" href="/${C.pages.wuppertal.slug}/">Hochzeitsfotograf Wuppertal</a>
        <a class="link" href="/${C.pages.duesseldorf.slug}/">Hochzeitsfotograf Düsseldorf</a>
      </p>`;
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
    sectionMosaic({ items: weddingItems, title: 'Ausgewählte Hochzeiten', lede: 'Echte Paare, echte Tage – vom Standesamt in Wuppertal bis zur Feier im Grünen.' }),
    sectionAbout({ links: cityLinks() }),
    sectionTestimonials(),
    sectionPackages(),
    sectionProcess(),
    sectionFaq(),
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
  const main = [
    pageIntro({ crumb: 'Preise', h1: P.h1, paragraphs: [P.intro], cta: false }),
    sectionPackages({ others: false }),
    sectionServices({ services: C.services.filter((x) => x.name !== 'Hochzeit'), title: 'Portraits, Paare und Events', lede: 'Auch abseits von Hochzeiten fotografiere ich gern – entspannt und ohne Standardposen.' }),
    sectionFaq(C.faq.filter((f) => /Bezahlung|außerhalb|Bilder bekomme/.test(f.q))),
    sectionContact()
  ].join('\n\n');
  pages.push({
    file: 'preise/index.html', urlPath: '/preise/', priority: '0.8',
    html: layout({ urlPath: '/preise/', title: P.title, description: P.description, main,
      ld: [{ '@context': 'https://schema.org', '@graph': [
        { ...business, hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Fotografie-Leistungen', itemListElement: [...packageOffers(url), ...C.services.filter((x) => x.name !== 'Hochzeit').map((s) => offerFor(s, url))] } },
        breadcrumb('Preise', url)
      ] }] })
  });
}

// Portfolio
{
  const P = C.pages.portfolio;
  const url = SITE + '/portfolio/';
  const main = [
    pageIntro({ crumb: 'Portfolio', h1: P.h1, paragraphs: [P.intro], cta: false }),
    sectionPortfolio(C.gallery.items),
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
    pageIntro({ crumb: 'Hochzeitsfotograf ' + city, h1: P.h1, paragraphs: P.intro }) + '\n' + todo,
    sectionMosaic({ items: key === 'wuppertal' ? weddingItems : [...weddingItems].reverse(), title: 'Hochzeiten aus meiner Kamera', more: true }),
    sectionTestimonials(),
    sectionPackages({ title: 'Pakete für eure Hochzeit', others: false }),
    sectionProcess(),
    sectionFaq(C.faq.filter((f) => /außerhalb|kennenlernen|Bezahlung|lange dauert/.test(f.q))),
    sectionContact()
  ].join('\n\n');
  pages.push({
    file: `${P.slug}/index.html`, urlPath, priority: '0.9',
    html: layout({ urlPath, title: P.title, description: P.description, main,
      ld: [{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'Service', '@id': url + '#service', name: 'Hochzeitsfotografie in ' + city, serviceType: 'Hochzeitsfotografie',
          description: P.intro.join(' '), url, provider: { '@id': BUSINESS_ID },
          areaServed: { '@type': 'City', name: city }, offers: packageOffers(url) },
        { ...business },
        breadcrumb('Hochzeitsfotograf ' + city, url)
      ] }] })
  });
}

// Rechtliches (Inhalt aus src/legal/)
for (const [name, h1] of [['impressum', 'Impressum'], ['datenschutz', 'Datenschutzerklärung']]) {
  const body = read(`src/legal/${name}.html`);
  const main = `<section class="page-intro legal">
  <div class="wrap">
    <p class="crumbs"><a href="/">Startseite</a> / ${h1}</p>
    <h1>${h1}</h1>
    <div class="legal-body">
${body}
    </div>
  </div>
</section>`;
  pages.push({ file: `${name}.html`, urlPath: `/${name}.html`, legal: true,
    html: layout({ urlPath: `/${name}.html`, title: `${h1} – ${BRAND}`, description: `${h1} von ${BRAND} (${OWNER}), Wuppertal.`, main, robots: 'noindex, follow' }) });
}

// ── Schreiben ──
for (const p of pages) {
  const out = path.join(ROOT, p.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, p.html);
}

const extra = []; // Impressum/Datenschutz sind noindex und daher nicht in der Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages.filter((p) => !p.legal).map((p) => [p.urlPath, p.priority, 'monthly']), ...extra].map(([u, pr, cf]) => `  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${cf}</changefreq>
    <priority>${pr}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
console.log('Gebaut:', pages.map((p) => p.file).join(', '), '+ sitemap.xml');
