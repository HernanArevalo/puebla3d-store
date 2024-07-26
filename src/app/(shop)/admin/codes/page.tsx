export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getCodes, getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';

import Link from 'next/link';
import { IoTicketOutline } from 'react-icons/io5';

interface Props {
  searchParams: {
    page?: string;
  };
}


export default async function OrdersPage({ searchParams }: Props) {

  const codes = await getCodes();

  return (
    <>
      <Title title="Códigos de descuento" />

      <div className="flex justify-end mb-5">
        <Link href='/admin/product/new' className="btn-dark">
          Nuevo código
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full rounded overflow-hidden">
          <thead className="bg-puebla-green border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Código
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Id
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Descuento
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Activo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Límite
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Usos
              </th>
            </tr>
          </thead>
          <tbody>

            { codes.map(code => (
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={code.id}>

                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  { code.code }
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  { code.id }
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap text-center">
                  { code.discount }%
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center">
                  { code.isActive?
                    <IoTicketOutline color='green' size={20}/>
                    :
                    <IoTicketOutline color='red' size={20}/>
                  }
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap text-center">
                { code.usageLimit ? code.usageLimit : "-" }
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap text-center">
                { code.usageCount }
                </td>
                

              </tr>

            ))

            }



          </tbody>
        </table>

      </div>
    </>
  );
}