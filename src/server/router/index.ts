// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { fileRouter } from './file'
import { authRouter } from './auth'
import { gameRouter } from './game'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('file.', fileRouter)
  .merge('auth.', authRouter)
  .merge('game.', gameRouter)

// export type definition of API
export type AppRouter = typeof appRouter
