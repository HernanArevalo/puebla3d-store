import { ProductInStock } from "@/interfaces";

export const checkCorrectInstockForm = ( inStock: ProductInStock[]): boolean => {
  // Recorrer cada item del array inStock
  for (const item of inStock) {
    if (
      !item.id || 
      !item.size || 
      !item.productId ||
      item.size === "" ||
      item.id === "" ||
      item.productId === ""
    ) {
      return false;
    }

    if (isNaN(item.price)) {
      return false;
    }

    for (const color of item.colors) {
      if (!color.id || !color.name || color.name === "" || color.id === "") {
        return false;
      }

      if (isNaN(color.stock)) {
        return false;
      }
    }
  }

  // Si todo está bien, devolver true
  return true;
};
