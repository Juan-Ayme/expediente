"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Play, Clock, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from '@/lib/motion'

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)
  
  const videos = [
    {
      id: 1,
      title: 'Video Principal del Incidente',
      duration: '3:25',
      date: '03/06/2023',
      quality: '1080p',
      size: '125 MB',
      source: 'Cámara de Seguridad',
      thumbnail: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Grabación principal del incidente desde cámara de seguridad exterior',
      delay: 0
    },
    {
      id: 2,
      title: 'Interrogación - Anna García',
      duration: '15:42',
      date: '04/06/2023',
      quality: '720p',
      size: '89 MB',
      source: 'Sala de Interrogatorios',
      thumbnail: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Declaración completa del testigo principal',
      delay: 0.1
    },
    {
      id: 3,
      title: 'Reconstrucción de los Hechos',
      duration: '8:15',
      date: '05/06/2023',
      quality: '4K',
      size: '245 MB',
      source: 'Equipo Forense',
      thumbnail: 'https://images.pexels.com/photos/6544379/pexels-photo-6544379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Recreación digital de la secuencia de eventos',
      delay: 0.2
    },
    {
      id: 4,
      title: 'Cámara Interior - Ángulo 2',
      duration: '2:18',
      date: '03/06/2023',
      quality: '1080p',
      size: '67 MB',
      source: 'Cámara de Seguridad',
      thumbnail: 'https://images.pexels.com/photos/923681/pexels-photo-923681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Vista alternativa desde cámara interior del establecimiento',
      delay: 0.3
    },
    {
      id: 5,
      title: 'Entrevista con Testigo Secundario',
      duration: '12:33',
      date: '06/06/2023',
      quality: '720p',
      size: '78 MB',
      source: 'Oficina de Investigación',
      thumbnail: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Testimonio de testigo que presenció parte del incidente',
      delay: 0.4
    },
    {
      id: 6,
      title: 'Análisis Técnico de Evidencias',
      duration: '6:47',
      date: '07/06/2023',
      quality: '1080p',
      size: '95 MB',
      source: 'Laboratorio Forense',
      thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Presentación del análisis técnico de las evidencias recolectadas',
      delay: 0.5
    }
  ]
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.source.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
        </div>
        
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar videos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="interviews">Entrevistas</TabsTrigger>
            <TabsTrigger value="forensic">Forense</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <VideosGrid videos={filteredVideos} />
          </TabsContent>
          
          <TabsContent value="security">
            <VideosGrid videos={filteredVideos.filter(v => v.source.includes('Cámara'))} />
          </TabsContent>
          
          <TabsContent value="interviews">
            <VideosGrid videos={filteredVideos.filter(v => v.title.includes('Interrogación') || v.title.includes('Entrevista'))} />
          </TabsContent>
          
          <TabsContent value="forensic">
            <VideosGrid videos={filteredVideos.filter(v => v.source.includes('Forense') || v.title.includes('Análisis'))} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function VideosGrid({ videos }: { videos: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: video.delay }}
        >
          <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-muted hover:border-primary/20 transition-all duration-300 hover:shadow-lg cursor-pointer group">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="h-16 w-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                    <Play className="h-8 w-8 text-white ml-1" fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-sm font-medium">
                  {video.duration}
                </div>
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                  {video.quality}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{video.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{video.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{video.source}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tamaño: {video.size}</span>
                    <span>Duración: {video.duration}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}