"use client"

import { useState, useEffect, useRef, useCallback, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '@/components/SectionHeader';
import { FileText, Download, X, LucideProps, Dna, Siren, FileSearch, UserCheck, Microscope, MessageSquare, Camera, Building, FileHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EVIDENCIAS, INVOLUCRADOS, Evidencia } from '@/lib/expediente-data'; 

// --- Hook para detectar si el dispositivo es móvil ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    // Verificar en el cliente después de que el componente se monte
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  return isMobile;
};

// --- Componente auxiliar para renderizar el ícono correcto ---
const Icon = ({ name, className }: { name: string; className?: string }) => {
    const iconMap: { [key: string]: FC<LucideProps> } = { Dna, FileText, FileSearch, UserCheck, Microscope, MessageSquare, Camera, Building, Siren, FileHeart };
    const LucideIcon = iconMap[name] || FileText;
    return <LucideIcon className={className} />;
};

// --- Componente para el Modal de PDF ---
function PdfModal({ doc, onClose }: { doc: Evidencia, onClose: () => void }) {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        
        if (document.body) {
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            window.removeEventListener('keydown', handleEsc);
            if (document.body) {
                document.body.style.overflow = 'auto';
            }
        };
    }, [onClose]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4">
            <motion.div initial={{ scale: 0.9, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: -20 }} onClick={(e) => e.stopPropagation()} className="relative w-full h-full max-w-5xl bg-background rounded-lg shadow-2xl flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0"><h3 className="font-semibold text-foreground truncate pr-4">{doc.title}</h3><button onClick={onClose} className="p-2 rounded-full hover:bg-muted flex-shrink-0"><X size={24} /></button></header>
                <div className="flex-grow bg-muted/40"><iframe src={doc.src} className="w-full h-full border-none" title={doc.title} /></div>
                <footer className="p-3 bg-background border-t border-border flex justify-end"><a href={doc.src} download><Button><Download className="mr-2 h-4 w-4" />Descargar</Button></a></footer>
            </motion.div>
        </motion.div>
    );
}

// --- Componente para la Tarjeta de Documento ---
function DocumentCard({ document, onSelect }: { document: Evidencia, onSelect: () => void }) {
  const isMobile = useIsMobile();
  const primaryPerson = INVOLUCRADOS.find(p => document.relatedPeopleIds.includes(p.id));

  const cardContent = (
    <Card className="overflow-hidden bg-card/90 backdrop-blur-sm border-border/50 transition-all duration-300 h-full hover:border-primary/50 hover:shadow-xl flex flex-col group">
      <CardContent className="p-4 flex flex-col text-center flex-grow">
        <div className="relative w-20 h-20 mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="relative p-2 bg-primary/10 rounded-full"><Icon name={document.iconName} className="h-16 w-16 text-primary" /></div>
        </div>
        <h3 className="font-bold text-base text-foreground mt-4 mb-2 leading-tight flex-grow">{document.title}</h3>
        {primaryPerson && (
             <div className="flex items-center justify-center gap-2 mt-2 border-t border-border/50 pt-3">
                <img src={primaryPerson.image} alt={primaryPerson.name} className="w-6 h-6 rounded-full object-cover"/>
                <span className="text-xs text-muted-foreground font-medium">{primaryPerson.name}</span>
            </div>
        )}
      </CardContent>
    </Card>
  );

  if (isMobile) {
    return (
      <a href={document.src} target="_blank" rel="noopener noreferrer" className="h-full block">
        <motion.div layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
          {cardContent}
        </motion.div>
      </a>
    );
  }

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }} onClick={onSelect} className="cursor-pointer h-full">
      {cardContent}
    </motion.div>
  );
}

// --- Componente Principal de la Sección de Documentos ---
export default function DocumentosSection() {
  const [selectedPdf, setSelectedPdf] = useState<Evidencia | null>(null);
  
  const categories = Array.from(new Set(EVIDENCIAS.map(doc => doc.category)));

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkFades = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      const isScrollable = el.scrollWidth > el.clientWidth;
      setShowLeftFade(el.scrollLeft > 5);
      setShowRightFade(isScrollable && el.scrollWidth - el.scrollLeft > el.clientWidth + 5);
    }
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      checkFades();
      window.addEventListener('resize', checkFades);
      const observer = new MutationObserver(checkFades);
      observer.observe(scrollElement, { childList: true, subtree: true });
      return () => {
        window.removeEventListener('resize', checkFades);
        observer.disconnect();
      }
    }
  }, [categories, checkFades]);

  return (
    <section>
      <SectionHeader title="DOCUMENTACIÓN DEL EXPEDIENTE" href="/documentos" />
      <Tabs defaultValue={categories[0]} className="w-full">
        <div className="relative">
          <TabsList ref={scrollRef} onScroll={checkFades} className="w-full h-auto flex justify-start overflow-x-auto scrollbar-hide p-1 gap-2  md:justify-center md:gap-4">
            {categories.map(category => (<TabsTrigger key={category} value={category} className="flex-shrink-0 whitespace-nowrap px-4 py-2">{category}</TabsTrigger>))}
          </TabsList>
          <div className={`absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden transition-opacity duration-300 ${showLeftFade ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {EVIDENCIAS.filter(doc => doc.category === category).map(doc => (
                <DocumentCard key={doc.id} document={doc} onSelect={() => setSelectedPdf(doc)} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <AnimatePresence>
        {selectedPdf && <PdfModal doc={selectedPdf} onClose={() => setSelectedPdf(null)} />}
      </AnimatePresence>
    </section>
  )
}