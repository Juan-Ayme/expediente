"use client"

import { useState, useEffect, FC } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, FileText, Fingerprint, GraduationCap, Heart, Inbox, MapPin, Download, X, LucideProps } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INVOLUCRADOS, EVIDENCIAS, TIMELINE_EVENTS, Personaje, Evidencia, EventoTimeline } from '@/lib/expediente-data';

// --- Sub-componentes Reutilizables ---

const Icon = ({ name, className }: { name: string; className?: string }) => {
    const iconMap: { [key: string]: FC<LucideProps> } = { Calendar, Clock, FileText, Fingerprint, GraduationCap, Heart, Inbox, MapPin, Download, X };
    const LucideIcon = iconMap[name] || FileText;
    return <LucideIcon className={className} />;
};

function EmptyState({ message }: { message: string }) {
    return (
        <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg mt-6">
            <Inbox className="mx-auto h-12 w-12" />
            <p className="mt-4 text-sm">{message}</p>
        </div>
    );
}

function TimelineCard({ evento }: { evento: EventoTimeline }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-md">
                <CardContent className="p-5 flex items-start gap-4">
                    <div className="p-2 bg-muted rounded-full mt-1"><Icon name={evento.iconName} className="h-5 w-5 text-primary" /></div>
                    <div>
                        <h3 className="font-semibold text-foreground">{evento.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{evento.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">{new Date(evento.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function DocumentCard({ doc, onSelect }: { doc: Evidencia, onSelect: () => void }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="hover:bg-muted/50 transition-colors shadow-md">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-muted rounded-lg"><Icon name={doc.iconName} className="h-6 w-6 text-primary" /></div>
                    <div className="flex-grow">
                        <h3 className="font-medium text-foreground">{doc.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{doc.category}</span>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={onSelect}>Ver</Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}

// --- MODAL DE PDF CORREGIDO ---
// Se renombra la prop de 'document' a 'doc' para evitar el conflicto.
function PdfModal({ doc, onClose }: { doc: Evidencia, onClose: () => void }) {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);

        // Ahora 'document.body' no tiene conflicto y se refiere al objeto del navegador.
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
                <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
                    <h3 className="font-semibold text-foreground truncate pr-4">{doc.title}</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-muted flex-shrink-0"><X size={24} /></button>
                </header>
                <div className="flex-grow bg-muted/40"><iframe src={doc.src} className="w-full h-full border-none" title={doc.title} /></div>
                <footer className="p-3 bg-background border-t border-border flex justify-end"><a href={doc.src} download><Button><Download className="mr-2 h-4 w-4" />Descargar</Button></a></footer>
            </motion.div>
        </motion.div>
    );
}

// --- Componente Principal de la Página de Perfil ---
export default function PersonajeClient({ params }: { params: { id: string } }) {
  const [personaje, setPersonaje] = useState<Personaje | undefined>();
  const [eventosRelacionados, setEventosRelacionados] = useState<EventoTimeline[]>([]);
  const [documentosRelacionados, setDocumentosRelacionados] = useState<Evidencia[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<Evidencia | null>(null);

  useEffect(() => {
    const foundPersonaje = INVOLUCRADOS.find(p => p.id === params.id);
    if (foundPersonaje) {
        setPersonaje(foundPersonaje);
        setEventosRelacionados(TIMELINE_EVENTS.filter(e => e.relatedPeopleIds.includes(params.id)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        setDocumentosRelacionados(EVIDENCIAS.filter(e => e.relatedPeopleIds.includes(params.id)));
    }
  }, [params.id]);

  if (!personaje) {
    return <div className="flex items-center justify-center h-screen text-muted-foreground">Cargando perfil...</div>;
  }

  const roleStyles = { Víctima: 'text-blue-500', Acusado: 'text-red-500', Testigo: 'text-yellow-500' };

  return (
    <>
      <div className="min-h-screen bg-background/95 pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <header className="flex items-center mb-8">
            <Link href="/expediente-interactivo" className="mr-4">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Ficha de Involucrado</h1>
          </header>
          
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:sticky top-24 self-start">
                <Card className="shadow-xl">
                    <CardContent className="p-6">
                        <div className="aspect-[4/5] relative overflow-hidden rounded-lg mb-6"><img src={personaje.image} alt={personaje.name} className="w-full h-full object-cover" /></div>
                        <h2 className="text-3xl font-bold">{personaje.name}</h2>
                        <span className={`text-lg font-semibold ${roleStyles[personaje.role]}`}>{personaje.role}</span>
                        {personaje.details && (
                          <div className="pt-6 mt-6 border-t">
                              <dl className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 text-sm">
                                  <dt className="font-semibold text-muted-foreground flex items-center gap-2"><Fingerprint size={16}/>DNI:</dt>
                                  <dd className="text-foreground font-medium">{personaje.details.dni}</dd>
                                  <dt className="font-semibold text-muted-foreground flex items-center gap-2"><Calendar size={16}/>Nacimiento:</dt>
                                  <dd className="text-foreground font-medium">{personaje.details.dateOfBirth}</dd>
                                  <dt className="font-semibold text-muted-foreground flex items-center gap-2"><Heart size={16}/>Estado Civil:</dt>
                                  <dd className="text-foreground font-medium">{personaje.details.maritalStatus}</dd>
                                  <dt className="font-semibold text-muted-foreground flex items-center gap-2"><GraduationCap size={16}/>Instrucción:</dt>
                                  <dd className="text-foreground font-medium">{personaje.details.education}</dd>
                                  <dt className="font-semibold text-muted-foreground flex items-center gap-2"><MapPin size={16}/>Domicilio:</dt>
                                  <dd className="text-foreground font-medium">{personaje.details.location}</dd>
                              </dl>
                          </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timeline">Línea de Tiempo ({eventosRelacionados.length})</TabsTrigger>
                  <TabsTrigger value="documents">Evidencias ({documentosRelacionados.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="timeline" className="mt-6 space-y-4">{eventosRelacionados.length > 0 ? eventosRelacionados.map(e => <TimelineCard key={e.id} evento={e} />) : <EmptyState message="No hay eventos en la línea de tiempo para esta persona." />}</TabsContent>
                <TabsContent value="documents" className="mt-6 space-y-4">{documentosRelacionados.length > 0 ? documentosRelacionados.map(d => <DocumentCard key={d.id} doc={d} onSelect={() => setSelectedPdf(d)} />) : <EmptyState message="No hay evidencias directamente relacionadas." />}</TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>

      <AnimatePresence>
          {/* Aquí se actualiza la prop a 'doc' */}
          {selectedPdf && <PdfModal doc={selectedPdf} onClose={() => setSelectedPdf(null)} />}
      </AnimatePresence>
    </>
  )
}