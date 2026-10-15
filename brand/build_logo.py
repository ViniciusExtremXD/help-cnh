"""Gera as versões web da logo a partir de brand/logo-original.png (fundo azul-marinho).

Saídas:
  src/assets/brand/logo-dark.webp   letras brancas, fundo transparente (para fundos escuros)
  src/assets/brand/logo-light.webp  letras azul-marinho, fundo transparente (para fundos claros)
  public/og-image.jpg               imagem de compartilhamento 1200x630
  public/favicon-64.png, public/apple-touch-icon.png

Uso: python -I brand/build_logo.py  (requer Pillow e numpy)
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BG = np.array([9, 18, 27], dtype=np.float64)  # cor de fundo da arte original
NAVY = [11, 22, 34]

src_img = Image.open(ROOT / "brand/logo-original.png").convert("RGB")
im = np.asarray(src_img).astype(np.float64)

# Color-to-alpha contra o fundo (o conteúdo da logo é sempre mais claro que ele).
up = np.where(im > BG, (im - BG) / (255 - BG), 0)
raw = up.max(axis=2)
t = 0.035
alpha = np.clip((raw - t) / (1 - t), 0, 1)
unmult = np.clip((im - BG) / np.where(raw > 0, raw, 1)[..., None] + BG, 0, 255)

ys, xs = np.where(alpha > 0.1)
pad = 4
crop = (slice(ys.min() - pad, ys.max() + pad + 1), slice(xs.min() - pad, xs.max() + pad + 1))

dark = np.dstack([unmult, alpha * 255]).astype(np.uint8)[crop]

# Versão clara: tons neutros (letras) viram azul-marinho; o anel colorido ganha corpo no branco.
neutral = (unmult.max(axis=2) - unmult.min(axis=2)) < 60
la, lrgb = alpha.copy(), unmult.copy()
la[~neutral] = np.clip((raw[~neutral] - t) / 0.42, 0, 1)
lrgb[~neutral] = unmult[~neutral] * 0.84
lrgb[neutral] = NAVY
light = np.dstack([lrgb, la * 255]).astype(np.uint8)[crop]

out = ROOT / "src/assets/brand"
out.mkdir(parents=True, exist_ok=True)
for name, arr in (("logo-dark", dark), ("logo-light", light)):
    img = Image.fromarray(arr)
    img = img.resize((img.width * 2 // 3, img.height * 2 // 3), Image.LANCZOS)
    img.save(out / f"{name}.webp", "WEBP", quality=90, method=6)
    print(name, img.size)

og = Image.new("RGB", (1200, 630), tuple(int(c) for c in BG))
s = src_img.copy()
s.thumbnail((1120, 630), Image.LANCZOS)
og.paste(s, ((1200 - s.width) // 2, (630 - s.height) // 2))
og.save(ROOT / "public/og-image.jpg", quality=88)

# Favicon: só o velocímetro com o "H" (parte à esquerda do texto).
cols = (alpha > 0.1).sum(axis=0)
x0 = xs.min()
gap = next(x for x in range(x0 + 200, xs.max()) if cols[x : x + 4].sum() == 0)
mark = Image.fromarray(np.dstack([unmult, alpha * 255]).astype(np.uint8)[:, x0:gap])
mark = mark.crop(mark.getbbox())
for size, name in ((64, "favicon-64.png"), (180, "apple-touch-icon.png")):
    canvas = Image.new("RGBA", (size, size), (9, 18, 27, 255))
    m = mark.copy()
    m.thumbnail((int(size * 0.82),) * 2, Image.LANCZOS)
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    canvas.save(ROOT / "public" / name)
