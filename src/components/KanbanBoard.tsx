import { useEffect, useRef, useState } from 'react';
import {
  LayoutGrid,
  Circle,
  Clock,
  CheckCircle2,
  GripVertical,
  Kanban,
  CheckSquare2,
  Calendar,
  X,
  ExternalLink,
  Award,
  Zap,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Terminal,
  Layers,
  ListOrdered,
  ArrowRight,
  TrendingUp,
  Cpu,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { playSound } from '@/utils/sound';

type Ticket = {
  id: string;
  title: string;
  tag: string;
  priority: string;
  points?: string;
  epic?: string;
  assignee?: string;
  period?: string;
  description?: string;
};

type Column = {
  id: string;
  title: string;
  subtitle: string;
  wip?: string;
  color: string;
  tickets: Ticket[];
};

const columnIcons: Record<string, typeof Circle> = {
  backlog: Circle,
  'in-progress': Clock,
  done: CheckCircle2,
};

function TicketDetailModal({
  ticket,
  onClose,
}: {
  ticket: Ticket | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl bg-[#0f1438] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/20 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md font-mono text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {ticket.id}
            </span>
            {ticket.epic && (
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 text-purple-300 border border-purple-500/20">
                {ticket.epic}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Title */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
          {ticket.title}
        </h3>

        {/* Meta Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-[#0a0e27]/80 border border-white/5 mb-6 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.modal.priority || 'Prioridad'}</span>
            <span className="font-extrabold text-cyan-400">{ticket.priority}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.modal.estimate}</span>
            <span className="font-bold text-slate-200">{ticket.points || '5 SP'}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.modal.assignee}</span>
            <span className="font-bold text-slate-200">Mario González</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.modal.timeframe}</span>
            <span className="font-bold text-purple-300">{ticket.period || 'Q1 - Q4'}</span>
          </div>
        </div>

        {/* Scope and Deliverables */}
        <div className="space-y-4 mb-6 text-sm">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              {t.modal.description}
            </h4>
            <p className="text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
              {ticket.description || 'Liderazgo técnico y entrega ágil asegurando alcance, costo, calidad y plazos pactados.'}
            </p>
          </div>

          {/* Special CertiProf badge if ticket MAR-103 */}
          {ticket.id === 'MAR-103' && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-cyan-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-white text-sm">Scrum Professional Certificate (SFPC)</h5>
                  <p className="text-xs text-slate-400">CertiProf ID: 92706455 • Credencial Verificada</p>
                </div>
              </div>
              <a
                href="https://certiprof.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all flex-shrink-0"
              >
                <span>{t.modal.viewCred}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold hover:opacity-90 transition-all"
          >
            {t.modal.close}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<'kanban' | 'timeline'>('kanban');
  const [activeFilter, setActiveFilter] = useState<'all' | 'highest' | 'agile' | 'automation' | 'ai'>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [catPurring, setCatPurring] = useState(false);

  // Dynamic state for drag & drop
  const [columnsData, setColumnsData] = useState<Column[]>([]);

  useEffect(() => {
    setColumnsData([
      t.kanban.backlog as Column,
      t.kanban.inProgress as Column,
      t.kanban.done as Column,
    ]);
  }, [t]);

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, ticket: Ticket, sourceColId: string) => {
    playSound('card');
    e.dataTransfer.setData('application/json', JSON.stringify({ ticket, sourceColId }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('application/json');
    if (!raw) return;

    try {
      const { ticket, sourceColId } = JSON.parse(raw) as { ticket: Ticket; sourceColId: string };
      if (sourceColId === targetColId) return;

      playSound('card');

      setColumnsData((prev) => {
        return prev.map((col) => {
          if (col.id === sourceColId) {
            return { ...col, tickets: col.tickets.filter((t) => t.id !== ticket.id) };
          }
          if (col.id === targetColId) {
            return { ...col, tickets: [ticket, ...col.tickets] };
          }
          return col;
        });
      });

      // If dropped into DONE column: celebrate and trigger cat reaction
      if (targetColId === 'done') {
        playSound('success');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6, x: 0.75 },
          colors: ['#06b6d4', '#8b5cf6', '#22c55e', '#f97316'],
        });
        setCatPurring(true);
        setTimeout(() => setCatPurring(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="kanban" className="relative py-24 bg-mission-control bg-grid overflow-hidden">
      {/* Decorative ambient elements - Agile Workflow Nodes & Retrospective Loop */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-20 hidden md:block">
        <svg width="110" height="90" viewBox="0 0 110 90" fill="none" className="float-anim">
          {/* Kanban mini flow nodes */}
          <circle cx="20" cy="45" r="10" stroke="#f97316" strokeWidth="2" fill="#f97316" fillOpacity="0.2" />
          <line x1="30" y1="45" x2="55" y2="45" stroke="#f97316" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="65" cy="45" r="10" stroke="#06b6d4" strokeWidth="2" fill="#06b6d4" fillOpacity="0.2" />
          <line x1="75" y1="45" x2="100" y2="45" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="110" cy="45" r="8" stroke="#10b981" strokeWidth="2" fill="#10b981" fillOpacity="0.3" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 pointer-events-none opacity-20 hidden md:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="spin-slow-rev">
          {/* Agile Retrospective cycle loop */}
          <circle cx="50" cy="50" r="35" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="12 8" />
          <polygon points="50,10 56,18 44,18" fill="#06b6d4" />
          <polygon points="50,90 44,82 56,82" fill="#8b5cf6" />
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm font-bold uppercase tracking-wider mb-4 text-purple-400 border border-purple-500/20">
            <LayoutGrid className="w-4 h-4" />
            {t.kanban.tag}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            {t.kanban.title} <span className="gradient-text-mix">{t.kanban.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t.kanban.subtitle}
          </p>
        </div>

        {/* JIRA / AGILE BOARD CONTAINER */}
        <div className="relative glass-card rounded-3xl p-4 sm:p-6 border border-cyan-500/20 shadow-2xl bg-[#0d1230]/90">
          {/* REALISTIC CAT SITTING ON THE TOP-RIGHT CORNER */}
          <div className="absolute -top-24 sm:-top-32 md:-top-36 -right-4 sm:-right-6 md:-right-8 z-30 select-none">
            <div className="relative w-[190px] sm:w-[250px] md:w-[295px]">
              {/* Contact shadow aligned with cat belly and rear paws */}
              <div className="absolute top-[48%] sm:top-[52%] right-6 sm:right-10 w-32 sm:w-44 h-4 bg-black/80 blur-md rounded-full" />
              <div className="absolute top-[50%] sm:top-[54%] right-10 sm:right-14 w-24 sm:w-32 h-2 bg-black/95 blur-sm rounded-full" />

              <img
                src="/gato.png"
                alt="Gato en el tablero Kanban"
                className={`relative z-10 w-full h-auto object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] transition-transform duration-300 ${
                  catPurring ? 'scale-110 -rotate-3' : 'hover:scale-105'
                }`}
              />

              {/* Cat reaction speech bubble when ticket dropped to Done */}
              {catPurring && (
                <div className="absolute -top-6 left-6 z-40 bg-green-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl shadow-xl shadow-green-500/30 animate-bounce">
                  ¡Miau! Ticket a Done 🚀
                </div>
              )}
            </div>
          </div>

          {/* Top Agile Toolbar / Sprint Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border-cyan-400/30'
                    : 'bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border-purple-400/30'
                }`}
              >
                {viewMode === 'kanban' ? (
                  <Kanban className="w-5 h-5 text-cyan-400" />
                ) : (
                  <ListOrdered className="w-5 h-5 text-purple-400" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-white text-base">
                    {viewMode === 'kanban'
                      ? t.kanban.boardMeta.sprint
                      : (t.kanban.boardMeta.timelineSprint || 'Historial Profesional & Entregables')}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                      viewMode === 'kanban'
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    }`}
                  >
                    {viewMode === 'kanban'
                      ? (t.kanban.boardMeta.activeBadge || 'EN ACTIVO')
                      : (t.kanban.boardMeta.timelineBadge || 'CRONOLOGÍA')}
                  </span>
                </div>
                {viewMode === 'kanban' ? (
                  <p className="text-xs text-slate-400">
                    {t.kanban.boardMeta.dragHint || 'Arrastra tarjetas o usa el selector de vista'}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Controls: View Mode Switcher + Filters */}
            <div className="flex flex-wrap items-center gap-3 mr-0 sm:mr-32">
              {/* Dual View Toggle */}
              <div className="flex items-center bg-[#070b20] p-1 rounded-xl border border-white/10 shadow-inner">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'kanban'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Kanban className="w-3.5 h-3.5" />
                  <span>{t.kanban.boardMeta.viewBoard}</span>
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'timeline'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>{t.kanban.boardMeta.viewTimeline}</span>
                </button>
              </div>

              {/* Quick Filter buttons (only for kanban view, hidden on xs screens to prevent UI clutter) */}
              {viewMode === 'kanban' && (
                <div className="hidden sm:flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => { playSound('click'); setActiveFilter('all'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeFilter === 'all'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white bg-white/5 border border-transparent'
                    }`}
                  >
                    {t.kanban.boardMeta.filterAll}
                  </button>
                  <button
                    onClick={() => { playSound('click'); setActiveFilter('agile'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeFilter === 'agile'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'text-slate-400 hover:text-white bg-white/5 border border-transparent'
                    }`}
                  >
                    Scrum / Agile
                  </button>
                  <button
                    onClick={() => { playSound('click'); setActiveFilter('automation'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeFilter === 'automation'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-white bg-white/5 border border-transparent'
                    }`}
                  >
                    Scripting / Python
                  </button>
                  <button
                    onClick={() => { playSound('click'); setActiveFilter('ai'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeFilter === 'ai'
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                        : 'text-slate-400 hover:text-white bg-white/5 border border-transparent'
                    }`}
                  >
                    Agentes IA
                  </button>
                  <button
                    onClick={() => { playSound('click'); setActiveFilter('highest'); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeFilter === 'highest'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white bg-white/5 border border-transparent'
                    }`}
                  >
                    P0 / Core
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* VIEW 1: INTERACTIVE KANBAN BOARD */}
          {viewMode === 'kanban' ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {columnsData.map((col) => {
                const Icon = columnIcons[col.id] || Circle;
                const filteredTickets = col.tickets.filter((ticket) => {
                  if (activeFilter === 'all') return true;
                  if (activeFilter === 'highest') {
                    return ticket.priority === 'Highest' || ticket.priority === 'High' || ticket.priority === 'Core' || ticket.priority === 'P0' || ticket.priority === 'Done';
                  }
                  if (activeFilter === 'agile') {
                    const str = `${ticket.title} ${ticket.tag} ${ticket.description || ''}`.toLowerCase();
                    return str.includes('scrum') || str.includes('agil') || str.includes('kanban') || str.includes('pmo') || str.includes('jira') || str.includes('sprint');
                  }
                  if (activeFilter === 'automation') {
                    const str = `${ticket.title} ${ticket.tag} ${ticket.description || ''}`.toLowerCase();
                    return str.includes('script') || str.includes('python') || str.includes('apps script') || str.includes('automatiz') || str.includes('report');
                  }
                  if (activeFilter === 'ai') {
                    const str = `${ticket.title} ${ticket.tag} ${ticket.description || ''}`.toLowerCase();
                    return str.includes('ia') || str.includes('ai') || str.includes('langflow') || str.includes('agente') || str.includes('prompt');
                  }
                  return true;
                });

                return (
                  <div
                    key={col.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, col.id)}
                    className="flex flex-col bg-[#0a0e24]/70 hover:bg-[#0c112b] transition-colors rounded-2xl p-4 border border-white/10 min-h-[500px]"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `${col.color}20`, border: `1px solid ${col.color}40` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: col.color }} strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
                            {col.title}
                          </h4>
                          <span className="text-[11px] text-slate-500">{col.subtitle}</span>
                        </div>
                      </div>

                      <span
                        className="px-2 py-0.5 rounded-md text-xs font-bold font-mono"
                        style={{ background: `${col.color}20`, color: col.color }}
                      >
                        {filteredTickets.length}
                      </span>
                    </div>

                    {/* Cards list */}
                    <div className="flex flex-col gap-3.5 flex-1">
                      {filteredTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, ticket, col.id)}
                          onClick={() => setSelectedTicket(ticket)}
                          className="group relative bg-[#121633]/90 hover:bg-[#181e45] rounded-xl p-4 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 cursor-pointer active:cursor-grabbing"
                        >
                          {/* Top row: Ticket Key + Epic Tag + Drag Handle */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5">
                              <CheckSquare2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                              <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-cyan-300 transition-colors">
                                {ticket.id}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {ticket.epic && (
                                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 text-slate-400 border border-white/10 truncate max-w-[110px]">
                                  {ticket.epic}
                                </span>
                              )}
                              <GripVertical className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                            </div>
                          </div>

                          {/* Ticket Title */}
                          <h4 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-cyan-200 transition-colors">
                            {ticket.title}
                          </h4>

                          {/* Optional Period */}
                          {ticket.period && (
                            <div className="flex items-center gap-1.5 text-[11px] text-purple-300 font-semibold mb-3">
                              <Calendar className="w-3 h-3 text-purple-400" />
                              <span>{ticket.period}</span>
                            </div>
                          )}

                          {/* Bottom row */}
                          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border bg-cyan-500/15 text-cyan-400 border-cyan-500/30">
                                {ticket.priority}
                              </span>
                              <span className="text-[11px] font-medium text-slate-400 truncate max-w-[110px]">
                                {ticket.tag}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {ticket.points && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                  {ticket.points}
                                </span>
                              )}
                              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-[10px] font-black text-white ring-1 ring-white/20">
                                MG
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Column Footer */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{col.wip || 'WIP Limit: OK'}</span>
                      <span className="text-slate-600">JIRA-SYNCED</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* VIEW 2: EXECUTIVE CAREER TIMELINE MODE */
            <div className="space-y-8 py-4 max-w-4xl mx-auto">
              <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
                {/* Milestone 1: Badak GNP Seguros */}
                <div className="relative group">
                  <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 border-4 border-[#0d1230] shadow-md shadow-cyan-500/50" />
                  <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                    <div className="mb-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {language === 'es' ? 'Ene 2024 – Sep 2026' : 'Jan 2024 – Sep 2026'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Badak Innovación y Desarrollo
                    </h3>
                    <p className="text-sm font-semibold text-cyan-400 mb-1">
                      IT Project Manager
                    </p>
                    <p className="text-xs font-semibold text-purple-300 mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {language === 'es' ? 'Asignado a cuenta cliente: GNP Seguros' : 'Assigned to client account: GNP Seguros'}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {language === 'es'
                        ? 'En Badak Innovación, desempeñé la dirección integral de proyectos de software asignado a la fábrica de software para el cliente GNP Seguros, asegurando alcance, tiempo y presupuesto. Automatización de reportes semanales con Google Apps Script y herramientas de IA para la PMO. Coordinación de ceremonias ágiles Scrum y gestión de incidencias en Jira.'
                        : 'At Badak Innovación, delivered end-to-end software projects assigned to client account GNP Seguros software factory, governing scope, schedule, and budget. Automated weekly progress reporting via Google Apps Script and AI pipelines for PMO. Led Agile ceremonies and Jira defect management.'}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">Scrum / Jira</span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">Google Apps Script</span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">Cliente: GNP Seguros</span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">-40% Tiempo Reporteo</span>
                    </div>
                  </div>
                </div>

                {/* Milestone 2: Niku Tech */}
                <div className="relative group">
                  <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 border-4 border-[#0d1230] shadow-md shadow-purple-500/50" />
                  <div className="glass-card rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all">
                    <div className="mb-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {language === 'es' ? 'Dic 2020 – Nov 2023' : 'Dec 2020 – Nov 2023'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Niku Tecnología S.A. de C.V.
                    </h3>
                    <p className="text-sm font-semibold text-purple-400 mb-3">
                      Project Lead Manager
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {language === 'es'
                        ? 'Implementación del marco Scrum (+30% velocidad de entrega). Integración de agentes IA y Python / Apps Script para CRM. Elaboración de WBS, cronogramas, presupuestos y matrices de riesgos para proyectos tecnológicos.'
                        : 'Implemented Scrum methodology, achieving a 30% boost in engineering velocity. Integrated AI agents and Python / Google Apps Script pipelines for CRM automation. Developed WBS, sprint schedules, and risk matrices.'}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">Agile Lead</span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">Python Scripting</span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">AI Agents</span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">+30% Velocity Boost</span>
                    </div>
                  </div>
                </div>

                {/* Milestone 3: Track Digital */}
                <div className="relative group">
                  <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 border-4 border-[#0d1230] shadow-md shadow-orange-500/50" />
                  <div className="glass-card rounded-2xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all">
                    <div className="mb-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-orange-500/20 text-orange-300 border border-orange-500/30">
                        {language === 'es' ? 'Ago 2018 – Nov 2020' : 'Aug 2018 – Nov 2020'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Track Digital Communication
                    </h3>
                    <p className="text-sm font-semibold text-orange-400 mb-3">
                      Project Manager / Especialista Digital
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {language === 'es'
                        ? 'Alineación de proyectos digitales y multimedia con los KPIs estratégicos de negocio y requerimientos del cliente, asegurando entregas en tiempo y gestión de interesados.'
                        : 'Aligned digital products and interactive media roadmaps with business strategic KPIs and stakeholder goals, delivering on time and quality.'}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">Digital PM</span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">Stakeholder Management</span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10">KPI Tracking</span>
                    </div>
                  </div>
                </div>

                {/* Milestone 4: Education & Certifications */}
                <div className="relative group">
                  <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 border-4 border-[#0d1230] shadow-md shadow-emerald-500/50" />
                  <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all">
                    <div className="mb-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {language === 'es' ? 'Certificaciones & Formación' : 'Certifications & Degrees'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {language === 'es' ? 'Educación Superior & Certificaciones Profesionales' : 'Higher Education & Professional Certifications'}
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {/* Carrera Universitaria / Licenciatura */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-pink-400 font-bold text-sm mb-1.5">
                            <GraduationCap className="w-4 h-4 flex-shrink-0" />
                            <span>{language === 'es' ? 'Licenciatura (BUAP)' : 'Bachelor Degree (BUAP)'}</span>
                          </div>
                          <p className="text-xs font-semibold text-white mb-1">
                            {language === 'es' ? 'Lic. en Ciencias de la Comunicación' : 'B.A. in Communication Sciences'}
                          </p>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono mt-2 pt-2 border-t border-white/5">
                          Benemérita Universidad Autónoma de Puebla • 2014
                        </p>
                      </div>

                      {/* Diplomado Especializado */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1.5">
                            <Award className="w-4 h-4 flex-shrink-0" />
                            <span>{language === 'es' ? 'Diplomado (UVP)' : 'Postgraduate (UVP)'}</span>
                          </div>
                          <p className="text-xs font-semibold text-white mb-1">
                            {language === 'es' ? 'Gestión y Dirección de Proyectos' : 'Project Management & Leadership'}
                          </p>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono mt-2 pt-2 border-t border-white/5">
                          Universidad del Valle de Puebla • 2023
                        </p>
                      </div>

                      {/* Certificación Oficial Scrum */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1.5">
                            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                            <span>Scrum Professional</span>
                          </div>
                          <p className="text-xs font-semibold text-white mb-1">
                            Scrum Foundation SFPC
                          </p>
                        </div>
                        <p className="text-[11px] text-cyan-300/80 font-mono mt-2 pt-2 border-t border-white/5">
                          CertiProf ID: 92706455 • Activa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Details Jira Modal */}
      <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </section>
  );
}
