// async function updateTrainingSession(id: number, updateData: any) {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/training-session/${id}`,
//       {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updateData),
//       }
//     )

import { TrainingSessions } from '@/interfaces/training-sessions'

//     if (!response.ok) {
//       throw new Error('Error al actualizar la sesión de entrenamiento')
//     }

//     const data = await response.json()
//     console.log('Sesión actualizada con éxito:', data)
//     return data
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

export async function createTrainingSession(createData: TrainingSessions) {
  try {
    const response = await fetch('http://localhost:3000/training-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createData),
    })

    if (!response.ok) {
      console.log(response.body)
      throw new Error('Error al crear la sesión de entrenamiento ')
    }

    const data = await response.json()
    console.log('Sesión creada con éxito:', data)
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}
