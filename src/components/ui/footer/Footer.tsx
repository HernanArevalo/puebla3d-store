import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'
import { IoLogoInstagram } from 'react-icons/io5'

export const Footer = () => {
  return (
    <div className="flex w-full justify-center items-center text-xs pb-8 gap-3">
      
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold text-sm`}>Puebla </span>
        <span>| deco 3D</span>
        <span> © {new Date().getFullYear() }</span>
      </Link>

      <Link href="https://www.instagram.com/puebla3d" className="text-xl bg-puebla-green p-2 rounded-xl">
        <IoLogoInstagram />
      </Link>

    </div>
  )
}
