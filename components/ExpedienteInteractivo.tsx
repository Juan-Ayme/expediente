"use client"

import { motion } from 'framer-motion';
import { FC } from 'react';
import { X, User, Users, Calendar, FileText, Microscope, Dna, Siren, FileSearch, MessageSquare, Camera, Building, FileHeart, LucideProps } from 'lucide-react';
import { INVOLUCRADOS, EVIDENCIAS, TIMELINE_EVENTS, Personaje, Evidencia, EventoTimeline } from '@/lib/expediente-data';
import { Button } from '@/components/ui/button';

// --- PASO 1: CREAR UN MAPA DE ÍCONOS ---
// Este objeto traduce el nombre del ícono (texto) al componente real de lucide-react.
const iconMap: { [key: string]: FC<LucideProps> } = {
  Dna, FileText, FileSearch, Microscope, MessageSquare, Camera, Building, Siren, FileHeart, Calendar,
};

// Componente auxiliar para renderizar el ícono correcto
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = iconMap[name];
  // Si el ícono existe en el mapa, lo renderiza. Si no, muestra uno por defecto.
  return LucideIcon ? <LucideIcon className={className} /> : <FileText className={className} />;
};


// --- Props del Componente Principal ---
interface ExpedienteInteractivoProps {
  onClose: () => void;
}

// --- Sub-componentes para el Muro ---
const InvolucradoCard = ({ personaje }: { personaje: Personaje }) => (
  <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 text-center hover:bg-primary/10 transition-colors duration-300">
    <img src={personaje.image} alt={personaje.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-border" />
    <h3 className="mt-3 font-bold text-foreground">{personaje.name}</h3>
    <p className={`text-sm font-semibold ${personaje.role === 'Víctima' ? 'text-blue-400' : 'text-red-400'}`}>{personaje.role}</p>
  </div>
);

const TimelineEventCard = ({ evento }: { evento: EventoTimeline }) => (
  <div className="flex items-start gap-4 group">
    <div className="relative">
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center border-4 border-background group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        {/* Usamos el componente Icon auxiliar */}
        <Icon name={evento.iconName} className="w-6 h-6" />
      </div>
      <div className="absolute top-12 left-1/2 w-0.5 h-full bg-border -translate-x-1/2 group-last:hidden" />
    </div>
    <div className="pt-2">
      <p className="text-xs text-muted-foreground">{new Date(evento.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <h4 className="font-bold text-foreground">{evento.title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{evento.description}</p>
    </div>
  </div>
);

const EvidenciaCard = ({ evidencia }: { evidencia: Evidencia }) => (
    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-3 flex items-center gap-3 hover:bg-primary/10 transition-colors duration-300 cursor-pointer">
        <div className="text-primary flex-shrink-0">
            {/* Usamos el componente Icon auxiliar */}
            <Icon name={evidencia.iconName} className="w-6 h-6" />
        </div>
        <div>
            <h5 className="font-semibold text-sm text-foreground leading-tight">{evidencia.shortTitle || evidencia.title}</h5>
        </div>
    </div>
);


// --- Componente Principal del Muro de Investigación ---
export default function ExpedienteInteractivo({ onClose }: ExpedienteInteractivoProps) {
    
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 text-foreground"
    >
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 border-b border-border/50">
        <h1 className="text-xl font-bold tracking-wider uppercase">Muro de Investigación: Caso 057-2020</h1>
        <Button variant="ghost" size="icon" onClick={onClose}><X /></Button>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1.5fr] h-screen pt-20 gap-8 px-8">
        <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide">
          <h2 className="font-bold text-lg text-primary uppercase">Involucrados</h2>
          {INVOLUCRADOS.map(p => <InvolucradoCard key={p.id} personaje={p} />)}
        </div>
        <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide border-x border-border/50 px-8">
            <h2 className="font-bold text-lg text-primary uppercase sticky top-0 bg-background/80 py-2 -mt-2">Línea de Tiempo</h2>
            <div className="flex flex-col gap-8">
                {TIMELINE_EVENTS.map(e => <TimelineEventCard key={e.id} evento={e} />)}
            </div>
        </div>
        <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide">
          <h2 className="font-bold text-lg text-primary uppercase">Pruebas y Evidencias</h2>
          <div className="grid grid-cols-2 gap-3">
            {EVIDENCIAS.filter(e => e.category === 'Pruebas').map(e => <EvidenciaCard key={e.id} evidencia={e} />)}
          </div>
          <h2 className="font-bold text-lg text-primary uppercase mt-4">Documentos Judiciales</h2>
           <div className="grid grid-cols-1 gap-3">
            {EVIDENCIAS.filter(e => e.category !== 'Pruebas').map(e => <EvidenciaCard key={e.id} evidencia={e} />)}
          </div>
        </div>
      </main>
    </motion.div>
  );
}