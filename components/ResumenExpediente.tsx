"use client";

import { useState, useEffect, useRef, Fragment, FC } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, FileText, Download, LucideProps } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
// 1. Asumo que estos imports son correctos para tu proyecto
import { INVOLUCRADOS, EVIDENCIAS, Personaje, Evidencia } from '@/lib/expediente-data';

// --- TIPO DE DATOS MODIFICADO ---
// Ahora VideoData puede tener un src (para videos locales) O un youtubeId
type VideoData = {
  title: string;
  poster: string;
  src?: string; // Para archivos .mp4 locales
  youtubeId?: string; // Para videos de YouTube
};

// --- DATOS DE EJEMPLO CON YOUTUBE ---
// Aquí puedes mezclar videos de diferentes fuentes
const videosDeResumen: VideoData[] = [
  {
    title: 'Documental desde YouTube',
    poster: '/videos/thumbnails/video1.png', // Aún necesitas un póster local
    youtubeId: '5qEg7CxNL6w' // ID del video de YouTube que funcionó
  },
    {
    title: 'Prueba de chat',
    src: '/videos/video1.mp4',
    poster: '/videos/thumbnails/video1.png'
  },
  {
    title: 'Ni una más: el video que deberías ver',
    src: '/videos/video2.mp4',
    poster: '/videos/thumbnails/video2.png'
  },
  {
    title: 'Prueba de chat: el caso de la fiesta de año nuevo',
    src: '/videos/video3.mp4',
    poster: '/videos/thumbnails/video3.png'
  },
  {
    title: 'Fiesta de año nuevo: la recreación',
    src: '/videos/video4.mp4',
    poster: '/videos/thumbnails/video4.png'
  },
];

// Selección de datos reales para el resumen
const involucradosDeResumen = INVOLUCRADOS.slice(0, 4);
const documentosDeResumen = EVIDENCIAS.filter(doc => ['d1', 'd2'].includes(doc.id));

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile(); window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  return isMobile;
};

// --- COMPONENTE PRINCIPAL (sin cambios) ---
export default function ResumenExpediente() {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<Evidencia | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (selectedVideo || selectedPdf) {
      if (document.body) document.body.style.overflow = 'hidden';
    } else {
      if (document.body) document.body.style.overflow = 'auto';
    }
  }, [selectedVideo, selectedPdf]);

  return (
    <Fragment>
      <section className="py-12">
        <SectionHeader title="RESUMEN DEL EXPEDIENTE" href="/expediente-interactivo" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videosDeResumen.map((video, index) => (
            <VideoCard key={video.title + index} video={video} onSelect={() => setSelectedVideo(video)} delay={index * 0.05} />
          ))}

          {involucradosDeResumen.map((person, index) => (
            <PersonCard key={person.id} {...person} delay={(videosDeResumen.length + index) * 0.05} />
          ))}

          {documentosDeResumen.map((doc, index) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onSelect={() => !isMobile && setSelectedPdf(doc)}
              isMobile={isMobile}
              delay={(videosDeResumen.length + involucradosDeResumen.length + index) * 0.05}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
        {selectedPdf && <PdfModal doc={selectedPdf} onClose={() => setSelectedPdf(null)} />}
      </AnimatePresence>
    </Fragment>
  )
}

// --- COMPONENTES DE TARJETAS (sin cambios) ---
function VideoCard({ video, onSelect, delay = 0 }: { video: VideoData, onSelect: () => void, delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }} onClick={onSelect} className="cursor-pointer group">
      <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-muted transition-all duration-300 hover:border-primary/50 hover:shadow-lg w-full">
        <CardContent className="p-0">
          <div className="aspect-video relative overflow-hidden">
            <img src={video.poster} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center"><div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/70"><Play className="h-7 w-7 md:h-8 md:w-8 text-white" fill="white" /></div></div>
            <div className="absolute bottom-0 left-0 right-0 p-4"><h3 className="font-bold text-base text-white truncate transition-colors">{video.title}</h3></div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
function PersonCard({ id, name, role, image, delay = 0 }: Personaje & { delay?: number }) {
  const roleStyles = { Víctima: 'text-blue-500', Acusado: 'text-red-500', Testigo: 'text-yellow-400' };
  return (
    <Link href={`/personajes/${id}`} className="block h-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }} className="h-full group">
        <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-muted hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-bold leading-tight">{name}</h3>
              <p className={`text-sm font-semibold ${roleStyles[role] || 'text-gray-300'}`}>{role}</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
function DocumentCard({ document, onSelect, isMobile, delay = 0 }: { document: Evidencia, onSelect: () => void, isMobile: boolean, delay?: number }) {
  const cardContent = (
    <Card className="overflow-hidden bg-card/90 backdrop-blur-sm border-border/50 transition-all duration-300 h-full hover:border-primary/50 hover:shadow-xl flex flex-col group">
      <CardContent className="p-4 flex flex-col text-center flex-grow items-center justify-center">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
          <div className="relative p-2 bg-primary/10 rounded-full"><FileText className="h-16 w-16 text-primary" /></div>
        </div>
        <h3 className="font-bold text-base text-foreground mt-4 mb-2 leading-tight flex-grow">{document.title}</h3>
      </CardContent>
    </Card>
  );
  if (isMobile) {
    return <a href={document.src} target="_blank" rel="noopener noreferrer" className="h-full block">{cardContent}</a>;
  }
return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="cursor-pointer group h-full"
      onClick={onSelect}
    >
      {cardContent}
    </motion.div>
  );
}

// --- COMPONENTE VideoModal MODIFICADO ---
function VideoModal({ video, onClose }: { video: VideoData, onClose: () => void }) {
  // Lógica para cerrar con la tecla 'Escape', se aplica a ambos tipos de video
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Si el video tiene un `youtubeId`, renderiza el iframe de YouTube.
  if (video.youtubeId) {
    const youtubeSrc = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=1&rel=0&controls=1&loop=1&playlist=${video.youtubeId}`;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className="relative overflow-hidden rounded-lg shadow-2xl w-full max-w-4xl aspect-video bg-black">
          <iframe
            src={youtubeSrc}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-none"
          ></iframe>
          <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full text-white bg-black/50 hover:bg-white/30 z-10">
            <X size={20} />
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // --- Si no tiene `youtubeId`, renderiza el reproductor de video local personalizado. ---
  // (Esta parte es para los videos locales y no ha cambiado)
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (isPlaying && showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showControls]);
  
  const formatTime = (time: number) => new Date(time * 1000).toISOString().substr(14, 5);
  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) videoRef.current.currentTime = Number(e.target.value);
  };
  const handleVideoClick = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4">
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className="relative overflow-hidden rounded-none sm:rounded-lg shadow-2xl w-full h-full bg-black">
        <video
          ref={videoRef}
          src={video.src}
          autoPlay
          playsInline
          controls={false}
          muted={isMuted}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
          onEnded={() => setIsPlaying(false)}
          onClick={handleVideoClick}
          className="w-full h-full object-contain"
        />
        <AnimatePresence>
          {showControls && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <header className="flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-auto">
                <h3 className="font-semibold text-white">{video.title}</h3>
                <button onClick={onClose} className="p-2 rounded-full text-white bg-black/30 hover:bg-white/20">
                  <X size={20} />
                </button>
              </header>
              {!isPlaying && (
                <div className="flex-grow flex items-center justify-center pointer-events-auto">
                  <button onClick={togglePlayPause} className="p-5 rounded-full bg-black/50 hover:bg-primary transition-colors">
                    <Play size={32} fill="white" className="text-white" />
                  </button>
                </div>
              )}
              <footer className="p-4 space-y-3 bg-gradient-to-t from-black/60 to-transparent pointer-events-auto">
                <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer range-sm accent-primary" />
                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlayPause}>{isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}</button>
                    <button onClick={() => setIsMuted(!isMuted)}>{isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
                    <span className="font-mono text-xs">{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                  <button onClick={() => videoRef.current?.requestFullscreen()}><Maximize2 size={20} /></button>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// --- COMPONENTE PdfModal (sin cambios) ---
function PdfModal({ doc, onClose }: { doc: Evidencia; onClose: () => void; }) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    if (document.body) document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      if (document.body) document.body.style.overflow = 'auto';
    };
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