import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { BellRinging, ChatCircleDots, FileArrowUp, SealCheck, type Icon } from "@phosphor-icons/react";
import { waLink } from "../config";
import { Button } from "./ui/Button";
import { IconBadge, type IconMotion } from "./ui/IconBadge";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

const STEPS: { icon: Icon; motion: IconMotion; title: string; text: string }[] = [
  {
    icon: ChatCircleDots,
    motion: "pop",
    title: "Diagnóstico imediato",
    text: "Você envia sua notificação ou relata seu caso pelo WhatsApp.",
  },
  {
    icon: FileArrowUp,
    motion: "lift",
    title: "Coleta zero esforço",
    text: "Recebemos seus documentos digitalmente — ou buscamos em sua casa ou trabalho.",
  },
  {
    icon: SealCheck,
    motion: "spin",
    title: "Defesa estratégica personalizada",
    text: "Elaboramos e protocolamos todas as defesas cabíveis junto ao órgão autuador, dentro do prazo legal.",
  },
  {
    icon: BellRinging,
    motion: "swing",
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
          <div className="absolute left-[33px] top-0 h-full w-[2px] bg-slate-200 lg:left-0 lg:top-[33px] lg:h-[2px] lg:w-full" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-[33px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-signal-500 to-brand-500 lg:hidden"
          />
          <motion.div
            style={{ scaleX: fill }}
            className="absolute left-0 top-[33px] hidden h-[2px] w-full origin-left bg-gradient-to-r from-signal-500 to-brand-500 lg:block"
          />

          <RevealGroup className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} className="group relative flex gap-6 lg:block">
                <span className="relative z-10 block w-fit rounded-full bg-white p-1.5">
                  <IconBadge icon={s.icon} motion={s.motion} />
                </span>
                <div className="lg:mt-6">
                  <p className="text-sm font-semibold text-slate-400">Etapa {i + 1}</p>
                  <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
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
