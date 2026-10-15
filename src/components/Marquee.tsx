import { motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";

const PAINS = [
  "CNH Suspensa",
  "Recusa ao Bafômetro",
  "Multa na Provisória",
  "RENAJUD",
  "Busca e Apreensão",
  "CNH Cassada",
  "Excesso de Velocidade",
  "Lei Seca",
];

function Row({ tone, reverse }: { tone: "amber" | "dark"; reverse?: boolean }) {
  const items = [...PAINS, ...PAINS];
  return (
    <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}>
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
          {items.map((p, i) => (
            <span key={`${dup}-${i}`} className="flex items-center">
              <span
                className={`whitespace-nowrap px-6 font-display text-lg font-extrabold uppercase tracking-tight sm:text-2xl ${
                  tone === "amber" ? "text-obsidian" : i % 2 ? "text-white" : "text-emerald-grad"
                }`}
              >
                {p}
              </span>
              {tone === "amber" ? (
                <TriangleAlert size={18} className="text-obsidian/70" strokeWidth={2.4} />
              ) : (
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <motion.section
      aria-label="Situações que atendemos"
      initial={{ opacity: 0, scaleX: 0.85 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 90, damping: 18 }}
      className="group relative py-14"
    >
      <div className="relative -mx-[5%] -rotate-[1.6deg] border-y border-amber-300/50 bg-amber-400 py-3 shadow-[0_0_50px_-10px_rgba(245,158,11,0.6)]">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent_0_22px,rgba(7,10,18,0.07)_22px_44px)]" />
        <div className="overflow-hidden">
          <Row tone="amber" />
        </div>
      </div>
      <div className="relative -mx-[5%] -mt-3 rotate-[1.2deg] border-y border-white/10 bg-obsidian/90 py-3.5 backdrop-blur-xl">
        <div className="mask-fade-x overflow-hidden">
          <Row tone="dark" reverse />
        </div>
      </div>
    </motion.section>
  );
}
