import { motion } from "framer-motion";
import { Car, FileWarning, Gauge, Scale, ShieldAlert, Siren, type LucideIcon } from "lucide-react";
import { waLink } from "../config";
import { PHOTOS } from "../data/photos";
import { Button } from "./ui/Button";
import { Photo } from "./ui/Photo";
import { Reveal, RevealGroup, fadeUp } from "./ui/Reveal";
import { SectionTitle } from "./ui/SectionTitle";

const ITEMS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: FileWarning,
    title: "Notificação de Autuação",
    text: "Abre o prazo para a Defesa Prévia e para a indicação do condutor.",
  },
  {
    icon: Scale,
    title: "Notificação de Penalidade",
    text: "A multa foi aplicada, mas ainda cabe recurso à JARI e, depois, ao CETRAN.",
  },
  {
    icon: ShieldAlert,
    title: "Processo de Suspensão instaurado",
    text: "Pontos no limite ou infração autossuspensiva: a defesa preserva seu direito de dirigir.",
  },
  {
    icon: Siren,
    title: "Autuação na Lei Seca",
    text: "Bafômetro ou recusa ao teste: multa elevada e suspensão exigem defesa técnica.",
  },
  {
    icon: Gauge,
    title: "Multa grave na Provisória",
    text: "Uma única infração grave ou gravíssima pode impedir a emissão da CNH definitiva.",
  },
  {
    icon: Car,
    title: "Restrição ou Busca e Apreensão",
    text: "Bloqueio RENAJUD ou ordem de apreensão: agir rápido protege o seu patrimônio.",
  },
];

export function Urgency() {
  return (
    <section id="urgencias" className="relative isolate overflow-hidden bg-navy-900 py-20 sm:py-28">
      <Photo
        id={PHOTOS.trafficNight}
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
            <Button
              href={waLink("Olá! Recebi uma notificação de trânsito e quero enviar para análise.")}
              external
              icon="whatsapp"
            >
              Enviar minha notificação
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="group bg-navy-900/90 p-7 transition-colors duration-300 hover:bg-navy-800"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-signal-500/30 bg-signal-500/10 text-signal-400 transition-colors duration-300 group-hover:border-brand-500/40 group-hover:bg-brand-500/15 group-hover:text-brand-400">
                  <it.icon size={21} />
                </span>
                <h3 className="text-[17px] font-bold text-white">{it.title}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{it.text}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
