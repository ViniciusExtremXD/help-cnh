import { motion } from "framer-motion";
import { Award, BellRing, MessagesSquare, Truck, type LucideIcon } from "lucide-react";
import { card, rise, stagger, viewport } from "../lib/motion";
import { AnimatedIcon, type IconKind } from "./AnimatedIcon";
import { Odometer } from "./Odometer";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const PILLARS: { icon: LucideIcon; kind: IconKind; title: string; text: string }[] = [
  {
    icon: Truck,
    kind: "radar",
    title: "Zero Burocracia e Logística Facilitada",
    text: "Esqueça filas e dores de cabeça no DETRAN. Cuidamos de todo o processo administrativo e, se necessário, retiramos a documentação na sua casa ou trabalho.",
  },
  {
    icon: MessagesSquare,
    kind: "float",
    title: "Falamos a Sua Língua (Sem Juridiquês)",
    text: "Entendemos você. Explicamos cada etapa da sua defesa de forma direta, humana e sem jargões complicados.",
  },
  {
    icon: BellRing,
    kind: "alert",
    title: "Transparência em Tempo Real",
    text: "Você nunca fica no escuro. Todos os andamentos do seu processo de defesa são notificados diretamente no seu WhatsApp ou e-mail.",
  },
];

// TODO: confirmar os números com o cliente antes de publicar.
const STATS = [
  { value: "3.000", prefix: "+", suffix: "", label: "Carteiras e casos atendidos com sucesso", fill: 0.92 },
  { value: "100", prefix: "", suffix: "%", label: "Atendimento personalizado — digital ou presencial", fill: 1 },
  { value: "4,9", prefix: "", suffix: " ★", label: "Índice de satisfação e transparência no atendimento", fill: 0.98 },
];

export function WhyUs() {
  return (
    <section id="diferenciais" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Diferenciais"
          icon={Award}
          title="Por que a *Help* *Soluções* *e* *CNH?*"
          text="Defesa técnica de verdade com a experiência de quem entende que você não pode parar de dirigir."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <TiltCard
              key={p.title}
              variants={card(i * 0.12)}
              initial="hidden"
              whileInView="show"
              whileHover="hover"
              viewport={viewport}
            >
              <div className="flex h-full flex-col p-7">
                <AnimatedIcon icon={p.icon} kind={p.kind} tone={p.kind === "alert" ? "amber" : "emerald"} size="lg" />
                <motion.span
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 0.4, duration: 0.8 } } }}
                  className="mt-6 block h-px origin-left bg-gradient-to-r from-emerald-400/60 to-transparent"
                />
                <h3 className="mt-6 font-display text-xl font-bold leading-snug text-white">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">{p.text}</p>
              </div>
            </TiltCard>
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative mt-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-midnight/80 p-2"
        >
          <div className="flex items-center justify-between px-5 pb-1 pt-4 font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/40">
            <span>Painel de resultados</span>
            <span className="flex items-center gap-2 text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Ao vivo
            </span>
          </div>
          <div className="grid divide-y divide-white/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0">
            {STATS.map((s) => (
              <motion.div key={s.label} variants={rise} className="p-6 sm:p-8">
                <p className="font-mono text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  <span className="text-emerald-400">{s.prefix}</span>
                  <Odometer value={s.value} />
                  <span className={s.suffix.includes("★") ? "text-amber-400" : "text-emerald-400"}>{s.suffix}</span>
                </p>
                <p className="mt-3 text-sm text-white/55">{s.label}</p>
                <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400"
                    variants={{
                      hidden: { width: "0%" },
                      show: { width: `${s.fill * 100}%`, transition: { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 } },
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
