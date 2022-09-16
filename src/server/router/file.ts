import { z } from 'zod'
import { S3 } from 'aws-sdk'
import { randomUUID } from 'crypto'
import { createProtectedRouter } from './protected-router'
import trpc from '@trpc/server'

const s3 = new S3({
  s3ForcePathStyle: true, //! VERY IMPORTANT. DO NOT FORGET THIS
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ROOT_USER || 'minio',
    secretAccessKey: process.env.S3_ROOT_PASSWORD || 'password2'
  }
})

export const fileRouter = createProtectedRouter().query('getSignedUrl', {
  input: z.object({
    contentType: z.string()
  }),
  resolve: async ({ input, ctx: { session } }) => {
    if (!session.user.role.includes('admin'))
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })

    let extension = ''
    if (input.contentType === 'image/jpeg') extension = '.jpg'
    if (input.contentType === 'image/png') extension = '.png'

    const key = randomUUID() + extension

    const s3Params = {
      Bucket: 'videogamer',
      Key: key,
      ContentType: input.contentType
    }

    const i = s3.createPresignedPost
    const uploadUrl = await s3.getSignedUrlPromise('putObject', s3Params)

    return { uploadUrl, key }
  }
})
