import { ClipboardList, Users2, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function DeliveryPlaybook() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const steps = [
    {
      step: '01',
      title: isEs ? 'Backlog & Refinamiento' : 'Backlog & Refinement',
      icon: ClipboardList,
      color: '#06b6d4',
      description: isEs
        ? 'Definición de requerimientos con criterios de aceptación claros (DoD), priorización por valor de negocio y eliminación de ambigüedades antes del sprint.'
        : 'Requirements scoped with precise Definition of Done (DoD), prioritized by business value to eliminate ambiguity before sprint kickoff.',
    },
    {
      step: '02',
      title: isEs ? 'Sprint Planning & Estimación' : 'Sprint Planning & Sizing',
      icon: Users2,
      color: '#8b5cf6',
      description: isEs
        ? 'Estimación ágil con Story Points acorde a la velocidad histórica del squad, balanceando compromisos de entrega sin sobrecargar a los desarrolladores.'
        : 'Story Point sizing calibrated against historical team velocity, balancing commitments without developer burnout.',
    },
    {
      step: '03',
      title: isEs ? 'Ejecución & Bloqueos <24h' : 'Execution & Fast Unblocking',
      icon: ShieldAlert,
      color: '#f59e0b',
      description: isEs
        ? 'Dailies concisas enfocadas en bloqueos técnicos. Negociación proactiva de dependencias y mitigación de riesgos con clientes y la PMO.'
        : 'Laser-focused daily syncs targeting impediments. Proactive stakeholder negotiations to remove roadblocks in under 24 hours.',
    },
    {
      step: '04',
      title: isEs ? 'Reportes Automáticos & Entrega' : 'Automated Reports & Delivery',
      icon: Sparkles,
      color: '#10b981',
      description: isEs
        ? 'Generación automatizada de reportes con Python y Apps Script. Trazabilidad total de calidad, demo con clientes y retrospectiva orientada a la mejora continua.'
        : 'Automated reporting via Python & Apps Script pipelines. End-to-end defect traceability, client demos, and continuous retrospective improvements.',
    },
  ];

  return (
    <section id="methodology" className="relative py-20 bg-[#090e29] border-t border-white/5 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm font-bold uppercase tracking-wider mb-4 text-purple-400 border border-purple-500/20">
            <CheckCircle2 className="w-4 h-4" />
            {isEs ? 'Playbook de Entrega' : 'Delivery Playbook'}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            {isEs ? '¿Cómo lidero y entrego un' : 'How I Lead & Deliver a'} <span className="gradient-text-mix">{isEs ? 'Proyecto de Software?' : 'Software Project'}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm">
            {isEs
              ? 'Un marco de trabajo probado que combina disciplina ágil, eliminación de fricciones y automatización de procesos para garantizar entregas en tiempo.'
              : 'A proven delivery framework combining agile rigor, zero bureaucracy, and automated reporting to ensure on-time outcomes.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-2xl font-black font-mono tracking-wider"
                    style={{ color: s.color }}
                  >
                    {s.step}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${s.color}20`, border: `1px solid ${s.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                </div>

                <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-cyan-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
