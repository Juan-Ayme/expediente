// lib/expediente-data.ts

// --- TIPOS DE DATOS ---
export type Personaje = {
  id: string;
  name: string;
  role: 'Víctima' | 'Acusado' | 'Testigo';
  image: string;
  details?: {
    dni: string;
    dateOfBirth: string;
    maritalStatus: string;
    education: string;
    location: string;
  };
};

export type Evidencia = {
  id: string;
  title: string; 
  shortTitle?: string;
  category: 'Pruebas' | 'Acusación Fiscal' | 'Sentencia' | 'Material de Apoyo';
  iconName: string;
  src: string;
  relatedPeopleIds: string[]; 
};

export type EventoTimeline = {
  id: string; 
  date: string; // Formato AAAA-MM-DD para ordenar
  time?: string;
  title: string;
  description: string;
  iconName: string;
  relatedPeopleIds: string[]; 
  relatedEvidenceIds: string[];
};

export type Conexion = {
  from: string; // ID del nodo de inicio
  to: string;   // ID del nodo de fin
};

// --- PERSONAJES CLAVE ---
export const INVOLUCRADOS: Personaje[] = [
  { 
    id: '76224287', 
    name: 'Briyit Paola Taboada Huamán', 
    role: 'Víctima', 
    image: '/imagen/briyit.jpeg',
    details: {
        dni: '76224287',
        dateOfBirth: '07-12-1998',
        maritalStatus: 'Soltera',
        education: 'Secundaria incompleta',
        location: 'Sector Miguel Grau S/N, Pichari, La Convención, Cusco',
    }
  },
  { 
    id: '75154798', 
    name: 'Jesús Nicolas Rojas Licas', 
    role: 'Acusado', 
    image: '/imagen/jesus.jpeg',
    details: {
        dni: '75154798',
        dateOfBirth: '24-12-1997',
        maritalStatus: 'Soltero',
        education: 'Secundaria incompleta',
        location: 'C.P. Natividad S/N, Pichari, La Convención, Cusco',
    }
  },
  { 
    id: 'testigo-ruth', 
    name: 'Ruth Marisol Uriburu', 
    role: 'Testigo', 
    image: '/imagen/personaje/ruth.jpeg',
    details: { dni: '75932272', dateOfBirth: 'N/A', maritalStatus: 'N/A', education: 'N/A', location: 'Jr. Abraham Valdelomar N° 300-Kimbiri' }
  },
  { 
    id: 'testigo-sidney', 
    name: 'Jhoseline Sidney Tarrillo', 
    role: 'Testigo', 
    image: '/imagen/personaje/sidney.jpeg',
    details: { dni: '71095380', dateOfBirth: 'N/A', maritalStatus: 'N/A', education: 'N/A', location: 'Jr. Abraham Valdelomar N° 22 - Kimbiri' }
  },
  {
    id: 'testigo-albina',
    name: 'Albina Huamán Chávez',
    role: 'Testigo',
    image: '/imagen/personaje/mama.jpeg',
    details: { dni: '38678309', dateOfBirth: 'N/A', maritalStatus: 'N/A', education: 'N/A', location: 'Sector J.C.M. Mz B lt 10, Kimbiri' }
  }
];

// --- EVIDENCIAS Y DOCUMENTOS ---
export const EVIDENCIAS: Evidencia[] = [
  // Pruebas
  { id: 'p1', title: 'Acta de Hallazgo de Restos Óseos', shortTitle: "Acta de Hallazgo", category: 'Pruebas', iconName: 'FileSearch', src: '/documentos/pruebas/prueba_1(Acta de hallazgo).pdf', relatedPeopleIds: ['76224287'] },
  { id: 'p2', title: 'Informe de Inspección Criminal N° 220-2020-IC', shortTitle: "Inspección Criminal", category: 'Pruebas', iconName: 'Siren', src: '/documentos/pruebas/prueba_2(Informe de inspección criminal N° 220-2020-IC).pdf', relatedPeopleIds: ['76224287'] },
  { id: 'p3', title: 'Peritaje Antropológico Forense N° 002-2020', shortTitle: "Peritaje Antropológico", category: 'Pruebas', iconName: 'UserCheck', src: '/documentos/pruebas/prueba_3(Peritaje antropológico N° 002-2020).pdf', relatedPeopleIds: ['76224287'] },
  { id: 'p4', title: 'Resultados de la Prueba de ADN (Cabello)', shortTitle: "Prueba de ADN", category: 'Pruebas', iconName: 'Dna', src: '/documentos/pruebas/prueba_4(Resultados de la prueba de ADN).pdf', relatedPeopleIds: ['76224287', 'testigo-albina'] },
  { id: 'p5', title: 'Declaración Testimonial de la Madre', shortTitle: "Declaración (Madre)", category: 'Pruebas', iconName: 'FileHeart', src: '/documentos/pruebas/prueba_5(Declaración testimonial de la madre).pdf', relatedPeopleIds: ['76224287', '75154798', 'testigo-albina'] },
  { id: 'p6', title: 'Declaración Testimonial de Ruth Marisol', shortTitle: "Declaración (Ruth)", category: 'Pruebas', iconName: 'MessageSquare', src: '/documentos/pruebas/prueba_6 (Declaración testimonial de la amiga ruth  ).pdf', relatedPeopleIds: ['testigo-ruth', '76224287', '75154798'] },
  { id: 'p7', title: 'Declaración Testimonial de Jesús Rojas', shortTitle: "Declaración (Acusado)", category: 'Pruebas', iconName: 'MessageSquare', src: '/documentos/pruebas/prueba_7 (Declaración testimonial de Jesús rojas) .pdf', relatedPeopleIds: ['75154798'] },
  { id: 'p8', title: 'Acta de Levantamiento y Hallazgo de Indicios', shortTitle: "Acta de Indicios", category: 'Pruebas', iconName: 'FileSearch', src: '/documentos/pruebas/prueba_8(Acta de levantamiento y hallazgo de indicios).pdf', relatedPeopleIds: ['75154798', '76224287'] },
  { id: 'p9', title: 'Informe de Inspección Domicilio del Acusado', shortTitle: "Inspección Domicilio", category: 'Pruebas', iconName: 'Siren', src: '/documentos/pruebas/prueba_9(Informe de inspección criminal N° 231-2020-IC).pdf', relatedPeopleIds: ['75154798', '76224287'] },
  { id: 'p10', title: 'Peritaje Informático: Chat Acusado-Víctima', shortTitle: "Chat Acusado-Víctima", category: 'Pruebas', iconName: 'Microscope', src: '/documentos/pruebas/prueba_10(Informe pericial informático N.°2012008).pdf', relatedPeopleIds: ['75154798', '76224287'] },
  { id: 'p11', title: 'Peritaje Informático: Chat Víctima-Amiga', shortTitle: "Chat Víctima-Amiga", category: 'Pruebas', iconName: 'Microscope', src: '/documentos/pruebas/prueba_11(Informe pericial informático  N.°2012009.pdf', relatedPeopleIds: ['76224287', 'testigo-sidney'] },
  { id: 'p12', title: 'Declaración Testimonial de Sidney Tarrillo', shortTitle: "Declaración (Sidney)", category: 'Pruebas', iconName: 'MessageSquare', src: '/documentos/pruebas/prueba_12 ( Declaración testimonial de Sidney)  .pdf', relatedPeopleIds: ['testigo-sidney', '76224287', '75154798'] },
  { id: 'p13', title: 'Análisis Digital Forense de Fotografías', shortTitle: "Análisis de Fotos", category: 'Pruebas', iconName: 'Camera', src: '/documentos/pruebas/prueba_13(Informe pericial de análisi figital forense  N.°20120011 ).pdf', relatedPeopleIds: ['76224287', '75154798'] },
  { id: 'p14', title: 'Declaración Testimonial de J.M.B. (Dueño de Moto)', shortTitle: "Declaración (Dueño Moto)", category: 'Pruebas', iconName: 'MessageSquare', src: '/documentos/pruebas/prueba_14(Declaración Testimonial de J.M.B).pdf', relatedPeopleIds: ['75154798'] },
  { id: 'p15', title: 'Peritaje Informático: Chat Acusado-Dueño de Moto', shortTitle: "Chat Acusado-Dueño Moto", category: 'Pruebas', iconName: 'Microscope', src: '/documentos/pruebas/prueba_15(Informe pericial informático N.°2012010).pdf', relatedPeopleIds: ['75154798'] },
  
  // Documentos Clave
  { id: 'd1', title: 'Requerimiento de Acusación Fiscal', category: 'Acusación Fiscal', iconName: 'FileText', src: '/documentos/sentencia/fiscal_acu.pdf', relatedPeopleIds: ['76224287', '75154798'] },
  { id: 'd2', title: 'Sentencia de Primera Instancia', category: 'Sentencia', iconName: 'Building', src: '/documentos/sentencia/SENTENCIA- 057-2020-6-PE.pdf', relatedPeopleIds: ['76224287', '75154798'] },
  { id: 'd3', title: 'Boletín Informativo sobre Feminicidio', category: 'Material de Apoyo', iconName: 'FileHeart', src: '/documentos/material_de_apoyo/boletín_informátivo.pdf', relatedPeopleIds: [] },
  { id: 'd4', title: 'Expediente de Apelación', category: 'Sentencia', iconName: 'Building', src: '/documentos/material_de_apoyo/EXPEDIENTE_57-2020-6.pdf', relatedPeopleIds: ['76224287', '75154798'] },
  { id: 'd5', title: 'Periódico Reporte Corporativo Blanco y gris', category: 'Material de Apoyo', iconName: 'Building', src: '/documentos/material_de_apoyo/reporte.pdf', relatedPeopleIds: [] },

];

// --- LÍNEA DE TIEMPO DEL CASO (DETALLADA) ---
export const TIMELINE_EVENTS: EventoTimeline[] = [
    { 
        id: 't0', date: '2019-12-31', 
        title: 'Celebración de Año Nuevo y Amenazas', 
        description: 'Jesús R. y Paola T. asisten a una fiesta. Surgen discusiones por celos y Jesús profiere amenazas de muerte.', 
        iconName: 'Calendar', 
        relatedPeopleIds: ['76224287', '75154798', 'testigo-ruth', 'testigo-sidney'], 
        relatedEvidenceIds: ['p6', 'p12', 'p13'] 
    },
    { 
        id: 't1', date: '2020-01-01', time: '19:30',
        title: 'Ocurrencia del Crimen', 
        description: 'Jesús R. intercepta, atropella y agrede a Paola T. con una piedra, causándole la muerte. Posteriormente, oculta el cuerpo en una granja de cerdos.', 
        iconName: 'Siren', 
        relatedPeopleIds: ['76224287', '75154798'], 
        relatedEvidenceIds: ['p7', 'p2'] 
    },
    { 
        id: 't2', date: '2020-01-12', time: '15:00',
        title: 'Hallazgo de Restos Óseos', 
        description: 'El dueño de la granja reporta el hallazgo de un cráneo. La fiscalía realiza la inspección y recoge los restos junto a otras evidencias.', 
        iconName: 'FileSearch', 
        relatedPeopleIds: ['76224287'], 
        relatedEvidenceIds: ['p1', 'p2', 'p8'] 
    },
    { 
        id: 't3', date: '2020-01-13',
        title: 'Peritaje Antropológico y Declaración de la Madre', 
        description: 'El análisis forense concluye que los restos son de la víctima. Su madre rinde su declaración.', 
        iconName: 'UserCheck', 
        relatedPeopleIds: ['76224287', 'testigo-albina'], 
        relatedEvidenceIds: ['p3', 'p5'] 
    },
    { 
        id: 't4', date: '2020-01-14',
        title: 'Declaraciones de Testigos Clave', 
        description: 'Amigas de la víctima rinden sus declaraciones testimoniales, corroborando el contexto de violencia.', 
        iconName: 'MessageSquare', 
        relatedPeopleIds: ['testigo-ruth', 'testigo-sidney', '76224287', '75154798'], 
        relatedEvidenceIds: ['p6', 'p12'] 
    },
    { 
        id: 't5', date: '2020-01-18',
        title: 'Resultados de ADN', 
        description: 'La prueba de ADN confirma con un 99% de compatibilidad que los restos pertenecen a Paola Taboada Huamán.', 
        iconName: 'Dna', 
        relatedPeopleIds: ['76224287', 'testigo-albina'], 
        relatedEvidenceIds: ['p4'] 
    },
    { 
        id: 't6', date: '2020-01-19', time: '12:20',
        title: 'Allanamiento y Evidencia Crítica', 
        description: 'En el domicilio de Jesús R., se encuentran las pertenencias ensangrentadas de la víctima dentro de un costal en su motocicleta.', 
        iconName: 'Building', 
        relatedPeopleIds: ['75154798', '76224287'], 
        relatedEvidenceIds: ['p9'] 
    },
    { 
        id: 't7', date: '2020-01-20',
        title: 'Peritajes Informáticos', 
        description: 'Se analizan celulares y fotos, revelando conversaciones con amenazas y confirmando la vestimenta.', 
        iconName: 'Microscope', 
        relatedPeopleIds: ['76224287', '75154798', 'testigo-sidney'], 
        relatedEvidenceIds: ['p10', 'p11', 'p13', 'p15'] 
    },
    { 
        id: 't8', date: '2021-08-10',
        title: 'Sentencia y Apelación', 
        description: 'Jesús R. es sentenciado. Posteriormente, la Sala de Apelaciones revisa el caso.', 
        iconName: 'FileText', 
        relatedPeopleIds: ['76224287', '75154798'], 
        relatedEvidenceIds: ['d1', 'd2', 'd4'] 
    },
];


// --- ARRAY DE CONEXIONES PARA EL MURO ---
export const CONNECTIONS: Conexion[] = [
  // Conexiones para la Víctima
  { from: '76224287', to: 't0' }, { from: '76224287', to: 't1' }, { from: '76224287', to: 't2' }, { from: '76224287', to: 't3' },
  { from: '76224287', to: 't4' }, { from: '76224287', to: 't5' }, { from: '76224287', to: 't6' }, { from: '76224287', to: 't7' },
  { from: '76224287', to: 't8' },
  { from: '76224287', to: 'p1' }, { from: '76224287', to: 'p2' }, { from: '76224287', to: 'p3' }, { from: '76224287', to: 'p4' },
  { from: '76224287', to: 'p5' }, { from: '76224287', to: 'p6' }, { from: '76224287', to: 'p8' }, { from: '76224287', to: 'p9' },
  { from: '76224287', to: 'p10' }, { from: '76224287', to: 'p11' }, { from: '76224287', to: 'p12' }, { from: '76224287', to: 'p13' },
  { from: '76224287', to: 'd1' }, { from: '76224287', to: 'd2' }, { from: '76224287', to: 'd4' },

  // Conexiones del Acusado
  { from: '75154798', to: 't0' }, { from: '75154798', to: 't1' }, { from: '75154798', to: 't4' }, { from: '75154798', to: 't6' },
  { from: '75154798', to: 't7' }, { from: '75154798', to: 't8' },
  { from: '75154798', to: 'p5' }, { from: '75154798', to: 'p6' }, { from: '75154798', to: 'p7' }, { from: '75154798', to: 'p8' },
  { from: '75154798', to: 'p9' }, { from: '75154798', to: 'p10' }, { from: '75154798', to: 'p12' }, { from: '75154798', to: 'p13' },
  { from: '75154798', to: 'p14' }, { from: '75154798', to: 'p15' },
  { from: '75154798', to: 'd1' }, { from: '75154798', to: 'd2' }, { from: '75154798', to: 'd4' },

  // Conexiones de Testigos
  { from: 'testigo-ruth', to: 't4' }, { from: 'testigo-ruth', to: 'p6' },
  { from: 'testigo-sidney', to: 't4' }, { from: 'testigo-sidney', to: 'p11' }, { from: 'testigo-sidney', to: 'p12' },
  { from: 'testigo-albina', to: 't3' }, { from: 'testigo-albina', to: 'p5' }, { from: 'testigo-albina', to: 'p4' },

  // Conexiones entre Evidencia y Línea de Tiempo
  ...TIMELINE_EVENTS.flatMap(evento => 
    evento.relatedEvidenceIds.map(evidenciaId => ({ from: evento.id, to: evidenciaId }))
  )
];


