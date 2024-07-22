import Link from 'next/link';
import { Title } from '@/components';
import { OrderSummary, ProductsInCart } from './ui';

export default function CartPage() {



  
  return (
    <div className='flex justify-center items-start mb-72 px-10 sm:px-10'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Cart' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Add items</span>
            <Link href='/' className='mb-5 underline'>
              Keep buying
            </Link>

            <ProductsInCart />
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl mb-2 font-bold'>Order resume</h2>

            <OrderSummary />

            <div className='mt-5 mb-2 w-full'>
              <Link
                href='/checkout/adress'
                className='flex btn-primary justify-center'
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
