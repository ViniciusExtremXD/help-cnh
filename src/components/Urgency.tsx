import { Car, FileText, Gauge, Scales, ShieldWarning, Siren, type Icon } from "@phosphor-icons/react";
import { waLink } from "../config";
import { PHOTOS } from "../data/photos";
import { AutoCarousel } from "./ui/AutoCarousel";
import { Button } from "./ui/Button";
import { IconBadge, type IconMotion } from "./ui/IconBadge";
import { Photo } from "./ui/Photo";
import { Reveal } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

const ITEMS: { icon: Icon; motion: IconMotion; title: string; text: string }[] = [
  {
    icon: FileText,
    motion: "lift",
    title: "Notificação de Autuação",
    text: "Abre o prazo para a Defesa Prévia e para a indicação do condutor.",
  },
  {
    icon: Scales,
    motion: "tilt",
    title: "Notificação de Penalidade",
    text: "A multa foi aplicada, mas ainda cabe recurso à JARI e, depois, ao CETRAN.",
  },
  {
    icon: ShieldWarning,
    motion: "pulse",
    title: "Processo de Suspensão instaurado",
    text: "Pontos no limite ou infração autossuspensiva: a defesa preserva seu direito de dirigir.",
  },
  {
    icon: Siren,
    motion: "flash",
    title: "Autuação na Lei Seca",
    text: "Bafômetro ou recusa ao teste: multa elevada e suspensão exigem defesa técnica.",
  },
  {
    icon: Gauge,
    motion: "spin",
    title: "Multa grave na Provisória",
    text: "Uma única infração grave ou gravíssima pode impedir a emissão da CNH definitiva.",
  },
  {
    icon: Car,
    motion: "drive",
    title: "Restrição ou Busca e Apreensão",
    text: "Bloqueio RENAJUD ou ordem de apreensão: agir rápido protege o seu patrimônio.",
  },
];

export function Urgency() {
  return (
    <section id="urgencias" className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-28">
      <Photo
        id={PHOTOS.spHighway}
        alt=""
        widths={[960, 1440, 1920]}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900 via-navy-900/85 to-navy-900" />

      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle
            dark
            kicker="Situações de urgência"
            title={
              <>
                Recebeu uma notificação? <span className="text-signal-400">O prazo já está correndo.</span>
              </>
            }
            text="Algumas notificações têm prazo curto para defesa. Se você se identificou com uma delas, envie a notificação agora mesmo para análise."
          />
          <Reveal className="shrink-0">
            <Button href={waLink("Olá! Recebi uma notificação de trânsito e quero enviar para análise.")} external icon="whatsapp">
              Enviar minha notificação
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <AutoCarousel
            dark
            label="Situações de urgência"
            items={ITEMS}
            getKey={(it) => it.title}
            gap={16}
            interval={3800}
            render={(it) => (
              <div className="card-lift group h-full rounded-2xl border border-white/10 bg-navy-800/80 p-7 backdrop-blur hover:border-brand-500/50 hover:bg-navy-700 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)]">
                <IconBadge icon={it.icon} motion={it.motion} dark />
                <h3 className="mt-5 text-[17px] font-bold text-white">{it.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{it.text}</p>
              </div>
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}
