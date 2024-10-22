export interface ITrainingSessions {
  id?: number
  createdAt?: Date
  updateAt?: Date
  day?: string
  dateOfClass?: Date
  hour?: string
  spaces?: number
  duration?: string
  trainer?: ITrainer
}

export interface TrainingSessionForm {
  dateOfClass: string
  hour: string
  duration: string
  spaces: string
  trainerId: number
  day?: string
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

export interface IBooking {
  id: number
  createdAt: Date
  updateAt: Date
  bookingTime: Date
  session: ITrainingSessions // Relación con la sesión de entrenamiento
}
