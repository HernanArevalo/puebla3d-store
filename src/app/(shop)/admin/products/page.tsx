export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Image from 'next/image';

import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  searchParams: {
    page?: string;
  };
}


export default async function OrdersPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Products" />

      <div className="flex justify-end mb-5">
        <Link href='/admin/product/new' className="btn-primary">
          New Product
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Image
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Title
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Prize
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventory
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>

            { products.map(product => (
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={product.id}>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage 
                      src={product.ProductImage[0]?.url} 
                      width={80} 
                      height={80} 
                      className="w-20 h-20 object-cover rounded"
                      alt={product.title}
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                    { product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  { currencyFormat(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  { product.gender }
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  { product.inStock }
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  { product.sizes.join(', ') }
                </td>
                

              </tr>

            ))

            }



          </tbody>
        </table>

        <Pagination totalPages={ totalPages }/>
      </div>
    </>
  );
}