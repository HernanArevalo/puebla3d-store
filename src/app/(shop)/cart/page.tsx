import Link from 'next/link';
import { Title } from '@/components';
import { OrderSummary, ProductsInCart } from './ui';

export default function CartPage() {



  
  return (
    <div className='flex justify-center items-start mb-72 px-10 sm:px-10'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <Link href='/' className='mb-3 underline'>
              Seguir comprando
            </Link>

            <ProductsInCart />
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl mb-2 font-bold'>Resumen de orden</h2>

            <OrderSummary />

            <div className='mt-5 mb-2 w-full'>
              <Link
                href='/checkout/adress'
                className='flex btn-primary justify-center'
              >
                Continuar compra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
