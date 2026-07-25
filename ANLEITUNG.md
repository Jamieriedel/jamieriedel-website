# 📸 Jamie's Lens — Anleitung: Live gehen & Website pflegen

Diese Anleitung führt dich in 5 Schritten zur fertigen Website. Zeitaufwand insgesamt: ca. 1–2 Stunden.

---

## Was ist in diesem Paket?

| Datei | Zweck |
|---|---|
| `index.html` | Deine Website |
| `content.js` | **Alle Inhalte** (Bilder, Texte, Preise) — die einzige Datei, die du später änderst |
| `admin.html` | Dein persönlicher Editor — hier bearbeitest du alles ohne Code |
| `impressum.html` / `datenschutz.html` | Rechtsseiten (Pflicht!) — Texte müssen noch eingefügt werden |
| `images/` | Ordner für deine Fotos |

---

## Schritt 1 — Bilder von Squarespace retten ⚠️ WICHTIG, ZUERST MACHEN

Die Website zeigt aktuell noch Bilder vom Squarespace-Server. **Sobald du Squarespace kündigst, verschwinden diese Bilder.** Deshalb:

1. Öffne `content.js` in einem Texteditor — dort findest du bei jedem Bild eine `fallback:`-Zeile mit der Squarespace-URL
2. Öffne jede URL im Browser → Rechtsklick → „Bild speichern unter…"
3. Speichere die Bilder mit genau diesen Namen:
   - `hero.jpg` (das große Startbild)
   - `about.jpg` (dein Portrait)
   - `galerie-01.jpg` bis `galerie-08.jpg` (in der Reihenfolge aus content.js)
4. Lege alle in den `images/`-Ordner

💡 **Tipp:** Verkleinere die Bilder vorher auf max. 2000px Breite (z.B. mit squoosh.app, kostenlos im Browser) — das macht die Seite schneller.

---

## Schritt 2 — Auf GitHub hochladen & live schalten

1. Gehe zu **github.com** und logge dich ein
2. Klicke oben rechts auf **+** → **New repository**
3. Name: `jamieriedel-website` (oder beliebig) → Haken bei **Public** → **Create repository**
4. Klicke auf **uploading an existing file** (Link im mittleren Bereich)
5. Ziehe **alle Dateien und den images-Ordner** in das Fenster → unten **Commit changes**
   - Hinweis: Ordner lassen sich per Drag & Drop hochladen, nicht über den Dateiauswahl-Dialog
6. Gehe zu **Settings** (im Repo) → links **Pages**
7. Bei „Source": **Deploy from a branch** → Branch: **main** → Ordner: **/ (root)** → **Save**
8. Nach 1–2 Minuten ist deine Seite live unter: `https://DEINNAME.github.io/jamieriedel-website/`

✅ Teste jetzt alles: Bilder, Galerie-Filter, mobile Ansicht (Handy!).

---

## Schritt 3 — Kontaktformular aktivieren (Formspree)

Ohne diesen Schritt öffnet das Formular nur das E-Mail-Programm der Besucher. Mit Formspree bekommst du Anfragen direkt als E-Mail:

1. Gehe zu **formspree.io** → kostenloses Konto erstellen (50 Anfragen/Monat gratis — mehr als genug)
2. **New Form** → Name z.B. „Website Anfragen" → deine E-Mail bestätigen
3. Du bekommst eine URL wie `https://formspree.io/f/xqkrgpne` — die ID ist der Teil nach `/f/` (hier: `xqkrgpne`)
4. Öffne `admin.html` (einfach Doppelklick, öffnet im Browser) → Abschnitt **8 · Kontakt, WhatsApp & Formular** → ID eintragen
5. Unten **content.js herunterladen** → neue Datei bei GitHub hochladen (ersetzt die alte)

---

## Schritt 4 — Deine Domain jamieriedel.com verbinden

1. Im GitHub-Repo: **Settings → Pages → Custom domain** → `jamieriedel.com` eintragen → **Save**
2. Bei deinem Domain-Anbieter (aktuell wohl Squarespace Domains — prüfe, wo die Domain registriert ist!) diese DNS-Einträge setzen:

   | Typ | Host | Wert |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | DEINNAME.github.io |

3. Zurück bei GitHub Pages: Haken bei **Enforce HTTPS** setzen (erscheint nach ca. 1 Stunde)

⚠️ **Falls deine Domain über Squarespace registriert ist:** Die Domain ist ein separates Produkt und bleibt auch nach Kündigung der Website bestehen — aber prüfe das vor der Kündigung im Squarespace-Konto unter „Domains"! Notfalls Domain zu einem günstigen Anbieter umziehen (z.B. INWX, ~15€/Jahr).

---

## Schritt 5 — Rechtliches erledigen (vor der Squarespace-Kündigung!)

1. Öffne deine alten Seiten jamieriedel.com/impressum und /datenschutzerklrung
2. Kopiere die Texte in `impressum.html` und `datenschutz.html` (die Stellen sind markiert)
3. In der Datenschutzerklärung die neuen Abschnitte zu GitHub Pages, Google Fonts und Formspree **drin lassen** — die sind schon vorbereitet
4. Trage echte Kundenstimmen in admin.html ein (Abschnitt 7) und schalte den „Beispiel"-Hinweis aus

---

## ✅ Checkliste vor der Squarespace-Kündigung

- [ ] Alle Bilder heruntergeladen und im `images/`-Ordner auf GitHub
- [ ] Website unter jamieriedel.com erreichbar und getestet (auch mobil!)
- [ ] Kontaktformular getestet — Testanfrage kommt per E-Mail an
- [ ] Impressum & Datenschutz übernommen
- [ ] Geklärt, wo die Domain registriert ist und dass sie erhalten bleibt

**Erst wenn alle Haken gesetzt sind: Squarespace kündigen.** 🎉

---

## 🔄 So pflegst du die Website in Zukunft

**Neues Bild in die Galerie:**
1. GitHub → dein Repo → Ordner `images` → **Add file → Upload files** → Foto hochladen
2. `admin.html` auf deinem Computer öffnen → Abschnitt 1 → **+ Bild hinzufügen** → Pfad eintragen (z.B. `images/hochzeit-mueller-01.jpg`), Kategorie wählen
3. **content.js herunterladen** → bei GitHub die alte content.js ersetzen (Repo → auf `content.js` klicken → Stift-Symbol ✏️ oder Upload)
4. 1–2 Minuten warten — fertig!

**Texte, Preise, Kategorien, Kundenstimmen ändern:** Gleicher Weg — alles über `admin.html`, dann content.js ersetzen.

**Wichtig:** `admin.html` funktioniert nur lokal auf deinem Computer richtig gut — bewahre eine Kopie des gesamten Ordners auf deinem Rechner auf. Die admin.html liegt zwar auch im Repo online, aber Änderungen dort musst du trotzdem als content.js herunterladen und hochladen.

---

## Kostenübersicht neu vs. alt

| | Vorher (Squarespace) | Nachher |
|---|---|---|
| Hosting | ~150 €/Jahr | 0 € (GitHub Pages) |
| Domain | inklusive/separat | ~10–15 €/Jahr |
| Formular | inklusive | 0 € (Formspree Free) |
| **Gesamt** | **~150 €/Jahr** | **~10–15 €/Jahr** |
