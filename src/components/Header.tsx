import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, List, MapPin, ShieldCheck, WhatsappLogo, X } from "@phosphor-icons/react";
import { COVERAGE, NAV_LINKS, waLink } from "../config";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="hidden whitespace-nowrap bg-navy-900 text-[13px] text-slate-300 md:block">
        <div className="container-x flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} weight="fill" className="text-brand-400" />
              Atendimento em {COVERAGE}
            </span>
            <span className="hidden items-center gap-2 lg:inline-flex">
              <ShieldCheck size={15} weight="fill" className="text-brand-400" />
              Assessoria administrativa especializada em trânsito
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-2 xl:inline-flex">
              <Clock size={15} weight="fill" className="text-brand-400" />
              Resposta rápida pelo WhatsApp
            </span>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-brand-400"
            >
              <WhatsappLogo size={16} weight="fill" className="text-brand-400" />
              Fale com um especialista
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "border-slate-200 shadow-[0_6px_24px_-16px_rgba(9,18,27,0.35)]" : "border-transparent"
        }`}
      >
        <div className={`container-x flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? "h-[72px]" : "h-[88px]"}`}>
          <a href="#topo" aria-label="Help Soluções em CNH — início" className="shrink-0">
            <Logo className={`transition-all duration-300 ${scrolled ? "h-12" : "h-[3.75rem]"}`} />
          </a>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className={`relative block whitespace-nowrap px-3.5 py-2 text-[14.5px] font-semibold transition-colors ${
                      active === l.id ? "text-navy-900" : "text-slate-500 hover:text-navy-900"
                    }`}
                  >
                    {l.label}
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-brand-500"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href={waLink("Olá! Vim pelo site e gostaria de uma análise do meu caso.")}
              external
              icon="whatsapp"
              size="md"
              className="hidden sm:inline-flex"
            >
              Analisar meu caso
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 text-navy-900 xl:hidden"
            >
              {open ? <X size={20} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="menu-mobile"
              aria-label="Menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-slate-200 bg-white xl:hidden"
            >
              <div className="container-x py-3">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-slate-100 py-3.5 text-base font-semibold text-navy-900 last:border-0"
                  >
                    {l.label}
                  </a>
                ))}
                <Button
                  href={waLink("Olá! Vim pelo site e gostaria de uma análise do meu caso.")}
                  external
                  icon="whatsapp"
                  className="mt-3 w-full"
                >
                  Analisar meu caso
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
