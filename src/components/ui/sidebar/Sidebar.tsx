'use client';

import Link from 'next/link';
import clsx from 'clsx';
import {
  IoCloseCircleOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoReceiptOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import { useUiStore } from '@/store';
import { signIn, useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { SignInButton } from '@/components/auth/SignInButton';

export const Sidebar = () => {
  

  const { isSideMenuOpen, closeSideMenu } = useUiStore();
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';

  return (
    <div>
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-50" onClick={closeSideMenu} />
      )}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 max-w-screen-sm sm:w-[500px] h-screen bg-puebla-blue z-20 shadow-2xl transform transition-transform duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          }
        )}
      >
        <div className="w-full flex justify-end">
          <IoCloseCircleOutline
            size={50}
            className="top-5 right-5 cursor-pointer"
            onClick={closeSideMenu}
            color="white"
          />
        </div>
        <div className="w-full h-px bg-gray-200 my-10 text-puebla-dark" />
        {isAuthenticated ? (
          <>
            <Link
              href={'/profile'}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
              onClick={closeSideMenu}
            >
              <IoPersonOutline size={30} />
              <span className="text-xl">Mi Perfil</span>
            </Link>
            <Link
              href={'/orders'}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
              onClick={closeSideMenu}
            >
              <IoReceiptOutline size={30} />
              <span className="text-xl">Mis pedidos</span>
            </Link>
            <button
              className="flex items-center w-full mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
              onClick={() => signOut({callbackUrl:'/'})}
            >
              <IoLogOutOutline size={30} />
              <span className="text-xl">Cerrar sesión</span>
            </button>
          </>
        ) : (
            <SignInButton />
        )}
        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />
            <Link
              href="/admin/products"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
              onClick={closeSideMenu}
            >
              <IoShirtOutline size={30} />
              <span className="text-xl">Productos</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
              onClick={closeSideMenu}
            >
              <IoReceiptOutline size={30} />
              <span className="text-xl">Órdenes</span>
            </Link>
            <Link
              href="/admin/codes"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
              onClick={closeSideMenu}
            >
              <IoTicketOutline size={30} />
              <span className="text-xl">Códigos de descuento</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
              onClick={closeSideMenu}
            >
              <IoPeopleOutline size={30} />
              <span className="text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
