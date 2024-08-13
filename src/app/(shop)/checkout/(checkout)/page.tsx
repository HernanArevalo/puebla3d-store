import { Title } from "@/components";
import Link from "next/link";
import { PlaceOrder, ProductsInCart } from "./ui";


export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-start mb-24 px-10 sm:px-10">
      
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Orden"/>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <Link href='/cart' className="mb-5 underline">
            Editar carro
            </Link>

          <ProductsInCart />
          </div>



          {/* Checkout */}
          <PlaceOrder />

        </div>
      </div>

    </div>
  );
}