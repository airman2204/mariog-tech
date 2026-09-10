import { CalendarDays, ClipboardCheck, Target, Kanban, BarChart3, Bot, CheckCircle2 } from 'lucide-react';

export default function CommandCenter() {
  return (
    <div className="relative w-full h-full flex items-end justify-center">
      {/* Project-management orbit */}
      <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-48 h-48">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 glow-cyan orbit-anim" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-400 orbit-anim" style={{ animationDuration: '12s', animationDelay: '-5s' }} />
      </div>

      {/* Project management floating signals */}
      <div className="absolute top-[2%] left-[2%] flex items-center gap-2 px-3.5 py-2 glass rounded-xl border border-cyan-400/30 float-anim shadow-lg shadow-cyan-500/10 z-20">
        <ClipboardCheck className="w-5 h-5 text-cyan-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Backlog</span>
      </div>
      <div className="absolute top-[12%] right-[2%] flex items-center gap-2 px-3.5 py-2 glass rounded-xl border border-purple-400/30 float-anim-slow z-20">
        <CalendarDays className="w-5 h-5 text-purple-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Sprint</span>
      </div>
      <div className="absolute bottom-[28%] left-[-2%] flex items-center gap-2 px-3.5 py-2 glass rounded-xl border border-orange-400/30 float-anim z-20" style={{ animationDelay: '0.7s' }}>
        <Target className="w-5 h-5 text-orange-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-orange-300">Goal</span>
      </div>

      {/* Mario 3D Avatar (IMAGEN COMPLETA ORIGINAL EN ALTA RESOLUCIÓN) */}
      <div className="relative float-anim z-10 w-full h-full flex items-center justify-center">
        <div className="absolute inset-4 rounded-[50%] bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-transparent blur-3xl" />
        <img
          src="/mario_avatar_3d.png"
          alt="Mario González Avatar 3D"
          className="relative z-10 w-full h-full object-contain drop-shadow-[0_30px_45px_rgba(6,182,212,0.45)] transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
}
