"use client";


import { Divider, OrderStatus } from "@/components"
import { currencyFormat, discount } from "@/utils"
import { TransferPayment } from "./TransferPayment"
import { Order } from "@/interfaces"
import { useState } from "react";

interface Props {
  order: Order
}

export const OrderSummary = ({ order }: Props) => {
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<string | undefined>()


  const address = order.OrderAddress
  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
        {paymentMethodSelected == undefined ?
          <div>

            <div>
              <h2 className="text-2xl mb-2 font-semibold">Datos:</h2>
              <div className="">
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
                <div className={'flex items-center gap-4 rounded-lg py-2 px-3.5 text-sm font-semibold bg-puebla-blue'}>
                  Una vez listo el producto, nos vamos a comunicar con vos para coordinar el envío.
                </div>
              }

              <Divider className="my-5" />

              <h2 className="text-2xl mb-2 font-semibold">Resumen de la compra:</h2>

              <div className="grid grid-cols-2">

                <span className="font-semibold">Productos:</span>
                <span className='text-right'>{currencyFormat(order.total)}</span>

                <span className="font-semibold">Envío ({order.shippingMethod}):</span>
                <span className='text-right'>{currencyFormat(order.shippingAmount)}</span>

                <span className='mt-4 text-xl font-semibold'>Total:</span>
                <span className='mt-4 text-xl text-right font-semibold'>{currencyFormat(order.total + order.shippingAmount)}</span>

              </div>

              <div className="mt-5 mb-2 w-full">
                {order?.status == 'PENDING' ? (
                  <>
                    <Divider className="my-5" />
                    <h2 className="text-2xl font-semibold">Forma de Pago:</h2>
                    <div className="grid grid-cols-2 mb-5">
                      <span className='mt-4 text-xl font-semibold'>Con transferencia:</span>
                      <span className='mt-4 text-xl text-right font-semibold'>{currencyFormat((order.total + order.shippingAmount) * (1 - discount))}</span>
                      <span className="font-semibold text-puebla-dark">Descuento ({discount * 100}%)</span>
                    </div>
                    <div className="w-full flex justify-center">
                      <button className="btn-dark" onClick={() => setPaymentMethodSelected('T')}>Transferencia</button>
                    </div>

                    <div className="grid grid-cols-2 mb-5">
                      <span className='mt-4 text-xl font-semibold'>Con MercadoPago:</span>
                      <span className='mt-4 text-xl text-right font-semibold'>{currencyFormat((order.total + order.shippingAmount))}</span>
                      <span className="font-semibold text-puebla-dark">3 cuotas sin interés</span>
                    </div>
                    <div className="w-full flex justify-center">
                      <button className="btn-dark" onClick={() => setPaymentMethodSelected('MP')}>Mercado Pago</button>
                    </div>

                  </>
                ) : (
                  <OrderStatus status={order.status} />
                )}
              </div>
            </div>

          </div>

          :
          // pago con transferencia
          <TransferPayment
            productsPrice={order.total}
            shippingPrice={order.shippingAmount}
            paymentMethodSelected={paymentMethodSelected}
            setPaymentMethodSelected={setPaymentMethodSelected}
            order={order}
          />
        }
      </div>

    </>

  )
}
