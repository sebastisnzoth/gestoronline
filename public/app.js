// ============================================================================
// Gestoría Internacional — Home & Multi-Service Online Booking Application
// Languages: es, pt, en, ru, zh
// ============================================================================

const MAX_SERVICES_PER_BOOKING = 6;
const MAX_BOOKING_DURATION = 360;

const translations = {
  es: {
    pageTitle: 'Gestoría Internacional — Trámites y Turnos Online en Argentina',
    skipToBooking: 'Ir directamente a reservar turno',
    topHours: 'Lunes a Viernes · 09:00 a 18:00 hs (ART · GMT-3)',
    topLocation: 'Buenos Aires, República Argentina',
    navAdmin: 'Acceso interno',
    brandName: 'Gestoría Internacional',
    brandTag: 'Documentación Argentina · Extranjeros',
    navServices: 'Servicios',
    navBooking: 'Turnos Online',
    navProcess: 'Cómo funciona',
    navFaq: 'Preguntas',
    navCta: 'Reservar turno',
    heroEyebrow: 'Gestoría Migratoria y Documental · Argentina',
    heroTitle: 'Trámites de documentación argentina, resueltos con precisión y respaldo.',
    heroSubtitle: 'Asesoramiento integral y gestión oficial para extranjeros en Argentina: residencias, DNI, pasaporte, CUIT/CUIL, apostillas y traducciones juradas. Agendá uno o varios trámites en un mismo turno online.',
    heroCtaPrimary: 'Sacar turno online',
    heroCtaSecondary: 'Explorar áreas de trámite',
    statLangs: 'Idiomas de atención nativa',
    statServices: 'Trámites y gestiones oficiales',
    statOnline: 'Reserva online confirmada',
    heroStatusLabel: 'Agenda habilitada',
    nextAvailPrefix: 'Próximo día hábil:',
    areasEyebrow: 'Áreas de Especialización',
    areasTitle: 'Cobertura completa para cada etapa de tu radicación en Argentina',
    areasSubtitle: 'Seleccioná un área para filtrar el catálogo oficial y combinar los trámites que necesites en un solo turno.',
    area1Title: 'Radicación y Residencias',
    area1Desc: 'Regularización migratoria ante Migraciones, residencias temporarias, permanentes y solicitud de nacionalidad argentina.',
    tagResidencia: 'Residencia Temporal',
    tagPermanente: 'Permanente',
    tagNacionalidad: 'Nacionalidad',
    area2Title: 'Identidad y Pasaporte',
    area2Desc: 'Tramitación de DNI para extranjeros residentes, pasaporte argentino y obtención de partidas del Registro Civil.',
    tagPasaporte: 'Pasaporte',
    tagPartida: 'Partidas',
    area3Title: 'Fiscal, Laboral y Civil',
    area3Desc: 'Alta de CUIT/CUIL, legalización de matrimonio o unión civil, canje de licencia de conducir y empadronamiento.',
    tagLicencia: 'Licencia',
    tagCivil: 'Registro Civil',
    area4Title: 'Legalizaciones e Internacional',
    area4Desc: 'Apostilla de La Haya, traducciones públicas juradas, certificados de antecedentes penales y consultas integrales.',
    tagApostilla: 'Apostilla',
    tagTraduccion: 'Traducción',
    tagAntecedentes: 'Antecedentes',
    areaCta: 'Ver trámites y agendar',
    bookingEyebrow: 'Sistema de Turnos Online',
    bookingTitle: 'Reservá tu turno en tres simples pasos',
    bookingSubtitle: 'Elegí uno o varios trámites para un mismo turno, seleccioná fecha y horario hábil según la duración total y confirmá tus datos.',
    summaryHeading: 'Tu reserva',
    stepBadge: 'Paso {n} / 3',
    stepper1: 'Servicios',
    stepper1Sub: 'Elegí uno o varios trámites',
    stepper2: 'Fecha y hora',
    stepper2Sub: 'Agenda Buenos Aires',
    stepper3: 'Tus datos',
    stepper3Sub: 'Confirmación inmediata',
    summaryServiceLabel: 'Trámites seleccionados',
    summaryNoServices: 'Ninguno seleccionado',
    summaryDateLabel: 'Fecha y horario',
    summaryPending: 'Por definir',
    railCheck1: 'Combiná varios trámites en una misma cita',
    railCheck2: 'Horarios expresados en hora de Argentina (GMT-3)',
    railCheck3: 'Atención personalizada en tu idioma elegido',
    step1Title: 'Seleccioná uno o más servicios',
    step1Hint: 'Podés combinar varios trámites en un mismo turno. La duración total se calcula automáticamente.',
    clearSelection: 'Limpiar selección',
    selectedOneSummary: '1 trámite · {m} min totales',
    selectedManySummary: '{n} trámites · {m} min totales',
    selectAtLeastOne: 'Seleccioná al menos un servicio para continuar.',
    maxServicesReached: 'Podés combinar hasta {max} servicios en un mismo turno.',
    maxDurationReached: 'La duración total no puede superar los {max} minutos en un mismo turno.',
    totalDurationLabel: 'Duración total',
    modifyServices: 'Modificar',
    removeServiceAria: 'Quitar',
    searchPlaceholder: 'Buscar trámite (ej: DNI, residencia, apostilla, CUIT...)',
    catAll: 'Todos',
    catResidencias: 'Residencias',
    catIdentidad: 'Identidad y Pasaporte',
    catCivil: 'Fiscal y Civil',
    catInternacional: 'Internacional',
    servicesCount: '{n} trámites',
    selectedLabel: 'Seleccionado:',
    noSearchResults: 'No encontramos trámites que coincidan con tu búsqueda.',
    resetFilterBtn: 'Ver todos los trámites',
    loadServicesError: 'No se pudieron cargar los servicios en este momento.',
    retryBtn: 'Reintentar',
    btnContinue: 'Continuar',
    btnBack: 'Volver',
    step2Title: 'Seleccioná fecha y hora',
    changeService: 'Cambiar',
    loadingSlots: 'Consultando horarios disponibles...',
    loadSlotsError: 'No pudimos consultar los horarios. Intentá nuevamente.',
    selectDatePrompt: 'Seleccioná un día hábil en el calendario para ver los horarios disponibles.',
    todayTag: 'Hoy',
    minUnit: 'min',
    timezoneLabel: 'Argentina (GMT-3)',
    step3Title: 'Completá tus datos',
    labelName: 'Nombre completo *',
    placeholderName: 'Ej: María Fernanda Silva',
    labelEmail: 'Email *',
    labelPhone: 'Teléfono / WhatsApp *',
    labelCountry: 'País de residencia',
    placeholderCountry: 'Ej: Brasil, Chile, EE.UU., Rusia...',
    labelDocType: 'Tipo de documento',
    docPassport: 'Pasaporte',
    docDni: 'DNI',
    docForeignId: 'Cédula de Extranjería',
    docOther: 'Otro',
    labelDocNumber: 'N° de documento',
    labelNotes: 'Notas adicionales (opcional)',
    placeholderNotes: '¿Alguna consulta o detalle adicional sobre tu documentación?',
    btnConfirm: 'Confirmar Turno',
    privacyNote: 'Tus datos se utilizan únicamente para gestionar y confirmar tu turno de atención.',
    confBadge: 'Solicitud registrada',
    confTitle: '¡Turno confirmado!',
    confMsg: 'Hemos registrado tu solicitud en nuestra agenda. Guardá el comprobante con los detalles de tu cita.',
    confService: 'Servicio',
    confServices: 'Servicios',
    confDuration: 'Duración total',
    confDate: 'Fecha',
    confTime: 'Horario',
    confNumber: 'Turno N°',
    confClient: 'Titular',
    btnNewTurn: 'Sacar otro turno',
    btnPrintReceipt: 'Imprimir comprobante',
    bookingErrorGeneric: 'No pudimos completar tu reserva. Verificá los datos e intentá nuevamente.',
    processEyebrow: 'Proceso Claro y Ordenado',
    processTitle: 'Cómo preparamos tu trámite desde el primer contacto',
    proc1Title: 'Selección de uno o varios trámites',
    proc1Desc: 'Podés agrupar distintos trámites en una sola visita. El sistema solicita solo los datos clave de cada gestión para preparar la consulta de antemano.',
    proc2Title: 'Reserva en horario hábil con disponibilidad real',
    proc2Desc: 'Calculamos automáticamente la duración combinada y te mostramos los horarios libres de lunes a viernes entre las 09:00 y las 18:00 hs de Argentina.',
    proc3Title: 'Atención especializada en tu idioma',
    proc3Desc: 'Nuestro equipo revisa tu solicitud antes de la reunión y te guía paso a paso en español, portugués, inglés, ruso o chino con requisitos verificados.',
    processCta: 'Comenzar reserva ahora',
    whyEyebrow: 'Respaldo y Confianza',
    whyTitle: 'Diseñado para simplificar tus trámites ante organismos argentinos',
    why1Title: 'Comunicación sin barreras',
    why1Desc: 'Portal y atención en 5 idiomas para que comprendas cada requisito legal con absoluta claridad.',
    why2Title: 'Criterio normativo actualizado',
    why2Desc: 'Experiencia diaria en trámites ante Migraciones, RENAPER, Registro Civil, Cancillería y organismos fiscales.',
    why3Title: 'Agenda verificada en tiempo real',
    why3Desc: 'Cada bloque horario se reserva según la duración total de tus trámites, evitando superposiciones y esperas.',
    why4Title: 'Documentación preparada',
    why4Desc: 'Revisión previa de apostillas, traducciones y vigencia de certificados para evitar rechazos en ventanilla.',
    faqEyebrow: 'Preguntas Frecuentes',
    faqTitle: 'Información útil antes de tu cita',
    faq1Q: '¿Qué documentación debo tener a mano para mi turno?',
    faq1A: 'Te recomendamos contar con tu pasaporte o documento vigente, comprobante de ingreso al país si correspondiera y cualquier partida o certificado apostillado vinculado a los trámites elegidos. Si todavía no reuniste todo, igualmente podés agendar una Consulta General.',
    faq2Q: '¿En qué idiomas puedo recibir atención?',
    faq2A: 'Brindamos atención en español, portugués, inglés, ruso y chino. El idioma que selecciones en la parte superior del sitio queda registrado automáticamente junto con tu reserva.',
    faq3Q: '¿En qué zona horaria están expresados los turnos?',
    faq3A: 'Todos los días y horarios corresponden a la hora oficial de Buenos Aires, Argentina (ART · GMT-3). La atención es de lunes a viernes hábiles, de 09:00 a 18:00 hs, con reservas habilitadas hasta con 90 días de anticipación.',
    faq4Q: '¿Puedo iniciar mi consulta si todavía estoy fuera de Argentina?',
    faq4A: 'Sí. Muchos clientes agendan desde el exterior para validar apostillas, antecedentes penales y requisitos migratorios antes de viajar. Indicá tu país de residencia y un teléfono o WhatsApp con código internacional al completar el paso 3.',
    faq5Q: '¿Puedo reservar varios trámites en un mismo turno y cuánto dura?',
    faq5A: 'Sí, podés seleccionar hasta 6 trámites en una misma reserva. El sistema suma la duración de cada servicio (hasta 360 minutos) y bloquea un horario continuo exclusivo para atender todas tus gestiones en una sola cita.',
    ctaBandEyebrow: 'Atención Programada',
    ctaBandTitle: '¿Listo para organizar tu documentación en Argentina?',
    ctaBandDesc: 'Elegí los trámites que necesitás y reservá un único turno a tu medida hoy mismo.',
    ctaBandButton: 'Reservar turno ahora',
    footerNote: 'Atención personalizada para extranjeros en trámites de radicación, identidad, legalizaciones y gestiones oficiales en la República Argentina.',
    footerNavTitle: 'Secciones',
    footerScheduleTitle: 'Horario y Sede',
    footerModality: 'Atención presencial programada y asesoramiento remoto',
    footerAdminLink: 'Panel de administración →',
    footerText: '© 2026 Gestoría Internacional. Todos los derechos reservados.',
    footerLegal: 'Servicio privado de gestoría y asesoramiento documental.'
  },

  pt: {
    pageTitle: 'Gestoria Internacional — Documentação e Agendamento Online na Argentina',
    skipToBooking: 'Ir diretamente para o agendamento',
    topHours: 'Segunda a Sexta · 09:00 às 18:00 (ART · GMT-3)',
    topLocation: 'Buenos Aires, República Argentina',
    navAdmin: 'Acesso interno',
    brandName: 'Gestoria Internacional',
    brandTag: 'Documentação Argentina · Estrangeiros',
    navServices: 'Serviços',
    navBooking: 'Agendamento',
    navProcess: 'Como funciona',
    navFaq: 'Dúvidas',
    navCta: 'Agendar horário',
    heroEyebrow: 'Assessoria Migratória e Documental · Argentina',
    heroTitle: 'Trâmites de documentação argentina, conduzidos com precisão e segurança.',
    heroSubtitle: 'Assessoria completa para estrangeiros na Argentina: residências, DNI, passaporte, CUIT/CUIL, apostilamentos e traduções juramentadas. Agende um ou vários serviços em um único horário.',
    heroCtaPrimary: 'Agendar horário online',
    heroCtaSecondary: 'Explorar áreas de atuação',
    statLangs: 'Idiomas de atendimento',
    statServices: 'Trâmites e serviços oficiais',
    statOnline: 'Agendamento online confirmado',
    heroStatusLabel: 'Agenda disponível',
    nextAvailPrefix: 'Próximo dia útil:',
    areasEyebrow: 'Áreas de Especialização',
    areasTitle: 'Cobertura completa para cada etapa da sua estadia na Argentina',
    areasSubtitle: 'Selecione uma área para filtrar o catálogo oficial e combinar os serviços desejados em um único agendamento.',
    area1Title: 'Radicação e Residências',
    area1Desc: 'Regularização migratória, residências temporárias e permanentes, além de pedidos de nacionalidade argentina.',
    tagResidencia: 'Residência Temporária',
    tagPermanente: 'Permanente',
    tagNacionalidad: 'Nacionalidade',
    area2Title: 'Identidade e Passaporte',
    area2Desc: 'Tramitação de DNI para estrangeiros residentes, passaporte argentino e certidões do Registro Civil.',
    tagPasaporte: 'Passaporte',
    tagPartida: 'Certidões',
    area3Title: 'Fiscal, Trabalhista e Civil',
    area3Desc: 'Emissão de CUIT/CUIL, legalização de casamento ou união civil, troca de carteira de motorista e cadastro eleitoral.',
    tagLicencia: 'Carteira',
    tagCivil: 'Registro Civil',
    area4Title: 'Legalizações e Internacional',
    area4Desc: 'Apostila de Haia, traduções públicas juramentadas, certidão de antecedentes criminais e consultoria geral.',
    tagApostilla: 'Apostila',
    tagTraduccion: 'Tradução',
    tagAntecedentes: 'Antecedentes',
    areaCta: 'Ver serviços e agendar',
    bookingEyebrow: 'Sistema de Agendamento Online',
    bookingTitle: 'Reserve seu horário em três passos simples',
    bookingSubtitle: 'Escolha um ou vários serviços para o mesmo atendimento, selecione data e horário pela duração total e confirme seus dados.',
    summaryHeading: 'Sua reserva',
    stepBadge: 'Passo {n} / 3',
    stepper1: 'Serviços',
    stepper1Sub: 'Escolha um ou vários',
    stepper2: 'Data e horário',
    stepper2Sub: 'Agenda Buenos Aires',
    stepper3: 'Seus dados',
    stepper3Sub: 'Confirmação imediata',
    summaryServiceLabel: 'Serviços selecionados',
    summaryNoServices: 'Nenhum selecionado',
    summaryDateLabel: 'Data e horário',
    summaryPending: 'A definir',
    railCheck1: 'Combine vários serviços em um único horário',
    railCheck2: 'Horários no fuso oficial da Argentina (GMT-3)',
    railCheck3: 'Atendimento personalizado no idioma escolhido',
    step1Title: 'Selecione um ou mais serviços',
    step1Hint: 'Você pode combinar vários serviços no mesmo agendamento. A duração total é calculada automaticamente.',
    clearSelection: 'Limpar seleção',
    selectedOneSummary: '1 serviço · {m} min no total',
    selectedManySummary: '{n} serviços · {m} min no total',
    selectAtLeastOne: 'Selecione pelo menos um serviço para continuar.',
    maxServicesReached: 'Você pode combinar até {max} serviços no mesmo agendamento.',
    maxDurationReached: 'A duração total não pode ultrapassar {max} minutos em um único agendamento.',
    totalDurationLabel: 'Duração total',
    modifyServices: 'Alterar',
    removeServiceAria: 'Remover',
    searchPlaceholder: 'Buscar serviço (ex: DNI, residência, apostila, CUIT...)',
    catAll: 'Todos',
    catResidencias: 'Residências',
    catIdentidad: 'Identidade e Passaporte',
    catCivil: 'Fiscal e Civil',
    catInternacional: 'Internacional',
    servicesCount: '{n} serviços',
    selectedLabel: 'Selecionado:',
    noSearchResults: 'Não encontramos serviços correspondentes à sua busca.',
    resetFilterBtn: 'Ver todos os serviços',
    loadServicesError: 'Não foi possível carregar os serviços no momento.',
    retryBtn: 'Tentar novamente',
    btnContinue: 'Continuar',
    btnBack: 'Voltar',
    step2Title: 'Selecione data e horário',
    changeService: 'Alterar',
    loadingSlots: 'Consultando horários disponíveis...',
    loadSlotsError: 'Não foi possível carregar os horários. Tente novamente.',
    selectDatePrompt: 'Selecione um dia útil no calendário para ver os horários livres.',
    todayTag: 'Hoje',
    minUnit: 'min',
    timezoneLabel: 'Argentina (GMT-3)',
    step3Title: 'Preencha seus dados',
    labelName: 'Nome completo *',
    placeholderName: 'Ex: Lucas Gabriel Oliveira',
    labelEmail: 'E-mail *',
    labelPhone: 'Telefone / WhatsApp *',
    labelCountry: 'País de residência',
    placeholderCountry: 'Ex: Brasil, Portugal, Chile...',
    labelDocType: 'Tipo de documento',
    docPassport: 'Passaporte',
    docDni: 'DNI',
    docForeignId: 'Carteira de Estrangeiro',
    docOther: 'Outro',
    labelDocNumber: 'Nº do documento',
    labelNotes: 'Observações adicionais (opcional)',
    placeholderNotes: 'Alguma dúvida ou detalhe adicional sobre sua documentação?',
    btnConfirm: 'Confirmar Horário',
    privacyNote: 'Seus dados são utilizados exclusivamente para gerenciar e confirmar o seu atendimento.',
    confBadge: 'Solicitação registrada',
    confTitle: 'Horário confirmado!',
    confMsg: 'Registramos sua solicitação em nossa agenda. Guarde o comprovante com os detalhes do seu atendimento.',
    confService: 'Serviço',
    confServices: 'Serviços',
    confDuration: 'Duração total',
    confDate: 'Data',
    confTime: 'Horário',
    confNumber: 'Protocolo Nº',
    confClient: 'Titular',
    btnNewTurn: 'Agendar outro horário',
    btnPrintReceipt: 'Imprimir comprovante',
    bookingErrorGeneric: 'Não foi possível concluir seu agendamento. Verifique os dados e tente novamente.',
    processEyebrow: 'Processo Claro e Organizado',
    processTitle: 'Como preparamos o seu trâmite desde o primeiro contato',
    proc1Title: 'Escolha de um ou vários serviços',
    proc1Desc: 'Agrupe diferentes procedimentos em uma única visita. Solicitamos apenas os dados essenciais de cada serviço para agilizar o atendimento.',
    proc2Title: 'Reserva em dia útil com disponibilidade real',
    proc2Desc: 'Somamos automaticamente a duração dos serviços e mostramos horários livres de segunda a sexta entre 09:00 e 18:00 (horário da Argentina).',
    proc3Title: 'Atendimento especializado no seu idioma',
    proc3Desc: 'Nossa equipe analisa sua solicitação previamente e orienta cada etapa em português, espanhol, inglês, russo ou chinês.',
    processCta: 'Iniciar agendamento agora',
    whyEyebrow: 'Respaldo e Confiança',
    whyTitle: 'Estrutura pensada para simplificar seus trâmites na Argentina',
    why1Title: 'Comunicação sem barreiras',
    why1Desc: 'Portal e atendimento em 5 idiomas para você entender cada exigência legal com clareza.',
    why2Title: 'Critério normativo atualizado',
    why2Desc: 'Prática diária junto a Migrações, RENAPER, Registro Civil, Chancelaria e órgãos fiscais.',
    why3Title: 'Agenda verificada em tempo real',
    why3Desc: 'Reservamos um bloco contínuo correspondente à duração total dos seus serviços, sem conflitos.',
    why4Title: 'Documentação revisada',
    why4Desc: 'Conferência prévia de apostilas, traduções e validade de certidões para evitar exigências extras.',
    faqEyebrow: 'Perguntas Frequentes',
    faqTitle: 'Informações úteis antes do seu atendimento',
    faq1Q: 'Quais documentos devo ter em mãos para o atendimento?',
    faq1A: 'Recomendamos ter seu passaporte ou documento vigente, comprovante de entrada no país quando aplicável e eventuais certidões apostiladas. Se ainda não reuniu tudo, você pode agendar uma Consulta Geral.',
    faq2Q: 'Em quais idiomas o atendimento é realizado?',
    faq2A: 'Atendemos em português, espanhol, inglês, russo e chinês. O idioma selecionado no topo da página fica registrado automaticamente na sua reserva.',
    faq3Q: 'Qual é o fuso horário exibido na agenda?',
    faq3A: 'Todos os horários seguem a hora oficial de Buenos Aires, Argentina (ART · GMT-3), de segunda a sexta-feira úteis, das 09:00 às 18:00.',
    faq4Q: 'Posso agendar uma consulta mesmo estando fora da Argentina?',
    faq4A: 'Sim. Muitos clientes agendam do exterior para validar apostilas, antecedentes e requisitos antes de viajar. Informe seu país e WhatsApp com código internacional no passo 3.',
    faq5Q: 'Posso agendar vários serviços no mesmo horário e quanto tempo dura?',
    faq5A: 'Sim, você pode combinar até 6 serviços em um único agendamento. O sistema calcula a duração combinada (até 360 minutos) e bloqueia um horário contínuo exclusivo para resolver tudo de uma vez.',
    ctaBandEyebrow: 'Atendimento Programado',
    ctaBandTitle: 'Pronto para organizar sua documentação na Argentina?',
    ctaBandDesc: 'Escolha os serviços de que precisa e garanta um único horário sob medida hoje mesmo.',
    ctaBandButton: 'Agendar horário agora',
    footerNote: 'Atendimento personalizado para estrangeiros em trâmites de residência, identidade, legalizações e processos oficiais na República Argentina.',
    footerNavTitle: 'Seções',
    footerScheduleTitle: 'Horário e Localização',
    footerModality: 'Atendimento presencial programado e assessoria remota',
    footerAdminLink: 'Painel administrativo →',
    footerText: '© 2026 Gestoria Internacional. Todos os direitos reservados.',
    footerLegal: 'Serviço privado de assessoria e gestão documental.'
  },

  en: {
    pageTitle: 'International Consultancy — Argentine Documentation & Online Appointments',
    skipToBooking: 'Skip directly to online booking',
    topHours: 'Monday to Friday · 09:00–18:00 (ART · GMT-3)',
    topLocation: 'Buenos Aires, Argentine Republic',
    navAdmin: 'Staff portal',
    brandName: 'International Consultancy',
    brandTag: 'Argentine Documentation · Foreign Nationals',
    navServices: 'Services',
    navBooking: 'Book Online',
    navProcess: 'How It Works',
    navFaq: 'FAQ',
    navCta: 'Book appointment',
    heroEyebrow: 'Immigration & Documentation Consultancy · Argentina',
    heroTitle: 'Argentine documentation handled with precision and clarity.',
    heroSubtitle: 'End-to-end assistance for foreign nationals in Argentina: residency permits, DNI, Argentine passport, CUIT/CUIL, Hague apostilles, and sworn translations. Combine one or more services in a single online appointment.',
    heroCtaPrimary: 'Book appointment online',
    heroCtaSecondary: 'Explore practice areas',
    statLangs: 'Native service languages',
    statServices: 'Official procedure services',
    statOnline: 'Confirmed online booking',
    heroStatusLabel: 'Schedule open',
    nextAvailPrefix: 'Next business day:',
    areasEyebrow: 'Practice Areas',
    areasTitle: 'Comprehensive guidance for every stage of your stay in Argentina',
    areasSubtitle: 'Choose a practice area to filter the official catalog and combine all procedures you need in one appointment.',
    area1Title: 'Residency & Immigration',
    area1Desc: 'Immigration filings, temporary and permanent residency permits, and Argentine citizenship applications.',
    tagResidencia: 'Temporary Residency',
    tagPermanente: 'Permanent',
    tagNacionalidad: 'Citizenship',
    area2Title: 'Identity & Passport',
    area2Desc: 'DNI applications for foreign residents, Argentine passport issuance, and Civil Registry birth records.',
    tagPasaporte: 'Passport',
    tagPartida: 'Vital Records',
    area3Title: 'Tax, Labor & Civil Registry',
    area3Desc: 'CUIT/CUIL registration, marriage or civil union legalization, foreign driver license exchange, and voter enrollment.',
    tagLicencia: 'Driver License',
    tagCivil: 'Civil Registry',
    area4Title: 'Legalizations & International',
    area4Desc: 'Hague Apostille processing, certified sworn translations, criminal background certificates, and general advisory.',
    tagApostilla: 'Apostille',
    tagTraduccion: 'Translation',
    tagAntecedentes: 'Background Check',
    areaCta: 'View services & book',
    bookingEyebrow: 'Online Appointment System',
    bookingTitle: 'Book your appointment in three clear steps',
    bookingSubtitle: 'Select one or more procedures for a single visit, pick a weekday slot tailored to the combined duration, and confirm your details.',
    summaryHeading: 'Your booking',
    stepBadge: 'Step {n} / 3',
    stepper1: 'Services',
    stepper1Sub: 'Pick one or more',
    stepper2: 'Date & time',
    stepper2Sub: 'Buenos Aires schedule',
    stepper3: 'Your details',
    stepper3Sub: 'Instant confirmation',
    summaryServiceLabel: 'Selected procedures',
    summaryNoServices: 'None selected',
    summaryDateLabel: 'Date & time',
    summaryPending: 'Not selected yet',
    railCheck1: 'Bundle multiple services into a single appointment',
    railCheck2: 'All times shown in Buenos Aires time (GMT-3)',
    railCheck3: 'Personalized assistance in your chosen language',
    step1Title: 'Select one or more services',
    step1Hint: 'You can combine multiple procedures in a single appointment. Total duration is calculated automatically.',
    clearSelection: 'Clear selection',
    selectedOneSummary: '1 service · {m} min total',
    selectedManySummary: '{n} services · {m} min total',
    selectAtLeastOne: 'Select at least one service to continue.',
    maxServicesReached: 'You can combine up to {max} services in a single appointment.',
    maxDurationReached: 'Total duration cannot exceed {max} minutes in a single appointment.',
    totalDurationLabel: 'Total duration',
    modifyServices: 'Edit',
    removeServiceAria: 'Remove',
    searchPlaceholder: 'Search procedures (e.g., DNI, residency, apostille, CUIT...)',
    catAll: 'All',
    catResidencias: 'Residency',
    catIdentidad: 'Identity & Passport',
    catCivil: 'Tax & Civil',
    catInternacional: 'International',
    servicesCount: '{n} services',
    selectedLabel: 'Selected:',
    noSearchResults: 'No procedures match your current search.',
    resetFilterBtn: 'Show all procedures',
    loadServicesError: 'Unable to load services right now.',
    retryBtn: 'Try again',
    btnContinue: 'Continue',
    btnBack: 'Back',
    step2Title: 'Select date and time',
    changeService: 'Change',
    loadingSlots: 'Checking available times...',
    loadSlotsError: 'Could not load time slots. Please try again.',
    selectDatePrompt: 'Select a business day on the calendar to view available times.',
    todayTag: 'Today',
    minUnit: 'min',
    timezoneLabel: 'Argentina (GMT-3)',
    step3Title: 'Complete your details',
    labelName: 'Full name *',
    placeholderName: 'e.g., Claire Bennett',
    labelEmail: 'Email *',
    labelPhone: 'Phone / WhatsApp *',
    labelCountry: 'Country of residence',
    placeholderCountry: 'e.g., United States, Brazil, UK...',
    labelDocType: 'Document type',
    docPassport: 'Passport',
    docDni: 'DNI',
    docForeignId: 'Foreign National ID',
    docOther: 'Other',
    labelDocNumber: 'Document number',
    labelNotes: 'Additional notes (optional)',
    placeholderNotes: 'Any questions or extra context about your paperwork?',
    btnConfirm: 'Confirm Appointment',
    privacyNote: 'Your information is used strictly to prepare and confirm your appointment.',
    confBadge: 'Request confirmed',
    confTitle: 'Appointment confirmed!',
    confMsg: 'Your appointment has been registered in our schedule. Keep this receipt for your records.',
    confService: 'Service',
    confServices: 'Services',
    confDuration: 'Total duration',
    confDate: 'Date',
    confTime: 'Time',
    confNumber: 'Reference #',
    confClient: 'Client',
    btnNewTurn: 'Book another appointment',
    btnPrintReceipt: 'Print receipt',
    bookingErrorGeneric: 'We could not complete your booking. Please review your details and try again.',
    processEyebrow: 'Structured Process',
    processTitle: 'How we prepare your case from the very first step',
    proc1Title: 'Single or multi-service selection',
    proc1Desc: 'Combine related procedures in a single visit. We gather only the key background details for each item so your specialist arrives prepared.',
    proc2Title: 'Live weekday slot booking',
    proc2Desc: 'We automatically calculate the combined session length and display available weekday windows from 09:00 to 18:00 Buenos Aires time.',
    proc3Title: 'Dedicated multilingual guidance',
    proc3Desc: 'Our team reviews your submission ahead of time and walks you through verified requirements in English, Spanish, Portuguese, Russian, or Chinese.',
    processCta: 'Start booking now',
    whyEyebrow: 'Reliability & Expertise',
    whyTitle: 'Built to simplify Argentine administrative procedures',
    why1Title: 'Clear communication',
    why1Desc: 'Full portal and client care in 5 languages so every legal requirement is unmistakable.',
    why2Title: 'Up-to-date regulatory expertise',
    why2Desc: 'Daily experience across Immigration (DNM), RENAPER, Civil Registry, Foreign Affairs, and tax offices.',
    why3Title: 'Real-time exclusive scheduling',
    why3Desc: 'We reserve one continuous block matching the total duration of your selected services—zero overlap.',
    why4Title: 'Document pre-verification',
    why4Desc: 'Careful checks on apostilles, translations, and certificate validity to prevent filing rejections.',
    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'Helpful details before your appointment',
    faq1Q: 'What documents should I bring or prepare for my appointment?',
    faq1A: 'Have your valid passport or ID on hand, proof of entry into Argentina if applicable, and any apostilled records related to your selected procedures. If you are still gathering paperwork, you can book a General Consultation first.',
    faq2Q: 'Which languages do you support?',
    faq2A: 'We provide assistance in English, Spanish, Portuguese, Russian, and Chinese. Whichever language you select at the top of this page is automatically saved with your booking.',
    faq3Q: 'What time zone are appointment slots listed in?',
    faq3A: 'All dates and times reflect official Buenos Aires, Argentina time (ART · GMT-3), Monday through Friday from 09:00 to 18:00, open up to 90 days ahead.',
    faq4Q: 'Can I book a consultation while still abroad?',
    faq4A: 'Yes. Many clients book from abroad to verify apostilles, background checks, and residency criteria before traveling. Simply enter your country of residence and an international phone/WhatsApp number in step 3.',
    faq5Q: 'Can I book multiple services in a single appointment?',
    faq5A: 'Yes—you can combine up to 6 services in one appointment. The system adds up their durations (up to 360 minutes) and reserves one continuous time window so everything is handled in a single visit.',
    ctaBandEyebrow: 'Scheduled Assistance',
    ctaBandTitle: 'Ready to organize your Argentine documentation?',
    ctaBandDesc: 'Pick the services you need and reserve a single tailored appointment today.',
    ctaBandButton: 'Book appointment now',
    footerNote: 'Personalized documentation and immigration assistance for foreign nationals in the Argentine Republic.',
    footerNavTitle: 'Sections',
    footerScheduleTitle: 'Hours & Office',
    footerModality: 'Scheduled in-person appointments & remote advisory',
    footerAdminLink: 'Admin dashboard →',
    footerText: '© 2026 International Consultancy. All rights reserved.',
    footerLegal: 'Private documentation and administrative consultancy service.'
  },

  ru: {
    pageTitle: 'Международное агентство — Оформление документов в Аргентине онлайн',
    skipToBooking: 'Перейти к онлайн-записи',
    topHours: 'Пн–Пт · 09:00–18:00 (ART · GMT-3)',
    topLocation: 'Буэнос-Айрес, Аргентина',
    navAdmin: 'Служебный вход',
    brandName: 'Международное агентство',
    brandTag: 'Документы в Аргентине · Иностранцам',
    navServices: 'Услуги',
    navBooking: 'Онлайн-запись',
    navProcess: 'Как это работает',
    navFaq: 'Вопросы',
    navCta: 'Записаться',
    heroEyebrow: 'Миграционное и документальное сопровождение · Аргентина',
    heroTitle: 'Оформление аргентинских документов — точно, спокойно и профессионально.',
    heroSubtitle: 'Комплексная помощь иностранцам в Аргентине: ВНЖ, ПМЖ, DNI, паспорт, CUIT/CUIL, апостиль и заверенные переводы. Объединяйте одну или несколько услуг в одну онлайн-запись.',
    heroCtaPrimary: 'Записаться онлайн',
    heroCtaSecondary: 'Посмотреть направления',
    statLangs: 'Языков обслуживания',
    statServices: 'Официальных услуг',
    statOnline: 'Подтверждённая запись онлайн',
    heroStatusLabel: 'Запись открыта',
    nextAvailPrefix: 'Ближайший рабочий день:',
    areasEyebrow: 'Направления работы',
    areasTitle: 'Полная поддержка на каждом этапе оформления в Аргентине',
    areasSubtitle: 'Выберите направление, чтобы отфильтровать каталог и объединить нужные услуги в один приём.',
    area1Title: 'Резиденция и миграция',
    area1Desc: 'Оформление временной и постоянной резиденции, миграционная легализация и гражданство Аргентины.',
    tagResidencia: 'Временный ВНЖ',
    tagPermanente: 'ПМЖ',
    tagNacionalidad: 'Гражданство',
    area2Title: 'DNI и паспорт',
    area2Desc: 'Получение DNI для иностранных резидентов, аргентинского паспорта и свидетельств из ЗАГСа.',
    tagPasaporte: 'Паспорт',
    tagPartida: 'Свидетельства',
    area3Title: 'Налоги, труд и ЗАГС',
    area3Desc: 'Оформление CUIT/CUIL, легализация брака, обмен водительского удостоверения и регистрация.',
    tagLicencia: 'Права',
    tagCivil: 'ЗАГС',
    area4Title: 'Легализация и переводы',
    area4Desc: 'Гаагский апостиль, присяжные переводы, справки о несудимости и общие юридические консультации.',
    tagApostilla: 'Апостиль',
    tagTraduccion: 'Перевод',
    tagAntecedentes: 'Справка МВД',
    areaCta: 'Выбрать услугу и записаться',
    bookingEyebrow: 'Система онлайн-записи',
    bookingTitle: 'Запишитесь на приём за три простых шага',
    bookingSubtitle: 'Выберите одну или несколько услуг для одного визита, подберите дату и время с учётом общей длительности и подтвердите данные.',
    summaryHeading: 'Ваша запись',
    stepBadge: 'Шаг {n} / 3',
    stepper1: 'Услуги',
    stepper1Sub: 'Одна или несколько',
    stepper2: 'Дата и время',
    stepper2Sub: 'Время Буэнос-Айреса',
    stepper3: 'Ваши данные',
    stepper3Sub: 'Мгновенное подтверждение',
    summaryServiceLabel: 'Выбранные услуги',
    summaryNoServices: 'Ничего не выбрано',
    summaryDateLabel: 'Дата и время',
    summaryPending: 'Не выбрано',
    railCheck1: 'Объединяйте несколько услуг в один приём',
    railCheck2: 'Время указано по Буэнос-Айресу (GMT-3)',
    railCheck3: 'Обслуживание на выбранном вами языке',
    step1Title: 'Выберите одну или несколько услуг',
    step1Hint: 'Вы можете объединить несколько услуг в одну запись. Общая длительность рассчитывается автоматически.',
    clearSelection: 'Очистить выбор',
    selectedOneSummary: '1 услуга · всего {m} мин',
    selectedManySummary: 'Услуг: {n} · всего {m} мин',
    selectAtLeastOne: 'Выберите хотя бы одну услугу для продолжения.',
    maxServicesReached: 'В одной записи можно объединить до {max} услуг.',
    maxDurationReached: 'Общая длительность одной записи не может превышать {max} минут.',
    totalDurationLabel: 'Общая длительность',
    modifyServices: 'Изменить',
    removeServiceAria: 'Убрать',
    searchPlaceholder: 'Поиск услуги (например: DNI, резиденция, апостиль, CUIT...)',
    catAll: 'Все',
    catResidencias: 'Резиденция',
    catIdentidad: 'DNI и паспорт',
    catCivil: 'Налоги и ЗАГС',
    catInternacional: 'Международные',
    servicesCount: '{n} услуг',
    selectedLabel: 'Выбрано:',
    noSearchResults: 'По вашему запросу услуги не найдены.',
    resetFilterBtn: 'Показать все услуги',
    loadServicesError: 'Не удалось загрузить список услуг.',
    retryBtn: 'Повторить',
    btnContinue: 'Далее',
    btnBack: 'Назад',
    step2Title: 'Выберите дату и время',
    changeService: 'Изменить',
    loadingSlots: 'Загрузка свободного времени...',
    loadSlotsError: 'Ошибка загрузки слотов. Попробуйте снова.',
    selectDatePrompt: 'Выберите рабочий день в календаре, чтобы увидеть доступное время.',
    todayTag: 'Сегодня',
    minUnit: 'мин',
    timezoneLabel: 'Аргентина (GMT-3)',
    step3Title: 'Заполните ваши данные',
    labelName: 'Полное имя *',
    placeholderName: 'Например: Анна Сергеевна Волкова',
    labelEmail: 'Электронная почта *',
    labelPhone: 'Телефон / WhatsApp *',
    labelCountry: 'Страна проживания',
    placeholderCountry: 'Например: Аргентина, Россия, Бразилия...',
    labelDocType: 'Тип документа',
    docPassport: 'Загранпаспорт',
    docDni: 'DNI',
    docForeignId: 'Удостоверение иностранца',
    docOther: 'Другой',
    labelDocNumber: 'Номер документа',
    labelNotes: 'Дополнительные примечания (необязательно)',
    placeholderNotes: 'Есть ли вопросы или важные детали по вашим документам?',
    btnConfirm: 'Подтвердить запись',
    privacyNote: 'Ваши данные используются исключительно для организации и подтверждения записи.',
    confBadge: 'Заявка зарегистрирована',
    confTitle: 'Запись подтверждена!',
    confMsg: 'Ваша заявка внесена в расписание. Сохраните подтверждение с деталями приёма.',
    confService: 'Услуга',
    confServices: 'Услуги',
    confDuration: 'Общая длительность',
    confDate: 'Дата',
    confTime: 'Время',
    confNumber: 'Запись №',
    confClient: 'Клиент',
    btnNewTurn: 'Записаться ещё раз',
    btnPrintReceipt: 'Распечатать подтверждение',
    bookingErrorGeneric: 'Не удалось завершить запись. Проверьте данные и попробуйте ещё раз.',
    processEyebrow: 'Понятный порядок работы',
    processTitle: 'Как мы готовим ваш вопрос с первого обращения',
    proc1Title: 'Выбор одной или нескольких услуг',
    proc1Desc: 'Объединяйте нужные процедуры в один визит. Система запрашивает только ключевые детали по каждой услуге заранее.',
    proc2Title: 'Актуальное расписание в рабочие дни',
    proc2Desc: 'Мы автоматически суммируем длительность выбранных услуг и показываем свободные окна с понедельника по пятницу с 09:00 до 18:00 по времени Аргентины.',
    proc3Title: 'Консультация на вашем языке',
    proc3Desc: 'Команда заранее изучает запрос и подробно сопровождает вас на русском, испанском, португальском, английском или китайском языке.',
    processCta: 'Перейти к записи',
    whyEyebrow: 'Надёжность и опыт',
    whyTitle: 'Создано, чтобы упростить взаимодействие с ведомствами Аргентины',
    why1Title: 'Общение без языкового барьера',
    why1Desc: 'Сайт и сопровождение на 5 языках — каждое требование будет понятным и прозрачным.',
    why2Title: 'Актуальная практика ведомств',
    why2Desc: 'Ежедневная работа с Migraciones, RENAPER, ЗАГС, МИД Аргентины и налоговыми органами.',
    why3Title: 'Проверка слотов в реальном времени',
    why3Desc: 'Бронируется единый непрерывный интервал под суммарную длительность ваших услуг — без накладок.',
    why4Title: 'Предварительная проверка бумаг',
    why4Desc: 'Проверяем апостили, переводы и сроки действия справок, чтобы избежать отказов при подаче.',
    faqEyebrow: 'Частые вопросы',
    faqTitle: 'Полезная информация перед приёмом',
    faq1Q: 'Какие документы желательно подготовить к консультации?',
    faq1A: 'Подготовьте действующий паспорт или удостоверение, отметку о въезде при наличии и апостилированные справки по выбранным процедурам. Если пакет ещё не собран, запишитесь на Общую консультацию.',
    faq2Q: 'На каких языках проводится обслуживание?',
    faq2A: 'Мы работаем на русском, испанском, португальском, английском и китайском языках. Язык, выбранный в шапке сайта, сохраняется вместе с вашей записью.',
    faq3Q: 'По какому часовому поясу указано время приёма?',
    faq3A: 'Все слоты указаны по официальному времени Буэнос-Айреса, Аргентина (ART · GMT-3), с понедельника по пятницу с 09:00 до 18:00, с горизонтом записи до 90 дней.',
    faq4Q: 'Можно ли записаться, находясь ещё за пределами Аргентины?',
    faq4A: 'Да. Многие клиенты консультируются заранее, чтобы правильно подготовить апостили и справки о несудимости до переезда. Укажите страну и международный номер WhatsApp на шаге 3.',
    faq5Q: 'Можно ли забронировать сразу несколько услуг в одной записи?',
    faq5A: 'Да, вы можете выбрать до 6 услуг в одном приёме. Система суммирует их длительность (до 360 минут) и резервирует единое непрерывное окно для решения всех задач за один визит.',
    ctaBandEyebrow: 'Запись по расписанию',
    ctaBandTitle: 'Готовы привести документы в Аргентине в порядок?',
    ctaBandDesc: 'Выберите нужные услуги и забронируйте единый удобный приём уже сегодня.',
    ctaBandButton: 'Записаться сейчас',
    footerNote: 'Персональное сопровождение иностранцев по вопросам резиденции, удостоверений, легализации и официальных процедур в Аргентине.',
    footerNavTitle: 'Разделы',
    footerScheduleTitle: 'График и офис',
    footerModality: 'Очный приём по записи и удалённые консультации',
    footerAdminLink: 'Панель администратора →',
    footerText: '© 2026 Международное агентство. Все права защищены.',
    footerLegal: 'Частная консультационная и документальная служба.'
  },

  zh: {
    pageTitle: '国际公证与代办中心 — 阿根廷证件办理在线预约',
    skipToBooking: '直接前往在线预约',
    topHours: '周一至周五 · 09:00–18:00 (阿根廷时间 GMT-3)',
    topLocation: '阿根廷布宜诺斯艾利斯',
    navAdmin: '内部管理',
    brandName: '国际事务代办中心',
    brandTag: '阿根廷证件办理 · 外籍人士专享',
    navServices: '服务领域',
    navBooking: '在线预约',
    navProcess: '办理流程',
    navFaq: '常见问题',
    navCta: '立即预约',
    heroEyebrow: '阿根廷移民与文件代办服务 · 专业可靠',
    heroTitle: '阿根廷各类官方证件手续，严谨高效、全程护航。',
    heroSubtitle: '专为在阿外籍人士提供全方位代办与咨询：居留许可、DNI 身份证、护照、CUIT/CUIL 税号、海牙认证及宣誓翻译。支持在一次预约中同时办理多项业务。',
    heroCtaPrimary: '在线预约时间',
    heroCtaSecondary: '浏览服务领域',
    statLangs: '种母语服务支持',
    statServices: '项官方代办业务',
    statOnline: '实时在线确认预约',
    heroStatusLabel: '预约通道开放中',
    nextAvailPrefix: '最近可预约工作日：',
    areasEyebrow: '专业服务领域',
    areasTitle: '覆盖您在阿根廷居留与生活各阶段的证件需求',
    areasSubtitle: '点击对应领域即可筛选官方项目，并将所需业务合并至同一次预约。',
    area1Title: '居留与移民事务',
    area1Desc: '协助办理阿根廷临时居留、永久居留、移民身份规范化以及入籍申请。',
    tagResidencia: '临时居留',
    tagPermanente: '永久居留',
    tagNacionalidad: '申请国籍',
    area2Title: '身份证与护照',
    area2Desc: '外籍居民 DNI 身份证申领与更新、阿根廷护照及民事登记处出生证明办理。',
    tagPasaporte: '护照办理',
    tagPartida: '出生证明',
    area3Title: '税务、劳工与民事',
    area3Desc: 'CUIT/CUIL 税号申请、婚姻或民事结合文件认证、外国驾照换领及选民登记。',
    tagLicencia: '驾照换领',
    tagCivil: '民事登记',
    area4Title: '海牙认证与国际文件',
    area4Desc: '海牙认证（Apostilla）、官方宣誓翻译、无犯罪记录证明及综合事务咨询。',
    tagApostilla: '海牙认证',
    tagTraduccion: '宣誓翻译',
    tagAntecedentes: '无犯罪证明',
    areaCta: '查看项目并预约',
    bookingEyebrow: '在线预约系统',
    bookingTitle: '三步轻松完成预约',
    bookingSubtitle: '勾选一项或多项需要办理的业务，系统将按总时长匹配工作日连续时段，填写信息即可一次确认。',
    summaryHeading: '预约摘要',
    stepBadge: '第 {n} / 3 步',
    stepper1: '选择服务',
    stepper1Sub: '支持多选合并',
    stepper2: '日期与时间',
    stepper2Sub: '布宜诺斯艾利斯时段',
    stepper3: '填写信息',
    stepper3Sub: '立即生成预约单',
    summaryServiceLabel: '已选服务项目',
    summaryNoServices: '尚未选择',
    summaryDateLabel: '预约日期与时间',
    summaryPending: '待选择',
    railCheck1: '支持在同一次预约中合并多项业务',
    railCheck2: '所有时段均为阿根廷当地时间（GMT-3）',
    railCheck3: '按照您选择的语言提供专属接待',
    step1Title: '选择一项或多项服务',
    step1Hint: '您可以在同一次预约中组合多项业务，系统将自动计算总时长。',
    clearSelection: '清空选择',
    selectedOneSummary: '已选 1 项 · 共 {m} 分钟',
    selectedManySummary: '已选 {n} 项 · 共 {m} 分钟',
    selectAtLeastOne: '请至少选择一项服务以继续。',
    maxServicesReached: '单次预约最多可组合 {max} 项服务。',
    maxDurationReached: '单次预约总时长不能超过 {max} 分钟。',
    totalDurationLabel: '预计总时长',
    modifyServices: '修改项目',
    removeServiceAria: '移除',
    searchPlaceholder: '搜索服务（如：DNI、居留、海牙认证、CUIT...）',
    catAll: '全部',
    catResidencias: '居留移民',
    catIdentidad: '身份与护照',
    catCivil: '税务与民事',
    catInternacional: '国际认证',
    servicesCount: '{n} 项服务',
    selectedLabel: '已选择：',
    noSearchResults: '未找到匹配的服务项目。',
    resetFilterBtn: '显示全部服务',
    loadServicesError: '暂时无法加载服务列表，请稍后重试。',
    retryBtn: '重新加载',
    btnContinue: '继续',
    btnBack: '返回',
    step2Title: '选择日期和时间',
    changeService: '更换项目',
    loadingSlots: '正在查询可预约时段...',
    loadSlotsError: '加载时段失败，请重试。',
    selectDatePrompt: '请在日历中选择一个工作日查看可用时间。',
    todayTag: '今天',
    minUnit: '分钟',
    timezoneLabel: '阿根廷时间 (GMT-3)',
    step3Title: '填写您的信息',
    labelName: '姓名 *',
    placeholderName: '例如：陈明远 / Mingyuan Chen',
    labelEmail: '电子邮箱 *',
    labelPhone: '电话 / WhatsApp *',
    labelCountry: '居住国家',
    placeholderCountry: '例如：中国、阿根廷、巴西...',
    labelDocType: '证件类型',
    docPassport: '护照',
    docDni: 'DNI 身份证',
    docForeignId: '外籍身份证明',
    docOther: '其他',
    labelDocNumber: '证件号码',
    labelNotes: '补充说明（可选）',
    placeholderNotes: '如有任何疑问或文件情况需要说明，请在此填写',
    btnConfirm: '确认预约',
    privacyNote: '您的个人信息仅用于本次预约安排与业务沟通。',
    confBadge: '预约已登记',
    confTitle: '预约已确认！',
    confMsg: '您的预约已成功录入系统，请保存下方预约凭证以便核对。',
    confService: '服务项目',
    confServices: '预约服务列表',
    confDuration: '总时长',
    confDate: '预约日期',
    confTime: '预约时间',
    confNumber: '预约编号',
    confClient: '预约人',
    btnNewTurn: '再次预约',
    btnPrintReceipt: '打印凭证',
    bookingErrorGeneric: '预约提交失败，请检查填写内容后重试。',
    processEyebrow: '清晰有序的流程',
    processTitle: '从第一步起为您妥善筹备每项材料',
    proc1Title: '自由选择单项或多项业务',
    proc1Desc: '可将多项相关业务合并至一次到访中，系统仅收集每项业务的核心信息，方便顾问提前准备。',
    proc2Title: '工作日实时余号锁定',
    proc2Desc: '系统自动合计总时长，精准展示周一至周五 09:00–18:00（阿根廷时间）的连续可用时段。',
    proc3Title: '多语种专员一对一协助',
    proc3Desc: '团队提前审阅您的资料，并用中文、西班牙语、葡萄牙语、英语或俄语为您提供清晰指引。',
    processCta: '立即开始预约',
    whyEyebrow: '专业保障与信赖',
    whyTitle: '化繁为简，高效应对阿根廷各类官方手续',
    why1Title: '无障碍多语种沟通',
    why1Desc: '网站与顾问全程支持 5 种语言，确保每项法律与材料要求一目了然。',
    why2Title: '紧跟最新政务规范',
    why2Desc: '熟悉阿根廷移民局、RENAPER、民事登记处、外交部及税务机构的最新办理标准。',
    why3Title: '实时核验专属时段',
    why3Desc: '按您所选全部服务的总时长锁定连续时段，杜绝冲突与长时间等待。',
    why4Title: '材料前置核查',
    why4Desc: '提前核验海牙认证、翻译格式与证明有效期，显著降低窗口退件风险。',
    faqEyebrow: '常见问题解答',
    faqTitle: '预约前值得了解的实用信息',
    faq1Q: '赴约前需要准备哪些材料？',
    faq1A: '建议准备好有效护照或身份证件、入境凭证（如适用）以及与所选业务相关的海牙认证文件。若材料尚未齐全，也可以先预约“综合咨询”制定办理清单。',
    faq2Q: '支持哪些语言接待？',
    faq2A: '我们提供中文、西班牙语、葡萄牙语、英语和俄语服务。您在页面顶部切换的语言会自动随预约记录保存。',
    faq3Q: '页面显示的预约时间属于哪个时区？',
    faq3A: '所有日期和时段均为阿根廷布宜诺斯艾利斯当地时间（ART · GMT-3），工作日周一至周五 09:00–18:00 开放，最多可提前 90 天预约。',
    faq4Q: '如果我目前还在阿根廷境外，可以先预约咨询吗？',
    faq4A: '可以。许多客户在启程前就会预约核对海牙认证、无犯罪证明及居留条件。在第 3 步填写居住国家及带国际区号的 WhatsApp 或电话号码即可。',
    faq5Q: '可以在一次预约中同时办理多项服务吗？',
    faq5A: '可以，单次预约最多可组合 6 项服务。系统会自动累计总时长（最长 360 分钟）并为您锁定连续专属时段，一次到访全部办妥。',
    ctaBandEyebrow: '预约制专属服务',
    ctaBandTitle: '准备好规划您的阿根廷证件办理了吗？',
    ctaBandDesc: '选择所需业务，今天就预约专属连续时段，一次办妥。',
    ctaBandButton: '立即预约时间',
    footerNote: '专注为在阿根廷的外籍人士提供居留、身份证件、公证认证及官方事务的一对一咨询与代办服务。',
    footerNavTitle: '页面导航',
    footerScheduleTitle: '办公时间与地点',
    footerModality: '支持预约到店面谈与远程线上咨询',
    footerAdminLink: '管理后台入口 →',
    footerText: '© 2026 国际事务代办中心。保留所有权利。',
    footerLegal: '私营文件咨询与行政代办服务机构。'
  }
};

// ===== Domain Locale & Dynamic Step 2 Request Fields =====
const bookingLocale = { es: 'es-AR', pt: 'pt-BR', en: 'en-US', ru: 'ru-RU', zh: 'zh-CN' };
const bookingWords = {
  es: ['Trámites seleccionados', 'Detalles de la solicitud', 'Seleccioná una fecha', 'Horarios disponibles', 'No hay horarios disponibles para esta fecha', 'Mes anterior', 'Mes siguiente', 'Completá los campos requeridos arriba para continuar', 'Seleccioná un horario disponible para continuar', 'Fecha y hora de tu turno'],
  pt: ['Serviços selecionados', 'Detalhes da solicitação', 'Selecione uma data', 'Horários disponíveis', 'Sem horários disponíveis nesta data', 'Mês anterior', 'Próximo mês', 'Preencha os campos obrigatórios acima para continuar', 'Selecione um horário disponível para continuar', 'Data e hora do atendimento'],
  en: ['Selected services', 'Request details', 'Select a date', 'Available times', 'No times available on this date', 'Previous month', 'Next month', 'Complete the required fields above to continue', 'Select an available time slot to continue', 'Appointment date and time'],
  ru: ['Выбранные услуги', 'Детали запроса', 'Выберите дату', 'Доступное время', 'На эту дату нет свободного времени', 'Предыдущий месяц', 'Следующий месяц', 'Заполните обязательные поля выше для продолжения', 'Выберите удобное время для продолжения', 'Дата и время записи'],
  zh: ['已选服务项目', '申请详情', '选择日期', '可预约时间', '当天没有可预约时间', '上个月', '下个月', '请先填写上方必填项', '请选择一个可预约时段以继续', '预约日期与时间']
};

const fieldsByService = [
  [/apostilla/i, ['Documento a apostillar', 'País de emisión'], ['Documento a apostilar', 'País emissor'], ['Document to apostille', 'Issuing country'], ['Документ для апостиля', 'Страна выдачи'], ['需认证的文件', '签发国家']],
  [/traducci/i, ['Idioma de origen', 'Idioma de destino', 'Tipo de documento'], ['Idioma de origem', 'Idioma de destino', 'Tipo de documento'], ['Source language', 'Target language', 'Document type'], ['Исходный язык', 'Язык перевода', 'Тип документа'], ['源语言', '目标语言', '文件类型']],
  [/radic|residencia/i, ['Nacionalidad', 'Situación migratoria actual'], ['Nacionalidade', 'Situação migratória atual'], ['Nationality', 'Current immigration status'], ['Гражданство', 'Текущий миграционный статус'], ['国籍', '当前移民身份']],
  [/dni|pasaporte/i, ['Tipo de solicitud (primera vez / renovación / reposición)', 'Nacionalidad'], ['Tipo de solicitação (primeira via / renovação / segunda via)', 'Nacionalidade'], ['Request type (first issue / renewal / replacement)', 'Nationality'], ['Тип запроса (первый / продление / замена)', 'Гражданство'], ['申请类型（首次 / 续期 / 补办）', '国籍']],
  [/cuit|cuil/i, ['Clave solicitada (CUIT / CUIL)', 'Situación laboral'], ['Registro solicitado (CUIT / CUIL)', 'Situação profissional'], ['Requested number (CUIT / CUIL)', 'Employment status'], ['Нужный номер (CUIT / CUIL)', 'Трудовой статус'], ['申请号码（CUIT / CUIL）', '就业状态']],
  [/antecedentes/i, ['País del certificado', 'Finalidad del trámite'], ['País da certidão', 'Finalidade'], ['Certificate country', 'Purpose'], ['Страна справки', 'Цель'], ['证明国家', '用途']],
  [/matrimonio|uni.n civil/i, ['Tipo de gestión', 'Lugar de registro'], ['Tipo de serviço', 'Local de registro'], ['Request type', 'Registration location'], ['Тип запроса', 'Место регистрации'], ['办理类型', '登记地点']],
  [/nacionalidad/i, ['Nacionalidad actual', 'Motivo de solicitud'], ['Nacionalidade atual', 'Motivo da solicitação'], ['Current nationality', 'Reason for request'], ['Текущее гражданство', 'Причина запроса'], ['当前国籍', '申请原因']],
  [/partida/i, ['Lugar de nacimiento', 'Tipo de copia solicitada'], ['Local de nascimento', 'Tipo de cópia'], ['Place of birth', 'Requested copy type'], ['Место рождения', 'Тип копии'], ['出生地点', '所需副本类型']],
  [/licencia/i, ['País emisor de la licencia', 'Tipo de trámite'], ['País emissor da carteira', 'Tipo de serviço'], ['License issuing country', 'Request type'], ['Страна выдачи прав', 'Тип запроса'], ['驾照签发国家', '申请类型']],
  [/votaci/i, ['Localidad de residencia', 'Motivo de consulta'], ['Localidade de residência', 'Motivo da consulta'], ['City of residence', 'Reason for inquiry'], ['Город проживания', 'Причина запроса'], ['居住城市', '咨询原因']],
  [/.*/, ['Motivo de consulta'], ['Motivo da consulta'], ['Reason for inquiry'], ['Причина запроса'], ['咨询原因']]
];

// ===== Application State =====
let currentLang = 'es';
let allServices = [];
let activeCategory = 'all';
let searchTerm = '';
let currentStep = 1;
let selectedServices = []; // [{ id, name, duration_minutes }]
let currentSlot = null;
let clientId = null;
let requestDraft = {}; // { [serviceId]: { [fieldIndex]: string } }
let lastSlotSignature = '';
let selectedDate = '';
let slotSeq = 0;
let lastBookingReceipt = null;
let limitAlertTimer = null;

const t = (key, vars) => {
  let val = translations[currentLang]?.[key] ?? translations.es[key] ?? key;
  if (vars) {
    Object.keys(vars).forEach(k => {
      val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), vars[k]);
    });
  }
  return val;
};

const escapeHtml = v =>
  String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function arToday() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
}

function arNowMinutes() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date());
  const hh = Number(parts.find(p => p.type === 'hour')?.value || 0);
  const mm = Number(parts.find(p => p.type === 'minute')?.value || 0);
  return hh * 60 + mm;
}

function firstBookableDate(requiredMins = 15) {
  const d = new Date(arToday() + 'T12:00:00Z');
  if (arNowMinutes() + Math.max(15, requiredMins) > 18 * 60) {
    d.setUTCDate(d.getUTCDate() + 1);
  }
  while (d.getUTCDay() === 0 || d.getUTCDay() === 6) {
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return d.toISOString().slice(0, 10);
}

function totalDurationMinutes() {
  return selectedServices.reduce((sum, s) => sum + (Number(s.duration_minutes) || 30), 0);
}

function selectionSignature() {
  return selectedServices.map(s => s.id).join(',');
}

function formatSlotWindow(slot) {
  if (!slot) return '';
  return slot.end_time ? `${slot.time} – ${slot.end_time}` : slot.time;
}

function classifyService(service) {
  const hay = `${service.name || ''} ${service.description || ''}`;
  if (/radic|residencia|nacionalidad/i.test(hay)) return 'residencias';
  if (/dni|pasaporte|partida/i.test(hay)) return 'identidad';
  if (/cuit|cuil|matrimonio|uni.n civil|licencia|votaci/i.test(hay)) return 'civil';
  return 'internacional';
}

function rowForService(service) {
  return fieldsByService.find(r => r[0].test(service?.name || '')) || fieldsByService[fieldsByService.length - 1];
}

function labelsForService(service) {
  const langIdx = Math.max(0, ['es', 'pt', 'en', 'ru', 'zh'].indexOf(currentLang));
  return rowForService(service)[1 + langIdx];
}

// Collect unique, deduplicated request fields across all selected services
function collectRequestFields() {
  const langIdx = Math.max(0, ['es', 'pt', 'en', 'ru', 'zh'].indexOf(currentLang));
  const seen = new Map();
  const list = [];
  selectedServices.forEach(svc => {
    const row = rowForService(svc);
    const esLabels = row[1];
    const localizedLabels = row[1 + langIdx];
    esLabels.forEach((canonical, idx) => {
      const key = canonical.toLowerCase();
      if (!seen.has(key)) {
        const entry = {
          key,
          label: localizedLabels[idx] || canonical,
          services: [svc.name]
        };
        seen.set(key, entry);
        list.push(entry);
      } else {
        const entry = seen.get(key);
        if (!entry.services.includes(svc.name)) entry.services.push(svc.name);
      }
    });
  });
  return list;
}

// ===== Live Next Available Business Day (Buenos Aires GMT-3) =====
function updateNextAvailabilityBadge() {
  const el = document.getElementById('nextAvailabilityText');
  if (!el) return;
  const nextIso = firstBookableDate(30);
  const nowAr = new Date(nextIso + 'T12:00:00Z');
  const locale = bookingLocale[currentLang] || 'es-AR';
  const formatted = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  }).format(nowAr);
  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  el.textContent = `${t('nextAvailPrefix')} ${capitalized} · 09:00–18:00`;
}

// ===== i18n Engine =====
function changeLang(lang) {
  if (!translations[lang]) lang = 'es';
  currentLang = lang;
  document.documentElement.lang = lang;
  document.title = t('pageTitle');
  const select = document.getElementById('langSelect');
  if (select && select.value !== lang) select.value = lang;
  try {
    localStorage.setItem('gestoriaLang', lang);
  } catch (_) {}

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated) el.textContent = translated;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translated = t(key);
    if (translated) el.placeholder = translated;
  });

  updateNextAvailabilityBadge();
  updateStepperUI();
  updateSelectedTray();
  updateSummaryRail();
  if (allServices.length) renderServiceGrid();
  if (!document.getElementById('step2').classList.contains('step-hidden')) showDateSelector();
  if (!document.getElementById('step3').classList.contains('step-hidden') && currentSlot) renderReview();
  if (lastBookingReceipt && !document.getElementById('confirmation').classList.contains('hidden')) {
    renderConfirmationDetails(lastBookingReceipt);
  }
}

// ===== Summary Rail & Stepper UI =====
function updateStepperUI() {
  const isConfirmed = Boolean(lastBookingReceipt && !document.getElementById('confirmation').classList.contains('hidden'));
  const badge = document.getElementById('stepBadgeLabel');
  if (badge) badge.textContent = isConfirmed ? t('confBadge') : t('stepBadge', { n: currentStep });

  [1, 2, 3].forEach(n => {
    const ind = document.getElementById(`stepInd${n}`);
    if (!ind) return;
    ind.classList.remove('is-active', 'is-done', 'is-idle');
    if (n < currentStep || isConfirmed) {
      ind.classList.add('is-done');
      ind.innerHTML = '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
    } else if (n === currentStep) {
      ind.classList.add('is-active');
      ind.textContent = String(n);
    } else {
      ind.classList.add('is-idle');
      ind.textContent = String(n);
    }
  });

  const step1Done = currentStep > 1 || isConfirmed;
  const step2Done = currentStep > 2 || isConfirmed;
  document.getElementById('line1')?.classList.toggle('is-done', step1Done);
  document.getElementById('line2')?.classList.toggle('is-done', step2Done);
  const l1m = document.getElementById('line1Mobile');
  const l2m = document.getElementById('line2Mobile');
  if (l1m) {
    l1m.classList.toggle('bg-brass-500', step1Done);
    l1m.classList.toggle('bg-white/15', !step1Done);
  }
  if (l2m) {
    l2m.classList.toggle('bg-brass-500', step2Done);
    l2m.classList.toggle('bg-white/15', !step2Done);
  }
}

function formatSelectionCountText() {
  const count = selectedServices.length;
  const mins = totalDurationMinutes();
  if (count === 0) return t('selectAtLeastOne');
  if (count === 1) return t('selectedOneSummary', { m: mins });
  return t('selectedManySummary', { n: count, m: mins });
}

function updateSelectedTray() {
  const tray = document.getElementById('selectedServicesTray');
  const titleEl = document.getElementById('selectedTrayTitle');
  const chipsEl = document.getElementById('selectedTrayChips');
  const step1Hint = document.getElementById('selectedStep1Hint');
  const btnStep1 = document.getElementById('btnStep1');

  const count = selectedServices.length;
  if (btnStep1) {
    btnStep1.classList.remove('hidden');
    btnStep1.disabled = false;
    btnStep1.classList.toggle('is-incomplete', count === 0);
  }

  if (step1Hint) {
    if (count === 0) {
      step1Hint.textContent = t('selectAtLeastOne');
    } else {
      step1Hint.innerHTML = `<strong class="text-navy-900">${escapeHtml(formatSelectionCountText())}</strong>`;
    }
  }

  if (!tray || !chipsEl || !titleEl) return;
  if (count === 0) {
    tray.classList.add('hidden');
    chipsEl.replaceChildren();
    return;
  }

  tray.classList.remove('hidden');
  titleEl.textContent = formatSelectionCountText();
  chipsEl.replaceChildren();

  selectedServices.forEach(s => {
    const chip = document.createElement('span');
    chip.className = 'selected-chip';
    chip.innerHTML = `
      <span>${escapeHtml(s.name)}</span>
      <span class="text-[11px] text-[#997331] font-semibold tabular-nums">${Number(s.duration_minutes) || 30} ${escapeHtml(t('minUnit'))}</span>
    `;
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'selected-chip-remove';
    removeBtn.setAttribute('aria-label', `${t('removeServiceAria')} ${s.name}`);
    removeBtn.textContent = '×';
    removeBtn.onclick = e => {
      e.stopPropagation();
      toggleService(s.id);
    };
    chip.appendChild(removeBtn);
    chipsEl.appendChild(chip);
  });
}

function updateSummaryRail() {
  const listEl = document.getElementById('summaryServicesList');
  const durEl = document.getElementById('summaryDurationValue');
  const slotEl = document.getElementById('summarySlotValue');

  if (listEl) {
    listEl.replaceChildren();
    if (!selectedServices.length) {
      const p = document.createElement('p');
      p.className = 'font-medium text-white/75';
      p.textContent = t('summaryNoServices');
      listEl.appendChild(p);
      if (durEl) durEl.textContent = '';
    } else {
      selectedServices.forEach(s => {
        const row = document.createElement('div');
        row.className = 'flex items-start justify-between gap-2 text-xs sm:text-sm';
        row.innerHTML = `
          <span class="font-medium text-white leading-snug">${escapeHtml(s.name)}</span>
          <span class="text-white/60 tabular-nums flex-shrink-0">${Number(s.duration_minutes) || 30} ${escapeHtml(t('minUnit'))}</span>
        `;
        listEl.appendChild(row);
      });
      if (durEl) durEl.textContent = `${totalDurationMinutes()} ${t('minUnit')}`;
    }
  }

  if (slotEl) {
    if (currentSlot) {
      slotEl.textContent = `${currentSlot.date} · ${formatSlotWindow(currentSlot)} (${t('timezoneLabel')})`;
    } else if (selectedDate) {
      slotEl.textContent = `${selectedDate} · ${t('summaryPending')}`;
    } else {
      slotEl.textContent = t('summaryPending');
    }
  }
}

function showStep1LimitAlert(message) {
  const box = document.getElementById('step1LimitAlert');
  if (!box) return;
  box.textContent = message;
  box.classList.remove('hidden');
  clearTimeout(limitAlertTimer);
  limitAlertTimer = setTimeout(() => box.classList.add('hidden'), 4500);
}

function hideStep1LimitAlert() {
  const box = document.getElementById('step1LimitAlert');
  if (!box) return;
  box.classList.add('hidden');
  box.textContent = '';
}

// ===== Step 1: Load, Filter & Multi-Select Services =====
async function loadServices() {
  const grid = document.getElementById('serviceGrid');
  grid.innerHTML = '<div class="skeleton h-28"></div><div class="skeleton h-28"></div><div class="skeleton h-28"></div><div class="skeleton h-28"></div>';
  try {
    const res = await fetch('/api/services');
    if (!res.ok) throw new Error('services');
    allServices = await res.json();
    // Reconcile selected services in case list refreshed
    selectedServices = selectedServices
      .map(sel => allServices.find(s => Number(s.id) === Number(sel.id)))
      .filter(Boolean)
      .map(s => ({ id: Number(s.id), name: s.name, duration_minutes: Number(s.duration_minutes) || 30 }));
    renderServiceGrid();
    updateSelectedTray();
    updateSummaryRail();
  } catch (e) {
    grid.innerHTML = `
      <div class="col-span-full rounded-xl border border-[#E2DDD2] bg-[#FAF9F6] p-6 text-center space-y-3">
        <p class="text-sm text-[#4E5B70]">${escapeHtml(t('loadServicesError'))}</p>
        <button type="button" onclick="loadServices()" class="btn-secondary !py-2 !px-4 !text-sm">${escapeHtml(t('retryBtn'))}</button>
      </div>
    `;
    const btnStep1 = document.getElementById('btnStep1');
    if (btnStep1) btnStep1.classList.add('is-incomplete');
  }
}

function getFilteredServices() {
  const q = searchTerm.trim().toLowerCase();
  return allServices.filter(s => {
    const matchCategory = activeCategory === 'all' || classifyService(s) === activeCategory;
    if (!matchCategory) return false;
    if (!q) return true;
    return `${s.name || ''} ${s.description || ''}`.toLowerCase().includes(q);
  });
}

function renderServiceGrid() {
  const grid = document.getElementById('serviceGrid');
  const countBadge = document.getElementById('serviceCountBadge');
  const filtered = getFilteredServices();

  if (countBadge) {
    countBadge.textContent = t('servicesCount', { n: filtered.length });
  }

  grid.replaceChildren();

  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'col-span-full rounded-xl border border-[#E2DDD2] bg-[#FAF9F6] p-7 text-center space-y-3';
    empty.innerHTML = `
      <p class="text-sm text-[#4E5B70]">${escapeHtml(t('noSearchResults'))}</p>
      <button type="button" id="btnResetFilters" class="btn-secondary !py-2 !px-4 !text-sm">${escapeHtml(t('resetFilterBtn'))}</button>
    `;
    grid.appendChild(empty);
    document.getElementById('btnResetFilters').onclick = () => {
      searchTerm = '';
      activeCategory = 'all';
      const input = document.getElementById('serviceSearch');
      if (input) input.value = '';
      syncCategoryPills();
      renderServiceGrid();
    };
    return;
  }

  const selectedIds = new Set(selectedServices.map(s => Number(s.id)));

  filtered.forEach(s => {
    const sid = Number(s.id);
    const isSelected = selectedIds.has(sid);
    const card = document.createElement('div');
    card.id = `svc-${sid}`;
    card.className = `service-card${isSelected ? ' is-selected border-primary' : ''}`;
    card.tabIndex = 0;
    card.setAttribute('role', 'checkbox');
    card.setAttribute('aria-checked', String(isSelected));
    card.onclick = () => toggleService(sid);
    card.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleService(sid);
      }
    };

    card.innerHTML = `
      <div>
        <h4 class="font-semibold text-[0.95rem] leading-snug text-[#111B2B]">${escapeHtml(s.name)}</h4>
        <p class="text-[0.82rem] text-[#4E5B70] mt-1 leading-relaxed">${escapeHtml(s.description)}</p>
      </div>
      <span class="service-duration-badge">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        ${Number(s.duration_minutes) || 30} ${escapeHtml(t('minUnit'))}
      </span>
    `;
    grid.appendChild(card);
  });
}

function toggleService(id) {
  const numId = Number(id);
  const svc = allServices.find(s => Number(s.id) === numId);
  if (!svc) return;
  hideStep1LimitAlert();

  const existingIndex = selectedServices.findIndex(s => Number(s.id) === numId);
  if (existingIndex >= 0) {
    selectedServices.splice(existingIndex, 1);
  } else {
    if (selectedServices.length >= MAX_SERVICES_PER_BOOKING) {
      showStep1LimitAlert(t('maxServicesReached', { max: MAX_SERVICES_PER_BOOKING }));
      return;
    }
    const nextDuration = totalDurationMinutes() + (Number(svc.duration_minutes) || 30);
    if (nextDuration > MAX_BOOKING_DURATION) {
      showStep1LimitAlert(t('maxDurationReached', { max: MAX_BOOKING_DURATION }));
      return;
    }
    selectedServices.push({
      id: numId,
      name: svc.name,
      duration_minutes: Number(svc.duration_minutes) || 30
    });
  }

  // Selection changed: reset previously picked slot because combined duration may differ
  currentSlot = null;

  const selectedIds = new Set(selectedServices.map(s => Number(s.id)));
  document.querySelectorAll('#serviceGrid > .service-card').forEach(el => {
    const svcId = Number(el.id.replace('svc-', ''));
    const isSelected = selectedIds.has(svcId);
    el.classList.toggle('is-selected', isSelected);
    el.classList.toggle('border-primary', isSelected);
    el.setAttribute('aria-checked', String(isSelected));
  });

  updateSelectedTray();
  updateSummaryRail();
}

function clearSelectedServices() {
  selectedServices = [];
  currentSlot = null;
  hideStep1LimitAlert();
  renderServiceGrid();
  updateSelectedTray();
  updateSummaryRail();
}

function syncCategoryPills() {
  document.querySelectorAll('#serviceCategoryFilter [data-category]').forEach(btn => {
    const active = btn.getAttribute('data-category') === activeCategory;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', String(active));
  });
}

function filterAndScrollToBooking(category) {
  activeCategory = category || 'all';
  searchTerm = '';
  const searchInput = document.getElementById('serviceSearch');
  if (searchInput) searchInput.value = '';
  syncCategoryPills();

  if (lastBookingReceipt && !document.getElementById('confirmation').classList.contains('hidden')) {
    resetBooking(false);
  } else if (currentStep !== 1) {
    nextStep(1, false);
  }

  renderServiceGrid();
  document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== Step 2: Calendar, Combined-Duration Slots & Deduplicated Request Details =====
function showDateSelector() {
  const el = document.getElementById('slotsContainer');
  const w = bookingWords[currentLang] || bookingWords.es;
  if (!selectedServices.length || !el) return;

  const sig = selectionSignature();
  if (lastSlotSignature !== sig) {
    currentSlot = null;
    lastSlotSignature = sig;
  }

  const totalMins = totalDurationMinutes();
  const min = firstBookableDate(totalMins);
  if (!selectedDate || selectedDate < min) {
    selectedDate = min;
    currentSlot = null;
  }

  slotSeq++;
  updateSummaryRail();
  document.getElementById('btnStep2')?.classList.remove('hidden');

  const badgesHtml = selectedServices
    .map(
      s => `
      <span class="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2DDD2] px-3 py-1 text-xs font-medium text-navy-900">
        <span>${escapeHtml(s.name)}</span>
        <span class="text-[#997331] font-semibold tabular-nums">${Number(s.duration_minutes) || 30} ${escapeHtml(t('minUnit'))}</span>
      </span>
    `
    )
    .join('');

  el.innerHTML = `
    <div class="rounded-xl bg-[#FAF9F6] border border-[#E2DDD2] p-4 space-y-3">
      <div class="flex items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <p class="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#997331]">${escapeHtml(w[0])}</p>
          <span class="text-xs font-semibold text-navy-900 bg-[#F7F1E3] border border-[#E7D4AF] rounded-full px-2.5 py-0.5 tabular-nums">
            ${escapeHtml(t('totalDurationLabel'))}: ${totalMins} ${escapeHtml(t('minUnit'))}
          </span>
        </div>
        <button type="button" onclick="prevStep(1)" class="text-xs font-semibold text-[#1D5A88] hover:underline flex-shrink-0">${escapeHtml(t('modifyServices'))}</button>
      </div>
      <div class="flex flex-wrap gap-2">${badgesHtml}</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
      <section class="md:col-span-7">
        <h4 class="font-semibold text-sm text-navy-900 mb-2.5">${escapeHtml(w[2])}</h4>
        <div id="calendarBox" class="calendar-panel"></div>
      </section>
      <section class="md:col-span-5">
        <div class="flex items-center justify-between gap-2 mb-2.5">
          <h4 class="font-semibold text-sm text-navy-900">${escapeHtml(w[3])}</h4>
          <span class="text-xs font-medium text-[#997331] tabular-nums">⏱ ${totalMins} ${escapeHtml(t('minUnit'))}</span>
        </div>
        <div id="slotsGrid" class="slots-panel"></div>
      </section>
    </div>

    <section>
      <h4 class="font-semibold text-sm text-navy-900 mb-3">${escapeHtml(w[1])}</h4>
      <div id="requestFields" class="grid grid-cols-1 sm:grid-cols-2 gap-3.5"></div>
    </section>
  `;

  // Render deduplicated request fields across all selected services
  const fieldsBox = document.getElementById('requestFields');
  const fields = collectRequestFields();

  fields.forEach(field => {
    const wrap = document.createElement('label');
    wrap.className = 'block';
    const caption = document.createElement('span');
    caption.className = 'field-label';
    caption.textContent = `${field.label} *`;

    const input = document.createElement('input');
    input.type = 'text';
    input.required = true;
    input.maxLength = 100;
    input.dataset.fieldKey = field.key;
    input.className = 'field-input';
    input.value = requestDraft[field.key] || '';
    input.oninput = () => {
      requestDraft[field.key] = input.value;
      input.classList.remove('is-missing');
      updateProceed();
    };
    wrap.append(caption, input);
    fieldsBox.appendChild(wrap);
  });

  const maxDateObj = new Date(arToday() + 'T12:00:00Z');
  maxDateObj.setUTCDate(maxDateObj.getUTCDate() + 90);
  const maxIso = maxDateObj.toISOString().slice(0, 10);
  let month = new Date((selectedDate || min).slice(0, 7) + '-01T12:00:00Z');
  const locale = bookingLocale[currentLang] || 'es-AR';

  function renderCalendar() {
    const box = document.getElementById('calendarBox');
    if (!box) return;
    box.replaceChildren();

    const nav = document.createElement('div');
    nav.className = 'flex items-center justify-between mb-3.5';

    const title = document.createElement('strong');
    title.className = 'text-sm font-semibold text-navy-900 capitalize';
    title.textContent = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(month);

    const prev = document.createElement('button');
    const next = document.createElement('button');
    for (const [button, caption, delta] of [[prev, w[5], -1], [next, w[6], 1]]) {
      button.type = 'button';
      button.className = 'cal-nav-btn';
      button.textContent = delta < 0 ? '‹' : '›';
      button.setAttribute('aria-label', caption);
      const candidate = new Date(month);
      candidate.setUTCMonth(candidate.getUTCMonth() + delta);
      const ym = candidate.toISOString().slice(0, 7);
      button.disabled = ym < min.slice(0, 7) || ym > maxIso.slice(0, 7);
      button.onclick = () => {
        month = candidate;
        renderCalendar();
      };
    }

    nav.append(prev, title, next);
    box.append(nav);

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-7 gap-1 text-center';

    for (let i = 0; i < 7; i++) {
      const day = document.createElement('span');
      day.className = 'text-[11px] font-semibold uppercase tracking-wide text-[#6D7A8E] py-1.5';
      day.textContent = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, 0, 5 + i)));
      grid.append(day);
    }

    const offset = (month.getUTCDay() + 6) % 7;
    for (let i = 0; i < offset; i++) grid.append(document.createElement('span'));

    const daysInMonth = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
    for (let n = 1; n <= daysInMonth; n++) {
      const d = new Date(month);
      d.setUTCDate(n);
      const iso = d.toISOString().slice(0, 10);
      const isWeekend = d.getUTCDay() === 0 || d.getUTCDay() === 6;
      const disabled = iso < min || iso > maxIso || isWeekend;

      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = String(n);
      button.disabled = disabled;
      button.className =
        'cal-day-btn' +
        (iso === selectedDate ? ' is-selected' : '') +
        (iso === arToday() ? ' is-today' : '');
      button.setAttribute('aria-label', iso);
      button.setAttribute('aria-pressed', String(iso === selectedDate));
      button.onclick = () => {
        selectedDate = iso;
        currentSlot = null;
        document.getElementById('slotsGrid')?.classList.remove('is-missing');
        updateSummaryRail();
        updateProceed();
        renderCalendar();
        loadSlots(iso, document.getElementById('slotsGrid'));
      };
      grid.append(button);
    }

    box.append(grid);
  }

  renderCalendar();
  updateProceed();

  const slotsGrid = document.getElementById('slotsGrid');
  if (selectedDate) {
    loadSlots(selectedDate, slotsGrid);
  } else {
    slotsGrid.innerHTML = `<div class="h-full min-h-[220px] flex flex-col items-center justify-center text-center px-4 text-sm text-[#6D7A8E]">
      <svg class="w-7 h-7 text-[#CEC7B8] mb-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path stroke-linecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
      <p>${escapeHtml(t('selectDatePrompt'))}</p>
    </div>`;
  }
}

async function loadSlots(date, container) {
  if (!selectedServices.length || !date || !container) return;

  container.innerHTML = `
    <div class="min-h-[220px] flex flex-col items-center justify-center text-center py-8">
      <div class="animate-spin rounded-full h-7 w-7 border-2 border-[#E2DDD2] border-t-[#0F1D32] mb-2.5"></div>
      <p class="text-xs font-medium text-[#6D7A8E]">${escapeHtml(t('loadingSlots'))}</p>
    </div>
  `;

  try {
    const seq = ++slotSeq;
    const idsParam = selectedServices.map(s => s.id).join(',');
    const primaryId = selectedServices[0].id;
    const res = await fetch(
      `/api/slots?date=${encodeURIComponent(date)}&service_ids=${encodeURIComponent(idsParam)}&service_id=${encodeURIComponent(primaryId)}`
    );
    if (!res.ok) throw new Error('slots');
    const slots = await res.json();
    if (seq !== slotSeq || date !== selectedDate || !container.isConnected) return;

    if (!slots.length || !slots.some(s => s.available)) {
      const w = bookingWords[currentLang] || bookingWords.es;
      container.innerHTML = `<div class="min-h-[220px] flex items-center justify-center text-center px-3 text-sm text-[#6D7A8E]">${escapeHtml(w[4])}</div>`;
      return;
    }

    container.replaceChildren();
    const isMulti = selectedServices.length > 1;
    const grid = document.createElement('div');
    grid.className = isMulti
      ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2'
      : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-2';
    const todayIso = arToday();

    slots.forEach(slot => {
      const isToday = slot.date === todayIso;
      const isActive = currentSlot && currentSlot.slot_id === slot.slot_id;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `slot-btn${slot.available ? '' : ' disabled'}${isActive ? ' active' : ''}`;
      btn.disabled = !slot.available;
      btn.setAttribute('aria-pressed', String(Boolean(isActive)));
      btn.innerHTML = `
        ${isToday ? `<div class="slot-meta text-[10px] uppercase tracking-wider font-semibold text-[#997331]">${escapeHtml(t('todayTag'))}</div>` : ''}
        <div class="slot-time text-sm font-semibold ${slot.available ? 'text-navy-900' : 'text-[#A0A8B4]'}">${escapeHtml(slot.time)}</div>
        ${slot.end_time && isMulti ? `<div class="slot-meta text-[11px] text-[#6D7A8E]">→ ${escapeHtml(slot.end_time)}</div>` : ''}
      `;
      if (slot.available) {
        btn.onclick = () => selectSlot(slot, btn);
      }
      grid.appendChild(btn);
    });

    container.appendChild(grid);
  } catch (e) {
    container.innerHTML = `<div class="min-h-[220px] flex items-center justify-center text-center px-3 text-sm text-[#A5222E]">${escapeHtml(t('loadSlotsError'))}</div>`;
  }
}

function selectSlot(slot, btn) {
  document.querySelectorAll('.slot-btn').forEach(el => {
    el.classList.remove('active');
    el.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  document.getElementById('slotsGrid')?.classList.remove('is-missing');
  currentSlot = slot;
  updateSummaryRail();
  updateProceed();
}

function areAllRequestFieldsComplete() {
  if (!selectedServices.length) return false;
  return collectRequestFields().every(field => String(requestDraft[field.key] || '').trim());
}

function updateProceed() {
  const fieldsOk = areAllRequestFieldsComplete();
  const valid = Boolean(currentSlot && fieldsOk);
  const btn = document.getElementById('btnStep2');
  if (btn) {
    btn.classList.remove('hidden');
    btn.disabled = false;
    btn.classList.toggle('is-incomplete', !valid);
  }
  const hint = document.getElementById('step2Hint');
  if (hint) {
    const w = bookingWords[currentLang] || bookingWords.es;
    hint.textContent = valid ? '' : !currentSlot ? w[8] : w[7];
    hint.className = valid
      ? 'text-sm text-[#4E5B70] mb-3 text-center sm:text-left'
      : 'text-sm font-medium text-[#997331] mb-3 text-center sm:text-left';
  }
  return valid;
}

// ===== Step Navigation =====
function nextStep(step, scroll = true) {
  if (step === 2 && !selectedServices.length) {
    showStep1LimitAlert(t('selectAtLeastOne'));
    document.getElementById('step1LimitAlert')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  if (step === 3 && !updateProceed()) {
    const w = bookingWords[currentLang] || bookingWords.es;
    const hint = document.getElementById('step2Hint');
    if (!currentSlot) {
      const slotsPanel = document.getElementById('slotsGrid');
      slotsPanel?.classList.add('is-missing');
      slotsPanel?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (hint) {
        hint.textContent = w[8];
        hint.className = 'text-sm font-semibold text-[#A5222E] mb-3 text-center sm:text-left';
      }
      return;
    }
    const missingInput = [...document.querySelectorAll('#requestFields input')].find(inp => !inp.value.trim());
    if (missingInput) {
      missingInput.classList.add('is-missing');
      missingInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      missingInput.focus();
      missingInput.reportValidity?.();
      if (hint) {
        hint.textContent = w[7];
        hint.className = 'text-sm font-semibold text-[#A5222E] mb-3 text-center sm:text-left';
      }
    }
    return;
  }

  currentStep = step;
  [1, 2, 3].forEach(n => {
    document.getElementById(`step${n}`).classList.toggle('step-hidden', n !== step);
  });
  document.getElementById('confirmation').classList.add('hidden');
  hideFormError();

  updateStepperUI();
  updateSummaryRail();

  if (step === 2) showDateSelector();
  if (step === 3) renderReview();

  if (scroll) {
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function prevStep(step) {
  nextStep(step);
}

// ===== Step 3: Multi-Service Booking Review & Submission =====
function renderReview() {
  const form = document.getElementById('regForm');
  const w = bookingWords[currentLang] || bookingWords.es;
  let box = document.getElementById('bookingReview');
  if (!box) {
    box = document.createElement('div');
    box.id = 'bookingReview';
    box.className = 'rounded-xl border border-[#E2DDD2] bg-[#FAF9F6] p-4 sm:p-5 mb-6 space-y-3';
    form.before(box);
  }
  box.replaceChildren();

  const topRow = document.createElement('div');
  topRow.className = 'flex flex-wrap items-center justify-between gap-2';
  topRow.innerHTML = `
    <p class="text-xs uppercase tracking-[0.12em] font-semibold text-[#997331]">${escapeHtml(w[0])}</p>
    <span class="text-xs font-semibold text-navy-900 bg-[#F7F1E3] border border-[#E7D4AF] rounded-full px-2.5 py-0.5 tabular-nums">
      ${escapeHtml(t('totalDurationLabel'))}: ${totalDurationMinutes()} ${escapeHtml(t('minUnit'))}
    </span>
  `;
  box.append(topRow);

  const svcList = document.createElement('div');
  svcList.className = 'flex flex-wrap gap-2';
  selectedServices.forEach(s => {
    const tag = document.createElement('span');
    tag.className = 'inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E2DDD2] px-3 py-1 text-xs font-semibold text-navy-900';
    tag.innerHTML = `${escapeHtml(s.name)} <span class="text-[#997331] tabular-nums">(${Number(s.duration_minutes) || 30} ${escapeHtml(t('minUnit'))})</span>`;
    svcList.append(tag);
  });
  box.append(svcList);

  const dateLine = document.createElement('p');
  dateLine.className = 'text-sm font-semibold text-navy-900 pt-2 border-t border-[#E2DDD2] tabular-nums';
  dateLine.textContent = `${w[9]}: ${currentSlot.date} · ${formatSlotWindow(currentSlot)} (${t('timezoneLabel')})`;
  box.append(dateLine);

  const detailsGrid = document.createElement('div');
  detailsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs sm:text-sm text-[#4E5B70]';
  collectRequestFields().forEach(field => {
    const p = document.createElement('p');
    p.textContent = `${field.label}: ${String(requestDraft[field.key] || '').trim()}`;
    detailsGrid.append(p);
  });
  box.append(detailsGrid);
}

function showFormError(msg) {
  const box = document.getElementById('formError');
  if (!box) return;
  box.textContent = msg;
  box.classList.remove('hidden');
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideFormError() {
  const box = document.getElementById('formError');
  if (!box) return;
  box.textContent = '';
  box.classList.add('hidden');
}

function renderConfirmationDetails(receipt) {
  const container = document.getElementById('confirmDetails');
  if (!container || !receipt) return;
  const isMulti = receipt.services.length > 1;
  const servicesHtml = isMulti
    ? `<ul class="space-y-1 text-right">${receipt.services
        .map(s => `<li class="font-semibold text-navy-900">${escapeHtml(s.name)} <span class="text-xs font-medium text-[#997331] tabular-nums">(${Number(s.duration_minutes) || 30} ${escapeHtml(t('minUnit'))})</span></li>`)
        .join('')}</ul>`
    : `<span class="font-semibold text-navy-900">${escapeHtml(receipt.services[0]?.name || 'N/A')}</span>`;

  const rows = [
    [t('confNumber'), `<span class="font-semibold text-navy-900 tabular-nums">#${escapeHtml(receipt.appointment_id)}</span>`],
    [isMulti ? t('confServices') : t('confService'), servicesHtml],
    [t('confDuration'), `<span class="font-semibold text-navy-900 tabular-nums">${escapeHtml(receipt.total_duration_minutes)} ${escapeHtml(t('minUnit'))}</span>`],
    [t('confDate'), `<span class="font-semibold text-navy-900 tabular-nums">${escapeHtml(receipt.date)}</span>`],
    [t('confTime'), `<span class="font-semibold text-navy-900 tabular-nums">${escapeHtml(receipt.time_window)} (${escapeHtml(t('timezoneLabel'))})</span>`],
    [t('confClient'), `<span class="font-semibold text-navy-900">${escapeHtml(receipt.full_name)}</span>`]
  ];

  container.innerHTML = rows
    .map(
      ([label, valueHtml]) => `
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 py-2.5 border-b border-[#E2DDD2] last:border-b-0">
        <span class="text-xs uppercase tracking-wider font-medium text-[#6D7A8E] flex-shrink-0 pt-0.5">${escapeHtml(label)}</span>
        <div class="sm:text-right">${valueHtml}</div>
      </div>
    `
    )
    .join('');
}

function resetBooking(scroll = true) {
  lastBookingReceipt = null;
  selectedServices = [];
  currentSlot = null;
  selectedDate = '';
  requestDraft = {};
  lastSlotSignature = '';
  document.getElementById('regForm')?.reset();
  const submitBtn = document.getElementById('btnSubmitBooking');
  if (submitBtn) submitBtn.disabled = false;
  const backBtn = document.getElementById('btnBackStep3');
  if (backBtn) backBtn.disabled = false;
  renderServiceGrid();
  updateSelectedTray();
  nextStep(1, scroll);
}

function hideSteps() {
  [1, 2, 3].forEach(n => {
    document.getElementById(`step${n}`).classList.add('step-hidden');
  });
}

// ===== Mobile Drawer & Scroll Polish =====
function initUIEnhancements() {
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const drawer = document.getElementById('mobileDrawer');
  const openBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileMenuClose');

  const setDrawer = open => {
    if (!drawer || !openBtn) return;
    drawer.classList.toggle('open', open);
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  openBtn?.addEventListener('click', () => setDrawer(true));
  closeBtn?.addEventListener('click', () => setDrawer(false));
  drawer?.addEventListener('click', e => {
    if (e.target === drawer) setDrawer(false);
  });
  drawer?.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => setDrawer(false));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) setDrawer(false);
  });

  document.getElementById('serviceSearch')?.addEventListener('input', e => {
    searchTerm = e.target.value;
    renderServiceGrid();
  });

  document.querySelectorAll('#serviceCategoryFilter [data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-category') || 'all';
      syncCategoryPills();
      renderServiceGrid();
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
}

// ===== Form Submission Handler =====
document.getElementById('regForm').addEventListener('submit', async e => {
  e.preventDefault();
  if (!currentSlot || !updateProceed()) {
    showFormError(t('bookingErrorGeneric'));
    return;
  }
  hideFormError();

  const detailLines = collectRequestFields().map(
    field => `${field.label}: ${String(requestDraft[field.key] || '').trim()}`
  );
  const servicesHeader =
    selectedServices.length > 1
      ? `${t('confServices')}: ${selectedServices.map(s => `${s.name} (${s.duration_minutes} min)`).join(' + ')}`
      : '';
  const userNotes = document.getElementById('notes').value.trim();
  const combinedNotes = [servicesHeader, detailLines.join('\n'), userNotes]
    .filter(Boolean)
    .join('\n\n')
    .slice(0, 2500);

  const fullName = document.getElementById('fullName').value.trim();
  const payload = {
    full_name: fullName,
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    country: document.getElementById('country').value.trim(),
    doc_type: document.getElementById('docType').value,
    doc_number: document.getElementById('docNumber').value.trim(),
    language: currentLang,
    notes: combinedNotes
  };

  const submitBtn = document.getElementById('btnSubmitBooking');
  const backBtn = document.getElementById('btnBackStep3');
  const originalHtml = submitBtn.innerHTML;
  if (backBtn) backBtn.disabled = true;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<div class="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>';

  try {
    const regRes = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const regData = await regRes.json();
    if (!regRes.ok || !regData.success) throw new Error(regData.error || t('bookingErrorGeneric'));

    clientId = regData.client_id;

    const bookRes = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        registration_token: regData.registration_token,
        slot_id: currentSlot.slot_id,
        service_ids: selectedServices.map(s => s.id)
      })
    });
    const bookData = await bookRes.json();
    if (!bookRes.ok || !bookData.success) throw new Error(bookData.error || t('bookingErrorGeneric'));

    lastBookingReceipt = {
      appointment_id: bookData.appointment_id,
      services: selectedServices.map(s => ({ ...s })),
      total_duration_minutes: bookData.total_duration_minutes || totalDurationMinutes(),
      date: currentSlot.date,
      time_window: formatSlotWindow(currentSlot),
      full_name: fullName
    };

    hideSteps();
    document.getElementById('confirmation').classList.remove('hidden');
    renderConfirmationDetails(lastBookingReceipt);
    updateStepperUI();
    submitBtn.innerHTML = originalHtml;
    submitBtn.disabled = false;
    if (backBtn) backBtn.disabled = false;
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (err) {
    showFormError(err.message || t('bookingErrorGeneric'));
    submitBtn.innerHTML = originalHtml;
    submitBtn.disabled = false;
    if (backBtn) backBtn.disabled = false;
  }
});

// ===== Bootstrap =====
document.addEventListener('DOMContentLoaded', () => {
  initUIEnhancements();
  let savedLang = 'es';
  try {
    const stored = localStorage.getItem('gestoriaLang');
    if (stored && translations[stored]) savedLang = stored;
  } catch (_) {}
  changeLang(savedLang);
  loadServices();
  document.getElementById('step1').classList.remove('step-hidden');
});
