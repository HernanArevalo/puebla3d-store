'use client';

import { ColorSelector, QuantitySelector, SizeSelector } from '@/components';
import { titleFont } from '@/config/fonts';
import { CartProduct, Product, ProductColor, ProductInStock } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [selectedSize, setSelectedSize] = useState<ProductInStock>(product.inStock[0])
  const [selectedColor, setSelectedColor] = useState<ProductColor>(selectedSize.colors[0])

  const [availableColors, setAvailableColors] = useState(selectedSize.colors)

  const [quantity, setQuantity] = useState<number>(1);

  const sizes = Array.from(new Set(product.inStock.map(item => item.size)))
  const [posted, setPosted] = useState(false);

  const AddToCart = () => {
    setPosted(true);
    if (!selectedSize) return;

    const cartProduct: CartProduct = {
      id: product.id,
      image: product.images[0],
      price: selectedSize.price,
      quantity: quantity,
      size: selectedSize.size,
      slug: product.slug,
      title: product.title,
    }
    addProductToCart(cartProduct)

    setSelectedSize(product.inStock[0])
    setQuantity(1);
    setPosted(false);
  };

  const onChangeSize = (size: string) => {
    const newSize = product.inStock.find(prod => prod.size === size)
    if (newSize) {
      setSelectedSize(newSize)
      setSelectedColor(selectedSize.colors[0])
    }
  }

  return (
    <>
      <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
        {product.title}
      </h1>
      <p className="text-lg mb-5">${selectedSize.price}</p>

      {/* Size picker */}
      <SizeSelector
        availableSizes={sizes}
        selectedSize={selectedSize.size}
        onSizeChanged={onChangeSize}
      />
      {posted  &&
        <p className='text-red-500'>Seleccioná un tamaño</p>
      }

      <ColorSelector
        availableColors={selectedSize.colors}
        selectedColor={selectedColor}
        onColorChanged={(col:ProductColor)=> setSelectedColor(col)}
      />

      {posted &&
        <p className='text-red-500'>Seleccioná un tamaño</p>
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
