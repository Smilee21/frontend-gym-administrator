'use client'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from 'aws-amplify/auth'
import { useEffect, useState } from 'react'
import SubscribeOptions from '@/components/subscribeOptions/subscribe-options'
export default function MyAccount() {
  const [info, setInfo] = useState<FetchUserAttributesOutput | null>(null)

  const { user } = useAuthenticator((context) => [context.user])

  const { route } = useAuthenticator((context) => [context.route])

  const getDataUser = async () => {
    const data = await fetchUserAttributes()
    setInfo(data)
  }

  useEffect(() => {
    getDataUser()
  }, [user])

  return route === 'authenticated' ? (
    <Authenticator signUpAttributes={['name', 'family_name', 'phone_number']}>
      <div className="flex flex-col m-10 gap-4 gap-y-2 items-center ">
        <header className="font-protest text-3xl flex flex-row justify-center w-[80%] self-center border border-white rounded-sm  bg-black text-white p-3 shadow-lg">
          <h3>Subscription Options</h3>
        </header>
        {info ? <SubscribeOptions /> : <p>Loading...</p>}
      </div>
    </Authenticator>
  ) : (
    <div className="pt-24">
      <Authenticator
        signUpAttributes={['name', 'family_name', 'phone_number']}
      />
    </div>
  )
}
