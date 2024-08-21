import { Divider, OrderStatus } from "@/components"
import { currencyFormat, discount, discounted } from "@/utils"
import { OrderPayment } from "./OrderPayment"
import { Order } from "@/interfaces"

interface Props {
  order: Order
}

export const OrderSummary = ({ order }: Props) => {

  const address = order.OrderAddress
  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <div>
        <h2 className="text-2xl mb-2 font-semibold">Datos:</h2>
        <div className="mb-5">
          <p className="text-xl">{address?.firstName} {address?.lastName}</p>
          <p>{address?.phone}</p>
          <p>{address?.address}</p>
          <p>{address?.address2}</p>
          <p>{address?.city} ({address?.postalCode}) - Argentina</p>
          <p className="flex flex-row items-center gap-2">Método de entrega:
            <span className="capitalize font-semibold">{order?.shippingMethod}</span>
          </p>
        </div>
        {(order.shippingMethod === 'CORREO') &&
          <div className={'flex items-center gap-4 rounded-lg py-2 px-3.5 text-sm font-semibold bg-puebla-blue mb-10'}>
            Una vez listo el producto, nos vamos a comunicar con vos para coordinar el envío.
          </div>
        }

        <Divider />

        <h2 className="text-2xl mb-2 font-semibold">Resumen de la compra:</h2>

        <div className="grid grid-cols-2">
          <span></span>
          <span className='text-right'>{order!.items !== 1 ? `${order!.items} artículos` : `1 artículo`}</span>

          <span className="font-semibold">Productos:</span>
          <span className='text-right'>{currencyFormat(order.total)}</span>

          <span className="font-semibold">Envío ({order.shippingMethod}):</span>
          <span className='text-right'>{currencyFormat(order.shippingAmount)}</span>

          <span className='mt-4 text-xl font-semibold'>Total:</span>
          <span className='mt-4 text-xl text-right'>{currencyFormat(order.total + order.shippingAmount)}</span>

          <span className='mt-4 text-xl font-semibold'>Con transferencia:</span>
          <span className='mt-4 text-xl text-right'>{currencyFormat((order.total + order.shippingAmount) * discount)}</span>

          <span className="font-semibold">Descuento (10%):</span>
          <span className='text-right'>{currencyFormat((order.total + order.shippingAmount) * discounted)}</span>
        </div>

      </div>

      <div className="mt-5 mb-2 w-full">
        {order?.isPaid ? (
          <OrderStatus isPaid={order?.isPaid ?? false} />
        ) : (
          <OrderPayment productsPrice={order.total} shippingPrice={order.shippingAmount} />
        )}
      </div>
    </div>
  )
}
