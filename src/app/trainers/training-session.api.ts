import { ITrainingSessions } from '@/interfaces/training-sessions'

export async function editTrainingSession(id: string, data: ITrainingSessions) {
  const res = await fetch(`http://localhost:3000/training-session/${id}`, {
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
  const res = await fetch(`http://localhost:3000/training-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()
  console.log(result)
}
