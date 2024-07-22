"use server"

import prisma from "@/lib/prisma"

export const setTransactionId = async(id:string, transactionId:string) =>{

  try {
    const order = await prisma.order.update({
      where: { id },
      data: { transactionId }
    })

    if (!order) {
      return {
        ok: false,
        message: `No se encontró la orden con el id ${id}`
      }
    }
    
    
    return {
      ok: true,
      order: order
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el id de la transacción'
    }
  }

}