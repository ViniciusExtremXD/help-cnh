import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car,
  Check,
  CircleCheck,
  CircleGauge,
  Gauge,
  Landmark,
  LayoutGrid,
  Lock,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { waLink } from "../config";
import { card, rise } from "../lib/motion";
import { AnimatedIcon, type IconKind } from "./AnimatedIcon";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

type Service = {
  title: string;
  tag: string;
  tone: "amber" | "emerald";
  copy: string;
  icon: LucideIcon;
  kind: IconKind;
  span: string;
  wide?: "md" | "lg";
  visual: ReactNode;
  message: string;
};

const SERVICES: Service[] = [
  {
    title: "CNH Suspensa ou Cassada",
    tag: "Alta Prioridade",
    tone: "amber",
    copy: "Recebeu notificação de suspensão por pontos ou processo de cassação? Atuamos de forma ágil com recursos administrativos estratégicos para reverter penalidades e manter você dirigindo legalmente enquanto o processo tramita.",
    icon: ShieldAlert,
    kind: "shield",
    span: "md:col-span-2",
    wide: "md",
    visual: <ProcessPipeline />,
    message: "Olá! Minha CNH está suspensa ou em processo de cassação. Preciso de um especialista.",
  },
  {
    title: "Assessoria Especializada na Lei Seca / Bafômetro",
    tag: "Art. 165 e 165-A do CTB",
    tone: "amber",
    copy: "Foi autuado no teste do bafômetro ou recusou o etilômetro? A perda da CNH não é automática. Analisamos falhas no procedimento e na abordagem para construir uma defesa técnica robusta e proteger sua habilitação.",
    icon: Siren,
    kind: "alert",
    span: "md:row-span-2",
    visual: <Breathalyzer />,
    message: "Olá! Fui autuado(a) na Lei Seca / bafômetro. Preciso de um especialista.",
  },
  {
    title: "Multas na CNH Provisória / PPD",
    tag: "Proteja sua Definitiva",
    tone: "emerald",
    copy: "Levou uma multa grave, gravíssima ou reincidiu em média durante a permissão? Auxiliamos a recorrer no tempo certo para impedir que você perca a provisória e tenha que refazer toda a autoescola do zero.",
    icon: ShieldCheck,
    kind: "shield",
    span: "",
    visual: <PpdProgress />,
    message: "Olá! Levei multa na CNH provisória (PPD). Preciso de um especialista.",
  },
  {
    title: "Recursos de Multas de Trânsito",
    tag: "Defesa Prévia • JARI • CETRAN",
    tone: "emerald",
    copy: "Recorremos de multas por excesso de velocidade, infrações gravíssimas e autuações indevidas. Defendemos seus direitos com eficácia para anular penalidades e preservar seu prontuário limpo.",
    icon: Gauge,
    kind: "speed",
    span: "",
    visual: <Instances />,
    message: "Olá! Quero recorrer de uma multa de trânsito. Preciso de um especialista.",
  },
  {
    title: "Restrição Veicular — Desbloqueio RENAJUD",
    tag: "Regularização Documental",
    tone: "emerald",
    copy: "Veículo bloqueado com restrição judicial ou administrativa? Atuamos com rapidez na identificação da origem e solução de restrições via RENAJUD para liberar a documentação do seu bem.",
    icon: Lock,
    kind: "lock",
    span: "",
    visual: <RestrictionStatus />,
    message: "Olá! Meu veículo está com restrição RENAJUD. Preciso de um especialista.",
  },
  {
    title: "Veículo com Busca e Apreensão",
    tag: "Ação Rápida",
    tone: "amber",
    copy: "Assessoria completa e imediata para casos de busca e apreensão veicular. Cuidamos de toda a defesa técnica e tratativas burocráticas para proteger o seu patrimônio com segurança.",
    icon: Car,
    kind: "radar",
    span: "lg:col-span-2",
    wide: "lg",
    visual: <RadarScope />,
    message: "Olá! Meu veículo está com busca e apreensão. Preciso de ajuda urgente.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Nossos Serviços"
          icon={LayoutGrid}
          title="Defesa completa para cada *situação* do motorista"
          text="Seis frentes de atuação para resolver do mais urgente ao mais complexo — com estratégia, prazo e acompanhamento de perto."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={(i % 3) * 0.1} />
          ))}
        </div>

        <SolutionFinder />
      </div>
    </section>
  );
}

function Tag({ tone, children }: { tone: "amber" | "emerald"; children: ReactNode }) {
  return (
    <motion.span
      variants={rise}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
        tone === "amber"
          ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
          : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
      }`}
    >
      <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${tone === "amber" ? "bg-amber-400" : "bg-emerald-400"}`} />
      {children}
    </motion.span>
  );
}

const WIDE = {
  md: { grid: "md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-8", visual: "md:mt-0" },
  lg: { grid: "lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-8", visual: "lg:mt-0" },
};

function ServiceCard({ service: s, delay }: { service: Service; delay: number }) {
  return (
    <TiltCard
      variants={card(delay)}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: false, amount: 0.15 }}
      glow={s.tone}
      className={s.span}
    >
      <div className={`flex h-full flex-col p-6 sm:p-7 ${s.wide ? WIDE[s.wide].grid : ""}`}>
        <div className="flex flex-col">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <AnimatedIcon icon={s.icon} kind={s.kind} tone={s.tone} size="lg" />
            <Tag tone={s.tone}>{s.tag}</Tag>
          </div>
          <h3 className="mt-6 font-display text-xl font-bold leading-snug text-white sm:text-[1.4rem]">{s.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/60">{s.copy}</p>
          {!s.wide && <div className="mt-6">{s.visual}</div>}
          <div className="mt-auto pt-7">
            <CTAButton href={waLink(s.message)} external variant="outline" size="sm">
              Acionar Especialista
            </CTAButton>
          </div>
        </div>
        {s.wide && <div className={`mt-7 flex items-center ${WIDE[s.wide].visual}`}>{s.visual}</div>}
      </div>
    </TiltCard>
  );
}

/* ---------- Card visuals ---------- */

function Panel({ label, children, dot = "emerald" }: { label: string; children: ReactNode; dot?: "emerald" | "amber" }) {
  return (
    <motion.div variants={rise} className="w-full rounded-2xl border border-white/[0.08] bg-obsidian/60 p-4">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
        {label}
        <span
          className={`h-1.5 w-1.5 animate-pulse rounded-full ${
            dot === "amber" ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]" : "bg-emerald-400 shadow-[0_0_8px_#10b981]"
          }`}
        />
      </div>
      {children}
    </motion.div>
  );
}

function ProcessPipeline() {
  const steps = ["Notificação", "Defesa Prévia", "JARI", "CETRAN"];
  return (
    <Panel label="Tramitação do processo">
      <div className="relative px-2 pt-1">
        <div className="absolute left-[18px] right-[18px] top-[15px] h-px bg-white/10" />
        <motion.div
          aria-hidden
          className="absolute top-[11px] h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_4px_rgba(16,185,129,0.7)]"
          animate={{ left: ["18px", "calc(100% - 26px)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative flex justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex w-16 flex-col items-center gap-2 text-center">
              <motion.span
                className="grid h-[30px] w-[30px] place-items-center rounded-full border bg-obsidian font-mono text-[10px]"
                animate={{
                  borderColor: ["rgba(255,255,255,0.15)", "rgba(52,211,153,1)", "rgba(255,255,255,0.15)"],
                  color: ["rgba(255,255,255,0.5)", "rgba(110,231,183,1)", "rgba(255,255,255,0.5)"],
                  boxShadow: ["0 0 0 rgba(16,185,129,0)", "0 0 18px rgba(16,185,129,0.8)", "0 0 0 rgba(16,185,129,0)"],
                }}
                transition={{ duration: 0.9, delay: i, repeat: Infinity, repeatDelay: 2.1 }}
              >
                0{i + 1}
              </motion.span>
              <span className="text-[10.5px] font-medium leading-tight text-white/60">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-2 text-xs font-medium text-emerald-200">
        <motion.span
          className="inline-flex"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <CircleCheck size={14} />
        </motion.span>
        Você segue dirigindo enquanto o recurso tramita
      </div>
    </Panel>
  );
}

function Breathalyzer() {
  const checks = [
    "Aferição e calibração do etilômetro",
    "Procedimento de abordagem",
    "Preenchimento do auto de infração",
    "Prazos legais de notificação",
  ];
  return (
    <Panel label="Etilômetro · análise técnica" dot="amber">
      <div className="flex h-16 items-end gap-[3px]">
        {Array.from({ length: 30 }).map((_, i) => {
          const base = 18 + ((i * 37) % 64);
          return (
            <motion.span
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-amber-500/70 to-emerald-400/80"
              animate={{ height: [`${base}%`, `${100 - base * 0.6}%`, `${base * 0.7}%`, `${base}%`] }}
              transition={{ duration: 1.6 + (i % 5) * 0.25, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </div>
      <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Pontos analisados na defesa</p>
      <ul className="space-y-2">
        {checks.map((c, i) => (
          <motion.li
            key={c}
            variants={{
              hidden: { opacity: 0, x: -12 },
              show: { opacity: 1, x: 0, transition: { delay: 0.4 + i * 0.12 } },
            }}
            className="flex items-center gap-2.5 text-[13px] text-white/70"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-emerald-400/15 text-emerald-300">
              <Check size={12} strokeWidth={3} />
            </span>
            {c}
          </motion.li>
        ))}
      </ul>
    </Panel>
  );
}

function PpdProgress() {
  return (
    <Panel label="Permissão → Definitiva">
      <div className="flex justify-between font-mono text-[10px] text-white/50">
        <span>PPD</span>
        <span className="text-emerald-300">CNH DEFINITIVA</span>
      </div>
      <div className="relative mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-amber-400 via-emerald-500 to-emerald-300"
          variants={{
            hidden: { width: "0%" },
            show: { width: "100%", transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 } },
          }}
        >
          <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>
      </div>
    </Panel>
  );
}

function Instances() {
  const items = ["Defesa Prévia", "JARI", "CETRAN"];
  return (
    <Panel label="Instâncias de defesa">
      <div className="grid grid-cols-3 gap-2">
        {items.map((it, i) => (
          <motion.span
            key={it}
            className="rounded-lg border px-1 py-2 text-center text-[11px] font-semibold"
            animate={{
              borderColor: ["rgba(255,255,255,0.1)", "rgba(52,211,153,0.9)", "rgba(255,255,255,0.1)"],
              backgroundColor: ["rgba(255,255,255,0.02)", "rgba(16,185,129,0.16)", "rgba(255,255,255,0.02)"],
              color: ["rgba(255,255,255,0.55)", "rgba(209,250,229,1)", "rgba(255,255,255,0.55)"],
            }}
            transition={{ duration: 1.2, delay: i * 0.8, repeat: Infinity, repeatDelay: 1.2 }}
          >
            {it}
          </motion.span>
        ))}
      </div>
    </Panel>
  );
}

const RESTRICTION_STEPS = [
  { label: "BLOQUEADO", cls: "text-amber-300" },
  { label: "EM ANÁLISE", cls: "text-white/80" },
  { label: "LIBERADO", cls: "text-emerald-300" },
];

function RestrictionStatus() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % RESTRICTION_STEPS.length), 1700);
    return () => window.clearInterval(id);
  }, []);
  const cur = RESTRICTION_STEPS[step];
  return (
    <Panel label="Documento do veículo" dot={step === 2 ? "emerald" : "amber"}>
      <div className="space-y-1.5">
        <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
        <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[11px]">
        <span className="text-white/45">RESTRIÇÃO ▸</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={cur.label}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            className={`font-semibold tracking-widest ${cur.cls}`}
          >
            {cur.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </Panel>
  );
}

function RadarScope() {
  const blips = [
    { x: "62%", y: "30%", d: 0 },
    { x: "34%", y: "64%", d: 1.1 },
    { x: "70%", y: "70%", d: 2.2 },
  ];
  return (
    <motion.div variants={rise} className="relative mx-auto aspect-square w-full max-w-[260px]">
      <div className="absolute inset-0 rounded-full border border-emerald-400/25 bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_70%)]" />
      <div className="absolute inset-[17%] rounded-full border border-emerald-400/20" />
      <div className="absolute inset-[34%] rounded-full border border-emerald-400/20" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-400/15" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-400/15" />
      <div className="absolute inset-0 animate-spin-radar rounded-full bg-[conic-gradient(from_0deg,rgba(16,185,129,0.45),transparent_28%,transparent)]" />
      {blips.map((b) => (
        <motion.span
          key={b.x}
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]"
          style={{ left: b.x, top: b.y }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.3, 0.6] }}
          transition={{ duration: 3.2, delay: b.d, repeat: Infinity }}
        />
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <motion.span
          className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-400/40 bg-obsidian/90 text-emerald-300 shadow-[0_0_30px_-4px_rgba(16,185,129,0.7)]"
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Car size={26} />
        </motion.span>
      </div>
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-obsidian/90 px-3 py-1 font-mono text-[10px] tracking-widest text-emerald-300">
        PATRIMÔNIO PROTEGIDO
      </span>
    </motion.div>
  );
}

/* ---------- Solution finder (pills) ---------- */

const SOLUTIONS = [
  {
    id: "preventiva",
    label: "Consultoria Preventiva de Pontuação",
    icon: CircleGauge,
    kind: "speed" as IconKind,
    summary:
      "Para quem trabalha dirigindo — motoristas de aplicativo, caminhoneiros, representantes e frotistas. Acompanhamos o seu prontuário e orientamos cada decisão para você não estourar o limite de pontos.",
    bullets: [
      "Monitoramento contínuo da pontuação",
      "Alertas de prazos de defesa e de indicação de condutor",
      "Orientação estratégica antes de cada recurso",
    ],
  },
  {
    id: "velocidade",
    label: "Excesso de Velocidade e Gravíssimas",
    icon: Zap,
    kind: "speed" as IconKind,
    summary:
      "Análise técnica completa da autuação: aferição do radar, sinalização da via, enquadramento e preenchimento do auto de infração, além dos prazos de notificação — onde mais aparecem falhas.",
    bullets: [
      "Verificação da aferição do equipamento",
      "Conferência de sinalização e enquadramento",
      "Defesa em todas as instâncias",
    ],
  },
  {
    id: "psdd",
    label: "Processo de Suspensão (PSDD)",
    icon: ShieldAlert,
    kind: "shield" as IconKind,
    summary:
      "Defesa no Processo Administrativo de Suspensão do Direito de Dirigir em cada uma das fases, preservando seu direito de dirigir até a decisão final.",
    bullets: [
      "Defesa desde a instauração do processo",
      "Recursos à JARI e ao CETRAN",
      "Acompanhamento até a decisão final",
    ],
  },
  {
    id: "detran",
    label: "Representação junto ao DETRAN",
    icon: Landmark,
    kind: "float" as IconKind,
    summary:
      "Representação administrativa completa junto ao DETRAN e aos órgãos autuadores. Protocolamos, acompanhamos e, se necessário, retiramos a documentação na sua casa ou trabalho.",
    bullets: ["Protocolos e requerimentos", "Acompanhamento de cada andamento", "Retirada de documentos onde você estiver"],
  },
];

function SolutionFinder() {
  const [active, setActive] = useState(SOLUTIONS[0].id);
  const cur = SOLUTIONS.find((s) => s.id === active)!;

  return (
    <div className="mt-24">
      <Reveal className="text-center">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300">
          <motion.span
            className="inline-flex"
            animate={{ x: [0, 4, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <Search size={14} />
          </motion.span>
          Buscador de soluções específicas
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
          Outras demandas e consultoria preventiva
        </h3>
      </Reveal>

      <Reveal delay={0.15}>
        <div role="tablist" aria-label="Soluções específicas" className="mt-8 flex flex-wrap justify-center gap-2">
          {SOLUTIONS.map((s) => {
            const on = s.id === active;
            return (
              <motion.button
                key={s.id}
                role="tab"
                type="button"
                id={`tab-${s.id}`}
                aria-selected={on}
                aria-controls="solution-panel"
                onClick={() => setActive(s.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                  on ? "text-obsidian" : "border border-white/10 bg-white/[0.03] text-white/70 hover:text-white"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="solution-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_24px_-4px_rgba(16,185,129,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </motion.button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.25} className="mx-auto mt-8 max-w-4xl">
        <TiltCard intensity={4} id="solution-panel" role="tabpanel" aria-labelledby={`tab-${cur.id}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.2 } }}
              whileHover="hover"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center"
            >
              <AnimatedIcon icon={cur.icon} kind={cur.kind} size="lg" />
              <div>
                <motion.h4 variants={rise} className="font-display text-xl font-bold text-white">
                  {cur.label}
                </motion.h4>
                <motion.p variants={rise} className="mt-2 text-[15px] leading-relaxed text-white/60">
                  {cur.summary}
                </motion.p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cur.bullets.map((b) => (
                    <motion.li
                      key={b}
                      variants={rise}
                      className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-medium text-emerald-100"
                    >
                      <Check size={12} strokeWidth={3} className="text-emerald-400" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <CTAButton
                href={waLink(`Olá! Tenho interesse em: ${cur.label}.`)}
                external
                icon="whatsapp"
                size="md"
              >
                Falar com especialista
              </CTAButton>
            </motion.div>
          </AnimatePresence>
        </TiltCard>
      </Reveal>
    </div>
  );
}
