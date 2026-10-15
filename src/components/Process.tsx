import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { BellRing, FileCheck2, FolderUp, MessageSquareText, type LucideIcon } from "lucide-react";
import { waLink } from "../config";
import { Button } from "./ui/Button";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MessageSquareText,
    title: "Diagnóstico imediato",
    text: "Você envia sua notificação ou relata seu caso pelo WhatsApp.",
  },
  {
    icon: FolderUp,
    title: "Coleta zero esforço",
    text: "Recebemos seus documentos digitalmente — ou buscamos em sua casa ou trabalho.",
  },
  {
    icon: FileCheck2,
    title: "Defesa estratégica personalizada",
    text: "Elaboramos e protocolamos todas as defesas cabíveis junto ao órgão autuador, dentro do prazo legal.",
  },
  {
    icon: BellRing,
    title: "Acompanhamento até a resolução",
    text: "Você é informado a cada movimentação enquanto buscamos o melhor caminho para manter ou recuperar seu direito de dirigir.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <section id="como-funciona" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle
          align="center"
          kicker="Como funciona"
          title="Quatro etapas. Você manda a notificação, o resto é com a gente."
        />

        <div ref={ref} className="relative mt-16">
          {/* Connecting line (desktop: horizontal, mobile: vertical) */}
          <div className="absolute left-[27px] top-0 h-full w-[2px] bg-slate-200 lg:left-0 lg:top-[27px] lg:h-[2px] lg:w-full" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-[27px] top-0 h-full w-[2px] origin-top bg-brand-500 lg:hidden"
          />
          <motion.div
            style={{ scaleX: fill }}
            className="absolute left-0 top-[27px] hidden h-[2px] w-full origin-left bg-brand-500 lg:block"
          />

          <RevealGroup className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} className="group relative flex gap-6 lg:block">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-brand-500 bg-white text-brand-700 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-navy-900">
                  <s.icon size={22} />
                </span>
                <div className="lg:mt-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Etapa 0{i + 1}</p>
                  <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-16 flex justify-center">
          <Button href={waLink("Olá! Quero começar meu diagnóstico pelo WhatsApp.")} external icon="whatsapp">
            Começar meu diagnóstico
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
