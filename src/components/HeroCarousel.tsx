import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { waLink } from "../config";
import { PHOTOS, photoSrcSet, photoUrl } from "../data/photos";
import { Button } from "./ui/Button";
import { Photo } from "./ui/Photo";
import { fadeUp, group } from "./ui/Reveal";

const DURATION = 7; // seconds per slide

type Slide = {
  photo: string;
  alt: string;
  tab: string;
  kicker: string;
  title: ReactNode;
  sub?: string;
  text: string;
  cta: string;
  message: string;
  /** object-position for the photo crop */
  focus?: string;
};

const SLIDES: Slide[] = [
  {
    photo: PHOTOS.handOnWheel,
    alt: "Mão do motorista firme no volante",
    tab: "Defesa do motorista",
    kicker: "Defesa especializada do motorista",
    title: "Proteja seu direito de dirigir.",
    sub: "Nós assumimos a burocracia, você continua no volante.",
    text: "Da multa na CNH Provisória a processos de Suspensão, Cassação, Lei Seca e bloqueios RENAJUD: construímos a defesa estratégica do seu caso com transparência total e zero juridiquês.",
    cta: "Quero proteger minha CNH",
    message: "Olá! Quero proteger minha CNH. Pode analisar meu caso?",
  },
  {
    photo: PHOTOS.driverDay,
    alt: "Motorista dirigindo durante o dia",
    tab: "CNH suspensa ou cassada",
    kicker: "CNH suspensa ou cassada",
    title: "Você pode continuar dirigindo durante o recurso.",
    text: "Recebeu notificação de suspensão por pontos ou processo de cassação? Atuamos com recursos administrativos estratégicos para reverter a penalidade enquanto o processo tramita.",
    cta: "Defender minha CNH",
    message: "Olá! Recebi notificação de suspensão/cassação da CNH e quero uma análise.",
    focus: "60% 50%",
  },
  {
    photo: PHOTOS.policeNight,
    alt: "Viatura em movimento em via urbana ao anoitecer",
    tab: "Lei Seca",
    kicker: "Lei Seca e bafômetro",
    title: "Autuado na Lei Seca? A perda da CNH não é automática.",
    text: "Defesa técnica para autuações dos Art. 165 e 165-A do CTB — bafômetro ou recusa ao teste — em todas as instâncias administrativas.",
    cta: "Falar sobre a minha autuação",
    message: "Olá! Fui autuado(a) na Lei Seca e quero uma análise do meu caso.",
  },
  {
    photo: PHOTOS.youngDriver,
    alt: "Jovem motorista ao volante",
    tab: "CNH provisória",
    kicker: "Multas na CNH provisória (PPD)",
    title: "Multa na provisória? Proteja a sua CNH definitiva.",
    text: "Recorremos no prazo certo para que uma infração grave ou gravíssima não obrigue você a refazer toda a autoescola do zero.",
    cta: "Proteger minha definitiva",
    message: "Olá! Levei multa na CNH provisória e quero proteger minha definitiva.",
    focus: "65% 45%",
  },
  {
    photo: PHOTOS.keysHandover,
    alt: "Entrega da chave de um veículo",
    tab: "RENAJUD e apreensão",
    kicker: "Restrição veicular e busca e apreensão",
    title: "Veículo bloqueado? Nós cuidamos da regularização.",
    text: "Identificamos a origem da restrição judicial ou administrativa e conduzimos a solução para liberar a documentação e proteger o seu patrimônio.",
    cta: "Regularizar meu veículo",
    message: "Olá! Meu veículo está com restrição/busca e apreensão e preciso de ajuda.",
  },
];

const TRUST = ["Atendimento em todo o Brasil", "Sem juridiquês", "Andamento pelo WhatsApp"];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = SLIDES[index];

  const go = useCallback((i: number) => setIndex((i + SLIDES.length) % SLIDES.length), []);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // Warm the cache for the other slides so crossfades never reveal an empty frame.
  useEffect(() => {
    const id = window.setTimeout(() => {
      SLIDES.slice(1).forEach((s) => {
        const img = new Image();
        img.sizes = "100vw";
        img.srcset = photoSrcSet(s.photo, [480, 768, 1080, 1440, 1920]);
        img.src = photoUrl(s.photo, 1080);
      });
    }, 1200);
    return () => window.clearTimeout(id);
  }, []);

  const TitleTag = index === 0 ? motion.h1 : motion.h2;

  return (
    <section
      id="topo"
      aria-roledescription="carrossel"
      aria-label="Destaques"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative isolate overflow-hidden bg-navy-900"
    >
      <div className="relative min-h-[640px] lg:h-[calc(100svh-120px)] lg:max-h-[780px] lg:min-h-[640px]">
        {/* Photos */}
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: DURATION + 1.5, ease: "linear" }}
            >
              <Photo
                id={slide.photo}
                alt={slide.alt}
                priority={index === 0}
                className="h-full w-full object-cover"
                style={{ objectPosition: slide.focus ?? "50% 50%" }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-navy-900/10" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-navy-900/90 to-transparent" />

        {/* Copy */}
        <div className="container-x relative z-10 flex min-h-[640px] items-center pb-32 pt-14 lg:h-full lg:min-h-0 lg:pb-28">
          <div className="max-w-2xl" aria-live="polite">
            {/* initial={false}: the first slide paints immediately (fast LCP); later slides animate in. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
                variants={group}
              >
                <motion.p
                  variants={fadeUp}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  {slide.kicker}
                </motion.p>
                <TitleTag
                  variants={fadeUp}
                  className="mt-6 text-[2.5rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
                >
                  {slide.title}
                </TitleTag>
                {slide.sub && (
                  <motion.p variants={fadeUp} className="mt-4 font-display text-xl font-bold text-brand-400 sm:text-2xl">
                    {slide.sub}
                  </motion.p>
                )}
                <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {slide.text}
                </motion.p>
                <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button href={waLink(slide.message)} external icon="whatsapp">
                    {slide.cta}
                  </Button>
                  <Button href="#servicos" variant="outline-light" icon={ArrowDown}>
                    Conheça os serviços
                  </Button>
                </motion.div>
                <motion.ul variants={fadeUp} className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
                  {TRUST.map((t) => (
                    <li key={t} className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-500/20 text-brand-400">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Arrows (desktop) */}
        <div className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
          <ArrowButton dir="prev" onClick={prev} />
          <ArrowButton dir="next" onClick={next} />
        </div>

        {/* Tabs with progress (desktop) */}
        <div className="absolute inset-x-0 bottom-0 z-10 hidden lg:block">
          <div className="container-x grid grid-cols-5 border-t border-white/15">
            {SLIDES.map((s, i) => (
              <button
                key={s.tab}
                type="button"
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}: ${s.tab}`}
                aria-current={i === index}
                className="group relative pb-7 pr-4 pt-5 text-left"
              >
                <span className="absolute inset-x-0 -top-px h-[2px] bg-transparent">
                  {i === index && (
                    <span
                      key={index}
                      onAnimationEnd={next}
                      className="block h-full origin-left bg-brand-500"
                      style={{
                        animation: `slide-progress ${DURATION}s linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </span>
                <span className={`block text-xs font-bold ${i === index ? "text-brand-400" : "text-slate-400"}`}>
                  0{i + 1}
                </span>
                <span
                  className={`mt-1 block text-sm font-semibold transition-colors ${
                    i === index ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {s.tab}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dots + arrows (mobile) */}
        <div className="absolute inset-x-0 bottom-0 z-10 lg:hidden">
          <div className="container-x flex items-center justify-between pb-7">
            <div className="flex items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.tab}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}: ${s.tab}`}
                  aria-current={i === index}
                  className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                    i === index ? "w-10 bg-white/25" : "w-4 bg-white/40"
                  }`}
                >
                  {i === index && (
                    <span
                      key={index}
                      onAnimationEnd={next}
                      className="absolute inset-0 origin-left bg-brand-500"
                      style={{
                        animation: `slide-progress ${DURATION}s linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <ArrowButton dir="prev" onClick={prev} />
              <ArrowButton dir="next" onClick={next} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Slide anterior" : "Próximo slide"}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-navy-900"
    >
      <Icon size={20} />
    </button>
  );
}
