// src/server/router/context.ts
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'

import { getServerAuthSession } from '../common/get-server-auth-session'
import { prisma } from '../db/client'

type CreateContextOptions = {
  session: Session | null
  req?: NextApiRequest
  res?: NextApiResponse
}

export const createContextInner = async (opts: CreateContextOptions) => ({
  res: opts.res || null,
  req: opts.req || null,
  session: opts?.session,
  prisma
})

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const { req, res } = opts

  const session = await getServerAuthSession({ req, res })

  return await createContextInner({
    req,
    res,
    session
  })
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
