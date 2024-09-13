"use client";

import { SweetAlert } from "@/components";
import { aliasBanco, cbuBanco, currencyFormat, discount, titularBanco } from "@/utils";
import { BiSolidCopy } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDropzone } from 'react-dropzone';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";
import { uploadTransferImage } from "@/actions";
import { Order } from "@/interfaces";

interface Params {
  productsPrice: number;
  shippingPrice: number;
  order: Order

  paymentMethodSelected: string | undefined;
  setPaymentMethodSelected: (method: string | undefined) => void
}

export const TransferPayment = ({ productsPrice, shippingPrice, paymentMethodSelected, order, setPaymentMethodSelected }: Params) => {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    multiple: false,
    onDrop: (files) => {
      setAcceptedFiles(files); // Guarda los archivos aceptados en el estado
    }
  });

  const priceMercadopago = productsPrice + shippingPrice
  const priceTransfer = (productsPrice + shippingPrice) * (1 - discount)

  const copyToClipboard = (toCopy: string) => {
    navigator.clipboard.writeText(toCopy).then(() => {
      SweetAlert({ title: 'Copiado en el portapapeles!' })
    }).catch((err) => {
      console.error('Error al copiar el texto: ', err);
    });
  };

  const onSaveTransferImage = () => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
  
      // Convertir el archivo a base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        // Llamar a la Server Action pasando la imagen en base64
        const {ok} = await uploadTransferImage(order.id, base64);

        if (ok) {
          setPaymentMethodSelected(undefined)
        }
      };
      reader.onerror = (error) => {
        console.error('Error al convertir el archivo a base64: ', error);
      };
    }

  }

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
              <div className="bg-white p-3 rounded-md w-full">
                <div className="grid grid-cols-2">
                  <span className='mt-4 text-xl font-semibold'>Total:</span>
                  <span className='mt-4 text-xl text-right font-semibold'>{currencyFormat((productsPrice + shippingPrice) * (1 - discount))}</span>
                  <span className="font-semibold text-puebla-dark">Descuento ({discount * 100}%)</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-md w-full">
                <h4 className="font-bold  text-xl mb-3">Datos de la cuenta:</h4>

                <div className="flex flex-row justify-between items-center w-full">
                  <span className="font-semibold">CVU:</span>
                  <div className="flex flex-row gap-2">
                    <span>{cbuBanco}</span>
                    <BiSolidCopy className="text-puebla-dark cursor-pointer" onClick={() => copyToClipboard(cbuBanco)} />
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center w-full">
                  <span className="font-semibold">ALIAS:</span>
                  <div className="flex flex-row gap-2 items-center">
                    <span>{aliasBanco}</span>
                    <BiSolidCopy className="text-puebla-dark cursor-pointer" onClick={() => copyToClipboard(aliasBanco)} />
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center w-full">
                  <span className="font-semibold">NOMBRE:</span>
                  <div className="flex flex-row gap-2 items-center uppercase">
                    <span>{titularBanco}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-md w-full border">
                <h4 className="font-bold  text-xl mb-3">Enviar comprobante:</h4>
                
                <section className="container">
                  <div {...getRootProps({ className: 'dropzone border-2 bg-gray-200 flex justify-center items-center p-3 text-center border-dashed border-gray-300 cursor-pointer'})}>
                    <input {...getInputProps()} />
                    <p>Agregá la imagen del comprobante acá!</p>
                  </div>
                  { acceptedFiles.length > 0 &&
                  <aside className="mt-3 flex flex-col">
                    <h4 className="font-semibold">Archivo:</h4>
                    <span className="break-words">
                      {acceptedFiles[0].name}
                    </span>
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <button className="btn-dark mt-5" onClick={onSaveTransferImage}>Enviar comprobante</button>
                    </div>
                  </aside>
                  }
                </section>
              </div>
            </div>

          </div>
          :
          <div>
            <h2 className="text-xl my-2 font-semibold">Pago con MercadoPago:</h2>
          </div>
        }
      </div>

    </>
  )
}
