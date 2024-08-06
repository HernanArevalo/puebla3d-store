"use client"
import { useSession } from "next-auth/react";

export const HiUser = () => {

  const { data:session } = useSession();

  return (
    <>
      {session?.user?.name &&
        <span>¡Hola {session?.user.name.split(' ')[0] }!</span>
      }
    </>
  )
}
