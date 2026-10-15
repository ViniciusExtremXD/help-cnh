// Fotos do Unsplash (licença Unsplash: uso comercial livre, sem necessidade de atribuição).
// Para trocar por fotos próprias da empresa, basta substituir o componente <Photo> por <img src=...>.
export const PHOTOS = {
  handOnWheel: "1611448746128-7c39e03b71e4",
  driverDay: "1527593167147-e9c94a5883e6",
  policeNight: "1675430428387-376cabac44dc",
  youngDriver: "1578041262130-633307b3bfd6",
  keysHandover: "1727893512947-8bdc773ceb02",
  signing: "1763729805496-b5dbf7f00c79",
  policeLights: "1608095476825-d4e0f916372f",
  handsWheel: "1679395608187-ac2bcedba9ab",
  speedCamera: "1789052112435-b80e92383c22",
  carKey: "1653565217811-85b41bcd1edb",
  towTruck: "1730514784243-f0e7f09c9f50",
  consulting: "1611095790444-1dfa35e37b52",
  support: "1615890932417-89da415105d2",
  headset: "1766066014237-00645c74e9c6",
  highwayAerial: "1536099629323-44806c1ea264",
  trafficNight: "1767538109936-8dfc5600f81e",
  documents: "1450101499163-c8848c66ca85",
} as const;

export type PhotoId = (typeof PHOTOS)[keyof typeof PHOTOS];

export function photoUrl(id: string, width: number, ratio?: number) {
  const h = ratio ? `&h=${Math.round(width * ratio)}` : "";
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}${h}&q=75`;
}

export function photoSrcSet(id: string, widths: number[], ratio?: number) {
  return widths.map((w) => `${photoUrl(id, w, ratio)} ${w}w`).join(", ");
}
