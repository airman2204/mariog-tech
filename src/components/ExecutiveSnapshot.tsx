import { Clock, Globe, Award, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ExecutiveSnapshot() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <div className="relative max-w-7xl mx-auto px-6 -mt-6 sm:-mt-10 mb-14 z-20">
      <div className="glass-card rounded-2xl p-3 sm:p-5 border border-cyan-500/30 bg-[#0c112e]/90 shadow-xl shadow-cyan-500/10 backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:divide-x divide-white/10">
          
          {/* Card 1: Experience */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isEs ? 'Trayectoria IT' : 'Track Record'}
              </p>
              <p className="text-sm font-bold text-white leading-tight">
                7+ {isEs ? 'Años en Software' : 'Years in Software'}
              </p>
              <p className="text-[11px] text-cyan-300/80">Badak (Cliente GNP) • Niku Tech</p>
            </div>
          </div>

          {/* Card 2: Certification */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center flex-shrink-0 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isEs ? 'Certificación Ágil' : 'Agile Credential'}
              </p>
              <a
                href="https://certiprof.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-purple-300 hover:text-white transition-colors flex items-center gap-1 leading-tight"
                title="CertiProf #92706455"
              >
                Scrum SFPC
                <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
              </a>
              <p className="text-[11px] text-slate-400">CertiProf ID: 92706455</p>
            </div>
          </div>

          {/* Card 3: Languages */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isEs ? 'Nivel de Idioma' : 'Language'}
              </p>
              <p className="text-sm font-bold text-white leading-tight">
                {isEs ? 'Inglés B2 Profesional' : 'English B2 (Proficient)'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isEs ? 'Equipos Globales / Remotos' : 'Global Squads Sync'}
              </p>
            </div>
          </div>

          {/* Card 4: Availability */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0 text-green-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isEs ? 'Disponibilidad' : 'Availability'}
              </p>
              <p className="text-sm font-bold text-green-400 leading-tight">
                {isEs ? 'Inmediata' : 'Immediate Start'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isEs ? 'Remoto / Híbrido (MX-Global)' : 'Remote / Hybrid (Global)'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
