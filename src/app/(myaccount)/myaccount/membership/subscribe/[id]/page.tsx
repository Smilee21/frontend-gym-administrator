'use client'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from 'aws-amplify/auth'
import { useEffect, useState } from 'react'

export default function MyAccount() {
  const [info, setInfo] = useState<FetchUserAttributesOutput | null>(null)

  const { route } = useAuthenticator((context) => [context.route])

  const getDataUser = async () => {
    const data = await fetchUserAttributes()
    setInfo(data)
  }

  useEffect(() => {
    getDataUser()
  }, [])

  return route === 'authenticated' ? (
    <div className="grid m-10 absolute grid-cols-1fr md:grid-cols-[200px_1fr] gap-4 w-[40%]">
      {info ? (
        <>
          <div>
            <p>menbership</p>
          </div>
        </>
      ) : (
        <p>chao</p>
      )}
    </div>
  ) : (
    <div className="pt-24">
      <Authenticator />
    </div>
  )
}
