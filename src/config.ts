// TODO: substituir pelo número oficial de WhatsApp da Help Soluções e CNH (formato: 55 + DDD + número).
export const WHATSAPP_NUMBER = "5500000000000";

export const DEFAULT_MESSAGE =
  "Olá, Help Soluções e CNH! Gostaria de uma análise do meu caso.";

export function waLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { id: "servicos", label: "Serviços" },
  { id: "diferenciais", label: "Por que a Help" },
  { id: "urgencias", label: "Urgências" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "duvidas", label: "Dúvidas" },
] as const;
