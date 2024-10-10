export interface ITrainingSessions {
  id?: number
  createdAt?: Date
  updateAt?: Date
  day?: string
  hour?: string
  spaces?: number
  duration?: string
  trainer?: ITrainer
}

export interface ITrainer {
  id?: number
  createdAt?: Date
  updateAt?: Date
  name?: string
  specialty?: string
  contactInfo?: string
}

import * as z from 'zod'

export const TrainerSchema = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updateAt: z.coerce.date().optional(),
  name: z.string().optional(),
  specialty: z.string().optional(),
  contactInfo: z.string().optional(),
})
export type Trainer = z.infer<typeof TrainerSchema>

export const TrainingSessionsSchema = z.object({
  id: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updateAt: z.coerce.date().optional(),
  day: z.string().optional(),
  hour: z.string().optional(),
  spaces: z.string().optional(),
  duration: z.string().optional(),
  trainer: TrainerSchema.optional(),
})
export type TrainingSessions = z.infer<typeof TrainingSessionsSchema>
