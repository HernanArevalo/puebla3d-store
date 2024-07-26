'use server';

import prisma from '@/lib/prisma';



export const getCodes = async () => {

  try {

    const codes = await prisma.discountCode.findMany();

    return codes;
  } catch (e) {
    throw new Error('load failed');
  }
};
