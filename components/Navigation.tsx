"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { QrCode } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300 px-4 py-3 md:px-8",
      scrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
    )}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link href="/" className="text-xl font-bold hover:text-primary/90 transition-colors">
            UNSCH-SERIE-300-SECCIÒN-C-G5 
          </Link>
          {/* <div className="hidden md:flex space-x-8">
            <NavLink href="/personajes">PERSONAJES</NavLink>
            <NavLink href="/evidencias">EVIDENCIAS</NavLink>
            <NavLink href="/casos">CASOS</NavLink>
          </div>*/}
        </div>
        
        <div className="flex items-center">
          <Link href="/qrcode" className="p-2 hover:bg-accent/50 rounded-md transition-all">
            <QrCode className="w-8 h-8" />
          </Link>
        </div>
      </nav>
    </header>
  )
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-sm font-medium tracking-wide hover:text-primary relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  )
}