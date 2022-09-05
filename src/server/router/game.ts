import { createRouter } from './context'
import { z } from 'zod'

export const gameRouter = createRouter()
  .mutation('create', {
    input: z.object({
      coverImg: z.string(),
      title: z.string(),
      slug: z.string(),
      releaseDate: z.date(),
      categorySlug: z.string()
    }),
    resolve: async ({ input, ctx: { prisma } }) => {
      const existingGame = await prisma.game.findFirst({
        where: { title: input.title }
      })
      if (existingGame) throw Error('Game already exists')
      return prisma?.game.create({
        data: {
          title: input.title,
          coverImg: input.coverImg,
          slug: input.slug,
          releaseDate: input.releaseDate,
          categorySlug: input.categorySlug
        }
      })
    }
  })
  .query('getOne', {
    input: z.string(),
    resolve: async ({ input, ctx: { prisma } }) => {
      return await prisma.game.findUniqueOrThrow({
        where: {
          slug: input
        }
      })
    }
  })
  .query('getAll', {
    resolve: async ({ ctx: { prisma } }) => {
      return await prisma.game.findMany()
    }
  })
  .query('getRecent', {
    resolve: async ({ ctx: { prisma } }) => {
      return await prisma.game.findMany({
        orderBy: { releaseDate: 'desc' }
      })
    }
  })
