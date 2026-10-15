import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { BellRing, FileCheck2, FolderUp, Route, ScanSearch, type LucideIcon } from "lucide-react";
import { card, viewport } from "../lib/motion";
import { AnimatedIcon, type IconKind } from "./AnimatedIcon";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const STEPS: { icon: LucideIcon; kind: IconKind; title: string; text: string }[] = [
  {
    icon: ScanSearch,
    kind: "float",
    title: "Diagnóstico Imediato",
    text: "Você envia sua notificação ou relata seu caso pelo WhatsApp.",
  },
  {
    icon: FolderUp,
    kind: "lock",
    title: "Coleta Zero Esforço",
    text: "Recebemos seus documentos digitalmente (ou buscamos em sua casa/trabalho).",
  },
  {
    icon: FileCheck2,
    kind: "shield",
    title: "Defesa Estratégica Personalizada",
    text: "Nossa equipe elabora e protocola todas as defesas cabíveis junto ao órgão autuador dentro do prazo legal.",
  },
  {
    icon: BellRing,
    kind: "alert",
    title: "Acompanhamento até a Resolução",
    text: "Você continua informado a cada movimentação enquanto buscamos o melhor caminho para manter ou recuperar seu direito de dirigir.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 22, restDelta: 0.001 });
  const headTop = useTransform(fill, (v) => `${v * 100}%`);

  return (
    <section id="como-funciona" className="relative bg-midnight/50 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Como Funciona"
          icon={Route}
          title="Como funciona a nossa *assessoria*"
          text="Quatro etapas simples. Você manda a notificação — o resto é com a gente."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-5xl">
          {/* Track + scroll-linked emerald fill */}
          <div className="absolute bottom-0 left-6 top-0 w-[2px] -translate-x-1/2 rounded-full bg-white/[0.07] md:left-1/2" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-6 top-0 w-[2px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.9)] md:left-1/2"
          />
          <motion.div style={{ top: headTop }} className="absolute left-6 z-10 md:left-1/2">
            <span className="block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_24px_6px_rgba(16,185,129,0.8)]" />
          </motion.div>

          <ol className="relative space-y-10 md:space-y-16">
            {STEPS.map((s, i) => (
              <Step key={s.title} step={s} index={i} progress={fill} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const t = (index + 0.5) / STEPS.length;
  const lit = useTransform(progress, [t - 0.12, t - 0.02], [0, 1]);
  const ringScale = useTransform(lit, [0, 1], [0.6, 1]);
  const numColor = useTransform(lit, [0, 1], ["rgba(255,255,255,0.45)", "rgba(209,250,229,1)"]);
  const right = index % 2 === 1;

  return (
    <li className="relative grid items-center pl-16 md:grid-cols-2 md:pl-0">
      <div className="absolute left-6 top-8 z-20 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
        <div className="relative grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-obsidian">
          <motion.span
            style={{ opacity: lit, scale: ringScale }}
            className="absolute inset-0 rounded-full border-2 border-emerald-400 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.85)]"
          />
          <motion.span style={{ color: numColor }} className="relative font-mono text-sm font-bold">
            0{index + 1}
          </motion.span>
        </div>
      </div>

      <div className={right ? "md:col-start-2 md:pl-14" : "md:col-start-1 md:pr-14"}>
        <TiltCard
          variants={card(0.05)}
          initial="hidden"
          whileInView="show"
          whileHover="hover"
          viewport={viewport}
        >
          <div className={`flex gap-5 p-6 sm:p-7 ${right ? "" : "md:flex-row-reverse md:text-right"}`}>
            <AnimatedIcon icon={step.icon} kind={step.kind} tone={step.kind === "alert" ? "amber" : "emerald"} />
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-emerald-300/80">
                Etapa 0{index + 1}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-bold text-white sm:text-xl">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{step.text}</p>
            </div>
          </div>
        </TiltCard>
      </div>
    </li>
  );
}
