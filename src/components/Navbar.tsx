import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, waLink } from "../config";
import { Wordmark } from "./Wordmark";
import { WhatsAppIcon } from "./WhatsAppIcon";

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <nav
        aria-label="Principal"
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border px-4 py-3 backdrop-blur-md transition-all duration-500 sm:px-5 ${
          scrolled
            ? "border-white/10 bg-obsidian/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]"
            : "border-white/[0.06] bg-obsidian/40"
        }`}
      >
        <a href="#topo" className="shrink-0" aria-label="Help Soluções e CNH — início">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((l, i) => (
            <motion.li
              key={l.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="relative"
            >
              <a
                href={`#${l.id}`}
                className={`relative z-10 block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  active === l.id ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
              </a>
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-emerald-400/20 bg-emerald-400/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <motion.a
            href={waLink("Olá! Vim pelo site e gostaria de falar com o plantão de atendimento.")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-2 text-[13px] font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="hidden sm:inline">Plantão de Atendimento</span>
            <span className="hidden text-white/30 sm:inline">•</span>
            <WhatsAppIcon size={15} className="transition-transform group-hover:rotate-12 group-hover:scale-110" />
            <span>WhatsApp</span>
          </motion.a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white xl:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-obsidian/95 p-2 backdrop-blur-xl xl:hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                className={`block rounded-xl px-4 py-3 text-[15px] font-medium ${
                  active === l.id ? "bg-emerald-400/10 text-white" : "text-white/70"
                }`}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
