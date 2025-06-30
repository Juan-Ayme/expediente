"use client"

import SectionHeader from '@/components/SectionHeader'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Fingerprint } from 'lucide-react'
import { motion } from '@/lib/motion'

export default function EvidenciasSection() {
  const evidencias = [
    {
      id: 1,
      type: 'Videos',
      image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      icon: null,
      delay: 0
    },
    {
      id: 2,
      type: 'CONTRATO',
      format: 'PDF',
      icon: <FileText className="h-12 w-12" />,
      delay: 0.1
    },
    {
      id: 3,
      type: 'Huellas',
      icon: <Fingerprint className="h-12 w-12" />,
      delay: 0.2
    },
    {
      id: 4,
      type: 'Nota',
      icon: <FileText className="h-12 w-12" />,
      delay: 0.3
    },
    {
      id: 5,
      type: 'Nota',
      icon: <FileText className="h-12 w-12" />,
      delay: 0.4
    }
  ]
  
  return (
    <section>
      <SectionHeader title="EVIDENCIAS" href="/evidencias" />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {evidencias.map((evidencia) => (
          <EvidenciaCard 
            key={evidencia.id}
            type={evidencia.type}
            format={evidencia.format}
            image={evidencia.image}
            icon={evidencia.icon}
            delay={evidencia.delay}
          />
        ))}
      </div>
    </section>
  )
}

function EvidenciaCard({ 
  type, 
  format, 
  image, 
  icon, 
  delay = 0 
}: { 
  type: string, 
  format?: string, 
  image?: string, 
  icon?: React.ReactNode, 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-muted hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-0">
          {image ? (
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={image} 
                alt={type} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <h3 className="text-white font-medium">{type}</h3>
              </div>
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center bg-muted group-hover:bg-muted/80 transition-colors">
              {icon}
            </div>
          )}
          {!image && (
            <div className="p-3">
              <h3 className="font-medium">{type}</h3>
              {format && <p className="text-sm text-muted-foreground">{format}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}