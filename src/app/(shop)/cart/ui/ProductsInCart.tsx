'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ProductImage, QuantitySelector } from '@/components';
import { useCartStore } from '@/store';

export const ProductsInCart = () => {

  const updateProductQuantity = useCartStore( (state) => state.updateProductQuantity );
  const removeProductToCart = useCartStore( (state) => state.removeProductToCart );
  
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }




  return (
    <>
      {productsInCart.map((product) => (
        <div
          className='flex gap-5 mb-7'
          key={`${product.slug}-${product.size}`}
        >
          <Link
            href={`/product/${product.slug}`}
            className='hover:underline cursor-pointer'
          >
            <ProductImage
              src={product.image}
              width={100}
              height={100}
              style={{ width: '100px', height: '110px' }}
              alt={product.title}
              className='rounded'
            />
          </Link>
          <div className=''>
            <Link
              href={`/product/${product.slug}`}
              className='hover:underline cursor-pointer'
            >
              <p className='font-semibold'>
                {product.size} - {product.title}
              </p>
            </Link>
            <p>$ {product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={quantity =>  updateProductQuantity(product, quantity)}
            />

            <button className='underline' onClick={() => removeProductToCart(product)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
};
