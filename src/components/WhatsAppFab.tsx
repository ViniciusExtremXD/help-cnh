import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { waLink } from "../config";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFab() {
  const [bubble, setBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setBubble(true), 3000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 1 }}
      className="fixed bottom-5 right-5 z-50 flex items-end gap-3 sm:bottom-7 sm:right-7"
    >
      <AnimatePresence>
        {bubble && !dismissed && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
            className="relative mb-2 hidden max-w-[230px] rounded-2xl rounded-br-sm border border-emerald-400/25 bg-midnight/95 py-3 pl-4 pr-9 text-[13px] font-medium leading-snug text-white shadow-[0_20px_50px_-15px_rgba(16,185,129,0.6)] backdrop-blur-xl sm:block"
          >
            <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400 align-middle" />
            Especialista online: analise sua CNH agora
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Fechar aviso"
              className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com um especialista no WhatsApp"
        whileHover={{ scale: 1.1, rotate: -6 }}
        whileTap={{ scale: 0.9 }}
        className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_10px_40px_-5px_rgba(16,185,129,0.8)]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50" />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-emerald-300/60"
          animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
        <motion.span
          className="relative inline-flex"
          animate={{ rotate: [0, -14, 14, -8, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2.5 }}
        >
          <WhatsAppIcon size={30} />
        </motion.span>
      </motion.a>
    </motion.div>
  );
}
