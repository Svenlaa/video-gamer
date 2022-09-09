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
    session: async ({ session }) => {
      if (!session.user?.email) return session

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true }
      })

      const roles = (user?.role as string[]) || []

      // @ts-ignore
      session.user.role = roles

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
        userString: {
          label: 'username or email',
          type: 'text',
          placeholder: 'JohnDoe'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) throw Error('Invalid')

        const { userString, password } = credentials
        const user = await trpcClient.mutation('auth.login', {
          userString,
          password
        })
        if (!user) throw Error('Invalid email, username or password')

        return user
      }
    })
  ],
  secret: env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
