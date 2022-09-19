import { z } from 'zod'
import { createRouter } from './context'
import { createProtectedRouter } from './protected-router'

const protectedReviewRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      stars: z.number(),
      username: z.string(),
      message: z.string(),
      gameSlug: z.string()
    }),
    resolve: async ({ input, ctx: { prisma, session, res } }) => {
      if (!session?.user) throw Error()
      const review = await prisma.review.create({
        data: {
          content: input.message,
          stars: input.stars,
          gameSlug: input.gameSlug,
          authorName: input.username
        }
      })
      await res?.revalidate('/game/' + review.gameSlug)
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
    resolve: async ({ input, ctx: { prisma, res } }) => {
      const review = await prisma.review.delete({
        where: {
          id: input.id
        }
      })
      await res?.revalidate('/game/' + review.gameSlug)
      return review
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
