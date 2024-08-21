"use client";

import { SubtitleNM } from "@/components";
import { currencyFormat, discount } from "@/utils";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

interface Params {
  productsPrice: number;
   shippingPrice: number;
}

export const OrderPayment = ({productsPrice, shippingPrice}: Params ) => {
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<string|undefined>()


  const priceMercadopago = productsPrice + shippingPrice
  const priceTransfer = (productsPrice + shippingPrice) * discount

  return (
    <>
      {paymentMethodSelected == undefined ?
        <div className="w-full flex flex-row justify-center gap-14">
          <button className="btn-dark" onClick={()=>setPaymentMethodSelected('MP')}>Mercado Pago</button>
          <button className="btn-dark" onClick={()=>setPaymentMethodSelected('T')}>Transferencia</button>
        </div>
        :
        <div className="flex flex-col bg-puebla-blue rounded-md p-3 gap-5">
        <button onClick={()=>setPaymentMethodSelected(undefined)} className="bg-gray-300 text-black rounded-md w-fit p-2">
          <IoMdArrowRoundBack />
        </button>
        { paymentMethodSelected == 'T' ?
          <div>
              <h2 className="text-xl mb-2 font-semibold">Pago con trasferencia:</h2>
              <div className="flex flex-col gap-2">
                <div className="bg-white w-fit p-1 rounded-md">
                  A pagar:
                  <span className="font-semibold"> { currencyFormat(priceTransfer) }</span>
                </div>
                <div className="bg-white w-fit p-1 rounded-md">
                  <h4 className="font-bold">Datos de la cuenta:</h4>
                  <div className="grid grid-cols-2">
                    <span>CVU:</span>
                    <span>nan.arevalo</span>

                    <span>ALIAS:</span>
                    <span>nan.arevalo</span>

                    <span>NOMBRE:</span>
                    <span>HERNÁN ARÉVALO</span>

                  </div>
                </div>

              </div>

          </div>
          :
          <div>
            <h2 className="text-xl mb-2 font-semibold">Pago con MercadoPago:</h2>
          </div>
        }
        </div>
      }
    </>
  )
}
