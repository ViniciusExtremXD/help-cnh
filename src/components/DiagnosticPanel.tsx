import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, CircleCheck, Gauge, Lock, ShieldAlert, Siren, UserRound, type LucideIcon } from "lucide-react";
import { waLink } from "../config";
import { rise, stagger, viewport } from "../lib/motion";
import { AnimatedIcon, type IconKind } from "./AnimatedIcon";
import { CTAButton } from "./CTAButton";
import { TiltCard } from "./TiltCard";

type Scenario = {
  id: string;
  label: string;
  icon: LucideIcon;
  kind: IconKind;
  occurrence: string;
  points: number;
  status: string;
  title: string;
  text: string;
  message: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "suspensao",
    label: "Recebi notificação de Suspensão",
    icon: ShieldAlert,
    kind: "shield",
    occurrence: "PROCESSO DE SUSPENSÃO",
    points: 40,
    status: "DEFESA APLICÁVEL",
    title: "Você pode continuar dirigindo durante o recurso",
    text: "A penalidade só é aplicada depois de esgotadas as instâncias administrativas. Protocolamos sua defesa no prazo e você segue no volante enquanto o processo tramita.",
    message: "Olá! Recebi uma notificação de suspensão da CNH e quero uma análise do meu caso.",
  },
  {
    id: "lei-seca",
    label: "Fui parado na Lei Seca",
    icon: Siren,
    kind: "alert",
    occurrence: "ART. 165 / 165-A CTB",
    points: 7,
    status: "DEFESA TÉCNICA",
    title: "A perda da CNH não é automática",
    text: "Autuações por bafômetro ou recusa ao teste admitem defesa em três instâncias. Analisamos abordagem, etilômetro e o auto de infração em busca de falhas.",
    message: "Olá! Fui autuado(a) na Lei Seca (bafômetro/recusa) e quero uma análise do meu caso.",
  },
  {
    id: "ppd",
    label: "Pontuação na Provisória",
    icon: Gauge,
    kind: "speed",
    occurrence: "INFRAÇÃO NA PPD",
    points: 5,
    status: "RECURSO NO PRAZO",
    title: "Ainda dá para proteger a sua definitiva",
    text: "Recorrendo dentro do prazo, a multa grave, gravíssima ou média reincidente é contestada antes de impedir a emissão da sua CNH definitiva.",
    message: "Olá! Levei multa na CNH provisória (PPD) e quero proteger minha definitiva.",
  },
  {
    id: "restricao",
    label: "Restrição no Veículo",
    icon: Lock,
    kind: "lock",
    occurrence: "RESTRIÇÃO RENAJUD",
    points: 0,
    status: "REGULARIZAÇÃO",
    title: "Identificamos a origem e destravamos o documento",
    text: "Verificamos se a restrição é judicial (RENAJUD) ou administrativa e conduzimos a regularização para liberar licenciamento e transferência.",
    message: "Olá! Meu veículo está com restrição (RENAJUD/administrativa) e preciso regularizar.",
  },
];

type Phase = "idle" | "scan" | "done";

export function DiagnosticPanel() {
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = (s: Scenario) => {
    setSelected(s);
    setPhase("scan");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPhase("done"), 950);
  };

  return (
    <TiltCard intensity={6} className="w-full" innerClassName="bg-midnight/70 p-5 sm:p-6">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
        <motion.div variants={rise} className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-300">
            <motion.span
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="inline-flex"
            >
              <Activity size={14} />
            </motion.span>
            Diagnóstico Rápido
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] tracking-widest text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            ONLINE
          </span>
        </motion.div>

        <motion.div variants={rise}>
          <CnhMock scenario={selected} phase={phase} />
        </motion.div>

        <motion.h2 variants={rise} className="mt-5 font-display text-lg font-bold text-white">
          Qual é a sua urgência hoje?
        </motion.h2>

        <motion.div variants={stagger} className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SCENARIOS.map((s) => {
            const on = selected?.id === s.id;
            return (
              <motion.button
                key={s.id}
                type="button"
                variants={{ ...rise, hover: { y: -2 } }}
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                onClick={() => choose(s)}
                aria-pressed={on}
                className={`flex items-center gap-3 rounded-2xl border p-2.5 text-left text-[13px] font-semibold leading-snug transition-colors ${
                  on
                    ? "border-emerald-400/50 bg-emerald-400/[0.12] text-white shadow-[0_0_24px_-8px_rgba(16,185,129,0.8)]"
                    : "border-white/[0.08] bg-white/[0.03] text-white/75 hover:border-white/20 hover:text-white"
                }`}
              >
                <AnimatedIcon icon={s.icon} kind={s.kind} size="sm" tone={s.kind === "alert" ? "amber" : "emerald"} />
                {s.label}
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mt-4 min-h-[196px]" aria-live="polite">
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.p
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl border border-dashed border-white/10 p-4 text-sm leading-relaxed text-white/55"
              >
                Toque na sua situação e veja na hora qual defesa se aplica ao seu caso — sem compromisso.
              </motion.p>
            )}
            {phase === "scan" && (
              <motion.div
                key="scan"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">Analisando seu caso…</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}
            {phase === "done" && selected && (
              <motion.div
                key={`done-${selected.id}`}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-4"
              >
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: [0, 1.3, 1], rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex"
                  >
                    <CircleCheck size={15} />
                  </motion.span>
                  Defesa aplicável
                </p>
                <p className="mt-2 font-display text-base font-bold text-white">{selected.title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{selected.text}</p>
                <CTAButton
                  href={waLink(selected.message)}
                  external
                  icon="whatsapp"
                  size="md"
                  className="mt-4"
                >
                  Analisar meu caso agora
                </CTAButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </TiltCard>
  );
}

function CnhMock({ scenario, phase }: { scenario: Scenario | null; phase: Phase }) {
  const points = scenario?.points ?? 0;
  const segments = 20;
  const filled = Math.round((points / 40) * segments);
  const high = points >= 20;
  const status =
    phase === "idle" ? "AGUARDANDO SELEÇÃO" : phase === "scan" ? "ANALISANDO…" : scenario!.status;
  const statusTone = phase === "done" ? "text-emerald-300" : phase === "scan" ? "text-amber-300" : "text-white/45";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#10202f] via-[#0b1424] to-[#0f2a22] p-4">
      {/* Holographic sheen */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(110,231,183,0.08)_45%,rgba(245,158,11,0.06)_55%,transparent_70%)]"
        animate={{ x: ["-60%", "60%", "-60%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="font-mono text-[9.5px] tracking-[0.24em] text-emerald-300/80">PAINEL DO CONDUTOR</p>
          <p className="font-display text-[13px] font-bold text-white">CNH Digital · Análise de Defesa</p>
        </div>
        <div className="relative h-7 w-9 overflow-hidden rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner">
          <span className="absolute inset-x-0 top-1/3 h-px bg-amber-800/40" />
          <span className="absolute inset-x-0 top-2/3 h-px bg-amber-800/40" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-amber-800/40" />
        </div>
      </div>

      <div className="relative mt-3 flex gap-3">
        <div className="grid h-[68px] w-14 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/40">
          <motion.span
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <UserRound size={28} strokeWidth={1.5} />
          </motion.span>
        </div>
        <dl className="grid flex-1 grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[10px] leading-tight">
          <div>
            <dt className="text-white/35">NOME</dt>
            <dd className="text-white/85">CONDUTOR(A)</dd>
          </div>
          <div>
            <dt className="text-white/35">CATEGORIA</dt>
            <dd className="text-white/85">AB</dd>
          </div>
          <div>
            <dt className="text-white/35">REGISTRO</dt>
            <dd className="text-white/85">•••••• 4821</dd>
          </div>
          <div>
            <dt className="text-white/35">OCORRÊNCIA</dt>
            <AnimatePresence mode="wait">
              <motion.dd
                key={scenario?.id ?? "none"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={scenario ? "text-amber-300" : "text-white/40"}
              >
                {scenario?.occurrence ?? "—"}
              </motion.dd>
            </AnimatePresence>
          </div>
        </dl>
      </div>

      <div className="relative mt-3">
        <div className="mb-1.5 flex justify-between font-mono text-[9.5px] tracking-widest text-white/45">
          <span>PONTUAÇÃO NO PRONTUÁRIO</span>
          <span className={high ? "text-amber-300" : "text-emerald-300"}>{points} / 40 PTS</span>
        </div>
        <div className="flex gap-[3px]">
          {Array.from({ length: segments }).map((_, i) => (
            <motion.span
              key={i}
              className="h-2 flex-1 rounded-[2px]"
              animate={{
                backgroundColor:
                  i < filled ? (high ? "#F59E0B" : "#10B981") : "rgba(255,255,255,0.08)",
                boxShadow: i < filled ? `0 0 8px ${high ? "rgba(245,158,11,.6)" : "rgba(16,185,129,.6)"}` : "0 0 0 transparent",
              }}
              transition={{ delay: i * 0.025, duration: 0.25 }}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-2.5 font-mono text-[10.5px] tracking-widest">
        <span className="text-white/40">STATUS ▸</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: phase === "idle" ? [0.4, 1, 0.4] : 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={phase === "idle" ? { opacity: { duration: 1.6, repeat: Infinity } } : undefined}
            className={`font-semibold ${statusTone}`}
          >
            {status}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Laser scanner */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-10 h-14 -translate-y-1/2 bg-gradient-to-b from-transparent via-emerald-400/[0.12] to-transparent"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: phase === "scan" ? 1.1 : 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-x-0 top-1/2 h-[2px] bg-emerald-400 shadow-[0_0_20px_#10b981]" />
      </motion.div>
    </div>
  );
}
