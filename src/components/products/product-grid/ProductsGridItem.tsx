"use client"
import { Product } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Props {
    product: Product
}

export const ProductsGridItem = ({ product }:Props) => {

    const [displayImage, setDisplayImage] = useState( product.images[0].url )

  return (
    <div className="rounded-md overflow-hidden fade-in">
        <Link href={`/product/${product.slug}`}
              className="hover:text-blue-800">
            <Image 
                src={`${displayImage}`}
                alt={product.title}
                className="w-full object-cover rounded overflow-hidden"
                width={ 500 }
                height={ 500 }
                onMouseEnter={()=>{ setDisplayImage(product.images[1].url) }}
                onMouseLeave={()=>{ setDisplayImage(product.images[0].url) }}
            />
        </Link>
        <div className="p-4 flex flex-col">
            <Link href={`/product/${product.slug}`}
                  className="hover:text-blue-800">
                { product.title }
            </Link>
            <span className="font-bold">
                ${product.price}
            </span>

        </div>
    </div>
  )
}
