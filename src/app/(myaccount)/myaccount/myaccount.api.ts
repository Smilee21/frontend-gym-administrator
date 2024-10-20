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
