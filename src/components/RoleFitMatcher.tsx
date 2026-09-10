import { useState } from 'react';
import { Check, ShieldCheck, Briefcase, Zap, Cpu, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { playSound } from '@/utils/sound';

type RoleMatch = {
  id: string;
  roleName: string;
  icon: typeof Briefcase;
  tag: string;
  color: string;
  bullets: string[];
  tools: string[];
};

export default function RoleFitMatcher() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const roles: RoleMatch[] = [
    {
      id: 'it-pm',
      roleName: 'IT Project Manager',
      icon: Briefcase,
      tag: isEs ? 'Liderazgo End-to-End' : 'End-to-End Governance',
      color: '#06b6d4',
      bullets: isEs
        ? [
            'Gestión integral de alcance, tiempo y presupuesto para software corporativo (GNP Seguros vía Badak).',
            'Coordinación directa con la PMO y clientes asegurando entregas contractuales a tiempo y sin fricción.',
            'Manejo de WBS, ruta crítica, matrices de riesgos y control de calidad en Jira.',
          ]
        : [
            'End-to-end scope, budget, and timeline governance for enterprise software (GNP Seguros via Badak).',
            'Direct alignment with client PMOs ensuring 100% on-time milestone delivery without friction.',
            'Proficient in WBS planning, critical path analysis, risk matrices, and Jira quality control.',
          ],
      tools: ['PMBOK', 'Jira', 'WBS', 'SLA Management', 'Budgeting'],
    },
    {
      id: 'scrum-master',
      roleName: 'Scrum Master / Agile Lead',
      icon: ShieldCheck,
      tag: isEs ? 'Certificado SFPC #92706455' : 'Certified SFPC #92706455',
      color: '#8b5cf6',
      bullets: isEs
        ? [
            'Facilitación de ceremonias ágiles: Sprint Planning, Dailies, Reviews y Retrospectivas efectivas.',
            'Aumento comprobable del 30% en velocidad de entrega de los equipos en Niku Tecnología.',
            'Desbloqueo activo de impedimentos técnicos y blindaje del equipo ante distracciones de alcance.',
          ]
        : [
            'Facilitator of high-impact Agile rituals: Planning, Dailies, Reviews, and Retrospectives.',
            'Demonstrated 30% increase in sprint engineering velocity at Niku Tecnología.',
            'Active impediment remover, shielding engineering squads from scope creep and noise.',
          ],
      tools: ['Scrum (SFPC)', 'Kanban', 'Velocity Tracking', 'Story Points', 'Miro'],
    },
    {
      id: 'pmo-automation',
      roleName: 'PMO Lead & Automation Specialist',
      icon: Cpu,
      tag: isEs ? 'Ahorro de Tiempo -40%' : '-40% Time Overhead Saved',
      color: '#10b981',
      bullets: isEs
        ? [
            'Automatización de reportes semanales con Google Apps Script y Python reduciendo 40% de tiempo manual.',
            'Creación de dashboards ejecutivos para stakeholders eliminando tareas repetitivas y errores de captura.',
            'Integración de Agentes de Inteligencia Artificial (LangFlow) para seguimiento de tareas y CRM.',
          ]
        : [
            'Automated weekly PMO reporting with Google Apps Script & Python, saving 40% admin hours.',
            'Built real-time executive visibility dashboards eliminating repetitive reporting errors.',
            'Integrated AI Agents (LangFlow) and scripting pipelines for CRM and deliverable triage.',
          ],
      tools: ['Python', 'Google Apps Script', 'LangFlow', 'AI Agents', 'Automation'],
    },
  ];

  const [activeRole, setActiveRole] = useState<string>('it-pm');
  const current = roles.find((r) => r.id === activeRole) || roles[0];

  return (
    <div className="relative max-w-7xl mx-auto px-6 mb-16">
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-[#0d1235]/80">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
              <Zap className="w-4 h-4" />
              {isEs ? 'Compatibilidad Inmediata con tu Vacante' : 'Role Matcher for Recruiters'}
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              {isEs ? '¿Qué posición buscas cubrir hoy?' : 'Which role are you hiring for?'}
            </h3>
          </div>

          {/* Quick Schedule Call CTA */}
          <a
            href="https://calendly.com/magc2204"
            target="_blank"
            rel="noreferrer"
            onClick={() => playSound('click')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105"
          >
            <span>{isEs ? 'Entrevistar a Mario (15 min)' : 'Schedule Interview (15 min)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          {roles.map((item) => {
            const Icon = item.icon;
            const isSelected = item.id === activeRole;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playSound('click');
                  setActiveRole(item.id);
                }}
                className={`flex items-center gap-3 p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#172054] to-[#1e2a73] border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                    : 'glass hover:bg-white/5 border-white/5 text-slate-300'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${item.color}20`,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {item.roleName}
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-400">{item.tag}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Deep-Dive Card */}
        <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
            {isEs ? 'Por qué Mario es el match ideal para este rol:' : 'Why Mario matches this role:'}
          </h4>

          <ul className="space-y-2.5 mb-4">
            {current.bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
            <span className="text-xs font-bold uppercase text-slate-400 mr-2">
              {isEs ? 'Tecnologías Clave:' : 'Core Stack:'}
            </span>
            {current.tools.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 text-slate-300 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
