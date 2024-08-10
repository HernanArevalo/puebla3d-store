'use client';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { placeOrder } from '@/actions';
import { currencyFormat } from '@/utils';
import { useAddressStore, useCartStore } from '@/store';
import { useRouter } from 'next/navigation';

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
        <div className="">
          <p className="text-xl">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.address}</p>
          <p>{address.address2}</p>
          <p>{address.postalCode}</p>
          <p>
            {address.city} - Argentina
          </p>
          <p>{address.phone}</p>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-300" />

      <div>
        <h2 className="text-2xl mb-2 font-semibold">Resumen de la orden</h2>

        <div className="grid grid-cols-2">
          <span className="font-semibold">Productos</span>
          <span className="text-right">
            {items !== 1 ? `${items} artcicles` : `1 article`}
          </span>

          <span className="font-semibold">Subtotal</span>
          <span className="text-right">{currencyFormat(subtotal)}</span>

          <span className="font-semibold">Impuestos (15%)</span>
          <span className="text-right">{currencyFormat(tax)}</span>

          <span className="mt-5 text-2xl font-semibold">Total:</span>
          <span className="mt-5 text-2xl text-right">
            {currencyFormat(total)}
          </span>
        </div>

      </div>

      <div className="mt-5 mb-2 w-full">
        {/* Disclaimer */}
        <p className="mb-1">
          <span className="text-xs">
            Al hacer clic en &quot;Make Order&quot;, acepto{' '}
            <a href="#" className="underline">
              términos y condiciones
            </a>
          </span>
        </p>

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
          Make order
        </button>
      </div>
    </div>
  );
};
