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

    // 1. Conversational Greetings & Small Talk (Lua's charming perspective)
    if (/^(hola|buenos d[ií]as|buenas tardes|buenas noches|hey|qu[eé] tal|c[oó]mo est[aá]s|saludos|que onda|buenas|miau|miau miau)/i.test(qLower)) {
      return isEs
        ? '¡Miau! 🐾 Hola. Soy Lua, el agente gatuno de Mario. Siempre estoy en su escritorio mientras él dirige sprints y programa scripts. Me sé todos sus trucos y cómo trabaja. ¿Qué quieres saber sobre sus proyectos o experiencia?'
        : 'Meow! 🐾 Hello! I am Lua, Mario\'s feline agent. I supervise him from his desk during every single sprint and script execution. I know all his work habits and methods. What would you like to know about his projects or experience?';
    }

    if (/^(gracias|muchas gracias|agradecido|thanks|thank you|thx)/i.test(qLower)) {
      return isEs
        ? '¡De nada! *ronronea felizmente* 😸 Si quieres saber más o quieres agendar una entrevista con Mario para tu equipo, pregúntame o dale clic a su botón de Calendly.'
        : 'You are very welcome! *purrs happily* 😸 If you want to know more or want to book an interview with Mario for your team, feel free to ask or click his Calendly link!';
    }

    if (/^(adi[oó]s|hasta luego|bye|chao|nos vemos|goodbye)/i.test(qLower)) {
      return isEs
        ? '¡Hasta luego! Me voy a tomar una siesta sobre el teclado de Mario mientras él sigue trabajando. ¡Mucho éxito y gracias por visitarnos! 🐾💤'
        : 'Goodbye! I\'m heading for a quick nap on Mario\'s keyboard while he keeps coding. Best of luck and thank you for stopping by! 🐾💤';
    }

    if (/^(qui[eé]n eres|qui[eé]n es lua|qui[eé]n es mario|cu[aá]ntame de ti|who are you|about you|secretos)/i.test(qLower)) {
      return isEs
        ? '¡Te cuento! 🐾 Soy Lua, el agente gatuno oficial de Mario. ¿Un secreto suyo? No tolera las reuniones eternas ni el trabajo manual repetitivo: si una tarea toma más de 10 minutos al día, ¡de inmediato le escribe un script en Python o un agente de IA para automatizarla! Lleva 7 años en software, está certificado en Scrum y su lema es entregar a tiempo y sin fricción.'
        : 'Let me tell you! 🐾 I am Lua, Mario\'s official feline agent. A secret about him? He hates endless meetings and repetitive busywork: if a task takes more than 10 minutes a day, he immediately writes a Python script or spins up an AI Agent to automate it! He has 7+ years in software, is Scrum certified (SFPC), and ensures deliverables ship on schedule.';
    }

    if (/(qu[eé] haces|para qu[eé] sirves|ayuda|help)/i.test(qLower)) {
      return isEs
        ? 'Superviso que Mario trabaje feliz y te cuento con total honestidad sobre sus proyectos (como cuando redujo 40% del reporteo en Badak para GNP Seguros o aceleró 30% a su squad en Niku Tech). Puedes preguntarme de sus certificaciones, su forma de liderar o cómo contactarlo. 🐾'
        : 'I make sure Mario stays focused and I share honest insights about his projects (like when he cut 40% reporting time at Badak for GNP Seguros, or boosted squad velocity by 30% at Niku Tech). Ask me about his certifications, leadership, or how to reach him! 🐾';
    }

    // 1.1 Protección de datos sensibles / privacidad (dirección exacta, cuentas, documentos personales, etc.)
    if (qLower.includes('direccion exacta') || qLower.includes('dirección exacta') || qLower.includes('calle') || qLower.includes('numero') || qLower.includes('rfc') || qLower.includes('curp') || qLower.includes('banco') || qLower.includes('cuenta') || qLower.includes('ine') || qLower.includes('pasaporte') || qLower.includes('password') || qLower.includes('contraseña') || qLower.includes('tarjeta')) {
      return isEs
        ? '¡Miau! 🐾 Por políticas de privacidad y seguridad, no comparto datos personales sensibles (como identificaciones oficiales, dirección física exacta o datos fiscales). Puedes consultar libremente su trayectoria profesional, credenciales técnicas y métodos de contacto laboral.'
        : 'Meow! 🐾 For privacy and security reasons, I do not disclose sensitive personal information (such as official IDs, exact street address, or tax credentials). You are welcome to explore his professional background, technical track record, and business contact info.';
    }

    // Direct match with preset questions
    const exactMatch = t.copilot.questions.find((q) => q.question.toLowerCase() === qLower);
    if (exactMatch) return exactMatch.answer;

    // 2. Idiomas / Nivel de Inglés (English proficiency)
    if (qLower.includes('ingl') || qLower.includes('english') || qLower.includes('idioma') || qLower.includes('language') || qLower.includes('bilingual') || qLower.includes('b2')) {
      return isEs
        ? '¡Miau! 🐾 El nivel de inglés de Mario es Intermedio Avanzado (B2 profesional). Cuenta con fluidez para coordinar squads técnicos internacionales, participar en ceremonias ágiles (Dailies, Plannings, Reviews), redactar documentación técnica y gestionar requerimientos con stakeholders en inglés. Su lengua materna es el español.'
        : 'Meow! 🐾 Mario\'s English proficiency is Upper-Intermediate (Professional B2). He actively coordinates with cross-border technical squads, conducts Agile ceremonies (Dailies, Plannings, Sprint Reviews), writes technical documentation, and communicates comfortably with English-speaking stakeholders. His native language is Spanish.';
    }

    // 3. Salario, Disponibilidad, Esquema de Trabajo (Salary, Availability, Work Mode)
    const isSalaryQuery = qLower.includes('salari') || qLower.includes('sueldo') || qLower.includes('cuanto gana') || qLower.includes('cuánto gana') || qLower.includes('tarifa') || qLower.includes('rate') || qLower.includes('salary') || qLower.includes('compensation') || qLower.includes('compensac') || qLower.includes('disponib') || qLower.includes('remoto') || qLower.includes('hibrid') || qLower.includes('cuándo puede empezar') || qLower.includes('cuando puede empezar') || qLower.includes('when can he start') || qLower.includes('usd') || qLower.includes('dolar') || qLower.includes('dollar');
    if (isSalaryQuery) {
      const isEnglishQuery = /salary|rate|compensation|usd|dollar|when can|availability|how much/i.test(qLower) || !isEs;
      if (isEnglishQuery) {
        return 'Meow! 🐾 Mario\'s target compensation is approximately $2,400 – $2,600 USD net monthly (~$45,000 MXN net, equivalent to ~$32,000 – $36,000 USD gross annually depending on contract type and benefits package). He has immediate availability (Open to Work) for 100% remote or hybrid positions as an IT Project Manager, Scrum Master, or AI/Automation Lead.';
      }
      return '¡Te cuento! 🐾 La expectativa salarial de Mario es de $45,000 MXN netos mensuales (~$2,400 – $2,600 USD netos mensuales, o su equivalente según esquema contractual y paquete de beneficios). En cuanto a disponibilidad, está disponible de manera inmediata (Open to Work) para esquemas 100% remotos o híbridos en roles de IT Project Manager, Scrum Master o Líder de Automatización e IA.';
    }

    // 4. Ubicación / Residencia / Relocación
    if (qLower.includes('donde vive') || qLower.includes('dónde vive') || qLower.includes('ubicacion') || qLower.includes('ubicación') || qLower.includes('pais') || qLower.includes('ciudad') || qLower.includes('puebla') || qLower.includes('location') || qLower.includes('reloc')) {
      return isEs
        ? 'Mario radica en San Andrés Cholula, Puebla, México. Trabaja habitualmente en esquema remoto con equipos distribuidos en cualquier zona horaria (CST, EST, etc.) y cuenta con total disponibilidad para colaborar globalmente.'
        : 'Mario is based in San Andrés Cholula, Puebla, Mexico. He regularly collaborates remotely with distributed teams across multiple time zones (CST, EST, PST) and is fully equipped for global work.';
    }

    // 5. Certificaciones / SFPC / CertiProf
    if (qLower.includes('certif') || qLower.includes('sfpc') || qLower.includes('certiprof') || qLower.includes('credencial') || qLower.includes('examen')) {
      return isEs
        ? 'Mario cuenta con la certificación oficial Scrum Professional Certificate (SFPC) expedida por CertiProf con ID de credencial #92706455. Esta certificación valida su dominio en ceremonias Scrum, gestión de sprints, roles ágiles, estimación en Story Points y resolución continua de bloqueos.'
        : 'Mario holds the official Scrum Professional Certificate (SFPC) issued by CertiProf (Credential ID: 92706455). This validates his mastery in Scrum ceremonies, sprint backlog governance, agile estimation with Story Points, and continuous impediment removal.';
    }

    // 6. Badak Innovación & GNP Seguros
    if (qLower.includes('gnp') || qLower.includes('badak') || qLower.includes('seguro') || qLower.includes('insurance')) {
      return isEs
        ? 'Mario laboró como Project Manager en Badak Innovación (Ene 2024 – Sep 2026), asignado específicamente a la fábrica de software para el cliente GNP Seguros. Allí dirigió entregables contractuales en tiempo, alcance y costo; automatizó reportes semanales con Google Apps Script y herramientas de IA (reduciendo 40% el tiempo administrativo); y coordinó dailies con control de defectos y calidad en Jira ante la PMO.'
        : 'Mario worked as Project Manager at Badak Innovación (Jan 2024 – Sep 2026), dedicated directly to the software factory for client GNP Seguros. He governed deliverables within scope, schedule, and budget; automated weekly status reports via Google Apps Script & AI tools (saving 40% reporting time); and led daily syncs with defect triage in Jira for the PMO.';
    }

    // 7. Niku Tecnología
    if (qLower.includes('niku') || qLower.includes('crm') || qLower.includes('velocidad') || qLower.includes('velocity')) {
      return isEs
        ? 'En Niku Tecnología (Dic 2020 – Nov 2023), como Project Lead Manager, implementó el marco Scrum incrementando en un 30% la velocidad de entrega del equipo. Integró agentes de IA y scripts en Python / Google Apps Script para automatizar la gestión e interacción en CRM, y desarrolló WBS, cronogramas, presupuestos y matrices de riesgos integrales.'
        : 'At Niku Tecnología (Dec 2020 – Nov 2023) as Project Lead Manager, he rolled out Scrum boosting squad delivery velocity by 30%. He integrated AI agents and Python / Apps Script automations for CRM workflows and led end-to-end WBS, scheduling, budgets, and risk mitigation matrices.';
    }

    // 8. Track Digital Communication & Experiencia Previa (Book Mart / Unity / AR)
    if (qLower.includes('track digital') || qLower.includes('book mart') || qLower.includes('multimedia') || qLower.includes('ar') || qLower.includes('unity') || qLower.includes('vuforia') || qLower.includes('pasado') || qLower.includes('experiencia previa')) {
      return isEs
        ? 'En Track Digital Communication (2018 – 2020) gestionó proyectos digitales y multimedia alineándolos a KPIs estratégicos de negocio. Previamente, en Book Mart (2014 – 2018) lideró proyectos interactivos, apps móviles y experiencias de Realidad Aumentada con Unity y Vuforia, lo que le da una sólida base técnica y de producto digital.'
        : 'At Track Digital Communication (2018 – 2020), he aligned digital & multimedia project delivery with business KPIs. Earlier at Book Mart (2014 – 2018), he directed interactive solutions, mobile apps, and Augmented Reality experiences with Unity and Vuforia, giving him deep technical product foundation.';
    }

    // 9. Jira, Defectos, Bugs, Trazabilidad, Métricas y Calidad
    if (qLower.includes('incidente') || qLower.includes('incident') || qLower.includes('jira') || qLower.includes('defecto') || qLower.includes('bug') || qLower.includes('trazabilidad') || qLower.includes('sla') || qLower.includes('calidad') || qLower.includes('qa')) {
      return isEs
        ? 'Mario tiene un enfoque riguroso de calidad en Jira: implementó trazabilidad completa de incidencias y defectos (tiempo de ciclo, causa raíz, severidad y área responsable). Esto proporciona visibilidad transparente a la PMO y clientes, previniendo cuellos de botella y sustentando negociaciones objetivas ante cualquier cambio de alcance.'
        : 'Mario maintains a rigorous defect governance in Jira: he instituted end-to-end bug traceability (cycle times, root cause, severity, and accountability). This gives full transparency to the PMO and clients, eliminating bottlenecks and supporting data-backed negotiations.';
    }

    // 10. Automatizaciones (Python, Google Apps Script, Scripts)
    if (qLower.includes('automatiz') || qLower.includes('script') || qLower.includes('python') || qLower.includes('apps script') || qLower.includes('ahorro') || qLower.includes('40%') || qLower.includes('reporte')) {
      return isEs
        ? 'La automatización es el sello distintivo de Mario: diseña scripts en Python y Google Apps Script que reducen un 40% del tiempo operativo en la generación de reportes ejecutivos de avance, seguimiento de compromisos y consolidación de métricas, eliminando errores manuales.'
        : 'Automation is Mario\'s signature strength: he engineers Python and Google Apps Script workflows that cut 40% of manual effort in weekly status reporting, client commitments, and metric aggregation, eradicating manual error.';
    }

    // 11. Inteligencia Artificial, Agentes de IA, LangFlow, Prompt Engineering
    if (qLower.includes('ia') || qLower.includes('ai') || qLower.includes('inteligencia artificial') || qLower.includes('langflow') || qLower.includes('agent') || qLower.includes('prompt') || qLower.includes('llm')) {
      return isEs
        ? 'Mario domina el ecosistema de IA aplicada a operaciones y software: desarrolla Agentes de IA autónomos, pipelines visuales en LangFlow y técnicas avanzadas de Prompt Engineering para monitoreo de tareas, gestión inteligente de CRM y aceleración de equipos ágiles (¡como yo, Lua!).'
        : 'Mario excels in operational and software AI: he builds autonomous AI Agents, LangFlow visual pipelines, and advanced Prompt Engineering for task tracking, CRM intelligence, and agile team acceleration (just like me, Lua!).';
    }

    // 12. Metodologías (Scrum, Kanban, Waterfall, PMBOK, Agile)
    if (qLower.includes('metodolog') || qLower.includes('scrum') || qLower.includes('kanban') || qLower.includes('agil') || qLower.includes('waterfall') || qLower.includes('pmbok') || qLower.includes('marco') || qLower.includes('framework')) {
      return isEs
        ? 'Mario es un Project Manager híbrido: domina marcos ágiles (Scrum, Kanban) para desarrollo iterativo y entregas rápidas con feedback continuo, complementado con las mejores prácticas tradicionales de PMBOK/Waterfall (WBS, matrices de riesgo, gestión de cronogramas y control presupuestal estricto).'
        : 'Mario is a versatile hybrid PM: he leads Agile frameworks (Scrum, Kanban) for iterative delivery and continuous feedback, combined with PMBOK/Waterfall governance (WBS, risk mitigation matrices, critical path scheduling, and strict budget controls).';
    }

    // 13. Herramientas y Software (Tools, Jira, Monday, ClickUp, Miro, GitHub, etc.)
    if (qLower.includes('herramienta') || qLower.includes('software') || qLower.includes('tool') || qLower.includes('monday') || qLower.includes('clickup') || qLower.includes('trello') || qLower.includes('miro') || qLower.includes('figma') || qLower.includes('git') || qLower.includes('project')) {
      return isEs
        ? 'Mario domina: Jira, Monday.com, ClickUp, Trello, MS Project, GitLab / GitHub, Miro, Figma, Google Workspace y entornos de automatización con Python, VS Code y Google Apps Script.'
        : 'Mario\'s toolbelt includes: Jira, Monday.com, ClickUp, Trello, MS Project, GitLab / GitHub, Miro, Figma, Google Workspace, plus development tooling like Python, VS Code, and Google Apps Script.';
    }

    // 14. Soft Skills & Liderazgo de Equipos
    if (qLower.includes('lider') || qLower.includes('soft skill') || qLower.includes('habilidad') || qLower.includes('comunicac') || qLower.includes('negociac') || qLower.includes('equipo') || qLower.includes('problema') || qLower.includes('conflict')) {
      return isEs
        ? 'Sus principales soft skills son: liderazgo empático de squads multidisciplinarios, comunicación clara y asertiva entre negocio y desarrollo técnico, negociación constructiva con stakeholders/clientes ante cambios de alcance, y resolución ágil de bloqueos (<24 horas).'
        : 'His standout soft skills include: empathetic leadership of cross-functional squads, bridge communication between business stakeholders and engineers, high-stakes scope negotiation, and proactive impediment clearing (<24h unblocking).';
    }

    // 15. Educación & Estudios (Carrera, BUAP, UVP)
    if (qLower.includes('educa') || qLower.includes('estudio') || qLower.includes('universidad') || qLower.includes('buap') || qLower.includes('uvp') || qLower.includes('carrera') || qLower.includes('licenciatura') || qLower.includes('diplomado') || qLower.includes('degree')) {
      return isEs
        ? 'Mario es Licenciado en Ciencias de la Comunicación por la BUAP (Benemérita Universidad Autónoma de Puebla, 2014) y cuenta con un Diplomado en Gestión de Proyectos por la Universidad del Valle de Puebla (UVP, 2023), además de su certificación profesional en Scrum SFPC por CertiProf.'
        : 'Mario holds a Bachelor\'s Degree in Communication Sciences from BUAP (2014) and a Postgraduate Specialization Diploma in Project Management from Universidad del Valle de Puebla (UVP, 2023), alongside his official Scrum Professional Certificate (SFPC) from CertiProf.';
    }

    // 16. Contacto / Correo / Teléfono / LinkedIn
    if (qLower.includes('contacto') || qLower.includes('correo') || qLower.includes('email') || qLower.includes('telefono') || qLower.includes('teléfono') || qLower.includes('celular') || qLower.includes('whatsapp') || qLower.includes('linkedin') || qLower.includes('contrat') || qLower.includes('hire') || qLower.includes('llamada')) {
      return isEs
        ? 'Puedes contactar a Mario directamente por correo a magc2204@gmail.com, por teléfono/WhatsApp al +52 22 21 81 78 07, en su LinkedIn (linkedin.com/in/mario-g-b17aba151), o agendando una videollamada de 15 minutos en el botón de Calendly al pie de página.'
        : 'You can reach Mario directly via email at magc2204@gmail.com, phone/WhatsApp at +52 22 21 81 78 07, on LinkedIn (linkedin.com/in/mario-g-b17aba151), or by scheduling a 15-min discovery call via the Calendly button at the bottom of the page.';
    }

    // 17. Playbook de entrega de proyectos
    if (qLower.includes('como lidera') || qLower.includes('playbook') || qLower.includes('como trabaja') || qLower.includes('como gestiona') || qLower.includes('ciclo')) {
      return isEs
        ? 'El playbook de entrega de Mario consta de 4 fases clave: 1) Backlog & Refinamiento (Historias con DoD clara y sin ambigüedades); 2) Sprint Planning & Estimación (Story Points calibrados a la velocidad real del equipo); 3) Ejecución & Bloqueos <24h (Dailies enfocadas en dependencias y mitigación de riesgos con la PMO); 4) Reportes Automáticos & Entrega (Scripts en Python/Apps Script que ahorran 40% de tiempo y trazabilidad de calidad en Jira).'
        : 'Mario\'s delivery playbook follows 4 core stages: 1) Backlog & Refinement (Clear DoD without ambiguity); 2) Sprint Planning & Sizing (Calibrated to squad velocity); 3) Execution & Fast Unblocking (<24h impediment triage with stakeholders); 4) Automated Reporting & Delivery (Python/Apps Script pipelines saving 40% admin hours and full Jira defect traceability).';
    }

    // 19. ¿Por qué deberíamos contratar a Mario? / Propuesta de Valor Única (Why hire Mario)
    if (qLower.includes('por que') || qLower.includes('por qué') || qLower.includes('contratar') || qLower.includes('valor') || qLower.includes('diferencia') || qLower.includes('why hire') || qLower.includes('why should we hire')) {
      return isEs
        ? '¡La razón número 1 es su perfil híbrido! 🐾 Mario no es un PM que solo pide estatus en reuniones: 1) Entiende el código y la arquitectura técnica; 2) Está certificado en Scrum (SFPC); 3) Automatiza con Python y herramientas de IA eliminando 40% de burocracia manual; y 4) Tiene experiencia probada en cuentas de alta exigencia como GNP Seguros entregando en tiempo, costo y calidad.'
        : 'The number 1 reason is his hybrid profile! 🐾 Mario isn\'t a PM who just asks for updates in meetings: 1) He understands technical architecture; 2) He is SFPC Scrum certified; 3) He automates reporting via Python & AI saving 40% admin overhead; and 4) He has delivered on high-stakes enterprise accounts like GNP Seguros on time, budget, and scope.';
    }

    // 20. Manejo de Conflictos y Presión con Stakeholders / Scope Creep
    if (qLower.includes('conflicto') || qLower.includes('presion') || qLower.includes('presión') || qLower.includes('retraso') || qLower.includes('cambio de alcance') || qLower.includes('scope creep') || qLower.includes('cliente dificil') || qLower.includes('cliente difícil')) {
      return isEs
        ? 'Ante atrasos o cambios de alcance (scope creep), Mario aplica un principio clave: "Datos transparentes matan suposiciones". Usa métricas de velocidad en Jira y reportes automatizados para negociar con el cliente y la PMO con hechos objetivos: si entra nuevo alcance, se recalibra el backlog o se ajusta la fecha con acuerdos claros, protegiendo al equipo de burnout.'
        : 'When facing delays or scope creep, Mario follows a core principle: "Transparent data beats assumptions". He leverages Jira velocity metrics and automated tracking to negotiate objectively with clients and PMOs: if scope changes, backlog priorities or deadlines shift transparently, shielding the squad from burnout.';
    }

    // 21. Gestión de Equipos Remotos / Distribuidos (Remote Team Leadership)
    if (qLower.includes('equipo remoto') || qLower.includes('gestion remota') || qLower.includes('gestión remota') || qLower.includes('home office') || qLower.includes('distribuido') || qLower.includes('remote management')) {
      return isEs
        ? 'Mario gestiona equipos remotos mediante objetivos claros (DoD), ceremonias ágiles concisas (máximo 15 min en Dailies), tableros transparentes en Jira/ClickUp y comunicación asíncrona documentada en Slack o Teams, garantizando alta autonomía y alineación sin micro-management.'
        : 'Mario leads remote squads through clear Definitions of Done (DoD), timeboxed agile rituals (<15 min Dailies), transparent Jira/ClickUp boards, and documented async communication in Slack/Teams, driving high squad autonomy without micromanagement.';
    }

    // 22. Puente entre Negocio y Desarrollo (Business vs Technical Translator)
    if (qLower.includes('negocio') || qLower.includes('desarrollador') || qLower.includes('traductor') || qLower.includes('puente') || qLower.includes('tecnico y negocio') || qLower.includes('técnico y negocio')) {
      return isEs
        ? 'Al tener formación en Comunicación (BUAP) combinada con diplomado en PM (UVP) y dominio de Python/IA, Mario actúa como un puente natural: traduce requerimientos de negocio y necesidades del cliente a Historias de Usuario técnicas y medibles sin ambigüedad para los desarrolladores.'
        : 'With a background in Communication (BUAP), a PM specialization (UVP), and hands-on Python/AI skills, Mario acts as a seamless bridge: translating business goals into unambiguous, actionable technical User Stories for engineering teams.';
    }

    // Human and natural conversational fallback with cat flair
    return isEs
      ? `¡Miau! 🐾 Como agente gatuno de Mario, conozco a fondo todo su CV. Puedo contarte sobre su nivel de inglés (B2 profesional), su trabajo en GNP Seguros con Badak, sus certificaciones (Scrum SFPC CertiProf), cómo automatiza reportes con Python y Apps Script, sus herramientas favoritas (Jira, Monday, ClickUp) o darte sus datos de contacto directo. ¿Cuál de estos te interesa más?`
      : `Meow! 🐾 As Mario's feline agent, I know every detail of his resume. I can tell you about his English proficiency (B2 Upper-Intermediate), software factory leadership for GNP Seguros, Scrum SFPC certification, Python/Apps Script automations, tools (Jira, Monday, ClickUp), or share his direct contact info. What would you like to explore?`;
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
                    src="/gato2.png"
                    alt="Lua - El Agente Gatuno de Mario"
                    className="hologram-character max-h-[260px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_10px_25px_rgba(6,182,212,0.4)]"
                  />
                </div>
              </div>

              {/* Agent info */}
              <div className="text-center relative z-10 pt-2 border-t border-white/10 w-full">
                <h3 className="font-display font-bold text-white text-base flex items-center justify-center gap-1.5">
                  Lua 🐾 <span className="text-xs text-cyan-400 font-normal">({language === 'en' ? "Mario's Feline Agent" : 'Agente Gatuno de Mario'})</span>
                </h3>
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
                        label: language === 'es' ? '¿Cómo lidera y entrega un proyecto?' : 'How does he lead and deliver projects?',
                        q: language === 'es' ? '¿Cuál es el playbook o metodología de entrega de Mario?' : 'What is Mario\'s delivery playbook and methodology?'
                      },
                      {
                        label: language === 'es' ? '¿Cómo automatiza el reporteo?' : 'How does he automate reporting?',
                        q: language === 'es' ? '¿Cómo automatiza Mario el seguimiento y reporteo?' : 'How does Mario automate tracking and reporting?'
                      },
                      {
                        label: language === 'es' ? '¿Flujos de IA & LangFlow?' : 'AI Agents & LangFlow flows?',
                        q: language === 'es' ? '¿Qué herramientas de IA y scripting utiliza?' : 'What AI tools and scripting does Mario use?'
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
                  src="/gato2.png"
                  alt="Lua 🐾"
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
                        src="/gato2.png"
                        alt="Lua 🐾"
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
                      src="/gato2.png"
                      alt="Lua 🐾"
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
                      src="/gato2.png"
                      alt="Lua 🐾"
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
