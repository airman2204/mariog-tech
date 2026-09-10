import { MapPin, Mail, Linkedin, Github, Radar } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  const navLinks = [
    { label: t.nav.about, href: '#hero' },
    { label: t.nav.metrics, href: '#metrics' },
    { label: t.nav.experience, href: '#kanban' },
    { label: t.nav.copilot, href: '#copilot' },
  ];

  return (
    <footer id="contact" className="relative bg-[#070a1c] border-t border-white/5 py-16 overflow-hidden">
      {/* Subtle PM milestone connector nodes */}
      <div className="absolute -top-6 right-12 pointer-events-none opacity-10 hidden md:block">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <circle cx="20" cy="30" r="6" fill="#8b5cf6" />
          <line x1="26" y1="30" x2="54" y2="30" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="60" cy="30" r="6" fill="#06b6d4" />
          <line x1="66" y1="30" x2="94" y2="30" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="100" cy="30" r="6" fill="#10b981" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-purple-500/20 border border-purple-500/30">
                <img
                  src="/logo_icon.png"
                  alt="mariog.tech logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display font-bold text-lg text-white">
                MARIO G<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.about}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-cyan-400 mb-4">
              {t.footer.navigate}
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors text-left w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-cyan-400 mb-4">
              {t.footer.contact}
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-purple-400" />
                {t.footer.location}
              </div>
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                {portfolioData.contact.email}
              </a>
              <div className="flex gap-3 mt-2">
                <a
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-cyan-500/20 flex items-center justify-center transition-all hover:-translate-y-1 border border-white/10 hover:border-cyan-500/30"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-slate-300" />
                </a>
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-purple-500/20 flex items-center justify-center transition-all hover:-translate-y-1 border border-white/10 hover:border-purple-500/30"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-slate-300" />
                </a>
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-orange-500/20 flex items-center justify-center transition-all hover:-translate-y-1 border border-white/10 hover:border-orange-500/30"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-slate-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 bg-green-500 rounded-full blink" />
            {t.footer.systemStatus}
          </div>
        </div>
      </div>
    </footer>
  );
}
