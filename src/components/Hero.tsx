import { useState } from 'react';
import { FileDown, LayoutGrid, ChevronDown, CalendarDays, Users, Target, Eye } from 'lucide-react';
import CommandCenter from './CommandCenter';
import CvPreviewModal from './CvPreviewModal';
import { useLanguage } from '@/context/LanguageContext';
import { playSound } from '@/utils/sound';

export default function Hero() {
  const { t } = useLanguage();
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-12 overflow-hidden bg-mission-control bg-grid"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Project management signal icons */}
      <div className="absolute top-[18%] right-[6%] float-anim opacity-80">
        <div className="flex items-center gap-2 px-3 py-2 glass rounded-xl border border-cyan-400/20">
          <CalendarDays className="w-5 h-5 text-cyan-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Sprint plan</span>
        </div>
      </div>
      <div className="absolute bottom-[18%] left-[4%] float-anim-slow opacity-80">
        <div className="flex items-center gap-2 px-3 py-2 glass rounded-xl border border-purple-400/20">
          <Users className="w-5 h-5 text-purple-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Team sync</span>
        </div>
      </div>
      <div className="absolute top-[55%] right-[2%] float-anim opacity-80" style={{ animationDelay: '1s' }}>
        <div className="flex items-center gap-2 px-3 py-2 glass rounded-xl border border-orange-400/20">
          <Target className="w-5 h-5 text-orange-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-300">Delivery goal</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
        {/* Left: text content */}
        <div className="slide-up text-center lg:text-left order-2 lg:order-1">
          {/* Status badge: Disponibilidad para Reclutadores */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 glass rounded-full mb-6 border border-green-500/30 bg-green-950/20 shadow-lg shadow-green-500/10">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 shadow-md shadow-green-400/50" />
            </span>
            <span className="text-sm sm:text-base font-extrabold text-green-400 tracking-wide uppercase">
              {t.hero.availability}
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white mb-6">
            MARIO<br />
            <span className="gradient-text-mix">GONZÁLEZ</span>
          </h1>

          <p className="text-base text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {t.hero.intro}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
            <button
              onClick={() => {
                playSound('click');
                setCvModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl btn-glow glow-cyan text-sm sm:text-base shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Eye className="w-5 h-5" />
              <span>{t.hero.downloadCv}</span>
            </button>
            <button
              onClick={() => {
                playSound('click');
                scrollTo('#cases');
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-xl btn-glow border border-white/20 hover:bg-white/15 text-sm sm:text-base transition-all"
            >
              <LayoutGrid className="w-5 h-5" />
              <span>{t.hero.exploreProjects}</span>
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 mt-10 justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <div className="text-3xl font-display font-bold gradient-text-cyan">7+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{t.hero.statsYears}</div>
            </div>
            <div className="w-px bg-slate-700" />
            <div className="text-center lg:text-left">
              <div className="text-3xl font-display font-bold gradient-text-purple">{t.hero.statsScrum}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{t.hero.statsScrumSub}</div>
            </div>
            <div className="w-px bg-slate-700" />
            <div className="text-center lg:text-left">
              <div className="text-3xl font-display font-bold gradient-text-orange">{t.hero.statsAi}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{t.hero.statsAiSub}</div>
            </div>
          </div>
        </div>

        {/* Right: 3D Command Center */}
        <div className="relative order-1 lg:order-2 h-full flex items-center justify-center">
          {/* Holographic platform */}
          <div className="relative w-full h-full min-h-[500px] lg:min-h-[580px] flex items-center justify-center">
            {/* Glow disc */}
            <div className="absolute bottom-4 w-72 h-20 bg-cyan-500/25 rounded-full blur-3xl" />
            <div className="absolute bottom-4 w-56 h-16 bg-purple-500/25 rounded-full blur-2xl" />

            {/* Hex platform */}
            <div className="absolute bottom-2 w-64 h-16 hexagon bg-gradient-to-b from-slate-700/60 to-slate-900/80 border border-cyan-500/30" />

            <CommandCenter />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#metrics')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors"
      >
        <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>

      {/* CV Quick View Modal */}
      <CvPreviewModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </section>
  );
}
