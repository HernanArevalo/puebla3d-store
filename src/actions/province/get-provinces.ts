'use server';

import { Province } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getProvinces = async () => {
  try {
    const provinces: Province[] = await prisma.province.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return provinces;
  } catch (error) {
    console.log(error);

    return [];
  }
};
