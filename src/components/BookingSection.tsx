import { useState } from 'react';
import { Calendar, Linkedin, Copy, Check, Sparkles, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { portfolioData } from '@/data/portfolio';

export default function BookingSection() {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isEs = language === 'es';

  return (
    <section id="booking" className="relative py-20 bg-[#090d24] overflow-hidden border-t border-b border-white/5">
      {/* Background neon ambient lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-cyan-500/30 relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
          {/* Header Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {isEs ? 'Contacto Directo & Entrevistas' : 'Direct Contact & Discovery Call'}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 blink" />
              {isEs ? 'Respuesta en menos de 24 horas' : 'Responds in < 24 hours'}
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Left Col: Pitch & Availability */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                {t.booking.ctaTitle}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {t.booking.ctaSubtitle}
              </p>

              {/* Direct Highlights */}
              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                <div className="glass rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    {isEs ? 'Zona Horaria' : 'Timezone'}
                  </div>
                  <p className="text-white text-sm font-semibold">CST (UTC-6) / Remoto</p>
                </div>
                <div className="glass rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {isEs ? 'Ubicación' : 'Location'}
                  </div>
                  <p className="text-white text-sm font-semibold">Puebla, MX • Global</p>
                </div>
                <div className="glass rounded-xl p-3 border border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {isEs ? 'Modalidad' : 'Work Mode'}
                  </div>
                  <p className="text-white text-sm font-semibold">{isEs ? 'Remoto / Híbrido' : 'Remote / Hybrid'}</p>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive CTAs */}
            <div className="lg:col-span-2 flex flex-col gap-3.5 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isEs ? 'Acciones Rápidas' : 'Quick Actions'}
              </p>

              {/* Calendly Direct Scheduling Button */}
              <a
                href={portfolioData.contact.calendly}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <Calendar className="w-4 h-4" />
                {t.booking.btnSchedule}
                <ArrowUpRight className="w-4 h-4 opacity-75" />
              </a>

              {/* Copy Email Button with feedback */}
              <button
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 glass hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-cyan-500/40 transition-all text-sm group"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">{t.booking.copiedEmail}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span>{portfolioData.contact.email}</span>
                  </>
                )}
              </button>

              {/* LinkedIn Direct Link */}
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-slate-300 hover:text-white glass hover:bg-purple-500/10 font-medium rounded-xl border border-transparent hover:border-purple-500/30 transition-all text-xs"
              >
                <Linkedin className="w-3.5 h-3.5 text-purple-400" />
                {t.booking.openLinkedIn}
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
