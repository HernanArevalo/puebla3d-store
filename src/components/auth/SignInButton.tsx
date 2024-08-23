"use client"
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'

export const SignInButton = () => {
  return (
    <button className="flex flex-row justify-center items-center w-fit p-3 gap-1 bg-gray-100 border-puebla-blue border-2 rounded transition-all hover:border-black" onClick={() => signIn('google')}>
      <FcGoogle size={ 28 }/>
      <span className="text-xl ml-2 font-semibold">Iniciar sesión</span>
    </button>
  )
}
