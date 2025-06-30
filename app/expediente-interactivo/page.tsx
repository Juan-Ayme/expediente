"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { FC, useState, useCallback, useEffect, useRef, RefObject } from 'react';
import Link from 'next/link';
import { X, Calendar, FileText, Microscope, Dna, Siren, FileSearch, MessageSquare, Camera, Building, FileHeart, UserCheck, LucideProps, ArrowLeft, Download, Users, Clock, GitBranch, Search as Lupa, Inbox } from 'lucide-react';
import { INVOLUCRADOS, EVIDENCIAS, TIMELINE_EVENTS, CONNECTIONS, Personaje, Evidencia, EventoTimeline } from '@/lib/expediente-data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Xarrow, { Xwrapper, useXarrow } from 'react-xarrows';

// --- Componente auxiliar para renderizar el ícono correcto ---
const Icon = ({ name, className }: { name: string; className?: string }) => {
    const iconMap: { [key: string]: FC<LucideProps> } = { Dna, FileText, FileSearch, UserCheck, Microscope, MessageSquare, Camera, Building, Siren, FileHeart, Calendar, Clock, Users };
    const LucideIcon = iconMap[name] || FileText;
    return <LucideIcon className={className} />;
};

// --- Sub-componentes Visuales para el Muro ---

const InvolucradoCard = ({ personaje, onSelect, isActive }: { personaje: Personaje; onSelect: (id: string) => void; isActive: boolean; }) => {
    const roleStyles = { Víctima: 'text-blue-400', Acusado: 'text-red-400', Testigo: 'text-yellow-400' };
    return (
        <motion.div
            id={personaje.id}
            layout
            whileHover={{ scale: 1.03 }}
            onClick={() => onSelect(personaje.id)}
            className={`relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-lg p-3 text-center cursor-pointer transition-colors duration-300 shadow-lg hover:shadow-primary/20 ${isActive ? 'border-primary ring-2 ring-primary/50' : 'border-slate-700/50'}`}
        >
            <Link href={`/personajes/${personaje.id}`} passHref legacyBehavior>
                <motion.a
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 z-10 p-2 bg-slate-700/50 rounded-full text-gray-300 hover:bg-primary hover:text-white transition-all"
                    aria-label={`Ver perfil de ${personaje.name}`}
                >
                    <Lupa size={16} />
                </motion.a>
            </Link>
            <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mt-2">
                <img src={personaje.image} alt={personaje.name} className={`w-full h-full rounded-full object-cover border-4 transition-all duration-300 ${isActive ? 'border-primary' : 'border-slate-600'}`} />
                {isActive && <div className="absolute inset-0 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-slate-900 animate-pulse" />}
            </div>
            <h3 className="mt-4 font-bold text-gray-100 text-base md:text-lg">{personaje.name}</h3>
            <p className={`text-sm font-semibold ${roleStyles[personaje.role]}`}>{personaje.role}</p>
        </motion.div>
    );
};

const TimelineEventCard = ({ evento }: { evento: EventoTimeline; }) => (
    <motion.div id={evento.id} layout className="flex items-start gap-4">
        <div className="relative pt-1.5 flex flex-col items-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center border-4 border-slate-900 ring-4 ring-slate-700/50">
                <Icon name={evento.iconName} className="w-6 h-6" />
            </div>
            <div className="absolute top-14 left-1/2 w-0.5 h-full bg-slate-700 -translate-x-1/2 group-last:hidden" />
        </div>
        <div className="pt-2 flex-1">
            <div className="flex justify-between items-baseline flex-wrap">
                <h4 className="font-semibold text-gray-100 text-base">{evento.title}</h4>
                <p className="text-xs text-slate-400 font-mono whitespace-nowrap">{new Date(evento.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>
            <p className="text-sm text-slate-400 mt-1 max-w-prose">{evento.description}</p>
        </div>
    </motion.div>
);

const EvidenciaCard = ({ evidencia, onSelect }: { evidencia: Evidencia; onSelect: () => void; }) => (
    <motion.div id={evidencia.id} layout onClick={onSelect} className="bg-slate-800/50 backdrop-blur-sm border-2 rounded-lg p-3 flex items-center gap-3 transition-all duration-300 w-full text-left cursor-pointer shadow-md hover:shadow-lg hover:border-primary/50 border-slate-700/50">
        <div className="text-primary flex-shrink-0"><Icon name={evidencia.iconName} className="w-5 h-5" /></div>
        <div><h5 className="font-semibold text-sm text-gray-100 leading-tight">{evidencia.shortTitle || evidencia.title}</h5></div>
    </motion.div>
);

const ConnectionLines = ({ selectedId, refs }: { selectedId: string | null, refs: RefObject<HTMLElement>[] }) => {
    const updateXarrow = useXarrow();
    useEffect(() => {
        const handleScroll = () => updateXarrow();
        const scrollableElements = refs.map(ref => ref.current).filter(Boolean);
        scrollableElements.forEach(el => el?.addEventListener('scroll', handleScroll));
        return () => scrollableElements.forEach(el => el?.removeEventListener('scroll', handleScroll));
    }, [refs, updateXarrow]);

    if (!selectedId) return null;
    const relatedConnections = CONNECTIONS.filter(conn => conn.from === selectedId || conn.to === selectedId);
    return (<>{relatedConnections.map((conn, index) => (<Xarrow key={`${conn.from}-${conn.to}-${index}`} start={conn.from} end={conn.to} path="smooth" strokeWidth={2} color="hsl(var(--primary) / 0.6)" headSize={5} dashness={{ animation: 1.5 }} showHead={true} curveness={0.8} zIndex={10} />))}</>);
}

function PdfModal({ doc, onClose }: { doc: Evidencia, onClose: () => void }) {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handleEsc); document.body.style.overflow = 'auto'; };
    }, [onClose]);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className="relative w-full h-full max-w-5xl bg-background rounded-lg shadow-2xl flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0"><h3 className="font-semibold text-foreground truncate pr-4">{doc.title}</h3><button onClick={onClose} className="p-2 rounded-full hover:bg-muted flex-shrink-0"><X size={24} /></button></header>
                <div className="flex-grow bg-muted/40"><iframe src={doc.src} className="w-full h-full border-none" title={doc.title} /></div>
                <footer className="p-3 bg-background border-t border-border flex justify-end"><a href={doc.src} download><Button><Download className="mr-2 h-4 w-4" />Descargar</Button></a></footer>
            </motion.div>
        </motion.div>
    );
}

// --- Componente Principal de la Página ---
export default function ExpedienteInteractivoPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedPdf, setSelectedPdf] = useState<Evidencia | null>(null);
    const [relatedIds, setRelatedIds] = useState<Set<string>>(new Set());
    
    const involucradosRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const evidenciasRef = useRef<HTMLDivElement>(null);

    const handleSelect = useCallback((id: string) => {
        setSelectedId(prevId => {
            const newId = prevId === id ? null : id;
            if (!newId) {
                setRelatedIds(new Set());
                return null;
            }
            const newRelatedIds = new Set<string>([newId]);
            CONNECTIONS.forEach(conn => {
                if (conn.from === newId) newRelatedIds.add(conn.to);
                if (conn.to === newId) newRelatedIds.add(conn.from);
            });
            setRelatedIds(newRelatedIds);
            return newId;
        });
    }, []);

    const isFaded = (id: string) => selectedId ? !relatedIds.has(id) : false;

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-slate-900 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] z-50 text-gray-200 overflow-hidden">
                <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-background/80 backdrop-blur-sm border-b border-border/50 z-30 h-16">
                    <h1 className="text-base md:text-xl font-bold tracking-wider uppercase text-foreground">Muro de Investigación: Caso 57-2020-6-PE</h1>
                    <div className="flex items-center gap-2">
                        <Button variant={selectedId ? "default" : "outline"} size="sm" onClick={() => handleSelect(INVOLUCRADOS[0].id)} className="hidden lg:flex"><GitBranch className="mr-2 h-4 w-4"/>Modo Conexión</Button>
                        <Link href="/"><Button variant="ghost" size="icon"><ArrowLeft className="text-foreground" /></Button></Link>
                    </div>
                </header>

                <Xwrapper>
                    {/* --- VISTA PARA PC: 3 COLUMNAS --- */}
                    <main className="hidden lg:grid lg:grid-cols-[300px_1fr_320px] h-full pt-16 gap-8 px-8">
                        <div ref={involucradosRef} className="flex flex-col gap-4 overflow-y-auto scrollbar-hide py-4">
                            <h2 className="font-bold text-lg text-primary uppercase sticky top-0 bg-slate-900/90 backdrop-blur-sm py-2 z-20">Involucrados</h2>
                            <div className="grid grid-cols-1 gap-4">{INVOLUCRADOS.map(p => <div key={p.id} className={`transition-opacity duration-500 ${isFaded(p.id) ? 'opacity-20' : 'opacity-100'}`}><InvolucradoCard personaje={p} onSelect={handleSelect} isActive={selectedId === p.id} /></div>)}</div>
                        </div>
                        <div ref={timelineRef} className="flex flex-col gap-8 overflow-y-auto scrollbar-hide border-x border-slate-700/50 px-8 py-4">
                            <h2 className="font-bold text-lg text-primary uppercase sticky top-0 bg-slate-900/90 backdrop-blur-sm py-2 z-20">Línea de Tiempo</h2>
                            {TIMELINE_EVENTS.map(e => <div key={e.id} className={`transition-opacity duration-500 ${isFaded(e.id) ? 'opacity-20' : 'opacity-100'}`}><TimelineEventCard evento={e} /></div>)}
                        </div>
                        <div ref={evidenciasRef} className="flex flex-col gap-4 overflow-y-auto scrollbar-hide py-4">
                            <h2 className="font-bold text-lg text-primary uppercase sticky top-0 bg-slate-900/90 backdrop-blur-sm py-2 z-20">Evidencias y Documentos</h2>
                            <h3 className="font-semibold text-md text-slate-300 -mb-2">Pruebas del Caso</h3>
                            <div className="grid grid-cols-1 gap-2">{EVIDENCIAS.filter(e => e.category === 'Pruebas').map(e => <div key={e.id} className={`transition-opacity duration-500 ${isFaded(e.id) ? 'opacity-20' : 'opacity-100'}`}><EvidenciaCard evidencia={e} onSelect={() => setSelectedPdf(e)} /></div>)}</div>
                            <h3 className="font-semibold text-md text-slate-300 -mb-2 mt-4">Archivos Judiciales</h3>
                            <div className="grid grid-cols-1 gap-2">{EVIDENCIAS.filter(e => e.category !== 'Pruebas').map(e => <div key={e.id} className={`transition-opacity duration-500 ${isFaded(e.id) ? 'opacity-20' : 'opacity-100'}`}><EvidenciaCard evidencia={e} onSelect={() => setSelectedPdf(e)} /></div>)}</div>
                        </div>
                    </main>

                    {/* --- VISTA PARA MÓVIL: PESTAÑAS --- */}
                    <main className="lg:hidden h-full pt-16 flex flex-col">
                        <Tabs defaultValue="timeline" className="w-full flex flex-col flex-grow overflow-hidden">
                            <div className="flex-grow overflow-y-auto scrollbar-hide p-4">
                                <TabsContent value="timeline"><h2 className="font-bold text-lg text-primary uppercase sticky top-0 bg-slate-900/80 backdrop-blur-sm py-2 mb-4 z-10">Línea de Tiempo</h2><div className="space-y-8">{TIMELINE_EVENTS.map(e => <div key={e.id} className={`transition-opacity duration-300 ${isFaded(e.id) ? 'opacity-30' : 'opacity-100'}`}><TimelineEventCard evento={e} /></div>)}</div></TabsContent>
                                <TabsContent value="involucrados"><h2 className="font-bold text-lg text-primary uppercase sticky top-0 bg-slate-900/80 backdrop-blur-sm py-2 mb-4 z-10">Involucrados</h2><div className="grid grid-cols-2 gap-4">{INVOLUCRADOS.map(p => <InvolucradoCard key={p.id} personaje={p} onSelect={handleSelect} isActive={selectedId === p.id} />)}</div></TabsContent>
                                <TabsContent value="evidencias"><h2 className="font-bold text-lg text-primary uppercase sticky top-0 bg-slate-900/80 backdrop-blur-sm py-2 mb-4 z-10">Evidencias</h2><div className="grid grid-cols-1 gap-3">{EVIDENCIAS.map(e => <div key={e.id} className={`transition-opacity duration-300 ${isFaded(e.id) ? 'opacity-30' : 'opacity-100'}`}><EvidenciaCard evidencia={e} onSelect={() => setSelectedPdf(e)} /></div>)}</div></TabsContent>
                            </div>
                            <TabsList className="grid w-full grid-cols-3 h-20 bg-background/90 backdrop-blur-sm border-t border-border/50 rounded-none mt-auto">
                                <TabsTrigger value="timeline" className="h-full flex-col gap-1 text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-colors"><Clock size={24} /><span>Línea de Tiempo</span></TabsTrigger>
                                <TabsTrigger value="involucrados" className="h-full flex-col gap-1 text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-colors"><Users size={24} /><span>Involucrados</span></TabsTrigger>
                                <TabsTrigger value="evidencias" className="h-full flex-col gap-1 text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-colors"><FileSearch size={24} /><span>Evidencias</span></TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </main>

                    <div className="hidden lg:block"><ConnectionLines selectedId={selectedId} refs={[involucradosRef, timelineRef, evidenciasRef]}/></div>
                </Xwrapper>
            </motion.div>

            <AnimatePresence>
                {selectedPdf && <PdfModal doc={selectedPdf} onClose={() => setSelectedPdf(null)} />}
            </AnimatePresence>
        </>
    );
}