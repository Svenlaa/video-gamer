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
    session: ({ session }) => {
      session.property = 'sven'
      return session
    }
  },
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // email | password
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'text', placeholder: 'JohnDoe' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) throw Error('Invalid')

        const { email, password } = credentials
        const user = await trpcClient.mutation('auth.login', {
          email,
          password
        })
        if (!user) throw Error('Invalid email or password')

        return user
      }
    })
  ],
  secret: env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
