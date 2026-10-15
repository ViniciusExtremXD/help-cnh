import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Gauge,
  Landmark,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { waLink } from "../config";
import { PHOTOS } from "../data/photos";
import { Photo } from "./ui/Photo";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

type Service = {
  photo: string;
  alt: string;
  tag: string;
  urgent?: boolean;
  icon: LucideIcon;
  title: string;
  copy: string;
  message: string;
};

const SERVICES: Service[] = [
  {
    photo: PHOTOS.signing,
    alt: "Pessoa assinando documento",
    tag: "Alta prioridade",
    urgent: true,
    icon: ShieldAlert,
    title: "CNH Suspensa ou Cassada",
    copy: "Recebeu notificação de suspensão por pontos ou processo de cassação? Atuamos de forma ágil com recursos administrativos estratégicos para reverter penalidades e manter você dirigindo legalmente enquanto o processo tramita.",
    message: "Olá! Minha CNH está suspensa ou em processo de cassação. Preciso de um especialista.",
  },
  {
    photo: PHOTOS.policeLights,
    alt: "Luzes de viatura em abordagem noturna",
    tag: "Art. 165 e 165-A do CTB",
    urgent: true,
    icon: Siren,
    title: "Assessoria na Lei Seca / Bafômetro",
    copy: "Foi autuado no teste do bafômetro ou recusou o etilômetro? A perda da CNH não é automática. Analisamos falhas no procedimento e na abordagem para construir uma defesa técnica robusta e proteger sua habilitação.",
    message: "Olá! Fui autuado(a) na Lei Seca / bafômetro. Preciso de um especialista.",
  },
  {
    photo: PHOTOS.handsWheel,
    alt: "Mãos de motorista ao volante",
    tag: "Proteja sua definitiva",
    icon: ShieldCheck,
    title: "Multas na CNH Provisória (PPD)",
    copy: "Levou uma multa grave, gravíssima ou reincidiu em média durante a permissão? Auxiliamos a recorrer no tempo certo para impedir que você perca a provisória e tenha que refazer toda a autoescola do zero.",
    message: "Olá! Levei multa na CNH provisória (PPD). Preciso de um especialista.",
  },
  {
    photo: PHOTOS.speedCamera,
    alt: "Radar de velocidade em via urbana",
    tag: "Defesa Prévia • JARI • CETRAN",
    icon: Gauge,
    title: "Recursos de Multas de Trânsito",
    copy: "Recorremos de multas por excesso de velocidade, infrações gravíssimas e autuações indevidas. Defendemos seus direitos com eficácia para anular penalidades e preservar seu prontuário limpo.",
    message: "Olá! Quero recorrer de uma multa de trânsito. Preciso de um especialista.",
  },
  {
    photo: PHOTOS.carKey,
    alt: "Chave de veículo na mão do proprietário",
    tag: "Regularização documental",
    icon: Lock,
    title: "Restrição Veicular — RENAJUD",
    copy: "Veículo bloqueado com restrição judicial ou administrativa? Atuamos com rapidez na identificação da origem e solução de restrições via RENAJUD para liberar a documentação do seu bem.",
    message: "Olá! Meu veículo está com restrição RENAJUD. Preciso de um especialista.",
  },
  {
    photo: PHOTOS.towTruck,
    alt: "Guincho transportando um veículo",
    tag: "Ação rápida",
    urgent: true,
    icon: Car,
    title: "Veículo com Busca e Apreensão",
    copy: "Assessoria completa e imediata para casos de busca e apreensão veicular. Cuidamos de toda a defesa técnica e tratativas burocráticas para proteger o seu patrimônio com segurança.",
    message: "Olá! Meu veículo está com busca e apreensão. Preciso de ajuda urgente.",
  },
];

const OTHERS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: CircleGauge,
    title: "Consultoria preventiva de pontuação",
    text: "Para quem trabalha dirigindo: acompanhamos seu prontuário e orientamos cada decisão para você não estourar o limite de pontos.",
  },
  {
    icon: Zap,
    title: "Excesso de velocidade e gravíssimas",
    text: "Análise técnica da autuação: aferição do radar, sinalização, enquadramento e prazos de notificação.",
  },
  {
    icon: ShieldAlert,
    title: "Processo de Suspensão (PSDD)",
    text: "Defesa em todas as fases do processo administrativo, preservando seu direito de dirigir até a decisão final.",
  },
  {
    icon: Landmark,
    title: "Representação junto ao DETRAN",
    text: "Protocolos, acompanhamento e, se necessário, retirada de documentos na sua casa ou trabalho.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="bg-slate-50 py-20 sm:py-28">
      <div className="container-x">
        <ServicesCarousel />

        <div className="mt-20 border-t border-slate-200 pt-16">
          <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="kicker">
                <span className="h-px w-6 bg-brand-600" />
                Serviços complementares
              </p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">
                Outras demandas e consultoria preventiva
              </h3>
            </div>
            <a
              href={waLink("Olá! Tenho uma demanda de trânsito e gostaria de orientação.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
            >
              Consultar outro serviço
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OTHERS.map((o) => (
              <motion.div
                key={o.title}
                variants={fadeUp}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy-900 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-navy-900">
                  <o.icon size={19} />
                </span>
                <h4 className="mt-4 text-[15.5px] font-bold">{o.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{o.text}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

function ServicesCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(3);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      const card = el.firstElementChild as HTMLElement | null;
      if (card) setVisible(Math.max(1, Math.round(el.clientWidth / card.offsetWidth)));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch already scrolls natively).
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { active: true, startX: e.clientX, startScroll: track.current.scrollLeft, moved: 0 };
  };
  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d.active || !track.current) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved > 4 && !dragging) setDragging(true);
    track.current.scrollLeft = d.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    if (dragging) {
      setDragging(false);
      // Let snapping settle on the nearest card.
      const el = track.current;
      const card = el?.firstElementChild as HTMLElement | null;
      if (el && card) {
        const w = card.offsetWidth + 24;
        el.scrollTo({ left: Math.round(el.scrollLeft / w) * w, behavior: "smooth" });
      }
    }
  };

  const atStart = progress <= 0.01;
  const atEnd = progress >= 0.99;
  const current = Math.min(SERVICES.length, Math.round(progress * (SERVICES.length - visible)) + 1);

  return (
    <div>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionTitle
          kicker="Nossos serviços"
          title="Soluções completas para cada situação do motorista"
          text="Seis frentes de atuação para resolver do mais urgente ao mais complexo — com estratégia, cumprimento de prazos e acompanhamento de perto."
        />
        <Reveal className="flex shrink-0 items-center gap-4">
          <span className="text-sm font-semibold tabular-nums text-slate-400">
            <span className="text-navy-900">{String(current).padStart(2, "0")}</span> / {String(SERVICES.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <CarouselArrow dir="prev" disabled={atStart} onClick={() => step(-1)} />
            <CarouselArrow dir="next" disabled={atEnd} onClick={() => step(1)} />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={track}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Serviços"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={(e) => {
            if (drag.current.moved > 4) {
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = 0;
            }
          }}
          className={`no-scrollbar mt-10 flex gap-6 overflow-x-auto pb-4 pt-2 ${
            dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory"
          }`}
        >
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </Reveal>

      <div className="mt-6 h-[3px] overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="h-full rounded-full bg-brand-500"
          animate={{ width: `${(visible / SERVICES.length + progress * (1 - visible / SERVICES.length)) * 100}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        />
      </div>
    </div>
  );
}

function ServiceCard({ service: s, index }: { service: Service; index: number }) {
  return (
    <article
      aria-label={`${index + 1} de ${SERVICES.length}: ${s.title}`}
      className="group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <Photo
          id={s.photo}
          alt={s.alt}
          ratio={0.625}
          widths={[480, 720, 960]}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 85vw"
          className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent" />
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
            s.urgent ? "bg-signal-500 text-navy-900" : "bg-white text-navy-900"
          }`}
        >
          {s.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-navy-900">
            <s.icon size={20} />
          </span>
          <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{s.copy}</p>
        <a
          href={waLink(s.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-brand-700"
        >
          Acionar especialista
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

function CarouselArrow({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Serviço anterior" : "Próximo serviço"}
      className="grid h-12 w-12 place-items-center rounded-full border border-slate-300 bg-white text-navy-900 transition-all hover:border-navy-900 hover:bg-navy-900 hover:text-white disabled:pointer-events-none disabled:opacity-35"
    >
      <Icon size={20} />
    </button>
  );
}
