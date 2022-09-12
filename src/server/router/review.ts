import { z } from 'zod'
import { createRouter } from './context'

export const reviewRouter = createRouter()
  .query('getSpecificReview', {
    input: z.object({
      username: z.string().nullish(),
      gameSlug: z.string()
    }),
    resolve: async ({ input, ctx: { prisma } }) => {
      if (!input.username) return null
      const existingReview = await prisma.review.findFirst({
        where: {
          AND: {
            authorName: input.username,
            gameSlug: input.gameSlug
          }
        }
      })
      return existingReview
    }
  })
  .mutation('deleteReview', {
    input: z.object({
      id: z.string()
    }),
    resolve: ({ input, ctx: { prisma } }) => {
      const i = prisma.review.delete({
        where: {
          id: input.id
        }
      })
      return i
    }
  })
  .query('getForGame', {
    input: z.string(),
    resolve: async ({ input, ctx: { prisma } }) => {
      const reviews = await prisma.review.findMany({
        where: { gameSlug: input },
        orderBy: { createdAt: 'desc' }
      })

      return reviews ? reviews : null
    }
  })
  .mutation('create', {
    input: z.object({
      stars: z.number(),
      username: z.string(),
      message: z.string(),
      gameSlug: z.string()
    }),
    resolve: async ({ input, ctx: { prisma } }) => {
      const review = await prisma.review.create({
        data: {
          content: input.message,
          stars: input.stars,
          gameSlug: input.gameSlug,
          authorName: input.username
        }
      })
      return review
    }
  })
