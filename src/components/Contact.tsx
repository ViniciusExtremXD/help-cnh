import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown, Check, Clock, PaperPlaneTilt } from "@phosphor-icons/react";
import { COVERAGE, waLink } from "../config";
import { PHOTOS } from "../data/photos";
import { Button } from "./ui/Button";
import { Photo } from "./ui/Photo";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";

const PROBLEMS = [
  "CNH Suspensa",
  "CNH Cassada",
  "Lei Seca e Bafômetro",
  "Multa na Provisória",
  "RENAJUD ou Busca e Apreensão",
  "Outras Multas",
];

const PERKS = ["Análise inicial sem compromisso", "Resposta rápida pelo WhatsApp", `Atendimento em ${COVERAGE}`];

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const field =
  "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-[15px] text-navy-900 placeholder:text-slate-400 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15";

export function Contact() {
  return (
    <section id="contato" className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-28">
      <Photo
        id={PHOTOS.spDusk}
        alt=""
        widths={[960, 1440, 1920]}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/70" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <RevealGroup>
          <motion.p variants={fadeUp} className="kicker-dark">
            <Clock size={16} weight="bold" />
            Prazo correndo
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.75rem]"
          >
            Não espere o prazo da sua notificação vencer.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg text-slate-300">
            Cada dia conta para manter sua <strong className="font-semibold text-white">CNH ativa</strong>. Envie seus
            dados e um especialista entra em contato para analisar o seu caso.
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-8 space-y-3.5">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-slate-200">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-500 text-navy-900">
                  <Check size={14} weight="bold" />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>
        </RevealGroup>

        <Reveal delay={0.1}>
          <LeadForm />
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
    <div className="rounded-2xl bg-white p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[380px] flex-col items-center justify-center text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-500 text-navy-900">
              <Check size={30} weight="bold" />
            </span>
            <p className="mt-6 font-display text-2xl font-bold text-navy-900">Tudo certo, {name.split(" ")[0]}!</p>
            <p className="mt-2 max-w-xs text-slate-600">
              Abrimos o WhatsApp com a sua mensagem pronta. É só enviar para um especialista analisar o seu caso.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
            >
              Enviar outro caso
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="space-y-5">
            <div>
              <p className="font-display text-xl font-bold text-navy-900">Análise rápida do seu caso</p>
              <p className="mt-1 text-sm text-slate-500">Leva menos de um minuto.</p>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-navy-900">Nome</span>
              <input
                className={field}
                name="nome"
                autoComplete="name"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-navy-900">WhatsApp</span>
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
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-navy-900">Tipo de problema</span>
              <span className="relative block">
                <select
                  className={`${field} appearance-none pr-11 ${problem ? "" : "text-slate-400"}`}
                  name="problema"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione sua situação
                  </option>
                  {PROBLEMS.map((p) => (
                    <option key={p} value={p} className="text-navy-900">
                      {p}
                    </option>
                  ))}
                </select>
                <CaretDown
                  size={18}
                  weight="bold"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-lg bg-signal-50 px-4 py-2.5 text-sm font-medium text-signal-700">
                {error}
              </p>
            )}

            <Button type="submit" icon={PaperPlaneTilt} className="w-full">
              Analisar meu caso no WhatsApp
            </Button>
            <p className="text-center text-xs text-slate-400">
              Seus dados são usados apenas para o atendimento do seu caso.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
