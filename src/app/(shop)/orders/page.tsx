export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from '@/actions';
import { Title } from '@/components';
import { getStatusConfig } from '@/utils';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {

  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) {
    redirect('/')
  }

  return (
    <>
      <Title title="Órdenes" />

      <div className="mb-10">
        <table className="min-w-full rounded-md overflow-hidden">
          <thead className="bg-puebla-dark text-white border-b">
            <tr>
              <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium px-6 py-4 text-right">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>

            {orders.map(order => {
              const { color, icon, text } = getStatusConfig({ status: order.status, iconSize: 16 })

              return (
                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200 font-semibold cursor-pointer" key={order.id}>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.split('-').at(-1)}</td>
                  <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                    {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 px-6 py-4 whitespace-nowrap">
                    <span className={`text-${color}`}>{icon}</span>
                    <span className={`mx-2 text-${color}`}>{text}</span>
                  </td>
                  <td className="text-sm text-gray-900 px-6 text-right">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      Ver orden
                    </Link>
                  </td>
                </tr>
              )
            })

            }



          </tbody>
        </table>
      </div>
    </>
  );
}