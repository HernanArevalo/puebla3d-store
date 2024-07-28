"use server";


import { discountCode } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const deleteCode = async(code:discountCode) => {
  try {
    const deletedCode = await prisma.discountCode.delete({
      where: {
        id: code.id
      }
    })

    revalidatePath('/admin/codes')

    return {
      ok: true,
      code: deletedCode
    }
  } catch (error) {
    console.log({
      ok:false,
      message: error
    });
  }
}