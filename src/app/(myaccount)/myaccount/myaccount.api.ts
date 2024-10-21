import { RequestSubscriptionUser } from '@/interfaces/subscription'
import { fetchAuthSession } from 'aws-amplify/auth'

export async function subscribeUser(data: RequestSubscriptionUser) {
  const token = await fetchAuthSession()
  const idToken = token.tokens?.idToken
  const res = await fetch(`${process.env.NEXT_PUBLIC_ALL_URL}client/sub`, {
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

export async function getSubscription(email: string | undefined) {
  const token = await fetchAuthSession()
  const idToken = token.tokens?.idToken
  const res = await fetch(`${process.env.NEXT_PUBLIC_ALL_URL}client/${email}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  })

  const result = await res.json()
  return result
}

export async function getIsSubActive(email: string | undefined) {
  const token = await fetchAuthSession()
  const idToken = token.tokens?.idToken
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ALL_URL}client/is-active/${email}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const result = await res.json()
  return result
}

export async function inscribeUser(
  email: string | undefined,
  trainingSessionId: string | undefined
) {
  const token = await fetchAuthSession()
  const idToken = token.tokens?.idToken

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ALL_URL}booking/inscribe`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: email,
        sessionId: trainingSessionId,
      }),
    }
  )

  const result = await res.json()
  return result
}

export async function fetchUserClasses(clientEmail: string | undefined) {
  const token = await fetchAuthSession()
  const idToken = token.tokens?.idToken

  // Construir la URL con el parámetro de consulta
  const url = new URL(`${process.env.NEXT_PUBLIC_ALL_URL}booking/user-class`)
  if (clientEmail) {
    url.searchParams.append('client-email', clientEmail)
  }

  const res = await fetch(url.toString(), {
    method: 'GET', // Cambia a 'GET' ya que estamos leyendo datos
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  })

  // Manejo de errores si la respuesta no es 200
  if (!res.ok) {
    throw new Error(`Error fetching user classes: ${res.statusText}`)
  }

  const result = await res.json()
  return result
}
