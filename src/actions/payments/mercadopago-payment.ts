"use server";
import { Order } from '@/interfaces';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export const mercadopagoPayment = async(order:Order) => {


  const itemsParsed = order.OrderItems!.map(items => ({
          id: items.slug,
          title: items.title,
          quantity: items.quantity,
          unit_price: 1
  }))

  const preference = await new Preference(client)
    .create({
    body: {
      items: itemsParsed
    }
  })

  redirect(preference.sandbox_init_point!)
}


