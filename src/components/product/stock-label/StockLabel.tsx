'use client'
import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface Props {
  slug: string
}

export const StockLabel = ({slug}: Props) => {

  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getStock = async() => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
    setIsLoading(false)
  }

  useEffect(()=>{
    getStock();

  })

  return (
    <>
    { isLoading ?
      <h1 className={`${ titleFont.className } antialiased font-medium text-lg animate-pulse bg-gray-200`}>
        &nbsp;
      </h1>
      :
      <h1 className={`${ titleFont.className } antialiased font-medium text-lg`}>
        stock: {stock}
      </h1>
    }
    </>
    
  )
}
