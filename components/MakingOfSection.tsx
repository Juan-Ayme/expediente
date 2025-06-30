"use client"

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { MAKING_OF_ITEMS, MakingOfItem } from '@/lib/makingof-data';

// --- Visor de Imágenes a Pantalla Completa (Lightbox) ---
function Lightbox({ item, onClose, onPrev, onNext }: { item: MakingOfItem, onClose: () => void, onPrev: () => void, onNext: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Controles Principales */}
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"><X size={32} /></button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-colors"><ArrowLeft size={24} /></button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-colors"><ArrowRight size={24} /></button>

      <motion.div
        layoutId={`card-${item.id}`}
        onClick={(e) => e.stopPropagation()}
        className="w-full h-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
            <motion.img
              key={item.src}
              src={item.src}
              alt={`Detrás de cámaras ${item.id}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              initial={{ opacity: 0.5, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.5, x: -50 }}
              transition={{ duration: 0.3 }}
            />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}


// --- Componente Principal de la Galería Viva ---
export default function MakingOfSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [spotlightId, setSpotlightId] = useState(1);

  const selectedItem = selectedId !== null ? MAKING_OF_ITEMS.find(item => item.id === selectedId) : null;

  // Efecto para cambiar la imagen destacada
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotlightId(prevId => (prevId % MAKING_OF_ITEMS.length) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  // --- LÓGICA CORREGIDA PARA LOS BOTONES ---
  const handleNext = useCallback(() => {
    if (selectedId === null) return;
    const currentIndex = MAKING_OF_ITEMS.findIndex(item => item.id === selectedId);
    // El operador módulo (%) asegura que el ciclo sea infinito
    const nextIndex = (currentIndex + 1) % MAKING_OF_ITEMS.length;
    setSelectedId(MAKING_OF_ITEMS[nextIndex].id);
  }, [selectedId]);

  const handlePrev = useCallback(() => {
    if (selectedId === null) return;
    const currentIndex = MAKING_OF_ITEMS.findIndex(item => item.id === selectedId);
    // Lógica para que el ciclo sea infinito hacia atrás
    const prevIndex = (currentIndex - 1 + MAKING_OF_ITEMS.length) % MAKING_OF_ITEMS.length;
    setSelectedId(MAKING_OF_ITEMS[prevIndex].id);
  }, [selectedId]);
  // --- FIN DE LA CORRECCIÓN ---

  return (
    <section>
      <SectionHeader title="LA CONSTRUCCIÓN DEL CASO" href="#" />
      <p className="text-center text-muted-foreground max-w-2xl mx-auto -mt-8 mb-12">
        Un vistazo exclusivo al proceso de análisis, diseño y desarrollo que dio vida a este expediente interactivo. Cada pieza cuenta una parte de la historia.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[100px] gap-4 group">
        {MAKING_OF_ITEMS.map(item => {
          const isSpotlight = item.id === spotlightId;
          return (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className={`overflow-hidden rounded-lg cursor-pointer relative transition-all duration-700 ease-in-out ${isSpotlight ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'}`}
              whileHover={{ scale: 1.02, zIndex: 10 }}
            >
              <motion.img 
                src={item.src} 
                alt={`Imagen de la galería ${item.id}`} 
                className="w-full h-full object-cover"
                initial={{ scale: 1.2, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            item={selectedItem}
            onClose={() => setSelectedId(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </section>
  )
}