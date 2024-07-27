'use server';

import { discountCode } from '@/interfaces';
import prisma from '@/lib/prisma';



export const getCodes = async () => {

  try {

    const codes = await prisma.discountCode.findMany();

    return codes as discountCode[];
  } catch (e) {
    throw new Error('load failed');
  }
};
