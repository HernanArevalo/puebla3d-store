'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { LuPencilLine } from 'react-icons/lu';

import { placeOrder } from '@/actions';
import { currencyFormat } from '@/utils';
import { useAddressStore, useCartStore } from '@/store';


export const PlaceOrder = () => {
  const router = useRouter();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [creatingOrder, setCreatingOrder] = useState<boolean>(false);

  const { address } = useAddressStore();
  const { cart, clearCart } = useCartStore();
  const { items, subtotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
        <p>Cargando...</p>
      </div>
    );
  }

  const onCreateOrder = async () => {
    setCreatingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
      color: product.color,
      prize: product.price

    }));

    // server action
    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setCreatingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    // * All ok!
    clearCart();
    router.replace('/orders/' + resp.order?.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit flex flex-col gap-6">
      <div>
        <h2 className="text-2xl mb-2 font-semibold">Datos del comprador</h2>
        <div className="flex flex-row gap-10">
          <div className="">
            <p className="text-xl">{address.firstName} {address.lastName}</p>
            <p>{address.phone}</p>
            <p>{address.address}</p>
            <p>{address.address2}</p>
            <p>{address.city} ({address.postalCode}) - Argentina</p>
            <p className="flex flex-row items-center gap-2">Método de entrega:
              <span className="capitalize font-semibold">{address.shippingMethod}</span>
            </p>
          </div>
          <Link href='checkout/data'>
            <LuPencilLine size={20} color='gray' />
          </Link >
        </div>
      </div>

      <div className="bg-puebla-blue rounded-md p-3 text-justify bg-opacity-40">
        Una vez confirmada la compra, nos vamos a comunicar con vos para coordinar la entrega.

      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-puebla-blue" />

      <div>
        <h2 className="text-2xl mb-2 font-semibold">Resumen de la orden</h2>

        <div className="grid grid-cols-2">
          <span className="font-semibold">Productos</span>
          <span className='text-right'>{items !== 1 ? `${items} artículos` : `1 artículo`}</span>

          <span className='text-3xl font-semibold'>Total:</span>
          <span className='text-3xl text-right'>{currencyFormat(subtotal)}</span>


          <span className='mt-10 text-xl font-semibold'>Con transferencia:</span>
          <span className='mt-10 text-xl text-right'>{currencyFormat(total)}</span>

          <span className="font-semibold">Descuento (10%):</span>
          <span className='text-right'>{currencyFormat(tax)}</span>
        </div>

      </div>

      <div className="mt-5 mb-2 w-full">
        {/* Disclaimer */}
        {/* <p className="mb-1">
          <span className="text-xs">
            Al hacer clic en &quot;Crear órden&quot;, acepto{' '}
            <a href="#" className="underline">
              términos y condiciones
            </a>
          </span>
        </p> */}

        <p className="text-red-500">{errorMessage}</p>

        <button
          // href="/orders/123"
          className={clsx({
            'btn-primary': !creatingOrder,
            'btn-disabled': creatingOrder,
          })}
          onClick={onCreateOrder}
          disabled={creatingOrder}
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};
