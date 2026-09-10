import { useEffect, useState } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { isSoundMuted, toggleSound, playSound } from '@/utils/sound';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(!isSoundMuted());
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: '#hero' },
    { label: t.nav.metrics, href: '#metrics' },
    { label: t.nav.experience, href: '#kanban' },
    { label: language === 'es' ? 'Casos' : 'Cases', href: '#cases' },
    { label: t.nav.copilot, href: '#copilot' },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3 shadow-lg shadow-black/30' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollTo('#hero')} className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all">
            <img
              src="/logo_icon.png"
              alt="mariog.tech logo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="font-display font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
            MARIO G<span className="text-cyan-400">.</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-3.5 py-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </button>
          ))}

          {/* LANGUAGE TOGGLE SWITCH (ES / EN) */}
          <div className="flex items-center bg-slate-900/80 border border-slate-700/80 rounded-xl p-1 mx-2 shadow-inner">
            <button
              onClick={() => setLanguage('es')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                language === 'es'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇲🇽 ES</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇺🇸 EN</span>
            </button>
          </div>

          {/* SOUND EFFECTS TOGGLE */}
          <button
            onClick={() => {
              const active = toggleSound();
              setSoundOn(active);
            }}
            title={soundOn ? 'Efectos de sonido activos (clic para silenciar)' : 'Sonido silenciado (clic para activar)'}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-400 hover:text-cyan-400 transition-colors mr-1"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="ml-1 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl btn-glow glow-cyan"
          >
            {t.nav.contact}
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-3 mx-4 p-4 glass-card rounded-2xl">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-cyan-400 rounded-lg transition-all"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
