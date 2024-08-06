"use client";

import { useCartStore } from '@/store';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiMiniShoppingBag } from 'react-icons/hi2';

export const CartLogo = () => {
  const [loaded, setLoaded] = useState(false);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Link href={
      (totalItemsInCart > 0 && loaded) ?
        '/cart' :
        '/empty'} className='m-2'>
      <div className='relative'>
        {totalItemsInCart > 0 && loaded && (
          <span className='fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-puebla-dark text-white'>
            {totalItemsInCart}
          </span>
        )}
        <HiMiniShoppingBag className='w-5 h-5' />
      </div>
    </Link>
  )
}
