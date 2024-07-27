"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const generateRandomCode = () => {
  return Math.floor(100 + Math.random() * 900).toString();
}

export const createCode = async () => {
  try {
    let uniqueCode = generateRandomCode();

    let codeExists = await prisma.discountCode.findUnique({
      where: {
        code: uniqueCode,
      },
    });

    while (codeExists) {
      uniqueCode = generateRandomCode();
      codeExists = await prisma.discountCode.findUnique({
        where: {
          code: uniqueCode,
        },
      });
    }


    const code = await prisma.discountCode.create({
      data: {
        code: uniqueCode,
        discount: 10
      },
    });

    revalidatePath('/admin/codes');

    return {
      ok: true,
      code,
    };
  } catch (error) {
    return {
      ok: false,
      message: error,
    };
  }
};
