'use client'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'

export default function MyAccount() {
  const { user } = useAuthenticator((context) => [context.user])

  const { route } = useAuthenticator((context) => [context.route])

  return route === 'authenticated' ? (
    <div className="">
      <p>Hola, {user.username}</p>
    </div>
  ) : (
    <div className="pt-24">
      <Authenticator />
    </div>
  )
}
