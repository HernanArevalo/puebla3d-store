export const revalidate = 60

import { redirect } from "next/navigation";

import { Category } from "@prisma/client";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";

interface Props {
  params: {
    category: string
  },
  searchParams: {
    page?: string;
  }
}

export default async function categoryPage({ params, searchParams }: Props ) {
  
  const { category } = params 

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const {products, totalPages, currentPage} = await getPaginatedProductsWithImages({
    page,
    category: category
  });


  if( products.length === 0){
    redirect(`/category/${category}`)
  }

  return (
    <>
      <Title
        title={category}
        className="mt-14 mb-14 capitalize"
      />

      <ProductsGrid products={products}/>


      <Pagination totalPages={totalPages}/>
    </>

  
  )
}