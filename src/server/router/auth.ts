import { createRouter } from './context'
import { z } from 'zod'
import bcrypt, { compare } from 'bcrypt'
import { User } from '.prisma/client'

export const authRouter = createRouter()
  .mutation('login', {
    input: z.object({
      email: z.string(),
      password: z.string()
    }),
    async resolve({ input, ctx: { prisma } }) {
      const existingUser = await prisma.user.findFirst({
        where: { email: input.email }
      })
      if (!existingUser?.password) return null
      const match = await bcrypt.compare(input.password, existingUser?.password)
      return match ? existingUser : null
    }
  })
  .mutation('register', {
    input: z.object({
      email: z.string(),
      password: z.string()
    }),
    async resolve({ input, ctx: { prisma } }) {
      const hash = await bcrypt.hash(input.password, 10)
      const user = prisma.user.create({
        data: { email: input.email, password: hash }
      })
      return user
    }
  })
