import { ITrainingSessions } from '@/interfaces/training-sessions'
const URL = `${process.env.NEXT_PUBLIC_URL}`

export async function editTrainingSession(id: string, data: ITrainingSessions) {
  const res = await fetch(URL + `/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  console.log(result)
}

export async function createTrainingSession(data: ITrainingSessions) {
  const res = await fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  console.log(result)
}
