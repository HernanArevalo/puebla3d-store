import { Title, SubTitle } from "@/components";

export default function HelpPage() {
  return (
    <div className="mb-10">
      <Title title="Preguntas frecuentes:" />

      <div className="flex flex-col gap-3">
        <article className="bg-white rounded-xl p-5">
          <SubTitle title="¿Desde dónde se puede comprar?" className="font-normal text-xl" />
          <p className="text-xl">
            Actualmente podés realizar tu compra desde cualquier parte de Argentina! Hacemos envíos a todo el país.
            <br />
            Tenemos nuestra base en Córdoba, desde donde enviamos todos nuestros productos.
            Si estás en Córdoba Capital, podemos coordinar la entrega a través de cadete, o podés pasar a buscar tu compra por nuestra dirección!
          </p>
        </article>

        <article className="bg-white rounded-xl p-5">
          <SubTitle title="Una vez hecha la compra, ¿cuánto demora la entrega?" className="font-normal text-xl" />
          <p className="text-xl">
            Una vez que
          </p>
        </article>
      </div>
    </div>
  );
}