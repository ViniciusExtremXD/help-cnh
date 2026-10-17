import { GTM_ID } from "../config";

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function track(data: DataLayerEvent) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/** Loads Google Tag Manager (when GTM_ID is set) and reports every WhatsApp click to the dataLayer. */
export function initAnalytics() {
  window.dataLayer = window.dataLayer || [];

  if (GTM_ID) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    document.head.appendChild(s);
  }

  // One listener covers every WhatsApp button on the page (hero, cards, FAB, footer...).
  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]') as HTMLAnchorElement | null;
      if (!link) return;
      track({
        event: "whatsapp_click",
        cta_text: (link.innerText || link.getAttribute("aria-label") || "").trim().slice(0, 100),
        cta_section: link.closest("section[id], header, footer")?.id || link.closest("header, footer")?.tagName.toLowerCase() || "flutuante",
      });
    },
    { capture: true },
  );
}
