import { redirect } from 'next/navigation';

import { getOrderById } from '@/actions';
import { OrderStatus, ProductImage, SubtitleNM, TitleNM } from '@/components';
import { currencyFormat } from '@/utils';
import { OrderSummary } from './components';

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

  const address = order.OrderAddress;

  return (
    <div className="flex justify-center items-start mb-24 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px] pt-8">


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col">
            <TitleNM title={`Pedido confirmado`} />
            <SubtitleNM title={`#${id.split('-').at(-1)}`} className='font-thin mb-5' />
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {order?.OrderItems.map((item) => (
              <div
                className="flex gap-5 mb-2"
                key={item.slug + '-' + item.size}
              >
                <ProductImage
                  src={item.image}
                  width={100}
                  height={100}
                  style={{ width: '100px', height: '100px' }}
                  alt={item.title}
                  className='rounded'
                />
                <div>
                  <p className="capitalize">
                    {item.title} - {item.size}
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

        </div>
      </div>
    </div>
  );
}
