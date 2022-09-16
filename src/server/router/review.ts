import { z } from 'zod'
import { createRouter } from './context'
import { createProtectedRouter } from './protected-router'

const protectedReviewRouter = createProtectedRouter()
  .query('hey', {
    resolve: () => 'hey'
  })
  .mutation('create', {
    input: z.object({
      stars: z.number(),
      username: z.string(),
      message: z.string(),
      gameSlug: z.string()
    }),
    resolve: async ({ input, ctx: { prisma, session } }) => {
      if (!session?.user) throw Error()
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
  .query('getSpecificReview', {
    input: z.object({
      gameSlug: z.string()
    }),
    resolve: async ({ input, ctx: { session, prisma } }) => {
      if (!session.user.name) return null
      const existingReview = await prisma.review.findFirst({
        where: {
          AND: {
            authorName: session.user.name,
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

export const reviewRouter = createRouter()
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
  .merge(protectedReviewRouter)
