"use client"
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export const SignInButton = () => {
  return (
    <button className="w-fit p-3 flex items-center gap-1 bg-gray-100 border-puebla-blue border-4 rounded transition-all" onClick={() => signIn('google')}>
      <Image
        loading="lazy"
        height="24"
        width="24"
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google Logo"
      />
      <span className="text-xl ml-2">Iniciar sesión</span>
    </button>
  )
}
