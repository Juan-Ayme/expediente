"use client"

import { useEffect, useState } from 'react'
import { ArrowLeft, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image' // Usamos el componente Image de Next.js para optimización
import { motion } from 'framer-motion'

export default function QRCodePage() {
  const [mounted, setMounted] = useState(false)
  const qrImagePath = '/qr/qr.webp'; // <-- ¡IMPORTANTE! Asegúrate de que esta ruta y nombre de archivo sean correctos.

  useEffect(() => {
    setMounted(true)
  }, [])

  // Evita errores de hidratación mostrando un loader o nada hasta que el componente esté montado
  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }
  
  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] text-gray-200 flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-sm">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
        >
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Expediente Principal
            </Link>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative rounded-xl bg-slate-800/50 backdrop-blur-md border border-slate-700/50 shadow-2xl overflow-hidden">
                {/* Efecto de borde iluminado */}
                <div className="absolute top-0 left-0 w-full h-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }}/>

                <div className="relative p-8">
                    <div className="text-center mb-6">
                        <QrCode className="mx-auto h-10 w-10 text-primary mb-2" />
                        <h1 className="text-2xl font-bold tracking-tight text-white">Acceso al Expediente Digital</h1>
                        <p className="text-slate-400 mt-1">Escanea para ver el caso en tu dispositivo.</p>
                    </div>
                
                    <div className="bg-white p-4 rounded-lg shadow-inner">
                        <Image
                            src={qrImagePath}
                            alt="Código QR del Expediente"
                            width={400}
                            height={400}
                            className="w-full h-auto rounded-md"
                            priority // Carga la imagen del QR más rápido
                        />
                    </div>
                
                    <div className="mt-8">
                        <a href={qrImagePath} download={`expediente-caso-057-2020-qr.png`}>
                            <Button className="w-full font-bold text-lg" size="lg">
                                Descargar Código QR
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  )
}