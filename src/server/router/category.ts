import { z } from 'zod'
import { createRouter } from './context'

export const categoryRouter = createRouter()
  .query('getAll', {
    resolve: async ({ ctx: { prisma } }) => {
      return await prisma.category.findMany({
        include: { games: true }
      })
    }
  })
  .query('getBySlug', {
    input: z.string(),
    resolve: async ({ input, ctx: { prisma } }) => {
      return await prisma.category.findFirst({
        where: { slug: input },
        include: { games: true }
      })
    }
  })
