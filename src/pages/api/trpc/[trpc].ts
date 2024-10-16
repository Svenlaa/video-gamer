// src/pages/api/trpc/[trpc].ts
import { appRouter } from '../../../server/router'
import { createContext } from '../../../server/router/context'
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { env } from '../../../env/server.mjs'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`)
        }
      : undefined
})
