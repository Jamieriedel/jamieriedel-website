// ============================================================
//  JAMIE'S LENS – INHALTE
//  Diese Datei steuert ALLE Inhalte der Website.
//  Bearbeite sie bequem über admin.html (empfohlen)
//  oder direkt hier im Texteditor.
// ============================================================

window.SITE_CONTENT = {

  // ---------- ALLGEMEIN & SEO ----------
  meta: {
    title: "Hochzeitsfotograf Wuppertal & NRW – Jamie's Lens | Portraits & Events",
    description: "Hochzeitsfotograf aus Wuppertal ✓ Authentische Hochzeitsreportagen, Portraits & Eventfotografie in NRW ✓ Faire Preise ab 100 € ✓ Jetzt unverbindlich anfragen!",
    siteUrl: "https://jamieriedel.com"
  },

  // ---------- CONVERSION-ELEMENTE ----------
  availabilityNote: "Für 2026 sind noch einzelne Hochzeitstermine frei",
  responsePromise: "Ich melde mich innerhalb von 24 Stunden bei dir.",

  // ---------- HERO ----------
  hero: {
    tag: "Fotografie · Wuppertal & NRW",
    titleLine1: "Momente,",
    titleLine2Prefix: "die ",
    titleLine2Em: "bleiben",
    subtitle: "Ich fotografiere Hochzeiten, Portraits und Events. Echte Momente, echte Emotionen. Keine Standardposen, sondern Bilder, die sich nach euch anfühlen.",
    image: "images/hero.jpg",
    imageFallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/919c4157-625a-415a-bead-4af745e25453/_DSC2039.JPG"
  },

  // ---------- ÜBER MICH ----------
  about: {
    image: "images/fotograf-jamie-lee-riedel-wuppertal.jpg",
    imageFallback: "",
    paragraphs: [
      "Hey, ich bin Jamie. Ich komme aus Wuppertal und fotografiere seit ein paar Jahren das, was mich am meisten begeistert: echte Menschen in echten Momenten.",
      "Mir ist es wichtig, dass ihr euch vor meiner Kamera wohlfühlt. Kein steifes Posing, kein Stress. Wir lernen uns vorher kennen, quatschen ein bisschen und wenn es dann losgeht, seid ihr einfach ihr selbst.",
      "Meine Bilder sind natürlich, ehrlich und haben Stimmung. Die Art von Fotos, die ihr euch in zehn Jahren anschaut und sofort wieder wisst, wie sich dieser Moment angefühlt hat."
    ],
    stats: [
      { num: "10+",  label: "Hochzeiten fotografiert" },
      { num: "3+",   label: "Jahre Erfahrung" },
      { num: "100%", label: "mit Herzblut dabei" },
      { num: "NRW",  label: "& deutschlandweit" }
    ]
  },

  // ---------- GALERIE ----------
  gallery: {
    categories: ["Hochzeit", "Portrait", "Event", "Mood"],
    items: [
      { src: "images/hochzeit-standesamt-trauung.jpg", fallback: "", category: "Hochzeit", alt: "Brautpaar bei der Trauung im Standesamt" },
      { src: "images/hochzeit-brautpaar-standesamt-treppen.jpg", fallback: "", category: "Hochzeit", alt: "Brautpaar verlässt das Standesamt" },
      { src: "images/galerie-01.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/583ac145-8900-4edb-8bbc-a98d1fea6a47/R0001404.JPG", category: "Portrait", alt: "Portrait Shooting" },
      { src: "images/hochzeit-brautpaar-schwarzweiss.jpg", fallback: "", category: "Hochzeit", alt: "Brautpaar in Schwarzweiss" },
      { src: "images/galerie-02.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/a945f144-7a79-432c-9e70-24fb18689f84/R0000495.JPG", category: "Event", alt: "Event Fotografie" },
      { src: "images/hochzeit-brautpaar-parkbank-kuss.jpg", fallback: "", category: "Hochzeit", alt: "Brautpaar auf der Parkbank" },
      { src: "images/galerie-03.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/c5daf944-640c-4669-a5de-89d8bf452923/_DSC1282-2.jpg", category: "Hochzeit", alt: "Hochzeitsfotografie" },
      { src: "images/hochzeit-groomsmen-gruppenfoto.jpg", fallback: "", category: "Hochzeit", alt: "Groomsmen Gruppenfoto bei der Hochzeit" },
      { src: "images/galerie-04.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/bd1d706d-7938-473c-8b25-c6b7d7c5fd41/R0001705-2.jpg", category: "Portrait", alt: "Portrait" },
      { src: "images/hochzeit-erster-tanz-gaeste.jpg", fallback: "", category: "Hochzeit", alt: "Erster Tanz mit begeisterten Gästen" },
      { src: "images/galerie-05.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/fc136b07-457e-4b8c-be9c-d66b586ea1d9/_DSC1021.jpg", category: "Event", alt: "Event" },
      { src: "images/hochzeit-gaeste-feier.jpg", fallback: "", category: "Hochzeit", alt: "Gäste feiern ausgelassen auf der Hochzeit" },
      { src: "images/galerie-06.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/1725563575294-HA7USCWTOGUA0EMXES3V/_DSC0954.jpg", category: "Mood", alt: "Stimmungsbild" },
      { src: "images/hochzeit-brautpaar-zeremonie.jpg", fallback: "", category: "Hochzeit", alt: "Brautpaar bei der Zeremonie mit Blumenstrauss" },
      { src: "images/galerie-07.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/6c3273a1-73ff-4247-90f1-7e624daa4609/_DSC1119-2.jpg", category: "Portrait", alt: "Portrait" },
      { src: "images/galerie-08.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/9f2d9e5f-ccad-43f9-bd51-0f4f6902ca0a/_Z005251.jpg", category: "Hochzeit", alt: "Hochzeit" },
      { src: "images/galerie-09.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/15023dc1-425c-43e3-8d10-3175a1f90169/_DSC6961.jpg", category: "Hochzeit", alt: "Brautpaar hält Hände bei der Hochzeit" }
    ]
  },

  // ---------- SERVICES ----------
  services: [
    {
      name: "Hochzeit",
      desc: "Euer großer Tag, so festgehalten, wie er sich wirklich anfühlt. Ich bin den ganzen Tag an eurer Seite, halte mich im Hintergrund und fange genau die Momente ein, an die ihr euch für immer erinnern wollt.",
      includes: ["Ganztages-Begleitung möglich", "Vorgespräch zum Kennenlernen", "Alle wichtigen Momente", "Individuell auf euch abgestimmt"],
      price: "auf Anfrage",
      priceNote: "Jede Hochzeit ist anders",
      cta: "Unverbindlich anfragen →"
    },
    {
      name: "Portrait",
      desc: "Ein Shooting nur für dich. Entspannt, ohne Druck und mit Bildern, auf denen du dich wirklich erkennst.",
      includes: ["1 Person", "1 Stunde Shooting", "15 bearbeitete Fotos", "Online-Galerie zum Download"],
      price: "100 €",
      priceNote: "Festpreis",
      cta: "Jetzt buchen →"
    },
    {
      name: "Couple / Familie",
      desc: "Für Paare, Familien oder eure beste Crew. Einfach zusammen sein, Spaß haben und nebenbei richtig gute Bilder mitnehmen.",
      includes: ["2 oder mehr Personen", "1 Stunde Shooting", "20 bearbeitete Fotos", "Online-Galerie zum Download"],
      price: "150 €",
      priceNote: "Festpreis",
      cta: "Jetzt buchen →"
    },
    {
      name: "Events",
      desc: "Ob Firmenevent, Geburtstagsfeier oder Konzert. Ich halte die Stimmung fest, die Energie und die Gesichter, die den Abend ausmachen.",
      includes: ["Flexible Zeitplanung", "Schnelle Lieferung", "Individuelles Angebot", "Erfahrung mit großen Events"],
      price: "ab 300 €",
      priceNote: "Je nach Umfang",
      cta: "Unverbindlich anfragen →"
    }
  ],

  // ---------- SO LÄUFT'S AB ----------
  process: [
    { title: "Schreib mir", text: "Erzähl mir kurz, was du vorhast. Per Formular, WhatsApp oder einfach eine Nachricht auf Instagram. Wir telefonieren oder treffen uns auf einen Kaffee und besprechen alles in Ruhe." },
    { title: "Das Shooting", text: "Am Tag selbst bin ich einfach da. Gut vorbereitet, entspannt und mit einem Auge für die Momente, die zählen. Ihr müsst nichts können außer ihr selbst sein." },
    { title: "Eure Bilder", text: "Nach 2 bis 3 Wochen bekommt ihr eure fertig bearbeiteten Bilder in einer privaten Online-Galerie. Anschauen, runterladen, teilen, freuen." }
  ],

  // ---------- FAQ ----------
  faq: [
    { q: "Wie viele Bilder bekomme ich?", a: "Bei Portraits sind es mindestens 15, bei Paar- und Familien-Shootings 20 fertig bearbeitete Bilder. Bei Hochzeiten hängt es vom Tag ab, aber in der Regel sind es mehrere hundert." },
    { q: "Wie lange dauert es, bis die Bilder fertig sind?", a: "Portrait- und Paar-Shootings sind meistens nach 1 bis 2 Wochen fertig. Bei Hochzeiten brauche ich 2 bis 3 Wochen, weil ich mir für die Bearbeitung wirklich Zeit nehme. Ein paar Vorschau-Bilder schicke ich euch aber meistens schon nach ein paar Tagen." },
    { q: "Fährst du auch außerhalb von Wuppertal?", a: "Klar! Ich bin in ganz NRW unterwegs und auf Anfrage auch deutschlandweit. Bis 30 km um Wuppertal ist die Anfahrt inklusive, alles darüber hinaus besprechen wir vorher, damit es für beide Seiten passt." },
    { q: "Was ist, wenn es am Shooting-Tag regnet?", a: "Kein Problem. Entweder verschieben wir kostenlos oder wir machen das Beste draus. Ganz ehrlich: manche der coolsten Bilder sind bei Regen entstanden." },
    { q: "Wie läuft die Bezahlung?", a: "Bei Hochzeiten sichert eine Anzahlung euren Termin, der Rest kommt nach der Bildübergabe. Shootings werden nach dem Termin bezahlt. Ihr bekommt natürlich immer eine ordentliche Rechnung." },
    { q: "Können wir uns vorher kennenlernen?", a: "Auf jeden Fall, das ist mir sogar super wichtig. Gerade bei Hochzeiten muss die Chemie stimmen. Ein erstes Gespräch ist immer kostenlos und komplett unverbindlich." }
  ],

  // ---------- TESTIMONIALS ----------
  testimonials: [
    {
      text: "Ein herausragender Fotograf und gleichzeitig ein Mensch, dem ich vollkommen vertrauen konnte. Er hat den schönsten Tag meines Lebens mit wunderschönen, authentischen Bildern für die Ewigkeit festgehalten. Absolute Empfehlung!",
      name: "Araz & Elnara",
      event: "Hochzeit"
    },
    {
      text: "Wir hatten das Vergnügen, Jamie als Fotografen für unsere Hochzeit zu haben. Er hat den für uns wichtigsten und schönsten Tag perfekt eingefangen, vom First-Look-Shooting, dem Standesamt bis hin zur Feier! Durch seine sympathische und professionelle Art, die auch den Gästen in Erinnerung geblieben ist, war er an diesem Tag nicht nur Fotograf, sondern ein Teil der Hochzeitsgemeinschaft. Das Ergebnis und die Bilder sprechen für sich. Danke, dass du unseren besonderen Tag begleitet hast und die besonderen Momente festgehalten hast!",
      name: "Emmanuel & Sarah",
      event: "Hochzeit"
    }
  ],
  testimonialsPlaceholderNote: false,

  // ---------- KONTAKT ----------
  contact: {
    introText: "Du hast Interesse oder einfach eine Frage? Schreib mir gerne. Egal ob du schon einen festen Termin im Kopf hast oder erstmal nur schauen willst, was möglich ist. Ich freu mich auf deine Nachricht.",
    email: "jamie.lee.riedel@gmail.com",
    phone: "+49 1771 846741",
    location: "Wuppertal · NRW · deutschlandweit",
    instagram: "@jamieriedel",
    instagramUrl: "https://instagram.com/jamieriedel",
    whatsappEnabled: true,
    whatsappNumber: "491771846741",
    whatsappGreeting: "Hey Jamie! Ich hätte Interesse an einem Shooting.",
    formspreeId: ""
  }
};
