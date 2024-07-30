'use server';

import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true,
        inStock: {
          orderBy: {
            price: 'asc',
          },
          include: {
            colors: true
          }
        },
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    const { ProductImage, ...rest } = product;

    return {
      ...rest,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    throw new Error('Erroy loading product by slug');
  }
};
