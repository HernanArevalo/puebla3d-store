'use server';

import { discountCode } from '@/interfaces';
import prisma from '@/lib/prisma';
import { create } from 'zustand';



export const getCodes = async () => {

  try {

    const codes = await prisma.discountCode.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });

    return codes as discountCode[];
  } catch (e) {
    throw new Error('load failed');
  }
};
