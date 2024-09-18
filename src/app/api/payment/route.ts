import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextRequest } from "next/server";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: NextRequest) {
  console.log('POST CALLED');
  const body = await request.json().then((data) => data as {data: {id:string}})
  console.log({body});

  const payment = await new Payment(client).get({id: body.data.id})
  console.log({payment});

  return Response.json({
    success: true
  })
}