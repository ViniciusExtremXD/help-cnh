import { motion } from "framer-motion";
import { ArrowUp, MapPin } from "lucide-react";
import { NAV_LINKS, waLink } from "../config";
import { Item, Stagger } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-obsidian/90 pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-400/0 via-emerald-400/50 to-amber-400/0"
      />
      <Stagger className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <Item>
          <Wordmark size="lg" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
            Defesa especializada do motorista: CNH suspensa ou cassada, Lei Seca, CNH provisória, recursos de multas,
            RENAJUD e busca e apreensão. Nós assumimos a burocracia, você continua no volante.
          </p>
        </Item>

        <Item>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Navegação</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
                >
                  <span className="h-px w-3 bg-emerald-400/50 transition-all group-hover:w-5 group-hover:bg-emerald-400" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Item>

        <Item>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">Atendimento</p>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-emerald-300"
              >
                <motion.span
                  className="inline-flex text-emerald-400"
                  animate={{ rotate: [0, -12, 12, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <WhatsAppIcon size={17} />
                </motion.span>
                WhatsApp — Plantão de Atendimento
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <motion.span
                className="inline-flex text-emerald-400"
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                <MapPin size={17} />
              </motion.span>
              Atendimento digital em todo o Brasil
            </li>
          </ul>
        </Item>
      </Stagger>

      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <p className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-xs leading-relaxed text-white/45">
          <strong className="font-semibold text-white/65">Aviso legal:</strong> a Help Soluções e CNH é uma empresa de
          prestação de serviços e assessoria administrativa especializada em demandas de trânsito. Não somos órgão
          público e não possuímos vínculo com DETRAN, CONTRAN, JARI, CETRAN ou demais órgãos de trânsito. Cada caso é
          analisado individualmente e o resultado depende da decisão dos órgãos competentes.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] px-4 py-6 text-xs text-white/40 sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} Help Soluções e CNH. Todos os direitos reservados.</p>
        <motion.a
          href="#topo"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-white/60 hover:text-white"
        >
          Voltar ao topo
          <motion.span className="inline-flex" animate={{ y: [0, -3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ArrowUp size={14} />
          </motion.span>
        </motion.a>
      </div>
    </footer>
  );
}
