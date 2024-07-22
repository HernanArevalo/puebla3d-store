'use client';
import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
    
  const onValueChange = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className='mt-5 mb-2'>
      <h3 className='font-bold mb-4'>Quantity</h3>
      <div className='flex gap-3'>
        <button onClick={() => onValueChange(-1)}>
          <IoRemoveCircleOutline size={30} />
        </button>

        <span className='px-5 bg-gray-200 text-center flex items-center rounded font-semibold text-lg'>
          {quantity}
        </span>

        <button onClick={() => onValueChange(+1)}>
          <IoAddCircleOutline size={30} />
        </button>
      </div>
    </div>
  );
};
