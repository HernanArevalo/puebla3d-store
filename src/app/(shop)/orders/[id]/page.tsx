import { redirect } from 'next/navigation';
import Image from 'next/image';

import { getOrderById } from '@/actions';
import { OrderStatus, PayPalButton, ProductImage, SubtitleNM, TitleNM } from '@/components';
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
    <div className="flex justify-center items-start mb-24 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px]">
        <TitleNM title={`Pedido confirmado`} />
        <SubtitleNM title={`#${id.split('-').at(-1)}`} className='font-thin mb-5' />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {order?.OrderItems.map((item) => (
              <div
                className="flex gap-5 mb-2"
                key={item.product.slug + '-' + item.size}
              >
                <ProductImage
                  src={item.product.ProductImage[0].url}
                  width={100}
                  height={100}
                  style={{ width: '100px', height: '100px' }}
                  alt={item.product.title}
                  className='rounded'
                />
                <div>
                  <p>
                    {item.product.title} - {item.size}
                  </p>
                  <p>
                    {currencyFormat(item.price)} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>

                  <button className="underline mt-1">Borrar</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-semibold">Datos:</h2>
            <div className="mb-10">
              <p className="text-xl">{address?.firstName} {address?.lastName}</p>
              <p>{address?.phone}</p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.city} ({address?.postalCode}) - Argentina</p>
              <p className="flex flex-row items-center gap-2">Método de entrega:
                <span className="capitalize font-semibold">{order?.shippingMethod}</span>
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-300 mb-10" />

            <h2 className="text-2xl mb-2 font-semibold">Resumen de la compra:</h2>

            <div className="grid grid-cols-2">
              <span className="font-semibold">Productos</span>
              <span className='text-right'>{order!.items !== 1 ? `${order!.items} artículos` : `1 artículo`}</span>

              <span className='text-3xl font-semibold'>Total:</span>
              <span className='text-3xl text-right'>{currencyFormat(order!.subTotal)}</span>


              <span className='mt-8 text-xl font-semibold'>Con transferencia:</span>
              <span className='mt-8 text-xl text-right'>{currencyFormat(order!.total)}</span>

              <span className="font-semibold">Descuento (10%):</span>
              <span className='text-right'>{currencyFormat(order!.tax)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <div className="w-full flex flex-row justify-center gap-14">
                  <button className="bg-puebla-dark text-white rounded-md p-3 text-lg border-black border2">Mercado Pago</button>
                  <button className="bg-puebla-dark text-white rounded-md p-3 text-lg border-black border2">Transferencia</button>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
