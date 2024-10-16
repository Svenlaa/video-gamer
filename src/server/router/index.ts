import { createRouter } from './context'
import superjson from 'superjson'

import { authRouter } from './auth'
import { gameRouter } from './game'
import { reviewRouter } from './review'
import { categoryRouter } from './category'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('game.', gameRouter)
  .merge('category.', categoryRouter)
  .merge('review.', reviewRouter)

// export type definition of API
export type AppRouter = typeof appRouter
