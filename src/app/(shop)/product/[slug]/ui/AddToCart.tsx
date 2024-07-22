'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const AddToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      image: product.images[0],
      price: product.price,
      quantity: quantity,
      size: size,
      slug: product.slug,
      title: product.title,
    }
    addProductToCart(cartProduct)

    setSize(undefined);
    setQuantity(1);
    setPosted(false);
  };

  return (
    <>
      {/* Size picker */}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
      />
      {posted && !size && 
        <p className='text-red-500'>Select a size</p>
      }

      {/* Quantity picker */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <button className='btn-dark my-5' onClick={AddToCart}>
        Agregar al carro
      </button>
    </>
  );
};
