import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'
import { and, eq, gte, lte, sql } from 'drizzle-orm'
import { count } from 'drizzle-orm'

interface createGoalCompletionRequest {
  goalId: string
}

export async function createGoalcompletion({
  goalId,
}: createGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()

  const lastDayOfWeek = dayjs().endOf('week').toDate()

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
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goals.id, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalCompletionCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql`
      COALECE(${goalCompletionCounts.completionCount}) /*sitaxe de sql*/
      `.mapWith(Number),
    })

    .from(goals)
    .leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1)

  const { completionCount, desiredWeeklyFrequency } = result[0]
  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error('objetivo semanal ja concluido!')
  }
  const insertresult = await db
    .insert(goalCompletions)
    .values({ goalId })
    .returning()

  const goalCompletion = result[0]
  return {
    goalCompletions,
  }
}
