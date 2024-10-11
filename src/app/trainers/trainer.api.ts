import { ITrainer } from '@/interfaces/training-sessions'

export async function createTrainer(data: ITrainer) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_TRAINERS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  return result
}

export async function editTrainer(id: string, data: ITrainer) {
  const TRAINER_URL = `${process.env.NEXT_PUBLIC_TRAINERS}/`

  const res = await fetch(TRAINER_URL + `${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  return result
}
