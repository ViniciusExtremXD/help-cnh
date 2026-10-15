import { motion } from "framer-motion";
import { ArrowUpRight, Gauge, Lock, ShieldAlert, Siren, type LucideIcon } from "lucide-react";
import { waLink } from "../config";
import { RevealGroup, fadeUp } from "./ui/Reveal";

const OPTIONS: { icon: LucideIcon; title: string; text: string; message: string; tone: "brand" | "signal" }[] = [
  {
    icon: ShieldAlert,
    title: "Recebi notificação de suspensão",
    text: "Você pode continuar dirigindo durante o recurso.",
    message: "Olá! Recebi uma notificação de suspensão da CNH e quero uma análise do meu caso.",
    tone: "signal",
  },
  {
    icon: Siren,
    title: "Fui autuado na Lei Seca",
    text: "A perda da CNH não é automática: cabe defesa.",
    message: "Olá! Fui autuado(a) na Lei Seca e quero uma análise do meu caso.",
    tone: "signal",
  },
  {
    icon: Gauge,
    title: "Levei multa na provisória",
    text: "Recorrendo no prazo, você protege a definitiva.",
    message: "Olá! Levei multa na CNH provisória e quero proteger minha definitiva.",
    tone: "brand",
  },
  {
    icon: Lock,
    title: "Meu veículo tem restrição",
    text: "Regularizamos RENAJUD e busca e apreensão.",
    message: "Olá! Meu veículo está com restrição e preciso regularizar.",
    tone: "brand",
  },
];

export function QuickTriage() {
  return (
    <section aria-labelledby="triagem-titulo" className="relative border-b border-slate-200 bg-white py-14 sm:py-16">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.75fr_2fr] lg:gap-14">
        <RevealGroup>
          <motion.p variants={fadeUp} className="kicker">
            <span className="h-px w-6 bg-brand-600" />
            Atendimento imediato
          </motion.p>
          <motion.h2
            id="triagem-titulo"
            variants={fadeUp}
            className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl"
          >
            Qual é a sua situação hoje?
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[15px] leading-relaxed text-slate-500">
            Escolha a opção mais próxima do seu caso e fale direto com um especialista, sem compromisso.
          </motion.p>
        </RevealGroup>

        <RevealGroup className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {OPTIONS.map((o) => (
            <motion.a
              key={o.title}
              variants={fadeUp}
              href={waLink(o.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:shadow-lift"
            >
              <div className="flex items-start justify-between">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-lg transition-colors duration-300 ${
                    o.tone === "signal"
                      ? "bg-signal-50 text-signal-500 group-hover:bg-signal-500 group-hover:text-white"
                      : "bg-brand-50 text-brand-700 group-hover:bg-brand-500 group-hover:text-navy-900"
                  }`}
                >
                  <o.icon size={21} strokeWidth={2} />
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                />
              </div>
              <h3 className="mt-4 text-[15.5px] font-bold leading-snug">{o.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{o.text}</p>
            </motion.a>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
