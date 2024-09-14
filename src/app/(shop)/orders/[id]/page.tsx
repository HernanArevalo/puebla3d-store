import { redirect } from 'next/navigation';

import { getOrderById } from '@/actions';
import { OrderStatus, ProductImage, SubtitleNM, TitleNM } from '@/components';
import { currencyFormat } from '@/utils';
import { OrderSummary } from './components';
import Link from 'next/link';

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
            <SubtitleNM title={`#${id.split('-').at(0)}`} className='font-thin mb-5' />
            <OrderStatus status={order.status} className="mb-5"/>
            {order?.OrderItems.map((product) => (
              <div
              className='flex gap-5 mb-7 text-lg'
              key={`${product.slug}-${product.size}-${product.color}`}
            >
              <Link
                href={`/product/${product.slug}`}
                className='hover:underline cursor-pointer'
              >
                <ProductImage
                  src={product.image}
                  width={100}
                  height={100}
                  style={{ width: '100px', height: '100px' }}
                  alt={product.title}
                  className='rounded'
                />
              </Link>
              <div className=''>
                <Link
                  href={`/product/${product.slug}`}
                  className='hover:underline cursor-pointer'
                >
                  <p className='font-bold'>
                    {product.title} <span className="font-light text-base">x {product.quantity}</span>
                  </p>
                  <p className='capitalize'>
                    {product.color} - <span className="capitalize">{product.size}</span>
                  </p>
                </Link>
                <p>$ {product.price}</p>
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
