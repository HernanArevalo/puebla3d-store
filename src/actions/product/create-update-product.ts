'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Gender, Product, Size } from '@prisma/client';
import prisma from '@/lib/prisma';

import {v2 as cloudinary} from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

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

      if (id) {
        // update
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // load images process
      if ( formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);

        if (!images) {
          throw new Error('error updating images, rollingback')
        }

        await prisma.productImage.createMany({
          data: images.map(image => ({
            url: image!,
            productId: product.id
          }))
        })

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
      product: prismaTx.product
    };
  } catch (e){
    return{
      ok:false,
      message: 'Error updating/creating'
    }
  }
};


const uploadImages = async( images: File[]) => {

  try {
    const uploadPromises = images.map( async(image) => {

      try {
        const buffer = await image.arrayBuffer();
        const base64image = Buffer.from(buffer).toString('base64');
  
        return cloudinary.uploader.upload(`data:image/png;base64,${ base64image }`)
          .then( r => r.secure_url)
  
          
        } catch (error) {
          console.log(error);
          return null
        }
    })

    const uploadedImages = await Promise.all( uploadPromises )
    return uploadedImages
        

  } catch (error) {
    console.log(error);
    return null
  }
}