import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

dayjs.extend(customParseFormat)

export const formatHour = (time: string) => {
  // Indicar el formato de entrada `HH:mm:ss` (24 horas)
  return dayjs(time, 'HH:mm:ss').format('hh:mm A')
}
