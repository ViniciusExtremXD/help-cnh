// TODO: substituir pelo número oficial de WhatsApp da Help Soluções em CNH (formato: 55 + DDD + número).
export const WHATSAPP_NUMBER = "5500000000000";

// Domínio oficial (registrado na Hostinger em 17/10/2026).
export const SITE_URL = "https://help-cnh.com.br";

// Contêiner do Google Tag Manager da conta help.solucoes.cnh@gmail.com.
export const GTM_ID = "GTM-KZ77FQS8";

export const DEFAULT_MESSAGE =
  "Olá, Help Soluções em CNH! Gostaria de uma análise do meu caso.";

export function waLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Região de atuação informada pelo cliente (grupo de WhatsApp, 15/10/2026).
export const COVERAGE = "São Paulo e Grande São Paulo";
export const REGIONS = [
  "São Paulo",
  "São Bernardo do Campo",
  "Diadema",
  "Mauá",
  "Osasco",
  "Campinas",
] as const;

// TODO: o cliente ainda não confirmou se terá sede física; quando houver endereço, exibir no rodapé.

export const NAV_LINKS = [
  { id: "servicos", label: "Serviços" },
  { id: "diferenciais", label: "Por que a Help" },
  { id: "urgencias", label: "Urgências" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "duvidas", label: "Dúvidas" },
  { id: "localizacao", label: "Onde atuamos" },
] as const;
