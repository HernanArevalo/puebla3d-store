'use server';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const uploadTransferImage = async (orderId: string, base64Image: string) => {
  try {
    const imageCloud = await cloudinary.uploader.upload(base64Image, {folder: `puebla/comprobantes/${orderId}`});

    if (!imageCloud) {
      throw new Error('Error al actualizar imágenes, rolling back');
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionImage: imageCloud.secure_url,
        status: 'PROCESSING',
        isPaid: true,
        paidAt: new Date()
      },
    });

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
      order: updatedOrder,
    };
  } catch (error) {
    console.error(error);
    return {
      ok:false,
      message: 'error uploading image on db'
    };
  }
}