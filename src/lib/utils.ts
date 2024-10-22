import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { TrainingSessionForm } from '@/interfaces/training-sessions'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

dayjs.extend(customParseFormat)

export const formatHour = (time: string) => {
  // Indicar el formato de entrada `HH:mm:ss` (24 horas)
  return dayjs(time, 'HH:mm:ss').format('hh:mm A')
}

export function addDayOfWeek(
  trainingSession: TrainingSessionForm
): TrainingSessionForm {
  const date = new Date(trainingSession.dateOfClass)
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' }
  const dayOfWeek = date.toLocaleDateString('en-US', options)

  return {
    ...trainingSession,
    day: dayOfWeek,
  }
}
