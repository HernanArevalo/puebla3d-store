'use server';
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async(id:string) => {

  const session = await auth();

  if( !session?.user){
    return {
      ok: false,
      message: 'Must be authenticated'
    }
  }

  try{
    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        OrderAddress: true,
        OrderItems: {
          select: {
            price: true,
            quantity: true,
            size: true,
            color: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if ( !order ) throw `${ id } doesn't exist`

    if ( session.user.role === 'user'){
      if ( session.user.id !== order.userId ) {
        throw `${ id } doesn't match with user`
      }
    }

    return {
      ok: true,
      order: 
            { ...order,
              OrderItems: order.OrderItems.map(item=> ({
                title:    item.product.title,
                slug:    item.product.slug,
                quantity: item.quantity,
                price:    item.price,
                size:     item.size,
                color:    item.color,
                image:    item.product.ProductImage[0].url
              }))
            }
    }
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Order doesn't exist"
    }
  }
}