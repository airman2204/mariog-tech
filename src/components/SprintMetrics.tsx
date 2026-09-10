import { useEffect, useRef, useState } from 'react';
import { Clock, Rocket, Award, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useLanguage, translations } from '@/context/LanguageContext';

const iconMap = { clock: Clock, rocket: Rocket, award: Award };

function StatCard({
  stat,
  index,
  reducedLabel,
  boostedLabel,
}: {
  stat: (typeof translations.es.metrics.stats)[0];
  index: number;
  reducedLabel: string;
  boostedLabel: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? Clock;
  const isNegative = stat.value < 0;
  const TrendIcon = isNegative ? TrendingDown : TrendingUp;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let frame: number;
    const duration = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(stat.value * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [visible, stat.value]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className="relative glass-card glass-hover rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
      style={{ boxShadow: `0 8px 32px ${stat.color}20` }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 40px ${stat.color}40`; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 8px 32px ${stat.color}20`; }}
      >
        {/* Glow accent */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"
          style={{ background: stat.color }}
        />

        {/* Icon */}
        <div className="relative flex items-center justify-between mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}40` }}
          >
            <Icon className="w-7 h-7" style={{ color: stat.color }} strokeWidth={2} />
          </div>
          <div
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: `${stat.color}15`, color: stat.color }}
          >
            <TrendIcon className="w-3.5 h-3.5" />
            {isNegative ? reducedLabel : boostedLabel}
          </div>
        </div>

        {/* Value */}
        <div className="relative mb-2">
          <div className="text-5xl font-display font-bold" style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}40` }}>
            {stat.value > 0 && '+'}{displayValue}{stat.suffix}
          </div>
        </div>

        {/* Label */}
        <h3 className="text-lg font-display font-bold text-white mb-2">
          {stat.label}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          {stat.description}
        </p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-1 rounded-b-3xl transition-all duration-1000 ease-out"
          style={{
            width: visible ? '100%' : '0%',
            background: `linear-gradient(90deg, ${stat.color}, transparent)`,
            transitionDelay: `${index * 200 + 400}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function SprintMetrics() {
  const { t } = useLanguage();

  return (
    <section id="metrics" className="relative py-24 bg-mission-control overflow-hidden">
      {/* Subtle Project Management Floating Accents (Sprint Cycle & Gantt Bars) */}
      <div className="absolute top-10 right-10 pointer-events-none opacity-20 hidden md:block">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="spin-slow">
          <circle cx="50" cy="50" r="38" stroke="url(#pm-grad-cyan)" strokeWidth="3" strokeDasharray="6 6" />
          <path d="M50 12 A38 38 0 0 1 88 50" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" markerEnd="url(#arrow-cyan)" />
          <path d="M50 88 A38 38 0 0 1 12 50" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="12" r="4" fill="#06b6d4" />
          <circle cx="88" cy="50" r="4" fill="#06b6d4" />
          <circle cx="50" cy="88" r="4" fill="#8b5cf6" />
          <circle cx="12" cy="50" r="4" fill="#8b5cf6" />
          <defs>
            <linearGradient id="pm-grad-cyan" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-10 left-10 pointer-events-none opacity-20 hidden md:block">
        <svg width="110" height="90" viewBox="0 0 110 90" fill="none" className="float-anim">
          {/* Mini Gantt / Timeline bars */}
          <rect x="10" y="15" width="45" height="10" rx="5" fill="#8b5cf6" fillOpacity="0.7" />
          <rect x="40" y="38" width="60" height="10" rx="5" fill="#06b6d4" fillOpacity="0.7" />
          <rect x="70" y="62" width="30" height="10" rx="5" fill="#10b981" fillOpacity="0.7" />
          {/* Dependency link */}
          <path d="M55 25 L55 35 L40 43" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M100 48 L100 58 L70 67" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            {t.metrics.title} <span className="gradient-text-mix">{t.metrics.titleHighlight}</span>
          </h2>
        </div>

        {/* Content: Mario in Chair 3D Avatar (Left) + Stat cards (Right) */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Mario in Chair 3D Avatar column (Left) */}
          <div className="lg:col-span-5 flex items-center justify-center relative order-2 lg:order-1">
            <div className="relative w-full max-w-[440px] aspect-[4/5] flex items-center justify-center">
              {/* Radial glow background */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/25 via-purple-600/20 to-orange-500/15 blur-3xl pulse-ring" />
              
              {/* Holographic floor disc */}
              <div className="absolute bottom-6 w-64 h-16 bg-cyan-500/20 rounded-[50%] blur-xl" />
              <div className="absolute bottom-4 w-72 h-14 border border-cyan-400/30 rounded-[50%]" />

              {/* Silla 3D Image */}
              <img
                src="/silla.png"
                alt="Mario González en Oficina / Gestión de Proyectos"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_25px_40px_rgba(6,182,212,0.4)] float-anim hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Stat cards column (Right) */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
            {t.metrics.stats.map((stat, i) => (
              <StatCard
                key={i}
                stat={stat}
                index={i}
                reducedLabel={t.metrics.reduced}
                boostedLabel={t.metrics.boosted}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
