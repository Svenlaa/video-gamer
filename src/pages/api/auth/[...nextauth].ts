import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'
import { env } from '../../../env/server.mjs'
import { trpcClient } from '../../../utils/trpc'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },

  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    //Login with email/password
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'text', placeholder: 'JohnDoe' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) throw Error('Big oof')
        const { email, password } = credentials
        console.log(password)
        const user = await trpcClient.mutation('auth.login', {
          email,
          password
        })
        if (!user) throw Error('invalid login stuffs')
        return user
      }
    })
  ],
  secret: env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
