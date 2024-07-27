export const revalidate = 0;

import { Title } from '@/components';
import Link from 'next/link';
import { CodesTable } from './components';


export default function OrdersPage() {

  return (
    <>
      <Title title="Códigos de descuento" />

      <div className="flex justify-end mb-5">
        <Link href='/admin/product/new' className="btn-dark">
          Nuevo código
        </Link>
      </div>

      <div className="mb-10">
        <CodesTable />
      </div>
    </>
  );
}