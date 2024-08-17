'use server';

import { CartProduct } from '@/interfaces';
import prisma from '@/lib/prisma';

interface Params {
  cart: CartProduct[];
}

export const getCartProducts = async ({ cart: productsInCart }: Params): Promise<CartProduct[]> => {
  const productsIds = productsInCart.map(product => product.id);

  try {
    // Obtiene los productos con sus detalles actuales desde la base de datos
    const products = await prisma.product.findMany({
      where: {
        id: { in: productsIds },
      },
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
        inStock: {
          include: {
            colors: true,
          },
        },
      },
    });

    // Filtra y actualiza los productos del carrito según su disponibilidad y detalles actuales
    const updatedCartProducts = productsInCart.map(cartProduct => {
      const product = products.find(p => p.id === cartProduct.id);

      if (!product || !product.inStock || product.inStock.length === 0) {
        // Si el producto no está disponible, se omite
        return null;
      }

      // Encuentra el stock adecuado basado en el color y tamaño (si aplica)
      const matchingStock = product.inStock.find(stock =>
        (!cartProduct.size || stock.size === cartProduct.size) &&
        (!cartProduct.color || stock.colors.some(c => c.name === cartProduct.color && c.stock > 0))
      );

      if (!matchingStock) {
        // Si no hay stock que coincida o el stock es 0, omite el producto
        return null;
      }

      // Actualiza el producto del carrito con los valores actuales
      return {
        ...cartProduct,
        price: matchingStock.price,
        // Actualizar otros campos si es necesario
      };
    }).filter(Boolean); // Elimina los productos no disponibles

    return updatedCartProducts as CartProduct[];

  } catch (e) {
    console.error('Failed to load cart products:', e);
    throw new Error('Failed to load cart products');
  }
};
