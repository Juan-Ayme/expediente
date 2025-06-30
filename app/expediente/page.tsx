"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, FileText, Folder, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from '@/lib/motion'
import { Card, CardContent } from '@/components/ui/card'

export default function ExpedientePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Expediente Completo</h1>
        </div>
        
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar en expediente..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="all">Todo</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="media">Multimedia</TabsTrigger>
            <TabsTrigger value="persons">Personajes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ExpedienteGrid />
          </TabsContent>
          
          <TabsContent value="documents">
            <ExpedienteGrid filter="document" />
          </TabsContent>
          
          <TabsContent value="media">
            <ExpedienteGrid filter="media" />
          </TabsContent>
          
          <TabsContent value="persons">
            <ExpedienteGrid filter="person" />
          </TabsContent>
        </Tabs>
        
        <div className="mt-10">
          <h2 className="text-xl font-medium mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            <ActivityItem 
              icon={<FileText className="h-5 w-5" />}
              title="Contrato añadido al expediente"
              timestamp="Hace 2 horas"
            />
            <ActivityItem 
              icon={<Folder className="h-5 w-5" />}
              title="Nuevo caso creado: Robo 03/06/2023"
              timestamp="Hace 1 día"
            />
            <ActivityItem 
              icon={<User className="h-5 w-5" />}
              title="Nuevo personaje añadido: James Wilson"
              timestamp="Hace 3 días"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ExpedienteGrid({ filter }: { filter?: 'document' | 'media' | 'person' }) {
  const items = [
    {
      id: 1, 
      type: 'document',
      title: 'Contrato',
      format: 'PDF',
      date: '10/09/2023',
      delay: 0
    },
    {
      id: 2,
      type: 'media',
      title: 'Vídeo Principal',
      format: 'MP4',
      date: '05/09/2023',
      image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      delay: 0.1
    },
    {
      id: 3,
      type: 'person',
      title: 'Anna Garcia',
      role: 'Testigo',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      delay: 0.2
    },
    {
      id: 4,
      type: 'document',
      title: 'Informe Policial',
      format: 'PDF',
      date: '01/09/2023',
      delay: 0.3
    },
    {
      id: 5,
      type: 'media',
      title: 'Audio Interrogación',
      format: 'MP3',
      date: '28/08/2023',
      delay: 0.4
    },
    {
      id: 6,
      type: 'person',
      title: 'John Smith',
      role: 'Sospechoso',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      delay: 0.5
    }
  ].filter(item => !filter || item.type === filter)
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: item.delay }}
        >
          <Link href={`/expediente/${item.id}`}>
            <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-muted hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                {item.image ? (
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-muted">
                    {item.type === 'document' && <FileText className="h-12 w-12 text-muted-foreground" />}
                    {item.type === 'media' && !item.image && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <path d="M3 9v6h4l5 5V4L7 9H3z"></path>
                        <path d="M16 10a2 2 0 0 1 0 4z"></path>
                      </svg>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    {item.format && <span>{item.format}</span>}
                    {item.role && <span>{item.role}</span>}
                    {item.date && <span>{item.date}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

function ActivityItem({ 
  icon, 
  title, 
  timestamp 
}: { 
  icon: React.ReactNode, 
  title: string, 
  timestamp: string 
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="mt-0.5 p-2 bg-muted rounded-full">
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  )
}