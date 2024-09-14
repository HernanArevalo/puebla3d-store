
import Link from "next/link";
import { OrderStatusInRow } from "./OrderStatusInRow";

interface Props {
  order: any;
  key: string;
}

export const OrderRow = ({ order }: Props) => {

  return (
    <tr
      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200 font-semibold"
      key={order.id}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {order.id.split("-").at(-1)}
      </td>
      <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
        {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
      </td>
      <td className="flex items-center text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
        <OrderStatusInRow status={order.status}/>
      </td>
      <td className="text-sm text-gray-900 px-6 text-right">
        <Link href={`/orders/${order.id}`} className="hover:underline">
          Ver orden
        </Link>
      </td>
    </tr>
  );
};
