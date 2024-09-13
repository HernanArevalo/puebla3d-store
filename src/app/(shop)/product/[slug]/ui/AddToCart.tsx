'use client';

import { ColorSelector, QuantitySelector, SizeSelector } from '@/components';
import { titleFont } from '@/config/fonts';
import { CartProduct, Product, ProductColor, ProductInStock } from '@/interfaces';
import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [selectedSize, setSelectedSize] = useState<ProductInStock>(product.inStock[0])
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>()

  useEffect(() => {
    setQuantity(1)
  }, [selectedSize, selectedColor])
  


  const [quantity, setQuantity] = useState<number>(1);

  const sizes = Array.from(new Set(product.inStock.map(item => item.size)))
  const [posted, setPosted] = useState(false);

  const AddToCart = () => {
    setPosted(true);
    if (!selectedSize || !selectedColor) return;

    const cartProduct: CartProduct = {
      id: product.id,
      image: product.images[0].url,
      price: selectedSize.price,
      quantity: quantity,
      stock: selectedColor.stock,
      size: selectedSize.size,
      color: selectedColor.name,
      slug: product.slug,
      title: product.title,
    }
    
    addProductToCart(cartProduct)

    setSelectedSize(product.inStock[0])
    setSelectedColor(undefined)
    setQuantity(1);
    setPosted(false);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      background: "#92C7D7",
      color: "black",
      iconColor: "white",
      width: "auto",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: undefined,
      title: 'Producto agregado!'
    })

  };

  const onChangeSize = (size: string) => {
    const newSize = product.inStock.find(prod => prod.size === size)
    if (newSize) {
      setSelectedColor(undefined)
      setSelectedSize(newSize)
      setPosted(false)
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

      <ColorSelector
        availableColors={selectedSize.colors}
        selectedColor={selectedColor}
        onColorChanged={(col:ProductColor)=> setSelectedColor(col)}
      />
      {posted && selectedColor == undefined &&
        <p className='text-red-500 bg-white rounded-md w-fit px-2 py-1 mt-4'>Seleccioná un color y tamaño</p>
      }


      {/* Quantity picker */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} maxQuantity={selectedColor?.stock || quantity}  />

      {/* Button */}
      <button className='btn-dark my-5' 
              disabled={selectedSize == undefined || selectedColor == undefined} 
              onClick={AddToCart}>
        Agregar al carro
      </button>
    </>
  );
};
