import { getCodes } from "@/actions";
import { CodeRow } from "./CodeRow";

export const CodesTable = async() => {

  const codes = await getCodes();


  return (
    <table className="min-w-full rounded overflow-hidden">
          <thead className="bg-puebla-green border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Código
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Id
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Descuento
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Vencimiento
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Activo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Límite
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Usos
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            { codes.map(discount => (
              <CodeRow key={discount.id} discount={ discount }/>

            ))

            }



          </tbody>
        </table>

  )
}
