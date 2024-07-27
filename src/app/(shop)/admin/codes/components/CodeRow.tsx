"use client";

import { discountCode } from '@/interfaces'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoSave, IoTicketOutline, IoTrash } from 'react-icons/io5'

interface Props {
  discount: discountCode;
}

export const CodeRow = ({discount}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
  } = useForm<discountCode>({
    defaultValues: {
      ...discount,
    },
  });

  const onDeletingCode = () => {

  }
  const onSavingCode = () => {

  }

  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={discount.id}>

      <td className="pl-6 text-sm text-gray-900 font-bold py-4 whitespace-nowrap">
        <input type="text" 
               className=" focus:bg-puebla-blue focus:outline-none"
                          {...register('code', { required: true })}

               />
      </td>

      <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
        {discount.id.split("-").at(-1)}
      </td>

      <td className="text-sm text-gray-900 font-bold py-4 whitespace-nowrap text-center">
        <input type="number"
               className=" focus:bg-puebla-blue focus:outline-none w-16"
                          {...register('discount', { required: true })}

               />
        <span>%</span>
      </td>

      <td className="text-sm text-gray-900 font-bold py-4 whitespace-nowrap text-center">
        <input type="datetime-local" 
                    {...register('expiresAt', { required: true })}

        />
      </td>

      <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap mx-auto text-center">
        <span className="flex justify-center">
        {discount.isActive ?
          <IoTicketOutline color='green' size={20} />
          :
          <IoTicketOutline color='red' size={20} />
        }

        </span>
      </td>

      <td className="text-sm text-gray-900 font-bold py-4 whitespace-nowrap text-center">
        <div className="flex flex-row justify-center align-center gap-3 pl-10">
          <input type="checkbox" className="mr-2"/>
          <input type="number" className="w-16 focus:bg-puebla-blue focus:outline-none"
                      {...register('usageLimit', { required: true })}

          />
          
        </div>
      </td>

      <td className="text-sm text-gray-900 font-bold py-4 whitespace-nowrap text-center">
        {discount.usageCount}
      </td>

      <td className="text-center flex md:flex-row flex-col gap-2 py-4">
        <button className="p-2 bg-red-800 rounded" onClick={onDeletingCode}>
          <IoTrash color='white' />
        </button>
        <button className="p-2 bg-blue-800 rounded" onClick={onSavingCode}>
          <IoSave color='white' />
        </button>
      </td>

    </tr>
  )
}
