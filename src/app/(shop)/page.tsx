export const revalidate = 60;

import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductsGrid, Title } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages, currentPage } =
    await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect('/');
  }

  console.log(products);

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />

      <ProductsGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
