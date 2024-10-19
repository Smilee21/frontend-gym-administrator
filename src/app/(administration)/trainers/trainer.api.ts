import { ITrainer } from '@/interfaces/training-sessions'
import { fetchAuthSession } from 'aws-amplify/auth'

export async function createTrainer(data: ITrainer) {
  const token = await fetchAuthSession()
  const idToken = token.tokens?.idToken
  const res = await fetch(`${process.env.NEXT_PUBLIC_TRAINERS}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  return result
}

export async function editTrainer(id: string, data: ITrainer) {
  const TRAINER_URL = `${process.env.NEXT_PUBLIC_TRAINERS}/`
  const token = await fetchAuthSession()
  const idToken = token.tokens?.idToken

  const res = await fetch(TRAINER_URL + `${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  return result
}
