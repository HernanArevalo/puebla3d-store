"use client";

import { createUpdateCode, deleteCode } from '@/actions';
import { discountCode } from '@/interfaces'
import { formatDate } from '@/utils';
import clsx from 'clsx';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoSave, IoTicketOutline, IoTrash } from 'react-icons/io5'

interface Props {
  discount: discountCode;
}

interface discountForm {
  id:           string,
  code:         string,
  description?: string | null,
  discount:     number | any,
  expiresAt?:   Date | null | string,
  createdAt:    Date,
  updatedAt:    Date,
  isActive:     boolean,
  usageLimit?:  number | null,
  usageCount:   number,

}

export const CodeRow = ({ discount }: Props) => {
  const [hasCodeChanged, setHasCodeChanged] = useState(false)
  const [useExpiration, setUseExpiration] = useState(!!discount.expiresAt)
  const [useLimitUses, setUseLimitUses] = useState(!!discount.usageLimit)

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch

  } = useForm<discountForm>({
    defaultValues: {
      ...discount,
      expiresAt: discount.expiresAt? formatDate(discount.expiresAt) : null
    },
  });
  watch('isActive')

  const onSavingCode = async(data: discountForm) => {
    const formData = new FormData();


    if(useExpiration){
      if (data.expiresAt) {
      formData.append('expiresAt', data.expiresAt!.toString())
      }else{
        setUseExpiration(false)
      }
    }
    if(useLimitUses){
      if (data.usageLimit) {
        formData.append('usageLimit', data.usageLimit!.toString())
      }else{
        setUseLimitUses(false)
      }
    }
    formData.append('id', data.id)
    formData.append('code', data.code.toString())
    formData.append('discount', data.discount.toString())
    formData.append('isActive', data.isActive.toString())
    formData.append('usageCount', data.usageCount.toString())

    const { ok, code: updatedCode } = await createUpdateCode(formData)

    setHasCodeChanged(false)
  }

  const codeHasChanged = () => {
    setHasCodeChanged(true)
  }

  const changeActiveMode = () => {
    const isActive = getValues('isActive')

    if (isActive) {
      setValue('isActive', false)
    } else {
      setValue('isActive', true)
    }
  }

  const handleCorrectNumberValue = (event:any) => {
    let value = getValues(event)


    if (isNaN(value)) {
      value = 0;
    } else if (value <= 0) {
      value = 1;
    } else if (value > 100 && event == 'usageLimit') {
      value = 100;
    }

    setValue('discount', value); // Actualiza el valor en react-hook-form
  };


  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={discount.id}>

      <td className="pl-6 text-sm text-gray-900 font-bold py-4 whitespace-nowrap">
        <input type="text"
          className="focus:bg-puebla-blue focus:outline-none max-w-36 transition-all"
          {...register('code', { required: true, onChange: ()=>setHasCodeChanged(true) })}
          minLength={3}
          maxLength={16}
          style={{
            outline: 'none',
            boxShadow: 'none',
          }}
        />
      </td>

      <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
        {discount.id.split("-").at(-1)}
      </td>

      <td className="text-sm text-gray-900 font-bold py-4 whitespace-nowrap text-center">
        <input type="number"
          className=" focus:bg-puebla-blue focus:outline-none w-10 transition-all"
          {...register('discount', { required: true, max: 100, min: 1, maxLength: 3, onChange: ()=>{handleCorrectNumberValue('discount');setHasCodeChanged(true)} })}
          min={0}
          max={100}
          maxLength={3}
          style={{
            outline: 'none',
            boxShadow: 'none',
          }}
        />
        <span>%</span>
      </td>

      <td className="text-sm text-gray-900 font-bold py-4 whitespace-nowrap text-center">
        <div className="flex justify-center gap-3">
          <input type="checkbox" 
                 className="accent-puebla-dark transition-all cursor-pointer disabled:text-gray-500" 
                 checked={useExpiration} 
                 onChange={()=>{setUseExpiration(!useExpiration); setHasCodeChanged(true)}}
                 />
          <input type="datetime-local"
            {...register('expiresAt', { onChange: ()=>setHasCodeChanged(true) })}
            className="disabled:text-gray-500" 
            disabled={!useExpiration}
            min={new Date().toISOString().slice(0,16)}
          />
        </div>
      </td>

      <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap mx-auto text-center flex justify-center">
        <button className={
          clsx(
            "flex justify-center items-center hover:bg-gray-600 p-2 rounded-full transition-all",
            { 'bg-green-600': getValues('isActive') },
            { 'bg-red-600': !getValues('isActive') }
          )}
          onClick={()=>{changeActiveMode(); setHasCodeChanged(true)}}>
          <IoTicketOutline size={20} />
        </button>
      </td>

      <td className="text-sm text-gray-900 font-bold py-4 whitespace-nowrap text-center">
        <div className="flex justify-center gap-3">
          <input type="checkbox" className="accent-puebla-dark transition-all cursor-pointer" checked={useLimitUses} onChange={()=>{setUseLimitUses(!useLimitUses); setHasCodeChanged(true)}}/>

          <input type="number" 
                 className="w-16 focus:bg-puebla-blue focus:outline-none transition-all disabled:text-gray-500"
                 style={{
                  outline: 'none',
                  boxShadow: 'none',
                }}
                {...register('usageLimit', { min: 0, onChange: codeHasChanged })}
                min={0}
                disabled={!useLimitUses}
                onChange={()=> handleCorrectNumberValue('usageLimit')}
          />
        </div>
      </td>

      <td className="text-sm text-gray-900 font-bold py-4 whitespace-nowrap text-center">
        {discount.usageCount}
      </td>

      <td className="text-center flex md:flex-row flex-col gap-2 py-4">
        <button className="p-2 bg-red-700 rounded" onClick={()=>{deleteCode(discount)}}>
          <IoTrash color='white' />
        </button>
        <button disabled={!hasCodeChanged} 
                className={`p-2 rounded transition-all ${hasCodeChanged ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-400 cursor-default"}`} 
                onClick={handleSubmit(onSavingCode)}>
          <IoSave color='white' />
        </button>
      </td>

    </tr>
  )
}
