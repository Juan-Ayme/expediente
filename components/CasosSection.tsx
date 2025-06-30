"use client"

import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from '@/lib/motion'

export default function CasosSection() {
  const casos = [
    {
      id: 1,
      title: 'Robo',
      date: '03/06/2023',
      image: 'https://images.pexels.com/photos/6544379/pexels-photo-6544379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      delay: 0
    },
    {
      id: 2,
      title: 'Robo',
      date: '23/04/2023',
      image: 'https://images.pexels.com/photos/923681/pexels-photo-923681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      delay: 0.1
    }
  ]
  
  return (
    <section>
      <SectionHeader title="CASOS" href="/casos" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {casos.map((caso) => (
          <CaseCard 
            key={caso.id}
            id={caso.id}
            title={caso.title}
            date={caso.date}
            image={caso.image}
            delay={caso.delay}
          />
        ))}
      </div>
    </section>
  )
}

function CaseCard({ 
  id,
  title, 
  date, 
  image, 
  delay = 0 
}: { 
  id: number,
  title: string, 
  date: string, 
  image: string, 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Link href={`/casos/${id}`}>
        <Card className="overflow-hidden bg-card/70 backdrop-blur-sm border-muted hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-0 relative">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl font-bold">{title}</h3>
              <p className="text-white/80 mt-1">{date}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}