import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { waLink } from "../config";
import { PHOTOS } from "../data/photos";
import { Button } from "./ui/Button";
import { Photo } from "./ui/Photo";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

const FAQS = [
  {
    q: "Qual é a diferença entre CNH suspensa e CNH cassada?",
    a: "A suspensão interrompe temporariamente o direito de dirigir — normalmente por atingir o limite de pontos ou por uma infração que, sozinha, já prevê suspensão (como a Lei Seca). Cumprido o prazo e o curso de reciclagem, a CNH volta a valer. A cassação é mais grave: anula a habilitação, geralmente por dirigir com a CNH suspensa ou por reincidência em infrações específicas, e exige aguardar o prazo legal para refazer o processo. Nos dois casos existe defesa administrativa estratégica — e quanto antes ela começa, mais caminhos você tem.",
  },
  {
    q: "Quem teve a CNH suspensa pode continuar dirigindo durante o recurso?",
    a: "Sim. Enquanto o processo estiver em fase de recurso administrativo, a penalidade fica em efeito suspensivo e o motorista pode dirigir normalmente até a decisão final. Por isso é fundamental protocolar a defesa dentro do prazo indicado na notificação.",
  },
  {
    q: "Fui pego no bafômetro ou recusei o teste. Vou perder minha CNH automaticamente?",
    a: "Não. Seja pelo resultado do etilômetro (Art. 165) ou pela recusa ao teste (Art. 165-A), todo motorista tem direito à ampla defesa e ao contraditório em três instâncias administrativas — Defesa Prévia, JARI e CETRAN — antes de qualquer bloqueio definitivo.",
  },
  {
    q: "Para quem é destinado o serviço da Help Soluções em CNH?",
    a: "Para motoristas de São Paulo e da Grande São Paulo que precisem de auxílio rápido, defesa técnica e desburocratização em problemas com CNH, multas ou restrições veiculares — inclusive quem trabalha dirigindo e não pode correr o risco de parar.",
  },
  {
    q: "Quais documentos são necessários para iniciar minha defesa?",
    a: "Cópia da CNH, a notificação da autuação ou da penalidade, o documento do veículo (CRLV), um comprovante de residência e uma procuração simples — que a nossa equipe prepara e envia para você. Tudo pode ser enviado por foto no WhatsApp.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" className="bg-slate-50 py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle
            kicker="Dúvidas frequentes"
            title="Respostas diretas, sem juridiquês."
            text="Separamos as perguntas que mais recebemos dos motoristas. Se a sua não estiver aqui, fale com a gente."
          />
          <Reveal delay={0.15} className="mt-10 overflow-hidden rounded-2xl bg-navy-900">
            <div className="grid sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-1 xl:grid-cols-[0.9fr_1.1fr]">
              <Photo
                id={PHOTOS.consultantDesk}
                alt="Consultora da equipe pronta para atender"
                ratio={0.75}
                widths={[480, 720]}
                sizes="(min-width: 1280px) 260px, (min-width: 1024px) 480px, 50vw"
                className="h-full max-h-60 w-full object-cover object-top sm:max-h-none lg:max-h-56 xl:max-h-none"
              />
              <div className="p-6 sm:p-7">
                <p className="font-display text-lg font-bold text-white">Ainda com dúvida?</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Um especialista responde pelo WhatsApp e explica as opções para o seu caso.
                </p>
                <Button
                  href={waLink("Olá! Tenho uma dúvida sobre a minha CNH.")}
                  external
                  icon="whatsapp"
                  size="md"
                  className="mt-5"
                >
                  Tirar minha dúvida
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                variants={fadeUp}
                className={`rounded-xl border bg-white transition-shadow duration-300 ${
                  isOpen ? "border-brand-500/60 shadow-card" : "border-slate-200"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-5 px-6 py-5 text-left"
                  >
                    <span className="flex-1 text-base font-bold text-navy-900 sm:text-[17px]">{f.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-brand-500 text-navy-900" : "bg-slate-100 text-navy-900"
                      }`}
                    >
                      <Plus size={17} weight="bold" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
