export const revalidate = 0;

import { Title } from '@/components';
import { NewCodeButton, CodesTable } from '@/components/discount-codes';


export default function OrdersPage() {

  return (
    <>
      <Title title="Códigos de descuento" />

      <div className="flex justify-end mb-5">
        <NewCodeButton />
      </div>

      <div className="mb-10">
        <CodesTable />
      </div>
    </>
  );
}