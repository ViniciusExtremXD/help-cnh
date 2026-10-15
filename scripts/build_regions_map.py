"""Gera src/data/regionsMap.ts a partir dos contornos municipais do IBGE.

Fonte dos dados: IBGE, API de malhas (https://servicodados.ibge.gov.br/api/v3/malhas/municipios/<id>).
Os arquivos baixados (m_<id>.json + rmsp.json com a lista da Região Metropolitana de São Paulo)
ficam FORA do projeto; passe a pasta como argumento:

    python -I scripts/build_regions_map.py <pasta-com-os-json> [preview.html]

Saída: apenas caminhos SVG já projetados e simplificados (sem dependências em tempo de execução).
"""
import json
import math
import sys
from pathlib import Path

DATA = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "regionsMap.ts"

CORE = {  # cidades atendidas (id IBGE -> nome) e coordenadas do centro urbano (lat, lon)
    "3550308": ("São Paulo", -23.5505, -46.6333),
    "3534401": ("Osasco", -23.5325, -46.7917),
    "3548708": ("São Bernardo do Campo", -23.6914, -46.5646),
    "3513801": ("Diadema", -23.6861, -46.6228),
    "3529401": ("Mauá", -23.6677, -46.4613),
}
CAMPINAS = ("3509502", "Campinas", -22.9056, -47.0608)

K = 520.0  # unidades SVG por grau de latitude
LAT0 = -23.6
COS = math.cos(math.radians(LAT0))


def rings(geom):
    if geom["type"] == "Polygon":
        return [geom["coordinates"][0]]
    return [poly[0] for poly in geom["coordinates"]]  # só anéis externos


def load(mid):
    d = json.loads((DATA / f"m_{mid}.json").read_text(encoding="utf-8"))
    return rings(d["features"][0]["geometry"])


def dp(points, tol):
    """Douglas-Peucker iterativo."""
    if len(points) < 4:
        return points
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        a, b = stack.pop()
        (x1, y1), (x2, y2) = points[a], points[b]
        dx, dy = x2 - x1, y2 - y1
        norm = math.hypot(dx, dy) or 1e-9
        idx, dmax = -1, 0.0
        for i in range(a + 1, b):
            x0, y0 = points[i]
            dist = abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / norm
            if dist > dmax:
                idx, dmax = i, dist
        if dmax > tol:
            keep[idx] = True
            stack += [(a, idx), (idx, b)]
    return [p for p, k in zip(points, keep) if k]


def dp_ring(points, tol):
    """Anel fechado: divide no ponto mais distante do início para não ter linha-base de comprimento zero."""
    if points[0] == points[-1]:
        points = points[:-1]
    far = max(range(len(points)), key=lambda i: (points[i][0] - points[0][0]) ** 2 + (points[i][1] - points[0][1]) ** 2)
    a = dp(points[: far + 1], tol)
    b = dp(points[far:] + [points[0]], tol)
    return a[:-1] + b[:-1]


def area(ring):
    return abs(sum(ring[i][0] * ring[(i + 1) % len(ring)][1] - ring[(i + 1) % len(ring)][0] * ring[i][1] for i in range(len(ring)))) / 2


def to_path(rs, proj, tol, min_area):
    parts = []
    for r in rs:
        pts = [proj(lon, lat) for lon, lat in r]
        if area(pts) < min_area:
            continue
        pts = dp_ring(pts, tol)
        if len(pts) < 3:
            continue
        parts.append("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z")
    return "".join(parts)


members = json.loads((DATA / "rmsp.json").read_text(encoding="utf-8"))
metro = {str(m["id"]): m["nome"] for m in members}

all_rings = {mid: load(mid) for mid in metro}
lons = [p[0] for rs in all_rings.values() for r in rs for p in r]
lats = [p[1] for rs in all_rings.values() for r in rs for p in r]
LON_MIN, LAT_MAX = min(lons), max(lats)
LON_MAX, LAT_MIN = max(lons), min(lats)

PAD = 14
INSET_W = 150  # espaço extra no topo para o recorte de Campinas
proj = lambda lon, lat: ((lon - LON_MIN) * COS * K + PAD, (LAT_MAX - lat) * K + PAD + INSET_W)

W = (LON_MAX - LON_MIN) * COS * K + 2 * PAD
H = (LAT_MAX - LAT_MIN) * K + 2 * PAD + INSET_W

shapes = []
for mid, name in sorted(metro.items(), key=lambda kv: kv[0] in CORE):  # núcleo por cima
    core = mid in CORE
    shapes.append(
        {
            "id": mid,
            "name": CORE[mid][0] if core else name,
            "d": to_path(all_rings[mid], proj, 0.28 if core else 0.5, 1.0),
            "core": core,
        }
    )

pins = {}
for mid, (name, lat, lon) in CORE.items():
    x, y = proj(lon, lat)
    pins[name] = {"x": round(x / W * 100, 2), "y": round(y / H * 100, 2)}

# Campinas: contorno próprio, ampliado, no canto superior esquerdo
cid, cname, clat, clon = CAMPINAS
c_rings = load(cid)
c_lons = [p[0] for r in c_rings for p in r]
c_lats = [p[1] for r in c_rings for p in r]
cw = (max(c_lons) - min(c_lons)) * COS
ch = max(c_lats) - min(c_lats)
box = 118.0
cs = box / max(cw, ch)
ox, oy = PAD + 4, PAD + 6
cproj = lambda lon, lat: ((lon - min(c_lons)) * COS * cs + ox, (max(c_lats) - lat) * cs + oy)
c_path = to_path(c_rings, cproj, 0.3, 1.0)
cx, cy = cproj(clon, clat)

# Conector tracejado: de Campinas até a borda noroeste da Grande SP
sp_x, sp_y = proj(-46.6333, -23.5505)
nw_x, nw_y = proj(-46.95, -23.33)  # entre Cajamar e Pirapora do Bom Jesus (borda NW da RMSP)

ts = f"""// Gerado por scripts/build_regions_map.py a partir dos contornos municipais do IBGE
// (https://servicodados.ibge.gov.br/api/v3/malhas/municipios). Não editar à mão.

export const MAP_SIZE = {{ w: {W:.0f}, h: {H:.0f} }} as const;

export type MapShape = {{ id: string; name: string; d: string; core: boolean }};

export const SHAPES: MapShape[] = {json.dumps(shapes, ensure_ascii=False, indent=2)};

/** Posição dos pins, em % da área do mapa. */
export const PINS: Record<string, {{ x: number; y: number }}> = {json.dumps(pins, ensure_ascii=False, indent=2)};

export const CAMPINAS = {{
  name: "Campinas",
  d: {json.dumps(c_path)},
  pin: {{ x: {round(cx / W * 100, 2)}, y: {round(cy / H * 100, 2)} }},
  connector: {{ x1: {cx:.1f}, y1: {cy:.1f}, x2: {nw_x:.1f}, y2: {nw_y:.1f} }},
}} as const;

export const SP_CENTER = {{ x: {round(sp_x / W * 100, 2)}, y: {round(sp_y / H * 100, 2)} }} as const;
"""
OUT.write_text(ts, encoding="utf-8")
print("ok", OUT, f"{W:.0f}x{H:.0f}", len(ts) // 1024, "KB")
print({k: v for k, v in pins.items()}, round(cx / W * 100, 1), round(cy / H * 100, 1))

if len(sys.argv) > 2:  # pré-visualização rápida em HTML
    paths = "".join(
        f'<path d="{x["d"]}" fill="{"#0acf7d55" if x["core"] else "#ffffff10"}" '
        f'stroke="{"#0acf7d" if x["core"] else "#ffffff30"}" stroke-width="1"/>'
        for x in shapes
    )
    svg = (
        f'<svg viewBox="0 0 {W:.0f} {H:.0f}" style="width:100%;background:#09121b">{paths}'
        f'<path d="{c_path}" fill="#0acf7d55" stroke="#0acf7d"/>'
        f'<line x1="{cx:.1f}" y1="{cy:.1f}" x2="{nw_x:.1f}" y2="{nw_y:.1f}" stroke="#fff" stroke-dasharray="4 5"/>'
        + "".join(f'<circle cx="{v["x"] / 100 * W:.1f}" cy="{v["y"] / 100 * H:.1f}" r="5" fill="#fff"/>' for v in pins.values())
        + "</svg>"
    )
    Path(sys.argv[2]).write_text(f'<body style="margin:0;background:#222">{svg}', encoding="utf-8")
