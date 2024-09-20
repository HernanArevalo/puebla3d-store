import NextAuth, { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './lib/prisma';

const authenticatedRoutes = [
  '/checkout',
  '/checkout/adress',
  '/profile',
  '/orders'
];

export const authConfig: NextAuthConfig = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.data as any;

      let existingUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            name: session.user.name || '',
            email: session.user.email,
            image: session.user.image || 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'
          },
        });
      }

      session.user = { 
        ...session.user, 
        ...existingUser 
      };

      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: "https://accounts.google.com/o/oauth2/auth?prompt=select_account",
    })
  ],
  trustHost: true
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
