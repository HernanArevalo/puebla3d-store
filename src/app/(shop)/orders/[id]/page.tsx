import { redirect } from 'next/navigation';
import Image from 'next/image';

import { getOrderById } from '@/actions';
import { OrderStatus, PayPalButton, Title } from '@/components';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  const address = order?.OrderAddress;

  return (
    <div className="flex justify-center items-start mb-72 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {order?.OrderItems.map((item) => (
              <div
                className="flex gap-5 mb-2"
                key={item.product.slug + '-' + item.size}
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="rounded"
                />
                <div>
                  <p>
                    {item.product.title} - {item.size}
                  </p>
                  <p>
                    {item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>

                  <button className="underline mt-1">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Adress Delivry</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.postalCode}</p>
              <p>
                {address?.city}, {address?.countryId}
              </p>
              <p>{address?.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-300 mb-10" />

            <h2 className="text-2xl mb-2">Order resume</h2>

            <div className="grid grid-cols-2">
              <span className="font-semibold">Products</span>
              <span className="text-right">
                {order?.items !== 1 ? `${order?.items} artcicles` : `1 article`}
              </span>

              <span className="font-semibold">Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span className="font-semibold">Taxes (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl font-semibold">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <PayPalButton orderId={order!.id} amount={order!.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
