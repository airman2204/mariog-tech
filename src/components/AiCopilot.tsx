import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type Message = {
  role: 'assistant' | 'user';
  text: string;
};

export default function AiCopilot() {
  const { t, language } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: t.copilot.greeting,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update greeting on language change
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        text: t.copilot.greeting,
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getResponse = (question: string): string => {
    const qLower = question.toLowerCase().trim();

    // 1. Direct match with preset questions
    const exactMatch = t.copilot.questions.find((q) => q.question === question);
    if (exactMatch) return exactMatch.answer;

    const isEs = language === 'es';

    // 2. Intelligent topic classification based on Mario's verified CV
    if (qLower.includes('certif') || qLower.includes('sfpc') || qLower.includes('certiprof') || qLower.includes('credencial')) {
      return isEs
        ? 'Mario cuenta con la certificación oficial Scrum Professional Certificate (SFPC) emitida por CertiProf (ID: 92706455), respaldando su dominio en marcos ágiles, ceremonias Scrum y gestión de sprints.'
        : 'Mario holds the official Scrum Professional Certificate (SFPC) issued by CertiProf (ID: 92706455), validating his mastery in Agile frameworks, Scrum rituals, and sprint governance.';
    }

    if (qLower.includes('gnp') || qLower.includes('badak') || qLower.includes('seguro') || qLower.includes('insurance')) {
      return isEs
        ? 'En Badak Innovación (2024 - 2026), Mario se desempeñó como Project Manager para la fábrica de software de GNP Seguros, liderando entregas en alcance, costo y tiempo, implementando reporteo automatizado con Google Apps Script y gestionando incidencias en Jira.'
        : 'At Badak Innovación (2024 - 2026), Mario served as Project Manager for GNP Seguros software factory, ensuring delivery on scope, cost, and schedule, automating weekly reporting via Google Apps Script, and directing Jira defect resolution.';
    }

    if (qLower.includes('niku') || qLower.includes('crm') || qLower.includes('velocidad') || qLower.includes('velocity')) {
      return isEs
        ? 'En Niku Tecnología (2020 - 2023), implementó el marco Scrum incrementando en un 30% la velocidad de entrega de los equipos. Además integró agentes de IA y flujos con Python y Google Apps Script para automatizar el CRM y supervisión de tareas.'
        : 'At Niku Tecnología (2020 - 2023), he implemented the Scrum framework boosting team delivery velocity by 30%. He also integrated AI agents and Python / Apps Script pipelines to automate CRM data management and task tracking.';
    }

    if (qLower.includes('automatiz') || qLower.includes('script') || qLower.includes('python') || qLower.includes('apps script') || qLower.includes('google')) {
      return isEs
        ? 'Mario es especialista en automatización operativa: diseñó pipelines con Google Apps Script y Python que redujeron un 40% el tiempo de generación de reportes semanales y seguimiento de clientes, garantizando cero errores humanos en reporteo ejecutivo.'
        : 'Mario specializes in workflow automation: he designed Google Apps Script and Python pipelines that cut weekly progress reporting time by 40%, eliminating human error in executive tracking.';
    }

    if (qLower.includes('ia') || qLower.includes('ai') || qLower.includes('inteligencia artificial') || qLower.includes('langflow') || qLower.includes('agent') || qLower.includes('prompt')) {
      return isEs
        ? 'Mario diseña e implementa soluciones con Agentes de IA, LangFlow y técnicas avanzadas de Prompt Engineering, aplicándolas para enriquecimiento de CRM, supervisión de entregables y optimización de flujos de trabajo en equipos ágiles.'
        : 'Mario designs and implements custom AI Agents, LangFlow pipelines, and advanced Prompt Engineering, leveraging them to augment CRM data, monitor deliverables, and streamline agile workflows.';
    }

    if (qLower.includes('educa') || qLower.includes('estudio') || qLower.includes('universidad') || qLower.includes('buap') || qLower.includes('uvp') || qLower.includes('carrera') || qLower.includes('degree') || qLower.includes('school')) {
      return isEs
        ? 'Mario es Licenciado en Ciencias de la Comunicación por la Benemérita Universidad Autónoma de Puebla (BUAP, 2014) y cuenta con un Diplomado en Gestión de Proyectos por la Universidad del Valle de Puebla (UVP, 2023), además de su certificación profesional en Scrum (SFPC).'
        : 'Mario holds a Bachelor\'s Degree in Communication Sciences from Benemérita Universidad Autónoma de Puebla (BUAP, 2014) and a Postgraduate Diploma in Project Management from Universidad del Valle de Puebla (UVP, 2023), along with his official Scrum Professional certification (SFPC).';
    }

    if (qLower.includes('contacto') || qLower.includes('correo') || qLower.includes('email') || qLower.includes('contrat') || qLower.includes('contact') || qLower.includes('hire') || qLower.includes('mensaje')) {
      return isEs
        ? 'Puedes contactar a Mario directamente a través de su correo magc2204@gmail.com, por LinkedIn, o agendando una conversación en la sección de contacto al final de esta página.'
        : 'You can reach Mario directly via email at magc2204@gmail.com, via LinkedIn, or by scheduling a conversation in the contact section below.';
    }

    if (qLower.includes('scrum') || qLower.includes('agil') || qLower.includes('kanban') || qLower.includes('metodolog') || qLower.includes('pmbok') || qLower.includes('waterfall')) {
      return isEs
        ? 'Mario domina tanto metodologías ágiles (Scrum, Kanban) como tradicionales (PMBOK/Cascada). Ha liderado ceremonias diarias, retrospectivas, WBS, matrices de riesgo, y gestión de alcance y presupuestos para proyectos de alto impacto.'
        : 'Mario is proficient in both Agile (Scrum, Kanban) and Traditional governance (PMBOK/Waterfall). He has led daily standups, retrospectives, WBS planning, risk matrices, and scope & budget governance for high-impact initiatives.';
    }

    return t.copilot.defaultResponse;
  };

  const sendMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: getResponse(text) }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <section id="copilot" className="relative py-24 bg-mission-control overflow-hidden">
      {/* Decorative PM Decision matrix / Release cycle */}
      <div className="absolute top-10 right-10 pointer-events-none opacity-20 hidden md:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="spin-slow">
          <circle cx="50" cy="50" r="36" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="8 6" />
          <line x1="50" y1="14" x2="50" y2="86" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="14" y1="50" x2="86" y2="50" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="6" fill="#8b5cf6" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-10 pointer-events-none opacity-20 hidden md:block">
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none" className="float-anim">
          {/* Burndown velocity line */}
          <line x1="10" y1="70" x2="90" y2="70" stroke="#06b6d4" strokeWidth="1.5" />
          <line x1="10" y1="70" x2="10" y2="10" stroke="#06b6d4" strokeWidth="1.5" />
          <polyline points="10,20 35,32 60,48 85,65" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4 3" />
          <circle cx="85" cy="65" r="4" fill="#10b981" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm font-bold uppercase tracking-wider mb-4 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-4 h-4" />
            {t.copilot.tag}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            {t.copilot.title} <span className="gradient-text-mix">{t.copilot.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t.copilot.subtitle}
          </p>
        </div>

        {/* Chat layout */}
        <div className="grid md:grid-cols-[310px_1fr] gap-6 items-start">
          {/* Left: Interactive 3D Avatar Host + Quick Questions */}
          <div className="flex flex-col gap-4">
            {/* 3D Character Podium */}
            <div className="glass-card rounded-3xl p-5 flex flex-col items-center relative overflow-hidden group border border-cyan-500/30">
              {/* Background radial glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/15 via-purple-500/10 to-transparent blur-xl pointer-events-none" />

              {/* Star Wars Hologram Projector Stage */}
              <div className="relative w-full h-[290px] flex items-end justify-center mb-2">
                {/* Radial Glow from Emitter Base */}
                <div className="absolute bottom-2 w-56 h-16 bg-cyan-500/25 rounded-[50%] blur-xl" />
                <div className="absolute bottom-1 w-52 h-8 border-2 border-cyan-400/60 rounded-[50%] shadow-[0_0_25px_rgba(6,182,212,0.8)]" />
                <div className="absolute bottom-0 w-36 h-5 border border-cyan-300/90 rounded-[50%]" />
                <div className="absolute bottom-2.5 w-16 h-3 bg-white/90 rounded-[50%] blur-sm pulse-ring" />

                {/* Pure Holographic Character Materializing from the bottom */}
                <div className="relative z-10 flex items-end justify-center max-h-[270px] hologram-spawn">
                  <img
                    src="/agente.png"
                    alt="Mario González Agente IA Holográfico"
                    className="hologram-character max-h-[270px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Agent info */}
              <div className="text-center relative z-10 pt-2 border-t border-white/10 w-full">
                <h3 className="font-display font-bold text-white text-base">Mario González AI</h3>
              </div>
            </div>

            {/* Quick questions */}
            <div className="glass-card rounded-3xl p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">{t.copilot.quickQuestionsTitle}</p>
              <div className="flex flex-col gap-2">
                {t.copilot.questions.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => sendMessage(q.question)}
                    disabled={isTyping}
                    className="flex items-start gap-2 px-3 py-2.5 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-xl transition-all border border-transparent hover:border-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  >
                    <Sparkles className="w-4 h-4 flex-shrink-0 text-cyan-400 mt-0.5" />
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Chat window */}
          <div className="glass-card rounded-3xl flex flex-col h-[480px] overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20">
                <img
                  src="/agente.png"
                  alt="Mario González AI"
                  className="w-full h-full rounded-full object-cover object-top bg-[#0a0e27]"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1f3d]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">{t.copilot.botTitle}</h4>
                <p className="text-[10px] text-green-400 font-semibold">{t.copilot.botStatus}</p>
              </div>
            </div>

            {/* Message area */}
            <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 max-w-[85%] ${
                    m.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ${
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                        : 'bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5'
                    }`}
                  >
                    {m.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <img
                        src="/agente.png"
                        alt="Mario"
                        className="w-full h-full rounded-full object-cover object-top bg-[#0a0e27]"
                      />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-sm'
                        : 'glass text-slate-200 rounded-tl-sm border border-white/10'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
                    <img
                      src="/agente.png"
                      alt="Mario"
                      className="w-full h-full rounded-full object-cover object-top bg-[#0a0e27]"
                    />
                  </div>
                  <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 border border-white/10">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full blink" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full blink" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full blink" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.copilot.inputPlaceholder}
                  disabled={isTyping}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
