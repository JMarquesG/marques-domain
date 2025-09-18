"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'es' | 'ca';

// Define translations structure
type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

// Our translations dictionary
const translations: Translations = {
  en: {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    expertise: 'Expertise',
    education: 'Education',
    projects: 'Projects',
    contact: 'Contact',
    fullStackTechLead: 'Full-Stack/TechLead',
    letConnect: "Let's Connect",
    sendMessage: 'Send Message',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    phone: 'Phone',
    location: 'Location',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourMessage: 'Your Message',
    hello: "Professional Profile",
    softwareDeveloper: "SOFTWARE ENGINEERING PROFESSIONAL",
    designAndCode: "Delivering innovative software solutions with precision and strategic insight.",
    viewMyWork: "Explore Professional Portfolio",
    professionalOverview: "Technical Expertise Overview",
    aboutDescription1: "Seasoned software development professional with extensive expertise in designing and implementing data-driven enterprise solutions using Node.js and Python. Specialized in integrating advanced technologies to optimize application performance and architectural efficiency.",
    aboutDescription2: "Systematic problem solver with a strategic approach to technical challenges. Committed to continuous professional development and delivering high-impact technological solutions that address complex business requirements.",
    personalInfo: "Personal Info",
    residence: "Residence:",
    city: "City:",
    myExpertise: "My Expertise",
    backendDevelopment: "Backend Development",
    dataArchitecture: "Data Architecture",
    apiDevelopment: "API Development",
    technicalLeadership: "Technical Leadership",
    aiNlp: "AI & NLP",
    blockchain: "Blockchain",
    resume: "Resume",
    technicalExpertise: "Technical Expertise",
    coreCompetencies: "Core Competencies",
    backendDevDescription: "Engineering robust, scalable server-side architectures using enterprise-grade technologies.",
    databaseArchDescription: "Implementing strategic data management solutions with a focus on performance optimization and architectural integrity.",
    apiDevDescription: "Developing secure, standards-compliant API interfaces for seamless system integration.",
    techLeadershipDescription: "Providing strategic technical leadership to drive project excellence and team performance.",
    learnMore: "Learn More",
    myBackground: "My Background",
    computerScience: "Computer Science",
    upc: "Universitat Politècnica de Catalunya",
    csDescription: "Comprehensive study of computer science principles, algorithms, data structures, and software engineering.",
    competenciasTecnologicas: "Competencias tecnológicas en Java & C++",
    fundacionEsplai: "Fundación Esplai",
    javaCppDescription: "Specialized training in Java and C++ programming languages and application development.",
    getInTouch: "Get In Touch",
    connectDescription: "I'm open to discussing new projects, creative ideas or opportunities to be part of your vision.",
    allRightsReserved: "All rights reserved.",
    backendDevExpertise: "My approach focuses on creating scalable, maintainable architectures that adapt to changing business requirements. I implement RESTful APIs following industry best practices, with comprehensive documentation and testing protocols. I use Node.js with Express for high-throughput applications and Python with Flask for data-intensive operations. My solutions prioritize security, performance, and code quality through continuous integration pipelines.",
    databaseArchExcellence: "I design normalized relational schemas in PostgreSQL and MySQL, implement document-based models in MongoDB, and utilize time-series databases for analytical applications. I specialize in query optimization, indexing strategies, and efficient data access patterns. For high-traffic applications, I implement caching layers using Redis or Memcached to reduce database load, along with comprehensive backup strategies and disaster recovery planning.",
    apiDevMethodology: "My methodology emphasizes creating interfaces that are intuitive, well-documented, and secure. I design RESTful APIs following standard conventions and implement GraphQL for complex domains. Security is paramount, with proper authentication mechanisms, rate limiting, and input validation. Each API is thoroughly documented using Swagger/OpenAPI, with comprehensive test suites to ensure reliability.",
    techLeadershipApproach: "My leadership philosophy centers on enabling teams to deliver high-quality software efficiently. I establish workflows prioritizing code quality through peer reviews, automated testing, and continuous integration. My mentoring focuses on both technical skill development and professional growth. I excel at bridging the gap between business requirements and technical implementation while maintaining technical excellence.",
    aiNlpDescription: "Designing and integrating AI/NLP features with OpenAI and modern LLM tooling: retrieval-augmented generation, prompt pipelines, evaluation, and safety controls.",
    aiNlpExpertise: "Hands-on with OpenAI APIs, embeddings, vector search, and productionizing LLM-backed experiences. Focus on quality, latency, and observability.",
    blockchainDescription: "Building blockchain-enabled applications and integrations with smart contracts and secure off-chain orchestration.",
    blockchainExpertise: "Experience across contract interaction, wallet flows, security best practices, and performance optimization for web3 products."
    ,
    projectsSubtitle: "Real applications of AI, blockchain, and more",
    mentaEstateTagline: "Blockchain-enabled real estate platform",
    mentaEstateDescription: "Full-stack and blockchain contributions across smart-contract integrations and web platform. Focus on secure APIs, on-chain/off-chain orchestration, and performance.",
    lllistaNote: "",
    llistaTagline: "Civic participation initiative",
    llistaDescription: "Participated in engineering efforts around modern web stack, content delivery, and reliability. Emphasis on accessibility and clarity.",
    billsAppTagline: "AI-powered invoice & expense desktop app (Electron)",
    billsAppDescription: "Invoice and expense management with intelligent document parsing of receipts/tickets and invoices using AI, plus scheduling and email automation."
  },
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    experience: 'Experiencia',
    expertise: 'Habilidades',
    education: 'Educación',
    contact: 'Contacto',
    fullStackTechLead: 'Full-Stack/Líder Técnico',
    letConnect: 'Conectemos',
    sendMessage: 'Enviar Mensaje',
    name: 'Nombre',
    email: 'Correo electrónico',
    message: 'Mensaje',
    phone: 'Teléfono',
    location: 'Ubicación',
    yourName: 'Tu Nombre',
    yourEmail: 'Tu correo electrónico',
    yourMessage: 'Tu Mensaje',
    hello: "Perfil Profesional",
    softwareDeveloper: "PROFESIONAL EN INGENIERÍA DE SOFTWARE",
    designAndCode: "Desarrollo de soluciones tecnológicas innovadoras con precisión y visión estratégica.",
    viewMyWork: "Explorar Portafolio Profesional",
    professionalOverview: "Visión General de Competencias Técnicas",
    aboutDescription1: "Profesional experimentado en desarrollo de software con amplia experiencia en el diseño e implementación de soluciones empresariales basadas en datos utilizando Node.js y Python. Especializado en la integración de tecnologías avanzadas para optimizar el rendimiento y la eficiencia arquitectónica de aplicaciones.",
    aboutDescription2: "Solucionador sistemático de problemas con un enfoque estratégico para desafíos técnicos. Comprometido con el desarrollo profesional continuo y la entrega de soluciones tecnológicas de alto impacto que abordan requisitos empresariales complejos.",
    personalInfo: "Información Personal",
    residence: "Residencia:",
    city: "Ciudad:",
    myExpertise: "Mi Experiencia",
    backendDevelopment: "Desarrollo Backend",
    dataArchitecture: "Arquitectura de Datos",
    apiDevelopment: "Desarrollo de APIs",
    technicalLeadership: "Liderazgo Técnico",
    aiNlp: "IA y NLP",
    blockchain: "Blockchain",
    resume: "Currículum",
    technicalExpertise: "Experiencia Técnica",
    coreCompetencies: "Competencias Principales",
    backendDevDescription: "Ingeniería de arquitecturas de servidor robustas y escalables utilizando tecnologías de nivel empresarial.",
    databaseArchDescription: "Implementación de soluciones estratégicas de gestión de datos con enfoque en optimización del rendimiento e integridad arquitectónica.",
    apiDevDescription: "Desarrollo de interfaces de API seguras y conformes con estándares para la integración fluida de sistemas.",
    techLeadershipDescription: "Liderazgo técnico estratégico para impulsar la excelencia de proyectos y el rendimiento del equipo.",
    learnMore: "Saber más",
    myBackground: "Mi Trayectoria",
    computerScience: "Informática",
    upc: "Universitat Politècnica de Catalunya",
    csDescription: "Estudio exhaustivo de principios de informática, algoritmos, estructuras de datos e ingeniería de software.",
    competenciasTecnológicas: "Competencias tecnológicas en Java y C++",
    fundacionEsplai: "Fundación Esplai",
    javaCppDescription: "Formación especializada en lenguajes de programación Java y C++ y desarrollo de aplicaciones.",
    getInTouch: "Contacta conmigo",
    connectDescription: "Estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión.",
    allRightsReserved: "Todos los derechos reservados.",
    backendDevExpertise: "Mi enfoque se centra en crear arquitecturas escalables y mantenibles que se adaptan a los requisitos empresariales cambiantes. Implemento APIs RESTful siguiendo las mejores prácticas de la industria, con documentación y protocolos de prueba completos. Utilizo Node.js con Express para aplicaciones de alto rendimiento y Python con Flask para operaciones intensivas de datos. Mis soluciones priorizan la seguridad, el rendimiento y la calidad del código a través de canales de integración continua.",
    databaseArchExcellence: "Diseño esquemas relacionales normalizados en PostgreSQL y MySQL, implemento modelos basados en documentos en MongoDB y utilizo bases de datos de series temporales para aplicaciones analíticas. Me especializo en optimización de consultas, estrategias de indexación y patrones eficientes de acceso a datos. Para aplicaciones de alto tráfico, implemento capas de caché utilizando Redis o Memcached para reducir la carga de la base de datos, junto con estrategias integrales de respaldo y planificación de recuperación ante desastres.",
    apiDevMethodology: "Mi metodología enfatiza la creación de interfaces que son intuitivas, bien documentadas y seguras. Diseño APIs RESTful siguiendo convenciones estándar e implemento GraphQL para dominios complejos. La seguridad es primordial, con mecanismos de autenticación adecuados, limitación de velocidad y validación de entrada. Cada API está documentada de forma exhaustiva utilizando Swagger/OpenAPI, con suites de pruebas exhaustivas para garantizar la fiabilidad.",
    techLeadershipApproach: "Mi filosofía de liderazgo se centra en permitir que los equipos entreguen software de alta calidad de manera eficiente. Establezco flujos de trabajo que priorizan la calidad del código a través de revisiones por pares, pruebas automatizadas e integración continua. Mi mentoría se enfoca tanto en el desarrollo de habilidades técnicas como en el crecimiento profesional. Sobresalgo en cerrar la brecha entre los requisitos comerciales y la implementación técnica mientras mantengo la excelencia técnica.",
    aiNlpDescription: "Diseño e integración de funcionalidades de IA/NLP con OpenAI y herramientas LLM modernas: RAG, pipelines de prompts, evaluación y controles de seguridad.",
    aiNlpExpertise: "Experiencia práctica con APIs de OpenAI, embeddings, búsqueda vectorial y puesta en producción de experiencias con LLMs. Enfoque en calidad, latencia y observabilidad.",
    blockchainDescription: "Construcción de aplicaciones habilitadas por blockchain e integraciones con contratos inteligentes y orquestación off-chain segura.",
    blockchainExpertise: "Experiencia en interacción con contratos, flujos de wallet, mejores prácticas de seguridad y optimización de rendimiento para productos web3.",
    projectsSubtitle: "Aplicaciones reales de IA, blockchain y más",
    mentaEstateTagline: "Plataforma inmobiliaria habilitada por blockchain",
    mentaEstateDescription: "Contribuciones full-stack y de blockchain en integraciones con contratos inteligentes y plataforma web. Enfoque en APIs seguras, orquestación on-chain/off-chain y rendimiento.",
    llistaTagline: "Iniciativa de participación cívica",
    llistaDescription: "Participación en esfuerzos de ingeniería con stack web moderno, entrega de contenido y fiabilidad. Énfasis en accesibilidad y claridad.",
    billsAppTagline: "App de escritorio para facturas y gastos con IA (Electron)",
    billsAppDescription: "Gestión de facturas y gastos con extracción inteligente de datos de tickets y facturas mediante IA, además de planificación y automatización de emails."
  },
  ca: {
    home: 'Inici',
    about: 'Sobre mi',
    experience: 'Experiència',
    expertise: 'Habilitats',
    education: 'Educació',
    contact: 'Contacte',
    fullStackTechLead: 'Full-Stack/Líder Tècnic',
    letConnect: 'Connectem',
    sendMessage: 'Enviar Missatge',
    name: 'Nom',
    email: 'Correu electrònic',
    message: 'Missatge',
    phone: 'Telèfon',
    location: 'Ubicació',
    yourName: 'El teu Nom',
    yourEmail: 'El teu correu electrònic',
    yourMessage: 'El teu Missatge',
    hello: "Perfil Professional",
    softwareDeveloper: "PROFESSIONAL EN ENGINYERIA DE PROGRAMARI",
    designAndCode: "Desenvolupant solucions tecnològiques innovadores amb precisió i visió estratègica.",
    viewMyWork: "Explorar Portafoli Professional",
    professionalOverview: "Visió General de Competències Tècniques",
    aboutDescription1: "Professional experimentat en desenvolupament de programari amb àmplia experiència en el disseny i la implementació de solucions empresarials basades en dades utilitzant Node.js i Python. Especialitzat en la integració de tecnologies avançades per optimitzar el rendiment i l'eficiència arquitectònica de les aplicacions.",
    aboutDescription2: "Solucionador sistemàtic de problemes amb un enfocament estratègic per a reptes tècnics. Compromès amb el desenvolupament professional continu i el lliurament de solucions tecnològiques d'alt impacte que aborden requisits empresarials complexos.",
    personalInfo: "Informació Personal",
    residence: "Residència:",
    city: "Ciutat:",
    myExpertise: "La Meva Experiència",
    backendDevelopment: "Desenvolupament Backend",
    dataArchitecture: "Arquitectura de Dades",
    apiDevelopment: "Desenvolupament d'APIs",
    technicalLeadership: "Lideratge Tècnic",
    aiNlp: "IA i NLP",
    blockchain: "Blockchain",
    resume: "Currículum",
    technicalExpertise: "Experiència Tècnica",
    coreCompetencies: "Competències Principals",
    backendDevDescription: "Enginyeria d'arquitectures de servidor robustes i escalables utilitzant tecnologies de nivell empresarial.",
    databaseArchDescription: "Implementació de solucions estratègiques de gestió de dades amb enfocament en l'optimització del rendiment i la integritat arquitectònica.",
    apiDevDescription: "Desenvolupament d'interfícies d'API segures i conformes amb estàndards per a la integració fluida de sistemes.",
    techLeadershipDescription: "Lideratge tècnic estratègic per impulsar l'excel·lència de projectes i el rendiment de l'equip.",
    learnMore: "Saber més",
    myBackground: "La Meva Trajectòria",
    computerScience: "Informàtica",
    upc: "Universitat Politècnica de Catalunya",
    csDescription: "Estudi exhaustiu de principis d'informàtica, algoritmes, estructures de dades i enginyeria de programari.",
    competenciasTecnologicas: "Competències tecnològiques en Java i C++",
    fundacionEsplai: "Fundació Esplai",
    javaCppDescription: "Formació especialitzada en llenguatges de programació Java i C++ i desenvolupament d'aplicacions.",
    getInTouch: "Contacta amb mi",
    connectDescription: "Estic obert a discutir nous projectes, idees creatives o oportunitats per ser part de la teva visió.",
    allRightsReserved: "Tots els drets reservats.",
    backendDevExpertise: "El meu enfocament se centra en crear arquitectures escalables i mantenibles que s'adapten als requisits empresarials canviants. Implemento APIs RESTful seguint les millors pràctiques de la indústria, amb documentació i protocols de prova complets. Utilitzo Node.js amb Express per a aplicacions d'alt rendiment i Python amb Flask per a operacions intensives de dades. Les meves solucions prioritzen la seguretat, el rendiment i la qualitat del codi a través de canals d'integració contínua.",
    databaseArchExcellence: "Dissenyo esquemes relacionals normalitzats en PostgreSQL i MySQL, implemento models basats en documents a MongoDB i utilitzo bases de dades de sèries temporals per a aplicacions analítiques. M'especialitzo en optimització de consultes, estratègies d'indexació i patrons eficients d'accés a dades. Per a aplicacions d'alt trànsit, implemento capes de memòria cau utilitzant Redis o Memcached per reduir la càrrega de la base de dades, juntament amb estratègies integrals de còpia de seguretat i planificació de recuperació davant desastres.",
    apiDevMethodology: "La meva metodologia emfatitza la creació d'interfícies que són intuïtives, ben documentades i segures. Dissenyo APIs RESTful seguint convencions estàndard i implemento GraphQL per a dominis complexos. La seguretat és primordial, amb mecanismes d'autenticació adequats, limitació de velocitat i validació d'entrada. Cada API està documentada de manera exhaustiva utilitzant Swagger/OpenAPI, amb suites de proves exhaustives per garantir la fiabilitat.",
    techLeadershipApproach: "La meva filosofia de liderazgo se centra en permetre que els equips lliurin software d'alta qualitat de manera eficient. Estableixo fluxos de treball que prioritzen la qualitat del codi a través de revisions per parells, proves automatitzades i integració contínua. La meva mentoria s'enfoca tant en el desenvolupament d'habilitats tècniques com en el creixement professional. Sobresurto en tancar la bretxa entre els requisits comercials i la implementació tècnica mentre mantinc l'excel·lència tècnica.",
    aiNlpDescription: "Disseny i integració de funcionalitats d'IA/NLP amb OpenAI i eines LLM modernes: RAG, pipelines de prompts, avaluació i controls de seguretat.",
    aiNlpExpertise: "Experiència pràctica amb APIs d'OpenAI, embeddings, cerca vectorial i posada en producció d'experiències amb LLMs. Enfocament en qualitat, latència i observabilitat.",
    blockchainDescription: "Construcció d'aplicacions habilitades per blockchain i integracions amb contractes intel·ligents i orquestració off-chain segura.",
    blockchainExpertise: "Experiència en interacció amb contractes, fluxos de wallet, millors pràctiques de seguretat i optimització de rendiment per a productes web3.",
    projectsSubtitle: "Aplicacions reals d'IA, blockchain i més",
    mentaEstateTagline: "Plataforma immobiliària habilitada per blockchain",
    mentaEstateDescription: "Contribucions full-stack i de blockchain en integracions amb contractes intel·ligents i plataforma web. Enfoc en APIs segures, orquestració on-chain/off-chain i rendiment.",
    llistaTagline: "Iniciativa de participació cívica",
    llistaDescription: "Participació en esforços d'enginyeria amb stack web modern, lliurament de contingut i fiabilitat. Èmfasi en accessibilitat i claredat.",
    billsAppTagline: "Aplicació d'escriptori de factures i despeses amb IA (Electron)",
    billsAppDescription: "Gestió de factures i despeses amb extracció intel·ligent de dades de tiquets i factures mitjançant IA, a més de planificació i automatització de correus."
  }
};

// Context type definition
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

// Create the context with default values
const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  availableLanguages: ['en', 'es', 'ca']
};

// Create the context
const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to English if translation not found
    if (translations.en[key]) {
      return translations.en[key];
    }
    // Return the key itself if nothing found
    return key;
  };

  const availableLanguages: Language[] = ['en', 'es', 'ca'];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};
