import { createRouter } from './context'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

export const authRouter = createRouter()
  .mutation('login', {
    input: z.object({
      userString: z.string(),
      password: z.string()
    }),
    async resolve({ input, ctx: { prisma } }) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email: input.userString }, { name: input.userString }]
        }
      })
      if (!existingUser?.password) return null
      const match = await bcrypt.compare(input.password, existingUser?.password)
      return match ? existingUser : null
    }
  })
  .mutation('register', {
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string()
    }),
    async resolve({ input, ctx: { prisma } }) {
      const existingUser = await prisma.user.findFirst({
        where: { email: input.email }
      })
      if (existingUser) throw Error('Account already exists')
      const hash = await bcrypt.hash(input.password, 10)
      const user = prisma.user.create({
        data: {
          id: randomUUID(),
          email: input.email,
          password: hash,
          name: input.name
        }
      })
      return user
    }
  })
