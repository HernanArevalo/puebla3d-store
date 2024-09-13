import { ProductColor, ProductInStock } from '@/interfaces';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importa el ícono para eliminar

interface Props {
  inStock: ProductInStock[];
  onChange: (stock: ProductInStock[]) => void;
  productId: string;
}

export const SizesTable = ({ inStock, onChange, productId }: Props) => {
  const [stock, setStock] = useState<ProductInStock[]>(inStock);

  const handleAddSize = () => {
    const newSize = { size: '', price: 0, oldPrice: null, colors: [], productId: productId, id: new Date().toString() };
    const updatedStock = [...stock, newSize];
    setStock(updatedStock);
  };

  const handleAddColor = (sizeIndex: number) => {
    const newStock = [...stock];
    newStock[sizeIndex].colors.push({ id: crypto.randomUUID(), name: '', stock: 0, inStockId: newStock[sizeIndex].id });
    setStock(newStock);
    onChange(newStock);
  };

  const handleChangeSize = (
    index: number,
    key: keyof ProductInStock,
    value: string | number
  ) => {
    const newStock = [...stock];
  
    if (key === "size") {
      newStock[index].size = value as string;
    } else if (key === "price" ) {

      newStock[index].price = value as number;
    } else if (key === "oldPrice") {
      newStock[index].oldPrice = value as number | null;
    }
  
    setStock(newStock);
    onChange(newStock);
  };

  const handleChangeColor = (
    sizeIndex: number, 
    colorIndex: number, 
    key: keyof ProductColor, 
    value: string | number
  ) => {
    const newStock = [...stock];
  
    // Verifica la clave y asigna el valor apropiado
    switch (key) {
      case 'name':
        newStock[sizeIndex].colors[colorIndex][key] = value as string;
        break;
      case 'stock':
        newStock[sizeIndex].colors[colorIndex][key] = value as number;
        break;
      default:
        break; // Manejar otros casos si es necesario
    }
  
    setStock(newStock);
    onChange(newStock); // Actualiza el stock en el formulario
  };

  const handleRemoveSize = (index: number) => {
    const newStock = stock.filter((_, i) => i !== index);
    setStock(newStock);
    onChange(newStock); // Actualiza el stock en el formulario
  };

  const handleRemoveColor = (sizeIndex: number, colorIndex: number) => {
    const newStock = [...stock];
    newStock[sizeIndex].colors.splice(colorIndex, 1);
    setStock(newStock);
    onChange(newStock); // Actualiza el stock en el formulario
  };

  return (
    <div>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Old Price</th>
            <th className="border px-4 py-2">Colors</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item, sizeIndex) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={item.size}
                  onChange={(e) => handleChangeSize(sizeIndex, 'size', e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleChangeSize(sizeIndex, 'price', parseFloat(e.target.value))}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={item.oldPrice ?? ''}
                  onChange={(e) => handleChangeSize(sizeIndex, 'oldPrice', parseFloat(e.target.value))}
                  className="border px-2 py-1 w-full"
                />
              </td>
              <td className="border px-4 py-2">
                {item.colors.map((color, colorIndex) => (
                  <div key={color.id} className="mb-2 flex items-center">
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => handleChangeColor(sizeIndex, colorIndex, 'name', e.target.value)}
                      placeholder="Color"
                      className="border px-2 py-1 mr-2 w-24"
                    />
                    <input
                      type="number"
                      value={color.stock}
                      onChange={(e) => handleChangeColor(sizeIndex, colorIndex, 'stock', parseInt(e.target.value))}
                      placeholder="Stock"
                      className="border px-2 py-1 w-16"
                    />
                    <FaTimes
                      onClick={() => handleRemoveColor(sizeIndex, colorIndex)}
                      className="text-red-500 cursor-pointer ml-2"
                      title="Remove color"
                    />
                  </div>
                ))}
                <button
                  onClick={() => handleAddColor(sizeIndex)}
                  className="text-blue-500 hover:underline mt-2"
                >
                  + Add Color
                </button>
              </td>
              <td className="border px-4 py-2">
                <FaTimes
                  onClick={() => handleRemoveSize(sizeIndex)}
                  className="text-red-500 cursor-pointer"
                  title="Remove size"
                />
              </td>
            </tr>
          ))}
          <tr>
          <td className="border px-4 py-2 flex justify-center">
              <button
                onClick={handleAddSize}
                className="text-blue-500 hover:underline text-center"
                >
                  + Add Size
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
