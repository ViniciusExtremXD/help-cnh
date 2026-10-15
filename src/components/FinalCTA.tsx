import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Hourglass, Send } from "lucide-react";
import { waLink } from "../config";
import { rise, stagger, viewport } from "../lib/motion";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";

const PROBLEMS = [
  "CNH Suspensa",
  "CNH Cassada",
  "Lei Seca e Bafômetro",
  "Multa na Provisória",
  "RENAJUD ou Busca e Apreensão",
  "Outras Multas",
];

const PERKS = ["Análise inicial sem compromisso", "Resposta rápida pelo WhatsApp", "Atendimento em todo o Brasil"];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const field =
  "w-full rounded-xl border border-white/10 bg-obsidian/70 px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 outline-none transition focus:border-emerald-400/60 focus:bg-obsidian focus:shadow-[0_0_0_4px_rgba(16,185,129,0.15)]";

export function FinalCTA() {
  return (
    <section id="contato" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative rounded-[2rem] p-[1.5px] shadow-[0_40px_120px_-40px_rgba(16,185,129,0.45)]">
            <div aria-hidden className="beam-panorama absolute inset-0 rounded-[2rem]" />
            <div className="relative grid gap-12 overflow-hidden rounded-[calc(2rem-1.5px)] bg-gradient-to-br from-midnight via-obsidian to-[#082119] p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-[100px]"
              />
              <div className="relative">
                <Reveal className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">
                  <motion.span
                    className="inline-flex"
                    animate={{ rotate: [0, 180, 180, 360] }}
                    transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.4, 0.6, 1] }}
                  >
                    <Hourglass size={14} />
                  </motion.span>
                  Prazo correndo
                </Reveal>
                <WordReveal
                  text="Não espere o prazo da sua notificação ^vencer.^"
                  className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl"
                />
                <Reveal delay={0.4}>
                  <p className="mt-5 text-lg text-white/65">
                    Cada dia conta para manter sua <span className="font-semibold text-emerald-300">CNH ativa</span>.
                  </p>
                </Reveal>
                <motion.ul
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  className="mt-8 space-y-3"
                >
                  {PERKS.map((p, i) => (
                    <motion.li key={p} variants={rise} className="flex items-center gap-3 text-[15px] text-white/75">
                      <motion.span
                        className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        <Check size={13} strokeWidth={3} />
                      </motion.span>
                      {p}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <LeadForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Informe seu nome.");
    if (phone.replace(/\D/g, "").length < 10) return setError("Informe um WhatsApp válido com DDD.");
    if (!problem) return setError("Selecione o tipo de problema.");
    setError("");
    const msg = `Olá! Meu nome é ${name.trim()}. Meu WhatsApp é ${phone}. Preciso de ajuda com: ${problem}.`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[360px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -120 }}
              animate={{ scale: [0, 1.2, 1], rotate: 0 }}
              transition={{ duration: 0.7 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400 text-obsidian shadow-[0_0_40px_rgba(16,185,129,0.8)]"
            >
              <Check size={30} strokeWidth={3} />
            </motion.span>
            <p className="mt-6 font-display text-2xl font-bold text-white">Tudo certo, {name.split(" ")[0]}!</p>
            <p className="mt-2 max-w-xs text-white/60">
              Abrimos o WhatsApp com sua mensagem pronta. É só enviar para um especialista analisar o seu caso.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-sm font-medium text-emerald-300 underline-offset-4 hover:underline"
            >
              Enviar outro caso
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <motion.div variants={rise}>
              <p className="font-display text-xl font-bold text-white">Análise rápida do seu caso</p>
              <p className="mt-1 text-sm text-white/50">Preencha em 20 segundos e fale direto com um especialista.</p>
            </motion.div>
            <motion.label variants={rise} className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">Nome</span>
              <input
                className={field}
                name="nome"
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.label>
            <motion.label variants={rise} className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">WhatsApp</span>
              <input
                className={field}
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(maskPhone(e.target.value))}
              />
            </motion.label>
            <motion.label variants={rise} className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                Tipo de problema
              </span>
              <span className="relative block">
                <select
                  className={`${field} appearance-none pr-11 ${problem ? "" : "text-white/40"}`}
                  name="problema"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione sua situação
                  </option>
                  {PROBLEMS.map((p) => (
                    <option key={p} value={p} className="bg-midnight text-white">
                      {p}
                    </option>
                  ))}
                </select>
                <motion.span
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <ChevronDown size={18} />
                </motion.span>
              </span>
            </motion.label>

            <AnimatePresence>
              {error && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, height: 0, x: 0 }}
                  animate={{ opacity: 1, height: "auto", x: [0, -6, 6, -4, 4, 0] }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm font-medium text-amber-300"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div variants={rise} className="flex flex-col gap-3 pt-2">
              <CTAButton type="submit" icon={Send} className="w-full">
                Analisar Meu Caso no WhatsApp
              </CTAButton>
              <CTAButton
                href={waLink()}
                external
                icon="whatsapp"
                variant="glass"
                size="md"
                className="w-full"
              >
                Prefiro chamar direto no WhatsApp
              </CTAButton>
            </motion.div>
            <p className="text-center text-[11px] text-white/35">
              Seus dados são usados apenas para o atendimento do seu caso.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
