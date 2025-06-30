"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, User, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
// 1. Importamos los datos centralizados
import { INVOLUCRADOS, TIMELINE_EVENTS, Personaje } from '@/lib/expediente-data';

// 2. Función `getLastUpdate` CORREGIDA para usar los datos centralizados
const getLastUpdate = (personId: string) => {
  // Filtra los eventos de la línea de tiempo que pertenecen a esta persona
  const relatedEvents = TIMELINE_EVENTS.filter(event => 
    event.relatedPeopleIds.includes(personId)
  );

  if (!relatedEvents || relatedEvents.length === 0) {
    return null;
  }

  // Ordena los eventos por fecha para encontrar el más reciente
  relatedEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Devuelve la fecha del evento más reciente
  return new Date(relatedEvents[0].date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function PersonajesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // 3. El listado de personajes ahora viene de la fuente de datos real
  const filteredPersonajes = INVOLUCRADOS.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background/95 pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <header className="flex items-center mb-8">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Involucrados en el Caso</h1>
        </header>
        
        <div className="mb-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o rol (Víctima, Acusado, Testigo)..."
            className="pl-12 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredPersonajes.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {filteredPersonajes.map((person) => (
              <motion.div
                key={person.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <Link href={`/personajes/${person.id}`} className="block h-full">
                  <Card className="h-full overflow-hidden bg-card/70 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                    <CardContent className="p-0 flex flex-col">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img src={person.image} alt={person.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                          person.role === 'Víctima' ? 'bg-blue-500 text-white' : 
                          person.role === 'Acusado' ? 'bg-red-700 text-white' : 
                          'bg-yellow-500 text-white'
                        }`}>
                          {person.role}
                        </span>
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold mb-3">{person.name}</h3>
                        <div className="space-y-3 text-sm flex-grow mt-auto">
                           {getLastUpdate(person.id) && (
                            <div className="flex items-center justify-between text-muted-foreground">
                              <span className="flex items-center gap-2"><Calendar size={16} /> Última Actividad:</span>
                              <span className="text-foreground font-medium">{getLastUpdate(person.id)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron involucrados</h3>
            <p className="text-muted-foreground">Intenta con otro término de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}