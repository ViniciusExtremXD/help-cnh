import { motion } from "framer-motion";
import { BellRinging, ChatsCircle, Star, Truck, type Icon } from "@phosphor-icons/react";
import { waLink } from "../config";
import { PHOTOS } from "../data/photos";
import { Button } from "./ui/Button";
import { CountUp } from "./ui/CountUp";
import { IconBadge, type IconMotion } from "./ui/IconBadge";
import { Photo } from "./ui/Photo";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

const PILLARS: { icon: Icon; motion: IconMotion; title: string; text: string }[] = [
  {
    icon: Truck,
    motion: "drive",
    title: "Zero burocracia e logística facilitada",
    text: "Esqueça filas e dores de cabeça no DETRAN. Cuidamos de todo o processo administrativo e, se necessário, retiramos a documentação na sua casa ou trabalho.",
  },
  {
    icon: ChatsCircle,
    motion: "pop",
    title: "Falamos a sua língua, sem juridiquês",
    text: "Explicamos cada etapa da sua defesa de forma direta, humana e sem jargões complicados.",
  },
  {
    icon: BellRinging,
    motion: "swing",
    title: "Transparência em tempo real",
    text: "Você nunca fica no escuro: todos os andamentos do seu processo são notificados no seu WhatsApp ou e-mail.",
  },
];

// TODO: confirmar os números com o cliente antes de publicar a versão final.
const STATS = [
  { prefix: "+", to: 3000, suffix: "", label: "Carteiras e casos atendidos" },
  { prefix: "", to: 100, suffix: "%", label: "Atendimento personalizado, digital ou presencial" },
  { prefix: "", to: 4.9, decimals: 1, suffix: "/5", label: "Índice de satisfação no atendimento" },
  { prefix: "", to: 3, suffix: "", label: "Instâncias de defesa: Defesa Prévia, JARI e CETRAN" },
];

export function About() {
  return (
    <section id="diferenciais" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative pb-10 sm:pb-12 lg:pb-0">
            <div className="overflow-hidden rounded-2xl bg-slate-200">
              <Photo
                id={PHOTOS.consultantSmile}
                alt="Consultora da equipe em escritório em São Paulo"
                ratio={0.8}
                widths={[640, 960, 1280]}
                sizes="(min-width: 1024px) 600px, 100vw"
                className="aspect-[5/4] w-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-2 right-4 hidden w-[42%] overflow-hidden rounded-xl border-[6px] border-white bg-slate-200 shadow-lift sm:block lg:-bottom-10 lg:-right-6">
              <Photo
                id={PHOTOS.highwaySigns}
                alt="Rodovia brasileira com placas de sinalização"
                ratio={1}
                widths={[320, 480, 640]}
                sizes="260px"
                className="aspect-square w-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute left-4 top-4 rounded-xl bg-white px-5 py-4 shadow-lift sm:left-6 sm:top-6"
            >
              <p className="font-display text-3xl font-extrabold text-navy-900">
                +<CountUp to={3000} />
              </p>
              <p className="text-sm font-medium text-slate-500">motoristas atendidos</p>
              <div className="mt-2 flex gap-0.5 text-signal-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} weight="fill" />
                ))}
              </div>
            </motion.div>
          </Reveal>

          <div>
            <SectionTitle
              kicker="Por que a Help Soluções em CNH"
              title="Defesa técnica, linguagem simples e zero burocracia."
              text="Unimos conhecimento da legislação de trânsito com um atendimento próximo, para que você entenda cada passo e continue focado no que importa."
            />
            <RevealGroup className="mt-10 space-y-3">
              {PILLARS.map((p) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  className="group -mx-4 flex gap-5 rounded-2xl p-4 transition-all duration-300 hover:bg-slate-50 hover:shadow-card"
                >
                  <IconBadge icon={p.icon} motion={p.motion} />
                  <div>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </RevealGroup>
            <Reveal delay={0.2} className="mt-8">
              <Button href={waLink("Olá! Gostaria de falar com a equipe da Help.")} external variant="dark" icon="whatsapp">
                Falar com a equipe
              </Button>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="bg-white p-7 sm:p-8">
              <p className="font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-[2.6rem]">
                <span className="text-brand-600">{s.prefix}</span>
                <CountUp to={s.to} decimals={s.decimals ?? 0} />
                <span className="text-brand-600">{s.suffix}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
