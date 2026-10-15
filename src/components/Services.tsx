import {
  ArrowRight,
  Bank,
  Camera,
  Car,
  Gauge,
  LockKey,
  ShieldCheck,
  ShieldWarning,
  Siren,
  Speedometer,
  type Icon,
} from "@phosphor-icons/react";
import { waLink } from "../config";
import { PHOTOS } from "../data/photos";
import { AutoCarousel } from "./ui/AutoCarousel";
import { IconBadge, type IconMotion } from "./ui/IconBadge";
import { Photo } from "./ui/Photo";
import { Reveal } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

type Service = {
  photo: string;
  alt: string;
  tag: string;
  urgent?: boolean;
  icon: Icon;
  motion: IconMotion;
  title: string;
  copy: string;
  message: string;
};

const SERVICES: Service[] = [
  {
    photo: PHOTOS.nightDriveSp,
    alt: "Motorista dirigindo à noite em São Paulo",
    tag: "Alta prioridade",
    urgent: true,
    icon: ShieldWarning,
    motion: "pulse",
    title: "CNH Suspensa ou Cassada",
    copy: "Recebeu notificação de suspensão por pontos ou processo de cassação? Atuamos de forma ágil com recursos administrativos estratégicos para reverter penalidades e manter você dirigindo legalmente enquanto o processo tramita.",
    message: "Olá! Minha CNH está suspensa ou em processo de cassação. Preciso de um especialista.",
  },
  {
    photo: PHOTOS.pmTraffic,
    alt: "Policial militar orientando o trânsito em blitz",
    tag: "Art. 165 e 165-A do CTB",
    urgent: true,
    icon: Siren,
    motion: "flash",
    title: "Assessoria na Lei Seca / Bafômetro",
    copy: "Foi autuado no teste do bafômetro ou recusou o etilômetro? A perda da CNH não é automática. Analisamos falhas no procedimento e na abordagem para construir uma defesa técnica robusta e proteger sua habilitação.",
    message: "Olá! Fui autuado(a) na Lei Seca / bafômetro. Preciso de um especialista.",
  },
  {
    photo: PHOTOS.youngDriverCuritiba,
    alt: "Jovem motorista ao volante em Curitiba",
    tag: "Proteja sua definitiva",
    icon: ShieldCheck,
    motion: "pop",
    title: "Multas na CNH Provisória (PPD)",
    copy: "Levou uma multa grave, gravíssima ou reincidiu em média durante a permissão? Auxiliamos a recorrer no tempo certo para impedir que você perca a provisória e tenha que refazer toda a autoescola do zero.",
    message: "Olá! Levei multa na CNH provisória (PPD). Preciso de um especialista.",
  },
  {
    photo: PHOTOS.speedRadar,
    alt: "Radar de velocidade instalado em rodovia",
    tag: "Defesa Prévia, JARI e CETRAN",
    icon: Gauge,
    motion: "spin",
    title: "Recursos de Multas de Trânsito",
    copy: "Recorremos de multas por excesso de velocidade, infrações gravíssimas e autuações indevidas. Defendemos seus direitos com eficácia para anular penalidades e preservar seu prontuário limpo.",
    message: "Olá! Quero recorrer de uma multa de trânsito. Preciso de um especialista.",
  },
  {
    photo: PHOTOS.plateMercosul,
    alt: "Placa Mercosul de um veículo brasileiro",
    tag: "Regularização documental",
    icon: LockKey,
    motion: "lift",
    title: "Restrição Veicular — RENAJUD",
    copy: "Veículo bloqueado com restrição judicial ou administrativa? Atuamos com rapidez na identificação da origem e solução de restrições via RENAJUD para liberar a documentação do seu bem.",
    message: "Olá! Meu veículo está com restrição RENAJUD. Preciso de um especialista.",
  },
  {
    photo: PHOTOS.enforcement,
    alt: "Fiscalização de trânsito com policiais e cones",
    tag: "Ação rápida",
    urgent: true,
    icon: Car,
    motion: "drive",
    title: "Veículo com Busca e Apreensão",
    copy: "Assessoria completa e imediata para casos de busca e apreensão veicular. Cuidamos de toda a defesa técnica e tratativas burocráticas para proteger o seu patrimônio com segurança.",
    message: "Olá! Meu veículo está com busca e apreensão. Preciso de ajuda urgente.",
  },
];

const OTHERS: { icon: Icon; motion: IconMotion; title: string; text: string }[] = [
  {
    icon: Speedometer,
    motion: "spin",
    title: "Consultoria preventiva de pontuação",
    text: "Para quem trabalha dirigindo: acompanhamos seu prontuário e orientamos cada decisão para você não estourar o limite de pontos.",
  },
  {
    icon: Camera,
    motion: "flash",
    title: "Excesso de velocidade e gravíssimas",
    text: "Análise técnica da autuação: aferição do radar, sinalização, enquadramento e prazos de notificação.",
  },
  {
    icon: ShieldWarning,
    motion: "pulse",
    title: "Processo de Suspensão (PSDD)",
    text: "Defesa em todas as fases do processo administrativo, preservando seu direito de dirigir até a decisão final.",
  },
  {
    icon: Bank,
    motion: "lift",
    title: "Representação junto ao DETRAN",
    text: "Protocolos, acompanhamento e, se necessário, retirada de documentos na sua casa ou trabalho.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="overflow-hidden bg-slate-50 py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle
          kicker="Nossos serviços"
          title="Soluções completas para cada situação do motorista"
          text="Seis frentes de atuação para resolver do mais urgente ao mais complexo — com estratégia, cumprimento de prazos e acompanhamento de perto."
        />

        <Reveal delay={0.1} className="mt-12">
          <AutoCarousel
            label="Serviços"
            items={SERVICES}
            getKey={(s) => s.title}
            interval={4500}
            render={(s) => <ServiceCard service={s} />}
          />
        </Reveal>

        <div className="mt-20 border-t border-slate-200 pt-16">
          <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="kicker">Serviços complementares</p>
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
              <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <AutoCarousel
              label="Serviços complementares"
              items={OTHERS}
              getKey={(o) => o.title}
              gap={16}
              interval={3600}
              render={(o) => (
                <div className="card-lift group h-full rounded-xl border border-slate-200 bg-white p-6 hover:border-brand-500 hover:shadow-lift">
                  <IconBadge icon={o.icon} motion={o.motion} />
                  <h4 className="mt-5 text-base font-bold">{o.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{o.text}</p>
                </div>
              )}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s }: { service: Service }) {
  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card hover:border-brand-500/60 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <Photo
          id={s.photo}
          alt={s.alt}
          ratio={0.625}
          widths={[480, 720, 960]}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 90vw"
          className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
      </div>
      <div className="relative flex flex-1 flex-col px-6 pb-6 sm:px-7 sm:pb-7">
        <span className="-mt-9 w-fit rounded-full bg-white p-1.5 shadow-card">
          <IconBadge icon={s.icon} motion={s.motion} />
        </span>
        <p className={`mt-4 text-[13px] font-semibold ${s.urgent ? "text-signal-700" : "text-brand-700"}`}>{s.tag}</p>
        <h3 className="mt-1 text-lg font-bold leading-snug">{s.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{s.copy}</p>
        <a
          href={waLink(s.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-navy-900 transition-colors hover:text-brand-700"
        >
          Acionar especialista
          <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}
