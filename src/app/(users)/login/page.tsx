'use client'
import { useEffect } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/navigation'
import { fetchAuthSession } from 'aws-amplify/auth'

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const session = await fetchAuthSession()
        if (session && session.tokens) {
          router.push('/')
        }
      } catch (error) {
        console.error('Error fetching session:', error)
      }
    }

    checkUserLoggedIn()
  }, [router])

  return <Authenticator />
}
