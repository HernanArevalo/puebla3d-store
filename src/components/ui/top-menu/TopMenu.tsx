'use client';
import { titleFont } from '@/config/fonts';
import { useUiStore } from '@/store';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';
import { CartLogo } from './components/CartLogo';

export const TopMenu = () => {
  const openSideMenu = useUiStore((state) => state.openSideMenu);

  const { data:session } = useSession();

  return (
    <div className={`${titleFont.className} flex justify-center relative`}>
      <nav className="flex md:mt-5 p-3 md:py-5 px-4 md:px-6 w-full md:mx-10 md:rounded-3xl justify-between items-center bg-puebla-green bg-opacity-85 text-puebla-dark z-10 shadow-lg">
        <div className=''>
          <Link href='/' className="flex flex-row gap-2">
            <Image className='w-10 md:w-20' src='/logo.png' width={100} height={100} alt='' />
          </Link>
        </div>

        {/* Center Menu */}
        <div className='hidden sm:block font-bold text-lg'>
          <Link
            className='m-2 p-2 rounded-md transition-all duration-300 hover:text-puebla-blue'
            href='/'
          >
            Macetas
          </Link>
          <span className="font-thin">|</span>
          <Link
            className='m-2 p-2 rounded-md transition-all duration-300 hover:text-puebla-blue'
            href='/gender/women'
          >
            Floreros
          </Link>
          <span className="font-thin">|</span>
          <Link
            className='m-2 p-2 rounded-md transition-all duration-300 hover:text-puebla-blue'
            href='/gender/kids'
          >
            Lámparas
          </Link>
          <span className="font-thin">|</span>
          <Link
            className='m-2 p-2 rounded-md transition-all duration-300 hover:text-puebla-blue'
            href='/gender/kids'
          >
            Todo
          </Link>
        </div>

        <div className='flex items-center gap-3 justify-center'>

          <CartLogo />
          
          <div className="rounded-md flex flex-col items-end gap-0 p-2 duration-500 transition-all font-bold"
          >
            {session?.user?.name &&
              <span>¡Hola {session?.user.name.split(' ')[0] }!</span>
            }
            <div
              className='flex flex-row justify-center items-center gap-1 hover:bg-puebla-dark hover:text-puebla-blue p-1 rounded transition-all font-normal cursor-pointer'
              onClick={openSideMenu}
            >
              Menú
              <IoMenu size={20}/>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
