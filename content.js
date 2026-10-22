// ============================================================
//  JAMIE'S LENS – INHALTE
//  Diese Datei steuert ALLE Inhalte der Website.
//  Bearbeite sie bequem über admin.html (empfohlen)
//  oder direkt hier im Texteditor.
//  Nach dem Hochladen baut GitHub daraus automatisch die
//  fertigen HTML-Seiten (siehe ANLEITUNG.md).
// ============================================================

window.SITE_CONTENT = {

  // ---------- MARKE ----------
  brand: {
    name: "Jamie's Lens",
    owner: "Jamie-Lee Riedel",
    city: "Wuppertal"
  },

  // ---------- ALLGEMEIN & SEO (Startseite) ----------
  meta: {
    title: "Hochzeitsfotograf Wuppertal & Düsseldorf – Jamie's Lens",
    description: "Hochzeitsfotograf aus Wuppertal für Düsseldorf & ganz NRW: natürliche Hochzeitsreportagen ohne Standardposen. Hochzeit ab 300 €. Jetzt anfragen.",
    siteUrl: "https://jamieriedel.com",
    ogImage: "images/hero.webp",
    // Einstiegspreis Hochzeit für strukturierte Daten (nur Zahl)
    weddingPriceFrom: 300,
    // Links zu Profilen (Google-Unternehmensprofil hier ergänzen, sobald vorhanden)
    sameAs: ["https://instagram.com/jamieriedel"]
  },

  // ---------- CONVERSION-ELEMENTE ----------
  availabilityNote: "Für 2026 sind noch einzelne Hochzeitstermine frei",
  responsePromise: "Ich melde mich innerhalb von 24 Stunden bei dir.",

  // ---------- HERO ----------
  hero: {
    h1: "Hochzeitsfotograf aus Wuppertal für ganz NRW",
    tag: "Fotografie · Wuppertal & NRW",
    titleLine1: "Momente,",
    titleLine2Prefix: "die ",
    titleLine2Em: "bleiben",
    subtitle: "Ich fotografiere Hochzeiten, Portraits und Events. Echte Momente, echte Emotionen. Keine Standardposen, sondern Bilder, die sich nach euch anfühlen.",
    image: "images/hero.webp",
    imageAlt: "Braut mit Schleier und weißer Sonnenbrille trinkt Kaffee in einem Café",
    imageFallback: ""
  },

  // ---------- ÜBER MICH ----------
  about: {
    // Zitierfähiger Absatz: Wer, Was, Wo, Preis, wie anfragen
    lead: "Jamie's Lens ist das Fotografie-Angebot von Jamie-Lee Riedel, Hochzeitsfotograf aus Wuppertal. Ich begleite Hochzeiten in Wuppertal, Düsseldorf, im Bergischen Land und in ganz NRW – natürlich und ohne Standardposen. Hochzeitsreportagen gibt es ab 300 €; anfragen könnt ihr über das Kontaktformular, per WhatsApp oder per E-Mail.",
    image: "images/fotograf-jamie-lee-riedel-wuppertal.jpg",
    imageAlt: "Jamie-Lee Riedel, Hochzeitsfotograf aus Wuppertal, mit Kamera vor einem türkisfarbenen Bus",
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
  // Auf der Startseite erscheinen die ersten "homeCount" Bilder,
  // auf /portfolio/ alle.
  gallery: {
    homeCount: 9,
    categories: ["Hochzeit", "Portrait", "Event", "Mood"],
    items: [
      { src: "images/hochzeit-brautpaar-standesamt-treppen.jpg", fallback: "", category: "Hochzeit", alt: "Brautpaar verlässt Hand in Hand das Standesamt über die Treppe" },
      { src: "images/hochzeit-brautpaar-parkbank-kuss.jpg", fallback: "", category: "Hochzeit", alt: "Brautpaar sitzt auf einer Parkbank und schaut sich verliebt an" },
      { src: "images/hochzeit-erster-tanz-gaeste.jpg", fallback: "", category: "Hochzeit", alt: "Bräutigam im weißen Sakko beim ersten Tanz mit der Braut, Gäste schauen zu" },
      { src: "images/hochzeit-standesamt-trauung.jpg", fallback: "", category: "Hochzeit", alt: "Brautpaar lacht bei der Trauung im Standesamt, umgeben von Gästen" },
      { src: "images/galerie-01.jpg", fallback: "", category: "Portrait", alt: "Nahaufnahme einer Frau mit weißer Blüte im Haar und silbernem Ohrring" },
      { src: "images/hochzeit-brautpaar-zeremonie.jpg", fallback: "", category: "Hochzeit", alt: "Lachendes Brautpaar bei einer freien Trauung, die Braut hält einen Blumenstrauß" },
      { src: "images/hochzeit-groomsmen-gruppenfoto.jpg", fallback: "", category: "Hochzeit", alt: "Bräutigam im weißen Sakko mit seinen Freunden in schwarzen Anzügen und Sonnenbrillen" },
      { src: "images/galerie-02.webp", fallback: "", category: "Portrait", alt: "Tätowierter Mann verdeckt ein Auge mit einem Blatt, Portrait zwischen großen grünen Pflanzen" },
      { src: "images/hochzeit-gaeste-feier.jpg", fallback: "", category: "Hochzeit", alt: "Zwei Hochzeitsgäste in gemusterten Hemden jubeln in die Kamera" },
      { src: "images/hochzeit-brautpaar-schwarzweiss.jpg", fallback: "", category: "Hochzeit", alt: "Schwarzweißfoto: Die Braut streicht dem Bräutigam zärtlich über das Gesicht" },
      { src: "images/galerie-04.webp", fallback: "", category: "Portrait", alt: "Frau hält zwei brennende Schwerter über dem Kopf auf einer Wiese unter dunklem Himmel" },
      { src: "images/galerie-03.webp", fallback: "", category: "Hochzeit", alt: "Bräutigam küsst die Stirn der Braut, ihre Hand mit Ehering liegt auf seiner Brust" },
      { src: "images/hochzeit-brautpaar-schloss-schwarzweiss.jpg", fallback: "", category: "Hochzeit", alt: "Schwarzweißfoto: Brautpaar hält sich an den Händen vor einem Schloss am Wasser" },
      { src: "images/galerie-05.webp", fallback: "", category: "Portrait", alt: "Frau mit platinblonden Haaren liegt auf einem Bett und hält ein Buch über sich" },
      { src: "images/galerie-06.webp", fallback: "", category: "Hochzeit", alt: "Brautpaar küsst sich, Freunde jubeln ausgelassen um sie herum" },
      { src: "images/galerie-07.webp", fallback: "", category: "Portrait", alt: "Blonde Frau liegt kopfüber auf einem Ledersofa und liest eine Zeitschrift" },
      { src: "images/galerie-08.webp", fallback: "", category: "Portrait", alt: "Frau mit langen Zöpfen posiert sitzend zwischen zwei blauen Laternen" },
      { src: "images/galerie-09.webp", fallback: "", category: "Hochzeit", alt: "Brautpaar schreitet Hand in Hand die Treppe des Standesamts hinunter" }
    ]
  },

  // ---------- SERVICES ----------
  services: [
    {
      name: "Hochzeit",
      desc: "Euer großer Tag, so festgehalten, wie er sich wirklich anfühlt. Ich bin den ganzen Tag an eurer Seite, halte mich im Hintergrund und fange genau die Momente ein, an die ihr euch für immer erinnern wollt.",
      includes: ["Ganztages-Begleitung möglich", "Vorgespräch zum Kennenlernen", "Alle wichtigen Momente", "Individuell auf euch abgestimmt"],
      price: "ab 300 €",
      priceFrom: 300,
      priceNote: "Jede Hochzeit ist anders",
      cta: "Unverbindlich anfragen →"
    },
    {
      name: "Portrait",
      desc: "Ein Shooting nur für dich. Entspannt, ohne Druck und mit Bildern, auf denen du dich wirklich erkennst.",
      includes: ["1 Person", "1 Stunde Shooting", "15 bearbeitete Fotos", "Online-Galerie zum Download"],
      price: "100 €",
      priceFrom: 100,
      priceNote: "Festpreis",
      cta: "Jetzt buchen →"
    },
    {
      name: "Couple / Familie",
      desc: "Für Paare, Familien oder eure beste Crew. Einfach zusammen sein, Spaß haben und nebenbei richtig gute Bilder mitnehmen.",
      includes: ["2 oder mehr Personen", "1 Stunde Shooting", "20 bearbeitete Fotos", "Online-Galerie zum Download"],
      price: "150 €",
      priceFrom: 150,
      priceNote: "Festpreis",
      cta: "Jetzt buchen →"
    },
    {
      name: "Events",
      desc: "Ob Firmenevent, Geburtstagsfeier oder Konzert. Ich halte die Stimmung fest, die Energie und die Gesichter, die den Abend ausmachen.",
      includes: ["Flexible Zeitplanung", "Schnelle Lieferung", "Individuelles Angebot", "Erfahrung mit großen Events"],
      price: "ab 300 €",
      priceFrom: 300,
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
    formspreeId: "xgogplrd"
  },

  // ---------- UNTERSEITEN ----------
  pages: {
    preise: {
      title: "Preise Hochzeitsfotograf Wuppertal – Jamie's Lens",
      description: "Was kostet ein Hochzeitsfotograf in Wuppertal? Hochzeit ab 300 €, Portrait 100 €, Couple/Familie 150 €, Events ab 300 €. Jetzt unverbindlich anfragen.",
      h1: "Preise für Hochzeits- und Portraitfotografie",
      intro: "Hier findest du alle aktuellen Preise auf einen Blick. Hochzeiten plane ich individuell mit euch – der Einstieg liegt bei 300 €. Schreib mir, was ihr vorhabt, und ich mache euch ein passendes Angebot."
    },
    portfolio: {
      title: "Portfolio Hochzeitsfotografie Wuppertal & NRW – Jamie's Lens",
      description: "Ausgewählte Hochzeitsreportagen, Portraits und Paarshootings von Jamie's Lens aus Wuppertal – natürlich, ehrlich und ohne Standardposen.",
      h1: "Portfolio: Hochzeiten und Portraits",
      intro: "Eine Auswahl meiner Arbeiten – Hochzeiten in Wuppertal und NRW, dazu Portrait- und Paarshootings. Über die Filter kannst du nach Kategorie sortieren."
    },
    wuppertal: {
      slug: "hochzeitsfotograf-wuppertal",
      title: "Hochzeitsfotograf Wuppertal | Jamie's Lens",
      description: "Hochzeitsfotograf in Wuppertal und im Bergischen Land: natürliche Hochzeitsreportagen ohne Standardposen. Hochzeit ab 300 €. Jetzt unverbindlich anfragen.",
      h1: "Hochzeitsfotograf in Wuppertal",
      intro: [
        "Ich bin Jamie-Lee Riedel, Fotograf aus Wuppertal. Unter dem Namen Jamie's Lens begleite ich Hochzeiten hier in der Stadt und im Bergischen Land – vom Standesamt über die Feier bis zum letzten Tanz, natürlich und ohne steifes Posing.",
        "Bis 30 km um Wuppertal ist die Anfahrt inklusive. Hochzeitsreportagen gibt es ab 300 €."
      ]
    },
    duesseldorf: {
      slug: "hochzeitsfotograf-duesseldorf",
      title: "Hochzeitsfotograf Düsseldorf | Jamie's Lens",
      description: "Hochzeitsfotograf für Düsseldorf aus dem nahen Wuppertal: natürliche Hochzeitsreportagen ohne Standardposen. Hochzeit ab 300 €. Jetzt anfragen.",
      h1: "Hochzeitsfotograf für Düsseldorf",
      intro: [
        "Ich bin Jamie-Lee Riedel, Fotograf aus dem benachbarten Wuppertal. Unter dem Namen Jamie's Lens begleite ich auch Hochzeiten in Düsseldorf – natürlich, entspannt und ohne Standardposen.",
        "Die Anfahrt besprechen wir vorab transparent, damit es für beide Seiten passt. Hochzeitsreportagen gibt es ab 300 €."
      ]
    }
  }
};
