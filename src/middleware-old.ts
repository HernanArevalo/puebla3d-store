export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
              '/checkout',
              '/checkout/adress',
              '/profile',
              '/orders'
          ]}