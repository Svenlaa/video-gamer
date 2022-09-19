import { createRouter } from './context'
import { z } from 'zod'
import { createProtectedRouter } from './protected-router'
import trpc from '@trpc/server'
import { randomUUID } from 'crypto'
import { S3 } from 'aws-sdk'
import { slugi } from '../../utils/slugi'

const s3 = new S3({
  s3ForcePathStyle: true, //! VERY IMPORTANT. DO NOT FORGET THIS
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ROOT_USER || 'minio',
    secretAccessKey: process.env.S3_ROOT_PASSWORD || 'password2'
  }
})

const protectedGameRouter = createProtectedRouter().mutation('create', {
  input: z.object({
    title: z.string(),
    categoryName: z.string(),
    releaseDate: z.string()
  }),
  resolve: async ({ input, ctx: { prisma, session } }) => {
    if (!session.user.role.includes('admin'))
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })

    const key = randomUUID()

    const categorySlug = slugi(input.categoryName)
    const gameSlug = slugi(input.title)

    const s3Params = {
      Bucket: 'videogamer',
      Fields: { Key: key },
      Conditions: [
        ['starts-with', '$Content-Type', 'image/'],
        ['content-length-range', 0, 1000000]
      ],
      Expires: 60
    }

    const existingGame = await prisma.game.findUnique({
      where: { slug: categorySlug }
    })

    if (existingGame || gameSlug === 'add')
      throw Error('Game with the same slug already exists')

    const categorySlugs = (
      await prisma.category.findMany({
        select: { slug: true }
      })
    ).map((c) => c.slug)

    if (!categorySlugs.includes(categorySlug)) {
      await prisma.category.create({
        data: { slug: categorySlug, name: input.categoryName }
      })
    }

    await await prisma.game.create({
      data: {
        title: input.title,
        coverImg: key,
        releaseDate: new Date(input.releaseDate),
        id: key,
        slug: gameSlug,
        categorySlug
      }
    })

    return new Promise((resolve, reject) => {
      s3.createPresignedPost(s3Params, (err, signed) => {
        if (err) return reject(err)
        resolve(signed)
      })
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
        orderBy: { releaseDate: 'desc' },
        take: 5
      })
  })
  .merge(protectedGameRouter)
