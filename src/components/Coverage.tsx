import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChatCircleDots, MapPinLine } from "@phosphor-icons/react";
import { COVERAGE, waLink } from "../config";
import { CAMPINAS, MAP_SIZE, PINS, SHAPES } from "../data/regionsMap";
import { Button } from "./ui/Button";
import { IconBadge } from "./ui/IconBadge";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

type Side = "top" | "bottom" | "left" | "right";

const CITIES: { name: string; label: string; note: string; pin: { x: number; y: number }; side: Side }[] = [
  { name: "São Paulo", label: "São Paulo", note: "Capital", pin: PINS["São Paulo"], side: "top" },
  { name: "Osasco", label: "Osasco", note: "Região oeste", pin: PINS["Osasco"], side: "left" },
  { name: "São Bernardo do Campo", label: "São Bernardo", note: "Grande ABC", pin: PINS["São Bernardo do Campo"], side: "bottom" },
  { name: "Diadema", label: "Diadema", note: "Grande ABC", pin: PINS["Diadema"], side: "left" },
  { name: "Mauá", label: "Mauá", note: "Grande ABC", pin: PINS["Mauá"], side: "right" },
  { name: "Campinas", label: "Campinas", note: "Interior", pin: CAMPINAS.pin, side: "right" },
];

const SIDE_CLASS: Record<Side, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

const message = (city: string) => `Olá! Sou de ${city} e preciso de ajuda com a minha CNH.`;

export function Coverage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>(CITIES[0].name);
  const [engaged, setEngaged] = useState(false);

  // Highlights the cities one by one until the visitor interacts.
  useEffect(() => {
    if (engaged || !inView || reduce) return;
    const id = window.setInterval(() => {
      setActive((cur) => CITIES[(CITIES.findIndex((c) => c.name === cur) + 1) % CITIES.length].name);
    }, 2600);
    return () => window.clearInterval(id);
  }, [engaged, inView, reduce]);

  const engage = (name: string) => {
    setEngaged(true);
    setActive(name);
  };

  return (
    <section id="localizacao" className="bg-white py-20 sm:py-28">
      <div ref={ref} className="container-x grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div onMouseLeave={() => setEngaged(false)}>
          <SectionTitle
            kicker="Onde atuamos"
            title="Atendimento em São Paulo e Grande São Paulo."
            text="Atendemos motoristas da capital, da região metropolitana e de Campinas. Escolha a sua cidade e fale direto com um especialista."
          />

          <RevealGroup className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {CITIES.map((c) => {
              const on = active === c.name;
              return (
                <motion.a
                  key={c.name}
                  variants={fadeUp}
                  href={waLink(message(c.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => engage(c.name)}
                  onFocus={() => engage(c.name)}
                  className={`card-lift group flex items-center gap-4 rounded-xl border p-4 ${
                    on
                      ? "border-brand-500 bg-brand-50/60 shadow-card"
                      : "border-slate-200 bg-white hover:border-brand-500 hover:shadow-card"
                  }`}
                >
                  <IconBadge icon={MapPinLine} motion="lift" size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold leading-snug text-navy-900">{c.name}</span>
                    <span className="block text-[13px] text-slate-500">{c.note}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    className={`shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                      on ? "text-brand-700" : "text-slate-300"
                    }`}
                  />
                </motion.a>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-6 flex flex-col gap-4 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[15px] font-bold text-navy-900">Não encontrou a sua cidade?</p>
              <p className="mt-0.5 text-sm text-slate-500">Atendemos em {COVERAGE}. Consulte a sua região.</p>
            </div>
            <Button
              href={waLink("Olá! Minha cidade não está na lista de atendimento. Vocês atendem a minha região?")}
              external
              icon="whatsapp"
              size="md"
              variant="dark"
            >
              Consultar
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="relative overflow-hidden rounded-2xl bg-navy-900 shadow-lift"
            onMouseLeave={() => setEngaged(false)}
          >
            {/* Subtle dot grid + glow */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:18px_18px]"
            />
            <div aria-hidden className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-500/20 blur-[90px]" />

            <div className="relative p-3 sm:p-5">
              <div className="relative w-full" style={{ aspectRatio: `${MAP_SIZE.w} / ${MAP_SIZE.h}` }}>
                <svg
                  viewBox={`0 0 ${MAP_SIZE.w} ${MAP_SIZE.h}`}
                  className="absolute inset-0 h-full w-full"
                  role="img"
                  aria-label="Mapa da Grande São Paulo com as cidades atendidas em destaque e Campinas ao lado"
                >
                  {SHAPES.map((s) => {
                    const on = s.core && CITIES.find((c) => c.name === s.name)?.name === active;
                    return (
                      <path
                        key={s.id}
                        d={s.d}
                        fillRule="evenodd"
                        className={`transition-all duration-500 ${s.core ? "cursor-pointer" : ""}`}
                        fill={s.core ? "#0ACF7D" : "#FFFFFF"}
                        fillOpacity={s.core ? (on ? 0.6 : 0.26) : 0.05}
                        stroke={s.core ? "#0ACF7D" : "#FFFFFF"}
                        strokeOpacity={s.core ? (on ? 1 : 0.7) : 0.16}
                        strokeWidth={s.core ? (on ? 2 : 1.2) : 0.8}
                        strokeLinejoin="round"
                        onMouseEnter={s.core ? () => engage(s.name) : undefined}
                      />
                    );
                  })}

                  {/* Campinas inset */}
                  <path
                    d={CAMPINAS.d}
                    fillRule="evenodd"
                    className="cursor-pointer transition-all duration-500"
                    fill="#0ACF7D"
                    fillOpacity={active === "Campinas" ? 0.6 : 0.26}
                    stroke="#0ACF7D"
                    strokeOpacity={active === "Campinas" ? 1 : 0.7}
                    strokeWidth={active === "Campinas" ? 2 : 1.2}
                    strokeLinejoin="round"
                    onMouseEnter={() => engage("Campinas")}
                  />
                  <line
                    {...CAMPINAS.connector}
                    stroke="#FFFFFF"
                    strokeOpacity={0.45}
                    strokeWidth={1.4}
                    strokeDasharray="5 6"
                    strokeLinecap="round"
                    className="dash-flow"
                  />
                </svg>

                {CITIES.map((c, i) => {
                  const on = active === c.name;
                  return (
                    <motion.button
                      key={c.name}
                      type="button"
                      aria-label={c.name}
                      onMouseEnter={() => engage(c.name)}
                      onFocus={() => engage(c.name)}
                      onClick={() => engage(c.name)}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 260, damping: 16 }}
                      className="absolute z-10 block h-8 w-8 -translate-x-1/2 -translate-y-1/2 outline-offset-2"
                      style={{ left: `${c.pin.x}%`, top: `${c.pin.y}%` }}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 m-auto h-8 w-8 rounded-full bg-brand-500/40 ${
                          on ? "animate-ping" : "opacity-0"
                        }`}
                      />
                      <span
                        aria-hidden
                        className={`absolute inset-0 m-auto h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${
                          on ? "scale-150 border-brand-500 bg-white" : "border-navy-900 bg-white"
                        }`}
                      />
                      <span
                        className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-md bg-navy-900/90 px-2 py-1 text-[11px] font-semibold text-white ring-1 ring-white/15 backdrop-blur transition-all duration-300 ${
                          SIDE_CLASS[c.side]
                        } ${on ? "opacity-100" : "opacity-0 md:opacity-90"}`}
                      >
                        {c.label}
                      </span>
                    </motion.button>
                  );
                })}

                <div className="absolute left-[19%] top-[4%] hidden text-[11px] font-medium leading-tight text-slate-400 sm:block">
                  Interior
                  <br />
                  <span className="text-slate-500">(fora da Grande SP)</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm border border-brand-500 bg-brand-500/30" />
                  Cidades atendidas
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm border border-white/20 bg-white/5" />
                  Demais cidades da Grande SP
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <ChatCircleDots size={14} />
                  Toque numa cidade para destacar
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
