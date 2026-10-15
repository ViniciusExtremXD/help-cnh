import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, CircleCheck, Clock, MapPin, MessagesSquare } from "lucide-react";
import { waLink } from "../config";
import { CTAButton } from "./CTAButton";
import { AnimatedIcon } from "./AnimatedIcon";
import { DiagnosticPanel } from "./DiagnosticPanel";
import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";

const BADGES = [
  { text: "Efeito Suspensivo Ativo", pos: "-left-4 top-[30%] xl:-left-12", dur: 3, depth: 50 },
  { text: "0 Pontos na PPD", pos: "-right-3 top-[52%] xl:-right-10", dur: 4.2, depth: 90 },
  { text: "RENAJUD Desbloqueado", pos: "-bottom-5 left-8", dur: 5, depth: 30 },
];

const TRUST = [
  { icon: MapPin, text: "Atendimento em todo o Brasil" },
  { icon: Clock, text: "Resposta rápida no WhatsApp" },
  { icon: MessagesSquare, text: "Zero juridiquês" },
];

export function Hero() {
  const { scrollY } = useScroll();

  return (
    <section id="topo" className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-12">
        <div>
          <Reveal className="mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] py-1.5 pl-2 pr-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-emerald-200 sm:text-[11.5px]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="truncate">
              Defesa especializada do motorista
              <span className="hidden text-white/45 sm:inline"> — atendimento rápido e sem burocracia</span>
            </span>
          </Reveal>

          <WordReveal
            as="h1"
            text="Proteja seu *direito* *de* *dirigir.* | Nós assumimos a burocracia, você continua no *volante.*"
            muted={5}
            delay={0.15}
            className="font-display text-[2.55rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.05rem]"
            lineClassNames={["", "mt-4 text-[0.5em] font-bold leading-[1.18]"]}
          />

          <Reveal delay={0.95}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Da multa na CNH Provisória a processos complexos de Suspensão, Cassação, Lei Seca e bloqueios RENAJUD.
              A <strong className="font-semibold text-white">Help Soluções e CNH</strong> constrói a defesa estratégica
              do seu caso com transparência total e zero juridiquês.
            </p>
          </Reveal>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CTAButton
              href={waLink("Olá! Quero proteger minha CNH. Pode analisar meu caso?")}
              external
              delay={1.15}
              className="w-full sm:w-auto"
            >
              Quero Proteger Minha CNH Agora
            </CTAButton>
            <CTAButton href="#servicos" variant="glass" icon={ArrowDown} delay={1.3} className="w-full sm:w-auto">
              Explorar Nossos Serviços
            </CTAButton>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 1.45 } } }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
          >
            {TRUST.map((t) => (
              <motion.li
                key={t.text}
                variants={{
                  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                whileHover="hover"
                className="flex items-center gap-2.5 text-[13px] font-medium text-white/60"
              >
                <AnimatedIcon icon={t.icon} size="sm" />
                {t.text}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.22),transparent_65%)] blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: -14, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 16,
              delay: 0.5,
              filter: { duration: 0.8, delay: 0.5 },
              opacity: { duration: 0.6, delay: 0.5 },
            }}
            style={{ transformPerspective: 1200 }}
          >
            <DiagnosticPanel />
          </motion.div>

          {BADGES.map((b, i) => (
            <FloatingBadge key={b.text} {...b} index={i} scrollY={scrollY} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({
  text,
  pos,
  dur,
  depth,
  index,
  scrollY,
}: {
  text: string;
  pos: string;
  dur: number;
  depth: number;
  index: number;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
}) {
  const parallax = useTransform(scrollY, [0, 700], [0, -depth]);
  return (
    <motion.div style={{ y: parallax }} className={`pointer-events-none absolute z-20 hidden sm:block ${pos}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{
          type: "spring",
          stiffness: 160,
          damping: 14,
          delay: 1.4 + index * 0.25,
          filter: { duration: 0.5, delay: 1.4 + index * 0.25 },
        }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-obsidian/80 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)] backdrop-blur-xl"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6 + index, repeat: Infinity, ease: "linear" }}
            className="inline-flex text-emerald-400"
          >
            <CircleCheck size={15} />
          </motion.span>
          {text}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
