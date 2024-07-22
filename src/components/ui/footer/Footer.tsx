import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs pb-8">
      
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold text-sm`}>Puebla </span>
        <span>| deco 3D</span>
        <span> © {new Date().getFullYear() }</span>
      </Link>

      <Link href="/" className="mx-3">
        Privacidad & Legal
      </Link>

      <Link href="/" className="mx-3">
        Ubicaciones
      </Link>
    </div>
  )
}
