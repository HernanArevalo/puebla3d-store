"use client"

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const OrderSummary = () => {

  const router = useRouter();

  const [loaded, setLoaded] = useState(false)
  const { items, subtotal, tax, total } = useCartStore(state => state.getSummaryInformation() )

  useEffect(() => {
    setLoaded(true);
  }, []);


  useEffect(() => {

    if ( items === 0 && loaded === true )   {
      router.replace('/empty')
    }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ items, loaded ])


  if(!loaded) return <p>Cargando...</p>;


  return (
    <div className='grid grid-cols-2'>
      <span className="font-semibold">Productos</span>
      <span className='text-right'>{ items !== 1? `${ items } artículos`: `1 artículo`}</span>

      <span className='text-3xl font-semibold'>Total:</span>
      <span className='text-3xl text-right'>{ currencyFormat(subtotal) }</span>


      <span className='mt-10 text-xl font-semibold'>Con transferencia:</span>
      <span className='mt-10 text-xl text-right'>{currencyFormat(total)}</span>

      <span className="font-semibold">Descuento (10%):</span>
      <span className='text-right'>{ currencyFormat(tax) }</span>
    </div>
  );
};
