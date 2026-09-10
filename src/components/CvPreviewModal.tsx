import { useState } from 'react';
import { X, FileDown, Award, CheckCircle, Briefcase, GraduationCap, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { playSound } from '@/utils/sound';

export default function CvPreviewModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [activeTab, setActiveTab] = useState<'summary' | 'experience' | 'skills'>('summary');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#0d1233] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/20 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Mario González • Executive CV Preview
              </h3>
              <p className="text-xs text-slate-400 font-semibold">
                IT Project Manager & AI Automation Specialist
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('summary');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'summary'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEs ? 'Resumen Ejecutivo' : 'Executive Summary'}
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('experience');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'experience'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEs ? 'Trayectoria & Logros' : 'Track Record'}
          </button>
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('skills');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'skills'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEs ? 'Certificaciones & Stack' : 'Certifications & Stack'}
          </button>
        </div>

        {/* Tab 1: Executive Summary */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5 border border-white/10">
              <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">
                {isEs ? 'Perfil Profesional' : 'Professional Profile'}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isEs
                  ? 'IT Project Manager con 7+ años de experiencia liderando desarrollo de software para fábricas (GNP Seguros vía Badak), startups y proyectos interactivos. Especialista en Scrum (SFPC), PMBOK, automatización de procesos mediante Google Apps Script y Python, y desarrollo de flujos con Agentes de Inteligencia Artificial.'
                  : 'IT Project Manager with 7+ years delivering software initiatives across software factories (GNP Seguros via Badak), tech startups, and digital ventures. Certified Scrum Professional (SFPC), proficient in PMBOK, workflow automation with Python and Google Apps Script, and AI Agent architecture.'}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-black/30 rounded-xl p-4 border border-cyan-500/20 text-center">
                <div className="text-2xl font-display font-bold text-cyan-400">-40%</div>
                <div className="text-xs text-slate-300 font-semibold mt-1">
                  {isEs ? 'Tiempo en Reportes' : 'Reporting Overhead'}
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20 text-center">
                <div className="text-2xl font-display font-bold text-purple-400">+30%</div>
                <div className="text-xs text-slate-300 font-semibold mt-1">
                  {isEs ? 'Velocidad de Sprints' : 'Sprint Delivery Velocity'}
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-4 border border-emerald-500/20 text-center">
                <div className="text-2xl font-display font-bold text-emerald-400">100%</div>
                <div className="text-xs text-slate-300 font-semibold mt-1">
                  {isEs ? 'Entregas a Tiempo' : 'On-Time Milestones'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Track Record */}
        {activeTab === 'experience' && (
          <div className="space-y-3">
            <div className="glass rounded-2xl p-4 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-white">Badak Innovación y Desarrollo</h4>
                <span className="text-xs text-cyan-400 font-semibold">2024 - 2026</span>
              </div>
              <p className="text-xs text-purple-300 mb-2 font-semibold">
                {isEs ? 'IT Project Manager (Asignado a cuenta cliente: GNP Seguros)' : 'IT Project Manager (Assigned to client account: GNP Seguros)'}
              </p>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>{isEs ? 'Dirección de proyectos de software para la fábrica de software asignado a la cuenta GNP Seguros.' : 'Led software projects assigned to client account GNP Seguros software factory.'}</li>
                <li>{isEs ? 'Automatización de reportes semanales con Google Apps Script y Python ante la PMO.' : 'Automated weekly PMO reports with Google Apps Script & Python.'}</li>
                <li>{isEs ? 'Gestión de backlog, ceremonias diarias y resolución de incidencias en Jira.' : 'Backlog management, daily standups, and Jira defect governance.'}</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-white">Niku Tecnología S.A. de C.V.</h4>
                <span className="text-xs text-purple-400 font-semibold">2020 - 2023</span>
              </div>
              <p className="text-xs text-slate-400 mb-2 font-medium">Project Lead Manager</p>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>{isEs ? 'Aumento del 30% en velocidad de entrega mediante el marco ágil Scrum.' : '30% increase in squad delivery velocity through Scrum framework adoption.'}</li>
                <li>{isEs ? 'Implementación de agentes de IA y automatizaciones para CRM y monitoreo de tareas.' : 'Deployed AI agents and custom scripts for CRM data workflows.'}</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Certifications & Stack */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="glass rounded-2xl p-4 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                {isEs ? 'Certificación Oficial' : 'Official Certification'}
              </div>
              <h4 className="text-white text-sm font-bold">
                Scrum Professional Certificate (SFPC)
              </h4>
              <p className="text-xs text-slate-400 font-medium">CertiProf • Credencial ID: 92706455</p>
            </div>

            <div className="glass rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4" />
                {isEs ? 'Educación Formal' : 'Formal Education'}
              </div>
              <p className="text-xs text-white font-semibold">Lic. Ciencias de la Comunicación • BUAP (2014)</p>
              <p className="text-xs text-slate-400">Diplomado en Gestión de Proyectos • UVP (2023)</p>
            </div>

            <div className="glass rounded-2xl p-4 border border-white/10">
              <h5 className="text-xs font-bold uppercase text-slate-400 mb-2">Stack de Herramientas</h5>
              <div className="flex flex-wrap gap-1.5">
                {['Scrum', 'Kanban', 'PMBOK', 'Jira', 'Python', 'Google Apps Script', 'Agentes IA', 'LangFlow', 'ClickUp', 'Monday', 'Miro'].map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-white/5 rounded-lg text-xs font-semibold text-slate-300 border border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            {isEs ? 'Documento completo en PDF (2 páginas)' : 'Full 2-page PDF document'}
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="/CV_Mario_Gonzalez_IT_PM.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="CV_Mario_Gonzalez_IT_PM.pdf"
              onClick={() => playSound('success')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 text-xs transition-all hover:scale-105"
            >
              <FileDown className="w-4 h-4" />
              {isEs ? 'Descargar PDF Oficial' : 'Download Official PDF'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
