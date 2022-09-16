import { createRouter } from './context'
import { z } from 'zod'
import { createProtectedRouter } from './protected-router'
import trpc from '@trpc/server'

const protectedGameRouter = createProtectedRouter().mutation('create', {
  input: z.object({
    coverImg: z.string(),
    title: z.string(),
    slug: z.string(),
    releaseDate: z.date(),
    categorySlug: z.string()
  }),
  resolve: async ({ input, ctx: { prisma, session } }) => {
    if (!session.user.role.includes('admin'))
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
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

export const gameRouter = createRouter()
  .query('getOne', {
    input: z.string(),
    resolve: async ({ input, ctx: { prisma } }) =>
      await prisma.game.findUniqueOrThrow({
        where: {
          slug: input
        }
      })
  })
  .query('getAll', {
    resolve: async ({ ctx: { prisma } }) => await prisma.game.findMany()
  })
  .query('getRecent', {
    resolve: async ({ ctx: { prisma } }) =>
      await prisma.game.findMany({
        orderBy: { releaseDate: 'desc' }
      })
  })
  .merge(protectedGameRouter)
