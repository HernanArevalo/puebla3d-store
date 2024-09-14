export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from '@/actions';
import { OrderRow, Title } from '@/components';

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
            {orders.map(order =>
              (<OrderRow order={order} key={order.id} />)
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}