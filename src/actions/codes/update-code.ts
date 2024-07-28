"use server"
import { discountCode } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const codeSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  code: z.string(),
  description: z.string().optional().nullable(),
  discount: z.coerce.number().min(0).transform(num => Number(num.toFixed(0))),
  expiresAt: z.string().optional().nullable().transform(str => str ? new Date(str) : null),
  isActive: z.string().transform(str => str === 'true'),
  usageLimit: z.coerce.number().optional().nullable().transform(str => str ? str : null),
});

export const createUpdateCode = async(formData: FormData) => {
  const data = Object.fromEntries(formData);
  const codeParsed = codeSchema.safeParse(data);

  if (!codeParsed.success) {
    console.log(codeParsed.error);
    return { ok: false };
  }

  const code = codeParsed.data;
  const { id, ...rest } = code;

  try{
    let code: discountCode

    if (id){
      code = await prisma.discountCode.update({
        where: { id },
        data: {
          ...rest,
          updatedAt: new Date()
        }
      })
    }else{
      code = await prisma.discountCode.create({
        data: {
          ...rest,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      })
    }

    revalidatePath('/admin/codes')
    return {
      ok: true,
      code: code
    }
  }catch (e){
    return{
      ok:false,
      message: 'Error updating/creating'
    }
  }
};