// lib/data.ts
// Este archivo es ahora la única fuente de datos para toda la aplicación.

// --- TIPO PARA PERSONAJES ---
export interface Personaje {
  id: string;
  name: string;
  role: 'Víctima' | 'Acusado' | 'Testigo';
  status: 'Activo' | 'Inactivo' | 'Cerrado';
  image: string;
  timeline: string;

  // ... (puedes añadir más detalles si los necesitas en el futuro)
}

// --- TIPO PARA DOCUMENTOS ---
export type DocumentData = { 
  id: string;
  title: string; 
  src: string; 
  date: string; 
  description: string;
  category: 'Pruebas' | 'Acusación Fiscal' | 'Sentencia' | 'Material de Apoyo'; 
};

// --- DATOS DE PERSONAJES ---
export const ALL_PERSONAJES: Personaje[] = [
  {
    id: '76224287',
    name: 'Briyit Paola Taboada Huamán',
    role: 'Víctima',
    status: 'Activo',
    image: 'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    timeline: ""

  },
  {
    id: '75154798',
    name: 'Jesús Nicolas Rojas Licas',
    role: 'Acusado',
    status: 'Activo',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    timeline: ""
  }
];

// --- DATOS DE DOCUMENTOS ---
export const ALL_DOCUMENTS: DocumentData[] = [
  // Categoría: Pruebas
  {
    id: 'doc-pru-001',
    title: 'Informe Pericial Balístico',
    src: '/documentos/pruebas/prueba_1(Acta de hallazgo).pdf',
    date: '15 MAY 2025',
    description: 'Análisis de las muestras balísticas recogidas en la escena.',
    category: 'Pruebas'
  },
  {
    id: 'doc-pru-002',
    title: 'Transcripción de Testimonio',
    src: '/documentos/pruebas/prueba_2(Informe de inspección criminal N° 220-2020-IC).pdf',
    date: '18 MAY 2025',
    description: 'Declaración jurada del testigo presencial clave.',
    category: 'Pruebas'
  },
  // Categoría: Acusación Fiscal
  {
    id: 'doc-acu-001',
    title: 'Disposición de Formalización',
    src: '/documentos/acusacion_fiscal/acusación_fiscal.pdf',
    date: '01 JUN 2025',
    description: 'Documento fiscal que inicia la investigación preparatoria.',
    category: 'Acusación Fiscal'
  },
  // Categoría: Sentencia
  {
    id: 'doc-sen-001',
    title: 'Sentencia de Primera Instancia',
    src: '/documentos/sentencia/SENTENCIA- 057-2020-6-PE.pdf',
    date: '20 DIC 2025',
    description: 'Veredicto y resolución del juez tras el juicio oral.',
    category: 'Sentencia'
  },
  // Categoría: Material de Apoyo
  {
    id: 'doc-apo-001',
    title: 'Jurisprudencia Aplicable',
    src: '/documentos/material_de_apoyo/boletín_informátivo.pdf',
    date: '10 ENE 2025',
    description: 'Recopilación de sentencias previas y doctrina legal.',
    category: 'Material de Apoyo'
  },
];