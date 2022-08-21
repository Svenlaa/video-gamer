import { createRouter } from './context'
import { z } from 'zod'
import { S3 } from 'aws-sdk'

const s3 = new S3({
  s3ForcePathStyle: true, //! VERY IMPORTANT. DO NOT FORGET THIS
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ROOT_USER || 'minio',
    secretAccessKey: process.env.S3_ROOT_PASSWORD || 'password2'
  }
})

export const fileRouter = createRouter()
  .query('listBuckets', {
    async resolve() {
      return await s3.listBuckets().promise()
    }
  })
  .query('listObjects', {
    input: z.object({
      Bucket: z.string()
    }),
    async resolve({ input }) {
      const { Bucket } = input
      return await s3.listObjectsV2({ Bucket }).promise()
    }
  })
  .query('getObject', {
    input: z.object({
      Key: z.string(),
      Bucket: z.string()
    }),
    resolve: async ({ input }) => {
      const Key = input.Key
      const Bucket = input.Bucket
      return await (
        await s3.getObject({ Bucket, Key }).promise()
      ).LastModified
    }
  })
