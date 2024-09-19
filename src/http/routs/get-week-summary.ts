import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/getWeekPendingGoals'
import { getWeekSummary } from '../../functions/get-week-summary'

export const getWeeksummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/summary', async () => {
    const { summary } = await getWeekSummary()
    return { summary }
  })
}
