import { Metadata } from 'next'
import PersonajeClient from './PersonajeClient'
import { INVOLUCRADOS } from '@/lib/expediente-data' // 1. Importamos los datos

// --- Generación Automática de Páginas ---
// Esta función lee la lista de involucrados y le dice a Next.js
// que cree una página para cada uno durante la compilación.
export async function generateStaticParams() {
  return INVOLUCRADOS.map(personaje => ({
    id: personaje.id,
  }));
}

// --- Generación Dinámica de Metadatos (Título y Descripción) ---
// Esta función se ejecuta en el servidor para cada página de personaje
// y crea un título y descripción únicos.
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const personaje = INVOLUCRADOS.find(p => p.id === params.id);

  if (!personaje) {
    return {
      title: 'Personaje no encontrado | Sistema de Expedientes',
      description: 'No se pudo encontrar la información para este ID.',
    }
  }

  return {
    title: `Perfil de ${personaje.name} | Expediente 057-2020`,
    description: `Ficha de investigación detallada para ${personaje.name}, ${personaje.role.toLowerCase()} en el caso 057-2020.`,
  }
}

// --- Componente de la Página (sin cambios) ---
// Este sigue siendo un componente de servidor que renderiza el componente de cliente.
export default function PersonajePage({ params }: { params: { id: string } }) {
  // El componente de cliente se encargará de toda la interactividad y de mostrar los datos.
  return <PersonajeClient params={params} />
}