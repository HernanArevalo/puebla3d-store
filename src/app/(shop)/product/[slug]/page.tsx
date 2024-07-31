export const revalidate = 10080;

import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow } from "@/components";
import { AddToCart } from './ui/AddToCart';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  const metadataBase = publicRuntimeConfig.metadataBase || 'http://localhost:3000';

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: product?.images.map(image => ({
        url: `${metadataBase}/products/${image}`,
        width: 800,
        height: 600,
        alt: product?.title ?? 'Producto',
      })) ?? [],
    },
  };
}

export default async function ProductPage({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug)

  if (!product || !product?.enabled ) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3 ">

      {/* Slideshow */ }
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow 
          title={ product.title }
          images={ product.images }
          className="block md:hidden"
        />
        
        {/* Desktop Slideshow */}
        <ProductSlideshow 
          title={ product.title }
          images={ product.images }
          className="hidden md:block h-full max-h-[90vh]"
        />
      </div>

      {/* Details  */}
      <div className="col-span-1 px-5">
        
        {/* { product.inStock.length > 0 && 
          <StockLabel slug={product.slug}/>
        } */}

        <AddToCart product={product}/>

        {/* Description */}
        <h3 className="font-bold text-lg">Descripción</h3>
        <p className="font-light text-base text-justify">{product.description}</p>


      </div>

    </div>
  );
}