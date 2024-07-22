import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/config/fonts'
import { Providers } from '@/components'


export const metadata: Metadata = {
  title: {
    template: '%s - PUEBLA | deco 3D',
    default: 'PUEBLA | deco 3D'
  },
  description: 'e-comerce shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
