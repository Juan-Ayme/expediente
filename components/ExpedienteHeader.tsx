"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion' // Asumiendo que usas framer-motion
import { Scale, Users, ShieldAlert } from 'lucide-react'

export default function ExpedienteHeader() {
  
  // Datos extraídos de los documentos del caso
  const caseData = {
    expedienteId: "57-2020-6-PE",
    delito: "Feminicidio",
    imputado: "Jesús Nicolas Rojas Licas",
    agraviada: "Briyit Paola Taboada Huamán"
  };

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay }
  });

  return (
    <section className="py-10 border-b-2 border-dashed border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        
        {/* Información Principal del Expediente */}
        <div className="space-y-6">
          <motion.div variants={fadeIn(0)}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground flex items-center gap-4">
              <Scale className="h-12 w-12 text-primary" />
              <span>CASO {caseData.expedienteId}</span>
            </h1>
          </motion.div>
          
          <motion.div 
            variants={fadeIn(0.2)} 
            className="pl-2 border-l-4 border-primary space-y-2"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-muted-foreground" />
              <p className="text-lg text-foreground">
                <span className="font-bold">Delito:</span> {caseData.delito}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <p className="text-lg text-foreground">
                <span className="font-semibold text-red-400">Acusado:</span> {caseData.imputado}
              </p>
            </div>
             <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <p className="text-lg text-foreground">
                <span className="font-semibold text-blue-400">Agraviada:</span> {caseData.agraviada}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Botón de Acción */}
        <motion.div variants={fadeIn(0.4)}>
          {/* Este enlace podría llevar al Muro de Investigación que estamos construyendo */}
          <Link href="/expediente-interactivo"> 
            <Button size="lg" className="w-full md:w-auto px-8 py-7 text-lg font-bold shadow-lg hover:shadow-primary/40 transition-shadow">
              VER EXPEDIENTE INTERACTIVO
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}