"use client";

import { SubtitleNM } from "@/components";
import { currencyFormat, discount } from "@/utils";
import { useState } from "react";
import { BiSolidCopy } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCopy } from "react-icons/io5";
import { RiFileCopyLine } from "react-icons/ri";

interface Params {
  productsPrice: number;
  shippingPrice: number;

  paymentMethodSelected: string | undefined;
  setPaymentMethodSelected: (method: string | undefined) => void
}

export const OrderPayment = ({ productsPrice, shippingPrice, paymentMethodSelected, setPaymentMethodSelected }: Params) => {

  const priceMercadopago = productsPrice + shippingPrice
  const priceTransfer = (productsPrice + shippingPrice) * discount

  return (
    <>
      <div className="flex flex-col bg-puebla-blue bg-opacity-50 rounded-md p-3 gap-5">
        <button onClick={() => setPaymentMethodSelected(undefined)} className="bg-gray-300 text-black rounded-md w-fit p-2">
          <IoMdArrowRoundBack />
        </button>
        {paymentMethodSelected == 'T' ?
          <div>
            <h2 className="text-xl mb-2 font-semibold">Pago con trasferencia:</h2>
            <div className="flex flex-col gap-2">
              <div className="w-full flex justify-center">
                <div className="bg-white w-fit p-3 rounded-md font-semibold text-xl mb-4">
                  {currencyFormat(priceTransfer)}
                </div>
              </div>
              <div className="bg-white w-fit p-3 rounded-md">
                <h4 className="font-bold  text-xl mb-3">Datos de la cuenta:</h4>
                <div className="grid grid-cols-2">
                  <span className="font-semibold">CVU:</span>
                  <div className="flex flex-row gap-2">
                    <span>0000168300000003939550</span>
                    <BiSolidCopy />
                  </div>

                  <span className="font-semibold">ALIAS:</span>
                  <div className="flex flex-row gap-2">
                    <span>nan.arevalo</span>
                    <BiSolidCopy />
                  </div>

                  <span className="font-semibold">NOMBRE:</span>
                  <div className="flex flex-row gap-2">
                    <span>HERNÁN ARÉVALO</span>
                    <BiSolidCopy />
                  </div>

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

    </>
  )
}
