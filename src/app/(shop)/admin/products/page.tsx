export const revalidate = 0;

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Link from 'next/link';

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
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Categoría
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 w-full grid grid-cols-2 gap-5">
                <span className="text-left">Tamaños</span>
                <span className="text-left">Colores</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.images[0].url}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded"
                      alt={product.title}
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="capitalize text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.category}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.inStock.map((stockItem, index) => (
                    <>
                    <div key={stockItem.id} className="mb-1 grid grid-cols-2 gap-5">
                      <span className="font-medium capitalize">{stockItem.size}</span>
                      <div className="">
                        {stockItem.colors.map((colorItem) => (
                          <div key={colorItem.id}>
                            <span className="capitalize">{colorItem.name}:</span> <span>{colorItem.stock}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {index < product.inStock.length - 1 && (
                      <span className="block my-2 border-t border-gray-300 w-full" />
                    )}
                    </>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
