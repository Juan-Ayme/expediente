"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, FileText, Video, Fingerprint, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from '@/lib/motion'

export default function EvidenciasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)
  
  const evidencias = [
    {
      id: 1,
      title: 'Video Principal',
      type: 'video',
      format: 'MP4',
      date: '03/06/2023',
      size: '125 MB',
      image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      delay: 0
    },
    {
      id: 2,
      title: 'Contrato Principal',
      type: 'document',
      format: 'PDF',
      date: '10/09/2023',
      size: '2.3 MB',
      delay: 0.1
    },
    {
      id: 3,
      title: 'Huellas Dactilares',
      type: 'forensic',
      format: 'IMG',
      date: '05/06/2023',
      size: '15 MB',
      delay: 0.2
    },
    {
      id: 4,
      title: 'Nota Manuscrita',
      type: 'document',
      format: 'PDF',
      date: '02/06/2023',
      size: '1.8 MB',
      delay: 0.3
    },
    {
      id: 5,
      title: 'Fotografías del Lugar',
      type: 'image',
      format: 'JPG',
      date: '03/06/2023',
      size: '45 MB',
      image: 'https://images.pexels.com/photos/6544379/pexels-photo-6544379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      delay: 0.4
    },
    {
      id: 6,
      title: 'Audio Interrogación',
      type: 'audio',
      format: 'MP3',
      date: '04/06/2023',
      size: '28 MB',
      delay: 0.5
    }
  ]
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  const filteredEvidencias = evidencias.filter(evidencia =>
    evidencia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evidencia.type.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="h-8 w-8" />
      case 'document': return <FileText className="h-8 w-8" />
      case 'forensic': return <Fingerprint className="h-8 w-8" />
      case 'image': return <Image className="h-8 w-8" />
      case 'audio': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9v6h4l5 5V4L7 9H3z"></path>
          <path d="M16 10a2 2 0 0 1 0 4z"></path>
        </svg>
      )
      default: return <FileText className="h-8 w-8" />
    }
  }
  
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Evidencias</h1>
        </div>
        
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar evidencias..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-5 md:w-auto md:inline-flex">
            <TabsTrigger value="all">Todo</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="document">Documentos</TabsTrigger>
            <TabsTrigger value="image">Imágenes</TabsTrigger>
            <TabsTrigger value="forensic">Forense</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <EvidenciasGrid evidencias={filteredEvidencias} getIcon={getIcon} />
          </TabsContent>
          
          <TabsContent value="video">
            <EvidenciasGrid 
              evidencias={filteredEvidencias.filter(e => e.type === 'video')} 
              getIcon={getIcon} 
            />
          </TabsContent>
          
          <TabsContent value="document">
            <EvidenciasGrid 
              evidencias={filteredEvidencias.filter(e => e.type === 'document')} 
              getIcon={getIcon} 
            />
          </TabsContent>
          
          <TabsContent value="image">
            <EvidenciasGrid 
              evidencias={filteredEvidencias.filter(e => e.type === 'image')} 
              getIcon={getIcon} 
            />
          </TabsContent>
          
          <TabsContent value="forensic">
            <EvidenciasGrid 
              evidencias={filteredEvidencias.filter(e => e.type === 'forensic')} 
              getIcon={getIcon} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function EvidenciasGrid({ 
  evidencias, 
  getIcon 
}: { 
  evidencias: any[], 
  getIcon: (type: string) => React.ReactNode 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {evidencias.map((evidencia) => (
        <motion.div
          key={evidencia.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: evidencia.delay }}
        >
          <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-muted hover:border-primary/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
            <CardContent className="p-0">
              {evidencia.image ? (
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={evidencia.image} 
                    alt={evidencia.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-muted">
                  {getIcon(evidencia.type)}
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{evidencia.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Formato</span>
                    <span className="font-medium">{evidencia.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fecha</span>
                    <span>{evidencia.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tamaño</span>
                    <span>{evidencia.size}</span>
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