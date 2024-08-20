'use server';

import { auth } from '@/auth.config';
import type { Address, ShippingMethod } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  prize: number;

}

export const placeOrder = async (
  productsIds: ProductToOrder[],
  address: Address
) => {

  // user verification
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario',
    };
  }

  address.shippingMethod = address.shippingMethod.toUpperCase() as ShippingMethod;

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds.map((p) => p.productId),
      },
    },
    include: {
      inStock: {
        include: {
          colors: true,
        },
      },
    },
  });

  // calculate amount
  const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);

  // totals: tax, subtotal, and total
  const { subtotal, tax, total } = productsIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      // Encuentra el objeto inStock con el tamaño correcto
      const inStock = product.inStock.find((stock) => stock.size === item.size);

      if (!inStock)
        throw new Error(
          `El tamaño ${item.size} no está disponible para el producto ${product.title}`
        );

      // Encuentra el color correcto
      const color = inStock.colors.find((c) => c.name === item.color);

      if (!color)
        throw new Error(
          `El color ${item.color} no está disponible para el tamaño ${item.size} en el producto ${product.title}`
        );

      // Calcula el subtotal basado en el precio y la cantidad
      const subtotal = inStock.price * productQuantity;

      totals.subtotal += subtotal;
      totals.tax += subtotal * 0.1;
      totals.total += subtotal * 0.9;

      return totals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  // create transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. update products stock
      const updatedProductPromises = products.map(async (product) => {
        const productQuantity = productsIds
          .filter((p) => p.productId === product.id)
          .reduce((act, item) => item.quantity + act, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        // Encuentra los inStock correspondientes al producto
        const inStockItems = product.inStock;

        const updateColorStockPromises = inStockItems.map((inStockItem) => {
          // Filtra los productos que coinciden en color y tamaño
          const colorItems = productsIds.filter(
            (p) =>
              p.productId === product.id &&
              p.size === inStockItem.size &&
              inStockItem.colors.some((color) => color.name === p.color)
          );

          return colorItems.map((colorItem) => {
            const colorToUpdate = inStockItem.colors.find(
              (color) => color.name === colorItem.color
            );

            if (!colorToUpdate) {
              throw new Error(
                `El color ${colorItem.color} no existe para el tamaño ${colorItem.size} del producto ${product.title}`
              );
            }

            if (colorToUpdate.stock < colorItem.quantity) {
              throw new Error(
                `No hay suficiente stock del color ${colorItem.color} para el tamaño ${colorItem.size} del producto ${product.title}. Stock disponible: ${colorToUpdate.stock}, Cantidad solicitada: ${colorItem.quantity}`
              );
            }

            return tx.color.updateMany({
              where: {
                inStockId: inStockItem.id,
                name: colorItem.color,
              },
              data: {
                stock: {
                  decrement: colorItem.quantity,
                },
              },
            });
          });
        });

        // Espera a que todas las actualizaciones del stock del color se completen
        await Promise.all(updateColorStockPromises.flat());

        // Aquí puedes hacer cualquier otra actualización al producto si es necesario
        return tx.product.update({
          where: { id: product.id },
          data: {
            // Cualquier otra propiedad del producto que necesites actualizar
          },
          include: {
            inStock: {
              include: {
                colors: true,
              },
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductPromises);

      updatedProducts.forEach((product) => {
        product.inStock.forEach((inStockItem) => {
          inStockItem.colors.forEach((color) => {
            if (color.stock < 0) {
              throw new Error(
                `No stock: ${product.title}, Size: ${inStockItem.size}, Color: ${color.name}`
              );
            }
          });
        });
      });

      // 2. create order - header - details
      const order = await tx.order.create({
        data: {
          userId: userId,
          items: itemsInOrder,
          subTotal: subtotal,
          tax: tax,
          total: total,
          shippingMethod: address.shippingMethod as typeof shippingMethod,
          shippingAmount: address.shippingMethod == 'CADETE'? 3000:0,
          OrderItems: {
            createMany: {
              data: productsIds.map((p) => {
                const product = products.find(
                  (product) => product.id === p.productId
                );
                const inStockItem = product?.inStock.find(
                  (stock) => stock.size === p.size
                );
                const colorItem = inStockItem?.colors.find(
                  (color) => color.name === p.color
                );

                if (!product || !inStockItem || !colorItem) {
                  throw new Error(
                    `No se encontró el producto, tamaño o color para la orden.`
                  );
                }

                return {
                  quantity: p.quantity,
                  size: p.size,
                  color: p.color,
                  productId: p.productId,
                  price: inStockItem.price, // Precio asociado al tamaño
                };
              }),
            },
          },
        },
      });

      // Validate prize zero, and send error

      // 3. create order address
      const { country, province, shippingMethod, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          provinceId: province,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updatedProducts: updatedProducts,
        OrderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (e: any) {
    return {
      ok: false,
      message: e.message,
    };
  }
};
