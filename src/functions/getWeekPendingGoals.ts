import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { and, eq, gte, lte, sql } from 'drizzle-orm'
import { count } from 'drizzle-orm'

dayjs.extend(weekOfYear)

export async function getWeekPendingGoals() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()

  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreateUpToWeek = db.$with('goals_created_up_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )
  //query que só lê registros concluidos e criados naquela semana, e essa query "$with"
  const goalCompletionCounts = db.$with('goal_completion_Counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      ) /*aplicação de uma CTE ppara Melhorar a legibilidade ao dividir a consulta em partes menores e mais reutilizáveis e nesse caso usar só a semana que eu quero sem interferir mo resultado das outras semanas.*/
      .groupBy(goalCompletions.goalId)
  )
  const pendingGoals = await db //e agora entre a query principal
    .with(goalsCreateUpToWeek, goalCompletionCounts)
    .select({
      id: goalsCreateUpToWeek.id,
      title: goalsCreateUpToWeek.title,
      desiredWeeklyFrequency: goalsCreateUpToWeek.desiredWeeklyFrequency,
      completionCount: sql`
        COALESCE(${goalCompletionCounts.completionCount}, 0)
        `.mapWith(Number),
    })
    .from(goalsCreateUpToWeek)
    .leftJoin(
      goalCompletionCounts,
      eq(goalCompletionCounts.goalId, goalsCreateUpToWeek.id)
    ) //caso nao tenha completa nenhuma meta o retorno vem 0
  return pendingGoals
}
