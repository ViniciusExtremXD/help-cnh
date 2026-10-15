import { motion, type Variants } from "framer-motion";
import { Car, FileWarning, Gauge, Scale, ShieldAlert, Siren, TriangleAlert, type LucideIcon } from "lucide-react";
import { waLink } from "../config";
import { card } from "../lib/motion";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const ITEMS: { icon: LucideIcon; title: string; text: string; level: number }[] = [
  {
    icon: FileWarning,
    title: "Notificação de Autuação",
    text: "Primeira etapa do processo: abre o prazo para a Defesa Prévia e para a indicação do condutor.",
    level: 3,
  },
  {
    icon: Scale,
    title: "Notificação de Penalidade",
    text: "A multa foi aplicada, mas ainda cabe recurso à JARI e, depois, ao CETRAN.",
    level: 3,
  },
  {
    icon: ShieldAlert,
    title: "Processo de Suspensão instaurado",
    text: "Limite de pontos atingido ou infração autossuspensiva: a defesa no processo preserva seu direito de dirigir.",
    level: 5,
  },
  {
    icon: Siren,
    title: "Autuação na Lei Seca",
    text: "Bafômetro ou recusa ao teste (Art. 165 e 165-A): multa elevada e suspensão — exige defesa técnica.",
    level: 5,
  },
  {
    icon: Gauge,
    title: "Multa grave na Provisória",
    text: "Uma única infração grave ou gravíssima durante a permissão pode impedir a emissão da CNH definitiva.",
    level: 4,
  },
  {
    icon: Car,
    title: "Restrição ou Busca e Apreensão",
    text: "Veículo com bloqueio RENAJUD ou ordem de apreensão: agir rápido protege o seu patrimônio.",
    level: 5,
  },
];

/** Dashboard warning lamp: blinks amber, turns to "green light" on hover. */
const lamp: Variants = {
  hidden: { scale: 0, rotate: -90, opacity: 0 },
  show: {
    scale: [null, 1.2, 1],
    rotate: 0,
    opacity: 1,
    color: "#FBBF24",
    backgroundColor: "rgba(245,158,11,0.12)",
    borderColor: "rgba(245,158,11,0.35)",
    boxShadow: "0 0 24px -6px rgba(245,158,11,0.7)",
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  },
  hover: {
    scale: 1.25,
    rotate: 8,
    color: "#34D399",
    backgroundColor: "rgba(16,185,129,0.15)",
    borderColor: "rgba(16,185,129,0.5)",
    boxShadow: "0 0 30px -2px rgba(16,185,129,0.85)",
    transition: { type: "spring", stiffness: 300, damping: 14 },
  },
};

const signal: Variants = {
  show: { opacity: 0.85 },
  hover: { opacity: 1 },
};

export function Urgencies() {
  return (
    <section id="urgencias" className="relative bg-midnight/60 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Situações de Urgência"
          icon={TriangleAlert}
          tone="amber"
          title="Do ^alerta^ ao *sinal* *verde:* aja antes do prazo"
          text="Algumas notificações têm prazo curto para defesa. Se você se identificou com uma delas, envie a notificação agora mesmo para análise."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <TiltCard
              key={it.title}
              variants={card((i % 3) * 0.1)}
              initial="hidden"
              whileInView="show"
              whileHover="hover"
              viewport={{ once: false, amount: 0.25 }}
              glow="amber"
              intensity={6}
            >
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <motion.div variants={lamp} className="relative grid h-12 w-12 place-items-center rounded-full border">
                    <motion.span
                      className="inline-flex"
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
                    >
                      <it.icon size={22} strokeWidth={1.9} />
                    </motion.span>
                  </motion.div>
                  <Meter level={it.level} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{it.text}</p>
                <motion.p
                  variants={signal}
                  className="mt-auto pt-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-amber-300/90"
                >
                  ▸ Prazo legal em curso
                </motion.p>
              </div>
            </TiltCard>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-400/[0.08] via-white/[0.02] to-emerald-400/[0.08] p-6 text-center sm:p-8 md:flex-row md:text-left">
            <div>
              <p className="font-display text-xl font-bold text-white">Recebeu uma dessas notificações?</p>
              <p className="mt-1 text-sm text-white/60">
                Tire uma foto e envie pelo WhatsApp. A análise inicial é rápida e sem compromisso.
              </p>
            </div>
            <CTAButton
              href={waLink("Olá! Recebi uma notificação de trânsito e quero enviar para análise.")}
              external
              icon="whatsapp"
              size="md"
            >
              Enviar minha notificação
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Meter({ level }: { level: number }) {
  return (
    <div className="flex flex-col items-end gap-1.5" aria-label={`Urgência ${level} de 5`}>
      <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/40">Urgência</span>
      <div className="flex items-end gap-[3px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            className="block w-1.5 origin-bottom"
            style={{ height: 6 + i * 3 }}
            variants={{
              hidden: { scaleY: 0 },
              show: { scaleY: 1, transition: { delay: 0.3 + i * 0.08 } },
            }}
          >
            <motion.span
              className={`block h-full w-full rounded-sm ${
                i < level ? (level >= 5 ? "bg-amber-400" : "bg-amber-300/80") : "bg-white/10"
              }`}
              animate={i < level ? { opacity: [1, 0.55, 1] } : undefined}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.12 }}
            />
          </motion.span>
        ))}
      </div>
    </div>
  );
}
