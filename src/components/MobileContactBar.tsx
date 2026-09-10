import { Calendar, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { portfolioData } from '@/data/portfolio';
import { playSound } from '@/utils/sound';

export default function MobileContactBar() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#070b22]/95 backdrop-blur-lg border-t border-cyan-500/20 p-3 shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={portfolioData.contact.calendly}
          target="_blank"
          rel="noreferrer"
          onClick={() => playSound('click')}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 active:scale-95 text-white font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/25"
        >
          <Calendar className="w-4 h-4" />
          <span>{isEs ? 'Agendar Entrevista' : 'Schedule Call'}</span>
        </a>
        <a
          href={`mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(
            isEs ? 'Contacto / Vacante Mario González' : 'Job Opportunity Mario González'
          )}`}
          className="inline-flex items-center justify-center p-3 glass text-slate-200 border border-white/10 rounded-xl active:scale-95"
          title="Enviar Correo"
        >
          <Mail className="w-4 h-4 text-cyan-400" />
        </a>
      </div>
    </div>
  );
}
