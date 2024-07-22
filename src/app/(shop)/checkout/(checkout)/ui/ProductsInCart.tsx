'use client';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { ProductImage } from '@/components';

export const ProductsInCart = () => {

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
          className="flex gap-5 mb-7"
          key={`${product.slug}-${product.size}`}
        >
          <ProductImage
              src={product.image}
              width={100}
              height={100}
              style={{ width: '100px', height: '110px' }}
              alt={product.title}
              className='rounded'
            />
          <div className="">
              <p className="font-semibold">
                {product.title}
              </p>
              <p>
                Size: <span className="font-semibold">{product.size}</span>
              </p>
              <p>
                Quantity: <span className="font-semibold">{product.quantity}</span>
              </p>
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
