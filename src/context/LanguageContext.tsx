import React, { createContext, useContext, useState } from 'react';

export type Language = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      about: 'Sobre Mí',
      metrics: 'Logros & Métricas',
      experience: 'Experiencia Laboral',
      copilot: 'Pregúntale a mi Agente IA',
      contact: 'Contacto',
    },
    hero: {
      availability: 'OPEN TO WORK • DISPONIBLE PARA NUEVOS RETOS',
      role: 'IT Project Manager & AI / Automation',
      subtitle: 'Metodologías Ágiles & Optimización de Procesos',
      intro: 'IT Project Manager con 7 años de experiencia liderando la entrega de proyectos tecnológicos y soluciones de software. Especializado en metodologías ágiles (Scrum, Kanban) y gestión tradicional (PMBOK/Waterfall). Experto en la optimización de procesos operativos, seguimiento con cliente y generación de reportes mediante automatización con Google Apps Script, Python y flujos de Inteligencia Artificial (LangFlow, agentes de IA).',
      downloadCv: 'Descargar CV (PDF)',
      exploreProjects: 'Ver Trayectoria & Proyectos',
      statsYears: 'Años',
      statsYearsSub: 'Experiencia IT',
      statsScrum: 'Scrum',
      statsScrumSub: 'SFPC CertiProf',
      statsAi: 'IA',
      statsAiSub: 'Automation',
      scroll: 'Desplazar',
    },
    metrics: {
      tag: 'Impacto Comprobado',
      title: 'Logros &',
      titleHighlight: 'Métricas de Impacto',
      subtitle: 'Resultados medibles en eficiencia operativa, reducción de tiempos y velocidad de entrega en proyectos tecnológicos reales.',
      reduced: 'Reducido',
      boosted: 'Incremento',
      stats: [
        {
          value: -40,
          suffix: '%',
          label: 'Tiempo en Reporteo',
          description: 'Diseñé e implementé scripts en Google Apps Script para reportes de avance y seguimiento de compromisos.',
          color: '#06b6d4',
          icon: 'clock',
        },
        {
          value: 30,
          suffix: '%',
          label: 'Velocidad de Entrega',
          description: 'Implementé el marco ágil Scrum y automatizaciones de flujo de trabajo, acortando ciclos de respuesta.',
          color: '#8b5cf6',
          icon: 'rocket',
        },
        {
          value: 7,
          suffix: '+',
          label: 'Años de Experiencia IT',
          description: 'Liderando software para fábricas (GNP Seguros), startups y desarrollo interactivo multimedia.',
          color: '#f97316',
          icon: 'award',
        },
      ]
    },
    kanban: {
      tag: 'Trayectoria Profesional',
      title: 'Experiencia &',
      titleHighlight: 'Gestión de Proyectos',
      subtitle: 'Hitos profesionales organizados en formato ágil: desde el stack de automatizaciones hasta roles clave y entregables completados.',
      boardMeta: {
        sprint: 'Dirección de Proyectos & Entregables',
        activeBadge: 'EN ACTIVO',
        pmLeadLabel: 'Líder Técnico',
        dragHint: 'Arrastra tarjetas o usa el selector de vista',
        timelineSprint: 'Historial Profesional & Educación',
        timelineBadge: 'CRONOLOGÍA',
        timelineHint: '',
        filterAll: 'Todas las tareas',
        viewBoard: 'Tablero Ágil',
        viewTimeline: 'Línea de Tiempo',
        storyPoints: 'Story Points',
        wipLimit: 'Límite WIP',
      },
      backlog: {
        id: 'backlog',
        title: 'Product Backlog',
        subtitle: 'Requerimientos & Stack Tecnológico',
        wip: '6 items',
        color: '#06b6d4',
        tickets: [
          { id: 'MAR-101', title: 'Flujos con Agentes de IA & LangFlow', tag: 'AI / Automation', priority: 'High', points: '8 SP', epic: 'Inteligencia Artificial', assignee: 'MG' },
          { id: 'MAR-102', title: 'Python Scripting & Google Apps Script', tag: 'Automatización', priority: 'High', points: '5 SP', epic: 'Procesos & Datos', assignee: 'MG' },
          { id: 'MAR-103', title: 'Scrum Professional Certificate (SFPC)', tag: 'CertiProf #92706455', priority: 'Highest', points: '5 SP', epic: 'Gobernanza Ágil', assignee: 'MG' },
          { id: 'MAR-104', title: 'Frameworks Scrum, Agile & Métodos Kanban', tag: 'Metodología', priority: 'Medium', points: '5 SP', epic: 'Cultura Ágil', assignee: 'MG' },
          { id: 'MAR-105', title: 'Gestión Tradicional Waterfall / PMBOK', tag: 'Gestión de Proyectos', priority: 'Medium', points: '3 SP', epic: 'Gobernanza', assignee: 'MG' },
          { id: 'MAR-106', title: 'Herramientas PM: Jira, Monday, ClickUp, Miro', tag: 'Software PM', priority: 'Medium', points: '3 SP', epic: 'Tooling', assignee: 'MG' },
        ],
      },
      inProgress: {
        id: 'in-progress',
        title: 'In Progress / Sprint Activo',
        subtitle: 'Roles Clave & Dirección de Proyectos',
        wip: '3 roles activos',
        color: '#8b5cf6',
        tickets: [
          {
            id: 'MAR-201',
            title: 'Badak Innovación (Cuenta GNP Seguros)',
            tag: 'Cliente: GNP Seguros',
            priority: 'Highest',
            period: 'Ene 2024 – Sep 2026',
            points: '13 SP',
            epic: 'Sector Asegurador',
            assignee: 'MG',
            description: 'Project Manager en Badak Innovación, asignado a la fábrica de software para el cliente GNP Seguros. Dirección de entregables en tiempo, alcance y presupuesto. Automatización de reportes semanales con Google Apps Script ante la PMO. Coordinación de ceremonias ágiles y gestión de incidencias en Jira.',
          },
          {
            id: 'MAR-202',
            title: 'Niku Tecnología S.A. de C.V.',
            tag: 'Project Lead Manager',
            priority: 'High',
            period: 'Dic 2020 – Nov 2023',
            points: '13 SP',
            epic: 'Escalamiento Tech',
            assignee: 'MG',
            description: 'Implementación del marco Scrum (+30% velocidad de entrega). Integración de agentes IA y Python/Apps Script para CRM. Elaboración de WBS, cronogramas, presupuestos y matrices de riesgos.',
          },
          {
            id: 'MAR-203',
            title: 'Track Digital Communication',
            tag: 'PM / Especialista Digital',
            priority: 'Medium',
            period: 'Ago 2018 – Nov 2020',
            points: '8 SP',
            epic: 'Proyectos Digitales',
            assignee: 'MG',
            description: 'Alineación de proyectos digitales y multimedia con los KPIs estratégicos de negocio y requerimientos del cliente.',
          },
        ],
      },
      done: {
        id: 'done',
        title: 'Done / Entregables Verificados',
        subtitle: 'Resultados e Impacto Medible',
        wip: 'Completado 100%',
        color: '#22c55e',
        tickets: [
          {
            id: 'MAR-301',
            title: 'Automatización de Reportes & Seguimiento',
            tag: '-40% Tiempo Invertido',
            priority: 'Done',
            points: '8 SP',
            epic: 'Eficiencia',
            assignee: 'MG',
            description: 'Reducción del 40% del tiempo operativo en la generación de reportes ejecutivos de avance y seguimiento de compromisos con clientes mediante Google Apps Script.',
          },
          {
            id: 'MAR-302',
            title: 'Aceleración de Velocidad de Entrega',
            tag: '+30% Velocity Boost',
            priority: 'Done',
            points: '8 SP',
            epic: 'Agilidad',
            assignee: 'MG',
            description: 'Adopción de Scrum y automatizaciones de flujo de trabajo que incrementaron sustancialmente la cadencia de entregas en equipos multidisciplinarios.',
          },
          {
            id: 'MAR-303',
            title: 'Optimización Operativa con IA & Scripting',
            tag: 'Cero Defectos Críticos',
            priority: 'Done',
            points: '5 SP',
            epic: 'Calidad & IA',
            assignee: 'MG',
            description: 'Pipelines automatizados con Python, Google Apps Script y agentes de IA para supervisión de tareas y erradicación de errores en documentación.',
          },
        ],
      },
    },
    copilot: {
      tag: 'Agente Gatuno IA',
      title: 'Conversa con',
      titleHighlight: 'Lua 🐾',
      subtitle: 'El agente gatuno de Mario. Conoce sus proyectos en Scrum, automatizaciones con Python y cómo lidera squads de desarrollo.',
      botStatus: 'RONRONEANDO • EN VIVO',
      botTitle: 'Lua 🐾 (Agente Gatuno)',
      quickQuestionsTitle: 'Preguntas Rápidas para Lua',
      greeting: '¡Hola! 🐾 Soy Lua, el agente gatuno de Mario. Siempre lo acompaño en cada sprint y conozco todo sobre su trabajo y proyectos. Dime, ¿qué quieres saber de él?',
      inputPlaceholder: 'Pregúntale al agente gatuno sobre Mario...',
      send: 'Enviar',
      defaultResponse: '¡Excelente pregunta! Mario cuenta con 7+ años de experiencia en gestión de proyectos IT y automatización con IA. Está certificado como Scrum Professional (SFPC), crea automatizaciones con Python y Google Apps Script, y ha liderado proyectos de software para GNP Seguros y Niku Tech.',
      questions: [
        {
          label: '¿Cómo automatiza Mario los reportes?',
          question: '¿Cómo automatiza Mario el seguimiento y reporteo?',
          answer: 'Mario diseñó e implementó scripts automatizados en Google Apps Script y Python que redujeron en un 40% el tiempo invertido en generar reportes de avance semanales y seguimiento de compromisos con clientes y la PMO en GNP Seguros.',
        },
        {
          label: '¿Cómo implementa Scrum y agilidad?',
          question: '¿Cuál es la experiencia de Mario con Scrum y metodologías ágiles?',
          answer: 'Cuenta con la certificación Scrum Professional (SFPC de CertiProf ID: 92706455). Ha liderado eventos diarios, control de calidad y solución de defectos en Jira, logrando aumentar un 30% la velocidad de entrega en Niku Tecnología y gestionando entregables en tiempo, alcance y presupuesto.',
        },
        {
          label: '¿Qué tecnologías de IA y automatización domina?',
          question: '¿Qué herramientas de IA y scripting utiliza?',
          answer: 'Domina Google Apps Script, Python Scripting, desarrollo de agentes de IA, flujos en LangFlow y Prompt Engineering, utilizándolos para automatizar la gestión de datos en CRM, monitoreo de tareas y control operativo.',
        },
      ]
    },
    modal: {
      detailsTitle: 'Detalle del Ticket / Proyecto',
      status: 'Estado',
      epic: 'Epic / Iniciativa',
      assignee: 'Líder / Responsable',
      estimate: 'Estimación',
      timeframe: 'Período',
      description: 'Alcance & Responsabilidades',
      impact: 'Impacto & Entregables Clave',
      technologies: 'Tecnologías & Metodologías',
      close: 'Cerrar',
      viewCred: 'Verificar Credencial Oficial',
    },
    booking: {
      ctaTitle: '¿Listo para acelerar tus proyectos de software?',
      ctaSubtitle: 'Disponible para posiciones como IT Project Manager, Scrum Master o Líder de Automatización e IA.',
      btnSchedule: 'Agendar Entrevista / Llamada (15 min)',
      btnCopyEmail: 'Copiar Correo',
      copiedEmail: '¡Correo copiado al portapapeles!',
      openLinkedIn: 'Abrir Perfil de LinkedIn',
    },
    footer: {
      about: 'IT Project Manager especializado en metodologías ágiles (Scrum, Kanban) y gestión tradicional (PMBOK), optimización de procesos y automatización con Python, Google Apps Script e IA.',
      navigate: 'Navegación',
      contact: 'Contacto',
      location: 'San Andrés Cholula, Puebla, México',
      rights: '© 2026 Mario González. Todos los derechos reservados.',
      systemStatus: 'Disponible para nuevos retos',
      scrumBadge: 'Scrum Professional (SFPC) CertiProf #92706455',
    }
  },
  en: {
    nav: {
      about: 'About Me',
      metrics: 'Achievements & Metrics',
      experience: 'Work Experience',
      copilot: 'Ask my AI Agent',
      contact: 'Contact',
    },
    hero: {
      availability: 'OPEN TO WORK • AVAILABLE FOR NEW ROLES',
      role: 'IT Project Manager & AI / Automation',
      subtitle: 'Agile Methodologies & Process Optimization',
      intro: 'IT Project Manager with 7+ years of experience leading technology delivery and software solutions. Specialized in Agile frameworks (Scrum, Kanban) and traditional management (PMBOK/Waterfall). Expert in operational optimization, client tracking, and automated reporting via Google Apps Script, Python, and AI pipelines (LangFlow, AI Agents).',
      downloadCv: 'Download CV (PDF)',
      exploreProjects: 'Explore Sprints & Projects',
      statsYears: 'Years',
      statsYearsSub: 'IT Experience',
      statsScrum: 'Scrum',
      statsScrumSub: 'SFPC Certified',
      statsAi: 'AI',
      statsAiSub: 'Automation',
      scroll: 'Scroll',
    },
    metrics: {
      tag: 'Proven Impact',
      title: 'Key Achievements &',
      titleHighlight: 'Impact Metrics',
      subtitle: 'Measurable results in operational efficiency, reporting reduction, and software delivery velocity across real-world tech projects.',
      reduced: 'Reduced',
      boosted: 'Boosted',
      stats: [
        {
          value: -40,
          suffix: '%',
          label: 'Reporting Time',
          description: 'Designed and deployed Google Apps Script automated workflows for weekly progress and client deliverables.',
          color: '#06b6d4',
          icon: 'clock',
        },
        {
          value: 30,
          suffix: '%',
          label: 'Delivery Velocity',
          description: 'Implemented Scrum framework and automated sprint workflows, shortening client response cycles.',
          color: '#8b5cf6',
          icon: 'rocket',
        },
        {
          value: 7,
          suffix: '+',
          label: 'Years IT Experience',
          description: 'Leading software factories (GNP Seguros), tech startups, and interactive multimedia development.',
          color: '#f97316',
          icon: 'award',
        },
      ]
    },
    kanban: {
      tag: 'Career Milestones',
      title: 'Work Experience &',
      titleHighlight: 'Agile Delivery',
      subtitle: 'Career progression tracked in an interactive Agile board: from tech stack backlog to verified deliverables.',
      boardMeta: {
        sprint: 'Project Leadership & Deliverables',
        activeBadge: 'ACTIVE',
        pmLeadLabel: 'Tech Lead',
        dragHint: 'Drag cards or toggle view switcher',
        timelineSprint: 'Career History & Education',
        timelineBadge: 'TIMELINE',
        timelineHint: '',
        filterAll: 'All Issues',
        viewBoard: 'Agile Board',
        viewTimeline: 'Timeline View',
        storyPoints: 'Story Points',
        wipLimit: 'WIP Limit',
      },
      backlog: {
        id: 'backlog',
        title: 'Product Backlog',
        subtitle: 'Requirements & Tech Stack',
        wip: '6 items',
        color: '#06b6d4',
        tickets: [
          { id: 'MAR-101', title: 'AI Agents & LangFlow Pipelines', tag: 'AI / Automation', priority: 'High', points: '8 SP', epic: 'Artificial Intelligence', assignee: 'MG' },
          { id: 'MAR-102', title: 'Python Scripting & Apps Script Workflows', tag: 'Automation', priority: 'High', points: '5 SP', epic: 'Process & Data', assignee: 'MG' },
          { id: 'MAR-103', title: 'Scrum Professional Certificate (SFPC)', tag: 'CertiProf #92706455', priority: 'Highest', points: '5 SP', epic: 'Agile Governance', assignee: 'MG' },
          { id: 'MAR-104', title: 'Scrum, Agile & Kanban Methodologies', tag: 'Methodology', priority: 'Medium', points: '5 SP', epic: 'Agile Culture', assignee: 'MG' },
          { id: 'MAR-105', title: 'Traditional Waterfall / PMBOK Governance', tag: 'Traditional PM', priority: 'Medium', points: '3 SP', epic: 'Governance', assignee: 'MG' },
          { id: 'MAR-106', title: 'PM Tools: Jira, Monday, ClickUp, Miro', tag: 'PM Software', priority: 'Medium', points: '3 SP', epic: 'Tooling', assignee: 'MG' },
        ],
      },
      inProgress: {
        id: 'in-progress',
        title: 'In Progress / Active Sprint',
        subtitle: 'Key Roles & Delivery Leadership',
        wip: '3 active roles',
        color: '#8b5cf6',
        tickets: [
          {
            id: 'MAR-201',
            title: 'Badak Innovación (Client GNP Seguros)',
            tag: 'Client: GNP Seguros',
            priority: 'Highest',
            period: 'Jan 2024 – Sep 2026',
            points: '13 SP',
            epic: 'Insurance Industry',
            assignee: 'MG',
            description: 'Project Manager at Badak Innovación, assigned to client account GNP Seguros software factory. Directed software solutions within scope, time & budget. Automated weekly progress reports with Google Apps Script for the PMO. Led daily agile standups and Jira defect tracking.',
          },
          {
            id: 'MAR-202',
            title: 'Niku Tecnología S.A. de C.V.',
            tag: 'Project Lead Manager',
            priority: 'High',
            period: 'Dec 2020 – Nov 2023',
            points: '13 SP',
            epic: 'Tech Scaling',
            assignee: 'MG',
            description: 'Implemented Scrum framework (+30% delivery velocity). Integrated AI agents & Python / Apps Script for CRM automation. Developed WBS, sprint timelines, budgets, and risk matrices.',
          },
          {
            id: 'MAR-203',
            title: 'Track Digital Communication',
            tag: 'PM / Digital Specialist',
            priority: 'Medium',
            period: 'Aug 2018 – Nov 2020',
            points: '8 SP',
            epic: 'Digital Delivery',
            assignee: 'MG',
            description: 'Aligned digital and multimedia project roadmaps with strategic organizational KPIs and client milestones.',
          },
        ],
      },
      done: {
        id: 'done',
        title: 'Done / Verified Releases',
        subtitle: 'Measurable Outcomes & Proven Wins',
        wip: '100% Completed',
        color: '#22c55e',
        tickets: [
          {
            id: 'MAR-301',
            title: 'Reporting & Follow-up Automation',
            tag: '-40% Time Overhead',
            priority: 'Done',
            points: '8 SP',
            epic: 'Efficiency',
            assignee: 'MG',
            description: 'Reduced progress reporting and stakeholder follow-up time by 40% using automated Google Apps Script and data pipeline workflows.',
          },
          {
            id: 'MAR-302',
            title: 'Delivery Velocity Acceleration',
            tag: '+30% Velocity Boost',
            priority: 'Done',
            points: '8 SP',
            epic: 'Agile Delivery',
            assignee: 'MG',
            description: 'Scrum framework adoption and automated agile workflows, accelerating release cadence across cross-functional engineering teams.',
          },
          {
            id: 'MAR-303',
            title: 'Operational Excellence with AI & Scripting',
            tag: 'Zero Critical Defects',
            priority: 'Done',
            points: '5 SP',
            epic: 'Quality & AI',
            assignee: 'MG',
            description: 'Automated Python, Apps Script, and AI pipelines for proactive task tracking and eliminating documentation errors.',
          },
        ],
      },
    },
    copilot: {
      tag: 'Feline AI Agent',
      title: 'Chat with',
      titleHighlight: 'Lua 🐾',
      subtitle: 'Mario\'s feline agent. Discover his Scrum projects, Python automations, and how he leads engineering squads.',
      botStatus: 'PURRING • ONLINE',
      botTitle: 'Lua 🐾 (Feline Agent)',
      quickQuestionsTitle: 'Quick Questions for Lua',
      greeting: 'Hi! 🐾 I am Lua, Mario\'s feline agent. I accompany him during every sprint and know all about his work and projects. Tell me, what would you like to know about him?',
      inputPlaceholder: 'Ask the feline agent about Mario...',
      send: 'Send',
      defaultResponse: 'Great question! Mario has 7+ years of experience leading IT projects and AI automation. He is SFPC certified in Scrum, builds Python and Google Apps Script pipelines, and has directed software factories for GNP Seguros and Niku Tech.',
      questions: [
        {
          label: 'How does Mario automate reporting?',
          question: 'How does Mario automate client tracking and reporting?',
          answer: 'Mario designed and deployed automated Google Apps Script and Python pipelines that cut weekly progress reporting time by 40% for stakeholders and the PMO at GNP Seguros.',
        },
        {
          label: 'How does he implement Scrum & Agile?',
          question: 'What is Mario\'s experience with Scrum and Agile methodologies?',
          answer: 'He holds the Scrum Professional certificate (SFPC by CertiProf ID: 92706455). He led daily standups, defect management, and sprint planning in Jira, boosting delivery velocity by 30% at Niku Tech while keeping projects on scope, time, and budget.',
        },
        {
          label: 'What AI and scripting tools does he master?',
          question: 'What AI tools and scripting languages does Mario use?',
          answer: 'He specializes in Google Apps Script, Python Scripting, custom AI Agents, LangFlow workflow design, and Prompt Engineering, applying them to automate CRM operations, task monitoring, and project governance.',
        },
      ]
    },
    modal: {
      detailsTitle: 'Ticket / Project Milestone Details',
      status: 'Status',
      epic: 'Epic / Initiative',
      assignee: 'Lead / Assignee',
      estimate: 'Estimation',
      timeframe: 'Timeline',
      description: 'Scope & Key Responsibilities',
      impact: 'Measurable Outcomes & Deliverables',
      technologies: 'Technologies & Frameworks',
      close: 'Close',
      viewCred: 'Verify Official Credential',
    },
    booking: {
      ctaTitle: 'Ready to accelerate your software delivery?',
      ctaSubtitle: 'Available for roles as IT Project Manager, Agile Delivery Lead, or AI & Automation Specialist.',
      btnSchedule: 'Schedule 15-min Discovery Call / Interview',
      btnCopyEmail: 'Copy Email',
      copiedEmail: 'Email copied to clipboard!',
      openLinkedIn: 'Open LinkedIn Profile',
    },
    footer: {
      about: 'IT Project Manager specialized in Agile frameworks (Scrum, Kanban) and traditional governance (PMBOK), process optimization, and automation with Python, Google Apps Script & AI.',
      navigate: 'Navigate',
      contact: 'Contact',
      location: 'San Andrés Cholula, Puebla, Mexico',
      rights: '© 2026 Mario González. All rights reserved.',
      systemStatus: 'Available for new opportunities',
      scrumBadge: 'Scrum Professional (SFPC) CertiProf #92706455',
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check if user already manually selected a language
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mariog_lang');
      if (saved === 'es' || saved === 'en') return saved;

      // 2. Auto-detect phone / browser system language
      const browserLang = navigator.language || (navigator as { languages?: string[] }).languages?.[0] || '';
      if (browserLang.toLowerCase().startsWith('es')) {
        return 'es';
      }
      return 'en'; // Default to English for international visitors/recruiters
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('mariog_lang', lang);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
