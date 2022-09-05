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
      const game = prisma?.game.create({
        data: {
          title: input.title,
          coverImg: input.coverImg,
          slug: input.slug,
          releaseDate: input.releaseDate,
          categorySlug: input.categorySlug
        }
      })
      return game
    }
  })
  .query('getOne', {
    input: z.string(),
    resolve: async ({ input, ctx: { prisma } }) => {
      const game = await prisma.game.findUniqueOrThrow({
        where: {
          slug: input
        }
      })
      return game
    }
  })
  .query('getAll', {
    resolve: async ({ ctx: { prisma } }) => {
      const games = await prisma.game.findMany()
      return games
    }
  })
