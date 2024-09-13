'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Product } from '@prisma/client';
import prisma from '@/lib/prisma';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  enabled: z.boolean().optional().nullable(), // Cambiado a booleano
  unique: z.boolean().optional().nullable(), // Cambiado a booleano
  useStock: z.boolean().optional(), // Cambiado a booleano
  inStock: z.array(
    z.object({
      id: z.string().uuid().optional().nullable(),
      size: z.string(),
      price: z.coerce
        .number()
        .min(0)
        .transform((val) => Number(val.toFixed(2))),
      oldPrice: z.coerce
        .number()
        .min(0)
        .transform((val) => Number(val.toFixed(2)))
        .nullable(),
      colors: z.array(
        z.object({
          id: z.string().uuid().optional().nullable(),
          name: z.string(),
          stock: z.coerce
            .number()
            .min(0)
            .transform((val) => Number(val.toFixed(0))),
        })
      ),
    })
  ),
  tags: z.string(), // Cambiado a array de cadenas
  // category: z.string().uuid(),
  category: z.string(),
});

const transformData = (formData: FormData) => {
  const data = Object.fromEntries(formData.entries()); // Cambiado para asegurar el tipo

  return {
    ...data,
    enabled: data.enabled === 'true', // Convertir a booleano
    useStock: data.useStock === 'true', // Convertir a booleano
    inStock: data.inStock ? JSON.parse(data.inStock as string) : [], // Parsear JSON a array
  };
};

export const createUpdateProduct = async (formData: FormData) => {
  const transformedData = transformData(formData);
  const productParsed = productSchema.safeParse(transformedData);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (ts) => {
      let product: Product;

      const tagsArray = rest.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase());

      // Convierte el array `inStock` en la forma esperada por Prisma
      const inStockData = rest.inStock.map((item) => ({
        id: item.id,
        size: item.size,
        price: item.price,
        oldPrice: item.oldPrice,
        colors: item.colors.map((color) => ({
          name: color.name,
          stock: color.stock,
          id: color.id ? color.id : undefined,
        })),
      }));

      if (id) {
        // update
        product = await prisma.product.update({
          where: { id },
          data: {
            title: rest.title,
            description: rest.description,
            slug: rest.slug,
            tags: {
              set: tagsArray,
            },
            enabled: rest.enabled ? rest.enabled : undefined,
            useStock: rest.useStock,
            category: rest.category,
          },
        });
      } else {
        // create
        product = await prisma.product.create({
          data: {
            title: rest.title,
            description: rest.description,
            slug: rest.slug,
            tags: {
              set: tagsArray,
            },
            enabled: rest.enabled ? rest.enabled : undefined,
            useStock: rest.useStock,
            category: rest.category,
          },
        });
      }

      // load inStock process
      for (const stock of inStockData) {
        const { colors, ...restStock } = stock;
        console.log(stock);

        if (restStock.id && product.id) {
          const dbInStock = await ts.inStock.update({
            where: {
              id: restStock.id,
            },
            data: {
              price: restStock.price,
              size: restStock.size,
            },
          });
          for (const color of colors) {
            console.log(color);
            if (color.id) {
              const dbColors = await ts.color.update({
                where: {
                  id: color.id,
                },
                data: { ...color },
              });
            } else {
              const dbColor = await prisma.color.createMany({
                data: {
                  ...color,
                  inStockId: dbInStock.id,
                },
              });
            }
          }
        }
      }

      // load images process
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);

        if (!images) {
          throw new Error('error updating images, rollingback');
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    // TODO: revalidate path
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: 'Error updating/creating',
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loadVoucherImage = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64image = Buffer.from(buffer).toString('base64');

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64image}`, {
            folder: 'vouchers',
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
