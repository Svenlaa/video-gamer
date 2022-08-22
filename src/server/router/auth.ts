import { createRouter } from './context'
import { z } from 'zod'

export const authRouter = createRouter()
  .mutation('login', {
    input: z.object({
      email: z.string(),
      password: z.string()
    }),
    async resolve({ input, ctx: { prisma } }) {
      console.log('sup:', input.password)
      const existingUser = await prisma.user.findFirst({
        where: { email: input.email, password: input.password }
      })
      console.log('hey', existingUser)
      return existingUser
    }
  })
  .mutation('register', {
    input: z.object({
      email: z.string(),
      password: z.string()
    }),
    async resolve({ input, ctx: { prisma } }) {
      console.log(input.password)
      const user = await prisma.user.create({
        data: { email: input.email, password: input.password }
      })
      return user
    }
  })
