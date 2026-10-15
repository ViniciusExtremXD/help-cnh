import { ArrowUp, MapPin, ShieldCheck, WhatsappLogo } from "@phosphor-icons/react";
import { ADDRESS, COVERAGE, NAV_LINKS, waLink } from "../config";
import { Logo } from "./Logo";

const SERVICES = [
  "CNH Suspensa ou Cassada",
  "Lei Seca / Bafômetro",
  "Multas na CNH Provisória",
  "Recursos de Multas",
  "Restrição RENAJUD",
  "Busca e Apreensão",
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo onDark className="h-16" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Defesa especializada do motorista. Nós assumimos a burocracia, você continua no volante.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold text-white">Serviços</p>
          <ul className="mt-5 space-y-3 text-sm">
            {SERVICES.map((s) => (
              <li key={s}>
                <a href="#servicos" className="transition-colors hover:text-white">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold text-white">Institucional</p>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.filter((l) => l.id !== "servicos").map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contato" className="transition-colors hover:text-white">
                Contato
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold text-white">Atendimento</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-white"
              >
                <WhatsappLogo size={18} weight="fill" className="shrink-0 text-brand-400" />
                WhatsApp — plantão de atendimento
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} weight="fill" className="shrink-0 text-brand-400" />
              {ADDRESS.street}, {ADDRESS.city} · atendimento em {COVERAGE}
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck size={18} weight="fill" className="shrink-0 text-brand-400" />
              Assessoria administrativa em trânsito
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-8">
          <p className="text-xs leading-relaxed text-slate-500">
            <strong className="font-semibold text-slate-300">Aviso legal:</strong> a Help Soluções em CNH é uma empresa de
            prestação de serviços e assessoria administrativa especializada em demandas de trânsito. Não somos órgão
            público e não possuímos vínculo com DETRAN, CONTRAN, JARI, CETRAN ou demais órgãos de trânsito. Cada caso é
            analisado individualmente e o resultado depende da decisão dos órgãos competentes.
          </p>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} Help Soluções em CNH. Todos os direitos reservados.</p>
            <a href="#topo" className="inline-flex items-center gap-2 font-semibold text-slate-300 hover:text-white">
              Voltar ao topo
              <ArrowUp size={14} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
