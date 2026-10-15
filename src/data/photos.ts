// Fotos do Pexels feitas no Brasil (licença Pexels: uso comercial livre, sem necessidade de atribuição).
// Para trocar por fotos próprias da empresa, basta substituir o componente <Photo> por <img src=...>.
export const PHOTOS = {
  spExpressway: "27757517", // Via expressa em São Paulo
  driverSaoPaulo: "17839129", // Motorista nas ruas de São Paulo
  pmViatura: "39814417", // Viatura da Polícia Militar em São Paulo
  rainySaoPaulo: "799463", // Dirigindo em São Paulo na chuva
  carMercosul: "16997303", // Carro com placa Mercosul
  nightDriveSp: "25820130", // Dirigindo por São Paulo à noite
  pmTraffic: "16862086", // Policial orientando o trânsito em Londrina (PR)
  youngDriverCuritiba: "13275530", // Jovem motorista em Curitiba (PR)
  speedRadar: "14615662", // Radar de velocidade em rodovia
  plateMercosul: "28262072", // Placa Mercosul em close
  enforcement: "16862084", // Fiscalização de trânsito
  consultantSmile: "20596937", // Consultora em escritório de São Paulo
  consultantDesk: "20596944", // Consultora em escritório de São Paulo
  highwaySigns: "38881697", // Rodovia com placas de sinalização (Natal, RN)
  spHighway: "5952263", // Rodovia em São Paulo
  spDusk: "4260636", // Rodovia de São Paulo ao entardecer
  paulistaAerial: "32163284", // Avenida Paulista vista de cima
} as const;

export function photoUrl(id: string, width: number, ratio?: number) {
  const h = ratio ? `&h=${Math.round(width * ratio)}&fit=crop` : "";
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}${h}`;
}

export function photoSrcSet(id: string, widths: number[], ratio?: number) {
  return widths.map((w) => `${photoUrl(id, w, ratio)} ${w}w`).join(", ");
}
