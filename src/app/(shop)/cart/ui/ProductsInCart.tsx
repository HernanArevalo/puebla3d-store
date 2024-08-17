'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ProductImage, QuantitySelector } from '@/components';
import { useCartStore } from '@/store';

export const ProductsInCart = () => {

  const { cart:productsInCart, 
          updateProductQuantity, 
          removeProductToCart, 
          updateProducts 
        } = useCartStore();

  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }



  return (
    <>
      {productsInCart.map((product) => (
        <div
          className='flex gap-5 mb-7 text-lg'
          key={`${product.slug}-${product.size}-${product.color}`}
        >
          <Link
            href={`/product/${product.slug}`}
            className='hover:underline cursor-pointer'
          >
            <ProductImage
              src={product.image}
              width={100}
              height={100}
              style={{ width: '100px', height: '100px' }}
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
                {product.title}
              </p>
              <p className='capitalize'>
                {product.color} - <span className="capitalize">{product.size}</span>
              </p>
            </Link>
            <p>$ {product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={quantity => updateProductQuantity(product, quantity)} 
              maxQuantity={product.stock || product.quantity}
            />

            <button className='underline' onClick={() => removeProductToCart(product)}>Borrar</button>
          </div>
        </div>
      ))}
    </>
  );
};
