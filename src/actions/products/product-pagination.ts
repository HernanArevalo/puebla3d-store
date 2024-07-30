'use server';

import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: string;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  category
}: PaginationOptions) => {

  if (isNaN(Number(page)) || page < 1 ) page = 1;

  try {

    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        category: category
      },
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
        // inStock: {
        //   include: {
        //     colors: true
        //   }
        // },
        // category: { }
      },  
    });

    const productsQuantity = await prisma.product.count({
      where: {
        category: category
      }
    });
    const totalPages = Math.ceil(productsQuantity / take);

    const productsWithDetails = await Promise.all(products.map(async (product) => {
      const allColors = new Set<string>();
      let minPrice = Infinity;
  
      const productStock = await prisma.inStock.findMany({
        where: {
          productId: product.id
        }
      });
  
      productStock.forEach(stock => {
        if (stock.price < minPrice) minPrice = stock.price;
      });

      const { ProductImage, ...productRest} = product 
  
      return {
        ...productRest,
        images: product.ProductImage.map(image => image.url),
        colors: Array.from(allColors),
        price: minPrice,
      };
    }));
  
    return {
      currentPage: page,
      totalPages: totalPages,
      products: productsWithDetails,
    
    };

  } catch (e) {
    throw new Error('load failed');
  }
};
