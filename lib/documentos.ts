// lib/documentos.ts (o similar)

// Añadimos la categoría a nuestro tipo de Documento
export type DocumentData = { 
  id: string;
  title: string; 
  src: string; 
  date: string; 
  description: string;
  category: 'Pruebas' | 'Acusación Fiscal' | 'Sentencia' | 'Material de Apoyo'; 
};

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