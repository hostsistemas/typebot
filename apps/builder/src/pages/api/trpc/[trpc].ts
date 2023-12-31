import { createContext } from '@/helpers/server/context'
import { trpcRouter } from '@/helpers/server/routers/v1/trpcRouter'
import * as Sentry from '@sentry/nextjs'
import { createNextApiHandler } from '@trpc/server/adapters/next'

export default createNextApiHandler({
  router: trpcRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      Sentry.captureException(error)
      console.error('Something went wrong', error)
    }
    return error
  },
  batching: {
    enabled: true,
  },
})
