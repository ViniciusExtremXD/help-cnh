import { motion } from "framer-motion";
import { ArrowSquareOut, Clock, MapPinLine, Monitor, type Icon } from "@phosphor-icons/react";
import { ADDRESS, COVERAGE, REGIONS, waLink } from "../config";
import { Button } from "./ui/Button";
import { IconBadge, type IconMotion } from "./ui/IconBadge";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

const q = encodeURIComponent(ADDRESS.mapsQuery);
const EMBED = `https://www.google.com/maps?q=${q}&z=15&output=embed`;
const OPEN = `https://www.google.com/maps/search/?api=1&query=${q}`;

const INFO: { icon: Icon; motion: IconMotion; title: string; text: string }[] = [
  { icon: MapPinLine, motion: "lift", title: "Endereço", text: `${ADDRESS.street} — ${ADDRESS.city}` },
  { icon: Monitor, motion: "pop", title: "Região de atuação", text: `${COVERAGE}, com acompanhamento pelo WhatsApp.` },
  { icon: Clock, motion: "spin", title: "Resposta rápida", text: "Envie sua notificação e receba a primeira análise." },
];

export function Location() {
  return (
    <section id="localizacao" className="bg-white py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionTitle
            kicker="Onde estamos"
            title="Atendimento em São Paulo e Grande São Paulo."
            text="Fale com a gente pelo WhatsApp ou agende uma conversa no nosso endereço em São Paulo."
          />
          <RevealGroup className="mt-8 space-y-2">
            {INFO.map((it) => (
              <motion.div
                key={it.title}
                variants={fadeUp}
                className="group -mx-4 flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-slate-50 hover:shadow-card"
              >
                <IconBadge icon={it.icon} motion={it.motion} size="sm" />
                <div>
                  <p className="text-[15px] font-bold text-navy-900">{it.title}</p>
                  <p className="text-sm text-slate-500">{it.text}</p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>
          <Reveal delay={0.1} className="mt-6">
            <p className="text-sm font-semibold text-navy-900">Cidades atendidas</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[13px] font-medium text-slate-700"
                >
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={waLink("Olá! Gostaria de agendar um atendimento.")} external icon="whatsapp">
              Agendar atendimento
            </Button>
            <Button href={OPEN} external variant="outline" icon={ArrowSquareOut}>
              Abrir no Google Maps
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lift">
            <iframe
              title={`Mapa: ${ADDRESS.street}, ${ADDRESS.city}`}
              src={EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[360px] w-full border-0 sm:h-[440px]"
              allowFullScreen
            />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-card backdrop-blur">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-500" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy-900">Help Soluções em CNH</p>
                <p className="text-xs text-slate-500">
                  {ADDRESS.street}, {ADDRESS.city}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
