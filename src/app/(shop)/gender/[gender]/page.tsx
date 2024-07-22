export const revalidate = 60

import { redirect } from "next/navigation";

import { Gender } from "@prisma/client";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";

interface Props {
  params: {
    gender: string
  },
  searchParams: {
    page?: string;
  }
}

export default async function GenderPage({ params, searchParams }: Props ) {
  
  const { gender } = params 


  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const {products, totalPages, currentPage} = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender
  });


  if( products.length === 0){
    redirect(`/gender/${gender}`)
  }


  return (
    <>
      <Title
        title="Store"
        subtitle={gender}
        className="mb-2 capitalize"
      />

      <ProductsGrid products={products}/>


      <Pagination totalPages={totalPages}/>
    </>

  
  )
}