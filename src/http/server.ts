import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoal } from '../functions/create-goal'
import z from 'zod'
import { getWeekPendingGoals } from '../functions/getWeekPendingGoals'
import { createGoalCompletion } from '../functions/create-goal-completion'
import { createGoalRoute } from './routs/create-goal'
import { createCompletionRoute } from './routs/create-completion'
import { getPendingGoalsRoute } from './routs/get-pending-goals'
import { getWeeksummaryRoute } from './routs/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)

app.register(createCompletionRoute)

app.register(getPendingGoalsRoute)

app.register(getWeeksummaryRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running')
  })
