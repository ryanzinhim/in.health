import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalcompletion } from '../../functions/create-goal-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { goalId } = request.body

      const result = await createGoalcompletion({
        goalId,
      })
    }
  )
}
