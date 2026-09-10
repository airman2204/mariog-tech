import { useState } from 'react';
import { Award, TrendingUp, CheckCircle, ArrowRight, Zap, Code, ShieldCheck, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { playSound } from '@/utils/sound';

type CaseStudy = {
  id: string;
  client: string;
  role: string;
  period: string;
  badge: string;
  badgeColor: string;
  title: string;
  metric: string;
  metricLabel: string;
  situation: string;
  action: string;
  result: string;
  stack: string[];
};

export default function CaseStudies() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const cases: CaseStudy[] = [
    {
      id: 'gnp',
      client: 'GNP Seguros (Vía Badak)',
      role: 'IT Project Manager',
      period: '2024 - 2026',
      badge: isEs ? 'Fábrica de Software' : 'Software Factory',
      badgeColor: '#06b6d4',
      title: isEs
        ? 'Automatización del Reporteo PMO y Control de Entregas'
        : 'PMO Reporting Automation & Delivery Governance',
      metric: '-40%',
      metricLabel: isEs ? 'Tiempo en generación de reportes' : 'Time spent generating reports',
      situation: isEs
        ? 'La generación manual de reportes semanales y seguimiento de compromisos consumía horas clave y generaba riesgo de inconsistencias con la PMO del cliente asegurador.'
        : 'Manual weekly reporting and commitment tracking consumed valuable hours and introduced consistency risks with the insurer\'s PMO.',
      action: isEs
        ? 'Diseñé e implementé scripts automatizados en Google Apps Script y Python conectados a fuentes de datos, estandarizando el control de avance, ceremonias diarias y gestión de defectos en Jira.'
        : 'Architected and deployed automated pipelines using Google Apps Script and Python, standardizing milestone reports, daily standups, and Jira defect tracking.',
      result: isEs
        ? 'Reducción del 40% en tiempo administrativo, 100% de cumplimiento en compromisos contractuales y visibilidad ejecutiva en tiempo real para stakeholders.'
        : '40% reduction in admin overhead, 100% compliance with contractual milestones, and real-time executive visibility for key stakeholders.',
      stack: ['Google Apps Script', 'Python', 'Jira', 'PMBOK', 'Agile'],
    },
    {
      id: 'niku',
      client: 'Niku Tecnología S.A. de C.V.',
      role: 'Project Lead Manager',
      period: '2020 - 2023',
      badge: isEs ? 'Scrum & IA Pipeline' : 'Scrum & AI Pipeline',
      badgeColor: '#8b5cf6',
      title: isEs
        ? 'Adopción del Marco Scrum e Integración de Agentes de IA'
        : 'Scrum Adoption & Custom AI Agent Integration',
      metric: '+30%',
      metricLabel: isEs ? 'Velocidad de entrega en sprints' : 'Sprint delivery velocity boost',
      situation: isEs
        ? 'Equipos de desarrollo con cuellos de botella en definición de tareas, sincronización de sprints y actualización manual de datos en CRM.'
        : 'Development squads experienced bottlenecks in task definitions, sprint synchronization, and manual CRM record keeping.',
      action: isEs
        ? 'Implementé el marco Scrum (SFPC), coordiné ceremonias ágiles, y desarrollé agentes de IA junto con scripts para automatizar la asignación y enriquecimiento de datos.'
        : 'Rolled out the Scrum framework (SFPC), facilitated agile rituals, and built AI agents & scripts to automate task triage and CRM enrichment.',
      result: isEs
        ? 'Aumento del 30% en velocidad de entrega de sprints, menor tiempo de ciclo y optimización significativa en los flujos operativos de soporte.'
        : '30% increase in sprint delivery velocity, shorter lead times, and streamlined operations across technical support.',
      stack: ['Scrum (SFPC)', 'Agentes IA', 'Python', 'CRM Automation', 'Kanban'],
    },
    {
      id: 'multimedia',
      client: isEs ? 'Proyectos Multimedia & Interactivos' : 'Interactive Multimedia Ventures',
      role: 'Lead Project Manager',
      period: '2017 - 2020',
      badge: isEs ? 'Experiencias Digitales' : 'Digital Experiences',
      badgeColor: '#10b981',
      title: isEs
        ? 'Gestión Integral de Proyectos Tecnológicos Interactivos'
        : 'End-to-End Governance of Interactive Tech Projects',
      metric: '100%',
      metricLabel: isEs ? 'Entregas a tiempo y en presupuesto' : 'On-time & on-budget milestone completion',
      situation: isEs
        ? 'Proyectos de software interactivo de alta exigencia gráfica y funcional con plazos de lanzamiento inflexibles para eventos y marcas.'
        : 'High-stakes interactive multimedia software with strict, non-negotiable launch deadlines for public events and brand showcases.',
      action: isEs
        ? 'Aplicación rigurosa de WBS, ruta crítica, control de riesgos y comunicación constante con clientes interdisciplinarios (diseño, 3D y programación).'
        : 'Applied rigorous WBS, critical path analysis, risk buffers, and close alignment between 3D artists, designers, and software engineers.',
      result: isEs
        ? 'Entrega exitosa de experiencias interactivas con cero retrasos y máxima satisfacción de clientes y usuarios finales.'
        : 'Flawless rollout with zero launch delays and outstanding stakeholder satisfaction scores.',
      stack: ['Critical Path', 'Scope Governance', 'Risk Matrix', 'QA Testing'],
    },
  ];

  const [activeCase, setActiveCase] = useState<string>('gnp');
  const selected = cases.find((c) => c.id === activeCase) || cases[0];

  return (
    <section id="cases" className="relative py-24 bg-[#080c22] overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm font-bold uppercase tracking-wider mb-4 text-cyan-400 border border-cyan-500/20">
            <Award className="w-4 h-4" />
            {isEs ? 'Casos de Éxito & Resultados STAR' : 'Case Studies & STAR Results'}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            {isEs ? 'Impacto Cuantificable en' : 'Quantifiable Business'} <span className="gradient-text-mix">{isEs ? 'Proyectos Reales' : 'Impact'}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {isEs
              ? 'Resultados demostrables mediante el marco STAR (Situación, Tarea, Acción, Resultado) en empresas de software y sector asegurador.'
              : 'Measurable outcomes structured via the STAR method across software factories and enterprise insurance environments.'}
          </p>
        </div>

        {/* Interactive Case Studies Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Case Study Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {cases.map((item) => {
              const isActive = item.id === activeCase;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSound('click');
                    setActiveCase(item.id);
                  }}
                  className={`text-left p-5 rounded-2xl transition-all border relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#141b44] to-[#1a235c] border-cyan-500/50 shadow-xl shadow-cyan-500/10'
                      : 'glass hover:bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${item.badgeColor}20`,
                        color: item.badgeColor,
                        border: `1px solid ${item.badgeColor}40`,
                      }}
                    >
                      {item.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{item.period}</span>
                  </div>

                  <h3 className={`font-display font-bold text-base mb-1 transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {item.client}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-3">{item.role}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-slate-400 font-semibold">
                      {isEs ? 'Logro clave:' : 'Key Metric:'}{' '}
                      <strong className="text-cyan-300 font-bold">{item.metric}</strong>
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-cyan-400' : 'text-slate-500'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Case Study Card (STAR Breakdown) */}
          <div className="lg:col-span-8">
            <div className="glass-card rounded-3xl p-6 sm:p-9 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
              {/* Top Banner Metric */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {selected.client} • {selected.period}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                    {selected.title}
                  </h3>
                </div>

                {/* Big Metric Badge */}
                <div className="flex items-center gap-3 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 px-5 py-3 rounded-2xl shadow-lg">
                  <div className="text-3xl sm:text-4xl font-display font-black text-cyan-400">
                    {selected.metric}
                  </div>
                  <div className="text-xs text-slate-300 font-medium max-w-[130px] leading-tight">
                    {selected.metricLabel}
                  </div>
                </div>
              </div>

              {/* STAR Framework Grid */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Situation & Task */}
                <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    {isEs ? '1. Situación & Reto' : '1. Challenge'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selected.situation}
                  </p>
                </div>

                {/* Action */}
                <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Code className="w-4 h-4" />
                    {isEs ? '2. Acción Ejecutada' : '2. Action Taken'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selected.action}
                  </p>
                </div>

                {/* Result */}
                <div className="bg-black/30 rounded-2xl p-4 border border-emerald-500/20 bg-emerald-950/10">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <TrendingUp className="w-4 h-4" />
                    {isEs ? '3. Resultado Medible' : '3. Measured Outcome'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {selected.result}
                  </p>
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                    {isEs ? 'Herramientas:' : 'Stack:'}
                  </span>
                  {selected.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href="#kanban"
                  onClick={() => playSound('click')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>{isEs ? 'Ver entregables en Kanban' : 'View Kanban milestones'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
