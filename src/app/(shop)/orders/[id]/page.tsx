import { redirect } from 'next/navigation';

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

  if (!ok || !order) {
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
                  <p className="capitalize">
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
          <OrderSummary order={order}/>

              <span className="font-semibold">Productos:</span>
              <span className='text-right'>{currencyFormat(order.subTotal)}</span>

              <span className="font-semibold">Envío ({order!.shippingMethod}):</span>
              <span className='text-right'>{  currencyFormat(order.shippingAmount)}</span>

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
