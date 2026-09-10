import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Briefcase, Cpu, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { playSound } from '@/utils/sound';

type Message = {
  role: 'assistant' | 'user';
  text: string;
};

type PersonaMode = 'all' | 'recruiter' | 'technical';

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
  const [streamedText, setStreamedText] = useState('');
  const [personaMode, setPersonaMode] = useState<PersonaMode>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

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
  }, [messages, isTyping, streamedText]);

  const getResponse = (question: string): string => {
    const qLower = question.toLowerCase().trim();
    const isEs = language === 'es';

    // 1. Conversational Greetings & Small Talk (Human, friendly & warm)
    if (/^(hola|buenos d[ií]as|buenas tardes|buenas noches|hey|qu[eé] tal|c[oó]mo est[aá]s|saludos|que onda|buenas)/i.test(qLower)) {
      return isEs
        ? '¡Hola! Qué gusto saludarte. Soy el asistente virtual de Mario. ¿Cómo estás hoy? Cuéntame, ¿hay algo específico que te gustaría saber sobre su experiencia en gestión de proyectos, Scrum o automatización con IA?'
        : 'Hello there! Great to meet you. I am Mario\'s virtual assistant. How can I help you today? Feel free to ask anything about his project management background, Scrum leadership, or AI automation projects!';
    }

    if (/^(gracias|muchas gracias|agradecido|thanks|thank you|thx)/i.test(qLower)) {
      return isEs
        ? '¡De nada! Es un placer ayudarte. Si necesitas consultar algo más o deseas agendar una llamada directa con Mario, avísame con toda confianza.'
        : 'You are very welcome! If you have any other questions or would like to schedule a direct chat with Mario, just let me know.';
    }

    if (/^(adi[oó]s|hasta luego|bye|chao|nos vemos|goodbye)/i.test(qLower)) {
      return isEs
        ? '¡Hasta luego! Muchas gracias por tomarte el tiempo de visitar el portafolio de Mario. Que tengas un excelente día. 👋'
        : 'Goodbye! Thank you for taking the time to explore Mario\'s portfolio. Have a wonderful day ahead! 👋';
    }

    if (/^(qui[eé]n eres|qui[eé]n es mario|cu[aá]ntame de ti|who are you|about you)/i.test(qLower)) {
      return isEs
        ? '¡Con gusto! Soy el asistente inteligente de Mario González. Mario es un IT Project Manager con más de 7 años de experiencia liderando equipos de software, certificado en Scrum (SFPC) y apasionado por resolver problemas reales con automatizaciones en Python, Google Apps Script e Inteligencia Artificial.'
        : 'Glad to share! I am Mario González\'s AI assistant. Mario is an IT Project Manager with 7+ years of experience leading engineering squads, certified in Scrum (SFPC), and passionate about building real-world automated pipelines with Python, Apps Script, and AI Agents.';
    }

    if (/(qu[eé] haces|para qu[eé] sirves|ayuda|help)/i.test(qLower)) {
      return isEs
        ? 'Estoy aquí para responder cualquier duda sobre la trayectoria de Mario: sus proyectos en GNP Seguros y Niku Tech, sus certificaciones, su forma de liderar sprints o cómo automatiza procesos para ahorrar hasta un 40% de tiempo. ¿Qué te gustaría explorar?'
        : 'I\'m here to answer any questions about Mario\'s career: his projects at GNP Seguros and Niku Tech, his Scrum certifications, his agile leadership style, or how he automates operations. What would you like to explore?';
    }

    // Direct match with preset questions
    const exactMatch = t.copilot.questions.find((q) => q.question === question);
    if (exactMatch) return exactMatch.answer;

    // 2. Intelligent topic classification based on Mario's verified CV
    if (qLower.includes('certif') || qLower.includes('sfpc') || qLower.includes('certiprof') || qLower.includes('credencial')) {
      return isEs
        ? 'Mario cuenta con la certificación oficial Scrum Professional Certificate (SFPC) emitida por CertiProf (ID: 92706455), respaldando su dominio en marcos ágiles, ceremonias Scrum y gestión de sprints.'
        : 'Mario holds the official Scrum Professional Certificate (SFPC) issued by CertiProf (ID: 92706455), validating his mastery in Agile frameworks, Scrum rituals, and sprint governance.';
    }

    if (qLower.includes('gnp') || qLower.includes('badak') || qLower.includes('seguro') || qLower.includes('insurance')) {
      return isEs
        ? 'Mario laboró como IT Project Manager en Badak Innovación (2024 - 2026), asignado directamente a la cuenta cliente de GNP Seguros (fábrica de software). Ahí lideró entregas contractuales en tiempo y presupuesto, implementó reporteo automatizado con Google Apps Script y gestionó incidencias en Jira ante la PMO.'
        : 'Mario worked as IT Project Manager at Badak Innovación (2024 - 2026), assigned directly to the client account of GNP Seguros (software factory). He governed delivery on scope, cost, and schedule, automated weekly reporting via Google Apps Script, and directed Jira defect triage with the PMO.';
    }

    if (qLower.includes('niku') || qLower.includes('crm') || qLower.includes('velocidad') || qLower.includes('velocity')) {
      return isEs
        ? 'En Niku Tecnología (2020 - 2023), implementó el marco Scrum incrementando en un 30% la velocidad de entrega de los equipos. Además integró agentes de IA y flujos con Python y Google Apps Script para automatizar el CRM y supervisión de tareas.'
        : 'At Niku Tecnología (2020 - 2023), he implemented the Scrum framework boosting team delivery velocity by 30%. He also integrated AI agents and Python / Apps Script pipelines to automate CRM data management and task tracking.';
    }

    if (qLower.includes('incidente') || qLower.includes('incident') || qLower.includes('jira') || qLower.includes('defecto') || qLower.includes('bug') || qLower.includes('trazabilidad') || qLower.includes('sla') || qLower.includes('calidad')) {
      return isEs
        ? 'Un caso de éxito clave de Mario fue automatizar el seguimiento de incidentes en Jira mediante scripts: logró priorización en tiempo real y una trazabilidad profunda (tiempo de ciclo, causa raíz y área responsable). Esto brindó total transparencia con la PMO y clientes, facilitando negociaciones objetivas ante atrasos y asegurando estándares de calidad de código sin fricciones.'
        : 'A standout success of Mario was automating Jira incident management via custom scripts: he enabled real-time triage and in-depth defect traceability (cycle times, root causes, and owner accountability). This delivered 100% transparency for the PMO and clients, empowering data-driven negotiations over delivery delays and code quality.';
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

    // Human and natural conversational fallback
    return isEs
      ? `Comprendo tu pregunta. Sobre ese tema en específico, Mario siempre busca aportar valor práctico y soluciones medibles. Te sugiero preguntarme sobre su experiencia en Scrum (SFPC), su trabajo en GNP Seguros, sus automatizaciones en Python y Apps Script, o si lo prefieres, puedes agendar una llamada directa de 15 min con él en el botón de Calendly.`
      : `I understand your question! On this topic, Mario always emphasizes practical value and measurable outcomes. Feel free to ask about his Scrum (SFPC) leadership, software delivery at GNP Seguros, Python/Apps Script automations, or schedule a direct 15-min discovery call via Calendly.`;
  };

  // Typewriter streaming effect
  const typeText = (fullText: string) => {
    setIsTyping(true);
    setStreamedText('');
    let charIndex = 0;
    playSound('copilot');

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      if (charIndex < fullText.length) {
        charIndex += 2; // Fast & smooth streaming
        setStreamedText(fullText.slice(0, charIndex));
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setMessages((prev) => [...prev, { role: 'assistant', text: fullText }]);
        setStreamedText('');
        setIsTyping(false);
      }
    }, 18);
  };

  const sendMessage = (text: string) => {
    playSound('click');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    const response = getResponse(text);
    setTimeout(() => {
      typeText(response);
    }, 450);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
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

            {/* Quick questions & Persona mode switcher */}
            <div className="glass-card rounded-3xl p-4">
              <div className="flex items-center justify-between gap-2 mb-3 px-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.copilot.quickQuestionsTitle}</p>
              </div>

              {/* Mode selector: General | Recruiter HR | Technical PM */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/40 rounded-xl mb-3 border border-white/5 text-xs font-semibold">
                <button
                  onClick={() => { playSound('click'); setPersonaMode('recruiter'); }}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all ${
                    personaMode === 'recruiter'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  {language === 'es' ? 'Reclutador' : 'Recruiter'}
                </button>
                <button
                  onClick={() => { playSound('click'); setPersonaMode('technical'); }}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all ${
                    personaMode === 'technical'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  {language === 'es' ? 'Técnico / PMO' : 'Tech / PMO'}
                </button>
              </div>

              {/* Filtered questions based on personaMode */}
              <div className="flex flex-col gap-2">
                {(personaMode === 'recruiter'
                  ? [
                      {
                        label: language === 'es' ? '¿Cuál es su expectativa salarial?' : 'What is his salary expectation?',
                        q: language === 'es' ? '¿Cuál es tu rango salarial y disponibilidad?' : 'What is your salary range and availability?'
                      },
                      {
                        label: language === 'es' ? '¿Cuál es su nivel de inglés?' : 'What is his English level?',
                        q: language === 'es' ? '¿Cuál es tu nivel de inglés?' : 'What is your English proficiency level?'
                      },
                      {
                        label: language === 'es' ? '¿Certificación Scrum (SFPC)?' : 'Scrum Certification (SFPC)?',
                        q: language === 'es' ? 'Háblame de tu certificación Scrum SFPC' : 'Tell me about your Scrum SFPC certification'
                      }
                    ]
                  : [
                      {
                        label: language === 'es' ? '¿Cómo automatiza el reporteo?' : 'How does he automate reporting?',
                        q: language === 'es' ? '¿Cómo automatiza Mario el seguimiento y reporteo?' : 'How does Mario automate tracking and reporting?'
                      },
                      {
                        label: language === 'es' ? '¿Flujos de IA & LangFlow?' : 'AI Agents & LangFlow flows?',
                        q: language === 'es' ? '¿Qué herramientas de IA y scripting utiliza?' : 'What AI tools and scripting does Mario use?'
                      },
                      {
                        label: language === 'es' ? '¿Experiencia en GNP Seguros?' : 'Experience at GNP Seguros?',
                        q: language === 'es' ? 'Cuéntame de tu experiencia en GNP Seguros' : 'Tell me about your experience at GNP Seguros'
                      }
                    ]
                ).map((qItem) => (
                  <button
                    key={qItem.label}
                    onClick={() => sendMessage(qItem.q)}
                    disabled={isTyping}
                    className="flex items-start gap-2 px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-xl transition-all border border-transparent hover:border-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  >
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400 mt-0.5" />
                    {qItem.label}
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

              {/* Live typewriter streaming message bubble */}
              {isTyping && streamedText && (
                <div className="flex gap-2.5 max-w-[85%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
                    <img
                      src="/agente.png"
                      alt="Mario"
                      className="w-full h-full rounded-full object-cover object-top bg-[#0a0e27]"
                    />
                  </div>
                  <div className="glass text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm border border-cyan-500/30 text-sm leading-relaxed shadow-lg shadow-cyan-500/5">
                    {streamedText}
                    <span className="inline-block w-1.5 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />
                  </div>
                </div>
              )}

              {/* Waiting indicator when typing hasn't started streaming yet */}
              {isTyping && !streamedText && (
                <div className="flex gap-2.5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500 to-purple-600 p-0.5">
                    <img
                      src="/agente.png"
                      alt="Mario"
                      className="w-full h-full rounded-full object-cover object-top bg-[#0a0e27]"
                    />
                  </div>
                  <div className="glass px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 border border-white/10 items-center">
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
