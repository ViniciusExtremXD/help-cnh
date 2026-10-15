import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { waLink } from "../config";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFab() {
  const [bubble, setBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setBubble(true), 4000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-50 flex items-end gap-3 sm:bottom-7 sm:right-7"
    >
      <AnimatePresence>
        {bubble && !dismissed && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            className="relative mb-1.5 hidden max-w-[240px] rounded-xl rounded-br-sm border border-slate-200 bg-white py-3 pl-4 pr-9 text-[13px] leading-snug text-slate-600 shadow-lift sm:block"
          >
            <span className="block font-semibold text-navy-900">Especialista online</span>
            Envie sua notificação e receba uma análise.
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Fechar aviso"
              className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-navy-900"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com um especialista no WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)] transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.4s]" />
        <WhatsAppIcon size={28} className="relative" />
      </a>
    </motion.div>
  );
}
