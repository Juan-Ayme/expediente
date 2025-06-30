"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import SectionHeader from '@/components/SectionHeader'
import { ALL_PERSONAJES, Personaje } from '@/lib/data' // Importamos los datos y el tipo

// Definimos las props para la tarjeta de personaje
interface PersonCardProps {
  id: string;
  name: string;
  image: string;
  role: Personaje['role']; // Usamos el tipo del rol desde la interfaz Personaje
  delay?: number;
}

export default function PersonajesSection() {
  // Usamos los datos importados de lib/data.ts
  const personajes = ALL_PERSONAJES;
  
  return (
    <section className="py-12">
      <SectionHeader title="INVOLUCRADOS" href="/personajes" />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {personajes.map((personaje, index) => (
          <PersonCard 
            key={personaje.id}
            id={personaje.id}
            name={personaje.name}
            image={personaje.image} 
            role={personaje.role}
            delay={index * 0.05} // Delay dinámico
          />
        ))}
      </div>
    </section>
  )
}

function PersonCard({ 
  id, 
  name, 
  image, 
  role,
  delay = 0 
}: PersonCardProps) {

  const roleStyles = {
    Víctima: 'text-blue-300',
    Acusado: 'text-red-400',
    Testigo: 'text-yellow-300',
    // Añade más roles y colores si es necesario
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={`/personajes/${id}`} className="group cursor-pointer block">
        <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-border transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
          <CardContent className="p-0">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay con gradiente que se muestra siempre para asegurar legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Contenedor para el texto, posicionado en la parte inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-bold leading-tight">{name}</h3>
                <p className={`text-sm font-semibold ${roleStyles[role] || 'text-gray-300'}`}>
                  {role}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}