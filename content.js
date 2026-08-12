// ============================================================
//  JAMIE'S LENS – INHALTE
//  Diese Datei steuert ALLE Inhalte der Website.
//  Bearbeite sie bequem über admin.html (empfohlen)
//  oder direkt hier im Texteditor.
// ============================================================

window.SITE_CONTENT = {

  // ---------- ALLGEMEIN ----------
  meta: {
    title: "Jamie's Lens – Hochzeits- & Eventfotograf | Wuppertal",
    description: "Hochzeits- und Eventfotograf aus Wuppertal. Authentische Momente, zeitlose Bilder. Portraits, Hochzeiten, Events – jetzt Termin anfragen."
  },

  // ---------- HERO ----------
  hero: {
    tag: "Fotografie · Wuppertal & NRW",
    titleLine1: "Momente,",
    titleLine2Prefix: "die ",
    titleLine2Em: "bleiben",
    subtitle: "Hochzeiten, Portraits, Events — ich fotografiere das Echte. Die Blicke, die Lachen, die stillen Sekunden zwischen den großen Momenten.",
    image: "images/hero.webp",
    imageFallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/919c4157-625a-415a-bead-4af745e25453/_DSC2039.JPG"
  },

  // ---------- ÜBER MICH ----------
  about: {
    image: "images/about.webp",
    imageFallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/15023dc1-425c-43e3-8d10-3175a1f90169/_DSC6961.jpg",
    paragraphs: [
      "Ich bin Fotograf aus Wuppertal und leidenschaftlich dabei, echte Momente einzufangen — keine gestellten Posen, sondern das Leben, wie es wirklich ist.",
      "Ob bei eurer Hochzeit, einem Portrait-Shooting oder einem besonderen Event: Ich nehme mir Zeit, euch kennenzulernen, damit ihr vor der Kamera ihr selbst sein könnt.",
      "Mein Stil ist natürlich, stimmungsvoll und zeitlos — Bilder, die ihr in 20 Jahren noch genauso liebt wie heute."
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
      { src: "images/galerie-01.jpg", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/583ac145-8900-4edb-8bbc-a98d1fea6a47/R0001404.JPG",  category: "Portrait", alt: "Portrait Shooting" },
      { src: "images/galerie-02.webp", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/a945f144-7a79-432c-9e70-24fb18689f84/R0000495.JPG",  category: "Portrait",    alt: "Portrait" },
      { src: "images/galerie-03.webp", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/c5daf944-640c-4669-a5de-89d8bf452923/_DSC1282-2.jpg", category: "Hochzeit", alt: "Hochzeitsfotografie" },
      { src: "images/galerie-04.webp", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/bd1d706d-7938-473c-8b25-c6b7d7c5fd41/R0001705-2.jpg", category: "Event", alt: "Event" },
      { src: "images/galerie-05.webp", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/fc136b07-457e-4b8c-be9c-d66b586ea1d9/_DSC1021.jpg",  category: "Mood",    alt: "Stimmungsbild" },
      { src: "images/galerie-06.webp", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/1725563575294-HA7USCWTOGUA0EMXES3V/_DSC0954.jpg",   category: "Hochzeit",     alt: "Hochzeit" },
      { src: "images/galerie-07.webp", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/6c3273a1-73ff-4247-90f1-7e624daa4609/_DSC1119-2.jpg", category: "Portrait", alt: "Portrait" },
      { src: "images/galerie-08.webp", fallback: "https://images.squarespace-cdn.com/content/v1/64b2105e1f2d614b93c9660d/9f2d9e5f-ccad-43f9-bd51-0f4f6902ca0a/_Z005251.jpg",  category: "Portrait", alt: "Portrait" },
      { src: "images/galerie-09.webp", category: "Hochzeit", alt: "Hochzeit – Brautpaar" },
      { src: "images/galerie-10.webp", category: "Hochzeit", alt: "Hochzeit – Brautpaar" },
      { src: "images/galerie-11.webp", category: "Hochzeit", alt: "Hochzeit – Gast" },
      { src: "images/galerie-12.webp", category: "Hochzeit", alt: "Hochzeit – Groomsmen" },
      { src: "images/galerie-13.webp", category: "Hochzeit", alt: "Hochzeit – Feier" },
      { src: "images/galerie-14.webp", category: "Hochzeit", alt: "Hochzeit – Trauung" },
      { src: "images/galerie-15.webp", category: "Hochzeit", alt: "Hochzeit" }
    ]
  },

  // ---------- SERVICES ----------
  services: [
    {
      name: "Portrait",
      desc: "Ein Shooting ganz für dich — entspannt, natürlich, mit Bildern, die wirklich du bist.",
      includes: ["1 Person", "1 Stunde Shooting", "15 bearbeitete Fotos", "Online-Galerie zum Download"],
      price: "100 €",
      priceNote: "Festpreis",
      cta: "Jetzt buchen →"
    },
    {
      name: "Couple / Familie",
      desc: "Eure Verbindung, festgehalten. Für Paare, Familien oder Freundesgruppen.",
      includes: ["2 oder mehr Personen", "1 Stunde Shooting", "20 bearbeitete Fotos", "Online-Galerie zum Download"],
      price: "150 €",
      priceNote: "Festpreis",
      cta: "Jetzt buchen →"
    },
    {
      name: "Hochzeit",
      desc: "Euer schönster Tag verdient die besten Bilder. Ich begleite euch durch den ganzen Tag — unauffällig, aber immer zur Stelle.",
      includes: ["Ganztages-Begleitung möglich", "Alle wichtigen Momente", "Individuelles Angebot", "Vorgespräch inklusive"],
      price: "ab 800 €",
      priceNote: "Je nach Umfang",
      cta: "Unverbindlich anfragen →"
    },
    {
      name: "Events",
      desc: "Firmenevents, Partys, Konzerte — ich halte die Energie und die Momente fest, die zählen.",
      includes: ["Flexible Zeitplanung", "Schnelle Lieferzeit", "Individuelles Angebot", "Erfahrung mit großen Events"],
      price: "ab 300 €",
      priceNote: "Je nach Umfang",
      cta: "Unverbindlich anfragen →"
    }
  ],

  // ---------- SO LÄUFT'S AB ----------
  process: [
    {
      title: "Kennenlernen",
      text: "Du schreibst mir kurz, was du dir vorstellst — per Formular oder WhatsApp. Wir telefonieren oder treffen uns auf einen Kaffee und klären alle Fragen. Unverbindlich und entspannt."
    },
    {
      title: "Das Shooting",
      text: "Am großen Tag bin ich da — vorbereitet, unauffällig und mit einem Blick für die echten Momente. Du musst nichts können, außer du selbst zu sein."
    },
    {
      title: "Deine Galerie",
      text: "Innerhalb von 2–3 Wochen bekommst du deine sorgfältig bearbeiteten Bilder in einer privaten Online-Galerie — zum Anschauen, Herunterladen und Teilen."
    }
  ],

  // ---------- FAQ ----------
  faq: [
    {
      q: "Wie viele Bilder bekomme ich?",
      a: "Das hängt vom Paket ab: Bei Portraits sind es mindestens 15, bei Paaren 20 sorgfältig bearbeitete Bilder. Bei Hochzeiten und Events besprechen wir den Umfang individuell — in der Regel sind es mehrere hundert Bilder für einen ganzen Hochzeitstag."
    },
    {
      q: "Wie lange dauert es, bis die Bilder fertig sind?",
      a: "Portrait- und Paar-Shootings liefere ich innerhalb von 1–2 Wochen. Bei Hochzeiten nehme ich mir 2–3 Wochen Zeit für die Bearbeitung — gute Bilder brauchen Sorgfalt. Einzelne Vorschau-Bilder bekommt ihr oft schon nach wenigen Tagen."
    },
    {
      q: "Fährst du auch außerhalb von Wuppertal?",
      a: "Ja! Ich bin in ganz NRW und auf Anfrage deutschlandweit unterwegs. Innerhalb von 30 km um Wuppertal ist die Anfahrt inklusive, darüber hinaus berechne ich eine faire Kilometerpauschale — das klären wir transparent im Voraus."
    },
    {
      q: "Was ist, wenn es am Shooting-Tag regnet?",
      a: "Kein Stress — wir finden immer eine Lösung. Entweder verlegen wir den Termin kostenlos, oder wir nutzen das Wetter kreativ. Manche der schönsten Bilder entstehen bei bedecktem Himmel oder mit Regenschirm."
    },
    {
      q: "Wie läuft die Bezahlung ab?",
      a: "Bei Hochzeiten sichert eine Anzahlung euren Termin, der Rest ist nach der Bildübergabe fällig. Shootings werden nach dem Termin bezahlt. Du bekommst immer eine ordentliche Rechnung."
    },
    {
      q: "Können wir uns vorher unverbindlich kennenlernen?",
      a: "Unbedingt — das ist mir sogar wichtig! Gerade bei Hochzeiten sollte die Chemie stimmen. Ein Kennenlern-Gespräch ist immer kostenlos und unverbindlich."
    }
  ],

  // ---------- TESTIMONIALS ----------
  // WICHTIG: Ersetze diese Platzhalter durch ECHTE Kundenstimmen!
  testimonials: [
    {
      text: "Jamie hat unsere Hochzeit so wunderschön eingefangen. Er war immer da, ohne aufdringlich zu sein — und die Bilder haben uns zum Weinen gebracht (vor Freude!). Absolut zu empfehlen.",
      name: "Sarah & Jonas M.",
      event: "Hochzeit · Wuppertal 2024"
    },
    {
      text: "Das Portrait-Shooting mit Jamie war einfach entspannt und toll. Er hat sofort eine angenehme Atmosphäre geschaffen und die Bilder sind besser geworden, als ich je erwartet hätte.",
      name: "Lena K.",
      event: "Portrait Shooting · 2024"
    },
    {
      text: "Für unser Firmenevent war Jamie genau der Richtige. Professionell, schnell, und die Fotos hatten wirklich eine besondere Qualität. Gerne wieder!",
      name: "Markus T.",
      event: "Firmenevent · Düsseldorf 2023"
    }
  ],
  testimonialsPlaceholderNote: false, // auf false setzen, sobald echte Stimmen eingetragen sind

  // ---------- KONTAKT ----------
  contact: {
    introText: "Ich freue mich über jede Anfrage — egal ob du schon genaue Vorstellungen hast oder noch unsicher bist. Schreib mir einfach, und wir finden gemeinsam heraus, was zu dir passt.",
    email: "jamie.lee.riedel@gmail.com",
    phone: "+49 1771 846741",
    location: "Wuppertal · NRW · deutschlandweit",
    instagram: "@jamieriedel",
    instagramUrl: "https://instagram.com/jamieriedel",
    // WhatsApp-Button (schwebender Button unten rechts)
    whatsappEnabled: true,
    whatsappNumber: "491771846741", // ohne + und ohne Leerzeichen
    whatsappGreeting: "Hallo Jamie! Ich interessiere mich für ein Shooting.",
    // Formspree-ID eintragen, damit das Formular echte E-Mails sendet!
    // Anleitung: siehe ANLEITUNG.md, Schritt 3
    formspreeId: "xgogplrd"
  }
};
