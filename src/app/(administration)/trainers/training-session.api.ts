import { TrainingSessionForm } from '@/interfaces/training-sessions'
import { fetchAuthSession } from 'aws-amplify/auth'
const URL = `${process.env.NEXT_PUBLIC_URL}`

export async function editTrainingSession(
  id: string,
  data: TrainingSessionForm
) {
  const token = await fetchAuthSession()
  const idToken = token.tokens?.idToken
  const res = await fetch(URL + `/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  console.log(result)
}

export async function createTrainingSession(data: TrainingSessionForm) {
  const token = await fetchAuthSession()
  const idToken = token.tokens?.idToken
  const res = await fetch(`${URL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  console.log(result)
}
