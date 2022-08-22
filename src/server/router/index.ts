// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { fileRouter } from './file'
import { authRouter } from './auth'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('file.', fileRouter)
  .merge('auth.', authRouter)

// export type definition of API
export type AppRouter = typeof appRouter
