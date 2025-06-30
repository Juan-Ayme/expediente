"use client"

import Link from 'next/link'
import { motion } from '@/lib/motion'

type SectionHeaderProps = {
  title: string
  href: string
}

export default function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </motion.div>
    </div>
  )
}