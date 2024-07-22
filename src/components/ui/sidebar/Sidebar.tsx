'use client';

import Link from 'next/link';
import clsx from 'clsx';
import {
  IoCloseCircleOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';

import { useUiStore } from '@/store';
import { signIn, useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

export const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUiStore();

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user
  const isAdmin = (session?.user.role === 'admin');


  return (
    <div className="">
      {/* black background */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30  backdrop-filter backdrop-blur-xl" />
      )}

      {/* blur */}
      {isSideMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xl"
          onClick={closeSideMenu}
        />
      )}

      {/* sidemenu */}
      <nav
        // TODO: slide effect
        className={clsx(
          'fixed p-5 right-0 top-0 max-w-screen-sm sm:w-[500px] h-screen bg-puebla-blue z-20 shadow-2xl transform transition-all duration-300',
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
          />
        </div>

        {/* Input */}
        {/* <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div> */}

        {/* Menu */}
        { isAuthenticated ? (
          <>
            <div className="w-full h-px bg-gray-200 my-10 text-puebla-dark" />

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
              <IoTicketOutline size={30} />
              <span className="text-xl">Mis pedidos</span>
            </Link>
          <button
            className="flex items-center w-full mt-10 p-2 hover:bg-gray-100 rounded transition-all gap-3"
            onClick={() => signOut()}
          >
            <IoLogOutOutline size={30} />
            <span className="text-xl">Cerrar sesión</span>
          </button>
          </>
        ) : (

          <div className="w-fit p-3 flex items-center gap-3 mt-10 bg-gray-100 rounded transition-all">
            <button
              className="flex items-center"
              onClick={() => signIn('google')}
            >
              <Image
                loading="lazy"
                height="24"
                width="24"
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google Logo"
              />
              <span className="text-xl ml-2">Inicia sesión</span>
            </button>
          </div>
        )}
            {isAdmin &&
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
                  <IoTicketOutline size={30} />
                  <span className="text-xl">Órdenes</span>
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
            }
          </nav>
          </div>
  );
};
