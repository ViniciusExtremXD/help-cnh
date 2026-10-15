import { motion } from "framer-motion";
import { ArrowUpRight, Car, Gauge, ShieldWarning, Siren, type Icon } from "@phosphor-icons/react";
import { waLink } from "../config";
import { AutoCarousel } from "./ui/AutoCarousel";
import { IconBadge, type IconMotion } from "./ui/IconBadge";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";

const OPTIONS: { icon: Icon; motion: IconMotion; title: string; text: string; message: string }[] = [
  {
    icon: ShieldWarning,
    motion: "pulse",
    title: "Recebi notificação de suspensão",
    text: "Você pode continuar dirigindo durante o recurso.",
    message: "Olá! Recebi uma notificação de suspensão da CNH e quero uma análise do meu caso.",
  },
  {
    icon: Siren,
    motion: "flash",
    title: "Fui autuado na Lei Seca",
    text: "A perda da CNH não é automática: cabe defesa.",
    message: "Olá! Fui autuado(a) na Lei Seca e quero uma análise do meu caso.",
  },
  {
    icon: Gauge,
    motion: "spin",
    title: "Levei multa na provisória",
    text: "Recorrendo no prazo, você protege a definitiva.",
    message: "Olá! Levei multa na CNH provisória e quero proteger minha definitiva.",
  },
  {
    icon: Car,
    motion: "drive",
    title: "Meu veículo tem restrição",
    text: "Regularizamos RENAJUD e busca e apreensão.",
    message: "Olá! Meu veículo está com restrição e preciso regularizar.",
  },
];

export function QuickTriage() {
  return (
    <section aria-labelledby="triagem-titulo" className="relative overflow-hidden border-b border-slate-200 bg-white py-14 sm:py-16">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.7fr_2fr] lg:gap-14">
        <RevealGroup>
          <motion.p variants={fadeUp} className="kicker">
            Atendimento imediato
          </motion.p>
          <motion.h2 id="triagem-titulo" variants={fadeUp} className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            Qual é a sua situação hoje?
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[15px] leading-relaxed text-slate-500">
            Escolha a opção mais próxima do seu caso e fale direto com um especialista, sem compromisso.
          </motion.p>
        </RevealGroup>

        <Reveal delay={0.1} className="min-w-0">
          <AutoCarousel
            label="Situações mais comuns"
            items={OPTIONS}
            getKey={(o) => o.title}
            perView={{ base: 1, sm: 2, lg: 3 }}
            gap={16}
            interval={3800}
            render={(o) => (
              <a
                href={waLink(o.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 hover:border-brand-500 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <IconBadge icon={o.icon} motion={o.motion} />
                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    className="text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                  />
                </div>
                <h3 className="mt-5 text-base font-bold leading-snug">{o.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{o.text}</p>
              </a>
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}
