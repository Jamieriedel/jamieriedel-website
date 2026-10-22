"""Erzeugt responsive Bildvarianten (WebP + AVIF) und images/manifest.json.

Läuft automatisch in der GitHub Action (siehe .github/workflows/build.yml).
Neue Bilder einfach in images/ hochladen - die Varianten entstehen beim nächsten Build.

Ausgabe:
  images/r/<name>-<breite>.webp   (480, 960, 1600 px)
  images/r/<name>-<breite>.avif   (nur Dateien, die mit "hero" beginnen: 640, 960, 1280, 1920 px)
  images/manifest.json            Maße + verfügbare Varianten pro Originalbild
"""
import json
import os
import sys

from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
IMG_DIR = os.path.join(ROOT, "images")
OUT_DIR = os.path.join(IMG_DIR, "r")
EXTS = (".jpg", ".jpeg", ".png", ".webp")

DEFAULT_WIDTHS = [480, 960, 1600]
HERO_WIDTHS = [640, 960, 1280, 1920]


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    manifest = {}
    for name in sorted(os.listdir(IMG_DIR)):
        path = os.path.join(IMG_DIR, name)
        if not os.path.isfile(path) or not name.lower().endswith(EXTS):
            continue
        stem = os.path.splitext(name)[0]
        with Image.open(path) as im:
            im = im.convert("RGB")
            w, h = im.size
            is_hero = stem.startswith("hero")
            widths = HERO_WIDTHS if is_hero else DEFAULT_WIDTHS
            variants = {"webp": [], "avif": []}
            for tw in widths:
                if tw > w:
                    continue
                th = round(h * tw / w)
                formats = ["webp", "avif"] if is_hero else ["webp"]
                for fmt in formats:
                    out = os.path.join(OUT_DIR, f"{stem}-{tw}.{fmt}")
                    if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(path):
                        resized = im.resize((tw, th), Image.LANCZOS)
                        if fmt == "webp":
                            resized.save(out, "WEBP", quality=78, method=6)
                        else:
                            resized.save(out, "AVIF", quality=55)
                    variants[fmt].append(tw)
            manifest["images/" + name] = {"width": w, "height": h, "stem": stem, **variants}
    with open(os.path.join(IMG_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)
    print(f"{len(manifest)} Bilder verarbeitet")


if __name__ == "__main__":
    sys.exit(main())
