"use client"

import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function QRCodePage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="min-h-screen pt-20 pb-16 flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <Link href="/" className="mb-8 inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al expediente
        </Link>
        
        <div className="bg-card p-8 rounded-lg border border-border">
          <h1 className="text-2xl font-bold mb-6 text-center">Escanea este código QR</h1>
          
          <div className="bg-white p-6 rounded-lg flex items-center justify-center">
            <svg 
              viewBox="0 0 41 41" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-w-[220px]"
            >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0h41v41H0V0zm1 1v39h39V1H1z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4 4h7v7H4V4zm1 1v5h5V5H5z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M30 4h7v7h-7V4zm1 1v5h5V5h-5z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4 30h7v7H4v-7zm1 1v5h5v-5H5z" fill="black"/>
              <path d="M14 4h1v1h-1V4zm2 0h1v1h-1V4zm2 0h1v1h-1V4zm2 0h1v1h-1V4zm2 0h1v1h-1V4zm2 0h1v1h-1V4zm2 0h1v1h-1V4zm4 2h1v1h-1V6zm0 2h1v1h-1V8zm0 2h1v1h-1v-1zm-16 0h1v1h-1v-1zm0-2h1v1h-1V8zm4 2h1v1h-1v-1zm8 0h1v1h-1v-1zm0-2h1v1h-1V8zm-4 0h1v1h-1V8zm0-2h1v1h-1V6zm-4 0h1v1h-1V6zm-6 6h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm4 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm0 2h1v1h-1v-1zm-2 0h1v1h-1v-1zm-2 0h1v1h-1v-1zm-8 0h1v1h-1v-1zm-6 0h1v1h-1v-1zm-4 0h1v1h-1v-1zm18 2h1v1h-1v-1zm-14 0h1v1h-1v-1zm6 0h1v1h-1v-1zm-10 0h1v1h-1v-1zm14 0h1v1h-1v-1zm4 0h1v1h-1v-1zm-16 2h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm8 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm0 2h1v1h-1v-1zm-2 0h1v1h-1v-1zm-6 0h1v1h-1v-1zm-2 0h1v1h-1v-1zm-6 0h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 2h1v1h-1v-1zm6 0h1v1h-1v-1zm4 0h1v1h-1v-1zm4 0h1v1h-1v-1zm-4 2h1v1h-1v-1zm-2 0h1v1h-1v-1zm-2 0h1v1h-1v-1zm-2 0h1v1h-1v-1zm-2 0h1v1h-1v-1zm-2 0h1v1h-1v-1zm0 4h1v1h-1v-1zm16 0h1v1h-1v-1zm-12 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm4 0h1v1h-1v-1zm0-2h1v1h-1v-1zm-6 0h1v1h-1v-1zm-4 0h1v1h-1v-1zm-2 0h1v1h-1v-1zm-4 0h1v1h-1v-1zm16-6h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm0 2h1v1h-1v-1zm-2 0h1v1h-1v-1zm0 2h1v1h-1v-1zm0 2h1v1h-1v-1zm2 0h1v1h-1v-1zm0 2h1v1h-1v-1zm-2 0h1v1h-1v-1zm-4 0h1v1h-1v-1zm0-10h1v1h-1v-1zm0 2h1v1h-1v-1zm-12 4h1v1h-1v-1zm0 2h1v1h-1v-1zm0 2h1v1h-1v-1zm0-6h1v1h-1v-1zm10 10h1v1h-1v-1zm4 0h1v1h-1v-1zm-18 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm4 0h1v1h-1v-1zm2 0h1v1h-1v-1zm6 0h1v1h-1v-1zm2 0h1v1h-1v-1z" fill="black"/>
            </svg>
          </div>
          
          <div className="mt-8">
            <Button className="w-full" size="lg">
              Descargar Código QR
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}