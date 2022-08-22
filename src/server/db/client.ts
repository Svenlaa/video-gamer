// src/server/db/client.ts
import { Prisma, PrismaClient } from '@prisma/client'
import { env } from '../../env/server.mjs'
import bcrypt from 'bcrypt'

export const prisma =
  //global.prisma ||
  new PrismaClient({
    log: ['query']
  })

// if (env.NODE_ENV !== 'production') {
//   global.prisma = prisma
// }
