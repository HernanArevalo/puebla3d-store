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


  if(!loaded) return <p>Loading...</p>;


  return (
    <div className='grid grid-cols-2'>
      <span className="font-semibold">Products</span>
      <span className='text-right'>{ items !== 1? `${ items } artcicles`: `1 article`}</span>

      <span className="font-semibold">Subtotal</span>
      <span className='text-right'>{ currencyFormat(subtotal) }</span>

      <span className="font-semibold">Taxes (15%)</span>
      <span className='text-right'>{ currencyFormat(tax) }</span>

      <span className='mt-5 text-2xl font-semibold'>Total:</span>
      <span className='mt-5 text-2xl text-right'>{ currencyFormat(total) }</span>
    </div>
  );
};
