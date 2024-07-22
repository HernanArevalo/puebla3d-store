'use server';
import { PayPalOrderStatusResponse } from '@/interfaces';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';



export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener token de verificación',
    };
  };

  const resp = await verifyPaypalPayment(paypalTransactionId, authToken)

  if (!resp) {
    return{
      ok: false,
      message: 'Error verificando el pago'
    }
  }

  const { status, purchase_units } = resp
  const { invoice_id: orderId } = purchase_units[0]

  if ( status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Todavía no se ha pagado en PayPal'
    }
  }

  try {

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })

    // TODO: Revalidate path
    revalidatePath(`/orders/${ orderId }`)

    return{
      ok: true
    }
    
  } catch (error) {
    console.log(error);
    return{
      ok: false,
      message: '500 - El pago no se pudo realizar'
    }
  }
  
};



const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(PAYPAL_OAUTH_URL, { ...requestOptions, cache: 'no-store'}).then((r) =>
      r.json()
    );
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};



const verifyPaypalPayment = async( 
  paypalTransactionId: string, 
  bearerToken: string 
): Promise<PayPalOrderStatusResponse | null> => {

  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    `Bearer ${bearerToken}`
  );

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
    
    const response = await fetch( paypalOrderUrl, { ...requestOptions, cache: 'no-store'} ).then(r => r.json())
    return response

  } catch (error) {
    console.log(error)
    return null
  }
};
