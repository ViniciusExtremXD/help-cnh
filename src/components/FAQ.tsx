import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleHelp, Plus } from "lucide-react";
import { waLink } from "../config";
import { riseWithDelay, viewport } from "../lib/motion";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "Qual é a diferença entre CNH suspensa e CNH cassada?",
    a: "A suspensão interrompe temporariamente o direito de dirigir — normalmente por atingir o limite de pontos ou por uma infração que, sozinha, já prevê suspensão (como a Lei Seca). Cumprido o prazo e o curso de reciclagem, a CNH volta a valer. A cassação é mais grave: anula a habilitação, geralmente por dirigir com a CNH suspensa ou por reincidência em infrações específicas, e exige aguardar o prazo legal para refazer o processo. Nos dois casos existe defesa administrativa estratégica — e quanto antes ela começa, mais caminhos você tem.",
  },
  {
    q: "Quem teve a CNH suspensa pode continuar dirigindo durante o recurso?",
    a: "Sim! Enquanto o processo estiver em fase de recurso administrativo, a penalidade fica em efeito suspensivo e o motorista pode dirigir normalmente até a decisão final. Por isso é fundamental protocolar a defesa dentro do prazo indicado na notificação.",
  },
  {
    q: "Fui pego no bafômetro ou recusei o teste. Vou perder minha CNH automaticamente?",
    a: "Não. Seja pelo resultado do etilômetro (Art. 165) ou pela recusa ao teste (Art. 165-A), todo motorista tem direito à ampla defesa e ao contraditório em três instâncias administrativas — Defesa Prévia, JARI e CETRAN — antes de qualquer bloqueio definitivo. Analisamos cada detalhe do procedimento para construir a sua defesa.",
  },
  {
    q: "Para quem é destinado o serviço da Help Soluções e CNH?",
    a: "Para qualquer motorista, em todo o território nacional, que precise de auxílio rápido, defesa técnica e desburocratização em problemas com CNH, multas ou restrições veiculares — inclusive quem trabalha dirigindo e não pode correr o risco de parar.",
  },
  {
    q: "Quais documentos são necessários para iniciar minha defesa?",
    a: "Cópia da CNH, a notificação da autuação ou da penalidade, o documento do veículo (CRLV), um comprovante de residência e uma procuração simples — que a nossa equipe prepara e envia para você. Tudo pode ser enviado por foto no WhatsApp.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Dúvidas Frequentes"
            icon={CircleHelp}
            title="Perguntas reais de *motoristas* reais"
            text="Respostas diretas, sem juridiquês. Se a sua dúvida não estiver aqui, chame a gente."
          />
          <Reveal delay={0.4} className="mt-8">
            <CTAButton
              href={waLink("Olá! Tenho uma dúvida sobre a minha CNH.")}
              external
              icon="whatsapp"
              variant="glass"
              size="md"
            >
              Tirar minha dúvida no WhatsApp
            </CTAButton>
          </Reveal>
        </div>

        <ul className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                variants={riseWithDelay(i * 0.08)}
                initial="hidden"
                whileInView="show"
                whileHover="hover"
                viewport={viewport}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-emerald-400/30 bg-emerald-400/[0.05] shadow-[0_0_40px_-16px_rgba(16,185,129,0.7)]"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-white/15"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="font-mono text-xs text-emerald-400/80">0{i + 1}</span>
                    <span className="flex-1 font-display text-base font-semibold text-white sm:text-[17px]">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                        isOpen
                          ? "border-emerald-400/50 bg-emerald-400 text-obsidian"
                          : "border-white/15 text-white/70"
                      }`}
                    >
                      <Plus size={16} strokeWidth={2.4} />
                    </motion.span>
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
                      transition={{ type: "spring", stiffness: 180, damping: 24 }}
                    >
                      <motion.p
                        initial={{ y: -8, filter: "blur(4px)" }}
                        animate={{ y: 0, filter: "blur(0px)" }}
                        className="px-5 pb-6 pl-[3.25rem] text-[15px] leading-relaxed text-white/65 sm:px-6 sm:pl-[3.6rem]"
                      >
                        {f.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
